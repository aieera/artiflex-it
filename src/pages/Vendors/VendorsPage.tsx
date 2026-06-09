import { useEffect, useMemo, useRef, useState } from "react";
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
  const [activeCategory, setActiveCategory] = useState<CategoryKey | "all">("all");
  const [query, setQuery] = useState("");
  const [missingLogos, setMissingLogos] = useState<Set<string>>(new Set());

  /* Match the Navbar's auto-hide behavior so the sticky filter bar
     tucks to top:0 when the navbar slides off, and reseats below the
     navbar when it slides back in. */
  const [navbarVisible, setNavbarVisible] = useState(true);
  const lastScrollY = useRef(0);
  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > 100) {
          setNavbarVisible(y < lastScrollY.current);
        } else {
          setNavbarVisible(true);
        }
        lastScrollY.current = y;
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      if (activeCategory !== "all" && !v.categories.includes(activeCategory)) return false;
      if (q && !v.name.toLowerCase().includes(q) && !v.description.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [activeCategory, query]);

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

  function FilterPill({ k, label }: { k: CategoryKey | "all"; label: string }) {
    const isActive = activeCategory === k;
    return (
      <button
        type="button"
        onClick={() => setActiveCategory(k)}
        aria-pressed={isActive}
        className={`group inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-all ${
          isActive
            ? "border-[#1B8AC7] bg-[#1B8AC7] text-white shadow-[0_4px_12px_rgba(27,138,199,0.25)]"
            : "border-slate-200 bg-white text-slate-700 hover:border-[#1B8AC7] hover:text-[#1B8AC7]"
        }`}
      >
        {label}
        <span
          className={`inline-flex h-[18px] min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10.5px] font-mono font-bold ${
            isActive ? "bg-white/25 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-[#e6f4fb] group-hover:text-[#126a9c]"
          }`}
        >
          {counts[k]}
        </span>
      </button>
    );
  }

  return (
    <>
      <title>Technology Vendors & Partners UAE | Cybersecurity, Cloud, Networking & Infrastructure | Artiflex IT</title>
      <meta
        name="description"
        content={`Artiflex IT partners with ${VENDORS.length}+ leading vendors across cybersecurity, cloud, networking, and infrastructure. Sophos, Check Point, Fortinet, Cisco, Palo Alto Networks, Kaspersky, 3CX, Nutanix, ESET, F5, Microsoft Azure, Huawei, Trend Micro, SonicWall, Proofpoint, Mimecast, Acronis, VMware, Veeam, Ivanti, HPE, Microsoft, all UAE-deployed and certified.`}
      />
      <meta
        name="keywords"
        content="IT vendors UAE, technology partners Dubai, cybersecurity vendors UAE, cloud vendors UAE, networking vendors UAE, Sophos partner UAE, Check Point partner UAE, Fortinet partner UAE, Cisco partner UAE, Palo Alto Networks UAE, Kaspersky UAE, 3CX UAE, Nutanix UAE, ESET UAE, F5 Networks UAE, Microsoft Azure UAE, Huawei UAE, Trend Micro UAE, SonicWall UAE, Proofpoint UAE, Mimecast UAE, Acronis UAE, VMware UAE, Veeam UAE, Ivanti UAE, HPE UAE, Microsoft 365 UAE, vendor list cybersecurity UAE, IT solutions vendors Dubai"
      />
      <link rel="canonical" href="https://artiflexit.com/vendors" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Technology Vendors & Partners UAE | Artiflex IT" />
      <meta
        property="og:description"
        content={`${VENDORS.length}+ leading cybersecurity, cloud, networking and infrastructure vendors. UAE-deployed by Artiflex IT.`}
      />
      <meta property="og:url" content="https://artiflexit.com/vendors" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Technology Vendors & Partners UAE | Artiflex IT" />
      <meta
        name="twitter:description"
        content={`${VENDORS.length}+ vendors across cybersecurity, cloud and infrastructure, certified UAE delivery.`}
      />
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

      {/* FILTERS (sticky, syncs with auto-hide navbar) */}
      <div
        className={`sticky z-30 border-b border-slate-200 bg-slate-50/95 backdrop-blur-sm transition-[top] duration-300 ease-out ${
          navbarVisible ? "top-[72px] sm:top-20" : "top-0"
        }`}
      >
        <div className="shell py-4 sm:py-5">
          {/* Primary: All Vendors */}
          <div className="flex items-center justify-between gap-3 pb-3.5">
            <FilterPill k="all" label="All Vendors" />
            {activeCategory !== "all" && (
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className="text-xs font-semibold text-slate-400 transition-colors hover:text-[#1B8AC7]"
              >
                Clear filter
              </button>
            )}
          </div>

          {/* Grouped categories */}
          <div className="space-y-3 border-t border-slate-200/80 pt-3.5">
            {FILTER_GROUPS.map((group) => (
              <div
                key={group.label}
                className="flex flex-col gap-2 sm:grid sm:grid-cols-[132px_1fr] sm:items-start sm:gap-3"
              >
                <span className="pt-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.keys.map((k) => (
                    <FilterPill key={k} k={k} label={CATEGORY_LABEL[k]} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GRID */}
      <section className="bg-white py-14 sm:py-20">
        <div className="shell">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Showing <span className="font-semibold text-slate-900">{filtered.length}</span> of{" "}
              <span className="font-semibold text-slate-900">{VENDORS.length}</span> vendors
              {activeCategory !== "all" && (
                <>
                  {" "}in <span className="font-semibold text-slate-900">{CATEGORY_LABEL[activeCategory]}</span>
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
              <h3 className="font-display text-lg font-semibold text-slate-700">No vendors in this category yet.</h3>
              <p className="mt-2 text-sm text-slate-500">Try selecting a different category.</p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("all");
                  setQuery("");
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1B8AC7] px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-[#126a9c]"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
