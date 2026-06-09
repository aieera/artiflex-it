import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import DeliveryModel from "@/components/sections/DeliveryModel";

/* ───────── NETWORK VENDORS (HONEYCOMB) ───────── */

const networkVendorList = [
  { slug: "cisco", name: "Cisco", logo: "/logos/Cisco.svg" },
  { slug: "hpe-aruba", name: "HPE Aruba", logo: "/logos/Hewlett.svg" },
  { slug: "juniper-mist", name: "Juniper Mist", logo: "/logos/JuniperMist.webp" },
  { slug: "arista", name: "Arista", logo: "/logos/Arista.png" },
  { slug: "huawei", name: "Huawei", logo: "/logos/huawei.png" },
  { slug: "extreme", name: "Extreme Networks", logo: "/logos/ExtremeNetworks.png" },
];

/* ───────── BUYER'S GUIDE, SELECTION FRAMEWORK ───────── */

const selectionFramework = [
  {
    step: "1",
    question: "What is the network for?",
    capture: "Campus access, data centre fabric, WAN / SD-WAN, branch / ROBO, or industrial OT",
    why: "Each profile has different switch class, port speed and operational model.",
  },
  {
    step: "2",
    question: "Port count and PoE budget?",
    capture: "User-facing port count today plus three-year growth, PoE class needed (802.3af / at / bt)",
    why: "Drives switch class. PoE++ for IoT, IP phones and 802.11ax APs is now table stakes.",
  },
  {
    step: "3",
    question: "Uplink and core speed?",
    capture: "1 / 10 / 25 / 40 / 100 / 400 GbE uplinks; redundant core or collapsed core",
    why: "AI and modern video drive multi-100 GbE in the core. Right-sizing avoids painful re-cabling in year three.",
  },
  {
    step: "4",
    question: "Management plane?",
    capture: "On-prem (DNA Center, Aruba Central on-prem) or cloud (Meraki, Aruba Central cloud, Mist cloud)",
    why: "Cloud-managed reduces day-2 burden but introduces SaaS and data-residency conversations.",
  },
  {
    step: "5",
    question: "SD-WAN posture?",
    capture: "Single-site MPLS replacement, multi-site mesh, SASE-integrated, or none",
    why: "SD-WAN is now part of the network conversation, not separate. Cisco, HPE Aruba and Huawei all offer integrated stacks.",
  },
  {
    step: "6",
    question: "Zero Trust readiness?",
    capture: "NAC integration (ISE, ClearPass, Mist Access Assurance), micro-segmentation, identity-based policy",
    why: "Modern networks enforce identity at the port; pre-2018 designs assume trust based on VLAN.",
  },
  {
    step: "7",
    question: "Operational team capacity?",
    capture: "Dedicated network team, generalist IT, or outsourced managed",
    why: "AIOps platforms (Mist, DNA Center, Aruba Central) materially change operational economics for thin teams.",
  },
];

/* ───────── SELECTION CRITERIA CHECKLIST ───────── */

const checklistGroups = [
  {
    title: "Technical fit",
    items: [
      "Layer 2 / 3 features (BGP, OSPF, EVPN-VXLAN)",
      "Switch capacity and buffer",
      "Stacking technology",
      "PoE class and budget",
      "Wi-Fi 6E / 7 readiness",
      "100 / 400 GbE roadmap",
      "EVPN fabric for DC",
    ],
  },
  {
    title: "Operational fit",
    items: [
      "Single-pane cloud or on-prem console",
      "AIOps (Mist AI, DNA Center, Aruba NetInsight)",
      "Zero-touch provisioning",
      "Configuration drift detection",
      "Telemetry and assurance",
    ],
  },
  {
    title: "Commercial fit",
    items: [
      "Hardware + subscription bundle",
      "CapEx vs DNA / GreenLake / Mist subscription",
      "License tiers (Essentials / Advantage / Premier)",
      "Five-year refresh economics",
    ],
  },
  {
    title: "Service fit",
    items: [
      "UAE in-country TAC",
      "Four-hour critical SLA",
      "Local spares",
      "Direct vs partner-led support",
      "Manufacturer professional services",
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
    slug: "cisco",
    name: "Cisco Catalyst / Nexus",
    best: "Largest UAE Estate (Recommended)",
    strength: "1984; largest enterprise networking vendor globally. Catalyst 9000 dominates UAE campus; Nexus 9000 plus ACI is the reference data-centre fabric. Meraki dashboard is the most-deployed cloud network. Catalyst SD-WAN plus Meraki MX cover the WAN. ISE is the dominant NAC platform; CW9166 and MR57 lead Wi-Fi 6E/7. Direct UAE TAC and the largest spares depot.",
    watch: "Premium positioning with subscription-heavy licensing tiers; DNA Center benefits from a dedicated network team.",
    logo: "/logos/Cisco.svg",
  },
  {
    slug: "hpe-aruba",
    name: "HPE Aruba CX",
    best: "Best Cloud-Managed Campus (Recommended)",
    strength: "Aruba 2002, acquired by HPE in 2015. CX 6000-10000 series with native EVPN-VXLAN; Aruba Central cloud covers campus, branch and SD-WAN in one console. EdgeConnect (Silver Peak) leads SD-WAN path optimisation. NetInsight and User Experience Insight ship strong AIOps. ClearPass is the strongest non-Cisco NAC. GreenLake for Aruba subscription is mature.",
    watch: "Data-centre fabric is capable but not the reference; mid-market customers sometimes find ClearPass operationally heavy.",
    logo: "/logos/Hewlett.svg",
  },
  {
    slug: "juniper-mist",
    name: "Juniper Mist",
    best: "Best AIOps (Recommended)",
    strength: "Juniper 1996; Mist AI acquired 2019 reshaped the portfolio. Mist Cloud is AI-native with the gold-standard telemetry and assurance. EX switches are Mist-managed; QFX with Apstra leads intent-based networking for data centre. Session Smart Router (128T) is emerging strongly for SD-WAN. Mist Access Assurance plus 128T deliver clean Zero Trust.",
    watch: "Campus presence in the UAE is growing rather than dominant; field bench is partner-led plus a growing direct team.",
    logo: "/logos/JuniperMist.webp",
  },
  {
    slug: "arista",
    name: "Arista Networks",
    best: "Best Data Centre Fabric (Recommended)",
    strength: "Arista 2004; cloud and data-centre native. 7000 / 7280 / 7800 are the reference for cloud-native and AI fabrics. CloudVision telemetry is deep for DC; deep buffer switches and EVPN-VXLAN at scale. Strong fit for hyperscale-style AI builds and modern carrier-class data centres.",
    watch: "Limited campus presence; not a primary product line for SD-WAN or Wi-Fi; subscription motion is limited compared to Cisco / Aruba.",
    logo: "/logos/Arista.png",
  },
  {
    slug: "huawei",
    name: "Huawei",
    best: "Best Price-Performance & Carrier Scale",
    strength: "Huawei 1987; full enterprise plus carrier stack. CloudEngine S series is very competitive for campus; CloudEngine 16800 reaches carrier-grade DC scale. NetEngine AR SD-WAN is mature for Huawei estates. iMaster NCE delivers strong intelligence; AirEngine Wi-Fi 7. Direct UAE TAC and spares depot.",
    watch: "Some UAE buyers face procurement constraints based on geopolitics; assess case by case. NAC and Zero Trust story is solid but less dominant than ISE or ClearPass.",
    logo: "/logos/huawei.png",
  },
  {
    slug: "extreme",
    name: "Extreme Networks",
    best: "Best for Universal Switching",
    strength: "Extreme 1996; modern enterprise networking specialist. Universal Switching with ExtremeXOS / Fabric Engine plus SLX and 9920 fabric. ExtremeCloud IQ and ExtremeAnalytics cover assurance; AP5050 supports Wi-Fi 7. Strong fit where vendor consolidation across campus, DC and Wi-Fi is decisive.",
    watch: "Limited SD-WAN footprint; service motion is distributor-led with a smaller local bench; not the default for Zero Trust-led RFPs.",
    logo: "/logos/ExtremeNetworks.png",
  },
];

/* ───────── VENDOR MATRIX (BUYER'S MATRIX) ───────── */

const matrixVendors = [
  { name: "Cisco Catalyst / Nexus", recommended: true, rank: "#1" },
  { name: "HPE Aruba CX", recommended: true },
  { name: "Juniper Mist", recommended: true },
  { name: "Arista Networks", recommended: true },
  { name: "Huawei" },
  { name: "Extreme Networks" },
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
      "1984, largest enterprise networking vendor globally",
      "1990 (Aruba 2002); HPE acquired 2015; full stack",
      "1996; Mist AI acquired 2019 and reshaped portfolio",
      "2004; cloud and data-centre native",
      "1987; full enterprise plus carrier stack",
      "1996; modern enterprise networking specialist",
    ],
  },
  {
    label: "Campus switching",
    type: "stars",
    cells: [
      { stars: 5, note: "Catalyst 9000 dominates UAE campus" },
      { stars: 5, note: "CX 6000-10000 series, native EVPN-VXLAN" },
      { stars: 4, note: "EX series with Mist-managed AIOps" },
      { stars: 3, note: "Limited campus presence" },
      { stars: 5, note: "CloudEngine S series, strong value" },
      { stars: 4, note: "Universal Switching ExtremeXOS" },
    ],
  },
  {
    label: "Data centre fabric",
    type: "stars",
    cells: [
      { stars: 5, note: "Nexus 9000 with ACI; reference fabric" },
      { stars: 4, note: "CX 8000 and CX 10000 fabric" },
      { stars: 5, note: "QFX with Apstra; best-in-class IBN" },
      { stars: 5, note: "7000 / 7280 / 7800; cloud DC reference" },
      { stars: 5, note: "CloudEngine 16800; carrier-grade" },
      { stars: 4, note: "SLX and 9920 fabric" },
    ],
  },
  {
    label: "Cloud-managed",
    type: "stars",
    cells: [
      { stars: 5, note: "Meraki MR, MS, MX dashboard" },
      { stars: 5, note: "Aruba Central cloud" },
      { stars: 5, note: "Mist Cloud AI-native" },
      { stars: 3, note: "CloudVision (DC-focused)" },
      { stars: 4, note: "iMaster NCE-Campus" },
      { stars: 4, note: "ExtremeCloud IQ" },
    ],
  },
  {
    label: "SD-WAN",
    type: "stars",
    cells: [
      { stars: 5, note: "Catalyst SD-WAN + Meraki MX" },
      { stars: 5, note: "Aruba EdgeConnect (Silver Peak)" },
      { stars: 4, note: "Session Smart Router (128T)" },
      { stars: 3, note: "Not core focus" },
      { stars: 4, note: "NetEngine AR series" },
      { stars: 3, note: "Limited SD-WAN" },
    ],
  },
  {
    label: "AIOps and assurance",
    type: "stars",
    cells: [
      { stars: 4, note: "DNA Center and ThousandEyes" },
      { stars: 5, note: "Aruba NetInsight, UX Insight" },
      { stars: 5, note: "Mist AI is the gold standard" },
      { stars: 4, note: "CloudVision telemetry" },
      { stars: 4, note: "iMaster NCE intelligence" },
      { stars: 4, note: "ExtremeAnalytics" },
    ],
  },
  {
    label: "Subscription / consumption",
    type: "stars",
    cells: [
      { stars: 5, note: "DNA / Network Subscription" },
      { stars: 5, note: "GreenLake for Aruba" },
      { stars: 5, note: "Mist subscription native" },
      { stars: 3, note: "Limited subscription motion" },
      { stars: 4, note: "Huawei Network as a Service" },
      { stars: 4, note: "ExtremeCloud IQ subscription" },
    ],
  },
  {
    label: "UAE service footprint",
    type: "stars",
    cells: [
      { stars: 5, note: "Largest direct presence and TAC" },
      { stars: 5, note: "Strong UAE bench" },
      { stars: 4, note: "Growing UAE field team" },
      { stars: 4, note: "Partner-led service" },
      { stars: 5, note: "Direct UAE presence" },
      { stars: 3, note: "Distributor-led" },
    ],
  },
  {
    label: "Best suited for",
    type: "text",
    cells: [
      "Enterprise, government, banking; brownfield Cisco estates",
      "Cloud-managed campus, multi-site SD-WAN, GreenLake buyers",
      "AIOps-led greenfield campus and Wi-Fi-first refreshes",
      "Cloud-native data centre and AI-fabric builds",
      "Cost-sensitive enterprise, carrier-scale DC, regulated industries",
      "Vendor-consolidation refreshes across campus, DC and Wi-Fi",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "Largest UAE installed base; deepest TAC and the most mature single-vendor stack." },
      { recommended: true, text: "Best cloud-managed campus and SD-WAN; GreenLake subscription is mature." },
      { recommended: true, text: "Best AIOps with Mist; clean QFX + Apstra fabric for modern data centre." },
      { recommended: true, text: "Best data centre fabric; reference for cloud-native and AI builds." },
      { text: "Best price-performance for campus and carrier-grade DC; assess geopolitical procurement case by case." },
      { text: "Universal Switching consolidation play; pick when one-vendor simplicity drives the RFP." },
    ],
  },
];

/* ───────── GARTNER-STYLE CAPABILITY SCORECARD ───────── */

const featureVendors = [
  "Cisco",
  "HPE Aruba",
  "Juniper Mist",
  "Arista",
  "Huawei",
];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "Campus switching",
    cells: [
      { tier: "best", note: "Catalyst 9000 leads UAE campus deployments" },
      { tier: "best", note: "CX 6000-10000 with EVPN-VXLAN native" },
      { tier: "excellent", note: "EX series with Mist-managed assurance" },
      { tier: "good", note: "Limited campus presence" },
      { tier: "best", note: "CloudEngine S series, very competitive" },
    ],
  },
  {
    label: "Data centre fabric",
    cells: [
      { tier: "best", note: "Nexus 9000 plus ACI is the reference fabric" },
      { tier: "excellent", note: "CX 8000/10000 capable fabric" },
      { tier: "best", note: "QFX with Apstra leads intent-based networking" },
      { tier: "best", note: "Reference for cloud-native and AI fabrics" },
      { tier: "best", note: "CloudEngine 16800 at carrier scale" },
    ],
  },
  {
    label: "Cloud-managed operations",
    cells: [
      { tier: "best", note: "Meraki dashboard is the most-deployed cloud network" },
      { tier: "best", note: "Aruba Central covers campus, branch and SD-WAN" },
      { tier: "best", note: "Mist Cloud AI-native, best telemetry" },
      { tier: "good", note: "CloudVision is DC-focused, not campus" },
      { tier: "excellent", note: "iMaster NCE strong for Huawei estates" },
    ],
  },
  {
    label: "SD-WAN",
    cells: [
      { tier: "best", note: "Catalyst SD-WAN plus Meraki MX widely deployed" },
      { tier: "best", note: "EdgeConnect leads on path optimisation" },
      { tier: "excellent", note: "Session Smart (128T) emerging strongly" },
      { tier: "good", note: "Not a primary product line" },
      { tier: "excellent", note: "NetEngine AR mature for Huawei estates" },
    ],
  },
  {
    label: "AIOps and assurance",
    cells: [
      { tier: "excellent", note: "DNA Center plus ThousandEyes capable" },
      { tier: "best", note: "NetInsight plus UX Insight strong" },
      { tier: "best", note: "Mist AI is the industry reference" },
      { tier: "excellent", note: "CloudVision telemetry deep for DC" },
      { tier: "excellent", note: "iMaster NCE solid intelligence layer" },
    ],
  },
  {
    label: "Zero Trust / NAC integration",
    cells: [
      { tier: "best", note: "ISE is the dominant NAC platform" },
      { tier: "excellent", note: "ClearPass is the strongest non-Cisco NAC" },
      { tier: "excellent", note: "Mist Access Assurance plus 128T" },
      { tier: "good", note: "Via third-party NAC integration" },
      { tier: "strong", note: "iMaster NCE-CampusInsight Trust" },
    ],
  },
  {
    label: "Wi-Fi 6E and 7 readiness",
    cells: [
      { tier: "best", note: "Catalyst CW9166 and Meraki MR57 lines" },
      { tier: "best", note: "AP-700 series Wi-Fi 7" },
      { tier: "excellent", note: "AP43, AP63 Wi-Fi 6E" },
      { tier: "good", note: "Limited Wi-Fi focus" },
      { tier: "excellent", note: "AirEngine Wi-Fi 7 series" },
    ],
  },
  {
    label: "UAE service and SLA",
    cells: [
      { tier: "best", note: "Largest direct UAE TAC presence" },
      { tier: "best", note: "Strong UAE field bench" },
      { tier: "excellent", note: "Growing UAE bench" },
      { tier: "strong", note: "Partner-led with global TAC" },
      { tier: "best", note: "Direct UAE TAC and spares" },
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
    title: "Cloud-managed or on-prem control plane?",
    desc: "Cloud-managed (Meraki, Aruba Central, Mist) reduces day-2 burden materially for thin IT teams. On-prem (DNA Center, Aruba Central on-prem) wins where data residency or air-gap is mandated.",
  },
  {
    num: "02",
    title: "Single vendor or best-of-breed?",
    desc: "Single-vendor stack (campus plus DC plus SD-WAN plus Wi-Fi) yields operational consolidation and commercial leverage. Best-of-breed wins on capability per layer but multiplies operational surface area.",
  },
  {
    num: "03",
    title: "Is AIOps the deciding factor?",
    desc: "If your IT team is under-resourced, Mist AI, DNA Center or Aruba NetInsight will materially change support economics. AIOps maturity is a real differentiator in 2026, not marketing.",
  },
  {
    num: "04",
    title: "Sovereignty and direct support?",
    desc: "For UAE banking, government and regulated industries, direct in-country TAC is now a procurement requirement. Cisco, HPE Aruba and Huawei lead this conversation today.",
  },
  {
    num: "05",
    title: "What is the WAN posture?",
    desc: "SD-WAN is now part of the network conversation, not separate. Catalyst SD-WAN and Aruba EdgeConnect dominate multi-site UAE deployments; Mist Session Smart Router is emerging fast.",
  },
  {
    num: "06",
    title: "Is Zero Trust at the port required?",
    desc: "Modern networks enforce identity at the port via NAC (ISE, ClearPass, Mist Access Assurance) and micro-segmentation. Pre-2018 designs that assume trust based on VLAN no longer pass audit.",
  },
];

/* ───────── UAE SERVICE & COMMERCIAL NOTES ───────── */

const uaeNotes = [
  "TDRA, NESA and sector frameworks expect documented network segmentation, NAC and audit trails.",
  "Cisco and HPE Aruba dominate the installed base; Huawei is the fastest-growing alternative in regulated industries.",
  "Cloud-managed networks (Meraki, Aruba Central) sometimes run into data-residency review for banking customers.",
  "Wi-Fi 7 deployments are now common in new builds; Wi-Fi 6E is the practical floor for any 2026 refresh.",
  "Catalyst SD-WAN and Aruba EdgeConnect dominate the multi-site SD-WAN conversation.",
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "Cisco or HPE Aruba for UAE campus?",
    answer:
      "Both are credible. Cisco wins where the existing estate is Cisco, where ISE NAC is in scope and where direct TAC depth matters most. HPE Aruba CX wins on price-performance, on cloud-managed simplicity (Aruba Central) and where GreenLake subscription is preferred. Mid-market UAE customers often choose Aruba; large enterprise and government often choose Cisco.",
  },
  {
    question: "Is Meraki the right answer for UAE branches?",
    answer:
      "Meraki MR / MS / MX is excellent for multi-site retail, healthcare, F&B and SMB. The cloud-managed model removes the need for local network engineering at every branch. For data-sovereignty regulated branches (banking compliance), confirm cloud-region residency.",
  },
  {
    question: "How does Mist AI compare to DNA Center?",
    answer:
      "Mist is AI-native from inception; DNA Center is mature Cisco automation with AI features added over time. For greenfield deployments with Wi-Fi as a primary concern, Mist typically wins. For brownfield Cisco estates, DNA Center is the natural continuation.",
  },
  {
    question: "Is Huawei a real option for UAE enterprises?",
    answer:
      "Yes, particularly for cost-sensitive large enterprises and government. Huawei has direct UAE TAC, strong campus and DC switching, and competitive SD-WAN. Some buyers face procurement constraints based on geopolitics; we assess this case by case.",
  },
  {
    question: "What is the typical network refresh cycle?",
    answer:
      "Five to seven years for campus, three to five years for data centre, two to three years for Wi-Fi access points (driven by standard generations). Subscription models (DNA, GreenLake, Mist) externalise the refresh decision and ship hardware as part of the service.",
  },
  {
    question: "Is Artiflex IT tied to a single network vendor?",
    answer:
      "No. We actively deliver Cisco, HPE Aruba, Juniper Mist, Arista, Huawei and Extreme across UAE projects. Vendor recommendation follows the campus, data-centre and WAN profile, not the inventory. Hardware and AIOps / NAC are sized as separate decisions.",
  },
  {
    question: "How do you approach Zero Trust at the port?",
    answer:
      "Identity-based policy at the switch port, enforced via NAC (ISE, ClearPass, Mist Access Assurance), is now baseline for 2026 designs. We pair this with micro-segmentation in the data centre (ACI, EVPN-VXLAN, Group Based Policy) and SD-WAN policy at the branch.",
  },
  {
    question: "Can you handle multi-site SD-WAN rollouts?",
    answer:
      "Yes. We deliver Catalyst SD-WAN, Meraki MX, Aruba EdgeConnect, Juniper Session Smart Router and Huawei NetEngine AR across UAE multi-site rollouts. Wave-based cutover, documented rollback, and integration with existing MPLS and DIA circuits are standard.",
  },
];

/* ───────── HERO ───────── */

function NetworkHero() {
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
                <span className="font-medium text-[#28B5E1]">Network Infrastructure</span>
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
            Network{" "}
            <span className="gradient-text">Infrastructure</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Buyer's Guide, Vendor Matrix and Gartner-style Scorecard
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            A UAE buyer's guide for enterprise switching, routing and SD-WAN. Honest comparisons across <span className="font-semibold text-white">Cisco Catalyst / Nexus, HPE Aruba CX, Juniper Mist, Arista, Huawei and Extreme Networks</span>, with a detailed scorecard and Artiflex recommendations grounded in UAE deployments.
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
              to="/blog/origin-network-infrastructure"
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
              Get a Free Network Assessment
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

export default function NetworkInfrastructure() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Network Infrastructure UAE | Buyer's Guide & Vendor Scorecard | Artiflex IT</title>
        <meta
          name="description"
          content="UAE buyer's guide for enterprise switching, routing and SD-WAN. Vendor matrix and Gartner-style scorecard across Cisco, HPE Aruba, Juniper Mist, Arista, Huawei and Extreme."
        />
        <link rel="canonical" href="https://artiflexit.com/infrastructure/network-infrastructure" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Artiflex IT",
            "url": "https://artiflexit.com/infrastructure/network-infrastructure",
            "areaServed": [
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "City", "name": "Dubai" },
              { "@type": "City", "name": "Abu Dhabi" },
            ],
            "description": "Vendor-neutral UAE buyer's guide for enterprise switching, routing and SD-WAN across Cisco, HPE Aruba, Juniper Mist, Arista, Huawei and Extreme.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Network Infrastructure Services",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description": "UAE campus switching, data-centre fabric, SD-WAN, Wi-Fi 6E/7 and NAC delivery across Cisco, HPE Aruba, Juniper Mist, Arista, Huawei and Extreme.",
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
            "name": "Network Infrastructure Vendors for UAE Buyers",
            "itemListElement": vendors.map((v, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <NetworkHero />

      {/* ───────── NETWORK VENDORS WE DELIVER (HONEYCOMB) ───────── */}
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
              Network{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Vendors
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The campus, data-centre and SD-WAN platforms we design, deploy and operate across UAE environments. Hardware, AIOps and NAC are sized as separate decisions.
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
                layouts[networkVendorList.length] ??
                [Math.ceil(networkVendorList.length / 2), Math.floor(networkVendorList.length / 2)];
              const rows: typeof networkVendorList[] = [];
              let i = 0;
              sizes.forEach((s) => {
                rows.push(networkVendorList.slice(i, i + s));
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
            {networkVendorList.map((v) => (
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
              {networkVendorList.length} platforms
            </span>
            , picked by campus, data-centre and WAN profile.
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
              Before any switching or routing proposal, walk through these questions. Most over-bought network projects assume the wrong density per closet or under-size the WAN aggregation.
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
              <span className="gradient-text">Network buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              Six vendors cover the majority of UAE enterprise network deployments. Each leads in some segments; the right pick follows your campus, data-centre and WAN profile.
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
              Detailed Comparison on Network Vendors
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Strengths, blind spots and the buyer profile each vendor was built for. Recommendations are grounded in UAE deployment patterns, not vendor tier.
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
              <span className="font-semibold text-white">Artiflex IT delivers Cisco, HPE Aruba, Juniper Mist, Arista, Huawei and Extreme</span> across UAE projects. <br />
              <span className="text-xs italic text-white sm:text-base">Vendor recommendation follows the assessment, not the inventory.</span>
            </p>
          </div>

          {/* Feature ratings */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Scorecard
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each vendor is rated across the capabilities that matter most for enterprise networking, using a standardised tier scale. A gold ★ marker denotes best-in-class performance.
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
              What changes when you buy network in the UAE
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Enterprise network decisions in the UAE have specific commercial and operational considerations.
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
              14+ years of UAE network delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when Cisco wins, when HPE Aruba wins, when Juniper Mist, Arista, Huawei or Extreme wins, and when none of them is the right answer.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years of UAE network delivery" },
              { value: "500+", label: "Projects delivered, GCC-wide" },
              { value: "6", label: "Network vendors actively delivered" },
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
                  Cisco Catalyst / Nexus / Meraki, HPE Aruba CX, Juniper Mist, Arista, Huawei and Extreme across campus, data centre, SD-WAN and Wi-Fi.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Compliance frameworks
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  TDRA, NESA, UAE PDPL, ISO 27001, NCA ECC and CBUAE-aligned designs with documented segmentation, NAC and audit trails.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Coverage area
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  On-site across Dubai, Abu Dhabi and Sharjah. Remote across the UAE, Oman and Saudi Arabia. 24/7 NOC for managed customers.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Engagement model
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  CapEx, subscription (DNA, GreenLake, Mist), fully managed or assessment-only. Engagement follows the assessment, not a vendor SKU.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#28B5E1] px-6 py-3 font-display text-sm font-semibold text-navy-deep transition-colors hover:bg-white sm:text-base"
            >
              Book a free network assessment
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
            description="What UAE buyers ask us most about campus switching, data-centre fabric, SD-WAN and AIOps."
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
        title="Free Network Assessment"
        description="60-minute review of your campus, data-centre and WAN posture, AIOps maturity and refresh roadmap. We will identify the highest-impact upgrades and propose a prioritised plan aligned to your operational team capacity."
        primaryButton={{ text: "Book Assessment", action: "modal" }}
      />
    </>
  );
}
