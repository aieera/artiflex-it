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
 *      main content, and snapshot the fully-rendered <html>.
 *   4. Write each snapshot to /dist/<route>/index.html so every
 *      route serves pre-rendered HTML — Googlebot / Bingbot / LLM
 *      crawlers see real content on first byte instead of an
 *      empty <div id="root" />.
 *
 *   The original /dist/index.html is left in place as the SPA
 *   fallback for unknown routes.
 *
 * How metadata works:
 *   /index.html ships a MINIMAL head — charset, viewport, favicon,
 *   analytics scripts. No title, no description, no og/twitter.
 *   React 19 natively hoists <title>/<meta>/<link> from each page
 *   component into <head>. Because the template has no defaults to
 *   duplicate, there is no dedupe work to do here — React is the
 *   single source of truth.
 *
 * Run after `vite build`:
 *   npm run prerender          # or npm run build:seo
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
const HOST = `http://127.0.0.1:${PORT}`;
const PROD_ORIGIN = "https://artiflexit.com";

/* ---------- helpers ---------- */

function log(msg) {
  console.log(`[prerender] ${msg}`);
}
function warn(msg) {
  console.warn(`[prerender] \u26a0 ${msg}`);
}

function readSitemapRoutes() {
  if (!fs.existsSync(SITEMAP)) {
    throw new Error(`sitemap.xml not found at ${SITEMAP}`);
  }
  const xml = fs.readFileSync(SITEMAP, "utf8");
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (m) => m[1].trim()
  );
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
    throw new Error(
      `dist/ not found \u2014 run \`npm run build\` before \`prerender\`.`
    );
  }

  const routes = readSitemapRoutes();
  log(`found ${routes.length} routes in sitemap`);

  // Snapshot the original template BEFORE we start rendering. Vite
  // preview serves dist/index.html as the SPA fallback, so if we
  // overwrite it mid-run, subsequent route requests would load the
  // prerendered HomePage HTML instead of the clean template.
  const TEMPLATE_PATH = path.join(DIST, "index.html");
  const TEMPLATE_BACKUP = path.join(DIST, "_template.index.html");
  if (!fs.existsSync(TEMPLATE_PATH)) {
    throw new Error(
      `dist/index.html not found \u2014 run \`npm run build\` first.`
    );
  }
  fs.copyFileSync(TEMPLATE_PATH, TEMPLATE_BACKUP);

  log(`starting Vite preview server on port ${PORT}...`);
  const previewServer = await vitePreview({
    root: ROOT,
    preview: {
      port: PORT,
      strictPort: true,
      host: "127.0.0.1",
      open: false,
    },
  });

  log(`preview up at ${HOST}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (compatible; ArtiflexPrerender/1.0; +https://artiflexit.com)",
    viewport: { width: 1366, height: 900 },
  });

  // Block third-party analytics during prerender. These scripts (gtag,
  // ahrefs analytics) keep the network "active" indefinitely with
  // long-poll beacons, which prevents Playwright's networkidle from
  // ever firing on heavy pages. They also have no value during a
  // build-time render. Blocking them speeds up renders dramatically
  // and eliminates the worst class of timeout failures.
  await context.route("**/*", (route) => {
    const url = route.request().url();
    if (
      /googletagmanager|google-analytics|analytics\.ahrefs|gtag/i.test(url)
    ) {
      return route.abort();
    }
    return route.continue();
  });

  // Helper: spin up a fresh page. We recreate the page per route so a
  // hung navigation can't leak into the next render. The cost is ~200ms
  // per route, well worth the resilience.
  const setupPage = async () => {
    const page = await context.newPage();
    page.on("console", (msg) => {
      if (msg.type() !== "error") return;
      const text = msg.text();
      // Suppress expected noise from our own analytics-blocking
      // route handler. These are NOT real errors — they're Chromium
      // logging the abort of every gtag/ahrefs request.
      if (/Failed to load resource:\s*net::ERR_FAILED/i.test(text)) return;
      warn(`[console.error] ${text}`);
    });
    page.on("pageerror", (err) => warn(`[pageerror] ${err.message}`));
    return page;
  };

  const report = { ok: [], failed: [] };
  /** @type {Map<string, string>} outFile → html — write all at the end */
  const pendingWrites = new Map();

  try {
    for (const route of routes) {
      const url = `${HOST}${route}`;
      // Fresh page per route \u2014 see setupPage() comment above.
      const page = await setupPage();
      try {
        log(`\u2192 rendering ${route}`);

        // Use "load" not "networkidle". Heavy pages (LightPillar 504KB,
        // CTASection 187KB, main bundle 872KB) plus background analytics
        // beacons mean networkidle frequently never fires within 60s.
        // "load" fires when the window load event triggers \u2014 all
        // critical resources are downloaded but we don't wait for the
        // network to fully quiet. We then explicitly wait for the React
        // tree to mount + a short settle period.
        await page.goto(url, {
          waitUntil: "load",
          timeout: 45000,
        });

        // Wait for #root to actually have rendered children.
        // 75s allows the heaviest pages (FirewallsNetworkSecurity,
        // EdrXdrSecurity etc.) to finish their first render. Fast
        // pages exit in <2s.
        //
        // Resilience: if waitForFunction times out, do NOT immediately
        // fail. Re-check the page state — Playwright's polling cadence
        // can miss the moment React mounts on heavy pages, but the
        // page may still have rendered successfully by the time the
        // timeout fires. If root has children at that point, we treat
        // it as success and proceed with the snapshot. Only a truly
        // empty page (rootChildren=0) is a real failure.
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
              bodyLen: (document.body?.innerText || "").length,
            };
          });
          if (rendered.children > 0 && rendered.bodyLen > 200) {
            log(
              `  note: waitForFunction timed out but page rendered ` +
                `(${rendered.children} children, ${rendered.bodyLen} chars) — proceeding`
            );
          } else {
            throw waitErr;
          }
        }

        // Best-effort networkidle wait \u2014 bounded so analytics or
        // long-poll requests can't hang the whole render. If it never
        // settles, we ship anyway after the timeout.
        await page
          .waitForLoadState("networkidle", { timeout: 8000 })
          .catch(() => {});
        await page.waitForTimeout(1500);

        // Diagnostic — confirm React 19 hoisted exactly ONE of each
        // metadata tag. Since the template ships no per-route meta,
        // duplicate counts > 1 indicate a page component is rendering
        // the same tag twice (a bug in that page, not the pipeline).
        const diag = await page.evaluate(() => {
          const titles = Array.from(document.querySelectorAll("title")).map(
            (t) => t.textContent || ""
          );
          const descs = Array.from(
            document.querySelectorAll('meta[name="description"]')
          ).map((m) => m.getAttribute("content") || "");
          const rootChildren =
            document.getElementById("root")?.children.length ?? 0;
          const bodyTextLen = (document.body.innerText || "").length;
          return { titles, descs, rootChildren, bodyTextLen };
        });
        if (diag.titles.length !== 1) {
          warn(`  unexpected <title> count=${diag.titles.length} on ${route}`);
        }
        if (diag.descs.length !== 1) {
          warn(
            `  unexpected <meta description> count=${diag.descs.length} on ${route}`
          );
        }

        const { html, titleOut, descOut } = await page.evaluate((origin) => {
          /* Rewrite 127.0.0.1 origins in canonical/OG/twitter URLs */
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

          /* Strip runtime Lenis classes so the static HTML ships neutral —
             Lenis re-adds them on load (or not, for reduced-motion users,
             who then keep the native CSS smooth-scroll fallback). */
          document.documentElement.classList.remove(
            "lenis",
            "lenis-smooth",
            "lenis-scrolling",
            "lenis-stopped"
          );

          /* Prerender breadcrumb so we can confirm the HTML served is
             in fact the pre-rendered version (useful for curl checks) */
          const m = document.createElement("meta");
          m.setAttribute("name", "x-prerendered-at");
          m.setAttribute("content", new Date().toISOString());
          document.head.appendChild(m);

          /* Chromium quirk: document.title sometimes lags behind the
             <title> element contents in edge cases. Assert explicitly. */
          const t = document.querySelector("title");
          if (t) document.title = t.textContent || "";

          const desc = document.querySelector('meta[name="description"]');

          return {
            html: "<!DOCTYPE html>\n" + document.documentElement.outerHTML,
            titleOut: (t && t.textContent) || "",
            descOut: (desc && desc.getAttribute("content")) || "",
          };
        }, PROD_ORIGIN);

        log(`  title: "${titleOut.slice(0, 70)}"`);
        log(`  desc : "${descOut.slice(0, 80)}"`);

        const outFile = routeToOutFile(route);
        // Buffer — do NOT write yet. Writing dist/index.html mid-run
        // causes Vite preview to serve the prerendered HomePage as the
        // SPA fallback for every remaining route.
        pendingWrites.set(outFile, html);
        report.ok.push(route);
      } catch (err) {
        warn(`failed ${route}: ${err.message}`);
        // On waitForFunction timeout (React never mounted), grab a
        // post-mortem snapshot so we can diagnose what the page looks
        // like at the moment of failure. Helps distinguish "React
        // crashed" from "React just slow" from "asset failed to load".
        if (/waitForFunction/i.test(err.message || "")) {
          try {
            const snapshot = await page.evaluate(() => ({
              url: location.href,
              title: document.title,
              rootExists: !!document.getElementById("root"),
              rootChildren:
                document.getElementById("root")?.children.length ?? 0,
              bodyTextLen: (document.body?.innerText || "").length,
              hasMain: !!document.querySelector("main"),
              hasError: !!document.querySelector("[data-error]"),
              scriptCount: document.querySelectorAll("script").length,
            }));
            warn(`  diagnosis: ${JSON.stringify(snapshot)}`);
          } catch (diagErr) {
            warn(`  diagnosis failed: ${diagErr.message}`);
          }
        }
        report.failed.push({ route, error: err.message });
      } finally {
        // Always close the page — keeps the next route's render isolated
        // from any in-flight navigation or hung promise from this one.
        await page.close().catch(() => {});
      }
    }

    // ---- Pre-render the 404 page → dist/404.html ----
    // Visit a URL that matches no route. Vite preview's SPA fallback serves
    // the clean template, and React Router renders <NotFoundPage>. We snapshot
    // it to dist/404.html, which Apache serves via `ErrorDocument 404` with a
    // real 404 status (see public/.htaccess section 8).
    try {
      log("→ rendering 404 page");
      const page = await setupPage();
      try {
        await page.goto(`${HOST}/__prerender_404__`, {
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
        log("  404 page captured → dist/404.html");
      } finally {
        await page.close().catch(() => {});
      }
    } catch (err) {
      warn(`404 prerender failed: ${err.message}`);
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
      warn(`preview server close error: ${e.message}`);
    }
  }

  log(`flushing ${pendingWrites.size} prerendered files to disk...`);
  for (const [outFile, html] of pendingWrites) {
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, html, "utf8");
  }

  try {
    if (fs.existsSync(TEMPLATE_BACKUP)) fs.unlinkSync(TEMPLATE_BACKUP);
  } catch {
    /* no-op */
  }

  fs.writeFileSync(
    path.join(DIST, "_prerender-report.json"),
    JSON.stringify(
      { generatedAt: new Date().toISOString(), ...report },
      null,
      2
    ),
    "utf8"
  );

  log(`done \u2014 ok: ${report.ok.length}, failed: ${report.failed.length}`);
  if (report.failed.length) {
    log("failed routes:");
    report.failed.forEach((f) => log(`  - ${f.route}: ${f.error}`));
    process.exitCode = 1;
  }
}

run().catch((err) => {
  console.error("[prerender] fatal:", err);
  process.exit(1);
});
