import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import {
  CheckIcon,
  ShieldIcon,
  ZapIcon,
  LayersIcon,
  EyeIcon,
  LockIcon,
  NetworkIcon,
  CloudIcon,
  ServerIcon,
  MessageIcon,
  GridIcon,
  WifiIcon,
  PhoneIcon,
  SearchIcon,
  UsersIcon,
  MonitorIcon,
  TargetIcon,
  StarIcon,
  GlobeIcon,
  GearIcon,
} from "@/components/icons";

/* ───────── DATA ───────── */

const vendor = {
  name: "Zimperium",
  vendorCompany: "Zimperium · Liberty Strategic Capital",
  bestFor: "Recommended MTD · On-device & Privacy-first",
  tagline: "On-device, privacy-first mobile threat defense",
  description:
    "Zimperium defends mobile devices against the threats management tools can't see, phishing, malicious apps, network attacks and OS exploits, with machine-learning detection that runs on the device itself. Detection works offline, preserves user privacy, and catches zero-days. Artiflex IT's recommended MTD, pairing perfectly with any UEM.",
  logo: "/logos/Zimperium.png",
};

const overviewParagraphs = [
  "Zimperium is a mobile threat defense (MTD) platform: an on-device security engine that detects and blocks threats on phones and tablets in real time across all four mobile attack vectors, device (OS exploits, jailbreak/root), network (man-in-the-middle, rogue Wi-Fi), phishing (malicious links, smishing) and app (malware and sideloaded apps). Its z9 engine runs machine-learning detection locally, so it works even offline and the user's traffic and data never leave the phone.",
  "That on-device, privacy-preserving model is the whole point, effective in the field, on hostile networks or offline. For organisations that build their own apps, Zimperium's MAPS (Mobile Application Protection Suite) adds in-app shielding, code hardening and runtime self-protection. Founded in 2010 and backed by Liberty Strategic Capital since 2022, Zimperium is MTD, not UEM: it defends devices but does not manage them, so Artiflex deploys it alongside a UEM such as Hexnode or Microsoft Intune.",
];

const overviewCapabilities = [
  "On-device z9 ML engine, works offline",
  "Privacy-first, user traffic never leaves the device",
  "All four vectors in one agent: device, network, phishing, app",
  "iOS, Android and ChromeOS coverage",
  "MTD + MAPS: protect devices and the apps you ship",
  "UEM-agnostic: pairs with Hexnode, Intune, Jamf",
];

const strengths: {
  title: string;
  desc: string;
  tag?: string;
  tone: "emerald" | "violet" | "amber" | "sky" | "rose" | "slate";
  Icon: React.FC<{ className?: string }>;
}[] = [
  {
    title: "On-device detection",
    tag: "Real-time, offline",
    desc: "Threats are caught locally, in real time, even with no network. No waiting on cloud round-trips, no telemetry leaving the device just to inspect it.",
    tone: "emerald",
    Icon: EyeIcon,
  },
  {
    title: "Privacy-first architecture",
    tag: "BYOD-friendly",
    desc: "User traffic and personal data never leave the device, which makes Zimperium the right choice for BYOD, regulated environments and any UAE workplace where PDPL applies.",
    tone: "sky",
    Icon: ShieldIcon,
  },
  {
    title: "Zero-day coverage",
    tag: "z9 ML engine",
    desc: "The z9 machine-learning engine detects never-before-seen threats without signature updates. Catches sideloaded malware, novel phishing pages and brand-new OS exploits.",
    tone: "violet",
    Icon: ZapIcon,
  },
  {
    title: "All four attack vectors",
    tag: "Complete coverage",
    desc: "Device, network, phishing and app threats covered in one agent. Not a partial point solution. The same engine reasons across the whole mobile attack surface.",
    tone: "amber",
    Icon: LayersIcon,
  },
  {
    title: "MAPS in-app protection",
    tag: "Defend your apps",
    desc: "Harden the apps you build with anti-tampering, code obfuscation and runtime self-protection (RASP). Essential for banks, fintech and any team shipping a customer app.",
    tone: "rose",
    Icon: LockIcon,
  },
  {
    title: "UEM-agnostic",
    tag: "Plays well with all",
    desc: "Integrates cleanly with every major UEM (Hexnode, Intune, Jamf, Workspace ONE) and feeds threat verdicts into conditional access so risky devices are gated automatically.",
    tone: "slate",
    Icon: NetworkIcon,
  },
];

const whyWinsStats: { value: string; label: string; tone: "emerald" | "violet" | "sky" }[] = [
  { value: "On-device", label: "ML detection runs locally on the phone, works offline and preserves privacy", tone: "emerald" },
  { value: "4 vectors", label: "Device, network, phishing and app threats covered by one agent", tone: "sky" },
  { value: "MTD + MAPS", label: "Defend the devices you manage and the apps you ship in one platform", tone: "violet" },
];

const bestFitProfile = [
  "Regulated and high-risk fleets in finance, government and healthcare where mobile access to sensitive data demands real threat defense",
  "BYOD and privacy-sensitive workplaces where on-device processing protects without inspecting personal traffic",
  "App publishers (banks, fintech, healthcare) needing MAPS in-app protection for customer-facing apps in the wild",
  "Any UEM customer (Hexnode, Intune, Jamf, Workspace ONE) adding the missing threat-defense layer",
  "Teams targeted by mobile phishing and smishing campaigns where standard email defences cannot reach",
  "Organisations facing zero-day mobile malware and sideloaded-app risk on Android estates",
  "Field, contractor and unmanaged-device populations that touch corporate data without full enrolment",
  "UAE PDPL, NESA, ADHICS and ISO 27001 programmes requiring auditable mobile-threat visibility",
];

const coreFeatures: { title: string; desc: string; Icon: React.FC<{ className?: string }> }[] = [
  { title: "z9 detection engine", desc: "On-device machine learning, no cloud dependency.", Icon: ZapIcon },
  { title: "Phishing and smishing defense", desc: "Blocks malicious links across apps and SMS.", Icon: MessageIcon },
  { title: "Malicious app detection", desc: "Flags malware, sideloaded and risky apps.", Icon: GridIcon },
  { title: "Network attack defense", desc: "Detects man-in-the-middle and rogue access points.", Icon: WifiIcon },
  { title: "Device risk assessment", desc: "Jailbreak/root, OS vulnerabilities and config drift.", Icon: PhoneIcon },
  { title: "z3A advanced app analysis", desc: "Vets sideloaded and store apps for privacy and risk.", Icon: SearchIcon },
  { title: "MAPS app protection", desc: "Shielding, anti-tampering and runtime self-protection.", Icon: ShieldIcon },
  { title: "Managed and unmanaged support", desc: "Protects enrolled and BYOD devices.", Icon: UsersIcon },
  { title: "UEM and SIEM integration", desc: "Feeds verdicts to conditional access and the SOC.", Icon: LayersIcon },
  { title: "zConsole management", desc: "Central policy, threat visibility and forensics.", Icon: MonitorIcon },
  { title: "zLabs threat research", desc: "Global mobile-malware intelligence feeding z9.", Icon: TargetIcon },
  { title: "Privacy by design", desc: "Local processing keeps user data on the device.", Icon: LockIcon },
];

/* ───────── LICENSE COMPARISON (2 SUITES) ───────── */

type LicCell = { value: string; type: "yes" | "no" | "qual" };
type LicRow = { feature: string; cells: LicCell[] };

const editions = [
  { name: "MTD", subtitle: "device protection" },
  { name: "MAPS", subtitle: "app protection" },
];

const Y = (v = "✓"): LicCell => ({ value: v, type: "yes" });
const N: LicCell = { value: "✗", type: "no" };
const Q = (v: string): LicCell => ({ value: v, type: "qual" });

const licRows: LicRow[] = [
  { feature: "Primary positioning", cells: [Q("Protect the workforce's devices"), Q("Protect the apps you publish")] },
  { feature: "z9 on-device machine-learning engine", cells: [Y(), Y()] },
  { feature: "Device threat detection (jailbreak/root, OS exploits)", cells: [Y(), N] },
  { feature: "Network attack detection (MITM, rogue Wi-Fi)", cells: [Y(), N] },
  { feature: "Phishing and smishing protection", cells: [Y(), N] },
  { feature: "Malicious / risky app detection", cells: [Y(), N] },
  { feature: "z3A advanced app analysis & reputation", cells: [Y(), N] },
  { feature: "zDefend, Runtime App Self-Protection (RASP)", cells: [Q("device agent"), Q("✓ in-app SDK")] },
  { feature: "zScan, pre-release app security testing", cells: [N, Y()] },
  { feature: "zShield, app hardening, obfuscation, anti-tamper", cells: [N, Y()] },
  { feature: "zKeyBox, white-box cryptography and key protection", cells: [N, Y()] },
  { feature: "PCI MPoC package (zConsole + zDefend + zShield + zKeyBox)", cells: [N, Y()] },
  { feature: "zConsole, central management and threat visibility", cells: [Y(), Y()] },
  { feature: "Works offline / fully on-device", cells: [Y(), Y()] },
  { feature: "UEM and SIEM integration", cells: [Y(), Q("via APIs")] },
  { feature: "Deployment model", cells: [Q("Agent via UEM"), Q("SDK in your app")] },
  { feature: "Licensing basis", cells: [Q("Per device / user"), Q("Per app")] },
];

/* ───────── SUITE POSITIONING ───────── */

type SuiteTier = {
  name: string;
  position: string;
  bestFor: string[];
  includes?: string[];
  verdict: string;
  highlighted?: boolean;
};

const suiteTiers: SuiteTier[] = [
  {
    name: "Mobile Threat Defense (MTD)",
    position: "Defend the devices people use",
    bestFor: ["BYOD and corporate-managed fleets", "Regulated and high-risk industries", "Phishing and smishing-targeted teams"],
    includes: ["On-device z9 detection", "Device, network, phishing, app vectors", "Managed and unmanaged device coverage", "zConsole management"],
    verdict: "Defend the devices your people use.",
    highlighted: true,
  },
  {
    name: "App Protection Suite (MAPS)",
    position: "Defend the apps you publish",
    bestFor: ["Banks, fintech and healthcare app publishers", "Anyone shipping a customer-facing app", "Compliance-driven secure SDLC"],
    includes: ["zScan, pre-release testing", "zShield, hardening and anti-tamper", "zDefend, runtime self-protection", "zKeyBox, key protection"],
    verdict: "Defend the apps you ship.",
    highlighted: true,
  },
];

const upgradePaths = [
  { from: "+ MTD", title: "Protect your workforce", desc: "Every device that touches corporate data, managed or BYOD, gets on-device protection against phishing, malicious apps, network attacks and OS exploits." },
  { from: "+ MAPS", title: "Protect your software", desc: "The apps you build and distribute defend themselves in the wild with testing, hardening, runtime self-protection and key protection." },
  { from: "MTD + MAPS", title: "End-to-end mobile security", desc: "Both the devices your people use and the apps you publish are defended on-device, the complete Zimperium picture." },
];

const trustSignals: { title: string; desc: string; Icon: React.FC<{ className?: string }> }[] = [
  { title: "FedRAMP-authorized", desc: "First MTD vendor with Authority to Operate, trusted across US federal and global government.", Icon: ShieldIcon },
  { title: "Forrester Wave Leader", desc: "Recognised Leader for Mobile Threat Defense and 2025 SPARK Matrix Leader.", Icon: StarIcon },
  { title: "Billions of devices analysed", desc: "zLabs research powering the on-device z9 machine-learning engine.", Icon: GlobeIcon },
];

const deploymentOptions = [
  {
    icon: "cloud" as const,
    title: "Cloud zConsole (SaaS)",
    body: "Zimperium-hosted central console for policy, threat visibility and forensics. The default deployment for most UAE customers.",
  },
  {
    icon: "layers" as const,
    title: "Agent via UEM",
    body: "MTD agent pushed silently through Hexnode, Intune, Jamf or Workspace ONE for managed fleets. Threat verdicts flow back into conditional access.",
  },
  {
    icon: "grid" as const,
    title: "MAPS SDK in your apps",
    body: "Embed the MAPS modules (zScan, zShield, zDefend, zKeyBox) into your customer-facing app builds. Artiflex assists with integration and CI pipeline scoping.",
  },
  {
    icon: "server" as const,
    title: "On-prem / air-gapped",
    body: "zConsole deployed in your own environment for sovereignty-sensitive government, finance and healthcare workloads under PDPL and NESA.",
  },
  {
    icon: "gear" as const,
    title: "Fully managed by Artiflex",
    body: "We operate the platform end to end, policy design, threat monitoring and response, as a fully managed or co-managed service, 24/7 and audit-ready.",
  },
  {
    icon: "search" as const,
    title: "Assessment-only",
    body: "A vendor-neutral mobile posture assessment with a three-year TCO comparison, if you want the analysis before committing to a rollout.",
  },
];

const dataResidency: { badge: string; title: string; body: string }[] = [
  { badge: "Privacy-preserving by design", title: "Detection stays on-device", body: "No user traffic or personal data is sent to the cloud for inspection, eliminating the core residency concern of cloud-based MTD." },
  { badge: "Default", title: "Hosted zConsole (SaaS)", body: "Zimperium-managed console for policy and threat visibility, the fastest path to production for most UAE deployments." },
  { badge: "Regulated & government", title: "On-prem / air-gapped console", body: "Keep management data on home soil for sovereignty-sensitive workloads, the architecture behind Zimperium's FedRAMP ATO." },
];

const integrations: { title: string; body: string }[] = [
  { title: "UEM / MDM", body: "Hexnode, Microsoft Intune, Jamf, VMware Workspace ONE and others. Threat verdicts drive conditional access so risky devices are gated automatically." },
  { title: "Microsoft security", body: "Microsoft Sentinel, Defender and Intune App Protection / mobile threat-defense connectors for a unified Microsoft-centric estate." },
  { title: "SIEM & SOAR", body: "Streams threat events to Splunk, QRadar, Sentinel and SOAR platforms so mobile risk lands in the same SOC workflow as everything else." },
  { title: "Identity providers", body: "Entra ID, Okta and other IdPs for risk-aware access decisions tied to live device posture." },
  { title: "CI/CD pipelines", body: "MAPS zScan and zShield slot into the build pipeline (GitHub, GitLab, Jenkins and similar) for automated pre-release testing and hardening." },
  { title: "Open APIs", body: "REST APIs and webhooks for custom reporting, ticketing and bespoke automation across your security tooling." },
];

const compliance: { code: string; desc: string }[] = [
  { code: "NESA", desc: "UAE national cyber standards" },
  { code: "UAE PDPL", desc: "Personal data protection law" },
  { code: "ADHICS", desc: "Abu Dhabi healthcare infosec" },
  { code: "CBUAE", desc: "Central Bank of the UAE" },
  { code: "SAMA", desc: "Saudi financial cyber framework" },
  { code: "ISO 27001", desc: "Information security management" },
];

const faqs = [
  {
    question: "Why does Artiflex recommend Zimperium for MTD?",
    answer:
      "Zimperium's on-device, privacy-first architecture is the most credible answer to real mobile threats. Detection runs locally with no telemetry leaving the device, it covers all four vectors (device, network, phishing, app) in one agent, and the z9 ML engine catches zero-days without signature updates. It pairs cleanly with any UEM, Hexnode being our preferred combination.",
  },
  {
    question: "Where is Zimperium's data hosted, can it stay in the UAE?",
    answer:
      "Threat detection happens entirely on the device, so user traffic and personal data never leave the phone. The zConsole management plane is offered as hosted SaaS by default, with on-premises and air-gapped deployment available for government and regulated environments, the same model behind Zimperium's FedRAMP authorisation. Artiflex confirms the exact hosting region and model against your PDPL, NESA, ADHICS, CBUAE or SAMA obligations during scoping.",
  },
  {
    question: "Is Zimperium suitable for UAE government and defence?",
    answer:
      "Yes. Zimperium was the first MTD vendor granted FedRAMP Authority to Operate and is widely used across US federal and global government. Combined with on-premises and air-gapped console deployment and on-device privacy, it suits sovereignty-sensitive ministry, defence and critical-infrastructure mandates.",
  },
  {
    question: "How does Zimperium differ from cloud-based MTD?",
    answer:
      "Cloud-based MTD routes traffic to a cloud inspection point, which adds latency, breaks when the device is offline and can raise privacy concerns under PDPL or GDPR. Zimperium's z9 engine runs locally on the device. Detection is instant, works offline and personal traffic never leaves the phone.",
  },
  {
    question: "Do we need a UEM as well as Zimperium?",
    answer:
      "Yes. Zimperium is MTD, it detects and verdicts threats but does not enrol, configure or manage devices. We deploy it alongside a UEM (Hexnode, Microsoft Intune, Jamf or Workspace ONE) so threat verdicts flow into conditional access and enforcement happens through the UEM.",
  },
  {
    question: "What's the difference between MTD and MAPS?",
    answer:
      "MTD protects the devices your workforce uses (corporate or BYOD) with the on-device z9 agent. MAPS, the Mobile Application Protection Suite, protects the apps you build and publish to your customers with zScan (pre-release testing), zShield (hardening), zDefend (runtime self-protection) and zKeyBox (key protection). Most regulated organisations that both run a mobile fleet and ship their own apps need both.",
  },
  {
    question: "Does Zimperium cover unmanaged and BYOD devices?",
    answer:
      "Yes. Zimperium protects managed and unmanaged devices equally, which makes it valuable where contractors, partners or personal phones touch corporate data without full enrolment. The on-device, privacy-preserving architecture is purpose-built for that scenario.",
  },
  {
    question: "What does an Artiflex Zimperium deployment include?",
    answer:
      "Assessment, deployment design, UEM integration, policy build, SIEM integration and ongoing threat monitoring, all mapped to NESA, UAE PDPL and ISO 27001. Fully managed, co-managed or assessment-only, your choice.",
  },
];

/* ───────── TONE MAPS ───────── */

const strengthToneMap: Record<string, { iconBox: string; tag: string }> = {
  emerald: { iconBox: "border-emerald-400/20 bg-emerald-500/10 text-emerald-300", tag: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300" },
  violet: { iconBox: "border-violet-400/20 bg-violet-500/10 text-violet-300", tag: "border-violet-400/30 bg-violet-500/10 text-violet-300" },
  amber: { iconBox: "border-amber-400/20 bg-amber-500/10 text-amber-300", tag: "border-amber-400/30 bg-amber-500/10 text-amber-300" },
  rose: { iconBox: "border-rose-400/20 bg-rose-500/10 text-rose-300", tag: "border-rose-400/30 bg-rose-500/10 text-rose-300" },
  sky: { iconBox: "border-sky-400/20 bg-sky-500/10 text-sky-300", tag: "border-sky-400/30 bg-sky-500/10 text-sky-300" },
  slate: { iconBox: "border-slate-400/20 bg-slate-500/10 text-slate-200", tag: "border-slate-400/30 bg-slate-500/10 text-slate-200" },
};

const statToneText: Record<string, string> = {
  emerald: "text-emerald-300",
  violet: "text-violet-300",
  sky: "text-sky-300",
};

/* ───────── PAGE ───────── */

export default function MobileSecurityZimperium() {
  const { open: openContact } = useContactModal();
  const [activeSuite, setActiveSuite] = useState(0);

  const pageUrl = "https://artiflexit.com/cybersecurity/mobile-security/zimperium";
  const pageTitle = "Zimperium | Mobile Threat Defense (MTD) UAE | Artiflex IT";
  const metaDescription =
    "Zimperium, on-device privacy-first mobile threat defense and in-app protection for UAE enterprises. Artiflex IT recommended MTD. FedRAMP-authorized, Forrester Wave Leader. MTD and MAPS suites compared, data residency, integrations and UAE compliance.";

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={pageUrl} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: vendor.name,
          category: "Mobile Threat Defense",
          description: metaDescription,
          brand: { "@type": "Brand", name: "Zimperium" },
          url: pageUrl,
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://artiflexit.com/" },
            { "@type": "ListItem", position: 2, name: "Cybersecurity", item: "https://artiflexit.com/cybersecurity" },
            { "@type": "ListItem", position: 3, name: "Mobile Security", item: "https://artiflexit.com/cybersecurity/mobile-security" },
            { "@type": "ListItem", position: 4, name: vendor.name, item: pageUrl },
          ],
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
        })}
      </script>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#04101E] to-[#0A3D6B]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(40,181,225,0.18),transparent_55%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(27,138,199,0.10),transparent_60%)]" />

        <div className="relative z-10 border-b border-white/5">
          <div className="shell flex w-full items-center gap-2 pt-24 pb-3 text-[11px] text-slate-400 sm:pt-28">
            <Link to="/" className="transition-colors hover:text-white">Home</Link>
            <span className="text-slate-600">/</span>
            <Link to="/cybersecurity" className="transition-colors hover:text-white">Cybersecurity</Link>
            <span className="text-slate-600">/</span>
            <Link to="/cybersecurity/mobile-security" className="transition-colors hover:text-white">Mobile Security</Link>
            <span className="text-slate-600">/</span>
            <span className="font-medium text-[#28B5E1]">{vendor.name}</span>
          </div>
        </div>

        <div className="shell relative z-10 w-full py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-transparent to-[#28B5E1]" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-[#28B5E1]">{vendor.bestFor}</span>
              </div>

              <p className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">{vendor.vendorCompany}</p>

              <h1 className="mt-3 font-display text-4xl font-bold leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]">
                Zimperium <span className="bg-gradient-to-r from-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">MTD</span>
              </h1>

              <p className="mt-5 max-w-xl font-display text-xl leading-snug text-[#9CD6EE] sm:text-2xl">{vendor.tagline}</p>

              <div className="mt-6 max-w-2xl border-l-2 border-[#28B5E1]/30 pl-5">
                <p className="text-base leading-relaxed text-slate-300 sm:text-lg">{vendor.description}</p>
              </div>

              <div className="mt-10 flex flex-col gap-5">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-2 sm:gap-x-3">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">Explore</span>
                  <Link to="/cybersecurity/mobile-security#vendor-matrix" className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:-translate-y-0.5 hover:border-[#28B5E1]/60 hover:bg-white/10 hover:text-white sm:text-[13px]">
                    Vendor Comparison
                    <svg className="h-3 w-3 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                  </Link>
                  <a href="#license-matrix" className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:-translate-y-0.5 hover:border-[#28B5E1]/60 hover:bg-white/10 hover:text-white sm:text-[13px]">
                    Compare Models
                    <svg className="h-3 w-3 opacity-50 transition-all group-hover:translate-y-0.5 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                  </a>
                  <Link to="/cybersecurity/mobile-security#gartner-comparison" className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:-translate-y-0.5 hover:border-[#28B5E1]/60 hover:bg-white/10 hover:text-white sm:text-[13px]">
                    Gartner-style Review
                    <svg className="h-3 w-3 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                  </Link>
                </div>

                <div>
                  <button type="button" onClick={openContact} className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#28B5E1] to-[#1B8AC7] px-8 py-3.5 text-sm font-semibold text-navy-deep shadow-[0_8px_30px_rgba(40,181,225,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(40,181,225,0.5)] sm:w-auto sm:text-base">
                    Request for quote
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.aside initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }} className="relative lg:col-span-5">
              <div className="relative mx-auto flex aspect-[4/3] max-w-md items-center justify-center overflow-hidden rounded-3xl border border-white/15 bg-white p-10 shadow-[0_30px_80px_-20px_rgba(3,16,28,0.8)] ring-1 ring-[#28B5E1]/10 sm:p-14">
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/40 to-transparent" />
                <img
                  src={vendor.logo}
                  alt={`${vendor.name} logo`}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = "none";
                    const fb = target.nextElementSibling as HTMLElement | null;
                    if (fb) fb.style.display = "flex";
                  }}
                  className="relative z-10 max-h-32 w-full max-w-[80%] object-contain"
                />
                <div className="relative z-10 hidden h-full w-full flex-col items-center justify-center text-center" style={{ display: "none" }}>
                  <p className="font-display text-3xl font-bold tracking-tight text-slate-900">Zimperium</p>
                  <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">MTD</p>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="relative bg-[#04101E] py-8 sm:py-10">
        <div className="shell">
          <div className="grid gap-6 sm:grid-cols-3 sm:gap-8">
            {trustSignals.map((t) => {
              const Icon = t.Icon;
              return (
                <div key={t.title} className="flex items-start gap-3.5">
                  <span aria-hidden="true" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.08] text-[#28B5E1]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-white sm:text-[15px]">{t.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-400 sm:text-[13px]">{t.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT IS ZIMPERIUM */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-[#28B5E1]/30 via-[#9CD6EE]/20 to-transparent blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute top-32 right-[-10rem] h-[26rem] w-[26rem] rounded-full bg-gradient-to-tr from-violet-300/15 via-fuchsia-200/15 to-cyan-200/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/3 h-[26rem] w-[26rem] rounded-full bg-gradient-to-tr from-[#1B8AC7]/20 via-[#28B5E1]/15 to-transparent blur-3xl" />

        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#28B5E1]/20 bg-white/60 px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7] backdrop-blur-xl shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#28B5E1] shadow-[0_0_8px_rgba(40,181,225,0.8)]" />
              Overview
            </span>
            <h2 className="mt-6 font-display text-3xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              What{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] via-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">Zimperium</span>{" "}
              is
            </h2>
          </div>

          <div className="relative mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
            <div className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-7 shadow-[0_10px_40px_-10px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-10px_rgba(40,181,225,0.20)] sm:p-9 lg:col-span-2">
              <span aria-hidden="true" className="pointer-events-none absolute -top-16 -right-12 h-40 w-40 rounded-full bg-gradient-to-br from-[#28B5E1]/15 to-transparent blur-2xl" />
              <span aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-gradient-to-tr from-[#1B8AC7]/15 to-transparent blur-2xl" />
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/40 to-transparent" />
              <div className="relative space-y-5">
                {overviewParagraphs.map((p, i) => (
                  <p key={i} className="text-[15px] leading-[1.75] text-slate-700 sm:text-base">{p}</p>
                ))}
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#0A3D6B] via-[#04101E] to-[#020617] p-7 shadow-[0_20px_60px_-15px_rgba(15,28,46,0.45)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-15px_rgba(40,181,225,0.45)] sm:p-9">
              <span aria-hidden="true" className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-[#28B5E1]/35 blur-3xl" />
              <span aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-violet-500/15 blur-3xl" />
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/80 to-transparent" />
              <div className="relative">
                <h3 className="font-display text-2xl font-bold leading-[1.1] text-white sm:text-3xl md:text-[2rem]">
                  z9 engine,{" "}
                  <br />
                  <span className="bg-gradient-to-r from-[#28B5E1] to-[#9CD6EE] bg-clip-text text-transparent">on-device by design</span>
                </h3>
                <p className="mt-5 text-sm leading-[1.7] text-white/80 sm:text-[15px]">
                  Zimperium's z9 machine-learning engine runs on the device, not in the cloud. Detection happens locally, works offline, catches zero-days without signatures, and ensures user traffic and personal data never leave the phone, a critical differentiator for UAE PDPL and BYOD programmes.
                </p>
              </div>
            </div>
          </div>

          <ul className="relative mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-6 lg:grid-cols-3">
            {overviewCapabilities.map((item) => (
              <li key={item} className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-5 shadow-[0_6px_24px_-8px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-[#28B5E1]/40 hover:bg-white/80 hover:shadow-[0_14px_40px_-10px_rgba(40,181,225,0.25)]">
                <span aria-hidden="true" className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-tr from-[#28B5E1]/0 to-transparent blur-2xl transition-all duration-500 group-hover:from-[#28B5E1]/20" />
                <div className="relative flex items-start gap-3">
                  <span aria-hidden="true" className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#28B5E1] to-[#1B8AC7] text-white shadow-[0_4px_12px_-2px_rgba(40,181,225,0.5)]">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><path d="M4 10l4 4 8-8" /></svg>
                  </span>
                  <span className="text-[13.5px] font-medium leading-snug text-slate-800 sm:text-sm">{item}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHY ZIMPERIUM WINS */}
      <section id="why-wins" className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(27,138,199,0.06),transparent_55%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Why it wins</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">What makes Zimperium our recommended MTD</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              On-device, privacy-first detection that pairs cleanly with any UEM and extends to in-app protection where you ship your own software.
            </p>
          </div>

          <div className="relative mx-auto max-w-4xl px-5 sm:px-6">
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {whyWinsStats.map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, delay: 0.05 * i }} className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#1E4E73] via-[#143E62] to-[#042542] px-6 py-7 shadow-md">
                  <p className={`font-display text-2xl font-bold leading-none sm:text-2xl ${statToneText[stat.tone]}`}>{stat.value}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-200">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid items-start gap-1 lg:grid-cols-2">
            {strengths.map((s, i) => {
              const tone = strengthToneMap[s.tone];
              const Icon = s.Icon;
              const isOrphan = i === strengths.length - 1 && strengths.length % 2 === 1;
              return (
                <motion.div key={s.title} tabIndex={0} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: 0.05 * i }} className={`group rounded-xl border border-white/10 bg-gradient-to-br from-[#04101E] to-[#0A3D6B] p-4 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/40 hover:shadow-lg focus-within:border-[#28B5E1]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#28B5E1]/40 ${isOrphan ? "lg:col-span-2" : ""}`}>
                  <div className="flex items-stretch gap-2.5">
                    <span className={`flex w-11 shrink-0 items-center justify-center rounded-lg border ${tone.iconBox}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      {s.tag && <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${tone.tag}`}>{s.tag}</span>}
                      <h3 className="mt-1.5 font-display text-sm font-semibold text-white sm:text-base">{s.title}</h3>
                    </div>
                  </div>
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                    <div className="overflow-hidden"><p className="mt-2.5 text-xs leading-relaxed text-slate-300 sm:text-sm">{s.desc}</p></div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-slate-600 sm:mt-12 sm:text-base">
            Hover any card to read the rationale. These are the strengths Artiflex sees most often in UAE deployments, not the brochure list.
          </p>
        </div>
      </section>

      {/* BEST FIT PROFILE */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#04101E] to-[#020617] py-12 sm:py-16">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.10),transparent_60%)]" />
        <div className="shell relative">
          <div className="border-b border-white/10 pb-5">
            <h2 className="font-display text-xl font-bold leading-tight text-white sm:text-2xl lg:text-[1.7rem]">
              Who should put <span className="bg-gradient-to-r from-[#28B5E1] to-[#7ad4f0] bg-clip-text text-transparent">Zimperium</span> on the shortlist
            </h2>
          </div>

          <ul className="mt-6 grid gap-2 sm:mt-8 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-2.5">
            {bestFitProfile.map((p) => (
              <li key={p} className="group relative flex items-start gap-3 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/30 hover:bg-white/[0.05]">
                <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#28B5E1]/15 text-[#28B5E1] ring-1 ring-inset ring-[#28B5E1]/25 transition-colors group-hover:bg-[#28B5E1] group-hover:text-white group-hover:ring-[#28B5E1]">
                  <CheckIcon className="h-3 w-3" />
                </span>
                <p className="text-[13px] leading-relaxed text-slate-200 sm:text-[13.5px]">{p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Core features</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">What's inside Zimperium</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              The capabilities customers actually use day to day, across the MTD and MAPS suites.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.08)]">
            <div className="grid sm:grid-cols-2">
              {coreFeatures.map((f, i) => {
                const Icon = f.Icon;
                const lastRowStart = coreFeatures.length - (coreFeatures.length % 2 === 0 ? 2 : 1);
                const isLastRow = i >= lastRowStart;
                return (
                  <div
                    key={f.title}
                    className={`border-slate-200 p-6 transition-colors hover:bg-[#28B5E1]/[0.03] sm:p-7 ${i % 2 === 0 ? "sm:border-r" : ""} ${isLastRow ? "" : "border-b"}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span aria-hidden="true" className="text-[#1B8AC7]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="font-display text-base font-bold text-slate-900">{f.title}</h3>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SUITE POSITIONING */}
      <section id="suites" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Choosing a suite</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Simplified positioning, which suite fits
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              The two suites answer two different questions. Most regulated organisations that both run a mobile fleet and ship their own apps need both.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {suiteTiers.map((t, idx) => {
              const active = activeSuite === idx;
              return (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setActiveSuite(idx)}
                  aria-pressed={active}
                  className={`group relative overflow-hidden rounded-2xl border bg-white p-6 text-left transition-all duration-300 hover:-translate-y-0.5 ${
                    t.highlighted
                      ? "border-[#28B5E1]/50 shadow-[0_12px_36px_-12px_rgba(40,181,225,0.30)]"
                      : "border-slate-200 shadow-sm hover:border-[#28B5E1]/40"
                  } ${active ? "scale-[1.01] ring-2 ring-[#28B5E1]/40" : ""}`}
                >
                  <p className="font-display text-xl font-bold text-slate-900">{t.name}</p>
                  <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#1B8AC7]">{t.position}</p>
                  <p className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Best for</p>
                  <ul className="mt-1 space-y-1">
                    {t.bestFor.map((b) => (
                      <li key={b} className="flex gap-1.5 text-[13px] leading-snug text-slate-700">
                        <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#28B5E1]" />{b}
                      </li>
                    ))}
                  </ul>
                  {t.includes && (
                    <>
                      <p className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Includes</p>
                      <ul className="mt-1 space-y-1">
                        {t.includes.map((a) => (
                          <li key={a} className="flex gap-1.5 text-[13px] leading-snug text-slate-700">
                            <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#28B5E1]" />{a}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  <p className="mt-4 border-t border-slate-200 pt-3 font-display text-[13px] font-bold italic text-slate-900">"{t.verdict}"</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* STRATEGIC UPGRADE PATH */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">The strategic view</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">How the suites relate</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Unlike tiered products, Zimperium's suites are complementary, not an upgrade ladder. Here is what each one adds and why many organisations adopt both.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="grid grid-cols-1 gap-4 bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-5 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE] sm:grid-cols-[1fr_2fr] sm:px-7 sm:text-[11px]">
              <span>Add this</span>
              <span>What it gives you</span>
            </div>
            {upgradePaths.map((u) => (
              <div key={u.from} className="grid grid-cols-1 gap-4 border-t border-[#0A3D6B]/20 px-5 py-4 transition-colors hover:bg-[#28B5E1]/[0.04] sm:grid-cols-[1fr_2fr] sm:px-7">
                <span className="font-display text-sm font-bold text-slate-900 sm:text-base">{u.from}</span>
                <span className="text-sm leading-relaxed text-slate-700 sm:text-[15px]">
                  <span className="font-semibold text-[#1B8AC7]">{u.title}.</span> {u.desc}
                </span>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-sm leading-relaxed text-slate-600">
            Artiflex scopes which suite (or both) fits your risk profile during the assessment, and integrates MTD with your UEM (Hexnode, Intune and others) and MAPS into your app development pipeline.
          </p>
        </div>
      </section>

      {/* FULL MODULE MATRIX */}
      <section id="license-matrix" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Licensing</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Zimperium suites and modules</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Zimperium is not sold as tiered editions. It is two complementary suites on one z9 engine. You license what you need, devices, apps, or both.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + editions.length * 116) }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-4 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">Capability / Module</th>
                    {editions.map((e) => (
                      <th key={e.name} className="border-l border-white/15 px-2 py-3 sm:px-4 sm:py-4 text-center align-bottom font-display text-sm font-semibold text-white">
                        {e.name}
                        <span className="mt-1 block font-mono text-[10px] font-normal uppercase tracking-wider text-[#9CD6EE]">{e.subtitle}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {licRows.map((row, rIdx) => (
                    <tr key={row.feature} className={`border-t border-[#0A3D6B]/15 transition-colors hover:bg-[#28B5E1]/[0.04] ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`}>
                      <th scope="row" className={`sticky left-0 z-10 px-4 py-3 align-middle font-display text-[13px] font-semibold text-slate-900 ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                        {row.feature}
                      </th>
                      {row.cells.map((c, cIdx) => {
                        const color =
                          c.type === "yes" ? "text-emerald-600 font-bold" : c.type === "no" ? "text-slate-300" : "text-[#1B8AC7] font-semibold";
                        return (
                          <td key={cIdx} className={`border-l border-[#0A3D6B]/15 px-3 py-3 text-center align-middle text-[12.5px] ${color}`}>
                            {c.value}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-xs leading-relaxed text-slate-500 sm:text-sm">
            Module availability reflects Zimperium's published suites and may evolve. Artiflex confirms the exact scope for your use case during scoping.
          </p>
        </div>
      </section>

      {/* DATA RESIDENCY & HOSTING */}
      <section id="residency" className="relative scroll-mt-20 bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Data residency & hosting</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Where your data lives, zConsole hosting
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              For UAE government, finance and healthcare buyers, the first question is where management data sits. Here is how Zimperium's architecture answers it.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
            <div className="space-y-4 text-[15px] leading-[1.75] text-slate-700 sm:text-base">
              <p>
                Zimperium's defining advantage is that <span className="font-semibold text-slate-900">threat detection itself never leaves the device</span>. The z9 engine inspects locally, so a user's traffic, content and personal data are never sent to a cloud for analysis, the privacy and residency exposure of cloud-inspection MTD products simply doesn't exist here.
              </p>
              <p>
                What does centralise is <span className="font-semibold text-slate-900">zConsole</span>, the management plane that holds policies, device posture and threat events. Zimperium offers zConsole as a hosted SaaS (the default for most UAE customers) and, for government and highly regulated environments, supports on-premises and air-gapped deployment, the same model that underpins its FedRAMP authorisation for US federal use.
              </p>
              <p>
                Artiflex confirms the exact hosting region and deployment model for your obligations during scoping, and maps it to your PDPL, NESA, ADHICS, CBUAE or SAMA requirements before you commit.
              </p>
            </div>

            <div className="grid gap-3">
              {dataResidency.map((d) => (
                <div key={d.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_6px_24px_-12px_rgba(15,23,42,0.12)]">
                  <span className="inline-flex rounded-full bg-[#28B5E1]/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#1B8AC7]">{d.badge}</span>
                  <h3 className="mt-2.5 font-display text-base font-bold text-slate-900">{d.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{d.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DEPLOYMENT OPTIONS */}
      <section className="relative bg-slate-50 py-12 sm:py-16">
        <div className="shell">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">Deployment Options</p>
            <h2 className="font-display text-xl font-semibold leading-tight text-slate-900 sm:text-2xl">
              How we deliver Zimperium <span className="font-normal text-slate-500">across UAE customers</span>
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {deploymentOptions.map((opt) => {
              const iconMap = { cloud: CloudIcon, server: ServerIcon, layers: LayersIcon, grid: GridIcon, gear: GearIcon, search: SearchIcon } as const;
              const Icon = iconMap[opt.icon] ?? CloudIcon;
              return (
                <div key={opt.title} className="rounded-xl border border-slate-200 bg-white p-5 transition-colors duration-300 hover:border-slate-300">
                  <div className="flex items-center gap-2.5">
                    <span aria-hidden className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500"><Icon className="h-4 w-4" /></span>
                    <h3 className="font-display text-sm font-semibold text-slate-900 sm:text-[15px]">{opt.title}</h3>
                  </div>
                  <p className="mt-3 text-[13px] leading-[1.6] text-slate-500 sm:text-sm">{opt.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Integrations</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              How Zimperium fits your existing stack
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Zimperium is built to feed the tools you already run, identity, management and the SOC, rather than replace them.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {integrations.map((it) => (
              <div key={it.title} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/40 hover:bg-white hover:shadow-[0_14px_40px_-16px_rgba(40,181,225,0.3)]">
                <h3 className="font-display text-base font-bold text-[#0A3D6B]">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{it.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UAE & REGIONAL COMPLIANCE */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">UAE & regional compliance</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Mapped to the frameworks your auditors check
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Zimperium gives auditable, on-device mobile-threat visibility. Artiflex maps every deployment to the obligations that apply to your sector.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {compliance.map((c) => (
              <div key={c.code} className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-[0_6px_24px_-14px_rgba(15,23,42,0.15)]">
                <p className="font-display text-base font-bold text-[#1B8AC7]">{c.code}</p>
                <p className="mt-1 text-[11.5px] font-medium leading-snug text-slate-500">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY ARTIFLEX */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0A3D6B] via-[#04101E] to-[#020617] p-8 shadow-xl shadow-[#1B8AC7]/10 sm:p-12">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#28B5E1]">Why Artiflex IT</p>
            <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">Delivering Zimperium across the UAE</h2>
            <p className="mt-6 text-base leading-relaxed text-slate-200 sm:text-lg">
              We recommend Zimperium because its on-device, privacy-first model is the most credible answer to real mobile threats, and it pairs cleanly with the UEM you already run, Hexnode being our preferred combination. Artiflex handles deployment, policy design, UEM and SIEM integration, and ongoing threat monitoring, all mapped to NESA, UAE PDPL, ADHICS and ISO 27001. Fully managed, co-managed or assessment-only.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#28B5E1] px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:bg-white sm:text-base">Talk to our Consultant</Link>
              <Link to="/cybersecurity/mobile-security" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-[#28B5E1]/50 hover:bg-white/10 sm:text-base">Back to Mobile Security</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Frequently asked</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Zimperium questions we hear from UAE buyers</h2>
          </div>
          <div className="mt-10"><FAQAccordion items={faqs} /></div>
        </div>
      </section>

      <CTASection
        title="Add real threat defense to your mobile fleet"
        description="Book a free mobile posture assessment and we will map your exposure, recommend a UEM + MTD pairing and share a three-year TCO comparison."
        primaryButton={{ text: "Book a free assessment", action: "modal" }}
        secondaryButton={{ text: "Compare mobile vendors", href: "/cybersecurity/mobile-security#vendor-matrix" }}
      />
    </>
  );
}
