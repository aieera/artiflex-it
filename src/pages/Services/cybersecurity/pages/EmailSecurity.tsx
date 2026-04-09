import { Helmet } from "react-helmet-async";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { CTASection } from "@/pages/Home/sections/CTASection";
import PremiumCardStrip from "@/components/ui/PremiumCardStrip";
import { motion } from "framer-motion";
import { useState } from "react";

const stories = [
  {
    year: "1978",
    text: "The first spam email was sent across ARPANET to 393 users. It introduced the idea that one message could influence hundreds instantly.",
  },
  {
    year: "2000",
    text: "The ILOVEYOU worm infected 45 million computers globally within days, causing billions in damages — driven purely by human curiosity.",
  },
  {
    year: "2015+",
    text: "Business Email Compromise (BEC) emerged, generating over $43 billion in losses. These attacks contain no malware — only deception.",
  },
];

const transformData = [
  {
    title: "Spam Filtering",
    content: [
      "Early email security relied on keyword filtering and blacklists.",
      "Effective against spam, but not against targeted attacks.",
    ],
    highlight: "Basic filtering era",
  },
  {
    title: "Secure Email Gateway",
    content: [
      "Introduced signature-based detection and reputation systems.",
      "Blocked known threats but failed against unknown attacks.",
    ],
    highlight: "Signature-based security",
  },
  {
    title: "Signature Detection",
    content: [
      "Relied on known malware patterns and heuristics.",
      "Completely ineffective against zero-day and BEC attacks.",
    ],
    highlight: "Reactive detection model",
  },
  {
    title: "Behavioural AI",
    content: [
      "AI learns normal communication patterns across users.",
      "Detects anomalies like impersonation, BEC, and social engineering.",
    ],
    highlight: "Modern AI-driven security",
  },
];



/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "Why is email the biggest cybersecurity risk?",
    answer:
      "Email is the primary entry point for phishing, ransomware, and social engineering attacks targeting human behaviour.",
  },
  {
    question: "What is Business Email Compromise (BEC)?",
    answer:
      "BEC is an attack where criminals impersonate executives or vendors to trick employees into transferring money or data.",
  },
  {
    question: "Are traditional email gateways enough?",
    answer:
      "No. Modern threats require AI-based behavioural detection beyond signature-based filtering.",
  },
];

/* ───────── PAGE ───────── */

export default function EmailSecurityPage() {
  const [active, setActive] = useState(3);
  return (
    <>
      <Helmet>
        <title>Email Security Solutions & Vendor Comparison</title>
      </Helmet>

      {/* HERO */}
      <PageHero
        title={
          <>
            Email Security Solutions &{" "}
            <span className="gradient-text">Vendor Comparison</span>
          </>
        }
        description="Email remains the #1 attack vector. Protect your organisation with AI-powered email security designed to stop modern threats."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cybersecurity", href: "/cybersecurity" },
          { label: "Email Security", href: "/email-security" },
        ]}
      />

      {/* 🔥 ORIGIN STORY (DARK STRIP) */}
      <section className="relative py-32 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center">

          {/* Heading */}
          <SectionHeader
            label="Knowledge Base"
            title={
              <>
                <span className="gradient-text">Email</span> - The Most Powerful Attack Vector
              </>
            }
            description="How email evolved into the most exploited attack surface in cybersecurity."
            centered
          />


          {/* Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">

            {stories.map((item, i) => {
              const isCenter = i === 1;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative rounded-2xl p-6 transition-all duration-300
              ${isCenter
                      ? "bg-gradient-to-br from-[#0b0a1f] to-[#1a1a40] text-white shadow-2xl scale-105"
                      : "bg-white border border-gray-200 text-[#030617] shadow-sm hover:shadow-md"
                    }`}
                >

                  {/* Year */}
                  <span className={`text-sm font-semibold ${isCenter ? "text-blue-300" : "text-brand-blue"
                    }`}>
                    {item.year}
                  </span>

                  {/* Text */}
                  <p className={`mt-3 text-sm leading-relaxed ${isCenter ? "text-gray-300" : "text-gray-600"
                    }`}>
                    {item.text}
                  </p>

                  {/* subtle glow for center */}
                  {isCenter && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent" />
                  )}
                </motion.div>
              );
            })}

          </div>
        </div>
      </section>

      {/* 🔥 TRANSFORMATION SECTION */}
      <section className="relative py-28 bg-white overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(27,138,199,0.06),transparent_70%)]" />

        <div className="max-w-6xl mx-auto px-6 text-center">

          <SectionHeader
            label="Evolution"
            title={
              <>
                Security Had to{" "}
                <span className="gradient-text">Reinvent Itself</span>
              </>
            }
            description="From rule-based filtering to intelligent behaviour-driven protection."
            centered
          />

          {/* 🔥 CLICKABLE STRIP */}
          <div className="mt-16 flex flex-wrap justify-center gap-4 relative z-10">

            {transformData.map((item, i) => (
              <button
                key={item.title}
                onClick={() => setActive(i)}
                className={`cursor-pointer px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
        ${active === i
                    ? "bg-gradient-to-r from-[#045891] to-[#1B8AC7] text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105 active:scale-95"
                  }`}
              >
                {item.title}
              </button>
            ))}

          </div>

          {/* 🔥 DYNAMIC CARD */}
          <div className="mt-20 max-w-3xl mx-auto relative group">

            {/* 🔥 SOFT GLOW BACKGROUND */}
            <div className="pointer-events-none absolute -inset-6 rounded-[32px] opacity-60 blur-2xl 
    bg-gradient-to-br from-[#045891]/20 to-[#1B8AC7]/20" />

            {/* 🔥 GRADIENT BORDER WRAPPER */}
            <div className="relative rounded-[28px] p-[1px] bg-gradient-to-br from-[#045891]/40 to-[#1B8AC7]/30">

              <motion.div
                key={active}
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative rounded-[28px] bg-white/80 backdrop-blur-xl p-10 
      shadow-[0_20px_60px_rgba(4,88,145,0.12)] 
      hover:shadow-[0_30px_100px_rgba(4,88,145,0.18)] 
      transition-all duration-500 text-left overflow-hidden"
              >

                {/* subtle inner light */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

                {/* 🔥 TITLE */}
                <h3 className="relative text-xl font-semibold tracking-tight text-heading">
                  {transformData[active].title}
                </h3>

                {/* 🔥 CONTENT */}
                <ul className="relative mt-6 space-y-3">
                  {transformData[active].content.map((line, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-body leading-relaxed"
                    >
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#045891] to-[#1B8AC7]" />
                      {line}
                    </li>
                  ))}
                </ul>

                {/* 🔥 DIVIDER */}
                <div className="relative mt-8 h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

                {/* 🔥 HIGHLIGHT */}
                <div className="relative mt-4 text-xs font-medium tracking-wide text-brand-cyan">
                  {transformData[active].highlight}
                </div>

              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* 🔥 VENDORS (ELEGANT STACK) */}

      <section className="py-15 bg-[#020617] text-white">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header centered */}
          <SectionHeader
            label="Importance"
            title={
              <>
                <span className="text-blue-100">Leading</span>  <span className="gradient-text">Email Security</span> <span className="text-blue-100">Platforms</span>
              </>
            }
            description="Modern threats operate inside your network — NDR provides visibility where traditional tools fail."
            centered
          />

          <div className="mt-16">
            <PremiumCardStrip
              items={[
                {
                  title: "Sophos Email",
                  desc: "Synchronized security across endpoint, firewall, and email with AI-driven threat intelligence.",
                  image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
                },
                {
                  title: "Check Point Harmony",
                  desc: "Threat extraction and sandboxing powered by ThreatCloud AI.",
                  image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
                },
                {
                  title: "Abnormal Security",
                  desc: "AI-native behavioural detection for advanced phishing and BEC attacks.",
                  image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
                },
                {
                  title: "Darktrace Email",
                  desc: "Self-learning AI with autonomous response and anomaly detection.",
                  image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
                },
                {
                  title: "Proofpoint",
                  desc: "People-centric email protection with advanced analytics and intelligence.",
                  image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* 🔥 CAPABILITY COMPARISON (PREMIUM INTELLIGENCE UI) */}
      <section className="relative py-32 bg-white overflow-hidden">

        {/* background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.08),transparent_70%)]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <SectionHeader
            label="Capability Intelligence"
            title={
              <>
                Email Security <span className="gradient-text">Capability Matrix</span>
              </>
            }
            description="Based on real-world vendor performance across AI detection, sandboxing, BEC protection, and deployment models."
            centered
          />

          {/* 🔥 CAPABILITY CARDS */}
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                title: "Phishing Detection",
                desc: "AI + threat intelligence driven detection across URLs, attachments, and behaviour.",
                level: "Best in class",
                value: 100,
              },
              {
                title: "BEC Protection",
                desc: "Behavioural AI detecting impersonation, CEO fraud, and social engineering.",
                level: "Critical capability",
                value: 100,
              },
              {
                title: "Sandboxing & CDR",
                desc: "Deep attachment analysis and content reconstruction for zero-day threats.",
                level: "Advanced",
                value: 85,
              },
              {
                title: "Deployment Model",
                desc: "API-based deployment without MX changes — fastest enterprise rollout.",
                level: "Optimized",
                value: 95,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-[#045891]/30 to-[#1B8AC7]/30"
              >

                <div className="relative rounded-2xl bg-white/80 backdrop-blur-xl p-6 
            shadow-[0_10px_30px_rgba(4,88,145,0.08)] 
            hover:shadow-[0_25px_80px_rgba(4,88,145,0.18)] 
            transition-all duration-500 overflow-hidden">

                  {/* glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition 
              bg-gradient-to-br from-[#045891]/10 to-[#1B8AC7]/10" />

                  <div className="relative">
                    <h3 className="text-sm font-semibold text-heading">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs text-body leading-relaxed">
                      {item.desc}
                    </p>

                    {/* progress */}
                    <div className="mt-6 h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7]"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>

                    <p className="mt-3 text-xs text-brand-cyan font-medium">
                      {item.level}
                    </p>
                  </div>

                </div>
              </div>
            ))}

          </div>

          {/* 🔥 ENTERPRISE INSIGHT STRIP */}
          <div className="mt-20 grid md:grid-cols-3 gap-6">

            {[
              {
                title: "AI-Native Detection",
                desc: "Modern vendors rely on behavioural AI to detect threats without signatures.",
              },
              {
                title: "Gateway Limitations",
                desc: "Traditional SEG models fail against zero-day phishing and BEC attacks.",
              },
              {
                title: "Platform Integration",
                desc: "Unified security platforms provide better visibility across endpoint, network, and email.",
              },
            ].map((item) => (
              <div className="relative p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition">
                <h3 className="text-sm font-semibold text-heading">{item.title}</h3>
                <p className="text-xs text-body mt-2">{item.desc}</p>
              </div>
            ))}

          </div>

          {/* 🔥 FINAL PREMIUM STATEMENT */}
          <div className="mt-20 max-w-3xl mx-auto text-center">
            <p className="text-sm text-body leading-relaxed">
              Traditional email security relied on detecting known threats. Modern security evaluates
              identity, behaviour, and intent. This shift — from content filtering to intelligence-driven
              protection — defines the new generation of email security platforms.
            </p>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="mx-auto max-w-2xl px-6">
          <SectionHeader
            label="Knowledge Base"
            title={
              <>
                Frequently <span className="gradient-text">Asked</span> Questions
              </>
            }
            centered
          />

          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Secure Your Email Infrastructure"
        description="Protect your organisation from phishing, ransomware, and BEC attacks with advanced email security."
        primaryButton={{ text: "Get Started", action: "modal" }}
      />
    </>
  );
}