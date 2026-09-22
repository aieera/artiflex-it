/**
 * ts-resolve.mjs
 * ─────────────────────────────────────────────────────────────
 * Lets build scripts `import()` the app's .ts source directly.
 *
 * Node 24 strips TypeScript type annotations natively, but it still
 * requires a file extension on relative specifiers, whereas the app
 * (Vite + tsconfig "bundler" resolution) writes them extensionless:
 *
 *   import { eng } from "../../authors";   // resolves to authors.ts
 *
 * This registers a sync resolve hook that retries an extensionless
 * relative miss as .ts, then .tsx, then /index.ts. That way scripts
 * such as generate-og-images.mjs read the real modules instead of
 * regex-parsing them, so they cannot drift from what the app renders.
 *
 * Usage, before importing any app source:
 *   import "./lib/ts-resolve.mjs";
 * ─────────────────────────────────────────────────────────────
 */

import { registerHooks } from "node:module";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const CANDIDATES = [".ts", ".tsx", "/index.ts", "/index.tsx"];

registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (err) {
      const relative = specifier.startsWith("./") || specifier.startsWith("../");
      if (!relative || !context.parentURL) throw err;

      for (const ext of CANDIDATES) {
        const url = new URL(specifier + ext, context.parentURL);
        try {
          if (fs.existsSync(fileURLToPath(url))) {
            return { url: url.href, shortCircuit: true };
          }
        } catch {
          /* not a file: URL, keep trying */
        }
      }
      throw err;
    }
  },
});
