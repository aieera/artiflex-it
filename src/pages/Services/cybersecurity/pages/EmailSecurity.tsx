import { Helmet } from "react-helmet-async";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { CTASection } from "@/pages/Home/sections/CTASection";
import PremiumCardStrip from "@/components/ui/PremiumCardStrip";
import { motion } from "framer-motion";

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
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionHeader
            label="Evolution"
            title={
              <>
                Security Had to <span className="gradient-text">Evolve</span>
              </>
            }
            description="As threats became more human-centric, security had to shift from rule-based detection to intelligent, behavior-driven protection."
            centered
          />

          <p className="mt-6 text-sm text-body leading-relaxed">
            Traditional email security relied on signatures, blacklists, and known patterns.
            But modern attacks don’t look malicious — they look normal.
          </p>

          <div className="mt-10 flex justify-center gap-4 text-sm font-medium">
            <span className="px-4 py-2 rounded-full bg-gray-100">Spam Filters</span>
            <span className="px-4 py-2 rounded-full bg-gray-100">SEG</span>
            <span className="px-4 py-2 rounded-full bg-brand-blue text-white">
              AI Behavioural Detection
            </span>
          </div>
        </div>
      </section>

      {/* 🔥 VENDORS (ELEGANT STACK) */}
      <section className="bg-[#0b0b0b] py-28 relative overflow-hidden">

        {/* subtle glow background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(27,138,199,0.15),transparent_70%)]" />

        <div className="relative z-10">
          <SectionHeader
            label="Platforms"
            title={
              <>
                <span className="text-blue-100">Leading</span>  <span className="gradient-text">Email Security</span> <span className="text-blue-100">Platforms</span>
              </>
            }
            description="Explore the most advanced email security solutions protecting modern enterprises."
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

      {/* 🔥 CAPABILITY COMPARISON */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <SectionHeader
            label="Analysis"
            title={
              <>
                Capability <span className="gradient-text">Comparison</span>
              </>
            }
            description="Evaluate key features across modern email security solutions."
            centered
          />

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">

            {[
              { title: "Phishing Detection", rating: "★★★★★" },
              { title: "BEC Protection", rating: "★★★★★" },
              { title: "Sandboxing", rating: "★★★★☆" },
              { title: "Deployment Ease", rating: "★★★★★" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border-light p-6 shadow-sm hover:shadow-lg transition"
              >
                <p className="font-medium text-heading">{item.title}</p>
                <p className="mt-2 text-brand-blue">{item.rating}</p>
              </div>
            ))}

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