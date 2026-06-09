import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { useContactModal } from "@/components/layout/ContactModal";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { CTASection } from "@/pages/Home/sections/CTASection";
import VendorComparisonMatrix, {
  type ComparisonRow,
  type ComparisonVendor,
} from "@/components/sections/VendorComparisonMatrix";
import {
  DatabaseIcon,
  CloudIcon,
  EyeIcon,
  AlertTriangleIcon,
  SearchIcon,
  FileTextIcon,
  ShieldIcon,
  LayersIcon,
  MailIcon,
} from "@/components/icons";

/* ───────── DATA STATES ───────── */

const dataStates = [
  {
    key: "rest",
    code: "@rest",
    title: "Data at Rest",
    where: "File servers · databases · shared drives · cloud storage",
    example: "The unencrypted customer database sitting on a legacy file share nobody owns.",
    icon: DatabaseIcon,
    risk: "42%",
    riskLabel: "of sensitive data lives in places IT doesn't map",
  },
  {
    key: "motion",
    code: "in-motion",
    title: "Data in Motion",
    where: "Email · cloud uploads · USB · chat · API transfers",
    example: "A spreadsheet of 15,000 customer records emailed to the wrong address.",
    icon: CloudIcon,
    risk: "1 click",
    riskLabel: "is all it takes for a USD 4M client account to walk out the door",
  },
  {
    key: "use",
    code: "in-use",
    title: "Data in Use",
    where: "Desktops · endpoints · clipboard · screen capture",
    example: "A departing employee copying the client list to a personal USB at 11pm.",
    icon: EyeIcon,
    risk: "60%",
    riskLabel: "of breaches originate with insiders - negligent or malicious",
  },
];

/* ───────── FRAMEWORK ───────── */

const framework = [
  {
    step: "01",
    phase: "Discovery",
    title: "Classify what you have",
    desc: "Scan file servers, databases, cloud storage and email. Tag every asset as Public, Internal, Confidential, or Restricted. You cannot protect what you have not found.",
    output: "Data classification map",
    days: "Week 1–2",
    icon: SearchIcon,
  },
  {
    step: "02",
    phase: "Policy",
    title: "Define what each class can do",
    desc: "Restricted data cannot be emailed externally. Confidential data cannot land in personal cloud storage. Internal data requires encryption in transit. Be specific - vague policies fail open.",
    output: "Enforcement policy matrix",
    days: "Week 3",
    icon: FileTextIcon,
  },
  {
    step: "03",
    phase: "Deploy",
    title: "Ship agents · monitor-only",
    desc: "Roll out Data Loss Prevention agents on endpoints, configure email DLP, and integrate cloud / SaaS DLP. Run 30 days in observation mode, surface what triggers without blocking a single user.",
    output: "Baseline incident stream",
    days: "Week 4–8",
    icon: LayersIcon,
  },
  {
    step: "04",
    phase: "Tune",
    title: "Cut false positives · enforce",
    desc: "Review observation data, tighten thresholds, then flip to block. Expect two or three tuning cycles before policies hold the line without drowning the SOC in noise.",
    output: "Production-grade DLP policies",
    days: "Week 9–12",
    icon: AlertTriangleIcon,
  },
  {
    step: "05",
    phase: "Operate",
    title: "Quarterly policy review",
    desc: "New apps get adopted, new data types emerge, employees find creative workarounds. Data Loss Prevention is not deploy-and-forget, it is a living control that needs attention every quarter.",
    output: "Continuous programme",
    days: "Ongoing",
    icon: ShieldIcon,
  },
];

/* ───────── DEPLOYMENT SCENARIOS ───────── */

const deploymentScenarios = [
  {
    label: "Network DLP",
    icon: CloudIcon,
    desc: "Inspects all network traffic, email, web uploads, cloud transfers, FTP, for sensitive data patterns including PII, financial records, healthcare data, and intellectual property. Enforced at the firewall or email gateway.",
  },
  {
    label: "Endpoint DLP",
    icon: ShieldIcon,
    desc: "Controls exactly what data users can copy to USB drives, print, screenshot, or transfer via personal cloud storage on their corporate laptops and desktops. The last line of defence when a user is offline or bypassing network controls.",
  },
  {
    label: "Cloud DLP / CASB",
    icon: LayersIcon,
    desc: "Monitors and controls sensitive data shared within SaaS applications, Microsoft 365, Google Drive, Salesforce, Box, SharePoint. Prevents oversharing with external parties and detects data exfiltration through cloud channels.",
  },
  {
    label: "Storage / Discovery DLP",
    icon: DatabaseIcon,
    desc: "Scans file servers, databases, SharePoint, and cloud storage repositories to discover and classify sensitive data at rest, identifying forgotten data stores that represent hidden compliance risk.",
  },
  {
    label: "Email DLP",
    icon: MailIcon,
    desc: "Inspects outbound email content, attachments, and recipient lists to prevent sensitive data from being sent to personal addresses, competitors, or external parties, intentionally or accidentally.",
  },
];

/* ───────── VENDORS ───────── */

const vendors: {
  slug: string;
  name: string;
  best: string;
  summary: string;
  accent: string;
  logo?: string;
}[] = [
  {
    slug: "fortra-dlp",
    name: "Fortra DLP & Data Classification",
    best: "Recommended · Digital Guardian + Boldon James",
    summary:
      "Kernel-level endpoint DLP that enforces policy offline, paired with Boldon James gold-standard user-driven classification and ARC behavioural baselines. Built for IP-heavy estates and ministries.",
    accent: "#E11D48",
    logo: "/logos/Fortra.png",
  },
  {
    slug: "check-point-harmony-dlp",
    name: "Check Point Harmony DLP",
    best: "Self-Educating · Zero False Positives · Unified Policy",
    summary:
      "In-context user prompts replace silent blocking. One SmartConsole policy enforced across Quantum Firewall, Harmony Endpoint, Harmony Email and CloudGuard.",
    accent: "#E4007F",
    logo: "/logos/Check-Point-2024-logo-color.svg",
  },
  {
    slug: "netskope-dlp",
    name: "Netskope DLP",
    best: "Cloud-Native SSE-Integrated · 50,000+ SaaS Apps Covered",
    summary:
      "Cloud-native DLP delivered via the NewEdge SSE network. Inline inspection across 50,000+ SaaS applications with shadow-IT discovery and AI auto-classification.",
    accent: "#FFCC00",
    logo: "/logos/Netscope.png",
  },
  {
    slug: "symantec-dlp-broadcom",
    name: "Symantec DLP (Broadcom)",
    best: "Deepest Content Inspection · Enterprise Heavyweight",
    summary:
      "330+ file formats inspected with OCR. EDM, IDM and VML fingerprinting deliver the most precise detection in the market for large regulated estates with dedicated DLP teams.",
    accent: "#6B3FB0",
    logo: "/logos/Symantec.png",
  },
  {
    slug: "trellix-dlp",
    name: "Trellix DLP",
    best: "Endpoint + Network + Email + Cloud · McAfee Heritage",
    summary:
      "Endpoint, network, email and cloud DLP under one centralised policy engine. The cleanest consolidation path for existing Trellix and McAfee customers.",
    accent: "#DC2626",
    logo: "/logos/Trellix.png",
  },
  {
    slug: "forcepoint-dlp",
    name: "Forcepoint Data Security Cloud",
    best: "Unified Web + Email + Endpoint + Cloud · Risk-Adaptive",
    summary:
      "Single policy framework across web, email, endpoint and cloud, with Risk-Adaptive Protection that flexes per-user enforcement based on real-time risk score.",
    accent: "#0EA5E9",
    logo: "/logos/forcepoint.png",
  },
  {
    slug: "microsoft-purview-dlp",
    name: "Microsoft Purview DLP",
    best: "Native to M365 · 400+ Sensitive Information Types",
    summary:
      "Native DLP across Exchange, SharePoint, OneDrive, Teams and Edge with 400+ pre-built classifiers, sensitivity labels and Insider Risk Management correlation.",
    accent: "#0078D4",
    logo: "/logos/microsoft.svg",
  },
  {
    slug: "sophos-dlp",
    name: "Sophos DLP",
    best: "Bundled in Sophos Endpoint and Email · SMB / Mid-Market",
    summary:
      "Multi-channel DLP built into Sophos Intercept X, Sophos Email and Sophos Firewall at zero incremental cost. User risk scoring auto-escalates enforcement.",
    accent: "#1B8AC7",
    logo: "/logos/sophos.svg",
  },
];

/* ───────── CAPABILITY COMPARISON TABLE ───────── */

type DlpTier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type DlpFeatureCell = { tier: DlpTier; note: string };

const dlpFeatureVendors = [
  "Fortra DLP",
  "Check Point Harmony",
  "Netskope DLP",
  "Symantec DLP",
  "Trellix DLP",
  "Forcepoint DLP",
  "Microsoft Purview",
  "Sophos DLP",
];

const dlpFeatureRows: { label: string; cells: DlpFeatureCell[] }[] = [
  {
    label: "Endpoint DLP",
    cells: [
      { tier: "best", note: "Kernel-level, enforces offline" },
      { tier: "veryStrong", note: "Harmony Endpoint integrated" },
      { tier: "good", note: "Cloud-first endpoint coverage" },
      { tier: "veryStrong", note: "Strong, market-proven" },
      { tier: "veryStrong", note: "Strong on-prem footprint" },
      { tier: "veryStrong", note: "Strong, risk-adaptive" },
      { tier: "veryStrong", note: "Windows native via Intune" },
      { tier: "good", note: "Bundled in Sophos Endpoint" },
    ],
  },
  {
    label: "Network DLP",
    cells: [
      { tier: "veryStrong", note: "Multi-protocol coverage" },
      { tier: "best", note: "Quantum Firewall, comprehensive" },
      { tier: "veryStrong", note: "Inline via NewEdge SSE" },
      { tier: "best", note: "Best in industry, all protocols" },
      { tier: "veryStrong", note: "Strong network DLP" },
      { tier: "veryStrong", note: "Adaptive enforcement" },
      { tier: "moderate", note: "Limited, M365 traffic focus" },
      { tier: "good", note: "Sophos Firewall perimeter" },
    ],
  },
  {
    label: "Cloud / SaaS DLP",
    cells: [
      { tier: "veryStrong", note: "Via Fortra CASB" },
      { tier: "excellent", note: "CloudGuard CASB integrated" },
      { tier: "best", note: "50,000+ SaaS apps inspected" },
      { tier: "excellent", note: "Symantec CASB" },
      { tier: "good", note: "Moderate SaaS coverage" },
      { tier: "excellent", note: "Forcepoint ONE platform" },
      { tier: "best", note: "Native inside M365" },
      { tier: "good", note: "Bundled web protection" },
    ],
  },
  {
    label: "User-Driven Classification",
    cells: [
      { tier: "best", note: "Boldon James, gold standard" },
      { tier: "veryStrong", note: "In-context self-classify prompts" },
      { tier: "good", note: "AI auto-classify, not user-driven" },
      { tier: "veryStrong", note: "Yes, native classifier" },
      { tier: "veryStrong", note: "Yes, native option" },
      { tier: "veryStrong", note: "Yes, Risk-Adaptive" },
      { tier: "veryStrong", note: "Sensitivity labels (MIP)" },
      { tier: "moderate", note: "Limited, no mandatory labelling" },
    ],
  },
  {
    label: "Insider Threat Analytics",
    cells: [
      { tier: "best", note: "ARC ML behavioural baselines" },
      { tier: "good", note: "Self-educating reduces friction" },
      { tier: "good", note: "Cloud user behaviour analytics" },
      { tier: "veryStrong", note: "Yes, Symantec UEBA" },
      { tier: "moderate", note: "Limited" },
      { tier: "veryStrong", note: "Yes, UEBA-style" },
      { tier: "veryStrong", note: "Insider Risk Management" },
      { tier: "moderate", note: "Sophos Central user risk scoring" },
    ],
  },
  {
    label: "OCR / Image Inspection",
    cells: [
      { tier: "veryStrong", note: "Yes, OCR + image inspection" },
      { tier: "veryStrong", note: "Yes" },
      { tier: "good", note: "AI content detection" },
      { tier: "best", note: "330+ file formats, deepest" },
      { tier: "veryStrong", note: "Yes" },
      { tier: "veryStrong", note: "Yes" },
      { tier: "veryStrong", note: "Yes" },
      { tier: "moderate", note: "Limited" },
    ],
  },
  {
    label: "Managed Service Option",
    cells: [
      { tier: "best", note: "Digital Guardian MSP" },
      { tier: "veryStrong", note: "Infinity SOC integrated" },
      { tier: "good", note: "Partner-delivered" },
      { tier: "good", note: "Partner-delivered" },
      { tier: "good", note: "Partner-delivered" },
      { tier: "good", note: "Partner-delivered" },
      { tier: "good", note: "Partner-delivered" },
      { tier: "veryStrong", note: "Via Sophos MDR" },
    ],
  },
  {
    label: "Total Cost of Ownership",
    cells: [
      { tier: "moderate", note: "Premium per-endpoint pricing" },
      { tier: "best", note: "Included in Harmony / Quantum FW" },
      { tier: "good", note: "Part of SSE platform cost" },
      { tier: "moderate", note: "Premium, complex licensing" },
      { tier: "moderate", note: "Standalone licence" },
      { tier: "moderate", note: "Premium standalone" },
      { tier: "best", note: "Best if M365 E5 already on contract" },
      { tier: "best", note: "Included in Sophos Endpoint / Email" },
    ],
  },
];

const dlpTierStyles: Record<DlpTier, { bg: string; text: string; label: string }> = {
  best: { bg: "bg-emerald-600", text: "text-white", label: "Best in class" },
  excellent: { bg: "bg-emerald-500", text: "text-white", label: "Excellent" },
  veryStrong: { bg: "bg-emerald-200", text: "text-emerald-900", label: "Very strong" },
  strong: { bg: "bg-amber-200", text: "text-amber-900", label: "Strong" },
  good: { bg: "bg-amber-100", text: "text-amber-900", label: "Good" },
  moderate: { bg: "bg-amber-100", text: "text-amber-900", label: "Moderate" },
};

/* ───────── FORTRA DECISIVE ADVANTAGES (6.4) ───────── */

const fortraAdvantages: { title: string; meaning: string }[] = [
  {
    title: "IP-protection focus",
    meaning: "Designed from day one to stop source code, formulas, and designs from leaving, not just credit-card numbers.",
  },
  {
    title: "Offline kernel-level agent",
    meaning: "Endpoint enforces policy with no cloud connection. Critical for field laptops, classified networks, and air-gapped sites.",
  },
  {
    title: "Boldon James classification",
    meaning: "Mature user-driven labelling that ministries already trust. Integrates with Microsoft Purview labels so the same label drives both Fortra and Microsoft DLP policies.",
  },
  {
    title: "Behavioural baselines (ARC)",
    meaning: "ML engine learns each user's normal activity. Cuts false-positive noise dramatically and surfaces real insider-threat behaviour.",
  },
  {
    title: "Forensic depth",
    meaning: "Captures the full event chain. The gold standard for HR and legal investigations following an exfiltration incident.",
  },
  {
    title: "Managed Service (DG MSP)",
    meaning: "Customers without a mature SOC buy the platform and the operations team in one contract.",
  },
  {
    title: "Vendor stability",
    meaning: "Fortra is a profitable, private-equity-backed cybersecurity portfolio company actively investing in the platform.",
  },
  {
    title: "Portfolio leverage",
    meaning: "Bundle pricing when combined with Tripwire (VM/FIM/SCM), Fortra Email Security, and Alert Logic MDR.",
  },
];

/* ───────── BUYER'S DECISION GUIDE (6.5) ───────── */

const buyerDecisionGuide: { says: string; recommend: string; rationale: string }[] = [
  {
    says: "We must stop source-code or IP exfiltration.",
    recommend: "Fortra DLP (Digital Guardian)",
    rationale: "Strongest IP-protection use case in the market, kernel-level offline enforcement.",
  },
  {
    says: "We need mandatory document labelling at creation.",
    recommend: "Fortra Boldon James Classifier",
    rationale: "Or Forcepoint Data Security Cloud, both enforce labels at save and send.",
  },
  {
    says: "We are 100% Microsoft 365 and budget-conscious.",
    recommend: "Microsoft Purview DLP first",
    rationale: "Layer Fortra only if endpoints or IP need deeper coverage than Purview provides.",
  },
  {
    says: "We need DLP across web, email, endpoint, and cloud as one service.",
    recommend: "Forcepoint Data Security Cloud",
    rationale: "Single unified policy framework across all four vectors.",
  },
  {
    says: "We need a fully managed DLP service.",
    recommend: "Fortra Digital Guardian MSP",
    rationale: "Buy the platform and the operations team in one contract.",
  },
  {
    says: "We are a global bank with a mature SOC and need the deepest content inspection.",
    recommend: "Symantec DLP (Broadcom)",
    rationale: "Deepest inspection (330+ formats, OCR), but expect heavy operational lifting.",
  },
  {
    says: "We have 250 users, simple needs, and a small IT team.",
    recommend: "Sophos DLP (or Safetica)",
    rationale: "Bundled in Sophos Endpoint and Email. Fortra is oversized at this scale.",
  },
  {
    says: "We already run Tripwire or Fortra Email Security.",
    recommend: "Fortra DLP",
    rationale: "Portfolio bundle pricing and one account team across the Fortra estate.",
  },
];

/* ───────── COMPLIANCE ───────── */

const compliance = [
  { code: "GDPR", penalty: "4% of global turnover", scope: "EU citizen data" },
  { code: "HIPAA", penalty: "USD 1.9M per violation type / yr", scope: "Protected health information" },
  { code: "PCI-DSS", penalty: "USD 100k / month", scope: "Cardholder data" },
  { code: "UAE PDPL", penalty: "AED 5M", scope: "Personal data in the UAE" },
];

/* ───────── INSIDER SIGNALS ───────── */

const insiderSignals = [
  {
    label: "Volume spike",
    detail: "Normally pulls 5 files a day. Suddenly pulls 500. DLP catches the anomaly, not the job title.",
  },
  {
    label: "Unusual destination",
    detail: "Data being routed to a personal email domain or a brand-new cloud storage account.",
  },
  {
    label: "Off-hours activity",
    detail: "A bulk export of the CRM at 02:47 on a Saturday by someone who is about to resign.",
  },
  {
    label: "Physical exfiltration",
    detail: "USB drives connecting to endpoints that handle restricted data. Blocked by policy, alerted on attempt.",
  },
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "Why is Fortra DLP the recommended platform?",
    answer:
      "Fortra DLP (Digital Guardian) is one of the few vendors that delivers true endpoint-resident DLP. The kernel-level agent enforces policy on the device even when offline, which is critical for field laptops, defence networks, oil and gas sites, and air-gapped environments. Combined with Boldon James Classifier (mandatory user-driven labelling that integrates with Microsoft Purview) and the Analytics & Reporting Cloud (ML behavioural baselines that cut false positives dramatically), the platform is purpose-built for IP-heavy industries where source code, designs, formulas, and citizen records must never leave the organisation.",
  },
  {
    question: "What is Boldon James Classifier and why does it matter?",
    answer:
      "Boldon James (now part of Fortra) is the gold-standard user-driven data classification tool. Every save and send is mandated to carry a sensitivity label (Public, Internal, Confidential, Restricted, or your custom taxonomy), and the label is then enforced by both Fortra DLP and Microsoft Purview policies. Boldon James is what ministries already trust for sovereign labelling programmes, and its Microsoft Purview integration means the same label drives both Fortra and Microsoft DLP policies (no double-tagging).",
  },
  {
    question: "What is Digital Guardian MSP?",
    answer:
      "Digital Guardian MSP is Fortra's fully managed DLP service. Customers without a mature SOC buy the platform and the operations team in one contract: Fortra analysts run policy tuning, incident triage, forensic investigation, and HR / legal escalation on your behalf, around the clock. The right pick for ministries and mid-market regulated entities that need enterprise-grade DLP outcomes without standing up an in-house DLP team.",
  },
  {
    question: "Is Microsoft Purview DLP enough for a UAE business?",
    answer:
      "For SMBs and mid-market organisations that live entirely inside Microsoft 365 and have lower IP-protection requirements, Purview DLP covers email, SharePoint, OneDrive, Teams, and Edge browser natively, usually enough to meet baseline PDPL obligations. It is not enough if you have material IP-protection requirements (source code, designs, formulas), need offline endpoint enforcement, run sovereign / on-prem stacks, or need mandatory user-driven labelling at creation. At that point you add Fortra DLP for the depth and Boldon James for classification, with the same Microsoft sensitivity labels driving both engines.",
  },
  {
    question: "How does DLP help us meet NESA, NCA ECC, ADHICS, CBUAE / SAMA, ISO 27001, GDPR, HIPAA, and PCI DSS?",
    answer:
      "Every one of those frameworks expects you to classify data, enforce access boundaries, block unauthorised exfiltration, and produce a forensic trail when an incident occurs. DLP combined with Data Classification operationalises all four obligations: Boldon James tags every record, Fortra policies enforce egress boundaries on endpoint / network / email / cloud, the Digital Guardian agent blocks unauthorised exfiltration even when the device is offline, and Analytics & Reporting Cloud delivers the audit-grade incident logs that regulators expect to see. DLP and classification together are the single most audited control after access management.",
  },
  {
    question: "We are a global bank with a mature SOC. What wins on the deepest content inspection?",
    answer:
      "Symantec DLP (Broadcom). 20+ years of development, 330+ file formats inspected, OCR on images and scanned PDFs, archive inspection, and the EDM / IDM / VML classifier engines for high-volume regulated data (PCI, PHI, PII). Expect heavy operational lifting and dedicated DLP staff. For most other large-enterprise scenarios, Fortra DLP delivers more value with less operational overhead, especially when IP protection or sovereign deployment are also on the requirements list.",
  },
  {
    question: "We need DLP across web, email, endpoint, and cloud as one service. Who fits?",
    answer:
      "Forcepoint Data Security Cloud unifies DLP across all four vectors under a single policy framework, with Risk-Adaptive Protection that adjusts enforcement based on continuously calculated user risk scores. 1,700+ pre-defined templates and policies cover 150+ regions and major industries. The right pick when the buying criterion is one console for web + email + endpoint + cloud DLP delivered as a unified service.",
  },
  {
    question: "We have 250 users and a small IT team. Is enterprise DLP overkill?",
    answer:
      "For 250-user organisations with simple regulatory needs (basic PCI, PII, PHI exfiltration prevention) and no IP-protection requirements, Sophos DLP (bundled in Sophos Endpoint and Sophos Email) is the right pick. Fortra Digital Guardian is oversized at this scale. We also support Safetica and other mid-market platforms when the threat model justifies it.",
  },
  {
    question: "Does Fortra integrate with the rest of the Fortra portfolio?",
    answer:
      "Yes. Fortra DLP shares support, account management, and bundle pricing with the wider Fortra portfolio: Tripwire (file integrity, security configuration, vulnerability management), Fortra Email Security (Cloud Email Protection, Clearswift, Agari, PhishLabs, Terranova), and Alert Logic MDR. Customers running any of these get the deepest cross-product value when they add Fortra DLP, and Boldon James labels flow across all of them.",
  },
  {
    question: "How long before DLP starts catching real incidents?",
    answer:
      "Observation mode surfaces policy violations within 48 hours of deployment. Most organisations see their first confirmed incident, usually an accidental external email or a personal cloud upload, inside the first week. Enforcement begins after 30 days of tuning. Fortra Analytics & Reporting Cloud accelerates this by learning each user's normal activity and surfacing real insider-threat behaviour with dramatically lower false positives than rules-only DLP.",
  },
  {
    question: "Won't DLP create endless false positives and annoy users?",
    answer:
      "It will, if you skip the observation-mode step or run rules-only policies. Every deployment we run spends four weeks in monitor-only before any policy goes to block. Fortra ARC then layers behavioural baselines on top so policy noise drops further. By the time enforcement switches on, noise is down 70 to 80% and legitimate work flows through untouched.",
  },
  {
    question: "What makes Check Point Harmony DLP different from other vendors?",
    answer:
      "Check Point Harmony DLP is the only mainstream platform that takes a self-educating approach to enforcement. Instead of silently blocking and generating IT tickets, it issues an in-context prompt asking the user to self-classify the data they are about to send. This collapses false-positive noise, builds security awareness rather than resentment, and gives the SOC a meaningful signal for the cases users still try to push through. A single SmartConsole policy is enforced simultaneously across Quantum Firewall (network), Harmony Endpoint, Harmony Email and CloudGuard (cloud), so policy consistency is structural rather than coordinated. Strongest leverage when the buyer is consolidating onto Check Point Infinity and already running Quantum Firewalls, in which case DLP is bundled inside the existing licensing rather than a separate procurement.",
  },
  {
    question: "When is Netskope DLP the right pick over Fortra, Microsoft or Symantec?",
    answer:
      "Netskope is the right pick when the dominant DLP exposure is cloud and SaaS, not endpoint or on-prem network. Netskope is delivered as part of its Security Service Edge (SSE) platform and inspects content and context across 50,000+ cloud applications inline via its NewEdge network. That means it sees cloud-to-cloud data movement, shadow-IT uploads to unsanctioned apps, and SaaS-to-SaaS sharing that gateway-based DLP simply cannot. Pair Netskope with another vendor for deep on-prem network DLP or kernel-resident endpoint DLP if those use cases also need coverage.",
  },
  {
    question: "Does DLP help us meet UAE PDPL requirements?",
    answer:
      "Directly, yes. UAE PDPL (Federal Decree-Law No. 45 of 2021) requires data classification, access controls, technical safeguards against unauthorised disclosure, and 72-hour breach notification. DLP operationalises all four: Boldon James classification tags every record, Fortra policies enforce access boundaries, the Digital Guardian endpoint agent blocks unauthorised exfiltration, and ARC delivers the forensic timeline you need to meet the 72-hour notification window. For Saudi entities, the same controls map to NCA ECC and SAMA's Cyber Security Framework.",
  },
];

/* ───────── HERO ───────── */

function DlpHero() {
  const { open: openContact } = useContactModal();
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-navy-deep">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/Dataloss.jpg')" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/70 to-navy-deep/90"
      />

      {/* Breadcrumb band */}
      <div className="relative z-10 border-b border-white/5">
        <div className="shell flex w-full items-center justify-end gap-4 pt-24 pb-3 sm:pt-28">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center justify-end gap-2 text-[10px] text-slate-400 sm:text-[11px]">
              <li>
                <Link to="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li className="text-slate-600">/</li>
              <li>
                <Link to="/cybersecurity" className="transition-colors hover:text-white">
                  Cybersecurity
                </Link>
              </li>
              <li className="text-slate-600">/</li>
              <li>
                <span className="font-medium text-[#28B5E1]">Data Loss Prevention</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero masthead */}
      <div className="shell relative z-10 flex w-full flex-1 items-center py-10 sm:py-12 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full"
        >
          <h1 className="font-display text-4xl font-bold leading-[1] tracking-tight text-white sm:text-5xl md:text-5xl lg:text-[3.75rem]">
            Data Loss Prevention{" "}
            <span className="gradient-text">UAE</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Endpoint, Network &amp; Cloud DLP
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Your most valuable data, intellectual property, source code, financial records and regulated PII, PHI and PCI, is the target of almost every attack, whether the threat is a malicious outsider, a rogue insider or a careless employee. Artiflex IT designs, deploys and manages <span className="font-semibold text-white">data loss prevention (DLP)</span> and <span className="font-semibold text-white">data classification</span> across the UAE, Oman and Saudi Arabia, identifying sensitive information and stopping it from leaving via email, web, endpoint, cloud or removable media. We work across Microsoft Purview, Forcepoint, Symantec and Netskope, and recommend Fortra DLP and Check Point Harmony where they fit your data channels, compliance posture and existing stack.
          </p>

          <p className="mt-3 max-w-2xl text-xs leading-relaxed text-slate-400 sm:text-sm">
            Data Loss Prevention is mandatory under NESA UAE IA, NCA ECC (Saudi), ADHICS (Abu Dhabi healthcare), CBUAE / SAMA, ISO 27001, GDPR, HIPAA, and PCI DSS. The single most audited control after access management.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#vendor-matrix"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base"
            >
              Vendor Comparison
            </a>
            <a
              href="#gartner-comparison"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base"
            >
              Gartner Style Review
            </a>
            <Link
              to="/blog/origin-data-loss-prevention"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-[#28B5E1]/40 bg-[#28B5E1]/10 px-6 py-3 text-sm font-semibold text-[#28B5E1] backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1] hover:bg-[#28B5E1]/20 hover:text-white sm:px-7 sm:py-3.5 sm:text-base"
            >
              Read Origin Story
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <button
              onClick={openContact}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base"
            >
              Get a Free DLP Assessment
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll affordance */}
      <div className="relative z-10 flex justify-center pb-8">
        <div
          aria-hidden="true"
          className="flex flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-[0.32em] text-slate-500"
        >
          <span>Continue</span>
          <span className="h-8 w-px bg-gradient-to-b from-[#28B5E1]/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* ───────── PAGE ───────── */

/* ───────── VENDOR COMPARISON (buyer star matrix) ───────── */

const dlpCompareVendors: ComparisonVendor[] = [
  { name: "Fortra DLP", recommended: true, rank: "#1" },
  { name: "Check Point Harmony", recommended: true },
  { name: "Netskope", recommended: true },
  { name: "Symantec (Broadcom)" },
  { name: "Trellix DLP" },
  { name: "Forcepoint" },
  { name: "Microsoft Purview" },
  { name: "Sophos DLP" },
];

const dlpCompareRows: ComparisonRow[] = [
  {
    label: "Founded / Heritage",
    type: "text",
    cells: [
      "Digital Guardian + Boldon James classification",
      "Harmony suite, unified with Quantum",
      "Cloud-native SSE platform, founded 2012",
      "Vontu DLP, the enterprise gold standard",
      "McAfee DLP heritage, multi-channel engine",
      "Websense heritage, risk-adaptive pioneer",
      "Native to Microsoft 365 (Purview)",
      "Bundled in Sophos Endpoint and Email",
    ],
  },
  {
    label: "Total Cost of Ownership",
    type: "stars",
    cells: [
      { stars: 5, note: "Best in class, modular licensing" },
      { stars: 4, note: "Good value within Harmony suite" },
      { stars: 3, note: "Premium, SSE-bundled" },
      { stars: 3, note: "Premium enterprise pricing" },
      { stars: 4, note: "Standalone licence, fair value" },
      { stars: 3, note: "Mid-to-premium pricing" },
      { stars: 5, note: "Included in M365 E5, best TCO" },
      { stars: 5, note: "Included in Sophos Endpoint / Email" },
    ],
  },
  {
    label: "Ease of Management",
    type: "stars",
    cells: [
      { stars: 4, note: "Unified console, guided policies" },
      { stars: 5, note: "Self-educating, near-zero false positives" },
      { stars: 4, note: "Intuitive cloud console" },
      { stars: 3, note: "Powerful but complex, expert-led" },
      { stars: 4, note: "Centralised ePO-style policy engine" },
      { stars: 4, note: "Forcepoint ONE unified console" },
      { stars: 5, note: "Single pane in Purview portal" },
      { stars: 5, note: "Sophos Central, simple for small teams" },
    ],
  },
  {
    label: "Channel Coverage",
    type: "stars",
    cells: [
      { stars: 5, note: "Endpoint, network, cloud, email" },
      { stars: 4, note: "Endpoint, network, email via Harmony" },
      { stars: 4, note: "Cloud, web, with endpoint growing" },
      { stars: 5, note: "All channels, deepest coverage" },
      { stars: 5, note: "Endpoint, network, email, cloud" },
      { stars: 5, note: "Web, email, endpoint, cloud unified" },
      { stars: 4, note: "Endpoint, email, cloud inside M365" },
      { stars: 4, note: "Endpoint, email, firewall multi-channel" },
    ],
  },
  {
    label: "Classification & Detection",
    type: "stars",
    cells: [
      { stars: 5, note: "Boldon James, gold-standard classification" },
      { stars: 4, note: "In-context self-classification" },
      { stars: 4, note: "AI content + 50,000+ SaaS apps" },
      { stars: 5, note: "330+ file formats, deepest inspection" },
      { stars: 4, note: "Native classifiers, proven detection" },
      { stars: 4, note: "Risk-adaptive ML detection" },
      { stars: 4, note: "400+ info types, MIP labels" },
      { stars: 3, note: "Solid built-in rules, no mandatory labels" },
    ],
  },
  {
    label: "Cloud / SaaS DLP",
    type: "stars",
    cells: [
      { stars: 4, note: "Via Fortra CASB" },
      { stars: 5, note: "CloudGuard CASB integrated" },
      { stars: 5, note: "Market-leading inline CASB" },
      { stars: 5, note: "Symantec CloudSOC CASB" },
      { stars: 3, note: "Moderate SaaS coverage" },
      { stars: 5, note: "Forcepoint ONE CASB" },
      { stars: 5, note: "Native across M365 + Defender for Cloud Apps" },
      { stars: 3, note: "Bundled web protection" },
    ],
  },
  {
    label: "Best Suited For",
    type: "text",
    cells: [
      "Regulated firms needing classification plus DLP",
      "Existing Check Point estates",
      "Cloud-first, SaaS-heavy organisations",
      "Large enterprises with deep inspection needs",
      "Existing Trellix and McAfee customers",
      "Unified data security across all channels",
      "Microsoft 365 / E5 organisations",
      "SMB and mid-market on the Sophos stack",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "Best overall: Digital Guardian enforcement plus Boldon James classification." },
      { recommended: true, text: "Self-educating policies, near-zero false positives, unified policy." },
      { recommended: true, text: "Cloud-native DLP for SaaS-first organisations." },
      { text: "Deepest content inspection for enterprise heavyweights." },
      { text: "Cleanest consolidation path for Trellix and McAfee estates." },
      { text: "Risk-adaptive DLP unifying web, email, endpoint, and cloud." },
      { text: "Unbeatable value and native coverage for M365 estates." },
      { text: "Bundled multi-channel DLP for SMB and mid-market." },
    ],
  },
];

export default function DataLossPrevention() {
  const [activeState, setActiveState] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [openScenario, setOpenScenario] = useState<number | null>(null);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Data Loss Prevention UAE | DLP & Data Classification | Fortra, Microsoft Purview | Artiflex IT</title>
        <meta
          name="description"
          content="Data Loss Prevention (DLP) and Data Classification for the UAE. Fortra Digital Guardian + Boldon James, Microsoft Purview, Forcepoint, Symantec, Trellix, Sophos. PDPL, NESA, NCA ECC, ADHICS, SAMA, ISO 27001, GDPR, HIPAA, PCI DSS. Free Data Loss Prevention consultation."
        />
        <meta
          name="keywords"
          content="Data Loss Prevention UAE, Data Loss Prevention Dubai, DLP UAE, DLP Dubai, data loss prevention services, data classification UAE, Fortra DLP, Digital Guardian DLP, Boldon James Classifier, Microsoft Purview DLP, Forcepoint DLP, Symantec DLP, Trellix DLP, Sophos DLP, IP protection, source code DLP, insider threat UAE, NESA DLP, NCA ECC DLP, ADHICS healthcare, SAMA Saudi Arabia DLP, PDPL UAE Data Loss Prevention"
        />
        <link rel="canonical" href="https://artiflexit.com/cybersecurity/data-loss-prevention" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Data Loss Prevention UAE | DLP & Data Classification | Artiflex IT" />
        <meta
          property="og:description"
          content="Data Loss Prevention (DLP) and Data Classification for UAE ministries, banks, healthcare, and IP-heavy industries. Fortra Digital Guardian, Boldon James, Microsoft Purview, Forcepoint, Symantec, Trellix, Sophos."
        />
        <meta property="og:url" content="https://artiflexit.com/cybersecurity/data-loss-prevention" />
        <meta property="og:image" content="https://artiflexit.com/Dataloss.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Data Loss Prevention UAE | DLP & Data Classification | Artiflex IT" />
        <meta
          name="twitter:description"
          content="Data Loss Prevention (DLP) and Data Classification for the UAE. Fortra Digital Guardian + Boldon James, Microsoft Purview, Forcepoint, Symantec, Trellix, Sophos."
        />
        <meta name="twitter:image" content="https://artiflexit.com/Dataloss.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Artiflex IT",
          "url": "https://artiflexit.com/cybersecurity/data-loss-prevention",
          "areaServed": [
            { "@type": "Country", "name": "United Arab Emirates" },
            { "@type": "Country", "name": "Saudi Arabia" },
            { "@type": "City", "name": "Dubai" },
            { "@type": "City", "name": "Abu Dhabi" }
          ],
          "address": { "@type": "PostalAddress", "addressCountry": "AE" }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Data Loss Prevention (DLP) & Data Classification, UAE",
          "alternateName": ["Data Loss Prevention UAE", "DLP UAE", "Data Loss Prevention Dubai", "DLP Dubai"],
          "description": "Data Loss Prevention services for UAE and the wider GCC: Fortra Digital Guardian, Boldon James data classification, Microsoft Purview, Forcepoint, Symantec, Trellix, and Sophos. Aligned to PDPL, NESA, NCA ECC, ADHICS, SAMA, ISO 27001, GDPR, HIPAA, and PCI DSS.",
          "provider": { "@type": "Organization", "name": "Artiflex IT" },
          "areaServed": [
            { "@type": "Country", "name": "United Arab Emirates" },
            { "@type": "Country", "name": "Saudi Arabia" }
          ],
          "serviceType": "Data Loss Prevention, DLP Services, Data Classification, IP Protection, NESA / NCA ECC / ADHICS / CBUAE / SAMA / ISO 27001 / GDPR / HIPAA / PCI DSS, Fortra Digital Guardian, Boldon James, Microsoft Purview, Forcepoint, Symantec, Trellix, Sophos"
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": { "@type": "Answer", "text": f.answer }
          }))
        })}</script>
      </>

      {/* HERO */}
      <DlpHero />

      {/* ───────── DLP VENDORS WE DELIVER (HONEYCOMB) ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #1B8AC7 1px, transparent 1px), linear-gradient(to bottom, #1B8AC7 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#1B8AC7]/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-[#28B5E1]/10 blur-3xl"
        />

        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              The Vendor Lineup
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
              DLP{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Vendors
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The Data Loss Prevention and Data Classification platforms we design, deploy and manage across UAE environments. The choice follows your stack, your audit scope, and the data classes you have to govern.
            </p>
          </div>

          <div className="mt-14 hidden flex-col items-center lg:flex">
            {(() => {
              const layouts: Record<number, number[]> = {
                1: [1], 2: [2], 3: [3], 4: [3, 1], 5: [3, 2],
                6: [3, 3], 7: [4, 3], 8: [4, 4], 9: [5, 4],
                10: [5, 5], 11: [6, 5], 12: [6, 6],
              };
              const sizes =
                layouts[vendors.length] ??
                [Math.ceil(vendors.length / 2), Math.floor(vendors.length / 2)];
              const rows: typeof vendors[] = [];
              let i = 0;
              sizes.forEach((s) => {
                rows.push(vendors.slice(i, i + s));
                i += s;
              });
              const HEX_PATH =
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
              return rows.map((row, rowIdx) => (
                <div
                  key={rowIdx}
                  className="flex"
                  style={{
                    marginTop: rowIdx === 0 ? 0 : -52,
                    transform:
                      rowIdx > 0 && rows[rowIdx - 1].length === row.length
                        ? "translateX(90px)"
                        : undefined,
                  }}
                >
                  {row.map((v) => (
                    <Link
                      key={v.slug}
                      to={`/cybersecurity/dlp/${v.slug}`}
                      aria-label={`View ${v.name} details`}
                      className="group relative block h-[208px] w-[180px] transition-all duration-300 hover:z-10 hover:scale-[1.06] [filter:drop-shadow(0_4px_12px_rgba(15,23,42,0.10))] hover:[filter:drop-shadow(0_10px_30px_rgba(40,181,225,0.45))]"
                    >
                      <div
                        className="absolute inset-0 bg-slate-200/80 transition-colors duration-300 group-hover:bg-[#28B5E1]"
                        style={{ clipPath: HEX_PATH }}
                      />
                      <div
                        className="absolute inset-[2px] bg-white transition-all duration-300 group-hover:bg-gradient-to-b group-hover:from-[#28B5E1]/[0.08] group-hover:to-white"
                        style={{ clipPath: HEX_PATH }}
                      />
                      <div className="relative flex h-full flex-col items-center justify-center px-5 text-center">
                        {v.logo ? (
                          <img
                            src={v.logo}
                            alt={v.name}
                            loading="lazy"
                            className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-110"
                          />
                        ) : (
                          <span className="px-2 text-center font-display text-sm font-semibold leading-tight text-slate-900">
                            {v.name}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ));
            })()}
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:hidden">
            {vendors.map((v) => (
              <Link
                key={v.slug}
                to={`/cybersecurity/dlp/${v.slug}`}
                className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/50 hover:shadow-md"
              >
                {v.logo ? (
                  <img
                    src={v.logo}
                    alt={v.name}
                    loading="lazy"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      img.style.display = "none";
                      const fb = img.nextElementSibling as HTMLElement | null;
                      if (fb) fb.style.removeProperty("display");
                    }}
                    className="h-14 w-14 object-contain"
                  />
                ) : null}
                <p
                  className="font-display text-[11px] font-semibold leading-tight text-slate-900"
                  style={{ display: v.logo ? "none" : "block" }}
                >
                  {v.name}
                </p>
              </Link>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-slate-500">
            <span className="font-semibold text-slate-700">
              {vendors.length} platforms
            </span>
            , picked by your stack and audit scope.
          </p>
        </div>
      </section>

      {/* ───────── WHY LEGACY DLP FAILS ───────── */}
      {/* <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="The Gap"
            title={
              <>
                Why rule-only Data Loss Prevention{" "}
                <span className="gradient-text">isn't enough</span>
              </>
            }
            description="Signature lists and regex policies still stop credit-card numbers in clear text. They miss the attacks that actually hurt: source-code exfiltration, slow personal-cloud uploads, offline endpoints, and contractors copying designs to a USB at 11pm."
            centered
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {/* Left - legacy */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-border-light bg-surface-secondary p-8 sm:p-10"
            >
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                Legacy approach
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-heading">
                Rule-only Data Loss Prevention
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-body">
                Catches what looks like a credit-card number. Struggles with anything that needs context: who is the user, what is the data sensitivity, is this device offline, has the behaviour changed in the last 24 hours.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Misses source-code and design-file exfiltration",
                  "Blind to slow personal-cloud drip uploads over weeks",
                  "No offline enforcement when the laptop is off the network",
                  "Floods the SOC with false-positive policy hits",
                  "Mandatory user-driven labelling missing or inconsistent",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-body">
                    <span className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                      <AlertIcon className="h-2.5 w-2.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div> */}

            {/* Right - modern DLP */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative overflow-hidden rounded-3xl border border-[#1B8AC7]/30 bg-gradient-to-br from-[#04101E] to-[#0A3D6B] p-8 text-white shadow-[0_20px_60px_rgba(27,138,199,0.25)] sm:p-10"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#1B8AC7]/20 blur-3xl" />

              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4FC3F7]">
                Modern Data Loss Prevention
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-white">
                Behavioural + classification-led DLP
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Mandatory user-driven classification (Boldon James), kernel-level endpoint enforcement that works offline (Fortra Digital Guardian), and ML behavioural baselines (Analytics &amp; Reporting Cloud) that surface real insider behaviour with dramatically lower false positives.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Stops source-code and IP exfiltration, not just credit-card numbers",
                  "Kernel-level endpoint agent enforces offline and on air-gapped networks",
                  "Adaptive Redaction sanitises sensitive content rather than blocking the whole message",
                  "User-driven labels (Boldon James) drive both Fortra and Microsoft Purview policies",
                  "ARC behavioural ML cuts false-positive noise so the SOC sees real signal",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#1B8AC7]/30 text-[#4FC3F7]">
                      <CheckIcon className="h-2.5 w-2.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur">
                <ShieldIcon className="h-5 w-5 text-[#4FC3F7]" />
                <p className="text-xs text-slate-300">
                  Modern Data Loss Prevention is the operational layer behind every NESA, NCA ECC, CBUAE, SAMA, ISO 27001, GDPR, HIPAA, and PCI DSS audit.
                </p>
              </div>
            </motion.div>
          </div>
        </div> */}
      {/* </section> */} 

      {/* ───────── UAE PDPL & REGIONAL COMPLIANCE ───────── */}
      {/* <section className="relative overflow-hidden bg-gradient-to-b from-white to-surface-secondary py-16 sm:py-24">
        <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-[#1B8AC7]/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-10 h-80 w-80 rounded-full bg-[#28B5E1]/10 blur-3xl" />

        <div className="shell relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1B8AC7]/30 bg-[#1B8AC7]/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#045891]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1B8AC7]" />
                UAE · PDPL · Federal Decree-Law 45/2021
              </div>

              <h2 className="mt-6 font-display text-3xl font-bold leading-[1.2] text-heading sm:text-4xl">
                UAE PDPL compliance -{" "}
                <span className="gradient-text">Data Loss Prevention services Dubai businesses need now</span>
              </h2>

              <p className="mt-6 text-base leading-relaxed text-body">
                The UAE Personal Data Protection Law (PDPL) came into force with real
                enforcement teeth: penalties up to AED 5M, mandatory 72-hour breach
                notification, and a requirement to demonstrate technical safeguards around
                personal data. For any business processing resident data in the UAE,
                <span className="text-heading font-semibold"> PDPL data protection UAE </span>
                is no longer optional.
              </p>

              <p className="mt-4 text-base leading-relaxed text-body">
                Data Loss Prevention is how you operationalise PDPL readiness, and how
                regional banks map to SAMA data protection Saudi Arabia controls when
                expanding across the Gulf. Our{" "}
                <a href="/cybersecurity#roadmap" className="font-semibold text-[#1B8AC7] hover:text-[#045891] underline decoration-[#1B8AC7]/30 hover:decoration-[#045891]">
                  cybersecurity implementation roadmap
                </a>{" "}
                sequences PDPL controls against Data Loss Prevention rollout.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-7"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    code: "Art. 6",
                    title: "Data classification",
                    desc: "PDPL expects you to know what personal data you hold and where it lives. DLP discovery scans deliver the inventory - tagged, mapped, and auditable.",
                  },
                  {
                    code: "Art. 9",
                    title: "Access controls",
                    desc: "Only authorised processors may access personal data. DLP policies enforce the boundary on endpoints, email, and cloud - not just at the login screen.",
                  },
                  {
                    code: "Art. 14",
                    title: "72-hour breach notification",
                    desc: "PDPL gives you 72 hours to notify the UAE Data Office. DLP incident logs give you the forensic timeline that makes notification possible, not guesswork.",
                  },
                  {
                    code: "Art. 20",
                    title: "Technical safeguards",
                    desc: "Encryption, monitoring, and exfiltration controls are explicit requirements. DLP is the control layer regulators look for during audit.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.code}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="group relative overflow-hidden rounded-2xl border border-border-light bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#1B8AC7]/40 hover:shadow-[0_20px_60px_-20px_rgba(27,138,199,0.3)]"
                  >
                    <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#1B8AC7]/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
                    <p className="relative font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1B8AC7]">
                      PDPL · {item.code}
                    </p>
                    <h3 className="relative mt-3 font-display text-lg font-semibold text-heading">
                      {item.title}
                    </h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-body">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex items-start gap-4 rounded-2xl border border-[#045891]/20 bg-[#04101E] p-5 text-white">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1B8AC7]/20 text-[#4FC3F7]">
                  <LockIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#4FC3F7]">
                    Regional note
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-300">
                    For Saudi entities, SAMA's Cyber Security Framework mirrors PDPL on
                    data classification, exfiltration controls, and incident response -
                    the same DLP investment covers both jurisdictions.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* ───────── DATA STATES CONSOLE ───────── */}
      {/* <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Where Data Loss Prevention Works"
            title={
              <>
                Three data states -{" "}
                <span className="gradient-text">three failure modes</span>
              </>
            }
            description="Good Data Loss Prevention tools identify credit card numbers, medical records, and intellectual property regardless of where they live or how they move. DLP is the control plane that follows the data, not the perimeter."
            centered
          />

          <div className="mt-12 grid gap-3 lg:grid-cols-3">
            {dataStates.map((state, index) => {
              const Icon = state.icon;
              const isActive = activeState === index;
              return (
                <motion.button
                  key={state.key}
                  onClick={() => setActiveState(index)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`group relative overflow-hidden rounded-3xl border p-8 text-left transition-all ${
                    isActive
                      ? "border-[#1B8AC7] bg-gradient-to-br from-[#04101E] to-[#0A3D6B] text-white shadow-[0_30px_80px_-20px_rgba(27,138,199,0.4)]"
                      : "border-border-light bg-white hover:border-[#1B8AC7]/30 hover:-translate-y-1 hover:shadow-lg"
                  }`}
                >
                  <div
                    className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl transition-opacity ${
                      isActive ? "bg-[#1B8AC7]/25 opacity-100" : "bg-[#1B8AC7]/10 opacity-0 group-hover:opacity-100"
                    }`}
                  />

                  <div className="relative flex items-center justify-between">
                    <span
                      className={`font-mono text-[10px] font-semibold uppercase tracking-[0.25em] ${
                        isActive ? "text-[#4FC3F7]" : "text-[#1B8AC7]"
                      }`}
                    >
                      {state.code}
                    </span>
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                        isActive
                          ? "bg-white/10 text-[#4FC3F7]"
                          : "bg-[#1B8AC7]/10 text-[#1B8AC7]"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3
                    className={`relative mt-6 font-display text-2xl font-bold ${
                      isActive ? "text-white" : "text-heading"
                    }`}
                  >
                    {state.title}
                  </h3>
                  <p
                    className={`relative mt-2 text-xs font-mono uppercase tracking-[0.14em] ${
                      isActive ? "text-slate-400" : "text-muted"
                    }`}
                  >
                    {state.where}
                  </p>

                  <div
                    className={`relative mt-8 rounded-2xl border p-4 ${
                      isActive
                        ? "border-white/10 bg-white/[0.04]"
                        : "border-border-light bg-surface-secondary"
                    }`}
                  >
                    <p
                      className={`text-sm leading-relaxed ${
                        isActive ? "text-slate-200" : "text-body"
                      }`}
                    >
                      {state.example}
                    </p>
                  </div>

                  <div className="relative mt-6 flex items-end gap-3">
                    <span
                      className={`font-display text-4xl font-bold leading-none ${
                        isActive ? "text-[#4FC3F7]" : "text-[#1B8AC7]"
                      }`}
                    >
                      {state.risk}
                    </span>
                    <span
                      className={`pb-1 text-[11px] leading-tight ${
                        isActive ? "text-slate-400" : "text-muted"
                      }`}
                    >
                      {state.riskLabel}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* ───────── CONSULTATION CTA ───────── */}
      {/* <section className="relative overflow-hidden bg-[#020617] py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(40,181,225,0.14),transparent_60%)]" />

        <div className="shell relative">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-10 lg:flex-row lg:items-center">
            <div className="flex items-start gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#28B5E1] to-[#045891]">
                <SearchIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#4FC3F7]">
                  Free · 30 minutes · zero sales script
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">
                  Where is your sensitive data leaking?
                </h3>
                <p className="mt-2 max-w-xl text-sm text-slate-400">
                  Data Loss Prevention Dubai teams can deploy in weeks. Our consultation
                  maps your sensitive data flows, identifies leak points, and recommends
                  the right Data Loss Prevention controls for your stack, PDPL scope, and the
                  rest of your regulatory perimeter.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#04101E] transition-all hover:bg-[#28B5E1] hover:text-white hover:shadow-[0_8px_32px_rgba(40,181,225,0.4)]"
            >
              Schedule a Data Protection Consultation
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 transition-transform group-hover:translate-x-1">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </section> */}

      {/* ───────── 5-STEP FRAMEWORK ───────── */}
      {/* <section className="relative bg-surface-secondary py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="The Framework"
            title={
              <>
                Data Loss Prevention rollout -{" "}
                <span className="gradient-text">a 12-week sequence that works</span>
              </>
            }
            description="Built from dozens of live UAE Data Loss Prevention deployments. The companies that succeed follow this exact sequence: discovery first, enforcement last."
            centered
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-12">
            {/* Stepper */}
            {/* <div className="lg:col-span-5">
              <div className="relative space-y-2">
                <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-[#1B8AC7]/40 via-[#1B8AC7]/20 to-transparent" />
                {framework.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeStep === index;
                  return (
                    <button
                      key={item.step}
                      onClick={() => setActiveStep(index)}
                      className={`group relative flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                        isActive
                          ? "border-[#1B8AC7] bg-white shadow-[0_12px_40px_-10px_rgba(27,138,199,0.25)]"
                          : "border-transparent bg-white/40 hover:bg-white hover:border-border-light"
                      }`}
                    >
                      <div
                        className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-bold transition-all ${
                          isActive
                            ? "bg-gradient-to-br from-[#045891] to-[#1B8AC7] text-white shadow-lg"
                            : "bg-white text-[#1B8AC7] border border-border-light"
                        }`}
                      >
                        {item.step}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono text-[10px] font-semibold uppercase tracking-[0.2em] ${
                              isActive ? "text-[#1B8AC7]" : "text-muted"
                            }`}
                          >
                            {item.phase}
                          </span>
                          <span className="font-mono text-[10px] text-muted">·</span>
                          <span className="font-mono text-[10px] text-muted">{item.days}</span>
                        </div>
                        <p
                          className={`mt-1 font-display text-base font-semibold truncate ${
                            isActive ? "text-heading" : "text-slate-600"
                          }`}
                        >
                          {item.title}
                        </p>
                      </div>

                      <Icon
                        className={`h-5 w-5 shrink-0 transition-colors ${
                          isActive ? "text-[#1B8AC7]" : "text-muted"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div> */}

            {/* Detail */}
            {/* <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-7"
            >
              <div className="relative h-full overflow-hidden rounded-3xl border border-border-light bg-white p-8 sm:p-10">
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#1B8AC7]/10 blur-3xl" />
                <div className="pointer-events-none absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#045891] via-[#1B8AC7] to-transparent" />

                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#1B8AC7]">
                      Step {framework[activeStep].step} · {framework[activeStep].phase}
                    </p>
                    <h3 className="mt-3 font-display text-3xl font-bold text-heading sm:text-4xl">
                      {framework[activeStep].title}
                    </h3>
                  </div>
                  <span className="font-display text-6xl font-bold text-[#1B8AC7]/15 leading-none">
                    0{activeStep + 1}
                  </span>
                </div>

                <p className="relative mt-6 text-base leading-relaxed text-body">
                  {framework[activeStep].desc}
                </p>

                <div className="relative mt-10 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border-light bg-surface-secondary p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                      Deliverable
                    </p>
                    <p className="mt-2 text-sm font-semibold text-heading">
                      {framework[activeStep].output}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#1B8AC7]/20 bg-[#1B8AC7]/5 p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#045891]">
                      Duration
                    </p>
                    <p className="mt-2 text-sm font-semibold text-heading">
                      {framework[activeStep].days}
                    </p>
                  </div>
                </div>

                <div className="relative mt-6 flex items-center justify-between rounded-2xl border border-border-light bg-white px-5 py-4">
                  <p className="flex items-center gap-2 text-xs text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Progress: Step {activeStep + 1} of {framework.length}
                  </p>
                  <div className="flex items-center gap-1.5">
                    {framework.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1 rounded-full transition-all ${
                          i <= activeStep ? "w-6 bg-[#1B8AC7]" : "w-3 bg-border-light"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section> */} 

      {/* ───────── INSIDER THREAT ───────── */}
      {/* <section className="relative overflow-hidden bg-[#04101E] py-16 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #1B8AC7 1px, transparent 1px), radial-gradient(circle at 80% 80%, #28B5E1 1px, transparent 1px)",
            backgroundSize: "60px 60px, 80px 80px",
          }}
        />

        <div className="shell relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left - narrative */}
            {/* <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-amber-300 backdrop-blur">
                <UsersIcon className="h-3 w-3" />
                The Human Factor
              </div>

              <h2 className="mt-6 font-display text-3xl font-bold leading-[1.2] text-white sm:text-4xl">
                Insider threat prevention -{" "}
                <span className="gradient-text">Data Loss Prevention's most important job</span>
              </h2>

              <p className="mt-6 text-base leading-relaxed text-slate-300">
                External attackers get the headlines. Insiders cause{" "}
                <span className="text-white font-semibold">60% of data breaches</span>. The
                employee who's about to quit and downloads the client database. The contractor
                copying code to a USB. The admin who misconfigures a bucket.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                Effective Data Loss Prevention learns normal behaviour, then flags the moment it breaks. Pair
                it with{" "}
                <a href="/cybersecurity/security-operations/siem" className="font-semibold text-[#4FC3F7] hover:text-white underline decoration-[#4FC3F7]/40">
                  SIEM/SOAR threat detection
                </a>{" "}
                so analyst response closes the loop, and with{" "}
                <a href="/cybersecurity/email-security" className="font-semibold text-[#4FC3F7] hover:text-white underline decoration-[#4FC3F7]/40">
                  email DLP
                </a>{" "}
                and{" "}
                <a href="/cybersecurity/workspace-protection-sse-sase" className="font-semibold text-[#4FC3F7] hover:text-white underline decoration-[#4FC3F7]/40">
                  cloud DLP via SASE/CASB
                </a>{" "}
                to cover the two channels where real leaks happen.
              </p>

              <div className="mt-10 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
                  <AlertIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300">
                    Baseline signal
                  </p>
                  <p className="mt-1 text-sm text-slate-200">
                    Behavioural DLP doesn't need malware. It needs a baseline - and a deviation.
                  </p>
                </div>
              </div>
            </motion.div> */}

            {/* Right - signal list */}
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-7"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {insiderSignals.map((signal, index) => (
                  <motion.div
                    key={signal.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-[#1B8AC7]/40 hover:bg-white/[0.06]"
                  >
                    <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#1B8AC7]/15 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />

                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#4FC3F7]">
                        Signal · 0{index + 1}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.8)]" />
                    </div>

                    <h3 className="mt-5 font-display text-xl font-semibold text-white">
                      {signal.label}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                      {signal.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* ───────── COMPLIANCE ───────── */}
      {/* <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Compliance"
            title={
              <>
                GDPR, HIPAA, and the price of{" "}
                <span className="gradient-text">"we didn't know"</span>
              </>
            }
            description="If you process regulated data, Data Loss Prevention is not nice-to-have. Regulators expect documented technical controls, and the penalties are non-trivial."
            centered
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {compliance.map((item, index) => (
              <motion.div
                key={item.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-3xl border border-border-light bg-gradient-to-br from-white to-surface-secondary p-7 transition-all hover:-translate-y-1 hover:border-[#1B8AC7]/40 hover:shadow-[0_20px_60px_-20px_rgba(27,138,199,0.3)]"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#1B8AC7]/10 blur-3xl opacity-0 transition-opacity group-hover:opacity-100" />

                <p className="relative font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  {item.scope}
                </p>
                <p className="relative mt-3 font-display text-4xl font-bold text-heading">
                  {item.code}
                </p>

                <div className="relative mt-6 border-t border-border-light pt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-rose-500">
                    Max penalty
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-heading">
                    {item.penalty}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center">
            <p className="max-w-2xl text-center text-sm leading-relaxed text-muted">
              Documented DLP controls demonstrate due diligence. If an incident does occur,
              regulators weigh the controls you had in place - and the penalty reflects it.
            </p>
          </div>
        </div>
      </section> */}

      {/* ───────── DLP DEPLOYMENT SCENARIOS ───────── */}
      <section className="relative bg-white py-10 sm:py-14">
        <div className="shell">
          <SectionHeader
            label="Deployment Scenarios"
            title={
              <>
                Five channels Data Loss Prevention has to{" "}
                <span className="gradient-text">cover end-to-end</span>
              </>
            }
            description="Modern Data Loss Prevention is rarely one product, it is a control plane that has to follow data through every egress path. Here are the five scenarios any DLP programme has to address."
            centered
          />

          <div className="mt-8 grid grid-cols-1 items-start gap-3 sm:mt-10 sm:grid-cols-2 lg:grid-cols-6">
            {deploymentScenarios.map((s, idx) => {
              const Icon = s.icon;
              const isOpen = openScenario === idx;
              const itemsInLastRow =
                deploymentScenarios.length % 3 === 0
                  ? 3
                  : deploymentScenarios.length % 3;
              const isFirstInOrphanRow =
                itemsInLastRow === 2 &&
                idx === deploymentScenarios.length - 2;
              const isOrphanSingle =
                itemsInLastRow === 1 &&
                idx === deploymentScenarios.length - 1;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  tabIndex={0}
                  onMouseEnter={() => setOpenScenario(idx)}
                  onMouseLeave={() =>
                    setOpenScenario((prev) => (prev === idx ? null : prev))
                  }
                  onFocus={() => setOpenScenario(idx)}
                  onBlur={() =>
                    setOpenScenario((prev) => (prev === idx ? null : prev))
                  }
                  onClick={() =>
                    setOpenScenario((prev) => (prev === idx ? null : idx))
                  }
                  aria-expanded={isOpen}
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white py-2 px-3 shadow-sm outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#28B5E1]/40 sm:py-3 sm:px-4 lg:col-span-2 ${
                    isFirstInOrphanRow ? "lg:col-start-2" : ""
                  } ${isOrphanSingle ? "lg:col-start-3" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#28B5E1]/10 text-[#1B8AC7]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-md font-semibold text-slate-900">
                      {s.label}
                    </h3>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.p
                        key="desc"
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden text-sm leading-relaxed text-slate-600"
                      >
                        {s.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── VENDOR COMPARISON (buyer star matrix) ───────── */}
      <VendorComparisonMatrix
        id="vendor-matrix"
        heading="Vendor comparison for"
        highlight="DLP buyers"
        intro="No single DLP suite wins every environment. The right platform depends on your data channels, classification maturity, and existing stack. Artiflex suggests the solution that best fits your needs."
        vendors={dlpCompareVendors}
        rows={dlpCompareRows}
        onContact={openContact}
        ctaLabel="Talk to our Consultant"
      />

      {/* ───────── DETAILED VENDOR CARDS ───────── */}
      <section
        id="vendor-cards"
        className="relative bg-surface-secondary py-16 scroll-mt-20 sm:py-24"
      >
        <div className="shell">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Detailed Comparison on Data Loss Prevention Vendors
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Strengths, blind spots, and the buyer profile each vendor was built for. Recommendations are based on UAE deployment patterns, not vendor tier.
            </p>
          </div>

          <div className="mt-6 flex justify-center sm:mt-8">
            <button
              onClick={openContact}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base"
            >
              Talk to a Specialist
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:mt-16 lg:grid-cols-2 lg:items-stretch">
            {vendors.map((v, idx) => {
              const recommended = v.best.includes("Recommended");
              const isOrphan =
                idx === vendors.length - 1 && vendors.length % 2 === 1;
              return (
                <motion.div
                  key={v.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className={`flex h-full ${
                    isOrphan
                      ? "lg:col-span-2 lg:mx-auto lg:w-[calc(50%-0.75rem)]"
                      : ""
                  }`}
                >
                  <Link
                    to={`/cybersecurity/dlp/${v.slug}`}
                    aria-label={`View details for ${v.name}`}
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
                        <h3 className="font-display text-xl font-bold text-heading transition-colors group-hover:text-brand-blue sm:text-2xl">
                          {v.name}
                        </h3>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-brand-blue">
                          {v.best}
                        </p>
                      </div>
                      {v.logo ? (
                        <img
                          src={v.logo}
                          alt={`${v.name} logo`}
                          loading="lazy"
                          className="h-10 w-24 shrink-0 object-contain object-right sm:h-12 sm:w-32"
                        />
                      ) : (
                        <span
                          aria-hidden
                          className="flex h-12 w-16 shrink-0 items-center justify-center rounded-lg text-sm font-bold uppercase tracking-wide text-white shadow-[0_4px_10px_-4px_rgba(15,23,42,0.4)]"
                          style={{ backgroundColor: v.accent }}
                        >
                          {v.name
                            .replace(/[^A-Za-z\s]/g, "")
                            .split(/\s+/)
                            .filter(Boolean)
                            .slice(0, 2)
                            .map((w) => w[0])
                            .join("")}
                        </span>
                      )}
                    </div>

                    <div className="mt-5">
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                        Why it wins
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-body">
                        {v.summary}
                      </p>
                    </div>

                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-xs font-semibold text-brand-blue transition-all group-hover:gap-2.5 sm:text-sm">
                      View {v.name.split(" ")[0]} details
                      <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="mx-auto mt-12 max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-br from-[#0A3D6B] via-[#04101E] to-[#020617] p-8 text-center shadow-xl shadow-[#1B8AC7]/10 sm:p-12">
            <p className="text-base leading-relaxed text-slate-300 sm:text-lg md:text-xl">
              <span className="font-semibold text-white">Artiflex IT delivers Fortra DLP & Data Classification</span> (Digital Guardian, Boldon James, ARC, Digital Guardian MSP) for UAE ministries, banks, healthcare, defence, and IP-heavy industries, and is also a delivery partner for Microsoft Purview, Forcepoint Data Security Cloud, Symantec DLP (Broadcom), Trellix DLP, and Sophos DLP. The vendor follows the assessment, not the other way around.
            </p>
          </div>

          {/* ───────── FORTRA DECISIVE ADVANTAGES (6.4) ───────── */}
          <div className="mx-auto mt-20 max-w-4xl text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Why Fortra wins on Data Loss Prevention
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Eight capabilities that separate Fortra Data Loss Prevention &amp; Data Classification (Digital Guardian + Boldon James) from the rest of the field. What each one means in plain terms for the buying decision.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-2">
            {fortraAdvantages.map((adv, idx) => (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: idx * 0.04 }}
                className="relative overflow-hidden rounded-2xl border border-border-light bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E11D48]/30 hover:shadow-[0_12px_40px_rgba(225,29,72,0.10)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-1 bg-[#E11D48]"
                />
                <div className="flex items-start gap-4 pl-2">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E11D48]/10 font-mono text-xs font-bold text-[#E11D48]">
                    0{idx + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-bold text-heading">
                      {adv.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-body">
                      {adv.meaning}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Capability comparison table */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Comparison
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Capability ratings for the six leading Data Loss Prevention platforms across endpoint DLP, network DLP, cloud / SaaS DLP, user-driven classification, insider threat analytics, OCR / image inspection, and managed-service availability. A gold ★ marker denotes best-in-class performance.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + dlpFeatureVendors.length * 116) }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-5 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">
                      Capability
                    </th>
                    {dlpFeatureVendors.map((v, i) => (
                      <th
                        key={v}
                        className="border-l border-white/15 px-2 py-3 sm:px-4 sm:py-5 align-bottom font-display text-sm font-semibold text-white sm:text-base"
                      >
                        {v}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dlpFeatureRows.map((row, rIdx) => (
                    <tr
                      key={row.label}
                      className={`border-t border-[#0A3D6B]/20 transition-colors hover:bg-[#28B5E1]/[0.04] ${
                        rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                      }`}
                    >
                      <th
                        scope="row"
                        className={`sticky left-0 z-10 px-2 py-3 align-middle sm:px-4 sm:py-4 font-display text-sm font-semibold text-slate-900 ${
                          rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"
                        }`}
                      >
                        {row.label}
                      </th>
                      {row.cells.map((cell, cIdx) => {
                        const t = dlpTierStyles[cell.tier];
                        return (
                          <td
                            key={cIdx}
                            className="border-l border-[#0A3D6B]/20 px-2 py-3 sm:px-4 sm:py-4 align-middle"
                          >
                            <span
                              className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${t.bg} ${t.text}`}
                            >
                              {cell.tier === "best" && <span aria-hidden="true">★</span>}
                              {t.label}
                            </span>
                            <p className="mt-1.5 text-xs leading-snug text-slate-600">
                              {cell.note}
                            </p>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legend */}
          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-3 text-xs text-slate-600">
            <span className="font-mono uppercase tracking-wider text-slate-500">Rating scale:</span>
            {(["best", "excellent", "veryStrong", "strong", "good", "moderate"] as DlpTier[]).map((t) => {
              const s = dlpTierStyles[t];
              return (
                <span
                  key={t}
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${s.bg} ${s.text}`}
                >
                  {t === "best" && <span aria-hidden="true">★</span>}
                  {s.label}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── BUYER'S DECISION GUIDE (6.5) ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Decision Guide"
            title={
              <>
                Tell us what you said in the meeting,{" "}
                <span className="gradient-text">we will tell you what to buy</span>
              </>
            }
            description="The shortest path from buying signal to vendor pick. Each row maps a real DLP procurement conversation to the platform that solves it best for UAE and regional buyers."
            centered
          />

          <div className="mt-12 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)] sm:mt-16">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + buyerDecisionGuide.length * 116) }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="w-[44%] px-5 py-5 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">
                      If the buyer says...
                    </th>
                    <th className="border-l border-white/15 px-5 py-5 align-bottom font-display text-sm font-semibold text-white sm:text-base">
                      Recommend
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {buyerDecisionGuide.map((row, rIdx) => (
                    <tr
                      key={row.says}
                      className={`border-t border-[#0A3D6B]/20 transition-colors hover:bg-[#28B5E1]/[0.04] ${
                        rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                      }`}
                    >
                      <td className="px-5 py-4 align-middle">
                        <p className="font-display text-sm leading-relaxed text-slate-900 sm:text-base">
                          &ldquo;{row.says}&rdquo;
                        </p>
                      </td>
                      <td className="border-l border-[#0A3D6B]/20 px-2 py-3 sm:px-5 sm:py-4 align-middle">
                        <p className="font-display text-sm font-semibold text-[#045891] sm:text-base">
                          {row.recommend}
                        </p>
                        <p className="mt-1 text-xs leading-snug text-slate-600">
                          {row.rationale}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-slate-500">
            Not sure which conversation you are in? Book a 30-minute scoping call and we will map your data classes, threat profile, and existing licenses to the right DLP platform.
          </p>
        </div>
      </section>

      {/* ───────── CLASSIFICATION TEMPLATE CTA ───────── */}
      <section className="relative overflow-hidden bg-[#020617] py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(40,181,225,0.12),transparent_60%)]" />

        <div className="shell relative">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-10 lg:flex-row lg:items-center">
            <div className="flex items-start gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#28B5E1] to-[#045891]">
                <FileTextIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                  Build your data classification framework
                </h3>
                <p className="mt-2 max-w-xl text-sm text-slate-400">
                  A ready-to-use framework for categorising data by sensitivity, with pre-built
                  DLP policies for each tier. Skip the blank-page problem.
                </p>
              </div>
            </div>

            <button
              onClick={openContact}
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#04101E] transition-all hover:bg-[#28B5E1] hover:text-white hover:shadow-[0_8px_32px_rgba(40,181,225,0.4)]"
            >
              Scope Your DLP Programme
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Knowledge Base"
            title={
              <>
                Frequently <span className="gradient-text">Asked</span> Questions
              </>
            }
            centered
          />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* ───────── FINAL CTA ───────── */}
      <CTASection
        title="Stop the quiet breach before it becomes a headline"
        description="Data Loss Prevention is not about paranoia, it is about giving your team the guardrails to work fast without leaking what matters most. Talk to a Data Loss Prevention specialist for the UAE and the wider GCC."
        primaryButton={{ text: "Book a Data Loss Prevention Review", action: "modal" }}
      />
    </>
  );
}
