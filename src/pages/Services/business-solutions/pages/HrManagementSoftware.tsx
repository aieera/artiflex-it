import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";

/* ───────── HRM VENDORS (HONEYCOMB) ───────── */

const hrmVendorList = [
  { slug: "sap", name: "SAP SuccessFactors", logo: "/logos/SAP.svg" },
  { slug: "oracle", name: "Oracle HCM Cloud", logo: "/logos/Oracle.png" },
  { slug: "dynamics365hr", name: "Microsoft Dynamics 365 HR", logo: "/logos/microsoft.svg" },
  { slug: "ramco", name: "Ramco HCM", logo: "/logos/Ramco.png" },
  { slug: "zoho-people", name: "Zoho People", logo: "/logos/Zoho.png" },
  { slug: "bayzat", name: "Bayzat", logo: "/logos/Bayzat.png" },
  { slug: "focus-softnet", name: "Focus Softnet HRMS", logo: "/logos/Focus-Softnet.png" },
];

/* ───────── BUYER'S GUIDE, SELECTION FRAMEWORK ───────── */

const selectionFramework = [
  {
    step: "1",
    question: "What is the HRM for?",
    capture: "Core HR records and personal data, payroll plus WPS, performance management, learning and development, recruitment and onboarding, time and attendance, or a mixed model",
    why: "Each profile maps to natural platform strengths; payroll-plus-WPS-heavy estates favour UAE-local platforms (Bayzat, Focus, Ramco); core HR plus performance favour SuccessFactors, Workday, Dynamics 365 HR.",
  },
  {
    step: "2",
    question: "Headcount?",
    capture: "Under 50, 50-250, 250-1000, or 1000+ employees",
    why: "Drives platform tier; under-50 fits SaaS SMB platforms (Bayzat, Zoho People); 1000+ needs enterprise platforms (SuccessFactors, Workday, Oracle HCM).",
  },
  {
    step: "3",
    question: "Payroll and WPS scope?",
    capture: "Outsourced payroll, payroll inside HRM, or full WPS plus end-of-service plus pension contribution",
    why: "UAE-localised payroll plus WPS is mandatory for any in-country employer; vendor capability varies materially and is the single biggest fail point for global platforms.",
  },
  {
    step: "4",
    question: "Deployment model?",
    capture: "On-premise (full ownership, all employee data on-site), private cloud, public SaaS, or hybrid",
    why: "Employee data residency under UAE PDPL is a real compliance consideration; on-premise eliminates third-party processor agreements.",
  },
  {
    step: "5",
    question: "Document automation scope?",
    capture: "Manual employee-file handling, partial digital records, or full digital employee file (passport, Emirates ID, visa, contract, signed letters, payslips) indexed and retained",
    why: "Employee-file automation is the single biggest HRM ROI; on-prem HRMs can store unlimited employee documents without per-document SaaS surcharge or storage tier limits.",
  },
  {
    step: "6",
    question: "UAE-specific compliance?",
    capture: "WPS payroll, end-of-service gratuity, GPSSA / DEWS pension, MOHRE labour law, Hijri-calendar holidays, Emirates ID validation, visa renewal tracking",
    why: "Coverage varies materially; UAE-local platforms (Bayzat, Focus Softnet HR, Ramco HCM) have the deepest native support; global platforms vary.",
  },
  {
    step: "7",
    question: "Integration scope?",
    capture: "Standalone HRM, HRM plus ERP, HRM plus access control / attendance, or HRM plus banking for WPS",
    why: "Integration depth matters; UAE-local platforms typically have pre-built WPS bank connectors and biometric attendance integration.",
  },
];

/* ───────── SELECTION CRITERIA CHECKLIST ───────── */

const checklistGroups = [
  {
    title: "Technical fit",
    items: [
      "Core HR plus employee master data",
      "UAE payroll and WPS compliance",
      "Performance management plus appraisals",
      "Learning management",
      "Recruitment and onboarding",
      "Time and attendance integration",
      "Self-service and mobile",
    ],
  },
  {
    title: "Operational fit",
    items: [
      "Deployment model flexibility",
      "Employee document archive",
      "Workflow approval depth",
      "Multi-language plus Arabic",
      "Audit trail and PDPL compliance",
    ],
  },
  {
    title: "Commercial fit",
    items: [
      "On-premise perpetual licence",
      "Per-employee subscription escalation",
      "Customisation cost without surcharge",
      "5-year and 10-year TCO",
      "Employee-document storage cost",
    ],
  },
  {
    title: "Service fit",
    items: [
      "UAE in-country implementation partner",
      "Arabic-language professional services",
      "WPS and payroll certification",
      "MOHRE and GPSSA compliance methodology",
      "Long-term support and upgrade path",
    ],
  },
];

/* ───────── TCO TABLE (UNIQUE TO HRM) ───────── */

type TcoRow = { line: string; saas: string; onprem: string; diff: string; highlight?: boolean };

const tcoRows: TcoRow[] = [
  {
    line: "Licensing / subscription",
    saas: "AED 1.8M (per-employee per-month escalating 10% annually)",
    onprem: "AED 450K perpetual licence plus 20% annual maintenance",
    diff: "SaaS approximately 2.7x",
  },
  {
    line: "Implementation and configuration",
    saas: "AED 350K-500K",
    onprem: "AED 450K-650K",
    diff: "Comparable",
  },
  {
    line: "Customisation and integration",
    saas: "AED 300K plus rework per release",
    onprem: "AED 250K one-time, retained",
    diff: "SaaS pays repeatedly",
  },
  {
    line: "Infrastructure (servers, storage, DB)",
    saas: "Included in subscription",
    onprem: "AED 200K over 7 years (servers, storage)",
    diff: "Bundled vs CapEx",
  },
  {
    line: "Annual escalation and price increases",
    saas: "10% per year plus per-document storage tier",
    onprem: "5% on maintenance only",
    diff: "SaaS escalates faster",
  },
  {
    line: "7-year cumulative TCO",
    saas: "AED 2.7M-3.2M",
    onprem: "AED 1.0M-1.3M",
    diff: "SaaS approximately 2.6x-3.0x",
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
    name: "SAP SuccessFactors",
    best: "Best for Enterprise Performance & Global Multinationals (Recommended)",
    strength: "SAP SuccessFactors acquired 2011; reference enterprise HRM with the deepest performance management, learning management and succession planning depth. Best fit for global multinationals running on SAP S/4HANA where SuccessFactors integrates natively. Strong document-generation capability and the largest UAE SAP consulting ecosystem.",
    watch: "Cloud-only; UAE WPS payroll requires partner add-on localisation rather than native coverage. Premium SaaS pricing escalates over 7 years; best when the global SAP relationship and performance depth justify the spend.",
    logo: "/logos/SAP.svg",
  },
  {
    slug: "oracle",
    name: "Oracle HCM Cloud / EBS HR",
    best: "Best for Oracle Estates & UAE Government (Recommended)",
    strength: "Oracle HCM Cloud since 2011; Oracle EBS HR remains the long-life on-prem option. Oracle Payroll for UAE is one of the few global platforms with WPS natively built in rather than via partner. Strong performance plus learning, deep documents-of-record functionality and deep UAE Oracle consulting presence including government and banking.",
    watch: "Premium SaaS economics escalate over 7 years; EBS HR is a managed-decline product and requires careful upgrade-path planning. Best fit when Oracle ERP, Oracle Database or UAE government residency is decisive.",
    logo: "/logos/Oracle.png",
  },
  {
    slug: "dynamics365hr",
    name: "Microsoft Dynamics 365 HR",
    best: "Best for Microsoft-Aligned Mid-Market (Recommended)",
    strength: "Microsoft Dynamics 365 HR (previously Talent) is the current variant; deeply integrated with Microsoft 365, Teams and Power Platform. SharePoint plus Power Automate gives strong document automation for employee files. Better 7-year economics when Microsoft 365 is already bundled; largest UAE Microsoft partner network for delivery.",
    watch: "Cloud-only; UAE WPS payroll requires partner localisation. Performance depth is solid rather than reference; pick when the Microsoft estate and mid-market scale tip the balance.",
    logo: "/logos/microsoft.svg",
  },
  {
    slug: "ramco",
    name: "Ramco HCM",
    best: "Best for UAE Payroll & WPS Depth (Recommended)",
    strength: "Ramco founded 1989 India; UAE-localised HCM with both cloud and on-prem deployment available, making it the strongest hybrid option in the matrix. Reference UAE payroll and WPS depth: end-of-service gratuity accuracy, GPSSA pension, MOHRE labour-law compliance and Hijri-calendar handling are native. Strong document automation and direct UAE presence plus a strong channel.",
    watch: "Performance management depth is capable rather than reference; global multinational deployments often default to SuccessFactors. Best when UAE-native payroll plus WPS plus deployment flexibility (cloud or on-prem) is decisive.",
    logo: "/logos/Ramco.png",
  },
  {
    slug: "zoho-people",
    name: "Zoho People",
    best: "Best SaaS SMB TCO",
    strength: "Zoho People with a large SMB HRM footprint across UAE and GCC. Best 7-year SaaS SMB TCO in the matrix; UAE payroll plus WPS support through Zoho Payroll with UAE-specific configuration. Zoho WorkDrive integration for employee documents and wide UAE / GCC SMB presence make it credible for under-100-employee deployments.",
    watch: "Performance review capability is solid rather than reference; light on enterprise localisation depth. Best fit for SMB without internal IT prioritising rapid deployment and predictable per-employee economics.",
    logo: "/logos/Zoho.png",
  },
  {
    slug: "bayzat",
    name: "Bayzat",
    best: "Best for UAE SMB (UAE-Grown)",
    strength: "Bayzat founded 2013 UAE; UAE-grown cloud HRM with native UAE WPS, end-of-service gratuity, GPSSA and Emirates ID handling built in rather than added on. Strong self-service mobile experience tuned for UAE employee expectations, built-in employee documents and direct UAE support. Health-insurance integration is unique in the matrix.",
    watch: "Cloud-only; light performance management depth and limited fit for large multi-entity enterprise scope. Best for UAE SMB and mid-market employers prioritising native UAE compliance and SaaS simplicity.",
    logo: "/logos/Bayzat.png",
  },
  {
    slug: "focus-softnet",
    name: "Focus Softnet HRMS",
    best: "Best UAE Mid-Market On-Prem TCO",
    strength: "Focus Softnet HRMS since 1992; UAE-tuned full HRM with the strongest on-prem heritage in the matrix. Native UAE WPS plus end-of-service gratuity, native MOHRE handling and strong UAE-tuned document handling. Best UAE mid-market on-prem TCO over a 7-year horizon when employee data residency and customisation depth matter. Largest UAE on-prem HRM mid-market footprint.",
    watch: "Performance and learning are solid rather than reference; cloud roadmap is growing rather than dominant. Best when UAE PDPL residency, on-prem deployment and lifecycle TCO are decisive.",
    logo: "/logos/Focus-Softnet.png",
  },
];

/* ───────── VENDOR MATRIX (BUYER'S MATRIX) ───────── */

const matrixVendors = [
  { name: "SAP SuccessFactors", recommended: true, rank: "#1" },
  { name: "Oracle HCM Cloud / EBS HR", recommended: true },
  { name: "Microsoft Dynamics 365 HR", recommended: true },
  { name: "Ramco HCM", recommended: true },
  { name: "Zoho People" },
  { name: "Bayzat" },
  { name: "Focus Softnet HRMS" },
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
      "SAP SuccessFactors acquired 2011; reference enterprise HRM",
      "Oracle HCM Cloud since 2011; EBS HR legacy on-prem",
      "Microsoft Dynamics 365 HR (was Talent); current variant",
      "Ramco 1989 India; UAE-localised HCM, cloud and on-prem",
      "Zoho People; large SMB HRM footprint",
      "Bayzat 2013 UAE; UAE-grown cloud HRM",
      "Focus Softnet HRMS 1992; UAE-tuned full HRM",
    ],
  },
  {
    label: "On-prem option",
    type: "stars",
    cells: [
      { stars: 3, note: "Cloud-only (legacy SAP HR on-prem retired path)" },
      { stars: 4, note: "Oracle EBS HR on-prem retains" },
      { stars: 3, note: "Cloud-only" },
      { stars: 5, note: "Cloud and on-prem both available" },
      { stars: 3, note: "Cloud-only" },
      { stars: 3, note: "Cloud-only" },
      { stars: 5, note: "Strong on-prem heritage" },
    ],
  },
  {
    label: "UAE WPS and payroll",
    type: "stars",
    cells: [
      { stars: 4, note: "WPS via partner add-on" },
      { stars: 4, note: "WPS native (Oracle Payroll for UAE)" },
      { stars: 4, note: "WPS via partner localisation" },
      { stars: 5, note: "Reference UAE payroll and WPS" },
      { stars: 4, note: "UAE payroll plus WPS support" },
      { stars: 5, note: "UAE WPS native, deep UAE compliance" },
      { stars: 5, note: "UAE WPS plus end-of-service native" },
    ],
  },
  {
    label: "End-of-service gratuity, MOHRE, GPSSA",
    type: "stars",
    cells: [
      { stars: 3, note: "Via partner localisation" },
      { stars: 4, note: "Localised in Oracle Payroll" },
      { stars: 3, note: "Via partner localisation" },
      { stars: 5, note: "Reference UAE gratuity plus GPSSA" },
      { stars: 4, note: "Strong UAE coverage" },
      { stars: 5, note: "UAE-native gratuity, GPSSA" },
      { stars: 5, note: "UAE-native gratuity, MOHRE" },
    ],
  },
  {
    label: "Document automation / employee file",
    type: "stars",
    cells: [
      { stars: 4, note: "SuccessFactors Document Generation" },
      { stars: 4, note: "Oracle Documents of Record" },
      { stars: 4, note: "SharePoint plus Power Automate" },
      { stars: 5, note: "Strong document automation" },
      { stars: 4, note: "Zoho WorkDrive integration" },
      { stars: 4, note: "Built-in employee documents" },
      { stars: 5, note: "Strong UAE-tuned document handling" },
    ],
  },
  {
    label: "Performance and learning",
    type: "stars",
    cells: [
      { stars: 5, note: "Reference enterprise performance" },
      { stars: 5, note: "Strong performance plus learning" },
      { stars: 4, note: "Solid performance management" },
      { stars: 4, note: "Performance plus learning capable" },
      { stars: 4, note: "Performance review capable" },
      { stars: 3, note: "Light performance" },
      { stars: 4, note: "Solid performance UAE-tuned" },
    ],
  },
  {
    label: "UAE service depth",
    type: "stars",
    cells: [
      { stars: 5, note: "Largest UAE SAP consulting" },
      { stars: 5, note: "Deep UAE Oracle consulting" },
      { stars: 5, note: "Largest UAE Microsoft network" },
      { stars: 5, note: "Direct UAE plus strong channel" },
      { stars: 5, note: "Wide UAE / GCC SMB presence" },
      { stars: 5, note: "UAE-grown, direct support" },
      { stars: 5, note: "Largest UAE on-prem mid-market" },
    ],
  },
  {
    label: "TCO over 7 years",
    type: "stars",
    cells: [
      { stars: 3, note: "Premium SaaS escalates" },
      { stars: 3, note: "Premium SaaS escalates" },
      { stars: 4, note: "Better when M365 bundled" },
      { stars: 4, note: "Strong value; flexible deploy" },
      { stars: 5, note: "Best SaaS SMB TCO" },
      { stars: 4, note: "Competitive SMB SaaS" },
      { stars: 5, note: "Best UAE mid-market on-prem TCO" },
    ],
  },
  {
    label: "Best suited for",
    type: "text",
    cells: [
      "Global multinationals with deep SAP estates and performance-management depth",
      "Oracle ERP estates and UAE government / banking deployments",
      "Microsoft-aligned mid-market with bundled M365 economics",
      "UAE enterprise prioritising native WPS and deployment flexibility",
      "SMB and mid-market wanting the best SaaS SMB TCO",
      "UAE SMB prioritising native UAE compliance and SaaS simplicity",
      "UAE mid-market prioritising on-prem residency and lifecycle TCO",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "Reference enterprise HRM; deepest performance management and global SAP-aligned multinational fit." },
      { recommended: true, text: "Best for Oracle estates and UAE government; Oracle Payroll has native UAE WPS." },
      { recommended: true, text: "Best for Microsoft-aligned mid-market; M365 bundling materially improves 7-year economics." },
      { recommended: true, text: "Reference UAE payroll plus WPS depth; only platform with both cloud and on-prem deployment." },
      { text: "Best SaaS SMB TCO; credible for UAE under-100 deployments." },
      { text: "UAE-grown cloud HRM with native UAE compliance and health-insurance integration." },
      { text: "Best UAE on-prem mid-market TCO; pick when PDPL residency and customisation depth are decisive." },
    ],
  },
];

/* ───────── GARTNER-STYLE CAPABILITY SCORECARD ───────── */

const featureVendors = [
  "SAP SuccessFactors",
  "Oracle HCM Cloud",
  "Microsoft Dynamics 365 HR",
  "Ramco HCM",
  "Zoho People",
  "Bayzat",
  "Focus Softnet HRMS",
];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "Core HR plus master data",
    cells: [
      { tier: "best", note: "Reference enterprise core HR" },
      { tier: "best", note: "Reference enterprise core HR" },
      { tier: "excellent", note: "Solid Microsoft-aligned core HR" },
      { tier: "excellent", note: "Strong core HR UAE-tuned" },
      { tier: "excellent", note: "Solid SMB core HR" },
      { tier: "excellent", note: "UAE-grown core HR" },
      { tier: "excellent", note: "Strong UAE-tuned core HR" },
    ],
  },
  {
    label: "UAE WPS and payroll depth",
    cells: [
      { tier: "excellent", note: "WPS via partner add-on" },
      { tier: "excellent", note: "WPS native in Oracle Payroll" },
      { tier: "excellent", note: "WPS via partner localisation" },
      { tier: "best", note: "Reference UAE payroll plus WPS" },
      { tier: "excellent", note: "UAE payroll plus WPS" },
      { tier: "best", note: "UAE WPS native, deep compliance" },
      { tier: "best", note: "UAE WPS plus end-of-service native" },
    ],
  },
  {
    label: "End-of-service gratuity, MOHRE, GPSSA",
    cells: [
      { tier: "strong", note: "Via partner localisation" },
      { tier: "excellent", note: "Localised in Oracle Payroll" },
      { tier: "strong", note: "Via partner localisation" },
      { tier: "best", note: "Reference UAE gratuity plus GPSSA" },
      { tier: "excellent", note: "Strong UAE coverage" },
      { tier: "best", note: "UAE-native gratuity, GPSSA" },
      { tier: "best", note: "UAE-native gratuity, MOHRE" },
    ],
  },
  {
    label: "On-prem deployment option",
    cells: [
      { tier: "strong", note: "Cloud-only" },
      { tier: "excellent", note: "Oracle EBS HR on-prem" },
      { tier: "strong", note: "Cloud-only" },
      { tier: "best", note: "Cloud and on-prem available" },
      { tier: "strong", note: "Cloud-only" },
      { tier: "strong", note: "Cloud-only" },
      { tier: "best", note: "Strong on-prem heritage" },
    ],
  },
  {
    label: "Document automation employee file",
    cells: [
      { tier: "excellent", note: "SuccessFactors Document Generation" },
      { tier: "excellent", note: "Oracle Documents of Record" },
      { tier: "excellent", note: "SharePoint plus Power Automate" },
      { tier: "best", note: "Strong document automation" },
      { tier: "excellent", note: "Zoho WorkDrive integration" },
      { tier: "excellent", note: "Built-in employee documents" },
      { tier: "best", note: "Strong UAE-tuned document handling" },
    ],
  },
  {
    label: "Performance and learning",
    cells: [
      { tier: "best", note: "Reference enterprise performance" },
      { tier: "best", note: "Strong performance plus learning" },
      { tier: "excellent", note: "Solid performance management" },
      { tier: "excellent", note: "Performance plus learning" },
      { tier: "excellent", note: "Performance review capable" },
      { tier: "strong", note: "Light performance" },
      { tier: "excellent", note: "Solid performance UAE-tuned" },
    ],
  },
  {
    label: "Employee self-service plus mobile",
    cells: [
      { tier: "best", note: "Strong self-service plus mobile" },
      { tier: "best", note: "Strong self-service plus mobile" },
      { tier: "excellent", note: "Solid self-service" },
      { tier: "excellent", note: "Strong self-service" },
      { tier: "excellent", note: "Solid self-service plus mobile" },
      { tier: "best", note: "Strong self-service mobile UAE-tuned" },
      { tier: "excellent", note: "Strong self-service UAE-tuned" },
    ],
  },
  {
    label: "7-year TCO economics",
    cells: [
      { tier: "strong", note: "Premium SaaS escalates" },
      { tier: "strong", note: "Premium SaaS escalates" },
      { tier: "excellent", note: "Better when M365 bundled" },
      { tier: "excellent", note: "Strong value; flexible deploy" },
      { tier: "best", note: "Best SaaS SMB TCO" },
      { tier: "excellent", note: "Competitive SMB SaaS" },
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
    title: "On-prem or SaaS HRM?",
    desc: "On-prem wins where employee data residency matters (banking, government, healthcare, ADGM-regulated entities) and where customisation depth or full document archive is required. SaaS wins for SMB without internal IT and for entities prioritising rapid deployment. For most UAE mid-market employers above 50 staff with WPS payroll, on-prem or hybrid is the lower-cost answer over the lifecycle.",
  },
  {
    num: "02",
    title: "UAE-localised or global platform?",
    desc: "UAE-localised platforms (Ramco HCM, Bayzat, Focus Softnet HRMS) have the deepest native support for WPS, end-of-service gratuity, MOHRE labour rules, Emirates ID validation and Hijri-calendar holidays. Global platforms (SuccessFactors, Workday, Oracle HCM) require partner localisation and often miss UAE-specific edge cases. For UAE-only employers, local platforms typically deliver better outcomes per dirham.",
  },
  {
    num: "03",
    title: "Document automation as primary driver?",
    desc: "Employee-file automation (passport, Emirates ID, visa, contract, payslip, signed letters) is the single biggest HRM ROI. On-prem HRMs store unlimited employee documents indexed against the employee record without SaaS per-document surcharge or storage-tier limits.",
  },
  {
    num: "04",
    title: "Outsource payroll or keep in-house?",
    desc: "Outsourced payroll has a role for very small operations (under 50 staff). For mid-market and above, in-house payroll inside the HRM platform is materially cheaper, faster, and gives finer control over WPS file generation, gratuity accruals and pension contributions.",
  },
];

/* ───────── UAE LABOUR & COMPLIANCE NOTES ───────── */

const uaeNotes = [
  "UAE PDPL classifies employee data as personal and sensitive; on-prem HRM keeps it inside the regulatory perimeter without third-party processor agreements.",
  "WPS payroll, end-of-service gratuity, GPSSA pension contributions, and MOHRE labour-law compliance are mandatory; vendor coverage varies materially.",
  "Arabic-language UI, right-to-left employee documents and Hijri-Gregorian dual-calendar are mandatory for many UAE deployments.",
  "Emirates ID validation, visa renewal tracking and MOHRE work-permit integration are UAE-specific capabilities; UAE-local platforms have the strongest native support.",
  "Ramco HCM, Focus Softnet HRMS and Bayzat have the strongest UAE-native localisation; global platforms work but require deeper partner localisation.",
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "Is on-prem HRM still relevant in 2026?",
    answer:
      "Yes, for UAE PDPL-sensitive employers, for deep customisation needs, and for mid-market and enterprise operations where 7-10 year TCO matters. The major on-prem options remaining are Ramco HCM (cloud and on-prem), Focus Softnet HRMS and Oracle EBS HR. For SMB, cloud HRM (Bayzat, Zoho People, Ramco cloud) is often the right answer.",
  },
  {
    question: "SuccessFactors or Ramco HCM for UAE enterprise?",
    answer:
      "SuccessFactors wins for performance management depth, learning management and global SAP-aligned multinational deployments. Ramco HCM wins for UAE-native payroll plus WPS depth, end-of-service gratuity accuracy, and on-premise plus cloud deployment flexibility. For UAE-only large employers, Ramco often delivers better outcomes; for global multinationals with a UAE entity, SuccessFactors typically wins.",
  },
  {
    question: "Does Bayzat or Zoho People handle UAE WPS?",
    answer:
      "Both support WPS file generation. Bayzat is UAE-grown with the strongest native UAE coverage including health insurance integration. Zoho People supports UAE WPS via the Zoho Payroll module with UAE-specific configuration. For UAE SMB under 100 employees, both are credible.",
  },
  {
    question: "How does UAE PDPL affect HRM choice?",
    answer:
      "Employee data is personal and sensitive under UAE PDPL. SaaS HRM transfers data residency to the vendor's cloud region and creates a processor relationship requiring data-processing agreements. On-premise HRM keeps the data inside your data centre under your direct control. For PDPL-sensitive employers (banking, government, healthcare, regulated entities), on-prem materially simplifies compliance.",
  },
  {
    question: "What is the typical UAE HRM deployment timeline?",
    answer:
      "SMB (under 50 staff, basic HR plus payroll plus WPS): 4 to 8 weeks. Mid-market (50-250 staff, full HR plus payroll plus performance): 3 to 6 months. Enterprise (250+ staff, multi-entity, deep localisation, multiple modules): 6 to 12 months. Year-end or fiscal-year alignment for go-live is typical.",
  },
  {
    question: "Is Artiflex IT tied to a single HRM vendor?",
    answer:
      "No. We deliver SAP SuccessFactors, Oracle HCM Cloud and EBS HR, Microsoft Dynamics 365 HR, Ramco HCM, Zoho People, Bayzat and Focus Softnet HRMS across UAE projects. Vendor recommendation follows headcount, payroll scope, deployment posture and existing licensing, not the inventory.",
  },
  {
    question: "Can you migrate from SaaS HRM back to on-premise?",
    answer:
      "Yes. We have moved UAE employers from SaaS HRM back to on-prem (Ramco HCM, Focus Softnet HRMS, Oracle EBS HR) when residency, customisation depth or 7-year TCO economics tipped the balance. The migration plan covers employee master data, payroll history, employee documents, performance records and parallel-run WPS validation.",
  },
  {
    question: "How is implementation priced?",
    answer:
      "Either fixed-price for a clearly scoped implementation (core HR plus payroll plus WPS) or time-and-materials for multi-phase or multi-entity rollouts. We always size against your specific headcount, payroll scope and customisation profile before any quote; we do not lead with vendor list prices.",
  },
];

/* ───────── HERO ───────── */

function HrManagementSoftwareHero() {
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
                <span className="font-medium text-[#28B5E1]">HRM Software</span>
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
            HRM{" "}
            <span className="gradient-text">Software</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Buyer's Guide, Vendor Matrix and Gartner-style Scorecard
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            A UAE buyer's guide for human capital management and payroll. Honest comparisons across <span className="font-semibold text-white">SAP SuccessFactors, Oracle HCM Cloud, Microsoft Dynamics 365 HR, Ramco HCM, Zoho People, Bayzat and Focus Softnet HRMS</span>, with a Gartner-style scorecard and a 7-year on-prem vs SaaS TCO analysis grounded in UAE deployments.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={openContact}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base"
            >
              Free HRM Assessment
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
              Compare HR Platforms
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

export default function HrManagementSoftware() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>HRM Software Solutions UAE | Buyer's Guide, Vendor Matrix and Gartner-style Scorecard | Artiflex IT</title>
        <meta
          name="description"
          content="UAE buyer's guide for HRM and payroll software. Vendor matrix and Gartner-style scorecard across SAP SuccessFactors, Oracle HCM, Microsoft Dynamics 365 HR, Ramco HCM, Zoho People, Bayzat and Focus Softnet HR, with on-prem TCO analysis."
        />
        <link rel="canonical" href="https://artiflexit.com/business-solutions/hr-management-software" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Artiflex IT",
            "url": "https://artiflexit.com/business-solutions/hr-management-software",
            "areaServed": [
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "City", "name": "Dubai" },
              { "@type": "City", "name": "Abu Dhabi" },
            ],
            "description": "Vendor-neutral UAE buyer's guide for HRM and payroll software across SAP SuccessFactors, Oracle HCM, Microsoft Dynamics 365 HR, Ramco HCM, Zoho People, Bayzat and Focus Softnet HRMS.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "HRM Software Solutions",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description": "UAE HRM software delivery across SAP SuccessFactors, Oracle HCM, Microsoft Dynamics 365 HR, Ramco HCM, Zoho People, Bayzat and Focus Softnet HRMS: WPS-ready payroll, end-of-service gratuity, GPSSA pension, employee-document automation and 7-year TCO governance.",
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
            "name": "HRM Software Platforms for UAE Buyers",
            "itemListElement": vendors.map((v, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <HrManagementSoftwareHero />

      {/* ───────── HRM PLATFORMS WE DELIVER (HONEYCOMB) ───────── */}
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
              HRM{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Platforms
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The HRM and payroll platforms we implement, localise and operate across UAE projects. Headcount, payroll scope, deployment posture and existing licensing drive the choice.
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
                layouts[hrmVendorList.length] ??
                [Math.ceil(hrmVendorList.length / 2), Math.floor(hrmVendorList.length / 2)];
              const rows: typeof hrmVendorList[] = [];
              let i = 0;
              sizes.forEach((s) => {
                rows.push(hrmVendorList.slice(i, i + s));
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
            {hrmVendorList.map((v) => (
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
              {hrmVendorList.length} platforms
            </span>
            , picked by headcount, payroll scope, deployment posture and existing licensing.
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
              Before any HRM commitment, walk through these questions. Most over-spent HRM deployments under-budgeted UAE WPS payroll integration, Hijri-calendar holidays and end-of-service gratuity calculation; vendor capability here varies enormously.
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

      {/* ───────── WHY ON-PREMISE STILL WINS (TCO) ───────── */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              7-10 Year TCO
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Why on-premise still wins over a 7-10 year horizon
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              HRM SaaS is typically priced per employee per month. At small headcounts (under 100), the year-one cash flow looks attractive; the curve is misleading. Per-employee-per-month subscriptions escalate 8-12 percent annually, edition limits push payroll and performance modules behind upgrade tiers, and employee-document storage often attracts per-gigabyte or per-document surcharges. Over 7 years, SaaS HRM at typical UAE headcounts costs 2.5x to 3.5x equivalent on-premise.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-5xl rounded-2xl border-l-4 border-amber-400 bg-amber-50 p-6 shadow-[0_4px_20px_rgba(245,158,11,0.10)] sm:p-8">
            <p className="font-display text-base font-bold text-amber-900 sm:text-lg">
              The TCO trap most UAE buyers do not see at signing.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-amber-900/85 sm:text-base">
              SaaS looks cheaper in year one because there is no hardware, no licence fee, and no implementation team to budget for upfront. The real cost emerges over years three to ten: per-user subscriptions escalate 8-12 percent annually, mandatory edition upgrades trigger surprise re-platforming costs, and customisation has to be rebuilt against new API versions every release. A modern on-premise deployment, by contrast, capitalises the licence in year one, depreciates the hardware over five to seven years, and runs largely flat thereafter. The cumulative SaaS bill at year seven typically reaches 2.5x to 3.5x the equivalent on-premise commitment for the same user count.
            </p>
          </div>

          <h3 className="mx-auto mt-14 max-w-4xl text-center font-display text-2xl font-bold text-slate-900 sm:text-[1.7rem]">
            A worked example: 300-employee UAE mid-market company with payroll plus performance plus document automation
          </h3>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + tcoRows.length * 116) }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#04101E] via-[#0A3D6B] to-[#1B8AC7]">
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
                      className={`transition-colors ${
                        r.highlight
                          ? "border-t-2 border-[#28B5E1]/30 bg-gradient-to-r from-emerald-50 via-emerald-50/70 to-white"
                          : `border-t border-[#0A3D6B]/20 hover:bg-[#28B5E1]/[0.04] ${
                              idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                            }`
                      }`}
                    >
                      <th
                        scope="row"
                        className={`px-4 py-4 align-middle font-display text-sm font-semibold ${
                          r.highlight ? "text-emerald-900" : "text-slate-900"
                        }`}
                      >
                        {r.line}
                      </th>
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

          <p className="mx-auto mt-4 max-w-5xl text-xs leading-relaxed text-slate-500 sm:text-[13px]">
            Figures are illustrative for a 300-employee UAE deployment with moderate customisation; vendor and edition mix will vary. We size against your specific user count, customisation profile and integration scope before any recommendation.
          </p>

          <div className="mx-auto mt-14 max-w-4xl text-center">
            <h3 className="font-display text-2xl font-bold text-slate-900 sm:text-[1.7rem]">
              What you gain by keeping it on-premise
            </h3>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {onPremGains.map((g) => (
              <article
                key={g.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1B8AC7]/60 hover:shadow-[0_20px_60px_-12px_rgba(27,138,199,0.20)] sm:p-7"
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-[#28B5E1]"
                />
                <h4 className="font-display text-lg font-bold text-slate-900">
                  {g.title}
                </h4>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
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
              <span className="gradient-text">HRM buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              Seven HRM platforms cover the majority of UAE deployments. SAP SuccessFactors and Oracle HCM dominate large enterprise; Microsoft Dynamics 365 HR wins Microsoft-aligned mid-market; Ramco HCM is the strongest hybrid (cloud plus on-prem) with UAE-localised payroll; Zoho People and Bayzat lead SMB SaaS; Focus Softnet HRMS is the UAE on-prem mid-market specialist.
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

          <p className="mx-auto mt-4 max-w-4xl text-center text-xs leading-relaxed text-slate-500 sm:text-[13px]">
            On-premise HRM is increasingly rare globally, but the platforms that retain on-prem options (Ramco HCM, Focus Softnet HRMS, legacy Oracle EBS HR) deliver materially better employee-data residency than SaaS-only alternatives. For UAE PDPL-sensitive customers this matters.
          </p>
        </div>
      </section>

      {/* ───────── DETAILED VENDOR CARDS & FEATURE RATINGS ───────── */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Detailed Comparison on HRM Platforms
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Strengths, blind spots and the buyer profile each HRM platform was built for. Vendor choice typically follows headcount, payroll scope, UAE compliance posture and deployment model more than feature comparison.
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
              <span className="font-semibold text-white">Artiflex IT delivers SAP SuccessFactors, Oracle HCM Cloud and EBS HR, Microsoft Dynamics 365 HR, Ramco HCM, Zoho People, Bayzat and Focus Softnet HRMS</span> across UAE projects. <br />
              <span className="text-xs italic text-white sm:text-base">HRM recommendation follows headcount, payroll scope, deployment posture and existing licensing, not a vendor preference.</span>
            </p>
          </div>

          {/* Feature ratings */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Scorecard
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each HRM platform is rated across the capabilities that matter most for UAE deployments, using a standardised tier scale. A gold ★ marker denotes best-in-class performance.
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

          <p className="mx-auto mt-6 max-w-4xl text-center text-xs leading-relaxed text-slate-500 sm:text-[13px]">
            Tiers reflect UAE-deployment evidence across payroll, WPS, end-of-service gratuity, employee-document automation and 7-year economics. Best-in-class is reserved for platforms that lead on the dimension by a clear margin in UAE engagements.
          </p>
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
              The right HRM for any UAE environment falls out of four honest questions. Walk through them before any vendor demo and the shortlist usually picks itself.
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
              What changes when you buy HRM in the UAE
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              UAE HRM software has specific compliance and operational considerations that change the recommendation versus a generic HRM conversation.
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
              14+ years of UAE HRM software delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when SuccessFactors wins, when Oracle HCM wins, when Dynamics 365 HR, Ramco, Zoho People, Bayzat or Focus Softnet wins, and when on-prem beats SaaS. Always a headcount-driven and PDPL-aware sizing before quoting.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years HR software delivery" },
              { value: "500+", label: "Projects GCC-wide" },
              { value: "7", label: "HRM platforms actively delivered" },
              { value: "24/7", label: "Support" },
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
                  Platform coverage
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  SAP SuccessFactors, Oracle HCM Cloud and EBS HR, Microsoft Dynamics 365 HR, Ramco HCM (cloud and on-prem), Zoho People, Bayzat and Focus Softnet HRMS.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Compliance frameworks
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  UAE WPS, end-of-service gratuity, GPSSA / DEWS pension, MOHRE labour law, Emirates ID validation, visa renewal tracking, Hijri-Gregorian dual-calendar and UAE PDPL residency.
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
                  Implementation plus localisation plus managed payroll, or assessment-only. Existing-licensing leverage (SAP, Oracle, Microsoft EA) is part of the design and TCO calculation.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#28B5E1] px-6 py-3 font-display text-sm font-semibold text-navy-deep transition-colors hover:bg-white sm:text-base"
            >
              Book a free HRM assessment
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
            description="What UAE buyers ask us most about choosing SuccessFactors, Oracle HCM, Dynamics 365 HR, Ramco HCM, Zoho People, Bayzat and Focus Softnet HRMS."
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
        title="Free HRM Assessment"
        description="Free HRM readiness assessment including current platform audit, UAE WPS and compliance posture, employee-document automation scope, 7-year on-prem vs SaaS TCO calculation, and recommended platform plus deployment model."
        primaryButton={{ text: "Book Assessment", action: "modal" }}
      />
    </>
  );
}
