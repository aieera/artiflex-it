import { Helmet } from "react-helmet-async";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { MailIcon, ShieldIcon, EyeIcon, LockIcon, CheckIcon, SearchIcon } from "@/components/icons";

const stats = [
  { value: "91%", label: "ATTACKS START VIA EMAIL", source: "Verizon DBIR 2024" },
  { value: "$43B", label: "BEC LOSSES 2016–2023", source: "FBI Internet Crime Report" },
  { value: "3.4B", label: "PHISHING EMAILS PER DAY", source: "Global estimate 2024" },
  { value: "99.9%", label: "SPAM CATCH RATE", source: "Sophos Email — independent test" },
];

const features = [
  {
    icon: MailIcon,
    title: "NLP-Powered Phishing Detection",
    description:
      "Natural language processing analyzes email tone, urgency cues, and sender impersonation patterns to detect spear-phishing and BEC attempts that bypass traditional link/attachment scanners.",
  },
  {
    icon: ShieldIcon,
    title: "BEC Impersonation Prevention",
    description:
      "Detects CEO fraud, supplier impersonation, and display-name spoofing before messages reach inboxes. Machine learning compares sender behavior against historical patterns to flag anomalies.",
  },
  {
    icon: EyeIcon,
    title: "Attachment Sandboxing",
    description:
      "Every attachment is detonated in an isolated cloud sandbox before delivery. Malware, macro-based exploits, and weaponized PDFs are intercepted — even zero-day variants with no known signatures.",
  },
  {
    icon: LockIcon,
    title: "DMARC / DKIM / SPF Enforcement",
    description:
      "Enforce email authentication standards to prevent domain spoofing. Full DMARC policy management with visibility into legitimate vs. unauthorized senders using your domain.",
  },
  {
    icon: SearchIcon,
    title: "URL Time-of-Click Protection",
    description:
      "Rewrite and re-scan all links at the moment of click — blocking malicious URLs that were clean at delivery but weaponized afterward. Prevents delayed phishing attacks.",
  },
  {
    icon: CheckIcon,
    title: "DLP for Outbound Email",
    description:
      "Content-aware policies prevent sensitive data leaving via email — PII, financial data, health records, and IP. Automatic encryption for compliant data sharing with external parties.",
  },
];

const attackTypes = [
  { type: "Spear Phishing", description: "Targeted emails impersonating trusted contacts with personalized lures to steal credentials or deliver malware.", risk: "Critical" },
  { type: "Business Email Compromise", description: "Attacker impersonates CEO or CFO to instruct finance teams to transfer funds or change payment details.", risk: "Critical" },
  { type: "Malicious Attachments", description: "Office macros, weaponized PDFs, and archive files containing malware or ransomware droppers.", risk: "High" },
  { type: "Credential Phishing", description: "Fake Microsoft 365 / Google Workspace login pages harvesting employee usernames and passwords.", risk: "High" },
  { type: "Domain Spoofing", description: "Sending emails that appear to come from your domain to trick customers, suppliers, or employees.", risk: "High" },
  { type: "Supply Chain Phishing", description: "Compromising a supplier's email account to send trusted, legitimate-looking malicious messages.", risk: "High" },
];

const compliancePoints = [
  { standard: "UAE PDPL", requirement: "Protect personal data transmitted via email; encrypt sensitive communications" },
  { standard: "NESA IAS", requirement: "Email security controls including anti-phishing and malware scanning" },
  { standard: "CBUAE", requirement: "Anti-fraud controls covering BEC and financial impersonation attacks" },
  { standard: "PCI-DSS v4", requirement: "Protect cardholder data in email; control outbound transmission" },
  { standard: "HIFSA (DHA/HAAD)", requirement: "Encrypt patient data in email; audit logging of healthcare communications" },
];

const faqs = [
  {
    q: "Does Microsoft 365 built-in security provide sufficient protection?",
    a: "Microsoft Defender for Office 365 provides baseline protection but is frequently bypassed by advanced phishing kits and BEC attacks. Independent tests show third-party solutions like Sophos Email catch 15–30% more threats that reach inboxes through Microsoft's native filters.",
  },
  {
    q: "What is DMARC and why is it critical for UAE organizations?",
    a: "DMARC (Domain-based Message Authentication, Reporting & Conformance) prevents attackers from sending emails that appear to come from your domain. Without a DMARC policy in enforcement mode, anyone can spoof your brand in phishing campaigns — damaging your reputation and targeting your customers.",
  },
  {
    q: "How long does email security deployment take?",
    a: "Sophos Email integrates with Microsoft 365 and Google Workspace via API in under 2 hours — no MX record change required. Full policy tuning and DMARC enforcement deployment takes 2–4 weeks to avoid impacting legitimate email flows.",
  },
];

export default function EmailSecurityPage() {
  return (
    <>
      <Helmet>
        <title>Email Security & Anti-Phishing UAE — Sophos Email | ArtiflexIT Dubai</title>
        <meta name="description" content="Enterprise email security for UAE businesses. NLP phishing detection, BEC prevention, attachment sandboxing, DMARC enforcement — deployed by ArtiflexIT, Platinum Sophos Partner." />
        <link rel="canonical" href="https://artiflexit.com/cybersecurity/email-security" />
      </Helmet>

      <PageHero
        title={<>Email Security & <span className="gradient-text">Anti-Phishing</span></>}
        description="NLP-powered phishing detection, BEC impersonation prevention, attachment sandboxing, and DMARC/DKIM/SPF enforcement — because 91% of cyberattacks begin with a single email."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Cybersecurity", href: "/cybersecurity" },
          { label: "Email Security", href: "/cybersecurity/email-security" },
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
          <SectionHeader label="Protection Layers" title={<>Six Layers of <span className="gradient-text">Email Defense</span></>} description="A complete email security stack blocks threats at every stage — before delivery, at delivery, and at the moment of interaction." centered />
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
          <SectionHeader label="Threat Landscape" title={<>Email Attack Types <span className="gradient-text">Targeting UAE Businesses</span></>} description="Understanding the threat spectrum helps prioritize protection layers." centered />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {attackTypes.map((a) => (
              <div key={a.type} className="rounded-2xl border border-border-light bg-white p-5 sm:p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-base font-bold text-heading">{a.type}</h3>
                  <span className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ${a.risk === "Critical" ? "bg-red-50 text-red-600 border border-red-200" : "bg-amber-50 text-amber-600 border border-amber-200"}`}>{a.risk}</span>
                </div>
                <p className="text-sm text-body leading-relaxed">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader label="Compliance" title={<>Email Security & <span className="gradient-text">Regulatory Requirements</span></>} description="UAE compliance frameworks mandate specific email security controls. Here is how they map." centered />
          <div className="overflow-x-auto rounded-2xl border border-border-light bg-surface-secondary shadow-sm">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-border-light bg-white">
                  {["Standard", "Email Security Requirement"].map((h) => (
                    <th key={h} className="px-6 py-4 text-left font-mono text-xs uppercase tracking-widest text-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {compliancePoints.map((c) => (
                  <tr key={c.standard} className="transition-colors hover:bg-white/60">
                    <td className="px-6 py-4 font-display font-bold text-[#045891]">{c.standard}</td>
                    <td className="px-6 py-4 text-sm text-body">{c.requirement}</td>
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
        title="Stop Phishing Before It Starts"
        description="Get a free email security assessment. We audit your current email gateway, test DMARC enforcement, and identify phishing exposure across your Microsoft 365 or Google Workspace environment."
        primaryButton={{ text: "Request Email Security Audit", action: "modal" }}
      />
    </>
  );
}