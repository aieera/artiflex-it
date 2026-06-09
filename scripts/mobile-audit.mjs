import { chromium } from "playwright";
import fs from "node:fs";

const HOST = "http://localhost:5184";
const pages = [
  { slug: "business-solutions", name: "Overview" },
  { slug: "business-solutions/erp-software", name: "ERP" },
  { slug: "business-solutions/crm-software", name: "CRM" },
  { slug: "business-solutions/sales-management-software", name: "Sales" },
  { slug: "business-solutions/finance-accounting-software", name: "Finance" },
  { slug: "business-solutions/hr-management-software", name: "HRM" },
  { slug: "business-solutions/document-management-system", name: "DMS" },
  { slug: "business-solutions/unified-firewall-management", name: "UFM" },
];

const viewports = [
  { w: 360, h: 800, label: "360" },
  { w: 390, h: 844, label: "390" },
];

fs.mkdirSync("scripts/_screenshots/mobile", { recursive: true });

const browser = await chromium.launch({ headless: true });
const out = [];

for (const vp of viewports) {
  for (const p of pages) {
    const ctx = await browser.newContext({
      viewport: { width: vp.w, height: vp.h },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const page = await ctx.newPage();
    await page.goto(`${HOST}/${p.slug}`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(500);

    // Warm motion by scrolling whole page
    await page.evaluate(async () => {
      const total = document.documentElement.scrollHeight;
      for (let y = 0; y < total; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 20));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(400);

    // Page-level horizontal overflow
    const docOverflow = await page.evaluate(() => {
      const d = document.documentElement;
      return { sw: d.scrollWidth, cw: d.clientWidth };
    });

    // Elements that overflow the viewport width (likely culprits of page h-scroll)
    const overflowers = await page.evaluate((vw) => {
      const flagged = [];
      const all = Array.from(document.querySelectorAll("body *"));
      for (const el of all) {
        const r = el.getBoundingClientRect();
        if (r.right > vw + 0.5 && r.width > 2) {
          flagged.push({
            tag: el.tagName,
            cls: (el.className || "").toString().slice(0, 100),
            w: Math.round(r.width),
            right: Math.round(r.right),
            textHead: (el.textContent || "").trim().slice(0, 40),
          });
        }
      }
      return flagged.slice(0, 40);
    }, vp.w);

    // Small tap targets (< 44x44) inside <main>
    const smallTargets = await page.evaluate(() => {
      const out = [];
      const main = document.querySelector("main") || document.body;
      const els = Array.from(main.querySelectorAll("a, button, [role='button']"));
      for (const el of els) {
        if (!el.offsetParent && !el.closest("nav")) continue; // skip hidden
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44)) {
          out.push({
            tag: el.tagName,
            w: Math.round(r.width),
            h: Math.round(r.height),
            text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 48),
            cls: (el.className || "").toString().slice(0, 70),
          });
        }
      }
      return out.slice(0, 40);
    });

    // Text nodes that overflow their parent horizontally
    const textOverflow = await page.evaluate(() => {
      const out = [];
      const all = Array.from(document.querySelectorAll("h1, h2, h3, h4, p, span, a, button, li"));
      for (const el of all) {
        if (el.scrollWidth > el.clientWidth + 1 && el.clientWidth > 0) {
          out.push({
            tag: el.tagName,
            scrollW: el.scrollWidth,
            clientW: el.clientWidth,
            text: (el.textContent || "").trim().slice(0, 60),
            cls: (el.className || "").toString().slice(0, 70),
          });
        }
      }
      return out.slice(0, 20);
    });

    // Full-page screenshot
    const key = `${p.slug.replace(/\//g, "__")}-${vp.label}`;
    await page.screenshot({
      path: `scripts/_screenshots/mobile/${key}.png`,
      fullPage: true,
    });

    out.push({
      page: p.name,
      slug: p.slug,
      vp: vp.label,
      docOverflow,
      overflowersCount: overflowers.length,
      overflowers: overflowers.slice(0, 6),
      smallTargetsCount: smallTargets.length,
      smallTargets: smallTargets.slice(0, 8),
      textOverflowCount: textOverflow.length,
      textOverflow: textOverflow.slice(0, 6),
    });
    await ctx.close();
  }
}

fs.writeFileSync("scripts/_mobile-report.json", JSON.stringify(out, null, 2));

console.log("\n=== MOBILE AUDIT SUMMARY ===");
console.log(`Page | VP | h-scroll? (sw>cw) | overflowers | small-tap | text-overflow`);
for (const r of out) {
  const scrolls = r.docOverflow.sw > r.docOverflow.cw + 0.5;
  console.log(`${r.page.padEnd(8)} | ${r.vp} | ${scrolls ? `YES (${r.docOverflow.sw}>${r.docOverflow.cw})` : "no"} | ${r.overflowersCount} | ${r.smallTargetsCount} | ${r.textOverflowCount}`);
}

console.log("\n=== DETAILS ===");
for (const r of out) {
  if (r.overflowersCount > 0 || r.smallTargetsCount > 0 || r.textOverflowCount > 0) {
    console.log(`\n## ${r.page} @ ${r.vp}`);
    if (r.overflowersCount) {
      console.log(`  Overflowers (first ${r.overflowers.length}):`);
      for (const o of r.overflowers) console.log(`    - ${o.tag} w=${o.w} right=${o.right} cls="${o.cls}" text="${o.textHead}"`);
    }
    if (r.smallTargetsCount) {
      console.log(`  Small tap targets (first ${r.smallTargets.length}):`);
      for (const s of r.smallTargets) console.log(`    - ${s.tag} ${s.w}x${s.h} "${s.text}" cls="${s.cls}"`);
    }
    if (r.textOverflowCount) {
      console.log(`  Text overflow (first ${r.textOverflow.length}):`);
      for (const t of r.textOverflow) console.log(`    - ${t.tag} sw=${t.scrollW} cw=${t.clientW} "${t.text}"`);
    }
  }
}

await browser.close();
console.log("\n=== DONE ===");
