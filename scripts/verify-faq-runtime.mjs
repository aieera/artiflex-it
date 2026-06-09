import { chromium } from "playwright";

const HOST = "http://localhost:5184";
const slugs = [
  "business-solutions",
  "business-solutions/erp-software",
  "business-solutions/crm-software",
  "business-solutions/sales-management-software",
  "business-solutions/finance-accounting-software",
  "business-solutions/hr-management-software",
  "business-solutions/document-management-system",
  "business-solutions/unified-firewall-management",
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

let anyMismatch = false;

for (const slug of slugs) {
  await page.goto(`${HOST}/${slug}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  await page.evaluate(() => {
    const h = Array.from(document.querySelectorAll("h2")).find((x) =>
      /frequently asked questions/i.test(x.textContent || "")
    );
    if (h) h.scrollIntoView({ block: "start" });
  });
  await page.waitForTimeout(400);

  const rendered = await page.evaluate(() => {
    const sec = document.getElementById("faq");
    if (!sec) return [];
    const btns = Array.from(sec.querySelectorAll("button"));
    return btns.map((b) => {
      const spans = Array.from(b.querySelectorAll("span"));
      const qSpan = spans.find((s) => !s.querySelector("svg") && (s.textContent || "").trim().length > 0);
      return (qSpan?.textContent || b.textContent || "").trim();
    });
  });

  const faqLd = await page.evaluate(() => {
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    for (const s of scripts) {
      try {
        const p = JSON.parse(s.textContent || "{}");
        if (p["@type"] === "FAQPage") return p;
      } catch (_e) {}
    }
    return null;
  });
  const schemaQs = faqLd?.mainEntity?.map((q) => (q.name || "").trim()) || [];

  const countsMatch = rendered.length === schemaQs.length && rendered.length > 0;
  let every = countsMatch;
  if (countsMatch) {
    for (let i = 0; i < rendered.length; i++) {
      if (rendered[i] !== schemaQs[i]) {
        every = false;
        break;
      }
    }
  }
  const status = every ? "OK" : "FAIL";
  if (!every) anyMismatch = true;
  console.log(`${status.padEnd(4)} | ${slug.padEnd(48)} | rendered=${rendered.length} schema=${schemaQs.length}`);
  if (!every) {
    for (let i = 0; i < Math.max(rendered.length, schemaQs.length); i++) {
      if ((rendered[i] || "") !== (schemaQs[i] || "")) {
        console.log(`       Q${i + 1} rendered: ${rendered[i] || "<missing>"}`);
        console.log(`       Q${i + 1} schema:   ${schemaQs[i] || "<missing>"}`);
      }
    }
  }
}

await browser.close();
console.log("\n=== OVERALL ===");
console.log(anyMismatch ? "MISMATCHES FOUND" : "All 8 pages: rendered FAQ questions match FAQPage schema mainEntity[].name verbatim.");
