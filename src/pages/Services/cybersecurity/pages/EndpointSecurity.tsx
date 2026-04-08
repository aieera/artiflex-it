import { Helmet } from "react-helmet-async";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import StatsBar from "@/components/ui/StatsBar";
import ProcessFlow from "@/components/ui/ProcessFlow";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { CTASection } from "@/pages/Home/sections/CTASection";
import CardSwap, { Card } from "@/components/ui/CardSwap";

/* ───────── STATS ───────── */

const endStats = [
  { value: 1985, suffix: "", label: "Security Innovation Since" },
  { value: 4, suffix: "th Gen", label: "Endpoint Evolution" },
  { value: 1, suffix: " AI Core", label: "Detection Engine" },
  { value: 24, suffix: "/7", label: "Threat Monitoring" },
];

/* ───────── EVOLUTION ───────── */

const evolution = [
  { title: "Checksum AV (1985)", desc: "First antivirus detecting file changes." },
  { title: "Signature AV", desc: "Matched malware using known signatures." },
  { title: "NGAV", desc: "Behaviour + AI-based detection." },
  { title: "EDR", desc: "Threat detection + response + visibility." },
  { title: "XDR", desc: "Unified detection across endpoint, cloud & network." },
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "What is endpoint security?",
    answer: "Endpoint security protects devices like laptops, servers, and mobiles from cyber threats.",
  },
  {
    question: "What is EDR and XDR?",
    answer: "EDR focuses on endpoint detection, while XDR extends protection across network, email, and cloud.",
  },
  {
    question: "Why is endpoint security critical?",
    answer: "Every device is an entry point for attackers, making endpoint security essential.",
  },
];

/* ───────── PAGE ───────── */

export default function EndpointSecurityPage() {
  return (
    <>
      <Helmet>
        <title>Endpoint Security Solutions</title>
      </Helmet>

      {/* HERO */}
      <PageHero
        title={
          <>
            Endpoint & Email <span className="gradient-text">Security Solutions</span> 
          </>
        }
        description="Protect every device in your organization with advanced endpoint detection, response, and AI-powered security."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cybersecurity", href: "/cybersecurity" },
          { label: "Endpoint Security", href: "/endpoint-security" },
        ]}
      />

      {/* STATS */}
      <StatsBar stats={endStats} />

     <section className="relative py-24 bg-white">
  <div className="mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-2 items-center">

    {/* LEFT CONTENT */}
    <div>
      <SectionHeader
        label="Origin"
        title={
          <>
            The Evolution of{" "}
            <span className="gradient-text">Endpoint Security</span>
          </>
        }
      />

      <p className="mt-6 text-sm text-body leading-relaxed">
        Endpoint security began in 1985 with the creation of the first antivirus software.
        At the time, threats were simple and detection relied on identifying known malicious files.
      </p>

      <p className="mt-4 text-sm text-body leading-relaxed">
        As cyber attacks evolved, traditional methods became ineffective. Modern endpoint security
        now leverages artificial intelligence, behavioural analytics, and real-time response to
        detect and neutralize threats before they spread.
      </p>

      {/* Inline highlight */}
      <div className="mt-6 text-sm font-medium text-brand-blue">
        → From Antivirus → EDR → XDR
      </div>
    </div>

    {/* RIGHT VISUAL BLOCK */}
    <div className="relative">
      <div className="rounded-3xl bg-gradient-to-br from-[#042f4b] via-[#045891] to-[#1B8AC7] p-8 text-white shadow-xl">

        <h3 className="text-lg font-semibold mb-4">
          Why Endpoint Security Matters
        </h3>

        <ul className="space-y-3 text-sm text-white/90">
          <li>• Every device is a potential entry point</li>
          <li>• Ransomware starts at endpoints</li>
          <li>• Zero-day attacks bypass traditional AV</li>
          <li>• Remote work expands attack surface</li>
        </ul>
      </div>

      {/* subtle glow */}
      <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-brand-blue/20 blur-3xl rounded-full" />
    </div>

  </div>
</section>

      {/* EVOLUTION */}
      <section className="py-20 bg-surface-secondary">
        <SectionHeader label="Evolution" title="EDR → XDR Journey" centered />

        <ProcessFlow
          steps={evolution.map((item, index) => ({
            number: index + 1,
            title: item.title,
            description: item.desc,
          }))}
        />
      </section>

     <section className="relative py-16 bg-white sm:py-24">
  <div className="mx-auto max-w-7xl px-5 sm:px-6">
    
    <SectionHeader
      label="Capabilities"
      title={
        <>
          Advanced <span className="gradient-text">Endpoint Protection</span>
        </>
      }
      description="Modern endpoint security goes beyond antivirus — it detects, responds, and adapts in real time."
      centered
    />

    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      
      {[
        {
          title: "AI Threat Detection",
          desc: "Detect zero-day and unknown threats using machine learning and behavioral analysis.",
        },
        {
          title: "Ransomware Protection",
          desc: "Automatically detect and roll back malicious encryption attempts in real time.",
        },
        {
          title: "Endpoint Visibility",
          desc: "Gain complete insight into activities across all endpoints in your network.",
        },
        {
          title: "Automated Response",
          desc: "Isolate infected devices and stop threats instantly without manual intervention.",
        },
        {
          title: "Cross-Platform Security",
          desc: "Protect Windows, macOS, Linux, servers, and mobile devices from a single platform.",
        },
        {
          title: "XDR Integration",
          desc: "Correlate endpoint, network, and cloud data for unified threat detection.",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="group rounded-2xl border border-border-light bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <h3 className="font-display text-lg font-semibold text-heading mb-2 group-hover:text-brand-blue">
            {item.title}
          </h3>
          <p className="text-sm text-body leading-relaxed">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

<section className="relative py-16 bg-surface-secondary sm:py-24">
  <div className="mx-auto max-w-7xl px-5 sm:px-6 grid gap-10 lg:grid-cols-2 items-center">

    {/* LEFT */}
    <div>
      <SectionHeader
        label="Why It Matters"
        title={
          <>
            Every Device is a <span className="gradient-text">Security Risk</span>
          </>
        }
      />

      <p className="mt-4 text-sm text-body leading-relaxed">
        Every laptop, server, mobile device, and virtual machine connected to your network 
        becomes a potential entry point for attackers. Without proper endpoint protection, 
        a single compromised device can lead to a full-scale breach.
      </p>

      <p className="mt-4 text-sm text-body leading-relaxed">
        Modern attacks are no longer file-based — they are behavioural, stealthy, and 
        designed to bypass traditional antivirus systems. This is why endpoint security 
        has evolved into intelligent detection and response platforms.
      </p>
    </div>

    {/* RIGHT */}
    <div className="grid gap-4">
      {[
        "Ransomware attacks target endpoints first",
        "Remote work increases attack surface",
        "Zero-day threats bypass traditional AV",
        "Endpoints store sensitive business data",
      ].map((item) => (
        <div
          key={item}
          className="rounded-xl border border-border-light bg-white p-4 text-sm shadow-sm"
        >
          {item}
        </div>
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
        title="Secure Every Endpoint"
        description="Protect your devices with advanced endpoint security solutions."
        primaryButton={{ text: "Get Started", action: "modal" }}
      />
    </>
  );
}