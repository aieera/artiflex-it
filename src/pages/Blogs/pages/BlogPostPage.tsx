/**
 * BlogPostPage, single-post template.
 *
 * Reads the slug from the URL, looks up the post in the typed catalogue
 * (src/content/blog/posts.ts), and renders the article with full SEO
 * metadata (BlogPosting + BreadcrumbList JSON-LD, Article OG tags,
 * canonical, hreflang). Walks the structured ContentBlock array and
 * emits semantic HTML, h2/h3, paragraphs, lists, callouts, CTAs.
 *
 * If the slug doesn't match any post, redirects to /blog.
 */

import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { CTASection } from "@/pages/Home/sections/CTASection";
import {
  ArrowRightIcon,
  CheckIcon,
  AlertIcon,
} from "@/components/icons";
import {
  getPostBySlug,
  getRelatedPosts,
  type BlogPost,
  type ContentBlock,
} from "@/content/blog/posts";

const SITE = "https://artiflexit.com";

/* ──────────────────────────────────────────────────────────────── */
/* Inline link parser, converts [text](url) inside string content  */
/* into proper React anchors. Internal links (starting with /) get  */
/* a brand-blue style + react-router <Link>; external get an <a>    */
/* with rel="noopener noreferrer".                                   */
/* ──────────────────────────────────────────────────────────────── */

function renderInline(text: string, keyPrefix: string) {
  // Match [text](url)
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: (string | { text: string; href: string })[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push({ text: m[1], href: m[2] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));

  return parts.map((p, i) => {
    if (typeof p === "string") return <span key={`${keyPrefix}-${i}`}>{p}</span>;
    const isInternal = p.href.startsWith("/");
    if (isInternal) {
      return (
        <Link
          key={`${keyPrefix}-${i}`}
          to={p.href}
          className="font-medium text-brand-blue underline underline-offset-2 hover:text-brand-blue-bright transition-colors"
        >
          {p.text}
        </Link>
      );
    }
    return (
      <a
        key={`${keyPrefix}-${i}`}
        href={p.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-brand-blue underline underline-offset-2 hover:text-brand-blue-bright transition-colors"
      >
        {p.text}
      </a>
    );
  });
}

/* ──────────────────────────────────────────────────────────────── */
/* Slug helper for auto-generated heading IDs                        */
/* ──────────────────────────────────────────────────────────────── */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/* ──────────────────────────────────────────────────────────────── */
/* Block renderer                                                    */
/* ──────────────────────────────────────────────────────────────── */

function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        const k = `b-${i}`;
        switch (block.type) {
          case "h2": {
            const id = block.id || slugify(block.text);
            return (
              <h2
                id={id}
                key={k}
                className="font-display scroll-mt-28 text-2xl font-bold text-heading mt-12 mb-4 sm:text-3xl"
              >
                {block.text}
              </h2>
            );
          }
          case "h3": {
            const id = block.id || slugify(block.text);
            return (
              <h3
                id={id}
                key={k}
                className="font-display scroll-mt-28 text-xl font-semibold text-heading mt-8 mb-3 sm:text-2xl"
              >
                {block.text}
              </h3>
            );
          }
          case "p":
            return (
              <p key={k} className="text-base text-body leading-relaxed mb-5 sm:text-lg">
                {renderInline(block.text, k)}
              </p>
            );
          case "ul":
            return (
              <ul key={k} className="space-y-2.5 mb-6 ml-1">
                {block.items.map((item, j) => (
                  <li key={`${k}-${j}`} className="flex gap-3 text-base text-body leading-relaxed sm:text-lg">
                    <CheckIcon className="w-4 h-4 text-brand-blue shrink-0 mt-1.5" />
                    <span>{renderInline(item, `${k}-${j}`)}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={k} className="space-y-3 mb-6 ml-1 list-none">
                {block.items.map((item, j) => (
                  <li key={`${k}-${j}`} className="flex gap-3 text-base text-body leading-relaxed sm:text-lg">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-xs font-bold text-brand-blue mt-0.5">
                      {j + 1}
                    </span>
                    <span>{renderInline(item, `${k}-${j}`)}</span>
                  </li>
                ))}
              </ol>
            );
          case "callout": {
            const variantClass = {
              info: "border-brand-blue/30 bg-brand-blue/5",
              warning: "border-amber-500/30 bg-amber-500/5",
              success: "border-emerald-500/30 bg-emerald-500/5",
              tip: "border-brand-purple/30 bg-brand-purple/5",
            }[block.variant || "info"];
            const iconClass = {
              info: "text-brand-blue",
              warning: "text-amber-400",
              success: "text-emerald-400",
              tip: "text-brand-purple",
            }[block.variant || "info"];
            return (
              <aside
                key={k}
                className={`my-8 rounded-2xl border p-5 sm:p-6 ${variantClass}`}
              >
                {block.title && (
                  <div className="flex items-center gap-2 mb-2">
                    <AlertIcon className={`w-4 h-4 ${iconClass}`} />
                    <h4 className="font-display text-sm font-bold text-heading uppercase tracking-widest">
                      {block.title}
                    </h4>
                  </div>
                )}
                <p className="text-base text-body leading-relaxed">
                  {renderInline(block.text, k)}
                </p>
              </aside>
            );
          }
          case "quote":
            return (
              <blockquote
                key={k}
                className="my-8 border-l-4 border-brand-blue pl-5 italic text-lg text-heading leading-relaxed sm:text-xl"
              >
                {renderInline(block.text, k)}
                {block.cite && (
                  <footer className="mt-2 text-sm not-italic text-muted">
                   , {block.cite}
                  </footer>
                )}
              </blockquote>
            );
          case "stats":
            return (
              <div
                key={k}
                className="my-8 grid grid-cols-2 gap-4 rounded-2xl border border-border-light bg-surface-secondary p-5 sm:grid-cols-4 sm:p-6"
              >
                {block.items.map((s, j) => (
                  <div key={`${k}-${j}`} className="text-center">
                    <div className="font-display text-2xl font-bold text-brand-blue sm:text-3xl">
                      {s.value}
                    </div>
                    <div className="text-xs font-semibold text-heading mt-1 sm:text-sm">
                      {s.label}
                    </div>
                    {s.sublabel && (
                      <div className="text-[11px] text-muted mt-0.5">{s.sublabel}</div>
                    )}
                  </div>
                ))}
              </div>
            );
          case "cta":
            return (
              <div
                key={k}
                className="my-10 rounded-2xl border border-brand-blue/30 bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 p-6 sm:p-8"
              >
                <h3 className="font-display text-xl font-bold text-heading mb-2 sm:text-2xl">
                  {block.title}
                </h3>
                <p className="text-base text-body mb-5 leading-relaxed">
                  {block.description}
                </p>
                <Link
                  to={block.href}
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-blue-bright transition-colors"
                >
                  {block.label}
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            );
          default:
            return null;
        }
      })}
    </>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/* Word count for schema                                              */
/* ──────────────────────────────────────────────────────────────── */

function wordCountOf(post: BlogPost): number {
  let count = post.title.split(/\s+/).length + post.excerpt.split(/\s+/).length;
  for (const b of post.content) {
    if ("text" in b && typeof b.text === "string") {
      count += b.text.split(/\s+/).filter(Boolean).length;
    }
    if ("items" in b && Array.isArray(b.items)) {
      for (const it of b.items) {
        if (typeof it === "string") count += it.split(/\s+/).filter(Boolean).length;
      }
    }
  }
  return count;
}

/* ──────────────────────────────────────────────────────────────── */
/* Date formatter                                                     */
/* ──────────────────────────────────────────────────────────────── */

function fmtDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-AE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ──────────────────────────────────────────────────────────────── */
/* Table of contents, auto-built from H2 blocks                     */
/* Scroll-spy: highlights the heading currently in viewport via      */
/* IntersectionObserver. Smooth-scrolls on click via the browser's   */
/* native fragment-link behaviour (CSS scroll-margin handles offset).*/
/* ──────────────────────────────────────────────────────────────── */

function TableOfContents({ blocks }: { blocks: ContentBlock[] }) {
  const headings = useMemo(
    () =>
      blocks
        .filter(
          (b): b is Extract<ContentBlock, { type: "h2"; id?: string; text: string }> =>
            b.type === "h2"
        )
        .map((b) => ({
          id: b.id || slugify(b.text),
          text: b.text,
        })),
    [blocks]
  );

  const [activeId, setActiveId] = useState<string | null>(
    headings[0]?.id ?? null
  );

  useEffect(() => {
    if (typeof window === "undefined" || headings.length === 0) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    // Track which headings are currently in the upper half of the viewport.
    // The first one wins. rootMargin shrinks the activation zone so a
    // heading is "active" only when it crosses ~25% from the top.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target.id);
        if (visible.length > 0) {
          // Pick the first visible heading by document order.
          const ordered = headings
            .map((h) => h.id)
            .filter((id) => visible.includes(id));
          if (ordered[0]) setActiveId(ordered[0]);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
        On this page
      </p>
      <ul className="mt-3 space-y-px border-l border-border-light">
        {headings.map((h) => {
          const isActive = activeId === h.id;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm leading-snug transition-all ${
                  isActive
                    ? "border-brand-blue font-medium text-brand-blue"
                    : "border-transparent text-muted hover:border-brand-blue/40 hover:text-body"
                }`}
                onClick={() => setActiveId(h.id)}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
      <a
        href="#article-body"
        className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-brand-blue"
      >
        ↑ Back to top
      </a>
    </nav>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/* Page                                                               */
/* ──────────────────────────────────────────────────────────────── */

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : null;
  const related = useMemo(() => (slug ? getRelatedPosts(slug) : []), [slug]);
  const [progress, setProgress] = useState(0);

  // Reading-progress bar.
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("article-body");
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = window.scrollY - el.offsetTop;
      const pct = Math.max(0, Math.min(100, (scrolled / total) * 100));
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  if (!post) return <Navigate to="/blog" replace />;

  const url = `${SITE}/blog/${post.slug}`;
  const ogImage = `${SITE}${post.ogImage || post.image}`;
  const wordCount = wordCountOf(post);

  return (
    <>
      <>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <link rel="canonical" href={url} />

        {/* hreflang */}
        <link rel="alternate" hrefLang="en-ae" href={url} />
        <link rel="alternate" hrefLang="en-om" href={url} />
        <link rel="alternate" hrefLang="en-sa" href={url} />
        <link rel="alternate" hrefLang="x-default" href={url} />

        {/* Open Graph (article) */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.metaTitle} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Artiflex IT" />
        <meta property="og:locale" content="en_AE" />
        <meta property="article:published_time" content={`${post.date}T00:00:00Z`} />
        {post.updated && (
          <meta property="article:modified_time" content={`${post.updated}T00:00:00Z`} />
        )}
        <meta property="article:author" content={post.author.name} />
        <meta property="article:section" content={post.tagLabel} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.metaTitle} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content={ogImage} />

        {/* JSON-LD: BlogPosting */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.metaDescription,
          image: ogImage,
          datePublished: `${post.date}T00:00:00Z`,
          dateModified: `${post.updated || post.date}T00:00:00Z`,
          wordCount,
          articleSection: post.tagLabel,
          inLanguage: "en-AE",
          author: {
            "@type": "Organization",
            name: post.author.name,
            url: SITE,
          },
          publisher: {
            "@type": "Organization",
            name: "Artiflex IT",
            url: SITE,
            logo: {
              "@type": "ImageObject",
              url: `${SITE}/favicon.png`,
            },
          },
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          url,
        })}</script>

        {/* JSON-LD: Breadcrumbs */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
            { "@type": "ListItem", position: 3, name: post.title, item: url },
          ],
        })}</script>
      </>

      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-brand-blue to-brand-cyan transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* HERO */}
      <section className="relative bg-navy-deep pt-24 pb-12 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.18),transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-5 sm:px-6">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-slate-400">
            <ol className="flex items-center gap-2">
              <li>
                <Link to="/" className="hover:text-white">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/blog" className="hover:text-white">Blog</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="truncate text-slate-300" aria-current="page">
                {post.tagLabel}
              </li>
            </ol>
          </nav>

          {/* Tag chip */}
          <span
            className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest ${post.tagColor}`}
          >
            {post.tagLabel}
          </span>

          {/* Title */}
          <h1 className="mt-5 font-display text-3xl font-bold text-white leading-tight sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="mt-5 text-lg text-slate-300 leading-relaxed sm:text-xl">
            {post.excerpt}
          </p>

          {/* Meta row */}
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-400 border-t border-white/10 pt-6">
            <div className="flex items-center gap-2">
              <span className="font-medium text-white">{post.author.name}</span>
              <span className="text-slate-500">·</span>
              <span>{post.author.role}</span>
            </div>
            <span className="text-slate-500">·</span>
            <time dateTime={post.date}>{fmtDate(post.date)}</time>
            <span className="text-slate-500">·</span>
            <span>{post.readTime} min read</span>
            {post.updated && post.updated !== post.date && (
              <>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400">Updated {fmtDate(post.updated)}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      {post.image && (
        <div className="shell relative -mt-8">
          <div className="overflow-hidden rounded-2xl border border-border-light shadow-xl">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover aspect-[16/9]"
              loading="eager"
            />
          </div>
        </div>
      )}

      {/* ARTICLE BODY */}
      <article id="article-body" className="bg-white py-14 sm:py-20">
        <div className="shell w-full">
          <div className="lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12 xl:gap-16">
            {/* Sticky TOC, desktop only */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
                <TableOfContents blocks={post.content} />
              </div>
            </aside>

            {/* Article column, capped at max-w-3xl for readable line length */}
            <div className="mx-auto w-full max-w-3xl lg:mx-0">
              <ContentRenderer blocks={post.content} />

          {/* AUTHOR BIO, E-E-A-T signal for cybersecurity / IT content. */}
          <aside className="mt-12 overflow-hidden rounded-2xl border border-border-light bg-gradient-to-br from-surface-secondary to-white p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
              {/* Avatar, falls back to initials if image fails to load */}
              <div className="relative shrink-0">
                <div
                  aria-hidden="true"
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-blue/70 font-display text-xl font-bold text-white sm:h-20 sm:w-20 sm:text-2xl"
                >
                  {post.author.name
                    .split(/\s+/)
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")
                    .toUpperCase()}
                </div>
                {post.author.avatar && (
                  <img
                    src={post.author.avatar}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-16 w-16 rounded-2xl object-cover sm:h-20 sm:w-20"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}
              </div>

              {/* Bio content */}
              <div className="flex-1">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-blue">
                  Written by
                </p>
                <h3 className="mt-1.5 font-display text-lg font-bold text-heading sm:text-xl">
                  {post.author.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-body/90">
                  {post.author.role}
                </p>
                {post.author.bio && (
                  <p className="mt-3 text-sm leading-relaxed text-body sm:text-base">
                    {post.author.bio}
                  </p>
                )}
                <Link
                  to="/about"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-blue-bright"
                >
                  More about Artiflex IT
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>
          </aside>

          {/* Share row */}
          <div className="mt-12 border-t border-border-light pt-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm font-semibold text-heading">
                Share this article
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-border-light px-3 py-1.5 text-sm font-medium text-body hover:border-brand-blue/40 hover:text-brand-blue transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  LinkedIn
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-border-light px-3 py-1.5 text-sm font-medium text-body hover:border-brand-blue/40 hover:text-brand-blue transition-colors"
                  aria-label="Share on X"
                >
                  X
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${post.title}, ${url}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-border-light px-3 py-1.5 text-sm font-medium text-body hover:border-brand-blue/40 hover:text-brand-blue transition-colors"
                  aria-label="Share on WhatsApp"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
      </article>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="bg-surface-secondary py-14 sm:py-20">
          <div className="shell">
            <h2 className="font-display text-2xl font-bold text-heading mb-8 sm:text-3xl">
              Related reading
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-border-light bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-brand-blue/25"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${p.tagColor}`}
                      >
                        {p.tagLabel}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-base font-semibold text-heading mb-2 leading-snug group-hover:text-brand-blue transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-body line-clamp-2">{p.excerpt}</p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-muted">
                      <time dateTime={p.date}>{fmtDate(p.date)}</time>
                      <span>·</span>
                      <span>{p.readTime} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title="Need help applying any of this?"
        description="Our engineering team works with UAE businesses on the exact problems we write about. Real conversations, no sales theatre."
        primaryButton={{ text: "Talk to an Engineer", action: "modal" }}
      />
    </>
  );
}
