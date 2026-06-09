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
  ActivityIcon,
  AlertIcon,
  CloudIcon,
  ServerIcon,
} from "@/components/icons";

const vendor = {
  name: "Tenable OT Security",
  vendorCompany: "Tenable · Tenable.ot · Indegy acquisition 2019",
  bestFor: "Vulnerability-led OT · Tenable IT shops",
  tagline: "OT visibility and vulnerability management, unified with IT",
  description:
    "Tenable OT Security (Tenable.ot) extends the Tenable vulnerability-management programme into industrial control systems. Born from the 2019 Indegy acquisition, it pairs hybrid passive plus ICS-aware active discovery with the strongest vulnerability-management lineage on the market. The right choice when Tenable already runs your IT vulnerability programme and OT is being added.",
  logo: "/logos/tenable.png",
};

const overviewParagraphs = [
  "Tenable.ot was born from the 2019 acquisition of Indegy, an Israeli ICS visibility startup. Tenable then folded the platform into its broader Tenable One exposure-management ecosystem, alongside Tenable.io (cloud VM), Tenable.sc (on-prem VM) and Tenable Identity Exposure. The result is the most credible unified IT and OT vulnerability story in the market.",
  "The platform's hybrid discovery is its defining strength. Passive monitoring identifies controllers, HMIs and historians from ICS-protocol traffic. ICS-aware active queries (carefully engineered to be safe) reach assets that passive monitoring cannot see, particularly in lightly trafficked or air-gapped segments. The combination produces a more complete asset inventory than pure-passive platforms.",
  "Where Tenable.ot wins decisively is unified vulnerability management. A single risk-scoring methodology, one analyst workflow and one set of compliance reports cover both IT and OT, the operational simplification when Tenable already runs your IT VM programme is substantial. The right answer is operational, not best-of-breed ICS detection alone.",
];

const overviewCapabilities = [
  "Indegy heritage with Tenable VM lineage",
  "Hybrid passive + ICS-aware active discovery",
  "Asset-level CVE mapping (best-in-class)",
  "Configuration drift detection",
  "Unified with Tenable.io and Tenable.sc",
  "Tenable One exposure-management integration",
  "ICS-aware queries safe in production",
  "IEC 62443, NESA, ADHICS compliance reporting",
];

const strengths: { title: string; desc: string; tag?: string; tone: "emerald" | "violet" | "amber" | "sky" | "rose" | "slate"; Icon: React.FC<{ className?: string }>; }[] = [
  { title: "Best-in-class OT vulnerability management", tag: "Tenable VM DNA", desc: "Tenable.ot inherits Tenable's market-leading vulnerability-management methodology, the most mature CVE prioritisation, asset risk scoring and remediation workflow in the industry, applied to industrial assets.", tone: "emerald", Icon: AlertIcon },
  { title: "Unified IT and OT VM", tag: "One programme", desc: "Tenable.ot, Tenable.io and Tenable.sc share data, scoring and dashboards. One risk methodology, one analyst workflow, one set of reports for both IT and OT. Substantial operational simplification.", tone: "sky", Icon: NetworkIcon },
  { title: "Hybrid passive + active discovery", tag: "Fullest inventory", desc: "Passive monitoring catches everything on the wire. ICS-aware active queries reach assets that passive cannot see (air-gapped segments, low-talk devices). The combination is the most complete inventory of any platform.", tone: "violet", Icon: EyeIcon },
  { title: "Configuration drift detection", tag: "Beyond CVEs", desc: "Tracks controller-program changes, OS configuration drift, firmware versions and ICS-specific settings. Catches the slow, low-noise compromises that pure-CVE scanning misses.", tone: "amber", Icon: ActivityIcon },
  { title: "Tenable One ecosystem", tag: "Exposure management", desc: "Plugs into Tenable One for unified exposure management across cloud workloads, identities, web apps and OT. The platform of choice when exposure management is the broader programme.", tone: "rose", Icon: LayersIcon },
  { title: "ICS-aware safe active queries", tag: "Production safe", desc: "Active queries are deliberately engineered to be safe in ICS environments, allowing deeper interrogation of controllers where the plant culture permits. Always opt-in and always tested in pilot.", tone: "slate", Icon: ShieldIcon },
];

const whyWinsStats: { value: string; label: string; tone: "emerald" | "violet" | "sky" }[] = [
  { value: "Unified", label: "IT + OT vulnerability programme on one risk methodology and analyst workflow", tone: "emerald" },
  { value: "Hybrid", label: "Passive + ICS-aware active discovery, most complete asset inventory", tone: "sky" },
  { value: "Tenable One", label: "Plugs into the broader exposure-management ecosystem (.io, .sc, Identity)", tone: "violet" },
];

const bestFitProfile = [
  "UAE customers already running Tenable.io or Tenable.sc for IT vulnerability management",
  "Organisations consolidating IT and OT VM into one programme with one risk methodology",
  "Plants where ICS-aware active discovery delivers more complete inventory than pure passive",
  "Industrial estates where vulnerability management drives the risk programme, not just detection",
  "Mid to large manufacturing, utilities and process industries with mature IT VM operations",
  "Programmes feeding Tenable One exposure-management dashboards to executives",
  "Compliance-led customers needing unified IT and OT vulnerability evidence for NESA and ADHICS",
  "Teams who value operational simplification over best-of-breed ICS detection alone",
];

const coreFeatures = [
  { title: "Tenable.ot platform", desc: "Hybrid passive and active ICS discovery and monitoring." },
  { title: "Asset-level CVE mapping", desc: "Industrial CVEs mapped to specific controllers and devices." },
  { title: "Configuration drift detection", desc: "Tracks controller programs, firmware and OS settings." },
  { title: "ICS-aware active queries", desc: "Safe deeper interrogation where plant culture permits." },
  { title: "Tenable.io integration", desc: "Cloud VM tie-in for unified IT + OT programme." },
  { title: "Tenable.sc integration", desc: "On-prem VM tie-in for unified IT + OT programme." },
  { title: "Tenable One ecosystem", desc: "Exposure management across cloud, identity, web, OT." },
  { title: "Threat detection", desc: "Behavioural anomaly and ICS-specific signature detection." },
  { title: "SIEM and SOAR integration", desc: "Native connectors for major SOC platforms." },
  { title: "Compliance reporting", desc: "IEC 62443, NESA, ADHICS evidence packs." },
];

type LicCell = { value: string; type: "yes" | "no" | "qual" };
type LicRow = { feature: string; cells: LicCell[] };
const editions = [
  { name: "Tenable.ot", subtitle: "OT VM core" },
  { name: "Tenable.io", subtitle: "cloud VM" },
  { name: "Tenable.sc", subtitle: "on-prem VM" },
  { name: "Tenable One", subtitle: "exposure mgmt" },
];
const Y = (v = "✓"): LicCell => ({ value: v, type: "yes" });
const N: LicCell = { value: "✗", type: "no" };
const Q = (v: string): LicCell => ({ value: v, type: "qual" });

const licRows: LicRow[] = [
  { feature: "Primary positioning", cells: [Q("Industrial VM + visibility"), Q("Cloud VM and assets"), Q("On-prem VM"), Q("Unified exposure mgmt")] },
  { feature: "OT asset discovery (passive)", cells: [Y(), N, N, Q("via .ot")] },
  { feature: "OT asset discovery (ICS-aware active)", cells: [Y(), N, N, Q("via .ot")] },
  { feature: "IT asset discovery and scanning", cells: [N, Y(), Y(), Y()] },
  { feature: "Industrial CVE mapping", cells: [Y(), N, N, Y()] },
  { feature: "Configuration drift detection (OT)", cells: [Y(), N, N, Q("via .ot")] },
  { feature: "Unified IT + OT dashboards", cells: [Q("native"), Q("with .ot"), Q("with .ot"), Y()] },
  { feature: "Exposure management context", cells: [Q("partial"), Q("partial"), Q("partial"), Y()] },
  { feature: "Threat detection (OT)", cells: [Y(), N, N, Q("via .ot")] },
  { feature: "Deployment", cells: [Q("Sensor + server"), Q("SaaS"), Q("On-premises"), Q("SaaS")] },
  { feature: "SIEM integration", cells: [Y(), Y(), Y(), Y()] },
  { feature: "Licensing basis", cells: [Q("Per asset / per site"), Q("Per asset"), Q("Per asset"), Q("Per asset")] },
];

type Tier = { name: string; position: string; bestFor: string[]; additions?: string[]; verdict: string; highlighted?: boolean };
const tiers: Tier[] = [
  { name: "Tenable.ot", position: "OT VM and visibility core", bestFor: ["Industrial vulnerability management", "Plants where Tenable already runs IT VM", "Hybrid passive + active discovery"], additions: ["OT asset discovery", "ICS CVE mapping", "Configuration drift detection"], verdict: "The OT vulnerability foundation.", highlighted: true },
  { name: "Tenable.io", position: "Cloud VM (IT)", bestFor: ["Cloud-led IT VM programmes", "SaaS-first organisations", "Unified IT + OT dashboards"], additions: ["Cloud-hosted scanning", "Tenable Asset Inventory", "Plugs into Tenable.ot"], verdict: "The IT VM counterpart, SaaS." },
  { name: "Tenable.sc", position: "On-prem VM (IT)", bestFor: ["On-prem IT VM mandates", "Regulated industries with data residency", "Unified IT + OT dashboards"], additions: ["On-prem scanner management", "Tenable Asset Inventory", "Plugs into Tenable.ot"], verdict: "The IT VM counterpart, on your hardware." },
  { name: "Tenable One", position: "Exposure management", bestFor: ["Executive-level risk programmes", "Multi-domain exposure (cloud, identity, OT)", "Risk-based prioritisation across the estate"], additions: ["Cross-asset attack-path analysis", "Identity Exposure tie-in", "Single risk methodology"], verdict: "The exposure-management umbrella." },
];

const upgradePaths = [
  { from: "Tenable.ot alone", title: "OT visibility and vulnerability core", desc: "Deploy Tenable.ot for OT asset discovery, ICS CVE mapping and configuration drift detection. The right starting point if Tenable does not already own your IT VM programme." },
  { from: "+ Tenable.io or .sc", title: "Unified IT + OT VM", desc: "Pair Tenable.ot with Tenable.io (cloud VM) or Tenable.sc (on-prem VM) for one risk methodology, one analyst workflow and one set of dashboards across IT and OT." },
  { from: "+ Tenable One", title: "Exposure management at scale", desc: "Layer Tenable One on top for cross-asset exposure management across cloud workloads, identities, web apps and OT, the executive-level risk view of the entire estate." },
];

const deploymentOptions = [
  { icon: "server" as const, title: "Tenable.ot on-premises", body: "Self-hosted Tenable.ot sensor and server per site. The default deployment for UAE industrial estates with data-residency mandates." },
  { icon: "cloud" as const, title: "Tenable One SaaS", body: "Cloud-hosted Tenable One for unified IT + OT exposure-management dashboards across the estate." },
  { icon: "layers" as const, title: "Hybrid with Tenable.io/.sc", body: "Most large UAE programmes combine Tenable.ot per site with Tenable.io or .sc for IT, all rolling up into one risk view. Artiflex sizes the right mix." },
];

const faqs = [
  { question: "When does Tenable OT Security beat Nozomi or Claroty?", answer: "When Tenable already owns the IT vulnerability-management programme. Tenable.ot extends that programme into OT with one risk methodology, one workflow and unified dashboards. The case is operational simplification across IT and OT, not best-of-breed ICS detection alone, Nozomi and Claroty remain the depth leaders for that." },
  { question: "Is Tenable.ot's active scanning safe in production?", answer: "Yes, by design. Active queries are ICS-aware and deliberately engineered to be safe for industrial protocols, but every plant has a different tolerance. Artiflex always runs an active-scan tolerance test in pilot before enabling it on production controllers. Default deployment is passive only." },
  { question: "How does Tenable.ot integrate with Tenable.io and Tenable.sc?", answer: "Natively. Asset data, CVEs, risk scoring and dashboards roll up across the products. One Tenable.io or .sc console can show IT and OT assets side by side, with one risk methodology. The integration is the entire reason Tenable.ot wins for customers already on the Tenable platform." },
  { question: "What is Tenable One and do we need it?", answer: "Tenable One is the broader exposure-management ecosystem (cloud workloads, identities, web apps, OT) under one risk methodology. Useful for executive-level risk reporting and cross-asset attack-path analysis. Not required to run Tenable.ot, but adds value for large enterprises building a unified exposure-management programme." },
  { question: "Does Tenable.ot do ICS threat detection too?", answer: "Yes, behavioural anomaly detection plus ICS-specific signatures, but detection depth is not class-leading versus Nozomi or Dragos. If pure ICS detection is the priority, those platforms remain stronger. Tenable.ot's case is unified vulnerability management." },
  { question: "Can we deploy Tenable.ot air-gapped?", answer: "Yes. Tenable.ot on-premises supports fully air-gapped deployment, common for utilities, energy and government plants in the UAE with strict data-residency mandates." },
  { question: "What does an Artiflex Tenable.ot deployment include?", answer: "Site survey, sensor sizing and placement, deployment, ICS-protocol tuning, Tenable.io or .sc integration, Tenable One enrolment (if applicable), SOC integration and ongoing management, all mapped to IEC 62443, NESA, ADHICS and ISO 27001. Fully managed, co-managed or assessment-only." },
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

export default function OTICSSecurityTenable() {
  const { open: openContact } = useContactModal();
  const [activeTier, setActiveTier] = useState(0);

  return (
    <>
      <title>Tenable OT Security | OT / ICS UAE | Artiflex IT</title>
      <meta name="description" content="Tenable OT Security (Tenable.ot), unified IT and OT vulnerability management. Indegy heritage. Deployed and managed by Artiflex IT for UAE manufacturing and utilities." />
      <link rel="canonical" href="https://artiflexit.com/cybersecurity/ot-ics-security/tenable" />

      <section className="relative overflow-hidden bg-gradient-to-br from-[#04101E] to-[#0A3D6B]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(40,181,225,0.18),transparent_55%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(27,138,199,0.10),transparent_60%)]" />
        <div className="relative z-10 border-b border-white/5"><div className="shell flex w-full items-center gap-2 pt-24 pb-3 text-[11px] text-slate-400 sm:pt-28"><Link to="/" className="transition-colors hover:text-white">Home</Link><span className="text-slate-600">/</span><Link to="/cybersecurity" className="transition-colors hover:text-white">Cybersecurity</Link><span className="text-slate-600">/</span><Link to="/cybersecurity/ot-ics-security" className="transition-colors hover:text-white">OT / ICS Security</Link><span className="text-slate-600">/</span><span className="font-medium text-[#28B5E1]">{vendor.name}</span></div></div>

        <div className="shell relative z-10 w-full py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="lg:col-span-7">
              <div className="flex items-center gap-3"><span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-transparent to-[#28B5E1]" /><span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-[#28B5E1]">{vendor.bestFor}</span></div>
              <p className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">{vendor.vendorCompany}</p>
              <h1 className="mt-3 font-display text-4xl font-bold leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]">Tenable <span className="bg-gradient-to-r from-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">OT Security</span></h1>
              <p className="mt-5 max-w-xl font-display text-xl leading-snug text-[#9CD6EE] sm:text-2xl">{vendor.tagline}</p>
              <div className="mt-6 max-w-2xl border-l-2 border-[#28B5E1]/30 pl-5"><p className="text-base leading-relaxed text-slate-300 sm:text-lg">{vendor.description}</p></div>

              <div className="mt-8 grid max-w-xl grid-cols-4 gap-2 sm:gap-3">
                {[{ ab: ".ot", full: "OT core" }, { ab: ".io", full: "Cloud VM" }, { ab: ".sc", full: "On-prem VM" }, { ab: "One", full: "Exposure" }].map((c) => (
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
                <div className="relative z-10 hidden h-full w-full flex-col items-center justify-center text-center" style={{ display: "none" }}><p className="font-display text-3xl font-bold tracking-tight text-slate-900">Tenable</p><p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">OT Security</p></div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-[#28B5E1]/30 via-[#9CD6EE]/20 to-transparent blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute top-32 right-[-10rem] h-[26rem] w-[26rem] rounded-full bg-gradient-to-tr from-violet-300/15 via-fuchsia-200/15 to-cyan-200/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/3 h-[26rem] w-[26rem] rounded-full bg-gradient-to-tr from-[#1B8AC7]/20 via-[#28B5E1]/15 to-transparent blur-3xl" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center"><span className="inline-flex items-center gap-2 rounded-full border border-[#28B5E1]/20 bg-white/60 px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7] backdrop-blur-xl shadow-[0_2px_10px_rgba(15,23,42,0.04)]"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#28B5E1] shadow-[0_0_8px_rgba(40,181,225,0.8)]" />Overview</span><h2 className="mt-6 font-display text-3xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-4xl md:text-5xl">What <span className="bg-gradient-to-r from-[#1B8AC7] via-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">Tenable OT</span> is</h2></div>
          <div className="relative mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
            <div className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-7 shadow-[0_10px_40px_-10px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-10px_rgba(40,181,225,0.20)] sm:p-9 lg:col-span-2"><span aria-hidden="true" className="pointer-events-none absolute -top-16 -right-12 h-40 w-40 rounded-full bg-gradient-to-br from-[#28B5E1]/15 to-transparent blur-2xl" /><span aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-gradient-to-tr from-[#1B8AC7]/15 to-transparent blur-2xl" /><span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/40 to-transparent" /><div className="relative space-y-5">{overviewParagraphs.map((p, i) => (<p key={i} className="text-[15px] leading-[1.75] text-slate-700 sm:text-base">{p}</p>))}</div></div>
            <div className="group relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#0A3D6B] via-[#04101E] to-[#020617] p-7 shadow-[0_20px_60px_-15px_rgba(15,28,46,0.45)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-15px_rgba(40,181,225,0.45)] sm:p-9"><span aria-hidden="true" className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-[#28B5E1]/35 blur-3xl" /><span aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-violet-500/15 blur-3xl" /><span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/80 to-transparent" /><div className="relative"><h3 className="font-display text-2xl font-bold leading-[1.1] text-white sm:text-3xl md:text-[2rem]">Unified IT + OT <br /><span className="bg-gradient-to-r from-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">vulnerability management</span></h3><p className="mt-5 text-sm leading-[1.7] text-white/80 sm:text-[15px]">One risk methodology, one analyst workflow, one set of dashboards across IT and OT. The operational simplification when Tenable already runs your IT VM programme.</p></div></div>
          </div>
          <ul className="relative mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-6 lg:grid-cols-4">{overviewCapabilities.map((item) => (<li key={item} className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-5 shadow-[0_6px_24px_-8px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-[#28B5E1]/40 hover:bg-white/80 hover:shadow-[0_14px_40px_-10px_rgba(40,181,225,0.25)]"><span aria-hidden="true" className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-tr from-[#28B5E1]/0 to-transparent blur-2xl transition-all duration-500 group-hover:from-[#28B5E1]/20" /><div className="relative flex items-start gap-3"><span aria-hidden="true" className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#28B5E1] to-[#1B8AC7] text-white shadow-[0_4px_12px_-2px_rgba(40,181,225,0.5)]"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><path d="M4 10l4 4 8-8" /></svg></span><span className="text-[13.5px] font-medium leading-snug text-slate-800 sm:text-sm">{item}</span></div></li>))}</ul>
        </div>
      </section>

      {/* WHY IT WINS */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(27,138,199,0.06),transparent_55%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Why it wins</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">What makes Tenable OT Security the unified-VM choice</h2><p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">The strengths that show up most often where unified IT and OT vulnerability programmes matter more than best-of-breed ICS detection alone.</p></div>
          <div className="relative mx-auto max-w-4xl px-5 sm:px-6"><div className="mt-10 grid gap-4 sm:grid-cols-3">{whyWinsStats.map((stat, i) => (<motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, delay: 0.05 * i }} className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#1E4E73] via-[#143E62] to-[#042542] px-6 py-7 shadow-md"><p className={`font-display text-2xl font-bold leading-none sm:text-2xl ${statToneText[stat.tone]}`}>{stat.value}</p><p className="mt-3 text-sm leading-relaxed text-slate-200">{stat.label}</p></motion.div>))}</div></div>
          <div className="mt-12 grid items-start gap-1 lg:grid-cols-2">{strengths.map((s, i) => { const tone = strengthToneMap[s.tone]; const Icon = s.Icon; const isOrphan = i === strengths.length - 1 && strengths.length % 2 === 1; return (<motion.div key={s.title} tabIndex={0} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: 0.05 * i }} className={`group rounded-xl border border-white/10 bg-gradient-to-br from-[#04101E] to-[#0A3D6B] p-4 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/40 hover:shadow-lg focus-within:border-[#28B5E1]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#28B5E1]/40 ${isOrphan ? "lg:col-span-2" : ""}`}><div className="flex items-stretch gap-2.5"><span className={`flex w-11 shrink-0 items-center justify-center rounded-lg border ${tone.iconBox}`}><Icon className="h-5 w-5" /></span><div className="min-w-0">{s.tag && <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${tone.tag}`}>{s.tag}</span>}<h3 className="mt-1.5 font-display text-sm font-semibold text-white sm:text-base">{s.title}</h3></div></div><div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]"><div className="overflow-hidden"><p className="mt-2.5 text-xs leading-relaxed text-slate-300 sm:text-sm">{s.desc}</p></div></div></motion.div>); })}</div>
        </div>
      </section>

      {/* BEST FIT */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#04101E] to-[#020617] py-12 sm:py-16">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.10),transparent_60%)]" />
        <div className="shell relative">
          <div className="border-b border-white/10 pb-5"><h2 className="font-display text-xl font-bold leading-tight text-white sm:text-2xl lg:text-[1.7rem]">Who should put <span className="bg-gradient-to-r from-[#28B5E1] to-[#7ad4f0] bg-clip-text text-transparent">Tenable OT Security</span> on the shortlist</h2></div>
          <ul className="mt-6 grid gap-2 sm:mt-8 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-2.5">{bestFitProfile.map((p) => (<li key={p} className="group relative flex items-start gap-3 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/30 hover:bg-white/[0.05]"><span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#28B5E1]/15 text-[#28B5E1] ring-1 ring-inset ring-[#28B5E1]/25 transition-colors group-hover:bg-[#28B5E1] group-hover:text-white group-hover:ring-[#28B5E1]"><CheckIcon className="h-3 w-3" /></span><p className="text-[13px] leading-relaxed text-slate-200 sm:text-[13.5px]">{p}</p></li>))}</ul>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="relative bg-white py-16 sm:py-24"><div className="shell"><div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Core features</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">What's inside Tenable OT Security</h2></div><div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-2 lg:gap-x-10">{coreFeatures.map((f) => (<div key={f.title} className="flex items-start gap-3 border-b border-slate-200 pb-3 pt-1"><span aria-hidden="true" className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#28B5E1]/10 text-[#1B8AC7]"><CheckIcon className="h-3.5 w-3.5" /></span><p className="text-sm leading-relaxed text-slate-700"><span className="font-semibold text-slate-900">{f.title},</span> {f.desc}</p></div>))}</div></div></section>

      {/* PRODUCT POSITIONING */}
      <section id="editions" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Choosing a product</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Simplified positioning, which Tenable product fits</h2><p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">Tenable.ot is the OT core. Pair it with Tenable.io (cloud VM) or Tenable.sc (on-prem VM) for unified IT + OT, layer Tenable One for full exposure management.</p></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{tiers.map((t, idx) => { const active = activeTier === idx; return (<button key={t.name} type="button" onClick={() => setActiveTier(idx)} aria-pressed={active} className={`group relative overflow-hidden rounded-2xl border bg-white p-5 text-left transition-all duration-300 hover:-translate-y-0.5 ${t.highlighted ? "border-amber-300 ring-1 ring-amber-200 shadow-[0_12px_36px_-12px_rgba(246,183,60,0.30)]" : "border-slate-200 shadow-sm hover:border-[#28B5E1]/40"} ${active ? "scale-[1.02] ring-2 ring-[#28B5E1]/40" : ""}`}>{t.highlighted && (<span className="absolute -top-px left-5 inline-flex rounded-b-md bg-amber-400 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-amber-950">★ Start here</span>)}<p className="mt-3 font-display text-base font-bold text-slate-900">{t.name}</p><p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#1B8AC7]">{t.position}</p><p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Best for</p><ul className="mt-1 space-y-1">{t.bestFor.map((b) => (<li key={b} className="flex gap-1.5 text-[12.5px] leading-snug text-slate-700"><span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#28B5E1]" />{b}</li>))}</ul>{t.additions && (<><p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">What it adds</p><ul className="mt-1 space-y-1">{t.additions.map((a) => (<li key={a} className="flex gap-1.5 text-[12.5px] leading-snug text-slate-700"><span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#28B5E1]" />{a}</li>))}</ul></>)}<p className="mt-4 border-t border-slate-200 pt-3 font-display text-[13px] font-bold italic text-slate-900">"{t.verdict}"</p></button>); })}</div>
        </div>
      </section>

      {/* STRATEGIC UPGRADE */}
      <section className="relative bg-white py-16 sm:py-24"><div className="shell"><div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">The strategic view</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">How the products relate</h2><p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">Tenable.ot alone proves OT VM value. Pairing with Tenable.io or .sc unifies IT and OT. Tenable One adds exposure-management scale.</p></div><div className="mt-10 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]"><div className="grid grid-cols-1 gap-4 bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-5 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE] sm:grid-cols-[1fr_2fr] sm:px-7 sm:text-[11px]"><span>Step</span><span>What it gives you</span></div>{upgradePaths.map((u) => (<div key={u.from} className="grid grid-cols-1 gap-4 border-t border-[#0A3D6B]/20 px-5 py-4 transition-colors hover:bg-[#28B5E1]/[0.04] sm:grid-cols-[1fr_2fr] sm:px-7"><span className="font-display text-sm font-bold text-slate-900 sm:text-base">{u.from}</span><span className="text-sm leading-relaxed text-slate-700 sm:text-[15px]"><span className="font-semibold text-[#1B8AC7]">{u.title}.</span> {u.desc}</span></div>))}</div></div></section>

      {/* MODULE MATRIX */}
      <section id="license-matrix" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24"><div className="shell"><div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Licensing</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Tenable products and capabilities</h2><p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">The Tenable platform spans OT, cloud VM, on-prem VM and exposure management. License the components your programme actually needs.</p></div><div className="mt-10 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]"><div className="overflow-x-auto"><table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + editions.length * 116) }}><thead><tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]"><th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-4 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">Capability</th>{editions.map((e) => (<th key={e.name} className="border-l border-white/15 px-2 py-3 sm:px-4 sm:py-4 text-center align-bottom font-display text-sm font-semibold text-white">{e.name}<span className="mt-1 block font-mono text-[10px] font-normal uppercase tracking-wider text-[#9CD6EE]">{e.subtitle}</span></th>))}</tr></thead><tbody>{licRows.map((row, rIdx) => (<tr key={row.feature} className={`border-t border-[#0A3D6B]/15 transition-colors hover:bg-[#28B5E1]/[0.04] ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`}><th scope="row" className={`sticky left-0 z-10 px-4 py-3 align-middle font-display text-[13px] font-semibold text-slate-900 ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>{row.feature}</th>{row.cells.map((c, cIdx) => { const color = c.type === "yes" ? "text-emerald-600 font-bold" : c.type === "no" ? "text-slate-300" : "text-[#1B8AC7] font-semibold"; return (<td key={cIdx} className={`border-l border-[#0A3D6B]/15 px-3 py-3 text-center align-middle text-[12.5px] ${color}`}>{c.value}</td>); })}</tr>))}</tbody></table></div></div></div></section>

      {/* DEPLOYMENT */}
      <section className="relative bg-white py-12 sm:py-16"><div className="shell"><div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6"><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">Deployment Options</p><h2 className="font-display text-xl font-semibold leading-tight text-slate-900 sm:text-2xl">How we deliver Tenable OT Security <span className="font-normal text-slate-500">across UAE industrial estates</span></h2></div><div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">{deploymentOptions.map((opt) => { const Icon = opt.icon === "server" ? ServerIcon : opt.icon === "layers" ? LayersIcon : CloudIcon; return (<div key={opt.title} className="rounded-xl border border-slate-200 bg-white p-5 transition-colors duration-300 hover:border-slate-300"><div className="flex items-center gap-2.5"><span aria-hidden className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500"><Icon className="h-4 w-4" /></span><h3 className="font-display text-sm font-semibold text-slate-900 sm:text-[15px]">{opt.title}</h3></div><p className="mt-3 text-[13px] leading-[1.6] text-slate-500 sm:text-sm">{opt.body}</p></div>); })}</div></div></section>

      {/* WHY ARTIFLEX */}
      <section className="relative bg-white py-16 sm:py-24"><div className="shell"><div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0A3D6B] via-[#04101E] to-[#020617] p-8 shadow-xl shadow-[#1B8AC7]/10 sm:p-12"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#28B5E1]">Why Artiflex IT</p><h2 className="mt-4 font-display text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">Delivering Tenable OT Security across the UAE</h2><p className="mt-6 text-base leading-relaxed text-slate-200 sm:text-lg">Tenable OT Security is the right answer when unified IT + OT vulnerability management beats best-of-breed ICS detection alone. Artiflex handles site survey, sensor placement, deployment, integration with Tenable.io or Tenable.sc, optional Tenable One enrolment, SOC integration and ongoing management, all mapped to IEC 62443, NESA, ADHICS and ISO 27001. Fully managed, co-managed or assessment-only.</p><div className="mt-8 flex flex-wrap gap-4"><Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#28B5E1] px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:bg-white sm:text-base">Talk to our Consultant</Link><Link to="/cybersecurity/ot-ics-security" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-[#28B5E1]/50 hover:bg-white/10 sm:text-base">Back to OT / ICS Security</Link></div></div></div></section>

      {/* FAQ */}
      <section className="relative bg-slate-50 py-16 sm:py-24"><div className="shell"><div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Frequently asked</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Tenable OT Security questions we hear from UAE buyers</h2></div><div className="mt-10"><FAQAccordion items={faqs} /></div></div></section>

      <CTASection title="Ready to evaluate Tenable OT Security?" description="Book a free OT posture assessment and we will scope Tenable.ot deployment, IT VM integration and exposure-management readiness for your UAE plants." primaryButton={{ text: "Book a free assessment", action: "modal" }} secondaryButton={{ text: "Compare OT vendors", href: "/cybersecurity/ot-ics-security#vendor-matrix" }} />
    </>
  );
}
