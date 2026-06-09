import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import DeliveryModel from "@/components/sections/DeliveryModel";

/* ───────── BACKUP VENDORS (HONEYCOMB) ───────── */

const backupVendorList = [
  { slug: "avepoint", name: "AvePoint", logo: "/logos/AvePoint.png" },
  { slug: "veeam", name: "Veeam", logo: "/logos/veeam.svg" },
  { slug: "commvault", name: "Commvault", logo: "/logos/Commvault.svg" },
  { slug: "rubrik", name: "Rubrik", logo: "/logos/Rubrik.png" },
  { slug: "cohesity", name: "Cohesity", logo: "/logos/Cohesity.png" },
  { slug: "druva", name: "Druva", logo: "/logos/Druva.png" },
];

/* ───────── BUYER'S GUIDE, SELECTION FRAMEWORK ───────── */

const selectionFramework = [
  {
    step: "1",
    question: "What is being backed up?",
    capture: "VMware/Hyper-V/Nutanix VMs, physical Windows/Linux servers, NAS file shares, databases (SQL/Oracle/PostgreSQL/SAP HANA), Microsoft 365 (Exchange/SharePoint/OneDrive/Teams), native cloud (AWS/Azure/GCP), endpoints, OT",
    why: "Workload mix decides which vendors are even on the shortlist. Veeam dominates VMware, AvePoint dominates M365, Druva dominates DPaaS-native.",
  },
  {
    step: "2",
    question: "What's the RPO and RTO?",
    capture: "Recovery Point Objective and Recovery Time Objective per workload tier",
    why: "Tier-1 OLTP databases need RPO under 15 min, RTO under 1 hr; Tier-3 file shares may tolerate RPO 24 hr. Backup cost scales aggressively with tighter SLAs.",
  },
  {
    step: "3",
    question: "What's the retention policy?",
    capture: "Operational retention (last 30-90 days), compliance (1-7 years), long-term archive (7-30 years)",
    why: "Drives storage tiering. Total backup capacity is typically 5-15x production data.",
  },
  {
    step: "4",
    question: "Ransomware-resilience requirement?",
    capture: "Immutable copies (Object Lock or hardened repositories), air-gapped vault, isolated recovery environment, regular recovery testing",
    why: "The single biggest backup architecture decision in 2026. Immutable plus air-gapped is non-negotiable for production.",
  },
  {
    step: "5",
    question: "On-prem, hybrid, or cloud?",
    capture: "On-prem repository (capex predictable), hybrid (on-prem hot plus cloud archive), DPaaS (vendor-managed cloud backup)",
    why: "UAE customers are increasingly hybrid, with on-prem hot plus cloud immutable for off-site copy.",
  },
  {
    step: "6",
    question: "SaaS coverage requirements?",
    capture: "Microsoft 365, Google Workspace, Salesforce, Dynamics, ServiceNow",
    why: "Microsoft and Google do not back up SaaS data the way you need. A dedicated SaaS backup platform is required.",
  },
  {
    step: "7",
    question: "Compliance and data residency?",
    capture: "NESA, UAE PDPL, sector-specific (CBUAE/DHA/SEHA/ADHA), data-residency in UAE, retention compliance, audit trail, e-discovery",
    why: "Regulated verticals need in-UAE backup storage with auditable retention.",
  },
];

/* ───────── SELECTION CRITERIA CHECKLIST ───────── */

const checklistGroups = [
  {
    title: "Architecture",
    items: [
      "3-2-1-1-0 strategy",
      "Immutable repository (S3 Object Lock or hardened Linux repo)",
      "Air-gapped or isolated copy",
      "Anomaly and ransomware detection",
      "Automated recovery verification",
      "Isolated Recovery Environment (IRE)",
    ],
  },
  {
    title: "Workload coverage",
    items: [
      "VMware/Hyper-V/Nutanix VM backup",
      "Database app-aware backup (SQL/Oracle/SAP HANA)",
      "Microsoft 365 full coverage (Exchange/SharePoint/OneDrive/Teams/Entra ID)",
      "Cloud-native (AWS/Azure/GCP)",
      "Endpoint backup",
      "Container/Kubernetes",
    ],
  },
  {
    title: "Operational",
    items: [
      "Single-pane management",
      "SureBackup / Recovery Drill / Live Mount automated verification",
      "Anomaly detection",
      "Centralised reporting",
      "Monitoring integration",
    ],
  },
  {
    title: "Commercial",
    items: [
      "Per-instance / per-VM / per-TB / per-user licensing",
      "5-year TCO",
      "Subscription tiers (Foundation/Advanced/Premium)",
      "Effective recovery economics",
      "Object storage target cost",
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
    slug: "avepoint",
    name: "AvePoint",
    best: "Best for M365 SaaS Backup (Recommended)",
    strength: "2001, Microsoft 365 specialist, pure-play SaaS data. Industry-deepest M365 coverage plus Salesforce/Dynamics/Google. External tenant plus immutable storage. SaaS-first with M365 focus. Pure SaaS, simplest deployment. Artiflex strategic partner, deep UAE.",
    watch: "Industry-deepest M365 coverage including Power Platform, Project, Yammer, Entra ID. UAE / GCC region residency. Artiflex strategic partner.",
    logo: "/logos/AvePoint.png",
  },
  {
    slug: "veeam",
    name: "Veeam",
    best: "Best Overall Value (Recommended)",
    strength: "2006, built for virtualisation backup. Industry-leading hypervisor coverage, hardened Linux repo plus Object Lock plus Veeam Vault, SQL/Oracle/SAP HANA/NAS app-aware, Veeam Backup for M365 separate SKU, Veeam Backup for AWS/Azure/GCP. Simplest day-2 ops in enterprise backup. Largest backup channel in UAE.",
    watch: "Best overall value and simplest operations; the de-facto backup platform for virtualisation with the largest UAE channel.",
    logo: "/logos/veeam.svg",
  },
  {
    slug: "commvault",
    name: "Commvault",
    best: "Broadest Enterprise Coverage (Recommended)",
    strength: "1996, broadest enterprise heritage. Mature hypervisor coverage, ThreatWise plus Air Gap Protect, industry-leading app breadth, Metallic/Commvault Cloud native, strong cloud-native. Powerful but complex. Direct plus extensive partner channel.",
    watch: "Broadest enterprise application coverage; best for banks, telco and government with mainframe-to-modern workload mix.",
    logo: "/logos/Commvault.svg",
  },
  {
    slug: "rubrik",
    name: "Rubrik",
    best: "Best for Modern Scale-Out (Recommended)",
    strength: "2014, cloud-native scale-out. All major hypervisors, Zero Trust plus immutable plus Anomaly Detection, major databases covered, Rubrik M365 (acquired Laminar), cloud-native architecture. Modern UX, scale-out. Growing direct plus partner.",
    watch: "Modern scale-out cloud-native architecture with Zero Trust security-first positioning.",
    logo: "/logos/Rubrik.png",
  },
  {
    slug: "cohesity",
    name: "Cohesity",
    best: "Best for Secondary Data Consolidation",
    strength: "2013, secondary-data consolidation; Veritas acquired 2024. All major hypervisors, DataLock plus Helios Anomaly Detection, major databases covered, Cohesity DataProtect SaaS, cloud-aligned. Modern UX, unified secondary data. Direct plus partner growing.",
    watch: "Unified secondary data platform; backup plus archive plus dev/test on one platform. Now with Veritas under same parent for broadest combined coverage.",
    logo: "/logos/Cohesity.png",
  },
  {
    slug: "druva",
    name: "Druva",
    best: "Best for Cloud-Native DPaaS",
    strength: "2008, cloud-native DPaaS pioneer. Cloud-native (limited hypervisor), S3 Object Lock plus Cyber Resilience, solid app coverage, broad M365 coverage, cloud-native AWS/Azure/GCP. Pure SaaS, clean UX. Growing UAE presence.",
    watch: "Cloud-native DPaaS pioneer; broad coverage across M365, Google Workspace, Salesforce plus endpoint and cloud-native from a single SaaS platform.",
    logo: "/logos/Druva.png",
  },
];

/* ───────── VENDOR MATRIX (BUYER'S MATRIX) ───────── */

const matrixVendors = [
  { name: "AvePoint", recommended: true },
  { name: "Veeam", recommended: true },
  { name: "Commvault", recommended: true },
  { name: "Rubrik", recommended: true },
  { name: "Cohesity" },
  { name: "Druva" },
];

type StarCell = { stars: number; note: string };
type VerdictCell = { recommended?: boolean; rank?: string; text: string };
type MatrixRow =
  | { label: string; type: "text"; cells: string[] }
  | { label: string; type: "stars"; cells: StarCell[] }
  | { label: string; type: "verdict"; cells: VerdictCell[] };

const matrixRows: MatrixRow[] = [
  {
    label: "Founded / heritage",
    type: "text",
    cells: [
      "2001, Microsoft 365 specialist, pure-play SaaS data",
      "2006, built for virtualisation backup",
      "1996, broadest enterprise heritage",
      "2014, cloud-native scale-out",
      "2013, secondary-data consolidation; Veritas acquired 2024",
      "2008, cloud-native DPaaS pioneer",
    ],
  },
  {
    label: "Hypervisor breadth",
    type: "stars",
    cells: [
      { stars: 3, note: "Not the focus" },
      { stars: 5, note: "Industry-leading all hypervisors" },
      { stars: 5, note: "Mature hypervisor coverage" },
      { stars: 5, note: "All major hypervisors" },
      { stars: 5, note: "All major hypervisors" },
      { stars: 4, note: "Cloud-native, limited hypervisor" },
    ],
  },
  {
    label: "Ransomware resilience",
    type: "stars",
    cells: [
      { stars: 5, note: "External tenant plus immutable storage" },
      { stars: 5, note: "Hardened Linux repo plus Object Lock plus Veeam Vault" },
      { stars: 5, note: "ThreatWise plus Air Gap Protect" },
      { stars: 5, note: "Zero Trust plus immutable plus Anomaly Detection" },
      { stars: 5, note: "DataLock plus Helios Anomaly Detection" },
      { stars: 5, note: "S3 Object Lock plus Cyber Resilience" },
    ],
  },
  {
    label: "Application coverage",
    type: "stars",
    cells: [
      { stars: 3, note: "SaaS workloads focused" },
      { stars: 5, note: "SQL/Oracle/SAP HANA/NAS app-aware" },
      { stars: 5, note: "Industry-leading app breadth" },
      { stars: 4, note: "Major databases covered" },
      { stars: 4, note: "Major databases covered" },
      { stars: 4, note: "Solid app coverage" },
    ],
  },
  {
    label: "M365 SaaS coverage",
    type: "stars",
    cells: [
      { stars: 5, note: "Industry-deepest M365 plus Salesforce/Dynamics/Google" },
      { stars: 4, note: "Veeam Backup for M365 separate SKU" },
      { stars: 5, note: "Metallic/Commvault Cloud native" },
      { stars: 4, note: "Rubrik M365 (acquired Laminar)" },
      { stars: 4, note: "Cohesity DataProtect SaaS" },
      { stars: 5, note: "Broad M365 coverage" },
    ],
  },
  {
    label: "Cloud-native coverage",
    type: "stars",
    cells: [
      { stars: 4, note: "SaaS-first with M365" },
      { stars: 4, note: "Veeam Backup for AWS/Azure/GCP" },
      { stars: 5, note: "Strong cloud-native" },
      { stars: 4, note: "Cloud-native architecture" },
      { stars: 4, note: "Cloud-aligned" },
      { stars: 5, note: "Cloud-native AWS/Azure/GCP" },
    ],
  },
  {
    label: "Operational simplicity",
    type: "stars",
    cells: [
      { stars: 5, note: "Pure SaaS, simplest deployment" },
      { stars: 5, note: "Simplest day-2 ops in enterprise backup" },
      { stars: 3, note: "Powerful but complex" },
      { stars: 5, note: "Modern UX, scale-out" },
      { stars: 5, note: "Modern UX, unified secondary data" },
      { stars: 5, note: "Pure SaaS, clean UX" },
    ],
  },
  {
    label: "UAE channel",
    type: "stars",
    cells: [
      { stars: 5, note: "Artiflex strategic partner, deep UAE" },
      { stars: 5, note: "Largest backup channel in UAE" },
      { stars: 5, note: "Direct plus extensive partner" },
      { stars: 4, note: "Growing direct plus partner" },
      { stars: 4, note: "Direct plus partner growing" },
      { stars: 4, note: "Growing UAE presence" },
    ],
  },
  {
    label: "Best suited for",
    type: "text",
    cells: [
      "Microsoft 365 SaaS backup with UAE data residency",
      "VMware and Hyper-V workloads, mid-market through enterprise on-prem and hybrid",
      "Banks, telecom and government with broadest application coverage requirements",
      "Modern scale-out enterprise with security-first / Zero Trust priorities",
      "Enterprise with secondary data consolidation across backup, archive and dev/test",
      "Distributed enterprise and cloud-first with mixed SaaS / cloud / endpoint coverage",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      { recommended: true, text: "Industry-deepest M365 coverage including Power Platform, Project, Yammer, Entra ID. UAE / GCC region residency. Artiflex strategic partner." },
      { recommended: true, text: "Best overall value and simplest operations; the de-facto backup platform for virtualisation with the largest UAE channel." },
      { recommended: true, text: "Broadest enterprise application coverage; best for banks, telco and government with mainframe-to-modern workload mix." },
      { recommended: true, text: "Modern scale-out cloud-native architecture with Zero Trust security-first positioning." },
      { text: "Unified secondary data platform; backup plus archive plus dev/test on one platform. Now with Veritas under same parent for broadest combined coverage." },
      { text: "Cloud-native DPaaS pioneer; broad coverage across M365, Google Workspace, Salesforce plus endpoint and cloud-native from a single SaaS platform." },
    ],
  },
];

/* ───────── GARTNER-STYLE CAPABILITY SCORECARD ───────── */

const featureVendors = [
  "AvePoint",
  "Veeam",
  "Commvault",
  "Rubrik",
  "Cohesity",
  "Druva",
];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "VMware / hypervisor backup depth",
    cells: [
      { tier: "strong", note: "Not the focus area" },
      { tier: "best", note: "Industry-leading VMware coverage" },
      { tier: "excellent", note: "Mature hypervisor coverage" },
      { tier: "excellent", note: "All major hypervisors" },
      { tier: "excellent", note: "All major hypervisors" },
      { tier: "veryStrong", note: "Cloud-native, limited hypervisor" },
    ],
  },
  {
    label: "Application coverage breadth (databases, SAP, Oracle)",
    cells: [
      { tier: "strong", note: "SaaS workloads focused" },
      { tier: "excellent", note: "SQL/Oracle/SAP HANA/NAS app-aware" },
      { tier: "best", note: "Industry-leading app breadth" },
      { tier: "veryStrong", note: "Major databases covered" },
      { tier: "veryStrong", note: "Major databases covered" },
      { tier: "excellent", note: "Solid app coverage" },
    ],
  },
  {
    label: "M365 / SaaS coverage",
    cells: [
      { tier: "best", note: "Industry-deepest M365 coverage" },
      { tier: "veryStrong", note: "Veeam Backup for M365 separate SKU" },
      { tier: "excellent", note: "Metallic/Commvault Cloud native" },
      { tier: "excellent", note: "Rubrik M365 (acquired Laminar)" },
      { tier: "excellent", note: "Cohesity DataProtect SaaS" },
      { tier: "excellent", note: "Broad M365 coverage" },
    ],
  },
  {
    label: "Ransomware resilience / immutability",
    cells: [
      { tier: "best", note: "External tenant plus immutable storage" },
      { tier: "best", note: "Hardened Linux repo plus Object Lock plus Vault" },
      { tier: "best", note: "ThreatWise plus Air Gap Protect" },
      { tier: "best", note: "Zero Trust plus Anomaly Detection" },
      { tier: "best", note: "DataLock plus Helios Anomaly Detection" },
      { tier: "excellent", note: "S3 Object Lock plus Cyber Resilience" },
    ],
  },
  {
    label: "Recovery verification / orchestration",
    cells: [
      { tier: "excellent", note: "Automated SaaS recovery flows" },
      { tier: "best", note: "SureBackup is the industry reference" },
      { tier: "excellent", note: "Mature orchestration tooling" },
      { tier: "excellent", note: "Live Mount plus Recovery Drill" },
      { tier: "excellent", note: "Instant recovery plus DataLock" },
      { tier: "veryStrong", note: "Cloud-native restore flows" },
    ],
  },
  {
    label: "Cloud-native (AWS / Azure / GCP) coverage",
    cells: [
      { tier: "veryStrong", note: "SaaS-first with M365" },
      { tier: "veryStrong", note: "Veeam Backup for AWS/Azure/GCP" },
      { tier: "best", note: "Strong native cloud-native coverage" },
      { tier: "excellent", note: "Cloud-native architecture" },
      { tier: "excellent", note: "Cloud-aligned platform" },
      { tier: "best", note: "Cloud-native AWS/Azure/GCP" },
    ],
  },
  {
    label: "Operational simplicity",
    cells: [
      { tier: "best", note: "Pure SaaS, simplest deployment" },
      { tier: "best", note: "Simplest day-2 ops in enterprise backup" },
      { tier: "good", note: "Powerful but complex" },
      { tier: "best", note: "Modern UX, scale-out" },
      { tier: "best", note: "Unified secondary data" },
      { tier: "excellent", note: "Pure SaaS, clean UX" },
    ],
  },
  {
    label: "Total cost of ownership (5-yr)",
    cells: [
      { tier: "excellent", note: "Predictable per-user SaaS pricing" },
      { tier: "best", note: "Strong value across mid-market and enterprise" },
      { tier: "good", note: "Premium pricing on broadest coverage" },
      { tier: "good", note: "Premium on modern scale-out" },
      { tier: "good", note: "Premium on unified secondary data" },
      { tier: "excellent", note: "Predictable DPaaS subscription" },
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
    title: "What workloads, on-prem, SaaS, cloud-native, or all three?",
    desc: "Workload mix decides the shortlist. On-prem VMware leads to Veeam or Commvault. M365 leads to AvePoint or Veeam Backup for M365. Cloud-native AWS/Azure/GCP leads to Druva, Clumio or HYCU. Mixed estates typically combine two platforms.",
  },
  {
    num: "02",
    title: "On-prem repository or vendor-managed cloud?",
    desc: "On-prem repository keeps capex predictable and recovery local. Vendor-managed DPaaS (Druva, Commvault Cloud, Cohesity DataProtect SaaS) removes infrastructure overhead. UAE customers are increasingly hybrid, with on-prem hot plus cloud immutable for off-site copy.",
  },
  {
    num: "03",
    title: "Ransomware-resilience posture (5-layer baseline)?",
    desc: "Modern baseline: immutable repository, air-gapped copy, anomaly detection, automated recovery verification, isolated recovery environment. Configure all five for any 2026 production backup architecture; immutable plus air-gapped is non-negotiable.",
  },
  {
    num: "04",
    title: "Operational capacity (in-house team capacity)?",
    desc: "If the team is small, lean toward operational simplicity (Veeam, Druva, Rubrik). If the team has deep backup engineering, broadest-coverage platforms (Commvault, Cohesity) unlock more value. Day-2 ops cost is the most-underestimated line in five-year TCO.",
  },
  {
    num: "05",
    title: "Is M365 a primary backup target?",
    desc: "M365 native retention is not a backup. AvePoint, Veeam Backup for M365 or Druva is required. AvePoint leads on platform depth and UAE region residency, with 4x daily backup default and RPO 6 hours configurable to 1 hour.",
  },
  {
    num: "06",
    title: "How often do you test recovery?",
    desc: "Modern platforms automate this with Veeam SureBackup, Rubrik Recovery Drill, Cohesity DataLock. Backups that complete are not the same as backups that restore; configure automated verification and clean-room recovery on a fixed cadence.",
  },
];

/* ───────── UAE SERVICE & COMMERCIAL NOTES ───────── */

const uaeNotes = [
  "Regulated verticals (banks via CBUAE, healthcare via DHA/SEHA/ADHA, government) must keep backup data in-country; major SaaS backup vendors (AvePoint, Commvault, Druva) offer UAE/GCC region storage.",
  "M365 backup is non-negotiable, and UAE region availability makes regional residency achievable for SaaS data.",
  "Veeam has the largest UAE backup channel, with the deepest field bench and spares depot for on-prem repositories.",
  "CBUAE-supervised banks now expect regular DR / recovery drills as part of operational-resilience reporting.",
  "Hybrid backup (on-prem plus cloud immutable) requires symmetric upload capacity; validate at design stage rather than at first cutover.",
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "Veeam, Commvault, Rubrik, or Cohesity, which should I pick?",
    answer:
      "All four are tier-1. Veeam wins on best-overall-value, simplest operations and largest UAE channel. Commvault wins on broadest application coverage for banks, telco and government. Rubrik wins on modern scale-out plus security-first Zero Trust. Cohesity wins on unified secondary data with Veritas under the same parent for broadest combined coverage.",
  },
  {
    question: "Why isn't Microsoft 365 native retention enough?",
    answer:
      "Microsoft itself states you are responsible for backing up your data. Native retention is designed for compliance and brief accidental-deletion recovery, not backup. Exchange recovery is 14-30 days, SharePoint/OneDrive 93 days then permanent purge, ransomware-encrypted files versioned by ransomware are not recoverable, and a compromised admin can disable retention.",
  },
  {
    question: "Why AvePoint specifically for M365 backup?",
    answer:
      "Three reasons. Platform depth, built around M365 since 2001 with deepest coverage including Power Platform, Project, Yammer, Entra ID and full Teams private channels. UAE / GCC region residency. 4x daily backup default with RPO 6 hours, configurable to 1 hour. Artiflex is a strategic AvePoint partner.",
  },
  {
    question: "Do I need immutable backup?",
    answer:
      "Yes, for any production workload in 2026. Modern ransomware routinely targets backup chains and admin credentials. Immutable copies (S3 Object Lock, hardened Linux repository, vendor-specific SafeMode / DataLock / Air Gap Protect) survive even when ransomware compromises backup admin credentials.",
  },
  {
    question: "How important is recovery testing?",
    answer:
      "The single most-underrated discipline in backup. Backups that complete successfully are not the same as backups that restore successfully. Modern platforms automate this (Veeam SureBackup, Rubrik Live Mount plus Recovery Drill, Cohesity DataLock), and customers who configure it find broken backup chains in days, not years.",
  },
  {
    question: "Do I need separate products for on-prem, M365 and cloud-native backup?",
    answer:
      "For most UAE customers, yes, typically two products: Veeam Data Platform for on-prem plus AvePoint Cloud Backup for M365. Some customers add Druva or HYCU for significant cloud-native workloads. Single-vendor unified is possible with Commvault Cloud or Cohesity but typically at premium pricing.",
  },
  {
    question: "What's the modern ransomware-resilience baseline?",
    answer:
      "Five-layer baseline: immutable repository, air-gapped copy isolated from production credentials, anomaly detection, automated recovery verification, and an Isolated Recovery Environment for clean restore validation. Configure all five for any 2026 production backup architecture.",
  },
  {
    question: "Is Artiflex IT tied to a single backup vendor?",
    answer:
      "No, we deliver Veeam, AvePoint, Commvault, Rubrik, Cohesity, Druva and others. Vendor recommendation follows workload mix, RPO / RTO and ransomware-resilience posture, not the inventory. We are an AvePoint strategic partner and Veeam-certified.",
  },
];

/* ───────── HERO ───────── */

function BackupHero() {
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
                <span className="font-medium text-[#28B5E1]">Backup & Data Management</span>
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
            Backup &{" "}
            <span className="gradient-text">Data Management</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Buyer's Guide, Vendor Matrix and Gartner-style Scorecard
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            A UAE buyer's guide for enterprise backup across on-prem and hybrid, SaaS / Microsoft 365, and cloud-native DPaaS. Honest comparisons across <span className="font-semibold text-white">Veeam, Commvault, Rubrik, Cohesity, Dell PowerProtect, AvePoint, Druva, Clumio and HYCU</span>, with detailed Gartner-style scorecard, ransomware-resilience framing and Artiflex recommendations.
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
              to="/blog/origin-backup-data-management"
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
              Get a Free Backup Assessment
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

export default function BackupDataManagement() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Backup & Data Management UAE | Veeam, AvePoint & Rubrik Buyer's Guide | Artiflex IT</title>
        <meta
          name="description"
          content="UAE buyer's guide for enterprise backup across on-prem, M365 SaaS and cloud-native DPaaS. Vendor matrix and Gartner-style scorecard across Veeam, AvePoint, Commvault, Rubrik, Cohesity and Druva."
        />
        <link rel="canonical" href="https://artiflexit.com/infrastructure/backup-data-management" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Artiflex IT",
            "url": "https://artiflexit.com/infrastructure/backup-data-management",
            "areaServed": [
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "City", "name": "Dubai" },
              { "@type": "City", "name": "Abu Dhabi" },
            ],
            "description": "UAE buyer's guide for enterprise backup and data management across Veeam, AvePoint, Commvault, Rubrik, Cohesity and Druva.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Backup & Data Management Services",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description": "UAE backup and data management: ransomware-resilient architecture, M365 SaaS backup, cloud-native DPaaS and recovery testing. Vendor recommendation follows workload mix.",
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
            "name": "Backup & Data Management Vendors for UAE Buyers",
            "itemListElement": vendors.map((v, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <BackupHero />

      {/* ───────── BACKUP VENDORS WE DELIVER (HONEYCOMB) ───────── */}
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
              Backup{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Vendors
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The platforms we design, deploy and operate across UAE backup and data-management projects. The conversation starts with workload mix, RPO / RTO and ransomware-resilience posture, not a SKU.
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
                layouts[backupVendorList.length] ??
                [Math.ceil(backupVendorList.length / 2), Math.floor(backupVendorList.length / 2)];
              const rows: typeof backupVendorList[] = [];
              let i = 0;
              sizes.forEach((s) => {
                rows.push(backupVendorList.slice(i, i + s));
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
            {backupVendorList.map((v) => (
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
              {backupVendorList.length} platforms
            </span>
            , picked by workload mix, RPO / RTO and ransomware-resilience posture.
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
              Before any backup proposal, walk through these questions. Most over-budget UAE backup projects fail here, with the customer accepting a vendor's preferred SKU rather than sizing to the actual workloads, RPO / RTO and ransomware-resilience posture.
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
              <span className="gradient-text">Backup buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              Six vendors cover the overwhelming majority of UAE backup deployments. Each leads in some areas and trails in others; the right pick follows your workloads and ransomware posture, not the marketing.
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
              Detailed Comparison on Backup Vendors
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Strengths, blind spots and the buyer profile each vendor was built for. Recommendations are based on UAE deployment patterns, not vendor tier.
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
                          Verdict
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
              <span className="font-semibold text-white">Artiflex IT delivers Veeam, AvePoint, Commvault, Rubrik, Cohesity and Druva</span> across UAE backup projects, with 14+ years of in-country deployments. <br />
              <span className="text-xs italic text-white sm:text-base">Vendor recommendation follows workload mix, RPO / RTO and ransomware-resilience posture, not the inventory.</span>
            </p>
          </div>

          {/* Feature ratings */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Scorecard
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each vendor is rated across the capabilities that matter most for backup and data management, using a standardised tier scale. A gold ★ marker denotes best-in-class performance.
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
              The right backup platform for any environment falls out of a few honest questions. Walk through these before any vendor demo and the shortlist usually picks itself.
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
              What changes when you back up in the UAE
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Backup and data-management projects in the UAE have specific data-residency, regulatory and sovereignty considerations that change the design conversation versus a generic vendor proposal.
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
              14+ years of UAE backup delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when Veeam wins, when AvePoint wins, when Commvault, Rubrik, Cohesity or Druva wins, and when none of them is the right answer. The point of an honest assessment is an honest answer.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years of UAE backup delivery" },
              { value: "500+", label: "Projects delivered, GCC-wide" },
              { value: "6", label: "Backup platforms actively delivered" },
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
                  Veeam, AvePoint, Commvault, Rubrik, Cohesity and Druva: active delivery across all six, with full on-prem, M365 SaaS, cloud-native DPaaS and endpoint ecosystems.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Compliance frameworks
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  NESA, UAE PDPL, CBUAE, DHA, SEHA, ADHA, ISO 27001 and ISO 22301-aligned backup architectures with audit-ready retention and recovery-test evidence packs.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Coverage area
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  On-site across Dubai, Abu Dhabi and Sharjah. Remote across the UAE, Oman and Saudi Arabia. 24/7 managed-services bench for production and DR sites.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Engagement model
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Fully managed, co-managed, or assessment-only. CapEx, OpEx and DPaaS subscription pricing supported. No vendor lock-in, no theatre, no upselling.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#28B5E1] px-6 py-3 font-display text-sm font-semibold text-navy-deep transition-colors hover:bg-white sm:text-base"
            >
              Book a free backup assessment
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
            description="What UAE buyers ask us most about backup, ransomware resilience, M365 SaaS coverage and recovery testing."
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
        title="Free Backup Assessment"
        description="60-minute review of your current backup estate: workload coverage, RPO / RTO, retention, ransomware-resilience posture and recovery-test cadence. We will identify the highest-impact gaps and propose a prioritised plan aligned to your compliance and operational-resilience requirements."
        primaryButton={{ text: "Book Assessment", action: "modal" }}
      />
    </>
  );
}
