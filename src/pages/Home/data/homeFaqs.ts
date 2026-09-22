/**
 * Home page FAQ content, kept in its own module so BOTH the visible
 * accordion (HomeFAQSection) and the FAQPage JSON-LD (HomePage) read
 * from a single source and can never drift apart.
 *
 * Why it is not just an array inside HomeFAQSection:
 *   HomeFAQSection is lazy() + LazyMount gated, so it does not exist in
 *   the main chunk. The schema, however, must be emitted on every load
 *   from HomePage's always-rendered metadata block. Importing the
 *   section from HomePage just to reach the array would pull the whole
 *   section (and FAQAccordion) back into the initial bundle. This file
 *   is plain data, so the eager import costs ~1 KB.
 *
 * ORDER MATTERS: FAQAccordion renders only the ACTIVE item's answer in
 * the DOM, and item 0 is active on first paint. The first entry is
 * therefore the one crawlers read as visible body copy, so the
 * Dubai-qualified question is deliberately kept at the top.
 */
export interface HomeFAQItem {
  question: string;
  answer: string;
}

export const homeFaqItems: HomeFAQItem[] = [
  {
    question: "What makes Artiflex a leading IT solutions company in Dubai?",
    answer:
      "Artiflex Information Technology has operated as an IT solutions company in Dubai since 2012, delivering more than 500 projects across the UAE, Oman, Saudi Arabia and India. Unlike single-product resellers, we cover cybersecurity, cloud, IT infrastructure, business applications and managed IT support under one contract, and we hold senior vendor accreditations including Sophos Platinum Partner status. That combination means UAE businesses get local engineers who understand NESA, ICA and ADHICS requirements, plus a single point of accountability instead of four vendors blaming each other.",
  },
  {
    question: "Do you provide IT support for companies across Dubai and the UAE?",
    answer:
      "Yes. We provide on-site and remote IT support for companies in Dubai, Abu Dhabi, Sharjah and the wider UAE, backed by a 24/7 service desk and SLA-defined response times. Coverage includes proactive monitoring, patch management, user helpdesk, network and server administration, and annual maintenance contracts. Most clients in Dubai are reachable on-site the same working day when an issue cannot be resolved remotely.",
  },
  {
    question: "What cybersecurity services does Artiflex Information Technology offer?",
    answer:
      "We provide a comprehensive cybersecurity suite including Vulnerability Assessment and Penetration Testing (VAPT), 24/7 Security Operations Center monitoring, endpoint detection and response, next-generation firewall management, data loss prevention, email security, and compliance mapping for NESA, ISO 27001, and GDPR. Our approach layers multiple defenses so no single point of failure can compromise your business.",
  },
  {
    question: "How quickly can you respond to a security incident?",
    answer:
      "Our average incident response time is 12 minutes from initial alert to first action. Our SOC operates 24/7/365 with tiered escalation, L1 analysts handle immediate triage, L2 handles containment, and L3 specialists manage advanced threat hunting and forensics.",
  },
  {
    question: "Do you support small businesses or only enterprises?",
    answer:
      "We work with businesses of all sizes, from 10-person startups to organizations with 500+ employees. Our managed service packages are tiered so you pay only for what you need. Our Sophos Site-in-a-Box solution is specifically designed to bring enterprise-grade security to small and mid-sized businesses.",
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
