import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";

const PAGE_URL = "https://artiflexit.com/cybersecurity/security-operations/soc-as-a-service";
const OG_IMAGE = "https://artiflexit.com/og/pages/cybersecurity-security-operations-soc-as-a-service.jpg";

/* ───────── THE CHALLENGE ───────── */

const painPoints = [
  {
    title: "Alerts without investigation",
    desc: "Security notifications can go unresolved or be incorrectly prioritised.",
  },
  {
    title: "Limited after-hours coverage",
    desc: "Your internal team cannot continuously monitor every system.",
  },
  {
    title: "Disconnected security tools",
    desc: "Important signals across endpoints, identities, cloud services and networks may be difficult to correlate.",
  },
  {
    title: "Unclear response ownership",
    desc: "Teams may lose valuable time deciding who should investigate and what action to take.",
  },
];

/* ───────── WHAT IS SOCaaS ───────── */

const pillars = [
  {
    title: "Continuous visibility",
    desc: "Monitor agreed security telemetry across supported systems and platforms.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      </svg>
    ),
  },
  {
    title: "Expert investigation",
    desc: "Investigate and prioritise suspicious activity according to agreed procedures.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
  {
    title: "Coordinated response",
    desc: "Escalate incidents and perform authorised containment actions within the agreed scope.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2 3 14h7l-1 8 10-12h-7z" />
      </svg>
    ),
  },
  {
    title: "Security reporting",
    desc: "Review incidents, recurring risks and recommended improvements.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 20h16M6 16V9M10 16V5M14 16v-7M18 16V3" />
      </svg>
    ),
  },
];

/* ───────── WHAT IS INCLUDED ───────── */

const included = [
  {
    step: "01",
    title: "Security monitoring",
    desc: "Monitor agreed security data sources and connected tools according to the contracted coverage model. Identify suspicious activity and potential threats across supported environments.",
  },
  {
    step: "02",
    title: "Alert triage & threat investigation",
    desc: "Validate alerts, assess severity, correlate relevant events and distinguish suspicious activity from routine events wherever the available telemetry allows.",
  },
  {
    step: "03",
    title: "Incident escalation & response",
    desc: "Follow documented escalation paths, notify designated stakeholders and perform pre-authorised response actions where included in the service.",
  },
  {
    step: "04",
    title: "Threat hunting & detection improvement",
    desc: "Where included, proactively investigate indicators of compromise, review detection coverage and refine detection rules to improve the quality of security alerts.",
  },
  {
    step: "05",
    title: "Security reports & reviews",
    desc: "Receive agreed incident summaries, security posture reports, recurring observations and recommendations to help your team prioritise improvements.",
  },
];

/* ───────── HOW IT WORKS ───────── */

const flow = [
  {
    step: "01",
    title: "Collect",
    desc: "Security signals from supported endpoints, firewalls, networks, cloud services and identity systems feed into the agreed monitoring environment.",
  },
  {
    step: "02",
    title: "Detect & investigate",
    desc: "Detection technology and analysts assess suspicious activity, prioritise alerts and investigate potential incidents.",
  },
  {
    step: "03",
    title: "Escalate & respond",
    desc: "Confirmed incidents are escalated according to severity, response authority and agreed procedures. Approved containment actions are taken where in scope.",
  },
  {
    step: "04",
    title: "Report & improve",
    desc: "Review incident outcomes, identify gaps and recommend improvements to strengthen detection and response over time.",
  },
];

/* ───────── ENGAGEMENT MODELS ───────── */

const models = [
  {
    title: "Fully Managed SOC",
    desc: "Delegate agreed monitoring, investigation, escalation and response responsibilities to the managed service.",
    points: ["End-to-end operation by Artiflex", "Your tooling or ours", "Scheduled reporting and reviews"],
    best: "teams seeking outsourced security operations without an in-house SOC.",
    featured: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Co-Managed SOC",
    desc: "Combine external security expertise with your internal IT or security team's responsibilities.",
    points: ["Shared runbooks and escalation paths", "Your team keeps control of response", "Analyst depth when you need it"],
    best: "organisations with an existing IT or security team.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="8" r="3.5" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6M15 15c3 0 6 1.5 7 4" />
      </svg>
    ),
  },
  {
    title: "SOC Coverage Extension",
    desc: "Extend agreed monitoring or investigation coverage beyond your internal team's operating hours or capabilities.",
    points: ["Nights, weekends and public holidays", "Surge capacity during incidents", "Specialist skills on demand"],
    best: "teams with coverage gaps.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
];

/* ───────── SOCaaS vs IN-HOUSE ───────── */

const compareRows = [
  { label: "Staffing", inHouse: "Recruit and retain internal analysts across shifts", socaas: "Access agreed external security expertise" },
  { label: "Coverage", inHouse: "Build shift coverage and on-call arrangements", socaas: "Contract for the required monitoring coverage" },
  { label: "Technology", inHouse: "Acquire and maintain security platforms", socaas: "Use agreed provider platforms and/or your existing tools" },
  { label: "Operations", inHouse: "Develop internal workflows and runbooks", socaas: "Establish documented workflows with the provider" },
  { label: "Scaling", inHouse: "Expand staffing and infrastructure as needed", socaas: "Adjust scope through the service agreement" },
  { label: "Control", inHouse: "Direct internal operational ownership", socaas: "Shared or delegated responsibilities, depending on the model" },
];

/* ───────── TECHNOLOGY & INTEGRATION ───────── */

const techVendors = ["Sophos", "Rapid7", "Microsoft Sentinel", "SentinelOne", "CrowdStrike", "Fortinet", "Darktrace", "Vectra AI", "ExtraHop"];

const techLinks = [
  { title: "SIEM", desc: "Security event correlation and analytics", href: "/cybersecurity/security-operations/siem" },
  { title: "MDR / EDR / XDR", desc: "Threat detection and response", href: "/cybersecurity/security-operations/mdr" },
  { title: "NDR", desc: "Network threat visibility", href: "/cybersecurity/security-operations/ndr" },
  { title: "Cloud & identity", desc: "Additional telemetry sources", href: "/cybersecurity/security-operations" },
];

/* ───────── WHY ARTIFLEX ───────── */

const reasons = [
  {
    title: "UAE-focused delivery",
    desc: "Security solutions designed for organisations operating in the UAE and the wider region, with in-country engineers in Dubai and Abu Dhabi.",
  },
  {
    title: "Technology aligned to your needs",
    desc: "Recommendations based on your current infrastructure, threat exposure and requirements, never on a vendor SKU.",
  },
  {
    title: "Flexible operating models",
    desc: "Fully managed, co-managed or coverage-extension engagements, depending on the agreed service scope.",
  },
  {
    title: "Defined responsibilities",
    desc: "Documented escalation paths, response authority and service expectations agreed before go-live.",
  },
  {
    title: "Ongoing improvement",
    desc: "Reporting and security reviews that help identify gaps and prioritise the next steps.",
  },
  {
    title: "Platinum-tier partnerships",
    desc: "Sophos Platinum Partner and Rapid7 partner, with direct escalation to vendor SOCs where the engagement uses them.",
  },
];

/* ───────── COMPLIANCE ───────── */

const frameworks = [
  { badge: "NESA", desc: "UAE NESA requirements, where applicable to your sector." },
  { badge: "CBUAE", desc: "Cybersecurity requirements for regulated financial institutions." },
  { badge: "ISO 27001", desc: "Monitoring, logging and incident-management controls under ISO/IEC 27001." },
  { badge: "UAE PDPL", desc: "Security and incident-management obligations under the UAE Personal Data Protection Law." },
  { badge: "ADHICS", desc: "Requirements for applicable Abu Dhabi healthcare environments." },
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "What does SOC as a Service include?",
    answer:
      "Depending on the contracted scope, it can include continuous security monitoring, alert triage, threat investigation, incident escalation, authorised response actions, threat hunting and security reporting.",
  },
  {
    question: "Is SOC as a Service the same as MDR?",
    answer:
      "No. MDR primarily focuses on managed threat detection, investigation and response. SOC as a Service can encompass a broader managed security operations model, potentially combining SIEM, MDR, NDR, reporting and other agreed capabilities.",
  },
  {
    question: "Do we need to replace our existing security tools?",
    answer:
      "Not necessarily. The initial assessment identifies which tools can be integrated, which telemetry sources are missing and whether additional capabilities are needed.",
  },
  {
    question: "Can a SOC service provide 24/7 monitoring?",
    answer:
      "Yes, when the selected service includes contracted round-the-clock coverage. The agreement specifies the monitoring hours, human investigation coverage, escalation targets and response actions.",
  },
  {
    question: "Does SOC as a Service include incident response?",
    answer:
      "It can include defined incident investigation, escalation and containment activities. The exact responsibilities, authorisation requirements and any additional incident-response or forensic services are agreed in advance.",
  },
  {
    question: "Is SOC as a Service suitable for small and medium-sized businesses?",
    answer:
      "Yes, for businesses that need specialist security operations but do not want to establish an entire internal SOC. The scope is kept proportionate to the environment, risk and budget.",
  },
  {
    question: "How much does SOC as a Service cost in the UAE?",
    answer:
      "Pricing depends on the number and type of assets, data sources, monitoring requirements, selected platforms, coverage hours and response scope. Artiflex assesses these factors before recommending a service.",
  },
];

/* ───────── HERO ───────── */

function SocHero() {
  const { open: openContact } = useContactModal();
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-navy-deep">
      <div aria-hidden="true" className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/network-security.jpg')" }} />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/70 to-navy-deep/90" />

      <div className="relative z-10 border-b border-white/5">
        <div className="shell flex w-full items-center justify-end gap-4 pt-24 pb-3 sm:pt-28">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center justify-end gap-2 text-[10px] text-slate-400 sm:text-[11px]">
              <li><Link to="/" className="transition-colors hover:text-white">Home</Link></li>
              <li className="text-slate-600">/</li>
              <li><Link to="/cybersecurity" className="transition-colors hover:text-white">Cybersecurity</Link></li>
              <li className="text-slate-600">/</li>
              <li><Link to="/cybersecurity/security-operations" className="transition-colors hover:text-white">Security Operations</Link></li>
              <li className="text-slate-600">/</li>
              <li><span className="font-medium text-[#28B5E1]">SOC as a Service</span></li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="shell relative z-10 flex w-full flex-1 items-center py-10 sm:py-12 lg:py-14">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="w-full">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#28B5E1] sm:text-xs">
            Managed Security Services · UAE
          </p>
          <p className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-5xl lg:text-[3.5rem]">
            SOC as a Service{" "}
            <span className="gradient-text">in UAE</span>
          </p>
          <h1 className="mt-3 block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
            Your Security Operations. Covered Around the Clock.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Extend your security capabilities with managed monitoring, threat investigation and coordinated incident response, without the complexity of building a dedicated Security Operations Centre from scratch.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
            <button onClick={openContact} className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base">
              Request a SOC Assessment
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </button>
            <a href="#included" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base">
              Explore Our SOC Capabilities
            </a>
            <a href="#models" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base">
              Engagement Models
            </a>
          </div>
          <p className="mt-5 text-xs text-slate-400 sm:text-sm">
            Security operations tailored to your environment, risk profile and business requirements.
          </p>
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

export default function SecurityOperationsSocAsAService() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  const title = "SOC as a Service UAE | Managed SOC | Artiflex";
  const description =
    "Get managed SOC services in the UAE with security monitoring, threat investigation and incident response. Explore flexible SOC solutions from Artiflex IT.";
  const ogDescription =
    "Managed SOC services in the UAE: security monitoring, threat investigation and incident response, fully managed or co-managed with your team.";

  return (
    <>
      <>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={PAGE_URL} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="Artiflex IT Editorial Team" />

        <meta httpEquiv="content-language" content="en-AE" />
        <meta name="geo.region" content="AE-DU" />
        <meta name="geo.placename" content="Dubai" />
        <meta name="geo.position" content="25.2528;55.3300" />
        <meta name="ICBM" content="25.2528, 55.3300" />

        <link rel="alternate" hrefLang="en-ae" href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-om" href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-sa" href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-in" href={PAGE_URL} />
        <link rel="alternate" hrefLang="en" href={PAGE_URL} />
        <link rel="alternate" hrefLang="x-default" href={PAGE_URL} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:site_name" content="Artiflex Information Technology" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_AE" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Artiflex IT SOC as a Service for the UAE" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={ogDescription} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:site" content="@artiflexit" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "SOC as a Service",
            "serviceType": "Managed Security Operations Centre",
            "provider": {
              "@type": "Organization",
              "@id": "https://artiflexit.com/#organization",
              "name": "Artiflex Information Technology LLC",
              "url": "https://artiflexit.com/",
              "telephone": "+971 52 207 6531",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "M22, New Al Safiya Building, Near Abu Hail Metro Station, Hor Al Anz",
                "addressLocality": "Dubai",
                "addressCountry": "AE",
              },
            },
            "areaServed": ["United Arab Emirates", "Oman", "Saudi Arabia"],
            "description":
              "Managed SOC services in the UAE covering security monitoring, alert triage, threat investigation, incident escalation and authorised response, delivered fully managed or co-managed.",
            "url": PAGE_URL,
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://artiflexit.com/" },
              { "@type": "ListItem", "position": 2, "name": "Cybersecurity", "item": "https://artiflexit.com/cybersecurity" },
              { "@type": "ListItem", "position": 3, "name": "Security Operations", "item": "https://artiflexit.com/cybersecurity/security-operations" },
              { "@type": "ListItem", "position": 4, "name": "SOC as a Service", "item": PAGE_URL },
            ],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((f) => ({
              "@type": "Question",
              "name": f.question,
              "acceptedAnswer": { "@type": "Answer", "text": f.answer },
            })),
          })}
        </script>
      </>

      <SocHero />

      {/* ───────── THE CHALLENGE ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">The Challenge</p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Security threats don't follow business hours.</h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                Your IT team may have firewalls, endpoint protection and email security in place. But those tools still need to be monitored, their alerts investigated and genuine incidents handled.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                When suspicious activity happens overnight, during weekends or while your IT team is focused on other priorities, the quality of your response depends on who is watching and what they are authorised to do.
              </p>
              <div className="mt-7 rounded-2xl border border-transparent bg-gradient-to-r from-[#045891] to-[#054466] p-5 shadow-[0_18px_40px_-18px_rgba(27,138,199,0.55)] sm:p-6">
                <p className="text-sm font-semibold leading-relaxed text-white sm:text-base">
                  SOC as a Service gives your organisation an agreed security monitoring and response process supported by specialist expertise.
                </p>
              </div>
            </div>
            <ul className="flex flex-col gap-3">
              {painPoints.map((p, idx) => (
                <motion.li key={p.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.45, delay: idx * 0.06 }} className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1B8AC7]/40 hover:shadow-md">
                  <div aria-hidden className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#045891] to-[#28B5E1]" />
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600 ring-1 ring-rose-100">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true"><path d="M12 9v4M12 17h.01" /><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /></svg>
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-slate-900">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{p.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────── WHAT IS SOCaaS ───────── */}
      <section id="what-is" className="relative scroll-mt-20 overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(to right, #1B8AC7 1px, transparent 1px), linear-gradient(to bottom, #1B8AC7 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">What is SOC as a Service?</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">A managed security operation built around your business.</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              SOC as a Service (SOCaaS) is a managed cybersecurity service in which a specialist provider operates agreed security monitoring, detection, investigation, escalation and response activities on behalf of an organisation. Instead of building an entire internal Security Operations Centre, your business can access the relevant security platforms, expertise and operational processes through a managed engagement.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              At Artiflex, the service can be designed around your existing security environment, the threats you need to address, and the level of responsibility you want your team or service provider to retain.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((c) => (
              <article key={c.title} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1B8AC7]/60 hover:shadow-[0_20px_60px_-12px_rgba(27,138,199,0.20)]">
                <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#045891] to-[#28B5E1]" />
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#28B5E1]/20 to-[#1B8AC7]/10 text-[#045891] [&>svg]:h-5 [&>svg]:w-5">
                  {c.icon}
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-slate-900">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── WHAT IS INCLUDED ───────── */}
      <section id="included" className="relative scroll-mt-20 bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">What Is Included in the Service?</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">More than security alerts. A managed operational process.</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">What your organisation actually receives from an Artiflex SOC engagement.</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-5">
            {included.map((q) => (
              <article key={q.step} className="relative rounded-2xl border border-slate-200 bg-white px-6 py-7 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1B8AC7]/40 hover:shadow-md">
                <p aria-hidden="true" className="font-display text-[2.2rem] font-extrabold leading-none text-[#E8F3FA]" style={{ WebkitTextStroke: "1px #1B8AC7" }}>{q.step}</p>
                <h3 className="mt-3 font-display text-[1.05rem] font-bold leading-snug text-slate-900">{q.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{q.desc}</p>
              </article>
            ))}
          </div>
          <div className="mt-7 rounded-xl border border-[#F3DFA3] bg-[#FFF8E6] px-5 py-4 text-sm leading-relaxed text-[#6B5412]">
            <span className="font-bold text-[#4A3A05]">Scope is defined per engagement.</span> Coverage hours, response targets, pre-authorised actions and reporting commitments are documented in the service agreement before go-live, so there is no ambiguity about who does what.
          </div>
        </div>
      </section>

      {/* ───────── HOW IT WORKS ───────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#04101E] via-[#0A3D6B] to-[#04101E] py-16 sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[#1B8AC7]/15 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#28B5E1]/10 blur-3xl" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#28B5E1]">How the Service Works</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">From security signals to coordinated action.</h2>
          </div>

          <div className="relative mt-12 grid grid-cols-1 gap-9 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            <div aria-hidden="true" className="pointer-events-none absolute left-[8%] right-[8%] top-[34px] hidden h-0.5 bg-gradient-to-r from-transparent via-[#8ED1F5]/50 to-transparent lg:block" />
            {flow.map((s, idx) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: idx * 0.08 }} className="relative px-5 text-center">
                <div className="relative z-10 mx-auto mb-5 flex h-[68px] w-[68px] items-center justify-center rounded-full border-2 border-[#8ED1F5]/50 bg-[#163A6B] font-display text-[1.3rem] font-extrabold text-[#8ED1F5]">{s.step}</div>
                <h3 className="font-display text-xl font-bold text-white">{s.title}</h3>
                <p className="mx-auto mt-2 text-sm leading-relaxed text-slate-300">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── ENGAGEMENT MODELS ───────── */}
      <section id="models" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Choose the Right SOC Engagement Model</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Security operations that fit your organisation.</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Not every organisation needs the same level of external support. We assess your environment first, then recommend the model that matches your team, tools and risk.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {models.map((m, idx) => (
              <motion.article key={m.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: idx * 0.06 }} className={`relative flex flex-col overflow-hidden rounded-2xl bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(11,30,58,0.08)] ${m.featured ? "border-[1.5px] border-[#1B8AC7]" : "border border-slate-200"}`}>
                {m.featured && (
                  <span aria-label="Most common engagement model" className="absolute -right-[34px] top-4 rotate-45 bg-[#1B8AC7] px-11 py-[5px] text-[0.7rem] font-bold text-white">
                    Most common
                  </span>
                )}
                <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[11px] bg-[#E8F3FA] text-[#1B8AC7] [&>svg]:h-[22px] [&>svg]:w-[22px]">
                  {m.icon}
                </span>
                <h3 className="mt-3.5 font-display text-xl font-bold text-slate-900">{m.title}</h3>
                <p className="mt-2.5 text-[0.96rem] leading-relaxed text-slate-500">{m.desc}</p>
                <ul className="mt-4 flex flex-1 flex-col gap-2">
                  {m.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-sm text-slate-700">
                      <span aria-hidden="true" className="font-extrabold text-[#1B8AC7]">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-[18px] border-t border-dashed border-slate-200 pt-4 text-sm leading-relaxed text-slate-900">
                  <span className="font-bold text-[#1B8AC7]">Best for:</span> {m.best}
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 bg-white px-5 py-[18px] text-[0.95rem] leading-relaxed text-slate-500">
            Each engagement specifies exactly who monitors, investigates, approves and executes response actions. Managed SOC arrangements differ considerably in what is included, which is why we document responsibilities before anything goes live.
          </div>
        </div>
      </section>

      {/* ───────── SOCaaS vs IN-HOUSE ───────── */}
      <section id="compare" className="relative scroll-mt-20 bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">SOC as a Service vs. Building Your Own SOC</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Get the capability without building every component in-house.</h2>
          </div>

          <div className="mt-8 flex justify-center sm:mt-10">
            <button onClick={openContact} className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base">
              Talk to our Consultant
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </button>
          </div>

          <div className="mx-auto mt-12 max-w-6xl overflow-hidden rounded-2xl border border-[#DCE4EE] bg-white shadow-[0_4px_14px_rgba(11,30,58,0.06)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-left text-sm min-w-[var(--vtw)] lg:min-w-0" style={{ ["--vtw" as string]: "640px" }}>
                <thead>
                  <tr>
                    <th className="sticky left-0 z-10 w-[120px] bg-[#0B1E3A] px-3 py-4 text-left align-middle font-display text-sm font-bold text-white sm:px-5 sm:py-5 sm:text-base lg:w-[18%]">Consideration</th>
                    <th className="bg-[#0B1E3A] px-3 py-4 text-left align-middle font-display text-sm font-bold text-white sm:px-5 sm:py-5 sm:text-base">In-house SOC</th>
                    <th className="bg-[#1B8AC7] px-3 py-4 text-left align-middle font-display text-sm font-bold text-white sm:px-5 sm:py-5 sm:text-base">SOC as a Service</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.label} className="border-t border-[#DCE4EE] transition-colors hover:bg-[#28B5E1]/[0.04]">
                      <th scope="row" className="sticky left-0 z-10 bg-[#F3F8FC] px-3 py-3 text-left align-middle font-display text-sm font-bold text-slate-900 sm:px-5 sm:py-4">{row.label}</th>
                      <td className="bg-white px-3 py-3 align-middle text-sm leading-relaxed text-slate-700 sm:px-5 sm:py-4">{row.inHouse}</td>
                      <td className="bg-[#F6FBFE] px-3 py-3 align-middle text-sm leading-relaxed text-slate-800 sm:px-5 sm:py-4">{row.socaas}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-6xl text-sm leading-relaxed text-slate-600">
            SOC as a Service does not automatically eliminate internal security responsibilities. The right model depends on your existing tools, risk profile, compliance requirements and the response responsibilities retained by your organisation.
          </p>
        </div>
      </section>

      {/* ───────── TECHNOLOGY & INTEGRATION ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.06),transparent_60%)]" />
        <div className="shell relative">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Technology and Integration</p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Work with your existing security environment.</h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                Your SOC service should complement your existing security controls rather than force unnecessary platform changes.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                Artiflex assesses the appropriate combination of security technologies according to your requirements, drawing on our Security Operations portfolio across SIEM, MDR and NDR.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {techVendors.map((v) => (
                  <span key={v} className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#045891] shadow-sm">{v}</span>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {techLinks.map((t) => (
                <Link key={t.title} to={t.href} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1B8AC7]/60 hover:shadow-[0_20px_60px_-12px_rgba(27,138,199,0.20)]">
                  <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#045891] to-[#28B5E1]" />
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-bold text-slate-900 transition-colors group-hover:text-[#1B8AC7]">{t.title}</h3>
                    <svg className="mt-1 h-4 w-4 shrink-0 text-[#1B8AC7] transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{t.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── WHY ARTIFLEX ───────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#04101E] via-[#0A3D6B] to-[#04101E] py-16 sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(to right, #28B5E1 1px, transparent 1px), linear-gradient(to bottom, #28B5E1 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#28B5E1]">Why Artiflex?</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">A security operations partner, not just another technology supplier.</h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((c) => (
              <article key={c.title} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#28B5E1]/40 hover:bg-white/[0.07]">
                <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#045891] to-[#28B5E1]" />
                <h3 className="font-display text-base font-bold text-white">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── COMPLIANCE ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">UAE Compliance and Reporting</p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Make security operations easier to evidence.</h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                For organisations with regulatory, contractual or audit obligations, security monitoring needs to produce more than alerts.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                Depending on the environment and engagement scope, Artiflex can help define monitoring use cases, logging requirements, incident documentation and reporting relevant to the frameworks that apply to you. We support security monitoring, evidence and control implementation. Subscribing to a SOC service is not in itself a compliance guarantee.
              </p>
            </div>
            <ul className="flex flex-col gap-3">
              {frameworks.map((f) => (
                <li key={f.badge} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1B8AC7]/40 hover:shadow-md sm:p-5">
                  <span className="inline-flex min-w-[5.5rem] items-center justify-center rounded-lg bg-gradient-to-br from-[#045891] to-[#1B8AC7] px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-white">{f.badge}</span>
                  <p className="text-sm leading-relaxed text-slate-700">{f.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section id="faq" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <SectionHeader label="Frequently Asked Questions" title={<>SOC as a Service questions we <span className="gradient-text">hear most</span></>} description="What UAE buyers ask us most about scoping, pricing and operating a managed SOC engagement." centered />
          <div className="mt-12 grid gap-6 sm:mt-14 lg:grid-cols-12 lg:gap-8">
            <ul className="flex flex-col gap-2 lg:col-span-6">
              {faqs.map((faq, idx) => {
                const isActive = activeFaq === idx;
                return (
                  <li key={faq.question}>
                    <button type="button" onClick={() => setActiveFaq(idx)} aria-pressed={isActive} aria-controls="faq-answer-panel" className={`group flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-semibold transition-all duration-200 sm:px-5 sm:text-[15px] ${isActive ? "border-transparent bg-gradient-to-r from-[#045891] to-[#1B8AC7] text-white shadow-[0_8px_24px_-8px_rgba(27,138,199,0.55)]" : "border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-[#28B5E1]/60 hover:bg-slate-50 hover:text-[#1B8AC7]"}`}>
                      <span className="leading-snug">{faq.question}</span>
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 shrink-0 transition-transform duration-300 ${isActive ? "translate-x-0.5" : "opacity-50 group-hover:translate-x-0.5 group-hover:opacity-100"}`}><path d="M5 12h14M13 5l7 7-7 7" /></svg>
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

      <CTASection
        title="Your Security Alerts Need More Than a Notification."
        description="Find out what it would take to give your organisation a managed security operation aligned with your risks, infrastructure and internal capabilities. Start with a SOC assessment from Artiflex IT."
        primaryButton={{ text: "Book a SOC Assessment", action: "modal" }}
        secondaryButton={{ text: "Contact Our Team", href: "/contact" }}
      />
    </>
  );
}
