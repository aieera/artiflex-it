import { useState } from "react";
import { scrollToElement } from "@/lib/lenis";
import { motion } from "framer-motion";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import {
  GearIcon,
  MonitorIcon,
  ShieldIcon,
  CheckIcon,
  ServerIcon,
  ChevronDownIcon,
  LayersIcon,
  TargetIcon,
  EyeIcon,
  UsersIcon,
  MapPinIcon,
  SearchIcon,
  ActivityIcon,
  GlobeIcon,
  FileTextIcon,
  LockIcon,
  BarChartIcon,
  SlidersIcon,
  XIcon,
} from "@/components/icons";

/* ───────── BRAND GRADIENT HELPERS ───────── */

// Brand gradient anchor colors: deep navy → mid navy-blue → brand cyan.
// Used to slice a continuous gradient across a row of capability cards so the
// row reads as a single sweep rather than four identical tiles.
const gradientStops: ReadonlyArray<readonly [number, number, number]> = [
  [4, 16, 30],     // #04101E
  [10, 61, 107],   // #0A3D6B
  [27, 138, 199],  // #1B8AC7
];

function interpolateGradient(t: number): string {
  const clamped = Math.min(1, Math.max(0, t));
  const pos = clamped * (gradientStops.length - 1);
  const idx = Math.min(Math.floor(pos), gradientStops.length - 2);
  const localT = pos - idx;
  const c1 = gradientStops[idx];
  const c2 = gradientStops[idx + 1];
  const r = Math.round(c1[0] + (c2[0] - c1[0]) * localT);
  const g = Math.round(c1[1] + (c2[1] - c1[1]) * localT);
  const b = Math.round(c1[2] + (c2[2] - c1[2]) * localT);
  return `rgb(${r}, ${g}, ${b})`;
}

function getCardGradient(index: number, total: number): string {
  const safeTotal = Math.max(total, 1);
  const start = index / safeTotal;
  const end = (index + 1) / safeTotal;
  return `linear-gradient(135deg, ${interpolateGradient(start)} 0%, ${interpolateGradient(end)} 100%)`;
}

/* ───────── PLAN / BUILD / RUN CAPABILITIES ───────── */

type Phase = {
  phase: string;
  intro: string;
  capabilities: { icon: React.FC<{ className?: string }>; title: string; description: string }[];
};

const phases: Phase[] = [
  {
    phase: "Plan",
    intro: "The decisions that determine the next three years of cost and risk.",
    capabilities: [
      {
        icon: BarChartIcon,
        title: "IT Consulting & Strategy",
        description:
          "12 to 36-month roadmaps, infrastructure and security assessments, technology selection, CapEx vs OpEx modelling, governance and compliance advisory.",
      },
      {
        icon: LayersIcon,
        title: "Infrastructure Design",
        description:
          "Data center, network, storage, UC, CCTV, and power architecture. HLD/LLD with capacity models, BoM with OEM options, implementation-ready diagrams.",
      },
    ],
  },
  {
    phase: "Build",
    intro: "Turn the design into a working environment with minimal disruption.",
    capabilities: [
      {
        icon: GearIcon,
        title: "Implementation & Deployment",
        description:
          "Servers, storage, networking, IP telephony, CCTV and access control, data and workload migration. Phased rollout: staging, pilot, production, UAT, handover.",
      },
    ],
  },
  {
    phase: "Run",
    intro: "Keep the environment performing, secure, and predictable to budget.",
    capabilities: [
      {
        icon: MonitorIcon,
        title: "Managed IT Services",
        description:
          "Full operational ownership of infrastructure, endpoints, patching, backup, vendor management, and monthly reporting. Predictable monthly OpEx.",
      },
      {
        icon: ShieldIcon,
        title: "Annual Maintenance Contracts",
        description:
          "Preventive health checks, break-fix, firmware and patch management, and performance tuning. 8×5 or 24×7. On-site or remote.",
      },
      {
        icon: EyeIcon,
        title: "Remote Monitoring & Support",
        description:
          "24×7 monitoring, smart alerting, auto-remediation, ticketing, patch automation, and performance dashboards.",
      },
      {
        icon: UsersIcon,
        title: "IT Outsourcing",
        description:
          "Full outsourcing, co-managed IT, on-site engineers, or project-based engagements, picked by your operational maturity.",
      },
    ],
  },
];

/* ───────── IN-HOUSE vs MANAGED COMPARISON ───────── */

const comparisonRows = [
  { label: "Direct salaries", inhouse: "Multiple FTEs (sysadmin, network engineer, security specialist)", managed: "Single predictable monthly fee", managedWin: true },
  { label: "Visa & renewals", inhouse: "Per employee, recurring", managed: "Not applicable", managedWin: true },
  { label: "Medical insurance", inhouse: "Per employee", managed: "Not applicable", managedWin: true },
  { label: "Annual air tickets", inhouse: "Per employee", managed: "Not applicable", managedWin: true },
  { label: "End-of-service gratuity", inhouse: "Accrued continuously", managed: "Not applicable", managedWin: true },
  { label: "Training & certifications", inhouse: "Continuous spend", managed: "Included", managedWin: true },
  { label: "Single-person dependency", inhouse: "High risk", managed: "Removed (multi-engineer team)", managedWin: true },
  { label: "24×7 coverage", inhouse: "Requires shift roster", managed: "Native", managedWin: true },
  { label: "RMM, ticketing, monitoring tooling", inhouse: "Separate licensing", managed: "Included", managedWin: true },
  { label: "Cost predictability", inhouse: "Variable", managed: "Fixed monthly", managedWin: true },
];

/* ───────── ENGAGEMENT MODELS ───────── */

const engagementModels = [
  {
    icon: ShieldIcon,
    title: "Full IT Outsourcing",
    badge: "Recommended for SMB",
    summary: "Strategy to support, vendors to tickets, under defined SLAs.",
    bestFor: "Businesses without internal IT, or where IT is not a core competency.",
    consider: "Internal change-management ownership still required.",
  },
  {
    icon: UsersIcon,
    title: "Co-managed IT",
    badge: "Recommended for Mid-Market",
    summary: "We work alongside your team, owning specific layers.",
    bestFor: "Existing IT teams that need depth, after-hours coverage, or specialist skills.",
    consider: "Roles and ownership boundaries must be defined upfront.",
  },
  {
    icon: MapPinIcon,
    title: "On-site Engineers",
    summary: "Dedicated resources placed at your office, with full back-office support behind them.",
    bestFor: "Sites that need physical presence: manufacturing, hospitality, regulated environments.",
    consider: "Less flexible than remote-first models.",
  },
  {
    icon: TargetIcon,
    title: "Project-based",
    summary: "Defined scope, defined timeline, defined outcome. No ongoing retainer.",
    bestFor: "One-off migrations, refresh cycles, branch rollouts, infrastructure builds.",
    consider: "Not suited for ongoing operational management.",
  },
];

/* ───────── DECISION FRAMEWORK ───────── */

const frameworkGroups = [
  {
    icon: BarChartIcon,
    group: "Business & Operations",
    questions: [
      {
        q: "How many users, sites, and time zones do we need to cover?",
        a: "Coverage windows (8×5 vs 24×7), language requirements, and on-site response times all flow from this. UAE-only operations look very different from a UAE-Oman-KSA footprint with a manufacturing site in the mix.",
      },
      {
        q: "What are your business-critical applications and tolerable downtime?",
        a: "ERP, banking-grade applications, and retail POS each have different RTO and RPO targets. The operating model has to match the cost of an hour of downtime, not the other way around.",
      },
    ],
  },
  {
    icon: ServerIcon,
    group: "Current Environment",
    questions: [
      {
        q: "What infrastructure exists today, and how much of it is end-of-life?",
        a: "A clean greenfield deployment is not the same as inheriting a seven-year-old estate with mixed warranties. The migration path determines whether you need consulting, project delivery, or managed services first.",
      },
      {
        q: "What does your backup and DR setup actually do today, not what it was designed to do?",
        a: "Most UAE backup setups have not been tested against a real recovery scenario in the last 12 months. This is usually the first thing we audit, and the most common gap we find.",
      },
    ],
  },
  {
    icon: LockIcon,
    group: "Security & Compliance",
    questions: [
      {
        q: "Which regulatory frameworks apply (NESA, UAE PDPL, ISO 27001, CBUAE)?",
        a: "Compliance posture changes which logs are retained, for how long, and what audit evidence the operating model must produce. A managed service for a regulated business is not the same product as a managed service for a free-zone trading company.",
      },
      {
        q: "What security tools are in place, and who operates them?",
        a: "A SIEM with no operator is shelfware. The operating model has to close that gap, either through your team, ours, or a co-managed split.",
      },
    ],
  },
  {
    icon: FileTextIcon,
    group: "Commercial & Deployment",
    questions: [
      {
        q: "CapEx, OpEx, or hybrid?",
        a: "CFO preference often makes the decision before the IT director's preference does. Managed services convert capital purchases into predictable monthly cost, useful when capital is constrained or growth is uncertain.",
      },
      {
        q: "What internal capacity exists today?",
        a: "A two-person internal IT team needs depth and coverage extension (co-managed). A non-existent IT function needs full outsourcing. The honest answer here saves three months of evaluation cycles.",
      },
      {
        q: "What is the timeline, and what is driving it?",
        a: "Audit deadline, lease expiry, vendor end-of-life, M&A integration: each one leads to a different sequence of services. Naming the driver upfront keeps the proposal honest.",
      },
    ],
  },
];

/* ───────── DELIVERY MODEL (Assess / Design / Deploy / Manage) ───────── */

const deliveryPhases = [
  {
    icon: SearchIcon,
    duration: "2 weeks",
    title: "Assess",
    description:
      "IT estate inventory, application discovery, security and compliance gap analysis, cost modelling, vendor and license review.",
    deliverable: "Current-state report, target-state recommendation, three-year TCO model.",
  },
  {
    icon: LayersIcon,
    duration: "2 to 4 weeks",
    title: "Design",
    description:
      "Architecture for your specific environment: HLD and LLD, capacity model, BoM with OEM options, migration plan, change-management framework, RACI.",
    deliverable: "Approved architecture, signed-off BoM, change-management plan.",
  },
  {
    icon: GearIcon,
    duration: "2 to 8 weeks",
    title: "Deploy",
    description:
      "Phased rollout with rollback procedures at every stage. Staging, pilot, production, UAT, handover. Off-hours cutover for production traffic.",
    deliverable: "Production environment, runbooks, audit-ready documentation.",
  },
  {
    icon: ActivityIcon,
    duration: "Ongoing",
    title: "Manage",
    description:
      "24×7 monitoring, patch lifecycle, vendor management, SLA-backed incident response, monthly reporting, quarterly business reviews.",
    deliverable: "Operational IT with SLAs you can rely on, or a clean handover when you build internal capacity.",
  },
];

/* ───────── WHY ARTIFLEX ───────── */

const artiflexStats: { value: string; label: string }[] = [
  { value: "14+", label: "Years in UAE IT delivery" },
  { value: "500+", label: "Projects delivered, GCC-wide" },
  { value: "20+", label: "Certified engineers" },
  { value: "Platinum", label: "Sophos partner tier" },
];

const artiflexCapabilities = [
  {
    icon: ShieldIcon,
    title: "Vendor coverage",
    description:
      "Sophos (Platinum), Check Point, Palo Alto Networks, Cisco, Fortinet, plus core infrastructure OEMs across compute, storage, network, UC, and physical security.",
  },
  {
    icon: FileTextIcon,
    title: "Compliance frameworks",
    description:
      "NESA, UAE PDPL, ISO 27001, NIST CSF 2.0, and CBUAE-aligned implementations, with audit-ready evidence delivered as part of the project, not as a follow-up engagement.",
  },
  {
    icon: GlobeIcon,
    title: "Coverage area",
    description:
      "On-site across Dubai, Abu Dhabi, and Sharjah. Remote across the UAE, Oman, and Saudi Arabia. 24×7 SOC support for managed customers.",
  },
  {
    icon: SlidersIcon,
    title: "Engagement model",
    description:
      "Fully managed, co-managed, on-site, or project-based. No vendor lock-in, no theatre, no upselling. The assessment drives the answer.",
  },
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "How is \"Managed IT Services\" different from an AMC?",
    answer:
      "An AMC keeps existing equipment running: preventive maintenance, break-fix, firmware. Managed Services covers the entire IT function: monitoring, user support, patching, vendor management, security operations, and reporting. Most UAE customers start with an AMC and graduate to Managed Services once internal IT can no longer keep up with growth.",
  },
  {
    question: "What SLAs does Artiflex offer for managed customers?",
    answer:
      "Standard tiers: 15-minute response for P1 incidents, 1 hour for P2, 4 hours for P3. Resolution SLAs are scoped to the application and infrastructure stack. 24×7 or 8×5 coverage windows. Custom SLAs available for regulated industries.",
  },
  {
    question: "Can you co-manage with our existing IT team?",
    answer:
      "Yes, co-managed IT is one of our most common engagements. We typically take on after-hours coverage, security operations, vendor management, or specific platforms (firewall, backup, endpoint), while your team retains end-user support and business-application ownership. Boundaries are documented in a RACI before kick-off.",
  },
  {
    question: "How quickly can you take over IT operations?",
    answer:
      "A standard transition for an SMB is 4 to 6 weeks: 2 weeks discovery, 2 weeks knowledge transfer and tooling deployment, 1 to 2 weeks parallel run. Mid-market and regulated environments take 8 to 12 weeks. We do not recommend lift-and-shift handovers without a parallel period.",
  },
  {
    question: "Do you support cloud, on-premise, and hybrid environments?",
    answer:
      "Yes. Active delivery across AWS, Microsoft Azure, Google Cloud, and on-premise data centers. Most UAE customers run hybrid by default, and our managed services and tooling are built for that reality.",
  },
  {
    question: "What does a Free IT Assessment include?",
    answer:
      "A structured 2 to 3 hour discovery session, followed by a written report covering cost-saving opportunities, infrastructure gaps, security risks, and a prioritized optimization roadmap. No obligation, no proposal attached. The report is yours.",
  },
  {
    question: "Will I lose visibility into my IT if I outsource it?",
    answer:
      "The opposite, in our experience. Most internal IT teams operate without dashboards, ticket reporting, or quarterly business reviews. Managed customers get monthly board-readable reporting, real-time dashboards, and a quarterly architecture review. Visibility usually goes up after outsourcing, not down.",
  },
  {
    question: "What compliance frameworks do you support?",
    answer:
      "NESA, UAE PDPL, ISO 27001, NIST CSF 2.0, CBUAE-specific requirements, and PCI-DSS where applicable. Audit-ready evidence is delivered as part of the engagement, not as a separate consulting project.",
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

/* ───────── FAQ ACCORDION ───────── */

function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
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
            <p className="pb-5 text-sm leading-relaxed text-body">{item.answer}</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

/* ───────── DECISION FRAMEWORK ACCORDION ───────── */

function FrameworkGroup({
  icon: Icon,
  group,
  questions,
}: {
  icon: React.FC<{ className?: string }>;
  group: string;
  questions: { q: string; a: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Card variant="default" hover={false} className="p-6 sm:p-7">
      <div className="flex items-center gap-3 mb-5 pb-5 border-b border-border-light">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10">
          <Icon className="w-5 h-5 text-brand-blue" />
        </div>
        <h3 className="font-display text-lg font-semibold text-heading">{group}</h3>
      </div>
      <div className="divide-y divide-border-light">
        {questions.map((item, i) => (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-start justify-between gap-3 py-4 text-left"
              aria-expanded={openIndex === i}
            >
              <span className="text-sm font-semibold text-heading sm:text-base">{item.q}</span>
              <ChevronDownIcon
                className={`h-4 w-4 shrink-0 text-brand-blue transition-transform duration-300 mt-1 ${
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
              <p className="pb-4 text-sm leading-relaxed text-body">{item.a}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ───────── PAGE ───────── */

function HeroCTAs() {
  const { openModal } = useContactModal();

  const scrollToDelivery = () => {
    const el = document.getElementById("delivery-model");
    if (el) scrollToElement(el);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
      <button
        onClick={openModal}
        className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90 hover:shadow-[0_4px_20px_rgba(255,255,255,0.2)] sm:px-8 sm:py-3.5 sm:text-base cursor-pointer"
      >
        Book a Free IT Assessment
      </button>
      <button
        onClick={scrollToDelivery}
        className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/10 sm:px-8 sm:py-3.5 sm:text-base cursor-pointer"
      >
        See Our Delivery Model
      </button>
    </div>
  );
}

export default function ManagedServicesPage() {
  return (
    <>
      <>
        <title>Managed IT Services UAE | Plan, Build, Run | ArtiflexIT</title>
        <meta
          name="description"
          content="Vendor-neutral managed IT services across the UAE, Oman, and Saudi Arabia. IT consulting, infrastructure design, implementation, AMC, 24/7 monitoring, and full IT outsourcing from one accountable team."
        />
        <meta
          name="keywords"
          content="managed IT services UAE, IT outsourcing Dubai, AMC UAE, IT consulting GCC, co-managed IT UAE, infrastructure design Dubai, 24/7 IT monitoring UAE, IT operating model, plan build run IT services, managed services Saudi Arabia, managed IT Oman"
        />
        <link rel="canonical" href="https://artiflexit.com/managed-services" />
        <meta property="og:title" content="Managed IT Services UAE | Plan, Build, Run | ArtiflexIT" />
        <meta property="og:description" content="Consulting, implementation, and outsourcing across the UAE, Oman, and Saudi Arabia. Vendor-neutral, compliance-aware, built around your business outcomes." />
        <meta property="og:image" content="https://artiflexit.com/og/managed-services.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://artiflexit.com/managed-services" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Managed IT Services UAE | ArtiflexIT" />
        <meta name="twitter:description" content="Plan, build, run IT environments across the GCC. Consulting, AMC, monitoring, full outsourcing, on one accountable team." />
        <meta name="twitter:image" content="https://artiflexit.com/og/managed-services.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Managed IT Services",
          serviceType: "Managed IT Services",
          provider: { "@type": "Organization", name: "Artiflex IT", url: "https://artiflexit.com" },
          areaServed: [
            { "@type": "Country", name: "United Arab Emirates" },
            { "@type": "Country", name: "Oman" },
            { "@type": "Country", name: "Saudi Arabia" },
          ],
          url: "https://artiflexit.com/managed-services",
          description: "Plan, build, and run IT environments across the GCC. IT consulting, infrastructure design, implementation, managed services, AMC, monitoring, and full outsourcing.",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Managed IT Services",
            itemListElement: [
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "IT Consulting & Strategy" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Infrastructure Design" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Implementation & Deployment" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Managed IT Services" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Annual Maintenance Contracts" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Remote Monitoring & Support" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "IT Outsourcing" } },
            ],
          },
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://artiflexit.com/" },
            { "@type": "ListItem", position: 2, name: "Managed IT Services", item: "https://artiflexit.com/managed-services" },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </>

      <PageHero
        title={<>Managed IT Services <span className="gradient-text">UAE</span></>}
        backgroundImage="/managed-it-services.webp"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Managed IT Services", href: "/managed-services" },
        ]}
      >
        <p className="-mt-2 max-w-5xl font-display text-xl font-medium leading-snug text-slate-200 sm:text-xl md:text-2xl lg:text-[2.0rem] lg:leading-snug">
          Consulting, Implementation, and Outsourcing across the UAE, Oman, and Saudi Arabia.
        </p>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-400 sm:mt-6 sm:text-base">
          Artiflex IT plans, builds, and runs IT environments for businesses across the GCC. From data center design and rollout to fully outsourced IT operations: vendor-neutral, compliance-aware, and built around your business outcomes. The conversation starts with your environment, your priorities, and your budget.
        </p>
        <div className="mt-7 sm:mt-9">
          <HeroCTAs />
        </div>
      </PageHero>

      {/* CAPABILITIES, Plan / Build / Run */}
      <section className="relative py-16 bg-white sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Capabilities"
            title={<>What We <span className="gradient-text">Deliver</span></>}
            description="IT services span three phases: plan, build, run. Most providers cover one. Artiflex covers all three under one accountable team, so you do not need to stitch together a consultant, an integrator, and a managed service provider."
            centered
          />

          <div className="space-y-12 sm:space-y-16">
            {phases.map((phase) => (
              <div key={phase.phase}>
                <div className="mb-6 flex flex-col items-start gap-2 sm:mb-8 sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="inline-flex items-center rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-blue">
                    {phase.phase}
                  </span>
                  <p className="text-sm leading-relaxed text-body sm:text-base">{phase.intro}</p>
                </div>

                <div
                  className={`grid gap-6 ${
                    phase.capabilities.length === 1
                      ? "md:grid-cols-1"
                      : phase.capabilities.length === 2
                      ? "md:grid-cols-2"
                      : "md:grid-cols-2 lg:grid-cols-4"
                  }`}
                >
                  {phase.capabilities.map((cap, i) => (
                    <div
                      key={cap.title}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 p-6 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-brand-cyan/40 hover:shadow-[0_16px_48px_rgba(27,138,199,0.25)]"
                      style={{
                        backgroundImage: getCardGradient(i, phase.capabilities.length),
                      }}
                    >
                      {/* Top accent line, appears on hover */}
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-brand-blue to-brand-cyan opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      {/* Subtle top-left darkening keeps text legible across the row */}
                      <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                          backgroundImage:
                            "linear-gradient(135deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 55%)",
                        }}
                      />
                      {/* Cyan glow in bottom-right, intensifies on hover */}
                      <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-brand-cyan/20 opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                      <div className="relative">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15 backdrop-blur-sm mb-4">
                          <cap.icon className="w-5 h-5 text-brand-cyan" />
                        </div>
                        <h3 className="font-display text-base font-semibold text-white mb-2 sm:text-lg">
                          {cap.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-slate-200">{cap.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IN-HOUSE vs MANAGED COMPARISON */}
      <section className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="shell">
          <SectionHeader
            label="True Cost"
            title={<>In-house IT vs <span className="gradient-text">Managed Services</span></>}
            description="The total cost of an internal IT team in the UAE is rarely a single line item. Salaries are visible. Visa renewals, gratuity, training, attrition, and tooling are not. Here is what the comparison actually looks like."
            centered
          />

          {/* Desktop / tablet: full comparison table */}
          <Card variant="default" hover={false} className="hidden p-0 overflow-hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7] text-white">
                    <th className="px-4 py-4 font-semibold sm:px-6">Cost / Capability</th>
                    <th className="px-4 py-4 font-semibold sm:px-6">In-house team</th>
                    <th className="px-4 py-4 font-semibold sm:px-6">Artiflex Managed Services</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.label}
                      className={`border-t border-border-light ${i % 2 === 1 ? "bg-surface-secondary/40" : ""}`}
                    >
                      <td className="px-4 py-4 font-semibold text-heading sm:px-6">{row.label}</td>
                      <td className="px-4 py-4 text-body sm:px-6">
                        <span className="inline-flex items-start gap-2">
                          <XIcon className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <span>{row.inhouse}</span>
                        </span>
                      </td>
                      <td className="px-4 py-4 text-body sm:px-6">
                        <span className="inline-flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                          <span className="text-heading font-medium">{row.managed}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Mobile: stacked comparison cards, no horizontal scroll */}
          <div className="space-y-4 md:hidden">
            {comparisonRows.map((row) => (
              <Card key={row.label} variant="default" hover={false} className="p-0 overflow-hidden">
                <div className="bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-4 py-3">
                  <p className="text-sm font-semibold text-white">{row.label}</p>
                </div>
                <div className="divide-y divide-border-light">
                  <div className="px-4 py-3">
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-body/70">
                      In-house team
                    </p>
                    <div className="flex items-start gap-2 text-sm text-body">
                      <XIcon className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                      <span>{row.inhouse}</span>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-surface-secondary/40">
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-brand-blue">
                      Artiflex Managed Services
                    </p>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                      <span className="font-medium text-heading">{row.managed}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-body sm:text-base">
            Typical savings: <span className="font-semibold text-heading">25 to 40%</span> versus building equivalent in-house capability. The bigger gain is removing single-person risk, IT operations stop depending on whether one engineer is on leave or has resigned.
          </p>
        </div>
      </section>

      {/* ENGAGEMENT MODELS */}
      <section className="relative py-16 bg-white sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Engagement Models"
            title={<>Picked by Your <span className="gradient-text">Maturity</span>, Not Our Preference</>}
            description="Operational maturity differs across UAE businesses. Artiflex offers four engagement models, picked by your team capacity and risk tolerance."
            centered
          />

          <div className="grid gap-6 md:grid-cols-2">
            {engagementModels.map((model) => (
              <Card key={model.title} variant="service" className="p-6 sm:p-7 flex flex-col">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10">
                      <model.icon className="w-5 h-5 text-brand-blue" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-heading">{model.title}</h3>
                  </div>
                  {model.badge && (
                    <span className="inline-flex w-fit items-center rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shrink-0">
                      {model.badge}
                    </span>
                  )}
                </div>

                <p className="text-sm text-body leading-relaxed mb-5">{model.summary}</p>

                <div className="mt-auto space-y-3 text-sm">
                  <div className="rounded-lg bg-brand-blue/[0.04] border border-brand-blue/10 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-blue mb-1">Best for</p>
                    <p className="text-body leading-relaxed">{model.bestFor}</p>
                  </div>
                  <div className="rounded-lg bg-surface-secondary border border-border-light p-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-body mb-1">Consider</p>
                    <p className="text-body leading-relaxed">{model.consider}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* DECISION FRAMEWORK */}
      <section className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Decision Framework"
            title={<>The Questions We Ask Before <span className="gradient-text">Designing Your Operating Model</span></>}
            description="Procurement gets cleaner when the questions are direct. Walk through these and the right operating model usually falls out by itself."
            centered
          />

          <div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
            {frameworkGroups.map((g) => (
              <FrameworkGroup key={g.group} icon={g.icon} group={g.group} questions={g.questions} />
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERY MODEL */}
      <section id="delivery-model" className="relative py-16 bg-white scroll-mt-20 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="How We Work"
            title={<>Our <span className="gradient-text">Delivery Model</span></>}
            description="Plan, build, run is more than a tagline. Each phase produces something an auditor can read and a CFO can sign off on."
            centered
          />

          <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Connecting line on lg screens */}
            <div className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent lg:block" />

            {deliveryPhases.map((phase) => (
              <Card key={phase.title} variant="service" className="p-6 flex flex-col relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#045891] to-[#1B8AC7] text-white shadow-sm">
                    <phase.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue">
                    {phase.duration}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-heading mb-2">{phase.title}</h3>
                <p className="text-sm text-body leading-relaxed mb-4">{phase.description}</p>
                <div className="mt-auto rounded-lg bg-brand-blue/[0.04] border border-brand-blue/10 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-blue mb-1">You get</p>
                  <p className="text-xs text-body leading-relaxed">{phase.deliverable}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WHY ARTIFLEX */}
      <section className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Why Artiflex IT"
            title={<>14+ Years of <span className="gradient-text">UAE IT Delivery</span></>}
            description="Vendor-agnostic by design. We tell you when outsourcing wins, when co-managing wins, when building internally wins, and when none of them is the right answer. The point of an honest assessment is honest answers."
            centered
          />

          {/* Stats row */}
          <div className="mb-10 sm:mb-14">
            <div className="rounded-2xl bg-white border border-border-light shadow-[0_4px_20px_rgba(0,0,0,0.06)] px-4 py-8 sm:px-8 sm:py-10 md:px-12">
              <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4 lg:gap-8">
                {artiflexStats.map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center text-center">
                    <span className="font-display text-2xl font-bold text-heading sm:text-4xl md:text-[2.75rem] leading-none">
                      <span className="bg-gradient-to-r from-[#045891] to-[#1B8AC7] bg-clip-text text-transparent">
                        {stat.value}
                      </span>
                    </span>
                    <span className="mt-2 text-xs text-body font-medium sm:text-sm">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Capability cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {artiflexCapabilities.map((cap) => (
              <Card key={cap.title} variant="service" className="p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10 mb-4">
                  <cap.icon className="w-5 h-5 text-brand-blue" />
                </div>
                <h3 className="font-display text-base font-semibold text-heading mb-2 sm:text-lg">
                  {cap.title}
                </h3>
                <p className="text-sm text-body leading-relaxed">{cap.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-16 bg-white sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Knowledge Base"
            title={<>Frequently <span className="gradient-text">Asked</span> Questions</>}
            description="What UAE businesses ask us most when evaluating managed and outsourced IT."
            centered
          />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <CTASection
        title="Get the IT Operating Model Guide"
        description="Vendor-neutral comparison of in-house, co-managed, and outsourced IT operating models, with TCO modelling, SLA frameworks, and real UAE deployment case studies."
        primaryButton={{ text: "Book a Free IT Assessment", action: "modal" }}
      />
    </>
  );
}
