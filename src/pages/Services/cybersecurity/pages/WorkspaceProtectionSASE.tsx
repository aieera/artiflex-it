import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { useContactModal } from "@/components/layout/ContactModal";
import { CTASection } from "@/pages/Home/sections/CTASection";
import {
  ShieldIcon,
  EyeIcon,
  CheckIcon,
  UsersIcon,
  CloudIcon,
  LockIcon,
  TargetIcon,
  ActivityIcon,
  GlobeIcon,
  ServerIcon,
  MonitorIcon,
  FileTextIcon,
} from "@/components/icons";

/* ───────── FOUR DRIVERS OF WORKSPACE PROTECTION ───────── */

const drivers = [
  {
    code: "WORKFORCE",
    title: "The Hybrid Workforce",
    desc: "Employees work from home offices, branch locations, cafés and mobile devices. The corporate network boundary is gone. Security must follow the user everywhere, on every device, on every network. The data-centre firewall protects an office that no longer exists.",
    keywords: "Remote Work · Branch · BYOD · Mobile",
    icon: UsersIcon,
  },
  {
    code: "SAAS",
    title: "SaaS & Cloud Adoption",
    desc: "Microsoft 365, Salesforce, Google Workspace, ServiceNow, Box and dozens of other SaaS apps run the business. All this traffic travels over the public internet, bypassing the firewall entirely. If your users live in Teams, SharePoint and Salesforce all day, your firewall is watching empty corridors.",
    keywords: "M365 · Salesforce · Google · 50,000+ SaaS",
    icon: CloudIcon,
  },
  {
    code: "DATA",
    title: "Cloud Data Protection",
    desc: "Sensitive data lives in SharePoint files, Salesforce records, OneDrive folders and SaaS integrations. Insider threats, accidental shares and SaaS misconfigurations all leak it. CASB and SSE provide the cloud-data visibility that endpoint DLP alone cannot.",
    keywords: "SharePoint · Salesforce · Insider · SaaS Misconfig",
    icon: LockIcon,
  },
  {
    code: "ZEROTRUST",
    title: "Zero Trust Security",
    desc: "Identity-based access, not network-based trust. The old model assumed inside-the-perimeter was safe. Zero Trust assumes nothing is trusted by default. Every user, device and app request is verified continuously. SSE / SASE is the delivery mechanism for Zero Trust.",
    keywords: "Identity-First · Continuous Verify · Posture Checks",
    icon: ShieldIcon,
  },
];

/* ───────── EIGHT KEY CAPABILITIES OF SSE / SASE ───────── */

const capabilities = [
  {
    code: "ZTNA",
    title: "Zero Trust Network Access (ZTNA)",
    desc: "Replaces VPN with identity- and posture-based access to specific applications only. Users access only the apps they are authorised for, never the full network. Eliminates lateral-movement risk if credentials are compromised.",
    keywords: "VPN Replacement · App-Level · No Lateral Movement",
    icon: ShieldIcon,
  },
  {
    code: "CASB",
    title: "Cloud Access Security Broker (CASB)",
    desc: "Visibility and control over all SaaS application usage, sanctioned and unsanctioned. Enforces DLP on cloud data, detects shadow IT, controls sharing permissions and monitors for anomalous user behaviour in cloud apps.",
    keywords: "Sanctioned · Unsanctioned · Shadow IT · API + Inline",
    icon: EyeIcon,
  },
  {
    code: "SWG",
    title: "Secure Web Gateway (SWG)",
    desc: "Inspects all web traffic for malware, phishing and command-and-control. Enforces acceptable-use policies, blocks malicious URLs and filters web content regardless of device location.",
    keywords: "Malware · Phishing · URL Filtering · Acceptable Use",
    icon: GlobeIcon,
  },
  {
    code: "FWAAS",
    title: "Firewall-as-a-Service (FWaaS)",
    desc: "Cloud-delivered NGFW protecting traffic from branch offices, remote users and cloud workloads, without requiring physical firewall hardware at every location.",
    keywords: "Cloud NGFW · Branch · Remote · No Hardware",
    icon: ServerIcon,
  },
  {
    code: "DLP",
    title: "Data Loss Prevention (DLP)",
    desc: "Detects and prevents sensitive data being uploaded to unauthorised cloud services, shared externally or exfiltrated via web channels. Consistent data-protection policies across all cloud and web traffic.",
    keywords: "Cloud Uploads · External Sharing · Web Egress",
    icon: FileTextIcon,
  },
  {
    code: "RBI",
    title: "Remote Browser Isolation (RBI)",
    desc: "Web browsing executes in a cloud container; the user sees a visual stream rather than running web code locally. Eliminates browser-based malware, zero-day exploits and credential phishing for high-risk destinations.",
    keywords: "Cloud Container · Visual Stream · Zero-Day · Phishing",
    icon: MonitorIcon,
  },
  {
    code: "DNS",
    title: "DNS Security",
    desc: "Blocks malicious, phishing and unwanted domains at DNS resolution, before any connection is established. Operates across all apps, ports and protocols on the endpoint, including non-browser traffic.",
    keywords: "Pre-Connection · All Apps · DoH · Phishing Domains",
    icon: ActivityIcon,
  },
  {
    code: "SSPM",
    title: "SaaS Security Posture Management (SSPM)",
    desc: "Continuously audits SaaS application configurations (Microsoft 365, Salesforce, Google Workspace) for security misconfigurations, excessive permissions and compliance violations. Prevents the silent drift that creates breach exposure.",
    keywords: "M365 · Salesforce · Google · Drift · Misconfig",
    icon: TargetIcon,
  },
];

/* ───────── WORKSPACE PROTECTION VENDORS WE DELIVER ───────── */

const vendors: {
  slug: string;
  name: string;
  category: string;
  best: string;
  strength: string;
  watch: string;
  accent: string;
  logo?: string;
}[] = [
  {
    slug: "sophos-workspace-protection",
    name: "Sophos Workspace Protection",
    category: "Browser-Native SSE · Protected Browser · ZTNA",
    best: "Recommended · Most Innovative Solution",
    strength:
      "Recently launched. Bundles ZTNA, SWG, DNS security and email monitoring into one per-user licence delivered through the Sophos Protected Browser (powered by Island.io). Best-in-class Shadow IT / Shadow AI governance. Synchronized Security: a compromised endpoint loses ZTNA access automatically. Agentless BYOD.",
    watch:
      "Strongest leverage when Sophos Endpoint or Sophos Firewall are already in the estate, because Synchronized Security automation is unique. Newer entrant in the SASE category, no SD-WAN of its own (uses Sophos XGS Firewall SD-WAN).",
    accent: "#1B8AC7",
    logo: "/logos/sophos.svg",
  },
  {
    slug: "palo-alto-prisma-access",
    name: "Palo Alto Networks Prisma Access",
    category: "Premium SASE · Gartner MQ Leader",
    best: "Recommended · Broadest SASE Feature Set",
    strength:
      "Gartner MQ Leader for SSE. Full SASE spectrum (ZTNA, SWG, CASB, FWaaS, DLP, RBI) powered by Palo Alto AI across 100+ global PoPs. App-ID enforces ZTNA per application. 5,000+ SaaS apps audited. Precision AI inline detection.",
    watch:
      "Premium pricing tier, typically 40-60% more expensive than Sophos or Check Point. Best fit for large enterprises with global remote workforces and the budget to match. Powerful console requires expert operators.",
    accent: "#FA582D",
    logo: "/logos/PaloAltoNetworks.svg",
  },
  {
    slug: "check-point-harmony-sase",
    name: "Check Point Harmony SASE",
    category: "Full-Stack SASE · ThreatCloud AI",
    best: "Recommended · Best for Check Point Infinity Customers",
    strength:
      "Full-featured cloud SASE that replaces legacy VPN, web proxies and standalone CASB. Harmony Connect ZTNA inspected by ThreatCloud AI across 100+ PoPs. Cloud SWG with 99.3% phishing block accuracy. FWaaS plus SD-WAN. Unified Infinity Portal policy with Quantum, Harmony Endpoint and Email.",
    watch:
      "Strongest leverage when the buyer is consolidating onto Check Point Infinity. Limited Remote Browser Isolation capability versus Palo Alto / Netskope. Less differentiated for non-Check Point estates.",
    accent: "#E4007F",
    logo: "/logos/Check-Point-2024-logo-color.svg",
  },
  {
    slug: "netskope-sse",
    name: "Netskope SSE",
    category: "SaaS-Specialist SSE · 50,000+ Apps",
    best: "Deepest CASB · Strongest Cloud DLP",
    strength:
      "Dedicated SSE specialist with the deepest SaaS visibility. NewEdge inspects 50,000+ cloud apps across 50+ PoPs. CASB in both API and inline modes. ML-based DLP across cloud-to-cloud and cloud-to-endpoint flows. Best when CASB depth is the dominant criterion.",
    watch:
      "Standalone SSE specialist, no SD-WAN networking. Limited firewall / endpoint synchronisation. Mid-high standalone cost. Best when CASB depth is the dominant criterion rather than full SASE convergence.",
    accent: "#FFCC00",
    logo: "/logos/Netscope.png",
  },
  {
    slug: "microsoft-mcas",
    name: "Microsoft Defender for Cloud Apps + Global Secure Access",
    category: "Native CASB + Cloud SSE for the Microsoft Estate",
    best: "Bundled in M365 E5 · Deepest M365 Integration",
    strength:
      "Native CASB for the M365 ecosystem with deepest integration into Exchange, SharePoint, OneDrive and Teams. 31,000+ apps risk-rated. Conditional Access App Control for session-level policy. Entra Global Secure Access adds ZTNA and SWG. Bundled in M365 E5 / Entra Suite.",
    watch:
      "Best when the buyer is fully Microsoft-centric. Limited RBI, no SD-WAN. SWG via Global Secure Access is newer than the dedicated SSE specialists. Most regulated buyers pair MCAS + GSA with Sophos or Check Point when full SASE convergence is in scope.",
    accent: "#0078D4",
    logo: "/logos/MicrosoftDefender.webp",
  },
];

/* ───────── DECISIVE ADVANTAGES (3 CARDS) ───────── */

const decisiveAdvantages: {
  name: string;
  tagline: string;
  accent: string;
  points: string[];
}[] = [
  {
    name: "Sophos Workspace Protection",
    tagline: "Most innovative SSE platform",
    accent: "#1B8AC7",
    points: [
      "Browser-native ZTNA + SWG + DNS + email monitoring in one per-user licence, powered by Island.io enterprise browser.",
      "Best-in-class Shadow AI governance: controls personal ChatGPT, DeepSeek and other unauthorised AI tools at the browser layer.",
      "Synchronized Security with Sophos Endpoint and Firewall: compromised device = ZTNA access auto-revoked. No standalone SASE can replicate this.",
    ],
  },
  {
    name: "Palo Alto Prisma Access",
    tagline: "Premium tier · Gartner MQ Leader for SSE",
    accent: "#FA582D",
    points: [
      "Broadest SASE feature set in the market: ZTNA, SWG, CASB, FWaaS, DLP and RBI in one cloud platform.",
      "App-ID enforces application-level Zero Trust; the rest of the network is invisible to the user.",
      "Right pick for large enterprises with global remote workforces and the budget for a premium SASE platform.",
    ],
  },
  {
    name: "Check Point Harmony SASE",
    tagline: "Full-stack SASE on the Infinity platform",
    accent: "#E4007F",
    points: [
      "ThreatCloud AI inspection of every SASE session, 99.3% phishing block accuracy in published Check Point testing.",
      "Unified policy across Quantum Firewall, Harmony Endpoint, Harmony Email and Harmony SASE through one Infinity Portal.",
      "Includes integrated SD-WAN, replacing MPLS while keeping consistent security on every branch.",
    ],
  },
];

/* ───────── SOPHOS WORKSPACE PROTECTION ADVANTAGES (8 CARDS) ───────── */

const sophosAdvantages: { title: string; meaning: string }[] = [
  {
    title: "Protected Browser as the policy point",
    meaning:
      "Powered by Island.io. Enforces all workspace security policies at the point of use: no copy, no download, no print to untrusted destinations.",
  },
  {
    title: "Browser-native ZTNA + thin agent",
    meaning:
      "Web apps accessed through the browser with full posture checks; thin agent for non-browser apps. Apps invisible to the internet, only authorised users connect.",
  },
  {
    title: "DNS Protection bundled",
    meaning:
      "Cloud-delivered DNS security across all apps, ports and protocols on Windows endpoints. Catches threats the browser cannot see.",
  },
  {
    title: "Shadow IT & Shadow AI governance",
    meaning:
      "Controls unsanctioned SaaS and unauthorised generative AI (personal ChatGPT, DeepSeek, etc.) at the browser. Critical as Shadow AI proliferates.",
  },
  {
    title: "Synchronized Security with Sophos",
    meaning:
      "Compromised device = ZTNA access auto-revoked instantly. Heartbeat-driven automation that no standalone SASE product can replicate.",
  },
  {
    title: "Agentless BYOD access",
    meaning:
      "Contractors, partners and BYOD users access specific corporate apps securely without MDM enrolment or agent installation.",
  },
  {
    title: "Best TCO in the category",
    meaning:
      "Single per-user bundle covers ZTNA + SWG + DNS + email monitoring. No traditional SASE stack assembly cost.",
  },
  {
    title: "Sophos Central unified management",
    meaning:
      "Same console used for XGS Firewall, Intercept X, Email Security and Sophos MDR. Zero additional management overhead.",
  },
];

/* ───────── WORKSPACE PROTECTION COMPARISON TABLE ───────── */

type WspTier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate" | "basic";
type WspFeatureCell = { tier: WspTier; note?: string };

const wspCompareVendors = [
  "Sophos Workspace Protection",
  "Palo Alto Prisma Access",
  "Check Point Harmony SASE",
  "Netskope SSE",
  "Microsoft MCAS + GSA",
];

const wspFeatureRows: { label: string; cells: WspFeatureCell[] }[] = [
  {
    label: "ZTNA, Zero Trust Access",
    cells: [
      { tier: "best", note: "Browser-native + Sync Security auto-revoke" },
      { tier: "best", note: "Prisma Access, Gartner MQ Leader" },
      { tier: "excellent", note: "Harmony Connect, ThreatCloud inspected" },
      { tier: "veryStrong", note: "Strong ZTNA, cloud-native" },
      { tier: "strong", note: "Global Secure Access via Entra ID" },
    ],
  },
  {
    label: "CASB, SaaS Security",
    cells: [
      { tier: "veryStrong", note: "SaaS monitoring + Shadow AI control" },
      { tier: "excellent", note: "5,000+ SaaS apps, broadest coverage" },
      { tier: "excellent", note: "CASB + SSPM, Infinity integrated" },
      { tier: "best", note: "50,000+ apps, deepest CASB" },
      { tier: "best", note: "31,000 apps, deepest M365 native" },
    ],
  },
  {
    label: "Secure Web Gateway (SWG)",
    cells: [
      { tier: "best", note: "Protected Browser inline, zero latency" },
      { tier: "excellent", note: "AI-powered SWG, WildFire intel" },
      { tier: "excellent", note: "ThreatCloud AI, 99.3% phishing block" },
      { tier: "excellent", note: "NewEdge 50+ PoPs, low latency" },
      { tier: "good", note: "Global Secure Access (Internet Access)" },
    ],
  },
  {
    label: "DNS Security",
    cells: [
      { tier: "best", note: "DNS Protection bundled free" },
      { tier: "veryStrong", note: "Advanced DNS Security" },
      { tier: "veryStrong", note: "DNS Firewall, ThreatCloud backed" },
      { tier: "veryStrong", note: "Inline DNS inspection" },
      { tier: "good", note: "Via Defender for Endpoint only" },
    ],
  },
  {
    label: "DLP, Cloud & Web",
    cells: [
      { tier: "excellent", note: "Browser-native + Sophos Firewall DLP" },
      { tier: "excellent", note: "Cloud DLP, advanced AI classification" },
      { tier: "excellent", note: "Harmony DLP, unified across all layers" },
      { tier: "best", note: "ML DLP, strongest cloud coverage" },
      { tier: "best", note: "Purview DLP, deepest M365 native" },
    ],
  },
  {
    label: "Shadow IT / AI Governance",
    cells: [
      { tier: "best", note: "Browser-native, best AI governance" },
      { tier: "excellent", note: "App-ID, 5,000+ app discovery" },
      { tier: "veryStrong", note: "App discovery + risk classification" },
      { tier: "excellent", note: "50,000+ app risk rating" },
      { tier: "veryStrong", note: "31,000 apps, M365 native" },
    ],
  },
  {
    label: "Remote Browser Isolation (RBI)",
    cells: [
      { tier: "excellent", note: "Browser IS the isolation environment" },
      { tier: "excellent", note: "Full cloud RBI execution" },
      { tier: "moderate", note: "Limited RBI capability" },
      { tier: "veryStrong", note: "RBI for high-risk destinations" },
      { tier: "basic", note: "Not a primary capability" },
    ],
  },
  {
    label: "BYOD / Unmanaged Devices",
    cells: [
      { tier: "best", note: "Agentless via Protected Browser" },
      { tier: "excellent", note: "Clientless ZTNA option" },
      { tier: "excellent", note: "Agentless ZTNA, Conditional Access" },
      { tier: "excellent", note: "Agentless API-mode deployment" },
      { tier: "excellent", note: "Conditional Access App Control" },
    ],
  },
  {
    label: "Firewall / Endpoint Sync",
    cells: [
      { tier: "best", note: "Synchronized Security, unique auto-response" },
      { tier: "excellent", note: "Cortex XDR + Prisma, strong" },
      { tier: "best", note: "Infinity platform, full policy sync" },
      { tier: "moderate", note: "Limited, standalone specialist" },
      { tier: "excellent", note: "Deep Defender XDR sync" },
    ],
  },
  {
    label: "SD-WAN Integration",
    cells: [
      { tier: "good", note: "Via Sophos XGS Firewall SD-WAN" },
      { tier: "excellent", note: "Prisma SD-WAN, full SASE stack" },
      { tier: "excellent", note: "SD-WAN built into Harmony SASE" },
      { tier: "moderate", note: "Not a primary SSE capability" },
      { tier: "basic", note: "Not included" },
    ],
  },
  {
    label: "Management Simplicity",
    cells: [
      { tier: "best", note: "Sophos Central, all products unified" },
      { tier: "strong", note: "Prisma Portal, expert needed" },
      { tier: "excellent", note: "Infinity Portal, unified all layers" },
      { tier: "strong", note: "Netskope console, cloud-native" },
      { tier: "excellent", note: "M365 Defender portal, familiar" },
    ],
  },
  {
    label: "Total Cost of Ownership",
    cells: [
      { tier: "best", note: "Per-user bundle, simplest pricing" },
      { tier: "moderate", note: "Premium, 40-60% higher" },
      { tier: "excellent", note: "Good enterprise value, Infinity bundle" },
      { tier: "good", note: "Mid-high standalone SSE cost" },
      { tier: "best", note: "Free with Microsoft 365 E5" },
    ],
  },
];

const wspTierStyles: Record<WspTier, { bg: string; text: string; label: string }> = {
  best: { bg: "bg-emerald-600", text: "text-white", label: "Best in class" },
  excellent: { bg: "bg-emerald-500", text: "text-white", label: "Excellent" },
  veryStrong: { bg: "bg-emerald-200", text: "text-emerald-900", label: "Very strong" },
  strong: { bg: "bg-amber-200", text: "text-amber-900", label: "Strong" },
  good: { bg: "bg-amber-100", text: "text-amber-900", label: "Good" },
  moderate: { bg: "bg-amber-100", text: "text-amber-900", label: "Moderate" },
  basic: { bg: "bg-slate-100", text: "text-slate-700", label: "Basic" },
};

/* ───────── VENDOR MATRIX (financial, strategic, management view) ───────── */

const wspMatrixVendors = [
  { name: "Sophos Workspace Protection", recommended: true },
  { name: "Palo Alto Prisma Access", recommended: true },
  { name: "Check Point Harmony SASE", recommended: true },
  { name: "Netskope SSE" },
  { name: "Microsoft MCAS + GSA" },
];

type WspStarCell = { stars: number; note: string };
type WspVerdictCell = { recommended?: boolean; rank?: string; text: string };
type WspMatrixRow =
  | { label: string; type: "text"; cells: string[] }
  | { label: string; type: "stars"; cells: WspStarCell[] }
  | { label: string; type: "verdict"; cells: WspVerdictCell[] };

const wspMatrixRows: WspMatrixRow[] = [
  {
    label: "Founded / Heritage",
    type: "text",
    cells: [
      "1985 security heritage + Island.io enterprise browser",
      "2005, invented the NGFW; Prisma Access SASE",
      "1993, invented stateful inspection; Infinity + Harmony",
      "2012, born-in-cloud SSE specialist",
      "M365 / Entra native; MCAS since 2015",
    ],
  },
  {
    label: "Total Cost of Ownership",
    type: "stars",
    cells: [
      { stars: 5, note: "Per-user bundle, simplest pricing" },
      { stars: 2, note: "Premium, 40-60% higher" },
      { stars: 4, note: "Strong value via Infinity bundle" },
      { stars: 3, note: "Mid-high standalone SSE cost" },
      { stars: 5, note: "Bundled in Microsoft 365 E5" },
    ],
  },
  {
    label: "Ease of Management",
    type: "stars",
    cells: [
      { stars: 5, note: "Sophos Central, all products unified" },
      { stars: 3, note: "Prisma Portal, expert needed" },
      { stars: 4, note: "Infinity Portal, unified layers" },
      { stars: 3, note: "Netskope console, cloud-native" },
      { stars: 4, note: "M365 Defender portal, familiar" },
    ],
  },
  {
    label: "Threat Intelligence",
    type: "stars",
    cells: [
      { stars: 5, note: "SophosLabs + X-Ops" },
      { stars: 5, note: "Precision AI + Unit 42" },
      { stars: 5, note: "ThreatCloud AI, 99.3% phishing block" },
      { stars: 4, note: "Cloud Threat Exchange" },
      { stars: 5, note: "Microsoft Threat Intelligence" },
    ],
  },
  {
    label: "CASB / SaaS Depth",
    type: "stars",
    cells: [
      { stars: 4, note: "SaaS monitoring + Shadow AI control" },
      { stars: 4, note: "5,000+ SaaS apps audited" },
      { stars: 4, note: "CASB + SSPM, Infinity integrated" },
      { stars: 5, note: "50,000+ apps, deepest CASB" },
      { stars: 5, note: "31,000 apps, deepest M365 native" },
    ],
  },
  {
    label: "ZTNA / Zero Trust",
    type: "stars",
    cells: [
      { stars: 5, note: "Browser-native + auto-revoke" },
      { stars: 5, note: "Prisma Access, Gartner MQ Leader" },
      { stars: 4, note: "Harmony Connect, ThreatCloud inspected" },
      { stars: 4, note: "Strong cloud-native ZTNA" },
      { stars: 3, note: "Global Secure Access via Entra ID" },
    ],
  },
  {
    label: "Endpoint / Firewall Sync",
    type: "stars",
    cells: [
      { stars: 5, note: "Synchronized Security: unique" },
      { stars: 4, note: "Cortex XDR + Prisma" },
      { stars: 5, note: "Infinity platform, full policy sync" },
      { stars: 2, note: "Limited, standalone specialist" },
      { stars: 4, note: "Deep Defender XDR sync" },
    ],
  },
  {
    label: "SD-WAN / Networking",
    type: "stars",
    cells: [
      { stars: 3, note: "Via Sophos XGS Firewall SD-WAN" },
      { stars: 4, note: "Prisma SD-WAN, full SASE stack" },
      { stars: 4, note: "SD-WAN built into Harmony SASE" },
      { stars: 2, note: "Not a primary SSE capability" },
      { stars: 1, note: "Not included" },
    ],
  },
  {
    label: "Vendor Stability",
    type: "stars",
    cells: [
      { stars: 5, note: "Thoma Bravo, USD 3.9B backed" },
      { stars: 5, note: "NASDAQ: PANW, SASE market leader" },
      { stars: 5, note: "NASDAQ: CHKP, 30+ yrs profitable" },
      { stars: 4, note: "Well-funded SSE pure-play" },
      { stars: 5, note: "Microsoft, global scale" },
    ],
  },
  {
    label: "Best Suited For",
    type: "text",
    cells: [
      "Sophos estates, BYOD and Shadow AI control",
      "Large enterprise, global remote workforce",
      "Check Point Infinity consolidators",
      "Cloud-first, heavy SaaS estates",
      "Microsoft 365 E5 estates",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      { recommended: true, text: "Most innovative SSE. Browser-native ZTNA, SWG and DNS, best Shadow AI governance, unique Synchronized Security. Best TCO." },
      { recommended: true, text: "Broadest SASE feature set. Gartner MQ Leader. Premium tier for global enterprise workforces." },
      { recommended: true, text: "Full-stack SASE on Infinity. ThreatCloud AI on every session. Best for Check Point consolidators." },
      { text: "Deepest CASB and cloud DLP. Best when SaaS visibility is the dominant criterion." },
      { text: "Native CASB and ZTNA for the Microsoft estate, bundled in E5. Often paired with Sophos or Check Point for full SASE." },
    ],
  },
];

/* ───────── BUYER'S DECISION GUIDE ───────── */

const buyerDecisionGuide: { says: string; recommend: string; rationale: string }[] = [
  {
    says: "We are already a Sophos shop and want SSE without a separate SASE stack.",
    recommend: "Sophos Workspace Protection",
    rationale:
      "Single per-user bundle covering ZTNA, SWG, DNS and email monitoring through the Protected Browser. Synchronized Security with Sophos Endpoint and Firewall is unique.",
  },
  {
    says: "We are consolidating onto Check Point Infinity and want SASE under the same policy.",
    recommend: "Check Point Harmony SASE",
    rationale:
      "ZTNA + SWG + CASB + FWaaS + SD-WAN under the Infinity Portal. ThreatCloud AI inspection on every session. 99.3% phishing block accuracy.",
  },
  {
    says: "We are 100% Microsoft 365 E5 and want native cloud security.",
    recommend: "Microsoft Defender for Cloud Apps (MCAS)",
    rationale:
      "Bundled in E5. Deepest integration with Exchange, SharePoint, OneDrive, Teams. Layer Sophos or Check Point if non-Microsoft SaaS or full SASE coverage is needed.",
  },
  {
    says: "We have a heavy, complex SaaS estate with 50+ active apps and need the deepest CASB.",
    recommend: "Netskope SSE",
    rationale:
      "50,000+ cloud apps inspected with content + context awareness. Strongest cloud DLP and dual-mode (API + inline) CASB. Best for cloud-first regulated industries.",
  },
  {
    says: "We are a large enterprise needing premium SASE with the broadest feature set.",
    recommend: "Palo Alto Prisma Access",
    rationale:
      "Gartner MQ Leader. Full ZTNA + SWG + CASB + FWaaS + DLP + RBI in one cloud. Premium pricing tier, right when stakes and budget justify it.",
  },
  {
    says: "We need to onboard contractors and BYOD users without MDM or agent rollout.",
    recommend: "Sophos Workspace Protection",
    rationale:
      "Agentless Protected Browser gives BYOD users secure access to specific corporate apps without endpoint enrolment. The cleanest contractor-access story in the market.",
  },
  {
    says: "We need to govern Shadow AI usage (personal ChatGPT, DeepSeek) across the workforce.",
    recommend: "Sophos Workspace Protection",
    rationale:
      "Browser-native Shadow AI controls block or restrict personal generative-AI tools at the point of use, preventing corporate data exfiltration into uncontrolled AI services.",
  },
  {
    says: "We need an SSE platform deployed in days, not months.",
    recommend: "Sophos Workspace Protection or Check Point Harmony SASE",
    rationale:
      "Both deploy in days through cloud-delivered services. Sophos via the Protected Browser, Check Point via Harmony Connect. Palo Alto and Netskope require longer onboarding.",
  },
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "What is SSE / SASE / CASB and how do they differ?",
    answer:
      "SSE (Security Service Edge) is the security stack of SASE: ZTNA + SWG + CASB + FWaaS + DLP delivered from the cloud. SASE (Secure Access Service Edge) is SSE plus SD-WAN networking in one cloud-delivered platform. CASB (Cloud Access Security Broker) controls and monitors SaaS application access, shadow IT and cloud data. CASB is a capability inside SSE / SASE, not a competing category. Most modern enterprise deployments require all three working together.",
  },
  {
    question: "Why is Sophos Workspace Protection the recommended platform?",
    answer:
      "Sophos Workspace Protection takes a fundamentally different approach: instead of assembling a traditional SASE stack of ZTNA + SWG + DNS + CASB tools, it delivers all of these through the Sophos Protected Browser (powered by Island.io) in one per-user licence. That means simpler procurement, simpler operations, best-in-class Shadow AI governance and unique Synchronized Security automation with Sophos Endpoint and Firewall. For organisations already on the Sophos stack it is the cleanest path to SSE in the market.",
  },
  {
    question: "We have an existing VPN. When should we replace it with ZTNA?",
    answer:
      "When credential-driven lateral movement, VPN concentrator scaling, third-party / contractor access overhead or internet-exposed VPN gateways have become real risks. ZTNA replaces the network-level VPN trust model with identity- and posture-based access to specific applications only. Users see only the apps they are authorised for, never the full network. Most regulated UAE buyers are now deprecating VPN within a 12 to 18 month phased programme.",
  },
  {
    question: "We are on Microsoft 365 E5. Do we still need a third-party SSE?",
    answer:
      "Microsoft now offers two parts: Defender for Cloud Apps (MCAS) for CASB plus Microsoft Entra Global Secure Access for ZTNA (Private Access) and SWG (Internet Access). Both bundled in E5 / Entra Suite. For Microsoft-centric estates this combination covers CASB, conditional-access and identity-led ZTNA extremely well. You still need a third-party SSE when you have material non-Microsoft SaaS estate, need full SASE convergence (FWaaS + SD-WAN), need RBI, or need browser-native enforcement for BYOD and contractors. Sophos Workspace Protection or Check Point Harmony SASE are the most common pairings with MCAS + GSA for UAE customers.",
  },
  {
    question: "What is Shadow AI Governance and why does it matter?",
    answer:
      "Shadow AI is the use of unauthorised generative AI tools (personal ChatGPT, Claude, DeepSeek, Gemini) by employees, often pasting sensitive corporate content into prompts that flow into uncontrolled third-party services. It is the fastest-growing data-exposure risk under NIS2 and NCA ECC. Sophos Workspace Protection's browser-native controls block or restrict these tools at the point of use, which is the only effective enforcement layer (network filtering is too easy to bypass via mobile data or VPN).",
  },
  {
    question: "How does the Sophos Protected Browser work for BYOD?",
    answer:
      "The Protected Browser is a managed Chromium-based browser deployed to BYOD or unmanaged devices via download. It carries the workspace security policies (DLP, copy / paste / print controls, ZTNA app access, web filtering) inside the browser itself, with no agent on the endpoint. Contractors, partners and BYOD users get controlled access to specific corporate apps without MDM enrolment. The cleanest contractor-access story in the market.",
  },
  {
    question: "What is the difference between agent-based and agentless ZTNA?",
    answer:
      "Agent-based ZTNA installs a thin client on the endpoint that brokers application connections; it covers any app (web, SSH, RDP, native). Agentless ZTNA brokers access via a cloud proxy or browser; it covers web apps and is the right pick for unmanaged / BYOD devices. Sophos Workspace Protection delivers both: agentless via the Protected Browser plus a thin agent for non-browser apps. Most buyers use a mix.",
  },
  {
    question: "Does SSE / SASE meet NESA, NCA ECC, ADHICS and SAMA requirements?",
    answer:
      "Yes, when correctly scoped. Every UAE and GCC framework expects identity-based access, segmentation, web threat protection, cloud data control and audit-grade evidence of policy enforcement. SSE / SASE platforms operationalise all of these. Sophos Workspace Protection, Check Point Harmony SASE and Palo Alto Prisma Access all map directly to NESA UAE IA, NCA ECC, ADHICS, CBUAE and SAMA control statements.",
  },
  {
    question: "How long does a typical SSE / SASE rollout take in the UAE?",
    answer:
      "Sophos Workspace Protection and Check Point Harmony SASE deploy in days to weeks for the first wave (typically 100-500 users) and 2 to 4 months for full estate rollout including SaaS connector design and ZTNA app onboarding. Palo Alto Prisma Access and Netskope SSE run 3 to 6 months for full estate. Artiflex IT scopes SSE in waves so each phase delivers measurable risk-reduction value before the next is committed.",
  },
  {
    question: "Should we run SSE / SASE in-house or with a delivery partner?",
    answer:
      "SSE platforms are mature, but SSE operations are the hard part: ZTNA app-onboarding pipelines, CASB policy authoring, SaaS connector management, SWG tuning, DLP triage and integration with SIEM / MDR. Most in-house teams underestimate the operational lift. Artiflex IT delivers SSE as a co-managed engagement: the customer keeps governance and approval, we run the platform, the policies and the integration roadmap.",
  },
];

/* ───────── HERO ───────── */

function WorkspaceHero() {
  const { open: openContact } = useContactModal();
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-navy-deep">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/cyber2.png')" }}
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
                <span className="font-medium text-[#28B5E1]">Workspace Protection (SSE / SASE / CASB)</span>
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
          <h1 className="font-display text-4xl font-bold leading-[1] tracking-tight text-white sm:text-5xl md:text-5xl lg:text-[3.75rem]">
            Workspace Protection{" "}
            <span className="gradient-text">UAE</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              SSE, SASE &amp; CASB
            </span>
          </h1>

          <p className="mt-5 max-w-2xl font-display text-sm italic leading-relaxed text-slate-300 sm:text-base">
            <em className="not-italic font-semibold text-white">The corporate network boundary is gone.</em> Security must follow the user, the device and the data, everywhere they go. ZTNA, CASB, SWG, FWaaS, DLP, RBI, DNS and SSPM, delivered from the cloud as one workspace security fabric.
          </p>

          <p className="mt-3 max-w-2xl text-xs leading-relaxed text-slate-400 sm:text-sm">
            Sophos Workspace Protection (Most Innovative), Check Point Harmony SASE, Palo Alto Prisma Access, Netskope SSE and Microsoft Defender for Cloud Apps. Aligned to NESA, NCA ECC, ADHICS, SAMA, ISO 27001 and PDPL.
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
              Gartner Style Review
            </a>
            <Link
              to="/blog/origin-workspace-protection-sse-sase"
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
              Get a Free Workspace Assessment
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

export default function WorkspaceProtectionSASE() {
  const { open: openContact } = useContactModal();
  const [openDriver, setOpenDriver] = useState<number | null>(null);
  const [openCapability, setOpenCapability] = useState<number | null>(null);
  const [activeFaq, setActiveFaq] = useState(0);

  return (
    <>
      <>
        <title>Workspace Protection UAE | SSE, SASE, CASB | Sophos, Check Point, Palo Alto, Netskope, Microsoft | Artiflex IT</title>
        <meta
          name="description"
          content="Workspace Protection (SSE / SASE / CASB) for UAE ministries, banks, healthcare and enterprise. Sophos Workspace Protection (Most Innovative), Check Point Harmony SASE, Palo Alto Prisma Access, Netskope SSE and Microsoft Defender for Cloud Apps. ZTNA, SWG, CASB, FWaaS, DLP, RBI, DNS, SSPM. Aligned to NESA, NCA ECC, ADHICS, SAMA, ISO 27001 and PDPL."
        />
        <meta
          name="keywords"
          content="Workspace Protection UAE, SSE UAE, SASE UAE, SASE Dubai, CASB UAE, ZTNA UAE, Zero Trust Network Access, Sophos Workspace Protection, Sophos Protected Browser, Island.io, Check Point Harmony SASE, Palo Alto Prisma Access, Netskope SSE, Microsoft Defender for Cloud Apps, MCAS, Secure Web Gateway, FWaaS, Cloud DLP, Remote Browser Isolation, RBI, DNS Security, SSPM, Shadow IT UAE, Shadow AI governance, BYOD, NESA, NCA ECC, ADHICS, CBUAE, SAMA, ISO 27001, PDPL"
        />
        <link rel="canonical" href="https://artiflexit.com/cybersecurity/workspace-protection-sse-sase" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Workspace Protection UAE | SSE, SASE, CASB | Sophos, Check Point, Palo Alto, Netskope, Microsoft | Artiflex IT" />
        <meta
          property="og:description"
          content="SSE / SASE / CASB for UAE ministries, banks, telcos and enterprise. Sophos Workspace Protection, Check Point Harmony SASE, Palo Alto Prisma Access, Netskope SSE, Microsoft MCAS. ZTNA, SWG, CASB, FWaaS, DLP, RBI, DNS, SSPM."
        />
        <meta property="og:url" content="https://artiflexit.com/cybersecurity/workspace-protection-sse-sase" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Workspace Protection UAE | SSE / SASE / CASB | Artiflex IT" />
        <meta
          name="twitter:description"
          content="SSE / SASE / CASB for the UAE: Sophos Workspace Protection (Most Innovative), Check Point Harmony SASE, Palo Alto Prisma Access, Netskope SSE, Microsoft MCAS."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Artiflex IT",
            url: "https://artiflexit.com/cybersecurity/workspace-protection-sse-sase",
            areaServed: [
              { "@type": "Country", name: "United Arab Emirates" },
              { "@type": "Country", name: "Saudi Arabia" },
              { "@type": "City", name: "Dubai" },
              { "@type": "City", name: "Abu Dhabi" },
            ],
            address: { "@type": "PostalAddress", addressCountry: "AE" },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Workspace Protection (SSE / SASE / CASB), UAE",
            alternateName: [
              "SSE UAE",
              "SASE UAE",
              "CASB UAE",
              "ZTNA UAE",
              "Sophos Workspace Protection UAE",
              "Check Point Harmony SASE UAE",
              "Palo Alto Prisma Access UAE",
              "Netskope SSE UAE",
              "Microsoft MCAS UAE",
            ],
            description:
              "Workspace Protection services for the UAE and the wider GCC. Sophos Workspace Protection (Most Innovative), Check Point Harmony SASE, Palo Alto Prisma Access, Netskope SSE and Microsoft Defender for Cloud Apps. Zero Trust Network Access, Secure Web Gateway, Cloud Access Security Broker, Firewall-as-a-Service, Cloud DLP, Remote Browser Isolation, DNS Security and SaaS Security Posture Management. Aligned to NESA, NCA ECC, ADHICS, SAMA, ISO 27001 and PDPL.",
            provider: { "@type": "Organization", name: "Artiflex IT" },
            areaServed: [
              { "@type": "Country", name: "United Arab Emirates" },
              { "@type": "Country", name: "Saudi Arabia" },
            ],
            serviceType:
              "Workspace Protection, SSE, SASE, CASB, ZTNA, Secure Web Gateway, FWaaS, Cloud DLP, Remote Browser Isolation, DNS Security, SaaS Security Posture Management, Sophos Workspace Protection, Check Point Harmony SASE, Palo Alto Prisma Access, Netskope SSE, Microsoft Defender for Cloud Apps",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <WorkspaceHero />

      {/* ───────── WORKSPACE PROTECTION VENDORS WE DELIVER (HONEYCOMB) ───────── */}
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
              Workspace Protection{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Vendors
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The SSE, SASE and CASB platforms we design, deploy and manage across UAE environments. The choice follows your stack, your SaaS estate and the BYOD / contractor surface you have to defend.
            </p>
          </div>

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
                    <div
                      key={v.slug}
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
                    </div>
                  ))}
                </div>
              ));
            })()}
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:hidden">
            {vendors.map((v) => (
              <div
                key={v.slug}
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
            <span className="font-semibold text-slate-700">
              {vendors.length} platforms
            </span>
            , picked by your stack, SaaS estate and BYOD surface.
          </p>
        </div>
      </section>

      {/* ───────── WHY WORKSPACE PROTECTION ───────── */}
      {/* <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="The Stakes"
            title={
              <>
                Traditional perimeter security{" "}
                <span className="gradient-text">protects an office that no longer exists</span>
              </>
            }
            description="The corporate network boundary is gone. Users work from home, branches, cafés and BYOD devices. Sensitive data lives in SaaS apps the firewall cannot see. SSE / SASE rebuilds the perimeter around the user, the device and the data, wherever they go."
            centered
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-border-light bg-surface-secondary p-8 sm:p-10"
            >
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                Without modern Workspace Protection
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-heading">
                VPN bottlenecks, SaaS blind spots, BYOD chaos
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-body">
                VPN concentrators groan under load. Internet-facing VPN gateways are scanned and exploited. SaaS traffic bypasses the firewall entirely. Contractors get full network access for one app. Personal ChatGPT pasted with corporate data. No one knows what apps are even in use.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "VPN trust assumes the device is the person",
                  "Firewall watches an empty corridor while users live in M365 / Salesforce",
                  "Contractors and BYOD users granted full network access for one SaaS app",
                  "Shadow AI: personal ChatGPT pasted with sensitive corporate data",
                  "Shadow IT: unsanctioned SaaS apps proliferating across departments",
                  "No visibility into which SaaS apps are misconfigured (public links, excessive sharing)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-body">
                    <span className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                      <AlertIcon className="h-2.5 w-2.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative overflow-hidden rounded-3xl border border-[#1B8AC7]/30 bg-gradient-to-br from-[#04101E] to-[#0A3D6B] p-8 text-white shadow-[0_20px_60px_rgba(27,138,199,0.25)] sm:p-10"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#1B8AC7]/20 blur-3xl" />

              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4FC3F7]">
                With modern SSE / SASE / CASB
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-white">
                Identity-based, cloud-delivered, BYOD-friendly
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                ZTNA replaces VPN with app-level access. CASB sees and controls every SaaS interaction. SWG and DNS security follow the user everywhere. Cloud DLP enforces consistent policy across web and SaaS. RBI isolates risky web destinations. SSPM keeps SaaS configurations from drifting.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "ZTNA: identity- and posture-based access to specific apps only",
                  "CASB: full visibility and control across sanctioned and unsanctioned SaaS",
                  "Cloud SWG and DNS protection follow the user on every device",
                  "Cloud DLP enforces consistent policy across web and SaaS",
                  "BYOD: agentless browser-based access for contractors and unmanaged devices",
                  "Shadow AI governance: personal ChatGPT and DeepSeek controlled at the browser",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#1B8AC7]/30 text-[#4FC3F7]">
                      <CheckIcon className="h-2.5 w-2.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur">
                <ShieldIcon className="h-5 w-5 text-[#4FC3F7]" />
                <p className="text-xs text-slate-300">
                  SSE / SASE rebuilds the perimeter around the user, not the office. The cloud is the new network.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* ───────── DISCOVERY CTA BAND ───────── */}
      {/* <section className="relative overflow-hidden bg-[#020617] py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(40,181,225,0.12),transparent_60%)]" />

        <div className="shell relative">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-10 lg:flex-row lg:items-center">
            <div className="flex items-start gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#28B5E1] to-[#045891]">
                <ShieldIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#4FC3F7]">
                  Free · Workspace Discovery · 60 minutes
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">
                  Where does your hybrid workforce actually leak data today?
                </h3>
                <p className="mt-2 max-w-xl text-sm text-slate-400">
                  We map your VPN posture, SaaS estate, BYOD / contractor surface and Shadow AI exposure against NESA, NCA ECC, ADHICS, SAMA and ISO 27001, then surface the three highest-impact controls to deploy first. No sales script.
                </p>
              </div>
            </div>

            <button
              onClick={openContact}
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#04101E] transition-all hover:bg-[#28B5E1] hover:text-white hover:shadow-[0_8px_32px_rgba(40,181,225,0.4)]"
            >
              Book a Workspace Discovery Call
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 transition-transform group-hover:translate-x-1">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </section> */}

      {/* ───────── FOUR DRIVERS ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            // label="Four Drivers"
            title={
              <>
                Why every UAE enterprise needs Workspace Protection,{" "}
                <span className="gradient-text">in four shifts</span>
              </>
            }
            description="The hybrid workforce, SaaS adoption, cloud data and Zero Trust have together made traditional VPN + firewall architectures obsolete. SSE / SASE is the answer to all four shifts in one cloud-delivered fabric."
            centered
          />

          <div className="mt-10 grid grid-cols-1 items-start gap-3 sm:mt-12 sm:gap-2 md:grid-cols-2 lg:grid-cols-4">
            {drivers.map((d, idx) => {
              const Icon = d.icon;
              const isOpen = openDriver === idx;
              return (
                <div
                  key={d.code}
                  tabIndex={0}
                  onMouseEnter={() => setOpenDriver(idx)}
                  onMouseLeave={() =>
                    setOpenDriver((prev) => (prev === idx ? null : prev))
                  }
                  onFocus={() => setOpenDriver(idx)}
                  onBlur={() =>
                    setOpenDriver((prev) => (prev === idx ? null : prev))
                  }
                  onClick={() =>
                    setOpenDriver((prev) => (prev === idx ? null : idx))
                  }
                  aria-expanded={isOpen}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white py-2 px-3 shadow-sm outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#28B5E1]/40 sm:py-3 sm:px-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#28B5E1]/10 text-[#1B8AC7]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-md font-semibold text-slate-900">
                      {d.title}
                    </h3>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="desc"
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm leading-relaxed text-slate-600">
                          {d.desc}
                        </p>
                        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                          {d.keywords}
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

      {/* ───────── EIGHT KEY CAPABILITIES ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Eight Key Capabilities"
            title={
              <>
                A complete SSE / SASE platform delivers{" "}
                <span className="gradient-text">eight cloud-native security functions</span>
              </>
            }
            description="ZTNA, CASB, SWG, FWaaS, Cloud DLP, Remote Browser Isolation, DNS Security and SaaS Security Posture Management. Leading vendors deliver some or all of these in a unified cloud-delivered service."
            centered
          />

          <div className="mt-10 grid grid-cols-1 items-start gap-3 sm:mt-12 sm:gap-2 md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c, idx) => {
              const Icon = c.icon;
              const isOpen = openCapability === idx;
              return (
                <div
                  key={c.code}
                  tabIndex={0}
                  onMouseEnter={() => setOpenCapability(idx)}
                  onMouseLeave={() =>
                    setOpenCapability((prev) => (prev === idx ? null : prev))
                  }
                  onFocus={() => setOpenCapability(idx)}
                  onBlur={() =>
                    setOpenCapability((prev) => (prev === idx ? null : prev))
                  }
                  onClick={() =>
                    setOpenCapability((prev) => (prev === idx ? null : idx))
                  }
                  aria-expanded={isOpen}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white py-2 px-3 shadow-sm outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#28B5E1]/40 sm:py-3 sm:px-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#28B5E1]/10 text-[#1B8AC7]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-md font-semibold text-slate-900">
                      {c.title}
                    </h3>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="desc"
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm leading-relaxed text-slate-600">
                          {c.desc}
                        </p>
                        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                          {c.keywords}
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

      {/* ───────── VENDOR COMPARISON MATRIX (STRATEGIC VIEW) ───────── */}
      <section id="vendor-matrix" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Compare Vendors</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Vendor comparison for <span className="gradient-text">Workspace Protection buyers</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              No single SSE / SASE platform wins everything. The right platform for your environment usually wins on your stack, your SaaS estate and the BYOD surface you have to defend. Artiflex suggests the solution that best fits your needs.
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
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + wspMatrixVendors.length * 116) }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-5 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">
                      Criteria
                    </th>
                    {wspMatrixVendors.map((v) => (
                      <th
                        key={v.name}
                        className={`border-l border-white/15 px-2 py-3 sm:px-4 sm:py-5 align-bottom ${v.recommended ? "bg-white/10" : ""}`}
                      >
                        {v.recommended && (
                          <span className="mb-1.5 inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300">
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
                  {wspMatrixRows.map((row, rIdx) => (
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
                              : `border-l border-[#0A3D6B]/20 text-slate-700 ${wspMatrixVendors[cIdx]?.recommended ? "bg-[#28B5E1]/[0.04]" : ""}`
                          }`}
                        >
                          {row.type === "stars" ? (
                            <div>
                              <span aria-label={`${(cell as WspStarCell).stars} out of 5`} className="text-amber-500">
                                {"★".repeat((cell as WspStarCell).stars)}
                                <span className="text-slate-300">
                                  {"★".repeat(5 - (cell as WspStarCell).stars)}
                                </span>
                              </span>
                              <p className="mt-1 text-xs leading-snug text-slate-600">
                                {(cell as WspStarCell).note}
                              </p>
                            </div>
                          ) : row.type === "verdict" ? (
                            <div className="space-y-1.5">
                              {(cell as WspVerdictCell).recommended && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                                  ✓ Recommended
                                </span>
                              )}
                              <p className="text-xs leading-relaxed text-slate-300">
                                {(cell as WspVerdictCell).text}
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

      {/* ───────── PICK THE PLATFORM (Vendor cards) ───────── */}
      <section
        id="vendor-comparison"
        className="relative bg-white py-16 scroll-mt-24 sm:py-24"
      >
        <div className="shell">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Detailed Comparison on Workspace Protection Vendors
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
              Talk to a Consultant
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
                  key={v.slug}
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
                    to={`/cybersecurity/workspace/${v.slug}`}
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
                          className="flex h-12 w-16 shrink-0 items-center justify-center rounded-lg text-sm font-bold uppercase tracking-wide text-white shadow-[0_4px_10px_-4px_rgba(15,23,42,0.4)]"
                          style={{ backgroundColor: v.accent }}
                        >
                          {v.name
                            .replace(/[^A-Za-z\s]/g, "")
                            .split(/\s+/)
                            .filter(Boolean)
                            .slice(0, 2)
                            .map((w) => w[0])
                            .join("")}
                        </span>
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

          {/* Partner positioning callout */}
          <div className="mx-auto mt-12 max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-br from-[#0A3D6B] via-[#04101E] to-[#020617] p-8 text-center shadow-xl shadow-[#1B8AC7]/10 sm:p-12">
            <p className="text-base leading-relaxed text-slate-300 sm:text-lg md:text-xl">
              <span className="font-semibold text-white">Artiflex IT is a Platinum Sophos Partner</span> and a delivery partner for Check Point Harmony SASE, Palo Alto Prisma Access, Netskope SSE and Microsoft Defender for Cloud Apps across the UAE and the wider GCC. <br />
              <span className="text-xs italic text-white sm:text-base">The vendor follows the assessment, not the other way around.</span>
            </p>
          </div>

          {/* Decisive advantages */}
          <div className="mx-auto mt-20 max-w-4xl text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Why each recommendation wins
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each top-tier SSE / SASE platform answers a different buying question. Pick the one whose decisive advantage maps to the workspace surface and operational appetite you actually have.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:mt-14 lg:grid-cols-3">
            {decisiveAdvantages.map((d, idx) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className="relative overflow-hidden rounded-2xl border border-border-light bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-[0_12px_40px_rgba(4,88,145,0.12)] sm:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-1 w-full"
                  style={{ backgroundColor: d.accent }}
                />
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
                  {d.tagline}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-heading sm:text-2xl">
                  {d.name}
                </h3>
                <ul className="mt-5 space-y-3">
                  {d.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-body">
                      <span
                        className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${d.accent}1A`, color: d.accent }}
                      >
                        <CheckIcon className="h-2.5 w-2.5" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── GARTNER-STYLE SCORECARD ───────── */}
      <section id="gartner-comparison" className="relative bg-slate-50 py-16 scroll-mt-20 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Gartner-style Review</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Gartner-style Capability Comparison</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each platform is rated across SSE / SASE / CASB capabilities using a standardised tier scale. A gold ★ marker denotes best-in-class performance for that specific capability.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)] sm:mt-16">
            <div className="overflow-x-auto lg:overflow-x-visible">
              <table className="w-full table-fixed border-collapse text-center text-sm lg:min-w-0">
                <colgroup>
                  <col className="w-[18%]" />
                  <col className="w-[16.4%]" />
                  <col className="w-[16.4%]" />
                  <col className="w-[16.4%]" />
                  <col className="w-[16.4%]" />
                  <col className="w-[16.4%]" />
                </colgroup>
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="bg-[#045891] px-3 py-5 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">
                      Capability
                    </th>
                    {wspCompareVendors.map((v, i) => (
                      <th
                        key={v}
                        className="border-l border-white/15 px-3 py-5 align-bottom font-display text-[13px] font-semibold leading-tight text-white sm:text-sm"
                      >
                        {v}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {wspFeatureRows.map((row, rIdx) => (
                    <tr
                      key={row.label}
                      className={`border-t border-[#0A3D6B]/20 transition-colors hover:bg-[#28B5E1]/[0.04] ${
                        rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                      }`}
                    >
                      <th
                        scope="row"
                        className={`px-3 py-4 align-middle font-display text-[13px] font-semibold leading-tight text-slate-900 sm:text-sm ${
                          rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"
                        }`}
                      >
                        {row.label}
                      </th>
                      {row.cells.map((cell, cIdx) => {
                        const t = wspTierStyles[cell.tier];
                        return (
                          <td
                            key={cIdx}
                            className="border-l border-[#0A3D6B]/20 px-2 py-3 sm:px-3 sm:py-4 align-middle"
                          >
                            <span
                              className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${t.bg} ${t.text}`}
                            >
                              {cell.tier === "best" && <span aria-hidden="true">★</span>}
                              {t.label}
                            </span>
                            {cell.note && (
                              <p className="mt-1.5 text-[11px] leading-snug text-slate-600">
                                {cell.note}
                              </p>
                            )}
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
            {(["best", "excellent", "veryStrong", "strong", "good", "moderate", "basic"] as WspTier[]).map((t) => {
              const s = wspTierStyles[t];
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

      {/* ───────── WHY SOPHOS WORKSPACE PROTECTION WINS (8 ADVANTAGES) ───────── */}
      <section className="relative bg-surface-secondary py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Why Sophos Workspace Protection wins on browser-native SSE
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Eight capabilities that separate Sophos Workspace Protection from the rest of the field. What each one means in plain terms for the buying decision, especially when Sophos Endpoint or Sophos Firewall are already in the estate.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-2">
            {sophosAdvantages.map((adv, idx) => (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
                className="relative overflow-hidden rounded-2xl border border-border-light bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(4,88,145,0.10)] sm:p-7"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-1 bg-[#1B8AC7]"
                />
                <div className="pl-2">
                  <h3 className="font-display text-lg font-bold text-heading sm:text-xl">
                    {adv.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">
                    {adv.meaning}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── BUYER'S DECISION GUIDE ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Decision Guide"
            title={
              <>
                Tell us what you said in the meeting,{" "}
                <span className="gradient-text">we will tell you what to buy</span>
              </>
            }
            description="The shortest path from buying signal to SSE / SASE / CASB vendor pick. Each row maps a real procurement conversation to the platform that solves it best for UAE and regional buyers."
            centered
          />

          <div className="mt-12 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)] sm:mt-16">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + buyerDecisionGuide.length * 116) }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="w-[44%] px-5 py-5 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">
                      If the buyer says...
                    </th>
                    <th className="border-l border-white/15 px-5 py-5 align-bottom font-display text-sm font-semibold text-white sm:text-base">
                      Recommend
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {buyerDecisionGuide.map((row, rIdx) => (
                    <tr
                      key={row.says}
                      className={`border-t border-[#0A3D6B]/20 transition-colors hover:bg-[#28B5E1]/[0.04] ${
                        rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                      }`}
                    >
                      <td className="px-5 py-4 align-middle">
                        <p className="font-display text-sm leading-relaxed text-slate-900 sm:text-base">
                          &ldquo;{row.says}&rdquo;
                        </p>
                      </td>
                      <td className="border-l border-[#0A3D6B]/20 px-2 py-3 sm:px-5 sm:py-4 align-middle">
                        <p className="font-display text-sm font-semibold text-[#045891] sm:text-base">
                          {row.recommend}
                        </p>
                        <p className="mt-1 text-xs leading-snug text-slate-600">
                          {row.rationale}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-slate-500">
            Not sure which conversation you are in? Book a 60-minute Workspace scoping call and we will map your VPN posture, SaaS estate, BYOD surface and audit obligations to the right SSE / SASE / CASB stack.
          </p>
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
            description="We don't sell licences. We deliver SSE / SASE outcomes: assess, design, deploy, manage. Every stage produces something an auditor can read and a CFO can sign off on."
            centered
          />

          <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-4">
            {[
              {
                title: "Assess",
                duration: "2 weeks",
                summary:
                  "VPN posture review, SaaS estate discovery, BYOD and contractor surface mapping, Shadow IT / Shadow AI exposure, and identity readiness.",
                deliverable:
                  "Current-state report, platform recommendation with rationale, three-year TCO comparison.",
              },
              {
                title: "Design",
                duration: "2–3 weeks",
                summary:
                  "Architecture for your environment: ZTNA app-onboarding plan, CASB policy framework, SWG and DNS rulesets, Cloud DLP classification, SaaS connectors, SIEM / MDR integration.",
                deliverable:
                  "Approved architecture, phased rollout sequence, change-management plan.",
              },
              {
                title: "Deploy",
                duration: "2–6 weeks",
                summary:
                  "Wave-based rollout starting with a 100-500 user pilot. Protected Browser and connector deployment, ZTNA app cutover, policy tuning, day-1 hypercare.",
                deliverable:
                  "Live SSE / SASE platform, audit-ready documentation, runbooks for your team.",
              },
              {
                title: "Manage",
                duration: "Ongoing",
                summary:
                  "24/7 monitoring, ZTNA app-onboarding pipeline, CASB and DLP policy authoring, SWG tuning, SaaS posture management, monthly board-readable reporting, quarterly architecture reviews.",
                deliverable:
                  "Operational SSE / SASE with SLAs you can actually rely on. Or a clean handover to your team.",
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
                <div className="flex items-baseline justify-end">
                  <span className="rounded-full border border-border-light bg-surface-secondary px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                    {s.duration}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-heading">
                  {s.title}
                </h3>
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
              14+ years of UAE security delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when Sophos wins, when Check Point wins, when Palo Alto wins, when Netskope or Microsoft is the better fit, and when none of them is the right answer. The point of an honest assessment is honest answers.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years in UAE security" },
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
                  Sophos (Platinum), Check Point Harmony SASE, Palo Alto Prisma Access, Netskope SSE, Microsoft Defender for Cloud Apps: active delivery experience across all five.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Compliance frameworks
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  NESA, NCA ECC, ADHICS, CBUAE, SAMA, ISO 27001, PDPL and Cyber Essentials, with audit-ready evidence delivered as part of the project.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Coverage area
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  On-site across Dubai, Abu Dhabi, and Sharjah. Remote across the UAE, Oman, and Saudi Arabia. 24/7 SOC support for managed customers.
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
              Book a free workspace posture assessment
            </Link>
            <Link
              to="/blog/origin-workspace-protection-sse-sase"
              className="inline-flex items-center justify-center rounded-lg border border-white/15 px-6 py-3 font-display text-sm font-medium text-slate-300 transition-colors hover:border-[#28B5E1]/40 hover:text-white sm:text-base"
            >
              Read the full origin story →
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Knowledge Base"
            title={
              <>
                Frequently <span className="gradient-text">asked</span> questions
              </>
            }
            description="What businesses ask us most about SSE, SASE, CASB and Zero Trust workspace protection."
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

      {/* ───────── FINAL CTA ───────── */}
      <CTASection
        title="The corporate network is gone. Rebuild the perimeter around the user."
        description="Modern Workspace Protection is identity-based, cloud-delivered and BYOD-friendly. Talk to an Artiflex IT specialist about Sophos Workspace Protection, Check Point Harmony SASE, Palo Alto Prisma Access, Netskope SSE and Microsoft Defender for Cloud Apps for the UAE and the wider GCC."
        primaryButton={{ text: "Book a Workspace Discovery Call", action: "modal" }}
      />
    </>
  );
}
