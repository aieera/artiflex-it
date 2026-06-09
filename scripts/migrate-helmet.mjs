/**
 * migrate-helmet.mjs
 * ---------------------------------------------------------------
 * One-shot codemod: replace react-helmet-async with React 19's
 * native metadata hoisting.
 *
 * What it does, per file:
 *   1. Removes `import { Helmet } from "react-helmet-async";`
 *   2. Replaces `<Helmet>` with `<>` (fragment open)
 *   3. Replaces `</Helmet>` with `</>` (fragment close)
 *
 * Why: react-helmet-async@3 + React 19 is broken — Helmet does
 * not reliably update document.title or the <title> element in
 * React 19's reconciler. React 19 natively supports <title>,
 * <meta>, <link> as first-class JSX that gets hoisted to <head>,
 * which works perfectly with Playwright prerender.
 *
 * NOT touched by this script (manual):
 *   - src/main.tsx — the <HelmetProvider> wrapper (we'll edit that)
 *
 * Idempotent: safe to run multiple times.
 * ---------------------------------------------------------------
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src");

/** Walk all .tsx/.ts files under src/ */
function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else if (entry.isFile() && /\.(tsx|ts)$/.test(entry.name)) yield p;
  }
}

const IMPORT_RE =
  /^\s*import\s*\{\s*Helmet\s*\}\s*from\s*["']react-helmet-async["'];?\s*\r?\n/m;

let touched = 0;
let skipped = 0;

for (const file of walk(SRC)) {
  // Skip main.tsx — has HelmetProvider, handled separately
  if (file.endsWith(path.sep + "main.tsx")) {
    skipped++;
    continue;
  }

  let src = fs.readFileSync(file, "utf8");
  const before = src;

  // 1. Drop the Helmet import
  src = src.replace(IMPORT_RE, "");

  // 2. Swap the JSX tags
  src = src.replace(/<Helmet>/g, "<>");
  src = src.replace(/<\/Helmet>/g, "</>");

  if (src !== before) {
    fs.writeFileSync(file, src, "utf8");
    touched++;
    console.log(`  ✓ ${path.relative(ROOT, file)}`);
  }
}

console.log(`\nDone. ${touched} files updated, ${skipped} skipped.`);
