/**
 * generate-sitemaps.mjs
 * ---------------------------------------------------------------
 * Rewrites public/sitemap-pages.xml, public/sitemap-blog.xml and the
 * public/sitemap.xml index with REAL <lastmod> dates, then the Vite build
 * copies them into dist/.
 *
 * The URL list itself stays hand-curated in the two child sitemaps (that
 * list also drives which routes scripts/prerender.mjs renders). This
 * script only:
 *
 *   1. lastmod   = the latest git commit date of the files that produce
 *                  the page: the route's component (resolved through
 *                  src/App.tsx) plus the data / content modules that
 *                  component imports. Blog posts use their own
 *                  posts/<slug>/ folder + the post template. If any of
 *                  those files has uncommitted changes, the build date is
 *                  used (the change ships with this build).
 *   2. ordering  = "/" and "/cybersecurity" first, then the 11
 *                  cybersecurity pillar pages, then everything else in
 *                  its existing order.
 *   3. hygiene   = drops (and reports) any URL that is not canonical:
 *                  trailing slash, uppercase, http / www, a path that
 *                  public/.htaccess 301s or 410s, or a React <Navigate>
 *                  redirect route. Duplicates are removed.
 *
 * The sitemap index lastmod is the newest lastmod of each child file.
 *
 *   npm run sitemap          (also runs first in npm run build:seo)
 * ---------------------------------------------------------------
 */

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { CYBER_PILLAR_PATHS } from "./lib/seo-pillars.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src");
const PUBLIC = path.join(ROOT, "public");
const ORIGIN = "https://artiflexit.com";
const TODAY = new Date().toISOString().slice(0, 10);

const log = (m) => console.log("[sitemap] " + m);
const warn = (m) => console.warn("[sitemap] WARN " + m);

/* ---------------- git helpers ---------------- */

const git = (args) => execFileSync("git", args, { cwd: ROOT, encoding: "utf8" }).trim();

let dirty = new Set();
try {
  dirty = new Set(
    git(["status", "--porcelain", "--untracked-files=all", "--", "src"])
      .split(/\r?\n/)
      .filter(Boolean)
      .map((l) => l.slice(3).replace(/^"|"$/g, "").split(" -> ").pop().replace(/\\/g, "/"))
  );
} catch {
  warn("git status failed; uncommitted changes will not be detected");
}

const dateCache = new Map();
/** Latest commit date (YYYY-MM-DD) for a repo-relative file or folder. */
function gitDate(rel) {
  if (dateCache.has(rel)) return dateCache.get(rel);
  let d = null;
  const isDirty = [...dirty].some((f) => f === rel || f.startsWith(rel.replace(/\/?$/, "/")));
  if (isDirty) d = TODAY;
  else {
    try {
      const out = git(["log", "-1", "--format=%cI", "--", rel]);
      d = out ? out.slice(0, 10) : null;
    } catch {
      d = null;
    }
  }
  if (!d) {
    // Never committed (or not a git checkout): fall back to mtime.
    try {
      d = fs.statSync(path.join(ROOT, rel)).mtime.toISOString().slice(0, 10);
    } catch {
      d = TODAY;
    }
  }
  dateCache.set(rel, d);
  return d;
}

/* ---------------- route -> source files (via App.tsx) ---------------- */

const toRel = (abs) => path.relative(ROOT, abs).split(path.sep).join("/");

function resolveModule(spec, fromDir) {
  let base;
  if (spec.startsWith("@/")) base = path.join(SRC, spec.slice(2));
  else if (spec.startsWith(".")) base = path.resolve(fromDir, spec);
  else return null;
  for (const cand of [base, base + ".tsx", base + ".ts", path.join(base, "index.tsx"), path.join(base, "index.ts")]) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) return cand;
  }
  return null;
}

const APP = path.join(SRC, "App.tsx");
const appSrc = fs.readFileSync(APP, "utf8");
const lazyFiles = new Map();
for (const m of appSrc.matchAll(/const (\w+) = lazy\(\(\) =>\s*import\("([^"]+)"\)/g)) {
  const f = resolveModule(m[2], SRC);
  if (f) lazyFiles.set(m[1], f);
}
const routes = [];
const redirectRoutes = [];
for (const m of appSrc.matchAll(/<Route path="([^"]+)" element=\{<(\w+)([^>]*)\/>\}/g)) {
  if (m[2] === "Navigate") redirectRoutes.push(m[1]);
  else if (lazyFiles.has(m[2])) routes.push({ pattern: m[1], file: lazyFiles.get(m[2]) });
}

function matchRoute(p) {
  let best = null;
  for (const r of routes) {
    if (r.pattern === "*") continue;
    const segs = r.pattern.split("/").filter(Boolean);
    const parts = p.split("/").filter(Boolean);
    if (segs.length !== parts.length) continue;
    let ok = true;
    let score = 0;
    segs.forEach((s, i) => {
      if (s.startsWith(":")) return;
      if (s !== parts[i]) ok = false;
      else score++;
    });
    if (ok && (!best || score > best.score)) best = { ...r, score };
  }
  return best;
}

/** Component file + the data / content modules it imports directly. */
const depCache = new Map();
function contentDeps(file) {
  if (depCache.has(file)) return depCache.get(file);
  const src = fs.readFileSync(file, "utf8");
  const deps = new Set([toRel(file)]);
  for (const m of src.matchAll(/(?:from\s+|import\()\s*"([^"]+)"/g)) {
    const f = resolveModule(m[1], path.dirname(file));
    if (!f) continue;
    const rel = toRel(f);
    if (/\/data\//.test(rel) || rel.startsWith("src/content/") || rel === "src/lib/cyberPillars.ts") deps.add(rel);
  }
  const out = [...deps];
  depCache.set(file, out);
  return out;
}

const BLOG_POSTS = "src/content/blog/posts";
function sourcesFor(p) {
  const post = p.match(/^\/blog\/(?!category\/)([^/]+)$/);
  if (post) {
    const dir = `${BLOG_POSTS}/${post[1]}`;
    if (fs.existsSync(path.join(ROOT, dir))) return [dir, "src/pages/Blogs/pages/BlogPostPage.tsx", "src/lib/cyberPillars.ts"];
  }
  const r = matchRoute(p);
  if (!r) return null;
  const deps = contentDeps(r.file);
  // Blog listing pages change whenever a post's metadata does.
  if (p === "/blog" || p.startsWith("/blog/category/")) deps.push(...listPostMetaFiles());
  return deps;
}
function listPostMetaFiles() {
  return fs
    .readdirSync(path.join(ROOT, BLOG_POSTS))
    .map((d) => `${BLOG_POSTS}/${d}/meta.ts`)
    .filter((f) => fs.existsSync(path.join(ROOT, f)));
}

const maxDate = (dates) => dates.filter(Boolean).sort().pop();

/* ---------------- .htaccess redirect / gone rules ---------------- */

const htRules = [];
for (const raw of fs.readFileSync(path.join(PUBLIC, ".htaccess"), "utf8").split(/\r?\n/)) {
  const line = raw.trim();
  const m = line.match(/^RewriteRule\s+(\S+)\s+(\S+)\s+\[([^\]]+)\]/);
  if (!m || m[1] === "^" || !/R=\d{3}/.test(m[3])) continue;
  try {
    htRules.push(new RegExp(m[1]));
  } catch {
    /* ignore */
  }
}

function canonicalProblem(loc) {
  let u;
  try {
    u = new URL(loc);
  } catch {
    return "unparseable";
  }
  if (u.origin !== ORIGIN) return "non-canonical host/scheme";
  if (u.search || u.hash) return "query/hash";
  const p = u.pathname;
  if (p !== "/" && p.endsWith("/")) return "trailing slash";
  if (p !== p.toLowerCase()) return "uppercase";
  const rel = p.replace(/^\//, "");
  if (htRules.some((re) => re.test(rel))) return ".htaccess redirect/410";
  if (redirectRoutes.includes(p)) return "React <Navigate> redirect";
  return null;
}

/* ---------------- parse + rewrite child sitemaps ---------------- */

function parseUrlset(file) {
  const xml = fs.readFileSync(path.join(PUBLIC, file), "utf8");
  // Header = XML declaration + the <urlset ...> open tag (namespaces kept).
  const urlsetOpen = xml.match(/<urlset[\s\S]*?>/);
  if (!urlsetOpen) throw new Error(file + " has no <urlset>");
  const head = xml.slice(0, urlsetOpen.index + urlsetOpen[0].length);
  const entries = [];
  let group = null;
  const tokenRe = /<!--([\s\S]*?)-->|<url>([\s\S]*?)<\/url>/g;
  for (const m of xml.matchAll(tokenRe)) {
    if (m[1] !== undefined) {
      group = m[1].trim();
      continue;
    }
    const body = m[2];
    const get = (tag) => (body.match(new RegExp(`<${tag}>([^<]*)</${tag}>`)) || [])[1]?.trim();
    const extra = body
      .replace(/<(loc|lastmod|changefreq|priority)>[^<]*<\/\1>/g, "")
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    entries.push({ loc: get("loc"), changefreq: get("changefreq"), priority: get("priority"), extra, group });
  }
  return { head: head.trimEnd(), entries };
}

function render({ head, entries }) {
  const out = [head, ""];
  let lastGroup;
  for (const e of entries) {
    if (e.group && e.group !== lastGroup) {
      out.push("", `  <!-- ${e.group} -->`);
      lastGroup = e.group;
    }
    out.push("  <url>");
    out.push(`    <loc>${e.loc}</loc>`);
    out.push(`    <lastmod>${e.lastmod}</lastmod>`);
    if (e.changefreq) out.push(`    <changefreq>${e.changefreq}</changefreq>`);
    if (e.priority) out.push(`    <priority>${e.priority}</priority>`);
    for (const x of e.extra) out.push(`    ${x}`);
    out.push("  </url>");
  }
  out.push("", "</urlset>", "");
  return out.join("\n");
}

function processFile(file, reorder) {
  const parsed = parseUrlset(file);
  const seen = new Set();
  const kept = [];
  for (const e of parsed.entries) {
    const problem = canonicalProblem(e.loc);
    if (problem) {
      warn(`${file}: dropped ${e.loc} (${problem})`);
      continue;
    }
    if (seen.has(e.loc)) {
      warn(`${file}: dropped duplicate ${e.loc}`);
      continue;
    }
    seen.add(e.loc);
    const p = new URL(e.loc).pathname;
    const sources = sourcesFor(p);
    if (!sources) {
      warn(`${file}: no route in App.tsx matches ${p}, it will 404; dropped`);
      continue;
    }
    e.lastmod = maxDate(sources.map(gitDate));
    e.sources = sources;
    kept.push(e);
  }

  let entries = kept;
  if (reorder) {
    const byPath = (p) => kept.find((e) => new URL(e.loc).pathname === p);
    const top = ["/", "/cybersecurity"].map(byPath).filter(Boolean);
    const pillars = CYBER_PILLAR_PATHS.map(byPath).filter(Boolean);
    CYBER_PILLAR_PATHS.filter((p) => !byPath(p)).forEach((p) => warn(`pillar ${p} is missing from ${file}`));
    top.forEach((e, i) => (e.group = i === 0 ? "Core pages" : "Cybersecurity hub"));
    pillars.forEach((e) => (e.group = "Cybersecurity pillar pages"));
    const first = new Set([...top, ...pillars]);
    entries = [...top, ...pillars, ...kept.filter((e) => !first.has(e))];
  }

  fs.writeFileSync(path.join(PUBLIC, file), render({ head: parsed.head, entries }));
  log(`${file}: ${entries.length} URLs, newest lastmod ${maxDate(entries.map((e) => e.lastmod))}`);
  return entries;
}

const pages = processFile("sitemap-pages.xml", true);
const blog = fs.existsSync(path.join(PUBLIC, "sitemap-blog.xml")) ? processFile("sitemap-blog.xml", false) : [];

/* ---------------- sitemap index ---------------- */

const children = [
  { file: "sitemap-pages.xml", entries: pages },
  ...(blog.length ? [{ file: "sitemap-blog.xml", entries: blog }] : []),
];
const index = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...children.flatMap((c) => [
    "  <sitemap>",
    `    <loc>${ORIGIN}/${c.file}</loc>`,
    `    <lastmod>${maxDate(c.entries.map((e) => e.lastmod))}</lastmod>`,
    "  </sitemap>",
  ]),
  "</sitemapindex>",
  "",
].join("\n");
fs.writeFileSync(path.join(PUBLIC, "sitemap.xml"), index);
log("sitemap.xml index written");

if (process.argv.includes("--explain")) {
  for (const e of [...pages, ...blog]) console.log(`${e.lastmod}  ${e.loc}  <=  ${e.sources.join(", ")}`);
}
