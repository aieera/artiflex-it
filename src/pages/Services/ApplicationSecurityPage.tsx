import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import StatsBar from "@/components/ui/StatsBar";
import ProcessFlow from "@/components/ui/ProcessFlow";
import { CTASection } from "@/pages/Home/sections/CTASection";
import {
  ShieldIcon,
  GlobeIcon,
  LockIcon,
  TargetIcon,
  MonitorIcon,
  CheckIcon,
  DatabaseIcon,
  ChevronDownIcon,
} from "@/components/icons";

/* ────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────── */

const threatStats = [
  { value: 85, suffix: "%", label: "Of Breaches Involve Web Apps" },
  { value: 43, suffix: "B", label: "BEC Losses (2016–2023)" },
  { value: 300, suffix: "%", label: "API Attack Growth (YoY)" },
  { value: 72, suffix: "hrs", label: "UAE PDPL Breach Deadline" },
];

const appThreats = [
  {
    stat: "OWASP Top 10",
    label: "Web Application Risks",
    description:
      "Injection, broken authentication, sensitive data exposure, XXE, broken access control, misconfigurations, XSS, deserialization, component vulnerabilities, and logging gaps account for over 85% of all web application vulnerabilities.",
  },
  {
    stat: "$43B",
    label: "Business Email Compromise",
    description:
      "Email remains the #1 attack vector for application-layer threats. BEC, phishing, and impersonation attacks cost global businesses $43 billion between 2016–2023, with UAE companies disproportionately targeted.",
  },
  {
    stat: "300%",
    label: "API Attack Surge",
    description:
      "API attacks grew 300% year-over-year as organizations expose more business logic through REST, GraphQL, and SOAP interfaces without adequate security testing or runtime protection.",
  },
  {
    stat: "PDPL",
    label: "Compliance Mandate",
    description:
      "UAE PDPL (Federal Decree No. 45/2021) mandates breach notification within 72 hours and requires DLP controls, encryption, and access governance for all applications processing personal data.",
  },
];

const coreServices = [
  {
    icon: TargetIcon,
    title: "Web Application Penetration Testing",
    subtitle: "OWASP Top 10 & Beyond",
    description:
      "Manual and automated testing against all OWASP Top 10 categories plus business logic flaws. We test authentication, session management, authorization, input validation, and cryptographic implementations.",
    features: [
      "OWASP Top 10 coverage (injection, XSS, CSRF, SSRF)",
      "Business logic and workflow testing",
      "Authentication & session management review",
      "API security testing (REST, GraphQL, SOAP)",
      "Remediation roadmap with re-testing verification",
    ],
  },
  {
    icon: GlobeIcon,
    title: "API Security Assessment",
    subtitle: "REST, GraphQL & SOAP",
    description:
      "APIs expose critical business logic and data. We test authentication, authorization, rate limiting, input validation, and data exposure across your entire API surface — including undocumented endpoints.",
    features: [
      "API discovery and attack surface mapping",
      "Authentication & token handling review",
      "BOLA/IDOR vulnerability testing",
      "Rate limiting and abuse testing",
      "Schema validation and data exposure analysis",
    ],
  },
  {
    icon: LockIcon,
    title: "Secure Code Review",
    subtitle: "Source Code Analysis",
    description:
      "Automated SAST scanning combined with manual expert review identifies vulnerabilities that scanners miss — hardcoded credentials, insecure cryptography, race conditions, and logic flaws embedded in your codebase.",
    features: [
      "Static Application Security Testing (SAST)",
      "Manual code review by security engineers",
      "Hardcoded secrets and credential detection",
      "Insecure cryptography identification",
      "CI/CD pipeline integration recommendations",
    ],
  },
  {
    icon: ShieldIcon,
    title: "Web Application Firewall (WAF)",
    subtitle: "Runtime Application Protection",
    description:
      "Deploy and manage WAF rules that block OWASP Top 10 attacks, bot traffic, and application-layer DDoS without impacting legitimate users. Continuous tuning eliminates false positives.",
    features: [
      "WAF deployment and rule configuration",
      "Bot management and rate limiting",
      "Application-layer DDoS protection",
      "Virtual patching for known CVEs",
      "Continuous rule tuning and false positive reduction",
    ],
  },
  {
    icon: MonitorIcon,
    title: "Dynamic Application Security Testing",
    subtitle: "DAST — Runtime Scanning",
    description:
      "Black-box scanning of running applications discovers vulnerabilities that only manifest at runtime — server misconfigurations, exposed admin panels, information leakage, and insecure HTTP headers.",
    features: [
      "Automated DAST scanning of live environments",
      "Server misconfiguration detection",
      "Information leakage and header analysis",
      "Authenticated and unauthenticated scanning",
      "Integration with development workflows",
    ],
  },
  {
    icon: DatabaseIcon,
    title: "Cloud Application Security",
    subtitle: "SaaS, PaaS & Serverless",
    description:
      "Secure your cloud-native applications across AWS, Azure, and GCP. We assess serverless functions, container security, IAM misconfigurations, and cloud storage exposure that traditional testing misses.",
    features: [
      "Serverless function security review",
      "Container and Kubernetes security assessment",
      "IAM misconfiguration detection",
      "Cloud storage and S3 bucket exposure",
      "Infrastructure-as-Code (IaC) security scanning",
    ],
  },
];

const methodologySteps = [
  {
    number: 1,
    title: "Discover",
    description:
      "Map your application attack surface — web apps, APIs, mobile backends, serverless functions, and third-party integrations. Identify what needs testing and prioritize by risk.",
  },
  {
    number: 2,
    title: "Assess",
    description:
      "Execute penetration testing, code review, and DAST scanning against prioritized targets. Combine automated tools with manual expert testing for maximum coverage.",
  },
  {
    number: 3,
    title: "Remediate",
    description:
      "Deliver prioritized findings with proof-of-concept exploits, severity ratings, and actionable remediation guidance. Work with your dev team to fix critical issues.",
  },
  {
    number: 4,
    title: "Verify",
    description:
      "Re-test all remediated vulnerabilities to confirm fixes. Provide a clean report for compliance audits and integrate ongoing testing into your SDLC.",
  },
];

const complianceMapping = [
  { framework: "NESA", requirement: "Application security controls across Critical Information Infrastructure" },
  { framework: "UAE PDPL", requirement: "Data protection, encryption, and breach notification for web applications" },
  { framework: "CBUAE", requirement: "Vulnerability management and application security for financial institutions" },
  { framework: "PCI-DSS v4", requirement: "Web application firewall and penetration testing for payment applications" },
  { framework: "ISO 27001", requirement: "Annex A.14 — System acquisition, development, and maintenance controls" },
  { framework: "OWASP ASVS", requirement: "Application Security Verification Standard for secure development" },
];

const faqs = [
  {
    question: "What is application security and why does my business need it?",
    answer:
      "Application security encompasses the processes, tools, and practices that protect your web applications, APIs, and mobile backends from cyber threats. With 85% of data breaches involving web applications, any business that operates customer-facing portals, e-commerce platforms, SaaS products, or internal web tools needs application security testing. For UAE businesses, UAE PDPL and NESA compliance also mandate application-level security controls.",
  },
  {
    question: "What is the difference between SAST, DAST, and penetration testing?",
    answer:
      "SAST (Static Application Security Testing) analyzes source code without running the application — finding hardcoded secrets, insecure patterns, and logic flaws. DAST (Dynamic Application Security Testing) scans running applications to find runtime vulnerabilities like misconfigurations and information leakage. Penetration testing combines automated tools with manual expert testing to simulate real-world attacks. Best practice is using all three: SAST in development, DAST in staging, and penetration testing before and after production deployment.",
  },
  {
    question: "How often should we test our web applications?",
    answer:
      "At minimum, annually for all production applications. For applications handling sensitive data (financial, healthcare, personal), quarterly testing is recommended. Under PCI-DSS v4, applications that process cardholder data must be tested after every significant change. We recommend integrating SAST into your CI/CD pipeline for continuous testing and conducting manual penetration tests quarterly.",
  },
  {
    question: "Do you test APIs as well as web applications?",
    answer:
      "Yes — API security testing is a core service. We test REST, GraphQL, and SOAP APIs for authentication bypass, BOLA/IDOR vulnerabilities, rate limiting gaps, excessive data exposure, and injection attacks. API attacks have grown 300% year-over-year, making API security essential for any organization exposing business logic through programmatic interfaces.",
  },
  {
    question: "Can you integrate security testing into our CI/CD pipeline?",
    answer:
      "Yes. We integrate SAST tools into your CI/CD pipeline (GitHub Actions, GitLab CI, Jenkins, Azure DevOps) so every code commit is scanned automatically. We also configure DAST scanning against staging environments before deployment. This shift-left approach catches vulnerabilities before they reach production, reducing remediation costs by up to 30x compared to finding issues post-deployment.",
  },
  {
    question: "What compliance frameworks require application security testing?",
    answer:
      "NESA mandates application security controls for UAE Critical Information Infrastructure. UAE PDPL requires data protection and breach notification for applications processing personal data. CBUAE mandates vulnerability management for financial institutions. PCI-DSS v4 requires WAF deployment and regular penetration testing for payment applications. ISO 27001 Annex A.14 covers secure system development. We map testing results to all applicable frameworks in a single report.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

/* ────────────────────────────────────────────
   FAQ ACCORDION
   ──────────────────────────────────────────── */

function FAQAccordion({ items }: { items: typeof faqs }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-white/[0.06]">
      {items.map((item, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-white"
            aria-expanded={openIndex === i}
          >
            <span className="font-display text-base font-semibold text-heading sm:text-lg">
              {item.question}
            </span>
            <ChevronDownIcon
              className={`h-5 w-5 shrink-0 text-brand-cyan transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""
                }`}
            />
          </button>
          <motion.div
            initial={false}
            animate={{
              height: openIndex === i ? "auto" : 0,
              opacity: openIndex === i ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-body">{item.answer}</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────
   PAGE COMPONENT
   ──────────────────────────────────────────── */

export default function ApplicationSecurityPage() {
  return (
    <>
      <Helmet>
        <title>Application Security Solutions UAE — VAPT, API Testing, WAF, Code Review | ArtiflexIT Dubai</title>
        <meta
          name="description"
          content="Protect your web applications and APIs with ArtiflexIT's application security services: penetration testing (OWASP Top 10), API security, secure code review, WAF management, and DAST scanning for UAE businesses."
        />
        <meta
          name="keywords"
          content="application security UAE, web application penetration testing Dubai, API security testing, OWASP Top 10, WAF management UAE, secure code review, SAST DAST, application security testing Middle East, VAPT web applications, PCI-DSS application testing"
        />
        <link rel="canonical" href="https://artiflexit.com/application-security-solutions" />
        <meta property="og:title" content="Application Security Solutions — Web App & API Protection | ArtiflexIT UAE" />
        <meta property="og:description" content="Web application penetration testing, API security, WAF management, and secure code review for UAE enterprises. OWASP Top 10 coverage with compliance mapping." />
        <meta property="og:url" content="https://artiflexit.com/application-security-solutions" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* HERO */}
      <PageHero
        title={
          <>
            Application Security That{" "}
            <span className="gradient-text">Stops Breaches at the Code</span>
          </>
        }
        description="85% of data breaches involve web applications. We test, protect, and harden your web apps, APIs, and cloud applications — from source code to production runtime — so attackers hit walls, not data."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Application Security", href: "/application-security-solutions" },
        ]}
      />

      {/* STATS */}
      <StatsBar stats={threatStats} />

      {/* THREAT LANDSCAPE */}
      <section className="relative py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Threat Landscape"
            title={
              <>
                Why {" "}
                <span className="gradient-text">Application Security </span> Cannot Wait
              </>
            }
            description="Web applications and APIs are the most exploited attack surface in every industry. These are the numbers driving urgency across the UAE."
            centered
          />
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 max-w-5xl mx-auto">
            {appThreats.map((threat) => (
              <div
                key={threat.label}
                className="group relative rounded-2xl border border-border-light bg-white p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[#045891]/20 hover:shadow-[0_8px_30px_rgba(4,88,145,0.08)] hover:-translate-y-0.5"
              >
                <div className="mb-3 sm:mb-4">
                  <span className="font-display text-2xl font-bold text-[#045891] sm:text-3xl">
                    {threat.stat}
                  </span>
                  <span className="ml-3 text-sm font-semibold uppercase tracking-widest text-[#045891]/60">
                    {threat.label}
                  </span>
                </div>
                <p className="text-sm text-body leading-relaxed">{threat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE SERVICES */}
      <section className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Core Services"
            title={
              <>
                Comprehensive{" "}
                <span className="gradient-text">Application Security</span>
              </>
            }
            description="Six specialized services that cover your entire application attack surface — from source code to live production environments."
            centered
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {coreServices.map((service) => (
              <Card key={service.title} variant="service" className="p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10">
                    <service.icon className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-heading">{service.title}</h3>
                    <p className="text-xs text-muted">{service.subtitle}</p>
                  </div>
                </div>
                <p className="text-sm text-body leading-relaxed mb-4">{service.description}</p>
                <ul className="mt-auto space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckIcon className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                      <span className="text-xs text-body">{f}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLIANCE MAPPING */}
      <section className="relative py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Compliance"
            title={
              <>
                <span className="gradient-text"> Application Security </span> & UAE Compliance
              </>
            }
            description="Every assessment maps findings to the regulatory frameworks that apply to your business — a single report for all auditors."
            centered
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {complianceMapping.map((item) => (
              <div
                key={item.framework}
                className="rounded-2xl border border-border-light bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[#045891]/20 hover:shadow-[0_8px_30px_rgba(4,88,145,0.08)] hover:-translate-y-0.5"
              >
                <h3 className="font-display text-lg font-bold text-[#045891] mb-2">{item.framework}</h3>
                <p className="text-sm text-body leading-relaxed">{item.requirement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Knowledge Base"
            title={
              <>
                Frequently <span className="gradient-text">Asked</span> Questions
              </>
            }
            description="Expert answers to common application security questions from UAE businesses."
            centered
          />
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Get Your Application Security Assessment"
        description="Request a free scoping call. We'll map your application attack surface, identify priority targets, and deliver a testing proposal within 48 hours — aligned to OWASP, NESA, and your compliance requirements."
        primaryButton={{ text: "Discuss Your Requirements", action: "modal" }}
      />
    </>
  );
}
