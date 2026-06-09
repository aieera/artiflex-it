import fs from "node:fs";
import path from "node:path";

const src = path.resolve("seo-docs/Artiflex-IT-Business-Solutions-Website-Content.md");
const outDir = path.resolve("content/BusinessSolutions");
fs.mkdirSync(outDir, { recursive: true });

let raw = fs.readFileSync(src, "utf8");

// Strip mammoth's unnecessary punctuation escapes (benign chars that don't need escaping in plain prose).
raw = raw.replace(/\\([\.\-\:\/\&\@\!\?\+\=\,\;\(\)\[\]\{\}])/g, "$1");

// Trailing-space artifacts from mammoth bold runs: "__Meta Title: __Business..."
raw = raw.replace(/__(\s+)__/g, "__ __");

const outputs = [
  { n: 1, file: "01-Business-Solutions-Overview.md" },
  { n: 2, file: "02-ERP-Solutions.md" },
  { n: 3, file: "03-CRM-Solutions.md" },
  { n: 4, file: "04-Sales-Management.md" },
  { n: 5, file: "05-Finance-Accounting.md" },
  { n: 6, file: "06-HRM-Solutions.md" },
  { n: 7, file: "07-Document-Management.md" },
  { n: 8, file: "08-Unified-Firewall-Management.md" },
];

const startRe = /^# PAGE (\d+) — (.+)$/gm;
const matches = [];
let m;
while ((m = startRe.exec(raw)) !== null) {
  matches.push({ n: Number(m[1]), title: m[2], start: m.index });
}

const endOfPage8 = raw.indexOf("# Internal Linking Map");
if (endOfPage8 === -1) throw new Error("Could not locate end-of-page-8 boundary.");

for (let i = 0; i < matches.length; i++) {
  const cur = matches[i];
  const next = matches[i + 1];
  const end = next ? next.start : endOfPage8;
  let body = raw.slice(cur.start, end).trimEnd() + "\n";

  const out = outputs.find((o) => o.n === cur.n);
  if (!out) continue;
  fs.writeFileSync(path.join(outDir, out.file), body, "utf8");
  console.log(`wrote ${out.file}  (${body.length} bytes)`);
}
