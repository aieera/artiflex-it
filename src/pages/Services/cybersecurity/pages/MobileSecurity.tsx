import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";

/* ───────── PLATFORM LINEUP (HONEYCOMB) ───────── */

const platforms = [
  { slug: "hexnode", name: "Hexnode", logo: "/logos/Hexnode.png" },
  { slug: "zimperium", name: "Zimperium", logo: "/logos/Zimperium.png" },
  { slug: "sophos-mobile", name: "Sophos Mobile", logo: "/logos/sophos.svg" },
  { slug: "jamf", name: "Jamf", logo: "/logos/Jamf.png" },
  { slug: "intune", name: "Microsoft Intune", logo: "/logos/microsoft.svg" },
  { slug: "omnissa", name: "Omnissa Workspace ONE", logo: "/logos/Workspace ONE.webp" },
  { slug: "lookout", name: "Lookout", logo: "/logos/Lookout.png" },
];

/* ───────── UEM vs MTD ───────── */

const layers = [
  {
    abbr: "UEM",
    title: "Unified Endpoint Management",
    intro:
      "Enrol, configure, secure and retire every endpoint from one console: mobile, tablet, laptop, rugged and kiosk.",
    bullets: [
      "Device enrolment and zero-touch provisioning",
      "App lifecycle and content management",
      "Compliance policy and conditional access",
      "Remote lock, wipe and configuration",
      "OS patch and update orchestration",
    ],
    vendorsLine:
      "Vendors: Hexnode · Microsoft Intune · Jamf · Omnissa Workspace ONE",
    cta: "Explore Hexnode",
    href: "/cybersecurity/mobile-security/hexnode",
  },
  {
    abbr: "MTD",
    title: "Mobile Threat Defense",
    intro:
      "Continuously assess on-device risk and block threats UEM alone cannot see across device, network, app and phishing vectors.",
    bullets: [
      "Phishing and smishing protection",
      "Malicious and sideloaded app detection",
      "Network and man-in-the-middle defense",
      "OS and device exploit detection",
      "App hardening and runtime protection",
    ],
    vendorsLine: "Vendors: Zimperium · Lookout",
    cta: "Explore Zimperium",
    href: "/cybersecurity/mobile-security/zimperium",
  },
];

/* ───────── VENDOR COMPARISON MATRIX ───────── */

type StarCell = { stars: number; note: string };
type VerdictCell = { recommended?: boolean; rank?: string; text: string };
type MatrixRow =
  | { label: string; type: "text"; cells: string[] }
  | { label: string; type: "stars"; cells: StarCell[] }
  | { label: string; type: "verdict"; cells: VerdictCell[] };

const matrixVendors = [
  { name: "Hexnode", featured: true },
  { name: "Zimperium", featured: true },
  { name: "Sophos Mobile", featured: true },
  { name: "Jamf" },
  { name: "Microsoft Intune" },
  { name: "Omnissa Workspace ONE" },
  { name: "Lookout" },
];

const matrixRows: MatrixRow[] = [
  {
    label: "Category",
    type: "text",
    cells: ["UEM", "MTD + App Protection", "UEM + MTD", "UEM + MTD (Apple)", "UEM", "UEM", "MTD"],
  },
  {
    label: "Founded / Heritage",
    type: "text",
    cells: [
      "2013, Mitsogo Inc. (San Francisco)",
      "2010. Liberty Strategic Capital since 2022.",
      "Sophos. UEM native to Sophos Central.",
      "2002, Minneapolis. Apple-only pioneer.",
      "Microsoft, Windows Intune 2011",
      "AirWatch 2003, VMware, Omnissa 2024",
      "2007. Enterprise pure-play since 2023.",
    ],
  },
  {
    label: "Platform Coverage",
    type: "stars",
    cells: [
      { stars: 5, note: "All major OS plus kiosk and rugged" },
      { stars: 4, note: "iOS, Android, ChromeOS" },
      { stars: 4, note: "iOS, iPadOS, Android, Windows, macOS" },
      { stars: 3, note: "Apple only (iOS, macOS, tvOS)" },
      { stars: 5, note: "Windows, iOS, Android, macOS, Linux" },
      { stars: 5, note: "Broadest: mobile, desktop, rugged, server, IoT" },
      { stars: 4, note: "iOS, Android, ChromeOS" },
    ],
  },
  {
    label: "Threat Defense Depth",
    type: "stars",
    cells: [
      { stars: 3, note: "Pairs with dedicated MTD" },
      { stars: 5, note: "Best-in-class. On-device ML, zero-day detection." },
      { stars: 4, note: "Native Intercept X for Mobile deep-learning MTD" },
      { stars: 4, note: "Jamf Protect, Apple-scoped" },
      { stars: 3, note: "Via Defender for Endpoint add-on" },
      { stars: 3, note: "Via partner MTD integration" },
      { stars: 5, note: "Best-in-class. AI-first, largest mobile dataset." },
    ],
  },
  {
    label: "Ease of Management",
    type: "stars",
    cells: [
      { stars: 5, note: "Simplest. Fast deploy, intuitive console." },
      { stars: 4, note: "zConsole, clear policy model" },
      { stars: 5, note: "Single Sophos Central console for the stack" },
      { stars: 5, note: "Excellent for Apple admins" },
      { stars: 4, note: "Powerful, M365 learning curve" },
      { stars: 4, note: "Capable, enterprise-scale" },
      { stars: 4, note: "Console-driven, simple" },
    ],
  },
  {
    label: "BYOD / Privacy",
    type: "stars",
    cells: [
      { stars: 4, note: "Container and profile separation" },
      { stars: 5, note: "Privacy-first. On-device, no traffic routed out." },
      { stars: 5, note: "Work Profile and iOS User Enrolment" },
      { stars: 4, note: "Account-driven enrolment" },
      { stars: 4, note: "MAM without enrolment" },
      { stars: 5, note: "Strong BYOD container" },
      { stars: 4, note: "Protects unmanaged devices" },
    ],
  },
  {
    label: "Integration Ecosystem",
    type: "stars",
    cells: [
      { stars: 4, note: "Open API, integrates Zimperium" },
      { stars: 5, note: "Plugs into all major UEMs" },
      { stars: 5, note: "Synchronized Security across Sophos Central" },
      { stars: 5, note: "Apple-native plus Jamf Marketplace" },
      { stars: 5, note: "Deepest in M365. Entra, Defender, Conditional Access." },
      { stars: 5, note: "Broad partner ecosystem" },
      { stars: 4, note: "Feeds UEM and SIEM" },
    ],
  },
  {
    label: "Total Cost of Ownership",
    type: "stars",
    cells: [
      { stars: 5, note: "Best value. Strongest mid-market $/device." },
      { stars: 4, note: "Competitive per-device MTD" },
      { stars: 5, note: "User-based licence covering multiple devices" },
      { stars: 4, note: "Per-device, Apple-focused" },
      { stars: 5, note: "Bundled in M365 E3/E5" },
      { stars: 3, note: "Premium enterprise tiers" },
      { stars: 4, note: "Per-user MTD subscription" },
    ],
  },
  {
    label: "Best Suited For",
    type: "text",
    cells: [
      "Mid-market and multi-OS value buyers",
      "Regulated, high-risk mobile fleets",
      "Sophos-standardised estates wanting one console",
      "Apple-heavy and education fleets",
      "Microsoft-first enterprises",
      "Large, mixed-OS enterprises",
      "Unmanaged and contractor devices",
    ],
  },
  {
    label: "Strategic Verdict",
    type: "verdict",
    cells: [
      { recommended: true, text: "Recommended UEM. Best value, fastest deployment, multi-OS and kiosk strength." },
      { recommended: true, text: "Recommended MTD. On-device privacy, ML zero-day detection, app shielding." },
      { recommended: true, text: "Strong UEM plus native MTD for estates standardised on Sophos Central." },
      { text: "Best-of-breed for pure Apple environments." },
      { text: "Strong UEM for M365 estates; MTD needs a layer." },
      { text: "Widest coverage. Fits complex enterprise estates." },
      { text: "Excellent dedicated MTD, especially for unmanaged devices." },
    ],
  },
];

/* ───────── DETAILED VENDOR CARDS ───────── */

type VendorCard = { id?: string; name: string; best: string; strength: string; watch: string; logo?: string };

const vendors: VendorCard[] = [
  {
    id: "hexnode",
    name: "Hexnode UEM",
    best: "Best Value Mid-Market UEM (Recommended)",
    strength:
      "A product of Mitsogo (founded 2013), Hexnode built its reputation as the agile, value-led UEM, simple to operate, fast to deploy and strong where others are weak: kiosk mode, rugged devices and flexible cross-platform management across iOS, Android, Windows, macOS and tvOS. Best dollar-per-device in the mid-market, with an open API that integrates cleanly with Zimperium for threat defense.",
    watch:
      "Not positioned for the very largest, deeply Microsoft-integrated estates where Intune's native Entra and Conditional Access wiring wins. It pairs with a dedicated MTD rather than supplying deep threat defense itself.",
    logo: "/logos/Hexnode.png",
  },
  {
    id: "zimperium",
    name: "Zimperium",
    best: "Best On-Device Mobile Threat Defense (Recommended)",
    strength:
      "Founded 2010 and backed by Liberty Strategic Capital since 2022, Zimperium pioneered on-device, machine-learning mobile threat defense (zIPS / MTD). Detection runs locally on the device, preserving privacy and working offline, across device, network, phishing and malicious-app vectors, with zero-day detection via its z9 engine. MAPS adds in-app protection (shielding and runtime checks) for organisations that build their own apps. Integrates with every major UEM.",
    watch:
      "It is MTD, not UEM. It defends devices but does not enrol or manage them, so it is deployed alongside a UEM such as Hexnode or Intune.",
    logo: "/logos/Zimperium.png",
  },
  {
    id: "sophos-mobile",
    name: "Sophos Mobile",
    best: "Best for Sophos-Standardised Estates (Recommended)",
    strength:
      "Sophos Mobile delivers Unified Endpoint Management plus Mobile Threat Defense from the same Sophos Central console as Sophos Firewall, Intercept X and email security. It manages iOS, Android, Windows and macOS, with BYOD containerisation and per-app management, and Intercept X for Mobile brings deep-learning MTD into the same user-based licence. Synchronized Security means mobile, endpoint and network respond together. A strong fit for organisations already standardised on Sophos Central.",
    watch:
      "UEM breadth is narrower than dedicated leaders such as Intune or Workspace ONE for very large, heterogeneous fleets. The value is highest when Sophos is already the security hub.",
    logo: "/logos/sophos.svg",
  },
  {
    id: "jamf",
    name: "Jamf",
    best: "Best for Apple Environments",
    strength:
      "Founded 2002, Jamf is the Apple device-management specialist. Jamf Pro delivers deep, same-day support for every Apple OS feature, while Jamf Protect adds Apple-scoped MTD and endpoint security. The default choice for Apple-heavy enterprises and education.",
    watch:
      "Apple-only by design, not a fit for mixed Windows or Android fleets, where a cross-platform UEM is required.",
    logo: "/logos/Jamf.png",
  },
  {
    id: "intune",
    name: "Microsoft Intune",
    best: "Best for Microsoft-First Estates",
    strength:
      "Cloud-native UEM inside the Microsoft Intune Suite, wired natively into Entra ID, Conditional Access and Defender. For organisations already standardised on Microsoft 365 (E3 or E5) it is the lowest-friction choice, with licensing often already owned. Manages Windows, iOS, Android and macOS from one console.",
    watch:
      "Mobile threat defense requires Defender for Endpoint or a partner MTD, and the platform has a learning curve outside the Microsoft admin world.",
    logo: "/logos/microsoft.svg",
  },
  {
    id: "omnissa",
    name: "Omnissa Workspace ONE",
    best: "Best for Large Mixed Enterprise",
    strength:
      "Carrying AirWatch heritage and spun out of VMware as Omnissa in 2024, Workspace ONE offers the broadest device coverage in the market (mobile, desktop, rugged, server and specialty endpoints) on a modern microservices architecture with AI-driven automation (Intelligence engine). Built for complex, global, multi-OS estates.",
    watch:
      "Premium positioning and operational depth. More platform than smaller fleets need, and MTD comes via partner integration.",
    logo: "/logos/Workspace ONE.webp",
  },
  {
    id: "lookout",
    name: "Lookout Mobile Endpoint Security",
    best: "Best MTD for Unmanaged Devices",
    strength:
      "With around 16 years of MTD heritage and the industry's largest AI-driven mobile dataset, Lookout (now a pure-play enterprise vendor since its 2023 consumer divestiture) excels at protecting managed and unmanaged iOS, Android and ChromeOS devices, with strong phishing and smishing defense.",
    watch:
      "Dedicated MTD only, pairs with a UEM. Detection leans on cloud intelligence, a different model to Zimperium's on-device-first approach.",
    logo: "/logos/Lookout.png",
  },
];

/* ───────── GARTNER-STYLE SCORECARD ───────── */

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate" | "none";
type FeatureCell = { tier: Tier; note?: string };

const tierStyles: Record<Tier, { bg: string; text: string; label: string }> = {
  best: { bg: "bg-emerald-600", text: "text-white", label: "Best in class" },
  excellent: { bg: "bg-emerald-500", text: "text-white", label: "Excellent" },
  veryStrong: { bg: "bg-sky-200", text: "text-sky-900", label: "Very strong" },
  strong: { bg: "bg-amber-200", text: "text-amber-900", label: "Strong" },
  good: { bg: "bg-amber-100", text: "text-amber-900", label: "Good" },
  moderate: { bg: "bg-slate-200", text: "text-slate-700", label: "Moderate" },
  none: { bg: "bg-slate-100", text: "text-slate-500", label: "None / N/A" },
};

const featureVendors = ["Hexnode", "Zimperium", "Sophos Mobile", "Jamf", "Microsoft Intune", "Omnissa W1", "Lookout"];

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "Device Enrolment & UEM",
    cells: [
      { tier: "excellent", note: "Full multi-OS UEM" },
      { tier: "none", note: "MTD only, no UEM" },
      { tier: "excellent", note: "UEM in Sophos Central" },
      { tier: "veryStrong", note: "Apple-only UEM" },
      { tier: "excellent", note: "Cloud UEM + Autopilot" },
      { tier: "best", note: "Broadest device UEM" },
      { tier: "none", note: "MTD only, no UEM" },
    ],
  },
  {
    label: "Multi-OS Coverage",
    cells: [
      { tier: "excellent", note: "iOS, Android, Win, macOS" },
      { tier: "strong", note: "iOS, Android, ChromeOS" },
      { tier: "excellent", note: "iOS, Android, Win, macOS" },
      { tier: "moderate", note: "Apple only" },
      { tier: "excellent", note: "Win, iOS, Android, macOS" },
      { tier: "best", note: "Widest, incl. rugged" },
      { tier: "strong", note: "iOS, Android, ChromeOS" },
    ],
  },
  {
    label: "Phishing / Smishing Defense",
    cells: [
      { tier: "good", note: "Via Zimperium pairing" },
      { tier: "best", note: "On-device anti-phishing" },
      { tier: "strong", note: "Intercept X web protection" },
      { tier: "strong", note: "Jamf Protect web filter" },
      { tier: "good", note: "Via Defender add-on" },
      { tier: "good", note: "Via partner MTD" },
      { tier: "best", note: "Best-in-class smishing" },
    ],
  },
  {
    label: "On-Device Threat Detection",
    cells: [
      { tier: "none", note: "Pairs with MTD" },
      { tier: "best", note: "Local ML, works offline" },
      { tier: "strong", note: "Intercept X for Mobile" },
      { tier: "strong", note: "Jamf Protect (Apple)" },
      { tier: "moderate", note: "Via Defender for Endpoint" },
      { tier: "moderate", note: "Via partner MTD" },
      { tier: "excellent", note: "AI dataset detection" },
    ],
  },
  {
    label: "App Vetting & Protection",
    cells: [
      { tier: "good", note: "App allow / block lists" },
      { tier: "best", note: "MAPS app shielding" },
      { tier: "strong", note: "Per-app management" },
      { tier: "strong", note: "Apple app management" },
      { tier: "good", note: "App protection policies" },
      { tier: "good", note: "App catalog + controls" },
      { tier: "excellent", note: "Deep app risk analysis" },
    ],
  },
  {
    label: "BYOD & Privacy",
    cells: [
      { tier: "excellent", note: "Container separation" },
      { tier: "excellent", note: "Privacy-first, on-device" },
      { tier: "excellent", note: "Work Profile + User Enrolment" },
      { tier: "excellent", note: "Account-driven enrolment" },
      { tier: "excellent", note: "MAM without enrolment" },
      { tier: "excellent", note: "Strong BYOD container" },
      { tier: "best", note: "Protects unmanaged devices" },
    ],
  },
  {
    label: "Conditional Access Integration",
    cells: [
      { tier: "strong", note: "Via Entra / Okta" },
      { tier: "excellent", note: "Verdicts to UEM access" },
      { tier: "strong", note: "Via Entra / Synchronized Security" },
      { tier: "strong", note: "Entra / Okta integration" },
      { tier: "best", note: "Native Entra" },
      { tier: "excellent", note: "Workspace ONE Access" },
      { tier: "strong", note: "Risk feeds conditional access" },
    ],
  },
  {
    label: "Ease of Deployment",
    cells: [
      { tier: "best", note: "Fast, intuitive console" },
      { tier: "excellent", note: "zConsole, clear policy" },
      { tier: "excellent", note: "Single Sophos Central console" },
      { tier: "excellent", note: "Excellent for Apple admins" },
      { tier: "strong", note: "M365 learning curve" },
      { tier: "strong", note: "Enterprise-scale setup" },
      { tier: "excellent", note: "Console-driven, simple" },
    ],
  },
  {
    label: "Total Cost of Ownership",
    cells: [
      { tier: "best", note: "Best mid-market value" },
      { tier: "excellent", note: "Competitive per-device" },
      { tier: "excellent", note: "User-based, multi-device licence" },
      { tier: "strong", note: "Per-device, Apple-focused" },
      { tier: "excellent", note: "If M365 already owned" },
      { tier: "moderate", note: "Premium enterprise tiers" },
      { tier: "strong", note: "Per-user MTD subscription" },
    ],
  },
];

/* ───────── DECISION FRAMEWORK ───────── */

const decisionQuestions = [
  {
    q: "What is your device mix and who owns the devices?",
    a: "Apple-only, mixed-OS or rugged/kiosk-heavy fleets each point to different UEM platforms. Corporate-owned vs BYOD changes enrolment model, privacy requirements and which MTD approach fits.",
  },
  {
    q: "Are you standardised on Microsoft 365 or Apple Business Manager?",
    a: "Existing identity and productivity stack is the single biggest driver. M365 estates often start with Intune; Apple-first organisations gravitate to Jamf. Hexnode wins when you want value and multi-OS flexibility without ecosystem lock-in.",
  },
  {
    q: "What threats are you actually trying to stop: phishing, malicious apps, network attacks, or all of them?",
    a: "UEM enforces policy but does not detect threats. The threat profile determines whether you need MTD at all and, if so, whether on-device detection (Zimperium) or cloud-dataset intelligence (Lookout) is the better fit.",
  },
  {
    q: "Do you have unmanaged or contractor devices accessing corporate data?",
    a: "If sensitive data is reachable from devices you do not enrol, MTD that protects unmanaged endpoints becomes essential, and conditional access must gate risky devices out.",
  },
  {
    q: "Do you build your own mobile apps?",
    a: "If yes, in-app protection (runtime shielding, anti-tampering) matters, a capability where Zimperium's MAPS is differentiated.",
  },
  {
    q: "Which regulations apply: NESA, UAE PDPL, ISO 27001, PCI DSS, ADHICS?",
    a: "Mandated controls (encryption, logging, data residency, audit evidence) shape both platform choice and configuration. We map the stack to your framework before recommending.",
  },
];

/* ───────── DELIVERY MODEL ───────── */

const deliveryStages = [
  {
    title: "Assess",
    duration: "1–2 weeks",
    summary:
      "Device inventory, ownership model, OS mix, current MDM and MTD state, data-access mapping, threat-exposure and compliance-gap review.",
    deliverable: "Current-state report, UEM and MTD recommendation with rationale, three-year TCO comparison.",
  },
  {
    title: "Design",
    duration: "2–3 weeks",
    summary:
      "Enrolment architecture, policy framework, conditional-access rules, MTD integration, BYOD privacy model and SIEM logging integration.",
    deliverable: "Approved architecture, enrolment plan, change-management plan.",
  },
  {
    title: "Deploy",
    duration: "2–5 weeks",
    summary:
      "Phased rollout with a pilot group, zero-touch enrolment, app packaging, MTD activation, end-user comms and day-1 hypercare.",
    deliverable: "Live managed fleet, audit-ready documentation, runbooks for your team.",
  },
  {
    title: "Manage",
    duration: "Ongoing",
    summary:
      "24/7 monitoring, policy and app management, OS lifecycle, threat tuning, monthly board-readable reporting and quarterly reviews.",
    deliverable: "An operational mobile programme with SLAs you can rely on, or a clean handover to your team.",
  },
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "Do I need both UEM and MTD?",
    answer:
      "Most regulated or high-risk organisations do. Unified endpoint management (UEM) enrols and governs devices but does not detect threats; mobile threat defense (MTD) detects phishing, malicious apps and network attacks but does not manage devices. Together they close the loop: MTD flags risk, UEM enforces the response through conditional access.",
  },
  {
    question: "Why does Artiflex recommend Hexnode and Zimperium?",
    answer:
      "For UAE mid-market and regulated fleets they deliver the strongest outcome per dirham. Hexnode offers fast, value-led, multi-OS management with excellent kiosk and rugged support, while Zimperium provides best-in-class on-device, privacy-preserving threat defense plus in-app protection. They integrate cleanly together. That said, the right answer always depends on your stack, we assess first.",
  },
  {
    question: "We're already on Microsoft 365, should we just use Intune?",
    answer:
      "Often yes for UEM, since the licence may already be owned and Entra integration is native. But Intune's threat defense relies on Defender or a partner MTD, so we typically layer Zimperium or Lookout on top for full mobile threat coverage.",
  },
  {
    question: "Can you protect BYOD and contractor devices without full enrolment?",
    answer:
      "Yes. App-level management plus MTD (Zimperium or Lookout) can protect unmanaged devices, and conditional access gates risky devices away from corporate data without taking over the personal device.",
  },
  {
    question: "Do your mobile deployments cover NESA and UAE PDPL?",
    answer:
      "Yes. We design enrolment, policy and logging to meet NESA, UAE PDPL, ISO 27001 and ADHICS requirements, and deliver audit-ready evidence as part of the engagement.",
  },
  {
    question: "How long does a typical mobile rollout take in the UAE?",
    answer:
      "A focused UEM and MTD deployment typically runs four to ten weeks end-to-end depending on fleet size, OS mix and app-packaging needs, with a pilot group before full rollout.",
  },
];

/* ───────── HERO ───────── */

function MobileSecurityHero() {
  const { open: openContact } = useContactModal();
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-navy-deep">
      <div aria-hidden="true" className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/mobile-security.jpg')" }} />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/70 to-navy-deep/90" />

      <div className="relative z-10 border-b border-white/5">
        <div className="shell flex w-full items-center justify-end gap-4 pt-24 pb-3 sm:pt-28">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center justify-end gap-2 text-[10px] text-slate-400 sm:text-[11px]">
              <li><Link to="/" className="transition-colors hover:text-white">Home</Link></li>
              <li className="text-slate-600">/</li>
              <li><Link to="/cybersecurity" className="transition-colors hover:text-white">Cybersecurity</Link></li>
              <li className="text-slate-600">/</li>
              <li><span className="font-medium text-[#28B5E1]">Mobile Security</span></li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="shell relative z-10 flex w-full flex-1 items-center py-10 sm:py-12 lg:py-14">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="w-full">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#28B5E1] sm:text-xs">
            Mobile Security · UEM · MTD
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-5xl lg:text-[3.5rem]">
            Mobile Security UAE{" "}
            <span className="gradient-text">UEM + MTD</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Unified Endpoint Management & Mobile Threat Defense
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Your team is managing more devices, more platforms and more risk than ever, and one lost phone or malicious app shouldn't put company data at stake. Artiflex IT builds and runs your complete mobile security stack across the UAE, Oman and Saudi Arabia, pairing <span className="font-semibold text-white">unified endpoint management (UEM/MDM)</span> to enrol and govern every device with <span className="font-semibold text-white">mobile threat defense (MTD)</span> to stop phishing, malicious apps and on-device exploits. We deploy and manage Microsoft Intune, Jamf, Omnissa Workspace ONE and Lookout, and recommend Hexnode and Zimperium where they fit your fleet, budget and compliance posture.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
            <a href="#vendor-matrix" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base">
              Vendor Comparison
            </a>
            <a href="#gartner-comparison" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base">
              Gartner Style Review
            </a>
            <Link to="/blog/origin-endpoint-security" className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-[#28B5E1]/40 bg-[#28B5E1]/10 px-6 py-3 text-sm font-semibold text-[#28B5E1] backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1] hover:bg-[#28B5E1]/20 hover:text-white sm:px-7 sm:py-3.5 sm:text-base">
              Read Origin Story
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </Link>
            <button onClick={openContact} className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base">
              Get a Free Mobile Assessment
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </button>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 flex justify-center pb-8">
        <div aria-hidden="true" className="flex flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-[0.32em] text-slate-500">
          <span>Continue</span>
          <span className="h-8 w-px bg-gradient-to-b from-[#28B5E1]/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* ───────── PAGE ───────── */

export default function MobileSecurity() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Mobile Security UAE | UEM + MTD Vendor Comparison & Gartner-style Scorecard | Artiflex IT</title>
        <meta
          name="description"
          content="UAE Mobile Security buyer's guide. UEM and MTD vendor comparison and Gartner-style scorecard across Microsoft Intune, Jamf, Omnissa Workspace ONE, Lookout, Hexnode and Zimperium."
        />
        <link rel="canonical" href="https://artiflexit.com/cybersecurity/mobile-security" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Mobile Security (UEM + MTD)",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description":
              "UAE Mobile Security delivery across Microsoft Intune, Jamf, Omnissa Workspace ONE, Lookout, Hexnode and Zimperium: UEM, Mobile Threat Defense, BYOD, app protection and compliance.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((f) => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer } })),
          })}
        </script>
      </>

      <MobileSecurityHero />

      {/* ───────── PLATFORM LINEUP (HONEYCOMB) ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(to right, #1B8AC7 1px, transparent 1px), linear-gradient(to bottom, #1B8AC7 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#1B8AC7]/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-[#28B5E1]/10 blur-3xl" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">The Platform Lineup</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
              Mobile{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">Platforms</span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Six platforms we design, deploy and manage across UAE environments. The conversation starts with your device mix, ownership model (corporate vs BYOD) and compliance posture, not a SKU.
            </p>
          </div>

          {/* Honeycomb (large screens) */}
          <div className="mt-14 hidden flex-col items-center lg:flex">
            {(() => {
              const layouts: Record<number, number[]> = { 1: [1], 2: [2], 3: [3], 4: [3, 1], 5: [3, 2], 6: [3, 3], 7: [4, 3], 8: [4, 4] };
              const sizes = layouts[platforms.length] ?? [Math.ceil(platforms.length / 2), Math.floor(platforms.length / 2)];
              const rows: typeof platforms[] = [];
              let i = 0;
              sizes.forEach((s) => { rows.push(platforms.slice(i, i + s)); i += s; });
              const HEX_PATH = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
              return rows.map((row, rowIdx) => (
                <div key={rowIdx} className="flex" style={{ marginTop: rowIdx === 0 ? 0 : -52, transform: rowIdx > 0 && rows[rowIdx - 1].length === row.length ? "translateX(90px)" : undefined }}>
                  {row.map((p) => (
                    <div key={p.slug} aria-label={p.name} className="group relative block h-[208px] w-[180px] transition-all duration-300 hover:z-10 hover:scale-[1.06] [filter:drop-shadow(0_4px_12px_rgba(15,23,42,0.10))] hover:[filter:drop-shadow(0_10px_30px_rgba(40,181,225,0.45))]">
                      <div className="absolute inset-0 bg-slate-200/80 transition-colors duration-300 group-hover:bg-[#28B5E1]" style={{ clipPath: HEX_PATH }} />
                      <div className="absolute inset-[2px] bg-white transition-all duration-300 group-hover:bg-gradient-to-b group-hover:from-[#28B5E1]/[0.08] group-hover:to-white" style={{ clipPath: HEX_PATH }} />
                      <div className="relative flex h-full flex-col items-center justify-center px-5 text-center">
                        {p.logo ? (
                          <img
                            src={p.logo}
                            alt={p.name}
                            loading="lazy"
                            className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-110"
                          />
                        ) : (
                          <span className="px-2 text-center font-display text-sm font-semibold leading-tight text-slate-900">
                            {p.name}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ));
            })()}
          </div>

          {/* Card grid (mobile / tablet) */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:hidden">
            {platforms.map((p) => (
              <div key={p.slug} className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/50 hover:shadow-md">
                {p.logo ? (
                  <img
                    src={p.logo}
                    alt={p.name}
                    loading="lazy"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      img.style.display = "none";
                      const fb = img.nextElementSibling as HTMLElement | null;
                      if (fb) fb.style.removeProperty("display");
                    }}
                    className="h-12 w-12 object-contain"
                  />
                ) : null}
                <p
                  className="font-display text-[11px] font-semibold leading-tight text-slate-900"
                  style={{ display: p.logo ? "none" : "block" }}
                >
                  {p.name}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-slate-500">
            <span className="font-semibold text-slate-700">{platforms.length} platforms</span>, picked by your fleet, ownership model and budget.
          </p>
        </div>
      </section>

      {/* ───────── UEM vs MTD ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">The mobile security stack</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">UEM and MTD do different jobs</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Managing a device is not the same as defending it. A complete mobile security programme needs both: a unified endpoint management (UEM/MDM) platform to enrol, configure and govern the fleet, and a mobile threat defense (MTD) engine to detect phishing, malicious apps, network attacks and OS exploits in real time. The two integrate, UEM enforces the action and MTD supplies the verdict.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {layers.map((l) => (
              <article key={l.abbr} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1B8AC7]/60 hover:shadow-[0_20px_60px_-12px_rgba(27,138,199,0.20)] sm:p-8">
                <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#045891] to-[#28B5E1]" />
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#28B5E1]/15 font-mono text-xs font-bold tracking-wider text-[#045891]">
                    {l.abbr}
                  </span>
                  <h3 className="font-display text-xl font-bold text-slate-900">{l.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{l.intro}</p>
                <ul className="mt-5 space-y-2.5">
                  {l.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm leading-relaxed text-slate-700">
                      <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1B8AC7]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm font-semibold text-slate-800">{l.vendorsLine}</p>
                <Link
                  to={l.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1B8AC7] transition-colors hover:text-[#045891]"
                >
                  {l.cta}
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── VENDOR COMPARISON MATRIX ───────── */}
      <section id="vendor-matrix" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Compare Vendors</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Vendor comparison for <span className="gradient-text">mobile security buyers</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              We do not believe one platform wins everything. We do believe the right combination, usually one UEM plus one MTD, wins for your environment. Artiflex suggests the pairing that best fits your needs.
            </p>
          </div>

          <div className="mt-8 flex justify-center sm:mt-10">
            <button onClick={openContact} className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base">
              Talk to our Consultant
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </button>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + matrixVendors.length * 116) }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-5 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">Criteria</th>
                    {matrixVendors.map((v) => (
                      <th key={v.name} className={`border-l border-white/15 px-2 py-3 sm:px-4 sm:py-5 align-bottom ${v.featured ? "bg-white/10" : ""}`}>
                        <p className="font-display text-sm font-semibold text-white sm:text-base">
                          {v.name}
                        </p>
                        {v.featured && (
                          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                            ✓ Recommended
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrixRows.map((row, rIdx) => (
                    <tr
                      key={row.label}
                      className={`transition-colors ${
                        row.type === "verdict"
                          ? "border-t-2 border-[#28B5E1]/30 bg-gradient-to-r from-[#04101E] to-[#0A3D6B]"
                          : `border-t border-[#0A3D6B]/20 hover:bg-[#28B5E1]/[0.04] ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`
                      }`}
                    >
                      <th
                        scope="row"
                        className={`sticky left-0 z-10 px-2 py-3 align-middle sm:px-4 sm:py-4 font-display text-sm font-semibold ${
                          row.type === "verdict"
                            ? "bg-[#04101E] uppercase tracking-wider text-[#28B5E1]"
                            : `${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"} text-slate-900`
                        }`}
                      >
                        {row.label}
                      </th>
                      {row.cells.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`px-4 py-4 align-middle ${
                            row.type === "verdict"
                              ? "border-l border-white/10 text-slate-300"
                              : `border-l border-[#0A3D6B]/20 text-slate-700 ${matrixVendors[cIdx]?.featured ? "bg-[#28B5E1]/[0.04]" : ""}`
                          }`}
                        >
                          {row.type === "stars" ? (
                            <div>
                              <span aria-label={`${(cell as StarCell).stars} out of 5`} className="text-amber-500">
                                {"★".repeat((cell as StarCell).stars)}
                                <span className="text-slate-300">{"★".repeat(5 - (cell as StarCell).stars)}</span>
                              </span>
                              <p className="mt-1 text-xs leading-snug text-slate-600">{(cell as StarCell).note}</p>
                            </div>
                          ) : row.type === "verdict" ? (
                            <div className="space-y-1.5">
                              {(cell as VerdictCell).recommended && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                                  ✓ Recommended
                                </span>
                              )}
                              <p className="text-xs leading-relaxed text-slate-300">{(cell as VerdictCell).text}</p>
                            </div>
                          ) : (
                            <p className="text-xs leading-snug text-slate-700">{cell as string}</p>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-slate-600">
            Our recommended pairing for most UAE mid-market and regulated fleets is <span className="font-semibold text-[#045891]">Hexnode (UEM) plus Zimperium (MTD)</span>: agile, value-led management combined with best-in-class on-device threat defense and in-app protection. For Microsoft-standardised or Apple-only estates we deploy Intune or Jamf respectively, layered with Zimperium or Lookout for threat defense. The platform follows the assessment, not the other way around.
          </p>
        </div>
      </section>

      {/* ───────── DETAILED CARDS ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Detailed Comparison on Mobile Security Vendors</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Strengths, blind spots and the buyer profile each UEM and MTD platform serves best. Recommendations are based on UAE mobile security deployment patterns, not vendor tier.
            </p>
          </div>

          <div className="mt-6 flex justify-center sm:mt-8">
            <button onClick={openContact} className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base">
              Talk to our Consultant
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </button>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:mt-16 lg:grid-cols-2 lg:items-stretch">
            {vendors.map((v, idx) => {
              const recommended = v.best.includes("Recommended");
              return (
                <motion.div
                  key={v.name}
                  id={v.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="flex h-full scroll-mt-24"
                >
                  <div
                    className={`group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(4,88,145,0.12)] sm:p-8 ${
                      recommended
                        ? "border-brand-blue/30 shadow-[0_4px_20px_rgba(27,138,199,0.10)]"
                        : "border-border-light shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-brand-blue/25"
                    }`}
                  >
                    {recommended && (
                      <span
                        className="absolute -top-px left-6 inline-flex rounded-b-md bg-brand-blue px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white"
                        aria-label="Recommended vendor"
                      >
                        Recommended
                      </span>
                    )}
                    <div className="flex items-start justify-between gap-4 pt-3">
                      <div className="min-w-0">
                        <h3 className="font-display text-xl font-bold text-heading transition-colors group-hover:text-brand-blue sm:text-2xl">{v.name}</h3>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-brand-blue">{v.best}</p>
                      </div>
                      {v.logo && (
                        <img
                          src={v.logo}
                          alt={`${v.name} logo`}
                          loading="lazy"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                          className="h-10 w-24 shrink-0 object-contain object-right sm:h-12 sm:w-32"
                        />
                      )}
                    </div>
                    <div className="mt-5 space-y-3">
                      <div>
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Why it wins</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-body">{v.strength}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Consider</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-body/80">{v.watch}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className="mx-auto mt-12 max-w-3xl text-center text-sm leading-relaxed text-slate-600">
            Artiflex IT delivers Hexnode and Zimperium as recommended best-of-breed solutions and supports Microsoft Intune, Jamf, Omnissa Workspace ONE and Lookout where they align with specific customer requirements. The vendor follows the assessment, not the other way around.
          </p>
        </div>
      </section>

      {/* ───────── GARTNER-STYLE SCORECARD ───────── */}
      <section id="gartner-comparison" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Gartner-style Review</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Gartner-style Capability Comparison</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each platform is rated across mobile security capabilities using a standardised tier scale. A gold ★ marker denotes best-in-class performance for that specific capability.
            </p>
          </div>

          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-3 text-xs text-slate-600">
            <span className="font-mono uppercase tracking-wider text-slate-500">Rating scale:</span>
            {(["best", "excellent", "veryStrong", "strong", "good", "moderate", "none"] as Tier[]).map((t) => {
              const s = tierStyles[t];
              return (
                <span key={t} className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${s.bg} ${s.text}`}>
                  {t === "best" && <span aria-hidden="true">★</span>}
                  {s.label}
                </span>
              );
            })}
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + featureVendors.length * 116) }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-5 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">Capability</th>
                    {featureVendors.map((v, i) => {
                      const featured = i === 0 || i === 1;
                      return (
                        <th key={v} className={`border-l border-white/15 px-2 py-3 sm:px-4 sm:py-5 align-bottom font-display text-sm font-semibold text-white sm:text-base ${featured ? "bg-white/10" : ""}`}>
                          {v}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {featureRows.map((row, rIdx) => (
                    <tr key={row.label} className={`border-t border-[#0A3D6B]/20 transition-colors hover:bg-[#28B5E1]/[0.04] ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`}>
                      <th scope="row" className={`sticky left-0 z-10 px-2 py-3 align-middle sm:px-4 sm:py-4 font-display text-sm font-semibold text-slate-900 ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>{row.label}</th>
                      {row.cells.map((cell, cIdx) => {
                        const featured = cIdx === 0 || cIdx === 1;
                        const t = tierStyles[cell.tier];
                        return (
                          <td key={cIdx} className={`border-l border-[#0A3D6B]/20 px-2 py-3 sm:px-4 sm:py-4 align-middle ${featured ? "bg-[#28B5E1]/[0.04]" : ""}`}>
                            <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${t.bg} ${t.text}`}>
                              {cell.tier === "best" && <span aria-hidden="true">★</span>}
                              {t.label}
                            </span>
                            {cell.note && <p className="mt-1.5 text-xs leading-snug text-slate-600">{cell.note}</p>}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── DECISION FRAMEWORK ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Decision Framework</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Questions we ask before recommending a mobile stack</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Procurement gets cleaner when the questions are direct. Walk through these and the shortlist usually falls out by itself.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
            {decisionQuestions.map((q, i) => (
              <article key={q.q} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#045891] to-[#1B8AC7] font-display text-sm font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-slate-900">{q.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{q.a}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── DELIVERY MODEL ───────── */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="How we work"
            title={<>Our mobile <span className="gradient-text">delivery model</span></>}
            description="We don't sell licences. We deliver mobile security outcomes: assess, design, deploy, manage. Every stage produces something an auditor can read and a CFO can sign off on."
            centered
          />
          <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-4">
            {deliveryStages.map((s, idx) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-border-light bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/25 hover:shadow-[0_12px_40px_rgba(27,138,199,0.10)] sm:p-6"
              >
                <div className="flex items-baseline justify-end">
                  <span className="rounded-full border border-border-light bg-surface-secondary px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">{s.duration}</span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-heading">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">{s.summary}</p>
                <div className="mt-4 border-t border-border-light pt-3">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">You get</p>
                  <p className="mt-1 text-xs leading-relaxed text-body/85">{s.deliverable}</p>
                </div>
                {idx < 3 && (
                  <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 lg:block">
                    <div className="h-px w-6 bg-gradient-to-r from-brand-blue/40 to-transparent" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── WHY ARTIFLEX ───────── */}
      <section className="relative overflow-hidden bg-navy-deep py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(27,138,199,0.18),transparent_60%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#28B5E1]">Why Artiflex IT</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">14+ years of UAE endpoint delivery</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when Hexnode wins, when Intune wins, when Jamf wins, and when none of them is the right answer. The point of an honest assessment is honest answers.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years in UAE security delivery" },
              { value: "500+", label: "Projects delivered GCC-wide" },
              { value: "20+", label: "Certified security engineers" },
              { value: "24/7", label: "Managed SOC support" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-sm transition-colors duration-300 hover:border-[#28B5E1]/30">
                <p className="font-display text-3xl font-bold leading-none text-white sm:text-4xl">{stat.value}</p>
                <p className="mt-3 text-xs leading-relaxed text-slate-400 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">Platform coverage</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Hexnode and Zimperium (recommended), plus Microsoft Intune, Jamf, Omnissa Workspace ONE and Lookout. Active delivery experience across UEM and MTD.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">Compliance frameworks</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  NESA, UAE PDPL, ISO 27001, NIST CSF 2.0 and ADHICS-aligned implementations, with audit-ready evidence delivered as part of the project.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">Coverage area</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  On-site across Dubai, Abu Dhabi and Sharjah. Remote across the UAE, Oman and Saudi Arabia. 24/7 SOC support for managed customers.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">Engagement model</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Fully managed, co-managed or assessment-only. No vendor lock-in, no theatre, no upselling. The assessment drives the answer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Knowledge Base"
            title={<>Frequently <span className="gradient-text">asked</span> questions</>}
            description="What UAE businesses ask us most about mobile security, UEM (unified endpoint management) and MTD (mobile threat defense)."
            centered
          />
          <div className="mt-12 grid gap-6 sm:mt-14 lg:grid-cols-12 lg:gap-8">
            <ul className="flex flex-col gap-2 lg:col-span-6">
              {faqs.map((faq, idx) => {
                const isActive = activeFaq === idx;
                return (
                  <li key={faq.question}>
                    <button
                      type="button"
                      onClick={() => setActiveFaq(idx)}
                      aria-pressed={isActive}
                      aria-controls="faq-answer-panel"
                      className={`group flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-semibold transition-all duration-200 sm:px-5 sm:text-[15px] ${
                        isActive
                          ? "border-transparent bg-gradient-to-r from-[#045891] to-[#1B8AC7] text-white shadow-[0_8px_24px_-8px_rgba(27,138,199,0.55)]"
                          : "border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-[#28B5E1]/60 hover:bg-slate-50 hover:text-[#1B8AC7]"
                      }`}
                    >
                      <span className="leading-snug">{faq.question}</span>
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 shrink-0 transition-transform duration-300 ${isActive ? "translate-x-0.5" : "opacity-50 group-hover:translate-x-0.5 group-hover:opacity-100"}`}>
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="lg:col-span-6">
              <div id="faq-answer-panel" role="region" aria-live="polite" className="lg:sticky lg:top-24">
                <div className="overflow-hidden rounded-2xl border border-transparent bg-gradient-to-r from-[#045891] to-[#054466] p-6 shadow-[0_18px_40px_-18px_rgba(27,138,199,0.55)] sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-white">Faq</span>
                    <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-white/40 to-transparent" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold leading-snug text-white sm:text-2xl">{faqs[activeFaq].question}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">{faqs[activeFaq].answer}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <CTASection
        title="Get the Mobile Security Selection Guide"
        description="A vendor-neutral comparison of UEM and MTD options, with TCO analysis, a UEM-plus-MTD pairing matrix, and real UAE deployment case studies."
        primaryButton={{ text: "Book a free mobile posture assessment", action: "modal" }}
      />
    </>
  );
}
