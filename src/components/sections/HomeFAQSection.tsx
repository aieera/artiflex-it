import SectionHeader from "@/components/ui/SectionHeader";
import FAQAccordion from "@/components/ui/FAQAccordion";

const faqItems = [
  {
    question: "What cybersecurity services does ArtiflexIT offer?",
    answer:
      "We provide a comprehensive cybersecurity suite including Vulnerability Assessment and Penetration Testing (VAPT), 24/7 Security Operations Center monitoring, endpoint detection and response, next-generation firewall management, data loss prevention, email security, and compliance mapping for NESA, ISO 27001, and GDPR. Our approach layers multiple defenses so no single point of failure can compromise your business.",
  },
  {
    question: "How quickly can you respond to a security incident?",
    answer:
      "Our average incident response time is 12 minutes from initial alert to first action. Our SOC operates 24/7/365 with tiered escalation — L1 analysts handle immediate triage, L2 handles containment, and L3 specialists manage advanced threat hunting and forensics.",
  },
  {
    question: "Do you support small businesses or only enterprises?",
    answer:
      "We work with businesses of all sizes — from 10-person startups to organizations with 500+ employees. Our managed service packages are tiered so you pay only for what you need. Our Sophos Site-in-a-Box solution is specifically designed to bring enterprise-grade security to small and mid-sized businesses.",
  },
  {
    question: "What is VAPT and why does my business need it?",
    answer:
      "VAPT stands for Vulnerability Assessment and Penetration Testing. It scans your systems for known weaknesses and then simulates real-world attacks to test if those weaknesses can be exploited. Every business handling sensitive data should conduct VAPT at least twice a year to stay ahead of emerging threats.",
  },
  {
    question: "How does your managed IT service reduce costs?",
    answer:
      "Managed IT replaces unpredictable break-fix expenses with a fixed monthly fee. Our clients see an average 60% reduction in total IT spending by eliminating recruitment costs, overtime, and emergency repairs while gaining proactive maintenance and optimized infrastructure.",
  },
];

export function HomeFAQSection() {
  return (
    <section className="bg-white py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          label="FAQ"
          title="Frequently Asked Questions"
          description="Quick answers to the questions we hear most from businesses across the UAE."
          centered
        />

        <div className="mt-12">
          <FAQAccordion items={faqItems} />
        </div>
      </div>
    </section>
  );
}
