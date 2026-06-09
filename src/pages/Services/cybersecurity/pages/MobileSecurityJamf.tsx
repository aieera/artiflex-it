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
  MonitorIcon,
  LockIcon,
  UsersIcon,
  BarChartIcon,
  CloudIcon,
  ServerIcon,
  GridIcon,
  PhoneIcon,
  GearIcon,
  MapPinIcon,
  StarIcon,
  GlobeIcon,
} from "@/components/icons";

/* ───────── DATA ───────── */

const vendor = {
  name: "Jamf",
  vendorCompany: "Jamf · Apple specialist",
  bestFor: "Apple UEM, MDM and MTD · Day-one Apple OS support",
  tagline: "The standard for Apple management and security",
  description:
    "Jamf is the specialist that does one thing exceptionally: manage and secure Apple. Jamf Pro delivers UEM and MDM with same-day support for every new Apple OS feature, while Jamf Protect adds mobile threat defense and endpoint security for iOS and macOS. For Apple-heavy enterprises and education, it is the default choice.",
  logo: "/logos/Jamf.png",
};

const overviewParagraphs = [
  "Jamf is the reference platform for managing and securing Apple devices at scale, iPhone, iPad and Mac. Founded in 2002 in Minneapolis, it built its entire business around Apple, so it typically supports new OS capabilities on day one, something general-purpose UEMs cannot match. Jamf Pro provides UEM and MDM with zero-touch deployment via Apple Business Manager, configuration, app delivery and inventory.",
  "Jamf Protect adds Apple-purpose-built mobile threat defense and endpoint security, and Jamf Connect handles identity and provisioning, so together they form a complete, Apple-native stack covering UEM, MDM and MTD. That breadth is unique on this page, but always within the Apple ecosystem: Jamf is not a fit for mixed Windows/Android fleets, where a cross-platform UEM such as Hexnode or Intune is required.",
];

const overviewCapabilities = [
  "Day-one support for new Apple OS features",
  "Jamf Pro: Apple UEM and MDM",
  "Jamf Protect: MTD and endpoint security",
  "Jamf Connect: identity and SSO",
  "Zero-touch enrolment via Apple Business Manager",
  "Self Service branded app catalog",
  "Education tools (Jamf School, Classroom)",
  "Apple-native, all three capabilities in one stack",
];

const strengths: {
  title: string;
  desc: string;
  tag?: string;
  tone: "emerald" | "violet" | "amber" | "sky" | "rose" | "slate";
  Icon: React.FC<{ className?: string }>;
}[] = [
  {
    title: "Apple done right",
    tag: "Day-one OS support",
    desc: "Built solely for Apple, with same-day support for new iOS, iPadOS and macOS features. No waiting on a general-purpose UEM to catch up to Apple's release cadence.",
    tone: "emerald",
    Icon: MonitorIcon,
  },
  {
    title: "Zero-touch deployment",
    tag: "ABM-native",
    desc: "Devices ship straight to users from Apple Business Manager and configure themselves. Genuinely no-touch provisioning, ideal for distributed UAE workforces, education and retail.",
    tone: "sky",
    Icon: ZapIcon,
  },
  {
    title: "Integrated threat defense",
    tag: "Jamf Protect",
    desc: "MTD and endpoint security purpose-built for Apple, in the same stack as management. No third-party agent for the Apple-only estate, lower complexity and tighter integration.",
    tone: "violet",
    Icon: ShieldIcon,
  },
  {
    title: "Self-service for users",
    tag: "Branded catalog",
    desc: "A branded Self Service app store reduces helpdesk load and empowers staff to install approved apps, run scripts and resolve common issues on their own.",
    tone: "amber",
    Icon: UsersIcon,
  },
  {
    title: "Identity integration",
    tag: "Jamf Connect",
    desc: "Account provisioning, password sync and SSO that ties Mac and iOS logins to your identity provider (Entra, Okta, Google). The Apple Zero Trust foundation.",
    tone: "rose",
    Icon: LockIcon,
  },
  {
    title: "Education-ready",
    tag: "Schools and universities",
    desc: "Deep support for shared iPad, classroom and student-device workflows. The reference UEM for any Apple education programme, from K-12 to higher education.",
    tone: "slate",
    Icon: BarChartIcon,
  },
];

const whyWinsStats: { value: string; label: string; tone: "emerald" | "violet" | "sky" }[] = [
  { value: "Day-one", label: "Same-day support for every new iOS, iPadOS and macOS release", tone: "emerald" },
  { value: "3 products", label: "Jamf Pro (UEM), Jamf Protect (MTD) and Jamf Connect (identity)", tone: "sky" },
  { value: "Apple-only", label: "Specialist platform built solely for Apple, not a cross-platform compromise", tone: "violet" },
];

const bestFitProfile = [
  "Apple-first enterprises standardised on Mac and iPhone wanting best-in-class Apple management",
  "Education sector: schools and universities running shared and 1:1 iPad and Mac programmes",
  "Creative and design teams: Mac-heavy departments needing reliable, Apple-native deployment and security",
  "Apple device security: teams wanting integrated MTD for Apple via Jamf Protect, no third party required",
  "Apple Business Manager and Automated Device Enrolment programmes at scale",
  "Identity-led Apple shops: Entra or Okta tied to Mac and iOS login through Jamf Connect",
  "Organisations refusing to compromise Apple feature parity for cross-platform breadth",
  "Mixed fleets: Apple via Jamf, other OSes via a cross-platform UEM (Hexnode or Intune), Artiflex integrates both",
];

const coreFeatures: { title: string; desc: string; Icon: React.FC<{ className?: string }> }[] = [
  { title: "Jamf Pro", desc: "Apple UEM/MDM with day-one OS support.", Icon: PhoneIcon },
  { title: "Jamf Protect", desc: "MTD and endpoint security for iOS and macOS.", Icon: ShieldIcon },
  { title: "Jamf Connect", desc: "Identity, provisioning and password sync.", Icon: LockIcon },
  { title: "Zero-touch enrolment", desc: "Automated via Apple Business Manager.", Icon: ZapIcon },
  { title: "Self Service app catalog", desc: "Branded, user-driven app delivery.", Icon: GridIcon },
  { title: "Configuration profiles", desc: "Granular Apple settings and restrictions.", Icon: GearIcon },
  { title: "Patch management", desc: "Automated app and OS updates.", Icon: MonitorIcon },
  { title: "Compliance and conditional access", desc: "Device-state gating.", Icon: ShieldIcon },
  { title: "Inventory and reporting", desc: "Detailed Apple fleet visibility.", Icon: BarChartIcon },
  { title: "Classroom and education tools", desc: "Shared-device and student workflows.", Icon: MapPinIcon },
];

const trustSignals: { title: string; desc: string; Icon: React.FC<{ className?: string }> }[] = [
  { title: "Apple management leader", desc: "The reference platform for iPhone, iPad and Mac at scale.", Icon: ShieldIcon },
  { title: "Day-one Apple OS support", desc: "New Apple OS features supported on release day.", Icon: StarIcon },
  { title: "Founded 2002", desc: "Two decades of Apple-only specialisation.", Icon: GlobeIcon },
];

const integrations: { title: string; body: string }[] = [
  { title: "Apple Business Manager", body: "Automated device enrolment, VPP app licensing and managed Apple IDs." },
  { title: "Identity providers", body: "Entra ID and Okta for SSO, Jamf Connect account provisioning and conditional access." },
  { title: "Jamf Protect", body: "Apple-purpose-built endpoint security and mobile threat defense integrated with Jamf Pro." },
  { title: "Microsoft & conditional access", body: "Device compliance feeds Entra Conditional Access for Microsoft 365 estates." },
  { title: "SIEM & reporting", body: "Streams inventory and security events to your SIEM and reporting stack." },
  { title: "Jamf Marketplace & API", body: "Hundreds of prebuilt integrations plus a full REST API for automation." },
];

const compliance: { code: string; desc: string }[] = [
  { code: "NESA", desc: "UAE national cyber standards" },
  { code: "UAE PDPL", desc: "Personal data protection law" },
  { code: "ADHICS", desc: "Abu Dhabi healthcare infosec" },
  { code: "CBUAE", desc: "Central Bank of the UAE" },
  { code: "SAMA", desc: "Saudi financial cyber framework" },
  { code: "ISO 27001", desc: "Information security management" },
];

/* ───────── LICENSE COMPARISON (4 PLANS) ───────── */

type LicCell = { value: string; type: "yes" | "no" | "qual" };
type LicRow = { feature: string; cells: LicCell[] };

const editions = [
  { name: "Jamf Now", subtitle: "SMB" },
  { name: "Jamf Pro", subtitle: "management" },
  { name: "Business Plan", subtitle: "full stack" },
  { name: "Enterprise Plan", subtitle: "at scale" },
];

const Y = (v = "✓"): LicCell => ({ value: v, type: "yes" });
const N: LicCell = { value: "✗", type: "no" };
const Q = (v: string): LicCell => ({ value: v, type: "qual" });

const licRows: LicRow[] = [
  { feature: "Primary positioning", cells: [Q("Entry-level SMB"), Q("Full Apple management"), Q("Manage + secure + identity"), Q("Enterprise scale")] },
  { feature: "Products included", cells: [Q("Basic management"), Q("Jamf Pro"), Q("Pro + Protect + Connect"), Q("Pro + Protect + Connect")] },
  { feature: "Apple device management (iOS, macOS, tvOS)", cells: [Y(), Y(), Y(), Y()] },
  { feature: "Free for up to 3 devices", cells: [Y(), N, N, N] },
  { feature: "Zero-touch deployment (ABM)", cells: [Q("Basic"), Y(), Y(), Y()] },
  { feature: "Configuration profiles and policies", cells: [Q("Basic"), Y(), Y(), Y()] },
  { feature: "Self Service app catalog", cells: [N, Y(), Y(), Y()] },
  { feature: "App lifecycle and patch management", cells: [Q("Basic"), Y(), Y(), Y()] },
  { feature: "Endpoint security and MTD (Jamf Protect)", cells: [Q("Basic malware"), Q("Add-on"), Y(), Y()] },
  { feature: "Identity and SSO (Jamf Connect)", cells: [Q("Basic"), Q("Add-on"), Y(), Y()] },
  { feature: "Conditional access / compliance", cells: [N, Y(), Y(), Y()] },
  { feature: "Advanced inventory and reporting", cells: [Q("Basic"), Y(), Y(), Y()] },
  { feature: "Education tools (Jamf School / Classroom)", cells: [N, Y(), Y(), Y()] },
  { feature: "Premium support and scale", cells: [Q("Standard"), Q("Standard"), Q("Enhanced"), Q("Premium / custom")] },
  { feature: "Minimum commitment", cells: [Q("None (3 free)"), Q("25-user min"), Q("Volume"), Q("Custom")] },
  { feature: "Indicative price (per device/mo)", cells: [Q("~$4"), Q("~$13.65"), Q("~$12.50 (bundle)"), Q("Custom")] },
];

/* ───────── PLAN POSITIONING ───────── */

type PlanTier = {
  name: string;
  position: string;
  bestFor: string[];
  additions?: string[];
  verdict: string;
  highlighted?: boolean;
};

const planTiers: PlanTier[] = [
  {
    name: "Jamf Now",
    position: "Apple management, simplified",
    bestFor: ["Very small businesses", "Basic Apple management", "Up to 3 devices free"],
    verdict: "Apple management, simplified.",
  },
  {
    name: "Jamf Pro",
    position: "The management standard",
    bestFor: ["IT teams needing full control", "Automated deployment at scale", "Education and enterprise fleets"],
    additions: ["Zero-touch deployment", "Self Service catalog", "Patch and compliance"],
    verdict: "The Apple management standard.",
  },
  {
    name: "Business Plan",
    position: "The complete Apple stack",
    bestFor: ["Manage + secure + identity in one", "Security-conscious Apple shops"],
    additions: ["Jamf Protect (MTD)", "Jamf Connect (SSO)", "Bundle savings"],
    verdict: "The complete Apple stack.",
    highlighted: true,
  },
  {
    name: "Enterprise Plan",
    position: "Apple at enterprise scale",
    bestFor: ["Large enterprises", "Advanced deployment and SLAs", "Premium support needs"],
    additions: ["Enterprise scale and support", "Custom terms"],
    verdict: "Apple at enterprise scale.",
  },
];

const upgradePaths = [
  { from: "Jamf Now → Jamf Pro", title: "Basic → full management", desc: "You move from simple device setup to complete management and automation, zero-touch deployment, Self Service, patch and compliance." },
  { from: "Jamf Pro → Business Plan", title: "Management → management + security + identity", desc: "Jamf Protect (MTD) and Jamf Connect (SSO) join Pro in one bundle, turning device management into a complete secured Apple stack." },
  { from: "Business → Enterprise Plan", title: "Full stack → enterprise scale", desc: "The same capabilities with enterprise-grade scale, premium support and advanced deployment for the largest Apple estates." },
];

const buildingBlocks = [
  { name: "Jamf Pro", desc: "Apple UEM and MDM, deployment, configuration, app delivery, inventory and management." },
  { name: "Jamf Protect", desc: "Endpoint security and mobile threat defense (MTD) for macOS and iOS." },
  { name: "Jamf Connect", desc: "Identity, account provisioning, password sync and single sign-on." },
];

const deploymentOptions = [
  { icon: "cloud" as const, title: "Jamf Cloud (default)", body: "Jamf-hosted SaaS, the standard deployment for most UAE Apple estates. Evergreen feature releases and managed infrastructure." },
  { icon: "server" as const, title: "Jamf Pro on-premises", body: "Self-hosted Jamf Pro for organisations with strict data-residency or security mandates. We size and operate the platform on your infrastructure." },
  { icon: "layers" as const, title: "Mixed-fleet pairing", body: "Jamf for the Apple estate paired with Hexnode or Microsoft Intune for Windows and Android. Artiflex integrates the two consoles into one operational view." },
];

const faqs = [
  {
    question: "Why does Jamf win for Apple-only estates?",
    answer: "Because Jamf is the Apple specialist. It supports every new iOS, iPadOS and macOS feature on the day Apple releases it, has the broadest Apple-specific feature set (kiosk, classroom, FileVault, smart groups) and ships Jamf Protect for MTD and Jamf Connect for identity. General-purpose UEMs cannot match the depth, but they win where Windows or Android are also in scope.",
  },
  {
    question: "What is the difference between Jamf Now and Jamf Pro?",
    answer: "Jamf Now is a stripped-down, browser-only service aimed at SMB use (up to 3 devices free, simple configuration). Jamf Pro is the full management platform with zero-touch deployment, Self Service, automation, patch and compliance, the standard for any IT-managed Apple estate.",
  },
  {
    question: "When does the Business Plan make sense?",
    answer: "When you need management plus security plus identity in one bundle. Business bundles Jamf Pro + Jamf Protect + Jamf Connect, typically 15 to 40 percent cheaper than buying the three products individually. Right for security-conscious Apple-only shops.",
  },
  {
    question: "Can Jamf manage Windows or Android too?",
    answer: "No. Jamf is intentionally Apple-only. For mixed estates, Artiflex pairs Jamf for Apple with a cross-platform UEM (Hexnode or Microsoft Intune) for Windows and Android, with both consoles integrated into one operational view.",
  },
  {
    question: "Does Artiflex deploy and manage Jamf in the UAE?",
    answer: "Yes. We deploy the full stack (Jamf Pro, Jamf Protect, Jamf Connect) end to end, enrolment design, app packaging, security policy and ongoing management, mapped to NESA, UAE PDPL and ISO 27001. Fully managed, co-managed or assessment-only.",
  },
  {
    question: "How does Jamf Protect compare to Zimperium for Apple?",
    answer: "Jamf Protect is tightly integrated into the Jamf ecosystem and best suited to Apple-only fleets that want a single vendor for management and security. Zimperium covers iOS, Android, ChromeOS and is the better choice when mobile threat defense must span beyond Apple or work with non-Jamf UEMs.",
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

const statToneText: Record<string, string> = {
  emerald: "text-emerald-300",
  violet: "text-violet-300",
  sky: "text-sky-300",
};

/* ───────── PAGE ───────── */

export default function MobileSecurityJamf() {
  const { open: openContact } = useContactModal();
  const [activePlan, setActivePlan] = useState(2);

  const pageUrl = "https://artiflexit.com/cybersecurity/mobile-security/jamf";
  const pageTitle = "Jamf | Apple UEM, MDM & MTD UAE | Artiflex IT";
  const metaDescription = "Jamf, the Apple specialist. UEM, MDM and MTD for iOS and macOS via Jamf Pro and Jamf Protect. Deployed and managed by Artiflex IT for UAE enterprises.";

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={pageUrl} />
      <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: vendor.name, category: "Apple UEM / MDM / MTD", description: metaDescription, brand: { "@type": "Brand", name: "Jamf" }, url: pageUrl })}</script>
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
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-transparent to-[#28B5E1]" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-[#28B5E1]">{vendor.bestFor}</span>
              </div>
              <p className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">{vendor.vendorCompany}</p>
              <h1 className="mt-3 font-display text-4xl font-bold leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]">
                <span className="bg-gradient-to-r from-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">Jamf</span>
              </h1>
              <p className="mt-5 max-w-xl font-display text-xl leading-snug text-[#9CD6EE] sm:text-2xl">{vendor.tagline}</p>
              <div className="mt-6 max-w-2xl border-l-2 border-[#28B5E1]/30 pl-5">
                <p className="text-base leading-relaxed text-slate-300 sm:text-lg">{vendor.description}</p>
              </div>

              <div className="mt-10 flex flex-col gap-5">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-2 sm:gap-x-3">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">Explore</span>
                  <Link to="/cybersecurity/mobile-security#vendor-matrix" className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:-translate-y-0.5 hover:border-[#28B5E1]/60 hover:bg-white/10 hover:text-white sm:text-[13px]">Vendor Comparison
                    <svg className="h-3 w-3 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                  </Link>
                  <a href="#license-matrix" className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:-translate-y-0.5 hover:border-[#28B5E1]/60 hover:bg-white/10 hover:text-white sm:text-[13px]">Compare Models
                    <svg className="h-3 w-3 opacity-50 transition-all group-hover:translate-y-0.5 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                  </a>
                  <Link to="/cybersecurity/mobile-security#gartner-comparison" className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:-translate-y-0.5 hover:border-[#28B5E1]/60 hover:bg-white/10 hover:text-white sm:text-[13px]">Gartner-style Review
                    <svg className="h-3 w-3 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                  </Link>
                </div>
                <div>
                  <button type="button" onClick={openContact} className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#28B5E1] to-[#1B8AC7] px-8 py-3.5 text-sm font-semibold text-navy-deep shadow-[0_8px_30px_rgba(40,181,225,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(40,181,225,0.5)] sm:w-auto sm:text-base">Request for quote
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.aside initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }} className="relative lg:col-span-5">
              <div className="relative mx-auto flex aspect-[4/3] max-w-md items-center justify-center overflow-hidden rounded-3xl border border-white/15 bg-white p-10 shadow-[0_30px_80px_-20px_rgba(3,16,28,0.8)] ring-1 ring-[#28B5E1]/10 sm:p-14">
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/40 to-transparent" />
                <img src={vendor.logo} alt={`${vendor.name} logo`} loading="lazy" onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.style.display = "none"; const fb = t.nextElementSibling as HTMLElement | null; if (fb) fb.style.display = "flex"; }} className="relative z-10 max-h-32 w-full max-w-[80%] object-contain" />
                <div className="relative z-10 hidden h-full w-full flex-col items-center justify-center text-center" style={{ display: "none" }}>
                  <p className="font-display text-3xl font-bold tracking-tight text-slate-900">Jamf</p>
                  <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Apple specialist</p>
                </div>
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

      {/* WHAT IS JAMF */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-[#28B5E1]/30 via-[#9CD6EE]/20 to-transparent blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute top-32 right-[-10rem] h-[26rem] w-[26rem] rounded-full bg-gradient-to-tr from-violet-300/15 via-fuchsia-200/15 to-cyan-200/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/3 h-[26rem] w-[26rem] rounded-full bg-gradient-to-tr from-[#1B8AC7]/20 via-[#28B5E1]/15 to-transparent blur-3xl" />

        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#28B5E1]/20 bg-white/60 px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7] backdrop-blur-xl shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#28B5E1] shadow-[0_0_8px_rgba(40,181,225,0.8)]" />Overview
            </span>
            <h2 className="mt-6 font-display text-3xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              What <span className="bg-gradient-to-r from-[#1B8AC7] via-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">Jamf</span> is
            </h2>
          </div>

          <div className="relative mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
            <div className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-7 shadow-[0_10px_40px_-10px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-10px_rgba(40,181,225,0.20)] sm:p-9 lg:col-span-2">
              <span aria-hidden="true" className="pointer-events-none absolute -top-16 -right-12 h-40 w-40 rounded-full bg-gradient-to-br from-[#28B5E1]/15 to-transparent blur-2xl" />
              <span aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-gradient-to-tr from-[#1B8AC7]/15 to-transparent blur-2xl" />
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/40 to-transparent" />
              <div className="relative space-y-5">
                {overviewParagraphs.map((p, i) => (<p key={i} className="text-[15px] leading-[1.75] text-slate-700 sm:text-base">{p}</p>))}
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#0A3D6B] via-[#04101E] to-[#020617] p-7 shadow-[0_20px_60px_-15px_rgba(15,28,46,0.45)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-15px_rgba(40,181,225,0.45)] sm:p-9">
              <span aria-hidden="true" className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-[#28B5E1]/35 blur-3xl" />
              <span aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-violet-500/15 blur-3xl" />
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/80 to-transparent" />
              <div className="relative">
                <h3 className="font-display text-2xl font-bold leading-[1.1] text-white sm:text-3xl md:text-[2rem]">Day-one <br /><span className="bg-gradient-to-r from-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">Apple OS support</span></h3>
                <p className="mt-5 text-sm leading-[1.7] text-white/80 sm:text-[15px]">Jamf typically supports new iOS, iPadOS and macOS features on the day Apple releases them, something general-purpose UEMs cannot match. That deep Apple alignment is the entire reason Apple-heavy estates standardise on Jamf rather than a cross-platform tool.</p>
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

      {/* WHY JAMF WINS */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(27,138,199,0.06),transparent_55%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Why it wins</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">What makes Jamf the Apple default</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">The strengths that show up most often in UAE deployments where Apple is the standard.</p>
          </div>

          <div className="relative mx-auto max-w-4xl px-5 sm:px-6">
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {whyWinsStats.map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, delay: 0.05 * i }} className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#1E4E73] via-[#143E62] to-[#042542] px-6 py-7 shadow-md">
                  <p className={`font-display text-2xl font-bold leading-none sm:text-2xl ${statToneText[stat.tone]}`}>{stat.value}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-200">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid items-start gap-1 lg:grid-cols-2">
            {strengths.map((s, i) => {
              const tone = strengthToneMap[s.tone];
              const Icon = s.Icon;
              const isOrphan = i === strengths.length - 1 && strengths.length % 2 === 1;
              return (
                <motion.div key={s.title} tabIndex={0} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: 0.05 * i }} className={`group rounded-xl border border-white/10 bg-gradient-to-br from-[#04101E] to-[#0A3D6B] p-4 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/40 hover:shadow-lg focus-within:border-[#28B5E1]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#28B5E1]/40 ${isOrphan ? "lg:col-span-2" : ""}`}>
                  <div className="flex items-stretch gap-2.5">
                    <span className={`flex w-11 shrink-0 items-center justify-center rounded-lg border ${tone.iconBox}`}><Icon className="h-5 w-5" /></span>
                    <div className="min-w-0">
                      {s.tag && <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${tone.tag}`}>{s.tag}</span>}
                      <h3 className="mt-1.5 font-display text-sm font-semibold text-white sm:text-base">{s.title}</h3>
                    </div>
                  </div>
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]"><div className="overflow-hidden"><p className="mt-2.5 text-xs leading-relaxed text-slate-300 sm:text-sm">{s.desc}</p></div></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BEST FIT PROFILE */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#04101E] to-[#020617] py-12 sm:py-16">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.10),transparent_60%)]" />
        <div className="shell relative">
          <div className="border-b border-white/10 pb-5">
            <h2 className="font-display text-xl font-bold leading-tight text-white sm:text-2xl lg:text-[1.7rem]">Who should put <span className="bg-gradient-to-r from-[#28B5E1] to-[#7ad4f0] bg-clip-text text-transparent">Jamf</span> on the shortlist</h2>
          </div>
          <ul className="mt-6 grid gap-2 sm:mt-8 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-2.5">
            {bestFitProfile.map((p) => (
              <li key={p} className="group relative flex items-start gap-3 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/30 hover:bg-white/[0.05]">
                <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#28B5E1]/15 text-[#28B5E1] ring-1 ring-inset ring-[#28B5E1]/25 transition-colors group-hover:bg-[#28B5E1] group-hover:text-white group-hover:ring-[#28B5E1]"><CheckIcon className="h-3 w-3" /></span>
                <p className="text-[13px] leading-relaxed text-slate-200 sm:text-[13.5px]">{p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Core features</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">What's inside Jamf</h2>
          </div>
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

      {/* THREE BUILDING BLOCKS */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">The building blocks</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Three products, packaged into plans</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Jamf's plans are assembled from three products. Knowing them makes the plan comparison below easy to read.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {buildingBlocks.map((b) => (
              <div key={b.name} className="rounded-xl border border-slate-200 border-l-4 border-l-[#28B5E1] bg-white p-5 shadow-sm">
                <p className="font-display text-base font-bold text-slate-900">{b.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLAN POSITIONING */}
      <section id="editions" className="relative scroll-mt-20 bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Choosing a plan</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Simplified positioning, which plan fits</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">Each plan targets a different stage of Apple maturity and security need.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {planTiers.map((t, idx) => {
              const active = activePlan === idx;
              return (
                <button key={t.name} type="button" onClick={() => setActivePlan(idx)} aria-pressed={active}
                  className={`group relative overflow-hidden rounded-2xl border bg-white p-5 text-left transition-all duration-300 hover:-translate-y-0.5 ${t.highlighted ? "border-amber-300 ring-1 ring-amber-200 shadow-[0_12px_36px_-12px_rgba(246,183,60,0.30)]" : "border-slate-200 shadow-sm hover:border-[#28B5E1]/40"} ${active ? "scale-[1.02] ring-2 ring-[#28B5E1]/40" : ""}`}>
                  {t.highlighted && (<span className="absolute -top-px left-5 inline-flex rounded-b-md bg-amber-400 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-amber-950">Recommended</span>)}
                  <p className="mt-3 font-display text-base font-bold text-slate-900">{t.name}</p>
                  <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#1B8AC7]">{t.position}</p>
                  <p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Best for</p>
                  <ul className="mt-1 space-y-1">{t.bestFor.map((b) => (<li key={b} className="flex gap-1.5 text-[12.5px] leading-snug text-slate-700"><span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#28B5E1]" />{b}</li>))}</ul>
                  {t.additions && (<><p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{t.name === "Jamf Now" ? "Notes" : "Adds"}</p>
                    <ul className="mt-1 space-y-1">{t.additions.map((a) => (<li key={a} className="flex gap-1.5 text-[12.5px] leading-snug text-slate-700"><span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#28B5E1]" />{a}</li>))}</ul></>)}
                  <p className="mt-4 border-t border-slate-200 pt-3 font-display text-[13px] font-bold italic text-slate-900">"{t.verdict}"</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* STRATEGIC UPGRADE PATH */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">The strategic view</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">The important difference between plans</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">Each step changes what the platform fundamentally does, from managing Apple to securing it end to end.</p>
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="grid grid-cols-1 gap-4 bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-5 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE] sm:grid-cols-[1fr_2fr] sm:px-7 sm:text-[11px]"><span>Upgrade path</span><span>What fundamentally changes</span></div>
            {upgradePaths.map((u) => (
              <div key={u.from} className="grid grid-cols-1 gap-4 border-t border-[#0A3D6B]/20 px-5 py-4 transition-colors hover:bg-[#28B5E1]/[0.04] sm:grid-cols-[1fr_2fr] sm:px-7">
                <span className="font-display text-sm font-bold text-slate-900 sm:text-base">{u.from}</span>
                <span className="text-sm leading-relaxed text-slate-700 sm:text-[15px]"><span className="font-semibold text-[#1B8AC7]">{u.title}.</span> {u.desc}</span>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-sm leading-relaxed text-slate-600">Artiflex maps your Apple estate, security needs and scale to the right plan during the assessment, and integrates Jamf with your identity provider and broader security operations.</p>
        </div>
      </section>

      {/* FULL LICENSE MATRIX */}
      <section id="license-matrix" className="relative scroll-mt-20 bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Licensing</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Jamf plan comparison</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">From a simple SMB plan to the full management-plus-security-plus-identity bundle and enterprise scale.</p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + editions.length * 116) }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-4 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">Feature / Capability</th>
                    {editions.map((e, i) => (
                      <th key={e.name} className={`border-l border-white/15 px-2 py-3 sm:px-4 sm:py-4 text-center align-bottom font-display text-sm font-semibold text-white ${i === 2 ? "bg-gradient-to-br from-amber-500/80 to-amber-600/80 text-amber-50" : ""}`}>
                        {i === 2 && <span aria-hidden>★ </span>}{e.name}
                        <span className="mt-1 block font-mono text-[10px] font-normal uppercase tracking-wider text-[#9CD6EE]">{e.subtitle}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {licRows.map((row, rIdx) => (
                    <tr key={row.feature} className={`border-t border-[#0A3D6B]/15 transition-colors hover:bg-[#28B5E1]/[0.04] ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`}>
                      <th scope="row" className={`sticky left-0 z-10 px-4 py-3 align-middle font-display text-[13px] font-semibold text-slate-900 ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>{row.feature}</th>
                      {row.cells.map((c, cIdx) => {
                        const isHl = cIdx === 2;
                        const color = c.type === "yes" ? "text-emerald-600 font-bold" : c.type === "no" ? "text-slate-300" : "text-[#1B8AC7] font-semibold";
                        return (<td key={cIdx} className={`border-l border-[#0A3D6B]/15 px-3 py-3 text-center align-middle text-[12.5px] ${color} ${isHl ? "bg-amber-50/40" : ""}`}>{c.value}</td>);
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-xs leading-relaxed text-slate-500 sm:text-sm">
            Indicative pricing and packaging reflect Jamf's published plans and may change (a price uplift took effect in early 2025). The Business Plan bundle of Pro + Protect + Connect typically saves 15 to 40 percent versus buying the products individually. Artiflex confirms exact entitlements and pricing during scoping.
          </p>
        </div>
      </section>

      {/* DEPLOYMENT OPTIONS */}
      <section className="relative bg-slate-50 py-12 sm:py-16">
        <div className="shell">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">Deployment Options</p>
            <h2 className="font-display text-xl font-semibold leading-tight text-slate-900 sm:text-2xl">How we deliver Jamf <span className="font-normal text-slate-500">across UAE customers</span></h2>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {deploymentOptions.map((opt) => {
              const Icon = opt.icon === "server" ? ServerIcon : opt.icon === "layers" ? LayersIcon : CloudIcon;
              return (
                <div key={opt.title} className="rounded-xl border border-slate-200 bg-white p-5 transition-colors duration-300 hover:border-slate-300">
                  <div className="flex items-center gap-2.5">
                    <span aria-hidden className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500"><Icon className="h-4 w-4" /></span>
                    <h3 className="font-display text-sm font-semibold text-slate-900 sm:text-[15px]">{opt.title}</h3>
                  </div>
                  <p className="mt-3 text-[13px] leading-[1.6] text-slate-500 sm:text-sm">{opt.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Integrations</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              How Jamf fits your existing stack
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Jamf is Apple-native and built to slot into the identity and security tools around it.
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
              Artiflex designs and documents every Jamf deployment against the obligations that apply to your sector.
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
            <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">Deploying Jamf across the UAE</h2>
            <p className="mt-6 text-base leading-relaxed text-slate-200 sm:text-lg">Where an environment is Apple-first, Jamf is usually the right answer, and Artiflex deploys the full stack (Jamf Pro, Jamf Protect and Jamf Connect) with enrolment design, app packaging, security policy and ongoing management. For organisations with mixed fleets, we combine Jamf for Apple with a cross-platform UEM for the rest, all mapped to NESA, UAE PDPL and ISO 27001.</p>
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
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Frequently asked</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Jamf questions we hear from UAE buyers</h2>
          </div>
          <div className="mt-10"><FAQAccordion items={faqs} /></div>
        </div>
      </section>

      <CTASection
        title="Manage and secure your Apple fleet with Jamf"
        description="Book a free mobile posture assessment and we will review your Apple estate, recommend the right approach, and share a three-year TCO comparison."
        primaryButton={{ text: "Book a free assessment", action: "modal" }}
        secondaryButton={{ text: "Compare mobile vendors", href: "/cybersecurity/mobile-security#vendor-matrix" }}
      />
    </>
  );
}
