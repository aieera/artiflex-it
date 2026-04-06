import { Helmet } from "react-helmet-async";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import StatsBar from "@/components/ui/StatsBar";
import ProcessFlow from "@/components/ui/ProcessFlow";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { ServerIcon, WifiIcon, DatabaseIcon, MonitorIcon, CheckIcon } from "@/components/icons";

const coreServices = [
  { icon: ServerIcon, title: "Network Design & Architecture", description: "We design networks from the ground up — core switching, distribution layers, access layers, and WAN connectivity. Every design includes redundancy paths, traffic prioritization, and capacity headroom for three years of projected growth.", features: ["Structured cabling (Cat6A, fiber optic)", "Core/distribution/access layer design", "SD-WAN deployment for multi-site", "Traffic shaping & QoS policies", "Network documentation & runbooks"], outcome: "Eliminate single points of failure and reduce network-related incidents by 80%." },
  { icon: DatabaseIcon, title: "Servers & Storage", description: "On-premise, hybrid, or cloud-connected — we size, deploy, and configure server and storage infrastructure for your current workloads and future growth. Every deployment includes monitoring, alerting, and backup integration from day one.", features: ["Rack & blade server deployment", "SAN/NAS storage architecture", "Hybrid cloud connectivity", "Backup & replication configuration", "Performance baseline & monitoring"], outcome: "Right-sized infrastructure that delivers performance without overspending on idle capacity." },
  { icon: MonitorIcon, title: "Virtualization", description: "VMware, Hyper-V, or open-source — we consolidate physical servers into virtual environments that reduce hardware costs, simplify management, and enable rapid provisioning. Every environment includes HA clustering and tested failover procedures.", features: ["VMware vSphere / Microsoft Hyper-V", "Virtual desktop infrastructure (VDI)", "High availability clustering", "Resource management & optimization", "Disaster recovery replication"], outcome: "Reduce physical server count by 70% while improving application availability." },
  { icon: WifiIcon, title: "Wireless Systems", description: "Enterprise wireless isn't consumer WiFi with more access points. We design wireless networks using heat mapping, site surveys, and interference analysis to deliver consistent coverage with security built in — not bolted on.", features: ["Site survey & RF heat mapping", "Controller-based or cloud-managed APs", "BYOD & guest network segmentation", "802.1X authentication integration", "Rogue AP detection & containment"], outcome: "Full coverage, zero dead zones, and complete isolation between corporate and guest traffic." },
];

const infraStats = [
  { value: 99.97, suffix: "%", label: "Uptime Maintained" },
  { value: 5600, suffix: "", label: "Cost Per Minute of Downtime ($)" },
  { value: 73, suffix: "%", label: "Downtime Caused by Aging Infra" },
  { value: 80, suffix: "%", label: "Fewer Network Incidents" },
];

const processSteps = [
  { number: 1, title: "Assess", description: "Audit existing infrastructure, document capacity and performance, and identify risks. Map business requirements to technical specifications." },
  { number: 2, title: "Design", description: "Create detailed architecture with redundancy, scalability, and security baked in. Review with your team before procurement." },
  { number: 3, title: "Build", description: "Procure, stage, configure, and deploy. Every component tested before going live. Phased cutover to minimize disruption." },
  { number: 4, title: "Support", description: "Ongoing monitoring, proactive maintenance, quarterly reviews, and capacity planning. We don't build and walk away." },
];

export default function InfrastructurePage() {
  return (
    <>
      <Helmet>
        <title>IT Infrastructure — Network, Servers, Virtualization | ArtiflexIT</title>
        <meta name="description" content="ArtiflexIT designs, deploys, and maintains enterprise IT infrastructure — network architecture, servers, storage, virtualization, and wireless systems for UAE businesses." />
      </Helmet>

      <PageHero title={<>Infrastructure That <span className="gradient-text">Keeps Pace With Your Growth</span></>} description="Your network, servers, and data systems are the foundation everything else runs on. When they fail, everything stops. We design infrastructure that doesn't fail." breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Infrastructure", href: "/infrastructure" }]} />

      <section className="relative py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader label="The Cost of Downtime" title="When Infrastructure Fails, Everything Stops" centered />
            <Card variant="glass" hover={false} className="p-5 sm:p-8">
              <p className="text-body leading-relaxed mb-4 text-left">The average cost of IT downtime is <span className="text-heading font-semibold">$5,600 per minute</span>. For a mid-market business, a four-hour outage can cost more than an entire year of proactive infrastructure management.</p>
              <p className="text-body leading-relaxed text-left">73% of unplanned downtime in the region is caused by aging infrastructure — equipment running past its lifecycle, firmware that hasn't been updated in years, and networks that were designed for half the current workload. This isn't bad luck. It's predictable failure from deferred investment.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader label="Core Services" title="Infrastructure That Works" description="Four pillars of IT infrastructure — each designed for performance, redundancy, and manageability." centered />
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 md:gap-8">
            {coreServices.map((service) => (
              <Card key={service.title} variant="service" className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10"><service.icon className="w-5 h-5 text-brand-blue" /></div>
                  <h3 className="font-display text-xl font-semibold text-heading">{service.title}</h3>
                </div>
                <p className="text-sm text-body leading-relaxed mb-4">{service.description}</p>
                <ul className="space-y-2 mb-4">
                  {service.features.map((f) => (<li key={f} className="flex items-start gap-2"><CheckIcon className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" /><span className="text-sm text-body">{f}</span></li>))}
                </ul>
                <div className="rounded-lg bg-brand-blue/10 border border-brand-blue/30 p-3"><p className="text-sm font-medium text-heading">{service.outcome}</p></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader label="By the Numbers" title="Why Infrastructure Investment Pays Off" centered />
          <StatsBar stats={infraStats} />
        </div>
      </section>

      <section className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader label="Our Approach" title="How We Build Infrastructure" centered />
          <ProcessFlow steps={processSteps} />
        </div>
      </section>

      <CTASection title="Build Infrastructure That Doesn't Keep You Up at Night" description="Get an infrastructure assessment that identifies aging equipment, capacity constraints, and single points of failure — with a prioritized upgrade roadmap." primaryButton={{ text: "Discuss Your Requirements", action: "modal" }} />
    </>
  );
}
