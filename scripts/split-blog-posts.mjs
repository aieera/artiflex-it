/**
 * split-blog-posts.mjs
 * ─────────────────────────────────────────────────────────────
 * One-shot migration: explodes the monolithic
 * src/content/blog/posts.ts into per-post modules.
 *
 *   src/content/blog/posts/<slug>/meta.ts      metadata only
 *   src/content/blog/posts/<slug>/content.ts   the article body
 *
 * Why a script instead of hand-editing: posts.ts is ~9,100 lines of
 * prose. Copying it by hand risks silently dropping or mangling an
 * article. This evaluates the real module, so what gets written is
 * exactly what the app was rendering.
 *
 * Approach:
 *   1. Import posts.ts directly. Node 24 strips the type annotations
 *      natively, and the module is self-contained (no path aliases,
 *      no runtime imports), so no bundler is involved.
 *   2. Read the live `posts` array.
 *   3. Emit one folder per post, serialising values as JS literals.
 *      Authors are matched by identity and emitted as imports;
 *      tagLabel / tagColor are dropped (the registry derives them).
 *
 * Run once:
 *   node scripts/split-blog-posts.mjs
 * ─────────────────────────────────────────────────────────────
 */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src", "content", "blog", "posts.ts");
const OUT_ROOT = path.join(ROOT, "src", "content", "blog", "posts");

const log = (m) => console.log(`[split] ${m}`);

/* ───────── 1. Evaluate posts.ts ───────── */

const { posts } = await import(pathToFileURL(SRC).href);
log(`loaded ${posts.length} posts from posts.ts`);

/* ───────── 2. Author identity → exported binding name ───────── */

const AUTHOR_BY_NAME = {
  "Artiflex IT Engineering": "eng",
  "Artiflex IT Security Practice": "ciso",
  "Artiflex IT Cloud Practice": "cloudArch",
};

/* ───────── 3. Serialisation ───────── */

/* JSON.stringify gives correct escaping for every string in the corpus  */
/* (quotes, apostrophes, unicode dashes). Prose stays on one line, which */
/* matches how posts.ts was authored.                                    */
const str = (s) => JSON.stringify(s);

function literal(value, indent = 2) {
  const pad = " ".repeat(indent);
  const padIn = " ".repeat(indent + 2);

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value.map((v) => padIn + literal(v, indent + 2));
    return `[\n${items.join(",\n")},\n${pad}]`;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value).filter(([, v]) => v !== undefined);
    if (entries.length === 0) return "{}";
    const body = entries.map(
      ([k, v]) => `${padIn}${safeKey(k)}: ${literal(v, indent + 2)}`
    );
    return `{\n${body.join(",\n")},\n${pad}}`;
  }
  if (typeof value === "string") return str(value);
  return String(value);
}

const safeKey = (k) => (/^[A-Za-z_$][\w$]*$/.test(k) ? k : str(k));

/* ───────── 4. Emit ───────── */

const META_KEYS = [
  "slug",
  "title",
  "excerpt",
  "metaTitle",
  "metaDescription",
  "date",
  "updated",
  "readTime",
  "tag",
  "image",
  "ogImage",
  "related",
];

let written = 0;

for (const post of posts) {
  const dir = path.join(OUT_ROOT, post.slug);
  fs.mkdirSync(dir, { recursive: true });

  const authorBinding = AUTHOR_BY_NAME[post.author?.name];
  if (!authorBinding) {
    throw new Error(
      `unknown author "${post.author?.name}" on post ${post.slug}, ` +
        `add it to AUTHOR_BY_NAME and src/content/blog/authors.ts`
    );
  }

  /* meta.ts */
  const metaBody = META_KEYS.filter((k) => post[k] !== undefined)
    .map((k) => `  ${k}: ${literal(post[k], 2)},`)
    .join("\n");

  const metaFile = `import type { BlogPostMeta } from "../../types";
import { ${authorBinding} } from "../../authors";

export const meta: BlogPostMeta = {
${metaBody}
  author: ${authorBinding},
};
`;
  fs.writeFileSync(path.join(dir, "meta.ts"), metaFile, "utf8");

  /* content.ts */
  const blocks = post.content
    .map((b) => `  ${literal(b, 2)},`)
    .join("\n");

  const contentFile = `import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
${blocks}
];
`;
  fs.writeFileSync(path.join(dir, "content.ts"), contentFile, "utf8");

  written++;
}

log(`wrote ${written} post folders to src/content/blog/posts/`);

/* ───────── 5. Integrity check ───────── */

let blocks = 0;
let chars = 0;
for (const p of posts) {
  blocks += p.content.length;
  chars += JSON.stringify(p.content).length;
}
log(`corpus: ${blocks} content blocks, ${chars.toLocaleString()} chars`);
log("done. Verify with: npm run build");
