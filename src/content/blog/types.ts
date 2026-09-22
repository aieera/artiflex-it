/**
 * Blog type definitions.
 *
 * Split from the old monolithic posts.ts so that post files can import
 * types without pulling in the registry (and therefore every other post).
 */

export type BlogTag =
  | "cybersecurity"
  | "cloud"
  | "compliance"
  | "infrastructure"
  | "managed-services";

export type BlogAuthor = {
  name: string;
  role: string;
  bio?: string;
  avatar?: string;
};

export type ContentBlock =
  | { type: "h2"; id?: string; text: string }
  | { type: "h3"; id?: string; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | {
      type: "callout";
      title?: string;
      text: string;
      variant?: "info" | "warning" | "success" | "tip";
    }
  | { type: "quote"; text: string; cite?: string }
  | {
      type: "cta";
      title: string;
      description: string;
      href: string;
      label: string;
    }
  | {
      type: "stats";
      items: { value: string; label: string; sublabel?: string }[];
    };

/**
 * What a post's `meta.ts` exports. Everything the listing pages need,
 * and nothing else, so /blog never downloads article bodies.
 *
 * `tagLabel` / `tagColor` are intentionally absent: they are derived
 * from `tag` by the registry, so a post file cannot drift out of sync
 * with the tag palette.
 */
export type BlogPostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  date: string; // ISO YYYY-MM-DD (publication)
  updated?: string; // ISO YYYY-MM-DD (last modified)
  readTime: number; // minutes
  tag: BlogTag;
  image: string;
  imageAlt?: string; // descriptive alt for the hero; falls back to title
  ogImage?: string;
  author: BlogAuthor;
  related?: string[];
};

/**
 * A registry entry: the post's own meta plus the derived tag styling.
 * This is the shape the pages consume (identical to the old BlogPost
 * minus `content`, which now loads on demand via loadPostContent).
 */
export type BlogPost = BlogPostMeta & {
  tagLabel: string;
  tagColor: string;
};
