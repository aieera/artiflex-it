import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import {
  CheckIcon,
  ShieldIcon,
  LayersIcon,
  DatabaseIcon,
  UsersIcon,
  NetworkIcon,
  TargetIcon,
  CloudIcon,
  ServerIcon,
  MonitorIcon,
  MessageIcon,
  PhoneIcon,
  SearchIcon,
  BarChartIcon,
  LockIcon,
  ZapIcon,
  WifiIcon,
  StarIcon,
  GlobeIcon,
} from "@/components/icons";

/* ───────── DATA ───────── */

const vendor = {
  name: "Lookout Mobile Endpoint Security",
  vendorCompany: "Lookout",
  bestFor: "AI-first MTD · Managed and unmanaged devices",
  tagline: "AI-first mobile threat defense, managed or unmanaged",
  description:
    "Lookout Mobile Endpoint Security is dedicated mobile threat defense built on the industry's largest AI-driven mobile dataset. With around 16 years of MTD heritage, it protects iOS, Android and ChromeOS devices, whether enrolled in management or completely unmanaged, with standout phishing and smishing defense.",
  logo: "/logos/Lookout.png",
};

const overviewParagraphs = [
  "Lookout Mobile Endpoint Security is a dedicated mobile threat defense (MTD) platform. It detects and blocks threats across the mobile attack surface, phishing and smishing, malicious and risky apps, network attacks, and device and OS vulnerabilities, for both managed and unmanaged devices, which makes it particularly valuable where contractors or BYOD users touch corporate data.",
  "Its edge is data: roughly 16 years in MTD and one of the world's largest mobile security datasets, telemetry from hundreds of millions of devices and apps that trains its AI to spot threats early. Now a pure-play enterprise vendor since divesting its consumer arm in 2023, Lookout is MTD only: it does not enrol or manage devices, so it deploys alongside a UEM, feeding threat verdicts into conditional access to gate risky devices away from corporate resources.",
];

const overviewCapabilities = [
  "AI-first detection on the largest mobile dataset",
  "iOS, Android and ChromeOS coverage",
  "Standout phishing and smishing defense",
  "Managed and unmanaged device support",
  "Mobile EDR in the Premium tier",
  "UEM and SIEM integration",
  "Privacy-aware reporting",
  "Pure-play enterprise focus since 2023",
];

const strengths: {
  title: string;
  desc: string;
  tag?: string;
  tone: "emerald" | "violet" | "amber" | "sky" | "rose" | "slate";
  Icon: React.FC<{ className?: string }>;
}[] = [
  {
    title: "Largest mobile dataset",
    tag: "AI trained at scale",
    desc: "AI trained on telemetry from hundreds of millions of devices and apps. The dataset advantage shows up most strongly in zero-day phishing pages and novel app threat detection.",
    tone: "emerald",
    Icon: DatabaseIcon,
  },
  {
    title: "Phishing and smishing",
    tag: "Fastest-growing vector",
    desc: "Standout protection against the fastest-growing mobile attack vector, malicious links and SMS-based phishing. Closes a gap that email defences and standard MTD cannot reach.",
    tone: "sky",
    Icon: ShieldIcon,
  },
  {
    title: "Unmanaged coverage",
    tag: "BYOD and contractors",
    desc: "Protects contractor and BYOD devices that are not enrolled in a UEM, a critical capability for hybrid workforces where personal phones touch corporate data without full enrolment.",
    tone: "violet",
    Icon: UsersIcon,
  },
  {
    title: "Full attack surface",
    tag: "Four vectors in one",
    desc: "App, network, device and phishing threats in one platform. Comprehensive mobile threat visibility without stitching together multiple point solutions.",
    tone: "amber",
    Icon: LayersIcon,
  },
  {
    title: "UEM and SIEM integration",
    tag: "Plays well with all",
    desc: "Feeds verdicts into conditional access (Intune, Workspace ONE, Jamf, Hexnode) and into the SOC via SIEM connectors. The MTD layer slots cleanly into your existing operations.",
    tone: "rose",
    Icon: NetworkIcon,
  },
  {
    title: "Pure-play enterprise focus",
    tag: "Enterprise-only since 2023",
    desc: "Lookout divested its consumer arm in 2023, the entire product roadmap is now focused on enterprise mobile security. No competing priorities, every release benefits the enterprise customer.",
    tone: "slate",
    Icon: TargetIcon,
  },
];

const whyWinsStats: { value: string; label: string; tone: "emerald" | "violet" | "sky" }[] = [
  { value: "~16 years", label: "Of dedicated mobile threat defense heritage, longest in the market", tone: "emerald" },
  { value: "AI-first", label: "Detection trained on telemetry from hundreds of millions of devices and apps", tone: "sky" },
  { value: "Managed + BYOD", label: "Protection that follows the user, on or off enrolled devices", tone: "violet" },
];

const bestFitProfile = [
  "Unmanaged and BYOD scenarios where contractor and personal devices access corporate data without enrolment",
  "Phishing-targeted organisations facing heavy smishing and mobile phishing pressure on staff",
  "Workspace ONE and Intune estates adding a dedicated, well-integrated MTD layer",
  "Large-scale mobile fleets wanting AI detection backed by one of the largest mobile datasets in the world",
  "Mature SOC and threat-hunting teams that want mobile EDR feeding into their security operations",
  "Vulnerability-led risk programmes correlating mobile OS and app risk with the wider vulnerability programme",
  "Regulated and high-risk industries (finance, government, healthcare) where mobile is a real attack surface",
  "Mixed UEM estates where the priority is privacy-aware, UEM-agnostic threat defense across many MDMs",
];

const coreFeatures: { title: string; desc: string; Icon: React.FC<{ className?: string }> }[] = [
  { title: "AI-first detection", desc: "Powered by the largest mobile dataset.", Icon: ZapIcon },
  { title: "Phishing and content protection", desc: "Blocks malicious links and smishing.", Icon: MessageIcon },
  { title: "App risk analysis", desc: "Flags malicious and risky apps.", Icon: SearchIcon },
  { title: "Network threat detection", desc: "Man-in-the-middle and rogue networks.", Icon: WifiIcon },
  { title: "Device and OS risk", desc: "Vulnerability and configuration checks.", Icon: PhoneIcon },
  { title: "Managed and unmanaged", desc: "Protects enrolled and BYOD devices.", Icon: UsersIcon },
  { title: "Conditional access", desc: "Gate access on real-time risk.", Icon: LockIcon },
  { title: "Mobile Intelligence APIs", desc: "Surface risk data to other tools.", Icon: LayersIcon },
  { title: "UEM integration", desc: "Intune, Workspace ONE and others.", Icon: MonitorIcon },
  { title: "Privacy-aware reporting", desc: "Enterprise visibility with user privacy.", Icon: BarChartIcon },
];

const trustSignals: { title: string; desc: string; Icon: React.FC<{ className?: string }> }[] = [
  { title: "16+ years in MTD", desc: "One of the longest track records in mobile threat defense.", Icon: ShieldIcon },
  { title: "Largest mobile dataset", desc: "Telemetry from hundreds of millions of devices and apps trains its AI.", Icon: GlobeIcon },
  { title: "Pure-play enterprise", desc: "Enterprise-focused since divesting its consumer business in 2023.", Icon: StarIcon },
];

const integrations: { title: string; body: string }[] = [
  { title: "UEM / MDM", body: "Hexnode, Intune, Jamf and Workspace ONE. Threat verdicts drive conditional access." },
  { title: "Microsoft security", body: "Entra ID and Microsoft endpoint connectors for a Microsoft-centric estate." },
  { title: "SIEM & SOAR", body: "Streams mobile threat events into Splunk, Sentinel, QRadar and SOAR platforms." },
  { title: "Identity providers", body: "Entra ID, Okta and other IdPs for risk-aware access tied to device posture." },
  { title: "Conditional access", body: "Feeds device risk into access decisions so risky devices are gated automatically." },
  { title: "Open APIs", body: "REST APIs and connectors for custom reporting and automation." },
];

const compliance: { code: string; desc: string }[] = [
  { code: "NESA", desc: "UAE national cyber standards" },
  { code: "UAE PDPL", desc: "Personal data protection law" },
  { code: "ADHICS", desc: "Abu Dhabi healthcare infosec" },
  { code: "CBUAE", desc: "Central Bank of the UAE" },
  { code: "SAMA", desc: "Saudi financial cyber framework" },
  { code: "ISO 27001", desc: "Information security management" },
];

/* ───────── LICENSE COMPARISON (3 TIERS) ───────── */

type LicCell = { value: string; type: "yes" | "no" | "qual" };
type LicRow = { feature: string; cells: LicCell[] };

const editions = [
  { name: "Essentials", subtitle: "core MTD" },
  { name: "Advanced", subtitle: "+ phishing" },
  { name: "Premium", subtitle: "EDR + intel" },
];

const Y = (v = "✓"): LicCell => ({ value: v, type: "yes" });
const N: LicCell = { value: "✗", type: "no" };
const Q = (v: string): LicCell => ({ value: v, type: "qual" });

const licRows: LicRow[] = [
  { feature: "Primary positioning", cells: [Q("Core MTD"), Q("MTD + phishing defense"), Q("Mobile EDR and intelligence")] },
  { feature: "App threat protection (malware, risky apps)", cells: [Y(), Y(), Y()] },
  { feature: "Device threat and OS vulnerability detection", cells: [Y(), Y(), Y()] },
  { feature: "Network attack detection (MITM, rogue Wi-Fi)", cells: [Y(), Y(), Y()] },
  { feature: "Managed and unmanaged device coverage", cells: [Y(), Y(), Y()] },
  { feature: "Conditional access integration", cells: [Y(), Y(), Y()] },
  { feature: "Phishing and Content Protection (smishing)", cells: [N, Y(), Y()] },
  { feature: "Mobile Vulnerability and Risk management", cells: [N, Q("Basic"), Y()] },
  { feature: "Mobile EDR (detection and response)", cells: [N, N, Y()] },
  { feature: "Mobile Intelligence APIs", cells: [N, N, Y()] },
  { feature: "Advanced threat hunting and forensics", cells: [N, N, Y()] },
  { feature: "UEM and SIEM integration", cells: [Y(), Y(), Y()] },
  { feature: "Support tier", cells: [Q("Standard"), Q("Premium"), Q("Premium Plus")] },
  { feature: "Licensing basis", cells: [Q("Per device / user"), Q("Per device / user"), Q("Per device / user")] },
];

/* ───────── TIER POSITIONING ───────── */

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
    name: "Essentials",
    position: "Core MTD",
    bestFor: ["Organisations starting with MTD", "App, device and network protection", "Managed and unmanaged devices"],
    additions: ["App and device threat detection", "Network attack defense", "Conditional access"],
    verdict: "Core mobile threat defense.",
  },
  {
    name: "Advanced",
    position: "MTD + phishing defense",
    bestFor: ["Phishing and smishing-targeted teams", "Broader risk coverage", "Regulated mobile fleets"],
    additions: ["Phishing and Content Protection", "Basic vulnerability management", "Premium support"],
    verdict: "Threat defense plus phishing protection.",
  },
  {
    name: "Premium",
    position: "Mobile EDR and intelligence",
    bestFor: ["Mature SOC and threat-hunting teams", "Vulnerability-led risk programmes", "Intelligence-driven security"],
    additions: ["Mobile EDR", "Vulnerability and risk management", "Mobile Intelligence APIs", "Advanced threat hunting"],
    verdict: "The full mobile EDR platform.",
    highlighted: true,
  },
];

const upgradePaths = [
  { from: "Essentials → Advanced", title: "Threat protection → + phishing defense", desc: "Phishing and Content Protection and basic vulnerability management close the fastest-growing mobile attack vector." },
  { from: "Advanced → Premium", title: "MTD → mobile EDR and intelligence", desc: "Mobile EDR, vulnerability management, Intelligence APIs and advanced threat hunting turn protection into a full detection-and-response platform feeding the SOC." },
];

const deploymentOptions = [
  { icon: "cloud" as const, title: "Lookout Cloud (SaaS)", body: "Lookout-hosted SaaS console for policy, threat visibility and forensics. The default deployment for most UAE customers." },
  { icon: "server" as const, title: "Agent via UEM", body: "Lookout agent pushed through Intune, Workspace ONE, Jamf or Hexnode for managed fleets, with threat verdicts flowing back to compliance and conditional access." },
  { icon: "layers" as const, title: "BYOD direct enrolment", body: "For unmanaged and contractor devices, users can install the Lookout app directly. Enterprise visibility, user privacy preserved." },
];

const faqs = [
  {
    question: "Why does Lookout stand out among MTD vendors?",
    answer: "Two things. First, the dataset: Lookout's AI is trained on telemetry from hundreds of millions of devices and apps, one of the largest in the industry, which shows up in zero-day phishing and app-threat detection. Second, the unmanaged-device strength: Lookout protects contractor and BYOD devices without requiring enrolment, which most MTDs cannot.",
  },
  {
    question: "When should we choose Lookout over Zimperium?",
    answer: "Lookout wins when phishing and smishing defense is the priority, when unmanaged-device coverage at scale matters most, or when you want AI detection backed by the largest mobile dataset. Zimperium wins when on-device, privacy-first detection that never leaves the phone is the priority, or when you also need MAPS in-app protection for your own apps. Artiflex selects the right MTD during the assessment.",
  },
  {
    question: "Do we need a UEM as well as Lookout?",
    answer: "Yes for the management layer. Lookout is MTD only, it detects and verdicts threats but does not manage devices. Pair it with a UEM (Intune, Workspace ONE, Jamf, Hexnode) and threat verdicts flow into conditional access for automatic gating. For pure unmanaged-device protection, Lookout can also be deployed standalone.",
  },
  {
    question: "When does the Premium edition make sense?",
    answer: "When you want mobile EDR feeding your SOC, vulnerability and risk management for mobile, Mobile Intelligence APIs to surface data to other security tools, and advanced threat hunting. The right edition for mature security operations teams running a vulnerability-led risk programme.",
  },
  {
    question: "Does Lookout cover ChromeOS as well as iOS and Android?",
    answer: "Yes. Lookout protects iOS, Android and ChromeOS devices. Useful for education and frontline programmes built around Chromebooks alongside mobile devices.",
  },
  {
    question: "What does an Artiflex Lookout deployment include?",
    answer: "Assessment, deployment design, UEM and SIEM integration, policy build and ongoing threat monitoring, all mapped to NESA, UAE PDPL and ISO 27001. Fully managed, co-managed or assessment-only.",
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

export default function MobileSecurityLookout() {
  const { open: openContact } = useContactModal();
  const [activeEdition, setActiveEdition] = useState(2);

  const pageUrl = "https://artiflexit.com/cybersecurity/mobile-security/lookout";
  const pageTitle = "Lookout Mobile Endpoint Security | MTD UAE | Artiflex IT";
  const metaDescription = "Lookout Mobile Endpoint Security, AI-first mobile threat defense for managed and unmanaged devices. Deployed and managed by Artiflex IT for UAE enterprises.";

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={pageUrl} />
      <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: vendor.name, category: "Mobile Threat Defense", description: metaDescription, brand: { "@type": "Brand", name: "Lookout" }, url: pageUrl })}</script>
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
            <span className="font-medium text-[#28B5E1]">Lookout</span>
          </div>
        </div>

        <div className="shell relative z-10 w-full py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="lg:col-span-7">
              <div className="flex items-center gap-3"><span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-transparent to-[#28B5E1]" /><span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-[#28B5E1]">{vendor.bestFor}</span></div>
              <p className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">{vendor.vendorCompany}</p>
              <h1 className="mt-3 font-display text-4xl font-bold leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]">Lookout <span className="bg-gradient-to-r from-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">Mobile Endpoint Security</span></h1>
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
                <div className="relative z-10 hidden h-full w-full flex-col items-center justify-center text-center" style={{ display: "none" }}><p className="font-display text-3xl font-bold tracking-tight text-slate-900">Lookout</p><p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">MES</p></div>
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

      {/* WHAT IS LOOKOUT */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-[#28B5E1]/30 via-[#9CD6EE]/20 to-transparent blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute top-32 right-[-10rem] h-[26rem] w-[26rem] rounded-full bg-gradient-to-tr from-violet-300/15 via-fuchsia-200/15 to-cyan-200/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/3 h-[26rem] w-[26rem] rounded-full bg-gradient-to-tr from-[#1B8AC7]/20 via-[#28B5E1]/15 to-transparent blur-3xl" />

        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#28B5E1]/20 bg-white/60 px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7] backdrop-blur-xl shadow-[0_2px_10px_rgba(15,23,42,0.04)]"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#28B5E1] shadow-[0_0_8px_rgba(40,181,225,0.8)]" />Overview</span>
            <h2 className="mt-6 font-display text-3xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-4xl md:text-5xl">What <span className="bg-gradient-to-r from-[#1B8AC7] via-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">Lookout MES</span> is</h2>
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
                <h3 className="font-display text-2xl font-bold leading-[1.1] text-white sm:text-3xl md:text-[2rem]">Hundreds of millions <br /><span className="bg-gradient-to-r from-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">of devices in the dataset</span></h3>
                <p className="mt-5 text-sm leading-[1.7] text-white/80 sm:text-[15px]">Lookout's AI is trained on telemetry from hundreds of millions of devices and apps, one of the largest mobile security datasets in the world. That data advantage powers zero-day phishing detection, novel app-threat identification and managed/unmanaged coverage at scale.</p>
              </div>
            </div>
          </div>

          <ul className="relative mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-6 lg:grid-cols-4">
            {overviewCapabilities.map((item) => (
              <li key={item} className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-5 shadow-[0_6px_24px_-8px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-[#28B5E1]/40 hover:bg-white/80 hover:shadow-[0_14px_40px_-10px_rgba(40,181,225,0.25)]">
                <span aria-hidden="true" className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-tr from-[#28B5E1]/0 to-transparent blur-2xl transition-all duration-500 group-hover:from-[#28B5E1]/20" />
                <div className="relative flex items-start gap-3"><span aria-hidden="true" className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#28B5E1] to-[#1B8AC7] text-white shadow-[0_4px_12px_-2px_rgba(40,181,225,0.5)]"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><path d="M4 10l4 4 8-8" /></svg></span><span className="text-[13.5px] font-medium leading-snug text-slate-800 sm:text-sm">{item}</span></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHY LOOKOUT WINS */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(27,138,199,0.06),transparent_55%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Why it wins</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">What makes Lookout a serious MTD</h2><p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">The strengths that show up most often in UAE deployments where phishing pressure and unmanaged-device coverage matter most.</p></div>
          <div className="relative mx-auto max-w-4xl px-5 sm:px-6">
            <div className="mt-10 grid gap-4 sm:grid-cols-3">{whyWinsStats.map((stat, i) => (<motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, delay: 0.05 * i }} className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#1E4E73] via-[#143E62] to-[#042542] px-6 py-7 shadow-md"><p className={`font-display text-2xl font-bold leading-none sm:text-2xl ${statToneText[stat.tone]}`}>{stat.value}</p><p className="mt-3 text-sm leading-relaxed text-slate-200">{stat.label}</p></motion.div>))}</div>
          </div>
          <div className="mt-12 grid items-start gap-1 lg:grid-cols-2">{strengths.map((s, i) => {
            const tone = strengthToneMap[s.tone]; const Icon = s.Icon; const isOrphan = i === strengths.length - 1 && strengths.length % 2 === 1;
            return (<motion.div key={s.title} tabIndex={0} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: 0.05 * i }} className={`group rounded-xl border border-white/10 bg-gradient-to-br from-[#04101E] to-[#0A3D6B] p-4 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/40 hover:shadow-lg focus-within:border-[#28B5E1]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#28B5E1]/40 ${isOrphan ? "lg:col-span-2" : ""}`}>
              <div className="flex items-stretch gap-2.5"><span className={`flex w-11 shrink-0 items-center justify-center rounded-lg border ${tone.iconBox}`}><Icon className="h-5 w-5" /></span><div className="min-w-0">{s.tag && <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${tone.tag}`}>{s.tag}</span>}<h3 className="mt-1.5 font-display text-sm font-semibold text-white sm:text-base">{s.title}</h3></div></div>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]"><div className="overflow-hidden"><p className="mt-2.5 text-xs leading-relaxed text-slate-300 sm:text-sm">{s.desc}</p></div></div>
            </motion.div>);
          })}</div>
        </div>
      </section>

      {/* BEST FIT PROFILE */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#04101E] to-[#020617] py-12 sm:py-16">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.10),transparent_60%)]" />
        <div className="shell relative">
          <div className="border-b border-white/10 pb-5"><h2 className="font-display text-xl font-bold leading-tight text-white sm:text-2xl lg:text-[1.7rem]">Who should put <span className="bg-gradient-to-r from-[#28B5E1] to-[#7ad4f0] bg-clip-text text-transparent">Lookout</span> on the shortlist</h2></div>
          <ul className="mt-6 grid gap-2 sm:mt-8 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-2.5">{bestFitProfile.map((p) => (<li key={p} className="group relative flex items-start gap-3 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/30 hover:bg-white/[0.05]"><span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#28B5E1]/15 text-[#28B5E1] ring-1 ring-inset ring-[#28B5E1]/25 transition-colors group-hover:bg-[#28B5E1] group-hover:text-white group-hover:ring-[#28B5E1]"><CheckIcon className="h-3 w-3" /></span><p className="text-[13px] leading-relaxed text-slate-200 sm:text-[13.5px]">{p}</p></li>))}</ul>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Core features</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">What's inside Lookout MES</h2></div>

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
          <div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Choosing an edition</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Simplified positioning, which edition fits</h2><p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">Each tier widens coverage from core threat protection to full mobile detection and response.</p></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{editionTiers.map((t, idx) => { const active = activeEdition === idx; return (
            <button key={t.name} type="button" onClick={() => setActiveEdition(idx)} aria-pressed={active} className={`group relative overflow-hidden rounded-2xl border bg-white p-5 text-left transition-all duration-300 hover:-translate-y-0.5 ${t.highlighted ? "border-amber-300 ring-1 ring-amber-200 shadow-[0_12px_36px_-12px_rgba(246,183,60,0.30)]" : "border-slate-200 shadow-sm hover:border-[#28B5E1]/40"} ${active ? "scale-[1.02] ring-2 ring-[#28B5E1]/40" : ""}`}>
              {t.highlighted && (<span className="absolute -top-px left-5 inline-flex rounded-b-md bg-amber-400 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-amber-950">Recommended</span>)}
              <p className="mt-3 font-display text-lg font-bold text-slate-900">{t.name}</p>
              <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#1B8AC7]">{t.position}</p>
              <p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Best for</p>
              <ul className="mt-1 space-y-1">{t.bestFor.map((b) => (<li key={b} className="flex gap-1.5 text-[12.5px] leading-snug text-slate-700"><span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#28B5E1]" />{b}</li>))}</ul>
              {t.additions && (<><p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{t.name === "Essentials" ? "Key capabilities" : "Main additions"}</p><ul className="mt-1 space-y-1">{t.additions.map((a) => (<li key={a} className="flex gap-1.5 text-[12.5px] leading-snug text-slate-700"><span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#28B5E1]" />{a}</li>))}</ul></>)}
              <p className="mt-4 border-t border-slate-200 pt-3 font-display text-[13px] font-bold italic text-slate-900">"{t.verdict}"</p>
            </button>
          ); })}</div>
        </div>
      </section>

      {/* STRATEGIC UPGRADE PATH */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">The strategic view</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">The important difference between editions</h2><p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">Each step widens what the platform defends, from threats, to phishing, to a full detection-and-response capability.</p></div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="grid grid-cols-1 gap-4 bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-5 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE] sm:grid-cols-[1fr_2fr] sm:px-7 sm:text-[11px]"><span>Upgrade path</span><span>What fundamentally changes</span></div>
            {upgradePaths.map((u) => (<div key={u.from} className="grid grid-cols-1 gap-4 border-t border-[#0A3D6B]/20 px-5 py-4 transition-colors hover:bg-[#28B5E1]/[0.04] sm:grid-cols-[1fr_2fr] sm:px-7"><span className="font-display text-sm font-bold text-slate-900 sm:text-base">{u.from}</span><span className="text-sm leading-relaxed text-slate-700 sm:text-[15px]"><span className="font-semibold text-[#1B8AC7]">{u.title}.</span> {u.desc}</span></div>))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-sm leading-relaxed text-slate-600">Artiflex maps your threat profile, fleet and SOC maturity to the right edition during the assessment, and integrates Lookout with your UEM and SIEM.</p>
        </div>
      </section>

      {/* FULL LICENSE MATRIX */}
      <section id="license-matrix" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Licensing</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Lookout MES edition comparison</h2><p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">Mobile Endpoint Security is licensed in tiers (Essentials, Advanced and Premium) that scale from core mobile threat protection to a full mobile EDR and intelligence platform.</p></div>
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
          <p className="mt-4 max-w-3xl text-xs leading-relaxed text-slate-500 sm:text-sm">Edition names and feature mapping reflect Lookout's published MES bundles (Essentials, Advanced and Premium, legacy names MES Threats and Comprehensive) and may evolve. Artiflex confirms exact entitlements during scoping.</p>
        </div>
      </section>

      {/* DEPLOYMENT OPTIONS */}
      <section className="relative bg-white py-12 sm:py-16">
        <div className="shell">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6"><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">Deployment Options</p><h2 className="font-display text-xl font-semibold leading-tight text-slate-900 sm:text-2xl">How we deliver Lookout <span className="font-normal text-slate-500">across UAE customers</span></h2></div>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">{deploymentOptions.map((opt) => { const Icon = opt.icon === "server" ? ServerIcon : opt.icon === "layers" ? LayersIcon : CloudIcon; return (<div key={opt.title} className="rounded-xl border border-slate-200 bg-white p-5 transition-colors duration-300 hover:border-slate-300"><div className="flex items-center gap-2.5"><span aria-hidden className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500"><Icon className="h-4 w-4" /></span><h3 className="font-display text-sm font-semibold text-slate-900 sm:text-[15px]">{opt.title}</h3></div><p className="mt-3 text-[13px] leading-[1.6] text-slate-500 sm:text-sm">{opt.body}</p></div>); })}</div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Integrations</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              How Lookout fits your existing stack
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Lookout is built to feed the UEM, identity and SOC tools you already run.
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
              Artiflex designs and documents every Lookout deployment against the obligations that apply to your sector.
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
            <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">Deploying Lookout across the UAE</h2>
            <p className="mt-6 text-base leading-relaxed text-slate-200 sm:text-lg">Lookout is an excellent MTD choice, especially for unmanaged-device and phishing-heavy scenarios, and Artiflex deploys it alongside your UEM with policy design, conditional-access integration and ongoing monitoring. Where on-device, privacy-first detection or in-app protection is the priority, we will discuss Zimperium as an alternative, the right MTD always follows the assessment, mapped to NESA, UAE PDPL and ISO 27001.</p>
            <div className="mt-8 flex flex-wrap gap-4"><Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#28B5E1] px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:bg-white sm:text-base">Talk to our Consultant</Link><Link to="/cybersecurity/mobile-security" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-[#28B5E1]/50 hover:bg-white/10 sm:text-base">Back to Mobile Security</Link></div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Frequently asked</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Lookout questions we hear from UAE buyers</h2></div>
          <div className="mt-10"><FAQAccordion items={faqs} /></div>
        </div>
      </section>

      <CTASection
        title="Add AI-driven threat defense with Lookout"
        description="Book a free mobile posture assessment and we will map your exposure, recommend the right UEM + MTD pairing and share a three-year TCO comparison."
        primaryButton={{ text: "Book a free assessment", action: "modal" }}
        secondaryButton={{ text: "Compare mobile vendors", href: "/cybersecurity/mobile-security#vendor-matrix" }}
      />
    </>
  );
}
