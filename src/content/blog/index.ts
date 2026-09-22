/**
 * Blog registry, single source of truth for /blog and /blog/<slug>.
 *
 * Layout
 * ------
 *   posts/<slug>/meta.ts      metadata only, ALWAYS bundled (small)
 *   posts/<slug>/content.ts   the article body, loaded ON DEMAND
 *
 * Both are picked up automatically by the globs below, so there is no
 * list to maintain here: dropping in a folder registers the post.
 *
 * The split exists for bundle size. Metadata for every post is a few KB
 * total and the listing pages need all of it; article bodies are ~12 KB
 * each and only ever needed one at a time. Keeping them in one module
 * (the old posts.ts) meant /blog downloaded every article to render
 * cards, and each post page downloaded the other 49.
 *
 * Adding a new post:
 *   1. Create src/content/blog/posts/<slug>/meta.ts    (export const meta)
 *   2. Create src/content/blog/posts/<slug>/content.ts (export const content)
 *   3. Add a <url> entry in public/sitemap.xml for /blog/<slug>.
 *   4. Run `npm run build:seo`, the OG image and prerender pick it up.
 */

import { TAG_STYLES } from "./tags";
import type { BlogPost, BlogPostMeta, BlogTag, ContentBlock } from "./types";

export type { BlogAuthor, BlogPost, BlogPostMeta, BlogTag, ContentBlock } from "./types";
export { TAG_STYLES, tagOf } from "./tags";

/* ───────── Module maps ───────── */

/* Eager: metadata is needed by the listing pages for every post, and is  */
/* small enough to live in the main blog chunk.                           */
const metaModules = import.meta.glob<{ meta: BlogPostMeta }>(
  "./posts/*/meta.ts",
  { eager: true }
);

/* Lazy: each article body becomes its own chunk, fetched only when that  */
/* post is actually opened.                                               */
const contentModules = import.meta.glob<{ content: ContentBlock[] }>(
  "./posts/*/content.ts"
);

/* ───────── Registry ───────── */

/** `./posts/<slug>/meta.ts` → `<slug>` */
const slugFromPath = (p: string) => p.split("/")[2];

const withTagStyles = (m: BlogPostMeta): BlogPost => ({
  ...m,
  tagLabel: TAG_STYLES[m.tag].label,
  tagColor: TAG_STYLES[m.tag].color,
});

export const posts: BlogPost[] = Object.values(metaModules)
  .map((m) => withTagStyles(m.meta))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

const bySlug = new Map(posts.map((p) => [p.slug, p]));

/* Content loaders keyed by slug, so we never scan paths at call time. */
const contentLoaders = new Map(
  Object.entries(contentModules).map(([path, load]) => [slugFromPath(path), load])
);

/* ───────── Content loading ───────── */

/**
 * Fetch one post's article body. Resolves to null for an unknown slug,
 * or for a post whose meta.ts exists without a matching content.ts.
 */
export async function loadPostContent(
  slug: string
): Promise<ContentBlock[] | null> {
  const load = contentLoaders.get(slug);
  if (!load) return null;
  const mod = await load();
  return mod.content;
}

/**
 * Warm a post's content chunk without rendering it, for hover-prefetch
 * on the listing cards. Failures are deliberately swallowed: this is an
 * optimisation, the real navigation will surface any error.
 */
export function prefetchPostContent(slug: string): void {
  const load = contentLoaders.get(slug);
  if (load) void load().catch(() => {});
}

/* ───────── Helpers (metadata only, all synchronous) ───────── */

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  bySlug.get(slug);

export const getRelatedPosts = (slug: string, limit = 3): BlogPost[] => {
  const current = bySlug.get(slug);
  if (!current) return [];

  // 1. Use explicit `related` slugs first.
  const explicit = (current.related || [])
    .map((s) => bySlug.get(s))
    .filter((p): p is BlogPost => !!p && p.slug !== slug);
  if (explicit.length >= limit) return explicit.slice(0, limit);

  // 2. Fall back to same-tag posts.
  const sameTag = posts.filter(
    (p) => p.tag === current.tag && p.slug !== slug && !explicit.includes(p)
  );
  return [...explicit, ...sameTag].slice(0, limit);
};

/**
 * Tags that have at least one post, in TAG_STYLES declaration order.
 * Fixed order rather than first-seen order, so the chip row on /blog
 * does not reshuffle when a post is added or its date changes.
 */
export const allTags = (): { tag: BlogTag; label: string; count: number }[] => {
  const counts = new Map<BlogTag, number>();
  for (const p of posts) counts.set(p.tag, (counts.get(p.tag) || 0) + 1);
  return (Object.keys(TAG_STYLES) as BlogTag[])
    .filter((tag) => counts.has(tag))
    .map((tag) => ({
      tag,
      label: TAG_STYLES[tag].label,
      count: counts.get(tag)!,
    }));
};

export const sortedPosts = (): BlogPost[] => posts;
