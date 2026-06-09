// import { lazy, Suspense, useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import { AnimatePresence, motion, useInView } from "framer-motion";

// import SectionHeader from "@/components/ui/SectionHeader";
// import FAQAccordion from "@/components/ui/FAQAccordion";
// import ProcessFlow from "@/components/ui/ProcessFlow";
// import { CTASection } from "@/pages/Home/sections/CTASection";
// import { useContactModal } from "@/components/layout/ContactModal";
// import {
//   ShieldIcon,
//   MonitorIcon,
//   CloudIcon,
//   MailIcon,
//   ClockIcon,
//   BarChartIcon,
//   UsersIcon,
//   FileTextIcon,
//   CheckIcon,
//   ArrowRightIcon,
// } from "@/components/icons";

// const LightRays = lazy(() => import("@/components/ui/LightRays"));

// /* ───────── DATA ───────── */

// const heroStats = [
//   { value: "$4.88M", label: "AVG. GLOBAL BREACH COST", source: "IBM 2024" },
//   { value: "Every 2s", label: "RANSOMWARE ATTEMPT", source: "Global telemetry" },
//   { value: "4%", label: "GDPR FINE OF GLOBAL TURNOVER", source: "Max exposure" },
//   { value: "21 Days", label: "AVG. RANSOMWARE DOWNTIME", source: "Post-incident" },
// ];

// const threatTypes = [
//   "Ransomware",
//   "Phishing",
//   "BEC fraud",
//   "Credential stuffing",
//   "Zero-day exploit",
//   "Supply-chain",
//   "Data exfil",
//   "DDoS wave",
// ];

// const threatSectors = [
//   "Healthcare",
//   "Finance",
//   "Logistics",
//   "Manufacturing",
//   "Retail",
//   "Energy",
//   "SaaS",
//   "Government",
// ];

// const threatRegions = ["UAE", "KSA", "EU", "UK", "SGP", "APAC", "NA"];

// const businessCost = {
//   Financial: {
//     hero: "$4.88M",
//     heroLabel: "average breach cost",
//     note:
//       "Ransomware demands alone now average USD 1.5M+, and that's before recovery, legal fees, and regulatory penalties stack on top.",
//     side: [
//       { k: "$1.5M+", v: "avg. ransom demand" },
//       { k: "4%", v: "GDPR turnover fine" },
//       { k: "72h", v: "UAE PDPL breach window" },
//     ],
//   },
//   Operational: {
//     hero: "21 Days",
//     heroLabel: "avg. downtime post-ransomware",
//     note:
//       "Three weeks of halted or degraded operations. Customers don't wait. Orders don't pause. Recovery isn't a weekend project - it's a quarter-long dent in momentum.",
//     side: [
//       { k: "62%", v: "SMBs close within 6 months" },
//       { k: "287d", v: "avg. breach dwell time" },
//       { k: "3–4", v: "analysts needed 24/7" },
//     ],
//   },
//   Reputational: {
//     hero: "7.5%",
//     heroLabel: "avg. stock-price drop post-breach",
//     note:
//       "Trust is a slow earn and a fast burn. M&A deals collapse in due diligence, partners quietly reroute contracts, and the news lingers in search results for years.",
//     side: [
//       { k: "−38%", v: "customer retention drop" },
//       { k: "2.9×", v: "higher insurance premiums" },
//       { k: "5+ yrs", v: "reputation recovery" },
//     ],
//   },
// } as const;

// type CostTab = keyof typeof businessCost;

// const pillars = [
//   {
//     number: "01",
//     title: "Next-Generation Firewall",
//     category: "NETWORK",
//     icon: ShieldIcon,
//     desc: "Controls traffic at the perimeter and between internal segments. Blocks known threats and inspects encrypted traffic at line rate.",
//     href: "/cybersecurity/firewalls-network-security",
//   },
//   {
//     number: "02",
//     title: "Endpoint Detection & Response",
//     category: "ENDPOINT",
//     icon: MonitorIcon,
//     desc: "Protects every device - laptops, servers, mobiles - with AI-driven detection and automated rollback against ransomware.",
//     href: "/cybersecurity/endpoint-security-edr-xdr",
//   },
//   {
//     number: "03",
//     title: "Email Security & Anti-Phishing",
//     category: "COMMUNICATION",
//     icon: MailIcon,
//     desc: "Stops phishing, BEC, and ransomware delivery before messages reach inboxes. 93% of breaches start here.",
//     href: "/cybersecurity/email-security-vendors",
//   },
//   {
//     number: "05",
//     title: "Workspace Protection (ZTNA)",
//     category: "CLOUD / REMOTE",
//     icon: CloudIcon,
//     desc: "Replaces legacy VPN with Zero Trust Network Access, CASB, and secure web gateway - cloud-delivered.",
//     href: "/cybersecurity/workspace-protection-sse-sase",
//   },
// ];

// const roadmap = [
//   {
//     number: 1,
//     title: "Month 1–2 · Foundations",
//     description: "Deploy NGFW and endpoint protection. Without these two layers in place, nothing else meaningfully matters.",
//   },
//   {
//     number: 2,
//     title: "Month 3–4 · Data & Identity",
//     description: "Layer email security and DLP. Shut the two doors most breaches actually walk through.",
//   },
//   {
//     number: 3,
//     title: "Month 5–6 · Visibility",
//     description: "Add SIEM/MDR and workspace protection. Now you can see what's happening across the whole environment.",
//   },
//   {
//     number: 4,
//     title: "Ongoing · Programme",
//     description: "Vulnerability management, tabletop exercises, continuous tuning. Security is a programme, not a project.",
//   },
// ];

// const inHouseReality = [
//   { value: "3.5M", label: "Unfilled cyber roles globally" },
//   { value: "$120–180K", label: "Per senior analyst, per year" },
//   { value: "3–4", label: "People needed to cover 24/7" },
//   { value: "12–18mo", label: "To reach operational maturity" },
// ];

// const managedBenefits = [
//   "24/7 monitoring from a staffed SOC",
//   "Senior analysts on call, day one",
//   "Enterprise-grade tooling included",
//   "Predictable monthly cost, no hiring risk",
//   "Compliance artefacts handled for audits",
//   "Scales up or down with your business",
// ];

// const faqs = [
//   {
//     question: "What is cybersecurity and why is it important for UAE businesses?",
//     answer:
//       "Cybersecurity is the combination of technology, process, and people that keeps your systems, data, and customers safe from digital attack. For UAE organisations it also means meeting regulatory expectations - NESA's IAS controls, the UAE PDPL's 72-hour breach notification window, and sector frameworks like SAMA's CSF for financial entities. In practice it's a layered stack - firewall, endpoint, email, data, cloud, monitoring, and vulnerability management - tuned to your actual risk profile and compliance obligations, not a vendor's datasheet.",
//   },
//   {
//     question: "What is cyber security for business, really?",
//     answer:
//       "At its simplest, cyber security for business is the combination of technology, process, and people that keeps your systems, data, and customers safe from digital attack. In practice it means a layered stack - firewall, endpoint, email, data, cloud, monitoring, and vulnerability management - operating together and tuned to your actual risk profile, not a vendor's datasheet.",
//   },
//   {
//     question: "How much do cybersecurity services cost in the UAE?",
//     answer:
//       "For mid-market UAE businesses, a properly scoped cybersecurity programme typically lands between AED 90,000 and AED 450,000 per year, depending on headcount, regulated workloads, and whether you're using managed detection (MDR) or running tooling in-house. Regulated sectors - finance under SAMA, healthcare under DoH/DHA, government suppliers under NESA - sit at the higher end. The honest answer: it costs less than a breach. We start every engagement with a free 30-minute assessment so the number is anchored to your actual exposure, not a generic price list.",
//   },
//   {
//     question: "How do I choose a cybersecurity provider in the UAE?",
//     answer:
//       "Pick a provider on five criteria: (1) UAE presence and familiarity with NESA, PDPL, and SAMA expectations; (2) named senior analysts on your account, not a generic ticket queue; (3) tooling you can audit - SIEM, EDR, email gateway - not a black box; (4) clear SLAs on detection and response time; and (5) references from organisations of your size and sector. We've published the full evaluation framework as a vendor scorecard you can use to score any shortlist - including us.",
//   },
//   {
//     question: "Why is cybersecurity so important right now?",
//     answer:
//       "Because the economics have flipped. The global average breach now costs USD 4.88M, ransomware attempts happen every two seconds, and regulators - GDPR, UAE PDPL, HIPAA, PCI-DSS - will fine you independently of what attackers take. For most mid-sized organisations, a single serious incident is an existential event, not a line item.",
//   },
//   {
//     question: "What are the core types of cybersecurity we need?",
//     answer:
//       "Seven layers cover the vast majority of real-world threats: network (NGFW), endpoint (EDR/XDR), email, data loss prevention, cloud/ZTNA, SIEM/MDR for detection, and vulnerability management. Each closes gaps the others can't. Skipping one creates the exact blind spot attackers look for.",
//   },
//   {
//     question: "What does a good cybersecurity framework look like?",
//     answer:
//       "A practical framework is phased, not panicked. Start with NGFW and endpoint in the first two months, layer email and DLP next, add visibility (SIEM/MDR) and cloud access controls by month six, then treat vulnerability management and user awareness as ongoing programmes. NIST CSF is a good spine - Identify, Protect, Detect, Respond, Recover - and maps cleanly to UAE regulatory expectations.",
//   },
//   {
//     question: "How much does enterprise cybersecurity cost?",
//     answer:
//       "Budget usually falls between 7–12% of total IT spend for mid-market, higher for regulated industries. The honest answer, though: it costs less than a breach. The same organisations that balk at a six-figure annual programme end up spending that in a week of incident response after they skip it.",
//   },
//   {
//     question: "Should we build a SOC internally or use managed services?",
//     answer:
//       "For most organisations under ~500 employees, managed detection & response wins on every axis - cost, coverage, speed to value, and hiring risk. An internal SOC needs 8–12 analysts at USD 120–180K each, a SIEM licence, and 12–18 months to mature. MDR delivers comparable coverage from week one at a fraction of the operational load.",
//   },
//   {
//     question: "How does a cybersecurity assessment actually work?",
//     answer:
//       "A proper assessment takes 30–45 minutes end-to-end. We review your current stack, map it against threat vectors and compliance requirements, identify gaps by severity, and hand back a prioritised remediation roadmap. No pitch attached - you walk away with the document whether or not we ever work together.",
//   },
// ];

// const faqSchema = {
//   "@context": "https://schema.org",
//   "@type": "FAQPage",
//   mainEntity: faqs.map((faq) => ({
//     "@type": "Question",
//     name: faq.question,
//     acceptedAnswer: { "@type": "Answer", text: faq.answer },
//   })),
// };

// const articleSchema = {
//   "@context": "https://schema.org",
//   "@type": "Article",
//   headline: "Cyber Security for Business 2026 | Artiflex IT UAE",
//   description:
//     "Protect your business with proven cybersecurity best practices. Firewalls, EDR, email security, DLP, SIEM, and more - plus a phased framework and free UAE assessment.",
//   datePublished: "2026-01-15",
//   dateModified: "2026-04-17",
//   keywords: [
//     "cybersecurity services UAE",
//     "cybersecurity company Dubai",
//     "cyber security company Abu Dhabi",
//     "cybersecurity services GCC",
//     "NESA compliance services",
//     "SAMA cybersecurity framework",
//     "UAE PDPL compliance",
//     "ISO 27001",
//     "managed cybersecurity services",
//   ],
// };

// const localBusinessSchema = {
//   "@context": "https://schema.org",
//   "@type": "LocalBusiness",
//   name: "Artiflex IT - Cybersecurity Services UAE",
//   url: "https://artiflexit.com/cybersecurity/cybersecurity-solutions",
//   telephone: "+971-4-000-0000",
//   address: {
//     "@type": "PostalAddress",
//     streetAddress: "Business Bay",
//     addressLocality: "Dubai",
//     addressRegion: "Dubai",
//     addressCountry: "AE",
//   },
//   areaServed: [
//     { "@type": "Country", name: "United Arab Emirates" },
//     { "@type": "City", name: "Dubai" },
//     { "@type": "City", name: "Abu Dhabi" },
//     { "@type": "Place", name: "GCC" },
//   ],
//   keywords:
//     "cybersecurity services UAE, cybersecurity company Dubai, cyber security company Abu Dhabi, cybersecurity services GCC, NESA compliance services, SAMA cybersecurity framework, UAE PDPL compliance, ISO 27001, managed cybersecurity services",
// };

// /* ───────── SMALL PIECES ───────── */

// type ThreatEvent = {
//   id: number;
//   time: Date;
//   type: string;
//   sector: string;
//   region: string;
// };

// let threatEventSeq = 0;
// const pickRandom = <T,>(arr: readonly T[]): T =>
//   arr[Math.floor(Math.random() * arr.length)]!;

// function makeThreatEvent(secondsAgo = 0): ThreatEvent {
//   return {
//     id: ++threatEventSeq,
//     time: new Date(Date.now() - secondsAgo * 1000),
//     type: pickRandom(threatTypes),
//     sector: pickRandom(threatSectors),
//     region: pickRandom(threatRegions),
//   };
// }

// const pad2 = (n: number) => n.toString().padStart(2, "0");
// const fmtClock = (d: Date) =>
//   `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;

// function LiveThreatFeed() {
//   const [events, setEvents] = useState<ThreatEvent[]>(() =>
//     Array.from({ length: 6 }, (_, i) => makeThreatEvent(i * 3))
//   );
//   const [clock, setClock] = useState<Date>(() => new Date());

//   useEffect(() => {
//     const feedId = setInterval(() => {
//       setEvents((prev) => [makeThreatEvent(), ...prev.slice(0, 5)]);
//     }, 2200);
//     const clockId = setInterval(() => setClock(new Date()), 1000);
//     return () => {
//       clearInterval(feedId);
//       clearInterval(clockId);
//     };
//   }, []);

//   return (
//     <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.01] backdrop-blur-md">
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/70 to-transparent"
//       />
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[#28B5E1]/10 blur-[90px]"
//       />

//       <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-3">
//         <div className="flex items-center gap-2">
//           <span className="relative flex h-2 w-2">
//             <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#28B5E1] opacity-75" />
//             <span className="relative inline-flex h-2 w-2 rounded-full bg-[#28B5E1]" />
//           </span>
//           <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white">
//             Live Threat Feed
//           </span>
//         </div>
//         <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 tabular-nums">
//           UAE · {fmtClock(clock)}
//         </span>
//       </div>

//       <ol className="relative h-[288px] divide-y divide-white/5 overflow-hidden px-5">
//         <AnimatePresence initial={false}>
//           {events.map((e, i) => (
//             <motion.li
//               key={e.id}
//               layout
//               initial={{ opacity: 0, y: -12 }}
//               animate={{
//                 opacity: Math.max(0.25, 1 - i * 0.14),
//                 y: 0,
//               }}
//               exit={{ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }}
//               transition={{ duration: 0.35, ease: "easeOut" }}
//               className="flex items-center gap-3 overflow-hidden py-2.5"
//             >
//               <span className="font-mono text-[10px] text-[#28B5E1] tabular-nums">
//                 {fmtClock(e.time)}
//               </span>
//               <span className="text-slate-600">·</span>
//               <span
//                 className={`font-display text-xs font-semibold sm:text-sm ${i === 0 ? "text-white" : "text-slate-200"
//                   }`}
//               >
//                 {e.type}
//               </span>
//               <span className="hidden text-slate-600 sm:inline">·</span>
//               <span className="hidden text-[11px] text-slate-400 sm:inline">
//                 {e.sector}
//               </span>
//               <span className="ml-auto rounded-sm bg-white/[0.05] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-slate-300">
//                 {e.region}
//               </span>
//             </motion.li>
//           ))}
//         </AnimatePresence>
//       </ol>

//       <div className="relative flex items-center justify-between gap-3 border-t border-white/10 bg-white/[0.02] px-5 py-3">
//         <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-slate-400">
//           Cadence
//         </span>
//         <span className="text-right font-display text-[11px] font-semibold leading-tight text-white sm:text-xs">
//           Every 2s · new ransomware attempt somewhere on Earth
//         </span>
//       </div>
//     </div>
//   );
// }

// function Counter({ value, delay = 0 }: { value: string; delay?: number }) {
//   const ref = useRef<HTMLSpanElement>(null);
//   const inView = useInView(ref, { once: true, margin: "-20% 0px" });
//   return (
//     <motion.span
//       ref={ref}
//       initial={{ opacity: 0, y: 14 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.6, delay }}
//       className="font-display text-2xl font-bold text-[#045891] sm:text-3xl md:text-[2.5rem]"
//     >
//       {value}
//     </motion.span>
//   );
// }

// /* ───────── PAGE ───────── */

// export default function CybersecuritySolutionsPage() {
//   const { open: openContact } = useContactModal();
//   const [costTab, setCostTab] = useState<CostTab>("Financial");
//   const [activePillar, setActivePillar] = useState(0);

//   const active = businessCost[costTab];

//   return (
//     <>
//       <>
//         <title>Cyber Security for Business 2026 | Artiflex IT UAE</title>
//         <meta
//           name="description"
//           content="Protect your business with proven cybersecurity best practices - firewalls, EDR, email, DLP, SIEM. Free UAE assessment."
//         />
//         <link
//           rel="canonical"
//           href="https://artiflexit.com/cybersecurity/cybersecurity-solutions"
//         />
//         <meta
//           property="og:title"
//           content="Cyber Security for Business 2026 | Artiflex IT UAE"
//         />
//         <meta
//           property="og:description"
//           content="Cybersecurity services UAE - NESA, PDPL & SAMA-aligned. Seven pillars, a phased framework, and a free posture assessment."
//         />
//         <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
//         <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
//         <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
//       </>

//       {/* ═══════════════════════════════════════ HERO ═══════════════════════════════════════ */}
//       <section className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-navy-deep via-navy to-navy-light">
//         <Suspense fallback={null}>
//           <LightRays
//             raysOrigin="top-center"
//             raysColor="#1B8AC7"
//             raysSpeed={0.8}
//             lightSpread={1.2}
//             rayLength={2}
//             fadeDistance={1}
//             saturation={1}
//             followMouse={true}
//             mouseInfluence={0.15}
//             distortion={0.3}
//           />
//         </Suspense>

//         <div
//           className="absolute inset-0 z-[3] bg-gradient-to-b from-navy-deep/30 via-navy-deep/15 to-navy-deep/50 pointer-events-none"
//           aria-hidden="true"
//         />

//         {/* Editorial masthead band */}
//         <div className="relative z-10 border-b border-white/5">
//           <div className="shell flex w-full items-center justify-end gap-4 pt-24 pb-3 sm:pt-28">
//             {/* <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-slate-400">
//               <span className="text-[#28B5E1]">§</span>
//               Dispatch
//               <span className="hidden text-slate-600 sm:inline">·</span>
//               <span className="hidden text-slate-500 sm:inline">Vol 07 · 2026</span>
//             </div> */}
//             <nav aria-label="Breadcrumb">
//               <ol className="flex flex-wrap items-center justify-end gap-2 text-[10px] text-slate-400 sm:text-[11px]">
//                 <li>
//                   <Link to="/" className="transition-colors hover:text-white">
//                     Home
//                   </Link>
//                 </li>
//                 <li className="text-slate-600">/</li>
//                 <li>
//                   <Link to="/cybersecurity" className="transition-colors hover:text-white">
//                     Cybersecurity
//                   </Link>
//                 </li>
//                 <li className="text-slate-600">/</li>
//                 <li>
//                   <span className="font-medium text-[#28B5E1]">Solutions</span>
//                 </li>
//               </ol>
//             </nav>
//           </div>
//         </div>

//         {/* Hero masthead - title + live feed, given a full breathing viewport */}
//         <div className="shell relative z-10 flex w-full flex-1 items-center py-16 sm:py-20 lg:py-24">
//           <div className="grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-16">
//             <motion.div
//               initial={{ opacity: 0, y: 24 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, ease: "easeOut" }}
//               className="lg:col-span-7"
//             >
//               <div className="flex items-center gap-3">
//                 <span aria-hidden="true" className="h-px w-10 bg-[#28B5E1]" />
//                 <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#28B5E1]">
//                   Field Guide · Issue 01
//                 </span>
//               </div>

//               <h1 className="mt-6 font-display text-4xl font-bold leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.5rem]">
//                 Why Cyber Security for Business Is{" "}
//                 <span className="gradient-text">No Longer Optional</span>
//               </h1>

//               <p className="mt-8 max-w-xl font-display text-base italic leading-relaxed text-slate-300 sm:text-lg">
//                 Artiflex IT is a cybersecurity company in Dubai working with enterprise
//                 IT teams across the UAE for close to fifteen years. The conversation
//                 around cybersecurity has shifted dramatically - it used to be a
//                 once-a-year budget item, now it's on the board's agenda every quarter
//                 alongside NESA, PDPL, and SAMA obligations. And honestly, it should be.
//               </p>
//             </motion.div>

//             <motion.aside
//               initial={{ opacity: 0, x: 24 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
//               className="relative lg:col-span-5"
//             >
//               <LiveThreatFeed />

//               <figcaption className="mt-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.28em] text-slate-500">
//                 <span>Fig. 01 · Live Telemetry</span>
//                 <span>Refreshes every 2.2s</span>
//               </figcaption>
//             </motion.aside>
//           </div>
//         </div>

//         {/* Scroll affordance pinned to the bottom of the hero */}
//         <div className="relative z-10 flex justify-center pb-8">
//           <div
//             aria-hidden="true"
//             className="flex flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-[0.32em] text-slate-500"
//           >
//             <span>Continue</span>
//             <span className="h-8 w-px bg-gradient-to-b from-[#28B5E1]/60 to-transparent" />
//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════ PROLOGUE - THE STAKES ═══════════════════════════════════════ */}
//       <section className="relative overflow-hidden bg-gradient-to-b from-navy-light via-navy to-navy-deep">
//         {/* decorative accents for breathing room */}
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-[#1B8AC7]/08 blur-[140px]"
//         />
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute -right-24 bottom-24 h-72 w-72 rounded-full bg-[#28B5E1]/06 blur-[120px]"
//         />
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
//         />

//         <div className="shell relative w-full py-20 sm:py-28 lg:py-32">
//           <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-20">
//             {/* LEFT: Editorial body */}
//             <motion.article
//               initial={{ opacity: 0, y: 18 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-15%" }}
//               transition={{ duration: 0.7, ease: "easeOut" }}
//               className="lg:col-span-7"
//             >
//               <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.32em] text-slate-500">
//                 <span className="text-[#28B5E1]">§ 02</span>
//                 <span className="text-slate-400">The Stakes</span>
//                 <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
//               </div>

//               {/* <h2 className="mt-6 font-display text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
//                 When security fails, it fails{" "}
//                 <span className="gradient-text">expensively</span>.
//               </h2> */}

//               <div className="mt-10 space-y-7 text-base leading-[1.75] text-slate-300 sm:text-lg">
//                 <p className="relative border-l-2 border-[#28B5E1]/50 pl-6">
//                   <span className="font-display text-2xl font-bold text-white sm:text-3xl">
//                     USD 4.88 million.
//                   </span>{" "}
//                   That's the global average cost of a single data breach in 2024,
//                   according to IBM's annual report. Not a theoretical figure - an
//                   average pulled from real incidents across real companies. Ransomware
//                   attacks are hitting every 2 seconds. And the attackers aren't lone
//                   hackers in basements anymore. They're organised criminal syndicates,
//                   nation-state actors, and opportunistic groups using AI to generate
//                   phishing emails that even experienced professionals fall for.
//                 </p>
//                 <p className="pl-6">
//                   So if you're reading this and wondering whether your organisation's
//                   cyber security for business strategy is up to scratch - it probably
//                   isn't. Not because your team is bad, but because the goalposts keep
//                   moving. The cybersecurity solutions landscape changes quarterly, and
//                   what worked two years ago might leave you exposed today.
//                 </p>
//               </div>
//             </motion.article>

//             {/* RIGHT: Assessment CTA */}
//             <motion.aside
//               initial={{ opacity: 0, x: 24 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, margin: "-15%" }}
//               transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
//               className="relative lg:col-span-5 lg:sticky lg:top-24"
//             >
//               <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 backdrop-blur-md sm:p-10">
//                 <div
//                   aria-hidden="true"
//                   className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/70 to-transparent"
//                 />
//                 <div
//                   aria-hidden="true"
//                   className="pointer-events-none absolute -right-20 -top-24 h-60 w-60 rounded-full bg-[#28B5E1]/20 blur-[110px]"
//                 />
//                 <div
//                   aria-hidden="true"
//                   className="pointer-events-none absolute -left-16 -bottom-20 h-52 w-52 rounded-full bg-[#045891]/25 blur-[100px]"
//                 />

//                 <div className="relative">
//                   <div className="flex items-center gap-3">
//                     <span aria-hidden="true" className="h-px w-8 bg-[#28B5E1]" />
//                     <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#28B5E1]">
//                       Free · No Sales Pitch
//                     </span>
//                   </div>

//                   <h3 className="mt-5 font-display text-2xl font-bold leading-[1.1] tracking-tight text-white sm:text-[1.875rem]">
//                     Is Your Business{" "}
//                     <span className="gradient-text">Protected?</span>
//                   </h3>

//                   <p className="mt-5 text-sm leading-relaxed text-slate-300 sm:text-base">
//                     Most companies don't know their actual risk exposure until it's too
//                     late. Our team will evaluate your current security posture and
//                     identify critical gaps - completely free, no strings attached.
//                   </p>

//                   <button
//                     onClick={openContact}
//                     className="group mt-8 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-4 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_10px_30px_rgba(27,138,199,0.5)]"
//                   >
//                     Get a Free Cybersecurity Assessment
//                     <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
//                   </button>

//                   <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 font-mono text-[9px] uppercase tracking-[0.28em] text-slate-500">
//                     <span>30-min structured review</span>
//                     <span>Roadmap handed back</span>
//                   </div>
//                 </div>
//               </div>
//             </motion.aside>
//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════ STATS STRIP ═══════════════════════════════════════ */}
//       <section className="relative border-y border-border-light bg-white" aria-label="Key risk statistics">
//         <div className="shell">
//           <div className="grid grid-cols-2 divide-x divide-border-light lg:grid-cols-4">
//             {heroStats.map((stat, i) => (
//               <div key={stat.label} className="px-3 py-7 text-center sm:px-8 sm:py-10">
//                 <Counter value={stat.value} delay={i * 0.08} />
//                 <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">
//                   {stat.label}
//                 </p>
//                 <p className="mt-0.5 text-xs text-muted">{stat.source}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════ WHAT'S CHANGED ═══════════════════════════════════════ */}
//       <section className="relative py-16 bg-white sm:py-24">
//         <div className="shell">
//           <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
//             {/* Left sticky heading */}
//             <div className="lg:sticky lg:top-28 lg:self-start">
//               <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#045891]">
//                 § What's Actually Changed in the Threat Landscape
//               </span>
//               <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-heading sm:text-4xl lg:text-5xl">
//                 The perimeter is <span className="gradient-text">dead.</span>
//                 <br />
//                 The attack surface is everywhere.
//               </h2>
//               <p className="mt-5 max-w-md text-sm leading-relaxed text-body sm:text-base">
//                 Five years ago, the security conversation happened once a year at budget.
//                 Now it's on the board agenda every quarter - and it should be.
//               </p>
//             </div>

//             {/* Right editorial body */}
//             <div className="space-y-6">
//               {[
//                 {
//                   tag: "Threat volume",
//                   body: "Every cloud workload, every new SaaS tool, every employee on hotel Wi-Fi is an entry point. Attack surfaces have ballooned in ways nobody predicted five years back - and the attackers aren't lone hackers any more. They're organised criminal syndicates and nation-state actors with AI on their side.",
//                 },
//                 {
//                   tag: "Regulatory pressure",
//                   body: "GDPR fines reach 4% of global turnover. HIPAA violations carry multi-million-dollar penalties. UAE PDPL mandates a 72-hour breach notification window. Compliance alone is practically a full-time role - and getting it wrong stops being a technology problem and starts being a legal one.",
//                 },
//                 {
//                   tag: "Supply chain risk",
//                   body: "SolarWinds. Log4j. MOVEit. A single vulnerability in one vendor's code cascaded into thousands of organisations overnight. Your cybersecurity risk extends well beyond your own four walls, and no amount of internal rigour compensates for a compromised dependency.",
//                 },
//               ].map((p, i) => (
//                 <motion.article
//                   key={p.tag}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true, margin: "-10%" }}
//                   transition={{ duration: 0.5, delay: i * 0.08 }}
//                   className="relative rounded-2xl border border-border-light bg-surface-secondary/50 p-6 sm:p-8"
//                 >
//                   <span className="absolute -left-px top-6 h-8 w-0.5 bg-gradient-to-b from-[#045891] to-[#1B8AC7]" />
//                   <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#045891]">
//                     {p.tag}
//                   </span>
//                   <p className="mt-3 text-sm leading-relaxed text-body sm:text-base">
//                     {p.body}
//                   </p>
//                 </motion.article>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════ BUSINESS COST ═══════════════════════════════════════ */}
//       <section className="relative overflow-hidden bg-surface-secondary py-16 sm:py-24">
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-[#1B8AC7]/08 blur-[120px]"
//         />
//         <div className="shell">
//           <SectionHeader
//             label="The Real Business Cost of Getting It Wrong"
//             title={
//               <>
//                 When security fails, it fails <span className="gradient-text">expensively</span>.
//               </>
//             }
//             description="Breach costs are the headline. Downtime, churn, and reputation are the tail - and the tail is usually longer than the head."
//             centered
//           />

//           {/* Tabs */}
//           <div className="mt-10 flex justify-center">
//             <div className="inline-flex rounded-full border border-border-light bg-white p-1 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
//               {(Object.keys(businessCost) as CostTab[]).map((key) => (
//                 <button
//                   key={key}
//                   onClick={() => setCostTab(key)}
//                   className={`rounded-full px-4 py-2 text-xs font-semibold transition-all sm:px-6 sm:text-sm ${costTab === key
//                       ? "bg-gradient-to-r from-[#045891] to-[#1B8AC7] text-white shadow-[0_4px_14px_rgba(27,138,199,0.3)]"
//                       : "text-muted hover:text-heading"
//                     }`}
//                 >
//                   {key}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Active panel */}
//           <motion.div
//             key={costTab}
//             initial={{ opacity: 0, y: 18 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//             className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr]"
//           >
//             {/* Hero number card */}
//             <div className="relative overflow-hidden rounded-3xl border border-border-light bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-12">
//               <div
//                 aria-hidden="true"
//                 className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-[#28B5E1]/10 blur-[90px]"
//               />
//               <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#045891]">
//                 {costTab} Impact
//               </span>
//               <div className="mt-4 font-display text-6xl font-bold leading-none tracking-tight text-heading sm:text-7xl md:text-8xl">
//                 <span className="gradient-text">{active.hero}</span>
//               </div>
//               <p className="mt-3 text-sm font-medium uppercase tracking-widest text-muted">
//                 {active.heroLabel}
//               </p>
//               <p className="mt-6 max-w-md text-sm leading-relaxed text-body sm:text-base">
//                 {active.note}
//               </p>
//             </div>

//             {/* Side metrics */}
//             <div className="grid gap-4">
//               {active.side.map((m) => (
//                 <div
//                   key={m.v}
//                   className="flex items-center justify-between rounded-2xl border border-border-light bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-6"
//                 >
//                   <div>
//                     <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
//                       {m.v}
//                     </p>
//                   </div>
//                   <span className="font-display text-2xl font-bold text-[#045891] sm:text-3xl">
//                     {m.k}
//                   </span>
//                 </div>
//               ))}
//               <div className="mt-auto rounded-2xl border border-[#045891]/15 bg-[#045891]/5 p-5 sm:p-6">
//                 <div className="flex items-center gap-2">
//                   <ClockIcon className="h-4 w-4 text-[#045891]" />
//                   <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#045891]">
//                     Every 2 seconds
//                   </span>
//                 </div>
//                 <p className="mt-2 text-sm leading-relaxed text-body">
//                   A new ransomware attempt begins somewhere in the world. This panel
//                   isn't abstract risk - it's your tomorrow if the layers aren't in place.
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════ UAE COMPLIANCE & REGULATORY FRAMEWORK ═══════════════════════════════════════ */}
//       <section className="relative bg-white py-16 sm:py-20" aria-label="UAE compliance and regulatory framework">
//         <div className="shell">
//           <div className="relative overflow-hidden rounded-3xl border border-border-light bg-gradient-to-br from-surface-secondary to-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-12">
//             <div
//               aria-hidden="true"
//               className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#28B5E1]/10 blur-[100px]"
//             />
//             <div className="relative">
//               <div className="flex items-center gap-3">
//                 <span aria-hidden="true" className="h-px w-10 bg-[#045891]" />
//                 <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#045891]">
//                   Regional Compliance
//                 </span>
//               </div>
//               <h3 className="mt-5 font-display text-2xl font-bold leading-tight tracking-tight text-heading sm:text-3xl lg:text-[2rem]">
//                 UAE Compliance &amp; Regulatory Framework - <span className="gradient-text">NESA, SAMA, PDPL, ISO 27001</span>
//               </h3>
//               <p className="mt-5 text-sm leading-relaxed text-body sm:text-base">
//                 Cybersecurity services UAE buyers are no longer evaluated on tooling alone - they're evaluated on regulatory fit. The four frameworks that matter most for organisations operating in the UAE and wider GCC are <strong>NESA</strong> (the UAE Information Assurance Standards published by the national cyber authority), the <strong>SAMA Cybersecurity Framework</strong> (mandatory for financial institutions across Saudi Arabia and a strong signal for cross-border GCC operations), <strong>UAE PDPL</strong> (the federal data protection law with a 72-hour breach-notification window and explicit consent requirements), and <strong>ISO 27001</strong> (the international management-system baseline most procurement teams expect). Our NESA compliance services and SAMA-aligned controls map directly to the seven technical pillars below - so a cyber security company Abu Dhabi or Dubai operations team can demonstrate audit-ready posture without re-papering the programme. Artiflex IT's framework is aligned with all four, and the gap analysis is part of the free assessment.
//               </p>
//               <div className="mt-7 flex flex-wrap gap-2">
//                 {["NESA IAS", "SAMA CSF", "UAE PDPL", "ISO 27001", "NIST CSF"].map((tag) => (
//                   <span
//                     key={tag}
//                     className="rounded-full border border-[#045891]/15 bg-[#045891]/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#045891]"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════ 7 PILLARS ═══════════════════════════════════════ */}
//       <section
//         id="pillars"
//         className="relative overflow-hidden bg-gradient-to-b from-navy-deep via-navy to-navy-deep py-16 sm:py-24"
//       >
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute -left-32 top-20 h-[480px] w-[480px] rounded-full bg-[#1B8AC7]/10 blur-[140px]"
//         />
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#28B5E1]/10 blur-[120px]"
//         />

//         <div className="shell relative">
//           {/* Editorial header */}
//           <div className="mx-auto max-w-3xl text-center">
//             <div className="inline-flex items-center gap-3">
//               <span aria-hidden="true" className="h-px w-10 bg-[#28B5E1]" />
//               <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#28B5E1]">
//                 § Types of Cybersecurity
//               </span>
//               <span aria-hidden="true" className="h-px w-10 bg-[#28B5E1]" />
//             </div>
//             <h2 className="mt-5 font-display text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
//               Seven pillars. One{" "}
//               <span className="gradient-text">layered defence</span>.
//             </h2>
//             <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
//               No single product protects you. Defence-in-depth means overlapping
//               controls - so that when one layer fails, the next catches the threat.
//             </p>
//           </div>

//           <div className="mx-auto mt-12 max-w-3xl">
//             {/* Pillar detail + list */}
//             <div>
//               <motion.div
//                 key={activePillar}
//                 initial={{ opacity: 0, y: 14 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.35 }}
//                 className="relative overflow-hidden rounded-3xl border border-border-light bg-gradient-to-br from-white to-surface-secondary p-7 shadow-[0_20px_60px_rgba(4,88,145,0.35)] sm:p-9"
//               >
//                 <div className="flex items-center justify-between">
//                   <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#045891]">
//                     Pillar {pillars[activePillar].number}
//                   </span>
//                   <span className="rounded-full border border-[#045891]/15 bg-[#045891]/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#045891]">
//                     {pillars[activePillar].category}
//                   </span>
//                 </div>
//                 <div className="mt-5 flex items-start gap-4">
//                   <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#045891]/8 text-[#045891]">
//                     {(() => {
//                       const Icon = pillars[activePillar].icon;
//                       return <Icon className="h-6 w-6" />;
//                     })()}
//                   </div>
//                   <h3 className="font-display text-2xl font-bold text-heading sm:text-3xl">
//                     {pillars[activePillar].title}
//                   </h3>
//                 </div>
//                 <p className="mt-4 text-sm leading-relaxed text-body sm:text-base">
//                   {pillars[activePillar].desc}
//                 </p>
//                 <Link
//                   to={pillars[activePillar].href}
//                   className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#045891] transition-colors hover:text-[#1B8AC7]"
//                 >
//                   Explore this pillar
//                   <ArrowRightIcon className="h-3.5 w-3.5" />
//                 </Link>
//               </motion.div>

//               {/* Pillar chip strip */}
//               <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
//                 {pillars.map((p, i) => (
//                   <button
//                     key={p.number}
//                     onClick={() => setActivePillar(i)}
//                     className={`rounded-xl border px-3 py-3 text-left transition-all ${
//                       activePillar === i
//                         ? "border-[#1B8AC7]/50 bg-[#1B8AC7]/5"
//                         : "border-border-light bg-white hover:border-slate-300"
//                     }`}
//                   >
//                     <p className="font-mono text-[10px] text-muted">{p.number}</p>
//                     <p
//                       className={`mt-1 font-display text-xs font-semibold leading-tight ${
//                         activePillar === i ? "text-[#045891]" : "text-heading"
//                       }`}
//                     >
//                       {p.title.split(" ").slice(0, 2).join(" ")}
//                     </p>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════ ROADMAP ═══════════════════════════════════════ */}
//       <section className="relative bg-surface-secondary py-16 sm:py-24">
//         <div className="shell">
//           <SectionHeader
//             label="Cybersecurity Framework"
//             title={
//               <>
//                 Where Should You Start? A <span className="gradient-text">Practical</span> Cybersecurity Framework
//               </>
//             }
//             description="Don't try to deploy everything at once. This phased rollout - mapped to NIST CSF - is the sequence we'd actually recommend to a CFO asking 'what first?'"
//             centered
//           />

//           <ProcessFlow steps={roadmap} />

//           <div className="mx-auto mt-12 flex max-w-2xl items-center justify-center gap-3 rounded-full border border-border-light bg-white px-5 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
//             <CheckIcon className="h-4 w-4 text-[#045891]" />
//             <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
//               Aligned with NIST CSF · Identify · Protect · Detect · Respond · Recover
//             </span>
//           </div>

//           <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-body sm:text-base">
//             Want the operator's view? Our full cybersecurity plan is broken down into a{" "}
//             <Link to="/cybersecurity/implementation-roadmap" className="font-semibold text-[#045891] underline-offset-2 hover:underline">
//               30-60-90 roadmap
//             </Link>
//             , with deeper dives on{" "}
//             <Link to="/cybersecurity/endpoint-security-edr-xdr" className="font-semibold text-[#045891] underline-offset-2 hover:underline">
//               EDR cyber security
//             </Link>
//             ,{" "}
//             <Link to="/cybersecurity/email-security" className="font-semibold text-[#045891] underline-offset-2 hover:underline">
//               email security
//             </Link>
//             ,{" "}
//             <Link to="/cybersecurity/siem-soar-mdr" className="font-semibold text-[#045891] underline-offset-2 hover:underline">
//               SIEM / MDR
//             </Link>
//             , and our{" "}
//             <Link to="/cybersecurity/vendor-scorecard" className="font-semibold text-[#045891] underline-offset-2 hover:underline">
//               vendor scorecard
//             </Link>{" "}
//             for evaluating cybersecurity services GCC providers.
//           </p>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════ CHECKLIST CTA (roadmap follow-up) ═══════════════════════════════════════ */}
//       <section className="relative bg-white py-12 sm:py-16">
//         <div className="shell">
//           <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy-deep via-navy to-[#0A3D6B] p-6 shadow-[0_20px_60px_rgba(4,88,145,0.25)] sm:p-10 lg:p-12">
//             <div
//               aria-hidden="true"
//               className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#28B5E1]/20 blur-[100px]"
//             />
//             <div
//               aria-hidden="true"
//               className="pointer-events-none absolute -left-20 -bottom-24 h-56 w-56 rounded-full bg-[#1B8AC7]/15 blur-[110px]"
//             />
//             <div
//               aria-hidden="true"
//               className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/60 to-transparent"
//             />

//             <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
//               <div className="max-w-xl">
//                 <div className="flex items-center gap-2">
//                   <UsersIcon className="h-4 w-4 text-[#28B5E1]" />
//                   <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#28B5E1]">
//                     Free · 30-Min Structured Review
//                   </span>
//                 </div>
//                 <h3 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
//                   Need help figuring out{" "}
//                   <span className="gradient-text">where you stand?</span>
//                 </h3>
//                 <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
//                   Our cybersecurity consulting services team can walk you through a
//                   structured assessment in about 30 minutes. It's free, and there's
//                   no sales pitch attached.
//                 </p>
//               </div>

//               <button
//                 onClick={openContact}
//                 className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#045891] shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all hover:brightness-105 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)]"
//               >
//                 Book a Free Assessment
//                 <ArrowRightIcon className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════ MANAGED SERVICES ═══════════════════════════════════════ */}
//       <section className="relative bg-white py-16 sm:py-24">
//         <div className="shell">
//           <SectionHeader
//             label="Managed Cybersecurity Services UAE"
//             title={
//               <>
//                 Building a SOC in-house is a{" "}
//                 <span className="gradient-text">losing math problem</span>.
//               </>
//             }
//             description="The talent shortage is real - especially for any cybersecurity services UAE buyer trying to staff round-the-clock coverage. Here's the honest economics before you decide to hire, and the managed alternative most mid-market teams (including every cyber security company Abu Dhabi we've competed against on price) end up choosing."
//             centered
//           />

//           <div className="grid gap-8 lg:grid-cols-2">
//             {/* In-house reality */}
//             <div className="rounded-3xl border border-border-light bg-surface-secondary p-6 sm:p-10">
//               <div className="flex items-center gap-2">
//                 <UsersIcon className="h-4 w-4 text-muted" />
//                 <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
//                   In-house Reality
//                 </span>
//               </div>
//               <h3 className="mt-4 font-display text-2xl font-bold text-heading sm:text-3xl">
//                 What hiring your own SOC actually costs.
//               </h3>
//               <div className="mt-8 grid grid-cols-2 gap-5">
//                 {inHouseReality.map((r) => (
//                   <div key={r.label} className="border-t border-border-light pt-4">
//                     <p className="font-display text-2xl font-bold text-heading sm:text-3xl">
//                       {r.value}
//                     </p>
//                     <p className="mt-1 text-xs leading-relaxed text-body sm:text-sm">
//                       {r.label}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//               <p className="mt-8 text-sm italic leading-relaxed text-muted">
//                 "Even if you can hire them, retaining experienced analysts is harder
//                 than the hire itself."
//               </p>
//             </div>

//             {/* Managed alternative */}
//             <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#045891] to-[#0A3D6B] p-6 text-white sm:p-10">
//               <div
//                 aria-hidden="true"
//                 className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#28B5E1]/20 blur-[120px]"
//               />
//               <div className="relative">
//                 <div className="flex items-center gap-2">
//                   <BarChartIcon className="h-4 w-4 text-[#28B5E1]" />
//                   <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#28B5E1]">
//                     The Managed Alternative
//                   </span>
//                 </div>
//                 <h3 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
//                   24/7 coverage, senior analysts, enterprise tooling - one monthly cost.
//                 </h3>
//                 <ul className="mt-8 space-y-3">
//                   {managedBenefits.map((b) => (
//                     <li key={b} className="flex items-start gap-3">
//                       <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#28B5E1]/20 text-[#28B5E1]">
//                         <CheckIcon className="h-3 w-3" />
//                       </span>
//                       <span className="text-sm leading-relaxed text-slate-200 sm:text-base">
//                         {b}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//                 <button
//                   onClick={openContact}
//                   className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-display text-sm font-semibold text-[#045891] transition-all hover:brightness-105"
//                 >
//                   Discuss Managed Services
//                   <ArrowRightIcon className="h-4 w-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════ CHECKLIST BANNER ═══════════════════════════════════════ */}
//       <section id="checklist" className="relative bg-surface-secondary py-16 sm:py-20">
//         <div className="shell">
//           <div className="grid items-center gap-8 rounded-3xl border border-border-light bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14 lg:p-14">
//             {/* Doc mockup */}
//             <div className="relative mx-auto w-full max-w-xs">
//               <div className="relative rotate-[-4deg] rounded-xl border border-border-light bg-gradient-to-br from-white to-surface-secondary p-5 shadow-[0_20px_50px_rgba(4,88,145,0.15)]">
//                 <div className="flex items-center gap-2">
//                   <div className="h-2 w-2 rounded-full bg-[#045891]" />
//                   <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
//                     2026 · Raabyt
//                   </span>
//                 </div>
//                 <p className="mt-3 font-display text-sm font-bold leading-tight text-heading">
//                   Cybersecurity Essentials Checklist
//                 </p>
//                 <div className="mt-4 space-y-2">
//                   {["Network perimeter", "Endpoint coverage", "Email & DLP", "Vulnerability cadence", "Incident runbook"].map(
//                     (l) => (
//                       <div key={l} className="flex items-center gap-2">
//                         <span className="flex h-3.5 w-3.5 items-center justify-center rounded-sm border border-[#045891]/30 bg-[#045891]/5">
//                           <CheckIcon className="h-2.5 w-2.5 text-[#045891]" />
//                         </span>
//                         <span className="text-[11px] text-body">{l}</span>
//                       </div>
//                     )
//                   )}
//                 </div>
//                 <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#045891] to-[#28B5E1]" />
//               </div>
//             </div>

//             {/* Copy */}
//             <div>
//               <span className="inline-flex items-center gap-2 rounded-full border border-[#045891]/15 bg-[#045891]/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#045891]">
//                 <FileTextIcon className="h-3 w-3" />
//                 Practitioner Edition
//               </span>
//               <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-heading sm:text-4xl">
//                 The 2026 Cybersecurity <span className="gradient-text">Essentials Checklist</span>.
//               </h2>
//               <p className="mt-3 max-w-xl text-sm leading-relaxed text-body sm:text-base">
//                 A one-page, practitioner-built checklist covering every essential control
//                 - written by the team that deploys them, not the marketing department.
//               </p>
//               <button
//                 onClick={openContact}
//                 className="group mt-6 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all hover:brightness-110"
//               >
//                 Download the Checklist
//                 <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════ FAQ ═══════════════════════════════════════ */}
//       <section className="relative bg-white py-16 sm:py-24">
//         <div className="mx-auto max-w-3xl px-5 sm:px-6">
//           <SectionHeader
//             label="Knowledge Base"
//             title={
//               <>
//                 Frequently <span className="gradient-text">asked</span> questions
//               </>
//             }
//             description="The questions UAE decision-makers actually ask before approving a cybersecurity programme."
//             centered
//           />
//           <FAQAccordion items={faqs} />
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════ FINAL CTA ═══════════════════════════════════════ */}
//       <CTASection
//         title="Get Your Free Cybersecurity Assessment"
//         description="A 30-minute structured posture review. We map your current stack against real threat vectors and compliance requirements, then hand you a prioritised roadmap - no pitch attached."
//         primaryButton={{ text: "Start My Assessment", action: "modal" }}
//       />
//     </>
//   );
// }
