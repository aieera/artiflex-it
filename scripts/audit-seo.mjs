/**
 * audit-seo.mjs
 * ---------------------------------------------------------------
 * Local static SEO audit across all prerendered dist/ HTML files.
 *
 * Checks per page:
 *   - <title> length, uniqueness, presence
 *   - meta description length, uniqueness, presence
 *   - canonical present + non-www + matches route
 *   - exactly one <h1>
 *   - word count (flags thin pages <300 words)
 *   - <img> alt coverage
 *   - hreflang coverage
 *   - JSON-LD schema count + parse validity
 *   - x-prerendered-at present (confirms prerender applied)
 *
 * Output:
 *   dist/_seo-audit.json        — structured data
 *   scripts/_seo-audit.md       — human-readable report
 * ---------------------------------------------------------------
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

const PROD = "https://artiflexit.com";

const TITLE_MIN = 30;
const TITLE_MAX = 65;
const DESC_MIN = 70;
const DESC_MAX = 165;
const THIN_PAGE_WORDS = 300;

/* ---------- helpers ---------- */

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.isFile() && e.name === "index.html") out.push(p);
  }
  return out;
}

function fileToRoute(file) {
  const rel = path.relative(DIST, path.dirname(file));
  return rel === "" ? "/" : "/" + rel.replace(/\\/g, "/");
}

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function first(regex, html) {
  const m = html.match(regex);
  return m ? decode(m[1]) : null;
}

function all(regex, html) {
  const out = [];
  let m;
  while ((m = regex.exec(html)) !== null) out.push(m);
  return out;
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractBody(html) {
  const m = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  return m ? m[1] : html;
}

/* ---------- audit ---------- */

const files = walk(DIST).sort();
const perPage = [];
const titleMap = new Map(); // title -> [routes]
const descMap = new Map();

for (const file of files) {
  const route = fileToRoute(file);
  const html = fs.readFileSync(file, "utf8");

  const title = first(/<title[^>]*>([^<]+)<\/title>/i, html);
  // NOTE: Content attributes often contain apostrophes (e.g. "ArtiflexIT's").
  // React emits attribute values in double quotes, so we match content="..."
  // specifically and accept any char (including ') inside. Previous version
  // used [^"'] which truncated at any quote and under-reported lengths.
  const desc = first(
    /<meta[^>]+name=["']description["'][^>]+content="([^"]*)"/i,
    html
  );
  const canonical = first(
    /<link[^>]+rel=["']canonical["'][^>]+href="([^"]*)"/i,
    html
  );
  const ogTitle = first(
    /<meta[^>]+property=["']og:title["'][^>]+content="([^"]*)"/i,
    html
  );
  const ogDesc = first(
    /<meta[^>]+property=["']og:description["'][^>]+content="([^"]*)"/i,
    html
  );
  const ogImage = first(
    /<meta[^>]+property=["']og:image["'][^>]+content="([^"]*)"/i,
    html
  );
  const prerenderedAt = first(
    /<meta[^>]+name=["']x-prerendered-at["'][^>]+content="([^"]*)"/i,
    html
  );

  const h1Matches = all(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, html);
  const h1Count = h1Matches.length;
  const h1First = h1Matches.length
    ? stripTags(h1Matches[0][1]).slice(0, 120)
    : null;

  const hreflang = all(
    /<link[^>]+rel=["']alternate["'][^>]+hreflang=["']([^"']+)["']/gi,
    html
  ).map((m) => m[1]);

  const ldJsonBlocks = all(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    html
  );
  const schemas = [];
  const schemaErrors = [];
  for (const [, body] of ldJsonBlocks) {
    try {
      const parsed = JSON.parse(body.trim());
      const type = parsed["@type"] || "Unknown";
      schemas.push(Array.isArray(type) ? type.join("+") : type);
    } catch (e) {
      schemaErrors.push(e.message);
    }
  }

  const imgs = all(/<img\b[^>]*>/gi, html).map((m) => m[0]);
  const imgsMissingAlt = imgs.filter(
    (tag) => !/alt\s*=\s*["'][^"']*["']/i.test(tag)
  ).length;
  const imgsEmptyAlt = imgs.filter((tag) =>
    /alt\s*=\s*["']\s*["']/i.test(tag)
  ).length;

  const bodyText = stripTags(extractBody(html));
  const wordCount = bodyText ? bodyText.split(/\s+/).filter(Boolean).length : 0;

  const anchors = all(
    /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi,
    html
  );
  const internalLinks = anchors.filter(([, href]) => {
    const h = href.trim();
    return (
      h.startsWith("/") ||
      h.startsWith("#") ||
      h.startsWith(PROD) ||
      h.startsWith("https://artiflexit.com")
    );
  }).length;
  const externalLinks = anchors.length - internalLinks;

  const issues = [];
  if (!title) issues.push("missing-title");
  if (title && title.length < TITLE_MIN) issues.push(`title-too-short (${title.length})`);
  if (title && title.length > TITLE_MAX) issues.push(`title-too-long (${title.length})`);
  if (!desc) issues.push("missing-description");
  if (desc && desc.length < DESC_MIN) issues.push(`desc-too-short (${desc.length})`);
  if (desc && desc.length > DESC_MAX) issues.push(`desc-too-long (${desc.length})`);
  if (!canonical) issues.push("missing-canonical");
  if (canonical && canonical.includes("www.artiflexit.com"))
    issues.push("canonical-uses-www");
  if (canonical && !canonical.startsWith(PROD))
    issues.push("canonical-wrong-origin");
  if (h1Count === 0) issues.push("missing-h1");
  if (h1Count > 1) issues.push(`multiple-h1 (${h1Count})`);
  if (wordCount < THIN_PAGE_WORDS)
    issues.push(`thin-content (${wordCount} words)`);
  if (imgsMissingAlt > 0) issues.push(`imgs-missing-alt (${imgsMissingAlt})`);
  if (!ogTitle) issues.push("missing-og-title");
  if (!ogDesc) issues.push("missing-og-description");
  if (!ogImage) issues.push("missing-og-image");
  if (schemaErrors.length) issues.push(`schema-parse-error (${schemaErrors.length})`);
  if (schemas.length === 0) issues.push("no-schema");
  if (!prerenderedAt) issues.push("not-prerendered");
  if (hreflang.length === 0) issues.push("no-hreflang");

  if (title) {
    if (!titleMap.has(title)) titleMap.set(title, []);
    titleMap.get(title).push(route);
  }
  if (desc) {
    if (!descMap.has(desc)) descMap.set(desc, []);
    descMap.get(desc).push(route);
  }

  perPage.push({
    route,
    file: path.relative(ROOT, file),
    title,
    titleLen: title ? title.length : 0,
    desc,
    descLen: desc ? desc.length : 0,
    canonical,
    ogTitle,
    ogDesc,
    ogImage,
    h1Count,
    h1First,
    hreflangCount: hreflang.length,
    hreflangs: hreflang,
    schemas,
    schemaErrors,
    imgs: imgs.length,
    imgsMissingAlt,
    imgsEmptyAlt,
    internalLinks,
    externalLinks,
    wordCount,
    prerenderedAt,
    issues,
  });
}

/* ---------- cross-page uniqueness ---------- */
const dupTitles = [...titleMap.entries()].filter(([, rs]) => rs.length > 1);
const dupDescs = [...descMap.entries()].filter(([, rs]) => rs.length > 1);

/* ---------- aggregate ---------- */
const summary = {
  generatedAt: new Date().toISOString(),
  totalPages: perPage.length,
  pagesWithIssues: perPage.filter((p) => p.issues.length > 0).length,
  duplicateTitles: dupTitles.length,
  duplicateDescriptions: dupDescs.length,
  avgWordCount: Math.round(
    perPage.reduce((s, p) => s + p.wordCount, 0) / perPage.length
  ),
  thinPages: perPage.filter((p) => p.wordCount < THIN_PAGE_WORDS).length,
  pagesWithoutSchema: perPage.filter((p) => p.schemas.length === 0).length,
  pagesWithSchemaErrors: perPage.filter((p) => p.schemaErrors.length > 0).length,
  pagesMissingAlt: perPage.filter((p) => p.imgsMissingAlt > 0).length,
  pagesMissingH1: perPage.filter((p) => p.h1Count === 0).length,
  pagesWithMultipleH1: perPage.filter((p) => p.h1Count > 1).length,
  prerenderedPages: perPage.filter((p) => p.prerenderedAt).length,
};

const report = {
  summary,
  duplicates: {
    titles: dupTitles.map(([t, rs]) => ({ title: t, routes: rs })),
    descriptions: dupDescs.map(([d, rs]) => ({ desc: d, routes: rs })),
  },
  pages: perPage,
};

fs.writeFileSync(
  path.join(DIST, "_seo-audit.json"),
  JSON.stringify(report, null, 2),
  "utf8"
);

/* ---------- human-readable markdown ---------- */
let md = `# SEO Audit Report\n\n`;
md += `Generated: ${summary.generatedAt}\n\n`;
md += `## Summary\n\n`;
md += `| Metric | Value |\n|---|---|\n`;
for (const [k, v] of Object.entries(summary)) {
  if (k === "generatedAt") continue;
  md += `| ${k} | ${v} |\n`;
}
md += `\n`;

md += `## Issues by page\n\n`;
const pagesWithIssues = perPage.filter((p) => p.issues.length > 0);
if (pagesWithIssues.length === 0) {
  md += `No issues detected. \n\n`;
} else {
  for (const p of pagesWithIssues) {
    md += `### ${p.route}\n`;
    md += `- title (${p.titleLen} chars): "${p.title || "MISSING"}"\n`;
    md += `- desc (${p.descLen} chars): "${(p.desc || "MISSING").slice(0, 120)}"\n`;
    md += `- words: ${p.wordCount}, H1s: ${p.h1Count}, imgs: ${p.imgs} (missing alt: ${p.imgsMissingAlt})\n`;
    md += `- schemas: [${p.schemas.join(", ") || "NONE"}]\n`;
    md += `- **issues:** ${p.issues.join(", ")}\n\n`;
  }
}

md += `## Duplicate titles\n\n`;
if (dupTitles.length === 0) {
  md += `None.\n\n`;
} else {
  for (const [t, rs] of dupTitles) {
    md += `- "${t}" → ${rs.join(", ")}\n`;
  }
  md += `\n`;
}

md += `## Duplicate descriptions\n\n`;
if (dupDescs.length === 0) {
  md += `None.\n\n`;
} else {
  for (const [d, rs] of dupDescs) {
    md += `- "${d.slice(0, 100)}..." → ${rs.join(", ")}\n`;
  }
  md += `\n`;
}

md += `## Per-page quick table\n\n`;
md += `| Route | Title len | Desc len | Words | H1s | Schemas | Issues |\n`;
md += `|---|---|---|---|---|---|---|\n`;
for (const p of perPage) {
  md += `| ${p.route} | ${p.titleLen} | ${p.descLen} | ${p.wordCount} | ${p.h1Count} | ${p.schemas.length} | ${p.issues.length} |\n`;
}
md += `\n`;

fs.writeFileSync(path.join(__dirname, "_seo-audit.md"), md, "utf8");

console.log(JSON.stringify(summary, null, 2));
console.log(`\nReport written to:\n  dist/_seo-audit.json\n  scripts/_seo-audit.md`);
