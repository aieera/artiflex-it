import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import PageHero from "@/components/sections/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import { CTASection } from "@/components/sections/CTASection";
import {
  ShieldIcon,
  CloudIcon,
  ServerIcon,
  GearIcon,
  CheckIcon,
  ArrowRightIcon,
} from "@/components/icons";

const services = [
  {
    icon: ShieldIcon,
    name: "Cybersecurity",
    href: "/cybersecurity",
    problem:
      "68% of businesses in the UAE experienced at least one cyber incident last year. Most discovered the breach weeks after it happened — through a customer complaint, not their security tools. The gap isn't technology. It's visibility.",
    solution:
      "We build layered security architectures that detect, respond, and contain threats before they reach your data. From vulnerability assessments to 24/7 SOC monitoring, we cover the full attack surface — endpoints, network, email, and cloud.",
    features: [
      "Vulnerability Assessment & Penetration Testing (VAPT)",
      "SOC-as-a-Service with 24/7 threat monitoring",
      "Endpoint Detection & Response (EDR)",
      "Next-generation firewall deployment & management",
      "Data Loss Prevention & email security",
    ],
    outcome: "Clients reduce mean time to detect from 197 days to under 4 hours.",
    outcomeBg: "bg-brand-blue/10 border-brand-blue/30",
  },
  {
    icon: CloudIcon,
    name: "Cloud Solutions",
    href: "/cloud-solutions",
    problem:
      "Failed cloud migrations cost businesses 3 to 6 months of lost productivity. The typical failure pattern: a company lifts-and-shifts their infrastructure without rearchitecting for cloud, then spends months troubleshooting performance issues and unexpected bills.",
    solution:
      "We plan, execute, and optimize cloud environments across AWS, Azure, and private cloud platforms. Every migration starts with workload assessment — not a sales pitch for the most expensive tier.",
    features: [
      "IaaS, PaaS, and SaaS advisory & deployment",
      "Hybrid and multi-cloud architecture",
      "Cloud cost optimization (FinOps)",
      "Disaster recovery & business continuity",
      "Cloud-native security controls",
    ],
    outcome: "Average 35% reduction in cloud spend within 90 days of optimization.",
    outcomeBg: "bg-brand-cyan/10 border-brand-cyan/30",
  },
  {
    icon: ServerIcon,
    name: "IT Infrastructure",
    href: "/infrastructure",
    problem:
      "Aging infrastructure causes 73% of unplanned downtime in the region. We see the same pattern: equipment purchased 7 years ago, running firmware from 5 years ago, supporting workloads it was never designed for. The result is $5,600 per minute in downtime costs.",
    solution:
      "We design, deploy, and maintain physical and virtual infrastructure built for current workloads and three-year growth projections. Every project starts with a capacity assessment and ends with a documented runbook.",
    features: [
      "Network architecture & structured cabling",
      "Server & storage solutions (on-premise and hybrid)",
      "Virtualization (VMware, Hyper-V)",
      "Enterprise wireless design & deployment",
      "Performance monitoring & capacity planning",
    ],
    outcome: "Clients achieve 99.97% infrastructure uptime with proactive monitoring.",
    outcomeBg: "bg-brand-purple/10 border-brand-purple/30",
  },
  {
    icon: GearIcon,
    name: "Managed Services",
    href: "/managed-services",
    problem:
      "IT teams spend 60% of their time on maintenance tasks — patching, rebooting, chasing alerts, and fielding help desk tickets. That leaves 40% for the projects that actually move the business forward. Most organizations can't hire their way out of this because qualified engineers in the UAE market cost AED 25,000+/month.",
    solution:
      "We take operational responsibility for your IT environment so your team focuses on strategic work. Our managed services cover monitoring, maintenance, incident response, and help desk — with guaranteed response times.",
    features: [
      "Annual Maintenance Contracts (AMC)",
      "24/7 infrastructure & security monitoring",
      "Patch management & firmware updates",
      "Incident response & escalation",
      "Help desk support (L1/L2/L3)",
    ],
    outcome: "60% average reduction in IT operational overhead for managed clients.",
    outcomeBg: "bg-brand-blue/10 border-brand-blue/30",
  },
];

const whyOneProvider = [
  {
    title: "Single SLA, Single Throat to Choke",
    description:
      "When an issue spans your firewall and your cloud environment, you don't need two vendors pointing fingers. You need one team that owns the whole resolution path.",
  },
  {
    title: "No Finger-Pointing",
    description:
      "With multiple vendors, incident investigations stall while teams argue about whose scope the problem falls under. We eliminate that entirely — our team sees the full picture.",
  },
  {
    title: "Consolidated Reporting",
    description:
      "One dashboard. One monthly report. One set of metrics that covers security posture, infrastructure health, cloud spend, and operational efficiency.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>IT Services — Cybersecurity, Cloud, Infrastructure, Managed Services | ArtiflexIT</title>
        <meta name="description" content="ArtiflexIT delivers cybersecurity, cloud solutions, IT infrastructure, and managed services under one SLA. Serving UAE businesses with enterprise-grade protection and unified IT management." />
      </Helmet>

      <PageHero
        title={
          <>
            Security, Cloud, and Infrastructure —{" "}
            <span className="gradient-text">Under One Roof</span>
          </>
        }
        description="Four core IT disciplines delivered by one team, under one SLA, with one point of accountability. No vendor gaps. No finger-pointing. No blind spots."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
      />

      {/* Intro */}
      <section className="relative py-16 bg-navy-deep sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader
              label="Our Approach"
              title="Unified IT Management"
              description="Most businesses work with separate vendors for security, cloud, infrastructure, and support. Each vendor has their own SLA, their own escalation process, and their own definition of 'not our problem.' We replace that fragmentation with a single, accountable partner."
              centered
            />
          </div>
        </div>
      </section>

      {/* Service Deep Dives */}
      {services.map((service, idx) => (
        <section
          key={service.name}
          className={`relative py-16 sm:py-24 ${idx % 2 === 0 ? "bg-navy" : "bg-navy-deep"}`}
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <div className={`grid gap-8 sm:gap-12 lg:gap-20 items-start ${idx % 2 === 0 ? "lg:grid-cols-[1fr_380px]" : "lg:grid-cols-[380px_1fr]"}`}>
              {/* Content */}
              <div className={idx % 2 !== 0 ? "lg:order-2" : ""}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
                    <service.icon className="w-6 h-6 text-brand-blue" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                    {service.name}
                  </h2>
                </div>

                <div className="mb-6">
                  <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-red-400 mb-2">The Problem</h3>
                  <p className="text-slate-400 leading-relaxed">{service.problem}</p>
                </div>

                <div className="mb-6">
                  <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-brand-blue mb-2">Our Solution</h3>
                  <p className="text-slate-400 leading-relaxed">{service.solution}</p>
                </div>

                <Link
                  to={service.href}
                  className="inline-flex items-center gap-2 font-semibold text-brand-blue hover:text-brand-blue-bright transition-colors"
                >
                  Explore {service.name}
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>

              {/* Feature card */}
              <div className={idx % 2 !== 0 ? "lg:order-1" : ""}>
                <Card variant="glass" hover={false} className="p-6">
                  <h3 className="font-display text-lg font-semibold text-white mb-4">
                    Key Capabilities
                  </h3>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckIcon className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={`rounded-lg border p-4 ${service.outcomeBg}`}>
                    <p className="text-sm font-medium text-white">{service.outcome}</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Why One Provider */}
      <section className="relative py-16 bg-navy sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="The Advantage"
            title="Why One Provider Changes Everything"
            centered
          />
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {whyOneProvider.map((item) => (
              <Card key={item.title} className="p-6">
                <h3 className="font-display text-lg font-semibold text-brand-blue mb-3">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Stop Juggling Vendors. Start Moving Forward."
        description="Get a unified IT assessment that identifies gaps between your current vendors and shows how consolidation strengthens security while reducing cost."
        primaryButton={{ text: "Request Assessment", action: "modal" }}
        secondaryButton={{ text: "View Cybersecurity", href: "/cybersecurity" }}
      />
    </>
  );
}
