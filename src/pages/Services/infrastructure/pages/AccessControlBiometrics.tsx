import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import DeliveryModel from "@/components/sections/DeliveryModel";

/* ───────── ACCESS CONTROL VENDORS (HONEYCOMB) ───────── */

const acVendorList = [
  { slug: "hid", name: "HID Global", logo: "/logos/HIDGlobal.png" },
  { slug: "suprema", name: "Suprema", logo: "/logos/Suprema.png" },
  { slug: "zkteco", name: "ZKTeco", logo: "/logos/ZKTeco.png" },
  { slug: "honeywell", name: "Honeywell", logo: "/logos/Honeywell.png" },
  { slug: "bosch", name: "Bosch", logo: "/logos/Bosch.png" },
  { slug: "lenel-genetec", name: "Lenel S2 / Genetec", logo: "/logos/Genetec.png" },
];

/* ───────── BUYER'S GUIDE, SELECTION FRAMEWORK ───────── */

const selectionFramework = [
  {
    step: "1",
    question: "What is the access control for?",
    capture: "Office tenant, government/classified, banking trading floor, healthcare, education, residential, industrial/OT, data centre",
    why: "Each profile has different reader class, authentication factor and audit requirements.",
  },
  {
    step: "2",
    question: "Door count and zones?",
    capture: "Total doors today plus three-year growth; secure zones with multi-factor; perimeter, interior, restricted",
    why: "Drives controller count, panel topology and licensing.",
  },
  {
    step: "3",
    question: "Authentication factor?",
    capture: "Card/fob, PIN, mobile credential, fingerprint, face, iris, vein, multi-modal",
    why: "Factor depth aligns to threat level; over-engineering creates friction without security benefit.",
  },
  {
    step: "4",
    question: "Credential strategy?",
    capture: "Proximity 125 kHz legacy, 13.56 MHz smart, SEOS/DESFire EV3, mobile/NFC/BLE, biometric template, EIDA-aligned",
    why: "Modern deployments use mobile credentials primary; legacy 125 kHz should not be deployed new.",
  },
  {
    step: "5",
    question: "Visitor management?",
    capture: "Manual reception, pre-registered, self-service kiosk, integrated with access control",
    why: "Visitor flow is often the weak spot in access-control audits.",
  },
  {
    step: "6",
    question: "Integration?",
    capture: "Video verification CCTV, intrusion alarm, HR/IDM, ERP/time and attendance, ELE/elevator destination dispatch",
    why: "Modern access platforms integrate widely.",
  },
  {
    step: "7",
    question: "Compliance posture?",
    capture: "DCD/Civil Defense, SIRA/MoI, banking regulator, healthcare ADHICS, ADNOC critical infrastructure",
    why: "UAE compliance often mandates specific architectures.",
  },
];

/* ───────── SELECTION CRITERIA CHECKLIST ───────── */

const checklistGroups = [
  {
    title: "Technical fit",
    items: [
      "Reader frequency 125 kHz vs 13.56 MHz",
      "Credential type SEOS/DESFire/mobile/biometric",
      "Multi-factor support",
      "Anti-pass-back, two-person rule",
      "Panel and controller redundancy",
      "Integration with CCTV/intrusion",
    ],
  },
  {
    title: "Operational fit",
    items: [
      "Single-pane platform admin",
      "HR/IDM federation",
      "Mobile credential issuance",
      "Visitor lifecycle",
      "Audit and reporting",
    ],
  },
  {
    title: "Commercial fit",
    items: [
      "Per-door licence vs per-reader",
      "Mobile credential subscription",
      "Cloud vs on-prem",
      "Five-year TCO including refresh",
    ],
  },
  {
    title: "Service fit",
    items: [
      "UAE SIRA/MoI installer depth",
      "Commissioning capacity",
      "Spare reader and controller SLA",
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
    slug: "hid",
    name: "HID Global",
    best: "Reader & Credential Leader (Recommended)",
    strength: "ASSA ABLOY HID; founded 1991; global reader leader. SEOS, DESFire EV3, mobile credentials and OSDP reference. HID Signo readers, Lumidigm biometrics and HID Mobile Access set the credential standard. Deep UAE partner base via SIRA-approved integrators.",
    watch: "Platform layer relies on Origo cloud plus partner ecosystem; not an integrated VMS/PACS vendor in the Genetec sense.",
    logo: "/logos/HIDGlobal.png",
  },
  {
    slug: "suprema",
    name: "Suprema",
    best: "Biometric Reference (Recommended)",
    strength: "Founded 2000 in Korea; biometric specialist. BioStation 3 leads on fingerprint plus face, with industry reference algorithms. Suprema Mobile Access is mature, BioStar 2 platform is capable and CLUe cloud is gaining ground. Strong UAE installer network.",
    watch: "Platform depth is biometric-led rather than enterprise PSIM; cooler fit for mixed-vendor unified estates.",
    logo: "/logos/Suprema.png",
  },
  {
    slug: "zkteco",
    name: "ZKTeco",
    best: "Best for Mass-market & SMB (Recommended)",
    strength: "Founded 1985 in China; full physical security stack. Widest UAE installer base, mass-market biometric leader on price-performance. ZKBio CV Access cloud, native CCTV integration and the broadest reader range across price points.",
    watch: "Enterprise governance and audit features trail Genetec/Lenel; not the natural pick for banking trading floors or classified zones.",
    logo: "/logos/ZKTeco.png",
  },
  {
    slug: "honeywell",
    name: "Honeywell",
    best: "Best for Enterprise PACS",
    strength: "Founded 1906; deep enterprise security heritage. OmniAssure and OmniClass readers, Honeywell Mobile Credential and Pro-Watch as the reference for traditional enterprise physical access control. Pro-Watch Cloud is the modern delivery path. Strong via partners across UAE.",
    watch: "Biometric portfolio relies on partners; cloud-managed story is improving but trails native cloud-first vendors.",
    logo: "/logos/Honeywell.png",
  },
  {
    slug: "bosch",
    name: "Bosch",
    best: "Best for Access + Intrusion",
    strength: "Founded 1886; access control plus intrusion under one umbrella. AMC2 controllers, Access Easy line and Access Management System (AMS) integrate tightly with Bosch intrusion and Bosch unified security suite. Strong via partners.",
    watch: "Biometric portfolio is limited and cloud-managed offerings are still maturing versus the cloud-native peers.",
    logo: "/logos/Bosch.png",
  },
  {
    slug: "lenel-genetec",
    name: "Lenel S2 / Genetec",
    best: "Integrated Platform Leader (Recommended)",
    strength: "Lenel founded 1991, Genetec 1997; both are integrated-platform leaders. Genetec Security Center is the open-platform reference, OnGuard and Synergis are the enterprise PACS standard. Lenel BlueDiamond and Genetec mobile credentials are mature; SI-led implementations across UAE.",
    watch: "Readers and biometrics typically come via HID and Suprema partner ecosystem; platform commitment ties you to an SI relationship.",
    logo: "/logos/Genetec.png",
  },
];

/* ───────── VENDOR MATRIX (BUYER'S MATRIX) ───────── */

const matrixVendors = [
  { name: "HID Global", recommended: true, rank: "#1" },
  { name: "Suprema", recommended: true },
  { name: "ZKTeco", recommended: true },
  { name: "Honeywell" },
  { name: "Bosch" },
  { name: "Lenel S2 / Genetec", recommended: true },
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
      "ASSA ABLOY HID; founded 1991; global reader leader",
      "Founded 2000 Korea; biometric specialist",
      "Founded 1985 China; full physical security stack",
      "Founded 1906; deep enterprise security heritage",
      "Founded 1886; access control plus intrusion",
      "Lenel founded 1991, Genetec 1997; both are integrated-platform leaders",
    ],
  },
  {
    label: "Reader / credential",
    type: "stars",
    cells: [
      { stars: 5, note: "SEOS, DESFire EV3, mobile, OSDP reference" },
      { stars: 5, note: "BioStation 3, fingerprint + face mature" },
      { stars: 5, note: "Broadest range, very competitive" },
      { stars: 4, note: "OmniAssure, OmniClass readers" },
      { stars: 4, note: "AMC2, Access Easy line" },
      { stars: 4, note: "Via partner readers and HID" },
    ],
  },
  {
    label: "Biometric depth",
    type: "stars",
    cells: [
      { stars: 4, note: "Lumidigm, HID Signo" },
      { stars: 5, note: "Industry reference biometrics" },
      { stars: 5, note: "Mass-market biometric leader" },
      { stars: 3, note: "Via partner biometrics" },
      { stars: 3, note: "Limited biometric portfolio" },
      { stars: 3, note: "Via partner biometrics" },
    ],
  },
  {
    label: "Mobile credential",
    type: "stars",
    cells: [
      { stars: 5, note: "HID Mobile Access reference" },
      { stars: 5, note: "Suprema Mobile Access mature" },
      { stars: 4, note: "ZKBio CV cloud" },
      { stars: 4, note: "Honeywell Mobile Credential" },
      { stars: 4, note: "Mobile Access" },
      { stars: 5, note: "Lenel BlueDiamond and Genetec" },
    ],
  },
  {
    label: "Integrated platform/VMS",
    type: "stars",
    cells: [
      { stars: 3, note: "Origo plus partners" },
      { stars: 4, note: "BioStar 2 capable" },
      { stars: 4, note: "ZKBio CV Access" },
      { stars: 5, note: "Pro-Watch and ProWatch Cloud" },
      { stars: 5, note: "Access Management System (AMS)" },
      { stars: 5, note: "OnGuard and Synergis reference" },
    ],
  },
  {
    label: "Cloud-managed",
    type: "stars",
    cells: [
      { stars: 5, note: "HID Origo cloud" },
      { stars: 5, note: "Suprema CLUe cloud" },
      { stars: 4, note: "ZKBio CV cloud" },
      { stars: 4, note: "Pro-Watch Cloud" },
      { stars: 3, note: "Limited cloud-managed" },
      { stars: 5, note: "Genetec Cloud capable" },
    ],
  },
  {
    label: "Integration with CCTV/intrusion",
    type: "stars",
    cells: [
      { stars: 4, note: "Via Origo plus partners" },
      { stars: 4, note: "BioStar 2 integrations" },
      { stars: 4, note: "Native CCTV integration" },
      { stars: 5, note: "Honeywell integrated stack" },
      { stars: 5, note: "Bosch unified security suite" },
      { stars: 5, note: "Genetec Security Center reference" },
    ],
  },
  {
    label: "UAE SIRA depth",
    type: "stars",
    cells: [
      { stars: 5, note: "Deep partner base" },
      { stars: 5, note: "Strong UAE network" },
      { stars: 5, note: "Widest installer base" },
      { stars: 4, note: "Strong partner-led" },
      { stars: 4, note: "Strong via partners" },
      { stars: 4, note: "SI-led implementations" },
    ],
  },
  {
    label: "Best suited for",
    type: "text",
    cells: [
      "Reader and credential foundation across any platform",
      "Banking, government, healthcare with biometric mandates",
      "Cost-sensitive mass-market and SMB",
      "Enterprise PACS plus integrated security suite",
      "Integrated access control plus intrusion estates",
      "Large enterprise with mixed-vendor unified PSIM",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "Reference reader and credential vendor; HID Mobile Access is the mobile-credential standard." },
      { recommended: true, text: "Industry reference for biometrics; BioStation 3 leads on fingerprint plus face." },
      { recommended: true, text: "Widest UAE installer base; mass-market biometric leader on price-performance." },
      { text: "Strong enterprise integrated stack; Pro-Watch is the reference for traditional enterprise PACS." },
      { text: "Strong integrated security suite with intrusion; limited biometric and cloud." },
      { recommended: true, text: "Best integrated platform; Genetec Security Center is the open-platform reference." },
    ],
  },
];

/* ───────── GARTNER-STYLE CAPABILITY SCORECARD ───────── */

const featureVendors = [
  "HID Global",
  "Suprema",
  "ZKTeco",
  "Honeywell",
  "Bosch",
  "Lenel S2 / Genetec",
];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "Reader and credential",
    cells: [
      { tier: "best", note: "SEOS, DESFire EV3 and OSDP reference" },
      { tier: "best", note: "BioStation 3 readers and credentials" },
      { tier: "best", note: "Broadest reader range across price points" },
      { tier: "excellent", note: "OmniAssure and OmniClass readers" },
      { tier: "excellent", note: "AMC2 and Access Easy line" },
      { tier: "excellent", note: "Via HID and partner readers" },
    ],
  },
  {
    label: "Biometric authentication",
    cells: [
      { tier: "excellent", note: "Lumidigm and HID Signo biometrics" },
      { tier: "best", note: "Industry reference fingerprint plus face" },
      { tier: "best", note: "Mass-market biometric leader" },
      { tier: "strong", note: "Via partner biometric portfolio" },
      { tier: "strong", note: "Limited biometric portfolio" },
      { tier: "strong", note: "Via partner biometrics" },
    ],
  },
  {
    label: "Mobile credential",
    cells: [
      { tier: "best", note: "HID Mobile Access is the standard" },
      { tier: "best", note: "Suprema Mobile Access mature" },
      { tier: "excellent", note: "ZKBio CV mobile credential" },
      { tier: "excellent", note: "Honeywell Mobile Credential" },
      { tier: "excellent", note: "Bosch Mobile Access" },
      { tier: "best", note: "Lenel BlueDiamond and Genetec" },
    ],
  },
  {
    label: "Integrated platform/VMS-PACS",
    cells: [
      { tier: "strong", note: "Origo plus partner platforms" },
      { tier: "excellent", note: "BioStar 2 capable platform" },
      { tier: "excellent", note: "ZKBio CV Access platform" },
      { tier: "best", note: "Pro-Watch is the reference PACS" },
      { tier: "best", note: "AMS plus unified security suite" },
      { tier: "best", note: "OnGuard and Synergis reference" },
    ],
  },
  {
    label: "Cloud-managed",
    cells: [
      { tier: "best", note: "HID Origo cloud platform" },
      { tier: "best", note: "Suprema CLUe cloud" },
      { tier: "excellent", note: "ZKBio CV cloud" },
      { tier: "excellent", note: "Pro-Watch Cloud growing" },
      { tier: "strong", note: "Cloud-managed still maturing" },
      { tier: "best", note: "Genetec Cloud capable" },
    ],
  },
  {
    label: "Integration with CCTV/intrusion",
    cells: [
      { tier: "excellent", note: "Via Origo plus partner stack" },
      { tier: "excellent", note: "BioStar 2 broad integrations" },
      { tier: "excellent", note: "Native CCTV integration" },
      { tier: "best", note: "Honeywell integrated stack" },
      { tier: "best", note: "Bosch unified security suite" },
      { tier: "best", note: "Genetec Security Center reference" },
    ],
  },
  {
    label: "Visitor and lifecycle management",
    cells: [
      { tier: "strong", note: "Via partner visitor platforms" },
      { tier: "excellent", note: "Visitor lifecycle in BioStar 2" },
      { tier: "strong", note: "Native visitor module" },
      { tier: "excellent", note: "Pro-Watch visitor workflows" },
      { tier: "excellent", note: "AMS visitor lifecycle" },
      { tier: "best", note: "Genetec ClearID is the reference" },
    ],
  },
  {
    label: "UAE compliance and SIRA depth",
    cells: [
      { tier: "best", note: "Deepest partner base in UAE" },
      { tier: "best", note: "Strong UAE installer network" },
      { tier: "best", note: "Widest installer base in market" },
      { tier: "excellent", note: "Strong partner-led delivery" },
      { tier: "excellent", note: "Strong via specialist partners" },
      { tier: "excellent", note: "SI-led implementations across UAE" },
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
    title: "Specialist or integrated platform?",
    desc: "If you need readers and credentials only, HID, Suprema or ZKTeco lead. If the brief is unified physical security with VMS, intrusion and identity, Lenel/Genetec or Honeywell is the right starting point.",
  },
  {
    num: "02",
    title: "Biometrics: real requirement or vanity?",
    desc: "Biometrics are mandatory for banking trading floors, classified government zones and certain healthcare areas. For general office tenancy, card or mobile credential is usually enough; over-engineering creates friction without security benefit.",
  },
  {
    num: "03",
    title: "Cloud-managed or on-prem?",
    desc: "Cloud-managed (HID Origo, Suprema CLUe, Pro-Watch Cloud, Genetec Cloud) wins on speed of deployment and lifecycle. On-prem still wins for classified zones, regulator-mandated air-gapped estates and very large multi-site deployments.",
  },
  {
    num: "04",
    title: "Mobile credentials: when?",
    desc: "Mobile credentials are ready for enterprise today across HID, Suprema, Genetec and Lenel. For new builds, mobile-primary is the right default with card fallback. Legacy 125 kHz prox should not be deployed new.",
  },
  {
    num: "05",
    title: "Visitor management as part of the buy?",
    desc: "Visitor flow is the most common audit weak spot, integrate from day one not as an afterthought. Genetec ClearID, Pro-Watch visitor workflows and AMS visitor lifecycle are the most enterprise-grade options.",
  },
  {
    num: "06",
    title: "EIDA integration?",
    desc: "Emirates ID integration increasingly required for government and semi-government deployments. Federal Authority for Identity workflows need to be scoped against the chosen platform early, not after panels are ordered.",
  },
];

/* ───────── UAE SERVICE & COMMERCIAL NOTES ───────── */

const uaeNotes = [
  "Dubai SIRA and Abu Dhabi MoI/CICPA frameworks drive installer certification and approved-equipment lists.",
  "Banking, government and ADNOC critical infrastructure typically require dual-factor at restricted zones.",
  "EIDA (Emirates ID) integration is increasingly required for government and semi-government.",
  "DESFire EV3/SEOS is the practical credential floor for new deployments; legacy 125 kHz prox should not be deployed new.",
  "Visitor management often fails compliance audits in UAE, integrate from day one.",
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "HID or Suprema for a new UAE office?",
    answer:
      "HID is the reference for readers and credentials and the right backbone for almost any new UAE office. Suprema is the right add-on (or replacement) where biometric authentication is mandatory, such as banking trading floors, classified zones or healthcare areas with controlled drug storage. For a general office tenancy, HID Signo readers with HID Mobile Access is the default; layer Suprema BioStation 3 only at the doors that truly need it.",
  },
  {
    question: "Is Genetec or Lenel the right integrated platform?",
    answer:
      "Both are reference integrated platforms; the choice usually comes down to the SI bench and the existing VMS estate. Genetec Security Center is the open-platform reference and the natural pick when video, access and intrusion all sit on one pane. Lenel S2 OnGuard is the enterprise PACS standard and the natural pick when the priority is access governance with deep workflow and audit features.",
  },
  {
    question: "Mobile credentials: ready for enterprise?",
    answer:
      "Yes. HID Mobile Access, Suprema Mobile Access, Genetec mobile credentials and Lenel BlueDiamond are all mature in 2026. For new builds, mobile-primary with card fallback is the right default. Existing 13.56 MHz smart-card estates can run dual-credential (card and mobile) on the same readers via OSDP, which is the practical migration path.",
  },
  {
    question: "Biometric privacy under UAE PDPL?",
    answer:
      "UAE PDPL treats biometric templates as sensitive personal data, with explicit-consent, purpose-limitation and breach-notification obligations. Template-on-card, template-on-mobile and on-device matching reduce regulatory exposure versus central template storage. Suprema, HID and ZKTeco all support template-on-card and on-device matching modes; the choice is design-time, not runtime.",
  },
  {
    question: "Typical access-control refresh cycle?",
    answer:
      "Readers run seven to ten years in benign UAE indoor environments, shorter at perimeter exposure. Controllers and panels run ten years comfortably. Credentials are refreshed on a five to seven-year cycle when migrating from legacy 125 kHz prox to DESFire EV3 or SEOS. The trigger for a refresh is usually mobile-credential or biometric enablement, not failure.",
  },
  {
    question: "Is Artiflex tied to a single vendor?",
    answer:
      "No. We deliver all six platforms plus IDEMIA biometric and open VMS, vendor-neutral. Recommendation follows the assessment, not the inventory. Where readers and credentials are the priority, HID leads. Where biometrics are mandatory, Suprema or IDEMIA. Where the brief is unified physical security, Genetec or Lenel. Where access plus intrusion needs to be tightly coupled, Honeywell or Bosch.",
  },
  {
    question: "Do you handle EIDA integration for government clients?",
    answer:
      "Yes. Emirates ID and Federal Authority for Identity workflows are scoped at design stage, with the chosen platform validated against EIDA card-read and citizen-lookup requirements. We carry the SIRA and MoI approvals needed to engage on government and semi-government deployments and run the EIDA integration as part of commissioning, not as an afterthought.",
  },
  {
    question: "Can you migrate from legacy 125 kHz prox to mobile credentials?",
    answer:
      "Yes. Wave-based migration with dual-reader transition phase. We replace readers with multi-frequency models that read legacy 125 kHz alongside DESFire EV3, SEOS and mobile credentials, then retire prox over six to twelve months as users move to mobile. Panels, wiring and door hardware are reused where possible, which keeps the migration cost-effective and the user experience unbroken.",
  },
];

/* ───────── HERO ───────── */

function AccessControlHero() {
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
                <span className="font-medium text-[#28B5E1]">Access Control & Biometrics</span>
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
            Access Control &{" "}
            <span className="gradient-text">Biometrics</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Buyer's Guide, Vendor Matrix and Gartner-style Scorecard
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            A UAE buyer's guide for physical access control, biometric authentication and integrated security platforms. Honest comparisons across <span className="font-semibold text-white">HID Global, Suprema, ZKTeco, Honeywell, Bosch, Lenel S2, Genetec and IDEMIA</span>.
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
              to="/blog/origin-access-control-biometrics"
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
              Get a Free Access Control Assessment
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

export default function AccessControlBiometrics() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Access Control & Biometrics UAE | Buyer's Guide & Vendor Scorecard | Artiflex IT</title>
        <meta
          name="description"
          content="UAE buyer's guide for access control and biometrics. Vendor matrix and Gartner-style scorecard across HID Global, Suprema, ZKTeco, Honeywell, Bosch and Lenel S2 / Genetec."
        />
        <link rel="canonical" href="https://artiflexit.com/infrastructure/access-control-biometrics" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Artiflex IT",
            "url": "https://artiflexit.com/infrastructure/access-control-biometrics",
            "areaServed": [
              { "@type": "Country", "name": "United Arab Emirates" },
              { "@type": "City", "name": "Dubai" },
              { "@type": "City", "name": "Abu Dhabi" },
            ],
            "description": "UAE buyer's guide for access control and biometrics across HID Global, Suprema, ZKTeco, Honeywell, Bosch and Lenel S2 / Genetec.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Access Control & Biometrics Services",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description": "UAE access control and biometrics: design, deploy, integrate and operate readers, credentials, biometrics, mobile credentials and unified physical security platforms.",
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
            "name": "Access Control & Biometrics Vendors for UAE Buyers",
            "itemListElement": vendors.map((v, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <AccessControlHero />

      {/* ───────── ACCESS CONTROL VENDORS WE DELIVER (HONEYCOMB) ───────── */}
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
              Access Control{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Vendors
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The platforms we design, deploy and operate across UAE access-control and biometric projects. The conversation starts with your door count, authentication factor and compliance posture, not a SKU.
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
                layouts[acVendorList.length] ??
                [Math.ceil(acVendorList.length / 2), Math.floor(acVendorList.length / 2)];
              const rows: typeof acVendorList[] = [];
              let i = 0;
              sizes.forEach((s) => {
                rows.push(acVendorList.slice(i, i + s));
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
            {acVendorList.map((v) => (
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
              {acVendorList.length} platforms
            </span>
            , picked by your door count, authentication factor and compliance posture.
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
              Before any access-control proposal, walk through these questions. Most over-engineered UAE access-control projects fail here, with the customer accepting a vendor's preferred SKU rather than sizing to the actual door count, factor depth and compliance posture.
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
              <span className="gradient-text">Access Control buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              Six vendors cover the overwhelming majority of UAE access-control and biometric deployments. Each leads in some areas and trails in others; the right pick follows your design, not the marketing.
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
              Detailed Comparison on Access Control Vendors
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
              <span className="font-semibold text-white">Artiflex IT delivers HID Global, Suprema, ZKTeco, Honeywell, Bosch and Lenel S2 / Genetec</span> across UAE access-control and biometric projects, with 14+ years of in-country deployments. <br />
              <span className="text-xs italic text-white sm:text-base">Vendor recommendation follows the assessment, not the inventory.</span>
            </p>
          </div>

          {/* Feature ratings */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Scorecard
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each vendor is rated across the capabilities that matter most for access control and biometrics, using a standardised tier scale. A gold ★ marker denotes best-in-class performance.
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
              Access-control projects in the UAE have specific regulatory, identity and compliance considerations that change the design conversation versus a generic vendor proposal.
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
              14+ years of UAE access-control delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when HID wins, when Suprema wins, when ZKTeco, Honeywell, Bosch, Lenel or Genetec wins, and when none of them is the right answer. The point of an honest assessment is an honest answer.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years of UAE access-control delivery" },
              { value: "500+", label: "Projects delivered, GCC-wide" },
              { value: "6", label: "Access-control vendors actively delivered" },
              { value: "SIRA", label: "SIRA-approved across the practice" },
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
                  HID Global, Suprema, ZKTeco, Honeywell, Bosch and Lenel S2 / Genetec, plus IDEMIA biometric and open VMS. Active delivery across readers, biometrics, mobile credentials, panels and integrated platforms.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Compliance frameworks
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Dubai SIRA, Abu Dhabi MoI/CICPA, UAE PDPL, ADHICS, ADNOC critical infrastructure and Civil Defence-aligned designs with audit-ready evidence packs.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Coverage area
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  On-site across Dubai, Abu Dhabi and Sharjah. Remote across the UAE, Oman and Saudi Arabia. 24/7 managed-services bench for primary and secondary sites.
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
              Book a free access-control assessment
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
            description="What UAE buyers ask us most about access control, biometrics, mobile credentials and integrated security platforms."
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
        title="Free Access Control Assessment"
        description="60-minute review of your current access-control estate: door count, factor depth, credential strategy, visitor flow and compliance posture. We will identify the highest-impact upgrade options and propose a prioritised plan aligned to your growth and SIRA / MoI posture."
        primaryButton={{ text: "Book Assessment", action: "modal" }}
      />
    </>
  );
}
