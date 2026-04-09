import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { CTASection } from "@/pages/Home/sections/CTASection";
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
  { value: "$6.93M", label: "AVG. BREACH COST — MIDDLE EAST", source: "IBM 2024 — 69% above global avg" },
  { value: "300%", label: "RANSOMWARE SURGE IN GCC", source: "2022–2024 targeting businesses" },
  { value: "28,000+", label: "MDR CUSTOMERS PROTECTED", source: "Sophos — world's largest MDR" },
  { value: "<48h", label: "CRITICAL PATCH RESPONSE", source: "Sophos avg. patch time" },
];

const threatImpact = [
  { area: "Financial Loss", detail: "Average breach cost USD 6.93M in Middle East; ransomware demands averaging USD 1.5M+" },
  { area: "Operational Disruption", detail: "Average 21 days downtime post-ransomware; critical systems offline; productivity collapse" },
  { area: "Regulatory Penalties", detail: "Fines up to AED 5M under UAE PDPL; mandatory breach notification within 72 hours" },
  { area: "Reputational Damage", detail: "Average 7.5% stock price decline post-breach; loss of customer trust and media exposure" },
  { area: "Competitive Loss", detail: "Intellectual property theft; customer data exfiltration; M&A deals collapse post-breach" },
  { area: "Supply Chain Risk", detail: "Single vendor vulnerability cascades into thousands of organizations — SolarWinds, Log4j, MOVEit" },
];

const pillars = [
  {
    number: "01",
    icon: ShieldIcon,
    title: "Next-Generation Firewall (NGFW)",
    category: "NETWORK SECURITY",
    href: "/cybersecurity/network-security",
    description:
      "Deep packet inspection, application-aware traffic control, and TLS 1.3 decryption at line rate...",
  },
  {
    number: "02",
    icon: MonitorIcon,
    title: "Endpoint Detection & Response (EDR/XDR)",
    category: "ENDPOINT SECURITY",
    href: "/cybersecurity/endpoint-security",
    description:
      "AI-powered behavioral analysis, anti-ransomware rollback, and cross-layer threat correlation...",
  },
  {
    number: "03",
    icon: MailIcon,
    title: "Email Security & Anti-Phishing",
    category: "COMMUNICATION SECURITY",
    href: "/cybersecurity/email-security-overview",
    description:
      "NLP-powered phishing detection, BEC impersonation prevention, attachment sandboxing...",
  },
  {
    number: "04",
    icon: LockIcon,
    title: "Data Loss Prevention (DLP)",
    category: "DATA PROTECTION",
    href: "/cybersecurity/data-protection",
    description:
      "Content-aware policies preventing unauthorized data exfiltration across endpoints...",
  },
  {
    number: "05",
    icon: CloudIcon,
    title: "SASE & Zero Trust Network Access",
    category: "CLOUD & REMOTE ACCESS",
    href: "/cybersecurity/workspace-security",
    description:
      "ZTNA, CASB, SWG, and Firewall-as-a-Service converged into a cloud-delivered security service edge...",
  },
  {
    number: "06",
    icon: LayersIcon,
    title: "SIEM, SOC & Managed Detection",
    category: "THREAT INTELLIGENCE",
    href: "/cybersecurity/network-detection-response",
    description:
      "24/7 security event correlation, anomaly detection, and managed incident response...",
  },
  {
    number: "07",
    icon: SearchIcon,
    title: "Vulnerability Assessment & Pen Testing",
    category: "RISK MANAGEMENT",
    href: "/cybersecurity/risk-assessment",
    description:
      "Continuous vulnerability discovery, external attack surface management, and penetration testing...",
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
  headline: "Cybersecurity Solutions UAE — NGFW, EDR, SASE, MDR | Platinum Sophos Partner | ArtiflexIT",
  description:
    "End-to-end enterprise cybersecurity for UAE businesses. Firewall, endpoint protection, email security, SASE, SIEM, and managed detection — delivered by ArtiflexIT, Platinum Sophos Partner in Dubai. NESA, UAE PDPL, and CBUAE compliance.",
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
   PAGE COMPONENT
   ──────────────────────────────────────────── */

export default function CybersecurityPage() {

  const { open: openContact } = useContactModal();

  return (
    <>
      <Helmet>
        <title>Cybersecurity Solutions UAE — NGFW, EDR, SASE, MDR | Platinum Sophos Partner | ArtiflexIT</title>
        <meta
          name="description"
          content="End-to-end enterprise cybersecurity for UAE businesses. Firewall, endpoint protection, email security, SASE, SIEM, and managed detection — delivered by ArtiflexIT, Platinum Sophos Partner in Dubai. NESA, UAE PDPL, and CBUAE compliance."
        />
        <meta
          name="keywords"
          content="enterprise cybersecurity solutions UAE, NGFW Dubai, EDR XDR Middle East, SASE solutions UAE, UAE PDPL compliance, NESA cybersecurity framework, CBUAE regulations, Sophos partner Dubai, managed detection response UAE, cybersecurity vendor comparison 2026, penetration testing UAE, SOC as a service Dubai"
        />
        <link rel="canonical" href="https://artiflexit.com/cybersecurity" />
        <meta property="og:title" content="Enterprise Cybersecurity Solutions Guide 2026 | ArtiflexIT UAE" />
        <meta
          property="og:description"
          content="End-to-end enterprise cybersecurity for UAE businesses. Firewall, endpoint protection, email security, SASE, SIEM, and managed detection — delivered by ArtiflexIT, Platinum Sophos Partner in Dubai."
        />
        <meta property="og:url" content="https://artiflexit.com/cybersecurity" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* ═══════════════════════════════════════
          HERO — DEFEND. DETECT. DOMINATE.
          ═══════════════════════════════════════ */}
      <PageHero
        title={
          <>
            Enterprise Cybersecurity{" "}
            <span className="gradient-text">Solutions for the UAE</span>
          </>
        }
        description="The complete enterprise cybersecurity blueprint — 7 security pillars, top vendor comparisons, UAE compliance requirements, and a proven implementation framework."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Cybersecurity", href: "/cybersecurity" },
        ]}
      />

      {/* ═══════════════════════════════════════
          STATS BAR
          ═══════════════════════════════════════ */}
      <section className="relative border-y border-border-light bg-white" aria-label="Industry statistics">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
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
      </section>

      {/* ═══════════════════════════════════════
          THREAT LANDSCAPE
          ═══════════════════════════════════════ */}
      <section className="relative py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="The Threat Landscape"
            title={<>Why Cybersecurity Is a <span className="gradient-text">Business Imperative</span></>}
            description="Ransomware attacks occur every 2 seconds. Nation-state actors, organized cybercriminal syndicates, and AI-powered attacks have made digital risk the single greatest existential threat facing organizations today."
            centered
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {threatImpact.map((item) => (
              <div
                key={item.area}
                className="rounded-2xl border border-border-light bg-surface-secondary p-5 sm:p-6 transition-all duration-300 hover:border-[#045891]/20 hover:shadow-[0_8px_30px_rgba(4,88,145,0.06)]"
              >
                <h3 className="font-display text-base font-bold text-heading mb-2">{item.area}</h3>
                <p className="text-sm text-body leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          7 SECURITY PILLARS
          ═══════════════════════════════════════ */}
      <section id="pillars" className="relative py-16 bg-surface-secondary sm:py-24">
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
              <Link key={pillar.number} to={pillar.href} className="block">
                <article
                  className="group relative rounded-2xl border border-border-light bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[#045891]/20 hover:shadow-[0_8px_30px_rgba(4,88,145,0.08)] hover:-translate-y-0.5 sm:p-8"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                    {/* Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#045891]/8 text-[#045891] transition-colors group-hover:bg-[#045891] group-hover:text-white">
                      <pillar.icon className="h-5 w-5" />
                    </div>

                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#045891]">
                          Pillar {pillar.number}
                        </span>
                        <span className="rounded-full border border-[#045891]/15 bg-[#045891]/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#045891]">
                          {pillar.category}
                        </span>
                      </div>

                      <h3 className="font-display text-xl font-bold text-heading sm:text-2xl">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-body sm:text-base">
                        {pillar.description}
                      </p>
                    </div>
                  </div>

                  {/* ← ADD THIS: hover arrow */}
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 font-mono text-xs text-[#045891] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Explore →
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          SOPHOS SITE-IN-A-BOX — FEATURED SOLUTION
          ═══════════════════════════════════════ */}
      <section id="sophos" className="relative py-16 bg-surface-secondary overflow-hidden sm:py-24">
        {/* Top accent */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple" />

        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#045891]/8 border border-[#045891]/15 px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#045891]">
              <ShieldIcon className="w-4 h-4" />
              Featured Solution — Platinum Sophos Partner
            </span>
          </div>

          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-16">
            <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6">
              Sophos Cybersecurity Platform —{" "}
              <span className="gradient-text">Site-in-a-Box</span>
            </h2>
            <p className="text-base text-body leading-relaxed max-w-3xl mx-auto sm:text-lg">
              A complete, pre-configured security stack from one vendor — firewall, endpoint, email, wireless, MDR, XDR, SASE, and unified management. Defending 600,000+ organizations and 100 million+ users globally.
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
              Complete Product Portfolio
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
            <p className="mt-3 text-xs text-muted">
              ArtiflexIT is a Platinum Sophos partner serving the UAE and Middle East.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          UAE COMPLIANCE REQUIREMENTS
          ═══════════════════════════════════════ */}
      <section id="compliance" className="relative py-16 bg-surface-secondary sm:py-24">
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {complianceFrameworks.map((fw) => (
              <Card key={fw.name} className="flex flex-col p-5 sm:p-6">
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
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQ (AEO-OPTIMIZED)
          ═══════════════════════════════════════ */}
      <section id="faq" className="relative py-16 bg-surface-secondary sm:py-24">
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
        primaryButton={{ text: "Discuss Your Requirements", action: "modal" }}
      />

    </>
  );


}
