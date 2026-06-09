import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import DeliveryModel from "@/components/sections/DeliveryModel";

/* ───────── BACKUP AS A SERVICE VENDORS (HONEYCOMB) ───────── */

const BackupVendorList = [
  { slug: "veeam", name: "Veeam", logo: "/logos/veeam.svg" },
  { slug: "commvault", name: "Commvault Cloud", logo: "/logos/Commvault.svg" },
  { slug: "rubrik", name: "Rubrik", logo: "/logos/Rubrik.png" },
  { slug: "cohesity", name: "Cohesity", logo: "/logos/Cohesity.png" },
  { slug: "dell-powerprotect", name: "Dell PowerProtect", logo: "/logos/Dell_Technologies.webp" },
  { slug: "acronis-hpe-nakivo", name: "Acronis / HPE / Nakivo", logo: "/logos/acronis.svg" },
];

/* ───────── BUYER'S GUIDE, SELECTION FRAMEWORK ───────── */

const selectionFramework = [
  {
    step: "1",
    question: "What is the backup for?",
    capture: "Operational recovery, ransomware recovery, compliance retention, eDiscovery / legal hold, full data-centre DR",
    why: "Each driver maps to different RPO/RTO and retention.",
  },
  {
    step: "2",
    question: "Workload coverage?",
    capture: "VMs, physical servers, NAS, SaaS M365/Workspace/Salesforce, Kubernetes, mainframe, endpoint, databases",
    why: "Coverage breadth varies materially; Veeam and Commvault lead breadth.",
  },
  {
    step: "3",
    question: "Ransomware resilience target?",
    capture: "Air-gap, immutable storage, isolated recovery environment, anomaly detection, malware scan, cleanroom recovery",
    why: "Modern UAE compliance increasingly requires documented immutable plus air-gap controls.",
  },
  {
    step: "4",
    question: "RPO and RTO target?",
    capture: "RPO measured in hours versus minutes CDP; RTO measured in hours versus minutes instant recovery",
    why: "Aggressive RPO/RTO requires modern platforms with CDP and instant-mount.",
  },
  {
    step: "5",
    question: "SaaS data scope?",
    capture: "M365, Google Workspace, Salesforce, Dynamics 365, ServiceNow, custom SaaS",
    why: "Native M365 retention is 30 days; third-party SaaS backup is required for longer retention.",
  },
  {
    step: "6",
    question: "Cloud target?",
    capture: "AWS S3 / Azure Blob / GCP, vendor cloud Veeam Cloud Connect/Commvault Cloud, on-prem dedup appliance plus cloud tier",
    why: "S3 Object Lock is now the immutability standard.",
  },
  {
    step: "7",
    question: "Operational model?",
    capture: "Self-managed Backup, vendor-managed, MSP-delivered, fully managed Recovery as a Service",
    why: "Managed Backup is increasingly the default for UAE mid-market.",
  },
];

/* ───────── SELECTION CRITERIA CHECKLIST ───────── */

const checklistGroups = [
  {
    title: "Technical fit",
    items: [
      "Workload coverage breadth",
      "Immutability and air-gap",
      "Continuous Data Protection CDP",
      "Instant recovery/mount",
      "SaaS application backup",
      "Container and K8s coverage",
    ],
  },
  {
    title: "Operational fit",
    items: [
      "Single-pane management",
      "Recovery testing automation",
      "Anomaly and ransomware detection",
      "Reporting and compliance evidence",
      "Multi-tenant for MSP",
    ],
  },
  {
    title: "Commercial fit",
    items: [
      "Per-workload vs per-TB pricing",
      "Vendor cloud tier economics",
      "Five-year TCO including refresh",
      "Managed service options",
    ],
  },
  {
    title: "Service fit",
    items: [
      "UAE in-country support",
      "Recovery-validation methodology",
      "MSP partner depth",
      "Cleanroom recovery service",
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
    slug: "veeam",
    name: "Veeam",
    best: "Most-Deployed UAE Backup (Recommended)",
    strength:
      "Founded 2006; modern VM-native backup pioneer. VMware, Hyper-V, AHV, physical, M365, cloud and K8s via Kasten. Hardened Repo plus S3 Object Lock plus malware scan. Veeam Backup for M365 is the reference. Instant VM Recovery, SureBackup, Veeam ONE reporting. Largest UAE backup channel via Veeam ProPartner.",
    watch:
      "M365 and cloud-native are separate SKUs from the core platform; procurement involves multiple SKUs.",
    logo: "/logos/veeam.svg",
  },
  {
    slug: "commvault",
    name: "Commvault Cloud",
    best: "Broadest Workload Coverage (Recommended)",
    strength:
      "1996 enterprise data management heritage. Industry-broadest workload coverage including mainframe and complex SaaS. ThreatWise, Cleanroom Recovery for cyber-grade recovery. Live Sync, Auto Recovery for orchestration. Metallic for SaaS. Deep regulated-industry references.",
    watch:
      "Operational complexity reflects feature breadth; Commvault rewards mature backup teams.",
    logo: "/logos/Commvault.svg",
  },
  {
    slug: "rubrik",
    name: "Rubrik",
    best: "Cloud-Era Immutable Platform (Recommended)",
    strength:
      "2014; cloud-era immutable platform. Append-only design means no admin can delete a snapshot. Sub-second mounts for recovery. Anomaly detection and ransomware investigation. Strong M365 plus Salesforce. Rubrik Security Cloud unifies backup and security.",
    watch:
      "Premium positioning typically 25-40 percent above Veeam at equivalent capacity; UAE channel growing but smaller.",
    logo: "/logos/Rubrik.png",
  },
  {
    slug: "cohesity",
    name: "Cohesity",
    best: "Unified Secondary Data Platform (Recommended)",
    strength:
      "2013; hyperconverged data platform unifying backup with archive, dev/test and file services on one scale-out platform. DataLock plus Helios Anomaly Detection. FortKnox isolated vault. Veritas NetBackup under same parent since 2024 makes the broadest combined catalog in market.",
    watch:
      "Premium positioning; Veritas integration roadmap clarification matters at procurement.",
    logo: "/logos/Cohesity.png",
  },
  {
    slug: "dell-powerprotect",
    name: "Dell PowerProtect",
    best: "Native to Dell Storage Estate",
    strength:
      "EMC roots; PowerProtect line since 2018. Native to Dell storage estate. PowerProtect DD dedup appliance (65:1 typical ratios) materially reduces backup storage cost. Cyber Recovery Vault is the reference for cyber-grade isolated recovery. Strong UAE Dell field bench.",
    watch:
      "Best ROI when paired with PowerProtect DD; the legacy NetWorker / Avamar still in use at many customers, clarify which platform at procurement.",
    logo: "/logos/Dell_Technologies.webp",
  },
  {
    slug: "acronis-hpe-nakivo",
    name: "Veritas NetBackup / Acronis / HPE / Nakivo",
    best: "Specialists & Incumbents",
    strength:
      "Veritas 1993 reference for mainframe and complex enterprise; Acronis for SMB and endpoint-included; HPE GreenLake for Backup is HPE-aligned; Nakivo for cost-led mid-market.",
    watch:
      "Diverse positioning; pick by workload profile rather than treating them as one category.",
    logo: "/logos/acronis.svg",
  },
];

/* ───────── VENDOR MATRIX (BUYER'S MATRIX) ───────── */

const matrixVendors = [
  { name: "Veeam", recommended: true, rank: "#1" },
  { name: "Commvault Cloud", recommended: true },
  { name: "Rubrik", recommended: true },
  { name: "Cohesity", recommended: true },
  { name: "Dell PowerProtect" },
  { name: "Veritas / Acronis / HPE / Nakivo" },
];

type StarCell = { stars: number; note: string };
type VerdictCell = { recommended?: boolean; rank?: string; text: string };
type MatrixRow =
  | { label: string; type: "text"; cells: string[] }
  | { label: string; type: "stars"; cells: StarCell[] }
  | { label: string; type: "verdict"; cells: VerdictCell[] };

const matrixRows: MatrixRow[] = [
  {
    label: "Heritage",
    type: "text",
    cells: [
      "Founded 2006; modern VM-native backup pioneer",
      "1996 enterprise data management heritage",
      "2014; cloud-era immutable platform",
      "2013; hyperconverged secondary data platform",
      "EMC roots; PowerProtect line since 2018",
      "Veritas 1993, Acronis 2003, HPE GreenLake, Nakivo cost-led",
    ],
  },
  {
    label: "Workload breadth",
    type: "stars",
    cells: [
      { stars: 5, note: "VMware, Hyper-V, AHV, physical, M365, K8s via Kasten" },
      { stars: 5, note: "Industry-broadest including mainframe and SaaS" },
      { stars: 4, note: "Strong VM, M365, Salesforce; growing K8s" },
      { stars: 4, note: "Unified backup, archive, files, dev/test" },
      { stars: 5, note: "Native to Dell storage; PowerProtect DD dedup" },
      { stars: 5, note: "Veritas mainframe, Acronis endpoint, HPE servers, Nakivo SMB" },
    ],
  },
  {
    label: "Ransomware resilience",
    type: "stars",
    cells: [
      { stars: 5, note: "Hardened Repo plus S3 Object Lock plus malware scan" },
      { stars: 5, note: "ThreatWise plus Cleanroom Recovery" },
      { stars: 5, note: "Append-only design; no admin can delete snapshots" },
      { stars: 5, note: "DataLock, Helios Anomaly, FortKnox vault" },
      { stars: 4, note: "PowerProtect Cyber Recovery Vault reference" },
      { stars: 4, note: "Veritas immutable storage; Acronis Active Protection" },
    ],
  },
  {
    label: "SaaS backup M365",
    type: "stars",
    cells: [
      { stars: 5, note: "Veeam Backup for M365 is the reference" },
      { stars: 4, note: "Metallic for SaaS plus complex SaaS coverage" },
      { stars: 4, note: "Strong M365 plus Salesforce" },
      { stars: 3, note: "M365 supported; not the primary focus" },
      { stars: 3, note: "M365 supported via partner integrations" },
      { stars: 3, note: "Varies by platform; Acronis strongest" },
    ],
  },
  {
    label: "Cloud-native / S3 target",
    type: "stars",
    cells: [
      { stars: 5, note: "S3 Object Lock, AWS / Azure / GCP targets" },
      { stars: 5, note: "Commvault Cloud plus all hyperscaler targets" },
      { stars: 5, note: "Cloud-era design; native S3 / Azure Blob" },
      { stars: 4, note: "Helios cloud plus FortKnox isolated vault" },
      { stars: 4, note: "DD Cloud Tier plus AWS / Azure targets" },
      { stars: 4, note: "Varies; Veritas and HPE cloud-aligned" },
    ],
  },
  {
    label: "Recovery / RTO",
    type: "stars",
    cells: [
      { stars: 5, note: "Instant VM Recovery plus SureBackup" },
      { stars: 4, note: "Live Sync, Auto Recovery orchestration" },
      { stars: 5, note: "Sub-second mounts for recovery" },
      { stars: 4, note: "Instant mass restore plus orchestration" },
      { stars: 4, note: "Instant Access with PowerProtect DD" },
      { stars: 4, note: "Solid recovery across all four platforms" },
    ],
  },
  {
    label: "TCO and pricing",
    type: "stars",
    cells: [
      { stars: 5, note: "Transparent per-workload; best mid-market value" },
      { stars: 4, note: "Enterprise pricing reflects feature breadth" },
      { stars: 3, note: "Premium typically 25-40 percent above Veeam" },
      { stars: 4, note: "Premium positioning; consolidated platform value" },
      { stars: 4, note: "Best ROI when paired with PowerProtect DD" },
      { stars: 4, note: "Nakivo cost-led; Veritas enterprise-priced" },
    ],
  },
  {
    label: "UAE service depth",
    type: "stars",
    cells: [
      { stars: 5, note: "Deepest UAE ProPartner ecosystem" },
      { stars: 5, note: "Strong UAE enterprise and government" },
      { stars: 4, note: "Growing UAE channel; smaller than Veeam" },
      { stars: 4, note: "Solid UAE enterprise presence" },
      { stars: 5, note: "Strong UAE Dell field bench" },
      { stars: 4, note: "Mixed; Veritas and HPE strongest" },
    ],
  },
  {
    label: "Best suited for",
    type: "text",
    cells: [
      "VMware/Hyper-V/AHV mid-market through enterprise plus M365",
      "Banks, telco, government with broadest coverage",
      "Modern enterprise with security-first / Zero Trust priorities",
      "Enterprise with secondary data consolidation",
      "Dell-aligned enterprise with DD dedup",
      "Mainframe (Veritas), SMB (Acronis/Nakivo), HPE-aligned (HPE)",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      {
        recommended: true,
        rank: "#1",
        text: "Most-deployed UAE mid-market and enterprise backup with strong value and transparent pricing.",
      },
      {
        recommended: true,
        text: "Broadest workload coverage; reference for banks, telco and government.",
      },
      {
        recommended: true,
        text: "Immutable by design with sub-second mounts; modern cloud-era platform.",
      },
      {
        recommended: true,
        text: "Unified secondary data with Veritas under same parent for broadest combined catalog.",
      },
      {
        text: "Native to Dell storage with Cyber Recovery Vault as the reference cyber-grade isolation.",
      },
      {
        text: "Specialists and incumbents; pick by workload and existing footprint.",
      },
    ],
  },
];

/* ───────── GARTNER-STYLE CAPABILITY SCORECARD ───────── */

const featureVendors = [
  "Veeam",
  "Commvault Cloud",
  "Rubrik",
  "Cohesity",
  "Dell PowerProtect",
  "Veritas / Acronis / HPE / Nakivo",
];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "Workload coverage",
    cells: [
      { tier: "best", note: "VM, physical, SaaS, K8s via Kasten" },
      { tier: "best", note: "Industry-broadest including mainframe" },
      { tier: "excellent", note: "Strong VM, M365, Salesforce" },
      { tier: "excellent", note: "Unified backup plus secondary data" },
      { tier: "best", note: "Native to Dell estate plus DD dedup" },
      { tier: "best", note: "Combined breadth across four platforms" },
    ],
  },
  {
    label: "Ransomware resilience",
    cells: [
      { tier: "best", note: "Hardened Repo plus S3 Object Lock" },
      { tier: "best", note: "ThreatWise plus Cleanroom Recovery" },
      { tier: "best", note: "Append-only immutable by design" },
      { tier: "best", note: "DataLock plus FortKnox isolated vault" },
      { tier: "best", note: "PowerProtect Cyber Recovery Vault reference" },
      { tier: "excellent", note: "Veritas immutable plus Acronis AP" },
    ],
  },
  {
    label: "Immutability and air-gap",
    cells: [
      { tier: "excellent", note: "Hardened Linux Repo plus Object Lock" },
      { tier: "excellent", note: "Immutable plus Cleanroom isolation" },
      { tier: "best", note: "Append-only architecture; no admin delete" },
      { tier: "best", note: "FortKnox SaaS-isolated vault" },
      { tier: "best", note: "Cyber Recovery Vault reference architecture" },
      { tier: "excellent", note: "Veritas immutable storage; HPE vault" },
    ],
  },
  {
    label: "SaaS application backup",
    cells: [
      { tier: "best", note: "Veeam Backup for M365 is the reference" },
      { tier: "excellent", note: "Metallic for M365, Salesforce, D365" },
      { tier: "excellent", note: "Strong M365 plus Salesforce" },
      { tier: "strong", note: "M365 supported; not primary focus" },
      { tier: "strong", note: "M365 via partner integrations" },
      { tier: "strong", note: "Mixed; Acronis strongest for SaaS" },
    ],
  },
  {
    label: "Cloud-native and multi-cloud",
    cells: [
      { tier: "excellent", note: "AWS / Azure / GCP plus Cloud Connect" },
      { tier: "excellent", note: "Commvault Cloud plus all hyperscalers" },
      { tier: "best", note: "Cloud-era design; native S3 / Blob" },
      { tier: "excellent", note: "Helios SaaS plus cloud archive" },
      { tier: "excellent", note: "DD Cloud Tier plus hyperscaler targets" },
      { tier: "excellent", note: "Veritas and HPE cloud-aligned" },
    ],
  },
  {
    label: "Recovery (RTO / RPO)",
    cells: [
      { tier: "best", note: "Instant VM Recovery plus SureBackup" },
      { tier: "excellent", note: "Live Sync, Auto Recovery orchestration" },
      { tier: "best", note: "Sub-second mounts for recovery" },
      { tier: "excellent", note: "Instant mass restore plus orchestration" },
      { tier: "excellent", note: "Instant Access via PowerProtect DD" },
      { tier: "excellent", note: "Veritas Resiliency Platform; HPE Zerto" },
    ],
  },
  {
    label: "Reporting and compliance",
    cells: [
      { tier: "excellent", note: "Veeam ONE plus compliance reporting" },
      { tier: "best", note: "Deep regulated-industry references" },
      { tier: "excellent", note: "Rubrik Security Cloud unified reporting" },
      { tier: "excellent", note: "Helios analytics plus audit evidence" },
      { tier: "excellent", note: "Cyber Recovery validation plus reporting" },
      { tier: "excellent", note: "Veritas compliance-grade reporting" },
    ],
  },
  {
    label: "UAE service and SLA",
    cells: [
      { tier: "best", note: "Deepest UAE ProPartner ecosystem" },
      { tier: "best", note: "Strong UAE enterprise and government" },
      { tier: "excellent", note: "Growing UAE channel" },
      { tier: "excellent", note: "Solid UAE enterprise presence" },
      { tier: "best", note: "Strong UAE Dell field bench" },
      { tier: "excellent", note: "Veritas and HPE strongest in UAE" },
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
    title: "Mid-market or enterprise?",
    desc: "Mid-market typically lands on Veeam for breadth, value and the deepest UAE ProPartner ecosystem. Enterprise with mainframe, complex SaaS or very large heterogeneous estate often picks Commvault or Cohesity for combined catalog depth.",
  },
  {
    num: "02",
    title: "SaaS data scope?",
    desc: "M365 native retention is 30 days and is not compliance-grade. Veeam Backup for M365 is the reference; Commvault Metallic and Rubrik cover M365 plus Salesforce plus Dynamics 365 for broader SaaS estates.",
  },
  {
    num: "03",
    title: "Ransomware-first design?",
    desc: "Hardened Linux Repo (Veeam), append-only architecture (Rubrik), FortKnox-style isolated vault (Cohesity) and Cyber Recovery Vault (Dell PowerProtect) are all credible. Most modern UAE deployments now require documented immutable plus air-gap controls.",
  },
  {
    num: "04",
    title: "Managed Backup or self-managed?",
    desc: "Managed Backup is increasingly the UAE mid-market default. Co-managed and fully-managed models include daily monitoring, recovery testing, capacity planning and quarterly architecture reviews.",
  },
  {
    num: "05",
    title: "Is cyber recovery vault required?",
    desc: "Dell PowerProtect Cyber Recovery, Commvault Cleanroom, Cohesity FortKnox provide isolation distinct from operational backup. For regulated UAE workloads (banking, government, healthcare) the cleanroom or vault is increasingly a procurement requirement.",
  },
  {
    num: "06",
    title: "Subscription vs CapEx?",
    desc: "Vendor cloud, dedup appliance plus cloud tier, or pure SaaS DPaaS each carry different economics. Five-year TCO including refresh, egress and managed service should drive the call, not headline pricing.",
  },
];

/* ───────── UAE SOVEREIGNTY & COMMERCIAL NOTES ───────── */

const uaeNotes = [
  "CBUAE, NESA, TDRA and ADHICS frameworks increasingly expect immutable plus air-gap backup architectures.",
  "Banking, government and healthcare typically require five-year-plus retention for regulated workloads; M365 native retention (30 days) is no longer sufficient for compliance; third-party SaaS backup is the UAE default.",
  "Ransomware in the UAE primarily targets backup repositories; immutable plus air-gap is now a procurement requirement.",
  "Veeam ProPartner UAE network is the deepest; Commvault and Dell PowerProtect are the strong enterprise alternatives.",
  "Cleanroom recovery and cyber recovery vaults (Dell PowerProtect, Commvault Cleanroom, Cohesity FortKnox) are increasingly expected in regulated UAE procurements.",
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "Veeam or Commvault for UAE mid-market?",
    answer:
      "Veeam wins for the broadest UAE mid-market base, strongest M365 backup, transparent pricing, deepest ProPartner ecosystem. Commvault wins where workload breadth (mainframe, complex SaaS, very large heterogeneous estate) is decisive.",
  },
  {
    question: "Is immutable backup a requirement?",
    answer:
      "Yes for any modern UAE deployment. Hardened Linux repositories (Veeam), append-only design (Rubrik), FortKnox-style isolated vault (Cohesity) or Cyber Recovery Vault (Dell) are all credible architectures.",
  },
  {
    question: "Should we back up M365?",
    answer:
      "Yes. Microsoft's shared responsibility model places the burden of long-term data protection on the customer. Native retention of 30 days is not compliance-grade.",
  },
  {
    question: "Cleanroom or cyber recovery vault?",
    answer:
      "For high-criticality data, yes. The most mature is Dell PowerProtect Cyber Recovery; Commvault Cleanroom Recovery and Cohesity FortKnox are credible alternatives.",
  },
  {
    question: "What is the typical Backup deployment timeline?",
    answer:
      "Standard mid-market deployment runs four to eight weeks. Enterprise rollouts with cyber recovery vault, SaaS coverage and DR integration typically run three to six months.",
  },
  {
    question: "Is Artiflex IT tied to a single backup vendor?",
    answer:
      "No. We deliver Veeam, Commvault Cloud, Rubrik, Cohesity, Dell PowerProtect, Veritas NetBackup, Acronis, HPE GreenLake for Backup and Nakivo across UAE projects.",
  },
  {
    question: "Do you offer managed Backup?",
    answer:
      "Yes. Co-managed and fully-managed engagements include daily monitoring, recovery testing, capacity planning and quarterly architecture reviews.",
  },
  {
    question: "Can you run a cleanroom recovery drill?",
    answer:
      "Yes. We design and rehearse cleanroom recovery as a quarterly exercise for regulated UAE customers.",
  },
];

/* ───────── HERO ───────── */

function BackupAsAServiceHero() {
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
                <span className="font-medium text-[#28B5E1]">Backup as a Service</span>
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
            Backup as a{" "}
            <span className="gradient-text">Service</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Buyer's Guide, Vendor Matrix and Gartner-style Scorecard
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            A UAE buyer's guide for Backup as a Service across nine enterprise platforms. Honest comparisons across{" "}
            <span className="font-semibold text-white">
              Veeam, Commvault Cloud, Rubrik, Cohesity, Dell PowerProtect, Veritas NetBackup, Acronis, HPE GreenLake for Backup and Nakivo
            </span>
            .
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
              to="/blog/origin-backup-as-a-service"
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

export default function BackupAsAService() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Backup as a Service UAE | Buyer's Guide & Vendor Scorecard | Artiflex IT</title>
        <meta
          name="description"
          content="UAE buyer's guide for Backup as a Service. Vendor matrix and Gartner-style scorecard across Veeam, Commvault Cloud, Rubrik, Cohesity, Dell PowerProtect, Veritas NetBackup, Acronis, HPE GreenLake for Backup and Nakivo."
        />
        <link rel="canonical" href="https://artiflexit.com/cloud-solutions/backup-as-a-service" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Artiflex IT",
            "url": "https://artiflexit.com/cloud-solutions/backup-as-a-service",
            "areaServed": [
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "City", "name": "Dubai" },
              { "@type": "City", "name": "Abu Dhabi" },
            ],
            "description": "Vendor-neutral UAE buyer's guide for Backup as a Service across Veeam, Commvault Cloud, Rubrik, Cohesity, Dell PowerProtect, Veritas, Acronis, HPE and Nakivo.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Backup as a Service",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description": "UAE Backup as a Service delivery across Veeam, Commvault Cloud, Rubrik, Cohesity, Dell PowerProtect, Veritas NetBackup, Acronis, HPE GreenLake for Backup and Nakivo: immutable plus air-gap design, ransomware-resilient recovery and managed Backup.",
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
            "name": "Backup as a Service Platforms for UAE Buyers",
            "itemListElement": vendors.map((v, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <BackupAsAServiceHero />

      {/* ───────── Backup PLATFORMS WE DELIVER (HONEYCOMB) ───────── */}
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
              Backup as a Service{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Platforms
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The backup platforms we design, deploy and operate across UAE projects. Workload mix, ransomware resilience target, SaaS scope and operational model drive the choice.
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
                layouts[BackupVendorList.length] ??
                [Math.ceil(BackupVendorList.length / 2), Math.floor(BackupVendorList.length / 2)];
              const rows: typeof BackupVendorList[] = [];
              let i = 0;
              sizes.forEach((s) => {
                rows.push(BackupVendorList.slice(i, i + s));
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
            {BackupVendorList.map((v) => (
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
              {BackupVendorList.length} platform groups
            </span>
            , picked by workload mix, ransomware resilience target and operational model.
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
              Before any backup platform commitment, walk through these questions. Most under-protected UAE estates come from picking a platform on price alone and accepting backup as a side effect of the storage purchase, not a designed recovery architecture.
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
              <span className="gradient-text">Backup as a Service buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              Six backup platform groups cover the majority of UAE enterprise workloads. Veeam, Commvault, Rubrik and Cohesity capture most of the modern market; Dell PowerProtect dominates Dell-aligned estates; Veritas, Acronis, HPE and Nakivo cover specialist and incumbent footprints.
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
              Detailed Comparison on Backup as a Service Platforms
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Strengths, blind spots and the buyer profile each platform was built for. Backup choice typically follows workload mix, ransomware resilience target and existing storage estate more than feature comparison.
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
                Artiflex IT delivers Veeam, Commvault Cloud, Rubrik, Cohesity, Dell PowerProtect, Veritas NetBackup, Acronis, HPE GreenLake for Backup and Nakivo
              </span>{" "}
              across UAE projects. <br />
              <span className="text-xs italic text-white sm:text-base">
                Backup recommendation follows workload mix, ransomware resilience target and existing storage estate, not a vendor preference.
              </span>
            </p>
          </div>

          {/* Feature ratings */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Scorecard
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each backup platform is rated across the capabilities that matter most for UAE enterprise Backup, using a standardised tier scale. A gold ★ marker denotes best-in-class performance.
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
              The right Backup platform for any environment falls out of a few honest questions. Walk through these before any vendor demo and the shortlist usually picks itself.
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
              UAE compliance & commercial notes
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              What changes when you buy Backup as a Service in the UAE
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              UAE Backup carries specific compliance, retention and ransomware considerations that change the recommendation versus a generic backup conversation.
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
              14+ years of UAE Backup as a Service delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when Veeam wins, when Commvault wins, when Rubrik, Cohesity, Dell PowerProtect, Veritas, Acronis, HPE or Nakivo wins, and when managed Backup beats self-managed. Always a workload-driven and compliance-aware sizing before quoting.
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
                  Veeam, Commvault Cloud, Rubrik, Cohesity, Dell PowerProtect, Veritas NetBackup, Acronis, HPE GreenLake for Backup and Nakivo.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Compliance frameworks
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  CBUAE, NESA, TDRA, ADHICS, UAE PDPL, ADGM, ISO 27001-aligned designs with documented immutable plus air-gap controls and audit-ready evidence packs.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Coverage area
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  On-site across Dubai, Abu Dhabi and Sharjah. Remote across the UAE, Oman and Saudi Arabia. 24/7 backup-operations bench for managed customers.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Engagement model
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Design plus deploy plus managed Backup with quarterly cleanroom recovery drills, or assessment-only. Recovery validation and audit-evidence reporting are part of the engagement.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#28B5E1] px-6 py-3 font-display text-sm font-semibold text-navy-deep transition-colors hover:bg-white sm:text-base"
            >
              Book a free Backup assessment
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
            description="What UAE buyers ask us most about choosing Veeam, Commvault, Rubrik, Cohesity, Dell PowerProtect and the wider Backup landscape."
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
        title="Free Backup as a Service Assessment"
        description="60-minute review of your current backup estate, workload coverage gaps, ransomware resilience posture, retention compliance and a recommended phased Backup plan."
        primaryButton={{ text: "Book Assessment", action: "modal" }}
      />
    </>
  );
}
