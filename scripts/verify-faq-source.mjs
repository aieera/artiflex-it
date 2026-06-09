import fs from "node:fs";
import path from "node:path";

const pagesDir = path.resolve("src/pages/Services/business-solutions/pages");
const pageFiles = [
  "BusinessSolutionsOverview.tsx",
  "ErpSoftware.tsx",
  "CrmSoftware.tsx",
  "SalesManagementSoftware.tsx",
  "FinanceAccountingSoftware.tsx",
  "HrManagementSoftware.tsx",
  "DocumentManagementSystem.tsx",
  "UnifiedFirewallManagement.tsx",
];

let overallOk = true;

for (const file of pageFiles) {
  const full = path.join(pagesDir, file);
  const src = fs.readFileSync(full, "utf8");

  const problems = [];

  // 1) Must contain a `const faqs = [` literal array.
  if (!/const faqs = \[/.test(src)) {
    problems.push("no const faqs = [");
  }

  // 2) FAQAccordion must receive items={faqs}.
  if (!/<FAQAccordion\s+items=\{faqs\}/.test(src)) {
    problems.push("FAQAccordion items prop is not {faqs}");
  }

  // 3) faqSchema.mainEntity must be faqs.map(...)
  const schemaOk = /mainEntity:\s*faqs\.map\(\(f\)\s*=>\s*\(\{[\s\S]*?"@type":\s*"Question"[\s\S]*?name:\s*f\.question[\s\S]*?acceptedAnswer:\s*\{\s*"@type":\s*"Answer",\s*text:\s*f\.answer\s*\}/.test(src);
  if (!schemaOk) {
    problems.push("faqSchema.mainEntity is not derived from faqs.map with f.question / f.answer");
  }

  // 4) Count entries in `const faqs = [ ... ]` by counting `question:` occurrences within that literal.
  const faqsBlockMatch = src.match(/const faqs = \[([\s\S]*?)\];/);
  let faqCount = 0;
  if (faqsBlockMatch) {
    const inner = faqsBlockMatch[1];
    faqCount = (inner.match(/question:\s*["`]/g) || []).length;
    const answerCount = (inner.match(/answer:\s*\n?\s*["`]/g) || []).length;
    if (answerCount !== faqCount) {
      problems.push(`question count (${faqCount}) != answer count (${answerCount})`);
    }
  } else {
    problems.push("could not locate faqs array literal");
  }

  // 5) faqSchema is registered in Helmet as a JSON-LD script tag.
  if (!/<script\s+type="application\/ld\+json">\{JSON\.stringify\(faqSchema\)\}<\/script>/.test(src)) {
    problems.push("faqSchema is not emitted in Helmet as JSON-LD script");
  }

  const status = problems.length === 0 ? "OK" : "FAIL";
  if (problems.length > 0) overallOk = false;
  console.log(`${status.padEnd(4)} | ${file.padEnd(32)} | faqs count=${faqCount}`);
  for (const p of problems) console.log(`       - ${p}`);
}

console.log("\n=== OVERALL ===");
console.log(overallOk ? "ALL 8 PAGES: FAQAccordion items and FAQPage schema share the same faqs source." : "ONE OR MORE PAGES HAVE DIVERGENT FAQ WIRING — FIX REQUIRED.");
