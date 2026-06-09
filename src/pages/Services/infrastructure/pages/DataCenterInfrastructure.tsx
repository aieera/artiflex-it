import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import DeliveryModel from "@/components/sections/DeliveryModel";

/* ───────── DATA CENTER VENDORS (HONEYCOMB) ───────── */

const dcVendorList = [
  { slug: "schneider-electric", name: "Schneider Electric", logo: "/logos/SchneiderElectric.png" },
  { slug: "vertiv", name: "Vertiv", logo: "/logos/Vertiv.png" },
  { slug: "eaton", name: "Eaton", logo: "/logos/Eaton.png" },
  { slug: "rittal", name: "Rittal", logo: "/logos/rittal.png" },
  { slug: "huawei", name: "Huawei", logo: "/logos/huawei.png" },
  { slug: "legrand", name: "Legrand", logo: "/logos/Legrand.png" },
];

/* ───────── BUYER'S GUIDE, SELECTION FRAMEWORK ───────── */

const selectionFramework = [
  {
    step: "1",
    question: "What is the data centre for?",
    capture: "Production primary, secondary DR site, edge / branch micro DC, colocation cage, modular / containerised, or hyperscale build",
    why: "Each use case has a natural redundancy class (Tier II / III / IV) and a natural vendor shortlist.",
  },
  {
    step: "2",
    question: "What is the design IT load (kW per rack and total)?",
    capture: "Average and peak kW per rack today plus three-year growth; total IT load in kW or MW",
    why: "Drives cooling architecture (perimeter CRAH vs in-row vs rear-door heat exchanger vs liquid) and power topology (busway vs floor PDU).",
  },
  {
    step: "3",
    question: "What is the redundancy target?",
    capture: "Uptime Institute Tier II, III, IV or TIA-942 Rated 1-4; N, N+1, 2N",
    why: "Redundancy drives almost everything: dual power paths, redundant cooling, generator topology, fuel storage, maintenance windows.",
  },
  {
    step: "4",
    question: "Hot-aisle / cold-aisle containment?",
    capture: "Hot-aisle containment, cold-aisle containment, chimney enclosures, or no containment",
    why: "Containment is the single biggest determinant of cooling efficiency (PUE) and capacity per kW of cooling input.",
  },
  {
    step: "5",
    question: "DCIM and monitoring posture?",
    capture: "Vendor-native DCIM (EcoStruxure, Trellis, Brightlayer), third-party (Sunbird, Nlyte) or basic environmental monitoring",
    why: "Operational maturity at 100+ racks is impossible without proper DCIM; the choice frames the next decade of operations.",
  },
  {
    step: "6",
    question: "Commercial model?",
    capture: "CapEx purchase, OpEx / service-managed, modular per-rack growth, colocation lease, or hyperscale design-build",
    why: "Modern data-centre infrastructure increasingly ships as a service. Schneider, Vertiv and Eaton all offer consumption pricing for select segments.",
  },
  {
    step: "7",
    question: "Compliance and certification target?",
    capture: "Uptime Institute certification, NESA, UAE PDPL, ISO 27001, TIA-942, LEED / green DC",
    why: "Certification mandates specific monitoring, redundancy and documentation that must be designed in, not added later.",
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

/* ───────── SELECTION CRITERIA CHECKLIST ───────── */

const checklistGroups = [
  {
    title: "Power and electrical",
    items: [
      "UPS topology (line-interactive vs double-conversion)",
      "Modular UPS vs monolithic",
      "Battery technology (VRLA vs Li-ion)",
      "Static switch and STS quality",
      "Busway vs floor PDU",
      "Rack PDU intelligence (metered, switched)",
      "Generator sizing and fuel storage",
    ],
  },
  {
    title: "Cooling and thermal",
    items: [
      "Perimeter CRAH / CRAC vs in-row vs rear-door heat exchanger",
      "Chilled water vs DX vs evaporative",
      "Hot-aisle / cold-aisle containment",
      "Liquid cooling readiness for AI loads",
      "PUE target and reality",
      "Free-cooling design for UAE climate",
    ],
  },
  {
    title: "Operational and DCIM",
    items: [
      "Asset tracking and rack capacity planning",
      "Environmental sensors (temperature, humidity, leak)",
      "Power capacity forecasting",
      "Workflow / change management",
      "Single pane across power, cooling, space",
      "Open APIs and SNMP / Modbus integration",
    ],
  },
  {
    title: "Commercial and service",
    items: [
      "UAE in-country engineering bench",
      "4-hour critical-spare SLA across Emirates",
      "Battery / capacitor refresh program",
      "Vendor-managed service options",
      "Local spares depot",
      "Predictive maintenance via AIOps",
    ],
  },
];

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
    slug: "schneider-electric",
    name: "Schneider Electric (APC)",
    best: "Broadest Portfolio (Recommended)",
    strength: "1836 Schneider plus 1981 APC heritage; Galaxy V-series UPS, Uniflair cooling, NetShelter SX racks, EcoAisle containment and EcoStruxure IT DCIM. Largest UAE in-country engineering team, deepest spares depot, EcoStruxure As-a-Service available.",
    watch: "Best-of-breed breadth means SKU sprawl; engagement model needs a clear single-pane DCIM decision early.",
    logo: "/logos/SchneiderElectric.png",
  },
  {
    slug: "vertiv",
    name: "Vertiv (Liebert)",
    best: "Best for Thermal & AI Density (Recommended)",
    strength: "1965 Liebert thermal pioneer. Liebert APM and Trinergy UPS, CRV and DSE cooling, XDU liquid validated for AI, SmartMod and SmartAisle modular. Deepest UAE field bench for cooling-led builds, mature Trellis and Environet DCIM.",
    watch: "Premium positioning on thermal; less competitive when the room is power-heavy rather than cooling-heavy.",
    logo: "/logos/Vertiv.png",
  },
  {
    slug: "eaton",
    name: "Eaton",
    best: "Best for Electrical Heritage (Recommended)",
    strength: "1911 UPS specialist with the deepest electrical heritage. 9395X and 93PM G2 are the reference for large-MW redundancy. Brightlayer Data Centers is the modern DCIM stack, Power Xpert tooling and PowerAdvantage consumption pricing in select markets.",
    watch: "Cooling portfolio relies on partner ecosystem rather than direct ownership; modular delivered through partner channels.",
    logo: "/logos/Eaton.png",
  },
  {
    slug: "rittal",
    name: "Rittal",
    best: "Best for Racks & Enclosures (Recommended)",
    strength: "1961 German enclosure leader. TS IT and VX25 set the global rack reference. LCP in-row, in-rack chillers and RiMatrix modular, plus direct-to-chip and heat-exchanger integration for high-density and industrial environments.",
    watch: "UPS is supplied via portfolio partnerships rather than in-house; DCIM is monitoring-focused rather than a full platform.",
    logo: "/logos/rittal.png",
  },
  {
    slug: "huawei",
    name: "Huawei",
    best: "Best PUE & Modular Scale",
    strength: "Full data-centre stack including FusionCol indirect-evaporative cooling (industry-leading PUE), FusionModule containerised DC at hyperscale, FusionPod direct-to-chip for AI and UPS5000 modular. Direct UAE presence with a large field bench and spares depot.",
    watch: "DCIM and management tooling is strongest when the estate is Huawei-end-to-end; mixed-vendor estates lose some Fusion DC Manager value.",
    logo: "/logos/huawei.png",
  },
  {
    slug: "legrand",
    name: "Legrand",
    best: "Best for PDU & Cabling",
    strength: "1865 heritage in rack PDU and structured cabling. Mighty Mo and Linkeo widely deployed; Server Technology PRO4X intelligent PDUs; Keor UPS via portfolio. Strong distributor-led UAE service network for PDU-centric builds.",
    watch: "Limited cooling and modular range; not the choice for a turnkey thermal-plus-power data-centre build.",
    logo: "/logos/Legrand.png",
  },
];

/* ───────── VENDOR MATRIX (BUYER'S MATRIX) ───────── */

const matrixVendors = [
  { name: "Schneider Electric (APC)", recommended: true, rank: "#1" },
  { name: "Vertiv (Liebert)", recommended: true },
  { name: "Eaton", recommended: true },
  { name: "Rittal", recommended: true },
  { name: "Huawei" },
  { name: "Legrand" },
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
      "1836 Schneider plus 1981 APC; broadest data-centre portfolio",
      "1965 Liebert thermal pioneer; spun out of Emerson in 2016",
      "1911; UPS specialist with deep electrical heritage",
      "1961; German rack and enclosure leader",
      "1987; full data-centre stack including modular DC",
      "1865; rack PDU and structured cabling leader",
    ],
  },
  {
    label: "UPS portfolio",
    type: "stars",
    cells: [
      { stars: 5, note: "Galaxy V-series, Smart-UPS, Symmetra" },
      { stars: 5, note: "Liebert APM, Trinergy, EXS, GXT" },
      { stars: 5, note: "9395X, 93PM G2, Power Xpert" },
      { stars: 3, note: "PSM via partnerships" },
      { stars: 4, note: "UPS5000 modular series" },
      { stars: 3, note: "Keor via portfolio" },
    ],
  },
  {
    label: "Cooling portfolio",
    type: "stars",
    cells: [
      { stars: 5, note: "Uniflair, in-row, RDHx, immersion" },
      { stars: 5, note: "Liebert CRV, DSE, XDU liquid" },
      { stars: 4, note: "Through partners and portfolio" },
      { stars: 4, note: "LCP in-row, in-rack chillers" },
      { stars: 5, note: "FusionCol indirect evaporative" },
      { stars: 3, note: "Cabinet-cooling accessories" },
    ],
  },
  {
    label: "Racks and containment",
    type: "stars",
    cells: [
      { stars: 5, note: "NetShelter SX, EcoAisle containment" },
      { stars: 4, note: "Knurr, Smart Cabinets" },
      { stars: 4, note: "Rasilient and Tripp Lite" },
      { stars: 5, note: "TS IT, VX25; reference quality" },
      { stars: 4, note: "Indoor cabinet plus prefab" },
      { stars: 4, note: "Mighty Mo, Linkeo" },
    ],
  },
  {
    label: "DCIM platform",
    type: "stars",
    cells: [
      { stars: 5, note: "EcoStruxure IT, Power Monitoring Expert" },
      { stars: 5, note: "Trellis, Environet, Avocent" },
      { stars: 4, note: "Brightlayer Data Centers" },
      { stars: 3, note: "RiMatrix monitoring" },
      { stars: 4, note: "Fusion DC Manager" },
      { stars: 3, note: "Server Technology PRO4X" },
    ],
  },
  {
    label: "Modular / prefab DC",
    type: "stars",
    cells: [
      { stars: 5, note: "Galaxy modular, EcoBlox" },
      { stars: 5, note: "SmartMod, SmartRow, SmartAisle" },
      { stars: 3, note: "Through partners" },
      { stars: 4, note: "RiMatrix modular" },
      { stars: 5, note: "FusionModule containerised" },
      { stars: 3, note: "Limited modular offering" },
    ],
  },
  {
    label: "Subscription / as-a-service",
    type: "stars",
    cells: [
      { stars: 4, note: "EcoStruxure As-a-Service" },
      { stars: 4, note: "Vertiv Power and Cooling Services" },
      { stars: 3, note: "PowerAdvantage select markets" },
      { stars: 3, note: "Limited" },
      { stars: 3, note: "Project-based" },
      { stars: 3, note: "Limited" },
    ],
  },
  {
    label: "UAE service footprint",
    type: "stars",
    cells: [
      { stars: 5, note: "Largest in-country team" },
      { stars: 5, note: "Deep field engineering bench" },
      { stars: 4, note: "Mature local partner network" },
      { stars: 4, note: "Strong via partners" },
      { stars: 5, note: "Direct presence, large team" },
      { stars: 4, note: "Distributor-led" },
    ],
  },
  {
    label: "Best suited for",
    type: "text",
    cells: [
      "Broadest portfolio, Tier II to Tier IV builds",
      "Cooling-led builds and AI density retrofits",
      "Large-MW electrical-led builds",
      "High-density racks and industrial environments",
      "Modular, prefab and PUE-led hyperscale",
      "PDU-centric and structured-cabling-led builds",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "Broadest portfolio, deepest UAE bench, EcoStruxure IT is the most-deployed DCIM in the market." },
      { recommended: true, text: "Thermal reference for the industry; default pick when cooling architecture drives the design." },
      { recommended: true, text: "Reference electrical heritage; default pick for large-MW redundancy and brownfield power retrofits." },
      { recommended: true, text: "Global rack reference; default pick when high-density enclosures and integrated thermal matter most." },
      { text: "Industry-leading PUE on FusionCol; FusionModule wins on prefab scale and Huawei-end-to-end estates." },
      { text: "PDU and cabling specialist; pick when the build is PDU-centric rather than a turnkey thermal-plus-power package." },
    ],
  },
];

/* ───────── GARTNER-STYLE CAPABILITY SCORECARD ───────── */

const featureVendors = [
  "Schneider Electric",
  "Vertiv",
  "Eaton",
  "Rittal",
  "Huawei",
];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "UPS quality and breadth",
    cells: [
      { tier: "best", note: "Galaxy V-series and Symmetra cover edge to MW" },
      { tier: "best", note: "Liebert APM and Trinergy span all classes" },
      { tier: "best", note: "9395X is reference for large-MW redundancy" },
      { tier: "good", note: "PSM line via portfolio" },
      { tier: "excellent", note: "UPS5000 modular, strong value" },
    ],
  },
  {
    label: "Cooling architecture",
    cells: [
      { tier: "best", note: "Uniflair and InRow span all density classes" },
      { tier: "best", note: "Legacy reference for thermal design" },
      { tier: "strong", note: "Strong via portfolio and partner ecosystem" },
      { tier: "excellent", note: "LCP in-row, reference enclosure thermal" },
      { tier: "best", note: "FusionCol and indirect evap lead efficiency" },
    ],
  },
  {
    label: "Containment and racks",
    cells: [
      { tier: "excellent", note: "NetShelter and EcoAisle widely deployed" },
      { tier: "excellent", note: "Knurr cabinets, mature containment" },
      { tier: "strong", note: "Solid options via portfolio" },
      { tier: "best", note: "TS IT and VX25 are the global reference" },
      { tier: "excellent", note: "Indoor cabinets and prefab integrated" },
    ],
  },
  {
    label: "DCIM platform depth",
    cells: [
      { tier: "best", note: "EcoStruxure IT is the most-deployed DCIM" },
      { tier: "best", note: "Trellis and Environet, deep field heritage" },
      { tier: "excellent", note: "Brightlayer modern stack, growing fast" },
      { tier: "good", note: "Monitoring only, not full DCIM" },
      { tier: "excellent", note: "Fusion DC Manager, Huawei estates" },
    ],
  },
  {
    label: "AI / high-density readiness",
    cells: [
      { tier: "excellent", note: "Immersion and rear-door HX options" },
      { tier: "best", note: "XDU liquid and rear-door HX, AI-validated" },
      { tier: "strong", note: "Roadmap heavy on AI cooling for 2025+" },
      { tier: "excellent", note: "Direct-to-chip and HX integrated" },
      { tier: "excellent", note: "FusionPod direct-to-chip platform" },
    ],
  },
  {
    label: "Modular and prefab",
    cells: [
      { tier: "excellent", note: "EcoBlox and Galaxy modular at scale" },
      { tier: "best", note: "SmartMod and SmartAisle are the reference" },
      { tier: "good", note: "Through partner channels" },
      { tier: "excellent", note: "RiMatrix is mature and well-engineered" },
      { tier: "best", note: "FusionModule containerised, hyperscale" },
    ],
  },
  {
    label: "UAE service and SLA",
    cells: [
      { tier: "best", note: "Largest local engineering team" },
      { tier: "best", note: "Deep field bench across all Emirates" },
      { tier: "excellent", note: "Strong partner-led service" },
      { tier: "excellent", note: "Strong via specialist partners" },
      { tier: "best", note: "Direct field bench and spares depot" },
    ],
  },
  {
    label: "Sustainability and PUE",
    cells: [
      { tier: "best", note: "EcoStruxure energy reporting, PUE leader" },
      { tier: "excellent", note: "CFD-driven cooling optimisation" },
      { tier: "strong", note: "Solid sustainability story" },
      { tier: "strong", note: "Efficient enclosure design" },
      { tier: "best", note: "Industry-leading PUE on FusionCol" },
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
    title: "Are we designing for AI / high-density workloads?",
    desc: "AI workloads at 30+ kW per rack drive cooling architecture. Liquid (direct-to-chip or immersion) and rear-door heat exchangers move from option to requirement. Vertiv, Schneider and Huawei lead this conversation today.",
  },
  {
    num: "02",
    title: "How important is single-pane DCIM at our rack count?",
    desc: "At 50+ racks, DCIM stops being optional. EcoStruxure IT (Schneider) and Trellis (Vertiv) are the most mature platforms; Brightlayer is the modern Eaton stack. Mixed-vendor estates usually need a vendor-neutral specialist alongside.",
  },
  {
    num: "03",
    title: "Is the in-country UAE service bench decisive for us?",
    desc: "For mission-critical sites, the in-country field bench matters more than the brochure. Schneider, Vertiv and Huawei have the largest direct UAE benches; Eaton and Rittal are strong via partners.",
  },
  {
    num: "04",
    title: "Modular or conventional, CapEx or as-a-service?",
    desc: "If CapEx is constrained or growth is uncertain, prefabricated modular plus consumption pricing (EcoStruxure As-a-Service, Vertiv Power and Cooling Services) materially de-risks the buy.",
  },
  {
    num: "05",
    title: "What is the redundancy and certification target?",
    desc: "Uptime Institute Tier III is the practical sweet spot for most UAE mid-market and enterprise primary sites. Tier IV is reserved for genuinely critical national infrastructure. Tier targets drive power topology, generator sizing and maintenance windows.",
  },
  {
    num: "06",
    title: "What is the kW per rack today and three years out?",
    desc: "Most over-budget UAE retrofits start with under-sized power and cooling envelopes. Capture average and peak kW per rack now, plus a realistic three-year growth curve, before any vendor demo.",
  },
];

/* ───────── UAE SERVICE & COMMERCIAL NOTES ───────── */

const uaeNotes = [
  "UAE summer ambient temperatures push cooling design hard; free-cooling hours are limited and chilled-water plants dominate.",
  "NESA / TDRA IAS, UAE PDPL and sector-specific frameworks (ADHICS, DFSA) all expect documented physical-security and resilience controls.",
  "Uptime Institute Tier III is the practical sweet spot for most UAE mid-market and enterprise primary sites.",
  "Local fire-code compliance (Civil Defence) drives suppression system choice; FK-5-1-12 (Novec) and IG-55 (Inergen) dominate.",
  "Power utility coordination (DEWA, FEWA, SEWA, AADC) drives generator and transformer scheduling; engineering lead times are real.",
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "Which UPS topology should I choose for a UAE primary data centre?",
    answer:
      "Double-conversion online UPS is the default for any production site in the UAE. Line-interactive is acceptable only at edge or branch with light loads. Battery technology should default to Lithium-ion for new builds (longer life, smaller footprint, less HVAC load), with VRLA retained where capex pressure forces it.",
  },
  {
    question: "What PUE should I realistically target in the UAE?",
    answer:
      "1.6 to 1.8 is realistic for a well-designed UAE data centre with hot-aisle containment, raised-floor chilled-water cooling and a tuned chiller plant. Hyperscale and modern Huawei FusionCol designs reach 1.3 to 1.5; legacy facilities run 2.0 or higher. Targeting under 1.5 in the UAE without indirect-evap cooling is aspirational.",
  },
  {
    question: "Do we really need DCIM, or is environmental monitoring enough?",
    answer:
      "Under 25 racks, environmental monitoring plus a spreadsheet can survive. Above 50 racks, the absence of DCIM compounds: capacity decisions get made on guesswork, asset audits cost weeks of labour, and outage forensics become impossible. The right time to deploy DCIM is before you actually need it.",
  },
  {
    question: "Should we go modular or build conventionally?",
    answer:
      "Modular wins on speed (six to twelve months versus eighteen-plus), CapEx predictability, and growth alignment with actual demand. Conventional wins on PUE optimisation, design flexibility and per-MW unit cost at large scale. For most UAE mid-market customers under 1 MW, modular is the right answer in 2026.",
  },
  {
    question: "What is the typical UAE data-centre build timeline?",
    answer:
      "Modular sites under 500 kW typically deliver in three to six months end-to-end. Conventional 1 MW Tier III builds run twelve to eighteen months including civils, MEP, certification and handover. AI-density retrofits run six to nine months on top of an existing facility.",
  },
  {
    question: "Is Artiflex IT tied to a single data-centre vendor?",
    answer:
      "No. We deliver Schneider, Vertiv, Eaton, Rittal, Huawei and Legrand across UAE projects. Vendor recommendation follows the assessment, not the inventory. Where a project is cooling-led, Vertiv is often the right answer; where it is electrical-led, Eaton or Schneider; where the rack and containment is decisive, Rittal. The conversation starts with your load, redundancy target and growth curve, not a SKU.",
  },
  {
    question: "Do you cover Civil Defence approvals for new builds?",
    answer:
      "Yes. We engage the relevant Civil Defence authority (Dubai DCD, Abu Dhabi Civil Defence and others by emirate) at design stage, not after kit is ordered. Suppression system selection (FK-5-1-12 / Novec, IG-55 / Inergen), VESDA detection, BMS integration and exit signage are part of the architecture, not a retrofit.",
  },
  {
    question: "Can you handle data-centre migration and consolidation?",
    answer:
      "Yes. Server room to colocation, on-premises to colocation, building-to-building and post-acquisition consolidation are routine engagements. We use a wave-based methodology with documented go / no-go criteria and rollback per wave. Discovery uses RVTools, Lansweeper or Device42 before planning, and storage replication uses array-based tooling (SnapMirror, SRDF, ActiveCluster) for minimum-downtime cutover.",
  },
];

/* ───────── HERO ───────── */

function DataCenterHero() {
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
                <span className="font-medium text-[#28B5E1]">Data Center & Infrastructure</span>
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
            Data Center &{" "}
            <span className="gradient-text">Infrastructure</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Buyer's Guide, Vendor Matrix and Gartner-style Scorecard
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            A vendor-neutral UAE buyer's guide for data centre physical infrastructure: racks, cooling, power distribution, containment and DCIM. Honest comparisons across <span className="font-semibold text-white">Schneider Electric, Vertiv, Eaton, Rittal, Huawei and Legrand</span>, with a detailed scorecard and Artiflex recommendations grounded in 14+ years of UAE deployments.
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
              to="/blog/origin-data-center"
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
              Get a Free Data Center Assessment
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

export default function DataCenterInfrastructure() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Data Center & Infrastructure UAE | Buyer's Guide & Vendor Scorecard | Artiflex IT</title>
        <meta
          name="description"
          content="Vendor-neutral UAE buyer's guide for data centre infrastructure. Vendor matrix and Gartner-style scorecard across Schneider Electric, Vertiv, Eaton, Rittal, Huawei and Legrand."
        />
        <link rel="canonical" href="https://artiflexit.com/infrastructure/data-center" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Artiflex IT",
            "url": "https://artiflexit.com/infrastructure/data-center",
            "areaServed": [
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "City", "name": "Dubai" },
              { "@type": "City", "name": "Abu Dhabi" },
            ],
            "description": "Vendor-neutral UAE buyer's guide for data centre infrastructure across Schneider Electric, Vertiv, Eaton, Rittal, Huawei and Legrand.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Data Center & Infrastructure Services",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description": "UAE data centre infrastructure: design, build, racks, power, cooling, containment, DCIM and migration. Vendor recommendation follows the assessment.",
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
            "name": "Data Centre Infrastructure Vendors for UAE Buyers",
            "itemListElement": vendors.map((v, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <DataCenterHero />

      {/* ───────── DATA CENTER VENDORS WE DELIVER (HONEYCOMB) ───────── */}
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
              Data Center{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Vendors
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The platforms we design, deploy and operate across UAE data-centre projects. The conversation starts with your load, redundancy target and growth curve, not a SKU.
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
                layouts[dcVendorList.length] ??
                [Math.ceil(dcVendorList.length / 2), Math.floor(dcVendorList.length / 2)];
              const rows: typeof dcVendorList[] = [];
              let i = 0;
              sizes.forEach((s) => {
                rows.push(dcVendorList.slice(i, i + s));
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
            {dcVendorList.map((v) => (
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
              {dcVendorList.length} platforms
            </span>
            , picked by your load, redundancy and growth curve.
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
              Before any data centre proposal, walk through these questions. Most over-budget UAE data centre projects fail here, with the customer accepting a vendor's preferred SKU rather than sizing to the actual load, redundancy class and growth curve.
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
              <span className="gradient-text">Data Center buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              Six vendors cover the overwhelming majority of UAE data-centre deployments. Each leads in some areas and trails in others; the right pick follows your design, not the marketing.
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
              Detailed Comparison on Data Center Vendors
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
              <span className="font-semibold text-white">Artiflex IT delivers Schneider, Vertiv, Eaton, Rittal, Huawei and Legrand</span> across UAE data-centre projects, with 14+ years of in-country deployments. <br />
              <span className="text-xs italic text-white sm:text-base">Vendor recommendation follows the assessment, not the inventory.</span>
            </p>
          </div>

          {/* Feature ratings */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Scorecard
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each vendor is rated across the capabilities that matter most for data-centre infrastructure, using a standardised tier scale. A gold ★ marker denotes best-in-class performance.
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
              What changes when you build in the UAE
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Data centre projects in the UAE have specific climate, regulatory and sovereignty considerations that change the design conversation versus a generic vendor proposal.
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
              14+ years of UAE data-centre delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when Schneider wins, when Vertiv wins, when Eaton or Rittal or Huawei or Legrand wins, and when none of them is the right answer. The point of an honest assessment is an honest answer.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years of UAE data-centre delivery" },
              { value: "500+", label: "Projects delivered, GCC-wide" },
              { value: "6", label: "DC vendors actively delivered" },
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
                  Schneider Electric, Vertiv, Eaton, Rittal, Huawei and Legrand: active delivery across all six, with full power, cooling, containment, racks, PDU and DCIM ecosystems.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Compliance frameworks
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Uptime Institute, TIA-942, NESA, UAE PDPL, ISO 27001, ISO 22301, ADHICS, SAMA and Civil Defence-aligned designs with audit-ready evidence packs.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Coverage area
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  On-site across Dubai, Abu Dhabi and Sharjah. Remote across the UAE, Oman and Saudi Arabia. 24/7 managed-services bench for primary and DR sites.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Engagement model
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Fully managed, co-managed, or assessment-only. CapEx, OpEx and consumption pricing supported. No vendor lock-in, no theatre, no upselling.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#28B5E1] px-6 py-3 font-display text-sm font-semibold text-navy-deep transition-colors hover:bg-white sm:text-base"
            >
              Book a free data-centre assessment
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
            description="What UAE buyers ask us most about data-centre infrastructure, racks, power, cooling and DCIM."
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
        title="Free Data Center Assessment"
        description="60-minute review of your current data-centre estate: capacity, PUE, redundancy class and roadmap. We will identify the highest-impact upgrade options and propose a prioritised plan aligned to your growth and compliance posture."
        primaryButton={{ text: "Book Assessment", action: "modal" }}
      />
    </>
  );
}
