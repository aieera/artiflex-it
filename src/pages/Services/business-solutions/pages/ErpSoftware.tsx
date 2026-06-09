import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";

/* ───────── ERP VENDORS (HONEYCOMB) ───────── */

const erpVendorList = [
  { slug: "sap", name: "SAP S/4HANA", logo: "/logos/SAP.svg" },
  { slug: "oracle", name: "Oracle Fusion / EBS", logo: "/logos/Oracle.png" },
  { slug: "ms-dynamics", name: "Microsoft Dynamics 365", logo: "/logos/microsoft.svg" },
  { slug: "odoo", name: "Odoo", logo: "/logos/Odoo.png" },
  { slug: "sage", name: "Sage X3 / Sage 300", logo: "/logos/Sage.png" },
  { slug: "infor", name: "Infor CloudSuite", logo: "/logos/Infor.png" },
  { slug: "focus-softnet", name: "Focus Softnet", logo: "/logos/Focus-Softnet.png" },
];

/* ───────── BUYER'S GUIDE, SELECTION FRAMEWORK ───────── */

const selectionFramework = [
  {
    step: "1",
    question: "What is the ERP for?",
    capture:
      "Single-entity finance and operations, multi-entity consolidation, trading and distribution, manufacturing, project-based services, or a mixed model",
    why: "Each profile maps to natural platform strengths and module depth.",
  },
  {
    step: "2",
    question: "Scale and complexity?",
    capture:
      "Under 25 users, 25-150 users, 150-500 users, 500+ users, multi-entity, multi-currency, multi-country",
    why: "Drives platform tier and licensing model; under-150 fits smaller platforms, 500+ needs enterprise-grade depth.",
  },
  {
    step: "3",
    question: "Customisation appetite?",
    capture:
      "Out-of-the-box only, light configuration, moderate custom modules and reports, or deep customisation including database-level integration",
    why: "Customisation depth often becomes the deciding factor; SaaS edition limits routinely conflict with UAE business reality.",
  },
  {
    step: "4",
    question: "Deployment model?",
    capture:
      "On-premise (full ownership and customisation), private cloud (managed by partner), public SaaS (subscription only), or hybrid",
    why: "On-premise wins for data residency, customisation and 7-10 year TCO; SaaS wins for short-term cash flow and small-scale operations.",
  },
  {
    step: "5",
    question: "Document automation scope?",
    capture:
      "Manual document handling, partial digital capture, or full ingestion (supplier quotes, customer POs, delivery notes, invoices) with indexed archive",
    why: "Document automation is increasingly the single biggest ROI driver in ERP; on-premise platforms can store unlimited soft copies without per-document SaaS surcharge.",
  },
  {
    step: "6",
    question: "Integration scope?",
    capture:
      "Standalone ERP, ERP plus CRM, ERP plus HRM, ERP plus document management, or a full stack including manufacturing and logistics",
    why: "Integration breadth and API openness matter more on-premise than in SaaS, where vendor APIs limit what can be done.",
  },
  {
    step: "7",
    question: "Compliance posture?",
    capture:
      "UAE VAT compliance, FTA e-invoicing readiness, IFRS reporting, sector-specific (CBUAE banking, ADHICS healthcare, ADGM, DFSA)",
    why: "UAE FTA e-invoicing mandate (phased rollout) is the most immediate compliance pressure; on-premise platforms typically deliver this without subscription dependency.",
  },
];

/* ───────── SELECTION CRITERIA CHECKLIST ───────── */

const checklistGroups = [
  {
    title: "Technical fit",
    items: [
      "Module breadth (finance, ops, manufacturing, projects)",
      "Database and reporting access",
      "Customisation depth without surcharge",
      "Integration API openness",
      "Multi-entity and multi-currency",
      "Arabic / multilingual UI and reports",
    ],
  },
  {
    title: "Operational fit",
    items: [
      "Deployment model flexibility",
      "Document capture and digital archive",
      "Workflow automation depth",
      "Mobile and field-staff capability",
      "Audit trail and segregation of duties",
    ],
  },
  {
    title: "Commercial fit",
    items: [
      "On-premise perpetual licence",
      "Implementation and customisation cost",
      "Annual maintenance percentage",
      "5-year and 10-year TCO",
      "Customisation surcharge under SaaS edition limits",
    ],
  },
  {
    title: "Service fit",
    items: [
      "UAE in-country implementation partner",
      "Arabic-language professional services",
      "Local consultant continuity",
      "Customisation library and methodology",
      "Long-term support and upgrade path",
    ],
  },
];

/* ───────── TCO COMPARISON (7-YEAR ON-PREM VS SAAS) ───────── */

type TcoRow = {
  line: string;
  saas: string;
  onPrem: string;
  diff: string;
  highlight?: boolean;
};

const tcoRows: TcoRow[] = [
  {
    line: "Licensing / subscription",
    saas: "AED 2.8M (per-user per-month escalating 10% annually)",
    onPrem: "AED 750K perpetual licence plus 18% annual maintenance",
    diff: "SaaS approximately 2.7x",
  },
  {
    line: "Implementation and configuration",
    saas: "AED 600K-900K",
    onPrem: "AED 700K-1.0M",
    diff: "Comparable",
  },
  {
    line: "Customisation and integration",
    saas: "AED 500K plus rework every major release",
    onPrem: "AED 400K one-time, retained across upgrades",
    diff: "SaaS pays repeatedly",
  },
  {
    line: "Infrastructure (servers, storage, DB)",
    saas: "Included in subscription",
    onPrem: "AED 450K over 7 years (servers, storage, DB)",
    diff: "Bundled vs CapEx",
  },
  {
    line: "Annual escalation and price increases",
    saas: "10% per year on subscription baseline",
    onPrem: "5% on annual maintenance only",
    diff: "SaaS escalates faster",
  },
  {
    line: "7-year cumulative TCO",
    saas: "AED 4.2M-4.8M",
    onPrem: "AED 1.6M-2.0M",
    diff: "SaaS approximately 2.5x-3.0x",
    highlight: true,
  },
];

const onPremGains = [
  {
    title: "Data residency and sovereignty",
    items: [
      "All business data physically resides on your infrastructure, inside the UAE",
      "No cross-border data flow concerns under UAE PDPL, NESA, ADHICS or sector frameworks",
      "Audit-trail evidence stays inside the regulatory perimeter without third-party processor agreements",
      "No dependency on vendor data-centre availability, cloud-region outages or geopolitical risk",
    ],
  },
  {
    title: "Infinite customisation",
    items: [
      "Custom modules, fields and workflows without per-customisation surcharge",
      "Database-level access for reporting, integration and analytics that SaaS APIs limit",
      "Custom UI, document templates, branding without vendor approval queues",
      "Industry-specific extensions developed once and owned forever",
    ],
  },
  {
    title: "Document automation and digital archive",
    items: [
      "Supplier quotations, customer POs, delivery notes and invoices captured and indexed automatically",
      "All soft copies stored against the source transaction, retrievable from one click",
      "Email and scan ingestion attaches documents to the correct ledger or order without manual filing",
      "Long-term retention without SaaS storage surcharge or per-document fees",
    ],
  },
  {
    title: "Independence from SaaS lock-in",
    items: [
      "No annual price-escalation surprise; total cost predictable for the full lifecycle",
      "No risk of mandatory upgrade forcing recustomisation",
      "Database remains accessible for future migration, BI or AI / ML projects",
      "No critical business function dependent on internet connectivity to a foreign provider",
    ],
  },
];

/* ───────── DETAILED COMPARISON CARDS ───────── */

const vendors = [
  {
    slug: "sap",
    name: "SAP S/4HANA",
    best: "Deepest Enterprise ERP Heritage (Recommended)",
    strength:
      "SAP launched 1972; S/4HANA since 2015. Deepest enterprise ERP heritage globally with the broadest module set across finance, supply chain, manufacturing, retail and services. ABAP plus BTP unlock deep customisation; OpenText plus SAP DMS deliver reference-grade document automation. UAE VAT and FTA e-invoicing are reference implementations. Largest UAE consulting bench by certified headcount.",
    watch:
      "Customisation depth is unmatched but only realised through ABAP plus BTP skill that must be sourced and retained; premium SaaS pricing escalates fast so on-premise or private cloud is usually the right answer for UAE buyers who care about 7-year economics.",
    logo: "/logos/SAP.svg",
  },
  {
    slug: "oracle",
    name: "Oracle Fusion Cloud / E-Business Suite",
    best: "Reference Enterprise ERP (Recommended)",
    strength:
      "Oracle launched 1977; E-Business Suite since 2001 and Fusion Cloud since 2011. Reference enterprise ERP breadth with strong banking, public sector and retail depth. PL/SQL plus Oracle Forms unlock deep customisation; Oracle WebCenter Content is the document automation reference. UAE VAT and FTA e-invoicing are reference implementations. Deep UAE consulting bench across both EBS on-prem and Fusion private cloud.",
    watch:
      "Customisation depth across EBS plus Fusion is reference-grade but the talent pool is finite in UAE; premium SaaS pricing escalates fast so EBS on-prem or Fusion private cloud is usually the right answer when 7-year economics matter.",
    logo: "/logos/Oracle.png",
  },
  {
    slug: "ms-dynamics",
    name: "Microsoft Dynamics 365",
    best: "Strong End-to-End Stack",
    strength:
      "NAV and AX heritage carried into Business Central and Finance & Operations. Strong end-to-end stack across trading, services and manufacturing. AL extensions plus Power Platform give credible customisation without database-level access. SharePoint plus Power Automate deliver document automation. UAE VAT and FTA e-invoicing are reference implementations. Largest UAE partner network across mid-market and enterprise.",
    watch:
      "Customisation depth is credible but trails SAP and Oracle on database-level access; SaaS subscription model is the default path so 7-year economics need MSP-aligned commercial design to match an on-premise baseline.",
    logo: "/logos/microsoft.svg",
  },
  {
    slug: "odoo",
    name: "Odoo",
    best: "Best On-Premise TCO (Recommended)",
    strength:
      "Belgian heritage from 2005; open-source, modular and fully self-hostable. Python modules and full source access mean unlimited customisation without per-customisation surcharge. Native document management is built into the platform. UAE VAT and FTA e-invoicing capable. Open-source licensing plus on-premise deployment make Odoo the best on-prem TCO in the market, often by a wide margin.",
    watch:
      "UAE partner base is growing rather than dominant; module depth in heavy manufacturing and banking is narrower than SAP or Oracle. Best fit for trading, services and light manufacturing where on-premise TCO is decisive.",
    logo: "/logos/Odoo.png",
  },
  {
    slug: "sage",
    name: "Sage X3 / Sage 300",
    best: "Strong Mid-Market Value",
    strength:
      "Sage launched 1981; X3 is the mid-market enterprise platform and Sage 300 covers mid-market accounting. Strong distribution, services and finance breadth. Customisation framework is mature; document storage plus integration are solid. UAE VAT and FTA e-invoicing capable. Strong UAE channel with mid-market focus.",
    watch:
      "Industry depth in manufacturing and regulated verticals trails SAP, Oracle and Infor; UAE bench is smaller than the dominant platforms. Best fit when mid-market value and Sage skill availability matter more than enterprise reach.",
    logo: "/logos/Sage.png",
  },
  {
    slug: "infor",
    name: "Infor CloudSuite",
    best: "Industry-Specific Depth",
    strength:
      "Infor founded 2002; specialised on industry CloudSuites with pre-built process depth across food, fashion, healthcare and public sector. Industry pre-built content plus customisation framework. Document management included. UAE VAT compliance covered. UAE partner-led delivery.",
    watch:
      "Industry premium is real and worth paying when the vertical matches; for generic trading, services or manufacturing the premium is harder to justify against horizontal platforms with focused customisation.",
    logo: "/logos/Infor.png",
  },
  {
    slug: "focus-softnet",
    name: "Focus Softnet",
    best: "Best UAE Mid-Market On-Premise (Recommended)",
    strength:
      "Founded 1992 across UAE and India; the UAE-grown ERP specialist with the largest UAE / GCC on-premise mid-market deployment base by count. Full UAE-tuned ERP suite with deep UAE-specific customisation, native UAE VAT plus e-invoicing, and strong document handling tuned for local business reality. Largest UAE presence by deployment count, with the deepest local consultant continuity in the mid-market.",
    watch:
      "Global brand recognition trails SAP, Oracle and Microsoft; module depth in heavy manufacturing and banking is narrower. Best fit for UAE mid-market trading, services and light manufacturing where local depth and on-premise TCO are decisive.",
    logo: "/logos/Focus-Softnet.png",
  },
];

/* ───────── VENDOR MATRIX (BUYER'S MATRIX) ───────── */

const matrixVendors = [
  { name: "SAP S/4HANA", recommended: true, rank: "#1" },
  { name: "Oracle Fusion / EBS", recommended: true },
  { name: "Microsoft Dynamics 365" },
  { name: "Odoo", recommended: true },
  { name: "Sage X3 / Sage 300" },
  { name: "Infor CloudSuite" },
  { name: "Focus Softnet", recommended: true },
];

type StarCell = { stars: number; note: string };
type VerdictCell = { recommended?: boolean; rank?: string; text: string };
type MatrixRow =
  | { label: string; type: "text"; cells: string[] }
  | { label: string; type: "stars"; cells: StarCell[] }
  | { label: string; type: "verdict"; cells: VerdictCell[] };

const matrixRows: MatrixRow[] = [
  {
    label: "Heritage and breadth",
    type: "text",
    cells: [
      "SAP 1972; S/4HANA since 2015; deepest enterprise ERP heritage globally",
      "Oracle 1977; EBS since 2001, Fusion Cloud since 2011",
      "Microsoft Dynamics: NAV / AX heritage; Business Central and F&O current",
      "Odoo 2005 Belgium; open-source, modular, on-prem option",
      "Sage 1981; X3 mid-market enterprise, Sage 300 mid-market accounting",
      "Infor 2002; specialised on industry CloudSuites",
      "Focus Softnet 1992 UAE / India; full UAE-tuned ERP suite",
    ],
  },
  {
    label: "On-prem option",
    type: "stars",
    cells: [
      { stars: 5, note: "S/4HANA on-prem plus private cloud" },
      { stars: 5, note: "EBS on-prem plus Fusion private cloud" },
      { stars: 4, note: "Business Central on-prem" },
      { stars: 5, note: "Full on-prem, self-hosted" },
      { stars: 5, note: "Sage X3 on-prem flagship" },
      { stars: 4, note: "Infor on-prem options" },
      { stars: 5, note: "Strong on-prem heritage" },
    ],
  },
  {
    label: "Customisation depth",
    type: "stars",
    cells: [
      { stars: 5, note: "ABAP, BTP, deep customisation" },
      { stars: 5, note: "PL/SQL, deep EBS customisation" },
      { stars: 4, note: "AL, extensions, Power Platform" },
      { stars: 5, note: "Python modules, full source access" },
      { stars: 4, note: "Strong customisation framework" },
      { stars: 4, note: "Industry pre-built plus customisation" },
      { stars: 5, note: "Deep UAE-specific customisation" },
    ],
  },
  {
    label: "Document automation / archive",
    type: "stars",
    cells: [
      { stars: 5, note: "OpenText plus SAP DMS integration" },
      { stars: 5, note: "Oracle WebCenter Content" },
      { stars: 4, note: "SharePoint plus Power Automate" },
      { stars: 5, note: "Native document management" },
      { stars: 4, note: "Document storage plus integration" },
      { stars: 4, note: "Document management included" },
      { stars: 5, note: "Strong document handling, UAE-tuned" },
    ],
  },
  {
    label: "UAE VAT and FTA e-invoicing",
    type: "stars",
    cells: [
      { stars: 5, note: "Reference UAE VAT plus e-invoicing" },
      { stars: 5, note: "Reference UAE VAT plus e-invoicing" },
      { stars: 5, note: "Reference UAE VAT plus e-invoicing" },
      { stars: 4, note: "UAE VAT and e-invoicing capable" },
      { stars: 4, note: "UAE VAT and e-invoicing capable" },
      { stars: 4, note: "UAE VAT compliance" },
      { stars: 5, note: "UAE VAT plus e-invoicing native" },
    ],
  },
  {
    label: "Industry depth",
    type: "stars",
    cells: [
      { stars: 5, note: "Manufacturing, retail, services" },
      { stars: 5, note: "Banking, public sector, retail" },
      { stars: 5, note: "Trading, services, manufacturing" },
      { stars: 4, note: "Trading, services, light manufacturing" },
      { stars: 4, note: "Distribution, services, finance" },
      { stars: 5, note: "Industry-specific (food, fashion, healthcare)" },
      { stars: 4, note: "Trading, services, light manufacturing" },
    ],
  },
  {
    label: "UAE service depth",
    type: "stars",
    cells: [
      { stars: 5, note: "Largest UAE consulting bench" },
      { stars: 5, note: "Deep UAE consulting" },
      { stars: 5, note: "Largest UAE partner network" },
      { stars: 4, note: "Growing UAE partner base" },
      { stars: 4, note: "Strong UAE channel" },
      { stars: 4, note: "UAE partner-led delivery" },
      { stars: 5, note: "Largest UAE / GCC presence by deployment count" },
    ],
  },
  {
    label: "TCO over 7 years",
    type: "stars",
    cells: [
      { stars: 3, note: "Premium SaaS pricing escalates" },
      { stars: 3, note: "Premium SaaS pricing escalates" },
      { stars: 4, note: "Strong value if MSP-aligned" },
      { stars: 5, note: "Best-in-class on-prem TCO" },
      { stars: 4, note: "Strong mid-market value" },
      { stars: 3, note: "Industry-specific premium" },
      { stars: 5, note: "Best UAE mid-market on-prem TCO" },
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      {
        recommended: true,
        rank: "#1",
        text: "Deepest enterprise ERP heritage globally; reference UAE VAT plus e-invoicing and the largest UAE consulting bench.",
      },
      {
        recommended: true,
        text: "Reference enterprise ERP with deep UAE consulting; EBS on-prem and Fusion private cloud both viable for residency-sensitive UAE buyers.",
      },
      {
        text: "Strong end-to-end stack with the largest UAE partner network; SaaS-default model needs MSP-aligned commercial design to match on-premise economics.",
      },
      {
        recommended: true,
        text: "Best on-prem TCO in the market; open-source plus full source access give unlimited customisation without per-customisation surcharge.",
      },
      {
        text: "Strong mid-market value across distribution, services and finance; best fit when Sage skill availability matters more than enterprise reach.",
      },
      {
        text: "Industry-specific depth across food, fashion and healthcare; worth the premium when the vertical matches the CloudSuite content.",
      },
      {
        recommended: true,
        text: "Best UAE mid-market on-premise TCO; largest UAE / GCC deployment base by count with deep UAE-specific customisation.",
      },
    ],
  },
];

/* ───────── GARTNER-STYLE CAPABILITY SCORECARD ───────── */

const featureVendors = [
  "SAP S/4HANA",
  "Oracle Fusion / EBS",
  "Microsoft Dynamics 365",
  "Odoo",
  "Sage X3 / Sage 300",
  "Infor CloudSuite",
  "Focus Softnet",
];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "Module breadth and depth",
    cells: [
      { tier: "best", note: "Deepest enterprise ERP breadth" },
      { tier: "best", note: "Reference enterprise ERP breadth" },
      { tier: "best", note: "Strong end-to-end stack" },
      { tier: "excellent", note: "Broad modular open-source" },
      { tier: "excellent", note: "Strong mid-market breadth" },
      { tier: "best", note: "Industry-specific depth" },
      { tier: "excellent", note: "UAE-tuned broad coverage" },
    ],
  },
  {
    label: "On-prem deployment option",
    cells: [
      { tier: "best", note: "Full on-prem plus private cloud" },
      { tier: "best", note: "EBS on-prem plus Fusion private" },
      { tier: "excellent", note: "Business Central on-prem" },
      { tier: "best", note: "Full on-prem self-hosted" },
      { tier: "best", note: "Sage X3 on-prem flagship" },
      { tier: "excellent", note: "Infor on-prem options" },
      { tier: "best", note: "Strong on-prem heritage" },
    ],
  },
  {
    label: "Customisation depth without surcharge",
    cells: [
      { tier: "best", note: "ABAP, BTP deep customisation" },
      { tier: "best", note: "PL/SQL deep customisation" },
      { tier: "excellent", note: "AL extensions, Power Platform" },
      { tier: "best", note: "Python modules, full source access" },
      { tier: "excellent", note: "Strong customisation framework" },
      { tier: "excellent", note: "Industry pre-built plus customisation" },
      { tier: "best", note: "Deep UAE-specific customisation" },
    ],
  },
  {
    label: "Document automation and archive",
    cells: [
      { tier: "best", note: "OpenText plus SAP DMS" },
      { tier: "best", note: "Oracle WebCenter Content" },
      { tier: "excellent", note: "SharePoint plus Power Automate" },
      { tier: "best", note: "Native document management" },
      { tier: "excellent", note: "Document storage integration" },
      { tier: "excellent", note: "Document management included" },
      { tier: "best", note: "Strong document handling, UAE-tuned" },
    ],
  },
  {
    label: "UAE VAT and FTA e-invoicing",
    cells: [
      { tier: "best", note: "Reference UAE VAT plus e-invoicing" },
      { tier: "best", note: "Reference UAE VAT plus e-invoicing" },
      { tier: "best", note: "Reference UAE VAT plus e-invoicing" },
      { tier: "excellent", note: "UAE VAT and e-invoicing capable" },
      { tier: "excellent", note: "UAE VAT and e-invoicing capable" },
      { tier: "excellent", note: "UAE VAT compliance" },
      { tier: "best", note: "UAE VAT plus e-invoicing native" },
    ],
  },
  {
    label: "Multi-entity, multi-currency",
    cells: [
      { tier: "best", note: "Reference multi-entity ERP" },
      { tier: "best", note: "Reference multi-entity ERP" },
      { tier: "best", note: "Strong multi-entity in F&O" },
      { tier: "excellent", note: "Multi-company multi-currency" },
      { tier: "excellent", note: "Mid-market multi-entity" },
      { tier: "excellent", note: "Industry-specific multi-entity" },
      { tier: "excellent", note: "Multi-entity UAE-aware" },
    ],
  },
  {
    label: "Data residency and sovereignty",
    cells: [
      { tier: "best", note: "On-prem plus UAE private cloud" },
      { tier: "best", note: "On-prem plus UAE private cloud" },
      { tier: "excellent", note: "Azure UAE plus on-prem option" },
      { tier: "best", note: "Full on-prem residency" },
      { tier: "best", note: "On-prem residency" },
      { tier: "excellent", note: "On-prem option residency" },
      { tier: "best", note: "UAE residency by design" },
    ],
  },
  {
    label: "7-year TCO economics",
    cells: [
      { tier: "strong", note: "Premium SaaS escalates fast" },
      { tier: "strong", note: "Premium SaaS escalates fast" },
      { tier: "excellent", note: "Strong value if MSP-aligned" },
      { tier: "best", note: "Best on-prem TCO; open-source" },
      { tier: "excellent", note: "Strong mid-market value" },
      { tier: "strong", note: "Industry-specific premium" },
      { tier: "best", note: "Best UAE mid-market on-prem TCO" },
    ],
  },
];

const tierStyles: Record<Tier, { bg: string; text: string; label: string }> = {
  best: { bg: "bg-emerald-600", text: "text-white", label: "Best in class" },
  excellent: { bg: "bg-emerald-500", text: "text-white", label: "Excellent" },
  veryStrong: { bg: "bg-emerald-200", text: "text-emerald-900", label: "Very strong" },
  strong: { bg: "bg-amber-200", text: "text-amber-900", label: "Strong" },
  good: { bg: "bg-amber-100", text: "text-amber-900", label: "Good" },
  moderate: { bg: "bg-amber-100", text: "text-amber-900", label: "Moderate" },
};

/* ───────── DECISION FRAMEWORK QUESTIONS ───────── */

const decisionQuestions = [
  {
    num: "01",
    title: "On-prem or SaaS?",
    desc: "On-prem wins for data residency, customisation depth and 7-10 year TCO. SaaS wins for short-term cash flow, no internal IT capacity, and operations under 25 users with light customisation. For most UAE mid-market and enterprise operations with meaningful customisation, on-prem is the lower-cost answer over the lifecycle.",
  },
  {
    num: "02",
    title: "Enterprise or mid-market?",
    desc: "Enterprise (500+ users, multi-entity, complex manufacturing): SAP S/4HANA or Oracle Fusion / EBS. Mid-market (25-500 users): Microsoft Dynamics 365 Business Central, Sage X3, Odoo, or Focus Softnet. UAE-only mid-market with deep local-customisation needs: Focus Softnet and Odoo are particularly competitive.",
  },
  {
    num: "03",
    title: "Industry-specific or horizontal?",
    desc: "Industry-specific platforms (Infor CloudSuite, SAP industry editions) deliver pre-built process depth that horizontal platforms recreate via customisation. Worth the premium for tightly-regulated industries (food, fashion, healthcare, public sector). For generic trading, services and manufacturing, horizontal platforms with focused customisation are more flexible.",
  },
  {
    num: "04",
    title: "Document-automation maturity?",
    desc: "If supplier quote, customer PO, delivery note and invoice flows are still manual, the single biggest ROI in an ERP refresh is full document automation. On-premise ERPs (SAP DMS, Oracle WebCenter, Odoo native, Focus Softnet) can store unlimited soft copies against the source transaction without per-document SaaS surcharge.",
  },
];

/* ───────── UAE SERVICE & COMMERCIAL NOTES ───────── */

const uaeNotes = [
  "UAE FTA e-invoicing mandate (phased rollout) drives the most immediate ERP compliance pressure; on-premise platforms typically deliver this without subscription dependency.",
  "UAE PDPL and sector frameworks (CBUAE, ADHICS, ADGM, DFSA) make data residency a real business advantage; on-premise ERP keeps all transactional data inside the regulatory perimeter.",
  "Arabic-language UI, right-to-left reports and Hijri-Gregorian calendar are mandatory for many UAE deployments; coverage varies materially by vendor.",
  "Multi-entity multi-currency operations (UAE plus GCC plus India / Pakistan parent or subsidiary) are common; vendor capability here matters more than English-market scorecards suggest.",
  "Focus Softnet has the largest UAE / GCC on-premise mid-market deployment base by count; consider it on every mid-market shortlist.",
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "Is on-premise ERP really cheaper than SaaS over 10 years?",
    answer:
      "For most UAE mid-market and enterprise deployments with meaningful customisation, yes, materially so. The crossover typically happens between year three and year five; by year seven the cumulative SaaS bill is usually 2.5x to 3.5x the equivalent on-premise commitment. The exception is genuinely small operations (under 25 users) with off-the-shelf processes; SaaS wins there because the customisation premium does not apply.",
  },
  {
    question: "How does customisation differ on-prem vs SaaS?",
    answer:
      "On-premise ERP gives you database-level access and full code-level customisation without per-customisation surcharge. SaaS edition limits routinely restrict the customisations UAE businesses actually need (custom fields beyond the included count, integrations beyond the standard connectors, document layouts beyond the templates), and exceeding those limits triggers edition upgrades that compound the subscription escalation.",
  },
  {
    question: "What about cloud security risk?",
    answer:
      "Public SaaS ERP exposes all your transactional data to a third-party cloud provider, often in a region you do not control. For UAE regulated industries (banking, healthcare, government, ADGM-regulated entities), this routinely creates compliance burden that on-premise simply does not have. The CISO conversation often ends with on-premise as the only viable answer.",
  },
  {
    question: "Will on-prem ERP still be supported in 2030?",
    answer:
      "Yes for every major vendor on this page. SAP S/4HANA, Oracle EBS / Fusion private cloud, Microsoft Dynamics 365 Business Central, Sage X3, Odoo, Infor and Focus Softnet all have committed on-premise roadmaps. SAP and Microsoft have publicly published support timelines extending into the 2030s; Odoo is open source and cannot be discontinued.",
  },
  {
    question: "What is the typical UAE ERP deployment timeline?",
    answer:
      "Small mid-market (25-100 users, light customisation): 3 to 6 months. Mid-market (100-300 users, moderate customisation): 6 to 12 months. Enterprise (300+ users, multi-entity, deep customisation): 12 to 24 months. Document-automation projects layered on top: 3 to 6 months. Most UAE failures come from under-budgeted customisation and document-automation scope rather than infrastructure.",
  },
];

/* ───────── HERO ───────── */

function ErpSoftwareHero() {
  const { open: openContact } = useContactModal();
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-navy-deep">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/business-solutions.jpg'), url('/cloud-solutions.jpg')" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/70 to-navy-deep/90"
      />

      {/* Breadcrumb band */}
      <div className="relative z-10 border-b border-white/5">
        <div className="shell flex w-full items-center justify-end gap-4 pt-24 pb-3 sm:pt-28">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center justify-end gap-2 text-[10px] text-slate-400 sm:text-[11px]">
              <li>
                <Link to="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li className="text-slate-600">/</li>
              <li>
                <Link to="/business-solutions" className="transition-colors hover:text-white">
                  Business Solutions
                </Link>
              </li>
              <li className="text-slate-600">/</li>
              <li>
                <span className="font-medium text-[#28B5E1]">ERP Software</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero masthead */}
      <div className="shell relative z-10 flex w-full flex-1 items-center py-10 sm:py-12 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full"
        >
          <h1 className="font-display text-4xl font-bold leading-[1] tracking-tight text-white sm:text-5xl md:text-5xl lg:text-[3.75rem]">
            ERP{" "}
            <span className="gradient-text">Software</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Buyer's Guide, Vendor Matrix and Gartner-style Scorecard
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            A UAE buyer's guide for enterprise resource planning. Honest comparisons across <span className="font-semibold text-white">SAP S/4HANA, Oracle Fusion Cloud and E-Business Suite, Microsoft Dynamics 365, Odoo, Sage X3, Infor CloudSuite and Focus Softnet</span>, with a Gartner-style scorecard and a 7-year on-premise vs SaaS TCO analysis that most vendors will not give you.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={openContact}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base"
            >
              Free ERP Assessment
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
            <a
              href="#vendor-matrix"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base"
            >
              Compare ERP Platforms
            </a>
            <a
              href="#buyers-guide"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-[#28B5E1]/40 bg-[#28B5E1]/10 px-6 py-3 text-sm font-semibold text-[#28B5E1] backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1] hover:bg-[#28B5E1]/20 hover:text-white sm:px-7 sm:py-3.5 sm:text-base"
            >
              Read the Buyer's Guide
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll affordance */}
      <div className="relative z-10 flex justify-center pb-8">
        <div
          aria-hidden="true"
          className="flex flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-[0.32em] text-slate-500"
        >
          <span>Continue</span>
          <span className="h-8 w-px bg-gradient-to-b from-[#28B5E1]/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* ───────── PAGE ───────── */

export default function ErpSoftware() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>ERP Software Solutions UAE | Buyer's Guide, Vendor Matrix and Gartner-style Scorecard | Artiflex IT</title>
        <meta
          name="description"
          content="UAE buyer's guide for ERP software. Vendor matrix and Gartner-style scorecard across SAP S/4HANA, Oracle Fusion / EBS, Microsoft Dynamics 365, Odoo, Sage, Infor and Focus Softnet, with on-prem vs SaaS 7-year TCO analysis."
        />
        <link rel="canonical" href="https://artiflexit.com/business-solutions/erp-software" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Artiflex IT",
            "url": "https://artiflexit.com/business-solutions/erp-software",
            "areaServed": [
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "City", "name": "Dubai" },
              { "@type": "City", "name": "Abu Dhabi" },
            ],
            "description": "Vendor-neutral UAE buyer's guide for ERP software across SAP S/4HANA, Oracle Fusion / EBS, Microsoft Dynamics 365, Odoo, Sage, Infor CloudSuite and Focus Softnet.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "ERP Software Solutions",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description": "UAE ERP software delivery across SAP S/4HANA, Oracle Fusion / EBS, Microsoft Dynamics 365, Odoo, Sage X3, Infor CloudSuite and Focus Softnet: on-premise and private cloud sizing, document automation and 7-year TCO governance.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((f) => ({
              "@type": "Question",
              "name": f.question,
              "acceptedAnswer": { "@type": "Answer", "text": f.answer },
            })),
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "ERP Platforms for UAE Buyers",
            "itemListElement": vendors.map((v, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <ErpSoftwareHero />

      {/* ───────── ERP PLATFORMS WE DELIVER (HONEYCOMB) ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #1B8AC7 1px, transparent 1px), linear-gradient(to bottom, #1B8AC7 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#1B8AC7]/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-[#28B5E1]/10 blur-3xl"
        />

        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              The Vendor Lineup
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
              ERP{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Platforms
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The ERP platforms we implement, customise and operate across UAE projects. Scale, customisation appetite, document-automation maturity and on-prem residency drive the choice.
            </p>
          </div>

          <div className="mt-14 hidden flex-col items-center lg:flex">
            {(() => {
              const layouts: Record<number, number[]> = {
                1: [1], 2: [2], 3: [3], 4: [3, 1], 5: [3, 2],
                6: [3, 3], 7: [4, 3], 8: [4, 4], 9: [5, 4],
                10: [5, 5], 11: [6, 5], 12: [6, 6],
              };
              const sizes =
                layouts[erpVendorList.length] ??
                [Math.ceil(erpVendorList.length / 2), Math.floor(erpVendorList.length / 2)];
              const rows: typeof erpVendorList[] = [];
              let i = 0;
              sizes.forEach((s) => {
                rows.push(erpVendorList.slice(i, i + s));
                i += s;
              });
              const HEX_PATH =
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
              return rows.map((row, rowIdx) => (
                <div
                  key={rowIdx}
                  className="flex"
                  style={{
                    marginTop: rowIdx === 0 ? 0 : -52,
                    transform:
                      rowIdx > 0 && rows[rowIdx - 1].length === row.length
                        ? "translateX(90px)"
                        : undefined,
                  }}
                >
                  {row.map((v) => (
                    <div
                      key={v.slug}
                      aria-label={v.name}
                      className="group relative block h-[208px] w-[180px] transition-all duration-300 hover:z-10 hover:scale-[1.06] [filter:drop-shadow(0_4px_12px_rgba(15,23,42,0.10))] hover:[filter:drop-shadow(0_10px_30px_rgba(40,181,225,0.45))]"
                    >
                      <div
                        className="absolute inset-0 bg-slate-200/80 transition-colors duration-300 group-hover:bg-[#28B5E1]"
                        style={{ clipPath: HEX_PATH }}
                      />
                      <div
                        className="absolute inset-[2px] bg-white transition-all duration-300 group-hover:bg-gradient-to-b group-hover:from-[#28B5E1]/[0.08] group-hover:to-white"
                        style={{ clipPath: HEX_PATH }}
                      />
                      <div className="relative flex h-full flex-col items-center justify-center px-5 text-center">
                        {v.logo ? (
                          <img
                            src={v.logo}
                            alt={v.name}
                            loading="lazy"
                            onError={(e) => {
                              const img = e.currentTarget as HTMLImageElement;
                              img.style.display = "none";
                              const fb = img.nextElementSibling as HTMLElement | null;
                              if (fb) fb.style.removeProperty("display");
                            }}
                            className="h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-110"
                          />
                        ) : null}
                        <p
                          className="font-display text-[13px] font-semibold leading-tight text-slate-900"
                          style={{ display: v.logo ? "none" : "block" }}
                        >
                          {v.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ));
            })()}
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:hidden">
            {erpVendorList.map((v) => (
              <div
                key={v.slug}
                className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/50 hover:shadow-md"
              >
                {v.logo ? (
                  <img
                    src={v.logo}
                    alt={v.name}
                    loading="lazy"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      img.style.display = "none";
                      const fb = img.nextElementSibling as HTMLElement | null;
                      if (fb) fb.style.removeProperty("display");
                    }}
                    className="h-12 w-12 object-contain"
                  />
                ) : null}
                <p
                  className="font-display text-[11px] font-semibold leading-tight text-slate-900"
                  style={{ display: v.logo ? "none" : "block" }}
                >
                  {v.name}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-slate-500">
            <span className="font-semibold text-slate-700">
              {erpVendorList.length} platforms
            </span>
            , picked by scale, customisation appetite and on-prem residency posture.
          </p>
        </div>
      </section>

      {/* ───────── BUYER'S GUIDE, SELECTION FRAMEWORK ───────── */}
      <section id="buyers-guide" className="relative scroll-mt-20 bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              The Buyer's Guide
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Selection framework, the seven questions
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Before any ERP commitment, walk through these questions. Most over-budget UAE ERP projects failed at the customisation phase because the vendor sold SaaS edition limits that did not match the actual business process.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + selectionFramework.length * 116) }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="w-16 px-4 py-5 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">
                      Step
                    </th>
                    <th className="border-l border-white/15 px-2 py-3 sm:px-4 sm:py-5 align-bottom font-display text-sm font-semibold text-white sm:text-base">
                      Question
                    </th>
                    <th className="border-l border-white/15 px-2 py-3 sm:px-4 sm:py-5 align-bottom font-display text-sm font-semibold text-white sm:text-base">
                      What you are nailing down
                    </th>
                    <th className="border-l border-white/15 px-2 py-3 sm:px-4 sm:py-5 align-bottom font-display text-sm font-semibold text-white sm:text-base">
                      Why it matters
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectionFramework.map((r, idx) => (
                    <tr
                      key={r.step}
                      className={`border-t border-[#0A3D6B]/20 transition-colors hover:bg-[#28B5E1]/[0.04] ${
                        idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                      }`}
                    >
                      <td className="px-4 py-4 align-middle font-display text-base font-bold text-[#1B8AC7]">
                        {r.step}
                      </td>
                      <td className="border-l border-[#0A3D6B]/20 px-2 py-3 sm:px-4 sm:py-4 align-middle font-display text-sm font-semibold text-slate-900">
                        {r.question}
                      </td>
                      <td className="border-l border-[#0A3D6B]/20 px-2 py-3 sm:px-4 sm:py-4 align-middle text-xs leading-relaxed text-slate-700 sm:text-sm">
                        {r.capture}
                      </td>
                      <td className="border-l border-[#0A3D6B]/20 px-2 py-3 sm:px-4 sm:py-4 align-middle text-xs leading-relaxed text-slate-700 sm:text-sm">
                        {r.why}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selection criteria checklist */}
          <div className="mx-auto mt-16 max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
                The Checklist
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                Four lenses to size and shortlist against
              </h3>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {checklistGroups.map((g) => (
                <article
                  key={g.title}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1B8AC7]/60 hover:shadow-[0_20px_60px_-12px_rgba(27,138,199,0.20)]"
                >
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#045891] to-[#28B5E1]"
                  />
                  <h4 className="font-display text-lg font-bold text-slate-900">
                    {g.title}
                  </h4>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
                    {g.items.map((it) => (
                      <li key={it} className="flex items-start gap-2">
                        <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1B8AC7]" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── WHY ON-PREMISE STILL WINS (UNIQUE TO BUSINESS SOLUTIONS) ───────── */}
      <section id="on-premise-wins" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
              7-10 Year Horizon
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Why on-premise still wins over a 7-10 year horizon
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              ERP is the deepest software commitment any business makes. The deployment-model decision (on-premise versus SaaS) sets the cost curve for the next decade. Most UAE buyers underestimate how aggressively SaaS subscriptions escalate, how often edition limits force unplanned upgrades, and how much customisation freedom is given up in exchange for the lower year-one cash flow.
            </p>
          </div>

          {/* TCO trap callout */}
          <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border-l-4 border-amber-500 bg-gradient-to-br from-amber-50/80 via-amber-50/40 to-white p-6 shadow-[0_8px_30px_-12px_rgba(245,158,11,0.25)] sm:p-8">
            <div className="flex items-start gap-3 sm:gap-4">
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-700"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                  <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                </svg>
              </span>
              <div>
                <p className="font-display text-sm font-bold text-amber-900 sm:text-base">
                  The TCO trap most UAE buyers do not see at signing
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-[15px]">
                  SaaS looks cheaper in year one because there is no hardware, no licence fee, and no implementation team to budget for upfront. The real cost emerges over years three to ten: per-user subscriptions escalate 8-12 percent annually, mandatory edition upgrades trigger surprise re-platforming costs, and customisation has to be rebuilt against new API versions every release. A modern on-premise deployment, by contrast, capitalises the licence in year one, depreciates the hardware over five to seven years, and runs largely flat thereafter. The cumulative SaaS bill at year seven typically reaches 2.5x to 3.5x the equivalent on-premise commitment for the same user count.
                </p>
              </div>
            </div>
          </div>

          {/* Worked example heading */}
          <div className="mx-auto mt-12 max-w-5xl">
            <h3 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
              A worked example: 100-user UAE distribution and trading company, moderate customisation
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              Cost lines compared head-to-head across the 7-year horizon, with the cumulative TCO row highlighted.
            </p>
          </div>

          {/* TCO comparison table */}
          <div className="mx-auto mt-6 max-w-6xl overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + tcoRows.length * 116) }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="px-4 py-5 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">
                      Cost line
                    </th>
                    <th className="border-l border-white/15 px-2 py-3 sm:px-4 sm:py-5 align-bottom font-display text-sm font-semibold text-white sm:text-base">
                      SaaS (7-year cumulative)
                    </th>
                    <th className="border-l border-white/15 px-2 py-3 sm:px-4 sm:py-5 align-bottom font-display text-sm font-semibold text-white sm:text-base">
                      On-premise (7-year cumulative)
                    </th>
                    <th className="border-l border-white/15 px-2 py-3 sm:px-4 sm:py-5 align-bottom font-display text-sm font-semibold text-white sm:text-base">
                      Difference
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tcoRows.map((r, idx) => (
                    <tr
                      key={r.line}
                      className={`border-t border-[#0A3D6B]/20 transition-colors ${
                        r.highlight
                          ? "bg-gradient-to-r from-[#04101E] to-[#0A3D6B] text-white"
                          : idx % 2 === 0
                            ? "bg-white hover:bg-[#28B5E1]/[0.04]"
                            : "bg-slate-50/60 hover:bg-[#28B5E1]/[0.04]"
                      }`}
                    >
                      <td
                        className={`px-4 py-4 align-middle font-display text-sm font-semibold ${
                          r.highlight ? "text-[#28B5E1]" : "text-slate-900"
                        }`}
                      >
                        {r.line}
                      </td>
                      <td
                        className={`border-l px-4 py-4 align-middle text-xs leading-relaxed sm:text-sm ${
                          r.highlight
                            ? "border-white/10 font-semibold text-white"
                            : "border-[#0A3D6B]/20 text-slate-700"
                        }`}
                      >
                        {r.saas}
                      </td>
                      <td
                        className={`border-l px-4 py-4 align-middle text-xs leading-relaxed sm:text-sm ${
                          r.highlight
                            ? "border-white/10 font-semibold text-white"
                            : "border-[#0A3D6B]/20 text-slate-700"
                        }`}
                      >
                        {r.onPrem}
                      </td>
                      <td
                        className={`border-l px-4 py-4 align-middle text-xs leading-relaxed sm:text-sm ${
                          r.highlight
                            ? "border-white/10 font-bold text-emerald-300"
                            : "border-[#0A3D6B]/20 font-medium text-slate-700"
                        }`}
                      >
                        {r.diff}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mx-auto mt-4 max-w-5xl text-xs leading-relaxed text-slate-500 sm:text-sm">
            Figures are illustrative for a 100-user UAE deployment with moderate customisation; vendor and edition mix will vary. We size against your specific user count, customisation profile and integration scope before any recommendation.
          </p>

          {/* What you gain */}
          <div className="mx-auto mt-16 max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
                What you gain
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                What you gain by keeping it on-premise
              </h3>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {onPremGains.map((g) => (
                <article
                  key={g.title}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1B8AC7]/60 hover:shadow-[0_20px_60px_-12px_rgba(27,138,199,0.20)]"
                >
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#045891] to-[#28B5E1]"
                  />
                  <h4 className="font-display text-lg font-bold text-slate-900">
                    {g.title}
                  </h4>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
                    {g.items.map((it) => (
                      <li key={it} className="flex items-start gap-2">
                        <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1B8AC7]" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── VENDOR COMPARISON, BUYER'S MATRIX ───────── */}
      <section
        id="vendor-matrix"
        className="relative scroll-mt-20 bg-white py-16 sm:py-24"
      >
        <div className="shell">
          <div className="mb-10 text-center sm:mb-12 md:mb-16">
            <h2 className="mx-auto max-w-3xl font-display text-2xl font-bold tracking-tight text-heading sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              Vendor comparison for{" "}
              <span className="gradient-text">ERP Software buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              Seven ERP platforms cover the majority of UAE deployments. SAP and Oracle dominate large enterprise; Microsoft Dynamics 365 and Sage win mid-market; Odoo is the strongest open-source on-prem alternative; Infor leads industry-specific verticals; Focus Softnet is the UAE-grown specialist with deep local support.
            </p>
          </div>

          <div className="mt-8 flex justify-center sm:mt-10">
            <button
              onClick={openContact}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base"
            >
              Talk to our Consultant
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + matrixVendors.length * 116) }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-5 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">
                      Criteria
                    </th>
                    {matrixVendors.map((v) => (
                      <th
                        key={v.name}
                        className="border-l border-white/15 px-2 py-3 sm:px-4 sm:py-5 align-bottom"
                      >
                        {v.recommended && (
                          <span className="mb-1.5 inline-flex items-center gap-1 rounded-full border border-emerald-300/40 bg-emerald-400/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-100">
                            ✓ Recommended
                          </span>
                        )}
                        <p className="font-display text-sm font-semibold text-white sm:text-base">
                          {v.name}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrixRows.map((row, rIdx) => (
                    <tr
                      key={row.label}
                      className={`transition-colors ${
                        row.type === "verdict"
                          ? "border-t-2 border-[#28B5E1]/30 bg-gradient-to-r from-[#04101E] to-[#0A3D6B]"
                          : `border-t border-[#0A3D6B]/20 hover:bg-[#28B5E1]/[0.04] ${
                              rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                            }`
                      }`}
                    >
                      <th
                        scope="row"
                        className={`sticky left-0 z-10 px-2 py-3 align-middle sm:px-4 sm:py-4 font-display text-sm font-semibold ${
                          row.type === "verdict"
                            ? "bg-[#04101E] uppercase tracking-wider text-[#28B5E1]"
                            : `${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"} text-slate-900`
                        }`}
                      >
                        {row.label}
                      </th>
                      {row.cells.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`px-4 py-4 align-middle ${
                            row.type === "verdict"
                              ? "border-l border-white/10 text-slate-300"
                              : "border-l border-[#0A3D6B]/20 text-slate-700"
                          }`}
                        >
                          {row.type === "stars" ? (
                            <div>
                              <span aria-label={`${(cell as StarCell).stars} out of 5`} className="text-amber-500">
                                {"★".repeat((cell as StarCell).stars)}
                                <span className="text-slate-300">
                                  {"★".repeat(5 - (cell as StarCell).stars)}
                                </span>
                              </span>
                              <p className="mt-1 text-xs leading-snug text-slate-600">
                                {(cell as StarCell).note}
                              </p>
                            </div>
                          ) : row.type === "verdict" ? (
                            <div className="space-y-1.5">
                              {(cell as VerdictCell).recommended && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                                  ✓ Recommended
                                </span>
                              )}
                              <p className="text-xs leading-relaxed text-slate-300">
                                {(cell as VerdictCell).text}
                              </p>
                            </div>
                          ) : (
                            <p className="text-xs leading-snug text-slate-700">
                              {cell as string}
                            </p>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mx-auto mt-4 max-w-5xl text-xs leading-relaxed text-slate-500 sm:text-sm">
            On-prem availability matters more than vendor marketing suggests: SAP, Oracle, Microsoft Dynamics 365 Business Central, Odoo, Sage X3 and Focus Softnet all have credible on-prem options that retain customisation depth and data residency.
          </p>
        </div>
      </section>

      {/* ───────── DETAILED VENDOR CARDS & FEATURE RATINGS ───────── */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Detailed Comparison on ERP Platforms
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Strengths, blind spots and the buyer profile each ERP platform was built for. ERP choice typically follows scale, customisation appetite and document-automation maturity more than feature comparison.
            </p>
          </div>

          <div className="mt-6 flex justify-center sm:mt-8">
            <button
              onClick={openContact}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base"
            >
              Talk to our Consultant
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:mt-16 lg:grid-cols-2 lg:items-stretch">
            {vendors.map((v, idx) => {
              const recommended = v.best.includes("Recommended");
              return (
                <motion.div
                  key={v.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="flex h-full"
                >
                  <div
                    className={`group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(4,88,145,0.12)] sm:p-8 ${
                      recommended
                        ? "border-brand-blue/30 shadow-[0_4px_20px_rgba(27,138,199,0.10)]"
                        : "border-border-light shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-brand-blue/25"
                    }`}
                  >
                    {recommended && (
                      <span
                        className="absolute -top-px left-6 inline-flex rounded-b-md bg-brand-blue px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white"
                        aria-label="Recommended vendor"
                      >
                        Recommended
                      </span>
                    )}

                    <div className="flex items-start justify-between gap-4 pt-3">
                      <div className="min-w-0">
                        <h3 className="font-display text-xl font-bold text-heading transition-colors group-hover:text-brand-blue sm:text-2xl">
                          {v.name}
                        </h3>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-brand-blue">
                          {v.best}
                        </p>
                      </div>
                      <img
                        src={v.logo}
                        alt={`${v.name} logo`}
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                        className="h-10 w-24 shrink-0 object-contain object-right sm:h-12 sm:w-32"
                      />
                    </div>

                    <div className="mt-5 space-y-3">
                      <div>
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                          Why it wins
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-body">
                          {v.strength}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                          Consider
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-body/80">
                          {v.watch}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mx-auto mt-12 max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-br from-[#0A3D6B] via-[#04101E] to-[#020617] p-8 text-center shadow-xl shadow-[#1B8AC7]/10 sm:p-12">
            <p className="text-base leading-relaxed text-slate-300 sm:text-lg md:text-xl text-white">
              <span className="font-semibold text-white">Artiflex IT delivers SAP S/4HANA, Oracle Fusion / EBS, Microsoft Dynamics 365, Odoo, Sage X3, Infor CloudSuite and Focus Softnet</span> across UAE projects. <br />
              <span className="text-xs italic text-white sm:text-base">ERP recommendation follows scale, customisation appetite, document-automation maturity and on-prem residency posture, not a vendor preference.</span>
            </p>
          </div>

          {/* Feature ratings */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Scorecard
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each ERP platform is rated across the capabilities that matter most for UAE enterprise deployments, using a standardised tier scale. A gold ★ marker denotes best-in-class performance.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + featureVendors.length * 116) }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-5 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">
                      Capability
                    </th>
                    {featureVendors.map((v) => (
                      <th
                        key={v}
                        className="border-l border-white/15 px-2 py-3 sm:px-4 sm:py-5 align-bottom font-display text-sm font-semibold text-white sm:text-base"
                      >
                        {v}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {featureRows.map((row, rIdx) => (
                    <tr
                      key={row.label}
                      className={`border-t border-[#0A3D6B]/20 transition-colors hover:bg-[#28B5E1]/[0.04] ${
                        rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                      }`}
                    >
                      <th
                        scope="row"
                        className={`sticky left-0 z-10 px-2 py-3 align-middle sm:px-4 sm:py-4 font-display text-sm font-semibold text-slate-900 ${
                          rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"
                        }`}
                      >
                        {row.label}
                      </th>
                      {row.cells.map((cell, cIdx) => {
                        const t = tierStyles[cell.tier];
                        return (
                          <td
                            key={cIdx}
                            className="border-l border-[#0A3D6B]/20 px-2 py-3 sm:px-4 sm:py-4 align-middle"
                          >
                            <span
                              className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${t.bg} ${t.text}`}
                            >
                              {cell.tier === "best" && <span aria-hidden="true">★</span>}
                              {t.label}
                            </span>
                            <p className="mt-1.5 text-xs leading-snug text-slate-600">
                              {cell.note}
                            </p>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legend */}
          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-3 text-xs text-slate-600">
            <span className="font-mono uppercase tracking-wider text-slate-500">Rating scale:</span>
            {(["best", "excellent", "veryStrong", "strong", "good"] as Tier[]).map((t) => {
              const s = tierStyles[t];
              return (
                <span
                  key={t}
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${s.bg} ${s.text}`}
                >
                  {t === "best" && <span aria-hidden="true">★</span>}
                  {s.label}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── DECISION FRAMEWORK QUESTIONS ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(27,138,199,0.06),transparent_60%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              Decision framework
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              The questions that drive the shortlist
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The right ERP for any environment falls out of four honest questions. Walk through these before any vendor demo and the shortlist usually picks itself.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-6xl sm:mt-12">
            <div className="grid grid-cols-1 gap-2 sm:gap-3 md:grid-cols-2">
              {decisionQuestions.map((q) => (
                <div
                  key={q.num}
                  tabIndex={0}
                  className="group relative flex min-h-[5rem] flex-col justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-r from-[#04101E] to-[#0A3D6B] px-4 py-3 shadow-md transition-all duration-300 hover:border-[#28B5E1]/40 hover:shadow-lg focus-within:border-[#28B5E1]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#28B5E1]/40 sm:min-h-[5.5rem] sm:px-5 sm:py-3.5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="font-display text-sm font-semibold leading-snug text-white sm:text-base">
                      {q.title}
                    </h4>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 shrink-0 text-[#28B5E1] transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
                        {q.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── UAE SERVICE & COMMERCIAL NOTES ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              UAE service & commercial notes
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              What changes when you buy ERP in the UAE
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              UAE ERP deployments carry specific compliance, language and operational considerations that change the recommendation versus a generic ERP conversation.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border-l-4 border-[#1B8AC7] bg-gradient-to-br from-[#28B5E1]/[0.06] to-white p-6 shadow-[0_4px_20px_rgba(27,138,199,0.06)] sm:p-8">
            <ul className="space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
              {uaeNotes.map((n) => (
                <li key={n} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1B8AC7]"
                  />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────── WHY ARTIFLEX IT ───────── */}
      <section className="relative overflow-hidden bg-navy-deep py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(27,138,199,0.18),transparent_60%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#28B5E1]">
              Why Artiflex IT
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              14+ years of UAE ERP delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when SAP wins, when Oracle wins, when Microsoft Dynamics, Odoo, Sage, Infor or Focus Softnet wins, and when on-premise beats SaaS. Always a scale-driven and residency-aware sizing before quoting.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years of UAE ERP delivery" },
              { value: "500+", label: "ERP projects, GCC-wide" },
              { value: "7", label: "ERP platforms actively delivered" },
              { value: "24/7", label: "Support coverage" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-sm transition-colors duration-300 hover:border-[#28B5E1]/30"
              >
                <p className="font-display text-3xl font-bold leading-none text-white sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-slate-400 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Vendor coverage
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  SAP S/4HANA, Oracle Fusion Cloud and E-Business Suite, Microsoft Dynamics 365, Odoo, Sage X3 and Sage 300, Infor CloudSuite, and Focus Softnet across UAE and GCC.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Compliance frameworks
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  UAE VAT and FTA e-invoicing, IFRS reporting, UAE PDPL, CBUAE, ADGM, ADHICS and DFSA-aligned designs with documented residency and audit-ready evidence packs.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Coverage area
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  On-site across Dubai, Abu Dhabi and Sharjah. Remote across the UAE, Oman and Saudi Arabia. 24/7 support bench for managed customers.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Engagement model
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Implementation plus managed services plus document-automation, or assessment-only. Existing licensing leverage (SAP, Oracle, Microsoft EA) is part of the design.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#28B5E1] px-6 py-3 font-display text-sm font-semibold text-navy-deep transition-colors hover:bg-white sm:text-base"
            >
              Book Assessment
            </Link>
            <Link
              to="/business-solutions"
              className="inline-flex items-center justify-center rounded-lg border border-white/15 px-6 py-3 font-display text-sm font-medium text-slate-300 transition-colors hover:border-[#28B5E1]/40 hover:text-white sm:text-base"
            >
              Back to Business Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Knowledge Base"
            title={
              <>
                Frequently <span className="gradient-text">asked</span> questions
              </>
            }
            description="What UAE buyers ask us most about choosing ERP platforms, on-premise vs SaaS, and the wider ERP landscape."
            centered
          />

          <div className="mt-12 grid gap-6 sm:mt-14 lg:grid-cols-12 lg:gap-8">
            {/* Questions list (left) */}
            <ul className="flex flex-col gap-2 lg:col-span-6">
              {faqs.map((faq, idx) => {
                const isActive = activeFaq === idx;
                return (
                  <li key={faq.question}>
                    <button
                      type="button"
                      onClick={() => setActiveFaq(idx)}
                      aria-pressed={isActive}
                      aria-controls="faq-answer-panel"
                      className={`group flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-semibold transition-all duration-200 sm:px-5 sm:text-[15px] ${
                        isActive
                          ? "border-transparent bg-gradient-to-r from-[#045891] to-[#1B8AC7] text-white shadow-[0_8px_24px_-8px_rgba(27,138,199,0.55)]"
                          : "border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-[#28B5E1]/60 hover:bg-slate-50 hover:text-[#1B8AC7]"
                      }`}
                    >
                      <span className="leading-snug">{faq.question}</span>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                          isActive ? "translate-x-0.5" : "opacity-50 group-hover:translate-x-0.5 group-hover:opacity-100"
                        }`}
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Answer panel (right) */}
            <div className="lg:col-span-6">
              <div
                id="faq-answer-panel"
                role="region"
                aria-live="polite"
                className="lg:sticky lg:top-24"
              >
                <div className="overflow-hidden rounded-2xl border border-transparent bg-gradient-to-r from-[#045891] to-[#054466] p-6 shadow-[0_18px_40px_-18px_rgba(27,138,199,0.55)] sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-white">
                      Faq
                    </span>
                    <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-white/40 to-transparent" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold leading-snug text-white sm:text-2xl">
                    {faqs[activeFaq].question}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">
                    {faqs[activeFaq].answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <CTASection
        title="Free ERP Assessment"
        description="Free ERP readiness assessment including current platform audit, customisation footprint, document-automation scope, on-prem vs SaaS 7-year TCO calculation, and recommended platform plus deployment model."
        primaryButton={{ text: "Book Assessment", action: "modal" }}
      />
    </>
  );
}
