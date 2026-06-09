export type VmVendor = {
  slug: string;
  name: string;
  logo?: string;
  tagline: string;
  bestFor: string;
  description: string;
  keyStats: { label: string; value: string; wide?: boolean }[];
  strengths: {
    title: string;
    desc: string;
    tag?: string;
    icon?:
      | "shield"
      | "heartbeat"
      | "users"
      | "monitor"
      | "server"
      | "eye"
      | "layers"
      | "phone"
      | "mail"
      | "file"
      | "globe"
      | "list"
      | "activity"
      | "lock"
      | "barChart"
      | "message"
      | "sliders";
    tone?: "emerald" | "violet" | "amber" | "rose" | "sky" | "slate";
  }[];
  whyWinsIntro?: {
    label: string;
    title: string;
    description: string;
    stats?: { value: string; label: string; tone: "emerald" | "violet" | "sky" }[];
    outro?: string;
  };
  watchOuts: { title: string; desc: string }[];
  bestFitProfile: string[];
  products: { model: string; segment: string; role: string }[];
  whyArtiflex: string;
  faqs: { question: string; answer: string }[];
  whatIs?: {
    eyebrow: string;
    titlePrefix: string;
    titleHighlight: string;
    bodyParagraphs: string[];
    feature: { titleLine1: string; titleLine2: string; body: string };
    capabilities: string[];
  };
  deploymentOptions?: {
    eyebrow?: string;
    title: string;
    intro: string;
    options: Array<{ icon: "hardware" | "virtual" | "cloud"; title: string; body: string }>;
  };
  extraSections?: {
    eyebrow: string;
    title: string;
    description?: string;
    items: { title: string; desc: string }[];
  }[];
};

export const vmVendors: Record<string, VmVendor> = {
  "sophos-managed-risk": {
    slug: "sophos-managed-risk",
    name: "Sophos Managed Risk",
    logo: "/logos/sophos.svg",
    tagline: "Fully managed continuous vulnerability management plus external attack surface monitoring, powered by Secureworks and the Counter Threat Unit",
    bestFor: "Recommended · Powered by Secureworks · Continuous Exposure Management",
    description:
      "Sophos Managed Risk is a fully managed continuous vulnerability management and external attack surface monitoring service powered by Secureworks. Risk is ranked by real-world exploitability via the Counter Threat Unit (CTU) and Sophos X-Ops, not by raw CVSS scores. Closed-loop integration with Sophos MDR and Taegis SIEM turns findings into detection rules. For UAE banks, ministries, energy and healthcare estates that want exposure management delivered as an outcome rather than another tool to operate, Sophos Managed Risk is the natural recommendation.",
    keyStats: [
      { label: "Service model", value: "Fully managed, no in-house VM team required" },
      { label: "Engine", value: "Powered by Secureworks (acquired by Sophos)" },
      { label: "Intelligence", value: "Counter Threat Unit, 150+ tracked threat actors" },
      { label: "Integration", value: "Closed-loop with Sophos MDR + Taegis SIEM" },
    ],
    whyWinsIntro: {
      label: "Sophos Managed Risk Highlights",
      title: "The right exposure-management answer for UAE buyers who want outcomes, not consoles",
      description:
        "Sophos Managed Risk is most compelling when the buying question is 'who runs my vulnerability programme' rather than 'which scanner do I license.' For UAE customers without dedicated VM engineers, or those tired of CVSS-driven backlog spirals, the service delivers prioritised remediation guidance based on what's actually being exploited. For mature in-house VM teams who want to operate the scanner themselves, Tenable, Qualys or Rapid7 are typically the better fit.",
      stats: [
        { value: "Managed", label: "fully managed continuous VM + external ASM, no in-house VM engineers required", tone: "emerald" },
        { value: "CTU", label: "Counter Threat Unit ranks risk by real exploitability, not CVSS theory", tone: "violet" },
        { value: "Closed-loop", label: "findings auto-feed Sophos MDR and Taegis SIEM detection rules", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Fully managed",
        icon: "shield",
        tone: "emerald",
        title: "Sophos SOC operates the entire VM lifecycle",
        desc: "Discovery, scanning, prioritisation, ticketing and remediation guidance all delivered by Sophos analysts. No in-house VM engineers required. Outcomes are reported on a regular cadence with clear remediation guidance per finding.",
      },
      {
        tag: "Real exploitability",
        icon: "activity",
        tone: "violet",
        title: "CTU-ranked, not CVSS-ranked",
        desc: "Vulnerabilities are prioritised by what the Counter Threat Unit and Sophos X-Ops see being actively exploited in the wild, not by theoretical CVSS scores. Cuts the noise that consumes most in-house VM programmes.",
      },
      {
        tag: "External ASM",
        icon: "eye",
        tone: "sky",
        title: "Attack Surface Management included",
        desc: "Continuous external attack surface monitoring is bundled, discovering shadow IT, forgotten subdomains, exposed admin panels, expired certificates, leaked credentials. Same SOC team operates both internal VM and external ASM.",
      },
      {
        tag: "Closed-loop SOC",
        icon: "layers",
        tone: "amber",
        title: "Findings auto-feed Sophos MDR + Taegis SIEM",
        desc: "Critical vulnerabilities and exposure events drive new detection rules inside Sophos MDR and Taegis SIEM. Unique closed-loop pattern: exposure management informs detection, detection telemetry informs exposure prioritisation.",
      },
      {
        tag: "Secureworks heritage",
        icon: "barChart",
        tone: "rose",
        title: "20+ years of vulnerability and threat intelligence",
        desc: "Powered by Secureworks, which Sophos acquired for USD 859M. Brings 20+ years of CTU vulnerability tracking, breach-investigation context and intelligence on 150+ tracked threat groups into the managed VM service.",
      },
      {
        tag: "Sophos Advisory",
        icon: "list",
        tone: "slate",
        title: "Sophos Advisory Services for offensive testing",
        desc: "Companion service for intelligence-led pentesting, web application security testing and 24/7 emergency incident response. Findings feed directly into Sophos MDR and Taegis SIEM detection rules, every test becomes a permanent detection upgrade.",
      },
    ],
    watchOuts: [
      {
        title: "Less appealing for mature in-house VM teams",
        desc: "Sophos Managed Risk is designed to deliver VM as an outcome. For very large enterprises with dedicated VM engineers who want to operate scanners directly, Tenable Nessus / Tenable.io, Qualys VMDR or Rapid7 InsightVM are typically the better fit. The managed model is most efficient for mid-market and lean enterprise teams.",
      },
      {
        title: "Synchronized value strongest within the Sophos stack",
        desc: "The closed-loop integration with Sophos MDR and Taegis SIEM is unique to the Sophos ecosystem. Customers running a different MDR or SIEM still benefit from the managed service but lose the auto-detection-rule pattern. For non-Sophos SOC estates, Tenable or Qualys with native SIEM integrations may match better operationally.",
      },
    ],
    bestFitProfile: [
      "UAE banks, energy, healthcare and government estates without dedicated VM engineers",
      "Organisations replacing CVSS-driven backlog spirals with exploit-driven prioritisation",
      "Customers already running Sophos MDR or considering it",
      "Mid-market and upper-mid-market enterprises wanting one-vendor SOC + VM operations",
      "Estates under NESA, NCA ECC or SAMA pressure to demonstrate continuous exposure management",
      "Buyers wanting external Attack Surface Management bundled with internal VM",
      "Organisations consolidating multiple security tools under one managed-outcome relationship",
    ],
    products: [
      { model: "Sophos Managed Risk", segment: "Managed VM + ASM", role: "Fully managed continuous VM and external attack surface monitoring" },
      { model: "Sophos Managed Risk + Sophos MDR (bundle)", segment: "Managed VM + SOC", role: "Closed-loop VM + 24/7 MDR, recommended pattern" },
      { model: "Sophos Advisory Services", segment: "Offensive testing", role: "Intelligence-led pentesting, web app security, emergency IR" },
      { model: "Secureworks Taegis SIEM (companion)", segment: "SIEM", role: "Detection rules auto-fed by Managed Risk findings" },
      { model: "Sophos X-Ops Threat Intelligence", segment: "Intel", role: "150+ tracked threat groups feeding exploitability scoring" },
    ],
    whyArtiflex:
      "Artiflex IT is a Platinum Sophos Partner delivering Sophos Managed Risk end-to-end for UAE banks, ministries, energy and healthcare customers. Our team has hands-on experience with full-stack Sophos deployments, Endpoint, Firewall, MDR and Managed Risk, and operates the closed-loop integration patterns that make exposure management auto-feed detection rules. Vendor-neutral sizing is our default; we will tell you when Tenable, Qualys or Rapid7 is the stronger fit for mature in-house VM teams.",
    faqs: [
      {
        question: "Sophos Managed Risk versus running Tenable or Qualys ourselves?",
        answer:
          "Sophos Managed Risk delivers vulnerability management as an outcome, Sophos SOC analysts operate the scanner, triage findings, prioritise by real exploitability and produce remediation guidance. Tenable and Qualys are tools you operate yourself or with a managed-service partner. For UAE customers without dedicated VM engineers, Sophos Managed Risk is typically the cleaner answer; for very large enterprises with mature in-house VM teams, the scanner-led platforms usually win.",
      },
      {
        question: "Does Sophos Managed Risk cover external attack surface?",
        answer:
          "Yes, external Attack Surface Management is bundled into the service. Continuous discovery of shadow IT, forgotten subdomains, exposed admin interfaces, leaked credentials, certificate hygiene. Same SOC team handles both internal VM and external ASM under one managed relationship.",
      },
      {
        question: "How does Sophos Managed Risk prioritise vulnerabilities?",
        answer:
          "Findings are ranked by real exploitability, what the Counter Threat Unit and Sophos X-Ops observe being actively exploited in current attacks. CVSS scores are visible but not the primary ranking signal. This dramatically reduces remediation backlogs versus CVSS-only programmes that flag every high-CVSS finding equally.",
      },
      {
        question: "Can Managed Risk findings drive Sophos MDR detections automatically?",
        answer:
          "Yes. Exposure events and critical vulnerabilities flow into Sophos MDR and Taegis SIEM as new detection rules. Closed-loop pattern: VM informs detection, detection telemetry informs VM prioritisation. Unique to the Sophos stack, non-Sophos SOC estates lose this auto-detection-rule pattern but still get the managed VM outcomes.",
      },
      {
        question: "What is Sophos Advisory Services?",
        answer:
          "Companion offensive-security service powered by Secureworks expertise, intelligence-led pentesting, web application security testing and 24/7 emergency incident response. Findings feed directly into Sophos MDR and Taegis SIEM detection rules. Every test becomes a permanent detection upgrade rather than a one-time PDF report.",
      },
    ],
    whatIs: {
      eyebrow: "What is Sophos Managed Risk",
      titlePrefix: "Vulnerability management for the ",
      titleHighlight: "exploit-driven era",
      bodyParagraphs: [
        "Sophos Managed Risk combines Secureworks' 20+ years of vulnerability intelligence with a Sophos-operated SOC delivery model. Discovery, scanning, prioritisation, ticketing and remediation guidance are all delivered as a managed outcome rather than a tool you operate.",
        "Where legacy VM programmes ranked every high-CVSS finding equally and produced 50,000-item backlogs that nobody worked through, Managed Risk ranks by actual exploitability, what the Counter Threat Unit and Sophos X-Ops see being weaponised right now. Most enterprises see their actionable-finding count drop by an order of magnitude versus CVSS-only scoring.",
        "For UAE buyers, the platform's headline value is closed-loop SOC operations. Vulnerability findings auto-generate Sophos MDR and Taegis SIEM detection rules. Detection telemetry auto-informs vulnerability prioritisation. This is the pattern that elevates Managed Risk above standalone VM platforms, and is why it pairs naturally with Sophos MDR for UAE customers seeking exposure-plus-detection as one outcome.",
      ],
      feature: {
        titleLine1: "CTU exploitability scoring",
        titleLine2: "not CVSS theory",
        body: "The Counter Threat Unit tracks 150+ named threat actors and monitors exploit activity in real time. Sophos Managed Risk prioritises findings by what's actually being exploited, not by theoretical CVSS scores. Critical for UAE customers who can't credibly remediate every high-CVSS finding, the right answer is to fix the small number that actually matter.",
      },
      capabilities: [
        "Continuous internal vulnerability management",
        "External Attack Surface Management (ASM)",
        "CTU-ranked real-exploitability scoring",
        "Remediation guidance with priority context",
        "Closed-loop with Sophos MDR + Taegis SIEM",
        "Sophos X-Ops threat intelligence integration",
        "Sophos Advisory Services (offensive testing)",
        "Powered by Secureworks heritage",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Three ways to consume Sophos Managed Risk,",
      intro: "sized by SOC maturity, asset footprint and combined-service scope.",
      options: [
        { icon: "cloud", title: "Managed Risk (standalone)", body: "Fully managed VM + ASM as a standalone outcome. Right starting point for customers wanting exposure management as an outcome without committing to broader Sophos SOC services." },
        { icon: "virtual", title: "Managed Risk + Sophos MDR (recommended)", body: "Closed-loop pattern: VM findings drive MDR detection rules; MDR telemetry informs VM prioritisation. Most UAE customers run this combined pattern for the strongest operational outcome." },
        { icon: "hardware", title: "Managed Risk + MDR + Sophos Advisory", body: "Full Sophos exposure-and-detection stack: continuous VM, ASM, 24/7 MDR plus intelligence-led offensive testing. Findings from every layer feed detection rules. Recommended for ministries, banks and critical-infrastructure estates." },
      ],
    },
    extraSections: [
      {
        eyebrow: "Sophos Advisory Services",
        title: "Five engagements that test what scanners cannot",
        description:
          "Powered by Secureworks expertise: intelligence-led pentesting, web application security and 24/7 emergency incident response. Findings feed directly into your Sophos MDR and Taegis SIEM detection rules.",
        items: [
          { title: "External Penetration Testing", desc: "Black-box simulation of a real-world attacker breaching from the outside. Tests internet-facing systems, web applications, VPN gateways, email servers and DNS infrastructure. Critical and high-severity findings are re-tested within 90 days at no extra cost." },
          { title: "Internal Penetration Testing", desc: "Insider-threat and post-perimeter-breach simulation. Tests lateral movement, privilege escalation, credential harvesting, pass-the-hash, Kerberoasting and access to finance, HR, IP repositories and backup infrastructure." },
          { title: "Wireless Network Penetration Testing", desc: "Assesses Wi-Fi infrastructure for rogue APs, 802.11 protocol weaknesses, WPA2 / WPA3 implementation, guest-network isolation and shadow IT wireless devices. Covers PCI-DSS and ISO 27001 wireless control requirements." },
          { title: "Web Application Security Assessment", desc: "Comprehensive OWASP Top 10 testing, REST and SOAP API security, authentication and session management, MFA bypass and business-logic flaws unique to your application's workflow that automated scanners cannot detect." },
          { title: "Sophos Emergency Incident Response", desc: "On-demand 24/7/365 access to a combined Sophos and Secureworks IR team. Hourly billed, no minimum commitment. Triage, containment, adversary eviction, recovery, ransom-negotiation support and post-incident hardening." },
        ],
      },
      {
        eyebrow: "Why Sophos Advisory outperforms",
        title: "Why Sophos Advisory outperforms generic testing firms",
        items: [
          { title: "Counter Threat Unit (CTU)", desc: "150+ threat groups tracked in real time. Advisory testers know exactly which TTPs are actively targeting your industry today, not last year's threat landscape." },
          { title: "20+ Years IR Experience", desc: "Thousands of real breach investigations inform how Sophos testers simulate adversary behaviour. Testing is grounded in actual attack patterns, not textbook theory." },
          { title: "Taegis SIEM Integration", desc: "After a penetration test, findings can be directly mapped to Taegis detection rules. Advisory services create permanent detection improvements, not just a PDF report." },
          { title: "Threat Intelligence Library", desc: "Access to Secureworks' proprietary intelligence covering 300,000+ malware indicators and adversary infrastructure, informing realistic attack-simulation scenarios." },
          { title: "Global Incident Response", desc: "Sophos advisory testers have backgrounds spanning active incident response. They test your defences the same way they have seen attackers breach real organisations." },
          { title: "Compliance Framework Expertise", desc: "Deep experience in regulated sectors (banking, healthcare, government). Engagements align directly to PCI-DSS, ISO 27001, HIPAA and NESA control requirements." },
        ],
      },
    ],
  },

  "fortra-tripwire": {
    slug: "fortra-tripwire",
    name: "Fortra Tripwire",
    logo: "/logos/Fortra.png",
    tagline: "Invented File Integrity Monitoring, the FIM, SCM and continuous-compliance reference with the largest policy library in the industry",
    bestFor: "Compliance & Change Control · Largest Policy Library in the Industry",
    description:
      "Fortra Tripwire invented File Integrity Monitoring 25+ years ago and remains the FIM, SCM and continuous-compliance reference platform. The largest policy library in the industry covers 4,000+ platform/policy combinations across PCI-DSS, CIS, DISA STIG, NESA, NCA ECC and ADHICS. IP360 adds host-of-system-state (HoSS) vulnerability scoring. Safe OT / ICS scanning makes Tripwire one of the few mainstream VM platforms suitable for operational technology environments. ExpertOps offers a fully managed option for customers without in-house compliance engineers.",
    keyStats: [
      { label: "Heritage", value: "Invented File Integrity Monitoring 25+ years ago" },
      { label: "Policy library", value: "4,000+ platform/policy combinations" },
      { label: "OT / ICS", value: "Safe scanning for operational technology estates" },
      { label: "Managed option", value: "ExpertOps fully managed service" },
    ],
    strengths: [
      {
        tag: "FIM reference",
        icon: "shield",
        tone: "emerald",
        title: "Industry-standard File Integrity Monitoring",
        desc: "Tripwire invented FIM 25+ years ago and remains the audit-grade reference for file, registry and configuration change detection. Deep forensic detail on every change: who, when, where, before/after state. Useful for post-incident investigation and PCI-DSS / NESA audit evidence.",
      },
      {
        tag: "SCM + policies",
        icon: "file",
        tone: "violet",
        title: "4,000+ policy/platform combinations",
        desc: "Security Configuration Management with the largest policy library in the industry, PCI-DSS, CIS Benchmarks, DISA STIG, NESA UAE IA, NCA ECC, ADHICS, ISO 27001 and more. Continuous compliance monitoring without manually authoring each control.",
      },
      {
        tag: "IP360 VM",
        icon: "activity",
        tone: "sky",
        title: "Host-of-system-state vulnerability scoring",
        desc: "IP360 adds vulnerability scanning to the Tripwire platform with HoSS scoring that accounts for actual host state rather than pure CVSS. Tight integration with FIM and SCM creates a unified exposure picture across vulnerabilities, configuration drift and unauthorised change.",
      },
      {
        tag: "OT / ICS safe",
        icon: "server",
        tone: "amber",
        title: "Operational technology scanning that won't crash control systems",
        desc: "Tripwire's OT / ICS scanning approach is engineered to be safe against fragile SCADA, PLC and ICS devices that traditional scanners can crash. Critical for UAE energy, oil & gas, utilities and manufacturing estates with significant operational technology scope.",
      },
      {
        tag: "ExpertOps managed",
        icon: "users",
        tone: "rose",
        title: "Fortra-managed option for lean teams",
        desc: "ExpertOps delivers Tripwire as a fully managed service, Fortra analysts handle deployment, tuning, policy maintenance and reporting. Useful for UAE customers under audit pressure who don't have dedicated compliance engineers.",
      },
      {
        tag: "Sovereign",
        icon: "lock",
        tone: "slate",
        title: "On-prem deployment for sovereign estates",
        desc: "Tripwire deploys fully on-prem. Suitable for UAE ministries, defence and FSI customers with data-residency mandates that restrict cloud-based VM platforms.",
      },
    ],
    watchOuts: [
      {
        title: "Console UI feels dated",
        desc: "The Tripwire admin experience reflects the platform's age. Functionally complete but visually less modern than SaaS-first competitors (Qualys, Rapid7). The depth and policy breadth more than compensate when compliance is the dominant driver.",
      },
      {
        title: "Heavier infrastructure footprint than SaaS-first competitors",
        desc: "On-prem deployment requires more infrastructure planning than Tenable.io or Qualys VMDR. Best fit when sovereign on-prem is a requirement or audit gravity justifies the operational depth.",
      },
      {
        title: "Best leverage when compliance is the dominant criterion",
        desc: "Tripwire's strongest value shows up when continuous compliance, change control or OT / ICS scanning is the buying driver. For pure SaaS-first vulnerability management without these drivers, Tenable.io or Qualys VMDR typically deliver faster time-to-value.",
      },
    ],
    bestFitProfile: [
      "UAE banks, FSI and government estates under PCI-DSS / NESA / NCA ECC continuous-compliance mandates",
      "Energy, oil & gas, utilities and manufacturing with significant OT / ICS scanning scope",
      "Organisations recovering from change-control or FIM-related audit findings",
      "Sovereign estates requiring fully on-prem deployment",
      "Buyers needing the broadest policy library across PCI / CIS / STIG / NESA / NCA ECC / ADHICS",
      "Existing Fortra customers consolidating across Fortra Tripwire / Boldon James / Digital Guardian",
      "Customers wanting Fortra-managed ExpertOps delivery rather than self-operation",
    ],
    products: [
      { model: "Tripwire Enterprise (FIM + SCM)", segment: "FIM / SCM", role: "Industry-standard File Integrity Monitoring + Security Configuration Management" },
      { model: "Tripwire IP360", segment: "VM", role: "Host-of-system-state vulnerability scoring integrated with Tripwire Enterprise" },
      { model: "Tripwire ExpertOps", segment: "Managed", role: "Fortra-managed Tripwire as a service for lean compliance teams" },
      { model: "Tripwire for DevOps", segment: "DevOps", role: "FIM and SCM integrated into CI/CD pipelines" },
      { model: "Tripwire Industrial Visibility", segment: "OT / ICS", role: "Safe OT / ICS scanning for operational technology estates" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Fortra Tripwire for UAE customers under continuous-compliance mandates and for estates with significant OT / ICS scope. Our team covers Tripwire Enterprise FIM/SCM deployment, IP360 vulnerability scanning, ExpertOps managed delivery and OT / ICS scoping. Vendor-neutral sizing is our default, we will tell you when Tenable, Qualys or Sophos Managed Risk is the stronger fit for non-compliance-driven, non-OT VM scenarios.",
    faqs: [
      {
        question: "When does Tripwire win over Tenable or Qualys?",
        answer:
          "When continuous compliance, change control or OT / ICS scanning is the dominant buying driver. Tripwire's policy library (4,000+ combinations) and FIM heritage are unmatched, and the safe OT scanning approach is among the strongest in the market. For pure cloud-first VM without these drivers, Tenable or Qualys typically deliver faster time-to-value.",
      },
      {
        question: "Is Tripwire still relevant given modern VM platforms?",
        answer:
          "Yes, for compliance-heavy estates. FIM remains a PCI-DSS requirement (Req 11.5), and the Tripwire policy library shortens NESA / NCA ECC / ADHICS audit evidence work considerably. Modern VM platforms have caught up on vulnerability scanning but few match Tripwire's FIM + SCM + policy library depth.",
      },
      {
        question: "Can Tripwire scan OT and ICS environments?",
        answer:
          "Yes, Tripwire's OT / ICS scanning approach is engineered to be safe against fragile SCADA, PLC and ICS devices. Tripwire Industrial Visibility extends coverage to operational technology assets that traditional vulnerability scanners would crash. Critical for UAE energy, oil & gas, utilities and manufacturing.",
      },
      {
        question: "What is ExpertOps?",
        answer:
          "Tripwire ExpertOps is Fortra's managed service, Fortra analysts handle deployment, tuning, policy library maintenance and reporting. Suitable for UAE customers under audit pressure who don't have dedicated FIM / SCM / compliance engineers in-house.",
      },
    ],
    extraSections: [
      {
        eyebrow: "Continuous compliance",
        title: "Why Tripwire wins on continuous compliance",
        description:
          "Eight capabilities that separate Fortra Tripwire from the rest of the field, especially when PCI DSS, NERC CIP, SOX, NESA UAE IA or central-bank audits are in scope.",
        items: [
          { title: "FIM + VM + SCM in one", desc: "Three audit controls collapsed into one vendor. Fewer tools, fewer integrations, simpler reporting." },
          { title: "Continuous compliance", desc: "Audit-ready every day, not the week before the auditor arrives. Reduces audit cost meaningfully." },
          { title: "Largest policy library", desc: "Pre-built CIS, DISA STIG, NESA, NCA ECC, ADHICS, PCI, NERC and HIPAA out of the box, not consulting projects." },
          { title: "OT-aware safe scanning", desc: "Industrial Control / SCADA networks where aggressive scanners crash PLCs. Tripwire is OT-aware and built for safe scanning." },
          { title: "Managed ExpertOps", desc: "Customers without 24x7 staff buy the platform plus the operations team in a single contract." },
          { title: "Forensic-grade change data", desc: "Knows the file was changed, by whom, from which process, at which second. Essential for incident response." },
          { title: "Vendor stability (Fortra)", desc: "Fortra is profitable, private-equity-owned and actively investing in the Tripwire roadmap." },
          { title: "Portfolio leverage", desc: "Bundle pricing with Fortra DLP (Digital Guardian), Fortra Email Security (Agari + Clearswift) and Alert Logic MDR." },
        ],
      },
    ],
  },

  tenable: {
    slug: "tenable",
    name: "Tenable Nessus / Tenable.io / Tenable One",
    logo: "/logos/tenable.png",
    tagline: "World's most widely deployed vulnerability scanner, 80,000+ plugins, 30,000+ customers, the Cyber Exposure category-defining platform",
    bestFor: "Industry-Leading Vulnerability Scanner · 80,000+ Plugins",
    description:
      "Tenable's vulnerability scanner heritage starts with Nessus, the world's most widely deployed scanner, with 80,000+ plugins covering IT, OT, cloud and web application assets. Tenable.io is the SaaS continuous-VM platform built on the same engine. Tenable One consolidates VM, Cloud Security Posture Management, web application scanning, OT visibility and identity risk under one Cyber Exposure Score. For UAE enterprises with mature in-house VM teams, Tenable is the safest scanner-led shortlist option, at the cost of needing the operational capability to run it.",
    keyStats: [
      { label: "Heritage", value: "World's most widely deployed vulnerability scanner (Nessus)" },
      { label: "Plugin breadth", value: "80,000+ plugins covering IT, OT, cloud, web apps" },
      { label: "Scale", value: "30,000+ customers globally" },
      { label: "Platform", value: "Tenable One unifies VM + CSPM + WAS + identity risk" },
    ],
    strengths: [
      {
        tag: "Nessus scanner",
        icon: "shield",
        tone: "emerald",
        title: "Industry-standard scanner with broadest plugin library",
        desc: "Nessus is the world's most widely deployed vulnerability scanner. 80,000+ plugins cover virtually every asset type, OS, network device, web application framework and cloud configuration. Procurement and audit teams across UAE recognise the platform name.",
      },
      {
        tag: "Tenable.io SaaS",
        icon: "globe",
        tone: "violet",
        title: "Cloud-native continuous VM platform",
        desc: "Tenable.io is the SaaS-delivered continuous VM platform built on the Nessus engine. No on-prem infrastructure to operate, with full multi-tenant scaling and continuous discovery across hybrid estates.",
      },
      {
        tag: "Tenable One",
        icon: "layers",
        tone: "sky",
        title: "Unified Cyber Exposure across VM + CSPM + WAS + identity",
        desc: "Tenable One consolidates vulnerability management, Cloud Security Posture Management, web application scanning, OT visibility and identity risk into one platform with a unified Cyber Exposure Score. Reduces tool sprawl for buyers consolidating multiple exposure categories.",
      },
      {
        tag: "OT visibility",
        icon: "server",
        tone: "amber",
        title: "Tenable OT Security for industrial environments",
        desc: "Tenable OT Security (formerly Indegy) extends visibility into OT and ICS environments with safe protocol-aware scanning. Useful for UAE energy, utilities and manufacturing estates with hybrid IT + OT scope.",
      },
      {
        tag: "Predictive Prioritisation",
        icon: "activity",
        tone: "rose",
        title: "VPR risk scoring beyond CVSS",
        desc: "Vulnerability Priority Rating (VPR) applies machine learning over exploit intelligence, threat actor activity and asset criticality to produce a prioritisation score that goes beyond raw CVSS. Helps in-house VM teams cut the noise from CVSS-only programmes.",
      },
      {
        tag: "Audit recognition",
        icon: "barChart",
        tone: "slate",
        title: "Reference standard for procurement and audit",
        desc: "Tenable / Nessus is the reference standard most UAE audit and procurement teams recognise by name. Lowest risk profile of any scanner-led shortlist option for buyers prioritising vendor maturity and audit defensibility.",
      },
    ],
    watchOuts: [
      {
        title: "Tool-led rather than service-led",
        desc: "Tenable is a platform you operate. Requires an in-house VM operations capability or a managed-service partner. UAE customers without dedicated VM engineers typically need to pair Tenable with managed-service delivery or pick a managed alternative like Sophos Managed Risk instead.",
      },
      {
        title: "Premium pricing at the Tenable One tier",
        desc: "Tenable One bundle pricing is at the upper end of the market. Many customers start with Nessus or Tenable.io and grow into the broader Tenable One platform as exposure-category consolidation becomes a goal.",
      },
      {
        title: "Best fit for mature VM teams",
        desc: "Tenable's value scales with the maturity of the team operating it. For lean mid-market security teams without dedicated VM engineers, Sophos Managed Risk's managed delivery typically produces better outcomes per dollar.",
      },
    ],
    bestFitProfile: [
      "UAE large enterprises and banks with mature in-house VM teams",
      "Estates with significant hybrid IT + OT scope (Tenable OT Security)",
      "Organisations consolidating VM + CSPM + WAS + identity risk under Tenable One",
      "Buyers prioritising scanner-led platforms with the broadest plugin library",
      "Procurement-driven shortlists where vendor recognition is decisive",
      "Customers who want to operate the platform themselves with optional managed wrapper",
      "Multi-cloud estates needing native Tenable Cloud Security alongside VM",
    ],
    products: [
      { model: "Nessus Professional", segment: "Scanner", role: "World's most widely deployed vulnerability scanner, starter SKU" },
      { model: "Tenable.io", segment: "Cloud VM", role: "SaaS continuous-VM platform on the Nessus engine" },
      { model: "Tenable One", segment: "Exposure platform", role: "Unified VM + CSPM + WAS + identity risk + OT" },
      { model: "Tenable OT Security", segment: "OT / ICS", role: "Safe scanning for industrial control systems and OT estates" },
      { model: "Tenable Cloud Security", segment: "CSPM / CNAPP", role: "Cloud Security Posture Management and CNAPP coverage" },
      { model: "Tenable Web App Scanning", segment: "WAS", role: "Dynamic web application security testing" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Tenable for UAE customers with mature in-house VM teams and large enterprise estates where scanner-led depth is the buying driver. Our team covers Nessus, Tenable.io and Tenable One deployments, plus OT Security scoping for hybrid IT + OT environments. Vendor-neutral sizing is our default, we will tell you when Sophos Managed Risk's managed delivery is the better fit for teams without dedicated VM engineers.",
    faqs: [
      {
        question: "Tenable Nessus or Tenable.io or Tenable One?",
        answer:
          "Nessus Professional is the entry-point scanner, single user, manual scans. Tenable.io is the SaaS continuous-VM platform for organisations that have outgrown standalone Nessus. Tenable One is the unified exposure platform consolidating VM + CSPM + WAS + identity risk. Most UAE customers start with Tenable.io and grow into Tenable One as exposure-category consolidation becomes a goal.",
      },
      {
        question: "Tenable or Qualys?",
        answer:
          "Both are Gartner Leader-tier VM platforms. Tenable has the deepest plugin library (Nessus) and the strongest OT story. Qualys has the most integrated patch-management and policy-compliance bundle. For UAE customers with significant OT scope or where Nessus is already in use, Tenable typically wins; for cloud-first SaaS-only estates with bundled patch needs, Qualys often wins.",
      },
      {
        question: "Can Tenable scan OT environments?",
        answer:
          "Yes, Tenable OT Security (formerly Indegy) provides safe protocol-aware scanning for OT and ICS environments. Critical for UAE energy, utilities and manufacturing estates with hybrid IT + OT scope. Tripwire Industrial Visibility is the alternative if Tripwire is already in the estate.",
      },
      {
        question: "Do we need a managed-service partner for Tenable?",
        answer:
          "If you don't have dedicated VM engineers, yes. Tenable is a tool-led platform that needs operational capability behind it. Artiflex IT can deliver Tenable as a co-managed service, or we'll recommend Sophos Managed Risk if a fully-managed-outcome model is the better fit.",
      },
    ],
  },

  "qualys-vmdr": {
    slug: "qualys-vmdr",
    name: "Qualys VMDR",
    logo: "/logos/qualys.png",
    tagline: "Cloud-native VMDR unifying asset inventory, vulnerability detection, threat prioritisation and patch management under one subscription",
    bestFor: "Cloud-Native VMDR · TruRisk Score · Bundled Patch Management",
    description:
      "Qualys VMDR is the cloud-native platform unifying asset inventory, vulnerability detection, threat prioritisation and patch orchestration under a single subscription. The TruRisk Score quantifies risk in business terms across the full estate, while Policy Compliance automates evidence collection for CIS, PCI-DSS, HIPAA and ISO 27001. For UAE buyers wanting bundled VM + patch + policy compliance with cloud-first delivery, Qualys VMDR is the natural shortlist option.",
    keyStats: [
      { label: "Architecture", value: "Cloud-native VMDR, no on-prem infrastructure" },
      { label: "Bundle", value: "VM + asset inventory + patch + compliance in one subscription" },
      { label: "Scoring", value: "TruRisk Score, business-context risk quantification" },
      { label: "Compliance", value: "Policy Compliance automates CIS / PCI / HIPAA evidence" },
    ],
    strengths: [
      {
        tag: "Cloud-native",
        icon: "globe",
        tone: "emerald",
        title: "Hyperscale cloud-native VM platform",
        desc: "Qualys is one of the longest-running cloud-native VM platforms in the market. No on-prem infrastructure to operate. Scales without sizing exercises for the largest hybrid estates.",
      },
      {
        tag: "Asset inventory",
        icon: "list",
        tone: "violet",
        title: "Unified asset inventory with vulnerability context",
        desc: "Qualys Asset Inventory discovers and classifies every IT, cloud and OT asset with full configuration context, then ties vulnerabilities directly to the asset record. Critical for UAE estates where ghost-asset and shadow-IT exposure is a board-level concern.",
      },
      {
        tag: "Patch Management",
        icon: "shield",
        tone: "sky",
        title: "Native patch orchestration bundled with VM",
        desc: "Qualys Patch Management runs patch orchestration from the same console as vulnerability detection. Closes the loop between 'we found a vulnerability' and 'it's patched' without bouncing through a separate patch tool.",
      },
      {
        tag: "TruRisk Score",
        icon: "barChart",
        tone: "amber",
        title: "Business-context risk quantification",
        desc: "TruRisk Score combines exploit intelligence, threat actor activity, asset criticality and business context into a single risk number. Useful for executive reporting and board-level conversations on cyber exposure.",
      },
      {
        tag: "Policy Compliance",
        icon: "file",
        tone: "rose",
        title: "Automated CIS / PCI / HIPAA / ISO 27001 evidence",
        desc: "Qualys Policy Compliance ships pre-built policies for CIS Benchmarks, PCI-DSS, HIPAA, ISO 27001 and many UAE-relevant frameworks. Reduces audit-evidence collection effort significantly for compliance-heavy estates.",
      },
      {
        tag: "CSAM + CyberSecurity",
        icon: "layers",
        tone: "slate",
        title: "Broader Enterprise TruRisk platform",
        desc: "Qualys VMDR plugs into the wider Qualys Enterprise TruRisk Platform: CyberSecurity Asset Management, web application scanning, container security, cloud workload protection. Useful for estates consolidating multiple exposure categories under one vendor.",
      },
    ],
    watchOuts: [
      {
        title: "Strongest value when committing to the full bundle",
        desc: "VMDR's TCO advantage shows up when customers commit to VMDR + Patch Management + Policy Compliance together. For VM-only deployments without patch or compliance scope, the value vs Tenable or Rapid7 narrows.",
      },
      {
        title: "Per-asset licensing should be modelled carefully",
        desc: "Qualys per-asset licensing at scale (50,000+ assets) needs careful commercial modelling. Cloud and ephemeral assets (containers, serverless) can drive unexpected licence consumption. Plan the asset-count strategy as part of procurement.",
      },
      {
        title: "Tool-led, requires operational capability",
        desc: "Qualys is a platform you operate. UAE customers without dedicated VM engineers typically need a managed-service partner or should consider Sophos Managed Risk's managed-outcome model instead.",
      },
    ],
    bestFitProfile: [
      "UAE customers consolidating VM + patch + compliance into one subscription",
      "Cloud-first estates without sovereign on-prem VM mandates",
      "Organisations needing TruRisk-style executive risk quantification",
      "Customers under PCI-DSS, HIPAA, ISO 27001 or CIS Benchmark compliance pressure",
      "Estates with significant ghost-asset / shadow-IT exposure needing CSAM coverage",
      "Buyers wanting bundled patch orchestration alongside vulnerability detection",
      "Multi-cloud estates leveraging Qualys Cloud Workload Protection",
    ],
    products: [
      { model: "Qualys VMDR", segment: "Core VM", role: "Asset inventory + vulnerability detection + threat prioritisation + patch, recommended starting point" },
      { model: "Qualys Patch Management", segment: "Patch", role: "Native patch orchestration bundled with VMDR" },
      { model: "Qualys Policy Compliance", segment: "Compliance", role: "Automated CIS / PCI / HIPAA / ISO 27001 evidence collection" },
      { model: "Qualys CyberSecurity Asset Management", segment: "CSAM", role: "Continuous asset discovery and classification" },
      { model: "Qualys TotalCloud", segment: "CNAPP", role: "Cloud workload protection and CSPM" },
      { model: "Qualys Web Application Scanning", segment: "WAS", role: "Dynamic web application security testing" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Qualys VMDR for UAE customers consolidating vulnerability management, patch orchestration and policy compliance under one subscription. Our team covers VMDR deployment, Patch Management configuration, Policy Compliance evidence baselines and TruRisk reporting. Vendor-neutral sizing is our default, we will tell you when Tenable's broader scanner platform, Rapid7's live dashboards or Sophos Managed Risk's managed model is the stronger fit.",
    faqs: [
      {
        question: "Qualys or Tenable?",
        answer:
          "Both are Gartner Leader-tier VM platforms. Qualys leads on bundled VM + patch + compliance in one subscription and TruRisk business-context scoring. Tenable leads on plugin breadth (Nessus, 80,000+ plugins), OT scanning depth and exposure-category consolidation (Tenable One). For customers wanting bundled patch with VM, Qualys typically wins; for the broadest scanner depth or OT-heavy estates, Tenable typically wins.",
      },
      {
        question: "Does Qualys really replace our patch tool?",
        answer:
          "Yes for the majority of patch scenarios. Qualys Patch Management handles OS patches, third-party application patches and zero-day mitigation orchestration. For specialised patch tools (SCCM / Intune-native patching, OT-specific patch tools), Qualys typically integrates alongside rather than replacing.",
      },
      {
        question: "How does TruRisk compare to CVSS?",
        answer:
          "TruRisk combines CVSS with exploit intelligence, threat actor activity, asset criticality and business context. The result is a single risk number that reflects what you should actually fix first, not the equally-weighted high-CVSS backlog that produces noise. Most customers see actionable-finding counts drop substantially after adopting TruRisk-led prioritisation.",
      },
      {
        question: "Is Qualys suitable for sovereign UAE estates?",
        answer:
          "Qualys delivers from regional cloud regions and is consumable under NESA / NCA ECC controls. For fully on-prem air-gap requirements (defence, certain ministries), Tripwire on-prem is the alternative pattern. For mainstream UAE banks and government cloud-first estates, Qualys's regional SaaS is well-aligned.",
      },
    ],
  },

  "rapid7-insightvm": {
    slug: "rapid7-insightvm",
    name: "Rapid7 InsightVM",
    logo: "/logos/rapid7.png",
    tagline: "Live risk dashboards backed by Metasploit exploit data and Project Sonar internet-wide visibility, part of the Rapid7 Insight Platform",
    bestFor: "Real-Time Visibility · Live Dashboards · Insight Platform",
    description:
      "Rapid7 InsightVM delivers live, real-time vulnerability risk dashboards backed by Metasploit exploit data and the Project Sonar internet-wide scanning project. Real Risk Score quantifies prioritisation using live exploitability evidence. Native ServiceNow, Jira and Splunk workflow integrations ship out of the box. InsightVM is part of the wider Rapid7 Insight Platform spanning XDR, MDR, application security and threat intelligence.",
    keyStats: [
      { label: "Architecture", value: "Live dashboards, cloud-native via Insight Platform" },
      { label: "Exploit data", value: "Backed by Metasploit framework intelligence" },
      { label: "External visibility", value: "Project Sonar internet-wide scanning project" },
      { label: "Platform", value: "Part of Rapid7 Insight Platform (XDR / MDR / AppSec)" },
    ],
    strengths: [
      {
        tag: "Live dashboards",
        icon: "activity",
        tone: "emerald",
        title: "Real-time vulnerability risk visibility",
        desc: "InsightVM dashboards reflect live state rather than static scan snapshots. Useful for SOC and IT operations teams who want continuous visibility into risk posture without waiting for the next scheduled scan cycle.",
      },
      {
        tag: "Metasploit",
        icon: "shield",
        tone: "violet",
        title: "Real Risk Score backed by live Metasploit exploit data",
        desc: "Real Risk Score prioritises vulnerabilities using live exploit availability data from the Metasploit framework, the open-source standard that Rapid7 maintains. Cuts noise from CVSS-only programmes by surfacing what's actually weaponised.",
      },
      {
        tag: "Project Sonar",
        icon: "eye",
        tone: "sky",
        title: "Internet-wide external exposure visibility",
        desc: "Project Sonar continuously scans the public internet and feeds InsightVM with view of how your external attack surface appears to attackers. Useful for executive reporting on board-level external exposure questions.",
      },
      {
        tag: "Native workflows",
        icon: "layers",
        tone: "amber",
        title: "Out-of-the-box ServiceNow, Jira and Splunk integrations",
        desc: "InsightVM ships pre-built workflow integrations with ServiceNow, Jira and Splunk. Reduces deployment effort versus competitors that require custom workflow authoring to push findings into ticketing or SIEM.",
      },
      {
        tag: "Insight Platform",
        icon: "globe",
        tone: "rose",
        title: "Wider platform spanning XDR, MDR, AppSec, threat intel",
        desc: "InsightVM connects to the Rapid7 Insight Platform: InsightIDR (XDR / SIEM), Managed Detection and Response, InsightAppSec (WAS), InsightConnect (SOAR), Threat Command (threat intel). Useful for customers consolidating exposure + detection under one vendor.",
      },
      {
        tag: "Velociraptor + Metasploit",
        icon: "barChart",
        tone: "slate",
        title: "Open-source community heritage",
        desc: "Rapid7 maintains Metasploit (open-source exploitation framework) and Velociraptor (DFIR tool). The platform benefits from open-source community telemetry and contributions in ways closed-platform competitors don't match.",
      },
    ],
    watchOuts: [
      {
        title: "Scan-performance and admin-complexity at scale",
        desc: "Customers commonly report scan-performance and console-admin complexity issues at scale. Smaller estates typically have no issue; large enterprise deployments need careful sizing and operational planning.",
      },
      {
        title: "Premium-priced platform",
        desc: "Total cost of ownership for InsightVM plus the broader Rapid7 Insight Platform is among the higher tiers in the market. Most cost-efficient when consolidating VM + XDR + AppSec + SOAR under the same platform.",
      },
      {
        title: "Tool-led, requires operational capability",
        desc: "Rapid7 is a platform you operate. UAE customers without dedicated VM engineers typically need a managed-service partner, Rapid7 offers MDR but it doesn't include InsightVM management end-to-end the way Sophos Managed Risk does.",
      },
    ],
    bestFitProfile: [
      "UAE customers consolidating VM + XDR + AppSec on the Rapid7 Insight Platform",
      "Organisations valuing live dashboards over static scan snapshots",
      "Estates with mature SOC teams that benefit from Metasploit exploit context",
      "Customers needing strong out-of-the-box ServiceNow / Jira / Splunk workflow integration",
      "Buyers prioritising external attack surface visibility via Project Sonar",
      "Multi-cloud estates leveraging Rapid7 InsightCloudSec for CSPM alongside VM",
      "Customers with mature DevOps practices using Rapid7 InsightAppSec for DAST",
    ],
    products: [
      { model: "Rapid7 InsightVM", segment: "Core VM", role: "Live vulnerability risk dashboards with Real Risk Score" },
      { model: "Rapid7 Nexpose", segment: "On-prem VM", role: "Legacy on-prem scanner for sovereign deployments" },
      { model: "Rapid7 InsightIDR", segment: "XDR / SIEM", role: "Cloud SIEM and XDR companion to InsightVM" },
      { model: "Rapid7 InsightAppSec", segment: "WAS", role: "Dynamic web application security testing" },
      { model: "Rapid7 InsightConnect", segment: "SOAR", role: "Playbook automation across InsightVM and InsightIDR" },
      { model: "Rapid7 Managed VM", segment: "Managed", role: "Rapid7-delivered managed service for InsightVM operations" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Rapid7 InsightVM for UAE customers consolidating vulnerability management and detection / response on the Insight Platform. Our team covers InsightVM deployment, Real Risk Score tuning, ServiceNow / Jira / Splunk workflow integration and Project Sonar external exposure baselines. Vendor-neutral sizing is our default, we will tell you when Tenable's broader scanner platform, Qualys's bundled VM+patch model or Sophos Managed Risk's managed-outcome delivery is the stronger fit.",
    faqs: [
      {
        question: "Rapid7 InsightVM or Tenable?",
        answer:
          "Both are Gartner Leader-tier VM platforms. Tenable leads on plugin breadth (Nessus) and OT scanning depth. InsightVM leads on live dashboards, Metasploit-backed Real Risk Score and out-of-the-box ServiceNow / Jira / Splunk workflows. For customers consolidating VM + XDR + AppSec under one platform, InsightVM typically wins; for scanner-led depth or OT scope, Tenable typically wins.",
      },
      {
        question: "What does Project Sonar give us?",
        answer:
          "Project Sonar is Rapid7's continuous internet-wide scanning project. InsightVM uses Sonar data to show how your external attack surface appears to attackers, exposed services, certificate hygiene, banner information. Useful at the executive layer for board-level external exposure conversations.",
      },
      {
        question: "Is InsightVM right for OT environments?",
        answer:
          "Less so than Tenable OT Security or Tripwire Industrial Visibility. For UAE customers with significant OT / ICS scope, Tenable or Tripwire are typically the safer pick. InsightVM is strongest in IT and cloud environments with mature DevOps workflows.",
      },
      {
        question: "Do we need the full Rapid7 Insight Platform?",
        answer:
          "No, InsightVM runs standalone. But the platform's commercial and integration leverage is strongest when customers consolidate InsightVM + InsightIDR + InsightAppSec + InsightConnect. Many UAE buyers start with InsightVM and grow into the platform as exposure + detection consolidation becomes a goal.",
      },
    ],
  },

  "microsoft-defender-vm": {
    slug: "microsoft-defender-vm",
    name: "Microsoft Defender Vulnerability Management",
    logo: "/logos/MicrosoftDefender.webp",
    tagline: "Bundled with Defender for Endpoint P2 / M365 E5, endpoint-telemetry-driven VM with Defender XDR integration",
    bestFor: "Bundled in M365 E5 · Best Value Inside Microsoft Estate",
    description:
      "Microsoft Defender Vulnerability Management (MDVM) is bundled with Defender for Endpoint (P2) and Microsoft 365 E5. Continuous discovery and risk-based vulnerability management are driven by endpoint telemetry, with tight Intune and Defender XDR integration. Threat & Exposure Score provides executive reporting on Microsoft-estate exposure. For UAE customers already on E5 with Microsoft-centric estates, MDVM delivers core VM at zero or near-zero incremental licence cost. Most regulated buyers pair MDVM with Tripwire for FIM/SCM coverage and Tenable for non-Microsoft asset depth.",
    keyStats: [
      { label: "Bundling", value: "Included in Defender for Endpoint P2 / M365 E5" },
      { label: "Discovery", value: "Endpoint-telemetry-driven, no separate scanner" },
      { label: "Integration", value: "Native Intune + Defender XDR + Sentinel" },
      { label: "Best for", value: "Microsoft-centric estates already on E5" },
    ],
    strengths: [
      {
        tag: "E5 economics",
        icon: "barChart",
        tone: "emerald",
        title: "Zero or near-zero incremental licence cost",
        desc: "If you are already on Microsoft 365 E5 or Defender for Endpoint P2, MDVM is bundled. No additional vendor relationship, no separate scanner infrastructure, no parallel licence procurement.",
      },
      {
        tag: "Endpoint-driven",
        icon: "monitor",
        tone: "violet",
        title: "Continuous discovery from endpoint telemetry",
        desc: "MDVM uses Defender for Endpoint telemetry rather than separate network scanners. Continuous, agentless-by-design discovery for endpoints already onboarded into Defender. Zero scan-window planning required.",
      },
      {
        tag: "Defender XDR",
        icon: "layers",
        tone: "sky",
        title: "Unified XDR + VM correlation",
        desc: "MDVM findings correlate natively with Defender for Endpoint, Defender for Identity, Defender for Office 365 and MCAS in the Defender XDR plane. Vulnerability exposure and active threat detection share one investigation surface.",
      },
      {
        tag: "Intune integration",
        icon: "list",
        tone: "amber",
        title: "Native remediation through Intune workflows",
        desc: "Critical findings flow directly into Intune-driven remediation workflows. Patch deployment, configuration baselines and security configuration drift are addressed from the same console as discovery, reducing time to remediation.",
      },
      {
        tag: "Threat & Exposure Score",
        icon: "activity",
        tone: "rose",
        title: "Executive-layer Microsoft-estate exposure scoring",
        desc: "Threat & Exposure Score is the Microsoft equivalent of TruRisk / Real Risk, a single number for executive reporting on Microsoft-estate vulnerability posture. Useful at the board layer for E5-funded organisations.",
      },
    ],
    watchOuts: [
      {
        title: "Weaker on non-Microsoft assets",
        desc: "MDVM is endpoint-telemetry-driven via Defender for Endpoint. For estates with significant non-Microsoft assets (Linux, network devices, legacy systems not in Defender), coverage gaps emerge. Most regulated buyers pair MDVM with Tenable or Qualys for non-Microsoft asset depth.",
      },
      {
        title: "No File Integrity Monitoring or Security Configuration Management",
        desc: "MDVM does not cover FIM or SCM at audit-grade depth. For PCI-DSS, NESA or NCA ECC compliance requiring FIM evidence, Fortra Tripwire is typically the right pairing.",
      },
      {
        title: "Weak on OT / ICS",
        desc: "Operational technology coverage is not a Defender strength. UAE energy, utilities and manufacturing estates with OT scope should pair MDVM with Tenable OT Security or Tripwire Industrial Visibility.",
      },
      {
        title: "Requires Defender for Endpoint P2",
        desc: "MDVM features depend on Defender for Endpoint P2 licensing (bundled inside M365 E5). E3 / Business Premium customers must upgrade or add the standalone MDVM SKU separately.",
      },
    ],
    bestFitProfile: [
      "UAE customers already on Microsoft 365 E5 or Defender for Endpoint P2",
      "Microsoft-centric estates with M365, Intune and Defender XDR in production",
      "Buyers wanting bundled VM at zero incremental licence cost",
      "Organisations using Intune for endpoint management and patch orchestration",
      "Customers pairing MDVM with Tripwire (FIM) and Tenable (non-Microsoft) for full coverage",
      "SME and mid-market customers without dedicated VM engineers",
      "Government and educational institutions standardised on the Microsoft stack",
    ],
    products: [
      { model: "Microsoft Defender Vulnerability Management (bundled in E5 / Defender P2)", segment: "Bundled VM", role: "Continuous endpoint-driven VM with Defender XDR correlation" },
      { model: "Microsoft Defender for Endpoint P2", segment: "EDR + VM", role: "Required licence for MDVM features" },
      { model: "Microsoft Intune", segment: "Endpoint mgmt", role: "Native remediation and patch orchestration tied to MDVM findings" },
      { model: "Microsoft Defender XDR", segment: "XDR", role: "Unified Endpoint + Identity + Email + Cloud Apps correlation with MDVM" },
      { model: "Microsoft Sentinel (companion)", segment: "SIEM", role: "Optional SIEM correlation for advanced exposure reporting" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Microsoft Defender Vulnerability Management for UAE customers already invested in M365 E5 or Defender for Endpoint P2. Our team covers MDVM deployment, Intune-driven remediation workflows, Defender XDR correlation and executive Threat & Exposure Score baselines. We are equally honest about scope: for FIM / SCM, OT / ICS or non-Microsoft asset depth, we recommend pairing MDVM with Tripwire, Tenable or Sophos Managed Risk depending on the audit and operational picture.",
    faqs: [
      {
        question: "Is MDVM enough on its own?",
        answer:
          "For Microsoft-centric estates without significant non-Microsoft assets, FIM/SCM requirements or OT scope, often yes, especially when M365 E5 is already on contract. For UAE banks, ministries and regulated multi-vendor estates, MDVM is typically paired with Tripwire (FIM / SCM / compliance), Tenable (non-Microsoft scanner depth) or Sophos Managed Risk (managed delivery).",
      },
      {
        question: "Do we need Defender for Endpoint P2 for MDVM?",
        answer:
          "Yes for full capability. MDVM is gated by Defender for Endpoint P2 (bundled in M365 E5). E3 / Business Premium customers must upgrade or buy Defender for Endpoint P2 separately. Standalone MDVM SKU is also available for non-Microsoft customers but rarely the most economical path.",
      },
      {
        question: "How does MDVM compare to Qualys VMDR?",
        answer:
          "MDVM is endpoint-telemetry-driven and bundled in E5. Qualys VMDR is scanner-led with broader asset coverage plus bundled patch and policy compliance. For Microsoft-centric estates already on E5, MDVM is usually the right value answer; for multi-vendor estates or organisations needing bundled patch and broad compliance evidence, Qualys typically wins.",
      },
      {
        question: "Can MDVM cover OT environments?",
        answer:
          "Not well. MDVM is Microsoft-endpoint-centric. UAE customers with OT / ICS scope should pair MDVM with Tenable OT Security, Tripwire Industrial Visibility or Microsoft Defender for IoT for proper operational technology coverage.",
      },
    ],
  },

  mandiant: {
    slug: "mandiant",
    name: "Mandiant (Google Cloud)",
    logo: "/logos/Mandiant.png",
    tagline: "The world's most prestigious incident response and threat intelligence firm, elite red team operations and frontline attack expertise, now part of Google Cloud",
    bestFor: "Premium Tier · Frontline Attack Expertise · Nation-State Threat Intelligence",
    description:
      "Mandiant, now part of Google Cloud, is the world's most prestigious incident response and threat intelligence firm, the team behind SolarWinds, Sony Pictures and dozens of nation-state breach investigations. Red Team Operations emulate real adversary TTPs. Threat Intelligence tracks 4,000+ threat actors. Attack Surface Management is bundled. For UAE customers at the very high end of the offensive-security and threat-intelligence market, large enterprises, critical national infrastructure, central banks and government, Mandiant is the elite-tier benchmark. Engagement costs reflect the positioning.",
    keyStats: [
      { label: "Heritage", value: "World's most prestigious IR and threat-intel firm" },
      { label: "Investigations", value: "SolarWinds, Sony Pictures, and dozens of nation-state cases" },
      { label: "Threat tracking", value: "4,000+ named threat actors monitored" },
      { label: "Pricing tier", value: "Premium, engagements typically USD 50,000+ to hundreds of thousands" },
    ],
    strengths: [
      {
        tag: "Frontline IR",
        icon: "shield",
        tone: "emerald",
        title: "Behind the most high-profile breach investigations",
        desc: "Mandiant has led the response to many of the most significant cybersecurity incidents in history, SolarWinds, Sony Pictures and numerous nation-state campaigns. Frontline experience with real adversary TTPs informs everything the firm delivers, from red team operations to threat intelligence.",
      },
      {
        tag: "Red Team Operations",
        icon: "activity",
        tone: "violet",
        title: "Elite emulation of real adversary TTPs",
        desc: "Red Team Operations emulate real threat actors, not generic CVE-led pentesting. Operators are former government offensive operators, frontline IR responders and elite tier-1 penetration testers. The result is testing that mirrors what an actual adversary would do, including OPSEC and dwell-time tactics.",
      },
      {
        tag: "Threat Intelligence",
        icon: "eye",
        tone: "sky",
        title: "4,000+ tracked threat actors with attribution depth",
        desc: "Mandiant Threat Intelligence tracks 4,000+ named threat actors with attribution and TTP detail few peers match. Intelligence is informed by Mandiant's frontline IR engagements, which means TTPs are observed in the wild, not reported second-hand.",
      },
      {
        tag: "Attack Surface Mgmt",
        icon: "globe",
        tone: "amber",
        title: "Mandiant ASM continuously monitors external exposure",
        desc: "Mandiant Attack Surface Management discovers and monitors external exposure, exposed services, shadow IT, supply chain risk and brand impersonation. Integrated with threat intelligence so adversary-relevant exposure is prioritised.",
      },
      {
        tag: "Google Cloud heritage",
        icon: "layers",
        tone: "rose",
        title: "Now part of Google Cloud Security",
        desc: "Following the Google acquisition, Mandiant integrates with Google Chronicle / SecOps, Google Threat Intelligence and the wider Google Cloud Security portfolio. Useful for customers consolidating offensive security plus SOC operations within the Google ecosystem.",
      },
      {
        tag: "Tabletop + IR retainer",
        icon: "phone",
        tone: "slate",
        title: "Tabletop exercises and IR retainers for elite preparation",
        desc: "Mandiant offers executive tabletop exercises, IR readiness assessments and contractual IR retainers for the largest enterprises. Critical national infrastructure customers commonly pre-position Mandiant retainers before an incident occurs.",
      },
    ],
    watchOuts: [
      {
        title: "Most expensive VAPT and advisory provider in the market",
        desc: "Mandiant engagements typically start at USD 50,000+ and scale to hundreds of thousands for full red team operations. For most UAE mid-market organisations, the budget required is hard to justify versus Sophos Advisory Services or other tier-2 offensive providers that deliver comparable testing at a fraction of the cost.",
      },
      {
        title: "Best suited to elite-tier buyers",
        desc: "Mandiant's strongest fit is critical national infrastructure, central banks, the largest financial institutions and government bodies where the stakes and budgets justify elite-tier expertise. For mainstream enterprise red teaming, Sophos Advisory Services or specialist regional firms typically deliver better value.",
      },
      {
        title: "Engagement scheduling and access",
        desc: "Mandiant's elite-tier operators are in high global demand. Engagement scheduling for major red team operations or IR retainers can require lead time. Pre-positioning a retainer relationship before an incident is the typical pattern for high-value targets.",
      },
    ],
    bestFitProfile: [
      "UAE critical national infrastructure operators (energy, utilities, telecoms, transport)",
      "Central banks, sovereign wealth funds and the largest financial institutions",
      "Government bodies, ministries of defence and national security agencies",
      "Large enterprises where a breach would carry national-level consequences",
      "Customers needing emulation of nation-state TTPs and APT-grade red teaming",
      "Organisations consolidating offensive security with Google Cloud Security stack",
      "Buyers pre-positioning IR retainers for high-stakes pre-incident readiness",
    ],
    products: [
      { model: "Mandiant Red Team Operations", segment: "Offensive testing", role: "Elite adversary-emulation red team operations" },
      { model: "Mandiant Threat Intelligence", segment: "Intel", role: "4,000+ threat actor tracking and attribution intelligence" },
      { model: "Mandiant Attack Surface Management", segment: "ASM", role: "Continuous external attack surface discovery and monitoring" },
      { model: "Mandiant Incident Response", segment: "IR", role: "Frontline breach investigation and response engagements" },
      { model: "Mandiant IR Retainer", segment: "Readiness", role: "Pre-positioned contractual IR retainer for high-value targets" },
      { model: "Mandiant Tabletop Exercises", segment: "Readiness", role: "Executive and operational tabletop exercises" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Mandiant engagements for UAE critical national infrastructure, central banks, large enterprises and government bodies where the stakes justify elite-tier offensive security and threat intelligence. Our team coordinates Mandiant Red Team Operations, IR retainers, ASM baselines and tabletop exercises. We are equally honest about positioning, for mainstream enterprise red teaming where Mandiant's premium pricing isn't justified, we recommend Sophos Advisory Services as the cost-effective intelligence-led alternative.",
    faqs: [
      {
        question: "When does Mandiant win over Sophos Advisory Services?",
        answer:
          "When the stakes and budget justify elite-tier nation-state-grade red team operations and threat intelligence, critical national infrastructure, central banks, sovereign wealth funds, government and the largest enterprises. Mandiant engagements typically start at USD 50,000+ and scale into hundreds of thousands. For most mainstream UAE enterprises, Sophos Advisory Services delivers comparable intelligence-led testing at a fraction of the cost.",
      },
      {
        question: "What does a Mandiant IR retainer cover?",
        answer:
          "An IR retainer pre-positions a contractual relationship with Mandiant for incident response. When an incident occurs, Mandiant operators engage immediately rather than waiting for procurement. Critical for UAE customers where post-incident time-to-engagement is measured in hours, not days. Retainer fees buy reserved capacity even when unused.",
      },
      {
        question: "Is Mandiant still independent after the Google acquisition?",
        answer:
          "Mandiant operates as part of Google Cloud Security but maintains its operational identity and engagement model. Threat intelligence and IR practices continue; integrations with Google Chronicle / SecOps strengthen for customers consolidating on the Google ecosystem. Engagement quality and operator caliber have not changed post-acquisition.",
      },
      {
        question: "How long does a typical Mandiant red team engagement take?",
        answer:
          "Most red team operations run 6 to 12 weeks of active engagement plus reporting. Pre-engagement scoping adds 4 to 8 weeks. Total elapsed time from procurement to delivered report is typically 3 to 6 months. Scheduling lead time should be planned, particularly for ministry-scale or critical-infrastructure engagements.",
      },
    ],
  },
};
