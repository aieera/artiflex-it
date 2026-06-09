import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";

/* ───────── OT/ICS VENDORS LINEUP (HONEYCOMB) ───────── */

type Vendor = { slug: string; name: string; logo: string; featured?: boolean; rank?: string };

const otVendorList: Vendor[] = [
  { slug: "nozomi", name: "Nozomi Networks", logo: "/logos/Nozomi.png", featured: true, rank: "#1 OT/IoT" },
  { slug: "tenable", name: "Tenable OT", logo: "/logos/tenable.png", rank: "Vuln-led" },
  { slug: "claroty", name: "Claroty", logo: "/logos/Claroty.webp", rank: "Leader" },
  { slug: "dragos", name: "Dragos", logo: "/logos/Dragos.png", rank: "ICS specialist" },
  { slug: "microsoft-defender-iot", name: "Microsoft Defender for IoT", logo: "/logos/MicrosoftDefender.webp", rank: "M365 fit" },
];

/* ───────── CAPABILITY MAP ───────── */

type Capability = {
  tag: string;
  title: string;
  desc: string;
  focus: string;
};

const capabilities: Capability[] = [
  {
    tag: "Pillar",
    title: "Asset & Network Visibility",
    desc: "Discover every PLC, RTU, HMI, historian and connected device on the industrial network through passive monitoring of ICS protocols. You cannot defend what you cannot see.",
    focus: "Focus: Nozomi Guardian · Claroty xDome",
  },
  {
    tag: "Pillar",
    title: "ICS Threat Detection",
    desc: "Detect anomalies and known attack techniques (controller reprogramming, rogue commands, malware, lateral movement) without disrupting operations, using protocol-aware analytics.",
    focus: "Focus: Nozomi · Claroty CTD · Dragos Platform",
  },
  {
    tag: "Pillar",
    title: "OT Vulnerability & Risk",
    desc: "Map known CVEs to the actual industrial assets you own, prioritise by exploitability and consequence, and produce risk evidence that operations and security both accept.",
    focus: "Focus: Tenable OT · Claroty · Nozomi",
  },
  {
    tag: "Pillar",
    title: "Compliance & Segmentation",
    desc: "Map controls to IEC 62443, NERC CIP, NESA and ADHICS, enforce Purdue-model zones and conduits, and produce auditable evidence for regulators and assessors.",
    focus: "Focus: All platforms · zone segmentation",
  },
];

/* ───────── VENDOR COMPARISON MATRIX ───────── */

type StarCell = { stars: number; note: string };
type VerdictCell = { recommended?: boolean; rank?: string; text: string };
type MatrixRow =
  | { label: string; type: "text"; cells: string[] }
  | { label: string; type: "stars"; cells: StarCell[] }
  | { label: string; type: "verdict"; cells: VerdictCell[] };

const matrixVendors = [
  { name: "Nozomi Networks", featured: true },
  { name: "Tenable OT", featured: true },
  { name: "Claroty", featured: true },
  { name: "Dragos" },
  { name: "MS Defender for IoT" },
];

const matrixRows: MatrixRow[] = [
  {
    label: "Primary product",
    type: "text",
    cells: [
      "Guardian (sensor) + Vantage (SaaS)",
      "Tenable OT Security (Tenable.ot)",
      "xDome / CTD + SRA + Edge",
      "Dragos Platform",
      "Microsoft Defender for IoT",
    ],
  },
  {
    label: "Founded / Heritage",
    type: "text",
    cells: [
      "2013. First AI-powered ICS visibility.",
      "Tenable (1998); Tenable.ot acquired Indegy in 2019.",
      "2015 (Israel). Team8 incubated.",
      "2016. Founded by Robert M. Lee, deep ICS-IR DNA.",
      "Microsoft; Defender for IoT (CyberX acquisition 2020).",
    ],
  },
  {
    label: "OT/ICS asset discovery",
    type: "stars",
    cells: [
      { stars: 5, note: "Passive DPI, agentless." },
      { stars: 4, note: "Passive + active scanning." },
      { stars: 5, note: "Passive + active queries." },
      { stars: 4, note: "Strong, ICS-focused." },
      { stars: 4, note: "Agentless network sensor." },
    ],
  },
  {
    label: "ICS threat detection",
    type: "stars",
    cells: [
      { stars: 5, note: "AI + behavioural baselines." },
      { stars: 4, note: "Anomaly + signature." },
      { stars: 5, note: "Behavioural + Threat Intel." },
      { stars: 5, note: "Dragos WorldView intel, ICS-specific." },
      { stars: 4, note: "ML + Microsoft Threat Intel." },
    ],
  },
  {
    label: "OT vulnerability management",
    type: "stars",
    cells: [
      { stars: 4, note: "Asset-level CVEs." },
      { stars: 5, note: "Tenable VM lineage. Best-in-class." },
      { stars: 4, note: "Asset-level CVEs + risk scoring." },
      { stars: 4, note: "Strong, IR-aware." },
      { stars: 4, note: "MS Defender Vuln Mgmt integration." },
    ],
  },
  {
    label: "Recognition",
    type: "text",
    cells: [
      "Leader, Gartner MQ for CPS Protection.",
      "Strong Tenable enterprise integration.",
      "Leader, Gartner MQ for CPS Protection.",
      "Forrester Wave OT Leader; SANS preferred.",
      "Microsoft brand and enterprise reach.",
    ],
  },
  {
    label: "Deployment",
    type: "text",
    cells: [
      "Sensor + SaaS (Vantage) or on-prem.",
      "On-prem sensor + Tenable.io/.sc integration.",
      "Sensor + cloud (xDome) or on-prem (CTD).",
      "On-prem-first with cloud options.",
      "Cloud (Azure) + on-prem sensor.",
    ],
  },
  {
    label: "Best suited for",
    type: "text",
    cells: [
      "Manufacturing, utilities and critical infra wanting AI-native visibility plus IT/OT correlation.",
      "Customers already invested in Tenable for IT vulnerability management.",
      "Pharma, healthcare and large complex OT estates needing the broadest module set.",
      "Energy, utilities and high-stakes ICS environments needing ICS-IR depth.",
      "Microsoft-aligned organisations wanting IoT/OT signal in Sentinel and Defender XDR.",
    ],
  },
  {
    label: "Strategic Verdict",
    type: "verdict",
    cells: [
      { recommended: true, text: "Recommended OT/IoT platform for the UAE. AI-native, non-disruptive, integrates cleanly into the broader SOC." },
      { recommended: true, text: "Right where Tenable already owns the IT vulnerability programme and OT is being added." },
      { recommended: true, text: "Recommended for largest, most complex estates and pharma/healthcare. Strongest module breadth." },
      { text: "Best ICS-IR DNA and threat intel; specialist choice for energy and critical infrastructure." },
      { text: "Right for Microsoft-aligned customers consolidating IoT/OT into the Defender and Sentinel stack." },
    ],
  },
];

/* ───────── DETAILED VENDOR CARDS ───────── */

type VendorCard = {
  id?: string;
  name: string;
  best: string;
  strength: string;
  watch: string;
  logo?: string;
};

const vendors: VendorCard[] = [
  {
    id: "nozomi",
    name: "Nozomi Networks (Guardian / Vantage)",
    best: "Best for OT/IoT visibility & NDR (Recommended)",
    strength:
      "Co-founded in 2013, Nozomi brought the first AI-powered ICS visibility platform to market and was named a Leader in the Gartner Magic Quadrant for CPS Protection. Guardian performs deep packet inspection across industrial protocols, builds a digital-twin baseline of normal behaviour, and detects anomalies (atypical flows, controller-program changes, rogue devices, malware) without disrupting operations. Vantage provides SaaS-scale management across OT, IoT and IT. Integrates cleanly with Rapid7, Splunk and Sentinel for SOC correlation.",
    watch:
      "Purpose-built for OT and IoT, expect to pair with an IT SIEM for full IT/OT correlation. Sensor sizing and span/tap planning matters: scope this carefully during assessment.",
    logo: "/logos/Nozomi.png",
  },
  {
    id: "tenable",
    name: "Tenable OT Security (Tenable.ot)",
    best: "Best for vulnerability-led OT programmes (Recommended)",
    strength:
      "Born from the 2019 Indegy acquisition, Tenable.ot extends the Tenable vulnerability-management programme into OT. Hybrid passive plus active discovery (active queries are safe, ICS-aware), asset-level CVE mapping, configuration drift detection and tight integration with Tenable.io and Tenable.sc for unified IT and OT risk reporting. The right answer when Tenable already runs your IT VM programme.",
    watch:
      "OT NDR depth is solid but not class-leading versus Nozomi or Dragos. The case for Tenable.ot is unified vulnerability reporting, not best-of-breed ICS detection alone.",
    logo: "/logos/tenable.png",
  },
  {
    id: "claroty",
    name: "Claroty (xDome / CTD)",
    best: "Best for complex OT estates (Recommended)",
    strength:
      "Founded in 2015 with Team8 incubation, Claroty offers the broadest module set on the market: xDome (cloud), Continuous Threat Detection (CTD, on-prem), Secure Remote Access (SRA) and Edge for passive + active discovery. Particularly strong in pharma, healthcare (Medigate IoMT lineage) and manufacturing where heterogeneous device populations and remote vendor access dominate the risk surface.",
    watch:
      "More moving parts than competitors, plan a phased rollout (CTD or xDome first, SRA next) rather than everything at once.",
    logo: "/logos/Claroty.webp",
  },
  {
    id: "dragos",
    name: "Dragos Platform",
    best: "Best for ICS-IR & threat intel",
    strength:
      "Founded in 2016 by Robert M. Lee and a team of former ICS-CERT and US Government ICS hunters, Dragos pairs the Dragos Platform with the WorldView threat-intelligence service and a Neighborhood Keeper community-defence model. The strongest pedigree for ICS-specific incident response, particularly in energy, oil & gas, water utilities and electricity grids where deep ICS protocol knowledge and threat-actor attribution matter most.",
    watch:
      "Specialist focus on heavy industry and critical infrastructure. Manufacturing or pharma buyers will often prefer Nozomi or Claroty for module breadth and IT-OT correlation depth.",
    logo: "/logos/Dragos.png",
  },
  {
    id: "microsoft-defender-iot",
    name: "Microsoft Defender for IoT",
    best: "Best for Microsoft-aligned estates",
    strength:
      "Built on the 2020 CyberX acquisition, Defender for IoT brings agentless OT/IoT discovery and ML-based threat detection into the Microsoft security stack. Signals flow natively into Microsoft Sentinel and Defender XDR, making it the lowest-friction choice when M365 / Azure / Sentinel are already the SOC standard. Both cloud-managed and air-gapped on-premises management modes are supported.",
    watch:
      "Strongest where the SOC is already Microsoft-centric. For OT-first specialists (heavy industry, ICS-IR teams), Nozomi or Dragos still set the depth bar.",
    logo: "/logos/MicrosoftDefender.webp",
  },
];

/* ───────── GARTNER-STYLE SCORECARD ───────── */

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "none";
type FeatureCell = { tier: Tier; note?: string };

const tierStyles: Record<Tier, { bg: string; text: string; label: string }> = {
  best: { bg: "bg-emerald-600", text: "text-white", label: "Best in class" },
  excellent: { bg: "bg-emerald-500", text: "text-white", label: "Excellent" },
  veryStrong: { bg: "bg-sky-200", text: "text-sky-900", label: "Very strong" },
  strong: { bg: "bg-amber-200", text: "text-amber-900", label: "Strong" },
  good: { bg: "bg-amber-100", text: "text-amber-900", label: "Good" },
  none: { bg: "bg-slate-200", text: "text-slate-600", label: "None / N/A" },
};

const featureVendors = ["Nozomi", "Tenable OT", "Claroty", "Dragos", "MS Defender IoT"];

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  { label: "OT/ICS Asset Discovery", cells: [{ tier: "best", note: "Passive DPI, agentless" }, { tier: "veryStrong", note: "Passive plus active scan" }, { tier: "best", note: "Passive plus active queries" }, { tier: "excellent", note: "Strong, ICS-focused" }, { tier: "veryStrong", note: "Agentless network sensor" }] },
  { label: "ICS Protocol Coverage", cells: [{ tier: "best", note: "100+" }, { tier: "veryStrong", note: "Broad OT protocols" }, { tier: "best", note: "100+" }, { tier: "excellent", note: "Deep ICS protocol depth" }, { tier: "veryStrong", note: "CyberX protocol engine" }] },
  { label: "Threat Detection (anomaly + ML)", cells: [{ tier: "best", note: "AI behavioural baselines" }, { tier: "veryStrong", note: "Anomaly plus signature" }, { tier: "excellent", note: "Behavioural plus threat intel" }, { tier: "best", note: "WorldView intel" }, { tier: "veryStrong", note: "ML plus Microsoft intel" }] },
  { label: "Vulnerability Management", cells: [{ tier: "veryStrong", note: "Asset-level CVEs" }, { tier: "best", note: "Tenable VM lineage" }, { tier: "excellent", note: "CVEs plus risk scoring" }, { tier: "veryStrong", note: "IR-aware prioritisation" }, { tier: "veryStrong", note: "Defender Vuln Mgmt" }] },
  { label: "Secure Remote Access (SRA)", cells: [{ tier: "good", note: "Via partner integration" }, { tier: "none", note: "Not offered" }, { tier: "best", note: "Claroty SRA" }, { tier: "good", note: "Limited native SRA" }, { tier: "good", note: "Azure-routed access" }] },
  { label: "IoT / IoMT Coverage", cells: [{ tier: "excellent", note: "OT plus IoT visibility" }, { tier: "strong", note: "OT-led, lighter IoT" }, { tier: "best", note: "Medigate lineage" }, { tier: "strong", note: "Heavy-industry focus" }, { tier: "excellent", note: "Broad IoT discovery" }] },
  { label: "SOC / SIEM Integration", cells: [{ tier: "excellent", note: "Rapid7, Splunk, Sentinel" }, { tier: "excellent", note: "Tenable.sc / .io" }, { tier: "excellent", note: "Broad SIEM connectors" }, { tier: "veryStrong", note: "SOC export feeds" }, { tier: "best", note: "Sentinel native" }] },
  { label: "Compliance Reporting (IEC 62443, NERC CIP)", cells: [{ tier: "excellent", note: "Zone and conduit mapping" }, { tier: "veryStrong", note: "Unified IT/OT reports" }, { tier: "excellent", note: "Broad framework reports" }, { tier: "best", note: "NERC CIP, energy depth" }, { tier: "veryStrong", note: "Azure compliance hooks" }] },
  { label: "Non-disruptive Deployment", cells: [{ tier: "best", note: "Passive" }, { tier: "veryStrong", note: "Tuned active probes" }, { tier: "excellent", note: "Phased, passive-first" }, { tier: "best", note: "Passive" }, { tier: "excellent", note: "Cloud or air-gapped" }] },
];

/* ───────── DECISION FRAMEWORK ───────── */

const decisionQuestions = [
  {
    q: "Do you actually know every asset on the industrial network?",
    a: "If the answer is 'mostly' or 'we have a spreadsheet', start there. Asset visibility is the gate to everything else. Passive ICS-protocol discovery (Nozomi, Claroty) gives an accurate, non-disruptive inventory in days, not months.",
  },
  {
    q: "Is the priority deep ICS-IR or broad IT/OT correlation?",
    a: "For ICS-IR depth in critical infrastructure (energy, utilities, water), Dragos is the specialist. For unified IT/OT detection feeding the broader SOC, Nozomi is the most credible recommendation. For Microsoft-aligned shops, Defender for IoT.",
  },
  {
    q: "What compliance frameworks must you prove?",
    a: "IEC 62443, NERC CIP, NESA, ADHICS and ISO 27001 each demand specific OT evidence. Asset inventory, zone segmentation, change-control records and incident logs are the common spine, the right platform produces all four with minimum tuning.",
  },
  {
    q: "Do you already run a Tenable IT vulnerability programme?",
    a: "Then Tenable OT Security earns serious consideration: unified IT/OT vulnerability reporting, single risk-scoring methodology and one operator team. The case is operational, not best-of-breed ICS detection alone.",
  },
  {
    q: "What is the IT/OT operational boundary, and who owns it?",
    a: "OT security has to land somewhere on the org chart. Most successful UAE programmes co-own with operations (engineering accountable for safety, security accountable for detection). The right vendor must operate within that boundary.",
  },
  {
    q: "What is the active-scan tolerance on the production network?",
    a: "Some platforms (Claroty Edge, Tenable.ot) offer carefully tuned active queries that some plants accept and some refuse. Nozomi and Dragos remain fully passive by default. Match the deployment style to the plant culture.",
  },
];

/* ───────── DELIVERY MODEL ───────── */

const deliveryStages = [
  {
    title: "Assess",
    duration: "2–3 weeks",
    summary:
      "Site survey, ICS protocol and asset inventory, threat-modelling (ATT&CK for ICS), zone / conduit mapping, compliance-gap analysis against IEC 62443, NERC CIP, NESA and ADHICS.",
    deliverable: "Current-state OT report, vendor recommendation with rationale, three-year TCO comparison, sensor sizing.",
  },
  {
    title: "Design",
    duration: "2–4 weeks",
    summary:
      "Sensor placement (passive span/tap, optional active probes), Purdue-model segmentation, secure remote access design, SOC integration architecture, response playbooks.",
    deliverable: "Approved OT security architecture, runbook framework, change-control plan.",
  },
  {
    title: "Deploy",
    duration: "4–10 weeks",
    summary:
      "Phased sensor rollout across plants, ICS-protocol tuning, false-positive reduction, SIEM integration, segmentation enforcement, day-1 hypercare per site.",
    deliverable: "Live OT visibility and detection, tuned alerts, audit-ready documentation.",
  },
  {
    title: "Manage",
    duration: "Ongoing",
    summary:
      "24/7 OT monitoring, ICS-aware incident response, vulnerability triage, monthly board-readable reporting, quarterly threat-model reviews.",
    deliverable: "An operational OT security programme integrated with the IT SOC.",
  },
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "Why is OT/ICS security different from IT security?",
    answer:
      "Industrial systems prioritise availability and safety over confidentiality, run for 20+ years on legacy protocols (Modbus, DNP3, EtherNet/IP, S7, BACnet, Profinet), often cannot be patched without a planned outage, and have safety consequences that IT systems do not. Tools, processes and people that work in IT will frequently break in OT. Purpose-built OT platforms understand this.",
  },
  {
    question: "What is the difference between Nozomi, Claroty, Dragos, Tenable OT and Microsoft Defender for IoT?",
    answer:
      "Nozomi and Claroty are both Gartner Leaders for CPS Protection, broad and IT-OT aligned. Dragos is the ICS-IR specialist with the deepest threat-intel pedigree in heavy industry. Tenable OT is the right choice when Tenable already runs your IT vulnerability programme. Microsoft Defender for IoT fits Microsoft-centric SOCs feeding Sentinel and Defender XDR. The right one depends on your estate, SOC and compliance brief.",
  },
  {
    question: "Is active scanning safe in OT environments?",
    answer:
      "Modern platforms (Claroty Edge, Tenable.ot) include carefully ICS-aware active queries that are safe in most environments, but every plant culture is different. Nozomi and Dragos remain fully passive by default. Artiflex always runs an active-scan tolerance test in pilot before enabling it on production assets.",
  },
  {
    question: "How does OT security fit our existing SOC?",
    answer:
      "OT signals flow into the IT SIEM (Rapid7, Splunk, Sentinel) for correlated detection and the wider response process. The OT platform produces ICS-aware alerts, asset context and protocol depth that an IT SIEM cannot, but the analyst workflow stays in one place.",
  },
  {
    question: "Do your OT deployments cover IEC 62443, NESA and ADHICS?",
    answer:
      "Yes. Every deployment maps controls to the relevant framework (IEC 62443 zones and conduits, NERC CIP, NESA, ADHICS, ISO 27001) and produces audit-ready evidence as part of the project, not a follow-up engagement.",
  },
  {
    question: "How long does an OT security rollout take?",
    answer:
      "A single-site pilot deploys in 2 to 4 weeks. A multi-site UAE manufacturing or utility programme typically runs 12 to 24 weeks for full coverage, sequenced site by site with hypercare on each wave. Compliance evidence comes online as each site lands.",
  },
];

/* ───────── HERO ───────── */

function OTHero() {
  const { open: openContact } = useContactModal();
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-navy-deep">
      <div aria-hidden="true" className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/cybersecurity.png')" }} />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/70 to-navy-deep/90" />

      <div className="relative z-10 border-b border-white/5">
        <div className="shell flex w-full items-center justify-end gap-4 pt-24 pb-3 sm:pt-28">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center justify-end gap-2 text-[10px] text-slate-400 sm:text-[11px]">
              <li><Link to="/" className="transition-colors hover:text-white">Home</Link></li>
              <li className="text-slate-600">/</li>
              <li><Link to="/cybersecurity" className="transition-colors hover:text-white">Cybersecurity</Link></li>
              <li className="text-slate-600">/</li>
              <li><span className="font-medium text-[#28B5E1]">OT / ICS Security</span></li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="shell relative z-10 flex w-full flex-1 items-center py-10 sm:py-12 lg:py-14">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="w-full">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#28B5E1] sm:text-xs">
            OT / ICS Security · Visibility · Detection · Compliance
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-5xl lg:text-[3.5rem]">
            OT / ICS Security UAE{" "}
            <span className="gradient-text">Visibility · Detection · Compliance</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Protect industrial control systems without disrupting operations
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Artiflex IT designs, deploys and runs OT and ICS security programmes across the UAE, Oman and Saudi Arabia, covering manufacturing, utilities, oil and gas, water and critical infrastructure. We deliver Nozomi Networks, Claroty, Dragos, Tenable OT Security and Microsoft Defender for IoT as focused solutions and integrate them with the IT SOC you already operate. The conversation starts with your assets, protocols and safety constraints, not a SKU.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
            <a href="#vendor-matrix" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base">
              Vendor Comparison
            </a>
            <a href="#gartner-comparison" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base">
              Gartner Style Review
            </a>
            <Link to="/blog/origin-siem-soc-monitoring" className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-[#28B5E1]/40 bg-[#28B5E1]/10 px-6 py-3 text-sm font-semibold text-[#28B5E1] backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1] hover:bg-[#28B5E1]/20 hover:text-white sm:px-7 sm:py-3.5 sm:text-base">
              Read Origin Story
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </Link>
            <button onClick={openContact} className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base">
              Get a Free OT Assessment
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

export default function OTICSSecurity() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>OT / ICS Security UAE | Industrial Cybersecurity | Artiflex IT</title>
        <meta name="description" content="UAE OT / ICS Security: Nozomi Networks, Claroty, Dragos, Tenable OT and Microsoft Defender for IoT. Vendor matrix, Gartner-style scorecard and audit-ready compliance for IEC 62443, NESA and ADHICS." />
        <link rel="canonical" href="https://artiflexit.com/cybersecurity/ot-ics-security" />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "Service", "serviceType": "OT / ICS Security", "provider": { "@type": "Organization", "name": "Artiflex IT" }, "areaServed": { "@type": "Country", "name": "United Arab Emirates" }, "description": "UAE OT / ICS Security delivery across Nozomi, Claroty, Dragos, Tenable OT Security and Microsoft Defender for IoT." })}</script>
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map((f) => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer } })) })}</script>
      </>

      <OTHero />

      {/* ───────── VENDOR LINEUP ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-14 sm:py-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(to right, #1B8AC7 1px, transparent 1px), linear-gradient(to bottom, #1B8AC7 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#1B8AC7]/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-[#28B5E1]/10 blur-3xl" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">The Vendor Lineup</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
              OT / ICS{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">Vendors</span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The platforms we design, deploy and manage across UAE industrial environments. The conversation starts with your assets, protocols and safety constraints, not a SKU.
            </p>
          </div>

          {/* Honeycomb (large screens) */}
          <div className="mt-12 hidden flex-col items-center lg:flex">
            {(() => {
              const layouts: Record<number, number[]> = { 1: [1], 2: [2], 3: [3], 4: [3, 1], 5: [3, 2], 6: [3, 3] };
              const sizes = layouts[otVendorList.length] ?? [Math.ceil(otVendorList.length / 2), Math.floor(otVendorList.length / 2)];
              const rows: typeof otVendorList[] = [];
              let i = 0;
              sizes.forEach((s) => { rows.push(otVendorList.slice(i, i + s)); i += s; });
              const HEX_PATH = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
              return rows.map((row, rowIdx) => (
                <div key={rowIdx} className="flex" style={{ marginTop: rowIdx === 0 ? 0 : -52, transform: rowIdx > 0 && rows[rowIdx - 1].length === row.length ? "translateX(90px)" : undefined }}>
                  {row.map((v) => (
                    <Link key={v.slug} to={`/cybersecurity/ot-ics-security/${v.slug}`} aria-label={v.name} className="group relative block h-[208px] w-[180px] transition-all duration-300 hover:z-10 hover:scale-[1.06] [filter:drop-shadow(0_4px_12px_rgba(15,23,42,0.10))] hover:[filter:drop-shadow(0_10px_30px_rgba(40,181,225,0.45))]">
                      <div className="absolute inset-0 bg-slate-200/80 transition-colors duration-300 group-hover:bg-[#28B5E1]" style={{ clipPath: HEX_PATH }} />
                      <div className="absolute inset-[2px] bg-white transition-all duration-300 group-hover:bg-gradient-to-b group-hover:from-[#28B5E1]/[0.08] group-hover:to-white" style={{ clipPath: HEX_PATH }} />
                      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
                        {v.logo ? (
                          <img
                            src={v.logo}
                            alt={v.name}
                            loading="lazy"
                            className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-110"
                          />
                        ) : (
                          <span className="px-2 text-center font-display text-sm font-semibold leading-tight text-slate-900">
                            {v.name}
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
            {otVendorList.map((v) => (
              <Link key={v.slug} to={`/cybersecurity/ot-ics-security/${v.slug}`} className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/50 hover:shadow-md">
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
                    className="h-12 w-12 object-contain"
                  />
                ) : null}
                <p
                  className="font-display text-[11px] font-semibold leading-tight text-slate-900"
                  style={{ display: v.logo ? "none" : "block" }}
                >
                  {v.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CAPABILITY MAP ───────── */}
      <section id="capabilities" className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">The Capability Map</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">The four pillars of industrial security</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              OT security is not one product. Visibility, detection, vulnerability management and compliance feed each other into one defensible posture across plants, substations and process control networks.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c) => (
              <div key={c.title} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1B8AC7]/60 hover:shadow-[0_20px_60px_-12px_rgba(27,138,199,0.20)]">
                <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#045891] to-[#28B5E1]" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#1B8AC7]">{c.tag}</span>
                <h3 className="mt-2 font-display text-xl font-bold text-slate-900">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{c.desc}</p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-slate-500">{c.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── VENDOR COMPARISON ───────── */}
      <section id="vendor-matrix" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Compare Vendors</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Vendor comparison for <span className="gradient-text">OT / ICS Security buyers</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Different industries, different leaders. This matrix maps the platforms we deliver across UAE industrial environments, so you can see where each one is the right tool and where it is not.
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
                        <p className="font-display text-sm font-semibold text-white sm:text-base">{v.name}</p>
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
                                {"★".repeat((cell as StarCell).stars)}<span className="text-slate-300">{"★".repeat(5 - (cell as StarCell).stars)}</span>
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
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-slate-600">
            No single vendor owns OT security. Our default UAE architecture pairs <span className="font-semibold text-[#045891]">Nozomi</span> for industrial visibility and NDR with <span className="font-semibold text-[#045891]">Claroty</span> for the most complex multi-protocol estates. <span className="font-semibold text-[#045891]">Dragos</span> wins in critical infrastructure, <span className="font-semibold text-[#045891]">Tenable.ot</span> for unified IT/OT vulnerability and <span className="font-semibold text-[#045891]">Defender for IoT</span> for Microsoft-aligned SOCs.
          </p>
        </div>
      </section>

      {/* ───────── DETAILED CARDS ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Detailed Comparison on OT / ICS Security Vendors</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Strengths, blind spots and the deployment context each platform fits. Recommendations reflect UAE deployment patterns, not vendor tier.
            </p>
          </div>

          <div className="mt-6 flex justify-center sm:mt-8">
            <button onClick={openContact} className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base">
              Talk to our Consultant
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </button>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:mt-16 lg:grid-cols-2 lg:items-stretch">
            {vendors.map((v, idx) => {
              const recommended = v.best.includes("Recommended");
              return (
                <motion.div key={v.name} id={v.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: idx * 0.05 }} className="flex h-full scroll-mt-24">
                  <div className={`group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(4,88,145,0.12)] sm:p-8 ${recommended ? "border-brand-blue/30 shadow-[0_4px_20px_rgba(27,138,199,0.10)]" : "border-border-light shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-brand-blue/25"}`}>
                    {recommended && (
                      <span className="absolute -top-px left-6 inline-flex rounded-b-md bg-brand-blue px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white" aria-label="Recommended vendor">Recommended</span>
                    )}
                    <div className="flex items-start justify-between gap-4 pt-3">
                      <div className="min-w-0">
                        <h3 className="font-display text-xl font-bold text-heading transition-colors group-hover:text-brand-blue sm:text-2xl">{v.name}</h3>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-brand-blue">{v.best}</p>
                      </div>
                      {v.logo && (
                        <img src={v.logo} alt={`${v.name} logo`} loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} className="h-10 w-24 shrink-0 object-contain object-right sm:h-12 sm:w-32" />
                      )}
                    </div>
                    <div className="mt-5 space-y-3">
                      <div>
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Why it wins</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-body">{v.strength}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Consider</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-body/80">{v.watch}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── GARTNER-STYLE SCORECARD ───────── */}
      <section id="gartner-comparison" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Gartner-style Review</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Gartner-style Capability Comparison</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each platform rated across OT/ICS Security capabilities on a standardised tier scale. A gold ★ denotes best-in-class for that capability.
            </p>
          </div>

          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-3 text-xs text-slate-600">
            <span className="font-mono uppercase tracking-wider text-slate-500">Rating scale:</span>
            {(["best", "excellent", "veryStrong", "strong", "good", "none"] as Tier[]).map((t) => {
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
                            {cell.note && <p className="mt-1.5 text-xs leading-snug text-slate-600">{cell.note}</p>}
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

      {/* ───────── DECISION FRAMEWORK ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(27,138,199,0.06),transparent_60%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Decision Framework</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Questions we ask before designing an OT programme</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              OT programmes get cleaner when the questions are direct. Walk through these and the architecture usually falls out by itself.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-6xl sm:mt-12">
            <div className="grid grid-cols-1 gap-2 sm:gap-3 md:grid-cols-2">
              {decisionQuestions.map((item) => (
                <div
                  key={item.q}
                  tabIndex={0}
                  className="group relative flex min-h-[5rem] flex-col justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-r from-[#04101E] to-[#0A3D6B] px-4 py-3 shadow-md transition-all duration-300 hover:border-[#28B5E1]/40 hover:shadow-lg focus-within:border-[#28B5E1]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#28B5E1]/40 sm:min-h-[5.5rem] sm:px-5 sm:py-3.5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="font-display text-sm font-semibold leading-snug text-white sm:text-base">
                      {item.q}
                    </h4>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 shrink-0 text-[#28B5E1] transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── DELIVERY MODEL ───────── */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <SectionHeader label="How we work" title={<>Our OT <span className="gradient-text">delivery model</span></>} description="We don't sell licences. We deliver OT security outcomes: assess, design, deploy, manage. Every stage produces something an auditor can read and a plant manager can sign off on." centered />

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
                {idx < 3 && <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 lg:block"><div className="h-px w-6 bg-gradient-to-r from-brand-blue/40 to-transparent" /></div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── WHY ARTIFLEX ───────── */}
      <section className="relative overflow-hidden bg-navy-deep py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(27,138,199,0.18),transparent_60%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#28B5E1]">Why Artiflex IT</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">14+ years of UAE OT and ICS delivery</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when Nozomi wins, when Claroty wins, when Dragos is the right specialist, and when your existing controls just need tuning. The point of an honest assessment is honest answers.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years in UAE industrial cybersecurity" },
              { value: "5", label: "OT/ICS platforms we deliver" },
              { value: "IEC 62443", label: "NESA, ADHICS, NERC CIP alignment" },
              { value: "24/7", label: "Managed OT support" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-sm transition-colors duration-300 hover:border-[#28B5E1]/30">
                <p className="font-display text-2xl font-bold leading-none text-white sm:text-3xl">{stat.value}</p>
                <p className="mt-3 text-xs leading-relaxed text-slate-400 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeader label="Knowledge Base" title={<>Frequently <span className="gradient-text">asked</span> questions</>} description="What businesses ask us most about OT security, ICS visibility and compliance." centered />

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

      <CTASection title="Get the OT / ICS Security Selection Guide" description="A vendor-neutral comparison of Nozomi, Claroty, Dragos, Tenable OT and Microsoft Defender for IoT, with TCO analysis, sensor sizing and real UAE deployment case studies." primaryButton={{ text: "Book a free OT posture assessment", action: "modal" }} />
    </>
  );
}
