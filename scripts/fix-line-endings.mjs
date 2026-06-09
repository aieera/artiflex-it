/**
 * fix-line-endings.mjs
 * ---------------------------------------------------------------
 * Repairs files where migrate-helmet.mjs' regex consumed the `\n`
 * half of a CRLF line terminator, leaving orphan `\r`s that merge
 * adjacent lines. Converts any `\r` not already followed by `\n`
 * into `\r\n`.
 *
 * Safe on already-correct CRLF files (no-op) and on pure LF files
 * (no CRs to touch).
 * ---------------------------------------------------------------
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src");

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else if (entry.isFile() && /\.(tsx|ts)$/.test(entry.name)) yield p;
  }
}

let touched = 0;
for (const file of walk(SRC)) {
  const src = fs.readFileSync(file, "utf8");
  // Orphan \r: a \r not followed by \n. Replace with \r\n.
  const fixed = src.replace(/\r(?!\n)/g, "\r\n");
  if (fixed !== src) {
    fs.writeFileSync(file, fixed, "utf8");
    touched++;
    console.log(`  ✓ ${path.relative(ROOT, file)}`);
  }
}
console.log(`\nDone. ${touched} files fixed.`);
