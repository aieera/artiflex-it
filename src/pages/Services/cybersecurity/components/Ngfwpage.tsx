import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import { ShieldIcon, CheckIcon, GlobeIcon, ServerIcon, LockIcon, EyeIcon } from "@/components/icons";

const stats = [
  { value: "99.9%", label: "THREAT DETECTION RATE", source: "Sophos XGS — independent lab tested" },
  { value: "40Gbps", label: "FIREWALL THROUGHPUT", source: "XGS 7500 — enterprise grade" },
  { value: "TLS 1.3", label: "FULL SSL INSPECTION", source: "Zero performance penalty" },
  { value: "<1ms", label: "LATENCY OVERHEAD", source: "Xstream Architecture" },
];

const features = [
  {
    icon: ShieldIcon,
    title: "Deep Packet Inspection",
    description:
      "Inspect every packet at wire speed — identifying threats hidden inside encrypted traffic, tunneled protocols, and evasive application payloads that bypass traditional firewalls.",
  },
  {
    icon: EyeIcon,
    title: "Application-Aware Control",
    description:
      "Identify and control over 5,000 applications regardless of port or protocol. Block social media during work hours, prioritize VoIP, and throttle bandwidth-hungry streaming.",
  },
  {
    icon: LockIcon,
    title: "TLS 1.3 Decryption",
    description:
      "Decrypt and inspect SSL/TLS traffic at line rate without introducing latency bottlenecks. Up to 95% of modern malware hides in encrypted traffic — inspection is no longer optional.",
  },
  {
    icon: ServerIcon,
    title: "Integrated IPS & Threat Intel",
    description:
      "Built-in Intrusion Prevention System with real-time SophosLabs threat intelligence. Blocks zero-days, exploits, and command-and-control callbacks before they reach your servers.",
  },
  {
    icon: GlobeIcon,
    title: "SD-WAN & Multi-Site Management",
    description:
      "Intelligent path selection across MPLS, broadband, and LTE links. Manage all branch firewalls from a single Sophos Central console with templated policy deployment.",
  },
  {
    icon: CheckIcon,
    title: "Synchronized Security",
    description:
      "Automatic threat response between firewall and endpoints. When Intercept X detects malware, the firewall instantly isolates that device — zero manual intervention required.",
  },
];

const models = [
  { name: "XGS 87", throughput: "3.5 Gbps", users: "Up to 50", use: "Branch / SMB" },
  { name: "XGS 116", throughput: "6.5 Gbps", users: "Up to 100", use: "Mid-size branch" },
  { name: "XGS 136", throughput: "9 Gbps", users: "Up to 200", use: "Regional office" },
  { name: "XGS 2100", throughput: "19 Gbps", users: "Up to 500", use: "Enterprise HQ" },
  { name: "XGS 3100", throughput: "26 Gbps", users: "Up to 1,000", use: "Large enterprise" },
  { name: "XGS 7500", throughput: "40 Gbps", users: "Unlimited", use: "Data center / MSSP" },
];

const useCases = [
  {
    title: "Perimeter Defense",
    detail: "Block inbound attacks, port scans, and exploit attempts before they enter your network. First line of defense against internet-borne threats.",
  },
  {
    title: "East-West Segmentation",
    detail: "Prevent lateral movement inside your network with internal firewall zones. Contain a breach before it reaches critical assets.",
  },
  {
    title: "Remote Access (ZTNA)",
    detail: "Replace insecure legacy VPNs with identity-aware Zero Trust Network Access — users get access only to what they need, nothing more.",
  },
  {
    title: "Branch Connectivity",
    detail: "Connect multiple UAE office locations with encrypted SD-WAN tunnels. Centrally managed from Sophos Central with automated failover.",
  },
  {
    title: "NESA & CBUAE Compliance",
    detail: "NGFW logging, traffic inspection, and segmentation satisfy core NESA IAS controls and CBUAE cybersecurity framework requirements.",
  },
  {
    title: "Data Center Protection",
    detail: "High-throughput XGS appliances protect virtualized environments and cloud-hosted workloads with east-west traffic inspection.",
  },
];

const faqs = [
  {
    q: "What is the difference between a traditional firewall and an NGFW?",
    a: "Traditional firewalls filter by port/IP only. NGFWs add deep packet inspection, application awareness, TLS decryption, IPS, and threat intelligence — blocking modern attacks that bypass legacy filters.",
  },
  {
    q: "How does Sophos XGS compare to Palo Alto and Fortinet?",
    a: "Sophos XGS leads on ease of management via Sophos Central, Synchronized Security integration, and total cost of ownership. Palo Alto leads on enterprise feature depth; Fortinet on raw throughput. For UAE SME and mid-market, Sophos delivers superior value.",
  },
  {
    q: "Does the firewall slow down our internet connection?",
    a: "Sophos Xstream Architecture processes SSL inspection and threat prevention in parallel using dedicated hardware, delivering near-zero latency impact. Legacy appliances without acceleration can add 30–50% latency overhead.",
  },
];

export default function NGFWPage() {
  const { open: openContact } = useContactModal();

  return (
    <>
      <Helmet>
        <title>Next-Generation Firewall (NGFW) UAE — Sophos XGS | ArtiflexIT Dubai</title>
        <meta name="description" content="Enterprise NGFW solutions for UAE businesses. Deep packet inspection, TLS decryption, IPS, and SD-WAN — deployed by ArtiflexIT, Platinum Sophos Partner. NESA and CBUAE compliant." />
        <link rel="canonical" href="https://artiflexit.com/cybersecurity/next-generation-firewall" />
      </Helmet>

      <PageHero
        title={<>Next-Generation Firewall <span className="gradient-text">for UAE Enterprises</span></>}
        description="Enterprise-grade perimeter defense with deep packet inspection, TLS 1.3 decryption, integrated IPS, and Synchronized Security — powered by Sophos XGS Xstream Architecture."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Cybersecurity", href: "/cybersecurity" },
          { label: "NGFW", href: "/cybersecurity/next-generation-firewall" },
        ]}
      />

      {/* Stats */}
      <section className="relative border-y border-border-light bg-white" aria-label="NGFW statistics">
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

      {/* Features */}
      <section className="relative py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Core Capabilities"
            title={<>What Makes an NGFW <span className="gradient-text">Next-Generation</span></>}
            description="Modern NGFWs go far beyond port-and-protocol filtering. These six capabilities define enterprise-grade network perimeter defense."
            centered
          />
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

      {/* Sophos XGS Model Range */}
      <section className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Sophos XGS Range"
            title={<>Right-Sized for <span className="gradient-text">Every Deployment</span></>}
            description="From 50-user branch offices to multi-gigabit data centers — the XGS Series scales to match your environment."
            centered
          />
          <div className="overflow-x-auto rounded-2xl border border-border-light bg-white shadow-sm">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border-light bg-surface-secondary">
                  {["Model", "Firewall Throughput", "Recommended Users", "Ideal Use Case"].map((h) => (
                    <th key={h} className="px-6 py-4 text-left font-mono text-xs uppercase tracking-widest text-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {models.map((m) => (
                  <tr key={m.name} className="transition-colors hover:bg-surface-secondary">
                    <td className="px-6 py-4 font-display font-bold text-[#045891]">{m.name}</td>
                    <td className="px-6 py-4 text-sm text-body">{m.throughput}</td>
                    <td className="px-6 py-4 text-sm text-body">{m.users}</td>
                    <td className="px-6 py-4 text-sm text-body">{m.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="relative py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Use Cases"
            title={<>NGFW Deployment <span className="gradient-text">Scenarios</span></>}
            description="How UAE enterprises deploy next-generation firewalls across their network infrastructure."
            centered
          />
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

      {/* FAQ */}
      <section className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader label="FAQ" title={<>Common <span className="gradient-text">Questions</span></>} description="Answers to the most common NGFW questions from UAE IT teams." centered />
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
        title="Deploy Your NGFW Today"
        description="Get a free network security assessment. Our certified Sophos engineers will audit your current firewall, identify gaps, and recommend the right XGS model for your environment."
        primaryButton={{ text: "Request a Free Assessment", action: "modal" }}
      />
    </>
  );
}