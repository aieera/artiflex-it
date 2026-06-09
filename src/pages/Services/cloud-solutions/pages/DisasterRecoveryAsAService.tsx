import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import DeliveryModel from "@/components/sections/DeliveryModel";

/* ───────── Disaster Recovery VENDORS (HONEYCOMB) ───────── */

const DisasterRecoveryVendorList = [
  { slug: "zerto", name: "Zerto", logo: "/logos/Zerto.webp" },
  { slug: "vmware-live-recovery", name: "VMware Cloud DR / Live Recovery", logo: "/logos/vmware.svg" },
  { slug: "azure-site-recovery", name: "Azure Site Recovery", logo: "/logos/Microsoft_Azure.svg" },
  { slug: "aws-edr", name: "AWS Elastic DR", logo: "/logos/Amazon_Web_Services.svg" },
  { slug: "commvault-dr", name: "Commvault DR", logo: "/logos/Commvault.svg" },
  { slug: "veeam-replication", name: "Veeam Cloud Connect Replication", logo: "/logos/veeam.svg" },
];

/* ───────── BUYER'S GUIDE, SELECTION FRAMEWORK ───────── */

const selectionFramework = [
  {
    step: "1",
    question: "What is the DR for?",
    capture: "Operational resilience single-site outage, regional disaster, ransomware cyber-recovery, regulatory mandate, business continuity certification",
    why: "Each driver maps to different RPO/RTO and target architecture.",
  },
  {
    step: "2",
    question: "RPO and RTO targets per workload tier?",
    capture: "Tier 1 RPO seconds RTO under 15 min, Tier 2 RPO 15 min RTO 1 hour, Tier 3 RPO 4 hours RTO 4 hours, Tier 4 backup-restore only",
    why: "Workload tiering is the foundation; budget and architecture follow tier targets.",
  },
  {
    step: "3",
    question: "Workload protection scope?",
    capture: "Production VMs, physical servers, databases, containers, SaaS applications, mainframe",
    why: "Tooling varies materially by workload; Zerto leads VM; Commvault leads breadth.",
  },
  {
    step: "4",
    question: "Target architecture?",
    capture: "On-prem-to-on-prem active-passive, on-prem-to-public-cloud, cloud-to-cloud, multi-region cloud-native, cloud-recovery-as-a-service",
    why: "Cloud-as-DR-target dominates modern UAE Disaster Recovery.",
  },
  {
    step: "5",
    question: "Test frequency and rigor?",
    capture: "Annual tabletop only, semi-annual technical drill, quarterly automated failover, monthly automated test, continuous CDP test",
    why: "Quarterly automated drills are now the UAE expectation.",
  },
  {
    step: "6",
    question: "Cyber-recovery requirement?",
    capture: "Pure operational DR, hybrid with cyber-recovery vault, full isolated cyber-recovery for ransomware",
    why: "Cyber-recovery requires immutable + air-gap distinct from operational DR.",
  },
  {
    step: "7",
    question: "Compliance posture?",
    capture: "NESA, UAE PDPL, CBUAE, ADHICS, DFSA, sector-specific frameworks",
    why: "UAE compliance frameworks increasingly mandate documented BCP / DR testing.",
  },
];

/* ───────── SELECTION CRITERIA CHECKLIST ───────── */

const checklistGroups = [
  {
    title: "Technical fit",
    items: [
      "CDP",
      "Application-aware orchestration",
      "Workload coverage breadth",
      "Non-disruptive failover test",
      "Failback automation",
      "Multi-target replication",
    ],
  },
  {
    title: "Operational fit",
    items: [
      "Single-pane orchestration",
      "Automated runbook execution",
      "Test reporting and audit",
      "Failover diagnostics",
      "Self-service portal",
    ],
  },
  {
    title: "Commercial fit",
    items: [
      "Per-workload pricing",
      "Cloud target cost economics",
      "Disaster Recovery subscription depth",
      "Five-year TCO including testing",
    ],
  },
  {
    title: "Service fit",
    items: [
      "UAE in-country support",
      "Recovery validation methodology",
      "Cyber-recovery service options",
      "Compliance evidence delivery",
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
    slug: "zerto",
    name: "Zerto",
    best: "CDP Reference (Recommended)",
    strength: "Founded 2009 Israel; HPE acquired 2021. Continuous Data Protection reference with seconds-RPO. Journal-based recovery for ransomware. Failover groups, isolated-network test. One-click failback. Multi-target AWS, Azure, IBM, on-prem. HPE plus partners deep in UAE.",
    watch: "VM-centric; mixed VM-physical-SaaS estates benefit from pairing with Commvault DR or similar.",
    logo: "/logos/Zerto.webp",
  },
  {
    slug: "vmware-live-recovery",
    name: "VMware Cloud DR / Live Recovery",
    best: "Best for VMware Estates (Recommended)",
    strength: "VMware SRM 2008; Cloud DR / Live Recovery 2020. Near-sync replication on VMware-only. Recovery plans plus SRM. Bubble networks for non-disruptive test. VMware Cloud everywhere as cloud target. Deep VMware partner network in UAE.",
    watch: "VMware-only protection scope; cross-hypervisor estates need a different platform.",
    logo: "/logos/vmware.svg",
  },
  {
    slug: "azure-site-recovery",
    name: "Azure Site Recovery",
    best: "Best for Azure-Target DR (Recommended)",
    strength: "Azure Site Recovery GA 2014. Continuous replication, 30-second RPO target. Recovery plans plus automation runbooks. Test failover to isolated VNet. Reverse replication mature. VMware, Hyper-V, physical, AWS to Azure. Strong UAE Microsoft / partners.",
    watch: "Azure-native target; non-Azure DR targets are less mature.",
    logo: "/logos/Microsoft_Azure.svg",
  },
  {
    slug: "aws-edr",
    name: "AWS Elastic DR",
    best: "Best for AWS-Target DR (Recommended)",
    strength: "CloudEndure 2012, AWS acquired 2019; rebranded Elastic DR. Sub-second RPO via block-level replication. Heterogeneous source; AWS-native target. Test launches without affecting source. Deep AWS partner network.",
    watch: "AWS-only target; multi-target DR programmes need a different tool.",
    logo: "/logos/Amazon_Web_Services.svg",
  },
  {
    slug: "commvault-dr",
    name: "Commvault DR",
    best: "Broadest Workload Coverage",
    strength: "Founded 1996; DR integrated with broader Commvault Cloud. CDP options via Live Sync. Auto Recovery plus workflow engine. Cleanroom Recovery is the reference for cyber-grade recovery. All hyperscalers. Broadest workload coverage including mainframe.",
    watch: "Operational complexity reflects feature breadth; Commvault rewards mature teams.",
    logo: "/logos/Commvault.svg",
  },
  {
    slug: "veeam-replication",
    name: "Veeam Cloud Connect Replication",
    best: "Best for Veeam-Aligned Estates",
    strength: "Veeam Cloud Connect 2014; tightly integrated with backup. Near-CDP via Continuous Data Protection plug-in. Veeam Orchestrator plus DataLabs for non-disruptive testing. Hardened Repo plus SecureRestore. AWS, Azure, GCP, service-provider clouds. Veeam ProPartner UAE.",
    watch: "Replication scope follows Veeam workload coverage; broader than VMware-only but narrower than Commvault.",
    logo: "/logos/veeam.svg",
  },
];

/* ───────── VENDOR MATRIX (BUYER'S MATRIX) ───────── */

const matrixVendors = [
  { name: "Zerto", recommended: true, rank: "#1" },
  { name: "VMware Live Recovery", recommended: true },
  { name: "Azure Site Recovery", recommended: true },
  { name: "AWS Elastic DR", recommended: true },
  { name: "Commvault DR" },
  { name: "Veeam Cloud Connect Replication" },
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
      "Founded 2009 Israel; HPE acquired 2021",
      "VMware SRM 2008; Cloud DR / Live Recovery 2020",
      "Azure Site Recovery GA 2014",
      "CloudEndure 2012; AWS acquired 2019; rebranded Elastic DR",
      "Founded 1996; DR integrated with Commvault Cloud",
      "Veeam Cloud Connect 2014; tightly integrated with backup",
    ],
  },
  {
    label: "CDP / RPO",
    type: "stars",
    cells: [
      { stars: 5, note: "Continuous Data Protection reference, seconds RPO" },
      { stars: 5, note: "Near-sync replication on VMware-only" },
      { stars: 4, note: "Continuous replication, 30-second RPO target" },
      { stars: 5, note: "Sub-second RPO via block-level replication" },
      { stars: 4, note: "CDP options via Live Sync" },
      { stars: 4, note: "Near-CDP via Continuous Data Protection plug-in" },
    ],
  },
  {
    label: "Orchestration / runbook",
    type: "stars",
    cells: [
      { stars: 5, note: "Failover groups, journal-based recovery" },
      { stars: 5, note: "Recovery plans plus SRM" },
      { stars: 5, note: "Recovery plans plus automation runbooks" },
      { stars: 4, note: "Recovery plans, automated launches" },
      { stars: 5, note: "Auto Recovery plus workflow engine" },
      { stars: 4, note: "Veeam Orchestrator" },
    ],
  },
  {
    label: "Non-disruptive failover test",
    type: "stars",
    cells: [
      { stars: 5, note: "Isolated-network test, one-click failback" },
      { stars: 5, note: "Bubble networks for non-disruptive test" },
      { stars: 5, note: "Test failover to isolated VNet" },
      { stars: 5, note: "Test launches without affecting source" },
      { stars: 5, note: "Cleanroom Recovery for cyber-grade isolation" },
      { stars: 5, note: "DataLabs for non-disruptive testing" },
    ],
  },
  {
    label: "Workload coverage",
    type: "stars",
    cells: [
      { stars: 4, note: "VM-centric; multi-target across clouds" },
      { stars: 4, note: "VMware-only protection scope" },
      { stars: 5, note: "VMware, Hyper-V, physical, AWS to Azure" },
      { stars: 5, note: "Heterogeneous source; AWS-native target" },
      { stars: 5, note: "Broadest coverage including mainframe" },
      { stars: 4, note: "Broader than VMware-only; narrower than Commvault" },
    ],
  },
  {
    label: "Cyber recovery integration",
    type: "stars",
    cells: [
      { stars: 4, note: "Journal-based recovery for ransomware" },
      { stars: 4, note: "Bubble networks plus VMware Cloud isolation" },
      { stars: 4, note: "Isolated VNet plus Azure Backup integration" },
      { stars: 4, note: "AWS-native isolation patterns" },
      { stars: 5, note: "Cleanroom Recovery cyber-grade reference" },
      { stars: 4, note: "Hardened Repo plus SecureRestore" },
    ],
  },
  {
    label: "Cloud target support",
    type: "stars",
    cells: [
      { stars: 5, note: "AWS, Azure, IBM and on-prem" },
      { stars: 5, note: "VMware Cloud on AWS / Azure / Google" },
      { stars: 5, note: "Azure-native target" },
      { stars: 5, note: "AWS-native target" },
      { stars: 5, note: "All hyperscalers" },
      { stars: 5, note: "AWS, Azure, GCP, service-provider clouds" },
    ],
  },
  {
    label: "UAE service depth",
    type: "stars",
    cells: [
      { stars: 5, note: "HPE plus partners deep in UAE" },
      { stars: 5, note: "Deep VMware partner network" },
      { stars: 5, note: "Strong UAE Microsoft plus partners" },
      { stars: 5, note: "Deep AWS partner network" },
      { stars: 5, note: "Mature UAE Commvault delivery" },
      { stars: 5, note: "Veeam ProPartner UAE" },
    ],
  },
  {
    label: "Best suited for",
    type: "text",
    cells: [
      "VM-heavy estates with multi-target requirements",
      "VMware-only estates extending to VMware Cloud",
      "Azure-target DR",
      "AWS-target DR",
      "Mixed VM/physical/SaaS estates with cyber-recovery vault",
      "Existing Veeam customers extending backup to replication",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "CDP reference with seconds-RPO and journal-based ransomware recovery; multi-target across AWS, Azure, IBM and on-prem." },
      { recommended: true, text: "Reference for VMware-heavy estates extending to VMware Cloud on AWS / Azure / Google." },
      { recommended: true, text: "Most mature Azure-target Disaster Recovery; covers VMware, Hyper-V and physical sources." },
      { recommended: true, text: "Sub-second RPO heterogeneous-source DR into AWS." },
      { text: "Broadest workload coverage plus Cleanroom Recovery for cyber-grade isolation." },
      { text: "Tightly integrated with Veeam backup; service-provider cloud targets via Veeam ProPartner." },
    ],
  },
];

/* ───────── GARTNER-STYLE CAPABILITY SCORECARD ───────── */

const featureVendors = [
  "Zerto",
  "VMware Live Recovery",
  "Azure Site Recovery",
  "AWS Elastic DR",
  "Commvault DR",
  "Veeam Cloud Connect",
];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "CDP and RPO",
    cells: [
      { tier: "best", note: "Seconds-RPO CDP reference" },
      { tier: "best", note: "Near-sync replication" },
      { tier: "excellent", note: "30-second RPO target" },
      { tier: "best", note: "Sub-second block-level RPO" },
      { tier: "excellent", note: "CDP via Live Sync" },
      { tier: "excellent", note: "Near-CDP via CDP plug-in" },
    ],
  },
  {
    label: "Orchestration and runbook",
    cells: [
      { tier: "best", note: "Failover groups plus journal recovery" },
      { tier: "best", note: "Recovery plans plus SRM" },
      { tier: "best", note: "Recovery plans plus automation runbooks" },
      { tier: "excellent", note: "Automated recovery launches" },
      { tier: "best", note: "Auto Recovery plus workflow engine" },
      { tier: "excellent", note: "Veeam Orchestrator" },
    ],
  },
  {
    label: "Non-disruptive failover testing",
    cells: [
      { tier: "best", note: "Isolated-network test, one-click failback" },
      { tier: "best", note: "Bubble networks for non-disruptive test" },
      { tier: "best", note: "Test failover to isolated VNet" },
      { tier: "best", note: "Test launches without affecting source" },
      { tier: "best", note: "Cleanroom Recovery isolation" },
      { tier: "best", note: "DataLabs for non-disruptive testing" },
    ],
  },
  {
    label: "Workload coverage",
    cells: [
      { tier: "excellent", note: "VM-centric, multi-target" },
      { tier: "excellent", note: "VMware-only scope" },
      { tier: "best", note: "VMware, Hyper-V, physical sources" },
      { tier: "best", note: "Heterogeneous source coverage" },
      { tier: "best", note: "Broadest coverage including mainframe" },
      { tier: "excellent", note: "Broader than VMware-only" },
    ],
  },
  {
    label: "Cyber-recovery readiness",
    cells: [
      { tier: "excellent", note: "Journal-based ransomware recovery" },
      { tier: "excellent", note: "Bubble networks plus VMware Cloud" },
      { tier: "excellent", note: "Isolated VNet plus Azure Backup" },
      { tier: "excellent", note: "AWS-native isolation patterns" },
      { tier: "best", note: "Cleanroom Recovery cyber-grade reference" },
      { tier: "excellent", note: "Hardened Repo plus SecureRestore" },
    ],
  },
  {
    label: "Cloud target flexibility",
    cells: [
      { tier: "best", note: "AWS, Azure, IBM and on-prem" },
      { tier: "best", note: "VMware Cloud on AWS / Azure / Google" },
      { tier: "best", note: "Azure-native target" },
      { tier: "best", note: "AWS-native target" },
      { tier: "best", note: "All hyperscalers" },
      { tier: "best", note: "AWS, Azure, GCP plus service-provider clouds" },
    ],
  },
  {
    label: "Failback automation",
    cells: [
      { tier: "best", note: "One-click failback" },
      { tier: "excellent", note: "SRM-driven failback" },
      { tier: "excellent", note: "Reverse replication mature" },
      { tier: "excellent", note: "Reverse replication supported" },
      { tier: "excellent", note: "Auto Recovery failback" },
      { tier: "excellent", note: "Orchestrator-driven failback" },
    ],
  },
  {
    label: "UAE service and support",
    cells: [
      { tier: "best", note: "HPE plus deep UAE partner bench" },
      { tier: "best", note: "Deep VMware partner network" },
      { tier: "best", note: "Strong UAE Microsoft plus partners" },
      { tier: "best", note: "Deep AWS partner network" },
      { tier: "best", note: "Mature UAE Commvault delivery" },
      { tier: "best", note: "Veeam ProPartner UAE" },
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
    title: "Workload pattern?",
    desc: "VM-heavy estates align with Zerto and VMware Live Recovery. Mixed VM, physical, SaaS and mainframe estates align with Commvault DR. Existing Veeam customers extend naturally to Veeam Cloud Connect Replication.",
  },
  {
    num: "02",
    title: "Operational DR or cyber-recovery?",
    desc: "Operational DR assumes the secondary site is trustworthy. Cyber-recovery assumes the production estate has been compromised and demands isolated, immutable, validated-clean copies. Banking and government deployments typically need both.",
  },
  {
    num: "03",
    title: "Cloud target or secondary site?",
    desc: "Cloud-target DR is now the UAE default. ASR is Azure-target, AWS Elastic DR is AWS-target, Zerto and Commvault are multi-target across hyperscalers and on-prem.",
  },
  {
    num: "04",
    title: "Test rigor expected?",
    desc: "Quarterly automated failover with documented evidence packs is becoming the UAE procurement requirement. All major Disaster Recovery platforms support non-disruptive testing; the difference is reporting depth and audit-readiness.",
  },
  {
    num: "05",
    title: "Single-target or multi-target?",
    desc: "Zerto and Commvault are multi-target; ASR and AWS EDR are single-target.",
  },
  {
    num: "06",
    title: "Existing data-protection vendor?",
    desc: "Often clean to extend the same platform for replication if SLAs allow.",
  },
];

/* ───────── UAE SOVEREIGNTY & COMMERCIAL NOTES ───────── */

const uaeNotes = [
  "CBUAE, DFSA, NESA and ADHICS frameworks expect documented BCP / DR testing with audit evidence.",
  "Sovereignty mandates often drive cloud-DR target to UAE regions (Azure UAE, AWS Bahrain, OCI Abu Dhabi) rather than global.",
  "Cyber-recovery is now a distinct discipline from operational DR for banking and government, both are typically required.",
  "Zerto and VMware Live Recovery dominate VMware-heavy UAE estates; ASR dominates Hyper-V plus Azure-target.",
  "Quarterly automated failover testing with reporting is becoming a UAE procurement requirement.",
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "Zerto or VMware Live Recovery for VMware-heavy estate?",
    answer:
      "Zerto wins on multi-target, heterogeneous workload support, and CDP RPO. Live Recovery wins for pure VMware estates extending to VMware Cloud on AWS / Azure / Google.",
  },
  {
    question: "Is cloud-target DR cheaper than a second site?",
    answer:
      "Significantly. Cloud-target DR typically costs 30-50 percent of a duplicate secondary site over five years.",
  },
  {
    question: "How is cyber-recovery different from regular DR?",
    answer:
      "Operational DR assumes the secondary site is trustworthy and the failure is infrastructure-level. Cyber-recovery assumes the production estate has been compromised and the recovery must come from an isolated, immutable, validated-clean copy.",
  },
  {
    question: "How often should we test failover?",
    answer:
      "Quarterly is the modern UAE expectation for tier-1 workloads, with annual full-site failover. All major Disaster Recovery platforms support non-disruptive testing.",
  },
  {
    question: "What is the typical Disaster Recovery deployment timeline?",
    answer:
      "Standard Disaster Recovery deployment runs four to eight weeks for production protection. Enterprise rollouts with cyber-recovery vault typically run three to six months.",
  },
  {
    question: "Is Artiflex IT tied to a single DR vendor?",
    answer:
      "No. We deliver Zerto, VMware Cloud DR / Live Recovery, Azure Site Recovery, AWS Elastic DR, Commvault DR and Veeam Cloud Connect Replication across UAE projects.",
  },
  {
    question: "Can you handle regulator-aligned DR testing?",
    answer:
      "Yes. Quarterly automated drills with documented evidence packs are standard for CBUAE-supervised customers.",
  },
  {
    question: "Do you offer fully-managed Disaster Recovery?",
    answer:
      "Yes. Co-managed and fully-managed engagements include runbook maintenance, quarterly drills, monitoring and failover-event support.",
  },
];

/* ───────── HERO ───────── */

function DisasterRecoveryHero() {
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
                <span className="font-medium text-[#28B5E1]">Disaster Recovery</span>
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
            Disaster{" "}
            <span className="gradient-text">Recovery</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Buyer's Guide, Vendor Matrix and Gartner-style Scorecard
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            A UAE buyer's guide for Disaster Recovery as a Service. Honest comparisons across <span className="font-semibold text-white">Zerto, VMware Cloud DR / Live Recovery, Microsoft Azure Site Recovery, AWS Elastic Disaster Recovery, Commvault DR, Veeam Cloud Connect Replication and Recovery Point</span>.
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
              to="/blog/origin-disaster-recovery"
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
              Get a Free Disaster Recovery Assessment
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

export default function DisasterRecoveryAsAService() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Disaster Recovery UAE | Buyer's Guide & Vendor Scorecard | Artiflex IT</title>
        <meta
          name="description"
          content="UAE buyer's guide for Disaster Recovery as a Service. Vendor matrix and Gartner-style scorecard across Zerto, VMware Cloud DR / Live Recovery, Azure Site Recovery, AWS Elastic DR, Commvault DR and Veeam Cloud Connect Replication."
        />
        <link rel="canonical" href="https://artiflexit.com/cloud-solutions/disaster-recovery-solutions-dubai" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Artiflex IT",
            "url": "https://artiflexit.com/cloud-solutions/disaster-recovery-solutions-dubai",
            "areaServed": [
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "City", "name": "Dubai" },
              { "@type": "City", "name": "Abu Dhabi" },
            ],
            "description": "Vendor-neutral UAE buyer's guide for Disaster Recovery as a Service across Zerto, VMware Live Recovery, Azure Site Recovery, AWS Elastic DR, Commvault DR and Veeam Cloud Connect Replication.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Disaster Recovery as a Service",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description": "UAE Disaster Recovery delivery across Zerto, VMware Live Recovery, Azure Site Recovery, AWS Elastic DR, Commvault DR and Veeam Cloud Connect: workload-tiered RPO / RTO design, cyber-recovery integration and regulator-aligned testing.",
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
            "name": "Disaster Recovery Platforms for UAE Buyers",
            "itemListElement": vendors.map((v, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <DisasterRecoveryHero />

      {/* ───────── Disaster Recovery PLATFORMS WE DELIVER (HONEYCOMB) ───────── */}
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
              Disaster Recovery{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Platforms
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The disaster recovery platforms we design, deploy and operate across UAE projects. Workload mix, RPO / RTO targets, cyber-recovery posture and cloud-target strategy drive the choice.
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
                layouts[DisasterRecoveryVendorList.length] ??
                [Math.ceil(DisasterRecoveryVendorList.length / 2), Math.floor(DisasterRecoveryVendorList.length / 2)];
              const rows: typeof DisasterRecoveryVendorList[] = [];
              let i = 0;
              sizes.forEach((s) => {
                rows.push(DisasterRecoveryVendorList.slice(i, i + s));
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
            {DisasterRecoveryVendorList.map((v) => (
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
              {DisasterRecoveryVendorList.length} platforms
            </span>
            , picked by workload tier, cloud-target strategy and cyber-recovery posture.
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
              Before any Disaster Recovery platform commitment, walk through these questions. Most UAE DR programmes fail in the test phase because the workload tiering, target architecture and cyber-recovery posture were never agreed up-front.
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
              <span className="gradient-text">Disaster Recovery buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              Six Disaster Recovery platforms cover the majority of UAE enterprise workloads. Zerto and VMware Live Recovery dominate VMware-heavy estates; Azure Site Recovery and AWS Elastic DR dominate cloud-target programmes; Commvault DR leads on workload breadth and Cleanroom Recovery; Veeam Cloud Connect Replication extends naturally from existing Veeam backup deployments.
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
              Detailed Comparison on Disaster Recovery Platforms
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Strengths, blind spots and the buyer profile each Disaster Recovery platform was built for. Disaster Recovery choice typically follows workload tiering, target architecture and cyber-recovery posture more than feature comparison.
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
              <span className="font-semibold text-white">Artiflex IT delivers Zerto, VMware Cloud DR / Live Recovery, Azure Site Recovery, AWS Elastic DR, Commvault DR and Veeam Cloud Connect Replication</span> across UAE projects. <br />
              <span className="text-xs italic text-white sm:text-base">Disaster Recovery recommendation follows workload tiering, target architecture and cyber-recovery posture, not a vendor preference.</span>
            </p>
          </div>

          {/* Feature ratings */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Scorecard
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each Disaster Recovery platform is rated across the capabilities that matter most for UAE enterprise disaster recovery, using a standardised tier scale. A gold ★ marker denotes best-in-class performance.
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
              The right Disaster Recovery platform for any environment falls out of a few honest questions. Walk through these before any vendor demo and the shortlist usually picks itself.
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
              What changes when you buy Disaster Recovery in the UAE
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              UAE Disaster Recovery carries specific sovereignty, regulator and partner considerations that change the recommendation versus a generic DR conversation.
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
              14+ years of UAE disaster recovery delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when Zerto wins, when VMware Live Recovery wins, when ASR, AWS Elastic DR, Commvault DR or Veeam Cloud Connect wins, and when cyber-recovery should sit alongside operational DR. Always a workload-tiered and regulator-aligned sizing before quoting.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years of UAE DR delivery" },
              { value: "500+", label: "Projects delivered, GCC-wide" },
              { value: "6", label: "Disaster Recovery platforms actively delivered" },
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
                  Platform coverage
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Zerto, VMware Cloud DR / Live Recovery, Azure Site Recovery, AWS Elastic DR, Commvault DR and Veeam Cloud Connect Replication across UAE and GCC deployments.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Compliance frameworks
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  NESA, UAE PDPL, CBUAE, DFSA, ADHICS, ISO 22301 and ISO 27001-aligned DR designs with documented test evidence and audit-ready reporting.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Coverage area
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  On-site across Dubai, Abu Dhabi and Sharjah. Remote across the UAE, Oman and Saudi Arabia. 24/7 DR-operations bench for managed customers.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Engagement model
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Design plus deploy plus managed-Disaster Recovery with quarterly automated drills, or assessment-only. Cyber-recovery vault design sits alongside operational DR where required.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#28B5E1] px-6 py-3 font-display text-sm font-semibold text-navy-deep transition-colors hover:bg-white sm:text-base"
            >
              Book a free Disaster Recovery assessment
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
            description="What UAE buyers ask us most about choosing Zerto, VMware Live Recovery, Azure Site Recovery, AWS Elastic DR, Commvault DR and Veeam Cloud Connect."
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
        title="Free Disaster Recovery Assessment"
        description="60-minute review of your current DR estate, workload tiering and RPO / RTO targets, target architecture, cyber-recovery posture and a recommended phased rollout plan."
        primaryButton={{ text: "Book Assessment", action: "modal" }}
      />
    </>
  );
}
