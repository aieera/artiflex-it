/**
 * BlogPage, index of all posts.
 *
 * Two-column layout: a paginated vertical list of post cards (image left,
 * title/excerpt/meta right) plus a sidebar with search, a Recent/Archives/
 * Tags widget, follow links, categories, and a newsletter signup.
 * Search and the Archives month picker filter the list client-side.
 * Each card links to /blog/<slug>; categories link to /blog/category/<tag>.
 */

import { useMemo, useState, type FC } from "react";
import { scrollToElement } from "@/lib/lenis";
import { Link } from "react-router-dom";
import PageHero from "@/pages/About/section/PageHero";
import { CTASection } from "@/pages/Home/sections/CTASection";
import ClientStrip from "@/components/ui/ClientStrip";
import { ArrowRightIcon, SearchIcon, LinkedInIcon, FolderIcon } from "@/components/icons";
import ShinyText from "@/components/ui/ShinyText";
import { allTags, sortedPosts } from "@/content/blog/posts";
import { SOCIAL_LINKS } from "@/lib/constants";

const SOCIAL_ICONS: Record<string, FC<{ className?: string }>> = {
  LinkedInIcon,
};

const SITE = "https://artiflexit.com";

function fmtDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-AE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogPage() {
  const all = useMemo(() => sortedPosts(), []);
  const tags = useMemo(() => allTags(), []);

  /* ── List state: search, archive-month filter, sidebar tab, pagination ── */
  const PER_PAGE = 6;
  const [query, setQuery] = useState("");
  const [month, setMonth] = useState<string | null>(null);
  const [tab, setTab] = useState<"recent" | "archives" | "tags">("recent");
  const [page, setPage] = useState(1);

  const featured = all[0];
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((p) => {
      if (month && p.date.slice(0, 7) !== month) return false;
      if (q && !p.title.toLowerCase().includes(q) && !p.excerpt.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [all, query, month]);

  /* When not searching/filtering, the newest post is shown as a featured
     card, so the list below starts from the second post. While filtering,
     every match (including the featured one) appears in the list. */
  const isFiltering = query.trim() !== "" || month !== null;
  const listSource = isFiltering ? filtered : all.slice(1);

  const totalPages = Math.max(1, Math.ceil(listSource.length / PER_PAGE));
  const pageSafe = Math.min(page, totalPages);
  const pageItems = listSource.slice((pageSafe - 1) * PER_PAGE, pageSafe * PER_PAGE);

  /* Windowed page list: 1 … (cur-1) cur (cur+1) … last */
  const pageList = useMemo<(number | "…")[]>(() => {
    const out: (number | "…")[] = [];
    for (let n = 1; n <= totalPages; n++) {
      if (n === 1 || n === totalPages || (n >= pageSafe - 1 && n <= pageSafe + 1)) {
        out.push(n);
      } else if (out[out.length - 1] !== "…") {
        out.push("…");
      }
    }
    return out;
  }, [totalPages, pageSafe]);

  const recent = useMemo(() => all.slice(0, 5), [all]);
  const archives = useMemo(() => {
    const m = new Map<string, number>();
    for (const p of all) {
      const k = p.date.slice(0, 7);
      m.set(k, (m.get(k) || 0) + 1);
    }
    return Array.from(m.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [all]);

  function fmtMonth(key: string) {
    const [y, mo] = key.split("-");
    return new Date(Number(y), Number(mo) - 1, 1).toLocaleDateString("en-AE", {
      month: "long",
      year: "numeric",
    });
  }
  function scrollToList() {
    const el = document.getElementById("all-articles");
    if (el) scrollToElement(el);
  }
  function changePage(n: number) {
    setPage(Math.min(Math.max(n, 1), totalPages));
    scrollToList();
  }

  return (
    <>
      <>
        <title>Blog, Cybersecurity & IT Insights for UAE Business | Artiflex IT</title>
        <meta
          name="description"
          content="Field-tested cybersecurity, cloud, and IT insights from Artiflex IT engineers. Practical guidance for UAE businesses, NESA, PDPL, ransomware, cloud migration, AMC."
        />
        <link rel="canonical" href={`${SITE}/blog`} />

        {/* hreflang */}
        <link rel="alternate" hrefLang="en-ae" href={`${SITE}/blog`} />
        <link rel="alternate" hrefLang="en-om" href={`${SITE}/blog`} />
        <link rel="alternate" hrefLang="en-sa" href={`${SITE}/blog`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE}/blog`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Artiflex IT Blog, Cybersecurity & IT Insights" />
        <meta
          property="og:description"
          content="Field-tested cybersecurity, cloud, and IT insights from Artiflex IT engineers for UAE businesses."
        />
        <meta property="og:url" content={`${SITE}/blog`} />
        <meta property="og:image" content={`${SITE}/og/blog.png`} />
        <meta property="og:site_name" content="Artiflex IT" />
        <meta property="og:locale" content="en_AE" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Artiflex IT Blog" />
        <meta
          name="twitter:description"
          content="Cybersecurity, cloud, and IT insights for UAE businesses."
        />
        <meta name="twitter:image" content={`${SITE}/og/blog.png`} />

        {/* JSON-LD: Blog */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Artiflex IT Blog",
          url: `${SITE}/blog`,
          description: "Cybersecurity, cloud, and IT infrastructure insights for UAE businesses.",
          publisher: { "@type": "Organization", name: "Artiflex IT", url: SITE },
          inLanguage: "en-AE",
        })}</script>

        {/* JSON-LD: ItemList of posts */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: all.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE}/blog/${p.slug}`,
            name: p.title,
          })),
        })}</script>

        {/* JSON-LD: Breadcrumbs */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
          ],
        })}</script>
      </>

      <PageHero
        title={
          <>
            Insights &{" "}
            <ShinyText
              text="Expert Analysis"
              speed={3}
              color="#28B5E1"
              shineColor="#ffffff"
              spread={120}
              className="inline-block font-display"
            />
          </>
        }
        description="Field-tested cybersecurity, cloud, and IT infrastructure insights from our engineering team, written for UAE businesses making real decisions."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
        background="gradient-blinds"
      />

      {/* ───────── FEATURED POST (hidden while searching/filtering) ───────── */}
      {featured && !isFiltering && (
        <section className="relative bg-white py-14 sm:py-20">
          <div className="shell">
            <p className="mb-6 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-blue">
              Featured · Latest Analysis
            </p>
            <Link
              to={`/blog/${featured.slug}`}
              className="group block overflow-hidden rounded-2xl border border-border-light bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-blue/25 hover:shadow-xl"
            >
              <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
                <div className="relative h-64 overflow-hidden lg:h-auto lg:min-h-[360px]">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    loading="eager"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute left-4 top-4">
                    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest ${featured.tagColor}`}>
                      {featured.tagLabel}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <div className="mb-3 flex items-center gap-3 text-xs text-muted">
                    <time dateTime={featured.date}>{fmtDate(featured.date)}</time>
                    <span className="h-1 w-1 rounded-full bg-slate-400" />
                    <span>{featured.readTime} min read</span>
                  </div>
                  <h2 className="mb-4 font-display text-2xl font-bold leading-tight text-heading transition-colors group-hover:text-brand-blue sm:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mb-6 text-base leading-relaxed text-body sm:text-lg">
                    {featured.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 font-semibold text-brand-blue transition-all group-hover:gap-3">
                    Read full article <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ───────── BLOG INDEX: article list + sidebar ───────── */}
      <section
        id="all-articles"
        className={`relative scroll-mt-24 py-14 sm:py-20 ${
          featured && !isFiltering ? "bg-surface-secondary" : "bg-white"
        }`}
      >
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12 xl:gap-16">

            {/* ── MAIN: article list ── */}
            <div className="min-w-0">
              {(query || month) && (
                <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-body">
                  <span>
                    {filtered.length} {filtered.length === 1 ? "article" : "articles"}
                    {month && (
                      <>
                        {" "}in <span className="font-semibold text-heading">{fmtMonth(month)}</span>
                      </>
                    )}
                    {query && (
                      <>
                        {" "}matching <span className="font-semibold text-heading">&ldquo;{query}&rdquo;</span>
                      </>
                    )}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setMonth(null);
                      setPage(1);
                    }}
                    className="font-semibold text-brand-blue hover:underline"
                  >
                    Clear
                  </button>
                </div>
              )}

              {pageItems.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-border-light bg-white px-6 py-16 text-center text-body">
                  No articles found. Try a different search or category.
                </p>
              ) : (
                <div className="flex flex-col gap-8">
                  {pageItems.map((post) => (
                    <article
                      key={post.slug}
                      className="group flex flex-col gap-5 border-b border-border-light pb-8 sm:flex-row"
                    >
                      <Link
                        to={`/blog/${post.slug}`}
                        aria-label={post.title}
                        className="relative block h-48 w-full shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-48"
                      >
                        <img
                          src={post.image}
                          alt={post.title}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <h2 className="font-display text-xl font-bold leading-snug text-heading transition-colors group-hover:text-brand-blue sm:text-2xl">
                          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                        </h2>
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-body sm:text-[15px]">
                          {post.excerpt}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted">
                          <time dateTime={post.date}>{fmtDate(post.date)}</time>
                          <span className="h-1 w-1 rounded-full bg-slate-400" />
                          <span>{post.readTime} min read</span>
                          <span className="h-1 w-1 rounded-full bg-slate-400" />
                          <Link
                            to={`/blog/category/${post.tag}`}
                            className="font-medium text-brand-blue hover:underline"
                          >
                            {post.tagLabel}
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <nav
                  aria-label="Blog pagination"
                  className="mt-10 flex items-center justify-center gap-2"
                >
                  {pageList.map((n, i) =>
                    n === "…" ? (
                      <span
                        key={`gap-${i}`}
                        className="inline-flex h-10 w-6 items-center justify-center text-sm text-muted"
                        aria-hidden="true"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={n}
                        type="button"
                        onClick={() => changePage(n)}
                        aria-current={n === pageSafe ? "page" : undefined}
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-semibold transition-colors ${
                          n === pageSafe
                            ? "border-brand-blue bg-brand-blue text-white"
                            : "border-border-light bg-white text-body hover:border-brand-blue/40 hover:text-brand-blue"
                        }`}
                      >
                        {n}
                      </button>
                    ),
                  )}
                  <button
                    type="button"
                    onClick={() => changePage(pageSafe + 1)}
                    disabled={pageSafe === totalPages}
                    aria-label="Next page"
                    className="inline-flex h-10 items-center justify-center gap-1 rounded-lg border border-border-light bg-white px-4 text-sm font-semibold text-body transition-colors hover:border-brand-blue/40 hover:text-brand-blue disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next <ArrowRightIcon className="h-3.5 w-3.5" />
                  </button>
                </nav>
              )}
            </div>

            {/* ── SIDEBAR ── */}
            <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
              {/* Search */}
              <div className="relative">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search articles"
                  aria-label="Search articles"
                  className="w-full rounded-lg border border-border-light bg-white py-3 pl-4 pr-11 text-sm text-heading placeholder:text-muted focus:border-brand-blue/50 focus:outline-none focus:ring-1 focus:ring-brand-blue/40"
                />
                <SearchIcon className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              </div>

              {/* Recent / Archives / Tags */}
              <div className="rounded-2xl border border-border-light bg-white p-5">
                <div className="flex gap-1 border-b border-border-light">
                  {(["recent", "archives", "tags"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTab(t)}
                      className={`-mb-px border-b-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                        tab === t
                          ? "border-brand-blue text-brand-blue"
                          : "border-transparent text-muted hover:text-heading"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {tab === "recent" && (
                  <ul className="mt-4 space-y-4">
                    {recent.map((p) => (
                      <li key={p.slug}>
                        <Link to={`/blog/${p.slug}`} className="group flex gap-3">
                          <img
                            src={p.image}
                            alt=""
                            loading="lazy"
                            className="h-12 w-12 shrink-0 rounded-md object-cover"
                          />
                          <span className="min-w-0">
                            <span className="block text-[11px] text-muted">{fmtDate(p.date)}</span>
                            <span className="line-clamp-2 text-[13px] font-medium leading-snug text-heading transition-colors group-hover:text-brand-blue">
                              {p.title}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {tab === "archives" && (
                  <ul className="mt-4 space-y-1">
                    {archives.map(([key, count]) => (
                      <li key={key}>
                        <button
                          type="button"
                          onClick={() => {
                            setMonth(month === key ? null : key);
                            setPage(1);
                            scrollToList();
                          }}
                          className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors ${
                            month === key
                              ? "bg-brand-blue/10 text-brand-blue"
                              : "text-body hover:bg-surface-secondary hover:text-heading"
                          }`}
                        >
                          <span>{fmtMonth(key)}</span>
                          <span className="text-xs text-muted">({count})</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {tab === "tags" && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <Link
                        key={t.tag}
                        to={`/blog/category/${t.tag}`}
                        className="rounded-full border border-border-light bg-surface-secondary px-3 py-1 text-xs font-medium text-body transition-colors hover:border-brand-blue/40 hover:bg-brand-blue/5 hover:text-brand-blue"
                      >
                        {t.label} ({t.count})
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Follow Us */}
              {SOCIAL_LINKS.length > 0 && (
                <div className="rounded-2xl border border-border-light bg-white p-5">
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-heading">
                    Follow Us
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {SOCIAL_LINKS.map((s) => {
                      const Icon = SOCIAL_ICONS[s.icon];
                      return (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-[#0A66C2] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        >
                          {Icon && <Icon className="h-4 w-4" />}
                          {s.label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Categories */}
              <div className="rounded-2xl border border-border-light bg-white p-5">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-heading">
                  Categories
                </h3>
                <ul className="mt-4 divide-y divide-border-light">
                  {tags.map((t) => (
                    <li key={t.tag}>
                      <Link
                        to={`/blog/category/${t.tag}`}
                        className="flex items-center justify-between py-2.5 text-sm text-body transition-colors hover:text-brand-blue"
                      >
                        <span className="inline-flex items-center gap-2">
                          <FolderIcon className="h-4 w-4 text-muted" />
                          {t.label}
                        </span>
                        <span className="text-xs text-muted">({t.count})</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#04101E] via-[#06182B] to-[#0A3D6B] p-5 text-center">
                <h3 className="font-display text-lg font-bold text-white">
                  Security Briefing, Monthly
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  One email per month. Threat updates and analysis from our team. No spam.
                </p>
                <form className="mt-4 space-y-2" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    aria-label="Email address"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-400 focus:border-[#28B5E1]/60 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-bright"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </aside>

          </div>
        </div>
      </section>

      <ClientStrip />

      <CTASection
        title="Have a Security Question?"
        description="Our engineering team is available for consultations. Ask about your specific situation, we'll give you a straight answer."
        primaryButton={{ text: "Discuss Your Requirements", action: "modal" }}
      />
    </>
  );
}
