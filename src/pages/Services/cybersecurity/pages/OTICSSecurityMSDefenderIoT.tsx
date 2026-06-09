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
  CloudIcon,
  ServerIcon,
} from "@/components/icons";

const vendor = {
  name: "Microsoft Defender for IoT",
  vendorCompany: "Microsoft · Built on CyberX acquisition (2020)",
  bestFor: "Microsoft-aligned SOCs · Sentinel + Defender XDR",
  tagline: "Agentless OT and IoT security in the Microsoft stack",
  description:
    "Microsoft Defender for IoT brings agentless OT and IoT discovery and ML-based threat detection into the Microsoft security stack. Built on the 2020 CyberX acquisition, the platform flows signals natively into Microsoft Sentinel and Defender XDR, making it the lowest-friction choice when M365, Azure and Sentinel are already the SOC standard. Both cloud-managed and on-premises (air-gapped) management modes are supported.",
  logo: "/logos/MicrosoftDefender.webp",
};

const overviewParagraphs = [
  "Microsoft entered the OT security market through the 2020 acquisition of CyberX, an Israeli OT security pioneer with strong industrial-protocol expertise. The product was rebranded as Microsoft Defender for IoT and integrated into the broader Microsoft Defender XDR and Microsoft Sentinel ecosystem, becoming the OT signal source for Microsoft-aligned SOCs.",
  "Two deployment modes coexist. The cloud-managed mode is the default and the right answer for modern Microsoft-aligned organisations: a Defender for IoT sensor passes telemetry to the Azure portal and signals flow into Sentinel and Defender XDR for unified IT-OT detection. The on-premises management mode preserves the previous CyberX architecture for air-gapped, sovereign or data-residency-restricted environments where cloud is not an option.",
  "Where Defender for IoT wins decisively is integration. For UAE customers already standardised on Microsoft 365, Azure, Sentinel and Defender XDR, the platform is the lowest-friction way to get OT signal into the same SOC, same analyst workflow, same incident-management process. Licensing is often consolidated under Microsoft enterprise agreements, removing a separate vendor procurement.",
];

const overviewCapabilities = [
  "Agentless OT and IoT discovery",
  "ML-based behavioural threat detection",
  "CyberX heritage and protocol expertise",
  "Native Sentinel and Defender XDR integration",
  "Cloud-managed or on-premises deployment",
  "Air-gapped support for sovereign environments",
  "Microsoft Threat Intelligence feeds",
  "Defender Vulnerability Management tie-in",
];

const strengths: { title: string; desc: string; tag?: string; tone: "emerald" | "violet" | "amber" | "sky" | "rose" | "slate"; Icon: React.FC<{ className?: string }>; }[] = [
  { title: "Native Microsoft integration", tag: "Sentinel + XDR", desc: "Defender for IoT pushes OT signal natively into Microsoft Sentinel and Defender XDR. For Microsoft-aligned SOCs that is the entire value, one analyst workflow, one incident pipeline, one ticketing process covering IT and OT.", tone: "emerald", Icon: NetworkIcon },
  { title: "CyberX protocol heritage", tag: "ICS DPI", desc: "The platform inherits CyberX's deep packet inspection of major industrial protocols (Modbus, DNP3, S7, EtherNet/IP, BACnet, OPC UA). Less breadth than Nozomi or Claroty but credible coverage for most plants.", tone: "sky", Icon: LayersIcon },
  { title: "Agentless deployment", tag: "Non-disruptive", desc: "Network sensor with no agents on industrial assets. Default passive monitoring with zero risk to production controllers, matching the deployment style plant operations actually accept.", tone: "violet", Icon: EyeIcon },
  { title: "Cloud or on-premises", tag: "Both first-class", desc: "Cloud-managed mode for modern Microsoft-aligned SOCs feeding Sentinel; on-premises mode for air-gapped, sovereign or data-residency-restricted plants where cloud is not an option. Both modes share the same CyberX-derived engine.", tone: "amber", Icon: CloudIcon },
  { title: "Microsoft Threat Intel", tag: "MS ecosystem signal", desc: "ML detection augmented by Microsoft Threat Intelligence, the same intelligence that powers Defender across the M365 fleet. OT detection benefits from Microsoft's broader telemetry advantage.", tone: "rose", Icon: ActivityIcon },
  { title: "Licensing consolidation", tag: "Microsoft EA", desc: "Often consolidated under existing Microsoft enterprise agreements, removing a separate vendor procurement, separate purchase orders and a separate licensing audit, the operational simplification matters at scale.", tone: "slate", Icon: ShieldIcon },
];

const whyWinsStats: { value: string; label: string; tone: "emerald" | "violet" | "sky" }[] = [
  { value: "Sentinel native", label: "OT signal flows directly into the Microsoft Sentinel SIEM and Defender XDR", tone: "emerald" },
  { value: "Agentless", label: "Network sensor with no agents on industrial controllers, non-disruptive by default", tone: "sky" },
  { value: "Cloud + on-prem", label: "Both deployment modes first-class, including air-gapped support", tone: "violet" },
];

const bestFitProfile = [
  "UAE customers already standardised on Microsoft 365, Azure, Sentinel and Defender XDR",
  "SOCs running Microsoft Sentinel that want OT signal in the same SIEM",
  "Organisations consolidating IT and OT detection under one Microsoft incident-management process",
  "Mid-sized industrial estates without the budget for best-of-breed OT specialists",
  "Plants where Microsoft enterprise-agreement consolidation simplifies procurement",
  "Air-gapped or sovereign-mandated sites needing on-premises Defender for IoT",
  "Customers running Defender Vulnerability Management who want OT assets in the same VM dashboard",
  "Programmes where Microsoft Threat Intelligence reach is a meaningful security advantage",
];

const coreFeatures = [
  { title: "Defender for IoT sensor", desc: "Agentless network sensor with industrial DPI." },
  { title: "Agentless OT/IoT discovery", desc: "Passive identification of every controller and connected device." },
  { title: "ML behavioural detection", desc: "CyberX-derived engine with ICS-aware analytics." },
  { title: "Industrial protocols", desc: "Modbus, DNP3, S7, EtherNet/IP, BACnet, OPC UA and more." },
  { title: "Sentinel integration", desc: "Native incident creation and KQL hunting." },
  { title: "Defender XDR integration", desc: "OT signal in the unified Defender incident view." },
  { title: "Cloud-managed mode", desc: "Azure portal for multi-site management." },
  { title: "On-premises mode", desc: "Air-gapped CyberX-style management server." },
  { title: "Microsoft Threat Intelligence", desc: "Augments detection with Defender ecosystem telemetry." },
  { title: "Defender VM integration", desc: "OT assets in the broader Defender Vulnerability Management view." },
];

type LicCell = { value: string; type: "yes" | "no" | "qual" };
type LicRow = { feature: string; cells: LicCell[] };
const editions = [
  { name: "D4IoT Cloud", subtitle: "cloud-managed" },
  { name: "D4IoT On-Prem", subtitle: "air-gapped" },
];
const Y = (v = "✓"): LicCell => ({ value: v, type: "yes" });
const N: LicCell = { value: "✗", type: "no" };
const Q = (v: string): LicCell => ({ value: v, type: "qual" });

const licRows: LicRow[] = [
  { feature: "Primary positioning", cells: [Q("Azure-managed OT/IoT"), Q("Self-hosted OT/IoT")] },
  { feature: "Agentless asset discovery", cells: [Y(), Y()] },
  { feature: "Industrial protocol parsing", cells: [Y(), Y()] },
  { feature: "ML threat detection", cells: [Y(), Y()] },
  { feature: "Vulnerability management", cells: [Y(), Y()] },
  { feature: "Microsoft Sentinel integration", cells: [Y(), Q("via forwarder")] },
  { feature: "Microsoft Defender XDR integration", cells: [Y(), N] },
  { feature: "Microsoft Threat Intelligence", cells: [Y(), Q("static feeds")] },
  { feature: "Cloud-managed multi-site console", cells: [Y(), N] },
  { feature: "Air-gapped / fully on-prem", cells: [N, Y()] },
  { feature: "Defender Vulnerability Management tie-in", cells: [Y(), Q("partial")] },
  { feature: "Compliance reporting (IEC 62443, NESA)", cells: [Y(), Y()] },
  { feature: "Licensing basis", cells: [Q("Per device, Azure billing"), Q("Per device, on-prem")] },
];

type Tier = { name: string; position: string; bestFor: string[]; additions?: string[]; verdict: string; highlighted?: boolean };
const tiers: Tier[] = [
  { name: "Defender for IoT (Cloud)", position: "Azure-managed OT/IoT", bestFor: ["Microsoft-aligned SOCs", "Sentinel + Defender XDR customers", "Multi-site cloud-led programmes"], additions: ["Native Sentinel integration", "Defender XDR incident view", "Microsoft Threat Intelligence"], verdict: "The Microsoft-native OT default.", highlighted: true },
  { name: "Defender for IoT (On-Prem)", position: "Air-gapped CyberX heritage", bestFor: ["Air-gapped or sovereign sites", "Data-residency-restricted plants", "Cloud-averse industrial environments"], additions: ["CyberX-style on-prem console", "Air-gapped operation", "Same detection engine as cloud mode"], verdict: "OT signal where cloud is off-limits." },
];

const upgradePaths = [
  { from: "Cloud mode default", title: "Modern Microsoft-aligned OT", desc: "The default deployment for UAE customers running Microsoft 365, Azure, Sentinel and Defender XDR. OT signal flows natively into the existing SOC, no separate console required." },
  { from: "On-prem mode", title: "Air-gapped or sovereign sites", desc: "Where cloud is off-limits (sovereign workloads, air-gapped plants, strict data-residency mandates) the on-prem CyberX-style architecture provides the same detection engine, fully self-hosted." },
  { from: "Hybrid", title: "Mixed cloud + on-prem fleet", desc: "Most large UAE programmes combine cloud-managed sites with one or two on-premises sites for the most sensitive plants. Artiflex sizes the right mix during the assessment." },
];

const deploymentOptions = [
  { icon: "cloud" as const, title: "Cloud-managed (default)", body: "Defender for IoT sensors push telemetry to the Azure portal. The default deployment for Microsoft-aligned UAE customers, signals flow into Sentinel and Defender XDR." },
  { icon: "server" as const, title: "On-premises (air-gapped)", body: "Self-hosted Defender for IoT management server in CyberX-heritage architecture. The right answer for sovereign, air-gapped and data-residency-restricted sites." },
  { icon: "layers" as const, title: "Hybrid + Sentinel", body: "Cloud-managed for the majority of plants with on-premises for the most sensitive sites. All signal feeds Microsoft Sentinel for one unified SOC view." },
];

const faqs = [
  { question: "When does Microsoft Defender for IoT beat Nozomi or Claroty?", answer: "When Microsoft Sentinel, Defender XDR and M365 are already the SOC standard. Native integration makes the operational case overwhelming, OT signal lands in the same incident pipeline as IT. For Microsoft-aligned organisations, the integration value typically outweighs the deeper ICS depth of Nozomi or Claroty." },
  { question: "Is Defender for IoT just CyberX rebranded?", answer: "No. The product was built on the CyberX acquisition (2020), inheriting the deep packet inspection and ICS-protocol heritage, but it has been substantially evolved and integrated into the Microsoft security stack. Sentinel-native incident creation, Defender XDR incident view, Microsoft Threat Intelligence augmentation and Azure portal management are all post-acquisition additions." },
  { question: "Can we deploy Defender for IoT air-gapped?", answer: "Yes. The on-premises management mode is the CyberX-heritage architecture, fully self-hosted and supports air-gapped operation for sovereign workloads, government plants and data-residency-restricted environments. Same detection engine as the cloud mode." },
  { question: "How does Defender for IoT integrate with Sentinel?", answer: "Natively. Incidents created in Defender for IoT flow directly into Microsoft Sentinel with OT context attached. KQL hunting across IT and OT signal is supported. The platform also appears in the unified Defender XDR incident view for the cloud-managed mode." },
  { question: "What does Defender for IoT cost?", answer: "Licensed per device with Azure-billing for cloud mode. For Microsoft customers with existing Enterprise Agreements, licensing often consolidates under the EA, removing a separate vendor procurement. Artiflex confirms exact pricing with Microsoft during scoping." },
  { question: "Is Defender for IoT enough on its own, or do we still need a SIEM?", answer: "Defender for IoT is the OT signal source; you still need Microsoft Sentinel (or another SIEM) as the SOC platform. For Microsoft-aligned customers, Sentinel is the natural pairing and the integration value is the entire point." },
  { question: "What does an Artiflex Defender for IoT deployment include?", answer: "Site survey, sensor sizing and placement, deployment, ICS-protocol tuning, Sentinel and Defender XDR integration, KQL hunt-pack setup and ongoing management, all mapped to IEC 62443, NESA, ADHICS and ISO 27001. Fully managed, co-managed or assessment-only." },
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

export default function OTICSSecurityMSDefenderIoT() {
  const { open: openContact } = useContactModal();
  const [activeTier, setActiveTier] = useState(0);

  return (
    <>
      <title>Microsoft Defender for IoT | OT / ICS UAE | Artiflex IT</title>
      <meta name="description" content="Microsoft Defender for IoT, agentless OT and IoT security native to Microsoft Sentinel and Defender XDR. Cloud or air-gapped. Deployed and managed by Artiflex IT for UAE." />
      <link rel="canonical" href="https://artiflexit.com/cybersecurity/ot-ics-security/microsoft-defender-iot" />

      <section className="relative overflow-hidden bg-gradient-to-br from-[#04101E] to-[#0A3D6B]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(40,181,225,0.18),transparent_55%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(27,138,199,0.10),transparent_60%)]" />
        <div className="relative z-10 border-b border-white/5"><div className="shell flex w-full items-center gap-2 pt-24 pb-3 text-[11px] text-slate-400 sm:pt-28"><Link to="/" className="transition-colors hover:text-white">Home</Link><span className="text-slate-600">/</span><Link to="/cybersecurity" className="transition-colors hover:text-white">Cybersecurity</Link><span className="text-slate-600">/</span><Link to="/cybersecurity/ot-ics-security" className="transition-colors hover:text-white">OT / ICS Security</Link><span className="text-slate-600">/</span><span className="font-medium text-[#28B5E1]">{vendor.name}</span></div></div>

        <div className="shell relative z-10 w-full py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="lg:col-span-7">
              <div className="flex items-center gap-3"><span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-transparent to-[#28B5E1]" /><span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-[#28B5E1]">{vendor.bestFor}</span></div>
              <p className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">{vendor.vendorCompany}</p>
              <h1 className="mt-3 font-display text-4xl font-bold leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]">Microsoft Defender <span className="bg-gradient-to-r from-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">for IoT</span></h1>
              <p className="mt-5 max-w-xl font-display text-xl leading-snug text-[#9CD6EE] sm:text-2xl">{vendor.tagline}</p>
              <div className="mt-6 max-w-2xl border-l-2 border-[#28B5E1]/30 pl-5"><p className="text-base leading-relaxed text-slate-300 sm:text-lg">{vendor.description}</p></div>

              <div className="mt-8 grid max-w-xl grid-cols-2 gap-2 sm:gap-3">
                {[{ ab: "Cloud", full: "Sentinel + XDR native" }, { ab: "On-Prem", full: "Air-gapped CyberX heritage" }].map((c) => (
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
                <div className="relative z-10 hidden h-full w-full flex-col items-center justify-center text-center" style={{ display: "none" }}><p className="font-display text-2xl font-bold tracking-tight text-slate-900">Microsoft</p><p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Defender for IoT</p></div>
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
          <div className="mx-auto max-w-3xl text-center"><span className="inline-flex items-center gap-2 rounded-full border border-[#28B5E1]/20 bg-white/60 px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7] backdrop-blur-xl shadow-[0_2px_10px_rgba(15,23,42,0.04)]"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#28B5E1] shadow-[0_0_8px_rgba(40,181,225,0.8)]" />Overview</span><h2 className="mt-6 font-display text-3xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-4xl md:text-5xl">What <span className="bg-gradient-to-r from-[#1B8AC7] via-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">Defender for IoT</span> is</h2></div>
          <div className="relative mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
            <div className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-7 shadow-[0_10px_40px_-10px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-10px_rgba(40,181,225,0.20)] sm:p-9 lg:col-span-2"><span aria-hidden="true" className="pointer-events-none absolute -top-16 -right-12 h-40 w-40 rounded-full bg-gradient-to-br from-[#28B5E1]/15 to-transparent blur-2xl" /><span aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-gradient-to-tr from-[#1B8AC7]/15 to-transparent blur-2xl" /><span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/40 to-transparent" /><div className="relative space-y-5">{overviewParagraphs.map((p, i) => (<p key={i} className="text-[15px] leading-[1.75] text-slate-700 sm:text-base">{p}</p>))}</div></div>
            <div className="group relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#0A3D6B] via-[#04101E] to-[#020617] p-7 shadow-[0_20px_60px_-15px_rgba(15,28,46,0.45)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-15px_rgba(40,181,225,0.45)] sm:p-9"><span aria-hidden="true" className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-[#28B5E1]/35 blur-3xl" /><span aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-violet-500/15 blur-3xl" /><span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/80 to-transparent" /><div className="relative"><h3 className="font-display text-2xl font-bold leading-[1.1] text-white sm:text-3xl md:text-[2rem]">Native to <br /><span className="bg-gradient-to-r from-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">Sentinel + XDR</span></h3><p className="mt-5 text-sm leading-[1.7] text-white/80 sm:text-[15px]">OT signal flows into Microsoft Sentinel for SIEM and Defender XDR for unified incident response. One analyst workflow, one incident pipeline, one ticketing process across IT and OT for Microsoft-aligned SOCs.</p></div></div>
          </div>
          <ul className="relative mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-6 lg:grid-cols-4">{overviewCapabilities.map((item) => (<li key={item} className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-5 shadow-[0_6px_24px_-8px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-[#28B5E1]/40 hover:bg-white/80 hover:shadow-[0_14px_40px_-10px_rgba(40,181,225,0.25)]"><span aria-hidden="true" className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-tr from-[#28B5E1]/0 to-transparent blur-2xl transition-all duration-500 group-hover:from-[#28B5E1]/20" /><div className="relative flex items-start gap-3"><span aria-hidden="true" className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#28B5E1] to-[#1B8AC7] text-white shadow-[0_4px_12px_-2px_rgba(40,181,225,0.5)]"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><path d="M4 10l4 4 8-8" /></svg></span><span className="text-[13.5px] font-medium leading-snug text-slate-800 sm:text-sm">{item}</span></div></li>))}</ul>
        </div>
      </section>

      {/* WHY IT WINS */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(27,138,199,0.06),transparent_55%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Why it wins</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">What makes Defender for IoT the Microsoft-native OT choice</h2><p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">The strengths that show up most often when Microsoft Sentinel, Defender XDR and M365 are already the SOC standard.</p></div>
          <div className="relative mx-auto max-w-4xl px-5 sm:px-6"><div className="mt-10 grid gap-4 sm:grid-cols-3">{whyWinsStats.map((stat, i) => (<motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, delay: 0.05 * i }} className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#1E4E73] via-[#143E62] to-[#042542] px-6 py-7 shadow-md"><p className={`font-display text-2xl font-bold leading-none sm:text-2xl ${statToneText[stat.tone]}`}>{stat.value}</p><p className="mt-3 text-sm leading-relaxed text-slate-200">{stat.label}</p></motion.div>))}</div></div>
          <div className="mt-12 grid items-start gap-1 lg:grid-cols-2">{strengths.map((s, i) => { const tone = strengthToneMap[s.tone]; const Icon = s.Icon; const isOrphan = i === strengths.length - 1 && strengths.length % 2 === 1; return (<motion.div key={s.title} tabIndex={0} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: 0.05 * i }} className={`group rounded-xl border border-white/10 bg-gradient-to-br from-[#04101E] to-[#0A3D6B] p-4 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/40 hover:shadow-lg focus-within:border-[#28B5E1]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#28B5E1]/40 ${isOrphan ? "lg:col-span-2" : ""}`}><div className="flex items-stretch gap-2.5"><span className={`flex w-11 shrink-0 items-center justify-center rounded-lg border ${tone.iconBox}`}><Icon className="h-5 w-5" /></span><div className="min-w-0">{s.tag && <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${tone.tag}`}>{s.tag}</span>}<h3 className="mt-1.5 font-display text-sm font-semibold text-white sm:text-base">{s.title}</h3></div></div><div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]"><div className="overflow-hidden"><p className="mt-2.5 text-xs leading-relaxed text-slate-300 sm:text-sm">{s.desc}</p></div></div></motion.div>); })}</div>
        </div>
      </section>

      {/* BEST FIT */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#04101E] to-[#020617] py-12 sm:py-16">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.10),transparent_60%)]" />
        <div className="shell relative">
          <div className="border-b border-white/10 pb-5"><h2 className="font-display text-xl font-bold leading-tight text-white sm:text-2xl lg:text-[1.7rem]">Who should put <span className="bg-gradient-to-r from-[#28B5E1] to-[#7ad4f0] bg-clip-text text-transparent">Defender for IoT</span> on the shortlist</h2></div>
          <ul className="mt-6 grid gap-2 sm:mt-8 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-2.5">{bestFitProfile.map((p) => (<li key={p} className="group relative flex items-start gap-3 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/30 hover:bg-white/[0.05]"><span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#28B5E1]/15 text-[#28B5E1] ring-1 ring-inset ring-[#28B5E1]/25 transition-colors group-hover:bg-[#28B5E1] group-hover:text-white group-hover:ring-[#28B5E1]"><CheckIcon className="h-3 w-3" /></span><p className="text-[13px] leading-relaxed text-slate-200 sm:text-[13.5px]">{p}</p></li>))}</ul>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="relative bg-white py-16 sm:py-24"><div className="shell"><div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Core features</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">What's inside Defender for IoT</h2></div><div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-2 lg:gap-x-10">{coreFeatures.map((f) => (<div key={f.title} className="flex items-start gap-3 border-b border-slate-200 pb-3 pt-1"><span aria-hidden="true" className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#28B5E1]/10 text-[#1B8AC7]"><CheckIcon className="h-3.5 w-3.5" /></span><p className="text-sm leading-relaxed text-slate-700"><span className="font-semibold text-slate-900">{f.title},</span> {f.desc}</p></div>))}</div></div></section>

      {/* MODE POSITIONING */}
      <section id="editions" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Choosing a mode</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Simplified positioning, which deployment mode fits</h2><p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">Defender for IoT runs in two deployment modes that share the same detection engine. Cloud mode is the Microsoft-aligned default; on-premises mode is for air-gapped or sovereign sites.</p></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">{tiers.map((t, idx) => { const active = activeTier === idx; return (<button key={t.name} type="button" onClick={() => setActiveTier(idx)} aria-pressed={active} className={`group relative overflow-hidden rounded-2xl border bg-white p-6 text-left transition-all duration-300 hover:-translate-y-0.5 ${t.highlighted ? "border-amber-300 ring-1 ring-amber-200 shadow-[0_12px_36px_-12px_rgba(246,183,60,0.30)]" : "border-slate-200 shadow-sm hover:border-[#28B5E1]/40"} ${active ? "scale-[1.01] ring-2 ring-[#28B5E1]/40" : ""}`}>{t.highlighted && (<span className="absolute -top-px left-5 inline-flex rounded-b-md bg-amber-400 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-amber-950">★ Default</span>)}<p className="mt-3 font-display text-xl font-bold text-slate-900">{t.name}</p><p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#1B8AC7]">{t.position}</p><p className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Best for</p><ul className="mt-1 space-y-1">{t.bestFor.map((b) => (<li key={b} className="flex gap-1.5 text-[13px] leading-snug text-slate-700"><span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#28B5E1]" />{b}</li>))}</ul>{t.additions && (<><p className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">What it adds</p><ul className="mt-1 space-y-1">{t.additions.map((a) => (<li key={a} className="flex gap-1.5 text-[13px] leading-snug text-slate-700"><span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#28B5E1]" />{a}</li>))}</ul></>)}<p className="mt-4 border-t border-slate-200 pt-3 font-display text-[13px] font-bold italic text-slate-900">"{t.verdict}"</p></button>); })}</div>
        </div>
      </section>

      {/* STRATEGIC UPGRADE */}
      <section className="relative bg-white py-16 sm:py-24"><div className="shell"><div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">The strategic view</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Cloud, on-prem or hybrid</h2><p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">Cloud mode is the default for Microsoft-aligned customers. On-prem mode covers air-gapped sites. Hybrid is common at scale.</p></div><div className="mt-10 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]"><div className="grid grid-cols-1 gap-4 bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-5 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE] sm:grid-cols-[1fr_2fr] sm:px-7 sm:text-[11px]"><span>Mode</span><span>What it gives you</span></div>{upgradePaths.map((u) => (<div key={u.from} className="grid grid-cols-1 gap-4 border-t border-[#0A3D6B]/20 px-5 py-4 transition-colors hover:bg-[#28B5E1]/[0.04] sm:grid-cols-[1fr_2fr] sm:px-7"><span className="font-display text-sm font-bold text-slate-900 sm:text-base">{u.from}</span><span className="text-sm leading-relaxed text-slate-700 sm:text-[15px]"><span className="font-semibold text-[#1B8AC7]">{u.title}.</span> {u.desc}</span></div>))}</div></div></section>

      {/* MODE MATRIX */}
      <section id="license-matrix" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24"><div className="shell"><div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Licensing</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Defender for IoT deployment modes</h2><p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">Cloud-managed and on-premises modes share the same detection engine. The choice is operational, not technical.</p></div><div className="mt-10 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]"><div className="overflow-x-auto"><table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + editions.length * 116) }}><thead><tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]"><th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-4 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">Capability</th>{editions.map((e) => (<th key={e.name} className="border-l border-white/15 px-2 py-3 sm:px-4 sm:py-4 text-center align-bottom font-display text-sm font-semibold text-white">{e.name}<span className="mt-1 block font-mono text-[10px] font-normal uppercase tracking-wider text-[#9CD6EE]">{e.subtitle}</span></th>))}</tr></thead><tbody>{licRows.map((row, rIdx) => (<tr key={row.feature} className={`border-t border-[#0A3D6B]/15 transition-colors hover:bg-[#28B5E1]/[0.04] ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`}><th scope="row" className={`sticky left-0 z-10 px-4 py-3 align-middle font-display text-[13px] font-semibold text-slate-900 ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>{row.feature}</th>{row.cells.map((c, cIdx) => { const color = c.type === "yes" ? "text-emerald-600 font-bold" : c.type === "no" ? "text-slate-300" : "text-[#1B8AC7] font-semibold"; return (<td key={cIdx} className={`border-l border-[#0A3D6B]/15 px-3 py-3 text-center align-middle text-[12.5px] ${color}`}>{c.value}</td>); })}</tr>))}</tbody></table></div></div></div></section>

      {/* DEPLOYMENT */}
      <section className="relative bg-white py-12 sm:py-16"><div className="shell"><div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6"><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">Deployment Options</p><h2 className="font-display text-xl font-semibold leading-tight text-slate-900 sm:text-2xl">How we deliver Defender for IoT <span className="font-normal text-slate-500">across UAE Microsoft-aligned SOCs</span></h2></div><div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">{deploymentOptions.map((opt) => { const Icon = opt.icon === "server" ? ServerIcon : opt.icon === "layers" ? LayersIcon : CloudIcon; return (<div key={opt.title} className="rounded-xl border border-slate-200 bg-white p-5 transition-colors duration-300 hover:border-slate-300"><div className="flex items-center gap-2.5"><span aria-hidden className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500"><Icon className="h-4 w-4" /></span><h3 className="font-display text-sm font-semibold text-slate-900 sm:text-[15px]">{opt.title}</h3></div><p className="mt-3 text-[13px] leading-[1.6] text-slate-500 sm:text-sm">{opt.body}</p></div>); })}</div></div></section>

      {/* WHY ARTIFLEX */}
      <section className="relative bg-white py-16 sm:py-24"><div className="shell"><div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0A3D6B] via-[#04101E] to-[#020617] p-8 shadow-xl shadow-[#1B8AC7]/10 sm:p-12"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#28B5E1]">Why Artiflex IT</p><h2 className="mt-4 font-display text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">Delivering Defender for IoT across the UAE</h2><p className="mt-6 text-base leading-relaxed text-slate-200 sm:text-lg">Defender for IoT is the right answer when Microsoft Sentinel, Defender XDR and M365 are already the SOC standard. Artiflex handles site survey, sensor placement, deployment (cloud or on-prem), ICS-protocol tuning, Sentinel and Defender XDR integration, KQL hunt-pack setup and ongoing management, all mapped to IEC 62443, NESA, ADHICS and ISO 27001. Fully managed, co-managed or assessment-only.</p><div className="mt-8 flex flex-wrap gap-4"><Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#28B5E1] px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:bg-white sm:text-base">Talk to our Consultant</Link><Link to="/cybersecurity/ot-ics-security" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-[#28B5E1]/50 hover:bg-white/10 sm:text-base">Back to OT / ICS Security</Link></div></div></div></section>

      {/* FAQ */}
      <section className="relative bg-slate-50 py-16 sm:py-24"><div className="shell"><div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Frequently asked</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Defender for IoT questions we hear from UAE buyers</h2></div><div className="mt-10"><FAQAccordion items={faqs} /></div></div></section>

      <CTASection title="Ready to evaluate Microsoft Defender for IoT?" description="Book a free OT posture assessment and we will scope sensor placement, Sentinel integration and the right deployment mode for your UAE Microsoft-aligned SOC." primaryButton={{ text: "Book a free assessment", action: "modal" }} secondaryButton={{ text: "Compare OT vendors", href: "/cybersecurity/ot-ics-security#vendor-matrix" }} />
    </>
  );
}
