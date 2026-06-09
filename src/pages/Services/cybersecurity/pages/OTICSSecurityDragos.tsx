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
  AlertIcon,
  ActivityIcon,
  TargetIcon,
  CloudIcon,
  ServerIcon,
  LayersIcon,
} from "@/components/icons";

const vendor = {
  name: "Dragos Platform",
  vendorCompany: "Dragos · Founded 2016 · ICS-CERT lineage",
  bestFor: "ICS-IR Specialist · Critical Infrastructure",
  tagline: "ICS / OT cybersecurity from the ICS-IR specialists",
  description:
    "Founded in 2016 by Robert M. Lee and a team of former US ICS-CERT and government ICS hunters, Dragos pairs the Dragos Platform with the WorldView threat-intelligence service and the Neighborhood Keeper community-defence model. The strongest ICS-specific pedigree on the market, particularly in energy, oil and gas, water utilities and electricity grids where deep ICS protocol knowledge and threat-actor attribution matter most.",
  logo: "/logos/Dragos.png",
};

const overviewParagraphs = [
  "Dragos was founded in 2016 by Robert M. Lee, a former US Air Force ICS cyber-warfare officer and SANS instructor, alongside a team of ICS-CERT and US Government ICS threat hunters. That pedigree shapes everything: Dragos is the deepest ICS-IR specialist on the market, with the strongest threat-actor research in industries where understanding adversary tradecraft matters as much as detection.",
  "The Dragos Platform combines asset visibility, threat detection, vulnerability management and case-management workflow for OT incident response. WorldView is the threat-intelligence service that pushes ICS-specific indicators, threat-group profiles (Dragos tracks groups like CHERNOVITE, ELECTRUM, KAMACITE, XENOTIME) and finished intelligence reports to the platform. Neighborhood Keeper is a unique community-defence model where anonymised detections are shared across participating critical-infrastructure customers, turning a single attack into a defence for an entire sector.",
  "Where Dragos differs from Nozomi or Claroty is depth versus breadth. Dragos is purpose-built for heavy industry and critical infrastructure, energy, utilities, water, electricity, oil and gas, with less focus on healthcare IoMT or manufacturing IoT. For organisations facing nation-state-level ICS threats, that specialism is the value.",
];

const overviewCapabilities = [
  "Dragos Platform: visibility + detection + VM + IR",
  "WorldView ICS threat-intel feeds",
  "Neighborhood Keeper community defence",
  "ICS-CERT and US Government pedigree",
  "Threat-group profiles (CHERNOVITE, XENOTIME, etc.)",
  "Passive ICS-protocol parsing",
  "Case-management for OT incident response",
  "Strongest in energy, utilities, water, oil and gas",
];

const strengths: { title: string; desc: string; tag?: string; tone: "emerald" | "violet" | "amber" | "sky" | "rose" | "slate"; Icon: React.FC<{ className?: string }>; }[] = [
  { title: "Deepest ICS-IR pedigree", tag: "ICS-CERT lineage", desc: "Founded by former US ICS-CERT hunters and Air Force cyber-warfare officers. No other vendor has the same density of OT incident-response experience at the leadership and research level.", tone: "emerald", Icon: TargetIcon },
  { title: "WorldView threat intelligence", tag: "ICS-specific intel", desc: "The most credible ICS-specific threat-intelligence service. Tracks named threat groups (CHERNOVITE, ELECTRUM, KAMACITE, XENOTIME, PARISITE), publishes finished intelligence and feeds detection content tuned to actual ICS adversary tradecraft.", tone: "sky", Icon: AlertIcon },
  { title: "Neighborhood Keeper", tag: "Community defence", desc: "A unique programme where anonymised detections from participating critical-infrastructure customers are shared across the community. One attack on one utility becomes a defence for an entire sector.", tone: "violet", Icon: ShieldIcon },
  { title: "OT case management", tag: "IR workflow built-in", desc: "Built-in case management designed for OT incident response, including evidence collection, controller-program analysis, plant-engineering collaboration and reporting. Most platforms treat IR as an afterthought; Dragos puts it at the centre.", tone: "amber", Icon: ActivityIcon },
  { title: "Heavy-industry focus", tag: "Energy / utilities / O&G", desc: "Purpose-built for electricity grids, oil and gas, water utilities, pipelines and substations. If your threat model includes nation-state attacks on critical infrastructure, Dragos is the specialist answer.", tone: "rose", Icon: EyeIcon },
  { title: "Passive deployment", tag: "Zero risk to production", desc: "Default passive monitoring with no risk to production controllers. Dragos remains fully passive by default, suited to the high-stakes safety culture of critical-infrastructure operators.", tone: "slate", Icon: CheckIcon },
];

const whyWinsStats: { value: string; label: string; tone: "emerald" | "violet" | "sky" }[] = [
  { value: "ICS-CERT", label: "Founders from US ICS-CERT and Air Force cyber-warfare, deepest IR pedigree", tone: "emerald" },
  { value: "5+ groups", label: "Named ICS threat-groups tracked (CHERNOVITE, XENOTIME, ELECTRUM, KAMACITE, PARISITE)", tone: "sky" },
  { value: "Community", label: "Neighborhood Keeper shares anonymised detections across critical-infrastructure peers", tone: "violet" },
];

const bestFitProfile = [
  "Electricity transmission and distribution utilities and grid operators",
  "Oil and gas producers, pipeline operators and refineries",
  "Water and wastewater utilities, particularly large municipal operators",
  "Substations, switchyards and power-generation plants",
  "Critical-infrastructure operators in the UAE facing nation-state threat models",
  "Organisations needing strong ICS threat-actor attribution and finished intelligence",
  "Teams investing in dedicated OT incident response capability",
  "Plants where deep ICS protocol knowledge outweighs IoT or IoMT breadth",
];

const coreFeatures = [
  { title: "Dragos Platform", desc: "Single platform for OT visibility, detection, VM and IR." },
  { title: "Passive ICS discovery", desc: "Deep packet inspection across major ICS protocols." },
  { title: "Threat detection", desc: "Behavioural + Dragos analytics tuned to known ICS TTPs." },
  { title: "WorldView intel feed", desc: "Finished intelligence, IOCs and threat-group profiles." },
  { title: "Neighborhood Keeper", desc: "Community sharing across critical-infrastructure peers." },
  { title: "Vulnerability management", desc: "Asset-level CVE mapping with IR context." },
  { title: "Case management", desc: "OT-aware incident-response workflow." },
  { title: "Threat-group profiles", desc: "CHERNOVITE, XENOTIME, ELECTRUM, KAMACITE and more." },
  { title: "SIEM integration", desc: "Forwarders to Splunk, Sentinel, QRadar, Rapid7." },
  { title: "NERC CIP and IEC 62443 reporting", desc: "Audit-ready evidence for critical-infrastructure regulators." },
];

type LicCell = { value: string; type: "yes" | "no" | "qual" };
type LicRow = { feature: string; cells: LicCell[] };
const editions = [
  { name: "Dragos Platform", subtitle: "core" },
  { name: "WorldView", subtitle: "threat intel" },
  { name: "Neighborhood Keeper", subtitle: "community" },
];
const Y = (v = "✓"): LicCell => ({ value: v, type: "yes" });
const N: LicCell = { value: "✗", type: "no" };
const Q = (v: string): LicCell => ({ value: v, type: "qual" });

const licRows: LicRow[] = [
  { feature: "Primary positioning", cells: [Q("Visibility + detection + VM + IR"), Q("ICS-specific threat intel"), Q("Community-shared detection")] },
  { feature: "Passive ICS asset discovery", cells: [Y(), N, Q("via Platform")] },
  { feature: "ICS-protocol parsing", cells: [Y(), N, Q("via Platform")] },
  { feature: "Threat detection (behavioural + analytics)", cells: [Y(), Q("intel-driven"), Q("community-shared")] },
  { feature: "Vulnerability management", cells: [Y(), Q("context"), N] },
  { feature: "Case management for OT IR", cells: [Y(), Q("intel input"), N] },
  { feature: "Finished ICS threat intelligence", cells: [N, Y(), N] },
  { feature: "Threat-group profiles (CHERNOVITE etc.)", cells: [Q("via WorldView"), Y(), N] },
  { feature: "Anonymised community sharing", cells: [N, N, Y()] },
  { feature: "Deployment", cells: [Q("On-prem or cloud"), Q("Subscription feed"), Q("Subscription opt-in")] },
  { feature: "SIEM and SOC integration", cells: [Y(), Y(), Y()] },
  { feature: "Compliance reporting (NERC CIP, IEC 62443)", cells: [Y(), Q("evidence"), N] },
  { feature: "Licensing basis", cells: [Q("Per site / asset"), Q("Subscription"), Q("Community opt-in")] },
];

type Tier = { name: string; position: string; bestFor: string[]; additions?: string[]; verdict: string; highlighted?: boolean };
const tiers: Tier[] = [
  { name: "Dragos Platform", position: "The core platform", bestFor: ["Critical-infrastructure operators", "Energy, utilities, water, O&G", "OT incident response programmes"], additions: ["Visibility and asset discovery", "Threat detection and VM", "Case management for IR"], verdict: "The ICS-IR foundation.", highlighted: true },
  { name: "WorldView", position: "ICS threat intelligence", bestFor: ["Operators facing named threat actors", "Teams running their own intel analysis", "Reporting to executive risk committees"], additions: ["Finished intelligence reports", "Threat-group profiles", "ICS-specific IOCs and TTPs"], verdict: "Adversary tradecraft as a service." },
  { name: "Neighborhood Keeper", position: "Community defence", bestFor: ["Multi-utility programmes", "Sector-level information-sharing groups", "Critical-infrastructure peer learning"], additions: ["Anonymised cross-customer detections", "Sector-wide visibility", "Community early warning"], verdict: "Many plants, one defence." },
];

const upgradePaths = [
  { from: "Dragos Platform", title: "ICS visibility, detection and IR", desc: "The core platform delivers asset visibility, ICS threat detection, vulnerability management and built-in OT incident-response workflow at a single site or across multiple plants." },
  { from: "+ WorldView", title: "ICS threat intelligence", desc: "Layer WorldView for finished intelligence reports, ICS-specific IOCs and threat-group profiles (CHERNOVITE, ELECTRUM, XENOTIME and more) that drive prioritisation and detection content." },
  { from: "+ Neighborhood Keeper", title: "Community-shared defence", desc: "Opt into the Neighborhood Keeper community to receive anonymised detections from peer critical-infrastructure operators, turning a single attack on one utility into a defence for the whole sector." },
];

const deploymentOptions = [
  { icon: "server" as const, title: "Dragos on-premises", body: "Self-hosted Dragos for air-gapped operators and sites with strict data-residency mandates. Default for sensitive critical-infrastructure customers." },
  { icon: "cloud" as const, title: "Dragos cloud", body: "Dragos-hosted cloud-managed option for organisations comfortable with SaaS, simplifies multi-site management." },
  { icon: "layers" as const, title: "Hybrid + intel feeds", body: "Most utility customers combine on-prem Platform with WorldView intel feeds and Neighborhood Keeper community participation. Artiflex sizes the right mix." },
];

const faqs = [
  { question: "When does Dragos beat Nozomi or Claroty?", answer: "When the threat model is nation-state-level attack on critical infrastructure (energy, utilities, water, oil and gas). Dragos's ICS-CERT pedigree, WorldView intelligence and Neighborhood Keeper community-defence model are unmatched for adversary research and ICS-IR depth. Nozomi and Claroty win for breadth (manufacturing, healthcare, IoMT, IoT); Dragos wins for depth in heavy industry." },
  { question: "What is Neighborhood Keeper?", answer: "A community-defence programme where Dragos customers can opt in to share anonymised detections across the community. When CHERNOVITE attacks one utility, anonymised indicators flow to every other participating utility within minutes. Unique to Dragos and particularly powerful for sector-level defence (electric grid operators, water authorities)." },
  { question: "Who are the named threat groups Dragos tracks?", answer: "Dragos tracks named groups including CHERNOVITE (PIPEDREAM/INCONTROLLER ICS malware framework), XENOTIME (TRITON/TRISIS petrochemical safety attack), ELECTRUM (Industroyer / Crashoverride against Ukraine grid), KAMACITE (BlackEnergy lineage) and PARISITE. WorldView publishes finished intelligence on these groups and feeds detection content tuned to their tradecraft." },
  { question: "Is Dragos overkill for manufacturing or healthcare?", answer: "Often yes. Dragos is optimised for the highest-stakes critical-infrastructure threat model. Manufacturing, pharma and healthcare typically get better outcome-per-dirham from Nozomi (visibility and AI detection) or Claroty (breadth and IoMT depth). Artiflex picks the right vendor during the assessment, not the most expensive one." },
  { question: "How does Dragos integrate with the SOC?", answer: "Forwarders to Splunk, Microsoft Sentinel, IBM QRadar, Rapid7 InsightIDR and ServiceNow. The Dragos Platform produces ICS-aware alerts with WorldView context attached, so analysts see threat-group attribution and finished-intelligence references in the same workflow." },
  { question: "Can we deploy Dragos air-gapped?", answer: "Yes. Dragos on-premises supports fully air-gapped deployment, with WorldView intelligence delivered via offline mechanisms where required. The default for most utility and energy customers in the UAE." },
  { question: "What does an Artiflex Dragos deployment include?", answer: "Site survey, sensor sizing and placement, deployment, ICS-protocol tuning, WorldView intel integration, Neighborhood Keeper enrolment (if applicable), SOC integration and ongoing management, all mapped to NERC CIP, IEC 62443, NESA and ADHICS. Fully managed, co-managed or assessment-only." },
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

export default function OTICSSecurityDragos() {
  const { open: openContact } = useContactModal();
  const [activeTier, setActiveTier] = useState(0);

  return (
    <>
      <title>Dragos Platform | OT / ICS Security UAE | Artiflex IT</title>
      <meta name="description" content="Dragos Platform, WorldView and Neighborhood Keeper. The ICS-IR specialist for critical infrastructure. Deployed and managed by Artiflex IT for UAE utilities, energy and water." />
      <link rel="canonical" href="https://artiflexit.com/cybersecurity/ot-ics-security/dragos" />

      <section className="relative overflow-hidden bg-gradient-to-br from-[#04101E] to-[#0A3D6B]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(40,181,225,0.18),transparent_55%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(27,138,199,0.10),transparent_60%)]" />
        <div className="relative z-10 border-b border-white/5"><div className="shell flex w-full items-center gap-2 pt-24 pb-3 text-[11px] text-slate-400 sm:pt-28"><Link to="/" className="transition-colors hover:text-white">Home</Link><span className="text-slate-600">/</span><Link to="/cybersecurity" className="transition-colors hover:text-white">Cybersecurity</Link><span className="text-slate-600">/</span><Link to="/cybersecurity/ot-ics-security" className="transition-colors hover:text-white">OT / ICS Security</Link><span className="text-slate-600">/</span><span className="font-medium text-[#28B5E1]">{vendor.name}</span></div></div>

        <div className="shell relative z-10 w-full py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="lg:col-span-7">
              <div className="flex items-center gap-3"><span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-transparent to-[#28B5E1]" /><span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-[#28B5E1]">{vendor.bestFor}</span></div>
              <p className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">{vendor.vendorCompany}</p>
              <h1 className="mt-3 font-display text-4xl font-bold leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]">Dragos <span className="bg-gradient-to-r from-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">Platform</span></h1>
              <p className="mt-5 max-w-xl font-display text-xl leading-snug text-[#9CD6EE] sm:text-2xl">{vendor.tagline}</p>
              <div className="mt-6 max-w-2xl border-l-2 border-[#28B5E1]/30 pl-5"><p className="text-base leading-relaxed text-slate-300 sm:text-lg">{vendor.description}</p></div>

              <div className="mt-8 grid max-w-xl grid-cols-3 gap-2 sm:gap-3">
                {[{ ab: "Platform", full: "Core ICS visibility + IR" }, { ab: "WorldView", full: "ICS threat intel" }, { ab: "NK", full: "Community defence" }].map((c) => (
                  <div key={c.ab} className="rounded-xl border border-[#28B5E1]/40 bg-gradient-to-br from-[#28B5E1]/15 to-[#1B8AC7]/[0.05] p-3 text-center sm:p-4">
                    <p className="font-display text-base font-bold tracking-wide text-[#28B5E1] sm:text-lg">{c.ab}</p>
                    <p className="mt-1 text-[10px] leading-tight text-slate-300 sm:text-[11px]">{c.full}</p>
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
                <div className="relative z-10 hidden h-full w-full flex-col items-center justify-center text-center" style={{ display: "none" }}><p className="font-display text-3xl font-bold tracking-tight text-slate-900">Dragos</p><p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">ICS Cybersecurity</p></div>
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
          <div className="mx-auto max-w-3xl text-center"><span className="inline-flex items-center gap-2 rounded-full border border-[#28B5E1]/20 bg-white/60 px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7] backdrop-blur-xl shadow-[0_2px_10px_rgba(15,23,42,0.04)]"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#28B5E1] shadow-[0_0_8px_rgba(40,181,225,0.8)]" />Overview</span><h2 className="mt-6 font-display text-3xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-4xl md:text-5xl">What <span className="bg-gradient-to-r from-[#1B8AC7] via-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">Dragos</span> is</h2></div>
          <div className="relative mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
            <div className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-7 shadow-[0_10px_40px_-10px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-10px_rgba(40,181,225,0.20)] sm:p-9 lg:col-span-2"><span aria-hidden="true" className="pointer-events-none absolute -top-16 -right-12 h-40 w-40 rounded-full bg-gradient-to-br from-[#28B5E1]/15 to-transparent blur-2xl" /><span aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-gradient-to-tr from-[#1B8AC7]/15 to-transparent blur-2xl" /><span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/40 to-transparent" /><div className="relative space-y-5">{overviewParagraphs.map((p, i) => (<p key={i} className="text-[15px] leading-[1.75] text-slate-700 sm:text-base">{p}</p>))}</div></div>
            <div className="group relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#0A3D6B] via-[#04101E] to-[#020617] p-7 shadow-[0_20px_60px_-15px_rgba(15,28,46,0.45)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-15px_rgba(40,181,225,0.45)] sm:p-9"><span aria-hidden="true" className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-[#28B5E1]/35 blur-3xl" /><span aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-violet-500/15 blur-3xl" /><span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/80 to-transparent" /><div className="relative"><h3 className="font-display text-2xl font-bold leading-[1.1] text-white sm:text-3xl md:text-[2rem]">ICS-CERT <br /><span className="bg-gradient-to-r from-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">pedigree</span></h3><p className="mt-5 text-sm leading-[1.7] text-white/80 sm:text-[15px]">Founded by former US ICS-CERT and Air Force ICS cyber-warfare hunters. The deepest ICS-IR pedigree on the market, the right choice for critical-infrastructure operators facing nation-state-level threats.</p></div></div>
          </div>
          <ul className="relative mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-6 lg:grid-cols-4">{overviewCapabilities.map((item) => (<li key={item} className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-5 shadow-[0_6px_24px_-8px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-[#28B5E1]/40 hover:bg-white/80 hover:shadow-[0_14px_40px_-10px_rgba(40,181,225,0.25)]"><span aria-hidden="true" className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-tr from-[#28B5E1]/0 to-transparent blur-2xl transition-all duration-500 group-hover:from-[#28B5E1]/20" /><div className="relative flex items-start gap-3"><span aria-hidden="true" className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#28B5E1] to-[#1B8AC7] text-white shadow-[0_4px_12px_-2px_rgba(40,181,225,0.5)]"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><path d="M4 10l4 4 8-8" /></svg></span><span className="text-[13.5px] font-medium leading-snug text-slate-800 sm:text-sm">{item}</span></div></li>))}</ul>
        </div>
      </section>

      {/* WHY IT WINS */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(27,138,199,0.06),transparent_55%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Why it wins</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">What makes Dragos the critical-infrastructure specialist</h2><p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">The strengths that show up most often where nation-state threat models, ICS-IR depth and threat-actor attribution matter most.</p></div>
          <div className="relative mx-auto max-w-4xl px-5 sm:px-6"><div className="mt-10 grid gap-4 sm:grid-cols-3">{whyWinsStats.map((stat, i) => (<motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, delay: 0.05 * i }} className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#1E4E73] via-[#143E62] to-[#042542] px-6 py-7 shadow-md"><p className={`font-display text-2xl font-bold leading-none sm:text-2xl ${statToneText[stat.tone]}`}>{stat.value}</p><p className="mt-3 text-sm leading-relaxed text-slate-200">{stat.label}</p></motion.div>))}</div></div>
          <div className="mt-12 grid items-start gap-1 lg:grid-cols-2">{strengths.map((s, i) => { const tone = strengthToneMap[s.tone]; const Icon = s.Icon; const isOrphan = i === strengths.length - 1 && strengths.length % 2 === 1; return (<motion.div key={s.title} tabIndex={0} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: 0.05 * i }} className={`group rounded-xl border border-white/10 bg-gradient-to-br from-[#04101E] to-[#0A3D6B] p-4 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/40 hover:shadow-lg focus-within:border-[#28B5E1]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#28B5E1]/40 ${isOrphan ? "lg:col-span-2" : ""}`}><div className="flex items-stretch gap-2.5"><span className={`flex w-11 shrink-0 items-center justify-center rounded-lg border ${tone.iconBox}`}><Icon className="h-5 w-5" /></span><div className="min-w-0">{s.tag && <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${tone.tag}`}>{s.tag}</span>}<h3 className="mt-1.5 font-display text-sm font-semibold text-white sm:text-base">{s.title}</h3></div></div><div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]"><div className="overflow-hidden"><p className="mt-2.5 text-xs leading-relaxed text-slate-300 sm:text-sm">{s.desc}</p></div></div></motion.div>); })}</div>
        </div>
      </section>

      {/* BEST FIT */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#04101E] to-[#020617] py-12 sm:py-16">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.10),transparent_60%)]" />
        <div className="shell relative">
          <div className="border-b border-white/10 pb-5"><h2 className="font-display text-xl font-bold leading-tight text-white sm:text-2xl lg:text-[1.7rem]">Who should put <span className="bg-gradient-to-r from-[#28B5E1] to-[#7ad4f0] bg-clip-text text-transparent">Dragos</span> on the shortlist</h2></div>
          <ul className="mt-6 grid gap-2 sm:mt-8 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-2.5">{bestFitProfile.map((p) => (<li key={p} className="group relative flex items-start gap-3 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/30 hover:bg-white/[0.05]"><span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#28B5E1]/15 text-[#28B5E1] ring-1 ring-inset ring-[#28B5E1]/25 transition-colors group-hover:bg-[#28B5E1] group-hover:text-white group-hover:ring-[#28B5E1]"><CheckIcon className="h-3 w-3" /></span><p className="text-[13px] leading-relaxed text-slate-200 sm:text-[13.5px]">{p}</p></li>))}</ul>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="relative bg-white py-16 sm:py-24"><div className="shell"><div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Core features</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">What's inside Dragos</h2></div><div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-2 lg:gap-x-10">{coreFeatures.map((f) => (<div key={f.title} className="flex items-start gap-3 border-b border-slate-200 pb-3 pt-1"><span aria-hidden="true" className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#28B5E1]/10 text-[#1B8AC7]"><CheckIcon className="h-3.5 w-3.5" /></span><p className="text-sm leading-relaxed text-slate-700"><span className="font-semibold text-slate-900">{f.title},</span> {f.desc}</p></div>))}</div></div></section>

      {/* PRODUCT POSITIONING */}
      <section id="editions" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Choosing a product</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Simplified positioning, which Dragos product fits</h2><p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">Dragos is sold as three complementary products. Most UAE critical-infrastructure programmes start with the Platform and add WorldView and Neighborhood Keeper as the programme matures.</p></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{tiers.map((t, idx) => { const active = activeTier === idx; return (<button key={t.name} type="button" onClick={() => setActiveTier(idx)} aria-pressed={active} className={`group relative overflow-hidden rounded-2xl border bg-white p-5 text-left transition-all duration-300 hover:-translate-y-0.5 ${t.highlighted ? "border-amber-300 ring-1 ring-amber-200 shadow-[0_12px_36px_-12px_rgba(246,183,60,0.30)]" : "border-slate-200 shadow-sm hover:border-[#28B5E1]/40"} ${active ? "scale-[1.02] ring-2 ring-[#28B5E1]/40" : ""}`}>{t.highlighted && (<span className="absolute -top-px left-5 inline-flex rounded-b-md bg-amber-400 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-amber-950">★ Start here</span>)}<p className="mt-3 font-display text-lg font-bold text-slate-900">{t.name}</p><p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#1B8AC7]">{t.position}</p><p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Best for</p><ul className="mt-1 space-y-1">{t.bestFor.map((b) => (<li key={b} className="flex gap-1.5 text-[12.5px] leading-snug text-slate-700"><span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#28B5E1]" />{b}</li>))}</ul>{t.additions && (<><p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">What it adds</p><ul className="mt-1 space-y-1">{t.additions.map((a) => (<li key={a} className="flex gap-1.5 text-[12.5px] leading-snug text-slate-700"><span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#28B5E1]" />{a}</li>))}</ul></>)}<p className="mt-4 border-t border-slate-200 pt-3 font-display text-[13px] font-bold italic text-slate-900">"{t.verdict}"</p></button>); })}</div>
        </div>
      </section>

      {/* STRATEGIC UPGRADE PATH */}
      <section className="relative bg-white py-16 sm:py-24"><div className="shell"><div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">The strategic view</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">How the products relate</h2><p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">Start with the Platform, layer WorldView for ICS threat intelligence, opt into Neighborhood Keeper for community-shared defence.</p></div><div className="mt-10 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]"><div className="grid grid-cols-1 gap-4 bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-5 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE] sm:grid-cols-[1fr_2fr] sm:px-7 sm:text-[11px]"><span>Step</span><span>What it gives you</span></div>{upgradePaths.map((u) => (<div key={u.from} className="grid grid-cols-1 gap-4 border-t border-[#0A3D6B]/20 px-5 py-4 transition-colors hover:bg-[#28B5E1]/[0.04] sm:grid-cols-[1fr_2fr] sm:px-7"><span className="font-display text-sm font-bold text-slate-900 sm:text-base">{u.from}</span><span className="text-sm leading-relaxed text-slate-700 sm:text-[15px]"><span className="font-semibold text-[#1B8AC7]">{u.title}.</span> {u.desc}</span></div>))}</div></div></section>

      {/* MODULE MATRIX */}
      <section id="license-matrix" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24"><div className="shell"><div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Licensing</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Dragos products and capabilities</h2><p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">The Dragos Platform is licensed per site or asset, with WorldView and Neighborhood Keeper as separate subscriptions.</p></div><div className="mt-10 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]"><div className="overflow-x-auto"><table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + editions.length * 116) }}><thead><tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]"><th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-4 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">Capability</th>{editions.map((e) => (<th key={e.name} className="border-l border-white/15 px-2 py-3 sm:px-4 sm:py-4 text-center align-bottom font-display text-sm font-semibold text-white">{e.name}<span className="mt-1 block font-mono text-[10px] font-normal uppercase tracking-wider text-[#9CD6EE]">{e.subtitle}</span></th>))}</tr></thead><tbody>{licRows.map((row, rIdx) => (<tr key={row.feature} className={`border-t border-[#0A3D6B]/15 transition-colors hover:bg-[#28B5E1]/[0.04] ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`}><th scope="row" className={`sticky left-0 z-10 px-4 py-3 align-middle font-display text-[13px] font-semibold text-slate-900 ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>{row.feature}</th>{row.cells.map((c, cIdx) => { const color = c.type === "yes" ? "text-emerald-600 font-bold" : c.type === "no" ? "text-slate-300" : "text-[#1B8AC7] font-semibold"; return (<td key={cIdx} className={`border-l border-[#0A3D6B]/15 px-3 py-3 text-center align-middle text-[12.5px] ${color}`}>{c.value}</td>); })}</tr>))}</tbody></table></div></div></div></section>

      {/* DEPLOYMENT */}
      <section className="relative bg-white py-12 sm:py-16"><div className="shell"><div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6"><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">Deployment Options</p><h2 className="font-display text-xl font-semibold leading-tight text-slate-900 sm:text-2xl">How we deliver Dragos <span className="font-normal text-slate-500">across UAE utilities and energy</span></h2></div><div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">{deploymentOptions.map((opt) => { const Icon = opt.icon === "server" ? ServerIcon : opt.icon === "layers" ? LayersIcon : CloudIcon; return (<div key={opt.title} className="rounded-xl border border-slate-200 bg-white p-5 transition-colors duration-300 hover:border-slate-300"><div className="flex items-center gap-2.5"><span aria-hidden className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500"><Icon className="h-4 w-4" /></span><h3 className="font-display text-sm font-semibold text-slate-900 sm:text-[15px]">{opt.title}</h3></div><p className="mt-3 text-[13px] leading-[1.6] text-slate-500 sm:text-sm">{opt.body}</p></div>); })}</div></div></section>

      {/* WHY ARTIFLEX */}
      <section className="relative bg-white py-16 sm:py-24"><div className="shell"><div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0A3D6B] via-[#04101E] to-[#020617] p-8 shadow-xl shadow-[#1B8AC7]/10 sm:p-12"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#28B5E1]">Why Artiflex IT</p><h2 className="mt-4 font-display text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">Delivering Dragos across the UAE</h2><p className="mt-6 text-base leading-relaxed text-slate-200 sm:text-lg">Dragos is the right answer for UAE utilities, energy, water and critical-infrastructure operators facing nation-state-level threats. Artiflex handles site survey, sensor placement, deployment, WorldView integration, Neighborhood Keeper enrolment, SOC integration and ongoing management, all mapped to NERC CIP, IEC 62443, NESA and ADHICS. Fully managed, co-managed or assessment-only.</p><div className="mt-8 flex flex-wrap gap-4"><Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#28B5E1] px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:bg-white sm:text-base">Talk to our Consultant</Link><Link to="/cybersecurity/ot-ics-security" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-[#28B5E1]/50 hover:bg-white/10 sm:text-base">Back to OT / ICS Security</Link></div></div></div></section>

      {/* FAQ */}
      <section className="relative bg-slate-50 py-16 sm:py-24"><div className="shell"><div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Frequently asked</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Dragos questions we hear from UAE buyers</h2></div><div className="mt-10"><FAQAccordion items={faqs} /></div></div></section>

      <CTASection title="Ready to evaluate Dragos?" description="Book a free OT posture assessment and we will scope the Dragos Platform, WorldView intelligence and Neighborhood Keeper community-defence model for your UAE utility or energy estate." primaryButton={{ text: "Book a free assessment", action: "modal" }} secondaryButton={{ text: "Compare OT vendors", href: "/cybersecurity/ot-ics-security#vendor-matrix" }} />
    </>
  );
}
