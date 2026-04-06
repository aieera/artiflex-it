import { Helmet } from "react-helmet-async";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { LockIcon, ShieldIcon, EyeIcon, ServerIcon, MailIcon, CheckIcon } from "@/components/icons";

const stats = [
  { value: "AED 5M", label: "MAX UAE PDPL FINE", source: "Federal Decree No. 45/2021" },
  { value: "72hrs", label: "BREACH NOTIFICATION WINDOW", source: "UAE PDPL — mandatory" },
  { value: "83%", label: "BREACHES INVOLVE INTERNAL DATA", source: "Verizon DBIR 2024" },
  { value: "60%", label: "DATA LOSS VIA EMAIL", source: "Insider threat research" },
];

const features = [
  {
    icon: LockIcon,
    title: "Content-Aware Policy Engine",
    description:
      "Inspect data content — not just metadata — across endpoints, email, web uploads, and cloud storage. Detect PII, financial records, health data, and IP using regex, fingerprinting, and AI classification.",
  },
  {
    icon: EyeIcon,
    title: "Endpoint Channel Control",
    description:
      "Block or monitor data transfers via USB, Bluetooth, printer, screenshot, clipboard, and removable media. Prevent data exfiltration through every physical and virtual channel on managed devices.",
  },
  {
    icon: MailIcon,
    title: "Email DLP",
    description:
      "Inspect outbound email content and attachments before delivery. Automatically encrypt, quarantine, or block messages containing sensitive data — without disrupting legitimate business communication.",
  },
  {
    icon: ServerIcon,
    title: "Cloud & SaaS DLP",
    description:
      "Extend DLP policies to OneDrive, SharePoint, Google Drive, Salesforce, and other SaaS applications via CASB integration. Prevent oversharing and unauthorized data movement to personal cloud accounts.",
  },
  {
    icon: ShieldIcon,
    title: "Insider Threat Detection",
    description:
      "Behavioral analytics identify unusual data access patterns — mass downloads, after-hours access, and data staging before resignation. Detect malicious insiders and compromised accounts early.",
  },
  {
    icon: CheckIcon,
    title: "Automated Compliance Reporting",
    description:
      "Pre-built reports for UAE PDPL, NESA, CBUAE, PCI-DSS, and HIFSA. Demonstrate due diligence to regulators with audit-ready evidence of data protection controls and policy enforcement.",
  },
];

const dataTypes = [
  { category: "Personal Data (UAE PDPL)", examples: "Emirates ID, passport numbers, biometrics, home address, financial account details" },
  { category: "Financial Data (PCI-DSS)", examples: "Credit card numbers, CVV codes, bank account numbers, IBAN, SWIFT codes" },
  { category: "Health Records (HIFSA)", examples: "Patient names, diagnosis codes, medication records, insurance details, MRN" },
  { category: "Intellectual Property", examples: "Source code, design files, product roadmaps, M&A documents, pricing data" },
  { category: "Credentials & Secrets", examples: "Passwords, API keys, certificates, SSH keys, AWS/Azure credentials" },
  { category: "Legal & Contractual", examples: "NDAs, contracts, litigation documents, regulatory filings, board materials" },
];

const deploymentChannels = [
  { channel: "Endpoint", coverage: "USB, printer, Bluetooth, clipboard, screenshot, removable media" },
  { channel: "Email", coverage: "Microsoft 365, Google Workspace, Exchange — inbound and outbound" },
  { channel: "Web", coverage: "HTTP/HTTPS uploads, file sharing sites, personal webmail" },
  { channel: "Cloud / SaaS", coverage: "OneDrive, SharePoint, Google Drive, Dropbox, Salesforce via CASB" },
  { channel: "Network", coverage: "Inline inspection via NGFW integration for all network-transmitted data" },
];

const faqs = [
  {
    q: "Is DLP mandatory under UAE PDPL?",
    a: "UAE PDPL (Federal Decree No. 45/2021) requires organizations to implement appropriate technical measures to protect personal data. While DLP is not explicitly named, it is the primary technical control for preventing unauthorized disclosure — making it effectively mandatory for organizations processing personal data.",
  },
  {
    q: "Can DLP impact employee productivity?",
    a: "Poorly configured DLP generates high false positives and blocks legitimate workflows. We use a phased approach — starting in monitoring mode to establish baselines, then progressively enforcing policies. Well-tuned DLP is invisible to compliant users and only triggers on genuine policy violations.",
  },
  {
    q: "Does DLP cover data on personal devices (BYOD)?",
    a: "Agent-based DLP covers managed devices. For BYOD environments, MDM/MAM policies and CASB controls restrict data access from personal devices. A hybrid approach combining endpoint DLP for corporate devices and CASB for cloud access provides complete coverage.",
  },
];

export default function DLPPage() {
  return (
    <>
      <Helmet>
        <title>Data Loss Prevention (DLP) UAE — PDPL Compliance | ArtiflexIT Dubai</title>
        <meta name="description" content="Content-aware DLP solutions for UAE businesses. Prevent data exfiltration, achieve UAE PDPL compliance, and protect sensitive data across endpoints, email, and cloud." />
        <link rel="canonical" href="https://artiflexit.com/cybersecurity/data-loss-prevention" />
      </Helmet>

      <PageHero
        title={<>Data Loss Prevention <span className="gradient-text">& UAE PDPL Compliance</span></>}
        description="Content-aware policies preventing unauthorized data exfiltration across endpoints, email, web, and cloud — with AED 5M fines now enforceable under UAE PDPL, DLP is mandatory."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Cybersecurity", href: "/cybersecurity" },
          { label: "DLP", href: "/cybersecurity/data-loss-prevention" },
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
          <SectionHeader label="DLP Capabilities" title={<>Protect Data <span className="gradient-text">Everywhere It Travels</span></>} description="A complete DLP stack covers every channel through which sensitive data can leave your organization." centered />
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
          <SectionHeader label="Data Classification" title={<>What Data Types <span className="gradient-text">DLP Protects</span></>} description="DLP policies are built around data categories aligned to UAE regulatory requirements." centered />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dataTypes.map((d) => (
              <div key={d.category} className="rounded-2xl border border-border-light bg-white p-5 sm:p-6">
                <h3 className="font-display text-sm font-bold text-[#045891] mb-2">{d.category}</h3>
                <p className="text-sm text-body leading-relaxed">{d.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader label="Coverage Matrix" title={<>DLP Across <span className="gradient-text">Every Channel</span></>} description="Full coverage from endpoint to cloud ensures no exfiltration path is left unmonitored." centered />
          <div className="overflow-x-auto rounded-2xl border border-border-light bg-surface-secondary shadow-sm">
            <table className="w-full min-w-[400px]">
              <thead>
                <tr className="border-b border-border-light bg-white">
                  {["Channel", "Coverage"].map((h) => (
                    <th key={h} className="px-6 py-4 text-left font-mono text-xs uppercase tracking-widest text-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {deploymentChannels.map((c) => (
                  <tr key={c.channel} className="transition-colors hover:bg-white/60">
                    <td className="px-6 py-4 font-display font-bold text-[#045891]">{c.channel}</td>
                    <td className="px-6 py-4 text-sm text-body">{c.coverage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
        title="Achieve UAE PDPL Compliance"
        description="Get a free data protection assessment. We identify your sensitive data flows, map gaps to UAE PDPL requirements, and deploy DLP controls aligned to regulatory obligations."
        primaryButton={{ text: "Request DLP Assessment", action: "modal" }}
      />
    </>
  );
}