/**
 * generate-og-images.mjs
 * ─────────────────────────────────────────────────────────────
 * Generates 1200×630 Open Graph images for every post in
 * src/content/blog/posts.ts.
 *
 * Output: public/og/blog/<slug>.png (one per post)
 *
 * Approach:
 *   1. Parse posts.ts with regex to extract slug, metaTitle, tag,
 *      readTime, date for each post (no TS toolchain required).
 *   2. For each post, render an HTML template at 1200×630 using
 *      Playwright (already a devDependency for the prerender step).
 *   3. Screenshot the rendered HTML to a PNG and save it.
 *
 * Run:
 *   npm run og              # standalone
 *   npm run build:seo       # part of the build chain
 *
 * Re-run only when posts.ts changes — outputs are deterministic.
 * ─────────────────────────────────────────────────────────────
 */

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const POSTS_TS = path.join(ROOT, "src", "content", "blog", "posts.ts");
const OUT_DIR = path.join(ROOT, "public", "og", "blog");

function log(msg) {
  console.log(`[og] ${msg}`);
}
function warn(msg) {
  console.warn(`[og] ⚠ ${msg}`);
}

/* ────────────── Tag → background gradient palette ────────────── */
/* Mirrors the Tailwind chip colours used on the live site so the   */
/* OG image and the on-page tag chip feel like one design system.   */

const TAG_PALETTES = {
  cybersecurity: {
    label: "Cybersecurity",
    primary: "#ef4444", // red-500
    glow: "rgba(239, 68, 68, 0.18)",
  },
  cloud: {
    label: "Cloud",
    primary: "#1B8AC7", // brand-blue
    glow: "rgba(40, 181, 225, 0.20)",
  },
  compliance: {
    label: "Compliance",
    primary: "#f59e0b", // amber-500
    glow: "rgba(245, 158, 11, 0.18)",
  },
  infrastructure: {
    label: "Infrastructure",
    primary: "#a855f7", // purple-500
    glow: "rgba(168, 85, 247, 0.18)",
  },
  "managed-services": {
    label: "Managed Services",
    primary: "#10b981", // emerald-500
    glow: "rgba(16, 185, 129, 0.18)",
  },
};

/* ────────────── Parse posts.ts with regex ────────────── */
/* This avoids needing tsx / TS compilation to read the data.       */
/* Each post block starts with `slug: "..."` and is bounded by `},` */

function parsePosts() {
  const src = fs.readFileSync(POSTS_TS, "utf8");

  // Find every post object literal in the `posts` array.
  // Match `slug: "..."` and capture the surrounding fields.
  const slugRe = /slug:\s*"([^"]+)"/g;
  const titleRe = /title:\s*\n?\s*"([\s\S]*?)"\s*,/;
  const metaTitleRe = /metaTitle:\s*"([^"]+)"/;
  const tagRe = /tag:\s*"([^"]+)"/;
  const dateRe = /date:\s*"([^"]+)"/;
  const readTimeRe = /readTime:\s*(\d+)/;

  const slugs = [...src.matchAll(slugRe)].map((m) => ({
    slug: m[1],
    index: m.index,
  }));

  // Skip placeholder posts that we know aren't published with full content.
  // Heuristic: posts with readTime <= 5 in the placeholder block are stubs.
  // The user can manually filter these later if needed.

  const out = [];
  for (let i = 0; i < slugs.length; i++) {
    const start = slugs[i].index;
    const end = i + 1 < slugs.length ? slugs[i + 1].index : src.length;
    const block = src.slice(start, end);

    const title =
      (block.match(titleRe) || [])[1]?.replace(/\s+/g, " ").trim() ||
      slugs[i].slug;
    const metaTitle = (block.match(metaTitleRe) || [])[1] || title;
    const tag = (block.match(tagRe) || [])[1] || "cybersecurity";
    const date = (block.match(dateRe) || [])[1] || "";
    const readTime = parseInt((block.match(readTimeRe) || [])[1] || "0", 10);

    out.push({
      slug: slugs[i].slug,
      title,
      metaTitle,
      tag,
      date,
      readTime,
    });
  }
  return out;
}

/* ────────────── HTML template ────────────── */
/* Designed at 1200×630 — Open Graph standard. Uses brand colours,  */
/* the post's tag-coloured glow, and clean editorial typography.    */

function ogHtml(post) {
  const palette = TAG_PALETTES[post.tag] || TAG_PALETTES.cybersecurity;

  const title = (post.metaTitle || post.title)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Use the post's title (richer) for the headline, but cap at ~120 chars
  // so it fits the canvas without overflow.
  let headline = post.title.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  if (headline.length > 130) headline = headline.slice(0, 127) + "…";

  const dateText = post.date
    ? new Date(post.date + "T00:00:00Z").toLocaleDateString("en-AE", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 1200px;
      height: 630px;
      font-family: 'Plus Jakarta Sans', -apple-system, system-ui, sans-serif;
      color: #ffffff;
      overflow: hidden;
      background: #04101E;
    }
    .canvas {
      position: relative;
      width: 1200px;
      height: 630px;
      background:
        radial-gradient(ellipse 800px 600px at 88% 12%, ${palette.glow}, transparent 60%),
        radial-gradient(ellipse 700px 500px at 5% 95%, rgba(27, 138, 199, 0.20), transparent 60%),
        linear-gradient(135deg, #04101E 0%, #0A3D6B 100%);
      overflow: hidden;
    }
    /* Subtle grid texture */
    .canvas::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px) 0 0 / 80px 80px,
        linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px) 0 0 / 80px 80px;
      pointer-events: none;
    }
    .frame {
      position: absolute;
      inset: 56px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    /* Top row: brand wordmark + tag chip */
    .top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .brand-mark {
      width: 36px;
      height: 36px;
      border-radius: 9px;
      background: linear-gradient(135deg, #1B8AC7, #28B5E1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 800;
      font-size: 20px;
      color: #04101E;
      box-shadow: 0 4px 16px rgba(40, 181, 225, 0.3);
    }
    .brand-name {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 700;
      font-size: 22px;
      letter-spacing: -0.01em;
    }
    .brand-name .sub {
      font-weight: 400;
      color: #94a3b8;
      margin-left: 4px;
    }
    .tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 14px;
      border-radius: 999px;
      border: 1px solid ${palette.primary}66;
      background: ${palette.primary}1f;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: ${palette.primary};
    }
    .tag::before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background: ${palette.primary};
      box-shadow: 0 0 8px ${palette.primary};
    }

    /* Center: headline */
    .headline {
      font-weight: 700;
      font-size: 64px;
      line-height: 1.1;
      letter-spacing: -0.02em;
      color: #ffffff;
      max-width: 1000px;
    }
    .headline.long { font-size: 54px; }
    .headline.xlong { font-size: 46px; }

    /* Bottom row: meta + accent line */
    .bottom-row {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 24px;
    }
    .meta {
      display: flex;
      align-items: center;
      gap: 14px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      font-weight: 500;
      color: #94a3b8;
      letter-spacing: 0.05em;
    }
    .meta .dot {
      width: 4px;
      height: 4px;
      border-radius: 999px;
      background: #475569;
    }
    .url {
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      font-weight: 500;
      color: ${palette.primary};
      letter-spacing: 0.04em;
    }
    .accent-bar {
      position: absolute;
      left: 56px;
      right: 56px;
      bottom: 130px;
      height: 1px;
      background: linear-gradient(to right, ${palette.primary}, transparent 70%);
    }
  </style>
</head>
<body>
  <div class="canvas">
    <div class="frame">
      <div class="top-row">
        <div class="brand">
          <div class="brand-mark">A</div>
          <div class="brand-name">Artiflex<span class="sub">IT</span></div>
        </div>
        <div class="tag">${palette.label}</div>
      </div>

      <div>
        <h1 class="headline ${headline.length > 80 ? "xlong" : headline.length > 60 ? "long" : ""}">${headline}</h1>
      </div>

      <div class="accent-bar"></div>
      <div class="bottom-row">
        <div class="meta">
          ${dateText ? `<span>${dateText}</span><span class="dot"></span>` : ""}
          ${post.readTime ? `<span>${post.readTime} MIN READ</span>` : ""}
        </div>
        <div class="url">artiflexit.com/blog</div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

/* ────────────── Main ────────────── */

async function run() {
  const posts = parsePosts();
  if (posts.length === 0) {
    warn("no posts found in posts.ts — nothing to generate");
    return;
  }
  log(`generating OG images for ${posts.length} posts`);

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  let ok = 0;
  let failed = 0;
  for (const post of posts) {
    try {
      await page.setContent(ogHtml(post), { waitUntil: "networkidle" });
      // Tiny extra wait so webfonts settle (we preconnect to Google Fonts).
      await page.waitForTimeout(600);
      const out = path.join(OUT_DIR, `${post.slug}.png`);
      await page.screenshot({ path: out, type: "png", omitBackground: false });
      log(`  ✓ ${post.slug}.png`);
      ok++;
    } catch (err) {
      warn(`  failed ${post.slug}: ${err.message}`);
      failed++;
    }
  }

  await browser.close();
  log(`done — ${ok} written, ${failed} failed`);
  if (failed > 0) process.exitCode = 1;
}

run().catch((err) => {
  console.error("[og] fatal:", err);
  process.exit(1);
});
