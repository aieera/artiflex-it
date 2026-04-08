import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import StatsBar from "@/components/ui/StatsBar";
import ProcessFlow from "@/components/ui/ProcessFlow";
import { CTASection } from "@/pages/Home/sections/CTASection";
import {
  GearIcon,
  MonitorIcon,
  ShieldIcon,
  CheckIcon,
  AlertIcon,
  ServerIcon,
  WifiIcon,
  ChevronDownIcon,
} from "@/components/icons";

/* ────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────── */

const amcStats = [
  { value: 99.97, suffix: "%", label: "Uptime Maintained" },
  { value: 60, suffix: "%", label: "Less IT Downtime" },
  { value: 4, suffix: "hr", label: "Max Response SLA" },
  { value: 24, suffix: "/7", label: "Monitoring Available" },
];

const costProblem = {
  title: "The Hidden Cost of Reactive IT",
  stats: [
    { value: "$5,600", label: "Cost per minute of unplanned IT downtime" },
    { value: "73%", label: "Of unplanned downtime caused by aging, unmaintained infrastructure" },
    { value: "3.6x", label: "Higher repair costs for break-fix vs. preventive maintenance" },
    { value: "42%", label: "Of SMEs experience data loss from hardware failure without AMC" },
  ],
};

const amcServices = [
  {
    icon: GearIcon,
    title: "Preventive Maintenance Visits",
    description:
      "Scheduled on-site and remote inspections of servers, network equipment, UPS systems, and workstations. We clean, update firmware, check hardware health, replace degrading components, and document everything — before failure disrupts your operations.",
    features: [
      "Monthly / quarterly / annual visit schedules",
      "Hardware health checks and diagnostics",
      "Firmware and BIOS updates",
      "Component replacement (fans, batteries, drives)",
      "Environment checks (temperature, power, cabling)",
    ],
  },
  {
    icon: MonitorIcon,
    title: "24/7 Infrastructure Monitoring",
    description:
      "Real-time monitoring of servers, switches, firewalls, storage, UPS, and environmental sensors. Threshold-based alerting catches problems at warning level — not failure level. Our NOC triages every alert within minutes.",
    features: [
      "Server CPU, memory, disk, and process monitoring",
      "Network device health and bandwidth tracking",
      "Firewall and security appliance monitoring",
      "UPS and power infrastructure alerts",
      "Automated escalation and incident logging",
    ],
  },
  {
    icon: AlertIcon,
    title: "Patch Management",
    description:
      "Missing patches are the single most exploited vulnerability vector. We test, schedule, and deploy patches across operating systems, applications, and firmware on a regular cadence — with rollback procedures for every update.",
    features: [
      "OS patches (Windows Server, Linux, endpoints)",
      "Application and third-party software updates",
      "Firmware updates for network and security devices",
      "Pre-deployment testing in staging environments",
      "Rollback procedures and change documentation",
    ],
  },
  {
    icon: ShieldIcon,
    title: "Backup & Disaster Recovery Testing",
    description:
      "Backups are worthless if they don't restore. We verify your backup integrity monthly, test disaster recovery procedures quarterly, and document RTOs and RPOs so you know exactly what to expect when it matters.",
    features: [
      "Monthly backup integrity verification",
      "Quarterly disaster recovery drills",
      "RTO/RPO documentation and validation",
      "Backup policy review and optimization",
      "Offsite and cloud backup monitoring",
    ],
  },
  {
    icon: ServerIcon,
    title: "Hardware Lifecycle Management",
    description:
      "Track warranty status, end-of-life dates, and performance degradation across your entire hardware estate. We plan replacements before failures, negotiate vendor contracts, and manage procurement — so you never run mission-critical systems on expired hardware.",
    features: [
      "Asset inventory and warranty tracking",
      "End-of-life and end-of-support alerts",
      "Capacity planning and upgrade recommendations",
      "Vendor coordination and procurement support",
      "Hardware refresh roadmap aligned to budget cycles",
    ],
  },
  {
    icon: WifiIcon,
    title: "Network & Connectivity Management",
    description:
      "Ongoing management of your LAN, WAN, Wi-Fi, and ISP connections. We monitor bandwidth utilization, optimize routing, troubleshoot connectivity issues, and ensure your network infrastructure supports your business growth.",
    features: [
      "Switch, router, and AP configuration management",
      "Bandwidth monitoring and optimization",
      "ISP liaison and escalation management",
      "Wi-Fi coverage assessment and tuning",
      "Network documentation and topology updates",
    ],
  },
];

const processSteps = [
  {
    number: 1,
    title: "Audit",
    description:
      "Full infrastructure audit — inventory every asset, document configurations, check warranty status, and identify maintenance gaps.",
  },
  {
    number: 2,
    title: "Plan",
    description:
      "Design a maintenance schedule aligned to your business hours, criticality tiers, and compliance requirements. Define SLAs and escalation paths.",
  },
  {
    number: 3,
    title: "Execute",
    description:
      "Deploy monitoring agents, configure alerting, begin scheduled maintenance visits, and establish vendor coordination protocols.",
  },
  {
    number: 4,
    title: "Report",
    description:
      "Monthly health reports, quarterly business reviews, annual infrastructure assessments, and continuous improvement recommendations.",
  },
];

const faqs = [
  {
    question: "What does an Annual Maintenance Contract (AMC) include?",
    answer:
      "An AMC covers scheduled preventive maintenance, hardware health monitoring, firmware and patch updates, backup verification, disaster recovery testing, asset lifecycle tracking, and priority support with guaranteed response times. The scope depends on your tier — Basic covers quarterly visits and business-hours support, Professional adds 24/7 monitoring and monthly visits, and Enterprise includes weekly maintenance with on-site availability and 1-hour SLAs.",
  },
  {
    question: "How does AMC differ from Managed IT Services?",
    answer:
      "AMC focuses specifically on infrastructure maintenance and health — preventive visits, hardware lifecycle, patching, and backup testing. Managed IT Services are broader, encompassing AMC plus help desk support, security operations, incident response, and strategic IT planning. Think of AMC as maintaining the engine; Managed IT is operating the entire vehicle. Many clients start with AMC and upgrade to Managed IT as their needs grow.",
  },
  {
    question: "What hardware and systems does your AMC cover?",
    answer:
      "Our AMC covers servers (rack, blade, tower), network infrastructure (switches, routers, firewalls, access points), storage systems (SAN, NAS), UPS and power systems, workstations and endpoints, printers, and environmental monitoring. We support equipment from Sophos, Cisco, Fortinet, HPE, Dell, Lenovo, APC, and all major enterprise vendors.",
  },
  {
    question: "How quickly do you respond to incidents under AMC?",
    answer:
      "Response times depend on your tier: Business hours support for Basic, 4-hour SLA for Professional, and 1-hour SLA for Enterprise. All tiers include automated escalation — our monitoring systems detect issues and create tickets before you call. Enterprise clients also get on-site support availability within their SLA window.",
  },
  {
    question: "Can AMC help us comply with UAE regulations?",
    answer:
      "Yes. Regular patching and maintenance is explicitly required by NESA, CBUAE, and ISO 27001. Our AMC includes patch management, backup verification, and hardware lifecycle tracking — all of which generate audit-ready documentation. We provide quarterly compliance reports mapping your maintenance status to applicable framework controls.",
  },
  {
    question: "What is the difference between break-fix and AMC?",
    answer:
      "Break-fix means you call when something fails, pay per incident, and accept downtime while waiting for diagnosis and repair. AMC is proactive — we prevent failures through scheduled maintenance, catch issues early through monitoring, and respond within guaranteed SLAs when problems occur. Our clients see 3.6x lower total repair costs and 60% less unplanned downtime compared to break-fix approaches.",
  },
  {
    question: "Do you provide AMC for multi-site businesses?",
    answer:
      "Yes. We support multi-site deployments across the UAE and GCC with centralized monitoring and coordinated maintenance schedules. Our NOC monitors all sites from a single dashboard, and we schedule preventive visits to minimize disruption across locations. Enterprise AMC includes dedicated account management for multi-site coordination.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

/* ────────────────────────────────────────────
   FAQ ACCORDION
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
              className={`h-5 w-5 shrink-0 text-brand-cyan transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""
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
            <p className="pb-5 text-sm leading-relaxed text-body">{item.answer}</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────
   PAGE COMPONENT
   ──────────────────────────────────────────── */

export default function AMCServicesPage() {
  return (
    <>
      <Helmet>
        <title>AMC Services UAE — Annual Maintenance Contracts for IT Infrastructure | ArtiflexIT Dubai</title>
        <meta
          name="description"
          content="ArtiflexIT AMC services: preventive maintenance, 24/7 monitoring, patch management, backup testing, and hardware lifecycle management for UAE businesses. From AED 2,500/mo."
        />
        <meta
          name="keywords"
          content="AMC services UAE, annual maintenance contract Dubai, IT maintenance UAE, preventive maintenance Dubai, server maintenance, network maintenance UAE, IT infrastructure support, hardware lifecycle management, patch management UAE, IT AMC pricing Dubai"
        />
        <link rel="canonical" href="https://artiflexit.com/amc-services" />
        <meta property="og:title" content="AMC Services — IT Infrastructure Maintenance | ArtiflexIT UAE" />
        <meta property="og:description" content="Preventive maintenance, 24/7 monitoring, and guaranteed SLAs for your IT infrastructure. AMC plans from AED 2,500/mo." />
        <meta property="og:url" content="https://artiflexit.com/amc-services" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* HERO */}
      <PageHero
        title={
          <>
            IT Maintenance That{" "}
            <span className="gradient-text">Prevents Downtime, Not Just Fixes It</span>
          </>
        }
        description="Unplanned downtime costs $5,600 per minute. Our Annual Maintenance Contracts deliver scheduled preventive care, 24/7 monitoring, and guaranteed response times — so your infrastructure runs at peak performance year-round."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "AMC Services", href: "/amc-services" },
        ]}
      />

      {/* STATS */}
      <StatsBar stats={amcStats} />

      {/* THE COST PROBLEM */}
      <section className="relative py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 ">
          <SectionHeader
            label="The Problem"
            title={
              <>
                The Hidden Cost of{" "}
                <span className="gradient-text">Reactive IT</span>
              </>
            }
            description="Most businesses don't realize how much unplanned downtime and break-fix repairs actually cost until they add it up."
            centered
          />
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 max-w-5xl mx-auto">
            {costProblem.stats.map((stat) => (
              <div
                key={stat.label}
                className="group relative rounded-2xl border border-border-light bg-gradient-to-r from-[#045891] to-[#1B8AC7] p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[#045891]/20 hover:shadow-[0_8px_30px_rgba(4,88,145,0.08)] hover:-translate-y-0.5"
              >
                <span className="font-display text-2xl font-bold text-white sm:text-3xl">{stat.value}</span>
                <p className="mt-2 text-sm text-white leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AMC SERVICES */}
      <section className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="What's Covered"
            title={
              <>
                Comprehensive{" "}
                <span className="gradient-text">Maintenance </span> Services
              </>
            }
            description="Six pillars of infrastructure maintenance that keep your systems healthy, patched, monitored, and documented."
            centered
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {amcServices.map((service) => (
              <Card key={service.title} variant="service" className="p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10">
                    <service.icon className="w-5 h-5 text-brand-blue" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-heading">{service.title}</h3>
                </div>
                <p className="text-sm text-body leading-relaxed mb-4">{service.description}</p>
                <ul className="mt-auto space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckIcon className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                      <span className="text-xs text-body">{f}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Knowledge Base"
            title={
              <>
                Frequently <span className="gradient-text">Asked</span> Questions
              </>
            }
            description="Common questions about Annual Maintenance Contracts from UAE businesses."
            centered
          />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Protect Your Infrastructure Investment"
        description="Request a free infrastructure audit. We'll assess your current hardware, identify maintenance gaps, and recommend the right AMC tier — no obligation, delivered within 5 business days."
        primaryButton={{ text: "Discuss Your Requirements", action: "modal" }}
      />
    </>
  );
}
