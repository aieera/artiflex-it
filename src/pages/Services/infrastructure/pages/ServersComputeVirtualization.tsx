import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import DeliveryModel from "@/components/sections/DeliveryModel";

/* ───────── COMPUTE VENDORS (HONEYCOMB) ───────── */

const computeVendorList = [
  { slug: "hpe", name: "HPE ProLiant", logo: "/logos/Hewlett.svg" },
  { slug: "dell", name: "Dell PowerEdge", logo: "/logos/Dell_Technologies.webp" },
  { slug: "lenovo", name: "Lenovo ThinkSystem", logo: "/logos/Lenovo.png" },
  { slug: "cisco-ucs", name: "Cisco UCS", logo: "/logos/Cisco.svg" },
  { slug: "nutanix", name: "Nutanix", logo: "/logos/Nutanix.svg" },
  { slug: "supermicro", name: "Supermicro", logo: "/logos/Supermicro.png" },
];

/* ───────── BUYER'S GUIDE, SELECTION FRAMEWORK ───────── */

const selectionFramework = [
  {
    step: "1",
    question: "What is the compute for?",
    capture: "Production virtualisation host, VDI, database, AI / GPU, container platform, branch / ROBO, or a specific application (SAP HANA, Oracle Exadata)",
    why: "Each profile has a natural server class. Database servers want higher core-clock and memory bandwidth; AI servers want GPUs and NVLink; VDI wants core density.",
  },
  {
    step: "2",
    question: "Discrete servers, HCI, or composable?",
    capture: "Traditional rack servers with separate storage, HCI (vSAN, Nutanix, Azure Stack HCI), or composable (HPE Synergy, Cisco UCS X-Series)",
    why: "HCI simplifies operations and pairs well with branch and mid-market estates; discrete servers still win on raw performance and large-scale databases.",
  },
  {
    step: "3",
    question: "Hypervisor commitment?",
    capture: "VMware vSphere, Microsoft Hyper-V, Nutanix AHV, Proxmox, Red Hat OpenShift Virtualization, or KubeVirt",
    why: "The 2024 Broadcom changes pushed many UAE customers to evaluate alternatives. The decision now drives ten-year operational economics.",
  },
  {
    step: "4",
    question: "Scale-out unit?",
    capture: "Two to four nodes for branch, six to twelve nodes for mid-market clusters, larger blocks for enterprise pods",
    why: "Right-sizing the unit determines failure-domain economics: small clusters waste capacity to N+1, large clusters give better effective utilisation.",
  },
  {
    step: "5",
    question: "Workload portability?",
    capture: "Pure on-premise, hybrid with cloud burst, cloud-resident DR, or multi-site replication",
    why: "Modern compute stacks offer hybrid options (Azure Stack HCI, VMware Cloud Foundation, Nutanix Cloud Clusters) that change the design conversation.",
  },
  {
    step: "6",
    question: "CapEx vs subscription?",
    capture: "Outright purchase, consumption (HPE GreenLake, Dell APEX, Lenovo TruScale), or fully managed",
    why: "Subscription is now genuinely competitive: predictable cost, refresh included, hardware lifecycle de-risked.",
  },
  {
    step: "7",
    question: "Operational team capacity?",
    capture: "Dedicated virtualisation team, generalist IT staff, or outsourced operations",
    why: "Operational simplicity often beats raw capability for under-resourced UAE IT teams. Nutanix Prism and Azure Stack HCI lead on this axis.",
  },
];

/* ───────── SELECTION CRITERIA CHECKLIST ───────── */

const checklistGroups = [
  {
    title: "Hardware fit",
    items: [
      "CPU generation (Intel Xeon Gen5/6, AMD EPYC Genoa/Turin)",
      "Memory bandwidth and DIMM topology",
      "GPU support (NVIDIA H100/H200, L40S)",
      "PCIe Gen5 and CXL",
      "NVMe slot count",
      "Out-of-band management (iLO, iDRAC, XCC, CIMC)",
    ],
  },
  {
    title: "Virtualisation fit",
    items: [
      "vSphere / Hyper-V / AHV compatibility",
      "Container support (vKS, AKS-HCI, Karbon, OpenShift)",
      "Live migration and HA semantics",
      "Storage and network virtualisation",
      "Operations console (vCenter, SCVMM, Prism, Cockpit)",
    ],
  },
  {
    title: "Commercial fit",
    items: [
      "CapEx vs GreenLake / APEX / TruScale",
      "Effective cost per VM",
      "Hypervisor licensing 2024+ economics",
      "Maintenance and support tier",
      "Five-year TCO across refresh",
    ],
  },
  {
    title: "Service fit",
    items: [
      "UAE in-country engineering bench",
      "Four-hour mission-critical SLA",
      "Spare parts depot",
      "Predictive part replacement via AIOps",
      "Local certified-engineer bench",
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
    slug: "hpe",
    name: "HPE ProLiant / Alletra dHCI",
    best: "Most-Shipped Server Line (Recommended)",
    strength: "HPE 2015 (HP since 1939); ProLiant is the most-shipped server line globally. DL, ML, Apollo, Synergy and Edgeline cover every workload. HPE GreenLake is the most mature consumption model; Compute Ops Manager unifies the management plane. DL380a Gen11 plus Cray AI lead on GPU readiness.",
    watch: "Composable Synergy and Alletra dHCI add SKU complexity; engagement model benefits from clear single-pane operations decisions early.",
    logo: "/logos/Hewlett.svg",
  },
  {
    slug: "dell",
    name: "Dell PowerEdge / VxRail",
    best: "Broadest Portfolio (Recommended)",
    strength: "Dell PowerEdge since 1994. R-series, T-series, MX modular and XE GPU servers cover every workload. VxRail (joint with VMware) is the reference VMware HCI. XE9680 leads GPU density. Dell APEX is a strong second on consumption; OpenManage and CloudIQ are mature.",
    watch: "VxRail roadmap is tied tightly to VMware; post-Broadcom hypervisor moves alter the value calculation.",
    logo: "/logos/Dell_Technologies.webp",
  },
  {
    slug: "lenovo",
    name: "Lenovo ThinkSystem / ThinkAgile",
    best: "Best Hypervisor Neutrality (Recommended)",
    strength: "Lenovo acquired IBM x86 in 2014 with deep enterprise heritage. SR, ST, SD HPC and SE edge cover server breadth. ThinkAgile HX (Nutanix), MX (Azure Stack HCI) and VX (VMware) deliver every major hypervisor option. SR685a V3 is a strong AI platform; TruScale subscription is credible.",
    watch: "XClarity management plane is capable but workmanlike; some service motions are partner-led rather than direct.",
    logo: "/logos/Lenovo.png",
  },
  {
    slug: "cisco-ucs",
    name: "Cisco UCS",
    best: "Best Management Plane (Recommended)",
    strength: "Cisco UCS 2009; the original converged x86 platform. C-Series plus X-Series modular. Cisco Intersight is the best-in-class cloud-native management plane. Direct UAE TAC presence; Cisco Plus and UCS-X subscription growing fast.",
    watch: "HyperFlex roadmap in transition; AHV story is growing but VMware remains the primary hypervisor pattern today.",
    logo: "/logos/Cisco.svg",
  },
  {
    slug: "nutanix",
    name: "Nutanix",
    best: "Best HCI Reference (Recommended)",
    strength: "Nutanix 2009; pioneered hyperconverged infrastructure. Nutanix Cloud Platform is the reference HCI. AHV is native (no extra hypervisor licence), Prism is the gold standard for HCI operations, single-node edge clusters cover ROBO. Strong post-Broadcom alternative for VMware estates.",
    watch: "Hardware comes via OEM (Dell, Lenovo, HPE) or NX appliances; GPU and specialist AI builds rely on partner appliances.",
    logo: "/logos/Nutanix.svg",
  },
  {
    slug: "supermicro",
    name: "Supermicro",
    best: "Best for Specialist & AI Density",
    strength: "Supermicro 1993; reference for specialist and AI builds. Broadest specialist range, industry leader for raw AI density, edge SuperServer line. Strong fit when the workload defines the chassis rather than the other way around.",
    watch: "SuperCloud Composer management plane is growing rather than mature; consumption motion is limited; service is distributor-led with a smaller bench.",
    logo: "/logos/Supermicro.png",
  },
];

/* ───────── VENDOR MATRIX (BUYER'S MATRIX) ───────── */

const matrixVendors = [
  { name: "HPE ProLiant / Alletra dHCI", recommended: true, rank: "#1" },
  { name: "Dell PowerEdge / VxRail", recommended: true },
  { name: "Lenovo ThinkSystem / ThinkAgile", recommended: true },
  { name: "Cisco UCS", recommended: true },
  { name: "Nutanix" },
  { name: "Supermicro" },
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
      "HPE 2015 (HP since 1939); ProLiant is the most-shipped server line globally",
      "Dell PowerEdge since 1994; VxRail since 2016",
      "Lenovo acquired IBM x86 in 2014; deep enterprise heritage",
      "Cisco UCS 2009; the original converged x86 platform",
      "Nutanix 2009; pioneered hyperconverged infrastructure",
      "Supermicro 1993; reference for specialist and AI builds",
    ],
  },
  {
    label: "Server breadth",
    type: "stars",
    cells: [
      { stars: 5, note: "DL, ML, Apollo, Synergy, Edgeline" },
      { stars: 5, note: "R-series, T-series, MX modular, XE GPU" },
      { stars: 5, note: "SR, ST, SD HPC, SE edge" },
      { stars: 4, note: "C-Series, X-Series modular" },
      { stars: 3, note: "NX appliances + OEM via Dell, Lenovo, HPE" },
      { stars: 5, note: "Broadest specialist range" },
    ],
  },
  {
    label: "HCI offering",
    type: "stars",
    cells: [
      { stars: 4, note: "Alletra dHCI, SimpliVity, GreenLake for HCI" },
      { stars: 5, note: "VxRail (joint with VMware)" },
      { stars: 4, note: "ThinkAgile HX, MX, VX" },
      { stars: 4, note: "HyperFlex (in transition)" },
      { stars: 5, note: "Nutanix Cloud Platform reference" },
      { stars: 3, note: "Limited dedicated HCI line" },
    ],
  },
  {
    label: "Composable / modular",
    type: "stars",
    cells: [
      { stars: 5, note: "Synergy reference platform" },
      { stars: 4, note: "PowerEdge MX" },
      { stars: 3, note: "ThinkSystem D2" },
      { stars: 5, note: "UCS X-Series" },
      { stars: 3, note: "N/A" },
      { stars: 4, note: "SuperBlade" },
    ],
  },
  {
    label: "AI / GPU readiness",
    type: "stars",
    cells: [
      { stars: 5, note: "ProLiant DL380a Gen11, Cray AI" },
      { stars: 5, note: "XE9680, XE8640 GPU servers" },
      { stars: 5, note: "SR685a V3, SR675 V3" },
      { stars: 4, note: "UCS X-Series GPU sleds" },
      { stars: 3, note: "Via partner appliances" },
      { stars: 5, note: "Industry leader for raw AI density" },
    ],
  },
  {
    label: "Management plane",
    type: "stars",
    cells: [
      { stars: 5, note: "HPE GreenLake / Compute Ops Mgr" },
      { stars: 5, note: "OpenManage, APEX, CloudIQ" },
      { stars: 4, note: "XClarity, ThinkAgile Mgr" },
      { stars: 5, note: "Intersight, cloud-native best-in-class" },
      { stars: 5, note: "Prism is the gold standard for HCI" },
      { stars: 3, note: "SuperCloud Composer, growing" },
    ],
  },
  {
    label: "Consumption / subscription",
    type: "stars",
    cells: [
      { stars: 5, note: "HPE GreenLake is the most mature" },
      { stars: 5, note: "Dell APEX strong second" },
      { stars: 4, note: "Lenovo TruScale" },
      { stars: 4, note: "Cisco Plus / UCS-X subscription" },
      { stars: 4, note: "Nutanix subscription native" },
      { stars: 3, note: "Limited" },
    ],
  },
  {
    label: "UAE service footprint",
    type: "stars",
    cells: [
      { stars: 5, note: "Largest in-country team" },
      { stars: 5, note: "Deep field bench, large spares depot" },
      { stars: 4, note: "Mature service via partners" },
      { stars: 5, note: "Direct UAE presence, TAC" },
      { stars: 4, note: "Strong via channel and direct" },
      { stars: 3, note: "Distributor-led service" },
    ],
  },
  {
    label: "Best suited for",
    type: "text",
    cells: [
      "Broadest portfolio with mature consumption model",
      "Largest portfolio breadth and VMware HCI estates",
      "Hypervisor-neutral HCI and rugged edge",
      "Cisco-standardised stacks and modern management plane",
      "HCI-first estates and post-Broadcom alternatives",
      "Specialist, HPC and AI-density builds",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "Most-shipped server line, most-mature consumption model, deepest UAE bench." },
      { recommended: true, text: "Broadest portfolio; default pick for VMware HCI estates with VxRail." },
      { recommended: true, text: "Best hypervisor neutrality; ThinkAgile covers every major hypervisor cleanly." },
      { recommended: true, text: "Best management plane; Intersight is cloud-native reference for converged compute." },
      { text: "HCI reference platform; strongest commercial alternative to VMware on AHV." },
      { text: "Specialist and AI-density leader; pick when the workload defines the chassis." },
    ],
  },
];

/* ───────── GARTNER-STYLE CAPABILITY SCORECARD ───────── */

const featureVendors = [
  "HPE",
  "Dell",
  "Lenovo",
  "Cisco UCS",
  "Nutanix",
];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "Server breadth and portfolio",
    cells: [
      { tier: "best", note: "ProLiant is the most-shipped server line globally" },
      { tier: "best", note: "PowerEdge breadth covers every workload" },
      { tier: "excellent", note: "ThinkSystem strong across density and edge" },
      { tier: "strong", note: "C-Series plus X-Series modular" },
      { tier: "good", note: "NX appliance line plus OEM" },
    ],
  },
  {
    label: "HCI maturity",
    cells: [
      { tier: "excellent", note: "Alletra dHCI plus SimpliVity" },
      { tier: "best", note: "VxRail is the reference VMware HCI" },
      { tier: "excellent", note: "ThinkAgile HX, MX, VX cover all hypervisors" },
      { tier: "strong", note: "HyperFlex roadmap in transition" },
      { tier: "best", note: "Nutanix is the reference HCI platform" },
    ],
  },
  {
    label: "AI / GPU readiness",
    cells: [
      { tier: "best", note: "DL380a Gen11 plus Cray AI line" },
      { tier: "best", note: "XE9680 platform leads GPU density" },
      { tier: "best", note: "SR685a V3 strong AI platform" },
      { tier: "excellent", note: "UCS X-Series GPU sleds" },
      { tier: "good", note: "GPU via partner appliances" },
    ],
  },
  {
    label: "Management plane",
    cells: [
      { tier: "excellent", note: "HPE GreenLake plus Compute Ops Mgr" },
      { tier: "excellent", note: "OpenManage plus APEX plus CloudIQ" },
      { tier: "strong", note: "XClarity capable but workmanlike" },
      { tier: "best", note: "Intersight is best-in-class cloud-native" },
      { tier: "best", note: "Prism is the gold standard for HCI ops" },
    ],
  },
  {
    label: "Hypervisor neutrality",
    cells: [
      { tier: "excellent", note: "Certified across vSphere, Hyper-V, AHV" },
      { tier: "excellent", note: "Wide certification breadth" },
      { tier: "excellent", note: "Certified across all four major hypervisors" },
      { tier: "strong", note: "Strongest on VMware, growing AHV story" },
      { tier: "best", note: "AHV is native; vSphere and Hyper-V supported" },
    ],
  },
  {
    label: "Edge / ROBO",
    cells: [
      { tier: "best", note: "Edgeline EL line is reference for edge" },
      { tier: "excellent", note: "PowerEdge XR line strong for edge" },
      { tier: "excellent", note: "ThinkSystem SE rugged edge" },
      { tier: "strong", note: "UCS C220 and X-Series edge variants" },
      { tier: "excellent", note: "Single-node edge cluster" },
    ],
  },
  {
    label: "Consumption / GreenLake-class",
    cells: [
      { tier: "best", note: "HPE GreenLake is the most mature" },
      { tier: "best", note: "Dell APEX strong second" },
      { tier: "excellent", note: "Lenovo TruScale credible" },
      { tier: "excellent", note: "Cisco Plus growing fast" },
      { tier: "excellent", note: "Nutanix subscription native" },
    ],
  },
  {
    label: "UAE service and SLA",
    cells: [
      { tier: "best", note: "Largest in-country bench" },
      { tier: "best", note: "Deep field engineering plus TAC" },
      { tier: "excellent", note: "Strong partner-led service" },
      { tier: "best", note: "Direct UAE presence with TAC" },
      { tier: "excellent", note: "Strong via direct plus channel" },
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
    title: "Discrete servers or HCI?",
    desc: "HCI wins when operational simplicity, growth in node-units, and converged storage all matter. Discrete servers still win for the largest databases and AI workloads, and where dedicated storage arrays already exist.",
  },
  {
    num: "02",
    title: "Which hypervisor in a post-Broadcom world?",
    desc: "VMware 2024 pricing changes have reopened the question for almost every UAE customer. Nutanix AHV is the strongest commercial alternative for HCI estates; Hyper-V remains free with Windows Server Datacenter; Proxmox and OpenShift Virtualization are credible for technically capable teams.",
  },
  {
    num: "03",
    title: "CapEx or consumption?",
    desc: "GreenLake (HPE), APEX (Dell), TruScale (Lenovo) and Cisco Plus are all genuinely competitive in 2026. Total five-year TCO is often slightly higher than outright purchase but predictable, refresh-inclusive and easier to budget.",
  },
  {
    num: "04",
    title: "Operational team capacity?",
    desc: "Nutanix Prism and Cisco Intersight materially reduce day-2 operations burden. For UAE IT teams without a dedicated virtualisation specialist, this lowers operational risk substantially.",
  },
  {
    num: "05",
    title: "What is the scale-out unit?",
    desc: "Two to four nodes for branch, six to twelve nodes for mid-market clusters, larger blocks for enterprise pods. Right-sizing the failure domain determines effective utilisation versus the N+1 capacity tax.",
  },
  {
    num: "06",
    title: "Are AI / GPU workloads in scope?",
    desc: "AI workloads at 30+ kW per rack drive both server choice (XE9680, DL380a Gen11, SR685a V3, Supermicro AI density) and data-centre cooling. The compute and data-centre conversations must run in parallel, not sequentially.",
  },
];

/* ───────── UAE SERVICE & COMMERCIAL NOTES ───────── */

const uaeNotes = [
  "Broadcom-era VMware pricing has reopened hypervisor selection across the UAE; Nutanix AHV, Hyper-V and Proxmox shortlists are now common.",
  "Local spares depots and four-hour mission-critical SLA matter more than brochure throughput for production estates.",
  "Sovereignty mandates for banking, government and healthcare drive on-prem compute even where cloud is technically capable.",
  "AI-class GPU servers have meaningful power and cooling implications; the data-centre conversation runs in parallel.",
  "HPE, Dell and Cisco all have direct UAE TAC presence; Lenovo and Nutanix operate strong partner-led models.",
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "Should we move off VMware after Broadcom?",
    answer:
      "Not automatically, but the question deserves a deliberate answer. For HCI estates, Nutanix AHV is the strongest commercial alternative. For Microsoft-aligned shops, Hyper-V plus Azure Stack HCI is credible. For technically capable teams, Proxmox or OpenShift Virtualization can deliver significant cost savings. The decision should follow workload portability, team capacity and licensing economics.",
  },
  {
    question: "Discrete servers or HCI for our next refresh?",
    answer:
      "If your current estate is more than 50 percent virtualised, growth is unit-of-node based, and your storage estate is also up for refresh, HCI is usually the right answer. If you run heavy databases, AI workloads, or large dedicated storage arrays that still have life, discrete servers remain the right call.",
  },
  {
    question: "Is GreenLake or APEX actually cheaper than CapEx?",
    answer:
      "Five-year TCO is typically within 5 to 10 percent of outright purchase. Subscription wins on cash-flow predictability, refresh-included economics and operational off-loading. CapEx wins on flat-out lowest five-year cost if you have the capital and the operational team.",
  },
  {
    question: "Which hypervisor for a brand-new mid-market deployment?",
    answer:
      "For most UAE mid-market customers in 2026, Nutanix Cloud Platform with AHV is the cleanest start. Operational simplicity, hypervisor included in licensing, strong service mesh, and good DR options. VMware vSphere remains the safe choice if Broadcom pricing is acceptable and team skills already exist.",
  },
  {
    question: "What is the typical refresh cycle?",
    answer:
      "Three to five years for servers (driven by performance-per-watt improvements, depreciation and warranty). HCI clusters typically refresh on a rolling node-by-node basis rather than as a single forklift event. Subscription models effectively externalise this decision.",
  },
  {
    question: "Is Artiflex IT tied to a single compute vendor?",
    answer:
      "No. We actively deliver HPE, Dell, Lenovo, Cisco UCS, Nutanix and Supermicro across UAE projects. Hypervisor recommendation (vSphere, Hyper-V, AHV, Proxmox, OpenShift Virtualization) is a separate decision and follows the assessment, not the hardware inventory.",
  },
  {
    question: "How do you handle AI / GPU server deployments in the UAE?",
    answer:
      "GPU servers drive power-per-rack from 6 to 8 kW into the 20 to 40 kW range. We design the compute and the data-centre power-and-cooling envelope together, not sequentially. Vendor choice (XE9680, DL380a Gen11, SR685a V3, Supermicro AI) is matched to the model size, training-versus-inference workload mix and NVLink topology.",
  },
  {
    question: "Can you handle server and virtualisation migrations?",
    answer:
      "Yes. P2V, V2V (vSphere to AHV, vSphere to Hyper-V, vSphere to Proxmox), HCI cluster expansion and full data-centre lift-and-shifts are routine engagements. Discovery uses RVTools, Lansweeper or Device42 before planning, with wave-based cutover and documented rollback at each stage.",
  },
];

/* ───────── HERO ───────── */

function ServersComputeHero() {
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
                <span className="font-medium text-[#28B5E1]">Servers, Compute & Virtualization</span>
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
            Servers, Compute &{" "}
            <span className="gradient-text">Virtualization</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Buyer's Guide, Vendor Matrix and Gartner-style Scorecard
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            A UAE buyer's guide for enterprise servers, hyperconverged infrastructure and the virtualisation layer above them. Honest comparisons across <span className="font-semibold text-white">HPE ProLiant / Alletra dHCI, Dell PowerEdge / VxRail, Lenovo ThinkSystem / ThinkAgile, Cisco UCS, Nutanix and Supermicro</span>, plus the hypervisor decision between VMware vSphere, Microsoft Hyper-V, Nutanix AHV and Proxmox.
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
              to="/blog/origin-servers-compute-virtualization"
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
              Get a Free Server &amp; Compute Assessment
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

export default function ServersComputeVirtualization() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Servers, Compute & Virtualization UAE | Buyer's Guide & Vendor Scorecard | Artiflex IT</title>
        <meta
          name="description"
          content="UAE buyer's guide for servers, hyperconverged infrastructure and virtualisation. Vendor matrix and Gartner-style scorecard across HPE, Dell, Lenovo, Cisco UCS, Nutanix, Supermicro and the post-Broadcom hypervisor decision."
        />
        <link rel="canonical" href="https://artiflexit.com/infrastructure/servers-compute-virtualization" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Artiflex IT",
            "url": "https://artiflexit.com/infrastructure/servers-compute-virtualization",
            "areaServed": [
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "City", "name": "Dubai" },
              { "@type": "City", "name": "Abu Dhabi" },
            ],
            "description": "Vendor-neutral UAE buyer's guide for servers, HCI and virtualisation across HPE, Dell, Lenovo, Cisco UCS, Nutanix and Supermicro.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Servers, Compute & Virtualization",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description": "UAE enterprise servers, HCI and hypervisor delivery. HPE, Dell, Lenovo, Cisco UCS, Nutanix and Supermicro across vSphere, Hyper-V, AHV and Proxmox.",
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
            "name": "Compute & Virtualization Vendors for UAE Buyers",
            "itemListElement": vendors.map((v, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <ServersComputeHero />

      {/* ───────── COMPUTE VENDORS WE DELIVER (HONEYCOMB) ───────── */}
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
              Compute{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Platforms
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The server, HCI and composable platforms we design, deploy and operate across UAE projects. Hypervisor choice is a separate decision and follows the assessment.
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
                layouts[computeVendorList.length] ??
                [Math.ceil(computeVendorList.length / 2), Math.floor(computeVendorList.length / 2)];
              const rows: typeof computeVendorList[] = [];
              let i = 0;
              sizes.forEach((s) => {
                rows.push(computeVendorList.slice(i, i + s));
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
            {computeVendorList.map((v) => (
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
              {computeVendorList.length} platforms
            </span>
            , picked by workload profile, scale-out unit and operational maturity.
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
              Before any server demo, walk through these questions. Most over-bought compute projects oversize the CPU and undersize the memory, or assume a hypervisor licensing model that does not survive the 2024 Broadcom changes to VMware pricing.
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
              <span className="gradient-text">Compute buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              Six platforms cover the overwhelming majority of UAE enterprise compute decisions. HPE, Dell and Lenovo lead in unit volume; Cisco UCS leads in Cisco-standardised stacks; Nutanix and Supermicro serve specific patterns.
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
              Detailed Comparison on Compute Vendors
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Strengths, blind spots and the buyer profile each vendor was built for. Hypervisor choice is increasingly a separate decision from hardware choice, including post-Broadcom VMware economics.
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
              <span className="font-semibold text-white">Artiflex IT delivers HPE, Dell, Lenovo, Cisco UCS, Nutanix and Supermicro</span> across UAE projects, with 14+ years of in-country deployments. <br />
              <span className="text-xs italic text-white sm:text-base">Hardware and hypervisor are two distinct decisions; we size both deliberately.</span>
            </p>
          </div>

          {/* Feature ratings */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Scorecard
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each vendor is rated across the capabilities that matter most for enterprise compute and virtualisation, using a standardised tier scale. A gold ★ marker denotes best-in-class performance.
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
              The right vendor for any environment falls out of a few honest questions. Walk through these before any vendor demo and the shortlist usually picks itself.
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
              What changes when you buy compute in the UAE
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Server and virtualisation decisions in the UAE carry specific commercial and operational considerations that change the recommendation versus a generic vendor proposal.
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
              14+ years of UAE compute delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when HPE wins, when Dell wins, when Lenovo or Cisco UCS or Nutanix or Supermicro wins, and when none of them is the right answer. Hypervisor choice is a separate, deliberate decision.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years of UAE compute delivery" },
              { value: "500+", label: "Projects delivered, GCC-wide" },
              { value: "6", label: "Compute vendors actively delivered" },
              { value: "4", label: "Hypervisors actively delivered" },
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
                  HPE ProLiant / Alletra dHCI, Dell PowerEdge / VxRail, Lenovo ThinkSystem / ThinkAgile, Cisco UCS, Nutanix and Supermicro across rack, blade, HCI and composable.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Hypervisor coverage
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  VMware vSphere, Microsoft Hyper-V (with Azure Stack HCI), Nutanix AHV and Proxmox VE. Post-Broadcom migration assessments included.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Coverage area
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  On-site across Dubai, Abu Dhabi and Sharjah. Remote across the UAE, Oman and Saudi Arabia. 24/7 managed-services bench for production estates.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Commercial model
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  CapEx, GreenLake / APEX / TruScale / Cisco Plus consumption, or fully managed. Engagement follows the assessment, not a vendor SKU.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#28B5E1] px-6 py-3 font-display text-sm font-semibold text-navy-deep transition-colors hover:bg-white sm:text-base"
            >
              Book a free compute assessment
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
            description="What UAE buyers ask us most about servers, HCI, the hypervisor decision and consumption pricing."
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
        title="Free Server and Compute Assessment"
        description="60-minute review of your existing compute estate, virtualisation posture, hypervisor licensing exposure and refresh roadmap. We will identify the highest-impact upgrades and propose a prioritised plan including post-Broadcom hypervisor scenarios."
        primaryButton={{ text: "Book Assessment", action: "modal" }}
      />
    </>
  );
}
