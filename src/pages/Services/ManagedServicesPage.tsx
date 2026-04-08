import { Helmet } from "react-helmet-async";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import StatsBar from "@/components/ui/StatsBar";
import ProcessFlow from "@/components/ui/ProcessFlow";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { GearIcon, MonitorIcon, ShieldIcon, ClockIcon, CheckIcon, AlertIcon } from "@/components/icons";

const services = [
  { icon: GearIcon, title: "Annual Maintenance Contracts", description: "Scheduled preventive maintenance, hardware health monitoring, firmware updates, and priority support. AMC contracts cover your entire infrastructure — from network switches to server hardware — with guaranteed response times and quarterly health reports." },
  { icon: MonitorIcon, title: "24/7 Infrastructure Monitoring", description: "We monitor every critical component in your environment — servers, network devices, applications, and security tools. Our NOC team triages alerts around the clock and resolves issues before users notice. Threshold-based alerting catches problems at warning level, not failure level." },
  { icon: AlertIcon, title: "Patch Management", description: "Missing patches are the single most exploited vulnerability vector. We test, schedule, and deploy patches across your operating systems, applications, and firmware on a weekly cadence — with rollback procedures for every update." },
  { icon: ShieldIcon, title: "Incident Response", description: "When something breaks, response time determines business impact. Our L1/L2/L3 escalation model ensures the right engineer engages within minutes. Every incident gets a root cause analysis — not just a fix, but a plan to prevent recurrence." },
  { icon: ClockIcon, title: "Security Operations", description: "Managed security layered into your IT operations. We handle firewall rule management, endpoint policy updates, access reviews, vulnerability scanning, and compliance reporting as part of the managed service — not as an add-on." },
];

const tiers = [
  { name: "Essential", description: "For small teams that need reliable IT support without complexity.", price: "From AED 3,500/mo", features: [{ name: "Business hours help desk (8AM-6PM)", included: true }, { name: "Monthly preventive maintenance", included: true }, { name: "Quarterly patch cycles", included: true }, { name: "Email & phone support", included: true }, { name: "24/7 monitoring", included: false }, { name: "Incident response SLA", included: false }, { name: "Security operations", included: false }, { name: "Dedicated account manager", included: false }], featured: false },
  { name: "Professional", description: "For growing businesses that need proactive management and guaranteed uptime.", price: "From AED 8,500/mo", features: [{ name: "24/7 help desk support", included: true }, { name: "Weekly preventive maintenance", included: true }, { name: "Weekly patch cycles", included: true }, { name: "All communication channels", included: true }, { name: "24/7 monitoring & alerting", included: true }, { name: "4-hour incident response SLA", included: true }, { name: "Basic security operations", included: true }, { name: "Dedicated account manager", included: false }], featured: true },
  { name: "Enterprise", description: "For organizations that need full IT operations outsourcing with security built in.", price: "Custom", features: [{ name: "24/7 priority help desk", included: true }, { name: "Continuous maintenance", included: true }, { name: "Daily patch cycles", included: true }, { name: "All channels + on-site", included: true }, { name: "24/7 monitoring with auto-remediation", included: true }, { name: "1-hour incident response SLA", included: true }, { name: "Full security operations", included: true }, { name: "Dedicated account manager", included: true }], featured: false },
];

const managedStats = [
  { value: 99.97, suffix: "%", label: "Uptime Maintained" },
  { value: 12, suffix: "min", label: "Avg Response Time" },
  { value: 60, suffix: "%", label: "Less IT Overhead" },
  { value: 24, suffix: "/7", label: "Monitoring" },
];

const processSteps = [
  { number: 1, title: "Assess", description: "Audit your current environment, document every asset, and identify gaps in monitoring, maintenance, and security." },
  { number: 2, title: "Onboard", description: "Deploy monitoring agents, configure alerting, integrate with your ticketing system, and establish communication protocols." },
  { number: 3, title: "Manage", description: "24/7 operations kick in. Monitoring, patching, help desk, incident response — all under your SLA." },
  { number: 4, title: "Optimize", description: "Monthly reviews, quarterly strategy sessions, and continuous improvement recommendations based on operational data." },
];

export default function ManagedServicesPage() {
  return (
    <>
      <Helmet>
        <title>Managed IT Services — AMC, Monitoring, Help Desk | ArtiflexIT</title>
        <meta name="description" content="ArtiflexIT managed IT services deliver 24/7 monitoring, incident response, patch management, and help desk support with guaranteed SLAs. Reduce IT overhead by 60%." />
      </Helmet>

      <PageHero title={<>Your IT Department, <span className="gradient-text">Without the Overhead</span></>} description="Qualified IT engineers in the UAE cost AED 25,000+ per month. Our managed services give you an entire operations team — monitoring, maintenance, help desk, and security — for a fraction of that." breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Managed Services", href: "/managed-services" }]} />

      <section className="relative py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <SectionHeader label="The Problem" title={<>Your IT Team Is Buried in <span className="gradient-text">Maintenance</span></>} centered />
            <Card variant="glass" hover={false} className="p-6 sm:p-8">
              <p className="text-body leading-relaxed mb-4 text-left">IT teams spend <span className="text-heading font-semibold">60% of their time on maintenance tasks</span> — patching, rebooting, chasing alerts, and fielding help desk tickets. That leaves 40% for the projects that actually move the business forward.</p>
              <p className="text-body leading-relaxed text-left">Hiring solves the headcount problem but not the cost problem. A single qualified network engineer costs AED 25,000–35,000 per month. After visa, insurance, training, and turnover costs, you're investing AED 400,000+ annually per engineer — and you still need multiple specializations.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader label="What We Manage" title={<><span className="gradient-text">Five Pillars </span>of Managed IT</>} centered />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.title} variant="service" className="p-6">
                <service.icon className="w-8 h-8 text-brand-blue mb-4" />
                <h3 className="font-display text-lg font-semibold text-heading mb-3">{service.title}</h3>
                <p className="text-sm text-body leading-relaxed">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader label="Performance" title={<>What Our  <span className="gradient-text">Managed Clients </span> Experience</>} centered />
          <StatsBar stats={managedStats} />
        </div>
      </section>

      <CTASection title="Stop Firefighting. Start Optimizing." description="Get a managed services assessment that quantifies your current IT overhead and shows exactly how much you'd save with proactive management." primaryButton={{ text: "Discuss Your Requirements", action: "modal" }} />
    </>
  );
}
