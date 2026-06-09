import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import {
  CheckIcon,
  ShieldIcon,
  AlertIcon,
  UsersIcon,
  MonitorIcon,
  ServerIcon,
  EyeIcon,
  LayersIcon,
  PhoneIcon,
  MailIcon,
  FileTextIcon,
  GlobeIcon,
  ListIcon,
  ActivityIcon,
  LockIcon,
  BarChartIcon,
  MessageIcon,
  SlidersIcon,
  CloudIcon,
} from "@/components/icons";
import { emailVendors } from "../data/emailVendors";

const strengthIconMap: Record<string, React.FC<{ className?: string }>> = {
  shield: ShieldIcon,
  heartbeat: AlertIcon,
  users: UsersIcon,
  monitor: MonitorIcon,
  server: ServerIcon,
  eye: EyeIcon,
  layers: LayersIcon,
  phone: PhoneIcon,
  mail: MailIcon,
  file: FileTextIcon,
  globe: GlobeIcon,
  list: ListIcon,
  activity: ActivityIcon,
  lock: LockIcon,
  barChart: BarChartIcon,
  message: MessageIcon,
  sliders: SlidersIcon,
};

const strengthToneMap: Record<string, { iconBox: string; tag: string }> = {
  emerald: {
    iconBox: "border-emerald-400/20 bg-emerald-500/10 text-emerald-300",
    tag: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
  },
  violet: {
    iconBox: "border-violet-400/20 bg-violet-500/10 text-violet-300",
    tag: "border-violet-400/30 bg-violet-500/10 text-violet-300",
  },
  amber: {
    iconBox: "border-amber-400/20 bg-amber-500/10 text-amber-300",
    tag: "border-amber-400/30 bg-amber-500/10 text-amber-300",
  },
  rose: {
    iconBox: "border-rose-400/20 bg-rose-500/10 text-rose-300",
    tag: "border-rose-400/30 bg-rose-500/10 text-rose-300",
  },
  sky: {
    iconBox: "border-sky-400/20 bg-sky-500/10 text-sky-300",
    tag: "border-sky-400/30 bg-sky-500/10 text-sky-300",
  },
  slate: {
    iconBox: "border-slate-400/20 bg-slate-500/10 text-slate-200",
    tag: "border-slate-400/30 bg-slate-500/10 text-slate-200",
  },
};

function vendorInitials(name: string) {
  return name
    .replace(/[^A-Za-z\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default function EmailVendorDetail() {
  const { slug } = useParams<{ slug: string }>();
  const vendor = slug ? emailVendors[slug] : undefined;
  const { open: openContact } = useContactModal();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  if (!vendor) {
    return <Navigate to="/cybersecurity/email-security" replace />;
  }

  return (
    <>
      <title>{`${vendor.name} | Email Security UAE | Artiflex IT`}</title>
      <meta name="description" content={vendor.description.slice(0, 160)} />
      <link
        rel="canonical"
        href={`https://artiflexit.com/cybersecurity/email/${vendor.slug}`}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#04101E] to-[#0A3D6B]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(40,181,225,0.18),transparent_55%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(27,138,199,0.10),transparent_60%)]"
        />

        <div className="relative z-10 border-b border-white/5">
          <div className="shell flex w-full items-center gap-2 pt-24 pb-3 text-[11px] text-slate-400 sm:pt-28">
            <Link to="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span className="text-slate-600">/</span>
            <Link to="/cybersecurity" className="transition-colors hover:text-white">
              Cybersecurity
            </Link>
            <span className="text-slate-600">/</span>
            <Link
              to="/cybersecurity/email-security"
              className="transition-colors hover:text-white"
            >
              Email Security for Business
            </Link>
            <span className="text-slate-600">/</span>
            <span className="font-medium text-[#28B5E1]">{vendor.name}</span>
          </div>
        </div>

        <div className="shell relative z-10 w-full py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-transparent to-[#28B5E1]" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-[#28B5E1]">
                  {vendor.bestFor}
                </span>
              </div>

              {/* Vendor name */}
              <h1 className="mt-6 font-display text-4xl font-bold leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]">
                {vendor.name}
              </h1>

              {/* Tagline */}
              <p className="mt-5 max-w-xl font-display text-xl leading-snug text-[#9CD6EE] sm:text-2xl">
                {vendor.tagline}
              </p>

              {/* Description */}
              <div className="mt-6 max-w-2xl border-l-2 border-[#28B5E1]/30 pl-5">
                <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
                  {vendor.description}
                </p>
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-col gap-5">
                {/* Secondary actions */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-2 sm:gap-x-3">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Explore
                  </span>
                  <Link
                    to="/cybersecurity/email-security#vendor-comparison"
                    className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:-translate-y-0.5 hover:border-[#28B5E1]/60 hover:bg-white/10 hover:text-white sm:text-[13px]"
                  >
                    Vendor Comparison
                    <svg className="h-3 w-3 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <a
                    href="#sizing"
                    className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:-translate-y-0.5 hover:border-[#28B5E1]/60 hover:bg-white/10 hover:text-white sm:text-[13px]"
                  >
                    Compare Editions
                    <svg className="h-3 w-3 opacity-50 transition-all group-hover:translate-y-0.5 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </a>
                  <Link
                    to="/cybersecurity/email-security#gartner-comparison"
                    className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:-translate-y-0.5 hover:border-[#28B5E1]/60 hover:bg-white/10 hover:text-white sm:text-[13px]"
                  >
                    Gartner-style Review
                    <svg className="h-3 w-3 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                {/* Primary CTA */}
                <div>
                  <button
                    type="button"
                    onClick={openContact}
                    className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#28B5E1] to-[#1B8AC7] px-8 py-3.5 text-sm font-semibold text-navy-deep shadow-[0_8px_30px_rgba(40,181,225,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(40,181,225,0.5)] sm:w-auto sm:text-base"
                  >
                    Request for quote
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="relative lg:col-span-5"
            >
              <div className="relative mx-auto flex aspect-[4/3] max-w-md items-center justify-center overflow-hidden rounded-3xl border border-white/15 bg-white p-10 shadow-[0_30px_80px_-20px_rgba(3,16,28,0.8)] ring-1 ring-[#28B5E1]/10 sm:p-14">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/40 to-transparent"
                />
                {vendor.logo ? (
                  <img
                    src={vendor.logo}
                    alt={`${vendor.name} logo`}
                    className="relative z-10 max-h-32 w-full max-w-[80%] object-contain"
                  />
                ) : (
                  <div className="relative z-10 flex flex-col items-center justify-center gap-3 text-center">
                    <span
                      aria-hidden="true"
                      className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1B8AC7] to-[#28B5E1] text-2xl font-bold tracking-wide text-white shadow-lg"
                    >
                      {vendorInitials(vendor.name)}
                    </span>
                    <p className="font-display text-lg font-semibold text-slate-900">
                      {vendor.name}
                    </p>
                  </div>
                )}
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* KEY FACTS (rendered only when keyStats has entries) */}
      {vendor.keyStats.length > 0 && (
        <section className="relative bg-slate-50 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-8 sm:px-6">
            <div
              className={`grid gap-4 sm:grid-cols-2 ${
                vendor.keyStats.some((s) => s.wide)
                  ? "lg:grid-cols-3"
                  : "lg:grid-cols-4"
              }`}
            >
              {vendor.keyStats.map((s) => (
                <div
                  key={s.label}
                  className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${
                    s.wide ? "sm:col-span-2 lg:col-span-3" : ""
                  }`}
                >
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1B8AC7]">
                    {s.label}
                  </p>
                  <p className="mt-2 font-display text-base font-semibold text-slate-900 sm:text-lg">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHAT IS X (data-driven) */}
      {vendor.whatIs && (
        <section className="relative overflow-hidden bg-white py-20 sm:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-[#28B5E1]/30 via-[#9CD6EE]/20 to-transparent blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute top-32 right-[-10rem] h-[26rem] w-[26rem] rounded-full bg-gradient-to-tr from-violet-300/15 via-fuchsia-200/15 to-cyan-200/20 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/3 h-[26rem] w-[26rem] rounded-full bg-gradient-to-tr from-[#1B8AC7]/20 via-[#28B5E1]/15 to-transparent blur-3xl" />

          <div className="shell relative">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#28B5E1]/20 bg-white/60 px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7] backdrop-blur-xl shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#28B5E1] shadow-[0_0_8px_rgba(40,181,225,0.8)]" />
                {vendor.whatIs.eyebrow}
              </span>
              <h2 className="mt-6 font-display text-3xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                {vendor.whatIs.titlePrefix}
                <span className="bg-gradient-to-r from-[#1B8AC7] via-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">
                  {vendor.whatIs.titleHighlight}
                </span>
              </h2>
            </div>

            <div className="relative mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
              <div className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-7 shadow-[0_10px_40px_-10px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-10px_rgba(40,181,225,0.20)] sm:p-9 lg:col-span-2">
                <span aria-hidden="true" className="pointer-events-none absolute -top-16 -right-12 h-40 w-40 rounded-full bg-gradient-to-br from-[#28B5E1]/15 to-transparent blur-2xl" />
                <span aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-gradient-to-tr from-[#1B8AC7]/15 to-transparent blur-2xl" />
                <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/40 to-transparent" />
                <div className="relative space-y-5">
                  {vendor.whatIs.bodyParagraphs.map((p, i) => (
                    <p key={i} className="text-[15px] leading-[1.75] text-slate-700 sm:text-base">
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#0A3D6B] via-[#04101E] to-[#020617] p-7 shadow-[0_20px_60px_-15px_rgba(15,28,46,0.45)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-15px_rgba(40,181,225,0.45)] sm:p-9">
                <span aria-hidden="true" className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-[#28B5E1]/35 blur-3xl" />
                <span aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-violet-500/15 blur-3xl" />
                <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/80 to-transparent" />
                <div className="relative">
                  <h3 className="font-display text-2xl font-bold leading-[1.1] text-white sm:text-3xl md:text-[2rem]">
                    {vendor.whatIs.feature.titleLine1}
                    <br />
                    <span className="bg-gradient-to-r from-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">
                      {vendor.whatIs.feature.titleLine2}
                    </span>
                  </h3>
                  <p className="mt-5 text-sm leading-[1.7] text-white/80 sm:text-[15px]">
                    {vendor.whatIs.feature.body}
                  </p>
                </div>
              </div>
            </div>

            {vendor.whatIs.capabilities.length > 0 && (
              <ul className="relative mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-6 lg:grid-cols-4">
                {vendor.whatIs.capabilities.map((item) => (
                  <li
                    key={item}
                    className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-5 shadow-[0_6px_24px_-8px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-[#28B5E1]/40 hover:bg-white/80 hover:shadow-[0_14px_40px_-10px_rgba(40,181,225,0.25)]"
                  >
                    <span aria-hidden="true" className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-tr from-[#28B5E1]/0 to-transparent blur-2xl transition-all duration-500 group-hover:from-[#28B5E1]/20" />
                    <div className="relative flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#28B5E1] to-[#1B8AC7] text-white shadow-[0_4px_12px_-2px_rgba(40,181,225,0.5)]"
                      >
                        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                          <path d="M4 10l4 4 8-8" />
                        </svg>
                      </span>
                      <span className="text-[13.5px] font-medium leading-snug text-slate-800 sm:text-sm">
                        {item}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* WHY THIS PLATFORM WINS */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(27,138,199,0.06),transparent_55%)]"
        />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              {vendor.whyWinsIntro?.label ?? "Why it wins"}
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              {vendor.whyWinsIntro?.title ?? `What makes ${vendor.name} a serious option`}
            </h2>
            {vendor.whyWinsIntro?.description && (
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                {vendor.whyWinsIntro.description}
              </p>
            )}
          </div>
          <div className="relative mx-auto max-w-4xl px-5 sm:px-6 ">
            {vendor.whyWinsIntro?.stats && vendor.whyWinsIntro.stats.length > 0 && (
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {vendor.whyWinsIntro.stats.map((stat, i) => {
                  const toneText = {
                    emerald: "text-emerald-300",
                    violet: "text-violet-300",
                    sky: "text-sky-300",
                  }[stat.tone];
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.45, delay: 0.05 * i }}
                      className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#1E4E73] via-[#143E62] to-[#042542] px-6 py-7 shadow-md"
                    >
                      <p className={`font-display text-2xl font-bold leading-none sm:text-2xl ${toneText}`}>
                        {stat.value}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-200">
                        {stat.label}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-12 grid items-start gap-1 lg:grid-cols-2">
            {vendor.strengths.map((s, i) => {
              const Icon = s.icon ? strengthIconMap[s.icon] : null;
              const tone = strengthToneMap[s.tone ?? "emerald"];
              const isOrphan =
                i === vendor.strengths.length - 1 &&
                vendor.strengths.length % 2 === 1;
              return (
                <motion.div
                  key={s.title}
                  tabIndex={0}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.05 * i }}
                  className={`group rounded-xl border border-white/10 bg-gradient-to-br from-[#04101E] to-[#0A3D6B] p-4 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/40 hover:shadow-lg focus-within:border-[#28B5E1]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#28B5E1]/40 ${
                    isOrphan ? "lg:col-span-2" : ""
                  }`}
                >
                  <div className="flex items-stretch gap-2.5">
                    {Icon && (
                      <span
                        className={`flex w-11 shrink-0 items-center justify-center rounded-lg border ${tone.iconBox}`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                    )}
                    <div className="min-w-0">
                      {s.tag && (
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${tone.tag}`}
                        >
                          {s.tag}
                        </span>
                      )}
                      <h3 className="mt-1.5 font-display text-sm font-semibold text-white sm:text-base">
                        {s.title}
                      </h3>
                    </div>
                  </div>
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="mt-2.5 text-xs leading-relaxed text-slate-300 sm:text-sm">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {vendor.whyWinsIntro?.outro && (
            <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-slate-600 sm:mt-12 sm:text-base">
              {vendor.whyWinsIntro.outro}
            </p>
          )}
        </div>
      </section>

      {/* BEST FIT PROFILE */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#04101E] to-[#020617] py-12 sm:py-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.10),transparent_60%)]"
        />
        <div className="shell relative">
          <div className="border-b border-white/10 pb-5">
            <h2 className="font-display text-xl font-bold leading-tight text-white sm:text-2xl lg:text-[1.7rem]">
              Who should put{" "}
              <span className="bg-gradient-to-r from-[#28B5E1] to-[#7ad4f0] bg-clip-text text-transparent">
                {vendor.name}
              </span>{" "}
              on the shortlist
            </h2>
          </div>

          <ul className="mt-6 grid gap-2 sm:mt-8 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-2.5">
            {vendor.bestFitProfile.map((p) => (
              <li
                key={p}
                className="group relative flex items-start gap-3 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/30 hover:bg-white/[0.05]"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#28B5E1]/15 text-[#28B5E1] ring-1 ring-inset ring-[#28B5E1]/25 transition-colors group-hover:bg-[#28B5E1] group-hover:text-white group-hover:ring-[#28B5E1]"
                >
                  <CheckIcon className="h-3 w-3" />
                </span>
                <p className="text-[13px] leading-relaxed text-slate-200 sm:text-[13.5px]">
                  {p}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PRODUCT PORTFOLIO */}
      <section id="sizing" className="relative bg-slate-50 py-16 sm:py-24 scroll-mt-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              Product portfolio
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Models we deploy and manage
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Picking the right SKU is as important as picking the right vendor. We size by user count, mailbox mix, and operational capacity, not by brochure tier.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="grid grid-cols-3 gap-4 bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-5 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE] sm:px-7 sm:text-[11px]">
              <span>SKU</span>
              <span>Tier</span>
              <span>What's included</span>
            </div>
            {vendor.products.map((p) => (
              <div
                key={p.model}
                className="grid grid-cols-3 gap-4 border-t border-[#0A3D6B]/20 px-5 py-4 transition-colors hover:bg-[#28B5E1]/[0.04] sm:px-7"
              >
                <span className="font-display text-sm font-semibold text-slate-900 sm:text-base">
                  {p.model}
                </span>
                <span className="text-sm text-slate-600 sm:text-base">{p.segment}</span>
                <span className="text-sm text-slate-600 sm:text-base">{p.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPLOYMENT OPTIONS (data-driven) */}
      {vendor.deploymentOptions && (
        <section className="relative bg-white py-12 sm:py-16">
          <div className="shell">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                {vendor.deploymentOptions.eyebrow ?? "Deployment Options"}
              </p>
              <h2 className="font-display text-xl font-semibold leading-tight text-slate-900 sm:text-2xl">
                {vendor.deploymentOptions.title}
                <span className="font-normal text-slate-500"> {vendor.deploymentOptions.intro}</span>
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {vendor.deploymentOptions.options.map((opt) => {
                const Icon = opt.icon === "hardware" ? ServerIcon : opt.icon === "virtual" ? LayersIcon : CloudIcon;
                return (
                  <div
                    key={opt.title}
                    className="rounded-xl border border-slate-200 bg-white p-5 transition-colors duration-300 hover:border-slate-300"
                  >
                    <div className="flex items-center gap-2.5">
                      <span aria-hidden="true" className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500">
                        <Icon className="h-4 w-4" />
                      </span>
                      <h3 className="font-display text-sm font-semibold text-slate-900 sm:text-[15px]">
                        {opt.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-[13px] leading-[1.6] text-slate-500 sm:text-sm">
                      {opt.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* WHAT TO CONSIDER (rendered only when watchOuts has entries) */}
      {vendor.watchOuts.length > 0 && (
        <section className="relative bg-white py-16 sm:py-24">
          <div className="shell">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-amber-600">
                What to consider
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                The honest watch-outs
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                Every platform has trade-offs. We would rather raise these now than have you discover them three months into a deployment.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {vendor.watchOuts.map((w) => (
                <div
                  key={w.title}
                  className="rounded-2xl border border-amber-200 bg-amber-50/60 p-7"
                >
                  <h3 className="font-display text-lg font-semibold text-slate-900 sm:text-xl">
                    {w.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                    {w.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHY ARTIFLEX */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0A3D6B] via-[#04101E] to-[#020617] p-8 shadow-xl shadow-[#1B8AC7]/10 sm:p-12">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#28B5E1]">
              Why Artiflex IT
            </p>
            <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
              Delivering {vendor.name} across the UAE
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-200 sm:text-lg">
              {vendor.whyArtiflex}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#28B5E1] px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:bg-white sm:text-base"
              >
                Talk to our Consultant
              </Link>
              <Link
                to="/cybersecurity/email-security"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-[#28B5E1]/50 hover:bg-white/10 sm:text-base"
              >
                Back to email security
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              Frequently asked
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              {vendor.name} questions we hear from UAE buyers
            </h2>
          </div>
          <div className="mt-10">
            <FAQAccordion items={vendor.faqs} />
          </div>
        </div>
      </section>

      <CTASection
        title={`Ready to evaluate ${vendor.name}?`}
        description="Free email security assessment, vendor-neutral sizing, and a written recommendation. We will tell you when another vendor is the better fit."
        primaryButton={{ text: "Request the assessment", action: "modal" }}
        secondaryButton={{
          text: "Compare all vendors",
          href: "/cybersecurity/email-security#vendor-comparison",
        }}
      />
    </>
  );
}
