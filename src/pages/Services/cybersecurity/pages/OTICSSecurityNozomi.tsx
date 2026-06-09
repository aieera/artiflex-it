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

/* ───────── DATA ───────── */

const vendor = {
  name: "Nozomi Networks",
  vendorCompany: "Nozomi Networks · Founded 2013",
  bestFor: "Recommended OT/IoT Platform · UAE Default",
  tagline: "AI-powered industrial visibility, detection and NDR",
  description:
    "Nozomi Networks brought the first AI-powered ICS visibility solution to market in 2013 and was named a Leader in the Gartner Magic Quadrant for CPS Protection. Guardian performs deep packet inspection across industrial protocols, builds a digital-twin baseline of normal behaviour and detects anomalies without disrupting operations. Vantage delivers SaaS-scale management across OT, IoT and IT. Artiflex IT's recommended OT/IoT platform for the UAE.",
  logo: "/logos/Nozomi.png",
};

const overviewParagraphs = [
  "Co-founded in 2013 by Andrea Carcano and Moreno Carullo, Nozomi Networks pioneered AI-powered visibility for industrial control systems. The platform was the first to apply machine-learning behavioural baselines to ICS protocols at scale, and the company has been named a Leader in the Gartner Magic Quadrant for CPS Protection Platforms in consecutive years.",
  "The product family is intentionally simple. Guardian is the sensor: a passive (and optionally active) network appliance or virtual machine that listens on a SPAN or TAP port and parses over 100 industrial protocols (Modbus, DNP3, EtherNet/IP, S7, BACnet, Profinet, IEC 60870-5, OPC UA and many more). Vantage is the SaaS management plane that aggregates many Guardians into one console for multi-site programmes. Arc is the host sensor for endpoint-level telemetry on engineering workstations and historians.",
  "Crucially, Nozomi is non-disruptive. Default deployment is passive monitoring with zero risk to the production network, which is the only deployment style that plant managers, safety engineers and operations directors will accept on day one. Active queries are available, ICS-aware and opt-in.",
];

const overviewCapabilities = [
  "AI-powered behavioural anomaly detection",
  "100+ ICS and IoT protocols parsed",
  "Passive (default) and ICS-aware active modes",
  "Digital-twin baseline of normal behaviour",
  "Multi-site SaaS management (Vantage)",
  "Endpoint sensor (Arc) for engineering workstations",
  "Native SIEM integration: Rapid7, Splunk, Sentinel",
  "IEC 62443, NERC CIP, NESA evidence",
];

const strengths: {
  title: string;
  desc: string;
  tag?: string;
  tone: "emerald" | "violet" | "amber" | "sky" | "rose" | "slate";
  Icon: React.FC<{ className?: string }>;
}[] = [
  {
    title: "AI-native ICS detection",
    tag: "First mover",
    desc: "The original AI-powered ICS visibility platform. Machine-learning baselines understand controller programs, historian flows and SCADA traffic without signature dependence, catching novel attacks and zero-days the moment they deviate from normal.",
    tone: "emerald",
    Icon: ActivityIcon,
  },
  {
    title: "100+ industrial protocols",
    tag: "Deepest parsers",
    desc: "Modbus, DNP3, EtherNet/IP, S7, BACnet, Profinet, IEC 60870-5, OPC UA and a hundred more. The widest native ICS protocol coverage on the market, which is what determines whether your plant is visible or invisible.",
    tone: "sky",
    Icon: LayersIcon,
  },
  {
    title: "Non-disruptive by default",
    tag: "Passive monitoring",
    desc: "Default deployment is fully passive on a SPAN or TAP port, zero risk to production. Active queries are available and ICS-aware, but opt-in. The deployment style that plant managers actually approve.",
    tone: "violet",
    Icon: ShieldIcon,
  },
  {
    title: "Industrial NDR",
    tag: "East-west OT",
    desc: "Sees lateral movement, unauthorised controller writes, rogue HMI sessions and east-west OT traffic that endpoint and IT-NDR tools cannot reach. The OT-native answer to network detection.",
    tone: "amber",
    Icon: EyeIcon,
  },
  {
    title: "SOC integration",
    tag: "Feeds your SIEM",
    desc: "Vantage and Guardian feed Rapid7 InsightIDR, Splunk, Microsoft Sentinel and ServiceNow with ICS-aware context. One analyst workflow, IT and OT correlated.",
    tone: "rose",
    Icon: NetworkIcon,
  },
  {
    title: "Gartner Leader",
    tag: "CPS Protection MQ",
    desc: "Named a Leader in the Gartner Magic Quadrant for CPS Protection Platforms. Independent validation that the platform meets enterprise OT requirements at scale.",
    tone: "slate",
    Icon: CheckIcon,
  },
];

const whyWinsStats: { value: string; label: string; tone: "emerald" | "violet" | "sky" }[] = [
  { value: "100+", label: "Industrial and IoT protocols parsed natively, widest coverage in the market", tone: "emerald" },
  { value: "Gartner Leader", label: "Magic Quadrant for CPS Protection Platforms, consecutive years", tone: "sky" },
  { value: "Passive", label: "Default deployment is non-disruptive, zero risk to production", tone: "violet" },
];

const bestFitProfile = [
  "UAE manufacturing, utilities, oil and gas, water and critical infrastructure with substantial OT footprints",
  "Plants where passive, non-disruptive deployment is a hard requirement set by safety and operations",
  "Multi-site programmes needing one SaaS pane of glass across many factories or substations (Vantage)",
  "Mixed OT, IoT and IT estates where the OT signal must flow into the wider SOC (Rapid7, Splunk, Sentinel)",
  "Compliance programmes targeting IEC 62443, NERC CIP, NESA and ADHICS that need audit-ready evidence",
  "Brownfield estates with legacy controllers and historians that cannot tolerate active scanning",
  "Organisations adding industrial NDR to an IT NDR programme rather than running parallel tools",
  "Engineering and security teams who want the Gartner Leader rather than a niche specialist",
];

const coreFeatures = [
  { title: "Asset discovery", desc: "Passive identification of every controller, HMI, historian and connected device." },
  { title: "Protocol parsing", desc: "100+ industrial protocols decoded natively (Modbus, DNP3, S7, OPC UA, BACnet)." },
  { title: "Behavioural detection", desc: "AI baselines flag anomalies in controller programs and flows." },
  { title: "Vulnerability mapping", desc: "Asset-level CVE matching against known industrial vulnerabilities." },
  { title: "Threat intelligence", desc: "Nozomi Networks Labs feeds and indicator updates." },
  { title: "Digital twin", desc: "Process variable and controller behaviour modelled to detect drift." },
  { title: "Multi-site management", desc: "Vantage SaaS aggregates many Guardians into one console." },
  { title: "Arc endpoint sensor", desc: "Host-level visibility on engineering workstations and historians." },
  { title: "SIEM integration", desc: "Native connectors for Rapid7, Splunk, Sentinel, QRadar, ServiceNow." },
  { title: "Compliance reporting", desc: "IEC 62443, NERC CIP, NESA, ADHICS evidence packs." },
];

/* ───────── LICENSE / DEPLOYMENT MATRIX ───────── */

type LicCell = { value: string; type: "yes" | "no" | "qual" };
type LicRow = { feature: string; cells: LicCell[] };

const editions = [
  { name: "Guardian", subtitle: "sensor" },
  { name: "Vantage", subtitle: "SaaS mgmt" },
  { name: "Arc", subtitle: "endpoint" },
];

const Y = (v = "✓"): LicCell => ({ value: v, type: "yes" });
const N: LicCell = { value: "✗", type: "no" };
const Q = (v: string): LicCell => ({ value: v, type: "qual" });

const licRows: LicRow[] = [
  { feature: "Primary positioning", cells: [Q("Network sensor on SPAN/TAP"), Q("Multi-site SaaS console"), Q("Endpoint sensor on hosts")] },
  { feature: "Passive ICS protocol parsing", cells: [Y(), Q("via Guardian"), N] },
  { feature: "100+ industrial protocols", cells: [Y(), Q("via Guardian"), N] },
  { feature: "AI behavioural baseline", cells: [Y(), Y(), Q("host telemetry")] },
  { feature: "Asset discovery", cells: [Y(), Y(), Q("host-level")] },
  { feature: "Vulnerability mapping", cells: [Y(), Y(), Y()] },
  { feature: "ICS-aware active queries (opt-in)", cells: [Y(), Q("via Guardian"), N] },
  { feature: "Endpoint host telemetry", cells: [N, Q("aggregates Arc"), Y()] },
  { feature: "Multi-site aggregation", cells: [Q("standalone"), Y(), N] },
  { feature: "SIEM and SOAR integration", cells: [Y(), Y(), Y()] },
  { feature: "Threat-intel feeds (Nozomi Labs)", cells: [Y(), Y(), Y()] },
  { feature: "Compliance reporting (IEC 62443, NERC CIP)", cells: [Y(), Y(), Q("partial")] },
  { feature: "Deployment", cells: [Q("Physical / virtual"), Q("Cloud SaaS or on-prem"), Q("Software agent")] },
  { feature: "Licensing basis", cells: [Q("Per sensor"), Q("Per managed asset / node"), Q("Per host")] },
];

/* ───────── COMPONENT POSITIONING ───────── */

type Tier = {
  name: string;
  position: string;
  bestFor: string[];
  additions?: string[];
  verdict: string;
  highlighted?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Guardian",
    position: "The OT network sensor",
    bestFor: ["Single-site or first-deployment plants", "Passive ICS monitoring on SPAN / TAP", "Air-gapped or stand-alone deployments"],
    additions: ["100+ ICS protocol parsers", "Asset inventory and behavioural detection", "Optional ICS-aware active queries"],
    verdict: "The OT visibility foundation.",
    highlighted: true,
  },
  {
    name: "Vantage",
    position: "The multi-site SaaS console",
    bestFor: ["Multi-plant manufacturers and utilities", "Centralised SOC operations across many sites", "Cloud-managed OT programmes"],
    additions: ["Aggregates many Guardians", "Cross-site correlation and reporting", "Vantage IQ AI-assisted analysis"],
    verdict: "OT visibility at programme scale.",
  },
  {
    name: "Arc",
    position: "The endpoint sensor",
    bestFor: ["Engineering workstations and historians", "Visibility where network sensing is blind", "Highly regulated assets needing host telemetry"],
    additions: ["Host-level process and config telemetry", "USB and removable-media monitoring", "Asset-level forensic evidence"],
    verdict: "OT visibility beyond the wire.",
  },
];

const upgradePaths = [
  { from: "Guardian alone", title: "Single-site OT visibility", desc: "Deploy Guardian on SPAN or TAP for full passive visibility of one site. The right starting point for any OT programme, the platform value is proven in 2 to 4 weeks." },
  { from: "+ Vantage", title: "Programme-scale management", desc: "Aggregate many Guardians into Vantage for multi-site correlation, cross-plant reporting and AI-assisted analysis. The right move once two or more sites are in scope." },
  { from: "+ Arc", title: "Beyond the network sensor", desc: "Arc adds host-level telemetry from engineering workstations, jump hosts and historians, including USB and removable-media events that network sensing cannot see." },
];

const deploymentOptions = [
  { icon: "server" as const, title: "Physical / virtual Guardian", body: "Guardian appliance or virtual machine on a SPAN/TAP port. The default OT sensor footprint per site, passive by default." },
  { icon: "cloud" as const, title: "Vantage SaaS", body: "Nozomi-hosted multi-tenant SaaS for centralised management across many Guardians. The default management plane for multi-site programmes." },
  { icon: "layers" as const, title: "Vantage on-premises", body: "Self-hosted Vantage for organisations with strict data-residency mandates. Artiflex sizes and operates the management plane on your infrastructure." },
];

const faqs = [
  { question: "Why is Nozomi Artiflex's recommended OT platform?", answer: "Three reasons: (1) Gartner Leader in CPS Protection MQ with the deepest AI-native ICS detection; (2) widest native protocol coverage (100+), which determines whether your plant is actually visible; (3) passive-by-default deployment, the only style plant operations will approve on day one. The platform also integrates cleanly with Rapid7, Splunk and Sentinel for IT-OT correlation." },
  { question: "Will deploying Nozomi disrupt production?", answer: "No. Default deployment is fully passive on a SPAN or TAP port, zero risk to production. The sensor listens only and does not transmit on the OT network. Active queries are available and ICS-aware, but opt-in: most UAE customers run passive on production and enable active scanning only on lab or specific assets after a tolerance test." },
  { question: "What protocols does Nozomi support?", answer: "Over 100 industrial and IoT protocols, including Modbus, DNP3, EtherNet/IP, S7 (Siemens), Profinet, BACnet (building automation), OPC UA, IEC 60870-5-104, IEC 61850 (substations), CIP and many proprietary variants. Coverage is updated continuously through Nozomi Networks Labs." },
  { question: "How does Guardian, Vantage and Arc fit together?", answer: "Guardian is the per-site network sensor. Vantage is the SaaS (or on-prem) management plane that aggregates many Guardians for multi-site programmes. Arc is the optional host sensor for engineering workstations and historians where network sensing alone is blind (USB events, local process changes). Most customers start with Guardian, add Vantage at site 2 or 3, and add Arc for highly regulated hosts." },
  { question: "How does Nozomi integrate with our SOC?", answer: "Natively. Vantage and Guardian feed Rapid7 InsightIDR, Splunk, Microsoft Sentinel, IBM QRadar and ServiceNow with ICS-aware alerts and asset context. One analyst workflow handles both IT and OT, the OT platform produces the context that an IT SIEM cannot." },
  { question: "Does Nozomi cover IoT as well as OT?", answer: "Yes. The same Guardian sensor parses IoT protocols (BACnet, building automation, medical-device IoMT, smart-city telemetry) alongside industrial protocols. One platform, one programme, across OT and IoT." },
  { question: "What does an Artiflex Nozomi deployment include?", answer: "Site survey and protocol assessment, sensor sizing and placement, passive (and optionally active) configuration, ICS-protocol tuning, SOC and SIEM integration, compliance evidence (IEC 62443, NERC CIP, NESA, ADHICS) and ongoing management, fully managed, co-managed or assessment-only." },
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

export default function OTICSSecurityNozomi() {
  const { open: openContact } = useContactModal();
  const [activeTier, setActiveTier] = useState(0);

  const pageUrl = "https://artiflexit.com/cybersecurity/ot-ics-security/nozomi";
  const pageTitle = "Nozomi Networks | OT / ICS Security UAE | Artiflex IT";
  const metaDescription = "Nozomi Networks Guardian and Vantage, AI-powered OT / ICS visibility and detection. Gartner Leader for CPS Protection. Deployed and managed by Artiflex IT for UAE industry.";

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={pageUrl} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#04101E] to-[#0A3D6B]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(40,181,225,0.18),transparent_55%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(27,138,199,0.10),transparent_60%)]" />
        <div className="relative z-10 border-b border-white/5">
          <div className="shell flex w-full items-center gap-2 pt-24 pb-3 text-[11px] text-slate-400 sm:pt-28">
            <Link to="/" className="transition-colors hover:text-white">Home</Link><span className="text-slate-600">/</span>
            <Link to="/cybersecurity" className="transition-colors hover:text-white">Cybersecurity</Link><span className="text-slate-600">/</span>
            <Link to="/cybersecurity/ot-ics-security" className="transition-colors hover:text-white">OT / ICS Security</Link><span className="text-slate-600">/</span>
            <span className="font-medium text-[#28B5E1]">{vendor.name}</span>
          </div>
        </div>

        <div className="shell relative z-10 w-full py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="lg:col-span-7">
              <div className="flex items-center gap-3"><span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-transparent to-[#28B5E1]" /><span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-[#28B5E1]">{vendor.bestFor}</span></div>
              <p className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">{vendor.vendorCompany}</p>
              <h1 className="mt-3 font-display text-4xl font-bold leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]">Nozomi <span className="bg-gradient-to-r from-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">Networks</span></h1>
              <p className="mt-5 max-w-xl font-display text-xl leading-snug text-[#9CD6EE] sm:text-2xl">{vendor.tagline}</p>
              <div className="mt-6 max-w-2xl border-l-2 border-[#28B5E1]/30 pl-5"><p className="text-base leading-relaxed text-slate-300 sm:text-lg">{vendor.description}</p></div>

              <div className="mt-8 grid max-w-xl grid-cols-3 gap-2 sm:gap-3">
                {[{ ab: "Guardian", full: "Network sensor" }, { ab: "Vantage", full: "SaaS console" }, { ab: "Arc", full: "Endpoint sensor" }].map((c) => (
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
                <div className="relative z-10 hidden h-full w-full flex-col items-center justify-center text-center" style={{ display: "none" }}><p className="font-display text-3xl font-bold tracking-tight text-slate-900">Nozomi</p><p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Networks</p></div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* WHAT IS NOZOMI */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-[#28B5E1]/30 via-[#9CD6EE]/20 to-transparent blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute top-32 right-[-10rem] h-[26rem] w-[26rem] rounded-full bg-gradient-to-tr from-violet-300/15 via-fuchsia-200/15 to-cyan-200/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/3 h-[26rem] w-[26rem] rounded-full bg-gradient-to-tr from-[#1B8AC7]/20 via-[#28B5E1]/15 to-transparent blur-3xl" />

        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#28B5E1]/20 bg-white/60 px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7] backdrop-blur-xl shadow-[0_2px_10px_rgba(15,23,42,0.04)]"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#28B5E1] shadow-[0_0_8px_rgba(40,181,225,0.8)]" />Overview</span>
            <h2 className="mt-6 font-display text-3xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-4xl md:text-5xl">What <span className="bg-gradient-to-r from-[#1B8AC7] via-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">Nozomi Networks</span> is</h2>
          </div>

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
              <div className="relative">
                <h3 className="font-display text-2xl font-bold leading-[1.1] text-white sm:text-3xl md:text-[2rem]">Passive by default <br /><span className="bg-gradient-to-r from-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">zero risk to production</span></h3>
                <p className="mt-5 text-sm leading-[1.7] text-white/80 sm:text-[15px]">Nozomi listens on a SPAN or TAP port and does not transmit on the OT network. The deployment style that plant operations actually approve, with ICS-aware active queries available where the culture and asset tolerance permit.</p>
              </div>
            </div>
          </div>

          <ul className="relative mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-6 lg:grid-cols-4">
            {overviewCapabilities.map((item) => (
              <li key={item} className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-5 shadow-[0_6px_24px_-8px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-[#28B5E1]/40 hover:bg-white/80 hover:shadow-[0_14px_40px_-10px_rgba(40,181,225,0.25)]">
                <span aria-hidden="true" className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-tr from-[#28B5E1]/0 to-transparent blur-2xl transition-all duration-500 group-hover:from-[#28B5E1]/20" />
                <div className="relative flex items-start gap-3"><span aria-hidden="true" className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#28B5E1] to-[#1B8AC7] text-white shadow-[0_4px_12px_-2px_rgba(40,181,225,0.5)]"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><path d="M4 10l4 4 8-8" /></svg></span><span className="text-[13.5px] font-medium leading-snug text-slate-800 sm:text-sm">{item}</span></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHY IT WINS */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(27,138,199,0.06),transparent_55%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Why it wins</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">What makes Nozomi our recommended OT platform</h2><p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">The strengths that show up most often in UAE industrial deployments where AI-native detection, deepest protocol coverage and non-disruptive deployment matter most.</p></div>
          <div className="relative mx-auto max-w-4xl px-5 sm:px-6">
            <div className="mt-10 grid gap-4 sm:grid-cols-3">{whyWinsStats.map((stat, i) => (<motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, delay: 0.05 * i }} className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#1E4E73] via-[#143E62] to-[#042542] px-6 py-7 shadow-md"><p className={`font-display text-2xl font-bold leading-none sm:text-2xl ${statToneText[stat.tone]}`}>{stat.value}</p><p className="mt-3 text-sm leading-relaxed text-slate-200">{stat.label}</p></motion.div>))}</div>
          </div>
          <div className="mt-12 grid items-start gap-1 lg:grid-cols-2">{strengths.map((s, i) => { const tone = strengthToneMap[s.tone]; const Icon = s.Icon; const isOrphan = i === strengths.length - 1 && strengths.length % 2 === 1; return (
            <motion.div key={s.title} tabIndex={0} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: 0.05 * i }} className={`group rounded-xl border border-white/10 bg-gradient-to-br from-[#04101E] to-[#0A3D6B] p-4 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/40 hover:shadow-lg focus-within:border-[#28B5E1]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#28B5E1]/40 ${isOrphan ? "lg:col-span-2" : ""}`}>
              <div className="flex items-stretch gap-2.5"><span className={`flex w-11 shrink-0 items-center justify-center rounded-lg border ${tone.iconBox}`}><Icon className="h-5 w-5" /></span><div className="min-w-0">{s.tag && <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${tone.tag}`}>{s.tag}</span>}<h3 className="mt-1.5 font-display text-sm font-semibold text-white sm:text-base">{s.title}</h3></div></div>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]"><div className="overflow-hidden"><p className="mt-2.5 text-xs leading-relaxed text-slate-300 sm:text-sm">{s.desc}</p></div></div>
            </motion.div>);
          })}</div>
        </div>
      </section>

      {/* BEST FIT */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#04101E] to-[#020617] py-12 sm:py-16">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.10),transparent_60%)]" />
        <div className="shell relative">
          <div className="border-b border-white/10 pb-5"><h2 className="font-display text-xl font-bold leading-tight text-white sm:text-2xl lg:text-[1.7rem]">Who should put <span className="bg-gradient-to-r from-[#28B5E1] to-[#7ad4f0] bg-clip-text text-transparent">Nozomi Networks</span> on the shortlist</h2></div>
          <ul className="mt-6 grid gap-2 sm:mt-8 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-2.5">{bestFitProfile.map((p) => (<li key={p} className="group relative flex items-start gap-3 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/30 hover:bg-white/[0.05]"><span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#28B5E1]/15 text-[#28B5E1] ring-1 ring-inset ring-[#28B5E1]/25 transition-colors group-hover:bg-[#28B5E1] group-hover:text-white group-hover:ring-[#28B5E1]"><CheckIcon className="h-3 w-3" /></span><p className="text-[13px] leading-relaxed text-slate-200 sm:text-[13.5px]">{p}</p></li>))}</ul>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Core features</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">What's inside Nozomi Networks</h2></div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-2 lg:gap-x-10">{coreFeatures.map((f) => (<div key={f.title} className="flex items-start gap-3 border-b border-slate-200 pb-3 pt-1"><span aria-hidden="true" className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#28B5E1]/10 text-[#1B8AC7]"><CheckIcon className="h-3.5 w-3.5" /></span><p className="text-sm leading-relaxed text-slate-700"><span className="font-semibold text-slate-900">{f.title},</span> {f.desc}</p></div>))}</div>
        </div>
      </section>

      {/* PRODUCT POSITIONING */}
      <section id="editions" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Choosing a product</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Simplified positioning, which Nozomi product fits</h2><p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">Nozomi is sold as three complementary products on one platform: Guardian (sensor), Vantage (SaaS console) and Arc (endpoint). Most UAE programmes start with Guardian and add Vantage at site 2 or 3.</p></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{tiers.map((t, idx) => { const active = activeTier === idx; return (
            <button key={t.name} type="button" onClick={() => setActiveTier(idx)} aria-pressed={active} className={`group relative overflow-hidden rounded-2xl border bg-white p-5 text-left transition-all duration-300 hover:-translate-y-0.5 ${t.highlighted ? "border-amber-300 ring-1 ring-amber-200 shadow-[0_12px_36px_-12px_rgba(246,183,60,0.30)]" : "border-slate-200 shadow-sm hover:border-[#28B5E1]/40"} ${active ? "scale-[1.02] ring-2 ring-[#28B5E1]/40" : ""}`}>
              {t.highlighted && (<span className="absolute -top-px left-5 inline-flex rounded-b-md bg-amber-400 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-amber-950">★ Start here</span>)}
              <p className="mt-3 font-display text-lg font-bold text-slate-900">{t.name}</p>
              <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#1B8AC7]">{t.position}</p>
              <p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Best for</p>
              <ul className="mt-1 space-y-1">{t.bestFor.map((b) => (<li key={b} className="flex gap-1.5 text-[12.5px] leading-snug text-slate-700"><span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#28B5E1]" />{b}</li>))}</ul>
              {t.additions && (<><p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">What it adds</p><ul className="mt-1 space-y-1">{t.additions.map((a) => (<li key={a} className="flex gap-1.5 text-[12.5px] leading-snug text-slate-700"><span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#28B5E1]" />{a}</li>))}</ul></>)}
              <p className="mt-4 border-t border-slate-200 pt-3 font-display text-[13px] font-bold italic text-slate-900">"{t.verdict}"</p>
            </button>);
          })}</div>
        </div>
      </section>

      {/* STRATEGIC UPGRADE PATH */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">The strategic view</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">How the products relate</h2><p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">Guardian alone proves value at a single site. Vantage scales the programme to many sites. Arc adds host visibility where network sensing is blind.</p></div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="grid grid-cols-1 gap-4 bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-5 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE] sm:grid-cols-[1fr_2fr] sm:px-7 sm:text-[11px]"><span>Step</span><span>What it gives you</span></div>
            {upgradePaths.map((u) => (<div key={u.from} className="grid grid-cols-1 gap-4 border-t border-[#0A3D6B]/20 px-5 py-4 transition-colors hover:bg-[#28B5E1]/[0.04] sm:grid-cols-[1fr_2fr] sm:px-7"><span className="font-display text-sm font-bold text-slate-900 sm:text-base">{u.from}</span><span className="text-sm leading-relaxed text-slate-700 sm:text-[15px]"><span className="font-semibold text-[#1B8AC7]">{u.title}.</span> {u.desc}</span></div>))}
          </div>
        </div>
      </section>

      {/* FULL MODULE MATRIX */}
      <section id="license-matrix" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Licensing</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Nozomi products and capabilities</h2><p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">The Nozomi platform is three products: Guardian (sensor), Vantage (SaaS) and Arc (endpoint). License the components your programme actually needs.</p></div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + editions.length * 116) }}>
                <thead><tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]"><th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-4 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">Capability</th>{editions.map((e) => (<th key={e.name} className="border-l border-white/15 px-2 py-3 sm:px-4 sm:py-4 text-center align-bottom font-display text-sm font-semibold text-white">{e.name}<span className="mt-1 block font-mono text-[10px] font-normal uppercase tracking-wider text-[#9CD6EE]">{e.subtitle}</span></th>))}</tr></thead>
                <tbody>{licRows.map((row, rIdx) => (<tr key={row.feature} className={`border-t border-[#0A3D6B]/15 transition-colors hover:bg-[#28B5E1]/[0.04] ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`}><th scope="row" className={`sticky left-0 z-10 px-4 py-3 align-middle font-display text-[13px] font-semibold text-slate-900 ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>{row.feature}</th>{row.cells.map((c, cIdx) => { const color = c.type === "yes" ? "text-emerald-600 font-bold" : c.type === "no" ? "text-slate-300" : "text-[#1B8AC7] font-semibold"; return (<td key={cIdx} className={`border-l border-[#0A3D6B]/15 px-3 py-3 text-center align-middle text-[12.5px] ${color}`}>{c.value}</td>); })}</tr>))}</tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-xs leading-relaxed text-slate-500 sm:text-sm">Module availability reflects Nozomi's published product set and may evolve. Artiflex confirms the exact scope for your sites and SOC during scoping.</p>
        </div>
      </section>

      {/* DEPLOYMENT OPTIONS */}
      <section className="relative bg-white py-12 sm:py-16">
        <div className="shell">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6"><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">Deployment Options</p><h2 className="font-display text-xl font-semibold leading-tight text-slate-900 sm:text-2xl">How we deliver Nozomi <span className="font-normal text-slate-500">across UAE plants and substations</span></h2></div>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">{deploymentOptions.map((opt) => { const Icon = opt.icon === "server" ? ServerIcon : opt.icon === "layers" ? LayersIcon : CloudIcon; return (<div key={opt.title} className="rounded-xl border border-slate-200 bg-white p-5 transition-colors duration-300 hover:border-slate-300"><div className="flex items-center gap-2.5"><span aria-hidden className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500"><Icon className="h-4 w-4" /></span><h3 className="font-display text-sm font-semibold text-slate-900 sm:text-[15px]">{opt.title}</h3></div><p className="mt-3 text-[13px] leading-[1.6] text-slate-500 sm:text-sm">{opt.body}</p></div>); })}</div>
        </div>
      </section>

      {/* WHY ARTIFLEX */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0A3D6B] via-[#04101E] to-[#020617] p-8 shadow-xl shadow-[#1B8AC7]/10 sm:p-12">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#28B5E1]">Why Artiflex IT</p>
            <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">Delivering Nozomi across the UAE</h2>
            <p className="mt-6 text-base leading-relaxed text-slate-200 sm:text-lg">We recommend Nozomi because the combination of AI-native ICS detection, passive-by-default deployment and broadest protocol coverage is the most credible answer for UAE industry. Artiflex handles site survey, sensor sizing and placement, deployment, ICS-protocol tuning, SOC integration and ongoing management, all mapped to IEC 62443, NESA, ADHICS and ISO 27001. Fully managed, co-managed or assessment-only.</p>
            <div className="mt-8 flex flex-wrap gap-4"><Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#28B5E1] px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:bg-white sm:text-base">Talk to our Consultant</Link><Link to="/cybersecurity/ot-ics-security" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-[#28B5E1]/50 hover:bg-white/10 sm:text-base">Back to OT / ICS Security</Link></div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Frequently asked</p><h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Nozomi questions we hear from UAE buyers</h2></div>
          <div className="mt-10"><FAQAccordion items={faqs} /></div>
        </div>
      </section>

      <CTASection title="Ready to evaluate Nozomi Networks?" description="Book a free OT posture assessment and we will scope sensor placement, ICS-protocol coverage and the SOC integration plan for your UAE plants or substations." primaryButton={{ text: "Book a free assessment", action: "modal" }} secondaryButton={{ text: "Compare OT vendors", href: "/cybersecurity/ot-ics-security#vendor-matrix" }} />
    </>
  );
}
