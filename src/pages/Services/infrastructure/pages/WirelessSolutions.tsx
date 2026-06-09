import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import DeliveryModel from "@/components/sections/DeliveryModel";

/* ───────── WIRELESS VENDORS (HONEYCOMB) ───────── */

const wirelessVendorList = [
  { slug: "cisco-meraki", name: "Cisco Meraki", logo: "/logos/Cisco.svg" },
  { slug: "hpe-aruba", name: "HPE Aruba", logo: "/logos/Hewlett.svg" },
  { slug: "juniper-mist", name: "Juniper Mist", logo: "/logos/JuniperMist.webp" },
  { slug: "ruckus", name: "Ruckus", logo: "/logos/Ruckus.png" },
  { slug: "huawei", name: "Huawei AirEngine", logo: "/logos/huawei.png" },
  { slug: "extreme-ubiquiti", name: "Extreme / Ubiquiti", logo: "/logos/Ubiquiti.png" },
];

/* ───────── BUYER'S GUIDE, SELECTION FRAMEWORK ───────── */

const selectionFramework = [
  {
    step: "1",
    question: "What is the wireless for?",
    capture: "Office hybrid work, public area (retail, hospitality), warehouse / industrial, voice over Wi-Fi, dense user environment (classroom, stadium), or IoT",
    why: "Each profile has different AP density, antenna and management needs.",
  },
  {
    step: "2",
    question: "Wi-Fi generation target?",
    capture: "Wi-Fi 6 (sufficient for most), Wi-Fi 6E (recommended floor for new builds), Wi-Fi 7 (future-proof, AR/VR-ready)",
    why: "Generation drives AP cost, switch port speed (multi-gig) and PoE budget.",
  },
  {
    step: "3",
    question: "AP count and density?",
    capture: "Total APs today plus three-year growth, density per square metre, expected concurrent clients",
    why: "Determines controller capacity and licensing; high density requires per-AP design rather than coverage-only.",
  },
  {
    step: "4",
    question: "Management plane?",
    capture: "Cloud-managed (Meraki, Aruba Central, Mist), on-prem controller (Cisco WLC, Aruba MM), or controllerless distributed",
    why: "Cloud-managed wins on operational simplicity; on-prem persists for data-residency.",
  },
  {
    step: "5",
    question: "Wireless-as-a-Service appetite?",
    capture: "Outright purchase, GreenLake / Network Subscription / Mist subscription, or fully managed",
    why: "Subscription with Wi-Fi included is now common; refresh cycles align with generation upgrades.",
  },
  {
    step: "6",
    question: "Outdoor and edge coverage?",
    capture: "Outdoor APs, public Wi-Fi, point-to-point links, mesh",
    why: "Outdoor needs IP67-rated APs; UAE climate adds dust and thermal load.",
  },
  {
    step: "7",
    question: "Security posture?",
    capture: "WPA3, NAC integration, IoT segmentation, captive portal, rogue AP detection",
    why: "Modern Wi-Fi treats security as native, not bolt-on.",
  },
];

/* ───────── SELECTION CRITERIA CHECKLIST ───────── */

const checklistGroups = [
  {
    title: "Technical fit",
    items: [
      "Wi-Fi 6E / 7 support",
      "6 GHz channel availability",
      "AP radio count and MU-MIMO",
      "Multi-gig PoE++",
      "Antenna design (indoor / outdoor / dense)",
      "BLE / Zigbee / IoT radios",
    ],
  },
  {
    title: "Operational fit",
    items: [
      "Cloud-managed dashboard",
      "AI-driven RF tuning",
      "Client experience telemetry",
      "Roaming and 802.11k/r/v",
      "Captive portal / guest",
      "Mobile app for site visits",
    ],
  },
  {
    title: "Commercial fit",
    items: [
      "Hardware + license bundle",
      "Subscription term and licensing tier",
      "Multi-year total cost",
      "Wi-Fi-as-a-service options",
    ],
  },
  {
    title: "Service fit",
    items: [
      "UAE in-country service",
      "RMA and spare AP options",
      "Site-survey capacity",
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
    slug: "cisco-meraki",
    name: "Cisco Catalyst Wi-Fi / Meraki",
    best: "Largest UAE Estate (Recommended)",
    strength: "Cisco wireless since 2005; Meraki acquired 2012. Catalyst CW9166 and Meraki MR57 are fully Wi-Fi 7. Meraki dashboard is the most-deployed cloud-managed Wi-Fi globally; ISE integration is the deepest in market. Stadium and high-density reference deployments; Meraki MR plus IoT Gateway lead the IoT story.",
    watch: "Catalyst plus Meraki dual SKUs add procurement complexity; subscription tiers benefit from a single licensing decision early.",
    logo: "/logos/Cisco.svg",
  },
  {
    slug: "hpe-aruba",
    name: "HPE Aruba Wi-Fi",
    best: "Best Enterprise Wi-Fi (Recommended)",
    strength: "Aruba founded 2002, HPE acquired 2015. AP-700 series ships Wi-Fi 7 at scale. AirMatch and User Experience Insight set the reference for RF tuning; AP-655 with mature OFDMA delivers best-in-class density. ClearPass is the strongest non-Cisco NAC. Aruba Central covers the full estate from one dashboard.",
    watch: "Mid-market customers sometimes find ClearPass operationally heavy; check Central data-residency for banking deployments.",
    logo: "/logos/Hewlett.svg",
  },
  {
    slug: "juniper-mist",
    name: "Juniper Mist",
    best: "Best AIOps (Recommended)",
    strength: "Mist founded 2014, Juniper acquired 2019. Mist Cloud is AI-native with the gold-standard telemetry and assurance. Mist excels in classroom and conference density. BLE built-in across the AP line; AP44 / AP64 Wi-Fi 7 rolling out. Mist Access Assurance pairs cleanly with Session Smart Router.",
    watch: "Wi-Fi 7 portfolio is still expanding; UAE field bench is growing rather than dominant; outdoor AP63 is solid rather than market-leading.",
    logo: "/logos/JuniperMist.webp",
  },
  {
    slug: "ruckus",
    name: "Ruckus (CommScope)",
    best: "Dense-RF Specialist",
    strength: "Ruckus founded 2004, CommScope acquired 2019. BeamFlex antenna technology delivers industry-leading dense RF; reference for stadium, hospitality and high-density carrier deployments. R770 Wi-Fi 7 capable; T-series outdoor mesh and Cloudpath NAC complete the stack.",
    watch: "Service motion is distributor-led with a smaller direct UAE bench; IoT and AI tooling are maturing rather than market-leading.",
    logo: "/logos/Ruckus.png",
  },
  {
    slug: "huawei",
    name: "Huawei AirEngine",
    best: "Best Carrier-Scale Density",
    strength: "Huawei wireless since 2003; full enterprise plus carrier stack. AirEngine 8761 Wi-Fi 7 leads density; AirEngine 5760 outdoor solid for harsh UAE environments. iMaster NCE-Campus AI is mature for Huawei estates with direct UAE TAC and spares depot.",
    watch: "Some UAE buyers face procurement constraints based on geopolitics; assess case by case. IoT and BLE story is less integrated than Cisco or Aruba.",
    logo: "/logos/huawei.png",
  },
  {
    slug: "extreme-ubiquiti",
    name: "Extreme / Ubiquiti",
    best: "Best for SMB & Vendor Consolidation",
    strength: "Extreme 1996 plus Ubiquiti 2005. Extreme AP5050 and Ubiquiti U7 Pro provide credible Wi-Fi 7 at competitive price points. ExtremeAnalytics covers basics; UniFi Console is the SMB reference. Strong fit where price-performance or single-vendor consolidation across campus and Wi-Fi is decisive.",
    watch: "Limited dense-RF expertise versus Ruckus or Cisco; Ubiquiti is online / channel-led with minimal direct UAE support; not the choice for regulated industries or AI-led operations.",
    logo: "/logos/Ubiquiti.png",
  },
];

/* ───────── VENDOR MATRIX (BUYER'S MATRIX) ───────── */

const matrixVendors = [
  { name: "Cisco Catalyst Wi-Fi / Meraki", recommended: true, rank: "#1" },
  { name: "HPE Aruba Wi-Fi", recommended: true },
  { name: "Juniper Mist", recommended: true },
  { name: "Ruckus (CommScope)" },
  { name: "Huawei AirEngine" },
  { name: "Extreme / Ubiquiti" },
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
      "Cisco wireless since 2005; Meraki acquired 2012",
      "Aruba founded 2002, HPE acquired 2015",
      "Mist founded 2014, Juniper acquired 2019",
      "Ruckus founded 2004, CommScope acquired 2019",
      "Huawei wireless since 2003, full enterprise stack",
      "Extreme 1996 plus Ubiquiti 2005 (SMB)",
    ],
  },
  {
    label: "Wi-Fi 7 readiness",
    type: "stars",
    cells: [
      { stars: 5, note: "Catalyst CW9166 and Meraki MR57" },
      { stars: 5, note: "AP-700 series" },
      { stars: 4, note: "AP44 / AP64 (rolling out)" },
      { stars: 4, note: "R770 Wi-Fi 7" },
      { stars: 5, note: "AirEngine 8761 Wi-Fi 7" },
      { stars: 4, note: "AP5050 / Ubiquiti U7 Pro" },
    ],
  },
  {
    label: "RF / AI tuning",
    type: "stars",
    cells: [
      { stars: 4, note: "RRM plus Meraki Auto RF" },
      { stars: 5, note: "AirMatch plus UX Insight" },
      { stars: 5, note: "Mist AI is the reference" },
      { stars: 4, note: "SmartZone analytics" },
      { stars: 4, note: "iMaster NCE-Campus AI" },
      { stars: 3, note: "ExtremeAnalytics / UniFi minimal" },
    ],
  },
  {
    label: "Management plane",
    type: "stars",
    cells: [
      { stars: 5, note: "Meraki + Catalyst Center options" },
      { stars: 5, note: "Aruba Central cloud" },
      { stars: 5, note: "Mist Cloud AI-native" },
      { stars: 4, note: "SmartZone, Cloudpath" },
      { stars: 4, note: "iMaster NCE-Campus" },
      { stars: 3, note: "ExtremeCloud IQ / UniFi Console" },
    ],
  },
  {
    label: "Dense / specialist coverage",
    type: "stars",
    cells: [
      { stars: 5, note: "Stadium and high-density reference" },
      { stars: 5, note: "AP-655 high density, OFDMA mature" },
      { stars: 4, note: "Mist excels in classroom / conference" },
      { stars: 5, note: "Ruckus BeamFlex strongest dense RF" },
      { stars: 4, note: "Strong dense designs in carriers" },
      { stars: 3, note: "Limited dense expertise" },
    ],
  },
  {
    label: "Outdoor and edge",
    type: "stars",
    cells: [
      { stars: 5, note: "CW9162D outdoor, Meraki MR outdoor" },
      { stars: 5, note: "AP-377 / 575 outdoor mature" },
      { stars: 4, note: "AP63 outdoor" },
      { stars: 5, note: "T-series outdoor mesh" },
      { stars: 4, note: "AirEngine 5760 outdoor" },
      { stars: 4, note: "Extreme / UniFi outdoor" },
    ],
  },
  {
    label: "IoT / BLE / Zigbee",
    type: "stars",
    cells: [
      { stars: 5, note: "Meraki MR plus IoT Gateway" },
      { stars: 5, note: "Aruba IoT-ready APs, USB" },
      { stars: 4, note: "BLE built-in across line" },
      { stars: 4, note: "IoT capabilities maturing" },
      { stars: 3, note: "Limited IoT integration" },
      { stars: 3, note: "Limited" },
    ],
  },
  {
    label: "UAE service footprint",
    type: "stars",
    cells: [
      { stars: 5, note: "Largest direct UAE service" },
      { stars: 5, note: "Strong UAE bench" },
      { stars: 4, note: "Growing UAE bench" },
      { stars: 4, note: "Distributor-led" },
      { stars: 5, note: "Direct UAE TAC" },
      { stars: 3, note: "Limited / online only (Ubiquiti)" },
    ],
  },
  {
    label: "Best suited for",
    type: "text",
    cells: [
      "Largest UAE installed base, stadium and dense enterprise",
      "Enterprise Wi-Fi with mature NAC and AirMatch RF",
      "AIOps-led greenfield campus and Wi-Fi-first refreshes",
      "Stadium, hospitality and high-density carrier deployments",
      "Cost-sensitive enterprise, carrier-scale density",
      "SMB, franchise retail, vendor-consolidation refreshes",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "Largest UAE estate, deepest service bench, broadest Wi-Fi 7 portfolio." },
      { recommended: true, text: "Best enterprise Wi-Fi with mature ClearPass and AirMatch; Aruba Central covers the full estate." },
      { recommended: true, text: "Best AIOps with Mist AI; cleanest greenfield campus refresh path." },
      { text: "Best dense-RF heritage; default for stadium, hospitality and carrier deployments." },
      { text: "Best carrier-scale density; assess geopolitical procurement case by case." },
      { text: "Best SMB and franchise retail value; vendor-consolidation play for campus + Wi-Fi." },
    ],
  },
];

/* ───────── GARTNER-STYLE CAPABILITY SCORECARD ───────── */

const featureVendors = [
  "Cisco / Meraki",
  "HPE Aruba",
  "Juniper Mist",
  "Ruckus",
  "Huawei",
];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "Wi-Fi 7 readiness",
    cells: [
      { tier: "best", note: "CW9166 / MR57 fully Wi-Fi 7" },
      { tier: "best", note: "AP-700 series ships at scale" },
      { tier: "excellent", note: "AP44 / AP64 rolling out" },
      { tier: "excellent", note: "R770 Wi-Fi 7 capable" },
      { tier: "best", note: "AirEngine 8761 leads density" },
    ],
  },
  {
    label: "AI RF tuning",
    cells: [
      { tier: "excellent", note: "RRM plus Meraki Auto RF" },
      { tier: "best", note: "AirMatch and UXI are reference" },
      { tier: "best", note: "Mist AI is the gold standard" },
      { tier: "excellent", note: "SmartZone analytics solid" },
      { tier: "excellent", note: "iMaster NCE-Campus AI" },
    ],
  },
  {
    label: "Cloud-managed dashboard",
    cells: [
      { tier: "best", note: "Meraki dashboard most-deployed globally" },
      { tier: "best", note: "Aruba Central covers full estate" },
      { tier: "best", note: "Mist Cloud AI-native" },
      { tier: "excellent", note: "SmartZone Cloud capable" },
      { tier: "excellent", note: "iMaster NCE-Campus solid" },
    ],
  },
  {
    label: "Dense / high-density RF",
    cells: [
      { tier: "best", note: "Stadium and arena reference" },
      { tier: "best", note: "AP-655 plus AirMatch" },
      { tier: "excellent", note: "Mist excels in classroom density" },
      { tier: "best", note: "Ruckus BeamFlex industry-leading" },
      { tier: "excellent", note: "Strong dense at carrier scale" },
    ],
  },
  {
    label: "Outdoor / harsh environment",
    cells: [
      { tier: "best", note: "Outdoor MR and CW9162D mature" },
      { tier: "best", note: "AP-577 outdoor reference" },
      { tier: "excellent", note: "AP63 outdoor capable" },
      { tier: "best", note: "T-series outdoor mesh" },
      { tier: "excellent", note: "AirEngine 5760 outdoor solid" },
    ],
  },
  {
    label: "IoT and BLE",
    cells: [
      { tier: "best", note: "Meraki IoT plus integrated radios" },
      { tier: "best", note: "IoT-ready APs across portfolio" },
      { tier: "excellent", note: "BLE built-in across line" },
      { tier: "excellent", note: "Maturing IoT integration" },
      { tier: "strong", note: "Limited IoT story" },
    ],
  },
  {
    label: "Security and NAC integration",
    cells: [
      { tier: "best", note: "ISE integration deepest" },
      { tier: "best", note: "ClearPass mature NAC" },
      { tier: "excellent", note: "Mist Access Assurance" },
      { tier: "excellent", note: "Cloudpath NAC capable" },
      { tier: "strong", note: "iMaster NCE-CampusInsight Trust" },
    ],
  },
  {
    label: "UAE service and SLA",
    cells: [
      { tier: "best", note: "Largest direct service" },
      { tier: "best", note: "Strong UAE bench" },
      { tier: "excellent", note: "Growing UAE bench" },
      { tier: "strong", note: "Distributor-led" },
      { tier: "best", note: "Direct UAE TAC" },
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
    title: "Cloud-managed or on-prem controller?",
    desc: "Cloud-managed (Meraki, Aruba Central, Mist) wins for multi-site, distributed and thin IT teams. On-prem controller (Cisco WLC, Aruba MM, SmartZone on-prem) wins for sovereignty-regulated environments.",
  },
  {
    num: "02",
    title: "Wi-Fi 6E or Wi-Fi 7?",
    desc: "Wi-Fi 6E is the practical floor for any 2026 deployment. Wi-Fi 7 is the right choice for new builds with three-plus year refresh horizons and AR/VR or AI workload roadmaps.",
  },
  {
    num: "03",
    title: "Is AI-driven operations a buying criterion?",
    desc: "If you are under-resourced for Wi-Fi tuning, AI-native platforms (Mist, Aruba User Experience Insight, Meraki AI) materially reduce day-2 burden.",
  },
  {
    num: "04",
    title: "Density or coverage?",
    desc: "Dense environments (classrooms, stadiums, dense offices) need per-AP RF planning rather than coverage maps. Ruckus, Cisco and Aruba have the deepest dense-RF heritage.",
  },
  {
    num: "05",
    title: "Indoor only or outdoor / harsh environment?",
    desc: "Outdoor UAE deployments must account for dust, heat and humidity; IP67-rated APs and thermal management are mandatory. Cisco, HPE Aruba and Ruckus lead outdoor design.",
  },
  {
    num: "06",
    title: "Is IoT, BLE or location services in scope?",
    desc: "Meraki and Aruba ship IoT-ready APs with integrated radios and gateways. Mist has BLE across the line for location services. If IoT is decisive, this narrows the shortlist quickly.",
  },
];

/* ───────── UAE SERVICE & COMMERCIAL NOTES ───────── */

const uaeNotes = [
  "6 GHz Wi-Fi 6E and Wi-Fi 7 are licensed under TDRA frameworks; ensure AP firmware compliance for UAE.",
  "Outdoor AP design must account for high dust, heat and humidity (IP67 rating, thermal management).",
  "UAE retail, hospitality and stadia are dense-RF use cases; site survey is mandatory.",
  "Cisco, HPE Aruba and Huawei have the strongest direct UAE service benches.",
  "Subscription-included Wi-Fi (Meraki, Aruba Central, Mist) simplifies multi-site procurement.",
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "Meraki or Aruba Central for UAE multi-site?",
    answer:
      "Both are credible. Meraki wins on simplicity and time-to-value; Aruba Central wins on capability depth and integration with the broader Aruba campus stack. For SMB and franchise retail, Meraki usually wins; for mid-market and enterprise, Aruba is often the better fit.",
  },
  {
    question: "Is Mist worth the premium?",
    answer:
      "For greenfield deployments with Wi-Fi as a primary concern (offices, education, healthcare), Mist AI typically returns its premium through reduced support tickets and faster troubleshooting. For brownfield Cisco or Aruba estates, the integration cost usually means continuing on the existing vendor.",
  },
  {
    question: "Wi-Fi 6E or wait for Wi-Fi 7?",
    answer:
      "Wi-Fi 7 access points are shipping at scale in 2026; the price premium has narrowed. For any new build or three-plus year refresh, Wi-Fi 7 is the right call. For tactical refreshes with limited budget, Wi-Fi 6E remains a credible step.",
  },
  {
    question: "Is Ubiquiti enterprise-grade?",
    answer:
      "Ubiquiti UniFi is an excellent SMB and small mid-market platform. For enterprise (regulated industries, large estates, sovereignty mandates, direct TAC) the larger vendors are the right answer. We deliver UniFi where the use case fits.",
  },
  {
    question: "What is the typical Wi-Fi refresh cycle?",
    answer:
      "Three to five years, generally aligned with Wi-Fi generations. Wi-Fi 6 (2019), Wi-Fi 6E (2021), Wi-Fi 7 (2024-25), Wi-Fi 8 (2028+). Subscription models bundle the refresh into ongoing service.",
  },
  {
    question: "Do you handle site surveys for UAE deployments?",
    answer:
      "Yes. Predictive surveys (Ekahau, Hamina), passive surveys and active surveys with iPerf and validation walks are standard practice. For dense and outdoor UAE deployments, site survey discipline often matters more to real-world outcomes than vendor choice.",
  },
  {
    question: "Is Artiflex IT tied to a single wireless vendor?",
    answer:
      "No. We actively deliver Cisco Catalyst Wi-Fi / Meraki, HPE Aruba, Juniper Mist, Ruckus, Huawei AirEngine, Extreme and Ubiquiti across UAE projects. Recommendation follows the density, use case and operational model, not the inventory.",
  },
  {
    question: "Can you support outdoor and harsh-environment Wi-Fi?",
    answer:
      "Yes. IP67-rated outdoor APs, point-to-point links and mesh designs are routine engagements. UAE dust, heat and humidity drive thermal management and enclosure selection alongside RF planning.",
  },
];

/* ───────── HERO ───────── */

function WirelessHero() {
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
                <span className="font-medium text-[#28B5E1]">Wireless Solutions</span>
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
            Wireless{" "}
            <span className="gradient-text">Solutions</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Buyer's Guide, Vendor Matrix and Gartner-style Scorecard
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            A UAE buyer's guide for enterprise wireless. Honest comparisons across <span className="font-semibold text-white">Cisco Catalyst Wi-Fi / Meraki, HPE Aruba, Juniper Mist, Ruckus (CommScope), Huawei AirEngine, Extreme and Ubiquiti</span>, with a detailed scorecard and Artiflex recommendations.
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
              to="/blog/origin-wireless-solutions"
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
              Get a Free Wireless Assessment
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

export default function WirelessSolutions() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Wireless Solutions UAE | Buyer's Guide & Vendor Scorecard | Artiflex IT</title>
        <meta
          name="description"
          content="UAE buyer's guide for enterprise Wi-Fi. Vendor matrix and Gartner-style scorecard across Cisco Meraki, HPE Aruba, Juniper Mist, Ruckus, Huawei AirEngine, Extreme and Ubiquiti."
        />
        <link rel="canonical" href="https://artiflexit.com/infrastructure/wireless-solutions" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Artiflex IT",
            "url": "https://artiflexit.com/infrastructure/wireless-solutions",
            "areaServed": [
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "City", "name": "Dubai" },
              { "@type": "City", "name": "Abu Dhabi" },
            ],
            "description": "Vendor-neutral UAE buyer's guide for enterprise wireless across Cisco, HPE Aruba, Juniper Mist, Ruckus, Huawei, Extreme and Ubiquiti.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Wireless Solutions",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description": "UAE enterprise Wi-Fi 6E and Wi-Fi 7 design, deployment and managed services across Cisco, HPE Aruba, Juniper Mist, Ruckus, Huawei and Extreme.",
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
            "name": "Wireless Vendors for UAE Buyers",
            "itemListElement": vendors.map((v, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <WirelessHero />

      {/* ───────── WIRELESS VENDORS WE DELIVER (HONEYCOMB) ───────── */}
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
              Wireless{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Vendors
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The Wi-Fi platforms we design, survey, deploy and operate across UAE projects. Indoor, outdoor, dense and IoT use cases all picked by your environment, not a brochure.
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
                layouts[wirelessVendorList.length] ??
                [Math.ceil(wirelessVendorList.length / 2), Math.floor(wirelessVendorList.length / 2)];
              const rows: typeof wirelessVendorList[] = [];
              let i = 0;
              sizes.forEach((s) => {
                rows.push(wirelessVendorList.slice(i, i + s));
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
            {wirelessVendorList.map((v) => (
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
              {wirelessVendorList.length} platforms
            </span>
            , picked by density, use case and operational model.
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
              Before any wireless proposal, walk through these questions. Most over-budget Wi-Fi projects buy too many APs at the wrong class without a proper site survey.
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
              <span className="gradient-text">Wireless buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              Six vendor families cover most UAE enterprise wireless. Cisco, HPE Aruba and Juniper Mist lead enterprise; Ruckus, Huawei and Extreme are strong specialists; Ubiquiti dominates SMB.
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
              Detailed Comparison on Wireless Vendors
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Strengths, blind spots and the buyer profile each vendor was built for. Site-survey and RF design discipline often matters more than vendor choice for real-world Wi-Fi outcomes.
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
              <span className="font-semibold text-white">Artiflex IT delivers Cisco Meraki, HPE Aruba, Juniper Mist, Ruckus, Huawei AirEngine, Extreme and Ubiquiti</span> across UAE projects. <br />
              <span className="text-xs italic text-white sm:text-base">Site-survey and RF discipline often matters more than vendor choice for real-world outcomes.</span>
            </p>
          </div>

          {/* Feature ratings */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Scorecard
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each vendor is rated across the capabilities that matter most for enterprise Wi-Fi, using a standardised tier scale. A gold ★ marker denotes best-in-class performance.
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
              What changes when you deploy Wi-Fi in the UAE
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              UAE wireless deployments carry specific climate, regulatory and use-case considerations.
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
              14+ years of UAE wireless delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when Cisco Meraki wins, when HPE Aruba wins, when Mist, Ruckus, Huawei AirEngine or Ubiquiti wins, and when none of them is the right answer. Site-survey discipline is non-negotiable.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years of UAE Wi-Fi delivery" },
              { value: "500+", label: "Projects delivered, GCC-wide" },
              { value: "7", label: "Wireless vendors actively delivered" },
              { value: "Wi-Fi 7", label: "Ready across the portfolio" },
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
                  Cisco Catalyst Wi-Fi / Meraki, HPE Aruba, Juniper Mist, Ruckus (CommScope), Huawei AirEngine, Extreme and Ubiquiti, indoor, outdoor and dense use cases.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Site survey
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Predictive (Ekahau, Hamina), passive and active surveys with validation walks. Mandatory for dense and outdoor UAE deployments.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Coverage area
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  On-site across Dubai, Abu Dhabi and Sharjah. Remote across the UAE, Oman and Saudi Arabia. Managed services for multi-site retail and hospitality.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Engagement model
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  CapEx, subscription (Meraki, Aruba Central, Mist) or fully managed. Wi-Fi-as-a-Service options available where preferred.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#28B5E1] px-6 py-3 font-display text-sm font-semibold text-navy-deep transition-colors hover:bg-white sm:text-base"
            >
              Book a free Wi-Fi assessment
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
            description="What UAE buyers ask us most about enterprise Wi-Fi, density, outdoor and AIOps."
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
        title="Free Wireless Assessment"
        description="Free Wi-Fi posture review including a basic site-survey appraisal, AP count and class, security posture and refresh horizon. We will identify density gaps and propose a prioritised plan aligned to your team capacity."
        primaryButton={{ text: "Book Assessment", action: "modal" }}
      />
    </>
  );
}
