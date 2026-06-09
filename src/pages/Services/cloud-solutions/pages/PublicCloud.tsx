import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import DeliveryModel from "@/components/sections/DeliveryModel";

/* ───────── PUBLIC CLOUD VENDORS (HONEYCOMB) ───────── */

const cloudVendorList = [
  { slug: "aws", name: "Amazon Web Services", logo: "/logos/Amazon_Web_Services.svg" },
  { slug: "azure", name: "Microsoft Azure", logo: "/logos/Microsoft_Azure.svg" },
  { slug: "gcp", name: "Google Cloud", logo: "/logos/Google-Cloud.webp" },
  { slug: "oci", name: "Oracle Cloud", logo: "/logos/Oracle.png" },
  { slug: "ibm-cloud", name: "IBM Cloud", logo: "/logos/IBM-Security.png" },
  { slug: "alibaba", name: "Alibaba Cloud", logo: "/logos/AlibabaCloudLogo.png" },
];

/* ───────── BUYER'S GUIDE, SELECTION FRAMEWORK ───────── */

const selectionFramework = [
  {
    step: "1",
    question: "What is the cloud for?",
    capture: "Net-new application development, lift-and-shift migration, SaaS-hosting platform, AI / ML training, data analytics warehouse, DR target, or dev / test only",
    why: "Each profile has natural cloud strengths: AWS leads net-new, Azure leads M365-aligned estates, GCP leads analytics and AI.",
  },
  {
    step: "2",
    question: "Existing enterprise agreements?",
    capture: "Microsoft EA with Azure commitments, Oracle ULA, IBM ELA, AWS Enterprise Discount Program",
    why: "Existing licensing dramatically changes the TCO calculation; Microsoft EA customers typically default to Azure for that reason.",
  },
  {
    step: "3",
    question: "Workload mix?",
    capture: "Windows-centric, Linux-centric, container-native, mainframe migration, SAP / Oracle databases, AI / GPU",
    why: "Workload determines the natural cloud; SAP and Oracle have specific cloud certifications and licensing implications.",
  },
  {
    step: "4",
    question: "Sovereignty and residency?",
    capture: "UAE in-country residency mandated, regional GCC acceptable, global acceptable, or sovereign cloud required (banking, government)",
    why: "All hyperscalers offer UAE residency; OCI has Abu Dhabi region for government; sovereign cloud frameworks shape the choice.",
  },
  {
    step: "5",
    question: "AI and GPU strategy?",
    capture: "Foundation model inferencing (Bedrock, Azure OpenAI, Vertex), custom model training, AI-native applications, or none",
    why: "AI capacity is uneven across clouds: Azure has the deepest OpenAI access, GCP the strongest Gemini and TPU, AWS the broadest Bedrock model catalog.",
  },
  {
    step: "6",
    question: "FinOps maturity?",
    capture: "Mature FinOps team, growing capability, reactive cost management, or no discipline",
    why: "Public cloud cost discipline matters more than platform choice for ongoing economics; under-disciplined cloud spend grows 30-40 percent year over year.",
  },
  {
    step: "7",
    question: "Single cloud or multi-cloud?",
    capture: "Strategic single-cloud, deliberate multi-cloud, acquired / inherited multi-cloud, or multi-cloud for resilience",
    why: "Multi-cloud raises operational complexity; right answer when capability gaps or sovereignty drive it, not by default.",
  },
];

/* ───────── SELECTION CRITERIA CHECKLIST ───────── */

const checklistGroups = [
  {
    title: "Technical fit",
    items: [
      "UAE region presence",
      "Native services breadth",
      "AI / GPU availability",
      "Workload-specific certifications (SAP, Oracle)",
      "Networking and edge",
      "Hybrid and on-prem extension",
    ],
  },
  {
    title: "Operational fit",
    items: [
      "Console and CLI maturity",
      "IaC support (Terraform, native)",
      "AIOps and recommendations",
      "Identity and access (IAM)",
      "Observability and monitoring",
    ],
  },
  {
    title: "Commercial fit",
    items: [
      "Reserved instances / committed use discount",
      "EA / ULA / EDP discount programs",
      "Egress cost economics",
      "FinOps tooling depth",
      "Sustained-use discount",
    ],
  },
  {
    title: "Service fit",
    items: [
      "Local UAE TAM and support",
      "Professional services depth",
      "Partner ecosystem",
      "Training and certification",
      "Sovereignty-compliance support",
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
    slug: "aws",
    name: "Amazon Web Services (AWS)",
    best: "Broadest Service Catalog (Recommended)",
    strength: "Launched March 2006; largest public cloud globally by revenue and footprint. Bahrain region (me-south-1) serves UAE since 2019. Broadest service catalog in market, mature Bedrock plus SageMaker with Anthropic / Mistral / Llama. AWS Outposts, Local Zones and Wavelength extend the cloud on-prem. Largest partner ecosystem with deep UAE presence.",
    watch: "Egress and complex pricing demand mature FinOps discipline; cost optimisation is the biggest day-2 lift across AWS customers.",
    logo: "/logos/Amazon_Web_Services.svg",
  },
  {
    slug: "azure",
    name: "Microsoft Azure",
    best: "Best for Microsoft Estates (Recommended)",
    strength: "Launched 2010; deeply integrated with Microsoft 365 and Windows estates. UAE North plus UAE Central regions since 2019. Azure OpenAI Service is the exclusive home for GPT-4-class models. Azure Stack HCI, Arc and Edge Zones for hybrid. Azure Hybrid Benefit materially changes TCO for Windows Server / SQL Server customers.",
    watch: "Service breadth equals operational breadth, IAM and policy mature but complex; cost management needs structured tag and subscription discipline.",
    logo: "/logos/Microsoft_Azure.svg",
  },
  {
    slug: "gcp",
    name: "Google Cloud (GCP)",
    best: "Best for Data & AI (Recommended)",
    strength: "Launched 2008 (App Engine); leads on data analytics, AI / ML and Kubernetes. Dammam region serves UAE; Doha planned. Vertex AI plus Gemini and TPU advantage for training; BigQuery is the analytics reference. Anthos plus GDC Hosted for hybrid. Sustained-use discounts and Recommender lead on FinOps tooling.",
    watch: "UAE partner ecosystem is growing rather than dominant; service catalog is narrower outside data, AI and Kubernetes.",
    logo: "/logos/Google-Cloud.webp",
  },
  {
    slug: "oci",
    name: "Oracle Cloud Infrastructure (OCI)",
    best: "Best for Oracle & UAE Government (Recommended)",
    strength: "Launched 2016 (Gen 2); strong Oracle Database and SAP positioning. Abu Dhabi and Dubai regions including UAE Government Cloud. Oracle Cloud at Customer and Dedicated Region extend the cloud on-prem. Aggressive list pricing and bring-your-own-licence economics make OCI the default for Oracle Database workloads and many UAE government deployments.",
    watch: "PaaS catalog is growing rather than peer to AWS / Azure; best fit when Oracle workloads or UAE government residency are decisive.",
    logo: "/logos/Oracle.png",
  },
  {
    slug: "ibm-cloud",
    name: "IBM Cloud",
    best: "Best for Regulated & Mainframe",
    strength: "Launched 2014 (SoftLayer); deep mainframe and regulated industry presence. Multi-zone UAE presence via partner. Watsonx plus IBM Granite models for AI. IBM Cloud Satellite for hybrid. Reference for regulated industries with deep banking, healthcare and government heritage.",
    watch: "Service breadth narrower than AWS / Azure for net-new development; best fit when mainframe migration, regulated industry or existing IBM ELA drives the decision.",
    logo: "/logos/IBM-Security.png",
  },
  {
    slug: "alibaba",
    name: "Alibaba Cloud",
    best: "Best for Middle East and Asia Trade",
    strength: "Launched 2009; dominant in Asia-Pacific, growing in the Middle East. Dubai region operational. PAI plus Qwen models for AI. Strong regional channel and competitive in-region pricing. Strong fit for Middle East and Asia trade workloads, particularly when serving China-aligned customer and supplier ecosystems.",
    watch: "Hybrid story is limited compared to AWS Outposts / Azure Stack / OCI at Customer; some UAE buyers face procurement constraints based on geopolitics.",
    logo: "/logos/AlibabaCloudLogo.png",
  },
];

/* ───────── VENDOR MATRIX (BUYER'S MATRIX) ───────── */

const matrixVendors = [
  { name: "AWS", recommended: true, rank: "#1" },
  { name: "Microsoft Azure", recommended: true },
  { name: "Google Cloud", recommended: true },
  { name: "Oracle Cloud (OCI)", recommended: true },
  { name: "IBM Cloud" },
  { name: "Alibaba Cloud" },
];

type StarCell = { stars: number; note: string };
type VerdictCell = { recommended?: boolean; rank?: string; text: string };
type MatrixRow =
  | { label: string; type: "text"; cells: string[] }
  | { label: string; type: "stars"; cells: StarCell[] }
  | { label: string; type: "verdict"; cells: VerdictCell[] };

const matrixRows: MatrixRow[] = [
  {
    label: "Heritage and scale",
    type: "text",
    cells: [
      "Launched March 2006; largest public cloud globally by revenue",
      "Launched 2010; deeply integrated with Microsoft 365 and Windows",
      "Launched 2008 (App Engine); leads on data, AI / ML and Kubernetes",
      "Launched 2016 (Gen 2); Oracle Database and SAP reference",
      "Launched 2014 (SoftLayer); mainframe and regulated industry depth",
      "Launched 2009; dominant Asia-Pacific, growing Middle East",
    ],
  },
  {
    label: "UAE region presence",
    type: "stars",
    cells: [
      { stars: 5, note: "Bahrain region (me-south-1) since 2019" },
      { stars: 5, note: "UAE North plus UAE Central since 2019" },
      { stars: 4, note: "Dammam region serves UAE; Doha planned" },
      { stars: 5, note: "Abu Dhabi plus Dubai; UAE Government Cloud" },
      { stars: 4, note: "Multi-zone presence via partner" },
      { stars: 4, note: "Dubai region operational" },
    ],
  },
  {
    label: "Service breadth",
    type: "stars",
    cells: [
      { stars: 5, note: "Broadest service catalog in market" },
      { stars: 5, note: "Comparable breadth; deepest Microsoft integration" },
      { stars: 5, note: "Strong on data, AI, K8s; narrower elsewhere" },
      { stars: 4, note: "Database and IaaS-strong; growing PaaS" },
      { stars: 4, note: "Mature for regulated and AI workloads" },
      { stars: 4, note: "Broad services, regional bias" },
    ],
  },
  {
    label: "AI / ML stack",
    type: "stars",
    cells: [
      { stars: 5, note: "Bedrock plus SageMaker; Anthropic / Mistral / Llama" },
      { stars: 5, note: "Azure OpenAI Service plus ML Studio" },
      { stars: 5, note: "Vertex AI plus Gemini; TPU advantage" },
      { stars: 4, note: "OCI Generative AI plus Cohere" },
      { stars: 4, note: "Watsonx plus IBM Granite" },
      { stars: 4, note: "PAI plus Qwen" },
    ],
  },
  {
    label: "Hybrid and on-prem extension",
    type: "stars",
    cells: [
      { stars: 5, note: "AWS Outposts, Local Zones, Wavelength" },
      { stars: 5, note: "Azure Stack HCI, Arc, Edge Zones" },
      { stars: 4, note: "Anthos, GDC Hosted" },
      { stars: 5, note: "Oracle Cloud at Customer; Dedicated Region" },
      { stars: 4, note: "IBM Cloud Satellite" },
      { stars: 3, note: "Limited hybrid story" },
    ],
  },
  {
    label: "Enterprise / regulated industry",
    type: "stars",
    cells: [
      { stars: 5, note: "FedRAMP, NESA, ISO mature" },
      { stars: 5, note: "Deep Microsoft regulatory mappings" },
      { stars: 4, note: "Growing regulated presence" },
      { stars: 5, note: "UAE Government Cloud, banking-grade" },
      { stars: 5, note: "Deep regulated-industry heritage" },
      { stars: 4, note: "Strong in Middle East government" },
    ],
  },
  {
    label: "Pricing and FinOps tooling",
    type: "stars",
    cells: [
      { stars: 4, note: "Cost Explorer + Compute Optimizer + Savings Plans" },
      { stars: 4, note: "Cost Management + Advisor + Reservations" },
      { stars: 5, note: "Recommender + CUDs + sustained use discounts" },
      { stars: 5, note: "Aggressive list pricing; bring-your-own licence" },
      { stars: 4, note: "Solid commitment-based pricing" },
      { stars: 4, note: "Competitive in region" },
    ],
  },
  {
    label: "Partner and UAE service ecosystem",
    type: "stars",
    cells: [
      { stars: 5, note: "Largest partner ecosystem; deep UAE" },
      { stars: 5, note: "Deep UAE partner ecosystem" },
      { stars: 4, note: "Growing UAE partner network" },
      { stars: 5, note: "Strong UAE government and banking" },
      { stars: 4, note: "Mature UAE Global Business Services" },
      { stars: 4, note: "Strong regional channel" },
    ],
  },
  {
    label: "Best suited for",
    type: "text",
    cells: [
      "Net-new development, broadest workload mix, mature AWS-aligned customers",
      "Microsoft EA / M365 estates and Windows-heavy workloads",
      "Data analytics, AI / ML training, Kubernetes-native applications",
      "Oracle Database, SAP and UAE government / banking deployments",
      "Mainframe migration, regulated industries and IBM-aligned estates",
      "Middle East and Asia trade workloads with regional partner economics",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "Largest public cloud globally; broadest service catalog and deepest UAE partner ecosystem." },
      { recommended: true, text: "Best for Microsoft-aligned enterprises; Azure OpenAI Service is the exclusive home for GPT-4-class models." },
      { recommended: true, text: "Best for data and AI; Vertex AI plus Gemini and TPU lead training, BigQuery is the analytics reference." },
      { recommended: true, text: "Best for Oracle Database, SAP and UAE government; Abu Dhabi and Dubai regions with banking-grade compliance." },
      { text: "Reference for mainframe migration and regulated industries; pick when IBM ELA or banking heritage drives the decision." },
      { text: "Strong regional channel and competitive pricing for Middle East and Asia trade workloads." },
    ],
  },
];

/* ───────── GARTNER-STYLE CAPABILITY SCORECARD ───────── */

const featureVendors = [
  "AWS",
  "Microsoft Azure",
  "Google Cloud",
  "Oracle Cloud",
  "IBM Cloud",
  "Alibaba Cloud",
];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "Service breadth",
    cells: [
      { tier: "best", note: "Broadest service catalog in market" },
      { tier: "best", note: "Comparable breadth, Microsoft-deep" },
      { tier: "best", note: "Strong on data and AI; narrower elsewhere" },
      { tier: "excellent", note: "Database and IaaS-strong" },
      { tier: "excellent", note: "Mature for regulated workloads" },
      { tier: "excellent", note: "Broad services, regional bias" },
    ],
  },
  {
    label: "UAE / Middle East presence",
    cells: [
      { tier: "best", note: "Bahrain region serving UAE" },
      { tier: "best", note: "UAE North plus Central regions" },
      { tier: "excellent", note: "Dammam region serves UAE" },
      { tier: "best", note: "Abu Dhabi plus Dubai; government cloud" },
      { tier: "excellent", note: "Multi-zone presence via partner" },
      { tier: "excellent", note: "Dubai region operational" },
    ],
  },
  {
    label: "AI and ML capability",
    cells: [
      { tier: "best", note: "Bedrock plus SageMaker; Anthropic / Mistral / Llama" },
      { tier: "best", note: "Azure OpenAI Service exclusive" },
      { tier: "best", note: "Vertex AI plus Gemini; TPU advantage" },
      { tier: "excellent", note: "OCI Generative AI plus Cohere" },
      { tier: "excellent", note: "Watsonx plus IBM Granite" },
      { tier: "excellent", note: "PAI plus Qwen" },
    ],
  },
  {
    label: "Microsoft / Oracle / SAP integration",
    cells: [
      { tier: "excellent", note: "Strong via partner ISV" },
      { tier: "best", note: "Best-in-class Microsoft integration" },
      { tier: "strong", note: "Solid SAP support; weaker Microsoft" },
      { tier: "best", note: "Oracle reference plus strong SAP" },
      { tier: "excellent", note: "Strong SAP and enterprise apps" },
      { tier: "excellent", note: "Strong SAP plus regional apps" },
    ],
  },
  {
    label: "Sovereignty and regulated industry",
    cells: [
      { tier: "best", note: "Mature compliance posture" },
      { tier: "best", note: "Deep regulatory mapping" },
      { tier: "excellent", note: "Growing regulated story" },
      { tier: "best", note: "UAE Government Cloud, banking-grade" },
      { tier: "best", note: "Reference for regulated industries" },
      { tier: "excellent", note: "Strong Middle East government" },
    ],
  },
  {
    label: "Hybrid and on-prem",
    cells: [
      { tier: "best", note: "AWS Outposts plus Local Zones" },
      { tier: "best", note: "Azure Stack plus Arc" },
      { tier: "excellent", note: "Anthos plus GDC Hosted" },
      { tier: "best", note: "Oracle Cloud at Customer plus Dedicated Region" },
      { tier: "excellent", note: "IBM Cloud Satellite" },
      { tier: "strong", note: "Limited hybrid story" },
    ],
  },
  {
    label: "FinOps tooling",
    cells: [
      { tier: "excellent", note: "Cost Explorer plus Compute Optimizer" },
      { tier: "excellent", note: "Cost Management plus Advisor" },
      { tier: "best", note: "Recommender plus sustained use discounts" },
      { tier: "best", note: "Aggressive list pricing and BYOL" },
      { tier: "excellent", note: "Solid commitment-based pricing" },
      { tier: "excellent", note: "Competitive in region" },
    ],
  },
  {
    label: "Partner ecosystem and UAE service",
    cells: [
      { tier: "best", note: "Largest partner ecosystem" },
      { tier: "best", note: "Deep UAE partner network" },
      { tier: "excellent", note: "Growing UAE partner network" },
      { tier: "best", note: "Strong UAE government / banking" },
      { tier: "excellent", note: "Mature UAE GBS presence" },
      { tier: "excellent", note: "Strong regional channel" },
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
    title: "Existing Microsoft estate?",
    desc: "If you have a Microsoft EA, Microsoft 365 E5, or significant Windows Server licensing, Azure is the natural primary cloud. Azure Hybrid Benefit and Reserved Instances change the TCO calculation materially.",
  },
  {
    num: "02",
    title: "Oracle or SAP workloads?",
    desc: "OCI is the reference for Oracle Database (Real Application Clusters, Exadata Cloud Service); SAP runs well on all hyperscalers but RISE with SAP economics often favour Azure or AWS.",
  },
  {
    num: "03",
    title: "AI as primary driver?",
    desc: "Azure for OpenAI / GPT-4-class workloads. GCP for Gemini, TPU-accelerated training and open-source model fine-tuning. AWS for the broadest commercial model catalog (Bedrock) and lowest-cost inference.",
  },
  {
    num: "04",
    title: "Sovereignty and government?",
    desc: "OCI Abu Dhabi and Dubai regions are the strongest UAE Government Cloud option. Azure and AWS offer sovereign-cloud frameworks via local partners and certified residency.",
  },
  {
    num: "05",
    title: "Single cloud or multi-cloud?",
    desc: "Multi-cloud raises operational complexity and FinOps difficulty materially. Default to single-cloud; the right time for deliberate multi-cloud is when capability gaps, sovereignty requirements or M&A inheritance force it.",
  },
  {
    num: "06",
    title: "FinOps maturity as a constraint?",
    desc: "Under-disciplined cloud spend grows 30-40 percent year over year. Reserved instances, committed-use discounts, tag governance and right-sizing matter more than platform choice for ongoing economics.",
  },
];

/* ───────── UAE SOVEREIGNTY & COMMERCIAL NOTES ───────── */

const uaeNotes = [
  "AWS Bahrain region (me-south-1), Azure UAE North and UAE Central, GCP Dammam, OCI Abu Dhabi and Dubai are all live as of 2026.",
  "UAE PDPL, NESA and TDRA frameworks expect documented residency for personal and sensitive data; hyperscaler residency now satisfies this.",
  "Banking (CBUAE), government and ADGM-regulated entities increasingly require sovereign-cloud frameworks for sensitive workloads.",
  "AI workload allocation in UAE faces GPU scarcity; multi-cloud capacity strategy is now common for training-heavy workloads.",
  "Egress economics matter materially: design for outbound data minimisation and reserved bandwidth where possible.",
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "AWS, Azure or GCP for a UAE enterprise primary cloud?",
    answer:
      "If you have Microsoft EA and Microsoft-aligned workloads, Azure is the natural primary. If you are starting greenfield with broad workloads, AWS has the deepest service catalog. If your roadmap is data analytics and AI-heavy, GCP often wins on capability per dollar.",
  },
  {
    question: "Is OCI a serious alternative?",
    answer:
      "Yes, for Oracle Database workloads, SAP on certified infrastructure, and UAE government / banking deployments where the Abu Dhabi region and bring-your-own-licence economics dominate. OCI is materially under-rated in the GCC.",
  },
  {
    question: "Should we go multi-cloud from day one?",
    answer:
      "No, by default. Multi-cloud raises operational complexity and FinOps difficulty materially. The right time for deliberate multi-cloud is when capability gaps, sovereignty requirements or M&A inheritance force it.",
  },
  {
    question: "How much cloud sovereignty is enough?",
    answer:
      "Driven by regulator: CBUAE expects data residency and operational control; TDRA frameworks have documented requirements; ADGM has specific guidance. Sovereign cloud frameworks (hyperscaler plus local sovereign partner) are now the typical answer for sensitive workloads.",
  },
  {
    question: "What is the typical UAE cloud migration timeline?",
    answer:
      "Lift-and-shift of a 100-VM estate: three to six months. Application re-architecture for cloud-native: 12 to 18 months. Full data-centre exit: 18 to 36 months. Right-sizing matters more than tooling for ongoing economics.",
  },
  {
    question: "Is Artiflex IT tied to a single cloud vendor?",
    answer:
      "No. We deliver AWS, Microsoft Azure, Google Cloud, Oracle Cloud Infrastructure, IBM Cloud and Alibaba Cloud across UAE projects. Vendor recommendation follows workload mix, existing licensing and sovereignty posture, not the inventory.",
  },
  {
    question: "How do you handle AI / GPU capacity in UAE?",
    answer:
      "GPU scarcity is real; we secure capacity across Azure OpenAI, AWS Bedrock, GCP Vertex AI and OCI Generative AI per use case. Multi-cloud capacity strategy is now common for training-heavy workloads.",
  },
  {
    question: "Can you handle cloud migrations with FinOps governance?",
    answer:
      "Yes. We pair migration with structured FinOps: tag governance, reserved-instance and committed-use sizing, right-sizing automation and quarterly cost-optimisation reviews. Under-disciplined cloud spend grows 30-40 percent year over year, FinOps is part of the project, not a follow-up.",
  },
];

/* ───────── HERO ───────── */

function PublicCloudHero() {
  const { open: openContact } = useContactModal();
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-navy-deep">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/cloud-solutions.jpg')" }}
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
                <Link to="/cloud-solutions" className="transition-colors hover:text-white">
                  Cloud Solutions
                </Link>
              </li>
              <li className="text-slate-600">/</li>
              <li>
                <span className="font-medium text-[#28B5E1]">Public Cloud</span>
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
            Public{" "}
            <span className="gradient-text">Cloud</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Buyer's Guide, Vendor Matrix and Gartner-style Scorecard
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            A UAE buyer's guide for public cloud platforms. Honest comparisons across <span className="font-semibold text-white">AWS, Microsoft Azure, Google Cloud, Oracle Cloud Infrastructure, IBM Cloud and Alibaba Cloud</span>, with a detailed scorecard and Artiflex recommendations grounded in UAE deployments and sovereignty frameworks.
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
              to="/blog/origin-public-cloud"
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
              Get a Free Public Cloud Assessment
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

export default function PublicCloud() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Public Cloud UAE | AWS, Azure & GCP Buyer's Guide | Artiflex IT</title>
        <meta
          name="description"
          content="UAE buyer's guide for public cloud platforms. Vendor matrix and Gartner-style scorecard across AWS, Microsoft Azure, Google Cloud, Oracle Cloud (OCI), Alibaba Cloud and IBM Cloud."
        />
        <link rel="canonical" href="https://artiflexit.com/cloud-solutions/public-cloud" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Artiflex IT",
            "url": "https://artiflexit.com/cloud-solutions/public-cloud",
            "areaServed": [
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "City", "name": "Dubai" },
              { "@type": "City", "name": "Abu Dhabi" },
            ],
            "description": "Vendor-neutral UAE buyer's guide for public cloud platforms across AWS, Azure, Google Cloud, Oracle Cloud, IBM Cloud and Alibaba Cloud.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Public Cloud Services",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description": "UAE public cloud delivery across AWS, Azure, GCP, OCI, IBM Cloud and Alibaba Cloud: workload-driven sizing, sovereignty-aligned design and FinOps governance.",
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
            "name": "Public Cloud Platforms for UAE Buyers",
            "itemListElement": vendors.map((v, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <PublicCloudHero />

      {/* ───────── PUBLIC CLOUD PLATFORMS WE DELIVER (HONEYCOMB) ───────── */}
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
              Public Cloud{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Platforms
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The hyperscalers we design, migrate to and operate across UAE projects. Workload mix, existing licensing, AI roadmap and sovereignty posture drive the choice.
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
                layouts[cloudVendorList.length] ??
                [Math.ceil(cloudVendorList.length / 2), Math.floor(cloudVendorList.length / 2)];
              const rows: typeof cloudVendorList[] = [];
              let i = 0;
              sizes.forEach((s) => {
                rows.push(cloudVendorList.slice(i, i + s));
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
            {cloudVendorList.map((v) => (
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
              {cloudVendorList.length} platforms
            </span>
            , picked by workload mix, existing licensing and sovereignty posture.
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
              Before any cloud platform commitment, walk through these questions. Most over-spent UAE cloud bills come from picking the wrong primary cloud for the workload mix and accepting lift-and-shift instead of right-sizing.
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
              <span className="gradient-text">Public Cloud buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              Six public cloud platforms cover the majority of UAE enterprise workloads.
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
              Detailed Comparison on Public Cloud Platforms
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Strengths, blind spots and the buyer profile each hyperscaler was built for. Cloud choice typically follows existing enterprise agreements, workload mix and sovereignty posture more than feature comparison.
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
              <span className="font-semibold text-white">Artiflex IT delivers AWS, Microsoft Azure, Google Cloud, Oracle Cloud Infrastructure, IBM Cloud and Alibaba Cloud</span> across UAE projects. <br />
              <span className="text-xs italic text-white sm:text-base">Cloud recommendation follows existing licensing, workload mix and sovereignty posture, not a vendor preference.</span>
            </p>
          </div>

          {/* Feature ratings */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Scorecard
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each hyperscaler is rated across the capabilities that matter most for UAE enterprise cloud, using a standardised tier scale. A gold ★ marker denotes best-in-class performance.
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
              The right hyperscaler for any environment falls out of a few honest questions. Walk through these before any vendor demo and the shortlist usually picks itself.
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

      {/* ───────── UAE SOVEREIGNTY & COMMERCIAL NOTES ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              UAE sovereignty & commercial notes
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              What changes when you buy public cloud in the UAE
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              UAE public cloud carries specific sovereignty, residency and partner considerations that change the recommendation versus a generic hyperscaler conversation.
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
              14+ years of UAE public cloud delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when AWS wins, when Azure wins, when GCP, OCI, IBM Cloud or Alibaba wins, and when single-cloud beats multi-cloud. Always a workload-driven and sovereignty-aware sizing before quoting.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years of UAE cloud delivery" },
              { value: "500+", label: "Projects delivered, GCC-wide" },
              { value: "6", label: "Hyperscalers actively delivered" },
              { value: "24/7", label: "Managed-service coverage" },
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
                  AWS (me-south-1 Bahrain), Microsoft Azure (UAE North and Central), Google Cloud (Dammam), Oracle Cloud (Abu Dhabi and Dubai), IBM Cloud and Alibaba Cloud (Dubai).
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Compliance frameworks
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  NESA, UAE PDPL, TDRA, CBUAE, ADGM, ISO 27001 and ADHICS-aligned designs with documented residency and audit-ready evidence packs.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Coverage area
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  On-site across Dubai, Abu Dhabi and Sharjah. Remote across the UAE, Oman and Saudi Arabia. 24/7 cloud-operations bench for managed customers.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Engagement model
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Migration plus managed plus FinOps governance, or assessment-only. Existing-licensing leverage (Microsoft EA, Oracle ULA, IBM ELA, AWS EDP) is part of the design.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#28B5E1] px-6 py-3 font-display text-sm font-semibold text-navy-deep transition-colors hover:bg-white sm:text-base"
            >
              Book a free cloud assessment
            </Link>
            <Link
              to="/cloud-solutions"
              className="inline-flex items-center justify-center rounded-lg border border-white/15 px-6 py-3 font-display text-sm font-medium text-slate-300 transition-colors hover:border-[#28B5E1]/40 hover:text-white sm:text-base"
            >
              Back to Cloud Solutions →
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
            description="What UAE buyers ask us most about choosing AWS, Azure, GCP, OCI and the wider hyperscaler landscape."
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
        title="Free Public Cloud Assessment"
        description="60-minute review of your current cloud estate, workload mix per hyperscaler, sovereignty posture, FinOps maturity and a recommended phased migration plan."
        primaryButton={{ text: "Book Assessment", action: "modal" }}
      />
    </>
  );
}
