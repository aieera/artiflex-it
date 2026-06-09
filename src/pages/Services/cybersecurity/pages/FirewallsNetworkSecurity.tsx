import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import {
  ShieldIcon,
  ServerIcon,
  LayersIcon,
  AlertTriangleIcon,
  EyeIcon,
  CloudIcon,
  LockIcon,
} from "@/components/icons";
import { firewallVendorList } from "../data/firewallVendors";

/* ───────── FIREWALL JOB CARD: exclusive expand (only one open at a time) ───────── */

function FirewallJobCard({
  icon: Icon,
  title,
  desc,
  span,
  isOpen,
  onActivate,
  onDeactivate,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  span: string;
  isOpen: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      onClick={() => (isOpen ? onDeactivate() : onActivate())}
      tabIndex={0}
      aria-expanded={isOpen}
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-md border border-slate-200/80 bg-gradient-to-br from-white via-white to-slate-50/60 shadow-[0_1px_2px_rgba(15,23,42,0.04)] outline-none transition-all duration-500 hover:-translate-y-0.5 hover:border-[#1B8AC7]/45 hover:shadow-[0_18px_40px_-12px_rgba(27,138,199,0.30)] focus-visible:border-[#1B8AC7]/60 focus-visible:ring-2 focus-visible:ring-[#28B5E1]/40 ${span}`}
    >
      <div className="relative z-[2] flex w-full items-start justify-between gap-3 p-5 sm:p-6">
        <div className="flex min-w-0 flex-1 items-start gap-4">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
              isOpen
                ? "bg-[#1B8AC7] text-white"
                : "bg-[#28B5E1]/10 text-[#1B8AC7]"
            }`}
          >
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="mt-1 font-display text-base font-bold leading-snug text-[#0a1d3a] sm:text-[17px] md:text-lg">
            {title}
          </h3>
        </div>

        {/* Indicator: plus rotates to × when expanded */}
        <span
          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            isOpen
              ? "rotate-45 border-[#1B8AC7] bg-[#1B8AC7] text-white"
              : "border-slate-300 text-slate-500 group-hover:border-[#1B8AC7] group-hover:text-[#1B8AC7]"
          }`}
          aria-hidden="true"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-[2] overflow-hidden"
          >
            <div className="px-5 pb-5 sm:px-6 sm:pb-6">
              <div className="border-t border-slate-200 pt-4">
                <p className="text-sm leading-relaxed text-slate-600">{desc}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated bottom rule */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-[#1B8AC7] via-[#28B5E1] to-transparent transition-all duration-700 ease-out group-hover:w-full"
      />
      {/* Corner glow on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#28B5E1]/30 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />
    </motion.article>
  );
}

/* ───────── EVOLUTION ───────── */

const evolution = [
  {
    title: "Gen 1 - Packet Filtering",
    desc: "Stateless IP/port rules pioneered at DEC in 1988. Fast, but blind to context.",
  },
  {
    title: "Gen 2 - Stateful Inspection",
    desc: "Check Point's FireWall-1 (1993) tracked entire TCP conversations, not just isolated packets.",
  },
  {
    title: "Gen 3 - Application Layer",
    desc: "Deep inspection of HTTP, FTP, SMTP - detecting threats hidden inside legitimate protocols.",
  },
  {
    title: "UTM - Unified Threat Management",
    desc: "One appliance for firewall, VPN, IPS, anti-malware, web filtering - ideal for SMB simplicity.",
  },
  {
    title: "NGFW - Next-Generation Firewall",
    desc: "Palo Alto's 2007 breakthrough: App-ID, User-ID, Content-ID. 80% of modern attacks targeted.",
  },
  {
    title: "FWaaS - Cloud-Native Firewalls",
    desc: "Firewall as a service inside SASE - protecting distributed workforces without hardware.",
  },
];

/* ───────── FIREWALL TYPES ───────── */

const firewallTypes = [
  {
    tag: "GEN 1",
    icon: LayersIcon,
    title: "Packet Filtering",
    desc: "Static IP and port rules.",
    details:
      "Checks IP addresses and ports against static rules. Fast but limited - no memory of previous packets. Still used as the first layer in most modern network security tools.",
  },
  {
    tag: "GEN 2",
    icon: ServerIcon,
    title: "Stateful Inspection",
    desc: "Tracks TCP/UDP sessions.",
    details:
      "Tracks TCP/UDP sessions and knows if a packet belongs to a legitimate conversation. Check Point's bread and butter for over a decade.",
  },
  {
    tag: "GEN 3",
    icon: EyeIcon,
    title: "Application-Aware / NGFW",
    desc: "Layer 7 inspection with App-ID.",
    details:
      "Inspects at the application layer. Identifies specific apps regardless of port. Can block Tor, detect encrypted malware, and enforce user-based policies. The standard for enterprise network security solutions today.",
  },
  {
    tag: "UTM",
    icon: ShieldIcon,
    title: "Unified Threat Management",
    desc: "All-in-one security box.",
    details:
      "Combines firewall, VPN, IPS, antivirus, anti-spam, and web filtering in one appliance. Ideal for SMBs that need a single box to handle everything. The classic firewall vs UTM debate usually comes down to scale and complexity.",
  },
  {
    tag: "FWaaS",
    icon: CloudIcon,
    title: "Cloud-Native Firewall",
    desc: "Delivered as a cloud service.",
    details:
      "Firewall delivered as a cloud service. No hardware to manage. Integrates with SASE architectures. Growing fast as organisations adopt remote and hybrid work.",
  },
  {
    tag: "IDS/IPS",
    icon: AlertTriangleIcon,
    title: "Intrusion Prevention",
    desc: "Partner to every modern firewall.",
    details:
      "Monitors traffic for port scans, SQL injection, exfiltration patterns. IPS actively blocks in real time. Built into most NGFWs - a red flag if yours doesn't include it.",
  },
];

/* ───────── VENDOR COMPARISON ───────── */

const vendors = [
  {
    slug: "sophos-xgs",
    name: "Sophos XGS",
    best: "Best Overall Value (Recommended)",
    strength: "Astaro German UTM heritage + Cyberoam Layer 8 identity policy + Xstream line-rate TLS 1.3 + Synchronized Security automation. Sophos Central single-pane management.",
    watch: "Less suited for hyperscale 10K+ user environments where Check Point Quantum or Palo Alto wins outright.",
    accent: "#1565A0",
    logo: "/logos/sophos.svg",
  },
  {
    slug: "check-point-quantum",
    name: "Check Point Quantum",
    best: "Best for Large Enterprise (Recommended)",
    strength: "Invented stateful inspection in 1993. ThreatCloud AI (86 engines, 3B txn/day) delivers 99.9%+ prevention. Quantum Lightspeed up to 3 Tbps. SmartConsole policy consistency across the entire fabric.",
    watch: "Premium positioning; not the lowest-TCO option for SMB.",
    accent: "#4FC3F7",
    logo: "/logos/Check-Point-2024-logo-color.svg",
  },
  {
    slug: "palo-alto-networks",
    name: "Palo Alto PA-Series",
    best: "Enterprise Innovator (Recommended)",
    strength: "Invented the NGFW (Nir Zuk). App-ID, WildFire (85K+ sensors), world's first ML-powered NGFW. Prisma Access SASE + Cortex XDR. Magic Quadrant Leader for over a decade.",
    watch: "Premium pricing, typically 40-60% more than Sophos or Check Point for equivalent deployment.",
    accent: "#1B8AC7",
    logo: "/logos/PaloAltoNetworks.svg",
  },
  {
    slug: "cisco-secure-firewall",
    name: "Cisco Secure Firewall",
    best: "Best for Cisco-Standardised Enterprise",
    strength: "Talos threat intel (350+ researchers, 1.5M malware samples/day). Encrypted Traffic Analytics detects malware in HTTPS without decryption. Snort 3 IPS. Native Cisco Security Cloud integration.",
    watch: "FMC (Firepower Management Centre) requires expert operators; learning curve steeper than Sophos Central.",
    accent: "#0A3D6B",
    logo: "/logos/Cisco.svg",
  },
  {
    slug: "fortinet-fortigate",
    name: "Fortinet FortiGate",
    best: "Best Throughput-per-Dollar",
    strength: "Custom NP7 ASICs deliver up to 1.2 Tbps. Native SD-WAN built into FortiOS at no extra cost. Security Fabric integrates with 50+ Fortinet products. Best raw performance/$ in market.",
    watch: "FortiManager has a steeper learning curve than Sophos Central or Check Point SmartConsole; some configurations require CLI.",
    accent: "#28B5E1",
    logo: "/logos/Fortinet.svg",
  },
  {
    slug: "sonicwall",
    name: "SonicWall TZ and NSa",
    best: "SMB Champion",
    strength: "RTDMI engine detects encrypted malware in processor memory. TZ Series zero-touch provisioning lets non-technical staff deploy in minutes. Strong cost-per-Mbps for small UAE branches.",
    watch: "NSM management portal less intuitive for multi-site deployments. Recent vendor security incidents worth weighing in vendor-risk assessment.",
    accent: "#045891",
    logo: "/logos/SonicWall.svg",
  },
];

/* ───────── VENDOR MATRIX (financial, strategic, management view) ───────── */

const matrixVendors = [
  { name: "Sophos XGS", recommended: true },
  { name: "Check Point Quantum", recommended: true },
  { name: "Palo Alto PA-Series", recommended: true },
  { name: "Cisco Secure Firewall" },
  { name: "Fortinet FortiGate" },
  { name: "SonicWall TZ and NSa" },
];

type StarCell = { stars: number; note: string };
type VerdictCell = { recommended?: boolean; rank?: string; text: string };
type MatrixRow =
  | { label: string; type: "text"; cells: string[] }
  | { label: string; type: "stars"; cells: StarCell[] }
  | { label: string; type: "verdict"; cells: VerdictCell[] };

const matrixRows: MatrixRow[] = [
  {
    label: "Founded / Heritage",
    type: "text",
    cells: [
      "1985 AV + Astaro 2000 UTM + Cyberoam 1999 Layer 8",
      "1993, invented stateful inspection",
      "2005, invented NGFW (Nir Zuk)",
      "1984, world's largest networking co.",
      "2000, ASIC-powered UTM/NGFW",
      "1991, SMB firewall pioneer",
    ],
  },
  {
    label: "Total Cost of Ownership",
    type: "stars",
    cells: [
      { stars: 5, note: "Best TCO in class" },
      { stars: 4, note: "Strong enterprise value" },
      { stars: 3, note: "Premium, reflects innovation" },
      { stars: 3, note: "Competitive for Cisco ecosystems" },
      { stars: 4, note: "Competitive, best $/Gbps" },
      { stars: 5, note: "Best value for SMB" },
    ],
  },
  {
    label: "Ease of Management",
    type: "stars",
    cells: [
      { stars: 5, note: "Sophos Central, cloud single console" },
      { stars: 5, note: "SmartConsole, best enterprise UX" },
      { stars: 4, note: "Panorama, powerful & improving" },
      { stars: 3, note: "FMC, robust, expert required" },
      { stars: 3, note: "FortiManager, capable but complex" },
      { stars: 3, note: "NSM, adequate for SMB" },
    ],
  },
  {
    label: "Threat Intelligence",
    type: "stars",
    cells: [
      { stars: 5, note: "SophosLabs + X-Ops + Secureworks CTU" },
      { stars: 5, note: "ThreatCloud AI: 86 AI engines" },
      { stars: 5, note: "WildFire + Unit 42 research" },
      { stars: 5, note: "Talos: 350+ researchers" },
      { stars: 4, note: "FortiGuard Labs, strong" },
      { stars: 4, note: "RTDMI strong detection" },
    ],
  },
  {
    label: "SSL / Encrypted Traffic",
    type: "stars",
    cells: [
      { stars: 5, note: "TLS 1.3 at line rate (Xstream)" },
      { stars: 5, note: "Full SSL inspection" },
      { stars: 5, note: "Full SSL + ML-powered" },
      { stars: 5, note: "SSL + ETA (no-decrypt detection)" },
      { stars: 4, note: "SSL inspection, good" },
      { stars: 4, note: "SSL inspection" },
    ],
  },
  {
    label: "Endpoint Integration (XDR)",
    type: "stars",
    cells: [
      { stars: 5, note: "Synchronized Security: unique" },
      { stars: 5, note: "Infinity XDR: unified" },
      { stars: 5, note: "Cortex XDR: industry-leading" },
      { stars: 5, note: "Cisco XDR + SecureX" },
      { stars: 4, note: "FortiEDR Security Fabric" },
      { stars: 3, note: "Capture Client EDR" },
    ],
  },
  {
    label: "Cloud & Hybrid Support",
    type: "stars",
    cells: [
      { stars: 5, note: "AWS, Azure, GCP + Sophos Central" },
      { stars: 5, note: "CloudGuard auto-scaling" },
      { stars: 5, note: "Prisma Cloud: market leader" },
      { stars: 5, note: "Multicloud Defence: all clouds" },
      { stars: 4, note: "FortiGate VM, strong" },
      { stars: 3, note: "Cloud NGFW, limited" },
    ],
  },
  {
    label: "SD-WAN",
    type: "stars",
    cells: [
      { stars: 4, note: "Built-in, no extra cost" },
      { stars: 4, note: "Harmony SASE / Quantum SD-WAN" },
      { stars: 3, note: "Prisma SD-WAN (separate)" },
      { stars: 3, note: "Catalyst SD-WAN (separate)" },
      { stars: 5, note: "Best native SD-WAN in class" },
      { stars: 3, note: "SD-Branch, basic" },
    ],
  },
  {
    label: "Vendor Stability",
    type: "stars",
    cells: [
      { stars: 5, note: "Thoma Bravo, USD 3.9B backed" },
      { stars: 5, note: "NYSE: CHKP, 30+ yrs profitable" },
      { stars: 5, note: "NASDAQ: PANW, rapid growth" },
      { stars: 5, note: "NASDAQ: CSCO, USD 50B+ revenue" },
      { stars: 5, note: "Largest pure-play security vendor" },
      { stars: 3, note: "Private, some risk concerns" },
    ],
  },
  {
    label: "Best Suited For",
    type: "text",
    cells: [
      "All sizes, SMB to enterprise",
      "Large enterprise & critical infra",
      "Enterprise: maximum NGFW capability",
      "Cisco-standardised enterprise",
      "High-throughput & SD-WAN focus",
      "SMB & branch offices",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      { recommended: true, text: "Best TCO, simplest management, Synchronized Security. Astaro + Cyberoam heritage." },
      { recommended: true, text: "Invented stateful inspection. 99.9% prevention rate. Hyperscale to branch." },
      { recommended: true, text: "Invented NGFW. ML-powered. WildFire + Cortex XDR. Best cutting-edge enterprise." },
      { text: "Talos intel, ETA, Snort 3, full Cisco integration. Best for Cisco-standardised enterprise." },
      { text: "Strong performer. Best throughput per dollar and SD-WAN. Excellent for bandwidth-heavy deployments." },
      { text: "SMB champion. Best cost-per-performance for small business." },
    ],
  },
];

/* ───────── FEATURE RATINGS (Gartner-style) ───────── */

const featureVendors = [
  "Sophos XGS",
  "Check Point Quantum",
  "Palo Alto PA-Series",
  "Cisco Secure Firewall",
  "Fortinet FortiGate",
  "SonicWall TZ and NSa",
];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "Application Visibility & Control",
    cells: [
      { tier: "excellent", note: "Xstream App Control" },
      { tier: "excellent", note: "ThreatCloud App-ID" },
      { tier: "best", note: "App-ID, invented this category" },
      { tier: "veryStrong", note: "NGFW AVC engine" },
      { tier: "veryStrong", note: "FortiGuard App Control" },
      { tier: "strong", note: "App Control via SonicOS" },
    ],
  },
  {
    label: "Threat Prevention (IPS / AV)",
    cells: [
      { tier: "best", note: "SophosLabs + X-Ops + CTU" },
      { tier: "best", note: "ThreatCloud AI 86 engines" },
      { tier: "excellent", note: "WildFire + Unit 42" },
      { tier: "excellent", note: "Talos: 350+ researchers" },
      { tier: "veryStrong", note: "FortiGuard Labs" },
      { tier: "veryStrong", note: "RTDMI + Capture ATP sandbox" },
    ],
  },
  {
    label: "SSL / TLS Inspection",
    cells: [
      { tier: "best", note: "TLS 1.3 zero performance loss" },
      { tier: "excellent", note: "Full SSL inspection" },
      { tier: "excellent", note: "Full SSL + ML detection" },
      { tier: "best", note: "SSL + ETA (no-decrypt)" },
      { tier: "veryStrong", note: "SSL Deep Inspection" },
      { tier: "strong", note: "DPI-SSL inspection" },
    ],
  },
  {
    label: "Ease of Management",
    cells: [
      { tier: "best", note: "Sophos Central, cloud console" },
      { tier: "excellent", note: "SmartConsole, best enterprise UX" },
      { tier: "strong", note: "Panorama, powerful, expert needed" },
      { tier: "moderate", note: "FMC, complex, training required" },
      { tier: "good", note: "FortiManager, capable but complex" },
      { tier: "good", note: "SonicOS + NSM cloud manager" },
    ],
  },
  {
    label: "Endpoint Integration (XDR)",
    cells: [
      { tier: "best", note: "Synchronized Security, unique auto-response" },
      { tier: "excellent", note: "Infinity XDR, all layers unified" },
      { tier: "excellent", note: "Cortex XDR, industry-leading" },
      { tier: "excellent", note: "Cisco XDR + SecureX" },
      { tier: "veryStrong", note: "FortiEDR Security Fabric" },
      { tier: "good", note: "Capture Client (SentinelOne OEM)" },
    ],
  },
  {
    label: "Cloud & Multi-Cloud Support",
    cells: [
      { tier: "excellent", note: "AWS, Azure, GCP + Sophos Central" },
      { tier: "excellent", note: "CloudGuard auto-scaling NGFW" },
      { tier: "best", note: "Prisma Cloud, market leader" },
      { tier: "excellent", note: "Multicloud Defence, all clouds" },
      { tier: "veryStrong", note: "FortiGate VM, strong" },
      { tier: "good", note: "NSv virtual firewall on major clouds" },
    ],
  },
  {
    label: "SD-WAN Capability",
    cells: [
      { tier: "strong", note: "Built-in, no extra cost" },
      { tier: "strong", note: "Harmony SASE / Quantum SD-WAN" },
      { tier: "moderate", note: "Prisma SD-WAN, separate product" },
      { tier: "moderate", note: "Catalyst SD-WAN, separate" },
      { tier: "best", note: "Best native SD-WAN in class" },
      { tier: "strong", note: "Built-in SD-WAN, no extra licence" },
    ],
  },
  {
    label: "ZTNA / Remote Access",
    cells: [
      { tier: "excellent", note: "Sophos Workspace Protection bundle" },
      { tier: "excellent", note: "Harmony ZTNA, enterprise grade" },
      { tier: "best", note: "Prisma Access ZTNA, market leader" },
      { tier: "veryStrong", note: "Duo + Secure Client ZTNA" },
      { tier: "veryStrong", note: "FortiZTNA, solid" },
      { tier: "good", note: "Cloud Secure Edge / SMA" },
    ],
  },
  {
    label: "Total Cost of Ownership",
    cells: [
      { tier: "best", note: "Best TCO, all-inclusive licensing" },
      { tier: "excellent", note: "Strong enterprise value" },
      { tier: "moderate", note: "Premium pricing, subscription-heavy" },
      { tier: "good", note: "Competitive for Cisco ecosystems" },
      { tier: "excellent", note: "Best throughput per dollar" },
      { tier: "veryStrong", note: "Aggressive SMB / mid-market pricing" },
    ],
  },
  {
    label: "Vendor Support & CSAT",
    cells: [
      { tier: "best", note: "Gartner Peer Insights 4.7/5" },
      { tier: "excellent", note: "Dedicated TAM for enterprise" },
      { tier: "good", note: "Variable, premium tiers needed" },
      { tier: "good", note: "TAC available, variable quality" },
      { tier: "excellent", note: "FortiCare, comprehensive" },
      { tier: "good", note: "SonicWall support, varies by tier" },
    ],
  },
];

const tierStyles: Record<Tier, { bg: string; text: string; label: string }> = {
  best: { bg: "bg-emerald-600", text: "text-white", label: "Best in class" },
  excellent: { bg: "bg-emerald-500", text: "text-white", label: "Excellent" },
  veryStrong: { bg: "bg-emerald-200", text: "text-emerald-900", label: "Very strong" },
  strong: { bg: "bg-amber-200", text: "text-amber-900", label: "Strong" },
  good: { bg: "bg-amber-100", text: "text-amber-900", label: "Good" },
  moderate: { bg: "bg-amber-100", text: "text-amber-900", label: "Moderate" },
};

/* ───────── SEGMENTATION ZONES ───────── */

const segments = [
  { label: "Perimeter", note: "NGFW + IPS", tone: "from-[#28B5E1] to-[#1B8AC7]" },
  { label: "DMZ", note: "Public services", tone: "from-[#1B8AC7] to-[#0A3D6B]" },
  { label: "Corporate VLAN", note: "Staff + policy", tone: "from-[#0A3D6B] to-[#04101E]" },
  { label: "Finance VLAN", note: "Restricted access", tone: "from-[#1565A0] to-[#0A3D6B]" },
  { label: "IoT / OT", note: "Isolated network", tone: "from-[#4FC3F7] to-[#1B8AC7]" },
  { label: "Data Core", note: "Crown-jewel tier", tone: "from-[#045891] to-[#020617]" },
];

/* ───────── MANAGED PILLARS ───────── */

const managedPillars = [
  {
    title: "24/7 Monitoring",
    desc: "Real-time rule alerts, anomaly detection, and escalation before an attacker lands.",
  },
  {
    title: "Firmware Patching",
    desc: "Critical CVEs patched within hours of vendor release - not weeks.",
  },
  {
    title: "Quarterly Rule Audits",
    desc: "Dead rules pruned, overly broad policies tightened, logs reviewed for drift.",
  },
  {
    title: "Change Management",
    desc: "Versioned policy history, approvals, rollback - no more rogue rules on a Friday.",
  },
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "What firewall do you recommend for a UAE mid-market business?",
    answer:
      "For most UAE mid-market environments, the Sophos XGS Firewall delivers the best total cost of ownership, simplest management via Sophos Central, and unique Synchronized Security automation between firewall and endpoint. Artiflex IT is a Sophos Platinum Partner. That said, the right answer depends on your existing stack, throughput envelope, operational capacity, and compliance posture; we assess this against NESA, UAE PDPL, and ISO 27001 before recommending.",
  },
  {
    question: "Is Artiflex IT vendor-locked to Sophos?",
    answer:
      "No. We are a Sophos Platinum Partner because we have deep XGS deployment experience and Sophos wins for the majority of UAE SMB and mid-market customers. We also actively deliver Check Point Quantum, Palo Alto Networks, Cisco Secure Firewall, Fortinet FortiGate, and SonicWall. The vendor follows the assessment, not the other way around.",
  },
  {
    question: "Can a NGFW replace a UTM?",
    answer:
      "A modern NGFW like Sophos XGS or Palo Alto delivers everything a UTM did (firewall, IPS, antivirus gateway, web filtering, application control), with the addition of identity-based policy (User-ID), deep application visibility (App-ID), TLS 1.3 decryption, and ML-powered threat detection. NGFW is effectively the evolution of UTM. If you are running a 5+ year old UTM, an NGFW migration usually pays for itself within 18 months through prevented incidents and consolidated licensing.",
  },
  {
    question: "Do your firewall deployments cover NESA and UAE PDPL?",
    answer:
      "Yes. Every firewall design we deliver maps to a control framework: NESA, UAE PDPL, ISO 27001, NIST CSF 2.0, or CBUAE-specific requirements as applicable. Audit-ready evidence (policy documentation, log retention, incident-response runbooks, and configuration baselines) is delivered as part of the project, not as a follow-up engagement.",
  },
  {
    question: "How long does a typical firewall deployment take in the UAE?",
    answer:
      "A single-site SMB deployment is typically 1–2 weeks end-to-end including assessment. A multi-site UAE enterprise migration with HA pairs, SD-WAN integration, and full SSL inspection is typically 6–10 weeks. Hyperscale or sovereign-infrastructure projects are scoped individually. Every deployment includes phased cutover with rollback procedures at each stage.",
  },
  {
    question: "Do you offer managed firewall services in Dubai and across the UAE?",
    answer:
      "Yes. We deliver fully-managed firewall services across all six vendors above: 24/7 monitoring, policy change management, firmware lifecycle, threat-intelligence tuning, monthly board-readable reporting, and quarterly architecture reviews. On-site support across Dubai, Abu Dhabi, and Sharjah; remote coverage across the UAE, Oman, and Saudi Arabia.",
  },
  {
    question: "What is a next-generation firewall (NGFW)?",
    answer:
      "A next-generation firewall combines traditional stateful inspection with Application-ID (identifying any application regardless of port, protocol, or encryption), User-ID (identity-based policy), Content-ID (deep content inspection), integrated IPS, SSL/TLS decryption, and threat-intelligence feeds. Unlike a legacy port-and-protocol firewall, an NGFW can distinguish a legitimate SaaS application from malware using the same port. This is why 80% of modern attacks need Layer 7 inspection to catch.",
  },
  {
    question: "Fortinet vs Sophos: which wins for UAE mid-market?",
    answer:
      "Sophos XGS wins on TCO, single-pane Sophos Central management, identity-based policy out of the box, and the unique Synchronized Security automation with Sophos endpoints. Fortinet FortiGate wins on raw throughput-per-dollar and built-in SD-WAN, preferable if your priority is bandwidth-heavy WAN modernisation. For most UAE mid-market businesses without a dedicated firewall team, Sophos is the simpler, better-supported choice.",
  },
  {
    question: "Check Point vs Palo Alto: which wins for UAE enterprise?",
    answer:
      "Check Point wins on policy consistency at hyperscale (SmartConsole, Quantum Lightspeed up to 3 Tbps), independent prevention-rate scores (99.9%+ unknown malware), and regulated-industry maturity. Banking, government, and CBUAE-regulated environments lean Check Point. Palo Alto ships innovation faster, has a stronger cloud-native / Prisma SASE story, and integrates more deeply with Cortex XDR. If your roadmap is cloud-heavy, Palo Alto; if your roadmap is audit-heavy and on-premise, Check Point.",
  },
  {
    question: "How often should firewall rules be audited?",
    answer:
      "Firmware and signature updates apply continuously, with critical CVEs patched within 24 hours of vendor release. Rule-set audits should happen quarterly at minimum: prune dead rules, tighten overly broad any-any policies, and review logs for drift. Major policy reviews align with quarterly business-change cycles. Running the same rule set for more than 12 months without review is one of the most common findings in our UAE network security assessments.",
  },
];

/* ───────── HERO ───────── */

function FirewallHero() {
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
                <span className="font-medium text-[#28B5E1]">Firewalls & Network Security</span>
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
            Firewall Solutions{" "}
            <span className="gradient-text">UAE</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              NGFW, UTM &amp; Managed Firewall Services
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Artiflex IT designs, deploys, and manages enterprise firewalls across the UAE, Oman, and Saudi Arabia. <span className="font-semibold text-white">Sophos Platinum Partner</span>, stragetic partnership with Checkpoint and Palo Alto Networks. Artiflex also works on solutions like Cisco, SonicWall and Fortinet. So the conversation really starts with your environment, your expectation and budget allocated for the solution.
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
              Get a Free Firewall Assessment
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

export default function FirewallsNetworkSecurityPage() {
  const [openType, setOpenType] = useState<number | null>(0);
  const [activeVendor, setActiveVendor] = useState(0);
  const [openJob, setOpenJob] = useState<number | null>(null);
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Firewall Solutions UAE | NGFW & Managed | Artiflex IT</title>
        <meta
          name="description"
          content="Compare NGFW, UTM & managed firewalls for UAE enterprises. Fortinet, Palo Alto, Sophos. Firewall installation Dubai - free network assessment."
        />
        <link rel="canonical" href="https://artiflexit.com/cybersecurity/firewalls-network-security" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Artiflex IT",
            "url": "https://artiflexit.com/cybersecurity/firewalls-network-security",
            "areaServed": [
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "City", "name": "Dubai" },
              { "@type": "City", "name": "Abu Dhabi" },
            ],
            "description": "Enterprise firewall services in the UAE - NGFW, UTM, and managed firewall deployments for Fortinet, Palo Alto Networks, Check Point, Cisco, and Sophos.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Managed Firewall Services",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description": "Managed firewall services UAE - 24/7 monitoring, rule audits, firmware patching, and change control for Fortinet, Palo Alto, Sophos, Check Point, and Cisco NGFW deployments. Typical deployment lead time 2–4 weeks.",
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
        {/* ItemList schema enumerating recommended firewall vendors,
            helps Google understand the comparison content on this page */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Recommended Firewall Vendors for UAE Businesses",
            "itemListElement": vendors.map((v, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <FirewallHero />

      {/* ───────── FIREWALL VENDORS WE DELIVER (HONEYCOMB) ───────── */}
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
              Firewall{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Vendors
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The platforms we design, deploy and manage across UAE environments. The conversation starts with your traffic, applications and compliance posture, not a SKU.
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
                layouts[firewallVendorList.length] ??
                [Math.ceil(firewallVendorList.length / 2), Math.floor(firewallVendorList.length / 2)];
              const rows: typeof firewallVendorList[] = [];
              let i = 0;
              sizes.forEach((s) => {
                rows.push(firewallVendorList.slice(i, i + s));
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
                      to={`/cybersecurity/firewalls/${v.slug}`}
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
                        <img
                          src={v.logo}
                          alt=""
                          loading="lazy"
                          className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              ));
            })()}
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:hidden">
            {firewallVendorList.map((v) => (
              <Link
                key={v.slug}
                to={`/cybersecurity/firewalls/${v.slug}`}
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
              {firewallVendorList.length} platforms
            </span>
            , picked by your traffic and policy.
          </p>
        </div>
      </section>

      {/* ───────── INTRO: WHAT A 2026 FIREWALL ACTUALLY HAS TO DO ───────── */}
      {/* <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-28">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(27,138,199,0.08),transparent_55%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(40,181,225,0.05),transparent_60%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:60px_60px]"
        />

        <div className="shell relative">
          {/* Heading block */}
          {/* <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto max-w-5xl text-center"
          >
            <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-3xl md:text-4xl lg:text-[3.0rem]">
              What a Next Generation Firewall{" "}
              <span className="gradient-text italic">actually</span> has to do
            </h2>
          </motion.div> */}

          {/* Body: 5 cards mapped to the 5 jobs a 2026 firewall must do */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="mx-auto mt-12 grid max-w-5xl items-start gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-12"
          >
            {[
              {
                icon: ShieldIcon,
                title: "Block known threats at every boundary",
                desc: "Ransomware, phishing payloads, and command-and-control traffic, stopped at the perimeter AND across east-west traffic between segments. The flat-network era is over.",
                span: "lg:col-span-4",
              },
              {
                icon: EyeIcon,
                title: "See and control thousands of applications",
                desc: "Identify any application regardless of port or protocol, including ones tunnelled through HTTPS. App-ID, not port-and-protocol, is what catches modern attacks.",
                span: "lg:col-span-4",
              },
              {
                icon: LockIcon,
                title: "Inspect encrypted traffic at line rate",
                desc: "TLS 1.3 decryption without breaking the user experience or blowing the throughput budget. If you have to disable inspection to keep up, your firewall is one generation behind.",
                span: "lg:col-span-4",
              },
              {
                icon: ServerIcon,
                title: "Tie every policy to identity, not IP",
                desc: "Policies that follow employees across offices, devices, and remote work, not policies tied to IP addresses that change every time someone connects from a different network.",
                span: "lg:col-span-6",
              },
              {
                icon: LayersIcon,
                title: "Produce audit-ready evidence",
                desc: "Logs, reports, and trails that satisfy a NESA auditor and a UAE PDPL controller without a forensics consultant rebuilding the trail from scratch six months later.",
                span: "lg:col-span-6",
              },
            ].map((j, idx) => (
              <FirewallJobCard
                key={j.title}
                icon={j.icon}
                title={j.title}
                desc={j.desc}
                span={j.span}
                isOpen={openJob === idx}
                onActivate={() => setOpenJob(idx)}
                onDeactivate={() =>
                  setOpenJob((prev) => (prev === idx ? null : prev))
                }
              />
            ))}
          </motion.div> */}
        {/* </div> */}
      {/* </section> */}

      {/* ───────── TYPES OF FIREWALLS WE DELIVER ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.06),transparent_60%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              Capabilities
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Types of Firewalls
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The right firewall depends on your traffic volume, application mix, compliance posture, and operational capacity. These are the four categories we deploy and manage across UAE environments.
            </p>
          </div>

          <div className="mt-12 grid items-start gap-4 sm:mt-16 sm:gap-5 md:grid-cols-3">
            {[
              {
                icon: AlertTriangleIcon,
                title: "Next-Generation Firewall",
                desc: "Today's enterprise standard. Combines stateful inspection, App-ID and User-ID, integrated IPS, TLS 1.3 decryption, and ML-driven threat intelligence in a single platform. Covers everything UTM did, with deeper visibility and identity-based policy.",
                fit: "The default choice for any UAE business, from SMB to large enterprise.",
                featured: true,
              },
              {
                icon: LockIcon,
                title: "Web Application Firewall",
                desc: "Protects public-facing web applications and APIs against the OWASP Top 10: SQL injection, XSS, CSRF, broken access control, and Layer 7 DDoS. Sits in front of the application, not the network.",
                fit: "E-commerce sites, customer portals, and any exposed API.",
              },
              {
                icon: CloudIcon,
                title: "Cloud Firewall / FWaaS",
                desc: "Cloud-delivered firewall for distributed branches, cloud workloads, and remote users without on-premises hardware. Core component of any SASE architecture.",
                fit: "Hybrid teams, GCC branch offices, and SaaS-first organisations.",
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
          <div className="mb-10 text-center sm:mb-12 md:mb-16">
            <h2 className="mx-auto max-w-3xl font-display text-2xl font-bold tracking-tight text-heading sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              Vendor comparison for{" "}
              <span className="gradient-text">Firewall buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              We do not believe one firewall wins everything. We do believe the right firewall for your environment usually wins by your infrastructure and gateway level security needs. Artiflex suggests the solution that best fits your needs.
            </p>
          </div>

          <div className="mt-8 flex justify-center sm:mt-10">
            <button
              onClick={openContact}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base"
            >
              Talk to an IT Security Advisor
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
              <table
                className="w-full table-fixed border-collapse text-center text-sm"
                style={{ minWidth: Math.max(640, 150 + matrixVendors.length * 116) }}
              >
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-5 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">
                      Criteria
                    </th>
                    {matrixVendors.map((v) => (
                      <th
                        key={v.name}
                        className="border-l border-white/15 px-2 py-3 sm:px-4 sm:py-5 align-bottom"
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
                              : "border-l border-[#0A3D6B]/20 text-slate-700"
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

      {/* ───────── VENDOR MATRIX & FEATURE RATINGS ───────── */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          {/* Financial / strategic / management view */}
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Detailed Comparison on Firewall Vendors
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
              return (
                <motion.div
                  key={v.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="flex h-full"
                >
                  <Link
                    to={`/cybersecurity/firewalls/${v.slug}`}
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
                      <img
                        src={v.logo}
                        alt={`${v.name} logo`}
                        loading="lazy"
                        className="h-10 w-24 shrink-0 object-contain object-right sm:h-12 sm:w-32"
                      />
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
            <p className="text-base leading-relaxed text-slate-300 sm:text-lg md:text-xl text-white">
              <span className="font-semibold text-white">Artiflex IT is a Platinum Sophos Partner</span> and a strategic partner for Checkpoint, Palo Alto and Cisco. We are also authorized partner for Fortinet and SonicWall, supporting deployments where they align with specific customer requirements. <br>
              </br> <span className="text-xs italic text-white sm:text-base">The vendor follows the assessment, not the other way around.</span>
            </p>
          </div>

     
          {/* Feature ratings */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Comparison
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each vendor is rated across firewall capabilities using a standardised tier scale. A gold ★ marker denotes best-in-class performance for that specific capability.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="overflow-x-auto">
              <table
                className="w-full table-fixed border-collapse text-center text-sm"
                style={{ minWidth: Math.max(640, 150 + featureVendors.length * 116) }}
              >
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-5 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">
                      Capability
                    </th>
                    {featureVendors.map((v) => (
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
            {(["best", "excellent", "veryStrong", "strong", "good"] as Tier[]).map((t) => {
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
        </div>
      </section>

      {/* ───────── DISCOVERY QUESTIONS ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(27,138,199,0.06),transparent_60%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              Decision framework
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              The questions we ask before recommending a firewall
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Procurement decisions get cleaner when the questions are direct. Walk through these and the vendor shortlist usually falls out by itself.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-6xl sm:mt-12">
            <div className="grid grid-cols-1 gap-2 sm:gap-3 md:grid-cols-2">
            {[
              {
                label: null,
                questions: [
                  {
                    num: "01",
                    title: "How many users and devices will the firewall need to protect?",
                    desc: "Firewall throughput, concurrent session capacity, and licensing tiers are all sized against user and device count. Undersizing leads to performance bottlenecks; oversizing means unnecessary spend.",
                  },
                  {
                    num: "02",
                    title: "How many internet connections do you have, what type are they (fibre, leased line, 4G/5G, SD-WAN), and what are their speeds?",
                    desc: "A firewall must be able to handle your total aggregated WAN throughput, especially with deep packet inspection (DPI) enabled, which can reduce rated speeds significantly. Multiple links also raise questions about failover, load balancing, and routing policy.",
                  },
                ],
              },
              {
                label: "Current environment",
                questions: [
                  {
                    num: "03",
                    title: "What firewall or security appliance are you currently using, and how old is it?",
                    desc: "Understanding your existing setup helps identify feature gaps, migration complexity, and whether your current vendor's end-of-life timeline is driving this evaluation. It also informs trade-in or upgrade eligibility.",
                  },
                  {
                    num: "04",
                    title: "Do you have branch offices, remote workers, or cloud workloads that also need to be protected or connected?",
                    desc: "A single-site firewall and a distributed network are very different use cases. Branch connectivity, ZTNA for remote users, and cloud firewall requirements (SASE/SSE) may be needed, or may rule out certain vendors entirely.",
                  },
                ],
              },
              {
                label: "Pain points & requirements",
                questions: [
                  {
                    num: "05",
                    title: "What are your current challenges, security concerns, or the specific reason prompting this evaluation?",
                    desc: "Whether it's repeated breaches, a failed audit, poor visibility, performance issues, or compliance gaps, the root cause determines which features matter most. A customer struggling with ransomware needs different priorities than one failing a PCI-DSS audit.",
                  },
                  {
                    num: "06",
                    title: "Are there any regulatory or compliance requirements your organisation must meet (e.g. ISO 27001, PCI-DSS, HIPAA, NCA/ADHICS)?",
                    desc: "Certain regulations mandate specific controls, encrypted traffic inspection, log retention, network segmentation, or audit trails. Some firewall platforms have pre-built compliance reporting; others require additional configuration or third-party tools.",
                  },
                ],
              },
              {
                label: "Commercial & deployment",
                questions: [
                  {
                    num: "07",
                    title: "Do you prefer a hardware appliance, a virtual appliance, or a cloud-managed firewall?",
                    desc: "Deployment model affects total cost of ownership, scalability, and management overhead. On-premises hardware suits data-sovereign environments; virtual or cloud-delivered firewalls suit hybrid or multi-site deployments.",
                  },
                  {
                    num: "08",
                    title: "Do you have a defined budget, either as a one-time capital expenditure or an annual subscription, for this project?",
                    desc: "Budget directly determines which models and feature bundles are shortlistable. Being transparent about budget avoids wasted evaluation cycles and allows us to recommend the best value-for-money solution within your range, rather than the most feature-rich one.",
                  },
                  {
                    num: "09",
                    title: "What is your expected timeline for deployment, and do you have internal IT resources to manage the firewall, or will you require managed services?",
                    desc: "Tight timelines may rule out complex migrations. Organisations without dedicated IT staff may benefit more from a vendor with strong centralised cloud management (e.g. Sophos Central) or a fully managed SOC/MDR service rather than a feature-rich but operationally demanding platform.",
                  },
                ],
              },
            ]
              .flatMap((group) => group.questions)
              .map((q) => (
                <div
                  key={q.num}
                  tabIndex={0}
                  className="group relative flex min-h-[5rem] flex-col justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-r from-[#04101E] to-[#0A3D6B] px-4 py-3 shadow-md transition-all duration-300 hover:border-[#28B5E1]/40 hover:shadow-lg focus-within:border-[#28B5E1]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#28B5E1]/40 sm:min-h-[5.5rem] sm:px-5 sm:py-3.5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="font-display text-sm font-semibold leading-snug text-white sm:text-base">
                      {q.title}
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
                        {q.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
            description="We don't sell boxes. We deliver firewall outcomes: assess, design, deploy, manage. Every stage produces something an auditor can read and a CFO can sign off on."
            centered
          />

          <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-4">
            {[
              {
                title: "Assess",
                duration: "2 weeks",
                summary:
                  "Inventory of current firewall estate, traffic-flow mapping, application discovery, policy review, throughput and SSL-inspection benchmarking.",
                deliverable:
                  "Current-state report, vendor recommendation with rationale, three-year TCO comparison.",
              },
              {
                title: "Design",
                duration: "2–3 weeks",
                summary:
                  "Architecture for your specific environment: segmentation, HA pair sizing, identity-based policy framework, SD-WAN integration, SSL plan, SIEM logging integration.",
                deliverable:
                  "Approved architecture, signed-off cutover sequence, change-management plan.",
              },
              {
                title: "Deploy",
                duration: "2–6 weeks",
                summary:
                  "Phased deployment with rollback procedures at every stage. Pre-production validation, off-hours cutover for production traffic, day-1 hypercare.",
                deliverable:
                  "Live firewall, audit-ready documentation, runbooks for your team.",
              },
              {
                title: "Manage",
                duration: "Ongoing",
                summary:
                  "24/7 monitoring, policy change management, firmware lifecycle, threat-intelligence tuning, monthly board-readable reporting, quarterly architecture reviews.",
                deliverable:
                  "Operational firewall with SLAs you can actually rely on. Or a clean handover to your team.",
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
              14+ years of UAE firewall delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when Sophos wins, when Check Point wins, when Palo Alto wins, and when none of them is the right answer. The point of an honest assessment is honest answers.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years in UAE network security" },
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
                  Sophos (Platinum), Check Point, Palo Alto Networks, Cisco Secure Firewall, Fortinet, SonicWall: active delivery experience across all six.
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
              Book a free firewall posture assessment
            </Link>
            <Link
              to="/blog/origin-firewall-network-security"
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
            description="What businesses ask us most about enterprise firewalls and network security."
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
        title="Get the Firewall Selection Guide"
        description="Vendor-neutral comparison of NGFW, UTM, and cloud options - with TCO analysis, throughput benchmarks, and real deployment case studies."
        primaryButton={{ text: "Request the Guide", action: "modal" }}
      />
    </>
  );
}
