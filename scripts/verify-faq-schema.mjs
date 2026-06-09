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
  const url = `${HOST}/${slug}`;
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  // Scroll to FAQ so the section renders
  await page.evaluate(() => {
    const h = Array.from(document.querySelectorAll("h2")).find((x) =>
      /frequently asked questions/i.test(x.textContent || "")
    );
    if (h) h.scrollIntoView({ block: "start" });
  });
  await page.waitForTimeout(600);

  // Extract rendered accordion questions
  const questions = await page.evaluate(() => {
    const sec = document.getElementById("faq") ||
      Array.from(document.querySelectorAll("section")).find((s) =>
        /frequently asked questions/i.test(s.textContent || "")
      );
    if (!sec) return [];
    const btns = Array.from(sec.querySelectorAll("button"));
    return btns.map((b) => {
      // Question is the first span/text inside the button, excluding the "+" icon wrapper span.
      const spans = Array.from(b.querySelectorAll("span"));
      const qSpan = spans.find(
        (s) => !s.querySelector("svg") && (s.textContent || "").trim().length > 0
      );
      return (qSpan?.textContent || b.textContent || "").trim();
    });
  });

  // Open each accordion and grab the answer
  const answers = [];
  const btnLocator = page.locator("section#faq button");
  const n = await btnLocator.count();
  for (let i = 0; i < n; i++) {
    await btnLocator.nth(i).click();
    await page.waitForTimeout(220);
    const answer = await page.evaluate((idx) => {
      const btns = Array.from(document.querySelectorAll("section#faq button"));
      const btn = btns[idx];
      if (!btn) return "";
      const item = btn.closest("div[class*='rounded-xl'], div[class*='border']");
      if (!item) return "";
      // The answer <p> sits inside the panel wrapper
      const p = item.querySelector("p");
      return (p?.textContent || "").trim();
    }, i);
    answers.push(answer);
    await btnLocator.nth(i).click();
    await page.waitForTimeout(120);
  }

  // Extract FAQPage JSON-LD
  const faqLd = await page.evaluate(() => {
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    for (const s of scripts) {
      try {
        const p = JSON.parse(s.textContent || "{}");
        if (p["@type"] === "FAQPage") return p;
      } catch (_e) {
        // ignore
      }
    }
    return null;
  });

  const schemaPairs =
    faqLd && Array.isArray(faqLd.mainEntity)
      ? faqLd.mainEntity.map((q) => ({
          q: (q.name || "").trim(),
          a: (q.acceptedAnswer?.text || "").trim(),
        }))
      : [];

  const rendered = questions.map((q, i) => ({ q, a: answers[i] || "" }));

  console.log(`\n========== ${slug} ==========`);
  console.log(`rendered Q&A count: ${rendered.length}`);
  console.log(`schema Q&A count:   ${schemaPairs.length}`);

  let pageMismatch = false;
  if (rendered.length !== schemaPairs.length) {
    pageMismatch = true;
    console.log("MISMATCH: counts differ.");
  }

  const len = Math.max(rendered.length, schemaPairs.length);
  for (let i = 0; i < len; i++) {
    const r = rendered[i] || { q: "", a: "" };
    const s = schemaPairs[i] || { q: "", a: "" };
    if (r.q !== s.q) {
      pageMismatch = true;
      console.log(`  Q${i + 1} MISMATCH:`);
      console.log(`    rendered: ${r.q}`);
      console.log(`    schema:   ${s.q}`);
    }
    if (r.a !== s.a) {
      pageMismatch = true;
      console.log(`  A${i + 1} MISMATCH:`);
      console.log(`    rendered: ${r.a.slice(0, 140)}`);
      console.log(`    schema:   ${s.a.slice(0, 140)}`);
    }
  }
  if (!pageMismatch) console.log("  ✓ rendered Q&A match FAQPage JSON-LD verbatim.");
  else anyMismatch = true;
}

await browser.close();
console.log("\n=== OVERALL ===");
console.log(anyMismatch ? "AT LEAST ONE PAGE HAS MISMATCHES — FIX REQUIRED." : "ALL PAGES: FAQPage schema matches rendered FAQs verbatim.");
