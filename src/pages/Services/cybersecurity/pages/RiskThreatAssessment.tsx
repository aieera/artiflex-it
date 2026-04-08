import { Helmet } from "react-helmet-async";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import StatsBar from "@/components/ui/StatsBar";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { AlertIcon, ShieldIcon, ServerIcon, EyeIcon } from "@/components/icons";
import FAQAccordion from "@/components/ui/FAQAccordion";

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
    { value: "$4.88M", label: "Average cost of a data breach globally" },
    { value: "Every 2 sec", label: "Ransomware attacks occurring worldwide" },
    { value: "AI-driven", label: "Rise of automated cyber attacks" },
    { value: "4%", label: "Revenue fines under GDPR" },
  ],
};

/* ───────── THREAT LANDSCAPE ───────── */

const threatPoints = [
  {
    icon: AlertIcon,
    title: "Explosion of Attack Surface",
    desc: "Cloud, SaaS, IoT, and remote work have expanded entry points for attackers.",
  },
  {
    icon: EyeIcon,
    title: "Sophisticated Threat Actors",
    desc: "AI phishing, deepfakes, and zero-day exploits are widely accessible.",
  },
  {
    icon: ShieldIcon,
    title: "Regulatory Pressure",
    desc: "Strict laws like GDPR, ISO 27001, and NIST impose heavy penalties.",
  },
  {
    icon: ServerIcon,
    title: "Supply Chain Risks",
    desc: "Single vendor vulnerabilities can impact thousands of businesses.",
  },
];

/* ───────── BUSINESS IMPACT ───────── */

const businessImpact = [
  {
    title: "Financial Loss",
    desc: "Millions lost due to breaches, ransomware payments, and fines.",
  },
  {
    title: "Operational Disruption",
    desc: "Systems go offline, causing productivity and revenue loss.",
  },
  {
    title: "Reputational Damage",
    desc: "Loss of customer trust and long-term brand damage.",
  },
  {
    title: "Legal Consequences",
    desc: "Compliance violations, lawsuits, and penalties.",
  },
  {
    title: "Competitive Loss",
    desc: "Intellectual property theft and business advantage loss.",
  },
  {
    title: "Strategic Setbacks",
    desc: "Delayed investments, failed deals, and leadership changes.",
  },
];

const solutions = [
  { title: "Firewall / NGFW", desc: "Control and secure network traffic with advanced threat prevention." },
  { title: "Endpoint Security (EDR/XDR)", desc: "Detect and respond to threats across devices." },
  { title: "Email Security", desc: "Protect against phishing, spam, and malware attacks." },
  { title: "Data Loss Prevention", desc: "Prevent sensitive data leaks across systems." },
  { title: "Zero Trust (ZTNA)", desc: "Secure access to applications and remote users." },
  { title: "SIEM & SOC Monitoring", desc: "Continuous monitoring and threat detection." },
  { title: "Vulnerability Management", desc: "Identify and fix security weaknesses proactively." },
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

      {/* PROBLEM SECTION */}
      <section className="relative py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
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
          <div className="grid gap-4 sm:grid-cols-2 max-w-5xl mx-auto">
            {threatReality.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border bg-gradient-to-r from-[#045891] to-[#1B8AC7] p-6 text-white"
              >
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-sm mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THREAT LANDSCAPE */}
      <section className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Threat Landscape"
            title={
              <>
                Why{" "}
                <span className="gradient-text">Cyber Risk</span> is Increasing
              </>
            }
            centered
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {threatPoints.map((item) => (
              <Card key={item.title}>
                <item.icon className="mb-3 text-brand-blue" />
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm">{item.desc}</p>
              </Card>
            ))}
          </div>
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