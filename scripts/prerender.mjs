/**
 * prerender.mjs
 * ---------------------------------------------------------------
 * Static-site-generation step for the Vite + React SPA.
 *
 * Strategy:
 *   1. Parse /public/sitemap.xml for all indexable routes.
 *   2. Start Vite's preview server programmatically against /dist
 *      (no subprocess, works identically on Windows / macOS / Linux).
 *   3. Use Playwright to visit each route, wait for networkidle +
 *      main content, and snapshot the fully-rendered html.
 *   4. Write each snapshot to /dist/<route>/index.html so every
 *      route serves pre-rendered HTML. Googlebot / Bingbot / LLM
 *      crawlers see real content on first byte instead of an
 *      empty div id=root.
 *
 *   The original /dist/index.html is left in place as the SPA
 *   fallback for unknown routes.
 *
 * Head-tag dedupe:
 *   React 19 native metadata hoisting plus Playwright hydration can
 *   leave DUPLICATE title and meta tags in the DOM. To ship clean
 *   static HTML, this script dedupes title, meta[name], meta[property]
 *   and link[rel=canonical/alternate] before serializing each route,
 *   keeping only the last occurrence (the authoritative React-hoisted
 *   one).
 *
 * Run after vite build:
 *   npm run prerender          (or npm run build:seo)
 * ---------------------------------------------------------------
 */

import { chromium } from "playwright";
import { preview as vitePreview } from "vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const SITEMAP = path.join(ROOT, "public", "sitemap.xml");
const PORT = 4173;
const HOST = "http://127.0.0.1:" + PORT;
const PROD_ORIGIN = "https://artiflexit.com";

/* ---------- helpers ---------- */

function log(msg) {
  console.log("[prerender] " + msg);
}
function warn(msg) {
  console.warn("[prerender] WARN " + msg);
}

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

function readSitemapRoutes() {
  if (!fs.existsSync(SITEMAP)) {
    throw new Error("sitemap.xml not found at " + SITEMAP);
  }
  const xml = fs.readFileSync(SITEMAP, "utf8");
  let matches;
  if (/<sitemapindex[\s>]/i.test(xml)) {
    // sitemap.xml is a sitemap index: resolve each child sitemap to its
    // local file in public/ and collect the routes from all of them.
    matches = [];
    for (const childLoc of extractLocs(xml)) {
      let file;
      try {
        file = path.basename(new URL(childLoc).pathname);
      } catch {
        continue;
      }
      const childPath = path.join(ROOT, "public", file);
      if (!fs.existsSync(childPath)) {
        warn("child sitemap not found locally: " + childPath);
        continue;
      }
      matches.push(...extractLocs(fs.readFileSync(childPath, "utf8")));
    }
    if (matches.length === 0) {
      throw new Error("sitemap index resolved to zero routes, check public/sitemap-*.xml");
    }
  } else {
    matches = extractLocs(xml);
  }
  const routes = matches
    .map((loc) => {
      try {
        const u = new URL(loc);
        let p = u.pathname || "/";
        if (p !== "/" && p.endsWith("/")) p = p.slice(0, -1);
        return p;
      } catch {
        return null;
      }
    })
    .filter(Boolean);
  return [...new Set(routes)];
}

function routeToOutFile(route) {
  if (route === "/" || route === "") {
    return path.join(DIST, "index.html");
  }
  const clean = route.replace(/^\/+/, "").replace(/\/+$/, "");
  return path.join(DIST, clean, "index.html");
}

/* ---------- main ---------- */

async function run() {
  if (!fs.existsSync(DIST)) {
    throw new Error("dist/ not found, run npm run build first.");
  }

  const routes = readSitemapRoutes();
  log("found " + routes.length + " routes in sitemap");

  // Snapshot the original template BEFORE we start rendering.
  const TEMPLATE_PATH = path.join(DIST, "index.html");
  const TEMPLATE_BACKUP = path.join(DIST, "_template.index.html");
  if (!fs.existsSync(TEMPLATE_PATH)) {
    throw new Error("dist/index.html not found, run npm run build first.");
  }
  fs.copyFileSync(TEMPLATE_PATH, TEMPLATE_BACKUP);

  log("starting Vite preview server on port " + PORT + "...");
  const previewServer = await vitePreview({
    root: ROOT,
    preview: {
      port: PORT,
      strictPort: true,
      host: "127.0.0.1",
      open: false,
    },
  });

  log("preview up at " + HOST);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (compatible; ArtiflexPrerender/1.0; +https://artiflexit.com)",
    viewport: { width: 1366, height: 900 },
  });

  // Block third-party analytics during prerender.
  await context.route("**/*", (route) => {
    const url = route.request().url();
    if (
      /googletagmanager|google-analytics|analytics\.ahrefs|gtag|licdn\.com|linkedin\.com/i.test(url)
    ) {
      return route.abort();
    }
    return route.continue();
  });

  const setupPage = async () => {
    const page = await context.newPage();
    page.on("console", (msg) => {
      if (msg.type() !== "error") return;
      const text = msg.text();
      if (/Failed to load resource:\s*net::ERR_FAILED/i.test(text)) return;
      warn("[console.error] " + text);
    });
    page.on("pageerror", (err) => warn("[pageerror] " + err.message));
    return page;
  };

  const report = { ok: [], failed: [] };
  const pendingWrites = new Map();

  try {
    for (const route of routes) {
      const url = HOST + route;
      const page = await setupPage();
      try {
        log("rendering " + route);

        await page.goto(url, {
          waitUntil: "load",
          timeout: 45000,
        });

        try {
          await page.waitForFunction(
            () => {
              const root = document.getElementById("root");
              return !!root && root.children.length > 0;
            },
            null,
            { timeout: 75000 }
          );
        } catch (waitErr) {
          const rendered = await page.evaluate(() => {
            const root = document.getElementById("root");
            return {
              children: root ? root.children.length : 0,
              bodyLen: (document.body && document.body.innerText || "").length,
            };
          });
          if (rendered.children > 0 && rendered.bodyLen > 200) {
            log(
              "  note: waitForFunction timed out but page rendered (" +
                rendered.children +
                " children, " +
                rendered.bodyLen +
                " chars), proceeding"
            );
          } else {
            throw waitErr;
          }
        }

        await page
          .waitForLoadState("networkidle", { timeout: 8000 })
          .catch(() => {});

        // BLOG POSTS: the article body lives in a per-post chunk that is
        // fetched after mount (see src/content/blog/index.ts). The generic
        // "#root has children" check above passes on the skeleton, so wait
        // for real prose in #article-body before snapshotting, otherwise
        // the static HTML would ship placeholder bars to crawlers.
        if (/^\/blog\/(?!category\/)[^/]+\/?$/.test(route)) {
          await page
            .waitForFunction(
              () => {
                const el = document.getElementById("article-body");
                if (!el) return false;
                if (el.querySelector(".animate-pulse")) return false;
                return el.querySelectorAll("p").length > 2;
              },
              null,
              { timeout: 30000 }
            )
            .catch(() => {
              warn("article body did not settle for " + route);
            });
        }

        // AUTO-SCROLL: below-fold sections are gated by LazyMount
        // (IntersectionObserver) and only mount when the viewport
        // approaches them. Scroll the full page, repeating while the
        // page keeps growing as sections mount, so the snapshot
        // contains the COMPLETE content for crawlers.
        await page.evaluate(async () => {
          const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
          let prevHeight = 0;
          for (let pass = 0; pass < 8; pass++) {
            const height = document.body.scrollHeight;
            if (height === prevHeight && pass > 0) break;
            prevHeight = height;
            for (let y = 0; y <= height; y += window.innerHeight) {
              window.scrollTo(0, y);
              await sleep(120);
            }
          }
          window.scrollTo(0, 0);
        });
        await page
          .waitForLoadState("networkidle", { timeout: 8000 })
          .catch(() => {});
        await page.waitForTimeout(1500);

        const diag = await page.evaluate(() => {
          const titles = Array.from(document.querySelectorAll("title")).map(
            (t) => t.textContent || ""
          );
          const descs = Array.from(
            document.querySelectorAll('meta[name="description"]')
          ).map((m) => m.getAttribute("content") || "");
          return { titles, descs };
        });
        if (diag.titles.length > 1) {
          log("  note: " + diag.titles.length + " title tags in DOM (will dedupe)");
        }
        if (diag.descs.length > 1) {
          log("  note: " + diag.descs.length + " meta description tags in DOM (will dedupe)");
        }

        const evalResult = await page.evaluate((origin) => {
          const replaceOrigin = (el, attr) => {
            if (!el) return;
            const v = el.getAttribute(attr);
            if (v && v.startsWith("http://127.0.0.1")) {
              el.setAttribute(
                attr,
                v.replace(/^http:\/\/127\.0\.0\.1:\d+/, origin)
              );
            }
          };
          document
            .querySelectorAll('link[rel="canonical"],link[rel="alternate"]')
            .forEach((el) => replaceOrigin(el, "href"));
          document
            .querySelectorAll('meta[property^="og:"],meta[name^="twitter:"]')
            .forEach((el) => replaceOrigin(el, "content"));

          // DEDUPE HEAD TAGS: keep the LAST occurrence of each unique key.
          const keepLast = (selector, keyFn) => {
            const seen = new Map();
            document.querySelectorAll(selector).forEach((el) => {
              const k = keyFn(el);
              if (!k) return;
              const prev = seen.get(k);
              if (prev) prev.remove();
              seen.set(k, el);
            });
          };
          keepLast("head > title", () => "title");
          keepLast("head > meta[name]", (el) => "name:" + el.getAttribute("name"));
          keepLast("head > meta[property]", (el) => "prop:" + el.getAttribute("property"));
          keepLast('head > link[rel="canonical"]', () => "canonical:");
          keepLast(
            'head > link[rel="alternate"][hreflang]',
            (el) => "alt:" + el.getAttribute("hreflang")
          );

          // STRIP CAPTURED THIRD-PARTY SCRIPTS.
          // The deferred analytics loader in index.html injects GTM /
          // gtag / LinkedIn / Ahrefs <script src> tags at runtime. If we
          // serialize the DOM with those tags present, the shipped HTML
          // loads every tag EAGERLY at parse time, defeating the
          // deferral and adding ~1s of mobile TBT. Remove them here;
          // the inline loader re-injects them at runtime as designed.
          document.querySelectorAll("script[src]").forEach((s) => {
            if (
              /googletagmanager\.com|google-analytics\.com|analytics\.ahrefs\.com|licdn\.com|ads\.linkedin\.com/i.test(
                s.src
              )
            ) {
              s.remove();
            }
          });

          // STRIP HEAVY + LAZY-SECTION MODULEPRELOADS.
          // Vite's dynamic-import helper adds <link rel="modulepreload">
          // for every chunk fetched during the Playwright session
          // (including everything mounted by the auto-scroll). Shipping
          // those hints makes first visits download ~17 chunks at once,
          // competing with render-critical resources. Two groups are
          // dropped:
          //   1. Heavy lazy-by-design vendors (three.js, gsap, ogl,
          //      WebGL components).
          //   2. Below-fold home sections now gated by LazyMount, they
          //      mount only after first interaction, so preloading them
          //      at parse time is pure waste.
          document
            .querySelectorAll('link[rel="modulepreload"]')
            .forEach((l) => {
              const href = l.getAttribute("href") || "";
              if (
                /three-vendor|gsap-vendor|ogl-vendor|LightPillar|LightRays|GradientBlinds|CardSwap/i.test(
                  href
                ) ||
                /VendorStrip|ClientStrip|ServicesSection|SectionHeader|WhyChooseUsSection|IndustriesPreviewSection|HomeFAQSection|FAQAccordion|BlogPreviewSection|TestimonialsSection|CTASection/i.test(
                  href
                )
              ) {
                l.remove();
              }
            });

          document.documentElement.classList.remove(
            "lenis",
            "lenis-smooth",
            "lenis-scrolling",
            "lenis-stopped"
          );

          const m = document.createElement("meta");
          m.setAttribute("name", "x-prerendered-at");
          m.setAttribute("content", new Date().toISOString());
          document.head.appendChild(m);

          const t = document.querySelector("title");
          if (t) document.title = t.textContent || "";

          const desc = document.querySelector('meta[name="description"]');

          const finalTitleCount = document.querySelectorAll("head > title").length;
          const finalDescCount = document.querySelectorAll(
            'head > meta[name="description"]'
          ).length;

          return {
            html: "<!DOCTYPE html>\n" + document.documentElement.outerHTML,
            titleOut: (t && t.textContent) || "",
            descOut: (desc && desc.getAttribute("content")) || "",
            finalTitleCount: finalTitleCount,
            finalDescCount: finalDescCount,
          };
        }, PROD_ORIGIN);

        const html = evalResult.html;
        const titleOut = evalResult.titleOut;
        const descOut = evalResult.descOut;
        const finalTitleCount = evalResult.finalTitleCount;
        const finalDescCount = evalResult.finalDescCount;

        log("  title: " + titleOut.slice(0, 70));
        log("  desc : " + descOut.slice(0, 80));

        if (finalTitleCount > 1) {
          warn("  POST-DEDUPE title count=" + finalTitleCount + " on " + route);
        }
        if (finalDescCount > 1) {
          warn("  POST-DEDUPE meta description count=" + finalDescCount + " on " + route);
        }

        const outFile = routeToOutFile(route);
        pendingWrites.set(outFile, html);
        report.ok.push(route);
      } catch (err) {
        warn("failed " + route + ": " + err.message);
        if (/waitForFunction/i.test(err.message || "")) {
          try {
            const snapshot = await page.evaluate(() => ({
              url: location.href,
              title: document.title,
              rootExists: !!document.getElementById("root"),
              rootChildren:
                (document.getElementById("root") && document.getElementById("root").children.length) || 0,
              bodyTextLen: (document.body && document.body.innerText || "").length,
            }));
            warn("  diagnosis: " + JSON.stringify(snapshot));
          } catch (diagErr) {
            warn("  diagnosis failed: " + diagErr.message);
          }
        }
        report.failed.push({ route: route, error: err.message });
      } finally {
        await page.close().catch(() => {});
      }
    }

    // ---- Pre-render the 404 page to dist/404.html ----
    try {
      log("rendering 404 page");
      const page = await setupPage();
      try {
        await page.goto(HOST + "/__prerender_404__", {
          waitUntil: "load",
          timeout: 45000,
        });
        await page.waitForFunction(
          () => {
            const root = document.getElementById("root");
            return !!root && root.children.length > 0;
          },
          null,
          { timeout: 75000 }
        );
        await page
          .waitForLoadState("networkidle", { timeout: 8000 })
          .catch(() => {});
        await page.waitForTimeout(1000);

        const html404 = await page.evaluate((origin) => {
          const replaceOrigin = (el, attr) => {
            if (!el) return;
            const v = el.getAttribute(attr);
            if (v && v.startsWith("http://127.0.0.1")) {
              el.setAttribute(
                attr,
                v.replace(/^http:\/\/127\.0\.0\.1:\d+/, origin)
              );
            }
          };
          document
            .querySelectorAll('link[rel="canonical"],link[rel="alternate"]')
            .forEach((el) => replaceOrigin(el, "href"));
          document
            .querySelectorAll('meta[property^="og:"],meta[name^="twitter:"]')
            .forEach((el) => replaceOrigin(el, "content"));

          const keepLast = (selector, keyFn) => {
            const seen = new Map();
            document.querySelectorAll(selector).forEach((el) => {
              const k = keyFn(el);
              if (!k) return;
              const prev = seen.get(k);
              if (prev) prev.remove();
              seen.set(k, el);
            });
          };
          keepLast("head > title", () => "title");
          keepLast("head > meta[name]", (el) => "name:" + el.getAttribute("name"));
          keepLast("head > meta[property]", (el) => "prop:" + el.getAttribute("property"));
          keepLast('head > link[rel="canonical"]', () => "canonical:");
          keepLast(
            'head > link[rel="alternate"][hreflang]',
            (el) => "alt:" + el.getAttribute("hreflang")
          );

          // Same third-party script + heavy modulepreload strip as the
          // main route loop (see comments there).
          document.querySelectorAll("script[src]").forEach((s) => {
            if (
              /googletagmanager\.com|google-analytics\.com|analytics\.ahrefs\.com|licdn\.com|ads\.linkedin\.com/i.test(
                s.src
              )
            ) {
              s.remove();
            }
          });
          document
            .querySelectorAll('link[rel="modulepreload"]')
            .forEach((l) => {
              const href = l.getAttribute("href") || "";
              if (
                /three-vendor|gsap-vendor|ogl-vendor|LightPillar|LightRays|GradientBlinds|CardSwap/i.test(
                  href
                )
              ) {
                l.remove();
              }
            });

          document.documentElement.classList.remove(
            "lenis",
            "lenis-smooth",
            "lenis-scrolling",
            "lenis-stopped"
          );
          const t = document.querySelector("title");
          if (t) document.title = t.textContent || "";
          return "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
        }, PROD_ORIGIN);

        pendingWrites.set(path.join(DIST, "404.html"), html404);
        log("  404 page captured to dist/404.html");
      } finally {
        await page.close().catch(() => {});
      }
    } catch (err) {
      warn("404 prerender failed: " + err.message);
    }
  } finally {
    await browser.close();
    try {
      if (typeof previewServer.close === "function") {
        await previewServer.close();
      } else if (previewServer.httpServer) {
        await new Promise((resolve) => previewServer.httpServer.close(resolve));
      }
    } catch (e) {
      warn("preview server close error: " + e.message);
    }
  }

  log("flushing " + pendingWrites.size + " prerendered files to disk...");
  for (const [outFile, html] of pendingWrites) {
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, html, "utf8");
    // Delete stale pre-compressed companions written by the build-time
    // compression plugin BEFORE prerendering replaced the HTML. Apache
    // compresses HTML on the fly (.htaccess section 4), so these files
    // are never needed, and a stale .br would serve the empty SPA
    // template if precompressed serving were ever enabled.
    for (const ext of [".br", ".gz"]) {
      const stale = outFile + ext;
      if (fs.existsSync(stale)) {
        try { fs.unlinkSync(stale); } catch { /* no-op */ }
      }
    }
  }

  try {
    if (fs.existsSync(TEMPLATE_BACKUP)) fs.unlinkSync(TEMPLATE_BACKUP);
  } catch {
    /* no-op */
  }

  fs.writeFileSync(
    path.join(DIST, "_prerender-report.json"),
    JSON.stringify(
      { generatedAt: new Date().toISOString(), ok: report.ok, failed: report.failed },
      null,
      2
    ),
    "utf8"
  );

  log("done, ok: " + report.ok.length + ", failed: " + report.failed.length);
  if (report.failed.length) {
    log("failed routes:");
    report.failed.forEach((f) => log("  - " + f.route + ": " + f.error));
    process.exitCode = 1;
  }
}

run().catch((err) => {
  console.error("[prerender] fatal:", err);
  process.exit(1);
});
