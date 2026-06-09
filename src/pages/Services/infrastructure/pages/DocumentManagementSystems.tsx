import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import DeliveryModel from "@/components/sections/DeliveryModel";

/* ───────── DMS VENDORS (HONEYCOMB) ───────── */

const dmsVendorList = [
  { slug: "raabyt-dms", name: "Raabyt DMS", logo: "/logos/Raabyt.png" },
  { slug: "sharepoint", name: "Microsoft SharePoint", logo: "/logos/microsoft.svg" },
  { slug: "m-files", name: "M-Files", logo: "/logos/MFiles.svg" },
  { slug: "opentext", name: "OpenText", logo: "/logos/OpenText.svg" },
  { slug: "hyland-onbase", name: "Hyland OnBase", logo: "/logos/Hyland.svg" },
  { slug: "docuware", name: "DocuWare", logo: "/logos/DocuWare.svg" },
  { slug: "laserfiche", name: "Laserfiche", logo: "/logos/Laserfiche.svg" },
];

/* ───────── BUYER'S GUIDE, SELECTION FRAMEWORK ───────── */

const selectionFramework = [
  {
    step: "1",
    question: "What is the DMS for?",
    capture: "General office document repository, regulated record retention, contract lifecycle, invoice / accounts payable, HR records, engineering drawings, healthcare records, or legal case files",
    why: "Each profile maps to different platform strengths; OnBase and M-Files lead specialist content; SharePoint covers general office; DocuWare and Laserfiche lead invoice automation.",
  },
  {
    step: "2",
    question: "Volume and growth profile?",
    capture: "Documents per month, total stored documents today plus three-year curve, average and peak file size",
    why: "Drives licensing model and storage architecture; high-volume capture environments need streamlined ingestion.",
  },
  {
    step: "3",
    question: "Capture sources?",
    capture: "Scanning (MFPs, dedicated scanners), email ingestion, mobile capture, AP / invoice OCR, e-forms, or API ingestion",
    why: "Capture maturity is the single biggest determinant of DMS ROI; investment here pays back multiple times in downstream automation.",
  },
  {
    step: "4",
    question: "Workflow and process automation?",
    capture: "Basic routing, structured approvals, exception handling, integration with ERP / HRIS / case management, or BPM-class orchestration",
    why: "Modern DMS includes workflow; mature deployments integrate with ERP, HR and core business applications via APIs.",
  },
  {
    step: "5",
    question: "Compliance and retention?",
    capture: "UAE PDPL retention, NESA / TDRA frameworks, ADHICS for healthcare, sector-specific records, eDiscovery for litigation hold, or immutable records (WORM)",
    why: "Retention policy enforcement is increasingly mandatory; tooling must apply retention automatically, not as an afterthought.",
  },
  {
    step: "6",
    question: "Search and AI capability?",
    capture: "Full-text search, metadata-driven, OCR for scanned content, AI auto-classification, AI extraction (named entities, totals, dates), or generative summarisation",
    why: "AI-driven extraction is the fastest-growing capability in DMS; modern platforms can automate 70-90 percent of structured-document data entry.",
  },
  {
    step: "7",
    question: "Deployment model?",
    capture: "Cloud SaaS, on-prem, hybrid, or sovereign cloud (UAE residency)",
    why: "UAE sovereignty mandates often drive on-prem or sovereign-cloud deployments for regulated content; SaaS dominates general-office DMS.",
  },
];

/* ───────── SELECTION CRITERIA CHECKLIST ───────── */

const checklistGroups = [
  {
    title: "Technical fit",
    items: [
      "Capture and OCR depth",
      "Metadata model flexibility",
      "Workflow and BPM capability",
      "Search and AI extraction",
      "Records retention and WORM",
      "Arabic-language support (OCR plus UI)",
    ],
  },
  {
    title: "Operational fit",
    items: [
      "Single-pane administration",
      "User adoption tooling (Office add-ins, mobile)",
      "Integration breadth (ERP, HRIS, M365, signature)",
      "Reporting and audit trail",
      "Role and entitlement management",
    ],
  },
  {
    title: "Commercial fit",
    items: [
      "Per-user vs per-document pricing",
      "Storage cost economics",
      "Subscription vs perpetual licence",
      "Five-year TCO including capture and storage",
    ],
  },
  {
    title: "Service fit",
    items: [
      "UAE in-country implementation partner",
      "Arabic-language professional services",
      "Migration tooling from legacy DMS",
      "Managed-service options",
    ],
  },
];

function SelectionFrameworkCards() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="mt-12 grid items-start gap-4 sm:mt-16 sm:gap-5 md:grid-cols-3">
      {selectionFramework.map((r, idx) => {
        const isOpen = open === idx;
        return (
          <div
            key={r.step}
            tabIndex={0}
            onMouseEnter={() => setOpen(idx)}
            onMouseLeave={() => setOpen((prev) => (prev === idx ? null : prev))}
            onFocus={() => setOpen(idx)}
            onBlur={() => setOpen((prev) => (prev === idx ? null : prev))}
            onClick={() => setOpen((prev) => (prev === idx ? null : idx))}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm outline-none transition-all duration-300 hover:-translate-y-1 hover:border-[#28B5E1]/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#28B5E1]/40 sm:p-5"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#28B5E1]/10 text-[#1B8AC7]">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M9.6 9a2.4 2.4 0 0 1 4.7.6c0 1.6-2.3 2.4-2.3 2.4" />
                  <path d="M12 17h.01" />
                </svg>
              </div>
              <h3 className="font-display text-sm font-semibold text-slate-900">
                {r.question}
              </h3>
            </div>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1B8AC7]">
                    What you are nailing down
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                    {r.capture}
                  </p>
                  <p className="mt-3 border-t border-slate-200 pt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Why it matters
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                    {r.why}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function ChecklistCards() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="mt-10 grid items-start gap-4 sm:grid-cols-2 sm:gap-5">
      {checklistGroups.map((g, idx) => {
        const isOpen = open === idx;
        return (
          <div
            key={g.title}
            tabIndex={0}
            onMouseEnter={() => setOpen(idx)}
            onMouseLeave={() => setOpen((prev) => (prev === idx ? null : prev))}
            onFocus={() => setOpen(idx)}
            onBlur={() => setOpen((prev) => (prev === idx ? null : prev))}
            onClick={() => setOpen((prev) => (prev === idx ? null : idx))}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm outline-none transition-all duration-300 hover:-translate-y-1 hover:border-[#28B5E1]/40 hover:shadow-[0_20px_60px_-12px_rgba(27,138,199,0.20)] focus-visible:ring-2 focus-visible:ring-[#28B5E1]/40 sm:p-6"
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#045891] to-[#28B5E1]"
            />
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#28B5E1]/10 text-[#1B8AC7]">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 2 2 7l10 5 10-5-10-5Z" />
                  <path d="m2 17 10 5 10-5" />
                  <path d="m2 12 10 5 10-5" />
                </svg>
              </div>
              <h4 className="font-display text-lg font-bold text-slate-900">
                {g.title}
              </h4>
              <svg
                className={`ml-auto h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-[#1B8AC7]" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
                    {g.items.map((it) => (
                      <li key={it} className="flex items-start gap-2">
                        <span
                          aria-hidden
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1B8AC7]"
                        />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}


/* ───────── DETAILED COMPARISON CARDS ───────── */

const vendors = [
  {
    slug: "raabyt-dms",
    name: "Raabyt DMS",
    best: "Platinum & Strategic Partner (Recommended)",
    strength: "First-party Raabyt platform, purpose-built for UAE. AI-powered full-text search with OCR and natural-language queries across every document. Version control with side-by-side compare and instant restore. Automated review, approval and signature workflows with escalation and deadline tracking. Department, role and document-level access control with watermarking. OCR and parsing of invoices and receipts into structured fields. Automated retention by document type, age and regulatory requirement. Native to the Raabyt suite (ERP, HRM, Finance, Purchase).",
    watch: "Best fit when a UAE-built, AI-native DMS that integrates natively with the Raabyt business suite is the priority; brownfield Documentum or OnBase estates may favour migrating in stages.",
    logo: "/logos/Raabyt.png",
  },
  {
    slug: "sharepoint",
    name: "Microsoft SharePoint / 365",
    best: "Largest UAE Estate (Recommended)",
    strength: "Microsoft 1975; SharePoint 2001; deepest M365 integration. Native to Outlook, Word and Teams. Syntex plus Microsoft 365 Copilot for AI content. Purview Records Management mature. Managed Metadata Service plus Term Store. Power Automate for workflow. Largest UAE Microsoft partner network.",
    watch: "Best for general office and Microsoft-aligned mid-market; high-volume capture (AP, HR records) or specialist regulated workflow benefits from a dedicated DMS layered on top.",
    logo: "/logos/microsoft.svg",
  },
  {
    slug: "m-files",
    name: "M-Files",
    best: "Best Metadata-Driven DMS (Recommended)",
    strength: "Founded 2002 Finland; metadata-driven DMS pioneer. M-Files Capture plus AI metadata, metadata-first design with AI auto-classification. M-Files Workflow plus Aino AI assistant. Full Arabic UI and OCR. Modern UX with deep M365 add-ins. Strong for mid-market regulated content.",
    watch: "UAE partner network is growing rather than dominant; best fit when metadata-led classification matters more than legacy DMS migration depth.",
    logo: "/logos/MFiles.svg",
  },
  {
    slug: "opentext",
    name: "OpenText Documentum / Content Suite",
    best: "Best Enterprise & Regulated (Recommended)",
    strength: "Documentum founded 1990; OpenText acquired 2017. Deepest enterprise heritage with Captiva Intelligent Capture as the reference. Documentum xCP plus AppWorks BPM. Records Management is the reference for regulated industries. OpenText Aviator plus IDOL AI. Mature Arabic for regulated. Deep UAE banking and oil-and-gas presence.",
    watch: "Operational complexity reflects feature breadth; OpenText rewards mature DMS teams. Premium positioning. Best fit for large enterprise and brownfield Documentum estates.",
    logo: "/logos/OpenText.svg",
  },
  {
    slug: "hyland-onbase",
    name: "Hyland OnBase",
    best: "Best for Healthcare (Recommended)",
    strength: "Founded 1991; OnBase plus Alfresco (acquired 2020) plus Perceptive. Brainware plus Perceptive Intelligent Capture. OnBase Workflow is the reference for healthcare and regulated process automation. OnBase Records reference. Hyland AI plus Saltworks intelligence. Strong UAE healthcare deployments.",
    watch: "Healthcare-deep heritage means specific industry accelerators; general office customers without process complexity may find SharePoint simpler.",
    logo: "/logos/Hyland.svg",
  },
  {
    slug: "docuware",
    name: "DocuWare",
    best: "Best AP & Invoice Automation",
    strength: "Founded 1988 Germany; AP and invoice-automation specialist. Intelligent Indexing is the reference AP capture. Strong AP workflow and approvals. DocuWare AI Document Intelligence. DocuSign / Adobe / Validated.id eSignature integration. Strong UAE AP and finance deployments.",
    watch: "AP-led depth means specialist fit; general office and broad enterprise content benefit from SharePoint or M-Files instead.",
    logo: "/logos/DocuWare.svg",
  },
  {
    slug: "laserfiche",
    name: "Laserfiche",
    best: "Best for Government Records",
    strength: "Founded 1987; reference for records and AP in regulated industries. Smart Invoice Capture plus Forms. Laserfiche Forms plus Workflow mature. Reference for government records management. Strong Arabic support and deep UAE government practice. DocuSign / Adobe / Laserfiche Sign eSignature.",
    watch: "Strongest for government and records-heavy estates; pure office collaboration is better served by SharePoint or Box.",
    logo: "/logos/Laserfiche.svg",
  },
];

/* ───────── VENDOR MATRIX (BUYER'S MATRIX) ───────── */

const matrixVendors = [
  { name: "Raabyt DMS", recommended: true, rank: "#1" },
  { name: "Microsoft SharePoint", recommended: true },
  { name: "M-Files", recommended: true },
  { name: "OpenText", recommended: true },
  { name: "Hyland OnBase", recommended: true },
  { name: "DocuWare" },
  { name: "Laserfiche" },
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
      "First-party Raabyt platform; AI-native DMS purpose-built for the UAE",
      "Microsoft 1975; SharePoint 2001; deepest M365 integration",
      "Founded 2002 Finland; metadata-driven DMS pioneer",
      "Documentum founded 1990; OpenText acquired 2017; deepest enterprise heritage",
      "Founded 1991; OnBase plus Alfresco plus Perceptive",
      "Founded 1988 Germany; AP and invoice specialist",
      "Founded 1987; reference for records and AP in regulated industries",
    ],
  },
  {
    label: "Capture and OCR",
    type: "stars",
    cells: [
      { stars: 5, note: "OCR and parsing of invoices and receipts to structured fields" },
      { stars: 4, note: "Syntex plus Microsoft 365 Copilot for content" },
      { stars: 5, note: "M-Files Capture plus AI metadata" },
      { stars: 5, note: "Captiva Intelligent Capture reference" },
      { stars: 5, note: "Brainware plus Perceptive Intelligent Capture" },
      { stars: 5, note: "Intelligent Indexing reference AP capture" },
      { stars: 5, note: "Smart Invoice Capture, Forms" },
    ],
  },
  {
    label: "Metadata and classification",
    type: "stars",
    cells: [
      { stars: 5, note: "AI tag suggestions plus metadata schemas and taxonomy" },
      { stars: 4, note: "Managed Metadata Service plus Term Store" },
      { stars: 5, note: "Metadata-first design, AI auto-classification" },
      { stars: 5, note: "Documentum reference metadata model" },
      { stars: 5, note: "Deep metadata plus Brainware classification" },
      { stars: 4, note: "Strong metadata for invoice / AP" },
      { stars: 4, note: "Strong metadata and templates" },
    ],
  },
  {
    label: "Workflow and BPM",
    type: "stars",
    cells: [
      { stars: 5, note: "Automated review, approval and signature with escalation" },
      { stars: 4, note: "Power Automate plus SharePoint flows" },
      { stars: 5, note: "M-Files Workflow plus Aino AI" },
      { stars: 5, note: "Documentum xCP plus AppWorks BPM" },
      { stars: 5, note: "OnBase Workflow reference" },
      { stars: 5, note: "Strong AP workflow and approvals" },
      { stars: 5, note: "Laserfiche Forms plus Workflow mature" },
    ],
  },
  {
    label: "Records retention and compliance",
    type: "stars",
    cells: [
      { stars: 5, note: "Automated retention by type, age and regulatory requirement" },
      { stars: 5, note: "Purview Records Management mature" },
      { stars: 5, note: "M-Files Compliance plus retention engine" },
      { stars: 5, note: "Records Management reference for regulated" },
      { stars: 5, note: "OnBase Records reference" },
      { stars: 4, note: "Retention policies capable" },
      { stars: 5, note: "Records management reference for government" },
    ],
  },
  {
    label: "AI and intelligent processing",
    type: "stars",
    cells: [
      { stars: 5, note: "AI search, NL queries and auto-categorisation" },
      { stars: 5, note: "Microsoft 365 Copilot integration" },
      { stars: 5, note: "M-Files Aino AI assistant" },
      { stars: 5, note: "OpenText Aviator plus IDOL AI" },
      { stars: 5, note: "Hyland AI plus Saltworks intelligence" },
      { stars: 4, note: "DocuWare AI Document Intelligence" },
      { stars: 4, note: "Laserfiche AI growing" },
    ],
  },
  {
    label: "Arabic-language and right-to-left",
    type: "stars",
    cells: [
      { stars: 5, note: "UAE-built; full Arabic UI and right-to-left by design" },
      { stars: 5, note: "Full Arabic UI and OCR in M365" },
      { stars: 5, note: "Full Arabic UI and OCR" },
      { stars: 5, note: "Mature Arabic for regulated industries" },
      { stars: 5, note: "Strong Arabic capture" },
      { stars: 4, note: "Arabic capable, growing UAE deployments" },
      { stars: 4, note: "Arabic supported, government-aware" },
    ],
  },
  {
    label: "UAE service depth",
    type: "stars",
    cells: [
      { stars: 5, note: "First-party platform; Platinum & Strategic Partner delivery" },
      { stars: 5, note: "Largest UAE Microsoft partner network" },
      { stars: 4, note: "Growing UAE partner network" },
      { stars: 5, note: "Deep UAE for banking and government" },
      { stars: 5, note: "Strong UAE healthcare deployments" },
      { stars: 4, note: "Strong UAE AP / finance deployments" },
      { stars: 5, note: "Deep UAE government practice" },
    ],
  },
  {
    label: "Best suited for",
    type: "text",
    cells: [
      "UAE organisations wanting an AI-native DMS integrated with the Raabyt business suite",
      "General office and Microsoft-aligned mid-market through enterprise",
      "Metadata-led mid-market regulated content with modern UX",
      "Large enterprise, banking and oil-and-gas regulated content",
      "Healthcare and process-heavy regulated workflow",
      "AP and invoice automation for finance departments",
      "UAE government records and AP in regulated public sector",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "First-party Raabyt platform delivered as Platinum & Strategic Partner; AI-native search, workflow and retention purpose-built for the UAE and the Raabyt suite." },
      { recommended: true, text: "Largest UAE installed base; M365 Copilot plus Purview is the natural default for general office DMS." },
      { recommended: true, text: "Best metadata-led DMS with Aino AI; clean modern UX for mid-market regulated content." },
      { recommended: true, text: "Deepest enterprise heritage with Captiva capture; reference for UAE banking and oil-and-gas records." },
      { recommended: true, text: "Reference for healthcare and process-heavy regulated workflow; OnBase Workflow is the gold standard." },
      { text: "Best AP and invoice-automation specialist with Intelligent Indexing capture as the reference." },
      { text: "Reference for UAE government records management and AP in regulated public sector." },
    ],
  },
];

/* ───────── GARTNER-STYLE CAPABILITY SCORECARD ───────── */

const featureVendors = [
  "Raabyt DMS",
  "Microsoft SharePoint",
  "M-Files",
  "OpenText",
  "Hyland OnBase",
  "DocuWare",
  "Laserfiche",
];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "Capture and OCR",
    cells: [
      { tier: "best", note: "OCR and parsing to structured fields" },
      { tier: "excellent", note: "Syntex plus M365 Copilot for content" },
      { tier: "best", note: "M-Files Capture plus AI metadata" },
      { tier: "best", note: "Captiva Intelligent Capture reference" },
      { tier: "best", note: "Brainware plus Perceptive Intelligent Capture" },
      { tier: "best", note: "Intelligent Indexing AP capture" },
      { tier: "best", note: "Smart Invoice Capture, Forms" },
    ],
  },
  {
    label: "Metadata model flexibility",
    cells: [
      { tier: "best", note: "AI tagging plus metadata schemas and taxonomy" },
      { tier: "excellent", note: "Managed Metadata Service plus Term Store" },
      { tier: "best", note: "Metadata-first design, AI auto-classify" },
      { tier: "best", note: "Documentum metadata reference" },
      { tier: "best", note: "Deep metadata plus Brainware" },
      { tier: "excellent", note: "Strong AP / invoice metadata" },
      { tier: "excellent", note: "Strong metadata and templates" },
    ],
  },
  {
    label: "Workflow and BPM",
    cells: [
      { tier: "best", note: "Review, approval and signature with escalation rules" },
      { tier: "excellent", note: "Power Automate plus SharePoint flows" },
      { tier: "best", note: "M-Files Workflow plus Aino AI" },
      { tier: "best", note: "Documentum xCP plus AppWorks BPM" },
      { tier: "best", note: "OnBase Workflow reference" },
      { tier: "best", note: "Strong AP workflow and approvals" },
      { tier: "best", note: "Laserfiche Forms plus Workflow mature" },
    ],
  },
  {
    label: "Records retention and compliance",
    cells: [
      { tier: "best", note: "Automated retention by type, age and regulation" },
      { tier: "best", note: "Purview Records Management mature" },
      { tier: "best", note: "M-Files Compliance plus retention" },
      { tier: "best", note: "Records Management reference for regulated" },
      { tier: "best", note: "OnBase Records reference" },
      { tier: "excellent", note: "Retention policies capable" },
      { tier: "best", note: "Reference for government records" },
    ],
  },
  {
    label: "Search and AI extraction",
    cells: [
      { tier: "best", note: "AI full-text search, OCR and NL queries" },
      { tier: "best", note: "M365 Copilot plus Syntex AI" },
      { tier: "best", note: "M-Files Aino AI assistant" },
      { tier: "best", note: "OpenText Aviator plus IDOL AI" },
      { tier: "best", note: "Hyland AI plus Saltworks intelligence" },
      { tier: "excellent", note: "DocuWare AI Document Intelligence" },
      { tier: "excellent", note: "Laserfiche AI growing" },
    ],
  },
  {
    label: "Office and email integration",
    cells: [
      { tier: "best", note: "Native Raabyt suite: ERP, HRM, Finance, Purchase" },
      { tier: "best", note: "Native to Outlook, Word, Teams" },
      { tier: "best", note: "Deep Microsoft 365 add-ins" },
      { tier: "excellent", note: "Office plus Outlook integration" },
      { tier: "excellent", note: "Office integration mature" },
      { tier: "excellent", note: "Outlook plus Office integration" },
      { tier: "excellent", note: "Office plus Outlook integration" },
    ],
  },
  {
    label: "eSignature and identity integration",
    cells: [
      { tier: "best", note: "Native signature workflow with access control" },
      { tier: "excellent", note: "Adobe Sign plus DocuSign plus native" },
      { tier: "best", note: "Strong eSignature integrations" },
      { tier: "best", note: "Mature eSignature platform integrations" },
      { tier: "best", note: "Mature eSignature integrations" },
      { tier: "excellent", note: "DocuSign / Adobe / Validated.id" },
      { tier: "best", note: "DocuSign / Adobe / Laserfiche Sign" },
    ],
  },
  {
    label: "Arabic-language and right-to-left",
    cells: [
      { tier: "best", note: "UAE-built; Arabic and right-to-left by design" },
      { tier: "best", note: "Full Arabic UI and OCR" },
      { tier: "best", note: "Full Arabic UI and OCR" },
      { tier: "best", note: "Mature Arabic for regulated" },
      { tier: "best", note: "Strong Arabic capture" },
      { tier: "excellent", note: "Arabic capable" },
      { tier: "excellent", note: "Arabic supported" },
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
    title: "Microsoft-aligned office or specialist DMS?",
    desc: "If M365 is the productivity default and document volumes are moderate, SharePoint plus Purview is the natural primary DMS, especially with Microsoft 365 Copilot for AI. For high-volume capture, regulated retention, or specialist workflow (AP, contracts, healthcare), a dedicated DMS (M-Files, OnBase, DocuWare, Laserfiche) typically delivers materially better outcomes.",
  },
  {
    num: "02",
    title: "General office or process-heavy?",
    desc: "General office DMS (SharePoint, Box) handles broad knowledge-worker content. Process-heavy DMS (M-Files, OnBase, DocuWare, Laserfiche) is purpose-built for AP invoice automation, contract lifecycle, HR records, healthcare records and similar high-volume structured workflows.",
  },
  {
    num: "03",
    title: "Cloud-only or sovereign / on-prem?",
    desc: "Cloud-only (SharePoint Online, Box, M-Files Cloud, DocuWare Cloud) dominates net-new mid-market. On-prem persists for UAE banking, government, ADGM-regulated entities and any organisation with strict sovereignty mandates on documented content.",
  },
  {
    num: "04",
    title: "Migration from legacy DMS or file shares?",
    desc: "Migration from legacy DMS (LiveLink, FileNet, OnBase older versions) is materially harder than from file shares. Budget 30-50 percent of programme effort to migration including taxonomy mapping, metadata enrichment and retention reclassification.",
  },
  {
    num: "05",
    title: "AI extraction as decisive criterion?",
    desc: "Modern DMS can automate 70-90 percent of structured-document data entry (invoices, forms, HR documents). Microsoft 365 Copilot, M-Files Aino, OpenText Aviator and Hyland AI are the leading reference implementations today.",
  },
  {
    num: "06",
    title: "Arabic and multilingual requirement?",
    desc: "All six leading platforms support Arabic UI and OCR; depth varies. SharePoint, M-Files, OpenText and OnBase have the most mature Arabic implementations for UAE government, banking and healthcare deployments.",
  },
];

/* ───────── UAE COMPLIANCE & COMMERCIAL NOTES ───────── */

const uaeNotes = [
  "UAE PDPL, NESA, ADHICS (healthcare), ADGM, DIFC, CBUAE and TDRA frameworks all expect documented retention plus audit trail for records of personal and sensitive data.",
  "Arabic-language OCR and right-to-left UI matter materially; not all global DMS platforms have mature Arabic implementations.",
  "Government, banking and healthcare typically require sovereign or on-prem deployments with UAE residency.",
  "Microsoft SharePoint plus Purview is the most-deployed UAE DMS due to M365 E5 bundling; specialist platforms layer on top for process-heavy use cases.",
  "Hyland OnBase has deep UAE healthcare deployment depth; OpenText is strong in UAE banking and oil and gas; M-Files and DocuWare have growing UAE mid-market presence.",
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "Is SharePoint enough as our DMS?",
    answer:
      "For general office content and Microsoft-aligned mid-market, often yes; SharePoint plus Purview Records Management covers most retention and compliance needs, and Microsoft 365 Copilot provides credible AI search and extraction. For high-volume capture (AP, HR, contracts), regulated industries (healthcare, banking) or specialist workflow, a dedicated DMS layered alongside SharePoint typically delivers better outcomes.",
  },
  {
    question: "M-Files versus OnBase versus OpenText for regulated industries?",
    answer:
      "M-Files wins on metadata-first design and modern UX, particularly for mid-market. OnBase wins on workflow depth and healthcare deployment heritage. OpenText wins on the broadest enterprise scope, large-volume content management and existing brownfield Documentum / Captiva estates. Tiebreaker is existing partner depth and content type.",
  },
  {
    question: "DocuWare or Laserfiche for AP automation?",
    answer:
      "Both are credible. DocuWare has stronger AP-specific accelerators and Intelligent Indexing reference capability. Laserfiche has stronger government records management heritage and broader workflow depth. For pure AP / invoice automation, DocuWare often wins; for government records plus AP, Laserfiche typically wins.",
  },
  {
    question: "Box for UAE deployments: real fit?",
    answer:
      "Box is excellent for external collaboration, cloud-native knowledge work and customer-facing document workflows. For deep internal DMS with regulated retention or high-volume capture, dedicated platforms (M-Files, OnBase, DocuWare, Laserfiche) typically deliver better fit. Box often complements rather than replaces a primary DMS.",
  },
  {
    question: "What is the typical DMS deployment timeline?",
    answer:
      "Mid-market SharePoint plus Purview rollout: 8 to 16 weeks. Specialist DMS (M-Files, DocuWare, Laserfiche) for AP or HR records: 12 to 24 weeks. Enterprise DMS (OpenText, OnBase) replacing legacy systems: 6 to 18 months. User adoption and metadata migration dominate the timeline more than technology deployment.",
  },
  {
    question: "Is Artiflex IT tied to a single DMS vendor?",
    answer:
      "No. We deliver Microsoft SharePoint, M-Files, OpenText, Hyland OnBase, DocuWare, Laserfiche and Box across UAE projects. Vendor recommendation follows content type, workflow maturity, compliance posture and existing stack, not the inventory.",
  },
  {
    question: "How do you handle Arabic-language and right-to-left requirements?",
    answer:
      "Arabic OCR plus right-to-left UI is part of the design, not a retrofit. All six leading platforms support Arabic; SharePoint, M-Files, OpenText and OnBase have the most mature implementations for UAE government, banking and healthcare.",
  },
  {
    question: "Do you offer managed DMS?",
    answer:
      "Yes. Co-managed and fully-managed engagements include capture quality monitoring, workflow tuning, retention enforcement, AI extraction model improvement and quarterly governance reviews.",
  },
];

/* ───────── HERO ───────── */

function DMSHero() {
  const { open: openContact } = useContactModal();
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-navy-deep">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/infra.png')" }}
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
                <Link to="/infrastructure" className="transition-colors hover:text-white">
                  Infrastructure
                </Link>
              </li>
              <li className="text-slate-600">/</li>
              <li>
                <span className="font-medium text-[#28B5E1]">Document Management Systems</span>
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
            Document Management{" "}
            <span className="gradient-text opacity-20">Systems</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Buyer's Guide, Vendor Matrix and Gartner-style Scorecard
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            A UAE buyer's guide for enterprise document management. Honest comparisons across <span className="font-semibold text-white">Microsoft SharePoint, M-Files, OpenText Documentum / Content Suite, Hyland OnBase, DocuWare, Laserfiche and Box</span>, with a Gartner-style scorecard and Artiflex recommendations grounded in UAE deployments and compliance frameworks.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#vendor-matrix"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base"
            >
              Compare Vendors
            </a>
            <a
              href="#gartner-comparison"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base"
            >
              Gartner Style Review
            </a>
            <Link
              to="/blog/origin-document-management-systems"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-[#28B5E1]/40 bg-[#28B5E1]/10 px-6 py-3 text-sm font-semibold text-[#28B5E1] backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1] hover:bg-[#28B5E1]/20 hover:text-white sm:px-7 sm:py-3.5 sm:text-base"
            >
              Read Origin Story
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
            </Link>
            <button
              onClick={openContact}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base"
            >
              Get a Free DMS Assessment
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

export default function DocumentManagementSystems() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Document Management Systems (DMS) UAE | Buyer's Guide & Vendor Scorecard | Artiflex IT</title>
        <meta
          name="description"
          content="UAE buyer's guide for enterprise document management. Vendor matrix and Gartner-style scorecard across Microsoft SharePoint, M-Files, OpenText, Hyland OnBase, DocuWare, Laserfiche and Box."
        />
        <link rel="canonical" href="https://artiflexit.com/infrastructure/document-management-systems" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Artiflex IT",
            "url": "https://artiflexit.com/infrastructure/document-management-systems",
            "areaServed": [
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "City", "name": "Dubai" },
              { "@type": "City", "name": "Abu Dhabi" },
            ],
            "description": "Vendor-neutral UAE buyer's guide for enterprise document management across Microsoft SharePoint, M-Files, OpenText, Hyland OnBase, DocuWare, Laserfiche and Box.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Document Management Systems",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description": "UAE document management delivery across Microsoft SharePoint, M-Files, OpenText, Hyland OnBase, DocuWare, Laserfiche and Box. Arabic-language ready and compliance-aligned.",
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
            "name": "Document Management Vendors for UAE Buyers",
            "itemListElement": vendors.map((v, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <DMSHero />

      {/* ───────── DMS VENDORS WE DELIVER (HONEYCOMB) ───────── */}
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
              DMS{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Platforms
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The document management platforms we design, deploy and operate across UAE projects. Content type, workflow maturity, compliance posture and existing stack drive the choice.
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
                layouts[dmsVendorList.length] ??
                [Math.ceil(dmsVendorList.length / 2), Math.floor(dmsVendorList.length / 2)];
              const rows: typeof dmsVendorList[] = [];
              let i = 0;
              sizes.forEach((s) => {
                rows.push(dmsVendorList.slice(i, i + s));
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
            {dmsVendorList.map((v) => (
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
              {dmsVendorList.length} platforms
            </span>
            , picked by content type, workflow and compliance posture.
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
              Selection framework
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Before any DMS commitment, walk through these questions. Most failed DMS projects fail at user adoption, not at the technology selection; the platform must fit how people actually work.
            </p>
          </div>

          <SelectionFrameworkCards />

          {/* Selection criteria checklist */}
          <div className="mx-auto mt-16 max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
                The Checklist
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                Lenses to size and shortlist against
              </h3>
            </div>
            <ChecklistCards />
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
              <span className="gradient-text">DMS buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              Seven DMS platforms cover the majority of UAE deployments. Microsoft SharePoint dominates general office; M-Files leads metadata-driven content; OpenText and Hyland lead regulated and large-enterprise content; DocuWare and Laserfiche lead invoice automation; Box leads cloud-native external collaboration.
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
        </div>
      </section>

      {/* ───────── DETAILED VENDOR CARDS & FEATURE RATINGS ───────── */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Detailed Comparison on DMS Vendors
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Strengths, blind spots and the buyer profile each platform was built for. DMS platform choice is highly use-case-dependent; we assess content type, workflow maturity, compliance posture and existing stack before recommending.
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
              <span className="font-semibold text-white">Artiflex IT delivers Microsoft SharePoint, M-Files, OpenText, Hyland OnBase, DocuWare, Laserfiche and Box</span> across UAE projects. <br />
              <span className="text-xs italic text-white sm:text-base">DMS recommendation follows content type, workflow maturity and compliance posture, not a vendor preference.</span>
            </p>
          </div>

          {/* Feature ratings */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Scorecard
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each platform is rated across the capabilities that matter most for UAE enterprise document management, using a standardised tier scale. A gold ★ marker denotes best-in-class performance.
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
              The right DMS platform for any environment falls out of a few honest questions. Walk through these before any vendor demo and the shortlist usually picks itself.
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

      {/* ───────── UAE COMPLIANCE & COMMERCIAL NOTES ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              UAE compliance & Arabic-language notes
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              What changes when you deploy DMS in the UAE
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              UAE document management carries specific compliance, language and operational considerations that change the recommendation versus a generic platform conversation.
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

      {/* ───────── OUR DELIVERY MODEL ───────── */}
      <DeliveryModel />

      {/* ───────── WHY ARTIFLEX IT ───────── */}
      <section className="relative overflow-hidden bg-navy-deep py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(27,138,199,0.18),transparent_60%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#28B5E1]">
              Why Artiflex IT
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              14+ years of UAE DMS delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when SharePoint wins, when M-Files wins, when OpenText, OnBase, DocuWare, Laserfiche or Box wins. Content-driven and compliance-aware sizing before quoting.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years of UAE DMS delivery" },
              { value: "500+", label: "Projects delivered, GCC-wide" },
              { value: "7", label: "DMS platforms actively delivered" },
              { value: "AR", label: "Arabic-ready by default" },
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
                  Microsoft SharePoint plus Purview, M-Files, OpenText Documentum / Content Suite, Hyland OnBase, DocuWare, Laserfiche and Box across UAE projects.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Compliance frameworks
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  UAE PDPL, NESA, ADHICS, ADGM, DIFC, CBUAE and TDRA-aligned designs with documented retention, audit trail and eDiscovery evidence.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Coverage area
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  On-site across Dubai, Abu Dhabi and Sharjah. Remote across the UAE, Oman and Saudi Arabia. 24/7 managed-service bench for production estates.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Engagement model
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Build plus operate, consumption, or fully managed. Capture quality monitoring, workflow tuning, retention enforcement and AI extraction model improvement are part of the engagement.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#28B5E1] px-6 py-3 font-display text-sm font-semibold text-navy-deep transition-colors hover:bg-white sm:text-base"
            >
              Book a free DMS assessment
            </Link>
            <Link
              to="/infrastructure"
              className="inline-flex items-center justify-center rounded-lg border border-white/15 px-6 py-3 font-display text-sm font-medium text-slate-300 transition-colors hover:border-[#28B5E1]/40 hover:text-white sm:text-base"
            >
              Back to Infrastructure →
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
            description="What UAE buyers ask us most about choosing SharePoint, M-Files, OpenText, OnBase, DocuWare, Laserfiche and Box for document management."
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
        title="Free DMS Assessment"
        description="60-minute review of your current document estate, capture volume, retention compliance against UAE frameworks, Arabic-language readiness and recommended platform plus migration plan."
        primaryButton={{ text: "Book Assessment", action: "modal" }}
      />
    </>
  );
}
