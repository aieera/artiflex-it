import { useState, lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LightRays = lazy(() => import("@/components/ui/LightRays"));
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import {
  ShieldIcon,
  MonitorIcon,
  LockIcon,
  DatabaseIcon,
  CloudIcon,
  SearchIcon,
  MailIcon,
  LayersIcon,
  CheckIcon,
  StarIcon,
  AlertTriangleIcon,
  FileTextIcon,
  ChevronDownIcon,
  GearIcon,
  WifiIcon,
  EyeIcon,
  ServerIcon,
  GlobeIcon,
  TargetIcon,
} from "@/components/icons";

/* ────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────── */

const heroStats = [
  { value: "$4.88M", label: "AVG. BREACH COST 2024", source: "IBM Cost of Data Breach Report" },
  { value: "73", suffix: " DAYS", label: "AVG. DWELL TIME", source: "Before threat detection" },
  { value: "28,000+", label: "MDR CUSTOMERS", source: "World's largest MDR provider" },
  { value: "99.9%", label: "THREAT PREVENTION RATE", source: "Check Point ThreatCloud AI" },
];

const pillars = [
  {
    number: "01",
    icon: ShieldIcon,
    title: "Firewall / NGFW",
    category: "NETWORK SECURITY",
    description:
      "Next-Generation Firewalls with deep packet inspection, application awareness, and SSL/TLS decryption. The network perimeter's first line of defense — evolved from Palo Alto's 2007 invention through cloud-native SASE architectures.",
  },
  {
    number: "02",
    icon: MonitorIcon,
    title: "Endpoint Detection & Response",
    category: "ENDPOINT SECURITY",
    description:
      "EDR and XDR platforms providing real-time behavioral analysis, automated response, and cross-layer threat correlation. From Sophos' 1985 antivirus invention to AI-powered detection that stops ransomware in milliseconds.",
  },
  {
    number: "03",
    icon: MailIcon,
    title: "Email Security",
    category: "COMMUNICATION SECURITY",
    description:
      "Advanced threat protection against phishing, BEC (Business Email Compromise), malware, and impersonation. Email remains the #1 attack vector — Business Email Compromise alone caused $43B in losses from 2016–2023.",
  },
  {
    number: "04",
    icon: LockIcon,
    title: "Data Loss Prevention",
    category: "DATA PROTECTION",
    description:
      "Content-aware DLP preventing unauthorized data exfiltration across endpoints, email, web, and cloud. With UAE PDPL now in force, DLP compliance is mandatory for organizations processing personal data.",
  },
  {
    number: "05",
    icon: CloudIcon,
    title: "Workspace Protection / SASE",
    category: "CLOUD SECURITY",
    description:
      "ZTNA, CASB, SWG, and FWaaS converged into a cloud-delivered security service edge. Sophos Workspace Protection (launched Jan 2026) provides a complete SSE stack from a single vendor with unified policy enforcement.",
  },
  {
    number: "06",
    icon: LayersIcon,
    title: "SIEM / SOAR / MDR",
    category: "THREAT INTELLIGENCE",
    description:
      "Security Information and Event Management, orchestration, and Managed Detection & Response for 24/7 threat monitoring and response. The Secureworks Taegis platform (acquired by Sophos for USD 859M, Feb 2025) leads the market.",
  },
  {
    number: "07",
    icon: SearchIcon,
    title: "Vulnerability Management",
    category: "RISK MANAGEMENT",
    description:
      "Continuous discovery, assessment, and remediation of vulnerabilities before attackers exploit them. Includes external attack surface management, penetration testing, and advisory services aligned to NESA, UAE PDPL, and PCI-DSS.",
  },
];

interface VendorScorecard {
  name: string;
  subtitle: string;
  score: number;
  maxScore: number;
  badge: "top-pick" | "avoid" | null;
  highlights: string[];
}

const vendors: VendorScorecard[] = [
  {
    name: "Sophos",
    subtitle: "FULL-STACK // SMB TO ENTERPRISE",
    score: 9.8,
    maxScore: 10,
    badge: "top-pick",
    highlights: [
      "Sophos Central — single console for all products",
      "Synchronized Security across all vectors",
      "Secureworks Taegis SIEM (USD 859M, Feb 2025)",
      "28,000+ MDR customers — world's largest",
      "Sophos Workspace Protection launched Jan 2026",
      "Managed Risk + Advisory Services (Oct 2025)",
    ],
  },
  {
    name: "Check Point",
    subtitle: "ENTERPRISE // HYPERSCALE",
    score: 9.6,
    maxScore: 10,
    badge: "top-pick",
    highlights: [
      "99.9% threat prevention rate — industry highest",
      "ThreatCloud AI — 90+ threat intelligence engines",
      "Quantum series: hyperscale up to 3 Tbps throughput",
      "Infinity SOC — AI-powered security operations",
      "Harmony SASE — complete SSE platform",
      "Zero-day prevention via SandBlast",
    ],
  },
  {
    name: "Fortinet",
    subtitle: "PERFORMANCE // CUSTOM ASIC",
    score: 8.3,
    maxScore: 10,
    badge: null,
    highlights: [
      "Custom NP8 ASICs for ultra-high throughput",
      "FortiOS — unified OS across entire portfolio",
      "FortiGuard threat intelligence labs",
      "Strongest price-to-performance in NGFW market",
      "Broad SD-WAN and OT security capabilities",
    ],
  },
  {
    name: "Hexnode UEM",
    subtitle: "UNIFIED ENDPOINT MGMT // BEST TCO",
    score: 8.8,
    maxScore: 10,
    badge: "top-pick",
    highlights: [
      "Best-in-class kiosk mode & IoT device management",
      "40–60% lower TCO vs VMware Workspace ONE",
      "Supports iOS, Android, Windows, macOS, tvOS",
      "Dedicated Middle East support infrastructure",
      "No Broadcom acquisition pricing risk",
    ],
  },
  {
    name: "CrowdStrike",
    subtitle: "ENDPOINT // CLOUD-NATIVE XDR",
    score: 8.1,
    maxScore: 10,
    badge: null,
    highlights: [
      "Falcon platform — lightweight single agent",
      "Threat Graph — 1 trillion events/week analyzed",
      "OverWatch MDR — 24/7 elite threat hunting",
      "Industry leader in Gartner EPP Magic Quadrant",
      "Note: July 2024 global outage affects confidence",
    ],
  },
  {
    name: "Palo Alto Networks",
    subtitle: "ENTERPRISE INNOVATION // ML-POWERED",
    score: 7.2,
    maxScore: 10,
    badge: null,
    highlights: [
      "Inventor of the modern NGFW (2007/2008)",
      "ML-powered inline threat prevention",
      "WildFire cloud sandbox — best-in-class",
      "Prisma Access — complete SASE platform",
      "Cortex XDR for endpoint + network correlation",
    ],
  },
  {
    name: "Cisco",
    subtitle: "ENTERPRISE INTEGRATION // CISCO-CENTRIC",
    score: 7.0,
    maxScore: 10,
    badge: null,
    highlights: [
      "Talos — world's largest threat intelligence team",
      "Encrypted Traffic Analytics (ETA)",
      "Snort 3 IPS engine",
      "Best fit for Cisco-standardised environments",
      "SecureX platform for security operations",
    ],
  },
  {
    name: "Ivanti / MobileIron",
    subtitle: "UEM // CRITICAL CVE RISK",
    score: 2.1,
    maxScore: 10,
    badge: "avoid",
    highlights: [
      "Multiple critical CVEs 2023–2025 (CVSS 9.8+)",
      "Nation-state exploitation confirmed by CISA",
      "Zero-day attacks before patches available",
      "Rebranded from MobileIron — underlying risk unchanged",
      "Recommend immediate migration to Hexnode or Sophos",
    ],
  },
];

const sophosProducts = [
  {
    icon: ShieldIcon,
    title: "Next-Gen Firewall (XGS Series)",
    description:
      "Deep packet inspection, application awareness, SSL/TLS decryption, and Synchronized Security — managed via Sophos Central.",
  },
  {
    icon: MonitorIcon,
    title: "Endpoint Protection (Intercept X)",
    description:
      "AI-powered threat detection, anti-ransomware, exploit prevention, and root cause analysis across all devices.",
  },
  {
    icon: EyeIcon,
    title: "MDR — 24/7 Managed Detection",
    description:
      "World's largest MDR service with 28,000+ customers. Detects, investigates, and responds to threats around the clock.",
  },
  {
    icon: MailIcon,
    title: "Email & Phishing Protection",
    description:
      "NLP-powered anti-phishing, BEC detection, attachment sandboxing, and DMARC/DKIM/SPF enforcement.",
  },
  {
    icon: CloudIcon,
    title: "Workspace Protection / SASE",
    description:
      "ZTNA, CASB, SWG, and FWaaS converged into a single cloud-delivered security service edge. Launched Jan 2026.",
  },
  {
    icon: LayersIcon,
    title: "XDR — Extended Detection & Response",
    description:
      "AI-native platform correlating threats across endpoints, network, email, cloud, and identity for multi-vector attack detection.",
  },
  {
    icon: TargetIcon,
    title: "Managed Risk (Vulnerability Mgmt)",
    description:
      "Powered by Tenable. Continuous vulnerability discovery, attack surface management, and prioritized remediation. Launched Oct 2025.",
  },
  {
    icon: WifiIcon,
    title: "Wireless & Network Switches",
    description:
      "AP6 Series Wi-Fi 6/6E access points and cloud-managed network switches — all integrated into Sophos Central.",
  },
  {
    icon: ServerIcon,
    title: "Server & Cloud Protection",
    description:
      "Intercept X for servers defending cloud, on-premises, and virtual environments with anti-exploit and runtime detection.",
  },
  {
    icon: GearIcon,
    title: "Sophos Central — Unified Console",
    description:
      "Single pane of glass for managing all Sophos products. Real-time information sharing and automated incident response across your entire stack.",
  },
];

const sophosBenefits = [
  { value: "600K+", label: "Organizations Defended Globally" },
  { value: "100M+", label: "Users Protected Worldwide" },
  { value: "28K+", label: "MDR Customers — World's Largest" },
  { value: "1", label: "Unified Console for All Products" },
];

const sophosDeploySteps = [
  {
    number: "01",
    title: "Assess",
    description: "Survey your sites, audit existing security tools, and map requirements to Sophos components.",
  },
  {
    number: "02",
    title: "Configure",
    description: "Pre-stage all hardware and software with your policies, rules, and network topology — ready to deploy.",
  },
  {
    number: "03",
    title: "Deploy",
    description: "On-site installation with zero-downtime cutover. Plug in, validate, go live.",
  },
  {
    number: "04",
    title: "Monitor",
    description: "24/7 monitoring through Sophos Central with our SOC team on watch.",
  },
];

const complianceFrameworks = [
  {
    name: "NESA",
    fullName: "National Electronic Security Authority",
    description:
      "UAE's primary cybersecurity standard — mandates information assurance controls across Critical Information Infrastructure (CII) sectors. Covers 188 controls across five domains.",
    scope: "Critical Infrastructure Mandatory",
  },
  {
    name: "UAE PDPL",
    fullName: "Personal Data Protection Law — Federal Decree No. 45/2021",
    description:
      "UAE's GDPR-equivalent — now in force. Requires data minimization, consent management, breach notification within 72 hours, and DLP controls for personal data processors.",
    scope: "All Organizations — In Force",
  },
  {
    name: "CBUAE",
    fullName: "Central Bank of the UAE — Cybersecurity Framework",
    description:
      "Mandatory for all licensed financial institutions in the UAE. Covers 12 cybersecurity domains including vulnerability management, incident response, and third-party risk.",
    scope: "Financial Sector Mandatory",
  },
  {
    name: "HIFSA",
    fullName: "Health Information and Cyber Security Standards",
    description:
      "DHA and HAAD-enforced cybersecurity standards for healthcare organizations. Requires encryption of patient data at rest and in transit, plus access controls and audit logging.",
    scope: "Healthcare Sector Mandatory",
  },
  {
    name: "PCI-DSS V4",
    fullName: "Payment Card Industry Data Security Standard",
    description:
      "Mandatory for any organization handling cardholder data. Version 4.0 introduces customized implementation paths and enhanced multi-factor authentication requirements.",
    scope: "Payment Processing Mandatory",
  },
  {
    name: "ADGM / DIFC",
    fullName: "Free Zone Financial Cybersecurity Requirements",
    description:
      "Abu Dhabi Global Market and Dubai International Financial Centre each publish separate cybersecurity frameworks for entities operating within their jurisdictions, aligned to international standards.",
    scope: "Free Zone Entities",
  },
  {
    name: "ISO 27001",
    fullName: "Information Security Management System",
    description:
      "International standard increasingly required by UAE government tenders and large enterprise procurement. Provides the governance framework within which all technical controls operate.",
    scope: "Government Tenders / Best Practice",
  },
];

const faqs = [
  {
    question: "What is the average cost of a data breach for UAE enterprises in 2024?",
    answer:
      "According to IBM's 2024 Cost of Data Breach Report, the average cost of a data breach in the Middle East reached $6.93 million — 69% higher than the global average of $4.88 million. For UAE enterprises specifically, costs are driven by regulatory penalties (NESA, UAE PDPL), business disruption, customer churn, and incident response. Organizations with AI-powered security and automated response reduce breach costs by an average of $2.2 million compared to those without.",
  },
  {
    question: "What's the difference between EDR and XDR, and which should we choose?",
    answer:
      "EDR (Endpoint Detection & Response) monitors and responds to threats on individual endpoints — laptops, servers, and workstations. XDR (Extended Detection & Response) correlates threat data across endpoints, network, email, cloud, and identity systems for a unified view. For most UAE enterprises, XDR is the recommended choice because it eliminates blind spots between security layers. Sophos XDR and CrowdStrike Falcon are leading platforms in this space.",
  },
  {
    question: "Is UAE PDPL similar to GDPR, and what penalties apply for non-compliance?",
    answer:
      "Yes — UAE's Personal Data Protection Law (Federal Decree No. 45/2021) is modeled on GDPR principles. It mandates data minimization, consent management, breach notification within 72 hours, and the appointment of a Data Protection Officer for certain processors. Non-compliance penalties include fines up to AED 5 million, operational restrictions, and criminal liability for severe violations. Organizations must implement DLP controls, encryption, and access governance to comply.",
  },
  {
    question: "What is SASE and does my organization need it?",
    answer:
      "SASE (Secure Access Service Edge) combines SD-WAN with cloud-delivered security services: ZTNA (Zero Trust Network Access), CASB (Cloud Access Security Broker), SWG (Secure Web Gateway), and FWaaS (Firewall as a Service). If your organization has remote workers, cloud applications, or multiple office locations, SASE replaces legacy VPN infrastructure with faster, more secure access. Sophos Workspace Protection (launched January 2026) provides a complete SSE stack from a single vendor.",
  },
  {
    question: "Should we build a SOC internally or use an MDR service?",
    answer:
      "Building an internal SOC requires 8–12 analysts (AED 15,000–25,000/month each), SIEM licensing (AED 200,000–500,000/year), and 12–18 months to reach operational maturity. MDR (Managed Detection & Response) delivers equivalent or superior coverage from day one at a fraction of the cost. Sophos MDR, with 28,000+ customers, is the world's largest MDR provider. For most UAE organizations with fewer than 500 employees, MDR is the more cost-effective and operationally superior choice.",
  },
  {
    question: "How often should we conduct penetration testing?",
    answer:
      "At minimum, annually — but best practice for UAE enterprises is quarterly external testing and semi-annual internal testing. Organizations under NESA, CBUAE, or PCI-DSS must test after every significant infrastructure change. Sophos Managed Risk (launched October 2025) provides continuous vulnerability assessment with on-demand penetration testing, replacing point-in-time assessments with always-on visibility.",
  },
  {
    question: "Why should we avoid Ivanti/MobileIron for UEM?",
    answer:
      "Ivanti (formerly MobileIron) has had multiple critical CVEs between 2023–2025, all rated CVSS 9.8+. CISA confirmed nation-state exploitation of these vulnerabilities, including zero-day attacks before patches were available. The platform's underlying architecture carries systemic risk. We recommend immediate migration to Hexnode UEM (40–60% lower TCO, dedicated Middle East support) or Sophos Mobile for organizations currently using Ivanti products.",
  },
  {
    question: "What cybersecurity framework is best for a UAE financial institution?",
    answer:
      "UAE financial institutions must comply with the CBUAE Cybersecurity Framework, which covers 12 domains including access control, vulnerability management, incident response, and third-party risk. Overlay this with NESA for critical infrastructure requirements, PCI-DSS v4 for payment processing, and ADGM/DIFC frameworks if operating within those free zones. ISO 27001 provides the governance layer. We map all controls across frameworks to eliminate duplication and reduce audit burden.",
  },
  {
    question: "How does Next-Generation Firewall differ from a traditional firewall?",
    answer:
      "Traditional firewalls filter traffic based on port, protocol, and IP address — they cannot inspect encrypted traffic or identify applications. NGFWs add deep packet inspection, application awareness, SSL/TLS decryption, integrated IPS, and threat intelligence feeds. Modern NGFWs like Sophos XGS and Check Point Quantum also integrate with endpoint security for synchronized response. For UAE enterprises, NGFW is the minimum standard — traditional firewalls are no longer sufficient for regulatory compliance.",
  },
  {
    question: "What is the recommended approach to email security in 2026?",
    answer:
      "Email remains the #1 attack vector — Business Email Compromise alone caused $43B in losses from 2016–2023. A modern email security strategy requires: (1) AI-powered anti-phishing with impersonation detection, (2) attachment and URL sandboxing, (3) DMARC/DKIM/SPF enforcement, (4) DLP policies for outbound email, and (5) user awareness training. Sophos Email Security and Check Point Harmony Email both provide these capabilities with cloud-native deployment and Microsoft 365 integration.",
  },
];

/* ────────────────────────────────────────────
   JSON-LD STRUCTURED DATA (SEO + AEO)
   ──────────────────────────────────────────── */

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Enterprise Cybersecurity Solutions Guide 2026 — 7 Security Pillars, Vendor Comparisons, UAE Compliance",
  description:
    "The complete enterprise cybersecurity blueprint: 7 security pillars, top vendor scorecards with ratings, UAE compliance requirements (NESA, PDPL, CBUAE), and a 12-month implementation roadmap.",
  author: { "@type": "Organization", name: "ArtiflexIT", url: "https://artiflexit.com" },
  publisher: { "@type": "Organization", name: "ArtiflexIT", url: "https://artiflexit.com" },
  datePublished: "2026-01-15",
  dateModified: "2026-03-18",
  mainEntityOfPage: "https://artiflexit.com/cybersecurity",
  keywords:
    "enterprise cybersecurity UAE, NGFW Dubai, EDR XDR Middle East, SASE solutions, UAE PDPL compliance, NESA cybersecurity, CBUAE framework, Sophos partner UAE, managed detection response",
};

/* ────────────────────────────────────────────
   VENDOR CARD COMPONENT
   ──────────────────────────────────────────── */

function VendorCard({ vendor }: { vendor: VendorScorecard }) {
  const isAvoid = vendor.badge === "avoid";
  const isTopPick = vendor.badge === "top-pick";
  const barColor = isAvoid
    ? "bg-red-500"
    : vendor.score >= 9
      ? "bg-gradient-to-r from-amber-500 to-yellow-400"
      : vendor.score >= 8
        ? "bg-brand-blue"
        : "bg-slate-500";
  const borderColor = isAvoid
    ? "border-red-500/30 hover:border-red-500/50"
    : isTopPick
      ? "border-amber-500/20 hover:border-amber-500/40"
      : "border-white/[0.06] hover:border-white/[0.12]";

  return (
    <div
      className={`relative rounded-2xl border bg-gradient-to-br from-navy-light/60 to-navy-deep/80 p-6 transition-all duration-300 ${borderColor}`}
    >
      {/* Top accent bar */}
      <div
        className={`absolute inset-x-0 top-0 h-0.5 rounded-t-2xl ${
          isAvoid ? "bg-red-500" : isTopPick ? "bg-gradient-to-r from-amber-500 to-yellow-400" : "bg-brand-blue/30"
        }`}
      />

      {/* Badge */}
      {vendor.badge && (
        <span
          className={`absolute right-4 top-4 rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${
            isAvoid
              ? "bg-red-500/20 text-red-400 border border-red-500/30"
              : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
          }`}
        >
          {isAvoid ? "AVOID" : "TOP PICK"}
        </span>
      )}

      {/* Name & subtitle */}
      <h3
        className={`font-display text-xl font-bold ${isAvoid ? "text-red-400" : "text-white"}`}
      >
        {vendor.name}
      </h3>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-slate-500">
        {vendor.subtitle}
      </p>

      {/* Score bar */}
      <div className="mt-4 flex items-center gap-3">
        <span
          className={`font-display text-2xl font-bold sm:text-3xl ${isAvoid ? "text-red-400" : "text-brand-cyan"}`}
        >
          {vendor.score}
        </span>
        <div className="flex-1">
          <div className="h-1.5 w-full rounded-full bg-white/[0.06]">
            <div
              className={`h-full rounded-full transition-all duration-700 ${barColor}`}
              style={{ width: `${(vendor.score / vendor.maxScore) * 100}%` }}
            />
          </div>
        </div>
        <span className="text-xs text-slate-500">/{vendor.maxScore}</span>
      </div>

      {/* Highlights */}
      <ul className="mt-4 space-y-2">
        {vendor.highlights.map((h) => (
          <li
            key={h}
            className={`flex items-start gap-2 text-sm leading-relaxed ${
              isAvoid ? "text-red-300/80" : "text-slate-400"
            }`}
          >
            <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${isAvoid ? "bg-red-500" : "bg-brand-cyan"}`} />
            {h}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ────────────────────────────────────────────
   FAQ ACCORDION COMPONENT
   ──────────────────────────────────────────── */

function FAQAccordion({ items }: { items: typeof faqs }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-white/[0.06]">
      {items.map((item, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-white"
            aria-expanded={openIndex === i}
          >
            <span className="font-display text-base font-semibold text-white sm:text-lg">
              {item.question}
            </span>
            <ChevronDownIcon
              className={`h-5 w-5 shrink-0 text-brand-cyan transition-transform duration-300 ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          <motion.div
            initial={false}
            animate={{
              height: openIndex === i ? "auto" : 0,
              opacity: openIndex === i ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-slate-400">
              {item.answer}
            </p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────
   PAGE COMPONENT
   ──────────────────────────────────────────── */

export default function CybersecurityPage() {
  const { open: openContact } = useContactModal();

  return (
    <>
      <Helmet>
        <title>Enterprise Cybersecurity Solutions UAE 2026 — NGFW, EDR, SASE, SIEM | ArtiflexIT Dubai</title>
        <meta
          name="description"
          content="The complete enterprise cybersecurity guide for UAE businesses: 7 security pillars (NGFW, EDR, Email, DLP, SASE, SIEM, VAPT), vendor scorecards, NESA & UAE PDPL compliance, and a 12-month deployment roadmap. ArtiflexIT Dubai."
        />
        <meta
          name="keywords"
          content="enterprise cybersecurity solutions UAE, NGFW Dubai, EDR XDR Middle East, SASE solutions UAE, UAE PDPL compliance, NESA cybersecurity framework, CBUAE regulations, Sophos partner Dubai, managed detection response UAE, cybersecurity vendor comparison 2026, penetration testing UAE, SOC as a service Dubai"
        />
        <link rel="canonical" href="https://artiflexit.com/cybersecurity" />
        <meta property="og:title" content="Enterprise Cybersecurity Solutions Guide 2026 | ArtiflexIT UAE" />
        <meta
          property="og:description"
          content="7 security pillars, vendor scorecards, UAE compliance mapping, and 12-month deployment roadmap — the definitive cybersecurity blueprint for UAE enterprises."
        />
        <meta property="og:url" content="https://artiflexit.com/cybersecurity" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* ═══════════════════════════════════════
          HERO — DEFEND. DETECT. DOMINATE.
          ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-deep via-navy to-navy-light">
        {/* Interactive LightRays background */}
        <Suspense fallback={null}>
          <LightRays
            raysOrigin="top-center"
            raysColor="#1B8AC7"
            raysSpeed={0.8}
            lightSpread={1.2}
            rayLength={2}
            fadeDistance={1}
            saturation={1}
            followMouse={true}
            mouseInfluence={0.15}
            distortion={0.3}
          />
        </Suspense>
        <div className="absolute inset-0 z-[3] bg-gradient-to-b from-navy-deep/50 via-navy-deep/30 to-navy-deep/70 pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-20 md:pt-44 md:pb-24 lg:pt-48 lg:pb-28">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-400 sm:text-sm">
              <li><Link to="/" className="transition-colors hover:text-white">Home</Link></li>
              <li className="flex items-center gap-2">
                <span className="text-slate-600">/</span>
                <Link to="/services" className="transition-colors hover:text-white">Services</Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-slate-600">/</span>
                <span className="text-brand-cyan font-medium">Cybersecurity</span>
              </li>
            </ol>
          </nav>

          {/* Badge */}
          <div className="mb-4 sm:mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-brand-cyan sm:px-4 sm:py-1.5 sm:text-xs">
              // Enterprise Cybersecurity Guide 2026
            </span>
          </div>

          {/* Heading */}
          <div className="max-w-4xl">
            <h1 className="font-display text-[2.5rem] font-black leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">DEFEND.</span>
              <span className="block">DETECT.</span>
              <span className="block gradient-text">DOMINATE.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-lg md:text-xl">
              The complete enterprise cybersecurity blueprint — 7 security pillars, top vendor comparisons, UAE compliance requirements, and a 12-month implementation roadmap.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button variant="gradient" size="lg" href="#pillars" arrow className="w-full sm:w-auto">
              Explore Solutions
            </Button>
            <Button variant="outline" size="lg" href="#vendors" className="w-full sm:w-auto">
              Compare Vendors
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STATS BAR
          ═══════════════════════════════════════ */}
      <section className="relative border-y border-white/[0.06] bg-navy-deep" aria-label="Industry statistics">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid grid-cols-2 divide-x divide-white/[0.06] lg:grid-cols-4">
            {heroStats.map((stat) => (
              <div key={stat.label} className="px-3 py-6 text-center sm:px-8 sm:py-10">
                <span className="font-display text-xl font-bold text-brand-cyan sm:text-3xl md:text-4xl">
                  {stat.value}
                  {stat.suffix || ""}
                </span>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-slate-500">
                  {stat.label}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">{stat.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          7 SECURITY PILLARS
          ═══════════════════════════════════════ */}
      <section id="pillars" className="relative py-16 bg-navy sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Security Pillars"
            title={
              <>
                7 <span className="gradient-text">Essential</span> Solutions
              </>
            }
            description="Every enterprise requires these seven security layers to achieve comprehensive protection across network, endpoint, data, and identity."
            centered
          />

          <div className="space-y-6">
            {pillars.map((pillar) => (
              <article
                key={pillar.number}
                className="group relative rounded-2xl border border-white/[0.06] bg-gradient-to-br from-navy-light/40 to-navy-deep/60 p-6 transition-all duration-300 hover:border-brand-cyan/20 hover:shadow-lg hover:shadow-brand-cyan/5 sm:p-8"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                  {/* Icon */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-cyan/20 bg-brand-cyan/5 text-brand-cyan transition-colors group-hover:border-brand-cyan/40 group-hover:bg-brand-cyan/10">
                    <pillar.icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1">
                    {/* Pillar number & category */}
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs uppercase tracking-widest text-brand-cyan">
                        Pillar {pillar.number}
                      </span>
                      <span className="rounded-md border border-brand-cyan/20 bg-brand-cyan/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-brand-cyan">
                        {pillar.category}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          VENDOR SCORECARDS
          ═══════════════════════════════════════ */}
      <section id="vendors" className="relative py-16 bg-navy-deep sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Vendor Analysis"
            title={
              <>
                Top <span className="gradient-text">Vendor</span> Scorecards
              </>
            }
            description="Expert-assessed ratings based on TCO, threat efficacy, management simplicity, support, and roadmap confidence."
            centered
          />

          {/* Legend */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-6 text-sm">
            <span className="flex items-center gap-2">
              <StarIcon className="h-4 w-4 text-amber-400" />
              <span className="font-semibold text-amber-400">TOP PICK</span>
              <span className="text-slate-500">= Recommended</span>
            </span>
            <span className="flex items-center gap-2">
              <AlertTriangleIcon className="h-4 w-4 text-red-400" />
              <span className="font-semibold text-red-400">AVOID</span>
              <span className="text-slate-500">= Known Risk</span>
            </span>
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {vendors.map((vendor) => (
              <VendorCard key={vendor.name} vendor={vendor} />
            ))}
          </div>

          {/* Advisory Services callout */}
          <div className="mt-12 rounded-2xl border border-brand-cyan/20 bg-gradient-to-r from-brand-cyan/5 to-brand-purple/5 p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-brand-cyan">Advisory Services</h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-slate-500">
                  Sophos Managed Risk — Launched Oct 2025
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
                  Gap assessment, penetration testing (external, internal, wireless, web app), and Emergency Incident Response retainer. Accelerate compliance across all UAE frameworks with expert-led engagements.
                </p>
              </div>
              <div className="shrink-0">
                <span className="inline-block rounded-md border border-brand-cyan/30 bg-brand-cyan/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-brand-cyan">
                  Available Now
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SOPHOS SITE-IN-A-BOX — FEATURED SOLUTION
          ═══════════════════════════════════════ */}
      <section id="sophos" className="relative py-16 bg-navy overflow-hidden sm:py-24">
        {/* Top accent */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple" />

        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 px-5 py-2 text-xs font-bold uppercase tracking-widest text-brand-cyan">
              <ShieldIcon className="w-4 h-4" />
              Featured Solution — Authorized Sophos Partner
            </span>
          </div>

          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-16">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6">
              Sophos Cybersecurity Platform —{" "}
              <span className="gradient-text">Site-in-a-Box</span>
            </h2>
            <p className="text-base text-slate-400 leading-relaxed max-w-3xl mx-auto sm:text-lg">
              A complete, pre-configured security stack from one vendor — firewall, endpoint, email, wireless, MDR, XDR, SASE, and unified management. Defending 600,000+ organizations and 100 million+ users globally.
            </p>
          </div>

          {/* Benefits Stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 max-w-4xl mx-auto mb-10 sm:mb-16">
            {sophosBenefits.map((b) => (
              <div key={b.label} className="text-center">
                <span className="font-display text-2xl font-bold text-brand-cyan sm:text-3xl">{b.value}</span>
                <p className="mt-1 text-xs text-slate-400">{b.label}</p>
              </div>
            ))}
          </div>

          {/* Product Grid */}
          <div className="mb-16">
            <h3 className="font-display text-xl font-semibold text-white text-center mb-8">
              Complete Product Portfolio
            </h3>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">
              {sophosProducts.map((product) => (
                <div
                  key={product.title}
                  className="group rounded-2xl border border-white/[0.06] bg-gradient-to-br from-navy-light/50 to-navy-deep/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-cyan/20 hover:shadow-lg hover:shadow-brand-cyan/5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-brand-cyan/20 bg-brand-cyan/5 text-brand-cyan transition-colors group-hover:bg-brand-cyan/10">
                    <product.icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-display text-sm font-semibold text-white mb-2">{product.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{product.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Deployment Process */}
          <div className="mb-16">
            <h3 className="font-display text-xl font-semibold text-white text-center mb-8">
              Deployment Process
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
              {sophosDeploySteps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-brand-cyan/30 bg-navy-deep">
                    <span className="font-display text-lg font-bold text-brand-cyan">{step.number}</span>
                  </div>
                  <h4 className="font-display text-base font-semibold text-white mb-2">{step.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sophos iframe embed */}
          <div className="mb-12">
            <h3 className="font-display text-xl font-semibold text-white text-center mb-2">
              Explore Sophos Solutions
            </h3>
            <p className="text-sm text-slate-500 text-center mb-8">
              Browse the full Sophos product catalog and configure your security stack directly.
            </p>
            <div className="relative rounded-2xl border border-white/[0.08] bg-navy-deep/50 overflow-hidden shadow-2xl shadow-black/30">
              <iframe
                src="https://www.sophos.com/en-us/site-in-a-box?partner_referral_id=0014w000047pf2XAAQ"
                title="Sophos Site-in-a-Box — Configure your complete cybersecurity stack"
                className="w-full border-0"
                style={{ height: "min(800px, 80vh)", minHeight: "400px" }}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button variant="gradient" size="lg" onClick={openContact}>
              Request Deployment Plan
            </Button>
            <p className="mt-3 text-xs text-slate-500">
              ArtiflexIT is an authorized Sophos partner serving the UAE and Middle East.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          UAE COMPLIANCE REQUIREMENTS
          ═══════════════════════════════════════ */}
      <section id="compliance" className="relative py-16 bg-navy sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Regulatory Framework"
            title={
              <>
                UAE <span className="gradient-text">Compliance</span> Requirements
              </>
            }
            description="Organizations operating in the UAE must satisfy multiple overlapping cybersecurity frameworks. Non-compliance can result in fines, operational restrictions, and reputational damage."
            centered
          />

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {complianceFrameworks.map((fw) => (
              <Card key={fw.name} className="flex flex-col p-5 sm:p-6">
                <h3 className="font-display text-xl font-bold text-amber-400">{fw.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{fw.fullName}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                  {fw.description}
                </p>
                <div className="mt-4">
                  <span className="inline-block rounded-md border border-amber-500/20 bg-amber-500/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-amber-400">
                    {fw.scope}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQ (AEO-OPTIMIZED)
          ═══════════════════════════════════════ */}
      <section id="faq" className="relative py-16 bg-navy sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Knowledge Base"
            title={
              <>
                Frequently <span className="gradient-text">Asked</span> Questions
              </>
            }
            description="Expert answers to the most common cybersecurity questions from UAE enterprise decision-makers."
            centered
          />

          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA
          ═══════════════════════════════════════ */}
      <CTASection
        title="Get Your Security Assessment"
        description="Book a free cybersecurity posture review. Our team identifies your top risks, maps them to solutions, and delivers a remediation roadmap aligned to NESA, UAE PDPL, and your industry requirements."
        primaryButton={{ text: "Get Assessment", action: "modal" }}
        secondaryButton={{ text: "Explore All Services", href: "/services" }}
      />
    </>
  );
}
