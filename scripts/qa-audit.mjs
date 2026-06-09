import { chromium } from "playwright";
import fs from "node:fs";

const HOST = "http://localhost:5184";
const pages = [
  { slug: "business-solutions", pk: "business software solutions", name: "Overview" },
  { slug: "business-solutions/erp-software", pk: "ERP software", name: "ERP" },
  { slug: "business-solutions/crm-software", pk: "CRM software", name: "CRM" },
  { slug: "business-solutions/sales-management-software", pk: "sales management software", name: "Sales" },
  { slug: "business-solutions/finance-accounting-software", pk: "accounting software for business", name: "Finance" },
  { slug: "business-solutions/hr-management-software", pk: "HR management software", name: "HRM" },
  { slug: "business-solutions/document-management-system", pk: "document management system", name: "DMS" },
  { slug: "business-solutions/unified-firewall-management", pk: "firewall management software", name: "UFM" },
];

fs.mkdirSync("scripts/_screenshots/qa", { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

const report = [];

for (const cfg of pages) {
  const url = `${HOST}/${cfg.slug}`;
  const errors = [];
  const consoleErrors = [];
  page.removeAllListeners("pageerror");
  page.removeAllListeners("console");
  page.on("pageerror", (e) => errors.push(`PAGEERROR: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });

  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(800);

  // SEO
  const title = await page.title();
  const metaDesc = (await page.locator('meta[name="description"]').last().getAttribute("content")) || "";
  const canonical = (await page.locator('link[rel="canonical"]').last().getAttribute("href")) || "";
  const ogTitle = await page.locator('meta[property="og:title"]').last().getAttribute("content");
  const ogDesc = await page.locator('meta[property="og:description"]').last().getAttribute("content");
  const ogImage = await page.locator('meta[property="og:image"]').last().getAttribute("content");
  const ogType = await page.locator('meta[property="og:type"]').last().getAttribute("content");
  const twCard = await page.locator('meta[name="twitter:card"]').last().getAttribute("content");
  const twTitle = await page.locator('meta[name="twitter:title"]').last().getAttribute("content");
  const twDesc = await page.locator('meta[name="twitter:description"]').last().getAttribute("content");
  const h1s = await page.locator("h1").allTextContents();
  const h2s = await page.locator("h2").allTextContents();
  const jsonLdCount = await page.locator('script[type="application/ld+json"]').count();
  const jsonLdTypes = [];
  for (let i = 0; i < jsonLdCount; i++) {
    try {
      const c = await page.locator('script[type="application/ld+json"]').nth(i).textContent();
      if (c) {
        const parsed = JSON.parse(c);
        jsonLdTypes.push(parsed["@type"]);
      }
    } catch (_e) {
      jsonLdTypes.push("PARSE_ERROR");
    }
  }

  // SEO validations
  const titleLenOk = title.length >= 40 && title.length <= 90; // we allow a wider band than 50-60 because some legit titles run longer
  const descLenOk = metaDesc.length >= 110 && metaDesc.length <= 200;
  const canonMatches = canonical.endsWith(`/${cfg.slug}`);
  const h1Count = h1s.length;
  const h1HasPk = h1s[0]?.toLowerCase().includes(cfg.pk.toLowerCase());
  const titleHasPk = title.toLowerCase().includes(cfg.pk.toLowerCase());
  const descHasPk = metaDesc.toLowerCase().includes(cfg.pk.toLowerCase());
  const ogOk = ogTitle && ogDesc && ogImage && ogType === "website";
  const twOk = twCard === "summary_large_image" && twTitle && twDesc;
  const hasFaqLd = jsonLdTypes.includes("FAQPage");
  const hasServiceOrSwLd = jsonLdTypes.some((t) => t === "Service" || t === "SoftwareApplication");
  const hasBreadcrumbLd = jsonLdTypes.includes("BreadcrumbList");

  // A11y: heading hierarchy
  const hOrder = await page.evaluate(() => {
    const hs = Array.from(document.querySelectorAll("h1,h2,h3,h4"));
    return hs.map((h) => Number(h.tagName.substring(1)));
  });
  let hierarchyOk = true;
  for (let i = 1; i < hOrder.length; i++) {
    if (hOrder[i] - hOrder[i - 1] > 1) { hierarchyOk = false; break; }
  }

  // Alt text
  const imgsWithoutAlt = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll("img"));
    return imgs.filter((i) => !i.hasAttribute("alt")).length;
  });

  // Interactive elements accessible name
  const interactivesWithoutName = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll("button, a"));
    let n = 0;
    for (const el of els) {
      const hasText = (el.textContent || "").trim().length > 0;
      const hasAria = el.hasAttribute("aria-label") || el.hasAttribute("aria-labelledby");
      const hasTitle = el.hasAttribute("title");
      if (!hasText && !hasAria && !hasTitle) n++;
    }
    return n;
  });

  // Internal links
  const hasParentLink = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll("a"));
    return links.some((a) => {
      const href = a.getAttribute("href") || "";
      return href === "/business-solutions" || href.endsWith("/business-solutions");
    });
  });
  const lateralLinkCount = await page.evaluate((selfSlug) => {
    const siblings = [
      "/business-solutions/erp-software",
      "/business-solutions/crm-software",
      "/business-solutions/sales-management-software",
      "/business-solutions/finance-accounting-software",
      "/business-solutions/hr-management-software",
      "/business-solutions/document-management-system",
      "/business-solutions/unified-firewall-management",
    ].filter((s) => !s.endsWith(selfSlug));
    const anchors = Array.from(document.querySelectorAll("a")).map((a) => a.getAttribute("href") || "");
    const hits = new Set(anchors.filter((h) => siblings.some((s) => h === s || h.startsWith(s + "#") || h.startsWith(s + "?"))));
    return hits.size;
  }, "/" + cfg.slug);

  // Skip link present (from Layout)
  const skipLink = await page.locator('a[href="#main-content"]').count();

  // Horizontal scroll at each viewport
  const hScroll = {};
  for (const vp of [360, 768, 1024, 1440]) {
    await page.setViewportSize({ width: vp, height: 800 });
    await page.waitForTimeout(200);
    const has = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    hScroll[vp] = has;
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(200);

  // FAQ keyboard check
  const firstFaqBtn = page.locator('main button:has-text("What")').first();
  let faqKeyboardOk = false;
  try {
    await firstFaqBtn.focus({ timeout: 3000 });
    await page.keyboard.press("Enter");
    await page.waitForTimeout(300);
    // Check if any accordion panel expanded (max-height changed)
    faqKeyboardOk = await page.evaluate(() => {
      const panels = document.querySelectorAll('[style*="max-height"]');
      return Array.from(panels).some((p) => {
        const mh = (p.getAttribute("style") || "").match(/max-height:\s*([\d.]+)/);
        return mh && parseFloat(mh[1]) > 0;
      });
    });
  } catch (_e) {
    faqKeyboardOk = false;
  }

  // Hero screenshot
  await page.screenshot({
    path: `scripts/_screenshots/qa/${cfg.slug.replace(/\//g, "__")}-hero.png`,
    fullPage: false,
  });

  const row = {
    name: cfg.name,
    slug: cfg.slug,
    url,
    title,
    titleLen: title.length,
    titleLenOk,
    titleHasPk,
    descLen: metaDesc.length,
    descLenOk,
    descHasPk,
    canonical,
    canonMatches,
    h1Count,
    h1HasPk,
    h1: h1s[0] || "",
    h2Count: h2s.length,
    ogOk,
    ogType,
    twOk,
    twCard,
    jsonLdCount,
    jsonLdTypes,
    hasFaqLd,
    hasServiceOrSwLd,
    hasBreadcrumbLd,
    hierarchyOk,
    imgsWithoutAlt,
    interactivesWithoutName,
    hasParentLink,
    lateralLinkCount,
    skipLink,
    hScroll,
    faqKeyboardOk,
    pageErrors: errors,
    consoleErrors,
  };
  report.push(row);
  console.log(`${cfg.name}  OK`);
}

fs.writeFileSync("scripts/_qa-report.json", JSON.stringify(report, null, 2), "utf8");

// Print condensed table
console.log("\n=== QA AUDIT TABLE ===");
console.log("Page | Title | Desc | H1 | JSON-LD | Breadcrumb | Parent | Lateral | h-scroll | FAQ keys | Page errs");
for (const r of report) {
  const titleOk = r.titleLenOk && r.titleHasPk;
  const descOk = r.descLenOk && r.descHasPk;
  const h1Ok = r.h1Count === 1 && r.h1HasPk;
  const jsonOk = r.hasFaqLd && r.hasServiceOrSwLd;
  const hScrollNone = Object.values(r.hScroll).every((v) => !v);
  console.log(
    `${r.name} | ${titleOk ? "PASS" : "FAIL"} (${r.titleLen}) | ${descOk ? "PASS" : "FAIL"} (${r.descLen}) | ${h1Ok ? "PASS" : "FAIL"} (${r.h1Count}) | ${jsonOk ? "PASS" : "FAIL"} [${r.jsonLdTypes.join(",")}] | ${r.hasBreadcrumbLd ? "PASS" : "FAIL"} | ${r.hasParentLink ? "PASS" : "FAIL"} | ${r.lateralLinkCount}x | ${hScrollNone ? "PASS" : "FAIL " + JSON.stringify(r.hScroll)} | ${r.faqKeyboardOk ? "PASS" : "FAIL"} | ${r.pageErrors.length}`
  );
}

console.log("\n=== DETAILS PER PAGE ===");
for (const r of report) {
  console.log(`\n## ${r.name}`);
  console.log(`  Title (${r.titleLen}): ${r.title}`);
  console.log(`  H1 (x${r.h1Count}): ${r.h1}`);
  console.log(`  Canonical match: ${r.canonMatches} -> ${r.canonical}`);
  console.log(`  OG: type=${r.ogType} ok=${r.ogOk}`);
  console.log(`  TW: card=${r.twCard} ok=${r.twOk}`);
  console.log(`  JSON-LD types: ${r.jsonLdTypes.join(", ")}`);
  console.log(`  Heading hierarchy OK: ${r.hierarchyOk}`);
  console.log(`  Imgs without alt: ${r.imgsWithoutAlt}`);
  console.log(`  Interactives without accessible name: ${r.interactivesWithoutName}`);
  console.log(`  Parent link: ${r.hasParentLink} | Lateral links: ${r.lateralLinkCount} | Skip link nodes: ${r.skipLink}`);
  console.log(`  Horizontal scroll per VP: ${JSON.stringify(r.hScroll)}`);
  console.log(`  FAQ keyboard operable: ${r.faqKeyboardOk}`);
  if (r.pageErrors.length) console.log(`  Page errors: ${r.pageErrors.join("; ")}`);
  if (r.consoleErrors.length) console.log(`  Console errors: ${r.consoleErrors.join("; ")}`);
}

await browser.close();
console.log("\n=== DONE ===");
