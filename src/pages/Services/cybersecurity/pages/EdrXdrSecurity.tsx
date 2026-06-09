import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { useContactModal } from "@/components/layout/ContactModal";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { CTASection } from "@/pages/Home/sections/CTASection";
import {
  ShieldIcon,
  MonitorIcon,
  EyeIcon,
  AlertTriangleIcon,
  LayersIcon,
  LockIcon,
  CloudIcon,
  MailIcon,
} from "@/components/icons";

/* ───────── EVOLUTION (AV → EDR → XDR) ───────── */

const evolution = [
  {
    era: "1987",
    title: "Signature Antivirus",
    desc: "McAfee & Symantec ship the first commercial AV. Match file hashes against a list of known bad.",
  },
  {
    era: "2013",
    title: "Next-Gen Antivirus",
    desc: "Machine learning + behavioural heuristics. First wave of AI meeting malware at the file gate.",
  },
  {
    era: "2013",
    title: "EDR is Coined",
    desc: "Anton Chuvakin (Gartner) names the category. Continuous telemetry, not just prevention.",
  },
  {
    era: "2018",
    title: "Managed EDR",
    desc: "24/7 SOC analysts + threat hunters become the norm for businesses without in-house teams.",
  },
  {
    era: "2020",
    title: "XDR Emerges",
    desc: "Palo Alto coins XDR. Correlate endpoint, email, identity, network & cloud into one story.",
  },
  {
    era: "2026",
    title: "Autonomous Response",
    desc: "AI-driven containment in seconds - no analyst required for the first 90% of incidents.",
  },
];

/* ───────── TELEMETRY SIGNALS (what EDR watches) ───────── */

const telemetry = [
  { signal: "Process Execution", detail: "Parent-child trees, command-line args, DLL injection, hollowing" },
  { signal: "File Operations", detail: "Create, rename, encrypt, mass-modify - ransomware's tell" },
  { signal: "Registry Changes", detail: "Persistence keys, autoruns, service hijacks" },
  { signal: "Network Connections", detail: "C2 beacons, DNS tunneling, data exfil to unusual IPs" },
  { signal: "Memory Operations", detail: "Fileless malware, process injection, reflective loaders" },
  { signal: "User & Identity", detail: "Privilege escalation, credential theft, abnormal logons" },
];

/* ───────── VENDOR MATRIX ───────── */

const vendors: {
  slug: string;
  name: string;
  best: string;
  strength: string;
  watch: string;
  accent: string;
  logo?: string;
  score: { prevention: number; detection: number; response: number; telemetry: number };
}[] = [
  {
    slug: "sophos-endpoint",
    name: "Sophos Endpoint",
    best: "Best Overall Value (Recommended)",
    strength: "Invented antivirus in 1985. Deep Learning AI trained on 100M+ samples. CryptoGuard auto-rollback. Synchronized Security with Sophos Firewall. Sophos MDR powered by Secureworks Taegis (world's largest MDR).",
    watch: "Threat-intel depth narrower than CrowdStrike at hyperscale enterprise SOC level.",
    accent: "#1B8AC7",
    logo: "/logos/sophos.svg",
    score: { prevention: 95, detection: 94, response: 96, telemetry: 92 },
  },
  {
    slug: "crowdstrike-falcon",
    name: "CrowdStrike Falcon",
    best: "Premium Cloud-Native Pioneer (Recommended)",
    strength: "Pioneered cloud-native EDR. 230+ tracked threat actors. Falcon X automated threat intelligence. Falcon Complete MDR with breach-prevention warranty.",
    watch: "Highest-priced platform in market, typically 35–40% more than Sophos for equivalent capability.",
    accent: "#E04B3C",
    logo: "/logos/CrowdStrike.webp",
    score: { prevention: 95, detection: 98, response: 92, telemetry: 96 },
  },
  {
    slug: "sentinelone-singularity",
    name: "SentinelOne Singularity",
    best: "Autonomous AI Response (Recommended)",
    strength: "Only major EDR with fully autonomous response, works offline. Storyline causal narrative. Purple AI generative analyst. Singularity Data Lake ingests any source.",
    watch: "Console alert volume can be noisy initially, tuning matters. Mid-range pricing.",
    accent: "#6B3FB0",
    logo: "/logos/SentinelOne.png",
    score: { prevention: 94, detection: 93, response: 97, telemetry: 90 },
  },
  {
    slug: "palo-alto-cortex-xdr",
    name: "Palo Alto Cortex XDR",
    best: "XDR Pioneer · Best for Palo Alto Estates",
    strength: "Coined the XDR category in 2018. Unit 42 threat intelligence. Cortex Data Lake analyses trillions of events weekly. Native correlation with PAN-OS NGFW and Prisma Cloud. Cortex XSIAM consolidates SIEM, SOAR, and XDR.",
    watch: "Premium pricing scales as modules stack. Highest architectural value inside an existing Palo Alto NGFW or Prisma Cloud estate.",
    accent: "#FA582D",
    logo: "/logos/PaloAltoNetworks.svg",
    score: { prevention: 93, detection: 96, response: 92, telemetry: 97 },
  },
  {
    slug: "cisco-secure-endpoint",
    name: "Cisco Secure Endpoint",
    best: "Best for Cisco-Native Environments",
    strength: "Talos threat intelligence tracks around 600 billion daily security events globally, pushing new verdicts every 3 to 5 minutes. Retrospective security re-classifies a file after the fact and triggers response on every endpoint that has it, closing dwell-time gaps. Device Trajectory visualises file movement across endpoints, with SecureX and Cisco XDR correlation across the Cisco stack.",
    watch: "Strongest mainly inside a Cisco-native stack. Endpoint is not Cisco's flagship category, so standalone value trails the top EDR specialists.",
    accent: "#00BCEB",
    logo: "/logos/Cisco.svg",
    score: { prevention: 90, detection: 91, response: 88, telemetry: 90 },
  },
  {
    slug: "bitdefender-gravityzone",
    name: "Bitdefender GravityZone",
    best: "Top AV-Test Scorer · Strong Validation",
    strength: "Multiple AV-Test Best Protection awards. 11B+ daily security queries. HyperDetect pre-execution ML. Network Attack Defence at the endpoint. Cloud or on-prem console option.",
    watch: "Smaller MDR footprint than Sophos or CrowdStrike. Brand awareness lower in UAE enterprise tier.",
    accent: "#10B981",
    logo: "/logos/Bitdefender.png",
    score: { prevention: 96, detection: 91, response: 89, telemetry: 88 },
  },
  {
    slug: "microsoft-defender-endpoint",
    name: "Microsoft Defender for Endpoint",
    best: "Best Value for M365 E5 Customers",
    strength: "Built into Windows 10/11, no separate agent. Included with M365 E5 at no additional cost. Copilot for Security AI investigation. Deep Sentinel/Entra/Intune integration.",
    watch: "Effectiveness most pronounced in Microsoft ecosystem; Linux/macOS coverage gaps vs dedicated EDRs.",
    accent: "#28B5E1",
    logo: "/logos/microsoft.svg",
    score: { prevention: 90, detection: 92, response: 88, telemetry: 95 },
  },
  {
    slug: "check-point-harmony",
    name: "Check Point Harmony Endpoint",
    best: "Best for Check Point Estates",
    strength: "Same threat-prevention engine as Check Point Quantum firewalls. SandBlast threat emulation. Threat Extraction (CDR). Full disk encryption. Real-time IoC sharing with network gateways.",
    watch: "Endpoint is not Check Point's flagship category, strongest only for organisations standardised on Quantum and Harmony Email.",
    accent: "#4FC3F7",
    logo: "/logos/Check-Point-2024-logo-color.svg",
    score: { prevention: 91, detection: 90, response: 87, telemetry: 89 },
  },
  {
    slug: "trend-micro-vision-one",
    name: "Trend Micro Apex One",
    best: "XDR Pioneer · Best for OT/ICS",
    strength: "30+ years of threat research via Zero Day Initiative (most zero-days disclosed industry-wide). Industry-leading OT/ICS coverage for manufacturing and energy. Strong cloud workload protection.",
    watch: "Endpoint-only buyers may find platform breadth excessive. Vision One shines on full XDR adoption.",
    accent: "#F59E0B",
    logo: "/logos/Trend_Micro.svg",
    score: { prevention: 92, detection: 95, response: 90, telemetry: 96 },
  },
  {
    slug: "eset-protect",
    name: "ESET PROTECT",
    best: "Lightweight Footprint · Strong SMB / Mid-Market Value",
    strength: "30+ years of AV-Comparatives Top Product wins. LiveSense multi-layered engine. Famously lightweight agent. EU data residency. ESET Inspect EDR plus MDR Ultimate fully managed tier.",
    watch: "Lower brand recognition in UAE enterprise tier. MDR analyst headcount smaller than CrowdStrike Complete or Sophos MDR.",
    accent: "#00B3DC",
    logo: "/logos/ESET.svg",
    score: { prevention: 94, detection: 90, response: 88, telemetry: 86 },
  },
];

/* ───────── CAPABILITY COMPARISON TABLE ───────── */

type EndpointTier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type EndpointFeatureCell = { tier: EndpointTier; note: string };

const endpointFeatureVendors = [
  "Sophos Intercept X",
  "CrowdStrike Falcon",
  "SentinelOne",
  "Palo Alto Cortex XDR",
  "Cisco Secure Endpoint",
  "Bitdefender GravityZone",
  "Microsoft Defender",
  "Check Point Harmony",
  "Trend Micro Apex One",
  "ESET PROTECT",
];

const endpointFeatureRows: { label: string; cells: EndpointFeatureCell[] }[] = [
  {
    label: "AI / ML Detection Engine",
    cells: [
      { tier: "best", note: "Deep Learning, 100M+ samples" },
      { tier: "excellent", note: "Behaviour-based AI" },
      { tier: "excellent", note: "Autonomous AI, works offline" },
      { tier: "excellent", note: "Cortex Data Lake ML at trillions of events" },
      { tier: "strong", note: "Talos-fed ML, retrospective re-scoring" },
      { tier: "best", note: "HyperDetect, top AV-Test scores" },
      { tier: "strong", note: "Microsoft cloud AI" },
      { tier: "strong", note: "Same engine as Quantum firewalls" },
      { tier: "excellent", note: "Vision One AI + ZDI intel" },
      { tier: "strong", note: "LiveSense multi-layered engine" },
    ],
  },
  {
    label: "Anti-Ransomware Protection",
    cells: [
      { tier: "best", note: "CryptoGuard, auto file rollback" },
      { tier: "veryStrong", note: "Behavioural + cloud detection" },
      { tier: "excellent", note: "Storyline auto-rollback" },
      { tier: "veryStrong", note: "Behavioural + Unit 42 intel" },
      { tier: "good", note: "Retrospective rollback of late-flagged files" },
      { tier: "excellent", note: "Multi-layer ransomware defence" },
      { tier: "good", note: "M365-integrated protection" },
      { tier: "strong", note: "Anti-ransomware + Threat Extraction CDR" },
      { tier: "excellent", note: "Predictive machine learning" },
      { tier: "strong", note: "Ransomware Shield + LiveGuard" },
    ],
  },
  {
    label: "Zero-Day Threat Detection",
    cells: [
      { tier: "excellent", note: "Deep Learning, no signatures" },
      { tier: "excellent", note: "Falcon AI + Threat Graph" },
      { tier: "excellent", note: "Autonomous offline detection" },
      { tier: "excellent", note: "Unit 42 intel + behavioural analytics" },
      { tier: "strong", note: "Talos verdicts every 3 to 5 minutes" },
      { tier: "excellent", note: "HyperDetect pre-execution ML" },
      { tier: "strong", note: "Copilot + cloud-based detection" },
      { tier: "strong", note: "SandBlast threat emulation sandbox" },
      { tier: "best", note: "ZDI, most zero-days discovered" },
      { tier: "strong", note: "LiveSense + cloud sandboxing" },
    ],
  },
  {
    label: "Business Email Compromise (BEC)",
    cells: [
      { tier: "excellent", note: "Via Sophos Email + Synchronized Security" },
      { tier: "strong", note: "Falcon Intelligence integration" },
      { tier: "good", note: "Via email integration module" },
      { tier: "strong", note: "Cortex XDR + email module correlation" },
      { tier: "good", note: "Via Cisco Secure Email + XDR correlation" },
      { tier: "good", note: "GravityZone email controls" },
      { tier: "excellent", note: "Deep Defender for O365 integration" },
      { tier: "veryStrong", note: "Via Harmony Email & Collaboration" },
      { tier: "strong", note: "Vision One email + endpoint XDR" },
      { tier: "good", note: "ESET Mail Security add-on" },
    ],
  },
  {
    label: "MDR / Managed Service",
    cells: [
      { tier: "best", note: "Sophos MDR + Secureworks Taegis" },
      { tier: "best", note: "Falcon Complete, breach warranty" },
      { tier: "veryStrong", note: "Vigilance MDR service" },
      { tier: "veryStrong", note: "Unit 42 MDR and IR retainer" },
      { tier: "good", note: "Cisco Talos Incident Response service" },
      { tier: "strong", note: "GravityZone MDR" },
      { tier: "moderate", note: "Microsoft DART, premium cost" },
      { tier: "good", note: "Check Point Infinity MDR/MPR" },
      { tier: "strong", note: "Trend Micro MDR" },
      { tier: "strong", note: "MDR Ultimate fully managed tier" },
    ],
  },
  {
    label: "Threat Hunting Capability",
    cells: [
      { tier: "excellent", note: "Sophos XDR + CTU threat hunts" },
      { tier: "best", note: "Overwatch, 24/7 proactive hunting" },
      { tier: "excellent", note: "Purple AI natural language hunting" },
      { tier: "best", note: "Unit 42 hunts + Cortex XDR/XSIAM" },
      { tier: "good", note: "Device Trajectory + Cisco XDR correlation" },
      { tier: "good", note: "GravityZone XDR hunting" },
      { tier: "strong", note: "Microsoft Copilot for Security" },
      { tier: "strong", note: "Infinity XDR/XPR cross-product hunting" },
      { tier: "excellent", note: "Vision One XDR, cross-domain" },
      { tier: "good", note: "ESET Inspect EDR hunting" },
    ],
  },
  {
    label: "Firewall / Network Integration",
    cells: [
      { tier: "best", note: "Synchronized Security, unique" },
      { tier: "good", note: "API-based integrations" },
      { tier: "good", note: "Singularity marketplace" },
      { tier: "best", note: "Native PAN-OS NGFW + Prisma correlation" },
      { tier: "best", note: "Deep ISE, Umbrella, Firepower integration" },
      { tier: "good", note: "Network Attack Defence layer" },
      { tier: "veryStrong", note: "Defender for Cloud integration" },
      { tier: "best", note: "Native IoC sharing with Quantum gateways" },
      { tier: "veryStrong", note: "Native network sensor XDR" },
      { tier: "good", note: "API-based integrations" },
    ],
  },
  {
    label: "Ease of Deployment",
    cells: [
      { tier: "best", note: "Single agent, Sophos Central" },
      { tier: "veryStrong", note: "Cloud-native, fast rollout" },
      { tier: "veryStrong", note: "Cloud-managed agent" },
      { tier: "strong", note: "Cloud-managed agent rollout" },
      { tier: "strong", note: "Cloud-managed connector" },
      { tier: "strong", note: "Cloud or on-prem, flexible" },
      { tier: "best", note: "Built into Windows, zero deploy" },
      { tier: "strong", note: "Cloud or on-prem management server" },
      { tier: "strong", note: "Cloud console deployment" },
      { tier: "best", note: "Famously lightweight agent" },
    ],
  },
  {
    label: "Total Cost of Ownership",
    cells: [
      { tier: "best", note: "Most competitive in class" },
      { tier: "moderate", note: "Highest-priced in market" },
      { tier: "good", note: "Mid-range pricing" },
      { tier: "moderate", note: "Premium pricing as modules stack" },
      { tier: "good", note: "Best value bundled with Cisco estate" },
      { tier: "excellent", note: "Strong value, top detection ROI" },
      { tier: "best", note: "Free with Microsoft 365 E5" },
      { tier: "good", note: "Best value inside a Check Point estate" },
      { tier: "excellent", note: "Competitive mid-range" },
      { tier: "excellent", note: "Strong value, lightweight licensing" },
    ],
  },
  {
    label: "OT / ICS Environment Support",
    cells: [
      { tier: "good", note: "Via Sophos XDR + Secureworks" },
      { tier: "veryStrong", note: "Falcon for OT, dedicated module" },
      { tier: "moderate", note: "Limited native OT coverage" },
      { tier: "strong", note: "Cortex XDR with ICS visibility" },
      { tier: "moderate", note: "Limited native OT coverage" },
      { tier: "moderate", note: "Limited OT coverage" },
      { tier: "moderate", note: "Limited native OT coverage" },
      { tier: "moderate", note: "Limited native OT coverage" },
      { tier: "best", note: "Industry-leading OT/ICS platform" },
      { tier: "moderate", note: "Limited native OT coverage" },
    ],
  },
];

type EndpointStarCell = { stars: number | null; note: string; recommended?: boolean; rank?: string };

const endpointStarRows: { label: string; cells: EndpointStarCell[]; verdict?: boolean }[] = [
  {
    label: "Industry Heritage",
    cells: [
      { stars: null, note: "40 years, invented AV 1985" },
      { stars: null, note: "Founded 2011, cloud-native" },
      { stars: null, note: "Founded 2013, autonomous AI" },
      { stars: null, note: "Coined XDR in 2018, Unit 42 intel" },
      { stars: null, note: "Talos intel, ~600B daily events" },
      { stars: null, note: "Founded 2001, top AV lab scores" },
      { stars: null, note: "Integrated since Windows 8" },
      { stars: null, note: "Same engine as Quantum firewalls" },
      { stars: null, note: "Founded 1988, ZDI research" },
      { stars: null, note: "Founded 1992, AV-Comparatives wins" },
    ],
  },
  {
    label: "AI / ML Detection",
    cells: [
      { stars: 5, note: "Deep Learning neural net" },
      { stars: 5, note: "Behaviour-based AI" },
      { stars: 5, note: "Autonomous AI engine" },
      { stars: 5, note: "Cortex Data Lake ML at scale" },
      { stars: 4, note: "Talos-fed ML + retrospective scoring" },
      { stars: 5, note: "HyperDetect ML, top AV scores" },
      { stars: 4, note: "Microsoft AI + cloud" },
      { stars: 4, note: "Quantum-grade prevention engine" },
      { stars: 5, note: "Vision One AI + ZDI intel" },
      { stars: 4, note: "LiveSense multi-layered engine" },
    ],
  },
  {
    label: "Anti-Ransomware",
    cells: [
      { stars: 5, note: "CryptoGuard auto-rollback" },
      { stars: 4, note: "Strong detection" },
      { stars: 5, note: "Storyline rollback" },
      { stars: 4, note: "Behavioural + Unit 42 intel" },
      { stars: 4, note: "Retrospective rollback of late verdicts" },
      { stars: 5, note: "Multi-layer ransomware defence" },
      { stars: 3, note: "Good, M365 integrated" },
      { stars: 4, note: "Anti-ransomware + Threat Extraction" },
      { stars: 5, note: "Predictive machine learning" },
      { stars: 4, note: "Ransomware Shield + LiveGuard" },
    ],
  },
  {
    label: "MDR Service",
    cells: [
      { stars: 5, note: "Sophos MDR + Taegis SIEM" },
      { stars: 5, note: "Falcon Complete MDR" },
      { stars: 4, note: "Vigilance MDR" },
      { stars: 4, note: "Unit 42 MDR + IR retainer" },
      { stars: 4, note: "Talos Incident Response service" },
      { stars: 4, note: "GravityZone MDR" },
      { stars: 3, note: "Microsoft DART (expensive)" },
      { stars: 3, note: "Check Point Infinity MDR" },
      { stars: 4, note: "Trend Micro MDR service" },
      { stars: 4, note: "MDR Ultimate managed tier" },
    ],
  },
  {
    label: "XDR Cross-Domain",
    cells: [
      { stars: 5, note: "Firewall + Email + Cloud sync" },
      { stars: 5, note: "Falcon XDR platform" },
      { stars: 5, note: "Singularity Data Lake XDR" },
      { stars: 5, note: "Cortex XDR + XSIAM, category pioneer" },
      { stars: 4, note: "Cisco XDR across the Cisco stack" },
      { stars: 4, note: "GravityZone XDR" },
      { stars: 5, note: "Deep Microsoft stack XDR" },
      { stars: 4, note: "Infinity XDR/XPR across products" },
      { stars: 5, note: "Vision One, XDR pioneer" },
      { stars: 3, note: "ESET Inspect XDR" },
    ],
  },
  {
    label: "Ease of Deployment",
    cells: [
      { stars: 5, note: "Single agent, Sophos Central" },
      { stars: 4, note: "Simple cloud deployment" },
      { stars: 4, note: "Cloud-managed" },
      { stars: 4, note: "Cloud-managed agent" },
      { stars: 4, note: "Cloud-managed connector" },
      { stars: 4, note: "Cloud or on-prem option" },
      { stars: 5, note: "Built into Windows" },
      { stars: 4, note: "Cloud or on-prem server" },
      { stars: 4, note: "Cloud-managed console" },
      { stars: 5, note: "Famously lightweight agent" },
    ],
  },
  {
    label: "Total Cost of Ownership",
    cells: [
      { stars: 5, note: "Most competitive pricing" },
      { stars: 2, note: "Most expensive in class" },
      { stars: 3, note: "Mid-range" },
      { stars: 2, note: "Premium as modules stack" },
      { stars: 3, note: "Best value bundled with Cisco estate" },
      { stars: 4, note: "Good value, strong ROI" },
      { stars: 5, note: "Free with M365 E5" },
      { stars: 3, note: "Best value inside Check Point estate" },
      { stars: 4, note: "Competitive mid-range" },
      { stars: 5, note: "Strong value, lightweight licensing" },
    ],
  },
  {
    label: "Firewall / Network Integration",
    cells: [
      { stars: 5, note: "Synchronized Security, unique" },
      { stars: 3, note: "API-based integrations" },
      { stars: 3, note: "Marketplace integrations" },
      { stars: 5, note: "Native PAN-OS + Prisma correlation" },
      { stars: 5, note: "Deep ISE, Umbrella, Firepower integration" },
      { stars: 3, note: "Network Attack Defence layer" },
      { stars: 4, note: "Defender for Cloud" },
      { stars: 5, note: "Native IoC sharing with Quantum gateways" },
      { stars: 4, note: "Native network sensor XDR" },
      { stars: 3, note: "API-based integrations" },
    ],
  },
  {
    label: "OT / ICS Support",
    cells: [
      { stars: 3, note: "Via Sophos XDR + Secureworks" },
      { stars: 4, note: "Falcon for OT" },
      { stars: 3, note: "Limited OT coverage" },
      { stars: 4, note: "Cortex XDR with ICS visibility" },
      { stars: 3, note: "Limited OT coverage" },
      { stars: 3, note: "Limited OT coverage" },
      { stars: 3, note: "Limited OT coverage" },
      { stars: 3, note: "Limited OT coverage" },
      { stars: 5, note: "Industry-leading OT/ICS support" },
      { stars: 3, note: "Limited OT coverage" },
    ],
  },
  {
    label: "Best Suited For",
    cells: [
      { stars: null, note: "All sizes wanting one synchronized stack" },
      { stars: null, note: "Enterprises wanting elite cloud-native EDR" },
      { stars: null, note: "Teams needing autonomous, offline-capable AI" },
      { stars: null, note: "Palo Alto NGFW and Prisma Cloud estates" },
      { stars: null, note: "Organisations standardised on Cisco" },
      { stars: null, note: "Lean teams wanting top detection value" },
      { stars: null, note: "Microsoft 365 E5 estates" },
      { stars: null, note: "Estates standardised on Check Point Quantum" },
      { stars: null, note: "OT/ICS-heavy and hybrid environments" },
      { stars: null, note: "Lean teams wanting a lightweight agent" },
    ],
  },
  {
    label: "Strategic verdict",
    verdict: true,
    cells: [
      { stars: null, recommended: true, note: "Best stack synergy: Synchronized Security links endpoint, firewall, email, and MDR with auto-response." },
      { stars: null, recommended: true, note: "Elite cloud-native EDR with Falcon Complete MDR. Suggested for high budget allocated customers." },
      { stars: null, recommended: true, note: "Autonomous AI with Storyline rollback that works offline; strong for constrained SOCs." },
      { stars: null, note: "XDR category pioneer with Unit 42 intel and Cortex XSIAM; highest value inside a Palo Alto NGFW or Prisma estate." },
      { stars: null, note: "Talos intel with retrospective security; strongest for estates already standardised on Cisco." },
      { stars: null, note: "Top AV-Test scores and strong ROI; the value leader for lean security teams." },
      { stars: null, note: "Best value inside Microsoft 365 E5 with deep native stack integration." },
      { stars: null, note: "Shares the Quantum prevention engine with SandBlast and Threat Extraction; strongest for Check Point-standardised estates." },
      { stars: null, note: "XDR pioneer with industry-leading OT/ICS coverage via Vision One." },
      { stars: null, note: "Lightweight agent with decades of AV-Comparatives wins and EU data residency; strong value for lean mid-market teams." },
    ],
  },
];

const endpointTierStyles: Record<EndpointTier, { bg: string; text: string; label: string }> = {
  best: { bg: "bg-emerald-600", text: "text-white", label: "Best in class" },
  excellent: { bg: "bg-emerald-500", text: "text-white", label: "Excellent" },
  veryStrong: { bg: "bg-emerald-200", text: "text-emerald-900", label: "Very strong" },
  strong: { bg: "bg-amber-200", text: "text-amber-900", label: "Strong" },
  good: { bg: "bg-amber-100", text: "text-amber-900", label: "Good" },
  moderate: { bg: "bg-amber-100", text: "text-amber-900", label: "Moderate" },
};

/* ───────── HEAD-TO-HEAD VENDOR COMPARISON (Big 3) ───────── */

const headToHead = [
  {
    vendor: "CrowdStrike Falcon",
    accent: "#E04B3C",
    strengths:
      "Cloud-native lightweight agent, market-leading threat intel (Overwatch managed hunting), strong cross-platform coverage across Windows, macOS and Linux.",
    weaknesses:
      "Premium pricing scales quickly as modules stack; module licensing can be hard to forecast for finance teams.",
    bestFor: "Mid-market and enterprise SOCs that want best-in-class detection and 24/7 managed hunting.",
    uae: "Available in the UAE through regional distributors. CrowdStrike partner UAE tier is confirmed on a per-engagement basis - contact us for current authorisation status.",
  },
  {
    vendor: "SentinelOne Singularity",
    accent: "#6B3FB0",
    strengths:
      "Autonomous AI agent makes local kill decisions without cloud lookup - fastest automated rollback on ransomware in independent tests.",
    weaknesses:
      "Console alert volume is noisy until tuned; reporting depth lags Falcon for executive-level dashboards.",
    bestFor: "Businesses that need autonomous response on disconnected or roaming endpoints.",
    uae: "Distributed across the UAE through certified regional resellers. SentinelOne partner Dubai status is verified per project - request our current reseller letter before contracting.",
  },
  {
    vendor: "Microsoft Defender XDR",
    accent: "#28B5E1",
    strengths:
      "Zero-agent on Windows, deep Entra ID, Sentinel SIEM and M365 integration. Already paid for in many E5 licences - strong TCO story.",
    weaknesses:
      "Non-Windows coverage is shallower than Falcon or SentinelOne; depth varies sharply across the Defender SKU family (Business vs Endpoint P1/P2).",
    bestFor: "M365 E5 shops standardised on Microsoft, looking to consolidate licensing.",
    uae: "Native Microsoft availability across UAE Azure regions and via local Microsoft solutions partners.",
  },
];

/* ───────── RANSOMWARE LITMUS TEST ───────── */

const ransomwareTests = [
  {
    test: "Behavioural Detection",
    desc: "Spots encryption patterns - not just known signatures. Catches zero-day ransomware families.",
    icon: EyeIcon,
  },
  {
    test: "Rollback Capability",
    desc: "Restores files encrypted before the kill shot. CrowdStrike, SentinelOne, Sophos all offer this.",
    icon: ShieldIcon,
  },
  {
    test: "Kernel-Level Protection",
    desc: "The agent itself cannot be disabled by admin-level malware. No agent = no defence.",
    icon: LockIcon,
  },
  {
    test: "Offline Protection",
    desc: "Still works when the endpoint is disconnected from the internet. Airport, coffee shop, train.",
    icon: AlertTriangleIcon,
  },
];

/* ───────── XDR CORRELATION STORY ───────── */

const attackStory = [
  {
    step: "01",
    channel: "Email",
    icon: MailIcon,
    event: "Phishing email lands in an executive's inbox",
    meta: "Email telemetry · attachment.xlsx",
    tone: "from-[#6B3FB0] to-[#4FC3F7]",
  },
  {
    step: "02",
    channel: "Endpoint",
    icon: MonitorIcon,
    event: "Excel spawns PowerShell, then cmd.exe - parent-child anomaly",
    meta: "EDR telemetry · process tree",
    tone: "from-[#4FC3F7] to-[#28B5E1]",
  },
  {
    step: "03",
    channel: "Identity",
    icon: EyeIcon,
    event: "Credentials reused from an unusual geolocation 18 minutes later",
    meta: "Identity telemetry · risky sign-in",
    tone: "from-[#28B5E1] to-[#1B8AC7]",
  },
  {
    step: "04",
    channel: "Network",
    icon: CloudIcon,
    event: "2.3 GB exfiltrated to an AWS bucket never used before",
    meta: "Network telemetry · anomalous outbound",
    tone: "from-[#1B8AC7] to-[#045891]",
  },
];

/* ───────── MANAGED EDR PILLARS ───────── */

const managedPillars = [
  {
    title: "24/7 Threat Hunting",
    desc: "Human analysts proactively search for indicators of compromise automated tools miss.",
  },
  {
    title: "Alert Triage",
    desc: "False positives eliminated before they hit your team. You only see verified incidents.",
  },
  {
    title: "Incident Response",
    desc: "Containment, eradication, and recovery - with documented runbooks and SLA-bound timing.",
  },
  {
    title: "Policy Tuning",
    desc: "Exclusions, detection rules, and prevention policies continuously refined to your environment.",
  },
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "What endpoint security platform do you recommend for a UAE mid-market business?",
    answer:
      "For most UAE mid-market environments, Sophos Intercept X with XDR delivers the best total cost of ownership, simplest management via Sophos Central, CryptoGuard anti-ransomware with automatic rollback, and Synchronized Security automation when paired with Sophos Firewall. Artiflex IT is a Platinum Sophos Partner. That said, the right answer depends on your existing stack: Microsoft 365 E5 customers should evaluate Defender for Endpoint, and Check Point estates should evaluate Harmony Endpoint.",
  },
  {
    question: "What is the difference between EDR and XDR?",
    answer:
      "EDR (Endpoint Detection and Response) records and analyses telemetry from endpoints (laptops, servers, virtual desktops) and gives you visibility, automated response, and forensic investigation on every device. XDR (Extended Detection and Response) correlates that endpoint telemetry with email, network, identity, and cloud telemetry to produce a unified attack narrative across the full kill chain. EDR sees the endpoint perfectly; XDR closes the blind spots between siloed tools. For UAE businesses with hybrid teams or SaaS-heavy stacks, XDR is the right architecture.",
  },
  {
    question: "Do I need MDR if I already have EDR?",
    answer:
      "Operating EDR effectively requires 24/7 analyst coverage, threat-hunting expertise, and incident-response capability that most UAE mid-market teams cannot staff in-house. If your security team cannot review every alert at 03:00 on a Sunday, an MDR service is the right answer regardless of the underlying agent. Sophos MDR (powered by Secureworks Taegis), CrowdStrike Falcon Complete (with breach-prevention warranty), and partner-delivered MDR are the options we evaluate.",
  },
  {
    question: "Sophos Intercept X vs CrowdStrike Falcon: which is better for UAE enterprises?",
    answer:
      "Sophos Intercept X wins on TCO (typically 35–40% lower than CrowdStrike for equivalent capabilities), Synchronized Security automation with Sophos Firewall, and CryptoGuard auto-rollback for ransomware. CrowdStrike Falcon wins on raw threat-intelligence depth (230+ tracked threat actors), Falcon Complete's breach-prevention warranty, and the maturity of the cloud-native architecture. For most UAE mid-market and SMB environments, Sophos is the better-value answer. For large enterprises with substantial security budgets where maximum feature breadth is the primary driver, CrowdStrike justifies its premium.",
  },
  {
    question: "Is Microsoft Defender for Endpoint enough on its own?",
    answer:
      "For organisations licensed on Microsoft 365 E5 or Defender for Business (running primarily Windows endpoints in a Microsoft-centric stack with Sentinel, Entra, and Intune), Microsoft Defender for Endpoint is genuinely strong and included at no additional cost. For mixed environments with significant Linux or macOS estates, or organisations not standardised on Microsoft, dedicated cross-platform EDR (Sophos, CrowdStrike, SentinelOne, Bitdefender) delivers more consistent coverage.",
  },
  {
    question: "How long does an endpoint security deployment take in the UAE?",
    answer:
      "A 100–300 endpoint mid-market deployment is typically 2–3 weeks end-to-end including assessment, exclusion testing, pilot wave, full rollout, and tuning. A multi-thousand endpoint enterprise migration with phased waves, server class testing, and full SIEM integration is typically 6–10 weeks. Every deployment includes phased cutover with rollback procedures.",
  },
  {
    question: "Do your endpoint deployments cover NESA and UAE PDPL?",
    answer:
      "Yes. Every endpoint design we deliver maps to a control framework: NESA, UAE PDPL, ISO 27001, NIST CSF 2.0, or CBUAE-specific requirements as applicable. Audit-ready evidence (policy documentation, log retention, incident-response runbooks, configuration baselines) is delivered as part of the project, not as a follow-up engagement.",
  },
  {
    question: "Is Artiflex IT vendor-locked to Sophos?",
    answer:
      "No. We are a Sophos Platinum Partner because Sophos has 40 years of endpoint security innovation behind it and wins for the majority of UAE mid-market deployments, but we also actively deliver CrowdStrike Falcon, Microsoft Defender for Endpoint, SentinelOne Singularity, Palo Alto Cortex XDR, Bitdefender GravityZone, ESET PROTECT, Trend Micro Vision One, and Check Point Harmony Endpoint. The vendor follows the assessment, not the other way around.",
  },
];

/* ───────── RADAR SCORE BAR ───────── */

function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400">{label}</p>
        <p className="font-mono text-[11px] font-semibold text-white/90">{value}</p>
      </div>
      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(to right, ${color}, #4FC3F7)` }}
        />
      </div>
    </div>
  );
}

/* ───────── HERO ───────── */

function EndpointHero() {
  const { open: openContact } = useContactModal();
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-navy-deep">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/endpoint.jpg')" }}
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
                <span className="font-medium text-[#28B5E1]">Endpoint Security (EDR &amp; XDR)</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero masthead, title */}
      <div className="shell relative z-10 flex w-full flex-1 items-center py-10 sm:py-12 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full"
        >
          <h1 className="font-display text-4xl font-bold leading-[1] tracking-tight text-white sm:text-5xl md:text-5xl lg:text-[3.75rem]">
            Endpoint Security{" "}
            <span className="gradient-text">UAE</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              EDR, XDR &amp; Managed Detection
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Artiflex IT designs, deploys, and manages enterprise endpoint security across the UAE, Oman, and Saudi Arabia. <span className="font-semibold text-white">Sophos Platinum Partner</span>, plus full delivery experience across CrowdStrike, Microsoft Defender, SentinelOne, Palo Alto Cortex, Bitdefender, ESET, Trend Micro, and Check Point, so the conversation starts with your environment, not our preferred SKU.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#vendor-matrix"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base"
            >
              Vendor Comparison
            </a>
            <a
              href="#gartner-comparison"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base"
            >
              Gartner Style Review
            </a>
            <Link
              to="/blog/origin-endpoint-security"
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
              Get a Free Endpoint Assessment
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

export default function EdrXdrSecurityPage() {
  const [activeVendor, setActiveVendor] = useState(0);
  const [tick, setTick] = useState(0);
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const { open: openContact } = useContactModal();

  // Pulse rhythm for the radar / telemetry visual
  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % 6), 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <>
        <title>Endpoint Protection UAE | EDR & XDR for Business | Artiflex IT</title>
        <meta
          name="description"
          content="Managed EDR & XDR for UAE business. Compare CrowdStrike, SentinelOne & Microsoft Defender. Free endpoint assessment."
        />
        <link
          rel="canonical"
          href="https://artiflexit.com/cybersecurity/endpoint-security-edr-xdr"
        />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Artiflex IT",
          "url": "https://artiflexit.com/cybersecurity/endpoint-security-edr-xdr",
          "areaServed": [
            { "@type": "Country", "name": "United Arab Emirates" },
            { "@type": "City", "name": "Dubai" },
            { "@type": "City", "name": "Abu Dhabi" },
          ],
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "AE",
            "addressLocality": "Dubai",
          },
          "telephone": "+971",
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Managed Endpoint Security",
          "serviceType": "Managed EDR & XDR",
          "provider": { "@type": "Organization", "name": "Artiflex IT" },
          "areaServed": [
            { "@type": "Country", "name": "United Arab Emirates" },
            { "@type": "City", "name": "Dubai" },
          ],
          "description":
            "Managed EDR services UAE - 24/7 endpoint detection and response, ransomware protection, and XDR correlation across CrowdStrike, SentinelOne, and Microsoft Defender platforms.",
          "url": "https://artiflexit.com/cybersecurity/endpoint-security-edr-xdr",
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        })}</script>
        {/* ItemList schema enumerating recommended endpoint vendors */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Recommended Endpoint Security Vendors for UAE Businesses",
          itemListElement: vendors.map((v, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: v.name,
          })),
        })}</script>
      </>

      {/* HERO */}
      <EndpointHero />

      {/* ───────── ENDPOINT VENDORS WE DELIVER (HONEYCOMB) ───────── */}
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
              The Vendor Lineup
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
              Endpoint{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Vendors
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The EDR, XDR and MDR platforms we design, deploy and manage across UAE environments. The choice follows your stack, your SOC capacity, and the threat surface you actually face.
            </p>
          </div>

          {/* Honeycomb grid (lg+) */}
          <div className="mt-14 hidden flex-col items-center lg:flex">
            {(() => {
              const layouts: Record<number, number[]> = {
                1: [1], 2: [2], 3: [3], 4: [3, 1], 5: [3, 2],
                6: [3, 3], 7: [4, 3], 8: [4, 4], 9: [5, 4],
                10: [5, 5], 11: [6, 5], 12: [6, 6],
              };
              const sizes =
                layouts[vendors.length] ??
                [Math.ceil(vendors.length / 2), Math.floor(vendors.length / 2)];
              const rows: typeof vendors[] = [];
              let i = 0;
              sizes.forEach((s) => {
                rows.push(vendors.slice(i, i + s));
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
                  {row.map((v) => (
                    <Link
                      key={v.slug}
                      to={`/cybersecurity/endpoint/${v.slug}`}
                      aria-label={`View ${v.name} details`}
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
                      <div className="relative flex h-full flex-col items-center justify-center px-5 text-center">
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

          {/* Mobile / tablet fallback */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:hidden">
            {vendors.map((v) => (
              <Link
                key={v.slug}
                to={`/cybersecurity/endpoint/${v.slug}`}
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
              </Link>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-slate-500">
            <span className="font-semibold text-slate-700">
              {vendors.length} platforms
            </span>
            , picked by your stack and SOC capacity.
          </p>
        </div>
      </section>

      {/* ───────── INTRO: WHAT MODERN ENDPOINT SECURITY HAS TO DO ───────── */}
      <section className="relative overflow-hidden bg-[#04101E] pt-10 pb-18 sm:pb-20 ">
        {/* Atmospheric backgrounds */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(27,138,199,0.14),transparent_55%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(40,181,225,0.06),transparent_60%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px]"
        />
        {/* Faint background number, magazine touch */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-3rem] top-1/3 select-none font-display text-[16rem] font-bold leading-none text-white/[0.025] sm:text-[22rem]"
        >
          06
        </div>

        <div className="shell relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.5rem]">
              What good endpoint protection{" "}
              <span className="gradient-text italic">actually</span> delivers
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="mx-auto mt-10 grid max-w-6xl items-start gap-2 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
          >
            {[
              {
                title: "Detect threats without signatures",
                desc: "Zero-days and fileless malware never appear in any signature database. Behavioural detection, machine learning, and runtime analysis are the floor, not optional add-ons.",
              },
              {
                title: "Record full endpoint telemetry",
                desc: "Every process spawn, file write, registry change, and network connection, captured and retained so investigators can reconstruct what happened, not just be told something did.",
              },
              {
                title: "Roll back ransomware automatically",
                desc: "Detect malicious file encryption in real time and restore files to their clean state before the ransom note appears. Backups alone are no longer sufficient, recovery has to be inline.",
              },
              {
                title: "Correlate across the kill chain",
                desc: "Endpoint events stitched with email, identity, network, and cloud telemetry into one unified attack narrative. The blind spots between siloed tools are where successful intrusions actually live.",
              },
              {
                title: "Produce audit-ready evidence",
                desc: "Logs, audit trails, and MTTR/MTTD metrics that satisfy a NESA auditor or UAE PDPL controller, delivered as part of the platform, not assembled by a forensics consultant six months later.",
              },
              {
                title: "Stay invisible to the user",
                desc: "All of the above on a single lightweight agent that does not destroy device performance, flag legitimate apps, or generate calls to the help desk every Monday morning.",
              },
            ].map((j, idx) => (
              <motion.div
                key={j.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.05 * idx }}
                tabIndex={0}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#28B5E1]/30 hover:bg-white/[0.06] focus-visible:border-[#28B5E1]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#28B5E1]/30 sm:p-4"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[2px] w-0 bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] transition-all duration-500 group-hover:w-full group-focus-visible:w-full"
                />
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-sm font-semibold text-white sm:text-base">
                    {j.title}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#28B5E1] transition-all duration-300 group-hover:rotate-45 group-hover:border-[#28B5E1]/50 group-focus-visible:rotate-45 group-focus-visible:border-[#28B5E1]/50"
                  >
                    <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </div>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
                      {j.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───────── TYPES OF ENDPOINT PROTECTION ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.06),transparent_60%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              Capabilities
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Types of{" "}
              <span className="gradient-text">Endpoint Protection</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Endpoint security comes in several forms, each suited to a different team size, infrastructure shape, and threat surface. The right type for your business depends on what you run today and the kind of attacks you actually face.
            </p>
          </div>

          <div className="mt-12 grid items-start gap-4 sm:mt-16 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ShieldIcon,
                title: "Next-Generation AV (NGAV)",
                desc: "Behavioural analysis, ML, and memory scanning replace pure signature matching. Detection moves from what the file is to what it does.",
                fit: "The current floor for modern endpoint protection.",
              },
              {
                icon: EyeIcon,
                title: "Endpoint Detection & Response (EDR)",
                desc: "NGAV plus full telemetry recording, threat hunting, automated response, and forensic investigation. Complete visibility on every device.",
                fit: "Minimum for any organisation with a security team capable of operating it.",
              },
              {
                icon: LayersIcon,
                title: "Extended Detection & Response (XDR)",
                desc: "EDR's endpoint visibility correlated with network, email, cloud, and identity telemetry into one unified attack narrative across the kill chain.",
                fit: "The right answer for hybrid infrastructure or SaaS-heavy stacks.",
              },
              {
                icon: MonitorIcon,
                title: "Managed Detection & Response",
                desc: "Not a generation but a delivery model. Fully managed 24/7 detection and response run by an external SOC against your endpoint data.",
                fit: "EDR/XDR-grade coverage without an in-house security operations team.",
              },
            ].map((t, idx) => {
              const isOpen = openCategory === idx;
              return (
                <div
                  key={t.title}
                  tabIndex={0}
                  onMouseEnter={() => setOpenCategory(idx)}
                  onMouseLeave={() =>
                    setOpenCategory((prev) => (prev === idx ? null : prev))
                  }
                  onFocus={() => setOpenCategory(idx)}
                  onBlur={() =>
                    setOpenCategory((prev) => (prev === idx ? null : prev))
                  }
                  onClick={() =>
                    setOpenCategory((prev) => (prev === idx ? null : idx))
                  }
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm outline-none transition-all duration-300 hover:-translate-y-1 hover:border-[#28B5E1]/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#28B5E1]/40 sm:p-4"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#28B5E1]/10 text-[#1B8AC7]">
                      <t.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-sm font-semibold text-slate-900">
                      {t.title}
                    </h3>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-xs leading-relaxed text-slate-600">
                          {t.desc}
                        </p>
                        <p className="mt-4 border-t border-slate-200 pt-3 text-xs italic text-slate-500">
                          {t.fit}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── VENDOR COMPARISON FOR UAE BUYERS ───────── */}
      <section
        id="vendor-matrix"
        className="relative bg-white py-16 scroll-mt-20 sm:py-24"
      >
        <div className="shell">
          <SectionHeader
            title={
              <>
                Vendor comparison for{" "}
                <span className="gradient-text">Endpoint Security Buyers</span>
              </>
            }
            description="We do not believe one endpoint platform wins everything. The right managed EDR or XDR fit depends on your environment, your SOC capacity, and the threat surface you actually face, from ransomware to insider abuse. Artiflex suggests the endpoint security solution that best fits your needs."
            centered
          />

          <div className="mt-6 flex justify-center sm:mt-8">
            <button
              onClick={openContact}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base"
            >
              Talk to a Specialist
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

          {/* At-a-glance vendor snapshot */}
          <div className="mt-12 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)] sm:mt-16">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + endpointFeatureVendors.length * 116) }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-5 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">
                      Feature
                    </th>
                    {endpointFeatureVendors.map((v, i) => (
                      <th
                        key={v}
                        className="border-l border-white/15 px-2 py-3 sm:px-4 sm:py-5 align-bottom font-display text-sm font-semibold text-white sm:text-base"
                      >
                        {v}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {endpointStarRows.map((row, rIdx) => (
                    <tr
                      key={row.label}
                      className={`transition-colors ${
                        row.verdict
                          ? "border-t-2 border-[#28B5E1]/30 bg-gradient-to-r from-[#04101E] to-[#0A3D6B]"
                          : `border-t border-[#0A3D6B]/20 hover:bg-[#28B5E1]/[0.04] ${
                              rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                            }`
                      }`}
                    >
                      <th
                        scope="row"
                        className={`sticky left-0 z-10 px-2 py-3 align-middle sm:px-4 sm:py-4 font-display text-sm font-semibold ${
                          row.verdict
                            ? "bg-[#04101E] uppercase tracking-wider text-[#28B5E1]"
                            : `text-slate-900 ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"}`
                        }`}
                      >
                        {row.label}
                      </th>
                      {row.cells.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`px-4 py-4 align-middle ${
                            row.verdict
                              ? "border-l border-white/10"
                              : "border-l border-[#0A3D6B]/20"
                          }`}
                        >
                          {row.verdict ? (
                            <div className="space-y-1.5">
                              {cell.recommended && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                                  ✓ Recommended
                                </span>
                              )}
                              <p className="text-xs leading-relaxed text-slate-300">
                                {cell.note}
                              </p>
                            </div>
                          ) : (
                            <>
                              {cell.stars !== null && (
                                <div
                                  className="flex items-center gap-0.5"
                                  aria-label={`${cell.stars} out of 5`}
                                >
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <span
                                      key={i}
                                      aria-hidden="true"
                                      className={`text-sm ${
                                        i < (cell.stars ?? 0)
                                          ? "text-amber-400"
                                          : "text-slate-300"
                                      }`}
                                    >
                                      ★
                                    </span>
                                  ))}
                                </div>
                              )}
                              <p
                                className={`text-xs leading-snug text-slate-600 ${
                                  cell.stars !== null ? "mt-1.5" : ""
                                }`}
                              >
                                {cell.note}
                              </p>
                            </>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mx-auto mt-20 max-w-4xl text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Detailed Comparison on Endpoint Security Vendors
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Strengths, blind spots, and the buyer profile each vendor was built for. Recommendations are based on UAE deployment patterns, not vendor tier.
            </p>
          </div>

          <div className="mt-6 flex justify-center sm:mt-8">
            <button
              onClick={openContact}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base"
            >
              Talk to a Specialist
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

          <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:mt-16 lg:grid-cols-2 lg:items-stretch">
            {vendors.map((v, idx) => {
              const recommended = v.best.includes("Recommended");
              const isOrphan =
                idx === vendors.length - 1 && vendors.length % 2 === 1;
              return (
                <motion.div
                  key={v.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className={`flex h-full ${
                    isOrphan
                      ? "lg:col-span-2 lg:mx-auto lg:w-[calc(50%-0.75rem)]"
                      : ""
                  }`}
                >
                  <Link
                    to={`/cybersecurity/endpoint/${v.slug}`}
                    aria-label={`View details for ${v.name}`}
                    className={`group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(4,88,145,0.12)] sm:p-8 ${
                      recommended
                        ? "border-brand-blue/30 shadow-[0_4px_20px_rgba(27,138,199,0.10)]"
                        : "border-border-light shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-brand-blue/25"
                    }`}
                  >
                    {recommended && (
                      <span
                        className="absolute -top-px left-6 inline-flex rounded-b-md bg-brand-blue px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white"
                        aria-label="Recommended vendor"
                      >
                        Recommended
                      </span>
                    )}

                    <div className="flex items-start justify-between gap-4 pt-3">
                      <div className="min-w-0">
                        <h3 className="font-display text-xl font-bold text-heading transition-colors group-hover:text-brand-blue sm:text-2xl">
                          {v.name}
                        </h3>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-brand-blue">
                          {v.best}
                        </p>
                      </div>
                      {v.logo ? (
                        <img
                          src={v.logo}
                          alt={`${v.name} logo`}
                          loading="lazy"
                          className="h-10 w-24 shrink-0 object-contain object-right sm:h-12 sm:w-32"
                        />
                      ) : (
                        <span
                          aria-hidden
                          className="h-3 w-3 shrink-0 rounded-full"
                          style={{ backgroundColor: v.accent }}
                        />
                      )}
                    </div>

                    <div className="mt-5 space-y-3">
                      <div>
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                          Why it wins
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-body">
                          {v.strength}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                          Consider
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-body/80">
                          {v.watch}
                        </p>
                      </div>
                    </div>

                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-xs font-semibold text-brand-blue transition-all group-hover:gap-2.5 sm:text-sm">
                      View {v.name.split(" ")[0]} details
                      <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="mx-auto mt-12 max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-br from-[#0A3D6B] via-[#04101E] to-[#020617] p-8 text-center shadow-xl shadow-[#1B8AC7]/10 sm:p-12">
            <p className="text-base leading-relaxed text-slate-300 sm:text-lg md:text-xl">
              <span className="font-semibold text-white">Artiflex IT is a Platinum Sophos Partner</span> and a delivery partner for CrowdStrike, Microsoft, SentinelOne, Bitdefender, Trend Micro, and Check Point. <br />
              <span className="text-xs italic text-white sm:text-base">The vendor follows the assessment, not the other way around.</span>
            </p>
          </div>

          {/* Capability comparison table */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Comparison
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Visual capability ratings for the leading endpoint security platforms across ransomware protection, threat hunting, managed EDR coverage, XDR cross-domain correlation, and OT/ICS support. A gold ★ marker denotes best-in-class performance for that specific feature.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + endpointFeatureVendors.length * 116) }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-5 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">
                      Capability
                    </th>
                    {endpointFeatureVendors.map((v, i) => (
                      <th
                        key={v}
                        className="border-l border-white/15 px-2 py-3 sm:px-4 sm:py-5 align-bottom font-display text-sm font-semibold text-white sm:text-base"
                      >
                        {v}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {endpointFeatureRows.map((row, rIdx) => (
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
                        const t = endpointTierStyles[cell.tier];
                        return (
                          <td
                            key={cIdx}
                            className="border-l border-[#0A3D6B]/20 px-2 py-3 sm:px-4 sm:py-4 align-middle"
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

          {/* Legend */}
          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-3 text-xs text-slate-600">
            <span className="font-mono uppercase tracking-wider text-slate-500">Rating scale:</span>
            {(["best", "excellent", "veryStrong", "strong", "good", "moderate"] as EndpointTier[]).map((t) => {
              const s = endpointTierStyles[t];
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
        </div>
      </section>

      {/* ───────── FOUR-QUESTION DECISION MATRIX ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(27,138,199,0.06),transparent_60%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              Decision framework
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Four questions to identify the right endpoint platform
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Procurement decisions get cleaner when the questions are direct. Walk through these four and the vendor shortlist usually falls out by itself.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:mt-16 lg:grid-cols-2">
            {[
              {
                title: "What is your existing security stack?",
                desc: "Microsoft 365 E5 with Sentinel and Entra → Defender for Endpoint is usually the best-value answer. Sophos Firewall + Sophos Email → Intercept X with Synchronized Security wins on automation. Check Point Quantum estate → Harmony Endpoint reduces operational friction. None of the above → Sophos vs CrowdStrike vs SentinelOne, judged on TCO and ops capacity.",
              },
              {
                title: "What is your operational capacity?",
                desc: "A small in-house IT team needs single-pane management (Sophos Central, Microsoft Defender) and an MDR option. A mature security-engineering team can run CrowdStrike Falcon or SentinelOne Singularity at depth. Match the platform to the operators, not the brochure.",
              },
              {
                title: "What is your threat model?",
                desc: "Manufacturing, OT, and ICS → Trend Micro Vision One. Regulated industries with on-prem console requirements → Bitdefender GravityZone. Hybrid offices with field-deployed endpoints frequently offline → SentinelOne (offline autonomous response). Mainstream UAE enterprise → Sophos Intercept X.",
              },
              {
                title: "Do you need MDR?",
                desc: "If your team cannot operate EDR 24/7 (and most UAE mid-market teams cannot), MDR is the right answer regardless of the underlying agent. Sophos MDR (now backed by Secureworks Taegis), CrowdStrike Falcon Complete (with breach-prevention warranty), or partner-delivered MDR. The choice depends on budget envelope and the SLAs you actually need.",
              },
            ].map((q) => (
              <div
                key={q.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-[#04101E] to-[#0A3D6B] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#28B5E1]/40 hover:shadow-xl sm:p-7"
              >
                <h3 className="font-display text-xl font-semibold leading-tight text-white">
                  {q.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                  {q.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── OUR DELIVERY MODEL ───────── */}
      <section className="relative bg-surface-secondary py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="How we work"
            title={
              <>
                Our <span className="gradient-text">delivery model</span>
              </>
            }
            description="We don't sell licences. We deliver endpoint security outcomes: assess, design, deploy, manage. Every stage produces something an auditor can read and a CFO can sign off on."
            centered
          />

          <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-4">
            {[
              {
                title: "Assess",
                duration: "2 weeks",
                summary:
                  "Inventory of every endpoint, current AV/EDR audit, telemetry-quality review, MTTR/MTTD baseline, gap assessment against NESA, UAE PDPL, ISO 27001.",
                deliverable:
                  "Current-state report, vendor recommendation with rationale, three-year TCO comparison.",
              },
              {
                title: "Design",
                duration: "1–2 weeks",
                summary:
                  "Architecture for your environment: agent deployment plan, identity-aware policy framework, SIEM/XDR integration, exclusion management, deployment phasing, rollback procedures.",
                deliverable:
                  "Approved architecture, signed-off cutover sequence, change-management plan.",
              },
              {
                title: "Deploy",
                duration: "2–6 weeks",
                summary:
                  "Phased deployment with controlled pilot waves before production rollout. Pre-deployment exclusion testing prevents app conflicts. Off-hours rollout for critical servers. Day-1 hypercare.",
                deliverable:
                  "Live endpoint protection, audit-ready documentation, runbooks for your team.",
              },
              {
                title: "Manage",
                duration: "Ongoing",
                summary:
                  "24/7 monitoring, threat hunting, policy tuning, agent lifecycle, monthly board-readable reporting, quarterly architecture reviews. Optional Sophos MDR powered by Secureworks Taegis.",
                deliverable:
                  "Operational endpoint protection with SLAs you can actually rely on. Or a clean handover to your team.",
              },
            ].map((s, idx) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-border-light bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/25 hover:shadow-[0_12px_40px_rgba(27,138,199,0.10)] sm:p-6"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold text-heading">
                    {s.title}
                  </h3>
                  <span className="rounded-full border border-border-light bg-surface-secondary px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                    {s.duration}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-body">
                  {s.summary}
                </p>
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
              14+ years of UAE endpoint security delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when Sophos wins, when Microsoft Defender wins, when CrowdStrike is worth the premium, and when none of them is the right answer. The point of an honest assessment is honest answers.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years in UAE endpoint security" },
              { value: "500+", label: "Projects delivered, GCC-wide" },
              { value: "20+", label: "Certified security engineers" },
              { value: "Platinum", label: "Sophos partner tier" },
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

          <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Vendor coverage
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Sophos (Platinum), CrowdStrike Falcon, Microsoft Defender for Endpoint, SentinelOne Singularity, Bitdefender GravityZone, Trend Micro Vision One, Check Point Harmony, with active delivery across all seven.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Compliance frameworks
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  NESA, UAE PDPL, ISO 27001, NIST CSF 2.0, and CBUAE-aligned implementations, with audit-ready evidence delivered as part of the project.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Coverage area
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  On-site across Dubai, Abu Dhabi, and Sharjah. Remote across the UAE, Oman, and Saudi Arabia. 24/7 SOC support for managed customers via Sophos MDR + Secureworks Taegis.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Engagement model
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Fully managed, co-managed, or assessment-only. No vendor lock-in, no theatre, no upselling. The assessment drives the answer.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#28B5E1] px-6 py-3 font-display text-sm font-semibold text-navy-deep transition-colors hover:bg-white sm:text-base"
            >
              Book a free endpoint posture assessment
            </Link>
            <Link
              to="/blog/origin-endpoint-security"
              className="inline-flex items-center justify-center rounded-lg border border-white/15 px-6 py-3 font-display text-sm font-medium text-slate-300 transition-colors hover:border-[#28B5E1]/40 hover:text-white sm:text-base"
            >
              Read the full origin story →
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="relative bg-surface-secondary py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Knowledge Base"
            title={
              <>
                Frequently <span className="gradient-text">asked</span> questions
              </>
            }
            description="What businesses ask us most about EDR, XDR, and managed endpoint security."
            centered
          />

          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <CTASection
        title="Download the EDR vs XDR Buyer's Guide"
        description="Vendor-neutral comparison of CrowdStrike, SentinelOne, Microsoft, Sophos & Palo Alto - pricing, deployment, TCO, and real production case studies."
        primaryButton={{ text: "Request the Guide", action: "modal" }}
      />
    </>
  );
}
