import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import DeliveryModel from "@/components/sections/DeliveryModel";

/* ───────── STRUCTURED CABLING VENDORS (HONEYCOMB) ───────── */

const dcVendorList = [
  { slug: "commscope", name: "CommScope SYSTIMAX", logo: "/logos/CommScope.png" },
  { slug: "panduit", name: "Panduit", logo: "/logos/Panduit.png" },
  { slug: "belden", name: "Belden", logo: "/logos/Belden.svg" },
  { slug: "rm", name: "R&M", logo: "/logos/R-M.png" },
  { slug: "legrand", name: "Legrand", logo: "/logos/Legrand.png" },
  { slug: "corning", name: "Corning", logo: "/logos/Corning.png" },
];

/* ───────── BUYER'S GUIDE, SELECTION FRAMEWORK ───────── */

const selectionFramework = [
  {
    step: "1",
    question: "What is the cabling for?",
    capture: "New build, retrofit, data centre fabric, campus backbone, industrial OT, healthcare imaging, or education",
    why: "Each profile has different category, fibre type and termination standards.",
  },
  {
    step: "2",
    question: "Copper category target?",
    capture: "Cat 6 (legacy, declining), Cat 6A (current standard for 10 GbE PoE++), Cat 7 / 7A (rare), Cat 8 (data centre short-reach 40 / 100 GbE)",
    why: "Cat 6A is the practical floor for any 2026 office build. Cat 6 is no longer acceptable for new horizontal cabling.",
  },
  {
    step: "3",
    question: "Fibre type and reach?",
    capture: "OM3 / OM4 / OM5 multimode (data centre), OS2 single-mode (campus backbone, long reach)",
    why: "OM4 is the data-centre default; OS2 backbone is now standard for campus and inter-building.",
  },
  {
    step: "4",
    question: "Density target per closet?",
    capture: "User-facing port density, fibre count, future growth",
    why: "Modular patch panels, high-density angled patch fields and proper pathway planning prevent re-pulls in year three.",
  },
  {
    step: "5",
    question: "Certification depth?",
    capture: "Permanent link, channel test, full Fluke certification reports, warranty registration",
    why: "Manufacturer warranties (15 to 25 years) require certified installation by trained partners; not negotiable for serious estates.",
  },
  {
    step: "6",
    question: "Pathway and containment?",
    capture: "Cable tray, ladder rack, conduit, fire-stopping, abandoned-cable removal",
    why: "Pathway design at building handover is hard to retrofit; over-engineering pays back twice.",
  },
  {
    step: "7",
    question: "Warranty depth?",
    capture: "10 / 15 / 20 / 25-year product plus performance warranty",
    why: "Long warranties are real only when the installation is certified and the partner is manufacturer-approved.",
  },
];

/* ───────── SELECTION CRITERIA CHECKLIST ───────── */

const checklistGroups = [
  {
    title: "Technical fit",
    items: [
      "Cable category (6 / 6A / 7 / 8)",
      "Fibre type (OM3 / OM4 / OM5 / OS2)",
      "Pre-terminated or modular",
      "MPO / MTP for data centre",
      "Shielded vs unshielded",
      "Fire-rating (CPR Eca / Cca / B2ca; UL)",
    ],
  },
  {
    title: "Operational fit",
    items: [
      "Patch panel modularity",
      "Density per RU",
      "Cable management arms and pathways",
      "Asset tracking and intelligent infrastructure",
      "Labelling standard compliance (TIA-606)",
    ],
  },
  {
    title: "Commercial fit",
    items: [
      "Per-drop or per-cabinet pricing",
      "Manufacturer warranty term",
      "Installation labour cost",
      "Total project including pathways and containment",
    ],
  },
  {
    title: "Service fit",
    items: [
      "UAE-certified installation partner depth",
      "Manufacturer training (PIP, BICSI)",
      "Local field bench size",
      "Project management capability",
      "Testing equipment and reporting",
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
    slug: "commscope",
    name: "CommScope (SYSTIMAX)",
    best: "Enterprise Reference (Recommended)",
    strength: "AT&T heritage from 1880; SYSTIMAX is the historical enterprise reference. GigaSPEED X10D copper, LazrSPEED 550 OM4 plus full single-mode range, and Propel pre-terminated MPO trunks. imVision is the industry-leading intelligent infrastructure platform, backed by a 25-year SYSTIMAX warranty and a deep BusinessPartner programme in the UAE.",
    watch: "Premium positioning means premium pricing; certified-partner installation is non-negotiable for the warranty to register.",
    logo: "/logos/CommScope.png",
  },
  {
    slug: "panduit",
    name: "Panduit",
    best: "Best for Pre-Terminated DC (Recommended)",
    strength: "1955 heritage with deep US enterprise pedigree. TX6A 10Gig copper is widely deployed, Opti-Core OM4 plus single-mode covers the fibre range, and QuickNet pre-terminated MPO is a reference for modern data centre deployments. PanView iQ adds intelligent infrastructure, with a 25-year PanGen warranty and well-established CPI partners across the UAE.",
    watch: "Intelligent infrastructure platform is mature but not at the imVision tier; brand recognition in UAE skews behind CommScope and Belden.",
    logo: "/logos/Panduit.png",
  },
  {
    slug: "belden",
    name: "Belden",
    best: "Cable Engineering Depth (Recommended)",
    strength: "1902 heritage in cable engineering across industries. Belden 10GX Cat 6A is widely deployed in UAE office estates, FiberExpress covers the full fibre range, and the FX brand serves data centre ultra-low-loss requirements. 25-year Belden 10GX warranty with a growing Belden Certified installer base in-country.",
    watch: "Intelligent infrastructure offering is limited compared to CommScope and R&M; the play here is engineered cable quality and reliability, not DCIM-adjacent telemetry.",
    logo: "/logos/Belden.svg",
  },
  {
    slug: "rm",
    name: "R&M",
    best: "Swiss Premium (Recommended)",
    strength: "1908 Swiss heritage built on premium quality and reliability. R&M Cat 6A is a European reference, Polaris OM4 covers data centre fibre, and Netscale 72 is a strong modular high-density platform. R&M inteliPhy is the second mature intelligent infrastructure platform alongside imVision, with a 25-year R&M Star warranty and a strong qualified-partner network.",
    watch: "Smaller installed base in UAE than CommScope or Panduit; brand familiarity with end customers can be lower in non-European-spec estates.",
    logo: "/logos/R-M.png",
  },
  {
    slug: "legrand",
    name: "Legrand",
    best: "Broad Portfolio Play",
    strength: "1865 heritage across electrical and networking, with a broad portfolio that includes LCS3 Cat 6A and LCS3 fibre, plus a solid data centre offering and LCS3 Cabling System Management. 25-year LCS3 warranty (with limitations) and a wide Legrand partner network across the UAE.",
    watch: "Competitive but not category-leading on copper, fibre or intelligent infrastructure; the choice when cost and portfolio breadth matter more than a single best-in-class element.",
    logo: "/logos/Legrand.png",
  },
  {
    slug: "corning",
    name: "Corning",
    best: "Reference Fibre Vendor",
    strength: "1851 heritage as the original fibre optic vendor and still the reference for fibre cabling. EDGE8 is a reference platform for data centre fibre, with a full single-mode and multimode range and a 25-year Corning warranty. The Corning network is strong in fibre-led UAE deployments.",
    watch: "Copper portfolio is limited; intelligent infrastructure is not the focus. Pick Corning when fibre dominates the estate, especially in data centre EDGE8 deployments.",
    logo: "/logos/Corning.png",
  },
];

/* ───────── VENDOR MATRIX (BUYER'S MATRIX) ───────── */

const matrixVendors = [
  { name: "CommScope (SYSTIMAX)", recommended: true, rank: "#1" },
  { name: "Panduit", recommended: true },
  { name: "Belden", recommended: true },
  { name: "R&M", recommended: true },
  { name: "Legrand" },
  { name: "Corning" },
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
      "AT&T heritage from 1880; SYSTIMAX is the historical enterprise reference",
      "1955; deep US enterprise heritage",
      "1902; cable engineering depth across industries",
      "1908 Swiss; premium quality and reliability",
      "1865; broad portfolio across electrical and networking",
      "1851; the original fibre optic vendor",
    ],
  },
  {
    label: "Cat 6A portfolio",
    type: "stars",
    cells: [
      { stars: 5, note: "GigaSPEED X10D reference" },
      { stars: 5, note: "TX6A 10Gig solid" },
      { stars: 5, note: "Belden 10GX wide-deployed" },
      { stars: 5, note: "R&M Cat 6A reference Europe" },
      { stars: 4, note: "LCS3 Cat 6A" },
      { stars: 3, note: "Limited copper focus" },
    ],
  },
  {
    label: "Fibre portfolio",
    type: "stars",
    cells: [
      { stars: 5, note: "LazrSPEED 550 OM4, full SM range" },
      { stars: 5, note: "Opti-Core OM4, SM cabling" },
      { stars: 5, note: "FiberExpress full range" },
      { stars: 4, note: "Polaris OM4" },
      { stars: 4, note: "LCS3 fibre" },
      { stars: 5, note: "The reference fibre vendor" },
    ],
  },
  {
    label: "Data centre / MPO",
    type: "stars",
    cells: [
      { stars: 5, note: "Propel MPO trunks reference" },
      { stars: 5, note: "QuickNet pre-term MPO" },
      { stars: 4, note: "FX brand DC ULL" },
      { stars: 4, note: "Netscale 72 modular" },
      { stars: 4, note: "Solid DC offering" },
      { stars: 5, note: "EDGE8 reference DC fibre" },
    ],
  },
  {
    label: "Intelligent infrastructure",
    type: "stars",
    cells: [
      { stars: 5, note: "imVision (industry leader)" },
      { stars: 4, note: "PanView iQ" },
      { stars: 3, note: "Limited intelligent" },
      { stars: 5, note: "R&M inteliPhy" },
      { stars: 4, note: "LCS3 Cabling System Management" },
      { stars: 3, note: "Limited" },
    ],
  },
  {
    label: "Warranty term",
    type: "stars",
    cells: [
      { stars: 5, note: "25-year SYSTIMAX warranty" },
      { stars: 5, note: "25-year PanGen warranty" },
      { stars: 5, note: "25-year Belden 10GX" },
      { stars: 5, note: "25-year R&M Star" },
      { stars: 4, note: "25-year LCS3 limited" },
      { stars: 5, note: "25-year Corning warranty" },
    ],
  },
  {
    label: "UAE installer depth",
    type: "stars",
    cells: [
      { stars: 5, note: "BusinessPartner programme deep" },
      { stars: 5, note: "CPI partners well-established" },
      { stars: 4, note: "Belden Certified depth growing" },
      { stars: 5, note: "R&M qualified partners strong" },
      { stars: 4, note: "Legrand partner network" },
      { stars: 4, note: "Corning network strong fibre" },
    ],
  },
  {
    label: "Best suited for",
    type: "text",
    cells: [
      "Reference enterprise builds, government, banking, intelligent infrastructure",
      "Modern data centres with pre-terminated MPO, mid-market enterprise",
      "Industrial and harsh-environment plus mainstream office",
      "Premium European-spec deployments, intelligent infrastructure",
      "Cost-effective broad portfolio plays",
      "Fibre-dominated estates, hyperscale DC backbone",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "Historical enterprise reference; imVision is the intelligent-infrastructure leader, 25-year SYSTIMAX warranty." },
      { recommended: true, text: "Strong Cat 6A and pre-term MPO; QuickNet is a reference for modern DC deployments." },
      { recommended: true, text: "Cable engineering depth; widely deployed 10GX. Limited intelligent infrastructure." },
      { recommended: true, text: "Swiss premium; inteliPhy is the second mature intelligent platform alongside imVision." },
      { text: "Broad portfolio; LCS3 is competitive but not category-leading." },
      { text: "The reference fibre vendor; pick when fibre dominates the estate, especially DC EDGE8." },
    ],
  },
];

/* ───────── GARTNER-STYLE CAPABILITY SCORECARD ───────── */

const featureVendors = [
  "CommScope",
  "Panduit",
  "Belden",
  "R&M",
  "Corning",
];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "Cat 6A portfolio",
    cells: [
      { tier: "best", note: "GigaSPEED X10D is the enterprise reference" },
      { tier: "best", note: "TX6A 10Gig widely deployed" },
      { tier: "best", note: "Belden 10GX deep installed base" },
      { tier: "best", note: "R&M Cat 6A is a European reference" },
      { tier: "good", note: "Copper is not the focus" },
    ],
  },
  {
    label: "Fibre portfolio",
    cells: [
      { tier: "best", note: "LazrSPEED OM4 plus full SM range" },
      { tier: "best", note: "Opti-Core OM4 and SM cabling" },
      { tier: "best", note: "FiberExpress covers the full range" },
      { tier: "excellent", note: "Polaris OM4 and SM solid" },
      { tier: "best", note: "Reference fibre vendor since 1851" },
    ],
  },
  {
    label: "Data centre fibre / MPO",
    cells: [
      { tier: "best", note: "Propel MPO trunks are the reference" },
      { tier: "best", note: "QuickNet pre-terminated MPO" },
      { tier: "excellent", note: "FX brand DC ultra-low-loss" },
      { tier: "excellent", note: "Netscale 72 modular high-density" },
      { tier: "best", note: "EDGE8 is the reference DC fibre" },
    ],
  },
  {
    label: "Intelligent infrastructure / DCIM-adjacent",
    cells: [
      { tier: "best", note: "imVision is the industry leader" },
      { tier: "excellent", note: "PanView iQ is mature" },
      { tier: "good", note: "Limited intelligent offering" },
      { tier: "best", note: "inteliPhy is the second mature platform" },
      { tier: "good", note: "Limited focus on intelligent" },
    ],
  },
  {
    label: "Pre-terminated / modular",
    cells: [
      { tier: "best", note: "Propel modular and pre-terminated" },
      { tier: "best", note: "QuickNet is a reference platform" },
      { tier: "excellent", note: "FiberExpress pre-terminated range" },
      { tier: "excellent", note: "Netscale 72 modular density" },
      { tier: "best", note: "EDGE8 pre-terminated MPO" },
    ],
  },
  {
    label: "Warranty and certification",
    cells: [
      { tier: "best", note: "25-year SYSTIMAX warranty" },
      { tier: "best", note: "25-year PanGen warranty" },
      { tier: "best", note: "25-year Belden 10GX warranty" },
      { tier: "best", note: "25-year R&M Star warranty" },
      { tier: "best", note: "25-year Corning warranty" },
    ],
  },
  {
    label: "Industrial / harsh environment",
    cells: [
      { tier: "excellent", note: "Strong industrial fibre and copper" },
      { tier: "best", note: "Deep industrial enterprise heritage" },
      { tier: "best", note: "Industrial cable engineering reference" },
      { tier: "excellent", note: "Swiss-engineered industrial range" },
      { tier: "excellent", note: "Industrial fibre and connectivity" },
    ],
  },
  {
    label: "UAE certified installer depth",
    cells: [
      { tier: "best", note: "BusinessPartner programme is deep" },
      { tier: "best", note: "CPI partners well-established" },
      { tier: "excellent", note: "Belden Certified base growing" },
      { tier: "best", note: "R&M qualified partner network strong" },
      { tier: "excellent", note: "Corning network strong for fibre" },
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
    title: "New build or retrofit?",
    desc: "New builds invest in Cat 6A copper plus OM4 / OS2 fibre, pre-terminated where density allows. Retrofits start by assessing pathway capacity; re-pull cost often exceeds the upgrade cost itself.",
  },
  {
    num: "02",
    title: "DC fibre topology?",
    desc: "MPO / MTP pre-terminated trunks dominate modern data centres. OM4 (or OM5 for spine-leaf) covers 100m at 100 GbE; OS2 is the default for any reach over 300m or a 400 GbE forward-look.",
  },
  {
    num: "03",
    title: "Intelligent infrastructure?",
    desc: "Worth the premium for estates over 1000 ports or where compliance audits demand patch-level tracking. CommScope imVision and R&M inteliPhy are the two mature options.",
  },
  {
    num: "04",
    title: "Installer matters more than brand?",
    desc: "Often, yes. A certified Tier-1 installer with the wrong cable beats an uncertified install with the best cable. Certification depth on the partner side is usually the deciding factor.",
  },
  {
    num: "05",
    title: "Cat 6A or Cat 8?",
    desc: "Cat 6A is the answer for horizontal cabling. Cat 8 is data centre short-reach only (30m) for 40 / 100 GbE point-to-point. Cat 8 in horizontal context is wasted spend.",
  },
  {
    num: "06",
    title: "Pre-terminated or field-terminated?",
    desc: "Pre-terminated dominates modern data centres (MPO / MTP) and high-density build-outs. Field-terminated remains the default for horizontal copper.",
  },
];

/* ───────── UAE SERVICE & COMMERCIAL NOTES ───────── */

const uaeNotes = [
  "UAE Civil Defense fire-rating drives cable selection: LSZH is the minimum standard for occupied spaces.",
  "UAE handovers typically require BICSI-aligned testing and a full Fluke channel certification report.",
  "Cat 6A is the floor for new horizontal cabling; legacy Cat 6 is no longer acceptable.",
  "OM4 plus OS2 is the practical default mix for data centre and campus backbone today.",
  "Manufacturer 25-year warranties require certified-partner installation; the partner credential is not optional.",
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "Cat 6A or Cat 8 for a UAE office build?",
    answer:
      "Cat 6A. It is the practical floor for any 2026 horizontal cabling, supports 10 GbE plus PoE++ comfortably and has a 25-year manufacturer warranty pathway. Cat 8 is data centre short-reach only (30m) for 40 / 100 GbE point-to-point. Specifying Cat 8 in a horizontal office context is wasted spend.",
  },
  {
    question: "Pre-terminated or field-terminated?",
    answer:
      "Pre-terminated MPO / MTP trunks dominate modern data centres and high-density build-outs: faster install, lower labour cost, factory-tested performance. Field-terminated remains the default for horizontal copper in office floors, where flexibility and rework matter more than density.",
  },
  {
    question: "Is the manufacturer warranty real?",
    answer:
      "Yes, but only when the installation is done by a manufacturer-certified partner, with full channel testing and warranty registration submitted at handover. A 25-year SYSTIMAX, PanGen, Belden 10GX, R&M Star or Corning warranty is genuine and enforceable provided the certification trail is complete; without it, the warranty is paper.",
  },
  {
    question: "Is intelligent infrastructure worth the premium?",
    answer:
      "Worth the premium for estates over 1000 ports or where compliance audits demand patch-level tracking and asset visibility. CommScope imVision and R&M inteliPhy are the two mature platforms. Below that scale, the return on investment is harder to justify versus a well-documented passive estate.",
  },
  {
    question: "What is the typical cabling refresh cycle?",
    answer:
      "Horizontal copper typically lasts 10 to 15 years before category obsolescence forces a refresh. Backbone fibre often lasts 15 to 20 years where OS2 single-mode is in place. The trigger is rarely cable failure; it is the application stack outgrowing the category (1 GbE to 10 GbE, then 25 / 40 GbE in the data centre).",
  },
  {
    question: "Is Artiflex IT tied to one cabling vendor?",
    answer:
      "No. We deliver CommScope, Panduit, Belden, R&M, Legrand and Corning across UAE projects, and the recommendation follows the assessment, not the inventory. Where the estate is enterprise-reference, CommScope is often the answer; where it is pre-terminated DC, Panduit; where it is fibre-dominated, Corning. The conversation starts with your use case, density and certification target.",
  },
  {
    question: "How do you certify installations?",
    answer:
      "All installations are delivered through manufacturer-approved certified partners, with full Fluke channel testing on every drop and link, complete reporting per TIA-606 labelling standards, and warranty registration submitted to the manufacturer at handover. The certification pack is delivered as part of project closeout, not on request.",
  },
  {
    question: "Do you handle pathway and containment design?",
    answer:
      "Yes, integrated with the M&E partner from day one. Cable tray, ladder rack, conduit routing, fire-stopping and abandoned-cable removal are part of the architecture, not a retrofit. Pathway capacity at building handover is hard to change later, so over-engineering at design stage pays back twice.",
  },
];

/* ───────── HERO ───────── */

function StructuredCablingHero() {
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
                <span className="font-medium text-[#28B5E1]">Structured Cabling</span>
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
            Structured{" "}
            <span className="gradient-text">Connectivity</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Buyer's Guide, Vendor Matrix and Gartner-style Scorecard
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            A UAE buyer's guide for structured cabling and physical layer connectivity. Honest comparisons across <span className="font-semibold text-white">CommScope (SYSTIMAX), Panduit, Belden, R&M, Legrand and Corning</span>, with a detailed scorecard and Artiflex recommendations.
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
              to="/blog/origin-structured-cabling"
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
              Get a Free Structured Cabling Assessment
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

export default function StructuredCabling() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Structured Cabling UAE | Buyer's Guide & Vendor Scorecard | Artiflex IT</title>
        <meta
          name="description"
          content="UAE buyer's guide for structured cabling and physical layer connectivity. Vendor matrix and Gartner-style scorecard across CommScope, Panduit, Belden, R&M, Legrand and Corning."
        />
        <link rel="canonical" href="https://artiflexit.com/infrastructure/structured-cabling" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Artiflex IT",
            "url": "https://artiflexit.com/infrastructure/structured-cabling",
            "areaServed": [
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "City", "name": "Dubai" },
              { "@type": "City", "name": "Abu Dhabi" },
            ],
            "description": "UAE buyer's guide for structured cabling across CommScope, Panduit, Belden, R&M, Legrand and Corning.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Structured Cabling Services",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description": "UAE structured cabling: design, supply, install, certify and warranty registration across copper and fibre. Vendor recommendation follows the assessment.",
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
            "name": "Structured Cabling Vendors for UAE Buyers",
            "itemListElement": vendors.map((v, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <StructuredCablingHero />

      {/* ───────── STRUCTURED CABLING VENDORS WE DELIVER (HONEYCOMB) ───────── */}
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
              Structured Cabling{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Vendors
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The platforms we design, deploy and certify across UAE cabling projects. The conversation starts with your use case, density target and certification depth, not a SKU.
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
            , picked by your use case, density and certification target.
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
              Before any cabling proposal, walk through these questions. Most over-spec or under-spec UAE cabling projects fail here, with the customer accepting a vendor's preferred SKU rather than sizing to the actual use case, density and certification target.
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
              <span className="gradient-text">Cabling buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              Six vendors cover the overwhelming majority of UAE structured cabling deployments. Each leads in some areas and trails in others; the right pick follows your design, not the marketing.
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
              Detailed Comparison on Structured Cabling Vendors
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
              <span className="font-semibold text-white">Artiflex IT delivers CommScope, Panduit, Belden, R&M, Legrand and Corning</span> across UAE structured cabling projects, with 14+ years of in-country deployments. <br />
              <span className="text-xs italic text-white sm:text-base">Vendor recommendation follows the assessment, not the inventory.</span>
            </p>
          </div>

          {/* Feature ratings */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Scorecard
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each vendor is rated across the capabilities that matter most for structured cabling, using a standardised tier scale. A gold ★ marker denotes best-in-class performance.
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
              The right vendor for any cabling environment falls out of a few honest questions. Walk through these before any vendor demo and the shortlist usually picks itself.
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
              What changes when you cable in the UAE
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Cabling projects in the UAE have specific fire-code, certification and warranty considerations that change the design conversation versus a generic vendor proposal.
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
              14+ years of UAE cabling delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when CommScope wins, when Panduit wins, when Belden or R&M or Legrand or Corning wins, and when none of them is the right answer. The point of an honest assessment is an honest answer.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years of UAE cabling delivery" },
              { value: "500+", label: "Projects delivered, GCC-wide" },
              { value: "6", label: "Cabling vendors actively delivered" },
              { value: "25yr", label: "Manufacturer warranty support" },
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
                  CommScope (SYSTIMAX), Panduit, Belden, R&M, Legrand and Corning: active delivery across all six, spanning copper, fibre, pre-terminated MPO, intelligent infrastructure and full warranty registration.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Compliance frameworks
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  TIA-568, TIA-606 labelling, BICSI methods of practice, UAE Civil Defense LSZH fire-rating, manufacturer 25-year warranty programmes and full Fluke channel certification.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Coverage area
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  On-site across Dubai, Abu Dhabi and Sharjah. Remote across the UAE, Oman and Saudi Arabia. Project teams sized for office, campus, data centre and industrial cabling builds.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Engagement model
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Design-and-build, supply-only, or assessment-only. Pathway and containment integrated with the M&E partner from day one. No vendor lock-in, no theatre, no upselling.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#28B5E1] px-6 py-3 font-display text-sm font-semibold text-navy-deep transition-colors hover:bg-white sm:text-base"
            >
              Book a free cabling assessment
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
            description="What UAE buyers ask us most about structured cabling, copper, fibre, pre-terminated MPO and warranty certification."
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
        title="Free Structured Cabling Assessment"
        description="60-minute review of your current cabling estate: copper category, fibre topology, certification coverage and warranty status. We will identify the highest-impact upgrade options and propose a prioritised plan aligned to your use case and growth curve."
        primaryButton={{ text: "Book Assessment", action: "modal" }}
      />
    </>
  );
}
