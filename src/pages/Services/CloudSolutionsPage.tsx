import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import {
  CloudIcon,
  CheckIcon,
  AlertIcon,
  ShieldIcon,
  ServerIcon,
  DatabaseIcon,
  GlobeIcon,
  LayersIcon,
  GearIcon,
  EyeIcon,
  ActivityIcon,
  TargetIcon,
  LockIcon,
  FileTextIcon,
  UsersIcon,
  ArrowRightIcon,
} from "@/components/icons";

/* ───────── BRAND GRADIENT HELPERS (used for vendor + why-us cards) ───────── */

const gradientStops: ReadonlyArray<readonly [number, number, number]> = [
  [4, 16, 30],
  [10, 61, 107],
  [27, 138, 199],
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

/* ───────── HYPERSCALERS (Public Cloud sub-cards) ───────── */

type Hyperscaler = {
  short: string;
  name: string;
  why: string;
  services: string;
  bestFit: string;
};

const hyperscalers: Hyperscaler[] = [
  {
    short: "AWS",
    name: "Amazon Web Services",
    why: "Widest service catalogue and the largest market share at roughly 29% of the global cloud infrastructure market. If a particular cloud capability exists anywhere, it almost certainly exists on AWS first.",
    services: "EC2, S3, RDS, EKS, Lambda, VPC, CloudFront, IAM, GuardDuty, AWS Backup, Direct Connect, Outposts.",
    bestFit:
      "Cloud-native applications, SaaS and fintech startups, e-commerce, AI/ML workloads, and customers who value service breadth over ecosystem alignment.",
  },
  {
    short: "Azure",
    name: "Microsoft Azure",
    why: "Strongest fit for Microsoft estates: Active Directory, Office 365, Windows Server, SQL Server, .NET. Azure Hybrid Benefit lets you bring Software Assurance licences from on-premises and cut compute costs by 40 to 70%.",
    services:
      "Azure VMs, Azure SQL, AKS, App Service, Functions, Entra ID, Sentinel, Azure Backup, ExpressRoute, Azure Arc, Azure Site Recovery.",
    bestFit:
      "Enterprises standardised on Microsoft, regulated industries with NESA / ISO 27001 / PCI-DSS requirements, and hybrid setups extending on-premises Active Directory into cloud.",
  },
  {
    short: "GCP",
    name: "Google Cloud Platform",
    why: "Strongest position in AI, machine learning, data analytics, and Kubernetes. Google invented Kubernetes; GKE is the most mature managed Kubernetes platform. BigQuery is the leading managed analytics warehouse.",
    services:
      "Compute Engine, Cloud Storage, Cloud SQL, GKE, Cloud Run, Vertex AI, BigQuery, Cloud IAM, Cloud Armor, Cloud Interconnect.",
    bestFit:
      "Data-driven businesses, AI-native startups, Kubernetes-first architectures, and analytics-heavy workloads.",
  },
];

const publicCloudIncluded = [
  "Workload assessment and provider selection",
  "Landing zone design: accounts, subscriptions, projects, identity, networking, guardrails",
  "IaaS, PaaS, container, and serverless deployment patterns",
  "Reserved Instance, Savings Plan, and Committed Use Discount management",
  "Native cloud security baselines: IAM hardening, encryption with customer-managed keys, CSPM",
  "24/7 monitoring, patching, and operations",
  "Monthly cost reviews with right-sizing and waste recovery",
];

const publicCloudBestFor =
  "Organisations moving net-new applications to cloud, organisations consolidating multiple environments, and customers who want a single partner managing across multiple hyperscalers.";

/* ───────── 6 CLOUD SERVICES (3×2 grid) ───────── */

type CloudService = {
  icon: React.FC<{ className?: string }>;
  title: string;
  lead: string;
  included: string[];
  bestFor: string;
  note?: string;
  href: string;
};

const cloudServices: CloudService[] = [
  {
    icon: ServerIcon,
    title: "Private Cloud Deployment",
    lead: "On-premises virtualised infrastructure that delivers cloud-style economics, automation, and self-service, without recurring egress charges or sovereignty concerns. The right answer for highly regulated workloads, predictable high-utilisation systems, and organisations that want owned hardware operated like a cloud.",
    included: [
      "Hyperconverged infrastructure (HCI) and software-defined storage design",
      "Platform selection: VMware vSphere, Microsoft Hyper-V, Nutanix, or Proxmox",
      "Software-defined networking (NSX, Hyper-V virtual switching)",
      "Self-service portals and automation (Terraform, Ansible, vRealize)",
      "Integration with on-premises identity (Active Directory) and security stack",
      "Capacity planning, lifecycle management, and refresh advisory",
      "Optional extension into hybrid cloud when workloads need to burst",
    ],
    bestFor:
      "Regulated industries with data residency mandates, organisations with stable high-utilisation workloads where owned hardware is genuinely cheaper, and customers preparing the on-premises foundation of a hybrid architecture.",
    href: "/cloud-solutions/private-cloud",
  },
  {
    icon: LayersIcon,
    title: "Hybrid Cloud Solutions",
    lead: "Connect on-premises infrastructure with one or more public clouds into a single managed environment. The most pragmatic architecture for most regional businesses: keep what should stay private private, run what should be elastic in cloud, and operate both as one.",
    included: [
      "Workload placement strategy: what stays, what moves, what runs in both",
      "Network connectivity: site-to-site VPN for entry-level, ExpressRoute / Direct Connect / Cloud Interconnect / FastConnect for production",
      "Identity unification: Active Directory or Entra ID spanning both environments with no duplicate credentials",
      "Async block-level replication of virtual servers (Veeam, Nakivo, Zerto, Azure Site Recovery)",
      "Application-aware quiescing for databases and mail servers",
      "Single-pane management with Azure Arc or third-party CMP tooling",
      "Recovery objectives defined per workload (typically 15-min / 1-hour for tier-1)",
    ],
    bestFor:
      "Mid-sized businesses (50 to 500 users) with mixed workload profiles, organisations moving away from physical DR sites, and customers who want cloud agility without abandoning on-premises investment.",
    note: "Reference architecture available: our standard hybrid blueprint covers a 5-server setup (domain controller, file server, SQL database, application server, web/mail) replicated to a primary cloud for DR with an immutable copy in a second cloud.",
    href: "/cloud-solutions/hybrid-cloud",
  },
  {
    icon: GearIcon,
    title: "Cloud Migration Services",
    lead: "Lift, refactor, or rebuild: we map every workload to the right migration pattern and execute the migration in phased waves with zero unplanned downtime. Most of our migrations come in on time, on budget, and reveal 15 to 30% of waste in the assessment phase alone.",
    included: [
      "Workload classification and dependency mapping",
      "Total cost modeling: current state vs target state, CapEx vs OpEx",
      "Migration pattern selection per workload: rehost, replatform, refactor, rebuild, or retire",
      "Wave planning and scheduling, lowest-risk workloads first",
      "Database migration: homogeneous and heterogeneous (Oracle, SQL Server, MySQL, PostgreSQL)",
      "Network and identity cutover",
      "Application and user acceptance testing",
      "Cutover orchestration with replication-based zero-downtime switchover where possible",
      "Post-migration optimisation and run-rate cost validation",
    ],
    bestFor:
      "Organisations with aging on-premises infrastructure approaching refresh, customers consolidating multiple datacenters, and businesses migrating from one cloud to another (Oracle to AWS, AWS to Azure, etc.).",
    href: "/cloud-solutions/cloud-migration",
  },
  {
    icon: DatabaseIcon,
    title: "Backup-as-a-Service (BaaS)",
    lead: "Fully managed backup for on-premises servers, virtual machines, SaaS data (Microsoft 365, Google Workspace), and cloud workloads. Subscription-based pricing, ransomware-resilient by design, recovery testing as a contractual deliverable.",
    included: [
      "Backup of on-premises servers, VMware / Hyper-V VMs, cloud VMs, file shares, and databases",
      "Microsoft 365 backup (Exchange, SharePoint, OneDrive, Teams)",
      "Google Workspace backup (Gmail, Drive, Calendar)",
      "Daily incremental, weekly full backup schedules",
      "Immutable storage with WORM (S3 Object Lock, Azure Blob immutable, Wasabi, Backblaze B2)",
      "AES-256 encryption in transit and at rest, customer-managed keys available",
      "30 / 90 / 365-day retention policies, configurable per workload",
      "Quarterly recovery testing with documented results",
      "Single management portal across all backup sources",
    ],
    bestFor:
      "Businesses that don't want to run their own backup infrastructure, organisations replacing aging tape or appliance-based backup, and customers needing Microsoft 365 / Google Workspace data protection (which the SaaS providers do not provide by default).",
    href: "/cloud-solutions/backup-as-a-service",
  },
  {
    icon: ShieldIcon,
    title: "Disaster Recovery-as-a-Service (DRaaS)",
    lead: "Cloud-based disaster recovery for production workloads: replicate continuously to a secondary site, fail over in minutes, fail back when ready. No second datacenter required, no parallel hardware investment, no weeks-long recovery from tape.",
    included: [
      "Per-workload RPO and RTO targets, typically 15-min / 1-hour for tier-1, 1-hour / 4-hour for tier-2",
      "Continuous async block-level replication using Zerto, Veeam, or Azure Site Recovery",
      "Pilot light, warm standby, or active-active patterns based on RTO requirements",
      "Orchestrated failover with single-click execution from a management portal",
      "Automated network failover (DNS / IP redirection)",
      "Failback orchestration when primary site is restored",
      "Quarterly failover testing as a contractual deliverable, not a best-effort intention",
      "Complete runbook documentation included",
    ],
    bestFor:
      "Businesses that need real disaster recovery but cannot justify a second physical site, organisations with regulatory DR requirements (NESA, ISO 22301), and businesses moving away from tape-based or secondary-site DR.",
    href: "/cloud-solutions/disaster-recovery-solutions-dubai",
  },
];

/* ───────── BUYER'S GUIDE 3.1: Why projects fail ───────── */

const failureReasons = [
  {
    n: "01",
    title: "No Migration Plan",
    description:
      "Lift-and-shift without rearchitecting creates performance issues and unexpected costs in the first 90 days. We start with a workload classification matrix before a single byte gets migrated.",
  },
  {
    n: "02",
    title: "Wrong Cloud Model",
    description:
      "IaaS where PaaS would fit, or SaaS where customisation is needed, is the most expensive design error. We map each workload to the right model first.",
  },
  {
    n: "03",
    title: "Vendor Lock-In",
    description:
      "Building on proprietary services without abstraction makes switching providers a six-figure project later. We use open standards, containers, and infrastructure-as-code wherever practical.",
  },
  {
    n: "04",
    title: "Hidden Costs",
    description:
      "Egress, premium support, idle reservations, and forgotten test environments inflate bills 20 to 30% per year. Our FinOps practice surfaces and recovers every line item.",
  },
  {
    n: "05",
    title: "Security Gaps",
    description:
      "Default cloud configurations are not secure. Misconfigurations cause 65% of cloud security incidents. We harden every environment to on-premises standards from day one.",
  },
  {
    n: "06",
    title: "No Post-Migration Strategy",
    description:
      "Going live is day one, not the finish line. Most customers stay on a managed services agreement after migration, because operational discipline is what protects the investment.",
  },
];

/* ───────── BUYER'S GUIDE 3.2: Cloud fit indicators ───────── */

const cloudFitYes = [
  "You don't want to invest AED 150,000 to 400,000+ in physical servers, storage, racks, UPS, cooling, and licensing every refresh cycle.",
  "You don't want to keep dedicated IT engineers just to patch hypervisors, replace failed disks, and manage capacity.",
  "You don't want to refresh hardware every 5 to 7 years on a forced cycle.",
  "Your demand is variable, seasonal, or unpredictable, and on-prem forces you to over-provision.",
  "You operate across multiple offices or countries.",
  "You need a real disaster recovery capability you don't currently have.",
  "Your maintenance and support renewals are climbing year over year.",
];

const cloudFitStay = [
  "You have very stable, high-utilisation workloads where depreciated hardware is genuinely cheaper.",
  "You operate under strict data residency rules the regional cloud cannot satisfy.",
  "You depend on specialised hardware that is non-trivial to virtualise.",
  "You have very high egress patterns where data transfer charges would dominate.",
  "Your applications are extremely latency-sensitive to local equipment.",
];

/* ───────── BUYER'S GUIDE 3.3: Foundation models ───────── */

const cloudModels = [
  {
    badge: "IaaS",
    badgeColor: "bg-brand-blue/10 text-brand-blue border-brand-blue/30",
    title: "Infrastructure as a Service",
    description:
      "You manage the OS, middleware, and applications; the provider manages everything below. Familiar mental model from on-premises VMware or Hyper-V. Highest flexibility, highest operational burden.",
    bestFor: "Dev/test, legacy app hosting, custom OS configurations, DR targets, burst capacity.",
  },
  {
    badge: "PaaS",
    badgeColor: "bg-brand-cyan/10 text-brand-cyan border-brand-cyan/30",
    title: "Platform as a Service",
    description:
      "The provider handles OS patches, runtime versions, scaling, and database management. Your developers focus on code. Lowest operational overhead, at the cost of deeper coupling to provider services.",
    bestFor: "Custom web apps, API back-ends, microservices, data analytics pipelines.",
  },
  {
    badge: "SaaS",
    badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
    title: "Software as a Service",
    description:
      "Complete applications delivered over the internet. No installation, no patching. Subscription pricing eliminates CapEx entirely. Easiest cloud model to start with.",
    bestFor: "Email, collaboration, CRM, ERP, HR, accounting.",
  },
];

/* ───────── BUYER'S GUIDE 3.4: 3-2-1-1-0 backup rule ───────── */

const backupRules = [
  { num: "3", label: "copies", description: "of every dataset, including the original." },
  { num: "2", label: "different media", description: "or storage platforms." },
  { num: "1", label: "off-site copy", description: "providing geographic redundancy." },
  {
    num: "1",
    label: "immutable copy",
    description:
      "or air-gapped, so ransomware cannot encrypt or delete it.",
    highlight: true,
  },
  { num: "0", label: "errors", description: "verified through periodic recovery testing." },
];

/* ───────── METHODOLOGY (Section 4) ───────── */

type Phase = {
  number: string;
  title: string;
  duration: string;
  description: string;
};

const methodologyPhases: Phase[] = [
  {
    number: "01",
    title: "Audit",
    duration: "2 to 4 weeks",
    description:
      "Inventory every workload, dependency, and integration. Map current costs, performance baselines, compliance requirements, and licensing exposure. Output: a workload classification matrix and a baseline cost picture you can compare every future invoice against.",
  },
  {
    number: "02",
    title: "Plan",
    duration: "3 to 6 weeks",
    description:
      "Select the right cloud model (IaaS, PaaS, or SaaS) for each workload. Choose the provider mix. Design the architecture, networking topology, security controls, identity model, backup strategy, and migration sequence. Sign-off on the plan is what the rest of the project executes against.",
  },
  {
    number: "03",
    title: "Migrate",
    duration: "8 to 20 weeks",
    description:
      "Execute the migration in phased waves, starting with the lowest-risk workloads to validate the pattern, then production. Test at each stage. Zero-downtime cutover for production using replication and DNS-based traffic redirection.",
  },
  {
    number: "04",
    title: "Optimise",
    duration: "4 to 8 weeks",
    description:
      "Right-size resources based on real usage data from the first weeks running in cloud. Implement auto-scaling, configure cost alerts, buy reservations or savings plans against validated steady-state demand. Eliminate waste from day one, typically 15 to 25% of initial spend.",
  },
  {
    number: "05",
    title: "Manage",
    duration: "Ongoing",
    description:
      "24/7 monitoring, patching, security operations, and cost optimisation. Monthly cost reviews. Quarterly DR testing. Annual architecture reviews to capture new cloud capabilities. Most customers stay on a managed services agreement after migration.",
  },
];

/* ───────── WHY ARTIFLEX (Section 6) ───────── */

const whyUs = [
  {
    icon: ActivityIcon,
    title: "14 Years of Regional Experience",
    description:
      "We have been designing IT and security architectures for organisations across the GCC and South Asia since 2011. That experience is the difference between a textbook architecture and one that actually fits how regional businesses operate.",
  },
  {
    icon: TargetIcon,
    title: "Vendor-Agnostic by Design",
    description:
      "We hold partnerships and certifications across all major cloud platforms (Microsoft, AWS, Google, Oracle) and across the leading cybersecurity and backup vendors. We recommend the right answer for your workload, not the answer that pays the highest commission.",
  },
  {
    icon: UsersIcon,
    title: "End-to-End Accountability",
    description:
      "Most cloud problems span the firewall, the network, the cloud platform, the replication tool, and the backup tier. You should not be the one running the war room between four vendors. We own the outcome end-to-end.",
  },
  {
    icon: GlobeIcon,
    title: "Local Presence, Regional Reach",
    description:
      "Headquartered in Dubai with offices across four countries, we deliver projects with local engineers who understand local regulatory expectations and procurement realities. Arabic-speaking technical resources available where needed.",
  },
  {
    icon: LockIcon,
    title: "Security-First Architecture",
    description:
      "We come from a deep cybersecurity practice. Every cloud environment we deliver is hardened from day one: identity baseline, encryption, network segmentation, CSPM, and immutable backup are non-negotiable parts of our design pattern, not optional upgrades.",
  },
  {
    icon: EyeIcon,
    title: "Honest Recommendations",
    description:
      "We will tell you when cloud is not the right answer for a workload. We will tell you when the vendor with the best Gartner rating is not the best fit. The relationship is worth more than any single transaction.",
  },
];

/* ───────── HERO TOPICS (right-side pillar cards) ───────── */

const heroTopics = [
  {
    label: "Public Cloud",
    icon: CloudIcon,
    originHref: "/blog/origin-public-cloud",
    portfolioHref: "/cloud-solutions/public-cloud",
  },
  {
    label: "Private Cloud",
    icon: ServerIcon,
    originHref: "/blog/origin-private-cloud",
    portfolioHref: "/cloud-solutions/private-cloud",
  },
  {
    label: "Hybrid Cloud",
    icon: LayersIcon,
    originHref: "/blog/origin-hybrid-cloud",
    portfolioHref: "/cloud-solutions/hybrid-cloud",
  },
  {
    label: "Multi-Cloud Strategy",
    icon: GlobeIcon,
    originHref: "/blog/origin-multi-cloud-strategy",
    portfolioHref: "/cloud-solutions/multi-cloud-strategy",
  },
  {
    label: "Cloud Migration",
    icon: TargetIcon,
    originHref: "/blog/origin-cloud-migration",
    portfolioHref: "/cloud-solutions/cloud-migration",
  },
  {
    label: "Backup as a Service",
    icon: DatabaseIcon,
    originHref: "/blog/origin-backup-as-a-service",
    portfolioHref: "/cloud-solutions/backup-as-a-service",
  },
  {
    label: "Disaster Recovery",
    icon: ShieldIcon,
    originHref: "/blog/origin-disaster-recovery",
    portfolioHref: "/cloud-solutions/disaster-recovery-solutions-dubai",
  },
];

/* ───────── PAGE ───────── */

export default function CloudSolutionsPage() {
  const { openModal } = useContactModal();

  return (
    <>
      <>
        <title>Cloud Solutions UAE | AWS, Azure, GCP, Hybrid & Private Cloud | ArtiflexIT</title>
        <meta
          name="description"
          content="Vendor-neutral cloud migration, multi-cloud (AWS, Azure, GCP), private and hybrid cloud, BaaS, DRaaS, and FinOps for UAE businesses. Certified across all major hyperscalers, accountable end-to-end."
        />
        <meta
          name="keywords"
          content="cloud solutions UAE, cloud migration Dubai, AWS partner UAE, Azure partner UAE, Google Cloud UAE, hybrid cloud UAE, private cloud Dubai, DRaaS UAE, BaaS UAE, FinOps UAE, cloud cost optimization, multi-cloud GCC, Microsoft 365 backup, immutable backup UAE"
        />
        <link rel="canonical" href="https://artiflexit.com/cloud-solutions" />
        <meta property="og:title" content="Cloud Solutions UAE | AWS, Azure, GCP, Hybrid & Private Cloud | ArtiflexIT" />
        <meta property="og:description" content="Cloud migration, multi-cloud architecture, hybrid and private cloud, BaaS, DRaaS, and FinOps. Vendor-neutral, certified across all major hyperscalers." />
        <meta property="og:image" content="https://artiflexit.com/og/cloud-solutions.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://artiflexit.com/cloud-solutions" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cloud Solutions UAE | ArtiflexIT" />
        <meta name="twitter:description" content="Multi-cloud, hybrid, private, BaaS, DRaaS, and FinOps for UAE businesses." />
        <meta name="twitter:image" content="https://artiflexit.com/og/cloud-solutions.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Cloud Solutions",
          serviceType: "Cloud Migration & Management",
          provider: { "@type": "Organization", name: "Artiflex IT", url: "https://artiflexit.com" },
          areaServed: [
            { "@type": "Country", name: "United Arab Emirates" },
            { "@type": "Country", name: "Oman" },
            { "@type": "Country", name: "Saudi Arabia" },
          ],
          url: "https://artiflexit.com/cloud-solutions",
          description: "Vendor-neutral cloud migration, multi-cloud (AWS, Azure, GCP), private cloud, hybrid cloud, backup-as-a-service, disaster-recovery-as-a-service, and FinOps for UAE businesses.",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Cloud & Hybrid Infrastructure",
            itemListElement: [
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Public Cloud (AWS, Azure, GCP)" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Private Cloud Deployment" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hybrid Cloud Solutions" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cloud Migration Services" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Backup-as-a-Service (BaaS)" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Disaster Recovery-as-a-Service (DRaaS)" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cloud Cost Optimization (FinOps)" } },
            ],
          },
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://artiflexit.com/" },
            { "@type": "ListItem", position: 2, name: "Cloud Solutions", item: "https://artiflexit.com/cloud-solutions" },
          ],
        })}</script>
      </>

      {/* ═══════════════════════════════════════
          HERO: CLOUD MIGRATION WITHOUT THE CHAOS
          ═══════════════════════════════════════ */}
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-navy-deep via-navy to-navy-light">
        {/* Background image */}
        <div className="absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
          <img
            src="/cloud-solutions.jpg"
            alt=""
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover object-center opacity-55 [mask-image:radial-gradient(120%_90%_at_60%_45%,black_55%,transparent_100%)]"
          />
        </div>

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
                <span className="font-medium text-[#28B5E1]">Cloud Solutions</span>
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
                Cloud Solutions
              </p>

              <div className="mt-6 sm:mt-8 lg:mt-8 xl:mt-10">
                <h1 className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight text-white sm:mt-3 sm:text-2xl md:text-3xl lg:text-[1.6rem] xl:text-4xl">
                  <span className="gradient-text"> Cloud Migration Without the Chaos for the UAE & Middle East</span>
                </h1>

                <p className="mt-3 max-w-xl text-xs leading-relaxed text-slate-300 sm:mt-4 sm:text-sm md:text-base lg:text-sm xl:text-base">
                  60% of cloud projects exceed their budget. 45% miss their
                  timeline. We help you choose the right model, the right
                  provider, and the right partner, and stay accountable for the
                  result.
                </p>

                <div className="mt-5 flex flex-col items-stretch gap-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 lg:gap-3 xl:gap-4">
                  <button
                    onClick={openModal}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-6 sm:py-3 lg:text-sm xl:px-7 xl:py-3.5 xl:text-base"
                  >
                    Get a Free Cloud Readiness Assessment
                    <ArrowRightIcon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  <Link
                    to="/blog/origin-public-cloud"
                    className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 hover:text-[#28B5E1] sm:px-6 sm:py-3 lg:text-sm xl:px-7 xl:py-3.5 xl:text-base"
                  >
                    Read the Origin Story
                    <ArrowRightIcon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>

            <div className="px-2 sm:px-4">
              {(() => {
                const tileCls =
                  "group relative flex min-h-[42px] min-w-0 items-center gap-1.5 overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.035] px-1.5 py-1.5 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/55 hover:bg-gradient-to-br hover:from-[#045891]/40 hover:to-[#1B8AC7]/20 hover:shadow-[0_10px_24px_-8px_rgba(40,181,225,0.5)] sm:gap-2 sm:px-2 [&:nth-child(odd):last-child]:col-span-2";

                const originHiddenLabels = new Set([
                  "Cloud Migration",
                  "Cloud Cost Optimization (FinOps)",
                ]);

                const renderGrid = (variant: "origin" | "portfolio") => (
                  <div className="mt-2.5 grid grid-cols-2 gap-1.5 sm:gap-2">
                    {heroTopics
                      .filter((t) => variant !== "origin" || !originHiddenLabels.has(t.label))
                      .map((t) => {
                      const Icon = t.icon;
                      const href =
                        variant === "origin" ? t.originHref : t.portfolioHref;
                      return (
                        <Link
                          key={`${variant}-${t.label}`}
                          to={href}
                          className={tileCls}
                        >
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
                  <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 sm:gap-3.5">
                    {/* Cloud Portfolios */}
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
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -top-16 -right-12 h-40 w-40 rounded-full bg-[#28B5E1]/[0.09] blur-3xl"
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
                            The Origin Story
                            <span className="text-[#28B5E1]">.</span>
                          </h3>
                        </div>
                        <p className="mt-1 text-[10.5px] leading-relaxed text-slate-300/80">
                          Read the story behind each cloud capability.
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

      {/* SECTION 2, CLOUD & HYBRID INFRASTRUCTURE */}
      <section className="relative py-16 bg-white sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Our Services"
            title={<>Cloud & <span className="gradient-text">Hybrid Infrastructure</span></>}
            description="End-to-end services across the full cloud and hybrid stack: from public cloud deployment on the major hyperscalers, to on-premises private cloud, to managed backup and disaster recovery. One partner, one accountability line, one set of certifications across every major platform."
            centered
          />

          {/* Featured: Public Cloud Solutions (dark block with 3 hyperscaler sub-cards) */}
          <div
            className="relative overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-10 mb-12 sm:mb-16"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #04101E 0%, #072B4F 40%, #0A3D6B 75%, #1B8AC7 100%)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0) 60%)",
              }}
            />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-brand-cyan/25 blur-3xl" />

            <div className="relative">
              {/* Top: Featured pill + Title + Lead (full width) */}
              <div className="mb-8 sm:mb-10 max-w-4xl">
                <span className="inline-flex items-center rounded-full bg-white/10 ring-1 ring-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-cyan mb-4">
                  Featured Service
                </span>
                <h3 className="font-display text-2xl font-bold text-white sm:text-3xl lg:text-[2.25rem] lg:leading-[1.15] mb-4">
                  Public Cloud Solutions
                </h3>
                <p className="text-sm leading-relaxed text-slate-200 sm:text-base max-w-5xl">
                  Design, deploy, and operate workloads on AWS, Microsoft Azure, and Google Cloud, picking the right platform for each workload, not the one that pays the highest commission. We hold partnerships and certifications across all three hyperscalers and run multi-cloud environments as a daily practice.
                </p>
              </div>

              {/* Below: What's included (2-col bullets) on LEFT, Best For on RIGHT */}
              <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:gap-10 mb-10 sm:mb-12">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-cyan mb-4">
                    What's included
                  </p>
                  <ul className="columns-1 sm:columns-2 [column-gap:1.5rem]">
                    {publicCloudIncluded.map((item) => (
                      <li
                        key={item}
                        className="mb-2.5 flex items-start gap-2.5 break-inside-avoid last:mb-0"
                      >
                        <CheckIcon className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-200 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="self-start flex flex-col gap-3">
                  <div className="rounded-xl bg-white/[0.06] ring-1 ring-white/15 backdrop-blur-sm p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-cyan mb-2">
                      Best for
                    </p>
                    <p className="text-sm text-slate-200 leading-relaxed">{publicCloudBestFor}</p>
                  </div>

                  <Link
                    to="/cloud-solutions/public-cloud"
                    className="group/btn inline-flex items-center justify-center gap-2 rounded-lg border border-brand-cyan/40 bg-brand-cyan/10 px-4 py-2.5 text-xs font-semibold text-brand-cyan transition-all duration-300 hover:border-brand-cyan hover:bg-brand-cyan hover:text-[#04101E] hover:shadow-[0_8px_24px_-8px_rgba(40,181,225,0.55)]"
                  >
                    Learn more
                    <svg
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* 3 hyperscaler sub-cards */}
              <div className="grid gap-4 md:grid-cols-3">
                {hyperscalers.map((hs) => (
                  <div
                    key={hs.short}
                    className="group relative overflow-hidden rounded-2xl bg-white p-5 sm:p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.30)]"
                  >
                    {/* Top accent bar, visible by default, brightens on hover */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-blue to-brand-cyan opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="flex items-baseline gap-2 mb-4 pb-4 border-b border-border-light">
                      <span className="font-display text-2xl font-bold text-heading sm:text-3xl">
                        {hs.short}
                      </span>
                      <span className="text-xs text-muted">{hs.name}</span>
                    </div>

                    <div className="space-y-3.5 text-sm">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-blue mb-1">
                          Why customers choose
                        </p>
                        <p className="text-body leading-relaxed">{hs.why}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-blue mb-1">
                          What we deploy & manage
                        </p>
                        <p className="text-body leading-relaxed">{hs.services}</p>
                      </div>
                      <div className="rounded-lg bg-gradient-to-br from-brand-blue/[0.06] to-brand-cyan/[0.04] border border-brand-blue/10 p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-blue mb-1">
                          Best fit
                        </p>
                        <p className="text-xs text-body leading-relaxed">{hs.bestFit}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 6 cloud services, uniform cards, hover-to-expand */}
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-1 items-start">
            {cloudServices.map((service) => (
              <article
                key={service.title}
                className="group relative overflow-hidden rounded-2xl bg-white border border-border-light shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 hover:border-[#04101E] hover:shadow-[0_24px_60px_rgba(4,16,30,0.18)] flex flex-col"
              >
                {/* Decorative gradient corner */}
                <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br from-brand-blue/[0.10] to-brand-cyan/[0.06] blur-3xl opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Header: icon + title + lead */}
                <div className="relative px-6 pt-6 pb-5 sm:px-7 sm:pt-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue/12 to-brand-cyan/8 ring-1 ring-brand-blue/15 transition-transform duration-500 group-hover:scale-105">
                      <service.icon className="w-5 h-5 text-brand-blue" />
                    </div>
                    <h3 className="font-display text-base font-semibold text-heading leading-tight sm:text-lg lg:text-xl">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm text-body leading-relaxed">{service.lead}</p>
                </div>

                {/* Hairline divider, always visible */}
                <div className="mx-6 h-px bg-border-light sm:mx-7" />

                {/* Hover-expand wrapper: collapsed by default, expands on this card's hover */}
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <div className="grid gap-6 px-6 py-5 sm:grid-cols-[1.5fr_1fr] sm:gap-7 sm:px-7">
                      {/* Left: What's included (+note) */}
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-blue mb-3">
                          What's included
                        </p>
                        <ul className="space-y-1.5">
                          {service.included.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-xs leading-relaxed">
                              <CheckIcon className="w-3.5 h-3.5 text-brand-blue shrink-0 mt-0.5" />
                              <span className="text-body">{item}</span>
                            </li>
                          ))}
                        </ul>

                        {service.note && (
                          <div className="mt-4 rounded-md border-l-2 border-brand-cyan bg-brand-cyan/[0.05] py-2 px-3">
                            <p className="text-xs leading-relaxed text-body italic">{service.note}</p>
                          </div>
                        )}
                      </div>

                      {/* Right: Best for + Learn more, dark variant */}
                      <div className="self-start flex flex-col gap-3">
                        <div
                          className="relative overflow-hidden rounded-xl border border-white/10 p-4"
                          style={{
                            backgroundImage:
                              "linear-gradient(135deg, #04101E 0%, #0A3D6B 100%)",
                          }}
                        >
                          <div className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-brand-cyan/20 blur-2xl" />
                          <div className="relative">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                                <TargetIcon className="w-3.5 h-3.5 text-brand-cyan" />
                              </div>
                              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-cyan">
                                Best for
                              </p>
                            </div>
                            <p className="text-xs leading-relaxed text-slate-200">{service.bestFor}</p>
                          </div>
                        </div>

                        <Link
                          to={service.href}
                          className="group/btn inline-flex items-center justify-center gap-2 rounded-lg border border-brand-blue/30 bg-brand-blue/5 px-4 py-2.5 text-xs font-semibold text-brand-blue transition-all duration-300 hover:border-brand-blue hover:bg-brand-blue hover:text-white hover:shadow-[0_8px_24px_-8px_rgba(27,138,199,0.55)]"
                        >
                          Learn more
                          <svg
                            className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14M13 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Closing CTA, dark variant */}
          <div
            className="mt-12 sm:mt-16 mx-auto max-w-3xl relative overflow-hidden rounded-2xl border border-white/10 p-6 text-center shadow-[0_24px_60px_-20px_rgba(4,16,30,0.45)] sm:p-8"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #04101E 0%, #072B4F 50%, #0A3D6B 100%)",
            }}
          >
            {/* Glow blobs */}
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-brand-cyan/20 blur-3xl" />
            <div className="pointer-events-none absolute -top-16 -left-16 h-44 w-44 rounded-full bg-brand-blue/15 blur-3xl" />

            <div className="relative">
              <p className="text-sm leading-relaxed text-slate-200 sm:text-base">
                Not sure which service fits? Start with a free cloud readiness assessment. We'll map your current workloads, model the cost of each migration option, and recommend which services apply.
              </p>
              <button
                onClick={openModal}
                className="mt-5 inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,255,255,0.20)] sm:px-8 sm:py-3.5 sm:text-base cursor-pointer"
              >
                Get a Free Cloud Readiness Assessment
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3, BUYER'S GUIDE */}
      <section id="buyers-guide" className="relative py-16 bg-surface-secondary scroll-mt-20 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Buyer's Guide"
            title={<>Make the <span className="gradient-text">Right Cloud Decision</span></>}
            description="Before you buy any of the services above, answer four questions: are you actually a cloud fit, what model belongs where, what fails in cloud projects, and how do you protect data once it's there. The next four blocks address each one, briefly. The full guide goes deeper."
            centered
          />

          {/* 3.1 Why projects fail */}
          <div className="mb-16 sm:mb-20">
            <div className="mb-8 sm:mb-10 text-center">
              <h3 className="font-display text-xl font-bold text-heading sm:text-2xl">
                Why Most Cloud Projects Fail
              </h3>
              <p className="mt-2 text-sm text-body sm:text-base">
                Six failure patterns we design around in every engagement.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {failureReasons.map((reason) => (
                <div
                  key={reason.title}
                  className="group relative rounded-2xl bg-white border border-border-light p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-rose-300/50 hover:shadow-[0_8px_30px_rgba(244,63,94,0.08)]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-display text-xs font-bold tracking-wider text-rose-500/70">
                      {reason.n}
                    </span>
                    <AlertIcon className="w-4 h-4 text-rose-500" />
                    <h4 className="font-display text-base font-semibold text-heading">
                      {reason.title}
                    </h4>
                  </div>
                  <p className="text-sm text-body leading-relaxed">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3.2 Cloud fit */}
          <div className="mb-16 sm:mb-20">
            <div className="mb-8 sm:mb-10 text-center max-w-3xl mx-auto">
              <h3 className="font-display text-xl font-bold text-heading sm:text-2xl">
                Is Cloud the Right Fit for Your Business?
              </h3>
              <p className="mt-2 text-sm text-body sm:text-base">
                Cloud is not universally cheaper, faster, or safer than on-premises infrastructure. Use the indicators below to see where you sit.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-2 max-w-6xl mx-auto">
              {/* YES */}
              <div className="relative rounded-2xl bg-white border border-emerald-500/20 p-6 sm:p-7 shadow-[0_4px_20px_rgba(16,185,129,0.06)]">
                <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-emerald-400 to-emerald-600" />
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10">
                    <CheckIcon className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h4 className="font-display text-lg font-semibold text-heading">
                    Cloud is your right move if…
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {cloudFitYes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-sm text-body leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* STAY */}
              <div className="relative rounded-2xl bg-white border border-amber-500/20 p-6 sm:p-7 shadow-[0_4px_20px_rgba(245,158,11,0.06)]">
                <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-amber-400 to-amber-600" />
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10">
                    <ServerIcon className="w-4 h-4 text-amber-600" />
                  </div>
                  <h4 className="font-display text-lg font-semibold text-heading">
                    Stay (partly) on-premises if…
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {cloudFitStay.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                      <span className="text-sm text-body leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-body sm:text-base">
              Most regional businesses end up <span className="font-semibold text-heading">hybrid</span>. If indicators land on both sides, which is most of our customers, the hybrid service above is your end-state.
            </p>
          </div>

          {/* 3.3 Foundation models */}
          <div className="mb-16 sm:mb-20">
            <div className="mb-8 sm:mb-10 text-center max-w-3xl mx-auto">
              <h3 className="font-display text-xl font-bold text-heading sm:text-2xl">
                Choose the Right Foundation: IaaS, PaaS, or SaaS
              </h3>
              <p className="mt-2 text-sm text-body sm:text-base">
                Three models, three trade-offs between control and operational simplicity.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3 max-w-6xl mx-auto">
              {cloudModels.map((m) => (
                <Card key={m.badge} variant="default" className="p-6 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest ${m.badgeColor}`}>
                      {m.badge}
                    </span>
                    <CloudIcon className="w-5 h-5 text-muted" />
                  </div>
                  <h4 className="font-display text-lg font-semibold text-heading mb-3">{m.title}</h4>
                  <p className="text-sm text-body leading-relaxed mb-4">{m.description}</p>
                  <div className="mt-auto rounded-lg bg-brand-blue/[0.04] border border-brand-blue/10 p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-blue mb-1">
                      Best for
                    </p>
                    <p className="text-xs text-body leading-relaxed">{m.bestFor}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* 3.4 The 3-2-1-1-0 backup rule (dark callout) */}
          <div className="mb-12 sm:mb-16">
            <div
              className="relative overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-10"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #04101E 0%, #072B4F 45%, #0A3D6B 75%, #1B8AC7 100%)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 60%)",
                }}
              />
              <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-brand-cyan/20 blur-3xl" />

              <div className="relative">
                <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
                  <span className="inline-flex items-center rounded-full bg-white/10 ring-1 ring-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-cyan mb-4">
                    Ransomware Resilience
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                    The 3-2-1-1-0 Backup Rule
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-200 sm:text-base">
                    The cloud era's update to the traditional 3-2-1 rule. The new "1" is what determines whether a ransomware incident is a 48-hour recovery exercise or a 6-week existential crisis.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5 max-w-5xl mx-auto">
                  {backupRules.map((rule, i) => (
                    <div
                      key={i}
                      className={`relative rounded-2xl p-4 text-center backdrop-blur-sm ${
                        rule.highlight
                          ? "bg-brand-cyan/15 ring-2 ring-brand-cyan/50"
                          : "bg-white/[0.06] ring-1 ring-white/10"
                      }`}
                    >
                      <span className={`block font-display text-4xl font-bold sm:text-5xl ${
                        rule.highlight ? "text-brand-cyan" : "text-white"
                      }`}>
                        {rule.num}
                      </span>
                      <p className={`mt-2 font-display text-sm font-semibold ${
                        rule.highlight ? "text-brand-cyan" : "text-white"
                      }`}>
                        {rule.label}
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                        {rule.description}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-slate-200 sm:text-base">
                  The single most important control against ransomware is an <span className="font-semibold text-brand-cyan">immutable, off-account backup</span> held in a different cloud, under different credentials. Endpoint protection, EDR, MFA, and segmentation all matter, but immutable backup is what determines whether you recover or you don't.
                </p>
              </div>
            </div>
          </div>

          {/* 3.5 Closing CTA */}
          <div className="mx-auto max-w-3xl rounded-2xl border border-border-light bg-white p-6 text-center sm:p-8">
            <p className="text-sm leading-relaxed text-body sm:text-base">
              Want all of this in depth? The 18-page Cloud Buyer's Guide includes full provider comparison tables, pricing breakdowns, the 5-server hybrid reference architecture, and the licensing decision framework.
            </p>
            <button
              onClick={openModal}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-7 py-3 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(27,138,199,0.25)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(27,138,199,0.35)] hover:-translate-y-0.5 sm:px-8 sm:py-3.5 sm:text-base cursor-pointer"
            >
              <FileTextIcon className="w-4 h-4" />
              Request the Cloud Buyer's Guide
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 4, FIVE-PHASE METHODOLOGY */}
      <section className="relative py-16 bg-white sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Methodology"
            title={<>Five Phases. <span className="gradient-text">One Partner.</span> Predictable Outcomes.</>}
            description="Every cloud project we run follows the same methodology. The discipline is what separates the projects that come in on budget from the 60% that overshoot."
            centered
          />

          <div className="relative">
            {/* Connecting line on lg */}
            <div className="pointer-events-none absolute left-0 right-0 top-14 hidden h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent lg:block" />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 max-w-7xl mx-auto">
              {methodologyPhases.map((phase) => (
                <div
                  key={phase.number}
                  className="group relative flex flex-col rounded-2xl bg-white border border-border-light p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-[0_8px_30px_rgba(27,138,199,0.10)]"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#045891] to-[#1B8AC7] text-white shadow-sm">
                      <span className="font-display text-base font-bold">{phase.number}</span>
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-blue">
                      {phase.duration}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-heading mb-2 sm:text-lg">
                    {phase.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-body">{phase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5, CASE STUDY */}
      <section className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Case Study"
            title={<>From On-Premises to <span className="gradient-text">Hybrid Cloud</span>: Logistics, GCC Region</>}
            description="A 14-week migration from aging on-premises infrastructure to a hybrid cloud architecture. Zero unplanned downtime. 42% reduction in run-rate cost. 99.97% measured uptime in the year that followed."
            centered
          />

          <div className="grid gap-8 lg:grid-cols-[2.4fr_1fr] lg:gap-12 max-w-5xl mx-auto">
            <Card variant="default" hover={false} className="p-6 sm:p-8">
              <span className="inline-flex rounded-full bg-brand-blue/10 border border-brand-blue/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-blue mb-5">
                Logistics, GCC Region
              </span>
              <p className="text-body leading-relaxed mb-5">
                A regional logistics company with 12 offices across the GCC was running aging on-premises infrastructure with rising maintenance costs, no meaningful disaster recovery, and an IT team spending more time keeping servers running than supporting business growth. Their existing physical environment was approaching end-of-warranty, and the next refresh would have required a seven-figure capital investment with no business case beyond replacing what was there.
              </p>
              <p className="text-body leading-relaxed">
                We designed a hybrid cloud architecture: mission-critical operational workloads on private cloud for performance and sovereignty, with burst capacity, dev/test, analytics, and disaster recovery on AWS. Migration was executed in three phased waves over 14 weeks. The cutover happened on a Saturday night with a 90-minute maintenance window; users came back on Sunday morning to a faster system. Twelve months in, run-rate cost is down 42%, the IT team is materially smaller, and the freed engineers are working on automation projects that the business actually values.
              </p>
            </Card>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:grid-rows-3">
              {[
                { value: "42%", label: "Cost Reduction" },
                { value: "99.97%", label: "Measured Uptime" },
                { value: "14 wks", label: "Full Migration" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="relative overflow-hidden flex flex-col items-center justify-center rounded-2xl border border-white/10 p-5 text-center shadow-[0_8px_30px_-10px_rgba(4,16,30,0.40)] sm:p-6"
                  style={{ backgroundImage: getCardGradient(i, 3) }}
                >
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0) 60%)",
                    }}
                  />
                  <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-brand-cyan/20 blur-3xl" />
                  <div className="relative">
                    <span className="block font-display text-3xl font-bold text-white sm:text-4xl">
                      {stat.value}
                    </span>
                    <p className="mt-2 text-xs font-medium text-slate-200 sm:text-sm">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6, WHY ARTIFLEXIT (dark gradient row) */}
      <section className="relative py-16 bg-[#04101E] sm:py-24 overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[28rem] w-[28rem] rounded-full bg-brand-cyan/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 right-0 h-[24rem] w-[24rem] rounded-full bg-brand-blue/15 blur-3xl" />

        <div className="shell relative">
          <SectionHeader
            label="Why Us"
            title={<>Why <span className="gradient-text">ArtiflexIT</span></>}
            description="There is no shortage of cloud resellers in the region. The questions worth asking: who is going to design this properly, who is going to be accountable when something stops working, and who is going to be honest with you when the cheapest answer isn't the right answer."
            centered
            dark
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((item, i) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-brand-cyan/40"
                style={{ backgroundImage: getCardGradient(i, whyUs.length) }}
              >
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0) 55%)",
                  }}
                />
                <div className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-brand-cyan/15 opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15 backdrop-blur-sm mb-4">
                    <item.icon className="w-5 h-5 text-brand-cyan" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-white mb-2 sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-200">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7, FINAL CTA */}
      <CTASection
        title="Stop Paying for Infrastructure You Don't Use."
        description="Get a no-commitment cloud readiness assessment that maps your current workloads, models the cost of moving each one, and recommends the right migration strategy. Most customers find 15 to 30% of waste in the assessment alone, before any work starts."
        primaryButton={{ text: "Discuss Your Requirements", action: "modal" }}
        secondaryButton={{ text: "Read the Buyer's Guide", href: "#buyers-guide" }}
      />
    </>
  );
}
