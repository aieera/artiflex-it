import { Helmet } from "react-helmet-async";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { MonitorIcon, ShieldIcon, EyeIcon, ServerIcon, LockIcon, CheckIcon } from "@/components/icons";

const stats = [
  { value: "99.98%", label: "MALWARE DETECTION RATE", source: "AV-TEST independent evaluation" },
  { value: "< 1sec", label: "THREAT RESPONSE TIME", source: "Sophos Intercept X avg." },
  { value: "72hrs", label: "RANSOMWARE ROLLBACK WINDOW", source: "CryptoGuard recovery" },
  { value: "99%", label: "FALSE POSITIVE REDUCTION", source: "Deep learning vs. traditional ML" },
];

const features = [
  {
    icon: MonitorIcon,
    title: "AI-Powered Behavioral Analysis",
    description:
      "Deep learning neural networks trained on hundreds of millions of samples detect never-before-seen malware without relying on signatures — catching zero-days at the moment of execution.",
  },
  {
    icon: ShieldIcon,
    title: "Anti-Ransomware & CryptoGuard",
    description:
      "Sophos CryptoGuard detects ransomware encryption behavior in real time and automatically rolls back affected files to their pre-attack state — even for ransomware targeting remote shares.",
  },
  {
    icon: EyeIcon,
    title: "Exploit Prevention",
    description:
      "30+ anti-exploit techniques stop attackers from weaponizing vulnerabilities in memory, browsers, Office documents, and applications — protecting unpatched systems from known CVEs.",
  },
  {
    icon: LockIcon,
    title: "Root Cause Analysis",
    description:
      "Visual attack chain diagrams show exactly how an attack entered your environment, which files were touched, and what actions were taken — enabling rapid remediation and lessons learned.",
  },
  {
    icon: ServerIcon,
    title: "Cross-Layer XDR Correlation",
    description:
      "XDR correlates threat signals across endpoints, firewall, email, cloud, and identity — surfacing multi-stage attacks that would be invisible to point solutions operating in silos.",
  },
  {
    icon: CheckIcon,
    title: "Live Response & Remote Forensics",
    description:
      "Directly access any managed endpoint via terminal for live investigation and remediation — no VPN required. Run commands, pull files, kill processes, and contain threats remotely.",
  },
];

const edrVsXdr = [
  { aspect: "Scope", edr: "Endpoints only", xdr: "Endpoints + network + email + cloud + identity" },
  { aspect: "Visibility", edr: "Device-level telemetry", xdr: "Cross-layer, correlated telemetry" },
  { aspect: "Detection", edr: "Single-vector attacks", xdr: "Multi-stage, cross-vector attacks" },
  { aspect: "Investigation", edr: "Endpoint timeline", xdr: "Unified attack story across all layers" },
  { aspect: "Best for", edr: "Organizations starting their security journey", xdr: "Enterprises requiring full-stack visibility" },
];

const interceptXComponents = [
  { name: "Deep Learning Engine", desc: "Pre-execution malware detection without signatures" },
  { name: "CryptoGuard", desc: "Anti-ransomware with automatic file rollback" },
  { name: "Exploit Prevention", desc: "Memory protection and anti-exploit techniques" },
  { name: "Active Adversary Protection", desc: "Blocks advanced hands-on-keyboard attacker techniques" },
  { name: "Root Cause Analysis", desc: "Visual attack chain with remediation guidance" },
  { name: "Synchronized Security", desc: "Real-time communication with Sophos Firewall" },
  { name: "Live Response", desc: "Remote terminal access for incident response" },
  { name: "XDR Data Lake", desc: "30-day cross-layer telemetry storage and query" },
];

const faqs = [
  {
    q: "What is the difference between EDR and XDR?",
    a: "EDR focuses on endpoint telemetry — laptops, servers, workstations. XDR extends detection across network, email, cloud, and identity, correlating signals from all layers into a unified attack narrative. For UAE enterprises with cloud workloads and email, XDR is the recommended standard.",
  },
  {
    q: "Can EDR replace antivirus?",
    a: "Yes. Modern EDR platforms like Sophos Intercept X include traditional AV capabilities plus behavioral AI, anti-ransomware, and exploit prevention. They replace legacy AV and deliver significantly higher detection rates with lower false positives.",
  },
  {
    q: "How does ransomware rollback work?",
    a: "Sophos CryptoGuard monitors for mass file encryption. When detected, it automatically reverses encrypted files to their original state using shadow copy technology — typically within seconds. This works even when the ransomware originates from a remote share.",
  },
];

export default function EDRXDRPage() {
  return (
    <>
      <Helmet>
        <title>EDR & XDR Endpoint Security UAE — Sophos Intercept X | ArtiflexIT Dubai</title>
        <meta name="description" content="AI-powered endpoint detection and response for UAE enterprises. Anti-ransomware, exploit prevention, cross-layer XDR — deployed by ArtiflexIT, Platinum Sophos Partner." />
        <link rel="canonical" href="https://artiflexit.com/cybersecurity/endpoint-detection-response" />
      </Helmet>

      <PageHero
        title={<>Endpoint Detection & Response <span className="gradient-text">EDR / XDR</span></>}
        description="AI-powered behavioral analysis, anti-ransomware rollback, and cross-layer threat correlation across endpoints, network, email, and cloud — powered by Sophos Intercept X."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Cybersecurity", href: "/cybersecurity" },
          { label: "EDR / XDR", href: "/cybersecurity/endpoint-detection-response" },
        ]}
      />

      <section className="relative border-y border-border-light bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid grid-cols-2 divide-x divide-white/[0.06] lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="px-3 py-6 text-center sm:px-8 sm:py-10">
                <span className="font-display text-xl font-bold text-[#045891] sm:text-3xl md:text-4xl">{stat.value}</span>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">{stat.label}</p>
                <p className="mt-0.5 text-xs text-muted">{stat.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader label="Core Capabilities" title={<>How Intercept X <span className="gradient-text">Protects Endpoints</span></>} description="Six layers of protection working simultaneously to stop threats before, during, and after execution." centered />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="group rounded-2xl border border-border-light bg-surface-secondary p-6 transition-all duration-300 hover:border-[#045891]/20 hover:shadow-[0_8px_30px_rgba(4,88,145,0.08)] hover:-translate-y-0.5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#045891]/8 text-[#045891] transition-colors group-hover:bg-[#045891] group-hover:text-white">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-bold text-heading mb-2">{f.title}</h3>
                <p className="text-sm text-body leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader label="EDR vs XDR" title={<>Which Solution Is <span className="gradient-text">Right for You?</span></>} description="Understanding the difference helps you choose the right level of protection for your organization." centered />
          <div className="overflow-x-auto rounded-2xl border border-border-light bg-white shadow-sm">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-border-light bg-surface-secondary">
                  <th className="px-6 py-4 text-left font-mono text-xs uppercase tracking-widest text-muted">Aspect</th>
                  <th className="px-6 py-4 text-left font-mono text-xs uppercase tracking-widest text-muted">EDR</th>
                  <th className="px-6 py-4 text-left font-mono text-xs uppercase tracking-widest text-[#045891]">XDR (Recommended)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {edrVsXdr.map((r) => (
                  <tr key={r.aspect} className="transition-colors hover:bg-surface-secondary">
                    <td className="px-6 py-4 font-semibold text-sm text-heading">{r.aspect}</td>
                    <td className="px-6 py-4 text-sm text-body">{r.edr}</td>
                    <td className="px-6 py-4 text-sm text-body font-medium text-[#045891]">{r.xdr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader label="Sophos Intercept X" title={<>Everything Included <span className="gradient-text">Out of the Box</span></>} description="No add-ons required. Every Intercept X Advanced license includes all eight protection modules." centered />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {interceptXComponents.map((c) => (
              <div key={c.name} className="rounded-2xl border border-border-light bg-surface-secondary p-5">
                <h3 className="font-display text-sm font-bold text-[#045891] mb-1">{c.name}</h3>
                <p className="text-xs text-body leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader label="FAQ" title={<>Common <span className="gradient-text">Questions</span></>} description="Answers to the most common EDR/XDR questions from UAE IT teams." centered />
          <div className="mx-auto max-w-3xl space-y-6">
            {faqs.map((f) => (
              <Card key={f.q} className="p-5 sm:p-6">
                <h3 className="font-display text-base font-semibold text-heading mb-2">{f.q}</h3>
                <p className="text-sm text-body leading-relaxed">{f.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Protect Every Endpoint Today"
        description="Get a free endpoint security assessment. Our certified engineers will evaluate your current protection, identify gaps, and deploy Intercept X across your environment."
        primaryButton={{ text: "Request a Free Assessment", action: "modal" }}
      />
    </>
  );
}