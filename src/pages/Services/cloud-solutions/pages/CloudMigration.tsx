import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import DeliveryModel from "@/components/sections/DeliveryModel";

/* ───────── CLOUD MIGRATION VENDORS (HONEYCOMB) ───────── */

const cloudVendorList = [
  { slug: "aws-mgn", name: "AWS MGN", logo: "/logos/Amazon_Web_Services.svg" },
  { slug: "azure-migrate", name: "Azure Migrate", logo: "/logos/Microsoft_Azure.svg" },
  { slug: "google-migrate", name: "Google Migrate", logo: "/logos/Google-Cloud.webp" },
  { slug: "cloudendure", name: "CloudEndure", logo: "/logos/CloudEndure.png" },
  { slug: "carbonite", name: "Carbonite Migrate", logo: "/logos/carbonite-by-opentext.png" },
  { slug: "rivermeadow", name: "Rivermeadow / Cloudamize / Movere", logo: "/logos/Rivermeadow.png" },
];

/* ───────── BUYER'S GUIDE, SELECTION FRAMEWORK ───────── */

const selectionFramework = [
  {
    step: "1",
    question: "What is the migration for?",
    capture: "Data centre exit, modernisation, capacity relief, M&A integration, end-of-support hardware, regulatory mandate",
    why: "Driver shapes target state and pace.",
  },
  {
    step: "2",
    question: "Workload inventory?",
    capture: "Server count, application count, data volume, custom and packaged software, mainframe / midrange",
    why: "Drives tooling: many small workloads need automated tools; few large complex workloads need bespoke planning.",
  },
  {
    step: "3",
    question: "Discovery and dependency mapping?",
    capture: "Manual inventory, agent-based discovery (Cloudamize / Movere), agentless network capture (Migration Center), application-dependency mapping",
    why: "Skipping discovery is the most common failure mode; budget 15-25 percent of total migration effort here.",
  },
  {
    step: "4",
    question: "Target cloud commitment?",
    capture: "AWS, Azure, GCP, OCI, sovereign / private cloud, hybrid",
    why: "Migration tooling differs by target.",
  },
  {
    step: "5",
    question: "Migration pattern (the 6 R's)?",
    capture: "Rehost, Replatform, Refactor, Repurchase, Retire, Retain",
    why: "Most large migrations are 70 percent rehost, 20 percent replatform, 10 percent refactor.",
  },
  {
    step: "6",
    question: "Cutover risk appetite?",
    capture: "Maintenance-window cutover, continuous replication with near-zero downtime, parallel run, phased",
    why: "CloudEndure / MGN deliver near-zero downtime; Azure Migrate works with maintenance windows.",
  },
  {
    step: "7",
    question: "Compliance and regulator?",
    capture: "UAE PDPL, NESA, CBUAE / DFSA notification, sector-specific frameworks",
    why: "UAE banking, government and regulated industries typically require regulator notification ahead of cloud migration.",
  },
];

/* ───────── SELECTION CRITERIA CHECKLIST ───────── */

const checklistGroups = [
  {
    title: "Discovery and assessment",
    items: [
      "Agentless network discovery",
      "Agent-based application telemetry",
      "Dependency mapping and visualisation",
      "Right-sizing recommendation",
      "Migration wave planning",
    ],
  },
  {
    title: "Migration tooling",
    items: [
      "Continuous replication",
      "Cutover orchestration",
      "Test-cutover capability",
      "Database migration",
      "Container migration",
    ],
  },
  {
    title: "Operational fit",
    items: [
      "Cross-cloud target support",
      "Heterogeneous source OS support",
      "Network and IP preservation",
      "Post-migration optimisation",
    ],
  },
  {
    title: "Service fit",
    items: [
      "UAE professional services depth",
      "Methodology (AWS MAP / Azure Migrate / Google CAF)",
      "Application modernisation expertise",
      "Programme management capacity",
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
    slug: "aws-mgn",
    name: "AWS MGN",
    best: "AWS-Native Migration (Recommended)",
    strength: "AWS Application Migration Service GA 2021 (CloudEndure foundation). AWS-native and optimised. Continuous block-level replication, native test launches. AWS DMS reference for databases, App2Container plus ECS Anywhere for containers. Deep AWS PS plus partners in UAE.",
    watch: "AWS-only target; multi-cloud migrations need a different tool.",
    logo: "/logos/Amazon_Web_Services.svg",
  },
  {
    slug: "azure-migrate",
    name: "Azure Migrate",
    best: "Best for Azure-Aligned Migrations (Recommended)",
    strength: "Azure Migrate GA 2018; Azure Site Recovery foundation. Azure Migrate Discovery (formerly Movere) is reference for discovery. Continuous replication via ASR, test failover to isolated VNet. Azure DMS plus SQL Migration Assistant. Strong UAE Microsoft and partner network.",
    watch: "Azure-only target; less mature for non-Windows workloads.",
    logo: "/logos/Microsoft_Azure.svg",
  },
  {
    slug: "google-migrate",
    name: "Google Migrate",
    best: "Best for GCP & Container Modernisation (Recommended)",
    strength: "Google Migrate for Compute Engine plus Migrate to Containers. Migration Center Discovery. Block-level replication. Migrate to Containers is the container-migration reference. Database Migration Service. Growing UAE Google partner network.",
    watch: "GCP-only target; UAE partner ecosystem is growing rather than dominant.",
    logo: "/logos/Google-Cloud.webp",
  },
  {
    slug: "cloudendure",
    name: "CloudEndure (AWS-acquired)",
    best: "Near-Zero RPO Replication (Recommended)",
    strength: "CloudEndure founded 2012; AWS acquired 2019. Now branded as AWS Elastic DR plus the foundation for MGN. Near-zero RPO via block-level replication. Point-in-time test, mature failback. Partner-led delivery in UAE.",
    watch: "AWS-primary; the legacy multi-cloud version is no longer the strategic direction.",
    logo: "/logos/CloudEndure.png",
  },
  {
    slug: "carbonite",
    name: "Carbonite Migrate",
    best: "Best Multi-Target Migration",
    strength: "Carbonite Migrate (DoubleTake heritage); now OpenText. Multi-target: AWS, Azure, GCP, on-prem. Continuous data replication, mature test cutover. Strong legacy OS support. OpenText partner network in UAE.",
    watch: "Discovery is limited compared to native Migration Center / Cloudamize / Movere; pair with a specialist discovery tool.",
    logo: "/logos/carbonite-by-opentext.png",
  },
  {
    slug: "rivermeadow",
    name: "Rivermeadow / Cloudamize / Movere",
    best: "Best for Discovery & Assessment",
    strength: "Rivermeadow plus Cloudamize plus Movere (Microsoft-acquired 2019). Cloudamize and Movere are the reference discovery tools; Rivermeadow is multi-target. Continuous replication, test cutover. Movere now powers Azure Migrate Discovery.",
    watch: "Best as the discovery half of a migration; native tools take execution.",
    logo: "/logos/Rivermeadow.png",
  },
];

/* ───────── VENDOR MATRIX (BUYER'S MATRIX) ───────── */

const matrixVendors = [
  { name: "AWS MGN", recommended: true, rank: "#1" },
  { name: "Azure Migrate", recommended: true },
  { name: "Google Migrate", recommended: true },
  { name: "CloudEndure", recommended: true },
  { name: "Carbonite Migrate" },
  { name: "Rivermeadow / Cloudamize / Movere" },
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
      "AWS Application Migration Service GA 2021; built on CloudEndure foundation",
      "Azure Migrate GA 2018; Azure Site Recovery foundation; integrates Movere discovery",
      "Migrate for Compute Engine plus Migrate to Containers; Migration Center for discovery",
      "Founded 2012; AWS-acquired 2019; foundation for MGN and AWS Elastic DR",
      "DoubleTake heritage; now OpenText; multi-target migration since 2000s",
      "Cloudamize and Movere are reference discovery tools; Rivermeadow multi-target",
    ],
  },
  {
    label: "Target cloud support",
    type: "stars",
    cells: [
      { stars: 5, note: "AWS-native; optimised for AWS targets" },
      { stars: 5, note: "Azure-native; deepest Azure integration" },
      { stars: 5, note: "GCP-native plus container modernisation" },
      { stars: 4, note: "AWS-primary now; legacy multi-cloud deprecated" },
      { stars: 5, note: "Multi-target: AWS, Azure, GCP, on-prem" },
      { stars: 5, note: "Multi-target; Rivermeadow plus discovery tooling" },
    ],
  },
  {
    label: "Discovery and dependency mapping",
    type: "stars",
    cells: [
      { stars: 4, note: "AWS Application Discovery Service; agent and agentless" },
      { stars: 5, note: "Azure Migrate Discovery powered by Movere" },
      { stars: 4, note: "Migration Center with dependency mapping" },
      { stars: 3, note: "Lean discovery; pair with native tooling" },
      { stars: 3, note: "Limited discovery; pair with specialist tool" },
      { stars: 5, note: "Cloudamize / Movere are the reference discovery output" },
    ],
  },
  {
    label: "Replication and cutover",
    type: "stars",
    cells: [
      { stars: 5, note: "Continuous block-level replication, native test launches" },
      { stars: 5, note: "ASR-powered continuous replication; isolated test failover" },
      { stars: 4, note: "Block-level replication; test clones for validation" },
      { stars: 5, note: "Near-zero RPO; mature point-in-time test and failback" },
      { stars: 5, note: "Continuous data replication; mature test cutover" },
      { stars: 4, note: "Continuous replication; test cutover supported" },
    ],
  },
  {
    label: "Database migration",
    type: "stars",
    cells: [
      { stars: 5, note: "AWS DMS reference; SCT for schema conversion" },
      { stars: 5, note: "Azure DMS plus SQL Migration Assistant" },
      { stars: 4, note: "Database Migration Service for MySQL / PostgreSQL" },
      { stars: 3, note: "VM-level; pair with AWS DMS for databases" },
      { stars: 4, note: "Solid database replication for mixed estates" },
      { stars: 4, note: "Discovery-led DB inventory; execution via native" },
    ],
  },
  {
    label: "Container migration",
    type: "stars",
    cells: [
      { stars: 4, note: "App2Container plus ECS Anywhere" },
      { stars: 4, note: "Azure Migrate plus AKS conversion tooling" },
      { stars: 5, note: "Migrate to Containers is the modernisation reference" },
      { stars: 3, note: "VM-focused; container modernisation via partners" },
      { stars: 3, note: "VM-focused; container support limited" },
      { stars: 3, note: "Discovery-led; container execution via native tools" },
    ],
  },
  {
    label: "Test-cutover and validation",
    type: "stars",
    cells: [
      { stars: 5, note: "Native test launches without affecting source" },
      { stars: 5, note: "Test failover to isolated VNet, repeatable" },
      { stars: 4, note: "Test clones plus validation workflow" },
      { stars: 5, note: "Point-in-time test; mature failback patterns" },
      { stars: 5, note: "Mature test cutover with multi-target validation" },
      { stars: 4, note: "Supported; depth depends on target tooling" },
    ],
  },
  {
    label: "UAE professional services depth",
    type: "stars",
    cells: [
      { stars: 5, note: "Deep AWS PS plus partner ecosystem in UAE" },
      { stars: 5, note: "Microsoft and partner depth across UAE" },
      { stars: 4, note: "Growing UAE Google partner network" },
      { stars: 4, note: "Partner-led delivery in UAE" },
      { stars: 4, note: "OpenText partner network in UAE" },
      { stars: 4, note: "Discovery delivered via specialist partners" },
    ],
  },
  {
    label: "Best suited for",
    type: "text",
    cells: [
      "AWS-target migrations",
      "Azure-target migrations",
      "GCP-target migrations and container modernisation",
      "AWS-target with near-zero RPO",
      "Multi-target migrations across AWS / Azure / GCP",
      "Discovery and assessment across multi-target programmes",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "AWS-native, deeply integrated, deepest UAE AWS partner ecosystem." },
      { recommended: true, text: "Azure-native and most mature for Microsoft-aligned migrations." },
      { recommended: true, text: "GCP-native plus best container-migration tool with Migrate to Containers." },
      { recommended: true, text: "Near-zero RPO continuous replication; the foundation for MGN and Elastic DR." },
      { text: "Best multi-target tool when migrating to multiple clouds in one programme." },
      { text: "Best discovery tooling; pair with native execution tools." },
    ],
  },
];

/* ───────── GARTNER-STYLE CAPABILITY SCORECARD ───────── */

const featureVendors = [
  "AWS MGN",
  "Azure Migrate",
  "Google Migrate",
  "CloudEndure",
  "Carbonite Migrate",
  "Rivermeadow / Cloudamize / Movere",
];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "Discovery and assessment",
    cells: [
      { tier: "excellent", note: "AWS Application Discovery Service" },
      { tier: "best", note: "Azure Migrate Discovery (Movere)" },
      { tier: "excellent", note: "Migration Center dependency mapping" },
      { tier: "strong", note: "Lean discovery; pair with native" },
      { tier: "strong", note: "Limited discovery; pair with specialist" },
      { tier: "best", note: "Cloudamize / Movere reference discovery" },
    ],
  },
  {
    label: "Replication and cutover",
    cells: [
      { tier: "best", note: "Continuous block-level, native test launches" },
      { tier: "best", note: "ASR continuous replication; test failover" },
      { tier: "excellent", note: "Block-level replication; test clones" },
      { tier: "best", note: "Near-zero RPO; mature failback" },
      { tier: "best", note: "Continuous data replication, mature cutover" },
      { tier: "excellent", note: "Continuous replication; test cutover" },
    ],
  },
  {
    label: "Database migration",
    cells: [
      { tier: "best", note: "AWS DMS plus SCT" },
      { tier: "best", note: "Azure DMS plus SQL Migration Assistant" },
      { tier: "excellent", note: "Database Migration Service" },
      { tier: "strong", note: "VM-level; pair with DMS" },
      { tier: "excellent", note: "Mixed estate database replication" },
      { tier: "excellent", note: "Discovery-led DB inventory" },
    ],
  },
  {
    label: "Container migration / refactoring",
    cells: [
      { tier: "excellent", note: "App2Container plus ECS Anywhere" },
      { tier: "excellent", note: "AKS conversion tooling" },
      { tier: "best", note: "Migrate to Containers reference" },
      { tier: "strong", note: "VM-focused; partner-led containers" },
      { tier: "strong", note: "Limited container support" },
      { tier: "strong", note: "Discovery-led; native execution" },
    ],
  },
  {
    label: "Test-cutover support",
    cells: [
      { tier: "best", note: "Native test launches, no source impact" },
      { tier: "best", note: "Isolated VNet test failover, repeatable" },
      { tier: "excellent", note: "Test clones plus validation workflow" },
      { tier: "best", note: "Point-in-time test plus failback" },
      { tier: "best", note: "Mature multi-target test cutover" },
      { tier: "excellent", note: "Supported; depth via target tooling" },
    ],
  },
  {
    label: "Multi-target support",
    cells: [
      { tier: "strong", note: "AWS-only target" },
      { tier: "strong", note: "Azure-only target" },
      { tier: "strong", note: "GCP-only target" },
      { tier: "excellent", note: "AWS-primary; legacy multi-cloud" },
      { tier: "best", note: "AWS, Azure, GCP, on-prem" },
      { tier: "best", note: "Rivermeadow plus discovery multi-target" },
    ],
  },
  {
    label: "Mainframe / legacy support",
    cells: [
      { tier: "excellent", note: "Mainframe via partner ISV programmes" },
      { tier: "excellent", note: "Legacy Windows depth; partner mainframe" },
      { tier: "strong", note: "Linux-heavy; mainframe via partners" },
      { tier: "strong", note: "VM-level legacy OS support" },
      { tier: "excellent", note: "Strong legacy OS coverage" },
      { tier: "excellent", note: "Discovery covers legacy estates" },
    ],
  },
  {
    label: "UAE delivery depth",
    cells: [
      { tier: "best", note: "Deep AWS PS plus UAE partners" },
      { tier: "best", note: "Microsoft and partner depth in UAE" },
      { tier: "excellent", note: "Growing UAE Google partner network" },
      { tier: "excellent", note: "Partner-led delivery in UAE" },
      { tier: "excellent", note: "OpenText partner network in UAE" },
      { tier: "excellent", note: "Specialist partner discovery in UAE" },
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
    title: "Hyperscaler-native or specialist tooling?",
    desc: "If the target is a single hyperscaler, native tooling (MGN, Azure Migrate, Google Migrate) is optimised, well-supported and often free. Specialist tools earn their place on multi-target programmes or when discovery depth is the binding constraint.",
  },
  {
    num: "02",
    title: "Discovery investment level?",
    desc: "Skipping discovery is the most common migration failure mode. Budget 15-25 percent of total effort on agentless and agent-based discovery, dependency mapping and right-sizing. Cloudamize and Movere produce the deepest output.",
  },
  {
    num: "03",
    title: "Rehost or refactor?",
    desc: "Most large migrations are 70 percent rehost, 20 percent replatform, 10 percent refactor. Rehost first, then refactor what justifies the spend. Refactoring everything up front delays value and inflates cost.",
  },
  {
    num: "04",
    title: "Cutover semantics?",
    desc: "CloudEndure and MGN deliver near-zero downtime via continuous replication. Azure Migrate works with maintenance windows. Parallel-run and phased cutovers add safety but lengthen the programme. Match risk appetite to tool.",
  },
  {
    num: "05",
    title: "Multi-target or single target?",
    desc: "Multi-target programmes favour Carbonite or Rivermeadow; single-target favours native tooling. Mixing native tools across multiple clouds is workable, but only if discovery and governance are unified across the programme.",
  },
  {
    num: "06",
    title: "Methodology partner appetite?",
    desc: "AWS MAP, Azure CAF, Google CAF embed regulator-friendly governance. Methodology partner funding materially offsets cost and reduces audit risk for regulated UAE migrations.",
  },
];

/* ───────── UAE SOVEREIGNTY & COMMERCIAL NOTES ───────── */

const uaeNotes = [
  "CBUAE, DFSA and TDRA frameworks expect documented migration plans for regulated workloads; regulator notification is often required.",
  "UAE PDPL adds residency considerations to migration: target region (AWS Bahrain, Azure UAE, GCP Dammam, OCI Abu Dhabi) shapes design.",
  "Data egress from on-prem to cloud is often the bandwidth bottleneck; AWS Snowball and Azure Data Box bypass this.",
  "Multi-vendor migrations (different applications to different clouds) are increasingly common across UAE enterprises.",
  "Methodology partners (AWS MAP, Azure CAF, Google Cloud Adoption Framework) embed regulator-friendly governance.",
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "How long does a typical UAE cloud migration take?",
    answer:
      "Lift-and-shift of a 100-VM estate: three to six months. Application modernisation: 12 to 18 months. Full data-centre exit: 18 to 36 months.",
  },
  {
    question: "Should we use AWS MGN or Azure Migrate or a third-party tool?",
    answer:
      "If the target is single-cloud, use the native tool: optimised, well-supported and often free. If the migration spans multiple targets, Carbonite Migrate or Rivermeadow win.",
  },
  {
    question: "How important is discovery and dependency mapping?",
    answer:
      "Critical. The biggest cause of over-budget migration is undersized target estates and missed application dependencies. Budget 15-25 percent of effort here. Cloudamize and Movere produce the deepest discovery output.",
  },
  {
    question: "What is the typical migration cost?",
    answer:
      "Highly variable, typically 8-15 percent of three-year-cloud-spend for lift-and-shift; 30-50 percent for refactor / modernisation. Methodology partner funding (AWS MAP, Azure ECIF, Google MAP) materially offsets cost.",
  },
  {
    question: "Should we hire a partner or do it in-house?",
    answer:
      "Partner-led delivery is the default for UAE migrations above 200 VMs or any cross-jurisdiction sovereign migration.",
  },
  {
    question: "Is Artiflex IT tied to a single migration tool?",
    answer:
      "No. We deliver AWS MGN, Azure Migrate, Google Migrate, CloudEndure, Carbonite, Rivermeadow / Cloudamize / Movere across UAE projects. Recommendation follows target cloud and methodology partner.",
  },
  {
    question: "Can you handle regulator notification for banking / DFSA migration?",
    answer:
      "Yes. We engage CBUAE / DFSA / TDRA as part of the project, not as a follow-up.",
  },
  {
    question: "Do you offer post-migration FinOps governance?",
    answer:
      "Yes. Right-sizing automation, reserved-instance / committed-use sizing, tag governance and quarterly cost-optimisation reviews are part of the post-migration engagement.",
  },
];

/* ───────── HERO ───────── */

function CloudMigrationHero() {
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
                <span className="font-medium text-[#28B5E1]">Cloud Migration</span>
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
            Cloud{" "}
            <span className="gradient-text">Migration</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Buyer's Guide, Vendor Matrix and Gartner-style Scorecard
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            A UAE buyer's guide for cloud migration strategy, tooling and execution. Honest comparisons across native hyperscaler tooling (<span className="font-semibold text-white">AWS Application Migration Service, Azure Migrate, Google Migrate</span>) and specialist tools (<span className="font-semibold text-white">CloudEndure, Carbonite Migrate, Rivermeadow, Cloudamize, Movere</span>).
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
              to="/blog/origin-cloud-migration"
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
              Get a Free Cloud Migration Assessment
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

export default function CloudMigration() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Cloud Migration UAE | Buyer's Guide & Vendor Scorecard | Artiflex IT</title>
        <meta
          name="description"
          content="UAE buyer's guide for cloud migration. Vendor matrix and Gartner-style scorecard across AWS MGN, Azure Migrate, Google Migrate, CloudEndure, Carbonite and Rivermeadow / Cloudamize / Movere."
        />
        <link rel="canonical" href="https://artiflexit.com/cloud-solutions/cloud-migration" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Artiflex IT",
            "url": "https://artiflexit.com/cloud-solutions/cloud-migration",
            "areaServed": [
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "City", "name": "Dubai" },
              { "@type": "City", "name": "Abu Dhabi" },
            ],
            "description": "Vendor-neutral UAE buyer's guide for cloud migration across AWS MGN, Azure Migrate, Google Migrate, CloudEndure, Carbonite and Rivermeadow / Cloudamize / Movere.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Cloud Migration Services",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description": "UAE cloud migration delivery across AWS MGN, Azure Migrate, Google Migrate, CloudEndure, Carbonite and Rivermeadow / Cloudamize / Movere: discovery, replication, cutover and post-migration FinOps.",
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
            "name": "Cloud Migration Tools for UAE Buyers",
            "itemListElement": vendors.map((v, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <CloudMigrationHero />

      {/* ───────── CLOUD MIGRATION TOOLS WE DELIVER (HONEYCOMB) ───────── */}
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
              Cloud Migration{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Tools
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The migration tooling we deploy across UAE projects. Target cloud, workload inventory, cutover risk appetite and discovery depth drive the choice.
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
              {cloudVendorList.length} migration tools
            </span>
            , picked by target cloud, workload inventory and cutover risk appetite.
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
              Before any migration tool commitment, walk through these questions. Most over-budget UAE migrations come from skipping discovery, picking the wrong cutover semantics and missing regulator notification windows.
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
              <span className="gradient-text">Cloud Migration buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              Six migration tools cover the majority of UAE enterprise migrations. AWS MGN, Azure Migrate and Google Migrate are the native references for single-target programmes; CloudEndure covers near-zero RPO; Carbonite and Rivermeadow / Cloudamize / Movere handle multi-target and discovery-led migrations.
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
              Detailed Comparison on Cloud Migration Tools
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Strengths, blind spots and the buyer profile each migration tool was built for. Tool choice typically follows target cloud, workload inventory and discovery depth more than feature comparison.
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
              <span className="font-semibold text-white">Artiflex IT delivers AWS MGN, Azure Migrate, Google Migrate, CloudEndure, Carbonite Migrate and Rivermeadow / Cloudamize / Movere</span> across UAE projects. <br />
              <span className="text-xs italic text-white sm:text-base">Migration recommendation follows target cloud, workload inventory and discovery depth, not a tool preference.</span>
            </p>
          </div>

          {/* Feature ratings */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Scorecard
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each migration tool is rated across the capabilities that matter most for UAE enterprise cloud migration, using a standardised tier scale. A gold ★ marker denotes best-in-class performance.
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
              The right migration tool for any programme falls out of a few honest questions. Walk through these before any tool demo and the shortlist usually picks itself.
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
              What changes when you migrate in the UAE
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              UAE cloud migration carries specific sovereignty, residency and regulator considerations that change the recommendation versus a generic migration conversation.
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
              14+ years of UAE cloud migration delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Tool-agnostic by design. We will tell you when AWS MGN wins, when Azure Migrate wins, when Google Migrate, CloudEndure, Carbonite or Rivermeadow / Cloudamize / Movere wins, and when discovery alone earns its budget. Always a workload-driven and sovereignty-aware migration plan before quoting.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years of UAE migration delivery" },
              { value: "500+", label: "Projects delivered, GCC-wide" },
              { value: "6", label: "Migration tools actively delivered" },
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
                  Tool coverage
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  AWS MGN, Azure Migrate, Google Migrate, CloudEndure (AWS Elastic DR), Carbonite Migrate (OpenText) and Rivermeadow / Cloudamize / Movere across UAE projects.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Compliance frameworks
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  NESA, UAE PDPL, TDRA, CBUAE, DFSA, ADGM, ISO 27001 and ADHICS-aligned migration plans with documented regulator notification and audit-ready evidence.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Coverage area
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  On-site across Dubai, Abu Dhabi and Sharjah. Remote across the UAE, Oman and Saudi Arabia. 24/7 migration cutover bench for managed customers.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Engagement model
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Discovery plus migration plus FinOps governance, or assessment-only. Methodology partner funding (AWS MAP, Azure ECIF, Google MAP) is part of the design.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#28B5E1] px-6 py-3 font-display text-sm font-semibold text-navy-deep transition-colors hover:bg-white sm:text-base"
            >
              Book a free migration assessment
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
            description="What UAE buyers ask us most about cloud migration tooling, methodology partners and regulator engagement."
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
        title="Free Cloud Migration Assessment"
        description="60-minute review of your current estate, discovery readiness, target cloud commitment, cutover risk appetite and a recommended phased migration plan."
        primaryButton={{ text: "Book Assessment", action: "modal" }}
      />
    </>
  );
}
