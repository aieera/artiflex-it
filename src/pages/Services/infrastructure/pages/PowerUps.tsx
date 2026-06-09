import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import DeliveryModel from "@/components/sections/DeliveryModel";

/* ───────── POWER & UPS VENDORS (HONEYCOMB) ───────── */

const dcVendorList = [
  { slug: "schneider", name: "Schneider Electric (APC)", logo: "/logos/SchneiderElectric.png" },
  { slug: "vertiv", name: "Vertiv (Liebert)", logo: "/logos/Vertiv.png" },
  { slug: "eaton", name: "Eaton", logo: "/logos/Eaton.png" },
  { slug: "riello", name: "Riello", logo: "/logos/Riello.png" },
  { slug: "delta-socomec", name: "Delta / Socomec", logo: "/logos/Socomec.png" },
  { slug: "huawei-abb", name: "Huawei / ABB", logo: "/logos/huawei.png" },
];

/* ───────── BUYER'S GUIDE, SELECTION FRAMEWORK ───────── */

const selectionFramework = [
  {
    step: "1",
    question: "What is the UPS for?",
    capture: "Server room, full data centre, comms closet, retail / branch, industrial / OT, edge / micro DC, medical critical care",
    why: "Each profile has a natural UPS class, redundancy target and autonomy curve.",
  },
  {
    step: "2",
    question: "Load profile?",
    capture: "Total kW today plus three-year growth, power factor, harmonic content, anticipated AI / GPU load",
    why: "Drives UPS kVA sizing; modern double-conversion UPS handle leading-PF loads, older designs do not.",
  },
  {
    step: "3",
    question: "Topology?",
    capture: "Single UPS, N+1 modular, 2N parallel, ring-feed",
    why: "Redundancy class drives almost everything: rectifier sharing, static switch, battery topology, generator interaction.",
  },
  {
    step: "4",
    question: "Battery autonomy and technology?",
    capture: "5 / 10 / 15 / 30 / 60 minutes, VRLA vs Lithium-ion vs flywheel, hot-swap modules",
    why: "Lithium-ion is the new default for new deployments: longer life, smaller footprint, less HVAC load, hot-swappable.",
  },
  {
    step: "5",
    question: "Generator integration?",
    capture: "No generator, on-site generator, multiple generators, ATS / STS topology",
    why: "UPS must coordinate with generator startup and frequency stability; design matters at handover.",
  },
  {
    step: "6",
    question: "Distribution and PDU?",
    capture: "Floor PDU, busway, rack PDU basic / metered / switched, branch-circuit monitoring",
    why: "Modern data centres dominate on busway; legacy retains floor PDU; rack PDU intelligence enables capacity planning.",
  },
  {
    step: "7",
    question: "Operational team capacity?",
    capture: "Dedicated facilities team, IT-managed, vendor-managed contract",
    why: "Vendor-managed maintenance contracts are now common; the choice frames operational risk and capex / opex split.",
  },
];

/* ───────── SELECTION CRITERIA CHECKLIST ───────── */

const checklistGroups = [
  {
    title: "Technical fit",
    items: [
      "Double-conversion online vs line-interactive",
      "Modular vs monolithic",
      "Lithium-ion vs VRLA battery option",
      "Power factor and harmonics",
      "Static switch and STS",
      "Parallel redundancy design",
    ],
  },
  {
    title: "Operational fit",
    items: [
      "Vendor monitoring platform",
      "Predictive maintenance / AIOps",
      "Battery hot-swap",
      "Branch circuit monitoring",
      "Integration with DCIM",
    ],
  },
  {
    title: "Commercial fit",
    items: [
      "CapEx vs subscription / consumption",
      "Battery refresh cost over ten years",
      "Vendor-managed service options",
      "Total ten-year TCO",
    ],
  },
  {
    title: "Service fit",
    items: [
      "UAE in-country engineering depth",
      "Four-hour critical SLA",
      "Spare module and battery depot",
      "Battery refresh programme",
      "Predictive maintenance via AIOps",
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
    slug: "schneider",
    name: "Schneider Electric (APC)",
    best: "Broadest Portfolio (Recommended)",
    strength: "Schneider 1836 plus APC 1981 heritage; broadest UPS portfolio from Smart-UPS at the edge to Galaxy V-series and Symmetra PX at large MW. Wide Lithium-ion adoption, EcoStruxure IT monitoring and the largest UAE in-country service bench.",
    watch: "Portfolio breadth creates SKU sprawl; pick the EcoStruxure single-pane decision early to avoid a fragmented monitoring estate.",
    logo: "/logos/SchneiderElectric.png",
  },
  {
    slug: "vertiv",
    name: "Vertiv (Liebert)",
    best: "Best for Thermal + Power Integration (Recommended)",
    strength: "1965 Liebert pioneer; spun out of Emerson in 2016. Liebert APM and EXM modular, Trinergy and EXL S1 at large scale, wide Lithium-ion across the line, Trellis and RDU-A monitoring, deep UAE field bench for cooling-led builds.",
    watch: "Premium positioning where thermal architecture leads the design; less competitive when the room is purely power-heavy.",
    logo: "/logos/Vertiv.png",
  },
  {
    slug: "eaton",
    name: "Eaton",
    best: "Best for Electrical Heritage (Recommended)",
    strength: "1911; UPS specialist with the deepest electrical heritage. 9PX and 9SX at the edge, 93PM G2 modular reference, 9395X and Power Xpert for large-MW redundancy. Strong Lithium-ion portfolio, Brightlayer and IPM monitoring, mature partner-led UAE service.",
    watch: "Cooling and modular delivered through partners rather than in-house; engagement model is partner-led across UAE.",
    logo: "/logos/Eaton.png",
  },
  {
    slug: "riello",
    name: "Riello",
    best: "Specialist (Recommended)",
    strength: "1986 Italian UPS specialist with strong European engineering heritage. Vision and Sentinel at the edge, Multi Sentry and NextEnergy mid-range, Multi Power and Trimod modular. Lithium-ion options expanding and Riello Net Manager monitoring; strong UAE distribution.",
    watch: "Specialist focus rather than a turnkey power-plus-cooling stack; modular range narrower than the hyperscale-class vendors.",
    logo: "/logos/Riello.png",
  },
  {
    slug: "delta-socomec",
    name: "Delta / Socomec",
    best: "Modular Mid-Market Specialist",
    strength: "Delta 1971 plus Socomec 1922; strong specialists. Amplon and Modulon at the entry, Modulon DPH and MASTERYS as the modular mid-market reference, Ultron and DELPHYS Green Power at scale. Lithium-ion option available and Insight Power Manager monitoring.",
    watch: "Strongest in the modular mid-market; ecosystem depth is narrower than the Tier-1 incumbents at hyperscale.",
    logo: "/logos/Socomec.png",
  },
  {
    slug: "huawei-abb",
    name: "Huawei / ABB",
    best: "Carrier and Utility Scale",
    strength: "Huawei 1987 plus ABB 1988; carrier and utility scale. UPS5000-E modular leader and UPS5000-S at hyperscale, ABB PowerWave for utility integration. Huawei SmartLi is a Lithium-ion reference. NetEco and ABB Ability monitoring, direct UAE bench.",
    watch: "Limited small-UPS focus; estates that mix multiple vendors lose some end-to-end NetEco / Ability value.",
    logo: "/logos/huawei.png",
  },
];

/* ───────── VENDOR MATRIX (BUYER'S MATRIX) ───────── */

const matrixVendors = [
  { name: "Schneider Electric (APC)", recommended: true, rank: "#1" },
  { name: "Vertiv (Liebert)", recommended: true },
  { name: "Eaton", recommended: true },
  { name: "Riello", recommended: true },
  { name: "Delta / Socomec" },
  { name: "Huawei / ABB" },
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
      "Schneider 1836 plus APC 1981; broadest UPS portfolio",
      "1965 Liebert pioneer; spun out of Emerson in 2016",
      "1911; UPS specialist with deep electrical heritage",
      "1986 Italy; UPS specialist with global presence",
      "Delta 1971 plus Socomec 1922; strong specialists",
      "Huawei 1987 plus ABB 1988; carrier and utility scale",
    ],
  },
  {
    label: "Small UPS",
    type: "stars",
    cells: [
      { stars: 5, note: "Smart-UPS, Symmetra LX" },
      { stars: 5, note: "Liebert GXT, EXM" },
      { stars: 5, note: "9PX, 9SX, 5PX" },
      { stars: 5, note: "Vision, Sentinel" },
      { stars: 5, note: "Amplon, Modulon mini" },
      { stars: 4, note: "Limited small UPS focus" },
    ],
  },
  {
    label: "Mid UPS",
    type: "stars",
    cells: [
      { stars: 5, note: "Galaxy VS" },
      { stars: 5, note: "Liebert APM, EXM" },
      { stars: 5, note: "93PM G2, 9395P" },
      { stars: 5, note: "Multi Sentry, NextEnergy" },
      { stars: 5, note: "Modulon DPH, MASTERYS" },
      { stars: 5, note: "UPS5000-E, PowerWave" },
    ],
  },
  {
    label: "Large UPS",
    type: "stars",
    cells: [
      { stars: 5, note: "Symmetra PX, Galaxy V-series" },
      { stars: 5, note: "Liebert Trinergy, EXL S1" },
      { stars: 5, note: "9395X reference, Power Xpert" },
      { stars: 4, note: "Multi Power, Trimod" },
      { stars: 4, note: "Ultron, DELPHYS Green Power" },
      { stars: 5, note: "UPS5000-S, ABB PowerWave" },
    ],
  },
  {
    label: "Modular",
    type: "stars",
    cells: [
      { stars: 5, note: "MGE Galaxy, Galaxy VM, VS, Symmetra PX" },
      { stars: 5, note: "Liebert APM mature" },
      { stars: 5, note: "93PM modular reference" },
      { stars: 4, note: "Multi Power modular" },
      { stars: 5, note: "Modulon DPH reference" },
      { stars: 5, note: "UPS5000-E modular leader" },
    ],
  },
  {
    label: "Li-ion",
    type: "stars",
    cells: [
      { stars: 5, note: "Wide Li-ion adoption" },
      { stars: 5, note: "Wide Li-ion across line" },
      { stars: 5, note: "Strong Li-ion portfolio" },
      { stars: 4, note: "Li-ion options expanding" },
      { stars: 4, note: "Li-ion option available" },
      { stars: 5, note: "Huawei SmartLi reference" },
    ],
  },
  {
    label: "Monitoring",
    type: "stars",
    cells: [
      { stars: 5, note: "EcoStruxure IT" },
      { stars: 5, note: "Trellis, RDU-A" },
      { stars: 4, note: "Brightlayer / IPM" },
      { stars: 4, note: "Riello Net Manager" },
      { stars: 4, note: "Insight Power Manager" },
      { stars: 4, note: "NetEco / ABB Ability" },
    ],
  },
  {
    label: "UAE service",
    type: "stars",
    cells: [
      { stars: 5, note: "Largest UAE service bench" },
      { stars: 5, note: "Deep field bench" },
      { stars: 4, note: "Mature partner-led service" },
      { stars: 4, note: "Strong UAE distribution" },
      { stars: 4, note: "Strong UAE distribution" },
      { stars: 5, note: "Direct UAE bench" },
    ],
  },
  {
    label: "Best suited for",
    type: "text",
    cells: [
      "All sizes, mainstream UAE enterprise to DC",
      "Thermal-led data centres and integrated cooling + power",
      "Large-MW redundancy and electrical-led builds",
      "Mid-market specialist with European engineering preference",
      "Modular mid-market plus specialist applications",
      "Hyperscale and carrier-scale plus utility integration",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "Broadest portfolio across all classes plus most-deployed UAE service bench." },
      { recommended: true, text: "Thermal-plus-power integration leader; Liebert is the reference." },
      { recommended: true, text: "Reference electrical heritage; 9395X is the large-MW redundancy reference." },
      { recommended: true, text: "Strong specialist with mature Italian engineering and growing Li-ion." },
      { text: "Specialist mid-market modular; Modulon DPH is a strong reference." },
      { text: "Carrier-scale modular leader; UPS5000-E and SmartLi lead hyperscale." },
    ],
  },
];

/* ───────── GARTNER-STYLE CAPABILITY SCORECARD ───────── */

const featureVendors = [
  "Schneider Electric",
  "Vertiv",
  "Eaton",
  "Riello",
  "Delta / Socomec",
  "Huawei / ABB",
];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "UPS portfolio breadth",
    cells: [
      { tier: "best", note: "Edge to MW across Smart-UPS, Galaxy, Symmetra" },
      { tier: "best", note: "Liebert APM and Trinergy span all classes" },
      { tier: "best", note: "9PX to 9395X covers the entire spectrum" },
      { tier: "excellent", note: "Vision to Multi Power, specialist depth" },
      { tier: "excellent", note: "Amplon to DELPHYS, specialist range" },
      { tier: "excellent", note: "UPS5000 family at carrier scale" },
    ],
  },
  {
    label: "Modular and parallel scalability",
    cells: [
      { tier: "best", note: "Galaxy modular and Symmetra PX, deep options" },
      { tier: "best", note: "Liebert APM mature, parallel-ready" },
      { tier: "best", note: "93PM modular reference, parallel proven" },
      { tier: "excellent", note: "Multi Power modular, parallel supported" },
      { tier: "best", note: "Modulon DPH reference for modular mid-market" },
      { tier: "best", note: "UPS5000-E modular leader at hyperscale" },
    ],
  },
  {
    label: "Lithium-ion adoption",
    cells: [
      { tier: "best", note: "Wide Li-ion adoption across the line" },
      { tier: "best", note: "Wide Li-ion across the Liebert line" },
      { tier: "best", note: "Strong Li-ion portfolio, expanding fast" },
      { tier: "excellent", note: "Li-ion options expanding across range" },
      { tier: "excellent", note: "Li-ion option available across modular" },
      { tier: "best", note: "Huawei SmartLi is a hyperscale reference" },
    ],
  },
  {
    label: "Efficiency (online double-conversion)",
    cells: [
      { tier: "best", note: "Galaxy V-series and Symmetra PX leaders" },
      { tier: "best", note: "Trinergy and EXL S1 reference efficiency" },
      { tier: "best", note: "9395X high-efficiency at large MW" },
      { tier: "excellent", note: "Multi Power and NextEnergy high efficiency" },
      { tier: "excellent", note: "Modulon DPH and DELPHYS high efficiency" },
      { tier: "best", note: "UPS5000-S delivers carrier-scale efficiency" },
    ],
  },
  {
    label: "AIOps / monitoring",
    cells: [
      { tier: "best", note: "EcoStruxure IT, most-deployed DCIM" },
      { tier: "best", note: "Trellis and RDU-A, deep heritage" },
      { tier: "excellent", note: "Brightlayer and IPM, modern stack" },
      { tier: "excellent", note: "Riello Net Manager, growing capabilities" },
      { tier: "excellent", note: "Insight Power Manager, specialist depth" },
      { tier: "excellent", note: "NetEco and ABB Ability for Huawei estates" },
    ],
  },
  {
    label: "Distribution and PDU",
    cells: [
      { tier: "best", note: "Busway and rack PDU full range" },
      { tier: "excellent", note: "Geist PDU integrated, mature options" },
      { tier: "best", note: "ePDU range, full busway integration" },
      { tier: "excellent", note: "Solid PDU portfolio for mid-market" },
      { tier: "excellent", note: "Rack and floor PDU available" },
      { tier: "excellent", note: "Rack and busway via partner ecosystem" },
    ],
  },
  {
    label: "Vendor-managed services",
    cells: [
      { tier: "best", note: "EcoStruxure As-a-Service in UAE" },
      { tier: "best", note: "Vertiv Power and Cooling Services" },
      { tier: "excellent", note: "PowerAdvantage in select markets" },
      { tier: "excellent", note: "Distributor-led managed contracts" },
      { tier: "excellent", note: "Specialist managed contracts" },
      { tier: "excellent", note: "Direct managed services in UAE" },
    ],
  },
  {
    label: "UAE service and SLA",
    cells: [
      { tier: "best", note: "Largest in-country engineering team" },
      { tier: "best", note: "Deep field bench across the Emirates" },
      { tier: "excellent", note: "Strong partner-led UAE service" },
      { tier: "excellent", note: "Strong UAE distribution network" },
      { tier: "excellent", note: "Strong UAE distribution network" },
      { tier: "best", note: "Direct UAE bench and spares depot" },
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
    title: "Modular or monolithic?",
    desc: "Modular wins on growth-aligned CapEx, hot-swap maintenance and parallel scalability. Monolithic still wins at the largest single-module scale and on per-kVA unit cost. For most UAE mid-market and enterprise primary sites, modular is the right answer in 2026.",
  },
  {
    num: "02",
    title: "Lithium-ion or VRLA?",
    desc: "Lithium-ion is the new default for new deployments: longer life, smaller footprint, less HVAC load and hot-swap modules. VRLA still has a role where CapEx pressure forces it, but the ten-year TCO conversation increasingly tilts to Li-ion.",
  },
  {
    num: "03",
    title: "Vendor-managed or in-house maintenance?",
    desc: "Vendor-managed contracts are now common across UAE primary sites. The choice frames operational risk, spares-depot proximity, capacitor and battery refresh cadence, and the CapEx / OpEx split. In-house works when the facilities team is genuinely deep.",
  },
  {
    num: "04",
    title: "Consumption / Power-as-a-Service?",
    desc: "EcoStruxure As-a-Service, Vertiv Power and Cooling Services and Eaton PowerAdvantage are real consumption offerings in select UAE segments. They de-risk growth uncertainty and convert CapEx to OpEx, but the per-kVA premium needs to be sized against a CapEx model honestly.",
  },
  {
    num: "05",
    title: "Battery autonomy: how long is enough?",
    desc: "Five to fifteen minutes is the practical floor for most UAE sites with generator backup; longer only when no generator. Sizing beyond what the generator handover actually needs is a common over-spend that we routinely flag at assessment.",
  },
  {
    num: "06",
    title: "Generator coordination?",
    desc: "UPS must coordinate with generator startup and frequency stability; this design conversation happens at MEP handover, not after kit is ordered. Frequency window, ATS / STS topology and rectifier behaviour during generator pickup are all part of the handover spec.",
  },
];

/* ───────── UAE SERVICE & COMMERCIAL NOTES ───────── */

const uaeNotes = [
  "UAE utility (DEWA, FEWA, SEWA, AADC) quality is generally good but transient events still mandate UPS posture.",
  "Civil Defense Code governs battery rooms; lithium-ion installations have specific suppression requirements.",
  "UAE ambient temperatures shorten VRLA life materially; Li-ion handles UAE heat far better.",
  "DEWA and ADWEA require coordination on generator backfeed and synchronisation.",
  "Modular UPS dominates UAE new-build data centres; legacy monolithic persists in installed-base mid-market sites.",
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "Schneider APC or Vertiv Liebert for UAE primary DC?",
    answer:
      "Both are defensible reference picks. Schneider wins on UAE service-bench depth and EcoStruxure IT breadth across power, cooling and rack monitoring. Vertiv wins where thermal architecture leads the design: AI density retrofits, in-row liquid and integrated Liebert cooling-plus-power stacks. For most UAE mid-market primary sites the answer follows the assessment, not the brand.",
  },
  {
    question: "Lithium-ion: worth the premium?",
    answer:
      "For new builds in 2026, yes. Li-ion delivers ten-plus-year life versus four to seven for VRLA, roughly 30 to 40 percent smaller footprint, around half the weight, less HVAC load and hot-swap modules. The CapEx premium is offset over the ten-year TCO once battery refresh and HVAC savings are included. VRLA still has a role where CapEx pressure forces it.",
  },
  {
    question: "How often should we refresh UPS batteries?",
    answer:
      "VRLA batteries in UAE conditions typically run four to seven years before capacity drops below acceptable autonomy thresholds; annual impedance and capacity testing should drive replacement timing rather than a fixed calendar. Lithium-ion extends usable life to ten years or more and reports cell-level health continuously, which removes most of the guesswork.",
  },
  {
    question: "Modular UPS: when does it stop being worth the premium?",
    answer:
      "Modular wins on growth-aligned CapEx, hot-swap maintenance and parallel scalability up to a few MW. At the largest single-module scale and on per-kVA unit cost, monolithic still wins. The crossover usually sits around 800 kVA to 1.2 MW for UAE primary sites; below that, modular is almost always the right call.",
  },
  {
    question: "Power-as-a-Service: real or vapour?",
    answer:
      "Real in select UAE segments. EcoStruxure As-a-Service, Vertiv Power and Cooling Services and Eaton PowerAdvantage all run consumption commercials with metered delivery and managed maintenance. The model de-risks growth uncertainty and converts CapEx to OpEx, but the per-kVA premium needs to be modelled honestly against a CapEx alternative over ten years.",
  },
  {
    question: "Is Artiflex tied to a single UPS vendor?",
    answer:
      "No. We deliver all 6 (Schneider, Vertiv, Eaton, Riello, Delta / Socomec and Huawei / ABB) across UAE projects, and the recommendation follows the load curve, redundancy class and battery autonomy target. Where the design is thermal-led, Vertiv often wins; where the design is electrical-led and at large MW, Eaton or Schneider; the conversation starts with your load profile, not a SKU.",
  },
  {
    question: "Do you handle Civil Defense suppression approvals for lithium-ion battery rooms?",
    answer:
      "Yes. We engage with Dubai DCD and Abu Dhabi Civil Defence at design stage, not after kit is ordered. Lithium-ion battery rooms have specific suppression, detection and containment requirements that are part of the architecture, not a retrofit. Approvals coordination, VESDA detection, BMS integration and exit signage are all in scope.",
  },
  {
    question: "Can you provide vendor-managed services for UPS lifecycle?",
    answer:
      "Yes. Battery testing, capacitor refresh, predictive maintenance and full lifecycle SLA are routine engagements across our UAE installed base. We run vendor-managed contracts for Schneider, Vertiv, Eaton, Riello, Delta / Socomec and Huawei / ABB estates, with spares depot, four-hour critical SLA and AIOps-driven predictive maintenance where the vendor monitoring platform supports it.",
  },
];

/* ───────── HERO ───────── */

function PowerUpsHero() {
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
                <span className="font-medium text-[#28B5E1]">Power & UPS Solutions</span>
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
            Power &{" "}
            <span className="gradient-text">UPS Solutions</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Buyer's Guide, Vendor Matrix and Gartner-style Scorecard
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            A UAE buyer's guide for uninterruptible power supplies, power distribution and battery backup. Honest comparisons across <span className="font-semibold text-white">Schneider Electric APC, Vertiv Liebert, Eaton, Riello, Delta, Socomec, Huawei and ABB</span>.
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
              to="/blog/origin-power-ups"
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
              Get a Free Power and UPS Assessment
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

export default function PowerUps() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Power & UPS Solutions UAE | Buyer's Guide & Vendor Scorecard | Artiflex IT</title>
        <meta
          name="description"
          content="UAE buyer's guide for power and UPS infrastructure. Vendor matrix and Gartner-style scorecard across Schneider Electric APC, Vertiv Liebert, Eaton, Riello, Delta / Socomec and Huawei / ABB."
        />
        <link rel="canonical" href="https://artiflexit.com/infrastructure/power-ups" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Artiflex IT",
            "url": "https://artiflexit.com/infrastructure/power-ups",
            "areaServed": [
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "City", "name": "Dubai" },
              { "@type": "City", "name": "Abu Dhabi" },
            ],
            "description": "UAE buyer's guide for power and UPS solutions across Schneider Electric APC, Vertiv Liebert, Eaton, Riello, Delta / Socomec and Huawei / ABB.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Power & UPS Solutions",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description": "UAE power and UPS: uninterruptible power supplies, battery backup, power distribution, lithium-ion adoption and vendor-managed lifecycle services. Vendor recommendation follows the assessment.",
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
            "name": "Power & UPS Vendors for UAE Buyers",
            "itemListElement": vendors.map((v, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <PowerUpsHero />

      {/* ───────── POWER & UPS VENDORS WE DELIVER (HONEYCOMB) ───────── */}
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
              Power & UPS{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Vendors
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The platforms we design, deploy and operate across UAE power and UPS projects. The conversation starts with your load curve, redundancy class and battery autonomy target, not a SKU.
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
            , picked by your load, redundancy and autonomy curve.
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
              Before any UPS proposal, walk through these questions. Most over-spec UAE power projects fail here, with the customer accepting a vendor's preferred SKU rather than sizing to the actual load curve, redundancy class and battery autonomy target.
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
              <span className="gradient-text">Power & UPS buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              Six vendors cover the overwhelming majority of UAE power and UPS deployments. Each leads in some areas and trails in others; the right pick follows your design, not the marketing.
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
              Detailed Comparison on Power & UPS Vendors
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
              <span className="font-semibold text-white">Artiflex IT delivers Schneider, Vertiv, Eaton, Riello, Delta / Socomec and Huawei / ABB</span> across UAE power and UPS projects, with 14+ years of in-country deployments. <br />
              <span className="text-xs italic text-white sm:text-base">Vendor recommendation follows the assessment, not the inventory.</span>
            </p>
          </div>

          {/* Feature ratings */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Scorecard
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each vendor is rated across the capabilities that matter most for power and UPS infrastructure, using a standardised tier scale. A gold ★ marker denotes best-in-class performance.
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
              The right UPS for any site falls out of a few honest questions. Walk through these before any vendor demo and the shortlist usually picks itself.
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
              What changes when you specify power in the UAE
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              UPS projects in the UAE have specific utility, climate and regulatory considerations that change the design conversation versus a generic vendor proposal.
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
              14+ years of UAE power and UPS delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when Schneider wins, when Vertiv wins, when Eaton, Riello, Delta / Socomec or Huawei / ABB wins, and when none of them is the right answer. The point of an honest assessment is an honest answer.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years of UAE power and UPS delivery" },
              { value: "500+", label: "Projects delivered, GCC-wide" },
              { value: "6", label: "UPS vendors actively delivered" },
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
                  Schneider Electric (APC), Vertiv (Liebert), Eaton, Riello, Delta / Socomec and Huawei / ABB: active delivery across all six, with full UPS, battery, distribution and monitoring ecosystems.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Compliance frameworks
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Civil Defense (Dubai DCD, Abu Dhabi CD), DEWA and ADWEA coordination, NESA, UAE PDPL, ISO 27001 and Uptime Institute aligned designs with audit-ready evidence packs.
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
              Book a free power and UPS assessment
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
            description="What UAE buyers ask us most about UPS, battery technology, modular vs monolithic and vendor-managed power services."
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
        title="Free Power and UPS Assessment"
        description="60-minute review of your current power and UPS estate: load profile, redundancy class, battery autonomy and refresh cadence. We will identify the highest-impact upgrade options and propose a prioritised plan aligned to your growth and compliance posture."
        primaryButton={{ text: "Book Assessment", action: "modal" }}
      />
    </>
  );
}
