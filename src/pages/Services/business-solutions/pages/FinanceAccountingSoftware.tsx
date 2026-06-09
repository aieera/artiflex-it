import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";

/* ───────── FINANCE & ACCOUNTING VENDORS (HONEYCOMB) ───────── */

const financeVendorList = [
  { slug: "sap", name: "SAP S/4HANA Finance", logo: "/logos/SAP.svg" },
  { slug: "oracle", name: "Oracle Financials", logo: "/logos/Oracle.png" },
  { slug: "dynamics", name: "Microsoft Dynamics 365 Finance", logo: "/logos/microsoft.svg" },
  { slug: "sage", name: "Sage X3 / Sage 300", logo: "/logos/Sage.png" },
  { slug: "tally", name: "Tally Prime", logo: "/logos/Tally.png" },
  { slug: "quickbooks", name: "QuickBooks Desktop / Online", logo: "/logos/QuickBooks.png" },
  { slug: "focus", name: "Focus Softnet", logo: "/logos/Focus-Softnet.png" },
];

/* ───────── BUYER'S GUIDE, SELECTION FRAMEWORK ───────── */

const selectionFramework = [
  {
    step: "1",
    question: "What is the platform for?",
    capture: "General ledger and statutory reporting, AP / AR automation, asset management, project accounting, consolidation, multi-entity finance",
    why: "Each profile maps to a different platform tier; mid-market estates often combine general accounting with AP automation as the highest-value scope.",
  },
  {
    step: "2",
    question: "User and transaction volume?",
    capture: "Under 10 finance users, 10-50, 50-200, 200+; transactions per month volume",
    why: "Drives platform tier; small operations fit Tally / QuickBooks; mid-market fits Sage / Dynamics / Focus; large enterprise fits SAP / Oracle.",
  },
  {
    step: "3",
    question: "Multi-entity and consolidation?",
    capture: "Single entity, two to five entities, multi-country consolidation, multi-currency at scale",
    why: "Multi-entity consolidation is the biggest dividing line; SAP, Oracle and Dynamics 365 Finance lead; mid-market platforms vary widely.",
  },
  {
    step: "4",
    question: "Deployment model?",
    capture: "On-premise (full ownership and customisation), private cloud, public SaaS, hybrid",
    why: "On-premise keeps all financial data inside the regulatory perimeter; SaaS exposes financial records to third-party data processors and ongoing subscription cost.",
  },
  {
    step: "5",
    question: "Document automation scope?",
    capture: "Manual invoice and receipt handling, partial digital capture, full AP automation (supplier invoices, customer POs, delivery notes, expense receipts) with indexed archive",
    why: "AP automation against finance records is the single biggest finance ROI; on-prem platforms can store unlimited original-document soft copies without per-document SaaS storage surcharge.",
  },
  {
    step: "6",
    question: "UAE VAT and FTA e-invoicing?",
    capture: "VAT-compliant reporting, FTA e-invoicing readiness (phased rollout), reverse-charge mechanism, EmaraTax integration",
    why: "Mandatory; all major platforms now support UAE VAT; FTA e-invoicing is the most immediate compliance pressure and on-prem platforms typically deliver without subscription dependency.",
  },
  {
    step: "7",
    question: "Audit trail and SoD?",
    capture: "Basic audit log, full segregation of duties, role-based access, four-eyes approval, document-level audit trail",
    why: "UAE banking, ADGM, DFSA and listed-entity audit requirements typically demand all of the above; on-prem platforms make these easier to enforce and audit.",
  },
];

/* ───────── SELECTION CRITERIA CHECKLIST ───────── */

const checklistGroups = [
  {
    title: "Technical fit",
    items: [
      "General ledger plus statutory reporting depth",
      "AP / AR / cash management",
      "Multi-entity consolidation",
      "Multi-currency revaluation",
      "Asset management and depreciation",
      "Project accounting and WIP",
    ],
  },
  {
    title: "Operational fit",
    items: [
      "Deployment model flexibility",
      "Document capture and digital archive",
      "Workflow approval and SoD",
      "Bank reconciliation automation",
      "Audit trail and revision history",
    ],
  },
  {
    title: "Commercial fit",
    items: [
      "On-premise perpetual licence",
      "Annual maintenance percentage",
      "Per-user subscription escalation",
      "Customisation cost without edition surcharge",
      "5-year and 10-year TCO",
    ],
  },
  {
    title: "Service fit",
    items: [
      "UAE in-country implementation partner",
      "Arabic-language professional services",
      "UAE VAT and e-invoicing certification",
      "FTA compliance methodology",
      "Long-term support and upgrade path",
    ],
  },
];

/* ───────── TCO TABLE (UNIQUE FINANCE SECTION) ───────── */

const tcoRows: { line: string; saas: string; onprem: string; diff: string; highlight?: boolean }[] = [
  {
    line: "Licensing / subscription",
    saas: "AED 1.4M (per-user per-month escalating 10% annually)",
    onprem: "AED 350K perpetual licence plus 18% annual maintenance",
    diff: "SaaS approximately 3.0x",
  },
  {
    line: "Implementation and configuration",
    saas: "AED 300K-500K",
    onprem: "AED 400K-600K",
    diff: "Comparable",
  },
  {
    line: "Customisation and integration",
    saas: "AED 250K plus rework per release",
    onprem: "AED 200K one-time, retained",
    diff: "SaaS pays repeatedly",
  },
  {
    line: "Infrastructure (servers, storage, DB)",
    saas: "Included in subscription",
    onprem: "AED 200K over 7 years (servers, storage, DB)",
    diff: "Bundled vs CapEx",
  },
  {
    line: "Annual escalation and price increases",
    saas: "10% per year on subscription",
    onprem: "5% on maintenance only",
    diff: "SaaS escalates faster",
  },
  {
    line: "7-year cumulative TCO",
    saas: "AED 2.3M-2.7M",
    onprem: "AED 0.8M-1.0M",
    diff: "SaaS approximately 2.7x-3.0x",
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
    name: "SAP S/4HANA Finance",
    best: "Best for Large Enterprise (Recommended)",
    strength: "SAP since 1972; S/4HANA Finance is the current platform. Reference enterprise multi-entity consolidation, IFRS reporting and UAE VAT plus FTA e-invoicing. OpenText plus SAP DMS for AP automation and document archive. ABAP and BTP enable deep customisation. Largest UAE consulting bench and on-prem S/4HANA Finance plus private cloud deployments retain full data residency.",
    watch: "Premium pricing; SaaS subscription escalates fast over a 5-7 year horizon. Best fit when enterprise scale, multi-country consolidation or regulated reporting drive the decision.",
    logo: "/logos/SAP.svg",
  },
  {
    slug: "oracle",
    name: "Oracle Financials Cloud / EBS",
    best: "Best for Oracle Estates (Recommended)",
    strength: "Oracle Financials since 1989; EBS plus Fusion Cloud editions. Reference enterprise GL, IFRS and multi-entity consolidation. Oracle WebCenter Content for AP archive. PL/SQL deep customisation and EBS Financials on-prem retain data inside the UAE perimeter. Deep UAE consulting and banking heritage.",
    watch: "Premium SaaS pricing escalates with user count; EBS on-prem remains the economic answer for Oracle-aligned estates. Best fit when Oracle Database, integrated supply chain or UAE banking requirements drive the decision.",
    logo: "/logos/Oracle.png",
  },
  {
    slug: "dynamics",
    name: "Microsoft Dynamics 365 Finance",
    best: "Best for Microsoft Mid-market (Recommended)",
    strength: "Microsoft Dynamics Finance and Operations heritage. Strong multi-entity in F&O; Business Central on-prem covers the smaller end. Reference UAE VAT plus FTA e-invoicing. SharePoint plus AP automation for document workflow. AL extensions and Power Platform for customisation. Largest UAE partner network and natural fit for M365-aligned estates.",
    watch: "Online editions move on Microsoft cadence; pricing tied to subscription tier. Best fit when Microsoft EA, M365 estate or Power Platform investment shapes the buying decision.",
    logo: "/logos/microsoft.svg",
  },
  {
    slug: "sage",
    name: "Sage X3 / Sage 300",
    best: "Best for Mid-market On-prem (Recommended)",
    strength: "Sage since 1981; X3 is the mid-market flagship, Sage 300 for small-to-mid. Sage X3 on-prem is the deployment of record for many UAE mid-market manufacturers and distributors. Mid-market GL plus IFRS, multi-entity consolidation and strong customisation framework. UAE VAT and e-invoicing certified. Strong UAE channel.",
    watch: "Less brand visibility than SAP or Oracle in enterprise; best positioned for mid-market with meaningful operations complexity rather than the very high end.",
    logo: "/logos/Sage.png",
  },
  {
    slug: "tally",
    name: "Tally Prime",
    best: "Best SMB On-prem TCO",
    strength: "Tally founded 1986; widely deployed across UAE and India SMB. Native on-prem deployment with the largest UAE / GCC SMB footprint by count. Solid SMB GL, UAE VAT plus FTA e-invoicing native, voucher scan and attach for documents. Best SMB on-prem TCO and the deepest local bookkeeper and accountant talent pool.",
    watch: "Limited multi-entity and customisation for enterprise needs; SMB tool, not designed for 200-plus user environments or multi-country consolidation.",
    logo: "/logos/Tally.png",
  },
  {
    slug: "quickbooks",
    name: "QuickBooks Desktop / Online",
    best: "Best for Small Business",
    strength: "Intuit QuickBooks since 1983; Desktop and Online editions. QuickBooks Desktop on-prem is mature for small business; Online for service businesses without internal IT. UAE VAT capable; FTA e-invoicing via certified middleware. Strong UAE SMB channel and accountant familiarity.",
    watch: "Limited multi-entity (Enterprise tier required), limited customisation, basic receipt capture. Best fit for very small operations (under 10-20 users) with simple finance scope.",
    logo: "/logos/QuickBooks.png",
  },
  {
    slug: "focus",
    name: "Focus Softnet",
    best: "Best UAE Mid-market On-prem (Recommended)",
    strength: "Focus Softnet 1992; UAE-tuned finance suite with the largest UAE on-prem mid-market deployment base. Strong on-prem heritage, multi-entity UAE-aware, native UAE VAT plus FTA e-invoicing, strong document handling and deep UAE-specific customisation. Best UAE mid-market on-prem TCO and a UAE-grown vendor with local roadmap influence.",
    watch: "Smaller global footprint than SAP or Oracle; choose when UAE local depth, on-prem economics and tailored customisation matter more than international parent-group standardisation.",
    logo: "/logos/Focus-Softnet.png",
  },
];

/* ───────── VENDOR MATRIX (BUYER'S MATRIX) ───────── */

const matrixVendors = [
  { name: "SAP S/4HANA Finance", recommended: true, rank: "#1" },
  { name: "Oracle Financials Cloud / EBS", recommended: true },
  { name: "Microsoft Dynamics 365 Finance", recommended: true },
  { name: "Sage X3 / Sage 300", recommended: true },
  { name: "Tally Prime" },
  { name: "QuickBooks Desktop / Online" },
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
      "SAP 1972; S/4HANA Finance current",
      "Oracle Financials since 1989; EBS plus Fusion Cloud",
      "Microsoft Dynamics Finance and Operations heritage",
      "Sage 1981; X3 mid-market, 300 small-to-mid",
      "Tally founded 1986; widely deployed UAE / India SMB",
      "Intuit QuickBooks since 1983; Desktop and Online editions",
      "Focus Softnet 1992; UAE-tuned finance suite",
    ],
  },
  {
    label: "On-prem option",
    type: "stars",
    cells: [
      { stars: 5, note: "S/4HANA Finance on-prem plus private cloud" },
      { stars: 5, note: "EBS Financials on-prem" },
      { stars: 4, note: "Business Central on-prem" },
      { stars: 5, note: "Sage X3 on-prem flagship" },
      { stars: 5, note: "Native on-prem deployment" },
      { stars: 5, note: "QuickBooks Desktop on-prem mature" },
      { stars: 5, note: "Strong on-prem heritage" },
    ],
  },
  {
    label: "Multi-entity consolidation",
    type: "stars",
    cells: [
      { stars: 5, note: "Reference enterprise consolidation" },
      { stars: 5, note: "Reference enterprise consolidation" },
      { stars: 5, note: "Strong multi-entity in F and O" },
      { stars: 4, note: "Mid-market multi-entity" },
      { stars: 3, note: "Limited multi-entity" },
      { stars: 3, note: "Limited multi-entity (Enterprise tier)" },
      { stars: 4, note: "Multi-entity UAE-aware" },
    ],
  },
  {
    label: "UAE VAT and FTA e-invoicing",
    type: "stars",
    cells: [
      { stars: 5, note: "Reference UAE VAT plus e-invoicing" },
      { stars: 5, note: "Reference UAE VAT plus e-invoicing" },
      { stars: 5, note: "Reference UAE VAT plus e-invoicing" },
      { stars: 5, note: "UAE VAT and e-invoicing certified" },
      { stars: 5, note: "UAE VAT plus e-invoicing native" },
      { stars: 4, note: "UAE VAT capable, e-invoicing partner" },
      { stars: 5, note: "UAE VAT plus e-invoicing native" },
    ],
  },
  {
    label: "Document automation / AP archive",
    type: "stars",
    cells: [
      { stars: 5, note: "OpenText plus SAP DMS for AP" },
      { stars: 5, note: "Oracle WebCenter Content" },
      { stars: 4, note: "SharePoint plus AP automation" },
      { stars: 4, note: "Document storage integration" },
      { stars: 4, note: "Voucher scan and attach" },
      { stars: 3, note: "Basic receipt capture" },
      { stars: 5, note: "Strong document handling UAE-tuned" },
    ],
  },
  {
    label: "Customisation depth",
    type: "stars",
    cells: [
      { stars: 5, note: "ABAP, BTP deep customisation" },
      { stars: 5, note: "PL/SQL deep customisation" },
      { stars: 4, note: "AL extensions, Power Platform" },
      { stars: 4, note: "Strong customisation framework" },
      { stars: 3, note: "Limited customisation" },
      { stars: 3, note: "Limited customisation" },
      { stars: 5, note: "Deep UAE-specific customisation" },
    ],
  },
  {
    label: "UAE service depth",
    type: "stars",
    cells: [
      { stars: 5, note: "Largest UAE consulting bench" },
      { stars: 5, note: "Deep UAE consulting" },
      { stars: 5, note: "Largest UAE partner network" },
      { stars: 4, note: "Strong UAE channel" },
      { stars: 5, note: "Widest UAE deployment by count" },
      { stars: 4, note: "Strong UAE SMB channel" },
      { stars: 5, note: "Largest UAE on-prem mid-market" },
    ],
  },
  {
    label: "TCO over 7 years",
    type: "stars",
    cells: [
      { stars: 3, note: "Premium SaaS escalates fast" },
      { stars: 3, note: "Premium SaaS escalates fast" },
      { stars: 4, note: "Strong value bundled with M365" },
      { stars: 4, note: "Strong mid-market value" },
      { stars: 5, note: "Best SMB on-prem TCO" },
      { stars: 4, note: "Strong small-business value" },
      { stars: 5, note: "Best UAE mid-market on-prem TCO" },
    ],
  },
  {
    label: "Best suited for",
    type: "text",
    cells: [
      "Large enterprise, multi-entity multi-country consolidation, regulated reporting",
      "Oracle-aligned estates, UAE banking and complex finance scope",
      "Microsoft EA / M365 mid-market and enterprise estates",
      "Mid-market manufacturers, distributors and services with operations complexity",
      "UAE / GCC SMB with single or light multi-entity needs",
      "Very small business, simple finance scope, accountant-led setup",
      "UAE mid-market with VAT depth, on-prem residency and deep customisation",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "Reference enterprise finance platform; deepest UAE consulting bench, multi-entity consolidation and IFRS reporting." },
      { recommended: true, text: "Reference for Oracle estates and UAE banking; EBS on-prem keeps data inside the regulatory perimeter." },
      { recommended: true, text: "Best for Microsoft-aligned mid-market and enterprise; M365 plus Power Platform extend the suite." },
      { recommended: true, text: "Mid-market on-prem flagship; the natural answer for UAE manufacturers and distributors with operations complexity." },
      { text: "Best SMB on-prem TCO; UAE / GCC SMB footprint and the deepest local accountant talent pool." },
      { text: "Solid for very small operations with simple finance scope; limited beyond 10-20 users." },
      { recommended: true, text: "Best UAE mid-market on-prem TCO; UAE-grown vendor with deep VAT, e-invoicing and customisation." },
    ],
  },
];

/* ───────── GARTNER-STYLE CAPABILITY SCORECARD ───────── */

const featureVendors = [
  "SAP S/4HANA Finance",
  "Oracle Financials Cloud / EBS",
  "Microsoft Dynamics 365 Finance",
  "Sage X3 / Sage 300",
  "Tally Prime",
  "QuickBooks Desktop / Online",
  "Focus Softnet",
];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "General ledger and statutory reporting",
    cells: [
      { tier: "best", note: "Reference enterprise GL plus IFRS" },
      { tier: "best", note: "Reference enterprise GL plus IFRS" },
      { tier: "best", note: "Strong GL plus IFRS" },
      { tier: "excellent", note: "Mid-market GL plus IFRS" },
      { tier: "excellent", note: "Solid SMB GL" },
      { tier: "excellent", note: "SMB GL plus reporting" },
      { tier: "excellent", note: "UAE-tuned GL plus IFRS" },
    ],
  },
  {
    label: "Multi-entity consolidation",
    cells: [
      { tier: "best", note: "Reference enterprise consolidation" },
      { tier: "best", note: "Reference enterprise consolidation" },
      { tier: "best", note: "Strong multi-entity in F and O" },
      { tier: "excellent", note: "Mid-market multi-entity" },
      { tier: "strong", note: "Limited multi-entity" },
      { tier: "strong", note: "Limited multi-entity (Enterprise)" },
      { tier: "excellent", note: "Multi-entity UAE-aware" },
    ],
  },
  {
    label: "UAE VAT and FTA e-invoicing",
    cells: [
      { tier: "best", note: "Reference UAE VAT plus e-invoicing" },
      { tier: "best", note: "Reference UAE VAT plus e-invoicing" },
      { tier: "best", note: "Reference UAE VAT plus e-invoicing" },
      { tier: "best", note: "UAE VAT and e-invoicing certified" },
      { tier: "best", note: "UAE VAT plus e-invoicing native" },
      { tier: "excellent", note: "UAE VAT capable, e-invoicing partner" },
      { tier: "best", note: "UAE VAT plus e-invoicing native" },
    ],
  },
  {
    label: "Document automation and AP archive",
    cells: [
      { tier: "best", note: "OpenText plus SAP DMS" },
      { tier: "best", note: "Oracle WebCenter Content" },
      { tier: "excellent", note: "SharePoint plus AP automation" },
      { tier: "excellent", note: "Document storage integration" },
      { tier: "excellent", note: "Voucher scan and attach" },
      { tier: "strong", note: "Basic receipt capture" },
      { tier: "best", note: "Strong document handling UAE-tuned" },
    ],
  },
  {
    label: "On-prem deployment option",
    cells: [
      { tier: "best", note: "S/4HANA Finance on-prem" },
      { tier: "best", note: "EBS Financials on-prem" },
      { tier: "excellent", note: "Business Central on-prem" },
      { tier: "best", note: "Sage X3 on-prem flagship" },
      { tier: "best", note: "Native on-prem deployment" },
      { tier: "best", note: "QuickBooks Desktop on-prem" },
      { tier: "best", note: "Strong on-prem heritage" },
    ],
  },
  {
    label: "Customisation depth",
    cells: [
      { tier: "best", note: "ABAP, BTP deep customisation" },
      { tier: "best", note: "PL/SQL deep customisation" },
      { tier: "excellent", note: "AL extensions, Power Platform" },
      { tier: "excellent", note: "Strong customisation framework" },
      { tier: "strong", note: "Limited customisation" },
      { tier: "strong", note: "Limited customisation" },
      { tier: "best", note: "Deep UAE-specific customisation" },
    ],
  },
  {
    label: "Audit trail and SoD",
    cells: [
      { tier: "best", note: "Deep audit trail and SoD" },
      { tier: "best", note: "Deep audit trail and SoD" },
      { tier: "excellent", note: "Solid audit and SoD" },
      { tier: "excellent", note: "Mid-market audit and SoD" },
      { tier: "excellent", note: "SMB audit log" },
      { tier: "excellent", note: "SMB audit log" },
      { tier: "excellent", note: "UAE-aware audit and SoD" },
    ],
  },
  {
    label: "7-year TCO economics",
    cells: [
      { tier: "strong", note: "Premium SaaS escalates fast" },
      { tier: "strong", note: "Premium SaaS escalates fast" },
      { tier: "excellent", note: "Strong value bundled with M365" },
      { tier: "excellent", note: "Strong mid-market value" },
      { tier: "best", note: "Best SMB on-prem TCO" },
      { tier: "excellent", note: "Strong small-business value" },
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
    title: "On-prem or SaaS finance?",
    desc: "On-prem wins where data residency, audit-trail control and 7-10 year TCO matter. SaaS wins for SMB without internal IT and for entities where the parent group mandates a specific cloud platform. For UAE mid-market with VAT and FTA compliance and any internal audit function, on-prem is typically the lower-cost answer.",
  },
  {
    num: "02",
    title: "Enterprise or mid-market?",
    desc: "Enterprise (200+ users, multi-entity, multi-country): SAP S/4HANA Finance or Oracle Financials. Mid-market (50-200 users): Microsoft Dynamics 365 Finance, Sage X3, or Focus Softnet. SMB (under 50 users): Tally Prime or QuickBooks Desktop, or Focus Softnet entry edition.",
  },
  {
    num: "03",
    title: "FTA e-invoicing readiness?",
    desc: "All major platforms are now FTA e-invoicing-ready. SAP, Oracle and Microsoft have certified e-invoicing solutions; Tally, Sage and Focus have credible UAE-specific implementations. Confirm certification status and implementation approach before commit.",
  },
  {
    num: "04",
    title: "AP automation as a standalone project?",
    desc: "Often yes. AP automation against the existing finance platform delivers most of the document-automation ROI without a finance-platform refresh. On-premise document archives (SAP DMS, Oracle WebCenter, Focus Softnet) store unlimited supplier invoices without SaaS per-document storage cost.",
  },
];

/* ───────── UAE SERVICE & COMMERCIAL NOTES ───────── */

const uaeNotes = [
  "UAE FTA e-invoicing mandate (phased rollout) is the most immediate compliance pressure; on-prem platforms typically deliver this without subscription dependency.",
  "UAE PDPL, IFRS, CBUAE, DFSA, ADGM and sector frameworks expect documented financial-record retention with audit trail.",
  "Arabic-language invoices, right-to-left reports and Hijri-Gregorian dual-calendar are mandatory for many UAE deployments.",
  "Tally Prime has the largest UAE / GCC SMB on-prem deployment base; Focus Softnet has the largest UAE mid-market on-prem deployment base.",
  "Multi-currency revaluation against AED, USD, EUR and major GCC currencies is the baseline expectation; vendor capability varies materially.",
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "Is on-prem finance software still relevant in 2026?",
    answer:
      "Yes, particularly for UAE mid-market and enterprise with VAT, FTA e-invoicing, IFRS reporting and sector-specific compliance. On-premise platforms keep all financial records inside the regulatory perimeter, allow database-level audit-trail access, and avoid the per-record storage and subscription escalation of SaaS. The economics still favour on-prem for any business above 25 users with meaningful customisation.",
  },
  {
    question: "How does FTA e-invoicing compliance work on-prem?",
    answer:
      "All major on-prem finance platforms (SAP, Oracle, Microsoft, Sage, Tally, Focus Softnet) have UAE-FTA-compliant e-invoicing modules that generate, sign and report the structured e-invoice format mandated by the FTA. On-prem keeps the e-invoice repository inside your data centre without dependency on a SaaS vendor's cloud uptime.",
  },
  {
    question: "Tally Prime or Focus Softnet for UAE SMB?",
    answer:
      "Tally Prime dominates UAE / GCC SMB by deployment count, with the largest community of bookkeepers and accountants trained on it. Focus Softnet wins for UAE mid-market with deeper customisation, full ERP scope and stronger local support. SMB starts with Tally; mid-market grows into Focus or Sage X3.",
  },
  {
    question: "Can we run QuickBooks Desktop in the UAE for VAT compliance?",
    answer:
      "QuickBooks Desktop Enterprise has UAE VAT capability via local partners and add-ons; FTA e-invoicing is via certified middleware. For very small operations (under 10 users) it remains viable. For any operation above 20 users or with multi-entity needs, UAE-native platforms (Tally Prime, Focus Softnet, Sage 300) typically fit better.",
  },
  {
    question: "What is the typical UAE finance deployment timeline?",
    answer:
      "SMB (under 25 users, single entity): 4 to 8 weeks including VAT setup. Mid-market (25-100 users, light customisation): 3 to 6 months. Enterprise (100+ users, multi-entity, FTA e-invoicing, IFRS reporting): 6 to 12 months. AP automation layered on top: 2 to 4 months. Year-end go-live (1 January or 1 April) is the typical target.",
  },
  {
    question: "Is Artiflex IT tied to a single finance vendor?",
    answer:
      "No. We deliver SAP S/4HANA Finance, Oracle Financials, Microsoft Dynamics 365 Finance, Sage X3 and Sage 300, Tally Prime, QuickBooks Desktop and Focus Softnet across UAE projects. Vendor recommendation follows scale, deployment posture, customisation appetite and 7-year TCO, not the inventory.",
  },
  {
    question: "How is AP automation typically scoped on top of finance software?",
    answer:
      "AP automation pairs the finance platform with document capture (scan, email, OCR), supplier-invoice indexing, three-way matching against PO and GRN, workflow approvals with SoD, and posting to the ledger. On-prem document archives (SAP DMS, Oracle WebCenter, Focus Softnet) avoid per-document SaaS storage surcharges and keep originals inside the regulatory perimeter.",
  },
  {
    question: "Can you migrate from QuickBooks or Tally to a mid-market platform?",
    answer:
      "Yes. Master data (chart of accounts, customers, suppliers, items), opening balances and historical transactions migrate with documented mapping. Year-end is the natural cutover; parallel run for one to three months is standard. Multi-entity, multi-currency and customisation requirements drive the target-platform choice.",
  },
];

/* ───────── HERO ───────── */

function FinanceAccountingHero() {
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
                <span className="font-medium text-[#28B5E1]">Finance &amp; Accounting</span>
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
            Finance &amp;{" "}
            <span className="gradient-text">Accounting</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Buyer's Guide, Vendor Matrix and Gartner-style Scorecard
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            A UAE buyer's guide for finance and accounting software. Honest comparisons across <span className="font-semibold text-white">SAP S/4HANA Finance, Oracle Financials, Microsoft Dynamics 365 Finance, Sage X3, Tally Prime, QuickBooks Desktop and Focus Softnet</span>, with a Gartner-style scorecard and a 7-year on-prem vs SaaS TCO analysis grounded in UAE deployments.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={openContact}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base"
            >
              Free Finance Software Assessment
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
              Compare Finance Platforms
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

export default function FinanceAccountingSoftware() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Finance &amp; Accounting Software UAE | Buyer's Guide, Vendor Matrix and Gartner-style Scorecard | Artiflex IT</title>
        <meta
          name="description"
          content="UAE buyer's guide for finance and accounting software. Vendor matrix and Gartner-style scorecard across SAP S/4HANA Finance, Oracle Financials, Microsoft Dynamics 365 Finance, Sage X3, Tally Prime, QuickBooks Desktop and Focus Softnet, with on-prem TCO analysis."
        />
        <link rel="canonical" href="https://artiflexit.com/business-solutions/finance-accounting-software" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Artiflex IT",
            "url": "https://artiflexit.com/business-solutions/finance-accounting-software",
            "areaServed": [
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "City", "name": "Dubai" },
              { "@type": "City", "name": "Abu Dhabi" },
            ],
            "description": "Vendor-neutral UAE buyer's guide for finance and accounting software across SAP, Oracle, Microsoft Dynamics, Sage, Tally Prime, QuickBooks and Focus Softnet.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Finance & Accounting Software Solutions",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description": "UAE finance and accounting software delivery across SAP S/4HANA Finance, Oracle Financials, Microsoft Dynamics 365 Finance, Sage X3, Tally Prime, QuickBooks and Focus Softnet: VAT and e-invoicing readiness, multi-entity consolidation and 7-year TCO governance.",
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
            "name": "Finance & Accounting Software for UAE Buyers",
            "itemListElement": vendors.map((v, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <FinanceAccountingHero />

      {/* ───────── FINANCE PLATFORMS WE DELIVER (HONEYCOMB) ───────── */}
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
              Finance &amp; Accounting{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Platforms
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The finance and accounting platforms we design, deploy and operate across UAE projects. Scale, multi-entity scope, deployment model and 7-year TCO drive the choice.
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
                layouts[financeVendorList.length] ??
                [Math.ceil(financeVendorList.length / 2), Math.floor(financeVendorList.length / 2)];
              const rows: typeof financeVendorList[] = [];
              let i = 0;
              sizes.forEach((s) => {
                rows.push(financeVendorList.slice(i, i + s));
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
            {financeVendorList.map((v) => (
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
              {financeVendorList.length} platforms
            </span>
            , picked by scale, deployment posture, customisation appetite and 7-year TCO.
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
              Before any finance platform commitment, walk through these questions. Most over-budget finance software projects underestimated VAT and e-invoicing compliance scope, or assumed SaaS economics that worsen materially over a five to seven year horizon.
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

      {/* ───────── WHY ON-PREMISE STILL WINS (UNIQUE TCO SECTION) ───────── */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              The Real TCO
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Why On-Premise Still Wins Over a 7-10 Year Horizon
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Finance software has the lowest tolerance for hidden cost. UAE businesses are typically pricing the on-prem versus SaaS decision in year one only and missing the cumulative impact of subscription escalation, edition-driven customisation surcharges, and the per-document storage cost that SaaS platforms apply to invoice and receipt archives. Over 7 years, SaaS finance often costs 3x the equivalent on-prem deployment.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-5xl rounded-2xl border-l-4 border-amber-500 bg-gradient-to-br from-amber-50 to-white p-6 shadow-[0_4px_20px_rgba(245,158,11,0.08)] sm:p-8">
            <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
              <span className="font-semibold text-slate-900">The TCO trap most UAE buyers do not see at signing.</span> SaaS looks cheaper in year one because there is no hardware, no licence fee, and no implementation team to budget for upfront. The real cost emerges over years three to ten: per-user subscriptions escalate 8-12 percent annually, mandatory edition upgrades trigger surprise re-platforming costs, and customisation has to be rebuilt against new API versions every release. A modern on-premise deployment, by contrast, capitalises the licence in year one, depreciates the hardware over five to seven years, and runs largely flat thereafter. The cumulative SaaS bill at year seven typically reaches 2.5x to 3.5x the equivalent on-premise commitment for the same user count.
            </p>
          </div>

          <h3 className="mx-auto mt-12 max-w-4xl text-center font-display text-xl font-bold text-slate-900 sm:text-2xl">
            A worked example: 50-user UAE trading and services company, multi-entity (2 entities), moderate customisation
          </h3>

          <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + tcoRows.length * 116) }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#04101E] to-[#0A3D6B]">
                    <th className="px-4 py-5 align-bottom font-display text-sm font-semibold text-white sm:text-base">
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
                          ? "bg-gradient-to-r from-emerald-50 to-emerald-100/40"
                          : idx % 2 === 0
                          ? "bg-white hover:bg-[#28B5E1]/[0.04]"
                          : "bg-slate-50/60 hover:bg-[#28B5E1]/[0.04]"
                      }`}
                    >
                      <td
                        className={`px-4 py-4 align-middle text-sm ${
                          r.highlight ? "font-display font-bold text-emerald-900" : "font-display font-semibold text-slate-900"
                        }`}
                      >
                        {r.line}
                      </td>
                      <td
                        className={`border-l border-[#0A3D6B]/20 px-2 py-3 sm:px-4 sm:py-4 align-middle text-xs leading-relaxed sm:text-sm ${
                          r.highlight ? "font-semibold text-emerald-900" : "text-slate-700"
                        }`}
                      >
                        {r.saas}
                      </td>
                      <td
                        className={`border-l border-[#0A3D6B]/20 px-2 py-3 sm:px-4 sm:py-4 align-middle text-xs leading-relaxed sm:text-sm ${
                          r.highlight ? "font-semibold text-emerald-900" : "text-slate-700"
                        }`}
                      >
                        {r.onprem}
                      </td>
                      <td
                        className={`border-l border-[#0A3D6B]/20 px-2 py-3 sm:px-4 sm:py-4 align-middle text-xs leading-relaxed sm:text-sm ${
                          r.highlight ? "font-bold text-emerald-900" : "text-slate-700"
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

          <p className="mx-auto mt-4 max-w-4xl text-center text-xs leading-relaxed text-slate-500 sm:text-sm">
            Figures are illustrative for a 100-user UAE deployment with moderate customisation; vendor and edition mix will vary. We size against your specific user count, customisation profile and integration scope before any recommendation.
          </p>

          <h3 className="mt-16 text-center font-display text-2xl font-bold text-slate-900 sm:text-3xl">
            What you gain by keeping it on-premise
          </h3>

          <div className="mx-auto mt-10 grid max-w-6xl gap-5 sm:grid-cols-2">
            {onPremGains.map((g) => (
              <article
                key={g.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1B8AC7]/60 hover:shadow-[0_20px_60px_-12px_rgba(27,138,199,0.20)] sm:p-7"
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
              <span className="gradient-text">Finance &amp; Accounting buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              Seven finance platforms cover the majority of UAE deployments. SAP and Oracle lead large-enterprise multi-entity consolidation; Microsoft Dynamics 365 Finance and Sage X3 win mid-market; Tally Prime dominates UAE SMB by volume; QuickBooks Desktop serves small business; Focus Softnet is the UAE-grown specialist with deep local VAT depth.
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

          <p className="mx-auto mt-6 max-w-4xl text-center text-xs leading-relaxed text-slate-500 sm:text-sm">
            On-premise availability remains material in this category. SAP S/4HANA Finance, Oracle EBS, Sage X3, Tally Prime, QuickBooks Desktop and Focus Softnet all retain credible on-prem deployments that keep finance data inside the UAE regulatory perimeter.
          </p>
        </div>
      </section>

      {/* ───────── DETAILED VENDOR CARDS & FEATURE RATINGS ───────── */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Detailed Comparison on Finance &amp; Accounting Platforms
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Strengths, blind spots and the buyer profile each platform was built for. Finance software choice typically follows scale, deployment posture, customisation appetite and 7-year TCO more than feature comparison.
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
              <span className="font-semibold text-white">Artiflex IT delivers SAP S/4HANA Finance, Oracle Financials, Microsoft Dynamics 365 Finance, Sage X3, Tally Prime, QuickBooks Desktop and Focus Softnet</span> across UAE projects. <br />
              <span className="text-xs italic text-white sm:text-base">Platform recommendation follows scale, deployment posture, customisation appetite and 7-year TCO, not a vendor preference.</span>
            </p>
          </div>

          {/* Feature ratings */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Scorecard
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each platform is rated across the capabilities that matter most for UAE finance and accounting, using a standardised tier scale. A gold ★ marker denotes best-in-class performance.
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
              The right vendor for any environment falls out of four honest questions. Walk through them before any vendor demo and the shortlist usually picks itself.
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
              UAE service &amp; commercial notes
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              What changes when you buy finance software in the UAE
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              UAE finance software carries specific VAT, FTA e-invoicing, IFRS and sector-framework considerations that change the recommendation versus a generic finance platform conversation.
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
              14+ years of UAE finance software delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when SAP wins, when Oracle wins, when Microsoft Dynamics, Sage, Tally, QuickBooks or Focus Softnet wins, and when on-prem beats SaaS for your specific scope. Always a workload-driven and compliance-aware sizing before quoting.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years finance software delivery" },
              { value: "500+", label: "Projects delivered, GCC-wide" },
              { value: "7", label: "Platforms actively delivered" },
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
                  SAP S/4HANA Finance, Oracle Financials Cloud and EBS, Microsoft Dynamics 365 Finance and Business Central, Sage X3 and Sage 300, Tally Prime, QuickBooks Desktop and Online, Focus Softnet.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Compliance frameworks
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  UAE VAT, FTA e-invoicing, IFRS, UAE PDPL, NESA, CBUAE, ADGM, DFSA and ADHICS-aligned designs with audit-ready evidence packs.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Coverage area
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  On-site across Dubai, Abu Dhabi and Sharjah. Remote across the UAE, Oman and Saudi Arabia. 24/7 finance-operations bench for managed customers.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Engagement model
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Implementation plus managed support plus AP automation, or assessment-only. 7-year on-prem vs SaaS TCO modelling is part of the design.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#28B5E1] px-6 py-3 font-display text-sm font-semibold text-navy-deep transition-colors hover:bg-white sm:text-base"
            >
              Book a free finance assessment
            </Link>
            <Link
              to="/business-solutions"
              className="inline-flex items-center justify-center rounded-lg border border-white/15 px-6 py-3 font-display text-sm font-medium text-slate-300 transition-colors hover:border-[#28B5E1]/40 hover:text-white sm:text-base"
            >
              Back to Business Solutions →
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
            description="What UAE buyers ask us most about choosing finance and accounting software across SAP, Oracle, Microsoft, Sage, Tally, QuickBooks and Focus Softnet."
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
        title="Free Finance Software Assessment"
        description="Free finance software readiness assessment including VAT and FTA e-invoicing posture, multi-entity scope, AP-automation gap, 7-year on-prem vs SaaS TCO and recommended platform plus deployment model."
        primaryButton={{ text: "Book Assessment", action: "modal" }}
      />
    </>
  );
}
