import { Helmet } from "react-helmet-async";
import PageHero from "@/components/sections/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import ProcessFlow from "@/components/ui/ProcessFlow";
import { CTASection } from "@/components/sections/CTASection";
import {
  CloudIcon,
  CheckIcon,
  AlertIcon,
  ShieldIcon,
  ServerIcon,
  BarChartIcon,
  DatabaseIcon,
  GlobeIcon,
} from "@/components/icons";

const failureReasons = [
  { title: "No Migration Plan", description: "Lift-and-shift without rearchitecting creates performance issues and unexpected costs in the first 90 days." },
  { title: "Wrong Cloud Model", description: "Choosing IaaS when PaaS fits, or SaaS when customization is needed — wrong model means wrong economics." },
  { title: "Vendor Lock-In", description: "Building on proprietary services without abstraction layers makes switching providers a six-figure project." },
  { title: "Hidden Costs", description: "Data egress, premium support tiers, reserved instance waste, and idle resources silently inflate monthly bills." },
  { title: "Security Gaps", description: "Default cloud configurations are not secure. Misconfigurations cause 65% of cloud security incidents." },
  { title: "No Post-Migration Strategy", description: "Going live is day one, not the finish line. Without ongoing optimization, costs drift upward by 20-30% annually." },
];

const cloudModels = [
  {
    badge: "IaaS",
    badgeColor: "bg-brand-blue/10 text-brand-blue border-brand-blue/30",
    title: "Infrastructure as a Service",
    description:
      "Rent compute, storage, and networking on demand instead of buying hardware. You manage the OS, middleware, and applications. The provider manages everything below that. Best for workloads that need custom configurations, legacy applications that can't be refactored, or development environments that scale up and down.",
    features: [
      "Virtual machines, storage, and networking on demand",
      "Full control over OS and application stack",
      "Pay-per-use with reserved instance options",
      "Hybrid connectivity with on-premise infrastructure",
    ],
    useCases: "Dev/test environments, legacy app hosting, burst capacity, disaster recovery",
  },
  {
    badge: "PaaS",
    badgeColor: "bg-brand-cyan/10 text-brand-cyan border-brand-cyan/30",
    title: "Platform as a Service",
    description:
      "A managed platform for building and deploying applications without managing underlying infrastructure. The provider handles OS patches, scaling, load balancing, and database management. Your developers focus on code. Best for organizations building custom applications or modernizing legacy software.",
    features: [
      "Managed databases, containers, and serverless functions",
      "Auto-scaling and load balancing built in",
      "CI/CD pipeline integration",
      "Reduced operational overhead for development teams",
    ],
    useCases: "Custom web apps, API backends, microservices, data analytics pipelines",
  },
  {
    badge: "SaaS",
    badgeColor: "bg-brand-purple/10 text-brand-purple border-brand-purple/30",
    title: "Software as a Service",
    description:
      "Complete applications delivered over the internet. No installation, no patching, no infrastructure management. The provider handles everything — you configure and use. Best for standard business functions: email, CRM, collaboration, accounting, and HR.",
    features: [
      "Ready-to-use applications with web access",
      "Automatic updates and security patches",
      "Subscription-based pricing (no CapEx)",
      "Integration APIs for connecting to other systems",
    ],
    useCases: "Email & collaboration, CRM, ERP, HR systems, project management",
  },
];

const capabilities = [
  { icon: GlobeIcon, title: "Multi-Cloud Management", description: "AWS, Azure, GCP — managed through a single layer. We prevent vendor lock-in while leveraging each platform's strengths." },
  { icon: DatabaseIcon, title: "Disaster Recovery", description: "Cross-region replication, automated failover, and tested recovery procedures. RTO/RPO targets defined and validated quarterly." },
  { icon: ShieldIcon, title: "Cloud Security", description: "CSPM, workload protection, identity management, and encryption. We secure cloud environments to the same standard as on-premise." },
  { icon: BarChartIcon, title: "FinOps & Cost Optimization", description: "Reserved instance management, right-sizing, spot instance strategy, and monthly cost reporting with recommendations." },
  { icon: ServerIcon, title: "Hybrid Architecture", description: "Seamless connectivity between on-premise and cloud. VPN, Direct Connect, ExpressRoute — configured for performance and redundancy." },
  { icon: CheckIcon, title: "Compliance", description: "Cloud configurations mapped to NESA, ISO 27001, PCI-DSS, and regional requirements. Audit-ready documentation included." },
];

const migrationSteps = [
  { number: 1, title: "Audit", description: "Inventory every workload, dependency, and integration. Map current costs, performance baselines, and compliance requirements." },
  { number: 2, title: "Plan", description: "Select the right cloud model for each workload. Design the architecture, networking, security controls, and migration sequence." },
  { number: 3, title: "Migrate", description: "Execute the migration in phased waves. Test at each stage. Zero-downtime cutover for production workloads." },
  { number: 4, title: "Optimize", description: "Right-size resources, implement auto-scaling, and configure cost alerts. Eliminate waste from day one." },
  { number: 5, title: "Manage", description: "Ongoing monitoring, patching, security, and cost optimization. Monthly reviews with your team." },
];

export default function CloudSolutionsPage() {
  return (
    <>
      <Helmet>
        <title>Cloud Solutions — Migration, IaaS, PaaS, SaaS | ArtiflexIT</title>
        <meta name="description" content="ArtiflexIT plans, executes, and optimizes cloud environments across AWS, Azure, and private cloud. Secure migration, multi-cloud architecture, FinOps, and disaster recovery for UAE businesses." />
      </Helmet>

      <PageHero
        title={
          <>
            Cloud Migration{" "}
            <span className="gradient-text">Without the Chaos</span>
          </>
        }
        description="Most cloud projects fail because they start with technology instead of strategy. We plan first, migrate second, and optimize continuously — so your cloud investment actually delivers on its promise."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Cloud Solutions", href: "/cloud-solutions" },
        ]}
      />

      {/* Why Cloud Projects Fail */}
      <section className="relative py-16 bg-navy-deep sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Reality Check"
            title="Why Cloud Projects Fail"
            description="60% of cloud migrations exceed their budget. 45% miss their timeline. These are the six patterns we see most often."
            centered
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {failureReasons.map((reason) => (
              <Card key={reason.title} className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <AlertIcon className="w-5 h-5 text-red-400" />
                  <h3 className="font-display text-base font-semibold text-white">{reason.title}</h3>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{reason.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cloud Models */}
      <section className="relative py-16 bg-navy sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Cloud Models"
            title="Choose the Right Foundation"
            description="Not every workload belongs in the same cloud model. We help you match each application to the model that delivers the best combination of control, cost, and scalability."
            centered
          />
          <div className="space-y-8 max-w-5xl mx-auto">
            {cloudModels.map((model, idx) => (
              <div
                key={model.badge}
                className={`grid gap-6 items-start sm:gap-8 ${idx % 2 !== 0 ? "lg:grid-cols-[1fr_380px]" : "lg:grid-cols-[380px_1fr]"}`}
              >
                <Card variant="glass" hover={false} className={`p-6 ${idx % 2 !== 0 ? "lg:order-2" : ""}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest ${model.badgeColor}`}>
                      {model.badge}
                    </span>
                    <CloudIcon className="w-5 h-5 text-slate-500" />
                  </div>
                  <ul className="space-y-2 mb-4">
                    {model.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckIcon className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-300">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-lg bg-white/5 p-3">
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Best For</p>
                    <p className="text-sm text-slate-300">{model.useCases}</p>
                  </div>
                </Card>

                <div className={idx % 2 !== 0 ? "lg:order-1" : ""}>
                  <h3 className="font-display text-2xl font-bold text-white mb-4">{model.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{model.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Migration Strategy */}
      <section className="relative py-16 bg-navy-deep sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Migration"
            title="Our Five-Phase Migration Strategy"
            centered
          />
          <ProcessFlow steps={migrationSteps} />
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="relative py-16 bg-navy sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Capabilities"
            title="What We Deliver"
            centered
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {capabilities.map((cap) => (
              <Card key={cap.title} variant="service" className="p-6">
                <cap.icon className="w-8 h-8 text-brand-blue mb-4" />
                <h3 className="font-display text-lg font-semibold text-white mb-2">{cap.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{cap.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="relative py-16 bg-navy-deep sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              label="Case Study"
              title="From On-Premise to Hybrid Cloud"
              centered
            />
            <Card variant="glass" hover={false} className="p-8">
              <span className="inline-flex rounded-full bg-brand-blue/10 border border-brand-blue/30 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-blue mb-4">
                Logistics — GCC Region
              </span>
              <p className="text-slate-400 leading-relaxed mb-6">
                A logistics company with 12 offices across the GCC was running aging on-premise infrastructure with rising maintenance costs and limited disaster recovery capability. Their IT team spent more time keeping servers running than supporting business growth.
              </p>
              <p className="text-slate-400 leading-relaxed mb-6">
                We designed a hybrid cloud architecture — mission-critical workloads on private cloud with burst capacity on AWS. The migration was completed in 14 weeks with zero unplanned downtime.
              </p>
              <div className="grid grid-cols-3 gap-3 rounded-lg bg-white/5 p-3 sm:gap-4 sm:p-4">
                <div className="text-center">
                  <span className="font-display text-lg font-bold text-brand-blue sm:text-2xl">42%</span>
                  <p className="text-xs text-slate-400 mt-1">Cost Reduction</p>
                </div>
                <div className="text-center">
                  <span className="font-display text-lg font-bold text-brand-cyan sm:text-2xl">99.97%</span>
                  <p className="text-xs text-slate-400 mt-1">Uptime Achieved</p>
                </div>
                <div className="text-center">
                  <span className="font-display text-lg font-bold text-brand-purple sm:text-2xl">14 wks</span>
                  <p className="text-xs text-slate-400 mt-1">Full Migration</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <CTASection
        title="Stop Paying for Infrastructure You Don't Use"
        description="Get a cloud readiness assessment that maps your workloads, estimates costs, and recommends the right migration strategy — no commitment required."
        primaryButton={{ text: "Request Cloud Assessment", action: "modal" }}
        secondaryButton={{ text: "View All Services", href: "/services" }}
      />
    </>
  );
}
