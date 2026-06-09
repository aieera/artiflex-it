import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import DeliveryModel from "@/components/sections/DeliveryModel";

/* ───────── STORAGE VENDORS (HONEYCOMB) ───────── */

const storageVendorList = [
  { slug: "hpe-alletra", name: "HPE Alletra MP", logo: "/logos/Hewlett.svg" },
  { slug: "pure-storage", name: "Pure Storage", logo: "/logos/PureStorage.png" },
  { slug: "netapp", name: "NetApp", logo: "/logos/NetApp.png" },
  { slug: "dell-powerstore", name: "Dell PowerStore", logo: "/logos/Dell_Technologies.webp" },
  { slug: "ibm-flashsystem", name: "IBM FlashSystem", logo: "/logos/IBM-Security.png" },
  { slug: "cloudian", name: "Cloudian", logo: "/logos/Cloudian.webp" },
];

/* ───────── BUYER'S GUIDE, SELECTION FRAMEWORK ───────── */

const selectionFramework = [
  {
    step: "1",
    question: "What is the storage for?",
    capture: "Production transactional databases, virtualisation, file shares / VDI, backup targets / archive / AI data lakes, or specific workload (SAP HANA, Oracle, Splunk, AI / GPU)",
    why: "Each workload has a natural storage type and protocol. Putting a database on NAS, or backup data on tier-1 all-flash, wastes money and creates operational pain.",
  },
  {
    step: "2",
    question: "What is the usable capacity needed plus 3-5 year growth?",
    capture: "Raw vs usable vs effective (after dedup and compression), today plus three-year curve",
    why: "Storage is sold raw but consumed effective. A 100 TB raw array with 4:1 effective data reduction delivers 400 TB usable for typical workloads.",
  },
  {
    step: "3",
    question: "What performance: IOPS, latency, throughput?",
    capture: "Random IOPS (databases, VDI), sequential throughput (media, analytics, AI), latency SLA (sub-millisecond for tier-1 OLTP)",
    why: "Performance drives media (NVMe vs SAS-SSD vs HDD), controller class and network choice (FC vs iSCSI vs RoCE vs NVMe-oF).",
  },
  {
    step: "4",
    question: "Availability target?",
    capture: "RPO / RTO, HA, geo-replication, active-active stretch, immutability for ransomware resilience",
    why: "Availability drives architecture (synchronous replication, metro-cluster, snapshot frequency). Cost scales aggressively with availability.",
  },
  {
    step: "5",
    question: "Workload protocol preference?",
    capture: "Block (FC / iSCSI / NVMe-oF), File (NFS, SMB 3.x), Object (S3 API), or unified multi-protocol",
    why: "Decides storage class. Unified arrays (NetApp ONTAP, HPE Alletra MP) deliver all three from one platform; specialists optimise each individually.",
  },
  {
    step: "6",
    question: "CapEx vs OpEx appetite?",
    capture: "Outright purchase, perpetual licence plus maintenance, subscription / Evergreen, consumption-based (HPE GreenLake, Dell APEX, NetApp Keystone, Pure Evergreen//One)",
    why: "Subscription / consumption is genuinely competitive now: predictable cost, hardware refresh included, no painful forklift upgrade events.",
  },
  {
    step: "7",
    question: "Existing investment and standardisation?",
    capture: "Existing vendor controllers / fabric / management plane, hypervisor (VMware / Hyper-V / Nutanix AHV / Proxmox), Microsoft / Cisco / HPE alignment elsewhere",
    why: "Operational simplicity often wins over modest feature gaps. A second vendor doubles operational surface area.",
  },
];

/* ───────── SELECTION CRITERIA CHECKLIST ───────── */

const checklistGroups = [
  {
    title: "Technical fit",
    items: [
      "Protocol support (FC / iSCSI / NVMe-oF / NFS / SMB / S3)",
      "Media (NVMe / SAS-SSD / NL-SAS / QLC)",
      "Effective data reduction (dedup plus compression)",
      "Snapshot / clone / replication features",
      "Multi-site replication topology",
      "Encryption (at-rest, in-flight, FIPS)",
      "Immutable snapshots / ransomware resilience",
    ],
  },
  {
    title: "Operational fit",
    items: [
      "Single-pane management for multi-array / multi-site",
      "AIOps / predictive analytics (CloudIQ, DataIQ, Pure1, InfoSight)",
      "Non-disruptive upgrades / refresh",
      "Hypervisor and cloud integration (VMware vVols, Kubernetes CSI)",
      "Backup software integration (Veeam, Commvault)",
      "QoS / multi-tenancy",
      "Mature REST API / IaC",
    ],
  },
  {
    title: "Commercial fit",
    items: [
      "CapEx vs subscription (Evergreen, GreenLake, APEX, Keystone)",
      "Cost per usable TB (after data reduction)",
      "Software-assurance / support tier",
      "Controller / chassis refresh model",
      "Five-year TCO including media refresh",
      "Effective data-reduction guarantee",
    ],
  },
  {
    title: "Service fit",
    items: [
      "UAE in-country service team",
      "4-hr / 2-hr critical SLA across all 7 Emirates",
      "Spare parts depot in-country",
      "Predictive part replacement (call-home AIOps)",
      "UAE-region cloud (for subscription platforms)",
      "Manufacturer professional services depth",
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
    slug: "hpe-alletra",
    name: "HPE Alletra MP",
    best: "Best Overall Value (Recommended)",
    strength: "Disaggregated MP, evolution of Nimble plus Primera plus 3PAR DNA. Unified block, file and object on one platform with HPE InfoSight (industry-leading AIOps) and the broadest UAE service bench. End-to-end NVMe and NVMe-oF, immutable snapshots plus Cyber Resilience Vault. HPE GreenLake consumption is the most-mature.",
    watch: "Effective data-reduction ratios are slightly behind Pure on highly-redundant datasets; the InfoSight advantage matters more in operational maturity than headline IOPS.",
    logo: "/logos/Hewlett.svg",
  },
  {
    slug: "pure-storage",
    name: "Pure Storage",
    best: "Best Data Reduction (Recommended)",
    strength: "Built-from-scratch all-flash 2009; pioneered Evergreen subscription. Industry-best data reduction (~5:1 typical, guaranteed program). Evergreen//Forever: controllers swapped non-disruptively every 3 years. Pure1 AIOps, SafeMode immutable snapshots, the simplest day-to-day storage to operate.",
    watch: "Premium positioning, typically 15-25% above HPE Alletra MP for equivalent capacity. Best ROI on high data-reduction workloads (VDI, databases, modern apps).",
    logo: "/logos/PureStorage.png",
  },
  {
    slug: "netapp",
    name: "NetApp ONTAP",
    best: "Best Hybrid-Cloud Data Fabric (Recommended)",
    strength: "ONTAP 30+ year platform. Same data plane on-prem, AWS FSx for ONTAP, Azure NetApp Files and Google Cloud NetApp Volumes. SnapMirror replication, SnapLock immutability, ARP / AI ransomware detection. AFF C-series brings QLC density at attractive economics; ONTAP One bundles every feature.",
    watch: "Feature breadth is also operational breadth, teams new to ONTAP need ramp-up. Premium positioning vs commodity scale-up NAS.",
    logo: "/logos/NetApp.png",
  },
  {
    slug: "dell-powerstore",
    name: "Dell PowerStore / PowerMax",
    best: "Broadest Portfolio (Recommended)",
    strength: "PowerStore for mid-range unified block plus file, PowerMax for tier-1 mainframe-class. Dell APEX subscription, CloudIQ AIOps. AppsON lets workloads run on the array itself. Strong UAE channel through Dell direct and partners.",
    watch: "Two product lines means two operational models; PowerStore and PowerMax don't share a unified management plane the way HPE Alletra MP unifies block / file / object.",
    logo: "/logos/Dell_Technologies.webp",
  },
  {
    slug: "ibm-flashsystem",
    name: "IBM FlashSystem",
    best: "Best for IBM-Aligned Estates",
    strength: "FlashCore Modules with hardware-accelerated data reduction (FCM3 compression in the SSD controller, no host CPU cost). Safeguarded Copy for ransomware. IBM mainframe heritage. Strong fit for IBM-aligned customers and AIX / Power workloads. Spectrum Virtualize integrates third-party storage.",
    watch: "UAE installed base smaller than HPE / Dell / Pure. Best fit for IBM-aligned organisations or specific FCM3 data-reduction requirements.",
    logo: "/logos/IBM-Security.png",
  },
  {
    slug: "cloudian",
    name: "Cloudian HyperStore",
    best: "Best Object Backup Target",
    strength: "Pure-play object storage specialist with industry-leading S3 API completeness. Object Lock plus WORM compliance. The default on-prem S3 backup target for many Veeam shops. SDS or appliance deployment. Strong commercial economics on $/usable TB.",
    watch: "UAE service via partners rather than direct. Best fit when object is the primary use case (backup target, archive) rather than as part of a broader storage platform.",
    logo: "/logos/Cloudian.webp",
  },
];

/* ───────── VENDOR MATRIX (BUYER'S MATRIX) ───────── */

const matrixVendors = [
  { name: "HPE Alletra MP", recommended: true, rank: "#1" },
  { name: "Pure Storage", recommended: true },
  { name: "NetApp ONTAP", recommended: true },
  { name: "Dell PowerStore", recommended: true },
  { name: "IBM FlashSystem" },
  { name: "Cloudian" },
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
      "Disaggregated MP, evolution of Nimble, Primera and 3PAR DNA",
      "Built-from-scratch all-flash 2009; pioneered Evergreen",
      "ONTAP 30+ year platform; canonical hybrid-cloud data fabric",
      "PowerStore 2020 plus EMC PowerMax heritage",
      "FlashCore Modules, mainframe heritage",
      "2011 pure-play object storage specialist",
    ],
  },
  {
    label: "NVMe / NVMe-oF performance",
    type: "stars",
    cells: [
      { stars: 5, note: "End-to-end NVMe plus NVMe-oF" },
      { stars: 5, note: "NVMe-native, NVMe-oF/TCP" },
      { stars: 5, note: "NVMe-oF mature" },
      { stars: 5, note: "NVMe end-to-end" },
      { stars: 5, note: "NVMe-oF plus FCM3" },
      { stars: 4, note: "S3 over IP, scale-out" },
    ],
  },
  {
    label: "Data reduction (effective)",
    type: "stars",
    cells: [
      { stars: 4, note: "Always-on dedup plus compression, ~4:1 typical" },
      { stars: 5, note: "Industry-best ~5:1, guarantee program" },
      { stars: 4, note: "~4:1 typical, mature dedup" },
      { stars: 4, note: "Always-on, ~4:1 typical" },
      { stars: 4, note: "Hardware-accelerated in FCM3" },
      { stars: 4, note: "Erasure-coded efficiency" },
    ],
  },
  {
    label: "AIOps / predictive analytics",
    type: "stars",
    cells: [
      { stars: 5, note: "HPE InfoSight (industry-leading)" },
      { stars: 5, note: "Pure1 mature and polished" },
      { stars: 4, note: "Active IQ unified manager" },
      { stars: 5, note: "CloudIQ multi-product" },
      { stars: 4, note: "IBM Storage Insights" },
      { stars: 4, note: "HyperIQ" },
    ],
  },
  {
    label: "Subscription / consumption",
    type: "stars",
    cells: [
      { stars: 5, note: "HPE GreenLake, mature native" },
      { stars: 5, note: "Evergreen//One pioneered the model" },
      { stars: 4, note: "NetApp Keystone" },
      { stars: 4, note: "Dell APEX" },
      { stars: 4, note: "IBM Storage as a Service" },
      { stars: 3, note: "Partner-led licensing" },
    ],
  },
  {
    label: "Ransomware resilience / immutability",
    type: "stars",
    cells: [
      { stars: 5, note: "Immutable snapshots plus Cyber Resilience Vault" },
      { stars: 5, note: "SafeMode immutable, mature" },
      { stars: 5, note: "SnapLock plus ARP/AI detection" },
      { stars: 4, note: "Secure snapshots plus DD Vault" },
      { stars: 5, note: "Safeguarded Copy" },
      { stars: 5, note: "S3 Object Lock plus WORM compliance" },
    ],
  },
  {
    label: "UAE service footprint",
    type: "stars",
    cells: [
      { stars: 5, note: "Largest UAE field-engineering bench" },
      { stars: 4, note: "Growing direct plus partner" },
      { stars: 5, note: "Broad direct plus partner" },
      { stars: 5, note: "Broad UAE direct plus partner" },
      { stars: 4, note: "Direct plus select partners" },
      { stars: 3, note: "Partner-led" },
    ],
  },
  {
    label: "Best suited for",
    type: "text",
    cells: [
      "Mid-market through enterprise wanting one strategic storage partner",
      "Data-reduction-priority workloads (databases, VDI, modern apps)",
      "Hybrid-cloud strategies and unified file plus block requirements",
      "Dell-aligned enterprise with broad portfolio needs",
      "IBM AIX / Power workloads and FCM3-driven economics",
      "Pure-play object backup target and S3 archive workloads",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "Best overall value; unified block + file + object with InfoSight AIOps and the broadest UAE service bench." },
      { recommended: true, text: "Industry-best data reduction with guarantee program; Evergreen//Forever non-disruptive refresh and simplest day-to-day operations." },
      { recommended: true, text: "Hybrid-cloud data fabric reference; same ONTAP data plane on-prem and on every hyperscaler." },
      { recommended: true, text: "Broadest portfolio across mid-range unified and tier-1 mainframe-class with PowerMax." },
      { text: "Hardware-accelerated FCM3 data reduction; reference for AIX / Power workloads and IBM-aligned estates." },
      { text: "Pure-play object specialist; default on-prem S3 backup target for Veeam estates." },
    ],
  },
];

/* ───────── GARTNER-STYLE CAPABILITY SCORECARD ───────── */

const featureVendors = [
  "HPE Alletra MP",
  "Pure Storage",
  "NetApp ONTAP",
  "Dell PowerStore",
  "IBM FlashSystem",
  "Cloudian",
];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "NVMe / NVMe-oF performance",
    cells: [
      { tier: "best", note: "Disaggregated NVMe + NVMe-oF/TCP" },
      { tier: "excellent", note: "NVMe-native architecture" },
      { tier: "excellent", note: "NVMe-oF mature" },
      { tier: "excellent", note: "End-to-end NVMe" },
      { tier: "excellent", note: "NVMe-oF plus FCM3" },
      { tier: "strong", note: "S3 over IP scale-out" },
    ],
  },
  {
    label: "Data reduction (effective)",
    cells: [
      { tier: "excellent", note: "Always-on, ~4:1 typical" },
      { tier: "best", note: "~5:1 typical, guarantee program" },
      { tier: "excellent", note: "Mature ONTAP dedup" },
      { tier: "excellent", note: "Always-on, ~4:1 typical" },
      { tier: "excellent", note: "Hardware-accel in FCM3" },
      { tier: "strong", note: "Erasure-coded efficiency" },
    ],
  },
  {
    label: "AIOps / predictive analytics",
    cells: [
      { tier: "best", note: "HPE InfoSight prevents 86% of issues" },
      { tier: "excellent", note: "Pure1 mature and polished" },
      { tier: "excellent", note: "Active IQ unified manager" },
      { tier: "excellent", note: "CloudIQ multi-product" },
      { tier: "excellent", note: "Storage Insights" },
      { tier: "strong", note: "HyperIQ" },
    ],
  },
  {
    label: "Subscription / consumption model",
    cells: [
      { tier: "best", note: "HPE GreenLake, native consumption" },
      { tier: "best", note: "Evergreen//One pioneered the model" },
      { tier: "excellent", note: "NetApp Keystone" },
      { tier: "excellent", note: "Dell APEX" },
      { tier: "excellent", note: "IBM Storage as a Service" },
      { tier: "strong", note: "Partner-led licensing" },
    ],
  },
  {
    label: "Ransomware resilience / immutability",
    cells: [
      { tier: "excellent", note: "Immutable snapshots plus Cyber Vault" },
      { tier: "best", note: "SafeMode immutable, mature" },
      { tier: "best", note: "SnapLock plus ARP/AI detection" },
      { tier: "excellent", note: "Secure snapshots plus DD Vault" },
      { tier: "excellent", note: "Safeguarded Copy" },
      { tier: "best", note: "S3 Object Lock plus WORM" },
    ],
  },
  {
    label: "Hypervisor integration (vVols / VAAI / CSI)",
    cells: [
      { tier: "excellent", note: "vVols, VAAI, CSI" },
      { tier: "excellent", note: "vVols, VAAI, CSI" },
      { tier: "excellent", note: "vVols, VAAI, Trident CSI" },
      { tier: "excellent", note: "vVols, VAAI, CSI" },
      { tier: "excellent", note: "vVols, VAAI, Block CSI" },
      { tier: "strong", note: "Backup software certifications" },
    ],
  },
  {
    label: "UAE service depth",
    cells: [
      { tier: "best", note: "Largest UAE bench, 7-Emirate 4-hr" },
      { tier: "excellent", note: "Growing direct plus partner" },
      { tier: "excellent", note: "Direct plus extensive partner" },
      { tier: "best", note: "Dell direct plus partner network" },
      { tier: "excellent", note: "Direct plus select partners" },
      { tier: "strong", note: "Partner-led service" },
    ],
  },
  {
    label: "Total cost of ownership (5-yr)",
    cells: [
      { tier: "best", note: "Most-competitive overall TCO" },
      { tier: "excellent", note: "Premium but Evergreen ROI" },
      { tier: "excellent", note: "ONTAP One bundling" },
      { tier: "excellent", note: "Competitive with APEX" },
      { tier: "excellent", note: "FCM3 reduces effective $/TB" },
      { tier: "best", note: "Pure-play object economics" },
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
    title: "What workload: block, file, object, or all three?",
    desc: "Block-dominant (databases, VM datastores), SAN shortlist (HPE Alletra MP Block, Pure FlashArray, Dell PowerStore). File-dominant (shares, VDI profiles, unstructured), NAS shortlist (NetApp ONTAP, HPE Alletra MP File, Dell PowerScale, Qumulo). Object-dominant (backup target, archive, AI data), Object shortlist (HPE Scality, Cloudian, Dell ECS). All three on one platform: unified shortlist (HPE Alletra MP, NetApp ONTAP, Dell PowerStore + ECS).",
  },
  {
    num: "02",
    title: "What is your standardisation appetite?",
    desc: "Multi-vendor best-of-breed: pick the specialist per workload. Single-vendor strategic: HPE Alletra MP spans block + file + object with one management plane. Hybrid-cloud data fabric requirement: NetApp ONTAP runs on-prem and on every hyperscaler.",
  },
  {
    num: "03",
    title: "CapEx or consumption?",
    desc: "Traditional CapEx: all vendors compete on $/TB. Consumption / OpEx: HPE GreenLake and Pure Evergreen//One are the most mature; Dell APEX and NetApp Keystone are credible alternatives.",
  },
  {
    num: "04",
    title: "What is your data-reduction profile?",
    desc: "High dedup potential (VDI, databases): Pure FlashArray's guarantee program is genuinely valuable. Variable or low dedup: focus on raw $/TB and operational fit rather than effective-ratio promises. Always run a real data-reduction assessment against your actual workload, not the vendor's benchmark slides.",
  },
  {
    num: "05",
    title: "On-prem only, hybrid, or cloud-native?",
    desc: "Pure on-prem for control and lowest latency; hybrid with NetApp ONTAP for cloud-tier data fabric; cloud-native for elastic burst and AI training. Modern storage platforms increasingly span on-prem plus cloud with the same data plane.",
  },
  {
    num: "06",
    title: "Is AI / ML training data a primary workload?",
    desc: "Pure FlashBlade is NVIDIA DGX BasePOD certified; Qumulo is cloud-native scale-out for AI; Dell PowerScale F-series is the reference for PB-class unstructured. AI workloads change the storage decision materially, plan power and cooling alongside.",
  },
];

/* ───────── UAE SERVICE & COMMERCIAL NOTES ───────── */

const uaeNotes = [
  "Most UAE customers deploy storage in Tier III data centres; for on-site server-room storage, validate UPS, cooling and power circuits before deployment.",
  "Regulated verticals (banks via CBUAE, healthcare via DHA / SEHA / ADHA, government) must keep production data in-country; hyperscaler regions (UAE North / Central) are now widely accepted but verify against your specific regulator.",
  "HPE, Dell and NetApp have the largest UAE field-engineering benches; Pure has strong direct plus partner presence; Cloudian / Qumulo / Hitachi are more partner-led.",
  "FC vs IP storage networking: most UAE enterprise still runs Fibre Channel for tier-1 block; NVMe-oF (over TCP or RoCE) is emerging for new builds.",
  "Stock-SKU mid-range arrays 4-8 weeks; custom configurations 8-14 weeks; consumption-model deployments faster (4-6 weeks) since hardware is pre-staged.",
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "HPE Alletra MP, Pure FlashArray, or NetApp AFF: which should I pick?",
    answer:
      "All three are tier-1 leaders. HPE Alletra MP wins on broadest UAE service, unified block + file + object on one platform, and InfoSight AIOps. Pure FlashArray wins on data-reduction efficiency, simplest day-to-day operations, and the Evergreen no-forklift refresh model. NetApp AFF / ASA wins on hybrid-cloud data fabric (same data plane on-prem plus cloud) and file-feature depth.",
  },
  {
    question: "Do I really need separate block, file and object storage?",
    answer:
      "For SMB and mid-market, increasingly no. Unified platforms (HPE Alletra MP, NetApp ONTAP, Dell PowerStore plus ECS) deliver multiple storage types from one management plane and significantly reduce operational overhead. For enterprise with specialist workloads (high-performance AI, PB+ unstructured, hyperscale object) the specialist-per-workload approach still wins on performance and economics.",
  },
  {
    question: "Is object storage just for backups?",
    answer:
      "No, but backup target is the most common UAE use case. Object also serves archive / long-term retention, log retention (Splunk, ELK), video evidence retention (police, surveillance), AI / ML data lakes, cloud-native applications and content distribution. S3 API has become a de-facto application storage tier.",
  },
  {
    question: "Should I move to consumption / subscription storage?",
    answer:
      "For most mid-market through enterprise customers, yes, the economics now favour consumption. HPE GreenLake and Pure Evergreen//One are the most mature; Dell APEX and NetApp Keystone are credible alternatives. Consumption eliminates the painful 4-5 year forklift refresh event. CapEx still wins on TCO for very-stable, highly-utilised workloads with no growth uncertainty.",
  },
  {
    question: "How important is data reduction?",
    answer:
      "For most workloads, very. Modern enterprise storage routinely delivers 3:1 to 5:1 effective ratios, which materially changes $/usable TB economics. Pure FlashArray typically wins on data-reduction efficiency, with a guarantee program that adds capacity at no cost if you don't achieve the agreed ratio. Always validate data reduction against your actual workload during proof-of-concept.",
  },
  {
    question: "FC, iSCSI, or NVMe-oF for block?",
    answer:
      "FC remains the most-deployed UAE tier-1 block fabric, proven, dedicated, performance-predictable. NVMe-oF (over TCP or RoCE) is emerging for new builds, lower latency, runs over existing IP infrastructure with proper QoS. iSCSI remains for SMB / mid-market on commodity Ethernet. For new tier-1 builds with NVMe-native arrays, NVMe-oF over RoCE or TCP is increasingly the right call.",
  },
  {
    question: "Do I need immutable snapshots / Object Lock?",
    answer:
      "Yes, for any production storage. Modern ransomware routinely targets backup chains and storage admin credentials. Immutable snapshots (SnapLock, SafeMode, Safeguarded Copy, Cyber Resilience Vault) and Object Lock for object storage are non-negotiable in 2026. Configure immutability with retention longer than your typical detect-to-respond window (typically 30+ days).",
  },
  {
    question: "Is Artiflex IT tied to a single storage vendor?",
    answer:
      "No. We deliver HPE Alletra MP, Pure Storage, NetApp ONTAP, Dell PowerStore / PowerScale / ECS, IBM FlashSystem, Hitachi VSP, Qumulo, Cloudian and MinIO across UAE projects. Vendor recommendation follows the workload-driven sizing, not the inventory, with always a 72-hour real-workload telemetry assessment before quoting.",
  },
];

/* ───────── HERO ───────── */

function StorageHero() {
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
                <span className="font-medium text-[#28B5E1]">Storage Solutions</span>
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
            Storage{" "}
            <span className="gradient-text">Solutions</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Buyer's Guide, Vendor Matrix and Gartner-style Scorecard
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            A UAE buyer's guide for enterprise storage: SAN block, NAS file and object storage. Honest comparisons across <span className="font-semibold text-white">HPE Alletra MP, Pure Storage, NetApp, Dell PowerStore / PowerScale / ECS, IBM FlashSystem, Hitachi VSP, Qumulo, Cloudian and MinIO</span>, with a detailed Gartner-style scorecard.
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
              to="/blog/origin-storage-solutions"
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
              Get a Free Storage Assessment
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

export default function StorageSolutions() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Storage Solutions UAE | SAN, NAS & Object Storage Buyer's Guide | Artiflex IT</title>
        <meta
          name="description"
          content="UAE buyer's guide for enterprise storage. SAN block, NAS file and object storage with vendor matrix and Gartner-style scorecard across HPE Alletra MP, Pure Storage, NetApp, Dell, IBM and Cloudian."
        />
        <link rel="canonical" href="https://artiflexit.com/infrastructure/storage-solutions" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Artiflex IT",
            "url": "https://artiflexit.com/infrastructure/storage-solutions",
            "areaServed": [
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "City", "name": "Dubai" },
              { "@type": "City", "name": "Abu Dhabi" },
            ],
            "description": "Vendor-neutral UAE buyer's guide for enterprise SAN, NAS and object storage across HPE, Pure, NetApp, Dell, IBM and Cloudian.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Enterprise Storage Solutions",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description": "UAE SAN, NAS and object storage delivery: HPE Alletra MP, Pure Storage, NetApp ONTAP, Dell PowerStore / PowerScale / ECS, IBM FlashSystem and Cloudian. Workload-driven sizing and ransomware-resilient design.",
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
            "name": "Enterprise Storage Vendors for UAE Buyers",
            "itemListElement": vendors.map((v, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <StorageHero />

      {/* ───────── STORAGE VENDORS WE DELIVER (HONEYCOMB) ───────── */}
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
              Storage{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Platforms
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The SAN, NAS and object storage platforms we design, deploy and operate across UAE projects. Block, file and object choices follow your workload, scale and ransomware-resilience posture.
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
                layouts[storageVendorList.length] ??
                [Math.ceil(storageVendorList.length / 2), Math.floor(storageVendorList.length / 2)];
              const rows: typeof storageVendorList[] = [];
              let i = 0;
              sizes.forEach((s) => {
                rows.push(storageVendorList.slice(i, i + s));
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
            {storageVendorList.map((v) => (
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
              {storageVendorList.length} platforms
            </span>
            , picked by workload, scale and data-reduction profile.
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
              Before any vendor demo or proposal, walk through these questions. Most failed storage procurements in UAE fail here: the customer asks for "an array" and the vendor sizes to their preferred SKU instead of the actual workload, retention, performance and DR profile.
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
              <span className="gradient-text">Storage buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              Six vendors cover the majority of UAE enterprise storage. Each leads in some segments; the right pick follows your workload, data-reduction profile, existing fabric and operational model.
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
              Detailed Comparison on Storage Vendors
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
              <span className="font-semibold text-white">Artiflex IT delivers HPE Alletra MP, Pure Storage, NetApp, Dell PowerStore / PowerScale / ECS, IBM FlashSystem and Cloudian</span> across UAE projects. <br />
              <span className="text-xs italic text-white sm:text-base">Workload-driven sizing comes first; vendor recommendation follows the assessment.</span>
            </p>
          </div>

          {/* Feature ratings */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Scorecard
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each vendor is rated across the capabilities that matter most for enterprise storage, using a standardised tier scale. A gold ★ marker denotes best-in-class performance.
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
              Procurement decisions get cleaner when the questions are direct. Walk through these and the vendor shortlist usually falls out by itself.
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
              What changes when you buy storage in the UAE
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              UAE storage projects carry specific climate, regulatory and service considerations that change the recommendation versus a generic vendor proposal.
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
              14+ years of UAE storage delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when HPE wins, when Pure wins, when NetApp, Dell, IBM or Cloudian wins, and when none of them is the right answer. Always a 72-hour real-workload telemetry assessment before quoting.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years of UAE storage delivery" },
              { value: "500+", label: "Projects delivered, GCC-wide" },
              { value: "6", label: "Storage vendors actively delivered" },
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
                  HPE Alletra MP, Pure Storage, NetApp ONTAP, Dell PowerStore / PowerScale / ECS, IBM FlashSystem, Hitachi VSP, Qumulo, Cloudian and MinIO across block, file and object.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Compliance frameworks
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  NESA, UAE PDPL, CBUAE, DHA / SEHA / ADHA, ISO 27001 and ADGM-aligned designs with documented immutability and ransomware-resilient architecture.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Coverage area
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  On-site across Dubai, Abu Dhabi and Sharjah. Remote across the UAE, Oman and Saudi Arabia. 24/7 storage operations for managed customers.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Engagement model
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  CapEx, subscription (HPE GreenLake, Pure Evergreen, Dell APEX, NetApp Keystone) or fully managed. Engagement follows the workload-driven sizing, not a vendor SKU.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#28B5E1] px-6 py-3 font-display text-sm font-semibold text-navy-deep transition-colors hover:bg-white sm:text-base"
            >
              Book a free storage assessment
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
            description="What UAE buyers ask us most about SAN, NAS and object storage, data reduction and consumption pricing."
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
        title="Free Storage Assessment"
        description="60-minute review of your current storage estate: capacity, performance, data-reduction profile and refresh roadmap. We will identify the highest-impact upgrades and propose a prioritised plan aligned to your workload mix and ransomware-resilience posture."
        primaryButton={{ text: "Book Assessment", action: "modal" }}
      />
    </>
  );
}
