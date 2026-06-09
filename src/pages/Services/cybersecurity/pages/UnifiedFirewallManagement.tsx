import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";

/* ───────── WHY VENDOR-NATIVE MANAGERS ARE NOT ENOUGH ───────── */

const nativeLimitations = [
  {
    title: "Each manager sees only its own firewalls",
    desc: "Sophos Central manages Sophos XGS. FortiManager manages FortiGate. Panorama manages Palo Alto NGFWs. SmartConsole manages Check Point Quantum. None of them can see, let alone manage, a firewall from a competing vendor, no matter how many you have.",
  },
  {
    title: "Multi-branch networks create console sprawl",
    desc: "A UAE enterprise with 20 branches running Sophos at HQ, Fortinet at the data centre and Check Point at the perimeter needs three separate consoles, three separate policy models, three separate audit trails, and staff trained on all three simultaneously.",
  },
  {
    title: "Layered firewall architectures are unmanageable natively",
    desc: "Best-practice multi-layer firewall design (perimeter NGFW, internal segmentation firewall, DMZ firewall) often intentionally uses different vendors for defence-in-depth. Vendor-native tools completely break down in this model; there is no unified policy view across layers.",
  },
  {
    title: "Compliance evidence is fragmented and manual",
    desc: "NESA, CBUAE, DFSA and PCI DSS require a unified view of firewall posture, change history and policy review. Assembling audit evidence from three separate vendor consoles is a quarterly manual effort, and the evidence is never truly consistent.",
  },
  {
    title: "Change risk is invisible across vendor boundaries",
    desc: "A policy change on a Cisco perimeter firewall may create an unintended path through a Check Point segmentation firewall and expose a Fortinet-protected DMZ segment. No vendor-native tool can model this cross-vendor blast radius; only a true multi-vendor UFM can.",
  },
];

/* ───────── THE MULTI-VENDOR UFM SOLUTION ───────── */

const ufmSolutions = [
  {
    title: "One console for every firewall, every vendor",
    desc: "Raabyt UFM ONE connects to Palo Alto, Cisco, Check Point, Fortinet, Sophos, Juniper and more from a single pane. Every policy, every rule, every object is visible and manageable in one place, regardless of which vendor's box it runs on.",
  },
  {
    title: "Branch-scale management without console sprawl",
    desc: "50 branches, 4 vendors, 1 console. The multi-site architecture scales from 10 firewalls to 10,000+ without adding operational complexity. Branch policies push from the centre; branch drift is detected and reconciled automatically.",
  },
  {
    title: "Full visibility across multi-layer firewall architectures",
    desc: "Raabyt UFM ONE understands your entire firewall topology (perimeter, segmentation, DMZ, cloud edge) regardless of vendor mix. Path simulation models traffic flow through every layer before a change is committed, eliminating cross-tier exposure gaps.",
  },
  {
    title: "Unified compliance evidence across all vendors",
    desc: "A single audit pack covers every firewall in your estate: cross-vendor policy review, unified change trail and consolidated risk posture, delivered automatically each quarter. Meets NESA, CBUAE, DFSA and PCI DSS requirements from a single platform.",
  },
  {
    title: "Cross-vendor change risk analysis in real time",
    desc: "AI-driven blast-radius analysis models the downstream impact of any policy change across every vendor boundary in your network before you deploy, the only way to safely manage a multi-vendor, multi-layer firewall estate at scale.",
  },
];

const scenarioFlow = [
  { vendor: "Palo Alto", role: "Perimeter", color: "#ef4444" },
  { vendor: "Check Point", role: "DMZ", color: "#f59e0b" },
  { vendor: "Cisco", role: "Data Centre Seg.", color: "#3b82f6" },
  { vendor: "Fortinet", role: "Branch (×20)", color: "#10b981" },
  { vendor: "Sophos", role: "Cloud Edge", color: "#8b5cf6" },
];

/* ───────── DEPLOYMENT FLEXIBILITY ───────── */

const deploymentOptions = [
  {
    eyebrow: "On-Premises",
    title: "On-Premises Appliance",
    badge: "Available",
    desc: "Deploy on your own hardware or virtualisation platform (VMware, Hyper-V, KVM). Full data sovereignty, nothing leaves your network. Ideal for air-gapped environments, sovereign infrastructure and data-residency mandates. All features available with no cloud dependency.",
  },
  {
    eyebrow: "Private Cloud",
    title: "Private Cloud Hosting",
    badge: "Available",
    desc: "Run inside your own private cloud infrastructure, whether an on-site VMware cluster, a co-location private cloud or a sovereign UAE cloud. Retains full data control while delivering cloud-style manageability and scale. Supports containerised deployment via Kubernetes.",
  },
  {
    eyebrow: "Microsoft Azure",
    title: "Microsoft Azure",
    badge: "Available",
    desc: "Deploy from Azure Marketplace in UAE North or UAE Central regions. Native Azure AD integration, RBAC via Entra ID and Azure Monitor log forwarding. Deploy alongside Azure Firewall and Azure NSG assets, managed natively from the same console.",
  },
  {
    eyebrow: "Amazon Web Services",
    title: "Amazon AWS",
    badge: "Available",
    desc: "Available via AWS Marketplace for deployment in the Bahrain or UAE regions. Integrates natively with AWS Security Groups, Network Firewall and Gateway Load Balancer endpoints. CloudFormation and Terraform templates for automated stack deployment.",
  },
  {
    eyebrow: "Google Cloud Platform",
    title: "Google Cloud (GCP)",
    badge: "Available",
    desc: "Deployable via GCP Marketplace. Manages GCP VPC Firewall rules and Cloud Firewall policies natively alongside on-premises NGFWs. Google Cloud Armor and Hierarchical Firewall Policy support included. Auto-scaling deployment via GCP managed instance groups.",
  },
  {
    eyebrow: "Hybrid & Multi-Cloud",
    title: "Hybrid & Multi-Cloud",
    badge: "Recommended",
    recommended: true,
    desc: "Manage on-premises NGFWs, private cloud firewalls, Azure, AWS and GCP-native controls from a single Raabyt UFM ONE instance, the most common UAE enterprise deployment model. No separate licensing tier for cloud scope; all environments managed under one platform licence.",
  },
];

/* ───────── FEATURED PLATFORM CAPABILITIES ───────── */

const featuredCapabilities = [
  {
    title: "Universal Multi-Vendor Coverage",
    desc: "Manages Palo Alto, Cisco, Check Point, Fortinet, Sophos, Juniper, Huawei, AWS SGs, Azure NSGs, GCP VPC Firewall and OCI from one console. Broadest coverage of any UFM platform today.",
  },
  {
    title: "AI-Driven Policy Intelligence",
    desc: "Native AI engine continuously analyses rule-base complexity, detects shadowed and redundant rules, over-permissive policies and zero-day exposure paths, with ranked remediation mapped to business context.",
  },
  {
    title: "Full Policy Lifecycle Automation",
    desc: "Request, risk analysis, approval, auto-deploy and post-change audit. Native ITSM connectors for ServiceNow, Jira and BMC Remedy. Terraform provider and Ansible collection for policy-as-code pipelines.",
  },
  {
    title: "UAE-First Compliance Reporting",
    desc: "Out-of-the-box NESA, UAE PDPL, CBUAE, DFSA, ADHICS, PCI DSS, ISO 27001, NIST and SOX frameworks. Automated quarterly evidence packs delivered as signed audit bundles, the first UFM platform with native UAE regulatory framework alignment.",
  },
  {
    title: "Real-Time Topology & Path Simulation",
    desc: "Dynamic topology across physical, virtual, cloud and SD-WAN. Simulate any source-to-destination path with blast-radius analysis before committing changes, eliminating unplanned outages across complex hybrid estates.",
  },
  {
    title: "Unified Cloud + On-Prem Visibility",
    desc: "Single policy view spanning on-prem NGFWs, cloud-native firewalls, security groups and microsegmentation policies. No separate cloud module required; cloud entities appear natively in every view.",
  },
  {
    title: "Open API & IaC Integration",
    desc: "REST API with 100% feature parity to the UI. Native Terraform provider, Ansible collection and GitHub Actions integration for DevSecOps pipelines. GraphQL analytics interface for custom reporting.",
  },
  {
    title: "Multi-Tenant & MSSP-Ready",
    desc: "Full multi-tenant isolation with granular RBAC, tenant-level data residency, branded client portals and per-tenant compliance reporting. Purpose-designed for UAE managed-service delivery at scale.",
  },
];

/* ───────── BUYER'S GUIDE, SELECTION FRAMEWORK ───────── */

const selectionFramework = [
  {
    step: "1",
    question: "What is UFM for?",
    capture:
      "Centralised multi-vendor policy unification, policy lifecycle automation (request to deploy), compliance audit posture, or change risk analysis",
    why: "Each driver maps to different platform depth. True multi-vendor UFM requires a dedicated third-party platform; vendor-native tools cannot manage competing vendors' firewalls.",
  },
  {
    step: "2",
    question: "Single-vendor or multi-vendor estate?",
    capture:
      "All one vendor, or a deliberate mix of two or more firewall families across HQ, branches and layered tiers",
    why: "Two or more firewall vendors in the same estate makes a dedicated multi-vendor UFM mandatory. Running parallel vendor-native consoles costs more in operational overhead than the UFM licence within 12 to 18 months for most UAE enterprises.",
  },
  {
    step: "3",
    question: "Number of firewalls and sites?",
    capture:
      "Under 10 firewalls (per-device console viable), 10 to 100 (UFM strongly recommended), 100+ (UFM mandatory)",
    why: "Scale drives the operational economics. The inflection point for needing UFM is around 10 firewalls or 5 sites for most UAE customers.",
  },
  {
    step: "4",
    question: "Policy lifecycle maturity?",
    capture:
      "Manual rule additions, ticket-driven changes, structured request workflow, automated provisioning, full policy-as-code",
    why: "Estates with 10+ rule changes per week need structured request workflow, risk analysis and audit trail. Modern UFM platforms automate the full rule lifecycle. Mature estates need this; brand-new estates do not yet.",
  },
  {
    step: "5",
    question: "Compliance and audit posture?",
    capture: "NESA, UAE PDPL, CBUAE, DFSA, ADHICS, PCI DSS, ISO 27001",
    why: "All of these expect documented firewall policy review, change management and audit trail. Raabyt UFM ONE delivers native UAE regulatory framework alignment, the only platform to do so out of the box.",
  },
  {
    step: "6",
    question: "Cloud-native firewall scope?",
    capture:
      "On-prem only, or a hybrid of on-prem plus cloud-native (AWS Security Groups, Azure NSGs, GCP VPC)",
    why: "Raabyt UFM ONE is the only UFM platform to natively unify on-prem NGFWs and cloud-native security controls without a separate module or additional licence.",
  },
];

/* ───────── DELIVERY MODEL ───────── */

const deliveryStages = [
  {
    title: "Assess",
    duration: "2 weeks",
    summary:
      "Inventory of current firewall estate, vendor mix analysis, policy complexity review, change volume measurement and compliance gap assessment against UAE regulatory frameworks.",
    deliverable:
      "Current-state report, vendor recommendation with rationale, Raabyt UFM ONE architecture fit, three-year TCO comparison.",
  },
  {
    title: "Design",
    duration: "2–3 weeks",
    summary:
      "Raabyt UFM ONE architecture for your specific multi-vendor estate: device onboarding plan, policy hierarchy design, ITSM integration, compliance framework mapping and RBAC model.",
    deliverable:
      "Approved architecture, signed-off device onboarding sequence, compliance framework alignment document.",
  },
  {
    title: "Deploy",
    duration: "2–6 weeks",
    summary:
      "Phased deployment with rollback at every stage. Device onboarding, policy baseline import, ITSM integration, compliance framework activation and user training.",
    deliverable:
      "Live multi-vendor UFM, audit-ready documentation, runbooks for your team, first compliance evidence pack.",
  },
  {
    title: "Manage",
    duration: "Ongoing",
    summary:
      "24/7 UFM monitoring, policy change management, rule lifecycle governance, monthly board-readable reporting, quarterly policy review and compliance evidence delivery.",
    deliverable:
      "Operational multi-vendor UFM with SLAs you can rely on. Automated quarterly evidence packs for NESA, CBUAE, DFSA and PCI DSS.",
  },
];

const capabilityPills = [
  "AI-driven rule risk analysis",
  "Native NESA & UAE PDPL compliance frameworks",
  "Full policy lifecycle automation",
  "Broadest multi-vendor coverage",
  "Real-time topology simulation",
  "Unified cloud + on-prem visibility",
  "ServiceNow & Jira native integration",
  "Terraform + Ansible IaC support",
  "MSSP multi-tenant architecture",
  "Automated quarterly evidence packs",
  "SaaS / on-prem / air-gapped deployment",
  "24/7 managed UFM operations",
  "In-country UAE engineers, on-site within 24 hr",
  "Arabic & English support delivery",
  "6-country Middle East coverage",
  "30-min P1 SLA, UAE business hours",
  "Named Account + Technical Account Manager",
  "UAE sector depth: banking, gov, healthcare, energy",
];

/* ───────── LOCAL SUPPORT & IN-COUNTRY PRESENCE ───────── */

const inCountryPresence = [
  { country: "UAE", cities: "Dubai · Abu Dhabi · Sharjah", hq: true },
  { country: "Saudi Arabia", cities: "Riyadh · Jeddah · NEOM" },
  { country: "Oman", cities: "Muscat · Sohar" },
  { country: "Qatar", cities: "Doha" },
  { country: "Kuwait", cities: "Kuwait City" },
  { country: "Bahrain", cities: "Manama" },
];

const localSupportPoints = [
  {
    title: "Same time-zone response, no overnight tickets",
    desc: "Support engineers work UAE business hours (GST, UTC+4). A P1 incident at 9 AM Dubai time gets an engineer on a call within 30 minutes, not a ticket routed to a US team who starts their day nine hours later. Critical policy change requests are actioned the same day, not the next working morning.",
  },
  {
    title: "Arabic & English support, native language delivery",
    desc: "Our Raabyt UFM ONE engineers are bilingual, fluent in both Arabic and English. Documentation, runbooks, training sessions and board-level reporting are all delivered in the language your team and your leadership prefer. No translation friction on compliance evidence or incident reports.",
  },
  {
    title: "UAE regulatory expertise built into every engagement",
    desc: "Our engineers understand NESA, UAE PDPL, CBUAE, DFSA and ADHICS from direct project experience, not from reading the framework documentation. We know what auditors ask for, how evidence packs should be structured and which control gaps are most commonly flagged in UAE regulatory reviews.",
  },
  {
    title: "On-site availability, engineers at your desk when needed",
    desc: "Remote support resolves most issues. But for complex migrations, go-live cutovers, NESA audit preparation or firewall estate walk-throughs with your security committee, we send an engineer on-site across Dubai, Abu Dhabi, Sharjah and major Saudi and Oman cities within 24 hours.",
  },
  {
    title: "Dedicated account team, not a shared global queue",
    desc: "As Platinum & Strategic Partner, each Raabyt UFM ONE customer gets a named Account Manager, a named Technical Account Manager and a named Compliance Advisor, all based in the UAE. You have direct mobile numbers, not a shared ticketing portal and a generic support alias.",
  },
  {
    title: "Sector depth: banking, government, healthcare and energy",
    desc: "We have delivered Raabyt UFM ONE and multi-vendor UFM across UAE banking (CBUAE-regulated), DIFC/DFSA-supervised financial institutions, federal and emirate-level government entities, ADHICS-regulated healthcare providers and ADNOC-adjacent energy sector customers. Sector-specific playbooks, not generic deployment templates.",
  },
];

const localSupportStats = [
  { value: "30 min", label: "P1 response SLA, UAE business hours" },
  { value: "24/7", label: "Managed UFM monitoring for managed customers" },
  { value: "24 hr", label: "On-site engineer availability, UAE, KSA & Oman" },
  { value: "6", label: "Middle East countries with in-country coverage" },
  { value: "AR / EN", label: "Bilingual support, documentation & reporting" },
  { value: "5+", label: "UAE regulatory frameworks supported natively" },
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "What is a true multi-vendor UFM platform, and why does it matter?",
    answer:
      "A true multi-vendor UFM platform manages two or more firewall vendor families from a single console. Vendor-native tools (Sophos Central, FortiManager, Panorama, SmartConsole, Cisco Defense Orchestrator) only manage their own products, so the moment your estate spans multiple vendors, branches or layered firewall tiers, they become silos. A true multi-vendor UFM gives you one policy model, one change workflow, one audit trail and cross-vendor risk analysis across the whole estate.",
  },
  {
    question: "Why Raabyt UFM ONE for multi-vendor firewall management?",
    answer:
      "Raabyt UFM ONE combines the broadest multi-vendor firewall coverage in the market, an AI-native policy intelligence engine, full request-to-deploy lifecycle automation and native UAE compliance framework alignment (NESA, UAE PDPL, CBUAE, DFSA, ADHICS). As Platinum & Strategic Partner, Artiflex IT designs, deploys and operates it directly with an in-country UAE team, so you get a single console for every firewall vendor backed by local engineering, compliance and managed-service support.",
  },
  {
    question: "Do we need third-party UFM if we already have vendor-native UFM?",
    answer:
      "If your estate is genuinely single-vendor, vendor-native UFM is usually enough. For two or more firewall families, the operational cost of running parallel vendor-native consoles exceeds the cost of a multi-vendor UFM licence within 12 to 18 months for most UAE enterprises, and vendor-native tools cannot model cross-vendor change risk or produce unified compliance evidence.",
  },
  {
    question: "Which firewall vendors can Raabyt UFM ONE manage?",
    answer:
      "Raabyt UFM ONE manages Palo Alto, Cisco, Check Point, Fortinet, Sophos, Juniper and Huawei NGFWs alongside cloud-native controls (AWS Security Groups, Azure NSGs, GCP VPC Firewall and OCI) from a single console, the broadest coverage of any UFM platform. Every policy, rule and object across every vendor is visible and manageable in one place, with cross-vendor change-risk analysis before any deployment.",
  },
  {
    question: "What does Raabyt UFM ONE compliance reporting cover for UAE?",
    answer:
      "Out-of-the-box NESA, UAE PDPL, CBUAE, DFSA, ADHICS and PCI DSS, plus ISO 27001, NIST, SOX and HIPAA. Evidence is delivered as automated quarterly signed audit bundles covering cross-vendor policy review, change history and consolidated risk posture, structured the way UAE auditors expect.",
  },
  {
    question: "What is the typical Raabyt UFM ONE deployment timeline in the UAE?",
    answer:
      "Assessment runs about two weeks, design two to three weeks, and phased deployment two to six weeks depending on estate size and vendor mix, with rollback at every stage. Managed UFM onboarding compresses this while shifting day-to-day operations to our in-country team.",
  },
  {
    question: "Do you offer managed UFM services across the UAE?",
    answer:
      "Yes. We provide 24/7 managed UFM monitoring, policy change management, rule lifecycle governance, monthly board-readable reporting and quarterly compliance evidence delivery, backed by a named UAE account team and a 30-minute P1 SLA during UAE business hours.",
  },
  {
    question: "How often should multi-vendor firewall policy be audited?",
    answer:
      "Quarterly policy review is becoming the standard expectation for UAE regulated entities under NESA, CBUAE and DFSA. Raabyt UFM ONE automates the evidence so quarterly review is practical at scale, with continuous rule risk analysis between formal audits.",
  },
];

/* ───────── HERO ───────── */

function UnifiedFirewallManagementHero() {
  const { open: openContact } = useContactModal();
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-navy-deep">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/network-security.jpg')" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/70 to-navy-deep/90"
      />

      {/* Breadcrumb band */}
      <div className="relative z-10 border-b border-white/5">
        <div className="shell flex w-full items-center justify-end gap-4 pt-24 pb-3 sm:pt-28">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center justify-end gap-2 text-[10px] text-slate-400 sm:text-[11px]">
              <li>
                <Link to="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li className="text-slate-600">/</li>
              <li>
                <Link to="/cybersecurity" className="transition-colors hover:text-white">
                  Cybersecurity
                </Link>
              </li>
              <li className="text-slate-600">/</li>
              <li>
                <span className="font-medium text-[#28B5E1]">Unified Firewall Management</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero masthead */}
      <div className="shell relative z-10 flex w-full flex-1 items-center py-10 sm:py-12 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full"
        >
          <h1 className="font-display text-4xl font-bold leading-[1] tracking-tight text-white sm:text-5xl md:text-5xl lg:text-[3.75rem]">
            Unified Firewall{" "}
            <span className="gradient-text">Management</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              AI-Native Multi-Vendor Firewall Management, Powered by Raabyt UFM ONE
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Every firewall vendor ships its own manager, but each one only speaks to its own devices. The moment your network spans multiple vendors, branches or layered firewall tiers, those native tools become silos. <span className="font-semibold text-white">Raabyt UFM ONE</span> solves this: one console for every firewall, every vendor, with AI-driven policy intelligence, full lifecycle automation and native UAE compliance reporting. Delivered by Artiflex IT as Platinum &amp; Strategic Partner.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#why-multivendor"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base"
            >
              Why Multi-Vendor UFM
            </a>
            <a
              href="#buyers-guide"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base"
            >
              Buyer's Guide
            </a>
            <Link
              to="/blog/origin-firewall-network-security"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-[#28B5E1]/40 bg-[#28B5E1]/10 px-6 py-3 text-sm font-semibold text-[#28B5E1] backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1] hover:bg-[#28B5E1]/20 hover:text-white sm:px-7 sm:py-3.5 sm:text-base"
            >
              Read Origin Story
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
            <button
              onClick={openContact}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base"
            >
              Get a Free UFM Assessment
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
            </button>
          </div>

          {/* Partner band */}
          <div className="mt-8 inline-flex flex-col gap-2 rounded-2xl border border-[#28B5E1]/25 bg-[#28B5E1]/[0.07] px-5 py-4 backdrop-blur-sm sm:px-6">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
              <span aria-hidden="true">⚡</span> Platinum & Strategic Partner, Raabyt UFM ONE
            </span>
            <span className="text-xs text-slate-300 sm:text-sm">
              Certified UAE implementation partner · Priority pre-sales engineering ·{" "}
              <span className="font-semibold text-white">Managed UFM service delivery</span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll affordance */}
      <div className="relative z-10 flex justify-center pb-8">
        <div
          aria-hidden="true"
          className="flex flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-[0.32em] text-slate-500"
        >
          <span>Continue</span>
          <span className="h-8 w-px bg-gradient-to-b from-[#28B5E1]/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* ───────── PAGE ───────── */

export default function UnifiedFirewallManagement() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Unified Firewall Management (UFM) UAE | Raabyt UFM ONE | Artiflex IT</title>
        <meta
          name="description"
          content="True multi-vendor Unified Firewall Management (UFM) for the UAE, powered by Raabyt UFM ONE. AI-driven policy intelligence, full lifecycle automation, broadest multi-vendor coverage and native NESA, UAE PDPL, CBUAE and DFSA compliance reporting. Artiflex IT is Platinum & Strategic Partner."
        />
        <link rel="canonical" href="https://artiflexit.com/cybersecurity/unified-firewall-management" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Artiflex IT",
            "url": "https://artiflexit.com/cybersecurity/unified-firewall-management",
            "areaServed": [
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "City", "name": "Dubai" },
              { "@type": "City", "name": "Abu Dhabi" },
            ],
            "description":
              "True multi-vendor Unified Firewall Management (UFM) for the UAE, powered by Raabyt UFM ONE. Artiflex IT is Platinum & Strategic Partner.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Unified Firewall Management",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description":
              "UAE Unified Firewall Management delivery powered by Raabyt UFM ONE: true multi-vendor policy automation, AI-driven risk analysis, audit-ready compliance and managed UFM. Artiflex IT is Platinum & Strategic Partner.",
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

      {/* HERO */}
      <UnifiedFirewallManagementHero />

      {/* ───────── THE PLATFORM WE DELIVER (HONEYCOMB) ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #1B8AC7 1px, transparent 1px), linear-gradient(to bottom, #1B8AC7 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#1B8AC7]/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-[#28B5E1]/10 blur-3xl"
        />

        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              The Platform
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
              One platform.{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Every firewall vendor.
              </span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              We standardise on Raabyt UFM ONE: one AI-native console that manages every major firewall vendor in your estate. Delivered by Artiflex IT as Platinum &amp; Strategic Partner.
            </p>
          </div>

          {/* Honeycomb (large screens) */}
          <div className="mt-14 hidden flex-col items-center lg:flex">
            {(() => {
              const platforms: { name: string; logo: string }[] = [
                { name: "Raabyt UFM ONE", logo: "/logos/Raabyt.png" },
              ];
              const layouts: Record<number, number[]> = {
                1: [1], 2: [2], 3: [3], 4: [3, 1], 5: [3, 2],
                6: [3, 3], 7: [4, 3], 8: [4, 4], 9: [5, 4], 10: [5, 5],
              };
              const sizes =
                layouts[platforms.length] ??
                [Math.ceil(platforms.length / 2), Math.floor(platforms.length / 2)];
              const rows: (typeof platforms)[] = [];
              let i = 0;
              sizes.forEach((s) => {
                rows.push(platforms.slice(i, i + s));
                i += s;
              });
              const HEX = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
              return rows.map((row, rowIdx) => (
                <div
                  key={rowIdx}
                  className="flex"
                  style={{
                    marginTop: rowIdx === 0 ? 0 : -52,
                    transform:
                      rowIdx > 0 && rows[rowIdx - 1].length === row.length
                        ? "translateX(90px)"
                        : undefined,
                  }}
                >
                  {row.map((v) => (
                    <div
                      key={v.name}
                      aria-label={v.name}
                      className="group relative block h-[208px] w-[180px] transition-all duration-300 hover:z-10 hover:scale-[1.06] [filter:drop-shadow(0_4px_12px_rgba(15,23,42,0.10))] hover:[filter:drop-shadow(0_10px_30px_rgba(40,181,225,0.45))]"
                    >
                      <div
                        className="absolute inset-0 bg-slate-200/80 transition-colors duration-300 group-hover:bg-[#28B5E1]"
                        style={{ clipPath: HEX }}
                      />
                      <div
                        className="absolute inset-[2px] bg-white transition-all duration-300 group-hover:bg-gradient-to-b group-hover:from-[#28B5E1]/[0.08] group-hover:to-white"
                        style={{ clipPath: HEX }}
                      />
                      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
                        <img
                          src={v.logo}
                          alt={v.name}
                          loading="lazy"
                          className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ));
            })()}
          </div>

          {/* Card grid (mobile / tablet) */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:hidden">
            {[
              { name: "Raabyt UFM ONE", logo: "/logos/Raabyt.png" },
            ].map((v) => (
              <div
                key={v.name}
                className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/50 hover:shadow-md"
              >
                {v.logo ? (
                  <img
                    src={v.logo}
                    alt={v.name}
                    loading="lazy"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      img.style.display = "none";
                      const fb = img.nextElementSibling as HTMLElement | null;
                      if (fb) fb.style.removeProperty("display");
                    }}
                    className="h-14 w-14 object-contain"
                  />
                ) : null}
                <p
                  className="font-display text-[11px] font-semibold leading-tight text-slate-900"
                  style={{ display: v.logo ? "none" : "block" }}
                >
                  {v.name}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-slate-500">
            <span className="font-semibold text-slate-700">Raabyt UFM ONE</span> manages every major firewall vendor, on-premises and in the cloud, from a single console.
          </p>
        </div>
      </section>

      {/* ───────── WHY VENDOR-NATIVE MANAGERS ARE NOT ENOUGH ───────── */}
      <section id="why-multivendor" className="relative scroll-mt-20 bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              The Core Challenge
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Why vendor-native managers are not enough
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Every major firewall vendor ships its own centralised manager. But each one is engineered to speak only to its own product family. The instant your network grows beyond a single vendor (multiple branches, layered security tiers, or a mixed estate inherited through acquisition) those tools become isolated silos with no common language.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {nativeLimitations.map((c) => (
              <article
                key={c.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-rose-300/60 hover:shadow-[0_20px_60px_-12px_rgba(244,63,94,0.15)]"
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-400 to-amber-400"
                />
                <h3 className="font-display text-lg font-bold text-slate-900">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── THE MULTI-VENDOR UFM SOLUTION ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.06),transparent_60%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              The Multi-Vendor UFM Solution
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              What Raabyt UFM ONE delivers across every vendor
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Every vendor, every site, every layer, managed from one console.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ufmSolutions.map((c) => (
              <article
                key={c.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1B8AC7]/60 hover:shadow-[0_20px_60px_-12px_rgba(27,138,199,0.20)]"
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#045891] to-[#28B5E1]"
                />
                <h3 className="font-display text-lg font-bold text-slate-900">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{c.desc}</p>
              </article>
            ))}
          </div>

          {/* Real-world scenario */}
          <div className="mx-auto mt-12 max-w-5xl rounded-3xl border border-[#1B8AC7]/20 bg-gradient-to-br from-[#28B5E1]/[0.06] to-white p-6 shadow-sm sm:p-8">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1B8AC7]">
              Real-World Scenario, Typical UAE Enterprise Multi-Vendor Estate
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              {scenarioFlow.map((s, idx) => (
                <div key={s.vendor} className="flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm sm:text-sm">
                    <span
                      aria-hidden
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                    {s.vendor}
                    <span className="font-normal text-slate-400">{s.role}</span>
                  </span>
                  {idx < scenarioFlow.length - 1 && (
                    <span aria-hidden className="text-slate-300">→</span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <span className="inline-flex items-center rounded-lg border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700 sm:text-sm">
                5 vendor consoles · No unified view · Manual audit
              </span>
              <span aria-hidden className="hidden text-[#28B5E1] sm:inline">⟹</span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#28B5E1]/30 bg-[#28B5E1]/10 px-3.5 py-2 text-xs font-semibold text-[#045891] sm:text-sm">
                <span aria-hidden>⚡</span> Raabyt UFM ONE · 1 console · Unified policy · Automated audit
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-600">
              This multi-vendor, multi-branch architecture is the norm, not the exception, for UAE enterprise environments. Vendor-native managers cannot bridge these boundaries. Raabyt UFM ONE is purpose-built for exactly this.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── DEPLOYMENT FLEXIBILITY ───────── */}
      <section id="deployment" className="relative scroll-mt-20 overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.06),transparent_60%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              Deployment Flexibility
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Deploy Raabyt UFM ONE your way, anywhere
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Unlike legacy UFM platforms that lock you into a single deployment model, Raabyt UFM ONE runs natively on-premises, in your private cloud, or in any public cloud environment, with no feature delta between deployment models. Choose, change or combine as your infrastructure evolves.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {deploymentOptions.map((d) => (
              <article
                key={d.title}
                className={`group relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(27,138,199,0.10)] ${
                  d.recommended
                    ? "border-[#28B5E1]/50 shadow-[0_8px_30px_rgba(40,181,225,0.14)]"
                    : "border-slate-200 hover:border-[#28B5E1]/30"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1B8AC7]">
                    {d.eyebrow}
                  </p>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      d.recommended
                        ? "bg-[#28B5E1] text-white"
                        : "border border-emerald-300/50 bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {d.recommended ? "★ " : ""}
                    {d.badge}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-bold text-slate-900">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{d.desc}</p>
              </article>
            ))}
          </div>

          {/* No feature delta banner */}
          <div className="mt-10 rounded-3xl border border-[#1B8AC7]/20 bg-gradient-to-br from-[#28B5E1]/[0.06] to-white p-6 shadow-sm sm:p-8">
            <h3 className="font-display text-xl font-bold text-slate-900">
              No feature delta between deployment models
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Every deployment model, whether on-premises hardware, private cloud, Azure, AWS, GCP or hybrid, delivers identical feature sets. Policy lifecycle automation, AI-driven risk analysis, compliance reporting, multi-tenant MSSP architecture and API integrations are all available regardless of where UFM itself runs. Start on-prem and migrate to cloud, or run both simultaneously, without re-licensing or re-training your team.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── FEATURED PLATFORM, RAABYT UFM ONE ───────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#04101E] via-[#0A3D6B] to-[#045891] py-16 sm:py-24">
        <div className="shell relative">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center rounded-xl bg-white/95 px-5 py-3 shadow-[0_8px_30px_rgba(40,181,225,0.25)]">
              <img
                src="/logos/Raabyt.png"
                alt="Raabyt UFM ONE"
                loading="lazy"
                className="h-9 w-auto object-contain sm:h-10"
              />
            </div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#28B5E1]">
              Featured Platform, Raabyt UFM ONE
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              The definitive multi-vendor UFM platform
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-200 sm:text-lg">
              Raabyt UFM ONE is purpose-built for heterogeneous firewall estates: AI-native policy intelligence, the broadest vendor coverage in the market, full lifecycle orchestration and the most comprehensive UAE compliance framework alignment available. As{" "}
              <span className="font-semibold text-[#28B5E1]">Platinum & Strategic Partner</span>, we design, deploy and operate Raabyt UFM ONE across UAE projects.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCapabilities.map((f) => (
              <article
                key={f.title}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/40"
              >
                <h3 className="font-display text-base font-bold leading-snug text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── BUYER'S GUIDE, SELECTION FRAMEWORK ───────── */}
      <section id="buyers-guide" className="relative scroll-mt-20 bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              The Buyer's Guide
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Selection framework
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Before any UFM commitment, walk through these questions. Most under-utilised UFM platforms were bought with the right capability and the wrong operating model around them.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + selectionFramework.length * 116) }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="w-16 px-4 py-5 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">
                      Step
                    </th>
                    <th className="border-l border-white/15 px-2 py-3 sm:px-4 sm:py-5 align-bottom font-display text-sm font-semibold text-white sm:text-base">
                      Question
                    </th>
                    <th className="border-l border-white/15 px-2 py-3 sm:px-4 sm:py-5 align-bottom font-display text-sm font-semibold text-white sm:text-base">
                      What you are nailing down
                    </th>
                    <th className="border-l border-white/15 px-2 py-3 sm:px-4 sm:py-5 align-bottom font-display text-sm font-semibold text-white sm:text-base">
                      Why it matters
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectionFramework.map((r, idx) => (
                    <tr
                      key={r.step}
                      className={`border-t border-[#0A3D6B]/20 transition-colors hover:bg-[#28B5E1]/[0.04] ${
                        idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                      }`}
                    >
                      <td className="px-4 py-4 align-middle font-display text-base font-bold text-[#1B8AC7]">
                        {r.step}
                      </td>
                      <td className="border-l border-[#0A3D6B]/20 px-2 py-3 sm:px-4 sm:py-4 align-middle font-display text-sm font-semibold text-slate-900">
                        {r.question}
                      </td>
                      <td className="border-l border-[#0A3D6B]/20 px-2 py-3 sm:px-4 sm:py-4 align-middle text-xs leading-relaxed text-slate-700 sm:text-sm">
                        {r.capture}
                      </td>
                      <td className="border-l border-[#0A3D6B]/20 px-2 py-3 sm:px-4 sm:py-4 align-middle text-xs leading-relaxed text-slate-700 sm:text-sm">
                        {r.why}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── HOW WE WORK, DELIVERY MODEL ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="How we work"
            title={
              <>
                Our <span className="gradient-text">delivery model</span>
              </>
            }
            description="We don't sell licences. We deliver UFM outcomes: assess, design, deploy, manage. Every stage produces something an auditor can read and a CFO can sign off on."
            centered
          />

          <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-4">
            {deliveryStages.map((s, idx) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-border-light bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/25 hover:shadow-[0_12px_40px_rgba(27,138,199,0.10)] sm:p-6"
              >
                <div className="flex items-baseline justify-end">
                  <span className="rounded-full border border-border-light bg-surface-secondary px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                    {s.duration}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-heading">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-body">{s.summary}</p>
                <div className="mt-4 border-t border-border-light pt-3">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                    You get
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-body/85">
                    {s.deliverable}
                  </p>
                </div>
                {idx < 3 && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 lg:block"
                  >
                    <div className="h-px w-6 bg-gradient-to-r from-brand-blue/40 to-transparent" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── WHY ARTIFLEX IT ───────── */}
      <section className="relative overflow-hidden bg-navy-deep py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(27,138,199,0.18),transparent_60%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#28B5E1]">
              Why Artiflex IT
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              14+ years of UAE firewall delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Honest, estate-driven advice. We assess your firewall vendor mix, change volume and compliance obligations first, including whether managed UFM beats self-managed for your team. As Raabyt Platinum &amp; Strategic Partner, we design, deploy and operate Raabyt UFM ONE across UAE projects.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years UAE firewall delivery" },
              { value: "500+", label: "Firewalls under management" },
              { value: "10+", label: "Firewall & cloud platforms managed" },
              { value: "24/7", label: "Managed UFM coverage" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-sm transition-colors duration-300 hover:border-[#28B5E1]/30"
              >
                <p className="font-display text-3xl font-bold leading-none text-white sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-slate-400 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-6 max-w-5xl rounded-2xl border border-[#28B5E1]/30 bg-[#28B5E1]/[0.06] p-6 text-center backdrop-blur-sm">
            <p className="font-display text-2xl font-bold text-white sm:text-3xl">Platinum</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#28B5E1] sm:text-sm">
              Raabyt partner tier
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Vendor coverage
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Raabyt UFM ONE manages Palo Alto, Cisco, Check Point, Fortinet, Sophos, Juniper and Huawei NGFWs plus AWS, Azure, GCP and OCI cloud firewalls from one console. Designed, deployed and operated by Artiflex IT as Platinum &amp; Strategic Partner.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Compliance frameworks
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  NESA, UAE PDPL, CBUAE, DFSA, ADHICS, PCI DSS and ISO 27001 audit-ready evidence, with documented quarterly policy review and change-management trail delivered as part of the engagement.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Middle East coverage
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  On-site across Dubai, Abu Dhabi and Sharjah. Remote across the UAE, Oman and Saudi Arabia. Extended coverage in Qatar, Kuwait and Bahrain. Arabic and English delivery. 24/7 managed UFM bench for managed customers.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Engagement model
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  UFM design and migration, managed UFM, policy lifecycle governance, or assessment-only. Existing firewall licensing is part of the sizing, not separate. No vendor lock-in, no theatre.
                </p>
              </div>
            </div>
          </div>

          {/* Capability pills */}
          <div className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-2.5">
            {capabilityPills.map((p) => (
              <span
                key={p}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-xs text-slate-300"
              >
                <span aria-hidden className="text-emerald-400">✓</span>
                {p}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <button
              onClick={openContact}
              className="inline-flex items-center justify-center rounded-lg bg-[#28B5E1] px-6 py-3 font-display text-sm font-semibold text-navy-deep transition-colors hover:bg-white sm:text-base"
            >
              Book Assessment
            </button>
            <Link
              to="/cybersecurity"
              className="inline-flex items-center justify-center rounded-lg border border-white/15 px-6 py-3 font-display text-sm font-medium text-slate-300 transition-colors hover:border-[#28B5E1]/40 hover:text-white sm:text-base"
            >
              Back to Cybersecurity →
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── LOCAL SUPPORT & IN-COUNTRY PRESENCE ───────── */}
      <section id="local-support" className="relative scroll-mt-20 bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              Local Support & In-Country Presence
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Raabyt UFM ONE, backed by real Middle East support
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Most international UFM vendors route Middle East customers through European or US support desks, adding time-zone friction, language barriers and no understanding of UAE-specific compliance obligations. Raabyt UFM ONE, delivered through us as Platinum & Strategic Partner, is the only multi-vendor UFM with dedicated in-country support across the UAE, Saudi Arabia, Oman, Qatar and Kuwait.
            </p>
          </div>

          {/* In-country grid */}
          <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0A3D6B] to-[#04101E] p-6 sm:p-8">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#28B5E1]">
              In-Country Presence Across the Region
            </p>
            <p className="mt-2 text-sm text-slate-300">
              On-site engineers, Arabic-speaking support and UAE regulatory expertise, not a shared global helpdesk.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {inCountryPresence.map((c) => (
                <div
                  key={c.country}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3"
                >
                  <div>
                    <p className="font-display text-sm font-semibold text-white">{c.country}</p>
                    <p className="text-xs text-slate-400">{c.cities}</p>
                  </div>
                  {c.hq && (
                    <span className="rounded-full border border-[#28B5E1]/40 bg-[#28B5E1]/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#28B5E1]">
                      HQ
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Why local support cards */}
          <div className="mx-auto mt-12 max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <h3 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                Why local support changes everything
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Advantages that only in-country delivery can provide.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {localSupportPoints.map((p) => (
                <article
                  key={p.title}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1B8AC7]/60 hover:shadow-[0_20px_60px_-12px_rgba(27,138,199,0.20)]"
                >
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#045891] to-[#28B5E1]"
                  />
                  <h4 className="font-display text-base font-bold text-slate-900">{p.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{p.desc}</p>
                </article>
              ))}
            </div>
          </div>

          {/* Local support stats */}
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:gap-5 sm:grid-cols-3">
            {localSupportStats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center"
              >
                <p className="font-display text-2xl font-bold leading-none text-[#045891] sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Trophy banner */}
          <div className="mx-auto mt-12 max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-br from-[#0A3D6B] via-[#04101E] to-[#020617] p-8 shadow-xl shadow-[#1B8AC7]/10 sm:p-12">
            <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
              The only multi-vendor UFM with dedicated UAE in-country delivery
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              International UFM platforms route Middle East support through global helpdesks. As Raabyt Platinum &amp; Strategic Partner, we are the only UFM provider with certified engineers physically present in the UAE, Arabic-language delivery capability, and direct UAE regulatory compliance expertise embedded into every engagement from day one.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Knowledge Base"
            title={
              <>
                Frequently <span className="gradient-text">asked</span> questions
              </>
            }
            description="What UAE buyers ask us most about choosing vendor-native versus third-party UFM, and managed versus self-managed delivery."
            centered
          />

          <div className="mt-12 grid gap-6 sm:mt-14 lg:grid-cols-12 lg:gap-8">
            {/* Questions list (left) */}
            <ul className="flex flex-col gap-2 lg:col-span-6">
              {faqs.map((faq, idx) => {
                const isActive = activeFaq === idx;
                return (
                  <li key={faq.question}>
                    <button
                      type="button"
                      onClick={() => setActiveFaq(idx)}
                      aria-pressed={isActive}
                      aria-controls="faq-answer-panel"
                      className={`group flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-semibold transition-all duration-200 sm:px-5 sm:text-[15px] ${
                        isActive
                          ? "border-transparent bg-gradient-to-r from-[#045891] to-[#1B8AC7] text-white shadow-[0_8px_24px_-8px_rgba(27,138,199,0.55)]"
                          : "border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-[#28B5E1]/60 hover:bg-slate-50 hover:text-[#1B8AC7]"
                      }`}
                    >
                      <span className="leading-snug">{faq.question}</span>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                          isActive ? "translate-x-0.5" : "opacity-50 group-hover:translate-x-0.5 group-hover:opacity-100"
                        }`}
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Answer panel (right) */}
            <div className="lg:col-span-6">
              <div
                id="faq-answer-panel"
                role="region"
                aria-live="polite"
                className="lg:sticky lg:top-24"
              >
                <div className="overflow-hidden rounded-2xl border border-transparent bg-gradient-to-r from-[#045891] to-[#054466] p-6 shadow-[0_18px_40px_-18px_rgba(27,138,199,0.55)] sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-white">
                      Faq
                    </span>
                    <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-white/40 to-transparent" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold leading-snug text-white sm:text-2xl">
                    {faqs[activeFaq].question}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">
                    {faqs[activeFaq].answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <CTASection
        title="Get a Free UFM Assessment"
        description="Free UFM posture review covering your current firewall estate, vendor mix, policy complexity, change volume, compliance gaps and recommended Raabyt UFM ONE deployment architecture. Delivered by a certified engineer based in the UAE, in Arabic or English, on-site or remote."
        primaryButton={{ text: "Book Assessment", action: "modal" }}
      />
    </>
  );
}
