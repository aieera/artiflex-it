/**
 * verify-seo.mjs
 * ---------------------------------------------------------------
 * Post-prerender SEO verification. For every URL in
 * public/sitemap-pages.xml (and sitemap-blog.xml) it inspects the BUILT
 * HTML in dist/ and reports:
 *
 *   status     200 / 301 / 410 / 404, emulated from public/.htaccess
 *              (retired-URL 301s, 410 junk rules, trailing-slash rule)
 *              plus "does dist/<route>/index.html exist"
 *   canonical  <link rel="canonical"> href, flagged if != sitemap URL
 *   h1         number of <h1> elements in the page
 *   words      visible word count of <main>
 *   robots     <meta name="robots"> content
 *   inbound    number of OTHER prerendered pages linking to the URL,
 *              broken down by where the link sits (header, footer, home,
 *              hub, vendor, blog, other page body)
 *
 * It also lists every internal <a href> anywhere in dist/ that is NOT in
 * canonical form (trailing slash, uppercase, http/www host, or pointing
 * at a URL that redirects / 404s), so internal links never leak equity
 * through redirects.
 *
 * Usage (after `npm run build:seo`):
 *   node scripts/verify-seo.mjs              offline check of dist/
 *   node scripts/verify-seo.mjs --live       also fetch each sitemap URL
 *                                            from https://artiflexit.com
 *                                            (redirect: manual) and report
 *                                            the real production status
 *   node scripts/verify-seo.mjs --all        print the table for every
 *                                            sitemap URL, not just pillars
 *
 * Full results are written to dist/_seo-verify.json.
 * Exit code is 1 when any sitemap URL fails a hard check.
 * ---------------------------------------------------------------
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CYBER_PILLARS, CYBER_PILLAR_PATHS } from "./lib/seo-pillars.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const PUBLIC = path.join(ROOT, "public");
const ORIGIN = "https://artiflexit.com";

const args = new Set(process.argv.slice(2));
const LIVE = args.has("--live");
const ALL = args.has("--all");

/* ---------------- sitemap ---------------- */

function locsOf(file) {
  const xml = fs.readFileSync(path.join(PUBLIC, file), "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}
const pageLocs = locsOf("sitemap-pages.xml");
const blogLocs = fs.existsSync(path.join(PUBLIC, "sitemap-blog.xml")) ? locsOf("sitemap-blog.xml") : [];
const toPath = (loc) => {
  const u = new URL(loc);
  return u.pathname;
};

/* ---------------- .htaccess emulation ---------------- */

const htaccess = fs.readFileSync(path.join(PUBLIC, ".htaccess"), "utf8");
const rules = [];
for (const raw of htaccess.split(/\r?\n/)) {
  const line = raw.trim();
  if (line.startsWith("#")) continue;
  const m = line.match(/^RewriteRule\s+(\S+)\s+(\S+)\s+\[([^\]]+)\]/);
  if (!m) continue;
  const flags = m[3];
  const code = (flags.match(/R=(\d{3})/) || [])[1];
  if (!code) continue;
  // Skip the host / query-string rules: they are conditional on RewriteCond
  // (HTTPS, host, digits-only query) and never fire for a clean
  // https://artiflexit.com/path request with no query string.
  if (m[1] === "^") continue;
  try {
    rules.push({ re: new RegExp(m[1]), target: m[2], code: Number(code) });
  } catch {
    /* ignore patterns JS cannot parse */
  }
}

function distFileFor(p) {
  if (p === "/") return path.join(DIST, "index.html");
  return path.join(DIST, p.replace(/^\/+/, "").replace(/\/+$/, ""), "index.html");
}

/** Emulated status for a clean https://artiflexit.com<path> request. */
function emulatedStatus(p) {
  const rel = p.replace(/^\//, "");
  for (const r of rules) {
    if (r.re.test(rel)) return { status: r.code, rule: r.re.source, target: r.target };
  }
  if (p !== "/" && p.endsWith("/")) return { status: 301, rule: "trailing-slash", target: p.slice(0, -1) };
  if (!fs.existsSync(distFileFor(p))) return { status: 404 };
  return { status: 200 };
}

/* ---------------- HTML parsing (regex, prerendered output is regular) ---------------- */

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");

function attr(tag, name) {
  const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`, "i"));
  return m ? decode(m[1]) : null;
}

function regionOf(html, tagName, which) {
  const openRe = new RegExp(`<${tagName}[\\s>]`, "gi");
  const opens = [...html.matchAll(openRe)].map((m) => m.index);
  if (!opens.length) return null;
  const start = which === "last" ? opens[opens.length - 1] : opens[0];
  const end = html.indexOf(`</${tagName}>`, start);
  return end === -1 ? null : [start, end];
}

function visibleText(fragment) {
  return decode(
    fragment
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();
}

/** Normalise an href to a site path, or null when it is not internal. */
function internalPath(href) {
  if (!href) return null;
  if (/^(mailto:|tel:|javascript:|#)/i.test(href)) return null;
  let u;
  try {
    u = new URL(href, ORIGIN + "/");
  } catch {
    return null;
  }
  if (!/^(www\.)?artiflexit\.com$/i.test(u.hostname)) return null;
  return { path: u.pathname, raw: href, host: u.hostname, protocol: u.protocol };
}

function parsePage(rawHtml) {
  // Comments in index.html mention "<title>" / "<body>" literally; drop them.
  const html = rawHtml.replace(/<!--[\s\S]*?-->/g, "");
  const head = html.slice(0, Math.max(0, html.indexOf("</head>")));
  const canonTag = (head.match(/<link[^>]+rel="canonical"[^>]*>/i) || [])[0];
  const robotsTag = (head.match(/<meta[^>]+name="robots"[^>]*>/i) || [])[0];
  const descTag = (head.match(/<meta[^>]+name="description"[^>]*>/i) || [])[0];
  const title = decode((head.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "").trim();

  const ldTypes = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const j = JSON.parse(decode(m[1]));
      const collect = (n) => {
        if (!n || typeof n !== "object") return;
        if (Array.isArray(n)) return n.forEach(collect);
        if (n["@type"]) [].concat(n["@type"]).forEach((t) => ldTypes.push(t));
        if (n["@graph"]) collect(n["@graph"]);
      };
      collect(j);
    } catch {
      ldTypes.push("INVALID_JSON");
    }
  }

  const headerR = regionOf(html, "header", "first");
  const footerR = regionOf(html, "footer", "last");
  const mainR = regionOf(html, "main", "first");
  const inR = (r, i) => r && i >= r[0] && i <= r[1];

  const links = [];
  for (const m of html.matchAll(/<a\s[^>]*>/gi)) {
    const href = attr(m[0], "href");
    const ip = internalPath(href);
    if (!ip) continue;
    const region = inR(headerR, m.index) ? "header" : inR(footerR, m.index) ? "footer" : "body";
    links.push({ ...ip, region });
  }

  const mainHtml = mainR ? html.slice(mainR[0], mainR[1]) : html;
  const words = visibleText(mainHtml).split(" ").filter((w) => /[A-Za-z0-9]/.test(w)).length;
  const h1 = (html.match(/<h1[\s>]/gi) || []).length;
  const h1Text = visibleText((html.match(/<h1[\s\S]*?<\/h1>/i) || [""])[0]);

  return {
    title,
    description: descTag ? attr(descTag, "content") : null,
    canonical: canonTag ? attr(canonTag, "href") : null,
    robots: robotsTag ? attr(robotsTag, "content") : null,
    ldTypes,
    h1,
    h1Text,
    words,
    links,
  };
}

/* ---------------- walk dist ---------------- */

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (["assets", "fonts", "images", "logos", "og", "sophos-platinum-partner"].includes(e.name) && dir === DIST) continue;
      walk(full, out);
    } else if (e.name === "index.html") {
      out.push(full);
    }
  }
  return out;
}

if (!fs.existsSync(DIST)) {
  console.error("dist/ not found. Run `npm run build:seo` first.");
  process.exit(1);
}

const pages = new Map(); // route -> parsed
for (const file of walk(DIST)) {
  const rel = path.relative(DIST, path.dirname(file)).split(path.sep).join("/");
  const route = rel ? "/" + rel : "/";
  pages.set(route, parsePage(fs.readFileSync(file, "utf8")));
}

/* ---------------- inbound link graph ---------------- */

function sourceKind(route) {
  if (route === "/") return "home";
  if (route === "/cybersecurity") return "hub";
  if (route.startsWith("/vendors/")) return "vendor";
  if (route.startsWith("/blog/")) return "blog";
  return "page";
}

const inbound = new Map(); // targetPath -> { pages:Set, header:Set, footer:Set, home, hub, vendor:Set, blog:Set, page:Set }
const bump = (target, key, src) => {
  if (!inbound.has(target)) {
    inbound.set(target, { pages: new Set(), header: new Set(), footer: new Set(), home: new Set(), hub: new Set(), vendor: new Set(), blog: new Set(), page: new Set() });
  }
  inbound.get(target)[key].add(src);
};

const nonCanonicalLinks = new Map(); // raw href -> { reason, count, example source }
const sitemapPathSet = new Set([...pageLocs, ...blogLocs].map(toPath));

for (const [src, pg] of pages) {
  for (const l of pg.links) {
    const target = l.path;
    // Canonical-form check on the raw href.
    let reason = null;
    if (l.host.toLowerCase() !== "artiflexit.com") reason = "www host";
    else if (/^http:/i.test(l.raw)) reason = "http scheme";
    else if (target !== "/" && target.endsWith("/")) reason = "trailing slash";
    else if (target !== target.toLowerCase()) reason = "uppercase";
    else {
      const st = emulatedStatus(target);
      if (st.status !== 200 && !/\.(pdf|xml|txt|png|jpe?g|webp|svg)$/i.test(target)) reason = `target ${st.status}`;
    }
    if (reason) {
      const k = l.raw;
      const prev = nonCanonicalLinks.get(k) || { reason, pages: new Set() };
      prev.pages.add(src);
      nonCanonicalLinks.set(k, prev);
    }

    if (target === src) continue; // self links do not count as inbound
    bump(target, "pages", src);
    if (l.region === "header") bump(target, "header", src);
    else if (l.region === "footer") bump(target, "footer", src);
    else bump(target, sourceKind(src), src);
  }
}

/* ---------------- per-URL report ---------------- */

async function liveStatus(loc) {
  try {
    const res = await fetch(loc, { redirect: "manual", headers: { "User-Agent": "ArtiflexSeoVerify/1.0" } });
    const loc2 = res.headers.get("location");
    return loc2 ? `${res.status} -> ${loc2}` : String(res.status);
  } catch (e) {
    return "ERR " + e.message;
  }
}

const results = [];
const problems = [];
for (const loc of [...pageLocs, ...blogLocs]) {
  const p = toPath(loc);
  const st = emulatedStatus(p);
  const pg = pages.get(p);
  const inb = inbound.get(p);
  const r = {
    url: loc,
    path: p,
    sitemap: pageLocs.includes(loc) ? "pages" : "blog",
    status: st.status,
    canonical: pg?.canonical ?? null,
    canonicalOk: pg ? pg.canonical === loc : false,
    h1: pg?.h1 ?? 0,
    h1Text: pg?.h1Text ?? "",
    words: pg?.words ?? 0,
    robots: pg?.robots ?? null,
    title: pg?.title ?? "",
    description: pg?.description ?? "",
    ldTypes: pg ? [...new Set(pg.ldTypes)] : [],
    inbound: inb ? inb.pages.size : 0,
    inboundBy: inb
      ? Object.fromEntries(["header", "footer", "home", "hub", "vendor", "blog", "page"].map((k) => [k, inb[k].size]))
      : {},
  };
  if (LIVE) r.live = await liveStatus(loc);
  results.push(r);

  const issues = [];
  if (r.status !== 200) issues.push(`status ${r.status}${st.target ? " -> " + st.target : ""}`);
  if (pg && !r.canonicalOk) issues.push(`canonical ${r.canonical}`);
  if (pg && r.h1 !== 1) issues.push(`h1 count ${r.h1}`);
  if (pg && /noindex/i.test(r.robots || "")) issues.push(`robots ${r.robots}`);
  if (pg && /page not found|404/i.test(r.title)) issues.push("renders 404 page");
  if (LIVE && r.live && !/^200$/.test(r.live)) issues.push(`live ${r.live}`);
  if (issues.length) problems.push({ url: loc, issues });
}

/* ---------------- duplicates (title / description) ---------------- */

const dupes = (key) => {
  const m = new Map();
  for (const r of results) {
    if (!r[key]) continue;
    m.set(r[key], [...(m.get(r[key]) || []), r.path]);
  }
  return [...m].filter(([, v]) => v.length > 1);
};

/* ---------------- output ---------------- */

const pad = (s, n) => String(s).padEnd(n).slice(0, n);
const lpad = (s, n) => String(s).padStart(n);

function printTable(rows) {
  console.log(
    pad("URL", 46) + lpad("st", 4) + "  " + pad("canon", 5) + lpad("h1", 3) + lpad("words", 7) + "  " + pad("robots", 14) +
      lpad("in", 5) + "  hdr ftr home hub vnd blog page"
  );
  for (const r of rows) {
    const b = r.inboundBy;
    console.log(
      pad(r.path, 46) + lpad(r.status, 4) + "  " + pad(r.canonicalOk ? "ok" : "BAD", 5) + lpad(r.h1, 3) + lpad(r.words, 7) + "  " +
        pad((r.robots || "-").split(",").slice(0, 2).join(","), 14) + lpad(r.inbound, 5) + "  " +
        [b.header, b.footer, b.home, b.hub, b.vendor, b.blog, b.page].map((n) => lpad(n ?? 0, 3)).join(" ") +
        (LIVE ? "   live " + r.live : "")
    );
  }
}

console.log(`\n=== Cybersecurity pillar pages (${CYBER_PILLAR_PATHS.length}) ===`);
console.log("in = distinct other pages linking in; hdr/ftr = pages whose header/footer links it; home/hub/vnd/blog/page = in-body links from those page types\n");
printTable(CYBER_PILLAR_PATHS.map((p) => results.find((r) => r.path === p)).filter(Boolean));

console.log("\n--- Pillar on-page details ---");
const pillarDetails = [];
for (const { path: p, children } of CYBER_PILLARS) {
  const r = results.find((x) => x.path === p);
  if (!r) {
    console.log(p + "  NOT IN SITEMAP");
    continue;
  }
  const hasBc = r.ldTypes.includes("BreadcrumbList");
  const hasSvc = r.ldTypes.includes("Service");
  const pg = pages.get(p);
  // Product sub-pages of this pillar = sitemap URLs under its child prefixes.
  const subs = results.filter((x) => x.path !== p && children.some((c) => x.path.startsWith(c))).map((x) => x.path);
  const linkedFromPillar = pg ? new Set(pg.links.filter((l) => l.region === "body").map((l) => l.path)) : new Set();
  const subsLinked = subs.filter((s) => linkedFromPillar.has(s));
  const subsLinkingBack = subs.filter((s) => (pages.get(s)?.links || []).some((l) => l.region === "body" && l.path === p));
  const d = {
    path: p,
    h1: r.h1Text,
    title: r.title,
    descLen: (r.description || "").length,
    breadcrumbList: hasBc,
    service: hasSvc,
    subPages: subs.length,
    subPagesLinkedFromPillar: subsLinked.length,
    subPagesLinkingBack: subsLinkingBack.length,
    subPagesNotLinkingBack: subs.filter((s) => !subsLinkingBack.includes(s)),
    subPagesNotLinkedFromPillar: subs.filter((s) => !subsLinked.includes(s)),
  };
  pillarDetails.push(d);
  console.log(
    `${p}\n    H1="${d.h1}"\n    title="${d.title}" (desc ${d.descLen} chars)\n` +
      `    BreadcrumbList=${hasBc ? "yes" : "NO"}  Service=${hasSvc ? "yes" : "NO"}  ` +
      `sub-pages=${d.subPages}  linked from pillar=${d.subPagesLinkedFromPillar}  linking back=${d.subPagesLinkingBack}` +
      (d.subPagesNotLinkingBack.length ? `\n    NOT linking back: ${d.subPagesNotLinkingBack.join(", ")}` : "") +
      (d.subPagesNotLinkedFromPillar.length ? `\n    not linked from pillar body: ${d.subPagesNotLinkedFromPillar.join(", ")}` : "")
  );
}

if (ALL) {
  console.log(`\n=== All sitemap URLs (${results.length}) ===\n`);
  printTable(results);
}

console.log(`\n=== Sitemap health: ${results.length} URLs (${pageLocs.length} pages + ${blogLocs.length} blog) ===`);
if (!problems.length) console.log("OK: every sitemap URL is 200, self-canonical, indexable, single-H1.");
else for (const p of problems) console.log("  " + pad(toPath(p.url), 60) + p.issues.join("; "));

const zeroInbound = results.filter((r) => r.inbound === 0).map((r) => r.path);
console.log(`\nOrphans (0 inbound internal links): ${zeroInbound.length ? zeroInbound.join(", ") : "none"}`);

const dt = dupes("title");
const dd = dupes("description");
console.log(`Duplicate titles: ${dt.length}${dt.length ? "\n  " + dt.map(([t, v]) => `"${t}" -> ${v.join(", ")}`).join("\n  ") : ""}`);
console.log(`Duplicate descriptions: ${dd.length}${dd.length ? "\n  " + dd.map(([, v]) => v.join(", ")).join("\n  ") : ""}`);

console.log(`\nNon-canonical internal hrefs: ${nonCanonicalLinks.size}`);
for (const [href, v] of [...nonCanonicalLinks].slice(0, 40)) {
  console.log(`  ${pad(href, 70)} ${pad(v.reason, 18)} on ${v.pages.size} page(s), e.g. ${[...v.pages][0]}`);
}

/* Header coverage: every page's <header> must carry all 11 pillar links,
   and the header must not hide links with the `hidden` attribute or an
   inline display:none (the menus are hidden with visibility only). */
const headerGaps = [];
const headerHiddenBlocks = [];
for (const file of walk(DIST)) {
  const rel = path.relative(DIST, path.dirname(file)).split(path.sep).join("/");
  const route = rel ? "/" + rel : "/";
  const html = fs.readFileSync(file, "utf8").replace(/<!--[\s\S]*?-->/g, "");
  const r = regionOf(html, "header", "first");
  const header = r ? html.slice(r[0], r[1]) : "";
  const missing = CYBER_PILLAR_PATHS.filter((p) => !header.includes(`href="${p}"`));
  if (missing.length) headerGaps.push(`${route} (missing ${missing.length})`);
  if (/<[a-z]+[^>]*\shidden(=""|\s|>)/i.test(header) || /style="[^"]*display:\s*none/i.test(header)) headerHiddenBlocks.push(route);
}
console.log(
  `\nHeader menu: pages whose <header> links all ${CYBER_PILLAR_PATHS.length} pillars: ${pages.size - headerGaps.length}/${pages.size}` +
    (headerGaps.length ? `\n  gaps: ${headerGaps.slice(0, 20).join(", ")}` : "")
);
console.log(`Header elements hidden via [hidden] / display:none: ${headerHiddenBlocks.length ? headerHiddenBlocks.length + " page(s), e.g. " + headerHiddenBlocks[0] : "none"}`);
if (headerGaps.length || headerHiddenBlocks.length) process.exitCode = 1;

const notInSitemap =[...pages.keys()].filter((r) => !sitemapPathSet.has(r));
console.log(`\nPrerendered pages not in any sitemap: ${notInSitemap.length ? notInSitemap.join(", ") : "none"}`);

fs.writeFileSync(
  path.join(DIST, "_seo-verify.json"),
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      results,
      problems,
      pillarDetails,
      nonCanonicalLinks: [...nonCanonicalLinks].map(([href, v]) => ({ href, reason: v.reason, pages: [...v.pages] })),
    },
    null,
    2
  )
);
console.log("\nFull report: dist/_seo-verify.json");
if (problems.length) process.exitCode = 1;
