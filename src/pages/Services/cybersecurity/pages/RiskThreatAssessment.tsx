import { Helmet } from "react-helmet-async";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import StatsBar from "@/components/ui/StatsBar";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { AlertIcon, ShieldIcon, ServerIcon, EyeIcon } from "@/components/icons";
import FAQAccordion from "@/components/ui/FAQAccordion";
import PremiumCardGrid from "@/components/ui/PremiumCardGrid";

/* ───────── STATS ───────── */

const cyberStats = [
  { value: 4.88, suffix: "M$", label: "Avg Cost of Data Breach" },
  { value: 2, suffix: "sec", label: "Ransomware Frequency" },
  { value: 21, suffix: "days", label: "Avg Downtime After Attack" },
  { value: 7.5, suffix: "%", label: "Stock Drop Post Breach" },
];


/* ───────── PROBLEM ───────── */

const threatReality = {
  title: "Cybersecurity — The Mandatory Imperative",
  stats: [
    { value: "$4.88M", label: "Breach Impact" },
    { value: "2 sec", label: "Attack Frequency" },
    { value: "APT", label: "Threat Evolution" },
    { value: "Certain", label: "Attack Certainty" },
  ],
};

/* ───────── THREAT LANDSCAPE ───────── */

const threatPoints = [
  {
    icon: AlertIcon,
    title: "Explosion of Attack Surfaces",
    desc: "Cloud workloads, SaaS apps, IoT devices, and remote endpoints create multiple entry points for attackers.",
  },
  {
    icon: EyeIcon,
    title: "Sophisticated Threat Actors",
    desc: "AI-powered phishing, deepfakes, and zero-day exploit kits are easily accessible on cybercrime marketplaces.",
  },
  {
    icon: ShieldIcon,
    title: "Regulatory Mandates",
    desc: "Frameworks like GDPR, ISO 27001, NIST, and PCI-DSS impose strict compliance and heavy penalties.",
  },
  {
    icon: ServerIcon,
    title: "Supply Chain Attacks",
    desc: "Incidents like SolarWinds and Log4j show how one vendor vulnerability can impact thousands globally.",
  },
];

/* ───────── BUSINESS IMPACT ───────── */

const businessImpact = [
  {
    title: "Financial Loss",
    desc: "Average breach cost $4.88M; ransomware demands exceed $1.5M; regulatory fines up to $20M.",
  },
  {
    title: "Operational Disruption",
    desc: "Average downtime of 21 days; critical systems offline; major productivity loss.",
  },
  {
    title: "Reputational Damage",
    desc: "Loss of customer trust; stock drop (~7.5%); negative media exposure.",
  },
  {
    title: "Legal & Regulatory Impact",
    desc: "Mandatory breach disclosures, lawsuits, penalties, and potential license loss.",
  },
  {
    title: "Competitive Disadvantage",
    desc: "Intellectual property theft and loss of market advantage.",
  },
  {
    title: "Strategic Setbacks",
    desc: "Failed M&A deals, delayed investments, and leadership changes.",
  },
];

const solutions = [
  { title: "Firewall / NGFW", desc: "Control network traffic and prevent advanced threats across perimeter and internal networks." },
  { title: "Endpoint Security (EDR/XDR)", desc: "Detect, prevent, and respond to threats across all user devices." },
  { title: "Email Security", desc: "Block phishing, malware, spam, BEC attacks, and data leakage." },
  { title: "Data Loss Prevention (DLP)", desc: "Prevent sensitive data exfiltration across endpoints, networks, and cloud." },
  { title: "Workspace Protection (ZTNA)", desc: "Secure SaaS, cloud workloads, and enforce Zero Trust access for users." },
  { title: "SIEM & SOC Monitoring", desc: "Correlate events, detect anomalies, and enable real-time incident response." },
  { title: "Vulnerability Management", desc: "Continuously identify, prioritize, and remediate security weaknesses." },
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "Are cyber attacks really inevitable for businesses?",
    answer:
      "Yes. In today’s digital environment, the question is no longer if an attack will happen, but when. Every organisation is a potential target due to increasing digital exposure.",
  },
  {
    question: "Why is the cybersecurity threat landscape growing so rapidly?",
    answer:
      "The expansion of cloud services, remote work, SaaS applications, and IoT devices has significantly increased attack surfaces, making businesses more vulnerable than ever.",
  },
  {
    question: "What are the most common cyber threats businesses face?",
    answer:
      "Ransomware, phishing attacks, data breaches, and supply chain compromises are among the most common and damaging threats impacting organisations today.",
  },
  {
    question: "How do cyber attacks impact business operations?",
    answer:
      "Cyber attacks can cause system downtime, disrupt operations, reduce productivity, and lead to significant financial and reputational damage.",
  },
  {
    question: "What are the financial risks of poor cybersecurity?",
    answer:
      "Businesses face costs from data breaches, ransomware payments, regulatory fines, and recovery efforts — often reaching millions of dollars per incident.",
  },
  {
    question: "Can small and medium businesses be targeted?",
    answer:
      "Absolutely. Small and medium businesses are often easier targets due to limited security measures, making them highly attractive to attackers.",
  },
  {
    question: "How can businesses protect themselves from cyber threats?",
    answer:
      "By adopting a layered security approach, continuous monitoring, employee awareness, and proactive risk assessments, businesses can significantly reduce their exposure to cyber risks.",
  },
];

/* ───────── PAGE ───────── */

export default function CyberThreatPage() {
  return (
    <>
      <Helmet>
        <title>Cybersecurity Threats & Business Risks | ArtiflexIT</title>
        <meta
          name="description"
          content="Understand cybersecurity threats, risks, and their impact on businesses. Learn how modern attacks affect operations, finances, and reputation."
        />
      </Helmet>

      {/* HERO */}
      <PageHero
        title={
          <>
            Cybersecurity Threats{" "}
            <span className="gradient-text">& Business Risks</span>
          </>
        }
        description="Cyber threats are no longer optional risks — they are inevitable. Understand the evolving threat landscape and how it impacts your business."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cybersecurity", href: "/cybersecurity" },
          { label: "Threat & Risks", href: "/cybersecurity-threats" },
        ]}
      />

      {/* STATS */}
      <StatsBar stats={cyberStats} />

      {/* REALITY */}

      <section className="relative py-24 bg-white overflow-hidden">

  {/* Soft background glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.06),transparent_60%)]" />

  <div className="relative max-w-5xl mx-auto px-6">

    <SectionHeader
      label="The Reality"
      title={
        <>
          Cybersecurity is{" "}
          <span className="gradient-text">No Longer Optional</span>
        </>
      }
      description="The digital landscape has transformed cyber risk into one of the biggest threats to modern businesses."
      centered
    />

    {/* Timeline Layout */}
    <div className="mt-20 relative">

      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#045891] to-[#1B8AC7]/20" />

      <div className="space-y-12">

        {threatReality.stats.map((stat, i) => (
          <div key={stat.label} className="relative pl-14 group">

            {/* Dot */}
            <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-white border border-[#1B8AC7]/30 flex items-center justify-center group-hover:scale-110 transition">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7]" />
            </div>

            {/* Content */}
            <div className="flex items-center justify-between gap-6">

              {/* Text */}
              <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
                {stat.label}
              </p>

              {/* Value */}
              <p className="text-2xl sm:text-2xl font-semibold bg-gradient-to-r from-[#045891] to-[#1B8AC7] bg-clip-text text-transparent">
                {stat.value}
              </p>

            </div>

          </div>
        ))}

      </div>
    </div>

  </div>
</section>

      {/* 🔥 PREMIUM THREAT LANDSCAPE */}
      <section className="py-20 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-6">

          <SectionHeader
            label="Threat Landscape"
            title={
              <>
                <span className="text-blue-100"> The Evolving</span>  <span className="gradient-text">Cyber Threat Landscape</span>
              </>
            }
            description="Cyber risks are accelerating due to technology expansion and advanced threat actors."
            centered
          />

          <PremiumCardGrid items={threatPoints} />

        </div>
      </section>

      {/* BUSINESS IMPACT */}
      <section className="relative py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Impact"
            title={
              <>
                Business Impact of{" "}
                <span className="gradient-text">Cyber Attacks</span>
              </>
            }
            centered
          />
          <div className="grid gap-6 md:grid-cols-3">
            {businessImpact.map((item) => (
              <Card key={item.title}>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Solutions"
            title={
              <>
                Essential <span className="gradient-text">Cybersecurity Solutions</span>
              </>
            }
            description="A layered security approach is required to protect modern businesses."
            centered
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((item) => (
              <Card key={item.title}>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="mx-auto max-w-2xl divide-y divide-white/[0.06]">
          <SectionHeader
            label="Knowledge Base"
            title={
              <>
                Frequently <span className="gradient-text">Asked</span> Questions
              </>
            }
            description="Common cybersecurity questions businesses ask."
            centered
          />

          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Understand Your Cyber Risk"
        description="Identify vulnerabilities and protect your business from evolving cyber threats."
        primaryButton={{ text: "Get Started", action: "modal" }}
      />
    </>
  );
}