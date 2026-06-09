import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import DeliveryModel from "@/components/sections/DeliveryModel";

/* ───────── VIDEO CONFERENCING VENDORS (HONEYCOMB) ───────── */

const vcVendorList = [
  { slug: "microsoft-teams-rooms", name: "Microsoft Teams Rooms", logo: "/logos/microsoft.svg" },
  { slug: "cisco-webex-rooms", name: "Cisco Webex Rooms", logo: "/logos/Cisco.svg" },
  { slug: "zoom-rooms", name: "Zoom Rooms", logo: "/logos/Zoom.png" },
  { slug: "poly", name: "Poly (HP)", logo: "/logos/PolyHP.png" },
  { slug: "logitech", name: "Logitech", logo: "/logos/Logitech.svg" },
  { slug: "yealink", name: "Yealink", logo: "/logos/yealink.png" },
];

/* ───────── BUYER'S GUIDE, SELECTION FRAMEWORK ───────── */

const selectionFramework = [
  {
    step: "1",
    question: "What is the room for?",
    capture: "Huddle 2-4, small 5-8, medium 9-16, large 17-30, boardroom 30+, training, hybrid, executive briefing",
    why: "Each size has natural camera class, mic array and codec spec.",
  },
  {
    step: "2",
    question: "Primary platform commitment?",
    capture: "MTR, Webex Rooms, Zoom Rooms, BYOD universal, or multi-platform with switch",
    why: "Drives certified device selection; some devices are dual-certified.",
  },
  {
    step: "3",
    question: "Camera intelligence required?",
    capture: "Speaker tracking, framing, multi-camera director, AI presenter, virtual backgrounds",
    why: "AI camera framing is now table stakes for medium and large rooms.",
  },
  {
    step: "4",
    question: "Audio requirements?",
    capture: "Ceiling mic array, table mics, beamforming, echo cancellation, voice-lift",
    why: "Audio is the single most common failure point in video meetings.",
  },
  {
    step: "5",
    question: "Control surface?",
    capture: "Touch controller, room-system tablet, scheduler at door, BYOD pairing, voice assistant",
    why: "Drives UX and helpdesk volume.",
  },
  {
    step: "6",
    question: "Digital signage and scheduling?",
    capture: "Outside-room scheduler displays, in-room signage, room booking integration",
    why: "Reduces meeting collisions and shows utilisation data.",
  },
  {
    step: "7",
    question: "Existing AV legacy?",
    capture: "Existing Crestron/AMX/Extron control systems, sound bars, projectors",
    why: "Brownfield retains control system and replaces endpoints; greenfield starts clean.",
  },
];

/* ───────── SELECTION CRITERIA CHECKLIST ───────── */

const checklistGroups = [
  {
    title: "Technical fit",
    items: [
      "Platform certification MTR/Zoom Rooms/Webex",
      "Camera resolution and FOV",
      "AI framing and speaker tracking",
      "Ceiling vs table mic array",
      "Codec and PoE+ requirements",
      "BYOD pairing and content sharing",
    ],
  },
  {
    title: "Operational fit",
    items: [
      "Provisioning and lifecycle",
      "Single-pane management Pro Mgmt/Logitech Sync",
      "Remote diagnostics and AIOps",
      "Firmware update cadence",
      "Scheduler integration Exchange/Google",
    ],
  },
  {
    title: "Commercial fit",
    items: [
      "Hardware bundle vs separates",
      "Per-room licensing",
      "Cloud management subscription",
      "Five-year refresh economics",
      "Trade-in/decommissioning",
    ],
  },
  {
    title: "Service fit",
    items: [
      "UAE in-country AV partner depth",
      "Programming and commissioning",
      "Spare unit and SLA",
      "Site survey capability",
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
    slug: "microsoft-teams-rooms",
    name: "Microsoft Teams Rooms",
    best: "Reference MTR Platform (Recommended)",
    strength: "Reference for the MTR platform; broadest certified-device ecosystem and largest UAE estate. Teams Rooms Pro Management portal for single-pane device fleet operations, deep M365 integration, and a vast ecosystem of certified cameras, mic arrays and codecs.",
    watch: "Platform-agnostic on hardware, so device quality depends on the chosen certified partner; expect tight Microsoft 365 licensing alignment.",
    logo: "/logos/microsoft.svg",
  },
  {
    slug: "cisco-webex-rooms",
    name: "Cisco Webex Rooms",
    best: "Best End-to-End Room Kit (Recommended)",
    strength: "Best end-to-end room kit with reference camera, mic and codec; Control Hub mature. Room Bar, Room Kit Pro and Quad set the reference for integrated room systems with Webex AI camera framing leading the market.",
    watch: "Premium positioning; deepest value emerges in Cisco-standardised estates where Webex is the primary collaboration platform.",
    logo: "/logos/Cisco.svg",
  },
  {
    slug: "zoom-rooms",
    name: "Zoom Rooms",
    best: "AI Framing Reference (Recommended)",
    strength: "Smart Gallery AI framing is the reference; depends on certified third-party hardware. Zoom Device Management for the room fleet, broad certified hardware ecosystem, and the cleanest user experience for hybrid-work organisations.",
    watch: "Hardware portfolio is partner-led, not first-party; certified-device choice is decisive for room reliability.",
    logo: "/logos/Zoom.png",
  },
  {
    slug: "poly",
    name: "Poly (HP)",
    best: "Industry-Reference Audio (Recommended)",
    strength: "Industry-reference audio plus multi-platform certified devices. Studio E and X-Series cover the full range; DirectorAI framing on cameras, Sync app for management, Trio table phones for audio-led rooms. Now part of HP, with strong UAE distributor coverage.",
    watch: "Multi-platform breadth means specifying carefully against the chosen meetings platform; Poly Lens cloud is improving but trails MTR Pro Mgmt and Logitech Sync.",
    logo: "/logos/PolyHP.png",
  },
  {
    slug: "logitech",
    name: "Logitech",
    best: "Best-Value Multi-Platform Range",
    strength: "Best-value multi-platform range with mature Sync management. Rally Plus, MeetUp 2 and Sight tabletop cover huddle to large rooms; RightSight 2 AI framing, Rally Mic Pod audio and Logitech Sync deliver a mature single-pane.",
    watch: "Strong on small to medium rooms; large boardrooms and executive briefing centres still favour integrated kits from Cisco or Poly.",
    logo: "/logos/Logitech.svg",
  },
  {
    slug: "yealink",
    name: "Yealink",
    best: "Best Price-Performance Range",
    strength: "Best price-performance across the room-size range; dual-certified hardware. MeetingBar and UVC series cover all room sizes with auto framing, CP series and ceiling mics for audio, and a wide UAE channel for fast spares.",
    watch: "Brand perception in some enterprise buying centres trails Cisco and Microsoft; Yealink Device Management is solid but less polished than Sync or Control Hub.",
    logo: "/logos/yealink.png",
  },
];

/* ───────── VENDOR MATRIX (BUYER'S MATRIX) ───────── */

const matrixVendors = [
  { name: "Microsoft Teams Rooms", recommended: true, rank: "#1" },
  { name: "Cisco Webex Rooms", recommended: true },
  { name: "Zoom Rooms", recommended: true },
  { name: "Poly (HP)", recommended: true },
  { name: "Logitech" },
  { name: "Yealink" },
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
      "Microsoft 1975; Teams Rooms platform spec",
      "Cisco TelePresence 2006; Webex 1995",
      "Zoom 2011; Zoom Rooms since 2014",
      "Polycom 1990 + Plantronics 1961; HP acquired 2022",
      "Logitech 1981; AV business since 2017",
      "Yealink 2001; full UC device portfolio",
    ],
  },
  {
    label: "Camera",
    type: "stars",
    cells: [
      { stars: 3, note: "Uses certified third-party cameras" },
      { stars: 5, note: "Room Bar, Room Kit Pro, Quad reference" },
      { stars: 3, note: "Uses certified third-party cameras" },
      { stars: 5, note: "Studio E, X-Series complete range" },
      { stars: 5, note: "Rally Plus, MeetUp 2, Sight tabletop" },
      { stars: 5, note: "MeetingBar, UVC range complete" },
    ],
  },
  {
    label: "Audio",
    type: "stars",
    cells: [
      { stars: 3, note: "Uses certified third-party audio" },
      { stars: 5, note: "Ceiling Mic Pro, table mics, reference" },
      { stars: 3, note: "Uses certified third-party audio" },
      { stars: 5, note: "Sync, Trio table phones" },
      { stars: 5, note: "Rally Mic Pod, Logi Dock, Sight" },
      { stars: 5, note: "CP series, ceiling mics" },
    ],
  },
  {
    label: "AI framing",
    type: "stars",
    cells: [
      { stars: 3, note: "Cortana plus device AI" },
      { stars: 5, note: "Webex AI camera leads" },
      { stars: 5, note: "Smart Gallery best-in-class" },
      { stars: 5, note: "DirectorAI framing" },
      { stars: 5, note: "RightSight 2 strong" },
      { stars: 4, note: "Auto framing capable" },
    ],
  },
  {
    label: "Platform certification",
    type: "stars",
    cells: [
      { stars: 5, note: "Reference for own platform" },
      { stars: 5, note: "Webex + MTR options" },
      { stars: 5, note: "Reference for Zoom Rooms" },
      { stars: 5, note: "Certified MTR, Zoom, Webex" },
      { stars: 5, note: "Certified MTR, Zoom, Google Meet" },
      { stars: 5, note: "Certified MTR, Zoom, Webex" },
    ],
  },
  {
    label: "Management plane",
    type: "stars",
    cells: [
      { stars: 5, note: "Teams Rooms Pro Mgmt portal" },
      { stars: 5, note: "Control Hub for Webex" },
      { stars: 4, note: "Zoom Device Mgmt" },
      { stars: 4, note: "Poly Lens cloud" },
      { stars: 5, note: "Logitech Sync mature" },
      { stars: 4, note: "Yealink Device Mgmt" },
    ],
  },
  {
    label: "Room scale",
    type: "stars",
    cells: [
      { stars: 4, note: "Platform-agnostic, depends on devices" },
      { stars: 5, note: "Huddle through boardroom complete" },
      { stars: 3, note: "Platform-agnostic, depends on devices" },
      { stars: 5, note: "Full range plus desk" },
      { stars: 5, note: "Full range across sizes" },
      { stars: 5, note: "Full range with strong value" },
    ],
  },
  {
    label: "UAE service",
    type: "stars",
    cells: [
      { stars: 5, note: "Microsoft plus AV partners deep" },
      { stars: 5, note: "Cisco direct plus AV partners" },
      { stars: 4, note: "Growing UAE presence" },
      { stars: 4, note: "Strong distributor/partner" },
      { stars: 4, note: "Strong distributor network" },
      { stars: 4, note: "Wide UAE channel" },
    ],
  },
  {
    label: "Best suited for",
    type: "text",
    cells: [
      "M365-aligned enterprises with Teams as the default meetings platform",
      "Cisco-standardised estates with deep camera/AI requirements",
      "Hybrid-work organisations where Zoom is the primary meetings platform",
      "Audio-led rooms and multi-platform estates",
      "Small to medium rooms with strong AI framing",
      "Cost-sensitive multi-platform rollouts",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "Reference for the MTR platform; broadest certified-device ecosystem and largest UAE estate." },
      { recommended: true, text: "Best end-to-end room kit with reference camera, mic and codec; Control Hub mature." },
      { recommended: true, text: "Smart Gallery AI framing is the reference; depends on certified third-party hardware." },
      { recommended: true, text: "Industry-reference audio plus multi-platform certified devices." },
      { text: "Best-value multi-platform range with mature Sync management." },
      { text: "Best price-performance across the room-size range; dual-certified hardware." },
    ],
  },
];

/* ───────── GARTNER-STYLE CAPABILITY SCORECARD ───────── */

const featureVendors = [
  "Microsoft Teams Rooms",
  "Cisco Webex Rooms",
  "Zoom Rooms",
  "Poly (HP)",
  "Logitech",
];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "Camera quality and AI framing",
    cells: [
      { tier: "strong", note: "Relies on certified third-party cameras" },
      { tier: "best", note: "Webex AI camera and Room Kit Pro lead" },
      { tier: "best", note: "Smart Gallery sets the AI framing reference" },
      { tier: "best", note: "Studio E and X-Series with DirectorAI" },
      { tier: "best", note: "Rally and Sight with RightSight 2" },
    ],
  },
  {
    label: "Audio quality and pickup",
    cells: [
      { tier: "strong", note: "Relies on certified third-party mics" },
      { tier: "best", note: "Ceiling Mic Pro and table mics reference" },
      { tier: "strong", note: "Quality follows certified audio partner" },
      { tier: "best", note: "Industry-reference Poly audio heritage" },
      { tier: "best", note: "Rally Mic Pod and Logi Dock mature" },
    ],
  },
  {
    label: "Platform certification",
    cells: [
      { tier: "best", note: "Reference platform for MTR hardware" },
      { tier: "best", note: "Webex plus MTR dual-certified options" },
      { tier: "best", note: "Reference platform for Zoom Rooms" },
      { tier: "best", note: "Certified MTR, Zoom Rooms and Webex" },
      { tier: "best", note: "Certified MTR, Zoom, Google Meet" },
    ],
  },
  {
    label: "Management and monitoring",
    cells: [
      { tier: "best", note: "Teams Rooms Pro Mgmt portal mature" },
      { tier: "best", note: "Webex Control Hub deep and mature" },
      { tier: "excellent", note: "Zoom Device Management improving fast" },
      { tier: "excellent", note: "Poly Lens cloud, modernising" },
      { tier: "best", note: "Logitech Sync is the mature reference" },
    ],
  },
  {
    label: "Range and scalability",
    cells: [
      { tier: "excellent", note: "Hardware breadth via certified partners" },
      { tier: "best", note: "Huddle through boardroom complete" },
      { tier: "strong", note: "Hardware breadth via certified partners" },
      { tier: "best", note: "Full range including desk and audio" },
      { tier: "best", note: "Huddle to large rooms covered" },
    ],
  },
  {
    label: "BYOD / multi-platform support",
    cells: [
      { tier: "excellent", note: "Teams native; certified BYOD pairing" },
      { tier: "best", note: "Webex and MTR dual-certified options" },
      { tier: "excellent", note: "Strong BYOD and native Zoom Rooms" },
      { tier: "best", note: "Multi-platform certified devices" },
      { tier: "best", note: "Multi-platform certified broadly" },
    ],
  },
  {
    label: "Total cost of ownership",
    cells: [
      { tier: "excellent", note: "Per-room licensing plus device choice" },
      { tier: "strong", note: "Premium positioning across the kit" },
      { tier: "excellent", note: "Per-room licensing, partner hardware" },
      { tier: "excellent", note: "Strong value across full range" },
      { tier: "excellent", note: "Best-value multi-platform range" },
    ],
  },
  {
    label: "UAE service and partner depth",
    cells: [
      { tier: "best", note: "Microsoft plus deep AV partner bench" },
      { tier: "best", note: "Cisco direct plus AV partner depth" },
      { tier: "excellent", note: "Growing UAE field presence" },
      { tier: "excellent", note: "Strong distributor and partner network" },
      { tier: "excellent", note: "Strong UAE distributor network" },
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
    title: "Which collaboration platform is primary?",
    desc: "MTR, Webex Rooms or Zoom Rooms? The default meetings platform sets the certified-device shortlist and the management plane. Multi-platform estates should favour dual-certified hardware to reduce refresh risk.",
  },
  {
    num: "02",
    title: "Bundle or separates?",
    desc: "Integrated room kits (Cisco Room Bar, Webex Room Kit Pro) versus separates (codec, camera, mic, controller). Bundles simplify procurement and management; separates offer best-of-breed audio and camera choices for executive rooms.",
  },
  {
    num: "03",
    title: "Brownfield AV control retention?",
    desc: "Existing Crestron, AMX or Extron control systems can be retained and re-skinned for new room endpoints. Greenfield projects start clean with room-system tablets and platform-native control. Brownfield retention saves CapEx and integrates with existing scheduler and lighting estates.",
  },
  {
    num: "04",
    title: "AI framing as decisive criterion?",
    desc: "AI camera framing has moved from differentiator to table stakes for medium and large rooms. Zoom Smart Gallery, Webex AI camera, Poly DirectorAI and Logitech RightSight 2 all deliver; the question is whether a single AI implementation is decisive enough to anchor the platform choice.",
  },
  {
    num: "05",
    title: "Audio over video?",
    desc: "Audio is the most common failure point in video meetings, ceiling mic arrays in medium/large rooms are now standard. Specifying ceiling audio first, then camera, then codec, fixes the right problem in the right order.",
  },
  {
    num: "06",
    title: "BYOD or native?",
    desc: "Native for medium/large rooms, BYOD for huddle and unscheduled spaces. Native room systems offer single-touch join, scheduler integration and managed firmware; BYOD pairing keeps huddle rooms platform-agnostic and inexpensive to refresh.",
  },
];

/* ───────── UAE SERVICE & COMMERCIAL NOTES ───────── */

const uaeNotes = [
  "Hybrid work has driven Wi-Fi-capable meeting devices into standard purchase across UAE enterprise buyers.",
  "Most UAE enterprises run multi-platform (Teams + Webex + Zoom), dual-certified hardware reduces refresh risk.",
  "Local AV partners with Crestron/AMX programming depth remain valuable for executive briefing centres.",
  "MTR licensing per-room per-month, budget multi-year alongside hardware capital cost.",
  "Audio is most common failure point, ceiling array mics now standard in medium/large rooms.",
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "Microsoft Teams Rooms or Webex Rooms?",
    answer:
      "If Teams is the default meetings platform across the business, Microsoft Teams Rooms is the natural choice and the largest UAE estate. Webex Rooms wins when Cisco is the standardised collaboration platform, when the camera and AI requirement is decisive, or when the room kit needs to be a single integrated system. Many UAE enterprises now run dual-certified MTR + Webex hardware to preserve optionality.",
  },
  {
    question: "Logitech vs Poly vs Yealink for hardware?",
    answer:
      "Logitech wins on small to medium rooms with strong AI framing and the most mature multi-platform management. Poly wins on audio-led rooms and executive briefing centres where Trio table phones, ceiling mics and DirectorAI cameras deliver reference audio. Yealink wins on price-performance across the full size range for cost-sensitive multi-platform rollouts.",
  },
  {
    question: "Native room systems or BYOD?",
    answer:
      "Native room systems (MTR, Webex Rooms, Zoom Rooms) for medium and large rooms where single-touch join, scheduler integration and managed firmware materially reduce helpdesk volume. BYOD pairing for huddle and unscheduled spaces where the room is platform-agnostic and inexpensive to refresh. Most UAE estates run a mix.",
  },
  {
    question: "AI framing feature or marketing?",
    answer:
      "Real feature. AI camera framing materially improves remote-participant experience in medium and large rooms and has moved from differentiator to table stakes. Zoom Smart Gallery, Webex AI camera, Poly DirectorAI and Logitech RightSight 2 all deliver in production; the decision question is whether one specific implementation is decisive enough to anchor the platform choice.",
  },
  {
    question: "Typical AV refresh cycle?",
    answer:
      "Five years is the typical refresh window for room systems, with mid-cycle firmware and camera upgrades. Audio infrastructure (ceiling mics, DSP, cabling) lasts longer, often seven to ten years. Trade-in programs from Logitech, Poly and Cisco materially reduce refresh CapEx for multi-site estates.",
  },
  {
    question: "Is Artiflex tied to a single platform?",
    answer:
      "No, we deliver all 6, vendor-neutral, multi-platform certified hardware is the norm. Microsoft Teams Rooms, Cisco Webex Rooms, Zoom Rooms, Poly, Logitech and Yealink are all actively delivered across UAE projects. Platform recommendation follows the assessment, not the inventory.",
  },
  {
    question: "Can you handle Crestron/AMX programming for brownfield rooms?",
    answer:
      "Yes, partner with certified programmers for executive briefing centres. We retain existing Crestron, AMX or Extron control systems for brownfield rooms and re-skin the touch panels around the new room endpoints, preserving lighting, blinds and scheduler integration without ripping out the AV backbone.",
  },
  {
    question: "How do you handle room standardisation across multi-site estates?",
    answer:
      "Reference designs per room class (huddle, small, medium, large, boardroom) applied site by site. The standard captures camera, mic array, codec, controller, scheduler and cabling; site survey adapts the standard to room geometry and existing AV. Standardisation drives helpdesk efficiency, spares pooling and refresh predictability.",
  },
];

/* ───────── HERO ───────── */

function VideoConferencingHero() {
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
                <span className="font-medium text-[#28B5E1]">Video Conferencing & Collaboration</span>
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
            Video Conferencing &{" "}
            <span className="gradient-text">Collaboration</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Buyer's Guide, Vendor Matrix and Gartner-style Scorecard
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            A UAE buyer's guide for video conferencing endpoints, meeting room systems and collaboration platforms. Honest comparisons across <span className="font-semibold text-white">Microsoft Teams Rooms, Cisco Webex Rooms, Zoom Rooms, Poly (HP), Logitech, Yealink, Neat and Crestron</span>.
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
              to="/blog/origin-video-conferencing-collaboration"
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
              Get a Free Video Conferencing Assessment
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

export default function VideoConferencingCollaboration() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Video Conferencing & Collaboration UAE | Buyer's Guide & Vendor Scorecard | Artiflex IT</title>
        <meta
          name="description"
          content="UAE buyer's guide for video conferencing and collaboration. Vendor matrix and Gartner-style scorecard across Microsoft Teams Rooms, Cisco Webex Rooms, Zoom Rooms, Poly, Logitech and Yealink."
        />
        <link rel="canonical" href="https://artiflexit.com/infrastructure/video-conferencing-collaboration" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Artiflex IT",
            "url": "https://artiflexit.com/infrastructure/video-conferencing-collaboration",
            "areaServed": [
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "City", "name": "Dubai" },
              { "@type": "City", "name": "Abu Dhabi" },
            ],
            "description": "UAE buyer's guide for video conferencing and collaboration platforms across Microsoft Teams Rooms, Cisco Webex Rooms, Zoom Rooms, Poly, Logitech and Yealink.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Video Conferencing & Collaboration Services",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description": "UAE video conferencing and collaboration: room design, endpoint deployment, AV integration, platform certification and managed operations. Platform recommendation follows the assessment.",
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
            "name": "Video Conferencing Vendors for UAE Buyers",
            "itemListElement": vendors.map((v, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <VideoConferencingHero />

      {/* ───────── VIDEO CONFERENCING VENDORS WE DELIVER (HONEYCOMB) ───────── */}
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
              Video Conferencing{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Vendors
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The platforms we design, deploy and operate across UAE meeting room and collaboration projects. The conversation starts with your room mix, primary platform and refresh window, not a SKU.
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
                layouts[vcVendorList.length] ??
                [Math.ceil(vcVendorList.length / 2), Math.floor(vcVendorList.length / 2)];
              const rows: typeof vcVendorList[] = [];
              let i = 0;
              sizes.forEach((s) => {
                rows.push(vcVendorList.slice(i, i + s));
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
            {vcVendorList.map((v) => (
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
              {vcVendorList.length} platforms
            </span>
            , picked by your room mix, primary platform and refresh window.
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
              Before any video conferencing proposal, walk through these questions. Most over-budget UAE AV projects fail here, with the customer accepting a vendor's preferred SKU rather than sizing to the actual room mix, primary platform and refresh window.
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
              <span className="gradient-text">Video Conferencing buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              Six vendors cover the overwhelming majority of UAE meeting room and collaboration deployments. Each leads in some areas and trails in others; the right pick follows your room mix, not the marketing.
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
              Detailed Comparison on Video Conferencing Vendors
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
              <span className="font-semibold text-white">Artiflex IT delivers Microsoft Teams Rooms, Cisco Webex Rooms, Zoom Rooms, Poly, Logitech and Yealink</span> across UAE meeting room and collaboration projects, with 14+ years of in-country deployments. <br />
              <span className="text-xs italic text-white sm:text-base">Platform recommendation follows the assessment, not the inventory.</span>
            </p>
          </div>

          {/* Feature ratings */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Scorecard
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each vendor is rated across the capabilities that matter most for meeting room and collaboration platforms, using a standardised tier scale. A gold ★ marker denotes best-in-class performance.
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
              What changes when you deploy in the UAE
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Meeting room and collaboration projects in the UAE have specific hybrid-work, multi-platform and AV-legacy considerations that change the design conversation versus a generic vendor proposal.
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
              14+ years of UAE video conferencing delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when Microsoft Teams Rooms wins, when Webex Rooms wins, when Zoom Rooms, Poly, Logitech or Yealink wins, and when none of them is the right answer. The point of an honest assessment is an honest answer.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years of UAE collaboration delivery" },
              { value: "500+", label: "Projects delivered, GCC-wide" },
              { value: "6", label: "Platforms actively delivered" },
              { value: "Multi-platform", label: "Certified across MTR, Zoom, Webex" },
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
                  Microsoft Teams Rooms, Cisco Webex Rooms, Zoom Rooms, Poly, Logitech and Yealink, active delivery across all six, with full camera, audio, codec, controller and management plane ecosystems.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Platform certification
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Microsoft Teams Rooms, Zoom Rooms, Cisco Webex and Google Meet certified hardware, with dual-certified options for multi-platform estates. Crestron and AMX programming for brownfield retention.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Coverage area
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  On-site across Dubai, Abu Dhabi and Sharjah. Remote across the UAE, Oman and Saudi Arabia. Site survey, programming, commissioning and managed-services bench for multi-site estates.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Engagement model
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Fully managed, co-managed, or assessment-only. CapEx, OpEx and per-room licensing supported. No vendor lock-in, no theatre, no upselling.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#28B5E1] px-6 py-3 font-display text-sm font-semibold text-navy-deep transition-colors hover:bg-white sm:text-base"
            >
              Book a free video conferencing assessment
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
            description="What UAE buyers ask us most about video conferencing, meeting rooms and collaboration platforms."
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
        title="Free Video Conferencing Assessment"
        description="60-minute review of your current meeting room estate: room mix, primary platform, AV legacy and refresh window. We will identify the highest-impact upgrade options and propose a prioritised plan aligned to your growth and collaboration posture."
        primaryButton={{ text: "Book Assessment", action: "modal" }}
      />
    </>
  );
}
