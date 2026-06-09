import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";

/* ───────── NDR PLATFORMS WE EVALUATE (LINEUP) ───────── */

const ndrPlatforms = [
  { slug: "linkshadow", name: "LinkShadow", rank: "UAE-Founded", featured: true, logo: "/logos/LinkShadow.png" },
  { slug: "sophos-ndr", name: "Sophos NDR Add-on", logo: "/logos/sophos.svg" },
  { slug: "darktrace", name: "Darktrace / NETWORK", logo: "/logos/Darktrace.png" },
  { slug: "vectra", name: "Vectra AI", logo: "/logos/Vectra.png" },
  { slug: "extrahop", name: "ExtraHop RevealX", logo: "/logos/ExtraHop.png" },
  { slug: "arista", name: "Arista NDR", logo: "/logos/Arista.png" },
  { slug: "trellix", name: "Trellix NDR", logo: "/logos/Trellix.png" },
  { slug: "corelight", name: "Corelight Open NDR", logo: "/logos/Corelight.png" },
];

/* ───────── WHY NDR MATTERS ───────── */

const ndrReasons = [
  {
    title: "East-West Lateral Movement",
    desc: "Attackers who gain a foothold move laterally between internal systems through paths that never touch the perimeter. NDR watches internal network traffic continuously, the only way to detect this in real time.",
  },
  {
    title: "Encrypted C2 Traffic",
    desc: "Modern malware uses encrypted channels (TLS, DNS over HTTPS) for command and control. NDR analyses traffic behaviour and patterns, not payload content, to detect C2 even in fully encrypted traffic.",
  },
  {
    title: "Unmanaged & IoT Devices",
    desc: "Every device that cannot run an EDR agent (IoT sensors, OT equipment, BYOD phones, IP cameras) is invisible to endpoint tools. NDR sees everything that generates network traffic.",
  },
  {
    title: "Insider Threat Detection",
    desc: "Insiders with legitimate credentials never trigger signature alerts. NDR's behavioural baselining detects anomalous data access and privilege misuse that endpoint tools cannot distinguish from normal user activity.",
  },
  {
    title: "Zero-Day & Novel Attacks",
    desc: "Signature-based tools cannot detect unknown threats. NDR's ML engines model normal network behaviour and detect statistical deviations, catching zero-days before signatures exist.",
  },
  {
    title: "OT / ICS Visibility",
    desc: "PLCs, SCADA and legacy ICS equipment cannot run EDR agents. NDR provides network-level OT visibility without touching the devices, passive and agentless monitoring.",
  },
];

/* ───────── SOPHOS MDR + NDR COMBO ───────── */

const comboCards = [
  {
    title: "Native Sophos Central Integration",
    desc: "NDR detections feed directly into Sophos Central, the same console as Sophos Intercept X, Sophos Firewall and Sophos MDR. One alert pipeline, one investigation workflow, one SOC team.",
  },
  {
    title: "Five Complementary ML Engines",
    desc: "AI encrypted-traffic analysis, DGA detector, session-pattern analysis, behavioural risk analytics and rule-based IOC detection, five engines running simultaneously, each catching what the others may miss.",
  },
  {
    title: "Active Threat Response via XGS",
    desc: "When NDR detects a compromised host, it pushes an automated response to the Sophos XGS Firewall, instantly isolating that host. Containment in seconds, no manual intervention required.",
  },
  {
    title: "Fraction of Standalone NDR Cost",
    desc: "Vectra AI and Darktrace standalone NDR run USD 60,000 to 250,000+ annually. Sophos NDR as an add-on to existing Sophos MDR Complete costs a small fraction of this.",
  },
  {
    title: "NDR Essentials Free, XGS v21.5+",
    desc: "Sophos XGS Firewall customers with Xstream Protection get NDR Essentials at no additional cost from firmware v21.5 onwards, immediate network-layer detection at zero extra cost.",
  },
  {
    title: "Unmanaged Device Discovery",
    desc: "Automatically discovers every device generating network traffic (IoT, OT, BYOD, IP cameras) giving the MDR SOC visibility into every asset regardless of whether it runs a Sophos agent.",
  },
];

/* ───────── SELECTION FRAMEWORK ───────── */

const selectionFramework = [
  {
    step: "1",
    question: "Do you already have Sophos MDR?",
    desc: "If yes: the Sophos NDR add-on is almost always the right first answer. Native integration, shared SOC team, a fraction of standalone NDR cost.",
  },
  {
    step: "2",
    question: "Significant OT/IoT/ICS assets?",
    desc: "LinkShadow for UAE OT environments. Darktrace for air-gapped OT. Corelight for deep OT protocol analysis. Confirm OT protocol support before shortlisting.",
  },
  {
    step: "3",
    question: "Arabic-language support required?",
    desc: "LinkShadow is the only NDR platform with UAE-native delivery and Arabic-language support built in, often decisive for UAE government and regulated-industry procurement.",
  },
  {
    step: "4",
    question: "What is the realistic budget?",
    desc: "Sophos NDR: low (add-on). LinkShadow: mid-market to enterprise. Vectra/Darktrace: USD 60K to 300K+. Corelight open-source: low licence, high operational cost.",
  },
  {
    step: "5",
    question: "Autonomous response required?",
    desc: "Darktrace Antigena is the most mature autonomous response. Sophos NDR Active Threat Response via the XGS Firewall is excellent for Sophos environments.",
  },
  {
    step: "6",
    question: "Standalone NDR or integrated XDR?",
    desc: "Standalone: Vectra AI, Darktrace, LinkShadow. Integrated: Sophos NDR (via Central XDR). Integrated means operational simplicity; standalone means detection depth.",
  },
];

/* ───────── DETAILED COMPARISON CARDS ───────── */

const vendors = [
  {
    name: "LinkShadow",
    best: "UAE-Founded NDR · Regional Recommendation (Recommended #1)",
    strength:
      "The only major NDR platform born in the Middle East, founded in Dubai in 2017 and built for GCC enterprise environments. Unsupervised ML detection with no signatures, NESA/CBUAE/ADHICS compliance built into the product, native Arabic-language delivery and an in-country support team operating in UAE time zones.",
    watch:
      "Best for UAE government, regulated industries (CBUAE, ADHICS, NESA) and organisations needing Arabic-language delivery or agent-free OT/IoT visibility at competitive regional pricing.",
    logo: "/logos/LinkShadow.png",
  },
  {
    name: "Sophos NDR + MDR Complete",
    best: "Best Value · Sophos MDR + NDR (Recommended)",
    strength:
      "The network detection add-on to Sophos MDR Complete, using five complementary ML engines feeding directly into Sophos Central. Active Threat Response auto-isolates compromised hosts via the XGS Firewall. NDR Essentials is free for XGS Xstream customers from firmware v21.5.",
    watch:
      "Best for UAE organisations running Sophos MDR Complete who want network-layer detection in the same SOC and console at a fraction of standalone NDR cost.",
    logo: "/logos/sophos.svg",
  },
  {
    name: "Darktrace / NETWORK",
    best: "Self-Learning AI · Autonomous Response",
    strength:
      "Founded 2013, the largest NDR market share globally. Self-Learning AI models every entity and Antigena delivers the most mature autonomous response in the category, including on encrypted traffic. Strong air-gapped OT reference base.",
    watch:
      "Best for enterprises wanting autonomous response and self-learning behavioural AI, including air-gapped OT environments. Premium AI pricing.",
    logo: "/logos/Darktrace.png",
  },
  {
    name: "Vectra AI",
    best: "Gartner NDR Leader · Highest Ability to Execute",
    strength:
      "A Gartner NDR Magic Quadrant Leader (highest Ability to Execute) and Customers' Choice 2024. Attack Signal Intelligence maps detections to MITRE ATT&CK kill-chain phases, with AI-driven prioritisation that surfaces a handful of high-confidence incidents per day across hybrid cloud and on-premises.",
    watch:
      "Best for large UAE enterprise needing standalone enterprise NDR with the strongest Gartner validation and a budget of USD 60K to 250K+ annually.",
    logo: "/logos/Vectra.png",
  },
  {
    name: "ExtraHop RevealX",
    best: "Full-Packet Forensics · NDR + NPM",
    strength:
      "Founded 2007 (Broadcom 2023). Cloud-native sensor with full packet capture and forensics, combining NDR with network performance monitoring. Strong IoT visibility from its NPM heritage.",
    watch:
      "Best for organisations wanting full-packet forensics and combined NDR plus network performance monitoring. Broadcom channel complexity; USD 80K to 250K+.",
    logo: "/logos/ExtraHop.png",
  },
  {
    name: "Corelight Open NDR",
    best: "Open NDR · Zeek-Based",
    strength:
      "Open NDR built on open-source Zeek, delivering streaming network forensics and deep protocol analysis, including strong OT/ICS protocol coverage. Low licence cost with high operational effort.",
    watch:
      "Best for teams wanting open, Zeek-based deep packet analysis and deep OT protocol coverage, with the engineering capacity to operate it.",
    logo: "/logos/Corelight.png",
  },
];

/* ───────── VENDOR MATRIX (BUYER'S MATRIX) ───────── */

const matrixVendors = [
  { name: "LinkShadow", rank: "★", featured: true, recommended: true },
  { name: "Sophos NDR", recommended: true },
  { name: "Darktrace", recommended: true },
  { name: "Vectra AI", recommended: true },
  { name: "ExtraHop" },
  { name: "Corelight" },
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
      "UAE-founded 2017. Dubai HQ. AI-native NDR built for GCC enterprise.",
      "Sophos NDR add-on. 5 ML engines. Native Sophos Central + MDR.",
      "Founded 2013. Self-Learning AI. Largest NDR market share globally.",
      "Founded 2012. Gartner Leader, highest execution. Customers' Choice 2024.",
      "Founded 2007. Broadcom 2023. NDR + NPM. Full-packet forensics.",
      "Open NDR built on Zeek. Streaming network forensics. Gartner-recognised.",
    ],
  },
  {
    label: "Detection",
    type: "text",
    cells: [
      "Unsupervised ML. No signatures. Deviation from network behaviour baseline.",
      "5 engines: AI encrypted traffic, DGA, session pattern, behavioural, IOC rules.",
      "Self-Learning AI models every entity. Antigena autonomous response available.",
      "Attack Signal Intelligence (ASI). Kill-chain mapping. Industry-leading prioritisation.",
      "Cloud-native sensor. Full packet capture + forensics. NDR + NPM combined.",
      "Zeek-based deep packet analysis. Strong OT/ICS protocol coverage.",
    ],
  },
  {
    label: "OT / IoT / ICS",
    type: "stars",
    cells: [
      { stars: 5, note: "UAE industrial experience. Agent-free." },
      { stars: 4, note: "Unmanaged device discovery." },
      { stars: 5, note: "Air-gapped OT reference. Largest base." },
      { stars: 4, note: "AI OT anomaly detection." },
      { stars: 4, note: "Good IoT. NPM heritage." },
      { stars: 5, note: "Deep OT protocol analysis (Zeek)." },
    ],
  },
  {
    label: "UAE suitability",
    type: "stars",
    cells: [
      { stars: 5, note: "UAE-founded. Arabic. NESA/CBUAE/ADHICS native." },
      { stars: 5, note: "Strong via Sophos + Artiflex IT." },
      { stars: 3, note: "UAE office. Financial sector references." },
      { stars: 3, note: "UAE via partners. US/Europe primary." },
      { stars: 3, note: "Broadcom channel complexity." },
      { stars: 2, note: "Open-source; limited UAE presence." },
    ],
  },
  {
    label: "Annual cost",
    type: "text",
    cells: [
      "Mid-market to enterprise. Competitive vs Vectra/Darktrace.",
      "Low, Sophos MDR add-on pricing.",
      "USD 60K to 300K+ annually.",
      "USD 60K to 250K+ annually.",
      "USD 80K to 250K+. Broadcom pricing.",
      "Open-source (free) plus commercial tiers.",
    ],
  },
  {
    label: "Strategic Verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "UAE-founded regional pick. NESA/CBUAE/ADHICS native, Arabic delivery, agent-free OT/IoT visibility." },
      { recommended: true, text: "Best value. Network detection in the same Sophos MDR SOC at a fraction of standalone NDR cost." },
      { recommended: true, text: "Self-Learning AI with the most mature autonomous response, including air-gapped OT." },
      { recommended: true, text: "Gartner NDR Leader. Attack Signal Intelligence and AI-driven prioritisation for enterprise SOCs." },
      { text: "Full-packet forensics and combined NDR plus NPM; Broadcom channel and premium pricing." },
      { text: "Open Zeek-based deep packet analysis for teams with the engineering capacity to operate it." },
    ],
  },
];

/* ───────── GARTNER-STYLE CAPABILITY SCORECARD ───────── */

const featureVendors = ["LinkShadow", "Sophos NDR", "Darktrace", "Vectra AI"];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "limited";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "AI / ML threat detection",
    cells: [
      { tier: "best", note: "Unsupervised ML, no signatures" },
      { tier: "excellent", note: "5 complementary ML engines" },
      { tier: "best", note: "Self-Learning AI reference" },
      { tier: "best", note: "Attack Signal Intelligence" },
    ],
  },
  {
    label: "Encrypted traffic analysis",
    cells: [
      { tier: "best", note: "ML behavioural, no decryption" },
      { tier: "best", note: "Dedicated AI encrypted-traffic engine" },
      { tier: "best", note: "Antigena on encrypted traffic" },
      { tier: "excellent", note: "JA3/JA4 + ML pattern" },
    ],
  },
  {
    label: "UAE/GCC compliance & support",
    cells: [
      { tier: "best", note: "UAE-founded, NESA/CBUAE native" },
      { tier: "best", note: "Via Artiflex IT in-country" },
      { tier: "veryStrong", note: "UAE office, financial sector" },
      { tier: "strong", note: "ME via partner channel" },
    ],
  },
  {
    label: "Value for money",
    cells: [
      { tier: "best", note: "Enterprise capability, regional pricing" },
      { tier: "best", note: "Add-on cost fraction of standalone" },
      { tier: "strong", note: "Premium AI pricing" },
      { tier: "strong", note: "Premium; ROI at large scale" },
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
    rank: "UAE-Founded NDR · Regional Recommendation",
    name: "LinkShadow",
    tagline: "UAE-born AI-powered NDR. NESA/CBUAE/ADHICS native. Arabic-language delivery. On-site GCC support.",
    featured: true,
    specs: [
      { label: "Founded", value: "2017, Dubai UAE" },
      { label: "HQ", value: "Dubai Silicon Oasis" },
      { label: "Detection", value: "Unsupervised ML, no signatures" },
      { label: "Compliance", value: "NESA / CBUAE / ADHICS built-in" },
      { label: "Deployment", value: "On-prem / Cloud / SaaS" },
      { label: "Language", value: "Arabic & English" },
    ],
    capabilities: [
      {
        title: "UAE-Founded, built for Middle East network environments",
        desc: "Built by UAE-based engineers for UAE-based enterprise environments. Default configuration reflects GCC enterprise realities: mixed Arabic/English asset naming, UAE public-sector and financial topologies, and Middle East threat actor profiles.",
      },
      {
        title: "Unsupervised machine learning, no signatures",
        desc: "Baselines normal network behaviour for every device and user without pre-defined signatures, rules or threat templates. Detects unknown threats, zero-days and insider threats that signature-based systems structurally cannot identify.",
      },
      {
        title: "NESA, CBUAE and ADHICS compliance, built into the product",
        desc: "Compliance dashboards aligned to NESA Information Assurance Standards, CBUAE Cyber Resilience Framework, UAE PDPL and ADHICS are built in, not community content. Native alignment cuts deployment time for UAE regulated-industry customers.",
      },
      {
        title: "Regional threat intelligence, Middle East focus",
        desc: "Threat intelligence informed by Middle East threat actor activity, UAE-specific attack patterns and GCC sector intelligence. Campaigns targeting UAE organisations appear in the detection library faster than in globally-focused platforms.",
      },
      {
        title: "Full OT, IoT and unmanaged device visibility",
        desc: "Monitors network traffic from every device (PLCs, SCADA, IP cameras, IoT sensors, BYOD phones) without touching the devices. Agent-free profiling of all network assets, including UAE industrial and critical infrastructure.",
      },
      {
        title: "Arabic and English, bilingual platform and support",
        desc: "One of the only cybersecurity platforms with native Arabic-language support throughout. Dubai-headquartered team provides bilingual technical support and on-site professional services across UAE, KSA, Oman, Qatar and Kuwait in UAE time zones.",
      },
    ],
    shortlist: [
      "UAE government and public sector requiring a UAE-headquartered vendor with in-country delivery.",
      "UAE regulated industries (CBUAE banking, ADHICS healthcare, NESA government) needing native compliance alignment.",
      "Organisations with significant OT/IoT/ICS assets needing agent-free network-level visibility.",
      "Enterprises where Arabic-language platform delivery, reporting and support are requirements.",
      "UAE organisations wanting enterprise-grade NDR at competitive regional pricing.",
    ],
    note: {
      title: "UAE-native vs retrofitted-for-region",
      body: "LinkShadow's UAE-native origin reflects fundamental product design decisions: compliance frameworks built into the product, regional threat actor intelligence native to the detection library, and a support team operating in GST without overnight routing to European or US help desks. For UAE regulated-industry procurement, this combination is often decisive.",
    },
  },
  {
    rank: "Best Value NDR · Sophos MDR + NDR",
    name: "Sophos NDR + MDR Complete",
    tagline: "Best-value network detection. 5 ML engines. Native Sophos Central. Fraction of standalone NDR cost.",
    specs: [
      { label: "Detection", value: "Five ML engines" },
      { label: "Integration", value: "Native Sophos Central" },
      { label: "Response", value: "Active Threat Response (XGS)" },
      { label: "Cost vs standalone", value: "Small fraction" },
      { label: "NDR Essentials", value: "Free with XGS v21.5+" },
      { label: "MDR integration", value: "Native Sophos MDR" },
    ],
    capabilities: [
      {
        title: "Five complementary detection engines",
        desc: "AI encrypted-traffic analysis, DGA detector, session-pattern analysis, behavioural risk analytics and rule-based IOC detection, five engines running simultaneously, each covering threat scenarios the others may miss.",
      },
      {
        title: "Native Sophos Central integration, one console, one SOC team",
        desc: "NDR detections feed directly into Sophos Central, the same console as Sophos Intercept X, Sophos Firewall and Sophos MDR. No separate NDR console, no context loss, no separate alert queue.",
      },
      {
        title: "Active Threat Response, automated containment via XGS Firewall",
        desc: "When Sophos NDR identifies a compromised host, it pushes a response command to the Sophos XGS Firewall, immediately isolating that host. Containment in seconds, no SOAR playbook, no human intervention required.",
      },
      {
        title: "Fraction of standalone enterprise NDR cost",
        desc: "Vectra AI and Darktrace standalone NDR cost USD 60,000 to 250,000+ annually. Sophos NDR as an add-on to existing Sophos MDR Complete costs a small fraction, making network-layer detection accessible to UAE mid-market.",
      },
      {
        title: "NDR Essentials free with Sophos XGS Firewall v21.5+",
        desc: "Sophos XGS Firewall customers running Xstream Protection get NDR Essentials at no additional cost, immediate network-layer detection capability without additional investment.",
      },
      {
        title: "Unmanaged device discovery",
        desc: "Automatically discovers every device generating network traffic (IoT, OT, BYOD, IP cameras) giving the MDR SOC visibility into every asset regardless of whether it runs a Sophos endpoint agent.",
      },
    ],
    shortlist: [
      "UAE organisations running Sophos MDR Complete who want to extend managed detection to the network layer at the lowest additional cost.",
      "Sophos XGS Firewall customers running Xstream Protection wanting to activate NDR Essentials at no extra cost.",
      "Mid-market UAE organisations wanting enterprise-grade network detection but unable to justify USD 60K to 250K+ for standalone NDR.",
      "Security teams wanting network plus endpoint MDR in a single SOC relationship without a second vendor or console.",
    ],
    note: {
      title: "Artiflex IT recommendation",
      body: "If you are running Sophos MDR Complete, add Sophos NDR. The combined endpoint, network, email and cloud coverage at the combined cost delivers more comprehensive managed detection than any alternative at equivalent budget, typically 40 to 60 percent lower than deploying standalone enterprise NDR alongside a separate MDR service.",
    },
  },
  {
    rank: "Gartner NDR MQ Leader · Highest Ability to Execute",
    name: "Vectra AI",
    tagline: "Gartner NDR Leader. Highest Ability to Execute. Attack Signal Intelligence. Customers' Choice 2024.",
    specs: [
      { label: "Founded", value: "2012, San Jose CA" },
      { label: "Gartner position", value: "Leader, highest execution" },
      { label: "Core tech", value: "Attack Signal Intelligence" },
      { label: "Coverage", value: "Hybrid cloud + on-prem" },
      { label: "Annual cost", value: "USD 60K to 250K+" },
      { label: "UAE presence", value: "Via partner channel" },
    ],
    capabilities: [
      {
        title: "Attack Signal Intelligence (ASI), kill-chain mapped detection",
        desc: "ASI automatically maps network detections to MITRE ATT&CK kill-chain phases, identifying not just that an anomaly occurred but where in the attack progression it sits, transforming raw alerts into prioritised, actionable intelligence.",
      },
      {
        title: "AI-driven prioritisation, fewer alerts, higher confidence",
        desc: "Generates significantly fewer alerts than traditional NDR by using ML to distinguish high-confidence threat signals from background noise, typically surfacing a handful of high-priority incidents per day with the evidence to act.",
      },
      {
        title: "Hybrid cloud coverage, on-premises plus AWS, Azure, GCP",
        desc: "Monitors network traffic across on-premises data centres, AWS VPCs, Azure VNets and GCP networks simultaneously, providing unified east-west and north-south visibility across hybrid cloud environments.",
      },
      {
        title: "Identity threat detection, Active Directory and Entra ID",
        desc: "Native Active Directory and Microsoft Entra ID monitoring detects Kerberoasting, Golden Ticket attacks, DCSync and other identity-based techniques increasingly central to ransomware targeting UAE enterprise environments.",
      },
      {
        title: "Gartner Customers' Choice 2024, peer validation",
        desc: "Received the Gartner Peer Insights Customers' Choice distinction for NDR in 2024, independent confirmation of platform quality across deployment experience, feature completeness and vendor support.",
      },
    ],
    shortlist: [
      "Large UAE enterprise needing standalone enterprise NDR with the strongest Gartner validation, ready to invest USD 60K to 250K+ annually.",
      "SOC teams wanting AI-driven alert prioritisation over high-volume alert queues requiring significant triage.",
      "Organisations with significant hybrid cloud footprints needing unified detection across all environments.",
      "Enterprises facing sophisticated threat actors needing kill-chain-aware detection that surfaces attacker progression context.",
    ],
  },
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "Do I need NDR if I already have EDR and a firewall?",
    answer:
      "EDR only sees managed, corporate-owned endpoints; a firewall only sees traffic crossing the perimeter. NDR watches internal east-west traffic to catch lateral movement, encrypted command-and-control, rogue and unmanaged IoT/OT devices, and insider threats that endpoint and perimeter tools structurally cannot see. It closes the network blind-spot, not a replacement for EDR or firewall but the layer that completes them.",
  },
  {
    question: "Why do you specifically recommend LinkShadow for UAE?",
    answer:
      "LinkShadow is the only major NDR platform founded in the UAE (Dubai, 2017), with NESA, CBUAE and ADHICS compliance built into the product, native Arabic-language delivery, and an in-country support team operating in UAE time zones. For UAE government and regulated-industry procurement that combination is often decisive, alongside enterprise-grade unsupervised ML detection at competitive regional pricing.",
  },
  {
    question: "Is Sophos NDR the same as Vectra or Darktrace?",
    answer:
      "All three are credible NDR platforms targeting different buyers. Sophos NDR is an add-on to Sophos MDR Complete that feeds the same SOC and console at a fraction of standalone cost, ideal for Sophos customers. Vectra AI and Darktrace are premium standalone enterprise NDR platforms (roughly USD 60K to 300K+ annually) with deep AI detection and autonomous response. The right pick depends on whether you want integrated value or standalone detection depth.",
  },
  {
    question: "What is a TAP or SPAN port?",
    answer:
      "A TAP (Test Access Point) or SPAN (Switched Port Analyzer) port mirrors a copy of network traffic to the NDR sensor without sitting in line with production traffic. This lets NDR analyse east-west and north-south traffic passively, with no latency or risk to the live network. Designing TAP/SPAN placement is part of our NDR design stage.",
  },
  {
    question: "How long does it take for NDR ML to baseline my environment?",
    answer:
      "Most NDR platforms need roughly 7 to 14 days of traffic to baseline normal behaviour for every device before behavioural detections are fully tuned. We train the ML baseline, tune alerts and deliver a first 30-day network threat report as part of deployment.",
  },
];

/* ───────── DELIVERY MODEL ───────── */

const deliveryStages = [
  {
    title: "Assess",
    duration: "1 week",
    summary:
      "Network topology review, traffic volume sizing, OT/IoT asset inventory, detection gap analysis, and Sophos MDR compatibility check.",
    deliverable: "Network visibility gap report, NDR recommendation, integration architecture.",
  },
  {
    title: "Design",
    duration: "1–2 weeks",
    summary:
      "TAP/SPAN placement design, detection use-case library, MITRE ATT&CK coverage mapping and SOC tool integration.",
    deliverable: "Sensor architecture diagram, detection charter, SOC integration design.",
  },
  {
    title: "Deploy",
    duration: "2–4 weeks",
    summary:
      "Sensor deployment, traffic mirroring, ML baseline training (7 to 14 days), alert tuning, analyst training, and the first 30-day network threat report.",
    deliverable: "Live NDR with baseline, runbooks, 30-day threat landscape report.",
  },
  {
    title: "Manage",
    duration: "Ongoing",
    summary:
      "Monthly threat hunting, detection tuning, new asset discovery review, compliance reporting and a quarterly NDR posture briefing.",
    deliverable: "Monthly hunt reports. Quarterly compliance evidence. Posture maintained.",
  },
];

/* ───────── HERO ───────── */

function NdrHero() {
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

      <div className="relative z-10 border-b border-white/5">
        <div className="shell flex w-full items-center justify-end gap-4 pt-24 pb-3 sm:pt-28">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center justify-end gap-2 text-[10px] text-slate-400 sm:text-[11px]">
              <li>
                <Link to="/" className="transition-colors hover:text-white">Home</Link>
              </li>
              <li className="text-slate-600">/</li>
              <li>
                <Link to="/cybersecurity" className="transition-colors hover:text-white">Cybersecurity</Link>
              </li>
              <li className="text-slate-600">/</li>
              <li>
                <span className="font-medium text-[#28B5E1]">NDR</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="shell relative z-10 flex w-full flex-1 items-center py-10 sm:py-12 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full"
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#28B5E1] sm:text-xs">
            Network Security · East-West Detection · AI Threat Analytics
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-5xl lg:text-[3.5rem]">
            NDR:{" "}
            <span className="gradient-text">Network Detection</span>
            <span className="block">& Response</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            NDR sees what endpoint tools cannot: lateral movement between devices, encrypted command-and-control, rogue assets, and insider threats moving silently through east-west network traffic. Where EDR watches the endpoint, NDR watches the wire.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
            <a href="#vendor-comparison" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base">
              Compare NDR Vendors
            </a>
            <a href="#gartner-comparison" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base">
              Gartner-style Review
            </a>
            <Link to="/blog/origin-ndr" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base">
              Read Origin Story
            </Link>
            <button onClick={openContact} className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base">
              Free NDR Assessment
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
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

export default function SecurityOperationsNdr() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>NDR (Network Detection & Response) UAE | Vendor Comparison & Gartner-style Scorecard | Artiflex IT</title>
        <meta
          name="description"
          content="UAE NDR buyer's guide. Vendor comparison and Gartner-style scorecard across LinkShadow (UAE-founded), Sophos NDR, Vectra AI, Darktrace, ExtraHop and Corelight. East-west detection, encrypted C2, OT/IoT visibility and AI threat analytics for UAE networks."
        />
        <link rel="canonical" href="https://artiflexit.com/cybersecurity/security-operations/ndr" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "NDR (Network Detection and Response)",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description":
              "UAE NDR delivery across LinkShadow, Sophos NDR, Vectra AI, Darktrace, ExtraHop and Corelight: east-west detection, encrypted traffic analysis, OT/IoT visibility and AI threat analytics.",
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

      <NdrHero />

      {/* ───────── NDR PLATFORMS LINEUP ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-14 sm:py-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(to right, #1B8AC7 1px, transparent 1px), linear-gradient(to bottom, #1B8AC7 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#1B8AC7]/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-[#28B5E1]/10 blur-3xl" />
        <div className="shell relative">
          <p className="text-center font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
            NDR Platforms We Evaluate and Deploy, UAE & Middle East
          </p>

          {/* Honeycomb (large screens) */}
          <div className="mt-12 hidden flex-col items-center lg:flex">
            {(() => {
              const layouts: Record<number, number[]> = { 1: [1], 2: [2], 3: [3], 4: [3, 1], 5: [3, 2], 6: [3, 3], 7: [4, 3], 8: [4, 4], 9: [5, 4] };
              const sizes = layouts[ndrPlatforms.length] ?? [Math.ceil(ndrPlatforms.length / 2), Math.floor(ndrPlatforms.length / 2)];
              const rows: typeof ndrPlatforms[] = [];
              let i = 0;
              sizes.forEach((s) => { rows.push(ndrPlatforms.slice(i, i + s)); i += s; });
              const HEX_PATH = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
              return rows.map((row, rowIdx) => (
                <div key={rowIdx} className="flex" style={{ marginTop: rowIdx === 0 ? 0 : -52, transform: rowIdx > 0 && rows[rowIdx - 1].length === row.length ? "translateX(90px)" : undefined }}>
                  {row.map((p) => (
                    <Link key={p.slug} to={`/cybersecurity/security-operations/ndr/${p.slug}`} aria-label={`View ${p.name} details`} className="group relative block h-[208px] w-[180px] transition-all duration-300 hover:z-10 hover:scale-[1.06] [filter:drop-shadow(0_4px_12px_rgba(15,23,42,0.10))] hover:[filter:drop-shadow(0_10px_30px_rgba(40,181,225,0.45))]">
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
            {ndrPlatforms.map((p) => (
              <Link key={p.slug} to={`/cybersecurity/security-operations/ndr/${p.slug}`} aria-label={`View ${p.name} details`} className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/50 hover:shadow-md">
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

      {/* ───────── WHY NDR MATTERS ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Why NDR Matters</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">The network blind-spot EDR cannot see</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Every modern enterprise has endpoints with EDR agents. But EDR only sees managed, corporate-owned assets. NDR fills the structural gaps that endpoint tools cannot reach.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ndrReasons.map((c) => (
              <article key={c.title} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1B8AC7]/60 hover:shadow-[0_20px_60px_-12px_rgba(27,138,199,0.20)]">
                <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#045891] to-[#28B5E1]" />
                <h3 className="font-display text-lg font-bold text-slate-900">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── SOPHOS MDR + NDR COMBO ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.06),transparent_60%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              <span aria-hidden>⭐</span> Best Value Combination for UAE Mid-Market
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Sophos MDR Complete + Sophos NDR: powerful protection, outstanding value
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              For organisations running Sophos MDR Complete, adding Sophos NDR is the highest-value NDR decision available, at a fraction of standalone enterprise NDR cost.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 sm:p-7">
            <p className="text-sm leading-relaxed text-emerald-900 sm:text-base">
              <span className="font-semibold">Artiflex IT recommendation:</span> Sophos MDR Complete plus Sophos NDR is the combination we recommend for most UAE mid-market and enterprise customers. 24/7 managed detection across endpoint and network layers, one SOC team, one console, at a combined cost typically 40 to 60 percent lower than deploying standalone enterprise NDR alongside a separate MDR service.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
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
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Selection framework for NDR buyers</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">The right NDR falls out of six honest questions. We ask these before recommending anything.</p>
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
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Vendor Comparison for NDR Buyers</p>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-2xl font-bold tracking-tight text-heading sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              Vendor comparison for <span className="gradient-text">NDR buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              Artiflex evaluates and deploys NDR platforms based on your environment, OT/IoT scope, existing security stack and budget, not our preferred SKU.
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

      {/* ───────── DETAILED CARDS + GARTNER ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Detailed Platform Analysis</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Detailed comparison on NDR vendors</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">Strengths, limitations and the buyer profile each platform was built for. Recommendations follow UAE deployment patterns, not vendor tier.</p>
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
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">The leading platforms, in depth</h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">Why our recommended NDR platforms earn their place, with the capabilities and the buyer profile each was built for.</p>
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
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Who should shortlist this</p>
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
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Gartner-style NDR capability scorecard</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">Each platform is rated across the capabilities that matter most for UAE NDR buyers, using a standardised tier scale. A gold ★ marker denotes best-in-class performance.</p>
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
          <SectionHeader label="How we work" title={<>Our NDR <span className="gradient-text">delivery model</span></>} description="From network visibility gap to a tuned, managed NDR deployment. Every stage produces something a SOC analyst can use and an auditor can read." centered />
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
          <SectionHeader label="Frequently Asked Questions" title={<>NDR questions we <span className="gradient-text">hear most</span></>} description="What UAE buyers ask us most about choosing, deploying and operating network detection and response." centered />
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
        title="Get a Free NDR Assessment"
        description="Free network visibility gap review covering your environment, OT/IoT scope, and a Sophos NDR or LinkShadow recommendation, delivered by a UAE-based engineer."
        primaryButton={{ text: "Book Free Assessment", action: "modal" }}
      />
    </>
  );
}
