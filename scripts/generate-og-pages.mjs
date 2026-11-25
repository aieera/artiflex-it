/**
 * generate-og-pages.mjs
 * ─────────────────────────────────────────────────────────────
 * Generates a unique 1200×630 Open Graph image for every NON-blog-post
 * page in the sitemaps (service pages, vendor pages, company pages, the
 * blog listing and its category pages). Blog posts are handled by
 * generate-og-images.mjs.
 *
 * Output: public/og/pages/<route-slug>.jpg
 *   "/"                              → home.jpg
 *   "/cybersecurity/iam/okta"        → cybersecurity-iam-okta.jpg
 *
 * Approach:
 *   1. Read every route from public/sitemap.xml (and its child sitemaps).
 *   2. Serve /dist with Vite preview and visit each route in Playwright,
 *      reading the REAL <title>, meta description and, on vendor pages,
 *      the hero vendor logo. No manifest to maintain: the image can never
 *      disagree with the page it represents.
 *   3. Render an HTML card per page (same visual system as the blog OG
 *      images) and screenshot it to PNG.
 *   4. Mirror the output into dist/og/pages so a build that already ran
 *      picks the images up without a rebuild.
 *   5. Fail if any sitemap route ended up without an image, or if any
 *      /og/pages/… URL referenced in src/ points at a file that does not
 *      exist.
 *
 * Run:
 *   npm run build && node scripts/generate-og-pages.mjs
 *   node scripts/generate-og-pages.mjs --only=/about,/cybersecurity/iam/okta --out=tmp/og
 *
 * Requires dist/ (npm run build) because titles are read from the
 * rendered app. Outputs are deterministic, re-run when page metadata changes.
 * ─────────────────────────────────────────────────────────────
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
const PUBLIC = path.join(ROOT, "public");
const SITEMAP = path.join(PUBLIC, "sitemap.xml");
const SITE = "https://artiflexit.com";
const PORT = 4174;
const HOST = "http://127.0.0.1:" + PORT;
const EXT = ".jpg";
const JPEG_QUALITY = 82;

/* ────────────── CLI flags ────────────── */
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)=(.*)$/);
    return m ? [m[1], m[2]] : [a.replace(/^--/, ""), "true"];
  }),
);
const ONLY = args.only ? args.only.split(",").map((s) => s.trim()).filter(Boolean) : null;
const OUT_DIR = args.out ? path.resolve(ROOT, args.out) : path.join(PUBLIC, "og", "pages");
const MIRROR_TO_DIST = !args.out; // only mirror when writing to the canonical location

function log(msg) {
  console.log(`[og:pages] ${msg}`);
}
function warn(msg) {
  console.warn(`[og:pages] ⚠ ${msg}`);
}

/* ────────────── Brand assets ────────────── */
const LOGO_PATH = path.join(PUBLIC, "logo_artiflex.png");
const LOGO_DATA_URI = "data:image/png;base64," + fs.readFileSync(LOGO_PATH).toString("base64");

const MIME = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
};

function fileToDataUri(publicPath) {
  // publicPath like "/logos/Okta.png" (may be URL-encoded)
  const rel = decodeURIComponent(publicPath.replace(/^\//, "").split("?")[0]);
  const abs = path.join(PUBLIC, rel);
  if (!fs.existsSync(abs)) return null;
  const mime = MIME[path.extname(abs).toLowerCase()];
  if (!mime) return null;
  return `data:${mime};base64,` + fs.readFileSync(abs).toString("base64");
}

/* ────────────── Section palettes ────────────── */
/* Keys shared with the blog generator use the same colours so the two  */
/* image families read as one system.                                   */
const SECTIONS = {
  cybersecurity: { label: "Cybersecurity", primary: "#ef4444", glow: "rgba(239, 68, 68, 0.18)" },
  "cloud-solutions": { label: "Cloud Solutions", primary: "#1B8AC7", glow: "rgba(40, 181, 225, 0.22)" },
  infrastructure: { label: "Infrastructure", primary: "#a855f7", glow: "rgba(168, 85, 247, 0.18)" },
  "managed-services": { label: "Managed Services", primary: "#10b981", glow: "rgba(16, 185, 129, 0.18)" },
  "business-solutions": { label: "Business Solutions", primary: "#f59e0b", glow: "rgba(245, 158, 11, 0.18)" },
  "application-security-solutions": { label: "Application Security", primary: "#f97316", glow: "rgba(249, 115, 22, 0.18)" },
  "corporate-training": { label: "Corporate Training", primary: "#06b6d4", glow: "rgba(6, 182, 212, 0.18)" },
  vendors: { label: "Technology Partner", primary: "#28B5E1", glow: "rgba(40, 181, 225, 0.22)" },
  blog: { label: "Blog", primary: "#1B8AC7", glow: "rgba(40, 181, 225, 0.22)" },
  company: { label: "Artiflex IT", primary: "#28B5E1", glow: "rgba(40, 181, 225, 0.22)" },
};

function sectionFor(route) {
  const first = route.split("/").filter(Boolean)[0] || "";
  return SECTIONS[first] || SECTIONS.company;
}

/* Routes whose hero shows a single vendor logo. Only on these do we lift */
/* the first /logos/ image from the DOM into the card.                    */
const VENDOR_ROUTE = [
  /^\/vendors\/[^/]+$/,
  /^\/cybersecurity\/(firewalls|endpoint|email|dlp|iam|iga|pam|mfa|workspace)\/[^/]+$/,
  /^\/cybersecurity\/vulnerability-management\/[^/]+$/,
  /^\/cybersecurity\/security-operations\/(siem|ndr|mdr)\/[^/]+$/,
  /^\/cybersecurity\/mobile-security\/[^/]+$/,
  /^\/cybersecurity\/ot-ics-security\/[^/]+$/,
];
const isVendorRoute = (route) => VENDOR_ROUTE.some((re) => re.test(route));

/* ────────────── Route discovery ────────────── */
function readSitemapRoutes() {
  if (!fs.existsSync(SITEMAP)) throw new Error("sitemap.xml not found at " + SITEMAP);
  const xml = fs.readFileSync(SITEMAP, "utf8");
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  let urls = [];
  if (/<sitemapindex[\s>]/i.test(xml)) {
    for (const child of locs) {
      const childPath = path.join(PUBLIC, new URL(child).pathname);
      if (!fs.existsSync(childPath)) {
        warn("child sitemap not found locally: " + childPath);
        continue;
      }
      const cx = fs.readFileSync(childPath, "utf8");
      urls.push(...[...cx.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]));
    }
  } else {
    urls = locs;
  }
  const routes = urls
    .map((u) => {
      try {
        return new URL(u).pathname.replace(/\/+$/, "") || "/";
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    // Blog posts have their own generator (generate-og-images.mjs).
    .filter((r) => !(r.startsWith("/blog/") && !r.startsWith("/blog/category/")));
  return [...new Set(routes)];
}

export function routeToSlug(route) {
  const clean = route.replace(/^\/+|\/+$/g, "");
  return clean ? clean.replace(/\//g, "-") : "home";
}

/* ────────────── Text helpers ────────────── */
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function cleanTitle(raw) {
  let t = (raw || "").replace(/\s+/g, " ").trim();
  // Strip trailing brand suffixes: " | Artiflex IT", " - Artiflex Information Technology", …
  t = t.replace(/\s*[|\-–—:]\s*Artiflex(\s+(IT|Information Technology))?\s*$/i, "").trim();
  // SEO titles are often "Primary phrase | Secondary phrase". The card
  // headline reads better as the primary phrase alone.
  if (t.includes("|")) t = t.split("|")[0].trim();
  return t;
}

function truncate(s, max) {
  if (!s || s.length <= max) return s || "";
  const cut = s.slice(0, max - 1);
  // Prefer ending on a full sentence when one fits in the first half or more.
  const sentenceEnd = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf(".\n"));
  if (sentenceEnd > max * 0.5) return cut.slice(0, sentenceEnd + 1);
  const sp = cut.lastIndexOf(" ");
  return (sp > max * 0.6 ? cut.slice(0, sp) : cut).replace(/[,;:.\s]+$/, "") + "…";
}

/* ────────────── HTML template ────────────── */
function ogHtml({ route, title, description, logoDataUri }) {
  const palette = sectionFor(route);
  const headline = truncate(title, 110);
  const sizeClass =
    headline.length > 90 ? "xs" : headline.length > 70 ? "s" : headline.length > 48 ? "m" : "";
  const desc = truncate(description, logoDataUri ? 130 : 160);
  const urlText = route === "/" ? "artiflexit.com" : "artiflexit.com" + route;
  const hasLogo = !!logoDataUri;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${esc(title)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 1200px; height: 630px;
      font-family: 'Plus Jakarta Sans', -apple-system, system-ui, sans-serif;
      color: #fff; overflow: hidden; background: #04101E;
    }
    .canvas {
      position: relative; width: 1200px; height: 630px; overflow: hidden;
      background:
        radial-gradient(ellipse 800px 600px at 88% 12%, ${palette.glow}, transparent 60%),
        radial-gradient(ellipse 700px 500px at 5% 95%, rgba(27, 138, 199, 0.20), transparent 60%),
        linear-gradient(135deg, #04101E 0%, #0A3D6B 100%);
    }
    .canvas::before {
      content: ''; position: absolute; inset: 0; pointer-events: none;
      background:
        linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px) 0 0 / 80px 80px,
        linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px) 0 0 / 80px 80px;
    }
    .frame {
      position: absolute; inset: 56px;
      display: flex; flex-direction: column; justify-content: space-between;
    }
    .top-row { display: flex; align-items: center; justify-content: space-between; }
    .brand-logo { height: 44px; width: auto; display: block; }
    .tag {
      display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px;
      border-radius: 999px; border: 1px solid ${palette.primary}66; background: ${palette.primary}1f;
      font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 600;
      letter-spacing: 0.18em; text-transform: uppercase; color: ${palette.primary};
    }
    .tag::before {
      content: ''; width: 6px; height: 6px; border-radius: 999px;
      background: ${palette.primary}; box-shadow: 0 0 8px ${palette.primary};
    }
    .middle { display: flex; align-items: center; justify-content: space-between; gap: 48px; }
    .copy { flex: 1 1 auto; min-width: 0; max-width: ${hasLogo ? 740 : 1000}px; }
    .headline {
      font-weight: 700; font-size: 58px; line-height: 1.1; letter-spacing: -0.02em; color: #fff;
    }
    .headline.m { font-size: 50px; }
    .headline.s { font-size: 42px; }
    .headline.xs { font-size: 36px; }
    .desc {
      margin-top: 22px; font-size: 22px; line-height: 1.45; color: #cbd5e1; font-weight: 400;
    }
    .logo-tile {
      flex: 0 0 auto; width: 220px; height: 220px; border-radius: 28px; background: #fff;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 24px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08);
    }
    .logo-tile img { max-width: 160px; max-height: 120px; width: auto; height: auto; display: block; }
    .accent-bar {
      position: absolute; left: 56px; right: 56px; bottom: 130px; height: 1px;
      background: linear-gradient(to right, ${palette.primary}, transparent 70%);
    }
    .bottom-row { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; }
    .meta {
      font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 500;
      color: #94a3b8; letter-spacing: 0.05em;
    }
    .url {
      font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 500;
      color: ${palette.primary}; letter-spacing: 0.04em; max-width: 720px;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
  </style>
</head>
<body>
  <div class="canvas">
    <div class="frame">
      <div class="top-row">
        <img class="brand-logo" src="${LOGO_DATA_URI}" alt="Artiflex IT" />
        <div class="tag">${esc(palette.label)}</div>
      </div>

      <div class="middle">
        <div class="copy">
          <h1 class="headline ${sizeClass}">${esc(headline)}</h1>
          ${desc ? `<p class="desc">${esc(desc)}</p>` : ""}
        </div>
        ${hasLogo ? `<div class="logo-tile"><img src="${logoDataUri}" alt="" /></div>` : ""}
      </div>

      <div class="accent-bar"></div>
      <div class="bottom-row">
        <div class="meta">UAE · OMAN · SAUDI ARABIA</div>
        <div class="url">${esc(urlText)}</div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

/* ────────────── Page metadata extraction ────────────── */
async function readPageMeta(page, route) {
  await page.goto(HOST + route, { waitUntil: "networkidle", timeout: 60_000 });
  // Helmet updates <title> after hydration; give it a beat if it still
  // shows the generic shell title.
  for (let i = 0; i < 10; i++) {
    const t = await page.title();
    if (t && !/^Artiflex( IT)?$/i.test(t.trim()) && t.trim() !== "Vite + React + TS") break;
    await page.waitForTimeout(200);
  }
  return page.evaluate((vendor) => {
    const title = document.title || "";
    const h1 = document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim() || "";
    const description =
      document.querySelector('meta[name="description"]')?.getAttribute("content") || "";
    let logo = null;
    if (vendor) {
      const img = document.querySelector('img[src*="/logos/"]');
      if (img) {
        const src = img.getAttribute("src") || "";
        logo = src.startsWith("/") ? src : new URL(src, location.href).pathname;
      }
    }
    return { title, h1, description, logo };
  }, isVendorRoute(route));
}

/* ────────────── Verification ────────────── */
function verifySourceReferences(outDir) {
  // Every "/og/pages/<name>.jpg" literal in src/ must exist on disk.
  const SRC = path.join(ROOT, "src");
  const refs = new Set();
  const walk = (dir) => {
    for (const d of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, d.name);
      if (d.isDirectory()) walk(p);
      else if (/\.(tsx?|mjs|js)$/.test(d.name)) {
        const s = fs.readFileSync(p, "utf8");
        for (const m of s.matchAll(/\/og\/pages\/([a-z0-9-]+)\.jpg/g)) refs.add(m[1]);
      }
    }
  };
  walk(SRC);
  const missing = [...refs].filter((n) => !fs.existsSync(path.join(outDir, n + EXT)));
  return { total: refs.size, missing };
}

/* ────────────── Main ────────────── */
async function run() {
  if (!fs.existsSync(path.join(DIST, "index.html"))) {
    throw new Error("dist/index.html not found, run `npm run build` first.");
  }

  let routes = readSitemapRoutes();
  if (ONLY) {
    const want = new Set(ONLY.map((r) => r.replace(/\/+$/, "") || "/"));
    routes = routes.filter((r) => want.has(r));
    const notInSitemap = [...want].filter((r) => !routes.includes(r));
    // Allow sampling routes that are not in the sitemap too (e.g. drafts).
    routes.push(...notInSitemap);
  }
  if (routes.length === 0) {
    warn("no routes to render");
    return;
  }
  log(`${routes.length} page(s) to render → ${path.relative(ROOT, OUT_DIR)}`);
  fs.mkdirSync(OUT_DIR, { recursive: true });

  log("starting Vite preview on " + HOST);
  const previewServer = await vitePreview({
    root: ROOT,
    preview: { port: PORT, strictPort: true, host: "127.0.0.1", open: false },
  });

  const browser = await chromium.launch({ headless: true });
  const reader = await (await browser.newContext({ viewport: { width: 1366, height: 900 } })).newPage();
  const renderer = await (
    await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
  ).newPage();

  let ok = 0;
  let failed = 0;
  const problems = [];
  try {
    for (const route of routes) {
      const slug = routeToSlug(route);
      try {
        const meta = await readPageMeta(reader, route);
        let title = cleanTitle(meta.title);
        if (!title || title.length < 4) title = meta.h1 || title;
        if (!title) throw new Error("no title found");

        let logoDataUri = null;
        if (isVendorRoute(route)) {
          if (meta.logo) logoDataUri = fileToDataUri(meta.logo);
          if (!logoDataUri) problems.push(`${route}: vendor page but no usable logo (${meta.logo || "none"})`);
        }

        await renderer.setContent(ogHtml({ route, title, description: meta.description, logoDataUri }), {
          waitUntil: "networkidle",
        });
        await renderer.waitForTimeout(400); // let webfonts settle
        const out = path.join(OUT_DIR, `${slug}${EXT}`);
        // JPEG: the gradient background makes lossless PNG ~450 KB per card;
        // JPEG at this quality is ~5x smaller with no visible difference on
        // a social preview. Every platform accepts JPEG for og:image.
        await renderer.screenshot({ path: out, type: "jpeg", quality: JPEG_QUALITY });
        log(`  ✓ ${slug}${EXT}  ← "${title}"`);
        ok++;
      } catch (err) {
        warn(`  failed ${route}: ${err.message}`);
        failed++;
      }
    }
  } finally {
    await browser.close();
    if (typeof previewServer.close === "function") await previewServer.close();
    else if (previewServer.httpServer) await new Promise((r) => previewServer.httpServer.close(r));
  }

  // Mirror into dist so an already-built site picks the images up.
  if (MIRROR_TO_DIST && fs.existsSync(DIST)) {
    const distOut = path.join(DIST, "og", "pages");
    fs.mkdirSync(distOut, { recursive: true });
    for (const f of fs.readdirSync(OUT_DIR)) {
      if (f.endsWith(EXT)) fs.copyFileSync(path.join(OUT_DIR, f), path.join(distOut, f));
    }
    log(`mirrored ${ok} image(s) into dist/og/pages`);
  }

  if (!ONLY) {
    const { total, missing } = verifySourceReferences(OUT_DIR);
    log(`source references: ${total} distinct /og/pages/ images referenced in src/`);
    if (missing.length) {
      failed += missing.length;
      warn(`referenced in src/ but NOT generated: ${missing.join(", ")}`);
    }
    const sitemapMissing = routes.filter((r) => !fs.existsSync(path.join(OUT_DIR, routeToSlug(r) + EXT)));
    if (sitemapMissing.length) warn(`sitemap routes without an image: ${sitemapMissing.join(", ")}`);
  }
  if (problems.length) {
    warn("notes:");
    for (const p of problems) warn("  " + p);
  }

  log(`done — ${ok} written, ${failed} failed`);
  if (failed > 0) process.exitCode = 1;
}

run().catch((err) => {
  console.error("[og:pages] fatal:", err);
  process.exit(1);
});
