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
  LockIcon,
  GearIcon,
  CloudIcon,
  ServerIcon,
  GridIcon,
  MonitorIcon,
  MessageIcon,
  PhoneIcon,
  SearchIcon,
  BarChartIcon,
  StarIcon,
  GlobeIcon,
} from "@/components/icons";

/* ───────── DATA ───────── */

const vendor = {
  name: "Sophos Mobile",
  vendorCompany: "Sophos · Artiflex Platinum Partner",
  bestFor: "Recommended UEM + MTD · Sophos-Aligned Estates",
  tagline: "Secure unified endpoint management, native to Sophos Central",
  description:
    "For UAE teams already standardised on Sophos, Sophos Mobile delivers UEM, MDM and mobile threat defense in the same cloud console as your firewall, endpoint protection, email security, XDR and MDR, managing iOS, iPadOS, Android, Windows 10/11 and macOS from one place. It is the only UEM that natively integrates with a leading next-generation endpoint platform, with Intercept X for Mobile bringing deep-learning MTD into the same user-based licence.",
  logo: "/logos/sophos.svg",
};

const overviewParagraphs = [
  "Sophos Mobile is a secure Unified Endpoint Management platform: one Sophos Central console to enrol, configure, secure and retire every device a business runs, phones, tablets, laptops and desktops across iOS, iPadOS, Android, Windows 10/11 and macOS. From it you push apps and content, enforce compliance and conditional access, separate corporate and personal data on BYOD via Android Enterprise Work Profile and iOS User Enrolment, and layer Intercept X for Mobile MTD into the same licence.",
  "What makes Sophos Mobile different is integration. It is the only UEM that natively integrates with a leading next-generation endpoint security platform, Sophos Intercept X, and shares Sophos Central with Sophos Firewall, Sophos Email, XDR and MDR. For organisations standardised on Sophos, that means one credential, one alert pipeline and Synchronized Security spanning mobile, endpoint, network and email.",
];

const overviewCapabilities = [
  "UEM, MDM and MTD covered in one console",
  "iOS, iPadOS, Android, Windows 10/11, macOS",
  "Cloud SaaS (Sophos Central) or on-premises self-managed",
  "User-based licensing, multiple devices per user",
  "BYOD via Work Profile and iOS User Enrolment",
  "Native Intercept X for Mobile (deep-learning MTD)",
  "Synchronized Security across mobile, endpoint and firewall",
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
    title: "One console for the whole stack",
    tag: "Sophos Central",
    desc: "Mobile, endpoint, firewall, email, XDR and MDR managed from a single cloud console with one credential and one alert pipeline. For lean IT teams, this replaces three or four vendor portals overnight.",
    tone: "sky",
    Icon: CloudIcon,
  },
  {
    title: "Endpoints and mobile that respond together",
    tag: "Synchronized Security",
    desc: "When a Sophos endpoint, firewall or mobile agent detects a compromise, the broader Sophos platform responds together, closing lateral movement in seconds rather than waiting on manual playbooks.",
    tone: "violet",
    Icon: ZapIcon,
  },
  {
    title: "Intercept X for Mobile inside the licence",
    tag: "Native MTD",
    desc: "Sophos's deep-learning engine applied to mobile: anti-malware, anti-phishing and web protection on Android, iOS and ChromeOS, included in the Advanced edition, not bolted on from a third party.",
    tone: "emerald",
    Icon: ShieldIcon,
  },
  {
    title: "Work Profile and iOS User Enrolment",
    tag: "BYOD-safe",
    desc: "Sophos Mobile secures personal and corporate-owned devices side by side. Business email and apps deploy without touching the user's private side, productivity without a privacy compromise.",
    tone: "rose",
    Icon: LockIcon,
  },
  {
    title: "Affordable, predictable licensing",
    tag: "User pricing",
    desc: "User-based licensing means a single licence covers a person's phone, tablet and other devices, straightforward to forecast and aligned with how teams actually work.",
    tone: "amber",
    Icon: LayersIcon,
  },
  {
    title: "UAE Sophos Platinum Partner escalation",
    tag: "Platinum support",
    desc: "Artiflex IT is a Sophos Platinum Partner, the highest tier in Sophos's UAE channel, so escalations land directly with Sophos engineering and you have access to advance product roadmaps.",
    tone: "slate",
    Icon: GearIcon,
  },
];

const whyWinsStats: { value: string; label: string; tone: "emerald" | "violet" | "sky" }[] = [
  { value: "1 console", label: "Mobile, endpoint, firewall, email, XDR and MDR in Sophos Central", tone: "emerald" },
  { value: "User-based", label: "Pricing covers multiple devices per user without device-count surprises", tone: "sky" },
  { value: "Leader", label: "2024 IDC MarketScape and 2022 Omdia Market Radar for mobile security", tone: "violet" },
];

const bestFitProfile = [
  "Existing Sophos Firewall or Intercept X customers who want Synchronized Security extended to the mobile estate",
  "Lean IT teams that want one cloud console for firewall, endpoint, mobile, email, MDR and XDR",
  "Mid-market UAE organisations needing UEM and integrated MTD from one vendor and one user-based licence",
  "BYOD-heavy environments needing strong personal-versus-corporate data separation",
  "Organisations already standardised on (or moving to) Sophos Central as their security hub",
  "SMB and mid-market customers recognised as IDC MarketScape Leader and Omdia Market Radar Leader",
  "UAE customers needing Platinum-tier Sophos support locally through Artiflex IT",
  "SOC teams adding mobile telemetry to Sophos XDR for unified threat hunting and IT operations",
  "Government, finance and healthcare organisations needing on-premises self-managed deployment for data residency",
  "Teams running Intune or Workspace ONE wanting Sophos MTD as the threat layer (Intercept X for Mobile standalone)",
];

const coreFeatures: { title: string; desc: string; Icon: React.FC<{ className?: string }> }[] = [
  { title: "Cross-platform UEM", desc: "iOS, iPadOS, Android, Windows 10/11 and macOS in one console.", Icon: GridIcon },
  { title: "Configuration profiles and policies", desc: "Granular OS settings and compliance enforcement.", Icon: GearIcon },
  { title: "App management", desc: "Install, remove, view apps; enterprise app store; allow-list / block-list.", Icon: LayersIcon },
  { title: "Office 365 app configuration", desc: "Managed deployment of Microsoft 365 mobile apps.", Icon: MonitorIcon },
  { title: "Intercept X for Mobile", desc: "Deep-learning MTD against malware, ransomware and PUAs.", Icon: ShieldIcon },
  { title: "Anti-phishing and web protection", desc: "Blocks malicious links and web filtering on mobile.", Icon: MessageIcon },
  { title: "BYOD modes", desc: "Android Enterprise Work Profile and iOS User Enrolment.", Icon: PhoneIcon },
  { title: "XDR integration", desc: "Android, iOS and ChromeOS data feed Sophos XDR for threat hunting.", Icon: SearchIcon },
  { title: "Synchronized Security", desc: "Automatic response across Sophos firewall, endpoint and mobile.", Icon: ZapIcon },
  { title: "Inventory and reporting", desc: "Fleet visibility and audit-ready compliance evidence.", Icon: BarChartIcon },
  { title: "Sophos Central management", desc: "Cloud console, no server installation required.", Icon: CloudIcon },
  { title: "On-premises self-managed", desc: "Alternative deployment for data-residency cases.", Icon: ServerIcon },
];

const trustSignals: { title: string; desc: string; Icon: React.FC<{ className?: string }> }[] = [
  { title: "IDC MarketScape Leader 2024", desc: "Recognised leader in modern endpoint security.", Icon: ShieldIcon },
  { title: "Omdia Market Radar Leader 2022", desc: "Leader for mobile and unified endpoint security.", Icon: StarIcon },
  { title: "Sophos Platinum Partner", desc: "Artiflex IT, the highest tier in Sophos's UAE channel.", Icon: GlobeIcon },
];

const integrations: { title: string; body: string }[] = [
  { title: "Sophos Central", body: "One console with Sophos Firewall, Intercept X endpoint, Sophos Email, XDR and MDR, with Synchronized Security across all." },
  { title: "Microsoft security", body: "Entra ID and Microsoft Intune App Protection connectors for Microsoft-centric estates." },
  { title: "SIEM & SOAR", body: "Streams mobile telemetry into Sophos XDR and third-party SIEM/SOAR for unified threat hunting." },
  { title: "Identity providers", body: "Entra ID and other IdPs for conditional access tied to device compliance state." },
  { title: "Apple & Google", body: "Apple Business Manager and Android Enterprise for zero-touch enrolment and managed app delivery." },
  { title: "Open APIs", body: "REST APIs for reporting, automation and integration with your wider security tooling." },
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

const editions = ["Standard", "Advanced", "Intercept X for Mobile"];
const recommendedIdx = 1;

const Y = (v = "✓"): LicCell => ({ value: v, type: "yes" });
const N: LicCell = { value: "✗", type: "no" };
const Q = (v: string): LicCell => ({ value: v, type: "qual" });

const licRows: LicRow[] = [
  { feature: "Primary positioning", cells: [Q("Core UEM / MDM"), Q("UEM + MTD"), Q("Standalone MTD")] },
  { feature: "Cross-platform UEM (iOS, Android, Windows, macOS)", cells: [Y(), Y(), N] },
  { feature: "Configuration profiles & compliance", cells: [Y(), Y(), N] },
  { feature: "App management & enterprise app store", cells: [Y(), Y(), N] },
  { feature: "Office 365 app configuration", cells: [Y(), Y(), N] },
  { feature: "BYOD (Android Work Profile, iOS User Enrolment)", cells: [Y(), Y(), N] },
  { feature: "Inventory, asset management & reporting", cells: [Y(), Y(), N] },
  { feature: "Intercept X for Mobile (deep-learning MTD)", cells: [N, Y(), Y()] },
  { feature: "Anti-malware / anti-ransomware / PUAs", cells: [N, Y(), Y()] },
  { feature: "Anti-phishing & web protection", cells: [N, Y(), Y()] },
  { feature: "XDR integration (mobile telemetry in Sophos XDR)", cells: [Q("Basic"), Y(), Y()] },
  { feature: "Synchronized Security with Sophos endpoint / firewall", cells: [Y(), Y(), Y()] },
  { feature: "Sophos Central cloud management", cells: [Y(), Y(), Y()] },
  { feature: "On-premises self-managed option", cells: [Y(), Y(), N] },
  { feature: "Licensing basis", cells: [Q("Per user"), Q("Per user"), Q("Per user / device")] },
  { feature: "Available in Sophos Central bundles", cells: [Y(), Y(), Y()] },
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
    position: "Core UEM & MDM",
    bestFor: ["Organisations needing UEM/MDM only", "Existing MTD via another vendor", "Sophos Central customers extending to mobile"],
    additions: ["Cross-platform UEM", "App, content & policy management", "BYOD enrolment modes"],
    verdict: "The Sophos UEM foundation.",
  },
  {
    name: "Advanced",
    position: "UEM + MTD in one",
    bestFor: ["Most Sophos-aligned organisations", "Teams wanting UEM and MTD from one vendor", "Mid-market UAE enterprises"],
    additions: ["Intercept X for Mobile (deep-learning MTD)", "Anti-phishing & web protection", "Full XDR integration"],
    verdict: "UEM and MTD in one user-based licence.",
    highlighted: true,
  },
  {
    name: "Intercept X for Mobile",
    position: "Standalone MTD",
    bestFor: ["Customers on another UEM (Intune, Workspace ONE)", "Adding Sophos MTD without changing UEM", "Layering MTD on unmanaged devices"],
    additions: ["Deep-learning malware detection", "Anti-phishing & web filtering", "XDR & Synchronized Security feed"],
    verdict: "Sophos MTD without the UEM swap.",
  },
];

const upgradePaths = [
  { from: "Standard → Advanced", title: "UEM → UEM + MTD", desc: "Intercept X for Mobile joins the same console, adding deep-learning anti-malware, anti-phishing and web protection in one user-based licence. For most Sophos-aligned organisations, this is the right starting edition." },
  { from: "Intercept X for Mobile → Advanced", title: "MTD-only → full UEM + MTD", desc: "You move from layering Sophos threat defense onto another UEM (Intune, Workspace ONE) to running both management and defense inside Sophos Central, consolidating consoles and reducing licence sprawl." },
  { from: "Advanced → Sophos Central bundle", title: "Standalone mobile → integrated Sophos platform", desc: "Sophos Mobile Advanced bundles with Intercept X for endpoints, Sophos Firewall, Sophos Email and Sophos MDR in one user-based licence, activating full Synchronized Security and a single security operations console." },
];

const deploymentOptions = [
  {
    icon: "cloud" as const,
    title: "Sophos Central (Cloud)",
    body: "Sophos-hosted SaaS console, zero server installation, instant updates and unified with the rest of your Sophos estate (firewall, endpoint, email, XDR, MDR). The default for most UAE deployments.",
  },
  {
    icon: "server" as const,
    title: "Self-managed (on-premises)",
    body: "For organisations with strict data-residency or air-gap requirements, Sophos Mobile is available as a self-managed on-premises deployment, full control of device and management data on home soil.",
  },
  {
    icon: "layers" as const,
    title: "Co-managed by Artiflex",
    body: "Artiflex operates Sophos Mobile on your behalf, fully managed or co-managed with your IT team. You keep ownership, we keep it running 24/7 and audit-ready against NESA and UAE PDPL.",
  },
];

const faqs = [
  {
    question: "Why does Artiflex recommend Sophos Mobile for Sophos-aligned customers?",
    answer: "When the firewall, endpoint and email layers are already Sophos, Sophos Mobile collapses UEM and MTD into the same Sophos Central console and Synchronized Security pipeline. One credential, one alert stream and one user-based licence. For lean IT teams, that is a measurable productivity gain on top of the security outcomes.",
  },
  {
    question: "Which edition do most customers land on?",
    answer: "Sophos Mobile Advanced. It bundles the UEM/MDM platform with Intercept X for Mobile MTD in a single user-based licence, which is the right outcome for most mid-market UAE organisations. Standard fits if you have another MTD already; standalone Intercept X for Mobile suits Intune or Workspace ONE customers wanting Sophos as the threat layer.",
  },
  {
    question: "Can Sophos Mobile run on-premises?",
    answer: "Yes. The default is Sophos Central cloud, but a self-managed on-premises deployment is available for government, finance and healthcare customers with strict data-residency or air-gap requirements under UAE PDPL and NESA.",
  },
  {
    question: "How does Sophos Mobile relate to Hexnode and Zimperium?",
    answer: "For organisations with no Sophos investment, Hexnode (UEM) plus Zimperium (MTD) remains our recommended best-of-breed pairing. For Sophos-aligned estates, Sophos Mobile Advanced delivers a similar UEM + MTD outcome from one vendor, one licence and one console, with the added benefit of Synchronized Security across the rest of your Sophos stack.",
  },
  {
    question: "Does Sophos Mobile integrate with my existing Sophos Firewall?",
    answer: "Yes, that is the central point. Sophos Mobile shares Sophos Central with Sophos Firewall, endpoint and email. Detections from one component drive Synchronized Security responses across the others, so a compromised mobile device can be isolated by the firewall and a compromised endpoint can trigger mobile policy actions automatically.",
  },
  {
    question: "Can we upgrade between editions later?",
    answer: "Yes. Sophos Mobile editions are designed for upgrade, moving from Standard to Advanced, or layering Intercept X for Mobile into the Sophos Central bundle, is straightforward and configuration carries forward. Artiflex maps the upgrade path during scoping so the next move is planned, not improvised.",
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

export default function MobileSecuritySophos() {
  const { open: openContact } = useContactModal();
  const [activeEdition, setActiveEdition] = useState(recommendedIdx);

  const pageUrl = "https://artiflexit.com/cybersecurity/mobile-security/sophos-mobile";
  const pageTitle = "Sophos Mobile | Secure UEM, MDM & MTD UAE | Artiflex IT";
  const metaDescription = "Sophos Mobile, secure Unified Endpoint Management with Intercept X for Mobile MTD, natively integrated with Sophos Central. Three editions compared. Delivered by Artiflex IT, Sophos Platinum Partner.";

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
          brand: { "@type": "Brand", name: "Sophos" },
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
                Sophos <span className="bg-gradient-to-r from-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">Mobile</span>
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
                  <p className="font-display text-3xl font-bold tracking-tight text-slate-900">Sophos</p>
                  <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Mobile</p>
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

      {/* WHAT IS SOPHOS MOBILE */}
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
                Sophos Mobile
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
                  Sophos Central,{" "}
                  <br />
                  <span className="bg-gradient-to-r from-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">
                    a UAE differentiator
                  </span>
                </h3>
                <p className="mt-5 text-sm leading-[1.7] text-white/80 sm:text-[15px]">
                  For lean UAE IT teams managing security across firewall, endpoint, email and now mobile, consolidating into a single cloud console is a measurable productivity win. As a Sophos Platinum Partner, Artiflex IT deploys Sophos Mobile into the same Central console that already runs your firewall and endpoint estate.
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

      {/* WHY SOPHOS MOBILE WINS */}
      <section id="why-wins" className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(27,138,199,0.06),transparent_55%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Why it wins</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              What makes Sophos Mobile the natural pick for Sophos shops
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The advantages that consistently land Sophos Mobile on the shortlist when there is an existing Sophos footprint, and what gives lean IT teams a measurable productivity boost.
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
            Hover any card to read the rationale. These are the strengths Artiflex sees most often when Sophos Mobile lands on a UAE shortlist, not the brochure list.
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
              <span className="bg-gradient-to-r from-[#28B5E1] to-[#7ad4f0] bg-clip-text text-transparent">Sophos Mobile</span>{" "}
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
              What's inside Sophos Mobile
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              The capabilities customers actually use day to day. Edition coverage varies, the full matrix is below.
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
              Sophos Mobile licence comparison
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Three editions mapped feature by feature, Standard for pure UEM/MDM, Advanced (recommended) for UEM and integrated MTD, and Intercept X for Mobile as a standalone MTD layer for non-Sophos UEMs.
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
                          i === recommendedIdx ? "bg-gradient-to-br from-amber-500/80 to-amber-600/80 text-amber-50" : ""
                        }`}
                      >
                        {i === recommendedIdx && <span aria-hidden>★ </span>}
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
                        const isRec = cIdx === recommendedIdx;
                        const color =
                          c.type === "yes"
                            ? "text-emerald-600 font-bold"
                            : c.type === "no"
                            ? "text-slate-300"
                            : "text-[#1B8AC7] font-semibold";
                        return (
                          <td
                            key={cIdx}
                            className={`border-l border-[#0A3D6B]/15 px-3 py-3 text-center align-middle text-[12.5px] ${color} ${isRec ? "bg-amber-50/40" : ""}`}
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
            Edition names and feature mapping reflect Sophos's current published packaging and may evolve. Sophos Mobile and Intercept X for Mobile are also available inside broader Sophos Central bundles alongside Intercept X endpoint protection, Sophos Firewall, Sophos Email and Sophos MDR. As a Sophos Platinum Partner, Artiflex confirms exact entitlements and pricing during scoping. A "✓" with a qualifier (e.g. <span className="font-semibold text-[#1B8AC7]">Basic</span>) indicates the capability is present at that level.
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
              Each edition is built for a different starting point, pure UEM, the full UEM + MTD outcome, or a focused mobile threat-defense layer for a non-Sophos UEM.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                      <p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{t.highlighted ? "Main additions" : "Key capabilities"}</p>
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
              The editions aren't just "more features". Each step represents a different commitment to the Sophos platform. Knowing where the inflection points sit prevents over- or under-buying.
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
            Artiflex maps your existing Sophos footprint, device estate and compliance obligations to the right edition during the assessment, so you pay for the platform you need today with a clear path to consolidating consoles as your Sophos investment grows.
          </p>
        </div>
      </section>

      {/* DEPLOYMENT OPTIONS */}
      <section className="relative bg-white py-12 sm:py-16">
        <div className="shell">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">Deployment Options</p>
            <h2 className="font-display text-xl font-semibold leading-tight text-slate-900 sm:text-2xl">
              How we deliver Sophos Mobile
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
              How Sophos Mobile fits your existing stack
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Sophos Mobile is built to extend the Sophos Central platform you already run and feed the tools around it.
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
              Artiflex designs and documents every Sophos Mobile deployment against the obligations that apply to your sector.
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
              Delivering Sophos Mobile across the UAE
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-200 sm:text-lg">
              Artiflex IT is a Sophos Platinum Partner, the highest tier in Sophos's UAE channel. We deploy Sophos Mobile end to end across the UAE, Oman and Saudi Arabia: assessment, edition selection, Sophos Central setup, enrolment design (Android Enterprise and iOS User Enrolment), Intercept X for Mobile policy, integration with your existing Sophos Firewall and endpoint estate to activate Synchronized Security, and ongoing managed services. Platinum status means escalations land directly with Sophos engineering and we have access to advance product roadmaps. Everything mapped to NESA, UAE PDPL, ISO 27001 and ADHICS, with audit-ready evidence delivered as part of the project. Fully managed, co-managed or assessment-only, your choice.
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
              Sophos Mobile questions we hear from UAE buyers
            </h2>
          </div>
          <div className="mt-10">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to evaluate Sophos Mobile?"
        description="Free mobile posture assessment, vendor-neutral edition sizing and a three-year TCO comparison. We will tell you when another platform is the better fit."
        primaryButton={{ text: "Request the assessment", action: "modal" }}
        secondaryButton={{ text: "Compare mobile vendors", href: "/cybersecurity/mobile-security#vendor-matrix" }}
      />
    </>
  );
}
