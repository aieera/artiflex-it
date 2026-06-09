import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import DeliveryModel from "@/components/sections/DeliveryModel";

/* ───────── HYBRID CLOUD VENDORS (HONEYCOMB) ───────── */

const hybridVendorList = [
  { slug: "aws-outposts", name: "AWS Outposts", logo: "/logos/Amazon_Web_Services.svg" },
  { slug: "azure-arc", name: "Azure Stack / Arc", logo: "/logos/Microsoft_Azure.svg" },
  { slug: "google-anthos", name: "Google Anthos", logo: "/logos/Google-Cloud.webp" },
  { slug: "vmware-vcf", name: "VMware Cloud Foundation", logo: "/logos/vmware.svg" },
  { slug: "nutanix-nc2", name: "Nutanix Cloud Clusters", logo: "/logos/Nutanix.svg" },
  { slug: "oci-ibm-satellite", name: "OCI / IBM Cloud Satellite", logo: "/logos/Oracle.png" },
];

/* ───────── BUYER'S GUIDE, SELECTION FRAMEWORK ───────── */

const selectionFramework = [
  {
    step: "1",
    question: "What does hybrid mean for us?",
    capture: "On-prem plus public cloud, multi-site with cloud DR, edge plus core plus cloud, or sovereign on-prem plus public for non-sensitive",
    why: "Different hybrid patterns favour different platforms; AWS Outposts is on-prem extension, Anthos is multi-cloud, VCF is workload-portability.",
  },
  {
    step: "2",
    question: "Primary public cloud commitment?",
    capture: "AWS-primary, Azure-primary, GCP-primary, or deliberate multi-cloud",
    why: "Hybrid platform follows primary public cloud for the cleanest integration; cross-cloud hybrid is technically possible but operationally complex.",
  },
  {
    step: "3",
    question: "On-prem hypervisor today?",
    capture: "VMware vSphere, Microsoft Hyper-V, Nutanix AHV, Red Hat OpenShift, or KVM / Proxmox",
    why: "Hybrid platforms have different on-prem hypervisor preferences; the cleanest integrations follow your existing footprint.",
  },
  {
    step: "4",
    question: "Edge presence?",
    capture: "Many small edge sites, few large edge sites, factory floor / industrial, retail / branch, or none",
    why: "Edge expands hybrid scope significantly; AWS Outposts servers, Azure Stack Edge and Anthos at Edge serve different patterns.",
  },
  {
    step: "5",
    question: "Workload portability requirement?",
    capture: "Workloads must run anywhere, applications stay where deployed, or deliberate placement strategy",
    why: "Container-native architectures (OpenShift, Anthos, EKS Anywhere, AKS-HCI) maximise portability; VM-based hybrid has lower portability.",
  },
  {
    step: "6",
    question: "Sovereignty constraints?",
    capture: "UAE residency mandatory, GCC residency acceptable, global acceptable, or classified / sovereign required",
    why: "Sovereignty often drives the on-prem half of hybrid; the platform must operate under residency mandates.",
  },
  {
    step: "7",
    question: "Operational team capacity?",
    capture: "Cloud-native team, traditional infrastructure team, mixed, or outsourced managed service",
    why: "Hybrid platforms have different operational learning curves; AWS Outposts and Anthos require cloud-native skills.",
  },
];

/* ───────── SELECTION CRITERIA CHECKLIST ───────── */

const checklistGroups = [
  {
    title: "Technical fit",
    items: [
      "On-prem hardware support",
      "Workload portability (VM and container)",
      "Public cloud parent integration",
      "Edge form factor support",
      "Network and identity federation",
    ],
  },
  {
    title: "Operational fit",
    items: [
      "Single control plane",
      "Identity and policy consistency",
      "Observability across halves",
      "Lifecycle and patching",
      "Self-service portal",
    ],
  },
  {
    title: "Commercial fit",
    items: [
      "Subscription / consumption model",
      "Public cloud egress economics",
      "Hardware refresh inclusion",
      "Five-year TCO across halves",
    ],
  },
  {
    title: "Service fit",
    items: [
      "UAE professional services",
      "Reference architectures",
      "Migration tooling",
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
    slug: "aws-outposts",
    name: "AWS Outposts / Hybrid",
    best: "Best AWS-Native Hybrid (Recommended)",
    strength: "Outposts GA 2019; first AWS hardware-on-prem. Outposts racks, servers and Local Zones bring native AWS APIs and services on-premise. Same AWS console, same IAM, same EBS / S3 semantics on both halves. Outposts servers, Wavelength and Snow Family extend to edge. AWS-certified UAE partners are deep.",
    watch: "AWS services compatibility is strong but not 100% parity with the region; specific services need region-side endpoints.",
    logo: "/logos/Amazon_Web_Services.svg",
  },
  {
    slug: "azure-arc",
    name: "Azure Stack / Arc",
    best: "Best Microsoft-Aligned Hybrid (Recommended)",
    strength: "Azure Stack 2017; Arc 2019 made hybrid first-party. Stack HCI plus Edge plus Stack Hub variants for different on-prem profiles. Arc extends Azure portal, policy, monitoring, identity and SQL / PostgreSQL to on-prem, AWS, GCP and edge. Entra ID hybrid native.",
    watch: "Multiple Stack form factors mean choosing the right SKU at procurement matters; Arc is the control plane, not the runtime.",
    logo: "/logos/Microsoft_Azure.svg",
  },
  {
    slug: "google-anthos",
    name: "Google Anthos / GDC",
    best: "Best Kubernetes-Native Hybrid (Recommended)",
    strength: "Anthos 2019; Kubernetes-led hybrid. Same GCP console and APIs across halves. Anthos on bare metal plus GDC Edge for edge. Cloud Identity hybrid. Kubernetes-native workload portability is best-in-class. GDC Hosted for sovereign deployments.",
    watch: "UAE partner ecosystem is growing rather than dominant; best fit for Google-aligned shops and Kubernetes-deep teams.",
    logo: "/logos/Google-Cloud.webp",
  },
  {
    slug: "vmware-vcf",
    name: "VMware Cloud Foundation",
    best: "Best VM-Portability Hybrid (Recommended)",
    strength: "VMware Cloud Foundation 2017; hybrid via VMware Cloud on AWS / Azure / Google. Any certified VMware hardware on-prem with VM portability across estates. vCenter plus VMware Cloud console for control. Multi-cloud regions in UAE / GCC. Deep VMware partner depth.",
    watch: "Post-Broadcom subscription pricing affects the calculation; container-native portability is via Tanzu rather than core VCF.",
    logo: "/logos/vmware.svg",
  },
  {
    slug: "nutanix-nc2",
    name: "Nutanix Cloud Clusters (NC2)",
    best: "Best Nutanix-Aligned Hybrid",
    strength: "Nutanix Cloud Clusters launched 2020 on AWS, 2021 on Azure. Any certified Nutanix hardware on-prem with Prism Central across both halves. AHV plus Kubernetes portability. Single-node edge cluster. Strong UAE Nutanix partner ecosystem.",
    watch: "Hybrid is across AWS and Azure today; GCP integration is more recent and less mature; best fit for Nutanix-aligned estates.",
    logo: "/logos/Nutanix.svg",
  },
  {
    slug: "oci-ibm-satellite",
    name: "OCI / IBM Cloud Satellite",
    best: "Best for UAE Government Sovereignty",
    strength: "OCI at Customer 2018 brings full OCI services into UAE customer data centres with Oracle operating the infrastructure. IBM Cloud Satellite (2021) brings IBM Cloud services to on-prem and edge. Reference for UAE government sovereignty mandates.",
    watch: "Edge story is limited compared to AWS Outposts / Azure Stack / Anthos; best fit when sovereignty or Oracle / IBM workloads drive the decision.",
    logo: "/logos/Oracle.png",
  },
];

/* ───────── VENDOR MATRIX (BUYER'S MATRIX) ───────── */

const matrixVendors = [
  { name: "AWS Outposts", recommended: true, rank: "#1" },
  { name: "Azure Stack / Arc", recommended: true },
  { name: "Google Anthos", recommended: true },
  { name: "VMware Cloud Foundation", recommended: true },
  { name: "Nutanix Cloud Clusters" },
  { name: "OCI / IBM Cloud Satellite" },
];

type StarCell = { stars: number; note: string };
type VerdictCell = { recommended?: boolean; rank?: string; text: string };
type MatrixRow =
  | { label: string; type: "text"; cells: string[] }
  | { label: string; type: "stars"; cells: StarCell[] }
  | { label: string; type: "verdict"; cells: VerdictCell[] };

const matrixRows: MatrixRow[] = [
  {
    label: "Hybrid heritage",
    type: "text",
    cells: [
      "Outposts GA 2019; first AWS hardware-on-prem",
      "Azure Stack 2017; Arc 2019; first-party hybrid",
      "Anthos 2019; Kubernetes-led hybrid",
      "VMware Cloud Foundation 2017; hybrid via VMware Cloud on AWS / Azure / Google",
      "Nutanix Cloud Clusters launched 2020 on AWS, 2021 on Azure",
      "OCI at Customer 2018; IBM Cloud Satellite 2021",
    ],
  },
  {
    label: "On-prem form factors",
    type: "stars",
    cells: [
      { stars: 5, note: "Outposts racks, servers, Local Zones" },
      { stars: 5, note: "Stack Hub, HCI, Edge variants" },
      { stars: 4, note: "Anthos plus GDC Hosted / Edge" },
      { stars: 5, note: "Any certified VMware hardware" },
      { stars: 5, note: "Any certified Nutanix hardware" },
      { stars: 5, note: "Cloud at Customer hardware" },
    ],
  },
  {
    label: "Control plane consistency",
    type: "stars",
    cells: [
      { stars: 5, note: "Same AWS APIs and console" },
      { stars: 5, note: "Same Azure portal and ARM APIs" },
      { stars: 5, note: "Same GCP console and APIs" },
      { stars: 4, note: "vCenter plus cloud console" },
      { stars: 5, note: "Prism Central across both halves" },
      { stars: 5, note: "Same OCI / IBM Cloud console" },
    ],
  },
  {
    label: "Workload portability",
    type: "stars",
    cells: [
      { stars: 4, note: "AWS services compatibility" },
      { stars: 4, note: "Azure services compatibility" },
      { stars: 5, note: "Kubernetes-native portability" },
      { stars: 5, note: "VM portability across estates" },
      { stars: 5, note: "AHV plus Kubernetes portability" },
      { stars: 4, note: "OCI / IBM services portability" },
    ],
  },
  {
    label: "Edge support",
    type: "stars",
    cells: [
      { stars: 5, note: "Outposts servers, Wavelength, Snow Family" },
      { stars: 5, note: "Stack HCI Edge, Stack Edge, IoT Edge" },
      { stars: 5, note: "Anthos on bare metal, GDC Edge" },
      { stars: 4, note: "Edge Compute Stack" },
      { stars: 5, note: "Single-node edge cluster" },
      { stars: 3, note: "Limited edge options" },
    ],
  },
  {
    label: "Identity and policy federation",
    type: "stars",
    cells: [
      { stars: 5, note: "IAM consistent on-prem and cloud" },
      { stars: 5, note: "Entra ID across hybrid" },
      { stars: 5, note: "Cloud Identity across hybrid" },
      { stars: 4, note: "Workspace ONE plus public cloud IAM" },
      { stars: 4, note: "Prism plus public cloud IAM" },
      { stars: 4, note: "OCI IAM / IBM IAM" },
    ],
  },
  {
    label: "UAE region parent presence",
    type: "stars",
    cells: [
      { stars: 5, note: "Bahrain region (me-south-1)" },
      { stars: 5, note: "UAE North and Central regions" },
      { stars: 4, note: "Dammam region serves UAE" },
      { stars: 4, note: "Multi-cloud regions in UAE / GCC" },
      { stars: 5, note: "AWS and Azure UAE regions" },
      { stars: 5, note: "OCI Abu Dhabi plus Dubai" },
    ],
  },
  {
    label: "UAE partner ecosystem",
    type: "stars",
    cells: [
      { stars: 5, note: "AWS-certified UAE partners deep" },
      { stars: 5, note: "Azure UAE partners broad" },
      { stars: 4, note: "Growing Google partners" },
      { stars: 5, note: "VMware partner depth" },
      { stars: 5, note: "Nutanix UAE strong" },
      { stars: 5, note: "OCI / IBM UAE government strong" },
    ],
  },
  {
    label: "Best suited for",
    type: "text",
    cells: [
      "AWS-primary estates extending on-prem and to edge",
      "Microsoft-aligned hybrid with Arc-led cross-cloud governance",
      "Kubernetes-native hybrid and Google-aligned multi-cloud",
      "VMware-deep estates extending to cloud with VM portability",
      "Nutanix-aligned hybrid into AWS or Azure",
      "UAE government and Oracle / IBM workload sovereignty",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "Same AWS APIs on-prem and cloud; deepest UAE AWS partner ecosystem." },
      { recommended: true, text: "Native Azure integration with Arc extending to AWS, GCP and edge; best for Microsoft-aligned estates." },
      { recommended: true, text: "Kubernetes-native portability across hyperscalers and on-prem; GDC Hosted for sovereign deployments." },
      { recommended: true, text: "Best VM-portability infrastructure-led hybrid with VMware Cloud on AWS / Azure / Google." },
      { text: "Same Nutanix experience across on-prem and AWS / Azure; Prism Central across both halves." },
      { text: "Reference for UAE government sovereignty with Oracle-operated on-prem infrastructure." },
    ],
  },
];

/* ───────── GARTNER-STYLE CAPABILITY SCORECARD ───────── */

const featureVendors = [
  "AWS Outposts",
  "Azure Arc",
  "Google Anthos",
  "VMware VCF",
  "Nutanix NC2",
  "OCI / IBM",
];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "Control plane consistency",
    cells: [
      { tier: "best", note: "Same AWS console on-prem and cloud" },
      { tier: "best", note: "Same Azure portal plus Arc" },
      { tier: "best", note: "Same GCP console and APIs" },
      { tier: "excellent", note: "vCenter plus VMware Cloud console" },
      { tier: "best", note: "Prism Central across both halves" },
      { tier: "best", note: "Same OCI / IBM Cloud console" },
    ],
  },
  {
    label: "Workload portability (VM and container)",
    cells: [
      { tier: "excellent", note: "AWS services compatibility" },
      { tier: "excellent", note: "Azure services compatibility" },
      { tier: "best", note: "Kubernetes-native portability" },
      { tier: "best", note: "VM portability across estates" },
      { tier: "best", note: "AHV plus Kubernetes portability" },
      { tier: "excellent", note: "OCI / IBM services portability" },
    ],
  },
  {
    label: "Edge form factors",
    cells: [
      { tier: "best", note: "Outposts servers plus Wavelength" },
      { tier: "best", note: "Stack HCI Edge plus Stack Edge" },
      { tier: "best", note: "Anthos on bare metal plus Edge" },
      { tier: "excellent", note: "Edge Compute Stack" },
      { tier: "best", note: "Single-node edge cluster" },
      { tier: "strong", note: "Limited edge options" },
    ],
  },
  {
    label: "Public cloud parent integration",
    cells: [
      { tier: "best", note: "Native AWS integration" },
      { tier: "best", note: "Native Azure integration" },
      { tier: "best", note: "Native GCP integration" },
      { tier: "excellent", note: "VMware Cloud on AWS / Azure / Google" },
      { tier: "excellent", note: "NC2 on AWS / Azure" },
      { tier: "best", note: "Native OCI / IBM Cloud" },
    ],
  },
  {
    label: "Identity and policy federation",
    cells: [
      { tier: "best", note: "IAM consistent across halves" },
      { tier: "best", note: "Entra ID hybrid native" },
      { tier: "best", note: "Cloud Identity hybrid" },
      { tier: "excellent", note: "Workspace ONE plus IAM" },
      { tier: "excellent", note: "Prism plus cloud IAM" },
      { tier: "excellent", note: "OCI / IBM IAM" },
    ],
  },
  {
    label: "Observability and AIOps",
    cells: [
      { tier: "best", note: "CloudWatch plus Systems Manager" },
      { tier: "best", note: "Azure Monitor plus Arc" },
      { tier: "excellent", note: "Cloud Operations plus Anthos" },
      { tier: "excellent", note: "Aria Operations hybrid" },
      { tier: "best", note: "Prism plus public cloud telemetry" },
      { tier: "excellent", note: "OCI / IBM observability" },
    ],
  },
  {
    label: "Sovereignty and UAE residency",
    cells: [
      { tier: "excellent", note: "Bahrain region plus on-prem" },
      { tier: "best", note: "UAE regions plus Stack HCI" },
      { tier: "excellent", note: "Dammam region plus Anthos" },
      { tier: "excellent", note: "Multi-cloud UAE residency" },
      { tier: "excellent", note: "AWS / Azure UAE plus on-prem" },
      { tier: "best", note: "OCI Abu Dhabi government cloud" },
    ],
  },
  {
    label: "UAE professional services",
    cells: [
      { tier: "best", note: "AWS-certified UAE partners" },
      { tier: "best", note: "Azure UAE partners broad" },
      { tier: "excellent", note: "Growing Google partners" },
      { tier: "best", note: "VMware partner depth" },
      { tier: "best", note: "Nutanix UAE strong" },
      { tier: "best", note: "OCI / IBM government strong" },
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
    title: "AWS-primary or Azure-primary?",
    desc: "Follows your primary public cloud commitment. AWS Outposts for AWS-primary; Azure Stack / Arc for Azure-primary; Anthos for Google-primary or multi-cloud Kubernetes.",
  },
  {
    num: "02",
    title: "Infrastructure-led or cloud-led hybrid?",
    desc: "VMware Cloud Foundation and Nutanix Cloud Clusters are infrastructure-led: same VM platform across halves with public cloud as extension. Outposts / Stack / Anthos are cloud-led: same cloud services pushed to on-prem.",
  },
  {
    num: "03",
    title: "Workload portability or operational consistency?",
    desc: "Container-native (Anthos, OpenShift, EKS Anywhere, AKS-HCI) maximises portability. VM-based hybrid (VCF, NC2) maximises operational continuity for existing estates. Choose by workload roadmap.",
  },
  {
    num: "04",
    title: "Edge as part of the conversation?",
    desc: "If yes, choose a platform with strong edge form factors: Outposts servers, Stack HCI Edge, Anthos on bare metal, Nutanix single-node edge. Not all hybrid platforms scale down to edge.",
  },
  {
    num: "05",
    title: "Sovereignty as decisive constraint?",
    desc: "Drives OCI at Customer for government, IBM Cloud Satellite for regulated, and sovereign overlays for Azure / AWS. The on-prem half of hybrid is where sovereignty mandates land.",
  },
  {
    num: "06",
    title: "Operational team capacity?",
    desc: "AWS Outposts and Anthos demand cloud-native skills. VCF and NC2 keep existing operational model. Match the platform to the operators, not the brochure.",
  },
];

/* ───────── UAE SOVEREIGNTY & COMMERCIAL NOTES ───────── */

const uaeNotes = [
  "Sovereignty mandates often drive on-prem half of hybrid; public cloud parent residency in UAE / GCC is now standard.",
  "Banking (CBUAE), government and ADGM-regulated entities increasingly require hybrid frameworks rather than pure public or pure private.",
  "AWS Outposts and Azure Stack HCI dominate UAE Microsoft / AWS-aligned hybrid deployments.",
  "OCI Cloud at Customer is the reference UAE government hybrid platform.",
  "Multi-vendor hybrid (e.g., AWS plus Azure plus on-prem VMware) is technically possible but operationally complex; deliberate platform choice matters.",
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "AWS Outposts or VMware Cloud on AWS for UAE hybrid?",
    answer:
      "Outposts for AWS-services consistency on-prem; VMC on AWS for existing VMware estates extending to cloud. They serve different patterns: Outposts brings AWS to your data centre; VMC brings your data centre to AWS. Most UAE customers ultimately choose one or the other rather than both.",
  },
  {
    question: "Is Azure Arc enough for hybrid management?",
    answer:
      "For Microsoft-aligned estates, Arc is increasingly the right control plane: extends Azure policy, monitoring, identity and even SQL / PostgreSQL to on-prem, AWS, GCP and edge. Not a full hybrid platform on its own but a strong control plane on top of Azure Stack HCI.",
  },
  {
    question: "OCI at Customer for UAE government?",
    answer:
      "Strong fit. OCI Cloud at Customer brings full OCI services into UAE customer data centres with Oracle operating the infrastructure; specifically designed for government sovereignty mandates.",
  },
  {
    question: "Hybrid versus multi-cloud: same thing?",
    answer:
      "Different. Hybrid is on-prem plus public cloud as one estate. Multi-cloud is multiple public clouds, with or without on-prem. Many UAE enterprises end up doing both deliberately.",
  },
  {
    question: "What is the typical hybrid platform deployment timeline?",
    answer:
      "Reference architecture deployment (VxRail, Outposts, Stack HCI integrated): four to eight weeks. Multi-site hybrid with cross-cloud integration: three to six months. Sovereign hybrid with regulator certification: six to twelve months.",
  },
  {
    question: "Is Artiflex IT tied to a single hybrid platform?",
    answer:
      "No. We deliver AWS Outposts, Azure Stack / Arc, Google Anthos, VMware Cloud Foundation, Nutanix Cloud Clusters and OCI / IBM Cloud Satellite. Recommendation follows primary public cloud commitment and on-prem hypervisor footprint.",
  },
  {
    question: "Can hybrid run AI / GPU workloads?",
    answer:
      "Yes. Outposts, Azure Stack HCI, Anthos and VCF all support GPU instances on-prem with hybrid AI services from the parent cloud.",
  },
  {
    question: "Do you handle migrations from on-prem to hybrid?",
    answer:
      "Yes. Discovery, dependency mapping, parallel-run plus cutover with rollback per wave; AWS MGN, Azure Migrate, Anthos Migrate and VMware HCX are standard tooling.",
  },
];

/* ───────── HERO ───────── */

function HybridCloudHero() {
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
                <span className="font-medium text-[#28B5E1]">Hybrid Cloud</span>
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
            Hybrid{" "}
            <span className="gradient-text">Cloud</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Buyer's Guide, Vendor Matrix and Gartner-style Scorecard
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            A UAE buyer's guide for hybrid cloud architectures, edge cloud and cross-cloud operations. Honest comparisons across <span className="font-semibold text-white">AWS Outposts, Microsoft Azure Stack / Arc, Google Anthos, VMware Cloud Foundation, Nutanix Cloud Clusters, IBM Cloud Satellite and Oracle Cloud at Customer</span>.
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
              to="/blog/origin-hybrid-cloud"
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
              Get a Free Hybrid Cloud Assessment
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

export default function HybridCloud() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Hybrid Cloud UAE | Buyer's Guide & Vendor Scorecard | Artiflex IT</title>
        <meta
          name="description"
          content="UAE buyer's guide for hybrid cloud. Vendor matrix and Gartner-style scorecard across AWS Outposts, Azure Stack / Arc, Google Anthos, VMware Cloud Foundation, Nutanix Cloud Clusters and OCI / IBM Cloud Satellite."
        />
        <link rel="canonical" href="https://artiflexit.com/cloud-solutions/hybrid-cloud" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Artiflex IT",
            "url": "https://artiflexit.com/cloud-solutions/hybrid-cloud",
            "areaServed": [
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "City", "name": "Dubai" },
              { "@type": "City", "name": "Abu Dhabi" },
            ],
            "description": "Vendor-neutral UAE buyer's guide for hybrid cloud across AWS Outposts, Azure Arc, Google Anthos, VMware Cloud Foundation, Nutanix Cloud Clusters and OCI / IBM Cloud Satellite.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Hybrid Cloud Services",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description": "UAE hybrid cloud delivery across AWS Outposts, Azure Stack / Arc, Google Anthos, VMware Cloud Foundation, Nutanix Cloud Clusters and OCI / IBM Cloud Satellite.",
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
            "name": "Hybrid Cloud Platforms for UAE Buyers",
            "itemListElement": vendors.map((v, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <HybridCloudHero />

      {/* ───────── HYBRID CLOUD PLATFORMS WE DELIVER (HONEYCOMB) ───────── */}
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
              Hybrid Cloud{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Platforms
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The hybrid platforms we design, deploy and operate across UAE projects. Primary public cloud commitment, on-prem hypervisor and sovereignty constraints drive the choice.
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
                layouts[hybridVendorList.length] ??
                [Math.ceil(hybridVendorList.length / 2), Math.floor(hybridVendorList.length / 2)];
              const rows: typeof hybridVendorList[] = [];
              let i = 0;
              sizes.forEach((s) => {
                rows.push(hybridVendorList.slice(i, i + s));
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
            {hybridVendorList.map((v) => (
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
              {hybridVendorList.length} platforms
            </span>
            , picked by primary public cloud, on-prem hypervisor and sovereignty.
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
              Before any hybrid cloud commitment, walk through these questions. Most over-engineered hybrid estates build the platform without designing the control plane that ties the halves together.
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
              <span className="gradient-text">Hybrid Cloud buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              Six hybrid platforms cover the majority of UAE deployments. AWS, Azure and Google offer first-party hybrid; VMware and Nutanix offer infrastructure-led hybrid; OCI and IBM offer regulated-industry hybrid extension.
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
              Detailed Comparison on Hybrid Cloud Platforms
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Strengths, blind spots and the buyer profile each platform was built for. Hybrid platform choice typically follows primary public cloud; deliberate cross-cloud hybrid is rare and operationally complex.
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
              <span className="font-semibold text-white">Artiflex IT delivers AWS Outposts, Azure Stack / Arc, Google Anthos, VMware Cloud Foundation, Nutanix Cloud Clusters and OCI / IBM Cloud Satellite</span> across UAE projects. <br />
              <span className="text-xs italic text-white sm:text-base">Hybrid recommendation follows primary public cloud commitment and on-prem hypervisor, not a vendor preference.</span>
            </p>
          </div>

          {/* Feature ratings */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Scorecard
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each platform is rated across the capabilities that matter most for UAE enterprise hybrid cloud, using a standardised tier scale. A gold ★ marker denotes best-in-class performance.
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
              The right hybrid platform for any environment falls out of a few honest questions. Walk through these before any vendor demo and the shortlist usually picks itself.
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
              What changes when you build hybrid cloud in the UAE
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              UAE hybrid cloud carries specific sovereignty and operational considerations that change the recommendation versus a generic platform conversation.
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
              14+ years of UAE hybrid cloud delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when AWS Outposts wins, when Azure Arc wins, when Anthos, VCF, NC2 or OCI / IBM Satellite wins. Always a workload-driven and sovereignty-aware sizing before quoting.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years of UAE hybrid delivery" },
              { value: "500+", label: "Projects delivered, GCC-wide" },
              { value: "6", label: "Hybrid platforms actively delivered" },
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
                  AWS Outposts plus Local Zones, Azure Stack HCI / Hub / Edge plus Arc, Google Anthos plus GDC, VMware Cloud Foundation plus VMC, Nutanix Cloud Clusters and OCI Cloud at Customer plus IBM Cloud Satellite.
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
                  On-site across Dubai, Abu Dhabi and Sharjah. Remote across the UAE, Oman and Saudi Arabia. 24/7 hybrid-operations bench for managed customers.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Engagement model
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Migration plus managed plus FinOps governance, or assessment-only. Existing-licensing leverage (Microsoft EA, AWS EDP, VMware SnS) is part of the design.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#28B5E1] px-6 py-3 font-display text-sm font-semibold text-navy-deep transition-colors hover:bg-white sm:text-base"
            >
              Book a free hybrid cloud assessment
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
            description="What UAE buyers ask us most about choosing AWS Outposts, Azure Arc, Anthos, VCF and the wider hybrid landscape."
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
        title="Free Hybrid Cloud Assessment"
        description="60-minute review of your existing on-prem and cloud estate, control plane, identity and policy federation, sovereignty posture and recommended platform."
        primaryButton={{ text: "Book Assessment", action: "modal" }}
      />
    </>
  );
}
