import { Helmet } from "react-helmet-async";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import StatsBar from "@/components/ui/StatsBar";
import ProcessFlow from "@/components/ui/ProcessFlow";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { CTASection } from "@/pages/Home/sections/CTASection";
import CardSwap, { Card } from "@/components/ui/CardSwap";
import { CheckIcon } from "@/components/icons";

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

      {/* EVOLUTION */}
      <section className="p-20 bg-surface-secondary">
        <SectionHeader label="Evolution" title="EDR → XDR Journey" centered />

        <ProcessFlow
          steps={evolution.map((item, index) => ({
            number: index + 1,
            title: item.title,
            description: item.desc,
          }))}
        />
      </section>

      {/* 🔥 THREAT REALITY */}
      <section className="relative py-28 bg-[#020617] text-white mt-15">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <SectionHeader
              label="Threat Reality"
              title={
                <>
                  <span className="text-blue-100">Every Endpoint is an{" "}</span>
                  <span className="gradient-text">Attack Surface</span>
                </>
              }
            />

            <p className="mt-6 text-sm text-slate-300">
              Every connected device — laptop, server, or mobile — becomes a potential entry point.
              Modern attacks are AI-driven, stealthy, and designed to bypass traditional antivirus.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Ransomware starts at endpoints",
                "Zero-day attacks bypass AV",
                "Remote work expands attack surface",
                "APT groups target enterprises",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckIcon className="w-4 h-4 text-[#1B8AC7]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CARD GRID */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "100M+", label: "AI-trained malware samples" },
              { value: "43B$", label: "BEC losses reported" },
              { value: "AI", label: "Threat evolution" },
              { value: "24/7", label: "Monitoring required" },
            ].map((item) => (
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                <h3 className="text-xl font-bold">{item.value}</h3>
                <p className="text-xs text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>

        </div>
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
          <div className="grid gap-5">

            {[
              {
                title: "Ransomware Entry Point",
                desc: "Most attacks originate from compromised endpoints.",
              },
              {
                title: "Expanded Attack Surface",
                desc: "Remote work increases exposure across devices.",
              },
              {
                title: "Zero-Day Bypass",
                desc: "Traditional AV cannot detect unknown threats.",
              },
              {
                title: "Sensitive Data Exposure",
                desc: "Endpoints store critical business information.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(27,138,199,0.25)]"
              >

                {/* glow overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-[#045891]/10 to-[#1B8AC7]/10" />

                {/* content */}
                <div className="relative">
                  <h3 className="text-sm font-semibold text-heading group-hover:text-brand-cyan transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-body mt-1">
                    {item.desc}
                  </p>
                </div>

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