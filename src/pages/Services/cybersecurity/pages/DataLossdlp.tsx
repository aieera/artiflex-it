import React from "react";
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

function DataLossdlp() {
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
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <SectionHeader
            label="Protection Layers"
            title={
              <>
                Multi-Layer <span className="gradient-text">DLP Approach</span>
              </>
            }
            centered
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mt-16">

            {[
              {
                title: "Endpoint DLP",
                desc: "Controls USB, clipboard, print, and screenshots.",
              },
              {
                title: "Email DLP",
                desc: "Scans outgoing emails and attachments.",
              },
              {
                title: "Network DLP",
                desc: "Monitors uploads, transfers, and traffic.",
              },
              {
                title: "Cloud DLP",
                desc: "Protects SaaS apps like M365 and Google Drive.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group p-[1px] rounded-2xl bg-gradient-to-br from-[#1B8AC7]/40 to-[#045891]/40"
              >
                <div className="rounded-2xl border border-gray-200 p-6 h-full bg-white transition group-hover:shadow-lg">
                  <h3 className="font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ⚖️ COMPARISON (Clean Split UI) */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">

          <SectionHeader
            label="Comparison"
            title={
              <>
                Traditional vs{" "}
                <span className="gradient-text">Modern DLP</span>
              </>
            }
            centered
          />

          <div className="grid md:grid-cols-2 gap-8 mt-16">

            <div className="p-8 rounded-2xl border bg-white">
              <h3 className="font-semibold text-lg">
                Traditional DLP
              </h3>
              <p className="text-sm text-gray-600 mt-3">
                On-premise, complex, limited visibility into cloud and remote users.
              </p>
            </div>

            <div className="p-8 rounded-2xl border bg-white shadow-md">
              <h3 className="font-semibold text-lg text-[#1B8AC7]">
                Cloud-Native DLP
              </h3>
              <p className="text-sm text-gray-600 mt-3">
                Scales across SaaS, remote work, and modern cloud environments.
              </p>
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