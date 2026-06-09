import { chromium } from "playwright";

const HOST = "http://localhost:5184";
const siblings = [
  "/business-solutions/erp-software",
  "/business-solutions/crm-software",
  "/business-solutions/sales-management-software",
  "/business-solutions/finance-accounting-software",
  "/business-solutions/hr-management-software",
  "/business-solutions/document-management-system",
  "/business-solutions/unified-firewall-management",
];
const parent = "/business-solutions";
const cyberFw = "/cybersecurity/firewalls-network-security";

const pages = [
  { slug: "business-solutions", name: "Overview (parent)" },
  { slug: "business-solutions/erp-software", name: "ERP" },
  { slug: "business-solutions/crm-software", name: "CRM" },
  { slug: "business-solutions/sales-management-software", name: "Sales" },
  { slug: "business-solutions/finance-accounting-software", name: "Finance" },
  { slug: "business-solutions/hr-management-software", name: "HRM" },
  { slug: "business-solutions/document-management-system", name: "DMS" },
  { slug: "business-solutions/unified-firewall-management", name: "UFM" },
  { slug: "cybersecurity/firewalls-network-security", name: "Cyber · Firewalls (for UFM reciprocal)" },
];

const genericAnchors = /^(click here|here|learn more|read more|this|link|more)\.?$/i;

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const report = [];

for (const p of pages) {
  await page.goto(`${HOST}/${p.slug}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);

  // Collect all <a> inside <main>, exclude Navbar/Footer
  const links = await page.evaluate(() => {
    const main = document.querySelector("main");
    if (!main) return [];
    return Array.from(main.querySelectorAll("a[href]")).map((a) => ({
      href: a.getAttribute("href") || "",
      text: (a.textContent || "").replace(/\s+/g, " ").trim(),
      inBreadcrumb: Boolean(a.closest('nav[aria-label="Breadcrumb"]')),
      inCta: Boolean(a.closest('[class*="CTASection"]')) || /book a demo|see .* pricing|get started|contact/i.test((a.textContent || "").trim()),
    }));
  });

  report.push({ page: p, links });
}

await browser.close();

console.log("=== BUSINESS SOLUTIONS — INTERNAL LINK AUDIT ===\n");

for (const { page: p, links } of report) {
  console.log(`\n## ${p.name}  (/${p.slug})`);

  const toParent = links.filter((l) => l.href === parent || l.href.startsWith(parent + "#"));
  const toParentBC = toParent.filter((l) => l.inBreadcrumb).length;
  const toParentBody = toParent.filter((l) => !l.inBreadcrumb && !l.inCta).length;
  const toParentCta = toParent.filter((l) => l.inCta).length;

  const toSiblings = links.filter((l) => siblings.some((s) => l.href === s || l.href.startsWith(s + "#")) && !l.href.startsWith(`/${p.slug}`));
  // sibling count where href is NOT the current page's own slug
  const uniqSiblings = new Set(toSiblings.map((l) => l.href.split("#")[0])).size;

  const toCyberFw = links.filter((l) => l.href === cyberFw || l.href.startsWith(cyberFw + "#"));
  const genericTextLinks = links.filter((l) => genericAnchors.test(l.text));

  console.log(`  Parent links: ${toParent.length}  (breadcrumb=${toParentBC}, in-body=${toParentBody}, cta=${toParentCta})`);
  console.log(`  Lateral sibling links (distinct): ${uniqSiblings}`);
  if (uniqSiblings > 0) {
    const set = new Map();
    for (const l of toSiblings) {
      const key = l.href.split("#")[0];
      if (!set.has(key)) set.set(key, l.text);
    }
    for (const [href, text] of set) console.log(`    - ${href}  "${text}"`);
  }
  console.log(`  Link(s) to /cybersecurity/firewalls-network-security: ${toCyberFw.length}`);
  for (const l of toCyberFw) console.log(`    - "${l.text}"`);
  console.log(`  Generic anchor text issues: ${genericTextLinks.length}`);
  for (const l of genericTextLinks) console.log(`    ! "${l.text}" -> ${l.href}`);

  // Overview should link to ALL 7 sub-pages
  if (p.slug === "business-solutions") {
    const covered = new Set(links.filter((l) => siblings.includes(l.href)).map((l) => l.href));
    const missing = siblings.filter((s) => !covered.has(s));
    console.log(`  Overview coverage: ${covered.size}/7 sub-pages linked`);
    if (missing.length) console.log(`    MISSING sibling links: ${missing.join(", ")}`);
  }
}

console.log("\n=== DONE ===");
