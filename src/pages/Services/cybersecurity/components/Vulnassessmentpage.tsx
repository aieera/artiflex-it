import { Helmet } from "react-helmet-async";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { SearchIcon, ShieldIcon, EyeIcon, TargetIcon, ServerIcon, CheckIcon } from "@/components/icons";

const stats = [
  { value: "60%", label: "BREACHES EXPLOIT KNOWN VULNS", source: "Verizon DBIR 2024" },
  { value: "15min", label: "AVG. TIME TO EXPLOIT NEW CVE", source: "After public disclosure" },
  { value: "215 days", label: "AVG. DWELL TIME (UNDETECTED)", source: "Industry benchmark 2024" },
  { value: "Continuous", label: "SOPHOS MANAGED RISK", source: "Always-on — launched Oct 2025" },
];

const services = [
  {
    icon: SearchIcon,
    title: "External Attack Surface Management",
    description:
      "Continuously discover and monitor all internet-facing assets — domains, IPs, open ports, exposed services, and certificates. Identify shadow IT and forgotten infrastructure before attackers do.",
  },
  {
    icon: EyeIcon,
    title: "Vulnerability Assessment",
    description:
      "Authenticated and unauthenticated scanning of all network assets — endpoints, servers, network devices, and cloud workloads. CVSS-scored findings with prioritized remediation roadmaps.",
  },
  {
    icon: TargetIcon,
    title: "Penetration Testing",
    description:
      "Ethical hacking by certified professionals (OSCP, CEH, CREST) simulating real-world attacker techniques. Network, web application, social engineering, and wireless assessments available.",
  },
  {
    icon: ShieldIcon,
    title: "Red Team Exercises",
    description:
      "Full adversary simulation — multi-stage campaigns testing people, processes, and technology simultaneously. Measures real-world detection and response capability under realistic attack conditions.",
  },
  {
    icon: ServerIcon,
    title: "Cloud Security Posture Management",
    description:
      "Continuous assessment of AWS, Azure, and GCP configurations against CIS benchmarks and compliance frameworks. Detect misconfigurations, excessive permissions, and exposed storage buckets automatically.",
  },
  {
    icon: CheckIcon,
    title: "Remediation Verification",
    description:
      "Re-testing after remediation confirms vulnerabilities are genuinely fixed — not just marked closed in a ticket. Provides evidence of remediation for auditors and compliance requirements.",
  },
];

const testingTypes = [
  { type: "Network Penetration Test", scope: "Internal and external network infrastructure", frequency: "Semi-annual", compliance: "NESA, CBUAE, PCI-DSS" },
  { type: "Web Application Pen Test", scope: "Customer-facing and internal web apps, APIs", frequency: "Quarterly or after major release", compliance: "PCI-DSS, OWASP Top 10" },
  { type: "Wireless Security Assessment", scope: "Wi-Fi networks, rogue AP detection", frequency: "Annual", compliance: "NESA, CBUAE" },
  { type: "Social Engineering", scope: "Phishing simulation, vishing, physical access", frequency: "Annual", compliance: "NESA, ISO 27001" },
  { type: "Red Team Exercise", scope: "Full adversary simulation — all attack vectors", frequency: "Annual", compliance: "CBUAE, financial sector" },
  { type: "Cloud Config Review", scope: "AWS, Azure, GCP security posture", frequency: "Quarterly", compliance: "NESA, CBUAE, ISO 27001" },
];

const vulnerabilityClasses = [
  { class: "Unpatched Software", risk: "Critical", description: "CVEs in operating systems, applications, and firmware — exploitable by automated attack tools within minutes of disclosure." },
  { class: "Misconfigured Services", risk: "High", description: "Default credentials, exposed admin interfaces, open cloud storage, and overly permissive firewall rules." },
  { class: "Weak Authentication", risk: "High", description: "No MFA, reused passwords, weak password policies, and legacy protocols like NTLM and SMBv1." },
  { class: "Exposed Attack Surface", risk: "High", description: "Unnecessary open ports, forgotten subdomains, legacy applications, and shadow IT assets with no security controls." },
  { class: "Application Vulnerabilities", risk: "High", description: "SQL injection, XSS, IDOR, and authentication bypass in custom web applications and APIs." },
  { class: "Third-Party Risk", risk: "Medium", description: "Vendor access with excessive privileges, unpatched supply chain components, and insecure API integrations." },
];

const complianceRequirements = [
  { standard: "NESA IAS", requirement: "Vulnerability assessment and penetration testing — mandatory for CII operators" },
  { standard: "CBUAE Framework", requirement: "Annual pen testing; quarterly vulnerability scanning for financial institutions" },
  { standard: "PCI-DSS v4", requirement: "Quarterly external vulnerability scans; annual pen tests; after significant changes" },
  { standard: "UAE PDPL", requirement: "Technical measures to identify and remediate vulnerabilities in personal data systems" },
  { standard: "ISO 27001", requirement: "Technical vulnerability management as a mandatory Annex A control" },
];

const faqs = [
  {
    q: "What is the difference between a vulnerability assessment and a penetration test?",
    a: "A vulnerability assessment scans and identifies weaknesses — it is breadth over depth. A penetration test exploits vulnerabilities to determine real-world impact — depth over breadth. Both are complementary. For compliance, most UAE frameworks require both: quarterly vulnerability scanning and annual penetration testing.",
  },
  {
    q: "How often should we conduct penetration testing under UAE compliance frameworks?",
    a: "NESA, CBUAE, and PCI-DSS all mandate penetration testing after significant infrastructure changes and at minimum annually. Best practice for UAE financial institutions and CII operators is quarterly external testing. Sophos Managed Risk provides continuous vulnerability assessment replacing manual quarterly scans.",
  },
  {
    q: "Does penetration testing disrupt production systems?",
    a: "Professional penetration testing uses controlled techniques that minimize disruption risk. We conduct initial discovery in passive mode, escalate intensity in agreed windows, and immediately notify your team of any critical findings. Testing is scoped and scheduled around your operational requirements.",
  },
];

export default function VulnAssessmentPage() {
  return (
    <>
      <Helmet>
        <title>Vulnerability Assessment & Penetration Testing UAE — Sophos Managed Risk | ArtiflexIT Dubai</title>
        <meta name="description" content="Continuous vulnerability management and penetration testing for UAE enterprises. NESA, CBUAE, and PCI-DSS aligned assessments — delivered by ArtiflexIT, Platinum Sophos Partner." />
        <link rel="canonical" href="https://artiflexit.com/cybersecurity/vulnerability-assessment-penetration-testing" />
      </Helmet>

      <PageHero
        title={<>Vulnerability Assessment <span className="gradient-text">& Penetration Testing</span></>}
        description="Continuous vulnerability discovery, external attack surface management, and penetration testing aligned to NESA, UAE PDPL, CBUAE, and PCI-DSS — powered by Sophos Managed Risk."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Cybersecurity", href: "/cybersecurity" },
          { label: "Vulnerability Assessment", href: "/cybersecurity/vulnerability-assessment-penetration-testing" },
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
          <SectionHeader label="Services" title={<>Our Vulnerability Management <span className="gradient-text">Service Portfolio</span></>} description="From automated scanning to hands-on red team exercises — a complete risk identification and validation capability." centered />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="group rounded-2xl border border-border-light bg-surface-secondary p-6 transition-all duration-300 hover:border-[#045891]/20 hover:shadow-[0_8px_30px_rgba(4,88,145,0.08)] hover:-translate-y-0.5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#045891]/8 text-[#045891] transition-colors group-hover:bg-[#045891] group-hover:text-white">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-bold text-heading mb-2">{s.title}</h3>
                <p className="text-sm text-body leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader label="Testing Types" title={<>Assessment Types & <span className="gradient-text">Compliance Mapping</span></>} description="Each testing type addresses specific compliance requirements and threat scenarios." centered />
          <div className="overflow-x-auto rounded-2xl border border-border-light bg-white shadow-sm">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-border-light bg-surface-secondary">
                  {["Assessment Type", "Scope", "Recommended Frequency", "Compliance"].map((h) => (
                    <th key={h} className="px-5 py-4 text-left font-mono text-xs uppercase tracking-widest text-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {testingTypes.map((t) => (
                  <tr key={t.type} className="transition-colors hover:bg-surface-secondary">
                    <td className="px-5 py-4 font-display font-bold text-sm text-[#045891]">{t.type}</td>
                    <td className="px-5 py-4 text-sm text-body">{t.scope}</td>
                    <td className="px-5 py-4 text-sm text-body">{t.frequency}</td>
                    <td className="px-5 py-4 text-sm text-body">{t.compliance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader label="What We Find" title={<>Top Vulnerability Classes in <span className="gradient-text">UAE Environments</span></>} description="Based on assessments conducted across UAE enterprises — these are the most common critical findings." centered />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vulnerabilityClasses.map((v) => (
              <div key={v.class} className="rounded-2xl border border-border-light bg-surface-secondary p-5 sm:p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-sm font-bold text-heading">{v.class}</h3>
                  <span className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ${v.risk === "Critical" ? "bg-red-50 text-red-600 border border-red-200" : v.risk === "High" ? "bg-amber-50 text-amber-600 border border-amber-200" : "bg-blue-50 text-blue-600 border border-blue-200"}`}>{v.risk}</span>
                </div>
                <p className="text-sm text-body leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader label="Compliance" title={<>Regulatory Testing <span className="gradient-text">Requirements</span></>} centered />
          <div className="overflow-x-auto rounded-2xl border border-border-light bg-white shadow-sm">
            <table className="w-full min-w-[400px]">
              <thead>
                <tr className="border-b border-border-light bg-surface-secondary">
                  {["Standard", "Testing Requirement"].map((h) => (
                    <th key={h} className="px-6 py-4 text-left font-mono text-xs uppercase tracking-widest text-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {complianceRequirements.map((c) => (
                  <tr key={c.standard} className="transition-colors hover:bg-surface-secondary">
                    <td className="px-6 py-4 font-display font-bold text-[#045891]">{c.standard}</td>
                    <td className="px-6 py-4 text-sm text-body">{c.requirement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-white sm:py-24">
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
        title="Know Your Attack Surface"
        description="Get a free external attack surface assessment. We discover your internet-facing assets, identify critical vulnerabilities, and deliver a prioritized remediation roadmap."
        primaryButton={{ text: "Request Free Assessment", action: "modal" }}
      />
    </>
  );
}