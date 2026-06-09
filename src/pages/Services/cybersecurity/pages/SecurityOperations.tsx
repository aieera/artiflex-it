import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import {
  ShieldIcon,
  EyeIcon,
  ActivityIcon,
} from "@/components/icons";

/* ───────── CAPABILITY MAP ───────── */

type Capability = {
  tag: string;
  title: string;
  desc: string;
  focus: string;
  href?: string;
  action?: "modal";
  cta: string;
};

const capabilities: Capability[] = [
  {
    tag: "Subpage",
    title: "MDR",
    desc: "Managed Detection & Response. 24/7 analysts, validated playbooks and active response tied to your SIEM.",
    focus: "Focus: Rapid7 MDR · Sophos MDR",
    href: "/cybersecurity/security-operations/mdr",
    cta: "Explore MDR",
  },
  {
    tag: "Subpage",
    title: "NDR",
    desc: "Network Detection & Response. See what endpoints cannot: lateral movement, C2 and anomalous east-west traffic.",
    focus: "Focus: Darktrace · Vectra AI · ExtraHop",
    href: "/cybersecurity/security-operations/ndr",
    cta: "Explore NDR",
  },
  {
    tag: "Subpage",
    title: "SIEM",
    desc: "Centralise logs, correlate signals and detect threats with analytics and UEBA across cloud, endpoint and identity.",
    focus: "Focus: Rapid7 InsightIDR / Incident Command",
    href: "/cybersecurity/security-operations/siem",
    cta: "Explore SIEM",
  },
];

/* ───────── HONEYCOMB LINEUP DATA ───────── */

type SocPlatform = {
  slug: string;
  name: string;
  logo: string;
  rank?: string;
  featured?: boolean;
};

const socPlatforms: SocPlatform[] = [
  { slug: "rapid7", name: "Rapid7", logo: "/logos/rapid7.png", rank: "#1 SIEM/MDR", featured: true },
  { slug: "sophos-mdr", name: "Sophos MDR", logo: "/logos/sophos.svg", rank: "Managed MDR" },
  { slug: "darktrace", name: "Darktrace", logo: "/logos/Darktrace.png", rank: "NDR · Self-Learning AI" },
  { slug: "vectra", name: "Vectra AI", logo: "/logos/Vectra.png", rank: "NDR · Identity & Cloud" },
  { slug: "extrahop", name: "ExtraHop", logo: "/logos/ExtraHop.png", rank: "NDR · Forensics" },
];

/* ───────── VENDOR COMPARISON MATRIX ───────── */

type StarCell = { stars: number; note: string };
type VerdictCell = { recommended?: boolean; rank?: string; text: string };
type MatrixRow =
  | { label: string; type: "text"; cells: string[] }
  | { label: string; type: "stars"; cells: StarCell[] }
  | { label: string; type: "verdict"; cells: VerdictCell[] };

const matrixVendors = [
  { name: "Rapid7", featured: true },
  { name: "Sophos MDR" },
  { name: "Darktrace" },
  { name: "Vectra AI" },
  { name: "ExtraHop" },
];

const matrixRows: MatrixRow[] = [
  {
    label: "Primary discipline",
    type: "text",
    cells: ["SIEM + MDR", "Managed Detection & Response", "Network Detection & Response", "Network Detection & Response", "Network Detection & Response"],
  },
  {
    label: "Founded / Heritage",
    type: "text",
    cells: [
      "2000, Boston. Metasploit lineage.",
      "Sophos (Astaro and Cyberoam heritage).",
      "2013, Cambridge UK. Self-Learning AI pioneer.",
      "2010, San Jose. AI-driven NDR.",
      "2007, Seattle. Wire-data analytics.",
    ],
  },
  {
    label: "Detection approach",
    type: "stars",
    cells: [
      { stars: 5, note: "AI-native SIEM. Incident Command, UEBA." },
      { stars: 5, note: "Human-led plus Synchronized Security." },
      { stars: 5, note: "Self-Learning AI baselines normal, flags deviation." },
      { stars: 5, note: "Attack Signal Intelligence across network, identity, cloud." },
      { stars: 5, note: "Packet-level ML with decryption and forensics." },
    ],
  },
  {
    label: "Coverage",
    type: "text",
    cells: [
      "Cloud, endpoint, identity, network",
      "Endpoint, network, cloud, identity",
      "Network, email, cloud and SaaS",
      "Network, identity, cloud and SaaS",
      "Network, cloud and encrypted traffic",
    ],
  },
  {
    label: "Response & automation",
    type: "stars",
    cells: [
      { stars: 5, note: "Incident Command plus Rapid7 MDR." },
      { stars: 5, note: "Fully managed 24/7 response." },
      { stars: 5, note: "Autonomous response (Antigena)." },
      { stars: 4, note: "Prioritised signal, MDR available." },
      { stars: 4, note: "Guided response, strong forensics." },
    ],
  },
  {
    label: "Delivery model",
    type: "text",
    cells: [
      "SaaS platform plus managed",
      "Fully managed service",
      "Self-learning appliance plus SaaS",
      "SaaS plus sensors",
      "SaaS (RevealX) plus sensors",
    ],
  },
  {
    label: "Recognition",
    type: "text",
    cells: [
      "7x Gartner SIEM Magic Quadrant",
      "Top-rated MDR. Artiflex Sophos Platinum Partner.",
      "NDR pioneer, thousands of deployments",
      "Leader in AI-driven NDR",
      "Strong NDR for forensics and decryption",
    ],
  },
  {
    label: "Best suited for",
    type: "text",
    cells: [
      "Cloud-forward SOCs needing SIEM plus MDR",
      "Teams wanting a managed outcome",
      "Behavioural NDR across IT, cloud and email",
      "Identity and cloud-centric attack detection",
      "Deep packet forensics and encrypted-traffic visibility",
    ],
  },
  {
    label: "Strategic Verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "Recommended for SIEM and MDR. AI-native, analyst-first detection and response." },
      { recommended: true, text: "Recommended MDR. Fully managed, Synchronized Security. Artiflex is a Sophos Platinum Partner." },
      { recommended: true, text: "Recommended NDR. Self-Learning AI catches novel and insider threats." },
      { text: "Strong NDR where identity and cloud attack paths dominate." },
      { text: "Strong NDR for forensic depth and encrypted-traffic analysis." },
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
    id: "rapid7",
    name: "Rapid7 InsightIDR / Incident Command",
    best: "SIEM & MDR (Recommended)",
    strength:
      "Founded in 2000 in Boston and shaped by its Metasploit lineage, Rapid7 has been named in the Gartner Magic Quadrant for SIEM seven consecutive years. Its AI-native Incident Command platform unifies SIEM, UEBA, threat intelligence and automation with analyst-first workflows across cloud, endpoint, identity and network. It ties directly into Rapid7 MDR for end-to-end detection and response.",
    watch:
      "It is primarily an IT and cloud SOC platform. Network blind spots are best closed with a dedicated NDR layer that feeds detections back into the SIEM.",
    logo: "/logos/rapid7.png",
  },
  {
    id: "sophos-mdr",
    name: "Sophos MDR",
    best: "Managed Detection & Response (Recommended)",
    strength:
      "Sophos, with its Astaro and Cyberoam heritage, delivers a fully managed 24/7 MDR service led by human analysts with active response. Its Synchronized Security ties detection and response together across endpoint, network, cloud and identity. Artiflex is a Sophos Platinum Partner, so the outcome is delivered hands-on.",
    watch:
      "It is an outcome-led managed service rather than a platform you operate yourself. Its value depends on log coverage and the response authority you grant, which we define during the assessment.",
    logo: "/logos/sophos.svg",
  },
  {
    id: "darktrace",
    name: "Darktrace",
    best: "Network Detection & Response (Recommended)",
    strength:
      "Founded in 2013 in Cambridge UK, Darktrace pioneered Self-Learning AI for network detection. It baselines what normal looks like for your environment, then flags deviations across network, email, cloud and SaaS, catching novel and insider threats that signatures miss. Autonomous response (Antigena) can act on threats in real time.",
    watch:
      "Behavioural AI needs a learning period and tuning to settle. It is most powerful as a feed into SIEM or MDR rather than a standalone island.",
    logo: "/logos/Darktrace.png",
  },
  {
    id: "vectra",
    name: "Vectra AI",
    best: "Network Detection & Response",
    strength:
      "Founded in 2010 in San Jose, Vectra AI applies Attack Signal Intelligence across network, identity and cloud to surface and prioritise real attacks. It excels where identity and cloud attack paths dominate, cutting alert noise so analysts focus on the signals that matter. MDR is available where a managed outcome is preferred.",
    watch:
      "Its strength is detection and prioritisation rather than deep packet forensics. It works best correlated into a SIEM rather than as a single source of truth.",
    logo: "/logos/Vectra.png",
  },
  {
    id: "extrahop",
    name: "ExtraHop",
    best: "Network Detection & Response",
    strength:
      "Founded in 2007 in Seattle on wire-data analytics, ExtraHop RevealX delivers packet-level NDR with machine learning, decryption and forensic depth. It gives strong visibility into encrypted traffic and supports detailed investigation and guided response when an incident needs to be reconstructed.",
    watch:
      "It is focused on network and forensics rather than managed response. It delivers the most value when its detections feed a SIEM or MDR for correlation.",
    logo: "/logos/ExtraHop.png",
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

const featureVendors = ["Rapid7", "Sophos MDR", "Darktrace", "Vectra AI", "ExtraHop"];

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  { label: "Log Correlation / SIEM", cells: [ { tier: "best", note: "AI-native Incident Command" }, { tier: "excellent", note: "Managed" }, { tier: "good", note: "Feeds SIEM" }, { tier: "good", note: "Correlated into SIEM" }, { tier: "strong", note: "Wire-data analytics" } ] },
  { label: "Threat Detection (UEBA / ML)", cells: [ { tier: "best", note: "UEBA plus threat intel" }, { tier: "excellent", note: "Human-led plus ML" }, { tier: "best", note: "Self-Learning AI" }, { tier: "excellent", note: "Attack Signal Intelligence" }, { tier: "excellent", note: "Packet-level ML" } ] },
  { label: "Managed Response (MDR)", cells: [ { tier: "excellent", note: "Rapid7 MDR" }, { tier: "best", note: "Fully managed 24/7" }, { tier: "strong", note: "Antigena" }, { tier: "strong", note: "MDR available" }, { tier: "good", note: "Guided response" } ] },
  { label: "Network Detection (NDR)", cells: [ { tier: "strong", note: "Via NDR layer" }, { tier: "strong", note: "Synchronized Security" }, { tier: "best", note: "Behavioural NDR pioneer" }, { tier: "excellent", note: "AI-driven NDR" }, { tier: "excellent", note: "Packet-level NDR" } ] },
  { label: "Cloud & Identity Coverage", cells: [ { tier: "excellent", note: "Cloud, endpoint, identity" }, { tier: "excellent", note: "Cloud and identity" }, { tier: "strong", note: "Cloud and SaaS" }, { tier: "best", note: "Identity and cloud paths" }, { tier: "strong", note: "Cloud traffic" } ] },
  { label: "Encrypted Traffic / Forensics", cells: [ { tier: "good", note: "Log-based" }, { tier: "good", note: "Managed visibility" }, { tier: "strong", note: "Behavioural visibility" }, { tier: "strong", note: "Prioritised signal" }, { tier: "best", note: "Decryption and forensics" } ] },
  { label: "Compliance Reporting", cells: [ { tier: "excellent", note: "Audit-ready evidence" }, { tier: "excellent", note: "Managed reporting" }, { tier: "good", note: "Detection feed" }, { tier: "good", note: "Detection feed" }, { tier: "strong", note: "Forensic records" } ] },
  { label: "Deployment Simplicity", cells: [ { tier: "excellent", note: "SaaS" }, { tier: "best", note: "Managed" }, { tier: "strong", note: "Appliance plus SaaS" }, { tier: "strong", note: "SaaS plus sensors" }, { tier: "good", note: "RevealX plus sensors" } ] },
];

/* ───────── DECISION FRAMEWORK ───────── */

const decisionQuestions = [
  {
    q: "What log sources and telemetry do you have, and which are missing?",
    a: "SIEM value is bounded by what it can see. We inventory cloud, identity, endpoint and network sources, then prioritise the gaps that leave you blind to the threats that matter most.",
  },
  {
    q: "Do you want to run the SOC, co-manage it, or hand the outcome over?",
    a: "This determines whether you need a SIEM platform (Rapid7), a managed service (Rapid7 MDR or Sophos MDR), or a hybrid co-managed model where your team keeps control with 24/7 backup.",
  },
  {
    q: "How much of your risk lives in network traffic the endpoints and logs cannot see?",
    a: "Lateral movement, command-and-control, data staging and unmanaged or BYO devices often only show in traffic. That is where NDR (Darktrace, Vectra AI or ExtraHop) earns its place, feeding the SIEM rather than acting as an island.",
  },
  {
    q: "What compliance frameworks must you prove, and to whom?",
    a: "PCI DSS, ISO 27001, NESA, ADHICS and UAE PDPL each mandate specific evidence. We design SIEM logging, detection coverage and reporting to turn 'we think we are compliant' into auditable proof.",
  },
  {
    q: "How fast must you detect and respond, and who is on call at 3am?",
    a: "Mean-time-to-detect and mean-time-to-respond targets, and whether you have 24/7 staffing, decide how much of the response loop should be automated or managed.",
  },
];

/* ───────── DELIVERY MODEL ───────── */

const deliveryStages = [
  {
    title: "Assess",
    duration: "2 weeks",
    summary:
      "Telemetry inventory, detection-coverage mapping (MITRE ATT&CK), compliance-gap analysis, current MTTD/MTTR baseline.",
    deliverable: "Current-state report, platform recommendation with rationale, three-year TCO comparison.",
  },
  {
    title: "Design",
    duration: "2–4 weeks",
    summary:
      "Use-case and detection-rule design, log-source onboarding plan, NDR sensor placement, response playbooks, SIEM/MDR architecture.",
    deliverable: "Approved architecture, detection backlog, runbook framework.",
  },
  {
    title: "Deploy",
    duration: "3–8 weeks",
    summary:
      "Phased onboarding of log sources, sensor deployment, rule tuning to cut false positives, playbook validation, day-1 hypercare.",
    deliverable: "Live SOC tooling, tuned detections, audit-ready documentation.",
  },
  {
    title: "Manage",
    duration: "Ongoing",
    summary:
      "24/7 monitoring, detection engineering, threat-intel tuning, incident response, monthly board-readable reporting, quarterly reviews.",
    deliverable: "An operational SOC with SLAs you can rely on, or a clean handover to your team.",
  },
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "What is the difference between SIEM, MDR and NDR?",
    answer:
      "SIEM is the platform that collects and correlates logs to detect threats. MDR is a managed service of analysts and automation that operates detection and response on your behalf. NDR watches network traffic for threats endpoints and logs miss. They are complementary layers, not alternatives.",
  },
  {
    question: "Why does Artiflex recommend Rapid7 for SIEM?",
    answer:
      "Rapid7 has been named in the Gartner Magic Quadrant for SIEM seven consecutive years and its AI-native Incident Command platform unifies SIEM, UEBA and automation with analyst-first workflows, integrating directly with Rapid7 MDR. That said, the right answer depends on your log sources, team and budget. We assess before recommending.",
  },
  {
    question: "Do we need NDR if we already have a SIEM and EDR?",
    answer:
      "Often yes. Endpoints and logs miss what only shows in traffic: lateral movement, command-and-control, data staging and unmanaged devices. NDR (Darktrace, Vectra AI or ExtraHop) adds that visibility and feeds detections into the SIEM for one correlated view.",
  },
  {
    question: "How does compliance fit into Security Operations?",
    answer:
      "Your SIEM and MDR produce the detection, logging and audit evidence regulators expect. We design logging and reporting to meet PCI DSS, ISO 27001, NESA, ADHICS and UAE PDPL, with audit-ready output as part of the engagement.",
  },
  {
    question: "Can you co-manage our existing SOC?",
    answer:
      "Yes. We offer fully managed, co-managed and assessment-only engagements. Your team can retain control with 24/7 backup, or hand the outcome over entirely.",
  },
  {
    question: "Do your SOC deployments cover NESA and UAE PDPL?",
    answer:
      "Yes. We design detection, logging and reporting to meet NESA, UAE PDPL, ISO 27001 and ADHICS, and deliver audit-ready evidence as part of the engagement.",
  },
];

/* ───────── HERO ───────── */

function SecurityOperationsHero() {
  const { open: openContact } = useContactModal();
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-navy-deep">
      <div aria-hidden="true" className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/cybersecurity.png')" }} />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/70 to-navy-deep/90" />

      {/* Breadcrumb band */}
      <div className="relative z-10 border-b border-white/5">
        <div className="shell flex w-full items-center justify-end gap-4 pt-24 pb-3 sm:pt-28">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center justify-end gap-2 text-[10px] text-slate-400 sm:text-[11px]">
              <li><Link to="/" className="transition-colors hover:text-white">Home</Link></li>
              <li className="text-slate-600">/</li>
              <li><Link to="/cybersecurity" className="transition-colors hover:text-white">Cybersecurity</Link></li>
              <li className="text-slate-600">/</li>
              <li><span className="font-medium text-[#28B5E1]">Security Operations</span></li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero masthead */}
      <div className="relative z-10 mx-auto flex w-full max-w-[88rem] flex-1 flex-col px-4 py-10 sm:px-5 sm:py-12 lg:px-6 lg:py-14">
        <div className="grid flex-1 grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:items-center lg:gap-8 xl:gap-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="w-full">
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[5rem]">
              Security Operations{" "}
              <span className="gradient-text">UAE</span>
              <span className="block font-display text-xl font-light leading-tight text-slate-300 sm:mt-3 sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl">
                SIEM, MDR &amp; NDR
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:mt-6 sm:text-base xl:text-lg">
              Artiflex IT designs, deploys and runs the modern SOC across the UAE, Oman and Saudi Arabia, unifying SIEM, MDR and NDR into one detection-and-response programme. <span className="font-semibold text-white">Rapid7, Sophos MDR, Darktrace, Vectra AI and ExtraHop</span>, picked on threat model, log sources and budget, not a SKU.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link to="/blog/origin-siem-soc-monitoring" className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#28B5E1]/40 bg-[#28B5E1]/10 px-4 py-2 text-xs font-semibold text-[#28B5E1] backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1] hover:bg-[#28B5E1]/20 hover:text-white sm:px-5 sm:py-2.5 sm:text-sm">
                Read Origin Story
                <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </Link>
              <button onClick={openContact} className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-5 sm:py-2.5 sm:text-sm">
                Get a Free SOC Assessment
                <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </button>
            </div>
          </motion.div>

          {/* Portfolios + Origin Story cards */}
          <div>
            {(() => {
              const socTopics: {
                label: string;
                icon: typeof ShieldIcon;
                productHref: string;
                originHref: string;
              }[] = [
                { label: "MDR", icon: ShieldIcon, productHref: "/cybersecurity/security-operations/mdr", originHref: "/blog/origin-mdr" },
                { label: "NDR", icon: EyeIcon, productHref: "/cybersecurity/security-operations/ndr", originHref: "/blog/origin-ndr" },
                { label: "SIEM", icon: ActivityIcon, productHref: "/cybersecurity/security-operations/siem", originHref: "/blog/origin-siem" },
              ];

              const tileCls =
                "group relative flex min-h-[42px] min-w-0 items-center gap-1.5 overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.035] px-1.5 py-1.5 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/55 hover:bg-gradient-to-br hover:from-[#045891]/40 hover:to-[#1B8AC7]/20 hover:shadow-[0_10px_24px_-8px_rgba(40,181,225,0.5)] sm:gap-2 sm:px-2";

              const renderGrid = (variant: "origin" | "portfolio") => (
                <div className="mt-2.5 grid grid-cols-3 gap-1.5 sm:gap-2">
                  {socTopics.map((t) => {
                    const Icon = t.icon;
                    const href = variant === "origin" ? t.originHref : t.productHref;
                    return (
                      <Link key={`${variant}-${t.label}`} to={href} className={tileCls}>
                        <span aria-hidden className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#28B5E1]/10 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100" />
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
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5">
                  {/* Portfolios */}
                  <div className={cardCls}>
                    <div aria-hidden className="pointer-events-none absolute -top-16 -left-12 h-40 w-40 rounded-full bg-[#1B8AC7]/[0.1] blur-3xl" />
                    <div aria-hidden className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/40 to-transparent" />
                    <div className="relative">
                      <div className="flex items-center gap-2">
                        <span aria-hidden className="h-1 w-6 rounded-full bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1]" />
                        <h3 className="font-display text-sm font-bold text-white sm:text-base">
                          Portfolios<span className="text-[#28B5E1]">.</span>
                        </h3>
                      </div>
                      <p className="mt-1 text-[10.5px] leading-relaxed text-slate-300/80">
                        Explore the SOC discipline that fits your stack.
                      </p>
                      {renderGrid("portfolio")}
                    </div>
                  </div>

                  {/* The Origin Story */}
                  <div className={cardCls}>
                    <div aria-hidden className="pointer-events-none absolute -top-16 -right-12 h-40 w-40 rounded-full bg-[#28B5E1]/[0.09] blur-3xl" />
                    <div aria-hidden className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/40 to-transparent" />
                    <div className="relative">
                      <div className="flex items-center gap-2">
                        <span aria-hidden className="h-1 w-6 rounded-full bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1]" />
                        <h3 className="font-display text-sm font-bold text-white sm:text-base">
                          The Origin Story<span className="text-[#28B5E1]">.</span>
                        </h3>
                      </div>
                      <p className="mt-1 text-[10.5px] leading-relaxed text-slate-300/80">
                        Read the story behind each SOC pillar.
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

      {/* Scroll affordance */}
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

export default function SecurityOperations() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Security Operations UAE | SIEM, MDR & NDR | Artiflex IT</title>
        <meta
          name="description"
          content="UAE Security Operations: SIEM, MDR and NDR in one detection-and-response programme. An overview of the three SOC disciplines Artiflex designs, deploys and manages across the UAE."
        />
        <link rel="canonical" href="https://artiflexit.com/cybersecurity/security-operations" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Security Operations (SIEM, MDR, NDR)",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description": "UAE Security Operations delivery across Rapid7 (SIEM/MDR), Sophos MDR, and NDR platforms Darktrace, Vectra AI and ExtraHop.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((f) => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer } })),
          })}
        </script>
      </>

      <SecurityOperationsHero />

      {/* ───────── CAPABILITY MAP ───────── */}
      <section id="capabilities" className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">The Capability Map</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">The disciplines of a modern SOC</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Security Operations is not a single product. It is a set of disciplines that feed each other: telemetry into SIEM, humans and automation through MDR, and network visibility from NDR.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => {
              const body = (
                <>
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#045891] to-[#28B5E1]"
                  />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#1B8AC7]">{c.tag}</span>
                  <h3 className="mt-2 font-display text-xl font-bold text-slate-900">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{c.desc}</p>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-slate-500">{c.focus}</p>
                  <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1B8AC7] transition-colors">
                    {c.cta}
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                  </p>
                </>
              );
              const baseCls = "group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1B8AC7]/60 hover:shadow-[0_20px_60px_-12px_rgba(27,138,199,0.20)]";
              if (c.action === "modal") {
                return (
                  <button key={c.title} type="button" onClick={openContact} className={`${baseCls} text-left`}>
                    {body}
                  </button>
                );
              }
              const isAnchor = c.href?.startsWith("#");
              if (isAnchor) {
                return (
                  <a key={c.title} href={c.href} className={baseCls}>
                    {body}
                  </a>
                );
              }
              return (
                <Link key={c.title} to={c.href ?? "#"} className={baseCls}>
                  {body}
                </Link>
              );
            })}
          </div>

          {/* COMBINATION / CONVERGED BUYING PATHS */}
          <div className="mx-auto mt-12 max-w-5xl rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
                Need more than one discipline?
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-slate-900 sm:text-[1.75rem]">
                Yes, you can buy the combination, two ways
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                Most UAE SOCs need more than one of SIEM, MDR and NDR, and modern detection and
                response is converging onto unified platforms. We run the assessment first, then
                design the right mix around your telemetry, threat model and compliance scope.
              </p>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <div className="rounded-xl border border-border-light bg-white p-5 sm:p-6">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#1B8AC7]">
                  Converged platform
                </p>
                <h4 className="mt-2 font-display text-lg font-bold text-slate-900">One vendor, one roadmap</h4>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Rapid7 unifies SIEM, UEBA and automation in one Incident Command platform, and
                  managed providers such as Sophos fold detection and 24/7 response into a single
                  service. Best when you want one support relationship, one roadmap and the lowest
                  integration effort.
                </p>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5 sm:p-6">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                  Best-of-breed fabric
                </p>
                <h4 className="mt-2 font-display text-lg font-bold text-slate-900">The strongest tool in each lane</h4>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  Pair the leader in each lane, for example Rapid7 for SIEM and MDR, Sophos MDR for a
                  fully managed outcome, and Darktrace, Vectra AI or ExtraHop for network detection,
                  integrated into one detection fabric. Best when no single vendor leads in every
                  discipline you need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── DECISION FRAMEWORK ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Decision Framework</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Questions we ask before designing a SOC</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Detection programmes get cleaner when the questions are direct. Walk through these and the architecture usually falls out by itself.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
            {decisionQuestions.map((q, i) => (
              <article key={q.q} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#045891] to-[#1B8AC7] font-display text-sm font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-slate-900">{q.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{q.a}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── DELIVERY MODEL ───────── */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="How we work"
            title={<>Our SOC <span className="gradient-text">delivery model</span></>}
            description="We don't sell licences. We deliver detection-and-response outcomes: assess, design, deploy, manage. Every stage produces something an auditor can read and a CFO can sign off on."
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

      {/* ───────── WHY ARTIFLEX ───────── */}
      <section className="relative overflow-hidden bg-navy-deep py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(27,138,199,0.18),transparent_60%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#28B5E1]">Why Artiflex IT</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">14+ years of UAE security operations</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when Rapid7 wins, when a managed service wins, and when your existing tooling just needs tuning. The point of an honest assessment is honest answers.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years in UAE security delivery" },
              { value: "500+", label: "Projects delivered GCC-wide" },
              { value: "20+", label: "Certified security engineers" },
              { value: "24/7", label: "Managed SOC support" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-sm transition-colors duration-300 hover:border-[#28B5E1]/30">
                <p className="font-display text-3xl font-bold leading-none text-white sm:text-4xl">{stat.value}</p>
                <p className="mt-3 text-xs leading-relaxed text-slate-400 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">Platform coverage</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Rapid7 (SIEM/MDR) and Sophos MDR (managed), with Darktrace, Vectra AI and ExtraHop for NDR. Active delivery across the full SOC stack.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">Compliance frameworks</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  NESA, UAE PDPL, ISO 27001, NIST CSF 2.0, IEC 62443 and ADHICS-aligned implementations, with audit-ready evidence delivered as part of the project.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">Coverage area</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  On-site across Dubai, Abu Dhabi and Sharjah. Remote across the UAE, Oman and Saudi Arabia. 24/7 SOC support for managed customers.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">Engagement model</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Fully managed, co-managed or assessment-only. No vendor lock-in, no theatre, no upselling. The assessment drives the answer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Knowledge Base"
            title={<>Frequently <span className="gradient-text">asked</span> questions</>}
            description="What businesses ask us most about SIEM, MDR and NDR."
            centered
          />

          <div className="mt-12 grid gap-6 sm:mt-14 lg:grid-cols-12 lg:gap-8">
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
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 shrink-0 transition-transform duration-300 ${isActive ? "translate-x-0.5" : "opacity-50 group-hover:translate-x-0.5 group-hover:opacity-100"}`}>
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
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

      {/* ───────── CTA ───────── */}
      <CTASection
        title="Get the Security Operations Selection Guide"
        description="A vendor-neutral comparison of SIEM, MDR and NDR options, with TCO analysis, a detection-coverage matrix and real UAE deployment case studies."
        primaryButton={{ text: "Book a free SOC posture assessment", action: "modal" }}
      />
    </>
  );
}
