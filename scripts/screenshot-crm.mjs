import { chromium } from "playwright";
import fs from "node:fs";

fs.mkdirSync("scripts/_screenshots", { recursive: true });

const errors = [];
const consoleMessages = [];

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

page.on("console", (msg) => consoleMessages.push(`[${msg.type()}] ${msg.text()}`));
page.on("pageerror", (err) => errors.push(`PAGEERROR: ${err.message}`));

await page.goto("http://localhost:5176/business-solutions/crm-software", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);

await page.screenshot({ path: "scripts/_screenshots/crm-hero.png", fullPage: false });

const h1 = await page.locator("h1").first().textContent();
const jsonLdCount = await page.locator('script[type="application/ld+json"]').count();
const title = await page.title();
const metaDescription = await page.locator('meta[name="description"]').last().getAttribute("content");
const canonical = await page.locator('link[rel="canonical"]').last().getAttribute("href");
const h2Texts = await page.locator("h2").allTextContents();

console.log("=== PAGE ERRORS ===");
for (const e of errors) console.log(e);
console.log("=== NON-INFO CONSOLE ===");
for (const m of consoleMessages) {
  if (!/\[debug\]|\[info\]|WebGL|devtools/i.test(m)) console.log(m);
}
console.log("=== TITLE ===");
console.log(title);
console.log("=== META DESCRIPTION ===");
console.log(metaDescription);
console.log("=== CANONICAL ===");
console.log(canonical);
console.log("=== H1 ===");
console.log(h1);
console.log("=== H2s ===");
h2Texts.forEach((t, i) => console.log(`${i + 1}. ${t.trim()}`));
console.log("=== JSON-LD COUNT ===");
console.log(jsonLdCount);

await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.85));
await page.waitForTimeout(600);
await page.screenshot({ path: "scripts/_screenshots/crm-stats.png" });

await browser.close();
