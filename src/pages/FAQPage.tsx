import { Helmet } from "react-helmet-async";
import PageHero from "@/components/sections/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { CTASection } from "@/components/sections/CTASection";

const cyberFAQs = [
  {
    question: "What is the best cybersecurity solution for SMEs in the UAE?",
    answer:
      "The most effective cybersecurity solution for SMEs in the UAE combines three core components: a next-generation firewall to protect your network perimeter, endpoint protection on every device, and 24/7 security monitoring to detect threats in real-time. Our Sophos Site-in-a-Box deployment delivers all three as a pre-configured, plug-and-play package — designed specifically for small and medium businesses that need enterprise-grade protection without enterprise-grade complexity or pricing. For most SMEs with 10-200 employees, this approach provides comprehensive protection starting from AED 3,500 per month.",
  },
  {
    question: "What is VAPT and why does my business need it?",
    answer:
      "VAPT stands for Vulnerability Assessment and Penetration Testing. A Vulnerability Assessment uses automated scanning tools to identify known security weaknesses across your network, applications, and systems — it tells you what's exposed. Penetration Testing goes further: our ethical hackers actively attempt to exploit those vulnerabilities using the same techniques real attackers use — it tells you what's actually exploitable and how far an attacker could get. Every business that processes sensitive data, handles financial transactions, or is subject to regulatory requirements (NESA, PCI-DSS, ISO 27001) should conduct VAPT at least twice per year and after any major infrastructure change.",
  },
  {
    question: "How quickly can you respond to a security incident?",
    answer:
      "Our average incident response time is 12 minutes from alert to first responder engagement. Our SOC operates 24/7 with a three-tier escalation model: L1 analysts handle initial triage and containment within minutes, L2 engineers handle investigation and remediation, and L3 specialists handle advanced forensics and root cause analysis. For managed clients, response SLAs are contractually guaranteed — 1-hour response for Enterprise tier, 4-hour for Professional tier. Every incident includes a root cause analysis report and a prevention plan to ensure it doesn't recur.",
  },
  {
    question: "What compliance standards do you help with?",
    answer:
      "We implement and maintain security controls aligned with: NESA (National Electronic Security Authority) for critical infrastructure and government-adjacent organizations, ICA (Information and Cyber Security Assurance) for federal entities, ADHICS (Abu Dhabi Healthcare Information and Cyber Security) for healthcare providers, CBUAE cybersecurity framework for financial institutions, ISO 27001 for international information security management, PCI-DSS for organizations handling payment card data, and GDPR for businesses serving European customers. Our approach maps each regulation's specific requirements to technical controls, implements those controls, and maintains audit-ready documentation.",
  },
  {
    question: "Do you offer ethical hacking services?",
    answer:
      "Yes. Our offensive security team provides comprehensive ethical hacking services including: external and internal network penetration testing, web application testing against OWASP Top 10 vulnerabilities (SQL injection, XSS, CSRF, broken authentication, etc.), social engineering campaigns (phishing, vishing, USB drops, pretexting), wireless penetration testing (rogue AP detection, WPA cracking, evil twin attacks), and full red team engagements that simulate multi-vector attacks over 2-4 weeks. Every engagement is conducted under a formal scope agreement, follows responsible disclosure practices, and produces a detailed report with prioritized remediation steps and fix verification.",
  },
  {
    question: "How does firewall management work?",
    answer:
      "Firewall management covers the complete lifecycle of your firewall infrastructure. Deployment: we size, configure, and install firewalls based on your traffic patterns, user count, and security requirements. Rule management: we create, review, and optimize firewall rules — removing stale rules, consolidating redundant policies, and ensuring rules follow least-privilege principles. Firmware: we test and deploy firmware updates on a regular schedule to patch known vulnerabilities. Traffic analysis: we monitor traffic patterns to detect anomalies, unauthorized applications, and potential threats. Monitoring: 24/7 log analysis through our SOC, with real-time alerting for blocked attacks, policy violations, and suspicious patterns.",
  },
];

const cloudFAQs = [
  {
    question: "How long does a cloud migration take?",
    answer:
      "Cloud migration timelines depend on the complexity and size of your environment. Simple migrations (5-10 servers, standard applications) typically take 4-6 weeks. Mid-size migrations (10-50 servers, custom applications, multiple dependencies) take 8-14 weeks. Enterprise migrations (50+ servers, legacy systems, complex integrations) take 3-6 months. Every migration follows our five-phase methodology: Audit, Plan, Migrate, Optimize, Manage. We guarantee zero unplanned downtime during migration by using phased cutover approaches and maintaining rollback capability at every stage.",
  },
  {
    question: "Do you support multi-cloud environments?",
    answer:
      "Yes. We manage environments across AWS, Microsoft Azure, and Google Cloud Platform — including hybrid configurations with on-premise infrastructure. Our approach uses a single management layer that provides unified visibility, consistent security policies, and consolidated cost reporting across all cloud providers. This prevents vendor lock-in while letting you leverage each platform's strengths (e.g., AWS for compute-intensive workloads, Azure for Microsoft ecosystem integration, GCP for data analytics).",
  },
  {
    question: "What is the difference between IaaS, PaaS, and SaaS?",
    answer:
      "IaaS (Infrastructure as a Service) gives you virtual hardware — servers, storage, and networking — on demand. You manage everything from the operating system up. Best for workloads needing custom configurations or running legacy applications. Examples: AWS EC2, Azure Virtual Machines. PaaS (Platform as a Service) gives you a managed platform for building and deploying applications. The provider handles OS, patches, scaling, and databases. Your developers focus on code. Best for custom application development. Examples: Azure App Service, AWS Elastic Beanstalk. SaaS (Software as a Service) gives you complete applications delivered over the internet. No installation or management needed. Best for standard business functions. Examples: Microsoft 365, Salesforce, Google Workspace.",
  },
  {
    question: "Can you upgrade our existing network without downtime?",
    answer:
      "Yes. We use a phased migration approach that maintains service continuity throughout the upgrade. The process works by building redundant network paths before decommissioning old equipment: install new core switches alongside existing ones, migrate traffic in segments during low-usage windows, validate performance at each phase, and remove old equipment only after the new infrastructure is fully verified. Our track record across 200+ network upgrade projects is 99.97% uptime maintained during migration.",
  },
];

const managedFAQs = [
  {
    question: "Do you support small businesses or only enterprises?",
    answer:
      "We serve businesses ranging from 10-person startups to 500+ employee enterprises. Our service is structured in three tiers: Essential (for small teams, from AED 3,500/month), Professional (for growing businesses, from AED 8,500/month), and Enterprise (custom scoping for larger organizations). The methodology is the same regardless of size — the difference is scope and scale. A 30-person company gets the same security monitoring approach as a 300-person company, sized to fit their environment and budget.",
  },
  {
    question: "How does your managed IT service reduce costs?",
    answer:
      "Our managed clients see an average 60% reduction in IT operational costs. The savings come from multiple sources: no recruitment costs (hiring a qualified engineer in the UAE costs AED 15,000-25,000 in recruitment fees alone), no overtime or shift premiums for after-hours coverage, bulk licensing through our vendor partnerships (typically 20-30% below retail), proactive maintenance that prevents expensive emergency repairs, and consolidated tooling that eliminates redundant software subscriptions. For a typical 50-person company, the total cost of in-house IT operations (2-3 engineers, tools, licensing) runs AED 800,000-1,200,000 annually. Our managed service delivers equivalent or better coverage for a fraction of that.",
  },
  {
    question: "What is included in an Annual Maintenance Contract?",
    answer:
      "Our AMC includes: preventive maintenance visits (monthly for critical systems, quarterly for standard equipment), hardware health monitoring with proactive component replacement, operating system and firmware patching on tested schedules, configuration backup and disaster recovery testing, priority support with guaranteed response times, quarterly health reports with trending analysis and recommendations, and vendor coordination for warranty claims and hardware replacements. AMC pricing is based on the number and type of devices covered. All pricing is fixed and predictable — no surprise charges for standard support activities.",
  },
  {
    question: "Can I keep my in-house IT team and still use your services?",
    answer:
      "Absolutely. Our co-managed model is designed for organizations that want to retain in-house IT staff for strategic and day-to-day operations while supplementing with specialized capabilities they don't have internally. Common co-managed scenarios include: your team handles help desk and user support while we manage security operations, your team manages cloud infrastructure while we handle network and on-premise systems, or your team runs daily operations while we provide 24/7 monitoring and incident response. We integrate with your existing ticketing systems, communication channels, and escalation procedures — so it feels like one team, not two.",
  },
];

const allFAQs = [...cyberFAQs, ...cloudFAQs, ...managedFAQs];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFAQs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <Helmet>
        <title>FAQ — Cybersecurity, Cloud, IT Services Questions | ArtiflexIT</title>
        <meta name="description" content="Answers to common questions about cybersecurity, VAPT, firewall management, cloud migration, and managed IT services for UAE businesses." />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <PageHero
        title="Frequently Asked Questions"
        description="Direct answers to the questions we hear most from UAE businesses about cybersecurity, cloud migration, IT infrastructure, and managed services."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "FAQ", href: "/faq" },
        ]}
        background="gradient-blinds"
      />

      {/* Cybersecurity FAQs */}
      <section className="relative py-16 bg-navy-deep sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <SectionHeader
            label="Cybersecurity"
            title="Security Questions"
          />
          <FAQAccordion items={cyberFAQs} />
        </div>
      </section>

      {/* Cloud & Infrastructure FAQs */}
      <section className="relative py-16 bg-navy sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <SectionHeader
            label="Cloud & Infrastructure"
            title="Cloud & Infrastructure Questions"
          />
          <FAQAccordion items={cloudFAQs} />
        </div>
      </section>

      {/* Managed Services FAQs */}
      <section className="relative py-16 bg-navy-deep sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <SectionHeader
            label="Managed Services"
            title="Managed IT Questions"
          />
          <FAQAccordion items={managedFAQs} />
        </div>
      </section>

      <CTASection
        title="Still Have Questions?"
        description="Our team is available for a no-obligation conversation about your specific situation. We'll give you a straight answer — not a sales pitch."
        primaryButton={{ text: "Ask Our Team", action: "modal" }}
        secondaryButton={{ text: "View Our Services", href: "/services" }}
      />
    </>
  );
}
