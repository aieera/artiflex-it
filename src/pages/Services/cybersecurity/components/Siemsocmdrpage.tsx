import { Helmet } from "react-helmet-async";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { LayersIcon, ShieldIcon, EyeIcon, ServerIcon, MonitorIcon, CheckIcon } from "@/components/icons";

const stats = [
  { value: "28,000+", label: "MDR CUSTOMERS PROTECTED", source: "Sophos — world's largest MDR" },
  { value: "24/7", label: "EYES-ON-GLASS MONITORING", source: "Sophos MDR — 365 days a year" },
  { value: "19min", label: "MEAN TIME TO DETECT", source: "Sophos MDR avg. — industry: 204 days" },
  { value: "$2.2M", label: "COST SAVINGS WITH MDR", source: "vs. internal SOC — IBM 2024" },
];

const features = [
  {
    icon: EyeIcon,
    title: "24/7 Threat Monitoring",
    description:
      "Sophos MDR analysts monitor your environment around the clock — including weekends and public holidays. No alerts go uninvestigated, no threats sit dormant while your team sleeps.",
  },
  {
    icon: LayersIcon,
    title: "SIEM & Log Correlation",
    description:
      "Centralized security event aggregation from firewalls, endpoints, email, cloud, identity, and applications. AI-driven correlation rules surface genuine threats from millions of daily events.",
  },
  {
    icon: ShieldIcon,
    title: "Threat Hunting",
    description:
      "Proactive hunting for threats that bypass automated detection. Sophos threat hunters search for attacker behavioral patterns, living-off-the-land techniques, and signs of long-dwell intrusions.",
  },
  {
    icon: MonitorIcon,
    title: "Incident Response",
    description:
      "When threats are confirmed, Sophos MDR takes full response action — containing compromised endpoints, blocking attacker infrastructure, and eradicating malware. Not just alerts — resolution.",
  },
  {
    icon: ServerIcon,
    title: "Root Cause Analysis & Reporting",
    description:
      "Post-incident reports detail the attack chain, entry point, dwell time, actions taken, and recommended hardening — enabling continuous security improvement with every incident.",
  },
  {
    icon: CheckIcon,
    title: "Regulatory Compliance Support",
    description:
      "SIEM logging and MDR response documentation satisfies audit requirements for NESA, CBUAE, PCI-DSS, and UAE PDPL. Evidence of detection capability and incident response is maintained automatically.",
  },
];

const mdrVsSoc = [
  { aspect: "Setup Time", soc: "12–18 months to operational maturity", mdr: "Live in days — zero ramp-up" },
  { aspect: "Annual Cost", soc: "AED 3M–8M (staff + tools + facilities)", mdr: "Fraction of the cost — predictable subscription" },
  { aspect: "Staff Required", soc: "8–12 analysts minimum", mdr: "Zero headcount burden" },
  { aspect: "Tool Investment", soc: "AED 200K–500K/yr SIEM licensing", mdr: "Included — all tools managed by vendor" },
  { aspect: "Coverage Hours", soc: "Gaps during holidays and shifts", mdr: "True 24/7/365 — no gaps" },
  { aspect: "Threat Hunting", soc: "Only if senior analysts are available", mdr: "Proactive — always included" },
];

const detectionSources = [
  { source: "Endpoints", details: "Intercept X telemetry — process, file, registry, network events" },
  { source: "Network / Firewall", details: "XGS firewall logs, IPS events, DNS queries, traffic flows" },
  { source: "Email", details: "Phishing attempts, BEC indicators, malicious attachment events" },
  { source: "Cloud & Identity", details: "Azure AD, M365, AWS CloudTrail, Okta sign-in anomalies" },
  { source: "Server & Workload", details: "Linux/Windows server events, container activity, cloud workloads" },
  { source: "Third-Party Integrations", details: "SIEM ingestion from any vendor via API or syslog" },
];

const faqs = [
  {
    q: "What is the difference between MDR, MSSP, and SOC-as-a-Service?",
    a: "MSSP typically provides monitoring and alerting — they tell you about threats but leave response to you. MDR (Managed Detection and Response) includes active response — they contain and remediate threats. SOC-as-a-Service is a broader term that may or may not include response capabilities. Sophos MDR includes full response, including direct action on your endpoints.",
  },
  {
    q: "Does MDR replace our internal IT security team?",
    a: "No — MDR complements your internal team. Your IT staff handle day-to-day operations while MDR analysts focus on advanced threat detection and response. For organizations with no security staff, MDR serves as a complete function. For those with existing teams, MDR provides 24/7 coverage and expert escalation.",
  },
  {
    q: "How does Sophos MDR compare to in-house SOC for UAE enterprises?",
    a: "Building an internal SOC requires AED 3M–8M annually in staff, tooling, and facilities — plus 12–18 months to reach maturity. Sophos MDR delivers equivalent or superior capability from day one at a fraction of the cost, with a team of 500+ specialists already trained on the latest attack techniques targeting UAE organizations.",
  },
];

export default function SIEMSOCMDRPage() {
  return (
    <>
      <Helmet>
        <title>SIEM, SOC & MDR Services UAE — Sophos Managed Detection | ArtiflexIT Dubai</title>
        <meta name="description" content="24/7 managed detection and response for UAE enterprises. SIEM, threat hunting, incident response — delivered by ArtiflexIT and Sophos MDR, the world's largest MDR service." />
        <link rel="canonical" href="https://artiflexit.com/cybersecurity/siem-soc-mdr" />
      </Helmet>

      <PageHero
        title={<>SIEM, SOC & Managed <span className="gradient-text">Detection Response</span></>}
        description="24/7 security event correlation, anomaly detection, and managed incident response — powered by Sophos MDR, the world's largest managed detection service with 28,000+ organizations protected."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Cybersecurity", href: "/cybersecurity" },
          { label: "SIEM / SOC / MDR", href: "/cybersecurity/siem-soc-mdr" },
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
          <SectionHeader label="MDR Capabilities" title={<>What Sophos MDR <span className="gradient-text">Does for You</span></>} description="Full-stack managed detection and response across your entire security environment — not just monitoring, but active defense." centered />
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
          <SectionHeader label="MDR vs Internal SOC" title={<>Build or <span className="gradient-text">Buy?</span></>} description="The economic and operational case for MDR vs. building an internal Security Operations Center." centered />
          <div className="overflow-x-auto rounded-2xl border border-border-light bg-white shadow-sm">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-border-light bg-surface-secondary">
                  <th className="px-6 py-4 text-left font-mono text-xs uppercase tracking-widest text-muted">Aspect</th>
                  <th className="px-6 py-4 text-left font-mono text-xs uppercase tracking-widest text-muted">Internal SOC</th>
                  <th className="px-6 py-4 text-left font-mono text-xs uppercase tracking-widest text-[#045891]">Sophos MDR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {mdrVsSoc.map((r) => (
                  <tr key={r.aspect} className="transition-colors hover:bg-surface-secondary">
                    <td className="px-6 py-4 font-semibold text-sm text-heading">{r.aspect}</td>
                    <td className="px-6 py-4 text-sm text-body">{r.soc}</td>
                    <td className="px-6 py-4 text-sm font-medium text-[#045891]">{r.mdr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader label="Data Sources" title={<>What MDR <span className="gradient-text">Monitors</span></>} description="Sophos MDR ingests telemetry from every layer of your environment for comprehensive threat detection." centered />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {detectionSources.map((d) => (
              <div key={d.source} className="rounded-2xl border border-border-light bg-surface-secondary p-5">
                <h3 className="font-display text-sm font-bold text-[#045891] mb-1">{d.source}</h3>
                <p className="text-xs text-body leading-relaxed">{d.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader label="FAQ" title={<>Common <span className="gradient-text">Questions</span></>} centered />
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
        title="Get 24/7 Threat Monitoring Today"
        description="Get a free MDR readiness assessment. We evaluate your current detection capability, calculate your SOC cost savings, and design your Sophos MDR onboarding plan."
        primaryButton={{ text: "Request MDR Assessment", action: "modal" }}
      />
    </>
  );
}