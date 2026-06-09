import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";

/* ───────── SIEM PLATFORMS WE DEPLOY (LINEUP) ───────── */

const siemPlatforms = [
  { slug: "rapid7", name: "Rapid7 InsightIDR", rank: "#1", featured: true, logo: "/logos/rapid7.png" },
  { slug: "splunk", name: "Cisco Splunk ES", rank: "#2", logo: "/logos/Splunk.webp" },
  { slug: "exabeam", name: "Exabeam Fusion SIEM", rank: "#3", logo: "/logos/Exabeam.png" },
  { slug: "sentinel", name: "Microsoft Sentinel", logo: "/logos/MicrosoftDefender.webp" },
  { slug: "qradar", name: "IBM QRadar", logo: "/logos/IBM-Security.png" },
  { slug: "secureworks", name: "Secureworks Taegis XDR", logo: "" },
  { slug: "wazuh", name: "Wazuh OSS", logo: "/logos/Wazuh.png" },
];

/* ───────── MDR-vs-SIEM DECISION ───────── */

const decisionPaths = [
  {
    tone: "warn" as const,
    badge: "No in-house 24/7 SOC team?",
    body: "Evaluate MDR (Managed Detection & Response) first. Sophos MDR Complete includes a fully managed 24/7 SOC, continuous threat hunting, and guaranteed response, at a predictable cost that typically beats building your own SIEM operation. A SIEM without analysts watching it is an expensive log archive.",
  },
  {
    tone: "ok" as const,
    badge: "Operating or building an in-house SOC?",
    body: "SIEM is the right foundation. Our top recommendation is Rapid7 InsightIDR: cloud-native, detection live in hours, user-based pricing with no per-GB log ingest shock, and an optional MDR overlay for overnight or overflow coverage.",
  },
];

/* ───────── WHAT GOOD SIEM DELIVERS ───────── */

const siemCapabilities = [
  {
    title: "Log Aggregation & Normalisation",
    desc: "Collects logs from firewalls, endpoints, cloud services and identity providers. Normalises into a unified schema so correlation rules fire correctly across heterogeneous environments.",
  },
  {
    title: "Event Correlation",
    desc: "Cross-source correlation links related events (failed login, successful login from a new country, large data transfer) into a single high-confidence alert the SOC can act on.",
  },
  {
    title: "UEBA / ML Threat Detection",
    desc: "Behavioural baselining catches the insider threat, the compromised credential, and slow-burn lateral movement that signature correlation rules miss entirely.",
  },
  {
    title: "Compliance Reporting",
    desc: "Pre-built dashboards for NESA, CBUAE, PCI DSS and ISO 27001. Automated audit evidence packs reduce quarterly preparation from weeks to hours.",
  },
  {
    title: "Threat Hunting",
    desc: "Historical query capability lets analysts retroactively search months of log data for indicators of compromise when new threat actor TTPs are published.",
  },
  {
    title: "Incident Triage & Investigation",
    desc: "Prioritised alert queues with asset criticality, user risk scores and threat intel enrichment, so analysts work the right cases first and reconstruct full attack timelines.",
  },
];

/* ───────── SELECTION FRAMEWORK ───────── */

const selectionFramework = [
  {
    step: "1",
    question: "Do you have 24/7 analyst coverage?",
    desc: "If no: MDR is the honest answer, not SIEM. If yes, or building toward it: SIEM is the right foundation. This single question changes everything.",
  },
  {
    step: "2",
    question: "Compliance-primary or detection-primary?",
    desc: "Compliance-primary: Microsoft Sentinel or Splunk may lead. Detection-primary with UEBA depth: Rapid7 InsightIDR or Exabeam Fusion SIEM.",
  },
  {
    step: "3",
    question: "What is your daily log volume?",
    desc: "InsightIDR's user-based model eliminates the per-GB shock. Splunk is very expensive at high log volumes. Know your EPS/GB before shortlisting.",
  },
  {
    step: "4",
    question: "Cloud, on-premises, or hybrid?",
    desc: "Cloud-first: Rapid7 InsightIDR or Microsoft Sentinel. On-premises mandates (NESA sovereign data): IBM QRadar or Exabeam Fusion on-prem edition.",
  },
  {
    step: "5",
    question: "What integrations are non-negotiable?",
    desc: "Microsoft-heavy: Sentinel. Cisco-heavy: Splunk plus Talos. Multi-vendor: InsightIDR's broad connector library.",
  },
  {
    step: "6",
    question: "What is the honest 3-year TCO?",
    desc: "Splunk at high volumes is very expensive. QRadar professional services are significant. InsightIDR is the most predictable model. We model all options before quoting.",
  },
];

/* ───────── DETAILED COMPARISON CARDS ───────── */

const vendors = [
  {
    slug: "rapid7-insightidr",
    name: "Rapid7 InsightIDR",
    best: "Cloud-Native SIEM · Best Overall Value for UAE (Recommended #1)",
    strength:
      "Our top recommendation. Cloud-native with no server infrastructure, live detection within hours of deployment, and user-based pricing that eliminates per-GB log ingest shock. Includes UEBA, deception technology, and optional MDR overlay, all on one platform at one predictable annual cost.",
    watch:
      "Best for UAE SMB to enterprise, cloud-first or hybrid, fast time to value and predictable cost.",
    logo: "/logos/rapid7.png",
  },
  {
    slug: "cisco-splunk-enterprise-security",
    name: "Cisco Splunk Enterprise Security",
    best: "Enterprise Reference · Cisco Talos Intel · High Volume (Recommended #2)",
    strength:
      "The reference platform for large enterprise SIEM with dedicated engineers. Cisco Talos intelligence integration and the deepest connector library. Very expensive at scale (USD 500K to 1M+ annually at high log volumes); long time to value.",
    watch:
      "Best for large enterprises with dedicated SIEM engineering and Cisco-heavy environments. Not recommended for mid-market.",
    logo: "/logos/Splunk.webp",
  },
  {
    slug: "exabeam-fusion-siem",
    name: "Exabeam Fusion SIEM",
    best: "LogRhythm + Exabeam 2024 · UEBA Reference · SmartTimelines (Recommended #3)",
    strength:
      "The 2024 merger of LogRhythm (compliance, 2003) and Exabeam (UEBA pioneer, 2013). SmartTimelines auto-reconstruct attacker journeys in minutes. The LogRhythm brand was retired; existing customers are migrating to Exabeam Fusion SIEM.",
    watch:
      "Best for mature SOC teams prioritising analyst workflow efficiency and UEBA-led detection.",
    logo: "",
  },
  {
    slug: "microsoft-sentinel",
    name: "Microsoft Sentinel",
    best: "Azure-Native · M365 Integration Leader (Strong)",
    strength:
      "Natural for organisations deeply invested in Microsoft 365, Azure, and Defender XDR. Pay-per-GB pricing can escalate; less suited for heterogeneous multi-vendor environments.",
    watch: "Best for Microsoft M365 and Azure-first organisations.",
    logo: "/logos/MicrosoftDefender.webp",
  },
  {
    slug: "ibm-qradar",
    name: "IBM QRadar SIEM",
    best: "On-Premises Reference · Air-Gap Capable (Sovereign)",
    strength:
      "On-premises SIEM reference for large enterprises with air-gap or data sovereignty requirements, relevant for UAE federal government and NESA-classified environments. Longest time to value; highest professional services investment.",
    watch: "Best for sovereign, air-gapped environments with dedicated SIEM engineering.",
    logo: "/logos/IBM-Security.png",
  },
  {
    slug: "sophos-mdr",
    name: "Secureworks Taegis XDR",
    best: "Managed Service · CTU Threat Intel · Not Self-Operated (Managed XDR)",
    strength:
      "Not a self-operated SIEM, a managed XDR where Secureworks CTU provides 24/7 detection. See our MDR coverage for the full analysis including the Sophos plus Secureworks partnership.",
    watch: "Best for organisations wanting managed security outcomes over self-operated SIEM.",
    logo: "/logos/sophos.svg",
  },
];

/* ───────── PLATFORM CAPABILITIES IN DEPTH (folded-in vendor profiles) ───────── */

type DeepDive = {
  rank: string;
  name: string;
  tagline: string;
  featured?: boolean;
  specs: { label: string; value: string }[];
  capabilities: { title: string; desc: string }[];
  shortlist: string[];
  note?: { title: string; body: string };
};

const vendorDeepDive: DeepDive[] = [
  {
    rank: "Recommended",
    name: "Rapid7 InsightIDR",
    tagline: "Cloud-native SIEM + UEBA + XDR. User-based pricing. Detection live in hours, not months.",
    featured: true,
    specs: [
      { label: "Deployment", value: "Cloud-native SaaS, no on-prem server" },
      { label: "Pricing", value: "Per user / asset, no per-GB surprise" },
      { label: "Time to value", value: "Hours to days, detection day one" },
      { label: "UEBA", value: "Native Attacker Behavior Analytics" },
      { label: "Threat intel", value: "Rapid7 Threat Command (IntSights)" },
      { label: "MDR overlay", value: "Optional Rapid7 MDR, same platform" },
    ],
    capabilities: [
      {
        title: "Attacker Behavior Analytics (ABA)",
        desc: "Pre-trained on attacker TTPs mapped to MITRE ATT&CK. Active from day one, detecting credential-based attacks, lateral movement, privilege escalation and data exfiltration without analyst-written correlation rules.",
      },
      {
        title: "UEBA, user and entity behaviour analytics",
        desc: "Every user and entity gets a risk score based on continuous behavioural baselining. Deviations from normal (unfamiliar login locations, unusual data volumes) surface as prioritised alerts with full context.",
      },
      {
        title: "Deception technology, honey credentials and files",
        desc: "Deploys honeypot credentials, honey files and honey users across your environment. Any interaction is a near-zero-false-positive indicator of attacker presence, included at no extra cost, not an add-on module.",
      },
      {
        title: "Cloud-native architecture, no infrastructure tax",
        desc: "No on-premises SIEM servers, no storage infrastructure, no performance degradation as log volumes grow. Lower total cost of ownership for UAE organisations that do not want to run SIEM infrastructure.",
      },
      {
        title: "User-based pricing, predictable budget",
        desc: "Priced per user (or per asset), not per GB of log data. As cloud and application log volumes grow, InsightIDR's cost does not grow in proportion, unlike Splunk where log volume directly drives cost escalation.",
      },
      {
        title: "Pre-built compliance reports",
        desc: "Pre-built dashboards for PCI DSS, HIPAA, ISO 27001 and GDPR. Artiflex IT configures UAE-specific compliance use-cases (NESA, CBUAE) as part of the deployment engagement.",
      },
      {
        title: "Optional Rapid7 MDR overlay",
        desc: "For 24/7 managed detection on top of InsightIDR, Rapid7 MDR provides a managed SOC on the same platform, same data, same interface, managed by Rapid7's SOC analysts with IR team access.",
      },
    ],
    shortlist: [
      "UAE SMB to enterprise seeking cloud-native SIEM with fast time to value and no on-premises infrastructure.",
      "Security teams that need active UEBA-driven detection from day one without months of tuning.",
      "Organisations where log volume is high or difficult to predict and Splunk's per-GB model creates budget risk.",
      "Teams building toward 24/7 SOC capability who want a SIEM that grows into Rapid7 MDR without migration.",
      "UAE regulated industries needing pre-built reporting for NESA, CBUAE, PCI DSS and ISO 27001.",
    ],
  },
  {
    rank: "Recommended",
    name: "Cisco Splunk Enterprise Security",
    tagline: "Enterprise SIEM reference. Cisco Talos threat intel. Deepest connector library. High-volume specialist.",
    specs: [
      { label: "Founded", value: "2003, Cisco acquired 2024 ($28B)" },
      { label: "Deployment", value: "Cloud, on-prem, hybrid" },
      { label: "Pricing", value: "Per GB ingested, costly at scale" },
      { label: "Threat intel", value: "Cisco Talos, 250+ researchers" },
      { label: "Integrations", value: "1,000+ connectors, deepest library" },
      { label: "PS investment", value: "Significant professional services" },
    ],
    capabilities: [
      {
        title: "Cisco Talos threat intelligence integration",
        desc: "Following Cisco's 2024 acquisition, Splunk ES integrates with Cisco Talos, 250+ researchers tracking threat actors globally. Talos feeds enrich Splunk detections with adversary-specific IOCs, TTPs and campaign intelligence.",
      },
      {
        title: "SPL, unmatched query depth",
        desc: "Splunk's SPL is the most powerful log search language in the SIEM market. For threat hunting and custom detection, SPL lets analysts ask any question of their data, including complex statistical analyses and ML model applications.",
      },
      {
        title: "Deepest connector library in the market",
        desc: "1,000+ pre-built connectors cover virtually every security product, cloud platform, application and network device in enterprise use, unmatched breadth of native integration for heterogeneous environments.",
      },
      {
        title: "Splunk SOAR, automated response",
        desc: "Splunk SOAR (formerly Phantom) provides enterprise-grade SOAR natively integrated with Splunk ES, the most mature SOAR integration in the SIEM market for automated incident response playbooks.",
      },
      {
        title: "Largest compliance framework library",
        desc: "Splunk ES includes the largest compliance framework content library in the SIEM market, PCI DSS, SOX, HIPAA, ISO 27001, NIST CSF and CIS Controls, with pre-built dashboards, reports and correlation searches.",
      },
    ],
    shortlist: [
      "Large UAE enterprise with dedicated SIEM engineering (2+ full-time Splunk engineers) and high daily log volumes.",
      "Cisco-heavy network environments where Talos intel and Cisco telemetry provide materially better detection.",
      "Organisations with existing Splunk investment evolving toward the Cisco Security Cloud vision.",
      "Large SOC teams that need Splunk's SPL query depth for advanced threat hunting.",
    ],
    note: {
      title: "The Splunk cost reality",
      body: "Splunk's per-GB ingest pricing means cost grows in direct proportion to log volume. UAE enterprises at high volumes (1TB+/day) regularly see annual costs exceed USD 500K to 1M+, plus USD 200 to 500K of first-year professional services. Where the budget is justified Splunk is outstanding; where it is not, Rapid7 InsightIDR delivers 70 to 80 percent of the detection capability at 20 to 30 percent of the cost.",
    },
  },
  {
    rank: "Recommended",
    name: "Exabeam Fusion SIEM",
    tagline: "LogRhythm + Exabeam 2024 merger. Industry-leading UEBA. SmartTimelines. Compliance automation heritage.",
    specs: [
      { label: "Heritage", value: "LogRhythm 2003 + Exabeam 2013, merged 2024" },
      { label: "Deployment", value: "SaaS + on-premises editions" },
      { label: "UEBA", value: "SmartTimelines, analyst workflow" },
      { label: "Compliance", value: "LogRhythm regulated-industry heritage" },
      { label: "Pricing", value: "User + EPS hybrid, predictable" },
      { label: "LogRhythm", value: "Active, migrating to Exabeam Fusion" },
    ],
    capabilities: [
      {
        title: "SmartTimelines, the industry's best investigation workflow",
        desc: "Automatically reconstructs the complete timeline of an incident, from the first anomaly through every subsequent action across all sessions, systems and data sources. What takes analysts 4 to 8 hours manually, SmartTimelines assembles in minutes.",
      },
      {
        title: "Industry-leading UEBA, behavioural baselining at scale",
        desc: "Builds individual behavioural baselines for every user and entity using ML models trained on peer-group behaviour. Deviations generate a risk score that prioritises analyst attention to the highest-risk accounts.",
      },
      {
        title: "LogRhythm compliance automation heritage",
        desc: "LogRhythm's 20-year focus on compliance-driven deployments in financial services, healthcare and government is now part of Exabeam Fusion. Pre-built frameworks for PCI DSS, HIPAA, SOX, ISO 27001 and NIST CSF with automated evidence generation.",
      },
      {
        title: "Case management built in",
        desc: "Built-in case management for SOC analysts to manage incidents, document investigation steps, assign tasks and track resolution within the SIEM, without a separate ticketing system for day-to-day operations.",
      },
      {
        title: "Cloud-native SaaS edition",
        desc: "The Exabeam Fusion SaaS edition eliminates the on-premises infrastructure burden of legacy LogRhythm deployments, providing a significantly accelerated deployment path.",
      },
    ],
    shortlist: [
      "Mature SOC teams prioritising analyst workflow efficiency and UEBA-led detection to reduce mean time to investigate.",
      "Regulated industries with strong LogRhythm compliance requirements migrating to Exabeam Fusion SIEM.",
      "Organisations needing industry-leading UEBA depth for insider threat and compromised credential scenarios.",
      "Mid-market to enterprise UAE deployments with in-house SOC teams to leverage the UEBA and workflow advantages.",
    ],
  },
];

/* ───────── VENDOR MATRIX (BUYER'S MATRIX) ───────── */

const matrixVendors = [
  { name: "Rapid7 InsightIDR", rank: "#1", featured: true, recommended: true },
  { name: "Cisco Splunk ES", recommended: true },
  { name: "Exabeam Fusion SIEM", recommended: true },
  { name: "Microsoft Sentinel" },
];

type StarCell = { stars: number; note: string };
type VerdictCell = { recommended?: boolean; rank?: string; text: string };
type MatrixRow =
  | { label: string; type: "text"; cells: string[] }
  | { label: string; type: "stars"; cells: StarCell[] }
  | { label: string; type: "verdict"; cells: VerdictCell[] };

const matrixRows: MatrixRow[] = [
  {
    label: "Heritage",
    type: "text",
    cells: [
      "Cloud-native SIEM plus XDR. InsightIDR 2015. Disrupts legacy SIEM pricing.",
      "Splunk 2003; Cisco acquired 2024 for $28B. Enterprise reference plus Talos intel.",
      "LogRhythm (2003) plus Exabeam (2013) merged 2024. UEBA and compliance leader.",
      "Azure-native. Deep M365 and Defender XDR integration. 2019.",
    ],
  },
  {
    label: "Deployment",
    type: "text",
    cells: [
      "Cloud-native SaaS. No on-prem server required.",
      "Cloud (Splunk Cloud), on-prem, or hybrid.",
      "SaaS plus on-premises editions.",
      "Cloud-native Azure. On-prem via Azure Arc.",
    ],
  },
  {
    label: "Pricing model",
    type: "text",
    cells: [
      "User-based. No per-GB log shock. Most transparent pricing in market.",
      "Data ingest (GB/day). Very expensive at high volumes.",
      "User plus EPS hybrid. More predictable than Splunk.",
      "Pay-per-GB. Can escalate significantly with cloud logs.",
    ],
  },
  {
    label: "UEBA / ML",
    type: "stars",
    cells: [
      { stars: 5, note: "Attacker Behavior Analytics native. Industry-leading." },
      { stars: 4, note: "MLTK plus ES analytics. Requires tuning." },
      { stars: 5, note: "SmartTimelines plus UEBA. Category-defining." },
      { stars: 4, note: "Azure ML plus Entra ID UEBA." },
    ],
  },
  {
    label: "Time to value",
    type: "stars",
    cells: [
      { stars: 5, note: "Detection live in hours. Cloud-native." },
      { stars: 2, note: "Months to deploy and tune." },
      { stars: 3, note: "SaaS faster; on-prem 1 to 3 months." },
      { stars: 4, note: "Fast for M365. Complex otherwise." },
    ],
  },
  {
    label: "UAE support",
    type: "stars",
    cells: [
      { stars: 4, note: "Via Artiflex IT, in-country, Arabic and English." },
      { stars: 5, note: "Cisco UAE direct. Mature channel." },
      { stars: 3, note: "Growing ME channel post-merger." },
      { stars: 5, note: "Microsoft UAE direct office." },
    ],
  },
  {
    label: "Strategic Verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "Best overall value for UAE. Cloud-native, UEBA from day one, user-based pricing, optional MDR overlay." },
      { recommended: true, text: "Enterprise reference. Deepest query and connectors; best for high-volume, Cisco-heavy estates." },
      { recommended: true, text: "Analyst-workflow leader. SmartTimelines and category-defining UEBA for mature SOC teams." },
      { text: "Strong for Microsoft 365 and Azure-first estates; pay-per-GB can escalate on heterogeneous stacks." },
    ],
  },
];

/* ───────── GARTNER-STYLE CAPABILITY SCORECARD ───────── */

const featureVendors = ["Rapid7 InsightIDR", "Cisco Splunk", "Exabeam Fusion", "MS Sentinel"];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "limited";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "Log aggregation & normalisation",
    cells: [
      { tier: "best", note: "User-based, no ingest penalty" },
      { tier: "best", note: "Largest connector library" },
      { tier: "excellent", note: "Strong normalisation engine" },
      { tier: "veryStrong", note: "Native M365; others via hub" },
    ],
  },
  {
    label: "UEBA / ML detection",
    cells: [
      { tier: "best", note: "Attacker Behavior Analytics native" },
      { tier: "veryStrong", note: "MLTK plus ES analytics" },
      { tier: "best", note: "SmartTimelines / UEBA reference" },
      { tier: "veryStrong", note: "Azure ML plus Entra ID UEBA" },
    ],
  },
  {
    label: "Time to value",
    cells: [
      { tier: "best", note: "Hours to detection, cloud-native" },
      { tier: "limited", note: "Months to deploy plus tune" },
      { tier: "strong", note: "SaaS faster; on-prem months" },
      { tier: "veryStrong", note: "Fast for M365, complex otherwise" },
    ],
  },
  {
    label: "Cost predictability",
    cells: [
      { tier: "best", note: "User-based, zero volume surprises" },
      { tier: "limited", note: "Ingest-based; very expensive at scale" },
      { tier: "strong", note: "User plus EPS hybrid" },
      { tier: "strong", note: "GB-based; can escalate" },
    ],
  },
  {
    label: "UAE compliance reporting",
    cells: [
      { tier: "best", note: "PCI / HIPAA / ISO plus NESA configuration" },
      { tier: "best", note: "Largest framework library" },
      { tier: "best", note: "LogRhythm compliance heritage" },
      { tier: "veryStrong", note: "Good M365 compliance" },
    ],
  },
];

const tierStyles: Record<Tier, { bg: string; text: string; label: string }> = {
  best: { bg: "bg-emerald-600", text: "text-white", label: "Best in Class" },
  excellent: { bg: "bg-emerald-500", text: "text-white", label: "Excellent" },
  veryStrong: { bg: "bg-sky-200", text: "text-sky-900", label: "Very Strong" },
  strong: { bg: "bg-slate-200", text: "text-slate-800", label: "Strong" },
  limited: { bg: "bg-rose-200", text: "text-rose-900", label: "Limited" },
};

/* ───────── DELIVERY MODEL ───────── */

const deliveryStages = [
  {
    title: "Assess",
    duration: "1–2 weeks",
    summary:
      "Log source inventory, SOC maturity assessment, compliance mapping, and an honest MDR-vs-SIEM recommendation before we quote.",
    deliverable:
      "Current-state report, SIEM or MDR recommendation with TCO, deployment architecture options.",
  },
  {
    title: "Design",
    duration: "1–2 weeks",
    summary:
      "Log source prioritisation, data model, MITRE ATT&CK use-case library, compliance framework mapping and RBAC model.",
    deliverable:
      "Approved architecture, use-case charter, compliance framework alignment document.",
  },
  {
    title: "Deploy",
    duration: "2–6 weeks",
    summary:
      "Phased log source onboarding, detection rule activation, analyst training, and first compliance evidence pack at go-live.",
    deliverable:
      "Live SIEM with baseline detection, runbooks, trained analysts, first audit pack.",
  },
  {
    title: "Optimise",
    duration: "Ongoing",
    summary:
      "Monthly use-case tuning, false positive reduction, threat intel refresh, quarterly compliance packs for NESA, CBUAE and PCI DSS.",
    deliverable:
      "Continuously improving SIEM. Quarterly compliance packs delivered on schedule.",
  },
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "Do we need SIEM if we already have a firewall and endpoint protection?",
    answer:
      "Firewalls and endpoint protection generate the logs; they do not correlate across each other. SIEM aggregates logs from firewalls, endpoints, cloud and identity into one place, correlates events no single tool can see alone (for example a failed login followed by a successful login from a new country and a large data transfer), and produces the audit evidence regulators expect. If you have 24/7 analysts to act on the alerts, SIEM is the right next layer; if you do not, evaluate MDR first.",
  },
  {
    question: "Why is Rapid7 InsightIDR your top pick over Splunk?",
    answer:
      "For most UAE organisations InsightIDR delivers detection live in hours rather than months, native UEBA from day one, and user-based pricing that removes the per-GB ingest shock. Splunk is outstanding at very high log volumes with a dedicated SIEM engineering team, but its ingest-based pricing and long time to value make it the wrong default for mid-market and most enterprise estates. InsightIDR delivers roughly 70 to 80 percent of Splunk's detection capability at 20 to 30 percent of the cost for typical UAE log volumes.",
  },
  {
    question: "What happened to LogRhythm?",
    answer:
      "LogRhythm (founded 2003) merged with Exabeam (founded 2013) in 2024. The LogRhythm brand was retired and existing customers are migrating to the combined Exabeam Fusion SIEM platform, which keeps LogRhythm's compliance automation heritage and adds Exabeam's industry-leading UEBA and SmartTimelines.",
  },
  {
    question: "Can SIEM meet NESA and CBUAE compliance requirements?",
    answer:
      "Yes. Our recommended platforms ship pre-built dashboards for PCI DSS, ISO 27001 and HIPAA, and we configure UAE-specific NESA and CBUAE use-cases as part of the deployment. Automated quarterly evidence packs reduce audit preparation from weeks to hours.",
  },
  {
    question: "How long does a SIEM deployment take?",
    answer:
      "Assessment runs one to two weeks, design one to two weeks, and phased deployment two to six weeks depending on log sources and platform. Cloud-native InsightIDR reaches live detection in hours to days; on-premises platforms such as QRadar take materially longer.",
  },
];

/* ───────── HERO ───────── */

function SiemHero() {
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
                <span className="font-medium text-[#28B5E1]">SIEM</span>
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
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#28B5E1] sm:text-xs">
            Security Operations · Log Management · Threat Detection
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-5xl lg:text-[3.5rem]">
            SIEM:{" "}
            <span className="gradient-text">Security Information</span>
            <span className="block">& Event Management</span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            SIEM connects logs from every device, correlates events across sources, and surfaces threats no single tool can see alone. But first, one critical question every UAE organisation must answer before buying one.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#vendor-comparison"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base"
            >
              Vendor Comparison
            </a>
            <a
              href="#gartner-comparison"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base"
            >
              Gartner-style Review
            </a>
            <Link
              to="/blog/origin-siem"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base"
            >
              Read Origin Story
            </Link>
            <button
              onClick={openContact}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base"
            >
              Free SIEM / SOC Assessment
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

export default function SecurityOperationsSiem() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>SIEM (Security Information & Event Management) UAE | Vendor Comparison & Gartner-style Scorecard | Artiflex IT</title>
        <meta
          name="description"
          content="UAE SIEM buyer's guide. Vendor comparison and Gartner-style scorecard across Rapid7 InsightIDR (our top pick), Cisco Splunk Enterprise Security, Exabeam Fusion SIEM, Microsoft Sentinel, IBM QRadar and Secureworks Taegis XDR. Log management, threat detection and compliance for UAE SOCs."
        />
        <link rel="canonical" href="https://artiflexit.com/cybersecurity/security-operations/siem" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "SIEM (Security Information and Event Management)",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description":
              "UAE SIEM delivery across Rapid7 InsightIDR, Cisco Splunk Enterprise Security, Exabeam Fusion SIEM, Microsoft Sentinel, IBM QRadar and Secureworks Taegis XDR: log aggregation, UEBA detection, compliance reporting and managed SOC outcomes.",
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
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "SIEM Platforms for UAE Buyers",
            "itemListElement": vendors.map((v, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <SiemHero />

      {/* ───────── SIEM PLATFORMS WE DEPLOY (LINEUP) ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-14 sm:py-16">
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
          <p className="text-center font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
            SIEM Platforms We Deploy and Support, UAE & Middle East
          </p>

          {/* Honeycomb (large screens) */}
          <div className="mt-12 hidden flex-col items-center lg:flex">
            {(() => {
              const layouts: Record<number, number[]> = {
                1: [1], 2: [2], 3: [3], 4: [3, 1], 5: [3, 2],
                6: [3, 3], 7: [4, 3], 8: [4, 4], 9: [5, 4],
                10: [5, 5], 11: [6, 5], 12: [6, 6],
              };
              const sizes =
                layouts[siemPlatforms.length] ??
                [Math.ceil(siemPlatforms.length / 2), Math.floor(siemPlatforms.length / 2)];
              const rows: typeof siemPlatforms[] = [];
              let i = 0;
              sizes.forEach((s) => {
                rows.push(siemPlatforms.slice(i, i + s));
                i += s;
              });
              const HEX_PATH =
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
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
                  {row.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/cybersecurity/security-operations/siem/${p.slug}`}
                      aria-label={`View ${p.name} details`}
                      className="group relative block h-[208px] w-[180px] transition-all duration-300 hover:z-10 hover:scale-[1.06] [filter:drop-shadow(0_4px_12px_rgba(15,23,42,0.10))] hover:[filter:drop-shadow(0_10px_30px_rgba(40,181,225,0.45))]"
                    >
                      <div
                        className="absolute inset-0 bg-slate-200/80 transition-colors duration-300 group-hover:bg-[#28B5E1]"
                        style={{ clipPath: HEX_PATH }}
                      />
                      <div
                        className="absolute inset-[2px] bg-white transition-all duration-300 group-hover:bg-gradient-to-b group-hover:from-[#28B5E1]/[0.08] group-hover:to-white"
                        style={{ clipPath: HEX_PATH }}
                      />
                      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
                        {p.logo ? (
                          <img
                            src={p.logo}
                            alt={p.name}
                            loading="lazy"
                            className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-110"
                          />
                        ) : (
                          <span className="px-2 text-center font-display text-sm font-semibold leading-tight text-slate-900">
                            {p.name}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ));
            })()}
          </div>

          {/* Card grid (mobile / tablet fallback) */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:hidden">
            {siemPlatforms.map((p) => (
              <Link
                key={p.slug}
                to={`/cybersecurity/security-operations/siem/${p.slug}`}
                className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/50 hover:shadow-md"
              >
                {p.logo ? (
                  <img
                    src={p.logo}
                    alt={p.name}
                    loading="lazy"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      img.style.display = "none";
                      const fb = img.nextElementSibling as HTMLElement | null;
                      if (fb) fb.style.removeProperty("display");
                    }}
                    className="h-12 w-12 object-contain"
                  />
                ) : null}
                <p
                  className="font-display text-[11px] font-semibold leading-tight text-slate-900"
                  style={{ display: p.logo ? "none" : "block" }}
                >
                  {p.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── READ THIS BEFORE BUYING (MDR vs SIEM) ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              <span aria-hidden>⚠</span> Read This Before Buying a SIEM
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Does your organisation have 24/7 analysts to act on SIEM alerts?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              A SIEM that generates alerts no-one reads does not make you more secure, it creates a false sense of security. Answer this honestly before shortlisting platforms.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            {decisionPaths.map((d) => (
              <article
                key={d.badge}
                className={`relative overflow-hidden rounded-2xl border p-6 shadow-sm sm:p-8 ${
                  d.tone === "warn"
                    ? "border-amber-200 bg-amber-50/60"
                    : "border-emerald-200 bg-emerald-50/60"
                }`}
              >
                <h3
                  className={`flex items-center gap-2 font-display text-lg font-bold ${
                    d.tone === "warn" ? "text-amber-900" : "text-emerald-900"
                  }`}
                >
                  <span aria-hidden>{d.tone === "warn" ? "🚫" : "✅"}</span>
                  {d.badge}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                  {d.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── WHAT GOOD SIEM DELIVERS ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.06),transparent_60%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              What SIEM Delivers
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              What good SIEM actually delivers
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Compliance and detection are equally important outcomes. These capabilities separate effective SIEM deployments from expensive log archives.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {siemCapabilities.map((c) => (
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
        </div>
      </section>

      {/* ───────── SELECTION FRAMEWORK ───────── */}
      <section id="selection" className="relative scroll-mt-20 bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              The Questions We Ask Before Recommending
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Selection framework for SIEM buyers
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The right SIEM falls out of six honest questions. We ask these before quoting anything.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
            {selectionFramework.map((q) => (
              <article
                key={q.step}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1B8AC7]/40 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#045891] to-[#1B8AC7] font-display text-sm font-bold text-white">
                    {q.step}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-slate-900">
                      {q.question}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{q.desc}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── VENDOR COMPARISON, BUYER'S MATRIX ───────── */}
      <section
        id="vendor-comparison"
        className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24"
      >
        <div className="shell">
          <div className="mb-8 text-center sm:mb-10">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              Vendor Comparison for SIEM Buyers
            </p>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-2xl font-bold tracking-tight text-heading sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              Vendor comparison for{" "}
              <span className="gradient-text">SIEM buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              Artiflex deploys and manages all platforms listed. We suggest the fit that matches your environment, SOC capacity, and budget, not our preferred SKU.
            </p>
          </div>

          <div className="mt-8 flex justify-center sm:mt-10">
            <button
              onClick={openContact}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base"
            >
              Talk to our Consultant
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

          <div className="mt-12 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + matrixVendors.length * 116) }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-5 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">
                      Criteria
                    </th>
                    {matrixVendors.map((v) => (
                      <th
                        key={v.name}
                        className={`border-l border-white/15 px-2 py-3 sm:px-4 sm:py-5 align-bottom ${
                          v.featured ? "bg-white/10" : ""
                        }`}
                      >
                        {v.recommended && (
                          <span className="mb-1.5 inline-flex items-center gap-1 rounded-full border border-emerald-300/40 bg-emerald-400/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-100">
                            ✓ Recommended
                          </span>
                        )}
                        <p className="font-display text-sm font-semibold text-white sm:text-base">
                          {v.name}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrixRows.map((row, rIdx) => (
                    <tr
                      key={row.label}
                      className={`transition-colors ${
                        row.type === "verdict"
                          ? "border-t-2 border-[#28B5E1]/30 bg-gradient-to-r from-[#04101E] to-[#0A3D6B]"
                          : `border-t border-[#0A3D6B]/20 hover:bg-[#28B5E1]/[0.04] ${
                              rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                            }`
                      }`}
                    >
                      <th
                        scope="row"
                        className={`sticky left-0 z-10 px-2 py-3 align-middle sm:px-4 sm:py-4 font-display text-sm font-semibold ${
                          row.type === "verdict"
                            ? "bg-[#04101E] uppercase tracking-wider text-[#28B5E1]"
                            : `${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"} text-slate-900`
                        }`}
                      >
                        {row.label}
                      </th>
                      {row.cells.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`px-4 py-4 align-middle ${
                            row.type === "verdict"
                              ? "border-l border-white/10 text-slate-300"
                              : `border-l border-[#0A3D6B]/20 text-slate-700 ${cIdx === 0 ? "bg-[#28B5E1]/[0.04]" : ""}`
                          }`}
                        >
                          {row.type === "stars" ? (
                            <div>
                              <span aria-label={`${(cell as StarCell).stars} out of 5`} className="text-amber-500">
                                {"★".repeat((cell as StarCell).stars)}
                                <span className="text-slate-300">
                                  {"★".repeat(5 - (cell as StarCell).stars)}
                                </span>
                              </span>
                              <p className="mt-1 text-xs leading-snug text-slate-600">
                                {(cell as StarCell).note}
                              </p>
                            </div>
                          ) : row.type === "verdict" ? (
                            <div className="space-y-1.5">
                              {(cell as VerdictCell).recommended && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                                  ✓ Recommended
                                </span>
                              )}
                              <p className="text-xs leading-relaxed text-slate-300">
                                {(cell as VerdictCell).text}
                              </p>
                            </div>
                          ) : (
                            <p className="text-xs leading-snug text-slate-700">
                              {cell as string}
                            </p>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── DETAILED VENDOR CARDS & FEATURE RATINGS ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              Detailed Platform Analysis
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Detailed comparison on SIEM vendors
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Strengths, limitations, and the buyer profile each platform was built for. Recommendations are based on UAE deployment patterns, not vendor tier.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:mt-16 lg:grid-cols-2 lg:items-stretch">
            {vendors.map((v, idx) => {
              const recommended = v.best.includes("Recommended");
              const top = v.best.includes("#1");
              return (
                <motion.div
                  key={v.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="flex h-full"
                >
                  <div
                    className={`group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(4,88,145,0.12)] sm:p-8 ${
                      top
                        ? "border-[#28B5E1]/50 shadow-[0_4px_24px_rgba(40,181,225,0.16)]"
                        : recommended
                        ? "border-brand-blue/30 shadow-[0_4px_20px_rgba(27,138,199,0.10)]"
                        : "border-border-light shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-brand-blue/25"
                    }`}
                  >
                    {(recommended || top) && (
                      <span
                        className={`absolute -top-px left-6 inline-flex rounded-b-md px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white ${
                          top ? "bg-gradient-to-r from-[#045891] to-[#28B5E1]" : "bg-brand-blue"
                        }`}
                        aria-label="Recommended vendor"
                      >
                        {top ? "Recommended" : "✓ Recommended"}
                      </span>
                    )}

                    <div className="flex items-start justify-between gap-4 pt-3">
                      <div className="min-w-0">
                        <h3 className="font-display text-xl font-bold text-heading transition-colors group-hover:text-brand-blue sm:text-2xl">
                          {v.name}
                        </h3>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-brand-blue">
                          {v.best.replace(/\s*#\d+/, "")}
                        </p>
                      </div>
                      {v.logo && (
                        <img
                          src={v.logo}
                          alt={`${v.name} logo`}
                          loading="lazy"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                          }}
                          className="h-10 w-24 shrink-0 object-contain object-right sm:h-12 sm:w-32"
                        />
                      )}
                    </div>

                    <div className="mt-5 flex-1 space-y-3">
                      <div>
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                          Strengths
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-body">
                          {v.strength}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                          Best for
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-body/80">
                          {v.watch}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Platform capabilities in depth */}
          <div className="mx-auto mt-20 max-w-6xl sm:mt-28">
            <div className="mx-auto max-w-4xl text-center">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
                Platform Capabilities
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                The top three, in depth
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                Why our top three SIEM recommendations earn their ranking, with the platform capabilities and the buyer profile each was built for.
              </p>
            </div>

            <div className="mt-12 space-y-8">
              {vendorDeepDive.map((d) => (
                <article
                  key={d.name}
                  className={`overflow-hidden rounded-2xl border bg-white shadow-sm ${
                    d.featured ? "border-[#28B5E1]/50 shadow-[0_4px_24px_rgba(40,181,225,0.12)]" : "border-slate-200"
                  }`}
                >
                  {/* header */}
                  <div className="border-b border-slate-100 bg-gradient-to-r from-[#04101E] to-[#0A3D6B] px-6 py-6 sm:px-8">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#28B5E1]/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#28B5E1]">
                      {d.featured && <span aria-hidden>⭐ </span>}
                      {d.rank}
                    </span>
                    <h3 className="mt-3 font-display text-xl font-bold text-white sm:text-2xl">
                      {d.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{d.tagline}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {d.specs.map((s) => (
                        <span
                          key={s.label}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-slate-200"
                        >
                          <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-[#28B5E1]">
                            {s.label}
                          </span>
                          <span className="text-slate-300">{s.value}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* body */}
                  <div className="grid gap-6 px-6 py-6 sm:px-8 sm:py-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                        Platform capabilities
                      </p>
                      <ul className="mt-4 space-y-4">
                        {d.capabilities.map((c) => (
                          <li key={c.title} className="flex gap-3">
                            <span aria-hidden className="mt-0.5 text-emerald-500">✓</span>
                            <div>
                              <p className="font-display text-sm font-bold text-slate-900">{c.title}</p>
                              <p className="mt-1 text-sm leading-relaxed text-slate-600">{c.desc}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                        Who should shortlist this
                      </p>
                      <ul className="mt-4 space-y-2.5">
                        {d.shortlist.map((s) => (
                          <li key={s} className="flex items-start gap-2 text-sm leading-relaxed text-slate-600">
                            <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1B8AC7]" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                      {d.note && (
                        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50/70 p-4">
                          <p className="font-display text-sm font-bold text-amber-900">{d.note.title}</p>
                          <p className="mt-1.5 text-xs leading-relaxed text-amber-900/80">{d.note.body}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Feature ratings */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              Gartner-style Capability Comparison
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style SIEM capability scorecard
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each platform is rated across the capabilities that matter most for UAE SIEM buyers, using a standardised tier scale. A gold ★ marker denotes best-in-class performance.
            </p>
          </div>

          {/* Legend (top) */}
          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-3 text-xs text-slate-600">
            {(["best", "excellent", "veryStrong", "strong", "limited"] as Tier[]).map((t) => {
              const s = tierStyles[t];
              return (
                <span
                  key={t}
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${s.bg} ${s.text}`}
                >
                  {t === "best" && <span aria-hidden="true">★</span>}
                  {s.label}
                </span>
              );
            })}
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + featureVendors.length * 116) }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-5 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">
                      Capability
                    </th>
                    {featureVendors.map((v, i) => (
                      <th
                        key={v}
                        className={`border-l border-white/15 px-2 py-3 sm:px-4 sm:py-5 align-bottom font-display text-sm font-semibold text-white sm:text-base ${
                          i === 0 ? "bg-white/10" : ""
                        }`}
                      >
                        {v}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {featureRows.map((row, rIdx) => (
                    <tr
                      key={row.label}
                      className={`border-t border-[#0A3D6B]/20 transition-colors hover:bg-[#28B5E1]/[0.04] ${
                        rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                      }`}
                    >
                      <th
                        scope="row"
                        className={`sticky left-0 z-10 px-2 py-3 align-middle sm:px-4 sm:py-4 font-display text-sm font-semibold text-slate-900 ${
                          rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"
                        }`}
                      >
                        {row.label}
                      </th>
                      {row.cells.map((cell, cIdx) => {
                        const t = tierStyles[cell.tier];
                        return (
                          <td
                            key={cIdx}
                            className={`border-l border-[#0A3D6B]/20 px-2 py-3 sm:px-4 sm:py-4 align-middle ${
                              cIdx === 0 ? "bg-[#28B5E1]/[0.04]" : ""
                            }`}
                          >
                            <span
                              className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${t.bg} ${t.text}`}
                            >
                              {cell.tier === "best" && <span aria-hidden="true">★</span>}
                              {t.label}
                            </span>
                            <p className="mt-1.5 text-xs leading-snug text-slate-600">
                              {cell.note}
                            </p>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── HOW WE WORK, DELIVERY MODEL ───────── */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="How we work"
            title={
              <>
                Our SIEM <span className="gradient-text">delivery model</span>
              </>
            }
            description="We don't sell SIEM licences. We deliver security outcomes: detect faster, evidence cleaner, audit-ready quarterly."
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

      {/* ───────── FAQ ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Frequently Asked Questions"
            title={
              <>
                SIEM questions we <span className="gradient-text">hear most</span>
              </>
            }
            description="The questions UAE buyers ask us most about choosing, deploying and operating a SIEM."
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
        title="Get a Free SIEM / SOC Assessment"
        description="Free review covering your log sources, SOC maturity, compliance gaps, and an honest SIEM vs MDR recommendation, delivered by a UAE-based engineer in Arabic or English."
        primaryButton={{ text: "Book Free Assessment", action: "modal" }}
      />
    </>
  );
}
