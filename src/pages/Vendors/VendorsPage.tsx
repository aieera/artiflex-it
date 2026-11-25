import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/pages/About/section/PageHero";
import {
  VENDORS,
  CATEGORY_LABEL,
  CATEGORY_BADGE,
  type CategoryKey,
} from "@/pages/Vendors/data/vendors";


/* Logo fallback when a file is missing, small monogram chip */
function LogoMonogram({ name }: { name: string }) {
  const initials = name
    .replace(/[^A-Za-z\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
  return (
    <span
      aria-hidden="true"
      className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#1B8AC7] to-[#045891] font-display text-base font-bold text-white shadow-sm"
    >
      {initials}
    </span>
  );
}

/* ───────── PAGE ───────── */
export default function VendorsPage() {
  const [selected, setSelected] = useState<Set<CategoryKey>>(new Set());
  const [query, setQuery] = useState("");
  const [missingLogos, setMissingLogos] = useState<Set<string>>(new Set());

  /* Mobile-only collapse for the whole sidebar. */
  const [filtersOpen, setFiltersOpen] = useState(false);
  /* Which category groups are expanded (accordion). */
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());

  const toggleCategory = (k: CategoryKey) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  const toggleGroup = (label: string) =>
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  const clearAll = () => setSelected(new Set());

  const counts = useMemo(() => {
    const c = { all: VENDORS.length } as Record<CategoryKey | "all", number>;
    for (const key of Object.keys(CATEGORY_LABEL) as CategoryKey[]) c[key] = 0;
    for (const v of VENDORS) {
      for (const cat of v.categories) c[cat] += 1;
    }
    return c;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return VENDORS.filter((v) => {
      if (selected.size > 0 && !v.categories.some((c) => selected.has(c))) return false;
      if (q && !v.name.toLowerCase().includes(q) && !v.description.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [selected, query]);

  const itemListLd = useMemo(
    () =>
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Artiflex IT Vendor Partners, UAE",
        numberOfItems: VENDORS.length,
        itemListElement: VENDORS.map((v, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Brand",
            name: v.name,
            description: v.description,
            logo: `https://artiflexit.com${v.logo}`,
          },
        })),
      }),
    [],
  );

  /* Filter tabs grouped by domain so the bar reads as organised sections
     rather than one ragged wrap of 20+ pills. */
  const FILTER_GROUPS: { label: string; keys: CategoryKey[] }[] = [
    {
      label: "Cybersecurity",
      keys: ["endpoint", "network-security", "email", "dlp", "iam", "sase", "siem", "vuln", "app-security"],
    },
    {
      label: "Cloud & Data",
      keys: ["cloud", "backup", "servers", "storage"],
    },
    {
      label: "Infrastructure",
      keys: ["networking", "power", "surveillance", "access-control", "cabling", "printing", "comms"],
    },
  ];

  return (
    <>
      <title>IT Vendor Partners Dubai | 115+ Certified Technology Vendors</title>
      <meta
        name="description"
        content={`Artiflex IT is your partner for ${VENDORS.length}+ leading cybersecurity, cloud, networking and infrastructure vendors, all deployed and certified across the UAE.`}
      />
      <link rel="canonical" href="https://artiflexit.com/vendors" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      <meta httpEquiv="content-language" content="en-AE" />
      <meta name="geo.region" content="AE-DU" />
      <meta name="geo.placename" content="Dubai" />
      <meta name="geo.position" content="25.2528;55.3300" />
      <meta name="ICBM" content="25.2528, 55.3300" />

      <link rel="alternate" hrefLang="en-ae" href="https://artiflexit.com/vendors" />
      <link rel="alternate" hrefLang="en-om" href="https://artiflexit.com/vendors" />
      <link rel="alternate" hrefLang="en-sa" href="https://artiflexit.com/vendors" />
      <link rel="alternate" hrefLang="en-in" href="https://artiflexit.com/vendors" />
      <link rel="alternate" hrefLang="en" href="https://artiflexit.com/vendors" />
      <link rel="alternate" hrefLang="x-default" href="https://artiflexit.com/vendors" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="IT Vendor Partners Dubai | 115+ Certified Technology Vendors" />
      <meta
        property="og:description"
        content={`${VENDORS.length}+ leading cybersecurity, cloud, networking and infrastructure vendors. UAE-deployed by Artiflex IT.`}
      />
      <meta property="og:url" content="https://artiflexit.com/vendors" />
      <meta property="og:site_name" content="Artiflex Information Technology" />
      <meta property="og:locale" content="en_AE" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:image" content="https://artiflexit.com/og/pages/vendors.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Artiflex IT certified technology vendor partners in the UAE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="IT Vendor Partners Dubai | 115+ Certified Technology Vendors" />
      <meta
        name="twitter:description"
        content={`${VENDORS.length}+ vendors across cybersecurity, cloud and infrastructure, certified UAE delivery.`}
      />
      <meta name="twitter:image" content="https://artiflexit.com/og/pages/vendors.jpg" />
      <meta name="twitter:site" content="@artiflexit" />
      <script type="application/ld+json">{itemListLd}</script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://artiflexit.com/" },
            { "@type": "ListItem", position: 2, name: "Vendors", item: "https://artiflexit.com/vendors" },
          ],
        })}
      </script>

      {/* HERO */}
      <PageHero
        title={
          <>
            <span className="block text-xs font-semibold uppercase tracking-[0.25em] text-[#28B5E1] mb-3 sm:mb-4 sm:text-sm">
              Our Technology Partners
            </span>
            Trusted by Global Vendors,
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-white to-[#28B5E1] bg-clip-text text-transparent">
              {" "}Delivered Locally
            </span>
          </>
        }
        description="We partner with the world's leading cybersecurity, cloud, and infrastructure vendors to bring you best-in-class technology, backed by our team's certified expertise across the UAE, Oman, and Saudi Arabia."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Vendors", href: "/vendors" },
        ]}
        background="gradient-blinds"
      >
        <div className="flex flex-wrap items-center gap-x-10 gap-y-5 sm:gap-x-14">
          {[
            { num: `${VENDORS.length}+`, label: "Vendor Partners" },
            { num: "14+", label: "Years Experience" },
            { num: "500+", label: "Projects Delivered" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl font-bold text-white sm:text-4xl">{s.num}</div>
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75">{s.label}</div>
            </div>
          ))}
        </div>
      </PageHero>

      {/* VENDOR DIRECTORY */}
      <section className="bg-white py-14 sm:py-20">
        <div className="shell">
          <div className="lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-8 xl:gap-10">
            {/* SIDEBAR FILTERS */}
            <aside className="mb-8 lg:mb-0 lg:sticky lg:top-24 lg:self-start">
              <button
                type="button"
                onClick={() => setFiltersOpen((o) => !o)}
                aria-expanded={filtersOpen}
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 lg:hidden"
              >
                <span className="inline-flex items-center gap-2">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#1B8AC7]">
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="7" y1="12" x2="17" y2="12" />
                    <line x1="10" y1="18" x2="14" y2="18" />
                  </svg>
                  Filter by category
                  {selected.size > 0 && (
                    <span className="rounded-full bg-[#1B8AC7] px-2 py-0.5 text-[11px] font-bold text-white">
                      {selected.size}
                    </span>
                  )}
                </span>
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 text-slate-400 transition-transform ${filtersOpen ? "rotate-180" : ""}`}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <nav className={`${filtersOpen ? "mt-3 flex" : "hidden"} flex-col rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)] lg:mt-0 lg:flex lg:max-h-[calc(100vh-7rem)]`}>
                {/* Pinned top: All Vendors */}
                <button
                  type="button"
                  onClick={clearAll}
                  aria-pressed={selected.size === 0}
                  className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-[13.5px] font-semibold transition-all ${
                    selected.size === 0
                      ? "bg-[#1B8AC7] text-white shadow-[0_4px_12px_rgba(27,138,199,0.25)]"
                      : "text-slate-700 hover:bg-slate-100 hover:text-[#1B8AC7]"
                  }`}
                >
                  <span>All Vendors</span>
                  <span
                    className={`inline-flex h-[18px] min-w-[20px] shrink-0 items-center justify-center rounded-full px-1.5 text-[10.5px] font-mono font-bold ${
                      selected.size === 0 ? "bg-white/25 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {counts.all}
                  </span>
                </button>

                {/* Scrollable category groups (accordion + checkboxes) */}
                <div
                  data-lenis-prevent
                  className="mt-2 min-h-0 flex-1 overflow-y-auto border-t border-slate-100 [scrollbar-color:#cbd5e1_transparent] [scrollbar-width:thin]"
                >
                  {FILTER_GROUPS.map((group) => {
                    const open = openGroups.has(group.label);
                    const groupCount = group.keys.filter((k) => selected.has(k)).length;
                    return (
                      <div key={group.label} className="border-b border-slate-100 last:border-b-0">
                        <button
                          type="button"
                          onClick={() => toggleGroup(group.label)}
                          aria-expanded={open}
                          className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-[12px] font-bold uppercase tracking-[0.12em] text-slate-500 transition-colors hover:text-[#1B8AC7]"
                        >
                          <span className="inline-flex items-center gap-2">
                            {group.label}
                            {groupCount > 0 && (
                              <span className="rounded-full bg-[#1B8AC7] px-1.5 py-px text-[10px] font-bold tracking-normal text-white">
                                {groupCount}
                              </span>
                            )}
                          </span>
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>
                        <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                          <div className="overflow-hidden">
                            <div className="space-y-0.5 pb-2">
                              {group.keys.map((k) => {
                                const checked = selected.has(k);
                                return (
                                  <label
                                    key={k}
                                    className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-1.5 text-[13px] transition-colors ${
                                      checked ? "bg-[#e6f4fb] text-[#0f5e8c]" : "text-slate-700 hover:bg-slate-100"
                                    }`}
                                  >
                                    <span className="inline-flex items-center gap-2.5">
                                      <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => toggleCategory(k)}
                                        className="h-4 w-4 shrink-0 rounded border-slate-300 accent-[#1B8AC7]"
                                      />
                                      <span className="font-medium">{CATEGORY_LABEL[k]}</span>
                                    </span>
                                    <span className="font-mono text-[11px] font-semibold text-slate-400">
                                      {counts[k]}
                                    </span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pinned bottom: Clear all */}
                {selected.size > 0 && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="mt-3 w-full shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-500 transition-colors hover:border-[#1B8AC7] hover:text-[#1B8AC7]"
                  >
                    Clear all ({selected.size})
                  </button>
                )}
              </nav>
            </aside>

            {/* RESULTS */}
            <div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Showing <span className="font-semibold text-slate-900">{filtered.length}</span> of{" "}
              <span className="font-semibold text-slate-900">{VENDORS.length}</span> vendors
              {selected.size > 0 && (
                <>
                  {" "}in{" "}
                  <span className="font-semibold text-slate-900">
                    {selected.size === 1
                      ? CATEGORY_LABEL[[...selected][0]!]
                      : `${selected.size} categories`}
                  </span>
                </>
              )}
              {query && (
                <>
                  {" "}matching <span className="font-semibold text-slate-900">"{query}"</span>
                </>
              )}
            </p>

            <label className="relative w-full sm:w-72">
              <span className="sr-only">Search vendors</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search vendors"
                className="w-full rounded-full border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#1B8AC7] focus:outline-none focus:ring-2 focus:ring-[#1B8AC7]/20"
              />
            </label>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center">
              <h3 className="font-display text-lg font-semibold text-slate-700">No vendors match your filters.</h3>
              <p className="mt-2 text-sm text-slate-500">Try removing a category or clearing your search.</p>
              <button
                type="button"
                onClick={() => {
                  clearAll();
                  setQuery("");
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1B8AC7] px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-[#126a9c]"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((v) => {
                const showFallback = missingLogos.has(v.logo);
                return (
                  <Link
                    key={v.slug}
                    to={`/vendors/${v.slug}`}
                    aria-label={`View ${v.name} details`}
                    className="group flex min-h-[220px] flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#1B8AC7] hover:shadow-[0_10px_30px_rgba(27,138,199,0.12)]"
                  >
                    <div className="mb-4 flex h-14 items-center">
                      {showFallback ? (
                        <LogoMonogram name={v.name} />
                      ) : (
                        <img
                          src={v.logo}
                          alt={`${v.name} logo`}
                          loading="lazy"
                          onError={() => setMissingLogos((prev) => new Set(prev).add(v.logo))}
                          className="max-h-11 w-auto max-w-[140px] object-contain object-left"
                        />
                      )}
                    </div>
                    <h3 className="font-display text-lg font-bold leading-tight text-slate-900 transition-colors group-hover:text-[#1B8AC7]">{v.name}</h3>
                    <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-slate-500">{v.description}</p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {v.categories.map((cat) => (
                          <span
                            key={cat}
                            className="inline-flex items-center rounded-full bg-[#e6f4fb] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.04em] text-[#126a9c]"
                          >
                            {CATEGORY_BADGE[cat]}
                          </span>
                        ))}
                      </div>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#1B8AC7]"
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f1c2e] via-[#0A3D6B] to-[#1B8AC7] py-16 text-center sm:py-20">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_55%)]" />
        <div className="relative mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Need help choosing the right vendor?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Our certified specialists will assess your requirements and recommend the best-fit technology stack, no sales pitch, just expert guidance.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#1B8AC7] shadow-[0_8px_30px_rgba(255,255,255,0.18)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(255,255,255,0.28)] sm:text-base"
            >
              Book a Free Consultation
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

