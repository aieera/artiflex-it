import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import DeliveryModel from "@/components/sections/DeliveryModel";

/* ───────── MULTI-CLOUD VENDORS (HONEYCOMB) ───────── */

const cloudVendorList = [
  { slug: "hashicorp", name: "HashiCorp", logo: "/logos/HashiCorp.png" },
  { slug: "vmware-aria", name: "VMware Aria", logo: "/logos/vmware.svg" },
  { slug: "azure-arc", name: "Microsoft Azure Arc", logo: "/logos/Microsoft_Azure.svg" },
  { slug: "google-anthos", name: "Google Anthos", logo: "/logos/Google-Cloud.webp" },
  { slug: "openshift-ansible", name: "Red Hat OpenShift / Ansible", logo: "/logos/RedHatOpenShift.png" },
  { slug: "ibm-cloud-pak", name: "IBM Cloud Pak", logo: "/logos/IBM-Security.png" },
];

/* ───────── BUYER'S GUIDE, SELECTION FRAMEWORK ───────── */

const selectionFramework = [
  {
    step: "1",
    question: "Why multi-cloud?",
    capture: "Avoiding vendor lock-in, sovereignty diversification, M&A inheritance, best-of-breed services per cloud, resilience, GPU and AI capacity, regulatory diversification",
    why: "Each driver maps to a different multi-cloud pattern; deliberate multi-cloud is the right answer when capability gaps drive it.",
  },
  {
    step: "2",
    question: "Which clouds in scope?",
    capture: "AWS plus Azure, AWS plus GCP, all three hyperscalers, hyperscaler plus sovereign/private, regional clouds",
    why: "Two-cloud is the default; three-cloud increases operational complexity; sovereign-plus-public is a UAE-specific pattern.",
  },
  {
    step: "3",
    question: "Workload pattern?",
    capture: "Same applications across clouds, different applications per cloud, container-portable workloads, data-gravity-driven placement",
    why: "Same-application across-cloud requires deeper portability investment.",
  },
  {
    step: "4",
    question: "Control plane preference?",
    capture: "Cloud-native, specialist multi-cloud HashiCorp/VMware Aria, platform-based Anthos/Arc, in-house Kubernetes-led",
    why: "Choice drives operational economics for the next decade.",
  },
  {
    step: "5",
    question: "Identity and policy?",
    capture: "Federated identity across clouds, single IAM source Entra ID/Okta, independent per-cloud",
    why: "Federated identity is the foundation of any multi-cloud control plane.",
  },
  {
    step: "6",
    question: "Networking topology?",
    capture: "Direct connect to each cloud, cloud-on-ramp partner Megaport/Equinix, SD-WAN to each, no enterprise networking",
    why: "Networking is the underestimated dimension; egress economics and resilience demand deliberate design.",
  },
  {
    step: "7",
    question: "FinOps discipline?",
    capture: "Mature cross-cloud FinOps, single-cloud FinOps not yet extended, reactive cost management",
    why: "Multi-cloud without FinOps discipline is genuinely dangerous.",
  },
];

/* ───────── SELECTION CRITERIA CHECKLIST ───────── */

const checklistGroups = [
  {
    title: "Technical fit",
    items: [
      "Cloud-agnostic IaC",
      "Cross-cloud networking",
      "Federated identity IAM/OIDC/SAML",
      "Container orchestration Kubernetes",
      "Cross-cloud data plane",
    ],
  },
  {
    title: "Operational fit",
    items: [
      "Single observability across clouds",
      "Unified policy and compliance",
      "Cross-cloud cost visibility",
      "Centralized secrets and certificates",
      "Single-pane workload deployment",
    ],
  },
  {
    title: "Commercial fit",
    items: [
      "Subscription/consumption per cloud",
      "Egress cost design",
      "FinOps tooling depth",
      "Cross-cloud committed-use coordination",
      "Five-year TCO",
    ],
  },
  {
    title: "Service fit",
    items: [
      "UAE professional services depth",
      "Multi-cloud architecture practice",
      "Migration tooling",
      "Managed service options",
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
    slug: "hashicorp",
    name: "HashiCorp",
    best: "Open IaC and Secrets Standard (Recommended)",
    strength: "Founded 2012; Terraform 2014 is the open IaC standard, Vault the reference secrets platform. Sentinel for policy-as-code. Air-gap Vault for sovereign workloads. Growing UAE HashiCorp partner network.",
    watch: "Limited native observability; typically paired with a primary-cloud observability stack (Arc, Cloud Operations, Aria).",
    logo: "/logos/HashiCorp.png",
  },
  {
    slug: "vmware-aria",
    name: "VMware Aria",
    best: "VMware-aligned Multi-Cloud (Recommended)",
    strength: "VMware management since 2010; renamed Aria 2022. Aria Automation for multi-cloud IaC, Aria Operations and CloudHealth (Aria Cost) for observability and FinOps. Tanzu Mission Control for multi-cluster Kubernetes. Deep UAE VMware partner ecosystem.",
    watch: "Best fit when VMware estates extend to multi-cloud; pure public-cloud-native customers find this overkill.",
    logo: "/logos/vmware.svg",
  },
  {
    slug: "azure-arc",
    name: "Microsoft Azure Arc",
    best: "Microsoft-aligned Control Plane (Recommended)",
    strength: "Azure Arc launched 2019; multi-cloud extension growing fast. Bicep extended via Arc, AKS plus Arc-enabled Kubernetes anywhere, Azure Policy and Azure Monitor across AWS, GCP and on-prem. Entra ID hybrid native. Strong UAE Microsoft partner network.",
    watch: "Extends Azure governance to other clouds rather than being neutral; deliberate Azure-extended pattern is the right model.",
    logo: "/logos/Microsoft_Azure.svg",
  },
  {
    slug: "google-anthos",
    name: "Google Anthos / GDC",
    best: "Kubernetes-led Multi-Cloud (Recommended)",
    strength: "Anthos launched 2019; Kubernetes-led multi-cloud reference. Config Sync plus Anthos Config Management for IaC, Cloud Operations plus Anthos for observability, Anthos Policy Controller. GDC Hosted for sovereign. Growing UAE Google partner network.",
    watch: "Most powerful for Kubernetes-native estates; less compelling for VM-heavy workloads.",
    logo: "/logos/Google-Cloud.webp",
  },
  {
    slug: "openshift-ansible",
    name: "Red Hat OpenShift / Ansible",
    best: "Container-native Multi-Cloud",
    strength: "OpenShift 2011 plus Ansible 2012; Kubernetes and automation reference. OpenShift on AWS, Azure, GCP and IBM Cloud. Ansible plus OpenShift GitOps for IaC. ACM plus OPA Gatekeeper for unified policy. Strong Red Hat consulting in UAE.",
    watch: "Container-native by design; VM-heavy estates without modernisation appetite get a steeper learning curve.",
    logo: "/logos/RedHatOpenShift.png",
  },
  {
    slug: "ibm-cloud-pak",
    name: "IBM Cloud Pak",
    best: "Regulated Industry Multi-Cloud",
    strength: "Cloud Pak launched 2019; mainframe-adjacent multi-cloud built on OpenShift. Cloud Pak for Automation, Security and Watsonx for AI. Turbonomic FinOps reference. Strong IBM Global Business Services in UAE.",
    watch: "Reference for regulated industries (banking, government); less common for net-new mid-market multi-cloud.",
    logo: "/logos/IBM-Security.png",
  },
];

/* ───────── VENDOR MATRIX (BUYER'S MATRIX) ───────── */

const matrixVendors = [
  { name: "HashiCorp", recommended: true, rank: "#1" },
  { name: "VMware Aria", recommended: true },
  { name: "Azure Arc", recommended: true },
  { name: "Google Anthos", recommended: true },
  { name: "OpenShift / Ansible" },
  { name: "IBM Cloud Pak" },
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
      "Founded 2012; Terraform 2014 is the open IaC standard, Vault the reference secrets platform",
      "VMware management since 2010; renamed Aria 2022; Aria Automation, Operations and CloudHealth",
      "Azure Arc launched 2019; multi-cloud extension of Azure governance to AWS, GCP and on-prem",
      "Anthos launched 2019; Kubernetes-led multi-cloud reference; Config Sync, Cloud Operations, GDC",
      "OpenShift 2011 plus Ansible 2012; Kubernetes and automation reference across all hyperscalers",
      "Cloud Pak launched 2019; mainframe-adjacent multi-cloud built on OpenShift with Watsonx",
    ],
  },
  {
    label: "Cross-cloud IaC",
    type: "stars",
    cells: [
      { stars: 5, note: "Terraform is the de-facto open IaC standard" },
      { stars: 4, note: "Aria Automation across AWS, Azure, GCP" },
      { stars: 4, note: "Bicep extended via Arc to other clouds" },
      { stars: 4, note: "Config Sync plus Anthos Config Management" },
      { stars: 5, note: "Ansible plus OpenShift GitOps reference" },
      { stars: 4, note: "OpenShift GitOps inside Cloud Pak" },
    ],
  },
  {
    label: "Cross-cloud Kubernetes",
    type: "stars",
    cells: [
      { stars: 4, note: "Terraform provisions clusters; not a control plane" },
      { stars: 4, note: "Tanzu Mission Control multi-cluster management" },
      { stars: 5, note: "AKS plus Arc-enabled Kubernetes anywhere" },
      { stars: 5, note: "Anthos clusters on AWS, Azure, on-prem" },
      { stars: 5, note: "OpenShift on AWS, Azure, GCP and IBM Cloud" },
      { stars: 4, note: "OpenShift-based across hyperscalers" },
    ],
  },
  {
    label: "Identity and secrets",
    type: "stars",
    cells: [
      { stars: 5, note: "Vault is the reference secrets platform; Boundary for access" },
      { stars: 4, note: "Aria Operations plus vIDM for federated identity" },
      { stars: 5, note: "Entra ID hybrid native; Azure Key Vault extended" },
      { stars: 4, note: "Cloud Identity plus Workload Identity Federation" },
      { stars: 5, note: "OpenShift IdP integration plus Ansible Vault" },
      { stars: 4, note: "IBM Cloud Pak for Security plus IAM" },
    ],
  },
  {
    label: "Cross-cloud observability",
    type: "stars",
    cells: [
      { stars: 3, note: "Limited native; pair with primary-cloud observability" },
      { stars: 5, note: "Aria Operations is the multi-cloud observability reference" },
      { stars: 5, note: "Azure Monitor across AWS, GCP and on-prem" },
      { stars: 5, note: "Cloud Operations plus Anthos for full estate" },
      { stars: 5, note: "OpenShift observability stack across clouds" },
      { stars: 4, note: "Instana plus Turbonomic inside Cloud Pak" },
    ],
  },
  {
    label: "Cross-cloud FinOps",
    type: "stars",
    cells: [
      { stars: 4, note: "Terraform plus partner FinOps tooling" },
      { stars: 5, note: "CloudHealth (Aria Cost) is the FinOps reference" },
      { stars: 4, note: "Cost Management extended via Arc" },
      { stars: 4, note: "Recommender plus billing exports" },
      { stars: 4, note: "OpenShift Cost Management plus Kubecost" },
      { stars: 5, note: "Turbonomic FinOps reference inside Cloud Pak" },
    ],
  },
  {
    label: "Sovereign / regulated industry",
    type: "stars",
    cells: [
      { stars: 5, note: "Air-gap Vault for sovereign workloads" },
      { stars: 5, note: "VMware sovereign-cloud certifications" },
      { stars: 5, note: "Azure Arc on sovereign Azure plus partner clouds" },
      { stars: 5, note: "GDC Hosted for sovereign workloads" },
      { stars: 5, note: "OpenShift on sovereign infrastructure" },
      { stars: 5, note: "Reference for regulated industries" },
    ],
  },
  {
    label: "UAE service ecosystem",
    type: "stars",
    cells: [
      { stars: 4, note: "Growing UAE HashiCorp partner network" },
      { stars: 5, note: "Deep UAE VMware partner ecosystem" },
      { stars: 5, note: "Strong UAE Microsoft partner network" },
      { stars: 4, note: "Growing UAE Google partner network" },
      { stars: 5, note: "Strong Red Hat consulting in UAE" },
      { stars: 5, note: "Strong IBM Global Business Services in UAE" },
    ],
  },
  {
    label: "Best suited for",
    type: "text",
    cells: [
      "Any UAE multi-cloud with strong IaC and secrets discipline",
      "VMware-aligned estates extending to multi-cloud",
      "Microsoft-aligned multi-cloud governance",
      "Kubernetes-native multi-cloud and Google-aligned",
      "Container-native modern app platforms across clouds",
      "Banking, government and regulated multi-cloud",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "Terraform plus Vault are the de-facto open standards across UAE multi-cloud estates." },
      { recommended: true, text: "Best operations and FinOps overlay for VMware-aligned multi-cloud; CloudHealth is the cost reference." },
      { recommended: true, text: "Best Microsoft-aligned multi-cloud control plane; extends Azure governance to AWS, GCP and on-prem." },
      { recommended: true, text: "Kubernetes-led multi-cloud reference; cleanest workload portability across hyperscalers." },
      { text: "Container-native multi-cloud with strong automation; the modern app platform." },
      { text: "Reference for regulated industries with mainframe-adjacent multi-cloud needs." },
    ],
  },
];

/* ───────── GARTNER-STYLE CAPABILITY SCORECARD ───────── */

const featureVendors = [
  "HashiCorp",
  "VMware Aria",
  "Azure Arc",
  "Google Anthos",
  "OpenShift / Ansible",
  "IBM Cloud Pak",
];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "Cross-cloud IaC",
    cells: [
      { tier: "best", note: "Terraform is the open IaC standard" },
      { tier: "excellent", note: "Aria Automation across hyperscalers" },
      { tier: "excellent", note: "Bicep extended via Arc" },
      { tier: "excellent", note: "Config Sync plus Anthos Config Management" },
      { tier: "best", note: "Ansible plus OpenShift GitOps reference" },
      { tier: "excellent", note: "OpenShift GitOps inside Cloud Pak" },
    ],
  },
  {
    label: "Cross-cloud Kubernetes",
    cells: [
      { tier: "excellent", note: "Provisions clusters via Terraform" },
      { tier: "excellent", note: "Tanzu Mission Control multi-cluster" },
      { tier: "best", note: "AKS plus Arc-enabled Kubernetes anywhere" },
      { tier: "best", note: "Anthos clusters on AWS, Azure, on-prem" },
      { tier: "best", note: "OpenShift on AWS, Azure, GCP and IBM Cloud" },
      { tier: "excellent", note: "OpenShift-based across hyperscalers" },
    ],
  },
  {
    label: "Secrets and identity",
    cells: [
      { tier: "best", note: "Vault is the secrets reference plus Boundary" },
      { tier: "excellent", note: "Aria plus vIDM for federated identity" },
      { tier: "best", note: "Entra ID hybrid native plus Key Vault" },
      { tier: "excellent", note: "Cloud Identity plus Workload Identity Federation" },
      { tier: "best", note: "OpenShift IdP plus Ansible Vault" },
      { tier: "excellent", note: "Cloud Pak for Security plus IAM" },
    ],
  },
  {
    label: "Cross-cloud observability",
    cells: [
      { tier: "strong", note: "Limited native; pair with primary cloud" },
      { tier: "best", note: "Aria Operations is the multi-cloud reference" },
      { tier: "best", note: "Azure Monitor across AWS, GCP, on-prem" },
      { tier: "best", note: "Cloud Operations plus Anthos for full estate" },
      { tier: "best", note: "OpenShift observability stack" },
      { tier: "excellent", note: "Instana plus Turbonomic inside Cloud Pak" },
    ],
  },
  {
    label: "Unified policy and compliance",
    cells: [
      { tier: "excellent", note: "Sentinel for policy-as-code" },
      { tier: "best", note: "Aria policy plus VMware compliance" },
      { tier: "best", note: "Azure Policy across AWS, GCP, on-prem" },
      { tier: "excellent", note: "Anthos Policy Controller plus OPA" },
      { tier: "best", note: "ACM plus OPA Gatekeeper unified policy" },
      { tier: "excellent", note: "Cloud Pak policy plus compliance" },
    ],
  },
  {
    label: "Cross-cloud FinOps",
    cells: [
      { tier: "excellent", note: "Terraform plus partner FinOps tooling" },
      { tier: "best", note: "CloudHealth (Aria Cost) is the FinOps reference" },
      { tier: "excellent", note: "Cost Management extended via Arc" },
      { tier: "excellent", note: "Recommender plus billing exports" },
      { tier: "excellent", note: "OpenShift Cost Management plus Kubecost" },
      { tier: "best", note: "Turbonomic FinOps reference" },
    ],
  },
  {
    label: "Sovereign / regulated industry",
    cells: [
      { tier: "best", note: "Air-gap Vault for sovereign workloads" },
      { tier: "best", note: "VMware sovereign-cloud certifications" },
      { tier: "best", note: "Arc on sovereign Azure plus partners" },
      { tier: "best", note: "GDC Hosted for sovereign workloads" },
      { tier: "best", note: "OpenShift on sovereign infrastructure" },
      { tier: "best", note: "Reference for regulated industries" },
    ],
  },
  {
    label: "UAE professional services depth",
    cells: [
      { tier: "excellent", note: "Growing UAE HashiCorp partner network" },
      { tier: "best", note: "Deep UAE VMware partner ecosystem" },
      { tier: "best", note: "Strong UAE Microsoft partner network" },
      { tier: "excellent", note: "Growing UAE Google partner network" },
      { tier: "best", note: "Strong Red Hat consulting in UAE" },
      { tier: "best", note: "Strong IBM GBS in UAE" },
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
    title: "Deliberate or accidental multi-cloud?",
    desc: "Deliberate multi-cloud is driven by capability gaps, sovereignty, resilience or M&A. Accidental multi-cloud (inherited or shadow IT) typically signals the need for a unifying control plane before adding more workloads.",
  },
  {
    num: "02",
    title: "Which control plane?",
    desc: "HashiCorp for open IaC and secrets, Aria for VMware-aligned, Azure Arc for Microsoft-aligned, Anthos for Kubernetes-native, OpenShift for container-native, Cloud Pak for regulated industries.",
  },
  {
    num: "03",
    title: "Same applications or different workloads per cloud?",
    desc: "Same-application-across-clouds demands deeper portability investment (Kubernetes, container abstraction). Different-applications-per-cloud is the more common UAE pattern and easier to govern.",
  },
  {
    num: "04",
    title: "Sovereignty as multi-cloud driver?",
    desc: "Sovereignty often drives a sovereign cloud (OCI, sovereign Azure, on-prem) as the third cloud rather than another hyperscaler. UAE banking and government commonly land in this pattern.",
  },
  {
    num: "05",
    title: "Cross-cloud FinOps maturity?",
    desc: "Under-disciplined multi-cloud spend grows 30-40 percent year over year; FinOps is non-negotiable. Tag governance, cross-cloud committed-use coordination and anomaly alerts are the prerequisites.",
  },
  {
    num: "06",
    title: "Networking topology?",
    desc: "Egress economics dominate multi-cloud TCO; direct connect or cloud-on-ramp partner (Megaport, Equinix) shapes the design. Networking is the underestimated dimension that bites latest.",
  },
];

/* ───────── UAE SOVEREIGNTY & COMMERCIAL NOTES ───────── */

const uaeNotes = [
  "Most UAE enterprises now run two or more clouds; deliberate multi-cloud strategy is the differentiator.",
  "Sovereignty often drives a sovereign cloud (OCI, sovereign Azure, on-prem) as the third cloud rather than another hyperscaler.",
  "HashiCorp Terraform is the de-facto IaC standard across UAE multi-cloud deployments.",
  "Cross-cloud FinOps maturity is the biggest gap in UAE multi-cloud spend.",
  "Multi-cloud Kubernetes (Anthos, OpenShift, EKS-anywhere) is the dominant net-new pattern for workload portability.",
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "Is multi-cloud worth the operational overhead?",
    answer:
      "Only if there is a clear driver: capability gap, sovereignty, resilience, or M&A. Multi-cloud for vendor-lock-in fear alone rarely justifies the operational cost.",
  },
  {
    question: "HashiCorp Terraform plus what?",
    answer:
      "Terraform handles IaC across clouds, Vault handles secrets. Most UAE enterprises layer a primary-cloud control plane on top (Arc for Microsoft-aligned, Anthos for Google-aligned, OpenShift for Kubernetes-led).",
  },
  {
    question: "Azure Arc or Google Anthos for multi-cloud?",
    answer:
      "Arc wins for Microsoft-aligned estates extending Azure governance to AWS and GCP. Anthos wins for Kubernetes-native estates and Google-aligned shops. Both extend their primary cloud rather than being neutral.",
  },
  {
    question: "How do we measure multi-cloud maturity?",
    answer:
      "Three dimensions: IaC across clouds (Terraform coverage), federated identity (single IAM source), cross-cloud FinOps (unified cost visibility plus tagging). Maturity in all three is the prerequisite for adding more clouds.",
  },
  {
    question: "What is the typical multi-cloud rollout timeline?",
    answer:
      "Adding a second cloud: three to six months for the foundational control plane. Adding a third cloud: typically six to twelve months on top.",
  },
  {
    question: "Is Artiflex IT tied to a single multi-cloud control plane?",
    answer:
      "No. We deliver HashiCorp, VMware Aria, Azure Arc, Google Anthos, OpenShift/Ansible and IBM Cloud Pak across UAE projects. Recommendation follows primary cloud commitment and workload pattern.",
  },
  {
    question: "Can you handle cross-cloud FinOps governance?",
    answer:
      "Yes. Tag governance, reserved-instance / committed-use coordination across clouds, anomaly alerts and quarterly cost-optimisation reviews are part of the engagement.",
  },
  {
    question: "Do you offer managed multi-cloud?",
    answer:
      "Yes. Co-managed and fully-managed engagements include control-plane operations, identity federation, observability and FinOps cadence.",
  },
];

/* ───────── HERO ───────── */

function MultiCloudHero() {
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
                <span className="font-medium text-[#28B5E1]">Multi-Cloud Strategy</span>
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
            Multi-Cloud{" "}
            <span className="gradient-text">Strategy</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Buyer's Guide, Vendor Matrix and Gartner-style Scorecard
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            A UAE buyer's guide for deliberate multi-cloud strategy, cross-cloud orchestration and unified governance. Honest comparisons across <span className="font-semibold text-white">HashiCorp Terraform / Vault, VMware Aria, Microsoft Azure Arc, Google Anthos, Red Hat OpenShift / Ansible and IBM Cloud Pak</span>.
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
              to="/blog/origin-multi-cloud-strategy"
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
              Get a Free Multi-Cloud Assessment
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

export default function MultiCloud() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Multi-Cloud Strategy UAE | Buyer's Guide & Vendor Scorecard | Artiflex IT</title>
        <meta
          name="description"
          content="UAE buyer's guide for deliberate multi-cloud strategy. Vendor matrix and Gartner-style scorecard across HashiCorp, VMware Aria, Microsoft Azure Arc, Google Anthos, Red Hat OpenShift and IBM Cloud Pak."
        />
        <link rel="canonical" href="https://artiflexit.com/cloud-solutions/multi-cloud-strategy" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Artiflex IT",
            "url": "https://artiflexit.com/cloud-solutions/multi-cloud-strategy",
            "areaServed": [
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "City", "name": "Dubai" },
              { "@type": "City", "name": "Abu Dhabi" },
            ],
            "description": "Vendor-neutral UAE buyer's guide for multi-cloud strategy across HashiCorp, VMware Aria, Azure Arc, Google Anthos, OpenShift and IBM Cloud Pak.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Multi-Cloud Strategy Services",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description": "UAE multi-cloud delivery across HashiCorp, VMware Aria, Azure Arc, Google Anthos, OpenShift/Ansible and IBM Cloud Pak: control-plane design, identity federation, cross-cloud observability and FinOps governance.",
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
            "name": "Multi-Cloud Control Planes for UAE Buyers",
            "itemListElement": vendors.map((v, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <MultiCloudHero />

      {/* ───────── MULTI-CLOUD CONTROL PLANES WE DELIVER (HONEYCOMB) ───────── */}
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
              Multi-Cloud{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Control Planes
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The control planes we design, deploy and operate across UAE multi-cloud estates. Primary cloud commitment, workload pattern and sovereignty posture drive the choice.
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
              {cloudVendorList.length} control planes
            </span>
            , picked by primary cloud commitment, workload pattern and sovereignty posture.
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
              Before any multi-cloud control-plane commitment, walk through these questions. Most multi-cloud regret comes from accidental multi-cloud (inherited estates) without a unifying control plane, identity model or FinOps discipline.
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
              <span className="gradient-text">Multi-Cloud buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              Six multi-cloud control planes cover the majority of UAE enterprise estates. HashiCorp leads on open IaC and secrets; Aria, Arc and Anthos extend their primary clouds; OpenShift and Cloud Pak anchor container-native and regulated-industry multi-cloud.
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
              Detailed Comparison on Multi-Cloud Control Planes
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Strengths, blind spots and the buyer profile each control plane was built for. Multi-cloud control plane choice typically follows primary cloud commitment, workload pattern and existing platform investments more than feature comparison.
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
              <span className="font-semibold text-white">Artiflex IT delivers HashiCorp, VMware Aria, Microsoft Azure Arc, Google Anthos, Red Hat OpenShift / Ansible and IBM Cloud Pak</span> across UAE projects. <br />
              <span className="text-xs italic text-white sm:text-base">Multi-cloud control plane recommendation follows primary cloud commitment, workload pattern and sovereignty posture, not a vendor preference.</span>
            </p>
          </div>

          {/* Feature ratings */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Scorecard
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each multi-cloud control plane is rated across the capabilities that matter most for UAE enterprise multi-cloud, using a standardised tier scale. A gold ★ marker denotes best-in-class performance.
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
              The right multi-cloud control plane for any environment falls out of a few honest questions. Walk through these before any vendor demo and the shortlist usually picks itself.
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
              What changes when you buy multi-cloud in the UAE
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              UAE multi-cloud carries specific sovereignty, residency and partner considerations that change the recommendation versus a generic multi-cloud conversation.
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
              14+ years of UAE multi-cloud delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when HashiCorp wins, when VMware Aria wins, when Azure Arc, Google Anthos, OpenShift or IBM Cloud Pak wins, and when single-cloud beats multi-cloud. Always a workload-driven and sovereignty-aware sizing before quoting.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years of UAE cloud delivery" },
              { value: "500+", label: "Projects delivered, GCC-wide" },
              { value: "6", label: "Multi-cloud platforms actively delivered" },
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
                  Control-plane coverage
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  HashiCorp Terraform / Vault, VMware Aria (Automation, Operations, CloudHealth), Microsoft Azure Arc, Google Anthos / GDC, Red Hat OpenShift / Ansible and IBM Cloud Pak.
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
                  Control-plane design plus managed plus cross-cloud FinOps governance, or assessment-only. Existing primary-cloud licensing leverage is part of the design.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#28B5E1] px-6 py-3 font-display text-sm font-semibold text-navy-deep transition-colors hover:bg-white sm:text-base"
            >
              Book a free multi-cloud assessment
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
            description="What UAE buyers ask us most about deliberate multi-cloud, control-plane selection and cross-cloud governance."
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
        title="Free Multi-Cloud Assessment"
        description="60-minute review of your current multi-cloud estate, control-plane fit, identity federation, cross-cloud observability and FinOps maturity with a recommended phased roadmap."
        primaryButton={{ text: "Book Assessment", action: "modal" }}
      />
    </>
  );
}
