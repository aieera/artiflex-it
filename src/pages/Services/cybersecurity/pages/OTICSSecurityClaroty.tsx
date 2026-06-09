import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import {
  CheckIcon,
  ShieldIcon,
  EyeIcon,
  LayersIcon,
  NetworkIcon,
  LockIcon,
  CloudIcon,
  ServerIcon,
} from "@/components/icons";

const vendor = {
  name: "Claroty",
  vendorCompany: "Claroty · Team8 incubated · Founded 2015",
  bestFor: "Recommended for Complex OT Estates · Pharma · Healthcare",
  tagline: "Cyber-physical systems protection across IT, OT and IoMT",
  description:
    "Founded in 2015 with Team8 incubation, Claroty is a Gartner Leader for Cyber-Physical Systems Protection. The platform spans the broadest module set on the market, xDome (cloud-managed), Continuous Threat Detection (CTD, on-premises), Secure Remote Access (SRA) and Edge, with particular strength in pharma, healthcare (Medigate IoMT lineage), manufacturing and mixed device estates. Artiflex IT's recommended choice for the largest and most complex UAE OT programmes.",
  logo: "/logos/Claroty.webp",
};

const overviewParagraphs = [
  "Claroty was founded in 2015 and incubated by Team8, the Israeli cybersecurity foundry, and has grown into one of the two reference platforms for industrial cybersecurity (Gartner Magic Quadrant for CPS Protection Platforms). The acquisition of Medigate in 2021 brought best-in-class connected-medical-device (IoMT) visibility, making Claroty the dominant choice in healthcare alongside Nozomi.",
  "The Claroty platform spans four major products. xDome is the cloud-managed flagship for multi-site OT, IoT and IoMT discovery, exposure management and threat detection. Continuous Threat Detection (CTD) is the on-premises sibling, the heritage product preferred where data residency or air-gap requirements rule out cloud. Secure Remote Access (SRA) is one of the strongest dedicated OT remote-access modules on the market. Edge is the lightweight asset-collection layer that performs passive and (optionally) safe active queries.",
  "Crucially, Claroty supports both passive monitoring and ICS-aware active discovery. The active queries are deliberately engineered to be safe in production environments, which gives the most complete asset inventory of any platform when the plant culture and safety case permits.",
];

const overviewCapabilities = [
  "Gartner Leader, CPS Protection Platforms",
  "xDome (cloud) + CTD (on-prem) + SRA + Edge",
  "Medigate IoMT lineage for healthcare",
  "Passive monitoring and safe active queries",
  "Broadest IoT and IoMT device coverage",
  "Strongest dedicated OT remote-access (SRA)",
  "Native SIEM and SOAR integration",
  "IEC 62443, HIPAA, NESA and ADHICS evidence",
];

const strengths: { title: string; desc: string; tag?: string; tone: "emerald" | "violet" | "amber" | "sky" | "rose" | "slate"; Icon: React.FC<{ className?: string }>; }[] = [
  { title: "Broadest module set", tag: "xDome + CTD + SRA + Edge", desc: "The widest portfolio of OT/IoT modules on the market. xDome and CTD cover visibility and detection, SRA covers vendor and engineering remote access, Edge handles asset collection. One vendor for the whole programme.", tone: "emerald", Icon: LayersIcon },
  { title: "Best-in-class IoMT", tag: "Medigate heritage", desc: "The 2021 Medigate acquisition put Claroty ahead in connected medical devices: deep IoMT protocol coverage, clinical-workflow context and patient-safety risk scoring, the right choice for hospitals and large healthcare estates.", tone: "sky", Icon: ShieldIcon },
  { title: "Safe active discovery", tag: "ICS-aware queries", desc: "Claroty Edge performs carefully engineered active queries that are designed safe for ICS protocols, giving a more complete asset inventory than pure-passive platforms where plant culture allows.", tone: "violet", Icon: EyeIcon },
  { title: "Dedicated OT SRA", tag: "Vendor remote access", desc: "Claroty Secure Remote Access is one of the strongest purpose-built OT remote-access platforms. Critical when third-party vendors, OEMs and engineers regularly access production controllers from outside the plant.", tone: "amber", Icon: LockIcon },
  { title: "Cloud or on-premises", tag: "Deployment flexibility", desc: "xDome is the cloud-managed flagship. CTD is the on-premises sibling for air-gapped, data-residency-restricted or cloud-averse customers. Most platforms force a single choice, Claroty supports both first-class.", tone: "rose", Icon: NetworkIcon },
  { title: "Gartner Leader", tag: "CPS Protection MQ", desc: "Named a Leader in the Gartner Magic Quadrant for CPS Protection Platforms alongside Nozomi. Independent validation that the platform meets enterprise OT requirements at scale.", tone: "slate", Icon: CheckIcon },
];

const whyWinsStats: { value: string; label: string; tone: "emerald" | "violet" | "sky" }[] = [
  { value: "4 products", label: "xDome, CTD, SRA and Edge, the broadest OT module set on the market", tone: "emerald" },
  { value: "Gartner Leader", label: "Magic Quadrant for CPS Protection Platforms, consecutive years", tone: "sky" },
  { value: "IoMT depth", label: "Medigate-rooted medical-device visibility unmatched in healthcare", tone: "violet" },
];

const bestFitProfile = [
  "Large UAE manufacturers, pharma and healthcare with heterogeneous device populations",
  "Hospital and healthcare estates needing best-in-class IoMT (connected medical device) visibility",
  "Multi-site programmes where xDome's cloud-managed SaaS reduces operational overhead",
  "Air-gapped, data-residency-restricted or cloud-averse customers needing the on-prem CTD alternative",
  "OT estates with heavy third-party vendor and OEM remote access (Claroty SRA)",
  "Plants where carefully ICS-aware active discovery is acceptable for the fullest inventory",
  "Customers building a single-vendor OT programme (visibility + detection + remote access + discovery)",
  "Compliance-led programmes targeting IEC 62443, HIPAA, NESA and ADHICS with audit-ready evidence",
];

const coreFeatures = [
  { title: "xDome platform", desc: "Cloud-managed flagship for OT, IoT and IoMT visibility." },
  { title: "Continuous Threat Detection (CTD)", desc: "On-premises sibling for air-gapped deployments." },
  { title: "Secure Remote Access (SRA)", desc: "Dedicated OT remote-access for vendors and engineers." },
  { title: "Claroty Edge", desc: "Lightweight passive and safe-active asset collection." },
  { title: "Exposure management", desc: "Asset-level CVE mapping and risk scoring." },
  { title: "Threat detection", desc: "Behavioural baselines plus ICS-specific signatures." },
  { title: "IoMT visibility", desc: "Medigate-derived medical-device parsers and risk scoring." },
  { title: "Compliance reporting", desc: "IEC 62443, HIPAA, NESA, ADHICS evidence packs." },
  { title: "SIEM and SOAR integration", desc: "Native connectors for major SOC platforms." },
  { title: "Threat intelligence", desc: "Claroty Team82 research and indicator feeds." },
];

type LicCell = { value: string; type: "yes" | "no" | "qual" };
type LicRow = { feature: string; cells: LicCell[] };
const editions = [
  { name: "xDome", subtitle: "cloud-managed" },
  { name: "CTD", subtitle: "on-prem" },
  { name: "SRA", subtitle: "remote access" },
  { name: "Edge", subtitle: "collector" },
];
const Y = (v = "✓"): LicCell => ({ value: v, type: "yes" });
const N: LicCell = { value: "✗", type: "no" };
const Q = (v: string): LicCell => ({ value: v, type: "qual" });

const licRows: LicRow[] = [
  { feature: "Primary positioning", cells: [Q("Cloud-managed OT/IoT/IoMT"), Q("On-prem visibility & detection"), Q("Vendor and engineer remote access"), Q("Asset collection layer")] },
  { feature: "Asset visibility (passive + active)", cells: [Y(), Y(), N, Y()] },
  { feature: "Threat detection (behavioural + signatures)", cells: [Y(), Y(), Q("limited"), N] },
  { feature: "Exposure / vulnerability management", cells: [Y(), Y(), N, Q("data source")] },
  { feature: "IoMT (medical device) coverage", cells: [Y(), Y(), N, Y()] },
  { feature: "Secure remote access for vendors / OEMs", cells: [N, N, Y(), N] },
  { feature: "Session recording and approval workflows", cells: [N, N, Y(), N] },
  { feature: "Cloud SaaS deployment", cells: [Y(), N, Q("hybrid"), N] },
  { feature: "On-premises deployment", cells: [Q("optional"), Y(), Y(), Y()] },
  { feature: "Air-gap support", cells: [N, Y(), Q("partial"), Y()] },
  { feature: "SIEM and SOAR integration", cells: [Y(), Y(), Y(), Q("via xDome / CTD")] },
  { feature: "Compliance reporting (IEC 62443, HIPAA)", cells: [Y(), Y(), Q("access logs"), N] },
  { feature: "Licensing basis", cells: [Q("Per asset"), Q("Per asset"), Q("Per session / user"), Q("Per sensor")] },
];

type Tier = { name: string; position: string; bestFor: string[]; additions?: string[]; verdict: string; highlighted?: boolean };

const tiers: Tier[] = [
  { name: "xDome", position: "Cloud-managed flagship", bestFor: ["Multi-site OT, IoT and IoMT visibility", "Cloud-led security operations", "Modern UAE programmes without air-gap mandates"], additions: ["Asset discovery and inventory", "Threat detection and exposure mgmt", "Cloud-native multi-site management"], verdict: "The default Claroty deployment.", highlighted: true },
  { name: "CTD", position: "On-premises sibling", bestFor: ["Air-gapped or data-residency-restricted sites", "Cloud-averse organisations", "Customers with strict on-prem mandates"], additions: ["Same detection engine as xDome", "Fully on-premises management", "Air-gap and offline operation"], verdict: "Same engine, on your hardware." },
  { name: "SRA", position: "Secure remote access", bestFor: ["Third-party vendor and OEM access", "Engineering remote access programmes", "Regulated remote-work into OT"], additions: ["Session recording and approval", "Just-in-time access workflows", "OT-aware policy enforcement"], verdict: "Best-in-class OT remote access." },
  { name: "Edge", position: "Lightweight asset collector", bestFor: ["Small / branch sites", "Asset enrichment for xDome or CTD", "Safe active query deployment"], additions: ["Passive monitoring", "ICS-aware active queries", "Feeds xDome / CTD"], verdict: "Reach where sensors do not fit." },
];

const upgradePaths = [
  { from: "xDome alone", title: "Cloud-managed OT visibility", desc: "Start with xDome for multi-site OT, IoT and IoMT visibility. Proves platform value in 2 to 4 weeks across the first plant or hospital, then scales by site." },
  { from: "+ SRA", title: "Secure vendor and OEM access", desc: "Add Claroty Secure Remote Access for third-party vendor and engineer remote sessions into the OT environment, with session recording and approval workflows." },
  { from: "+ CTD or Edge", title: "Air-gap or branch reach", desc: "Layer CTD for air-gapped sites that cannot use cloud, or Edge for small / remote sites where a full sensor is overkill but visibility is still required." },
];

const deploymentOptions = [
  { icon: "cloud" as const, title: "xDome SaaS (default)", body: "Claroty-hosted cloud-managed SaaS, the default deployment for modern UAE OT, IoT and IoMT programmes. Multi-site management out of the box." },
  { icon: "server" as const, title: "CTD on-premises", body: "Self-hosted CTD for air-gapped, data-residency-restricted or cloud-averse plants. Same detection engine as xDome, on your hardware." },
  { icon: "layers" as const, title: "Hybrid + SRA", body: "Most large UAE programmes combine xDome (or CTD) with SRA for vendor remote access. Artiflex sizes the right mix during the assessment." },
];

const faqs = [
  { question: "Should we choose xDome or CTD?", answer: "xDome (cloud-managed) is the default and the right answer for most UAE programmes, faster to deploy, less infrastructure to operate, multi-site management out of the box. CTD (on-premises) is the right answer for air-gapped sites, strict data-residency mandates and customers who refuse cloud-managed OT. Both run the same detection engine, the choice is operational not technical." },
  { question: "How does Claroty compare to Nozomi?", answer: "Both are Gartner Leaders for CPS Protection. Nozomi is the AI-native leader with the deepest behavioural detection and the broadest pure-passive deployment story, our default UAE recommendation. Claroty wins on module breadth (xDome + CTD + SRA + Edge), IoMT depth (Medigate lineage) and safe-active discovery, the right choice for the largest and most complex multi-protocol estates, hospitals and pharma." },
  { question: "Why does Claroty win in healthcare?", answer: "The 2021 Medigate acquisition. Medigate was the reference platform for connected medical device (IoMT) visibility, with deep clinical-workflow context and patient-safety-aware risk scoring. Claroty integrated that depth into xDome, putting the platform ahead of pure-OT competitors in any hospital, clinic or pharma manufacturing environment." },
  { question: "What is Claroty SRA and why does it matter?", answer: "Claroty Secure Remote Access is a dedicated, OT-aware remote-access platform with session recording, just-in-time approval workflows and policy enforcement specifically for vendor, OEM and engineering access into the OT environment. Critical when third parties regularly need to touch controllers, and when most generic VPN solutions do not produce the audit evidence regulators want." },
  { question: "Is Claroty's active discovery safe in production?", answer: "Yes, by design. Claroty Edge active queries are ICS-aware and carefully engineered for safe use in production environments, but every plant has a different active-scan tolerance. Artiflex always runs a tolerance test in pilot before enabling active discovery on production controllers." },
  { question: "How does Claroty fit into our SOC?", answer: "Natively. xDome and CTD feed Microsoft Sentinel, Splunk, Rapid7 InsightIDR, IBM QRadar and ServiceNow with ICS-aware alerts and asset context. One analyst workflow for IT and OT, Claroty produces the OT context an IT SIEM cannot." },
  { question: "What does an Artiflex Claroty deployment include?", answer: "Site survey and protocol assessment, platform choice (xDome vs CTD), sensor placement, SRA design, asset inventory build, threat detection tuning, SOC integration and ongoing management, all mapped to IEC 62443, HIPAA, NESA and ADHICS. Fully managed, co-managed or assessment-only." },
];

const strengthToneMap: Record<string, { iconBox: string; tag: string }> = {
  emerald: { iconBox: "border-emerald-400/20 bg-emerald-500/10 text-emerald-300", tag: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300" },
  violet: { iconBox: "border-violet-400/20 bg-violet-500/10 text-violet-300", tag: "border-violet-400/30 bg-violet-500/10 text-violet-300" },
  amber: { iconBox: "border-amber-400/20 bg-amber-500/10 text-amber-300", tag: "border-amber-400/30 bg-amber-500/10 text-amber-300" },
  rose: { iconBox: "border-rose-400/20 bg-rose-500/10 text-rose-300", tag: "border-rose-400/30 bg-rose-500/10 text-rose-300" },
  sky: { iconBox: "border-sky-400/20 bg-sky-500/10 text-sky-300", tag: "border-sky-400/30 bg-sky-500/10 text-sky-300" },
  slate: { iconBox: "border-slate-400/20 bg-slate-500/10 text-slate-200", tag: "border-slate-400/30 bg-slate-500/10 text-slate-200" },
};
const statToneText: Record<string, string> = { emerald: "text-emerald-300", violet: "text-violet-300", sky: "text-sky-300" };

export default function OTICSSecurityClaroty() {
  const { open: openContact } = useContactModal();
  const [activeTier, setActiveTier] = useState(0);

  return (
    <>
      <title>Claroty | OT / ICS Security UAE | Artiflex IT</title>
      <meta name="description" content="Claroty xDome, CTD, SRA and Edge, Gartner Leader for CPS Protection. Deployed and managed by Artiflex IT for UAE manufacturing, healthcare and critical infrastructure." />
      <link rel="canonical" href="https://artiflexit.com/cybersecurity/ot-ics-security/claroty" />

      <section className="relative overflow-hidden bg-gradient-to-br from-[#04101E] to-[#0A3D6B]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(40,181,225,0.18),transparent_55%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(27,138,199,0.10),transparent_60%)]" />
        <div className="relative z-10 border-b border-white/5"><div className="shell flex w-full items-center gap-2 pt-24 pb-3 text-[11px] text-slate-400 sm:pt-28"><Link to="/" className="transition-colors hover:text-white">Home</Link><span className="text-slate-600">/</span><Link to="/cybersecurity" className="transition-colors hover:text-white">Cybersecurity</Link><span className="text-slate-600">/</span><Link to="/cybersecurity/ot-ics-security" className="transition-colors hover:text-white">OT / ICS Security</Link><span className="text-slate-600">/</span><span className="font-medium text-[#28B5E1]">{vendor.name}</span></div></div>

        <div className="shell relative z-10 w-full py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="lg:col-span-7">
              <div className="flex items-center gap-3"><span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-transparent to-[#28B5E1]" /><span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-[#28B5E1]">{vendor.bestFor}</span></div>
              <p className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">{vendor.vendorCompany}</p>
              <h1 className="mt-3 font-display text-4xl font-bold leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]"><span className="bg-gradient-to-r from-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">Claroty</span></h1>
              <p className="mt-5 max-w-xl font-display text-xl leading-snug text-[#9CD6EE] sm:text-2xl">{vendor.tagline}</p>
              <div className="mt-6 max-w-2xl border-l-2 border-[#28B5E1]/30 pl-5"><p className="text-base leading-relaxed text-slate-300 sm:text-lg">{vendor.description}</p></div>

              <div className="mt-8 grid max-w-xl grid-cols-4 gap-2 sm:gap-3">
                {[{ ab: "xDome", full: "Cloud" }, { ab: "CTD", full: "On-prem" }, { ab: "SRA", full: "Remote" }, { ab: "Edge", full: "Collector" }].map((c) => (
                  <div key={c.ab} className="rounded-xl border border-[#28B5E1]/40 bg-gradient-to-br from-[#28B5E1]/15 to-[#1B8AC7]/[0.05] p-2.5 text-center sm:p-3">
                    <p className="font-display text-xs font-bold tracking-wide text-[#28B5E1] sm:text-sm">{c.ab}</p>
                    <p className="mt-1 text-[9px] leading-tight text-slate-300 sm:text-[10px]">{c.full}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-5">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-2 sm:gap-x-3">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">Explore</span>
                  <Link to="/cybersecurity/ot-ics-security#vendor-matrix" className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:-translate-y-0.5 hover:border-[#28B5E1]/60 hover:bg-white/10 hover:text-white sm:text-[13px]">Vendor Comparison<svg className="h-3 w-3 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg></Link>
                  <a href="#editions" className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:-translate-y-0.5 hover:border-[#28B5E1]/60 hover:bg-white/10 hover:text-white sm:text-[13px]">Compare Models<svg className="h-3 w-3 opacity-50 transition-all group-hover:translate-y-0.5 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7" /></svg></a>
                  <Link to="/cybersecurity/ot-ics-security#gartner-comparison" className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:-translate-y-0.5 hover:border-[#28B5E1]/60 hover:bg-white/10 hover:text-white sm:text-[13px]">Gartner-style Review<svg className="h-3 w-3 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg></Link>
                </div>
                <div><button type="button" onClick={openContact} className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#28B5E1] to-[#1B8AC7] px-8 py-3.5 text-sm font-semibold text-navy-deep shadow-[0_8px_30px_rgba(40,181,225,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(40,181,225,0.5)] sm:w-auto sm:text-base">Request for quote<svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg></button></div>
              </div>
            </motion.div>

            <motion.aside initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }} className="relative lg:col-span-5">
              <div className="relative mx-auto flex aspect-[4/3] max-w-md items-center justify-center overflow-hidden rounded-3xl border border-white/15 bg-white p-10 shadow-[0_30px_80px_-20px_rgba(3,16,28,0.8)] ring-1 ring-[#28B5E1]/10 sm:p-14">
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/40 to-transparent" />
                <img src={vendor.logo} alt={`${vendor.name} logo`} loading="lazy" onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.style.display = "none"; const fb = t.nextElementSibling as HTMLElement | null; if (fb) fb.style.display = "flex"; }} className="relative z-10 max-h-32 w-full max-w-[80%] object-contain" />
                <div className="relative z-10 hidden h-full w-full flex-col items-center justify-center text-center" style={{ display: "none" }}><p className="font-display text-3xl font-bold tracking-tight text-slate-900">Claroty</p><p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">CPS Protection</p></div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* WHAT IS CLAROTY */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-[#28B5E1]/30 via-[#9CD6EE]/20 to-transparent blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute top-32 right-[-10rem] h-[26rem] w-[26rem] rounded-full bg-gradient-to-tr from-violet-300/15 via-fuchsia-200/15 to-cyan-200/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/3 h-[26rem] w-[26rem] rounded-full bg-gradient-to-tr from-[#1B8AC7]/20 via-[#28B5E1]/15 to-transparent blur-3xl" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center"><span className="inline-flex items-center gap-2 rounded-full border border-[#28B5E1]/20 bg-white/60 px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7] backdrop-blur-xl shadow-[0_2px_10px_rgba(15,23,42,0.04)]"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#28B5E1] shadow-[0_0_8px_rgba(40,181,225,0.8)]" />Overview</span><h2 className="mt-6 font-display text-3xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-4xl md:text-5xl">What <span className="bg-gradient-to-r from-[#1B8AC7] via-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">Claroty</span> is</h2></div>
          <div className="relative mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
            <div className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-7 shadow-[0_10px_40px_-10px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-10px_rgba(40,181,225,0.20)] sm:p-9 lg:col-span-2">
              <span aria-hidden="true" className="pointer-events-none absolute -top-16 -right-12 h-40 w-40 rounded-full bg-gradient-to-br from-[#28B5E1]/15 to-transparent blur-2xl" />
              <span aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-gradient-to-tr from-[#1B8AC7]/15 to-transparent blur-2xl" />
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/40 to-transparent" />
              <div className="relative space-y-5">{overviewParagraphs.map((p, i) => (<p key={i} className="text-[15px] leading-[1.75] text-slate-700 sm:text-base">{p}</p>))}</div>
            </div>
            <div className="group relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#0A3D6B] via-[#04101E] to-[#020617] p-7 shadow-[0_20px_60px_-15px_rgba(15,28,46,0.45)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-15px_rgba(40,181,225,0.45)] sm:p-9">
              <span aria-hidden="true" className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-[#28B5E1]/35 blur-3xl" />
              <span aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-violet-500/15 blur-3xl" />
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/80 to-transparent" />
              <div className="relative"><h3 className="font-display text-2xl font-bold leading-[1.1] text-white sm:text-3xl md:text-[2rem]">Cloud or <br /><span className="bg-gradient-to-r from-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">on-premises</span></h3><p className="mt-5 text-sm leading-[1.7] text-white/80 sm:text-[15px]">xDome is the cloud-managed flagship. CTD is the on-premises sibling for air-gapped, data-residency-restricted or cloud-averse customers. Both products run the same detection engine, the choice is operational, not technical.</p></div>
            </div>
          </div>
          <ul className="relative mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-6 lg:grid-cols-4">{overviewCapabilities.map((item) => (<li key={item} className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-5 shadow-[0_6px_24px_-8px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-[#28B5E1]/40 hover:bg-white/80 hover:shadow-[0_14px_40px_-10px_rgba(40,181,225,0.25)]"><span aria-hidden="true" className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-tr from-[#28B5E1]/0 to-transparent blur-2xl transition-all duration-500 group-hover:from-[#28B5E1]/20" /><div className="relative flex items-start gap-3"><span aria-hidden="true" className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#28B5E1] to-[#1B8AC7] text-white shadow-[0_4px_12px_-2px_rgba(40,181,225,0.5)]"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><path d="M4 10l4 4 8-8" /></svg></span><span className="text-[13.5px] font-medium leading-snug text-slate-800 sm:text-sm">{item}</span></div></li>))}</ul>
        </div>
      </section>

      {/* WHY IT WINS */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(27,138,199,0.06),transparent_55%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Why it wins</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">What makes Claroty the right choice for complex estates</h2><p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">The strengths that show up most often in UAE pharma, healthcare, manufacturing and multi-protocol industrial deployments.</p></div>
          <div className="relative mx-auto max-w-4xl px-5 sm:px-6"><div className="mt-10 grid gap-4 sm:grid-cols-3">{whyWinsStats.map((stat, i) => (<motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, delay: 0.05 * i }} className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#1E4E73] via-[#143E62] to-[#042542] px-6 py-7 shadow-md"><p className={`font-display text-2xl font-bold leading-none sm:text-2xl ${statToneText[stat.tone]}`}>{stat.value}</p><p className="mt-3 text-sm leading-relaxed text-slate-200">{stat.label}</p></motion.div>))}</div></div>
          <div className="mt-12 grid items-start gap-1 lg:grid-cols-2">{strengths.map((s, i) => { const tone = strengthToneMap[s.tone]; const Icon = s.Icon; const isOrphan = i === strengths.length - 1 && strengths.length % 2 === 1; return (<motion.div key={s.title} tabIndex={0} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: 0.05 * i }} className={`group rounded-xl border border-white/10 bg-gradient-to-br from-[#04101E] to-[#0A3D6B] p-4 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/40 hover:shadow-lg focus-within:border-[#28B5E1]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#28B5E1]/40 ${isOrphan ? "lg:col-span-2" : ""}`}><div className="flex items-stretch gap-2.5"><span className={`flex w-11 shrink-0 items-center justify-center rounded-lg border ${tone.iconBox}`}><Icon className="h-5 w-5" /></span><div className="min-w-0">{s.tag && <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${tone.tag}`}>{s.tag}</span>}<h3 className="mt-1.5 font-display text-sm font-semibold text-white sm:text-base">{s.title}</h3></div></div><div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]"><div className="overflow-hidden"><p className="mt-2.5 text-xs leading-relaxed text-slate-300 sm:text-sm">{s.desc}</p></div></div></motion.div>); })}</div>
        </div>
      </section>

      {/* BEST FIT */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#04101E] to-[#020617] py-12 sm:py-16">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.10),transparent_60%)]" />
        <div className="shell relative">
          <div className="border-b border-white/10 pb-5"><h2 className="font-display text-xl font-bold leading-tight text-white sm:text-2xl lg:text-[1.7rem]">Who should put <span className="bg-gradient-to-r from-[#28B5E1] to-[#7ad4f0] bg-clip-text text-transparent">Claroty</span> on the shortlist</h2></div>
          <ul className="mt-6 grid gap-2 sm:mt-8 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-2.5">{bestFitProfile.map((p) => (<li key={p} className="group relative flex items-start gap-3 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/30 hover:bg-white/[0.05]"><span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#28B5E1]/15 text-[#28B5E1] ring-1 ring-inset ring-[#28B5E1]/25 transition-colors group-hover:bg-[#28B5E1] group-hover:text-white group-hover:ring-[#28B5E1]"><CheckIcon className="h-3 w-3" /></span><p className="text-[13px] leading-relaxed text-slate-200 sm:text-[13.5px]">{p}</p></li>))}</ul>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Core features</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">What's inside Claroty</h2></div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-2 lg:gap-x-10">{coreFeatures.map((f) => (<div key={f.title} className="flex items-start gap-3 border-b border-slate-200 pb-3 pt-1"><span aria-hidden="true" className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#28B5E1]/10 text-[#1B8AC7]"><CheckIcon className="h-3.5 w-3.5" /></span><p className="text-sm leading-relaxed text-slate-700"><span className="font-semibold text-slate-900">{f.title},</span> {f.desc}</p></div>))}</div>
        </div>
      </section>

      {/* PRODUCT POSITIONING */}
      <section id="editions" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Choosing a product</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Simplified positioning, which Claroty product fits</h2><p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">Claroty is sold as four complementary products. Most UAE programmes start with xDome (or CTD where on-prem is required) and add SRA where vendor remote access matters.</p></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{tiers.map((t, idx) => { const active = activeTier === idx; return (<button key={t.name} type="button" onClick={() => setActiveTier(idx)} aria-pressed={active} className={`group relative overflow-hidden rounded-2xl border bg-white p-5 text-left transition-all duration-300 hover:-translate-y-0.5 ${t.highlighted ? "border-amber-300 ring-1 ring-amber-200 shadow-[0_12px_36px_-12px_rgba(246,183,60,0.30)]" : "border-slate-200 shadow-sm hover:border-[#28B5E1]/40"} ${active ? "scale-[1.02] ring-2 ring-[#28B5E1]/40" : ""}`}>{t.highlighted && (<span className="absolute -top-px left-5 inline-flex rounded-b-md bg-amber-400 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-amber-950">★ Start here</span>)}<p className="mt-3 font-display text-base font-bold text-slate-900">{t.name}</p><p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#1B8AC7]">{t.position}</p><p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Best for</p><ul className="mt-1 space-y-1">{t.bestFor.map((b) => (<li key={b} className="flex gap-1.5 text-[12.5px] leading-snug text-slate-700"><span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#28B5E1]" />{b}</li>))}</ul>{t.additions && (<><p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">What it adds</p><ul className="mt-1 space-y-1">{t.additions.map((a) => (<li key={a} className="flex gap-1.5 text-[12.5px] leading-snug text-slate-700"><span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#28B5E1]" />{a}</li>))}</ul></>)}<p className="mt-4 border-t border-slate-200 pt-3 font-display text-[13px] font-bold italic text-slate-900">"{t.verdict}"</p></button>); })}</div>
        </div>
      </section>

      {/* STRATEGIC UPGRADE PATH */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">The strategic view</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">How the products relate</h2><p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">Most UAE Claroty programmes start with xDome (or CTD), then add SRA for vendor remote access. Edge fills in branch and small-site coverage.</p></div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]"><div className="grid grid-cols-1 gap-4 bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-5 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE] sm:grid-cols-[1fr_2fr] sm:px-7 sm:text-[11px]"><span>Step</span><span>What it gives you</span></div>{upgradePaths.map((u) => (<div key={u.from} className="grid grid-cols-1 gap-4 border-t border-[#0A3D6B]/20 px-5 py-4 transition-colors hover:bg-[#28B5E1]/[0.04] sm:grid-cols-[1fr_2fr] sm:px-7"><span className="font-display text-sm font-bold text-slate-900 sm:text-base">{u.from}</span><span className="text-sm leading-relaxed text-slate-700 sm:text-[15px]"><span className="font-semibold text-[#1B8AC7]">{u.title}.</span> {u.desc}</span></div>))}</div>
        </div>
      </section>

      {/* MODULE MATRIX */}
      <section id="license-matrix" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Licensing</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Claroty products and capabilities</h2><p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">xDome, CTD, SRA and Edge each license per asset, session or sensor. License the components your programme actually needs.</p></div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]"><div className="overflow-x-auto"><table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + editions.length * 116) }}><thead><tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]"><th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-4 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">Capability</th>{editions.map((e) => (<th key={e.name} className="border-l border-white/15 px-2 py-3 sm:px-4 sm:py-4 text-center align-bottom font-display text-sm font-semibold text-white">{e.name}<span className="mt-1 block font-mono text-[10px] font-normal uppercase tracking-wider text-[#9CD6EE]">{e.subtitle}</span></th>))}</tr></thead><tbody>{licRows.map((row, rIdx) => (<tr key={row.feature} className={`border-t border-[#0A3D6B]/15 transition-colors hover:bg-[#28B5E1]/[0.04] ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`}><th scope="row" className={`sticky left-0 z-10 px-4 py-3 align-middle font-display text-[13px] font-semibold text-slate-900 ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>{row.feature}</th>{row.cells.map((c, cIdx) => { const color = c.type === "yes" ? "text-emerald-600 font-bold" : c.type === "no" ? "text-slate-300" : "text-[#1B8AC7] font-semibold"; return (<td key={cIdx} className={`border-l border-[#0A3D6B]/15 px-3 py-3 text-center align-middle text-[12.5px] ${color}`}>{c.value}</td>); })}</tr>))}</tbody></table></div></div>
          <p className="mt-4 max-w-3xl text-xs leading-relaxed text-slate-500 sm:text-sm">Module availability reflects Claroty's published product set and may evolve. Artiflex confirms the exact entitlements during scoping.</p>
        </div>
      </section>

      {/* DEPLOYMENT */}
      <section className="relative bg-white py-12 sm:py-16">
        <div className="shell">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6"><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">Deployment Options</p><h2 className="font-display text-xl font-semibold leading-tight text-slate-900 sm:text-2xl">How we deliver Claroty <span className="font-normal text-slate-500">across UAE plants and hospitals</span></h2></div>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">{deploymentOptions.map((opt) => { const Icon = opt.icon === "server" ? ServerIcon : opt.icon === "layers" ? LayersIcon : CloudIcon; return (<div key={opt.title} className="rounded-xl border border-slate-200 bg-white p-5 transition-colors duration-300 hover:border-slate-300"><div className="flex items-center gap-2.5"><span aria-hidden className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500"><Icon className="h-4 w-4" /></span><h3 className="font-display text-sm font-semibold text-slate-900 sm:text-[15px]">{opt.title}</h3></div><p className="mt-3 text-[13px] leading-[1.6] text-slate-500 sm:text-sm">{opt.body}</p></div>); })}</div>
        </div>
      </section>

      {/* WHY ARTIFLEX */}
      <section className="relative bg-white py-16 sm:py-24"><div className="shell"><div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0A3D6B] via-[#04101E] to-[#020617] p-8 shadow-xl shadow-[#1B8AC7]/10 sm:p-12"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#28B5E1]">Why Artiflex IT</p><h2 className="mt-4 font-display text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">Delivering Claroty across the UAE</h2><p className="mt-6 text-base leading-relaxed text-slate-200 sm:text-lg">Claroty is the right answer when module breadth, IoMT depth and ICS-aware active discovery matter most. Artiflex handles platform choice (xDome or CTD), site survey, sensor and SRA design, deployment, ICS-protocol tuning, SOC integration and ongoing management, all mapped to IEC 62443, HIPAA, NESA and ADHICS. Fully managed, co-managed or assessment-only.</p><div className="mt-8 flex flex-wrap gap-4"><Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#28B5E1] px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:bg-white sm:text-base">Talk to our Consultant</Link><Link to="/cybersecurity/ot-ics-security" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-[#28B5E1]/50 hover:bg-white/10 sm:text-base">Back to OT / ICS Security</Link></div></div></div></section>

      {/* FAQ */}
      <section className="relative bg-slate-50 py-16 sm:py-24"><div className="shell"><div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Frequently asked</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Claroty questions we hear from UAE buyers</h2></div><div className="mt-10"><FAQAccordion items={faqs} /></div></div></section>

      <CTASection title="Ready to evaluate Claroty?" description="Book a free OT posture assessment and we will scope xDome vs CTD, SRA design and SOC integration for your UAE plants, hospitals or pharma facilities." primaryButton={{ text: "Book a free assessment", action: "modal" }} secondaryButton={{ text: "Compare OT vendors", href: "/cybersecurity/ot-ics-security#vendor-matrix" }} />
    </>
  );
}
