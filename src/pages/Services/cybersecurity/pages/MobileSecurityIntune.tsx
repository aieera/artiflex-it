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
  LockIcon,
  DatabaseIcon,
  CloudIcon,
  ServerIcon,
  GearIcon,
  PhoneIcon,
  BarChartIcon,
  StarIcon,
  GlobeIcon,
} from "@/components/icons";

/* ───────── DATA ───────── */

const vendor = {
  name: "Microsoft Intune",
  vendorCompany: "Microsoft",
  bestFor: "Cloud-native UEM · Microsoft-standardised",
  tagline: "Cloud-native endpoint management, native to Microsoft 365",
  description:
    "Microsoft Intune is the cloud UEM and MDM at the heart of the Microsoft Intune Suite, wired directly into Entra ID, Conditional Access and Defender. For organisations standardised on Microsoft 365, it is the lowest-friction way to manage Windows, iOS, Android and macOS from one console, with licensing often already owned.",
  logo: "/logos/microsoft.svg",
};

const overviewParagraphs = [
  "Microsoft Intune is Microsoft's cloud-based unified endpoint management service, evolved from Windows Intune (2011) into the modern Microsoft Intune Suite. It manages the full device lifecycle, enrolment, configuration, app delivery, compliance and retirement, across Windows, iOS/iPadOS, Android and macOS, including mobile application management (MAM) for BYOD without full enrolment.",
  "Its defining strength is integration: native to the Microsoft ecosystem, with identity through Entra ID, security signals through Microsoft Defender and policy via Conditional Access, so for organisations already on Microsoft 365 E3 or E5 the UEM capability is frequently already licensed. It does not include dedicated mobile threat defense on its own; that comes via Microsoft Defender for Endpoint or a partner MTD such as Zimperium, which Artiflex layers in for full threat coverage.",
];

const overviewCapabilities = [
  "Native Entra ID and Conditional Access",
  "Often included in M365 E3 / E5 and EMS",
  "Windows, iOS/iPadOS, Android, macOS",
  "MAM for BYOD without full enrolment",
  "Windows Autopilot zero-touch provisioning",
  "Defender risk signals into compliance",
  "Intune Suite premium modules available",
  "Threat defense via Defender or Zimperium",
];

const strengths: {
  title: string;
  desc: string;
  tag?: string;
  tone: "emerald" | "violet" | "amber" | "sky" | "rose" | "slate";
  Icon: React.FC<{ className?: string }>;
}[] = [
  {
    title: "Native to Microsoft 365",
    tag: "Deepest M365 fit",
    desc: "The tightest integration with Entra ID, Defender and Conditional Access of any UEM. If your identity, security and productivity stack is Microsoft, Intune fits like a glove.",
    tone: "emerald",
    Icon: LayersIcon,
  },
  {
    title: "Often already licensed",
    tag: "Cost-efficient",
    desc: "Included in M365 E3, E5 and EMS bundles. Many UAE organisations already own Intune entitlements through their existing Microsoft agreement, the most cost-efficient UEM option in that scenario.",
    tone: "sky",
    Icon: DatabaseIcon,
  },
  {
    title: "Cross-platform",
    tag: "Windows + Apple + Android",
    desc: "Windows, iOS, Android and macOS managed from one cloud console. Strongest of all UEMs at Windows management thanks to Autopilot and tight OS integration.",
    tone: "violet",
    Icon: GridIcon,
  },
  {
    title: "MAM for BYOD",
    tag: "App-level protection",
    desc: "Mobile Application Management protects corporate data inside Microsoft and supported third-party apps without enrolling personal devices. Ideal for contractor and BYOD scenarios under PDPL.",
    tone: "amber",
    Icon: ShieldIcon,
  },
  {
    title: "Autopilot provisioning",
    tag: "Zero-touch Windows",
    desc: "Devices ship straight from the vendor to the user and configure themselves through Entra and Intune. The reference experience for modern Windows deployment.",
    tone: "rose",
    Icon: ZapIcon,
  },
  {
    title: "Conditional Access",
    tag: "Identity-led access",
    desc: "Gate corporate resources on real-time device compliance, identity risk and Defender signal. The native control plane for Zero Trust on Microsoft 365.",
    tone: "slate",
    Icon: LockIcon,
  },
];

const whyWinsStats: { value: string; label: string; tone: "emerald" | "violet" | "sky" }[] = [
  { value: "M365 E3/E5", label: "Intune Plan 1 is included in standard Microsoft 365 enterprise bundles", tone: "emerald" },
  { value: "4 OS", label: "Windows, iOS, Android and macOS managed from a single cloud console", tone: "sky" },
  { value: "Intune Suite", label: "Premium bundle adds Remote Help, EPM, Advanced Analytics, Enterprise App Mgmt and Cloud PKI", tone: "violet" },
];

const bestFitProfile = [
  "Microsoft 365 organisations standardised on M365 E3 or E5 wanting UEM that is native, integrated and often already owned",
  "Windows-heavy estates needing modern Windows management with Autopilot, Update for Business and Endpoint Privilege Management",
  "Hybrid identity environments where Entra ID is the source of truth and Conditional Access ties device state to access",
  "Mixed mobile fleets (iOS and Android) that need management plus MAM-only BYOD protection alongside Windows",
  "Enterprises adding mobile threat defense via Microsoft Defender for Endpoint or partner MTD such as Zimperium",
  "Teams running Microsoft Defender XDR who want UEM signals flowing into the same security operations console",
  "Regulated UAE customers (finance, government) requiring NESA and PDPL alignment within the Microsoft compliance stack",
  "Organisations consolidating SCCM/MEMCM and modernising to cloud-managed endpoints via co-management",
];

const coreFeatures: { title: string; desc: string; Icon: React.FC<{ className?: string }> }[] = [
  { title: "Device enrolment", desc: "Windows Autopilot, Apple ABM, Android Enterprise.", Icon: ZapIcon },
  { title: "App deployment", desc: "Store, line-of-business and Microsoft 365 apps.", Icon: GridIcon },
  { title: "Mobile App Management", desc: "Protect data in apps without full enrolment.", Icon: ShieldIcon },
  { title: "Compliance policies", desc: "Define and enforce device health requirements.", Icon: ShieldIcon },
  { title: "Conditional Access", desc: "Native Entra integration for access control.", Icon: LockIcon },
  { title: "Configuration profiles", desc: "Granular OS and security settings.", Icon: GearIcon },
  { title: "Endpoint analytics", desc: "Device health and user-experience insights.", Icon: BarChartIcon },
  { title: "Defender integration", desc: "Risk signals feed compliance and access.", Icon: ShieldIcon },
  { title: "Remote actions", desc: "Wipe, retire, lock and reset across the fleet.", Icon: PhoneIcon },
  { title: "Intune Suite add-ons", desc: "Remote Help, EPM, Cloud PKI and more.", Icon: LayersIcon },
];

const trustSignals: { title: string; desc: string; Icon: React.FC<{ className?: string }> }[] = [
  { title: "Microsoft-native", desc: "Built into Entra ID, Microsoft Defender and Conditional Access.", Icon: ShieldIcon },
  { title: "Included in M365 E3/E5", desc: "UEM capability many UAE organisations already own.", Icon: StarIcon },
  { title: "Enterprise-scale UEM", desc: "Manages Windows, iOS/iPadOS, Android and macOS from one cloud console.", Icon: GlobeIcon },
];

const integrations: { title: string; body: string }[] = [
  { title: "Microsoft Entra ID", body: "Native identity, SSO and Conditional Access tied to device compliance." },
  { title: "Microsoft Defender", body: "Defender for Endpoint provides the mobile threat-defense signal Intune acts on." },
  { title: "Partner MTD", body: "Layer Zimperium or Lookout where deeper, dedicated mobile threat defense is required." },
  { title: "Microsoft Sentinel & SIEM", body: "Device and compliance telemetry flows into Sentinel and third-party SIEM/SOAR." },
  { title: "Apple, Google & Windows", body: "Apple Business Manager, Android Enterprise and Windows Autopilot for zero-touch enrolment." },
  { title: "Microsoft 365 apps", body: "Managed deployment and app-protection policies for Microsoft 365 mobile apps." },
];

const compliance: { code: string; desc: string }[] = [
  { code: "NESA", desc: "UAE national cyber standards" },
  { code: "UAE PDPL", desc: "Personal data protection law" },
  { code: "ADHICS", desc: "Abu Dhabi healthcare infosec" },
  { code: "CBUAE", desc: "Central Bank of the UAE" },
  { code: "SAMA", desc: "Saudi financial cyber framework" },
  { code: "ISO 27001", desc: "Information security management" },
];

/* ───────── LICENSE COMPARISON (3 PLANS) ───────── */

type LicCell = { value: string; type: "yes" | "no" | "qual" };
type LicRow = { feature: string; cells: LicCell[] };

const editions = [
  { name: "Plan 1", subtitle: "foundation" },
  { name: "Plan 2", subtitle: "add-on" },
  { name: "Intune Suite", subtitle: "premium bundle" },
];

const Y = (v = "✓"): LicCell => ({ value: v, type: "yes" });
const N: LicCell = { value: "✗", type: "no" };
const Q = (v: string): LicCell => ({ value: v, type: "qual" });

const licRows: LicRow[] = [
  { feature: "Primary positioning", cells: [Q("Foundation UEM / MDM"), Q("Advanced device add-on"), Q("Full premium platform")] },
  { feature: "MDM and MAM", cells: [Y(), Y(), Y()] },
  { feature: "App deployment and configuration profiles", cells: [Y(), Y(), Y()] },
  { feature: "Compliance policies", cells: [Y(), Y(), Y()] },
  { feature: "Conditional Access (Entra) integration", cells: [Y(), Y(), Y()] },
  { feature: "Cross-platform (Windows, iOS, Android, macOS)", cells: [Y(), Y(), Y()] },
  { feature: "Windows Autopilot provisioning", cells: [Y(), Y(), Y()] },
  { feature: "Microsoft Tunnel for MAM (per-app VPN, no enrolment)", cells: [N, Y(), Y()] },
  { feature: "Specialty and frontline device management", cells: [N, Y(), Y()] },
  { feature: "Firmware Over-the-Air (FOTA) updates", cells: [N, Y(), Y()] },
  { feature: "Remote Help", cells: [N, N, Y()] },
  { feature: "Endpoint Privilege Management (EPM)", cells: [N, N, Y()] },
  { feature: "Advanced Analytics", cells: [N, N, Y()] },
  { feature: "Enterprise App Management", cells: [N, N, Y()] },
  { feature: "Microsoft Cloud PKI", cells: [N, N, Y()] },
  { feature: "Threat defense (MTD)", cells: [Q("via Defender / partner"), Q("via Defender / partner"), Q("via Defender / partner")] },
  { feature: "Included with", cells: [Q("M365 E3/E5, EMS E3/E5"), Q("Add-on to Plan 1"), Q("Add-on to Plan 1")] },
  { feature: "Indicative list price (per user/mo)", cells: [Q("~$8"), Q("+~$4"), Q("+~$10")] },
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
    name: "Plan 1",
    position: "The UEM foundation",
    bestFor: ["Microsoft 365 organisations", "Core device and app management", "Teams that already own it in E3/E5"],
    additions: ["MDM / MAM", "Config and compliance policies", "Conditional Access and Autopilot"],
    verdict: "The UEM foundation.",
  },
  {
    name: "Plan 2",
    position: "Advanced device add-on",
    bestFor: ["Secure app access without enrolment", "Frontline and specialty devices", "Android firmware management"],
    additions: ["Microsoft Tunnel for MAM", "Specialty device management", "FOTA firmware updates"],
    verdict: "Advanced device scenarios.",
  },
  {
    name: "Intune Suite",
    position: "The complete platform",
    bestFor: ["Mature IT and security operations", "Teams wanting premium tooling bundled", "Three or more add-on components"],
    additions: ["Remote Help", "Endpoint Privilege Management", "Advanced Analytics", "Enterprise App Management", "Cloud PKI"],
    verdict: "The complete endpoint platform.",
    highlighted: true,
  },
];

const upgradePaths = [
  { from: "Plan 1 → Plan 2", title: "Foundation → advanced device scenarios", desc: "You unlock secure app access without enrolment (Tunnel for MAM), specialty and frontline device management, and firmware-over-the-air updates." },
  { from: "Plan 2 → Intune Suite", title: "Advanced → full premium platform", desc: "The Suite bundles Remote Help, Endpoint Privilege Management, Advanced Analytics, Enterprise App Management and Cloud PKI, roughly 30 to 40 percent cheaper than buying the add-ons individually." },
];

const deploymentOptions = [
  { icon: "cloud" as const, title: "Cloud-only (default)", body: "Pure Intune SaaS managed through the Microsoft Endpoint admin centre. The standard for new deployments and the right answer for greenfield estates." },
  { icon: "server" as const, title: "Co-managed with SCCM", body: "Run Configuration Manager and Intune side-by-side, gradually shifting workloads to the cloud at your pace. The route for established Microsoft estates modernising endpoints." },
  { icon: "layers" as const, title: "Intune + Zimperium MTD", body: "Pair Intune for management with Zimperium for on-device threat defense, with verdicts flowing into Intune compliance and Conditional Access." },
];

const faqs = [
  {
    question: "Do we already own Intune through Microsoft 365?",
    answer: "Likely yes. Intune Plan 1 is included in Microsoft 365 E3, E5 and EMS E3/E5. Plan 2 and the Intune Suite are separate add-ons. Microsoft also announced a July 2026 repackaging that adds Remote Help, Advanced Analytics and Intune Plan 2 to M365/EMS E3, Artiflex confirms exact entitlements during scoping.",
  },
  {
    question: "When does Plan 2 or the Intune Suite make sense?",
    answer: "Plan 2 is right when you need Microsoft Tunnel for MAM, frontline/specialty device management or FOTA firmware updates. The Intune Suite makes sense once you would otherwise buy three or more premium add-ons individually (Remote Help, EPM, Advanced Analytics, Enterprise App Management, Cloud PKI), the bundle is typically 30 to 40 percent cheaper.",
  },
  {
    question: "Does Intune include Mobile Threat Defense (MTD)?",
    answer: "Not natively. MTD is delivered through Microsoft Defender for Endpoint or a partner MTD such as Zimperium. Either way, threat verdicts flow into Intune compliance and Conditional Access for automatic access gating. Artiflex typically layers Zimperium on top for the most credible on-device, privacy-first detection.",
  },
  {
    question: "How does Intune compare to Hexnode for UAE customers?",
    answer: "If you are heavily standardised on Microsoft 365, Intune is usually the right choice, native integration, often-owned licensing, strong Windows management. If you want the best management outcome per dirham with on-premises deployment for PDPL and NESA, Hexnode often wins on TCO and flexibility. Artiflex picks the right answer during the assessment.",
  },
  {
    question: "Can Artiflex co-manage Intune with our team?",
    answer: "Yes. We offer fully managed, co-managed and assessment-only engagements, with enrolment design, Conditional Access policy, app packaging, compliance rules and reporting, all mapped to NESA, UAE PDPL and ISO 27001.",
  },
  {
    question: "Does Intune support BYOD without full device enrolment?",
    answer: "Yes, via Mobile Application Management (MAM). MAM applies data-protection policies to corporate apps without enrolling the personal device, ideal for contractor and BYOD populations under UAE PDPL.",
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

export default function MobileSecurityIntune() {
  const { open: openContact } = useContactModal();
  const [activePlan, setActivePlan] = useState(2);

  const pageUrl = "https://artiflexit.com/cybersecurity/mobile-security/microsoft-intune";
  const pageTitle = "Microsoft Intune | UEM & MDM UAE | Artiflex IT";
  const metaDescription =
    "Microsoft Intune, cloud-native UEM and MDM inside the Intune Suite and Entra. Deployed and managed by Artiflex IT for UAE enterprises.";

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={pageUrl} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: vendor.name,
          category: "Unified Endpoint Management",
          description: metaDescription,
          brand: { "@type": "Brand", name: "Microsoft" },
          url: pageUrl,
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://artiflexit.com/" },
            { "@type": "ListItem", position: 2, name: "Cybersecurity", item: "https://artiflexit.com/cybersecurity" },
            { "@type": "ListItem", position: 3, name: "Mobile Security", item: "https://artiflexit.com/cybersecurity/mobile-security" },
            { "@type": "ListItem", position: 4, name: vendor.name, item: pageUrl },
          ],
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
        })}
      </script>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#04101E] to-[#0A3D6B]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(40,181,225,0.18),transparent_55%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(27,138,199,0.10),transparent_60%)]" />

        <div className="relative z-10 border-b border-white/5">
          <div className="shell flex w-full items-center gap-2 pt-24 pb-3 text-[11px] text-slate-400 sm:pt-28">
            <Link to="/" className="transition-colors hover:text-white">Home</Link>
            <span className="text-slate-600">/</span>
            <Link to="/cybersecurity" className="transition-colors hover:text-white">Cybersecurity</Link>
            <span className="text-slate-600">/</span>
            <Link to="/cybersecurity/mobile-security" className="transition-colors hover:text-white">Mobile Security</Link>
            <span className="text-slate-600">/</span>
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
                Microsoft <span className="bg-gradient-to-r from-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">Intune</span>
              </h1>

              <p className="mt-5 max-w-xl font-display text-xl leading-snug text-[#9CD6EE] sm:text-2xl">{vendor.tagline}</p>

              <div className="mt-6 max-w-2xl border-l-2 border-[#28B5E1]/30 pl-5">
                <p className="text-base leading-relaxed text-slate-300 sm:text-lg">{vendor.description}</p>
              </div>

              <div className="mt-10 flex flex-col gap-5">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-2 sm:gap-x-3">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">Explore</span>
                  <Link to="/cybersecurity/mobile-security#vendor-matrix" className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:-translate-y-0.5 hover:border-[#28B5E1]/60 hover:bg-white/10 hover:text-white sm:text-[13px]">
                    Vendor Comparison
                    <svg className="h-3 w-3 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                  </Link>
                  <a href="#license-matrix" className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:-translate-y-0.5 hover:border-[#28B5E1]/60 hover:bg-white/10 hover:text-white sm:text-[13px]">
                    Compare Models
                    <svg className="h-3 w-3 opacity-50 transition-all group-hover:translate-y-0.5 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                  </a>
                  <Link to="/cybersecurity/mobile-security#gartner-comparison" className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:-translate-y-0.5 hover:border-[#28B5E1]/60 hover:bg-white/10 hover:text-white sm:text-[13px]">
                    Gartner-style Review
                    <svg className="h-3 w-3 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                  </Link>
                </div>

                <div>
                  <button type="button" onClick={openContact} className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#28B5E1] to-[#1B8AC7] px-8 py-3.5 text-sm font-semibold text-navy-deep shadow-[0_8px_30px_rgba(40,181,225,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(40,181,225,0.5)] sm:w-auto sm:text-base">
                    Request for quote
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.aside initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }} className="relative lg:col-span-5">
              <div className="relative mx-auto flex aspect-[4/3] max-w-md items-center justify-center overflow-hidden rounded-3xl border border-white/15 bg-white p-10 shadow-[0_30px_80px_-20px_rgba(3,16,28,0.8)] ring-1 ring-[#28B5E1]/10 sm:p-14">
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/40 to-transparent" />
                <img
                  src={vendor.logo}
                  alt={`${vendor.name} logo`}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = "none";
                    const fb = target.nextElementSibling as HTMLElement | null;
                    if (fb) fb.style.display = "flex";
                  }}
                  className="relative z-10 max-h-32 w-full max-w-[80%] object-contain"
                />
                <div className="relative z-10 hidden h-full w-full flex-col items-center justify-center text-center" style={{ display: "none" }}>
                  <p className="font-display text-3xl font-bold tracking-tight text-slate-900">Microsoft</p>
                  <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Intune</p>
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

      {/* WHAT IS INTUNE */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-[#28B5E1]/30 via-[#9CD6EE]/20 to-transparent blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute top-32 right-[-10rem] h-[26rem] w-[26rem] rounded-full bg-gradient-to-tr from-violet-300/15 via-fuchsia-200/15 to-cyan-200/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/3 h-[26rem] w-[26rem] rounded-full bg-gradient-to-tr from-[#1B8AC7]/20 via-[#28B5E1]/15 to-transparent blur-3xl" />

        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#28B5E1]/20 bg-white/60 px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7] backdrop-blur-xl shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#28B5E1] shadow-[0_0_8px_rgba(40,181,225,0.8)]" />
              Overview
            </span>
            <h2 className="mt-6 font-display text-3xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              What <span className="bg-gradient-to-r from-[#1B8AC7] via-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">Microsoft Intune</span> is
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
                <h3 className="font-display text-2xl font-bold leading-[1.1] text-white sm:text-3xl md:text-[2rem]">
                  Often already <br />
                  <span className="bg-gradient-to-r from-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">in your M365 licence</span>
                </h3>
                <p className="mt-5 text-sm leading-[1.7] text-white/80 sm:text-[15px]">
                  Intune Plan 1 ships with Microsoft 365 E3, E5 and EMS E3/E5. Many UAE customers already own UEM entitlement without realising it, the lowest-friction starting point in the entire market. Pair it with Zimperium for full UEM + MTD coverage.
                </p>
              </div>
            </div>
          </div>

          <ul className="relative mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-6 lg:grid-cols-4">
            {overviewCapabilities.map((item) => (
              <li key={item} className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-5 shadow-[0_6px_24px_-8px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-[#28B5E1]/40 hover:bg-white/80 hover:shadow-[0_14px_40px_-10px_rgba(40,181,225,0.25)]">
                <span aria-hidden="true" className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-tr from-[#28B5E1]/0 to-transparent blur-2xl transition-all duration-500 group-hover:from-[#28B5E1]/20" />
                <div className="relative flex items-start gap-3">
                  <span aria-hidden="true" className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#28B5E1] to-[#1B8AC7] text-white shadow-[0_4px_12px_-2px_rgba(40,181,225,0.5)]">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><path d="M4 10l4 4 8-8" /></svg>
                  </span>
                  <span className="text-[13.5px] font-medium leading-snug text-slate-800 sm:text-sm">{item}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHY INTUNE WINS */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(27,138,199,0.06),transparent_55%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Why it wins</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">What makes Intune the M365 default</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The strengths that show up most often in UAE deployments where Microsoft 365 is the existing standard.
            </p>
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
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                    <div className="overflow-hidden"><p className="mt-2.5 text-xs leading-relaxed text-slate-300 sm:text-sm">{s.desc}</p></div>
                  </div>
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
            <h2 className="font-display text-xl font-bold leading-tight text-white sm:text-2xl lg:text-[1.7rem]">
              Who should put <span className="bg-gradient-to-r from-[#28B5E1] to-[#7ad4f0] bg-clip-text text-transparent">Microsoft Intune</span> on the shortlist
            </h2>
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
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">What's inside Microsoft Intune</h2>
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

      {/* PLAN POSITIONING */}
      <section id="editions" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Choosing a plan</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Simplified positioning, which plan fits</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each plan targets a distinct need. Plan 1 is the prerequisite, Plan 2 and the Suite layer on top of it.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {planTiers.map((t, idx) => {
              const active = activePlan === idx;
              return (
                <button key={t.name} type="button" onClick={() => setActivePlan(idx)} aria-pressed={active}
                  className={`group relative overflow-hidden rounded-2xl border bg-white p-5 text-left transition-all duration-300 hover:-translate-y-0.5 ${
                    t.highlighted ? "border-amber-300 ring-1 ring-amber-200 shadow-[0_12px_36px_-12px_rgba(246,183,60,0.30)]" : "border-slate-200 shadow-sm hover:border-[#28B5E1]/40"
                  } ${active ? "scale-[1.02] ring-2 ring-[#28B5E1]/40" : ""}`}
                >
                  {t.highlighted && (
                    <span className="absolute -top-px left-5 inline-flex rounded-b-md bg-amber-400 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-amber-950">Recommended</span>
                  )}
                  <p className="mt-3 font-display text-lg font-bold text-slate-900">{t.name}</p>
                  <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#1B8AC7]">{t.position}</p>
                  <p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Best for</p>
                  <ul className="mt-1 space-y-1">
                    {t.bestFor.map((b) => (
                      <li key={b} className="flex gap-1.5 text-[12.5px] leading-snug text-slate-700"><span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#28B5E1]" />{b}</li>
                    ))}
                  </ul>
                  {t.additions && (
                    <>
                      <p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{t.name === "Plan 1" ? "Key capabilities" : "Main additions"}</p>
                      <ul className="mt-1 space-y-1">
                        {t.additions.map((a) => (
                          <li key={a} className="flex gap-1.5 text-[12.5px] leading-snug text-slate-700"><span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#28B5E1]" />{a}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  <p className="mt-4 border-t border-slate-200 pt-3 font-display text-[13px] font-bold italic text-slate-900">"{t.verdict}"</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* STRATEGIC UPGRADE PATH */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">The strategic view</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">The important difference between plans</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each step adds a different class of capability. Microsoft's own guidance: at three or more add-on components, the Suite is the cheaper choice.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="grid grid-cols-1 gap-4 bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-5 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE] sm:grid-cols-[1fr_2fr] sm:px-7 sm:text-[11px]">
              <span>Upgrade path</span>
              <span>What fundamentally changes</span>
            </div>
            {upgradePaths.map((u) => (
              <div key={u.from} className="grid grid-cols-1 gap-4 border-t border-[#0A3D6B]/20 px-5 py-4 transition-colors hover:bg-[#28B5E1]/[0.04] sm:grid-cols-[1fr_2fr] sm:px-7">
                <span className="font-display text-sm font-bold text-slate-900 sm:text-base">{u.from}</span>
                <span className="text-sm leading-relaxed text-slate-700 sm:text-[15px]"><span className="font-semibold text-[#1B8AC7]">{u.title}.</span> {u.desc}</span>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-sm leading-relaxed text-slate-600">
            Artiflex maps your M365 entitlements, device scenarios and security goals to the right plan during the assessment, and layers Zimperium for the mobile threat defense Intune does not provide natively.
          </p>
        </div>
      </section>

      {/* FULL LICENSE MATRIX */}
      <section id="license-matrix" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Licensing</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Microsoft Intune plan comparison</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Intune uses an add-on model. Plan 1 is the UEM foundation (and is included in Microsoft 365 E3/E5 and EMS). Plan 2 and the Intune Suite are add-ons to Plan 1.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + editions.length * 116) }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-4 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">Feature / Capability</th>
                    {editions.map((e, i) => (
                      <th key={e.name} className={`border-l border-white/15 px-2 py-3 sm:px-4 sm:py-4 text-center align-bottom font-display text-sm font-semibold text-white ${i === editions.length - 1 ? "bg-gradient-to-br from-amber-500/80 to-amber-600/80 text-amber-50" : ""}`}>
                        {i === editions.length - 1 && <span aria-hidden>★ </span>}{e.name}
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
                        const isHl = cIdx === row.cells.length - 1;
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
            Indicative pricing and feature mapping reflect Microsoft's published licensing and may change. Microsoft's announced July 2026 repackaging adds Remote Help, Advanced Analytics and Intune Plan 2 to M365/EMS E3. Intune does not include native MTD, threat defense is via Microsoft Defender for Endpoint or a partner such as Zimperium.
          </p>
        </div>
      </section>

      {/* DEPLOYMENT OPTIONS */}
      <section className="relative bg-white py-12 sm:py-16">
        <div className="shell">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">Deployment Options</p>
            <h2 className="font-display text-xl font-semibold leading-tight text-slate-900 sm:text-2xl">
              How we deliver Intune <span className="font-normal text-slate-500">across UAE customers</span>
            </h2>
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
              How Microsoft Intune fits your existing stack
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Intune's strength is how deeply it plugs into the Microsoft ecosystem you already run.
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
              Artiflex designs and documents every Intune deployment against the obligations that apply to your sector.
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
            <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">Deploying Microsoft Intune across the UAE</h2>
            <p className="mt-6 text-base leading-relaxed text-slate-200 sm:text-lg">
              For Microsoft-standardised organisations, Intune is frequently the right UEM foundation, and Artiflex deploys it end to end: enrolment design, Conditional Access policy, app packaging, compliance rules and reporting. Because Intune's threat defense relies on Defender or a partner, we typically layer Zimperium on top so the mobile programme is both fully managed and fully defended, mapped to NESA, UAE PDPL and ISO 27001.
            </p>

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
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Microsoft Intune questions we hear from UAE buyers</h2>
          </div>
          <div className="mt-10"><FAQAccordion items={faqs} /></div>
        </div>
      </section>

      <CTASection
        title="Get the most out of Microsoft Intune"
        description="Book a free mobile posture assessment and we will review your M365 estate, recommend the right UEM + MTD pairing, and share a three-year TCO comparison."
        primaryButton={{ text: "Book a free assessment", action: "modal" }}
        secondaryButton={{ text: "Compare mobile vendors", href: "/cybersecurity/mobile-security#vendor-matrix" }}
      />
    </>
  );
}
