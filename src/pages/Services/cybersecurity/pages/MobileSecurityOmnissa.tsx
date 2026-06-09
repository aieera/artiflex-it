import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import {
  CheckIcon,
  ShieldIcon,
  ZapIcon,
  LayersIcon,
  GridIcon,
  CpuIcon,
  NetworkIcon,
  ActivityIcon,
  CloudIcon,
  ServerIcon,
  MonitorIcon,
  PhoneIcon,
  LockIcon,
  GearIcon,
  MapPinIcon,
  BarChartIcon,
  StarIcon,
  GlobeIcon,
} from "@/components/icons";

/* ───────── DATA ───────── */

const vendor = {
  name: "Omnissa Workspace ONE",
  vendorCompany: "Omnissa (formerly VMware)",
  bestFor: "Enterprise UEM · Widest device coverage",
  tagline: "Enterprise UEM with the broadest device coverage",
  description:
    "For UAE enterprises running large, mixed-OS estates, Omnissa Workspace ONE (formerly VMware) manages virtually any endpoint, mobile, desktop, rugged, server and specialty devices, from one cloud-native console with AI-driven automation throughout. Carrying AirWatch heritage and independent since 2024, it is Artiflex IT's pick when device-coverage breadth and scale are non-negotiable.",
  logo: "/logos/Workspace ONE.webp",
};

const overviewParagraphs = [
  "Omnissa Workspace ONE is an enterprise unified endpoint management platform: one console to enrol, configure, secure and govern every device an organisation runs, Windows, macOS, iOS, iPadOS, Android, Linux, ChromeOS, plus rugged, server and specialty endpoints, with an Intelligence engine that automates work and flags anomalies across the estate. It delivers comprehensive UEM and MDM, with dedicated mobile threat defense added through partner integrations such as Zimperium or Lookout.",
  "Formerly VMware Workspace ONE, the platform traces its lineage to AirWatch (founded 2003, acquired by VMware in 2014) and now sits with the independent company Omnissa, spun out in 2024. Its defining strength is breadth: few platforms match it for device coverage or scale, which is why Artiflex recommends it for large, mixed-OS estates measured in tens of thousands of devices.",
];

const overviewCapabilities = [
  "Widest device coverage in the market",
  "Windows, macOS, iOS, Android, Linux, ChromeOS",
  "Rugged, server and specialty endpoints",
  "Workspace ONE Intelligence (AI automation)",
  "Strong BYOD containerisation",
  "Workspace ONE Access (identity / SSO)",
  "Digital Employee Experience (DEX)",
  "Partner MTD: Zimperium, Lookout and others",
];

const strengths: {
  title: string;
  desc: string;
  tag?: string;
  tone: "emerald" | "violet" | "amber" | "sky" | "rose" | "slate";
  Icon: React.FC<{ className?: string }>;
}[] = [
  {
    title: "Widest device coverage",
    tag: "All OS in one console",
    desc: "Mobile, desktop, rugged, server and specialty endpoints from a single platform. The reference UEM when the requirement is breadth, not depth in one ecosystem.",
    tone: "emerald",
    Icon: GridIcon,
  },
  {
    title: "Enterprise scale",
    tag: "Tens of thousands",
    desc: "Multi-tenant, microservices architecture built for the largest fleets. Scales to global organisations with tens of thousands of devices across regions and OS types.",
    tone: "sky",
    Icon: LayersIcon,
  },
  {
    title: "AI-driven automation",
    tag: "Intelligence engine",
    desc: "Workspace ONE Intelligence spots anomalies, automates remediation and orchestrates policy across the entire estate. Reduces manual work meaningfully at scale.",
    tone: "violet",
    Icon: CpuIcon,
  },
  {
    title: "Strong BYOD",
    tag: "Containerisation",
    desc: "Robust containerisation separates corporate and personal data, important under UAE PDPL and across BYOD-heavy populations in finance, healthcare and government.",
    tone: "amber",
    Icon: ShieldIcon,
  },
  {
    title: "Digital employee experience",
    tag: "DEX tooling",
    desc: "Experience-management tooling measures and improves end-user productivity across the estate, a differentiator when employee experience is a strategic priority.",
    tone: "rose",
    Icon: ActivityIcon,
  },
  {
    title: "Broad ecosystem",
    tag: "Partners and APIs",
    desc: "Deep integrations with identity providers, security tools and MTD vendors. Pairs cleanly with Zimperium or Lookout for the threat defense layer Workspace ONE does not provide natively.",
    tone: "slate",
    Icon: NetworkIcon,
  },
];

const whyWinsStats: { value: string; label: string; tone: "emerald" | "violet" | "sky" }[] = [
  { value: "All OS", label: "Windows, macOS, iOS, Android, Linux, ChromeOS, plus rugged and specialty", tone: "emerald" },
  { value: "Enterprise", label: "Multi-tenant microservices architecture built for tens of thousands of devices", tone: "sky" },
  { value: "Intelligence", label: "AI-driven automation, anomaly detection and DEX in the Enterprise edition", tone: "violet" },
];

const bestFitProfile = [
  "Large, complex enterprises with global, multi-region device estates and mixed operating systems",
  "Mixed-OS environments needing the widest possible device coverage from a single platform",
  "Rugged and industrial fleets running purpose-built handhelds, scanners and specialty endpoints",
  "Existing VMware/Omnissa shops already invested in the broader digital-workspace ecosystem",
  "Healthcare, manufacturing, logistics and retail with frontline and shared-device populations",
  "Identity-led organisations wanting Workspace ONE Access SSO at the centre of access control",
  "Programmes targeting Digital Employee Experience (DEX) as a measurable IT outcome",
  "Teams pairing best-of-breed MTD (Zimperium, Lookout) with a broad cross-platform UEM",
];

const coreFeatures: { title: string; desc: string; Icon: React.FC<{ className?: string }> }[] = [
  { title: "Multi-platform UEM", desc: "Windows, macOS, iOS, Android, Linux, ChromeOS.", Icon: GridIcon },
  { title: "Rugged and specialty devices", desc: "Purpose-built device support.", Icon: PhoneIcon },
  { title: "App lifecycle management", desc: "Full deployment and patching.", Icon: LayersIcon },
  { title: "Workspace ONE Intelligence", desc: "Automation and analytics engine.", Icon: BarChartIcon },
  { title: "Intelligent Hub", desc: "Unified app catalog and self-service.", Icon: MonitorIcon },
  { title: "Conditional access", desc: "Device-trust-based resource gating.", Icon: LockIcon },
  { title: "BYOD containerisation", desc: "Corporate/personal data separation.", Icon: ShieldIcon },
  { title: "Zero-touch enrolment", desc: "Across all major platforms.", Icon: ZapIcon },
  { title: "Compliance automation", desc: "Policy-driven remediation.", Icon: GearIcon },
  { title: "Partner MTD integration", desc: "Zimperium, Lookout and others.", Icon: MapPinIcon },
];

const trustSignals: { title: string; desc: string; Icon: React.FC<{ className?: string }> }[] = [
  { title: "Gartner-recognised UEM", desc: "AirWatch and Workspace ONE, a long-standing leader in unified endpoint management.", Icon: ShieldIcon },
  { title: "Broadest device coverage", desc: "Windows, macOS, mobile, rugged, server and specialty endpoints.", Icon: GlobeIcon },
  { title: "Independent since 2024", desc: "Spun out of VMware as Omnissa, with 20+ years of enterprise mobility heritage.", Icon: StarIcon },
];

const integrations: { title: string; body: string }[] = [
  { title: "Identity providers", body: "Entra ID, Okta and SAML IdPs for SSO and risk-aware conditional access." },
  { title: "Partner MTD", body: "Integrates Zimperium, Lookout and others for dedicated mobile threat defense." },
  { title: "Workspace ONE Intelligence", body: "Analytics and automation across the estate, with SIEM and ticketing connectors." },
  { title: "Apple, Google & Microsoft", body: "Entra, Apple Business Manager and Android Enterprise for enrolment and app delivery." },
  { title: "SIEM & SOAR", body: "Streams device and security telemetry into your SIEM and SOAR workflow." },
  { title: "REST APIs", body: "Comprehensive APIs for custom automation across a complex, multi-OS estate." },
];

const compliance: { code: string; desc: string }[] = [
  { code: "NESA", desc: "UAE national cyber standards" },
  { code: "UAE PDPL", desc: "Personal data protection law" },
  { code: "ADHICS", desc: "Abu Dhabi healthcare infosec" },
  { code: "CBUAE", desc: "Central Bank of the UAE" },
  { code: "SAMA", desc: "Saudi financial cyber framework" },
  { code: "ISO 27001", desc: "Information security management" },
];

/* ───────── LICENSE COMPARISON (3 EDITIONS) ───────── */

type LicCell = { value: string; type: "yes" | "no" | "qual" };
type LicRow = { feature: string; cells: LicCell[] };

const editions = [
  { name: "Standard", subtitle: "core UEM" },
  { name: "Advanced", subtitle: "managed UEM" },
  { name: "Enterprise", subtitle: "full workspace" },
];

const Y = (v = "✓"): LicCell => ({ value: v, type: "yes" });
const N: LicCell = { value: "✗", type: "no" };
const Q = (v: string): LicCell => ({ value: v, type: "qual" });

const licRows: LicRow[] = [
  { feature: "Primary positioning", cells: [Q("Core UEM"), Q("Managed UEM"), Q("Full digital workspace")] },
  { feature: "Mobile and desktop UEM/MDM (all major OS)", cells: [Y(), Y(), Y()] },
  { feature: "App catalog and lifecycle management", cells: [Y(), Y(), Y()] },
  { feature: "Compliance policies and conditional access", cells: [Y(), Y(), Y()] },
  { feature: "BYOD containerisation", cells: [Y(), Y(), Y()] },
  { feature: "Workspace ONE Assist (remote support)", cells: [N, Y(), Y()] },
  { feature: "Per-app VPN / Tunnel", cells: [N, Y(), Y()] },
  { feature: "Advanced automation and workflows", cells: [N, Y(), Y()] },
  { feature: "Rugged and specialty device support", cells: [Q("Basic"), Y(), Y()] },
  { feature: "Workspace ONE Access (identity / SSO)", cells: [N, N, Y()] },
  { feature: "Workspace ONE Intelligence (analytics + automation)", cells: [N, N, Y()] },
  { feature: "Digital Employee Experience (DEX)", cells: [N, N, Y()] },
  { feature: "Threat defense (MTD)", cells: [Q("via partner"), Q("via partner"), Q("via partner")] },
  { feature: "Licensing basis", cells: [Q("Per device / user"), Q("Per device / user"), Q("Per device / user")] },
];

/* ───────── EDITION POSITIONING ───────── */

type EditionTier = {
  name: string;
  position: string;
  bestFor: string[];
  additions?: string[];
  verdict: string;
  highlighted?: boolean;
};

const editionTiers: EditionTier[] = [
  {
    name: "Standard",
    position: "Core UEM",
    bestFor: ["Organisations starting with UEM", "Core device and app management", "Multi-OS fleets"],
    additions: ["UEM/MDM across all OS", "App catalog and compliance", "Conditional access"],
    verdict: "Core unified endpoint management.",
  },
  {
    name: "Advanced",
    position: "Managed UEM",
    bestFor: ["Teams needing remote support", "Secure app access (Tunnel)", "Automation and rugged devices"],
    additions: ["Workspace ONE Assist", "Per-app VPN / Tunnel", "Advanced automation"],
    verdict: "UEM with remote support and secure access.",
  },
  {
    name: "Enterprise",
    position: "Full digital workspace",
    bestFor: ["Large, complex enterprises", "Identity-led access (SSO)", "Analytics and experience management"],
    additions: ["Workspace ONE Access (SSO)", "Intelligence analytics and automation", "Digital Employee Experience"],
    verdict: "The complete digital workspace.",
    highlighted: true,
  },
];

const upgradePaths = [
  { from: "Standard → Advanced", title: "Core UEM → managed UEM", desc: "You gain remote support (Assist), secure per-app access (Tunnel), advanced automation and full rugged-device support." },
  { from: "Advanced → Enterprise", title: "UEM → full digital workspace", desc: "Workspace ONE Access adds identity and SSO, Intelligence adds analytics and automation, and DEX adds experience management, the complete platform." },
];

const deploymentOptions = [
  { icon: "cloud" as const, title: "Workspace ONE Cloud (SaaS)", body: "Omnissa-hosted multi-tenant SaaS, the standard for new deployments and the right answer for greenfield enterprise estates." },
  { icon: "server" as const, title: "Workspace ONE on-premises", body: "Self-hosted for organisations with strict data-residency mandates. We size and operate the platform on your infrastructure." },
  { icon: "layers" as const, title: "Workspace ONE + Zimperium/Lookout MTD", body: "Pair Workspace ONE for management with Zimperium or Lookout for mobile threat defense, with verdicts flowing into Workspace ONE compliance." },
];

const faqs = [
  {
    question: "Why does Workspace ONE win for large enterprises?",
    answer: "Because no other UEM matches its device-coverage breadth. Windows, macOS, iOS, Android, Linux, ChromeOS, rugged, server and specialty endpoints, all in one console, on a multi-tenant microservices architecture built to scale to tens of thousands of devices. The Intelligence engine then automates work across that whole estate.",
  },
  {
    question: "What changed when VMware became Omnissa?",
    answer: "In 2024 VMware's End-User Computing business spun out as Omnissa, an independent company. Workspace ONE remains its flagship UEM, with continued investment in cloud-native architecture, Intelligence (AI/automation) and Digital Employee Experience. The product roadmap and licensing model continue, and Artiflex maintains active delivery experience.",
  },
  {
    question: "When does the Enterprise edition make sense?",
    answer: "When you want identity-led access (Workspace ONE Access SSO), analytics and automation at scale (Intelligence), and Digital Employee Experience (DEX) measurement in one bundle. Large enterprises with complex multi-OS estates and identity-centric Zero Trust ambitions typically land here.",
  },
  {
    question: "Does Workspace ONE include Mobile Threat Defense?",
    answer: "Not natively. MTD is delivered via partner, typically Zimperium or Lookout, with threat verdicts flowing into Workspace ONE compliance and conditional access. Artiflex selects the right MTD pairing based on your privacy, vector and unmanaged-device requirements.",
  },
  {
    question: "How does Workspace ONE compare to Hexnode or Intune for the UAE?",
    answer: "Hexnode wins on mid-market TCO and on-premises flexibility under PDPL. Intune wins for Microsoft-standardised estates where it is often already licensed. Workspace ONE wins where breadth is non-negotiable: the largest, most diverse global estates with rugged, server and specialty endpoints alongside mobile and desktop.",
  },
  {
    question: "Can Artiflex co-manage Workspace ONE with our team?",
    answer: "Yes. We offer fully managed, co-managed and assessment-only engagements, with enrolment architecture, app lifecycle, automation, identity integration and reporting, all mapped to NESA, UAE PDPL and ISO 27001.",
  },
];

/* ───────── TONE MAPS ───────── */

const strengthToneMap: Record<string, { iconBox: string; tag: string }> = {
  emerald: { iconBox: "border-emerald-400/20 bg-emerald-500/10 text-emerald-300", tag: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300" },
  violet: { iconBox: "border-violet-400/20 bg-violet-500/10 text-violet-300", tag: "border-violet-400/30 bg-violet-500/10 text-violet-300" },
  amber: { iconBox: "border-amber-400/20 bg-amber-500/10 text-amber-300", tag: "border-amber-400/30 bg-amber-500/10 text-amber-300" },
  rose: { iconBox: "border-rose-400/20 bg-rose-500/10 text-rose-300", tag: "border-rose-400/30 bg-rose-500/10 text-rose-300" },
  sky: { iconBox: "border-sky-400/20 bg-sky-500/10 text-sky-300", tag: "border-sky-400/30 bg-sky-500/10 text-sky-300" },
  slate: { iconBox: "border-slate-400/20 bg-slate-500/10 text-slate-200", tag: "border-slate-400/30 bg-slate-500/10 text-slate-200" },
};

const statToneText: Record<string, string> = { emerald: "text-emerald-300", violet: "text-violet-300", sky: "text-sky-300" };

/* ───────── PAGE ───────── */

export default function MobileSecurityOmnissa() {
  const { open: openContact } = useContactModal();
  const [activeEdition, setActiveEdition] = useState(2);

  const pageUrl = "https://artiflexit.com/cybersecurity/mobile-security/omnissa-workspace-one";
  const pageTitle = "Omnissa Workspace ONE | Enterprise UEM & MDM UAE | Artiflex IT";
  const metaDescription = "Omnissa Workspace ONE (formerly VMware), enterprise UEM and MDM with the broadest device coverage. Deployed and managed by Artiflex IT for UAE enterprises.";

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={pageUrl} />
      <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: vendor.name, category: "Unified Endpoint Management", description: metaDescription, brand: { "@type": "Brand", name: "Omnissa" }, url: pageUrl })}</script>
      <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://artiflexit.com/" }, { "@type": "ListItem", position: 2, name: "Cybersecurity", item: "https://artiflexit.com/cybersecurity" }, { "@type": "ListItem", position: 3, name: "Mobile Security", item: "https://artiflexit.com/cybersecurity/mobile-security" }, { "@type": "ListItem", position: 4, name: vendor.name, item: pageUrl }] })}</script>
      <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) })}</script>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#04101E] to-[#0A3D6B]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(40,181,225,0.18),transparent_55%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(27,138,199,0.10),transparent_60%)]" />
        <div className="relative z-10 border-b border-white/5">
          <div className="shell flex w-full items-center gap-2 pt-24 pb-3 text-[11px] text-slate-400 sm:pt-28">
            <Link to="/" className="transition-colors hover:text-white">Home</Link><span className="text-slate-600">/</span>
            <Link to="/cybersecurity" className="transition-colors hover:text-white">Cybersecurity</Link><span className="text-slate-600">/</span>
            <Link to="/cybersecurity/mobile-security" className="transition-colors hover:text-white">Mobile Security</Link><span className="text-slate-600">/</span>
            <span className="font-medium text-[#28B5E1]">{vendor.name}</span>
          </div>
        </div>

        <div className="shell relative z-10 w-full py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="lg:col-span-7">
              <div className="flex items-center gap-3"><span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-transparent to-[#28B5E1]" /><span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-[#28B5E1]">{vendor.bestFor}</span></div>
              <p className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">{vendor.vendorCompany}</p>
              <h1 className="mt-3 font-display text-4xl font-bold leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]">Omnissa <span className="bg-gradient-to-r from-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">Workspace ONE</span></h1>
              <p className="mt-5 max-w-xl font-display text-xl leading-snug text-[#9CD6EE] sm:text-2xl">{vendor.tagline}</p>
              <div className="mt-6 max-w-2xl border-l-2 border-[#28B5E1]/30 pl-5"><p className="text-base leading-relaxed text-slate-300 sm:text-lg">{vendor.description}</p></div>

              <div className="mt-10 flex flex-col gap-5">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-2 sm:gap-x-3">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">Explore</span>
                  <Link to="/cybersecurity/mobile-security#vendor-matrix" className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:-translate-y-0.5 hover:border-[#28B5E1]/60 hover:bg-white/10 hover:text-white sm:text-[13px]">Vendor Comparison<svg className="h-3 w-3 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg></Link>
                  <a href="#license-matrix" className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:-translate-y-0.5 hover:border-[#28B5E1]/60 hover:bg-white/10 hover:text-white sm:text-[13px]">Compare Models<svg className="h-3 w-3 opacity-50 transition-all group-hover:translate-y-0.5 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7" /></svg></a>
                  <Link to="/cybersecurity/mobile-security#gartner-comparison" className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:-translate-y-0.5 hover:border-[#28B5E1]/60 hover:bg-white/10 hover:text-white sm:text-[13px]">Gartner-style Review<svg className="h-3 w-3 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg></Link>
                </div>
                <div>
                  <button type="button" onClick={openContact} className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#28B5E1] to-[#1B8AC7] px-8 py-3.5 text-sm font-semibold text-navy-deep shadow-[0_8px_30px_rgba(40,181,225,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(40,181,225,0.5)] sm:w-auto sm:text-base">Request for quote<svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg></button>
                </div>
              </div>
            </motion.div>

            <motion.aside initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }} className="relative lg:col-span-5">
              <div className="relative mx-auto flex aspect-[4/3] max-w-md items-center justify-center overflow-hidden rounded-3xl border border-white/15 bg-white p-10 shadow-[0_30px_80px_-20px_rgba(3,16,28,0.8)] ring-1 ring-[#28B5E1]/10 sm:p-14">
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/40 to-transparent" />
                <img src={vendor.logo} alt={`${vendor.name} logo`} loading="lazy" onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.style.display = "none"; const fb = t.nextElementSibling as HTMLElement | null; if (fb) fb.style.display = "flex"; }} className="relative z-10 max-h-32 w-full max-w-[80%] object-contain" />
                <div className="relative z-10 hidden h-full w-full flex-col items-center justify-center text-center" style={{ display: "none" }}><p className="font-display text-2xl font-bold tracking-tight text-slate-900">Omnissa</p><p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Workspace ONE</p></div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="relative bg-[#04101E] py-8 sm:py-10">
        <div className="shell">
          <div className="grid gap-6 sm:grid-cols-3 sm:gap-8">
            {trustSignals.map((t) => {
              const Icon = t.Icon;
              return (
                <div key={t.title} className="flex items-start gap-3.5">
                  <span aria-hidden="true" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.08] text-[#28B5E1]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-white sm:text-[15px]">{t.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-400 sm:text-[13px]">{t.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT IS WORKSPACE ONE */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-[#28B5E1]/30 via-[#9CD6EE]/20 to-transparent blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute top-32 right-[-10rem] h-[26rem] w-[26rem] rounded-full bg-gradient-to-tr from-violet-300/15 via-fuchsia-200/15 to-cyan-200/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/3 h-[26rem] w-[26rem] rounded-full bg-gradient-to-tr from-[#1B8AC7]/20 via-[#28B5E1]/15 to-transparent blur-3xl" />

        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#28B5E1]/20 bg-white/60 px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7] backdrop-blur-xl shadow-[0_2px_10px_rgba(15,23,42,0.04)]"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#28B5E1] shadow-[0_0_8px_rgba(40,181,225,0.8)]" />Overview</span>
            <h2 className="mt-6 font-display text-3xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-4xl md:text-5xl">What <span className="bg-gradient-to-r from-[#1B8AC7] via-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">Omnissa Workspace ONE</span> is</h2>
          </div>

          <div className="relative mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
            <div className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-7 shadow-[0_10px_40px_-10px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-10px_rgba(40,181,225,0.20)] sm:p-9 lg:col-span-2">
              <span aria-hidden="true" className="pointer-events-none absolute -top-16 -right-12 h-40 w-40 rounded-full bg-gradient-to-br from-[#28B5E1]/15 to-transparent blur-2xl" />
              <span aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-gradient-to-tr from-[#1B8AC7]/15 to-transparent blur-2xl" />
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/40 to-transparent" />
              <div className="relative space-y-5">{overviewParagraphs.map((p, i) => (<p key={i} className="text-[15px] leading-[1.75] text-slate-700 sm:text-base">{p}</p>))}</div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#0A3D6B] via-[#04101E] to-[#020617] p-7 shadow-[0_20px_60px_-15px_rgba(15,28,46,0.45)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-15px_rgba(40,181,225,0.45)] sm:p-9">
              <span aria-hidden="true" className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-[#28B5E1]/35 blur-3xl" />
              <span aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-violet-500/15 blur-3xl" />
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/80 to-transparent" />
              <div className="relative">
                <h3 className="font-display text-2xl font-bold leading-[1.1] text-white sm:text-3xl md:text-[2rem]">Widest <br /><span className="bg-gradient-to-r from-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">device coverage</span></h3>
                <p className="mt-5 text-sm leading-[1.7] text-white/80 sm:text-[15px]">Workspace ONE handles Windows, macOS, iOS, Android, Linux, ChromeOS, plus rugged, server and specialty endpoints, all in one console. The right answer when breadth is non-negotiable and scale measures in tens of thousands of devices.</p>
              </div>
            </div>
          </div>

          <ul className="relative mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-6 lg:grid-cols-4">
            {overviewCapabilities.map((item) => (
              <li key={item} className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-5 shadow-[0_6px_24px_-8px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-[#28B5E1]/40 hover:bg-white/80 hover:shadow-[0_14px_40px_-10px_rgba(40,181,225,0.25)]">
                <span aria-hidden="true" className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-tr from-[#28B5E1]/0 to-transparent blur-2xl transition-all duration-500 group-hover:from-[#28B5E1]/20" />
                <div className="relative flex items-start gap-3">
                  <span aria-hidden="true" className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#28B5E1] to-[#1B8AC7] text-white shadow-[0_4px_12px_-2px_rgba(40,181,225,0.5)]"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><path d="M4 10l4 4 8-8" /></svg></span>
                  <span className="text-[13.5px] font-medium leading-snug text-slate-800 sm:text-sm">{item}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHY WS1 WINS */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(27,138,199,0.06),transparent_55%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Why it wins</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">What makes Workspace ONE the enterprise default</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">The strengths that show up most often in UAE enterprise deployments where breadth and scale matter most.</p>
          </div>
          <div className="relative mx-auto max-w-4xl px-5 sm:px-6">
            <div className="mt-10 grid gap-4 sm:grid-cols-3">{whyWinsStats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, delay: 0.05 * i }} className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#1E4E73] via-[#143E62] to-[#042542] px-6 py-7 shadow-md"><p className={`font-display text-2xl font-bold leading-none sm:text-2xl ${statToneText[stat.tone]}`}>{stat.value}</p><p className="mt-3 text-sm leading-relaxed text-slate-200">{stat.label}</p></motion.div>
            ))}</div>
          </div>
          <div className="mt-12 grid items-start gap-1 lg:grid-cols-2">{strengths.map((s, i) => {
            const tone = strengthToneMap[s.tone];
            const Icon = s.Icon;
            const isOrphan = i === strengths.length - 1 && strengths.length % 2 === 1;
            return (
              <motion.div key={s.title} tabIndex={0} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: 0.05 * i }} className={`group rounded-xl border border-white/10 bg-gradient-to-br from-[#04101E] to-[#0A3D6B] p-4 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/40 hover:shadow-lg focus-within:border-[#28B5E1]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#28B5E1]/40 ${isOrphan ? "lg:col-span-2" : ""}`}>
                <div className="flex items-stretch gap-2.5"><span className={`flex w-11 shrink-0 items-center justify-center rounded-lg border ${tone.iconBox}`}><Icon className="h-5 w-5" /></span><div className="min-w-0">{s.tag && <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${tone.tag}`}>{s.tag}</span>}<h3 className="mt-1.5 font-display text-sm font-semibold text-white sm:text-base">{s.title}</h3></div></div>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]"><div className="overflow-hidden"><p className="mt-2.5 text-xs leading-relaxed text-slate-300 sm:text-sm">{s.desc}</p></div></div>
              </motion.div>
            );
          })}</div>
        </div>
      </section>

      {/* BEST FIT PROFILE */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#04101E] to-[#020617] py-12 sm:py-16">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.10),transparent_60%)]" />
        <div className="shell relative">
          <div className="border-b border-white/10 pb-5"><h2 className="font-display text-xl font-bold leading-tight text-white sm:text-2xl lg:text-[1.7rem]">Who should put <span className="bg-gradient-to-r from-[#28B5E1] to-[#7ad4f0] bg-clip-text text-transparent">Workspace ONE</span> on the shortlist</h2></div>
          <ul className="mt-6 grid gap-2 sm:mt-8 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-2.5">{bestFitProfile.map((p) => (
            <li key={p} className="group relative flex items-start gap-3 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/30 hover:bg-white/[0.05]"><span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#28B5E1]/15 text-[#28B5E1] ring-1 ring-inset ring-[#28B5E1]/25 transition-colors group-hover:bg-[#28B5E1] group-hover:text-white group-hover:ring-[#28B5E1]"><CheckIcon className="h-3 w-3" /></span><p className="text-[13px] leading-relaxed text-slate-200 sm:text-[13.5px]">{p}</p></li>
          ))}</ul>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Core features</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">What's inside Workspace ONE</h2></div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.08)]">
            <div className="grid sm:grid-cols-2">
              {coreFeatures.map((f, i) => {
                const Icon = f.Icon;
                const lastRowStart = coreFeatures.length - (coreFeatures.length % 2 === 0 ? 2 : 1);
                const isLastRow = i >= lastRowStart;
                return (
                  <div
                    key={f.title}
                    className={`border-slate-200 p-6 transition-colors hover:bg-[#28B5E1]/[0.03] sm:p-7 ${i % 2 === 0 ? "sm:border-r" : ""} ${isLastRow ? "" : "border-b"}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span aria-hidden="true" className="text-[#1B8AC7]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="font-display text-base font-bold text-slate-900">{f.title}</h3>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* EDITION POSITIONING */}
      <section id="editions" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Choosing an edition</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Simplified positioning, which edition fits</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">Each edition moves you further from device management toward a complete digital-workspace platform.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{editionTiers.map((t, idx) => {
            const active = activeEdition === idx;
            return (
              <button key={t.name} type="button" onClick={() => setActiveEdition(idx)} aria-pressed={active} className={`group relative overflow-hidden rounded-2xl border bg-white p-5 text-left transition-all duration-300 hover:-translate-y-0.5 ${t.highlighted ? "border-amber-300 ring-1 ring-amber-200 shadow-[0_12px_36px_-12px_rgba(246,183,60,0.30)]" : "border-slate-200 shadow-sm hover:border-[#28B5E1]/40"} ${active ? "scale-[1.02] ring-2 ring-[#28B5E1]/40" : ""}`}>
                {t.highlighted && (<span className="absolute -top-px left-5 inline-flex rounded-b-md bg-amber-400 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-amber-950">Recommended</span>)}
                <p className="mt-3 font-display text-lg font-bold text-slate-900">{t.name}</p>
                <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#1B8AC7]">{t.position}</p>
                <p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Best for</p>
                <ul className="mt-1 space-y-1">{t.bestFor.map((b) => (<li key={b} className="flex gap-1.5 text-[12.5px] leading-snug text-slate-700"><span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#28B5E1]" />{b}</li>))}</ul>
                {t.additions && (<><p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{t.name === "Standard" ? "Key capabilities" : "Main additions"}</p><ul className="mt-1 space-y-1">{t.additions.map((a) => (<li key={a} className="flex gap-1.5 text-[12.5px] leading-snug text-slate-700"><span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#28B5E1]" />{a}</li>))}</ul></>)}
                <p className="mt-4 border-t border-slate-200 pt-3 font-display text-[13px] font-bold italic text-slate-900">"{t.verdict}"</p>
              </button>
            );
          })}</div>
        </div>
      </section>

      {/* STRATEGIC UPGRADE PATH */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">The strategic view</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">The important difference between editions</h2><p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">Each step changes what the platform fundamentally is, from managing endpoints to running the whole digital workspace.</p></div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="grid grid-cols-1 gap-4 bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-5 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE] sm:grid-cols-[1fr_2fr] sm:px-7 sm:text-[11px]"><span>Upgrade path</span><span>What fundamentally changes</span></div>
            {upgradePaths.map((u) => (<div key={u.from} className="grid grid-cols-1 gap-4 border-t border-[#0A3D6B]/20 px-5 py-4 transition-colors hover:bg-[#28B5E1]/[0.04] sm:grid-cols-[1fr_2fr] sm:px-7"><span className="font-display text-sm font-bold text-slate-900 sm:text-base">{u.from}</span><span className="text-sm leading-relaxed text-slate-700 sm:text-[15px]"><span className="font-semibold text-[#1B8AC7]">{u.title}.</span> {u.desc}</span></div>))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-sm leading-relaxed text-slate-600">Artiflex maps your estate size, OS mix and identity strategy to the right edition during the assessment, and pairs Workspace ONE with Zimperium or Lookout for the mobile threat defense it does not provide natively.</p>
        </div>
      </section>

      {/* FULL LICENSE MATRIX */}
      <section id="license-matrix" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Licensing</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Workspace ONE edition comparison</h2><p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">Workspace ONE is licensed by use-case edition: Standard, Advanced and Enterprise (plus an Advanced for VDI edition). Each step adds capability, culminating in the full digital-workspace platform.</p></div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + editions.length * 116) }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-4 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">Feature / Capability</th>
                    {editions.map((e, i) => (<th key={e.name} className={`border-l border-white/15 px-2 py-3 sm:px-4 sm:py-4 text-center align-bottom font-display text-sm font-semibold text-white ${i === editions.length - 1 ? "bg-gradient-to-br from-amber-500/80 to-amber-600/80 text-amber-50" : ""}`}>{i === editions.length - 1 && <span aria-hidden>★ </span>}{e.name}<span className="mt-1 block font-mono text-[10px] font-normal uppercase tracking-wider text-[#9CD6EE]">{e.subtitle}</span></th>))}
                  </tr>
                </thead>
                <tbody>
                  {licRows.map((row, rIdx) => (
                    <tr key={row.feature} className={`border-t border-[#0A3D6B]/15 transition-colors hover:bg-[#28B5E1]/[0.04] ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`}>
                      <th scope="row" className={`sticky left-0 z-10 px-4 py-3 align-middle font-display text-[13px] font-semibold text-slate-900 ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>{row.feature}</th>
                      {row.cells.map((c, cIdx) => { const isHl = cIdx === row.cells.length - 1; const color = c.type === "yes" ? "text-emerald-600 font-bold" : c.type === "no" ? "text-slate-300" : "text-[#1B8AC7] font-semibold"; return (<td key={cIdx} className={`border-l border-[#0A3D6B]/15 px-3 py-3 text-center align-middle text-[12.5px] ${color} ${isHl ? "bg-amber-50/40" : ""}`}>{c.value}</td>); })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-xs leading-relaxed text-slate-500 sm:text-sm">Edition feature mapping reflects Omnissa's published Workspace ONE editions and may evolve. An Advanced for VDI edition is also available. Workspace ONE does not include native MTD, threat defense is delivered via a partner such as Zimperium or Lookout. Artiflex confirms exact entitlements during scoping.</p>
        </div>
      </section>

      {/* DEPLOYMENT OPTIONS */}
      <section className="relative bg-white py-12 sm:py-16">
        <div className="shell">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6"><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">Deployment Options</p><h2 className="font-display text-xl font-semibold leading-tight text-slate-900 sm:text-2xl">How we deliver Workspace ONE <span className="font-normal text-slate-500">across UAE customers</span></h2></div>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">{deploymentOptions.map((opt) => { const Icon = opt.icon === "server" ? ServerIcon : opt.icon === "layers" ? LayersIcon : CloudIcon; return (
            <div key={opt.title} className="rounded-xl border border-slate-200 bg-white p-5 transition-colors duration-300 hover:border-slate-300"><div className="flex items-center gap-2.5"><span aria-hidden className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500"><Icon className="h-4 w-4" /></span><h3 className="font-display text-sm font-semibold text-slate-900 sm:text-[15px]">{opt.title}</h3></div><p className="mt-3 text-[13px] leading-[1.6] text-slate-500 sm:text-sm">{opt.body}</p></div>
          ); })}</div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Integrations</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              How Workspace ONE fits your existing stack
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Workspace ONE is built for complex estates and integrates broadly across identity, security and the SOC.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {integrations.map((it) => (
              <div key={it.title} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/40 hover:bg-white hover:shadow-[0_14px_40px_-16px_rgba(40,181,225,0.3)]">
                <h3 className="font-display text-base font-bold text-[#0A3D6B]">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{it.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UAE & REGIONAL COMPLIANCE */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">UAE & regional compliance</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Mapped to the frameworks your auditors check
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Artiflex designs and documents every Workspace ONE deployment against the obligations that apply to your sector.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {compliance.map((c) => (
              <div key={c.code} className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-[0_6px_24px_-14px_rgba(15,23,42,0.15)]">
                <p className="font-display text-base font-bold text-[#1B8AC7]">{c.code}</p>
                <p className="mt-1 text-[11.5px] font-medium leading-snug text-slate-500">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY ARTIFLEX */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0A3D6B] via-[#04101E] to-[#020617] p-8 shadow-xl shadow-[#1B8AC7]/10 sm:p-12">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#28B5E1]">Why Artiflex IT</p>
            <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">Deploying Workspace ONE across the UAE</h2>
            <p className="mt-6 text-base leading-relaxed text-slate-200 sm:text-lg">For the largest and most diverse estates, Workspace ONE's breadth is hard to beat, and Artiflex deploys it end to end (enrolment architecture, app lifecycle, automation and reporting). Because threat defense is delivered through partners, we pair it with Zimperium or Lookout for complete UEM + MTD coverage, all mapped to NESA, UAE PDPL and ISO 27001.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#28B5E1] px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:bg-white sm:text-base">Talk to our Consultant</Link>
              <Link to="/cybersecurity/mobile-security" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-[#28B5E1]/50 hover:bg-white/10 sm:text-base">Back to Mobile Security</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Frequently asked</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Workspace ONE questions we hear from UAE buyers</h2></div>
          <div className="mt-10"><FAQAccordion items={faqs} /></div>
        </div>
      </section>

      <CTASection
        title="Manage your enterprise estate with Workspace ONE"
        description="Book a free mobile posture assessment and we will review your device estate, recommend the right UEM + MTD pairing and share a three-year TCO comparison."
        primaryButton={{ text: "Book a free assessment", action: "modal" }}
        secondaryButton={{ text: "Compare mobile vendors", href: "/cybersecurity/mobile-security#vendor-matrix" }}
      />
    </>
  );
}
