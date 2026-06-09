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
  GearIcon,
  CloudIcon,
  ServerIcon,
  GridIcon,
  PhoneIcon,
  MapPinIcon,
  BarChartIcon,
  StarIcon,
  GlobeIcon,
} from "@/components/icons";

/* ───────── DATA ───────── */

const vendor = {
  name: "Hexnode UEM",
  vendorCompany: "Mitsogo Inc.",
  bestFor: "Recommended UEM · Mid-market & Multi-OS",
  tagline: "Unified endpoint management without the enterprise tax",
  description:
    "For UAE teams managing a mix of company and personal devices, Hexnode UEM puts enrolment, security, app control and device retirement in one console, fast to deploy, simple to operate and genuinely cross-platform across iOS, Android, Windows, macOS, tvOS and rugged hardware. It is Artiflex IT's recommended UEM for mid-market and multi-OS environments.",
  logo: "/logos/Hexnode.png",
};

const overviewParagraphs = [
  "Hexnode UEM is a unified endpoint management platform: one console to enrol, configure, secure and retire every device a business runs, phones, tablets, laptops, desktops, rugged and kiosk hardware, across iOS, Android, Windows, macOS, tvOS and Fire OS. From it you push apps and content, enforce compliance and conditional access, and apply the MTD security controls that come into their own in the Ultra tier.",
  "A product of Mitsogo Inc. (founded 2013, San Francisco), it delivers that enterprise-grade control with far less cost and complexity, deployable in days, manageable without a team of specialists, and equally at home on corporate-owned and BYOD devices.",
];

const overviewCapabilities = [
  "UEM, MDM and MTD covered in one console",
  "iOS, Android, Windows, macOS, tvOS, Fire OS, rugged",
  "Cloud SaaS or full on-premises deployment",
  "Open API, clean Zimperium integration",
  "Zero-touch enrolment (ABM, Knox, Autopilot)",
  "Conditional access and policy-driven compliance",
  "Genie AI assistance in the Ultra tier",
  "NESA, UAE PDPL and ISO 27001 alignment",
];

const strengths: {
  title: string;
  desc: string;
  tag?: string;
  tone: "emerald" | "violet" | "amber" | "sky" | "rose" | "slate";
  Icon: React.FC<{ className?: string }>;
}[] = [
  {
    title: "Best value per device",
    tag: "TCO leader",
    desc: "The strongest total cost of ownership in the mid-market: full UEM capability without premium enterprise licensing. Pricing scales by edition so you pay for the tier you actually need.",
    tone: "emerald",
    Icon: ZapIcon,
  },
  {
    title: "Fast to deploy",
    tag: "Days, not months",
    desc: "Cloud-based and intuitive. Pilot to production in days, with prebuilt enrolment workflows for Apple Business Manager, Android Zero-Touch and Windows Autopilot.",
    tone: "sky",
    Icon: GearIcon,
  },
  {
    title: "Truly cross-platform",
    tag: "Six platforms",
    desc: "iOS, Android, Windows, macOS, tvOS, Fire OS and rugged devices in one console. No ecosystem lock-in and no fragmented toolchain across device types.",
    tone: "violet",
    Icon: LayersIcon,
  },
  {
    title: "Kiosk and rugged strength",
    tag: "Retail and field",
    desc: "Best-in-class single-app and multi-app kiosk with a branded launcher, plus rugged-device support for retail, logistics, warehousing and field operations.",
    tone: "amber",
    Icon: MonitorIcon,
  },
  {
    title: "BYOD without overreach",
    tag: "Privacy-respecting",
    desc: "Container and profile separation keeps corporate data governed while respecting personal privacy, an essential balance for UAE workplaces under PDPL.",
    tone: "rose",
    Icon: ShieldIcon,
  },
  {
    title: "Open and integrable",
    tag: "API-first",
    desc: "A clean API that plugs into your identity provider (Entra ID, Okta) and into Zimperium for a complete UEM + MTD programme, plus SCCM integration in the Ultra tier.",
    tone: "slate",
    Icon: LockIcon,
  },
];

const whyWinsStats: { value: string; label: string; tone: "emerald" | "violet" | "sky" }[] = [
  { value: "Days", label: "Pilot to production timeline for typical UAE deployments", tone: "emerald" },
  { value: "6 OSes", label: "iOS, Android, Windows, macOS, tvOS, Fire OS plus rugged", tone: "sky" },
  { value: "SaaS + On-prem", label: "Genuine deployment choice for PDPL and NESA data-residency needs", tone: "violet" },
];

const bestFitProfile = [
  "UAE mid-market and growing enterprises that want full UEM control without the cost and complexity of the heaviest suites",
  "Mixed-OS estates blending Apple, Android, Windows and macOS that want one console instead of three",
  "Retail chains, logistics fleets and field operations running kiosk and rugged-device deployments (point of sale, scanners, handhelds)",
  "Education and healthcare environments with shared devices and compliance-sensitive workflows",
  "iOS and Windows estates that need to be governed together from a single console (Enterprise edition and above)",
  "Government, finance and healthcare organisations needing on-premises deployment to satisfy UAE PDPL and NESA data-residency obligations",
  "BYOD-heavy programmes that need to protect corporate data without intruding on personal device use",
  "Teams already running Zimperium (or planning to) who want a clean UEM + MTD pairing through Hexnode's open API",
];

const coreFeatures: { title: string; desc: string; Icon: React.FC<{ className?: string }> }[] = [
  { title: "Zero-touch enrolment", desc: "Apple ABM, Android Zero-Touch and Windows Autopilot.", Icon: ZapIcon },
  { title: "App management", desc: "Deploy, update and remove store and in-house apps at scale.", Icon: GridIcon },
  { title: "Kiosk lockdown", desc: "Single-app and multi-app kiosk with a branded launcher.", Icon: MonitorIcon },
  { title: "Policy and compliance", desc: "Configuration profiles, restrictions and automated compliance actions.", Icon: ShieldIcon },
  { title: "Remote actions", desc: "Lock, wipe, locate, message and remote view across the fleet.", Icon: PhoneIcon },
  { title: "Content management", desc: "Distribute and control documents and media securely.", Icon: LayersIcon },
  { title: "Conditional access", desc: "Gate corporate resources on device compliance state.", Icon: LockIcon },
  { title: "Patch and OS updates", desc: "Orchestrate updates across operating systems.", Icon: GearIcon },
  { title: "Geofencing and location", desc: "Location-aware policies and asset tracking.", Icon: MapPinIcon },
  { title: "Reporting and audit", desc: "Fleet dashboards and audit-ready compliance evidence.", Icon: BarChartIcon },
];

const trustSignals: { title: string; desc: string; Icon: React.FC<{ className?: string }> }[] = [
  { title: "Cross-platform UEM", desc: "iOS, Android, Windows, macOS, tvOS and rugged devices from one console.", Icon: ShieldIcon },
  { title: "G2 High Performer", desc: "Consistently rated for value, support and ease of use in the mid-market.", Icon: StarIcon },
  { title: "Cloud or on-premises", desc: "Genuine deployment choice for UAE PDPL and NESA data-residency needs.", Icon: GlobeIcon },
];

const integrations: { title: string; body: string }[] = [
  { title: "Identity providers", body: "Entra ID, Okta and Google Workspace for SSO and conditional access tied to live device compliance." },
  { title: "Mobile threat defense", body: "Pairs with Zimperium or Lookout through Hexnode's open API to add the MTD layer Hexnode does not provide natively." },
  { title: "Apple, Google & Microsoft", body: "Apple Business Manager, Android Enterprise / Zero-Touch and Windows Autopilot for zero-touch enrolment." },
  { title: "Directory services", body: "Active Directory and LDAP for user and group-based policy and automated provisioning." },
  { title: "SIEM & reporting", body: "Exports inventory, posture and compliance data into your SIEM and reporting stack." },
  { title: "Open API & webhooks", body: "REST API and webhooks for custom automation, ticketing and bespoke integration." },
];

const compliance: { code: string; desc: string }[] = [
  { code: "NESA", desc: "UAE national cyber standards" },
  { code: "UAE PDPL", desc: "Personal data protection law" },
  { code: "ADHICS", desc: "Abu Dhabi healthcare infosec" },
  { code: "CBUAE", desc: "Central Bank of the UAE" },
  { code: "SAMA", desc: "Saudi financial cyber framework" },
  { code: "ISO 27001", desc: "Information security management" },
];

/* ───────── LICENSE COMPARISON ───────── */

type LicCell = { value: string; type: "yes" | "no" | "qual" };
type LicRow = { feature: string; cells: LicCell[] };

const editions = ["Express", "Pro", "Enterprise", "Ultimate", "Ultra"];

const Y = (v = "✓"): LicCell => ({ value: v, type: "yes" });
const N: LicCell = { value: "✗", type: "no" };
const Q = (v: string): LicCell => ({ value: v, type: "qual" });

const licRows: LicRow[] = [
  { feature: "Primary positioning", cells: [Q("Basic MDM"), Q("Advanced MDM"), Q("Basic UEM"), Q("Full UEM"), Q("Security-focused UEM")] },
  { feature: "Mobile Device Management", cells: [Y(), Y(), Y(), Y(), Y()] },
  { feature: "Android management", cells: [Y(), Y(), Y(), Y(), Y()] },
  { feature: "iOS / iPadOS management", cells: [Y(), Y(), Y(), Y(), Y()] },
  { feature: "Windows management", cells: [N, N, Q("✓ Basic"), Q("✓ Advanced"), Q("✓ Adv + Security")] },
  { feature: "macOS management", cells: [N, N, Q("✓ Basic"), Q("✓ Advanced"), Q("✓ Adv + Security")] },
  { feature: "tvOS / visionOS support", cells: [N, N, Y(), Y(), Y()] },
  { feature: "Kiosk management", cells: [Q("Basic"), Q("✓ Advanced"), Y(), Y(), Y()] },
  { feature: "Mobile App Management", cells: [Q("Basic"), Y(), Y(), Y(), Y()] },
  { feature: "Desktop App Management", cells: [N, N, Q("Limited"), Y(), Y()] },
  { feature: "Location tracking", cells: [Q("Basic"), Y(), Y(), Y(), Y()] },
  { feature: "Geofencing", cells: [N, N, Y(), Y(), Y()] },
  { feature: "Remote view", cells: [N, N, Y(), Y(), Y()] },
  { feature: "Remote control", cells: [N, N, N, Q("✓ Android"), Y()] },
  { feature: "Mobile OS updates", cells: [N, N, Y(), Y(), Y()] },
  { feature: "Desktop OS update management", cells: [N, N, N, Q("Limited"), Q("✓ Advanced")] },
  { feature: "Patch management", cells: [N, N, N, N, Y()] },
  { feature: "Windows Autopilot", cells: [N, N, N, Y(), Y()] },
  { feature: "Custom scripting", cells: [N, N, N, Y(), Y()] },
  { feature: "FileVault (macOS)", cells: [N, N, N, Y(), Y()] },
  { feature: "BitLocker (Windows)", cells: [N, N, N, N, Y()] },
  { feature: "Windows Defender configuration", cells: [N, N, N, N, Y()] },
  { feature: "Web content filtering", cells: [N, N, Q("iOS / Android"), Q("+ macOS"), Q("✓ Advanced")] },
  { feature: "Threat defense & security controls (MTD)", cells: [N, N, Q("Basic"), Q("Enhanced"), Q("Full security suite")] },
  { feature: "Directory integrations", cells: [N, N, Y(), Y(), Y()] },
  { feature: "Apple Business Manager (ABM)", cells: [N, Y(), Y(), Y(), Y()] },
  { feature: "Android Enterprise", cells: [N, Y(), Y(), Y(), Y()] },
  { feature: "Knox / Zero-touch enrollment", cells: [N, Y(), Y(), Y(), Y()] },
  { feature: "Entra ID / Office 365 enrollment", cells: [N, N, Y(), Y(), Y()] },
  { feature: "Okta SSO", cells: [N, N, N, Q("✓ Basic"), Q("✓ Adv Device Trust")] },
  { feature: "Hexnode Access", cells: [N, N, N, N, Y()] },
  { feature: "SCCM integration", cells: [N, N, N, N, Y()] },
  { feature: "Custom roles", cells: [N, N, Q("Basic"), Q("Level 1"), Q("Level 2")] },
  { feature: "Advanced reporting", cells: [N, N, Q("Basic"), Y(), Y()] },
  { feature: "Automation with Deploy", cells: [N, N, N, Y(), Y()] },
  { feature: "API support", cells: [N, Y(), Y(), Y(), Y()] },
  { feature: "Genie AI features", cells: [N, N, N, N, Y()] },
  { feature: "On-premises deployment option", cells: [Y(), Y(), Y(), Y(), Y()] },
  { feature: "Technicians included", cells: [Q("1"), Q("2"), Q("3"), Q("4"), Q("5")] },
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
    name: "Express",
    position: "Entry-level MDM",
    bestFor: ["Very small businesses", "Basic mobile management", "Simple kiosk deployments"],
    verdict: "Entry-level MDM.",
  },
  {
    name: "Pro",
    position: "Serious mobile-first MDM",
    bestFor: ["Android / iPad fleets", "Kiosk environments", "Retail and logistics"],
    additions: ["Advanced kiosk", "Knox / Zero-touch", "API access", "Advanced mobile controls"],
    verdict: "Serious mobile-first MDM.",
  },
  {
    name: "Enterprise",
    position: "Basic cross-platform UEM",
    bestFor: ["Organisations entering UEM", "Mixed mobile + desktop"],
    additions: ["Windows / macOS support", "Remote view", "Directory integrations", "Geofencing"],
    verdict: "Basic cross-platform UEM.",
  },
  {
    name: "Ultimate",
    position: "Operationally mature UEM",
    bestFor: ["Mature IT operations", "Automation-heavy teams", "Desktop management"],
    additions: ["Windows Autopilot", "Scripting", "FileVault", "Remote control", "Advanced reporting"],
    verdict: "Operationally mature UEM.",
  },
  {
    name: "Ultra",
    position: "Security-enhanced UEM",
    bestFor: ["Compliance-heavy organisations", "Security-focused enterprises", "Zero-trust initiatives"],
    additions: ["Patch management", "BitLocker", "Windows Defender controls", "Okta Device Trust", "Genie AI", "Hexnode Access"],
    verdict: "Security-enhanced UEM.",
    highlighted: true,
  },
];

const upgradePaths = [
  { from: "Pro → Enterprise", title: "MDM → UEM", desc: "You cross from managing phones and tablets to managing the whole estate. Windows and macOS join the console, with directory integration and remote view." },
  { from: "Enterprise → Ultimate", title: "UEM → advanced automation", desc: "The platform gains operational depth: Autopilot, scripting, FileVault, remote control and advanced reporting for teams that run endpoints at scale." },
  { from: "Ultimate → Ultra", title: "UEM → security platform", desc: "The biggest leap: patch management, BitLocker, Windows Defender control, Okta Device Trust, Hexnode Access and Genie AI turn the UEM into a compliance and zero-trust ready security platform." },
];

const deploymentOptions = [
  {
    icon: "cloud" as const,
    title: "Cloud SaaS (default)",
    body: "Hexnode-hosted multi-tenant SaaS. Fastest to stand up, no infrastructure footprint, evergreen feature releases. The default for most UAE mid-market customers.",
  },
  {
    icon: "server" as const,
    title: "On-premises",
    body: "Hexnode deployed in your own data centre. Full control of device and management data on home soil, a clear advantage for UAE PDPL, NESA, government, finance and healthcare workloads.",
  },
  {
    icon: "layers" as const,
    title: "Co-managed",
    body: "Artiflex operates the platform on your behalf, either as a fully managed service or co-managed with your IT team. You keep ownership, we keep it running 24/7 and audit-ready.",
  },
];

const faqs = [
  {
    question: "Why does Artiflex recommend Hexnode for the UAE mid-market?",
    answer: "Hexnode delivers full UEM capability at a fraction of the cost and complexity of the largest enterprise suites, deploys in days rather than months, is genuinely cross-platform (iOS, Android, Windows, macOS, tvOS, rugged) and pairs cleanly with Zimperium to complete the UEM + MTD picture. For most UAE mid-market fleets it produces the best management outcome per dirham.",
  },
  {
    question: "Which edition do most customers land on?",
    answer: "It depends on maturity. Mobile-only fleets land on Pro, mixed mobile-and-desktop estates on Enterprise, automation-led IT teams on Ultimate, and security-led organisations facing NESA, UAE PDPL or zero-trust obligations on Ultra. Artiflex maps your estate and compliance posture to the right edition during the assessment.",
  },
  {
    question: "Can Hexnode run on-premises?",
    answer: "Yes. Hexnode offers an on-premises deployment in addition to cloud SaaS. For government, finance, healthcare and other sensitive organisations with data-residency or cloud-hosting concerns under UAE PDPL and NESA, running Hexnode in your own data centre keeps device and management data fully under your control.",
  },
  {
    question: "How does Hexnode relate to Mobile Threat Defense (MTD)?",
    answer: "Hexnode is primarily UEM + MDM, with security controls that grow with the edition. Ultra adds patch management, BitLocker, Windows Defender configuration, advanced web content filtering, Okta Device Trust and Hexnode Access. Where dedicated, best-of-breed on-device threat detection is needed, Hexnode's open API integrates cleanly with Zimperium.",
  },
  {
    question: "What does an Artiflex deployment include?",
    answer: "Assessment, enrolment design, app packaging, policy build, identity integration, rollout and ongoing management, all mapped to NESA, UAE PDPL and ISO 27001. Fully managed, co-managed or assessment-only, your choice.",
  },
  {
    question: "Can we upgrade between editions later?",
    answer: "Yes. The editions are designed as a maturity ladder. Most customers start where they are today and upgrade as their estate or compliance obligations grow. Artiflex flags the inflection points (Pro → Enterprise, Enterprise → Ultimate, Ultimate → Ultra) so you only pay for the tier you genuinely need.",
  },
];

/* ───────── TONE MAPS (mirrors firewall vendor detail) ───────── */

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

export default function MobileSecurityHexnode() {
  const { open: openContact } = useContactModal();
  const [activeEdition, setActiveEdition] = useState(4);

  const pageUrl = "https://artiflexit.com/cybersecurity/mobile-security/hexnode";
  const pageTitle = "Hexnode UEM | Unified Endpoint Management UAE | Artiflex IT";
  const metaDescription = "Hexnode UEM, agile, value-led unified endpoint management and MDM for UAE enterprises. Artiflex IT recommended UEM. Five editions compared, features, benefits and deployment.";

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
          brand: { "@type": "Brand", name: vendor.vendorCompany },
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
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-transparent to-[#28B5E1]" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-[#28B5E1]">
                  {vendor.bestFor}
                </span>
              </div>

              <p className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                {vendor.vendorCompany}
              </p>

              <h1 className="mt-3 font-display text-4xl font-bold leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]">
                Hexnode <span className="bg-gradient-to-r from-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">UEM</span>
              </h1>

              <p className="mt-5 max-w-xl font-display text-xl leading-snug text-[#9CD6EE] sm:text-2xl">
                {vendor.tagline}
              </p>

              <div className="mt-6 max-w-2xl border-l-2 border-[#28B5E1]/30 pl-5">
                <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
                  {vendor.description}
                </p>
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
                  <button
                    type="button"
                    onClick={openContact}
                    className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#28B5E1] to-[#1B8AC7] px-8 py-3.5 text-sm font-semibold text-navy-deep shadow-[0_8px_30px_rgba(40,181,225,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(40,181,225,0.5)] sm:w-auto sm:text-base"
                  >
                    Request for quote
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
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
                <div
                  className="relative z-10 hidden h-full w-full flex-col items-center justify-center text-center"
                  style={{ display: "none" }}
                >
                  <p className="font-display text-3xl font-bold tracking-tight text-slate-900">Hexnode</p>
                  <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">UEM</p>
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

      {/* WHAT IS HEXNODE UEM */}
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
              What{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] via-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">
                Hexnode UEM
              </span>{" "}
              is
            </h2>
          </div>

          <div className="relative mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
            <div className="group relative flex flex-col justify-center overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-7 shadow-[0_10px_40px_-10px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-10px_rgba(40,181,225,0.20)] sm:p-9 lg:col-span-2">
              <span aria-hidden="true" className="pointer-events-none absolute -top-16 -right-12 h-40 w-40 rounded-full bg-gradient-to-br from-[#28B5E1]/15 to-transparent blur-2xl" />
              <span aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-gradient-to-tr from-[#1B8AC7]/15 to-transparent blur-2xl" />
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/40 to-transparent" />
              <div className="relative space-y-5">
                {overviewParagraphs.map((p, i) => (
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
                  On-premises,{" "}
                  <br />
                  <span className="bg-gradient-to-r from-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">
                    a UAE differentiator
                  </span>
                </h3>
                <p className="mt-5 text-sm leading-[1.7] text-white/80 sm:text-[15px]">
                  Hexnode runs as a full on-premises deployment or cloud SaaS. For government, finance and healthcare organisations with data-residency concerns under UAE PDPL and NESA, keeping device and management data in your own data centre is a genuine differentiator versus cloud-only competitors.
                </p>
              </div>
            </div>
          </div>

          <ul className="relative mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-6 lg:grid-cols-4">
            {overviewCapabilities.map((item) => (
              <li
                key={item}
                className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-5 shadow-[0_6px_24px_-8px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-[#28B5E1]/40 hover:bg-white/80 hover:shadow-[0_14px_40px_-10px_rgba(40,181,225,0.25)]"
              >
                <span aria-hidden="true" className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-tr from-[#28B5E1]/0 to-transparent blur-2xl transition-all duration-500 group-hover:from-[#28B5E1]/20" />
                <div className="relative flex items-start gap-3">
                  <span aria-hidden="true" className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#28B5E1] to-[#1B8AC7] text-white shadow-[0_4px_12px_-2px_rgba(40,181,225,0.5)]">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                      <path d="M4 10l4 4 8-8" />
                    </svg>
                  </span>
                  <span className="text-[13.5px] font-medium leading-snug text-slate-800 sm:text-sm">{item}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHY HEXNODE WINS */}
      <section id="why-wins" className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(27,138,199,0.06),transparent_55%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Why it wins</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              What makes Hexnode our recommended UEM
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The advantages that produce the best management outcome per dirham for the UAE mid-market, with a roadmap that scales from kiosks to zero-trust.
            </p>
          </div>

          <div className="relative mx-auto max-w-4xl px-5 sm:px-6">
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {whyWinsStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: 0.05 * i }}
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#1E4E73] via-[#143E62] to-[#042542] px-6 py-7 shadow-md"
                >
                  <p className={`font-display text-2xl font-bold leading-none sm:text-2xl ${statToneText[stat.tone]}`}>
                    {stat.value}
                  </p>
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
                <motion.div
                  key={s.title}
                  tabIndex={0}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.05 * i }}
                  className={`group rounded-xl border border-white/10 bg-gradient-to-br from-[#04101E] to-[#0A3D6B] p-4 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/40 hover:shadow-lg focus-within:border-[#28B5E1]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#28B5E1]/40 ${isOrphan ? "lg:col-span-2" : ""}`}
                >
                  <div className="flex items-stretch gap-2.5">
                    <span className={`flex w-11 shrink-0 items-center justify-center rounded-lg border ${tone.iconBox}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      {s.tag && (
                        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${tone.tag}`}>
                          {s.tag}
                        </span>
                      )}
                      <h3 className="mt-1.5 font-display text-sm font-semibold text-white sm:text-base">{s.title}</h3>
                    </div>
                  </div>
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="mt-2.5 text-xs leading-relaxed text-slate-300 sm:text-sm">{s.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-slate-600 sm:mt-12 sm:text-base">
            Hover any card to read the rationale. These are the strengths Artiflex sees most often in UAE deployments, not the brochure list.
          </p>
        </div>
      </section>

      {/* BEST FIT PROFILE */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#04101E] to-[#020617] py-12 sm:py-16">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.10),transparent_60%)]" />
        <div className="shell relative">
          <div className="border-b border-white/10 pb-5">
            <h2 className="font-display text-xl font-bold leading-tight text-white sm:text-2xl lg:text-[1.7rem]">
              Who should put{" "}
              <span className="bg-gradient-to-r from-[#28B5E1] to-[#7ad4f0] bg-clip-text text-transparent">Hexnode UEM</span>{" "}
              on the shortlist
            </h2>
          </div>

          <ul className="mt-6 grid gap-2 sm:mt-8 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-2.5">
            {bestFitProfile.map((p) => (
              <li
                key={p}
                className="group relative flex items-start gap-3 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/30 hover:bg-white/[0.05]"
              >
                <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#28B5E1]/15 text-[#28B5E1] ring-1 ring-inset ring-[#28B5E1]/25 transition-colors group-hover:bg-[#28B5E1] group-hover:text-white group-hover:ring-[#28B5E1]">
                  <CheckIcon className="h-3 w-3" />
                </span>
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
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              What's inside Hexnode UEM
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              The capabilities customers actually use day to day, beyond the marketing list. Edition coverage varies, the full matrix is below.
            </p>
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

      {/* FULL LICENSE MATRIX */}
      <section id="license-matrix" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Licensing</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Full Hexnode licence comparison
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Five editions, from Express through Ultra, mapped feature by feature. Licence the capability you need and nothing you don't.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + editions.length * 116) }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-4 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">
                      Feature / Capability
                    </th>
                    {editions.map((e, i) => (
                      <th
                        key={e}
                        className={`border-l border-white/15 px-2 py-3 sm:px-4 sm:py-4 text-center align-bottom font-display text-sm font-semibold text-white ${
                          i === editions.length - 1 ? "bg-gradient-to-br from-amber-500/80 to-amber-600/80 text-amber-50" : ""
                        }`}
                      >
                        {i === editions.length - 1 && <span aria-hidden>★ </span>}
                        {e}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {licRows.map((row, rIdx) => (
                    <tr key={row.feature} className={`border-t border-[#0A3D6B]/15 transition-colors hover:bg-[#28B5E1]/[0.04] ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`}>
                      <th scope="row" className={`sticky left-0 z-10 px-4 py-3 align-middle font-display text-[13px] font-semibold text-slate-900 ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                        {row.feature}
                      </th>
                      {row.cells.map((c, cIdx) => {
                        const isUltra = cIdx === row.cells.length - 1;
                        const color =
                          c.type === "yes"
                            ? "text-emerald-600 font-bold"
                            : c.type === "no"
                            ? "text-slate-300"
                            : "text-[#1B8AC7] font-semibold";
                        return (
                          <td
                            key={cIdx}
                            className={`border-l border-[#0A3D6B]/15 px-3 py-3 text-center align-middle text-[12.5px] ${color} ${isUltra ? "bg-amber-50/40" : ""}`}
                          >
                            {c.value}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-xs leading-relaxed text-slate-500 sm:text-sm">
            Feature availability reflects Hexnode's published edition tiers and may evolve. Artiflex confirms the exact entitlements for your licensed edition during scoping. A "✓" with a qualifier (e.g. <span className="font-semibold text-[#1B8AC7]">Basic</span>, <span className="font-semibold text-[#1B8AC7]">Advanced</span>) indicates the capability is present at that level.
          </p>
        </div>
      </section>

      {/* EDITION POSITIONING (simplified) */}
      <section id="editions" className="relative scroll-mt-20 bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Choosing an edition</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Simplified positioning, which edition fits
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each edition is built for a distinct stage of endpoint maturity. Here is how to read them, and the buyer each was designed for.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {editionTiers.map((t, idx) => {
              const active = activeEdition === idx;
              return (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setActiveEdition(idx)}
                  aria-pressed={active}
                  className={`group relative overflow-hidden rounded-2xl border bg-white p-5 text-left transition-all duration-300 hover:-translate-y-0.5 ${
                    t.highlighted
                      ? "border-amber-300 ring-1 ring-amber-200 shadow-[0_12px_36px_-12px_rgba(246,183,60,0.30)]"
                      : "border-slate-200 shadow-sm hover:border-[#28B5E1]/40"
                  } ${active ? "scale-[1.02] ring-2 ring-[#28B5E1]/40" : ""}`}
                >
                  {t.highlighted && (
                    <span className="absolute -top-px left-5 inline-flex rounded-b-md bg-amber-400 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-amber-950">
                      Recommended
                    </span>
                  )}
                  <p className="mt-3 font-display text-lg font-bold text-slate-900">{t.name}</p>
                  <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#1B8AC7]">
                    {t.position}
                  </p>
                  <p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Best for</p>
                  <ul className="mt-1 space-y-1">
                    {t.bestFor.map((b) => (
                      <li key={b} className="flex gap-1.5 text-[12.5px] leading-snug text-slate-700">
                        <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#28B5E1]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  {t.additions && (
                    <>
                      <p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Main additions</p>
                      <ul className="mt-1 space-y-1">
                        {t.additions.map((a) => (
                          <li key={a} className="flex gap-1.5 text-[12.5px] leading-snug text-slate-700">
                            <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#28B5E1]" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  <p className="mt-4 border-t border-slate-200 pt-3 font-display text-[13px] font-bold italic text-slate-900">
                    "{t.verdict}"
                  </p>
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
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              The important difference between editions
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              The editions are not just "more features". Each major jump changes what the platform fundamentally is. Knowing where these inflection points sit prevents over- or under-buying.
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
                <span className="text-sm leading-relaxed text-slate-700 sm:text-[15px]">
                  <span className="font-semibold text-[#1B8AC7]">{u.title}.</span> {u.desc}
                </span>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-sm leading-relaxed text-slate-600">
            Artiflex maps your maturity, device mix and compliance obligations to the right edition during the assessment, so you pay for the platform you need today with a clear path to the next tier as you grow.
          </p>
        </div>
      </section>

      {/* DEPLOYMENT OPTIONS */}
      <section className="relative bg-white py-12 sm:py-16">
        <div className="shell">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">Deployment Options</p>
            <h2 className="font-display text-xl font-semibold leading-tight text-slate-900 sm:text-2xl">
              How we deliver Hexnode
              <span className="font-normal text-slate-500"> across UAE customers</span>
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {deploymentOptions.map((opt) => {
              const Icon = opt.icon === "server" ? ServerIcon : opt.icon === "layers" ? LayersIcon : CloudIcon;
              return (
                <div key={opt.title} className="rounded-xl border border-slate-200 bg-white p-5 transition-colors duration-300 hover:border-slate-300">
                  <div className="flex items-center gap-2.5">
                    <span aria-hidden className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500">
                      <Icon className="h-4 w-4" />
                    </span>
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
              How Hexnode fits your existing stack
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Hexnode is built to plug into the identity, security and enrolment services you already run, rather than replace them.
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
              Artiflex designs and documents every Hexnode deployment against the obligations that apply to your sector.
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
            <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
              Delivering Hexnode UEM across the UAE
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-200 sm:text-lg">
              We recommend Hexnode because, for most of the UAE organisations we serve, it produces the best management outcome per dirham. We handle assessment, enrolment design, app packaging, policy build, identity integration, rollout and ongoing management, with everything mapped to NESA, UAE PDPL and ISO 27001. Fully managed, co-managed or assessment-only, your choice.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#28B5E1] px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:bg-white sm:text-base"
              >
                Talk to our Consultant
              </Link>
              <Link
                to="/cybersecurity/mobile-security"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-[#28B5E1]/50 hover:bg-white/10 sm:text-base"
              >
                Back to Mobile Security
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Frequently asked</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Hexnode UEM questions we hear from UAE buyers
            </h2>
          </div>
          <div className="mt-10">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to evaluate Hexnode UEM?"
        description="Free mobile posture assessment, vendor-neutral edition sizing and a three-year TCO comparison. We will tell you when another platform is the better fit."
        primaryButton={{ text: "Request the assessment", action: "modal" }}
        secondaryButton={{ text: "Compare mobile vendors", href: "/cybersecurity/mobile-security#vendor-matrix" }}
      />
    </>
  );
}
