import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { useContactModal } from "@/components/layout/ContactModal";
import { CTASection } from "@/pages/Home/sections/CTASection";
import VendorComparisonMatrix, {
  type ComparisonRow,
  type ComparisonVendor,
} from "@/components/sections/VendorComparisonMatrix";
import {
  ShieldIcon,
  EyeIcon,
  AlertTriangleIcon,
  LockIcon,
  UsersIcon,
  CheckIcon,
  FileTextIcon,
  AlertIcon,
  TargetIcon,
} from "@/components/icons";

/* ───────── LAYERS ───────── */

const layers = [
  {
    number: "01",
    tag: "Pre-delivery",
    title: "Secure Email Gateway",
    desc: "Pre-delivery scanning catches bulk phishing, malware attachments, and known-bad URLs. Stops 85–90% of email threats before they ever reach an inbox.",
    icon: ShieldIcon,
  },
  {
    number: "02",
    tag: "Post-delivery AI",
    title: "AI / ML Behavioural Protection",
    desc: "Analyses emails that pass the gateway. Catches business email compromise, social engineering, and zero-day threats through behavioural baselines.",
    icon: EyeIcon,
  },
  {
    number: "03",
    tag: "Authentication",
    title: "DMARC Implementation Dubai · DKIM · SPF",
    desc: "DMARC email security prevents attackers from spoofing your domain. Our DMARC implementation Dubai engagements take customers from p=none (monitor only) to p=reject (enforced) - without breaking legitimate mail flow from payroll, marketing, or SaaS platforms.",
    icon: LockIcon,
  },
  {
    number: "04",
    tag: "Human Layer",
    title: "Security Awareness Training",
    desc: "Regular phishing simulations and micro-training. The goal isn't shame - it's muscle memory so employees spot red flags automatically.",
    icon: UsersIcon,
  },
  {
    number: "05",
    tag: "Response",
    title: "Incident Response Playbook",
    desc: "When (not if) someone clicks: report button, automatic quarantine, credential reset, and a forensic trail. Documented and rehearsed.",
    icon: AlertTriangleIcon,
  },
];

/* ───────── KEY EMAIL THREATS ───────── */

const threats = [
  {
    icon: AlertTriangleIcon,
    title: "Phishing & Spear-Phishing",
    desc: "Deceptive emails impersonating trusted entities to steal credentials or install malware. Spear-phishing targets a named individual using OSINT-grade context.",
  },
  {
    icon: UsersIcon,
    title: "Business Email Compromise (BEC)",
    desc: "Fraudulent impersonation of executives or vendors to divert payments. Average loss USD 125,000 per incident, with no malware or malicious URL to pattern-match on.",
  },
  {
    icon: AlertIcon,
    title: "Ransomware Delivery",
    desc: "Malicious attachments (Office macros, PDF exploits, ISO files) carrying ransomware payloads. Stopped by attachment sandboxing and content disarm and reconstruction (CDR).",
  },
  {
    icon: LockIcon,
    title: "Account Takeover",
    desc: "Credential-stealing emails followed by MFA fatigue attacks to compromise mailboxes, then internal-to-internal pivots that bypass perimeter filtering.",
  },
  {
    icon: TargetIcon,
    title: "Brand Impersonation",
    desc: "Attackers spoof your own domain to phish citizens or end-customers. Defended by DMARC enforcement at p=reject and active phishing-site takedown.",
  },
  {
    icon: FileTextIcon,
    title: "Data Exfiltration via Email",
    desc: "Sensitive data leaving the organisation through email, intentional or accidental. Outbound DLP and adaptive redaction sanitise content rather than blocking the whole message.",
  },
];

/* ───────── VENDORS ───────── */

const vendors: {
  slug: string;
  name: string;
  best: string;
  strength: string;
  watch: string;
  accent: string;
  logo?: string;
  hasDetail?: boolean;
}[] = [
  {
    slug: "check-point-harmony-email",
    name: "Check Point Harmony Email & Collaboration",
    best: "Recommended · Zero-Day Threat Extraction",
    strength: "Native API integration with M365 and Google Workspace, no MX change. Threat Extraction (CDR) sanitises documents before delivery; SandBlast detonates attachments in under 90s. ThreatCloud AI hits 99.92% prevention. Coverage across email, Teams, SharePoint, OneDrive, and Drive.",
    watch: "Best leverage when paired with the wider Check Point Infinity stack. Standalone deployments give up some cross-product correlation.",
    accent: "#4FC3F7",
    logo: "/logos/Check-Point-2024-logo-color.svg",
    hasDetail: true,
  },
  {
    slug: "proofpoint",
    name: "Proofpoint Threat Protection",
    best: "Recommended · Industry-Leading BEC",
    strength: "Industry-leading BEC and impersonation protection. Gartner MQ Leader. Nexus AI analyses 3 trillion emails per year. Targeted Attack Protection sandbox plus Very Attacked People dashboard. ZenGuide awareness training built in.",
    watch: "Complex SKU stack and premium pricing. Best suited to large enterprises with mature SOC and a dedicated email team.",
    accent: "#6B3FB0",
    logo: "/logos/Proofpoint.jpg.svg",
    hasDetail: true,
  },
  {
    slug: "abnormal-ai",
    name: "Abnormal AI",
    best: "Recommended · Behavioural AI",
    strength: "AI-native behavioural baseline per user and per vendor. Zero rules, zero tuning. VendorBase federated supply-chain intel catches third-party compromise. AI Security Mailbox auto-triages reported phishing. Furthest on Vision in the Gartner MQ.",
    watch: "Designed as a complement to (not a replacement for) an existing SEG or native M365 protection. Microsoft 365 and Google Workspace only, no support for on-premises Exchange or sovereign deployment.",
    accent: "#7C3AED",
    logo: "/logos/Abnormal.png",
    hasDetail: true,
  },
  {
    slug: "sophos-email",
    name: "Sophos Email Security",
    best: "Stack Synergy · Synchronized Security",
    strength: "Synchronized Security auto-contains email-borne threats across Sophos Endpoint and XGS Firewall. AI display-name BEC detection, SophosLabs Intelix sandbox, SPF/DKIM/DMARC enforcement, and built-in DLP. One Sophos Central console for M365 and Google Workspace.",
    watch: "Strongest fit for organisations consolidating on the Sophos stack. Less differentiated for buyers committed to a multi-vendor SOC stack.",
    accent: "#1B8AC7",
    logo: "/logos/sophos.svg",
    hasDetail: true,
  },
  {
    slug: "mimecast",
    name: "Mimecast",
    best: "Established SEG · Archive · Brand Protection",
    strength: "Mature gateway with archive and supervision for regulated industries. Brand Exploit Protection for DMARC and impersonation. 100% continuity SLA, up to 99-year immutable archiving with 7-second search. 60+ SIEM/SOAR integrations.",
    watch: "Mid-to-high pricing. Gateway-style architecture is less elegant than modern API-based ICES platforms. Behavioural BEC depth sits a tier below Proofpoint.",
    accent: "#F59E0B",
    logo: "/logos/mimecast.svg",
    hasDetail: true,
  },
  {
    slug: "fortra-email-security",
    name: "Fortra Email Security",
    best: "Full-Stack · DMARC, Takedown & DLP",
    strength: "Five layers in one contract: ICES, Clearswift SEG, Agari DMARC (co-founded the standard), PhishLabs unlimited takedown, and Terranova awareness. Clearswift Adaptive Redaction sanitises sensitive content rather than blocking the whole message.",
    watch: "Strongest fit for ministries, banks, and regulated entities that need DMARC, outbound DLP, and sovereign or on-prem deployment in one contract. Particularly compelling when Fortra Tripwire or Digital Guardian DLP are already in the estate.",
    accent: "#E11D48",
    logo: "/logos/Fortra.png",
    hasDetail: true,
  },
  {
    slug: "barracuda-email-protection",
    name: "Barracuda Email Protection",
    best: "Coverage Breadth · SMB to Mid-Market",
    strength: "All 13 email threat types covered in one bundle, with gateway, API, and inline deployment. Premium Plus adds M365 backup (Exchange, OneDrive, SharePoint, Teams, Entra ID). 200,000+ organisations protected. SC Trust Award winner.",
    watch: "Brand recognition smaller than Proofpoint or Microsoft at the very large enterprise tier. Threat-intel breadth still trails Nexus AI and ThreatCloud.",
    accent: "#10B981",
    logo: "/logos/Barracuda.png",
    hasDetail: true,
  },
  {
    slug: "darktrace-email",
    name: "Darktrace / EMAIL",
    best: "AI-Native Behavioural · Account Takeover",
    strength: "Self-Learning AI builds a behavioural baseline per user, catching BEC and account takeover that signature engines miss. Cyber AI Analyst automates Tier-2 triage. Gartner MQ Leader and EMEA Customers' Choice.",
    watch: "Newer in this Magic Quadrant with a smaller install base. Limited outbound DLP and content inspection compared to Fortra, Sophos, or Proofpoint.",
    accent: "#7C3AED",
    logo: "/logos/Darktrace.png",
    hasDetail: true,
  },
  {
    slug: "knowbe4-defend",
    name: "KnowBe4 Defend",
    best: "Awareness Training + Email · KMSAT Heritage",
    strength: "KMSAT, the industry-standard security-awareness platform, tightly tied to email detection. Agentic AI detection (formerly Egress). Gartner MQ Leader. The right pick when user phishing failure rates are the primary pain.",
    watch: "Less mature on outbound DLP and content inspection than Fortra, Sophos, or Proofpoint.",
    accent: "#F97316",
    logo: "/logos/KnowBe4.webp",
    hasDetail: true,
  },
  {
    slug: "microsoft-defender-o365",
    name: "Microsoft Defender for Office 365",
    best: "Native to M365 · Best Value with E5",
    strength: "Native M365 API protection, no MX redirection. Bundled with M365 E5 (Defender for Office 365 P2), the cheapest path when E5 is already in place. Deep Defender XDR correlation across endpoint, identity, and email.",
    watch: "Independent testing shows native M365 protection misses 5 to 15% of advanced phishing and BEC. Most enterprise deployments add a second-layer ICES (Sophos, Check Point, or Fortra) on top of Defender for Office 365.",
    accent: "#0078D4",
    logo: "/logos/MicrosoftDefender.webp",
    hasDetail: true,
  },
];

/* ───────── EMAIL CAPABILITY TABLE ───────── */

const emailGartnerVendors = [
  "Check Point Harmony",
  "Proofpoint",
  "Abnormal AI",
  "Sophos Email",
  "Mimecast",
  "Fortra Email Sec.",
  "Barracuda",
  "Darktrace EMAIL",
  "KnowBe4 Defend",
  "Microsoft Defender O365",
];

type EmailTier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type EmailFeatureCell = { tier: EmailTier; note: string };

const emailFeatureRows: { label: string; cells: EmailFeatureCell[] }[] = [
  {
    label: "Gartner Email Security MQ",
    cells: [
      { tier: "best", note: "Leader" },
      { tier: "best", note: "Leader" },
      { tier: "best", note: "Leader, top of Vision" },
      { tier: "veryStrong", note: "Customers' Choice" },
      { tier: "veryStrong", note: "Customers' Choice" },
      { tier: "best", note: "Frost Leader" },
      { tier: "veryStrong", note: "Visionary" },
      { tier: "best", note: "Leader" },
      { tier: "best", note: "Leader" },
      { tier: "best", note: "Leader" },
    ],
  },
  {
    label: "Architecture",
    cells: [
      { tier: "excellent", note: "API post-delivery" },
      { tier: "veryStrong", note: "Gateway + API" },
      { tier: "best", note: "API-only, no MX change" },
      { tier: "excellent", note: "Cloud, M365 / Google" },
      { tier: "veryStrong", note: "Secure email gateway" },
      { tier: "excellent", note: "ICES + on-prem SEG" },
      { tier: "excellent", note: "Gateway + API + inline" },
      { tier: "veryStrong", note: "API" },
      { tier: "veryStrong", note: "API" },
      { tier: "excellent", note: "Native M365" },
    ],
  },
  {
    label: "Anti-Phishing / BEC",
    cells: [
      { tier: "best", note: "99.92% prevention claim" },
      { tier: "best", note: "Industry leader" },
      { tier: "best", note: "Best behavioural BEC" },
      { tier: "excellent", note: "AI display-name + SPF/DKIM" },
      { tier: "veryStrong", note: "Strong impersonation, gateway-era" },
      { tier: "veryStrong", note: "Agari signal trained on 2T emails/yr" },
      { tier: "veryStrong", note: "Strong impersonation engine" },
      { tier: "best", note: "AI-native behavioural" },
      { tier: "veryStrong", note: "Strong with KMSAT" },
      { tier: "veryStrong", note: "Strong inside M365" },
    ],
  },
  {
    label: "Threat Extraction (CDR)",
    cells: [
      { tier: "best", note: "SandBlast CDR" },
      { tier: "veryStrong", note: "Premium sandbox" },
      { tier: "moderate", note: "Not core focus" },
      { tier: "veryStrong", note: "SophosLabs Intelix sandbox" },
      { tier: "veryStrong", note: "Attachment Protect sandbox" },
      { tier: "veryStrong", note: "Clearswift CDR" },
      { tier: "veryStrong", note: "Sandbox + ATP" },
      { tier: "moderate", note: "Limited" },
      { tier: "moderate", note: "Limited" },
      { tier: "good", note: "Safe Attachments" },
    ],
  },
  {
    label: "DMARC / Brand Impersonation",
    cells: [
      { tier: "veryStrong", note: "Strong impersonation engine" },
      { tier: "veryStrong", note: "Strong DMARC tooling" },
      { tier: "veryStrong", note: "VendorBase + impersonation" },
      { tier: "veryStrong", note: "DMARC enforcement" },
      { tier: "veryStrong", note: "Brand Exploit Protection" },
      { tier: "best", note: "Agari co-founded DMARC" },
      { tier: "veryStrong", note: "Domain Fraud Protection" },
      { tier: "moderate", note: "Limited" },
      { tier: "moderate", note: "Limited" },
      { tier: "good", note: "Add-on" },
    ],
  },
  {
    label: "Outbound DLP",
    cells: [
      { tier: "excellent", note: "Comprehensive DLP" },
      { tier: "veryStrong", note: "Strong outbound DLP" },
      { tier: "moderate", note: "Limited" },
      { tier: "excellent", note: "Built-in DLP policies" },
      { tier: "veryStrong", note: "Content control and DLP" },
      { tier: "best", note: "Clearswift Adaptive Redaction" },
      { tier: "veryStrong", note: "Built-in DLP" },
      { tier: "moderate", note: "Limited" },
      { tier: "moderate", note: "Limited" },
      { tier: "veryStrong", note: "Microsoft Purview" },
    ],
  },
  {
    label: "Phishing Takedown",
    cells: [
      { tier: "moderate", note: "Limited" },
      { tier: "veryStrong", note: "Add-on service" },
      { tier: "moderate", note: "Not in scope" },
      { tier: "good", note: "Via Sophos Intelix feed" },
      { tier: "moderate", note: "Not in scope" },
      { tier: "best", note: "PhishLabs unlimited" },
      { tier: "good", note: "Limited add-on" },
      { tier: "moderate", note: "Not in scope" },
      { tier: "moderate", note: "Not in scope" },
      { tier: "moderate", note: "Not in scope" },
    ],
  },
  {
    label: "Awareness Training",
    cells: [
      { tier: "veryStrong", note: "SmartAwareness" },
      { tier: "veryStrong", note: "ZenGuide" },
      { tier: "moderate", note: "Limited, partner-led" },
      { tier: "veryStrong", note: "Sophos Phish Threat" },
      { tier: "veryStrong", note: "Mimecast Awareness Training" },
      { tier: "excellent", note: "Terranova" },
      { tier: "veryStrong", note: "Barracuda Security Awareness" },
      { tier: "moderate", note: "Limited" },
      { tier: "best", note: "KMSAT, industry standard" },
      { tier: "good", note: "Attack Simulator add-on" },
    ],
  },
  {
    label: "Sovereign / On-Prem",
    cells: [
      { tier: "good", note: "Cloud" },
      { tier: "good", note: "Cloud" },
      { tier: "moderate", note: "Cloud only, M365/Google" },
      { tier: "good", note: "Cloud" },
      { tier: "good", note: "Cloud" },
      { tier: "best", note: "Yes, Clearswift" },
      { tier: "good", note: "Cloud" },
      { tier: "good", note: "Cloud" },
      { tier: "good", note: "Cloud" },
      { tier: "good", note: "Cloud" },
    ],
  },
  {
    label: "Total Cost",
    cells: [
      { tier: "excellent", note: "Excellent value" },
      { tier: "moderate", note: "Premium" },
      { tier: "moderate", note: "Premium AI-native" },
      { tier: "best", note: "Best with Sophos stack" },
      { tier: "veryStrong", note: "Mid-to-high" },
      { tier: "veryStrong", note: "Mid-range" },
      { tier: "excellent", note: "Strong SMB / mid-market value" },
      { tier: "veryStrong", note: "Mid-premium" },
      { tier: "veryStrong", note: "Mid-range" },
      { tier: "best", note: "Best with E5" },
    ],
  },
];

const emailTierStyles: Record<EmailTier, { bg: string; text: string; label: string }> = {
  best: { bg: "bg-emerald-600", text: "text-white", label: "Best in class" },
  excellent: { bg: "bg-emerald-500", text: "text-white", label: "Excellent" },
  veryStrong: { bg: "bg-emerald-200", text: "text-emerald-900", label: "Very strong" },
  strong: { bg: "bg-amber-200", text: "text-amber-900", label: "Strong" },
  good: { bg: "bg-amber-100", text: "text-amber-900", label: "Good" },
  moderate: { bg: "bg-amber-100", text: "text-amber-900", label: "Moderate" },
};

/* ───────── DECISIVE ADVANTAGES (5.5) ───────── */

const decisiveAdvantages: {
  name: string;
  tagline: string;
  accent: string;
  points: string[];
}[] = [
  {
    name: "Sophos Email Security",
    tagline: "Best stack synergy",
    accent: "#1B8AC7",
    points: [
      "Synchronized Security with Sophos Endpoint and Sophos XGS Firewall: auto-isolation of compromised users with no human intervention.",
      "Single Sophos Central console for the whole stack.",
      "Best total cost of ownership when bought with the rest of the Sophos portfolio.",
    ],
  },
  {
    name: "Check Point Harmony Email",
    tagline: "Highest published prevention rate",
    accent: "#4FC3F7",
    points: [
      "Best-in-class Threat Extraction (CDR) and SandBlast Threat Emulation, average analysis time under 90 seconds.",
      "99.92% prevention rate against advanced phishing in published Check Point testing.",
      "Single Infinity policy across firewall, endpoint, email, and SASE.",
    ],
  },
  {
    name: "Fortra Email Security",
    tagline: "Only single-vendor full-stack",
    accent: "#E11D48",
    points: [
      "Only single-vendor portfolio that covers ICES, on-prem SEG, DMARC, phishing takedown, and awareness training.",
      "Agari co-founded the DMARC standard; Clearswift Adaptive Redaction is unique to the Fortra portfolio.",
      "PhishLabs delivers unlimited takedowns, critical for ministries protecting citizens from impersonation.",
    ],
  },
];

/* ───────── BUYER'S DECISION GUIDE (5.6) ───────── */

const buyerDecisionGuide: { says: string; recommend: string; vendor: string }[] = [
  {
    says: "We want one vendor across firewall, endpoint, and email.",
    recommend: "Sophos Email Security",
    vendor: "Synchronized Security across the whole stack.",
  },
  {
    says: "We are a large bank or government and threat prevention rate is paramount.",
    recommend: "Check Point Harmony Email & Collaboration",
    vendor: "Highest published prevention rate.",
  },
  {
    says: "Citizens are receiving phishing emails that appear to come from us.",
    recommend: "Fortra Customer Phishing Protection Bundle",
    vendor: "Agari DMARC + PhishLabs unlimited takedowns.",
  },
  {
    says: "We need on-prem or sovereign email content inspection.",
    recommend: "Fortra Clearswift Secure Email Gateway",
    vendor: "Mature on-prem SEG with adaptive redaction.",
  },
  {
    says: "Outbound DLP via email is failing audits.",
    recommend: "Fortra Clearswift Adaptive Redaction",
    vendor: "Sanitise sensitive content rather than block the message.",
  },
  {
    says: "We are M365 E5 only, cheapest path.",
    recommend: "Defender for Office 365 P2 + Sophos or Fortra ICES",
    vendor: "Native M365 plus a second-layer ICES for advanced BEC.",
  },
  {
    says: "BEC is our biggest pain.",
    recommend: "Proofpoint or Fortra Cloud Email Protection",
    vendor: "Industry-leading BEC engines and threat intel.",
  },
  {
    says: "Phishing failure rate too high, users keep clicking.",
    recommend: "KnowBe4 Defend + KMSAT, or Fortra Terranova + Cloud Email Protection",
    vendor: "Awareness training tightly bound to email security.",
  },
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "Isn't Microsoft 365's built-in email protection enough?",
    answer:
      "Independent testing shows native M365 protection misses 5 to 15% of advanced phishing and BEC attacks. Defender for Office 365 P2 is a strong baseline when you are already licensed for E5, but most enterprise deployments add a second-layer ICES (Sophos Email, Check Point Harmony, or Fortra Cloud Email Protection) on top to close the BEC and zero-day gap.",
  },
  {
    question: "What is Business Email Compromise (BEC) and why is the average loss USD 125,000?",
    answer:
      "BEC is the email impersonation of an executive, vendor, or trusted partner to redirect a wire transfer or release sensitive data. There is no malware and no malicious URL, just a carefully crafted lie, which is why signature-based filters miss it entirely. Reported average loss per incident is USD 125,000. Behavioural AI engines (Proofpoint, Darktrace, Sophos AI display-name analysis, Fortra Cloud Email Protection) are the right defence.",
  },
  {
    question: "How does DMARC stop attackers from spoofing our domain?",
    answer:
      "DMARC is a DNS-published policy combining SPF (allowed senders) and DKIM (cryptographic signatures). At p=reject, receiving mail servers refuse mail that fails both checks and sends aggregate reports back to you. This is the only mechanism that stops attackers from sending phishing emails to citizens or customers that appear to come from your own domain. Fortra (via Agari) co-founded the DMARC standard and is the strongest single-vendor option for DMARC plus phishing-site takedown.",
  },
  {
    question: "Citizens are receiving phishing emails that appear to come from us. What do we do?",
    answer:
      "This is brand impersonation, defended on two fronts: outbound DMARC enforcement to stop spoofing at the inbox provider, and active takedown of phishing sites that target your brand. The Fortra Customer Phishing Protection Bundle (Agari DMARC + PhishLabs unlimited takedowns) is the strongest single-vendor solution. PhishLabs has 15+ years of registrar and host relationships and the fastest published takedown speeds in the industry.",
  },
  {
    question: "We need on-prem or sovereign email content inspection. Who can deliver that?",
    answer:
      "Fortra Clearswift Secure Email Gateway is the leading on-prem option, with Adaptive Redaction that sanitises sensitive content from emails and attachments rather than blocking the whole message. Strongest fit for ministries, banks, and regulated entities with sovereign data residency requirements.",
  },
  {
    question: "Outbound DLP via email keeps failing audits. What changes that?",
    answer:
      "Most outbound DLP fails because it blocks an entire email when one snippet of sensitive content is detected, generating helpdesk friction and bypass workarounds. Fortra Clearswift Adaptive Redaction sanitises the sensitive content while letting the rest of the message flow through, reducing friction while meeting outbound DLP audit requirements. It is unique in the market.",
  },
  {
    question: "Our phishing failure rate is too high, users keep clicking. What works?",
    answer:
      "Two complementary approaches. KnowBe4 Defend + KMSAT bundles industry-leading awareness training with email security in one platform. Fortra Terranova Awareness bundled with Cloud Email Protection delivers similar coverage with the wider Fortra portfolio. Either option treats clicking as a measurable risk metric and builds the muscle memory to spot red flags automatically.",
  },
  {
    question: "We want one vendor across firewall, endpoint, and email. What is the right pick?",
    answer:
      "Sophos. Synchronized Security across Sophos Endpoint, Sophos XGS Firewall, Sophos Email, and Sophos MDR provides automatic cross-product response when an email-borne threat detonates on an endpoint. Single Sophos Central console, single contract, best total cost of ownership when bought as a stack. Artiflex IT is a Platinum Sophos Partner.",
  },
  {
    question: "We are a large bank or government entity, and threat prevention rate is paramount. What wins?",
    answer:
      "Check Point Harmony Email & Collaboration. Highest published prevention rate in the market (99.92% against advanced phishing in Check Point testing). Threat Extraction (CDR) and SandBlast Threat Emulation analyse every attachment in cloud sandbox, average analysis time under 90 seconds. Single Infinity policy across firewall, endpoint, email, and SASE.",
  },
  {
    question: "How fast can modern email security be deployed?",
    answer:
      "API-based platforms (Check Point Harmony, Sophos Email cloud, Fortra Cloud Email Protection ICES) deploy in under a day with no MX record changes. Gateway replacements (Clearswift, Mimecast, Proofpoint) typically run 2 to 4 weeks including tuning. We handle cutover so business email never goes dark.",
  },
  {
    question: "What are the NESA email security requirements in the UAE?",
    answer:
      "The UAE Information Assurance Standards (IAS) published by NESA / TDRA require email security controls as part of the broader information assurance posture, including anti-phishing protection, email authentication (SPF, DKIM, DMARC), incident response, and user awareness training. Under the UAE PDPL, personal data transmitted or stored via email also falls under lawful-processing and security-of-processing obligations. Artiflex IT aligns deployments to these requirements so your email stack is audit-ready, not just operationally secure.",
  },
];

/* ───────── HERO ───────── */

function EmailBusinessHero() {
  const { open: openContact } = useContactModal();
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-navy-deep">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/emailsec.jpg')" }}
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
                <span className="font-medium text-[#28B5E1]">Email Security for Business</span>
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
            Email Security{" "}
            <span className="gradient-text">UAE</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Phishing, BEC &amp; Account Takeover Defence
            </span>
          </h1>

          <p className="mt-5 max-w-2xl font-display text-sm italic leading-relaxed text-slate-300 sm:text-base">
            <em className="not-italic font-semibold text-white">91%</em> of all cyberattacks begin with a phishing email. Modern email security goes beyond spam filtering: AI-driven detection of Business Email Compromise, spear-phishing, credential harvesting, account takeover, and brand impersonation, with DMARC enforcement, content disarm, outbound DLP, and human-layer training built in.
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
              to="/blog/origin-email-security"
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
              Get a Free Email Assessment
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

/* ───────── VENDOR COMPARISON (buyer star matrix) ───────── */

const emailCompareVendors: ComparisonVendor[] = [
  { name: "Check Point Harmony", recommended: true },
  { name: "Proofpoint", recommended: true },
  { name: "Abnormal AI", recommended: true },
  { name: "Sophos Email" },
  { name: "Mimecast" },
  { name: "Fortra Email" },
  { name: "Barracuda" },
  { name: "Darktrace EMAIL" },
  { name: "KnowBe4 Defend" },
  { name: "Microsoft Defender O365" },
];

const emailCompareRows: ComparisonRow[] = [
  {
    label: "Founded / Heritage",
    type: "text",
    cells: [
      "Harmony Email & Collaboration, API",
      "Email security pioneer, premium tier",
      "Behavioural AI, founded 2018",
      "Cloud email, Synchronized Security",
      "Established SEG, archive and continuity",
      "Agari + Clearswift + PhishLabs",
      "13 threat types, gateway + API + inline",
      "Self-Learning AI, behavioural baseline",
      "KMSAT heritage, agentic AI detection",
      "Defender for Office 365, native to M365",
    ],
  },
  {
    label: "Total Cost of Ownership",
    type: "stars",
    cells: [
      { stars: 4, note: "Good value in Harmony suite" },
      { stars: 3, note: "Premium pricing" },
      { stars: 3, note: "Premium, value via automation" },
      { stars: 5, note: "Strong value, bundled with endpoint" },
      { stars: 4, note: "Mid-to-high, value via archive" },
      { stars: 4, note: "Modular, full-stack value" },
      { stars: 5, note: "Strong SMB / mid-market value" },
      { stars: 4, note: "Mid-premium" },
      { stars: 4, note: "Mid-range" },
      { stars: 5, note: "Included with E5, best value" },
    ],
  },
  {
    label: "Ease of Deployment",
    type: "stars",
    cells: [
      { stars: 5, note: "API, no MX change" },
      { stars: 3, note: "Gateway, more setup" },
      { stars: 5, note: "API-only, no MX change" },
      { stars: 5, note: "Cloud, M365 / Google, fast setup" },
      { stars: 3, note: "Gateway, MX change and tuning" },
      { stars: 4, note: "ICES + SEG options" },
      { stars: 4, note: "Gateway + API + inline" },
      { stars: 5, note: "API, fast onboarding" },
      { stars: 5, note: "API, fast onboarding" },
      { stars: 5, note: "Native, zero deployment" },
    ],
  },
  {
    label: "Anti-Phishing / BEC",
    type: "stars",
    cells: [
      { stars: 5, note: "99.92% prevention claim" },
      { stars: 5, note: "Industry leader" },
      { stars: 5, note: "Best behavioural BEC" },
      { stars: 5, note: "AI display-name + SPF / DKIM" },
      { stars: 4, note: "Strong impersonation, gateway-era" },
      { stars: 4, note: "Agari signal, 2T emails/yr" },
      { stars: 4, note: "Strong impersonation engine" },
      { stars: 5, note: "AI-native behavioural" },
      { stars: 4, note: "Strong with KMSAT" },
      { stars: 4, note: "Strong inside M365" },
    ],
  },
  {
    label: "Threat Extraction / Sandbox",
    type: "stars",
    cells: [
      { stars: 5, note: "SandBlast CDR" },
      { stars: 4, note: "Premium sandbox" },
      { stars: 3, note: "Not core focus" },
      { stars: 4, note: "SophosLabs Intelix sandbox" },
      { stars: 4, note: "Attachment Protect sandbox" },
      { stars: 4, note: "Clearswift CDR" },
      { stars: 4, note: "Sandbox + ATP" },
      { stars: 2, note: "Limited" },
      { stars: 2, note: "Limited" },
      { stars: 3, note: "Safe Attachments" },
    ],
  },
  {
    label: "DMARC / Brand Protection",
    type: "stars",
    cells: [
      { stars: 4, note: "Strong impersonation engine" },
      { stars: 4, note: "Strong DMARC tooling" },
      { stars: 4, note: "VendorBase + impersonation" },
      { stars: 4, note: "DMARC enforcement" },
      { stars: 4, note: "Brand Exploit Protection" },
      { stars: 5, note: "Agari co-founded DMARC" },
      { stars: 4, note: "Domain Fraud Protection" },
      { stars: 2, note: "Limited" },
      { stars: 2, note: "Limited" },
      { stars: 3, note: "Add-on" },
    ],
  },
  {
    label: "Best Suited For",
    type: "text",
    cells: [
      "Highest published prevention rate",
      "Enterprises needing premium BEC defence",
      "Cloud-first firms facing advanced BEC",
      "Sophos estates wanting synchronized security",
      "Regulated firms needing archive and continuity",
      "Single-vendor full-stack email security",
      "SMB to mid-market needing coverage breadth",
      "AI-native defence against account takeover",
      "Teams where phishing failure rate is the pain",
      "Microsoft 365 / E5 organisations",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      { recommended: true, text: "Zero-day Threat Extraction, top prevention rate." },
      { recommended: true, text: "Industry-leading BEC for premium budgets." },
      { recommended: true, text: "Behavioural AI that stops payloadless BEC." },
      { text: "Best stack synergy with Synchronized Security." },
      { text: "Archive, continuity and brand protection in one gateway." },
      { text: "DMARC, takedown, and DLP in one stack." },
      { text: "Broadest threat coverage in one bundle." },
      { text: "Self-Learning AI catches account takeover." },
      { text: "Awareness training bound to email detection." },
      { text: "Best value and native protection for M365." },
    ],
  },
];

export default function EmailSecurityBusiness() {
  const [activeLayer, setActiveLayer] = useState(0);
  const [openThreat, setOpenThreat] = useState<number | null>(null);
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Email Security UAE | DMARC, BEC & Brand Protection | Artiflex IT</title>
        <meta
          name="description"
          content="Email security UAE: stop phishing, BEC, ransomware delivery & brand impersonation. Sophos, Check Point Harmony, Fortra (Agari DMARC + PhishLabs), Proofpoint. Free phishing risk test."
        />
        <meta
          name="keywords"
          content="email security UAE, email security Dubai, DMARC implementation Dubai, BEC protection UAE, phishing protection UAE, Sophos email security, Check Point Harmony email, Fortra email security, Agari DMARC, PhishLabs takedown, Clearswift adaptive redaction, Microsoft Defender for Office 365, Proofpoint UAE"
        />
        <link rel="canonical" href="https://artiflexit.com/cybersecurity/email-security" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Artiflex IT",
            url: "https://artiflexit.com/cybersecurity/email-security",
            areaServed: [
              { "@type": "Country", name: "United Arab Emirates" },
              { "@type": "City", name: "Dubai" },
              { "@type": "City", name: "Abu Dhabi" },
            ],
            address: {
              "@type": "PostalAddress",
              addressCountry: "AE",
              addressRegion: "Dubai",
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Email Security & Phishing Protection",
            provider: {
              "@type": "Organization",
              name: "Artiflex IT",
              url: "https://artiflexit.com",
            },
            areaServed: { "@type": "Country", name: "United Arab Emirates" },
            description:
              "Email security services UAE: AI phishing detection, DMARC implementation Dubai, BEC protection, brand-impersonation takedown, outbound DLP, and vendor-agnostic deployments across Sophos, Check Point Harmony, Fortra (Agari, PhishLabs, Clearswift, Terranova), Microsoft Defender for Office 365, Proofpoint, Darktrace, KnowBe4, and Mimecast.",
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
      <EmailBusinessHero />

      {/* ───────── EMAIL VENDORS WE DELIVER (HONEYCOMB) ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-20">
        {/* Circuit-board background */}
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
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              The Vendor Lineup
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
              Email Security{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Vendors
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The email security platforms we design, deploy and manage across UAE environments. The choice follows your stack, your SOC capacity, and the threat surface you actually face.
            </p>
          </div>

          {/* Honeycomb grid (lg+) */}
          <div className="mt-14 hidden flex-col items-center lg:flex">
            {(() => {
              // Honeycomb row layout: uniform rows of maxPerRow (5 + 5 for email security)
              const maxPerRow = 5;
              const rows: typeof vendors[] = [];
              for (let i = 0; i < vendors.length; i += maxPerRow) {
                rows.push(vendors.slice(i, i + maxPerRow));
              }
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
                      to={`/cybersecurity/email/${v.slug}`}
                      aria-label={`View ${v.name} details`}
                      className="group relative block h-[208px] w-[180px] transition-all duration-300 hover:z-10 hover:scale-[1.06] [filter:drop-shadow(0_4px_12px_rgba(15,23,42,0.10))] hover:[filter:drop-shadow(0_10px_30px_rgba(40,181,225,0.45))]"
                    >
                      {/* Outer hex (border layer, brand cyan on hover) */}
                      <div
                        className="absolute inset-0 bg-slate-200/80 transition-colors duration-300 group-hover:bg-[#28B5E1]"
                        style={{ clipPath: HEX_PATH }}
                      />
                      {/* Inner hex (white face, brightens on hover) */}
                      <div
                        className="absolute inset-[2px] bg-white transition-all duration-300 group-hover:bg-gradient-to-b group-hover:from-[#28B5E1]/[0.08] group-hover:to-white"
                        style={{ clipPath: HEX_PATH }}
                      />
                      {/* Content */}
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

          {/* Mobile / tablet fallback grid */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:hidden">
            {vendors.map((v) => (
              <Link
                key={v.slug}
                to={`/cybersecurity/email/${v.slug}`}
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

          {/* Footer count */}
          <p className="mt-12 text-center text-sm text-slate-500">
            <span className="font-semibold text-slate-700">
              {vendors.length} platforms
            </span>
            , picked by your stack and SOC capacity.
          </p>
        </div>
      </section>


   {/* ───────── KEY EMAIL THREATS ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            title={
              <>
                Key email threats to{" "}
                <span className="gradient-text">defend against</span>
              </>
            }
            description="91% of all cyberattacks begin with a phishing email. Modern email security must detect Business Email Compromise, spear-phishing, credential harvesting, malicious attachments, account takeover, and brand impersonation in real time, while protecting your domain from being spoofed against the public."
            centered
          />

          <div className="mt-10 grid grid-cols-1 items-start gap-3 sm:mt-12 sm:gap-2 md:grid-cols-3">
            {threats.map((t, idx) => {
              const isOpen = openThreat === idx;
              return (
                <div
                  key={t.title}
                  tabIndex={0}
                  onMouseEnter={() => setOpenThreat(idx)}
                  onMouseLeave={() =>
                    setOpenThreat((prev) => (prev === idx ? null : prev))
                  }
                  onFocus={() => setOpenThreat(idx)}
                  onBlur={() =>
                    setOpenThreat((prev) => (prev === idx ? null : prev))
                  }
                  onClick={() =>
                    setOpenThreat((prev) => (prev === idx ? null : idx))
                  }
                  aria-expanded={isOpen}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white py-2 px-3 shadow-sm outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#28B5E1]/40 sm:py-3 sm:px-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#28B5E1]/10 text-[#1B8AC7]">
                      <t.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-md font-semibold text-slate-900">
                      {t.title}
                    </h3>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.p
                        key="desc"
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden text-sm leading-relaxed text-slate-600"
                      >
                        {t.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>



     
      {/* ───────── WHY TRADITIONAL FILTERS FAIL ───────── */}
      {/* <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="The Gap"
            title={
              <>
                Why traditional email filters{" "}
                <span className="gradient-text">aren't enough</span>
              </>
            }
            description="Built-in M365 and Workspace protection handle commodity spam. They miss the attacks that actually hurt."
            centered
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {/* Left - traditional */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-border-light bg-surface-secondary p-8 sm:p-10"
            >
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                Gateway-only / legacy
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-heading">
                Signature-based filtering
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-body">
                Catches known-bad. Struggles with anything targeted. BEC uses no malware, no malicious
                link - just a well-crafted lie. Your filter has nothing to pattern-match on.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Misses CEO / CFO impersonation",
                  "Blind to vendor payment redirections",
                  "No visibility into internal-to-internal takeovers",
                  "Domain spoofing slips through without DMARC",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-body">
                    <span className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                      <AlertIcon className="h-2.5 w-2.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div> */}

            {/* Right - AI-driven */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative overflow-hidden rounded-3xl border border-[#1B8AC7]/30 bg-gradient-to-br from-[#04101E] to-[#0A3D6B] p-8 text-white shadow-[0_20px_60px_rgba(27,138,199,0.25)] sm:p-10"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#1B8AC7]/20 blur-3xl" />

              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4FC3F7]">
                Behavioural AI · the new standard
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-white">
                AI phishing detection
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Learns how your CEO actually writes, when they send, which vendors they interact with.
                When a 2am wire request lands from an unfamiliar reply-to - the system catches it.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "30–40% more threats caught vs. gateway-only",
                  "Detects tone, timing, and relationship anomalies",
                  "Stops BEC without keywords or signatures",
                  "Works alongside - not instead of - your gateway",
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
                <EyeIcon className="h-5 w-5 text-[#4FC3F7]" />
                <p className="text-xs text-slate-300">
                  Abnormal, Proofpoint, and Mimecast all now ship behavioural models - not
                  just signature lists.
                </p>
              </div>
            </motion.div>
          </div> */}
        {/* </div> */}
      {/* // </section> */}

      {/* ───────── ASSESSMENT CTA BAND ───────── */}
      {/* <section className="relative overflow-hidden bg-[#020617] py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(40,181,225,0.12),transparent_60%)]" />

        <div className="shell relative">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-10 lg:flex-row lg:items-center">
            <div className="flex items-start gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#28B5E1] to-[#045891]">
                <MailIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#4FC3F7]">
                  Free · 48-hour turnaround
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">
                  How vulnerable is your team to phishing?
                </h3>
                <p className="mt-2 max-w-xl text-sm text-slate-400">
                  Our phishing simulation UAE engagement runs a safe, controlled campaign against
                  your team and delivers a department-level report: click rates, credential-harvest
                  exposure, and a prioritised remediation list - mapped to your{" "}
                  <a href="/cybersecurity#roadmap" className="text-[#4FC3F7] underline decoration-[#1B8AC7]/40 underline-offset-2 hover:text-white">
                    security awareness training
                  </a>{" "}
                  programme.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#04101E] transition-all hover:bg-[#28B5E1] hover:text-white hover:shadow-[0_8px_32px_rgba(40,181,225,0.4)]"
            >
              Get a Free Phishing Assessment
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 transition-transform group-hover:translate-x-1">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </section> */}

      {/* ───────── MULTI-LAYER STACK (commented out) ───────── */}
      {false && (
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="The Stack"
            title={
              <>
                How to prevent phishing -{" "}
                <span className="gradient-text">a five-layer approach</span>
              </>
            }
            description="Technology without training fails. Training without enforcement fails. Effective email security is always layered."
            centered
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-12">
            {/* Left selector */}
            <div className="lg:col-span-5 space-y-2">
              {layers.map((layer, index) => {
                const Icon = layer.icon;
                const isActive = activeLayer === index;
                return (
                  <button
                    key={layer.number}
                    onClick={() => setActiveLayer(index)}
                    className={`group w-full overflow-hidden rounded-2xl border p-5 text-left transition-all ${
                      isActive
                        ? "border-[#1B8AC7] bg-gradient-to-r from-[#04101E] to-[#0A3D6B] text-white shadow-xl"
                        : "border-border-light bg-white hover:border-[#1B8AC7]/30 hover:bg-surface-secondary"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-mono text-2xl font-bold ${
                          isActive ? "text-[#4FC3F7]" : "text-[#1B8AC7]/60"
                        }`}
                      >
                        {layer.number}
                      </span>
                      <div className="flex-1">
                        <p
                          className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                            isActive ? "text-[#4FC3F7]" : "text-muted"
                          }`}
                        >
                          {layer.tag}
                        </p>
                        <p
                          className={`mt-1 font-display text-base font-semibold ${
                            isActive ? "text-white" : "text-heading"
                          }`}
                        >
                          {layer.title}
                        </p>
                      </div>
                      <Icon
                        className={`h-5 w-5 shrink-0 ${
                          isActive ? "text-[#4FC3F7]" : "text-[#1B8AC7]/70"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right detail */}
            <motion.div
              key={activeLayer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-7"
            >
              <div className="relative h-full overflow-hidden rounded-3xl border border-border-light bg-gradient-to-br from-surface-secondary to-white p-8 sm:p-10">
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#1B8AC7]/10 blur-3xl" />

                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#1B8AC7]">
                  Layer {layers[activeLayer].number} · {layers[activeLayer].tag}
                </p>
                <h3 className="mt-3 font-display text-3xl font-bold text-heading">
                  {layers[activeLayer].title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-body">
                  {layers[activeLayer].desc}
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border-light bg-white p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                      Catches
                    </p>
                    <p className="mt-2 text-sm font-medium text-heading">
                      {activeLayer === 0 && "Malware · bulk phishing · known-bad URLs"}
                      {activeLayer === 1 && "BEC · vendor fraud · zero-day social engineering"}
                      {activeLayer === 2 && "Domain spoofing · lookalike-from-header attacks"}
                      {activeLayer === 3 && "Click-happy users · credential harvesting attempts"}
                      {activeLayer === 4 && "Post-click compromise · insider access abuse"}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#1B8AC7]/20 bg-[#1B8AC7]/5 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#045891]">
                      Typical owner
                    </p>
                    <p className="mt-2 text-sm font-medium text-heading">
                      {activeLayer === 0 && "Messaging / email admin team"}
                      {activeLayer === 1 && "Security operations · SOC"}
                      {activeLayer === 2 && "DNS · domain administrator"}
                      {activeLayer === 3 && "Security awareness / HR partnership"}
                      {activeLayer === 4 && "Incident response · IR playbook owner"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      )}

   
      {/* ───────── VENDOR COMPARISON ───────── */}
      <section
        id="vendor-comparison"
        className="relative bg-surface-secondary py-16 scroll-mt-24 sm:py-24"
      >
        <div className="shell">
          <SectionHeader
            title={
              <>
                Email security vendor comparison for{" "}
                <span className="gradient-text">UAE buyers</span>
              </>
            }
            description="No single email security platform wins everything. The right fit depends on your stack, your SOC capacity, and the threats you actually face, from commodity phishing to BEC. Artiflex suggests the email security solution that best fits your environment."
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

          {/* Buyer star comparison matrix */}
          <VendorComparisonMatrix
            bare
            heading=""
            highlight=""
            intro=""
            vendors={emailCompareVendors}
            rows={emailCompareRows}
            onContact={openContact}
          />

          {/* Vendor cards */}
          {/* <div className="mx-auto mt-12 max-w-4xl text-center sm:mt-16">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Detailed Comparison on Email Security Vendors
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Strengths, blind spots, and the buyer profile each vendor was built for. Recommendations are based on UAE deployment patterns, not vendor tier.
            </p>
          </div> */}

          <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:mt-16 lg:grid-cols-2 lg:items-stretch">
            {vendors.map((v, idx) => {
              const recommended = v.best.includes("Recommended");
              const isOrphan =
                idx === vendors.length - 1 && vendors.length % 2 === 1;
              const cardClass = `group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(4,88,145,0.12)] sm:p-8 ${
                recommended
                  ? "border-brand-blue/30 shadow-[0_4px_20px_rgba(27,138,199,0.10)]"
                  : "border-border-light shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-brand-blue/25"
              }`;

              const cardContent = (
                <>
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

                  {v.hasDetail && (
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-xs font-semibold text-brand-blue transition-all group-hover:gap-2.5 sm:text-sm">
                      View {v.name.split(" ")[0]} details
                      <span aria-hidden="true">→</span>
                    </span>
                  )}
                </>
              );

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
                  {v.hasDetail ? (
                    <Link
                      to={`/cybersecurity/email/${v.slug}`}
                      aria-label={`View details for ${v.name}`}
                      className={cardClass}
                    >
                      {cardContent}
                    </Link>
                  ) : (
                    <div className={cardClass}>{cardContent}</div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="mx-auto mt-12 max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-br from-[#0A3D6B] via-[#04101E] to-[#020617] p-8 text-center shadow-xl shadow-[#1B8AC7]/10 sm:p-12">
            <p className="text-base leading-relaxed text-slate-300 sm:text-lg md:text-xl">
              <span className="font-semibold text-white">Artiflex IT is a Platinum Sophos Partner</span> and a delivery partner for Check Point Harmony, Fortra (Cloud Email Protection, Clearswift, Agari, PhishLabs, Terranova), Microsoft Defender for Office 365, Proofpoint, Darktrace, KnowBe4, and Mimecast. The vendor follows the assessment, not the other way around.
            </p>
          </div>

          {/* ───────── DECISIVE ADVANTAGES (5.5) ───────── */}
          <div className="mx-auto mt-20 max-w-4xl text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Why each recommendation wins
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each of the three recommended platforms answers a different buying question. Pick the one whose decisive advantage maps to the pain you actually need to solve.
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

          {/* Capability ratings table */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Comparison
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Capability ratings for the nine leading email security platforms across Gartner positioning, architecture, anti-phishing, threat extraction, DMARC and brand impersonation, outbound DLP, phishing-site takedown, awareness training, sovereignty, and total cost. A gold ★ marker denotes best-in-class performance.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + emailGartnerVendors.length * 116) }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-5 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">
                      Capability
                    </th>
                    {emailGartnerVendors.map((v, i) => (
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
                  {emailFeatureRows.map((row, rIdx) => (
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
                        const t = emailTierStyles[cell.tier];
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
            {(["best", "excellent", "veryStrong", "strong", "good", "moderate"] as EmailTier[]).map((t) => {
              const s = emailTierStyles[t];
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

      {/* ───────── BUYER'S DECISION GUIDE (5.6) ───────── */}
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
            description="The shortest path from buying signal to vendor pick. Each row maps a real procurement conversation to the platform that solves it best in the UAE market."
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
                          {row.vendor}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-slate-500">
            Not sure which conversation you are in? Book a 30-minute scoping call and we will map your environment, threat profile, and existing licenses to the right platform.
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
            description="We don't sell boxes. We deliver email security outcomes: assess, design, deploy, manage. Every stage produces something an auditor can read and a CFO can sign off on."
            centered
          />

          <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-4">
            {[
              {
                title: "Assess",
                duration: "1–2 weeks",
                summary:
                  "DMARC / SPF / DKIM posture review, gateway and M365 / Google configuration audit, BEC and impersonation exposure, user-click risk and historical incident review.",
                deliverable:
                  "Current-state report, vendor recommendation with rationale, three-year TCO comparison.",
              },
              {
                title: "Design",
                duration: "1–2 weeks",
                summary:
                  "Layered architecture for your environment: authentication enforcement to p=reject, gateway / API integration, anti-phishing and BEC policy, sandboxing, awareness-training plan, SIEM logging.",
                deliverable:
                  "Approved architecture, phased rollout sequence, change-management plan.",
              },
              {
                title: "Deploy",
                duration: "2–4 weeks",
                summary:
                  "Phased rollout with rollback at each stage. DMARC ramp from monitor to enforce, gateway / API cutover, policy tuning, quarantine workflows, day-1 hypercare.",
                deliverable:
                  "Live email security stack, audit-ready documentation, runbooks for your team.",
              },
              {
                title: "Manage",
                duration: "Ongoing",
                summary:
                  "24/7 monitoring, phishing / BEC triage, DMARC report management, policy tuning, threat-intelligence updates, awareness-training cycles, monthly board-readable reporting.",
                deliverable:
                  "Operational email security with SLAs you can actually rely on. Or a clean handover to your team.",
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
              14+ years of UAE email security delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when Check Point wins, when Sophos wins, when Fortra wins, and when none of them is the right answer. The point of an honest assessment is honest answers.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years in UAE email security" },
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
                  Check Point Harmony Email, Sophos, Fortra, Proofpoint, Mimecast, Microsoft Defender for Office 365 and more: active delivery experience across the field.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Compliance frameworks
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  NESA / TDRA IAS, UAE PDPL, ISO 27001, NIST CSF 2.0, and DMARC p=reject enforcement, with audit-ready evidence delivered as part of the project.
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
              Book a free email security assessment
            </Link>
            <Link
              to="/cybersecurity/workspace-protection-sse-sase"
              className="inline-flex items-center justify-center rounded-lg border border-white/15 px-6 py-3 font-display text-sm font-medium text-slate-300 transition-colors hover:border-[#28B5E1]/40 hover:text-white sm:text-base"
            >
              Explore Workspace Protection →
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
            description="What businesses ask us most about email security, phishing, BEC and email authentication."
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
        title="Stop the attack before it starts"
        description="Phishing, BEC, and domain spoofing are solvable problems - with the right layers, enforcement, and team training in place."
        primaryButton={{ text: "Book an Email Security Review", action: "modal" }}
      />
    </>
  );
}
