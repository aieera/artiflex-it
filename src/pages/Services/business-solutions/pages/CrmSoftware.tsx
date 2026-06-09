import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";

/* ───────── CRM VENDORS (HONEYCOMB) ───────── */

const crmVendorList = [
  { slug: "dynamics-365-sales", name: "Microsoft Dynamics 365 Sales", logo: "/logos/microsoft.svg" },
  { slug: "salesforce", name: "Salesforce Sales Cloud", logo: "/logos/Salesforce.svg" },
  { slug: "odoo-crm", name: "Odoo CRM", logo: "/logos/Odoo.png" },
  { slug: "sugarcrm", name: "SugarCRM", logo: "/logos/SugarCRM.png" },
  { slug: "zoho-crm", name: "Zoho CRM", logo: "/logos/Zoho.png" },
  { slug: "sap-sales-cloud", name: "SAP Sales Cloud", logo: "/logos/SAP.svg" },
  { slug: "oracle-sales", name: "Oracle Sales / Siebel", logo: "/logos/Oracle.png" },
];

/* ───────── BUYER'S GUIDE, SELECTION FRAMEWORK ───────── */

const selectionFramework = [
  {
    step: "1",
    question: "What is the CRM for?",
    capture:
      "B2B sales pipeline, B2C contact and marketing, account management plus support, distributor or channel management, project-based services, contracts and renewals",
    why: "Each profile maps to different module strengths; B2B-pipeline-heavy organisations favour Dynamics, Salesforce or SugarCRM; B2C-marketing-heavy favour Zoho or HubSpot.",
  },
  {
    step: "2",
    question: "User count and growth?",
    capture: "Under 25 users, 25-100, 100-500, 500 plus",
    why: "Drives platform tier and licensing economics; SaaS subscriptions escalate fastest in the 25-100 band where edition upgrades hit hardest.",
  },
  {
    step: "3",
    question: "Customisation appetite?",
    capture:
      "Out-of-the-box only, light field and workflow custom, deep entity model customisation, full database-level integration",
    why: "Customisation depth often becomes the deciding factor; on-prem CRMs (Dynamics on-prem, Odoo, SugarCRM) allow database-level customisation that SaaS APIs limit.",
  },
  {
    step: "4",
    question: "Deployment model?",
    capture: "On-premise, private cloud, public SaaS, hybrid",
    why: "Data-residency-conscious UAE businesses (banking, government, legal, healthcare) increasingly choose on-prem CRM; SaaS dominates SMB and rapid-deploy use cases.",
  },
  {
    step: "5",
    question: "Document automation scope?",
    capture:
      "Manual quote and contract handling, partial digital capture, full ingestion (quotes, customer POs, contracts, signed documents) and indexed archive",
    why: "Document automation against customer records is the single biggest CRM ROI; on-prem CRMs store unlimited customer documents without per-document surcharge.",
  },
  {
    step: "6",
    question: "Integration scope?",
    capture:
      "Standalone CRM, CRM plus ERP, CRM plus marketing automation, full stack including support and field service",
    why: "Tight CRM-to-ERP integration is materially easier on-premise (shared database options, deep customisation) than across SaaS APIs.",
  },
  {
    step: "7",
    question: "Compliance posture?",
    capture: "UAE PDPL, GDPR (for EU customers), sector frameworks, contracts retention requirements",
    why: "Customer data residency under PDPL increasingly drives the on-prem choice; SaaS CRM with foreign data residency requires processor agreements and dual-control.",
  },
];

/* ───────── SELECTION CRITERIA CHECKLIST ───────── */

const checklistGroups = [
  {
    title: "Technical fit",
    items: [
      "Sales pipeline plus opportunity management",
      "Quote and order document automation",
      "Custom entity and field depth",
      "Integration API openness",
      "Mobile field-sales capability",
      "Multi-currency, multi-language",
    ],
  },
  {
    title: "Operational fit",
    items: [
      "Deployment model flexibility",
      "Customer document archive",
      "Workflow and approval automation",
      "Email plus calendar integration",
      "Audit trail and revision history",
    ],
  },
  {
    title: "Commercial fit",
    items: [
      "On-premise perpetual licence",
      "Per-user subscription escalation",
      "Customisation cost without edition surcharge",
      "5-year and 10-year TCO",
      "Storage cost for customer documents",
    ],
  },
  {
    title: "Service fit",
    items: [
      "UAE in-country implementation partner",
      "Arabic-language professional services",
      "Customisation library and methodology",
      "Long-term support and upgrade path",
    ],
  },
];

/* ───────── TCO TABLE (UNIQUE BUSINESS-SOLUTIONS SECTION) ───────── */

type TcoRow = { line: string; saas: string; onPrem: string; diff: string; highlight?: boolean };

const tcoRows: TcoRow[] = [
  {
    line: "Licensing / subscription",
    saas: "AED 2.1M (Sales Cloud or Dynamics 365 Sales per user per month)",
    onPrem: "AED 500K perpetual licence plus 20% annual maintenance",
    diff: "SaaS approximately 3.0x",
  },
  {
    line: "Implementation and configuration",
    saas: "AED 350K-500K",
    onPrem: "AED 400K-600K",
    diff: "Comparable",
  },
  {
    line: "Customisation and integration",
    saas: "AED 350K plus rework per major release",
    onPrem: "AED 300K one-time, retained across upgrades",
    diff: "SaaS pays repeatedly",
  },
  {
    line: "Infrastructure (servers, storage, DB)",
    saas: "Included in subscription",
    onPrem: "AED 250K over 7 years (servers, storage)",
    diff: "Bundled vs CapEx",
  },
  {
    line: "Annual escalation and price increases",
    saas: "10% per year on subscription",
    onPrem: "5% on annual maintenance only",
    diff: "SaaS escalates faster",
  },
  {
    line: "7-year cumulative TCO",
    saas: "AED 3.2M-3.7M",
    onPrem: "AED 1.1M-1.4M",
    diff: "SaaS approximately 2.8x-3.2x",
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
    slug: "dynamics-365-sales",
    name: "Microsoft Dynamics 365 Sales",
    best: "Best for Microsoft Estates (Recommended)",
    strength:
      "Microsoft Dynamics CRM since 2003; Dynamics 365 Sales is the current variant. Customer Engagement on-premises remains fully supported with commitments beyond 2030. Power Platform, plugins and deep custom development; native Microsoft 365 and Teams integration; Copilot AI for pipeline and forecasting. SharePoint plus Power Automate make document automation a first-class capability.",
    watch:
      "SaaS edition tiers limit custom entities and storage; budget for edition upgrades or move to the on-prem variant when customisation depth crosses the tier line.",
    logo: "/logos/microsoft.svg",
  },
  {
    slug: "salesforce",
    name: "Salesforce Sales Cloud",
    best: "Reference SaaS CRM (Recommended)",
    strength:
      "Salesforce founded the SaaS CRM category in 1999. Reference sales pipeline platform with the deepest AppExchange ecosystem and richest sales-process customisation. Apex and Lightning allow deep platform-level customisation; strong UAE consulting bench. Best fit for SaaS-committed enterprises and large sales teams used to the Salesforce vocabulary.",
    watch:
      "Pure-cloud only; per-user-per-month subscription escalates 8-12 percent annually and edition upgrades compound the cost curve. Data residency is limited outside Salesforce regions.",
    logo: "/logos/Salesforce.svg",
  },
  {
    slug: "odoo-crm",
    name: "Odoo CRM",
    best: "Best On-Prem TCO (Recommended)",
    strength:
      "Odoo, founded 2005, is an open-source modular ERP plus CRM. Full on-prem deployment, self-hosted, with Python source-level customisation. Native to the full Odoo ERP suite which makes CRM-to-ERP integration trivial. Native document management without SaaS storage surcharges. Best 7-year TCO across the comparison for organisations willing to operate the stack.",
    watch:
      "Operational maturity depends on the implementation partner; Community Edition is free but Enterprise Edition unlocks the polish most UAE deployments want.",
    logo: "/logos/Odoo.png",
  },
  {
    slug: "sugarcrm",
    name: "SugarCRM",
    best: "On-Prem CRM Depth (Recommended)",
    strength:
      "SugarCRM since 2004; built on an open-source CRM foundation with strong sales-process customisation. SugarCRM Enterprise on-prem allows PHP plus database-level customisation. Strong pipeline plus AI features; growing UAE channel. Materially more polished out of the box than Odoo, while keeping the on-prem advantage on residency and TCO.",
    watch:
      "Narrower ecosystem than Salesforce or Dynamics; ERP integration goes through connectors rather than a native stack.",
    logo: "/logos/SugarCRM.png",
  },
  {
    slug: "zoho-crm",
    name: "Zoho CRM",
    best: "Best for SMB SaaS",
    strength:
      "Zoho, founded 1996 in India, has a large SMB CRM footprint. Cloud-only with strong mobile, Deluge scripting for customisation, and Zoho One suite for ERP-style integration. UAE data region available. Best SaaS TCO at SMB scale and a credible step up from spreadsheets and Outlook contacts.",
    watch:
      "Customisation depth ceilings appear once you push past 100 users or need deep entity-level changes; the upgrade path is sideways rather than vertical.",
    logo: "/logos/Zoho.png",
  },
  {
    slug: "sap-sales-cloud",
    name: "SAP Sales Cloud",
    best: "Best for SAP Estates",
    strength:
      "SAP CRM since 2000; Sales Cloud (C4C) is the modern variant. Native SAP ERP integration is the decisive advantage where the ERP estate is already SAP. SAP DMS for document automation; UAE region plus on-prem options via S/4HANA. Strong UAE SAP consulting bench.",
    watch:
      "Premium enterprise pricing; chosen primarily when SAP ERP is already committed rather than on standalone CRM merits.",
    logo: "/logos/SAP.svg",
  },
  {
    slug: "oracle-sales",
    name: "Oracle Sales / Siebel",
    best: "Best for Oracle Estates",
    strength:
      "Oracle Siebel since 1993, Sales Cloud is the modern variant. Deep enterprise pipeline depth (Siebel) and native Oracle EBS / Fusion integration. Siebel on-prem is mature and still widely deployed in UAE banking and government. Oracle Content Management for document integration; Oracle UAE region available alongside on-prem.",
    watch:
      "Premium enterprise pricing and a steeper learning curve than the SaaS-native alternatives; chosen primarily when Oracle ERP and data-residency requirements dominate.",
    logo: "/logos/Oracle.png",
  },
];

/* ───────── VENDOR MATRIX (BUYER'S MATRIX) ───────── */

const matrixVendors = [
  { name: "Microsoft Dynamics 365 Sales", recommended: true, rank: "#1" },
  { name: "Salesforce Sales Cloud", recommended: true },
  { name: "Odoo CRM", recommended: true },
  { name: "SugarCRM", recommended: true },
  { name: "Zoho CRM" },
  { name: "SAP Sales Cloud" },
  { name: "Oracle Sales / Siebel" },
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
      "Microsoft Dynamics CRM since 2003; Dynamics 365 Sales current",
      "Salesforce 1999; founded the SaaS CRM category",
      "Odoo 2005; open-source modular ERP plus CRM",
      "SugarCRM 2004; built on open-source CRM foundation",
      "Zoho 1996 India; large SMB CRM footprint",
      "SAP CRM since 2000; Sales Cloud (C4C) modern variant",
      "Oracle Siebel since 1993; Sales Cloud modern variant",
    ],
  },
  {
    label: "On-prem option",
    type: "stars",
    cells: [
      { stars: 4, note: "Dynamics 365 Customer Engagement on-prem" },
      { stars: 3, note: "Cloud-only" },
      { stars: 5, note: "Full on-prem, self-hosted, open-source" },
      { stars: 5, note: "SugarCRM Enterprise on-prem" },
      { stars: 3, note: "Cloud-only" },
      { stars: 3, note: "Cloud-only; S/4HANA on-prem for CRM functions" },
      { stars: 5, note: "Siebel on-prem mature" },
    ],
  },
  {
    label: "Customisation depth",
    type: "stars",
    cells: [
      { stars: 5, note: "Power Platform, plugins, deep custom" },
      { stars: 5, note: "Apex, Lightning, deep customisation" },
      { stars: 5, note: "Full Python source customisation" },
      { stars: 5, note: "PHP plus database-level customisation" },
      { stars: 4, note: "Deluge script plus customisation" },
      { stars: 4, note: "SAP-style customisation framework" },
      { stars: 5, note: "Deep Siebel customisation depth" },
    ],
  },
  {
    label: "Document automation / archive",
    type: "stars",
    cells: [
      { stars: 5, note: "SharePoint plus Power Automate" },
      { stars: 5, note: "Files plus AppExchange integrations" },
      { stars: 5, note: "Native document management" },
      { stars: 4, note: "Document integration capable" },
      { stars: 4, note: "Zoho WorkDrive integration" },
      { stars: 4, note: "SAP DMS integration" },
      { stars: 4, note: "Oracle Content Management integration" },
    ],
  },
  {
    label: "Sales pipeline and forecasting",
    type: "stars",
    cells: [
      { stars: 5, note: "Strong pipeline plus Copilot AI" },
      { stars: 5, note: "Reference sales pipeline platform" },
      { stars: 4, note: "Solid pipeline and quote" },
      { stars: 4, note: "Strong pipeline plus AI" },
      { stars: 4, note: "Strong pipeline for SMB" },
      { stars: 4, note: "Strong enterprise pipeline" },
      { stars: 5, note: "Deep enterprise pipeline (Siebel)" },
    ],
  },
  {
    label: "ERP integration",
    type: "stars",
    cells: [
      { stars: 5, note: "Native Dynamics ERP integration" },
      { stars: 4, note: "AppExchange ERP connectors" },
      { stars: 5, note: "Native to Odoo ERP suite" },
      { stars: 4, note: "SugarCRM ERP integrations" },
      { stars: 4, note: "Zoho One suite integration" },
      { stars: 5, note: "Native SAP ERP integration" },
      { stars: 5, note: "Native Oracle EBS / Fusion integration" },
    ],
  },
  {
    label: "UAE service depth",
    type: "stars",
    cells: [
      { stars: 5, note: "Largest UAE partner network" },
      { stars: 5, note: "Strong UAE consulting" },
      { stars: 4, note: "Growing UAE Odoo partners" },
      { stars: 4, note: "Strong UAE channel" },
      { stars: 5, note: "Wide UAE and GCC presence" },
      { stars: 5, note: "Deep UAE SAP consulting" },
      { stars: 5, note: "Deep UAE Oracle consulting" },
    ],
  },
  {
    label: "TCO over 7 years",
    type: "stars",
    cells: [
      { stars: 4, note: "Better TCO when M365 bundled" },
      { stars: 3, note: "Premium SaaS escalates aggressively" },
      { stars: 5, note: "Best on-prem TCO; open-source" },
      { stars: 4, note: "Strong on-prem TCO" },
      { stars: 5, note: "Best SaaS TCO at SMB scale" },
      { stars: 3, note: "Premium enterprise pricing" },
      { stars: 3, note: "Premium enterprise pricing" },
    ],
  },
  {
    label: "Best suited for",
    type: "text",
    cells: [
      "Microsoft 365-aligned estates, Teams workflows, Copilot-driven sales teams",
      "SaaS-committed enterprises with deep AppExchange and sales-process needs",
      "On-prem CRM plus full ERP integration, open-source preference, deep customisation",
      "On-prem CRM-only depth, sales-process customisation, mid-market enterprise",
      "SMB and mid-market SaaS with Zoho One suite or budget-led shortlist",
      "SAP ERP estates needing native CRM-to-ERP integration",
      "Oracle EBS / Fusion estates and UAE banking or government with Siebel installs",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      {
        recommended: true,
        rank: "#1",
        text: "Largest UAE partner network with on-prem and SaaS variants; Copilot AI and Microsoft 365 integration tilt this for any Microsoft-aligned estate.",
      },
      {
        recommended: true,
        text: "Reference SaaS CRM; pick when AppExchange ecosystem breadth and pure-SaaS commitment are the decisive criteria.",
      },
      {
        recommended: true,
        text: "Best on-prem TCO and full ERP integration in one open-source stack; the rational choice for residency-conscious mid-market.",
      },
      {
        recommended: true,
        text: "Strongest CRM-only on-prem option; pick when SugarCRM polish and sales-process depth beat the Odoo all-in-one trade-off.",
      },
      {
        text: "Best SaaS TCO at SMB scale and a credible first CRM; ceiling on customisation past 100 users.",
      },
      {
        text: "The default when SAP ERP is already committed; standalone CRM choice would land elsewhere.",
      },
      {
        text: "The default when Oracle ERP is already committed or when Siebel on-prem residency is the decisive constraint.",
      },
    ],
  },
];

/* ───────── GARTNER-STYLE CAPABILITY SCORECARD ───────── */

const featureVendors = [
  "Microsoft Dynamics 365 Sales",
  "Salesforce Sales Cloud",
  "Odoo CRM",
  "SugarCRM",
  "Zoho CRM",
  "SAP Sales Cloud",
  "Oracle Sales / Siebel",
];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "On-prem availability",
    cells: [
      { tier: "excellent", note: "Customer Engagement on-prem" },
      { tier: "strong", note: "Cloud-only" },
      { tier: "best", note: "Full on-prem, open-source" },
      { tier: "best", note: "Enterprise on-prem available" },
      { tier: "strong", note: "Cloud-only" },
      { tier: "strong", note: "Cloud-primary" },
      { tier: "best", note: "Siebel on-prem mature" },
    ],
  },
  {
    label: "Customisation depth",
    cells: [
      { tier: "best", note: "Power Platform deep customisation" },
      { tier: "best", note: "Apex plus Lightning" },
      { tier: "best", note: "Full Python source customisation" },
      { tier: "best", note: "Database-level customisation" },
      { tier: "excellent", note: "Deluge plus customisation" },
      { tier: "excellent", note: "SAP customisation framework" },
      { tier: "best", note: "Deep Siebel customisation" },
    ],
  },
  {
    label: "Document automation and archive",
    cells: [
      { tier: "best", note: "SharePoint plus Power Automate" },
      { tier: "best", note: "Files plus AppExchange" },
      { tier: "best", note: "Native document management" },
      { tier: "excellent", note: "Document integration" },
      { tier: "excellent", note: "Zoho WorkDrive integration" },
      { tier: "excellent", note: "SAP DMS integration" },
      { tier: "excellent", note: "Oracle Content integration" },
    ],
  },
  {
    label: "Sales pipeline and forecasting",
    cells: [
      { tier: "best", note: "Strong pipeline plus Copilot AI" },
      { tier: "best", note: "Reference sales pipeline platform" },
      { tier: "excellent", note: "Solid pipeline and quote" },
      { tier: "excellent", note: "Strong pipeline plus AI" },
      { tier: "excellent", note: "Strong pipeline for SMB" },
      { tier: "excellent", note: "Strong enterprise pipeline" },
      { tier: "best", note: "Deep enterprise pipeline" },
    ],
  },
  {
    label: "ERP integration",
    cells: [
      { tier: "best", note: "Native Dynamics ERP integration" },
      { tier: "excellent", note: "AppExchange ERP connectors" },
      { tier: "best", note: "Native to Odoo ERP suite" },
      { tier: "excellent", note: "SugarCRM ERP integrations" },
      { tier: "excellent", note: "Zoho One suite integration" },
      { tier: "best", note: "Native SAP ERP integration" },
      { tier: "best", note: "Native Oracle ERP integration" },
    ],
  },
  {
    label: "Mobile field-sales",
    cells: [
      { tier: "best", note: "Dynamics 365 mobile mature" },
      { tier: "best", note: "Salesforce mobile reference" },
      { tier: "excellent", note: "Odoo mobile capable" },
      { tier: "excellent", note: "SugarCRM mobile" },
      { tier: "excellent", note: "Zoho mobile strong" },
      { tier: "excellent", note: "SAP Mobile Apps" },
      { tier: "excellent", note: "Oracle mobile capable" },
    ],
  },
  {
    label: "Data residency and sovereignty",
    cells: [
      { tier: "excellent", note: "Azure UAE plus on-prem option" },
      { tier: "strong", note: "Salesforce data residency limited" },
      { tier: "best", note: "Full on-prem residency" },
      { tier: "best", note: "On-prem residency" },
      { tier: "excellent", note: "Zoho UAE region" },
      { tier: "excellent", note: "SAP UAE region plus on-prem" },
      { tier: "excellent", note: "Oracle UAE region plus on-prem" },
    ],
  },
  {
    label: "7-year TCO",
    cells: [
      { tier: "excellent", note: "Better when M365 bundled" },
      { tier: "strong", note: "Premium SaaS escalates" },
      { tier: "best", note: "Best on-prem TCO open-source" },
      { tier: "excellent", note: "Strong on-prem TCO" },
      { tier: "best", note: "Best SaaS TCO at SMB scale" },
      { tier: "strong", note: "Premium enterprise pricing" },
      { tier: "strong", note: "Premium enterprise pricing" },
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
    title: "On-prem or SaaS CRM?",
    desc: "On-prem wins for data-residency-conscious UAE businesses (banking, government, legal, healthcare), for deep customisation needs, and for 7-10 year TCO discipline. SaaS wins for SMB, rapid-deploy use cases, and where Salesforce Sales Cloud or Microsoft Dynamics 365 in the cloud are the de facto standard.",
  },
  {
    num: "02",
    title: "Microsoft Dynamics or Salesforce?",
    desc: "Both are credible enterprise CRMs. Dynamics 365 Sales wins for Microsoft 365 and Teams-aligned estates, native Office integration, and Copilot AI integration. Salesforce wins for AppExchange ecosystem breadth, deepest sales-process customisation, and pure-SaaS commitment. The tiebreaker is usually existing Microsoft licensing and team familiarity.",
  },
  {
    num: "03",
    title: "Odoo or SugarCRM for on-prem?",
    desc: "Both are strong on-prem CRM options. Odoo wins for a full ERP plus CRM plus everything integrated stack; SugarCRM wins for CRM-only depth with stronger sales-process customisation. Open-source Odoo Community is free; SugarCRM Enterprise is paid but more polished out of the box.",
  },
  {
    num: "04",
    title: "Document-automation as CRM driver?",
    desc: "If customer quotes, POs, contracts and signed documents are still managed manually or in shared drives, the single biggest CRM ROI is full document automation against customer records. On-premise CRMs store unlimited customer documents without SaaS per-document surcharge.",
  },
];

/* ───────── UAE SERVICE & COMMERCIAL NOTES ───────── */

const uaeNotes = [
  "UAE PDPL applies to all customer data; on-prem CRM keeps data inside the regulatory perimeter without third-party processor agreements.",
  "Customer data residency for ADGM-regulated, DFSA-regulated and CBUAE-regulated entities increasingly drives the on-prem choice.",
  "Arabic-language UI and right-to-left customer documents are mandatory for many UAE deployments.",
  "Microsoft Dynamics 365 Customer Engagement on-prem retains a strong UAE installed base for compliance-driven customers.",
  "Odoo and SugarCRM have growing UAE partner ecosystems for mid-market on-prem deployments.",
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "Is Salesforce really 3x more expensive than on-prem CRM over 7 years?",
    answer:
      "For UAE deployments above 50 users with moderate customisation, typically yes. The Salesforce per-user-per-month subscription escalates 8-12 percent annually, edition upgrades (forced when customisation limits are exceeded) compound the curve, and customisations have to be reworked against every major release. On-premise CRM capitalises in year one and runs largely flat thereafter. The crossover is usually between year three and year five.",
  },
  {
    question: "Can we keep our Microsoft Dynamics 365 CRM on-premises?",
    answer:
      "Yes. Dynamics 365 Customer Engagement on-premises remains fully supported and is materially more popular in UAE banking, government and healthcare than the Microsoft sales motion would suggest. Microsoft has publicly committed to on-premises support beyond 2030.",
  },
  {
    question: "Will an on-prem CRM still get product updates?",
    answer:
      "Yes for every major vendor in this comparison. Microsoft Dynamics 365 Customer Engagement on-prem, Odoo, SugarCRM, Oracle Siebel and SAP CRM are all actively maintained with regular product updates and security patches. Open-source platforms (Odoo Community, vTiger) cannot be discontinued by the vendor at all.",
  },
  {
    question: "How does customisation differ?",
    answer:
      "On-premise CRMs allow database-level access, full code-level customisation, and unlimited custom entities or fields without per-customisation surcharge. SaaS CRMs have edition limits on custom fields, custom entities, custom workflows and storage; exceeding the limits triggers edition upgrades that compound the subscription cost.",
  },
  {
    question: "What is the typical UAE CRM deployment timeline?",
    answer:
      "SMB (under 25 users, light customisation): 4 to 8 weeks. Mid-market (25-150 users, moderate customisation): 2 to 5 months. Enterprise (150 plus users, deep customisation, ERP integration): 6 to 12 months. Document automation against customer records: 2 to 4 months on top. Most UAE failures come from under-budgeted customisation and integration scope.",
  },
];

/* ───────── HERO ───────── */

function CrmSoftwareHero() {
  const { open: openContact } = useContactModal();
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-navy-deep">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/business-solutions.jpg')" }}
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
                <span className="font-medium text-[#28B5E1]">CRM & Sales Management</span>
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
            CRM & Sales{" "}
            <span className="gradient-text">Management</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Buyer's Guide, Vendor Matrix and Gartner-style Scorecard
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            A UAE buyer's guide for customer relationship management and sales force automation. Honest comparisons across{" "}
            <span className="font-semibold text-white">
              Microsoft Dynamics 365 Sales, Salesforce, Odoo CRM, SugarCRM, Zoho CRM, SAP Sales Cloud and Oracle Sales
            </span>
            , with a Gartner-style scorecard and a 7-year on-prem vs SaaS TCO analysis.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={openContact}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base"
            >
              Free CRM Assessment
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
              Compare CRM Platforms
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

export default function CrmSoftware() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>CRM & Sales Management Software UAE | Buyer's Guide, Vendor Matrix and Gartner-style Scorecard | Artiflex IT</title>
        <meta
          name="description"
          content="UAE buyer's guide for CRM and sales management software. Vendor matrix and Gartner-style scorecard across Microsoft Dynamics 365 Sales, Salesforce, Odoo CRM, SugarCRM, Zoho CRM, SAP Sales Cloud and Oracle Sales, with on-prem TCO analysis."
        />
        <link rel="canonical" href="https://artiflexit.com/business-solutions/crm-software" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Artiflex IT",
            "url": "https://artiflexit.com/business-solutions/crm-software",
            "areaServed": [
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "City", "name": "Dubai" },
              { "@type": "City", "name": "Abu Dhabi" },
            ],
            "description":
              "Vendor-neutral UAE buyer's guide for CRM and sales management software across Microsoft Dynamics 365 Sales, Salesforce, Odoo CRM, SugarCRM, Zoho CRM, SAP Sales Cloud and Oracle Sales.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "CRM & Sales Management Software",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description":
              "UAE CRM and sales management delivery across Dynamics 365 Sales, Salesforce, Odoo, SugarCRM, Zoho, SAP and Oracle: workload-driven sizing, sovereignty-aligned design, document automation and 7-year TCO discipline.",
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
            "name": "CRM & Sales Management Platforms for UAE Buyers",
            "itemListElement": vendors.map((v, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <CrmSoftwareHero />

      {/* ───────── CRM PLATFORMS WE DELIVER (HONEYCOMB) ───────── */}
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
              CRM{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Platforms
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The CRM and sales-management platforms we design, implement and operate across UAE projects. User count, customisation depth, deployment model and document-automation scope drive the choice.
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
                layouts[crmVendorList.length] ??
                [Math.ceil(crmVendorList.length / 2), Math.floor(crmVendorList.length / 2)];
              const rows: typeof crmVendorList[] = [];
              let i = 0;
              sizes.forEach((s) => {
                rows.push(crmVendorList.slice(i, i + s));
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
            {crmVendorList.map((v) => (
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
              {crmVendorList.length} platforms
            </span>
            , picked by user count, customisation depth and deployment model.
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
              Before any CRM commitment, walk through these questions. Most over-spent CRM deployments fail at user adoption because the platform was chosen for executive-dashboard polish rather than for sales-rep daily workflow fit.
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

      {/* ───────── WHY ON-PREMISE STILL WINS (UNIQUE TO BUSINESS-SOLUTIONS) ───────── */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-amber-600">
              The 7-10 Year Lens
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Why on-premise still wins over a 7-10 year horizon
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              CRM SaaS subscriptions look attractive at user count under 25, but the economics flip aggressively above that scale. Edition limits force customisation surcharges, sales-focused editions exclude service and marketing modules, and per-user-per-month pricing escalates 10 percent annually almost industry-wide. On-premise CRM still wins on 7-year TCO for any UAE business above 50 users with meaningful customisation.
            </p>
          </div>

          {/* Amber info callout */}
          <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border-l-4 border-amber-500 bg-gradient-to-br from-amber-50 to-white p-6 shadow-[0_4px_20px_rgba(245,158,11,0.08)] sm:p-8">
            <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
              <span className="font-semibold text-slate-900">
                The TCO trap most UAE buyers do not see at signing.
              </span>{" "}
              SaaS looks cheaper in year one because there is no hardware, no licence fee, and no implementation team to budget for upfront. The real cost emerges over years three to ten: per-user subscriptions escalate 8-12 percent annually, mandatory edition upgrades trigger surprise re-platforming costs, and customisation has to be rebuilt against new API versions every release. A modern on-premise deployment, by contrast, capitalises the licence in year one, depreciates the hardware over five to seven years, and runs largely flat thereafter. The cumulative SaaS bill at year seven typically reaches 2.5x to 3.5x the equivalent on-premise commitment for the same user count.
            </p>
          </div>

          {/* Worked example */}
          <div className="mx-auto mt-12 max-w-6xl">
            <h3 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
              A worked example: 100-user UAE B2B sales organisation, moderate customisation
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Illustrative comparison across the cost lines that actually decide the 7-year picture for a typical mid-market CRM deployment.
            </p>

            <div className="mt-6 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
              <div className="overflow-x-auto">
                <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + tcoRows.length * 116) }}>
                  <thead>
                    <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
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
                            ? "bg-emerald-50/80"
                            : idx % 2 === 0
                            ? "bg-white hover:bg-[#28B5E1]/[0.04]"
                            : "bg-slate-50/60 hover:bg-[#28B5E1]/[0.04]"
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
                          {r.onPrem}
                        </td>
                        <td
                          className={`border-l border-[#0A3D6B]/20 px-2 py-3 sm:px-4 sm:py-4 align-middle text-xs leading-relaxed sm:text-sm ${
                            r.highlight ? "font-semibold text-emerald-900" : "text-slate-700"
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

            <p className="mt-4 text-xs italic leading-relaxed text-slate-500 sm:text-sm">
              Figures are illustrative for a 100-user UAE deployment with moderate customisation; vendor and edition mix will vary. We size against your specific user count, customisation profile and integration scope before any recommendation.
            </p>
          </div>

          {/* What you gain by keeping it on-premise */}
          <div className="mx-auto mt-16 max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <h3 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                What you gain by keeping it on-premise
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                The four advantages that compound over the full lifecycle, beyond the headline TCO difference.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {onPremGains.map((g) => (
                <article
                  key={g.title}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-[0_20px_60px_-12px_rgba(245,158,11,0.18)]"
                >
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 to-amber-300"
                  />
                  <h4 className="font-display text-lg font-bold text-slate-900">
                    {g.title}
                  </h4>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
                    {g.items.map((it) => (
                      <li key={it} className="flex items-start gap-2">
                        <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
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
              <span className="gradient-text">CRM buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              Seven CRM platforms cover the majority of UAE deployments. Microsoft Dynamics 365 and Salesforce lead enterprise; Odoo and SugarCRM lead on-premise mid-market; Zoho dominates SMB; SAP Sales Cloud and Oracle Sales win where the ERP estate is already committed.
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

          <p className="mt-4 text-xs italic leading-relaxed text-slate-500 sm:text-sm">
            On-prem availability is no longer mainstream in CRM, but the options that remain (Microsoft Dynamics 365 on-prem, Odoo, SugarCRM, vTiger, Oracle Siebel) are materially better fits for data-residency-conscious UAE businesses than SaaS-only alternatives.
          </p>
        </div>
      </section>

      {/* ───────── DETAILED VENDOR CARDS & FEATURE RATINGS ───────── */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Detailed comparison on CRM platforms
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Strengths, blind spots and the buyer profile each platform was built for. CRM choice typically follows existing licensing, customisation depth and deployment model more than feature comparison.
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
              <span className="font-semibold text-white">
                Artiflex IT delivers Microsoft Dynamics 365 Sales, Salesforce, Odoo CRM, SugarCRM, Zoho CRM, SAP Sales Cloud and Oracle Sales / Siebel
              </span>{" "}
              across UAE projects. <br />
              <span className="text-xs italic text-white sm:text-base">
                CRM recommendation follows existing licensing, customisation depth and deployment model, not a vendor preference.
              </span>
            </p>
          </div>

          {/* Feature ratings */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Scorecard
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each vendor is rated across the capabilities that matter most for UAE CRM, using a standardised tier scale. A gold ★ marker denotes best-in-class performance.
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
              UAE service & commercial notes
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              What changes when you buy CRM in the UAE
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              UAE CRM deployments carry specific compliance, residency and operational considerations that change the recommendation versus a generic CRM conversation.
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
              14+ years of UAE CRM delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when Microsoft Dynamics wins, when Salesforce wins, when Odoo, SugarCRM, Zoho, SAP or Oracle wins, and when on-prem beats SaaS. Always a workload-driven and residency-aware sizing before quoting.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years of UAE CRM delivery" },
              { value: "500+", label: "CRM projects, GCC-wide" },
              { value: `${crmVendorList.length}`, label: "CRM platforms actively delivered" },
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
                  Microsoft Dynamics 365 Sales (on-prem and cloud), Salesforce Sales Cloud, Odoo CRM, SugarCRM, Zoho CRM, SAP Sales Cloud and Oracle Sales / Siebel.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Compliance frameworks
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  UAE PDPL, NESA, ADHICS, CBUAE, ADGM and DFSA-aligned designs with documented residency, audit-trail evidence and processor-agreement coverage where required.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Coverage area
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  On-site across Dubai, Abu Dhabi and Sharjah. Remote across the UAE, Oman and Saudi Arabia. 24/7 application-operations bench for managed customers.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Engagement model
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Implementation plus customisation plus document-automation, or assessment-only. Existing-licensing leverage (Microsoft EA, SAP ELA, Oracle ULA) and Arabic-language professional services are part of the design.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#28B5E1] px-6 py-3 font-display text-sm font-semibold text-navy-deep transition-colors hover:bg-white sm:text-base"
            >
              Book a free CRM assessment
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
            description="What UAE buyers ask us most about choosing Microsoft Dynamics, Salesforce, Odoo, SugarCRM and the wider CRM landscape."
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
        title="Free CRM Assessment"
        description="Free CRM strategy review including current platform audit, customisation footprint, customer-document automation scope, on-prem vs SaaS 7-year TCO calculation, and recommended platform plus deployment model."
        primaryButton={{ text: "Book Assessment", action: "modal" }}
      />
    </>
  );
}
