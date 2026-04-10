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

const emailFeatures = [
  {
    name: "Phishing Detection",
    desc: "Ability to detect malicious links, attachments, and deceptive emails using AI and threat intelligence.",
    vendors: {
      "Sophos": 5,
      "Check Point": 5,
      "Abnormal": 5,
      "Barracuda": 4,
      "Proofpoint": 5,
      "Mimecast": 4,
    },
  },
  {
    name: "BEC Protection",
    desc: "Detects impersonation, CEO fraud, and social engineering attacks without malware.",
    vendors: {
      "Sophos": 5,
      "Check Point": 4,
      "Abnormal": 5,
      "Barracuda": 4,
      "Proofpoint": 5,
      "Mimecast": 4,
    },
  },
  {
    name: "Sandboxing & CDR",
    desc: "Analyzes attachments in isolated environments and removes malicious content.",
    vendors: {
      "Sophos": 5,
      "Check Point": 5,
      "Abnormal": 2,
      "Barracuda": 4,
      "Proofpoint": 5,
      "Mimecast": 4,
    },
  },
  {
    name: "Deployment Ease",
    desc: "How quickly and easily the solution can be deployed (API vs gateway).",
    vendors: {
      "Sophos": 5,
      "Check Point": 5,
      "Abnormal": 5,
      "Barracuda": 4,
      "Proofpoint": 3,
      "Mimecast": 3,
    },
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
  const [activeFeature, setActiveFeature] = useState(0);
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
                className="relative rounded-[28px] bg-[#020617]/90 backdrop-blur-xl p-10 
  shadow-[0_20px_60px_rgba(0,0,0,0.6)] 
  hover:shadow-[0_30px_100px_rgba(0,0,0,0.8)] 
  transition-all duration-500 text-left overflow-hidden"
              >

                {/* subtle inner light */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                {/* 🔥 TITLE */}
                <h3 className="relative text-xl font-semibold tracking-tight text-white">
                  {transformData[active].title}
                </h3>

                {/* 🔥 CONTENT */}
                <ul className="relative mt-6 space-y-3">
                  {transformData[active].content.map((line, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed"
                    >
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#045891] to-[#1B8AC7]" />
                      {line}
                    </li>
                  ))}
                </ul>

                {/* 🔥 DIVIDER */}
                <div className="relative mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                {/* 🔥 HIGHLIGHT */}
                <div className="relative mt-4 text-xs font-medium tracking-wide text-[#38bdf8]">
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
                  image: "https://jettbt.com/wp-content/uploads/how-email-security-services-safeguard-your-business.jpg",
                },
                {
                  title: "Check Point Harmony",
                  desc: "Threat extraction and sandboxing powered by ThreatCloud AI.",
                  image: "https://blog.checkpoint.com/wp-content/uploads/2023/05/blog-05-700x700.jpg",
                },
                {
                  title: "Abnormal Security",
                  desc: "AI-native behavioural detection for advanced phishing and BEC attacks.",
                  image: "https://www.tierpoint.com/wp-content/uploads/2025/02/Benefits-of-Using-AI-and-ML-in-Cybersecurity_blog.jpg",
                },
                {
                  title: "Darktrace Email",
                  desc: "Self-learning AI with autonomous response and anomaly detection.",
                  image: "https://cdn.prod.website-files.com/626ff19cdd07d1258d49238d/66bcb0a26b0b4635f49444e1_Email%20-%20Product%20Hero.jpg",
                },
                {
                  title: "Proofpoint",
                  desc: "People-centric email protection with advanced analytics and intelligence.",
                  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtfZSkrILJOMqMlFldBBql4jTS6kHO6q2N2Q&s",
                },
              ]}
            />
          </div>
        </div>
      </section>

      
      {/* 🔥 EMAIL SECURITY INTELLIGENCE */}
<section className="relative py-28 bg-white overflow-hidden">

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.08),transparent_70%)]" />

  <div className="max-w-6xl mx-auto px-6 relative z-10">

    <SectionHeader
      label="Security Intelligence"
      title={
        <>
          Email Security <span className="gradient-text">Capabilities & Leaders</span>
        </>
      }
      description="Understand what matters in email security — and which vendors lead in each capability."
      centered
    />

    {/* 🔥 FEATURE SELECTOR */}
    <div className="mt-12 flex flex-wrap justify-center gap-3">
      {emailFeatures.map((f, i) => (
        <button
          key={i}
          onClick={() => setActiveFeature(i)}
          className={`px-4 py-2 rounded-full text-sm transition ${
            activeFeature === i
              ? "bg-gradient-to-r from-[#045891] to-[#1B8AC7] text-white shadow"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {f.name}
        </button>
      ))}
    </div>

    {/* 🔥 DYNAMIC CARD */}
    <div className="mt-16 max-w-3xl mx-auto rounded-2xl border border-border-light bg-gradient-to-r from-[#082c44] to-[#1c1c1d] p-8 shadow">

      {/* Feature Title */}
      <h3 className="text-lg font-semibold text-white">
        {emailFeatures[activeFeature].name}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm text-white">
        {emailFeatures[activeFeature].desc}
      </p>

      {/* Divider */}
      <div className="my-6 h-px bg-gradient-to-r from-transparent via-border-light to-transparent" />

      {/* 🔥 Vendor Ratings */}
      <div className="space-y-3">

        {Object.entries(emailFeatures[activeFeature].vendors).map(
          ([vendor, rating], i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg bg-blue-100 px-4 py-3"
            >
              <span className="text-sm text-black ">{vendor}</span>

              {/* ⭐ Stars */}
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((star) => (
                  <span
                    key={star}
                    className={`text-md ${
                      star <= rating
                        ? "text-yellow-600"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          )
        )}

      </div>

      {/* Bottom Insight */}
      <div className="mt-6 text-xs text-muted">
        ⭐ Higher ratings indicate stronger real-world performance and detection capability.
      </div>

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