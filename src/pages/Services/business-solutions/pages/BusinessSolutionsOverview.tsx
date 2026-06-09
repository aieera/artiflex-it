import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import {
  ChevronDownIcon,
  ServerIcon,
  BarChartIcon,
  ClockIcon,
  UsersIcon,
  ArrowRightIcon,
} from "@/components/icons";

/* ────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────── */

const businessImpact = [
  {
    area: "Financial Cost",
    detail:
      "A typical UAE enterprise spends 18 to 25 percent more across 5 to 7 disconnected SaaS tools versus a unified platform. Reconciliation labour permanently consumes finance team capacity.",
  },
  {
    area: "Operational Disruption",
    detail:
      "Month-end close stretches to two or three weeks. Data discrepancies between CRM and finance erode internal trust, and manual journal entries multiply with every quarter.",
  },
  {
    area: "Compliance Risk",
    detail:
      "UAE FTA e-invoicing, UAE PDPL, IFRS reporting and audit-trail gaps cause regulator findings and forced rework cycles, particularly during external audit windows.",
  },
  {
    area: "Customer Experience",
    detail:
      "Sales sees one customer record, support sees another, finance sees a third. The customer experiences the seam at every touchpoint, every renewal, every dispute.",
  },
  {
    area: "Strategic Decisions Slow Down",
    detail:
      "Leadership waits two weeks for board decks pulled from spreadsheets. Competitors with real-time dashboards out-decide them on pricing, hiring, and capital allocation.",
  },
  {
    area: "Hidden Talent Cost",
    detail:
      "Senior staff spend 30 to 40 percent of their week reconciling tools that should already integrate. New hires take six months to learn the seams between systems.",
  },
];

const pillars = [
  {
    number: "01",
    icon: ServerIcon,
    title: "ERP Software",
    category: "OPERATIONS BACKBONE",
    href: "/business-solutions/erp-software",
    description:
      "Financials, inventory, procurement, manufacturing and supply chain on a single ledger. The operational backbone and the single source of truth for every transaction across the business.",
  },
  {
    number: "02",
    icon: UsersIcon,
    title: "CRM & Sales Management Software",
    category: "REVENUE ENGINE",
    href: "/business-solutions/crm-software",
    description:
      "Leads, opportunities, pipeline, quotas, forecasting, commissions and customer service on one record. Sales process and CRM data unified, with quote-to-cash flowing straight into ERP.",
  },
  {
    number: "03",
    icon: BarChartIcon,
    title: "Finance & Accounting Software",
    category: "FINANCE & COMPLIANCE",
    href: "/business-solutions/finance-accounting-software",
    description:
      "GL, AP, AR, invoicing, expenses, multi-currency and multi-entity consolidation. IFRS-compliant reporting and UAE FTA e-invoicing built in, not bolted on at the end of every release.",
  },
  {
    number: "04",
    icon: ClockIcon,
    title: "HRM Software",
    category: "PEOPLE & PAYROLL",
    href: "/business-solutions/hr-management-software",
    description:
      "Employees, payroll, leave, attendance, onboarding, performance and recruitment. MoHRE and WPS-compliant from day one, with SIF generation, Hijri-Gregorian calendar and Arabic UI.",
  },
];

const complianceFrameworks = [
  {
    name: "UAE FTA e-Invoicing",
    fullName: "Federal Tax Authority phased e-invoicing mandate",
    description:
      "The 2025 to 2026 phased rollout requires every VAT-registered UAE business to issue and report structured e-invoices through approved channels. Business platforms must produce, sign and transmit XML invoices natively.",
    scope: "All VAT-registered businesses",
  },
  {
    name: "UAE PDPL",
    fullName: "Personal Data Protection Law (Federal Decree No. 45/2021)",
    description:
      "Requires data minimisation, consent capture, breach notification within 72 hours, and DPO appointment for relevant processors. Business platforms must support consent workflows and PII access controls.",
    scope: "All Organizations (In Force)",
  },
  {
    name: "IFRS",
    fullName: "International Financial Reporting Standards",
    description:
      "Applies to all UAE statutory reporting. Modern ERP and Finance platforms must produce IFRS-compliant ledgers, multi-entity consolidations, lease accounting and revenue recognition out of the box.",
    scope: "Statutory Reporting Mandatory",
  },
  {
    name: "MoHRE & WPS",
    fullName: "Wages Protection System and labour-law compliance",
    description:
      "Every UAE employer must run payroll through the Wages Protection System. HRM platforms must export WPS-compliant SIF files, maintain MoHRE-aligned employee records, and handle Emiratisation reporting.",
    scope: "Employers Mandatory",
  },
  {
    name: "ADGM / DIFC",
    fullName: "Free Zone Financial Reporting Requirements",
    description:
      "Abu Dhabi Global Market and Dubai International Financial Centre have separate financial reporting, beneficial-ownership and AML regimes. Finance platforms must support multi-jurisdiction consolidation and zone-specific reporting templates.",
    scope: "Free Zone Entities",
  },
  {
    name: "ISO 27001 / 9001",
    fullName: "Information Security & Quality Management Systems",
    description:
      "Increasingly required by UAE government tenders and large enterprise procurement. Business platforms must support audit logs, access controls and change-management evidence aligned to both standards.",
    scope: "Government Tenders / Best Practice",
  },
];

const faqs = [
  {
    question: "What is an all-in-one business platform, and why does it matter for UAE businesses?",
    answer:
      "An all-in-one business platform is a single software deployment where ERP, CRM, Finance and HRM share one database, one customer record, one chart of accounts and one employee directory. For UAE businesses, the value shows up in three places: month-end close drops from two weeks to two days, FTA e-invoicing flows automatically from sales orders, and audit trails span the full quote-to-cash lifecycle without manual reconciliation. The test of a real unified platform is whether a customer, employee or order exists once across the entire system, not whether modules are packaged together in marketing.",
  },
  {
    question: "SAP, Oracle, or Microsoft Dynamics 365 for a UAE mid-market business?",
    answer:
      "SAP S/4HANA and Oracle Fusion lead at the multi-entity enterprise tier (500+ users, 3+ legal entities, deep manufacturing). Microsoft Dynamics 365 Business Central wins for Microsoft-aligned mid-market (50 to 500 users) where Power Platform extension and Office 365 integration are decisive. For UAE mid-market with deep local customisation needs (Arabic UI, FTA e-invoicing, MoHRE workflows), Focus Softnet and Odoo are particularly competitive on on-prem TCO and time-to-value. The right answer follows scale, customisation appetite, and existing licensing more than vendor brand.",
  },
  {
    question: "Cloud or on-premises for ERP in the UAE in 2026?",
    answer:
      "Cloud wins year-one cash flow and time-to-deploy. On-premises wins seven-to-ten-year TCO, data residency and customisation depth. Cumulative SaaS subscription costs typically reach 2.5x to 3.5x the equivalent on-premise commitment by year seven for the same user count. For UAE mid-market and enterprise with meaningful customisation, regulated data, or existing IT capacity, on-prem is usually the lower-cost answer over the full lifecycle. Public SaaS is the right answer for genuinely small operations (under 25 users) with off-the-shelf processes.",
  },
  {
    question: "What is UAE FTA e-invoicing and how do business platforms support it?",
    answer:
      "The UAE Federal Tax Authority has launched a phased e-invoicing mandate requiring all VAT-registered businesses to issue and report structured e-invoices through approved channels. Compliant business platforms must produce XML invoices with the FTA-required schema, sign them with the appropriate certificate, transmit them through accredited service providers, and store them with full audit trails. Most modern UAE-deployed ERPs (SAP, Oracle, Microsoft Dynamics 365, Sage X3, Focus Softnet) have native FTA e-invoicing modules; verify the certification status before committing.",
  },
  {
    question: "How long does a UAE ERP implementation take?",
    answer:
      "Typical timelines: 3 to 6 months for a 25 to 100 user SMB with light customisation, 6 to 12 months for a 100 to 300 user mid-market with moderate customisation, and 12 to 24 months for a 300+ user multi-entity enterprise with deep customisation. Data migration complexity and integration count are the biggest timeline drivers, not user count. Most UAE failures come from under-budgeted customisation and document automation scope rather than infrastructure or vendor choice.",
  },
  {
    question: "What is the difference between CRM and Sales Management software?",
    answer:
      "CRM is the data layer: accounts, contacts, leads, opportunities, activity history, customer service tickets. Sales management is the process layer on top: pipeline stages, quota assignment, territory management, forecasting, commission calculation, and field-sales enablement. Modern platforms (Salesforce, Microsoft Dynamics 365 Sales, Zoho, Odoo, Focus Softnet) combine both into one product, which is why our Business Solutions suite treats CRM and Sales Management as a single module.",
  },
  {
    question: "What WPS and MoHRE requirements must HRM software satisfy?",
    answer:
      "Every UAE employer must process payroll through the Wages Protection System (WPS), which means exporting a Salary Information File (SIF) in the prescribed format and transmitting it through an approved bank or exchange house. HRM platforms must also maintain MoHRE-aligned employee records (Emirates ID, visa expiry, labour-card details), generate UAE-compliant payslips, handle gratuity calculations under UAE Labour Law, and support Emiratisation reporting. Modern HRM platforms (SAP SuccessFactors, Oracle HCM, Microsoft Dynamics 365 HR, Bayzat, Focus Softnet) deliver this natively; verify SIF certification before signing.",
  },
  {
    question: "Can we start with one module and add others later?",
    answer:
      "Yes, this is the recommended approach for almost every UAE deployment. Most customers start with either ERP (for operational consolidation) or Finance (for compliance and reporting), run it for three to six months, then layer CRM, Sales Management and HRM on the same underlying platform without re-implementing the base. A unified platform makes phased adoption practical because each new module joins the same customer, employee, and ledger record, rather than starting from a new data island.",
  },
];

/* ────────────────────────────────────────────
   JSON-LD STRUCTURED DATA (SEO + AEO)
   ──────────────────────────────────────────── */

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Business Solutions UAE | ERP, CRM & Sales, Finance, HRM | Artiflex IT",
  description:
    "Integrated business software for UAE: ERP, CRM & Sales Management, Finance & Accounting, and HRM on one platform, cloud or on-premises. UAE FTA, IFRS, PDPL and WPS ready.",
  author: { "@type": "Organization", name: "ArtiflexIT", url: "https://artiflexit.com" },
  publisher: { "@type": "Organization", name: "ArtiflexIT", url: "https://artiflexit.com" },
  datePublished: "2026-01-15",
  dateModified: "2026-05-18",
  mainEntityOfPage: "https://artiflexit.com/business-solutions",
  keywords:
    "business solutions UAE, ERP software Dubai, CRM software UAE, finance accounting software UAE, HRM software UAE, FTA e-invoicing, IFRS reporting UAE, WPS payroll, MoHRE compliance, SAP UAE, Oracle Fusion UAE, Microsoft Dynamics 365 UAE, Focus Softnet, Odoo UAE",
};

/* ────────────────────────────────────────────
   FAQ ACCORDION COMPONENT
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
              className={`h-5 w-5 shrink-0 text-[#045891] transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""
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
            <p className="pb-5 text-sm leading-relaxed text-body">
              {item.answer}
            </p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────
   SIX FORCES: accordion data
   ──────────────────────────────────────────── */

const landscapeForces = [
  {
    title: "Best-of-Breed Sprawl",
    description:
      "The average UAE enterprise now runs 250+ SaaS apps. Most do not talk to each other. Finance and operations live in separate worlds, and the customer record exists three times.",
    tag: "Sprawl",
  },
  {
    title: "UAE FTA e-Invoicing & PDPL",
    description:
      "FTA e-invoicing (phased rollout), UAE PDPL, IFRS reporting and sector-specific frameworks force every business platform to evolve fast, with the regulator setting the release cadence.",
    tag: "Compliance",
  },
  {
    title: "The Cloud vs On-Prem Decision",
    description:
      "Cloud is faster to deploy, but on-prem still wins TCO and data residency over a 7 to 10 year horizon for most UAE mid-market and enterprise estates with meaningful customisation.",
    tag: "Deployment",
  },
  {
    title: "AI in Every Module",
    description:
      "Forecasting, document capture, expense parsing, candidate screening and customer-service triage are now AI-default. Legacy systems cannot keep up without expensive bolt-ons.",
    tag: "AI",
  },
  {
    title: "Custom Glue Code Decays",
    description:
      "Bespoke integration code between ERP, CRM, payroll, and BI tools breaks at every vendor upgrade and quietly consumes a permanent slice of internal IT capacity.",
    tag: "Integration",
  },
  {
    title: "UAE Talent & Localisation",
    description:
      "Arabic UI, RTL reporting, Hijri-Gregorian calendar, UAE labour-law fluency, and FTA-certified consultants separate truly local platforms from imported ones. Talent for both is scarce.",
    tag: "Talent",
  },
];

/* ────────────────────────────────────────────
   FORCE ACCORDION GRID: hover to expand
   ──────────────────────────────────────────── */

function ForceAccordion() {
  return (
    <motion.div
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
      }}
      className="mt-12 grid grid-cols-1 items-start gap-3 sm:mt-14 sm:gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      {landscapeForces.map((force) => (
        <ForceCard
          key={force.title}
          tag={force.tag}
          title={force.title}
          description={force.description}
        />
      ))}
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   FORCE CARD: expand on hover (tap on touch)
   ──────────────────────────────────────────── */

function ForceCard({
  tag,
  title,
  description,
}: {
  tag: string;
  title: string;
  description: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 14 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
      }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((o) => !o)}
      tabIndex={0}
      aria-expanded={isOpen}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-md border border-slate-200/80 bg-gradient-to-br from-white via-white to-slate-50/60 shadow-[0_1px_2px_rgba(15,23,42,0.04)] outline-none transition-all duration-500 hover:-translate-y-0.5 hover:border-[#1B8AC7]/45 hover:shadow-[0_18px_40px_-12px_rgba(27,138,199,0.30)] focus-visible:border-[#1B8AC7]/60 focus-visible:ring-2 focus-visible:ring-[#28B5E1]/40"
    >
      <div className="relative z-[2] flex w-full items-start justify-between gap-3 p-5 sm:p-6">
        <div className="min-w-0 flex-1">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.25em] text-[#1B8AC7]">
            {tag}
          </span>
          <h3 className="mt-3 font-display text-base font-bold leading-snug text-[#0a1d3a] sm:text-[17px] md:text-lg">
            {title}
          </h3>
        </div>

        <span
          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isOpen
            ? "rotate-45 border-[#1B8AC7] bg-[#1B8AC7] text-white"
            : "border-slate-300 text-slate-500 group-hover:border-[#1B8AC7] group-hover:text-[#1B8AC7]"
            }`}
          aria-hidden="true"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-[2] overflow-hidden"
          >
            <div className="px-5 pb-5 sm:px-6 sm:pb-6">
              <div className="border-t border-slate-200 pt-4">
                <p className="text-sm leading-relaxed text-slate-600">{description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-[#1B8AC7] via-[#28B5E1] to-transparent transition-all duration-700 ease-out group-hover:w-full"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#28B5E1]/30 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />
    </motion.article>
  );
}

/* ────────────────────────────────────────────
   PAGE COMPONENT
   ──────────────────────────────────────────── */

export default function BusinessSolutionsOverview() {
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Business Solutions UAE | ERP, CRM & Sales, Finance, HRM | Artiflex IT</title>
        <meta
          name="description"
          content="Integrated business software for UAE: ERP, CRM & Sales Management, Finance & Accounting, and HRM on one platform, cloud or on-premises. UAE FTA, IFRS, PDPL and WPS ready."
        />
        <meta
          name="keywords"
          content="business solutions UAE, ERP software Dubai, CRM software UAE, finance accounting software UAE, HRM software UAE, FTA e-invoicing, IFRS reporting UAE, WPS payroll, MoHRE compliance, SAP UAE, Oracle Fusion UAE, Microsoft Dynamics 365 UAE, Focus Softnet, Odoo UAE"
        />
        <link rel="canonical" href="https://artiflexit.com/business-solutions" />
        <meta property="og:title" content="Business Solutions UAE | Integrated ERP, CRM, Finance, HRM | Artiflex IT" />
        <meta
          property="og:description"
          content="Integrated business software for UAE businesses. ERP, CRM & Sales, Finance, HRM on one unified platform, cloud or on-premises, FTA and IFRS ready."
        />
        <meta property="og:url" content="https://artiflexit.com/business-solutions" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </>

      {/* ═══════════════════════════════════════
          HERO: BUSINESS SOLUTIONS
          ═══════════════════════════════════════ */}
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-navy-deep via-navy to-navy-light">
        {/* Background image */}
        <div className="absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
          <img
            src="/business-solutions.jpg"
            alt=""
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover object-center opacity-55 [mask-image:radial-gradient(120%_90%_at_60%_45%,black_55%,transparent_100%)]"
          />
        </div>

        {/* Readability tint */}
        <div
          className="absolute inset-0 z-[3] bg-gradient-to-r from-navy-deep/90 via-navy-deep/65 to-navy-deep/25 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 z-[3] bg-gradient-to-b from-navy-deep/55 via-transparent to-navy-deep/80 pointer-events-none"
          aria-hidden="true"
        />

        <div className="shell relative z-10 flex w-full flex-1 flex-col pt-20 pb-6 sm:pt-24 sm:pb-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-3 sm:mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 sm:text-xs">
              <li>
                <Link to="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li className="text-slate-600">/</li>
              <li>
                <span className="font-medium text-[#28B5E1]">Business Solutions</span>
              </li>
            </ol>
          </nav>

          <div className="grid flex-1 grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col justify-center py-4"
            >
              <p className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-8xl">
                Business Solutions
              </p>

              <div className="mt-6 sm:mt-8 lg:mt-8 xl:mt-10">
                <h1 className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight text-white sm:mt-3 sm:text-2xl md:text-3xl lg:text-[1.6rem] xl:text-4xl">
                  <span className="gradient-text">Integrated Business Software for the UAE & Middle East</span>
                </h1>

                <p className="mt-3 max-w-xl text-xs leading-relaxed text-slate-300 sm:mt-4 sm:text-sm md:text-base lg:text-sm xl:text-base">
                  ERP, CRM & Sales Management, Finance & Accounting, and HRM on a single platform, cloud or on-premises. Built around UAE FTA e-invoicing, IFRS reporting, MoHRE and WPS, with deep local customisation.
                </p>

                <div className="mt-5 flex flex-col items-stretch gap-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 lg:gap-3 xl:gap-4">
                  <button
                    onClick={openContact}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-6 sm:py-3 lg:text-sm xl:px-7 xl:py-3.5 xl:text-base"
                  >
                    Get a Free Business Solutions Assessment
                    <ArrowRightIcon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  <Link
                    to="/blog/origin-public-cloud"
                    className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 hover:text-[#28B5E1] sm:px-6 sm:py-3 lg:text-sm xl:px-7 xl:py-3.5 xl:text-base"
                  >
                    Read the Origin Story
                    <ArrowRightIcon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>

            <div className="px-2 sm:px-4">
              {(() => {
                const topics = [
                  {
                    label: "ERP Software",
                    icon: ServerIcon,
                    originHref: "/blog/origin-public-cloud",
                    portfolioHref: "/business-solutions/erp-software",
                  },
                  {
                    label: "CRM & Sales Management",
                    icon: UsersIcon,
                    originHref: "/blog/origin-multi-cloud-strategy",
                    portfolioHref: "/business-solutions/crm-software",
                  },
                  {
                    label: "Finance & Accounting",
                    icon: BarChartIcon,
                    originHref: "/blog/origin-hybrid-cloud",
                    portfolioHref: "/business-solutions/finance-accounting-software",
                  },
                  {
                    label: "HRM Software",
                    icon: ClockIcon,
                    originHref: "/blog/origin-private-cloud",
                    portfolioHref: "/business-solutions/hr-management-software",
                  },
                ];

                const tileCls =
                  "group relative flex min-h-[42px] min-w-0 items-center gap-1.5 overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.035] px-1.5 py-1.5 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/55 hover:bg-gradient-to-br hover:from-[#045891]/40 hover:to-[#1B8AC7]/20 hover:shadow-[0_10px_24px_-8px_rgba(40,181,225,0.5)] sm:gap-2 sm:px-2";

                const renderGrid = (variant: "origin" | "portfolio") => (
                  <div className="mt-2.5 grid grid-cols-2 gap-1.5 sm:gap-2">
                    {topics.map((t) => {
                      const Icon = t.icon;
                      const href =
                        variant === "origin" ? t.originHref : t.portfolioHref;
                      return (
                        <Link
                          key={`${variant}-${t.label}`}
                          to={href}
                          className={tileCls}
                        >
                          <span
                            aria-hidden
                            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#28B5E1]/10 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100"
                          />
                          <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-[#28B5E1]/25 to-[#1B8AC7]/10 text-[#4FC3F7] transition-all group-hover:from-[#28B5E1]/55 group-hover:to-[#1B8AC7]/35 group-hover:text-white">
                            <Icon className="h-3 w-3" />
                          </span>
                          <span className="relative min-w-0 flex-1 whitespace-normal break-words text-[10px] font-semibold leading-tight text-white/90 group-hover:text-white sm:text-[10.5px]">
                            {t.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                );

                const cardCls =
                  "relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent p-3 backdrop-blur-md shadow-[0_20px_60px_-30px_rgba(40,181,225,0.4)] sm:p-3.5";

                return (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5">
                    {/* Portfolios card */}
                    <div className={cardCls}>
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -top-16 -left-12 h-40 w-40 rounded-full bg-[#1B8AC7]/[0.1] blur-3xl"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/40 to-transparent"
                      />
                      <div className="relative">
                        <div className="flex items-center gap-2">
                          <span
                            aria-hidden
                            className="h-1 w-6 rounded-full bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1]"
                          />
                          <h3 className="font-display text-sm font-bold text-white sm:text-base">
                            Portfolios
                            <span className="text-[#28B5E1]">.</span>
                          </h3>
                        </div>
                        <p className="mt-1 text-[10.5px] leading-relaxed text-slate-300/80">
                          Explore the module that fits your business.
                        </p>
                        {renderGrid("portfolio")}
                      </div>
                    </div>

                    {/* Origin Story card */}
                    <div className={cardCls}>
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -top-16 -right-12 h-40 w-40 rounded-full bg-[#28B5E1]/[0.09] blur-3xl"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/40 to-transparent"
                      />
                      <div className="relative">
                        <div className="flex items-center gap-2">
                          <span
                            aria-hidden
                            className="h-1 w-6 rounded-full bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1]"
                          />
                          <h3 className="font-display text-sm font-bold text-white sm:text-base">
                            The Origin Story
                            <span className="text-[#28B5E1]">.</span>
                          </h3>
                        </div>
                        <p className="mt-1 text-[10.5px] leading-relaxed text-slate-300/80">
                          Read the story behind each business platform.
                        </p>
                        {renderGrid("origin")}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHY ARTIFLEX
          ═══════════════════════════════════════ */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-12%" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
            }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-12"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#045891]/15 bg-[#045891]/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[#045891]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#28B5E1]" />
                Our Approach
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-heading sm:text-4xl md:text-[2.75rem]">
                Why Artiflex for{" "}
                <span className="gradient-text">your Business Solutions?</span>
              </h2>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.1 } },
              }}
              className="lg:col-span-7"
            >
              <div className="relative border-l-2 border-[#28B5E1]/40 pl-6 sm:pl-8">
                <p className="text-base leading-relaxed text-body sm:text-lg">
                  <span className="font-semibold text-heading">Artiflex IT</span> has been deploying and operating ERP, CRM, Finance and HRM platforms across UAE businesses for close to{" "}
                  <span className="font-semibold text-[#045891]">fifteen years</span>. The conversation has shifted from picking a tool to running as one system, with{" "}
                  <span className="font-semibold text-[#045891]">UAE FTA e-invoicing, IFRS, PDPL and MoHRE</span>{" "}
                  setting the release cadence every quarter. Our recommendations are vendor-neutral and grounded in 7-year TCO, on-prem versus SaaS reality, and the customisation profile your business actually has.
                </p>
              </div>

              <div className="relative mt-8 overflow-hidden rounded-3xl border border-border-light bg-gradient-to-br from-white via-[#28B5E1]/[0.04] to-[#045891]/[0.06] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:mt-10 sm:p-8">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#28B5E1]/15 blur-[110px]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-[#1B8AC7]/12 blur-[110px]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/50 to-transparent"
                />

                <div className="relative">
                  <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-heading sm:text-[1.65rem]">
                    Is Your Software Stack{" "}
                    <span className="gradient-text">Working as One?</span>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-body sm:text-base">
                    Most companies do not see the real cost of fragmentation until month-end close, audit season, or the next ERP upgrade. Our team will map your current stack and identify the integration and TCO gaps that matter most.
                  </p>

                  <button
                    onClick={openContact}
                    className="group mt-5 inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5"
                  >
                    Get a Free Business Solutions Assessment
                    <ArrowRightIcon className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SIX FORCES SHAPING BUSINESS SOFTWARE
          ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-white py-20 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #045891 1px, transparent 1px), linear-gradient(to bottom, #045891 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[8%] top-[18%] h-[28rem] w-[28rem] rounded-full bg-[#28B5E1]/[0.10] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[5%] bottom-[10%] h-[22rem] w-[22rem] rounded-full bg-[#1B8AC7]/[0.07] blur-3xl"
        />

        <div className="shell relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-12%" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
            }}
          >
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="font-display text-3xl font-bold leading-[1.1] -tracking-[0.01em] text-[#0a1d3a] sm:text-4xl md:text-5xl lg:text-[3rem]"
            >
              The Business Software Landscape:{" "}
              <span className="italic font-light gradient-text">Why Now</span>{" "}
              More Than Ever
            </motion.h2>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              Six forces converging on UAE businesses at once, turning back-office software from a cost line into the operating model decision of the decade.
            </motion.p>

            <ForceAccordion />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BUSINESS IMPACT OF FRAGMENTED SOFTWARE
          ═══════════════════════════════════════ */}
      <section className="relative py-16 bg-white sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Business Impact"
            title={
              <>
                Business Impact of{" "}
                <span className="gradient-text">Fragmented Business Software</span>
              </>
            }
            description="When ERP, CRM, Finance and HRM live in separate worlds, the cost shows up in every department, not just IT. Six places where fragmentation quietly drains UAE businesses every month."
            centered
          />

          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            {businessImpact.map((row) => (
              <article
                key={row.area}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-light bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#045891]/20 hover:shadow-[0_8px_30px_rgba(4,88,145,0.08)] sm:p-7"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-gradient-to-b from-[#28B5E1] via-[#1B8AC7] to-[#045891] transition-transform duration-500 ease-out group-hover:scale-y-100"
                />

                <div className="flex items-start gap-3">
                  <span className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-[#28B5E1] ring-4 ring-[#28B5E1]/10" />
                  <h3 className="font-display text-lg font-bold text-heading sm:text-xl">
                    {row.area}
                  </h3>
                </div>

                <p className="mt-3 pl-5 text-sm leading-relaxed text-body sm:text-[15px]">
                  {row.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STRUCTURED REVIEW CTA
          ═══════════════════════════════════════ */}
      <section className="relative bg-white py-12 sm:py-16">
        <div className="shell">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy-deep via-navy to-[#0A3D6B] p-6 shadow-[0_20px_60px_rgba(4,88,145,0.25)] sm:p-10 lg:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#28B5E1]/20 blur-[100px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-20 -bottom-24 h-56 w-56 rounded-full bg-[#1B8AC7]/15 blur-[110px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/60 to-transparent"
            />

            <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
              <div className="max-w-xl">
                <div className="flex items-center gap-2">
                  <UsersIcon className="h-4 w-4 text-[#28B5E1]" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#28B5E1]">
                    Free · 30-Min Structured Review
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
                  Need help figuring out{" "}
                  <span className="gradient-text">where you stand?</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                  Our business solutions consulting team can walk you through a structured assessment of your ERP, CRM, Finance and HRM stack in about 30 minutes.
                </p>
              </div>

              <button
                onClick={openContact}
                className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#045891] shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all hover:brightness-105 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)]"
              >
                Book a Free Assessment
                <ArrowRightIcon className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOUR SOLUTION PILLARS
          ═══════════════════════════════════════ */}
      <section id="pillars" className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Solution Pillars"
            title={
              <>
                Our <span className="gradient-text">Integrated</span> Solutions
              </>
            }
            description="The four modules every UAE business needs to operate as one system: ERP, CRM & Sales, Finance, HRM. All four share one customer record, one chart of accounts, one employee directory."
            centered
          />

          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-12">
            {pillars.map((pillar, i) => {
              const spans = [
                "md:col-span-7",
                "md:col-span-5",
                "md:col-span-5",
                "md:col-span-7",
              ];
              return (
                <Link
                  key={pillar.number}
                  to={pillar.href}
                  className={`block ${spans[i] ?? "md:col-span-12"}`}
                >
                  <article
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0a1d3a] via-[#0a1d3a] to-[#031428] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/40 hover:shadow-[0_18px_40px_-10px_rgba(40,181,225,0.35)] sm:p-8"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#28B5E1]/30 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    />

                    <div className="relative flex flex-1 flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-[#28B5E1] transition-all duration-300 group-hover:bg-[#28B5E1] group-hover:text-white group-hover:shadow-[0_6px_18px_rgba(40,181,225,0.45)]">
                        <pillar.icon className="h-5 w-5" />
                      </div>

                      <div className="flex flex-1 flex-col">
                        <div className="mb-2 flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#28B5E1]">
                            {pillar.category}
                          </span>
                        </div>

                        <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                          {pillar.title}
                        </h3>
                        <p className="mt-2 max-w-3xl flex-1 text-sm leading-relaxed text-slate-300/85 sm:text-base">
                          {pillar.description}
                        </p>

                        <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white transition-all duration-300 group-hover:border-[#28B5E1] group-hover:bg-gradient-to-r group-hover:from-[#045891] group-hover:to-[#1B8AC7] group-hover:shadow-[0_8px_22px_rgba(27,138,199,0.45)] sm:text-sm">
                          Explore
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="transition-transform duration-300 group-hover:translate-x-0.5"
                          >
                            <path
                              d="M5 12h14M13 6l6 6-6 6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>

                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-[#28B5E1] via-[#1B8AC7] to-transparent transition-all duration-700 ease-out group-hover:w-full"
                    />
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          UAE COMPLIANCE REQUIREMENTS
          ═══════════════════════════════════════ */}
      <section id="compliance" className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Regulatory Framework"
            title={
              <>
                UAE <span className="gradient-text">Compliance</span> Requirements
              </>
            }
            description="UAE businesses operate inside multiple overlapping reporting, tax, labour and data-protection frameworks. Modern business platforms must support every one of them natively."
            centered
          />

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {complianceFrameworks.map((fw) => (
              <div
                key={fw.name}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <Card className="flex h-full flex-col p-5 sm:p-6">
                  <h3 className="font-display text-xl font-bold text-[#045891]">{fw.name}</h3>
                  <p className="mt-1 text-xs text-muted">{fw.fullName}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-body">
                    {fw.description}
                  </p>
                  <div className="mt-4">
                    <span className="inline-block rounded-md border border-[#045891]/20 bg-[#045891]/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#045891]">
                      {fw.scope}
                    </span>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          VENDOR SCORECARD
          ═══════════════════════════════════════ */}
      <section id="scorecard" className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Vendor Scorecard"
            title={
              <>
                Overall Business Solutions{" "}
                <span className="gradient-text">Vendor Scorecard</span>
              </>
            }
            description="Consolidated assessment across financial, management, breadth, integration, UAE localisation, and scalability dimensions. Scores are out of 10."
            centered
          />

          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-[#0A3D6B]/30 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7] text-white">
                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider sm:px-5 sm:text-[13px]">
                      Evaluation dimension
                    </th>
                    {[
                      "SAP S/4HANA",
                      "Oracle Fusion / EBS",
                      "MS Dynamics 365",
                      "Sage X3",
                      "Odoo",
                      "Focus Softnet",
                    ].map((v) => (
                      <th
                        key={v}
                        className="border-l border-white/15 px-3 py-4 text-center font-display text-[13px] font-semibold sm:text-sm"
                      >
                        {v}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { dim: "Financial Value / TCO", scores: ["6", "6", "8", "9", "10", "10"] },
                    { dim: "Ease of Management", scores: ["6", "6", "8", "8", "9", "9"] },
                    { dim: "Module Breadth & Depth", scores: ["10", "10", "9", "8", "8", "8"] },
                    { dim: "Platform Integration", scores: ["10", "10", "9", "8", "9", "8"] },
                    { dim: "UAE Localisation (Arabic, FTA, MoHRE)", scores: ["8", "8", "9", "8", "8", "10"] },
                    { dim: "Scalability / Enterprise Fit", scores: ["10", "10", "9", "8", "7", "8"] },
                  ].map((row, i) => (
                    <tr
                      key={row.dim}
                      className={`${i % 2 === 0 ? "bg-white" : "bg-slate-50/60"} border-t border-slate-200/70`}
                    >
                      <td className="px-4 py-3 font-medium text-slate-900 sm:px-5">{row.dim}</td>
                      {row.scores.map((s, j) => (
                        <td
                          key={j}
                          className="border-l border-slate-200/70 px-3 py-3 text-center font-display text-[15px] font-semibold text-slate-700"
                        >
                          {s}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="border-t-2 border-[#1B8AC7]/30 bg-gradient-to-r from-[#045891]/[0.06] to-[#1B8AC7]/[0.06]">
                    <td className="px-4 py-4 font-display text-[13px] font-bold uppercase tracking-wider text-[#045891] sm:px-5 sm:text-sm">
                      Weighted Total
                    </td>
                    {["8.3", "8.3", "8.7", "8.2", "8.5", "8.8"].map((s, i) => (
                      <td
                        key={i}
                        className={`border-l border-slate-200/70 px-3 py-4 text-center font-display text-base font-bold sm:text-lg ${i === 5 ? "text-[#1B8AC7]" : "text-slate-900"
                          }`}
                      >
                        {s}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-[#0A3D6B]/15 bg-gradient-to-br from-[#04101E] via-[#0A3D6B] to-[#04101E] p-7 text-slate-200 shadow-xl shadow-[#1B8AC7]/10 sm:p-10">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#28B5E1]">
              Strategic recommendation
            </p>
            <div className="mt-4 space-y-4 text-sm leading-relaxed sm:text-base">
              <p>
                <span className="font-semibold text-white">Focus Softnet</span> is our top recommendation for UAE mid-market on-prem TCO and FTA-native compliance. It has the largest UAE / GCC mid-market deployment base by count and the deepest local customisation library.
              </p>
              <p>
                <span className="font-semibold text-white">SAP S/4HANA</span> and{" "}
                <span className="font-semibold text-white">Oracle Fusion</span> remain the reference picks for multi-entity enterprises (500+ users, multi-currency, deep manufacturing). Both deliver the broadest module breadth and the deepest integration with regulated industries.
              </p>
              <p>
                <span className="font-semibold text-white">Microsoft Dynamics 365</span> wins where Microsoft 365 / Power Platform alignment dominates, and where mid-market customers want a unified Microsoft estate from email to ERP.
              </p>
              <p>
                <span className="font-semibold text-white">Odoo</span> is best-in-class open-source on-prem ERP, with the lowest seven-year TCO for customisation-heavy mid-market estates that have the in-house engineering capacity to extend it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          IMPLEMENTATION ROADMAP
          ═══════════════════════════════════════ */}
      <section id="roadmap" className="relative bg-surface-secondary py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="12 to 18 Month Plan"
            title={
              <>
                Business Solutions{" "}
                <span className="gradient-text">Implementation Roadmap</span>
              </>
            }
            description="Building a unified business platform does not happen overnight. The phased plan below sequences ERP, Finance, CRM and HRM rollout over 12 to 18 months without breaking operations."
            centered
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                n: "01",
                focus: "Foundation",
                area: "Discovery & Architecture",
                actions: "Map current stack, define target architecture, set IFRS chart of accounts, agree integration boundaries and master-data model.",
                months: "M 1 to 2",
              },
              {
                n: "02",
                focus: "Finance Core",
                area: "GL, AP, AR, FTA e-Invoicing",
                actions: "Stand up Finance module, migrate the ledger, configure VAT, enable FTA-compliant e-invoicing through an approved channel.",
                months: "M 2 to 4",
              },
              {
                n: "03",
                focus: "ERP Operations",
                area: "Inventory, Procurement, Supply Chain",
                actions: "Onboard suppliers, items and warehouses. Cut over operations to ERP. Connect procurement-to-pay back to Finance.",
                months: "M 4 to 6",
              },
              {
                n: "04",
                focus: "CRM & Sales",
                area: "Pipeline, Quotes, Commissions",
                actions: "Migrate accounts and opportunities. Configure pipeline, quotas, commissions. Connect quote-to-cash straight into ERP.",
                months: "M 5 to 7",
              },
              {
                n: "05",
                focus: "HRM",
                area: "Payroll, WPS, Attendance",
                actions: "Employees, leave, attendance, payroll, WPS SIF generation, performance cycle and MoHRE-aligned employee records.",
                months: "M 6 to 9",
              },
              {
                n: "06",
                focus: "Integration & Master Data",
                area: "Single Customer Record",
                actions: "Unify customer, supplier and employee master data across modules. Decommission spreadsheet workarounds and one-off integrations.",
                months: "M 7 to 10",
              },
              {
                n: "07",
                focus: "Business Intelligence",
                area: "Dashboards & Reporting",
                actions: "IFRS reports, sales dashboards, cash-flow forecasting, AI document capture and AI assistants on top of unified data.",
                months: "M 9 to 12",
              },
              {
                n: "08",
                focus: "Adoption & Training",
                area: "User Enablement",
                actions: "Role-based training, change management, KPI tracking, hyper-care and Arabic-language training for front-line users.",
                months: "M 10 to 14",
              },
              {
                n: "09",
                focus: "Continuous Improvement",
                area: "Managed Services & AMC",
                actions: "Wrap into managed services / AMC. Quarterly business reviews, optimisation backlog, regulatory updates (FTA, MoHRE, IFRS).",
                months: "M 12+",
              },
            ].map((p) => (
              <div
                key={p.n}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1B8AC7]/40 hover:shadow-[0_12px_30px_-12px_rgba(27,138,199,0.30)] sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#045891] to-[#1B8AC7] font-display text-[13px] font-bold text-white shadow-sm">
                    {p.n}
                  </div>
                  <span className="rounded-full border border-[#1B8AC7]/20 bg-[#1B8AC7]/5 px-2.5 py-0.5 text-[11px] font-semibold text-[#045891]">
                    {p.months}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-lg font-bold text-[#045891] sm:text-xl">
                  {p.focus}
                </h3>
                <p className="mt-1 text-[12px] font-semibold uppercase tracking-wider text-[#1B8AC7]">
                  {p.area}
                </p>
                <p className="mt-3 text-[13.5px] leading-relaxed text-slate-600">
                  {p.actions}
                </p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-14 max-w-5xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="font-display text-lg font-bold text-[#045891] sm:text-xl">
              Key Success Factors
            </h3>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Executive sponsorship",
                  body: "Business platform programmes need board-level support and a single accountable owner across IT, Finance and HR.",
                },
                {
                  title: "Master-data governance",
                  body: "Customer, supplier, employee and product master data must have a single owner before any module goes live.",
                },
                {
                  title: "Change management",
                  body: "Adoption fails on culture, not technology. Invest early in training, role redesign, and KPI alignment.",
                },
                {
                  title: "Phased cutover",
                  body: "Cut over one module at a time. Never attempt big-bang migrations across ERP, CRM, Finance and HRM simultaneously.",
                },
                {
                  title: "Continuous improvement",
                  body: "Regulatory updates (FTA, MoHRE, IFRS) and platform releases require a permanent optimisation cadence, not a one-off project.",
                },
              ].map((f) => (
                <li key={f.title} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1B8AC7]/15 text-[#1B8AC7] ring-1 ring-inset ring-[#1B8AC7]/30"
                  >
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-slate-900">
                      {f.title}
                    </p>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-slate-600">
                      {f.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQ
          ═══════════════════════════════════════ */}
      <section id="faq" className="relative py-16 bg-surface-secondary sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Knowledge Base"
            title={
              <>
                Frequently <span className="gradient-text">Asked</span> Questions
              </>
            }
            description="Expert answers to the most common business solutions questions from UAE decision-makers."
            centered
          />

          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA
          ═══════════════════════════════════════ */}
      <CTASection
        title="Get Your Business Solutions Assessment"
        description="Book a free 30-minute review of your current ERP, CRM, Finance and HRM stack. We map your business processes, identify integration gaps, and deliver a phased roadmap aligned to UAE FTA, IFRS, PDPL and MoHRE requirements."
        primaryButton={{ text: "Talk to our Consultant", action: "modal" }}
      />
    </>
  );
}

