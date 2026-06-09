import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";

/* ───────── MDR PLATFORMS WE DEPLOY (LINEUP) ───────── */

const mdrPlatforms = [
  { slug: "sophos-mdr", name: "Sophos MDR Complete", rank: "#1", featured: true, logo: "/logos/sophos.svg" },
  { slug: "secureworks", name: "Secureworks MXDR + Sophos", rank: "#2", logo: "" },
  { slug: "rapid7-mdr", name: "Rapid7 MDR", rank: "#3", logo: "/logos/rapid7.png" },
  { slug: "crowdstrike", name: "CrowdStrike Falcon Complete", logo: "/logos/CrowdStrike.webp" },
  { slug: "sentinelone", name: "SentinelOne Vigilance", logo: "/logos/SentinelOne.png" },
  { slug: "arctic-wolf", name: "Arctic Wolf MDR", logo: "/logos/arctic-wolf.png" },
  { slug: "microsoft", name: "Microsoft Defender MDR", logo: "/logos/MicrosoftDefender.webp" },
];

/* ───────── WHY MDR STATS + REASONS ───────── */

const mdrStats = [
  { value: "39K+", label: "Sophos MDR customers globally" },
  { value: "24/7", label: "SOC coverage without in-house staffing" },
  { value: "~15%", label: "Typical MDR cost vs building in-house SOC" },
  { value: "5–10", label: "Business days to operational MDR coverage" },
];

const mdrReasons = [
  {
    title: "24/7 Coverage Without the Staffing Cost",
    desc: "A credible in-house SOC requires 8 to 12 security analysts across three shifts, a SOC manager, a threat intel analyst and incident responders. MDR delivers this team at roughly 10 to 20 percent of equivalent in-house headcount cost.",
  },
  {
    title: "Response, Not Just Detection",
    desc: "MDR providers don't just alert you. They investigate, contain and respond, isolating compromised endpoints, blocking malicious IPs and neutralising threats before they escalate. The SOC acts, not just notifies.",
  },
  {
    title: "Continuous Proactive Threat Hunting",
    desc: "MDR teams proactively hunt for threats automated detection misses, using threat intelligence, adversary TTPs and your environment's telemetry to find attackers who deliberately evade automated tools.",
  },
  {
    title: "Predictable Cost, Proven ROI",
    desc: "Sophos MDR Complete for 500 users typically costs USD 80K to 150K annually, inclusive of 24/7 SOC, endpoint protection, threat hunting and incident response. Building equivalent in-house capability costs USD 1.2M to 2M in staff alone.",
  },
  {
    title: "Hours to Value, Not Months",
    desc: "MDR is operational within days of endpoint agent deployment. Building an effective in-house SIEM and SOC takes 12 to 18 months before reaching comparable detection effectiveness.",
  },
  {
    title: "Compliance-Ready Reporting",
    desc: "Sophos MDR delivers monthly threat reports, quarterly posture briefings and annual risk summaries aligned to NESA, CBUAE, PCI DSS and ISO 27001, documented evidence of active security management for your board and regulators.",
  },
];

/* ───────── SOPHOS + SECUREWORKS COMBO ───────── */

const comboCards = [
  {
    title: "World's Largest Pure-Play MDR Scale",
    desc: "The Sophos MDR SOC sees threat patterns across 39,000+ customer environments simultaneously. When a new attack campaign targets one customer, detection is immediately applied across all environments, scale that no in-house SOC can replicate.",
  },
  {
    title: "Secureworks Counter Threat Unit (CTU)",
    desc: "CTU tracks specific threat actors, their infrastructure and their campaigns. CTU intelligence adds adversary-specific depth to every detection and investigation, the deepest threat hunting intelligence available in the MDR market.",
  },
  {
    title: "Endpoint + Email + Cloud + Network",
    desc: "Sophos MDR Complete covers endpoint (Intercept X), email (Sophos Email), cloud (Sophos Cloud Optix) and network (Sophos NDR add-on), four coverage layers at mid-market MDR pricing, unique in the market.",
  },
  {
    title: "Guaranteed Response, Not Just Alerting",
    desc: "Sophos MDR Complete includes a guaranteed response commitment. Compromise containment, threat neutralisation and remediation guidance are delivered as part of the service, not as an add-on at extra cost.",
  },
];

/* ───────── SELECTION FRAMEWORK ───────── */

const selectionFramework = [
  {
    step: "1",
    question: "What is your current endpoint protection platform?",
    desc: "Existing Sophos customers: Sophos MDR Complete is the natural path. Existing SentinelOne customers: SentinelOne Vigilance. New customers: Sophos MDR Complete for best combined value.",
  },
  {
    step: "2",
    question: "Guaranteed response or detection + alerting?",
    desc: "Sophos MDR Complete, CrowdStrike Falcon Complete and Secureworks MXDR all offer genuine hands-on response. Confirm the response commitment in the contract before signing.",
  },
  {
    step: "3",
    question: "What is the realistic annual budget?",
    desc: "Sophos MDR Complete: USD 80 to 150K (500 users). Rapid7 MDR: USD 100 to 200K. CrowdStrike Falcon Complete: USD 200 to 500K+. Arctic Wolf: USD 200K+. Be realistic before shortlisting.",
  },
  {
    step: "4",
    question: "Coverage beyond endpoint, how important?",
    desc: "Sophos MDR Complete plus the NDR add-on is the only platform delivering endpoint, email, cloud and network at mid-market pricing. If all four matter equally, Sophos MDR is the only answer at this price tier.",
  },
  {
    step: "5",
    question: "Advanced threat intelligence required?",
    desc: "Secureworks CTU and CrowdStrike Intelligence are the deepest adversary-tracking threat intel in MDR. For UAE government, DIFC financial sector or critical infrastructure facing nation-state actors, this depth is the differentiator.",
  },
  {
    step: "6",
    question: "Microsoft-native coverage required?",
    desc: "Microsoft Security Experts is the only MDR that manages the full Microsoft Defender XDR suite natively. For M365 E5 customers, this is often the most cost-effective path to 24/7 coverage.",
  },
];

/* ───────── DETAILED COMPARISON CARDS ───────── */

const vendors = [
  {
    name: "Sophos MDR Complete",
    best: "World's Largest Pure-Play MDR · 39,000+ Customers (Recommended #1)",
    strength:
      "Our top MDR recommendation for UAE organisations of all sizes. 24/7 detection, investigation and guaranteed response. Coverage spans endpoint, email, cloud and network. As a Sophos Platinum Partner, Artiflex IT delivers with in-country UAE engineers, Arabic/English delivery and direct SOC escalation.",
    watch:
      "Best for UAE organisations of any size. The price, coverage breadth and scale combination is unmatched at this tier.",
    logo: "/logos/sophos.svg",
  },
  {
    name: "Secureworks MXDR",
    best: "CTU Threat Intel · World's Largest Pure-Play Cybersecurity (Recommended #2)",
    strength:
      "The Counter Threat Unit (CTU) provides proprietary adversary-tracking intelligence unique in the MDR market. Our preferred pairing with Sophos MDR for organisations facing sophisticated or nation-state threat environments.",
    watch:
      "Best for large enterprises facing sophisticated threat actors. Most compelling as a Sophos MDR + Secureworks MXDR combined engagement.",
    logo: "/logos/Secureworks.png",
  },
  {
    name: "Rapid7 MDR",
    best: "InsightIDR SIEM Backbone · IR Team Access (Recommended #3)",
    strength:
      "Built on InsightIDR (our top recommended SIEM), Rapid7 MDR adds a 24/7 managed SOC on the same platform, same data, same interface. Includes Rapid7 Threat Command threat intelligence and IR team access.",
    watch:
      "Best for organisations using or evaluating Rapid7 InsightIDR as their SIEM who want a managed overlay.",
    logo: "/logos/rapid7.png",
  },
  {
    name: "CrowdStrike Falcon Complete",
    best: "Industry-Leading Detection · Premium Pricing · Large Enterprise",
    strength:
      "Best-in-class detection speed and response. The trade-off: USD 200 to 500K+ annually. For most UAE mid-market, Sophos MDR delivers 80 to 90 percent of the outcome at 40 to 60 percent of the cost. The right answer only when budget is not the constraint and the threat profile is sophisticated.",
    watch: "Best for large enterprise only with appropriate budget and a sophisticated threat profile.",
    logo: "/logos/CrowdStrike.webp",
  },
  {
    name: "SentinelOne Vigilance MDR",
    best: "Singularity XDR · AI Autonomous Response (Strong)",
    strength:
      "Strong AI autonomous containment capability, SentinelOne can isolate threats without waiting for an analyst. Coverage breadth beyond endpoint is expanding but not yet as broad as Sophos MDR Complete.",
    watch: "Best for existing SentinelOne endpoint customers wanting a managed SOC layer.",
    logo: "/logos/SentinelOne.png",
  },
  {
    name: "Arctic Wolf MDR",
    best: "Concierge Security · Named Analysts · Premium / Large Enterprise",
    strength:
      "Arctic Wolf's named Concierge analyst model is genuinely differentiated and quality is strong. However, pricing targets larger organisations, making it less cost-effective for UAE mid-market compared to Sophos MDR Complete.",
    watch:
      "Best for large enterprise (500+ users) with budget for premium MDR and a preference for named analyst relationships.",
    logo: "/logos/arctic-wolf.png",
  },
  {
    name: "Microsoft Defender MDR",
    best: "Microsoft Security Experts · Best for M365 E5 (Strong)",
    strength:
      "Outstanding for organisations on Microsoft 365 E5 with Defender XDR. Less compelling for heterogeneous stacks where Sophos MDR Complete offers broader and more cost-effective coverage.",
    watch: "Best for Microsoft M365 E5 organisations.",
    logo: "/logos/MicrosoftDefender.webp",
  },
];

/* ───────── VENDOR MATRIX (BUYER'S MATRIX) ───────── */

const matrixVendors = [
  { name: "Sophos MDR Complete", rank: "#1", featured: true },
  { name: "Secureworks MXDR", rank: "#2" },
  { name: "Rapid7 MDR", rank: "#3" },
  { name: "Microsoft MDR" },
];

type StarCell = { stars: number; note: string };
type VerdictCell = { recommended?: boolean; rank?: string; text: string };
type MatrixRow =
  | { label: string; type: "text"; cells: string[] }
  | { label: string; type: "stars"; cells: StarCell[] }
  | { label: string; type: "verdict"; cells: VerdictCell[] };

const matrixRows: MatrixRow[] = [
  {
    label: "Coverage breadth",
    type: "text",
    cells: [
      "Endpoint, email, cloud, network (NDR add-on), firewall. Broadest coverage at this price tier in market. Due to acquisition of Secureworks Sophos also have taegis XDR which is large enterprise platform.",
      "Endpoint, network, cloud, identity. Taegis XDR cross-source correlation.",
      "Endpoint, SIEM, SOAR, cloud. InsightIDR as backbone. Good breadth.",
      "Endpoint (Defender), email, cloud (Defender for Cloud). Best for Microsoft.",
    ],
  },
  {
    label: "Hands-on response",
    type: "stars",
    cells: [
      { stars: 5, note: "Guaranteed response. SOC contains, neutralises, remediates. Hands-on IR included. CTU-backed response." },
      { stars: 5, note: "Hands-on IR included. CTU-backed response." },
      { stars: 4, note: "Good hands-on response. IR team access." },
      { stars: 4, note: "Microsoft Security Experts response." },
    ],
  },
  {
    label: "Annual cost (500 users)",
    type: "text",
    cells: [
      "Best value enterprise MDR. Endpoint included in price. Cost effiecient considering enterprise service.",
      "Enterprise pricing. CTU intel depth justifies premium.",
      "USD 100 to 200K/yr. InsightIDR SIEM included.",
      "M365 licensing plus Security Experts add-on.",
    ],
  },
  {
    label: "UAE suitability",
    type: "stars",
    cells: [
      { stars: 5, note: "40,000+ organizations being protected by Sophos MDR. Highest MDR exposure compared to competitors who does not even have half the number." },
      { stars: 3, note: "Available regionally. Partner-led delivery." },
      { stars: 4, note: "Via Artiflex IT, in-country UAE delivery." },
      { stars: 5, note: "Microsoft UAE direct. Best for M365." },
    ],
  },
  {
    label: "Strategic Verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "Best overall for UAE. World's largest pure-play MDR, guaranteed response, broadest coverage at this price tier." },
      { recommended: true, rank: "#2", text: "Advanced threat intel. CTU adversary tracking; preferred pairing with Sophos MDR for sophisticated threats." },
      { recommended: true, rank: "#3", text: "Strong mid-market. 24/7 managed SOC on the InsightIDR platform with IR team access." },
      { text: "Strong for Microsoft 365 E5 estates with Defender XDR; less compelling on heterogeneous stacks." },
    ],
  },
];

/* ───────── GARTNER-STYLE CAPABILITY SCORECARD ───────── */

const featureVendors = ["Sophos MDR Complete", "Secureworks MXDR", "Rapid7 MDR", "Microsoft MDR"];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "limited";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "24/7 detection coverage",
    cells: [
      { tier: "best", note: "39,000+ customer threat correlation" },
      { tier: "best", note: "CTU-backed 24/7 detection" },
      { tier: "excellent", note: "InsightIDR + SOC analysts" },
      { tier: "excellent", note: "Microsoft Security Experts" },
    ],
  },
  {
    label: "Threat hunting maturity",
    cells: [
      { tier: "best", note: "X-Ops + 39K telemetry scale" },
      { tier: "best", note: "CTU adversary-led hunting" },
      { tier: "excellent", note: "Rapid7 Threat Command intel" },
      { tier: "excellent", note: "MSTIC threat intelligence" },
    ],
  },
  {
    label: "Coverage breadth",
    cells: [
      { tier: "best", note: "Endpoint + email + cloud + network" },
      { tier: "excellent", note: "Endpoint + network + cloud + identity" },
      { tier: "excellent", note: "Endpoint + SIEM + cloud + SOAR" },
      { tier: "best", note: "Best Microsoft-native coverage" },
    ],
  },
  {
    label: "Value for money",
    cells: [
      { tier: "best", note: "Best value MDR; endpoint included" },
      { tier: "strong", note: "Premium justified by CTU depth" },
      { tier: "excellent", note: "Good value; SIEM included" },
      { tier: "veryStrong", note: "Outstanding for M365 E5" },
    ],
  },
  {
    label: "UAE in-country support",
    cells: [
      { tier: "best", note: "Sophos Platinum Partner, Artiflex IT" },
      { tier: "strong", note: "Regional partner delivery" },
      { tier: "excellent", note: "Via Artiflex IT, in-country" },
      { tier: "best", note: "Microsoft UAE direct office" },
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
    rank: "Recommended · World's Largest Pure-Play MDR",
    name: "Sophos MDR Complete",
    tagline: "39,000+ customers. 24/7 guaranteed response. Endpoint + email + cloud + network coverage. Sophos Platinum Partner via Artiflex IT.",
    featured: true,
    specs: [
      { label: "Customers", value: "39,000+" },
      { label: "Coverage", value: "24/7/365" },
      { label: "Response", value: "Guaranteed" },
      { label: "Partner tier", value: "Platinum (Artiflex IT)" },
      { label: "Annual cost", value: "USD 80–150K (500 users)" },
      { label: "Intelligence", value: "Sophos X-Ops + Secureworks CTU" },
    ],
    capabilities: [
      {
        title: "Guaranteed threat response, the SOC acts on your behalf",
        desc: "When the Sophos Threat Response team confirms a threat, they act: isolating compromised endpoints, blocking malicious traffic at the XGS Firewall, disabling compromised accounts, without waiting for approval in time-critical scenarios. This distinguishes true MDR from detection-and-alert services.",
      },
      {
        title: "Scale advantage, 39,000+ customer threat correlation",
        desc: "The Sophos MDR SOC monitors threat signals across 39,000+ customer environments simultaneously. When a new campaign targets one customer, the detection is immediately applied across all environments, a scale no in-house SOC can replicate.",
      },
      {
        title: "Broadest coverage at mid-market pricing",
        desc: "Sophos MDR Complete covers endpoint (Intercept X), email (Sophos Email), cloud (Sophos Cloud Optix) and network (Sophos NDR add-on), all feeding the same MDR SOC via Sophos Central. This four-layer coverage at mid-market pricing is unique in the market.",
      },
      {
        title: "Secureworks CTU partnership, world-class threat intelligence",
        desc: "The Sophos + Secureworks strategic partnership adds Secureworks Counter Threat Unit (CTU) intelligence, tracking specific threat actors, their infrastructure and campaigns, for customers who opt into the combined engagement.",
      },
      {
        title: "Compliance reporting, NESA, CBUAE, PCI DSS, ISO 27001",
        desc: "Monthly threat detection and response reports, quarterly security posture briefings and annual risk summaries aligned to UAE regulatory frameworks, the documented evidence of active 24/7 monitoring that UAE regulators require.",
      },
      {
        title: "Artiflex IT in-country delivery, UAE Platinum Partner",
        desc: "In-country UAE engineers, Arabic and English delivery, and direct escalation to the Sophos MDR SOC. Customers get a named Artiflex IT account team, not a shared global support queue.",
      },
    ],
    shortlist: [
      "UAE organisations of any size (SMB to large enterprise) wanting 24/7 managed detection and guaranteed response without building an in-house SOC.",
      "Existing Sophos endpoint customers wanting to activate full MDR on their Sophos Intercept X deployment.",
      "Organisations needing compliance evidence for NESA, CBUAE, ADHICS or PCI DSS as part of the service.",
      "Mid-market UAE enterprises wanting enterprise-grade MDR without an enterprise security budget.",
      "Security teams wanting network-layer MDR (Sophos NDR) without a separate vendor or console.",
    ],
    note: {
      title: "Choosing the right Sophos MDR tier",
      body: "Sophos MDR Essentials provides 24/7 detection and notification with response led by your team. Sophos MDR Complete (our recommendation) adds guaranteed response: the SOC investigates and takes action, with full IR access. Add Sophos NDR to extend coverage to the network layer with five ML engines and Active Threat Response via the XGS Firewall.",
    },
  },
  {
    rank: "Recommended · SIEM-Native Managed Security",
    name: "Rapid7 MDR",
    tagline: "InsightIDR SIEM backbone. Rapid7 Threat Command intelligence. Good mid-market value. IR team access included.",
    specs: [
      { label: "SIEM backbone", value: "InsightIDR" },
      { label: "Threat intel", value: "Rapid7 Threat Command" },
      { label: "IR access", value: "Included" },
      { label: "Annual cost", value: "USD 100–200K (500 users)" },
      { label: "UAE delivery", value: "Via Artiflex IT" },
      { label: "Coverage", value: "Endpoint + SIEM + cloud + SOAR" },
    ],
    capabilities: [
      {
        title: "SIEM-native MDR, same platform as InsightIDR",
        desc: "Rapid7 MDR is built entirely on the InsightIDR platform. For organisations already running InsightIDR, it adds the 24/7 managed SOC on top of their existing investment without any platform change, migration cost or parallel tooling, the lowest-friction path to managed detection for InsightIDR customers.",
      },
      {
        title: "Rapid7 Threat Command, external threat intelligence",
        desc: "Rapid7 Threat Command (formerly IntSights) provides external threat intelligence from the dark web, criminal forums, paste sites and social media, monitoring for mentions of your organisation, executives, IP ranges and domain infrastructure, early warning that internal SIEM telemetry cannot detect.",
      },
      {
        title: "Rapid7 Incident Response team access",
        desc: "Includes access to the Rapid7 IR team for major incidents. When an incident escalates beyond remote response (forensic investigation, legal-hold evidence collection), the IR team can be engaged as part of the MDR service, not a separate additional-cost engagement.",
      },
      {
        title: "InsightIDR UEBA + MDR SOC, ML prioritisation with human analysis",
        desc: "InsightIDR's Attacker Behavior Analytics and UEBA continuously surface high-priority detections. Rapid7 MDR SOC analysts focus on these high-confidence signals, investigating, validating and responding to confirmed threats while ML filters out false positives.",
      },
      {
        title: "24/7 managed detection across endpoint, SIEM, cloud and SOAR",
        desc: "Rapid7 MDR monitors endpoint telemetry (Insight Agent), SIEM detections (InsightIDR correlation and UEBA), cloud workload telemetry (InsightCloudSec) and SOAR playbook execution (InsightConnect), covering the full Rapid7 security stack.",
      },
      {
        title: "Artiflex IT in-country UAE delivery",
        desc: "Artiflex IT delivers Rapid7 MDR across UAE and the wider Middle East with in-country Arabic and English support, local deployment engineering and compliance reporting aligned to NESA, CBUAE and UAE regulatory frameworks.",
      },
    ],
    shortlist: [
      "Organisations already running Rapid7 InsightIDR who want a 24/7 managed SOC on the same platform without a migration.",
      "Security teams invested in the broader Rapid7 platform (InsightIDR + InsightVM + InsightConnect) wanting a managed layer across the stack.",
      "Mid-market UAE organisations evaluating SIEM and MDR together who want a single vendor relationship at a competitive combined price.",
      "Organisations where external threat intelligence (dark web monitoring for credential exposure) is a material requirement alongside internal SIEM detection.",
    ],
    note: {
      title: "Rapid7 MDR vs Sophos MDR",
      body: "Choose Rapid7 MDR when you are already running or evaluating InsightIDR and want managed detection on the same platform. Choose Sophos MDR Complete when you want the broadest coverage at the best price, our top pick for most UAE organisations not already committed to Rapid7. Artiflex IT is both a Sophos Platinum Partner and a Rapid7 partner and delivers either or both.",
    },
  },
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "What is the difference between MDR and MSSP?",
    answer:
      "An MSSP (managed security service provider) typically manages and monitors security tools and forwards alerts; you still investigate and respond. MDR (managed detection and response) adds an expert 24/7 SOC that hunts, investigates and actively responds, containing and neutralising threats on your behalf. MDR buys a security outcome; an MSSP largely operates tooling.",
  },
  {
    question: "Why Sophos MDR over CrowdStrike Falcon Complete?",
    answer:
      "Both are strong. CrowdStrike Falcon Complete offers best-in-class detection but typically costs USD 200 to 500K+ annually. For most UAE mid-market organisations, Sophos MDR Complete delivers 80 to 90 percent of the outcome at 40 to 60 percent of the cost, with broader endpoint, email, cloud and network coverage. CrowdStrike is the right answer when budget is not the constraint and the threat profile is sophisticated.",
  },
  {
    question: "Does Sophos MDR cover unmanaged or IoT devices?",
    answer:
      "Yes, when paired with Sophos NDR. The NDR add-on automatically discovers and monitors every device generating network traffic, IoT, OT, BYOD and IP cameras, giving the MDR SOC visibility into assets that cannot run an endpoint agent.",
  },
  {
    question: "What compliance reporting does Sophos MDR provide?",
    answer:
      "Sophos MDR delivers monthly threat detection and response reports, quarterly security posture briefings and annual risk summaries aligned to NESA, CBUAE, PCI DSS and ISO 27001, the documented evidence of active 24/7 monitoring that UAE regulators expect.",
  },
  {
    question: "Can MDR replace our internal security team?",
    answer:
      "MDR augments rather than replaces. It delivers the 24/7 detection, hunting and response that a credible in-house SOC (typically 8 to 12 analysts) would provide, at roughly 10 to 20 percent of the headcount cost, while your team retains ownership of strategy, risk and business context.",
  },
  {
    question: "How quickly is Sophos MDR operational?",
    answer:
      "Sophos MDR is typically operational within 5 to 10 business days of endpoint agent deployment, versus the 12 to 18 months it takes to build comparable in-house SIEM and SOC capability.",
  },
];

/* ───────── DELIVERY MODEL ───────── */

const deliveryStages = [
  {
    title: "Assess",
    duration: "1 week",
    summary:
      "Security tool inventory, endpoint coverage review, detection gap analysis, compliance mapping, and an MDR platform recommendation before we quote.",
    deliverable: "Current-state posture report, MDR platform recommendation, TCO comparison, deployment timeline.",
  },
  {
    title: "Design",
    duration: "1 week",
    summary:
      "Endpoint agent deployment plan, exclusion design, SIEM/firewall/email integration, escalation workflow design and compliance reporting configuration.",
    deliverable: "MDR architecture document, deployment schedule, escalation runbook.",
  },
  {
    title: "Deploy",
    duration: "1–3 weeks",
    summary:
      "Phased endpoint agent deployment, exclusion tuning, integration testing, SOC handover, and a first 30-day threat report confirming detection coverage.",
    deliverable: "Live MDR coverage, SOC contact details, escalation tested, first threat report.",
  },
  {
    title: "Manage",
    duration: "Ongoing",
    summary:
      "24/7 MDR coverage by the Sophos MDR SOC. Monthly threat reports, quarterly posture reviews, annual risk briefings and NESA/CBUAE/PCI DSS compliance evidence delivered on schedule.",
    deliverable: "Managed security outcome. Board-readable reporting. Compliance evidence.",
  },
];

/* ───────── HERO ───────── */

function MdrHero() {
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
              <li><span className="font-medium text-[#28B5E1]">MDR</span></li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="shell relative z-10 flex w-full flex-1 items-center py-10 sm:py-12 lg:py-14">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="w-full">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#28B5E1] sm:text-xs">
            Managed Security · 24/7 SOC · Threat Response
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-5xl lg:text-[3.5rem]">
            MDR:{" "}
            <span className="gradient-text">Managed Detection</span>
            <span className="block">& Response</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            MDR wraps expert threat hunters, a 24/7 SOC team and AI-driven detection around your entire security stack, delivering security outcomes you buy rather than a tool you operate. For organisations without a dedicated security team, MDR is not just an option. It is the only responsible answer to the modern threat landscape.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
            <a href="#vendor-comparison" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base">
              Compare MDR Vendors
            </a>
            <a href="#gartner-comparison" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base">
              Gartner-style Review
            </a>
            <Link to="/blog/origin-mdr" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base">
              Read Origin Story
            </Link>
            <button onClick={openContact} className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base">
              Free MDR Assessment
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </button>
          </div>
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

export default function SecurityOperationsMdr() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>MDR (Managed Detection & Response) UAE | Vendor Comparison & Gartner-style Scorecard | Artiflex IT</title>
        <meta
          name="description"
          content="UAE MDR buyer's guide. Vendor comparison and Gartner-style scorecard across Sophos MDR Complete (our top pick), Secureworks MXDR, Rapid7 MDR, Microsoft Defender MDR, SentinelOne, CrowdStrike Falcon Complete and Arctic Wolf. 24/7 SOC, guaranteed response and threat hunting for UAE organisations."
        />
        <link rel="canonical" href="https://artiflexit.com/cybersecurity/security-operations/mdr" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "MDR (Managed Detection and Response)",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description":
              "UAE MDR delivery across Sophos MDR Complete, Secureworks MXDR, Rapid7 MDR, Microsoft Defender MDR, SentinelOne, CrowdStrike Falcon Complete and Arctic Wolf: 24/7 SOC, guaranteed response, threat hunting and compliance reporting.",
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

      <MdrHero />

      {/* ───────── MDR PLATFORMS LINEUP ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-14 sm:py-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(to right, #1B8AC7 1px, transparent 1px), linear-gradient(to bottom, #1B8AC7 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#1B8AC7]/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-[#28B5E1]/10 blur-3xl" />
        <div className="shell relative">
          <p className="text-center font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
            MDR Platforms We Deploy and Manage, UAE & Middle East
          </p>

          {/* Honeycomb (large screens) */}
          <div className="mt-12 hidden flex-col items-center lg:flex">
            {(() => {
              const layouts: Record<number, number[]> = { 1: [1], 2: [2], 3: [3], 4: [3, 1], 5: [3, 2], 6: [3, 3], 7: [4, 3], 8: [4, 4] };
              const sizes = layouts[mdrPlatforms.length] ?? [Math.ceil(mdrPlatforms.length / 2), Math.floor(mdrPlatforms.length / 2)];
              const rows: typeof mdrPlatforms[] = [];
              let i = 0;
              sizes.forEach((s) => { rows.push(mdrPlatforms.slice(i, i + s)); i += s; });
              const HEX_PATH = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
              return rows.map((row, rowIdx) => (
                <div key={rowIdx} className="flex" style={{ marginTop: rowIdx === 0 ? 0 : -52, transform: rowIdx > 0 && rows[rowIdx - 1].length === row.length ? "translateX(90px)" : undefined }}>
                  {row.map((p) => (
                    <Link key={p.slug} to={`/cybersecurity/security-operations/mdr/${p.slug}`} aria-label={`View ${p.name} details`} className="group relative block h-[208px] w-[180px] transition-all duration-300 hover:z-10 hover:scale-[1.06] [filter:drop-shadow(0_4px_12px_rgba(15,23,42,0.10))] hover:[filter:drop-shadow(0_10px_30px_rgba(40,181,225,0.45))]">
                      <div className="absolute inset-0 bg-slate-200/80 transition-colors duration-300 group-hover:bg-[#28B5E1]" style={{ clipPath: HEX_PATH }} />
                      <div className="absolute inset-[2px] bg-white transition-all duration-300 group-hover:bg-gradient-to-b group-hover:from-[#28B5E1]/[0.08] group-hover:to-white" style={{ clipPath: HEX_PATH }} />
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

          {/* Card grid (mobile / tablet) */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:hidden">
            {mdrPlatforms.map((p) => (
              <Link key={p.slug} to={`/cybersecurity/security-operations/mdr/${p.slug}`} aria-label={`View ${p.name} details`} className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/50 hover:shadow-md">
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

      {/* ───────── WHY MDR, NOT JUST SIEM ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Why MDR, Not Just SIEM</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">MDR vs building your own SOC, the honest comparison</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              For most UAE organisations, the question is not which SIEM to buy, it is whether to build a 24/7 SOC operation at all. For most, the honest answer is that MDR delivers better outcomes at lower cost.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mdrStats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
                <p className="font-display text-3xl font-bold leading-none text-[#045891] sm:text-4xl">{s.value}</p>
                <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {mdrReasons.map((c) => (
              <article key={c.title} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1B8AC7]/60 hover:shadow-[0_20px_60px_-12px_rgba(27,138,199,0.20)]">
                <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#045891] to-[#28B5E1]" />
                <h3 className="font-display text-base font-bold text-slate-900">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── SOPHOS + SECUREWORKS COMBO ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.06),transparent_60%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              <span aria-hidden>⭐</span> Our Top Two Recommendations, Combined
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Sophos MDR + Secureworks MXDR: the best of both worlds
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Sophos MDR and Secureworks have formalised a strategic partnership combining the world's largest pure-play MDR platform (39,000+ customers) with the Secureworks Counter Threat Unit (CTU) intelligence engine.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 sm:p-7">
            <p className="text-sm leading-relaxed text-emerald-900 sm:text-base">
              <span className="font-semibold">Artiflex IT recommendation:</span> For most UAE enterprises, Sophos MDR Complete is our top recommendation, outstanding value, 39,000+ customer scale and best-in-class endpoint protection bundled in. For organisations facing the most sophisticated threat actors, Sophos MDR + Secureworks MXDR delivers the most complete managed security outcome available at any price point. As a Sophos Platinum Partner and Rapid7 Partner, Artiflex IT delivers both.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {comboCards.map((c) => (
              <article key={c.title} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1B8AC7]/60 hover:shadow-[0_20px_60px_-12px_rgba(27,138,199,0.20)]">
                <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#045891] to-[#28B5E1]" />
                <h3 className="font-display text-base font-bold text-slate-900">{c.title}</h3>
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
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">The Questions We Ask Before Recommending</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Selection framework for MDR buyers</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">The right MDR falls out of six honest questions. We ask these before quoting anything.</p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
            {selectionFramework.map((q) => (
              <article key={q.step} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1B8AC7]/40 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#045891] to-[#1B8AC7] font-display text-sm font-bold text-white">{q.step}</span>
                  <div>
                    <h3 className="font-display text-base font-bold text-slate-900">{q.question}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{q.desc}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── VENDOR COMPARISON ───────── */}
      <section id="vendor-comparison" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="mb-8 text-center sm:mb-10">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Vendor Comparison for MDR Buyers</p>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-2xl font-bold tracking-tight text-heading sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              Vendor comparison for <span className="gradient-text">MDR buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              Seven MDR platforms compared across coverage breadth, response capability, threat hunting, cost and UAE suitability.
            </p>
          </div>

          <div className="mt-8 flex justify-center sm:mt-10">
            <button onClick={openContact} className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base">
              Talk to our Consultant
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </button>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + matrixVendors.length * 116) }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-5 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">Criteria</th>
                    {matrixVendors.map((v) => (
                      <th key={v.name} className={`border-l border-white/15 px-2 py-3 sm:px-4 sm:py-5 align-bottom ${v.featured ? "bg-white/10" : ""}`}>
                        <p className="font-display text-sm font-semibold text-white sm:text-base">
                          {v.name}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrixRows.map((row, rIdx) => (
                    <tr key={row.label} className={`transition-colors ${row.type === "verdict" ? "border-t-2 border-[#28B5E1]/30 bg-gradient-to-r from-[#04101E] to-[#0A3D6B]" : `border-t border-[#0A3D6B]/20 hover:bg-[#28B5E1]/[0.04] ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`}`}>
                      <th scope="row" className={`sticky left-0 z-10 px-2 py-3 align-middle sm:px-4 sm:py-4 font-display text-sm font-semibold ${row.type === "verdict" ? "bg-[#04101E] uppercase tracking-wider text-[#28B5E1]" : `${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"} text-slate-900`}`}>{row.label}</th>
                      {row.cells.map((cell, cIdx) => (
                        <td key={cIdx} className={`px-4 py-4 align-middle ${row.type === "verdict" ? "border-l border-white/10 text-slate-300" : `border-l border-[#0A3D6B]/20 text-slate-700 ${cIdx === 0 ? "bg-[#28B5E1]/[0.04]" : ""}`}`}>
                          {row.type === "stars" ? (
                            <div>
                              <span aria-label={`${(cell as StarCell).stars} out of 5`} className="text-amber-500">
                                {"★".repeat((cell as StarCell).stars)}
                                <span className="text-slate-300">{"★".repeat(5 - (cell as StarCell).stars)}</span>
                              </span>
                              <p className="mt-1 text-xs leading-snug text-slate-600">{(cell as StarCell).note}</p>
                            </div>
                          ) : row.type === "verdict" ? (
                            <div className="space-y-1.5">
                              {(cell as VerdictCell).recommended && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                                  ✓ Recommended
                                </span>
                              )}
                              <p className="text-xs leading-relaxed text-slate-300">{(cell as VerdictCell).text}</p>
                            </div>
                          ) : (
                            <p className="text-xs leading-snug text-slate-700">{cell as string}</p>
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

      {/* ───────── DETAILED CARDS + DEEP DIVE + GARTNER ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Detailed Platform Analysis</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Detailed comparison on MDR vendors</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">Strengths, limitations and the buyer profile each platform was built for.</p>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:mt-16 lg:grid-cols-2 lg:items-stretch">
            {vendors.map((v, idx) => {
              const recommended = v.best.includes("Recommended");
              const top = v.best.includes("#1");
              return (
                <motion.div key={v.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: idx * 0.05 }} className="flex h-full">
                  <div className={`group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(4,88,145,0.12)] sm:p-8 ${top ? "border-[#28B5E1]/50 shadow-[0_4px_24px_rgba(40,181,225,0.16)]" : recommended ? "border-brand-blue/30 shadow-[0_4px_20px_rgba(27,138,199,0.10)]" : "border-border-light shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-brand-blue/25"}`}>
                    {(recommended || top) && (
                      <span className={`absolute -top-px left-6 inline-flex rounded-b-md px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white ${top ? "bg-gradient-to-r from-[#045891] to-[#28B5E1]" : "bg-brand-blue"}`} aria-label="Recommended vendor">
                        {top ? "Recommended" : "✓ Recommended"}
                      </span>
                    )}
                    <div className="flex items-start justify-between gap-4 pt-3">
                      <div className="min-w-0">
                        <h3 className="font-display text-xl font-bold text-heading transition-colors group-hover:text-brand-blue sm:text-2xl">{v.name}</h3>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-brand-blue">{v.best.replace(/\s*#\d+/, "")}</p>
                      </div>
                      {v.logo && (
                        <img src={v.logo} alt={`${v.name} logo`} loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} className="h-10 w-24 shrink-0 object-contain object-right sm:h-12 sm:w-32" />
                      )}
                    </div>
                    <div className="mt-5 flex-1 space-y-3">
                      <div>
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Strengths</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-body">{v.strength}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Best for</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-body/80">{v.watch}</p>
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
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Platform Capabilities</p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">The recommended platforms, in depth</h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">Why our recommended MDR platforms earn their ranking, with the capabilities and the buyer profile each was built for.</p>
            </div>
            <div className="mt-12 space-y-8">
              {vendorDeepDive.map((d) => (
                <article key={d.name} className={`overflow-hidden rounded-2xl border bg-white shadow-sm ${d.featured ? "border-[#28B5E1]/50 shadow-[0_4px_24px_rgba(40,181,225,0.12)]" : "border-slate-200"}`}>
                  <div className="border-b border-slate-100 bg-gradient-to-r from-[#04101E] to-[#0A3D6B] px-6 py-6 sm:px-8">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#28B5E1]/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#28B5E1]">
                      {d.featured && <span aria-hidden>⭐ </span>}{d.rank}
                    </span>
                    <h3 className="mt-3 font-display text-xl font-bold text-white sm:text-2xl">{d.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{d.tagline}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {d.specs.map((s) => (
                        <span key={s.label} className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-slate-200">
                          <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-[#28B5E1]">{s.label}</span>
                          <span className="text-slate-300">{s.value}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-6 px-6 py-6 sm:px-8 sm:py-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Platform capabilities</p>
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
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Who should choose this</p>
                      <ul className="mt-4 space-y-2.5">
                        {d.shortlist.map((s) => (
                          <li key={s} className="flex items-start gap-2 text-sm leading-relaxed text-slate-600">
                            <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1B8AC7]" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                      {d.note && (
                        <div className="mt-5 rounded-xl border border-[#1B8AC7]/20 bg-[#28B5E1]/[0.06] p-4">
                          <p className="font-display text-sm font-bold text-[#045891]">{d.note.title}</p>
                          <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{d.note.body}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Gartner scorecard */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Gartner-style Capability Comparison</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Gartner-style MDR capability scorecard</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">Each platform is rated across the capabilities that matter most for UAE MDR buyers, using a standardised tier scale. A gold ★ marker denotes best-in-class performance.</p>
          </div>

          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-3 text-xs text-slate-600">
            {(["best", "excellent", "veryStrong", "strong", "limited"] as Tier[]).map((t) => {
              const s = tierStyles[t];
              return (
                <span key={t} className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${s.bg} ${s.text}`}>
                  {t === "best" && <span aria-hidden="true">★</span>}{s.label}
                </span>
              );
            })}
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + featureVendors.length * 116) }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-5 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">Capability</th>
                    {featureVendors.map((v, i) => (
                      <th key={v} className={`border-l border-white/15 px-2 py-3 sm:px-4 sm:py-5 align-bottom font-display text-sm font-semibold text-white sm:text-base ${i === 0 ? "bg-white/10" : ""}`}>
                        {v}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {featureRows.map((row, rIdx) => (
                    <tr key={row.label} className={`border-t border-[#0A3D6B]/20 transition-colors hover:bg-[#28B5E1]/[0.04] ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`}>
                      <th scope="row" className={`sticky left-0 z-10 px-2 py-3 align-middle sm:px-4 sm:py-4 font-display text-sm font-semibold text-slate-900 ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>{row.label}</th>
                      {row.cells.map((cell, cIdx) => {
                        const t = tierStyles[cell.tier];
                        return (
                          <td key={cIdx} className={`border-l border-[#0A3D6B]/20 px-2 py-3 sm:px-4 sm:py-4 align-middle ${cIdx === 0 ? "bg-[#28B5E1]/[0.04]" : ""}`}>
                            <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${t.bg} ${t.text}`}>
                              {cell.tier === "best" && <span aria-hidden="true">★</span>}{t.label}
                            </span>
                            <p className="mt-1.5 text-xs leading-snug text-slate-600">{cell.note}</p>
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

      {/* ───────── DELIVERY MODEL ───────── */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <SectionHeader label="How we work" title={<>Our MDR <span className="gradient-text">delivery model</span></>} description="We deliver a managed security outcome: assess, design, deploy, manage. Every stage produces something a board can read and an auditor can sign off on." centered />
          <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-4">
            {deliveryStages.map((s, idx) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: idx * 0.08 }} className="group relative overflow-hidden rounded-2xl border border-border-light bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/25 hover:shadow-[0_12px_40px_rgba(27,138,199,0.10)] sm:p-6">
                <div className="flex items-baseline justify-end">
                  <span className="rounded-full border border-border-light bg-surface-secondary px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">{s.duration}</span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-heading">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">{s.summary}</p>
                <div className="mt-4 border-t border-border-light pt-3">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">You get</p>
                  <p className="mt-1 text-xs leading-relaxed text-body/85">{s.deliverable}</p>
                </div>
                {idx < 3 && (
                  <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 lg:block">
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
          <SectionHeader label="Frequently Asked Questions" title={<>MDR questions we <span className="gradient-text">hear most</span></>} description="What UAE buyers ask us most about choosing, deploying and operating managed detection and response." centered />
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
        title="Get a Free MDR Assessment"
        description="Free review covering endpoint coverage gaps, compliance obligations, an MDR platform recommendation and a three-year TCO comparison, delivered by a UAE-based engineer."
        primaryButton={{ text: "Book Free Assessment", action: "modal" }}
      />
    </>
  );
}
