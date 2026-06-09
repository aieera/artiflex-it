import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import DeliveryModel from "@/components/sections/DeliveryModel";

/* ───────── CCTV VENDORS (HONEYCOMB) ───────── */

const cctvVendorList = [
  { slug: "axis", name: "Axis Communications", logo: "/logos/AxisCommunications.png" },
  { slug: "hanwha", name: "Hanwha Vision", logo: "/logos/HanwhaVision.png" },
  { slug: "hikvision", name: "Hikvision", logo: "/logos/Hikvision.png" },
  { slug: "dahua", name: "Dahua", logo: "/logos/Dahua.svg" },
  { slug: "avigilon", name: "Avigilon (Motorola)", logo: "/logos/Avigilon.png" },
  { slug: "bosch", name: "Bosch", logo: "/logos/Bosch.png" },
];

/* ───────── BUYER'S GUIDE, SELECTION FRAMEWORK ───────── */

const selectionFramework = [
  {
    step: "1",
    question: "What is the system for?",
    capture: "Perimeter security, access-control verification, retail loss prevention, traffic / parking, healthcare / education, critical infrastructure, evidence retention",
    why: "Each profile has different camera class, retention period and analytics needs.",
  },
  {
    step: "2",
    question: "Camera count, scene and resolution?",
    capture: "Total cameras today plus three-year growth; indoor / outdoor; resolution per scene 2 / 4 / 8 MP",
    why: "Drives VMS licensing, storage and network capacity.",
  },
  {
    step: "3",
    question: "Retention period?",
    capture: "7 / 30 / 90 / 180 / 365 days, sub-stream and event-trigger retention",
    why: "UAE Civil Defense, SIRA and MoI typically mandate 30 to 90 days; banking and government often 180 to 365.",
  },
  {
    step: "4",
    question: "Analytics depth?",
    capture: "Motion only, line cross / intrusion, people / vehicle classification, ANPR / LPR, face matching, behaviour, AI-based search",
    why: "Edge-camera AI reduces VMS load; cloud-based AI extends capabilities.",
  },
  {
    step: "5",
    question: "VMS choice?",
    capture: "Vendor-native, open VMS (Milestone, Genetec), cloud (Eagle Eye, Verkada, Avigilon Alta)",
    why: "VMS choice often outlasts the camera.",
  },
  {
    step: "6",
    question: "Storage architecture?",
    capture: "Edge SD card, distributed NVR, central server, hybrid cloud, fully cloud",
    why: "Drives bandwidth from cameras and storage choice.",
  },
  {
    step: "7",
    question: "Compliance and approval?",
    capture: "SIRA Dubai, MoI Abu Dhabi, Civil Defense, sector-specific",
    why: "Mandatory approvals can drive vendor shortlist.",
  },
];

/* ───────── SELECTION CRITERIA CHECKLIST ───────── */

const checklistGroups = [
  {
    title: "Camera fit",
    items: [
      "Resolution 2 / 4 / 8 / 12 MP",
      "Light sensitivity / WDR",
      "Lens type and FOV",
      "Form factor (dome, bullet, PTZ, fisheye, multisensor)",
      "Edge AI capability",
      "IP / IK rating for UAE outdoor",
    ],
  },
  {
    title: "VMS fit",
    items: [
      "Multi-site federation",
      "Camera vendor support breadth (ONVIF)",
      "Analytics rules and search",
      "User and role management",
      "Mobile and web client",
      "Open APIs and SDK",
    ],
  },
  {
    title: "Commercial fit",
    items: [
      "Per-camera VMS licence",
      "Storage cost per camera-day",
      "Cloud subscription option",
      "Five-year TCO including refresh",
      "Camera trade-in / refresh programmes",
    ],
  },
  {
    title: "Service fit",
    items: [
      "UAE SIRA-approved installer",
      "Spare camera SLA",
      "VMS support and patches",
      "Local service-bench depth",
      "Site-survey capability",
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
    slug: "axis",
    name: "Axis Communications",
    best: "Enterprise Reference (Recommended)",
    strength: "Founded 1984; invented the network camera in 1996. Reference enterprise breadth with Lightfinder and Forensic WDR for low-light, AXIS ACAP for rich third-party edge analytics, AXIS Camera Station and Site Designer for VMS, signed firmware and strong CVE response. Deep SIRA-approved installer base across the UAE.",
    watch: "Premium positioning on camera unit cost; cloud-managed via partners rather than a single first-party platform.",
    logo: "/logos/AxisCommunications.png",
  },
  {
    slug: "hanwha",
    name: "Hanwha Vision",
    best: "Premium Engineering (Recommended)",
    strength: "Samsung Techwin heritage; Hanwha since 2015. Full PNV / PNB / PNM portfolio with extraLUX low-light and WiseStream II bandwidth efficiency, strong Hanwha AI cameras, Hanwha WAVE and SSM VMS, WAVE Sync and partner cloud. Strong cybersecurity track record and UAE service network.",
    watch: "Cloud-managed video is partner-led rather than a first-party hyperscale platform; analytics ecosystem narrower than ACAP.",
    logo: "/logos/HanwhaVision.png",
  },
  {
    slug: "avigilon",
    name: "Avigilon (Motorola Solutions)",
    best: "Self-Learning Analytics (Recommended)",
    strength: "Founded 2004 in Canada; Motorola Solutions acquired 2018. Enterprise H6 series cameras with LightCatcher low-light, Self-Learning Video Analytics as the industry reference, Control Center VMS as a reference platform and Avigilon Alta cloud-native for distributed estates. Strong cybersecurity posture.",
    watch: "Best value emerges in Avigilon-end-to-end estates; mixed-vendor camera deployments lose some Unity / Alta value.",
    logo: "/logos/Avigilon.png",
  },
  {
    slug: "bosch",
    name: "Bosch",
    best: "Outdoor & Harsh Environment (Recommended)",
    strength: "Founded 1886 with deep engineering heritage across security. FLEXIDOME, DINION and MIC families with Starlight X plus as a low-light reference, Intelligent Video Analytics (IVA) built in across the line and BVMS as a mature management platform. Strong UAE presence via the partner channel.",
    watch: "Cloud-managed option is limited; first-party direct UAE field bench is narrower than Axis or Hanwha.",
    logo: "/logos/Bosch.png",
  },
  {
    slug: "hikvision",
    name: "Hikvision",
    best: "Widest UAE Installer Base",
    strength: "Founded 2001; largest video surveillance vendor by volume. Broadest range in the market, DarkFighter low-light capable, AcuSense and DeepInView edge analytics, HikCentral VMS and Hik-Connect cloud. Widest UAE installer base by volume and price-performance leader.",
    watch: "History of CVE disclosures (remediated); banking and ADGM-regulated buyers increasingly favour Western supply chain for cybersecurity assurance.",
    logo: "/logos/Hikvision.png",
  },
  {
    slug: "dahua",
    name: "Dahua",
    best: "Cost-Sensitive Multi-Site",
    strength: "Founded 2001; second largest by volume. Very wide range with strong price-performance, Starlight low-light competitive with DarkFighter, WizSense AI edge analytics, DSS VMS and DMSS cloud. Wide UAE distribution and a deep mid-market installer pool.",
    watch: "Same Western-supply-chain caveat as Hikvision for cybersecurity-sensitive sectors; DSS analytics depth trails the Western alternatives.",
    logo: "/logos/Dahua.svg",
  },
];

/* ───────── VENDOR MATRIX (BUYER'S MATRIX) ───────── */

const matrixVendors = [
  { name: "Axis Communications", recommended: true, rank: "#1" },
  { name: "Hanwha Vision", recommended: true },
  { name: "Avigilon (Motorola)", recommended: true },
  { name: "Bosch", recommended: true },
  { name: "Hikvision" },
  { name: "Dahua" },
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
      "1984; invented the network camera in 1996",
      "Samsung Techwin heritage; Hanwha since 2015",
      "2004 Canada; Motorola Solutions acquired 2018",
      "1886; deep engineering heritage across security",
      "Founded 2001; largest video surveillance vendor by volume",
      "Founded 2001; second largest by volume",
    ],
  },
  {
    label: "Camera breadth",
    type: "stars",
    cells: [
      { stars: 5, note: "Reference enterprise breadth" },
      { stars: 5, note: "Full PNV / PNB / PNM portfolio" },
      { stars: 4, note: "Enterprise H6 series" },
      { stars: 4, note: "FLEXIDOME, DINION, MIC" },
      { stars: 5, note: "Broadest range in market" },
      { stars: 5, note: "Very wide range; price-performance" },
    ],
  },
  {
    label: "Image quality low light",
    type: "stars",
    cells: [
      { stars: 5, note: "Lightfinder, Forensic WDR reference" },
      { stars: 5, note: "extraLUX, WiseStream II strong" },
      { stars: 4, note: "LightCatcher solid" },
      { stars: 5, note: "Starlight X plus reference" },
      { stars: 4, note: "DarkFighter capable" },
      { stars: 4, note: "Starlight competitive" },
    ],
  },
  {
    label: "Edge AI analytics",
    type: "stars",
    cells: [
      { stars: 5, note: "AXIS ACAP rich third-party analytics" },
      { stars: 5, note: "Hanwha AI cameras strong" },
      { stars: 5, note: "Self-Learning Video Analytics reference" },
      { stars: 4, note: "IVA built-in across line" },
      { stars: 4, note: "AcuSense and DeepInView" },
      { stars: 4, note: "WizSense AI" },
    ],
  },
  {
    label: "VMS platform",
    type: "stars",
    cells: [
      { stars: 5, note: "AXIS Camera Station, Site Designer" },
      { stars: 5, note: "Hanwha WAVE, SSM" },
      { stars: 5, note: "Control Center reference" },
      { stars: 4, note: "BVMS mature" },
      { stars: 4, note: "HikCentral capable" },
      { stars: 4, note: "DSS capable" },
    ],
  },
  {
    label: "Cloud-managed option",
    type: "stars",
    cells: [
      { stars: 4, note: "Camera Station Edge / partners" },
      { stars: 4, note: "WAVE Sync, partner cloud" },
      { stars: 5, note: "Avigilon Alta cloud-native" },
      { stars: 3, note: "Limited cloud-managed" },
      { stars: 4, note: "Hik-Connect cloud" },
      { stars: 4, note: "DMSS cloud" },
    ],
  },
  {
    label: "Cybersecurity posture",
    type: "stars",
    cells: [
      { stars: 5, note: "Strong CVE response, signed firmware" },
      { stars: 5, note: "Strong security track record" },
      { stars: 5, note: "Strong security posture" },
      { stars: 5, note: "Strong security track record" },
      { stars: 3, note: "History of vulnerabilities; remediated" },
      { stars: 3, note: "History of vulnerabilities; remediated" },
    ],
  },
  {
    label: "UAE SIRA installer depth",
    type: "stars",
    cells: [
      { stars: 5, note: "Deep SIRA-approved installer base" },
      { stars: 5, note: "Strong UAE service network" },
      { stars: 4, note: "Motorola UAE presence growing" },
      { stars: 4, note: "Strong via partners" },
      { stars: 5, note: "Widest installer base by volume" },
      { stars: 5, note: "Wide UAE distribution" },
    ],
  },
  {
    label: "Best suited for",
    type: "text",
    cells: [
      "Banking, ADGM-regulated, government, critical infrastructure",
      "Premium enterprise with cybersecurity sensitivity",
      "Integrated estates with cloud-managed video",
      "Outdoor and harsh environment, intrusion-integrated estates",
      "Mainstream retail, residential, commercial UAE",
      "Cost-sensitive multi-site retail, parking, SMB",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "Enterprise reference for image quality and edge analytics; strongest cybersecurity posture; deep UAE SIRA installer base." },
      { recommended: true, text: "Premium engineering with strong AI cameras; Samsung Techwin heritage." },
      { recommended: true, text: "Self-Learning Video Analytics is the reference; cloud-native Avigilon Alta for distributed estates." },
      { recommended: true, text: "Reference low-light (Starlight X) and outdoor (MIC, FLEXIDOME) for harsh UAE environments." },
      { text: "Widest UAE installer base by volume; price-performance leader. Banking and ADGM increasingly favour Western supply chain." },
      { text: "Wide UAE distribution and competitive price-performance. Same Western-supply-chain caveat as Hikvision." },
    ],
  },
];

/* ───────── GARTNER-STYLE CAPABILITY SCORECARD ───────── */

const featureVendors = [
  "Axis Communications",
  "Hanwha Vision",
  "Hikvision",
  "Dahua",
  "Avigilon (Motorola)",
  "Bosch",
];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "Image quality and low light",
    cells: [
      { tier: "best", note: "Lightfinder and Forensic WDR reference" },
      { tier: "best", note: "extraLUX and WiseStream II" },
      { tier: "excellent", note: "DarkFighter capable across line" },
      { tier: "excellent", note: "Starlight competitive with peers" },
      { tier: "excellent", note: "LightCatcher solid for enterprise" },
      { tier: "best", note: "Starlight X plus, harsh-light reference" },
    ],
  },
  {
    label: "Edge analytics depth",
    cells: [
      { tier: "best", note: "ACAP, broadest third-party ecosystem" },
      { tier: "best", note: "Hanwha AI cameras and WiseAI" },
      { tier: "excellent", note: "AcuSense and DeepInView" },
      { tier: "excellent", note: "WizSense across price points" },
      { tier: "best", note: "Self-Learning Video Analytics" },
      { tier: "excellent", note: "IVA built-in across line" },
    ],
  },
  {
    label: "VMS depth",
    cells: [
      { tier: "best", note: "Camera Station and Site Designer" },
      { tier: "best", note: "Hanwha WAVE and SSM platform" },
      { tier: "excellent", note: "HikCentral capable at scale" },
      { tier: "excellent", note: "DSS capable for mid-market" },
      { tier: "best", note: "Control Center, enterprise reference" },
      { tier: "excellent", note: "BVMS mature with deep heritage" },
    ],
  },
  {
    label: "Cloud-managed option",
    cells: [
      { tier: "excellent", note: "Camera Station Edge and partners" },
      { tier: "excellent", note: "WAVE Sync and partner cloud" },
      { tier: "excellent", note: "Hik-Connect cloud" },
      { tier: "excellent", note: "DMSS cloud" },
      { tier: "best", note: "Avigilon Alta cloud-native" },
      { tier: "strong", note: "Limited first-party cloud-managed" },
    ],
  },
  {
    label: "Cybersecurity posture",
    cells: [
      { tier: "best", note: "Signed firmware, strong CVE response" },
      { tier: "best", note: "Strong security track record" },
      { tier: "strong", note: "History of CVEs; actively remediated" },
      { tier: "strong", note: "History of CVEs; actively remediated" },
      { tier: "best", note: "Strong security posture, Motorola-backed" },
      { tier: "best", note: "Strong security track record" },
    ],
  },
  {
    label: "Outdoor / harsh environment",
    cells: [
      { tier: "best", note: "Q-line outdoor and corrosion-resistant" },
      { tier: "best", note: "PNO and PNM outdoor families" },
      { tier: "excellent", note: "Wide outdoor portfolio" },
      { tier: "excellent", note: "Wide outdoor portfolio" },
      { tier: "excellent", note: "H6 weather-resistant range" },
      { tier: "best", note: "MIC and FLEXIDOME for harsh UAE" },
    ],
  },
  {
    label: "ANPR / LPR and traffic",
    cells: [
      { tier: "best", note: "P14 series and ACAP LPR partners" },
      { tier: "excellent", note: "PNV ANPR with strong accuracy" },
      { tier: "excellent", note: "Dedicated ANPR cameras" },
      { tier: "excellent", note: "Dedicated ANPR cameras" },
      { tier: "best", note: "Avigilon ALPR Engine reference" },
      { tier: "excellent", note: "MIC PTZ with LPR integrations" },
    ],
  },
  {
    label: "UAE SIRA / MoI installer depth",
    cells: [
      { tier: "best", note: "Deep SIRA-approved installer base" },
      { tier: "best", note: "Strong UAE service network" },
      { tier: "best", note: "Widest installer base by volume" },
      { tier: "best", note: "Wide UAE distribution" },
      { tier: "excellent", note: "Motorola UAE presence growing" },
      { tier: "excellent", note: "Strong via specialist partners" },
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
    title: "Cybersecurity-first or value-first?",
    desc: "Banking, ADGM-regulated entities and government increasingly require Western-supply-chain cameras for cybersecurity assurance. Mainstream retail, residential and commercial estates often prioritise price-performance, where Hikvision and Dahua remain strong. The first honest question is which side of that line the buyer sits on.",
  },
  {
    num: "02",
    title: "Vendor-native VMS or open VMS?",
    desc: "Vendor-native VMS (AXIS Camera Station, Hanwha WAVE, Avigilon Control Center, BVMS) wins on tight integration and depth of analytics. Open VMS (Milestone XProtect, Genetec Security Center) wins on mixed-vendor estates, multi-system unification and longevity. The VMS choice usually outlasts the cameras.",
  },
  {
    num: "03",
    title: "Edge AI or central AI?",
    desc: "Edge analytics on the camera (ACAP, AcuSense, WizSense, IVA) reduces VMS server load and bandwidth, with rules executed on the sensor. Central AI (BriefCam, Avigilon Unity, cloud platforms) extends capability across mixed estates and unlocks forensic search at scale. Most mature estates run both.",
  },
  {
    num: "04",
    title: "Cloud-recorded or on-prem?",
    desc: "Cloud-native VMS (Avigilon Alta, Eagle Eye, Verkada) wins on distributed multi-site estates with thin local IT, with simple per-camera subscription pricing. On-prem wins on high-camera-count single sites, regulated data residency and minimum-latency forensic workflows.",
  },
  {
    num: "05",
    title: "Retention period and compliance?",
    desc: "Retention is driven by SIRA, MoI, Civil Defense and sector frameworks. Civil Defense compliance often requires 30 to 90 days; banking and government typically 180 to 365. Storage sizing flows from sub-stream and event-trigger rules, not just main-stream camera-days, and must be calculated before any kit is ordered.",
  },
  {
    num: "06",
    title: "How does ANPR / LPR integrate with RTA, ADP, Salik?",
    desc: "UAE-specific integration with RTA, ADP and Salik is a real requirement for parking, traffic and access estates. ANPR / LPR depth, plate-format support and API integration sit alongside the camera and VMS choice, and often drive the shortlist for parking-led and city-scale deployments.",
  },
];

/* ───────── UAE SERVICE & COMMERCIAL NOTES ───────── */

const uaeNotes = [
  "Dubai SIRA, Abu Dhabi MoI and federal CICPA approvals drive camera selection and installer certification.",
  "Civil Defense compliance often requires 30 to 90 day retention; banking and government typically 180 to 365.",
  "UAE outdoor climate (heat, dust, humidity) demands IP67 / IK10 housings and corrosion-resistant finishes.",
  "ANPR / LPR deployments must align with RTA, ADP and Salik integration for parking, traffic and access estates.",
  "Banking and ADGM-regulated entities increasingly require Western-supply-chain cameras for cybersecurity assurance.",
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "Are Hikvision and Dahua banned for UAE deployments?",
    answer:
      "No. Hikvision and Dahua remain widely deployed across the UAE in retail, residential and commercial estates and are not subject to a blanket ban. However, banking, ADGM-regulated entities and several federal and government buyers increasingly require Western-supply-chain cameras for cybersecurity assurance, so Axis, Hanwha, Avigilon and Bosch dominate those shortlists.",
  },
  {
    question: "Vendor-native VMS or open VMS for our estate?",
    answer:
      "Vendor-native VMS (AXIS Camera Station, Hanwha WAVE, Avigilon Control Center, BVMS) wins on tight integration and depth of analytics for single-vendor estates. Open VMS (Milestone XProtect, Genetec Security Center) wins on mixed-vendor estates, multi-system unification (access, intrusion, fire) and longevity. The VMS usually outlasts the cameras, so the decision should be made with a five to ten year horizon.",
  },
  {
    question: "How much retention do we really need?",
    answer:
      "Civil Defense compliance often requires 30 to 90 days; banking and government typically 180 to 365; sector regulators (DHA, ADHICS, SAMA-aligned) may push longer. Storage sizing has to account for main-stream plus sub-stream plus event-trigger retention, not just the headline number. We size the storage tier from the rules, not from a vendor SKU.",
  },
  {
    question: "Is cloud-recorded video viable for UAE enterprise?",
    answer:
      "Yes for distributed multi-site estates with thin local IT. Avigilon Alta, Eagle Eye and Verkada deliver mature cloud-native VMS with UAE-region storage. For high-camera-count single sites or estates with strict data-residency requirements, on-prem typically wins on TCO and forensic latency. Hybrid (edge plus cloud) is increasingly the default for distributed retail and education.",
  },
  {
    question: "What is the typical CCTV refresh cycle?",
    answer:
      "Cameras typically refresh on a five to seven year cycle, driven by resolution standards, analytics maturity and IP / IK housing degradation in UAE outdoor conditions. VMS platforms run longer (seven to ten years) because the database, integrations and operator training represent the bulk of the investment. Plan the refresh in waves, not as a forklift, and align with VMS major-version cycles.",
  },
  {
    question: "Is Artiflex tied to a single vendor?",
    answer:
      "No. We deliver Axis, Hanwha, Hikvision, Dahua, Avigilon and Bosch across UAE projects, plus open VMS platforms Milestone XProtect and Genetec Security Center. Vendor recommendation follows the assessment, not the inventory. Where a project is image-quality-led, Axis is often the right answer; where analytics is central, Avigilon or Hanwha; where outdoor and harsh environment dominates, Bosch; where price-performance is decisive, Hikvision or Dahua.",
  },
  {
    question: "Do you handle SIRA approvals?",
    answer:
      "Yes. We hold SIRA approvals for relevant deployments and manage the approval workflow with the authority from design stage onwards. Approved-vendor lists, certified-installer requirements, Oyoon-equivalent central monitoring integration and retention minimums are built into the architecture, not retrofitted after kit arrives on site.",
  },
  {
    question: "Can you integrate CCTV with access control and intrusion?",
    answer:
      "Yes. Unified physical security (PSIM) is increasingly standard, where a forced-door event pops up the relevant cameras automatically and intrusion triggers cross-reference video. Genetec Security Center is the reference open platform for unified estates; vendor-native unification is available through Axis, Hanwha, Avigilon and Bosch within their respective ecosystems.",
  },
];

/* ───────── HERO ───────── */

function CctvHero() {
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
                <span className="font-medium text-[#28B5E1]">CCTV & Surveillance</span>
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
            CCTV &{" "}
            <span className="gradient-text">Video Surveillance</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Buyer's Guide, Vendor Matrix and Gartner-style Scorecard
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            A UAE buyer's guide for IP video surveillance, video management systems and analytics. Honest comparisons across <span className="font-semibold text-white">Axis Communications, Hanwha Vision, Hikvision, Dahua, Avigilon (Motorola Solutions), Bosch and Honeywell</span>.
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
              to="/blog/origin-cctv-surveillance"
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
              Get a Free CCTV and Surveillance Assessment
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

export default function CctvSurveillance() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>CCTV & Surveillance UAE | Buyer's Guide & Vendor Scorecard | Artiflex IT</title>
        <meta
          name="description"
          content="Vendor-neutral UAE buyer's guide for CCTV and video surveillance. Vendor matrix and Gartner-style scorecard across Axis, Hanwha, Hikvision, Dahua, Avigilon and Bosch."
        />
        <link rel="canonical" href="https://artiflexit.com/infrastructure/cctv-surveillance" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Artiflex IT",
            "url": "https://artiflexit.com/infrastructure/cctv-surveillance",
            "areaServed": [
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "City", "name": "Dubai" },
              { "@type": "City", "name": "Abu Dhabi" },
            ],
            "description": "Vendor-neutral UAE buyer's guide for CCTV and video surveillance across Axis, Hanwha, Hikvision, Dahua, Avigilon and Bosch.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "CCTV & Surveillance Services",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description": "UAE CCTV and video surveillance: design, build, IP cameras, VMS, analytics, ANPR / LPR, storage and SIRA-approved delivery. Vendor recommendation follows the assessment.",
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
            "name": "CCTV and Surveillance Vendors for UAE Buyers",
            "itemListElement": vendors.map((v, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <CctvHero />

      {/* ───────── CCTV VENDORS WE DELIVER (HONEYCOMB) ───────── */}
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
              CCTV{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Vendors
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The platforms we design, deploy and operate across UAE surveillance estates. The conversation starts with your scene, retention, analytics and regulator, not a SKU.
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
                layouts[cctvVendorList.length] ??
                [Math.ceil(cctvVendorList.length / 2), Math.floor(cctvVendorList.length / 2)];
              const rows: typeof cctvVendorList[] = [];
              let i = 0;
              sizes.forEach((s) => {
                rows.push(cctvVendorList.slice(i, i + s));
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
            {cctvVendorList.map((v) => (
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
              {cctvVendorList.length} platforms
            </span>
            , picked by your scene, retention, analytics and regulator.
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
              Before any CCTV proposal, walk through these questions. Most over-budget UAE surveillance projects fail here, with the customer accepting a vendor's preferred SKU rather than sizing to the actual scene, retention class and analytics need.
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
              <span className="gradient-text">CCTV buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              Six vendors cover the overwhelming majority of UAE surveillance deployments. Each leads in some areas and trails in others; the right pick follows your scene, regulator and analytics need, not the marketing.
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
              Detailed Comparison on CCTV Vendors
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
              <span className="font-semibold text-white">Artiflex IT delivers Axis, Hanwha, Hikvision, Dahua, Avigilon and Bosch</span> across UAE surveillance projects, with 14+ years of in-country deployments. <br />
              <span className="text-xs italic text-white sm:text-base">Vendor recommendation follows the assessment, not the inventory.</span>
            </p>
          </div>

          {/* Feature ratings */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Scorecard
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each vendor is rated across the capabilities that matter most for CCTV and video surveillance, using a standardised tier scale. A gold ★ marker denotes best-in-class performance.
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
              The right vendor for any surveillance estate falls out of a few honest questions. Walk through these before any vendor demo and the shortlist usually picks itself.
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
              What changes when you deploy in the UAE
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              CCTV projects in the UAE have specific regulator, climate and sovereignty considerations that change the design conversation versus a generic vendor proposal.
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
              14+ years of UAE CCTV delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when Axis wins, when Hanwha wins, when Avigilon or Bosch or Hikvision or Dahua wins, and when none of them is the right answer. The point of an honest assessment is an honest answer.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years of UAE CCTV delivery" },
              { value: "500+", label: "Projects delivered, GCC-wide" },
              { value: "6", label: "CCTV vendors actively delivered" },
              { value: "SIRA", label: "Approved installer credentials" },
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
                  Axis, Hanwha, Hikvision, Dahua, Avigilon and Bosch: active delivery across all six, plus open VMS Milestone XProtect and Genetec Security Center for unified PSIM estates.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Compliance frameworks
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  SIRA Dubai, Abu Dhabi MoI, federal CICPA, Civil Defense, NESA, UAE PDPL and sector-specific (DHA, ADHICS, SAMA-aligned) designs with audit-ready evidence packs.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Coverage area
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  On-site across Dubai, Abu Dhabi and Sharjah. Remote across the UAE, Oman and Saudi Arabia. 24/7 managed-services bench for production sites and central VMS estates.
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
              Book a free CCTV assessment
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
            description="What UAE buyers ask us most about CCTV, video management systems, analytics and SIRA-compliant delivery."
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
        title="Free CCTV and Surveillance Assessment"
        description="60-minute review of your current surveillance estate: cameras, VMS, retention, analytics and regulator alignment. We will identify the highest-impact upgrade options and propose a prioritised plan aligned to your scene, compliance posture and growth curve."
        primaryButton={{ text: "Book Assessment", action: "modal" }}
      />
    </>
  );
}
