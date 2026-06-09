import { useState, lazy } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import { sophosBenefits, sophosProducts } from "./cybersecurity/data/sophos";
import {
  ShieldIcon,
  MonitorIcon,
  CloudIcon,
  MailIcon,
  LayersIcon,
  ChevronDownIcon,
  WifiIcon,
  EyeIcon,
  TargetIcon,
  UsersIcon,
  ArrowRightIcon,
  PhoneIcon,
  CpuIcon,
} from "@/components/icons";

const LightRays = lazy(() => import("@/components/ui/LightRays"));

/* ────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────── */

const heroStats = [
  { value: "$6.93M", label: "AVG. BREACH COST, MIDDLE EAST", source: "IBM 2024: 69% above global avg" },
  { value: "300%", label: "RANSOMWARE SURGE IN GCC", source: "2022–2024 targeting businesses" },
  { value: "28,000+", label: "MDR CUSTOMERS PROTECTED", source: "Sophos: world's largest MDR" },
  { value: "<48h", label: "CRITICAL PATCH RESPONSE", source: "Sophos avg. patch time" },
];

const threatImpact = [
  { area: "Financial Loss", detail: "Average breach cost USD 6.93M in Middle East; ransomware demands averaging USD 1.5M+" },
  { area: "Operational Disruption", detail: "Average 21 days downtime post-ransomware; critical systems offline; productivity collapse" },
  { area: "Regulatory Penalties", detail: "Fines up to AED 5M under UAE PDPL; mandatory breach notification within 72 hours" },
  { area: "Reputational Damage", detail: "Average 7.5% stock price decline post-breach; loss of customer trust and media exposure" },
  { area: "Competitive Loss", detail: "Intellectual property theft; customer data exfiltration; M&A deals collapse post-breach" },
  { area: "Supply Chain Risk", detail: "Single vendor vulnerability cascades into thousands of organizations: SolarWinds, Log4j, MOVEit" },
];

const businessImpact = [
  {
    area: "Financial Loss",
    detail:
      "Average breach cost USD 4.88M; ransomware demands averaging USD 1.5M+; regulatory fines up to USD 20M under GDPR.",
  },
  {
    area: "Operational Disruption",
    detail:
      "Average downtime of 21 days post-ransomware attack; critical systems offline; productivity collapse.",
  },
  {
    area: "Reputational Damage",
    detail:
      "Loss of customer trust; stock price decline (average -7.5% post-breach); media exposure.",
  },
  {
    area: "Legal & Regulatory",
    detail:
      "Mandatory breach notification; class-action lawsuits; director liability; loss of operating licences.",
  },
  {
    area: "Competitive Disadvantage",
    detail:
      "Intellectual property theft; competitor gains through stolen R&D; customer data exfiltration.",
  },
  {
    area: "Strategic Setback",
    detail:
      "M&A deals collapse post-breach discovery; investment rounds derailed; board-level leadership changes.",
  },
];

const pillars = [
  {
    number: "01",
    icon: ShieldIcon,
    title: "Next-Generation Firewall (NGFW)",
    category: "NETWORK SECURITY",
    href: "/cybersecurity/firewalls-network-security",
    description:
      "Deep packet inspection, application-aware traffic control, and TLS 1.3 decryption at line rate...",
  },
  {
    number: "02",
    icon: MonitorIcon,
    title: "Endpoint Detection & Response (EDR/XDR)",
    category: "ENDPOINT SECURITY",
    href: "/cybersecurity/endpoint-security-edr-xdr",
    description:
      "AI-powered behavioral analysis, anti-ransomware rollback, and cross-layer threat correlation...",
  },
  {
    number: "03",
    icon: MailIcon,
    title: "Email Security & Anti-Phishing",
    category: "COMMUNICATION SECURITY",
    href: "/cybersecurity/email-security",
    description:
      "NLP-powered phishing detection, BEC impersonation prevention, attachment sandboxing...",
  },
  {
    number: "05",
    icon: CloudIcon,
    title: "SASE & Zero Trust Network Access",
    category: "CLOUD & REMOTE ACCESS",
    href: "/cybersecurity/workspace-protection-sse-sase",
    description:
      "ZTNA, CASB, SWG, and Firewall-as-a-Service converged into a cloud-delivered security service edge...",
  },
  {
    number: "06",
    icon: EyeIcon,
    title: "Security Operations",
    category: "SECURITY OPERATIONS",
    href: "/cybersecurity/security-operations",
    description:
      "SIEM, MDR, NDR, compliance and OT/IoT in one programme. Vendor comparison and Gartner-style scorecard across Rapid7, Nozomi, Fortra Tripwire and Sophos MDR.",
  },
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
    description: "Pre-stage all hardware and software with your policies, rules, and network topology, ready to deploy.",
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
      "UAE's primary cybersecurity standard, mandating information assurance controls across Critical Information Infrastructure (CII) sectors. Covers 188 controls across five domains.",
    scope: "Critical Infrastructure Mandatory",
  },
  {
    name: "UAE PDPL",
    fullName: "Personal Data Protection Law (Federal Decree No. 45/2021)",
    description:
      "UAE's GDPR-equivalent, now in force. Requires data minimization, consent management, breach notification within 72 hours, and DLP controls for personal data processors.",
    scope: "All Organizations (In Force)",
  },
  {
    name: "CBUAE",
    fullName: "Central Bank of the UAE: Cybersecurity Framework",
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
      "According to IBM's 2024 Cost of Data Breach Report, the average cost of a data breach in the Middle East reached $6.93 million, 69% higher than the global average of $4.88 million. For UAE enterprises specifically, costs are driven by regulatory penalties (NESA, UAE PDPL), business disruption, customer churn, and incident response. Organizations with AI-powered security and automated response reduce breach costs by an average of $2.2 million compared to those without.",
  },
  {
    question: "What's the difference between EDR and XDR, and which should we choose?",
    answer:
      "EDR (Endpoint Detection & Response) monitors and responds to threats on individual endpoints: laptops, servers, and workstations. XDR (Extended Detection & Response) correlates threat data across endpoints, network, email, cloud, and identity systems for a unified view. For most UAE enterprises, XDR is the recommended choice because it eliminates blind spots between security layers. Sophos XDR and CrowdStrike Falcon are leading platforms in this space.",
  },
  {
    question: "Is UAE PDPL similar to GDPR, and what penalties apply for non-compliance?",
    answer:
      "Yes. UAE's Personal Data Protection Law (Federal Decree No. 45/2021) is modeled on GDPR principles. It mandates data minimization, consent management, breach notification within 72 hours, and the appointment of a Data Protection Officer for certain processors. Non-compliance penalties include fines up to AED 5 million, operational restrictions, and criminal liability for severe violations. Organizations must implement DLP controls, encryption, and access governance to comply.",
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
      "At minimum, annually, but best practice for UAE enterprises is quarterly external testing and semi-annual internal testing. Organizations under NESA, CBUAE, or PCI-DSS must test after every significant infrastructure change. Sophos Managed Risk (launched October 2025) provides continuous vulnerability assessment with on-demand penetration testing, replacing point-in-time assessments with always-on visibility.",
  },
  {
    question: "What cybersecurity framework is best for a UAE financial institution?",
    answer:
      "UAE financial institutions must comply with the CBUAE Cybersecurity Framework, which covers 12 domains including access control, vulnerability management, incident response, and third-party risk. Overlay this with NESA for critical infrastructure requirements, PCI-DSS v4 for payment processing, and ADGM/DIFC frameworks if operating within those free zones. ISO 27001 provides the governance layer. We map all controls across frameworks to eliminate duplication and reduce audit burden.",
  },
  {
    question: "How does Next-Generation Firewall differ from a traditional firewall?",
    answer:
      "Traditional firewalls filter traffic based on port, protocol, and IP address; they cannot inspect encrypted traffic or identify applications. NGFWs add deep packet inspection, application awareness, SSL/TLS decryption, integrated IPS, and threat intelligence feeds. Modern NGFWs like Sophos XGS and Check Point Quantum also integrate with endpoint security for synchronized response. For UAE enterprises, NGFW is the minimum standard. Traditional firewalls are no longer sufficient for regulatory compliance.",
  },
  {
    question: "What is the recommended approach to email security in 2026?",
    answer:
      "Email remains the #1 attack vector. Business Email Compromise alone caused $43B in losses from 2016 to 2023. A modern email security strategy requires: (1) AI-powered anti-phishing with impersonation detection, (2) attachment and URL sandboxing, (3) DMARC/DKIM/SPF enforcement, (4) DLP policies for outbound email, and (5) user awareness training. Sophos Email Security and Check Point Harmony Email both provide these capabilities with cloud-native deployment and Microsoft 365 integration.",
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
  headline: "Cybersecurity Solutions UAE | NGFW, EDR, SASE, MDR | Platinum Sophos Partner | ArtiflexIT",
  description:
    "End-to-end enterprise cybersecurity for UAE businesses. Firewall, endpoint protection, email security, SASE, SIEM, and managed detection, delivered by ArtiflexIT, Platinum Sophos Partner in Dubai. NESA, UAE PDPL, and CBUAE compliance.",
  author: { "@type": "Organization", name: "ArtiflexIT", url: "https://artiflexit.com" },
  publisher: { "@type": "Organization", name: "ArtiflexIT", url: "https://artiflexit.com" },
  datePublished: "2026-01-15",
  dateModified: "2026-03-18",
  mainEntityOfPage: "https://artiflexit.com/cybersecurity",
  keywords:
    "enterprise cybersecurity UAE, NGFW Dubai, EDR XDR Middle East, SASE solutions, UAE PDPL compliance, NESA cybersecurity, CBUAE framework, Sophos partner UAE, managed detection response",
};


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
            <span className="font-display text-base font-semibold text-heading sm:text-lg">
              {item.question}
            </span>
            <ChevronDownIcon
              className={`h-5 w-5 shrink-0 text-[#045891] transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""
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
            <p className="pb-5 text-sm leading-relaxed text-body">
              {item.answer}
            </p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────
   THREAT LANDSCAPE FORCES: accordion data
   ──────────────────────────────────────────── */

const threatLandscapeForces = [
  {
    title: "Explosion of Attack Surfaces",
    description:
      "Every cloud workload, remote employee device, IoT sensor, and SaaS application is a potential entry point.",
    tag: "Surface",
  },
  {
    title: "Sophisticated Threat Actors",
    description:
      "AI-powered phishing, deepfake social engineering, and zero-day exploit kits sell on criminal marketplaces for as little as USD 100.",
    tag: "Actors",
  },
  {
    title: "Regulatory Mandates",
    description:
      "GDPR, HIPAA, ISO 27001, NIST CSF, PCI-DSS, and regional data protection laws impose penalties up to 4% of global annual turnover.",
    tag: "Compliance",
  },
  {
    title: "Supply Chain Compromise",
    description:
      "SolarWinds, Log4j, and MOVEit proved a single vendor vulnerability can cascade into thousands of organisations simultaneously.",
    tag: "Supply Chain",
  },
  {
    title: "Remote & Hybrid Work",
    description:
      "The dissolution of the corporate perimeter has made traditional castle-and-moat security architectures obsolete.",
    tag: "Perimeter",
  },
  {
    title: "Digital Transformation Dependency",
    description:
      "Business-critical operations (finance, manufacturing, healthcare, logistics) now depend entirely on digital infrastructure.",
    tag: "Dependency",
  },
];

/* ────────────────────────────────────────────
   FORCE ACCORDION GRID: hover to expand
   ──────────────────────────────────────────── */

function ForceAccordion() {
  return (
    <motion.div
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
      }}
      className="mt-12 grid grid-cols-1 items-start gap-3 sm:mt-14 sm:gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      {threatLandscapeForces.map((force) => (
        <ForceCard
          key={force.title}
          tag={force.tag}
          title={force.title}
          description={force.description}
        />
      ))}
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   FORCE CARD: expand on hover (tap on touch)
   ──────────────────────────────────────────── */

function ForceCard({
  tag,
  title,
  description,
}: {
  tag: string;
  title: string;
  description: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 14 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
      }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((o) => !o)}
      tabIndex={0}
      aria-expanded={isOpen}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-md border border-slate-200/80 bg-gradient-to-br from-white via-white to-slate-50/60 shadow-[0_1px_2px_rgba(15,23,42,0.04)] outline-none transition-all duration-500 hover:-translate-y-0.5 hover:border-[#1B8AC7]/45 hover:shadow-[0_18px_40px_-12px_rgba(27,138,199,0.30)] focus-visible:border-[#1B8AC7]/60 focus-visible:ring-2 focus-visible:ring-[#28B5E1]/40"
    >
      <div className="relative z-[2] flex w-full items-start justify-between gap-3 p-5 sm:p-6">
        <div className="min-w-0 flex-1">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.25em] text-[#1B8AC7]">
            {tag}
          </span>
          <h3 className="mt-3 font-display text-base font-bold leading-snug text-[#0a1d3a] sm:text-[17px] md:text-lg">
            {title}
          </h3>
        </div>

        {/* Indicator: plus rotates to × when expanded */}
        <span
          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isOpen
            ? "rotate-45 border-[#1B8AC7] bg-[#1B8AC7] text-white"
            : "border-slate-300 text-slate-500 group-hover:border-[#1B8AC7] group-hover:text-[#1B8AC7]"
            }`}
          aria-hidden="true"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-[2] overflow-hidden"
          >
            <div className="px-5 pb-5 sm:px-6 sm:pb-6">
              <div className="border-t border-slate-200 pt-4">
                <p className="text-sm leading-relaxed text-slate-600">{description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated bottom rule */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-[#1B8AC7] via-[#28B5E1] to-transparent transition-all duration-700 ease-out group-hover:w-full"
      />
      {/* Corner glow on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#28B5E1]/30 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />
    </motion.article>
  );
}

/* ────────────────────────────────────────────
   PAGE COMPONENT
   ──────────────────────────────────────────── */

export default function CybersecurityPage() {

  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Cybersecurity UAE | NGFW, EDR, SASE, MDR | Artiflex IT</title>
        <meta
          name="description"
          content="End-to-end enterprise cybersecurity for UAE: firewall, endpoint, email security, SASE, SIEM, MDR. Platinum Sophos Partner. NESA & PDPL ready."
        />
        <meta
          name="keywords"
          content="enterprise cybersecurity solutions UAE, NGFW Dubai, EDR XDR Middle East, SASE solutions UAE, UAE PDPL compliance, NESA cybersecurity framework, CBUAE regulations, Sophos partner Dubai, managed detection response UAE, cybersecurity vendor comparison 2026, penetration testing UAE, SOC as a service Dubai"
        />
        <link rel="canonical" href="https://artiflexit.com/cybersecurity" />
        <meta property="og:title" content="Enterprise Cybersecurity Solutions Guide 2026 | ArtiflexIT UAE" />
        <meta
          property="og:description"
          content="End-to-end enterprise cybersecurity for UAE businesses. Firewall, endpoint protection, email security, SASE, SIEM, and managed detection, delivered by ArtiflexIT, Platinum Sophos Partner in Dubai."
        />
        <meta property="og:url" content="https://artiflexit.com/cybersecurity" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </>

      {/* ═══════════════════════════════════════
          HERO: DEFEND. DETECT. DOMINATE.
          ═══════════════════════════════════════ */}
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-navy-deep via-navy to-navy-light">
        {/* Background image */}
        <div className="absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
          <img
            src="/images/cyber-main.png"
            alt=""
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover object-center opacity-55 [mask-image:radial-gradient(120%_90%_at_60%_45%,black_55%,transparent_100%)]"
          />
        </div>

        {/* LightRays background, same as other service pages */}
        {/* <Suspense fallback={null}>
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
        </Suspense> */}

        {/* Readability tint: darker on the left where text lives, fading right */}
        <div
          className="absolute inset-0 z-[3] bg-gradient-to-r from-navy-deep/90 via-navy-deep/65 to-navy-deep/25 pointer-events-none"
          aria-hidden="true"
        />
        {/* Top + bottom vignette for cohesion */}
        <div
          className="absolute inset-0 z-[3] bg-gradient-to-b from-navy-deep/55 via-transparent to-navy-deep/80 pointer-events-none"
          aria-hidden="true"
        />

        <div className="shell relative z-10 flex w-full flex-1 flex-col pt-20 pb-6 sm:pt-24 sm:pb-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-3 sm:mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 sm:text-xs">
              <li>
                <Link to="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li className="text-slate-600">/</li>
              <li>
                <span className="font-medium text-[#28B5E1]">Cybersecurity</span>
              </li>
            </ol>
          </nav>

          <div className="grid flex-1 grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col justify-center py-4"
          >
            <p className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-8xl">
              Cybersecurity
            </p>

            <div className="mt-6 sm:mt-8 lg:mt-8 xl:mt-10">


              <h1 className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight text-white sm:mt-3 sm:text-2xl md:text-3xl lg:text-[1.6rem] xl:text-4xl">

                <span className="gradient-text"> Enterprise Cybersecurity Solutions for the UAE & Middle East</span>
              </h1>

              <p className="mt-3 max-w-xl text-xs leading-relaxed text-slate-300 sm:mt-4 sm:text-sm md:text-base lg:text-sm xl:text-base">
                A leading cybersecurity partner dedicated to defending UAE
                enterprises against evolving digital threats, including security pillars,
                top vendor comparisons, and UAE compliance requirements.
              </p>

              <div className="mt-5 flex flex-col items-stretch gap-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 lg:gap-3 xl:gap-4">
                <button
                  onClick={openContact}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-6 sm:py-3 lg:text-sm xl:px-7 xl:py-3.5 xl:text-base"
                >
                  Get a Free Cybersecurity Assessment
                  <ArrowRightIcon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <Link
                  to="/blog/origin-siem-soc-monitoring"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 hover:text-[#28B5E1] sm:px-6 sm:py-3 lg:text-sm xl:px-7 xl:py-3.5 xl:text-base"
                >
                  Read the Origin Story
                  <ArrowRightIcon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

            </div >


          </motion.div>
          
          <div className="px-2 sm:px-4">
            {(() => {
              const topics = [
                {
                  label: "Firewalls & Network Security",
                  short: "Firewall & Network",
                  icon: ShieldIcon,
                  originHref: "/blog/origin-firewall-network-security",
                  portfolioHref: "/cybersecurity/firewalls-network-security",
                },
                {
                  label: "Unified Firewall Management (UFM)",
                  short: "Unified Firewall Mgmt.",
                  icon: WifiIcon,
                  originHref: "/blog/origin-firewall-network-security",
                  portfolioHref: "/cybersecurity/unified-firewall-management",
                },
                {
                  label: "Endpoint Security (EDR & XDR)",
                  short: "Endpoint Security",
                  icon: MonitorIcon,
                  originHref: "/blog/origin-endpoint-security",
                  portfolioHref: "/cybersecurity/endpoint-security-edr-xdr",
                },
                {
                  label: "Mobile Security",
                  short: "Mobile Security",
                  icon: PhoneIcon,
                  originHref: "/blog/origin-mobile-security",
                  portfolioHref: "/cybersecurity/mobile-security",
                },
                {
                  label: "OT / ICS Security",
                  short: "OT / ICS Security",
                  icon: CpuIcon,
                  originHref: "/blog/origin-ot-ics-security",
                  portfolioHref: "/cybersecurity/ot-ics-security",
                },
                {
                  label: "Email Security for Business",
                  short: "Email Security",
                  icon: MailIcon,
                  originHref: "/blog/origin-email-security",
                  portfolioHref: "/cybersecurity/email-security",
                },
                {
                  label: "Identity & Access Security",
                  short: "Identity & Access",
                  icon: UsersIcon,
                  originHref: "/blog/origin-identity-access-management",
                  portfolioHref: "/cybersecurity/identity-access-security",
                },
                {
                  label: "SASE & Zero Trust",
                  short: "Workspace (SSE/SASE)",
                  icon: CloudIcon,
                  originHref: "/blog/origin-workspace-protection-sse-sase",
                  portfolioHref: "/cybersecurity/workspace-protection-sse-sase",
                },
                {
                  label: "Security Operations",
                  short: "Security Operations",
                  icon: EyeIcon,
                  originHref: "/blog/origin-siem-soc-monitoring",
                  portfolioHref: "/cybersecurity/security-operations",
                },
                {
                  label: "Vulnerability & Exposure Management",
                  short: "Vulnerability Mgmt.",
                  icon: TargetIcon,
                  originHref: "/blog/origin-vulnerability-management",
                  portfolioHref: "/cybersecurity/vulnerability-management",
                },
                {
                  label: "Data Security & DLP",
                  short: "Data Loss Prevention",
                  icon: LayersIcon,
                  originHref: "/blog/origin-data-loss-prevention",
                  portfolioHref: "/cybersecurity/data-loss-prevention",
                },
              ];

              const tileCls =
                "group relative flex min-h-[42px] min-w-0 items-center gap-1.5 overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.035] px-1.5 py-1.5 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/55 hover:bg-gradient-to-br hover:from-[#045891]/40 hover:to-[#1B8AC7]/20 hover:shadow-[0_10px_24px_-8px_rgba(40,181,225,0.5)] sm:gap-2 sm:px-2";

              const renderGrid = (variant: "origin" | "portfolio") => (
                <div className="mt-2.5 grid grid-cols-2 gap-1.5 sm:gap-2">
                  {topics.map((t) => {
                    const Icon = t.icon;
                    const href =
                      variant === "origin" ? t.originHref : t.portfolioHref;
                    return (
                      <Link
                        key={`${variant}-${t.label}`}
                        to={href}
                        className={tileCls}
                      >
                        {/* gradient sweep on hover */}
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#28B5E1]/10 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100"
                        />
                        <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-[#28B5E1]/25 to-[#1B8AC7]/10 text-[#4FC3F7] transition-all group-hover:from-[#28B5E1]/55 group-hover:to-[#1B8AC7]/35 group-hover:text-white">
                          <Icon className="h-3 w-3" />
                        </span>
                        <span className="relative min-w-0 flex-1 whitespace-normal break-words text-[10px] font-semibold leading-tight text-white/90 group-hover:text-white sm:text-[10.5px]">
                          {t.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              );

              const cardCls =
                "relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent p-3 backdrop-blur-md shadow-[0_20px_60px_-30px_rgba(40,181,225,0.4)] sm:p-3.5";

              return (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5">
                  {/* Cybersecurity Portfolios */}
                  <div className={cardCls}>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -top-16 -left-12 h-40 w-40 rounded-full bg-[#1B8AC7]/[0.1] blur-3xl"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/40 to-transparent"
                    />
                    <div className="relative">
                      <div className="flex items-center gap-2">
                        <span
                          aria-hidden
                          className="h-1 w-6 rounded-full bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1]"
                        />
                        <h3 className="font-display text-sm font-bold text-white sm:text-base">
                          Portfolios
                          <span className="text-[#28B5E1]">.</span>
                        </h3>
                      </div>
                      <p className="mt-1 text-[10.5px] leading-relaxed text-slate-300/80">
                        Explore the solution that fits your stack.
                      </p>
                      {renderGrid("portfolio")}
                    </div>
                  </div>

                  {/* The Origin Story */}
                  <div className={cardCls}>
                    {/* corner glow */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -top-16 -right-12 h-40 w-40 rounded-full bg-[#28B5E1]/[0.09] blur-3xl"
                    />
                    {/* hairline */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/40 to-transparent"
                    />
                    <div className="relative">
                      <div className="flex items-center gap-2">
                        <span
                          aria-hidden
                          className="h-1 w-6 rounded-full bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1]"
                        />
                        <h3 className="font-display text-sm font-bold text-white sm:text-base">
                          The Origin Story
                          <span className="text-[#28B5E1]">.</span>
                        </h3>
                      </div>
                      <p className="mt-1 text-[10.5px] leading-relaxed text-slate-300/80">
                        Read the story behind each security pillar.
                      </p>
                      {renderGrid("origin")}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          CHAPTER 01: THE MANDATORY IMPERATIVE
          ═══════════════════════════════════════ */}
      <section
        id="origin-story"
        className="relative overflow-hidden bg-gradient-to-b from-navy-deep via-navy-deep to-navy-light/95 py-18 sm:py-20 lg:py-20"
      >
        {/* Subtle grid pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Soft cyan ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[10%] top-1/3 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-[#28B5E1]/[0.06] blur-3xl"
        />
        {/* Hairline divider at top */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/30 to-transparent"
        />

        <div className="relative mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
            }}
          >
            {/* Chapter eyebrow */}
            {/* <motion.div
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              className="flex items-center gap-4"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-[#28B5E1]">
                Chapter 01
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-[#28B5E1]/50 via-white/10 to-transparent" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/35">
                Introduction
              </span>
            </motion.div> */}

            {/* Heading */}
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="mt-8 font-display text-3xl font-bold leading-[1.1] -tracking-[0.01em] text-white sm:mt-10 sm:text-4xl md:text-5xl lg:text-[3.25rem]"
            >
              Cybersecurity {" "}
              <span className="italic font-light gradient-text">The Mandatory Imperative</span>{" "}
              of Our Era<span className="text-[#28B5E1]">.</span>
            </motion.h2>

            {/* Body */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
              }}
              className="mt-8 max-w-3xl text-[15px] leading-[1.75] text-slate-300/90 sm:mt-10 sm:text-base md:text-lg"
            >
              In <span className="font-semibold text-white">2024</span>, the global average cost of
              a data breach reached{" "}
              <span className="font-semibold text-[#28B5E1]">USD 4.88 million</span> the highest
              ever recorded. Ransomware attacks occur{" "}
              <span className="font-semibold text-[#28B5E1]">every 2 seconds</span>. Nation-state
              actors, organised cybercriminal syndicates, and opportunistic hackers have
              transformed digital risk into the single greatest existential threat facing
              organisations today.
            </motion.p>

            {/* Pull quote */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
              }}
              className="relative mt-12 sm:mt-16"
            >
              {/* Decorative quote mark */}
              <span
                aria-hidden="true"
                className="absolute -left-2 -top-6 font-display text-7xl font-bold leading-none text-[#28B5E1]/20 sm:-left-3 sm:-top-8 sm:text-8xl"
              >
                &ldquo;
              </span>
              <div className="border-l-2 border-[#28B5E1] pl-6 sm:pl-8">
                <p className="font-display text-xl font-light italic leading-[1.3] text-white sm:text-2xl md:text-3xl lg:text-[2rem]">
                  The question is no longer{" "}
                  <span className="font-normal text-[#28B5E1]">&lsquo;will we be attacked?&rsquo;</span>{" "}
                  it is{" "}
                  <span className="font-semibold not-italic text-white">
                    &lsquo;when, and are we prepared?&rsquo;
                  </span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Hairline divider at bottom */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/20 to-transparent"
        />
      </section>

      {/* ═══════════════════════════════════════
          STATS BAR
          ═══════════════════════════════════════ */}
      {/* <section className="relative border-y border-border-light bg-white" aria-label="Industry statistics">
        <div className="shell">
          <div className="grid grid-cols-2 divide-x divide-white/[0.06] lg:grid-cols-4">
            {heroStats.map((stat) => (
              <div key={stat.label} className="px-3 py-6 text-center sm:px-8 sm:py-10">
                <span className="font-display text-xl font-bold text-[#045891] sm:text-3xl md:text-4xl">
                  {stat.value}
                </span>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                  {stat.label}
                </p>
                <p className="mt-0.5 text-xs text-muted">{stat.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ═══════════════════════════════════════
          WHY ARTIFLEX
          ═══════════════════════════════════════ */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-12%" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
            }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-12"
          >
            {/* Left: heading (sticky on lg+) */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#045891]/15 bg-[#045891]/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[#045891]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#28B5E1]" />
                Our Approach
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-heading sm:text-4xl md:text-[2.75rem]">
                Why Artiflex for{" "}
                <span className="gradient-text">your Cybersecurity?</span>
              </h2>
            </motion.div>

            {/* Right: body */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.1 } },
              }}
              className="lg:col-span-7"
            >
              <div className="relative border-l-2 border-[#28B5E1]/40 pl-6 sm:pl-8">
                <p className="text-base leading-relaxed text-body sm:text-lg">
                  <span className="font-semibold text-heading">Artiflex IT</span> is a
                  cybersecurity company in Dubai working with enterprise IT teams across
                  the UAE for close to{" "}
                  <span className="font-semibold text-[#045891]">fifteen years</span>.
                  The conversation around cybersecurity has shifted dramatically; it
                  used to be a once-a-year budget item, now it's on the board's agenda
                  every quarter alongside{" "}
                  <span className="font-semibold text-[#045891]">NESA, PDPL, and SAMA</span>{" "}
                  obligations. And honestly, it should be.
                </p>
              </div>

              {/* Lead-gen CTA below the paragraph */}
              <div className="relative mt-8 overflow-hidden rounded-3xl border border-border-light bg-gradient-to-br from-white via-[#28B5E1]/[0.04] to-[#045891]/[0.06] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:mt-10 sm:p-8">
                {/* Soft brand accents */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#28B5E1]/15 blur-[110px]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-[#1B8AC7]/12 blur-[110px]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/50 to-transparent"
                />

                <div className="relative">
                  <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-heading sm:text-[1.65rem]">
                    Is Your Business{" "}
                    <span className="gradient-text">Protected?</span>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-body sm:text-base">
                    Most companies don't know their actual risk exposure until it's too
                    late. Our team will evaluate your current security posture and
                    identify critical gaps.
                  </p>

                  <button
                    onClick={openContact}
                    className="group mt-5 inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5"
                  >
                    Get a Free Cybersecurity Assessment
                    <ArrowRightIcon className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          § 1.1 SIX FORCES OF THE THREAT LANDSCAPE
          ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-white py-20 sm:py-28">
        {/* Decorative grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #045891 1px, transparent 1px), linear-gradient(to bottom, #045891 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Soft cyan ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[8%] top-[18%] h-[28rem] w-[28rem] rounded-full bg-[#28B5E1]/[0.10] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[5%] bottom-[10%] h-[22rem] w-[22rem] rounded-full bg-[#1B8AC7]/[0.07] blur-3xl"
        />

        <div className="shell relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-12%" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
            }}
          >
            {/* Heading */}
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="font-display text-3xl font-bold leading-[1.1] -tracking-[0.01em] text-[#0a1d3a] sm:text-4xl md:text-5xl lg:text-[3rem]"
            >
              The Threat Landscape:{" "}
              <span className="italic font-light gradient-text">Why Now</span>{" "}
              More Than Ever
            </motion.h2>

            {/* Intro line */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              Six forces converging at once turning cybersecurity from an IT cost
              centre into the defining business risk of the decade.
            </motion.p>

            {/* Force cards: single-open accordion */}
            <ForceAccordion />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          THREAT LANDSCAPE
          ═══════════════════════════════════════ */}
      {/* <section className="relative py-16 bg-white sm:py-24">
        <div className="shell">
          <div className="relative overflow-hidden rounded-3xl  bg-gradient-to-br from-white via-surface-secondary to-surface-tertiary p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-10 lg:p-14">
            {/* decorative glow */}
      {/* <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#1B8AC7]/10 blur-[120px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-[#28B5E1]/08 blur-[140px]"
            /> */}

      {/* <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-14"> */}
      {/* ── LEFT: title + visual ─────────────── */}
      {/* <div className="flex flex-col"> */}
      {/* <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#045891]">
                  The Threat Landscape
                </span>
                <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-heading sm:text-4xl lg:text-5xl">
                  <span className="gradient-text">Why Cybersecurity</span> Is a
                  Business Imperative
                </h2> */}

      {/* Visual */}
      {/* <div className="mt-8 flex-1">
                  <div className="relative overflow-hidden rounded-2xl border border-border-light bg-gradient-to-br from-[#28B5E1]/10 via-[#1B8AC7]/5 to-transparent">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[#28B5E1]/20 blur-[90px]"
                    />
                    <img
                      src="/cybersecurity.png"
                      alt="Cybersecurity"
                      loading="lazy"
                      className="relative w-full h-full object-cover"
                    />
                  </div>
                </div> */}
      {/* </div> */}

      {/* ── RIGHT: intro + numbered grid ─────── */}
      {/* <div className="flex flex-col">
                <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                  <p className="text-sm leading-relaxed text-body sm:text-base">
                    Ransomware attacks occur every 2 seconds. Nation-state
                    actors, organized cybercriminal syndicates, and AI-powered
                    attacks have made digital risk the single greatest threat
                    facing UAE organizations today.
                  </p>
                  <p className="text-sm leading-relaxed text-body sm:text-base">
                    From financial loss and regulatory penalties to operational
                    disruption and supply chain exposure. Here's what's at
                    stake for enterprises that fall behind on security.
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10">
                  {threatImpact.map((item, i) => (
                    <div key={item.area} className="group">
                      <div className="flex items-center gap-3">
                        <span className="font-display text-3xl font-bold leading-none text-[#1B8AC7] sm:text-4xl">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="h-px flex-1 bg-gradient-to-r from-[#1B8AC7]/40 to-transparent" />
                      </div>
                      <h3 className="mt-3 font-display text-base font-semibold text-heading sm:text-lg">
                        {item.area}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-body sm:text-sm">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div> */}
      {/* </div> */}
      {/* </div>
        </div> */}
      {/* </section> */}

      {/* ═══════════════════════════════════════
          1.2 BUSINESS IMPACT
          ═══════════════════════════════════════ */}
      <section className="relative py-16 bg-white sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Business Impact"
            title={
              <>
                Business Impact of{" "}
                <span className="gradient-text">Inadequate Cybersecurity</span>
              </>
            }
            description="When defences fail, the consequences ripple far beyond the IT department, striking finance, operations, brand, legal, and the boardroom."
            centered
          />

          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            {businessImpact.map((row) => (
              <article
                key={row.area}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-light bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#045891]/20 hover:shadow-[0_8px_30px_rgba(4,88,145,0.08)] sm:p-7"
              >
                {/* Left accent rail that grows on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-gradient-to-b from-[#28B5E1] via-[#1B8AC7] to-[#045891] transition-transform duration-500 ease-out group-hover:scale-y-100"
                />

                <div className="flex items-start gap-3">
                  <span className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-[#28B5E1] ring-4 ring-[#28B5E1]/10" />
                  <h3 className="font-display text-lg font-bold text-heading sm:text-xl">
                    {row.area}
                  </h3>
                </div>

                <p className="mt-3 pl-5 text-sm leading-relaxed text-body sm:text-[15px]">
                  {row.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STRUCTURED REVIEW CTA
          ═══════════════════════════════════════ */}
      <section className="relative bg-white py-12 sm:py-16">
        <div className="shell">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy-deep via-navy to-[#0A3D6B] p-6 shadow-[0_20px_60px_rgba(4,88,145,0.25)] sm:p-10 lg:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#28B5E1]/20 blur-[100px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-20 -bottom-24 h-56 w-56 rounded-full bg-[#1B8AC7]/15 blur-[110px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/60 to-transparent"
            />

            <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
              <div className="max-w-xl">
                <div className="flex items-center gap-2">
                  <UsersIcon className="h-4 w-4 text-[#28B5E1]" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#28B5E1]">
                    Free · 30-Min Structured Review
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
                  Need help figuring out{" "}
                  <span className="gradient-text">where you stand?</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                  Our cybersecurity consulting services team can walk you through a
                  structured assessment in about 30 minutes.
                </p>
              </div>

              <button
                onClick={openContact}
                className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#045891] shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all hover:brightness-105 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)]"
              >
                Book a Free Assessment
                <ArrowRightIcon className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          7 SECURITY PILLARS
          ═══════════════════════════════════════ */}
      <section id="pillars" className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Security Pillars"
            title={
              <>
                Our <span className="gradient-text">Essential</span> Solutions
              </>
            }
            description="Every enterprise requires these seven security layers to achieve comprehensive protection across network, endpoint, data, and identity."
            centered
          />

          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-12">
            {pillars.map((pillar, i) => {
              const spans = [
                "md:col-span-7",
                "md:col-span-5",
                "md:col-span-5",
                "md:col-span-7",
                "md:col-span-12",
              ];
              return (
                <Link
                  key={pillar.number}
                  to={pillar.href}
                  className={`block ${spans[i] ?? "md:col-span-12"}`}
                >
                  <article
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0a1d3a] via-[#0a1d3a] to-[#031428] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/40 hover:shadow-[0_18px_40px_-10px_rgba(40,181,225,0.35)] sm:p-8"
                  >
                    {/* Soft cyan corner glow on hover */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#28B5E1]/30 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    />

                    <div className="relative flex flex-1 flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                      {/* Icon */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-[#28B5E1] transition-all duration-300 group-hover:bg-[#28B5E1] group-hover:text-white group-hover:shadow-[0_6px_18px_rgba(40,181,225,0.45)]">
                        <pillar.icon className="h-5 w-5" />
                      </div>

                      <div className="flex flex-1 flex-col">
                        <div className="mb-2 flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#28B5E1]">
                            {pillar.category}
                          </span>
                        </div>

                        <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                          {pillar.title}
                        </h3>
                        <p className="mt-2 max-w-3xl flex-1 text-sm leading-relaxed text-slate-300/85 sm:text-base">
                          {pillar.description}
                        </p>

                        {/* Explore button */}
                        <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white transition-all duration-300 group-hover:border-[#28B5E1] group-hover:bg-gradient-to-r group-hover:from-[#045891] group-hover:to-[#1B8AC7] group-hover:shadow-[0_8px_22px_rgba(27,138,199,0.45)] sm:text-sm">
                          Explore
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="transition-transform duration-300 group-hover:translate-x-0.5"
                          >
                            <path
                              d="M5 12h14M13 6l6 6-6 6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>

                    {/* Animated bottom underline */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-[#28B5E1] via-[#1B8AC7] to-transparent transition-all duration-700 ease-out group-hover:w-full"
                    />
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          SOPHOS SITE-IN-A-BOX: FEATURED SOLUTION (disabled)
          ═══════════════════════════════════════ */}
      {/* the code is commented */}

      {false && (
        <section id="sophos" className="relative py-16 bg-surface-secondary overflow-hidden sm:py-24">
          {/* Top accent */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple" />

          <div className="shell">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#045891]/8 border border-[#045891]/15 px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#045891]">
                <ShieldIcon className="w-4 h-4" />
                Featured Solution: Platinum Sophos Partner
              </span>
            </div>

            {/* Header */}
            <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-16">
              <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6">
                Sophos Cybersecurity Platform{" "}
              </h2>
              <p className="text-base text-body leading-relaxed max-w-3xl mx-auto sm:text-lg">
                A complete, pre-configured security stack from one vendor: firewall, endpoint, email, wireless, MDR, XDR, SASE, and unified management. Defending 600,000+ organizations and 100 million+ users globally.
              </p>
            </div>

            {/* Benefits Stats */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 max-w-4xl mx-auto mb-10 sm:mb-16">
              {sophosBenefits.map((b) => (
                <div key={b.label} className="text-center">
                  <span className="font-display text-2xl font-bold text-[#045891] sm:text-3xl">{b.value}</span>
                  <p className="mt-1 text-xs text-body">{b.label}</p>
                </div>
              ))}
            </div>

            {/* Product Grid */}
            <div className="mb-16">
              <h3 className="font-display text-xl font-semibold text-heading text-center mb-8">
                Complete Sophos Product Portfolio
              </h3>
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">
                {sophosProducts.map((product) => (
                  <div
                    key={product.title}
                    className="group rounded-2xl border border-border-light bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#045891]/20 hover:shadow-[0_8px_30px_rgba(4,88,145,0.08)]"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#045891]/8 text-[#045891] transition-colors group-hover:bg-[#045891] group-hover:text-white">
                      <product.icon className="h-5 w-5" />
                    </div>
                    <h4 className="font-display text-sm font-semibold text-heading mb-2">{product.title}</h4>
                    <p className="text-xs text-body leading-relaxed">{product.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sophos iframe embed */}
            <div className="mb-12">
              <h3 className="font-display text-xl font-semibold text-heading text-center mb-2">
                Explore Sophos Solutions
              </h3>
              <p className="text-sm text-muted text-center mb-8">
                Browse the full Sophos product catalog and configure your security stack directly.
              </p>
              <div className="relative rounded-2xl border border-white/[0.08] bg-white/50 overflow-hidden shadow-2xl shadow-black/30">
                <iframe
                  src="https://www.sophos.com/en-us/site-in-a-box?partner_referral_id=0014w000047pf2XAAQ"
                  title="Sophos Site-in-a-Box: Configure your complete cybersecurity stack"
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
              <p className="mt-3 text-xs text-muted">
                ArtiflexIT is a Platinum Sophos partner serving the UAE and Middle East.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          UAE COMPLIANCE REQUIREMENTS
          ═══════════════════════════════════════ */}
      <section id="compliance" className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="shell">
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

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {complianceFrameworks.map((fw) => (
              <div
                key={fw.name}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <Card className="flex h-full flex-col p-5 sm:p-6">
                  <h3 className="font-display text-xl font-bold text-[#045891]">{fw.name}</h3>
                  <p className="mt-1 text-xs text-muted">{fw.fullName}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-body">
                    {fw.description}
                  </p>
                  <div className="mt-4">
                    <span className="inline-block rounded-md border border-[#045891]/20 bg-[#045891]/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#045891]">
                      {fw.scope}
                    </span>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          VENDOR SCORECARD & STRATEGIC RECOMMENDATION
          ═══════════════════════════════════════ */}
      <section id="scorecard" className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Vendor Scorecard"
            title={
              <>
                Overall Cybersecurity{" "}
                <span className="gradient-text">Vendor Scorecard</span>
              </>
            }
            description="Consolidated assessment across financial, strategic, and management dimensions. Scores are out of 10."
            centered
          />

          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-[#0A3D6B]/30 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7] text-white">
                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider sm:px-5 sm:text-[13px]">
                      Evaluation dimension
                    </th>
                    {[
                      "Sophos",
                      "Check Point",
                      "Fortra",
                      "Fortinet",
                      "Palo Alto",
                      "Cisco / Microsoft",
                    ].map((v) => (
                      <th
                        key={v}
                        className="border-l border-white/15 px-3 py-4 text-center font-display text-[13px] font-semibold sm:text-sm"
                      >
                        {v}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { dim: "Financial Value / TCO", scores: ["10", "9", "9", "8", "5", "6 / 9"] },
                    { dim: "Ease of Management", scores: ["10", "9", "8", "7", "7", "5 / 9"] },
                    { dim: "Threat Prevention", scores: ["9", "10", "9", "9", "9", "8 / 8"] },
                    { dim: "Platform Integration", scores: ["10", "10", "9", "8", "8", "7 / 9"] },
                    { dim: "Vendor Support Quality", scores: ["10", "9", "9", "8", "6", "7 / 8"] },
                    { dim: "Scalability / Enterprise Fit", scores: ["9", "10", "9", "9", "10", "9 / 9"] },
                  ].map((row, i) => (
                    <tr
                      key={row.dim}
                      className={`${i % 2 === 0 ? "bg-white" : "bg-slate-50/60"} border-t border-slate-200/70`}
                    >
                      <td className="px-4 py-3 font-medium text-slate-900 sm:px-5">{row.dim}</td>
                      {row.scores.map((s, j) => (
                        <td
                          key={j}
                          className="border-l border-slate-200/70 px-3 py-3 text-center font-display text-[15px] font-semibold text-slate-700"
                        >
                          {s}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="border-t-2 border-[#1B8AC7]/30 bg-gradient-to-r from-[#045891]/[0.06] to-[#1B8AC7]/[0.06]">
                    <td className="px-4 py-4 font-display text-[13px] font-bold uppercase tracking-wider text-[#045891] sm:px-5 sm:text-sm">
                      Weighted Total
                    </td>
                    {["9.8", "9.6", "8.9", "8.3", "7.2", "7.0 / 8.6"].map((s, i) => (
                      <td
                        key={i}
                        className={`border-l border-slate-200/70 px-3 py-4 text-center font-display text-base font-bold sm:text-lg ${i === 0 ? "text-[#1B8AC7]" : "text-slate-900"
                          }`}
                      >
                        {s}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-[#0A3D6B]/15 bg-gradient-to-br from-[#04101E] via-[#0A3D6B] to-[#04101E] p-7 text-slate-200 shadow-xl shadow-[#1B8AC7]/10 sm:p-10">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#28B5E1]">
              Strategic recommendation
            </p>
            <div className="mt-4 space-y-4 text-sm leading-relaxed sm:text-base">
              <p>
                <span className="font-semibold text-white">Sophos</span> is the #1 recommended vendor across firewall, endpoint, email, MDR, NDR and workspace protection. It delivers the best financial value, simplest management, and the deepest cross-product integration via Synchronized Security and Sophos Central.
              </p>
              <p>
                <span className="font-semibold text-white">Check Point</span> is the top recommendation for large enterprises, banks and critical infrastructure where the highest threat-prevention rate is paramount, and is our second recommendation across the same security pillars.
              </p>
              <p>
                <span className="font-semibold text-white">Fortra</span> is our recommended choice for DLP and Data Classification, Vulnerability Management (Tripwire), Brand Protection (PhishLabs), and is our third recommendation for Email Security where DMARC, content inspection, or sovereign deployment dominate.
              </p>
              <p>
                <span className="font-semibold text-white">Saviynt</span> is our recommended choice for Identity Governance.{" "}
                <span className="font-semibold text-white">CyberArk</span> is our recommended choice for PAM. Microsoft, Fortinet, Palo Alto, Cisco, Tenable and other named vendors all remain credible options where existing estate, regulatory, or specific-feature requirements dominate the decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          IMPLEMENTATION ROADMAP
          ═══════════════════════════════════════ */}
      <section id="roadmap" className="relative bg-surface-secondary py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="12 to 18 Month Plan"
            title={
              <>
                Cybersecurity{" "}
                <span className="gradient-text">Implementation Roadmap</span>
              </>
            }
            description="Building enterprise-grade cybersecurity does not happen overnight. The phased plan below sequences capability rollout over 12 to 18 months."
            centered
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                n: "01",
                focus: "Foundation",
                area: "Perimeter & Endpoint",
                actions: "Deploy NGFW (Sophos / Check Point); replace legacy AV with EDR (Intercept X); enable MFA across all accounts; baseline VA scan.",
                months: "M 1 to 3",
              },
              {
                n: "02",
                focus: "Communications",
                area: "Email & Web",
                actions: "Deploy email security (Sophos / Harmony / Fortra); SSL inspection; web filtering; DMARC, DKIM, SPF.",
                months: "M 3 to 5",
              },
              {
                n: "03",
                focus: "Data Protection",
                area: "DLP & Classification",
                actions: "Fortra DLP and Boldon James classification on endpoint and email; Sophos DLP for SMB; tag sensitive data repositories.",
                months: "M 5 to 7",
              },
              {
                n: "04",
                focus: "Identity",
                area: "IAM, PAM, IGA",
                actions: "Microsoft Entra, Okta or Ping for AM; CyberArk for PAM; Saviynt for IGA; conditional-access policies.",
                months: "M 5 to 9",
              },
              {
                n: "05",
                focus: "Visibility & Operations",
                area: "SIEM, NDR, MDR",
                actions: "Engage Sophos MDR (or Sentinel plus partner MDR); add Sophos NDR for network visibility; tune detection content.",
                months: "M 7 to 10",
              },
              {
                n: "06",
                focus: "Vulnerability & Compliance",
                area: "VM & FIM",
                actions: "Deploy Tripwire Enterprise (FIM / SCM) plus IP360 or Tenable / Qualys; continuous compliance monitoring; ExpertOps if no SOC.",
                months: "M 8 to 11",
              },
              {
                n: "07",
                focus: "Workspace & Brand",
                area: "ZTNA, SSE, DRP",
                actions: "Sophos Workspace Protection or Check Point Harmony SASE; engage Fortra PhishLabs for brand and citizen-phishing protection.",
                months: "M 9 to 13",
              },
              {
                n: "08",
                focus: "Advisory & Hardening",
                area: "Pen Test, Red Team",
                actions: "External and internal penetration tests; cloud and web-app testing; tabletop incident-response exercise.",
                months: "M 12 to 15",
              },
              {
                n: "09",
                focus: "Continuous Improvement",
                area: "Managed Services & AMC",
                actions: "Wrap into managed services / AMC contract for predictable operations; quarterly business reviews and tabletop tests.",
                months: "M 12+",
              },
            ].map((p) => (
              <div
                key={p.n}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1B8AC7]/40 hover:shadow-[0_12px_30px_-12px_rgba(27,138,199,0.30)] sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#045891] to-[#1B8AC7] font-display text-[13px] font-bold text-white shadow-sm">
                    {p.n}
                  </div>
                  <span className="rounded-full border border-[#1B8AC7]/20 bg-[#1B8AC7]/5 px-2.5 py-0.5 text-[11px] font-semibold text-[#045891]">
                    {p.months}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-lg font-bold text-[#045891] sm:text-xl">
                  {p.focus}
                </h3>
                <p className="mt-1 text-[12px] font-semibold uppercase tracking-wider text-[#1B8AC7]">
                  {p.area}
                </p>
                <p className="mt-3 text-[13.5px] leading-relaxed text-slate-600">
                  {p.actions}
                </p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-14 max-w-5xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="font-display text-lg font-bold text-[#045891] sm:text-xl">
              Key Success Factors
            </h3>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Executive sponsorship",
                  body: "Cybersecurity needs board-level support and committed budget.",
                },
                {
                  title: "User awareness training",
                  body: "Technology alone is insufficient; employees are the last line of defence.",
                },
                {
                  title: "Third-party risk management",
                  body: "Assess and manage the security posture of vendors and suppliers.",
                },
                {
                  title: "Regular testing",
                  body: "Annual penetration tests, red-team exercises, and tabletop simulations.",
                },
                {
                  title: "Continuous improvement",
                  body: "Threat landscapes evolve; security programmes must evolve with them.",
                },
              ].map((f) => (
                <li key={f.title} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1B8AC7]/15 text-[#1B8AC7] ring-1 ring-inset ring-[#1B8AC7]/30"
                  >
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-slate-900">
                      {f.title}
                    </p>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-slate-600">
                      {f.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQ (AEO-OPTIMIZED)
          ═══════════════════════════════════════ */}
      <section id="faq" className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="shell">
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
        primaryButton={{ text: "Discuss Your Requirements", action: "modal" }}
      />

    </>
  );


}
