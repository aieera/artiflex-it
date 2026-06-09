import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import DeliveryModel from "@/components/sections/DeliveryModel";

/* ───────── PRIVATE CLOUD VENDORS (HONEYCOMB) ───────── */

const privateCloudVendorList = [
  { slug: "vmware-cloud-foundation", name: "VMware Cloud Foundation", logo: "/logos/vmware.svg" },
  { slug: "nutanix", name: "Nutanix Cloud Platform", logo: "/logos/Nutanix.svg" },
  { slug: "azure-stack-hci", name: "Azure Stack HCI", logo: "/logos/Microsoft_Azure.svg" },
  { slug: "openshift", name: "Red Hat OpenShift", logo: "/logos/RedHatOpenShift.png" },
  { slug: "dell-apex", name: "Dell APEX", logo: "/logos/Dell_Technologies.webp" },
  { slug: "hpe-greenlake", name: "HPE GreenLake", logo: "/logos/HPEGreenLake.webp" },
];

/* ───────── BUYER'S GUIDE, SELECTION FRAMEWORK ───────── */

const selectionFramework = [
  {
    step: "1",
    question: "What is the private cloud for?",
    capture: "Sovereign workloads, latency-sensitive applications, AI / GPU training and inferencing, dev / test and CI / CD, virtual desktop, or regulated industry workloads",
    why: "Each profile maps to natural platform strengths and reference architectures.",
  },
  {
    step: "2",
    question: "Workload type?",
    capture: "VM-heavy traditional applications, container-native modern apps, both, or mainframe-adjacent",
    why: "VMware and Nutanix lead VM-heavy estates; OpenShift and Tanzu lead container-native; Azure Stack HCI sits in the middle.",
  },
  {
    step: "3",
    question: "Existing hypervisor and licensing?",
    capture: "VMware vSphere with current SnS, Hyper-V on Windows Server Datacenter, Nutanix AHV, Red Hat OpenShift, or Proxmox",
    why: "The 2024 Broadcom changes reopened hypervisor selection across the UAE; this drives much of the platform conversation.",
  },
  {
    step: "4",
    question: "Hardware approach?",
    capture: "Reference HCI nodes (Nutanix, VxRail), composable infrastructure (Synergy, UCS-X), or build your own",
    why: "Reference architectures reduce risk; build-your-own gives flexibility at operational cost.",
  },
  {
    step: "5",
    question: "Operating model?",
    capture: "Outright purchase plus operate, consumption (GreenLake / APEX), or fully managed by partner",
    why: "Subscription private cloud is now the dominant model for new builds; managed private cloud removes most operational burden.",
  },
  {
    step: "6",
    question: "Integration with public cloud?",
    capture: "Pure private, hybrid with public DR, hybrid with public burst, or sovereign with public for non-sensitive",
    why: "Modern private cloud platforms (Cloud Foundation, Nutanix Cloud Clusters, Azure Stack) extend natively to public clouds.",
  },
  {
    step: "7",
    question: "Compliance and sovereignty?",
    capture: "UAE PDPL, NESA, CBUAE, ADHICS, government / classified, or sector-specific frameworks",
    why: "Sovereignty drives platform and hardware choice; not all reference architectures map to all frameworks.",
  },
];

/* ───────── SELECTION CRITERIA CHECKLIST ───────── */

const checklistGroups = [
  {
    title: "Technical fit",
    items: [
      "Hypervisor / container support",
      "Software-defined storage",
      "Software-defined networking",
      "Container platform integration",
      "AI / GPU support",
      "Hybrid public-cloud extension",
    ],
  },
  {
    title: "Operational fit",
    items: [
      "Single-pane management",
      "Lifecycle management (LCM)",
      "AIOps and recommendations",
      "Self-service portal",
      "Multi-tenancy",
    ],
  },
  {
    title: "Commercial fit",
    items: [
      "Subscription / consumption model",
      "Node-based scaling economics",
      "Per-VM vs per-core licensing",
      "Five-year TCO including refresh",
    ],
  },
  {
    title: "Service fit",
    items: [
      "UAE in-country professional services",
      "Managed-service options",
      "Reference architectures",
      "Partner ecosystem depth",
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
    slug: "vmware-cloud-foundation",
    name: "VMware Cloud Foundation",
    best: "VMware-Deep Estates (Recommended)",
    strength: "VMware 1998; Cloud Foundation since 2017. ESXi plus Tanzu Kubernetes, vSAN reference SDS, NSX reference SDN. Private AI Foundation with NVIDIA. VMware Cloud on AWS / Azure / Google for hybrid. Post-Broadcom VCF subscription. Large UAE Broadcom partner network.",
    watch: "Post-Broadcom pricing has reopened the hypervisor question; teams without VMware depth should weigh Nutanix or Azure Stack HCI.",
    logo: "/logos/vmware.svg",
  },
  {
    slug: "nutanix",
    name: "Nutanix Cloud Platform",
    best: "Best HCI Operations (Recommended)",
    strength: "Nutanix 2009; pioneered hyperconverged infrastructure. AHV included (no extra hypervisor licence), Prism is the gold standard for HCI operations. Nutanix Cloud Clusters (NC2) on AWS / Azure for hybrid. Nutanix Enterprise AI (GPT-in-a-Box). Portable subscription model.",
    watch: "Hardware comes via OEM (Dell, Lenovo, HPE) or NX appliances; GPU and specialist AI builds rely on partner appliances.",
    logo: "/logos/Nutanix.svg",
  },
  {
    slug: "azure-stack-hci",
    name: "Microsoft Azure Stack HCI",
    best: "Best for Microsoft Estates (Recommended)",
    strength: "Microsoft 2019; based on Windows Server Datacenter plus SDDC. Hyper-V plus AKS on Stack HCI, Storage Spaces Direct, Network ATC SDN, native Azure integration via Arc. Per-core plus Azure subscription. Strong fit for Microsoft-aligned mid-market and edge.",
    watch: "Best fit when M365 is the productivity default and Microsoft licensing leverage exists; less compelling for non-Microsoft estates.",
    logo: "/logos/Microsoft_Azure.svg",
  },
  {
    slug: "openshift",
    name: "Red Hat OpenShift",
    best: "Best Container-Native (Recommended)",
    strength: "OpenShift launched 2011; rebuilt on Kubernetes from 2015. Kubernetes-native plus KubeVirt for VMs. OpenShift Data Foundation (Ceph) storage. OpenShift AI plus Red Hat AI Inference Server. Subscription native. Strong Red Hat consulting.",
    watch: "Container-native by design; VM-heavy estates without modernisation appetite get a steeper operational learning curve.",
    logo: "/logos/RedHatOpenShift.png",
  },
  {
    slug: "dell-apex",
    name: "Dell APEX Private Cloud",
    best: "Best Dell-Aligned Consumption",
    strength: "Dell launched APEX 2021; reference architecture plus services. VMware plus K8s reference architectures, vSAN-based SDS, NSX-based SDN. APEX AI Factory with NVIDIA. APEX subscription native. Dell direct plus partners across UAE.",
    watch: "Best ROI when paired with Dell hardware estate; multi-vendor heterogeneous environments lose some of the integrated value.",
    logo: "/logos/Dell_Technologies.webp",
  },
  {
    slug: "hpe-greenlake",
    name: "HPE GreenLake Private Cloud",
    best: "Most-Mature Consumption Private Cloud",
    strength: "HPE launched GreenLake 2017; broadened to private cloud 2023. VMware plus K8s plus AHV options. vSAN or Alletra MP storage, NSX-based SDN. GreenLake for Private Cloud AI. GreenLake is the most-mature consumption model. HPE direct plus partners across UAE.",
    watch: "Strongest when standardising the whole stack on HPE; mixed-vendor hardware estates can still buy the platform but lose some operational integration.",
    logo: "/logos/HPEGreenLake.webp",
  },
];

/* ───────── VENDOR MATRIX (BUYER'S MATRIX) ───────── */

const matrixVendors = [
  { name: "VMware Cloud Foundation", recommended: true, rank: "#1" },
  { name: "Nutanix Cloud Platform", recommended: true },
  { name: "Azure Stack HCI", recommended: true },
  { name: "Red Hat OpenShift", recommended: true },
  { name: "Dell APEX" },
  { name: "HPE GreenLake" },
];

type StarCell = { stars: number; note: string };
type VerdictCell = { recommended?: boolean; rank?: string; text: string };
type MatrixRow =
  | { label: string; type: "text"; cells: string[] }
  | { label: string; type: "stars"; cells: StarCell[] }
  | { label: string; type: "verdict"; cells: VerdictCell[] };

const matrixRows: MatrixRow[] = [
  {
    label: "Platform heritage",
    type: "text",
    cells: [
      "VMware 1998; Cloud Foundation since 2017",
      "Nutanix 2009; pioneered hyperconverged infrastructure",
      "Microsoft 2019; based on Windows Server Datacenter plus SDDC",
      "OpenShift launched 2011; rebuilt on Kubernetes from 2015",
      "Dell launched APEX 2021; reference architecture plus services",
      "HPE launched GreenLake 2017; broadened to private cloud 2023",
    ],
  },
  {
    label: "Hypervisor / container",
    type: "stars",
    cells: [
      { stars: 5, note: "ESXi plus Tanzu Kubernetes" },
      { stars: 5, note: "AHV included, ESXi and Hyper-V supported" },
      { stars: 4, note: "Hyper-V plus AKS on Stack HCI" },
      { stars: 5, note: "Kubernetes-native plus KubeVirt VMs" },
      { stars: 5, note: "VMware plus K8s reference architectures" },
      { stars: 5, note: "VMware plus K8s plus AHV options" },
    ],
  },
  {
    label: "Software-defined storage",
    type: "stars",
    cells: [
      { stars: 5, note: "vSAN reference SDS" },
      { stars: 5, note: "Nutanix Volumes plus AOS storage" },
      { stars: 4, note: "Storage Spaces Direct" },
      { stars: 4, note: "OpenShift Data Foundation (Ceph)" },
      { stars: 5, note: "Based on vSAN reference" },
      { stars: 5, note: "vSAN or Alletra MP storage" },
    ],
  },
  {
    label: "Software-defined networking",
    type: "stars",
    cells: [
      { stars: 5, note: "NSX reference SDN" },
      { stars: 4, note: "Flow Network Security and Networking" },
      { stars: 4, note: "SDN via Network ATC" },
      { stars: 4, note: "OVN-Kubernetes networking" },
      { stars: 5, note: "NSX reference architecture" },
      { stars: 5, note: "NSX reference architecture" },
    ],
  },
  {
    label: "Hybrid public-cloud extension",
    type: "stars",
    cells: [
      { stars: 5, note: "VMware Cloud on AWS / Azure / Google" },
      { stars: 5, note: "Nutanix Cloud Clusters (NC2)" },
      { stars: 5, note: "Native Azure integration via Arc" },
      { stars: 5, note: "Azure Red Hat OpenShift, ROSA, ARO" },
      { stars: 5, note: "APEX hybrid into AWS, Azure" },
      { stars: 5, note: "GreenLake hybrid into AWS, Azure" },
    ],
  },
  {
    label: "AI / GPU readiness",
    type: "stars",
    cells: [
      { stars: 5, note: "Private AI Foundation with NVIDIA" },
      { stars: 5, note: "Nutanix Enterprise AI (GPT-in-a-Box)" },
      { stars: 4, note: "Azure Stack HCI GPU partitioning" },
      { stars: 5, note: "OpenShift AI plus Inference Server" },
      { stars: 5, note: "APEX AI Factory with NVIDIA" },
      { stars: 5, note: "GreenLake for Private Cloud AI" },
    ],
  },
  {
    label: "Consumption / subscription",
    type: "stars",
    cells: [
      { stars: 4, note: "Post-Broadcom VCF subscription" },
      { stars: 5, note: "Nutanix portable subscription" },
      { stars: 4, note: "Per-core plus Azure subscription" },
      { stars: 5, note: "OpenShift subscription native" },
      { stars: 5, note: "APEX subscription native" },
      { stars: 5, note: "GreenLake is the most mature" },
    ],
  },
  {
    label: "UAE service footprint",
    type: "stars",
    cells: [
      { stars: 5, note: "Large UAE Broadcom partner network" },
      { stars: 5, note: "Strong UAE partner ecosystem" },
      { stars: 5, note: "Microsoft direct plus partners" },
      { stars: 4, note: "Strong Red Hat consulting" },
      { stars: 5, note: "Dell direct plus partners" },
      { stars: 5, note: "HPE direct plus partners" },
    ],
  },
  {
    label: "Best suited for",
    type: "text",
    cells: [
      "VMware-deep enterprises and customers prioritising vSAN / NSX reference",
      "HCI-first estates wanting AHV-included economics and Prism simplicity",
      "Microsoft-aligned mid-market and edge with Arc-led management",
      "Container-native modern app estates with Kubernetes maturity",
      "Dell-aligned enterprise consumption private cloud",
      "HPE-aligned consumption private cloud across VMware, K8s, AHV",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "Large Broadcom partner network; vSAN and NSX remain reference SDS and SDN; Private AI Foundation with NVIDIA." },
      { recommended: true, text: "AHV included post-Broadcom; Prism is the gold standard for HCI operations." },
      { recommended: true, text: "Native Azure integration via Arc; best private cloud for Microsoft-aligned mid-market." },
      { recommended: true, text: "Kubernetes-native by design with KubeVirt for VMs; the modern app reference." },
      { text: "Reference architecture plus services with APEX subscription native." },
      { text: "Most-mature consumption private cloud; broadest hypervisor flexibility (VMware, K8s, AHV)." },
    ],
  },
];

/* ───────── GARTNER-STYLE CAPABILITY SCORECARD ───────── */

const featureVendors = [
  "VMware Cloud Foundation",
  "Nutanix",
  "Azure Stack HCI",
  "OpenShift",
  "Dell APEX",
  "HPE GreenLake",
];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "Hypervisor and container breadth",
    cells: [
      { tier: "best", note: "ESXi plus Tanzu Kubernetes" },
      { tier: "best", note: "AHV included, ESXi and Hyper-V supported" },
      { tier: "excellent", note: "Hyper-V plus AKS on Stack HCI" },
      { tier: "best", note: "Kubernetes-native plus KubeVirt" },
      { tier: "best", note: "VMware plus Kubernetes reference" },
      { tier: "best", note: "VMware plus K8s plus AHV options" },
    ],
  },
  {
    label: "Software-defined storage",
    cells: [
      { tier: "best", note: "vSAN is the reference SDS" },
      { tier: "best", note: "Nutanix AOS storage mature" },
      { tier: "excellent", note: "Storage Spaces Direct" },
      { tier: "excellent", note: "Data Foundation (Ceph)" },
      { tier: "best", note: "vSAN reference" },
      { tier: "best", note: "vSAN or Alletra MP" },
    ],
  },
  {
    label: "Software-defined networking",
    cells: [
      { tier: "best", note: "NSX is the reference SDN" },
      { tier: "excellent", note: "Flow Network Security plus Networking" },
      { tier: "excellent", note: "Network ATC SDN" },
      { tier: "excellent", note: "OVN-Kubernetes" },
      { tier: "best", note: "NSX-based reference" },
      { tier: "best", note: "NSX-based reference" },
    ],
  },
  {
    label: "Hybrid public-cloud",
    cells: [
      { tier: "best", note: "VMware Cloud on AWS / Azure / Google" },
      { tier: "best", note: "Nutanix Cloud Clusters NC2" },
      { tier: "best", note: "Native Azure plus Arc" },
      { tier: "best", note: "ARO, ROSA, Azure Red Hat OpenShift" },
      { tier: "best", note: "APEX hybrid" },
      { tier: "best", note: "GreenLake hybrid" },
    ],
  },
  {
    label: "AI / GPU support",
    cells: [
      { tier: "best", note: "Private AI Foundation with NVIDIA" },
      { tier: "best", note: "Enterprise AI (GPT-in-a-Box)" },
      { tier: "excellent", note: "GPU partitioning on Stack HCI" },
      { tier: "best", note: "OpenShift AI plus Inference Server" },
      { tier: "best", note: "APEX AI Factory" },
      { tier: "best", note: "GreenLake Private Cloud AI" },
    ],
  },
  {
    label: "Lifecycle management and ops",
    cells: [
      { tier: "best", note: "vCenter plus SDDC Manager mature" },
      { tier: "best", note: "Prism is the gold standard" },
      { tier: "excellent", note: "Windows Admin Center plus Arc" },
      { tier: "excellent", note: "OpenShift Console plus ACM" },
      { tier: "best", note: "APEX Console plus CloudIQ" },
      { tier: "best", note: "GreenLake Central plus Compute Ops Manager" },
    ],
  },
  {
    label: "Consumption / subscription",
    cells: [
      { tier: "excellent", note: "Post-Broadcom VCF subscription" },
      { tier: "best", note: "Portable subscription model" },
      { tier: "excellent", note: "Per-core plus Azure subscription" },
      { tier: "best", note: "OpenShift subscription native" },
      { tier: "best", note: "APEX subscription native" },
      { tier: "best", note: "GreenLake is the most mature" },
    ],
  },
  {
    label: "UAE service and partner depth",
    cells: [
      { tier: "best", note: "Large Broadcom partner network" },
      { tier: "best", note: "Strong UAE partner ecosystem" },
      { tier: "best", note: "Microsoft direct plus partners" },
      { tier: "excellent", note: "Strong Red Hat consulting" },
      { tier: "best", note: "Dell direct plus partners" },
      { tier: "best", note: "HPE direct plus partners" },
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
    title: "Post-Broadcom hypervisor decision?",
    desc: "Nutanix AHV is the strongest commercial alternative for HCI estates. Hyper-V plus Azure Stack HCI works for Microsoft-aligned shops. OpenShift Virtualization is credible for container-forward teams. VMware Cloud Foundation remains viable if the new subscription pricing is acceptable.",
  },
  {
    num: "02",
    title: "Reference architecture or build your own?",
    desc: "Reference architectures (VxRail, Nutanix appliance, Azure Stack HCI integrated, Dell APEX, HPE GreenLake) reduce risk and operational burden substantially. Build-your-own is increasingly hard to justify outside very specific custom-hardware requirements.",
  },
  {
    num: "03",
    title: "Consumption or CapEx?",
    desc: "Subscription private cloud (GreenLake, APEX, TruScale, Nutanix subscription) wins for predictable economics and refresh-included service. CapEx remains competitive on flat-out lowest-five-year-cost for steady-state workloads.",
  },
  {
    num: "04",
    title: "AI workloads on private cloud?",
    desc: "Worth the conversation. For organisations with unique data, GPU-intensive training, or sovereignty mandates, private AI infrastructure (Private AI Foundation, Nutanix Enterprise AI, OpenShift AI, APEX AI Factory) is now genuinely competitive with public cloud.",
  },
  {
    num: "05",
    title: "Pure private or hybrid?",
    desc: "Modern private cloud platforms extend natively to public clouds. Pure private is retained only where sovereignty mandates require it; hybrid is the dominant operating model.",
  },
  {
    num: "06",
    title: "Operational model: in-house, consumption or managed?",
    desc: "In-house operate suits VMware-deep teams; consumption (GreenLake, APEX) externalises hardware lifecycle; fully managed private cloud removes most operational burden and is the default for mid-market without dedicated platform engineering.",
  },
];

/* ───────── UAE SOVEREIGNTY & COMMERCIAL NOTES ───────── */

const uaeNotes = [
  "Sovereignty mandates for banking (CBUAE), government and ADGM-regulated entities increasingly drive private cloud for sensitive workloads.",
  "Post-Broadcom VMware pricing has reopened the hypervisor question across the UAE; Nutanix AHV, Hyper-V plus Azure Stack HCI and OpenShift are credible alternatives.",
  "GreenLake (HPE) and APEX (Dell) are the most-deployed consumption private-cloud platforms in UAE today.",
  "AI workload economics now favour private cloud for organisations with unique data and steady GPU utilisation.",
  "UAE Tier-III data-centre availability removes most past objections to private cloud reliability.",
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "VMware Cloud Foundation or Nutanix Cloud Platform?",
    answer:
      "VMware wins where the existing estate is VMware, where NSX SDN and vSAN storage are decisive, and where Cloud Foundation reference is already operationalised. Nutanix wins on operational simplicity (Prism is the gold standard), on AHV-included economics post-Broadcom, and on portable subscription.",
  },
  {
    question: "Should we still buy VMware after Broadcom?",
    answer:
      "Yes if the new subscription pricing is acceptable and your team is VMware-deep. For mid-market UAE customers without that depth, Nutanix, Microsoft Azure Stack HCI or OpenShift typically deliver better operational economics.",
  },
  {
    question: "Is Azure Stack HCI a real private cloud?",
    answer:
      "Yes, particularly for Microsoft-aligned mid-market and edge. The integration with Azure Arc, Azure Backup, Azure Monitor and AKS-on-HCI makes it a credible private-cloud platform with strong public cloud integration.",
  },
  {
    question: "Private AI infrastructure: real or marketing?",
    answer:
      "Real for organisations with unique data, steady GPU utilisation, sovereignty mandates or constrained public-cloud egress economics. Reference architectures (Private AI Foundation, Enterprise AI, OpenShift AI, APEX AI Factory) are deployable at scale today.",
  },
  {
    question: "What is the typical private cloud refresh cycle?",
    answer:
      "Five to seven years for hardware. Subscription private cloud (GreenLake, APEX, TruScale) externalises this decision into the ongoing service. Software platform refreshes typically follow major release cadence rather than fixed cycles.",
  },
  {
    question: "Is Artiflex IT tied to a single private cloud platform?",
    answer:
      "No. We deliver VMware Cloud Foundation, Nutanix Cloud Platform, Microsoft Azure Stack HCI, Red Hat OpenShift, Dell APEX and HPE GreenLake across UAE projects. Vendor recommendation follows workload mix, existing licensing and sovereignty posture, not the inventory.",
  },
  {
    question: "Can private cloud meet UAE sovereignty mandates?",
    answer:
      "Yes. Private cloud is the typical answer for CBUAE-regulated banking, government and ADGM-regulated entities where in-country residency and operational control matter most.",
  },
  {
    question: "Do you offer managed private cloud?",
    answer:
      "Yes. Co-managed and fully-managed engagements include lifecycle management, patching, capacity planning and quarterly architecture reviews.",
  },
];

/* ───────── HERO ───────── */

function PrivateCloudHero() {
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
                <span className="font-medium text-[#28B5E1]">Private Cloud</span>
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
            Private{" "}
            <span className="gradient-text">Cloud</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Buyer's Guide, Vendor Matrix and Gartner-style Scorecard
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            A UAE buyer's guide for private cloud platforms, sovereign infrastructure and modern on-premise. Honest comparisons across <span className="font-semibold text-white">VMware Cloud Foundation, Nutanix Cloud Platform, Microsoft Azure Stack HCI, Red Hat OpenShift, Dell APEX Private Cloud and HPE GreenLake Private Cloud</span>.
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
              to="/blog/origin-private-cloud"
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
              Get a Free Private Cloud Assessment
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

export default function PrivateCloud() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Private Cloud UAE | Buyer's Guide & Vendor Scorecard | Artiflex IT</title>
        <meta
          name="description"
          content="UAE buyer's guide for private cloud platforms. Vendor matrix and Gartner-style scorecard across VMware Cloud Foundation, Nutanix Cloud Platform, Azure Stack HCI, Red Hat OpenShift, Dell APEX and HPE GreenLake."
        />
        <link rel="canonical" href="https://artiflexit.com/cloud-solutions/private-cloud" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Artiflex IT",
            "url": "https://artiflexit.com/cloud-solutions/private-cloud",
            "areaServed": [
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "City", "name": "Dubai" },
              { "@type": "City", "name": "Abu Dhabi" },
            ],
            "description": "Vendor-neutral UAE buyer's guide for private cloud platforms across VMware, Nutanix, Microsoft, Red Hat, Dell and HPE.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Private Cloud Services",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description": "UAE private cloud delivery across VMware Cloud Foundation, Nutanix Cloud Platform, Azure Stack HCI, Red Hat OpenShift, Dell APEX and HPE GreenLake. Sovereignty-aware design and consumption pricing.",
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
            "name": "Private Cloud Platforms for UAE Buyers",
            "itemListElement": vendors.map((v, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <PrivateCloudHero />

      {/* ───────── PRIVATE CLOUD PLATFORMS WE DELIVER (HONEYCOMB) ───────── */}
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
              Private Cloud{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Platforms
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The private cloud platforms we design, deploy and operate across UAE projects. Workload type, hypervisor commitment and sovereignty posture drive the choice.
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
                layouts[privateCloudVendorList.length] ??
                [Math.ceil(privateCloudVendorList.length / 2), Math.floor(privateCloudVendorList.length / 2)];
              const rows: typeof privateCloudVendorList[] = [];
              let i = 0;
              sizes.forEach((s) => {
                rows.push(privateCloudVendorList.slice(i, i + s));
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
            {privateCloudVendorList.map((v) => (
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
              {privateCloudVendorList.length} platforms
            </span>
            , picked by workload type, hypervisor and sovereignty posture.
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
              Before any private cloud platform commitment, walk through these questions. Most over-spent private cloud projects build the platform without designing the operating model around it.
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
              <span className="gradient-text">Private Cloud buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              Six private cloud platforms cover the majority of UAE deployments. VMware and Nutanix dominate VM-heavy estates; Azure Stack HCI wins Microsoft-aligned; Red Hat OpenShift leads container-native; Dell APEX and HPE GreenLake are the consumption-led reference architectures.
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
              Detailed Comparison on Private Cloud Platforms
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Strengths, blind spots and the buyer profile each platform was built for. Private cloud platform choice now interacts with hypervisor selection (post-Broadcom) and consumption model (GreenLake / APEX / TruScale).
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
              <span className="font-semibold text-white">Artiflex IT delivers VMware Cloud Foundation, Nutanix Cloud Platform, Microsoft Azure Stack HCI, Red Hat OpenShift, Dell APEX and HPE GreenLake</span> across UAE projects. <br />
              <span className="text-xs italic text-white sm:text-base">Vendor recommendation follows workload type, hypervisor commitment and sovereignty posture, not a vendor preference.</span>
            </p>
          </div>

          {/* Feature ratings */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Scorecard
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each platform is rated across the capabilities that matter most for UAE enterprise private cloud, using a standardised tier scale. A gold ★ marker denotes best-in-class performance.
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
              The right private cloud platform for any environment falls out of a few honest questions. Walk through these before any vendor demo and the shortlist usually picks itself.
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
              What changes when you build private cloud in the UAE
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              UAE private cloud carries specific sovereignty, regulatory and commercial considerations that change the recommendation versus a generic platform conversation.
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
              14+ years of UAE private cloud delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when VMware wins, when Nutanix wins, when Azure Stack HCI, OpenShift, Dell APEX or HPE GreenLake wins. Workload-driven and sovereignty-aware sizing before quoting.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years of UAE private cloud delivery" },
              { value: "500+", label: "Projects delivered, GCC-wide" },
              { value: "6", label: "Platforms actively delivered" },
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
                  VMware Cloud Foundation, Nutanix Cloud Platform, Microsoft Azure Stack HCI, Red Hat OpenShift, Dell APEX Private Cloud and HPE GreenLake Private Cloud.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Compliance frameworks
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  NESA, UAE PDPL, CBUAE, ADGM, ADHICS, ISO 27001 and sector-specific frameworks with documented residency and audit-ready evidence packs.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Coverage area
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  On-site across Dubai, Abu Dhabi and Sharjah. Remote across the UAE, Oman and Saudi Arabia. 24/7 platform-operations bench for managed customers.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Engagement model
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Build plus operate, consumption (GreenLake, APEX, TruScale), or fully managed. Existing-licensing leverage (Microsoft EA, VMware SnS, Red Hat) is part of the design.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#28B5E1] px-6 py-3 font-display text-sm font-semibold text-navy-deep transition-colors hover:bg-white sm:text-base"
            >
              Book a free private cloud assessment
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
            description="What UAE buyers ask us most about choosing private cloud platforms, post-Broadcom alternatives and consumption models."
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
        title="Free Private Cloud Assessment"
        description="60-minute review of your current estate, hypervisor licensing posture, sovereignty mandates, AI workload roadmap and recommended platform plus consumption model."
        primaryButton={{ text: "Book Assessment", action: "modal" }}
      />
    </>
  );
}
