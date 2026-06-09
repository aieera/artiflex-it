import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PageHero from "@/pages/About/section/PageHero";
import { useContactModal } from "@/components/layout/ContactModal";
import SophosShowcase from "@/components/sections/SophosShowcase";
import VendorShowcase from "@/components/sections/VendorShowcase";
import {
  CATEGORY_BADGE,
  RELATED_CATEGORY_META,
  RELATED_DETAIL_PAGES,
  getVendorBySlug,
} from "@/pages/Vendors/data/vendors";

export default function VendorDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const vendor = slug ? getVendorBySlug(slug) : undefined;
  const { open: openContact } = useContactModal();
  const [logoMissing, setLogoMissing] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  if (!vendor) return <Navigate to="/vendors" replace />;

  const relatedProducts = RELATED_DETAIL_PAGES[vendor.slug] ?? [];
  const initials = vendor.name
    .replace(/[^A-Za-z\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");

  return (
    <>
      <title>{`${vendor.name} | Vendor Partner UAE | Artiflex IT`}</title>
      <meta name="description" content={vendor.description} />
      <meta name="keywords" content={`${vendor.name} UAE, ${vendor.name} partner UAE, ${vendor.name} reseller Dubai, ${vendor.categories.map((c) => CATEGORY_BADGE[c]).join(", ")}, Artiflex IT`} />
      <link rel="canonical" href={`https://artiflexit.com/vendors/${vendor.slug}`} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${vendor.name} | Vendor Partner UAE | Artiflex IT`} />
      <meta property="og:description" content={vendor.description} />
      <meta property="og:url" content={`https://artiflexit.com/vendors/${vendor.slug}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${vendor.name} | Vendor Partner UAE | Artiflex IT`} />
      <meta name="twitter:description" content={vendor.description} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Brand",
          name: vendor.name,
          description: vendor.description,
          logo: `https://artiflexit.com${vendor.logo}`,
          url: `https://artiflexit.com/vendors/${vendor.slug}`,
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://artiflexit.com/" },
            { "@type": "ListItem", position: 2, name: "Vendors", item: "https://artiflexit.com/vendors" },
            { "@type": "ListItem", position: 3, name: vendor.name, item: `https://artiflexit.com/vendors/${vendor.slug}` },
          ],
        })}
      </script>

      {/* HERO */}
      <PageHero
        title={
          <>
            <span className="block text-xs font-semibold uppercase tracking-[0.25em] text-[#28B5E1] mb-3 sm:mb-4 sm:text-sm">
              Vendor Partner
            </span>
            {vendor.name}
            {vendor.heroTagline && (
              <span className="mt-3 block font-display text-xl font-semibold leading-snug text-[#9CD6EE] sm:mt-4 sm:text-2xl md:text-3xl lg:text-4xl">
                {vendor.heroTagline}
              </span>
            )}
          </>
        }
        description={vendor.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Vendors", href: "/vendors" },
          { label: vendor.name, href: `/vendors/${vendor.slug}` },
        ]}
        background="gradient-blinds"
      >
        <div className="flex flex-wrap items-center gap-4">
          {vendor.partnerBadge && (
            <span className="inline-flex items-center gap-2 rounded-full border border-[#28B5E1]/40 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-[#9CD6EE]" aria-hidden="true">
                <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
              </svg>
              {vendor.partnerBadge}
            </span>
          )}
          <div className="flex flex-wrap gap-2">
            {vendor.categories.map((c) => (
              <span
                key={c}
                className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm"
              >
                {CATEGORY_BADGE[c]}
              </span>
            ))}
          </div>
        </div>
        {(vendor.showcase === "sophos" || vendor.productShowcase) && (
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={openContact}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#1B8AC7] shadow-[0_8px_30px_rgba(255,255,255,0.18)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(255,255,255,0.28)] sm:text-base"
            >
              Talk to our Consultant
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
            <a
              href={vendor.showcase === "sophos" ? "#sophos-portfolio" : `#${vendor.slug}-portfolio`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/45 hover:bg-white/10 sm:text-base"
            >
              Explore Products
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
          </div>
        )}
      </PageHero>

      {/* VENDOR SUMMARY CARD */}
      <section className="relative bg-white py-12 sm:py-16">
        <div className="shell">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-10">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
              <div className="flex h-24 w-32 shrink-0 items-center justify-center sm:h-28 sm:w-40">
                {logoMissing ? (
                  <span aria-hidden="true" className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1B8AC7] to-[#045891] font-display text-2xl font-bold text-white shadow-md">
                    {initials}
                  </span>
                ) : (
                  <img
                    src={vendor.logo}
                    alt={`${vendor.name} logo`}
                    onError={() => setLogoMissing(true)}
                    className="max-h-20 w-auto max-w-full object-contain"
                  />
                )}
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="font-display text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                  What we do with {vendor.name}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
                  {vendor.summaryHeadline ?? vendor.description}
                </p>
                {vendor.summaryParagraphs && vendor.summaryParagraphs.length > 0 ? (
                  vendor.summaryParagraphs.map((p, i) => (
                    <p key={i} className={`${i === 0 ? "mt-4" : "mt-3"} text-sm leading-relaxed text-slate-500`}>
                      {p}
                    </p>
                  ))
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">
                    Artiflex IT is a regional partner with certified engineers across UAE, Oman, and Saudi Arabia. We design, deploy, and operate {vendor.name} solutions end to end, from sizing through commissioning to managed service.
                  </p>
                )}
              </div>
            </div>
          </div>

          {vendor.aboutFacts && vendor.aboutFacts.length > 0 && (
            <div className="mt-10 sm:mt-12">
              <h3 className="font-display text-xl font-bold leading-tight text-slate-900 sm:text-2xl">
                {vendor.aboutHeading ?? `About ${vendor.name}`}
              </h3>
              {vendor.aboutTagline && (
                <p className="mt-2 text-sm leading-relaxed text-slate-500 sm:text-base">
                  {vendor.aboutTagline}
                </p>
              )}
              <dl className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4">
                {vendor.aboutFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className={`rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)] sm:p-6 ${fact.wide ? "sm:col-span-3" : ""}`}
                  >
                    <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#28B5E1] sm:text-[11px]">
                      {fact.label}
                    </dt>
                    <dd className="mt-3 text-base font-bold leading-snug text-slate-900 sm:text-lg">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </section>

      {/* SOPHOS SHOWCASE (Sophos only, full product portfolio + Site-in-a-Box) */}
      {vendor.showcase === "sophos" && <SophosShowcase onCtaClick={openContact} />}

      {/* GENERIC VENDOR SHOWCASE (any non-sophos vendor with productShowcase data) */}
      {vendor.showcase !== "sophos" && vendor.productShowcase && (
        <VendorShowcase
          vendorSlug={vendor.slug}
          vendorName={vendor.name}
          eyebrow={vendor.productShowcase.eyebrow}
          heading={vendor.productShowcase.heading}
          intro={vendor.productShowcase.intro}
          products={vendor.productShowcase.products}
        />
      )}

      {/* WHY VENDOR */}
      {vendor.whyVendor && vendor.whyVendor.items.length > 0 && (
        <section className="relative bg-white py-16 sm:py-20">
          <div className="shell">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
                {vendor.whyVendor.eyebrow ?? `Why ${vendor.name}`}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                {vendor.whyVendor.title ?? `Why we recommend ${vendor.name} to our customers`}
              </h2>
              {vendor.whyVendor.intro && (
                <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                  {vendor.whyVendor.intro}
                </p>
              )}
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {vendor.whyVendor.items.map((reason) => (
                <div
                  key={reason.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f1c2e] via-[#0A3D6B] to-[#0f1c2e] p-6 shadow-[0_8px_24px_rgba(15,28,46,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[#28B5E1]/50 hover:shadow-[0_18px_45px_rgba(40,181,225,0.22)] sm:p-7"
                >
                  <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/60 to-transparent" />
                  <span aria-hidden="true" className="pointer-events-none absolute -top-24 -right-16 h-48 w-48 rounded-full bg-[#28B5E1]/10 blur-3xl transition-opacity duration-500 group-hover:opacity-80 opacity-50" />
                  <h3 className="relative font-display text-lg font-bold leading-tight text-white sm:text-xl">
                    {reason.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-slate-300">
                    {reason.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RELATED CYBERSECURITY PRODUCT PAGES */}
      {relatedProducts.length > 0 && (
        <section className="relative bg-slate-50 py-10 sm:py-12">
          <div className="shell">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1B8AC7]">
                Detailed buyer's guides
              </p>
              <h2 className="mt-2 font-display text-xl font-bold leading-tight text-slate-900 sm:text-2xl">
                {vendor.name} across our cybersecurity categories
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Each link opens our vendor-neutral comparison and shortlist for that category, with sizing guidance, Gartner-style review and licensing breakdown.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((rp) => {
                const meta = RELATED_CATEGORY_META[rp.category];
                return (
                  <Link
                    key={`${rp.category}-${rp.slug}`}
                    to={`${meta.pathBase}/${rp.slug}`}
                    className="group relative flex items-center justify-between overflow-hidden rounded-xl border border-slate-200 bg-white px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/50 hover:shadow-[0_8px_24px_-10px_rgba(27,138,199,0.20)]"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full transition-all duration-300 group-hover:h-10"
                      style={{ backgroundColor: meta.accent }}
                    />
                    <div className="min-w-0 pl-2">
                      <div className="flex items-center gap-1.5">
                        <span
                          aria-hidden="true"
                          className="inline-block h-1 w-1 rounded-full"
                          style={{ backgroundColor: meta.accent }}
                        />
                        <p className="truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                          {meta.label}
                        </p>
                      </div>
                      <h3 className="mt-1 truncate font-display text-[15px] font-bold leading-tight text-slate-900 transition-colors group-hover:text-[#1B8AC7]">
                        {rp.productName}
                      </h3>
                    </div>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-3 h-4 w-4 shrink-0 text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#1B8AC7]"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* WHY ARTIFLEX */}
      {vendor.artiflexPanel ? (
        <section className="relative overflow-hidden bg-white py-16 sm:py-20">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(40,181,225,0.06),transparent_55%)]" />
          <div className="shell relative">
            <div className="max-w-5xl">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
                {vendor.artiflexPanel.eyebrow ?? `Why Artiflex for ${vendor.name}`}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
                {vendor.artiflexPanel.title ?? "Certified, hands-on, and accountable"}
              </h2>
              {vendor.artiflexPanel.intro && (
                <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                  {vendor.artiflexPanel.intro}
                </p>
              )}
            </div>

            <div className="mt-12 grid grid-cols-1 gap-10 sm:mt-14 lg:grid-cols-2 lg:gap-14">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-8">
                {vendor.artiflexPanel.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="font-display text-2xl font-bold leading-none text-[#1B8AC7] sm:text-3xl">
                      {stat.value}
                    </dt>
                    <dd className="mt-3">
                      <p className="text-sm font-bold text-slate-900 sm:text-base">{stat.label}</p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">{stat.sub}</p>
                    </dd>
                  </div>
                ))}
              </dl>

              <div>
                <h3 className="font-display text-lg font-bold text-slate-900 sm:text-xl">
                  {vendor.artiflexPanel.accreditationsHeading ?? `Our ${vendor.name} accreditations`}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-3">
                  {vendor.artiflexPanel.accreditations.map((cred) => (
                    <li
                      key={cred}
                      className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
                    >
                      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.45)]" />
                      {cred}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="relative overflow-hidden bg-white py-12 sm:py-16">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(40,181,225,0.05),transparent_55%)]" />
          <div className="shell relative">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              Why Artiflex for {vendor.name}
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
              Regional partner, end-to-end delivery
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Artiflex IT delivers {vendor.name} solutions across the UAE, Oman, and Saudi Arabia. Our certified engineers own the full lifecycle, from initial sizing and procurement through deployment, integration, training, and ongoing managed services.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {[
                "UAE · Oman · Saudi Arabia coverage",
                `${vendor.name}-certified engineers`,
                "End-to-end lifecycle ownership",
                "Direct vendor escalation paths",
              ].map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12.5px] font-medium text-slate-700"
                >
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA STRIP */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f1c2e] via-[#0A3D6B] to-[#1B8AC7] py-16 text-center sm:py-20">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_55%)]" />
        <div className="relative mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            {vendor.ctaHeading ?? "Talk to our IT Advisor"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Tell us your environment, scope and any regulatory constraints. We'll come back with a sized, vendor-neutral recommendation, indicative cost, and an honest read on whether {vendor.name} is the right fit.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={openContact}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#1B8AC7] shadow-[0_8px_30px_rgba(255,255,255,0.18)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(255,255,255,0.28)] sm:text-base"
            >
              Talk to our Consultant
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
            <Link
              to="/vendors"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10 sm:text-base"
            >
              ← All vendors
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
