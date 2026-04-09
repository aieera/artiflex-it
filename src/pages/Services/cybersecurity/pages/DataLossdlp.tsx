import React, { useState } from "react";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import FAQAccordion from "@/components/ui/FAQAccordion";
import FeatureFlow from "@/components/ui/FeatureFlow";

const faqs = [
  {
    question: "What is Data Loss Prevention (DLP)?",
    answer:
      "DLP is a cybersecurity solution that detects and prevents sensitive data from leaving an organization through channels like email, cloud apps, USB devices, or network transfers.",
  },
  {
    question: "Why is DLP important for businesses?",
    answer:
      "DLP helps prevent data breaches, ensures regulatory compliance, and protects critical business information from insider threats and accidental leaks.",
  },
  {
    question: "What types of data does DLP protect?",
    answer:
      "DLP protects sensitive data such as financial information, personal data (PII), healthcare records, intellectual property, and confidential business documents.",
  },
  {
    question: "How does DLP work?",
    answer:
      "DLP uses content inspection, pattern matching, and policies to monitor and control data movement across endpoints, email, networks, and cloud applications.",
  },
  {
    question: "Can DLP prevent insider threats?",
    answer:
      "Yes. DLP monitors user activity and prevents unauthorized sharing of sensitive data, reducing risks from both malicious insiders and human errors.",
  },
  {
    question: "Is DLP suitable for small businesses?",
    answer:
      "Yes. Modern DLP solutions are scalable and can be tailored for small and mid-sized businesses without requiring complex infrastructure.",
  },
];

const dlptypes = [
  {
    title: "Endpoint DLP",
    desc: "Controls data on user devices.",
    details:
      "Protects sensitive data on endpoints by controlling USB transfers, clipboard usage, printing, screenshots, and personal cloud uploads. Works even offline with agent-based enforcement.",
  },
  {
    title: "Email DLP",
    desc: "Prevents sensitive data leakage via email.",
    details:
      "Scans outgoing emails and attachments using content-aware detection (PII, financial data, IP). Can block, quarantine, or alert based on policy violations.",
  },
  {
    title: "Network DLP",
    desc: "Monitors data in transit.",
    details:
      "Inspects outbound traffic such as web uploads, FTP transfers, and cloud communication. Enforced at the firewall level to control data leaving the network.",
  },
  {
    title: "Cloud / SaaS DLP",
    desc: "Protects cloud applications and SaaS.",
    details:
      "Monitors platforms like Microsoft 365, Google Drive, and Salesforce. Detects oversharing, external access, and cloud-to-cloud data transfers that traditional DLP cannot see.",
  },
  {
    title: "Traditional DLP",
    desc: "On-premise, network-based approach.",
    details:
      "Built for a world where data lived inside corporate networks. Provides deep control over endpoints and email but lacks visibility into cloud and remote environments. Complex and expensive to manage.",
  },
  {
    title: "Cloud-Native DLP",
    desc: "Modern, scalable cloud approach.",
    details:
      "Delivers protection across SaaS apps, remote users, and hybrid environments. Uses AI and contextual analysis to reduce false positives and provide real-time protection anywhere.",
  },
];

const dlpFeatures = [
  {
    name: "Endpoint DLP",
    desc: "Controls USB, clipboard, print, and offline data movement on user devices.",
    vendors: {
      "Sophos": 5,
      "Check Point": 5,
      "Digital Guardian": 5,
      "Symantec": 5,
      "Forcepoint": 5,
      "Netskope": 3,
      "Microsoft": 4,
    },
  },
  {
    name: "Email DLP",
    desc: "Scans outgoing emails and attachments to prevent sensitive data leaks.",
    vendors: {
      "Sophos": 5,
      "Check Point": 5,
      "Digital Guardian": 4,
      "Symantec": 4,
      "Forcepoint": 4,
      "Netskope": 3,
      "Microsoft": 5,
    },
  },
  {
    name: "Cloud / SaaS DLP",
    desc: "Protects data across SaaS apps like M365, Google Drive, and cloud platforms.",
    vendors: {
      "Sophos": 4,
      "Check Point": 5,
      "Digital Guardian": 3,
      "Symantec": 3,
      "Forcepoint": 4,
      "Netskope": 5,
      "Microsoft": 5,
    },
  },
  {
    name: "Data Classification",
    desc: "Identifies sensitive data using patterns, AI, and contextual analysis.",
    vendors: {
      "Sophos": 4,
      "Check Point": 4,
      "Digital Guardian": 5,
      "Symantec": 5,
      "Forcepoint": 5,
      "Netskope": 5,
      "Microsoft": 5,
    },
  },
  {
    name: "Insider Threat Detection",
    desc: "Detects risky user behavior and prevents data exfiltration.",
    vendors: {
      "Sophos": 4,
      "Check Point": 3,
      "Digital Guardian": 5,
      "Symantec": 3,
      "Forcepoint": 5,
      "Netskope": 4,
      "Microsoft": 5,
    },
  },
  {
    name: "Ease of Management",
    desc: "How easy it is to deploy, manage, and maintain the DLP solution.",
    vendors: {
      "Sophos": 5,
      "Check Point": 5,
      "Digital Guardian": 4,
      "Symantec": 2,
      "Forcepoint": 3,
      "Netskope": 4,
      "Microsoft": 5,
    },
  },
];

function DataLossdlp() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeDlpFeature, setActiveDlpFeature] = useState(0);
  return (
    <>
      {/* ✅ HERO (reuse same style) */}
      <PageHero
        title={
          <>
            Data Loss Prevention{" "}
            <span className="gradient-text">(DLP)</span>
          </>
        }
        description="Protect sensitive data from leaks, insider threats, and compliance risks with modern Data Loss Prevention strategies."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cybersecurity", href: "/cybersecurity" },
          { label: "DLP", href: "/dlp" },
        ]}
      />

      {/* 🔥 ORIGIN + INTRO (Split Premium Layout) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-stretch">

          {/* LEFT */}
          <div className="flex flex-col justify-center">
            <SectionHeader
              label="Origin"
              title={
                <>
                  Why <span className="gradient-text">DLP Exists</span>
                </>
              }
              description="Cybersecurity shifted from stopping attacks to preventing data from leaving."
            />

            <p className="text-sm text-gray-600 mt-6 leading-relaxed max-w-md">
              In 1999, sensitive trading data was leaked via email — no malware,
              no alert. Traditional security failed because it didn’t understand
              data itself. This led to the birth of Data Loss Prevention —
              focusing on protecting data, not just networks.
            </p>
          </div>

          {/* RIGHT - IMAGE WITH OVERLAY */}
          <div className="relative w-full h-full min-h-[350px]">

            {/* Image */}
            <img
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop"
              alt="Data security"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/50" />

            {/* TEXT ON IMAGE */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
              <p className="text-xs opacity-70 tracking-wide">Key Insight</p>
              <h3 className="text-xl font-semibold mt-1 leading-snug max-w-sm">
                Security must understand data, not just threats.
              </h3>
            </div>

          </div>

        </div>
      </section>


      {/* ⚠️ WHY DLP MATTERS */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">

          <SectionHeader
            label="Importance"
            title={
              <>
                Why{" "}
                <span className="gradient-text">DLP Matters</span>
              </>
            }
            description="Modern data moves everywhere — DLP ensures it never leaves your control."
            centered
          />

          <FeatureFlow
            items={[
              {
                title: "Prevent Data Leaks",
                desc: "Stop sensitive data from being shared through email, cloud apps, or removable devices.",
              },
              {
                title: "Ensure Compliance",
                desc: "Meet regulatory requirements like GDPR, HIPAA, and ISO with data protection policies.",
              },
              {
                title: "Protect Intellectual Property",
                desc: "Secure business-critical data such as designs, source code, and confidential documents.",
              },
              {
                title: "Reduce Insider Risk",
                desc: "Monitor and control how employees access and share sensitive information.",
              },
            ]}
          />

        </div>
      </section>

      {/* 🧠 DLP TYPES (Premium Grid UI) */}
      {/* TYPES */}
      <section className="relative py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Types"
            title={
              <>
                Types of <span className="gradient-text">Firewalls</span>
              </>
            }
            centered
          />





          {/* TYPES */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dlptypes.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={item.title}
                  className={`rounded-xl border transition-all duration-300 ${isOpen
                    ? "border-brand-blue/30 bg-brand-blue/5"
                    : "border-border-light hover:border-slate-300"
                    }`}
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-lg font-semibold text-heading mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-body">{item.desc}</p>
                      </div>

                      {/* Toggle Button */}
                      <button
                        onClick={() =>
                          setOpenIndex(isOpen ? null : index)
                        }
                        className={`flex h-8 w-8 items-center justify-center rounded-full border transition ${isOpen
                          ? "rotate-45 border-brand-blue/50 bg-brand-blue/10 text-brand-blue"
                          : "border-border-light text-muted"
                          }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          className="h-4 w-4"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>
                    </div>

                    {/* Expandable Content */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 mt-4" : "max-h-0"
                        }`}
                    >
                      <p className="text-sm text-body leading-relaxed">
                        {item.details}
                      </p>

                      {/* Close Button */}
                      <button
                        onClick={() => setOpenIndex(null)}
                        className="mt-4 text-xs text-brand-blue font-medium hover:underline"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 🔥 DLP FEATURE RATINGS */}
      <section className="relative py-28 bg-white overflow-hidden">

        <div className="max-w-6xl mx-auto px-6">

          <SectionHeader
            label="DLP Intelligence"
            title={
              <>
                Data Loss Prevention{" "}
                <span className="gradient-text">Feature Ratings</span>
              </>
            }
            description="Compare how leading DLP solutions perform across critical data protection capabilities."
            centered
          />

          {/* Tabs */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {dlpFeatures.map((f, i) => (
              <button
                key={i}
                onClick={() => setActiveDlpFeature(i)}
                className={`px-4 py-2 rounded-full text-sm transition ${activeDlpFeature === i
                    ? "bg-gradient-to-r from-[#045891] to-[#1B8AC7] text-white shadow"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {f.name}
              </button>
            ))}
          </div>

          {/* Card */}
          <div className="mt-16 max-w-3xl mx-auto rounded-2xl border border-border-light bg-gradient-to-r from-[#082c44] to-[#1c1c1d] p-8 shadow">

            <h3 className="text-lg font-semibold text-white">
              {dlpFeatures[activeDlpFeature].name}
            </h3>

            <p className="mt-2 text-sm text-white">
              {dlpFeatures[activeDlpFeature].desc}
            </p>

            <div className="my-6 h-px bg-gradient-to-r from-transparent via-border-light to-transparent" />

            {/* Ratings */}
            <div className="space-y-3">
              {Object.entries(dlpFeatures[activeDlpFeature].vendors).map(
                ([vendor, rating], i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl bg-blue-100 px-4 py-3"
                  >
                    <span className="text-sm text-black">{vendor}</span>

                    {/* ⭐ Stars + Bar */}
                    <div className="flex items-center gap-3">

                      {/* Stars */}
                      <div className="flex gap-[2px]">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-md ${star <= rating
                                ? "text-yellow-600 "
                                : "text-gray-300"
                              }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>

                      {/* Bar */}
                      <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#045891] to-[#1B8AC7]"
                          style={{ width: `${rating * 20}%` }}
                        />
                      </div>

                    </div>
                  </div>
                )
              )}
            </div>

            {/* Note */}
            <div className="mt-6 text-xs text-muted text-center">
              ⭐ Ratings reflect real-world performance, coverage, and enterprise usability.
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

      {/* 🚀 CTA */}
      <CTASection
        title="Protect Your Critical Data"
        description="Implement modern DLP strategies to prevent data leaks and ensure compliance."
        primaryButton={{ text: "Get Started", action: "modal" }}
      />
    </>
  );
}

export default DataLossdlp;