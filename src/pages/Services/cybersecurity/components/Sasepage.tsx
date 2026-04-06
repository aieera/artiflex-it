import { Helmet } from "react-helmet-async";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { CloudIcon, ShieldIcon, LockIcon, GlobeIcon, EyeIcon, CheckIcon } from "@/components/icons";

const stats = [
  { value: "70%", label: "WORKFORCE NOW HYBRID/REMOTE", source: "Gartner — UAE enterprise survey" },
  { value: "3x", label: "VPN BREACHES vs ZTNA", source: "ZTNA reduces attack surface" },
  { value: "30%", label: "NETWORK COST REDUCTION", source: "SASE vs. legacy MPLS avg." },
  { value: "2026", label: "SOPHOS WORKSPACE PROTECTION", source: "Full SSE stack — Jan 2026 launch" },
];

const components = [
  {
    icon: LockIcon,
    title: "Zero Trust Network Access (ZTNA)",
    description:
      "Replace VPN with identity-aware micro-segmented access. Users connect only to specific authorized applications — never the broader network. Eliminates lateral movement risk from compromised credentials.",
  },
  {
    icon: CloudIcon,
    title: "Cloud Access Security Broker (CASB)",
    description:
      "Visibility and control over all SaaS application usage — sanctioned and unsanctioned. Enforce DLP policies, detect shadow IT, and protect data in Microsoft 365, Salesforce, and hundreds of other apps.",
  },
  {
    icon: GlobeIcon,
    title: "Secure Web Gateway (SWG)",
    description:
      "Inspect and filter all web traffic regardless of user location. Block malicious sites, enforce acceptable use policies, and prevent data exfiltration through web channels without routing traffic through HQ.",
  },
  {
    icon: ShieldIcon,
    title: "Firewall as a Service (FWaaS)",
    description:
      "Cloud-delivered NGFW capabilities — deep packet inspection, IPS, and application control — available to all users and locations without deploying physical appliances at every branch.",
  },
  {
    icon: EyeIcon,
    title: "SD-WAN Integration",
    description:
      "Intelligent traffic steering between cloud, MPLS, broadband, and LTE. Direct cloud breakout for SaaS traffic improves performance while maintaining full security inspection at the network edge.",
  },
  {
    icon: CheckIcon,
    title: "Identity-Centric Policy",
    description:
      "All access decisions based on identity, device posture, location, and behavior — not network location. Integrate with Azure AD, Okta, and on-premises Active Directory for unified policy enforcement.",
  },
];

const ztnaVsVpn = [
  { aspect: "Access Model", vpn: "Full network access once authenticated", ztna: "Per-application access only" },
  { aspect: "Attack Surface", vpn: "Entire network exposed", ztna: "Only authorized apps exposed" },
  { aspect: "Lateral Movement", vpn: "Possible — attacker can move freely", ztna: "Prevented by design" },
  { aspect: "Performance", vpn: "All traffic backhauled to HQ", ztna: "Direct-to-app, no backhaul" },
  { aspect: "User Experience", vpn: "Slow, frequent disconnections", ztna: "Fast, seamless, invisible" },
  { aspect: "Device Posture", vpn: "No posture check", ztna: "Continuous device health assessment" },
];

const useCases = [
  { title: "Remote & Hybrid Work", detail: "Secure access for employees working from home, hotels, and co-working spaces — without VPN performance issues or network exposure." },
  { title: "Third-Party Contractor Access", detail: "Provide vendors, auditors, and contractors access to specific systems only — zero network visibility, full audit trail." },
  { title: "Cloud Application Security", detail: "Protect Microsoft 365, Google Workspace, and custom SaaS apps from account takeover and data exfiltration." },
  { title: "Multi-Branch Connectivity", detail: "Replace expensive MPLS circuits with secure SD-WAN. Connect UAE offices with encrypted, intelligent routing." },
  { title: "Mergers & Acquisitions", detail: "Quickly extend secure access to acquired company employees without network integration — ZTNA works across any infrastructure." },
  { title: "BYOD Enablement", detail: "Allow personal devices to access corporate apps safely — device posture checked, corporate data never cached on unmanaged devices." },
];

const faqs = [
  {
    q: "What is the difference between SASE and SSE?",
    a: "SASE (Secure Access Service Edge) combines SD-WAN with Security Service Edge (SSE). SSE is the pure security stack — ZTNA, CASB, SWG, and FWaaS. Most organizations start with SSE and add SD-WAN capabilities as they phase out legacy WAN infrastructure.",
  },
  {
    q: "How long does ZTNA migration from VPN take?",
    a: "A typical ZTNA deployment for 100–500 users takes 4–8 weeks — application discovery, identity integration, policy definition, and user onboarding. We run VPN and ZTNA in parallel during migration to ensure zero disruption.",
  },
  {
    q: "Does SASE work with existing Microsoft 365 and Azure environments?",
    a: "Yes. Sophos Workspace Protection and other SASE platforms integrate natively with Azure AD for identity, and with Microsoft 365 for CASB controls. This provides a unified security posture without replacing existing Microsoft investments.",
  },
];

export default function SASEPage() {
  return (
    <>
      <Helmet>
        <title>SASE & Zero Trust Network Access UAE — Sophos Workspace | ArtiflexIT Dubai</title>
        <meta name="description" content="SASE and ZTNA solutions for UAE enterprises. Replace legacy VPN with identity-aware zero trust access. ZTNA, CASB, SWG, and FWaaS from ArtiflexIT, Platinum Sophos Partner." />
        <link rel="canonical" href="https://artiflexit.com/cybersecurity/sase-zero-trust" />
      </Helmet>

      <PageHero
        title={<>SASE & Zero Trust <span className="gradient-text">Network Access</span></>}
        description="ZTNA, CASB, SWG, and Firewall-as-a-Service converged into a cloud-delivered security service edge — replacing legacy VPN with identity-aware, zero-trust access for hybrid UAE workforces."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Cybersecurity", href: "/cybersecurity" },
          { label: "SASE & Zero Trust", href: "/cybersecurity/sase-zero-trust" },
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
          <SectionHeader label="SASE Components" title={<>The Four Pillars of <span className="gradient-text">Security Service Edge</span></>} description="SASE converges these six security capabilities into a single cloud-delivered platform — replacing a fragmented stack of point solutions." centered />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {components.map((c) => (
              <div key={c.title} className="group rounded-2xl border border-border-light bg-surface-secondary p-6 transition-all duration-300 hover:border-[#045891]/20 hover:shadow-[0_8px_30px_rgba(4,88,145,0.08)] hover:-translate-y-0.5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#045891]/8 text-[#045891] transition-colors group-hover:bg-[#045891] group-hover:text-white">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-bold text-heading mb-2">{c.title}</h3>
                <p className="text-sm text-body leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader label="ZTNA vs VPN" title={<>Why VPN Is No Longer <span className="gradient-text">Sufficient</span></>} description="The core architectural difference explains why zero trust outperforms legacy VPN in every dimension." centered />
          <div className="overflow-x-auto rounded-2xl border border-border-light bg-white shadow-sm">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-border-light bg-surface-secondary">
                  <th className="px-6 py-4 text-left font-mono text-xs uppercase tracking-widest text-muted">Aspect</th>
                  <th className="px-6 py-4 text-left font-mono text-xs uppercase tracking-widest text-muted">Legacy VPN</th>
                  <th className="px-6 py-4 text-left font-mono text-xs uppercase tracking-widest text-[#045891]">ZTNA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {ztnaVsVpn.map((r) => (
                  <tr key={r.aspect} className="transition-colors hover:bg-surface-secondary">
                    <td className="px-6 py-4 font-semibold text-sm text-heading">{r.aspect}</td>
                    <td className="px-6 py-4 text-sm text-body">{r.vpn}</td>
                    <td className="px-6 py-4 text-sm font-medium text-[#045891]">{r.ztna}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader label="Use Cases" title={<>SASE Deployment <span className="gradient-text">Scenarios</span></>} centered />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u) => (
              <div key={u.title} className="rounded-2xl border border-border-light bg-surface-secondary p-5 sm:p-6">
                <h3 className="font-display text-base font-bold text-heading mb-2">{u.title}</h3>
                <p className="text-sm text-body leading-relaxed">{u.detail}</p>
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
        title="Migrate from VPN to Zero Trust"
        description="Get a free SASE readiness assessment. We map your current remote access architecture, identify VPN risks, and design a zero trust migration plan for your UAE environment."
        primaryButton={{ text: "Request SASE Assessment", action: "modal" }}
      />
    </>
  );
}