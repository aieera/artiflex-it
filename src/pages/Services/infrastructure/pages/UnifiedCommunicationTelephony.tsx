import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import DeliveryModel from "@/components/sections/DeliveryModel";

/* ════════════════ SHARED TYPES ════════════════ */

type StarCell = { stars: number; note: string };
type VerdictCell = { recommended?: boolean; rank?: string; text: string };
type MatrixRow =
  | { label: string; type: "text"; cells: string[] }
  | { label: string; type: "stars"; cells: StarCell[] }
  | { label: string; type: "verdict"; cells: VerdictCell[] };
type MatrixVendor = { name: string; featured?: boolean };

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "none";
type FeatureCell = { tier: Tier; note: string };
type FeatureRow = { label: string; cells: FeatureCell[] };

const tierStyles: Record<Tier, { bg: string; text: string; label: string }> = {
  best: { bg: "bg-emerald-600", text: "text-white", label: "Best in class" },
  excellent: { bg: "bg-emerald-500", text: "text-white", label: "Excellent" },
  veryStrong: { bg: "bg-sky-200", text: "text-sky-900", label: "Very strong" },
  strong: { bg: "bg-amber-200", text: "text-amber-900", label: "Strong" },
  good: { bg: "bg-amber-100", text: "text-amber-900", label: "Good" },
  none: { bg: "bg-slate-200", text: "text-slate-600", label: "None / N/A" },
};

type VendorCard = { name: string; best: string; strength: string; watch: string; logo?: string };
type BranchItem = { num: string; question: string; branches: { label: string; text: string }[] };
type LineupItem = { slug: string; name: string; logo?: string; tag?: string };

/* ════════════════ CLOUD UC, DATA ════════════════ */

const cloudLineup: LineupItem[] = [
  { slug: "teams", name: "Microsoft Teams Phone", logo: "/logos/microsoft.svg" },
  { slug: "webex", name: "Cisco Webex Calling", logo: "/logos/Cisco.svg" },
  { slug: "avaya-cloud", name: "Avaya Cloud Office", logo: "/logos/Avaya.png" },
  { slug: "mitel", name: "Mitel MiCloud Connect", logo: "/logos/Mitel.png" },
  { slug: "3cx-saas", name: "3CX (SaaS)", logo: "/logos/3CX.svg" },
  { slug: "zoom", name: "Zoom Phone", logo: "/logos/Zoom.png" },
];

const cloudQuestions: BranchItem[] = [
  {
    num: "01",
    question: "Is your organisation already on Microsoft 365?",
    branches: [
      { label: "Yes", text: "Teams Phone is the natural extension. Single admin, single identity, single app. Calling Plan, Operator Connect or Direct Routing all supported in UAE. Lowest friction for M365 estates." },
      { label: "No", text: "Evaluate platforms independently. Cisco Webex Calling, Avaya Cloud Office, Zoom Phone and 3CX all compete on price and feature set without requiring a Microsoft suite dependency." },
    ],
  },
  {
    num: "02",
    question: "Do you need a contact centre (CCaaS) alongside the calling platform?",
    branches: [
      { label: "Yes", text: "Webex Contact Center or Avaya Aura CC leads the shortlist. Cisco Webex CC is best-in-class for omnichannel. Avaya Aura CC has the deepest UAE government and enterprise install base. Zoom CC is AI-first and growing fast." },
      { label: "No", text: "Calling plus collaboration platform only. Teams Phone, 3CX, Mitel or Zoom Phone are all strong options at different price points. Contact centre depth is less relevant and should not inflate the budget." },
    ],
  },
  {
    num: "03",
    question: "Is AI assist, call transcription, summaries and coaching, a priority?",
    branches: [
      { label: "Yes", text: "Teams Copilot, Webex AI Assistant or Zoom AI Companion. These three platforms are the only ones delivering production-grade AI assist today. If AI is a board-level priority, this trio is your shortlist. Avaya and Mitel roadmaps are still catching up." },
      { label: "No", text: "Full platform range applies. 3CX SaaS delivers the lowest TCO in the market for organisations without AI requirements. Mitel MiCloud is a strong mid-market choice with a proven UAE deployment record." },
    ],
  },
  {
    num: "04",
    question: "Do you need physical IP desk phones, or are softphones sufficient?",
    branches: [
      { label: "Physical phones needed", text: "Confirm UC platform certification before buying hardware. Teams Phone requires Teams-certified phones (Yealink T-series Teams, Poly VVX Teams). Webex uses Cisco 8800-series natively. Zoom Phone pairs with Yealink Zoom-certified models. 3CX accepts any open-SIP phone." },
      { label: "Softphone only", text: "Any cloud UC platform works. Teams, Webex, Zoom Phone and 3CX all include fully-featured iOS, Android and desktop softphone clients. No hardware budget required beyond headsets." },
    ],
  },
  {
    num: "05",
    question: "What is your PSTN connection strategy for UAE?",
    branches: [
      { label: "Calling Plans", text: "Use the provider's managed numbers. Simplest model, no SBC to manage. Teams Calling Plans and Zoom Calling Plans both cover UAE DIDs. Carrier selection and porting handled by the platform." },
      { label: "Bring Your Own Trunk (BYOC)", text: "3CX or Operator Connect / Direct Routing. 3CX is the market leader for BYOC, works with any UAE SIP carrier. Teams Direct Routing and Zoom BYOC both support UAE carriers via a certified SBC (Grandstream, AudioCodes, Ribbon)." },
    ],
  },
  {
    num: "06",
    question: "Is call recording for UAE regulatory compliance required?",
    branches: [
      { label: "Yes (DFSA / CBUAE / DHA regulated)", text: "Design recording architecture before platform selection. Teams: compliance recording via Purview or Dubber. Webex: native recording plus Red Box, NICE. Avaya: reference for regulated estates. Must confirm storage sovereignty before committing to any cloud platform." },
      { label: "No specific mandate", text: "Any platform's native recording is sufficient. All six platforms include call recording. Choose the platform that wins on collaboration UX and cost, the recording decision is simpler without regulatory constraints." },
    ],
  },
];

const cloudMatrixVendors: MatrixVendor[] = [
  { name: "Teams Phone", featured: true },
  { name: "Cisco Webex" },
  { name: "Avaya Cloud" },
  { name: "Mitel MiCloud" },
  { name: "3CX (SaaS)" },
];

const cloudMatrixRows: MatrixRow[] = [
  {
    label: "Platform Heritage",
    type: "text",
    cells: [
      "Microsoft 1975; Teams Phone from Skype for Business",
      "Cisco UC 1999; Webex acquired 2007",
      "2000; Lucent / AT&T; deep PBX heritage",
      "1972 Canada; long mid-market telephony",
      "2005; open-SIP, partner-led",
    ],
  },
  {
    label: "Deployment",
    type: "stars",
    cells: [
      { stars: 5, note: "Cloud-native, M365-integrated, single admin" },
      { stars: 5, note: "Cloud-native plus on-prem hybrid" },
      { stars: 5, note: "Cloud Office plus on-prem Aura" },
      { stars: 5, note: "MiCloud plus on-prem MiVoice" },
      { stars: 5, note: "SaaS or self-hosted, full choice" },
    ],
  },
  {
    label: "AI / Assist",
    type: "stars",
    cells: [
      { stars: 5, note: "Copilot, transcripts, summaries, real-time" },
      { stars: 5, note: "Webex AI Assistant, coaching, summaries" },
      { stars: 3, note: "Limited today; roadmap catching up" },
      { stars: 3, note: "Limited today" },
      { stars: 3, note: "Limited AI today" },
    ],
  },
  {
    label: "Contact Centre",
    type: "stars",
    cells: [
      { stars: 4, note: "D365 CC plus Nice / Genesys partners" },
      { stars: 5, note: "Webex CC, best-in-class CCaaS" },
      { stars: 5, note: "Avaya Aura CC, mature and deep" },
      { stars: 4, note: "MiContact Center, solid mid-market" },
      { stars: 3, note: "Basic queuing only" },
    ],
  },
  {
    label: "PSTN / UAE",
    type: "stars",
    cells: [
      { stars: 5, note: "Calling Plans, Operator Connect, Direct Routing" },
      { stars: 5, note: "Calling Plans, Local GW, Operator Connect" },
      { stars: 4, note: "SBC plus carrier partner ecosystem" },
      { stars: 4, note: "MiCloud plus partner SIP" },
      { stars: 5, note: "BYOC, full UAE carrier flexibility" },
    ],
  },
  {
    label: "Physical Phone Cert.",
    type: "stars",
    cells: [
      { stars: 5, note: "Yealink, Poly, Jabra, Logitech certified" },
      { stars: 5, note: "Cisco 8800-series native plus third-party" },
      { stars: 4, note: "Mature device ecosystem" },
      { stars: 4, note: "Solid certified device options" },
      { stars: 5, note: "Open SIP, any certified phone works" },
    ],
  },
  {
    label: "TCO (5 yr / user)",
    type: "stars",
    cells: [
      { stars: 5, note: "Good value when M365 already purchased" },
      { stars: 4, note: "Higher at scale; rewards CC-led design" },
      { stars: 4, note: "Mid-range; perpetual plus maintenance" },
      { stars: 4, note: "Good value for mid-market estates" },
      { stars: 5, note: "Lowest TCO in market for SMB" },
    ],
  },
  {
    label: "Verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "Best when Microsoft is the productivity suite. Natural fit for M365 estates." },
      { recommended: true, text: "CCaaS leader. Best-in-class contact centre depth." },
      { recommended: true, text: "Enterprise PBX. Large UAE government and healthcare base." },
      { recommended: true, text: "Mid-market. Credible cloud overlay path." },
      { text: "Best SMB TCO; limited CCaaS depth." },
    ],
  },
];

const cloudVendors: VendorCard[] = [
  {
    name: "Microsoft Teams Phone",
    best: "Best for M365 Estates & AI-Assisted Calling (Recommended #1)",
    strength: "Cloud-native, deeply integrated with M365: single admin, single identity, single app. Copilot delivers real-time transcripts, call summaries and AI recap out of the box. Calling Plans, Operator Connect and Direct Routing all supported in UAE. Largest certified device ecosystem. Deepest UAE partner bench for E5 and Teams Phone Standard rollouts.",
    watch: "Native contact centre depth requires Dynamics 365 CC or a partner CCaaS (Nice, Genesys, Anywhere365). Pure CCaaS-led estates may prefer Webex CC natively. Requires an M365 licence to justify the economics.",
    logo: "/logos/microsoft.svg",
  },
  {
    name: "Cisco Webex Calling",
    best: "Best for Contact Centre Depth & Cisco Estates (Recommended)",
    strength: "Cloud-native with on-prem hybrid options. Webex Contact Center is best-in-class for omnichannel and AI-assisted agent flows. Webex AI Assistant delivers summaries, insights and coaching. Calling Plans, Local Gateway and Operator Connect all supported. Seamless with Cisco networking, switching and security investments.",
    watch: "Per-user subscription tiers can escalate at scale. The Webex Suite licence model rewards a contact-centre-led design rather than collaboration-only seats.",
    logo: "/logos/Cisco.svg",
  },
  {
    name: "Avaya Cloud Office",
    best: "Best for Regulated UAE Enterprise & Government (Recommended)",
    strength: "Reference enterprise telephony heritage from Lucent and AT&T. Cloud Office plus on-prem Aura covers cloud and hybrid models. Avaya Aura Contact Center is mature and widely deployed in UAE government, healthcare and hospitality. Largest brownfield UAE enterprise install base. Mature migration tooling.",
    watch: "AI assist is still maturing compared with Teams Copilot or Webex AI. Monitor the platform roadmap carefully following the 2023 to 2024 restructuring.",
    logo: "/logos/Avaya.png",
  },
  {
    name: "Mitel MiCloud Connect",
    best: "Best for Phased Migration from On-Prem PBX (Recommended)",
    strength: "Mature mid-market PBX with a credible cloud overlay path. MiCloud Connect and on-prem MiVoice cover cloud and hybrid estates. MiContact Center is solid for mid-sized customer service. Strong UAE coverage via specialist partners. Phased migration tooling, retain PBX investment and add cloud incrementally.",
    watch: "AI assist is limited versus Teams Copilot or Webex AI. Roadmap clarity post-restructuring is a watch item. Verify long-term support commitments before new investment.",
    logo: "/logos/Mitel.png",
  },
  {
    name: "3CX (SaaS)",
    best: "Lowest TCO in Market, Best SMB Value",
    strength: "Very low TCO, annual subscription with predictable cost. SaaS or self-hosted gives full deployment flexibility. Bring-your-own SIP trunk, full UAE carrier choice. Largest UAE installer base across SMB and mid-market. Web client, desktop app, iOS and Android softphones included.",
    watch: "Not the choice for deep contact centre, enterprise compliance recording or AI-assist requirements. Suits price-sensitive SMB; not for regulated enterprise needs.",
    logo: "/logos/3CX.svg",
  },
  {
    name: "Zoom Phone",
    best: "AI-First Collaboration & Modern Team UX",
    strength: "Cloud-native with simple per-user licensing. Zoom AI Companion delivers transcripts, summaries and smart call notes. Zoom Contact Center is AI-first by design. Calling Plans, BYOC and Carrier options all supported. Zoom app is the reference collaboration client in many UAE verticals.",
    watch: "Smaller UAE partner footprint than Microsoft or Cisco today. Enterprise telephony depth, survivable branch and complex PBX feature parity, is still maturing.",
    logo: "/logos/Zoom.png",
  },
];

const cloudFeatureVendors = ["Teams Phone", "Cisco Webex", "Avaya Cloud", "Mitel MiCloud", "3CX SaaS"];

const cloudFeatureRows: FeatureRow[] = [
  {
    label: "Collaboration UX",
    cells: [
      { tier: "best", note: "Teams is the reference modern client" },
      { tier: "best", note: "Webex app is excellent, well-integrated" },
      { tier: "good", note: "Avaya Workplace functional, not leading" },
      { tier: "good", note: "MiTeam functional, lighter on collaboration" },
      { tier: "good", note: "Web / desktop / mobile, basic UX" },
    ],
  },
  {
    label: "Telephony Depth",
    cells: [
      { tier: "excellent", note: "Deep PSTN & PBX feature parity, growing" },
      { tier: "best", note: "Cisco UC heritage, deepest feature set" },
      { tier: "best", note: "Reference PBX plus survivable branch" },
      { tier: "excellent", note: "Mature PBX features for mid-market" },
      { tier: "excellent", note: "Solid telephony, simple model" },
    ],
  },
  {
    label: "CCaaS / Contact Centre",
    cells: [
      { tier: "excellent", note: "D365 CC plus Nice / Genesys / Anywhere365" },
      { tier: "best", note: "Webex CC, omnichannel, AI-first" },
      { tier: "best", note: "Avaya Aura CC, widely deployed UAE" },
      { tier: "excellent", note: "MiContact Center, solid mid-market" },
      { tier: "good", note: "Basic queuing only; no CCaaS depth" },
    ],
  },
  {
    label: "AI Assist & Intelligence",
    cells: [
      { tier: "best", note: "Copilot, transcripts, summaries, real-time" },
      { tier: "best", note: "Webex AI, coaching, insights" },
      { tier: "good", note: "Limited; roadmap catching up" },
      { tier: "good", note: "Limited today" },
      { tier: "good", note: "Limited AI today" },
    ],
  },
  {
    label: "PSTN Flexibility UAE",
    cells: [
      { tier: "best", note: "Plans, Operator Connect, Direct Routing" },
      { tier: "best", note: "Plans, Local GW, Operator Connect" },
      { tier: "excellent", note: "SBC plus carrier partner" },
      { tier: "excellent", note: "MiCloud plus partner SIP" },
      { tier: "excellent", note: "BYOC, any UAE carrier" },
    ],
  },
  {
    label: "Compliance Recording",
    cells: [
      { tier: "excellent", note: "Native compliance recording plus Dubber, NICE" },
      { tier: "excellent", note: "Native plus Red Box, NICE partner ecosystem" },
      { tier: "best", note: "Reference for regulated UAE industries" },
      { tier: "excellent", note: "Mature options for regulated mid-market" },
      { tier: "good", note: "Partner-dependent; limited native" },
    ],
  },
  {
    label: "Admin & Management",
    cells: [
      { tier: "best", note: "Teams Admin Center, single pane, Intune" },
      { tier: "best", note: "Webex Control Hub, excellent UX" },
      { tier: "excellent", note: "System Manager, powerful but complex" },
      { tier: "excellent", note: "MiCloud admin, solid for mid-market" },
      { tier: "strong", note: "3CX web admin, intuitive, modern" },
    ],
  },
  {
    label: "Physical Phone Ecosystem",
    cells: [
      { tier: "best", note: "Largest certified ecosystem: Yealink, Poly, Jabra" },
      { tier: "best", note: "Deep Cisco-native plus broad third-party cert" },
      { tier: "excellent", note: "Mature device ecosystem" },
      { tier: "excellent", note: "Solid certified device range" },
      { tier: "excellent", note: "Open SIP, any certified device" },
    ],
  },
  {
    label: "5-Year TCO",
    cells: [
      { tier: "excellent", note: "Good value with M365 already active" },
      { tier: "strong", note: "Higher at scale; CC-led design rewarded" },
      { tier: "strong", note: "Mid-range; perpetual plus maintenance" },
      { tier: "excellent", note: "Good value for mid-market" },
      { tier: "best", note: "Lowest TCO for SMB and mid-market" },
    ],
  },
];

/* ════════════════ IP TELEPHONY & HARDWARE, DATA ════════════════ */

const pbxLineup: LineupItem[] = [
  { slug: "grandstream-ucm", name: "Grandstream UCM", tag: "Recommended #1", logo: "/logos/Grandstream.png" },
  { slug: "3cx-self", name: "3CX (Self-Hosted)", tag: "Recommended #1", logo: "/logos/3CX.svg" },
  { slug: "cisco-cucm", name: "Cisco CUCM", tag: "Enterprise only", logo: "/logos/Cisco.svg" },
  { slug: "avaya-aura", name: "Avaya Aura On-Prem", tag: "Brownfield large enterprise", logo: "/logos/Avaya.png" },
  { slug: "freepbx", name: "FreePBX / Asterisk", tag: "DIY / MSP", logo: "/logos/FreePBX.png" },
];

const endpointLineup: LineupItem[] = [
  { slug: "yealink", name: "Yealink", tag: "Recommended #1", logo: "/logos/Yealink.png" },
  { slug: "grandstream-phones", name: "Grandstream Phones", tag: "Best Value", logo: "/logos/Grandstream.png" },
  { slug: "fanvil", name: "Fanvil", tag: "Entry tier / budget", logo: "/logos/Fanvil.png" },
  { slug: "cisco-phones", name: "Cisco IP Phones", tag: "Cisco CUCM / Webex only", logo: "/logos/Cisco.svg" },
  { slug: "poly", name: "Poly (HP)", tag: "Conference & video bars", logo: "/logos/Poly.png" },
  { slug: "snom", name: "Snom", tag: "3CX reference pairing", logo: "/logos/Snom.png" },
];

const hardwareQuestions: BranchItem[] = [
  {
    num: "01",
    question: "Do you need physical IP desk phones, or is a softphone app sufficient?",
    branches: [
      { label: "Physical phones", text: "Choose hardware carefully. If connecting to Teams Phone, you must buy Teams-certified phones (Yealink T55A, T58A; Poly VVX Teams). If connecting to 3CX or any open-SIP PBX, any SIP-certified phone works: Yealink, Grandstream, Fanvil, Snom." },
      { label: "Softphone only", text: "No desk phone hardware required. 3CX, Grandstream UCM, Cisco CUCM and Avaya all include softphone clients. You still need a PBX platform, but your endpoint budget is limited to headsets." },
    ],
  },
  {
    num: "02",
    question: "How many extensions do you need? What is the site count?",
    branches: [
      { label: "Under 500 users, 1 to 3 sites", text: "Grandstream UCM or 3CX self-hosted. The UCM6510 covers 2,000 users on a single appliance. 3CX scales with the hosting server. Both are free or low-cost on licence and are the right platforms for the overwhelming majority of UAE SMB and mid-market deployments." },
      { label: "500+ users, multi-site enterprise", text: "Cisco CUCM, Avaya Aura, or a 3CX clustered deployment. Cisco CUCM and Avaya Aura are designed for large enterprise with full survivable branch, complex dial plans and regulated CCaaS. Only recommended if you are already on those estates." },
    ],
  },
  {
    num: "03",
    question: "Do you have existing analog phone lines, fax machines or door entry phones to keep?",
    branches: [
      { label: "Yes, analog devices exist", text: "Grandstream UCM is the default answer. FXO and FXS ports are built into the UCM appliance, no separate ATA required for SMB estates. For larger estates or non-UCM PBX, Grandstream HT800-series ATAs (HT802, HT814, HT818) bridge analog devices to any SIP PBX." },
      { label: "No analog devices", text: "Full flexibility. Any PBX platform works: Grandstream UCM, 3CX, FreePBX or cloud-hosted. The decision shifts to user count, budget and contact centre depth." },
    ],
  },
  {
    num: "04",
    question: "Do you need DECT wireless handsets for warehouse, hospitality or mobile floor workers?",
    branches: [
      { label: "Yes", text: "Yealink or Grandstream DECT ecosystem. Yealink W80B (multi-cell) or W70B (single-cell) with W56H/W53H handsets, the most widely deployed DECT system in UAE. Grandstream DP752 plus DP722/DP730 is a strong alternative at lower cost. Always conduct a site survey before ordering, concrete and steel significantly affect DECT coverage range." },
      { label: "No", text: "Standard desk phone range applies. Yealink T4x series or Grandstream GRP26xx are the standard UAE choice. See the endpoint comparison below for a price and feature guide by user tier." },
    ],
  },
  {
    num: "05",
    question: "Will the phones register to Microsoft Teams, Zoom Phone, or a traditional SIP PBX?",
    branches: [
      { label: "Microsoft Teams Phone", text: "Must buy Teams-certified phones. Yealink T55A, T58A, T53W-Teams, MVC840/MVC940 for rooms. Poly VVX Teams-series, Studio X video bars. These run a locked Teams OS and cannot dual-register to a SIP PBX. Buy Teams models only if Teams Phone is confirmed." },
      { label: "SIP PBX (3CX, UCM, Grandstream, FreePBX)", text: "Any open-SIP phone works: Yealink, Grandstream, Fanvil, Snom, Cisco SIP mode. Yealink T series and Grandstream GRP series are the two most common UAE choices. Fanvil for entry tier. Snom for 3CX-native deployments." },
    ],
  },
  {
    num: "06",
    question: "What is your budget per desk phone extension?",
    branches: [
      { label: "Under AED 300 per phone", text: "Fanvil X3SG or Grandstream GRP2601. Fanvil X3SG is the lowest-cost 3CX-certified entry phone on the UAE market (around AED 165 to 200). The GRP2601 is excellent for back-office and basic calling at a similar price point. Both auto-provision with 3CX." },
      { label: "AED 300 to 700", text: "Yealink T43U / T46U (standard tier). The T43U at around AED 350 is the standard mid-range UAE desk phone. The T46U at around AED 480 adds a colour screen and 16-line keys. These are the two highest-volume phone models in UAE SMB and corporate deployments." },
    ],
  },
];

const pbxMatrixVendors: MatrixVendor[] = [
  { name: "Grandstream UCM", featured: true },
  { name: "3CX Self-Hosted", featured: true },
  { name: "Cisco CUCM" },
  { name: "Avaya Aura" },
  { name: "FreePBX" },
];

const pbxMatrixRows: MatrixRow[] = [
  {
    label: "Deployment",
    type: "text",
    cells: [
      "Hardware appliance, no server OS to manage",
      "Software on Windows, Linux, VM or cloud",
      "VM or Cisco UCS, enterprise grade",
      "Server or VM, large UAE install base",
      "Linux VM or bare metal, self-managed",
    ],
  },
  {
    label: "Licence Cost",
    type: "stars",
    cells: [
      { stars: 5, note: "Free perpetual, zero annual fee (UCM6202 to UCM6510)" },
      { stars: 4, note: "Annual subscription (free tier limited post-2022)" },
      { stars: 2, note: "Per-device plus CUWL suite, highest cost in class" },
      { stars: 3, note: "Perpetual plus maintenance annuity" },
      { stars: 4, note: "Open-source licence; support is the cost" },
    ],
  },
  {
    label: "Built-in Analog",
    type: "stars",
    cells: [
      { stars: 5, note: "FXO + FXS ports onboard, no ATA needed for SMB" },
      { stars: 3, note: "Via Grandstream HT ATA series" },
      { stars: 3, note: "Via Cisco VG gateway" },
      { stars: 3, note: "Via Avaya Media Gateway / SBC" },
      { stars: 3, note: "Via Digium / Sangoma cards" },
    ],
  },
  {
    label: "Contact Centre",
    type: "stars",
    cells: [
      { stars: 2, note: "Basic queuing only; not for CCaaS" },
      { stars: 2, note: "Basic call queuing; no CCaaS depth" },
      { stars: 5, note: "UCCX + UCCE, full CCaaS" },
      { stars: 5, note: "Avaya Aura CC, mature, full CCaaS" },
      { stars: 3, note: "Queues (basic); CCaaS via add-ons" },
    ],
  },
  {
    label: "Phone Compatibility",
    type: "stars",
    cells: [
      { stars: 5, note: "GXP/GRP native zero-config plus third-party SIP" },
      { stars: 5, note: "Any SIP: Yealink, GS, Fanvil, Snom, Cisco" },
      { stars: 4, note: "Cisco SCCP/SIP native; third-party complex" },
      { stars: 3, note: "Avaya H.323/SIP native; third-party with care" },
      { stars: 5, note: "Any SIP, maximum flexibility" },
    ],
  },
  {
    label: "Zero-Config Provisioning",
    type: "stars",
    cells: [
      { stars: 5, note: "GDMS cloud portal, zero-touch for all GS phones" },
      { stars: 5, note: "3CX auto-provision: Yealink, Snom, Fanvil, GS" },
      { stars: 3, note: "CUCM admin, powerful but complex (CCNA req'd)" },
      { stars: 3, note: "System Manager, powerful but complex" },
      { stars: 3, note: "FreePBX endpoint manager, community-driven" },
    ],
  },
  {
    label: "Survivable Branch",
    type: "stars",
    cells: [
      { stars: 5, note: "UCM at each branch, full local PBX, no WAN needed" },
      { stars: 3, note: "3CX branch over VPN; WAN still needed for mgmt" },
      { stars: 5, note: "Cisco SRST, native survivable branch" },
      { stars: 5, note: "Avaya SRG, native survivable gateway" },
      { stars: 3, note: "Remote instances; manual config" },
    ],
  },
  {
    label: "Verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "#1 SMB and Hospitality. Free perpetual, built-in analog, GDMS zero-config." },
      { recommended: true, rank: "#1", text: "#1 Flexibility. Largest UAE base; open SIP; any hosting model." },
      { text: "Cisco estates only. Disproportionate cost for greenfield." },
      { text: "Brownfield large enterprise. Monitor roadmap carefully." },
      { text: "Cost-conscious SMB with Linux skills, or via an MSP." },
    ],
  },
];

const pbxVendors: VendorCard[] = [
  {
    name: "Grandstream UCM Series",
    best: "Best all-in-one hardware PBX, UAE SMB up to ~1,000 users (Recommended #1)",
    strength: "Free perpetual licence, UCM6202 to UCM6510 covers 5 to 1,000 users. Hardware appliance, plug in and configure, no server OS management. FXO and FXS ports onboard for analog lines and legacy phones without a separate ATA. GDMS cloud portal delivers zero-config provisioning for all Grandstream phones. Built-in IVR, voicemail, call recording, fax server and video conferencing on UCM6300+.",
    watch: "The appliance must be physically managed, firmware is the reseller's responsibility. Contact centre features are basic and not suitable for CCaaS requirements. Clustering for very large sites requires careful design planning.",
    logo: "/logos/Grandstream.png",
  },
  {
    name: "3CX (Self-Hosted)",
    best: "Most widely deployed SMB / mid-market PBX in UAE (Recommended #1)",
    strength: "Open SIP, works with any SIP-certified phone: Yealink, Grandstream, Fanvil, Snom, Cisco. Self-hosted on Windows, Linux, VM, Raspberry Pi or cloud (Azure / AWS). Web-based admin with auto-provisioning for all major phone brands. Integrated softphone, WebRTC client, iOS and Android apps. Largest UAE installer base, widest partner support bench in market.",
    watch: "3CX shifted to a subscription model in 2022, the free tier is now limited at 10 simultaneous calls. Enterprise contact centre depth is limited versus Avaya or Cisco. Not the platform for complex ACD or CCaaS requirements.",
    logo: "/logos/3CX.svg",
  },
  {
    name: "Cisco CUCM",
    best: "Reference enterprise feature set, only for existing Cisco estates",
    strength: "Reference enterprise PBX with the deepest feature set of any platform. Cisco SRST for native survivable remote branch telephony. UCCX and UCCE for full CCaaS capability. Huge UAE installed base in enterprise, banking and government. Native integration with Cisco 7800, 8800 and 8865 phone series.",
    watch: "Highest cost and complexity in market, requires Cisco-certified engineers for deployment and maintenance. Cisco is actively migrating CUCM estates to Webex Calling. Evaluate the hybrid path carefully before any new CUCM investment in 2025 to 2026.",
    logo: "/logos/Cisco.svg",
  },
  {
    name: "Avaya Aura (On-Premises)",
    best: "Large UAE government and healthcare installed base",
    strength: "Mature enterprise PBX with a full feature set for regulated environments. Avaya Aura Contact Center deeply integrated. Avaya SRG for multi-site branch resilience. Huge UAE installed base across government, healthcare, hospitality and finance.",
    watch: "Avaya restructured through Chapter 11 in 2023 to 2024. On-prem Aura is in extended maintenance mode. Confirm long-term roadmap and support commitments before any new on-premises investment.",
    logo: "/logos/Avaya.png",
  },
  {
    name: "FreePBX / Asterisk",
    best: "Cost-conscious SMB with Linux skills, or MSP-delivered",
    strength: "Open-source Asterisk core with the FreePBX management GUI. Zero licence cost, runs on a Linux VM or bare metal. Maximum flexibility and any-SIP phone compatibility. Strong community and a large global MSP base for support.",
    watch: "Self-managed, deployment and maintenance require Linux and Asterisk skills. No vendor SLA unless wrapped by an MSP. Best for cost-conscious SMB with in-house Linux capability, or delivered as a managed service.",
    logo: "/logos/FreePBX.png",
  },
];

const endpointMatrixVendors: MatrixVendor[] = [
  { name: "Yealink", featured: true },
  { name: "Grandstream" },
  { name: "Fanvil" },
  { name: "Cisco Phones" },
  { name: "Poly (HP)" },
];

const endpointMatrixRows: MatrixRow[] = [
  {
    label: "UAE Price Range",
    type: "text",
    cells: [
      "T31P to T57W: AED 165 to 920. Widest range.",
      "GXP1620 to GXV3380: AED 130 to 1,650. Best value/feature.",
      "X3SG to X210: AED 110 to 735. Lowest entry price.",
      "7841 to 8865: AED 440 to 1,470. Premium pricing.",
      "VVX150 to VVX450: AED 330 to 1,285.",
    ],
  },
  {
    label: "Teams Phone Cert.",
    type: "stars",
    cells: [
      { stars: 5, note: "T55A, T58A, T53W-Teams, MVC840/940 rooms" },
      { stars: 0, note: "None, no Teams certification" },
      { stars: 0, note: "None" },
      { stars: 2, note: "Via Webex only; not standalone Teams" },
      { stars: 5, note: "VVX Teams-series plus Studio X video bars" },
    ],
  },
  {
    label: "Zoom Phone Cert.",
    type: "stars",
    cells: [
      { stars: 5, note: "T54W-Zoom, T57W-Zoom, ZVC800 Zoom Rooms" },
      { stars: 0, note: "None" },
      { stars: 0, note: "None" },
      { stars: 0, note: "None" },
      { stars: 5, note: "VVX plus Studio X Zoom-certified" },
    ],
  },
  {
    label: "3CX / Open SIP Auto-Provision",
    type: "stars",
    cells: [
      { stars: 5, note: "Full auto-provision in 3CX console" },
      { stars: 5, note: "Full via 3CX plus GDMS portal" },
      { stars: 5, note: "3CX certified; popular UAE SMB budget" },
      { stars: 2, note: "Limited on non-CUCM; SCCP features locked" },
      { stars: 5, note: "Excellent open SIP across all models" },
    ],
  },
  {
    label: "DECT / Wireless",
    type: "stars",
    cells: [
      { stars: 5, note: "W70B single-cell, W80B multi-cell; W56H/W53H" },
      { stars: 5, note: "DP750 single-cell, DP752 multi-cell; DP722/DP730" },
      { stars: 2, note: "Limited, XD1/XD3 single-cell only" },
      { stars: 0, note: "No native DECT" },
      { stars: 5, note: "CS500 DECT headsets; Savi wireless, headset leader" },
    ],
  },
  {
    label: "Conference Phones",
    type: "stars",
    cells: [
      { stars: 5, note: "CP965 flagship, CP960 Teams, CP935W wireless" },
      { stars: 5, note: "GAC2500 / GAC2570 Android conference" },
      { stars: 2, note: "Limited conference range" },
      { stars: 5, note: "8832 / 8831, solid on CUCM" },
      { stars: 5, note: "Poly Trio 8500/8800, best-in-class mic array" },
    ],
  },
  {
    label: "Video Room Systems",
    type: "stars",
    cells: [
      { stars: 5, note: "MVC840/940 Teams Rooms; ZVC800 Zoom Rooms" },
      { stars: 5, note: "GVC3210/3220 SIP-native; no cloud sub needed" },
      { stars: 0, note: "No video room systems" },
      { stars: 5, note: "Room Kit / Board via CUCM or Webex" },
      { stars: 5, note: "Studio X30/X50/X70, Teams + Zoom certified" },
    ],
  },
  {
    label: "ATA / Analog Gateway",
    type: "stars",
    cells: [
      { stars: 0, note: "No ATA, pair with Grandstream HT" },
      { stars: 5, note: "HT801/802/814/818, most comprehensive in market" },
      { stars: 2, note: "Limited; GS HT series preferred" },
      { stars: 3, note: "Cisco ATA 190, CUCM only" },
      { stars: 0, note: "No ATA" },
    ],
  },
  {
    label: "Best Paired With",
    type: "text",
    cells: [
      "Teams Phone (cert), Zoom Phone (cert), 3CX, UCM, FreePBX",
      "Grandstream UCM (native), 3CX, FreePBX / Asterisk",
      "3CX, UCM, FreePBX, not for cloud UC",
      "Cisco CUCM or Webex Calling only",
      "Teams Phone, Webex, Zoom (video); any SIP (VVX)",
    ],
  },
  {
    label: "Strategic Verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "Widest range and certifications. Teams, Zoom and open-SIP coverage, strong DECT, the safe default for most UAE estates." },
      { recommended: true, text: "Best value. Best AED-per-feature ratio and native pairing with Grandstream UCM and GDMS." },
      { text: "Entry-tier budget leader. Lowest cost per extension for 3CX and open-SIP estates." },
      { text: "Cisco CUCM or Webex estates only. Premium pricing; SCCP features locked off-CUCM." },
      { text: "Conference and video-bar leader. Teams, Webex and Zoom certified; premium tier." },
    ],
  },
];

const endpointFeatureVendors = ["Yealink", "Grandstream", "Fanvil", "Cisco Phones", "Poly (HP)"];

const endpointFeatureRows: FeatureRow[] = [
  {
    label: "Teams Phone Certification",
    cells: [
      { tier: "best", note: "T55A, T58A, MVC840/940 certified" },
      { tier: "none", note: "No Microsoft Teams certification" },
      { tier: "none", note: "None" },
      { tier: "good", note: "Via Cisco Webex integration only" },
      { tier: "excellent", note: "VVX plus Studio X Teams-certified" },
    ],
  },
  {
    label: "Open SIP / 3CX Compatibility",
    cells: [
      { tier: "best", note: "Full auto-provisioning in 3CX console" },
      { tier: "best", note: "Full via 3CX plus GDMS; best with UCM" },
      { tier: "excellent", note: "3CX certified; UAE SMB budget leader" },
      { tier: "good", note: "Limited on non-CUCM; SCCP features locked" },
      { tier: "excellent", note: "Excellent open SIP across all models" },
    ],
  },
  {
    label: "DECT / Wireless Ecosystem",
    cells: [
      { tier: "best", note: "W70B single / W80B multi-cell with campus handover" },
      { tier: "excellent", note: "DP750/752 multi-cell; solid range" },
      { tier: "good", note: "Limited, single-cell XD series only" },
      { tier: "none", note: "No native Cisco DECT" },
      { tier: "excellent", note: "CS500 DECT headsets, headset market leader" },
    ],
  },
  {
    label: "Conference Phone Quality",
    cells: [
      { tier: "best", note: "CP965 flagship + CP960 Teams + CP935W wireless" },
      { tier: "excellent", note: "GAC2500/2570 Android, strong value" },
      { tier: "good", note: "Limited conference range" },
      { tier: "excellent", note: "8832/8831 solid on CUCM" },
      { tier: "best", note: "Poly Trio, best-in-class mic array" },
    ],
  },
  {
    label: "Video Room Systems",
    cells: [
      { tier: "best", note: "MVC840/940 Teams; ZVC800 Zoom Rooms certified" },
      { tier: "excellent", note: "GVC3210/3220 SIP-native; no cloud sub needed" },
      { tier: "none", note: "No video room systems" },
      { tier: "excellent", note: "Room Kit / Board via CUCM or Webex" },
      { tier: "best", note: "Studio X30/X50/X70, Teams + Zoom premium" },
    ],
  },
  {
    label: "ATA / Analog Gateway",
    cells: [
      { tier: "none", note: "No ATA, pair with Grandstream HT series" },
      { tier: "best", note: "HT801/802/814/818, most comprehensive in market" },
      { tier: "good", note: "Limited; GS HT preferred" },
      { tier: "strong", note: "Cisco ATA 190, CUCM supported only" },
      { tier: "none", note: "No ATA" },
    ],
  },
  {
    label: "UAE Price Competitiveness",
    cells: [
      { tier: "excellent", note: "Competitive; slight premium over GS/Fanvil" },
      { tier: "best", note: "Most price-competitive, best AED-per-feature ratio" },
      { tier: "best", note: "Lowest entry pricing, best cost per extension" },
      { tier: "good", note: "Premium, 2 to 3x Yealink at equivalent spec" },
      { tier: "strong", note: "Premium justified at conference / video bar tier" },
    ],
  },
  {
    label: "Firmware & Long-Term Support",
    cells: [
      { tier: "best", note: "Regular updates; 5-yr lifecycle; PSIRT active" },
      { tier: "excellent", note: "Regular; GDMS simplifies estate-wide updates" },
      { tier: "strong", note: "Good cadence; less frequent than Yealink" },
      { tier: "best", note: "Cisco lifecycle, longest hardware support" },
      { tier: "strong", note: "Good; HP acquisition creates some uncertainty" },
    ],
  },
];

/* ════════════════ FAQ ════════════════ */

const faqs = [
  {
    question: "Teams Phone or Webex Calling for a UAE enterprise?",
    answer:
      "It depends on the productivity estate. If the organisation runs Microsoft 365 as its primary productivity suite, Teams Phone is the natural extension and typically wins on TCO, adoption and admin overhead. If the estate is Cisco-standardised on UC, networking and security, Webex Calling keeps the architecture coherent and Webex Contact Center is best-in-class. Both are excellent; the right answer follows the productivity suite and the contact centre requirement, not the brochure.",
  },
  {
    question: "Grandstream UCM or 3CX for a UAE SMB?",
    answer:
      "Both are our joint number-one for UAE SMB and mid-market. Choose Grandstream UCM when you want an all-in-one hardware appliance with free perpetual licensing and built-in FXO/FXS analog ports, ideal where legacy analog lines or fax exist. Choose 3CX when you want software flexibility (self-hosted or cloud), open-SIP phone choice and the largest UAE partner bench. UCM wins on plug-and-play and analog; 3CX wins on deployment flexibility.",
  },
  {
    question: "Do we need a local PBX if we move to Teams Phone?",
    answer:
      "No. Teams Phone is a cloud PBX. PSTN can be delivered via Calling Plans, Operator Connect (a certified UAE carrier connects directly to your tenant with no customer SBC) or Direct Routing (BYOC via a certified SBC such as Grandstream, AudioCodes or Ribbon). You only retain an on-prem PBX for survivable-branch or specific compliance reasons, usually as a defined phase rather than a permanent design.",
  },
  {
    question: "Yealink or Grandstream phones for a 3CX deployment?",
    answer:
      "Both auto-provision natively with 3CX. Yealink T-series is the highest-volume standard-tier choice in the UAE (T43U around AED 350, T46U around AED 480) with the widest range and a strong DECT ecosystem. Grandstream GRP-series offers the best AED-per-feature ratio and pairs natively with Grandstream UCM and GDMS. For lowest entry cost, Fanvil X3SG is the budget 3CX-certified option.",
  },
  {
    question: "Can Yealink phones work with Microsoft Teams without a local PBX?",
    answer:
      "Yes. Teams-certified Yealink models (T55A, T58A, T53W-Teams, MVC840/940 for rooms) run a locked Teams OS and register directly to Teams Phone in the cloud, with no local PBX required. Note these Teams models cannot dual-register to a SIP PBX, so only buy Teams variants once Teams Phone is confirmed; for open-SIP PBX use the standard Yealink T-series instead.",
  },
  {
    question: "What is the difference between Grandstream GXP and GRP series?",
    answer:
      "GXP is the older desk-phone line; GRP is the current generation, designed for zero-touch GDMS cloud provisioning and unified firmware management across the estate. For new UAE deployments choose the GRP series (for example GRP2601 for back-office, GRP26xx for standard users), which auto-provisions cleanly with both 3CX and Grandstream UCM.",
  },
  {
    question: "How do we connect existing fax machines and analog phones to a new IP PBX?",
    answer:
      "On Grandstream UCM, the FXS and FXO ports are built into the appliance, so analog phones, fax machines and PSTN lines connect directly with no separate device for SMB estates. For larger estates or a non-UCM PBX (3CX, FreePBX, Cisco, Avaya), use an analog telephone adapter (ATA): Grandstream HT802/HT814/HT818 bridges analog devices to any SIP PBX. Fax is best moved to T.38 or a fax-server where reliability matters.",
  },
  {
    question: "Call recording for UAE compliance, what should we plan for?",
    answer:
      "Define scope first: all calls or selective, native or third-party, retention period and data sovereignty. UAE banking and financial-sector retention is commonly five to ten years. Every shortlisted platform (Teams, Webex, Avaya, Mitel, Zoom, and the on-prem PBX options) supports native or certified recording, but licensing and storage architecture vary. Lock the recording requirement into the platform decision rather than bolting it on after rollout.",
  },
  {
    question: "Is Artiflex IT tied to a specific UC or telephony vendor?",
    answer:
      "No. We deliver Microsoft Teams Phone, Cisco Webex Calling, Avaya, Mitel, 3CX and Zoom Phone as cloud UC platforms, Grandstream UCM, 3CX, Cisco CUCM, Avaya Aura and FreePBX as IP PBX platforms, and Yealink, Grandstream, Fanvil, Poly, Snom and Cisco as endpoint brands. The recommendation follows the assessment, not the margin.",
  },
];

/* ════════════════ REUSABLE RENDERERS ════════════════ */

function MiniLineup({ title, items }: { title: string; items: LineupItem[] }) {
  return (
    <div>
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1B8AC7]">
        {title}
      </p>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((v) => {
          const top = v.tag?.includes("#1");
          return (
            <div
              key={v.slug}
              className={`flex items-center gap-3 rounded-xl border bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                top ? "border-[#28B5E1]/50" : "border-slate-200 hover:border-[#28B5E1]/40"
              }`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 ring-1 ring-slate-200/70">
                <img
                  src={v.logo}
                  alt=""
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                  className="h-6 w-6 object-contain"
                />
              </span>
              <div className="min-w-0">
                <p className="font-display text-sm font-bold leading-tight text-slate-900">{v.name}</p>
                {v.tag && (
                  <p className={`text-[11px] font-medium ${top ? "text-[#1B8AC7]" : "text-slate-500"}`}>
                    {top && <span aria-hidden>✦ </span>}
                    {v.tag.replace(/\s*#\d+/, "")}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BranchQuestions({ items }: { items: BranchItem[] }) {
  return (
    <div className="mt-12 grid gap-5 md:grid-cols-2">
      {items.map((q) => (
        <article
          key={q.num}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#045891] to-[#1B8AC7] font-display text-sm font-bold text-white">
              {q.num}
            </span>
            <h3 className="pt-1 font-display text-base font-bold text-slate-900">{q.question}</h3>
          </div>
          <div className="mt-4 space-y-3">
            {q.branches.map((b) => (
              <div key={b.label} className="rounded-xl border-l-2 border-[#28B5E1]/50 bg-slate-50/70 p-3.5">
                <p className="text-sm font-semibold text-[#045891]">
                  {b.label} <span aria-hidden className="text-[#28B5E1]">→</span>
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{b.text}</p>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function ComparisonTable({ vendors, rows }: { vendors: MatrixVendor[]; rows: MatrixRow[] }) {
  return (
    <div className="mt-12 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + vendors.length * 116) }}>
          <thead>
            <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
              <th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-5 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">
                Criteria
              </th>
              {vendors.map((v) => (
                <th key={v.name} className={`border-l border-white/15 px-2 py-3 sm:px-4 sm:py-5 align-bottom ${v.featured ? "bg-white/10" : ""}`}>
                  <p className="font-display text-sm font-semibold text-white sm:text-base">
                    {v.name}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rIdx) => (
              <tr
                key={row.label}
                className={`transition-colors ${
                  row.type === "verdict"
                    ? "border-t-2 border-[#28B5E1]/30 bg-gradient-to-r from-[#04101E] to-[#0A3D6B]"
                    : `border-t border-[#0A3D6B]/20 hover:bg-[#28B5E1]/[0.04] ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`
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
                      row.type === "verdict" ? "border-l border-white/10 text-slate-300" : "border-l border-[#0A3D6B]/20 text-slate-700"
                    } ${cIdx === 0 && row.type !== "verdict" ? "bg-[#28B5E1]/[0.04]" : ""}`}
                  >
                    {row.type === "stars" ? (
                      <div>
                        <span aria-label={`${(cell as StarCell).stars} out of 5`} className="text-amber-500">
                          {"★".repeat((cell as StarCell).stars)}
                          <span className="text-slate-300">{"★".repeat(5 - (cell as StarCell).stars)}</span>
                        </span>
                        <p className="mt-1 text-xs leading-snug text-slate-600">{(cell as StarCell).note}</p>
                      </div>
                    ) : row.type === "verdict" ? (
                      <div className="space-y-1.5">
                        {(cell as VerdictCell).recommended && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                            ✓ Recommended
                          </span>
                        )}
                        <p className="text-xs leading-relaxed text-slate-300">{(cell as VerdictCell).text}</p>
                      </div>
                    ) : (
                      <p className="text-xs leading-snug text-slate-700">{cell as string}</p>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GartnerTable({ vendors, rows }: { vendors: string[]; rows: FeatureRow[] }) {
  return (
    <>
      <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-3 text-xs text-slate-600">
        <span className="font-mono uppercase tracking-wider text-slate-500">Rating scale:</span>
        {(["best", "excellent", "veryStrong", "strong", "good", "none"] as Tier[]).map((t) => {
          const s = tierStyles[t];
          return (
            <span key={t} className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${s.bg} ${s.text}`}>
              {t === "best" && <span aria-hidden="true">★</span>}
              {s.label}
            </span>
          );
        })}
      </div>
      <div className="mt-8 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + vendors.length * 116) }}>
            <thead>
              <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                <th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-5 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">
                  Capability
                </th>
                {vendors.map((v, i) => (
                  <th key={v} className={`border-l border-white/15 px-2 py-3 sm:px-4 sm:py-5 align-bottom font-display text-sm font-semibold text-white sm:text-base ${i === 0 ? "bg-white/10" : ""}`}>
                    {v}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={row.label} className={`border-t border-[#0A3D6B]/20 transition-colors hover:bg-[#28B5E1]/[0.04] ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`}>
                  <th scope="row" className={`sticky left-0 z-10 px-2 py-3 align-middle sm:px-4 sm:py-4 font-display text-sm font-semibold text-slate-900 ${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                    {row.label}
                  </th>
                  {row.cells.map((cell, cIdx) => {
                    const t = tierStyles[cell.tier];
                    return (
                      <td key={cIdx} className={`border-l border-[#0A3D6B]/20 px-2 py-3 sm:px-4 sm:py-4 align-middle ${cIdx === 0 ? "bg-[#28B5E1]/[0.04]" : ""}`}>
                        <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${t.bg} ${t.text}`}>
                          {cell.tier === "best" && <span aria-hidden="true">★</span>}
                          {t.label}
                        </span>
                        <p className="mt-1.5 text-xs leading-snug text-slate-600">{cell.note}</p>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function DetailedCardGrid({ vendors }: { vendors: VendorCard[] }) {
  return (
    <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:mt-16 lg:grid-cols-2 lg:items-stretch">
      {vendors.map((v, idx) => {
        const recommended = v.best.includes("Recommended");
        const top = v.best.includes("#1");
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
                top
                  ? "border-[#28B5E1]/50 shadow-[0_4px_24px_rgba(40,181,225,0.16)]"
                  : recommended
                  ? "border-brand-blue/30 shadow-[0_4px_20px_rgba(27,138,199,0.10)]"
                  : "border-border-light shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-brand-blue/25"
              }`}
            >
              {(recommended || top) && (
                <span
                  className={`absolute -top-px left-6 inline-flex rounded-b-md px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white ${
                    top ? "bg-gradient-to-r from-[#045891] to-[#28B5E1]" : "bg-brand-blue"
                  }`}
                  aria-label="Recommended vendor"
                >
                  {top ? "Recommended" : "Recommended"}
                </span>
              )}
              <div className="flex items-start justify-between gap-4 pt-3">
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-bold text-heading transition-colors group-hover:text-brand-blue sm:text-2xl">{v.name}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-brand-blue">{v.best.replace(/\s*#\d+/, "")}</p>
                </div>
                {v.logo && (
                  <img
                    src={v.logo}
                    alt={`${v.name} logo`}
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                    className="h-10 w-24 shrink-0 object-contain object-right sm:h-12 sm:w-32"
                  />
                )}
              </div>
              <div className="mt-5 space-y-3">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Why it wins</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-body">{v.strength}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Consider</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-body/80">{v.watch}</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ════════════════ HERO ════════════════ */

function UnifiedCommunicationHero() {
  const { open: openContact } = useContactModal();
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-navy-deep">
      <div aria-hidden="true" className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/infra.png')" }} />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/70 to-navy-deep/90" />

      <div className="relative z-10 border-b border-white/5">
        <div className="shell flex w-full items-center justify-end gap-4 pt-24 pb-3 sm:pt-28">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center justify-end gap-2 text-[10px] text-slate-400 sm:text-[11px]">
              <li><Link to="/" className="transition-colors hover:text-white">Home</Link></li>
              <li className="text-slate-600">/</li>
              <li><Link to="/infrastructure" className="transition-colors hover:text-white">Infrastructure</Link></li>
              <li className="text-slate-600">/</li>
              <li><span className="font-medium text-[#28B5E1]">Unified Communication & Telephony</span></li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="shell relative z-10 flex w-full flex-1 items-center py-10 sm:py-12 lg:py-14">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="w-full">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#28B5E1] sm:text-xs">
            UC & Telephony · Cloud Calling · IP PBX · Devices
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1] tracking-tight text-white sm:text-5xl md:text-5xl lg:text-[3.75rem]">
            Unified Communication &{" "}
            <span className="gradient-text">Telephony</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Cloud UC, IP PBX, Desk Phones & Video Rooms for UAE
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            A UAE buyer's guide for two journeys: cloud calling and collaboration (Teams Phone, Webex, Avaya, Mitel, 3CX, Zoom) and IP telephony hardware (Grandstream UCM, 3CX, Cisco CUCM, Avaya Aura, plus Yealink, Grandstream, Fanvil, Poly and Snom phones). Honestly compared, with Gartner-style scorecards and Artiflex recommendations.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
            <a href="#cloud-uc" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base">
              Cloud UC Platforms
            </a>
            <a href="#ip-telephony" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base">
              IP Telephony & Hardware
            </a>
            <Link to="/blog/origin-unified-communication-telephony" className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-[#28B5E1]/40 bg-[#28B5E1]/10 px-6 py-3 text-sm font-semibold text-[#28B5E1] backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1] hover:bg-[#28B5E1]/20 hover:text-white sm:px-7 sm:py-3.5 sm:text-base">
              Read Origin Story
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </Link>
            <button onClick={openContact} className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base">
              Free UC & Telephony Assessment
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </button>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 flex justify-center pb-8">
        <div aria-hidden="true" className="flex flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-[0.32em] text-slate-500">
          <span>Continue</span>
          <span className="h-8 w-px bg-gradient-to-b from-[#28B5E1]/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* ════════════════ PAGE ════════════════ */

export default function UnifiedCommunicationTelephony() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  const ConsultantButton = (
    <div className="mt-8 flex justify-center sm:mt-10">
      <button onClick={openContact} className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base">
        Talk to our Consultant
        <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
      </button>
    </div>
  );

  return (
    <>
      <>
        <title>Unified Communication & Telephony UAE | Cloud UC, IP PBX & Phones Buyer's Guide | Artiflex IT</title>
        <meta
          name="description"
          content="UAE buyer's guide for cloud UC and IP telephony. Vendor comparison and Gartner-style scorecards across Microsoft Teams Phone, Cisco Webex, Avaya, Mitel, 3CX, Zoom Phone, Grandstream UCM, Cisco CUCM and the Yealink, Grandstream, Fanvil, Poly and Snom phone ecosystem."
        />
        <link rel="canonical" href="https://artiflexit.com/infrastructure/unified-communication-telephony" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Unified Communication & Telephony Services",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description": "UAE unified communication and telephony: cloud UC platforms, IP PBX, desk phones, DECT, video rooms, PSTN integration, contact centre, recording and migration. Vendor recommendation follows the assessment.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((f) => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer } })),
          })}
        </script>
      </>

      <UnifiedCommunicationHero />

      {/* ───────── PLATFORM LINEUP (HONEYCOMB) ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(to right, #1B8AC7 1px, transparent 1px), linear-gradient(to bottom, #1B8AC7 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#1B8AC7]/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-[#28B5E1]/10 blur-3xl" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">The Vendor Lineup</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
              Cloud UC{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">Platforms</span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Six cloud UC platforms cover roughly 95 percent of UAE deployment requirements. The IP PBX and desk-phone hardware lineup follows in the IP Telephony section below.
            </p>
          </div>

          {/* Honeycomb (large screens) */}
          <div className="mt-14 hidden flex-col items-center lg:flex">
            {(() => {
              const layouts: Record<number, number[]> = { 1: [1], 2: [2], 3: [3], 4: [3, 1], 5: [3, 2], 6: [3, 3], 7: [4, 3] };
              const sizes = layouts[cloudLineup.length] ?? [Math.ceil(cloudLineup.length / 2), Math.floor(cloudLineup.length / 2)];
              const rows: LineupItem[][] = [];
              let i = 0;
              sizes.forEach((s) => { rows.push(cloudLineup.slice(i, i + s)); i += s; });
              const HEX_PATH = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
              return rows.map((row, rowIdx) => (
                <div key={rowIdx} className="flex" style={{ marginTop: rowIdx === 0 ? 0 : -52, transform: rowIdx > 0 && rows[rowIdx - 1].length === row.length ? "translateX(90px)" : undefined }}>
                  {row.map((v) => (
                    <div key={v.slug} aria-label={v.name} className="group relative block h-[208px] w-[180px] transition-all duration-300 hover:z-10 hover:scale-[1.06] [filter:drop-shadow(0_4px_12px_rgba(15,23,42,0.10))] hover:[filter:drop-shadow(0_10px_30px_rgba(40,181,225,0.45))]">
                      <div className="absolute inset-0 bg-slate-200/80 transition-colors duration-300 group-hover:bg-[#28B5E1]" style={{ clipPath: HEX_PATH }} />
                      <div className="absolute inset-[2px] bg-white transition-all duration-300 group-hover:bg-gradient-to-b group-hover:from-[#28B5E1]/[0.08] group-hover:to-white" style={{ clipPath: HEX_PATH }} />
                      <div className="relative flex h-full flex-col items-center justify-center px-5 text-center">
                        {v.logo ? (<img src={v.logo} alt={v.name} loading="lazy" onError={(e) => { const img = e.currentTarget as HTMLImageElement; img.style.display = "none"; const fb = img.nextElementSibling as HTMLElement | null; if (fb) fb.style.removeProperty("display"); }} className="h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-110" />) : null}
                        <p className="font-display text-[13px] font-semibold leading-tight text-slate-900" style={{ display: v.logo ? "none" : "block" }}>{v.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ));
            })()}
          </div>

          {/* Card grid (mobile / tablet) */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:hidden">
            {cloudLineup.map((v) => (
              <div key={v.slug} className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/50 hover:shadow-md">
                {v.logo ? (<img src={v.logo} alt={v.name} loading="lazy" onError={(e) => { const img = e.currentTarget as HTMLImageElement; img.style.display = "none"; const fb = img.nextElementSibling as HTMLElement | null; if (fb) fb.style.removeProperty("display"); }} className="h-12 w-12 object-contain" />) : null}
                <p className="font-display text-[11px] font-semibold leading-tight text-slate-900" style={{ display: v.logo ? "none" : "block" }}>{v.name}</p>
              </div>
            ))}
          </div>

          {/* Two journeys callout */}
          <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-[#1B8AC7]/20 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
              <span className="font-semibold text-[#045891]">Two buyer journeys, one guide.</span> This page covers software-first cloud UC (calling, collaboration, meetings, AI assist) and IP telephony hardware (IP PBX appliances, desk phones, DECT handsets, SIP gateways and video endpoints). Use the section that matches what you are buying.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════ CLOUD UC JOURNEY ════════════════ */}
      <section id="cloud-uc" className="relative scroll-mt-20 bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Journey 1 · Cloud UC Platforms</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Questions that narrow the shortlist</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Answer these before any vendor conversation. The right platform follows from your environment, not the vendor's preferred pitch.
            </p>
          </div>
          <BranchQuestions items={cloudQuestions} />
        </div>
      </section>

      {/* Cloud comparison */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Vendor Comparison</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Vendor comparison for <span className="gradient-text">Cloud UC buyers</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              We do not believe one UC platform wins everything. Artiflex suggests the platform that best fits your environment, not our preferred SKU.
            </p>
          </div>
          {ConsultantButton}
          <ComparisonTable vendors={cloudMatrixVendors} rows={cloudMatrixRows} />
        </div>
      </section>

      {/* Cloud detailed + Gartner */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Detailed Comparison</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Detailed comparison on Cloud UC platforms</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Strengths, blind spots and the buyer profile each platform was built for.
            </p>
          </div>
          <DetailedCardGrid vendors={cloudVendors} />

          <div className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Gartner-style Review</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Gartner-style Cloud UC capability scorecard</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Capability ratings across nine dimensions on a standardised tier scale. A gold ★ marker denotes best-in-class performance for that capability.
            </p>
          </div>
          <GartnerTable vendors={cloudFeatureVendors} rows={cloudFeatureRows} />
        </div>
      </section>

      {/* ════════════════ IP TELEPHONY & HARDWARE JOURNEY ════════════════ */}
      <section id="ip-telephony" className="relative scroll-mt-20 bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Journey 2 · IP Telephony & Hardware</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">IP PBX appliances, desk phones & video rooms</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The IP PBX platforms and phone endpoints we deploy across UAE. Pick the platform first, then pick the phone, certification against your PBX matters more than brand preference.
            </p>
          </div>

          <div className="mt-12 space-y-10">
            <MiniLineup title="IP PBX Platforms" items={pbxLineup} />
            <MiniLineup title="IP Phone Endpoints" items={endpointLineup} />
          </div>
        </div>
      </section>

      {/* Hardware questions */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">The Shortlist</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Questions that narrow the IP telephony shortlist</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Answer these before any vendor conversation. The right PBX and phone combination follows from your environment, site topology and budget, not the vendor's margin.
            </p>
          </div>
          <BranchQuestions items={hardwareQuestions} />
        </div>
      </section>

      {/* IP PBX comparison + detailed */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">IP PBX Comparison</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Vendor comparison for <span className="gradient-text">IP PBX buyers</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Feature-by-feature comparison across five IP PBX platforms. The right fit depends on your site topology, user count and legacy estate.
            </p>
          </div>
          {ConsultantButton}
          <ComparisonTable vendors={pbxMatrixVendors} rows={pbxMatrixRows} />

          <div className="mx-auto mt-20 max-w-4xl text-center sm:mt-24">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">IP PBX, Detailed</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Strengths, blind spots and the scenario each PBX was built for</h2>
          </div>
          <DetailedCardGrid vendors={pbxVendors} />
        </div>
      </section>

      {/* Endpoint comparison + Gartner */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Endpoint Comparison</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Vendor comparison for <span className="gradient-text">IP Phone & Endpoint buyers</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              UAE price guide and certification matrix across the major IP phone brands. Certification against your chosen PBX or UC platform matters more than brand preference.
            </p>
          </div>
          {ConsultantButton}
          <ComparisonTable vendors={endpointMatrixVendors} rows={endpointMatrixRows} />

          <div className="mx-auto mt-20 max-w-4xl text-center sm:mt-28">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Gartner-style Review · Endpoints</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Gartner-style Endpoint capability scorecard</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Eight capability dimensions on a standardised tier scale. A gold ★ marker denotes best-in-class. Ratings based on UAE deployment feedback across 500+ GCC projects.
            </p>
          </div>
          <GartnerTable vendors={endpointFeatureVendors} rows={endpointFeatureRows} />
        </div>
      </section>

      {/* ───────── OUR DELIVERY MODEL ───────── */}
      <DeliveryModel />

      {/* ───────── WHY ARTIFLEX IT ───────── */}
      <section className="relative overflow-hidden bg-navy-deep py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(27,138,199,0.18),transparent_60%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#28B5E1]">Why Artiflex IT</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">14+ years of UAE UC and telephony delivery</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We deliver cloud UC and IP telephony across UAE projects, and the recommendation follows the assessment, not the margin.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years UAE telephony" },
              { value: "500+", label: "Projects GCC-wide" },
              { value: "6", label: "UC & PBX platforms delivered" },
              { value: "24/7", label: "Managed-service cover" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-sm transition-colors duration-300 hover:border-[#28B5E1]/30">
                <p className="font-display text-3xl font-bold leading-none text-white sm:text-4xl">{stat.value}</p>
                <p className="mt-3 text-xs leading-relaxed text-slate-400 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">Platform & device coverage</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Microsoft Teams Phone, Cisco Webex, Avaya, Mitel, 3CX and Zoom Phone for cloud UC; Grandstream UCM, 3CX, Cisco CUCM, Avaya Aura and FreePBX for IP PBX; plus Yealink, Grandstream, Fanvil, Poly, Snom and Cisco endpoints.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">UAE compliance and design</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  NESA, UAE PDPL, ISO 27001, ADHICS, DFSA and SAMA-aligned designs with audit-ready evidence packs. Call recording and retention scoping for regulated industries as part of the project.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">Coverage and delivery</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  On-site across Dubai, Abu Dhabi and Sharjah. Remote across UAE, Oman and Saudi Arabia. Fully managed, co-managed or assessment-only.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">Commercial model</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  CapEx, OpEx and consumption pricing supported. PSTN porting coordinated with Etisalat and du, with parallel running and a documented rollback per wave.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <button onClick={openContact} className="inline-flex items-center justify-center rounded-lg bg-[#28B5E1] px-6 py-3 font-display text-sm font-semibold text-navy-deep transition-colors hover:bg-white sm:text-base">
              Book Assessment
            </button>
            <Link to="/infrastructure" className="inline-flex items-center justify-center rounded-lg border border-white/15 px-6 py-3 font-display text-sm font-medium text-slate-300 transition-colors hover:border-[#28B5E1]/40 hover:text-white sm:text-base">
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
            title={<>Frequently <span className="gradient-text">asked</span> questions</>}
            description="What UAE buyers ask us most about cloud UC platforms, IP PBX appliances and phone endpoints."
            centered
          />
          <div className="mt-12 grid gap-6 sm:mt-14 lg:grid-cols-12 lg:gap-8">
            <ul className="flex flex-col gap-2 lg:col-span-6">
              {faqs.map((faq, idx) => {
                const isActive = activeFaq === idx;
                return (
                  <li key={faq.question}>
                    <button type="button" onClick={() => setActiveFaq(idx)} aria-pressed={isActive} aria-controls="faq-answer-panel" className={`group flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-semibold transition-all duration-200 sm:px-5 sm:text-[15px] ${isActive ? "border-transparent bg-gradient-to-r from-[#045891] to-[#1B8AC7] text-white shadow-[0_8px_24px_-8px_rgba(27,138,199,0.55)]" : "border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-[#28B5E1]/60 hover:bg-slate-50 hover:text-[#1B8AC7]"}`}>
                      <span className="leading-snug">{faq.question}</span>
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 shrink-0 transition-transform duration-300 ${isActive ? "translate-x-0.5" : "opacity-50 group-hover:translate-x-0.5 group-hover:opacity-100"}`}><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="lg:col-span-6">
              <div id="faq-answer-panel" role="region" aria-live="polite" className="lg:sticky lg:top-24">
                <div className="overflow-hidden rounded-2xl border border-transparent bg-gradient-to-r from-[#045891] to-[#054466] p-6 shadow-[0_18px_40px_-18px_rgba(27,138,199,0.55)] sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-white">Faq</span>
                    <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-white/40 to-transparent" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold leading-snug text-white sm:text-2xl">{faqs[activeFaq].question}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">{faqs[activeFaq].answer}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <CTASection
        title="Free UC & Telephony Assessment"
        description="A review of your communications estate: user count, site topology, PSTN strategy, contact centre depth, analog legacy and device budget. We identify the right cloud UC platform or IP PBX and build a device specification by user role and cost tier."
        primaryButton={{ text: "Book Free Assessment", action: "modal" }}
      />
    </>
  );
}
