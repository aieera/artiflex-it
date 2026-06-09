export type FirewallVendor = {
  slug: string;
  name: string;
  logo: string;
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

  /** "What is X" intro section: glass body + dark feature card + capability tiles. */
  whatIs?: {
    eyebrow: string;
    titlePrefix: string;
    titleHighlight: string;
    bodyParagraphs: string[];
    feature: { titleLine1: string; titleLine2: string; body: string };
    capabilities: string[];
  };

  /** Deployment Options section (hardware / virtual / public cloud). */
  deploymentOptions?: {
    eyebrow?: string;
    title: string;
    intro: string;
    options: Array<{ icon: "hardware" | "virtual" | "cloud"; title: string; body: string }>;
  };
};

export const firewallVendors: Record<string, FirewallVendor> = {
  "sophos-xgs": {
    slug: "sophos-xgs",
    name: "Sophos XGS",
    logo: "/logos/sophos.svg",
    tagline: "Best-in-class TLS 1.3 inspection with single-pane operations",
    bestFor: "Best Overall Value (Recommended)",
    description:
      "Sophos XGS combines Astaro's German UTM heritage with Cyberoam's identity-aware policy engine and Sophos's Synchronized Security automation. The Xstream architecture inspects TLS 1.3 traffic at line rate without crippling throughput, a problem that catches most other vendors at decryption scale. For UAE mid-market and enterprise environments, XGS regularly delivers the best balance of prevention, manageability, and total cost of ownership.",
    keyStats: [],
    whyWinsIntro: {
      label: "Sophos Firewall Highlights",
      title: "A firewall built for how threats actually move today",
      description:
        "Most firewalls force you to choose between full inspection and full speed. The XGS does both, and then closes the gap between your firewall and your endpoints automatically.",
      stats: [
        { value: "100%", label: "HTTPS traffic inspected without throughput penalty", tone: "emerald" },
        { value: "Seconds", label: "to automatic host isolation on endpoint compromise", tone: "violet" },
        { value: "1 console", label: "for firewall, endpoint, email, MDR, Wi-Fi and workspace", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Xstream FastPath",
        icon: "shield",
        title: "TLS 1.3 inspection at line rate",
        desc: "Most NGFWs drop 60-80% of throughput the moment TLS inspection is enabled. Sophos offloads decryption into hardware-accelerated streams, so you inspect 100% of HTTPS traffic without needing a unit two sizes larger.",
      },
      {
        tag: "Security Heartbeat",
        icon: "heartbeat",
        title: "Synchronized security automation",
        desc: "When a Sophos endpoint detects a compromise, the firewall isolates that host from the network automatically, no SOAR playbook, no manual ticket. Lateral movement is closed in seconds, not hours.",
      },
      {
        tag: "Layer 8 identity",
        icon: "users",
        title: "Policies that follow the user, not the IP",
        desc: "Inherited from Cyberoam, every policy decision is tied to a user identity. Policies follow people across BYOD, VPN, and remote work, no rewrites when someone changes desks, devices, or locations.",
      },
      {
        tag: "Sophos Central",
        icon: "monitor",
        title: "One console for your entire security stack",
        desc: "Firewall, endpoints, email, MDR, Wi-Fi and workspace protection, managed from a single cloud console with one credential and one alert pipeline. For lean IT teams, this replaces three or four vendor portals overnight.",
      },
      {
        tag: "RED appliances",
        icon: "server",
        title: "Branch sites with zero on-site IT",
        desc: "Sophos RED devices ship pre-configured and tunnel all branch traffic to your central XGS. Plug it in, and the same identity-based policies as HQ are instantly enforced, no local IT, no per-site licensing, no extra console.",
      },
      {
        tag: "NDR Essentials",
        icon: "eye",
        title: "Network detection built in, at no extra cost",
        desc: "NDR Essentials is included with every XGS. It monitors east-west and outbound traffic for lateral movement, C2 beacons, and slow-burn data exfiltration, the threats perimeter rules never catch, and surfaces them directly in Sophos Central.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "UAE mid-market companies (10–5,000 staff) that want enterprise NGFW capability without enterprise complexity",
      "Existing Sophos endpoint customers who want to activate Synchronized Security automation",
      "Lean IT teams that benefit from a single cloud console rather than four vendor portals",
      "Organisations with high TLS-inspection requirements (compliance, DLP, ransomware C2 detection)",
      "SMBs and branch offices needing zero-touch deployment via Sophos Central",
      "Organizations having small branches looking for one time site-to-site VPN solutions can consider RED Appliances",
      "Organizations that require extra visibility of the network and basic NDR functionality",
      "Organizations who have multiple IPSEC or SSL VPN requirement",
      "Organizations who require free in-depth and detailed reporting within appliances itself"
    ],
    products: [
      { model: "XGS 88 / 108", segment: "SOHO / branch", role: "Up to 50 users" },
      { model: "XGS 118 / 128 / 138", segment: "Small office", role: "50–250 users" },
      { model: "XGS 2100 / 3100", segment: "Mid-market", role: "250–1,500 users" },
      { model: "XGS 4100 / 4500 / 5500", segment: "Enterprise", role: "1,500–5,000 users" },
      { model: "XGS 6500 / 7500 / 8500", segment: "Large enterprise / DC", role: "5,000+ users, multi-Gbps inspection" },
    ],
    whyArtiflex:
      "Artiflex IT is a Sophos Platinum Partner, the highest tier in Sophos's UAE channel. We deliver XGS deployments end-to-end across the UAE, Oman, and Saudi Arabia: assessment, sizing, HA cluster design, identity integration with Active Directory or Azure AD, SD-WAN setup, and ongoing managed firewall services. Platinum status means escalations land directly with Sophos engineering and we have access to advance product roadmaps.",
    faqs: [
      {
        question: "How does Sophos XGS compare to Sophos XG (the previous generation)?",
        answer:
          "XGS is a hardware refresh with the Xstream FastPath architecture, purpose-built for TLS 1.3 inspection at line rate. If you're on XG hardware approaching end-of-support, the migration path is direct: configurations port forward, and Sophos Central manages both during cutover. Expect 2 to 4 times the inspected-throughput at the same price point.",
      },
      {
        question: "Can Sophos XGS replace a UTM?",
        answer:
          "Yes. Every UTM capability (firewall, IPS, antivirus, web filtering, application control, VPN, anti-spam) is built into XGS, plus modern NGFW additions like App Control, User-ID, Layer 7 inspection, and integrated Sandstorm sandboxing. A 5+ year old UTM migration to XGS typically pays back within 18 months.",
      },
      {
        question: "What is the typical lead time for XGS deployment in the UAE?",
        answer:
          "Standard deployments (assessment, design, deployment, cutover) run 2 to 4 weeks for single-site mid-market environments. Multi-site HA pairs with SD-WAN integration typically run 4 to 8 weeks. Hardware is in stock locally with our Sophos distribution; no 12-week APAC lead times.",
      },
      {
        question: "Does XGS integrate with existing Cisco ISE / Microsoft Intune environments?",
        answer:
          "Yes. XGS speaks RADIUS, SAML, and SCIM and supports STAS/Heartbeat for live identity. AD, Azure AD, Okta, and Intune integrations are standard. We've deployed XGS into mixed-vendor environments across UAE banking, healthcare, and retail without identity-layer compromises.",
      },
    ],
    whatIs: {
      eyebrow: "What is Sophos XGS",
      titlePrefix: "Network protection built for ",
      titleHighlight: "modern threats",
      bodyParagraphs: [
        "The Sophos XGS Series is the next-generation firewall platform engineered to deliver dramatically higher performance, deeper visibility, and stronger threat protection than any previous generation. With Xstream Architecture and dedicated Xstream Flow Processors, XGS firewalls accelerate trusted application traffic while inspecting risky traffic at line rate.",
        "From single-site SMBs to multi-branch enterprise networks, XGS scales across 15+ appliance models, all managed through a single cloud console with built-in Synchronized Security that talks directly to Sophos endpoints.",
      ],
      feature: {
        titleLine1: "Xstream",
        titleLine2: "Architecture",
        body: "Purpose-built flow processors offload trusted traffic so the CPU focuses entirely on threat detection, without sacrificing performance.",
      },
      capabilities: [
        "Industry-leading TLS 1.3 deep-packet inspection",
        "Hardware-accelerated SD-WAN and IPsec VPN",
        "Zero-day threat protection with deep learning AI",
        "Automatic threat response via Security Heartbeat",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Hardware, virtual, or cloud: your call.",
      intro: "Artiflex deploys XGS in whichever form factor fits your infrastructure strategy.",
      options: [
        { icon: "hardware", title: "Hardware Appliance", body: "Purpose-built XGS appliances with dedicated flow processors. Ideal for on-premise networks with predictable throughput needs." },
        { icon: "virtual", title: "Virtual (VM)", body: "Deploy XGS as a virtual firewall on VMware ESXi, Hyper-V, KVM, or Xen. Perfect for virtualized data centers." },
        { icon: "cloud", title: "Public Cloud", body: "Launch XGS in AWS, Azure, or GCP to protect cloud workloads with the same console and policies as your on-prem firewall." },
      ],
    },
  },

  "check-point-quantum": {
    slug: "check-point-quantum",
    name: "Check Point Quantum",
    logo: "/logos/Check-Point-2024-logo-color.svg",
    tagline: "Industry-leading threat prevention powered by ThreatCloud AI",
    bestFor: "Best for Enterprise Threat Prevention (Recommended)",
    description:
      "Check Point Quantum gateways are built on more than three decades of firewall engineering, paired with ThreatCloud AI, the world's most cited threat intelligence service. The Quantum Titan release brings AI-powered DNS, phishing, and IoT defenses, and Maestro hyperscale orchestration lets a single logical gateway scale to terabit throughput. For UAE enterprises, banks, and regulated industries that need the absolute highest catch rate and a unified Infinity management plane, Quantum is the gold standard.",
    keyStats: [],
    whyWinsIntro: {
      label: "Check Point Quantum Highlights",
      title: "Enterprise-grade prevention. At every scale.",
      description:
        "Check Point Quantum doesn't just detect threats, it prevents them before they land, at throughputs ranging from branch office to hyperscale data centre, all from a single unified policy framework.",
      stats: [
        { value: "99.9%", label: "Malware file prevention rate", tone: "emerald" },
        { value: "450 Mbps to 1 Tbps", label: "Threat prevention throughput range across appliance tiers", tone: "violet" },
        { value: "10+", label: "Integrated threat prevention engines in a single blade", tone: "sky" },
      ],
      outro:
        "Check Point Quantum is consistently rated a Leader in the Gartner Magic Quadrant for Network Firewalls. Every capability is available under a unified management framework, no vendor bolted together through acquisition, no feature gaps between modules.",
    },
    strengths: [
      {
        tag: "Threat Prevention",
        icon: "shield",
        tone: "emerald",
        title: "The most complete prevention stack in a single platform",
        desc: "Firewall, application control, URL filtering, IPS, antivirus, anti-bot, and anti-spam are all built in. No third-party modules, no separate consoles, every layer of prevention is active from day one.",
      },
      {
        tag: "Policy Layers",
        icon: "layers",
        tone: "violet",
        title: "Policy segmentation that simplifies complex environments",
        desc: "Layered policy architecture allows different teams to manage their own segments without touching each other's rules. Delegation becomes clean, auditable, and safe, reducing human error in large multi-admin environments.",
      },
      {
        tag: "AI Prevention",
        icon: "activity",
        tone: "sky",
        title: "Autonomous threat prevention, no analyst required",
        desc: "ThreatCloud AI continuously updates prevention verdicts across all Quantum gateways globally. New threat intelligence propagates automatically, so your perimeter hardens in real time without waiting for a signature update cycle.",
      },
      {
        tag: "Mobile Management",
        icon: "phone",
        tone: "amber",
        title: "Manage and monitor your network from anywhere",
        desc: "The Check Point mobile app gives administrators real-time network status, policy visibility, and alert notifications on the go, so a critical event never waits until someone is back at their desk.",
      },
      {
        tag: "Email & URL Security",
        icon: "mail",
        tone: "rose",
        title: "Threat emulation and click-time URL protection",
        desc: "Emails are sandboxed before delivery. URLs are rewritten and evaluated at click time, so even a link that was clean at receipt is blocked the moment it turns malicious.",
      },
      {
        tag: "Threat Extraction",
        icon: "file",
        tone: "slate",
        title: "Instant, risk-free file downloads",
        desc: "Rather than holding files for sandbox analysis, Threat Extraction reconstructs and delivers a clean, sanitised version of the document instantly. Users get their file immediately, with all active content and exploits stripped out.",
      },
      {
        tag: "Unified Management",
        icon: "list",
        tone: "emerald",
        title: "One rule base, one log view, less time troubleshooting",
        desc: "A unified rule base and unified log view means policy deployment, maintenance, and incident investigation all happen in one place. No context-switching between tools, no fragmented audit trails.",
      },
      {
        tag: "Hyperscale",
        icon: "server",
        tone: "violet",
        title: "From 450 Mbps to 1 Tbps: one platform, every tier",
        desc: "Quantum appliances scale from branch-office throughput right up to hyperscale data centre performance, all running the same OS, the same policy model, and the same management console.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "Banks, insurers, and regulated enterprises that need the highest independently-verified prevention rates",
      "UAE government, semi-government, and critical national infrastructure operators",
      "Large enterprises and data centers needing hyperscale (40 Gbps to 1.5 Tbps) inspection",
      "Organizations already running Check Point Harmony, CloudGuard, or Infinity SOC who want a unified estate",
      "Buyers willing to invest more for top-tier prevention and willing to staff a dedicated firewall function",
      "Multi-site enterprises that need a single policy plane (Infinity) across HQ, branches, and clouds",
      "OT and IoT-heavy environments that benefit from Titan's autonomous IoT discovery",
    ],
    products: [
      { model: "Quantum Spark 1535 / 1555", segment: "SOHO / branch", role: "Up to 50 users" },
      { model: "Quantum Spark 1575 / 1595", segment: "Small office", role: "50 to 200 users" },
      { model: "Quantum Force 9200 / 9300", segment: "Mid-market", role: "200 to 1,500 users" },
      { model: "Quantum Force 19000 / 19100", segment: "Enterprise", role: "1,500 to 5,000 users" },
      { model: "Quantum Force 26000 / 28000", segment: "Large enterprise / DC", role: "5,000+ users, multi-Gbps inspection" },
      { model: "Quantum Lightspeed / Maestro", segment: "Hyperscale / DC", role: "Terabit-class throughput, multi-DC clusters" },
    ],
    whyArtiflex:
      "Artiflex IT is a Check Point Certified Partner serving the UAE, Oman, and Saudi Arabia. Our engineers are CCSA and CCSE certified, with hands-on experience deploying Maestro clusters, Infinity Portal, and multi-domain Smart Console environments for banking and government customers. We deliver Quantum end-to-end: architecture review, sizing against your real inspected throughput, HA deployment, identity integration, and 24x7 managed services.",
    faqs: [
      {
        question: "How does Check Point Quantum compare to Sophos XGS or Palo Alto?",
        answer:
          "Check Point typically wins on raw prevention catch rate in independent testing, especially on zero-day and evasive malware. Palo Alto wins on App-ID granularity and Cortex integration. Sophos wins on price-performance for mid-market and on Synchronized Security with endpoints. We size all three for shortlist customers and recommend on inspected throughput, prevention scores, and total cost of ownership over five years.",
      },
      {
        question: "Is Check Point Infinity the same as Quantum?",
        answer:
          "No. Infinity is the overarching architecture and licensing model covering Quantum (network), CloudGuard (cloud), Harmony (endpoint and email), and Horizon (SOC). Quantum is the network gateway pillar of Infinity. You can buy Quantum standalone and add Infinity later.",
      },
      {
        question: "Can Quantum be deployed in Azure, AWS, or GCP?",
        answer:
          "Yes. CloudGuard Network Security (the cloud form factor of Quantum) is available across AWS, Azure, GCP, OCI, and Alibaba Cloud, with the same policy engine and Smart Console. We deploy hybrid Quantum / CloudGuard estates with consistent Layer 7 policy across on-prem and cloud.",
      },
      {
        question: "What is the typical Quantum deployment lead time in the UAE?",
        answer:
          "Standard single-site deployments run three to six weeks. Maestro hyperscale and multi-domain Smart Console rollouts for banks and large enterprises typically run six to twelve weeks. Hardware is available locally through our Check Point distribution; we hold demo units of Spark and Force gateways for proof of concept.",
      },
    ],
    whatIs: {
      eyebrow: "What is Check Point Quantum",
      titlePrefix: "Enterprise-grade prevention, not ",
      titleHighlight: "detection",
      bodyParagraphs: [
        "Check Point Quantum is the next-generation gateway platform engineered around a prevention-first philosophy: block threats before they reach your network, rather than detecting them after the fact. Every gateway is powered by ThreatCloud AI, which correlates over 2 billion daily security indicators across 150,000+ customers, and applies 60+ AI engines to traffic in real time.",
        "From small branch offices to hyperscale data centers, Quantum scales across the full appliance family, all managed through Check Point Infinity Portal with consolidated policy across network, cloud, mobile, and endpoint.",
      ],
      feature: {
        titleLine1: "Infinity",
        titleLine2: "Architecture",
        body: "Unified prevention across network, cloud, endpoint, mobile, and IoT with one policy engine and one threat intelligence feed, eliminating gaps between products.",
      },
      capabilities: [
        "ThreatCloud AI with 60+ AI/ML engines and shared global telemetry",
        "Maestro hyperscale orchestrator: scale a logical gateway to 1.5+ Tbps",
        "SandBlast Zero-Day Protection: CPU-level exploit detection",
        "Quantum Titan AI engines for DNS, phishing, and IoT autonomous defense",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Hardware, virtual, or cloud: your call.",
      intro: "Artiflex deploys Check Point Quantum in whichever form factor fits your infrastructure strategy.",
      options: [
        { icon: "hardware", title: "Hardware Appliance", body: "Purpose-built Check Point Quantum appliances with dedicated security processors. Ideal for on-premise networks with predictable throughput needs." },
        { icon: "virtual", title: "Virtual (VM)", body: "Deploy Check Point Quantum as a virtual firewall on VMware ESXi, Hyper-V, KVM, or Nutanix AHV. Perfect for virtualized data centers." },
        { icon: "cloud", title: "Public Cloud", body: "Launch Check Point Quantum in AWS, Azure, or GCP to protect cloud workloads with the same console and policies as your on-prem firewall." },
      ],
    },
  },

  "palo-alto-networks": {
    slug: "palo-alto-networks",
    name: "Palo Alto PA-Series",
    logo: "/logos/PaloAltoNetworks.svg",
    tagline: "App-ID, User-ID, and Precision AI for inline threat prevention",
    bestFor: "Best for ML-Powered Threat Prevention (Recommended)",
    description:
      "Palo Alto Networks invented the NGFW category with App-ID, the application-aware policy engine that looks past port and protocol to identify the actual application on the wire. The PA-Series Strata platform now extends that lineage with Precision AI, inline machine learning that blocks unknown malware, zero-day exploits, and AI-generated phishing in real time, not after analysis. For UAE organizations standardizing on a single security platform across firewall, SASE, and XDR, Palo Alto Networks is the premium choice.",
    keyStats: [],
    whyWinsIntro: {
      label: "Palo Alto Networks PA-Series Highlights",
      title: "Engineered to see more, scan once, and stop everything.",
      description:
        "Palo Alto Networks pioneered the application-aware firewall. Its single-pass architecture, deep cloud intelligence, and native SASE integration make it one of the most capable platforms for enterprises that demand performance without security trade-offs.",
      stats: [
        { value: "1 Pass", label: "Traffic scanned once for app, user, and content simultaneously", tone: "emerald" },
        { value: "3 Engines", label: "App-ID, User-ID, Content-ID running in parallel, not sequentially", tone: "violet" },
        { value: "Real-time", label: "WildFire zero-day intelligence shared globally within minutes", tone: "sky" },
      ],
      outro:
        "Palo Alto Networks NGFW has been a Gartner Magic Quadrant Leader for over a decade. Its architecture was purpose-built for application awareness, an approach that has since been widely imitated but rarely matched at the same depth.",
    },
    strengths: [
      {
        tag: "SP3 Architecture",
        icon: "server",
        tone: "emerald",
        title: "Single-pass processing: one scan, full security",
        desc: "App-ID, User-ID, and Content-ID all run in a single pass through dedicated hardware. Traffic is inspected once, not handed off between sequential engines, resulting in lower latency and consistent throughput even under heavy security load.",
      },
      {
        tag: "App-ID",
        icon: "shield",
        tone: "violet",
        title: "Identify any application, regardless of port or protocol",
        desc: "App-ID classifies Zoom, Teams, WhatsApp, and thousands of other applications even when they run on non-standard ports or use evasion techniques. Port-based rules are no longer enough; App-ID closes the gap traditional firewalls leave open.",
      },
      {
        tag: "User-ID",
        icon: "users",
        tone: "sky",
        title: "Policies tied to users and groups, not IP addresses",
        desc: "Deep Active Directory integration means every policy decision is anchored to a user identity. Policies follow people across VPN, hybrid work, and BYOD, no rule rewrites when someone changes location or device.",
      },
      {
        tag: "Threat Prevention",
        icon: "lock",
        tone: "amber",
        title: "Inline IPS, anti-malware, and DNS security in one engine",
        desc: "Advanced Threat Prevention combines inline IPS, anti-malware, and DNS security, all powered by WildFire cloud intelligence. Zero-day threats detected anywhere in the global Palo Alto network are blocked everywhere within minutes.",
      },
      {
        tag: "WildFire",
        icon: "globe",
        tone: "rose",
        title: "Cloud sandbox with global, near-real-time intelligence",
        desc: "Unknown files are detonated in WildFire's cloud sandbox. Verdicts are shared across the entire Palo Alto customer base in near real time, so a zero-day found in one organisation's network becomes a blocked threat in every other within minutes.",
      },
      {
        tag: "Granular Policy",
        icon: "sliders",
        tone: "slate",
        title: "Control by application, user, content, and device simultaneously",
        desc: "Policy decisions consider application identity, user identity, content type, and device posture all at once. This level of granularity goes far beyond traditional allow/deny rules, enabling precise access control without overly broad exceptions.",
      },
      {
        tag: "Prisma SASE",
        icon: "layers",
        tone: "emerald",
        title: "Native SASE: firewall, VPN, CASB, and ZTNA unified",
        desc: "Prisma Access extends the same NGFW policies to remote users and branch sites natively, not through a bolt-on integration. ZTNA, CASB, and cloud-delivered firewall are part of the same platform, making Palo Alto a full cloud security architecture.",
      },
      {
        tag: "ACC Visibility",
        icon: "barChart",
        tone: "violet",
        title: "Application Command Center: SOC-grade traffic intelligence",
        desc: "The Application Command Center gives security teams deep, real-time visibility into traffic behaviour, threat patterns, and user activity, all in one dashboard. For SOC teams, this replaces hours of log parsing with immediate, actionable context.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "Large enterprises and regulated industries that prioritize prevention quality and Layer 7 granularity",
      "Organizations standardizing on a single security platform across firewall, SASE, and XDR",
      "Customers already using Cortex XDR or Prisma Access who want unified policy and telemetry",
      "Data center and high-bandwidth environments needing 100 Gbps+ inspected throughput",
      "Security teams that have the budget and headcount to fully utilize App-ID and Cloud-Delivered Security Services",
      "Mature security operations centers that integrate with Panorama, Cortex XSOAR, or Strata Cloud Manager",
      "UAE enterprises building a long-term Zero Trust architecture and looking for a strategic platform vendor",
    ],
    products: [
      { model: "PA-410 / PA-415", segment: "SOHO / branch", role: "Up to 50 users" },
      { model: "PA-440 / PA-450 / PA-460", segment: "Small office", role: "50 to 250 users" },
      { model: "PA-1410 / PA-1420", segment: "Mid-market", role: "250 to 1,500 users" },
      { model: "PA-3410 / PA-3420 / PA-3440", segment: "Enterprise", role: "1,500 to 5,000 users" },
      { model: "PA-5410 / PA-5420 / PA-5440", segment: "Large enterprise / DC", role: "5,000+ users, multi-Gbps inspection" },
      { model: "PA-5450 / PA-7050 / PA-7080", segment: "Service provider / DC", role: "High-density chassis, up to 245 Gbps threat prevention" },
    ],
    whyArtiflex:
      "Artiflex IT is a Palo Alto Networks NextWave Partner with PCNSE-certified engineers delivering across the UAE, Oman, and Saudi Arabia. We deploy PA-Series end-to-end: design with App-ID-based policy from day one, Panorama or Strata Cloud Manager rollout, Cortex integration, Prisma Access SASE extension, and 24x7 managed firewall services. We hold demo PA-410 and PA-1410 units locally for PoC and have hands-on experience migrating Cisco ASA and FortiGate estates onto PAN-OS.",
    faqs: [
      {
        question: "How does Palo Alto compare to Sophos XGS or Check Point Quantum?",
        answer:
          "Palo Alto Networks is typically the choice when application-layer granularity, ML-powered prevention, and platform consolidation (firewall plus SASE plus XDR) outweigh price. Sophos XGS is a better balance of price and prevention for the UAE mid-market. Check Point edges Palo Alto on raw prevention scores in some independent tests, while Palo Alto wins on App-ID depth and ecosystem. We provide vendor-neutral sizing across all three.",
      },
      {
        question: "Do I need Cloud-Delivered Security Services subscriptions to get value from the PA-Series?",
        answer:
          "Yes, in practice. The base firewall is App-ID and User-ID. To get Threat Prevention, Advanced URL Filtering, Advanced WildFire, DNS Security, and Advanced Threat Prevention, you need the associated subscriptions. Most enterprise customers buy the bundled Cortex Cloud or 5-license bundle so all services are active.",
      },
      {
        question: "Can the PA-Series replace a Cisco ASA?",
        answer:
          "Yes, and we have done so for several UAE customers. ASA is essentially stateful firewall plus VPN, while the PA-Series is Layer 7 NGFW. Migration involves mapping object groups to PAN-OS objects, converting ACL-based policy to App-ID and User-ID policy, and re-pointing VPN clients to GlobalProtect. We provide a structured migration playbook.",
      },
      {
        question: "What is the typical PA-Series deployment lead time in the UAE?",
        answer:
          "Single-site mid-market deployments run three to five weeks. Multi-site Panorama with Prisma Access integration typically runs six to twelve weeks. Hardware lead times have improved significantly and most PA-400 and PA-1400 family appliances are now available locally within two to three weeks.",
      },
    ],
    whatIs: {
      eyebrow: "What is Palo Alto Networks PA-Series",
      titlePrefix: "Application-aware security, powered by inline ",
      titleHighlight: "machine learning",
      bodyParagraphs: [
        "The PA-Series is Palo Alto Networks' purpose-built NGFW appliance family running PAN-OS, the same operating system that powers Prisma Access (SASE), VM-Series (virtual), and CN-Series (containers). Single-pass parallel processing classifies traffic by application, user, and content in one pass, rather than chaining inspection engines, so Layer 7 policy runs at line rate even with all Cloud-Delivered Security Services enabled.",
        "Across more than 15 hardware models, from PA-410 branch appliances to PA-7080 chassis with 245 Gbps threat-prevention throughput, every gateway runs the same PAN-OS, the same App-ID database, and feeds the same WildFire global cloud, giving you consistent policy from a 5-person office to a carrier data center.",
      ],
      feature: {
        titleLine1: "Single-Pass",
        titleLine2: "Parallel Processing",
        body: "Traffic is classified once, then policy, threat prevention, URL filtering, and DLP run in parallel rather than serially. The result is full Layer 7 inspection without the throughput collapse seen on chained-engine architectures.",
      },
      capabilities: [
        "App-ID: identify 4,000+ applications regardless of port, protocol, or encryption",
        "Precision AI: inline ML blocks unknown malware and zero-day exploits in real time",
        "WildFire: cloud sandbox that has classified over 30 billion samples to date",
        "User-ID and Cloud Identity Engine for identity-based policy across SaaS, AD, and Azure AD",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Hardware, virtual, or cloud: your call.",
      intro: "Artiflex deploys Palo Alto Networks PA-Series in whichever form factor fits your infrastructure strategy.",
      options: [
        { icon: "hardware", title: "Hardware Appliance", body: "Purpose-built Palo Alto Networks PA-Series appliances with dedicated security processors. Ideal for on-premise networks with predictable throughput needs." },
        { icon: "virtual", title: "Virtual (VM)", body: "Deploy Palo Alto Networks PA-Series as a virtual firewall on VMware ESXi, Hyper-V, KVM, or Nutanix AHV. Perfect for virtualized data centers." },
        { icon: "cloud", title: "Public Cloud", body: "Launch Palo Alto Networks PA-Series in AWS, Azure, or GCP to protect cloud workloads with the same console and policies as your on-prem firewall." },
      ],
    },
  },

  "cisco-secure-firewall": {
    slug: "cisco-secure-firewall",
    name: "Cisco Secure Firewall",
    logo: "/logos/Cisco.svg",
    tagline: "Talos-powered NGFW with deep integration into the Cisco network and security stack",
    bestFor: "Best for Cisco-Native Environments (Recommended)",
    description:
      "Cisco Secure Firewall (formerly Firepower) is the natural choice for organizations standardized on Cisco networking. Powered by Talos, one of the largest commercial threat intelligence groups in the world, and the Snort 3 engine, Secure Firewall delivers strong intrusion prevention, encrypted traffic visibility without decryption, and tight integration with Cisco ISE, SecureX, and Catalyst switching. For UAE enterprises with an existing Cisco footprint, Secure Firewall consolidates operations under one vendor.",
    keyStats: [],
    whyWinsIntro: {
      label: "Cisco Secure Firewall Highlights",
      title: "The world's most deployed IPS engine. Backed by the world's largest threat intelligence team.",
      description:
        "Cisco Secure Firewall is more than an NGFW, it's the anchor of a fully integrated security ecosystem. From a small branch office running Firepower 1000 to a carrier-class data centre running Firepower 9300 clusters beyond 1 Tbps, every appliance runs the same Threat Defense software, the same Talos intelligence, and the same Snort 3 engine.",
      stats: [
        { value: "1 Tbps+", label: "Clustered throughput on Firepower 9300, carrier-class data centre scale", tone: "emerald" },
        { value: "2,500+", label: "Talos TruffleHunter zero-day rules including undisclosed vulnerabilities", tone: "violet" },
        { value: "Snort 3", label: "Multi-threaded IPS engine, the de facto global standard, authored by Cisco", tone: "sky" },
      ],
      outro:
        "Cisco Secure Firewall's deepest competitive advantage is the ecosystem. No other vendor offers the same depth of integration between firewall, NAC (ISE), endpoint, email security, and XDR under one threat intelligence roof (Talos). For organisations already invested in Cisco infrastructure, the automation and Rapid Threat Containment capabilities are unmatched out of the box.",
    },
    strengths: [
      {
        tag: "Cisco Talos",
        icon: "globe",
        tone: "emerald",
        title: "The world's largest commercial threat intelligence team",
        desc: "Talos collects intelligence from web requests, emails, malware samples, endpoint telemetry, and network intrusions across millions of global deployments. It provides over 2,500 TruffleHunter rules, including protection against zero-day vulnerabilities not yet publicly disclosed.",
      },
      {
        tag: "Snort 3 IPS",
        icon: "activity",
        tone: "violet",
        title: "Multi-threaded IPS: the de facto global standard",
        desc: "Snort 3 is the industry's de facto IPS standard, authored by Cisco and used by hundreds of thousands of deployments worldwide. Its flow-based detection engine and multi-threading architecture deliver significantly higher inspection throughput, including full IPS inspection over TLS-encrypted traffic.",
      },
      {
        tag: "FMC / cdFMC",
        icon: "monitor",
        tone: "sky",
        title: "Centralised management: on-premises or cloud-delivered",
        desc: "Firewall Management Center (FMC) provides centralised policy management, unified logging, and compliance reporting across all Cisco Secure Firewall deployments. Cloud-delivered FMC offers the same capabilities without the management server overhead.",
      },
      {
        tag: "ISE Integration",
        icon: "users",
        tone: "amber",
        title: "Rapid Threat Containment: automated endpoint quarantine",
        desc: "When Cisco Secure Firewall detects malicious activity, it automatically notifies Cisco Identity Services Engine (ISE), which dynamically quarantines the compromised endpoint, all without manual intervention. Lateral movement is closed in seconds.",
      },
      {
        tag: "TLS Inspection",
        icon: "eye",
        tone: "rose",
        title: "Encrypted traffic inspection: including QUIC and TLS 1.3",
        desc: "Cisco Secure Firewall decrypts and inspects TLS 1.3 and QUIC traffic, two protocols many NGFWs treat as blind spots. With the majority of threats now travelling inside encrypted sessions, this capability is no longer optional for organisations serious about visibility.",
      },
      {
        tag: "Multi-instance",
        icon: "layers",
        tone: "slate",
        title: "Independent logical firewalls on a single physical chassis",
        desc: "Multi-instance functionality on the Firepower 4100 and 9300 series lets you carve a single chassis into multiple independent logical firewalls, each with its own policy, routing table, and management context. MSSPs and large enterprises can serve multiple tenants from one physical platform.",
      },
      {
        tag: "SecureX / XDR",
        icon: "barChart",
        tone: "emerald",
        title: "Unified XDR and orchestration: included in every licence",
        desc: "Cisco SecureX and XDR aggregate Talos intelligence across firewall, endpoint, email, and cloud, providing unified visibility, automated threat response, and cross-product orchestration. SecureX entitlement is included with every Cisco Secure Firewall licence.",
      },
      {
        tag: "Clustering",
        icon: "server",
        tone: "violet",
        title: "Active-active clustering: scale beyond 1 Tbps without redesigning your network",
        desc: "Cisco Secure Firewall supports intra-chassis and inter-chassis clustering, up to 16 nodes on the 3100 series and beyond 1 Tbps on clustered Firepower 9300 platforms. Clustered nodes appear as a single device to the network.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "Enterprises and government bodies already standardized on Cisco networking (Catalyst, ISE, SD-WAN)",
      "Organizations using Cisco SecureX, Umbrella, Duo, or Secure Endpoint that want unified correlation",
      "Service providers and large data centers needing Firepower 9300 chassis with multi-tenant containers",
      "Customers migrating from Cisco ASA who want to retain VPN, NAT, and operational continuity",
      "Multi-site enterprises that benefit from Cisco Defense Orchestrator for cloud-managed firewall ops",
      "Environments where compliance or audit mandates Cisco as the network vendor of record",
      "Teams with experienced Cisco engineers who can navigate FMC and FTD policy depth",
    ],
    products: [
      { model: "Secure Firewall 1010 / 1120 / 1140", segment: "SOHO / branch", role: "Up to 100 users" },
      { model: "Secure Firewall 2110 / 2120 / 2130", segment: "Small office", role: "100 to 500 users" },
      { model: "Secure Firewall 3105 / 3110 / 3120", segment: "Mid-market", role: "500 to 1,500 users" },
      { model: "Secure Firewall 3130 / 3140", segment: "Enterprise", role: "1,500 to 5,000 users" },
      { model: "Secure Firewall 4215 / 4225 / 4245", segment: "Large enterprise / DC", role: "5,000+ users, multi-Gbps inspection" },
      { model: "Firepower 9300 chassis", segment: "Service provider / DC", role: "Multi-tenant chassis, up to 1.4 Tbps aggregate" },
    ],
    whyArtiflex:
      "Artiflex IT is a Cisco Premier Integrator with CCNP Security and CCIE Security engineers in the UAE. We deliver Secure Firewall end-to-end across UAE, Oman, and Saudi Arabia: ASA-to-FTD migration, FMC and CDO rollouts, ISE-driven dynamic policy, SD-WAN integration with Catalyst SD-WAN and Meraki, and 24x7 managed services. Our team has migrated complex multi-context ASA estates onto Secure Firewall for banking, healthcare, and government customers without service interruption.",
    faqs: [
      {
        question: "How does Cisco Secure Firewall compare to Sophos XGS or Palo Alto?",
        answer:
          "Cisco Secure Firewall is typically the right answer when the rest of the network is Cisco. For mixed-vendor or Microsoft-centric environments, Sophos XGS or Palo Alto are usually simpler to operate. Cisco wins on Talos intelligence quality and on integration with ISE, SecureX, and the Cisco SD-Access fabric. The operational learning curve is steeper than Sophos Central.",
      },
      {
        question: "Is Cisco ASA still supported, or do I need to move to FTD?",
        answer:
          "Classic ASA software is still supported and receives security updates, but new feature development is on Firepower Threat Defense (FTD). Most existing ASA hardware can run either ASA or FTD images, and Cisco's roadmap is FTD-first. We recommend an ASA-to-FTD migration plan on a 12 to 24 month horizon.",
      },
      {
        question: "Can Secure Firewall be managed from the cloud?",
        answer:
          "Yes. Cisco Defense Orchestrator (CDO) is the cloud management plane for Secure Firewall, ASA, Meraki MX, and Umbrella. CDO is ideal for distributed branch deployments and for customers who do not want to operate an on-premise FMC virtual appliance.",
      },
      {
        question: "What is the typical Secure Firewall deployment lead time in the UAE?",
        answer:
          "Single-site mid-market deployments run four to six weeks because FMC policy authoring and ISE integration take longer than other vendors. Multi-site or ASA-to-FTD migrations typically run two to four months. We hold demo Secure Firewall 1010 and 3110 units locally for PoC.",
      },
    ],
    whatIs: {
      eyebrow: "What is Cisco Secure Firewall",
      titlePrefix: "NGFW built for the ",
      titleHighlight: "Cisco-standardized enterprise",
      bodyParagraphs: [
        "Cisco Secure Firewall combines the ASA stateful firewall heritage with the Firepower Threat Defense (FTD) Layer 7 inspection engine, all powered by Talos threat intelligence and Snort 3 IPS. The platform spans branch (1010, 1120), mid-market (2110, 3110), enterprise (3140, 4115, 4145) and service-provider (9300) form factors, managed through Cisco Defense Orchestrator (CDO) or the Firepower Management Center (FMC).",
        "Where Secure Firewall is strongest is in Cisco-native environments: SD-Access fabric, Catalyst Center (DNA Center), ISE-driven dynamic policy, and SecureX correlation across Umbrella, Duo, Secure Endpoint, and Talos. If the rest of your stack is Cisco, Secure Firewall removes a vendor seam.",
      ],
      feature: {
        titleLine1: "Talos + Snort 3",
        titleLine2: "Architecture",
        body: "Talos publishes new threat intelligence every three to five minutes from a global telemetry of 600+ billion daily security events. Snort 3 applies that intelligence inline with native HTTP/3 and encrypted-traffic awareness.",
      },
      capabilities: [
        "Talos threat intelligence with 600+ billion daily security events",
        "Snort 3 IPS engine with native HTTP/3 and QUIC inspection",
        "Encrypted Visibility Engine (EVE): classify TLS traffic without decryption",
        "SecureX integration: cross-product correlation across the Cisco security portfolio",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Hardware, virtual, or cloud: your call.",
      intro: "Artiflex deploys Cisco Secure Firewall in whichever form factor fits your infrastructure strategy.",
      options: [
        { icon: "hardware", title: "Hardware Appliance", body: "Purpose-built Cisco Secure Firewall appliances with dedicated security processors. Ideal for on-premise networks with predictable throughput needs." },
        { icon: "virtual", title: "Virtual (VM)", body: "Deploy Cisco Secure Firewall as a virtual firewall on VMware ESXi, Hyper-V, KVM, or Nutanix AHV. Perfect for virtualized data centers." },
        { icon: "cloud", title: "Public Cloud", body: "Launch Cisco Secure Firewall in AWS, Azure, or GCP to protect cloud workloads with the same console and policies as your on-prem firewall." },
      ],
    },
  },

  "fortinet-fortigate": {
    slug: "fortinet-fortigate",
    name: "Fortinet FortiGate",
    logo: "/logos/Fortinet.svg",
    tagline: "ASIC-accelerated NGFW with integrated SD-WAN and the Security Fabric",
    bestFor: "Specialist Choice: Performance-First Deployments",
    description:
      "FortiGate is built around Fortinet's custom Security Processing Units (SPU) and Network Processing Unit (NP7) ASICs, which offload firewall, IPSec, and SSL inspection to dedicated silicon. The result is high inspected throughput per dollar, particularly attractive when SD-WAN, ZTNA, and firewall converge on one appliance. FortiGate is a strong specialist choice where raw performance and built-in SD-WAN are the primary buying criteria. For most UAE mid-market customers, we still recommend Sophos XGS, Check Point, or Palo Alto first; FortiGate makes the shortlist when the use case demands it.",
    keyStats: [],
    whyWinsIntro: {
      label: "Fortinet FortiGate Highlights",
      title: "Purpose-built silicon. One OS. The industry's broadest security platform.",
      description:
        "Fortinet is the only firewall vendor that designs and manufactures its own purpose-built security ASICs, the FortiASIC SPU family. The result is firewall throughput, SSL inspection performance, and IPsec VPN speeds that CPU-based competitors simply cannot match at the same price point, all unified under a single operating system across every deployment model.",
      stats: [
        { value: "1.2 Tbps", label: "Firewall throughput on FortiGate 7000F, with 312 Gbps threat protection", tone: "emerald" },
        { value: "100B+", label: "Security events processed daily by FortiGuard Labs threat intelligence", tone: "violet" },
        { value: "50+", label: "Integrated enterprise-grade security products across the Security Fabric", tone: "sky" },
      ],
      outro:
        "Fortinet's defining advantage is convergence at scale: more security functions on fewer devices, powered by purpose-built silicon that competitors cannot replicate without designing their own chips. For organisations seeking to consolidate vendors and reduce TCO across firewall, SD-WAN, SASE, and SOC, FortiGate is consistently the most financially efficient path.",
    },
    strengths: [
      {
        tag: "FortiASIC SPU",
        icon: "server",
        tone: "emerald",
        title: "Purpose-built security silicon, not repurposed general-purpose CPUs",
        desc: "Fortinet designs its own ASICs, the NP7 Network Processor and CP9 Content Processor, that offload firewall sessions, IPsec decryption, NAT, and SSL/TLS inspection entirely from the main CPU. The result is single-digit microsecond latency and line-rate throughput even with all security features enabled.",
      },
      {
        tag: "FortiOS",
        icon: "sliders",
        tone: "violet",
        title: "One operating system across every deployment model",
        desc: "FortiOS runs identically across physical appliances, virtual machines, containers, and cloud instances, on AWS, Azure, GCP, and private hypervisors. Every policy framework and FortiGuard security service is consistent regardless of where a FortiGate is deployed. No retraining, no policy rewriting, no behaviour gaps.",
      },
      {
        tag: "FortiGuard Labs",
        icon: "globe",
        tone: "sky",
        title: "AI-powered threat intelligence: 100 billion events processed daily",
        desc: "FortiGuard Labs is Fortinet's global threat research engine, processing over 100 billion security events per day using AI and ML models. IPS signatures, AV updates, URL and DNS threat feeds are pushed to every FortiGate in near real time, typically within minutes of a new threat being discovered anywhere in the world.",
      },
      {
        tag: "Security Fabric",
        icon: "layers",
        tone: "amber",
        title: "A fully integrated mesh: every product is a sensor and an enforcer",
        desc: "The Fortinet Security Fabric connects FortiGate, FortiSwitch, FortiAP, FortiAnalyzer, FortiSIEM, FortiEDR, FortiMail, and 50+ other products into a bi-directional telemetry mesh. A threat detected at any Fabric node is automatically shared and acted upon across every other node.",
      },
      {
        tag: "Secure SD-WAN",
        icon: "activity",
        tone: "rose",
        title: "NGFW and SD-WAN converged: no separate appliance needed",
        desc: "Fortinet is the only vendor that natively converges a full NGFW with SD-WAN on the same hardware, the same OS, and the same policy framework. IPS, AV, SSL inspection, URL filtering, and application-aware path selection all run in hardware, eliminating the performance gap of software-only SD-WAN overlays.",
      },
      {
        tag: "Inline Sandbox",
        icon: "shield",
        tone: "slate",
        title: "AI-powered zero-day protection inline: no traffic delays",
        desc: "FortiGuard's AI-based inline malware prevention analyses and blocks zero-day threats in real time, without holding traffic for sandbox queuing. Files are analysed using static analysis, AI/ML heuristics, and dynamic detonation simultaneously.",
      },
      {
        tag: "Universal ZTNA",
        icon: "lock",
        tone: "emerald",
        title: "Zero Trust built into the firewall: agent-based and agentless",
        desc: "FortiOS includes Universal ZTNA as a native capability, enforcing continuous identity and device-posture verification before granting access to any application, regardless of where the user or the application sits. Both agent-based and agentless access modes are supported.",
      },
      {
        tag: "FortiSASE",
        icon: "monitor",
        tone: "violet",
        title: "Cloud-delivered SASE: same FortiOS, same FortiManager console",
        desc: "FortiSASE extends the Security Fabric to remote users and thin-branch sites via cloud-hosted PoPs, delivering SWG, CASB, ZTNA, and FWaaS under the same FortiManager console as on-premises FortiGates. Policy consistency and threat intelligence are identical on-prem and in the cloud.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "Multi-branch enterprises that need integrated SD-WAN and NGFW on a single appliance",
      "Service providers and high-throughput data centers where ASIC-accelerated IPSec is decisive",
      "Customers already invested in FortiSwitch, FortiAP, and FortiEDR who want full Fabric consolidation",
      "OT and industrial environments where rugged FortiGate Rugged Series appliances apply",
      "Budget-sensitive enterprise buyers who optimize for inspected throughput per dirham",
      "Telcos and managed service providers offering FortiGate-VM in multi-tenant cloud overlays",
      "Customers with strong Fortinet-certified staff (NSE 4 to 7) who can operate the Fabric end-to-end",
    ],
    products: [
      { model: "FortiGate 40F / 60F / 70F", segment: "SOHO / branch", role: "Up to 50 users" },
      { model: "FortiGate 80F / 90G / 100F", segment: "Small office", role: "50 to 250 users" },
      { model: "FortiGate 200F / 400F", segment: "Mid-market", role: "250 to 1,500 users" },
      { model: "FortiGate 600F / 900G / 1000F", segment: "Enterprise", role: "1,500 to 5,000 users" },
      { model: "FortiGate 1800F / 3000F / 4400F", segment: "Large enterprise / DC", role: "5,000+ users, multi-Gbps inspection" },
      { model: "FortiGate 7000 series", segment: "Service provider / DC", role: "Chassis-based, terabit-class throughput" },
    ],
    whyArtiflex:
      "Artiflex IT is a Fortinet Advanced Partner with NSE 4 and NSE 7 certified engineers serving the UAE, Oman, and Saudi Arabia. We deliver FortiGate where the use case fits: branch SD-WAN consolidation, high-throughput data centers, and Fabric-led estates. Our consultants will tell you when another vendor (Sophos, Check Point, Palo Alto) is the better recommendation; vendor-neutral sizing is the default starting point.",
    faqs: [
      {
        question: "When should we choose FortiGate over Sophos XGS or Palo Alto?",
        answer:
          "Choose FortiGate when the deciding criteria are inspected-throughput-per-dirham, integrated SD-WAN at zero license cost, or full Fortinet Fabric consolidation across firewall, switch, AP, and EDR. For mid-market UAE buyers who want best-in-class prevention with simple operations, Sophos XGS or Check Point are typically our first recommendation.",
      },
      {
        question: "Is the integrated SD-WAN in FortiGate really free?",
        answer:
          "The SD-WAN feature is included in FortiOS at no extra license. To get application identification, SLA telemetry, and centralized SD-WAN orchestration at scale, most customers add FortiManager and SD-WAN Orchestrator, which are licensed. The base feature is genuinely free, but enterprise-scale operations require additional components.",
      },
      {
        question: "How does FortiGate handle TLS 1.3 inspection?",
        answer:
          "FortiOS supports TLS 1.3 deep inspection, with CP9 ASIC offload helping throughput on supported models. Real-world inspected-throughput numbers depend on cipher selection, certificate chain depth, and which security profiles are enabled; we always size against your specific feature mix rather than headline numbers.",
      },
      {
        question: "What is the typical FortiGate deployment lead time in the UAE?",
        answer:
          "Single-site mid-market deployments run two to four weeks. Multi-site SD-WAN rollouts with FortiManager typically run four to eight weeks. Hardware availability is good locally for 40F to 200F class units; larger 3000F and 4400F class often need three to six week lead times.",
      },
    ],
    whatIs: {
      eyebrow: "What is Fortinet FortiGate",
      titlePrefix: "ASIC-accelerated firewall with ",
      titleHighlight: "native SD-WAN",
      bodyParagraphs: [
        "FortiGate runs FortiOS on Fortinet's purpose-built SPU architecture (NP7 network processors, CP9 content processors, SP5 security processors). Those ASICs accelerate firewall, VPN, and parts of IPS, which lets entry-level units deliver inspected throughput numbers that would normally require much larger general-purpose CPUs. Native SD-WAN is built into every FortiGate at no extra license cost.",
        "The wider Fortinet Security Fabric ties FortiGate into FortiSwitch, FortiAP, FortiEDR, FortiSIEM, FortiSandbox, and FortiAnalyzer, with shared visibility through FortiManager. For Fortinet-committed customers, this is a coherent estate. The trade-off is that pricing models, license bundles, and operational complexity tend to compound as you add Fabric components.",
      ],
      feature: {
        titleLine1: "Security Processing Unit",
        titleLine2: "(SPU) Architecture",
        body: "Custom NP7, CP9, and SP5 ASICs offload firewall, VPN, and inspection workloads from general-purpose CPUs. This delivers high inspected throughput per appliance dollar, particularly for IPSec VPN and SD-WAN heavy use cases.",
      },
      capabilities: [
        "NP7 network processor: hardware-accelerated firewall and IPSec at multi-100G",
        "CP9 content processor: SSL inspection and signature matching offload",
        "Built-in SD-WAN with application steering and forward error correction",
        "FortiGuard threat intelligence with shared signatures across the Fabric",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Hardware, virtual, or cloud: your call.",
      intro: "Artiflex deploys Fortinet FortiGate in whichever form factor fits your infrastructure strategy.",
      options: [
        { icon: "hardware", title: "Hardware Appliance", body: "Purpose-built Fortinet FortiGate appliances with dedicated security processors. Ideal for on-premise networks with predictable throughput needs." },
        { icon: "virtual", title: "Virtual (VM)", body: "Deploy Fortinet FortiGate as a virtual firewall on VMware ESXi, Hyper-V, KVM, or Nutanix AHV. Perfect for virtualized data centers." },
        { icon: "cloud", title: "Public Cloud", body: "Launch Fortinet FortiGate in AWS, Azure, or GCP to protect cloud workloads with the same console and policies as your on-prem firewall." },
      ],
    },
  },

  "sonicwall": {
    slug: "sonicwall",
    name: "SonicWall TZ and NSa",
    logo: "/logos/SonicWall.svg",
    tagline: "Capture ATP and RTDMI multi-engine sandboxing for budget-conscious SMB",
    bestFor: "Specialist Choice: Budget-Conscious SMB",
    description:
      "SonicWall has a long heritage in the SMB and small mid-market space, with the TZ desktop appliances and NSa 1U mid-range covering most UAE small-business deployments. The Real-Time Deep Memory Inspection (RTDMI) engine, part of Capture ATP, catches memory-resident malware that signature and sandbox-only engines miss. For price-sensitive SMB buyers, SonicWall is a credible specialist choice; for mid-market and enterprise UAE deployments, we typically recommend Sophos XGS or Check Point first.",
    keyStats: [],
    whyWinsIntro: {
      label: "SonicWall TZ and NSa Series Highlights",
      title: "Enterprise-grade protection. SMB-friendly total cost of ownership.",
      description:
        "SonicWall has spent over 30 years building firewalls that deliver real threat prevention at a price point that doesn't force SMBs to choose between security and budget. From a five-person branch to a multi-site enterprise, there's a SonicWall for the job, all running the same SonicOS platform.",
      stats: [
        { value: "<100 ns", label: "RTDMI detects malware weaponry exposed for under 100 nanoseconds", tone: "emerald" },
        { value: "Every byte", label: "RFDPI inspects inbound and outbound traffic without buffering or proxying", tone: "violet" },
        { value: "1M+", label: "Concurrent connections supported across mid-range NSa appliances", tone: "sky" },
      ],
      outro:
        "SonicWall's competitive edge: enterprise-grade patented inspection technology (RFDPI plus RTDMI) with a total cost of ownership consistently lower than Palo Alto, Fortinet, or Check Point at equivalent performance tiers, making it the go-to choice for cost-conscious SMB and mid-market buyers.",
    },
    strengths: [
      {
        tag: "RFDPI",
        icon: "activity",
        tone: "emerald",
        title: "Reassembly-Free Deep Packet Inspection: no buffering, no blind spots",
        desc: "SonicWall's patented RFDPI engine inspects every byte of every packet, both inbound and outbound, in a single streaming pass without reassembling or buffering traffic. Traditional DPI engines can be bypassed when buffers are full; RFDPI closes that window entirely.",
      },
      {
        tag: "RTDMI",
        icon: "eye",
        tone: "violet",
        title: "Real-Time Deep Memory Inspection for sub-nanosecond zero-day detection",
        desc: "RTDMI detects and blocks zero-day threats and unknown malware by inspecting directly in memory, catching weaponry that is exposed for under 100 nanoseconds before it can execute. This precision dramatically reduces false positives compared to signature-only engines.",
      },
      {
        tag: "Capture ATP",
        icon: "shield",
        tone: "sky",
        title: "Multi-engine cloud sandbox with four analysis techniques",
        desc: "Unknown files are detonated in the Capture ATP cloud sandbox using RTDMI, virtualised sandboxing, full system emulation, and hypervisor-level analysis simultaneously. When a file is confirmed malicious, a block hash is created and a signature is pushed to all SonicWall firewalls globally.",
      },
      {
        tag: "DPI-SSL",
        icon: "lock",
        tone: "amber",
        title: "Full TLS/SSL and SSH encrypted traffic inspection",
        desc: "With over 70% of network sessions now encrypted, a firewall that can't inspect TLS is blind to most modern attacks. SonicWall's DPI-SSL decrypts, inspects, and re-encrypts traffic in line, catching malware and command-and-control hidden inside HTTPS.",
      },
      {
        tag: "NSM",
        icon: "monitor",
        tone: "rose",
        title: "Centralised management across firewalls, switches, and access points",
        desc: "SonicWall Network Security Manager (NSM) provides a single dashboard for managing all SonicWall security devices, generating compliance reports, and accessing historical logs. Multi-site and MSSP deployments are managed from one place.",
      },
      {
        tag: "Zero-Touch Deployment",
        icon: "globe",
        tone: "slate",
        title: "Branch sites online in minutes, no on-site IT needed",
        desc: "Zero-Touch Deployment lets administrators pre-configure and push settings to remote appliances via the cloud. A non-technical person at a branch site simply unboxes and connects the device; it self-provisions, registers, and starts protecting without any on-site IT involvement.",
      },
      {
        tag: "Secure SD-WAN",
        icon: "layers",
        tone: "emerald",
        title: "Built-in SD-WAN with intelligent traffic steering",
        desc: "SonicWall's integrated SD-WAN intelligently routes traffic across multiple WAN links, prioritising cloud applications and reducing MPLS dependency. No separate SD-WAN appliance is needed, lowering total cost of ownership for distributed organisations.",
      },
      {
        tag: "HA Licensing",
        icon: "barChart",
        tone: "violet",
        title: "High availability with no subscription cost on the secondary unit",
        desc: "SonicWall's HA licensing model is a significant commercial differentiator: when deploying an active-passive pair, there is no subscription cost for the secondary unit. This can mean substantial savings compared to competitors who charge full price for both nodes.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "SMBs and small branches (under 100 users) prioritizing price-performance over best-in-class prevention",
      "Retail chains, clinics, and professional services with many small sites and tight per-site budget",
      "Managed service providers building white-label firewall services for SMB customers",
      "Customers who need a working NGFW, SD-WAN, and SSL VPN in a single appliance under one budget line",
      "Existing SonicWall customers refreshing TZ or NSa hardware nearing end-of-support",
      "Schools, NGOs, and small public-sector entities with constrained capex",
      "Distributed franchise operations that benefit from cloud-managed (NSM) firewall ops at scale",
    ],
    products: [
      { model: "TZ80 / TZ270 / TZ270W", segment: "SOHO / branch", role: "Up to 25 users" },
      { model: "TZ370 / TZ470 / TZ570", segment: "Small office", role: "25 to 150 users" },
      { model: "TZ670 / NSa 2700", segment: "Small mid-market", role: "150 to 500 users" },
      { model: "NSa 3700 / NSa 4700", segment: "Mid-market", role: "500 to 1,500 users" },
      { model: "NSa 5700 / NSa 6700", segment: "Upper mid-market", role: "1,500 to 3,500 users" },
      { model: "NSsp series", segment: "Service provider / DC", role: "Multi-Gbps, multi-tenant deployments" },
    ],
    whyArtiflex:
      "Artiflex IT is a SonicWall Partner serving SMB and mid-market customers across the UAE, Oman, and Saudi Arabia. We deploy TZ and NSa appliances for retail chains, clinics, schools, and small professional services where price-performance is decisive. Our vendor-neutral assessment will tell you when Sophos XGS, Check Point, or Palo Alto is a stronger long-term choice; for the right use case, SonicWall is a credible and cost-effective specialist.",
    faqs: [
      {
        question: "When should we choose SonicWall over Sophos XGS?",
        answer:
          "Choose SonicWall when the deciding factor is upfront capex and you have a clear SMB profile (under 100 users, simple policy, light TLS inspection). For UAE mid-market customers where prevention quality, single-pane simplicity, and Synchronized Security with endpoints matter, Sophos XGS is typically our first recommendation.",
      },
      {
        question: "How effective is RTDMI compared to standard sandboxing?",
        answer:
          "RTDMI is genuinely differentiated for fileless and memory-resident malware, and SonicWall publishes independent test results that support this. For most SMB threat profiles, the difference compared to mainstream sandboxing is meaningful but not transformative; for enterprise prevention quality, Check Point SandBlast and Palo Alto WildFire still lead.",
      },
      {
        question: "Is SonicWall the right choice for our UAE multi-branch retail operation?",
        answer:
          "Often yes for the SMB segment. NSM cloud management, the TZ form factor, and the price point fit retail and franchise patterns well. For larger or more security-sensitive retail (jewelry, banking-adjacent), we would still shortlist Sophos XGS or Check Point Spark.",
      },
      {
        question: "What is the typical SonicWall deployment lead time in the UAE?",
        answer:
          "Single-site TZ and NSa 2700 deployments run one to two weeks. Multi-site NSM-managed retail rollouts of 20 to 100 sites typically run four to eight weeks. TZ class hardware is held in stock locally; larger NSa 5700 and 6700 units often need two to four week lead times.",
      },
    ],
    whatIs: {
      eyebrow: "What is SonicWall TZ and NSa Series",
      titlePrefix: "Practical NGFW protection at ",
      titleHighlight: "SMB price points",
      bodyParagraphs: [
        "SonicWall's portfolio runs from the TZ80 / TZ270 / TZ370 desktop appliances for small offices, up through the NSa 2700, 3700, 4700, 5700, 6700, and NSsp series for service providers. All run SonicOS 7 with Capture ATP, RTDMI, application control, content filtering, and SSL VPN built in.",
        "What sets SonicWall apart in this segment is RTDMI: a memory-inspection engine that catches weaponized documents and fileless malware that traditional sandbox emulation can miss, all managed through the Network Security Manager (NSM) cloud console or on-prem Global Management System (GMS).",
      ],
      feature: {
        titleLine1: "Capture ATP + RTDMI",
        titleLine2: "Architecture",
        body: "Real-Time Deep Memory Inspection (RTDMI) inspects file behaviour in memory using machine learning, catching exploits and fileless malware that traditional sandboxes miss, with verdicts typically in under a second.",
      },
      capabilities: [
        "RTDMI memory inspection for fileless and weaponized-document malware",
        "Reassembly-Free Deep Packet Inspection (RFDPI) for low-latency Layer 7",
        "Built-in SD-WAN, content filtering, and SSL VPN on every appliance",
        "Cloud-managed via Network Security Manager (NSM)",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Hardware, virtual, or cloud: your call.",
      intro: "Artiflex deploys SonicWall TZ and NSa Series in whichever form factor fits your infrastructure strategy.",
      options: [
        { icon: "hardware", title: "Hardware Appliance", body: "Purpose-built SonicWall TZ and NSa Series appliances with dedicated security processors. Ideal for on-premise networks with predictable throughput needs." },
        { icon: "virtual", title: "Virtual (VM)", body: "Deploy SonicWall TZ and NSa Series as a virtual firewall on VMware ESXi, Hyper-V, KVM, or Nutanix AHV. Perfect for virtualized data centers." },
        { icon: "cloud", title: "Public Cloud", body: "Launch SonicWall TZ and NSa Series in AWS, Azure, or GCP to protect cloud workloads with the same console and policies as your on-prem firewall." },
      ],
    },
  },
};

export const firewallVendorList = Object.values(firewallVendors);
