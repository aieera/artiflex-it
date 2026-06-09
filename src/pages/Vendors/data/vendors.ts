/* ───────── CATEGORY DEFINITIONS ───────── */
export type CategoryKey =
  | "endpoint"
  | "network-security"
  | "email"
  | "dlp"
  | "iam"
  | "sase"
  | "siem"
  | "vuln"
  | "app-security"
  | "cloud"
  | "backup"
  | "networking"
  | "servers"
  | "storage"
  | "power"
  | "surveillance"
  | "access-control"
  | "cabling"
  | "printing"
  | "comms";

/** Insertion order here drives the order of filter tabs on /vendors. */
export const CATEGORY_LABEL: Record<CategoryKey, string> = {
  endpoint: "Endpoint Security",
  "network-security": "Network Security & Firewalls",
  email: "Email Security",
  dlp: "Data Loss Prevention",
  iam: "Identity & Access Management",
  sase: "Workspace Protection",
  siem: "Security Operations",
  vuln: "Vulnerability Management",
  "app-security": "Application Security",
  cloud: "Cloud & Virtualization",
  backup: "Backup & Disaster Recovery",
  networking: "Networking & Wireless",
  servers: "Servers & Compute",
  storage: "Storage",
  power: "Power & UPS",
  surveillance: "CCTV & Surveillance",
  "access-control": "Access Control & Biometrics",
  cabling: "Structured Cabling",
  printing: "Printing",
  comms: "Unified Communications",
};

export const CATEGORY_BADGE: Record<CategoryKey, string> = {
  endpoint: "Endpoint",
  "network-security": "Network Security",
  email: "Email Security",
  dlp: "DLP",
  iam: "Identity & Access",
  sase: "SASE / SSE",
  siem: "SIEM / MDR",
  vuln: "Vuln Mgmt",
  "app-security": "App Security",
  cloud: "Cloud",
  backup: "Backup & DR",
  networking: "Networking",
  servers: "Servers",
  storage: "Storage",
  power: "Power & UPS",
  surveillance: "Surveillance",
  "access-control": "Access Control",
  cabling: "Cabling",
  printing: "Printing",
  comms: "Unified Comms",
};

/* ───────── VENDORS ───────── */
export type AboutFact = { label: string; value: string; wide?: boolean };
export type WhyVendorReason = { title: string; body: string };
export type ArtiflexStat = { value: string; label: string; sub: string };

/** Icon name used in product showcase cards. Mapped to a real icon component in VendorShowcase. */
export type ShowcaseIcon =
  | "shield" | "monitor" | "eye" | "layers" | "server" | "clock" | "lock" | "target"
  | "wifi" | "mail" | "cloud" | "gear" | "phone" | "database" | "globe" | "zap"
  | "users" | "grid" | "archive" | "activity" | "key" | "search" | "cpu" | "folder"
  | "network" | "bell";

export type ShowcaseProduct = { title: string; description: string; icon: ShowcaseIcon };

export type Vendor = {
  slug: string;
  name: string;
  logo: string;
  description: string;
  categories: CategoryKey[];

  /** Marker for vendors that render the bespoke SophosShowcase (Sophos product portfolio + Site-in-a-Box iframe). */
  showcase?: "sophos";
  /** Partner-tier badge in the hero (e.g. "Platinum Sophos Partner"). Only set when verified. */
  partnerBadge?: string;

  /** Small subtitle line under the hero H1 (e.g. "Cybersecurity for the Real World"). */
  heroTagline?: string;
  /** Pill-style intro headline at the top of the "What we do with X" card. */
  summaryHeadline?: string;
  /** Body paragraphs that follow the summaryHeadline in the vendor card. */
  summaryParagraphs?: string[];

  /** Inner "About X" block beneath the summary card. */
  aboutHeading?: string;
  aboutTagline?: string;
  aboutFacts?: AboutFact[];

  /** Dark "Why X, Why we recommend X to our customers" grid (6 reasons recommended). */
  whyVendor?: {
    eyebrow?: string;
    title?: string;
    intro?: string;
    items: WhyVendorReason[];
  };

  /** Product portfolio grid (renders a "Complete X Product Portfolio" showcase section). */
  productShowcase?: {
    eyebrow?: string;
    heading?: string;
    intro?: string;
    products: ShowcaseProduct[];
  };

  /** Optional Artiflex-claim stats panel (Sophos uses verified numbers; other vendors fall back to a generic block). */
  artiflexPanel?: {
    eyebrow?: string;
    title?: string;
    intro?: string;
    stats: ArtiflexStat[];
    accreditationsHeading?: string;
    accreditations: string[];
  };

  /** Heading on the bottom CTA strip (e.g. "Talk to our IT Security Advisor"). Defaults to `Talk to our IT Advisor`. */
  ctaHeading?: string;
};

export const VENDORS: Vendor[] = [
  {
    slug: "sophos",
    name: "Sophos",
    logo: "/logos/sophos.svg",
    description:
      "Sophos protects 600,000+ organizations worldwide with next-gen endpoint, network, email, and managed detection products, all unified through one cloud console. Artiflex is your certified Sophos partner across UAE, Oman, and Saudi Arabia.",
    categories: ["endpoint", "network-security", "email", "dlp", "sase", "siem", "vuln"],
    showcase: "sophos",
    partnerBadge: "Platinum Sophos Partner",
    heroTagline: "Cybersecurity for the Real World",
    summaryHeadline: "Next-gen endpoint, XDR, and managed firewalls: under one cloud console.",
    summaryParagraphs: [
      "Artiflex IT delivers Sophos's complete cybersecurity portfolio across the UAE, Oman, and Saudi Arabia. From XGS firewalls and Intercept X endpoint protection to the world's largest 24/7 MDR service, we design, deploy, and operate Sophos solutions end-to-end, from sizing through commissioning to managed service.",
      "As a regional partner with certified engineers, Artiflex is the destination for organizations that want enterprise-grade Sophos capability with local accountability, GCC-friendly procurement, and zero-touch escalation paths to Sophos engineering.",
    ],
    aboutHeading: "About Sophos",
    aboutTagline: "A global cybersecurity leader, simplified",
    aboutFacts: [
      { label: "Founded", value: "1985, Oxford UK" },
      { label: "Heritage", value: "Astaro + Cyberoam + Sophos" },
      { label: "Management", value: "Sophos Central (single pane)" },
      { label: "Standout tech", value: "Xstream TLS, Synchronized Security, RED Appliances, NDR Essentials included in firewall, and unlimited free VPN", wide: true },
    ],
    whyVendor: {
      eyebrow: "Why Sophos",
      title: "Why we recommend Sophos to our customers",
      intro: "Sophos consistently wins on three dimensions our customers care about: protection effectiveness, operational simplicity, and total cost of ownership.",
      items: [
        { title: "AI-First Threat Detection", body: "Deep learning models trained on petabytes of SophosLabs telemetry catch zero-day threats that signature-based products miss." },
        { title: "Synchronized Security", body: "Firewall, endpoint, email, and wireless products share threat intel automatically, with no SIEM stitching required." },
        { title: "One Cloud Console", body: "Sophos Central unifies management of every product in a single browser tab. Onboard a new product in minutes, not weeks." },
        { title: "Gartner-Recognized", body: "Leader in Magic Quadrant for Endpoint Protection. Customers' Choice for MDR. Highest customer satisfaction scores in segment." },
        { title: "Transparent Pricing", body: "Per-user and per-device pricing with no surprise modules. Site-in-a-Box bundles bring enterprise security to SMB budgets." },
        { title: "Strong Local Support", body: "Sophos has a dedicated EMEA support team and regional cloud presence, important for data residency and response times in the GCC." },
      ],
    },
    artiflexPanel: {
      eyebrow: "Why Artiflex for Sophos",
      title: "Certified, hands-on, and accountable",
      intro: "We're more than a reseller: Artiflex is a Sophos Platinum Partner with a dedicated practice that owns the deployment, integration, and ongoing management of every product we sell.",
      stats: [
        { value: "200+", label: "Sophos Deployments", sub: "UAE, Oman, Saudi Arabia" },
        { value: "100%", label: "Certified Engineers", sub: "SCE & SCA accreditations" },
        { value: "12 min", label: "SOC Response Time", sub: "From alert to first action" },
        { value: "5–10 days", label: "Standard Deployment", sub: "From PO to production cutover" },
      ],
      accreditationsHeading: "Our Sophos accreditations",
      accreditations: [
        "Sophos Platinum Partner",
        "Sophos Certified Engineer (SCE)",
        "Sophos Certified Architect (SCA)",
        "Sophos MDR Specialist",
        "XGS Firewall Specialist",
        "Sophos Central Cloud Administrator",
      ],
    },
    ctaHeading: "Talk to our IT Security Advisor",
  },
  {
    slug: "check-point",
    name: "Check Point",
    logo: "/logos/Check-Point-2024-logo-color.svg",
    description:
      "Check Point delivers consolidated cybersecurity across network, cloud, mobile, and endpoint, with the industry's highest catch rate for zero-day threats. Artiflex deploys Check Point Quantum, Harmony, and CloudGuard across the UAE, Oman, and Saudi Arabia.",
    categories: ["network-security", "endpoint", "email", "dlp", "sase"],
    heroTagline: "You deserve the best security",
    summaryHeadline: "Consolidated security across network, cloud, mobile, and endpoint, powered by ThreatCloud AI.",
    summaryParagraphs: [
      "Artiflex IT delivers the Check Point Infinity platform across the UAE, Oman, and Saudi Arabia. From Quantum NGFW perimeter protection and Harmony endpoint, email, and remote access to CloudGuard for AWS, Azure, and GCP workloads, we design, deploy, and operate Check Point environments end-to-end.",
      "Our certified engineers handle sizing, HA cluster design, multi-domain management, and ongoing tuning, so you get enterprise-grade prevention without the operational overhead of a fragmented vendor stack.",
    ],
    aboutHeading: "About Check Point",
    aboutTagline: "Three decades of pioneering network security",
    aboutFacts: [
      { label: "Founded", value: "1993, Tel Aviv Israel" },
      { label: "Heritage", value: "Invented stateful inspection firewall" },
      { label: "Management", value: "Infinity Portal (cloud) + SmartConsole" },
      { label: "Standout tech", value: "ThreatCloud AI (86 engines, 3B transactions/day), Quantum Lightspeed up to 3 Tbps throughput, and Infinity unified policy across network, cloud, and workspace", wide: true },
    ],
    whyVendor: {
      eyebrow: "Why Check Point",
      title: "Why we recommend Check Point to our customers",
      intro: "Check Point consistently wins on prevention effectiveness, consolidation, and operational maturity, three dimensions that matter most for enterprise security buyers.",
      items: [
        { title: "Industry's highest catch rate", body: "Independent testing places Check Point at the top for zero-day prevention and known-malware block rates, with sub-second updates from ThreatCloud AI across 86 detection engines." },
        { title: "True consolidation", body: "One vendor, one policy, one console for firewall, endpoint, email, mobile, cloud workloads, and remote access. Less integration risk, simpler audits, lower total cost." },
        { title: "Hyperscale-ready", body: "Quantum Lightspeed appliances inspect at multi-Tbps line rate with TLS 1.3 enabled, suitable for hyperscale data centres and telco environments where other vendors hit a ceiling." },
        { title: "Mature multi-tenancy", body: "Multi-Domain Management is genuinely production-grade, ideal for MSSPs, large enterprises with separate business units, and regulated environments with strict policy separation." },
        { title: "Strong GCC presence", body: "Local cloud regions and a dedicated Middle East support team enable data residency for regulated sectors and faster response on critical incidents." },
        { title: "Vendor-neutral integration", body: "Open APIs, robust SIEM connectors, and broad SOAR support mean Check Point fits inside your existing toolchain rather than forcing a rip-and-replace." },
      ],
    },
    productShowcase: {
      eyebrow: "Featured Solutions: Check Point Infinity",
      heading: "Complete Check Point Product Portfolio",
      intro: "A consolidated cybersecurity platform spanning network, cloud, mobile, endpoint, and email, all powered by ThreatCloud AI and managed through Infinity Portal.",
      products: [
        { icon: "shield", title: "Quantum Next-Gen Firewall", description: "Industry-leading NGFW with AI-powered threat prevention, hyperscale performance, and unified management across on-prem and cloud." },
        { icon: "monitor", title: "Harmony Endpoint", description: "Complete endpoint protection with anti-ransomware, anti-phishing, anti-bot, and full disk encryption managed from a single console." },
        { icon: "mail", title: "Harmony Email & Collaboration", description: "AI-driven email security for Microsoft 365, Google Workspace, and Teams stopping phishing, BEC, and malware pre-delivery." },
        { icon: "phone", title: "Harmony Mobile", description: "Mobile threat defense for iOS and Android, protects against app, network, and OS-level attacks without compromising privacy." },
        { icon: "globe", title: "Harmony Browse", description: "Secure web browsing with zero-trust internet access, in-browser DLP, and protection from malicious sites and downloads." },
        { icon: "cloud", title: "Harmony Connect (SASE)", description: "Cloud-delivered SASE with ZTNA, SWG, and FWaaS, secure remote workforce access from any device, anywhere." },
        { icon: "server", title: "CloudGuard", description: "Unified cloud security across AWS, Azure, and GCP, CSPM, CWPP, network security, and workload protection in one platform." },
        { icon: "eye", title: "Horizon XDR/XPR", description: "Extended detection and response that correlates signals across endpoint, network, email, and cloud for unified threat analysis." },
        { icon: "activity", title: "Infinity SOC", description: "AI-powered SOC platform combining detection, investigation, and response with ThreatCloud's 4 billion daily security events." },
        { icon: "zap", title: "ThreatCloud AI", description: "Real-time threat intelligence cloud powering all Check Point products, over 60 AI engines analyzing billions of indicators daily." },
        { icon: "grid", title: "Quantum Spark (SMB)", description: "Plug-and-play firewalls for small businesses with built-in threat prevention, VPN, and Wi-Fi, managed from a mobile app." },
        { icon: "gear", title: "Infinity Portal", description: "Single management console for all Check Point products with unified policy, logging, and event management across the estate." },
      ],
    },
    ctaHeading: "Talk to our IT Security Advisor",
  },
  {
    slug: "fortinet",
    name: "Fortinet",
    logo: "/logos/Fortinet.svg",
    description:
      "Fortinet's Security Fabric converges networking and security across FortiGate firewalls, SD-WAN, SASE, and 50+ integrated products. Artiflex deploys Fortinet solutions across the UAE, Oman, and Saudi Arabia.",
    categories: ["network-security", "networking"],
    heroTagline: "Securing What Matters",
    summaryHeadline: "Converged networking and security at scale, on purpose-built silicon.",
    summaryParagraphs: [
      "Artiflex IT delivers the Fortinet Security Fabric across the UAE, Oman, and Saudi Arabia. From FortiGate NGFW and Secure SD-WAN to FortiSASE, FortiEDR, FortiMail, FortiAnalyzer, and FortiManager, we design and operate the full platform end-to-end.",
      "Our certified engineers handle sizing, ASIC-aware throughput planning, FortiManager-driven multi-site rollouts, and ongoing fabric tuning, so you get FortiGate performance without the configuration debt that builds up on aging UTMs.",
    ],
    aboutHeading: "About Fortinet",
    aboutTagline: "Purpose-built silicon, one operating system, the broadest security fabric",
    aboutFacts: [
      { label: "Founded", value: "2000, Sunnyvale California" },
      { label: "Heritage", value: "Founded by Ken Xie & Michael Xie (ex-NetScreen)" },
      { label: "Management", value: "FortiManager + FortiAnalyzer + FortiCloud" },
      { label: "Standout tech", value: "NP7 network processor and SP5 content processor ASICs, FortiOS unified across 50+ products, and Security Fabric that ties firewall, switch, AP, EDR, and SASE into a single policy plane", wide: true },
    ],
    whyVendor: {
      eyebrow: "Why Fortinet",
      title: "Why we recommend Fortinet to our customers",
      intro: "Fortinet wins on throughput-per-dollar, breadth of platform, and a single OS that scales from a 60F branch device to a 7000-series carrier-class chassis.",
      items: [
        { title: "ASIC-accelerated throughput", body: "Custom NP7 and SP5 silicon means FortiGate inspects at line rate without the throughput collapse that hits CPU-only NGFWs when TLS inspection is turned on." },
        { title: "One platform, 50+ products", body: "FortiOS runs across firewall, switch, AP, EDR, SASE, email, sandbox, and SIEM, true convergence with one credential, one license model, and one analytics layer." },
        { title: "Best-in-class Secure SD-WAN", body: "Secure SD-WAN is built into every FortiGate at no extra licence, with native ZTNA and cloud on-ramp to Azure, AWS, and GCP, ideal for distributed branch and remote workforce." },
        { title: "Strong price-to-performance", body: "Fortinet typically delivers more inspected Gbps per dollar than competitors at the mid-market and enterprise tiers, lowering both capex and refresh-cycle cost." },
        { title: "FortiGuard threat intelligence", body: "FortiGuard Labs feeds 7,000+ signatures daily plus AI-driven sandbox verdicts to every FortiGate globally, with response times measured in minutes." },
        { title: "Local support in the GCC", body: "Fortinet has dedicated Middle East SEs, regional TAC, and FortiCloud regions, important for data residency and after-hours escalation in regulated industries." },
      ],
    },
    productShowcase: {
      eyebrow: "Featured Solutions: Security Fabric",
      heading: "Complete Fortinet Product Portfolio",
      intro: "50+ converged products on FortiOS, accelerated by custom NP7 and SP5 ASICs and unified through FortiManager and FortiAnalyzer.",
      products: [
        { icon: "shield", title: "FortiGate NGFW", description: "Industry-leading next-gen firewall with custom security processors, integrated SD-WAN, and AI-powered threat prevention at scale." },
        { icon: "eye", title: "FortiEDR / FortiXDR", description: "Behavior-based endpoint detection with automated response, plus XDR that correlates threats across the Security Fabric." },
        { icon: "monitor", title: "FortiClient", description: "Unified endpoint agent with VPN, ZTNA, vulnerability management, and integration with the FortiGate Security Fabric." },
        { icon: "mail", title: "FortiMail", description: "Cloud or on-prem email security with anti-phishing, sandboxing, encryption, and DLP, blocks 99%+ of malicious email." },
        { icon: "globe", title: "FortiWeb (WAF)", description: "Web application firewall with machine-learning bot detection, API protection, and OWASP Top 10 coverage." },
        { icon: "network", title: "FortiSwitch", description: "Secure access switches managed natively from FortiGate, with PoE+ models for Wi-Fi APs, phones, and IoT." },
        { icon: "wifi", title: "FortiAP Wireless", description: "Wi-Fi 6/6E access points integrated into the Security Fabric, controller-managed or cloud-managed deployment options." },
        { icon: "zap", title: "FortiSandbox", description: "AI-powered sandbox for zero-day threat detection with deep inspection of suspicious files, URLs, and behaviors." },
        { icon: "activity", title: "FortiAnalyzer / FortiSIEM", description: "Centralized log analytics, SIEM, and reporting across all Fortinet products plus 600+ third-party integrations." },
        { icon: "cloud", title: "FortiSASE", description: "Cloud-delivered SASE combining SWG, CASB, ZTNA, and FWaaS, secure access for remote workers and branch offices." },
        { icon: "gear", title: "FortiManager", description: "Centralized management for thousands of FortiGate firewalls with policy automation, compliance, and change tracking." },
        { icon: "bell", title: "FortiSOAR", description: "Security orchestration and automated response with 400+ integrations and pre-built playbooks for common threat scenarios." },
      ],
    },
    ctaHeading: "Talk to our IT Security Advisor",
  },
  {
    slug: "cisco",
    name: "Cisco",
    logo: "/logos/Cisco.svg",
    description:
      "Cisco is the backbone of enterprise IT: networking, switching, wireless, collaboration, and security from a single global leader. Artiflex delivers Cisco infrastructure across the UAE, Oman, and Saudi Arabia.",
    categories: ["network-security", "networking", "endpoint", "iam", "servers", "comms"],
    heroTagline: "The Bridge to Possible",
    summaryHeadline: "Enterprise networking, wireless, and security, unified through Cisco DNA and SecureX.",
    summaryParagraphs: [
      "Artiflex IT delivers the full Cisco enterprise portfolio across the UAE, Oman, and Saudi Arabia. From Catalyst 9000 switches and Meraki cloud-managed networks to Secure Firewall (formerly Firepower), Umbrella DNS-layer protection, Webex, and Cisco DNA Center, we design and operate Cisco infrastructure end-to-end.",
      "Our certified engineers handle network design, ISE-driven access control, SD-Access fabric rollouts, and managed services, so you get carrier-grade reliability with single-pane visibility across campus, branch, and cloud.",
    ],
    aboutHeading: "About Cisco",
    aboutTagline: "Forty years of building the networks that run the internet",
    aboutFacts: [
      { label: "Founded", value: "1984, San Francisco California" },
      { label: "Heritage", value: "Sourcefire (Snort 3 / IPS) + Meraki + Duo + ThousandEyes" },
      { label: "Management", value: "Cisco DNA Center + Meraki Dashboard + SecureX" },
      { label: "Standout tech", value: "Cisco Talos threat intelligence (350+ researchers), Encrypted Traffic Analytics for no-decrypt malware detection, SD-Access identity-based segmentation, and Meraki's industry-leading cloud-managed networking", wide: true },
    ],
    whyVendor: {
      eyebrow: "Why Cisco",
      title: "Why we recommend Cisco to our customers",
      intro: "Cisco is the safe-default for enterprise infrastructure: deep ecosystem, mature operations tools, and the world's largest threat intelligence team backing the security stack.",
      items: [
        { title: "Cisco Talos threat intelligence", body: "The world's largest commercial threat-research team feeds every Cisco security product, from Secure Firewall to Umbrella to Email Security, with the same vetted intel used to protect Fortune 100 SOCs." },
        { title: "Catalyst + Meraki choice", body: "Two best-in-class campus options under one vendor: on-prem managed Catalyst 9000 for strict-control environments, or cloud-managed Meraki for lean IT teams. Both share Cisco's switching DNA." },
        { title: "SD-Access + ISE identity fabric", body: "Cisco Identity Services Engine turns the network into a policy enforcement plane: macro and micro-segmentation, BYOD onboarding, and posture checks across wired, wireless, and VPN." },
        { title: "Encrypted Traffic Analytics", body: "Detect malware in TLS-encrypted flows without decryption, a unique capability that preserves privacy while catching command-and-control traffic that other IPS engines miss." },
        { title: "Webex + Collaboration depth", body: "When networking and collaboration come from the same vendor, QoS, identity, and security policies travel with the user, ideal for hybrid-work environments that demand reliable voice and video." },
        { title: "Unmatched ecosystem in the GCC", body: "Cisco has the largest installed base, the deepest local Cisco-certified talent pool, and TAC coverage across the GCC, which matters when you need to call someone at 2 a.m." },
      ],
    },
    productShowcase: {
      eyebrow: "Featured Solutions: Cisco Secure + Networking",
      heading: "Complete Cisco Product Portfolio",
      intro: "The reference stack for enterprise networking and security, unified by SecureX and powered by Cisco Talos threat intelligence.",
      products: [
        { icon: "shield", title: "Cisco Secure Firewall", description: "Firepower NGFW with Snort 3 intrusion prevention, encrypted traffic visibility, and Talos-powered threat intelligence." },
        { icon: "cloud", title: "Cisco Umbrella", description: "Cloud-delivered DNS security and secure internet gateway (SIG) blocking threats before connections are even established." },
        { icon: "lock", title: "Cisco Duo", description: "Multi-factor authentication and zero-trust access, verifies users and device health before granting application access." },
        { icon: "monitor", title: "Cisco Secure Endpoint", description: "Cloud-managed endpoint protection (formerly AMP) with EDR, threat hunting, and retrospective security." },
        { icon: "mail", title: "Cisco Secure Email", description: "Comprehensive email security with anti-phishing, BEC protection, DLP, encryption, and post-delivery URL rewriting." },
        { icon: "key", title: "Cisco Identity Services Engine", description: "Network access control (NAC) and policy engine, enforces context-aware access for users, devices, and IoT." },
        { icon: "network", title: "Cisco Catalyst & Nexus", description: "Enterprise switching for campus and data center with AI-driven analytics, programmability, and SD-Access integration." },
        { icon: "wifi", title: "Cisco Meraki", description: "Cloud-managed wireless, switching, security, and cameras, managed from a single dashboard with zero-touch deployment." },
        { icon: "globe", title: "Cisco Secure Client", description: "Unified remote access VPN client with posture assessment, endpoint compliance, and per-app VPN for mobile devices." },
        { icon: "eye", title: "Cisco XDR", description: "Cloud-native XDR correlating telemetry from Cisco Secure plus third-party tools for unified detection and response." },
        { icon: "zap", title: "Cisco Talos Intelligence", description: "One of the largest commercial threat intelligence teams, feeds real-time IOCs into every Cisco Secure product." },
        { icon: "gear", title: "Cisco SecureX", description: "Built-in cloud platform that unifies visibility, automation, and response across Cisco Secure and integrated partner tools." },
      ],
    },
    ctaHeading: "Talk to our IT Security Advisor",
  },
  {
    slug: "palo-alto-networks",
    name: "Palo Alto Networks",
    logo: "/logos/PaloAltoNetworks.svg",
    description:
      "Palo Alto Networks is the cybersecurity partner of choice, with Strata NGFWs, Prisma cloud security, and Cortex AI-driven SOC operations. Artiflex deploys Palo Alto across the UAE, Oman, and Saudi Arabia.",
    categories: ["network-security", "cloud", "app-security", "endpoint", "sase"],
    heroTagline: "The cybersecurity partner of choice",
    summaryHeadline: "Strata NGFW, Prisma cloud security, and Cortex AI-SOC, the industry's deepest platform.",
    summaryParagraphs: [
      "Artiflex IT delivers the Palo Alto Networks platform across the UAE, Oman, and Saudi Arabia. From PA-Series and VM-Series NGFWs to Prisma Access SASE, Prisma Cloud for AWS / Azure / GCP, and Cortex XDR / XSIAM for AI-driven SOC operations, we deploy and operate Palo Alto environments end-to-end.",
      "Our engineers handle App-ID, User-ID, and Content-ID policy design, Panorama centralised management, and Cortex onboarding, so you get prevention-first security with operational visibility that meets Gartner Magic Quadrant standards.",
    ],
    aboutHeading: "About Palo Alto Networks",
    aboutTagline: "Twelve consecutive years as a Gartner Magic Quadrant Leader",
    aboutFacts: [
      { label: "Founded", value: "2005, Santa Clara California" },
      { label: "Heritage", value: "Founded by Nir Zuk (co-founder of NetScreen)" },
      { label: "Management", value: "Panorama (firewall) + Strata Cloud Manager + Cortex" },
      { label: "Standout tech", value: "App-ID, User-ID, and Content-ID single-pass architecture, WildFire cloud sandbox with autonomous threat prevention, Cortex XSIAM AI-driven SOC, and Prisma Access SASE with native ZTNA 2.0", wide: true },
    ],
    whyVendor: {
      eyebrow: "Why Palo Alto Networks",
      title: "Why we recommend Palo Alto Networks to our customers",
      intro: "Palo Alto sets the engineering bar for NGFW and is the platform of choice when prevention-first security and a single integrated stack matter more than budget.",
      items: [
        { title: "Single-pass architecture", body: "App-ID, User-ID, Content-ID, and threat prevention run in one pass through the firewall, so you can enable every security feature without the multi-engine performance hit other NGFWs suffer." },
        { title: "WildFire cloud sandbox", body: "Autonomous threat prevention against zero-day malware, with verdicts delivered in seconds to every Palo Alto firewall worldwide. The reference standard for cloud-delivered sandboxing." },
        { title: "Prisma Access SASE", body: "Native cloud-delivered firewall, ZTNA 2.0, secure web gateway, and CASB on a single platform, scaling to 100M+ users with sub-10ms latency from regional points of presence." },
        { title: "Cortex XSIAM AI-SOC", body: "Replace your legacy SIEM with an AI-native platform that automates 90%+ of tier-1 SOC work, ideal for organisations facing analyst shortages or alert fatigue." },
        { title: "Gartner Magic Quadrant Leader", body: "Twelve consecutive years as a Leader for Network Firewalls, plus Leader status for SSE, EDR, and Cloud-Native Application Protection. Independent validation across the stack." },
        { title: "Industry's deepest threat research", body: "Unit 42 threat intelligence and incident response combined with WildFire and Cortex AI gives you both the protection and the detection telemetry the largest enterprises rely on." },
      ],
    },
    productShowcase: {
      eyebrow: "Featured Solutions: Strata · Prisma · Cortex",
      heading: "Complete Palo Alto Networks Product Portfolio",
      intro: "Three platforms covering network, cloud, and SOC operations, unified by Panorama and Cortex XSIAM with industry-leading threat prevention.",
      products: [
        { icon: "shield", title: "Strata NGFW (PA-Series)", description: "Industry-leading hardware firewalls with single-pass architecture, AI threat prevention, and ML-powered URL filtering." },
        { icon: "cpu", title: "VM-Series / CN-Series", description: "Virtual and container firewalls protecting workloads across AWS, Azure, GCP, and Kubernetes environments." },
        { icon: "cloud", title: "Prisma Cloud", description: "Cloud-native application protection platform (CNAPP), CSPM, CWPP, CIEM, IaC scanning, and shift-left security." },
        { icon: "globe", title: "Prisma Access (SASE)", description: "Cloud-delivered SASE with ZTNA 2.0, SWG, CASB, and FWaaS, secure connectivity for hybrid workforces at scale." },
        { icon: "eye", title: "Cortex XDR", description: "Industry-leading XDR that stitches together endpoint, network, cloud, and identity data for high-fidelity detections." },
        { icon: "activity", title: "Cortex XSIAM", description: "AI-driven security operations platform, replaces SIEM, SOAR, EDR, and threat intel with one unified data lake." },
        { icon: "bell", title: "Cortex XSOAR", description: "Security orchestration, automation, and response with 1,000+ integrations and case management for SOC teams." },
        { icon: "search", title: "Cortex Xpanse", description: "Attack surface management, continuously discovers and tracks every internet-facing asset before attackers do." },
        { icon: "zap", title: "Unit 42 Threat Intelligence", description: "World-class threat research and incident response, IR retainers, proactive assessments, and managed threat hunting." },
        { icon: "network", title: "IoT Security", description: "Agentless IoT/OT device discovery, risk assessment, and policy enforcement integrated natively into NGFWs." },
        { icon: "target", title: "DNS Security", description: "Cloud-based DNS protection blocking command-and-control, DNS tunneling, DGA-generated domains, and phishing." },
        { icon: "gear", title: "Panorama Management", description: "Centralized management for thousands of NGFWs with unified policy, automation, and rich analytics across deployments." },
      ],
    },
    ctaHeading: "Talk to our IT Security Advisor",
  },
  {
    slug: "kaspersky",
    name: "Kaspersky",
    logo: "/logos/kaspersky.svg",
    description:
      "Kaspersky delivers proven endpoint protection, EDR, and threat intelligence with the highest independent test scores in the industry. Artiflex deploys Kaspersky across the UAE, Oman, and Saudi Arabia.",
    categories: ["endpoint"],
    heroTagline: "Cybersecurity Built for You",
    summaryHeadline: "Endpoint protection that consistently tops independent test rankings, with low system impact.",
    summaryParagraphs: [
      "Artiflex IT delivers Kaspersky's full enterprise portfolio across the UAE, Oman, and Saudi Arabia. From Kaspersky Endpoint Security for Business and EDR Optimum / Expert to Kaspersky Hybrid Cloud Security and Threat Intelligence services, we design and operate Kaspersky environments end-to-end.",
      "Our engineers handle Kaspersky Security Center deployment, policy hardening, and MDR onboarding, so you get top-ranked malware detection without the operational drag that comes with heavy-footprint endpoint agents.",
    ],
    aboutHeading: "About Kaspersky",
    aboutTagline: "Independent testing's most awarded security vendor",
    aboutFacts: [
      { label: "Founded", value: "1997, Moscow (Swiss data infrastructure since 2018)" },
      { label: "Heritage", value: "Founded by Eugene Kaspersky, antivirus pioneer since 1989" },
      { label: "Management", value: "Kaspersky Security Center (KSC) on-prem or cloud" },
      { label: "Standout tech", value: "Adaptive Anomaly Control behavioural engine, Automatic Exploit Prevention, Kaspersky Security Network global threat cloud with 1B+ daily verdicts, and KasperskyOS for industrial cyber-immunity", wide: true },
    ],
    whyVendor: {
      eyebrow: "Why Kaspersky",
      title: "Why we recommend Kaspersky to our customers",
      intro: "Kaspersky leads independent malware-detection testing year after year, with a lightweight agent that doesn't slow user devices or aging hardware.",
      items: [
        { title: "Industry's highest independent test scores", body: "AV-TEST, AV-Comparatives, and SE Labs consistently rank Kaspersky #1 for protection. The most-awarded vendor across independent labs over the last decade." },
        { title: "Low system impact", body: "One of the lightest agents in the market, making Kaspersky a strong choice for legacy hardware, virtual desktop environments, and OT systems where every CPU cycle matters." },
        { title: "Exploit prevention without signatures", body: "Automatic Exploit Prevention catches zero-day exploits by detecting suspicious memory and execution patterns, not by waiting for a signature update." },
        { title: "Tiered EDR for any maturity level", body: "EDR Optimum for IT teams new to detection-and-response, EDR Expert for full SOC tooling, and Kaspersky MDR for organisations that want the SOC outsourced entirely." },
        { title: "Industrial / OT protection", body: "Kaspersky Industrial CyberSecurity (KICS) protects ICS, SCADA, and OT environments, ideal for energy, utilities, and manufacturing sectors across the GCC." },
        { title: "Data residency options", body: "Customer telemetry can be processed from Swiss data centres, with full transparency through Kaspersky's Global Transparency Initiative, important for regulated buyers." },
      ],
    },
    productShowcase: {
      eyebrow: "Featured Solutions: Kaspersky Next & XDR",
      heading: "Complete Kaspersky Product Portfolio",
      intro: "From endpoint and EDR to industrial OT protection, threat intelligence, and 24/7 MDR, all managed through Kaspersky Security Center.",
      products: [
        { icon: "monitor", title: "Endpoint Security for Business", description: "Multi-layered endpoint protection with anti-malware, application control, web control, and device control across Windows, Mac, and Linux." },
        { icon: "eye", title: "EDR Optimum / Expert", description: "Endpoint detection and response with root-cause analysis, threat hunting, and automated response actions across your estate." },
        { icon: "layers", title: "XDR Platform", description: "Extended detection and response correlating data from endpoint, network, email, and cloud for unified security operations." },
        { icon: "clock", title: "Managed Detection & Response", description: "24/7 MDR service backed by Kaspersky's elite GReAT threat research team, incident handling and proactive threat hunting." },
        { icon: "cloud", title: "Hybrid Cloud Security", description: "Workload protection for AWS, Azure, Google Cloud, VMware, and on-prem with light-agent and agentless options." },
        { icon: "cpu", title: "Industrial CyberSecurity", description: "OT-aware protection for ICS, SCADA, and industrial networks, protects PLCs, HMIs, and embedded systems." },
        { icon: "target", title: "Anti Targeted Attack (KATA)", description: "Sandbox and network sensors that detect targeted attacks, zero-days, and advanced persistent threats in real time." },
        { icon: "zap", title: "Threat Intelligence", description: "Curated intel feeds, APT reports, and threat lookup services from Kaspersky's globally recognized GReAT research team." },
        { icon: "users", title: "Security Awareness Training", description: "Interactive simulation-based training that measurably reduces phishing click rates and risky user behavior." },
        { icon: "mail", title: "Security for Mail Server", description: "Anti-spam, anti-phishing, and anti-malware for Microsoft Exchange, Linux mail gateways, and Office 365." },
        { icon: "cpu", title: "Embedded Systems Security", description: "Specialized protection for ATMs, POS systems, kiosks, and other embedded Windows devices with low resource footprints." },
        { icon: "gear", title: "Security Center (Console)", description: "Unified management console for the full Kaspersky stack, policies, reporting, and incident response from one place." },
      ],
    },
    ctaHeading: "Talk to our IT Security Advisor",
  },
  {
    slug: "3cx",
    name: "3CX",
    logo: "/logos/3CX.svg",
    description:
      "3CX is the unified communications platform that delivers voice, video, live chat, and SMS on a single open-standards PBX. Artiflex deploys 3CX across the UAE, Oman, and Saudi Arabia.",
    categories: ["comms"],
    heroTagline: "Communications, simplified",
    summaryHeadline: "Voice, video, messaging, and live chat on one open-standards platform, on-prem or cloud.",
    summaryParagraphs: [
      "Artiflex IT delivers 3CX deployments across the UAE, Oman, and Saudi Arabia. From SIP trunk procurement and hardware phone provisioning to mobile app rollouts, contact-centre queues, and Microsoft Teams direct routing, we design and operate 3CX environments end-to-end.",
      "Our engineers handle PBX sizing, call-flow design, CRM integration, and ongoing maintenance, so you get enterprise unified communications at SMB pricing, with no per-extension license traps.",
    ],
    aboutHeading: "About 3CX",
    aboutTagline: "Open-standards unified communications for 600,000+ businesses worldwide",
    aboutFacts: [
      { label: "Founded", value: "2005, Nicosia Cyprus" },
      { label: "Heritage", value: "Open-standards SIP PBX from day one, pioneered Windows-based business VoIP" },
      { label: "Management", value: "3CX Management Console (web-based, single pane)" },
      { label: "Standout tech", value: "Open SIP standards (works with any SIP trunk or phone), free WebRTC video conferencing, live chat and SMS, mobile apps for iOS and Android, and Microsoft Teams direct routing without extra licenses", wide: true },
    ],
    whyVendor: {
      eyebrow: "Why 3CX",
      title: "Why we recommend 3CX to our customers",
      intro: "3CX wins on simplicity, transparent pricing, and freedom from vendor lock-in, three things every IT manager wants when replacing a legacy PBX.",
      items: [
        { title: "Per-system, not per-user pricing", body: "Pay one annual license fee based on simultaneous calls, not per extension. Add 200 users for free as long as call volume fits, transformative TCO for fast-growing teams." },
        { title: "Bring your own SIP trunk", body: "Open SIP standards mean you keep your existing carrier relationships, no proprietary lock-in, no \"approved trunk\" tax. Works with every major UAE telco and global ITSP." },
        { title: "Truly unified workspace", body: "Voice, video, live chat, SMS, and team messaging on one app, one phone number, one identity, on desktop, mobile, or any SIP IP-phone you already own." },
        { title: "Self-hosted or cloud", body: "Run 3CX on-prem on Windows or Linux, in your private cloud, or as a fully managed 3CX-hosted instance, your choice of deployment, with the same feature set." },
        { title: "Microsoft Teams direct routing", body: "Use 3CX as the SIP backbone behind Teams, getting reliable PSTN connectivity without paying for Microsoft Calling Plans or Operator Connect licenses." },
        { title: "Built-in contact centre", body: "Skills-based routing, real-time wallboards, call recording, IVR, and CRM integrations included, no extra contact-centre license required for most deployments." },
      ],
    },
    productShowcase: {
      eyebrow: "Featured Solutions: 3CX V20",
      heading: "Complete 3CX Product Portfolio",
      intro: "Unified communications spanning PBX, video, live chat, contact center, and CRM integration, hosted by 3CX or self-deployed.",
      products: [
        { icon: "phone", title: "3CX Phone System (PBX)", description: "Modern IP PBX deployed on-premise or in your cloud, slashes telco costs and replaces legacy hardware PBX systems." },
        { icon: "cloud", title: "3CX Hosted", description: "Fully hosted 3CX in 3CX's data centers, zero infrastructure, automatic updates, and dedicated instances per customer." },
        { icon: "monitor", title: "3CX Web Client", description: "Browser-based softphone with calls, chat, video, presence, and contact management, no installation required." },
        { icon: "phone", title: "3CX Mobile Apps", description: "iOS and Android apps with PUSH notifications, use your office extension on the go with full PBX features." },
        { icon: "users", title: "Video Conferencing", description: "Browser-based video meetings with screen sharing, polls, whiteboards, and YouTube live-streaming, no plugins needed." },
        { icon: "mail", title: "Live Chat & Messaging", description: "Website live chat that converts to voice or video calls, plus unified WhatsApp, SMS, and Facebook messaging routing." },
        { icon: "activity", title: "Contact Center Features", description: "Call queues, IVR, skills-based routing, recording, wallboards, and reporting, built into every 3CX edition." },
        { icon: "shield", title: "3CX SBC", description: "Free Session Border Controller for connecting remote IP phones securely back to the PBX over a single TCP tunnel." },
        { icon: "network", title: "SIP Trunk Integrations", description: "Pre-configured for 100+ certified SIP trunk providers worldwide, including UAE-based Etisalat and du compatibility." },
        { icon: "grid", title: "CRM Integrations", description: "Native integration with Salesforce, HubSpot, Microsoft 365, Zoho, Pipedrive, and 30+ other CRM systems." },
        { icon: "globe", title: "Click2Call Browser Extension", description: "Chrome and Edge extensions that turn any phone number on any web page into a one-click call from 3CX." },
        { icon: "gear", title: "Management Console", description: "Web-based admin console for all PBX configuration, user management, and call analytics, accessible from anywhere." },
      ],
    },
    ctaHeading: "Talk to our Communications Specialist",
  },
  {
    slug: "nutanix",
    name: "Nutanix",
    logo: "/logos/Nutanix.svg",
    description:
      "Nutanix Cloud Platform unifies compute, storage, networking, and Kubernetes in a single hyperconverged stack, on-prem or across AWS and Azure. Artiflex deploys Nutanix across the UAE, Oman, and Saudi Arabia.",
    categories: ["cloud", "networking", "servers"],
    heroTagline: "Hybrid Multicloud, Simplified",
    summaryHeadline: "Hyperconverged infrastructure that replaces three-tier datacentres with one Web-scale platform.",
    summaryParagraphs: [
      "Artiflex IT delivers the Nutanix Cloud Platform across the UAE, Oman, and Saudi Arabia. From AHV-powered hyperconverged clusters and Nutanix Files / Objects unified storage to Nutanix Cloud Manager, Kubernetes Engine, and Database Service (NDB), we design and operate Nutanix environments end-to-end.",
      "Our engineers handle cluster sizing, AHV migration from VMware, capacity planning, and ongoing lifecycle management, so you get datacentre-class performance with cloud-like operational simplicity.",
    ],
    aboutHeading: "About Nutanix",
    aboutTagline: "The pioneer of hyperconverged infrastructure, now a full hybrid-cloud platform",
    aboutFacts: [
      { label: "Founded", value: "2009, San Jose California" },
      { label: "Heritage", value: "Pioneered hyperconverged infrastructure (HCI), expanded into hybrid multicloud" },
      { label: "Management", value: "Prism Central + Nutanix Cloud Manager (NCM)" },
      { label: "Standout tech", value: "AHV hypervisor included at no extra cost, Acropolis distributed storage fabric, Nutanix Cloud Clusters (NC2) for AWS and Azure, Nutanix Database Service (NDB) for one-click DB provisioning, and AOS that scales linearly from 3 to 100+ nodes", wide: true },
    ],
    whyVendor: {
      eyebrow: "Why Nutanix",
      title: "Why we recommend Nutanix to our customers",
      intro: "Nutanix simplifies datacentre operations by collapsing the SAN, server, and hypervisor stack into one Web-scale appliance you can manage from a browser.",
      items: [
        { title: "Hypervisor included", body: "Nutanix AHV is a production-grade hypervisor included at no extra cost, ideal for organisations facing VMware license cost pressure post-Broadcom." },
        { title: "Linear scale-out", body: "Add nodes to scale compute and storage together. No SAN forklift upgrades, no specialised storage admins, capacity planning becomes a one-button decision." },
        { title: "Hybrid cloud without re-architecture", body: "Nutanix Cloud Clusters extend your on-prem AOS into AWS and Azure with identical operations, the only HCI platform that runs natively in public cloud." },
        { title: "One-click everything", body: "One-click upgrades, one-click DR, one-click cluster expansion. The platform was built for IT teams that don't want to babysit infrastructure." },
        { title: "Best-in-class storage performance", body: "Distributed storage fabric with local-data-first reads delivers consistent sub-millisecond latency, suitable for OLTP databases, VDI, and high-transaction workloads." },
        { title: "Strong VMware migration story", body: "Move-by-Migration tooling and AHV's broad VM support make Nutanix the natural exit ramp from VMware for teams looking at Broadcom-era pricing changes." },
      ],
    },
    productShowcase: {
      eyebrow: "Featured Solutions: Nutanix Cloud Platform",
      heading: "Complete Nutanix Product Portfolio",
      intro: "Hyperconverged infrastructure, hybrid cloud, Kubernetes, and database-as-a-service, all managed from one Prism console.",
      products: [
        { icon: "cpu", title: "AOS (Acropolis OS)", description: "The core hyperconverged operating system, runs compute, storage, networking, and virtualization on standard servers." },
        { icon: "server", title: "AHV Hypervisor", description: "Built-in enterprise hypervisor included with every Nutanix license, no separate VMware or Hyper-V licensing required." },
        { icon: "cloud", title: "Nutanix Cloud Manager (NCM)", description: "Self-service cloud platform with cost governance, automation, security compliance, and multi-cloud operations." },
        { icon: "folder", title: "Files", description: "Software-defined file storage that scales linearly, replaces traditional NAS for SMB and NFS workloads." },
        { icon: "archive", title: "Objects", description: "S3-compatible object storage that scales to petabytes, for backup, archive, and modern cloud-native applications." },
        { icon: "database", title: "Volumes", description: "iSCSI block storage for external workloads, extends Nutanix storage to bare-metal servers and other hypervisors." },
        { icon: "database", title: "Database Service (NDB)", description: "Database lifecycle automation for Oracle, SQL Server, PostgreSQL, MySQL, and MongoDB, provisioning, patching, cloning." },
        { icon: "grid", title: "Kubernetes Platform (NKP)", description: "Production-grade Kubernetes management across edge, data center, and public cloud with built-in lifecycle automation." },
        { icon: "cloud", title: "Cloud Clusters (NC2)", description: "Run native Nutanix on AWS and Azure, same operations, same UI, with hybrid cloud bursting and disaster recovery." },
        { icon: "shield", title: "Flow Network Security", description: "Software-defined microsegmentation and network security policies enforced at the VM level, no external firewall needed." },
        { icon: "zap", title: "Move", description: "Free migration tool that moves workloads from ESXi, Hyper-V, AWS, and Azure to Nutanix AHV with minimal downtime." },
        { icon: "eye", title: "Prism (Management)", description: "Unified management console with AI-driven analytics, one-click upgrades, and capacity planning across all clusters." },
      ],
    },
    ctaHeading: "Talk to our Infrastructure Specialist",
  },
  {
    slug: "eset",
    name: "ESET",
    logo: "/logos/ESET.svg",
    description:
      "ESET delivers lightweight, high-detection endpoint security with the lowest performance impact in the industry. Artiflex deploys ESET PROTECT across the UAE, Oman, and Saudi Arabia.",
    categories: ["endpoint"],
    heroTagline: "Progress. Protected.",
    summaryHeadline: "Lightweight endpoint security with top-tier detection and the lowest system impact in the industry.",
    summaryParagraphs: [
      "Artiflex IT delivers ESET PROTECT across the UAE, Oman, and Saudi Arabia. From ESET Endpoint Security and ESET Inspect (EDR) to ESET Cloud Office Security for Microsoft 365 and ESET Server Security, we design and operate ESET environments end-to-end.",
      "Our engineers handle ESET PROTECT console deployment, policy hardening, and EDR rule tuning, so you get strong protection on legacy hardware, VDI estates, and lean IT environments where every megabyte of RAM counts.",
    ],
    aboutHeading: "About ESET",
    aboutTagline: "Slovak-engineered cybersecurity since 1987, trusted by 110M+ users",
    aboutFacts: [
      { label: "Founded", value: "1992, Bratislava Slovakia (research lineage to 1987)" },
      { label: "Heritage", value: "European-owned, independent, with three decades of antivirus research" },
      { label: "Management", value: "ESET PROTECT Cloud or on-prem (single console)" },
      { label: "Standout tech", value: "LiveGrid cloud-reputation system, Advanced Machine Learning detection engine, ESET LiveGuard cloud sandbox, ransomware shield with rollback, and one of the lowest CPU and RAM footprints in independent testing", wide: true },
    ],
    whyVendor: {
      eyebrow: "Why ESET",
      title: "Why we recommend ESET to our customers",
      intro: "ESET is the right choice when you need top-tier endpoint detection without slowing down user devices, VDI sessions, or aging hardware that other agents grind to a halt.",
      items: [
        { title: "Industry's lightest agent", body: "Independent testing consistently shows ESET with the lowest system impact, less than half the RAM and CPU of most competitors. The default choice for VDI, legacy estates, and lean SMBs." },
        { title: "Top-tier independent detection", body: "Regular Advanced+ ratings from AV-Comparatives and high marks at AV-TEST. ESET catches what it needs to without the bloat that comes with larger agents." },
        { title: "Multi-layered defence", body: "Reputation, machine learning, behavioural detection, ransomware shield, exploit blocker, and network attack protection all in one agent. No add-on modules to upgrade later." },
        { title: "European data residency", body: "ESET PROTECT Cloud runs from EU data centres with GDPR-aligned data handling, a hard requirement for some regulated GCC buyers." },
        { title: "Predictable pricing", body: "Per-seat licensing with no surprise modules, ESET PROTECT Advanced and Complete tiers include EDR, full-disk encryption, and Mail Security in the bundle." },
        { title: "Strong VDI / RDS support", body: "Officially supported on Citrix, VMware Horizon, and Microsoft AVD with golden-image-friendly deployment, important for healthcare, finance, and call-centre VDI estates." },
      ],
    },
    productShowcase: {
      eyebrow: "Featured Solutions: ESET PROTECT",
      heading: "Complete ESET Product Portfolio",
      intro: "Lightweight, top-detection security across endpoint, server, mail, encryption, and MFA, managed from one ESET PROTECT console.",
      products: [
        { icon: "gear", title: "ESET PROTECT Platform", description: "Cloud-based or on-prem unified security console for managing the full ESET stack, endpoints, servers, mail, and EDR." },
        { icon: "monitor", title: "Endpoint Security", description: "Award-winning endpoint protection with low system impact, machine learning, and exploit blocking for Windows, Mac, and Linux." },
        { icon: "eye", title: "ESET Inspect (EDR)", description: "Endpoint detection and response with deep visibility, customizable rules, and one-click remediation across the estate." },
        { icon: "cloud", title: "Cloud Office Security", description: "Email and collaboration security for Microsoft 365 and Google Workspace, anti-malware, anti-phishing, and DLP." },
        { icon: "mail", title: "Mail Security", description: "On-prem mail gateway protection for Microsoft Exchange and IBM Domino with anti-spam, content filtering, and quarantine." },
        { icon: "server", title: "File Security", description: "Server protection for Windows and Linux file servers, anti-malware optimized for high-throughput storage workloads." },
        { icon: "lock", title: "Full Disk Encryption", description: "FIPS 140-2 validated encryption for Windows and Mac, centrally managed via ESET PROTECT for compliance and recovery." },
        { icon: "key", title: "Secure Authentication (2FA)", description: "One-time-password and push-based MFA for VPN, RDP, and web applications, integrates with AD and RADIUS." },
        { icon: "zap", title: "LiveGuard Advanced", description: "Cloud-based sandboxing that detonates suspicious files in an isolated environment to detect zero-day threats." },
        { icon: "search", title: "Threat Intelligence", description: "Curated APT reports, IOC feeds, and ESET Threat Intelligence portal for proactive defense and threat hunting." },
        { icon: "clock", title: "MDR Service", description: "24/7 managed detection and response with ESET threat hunters investigating, containing, and responding to incidents." },
        { icon: "phone", title: "Endpoint Security for Mobile", description: "iOS and Android device security with app reputation, anti-phishing, and remote wipe, managed alongside other endpoints." },
      ],
    },
    ctaHeading: "Talk to our IT Security Advisor",
  },
  {
    slug: "f5",
    name: "F5 Networks",
    logo: "/logos/f5.svg",
    description:
      "F5 secures and delivers every app with industry-leading application services, WAF, and bot protection. Artiflex deploys F5 BIG-IP and Distributed Cloud across the UAE, Oman, and Saudi Arabia.",
    categories: ["app-security", "networking"],
    heroTagline: "Apps Run the World",
    summaryHeadline: "Application delivery, load balancing, WAF, and bot defence on one platform.",
    summaryParagraphs: [
      "Artiflex IT delivers the F5 application services portfolio across the UAE, Oman, and Saudi Arabia. From BIG-IP LTM / GTM / ASM / APM and NGINX Plus to F5 Distributed Cloud Services (XC) for multi-cloud WAAP, bot defence, and SaaS-delivered WAF, we design and operate F5 environments end-to-end.",
      "Our engineers handle iRule scripting, WAF policy tuning, BIG-IQ centralised management, and cloud onboarding, so you get rock-solid app delivery and the security depth that enterprise web and API workloads need.",
    ],
    aboutHeading: "About F5",
    aboutTagline: "Twenty-five years of being the standard for application delivery",
    aboutFacts: [
      { label: "Founded", value: "1996, Seattle Washington" },
      { label: "Heritage", value: "Pioneered application delivery controllers, acquired NGINX (2019) and Shape Security (2020)" },
      { label: "Management", value: "BIG-IQ + F5 Distributed Cloud Console" },
      { label: "Standout tech", value: "BIG-IP TMOS programmable proxy, iRules scripting for any L4-L7 logic, NGINX Plus high-performance reverse proxy, Distributed Cloud WAAP, Shape AI-driven bot defence, and SSL Orchestrator for centralised TLS inspection", wide: true },
    ],
    whyVendor: {
      eyebrow: "Why F5",
      title: "Why we recommend F5 to our customers",
      intro: "F5 is the reference standard for application delivery and the right partner when you need WAF, bot defence, and load balancing that can scale to the largest banking, telco, and government workloads.",
      items: [
        { title: "Industry's most programmable proxy", body: "iRules and iControl APIs let you write any logic at L4-L7, the reason F5 sits in front of mission-critical banking, payment, and government applications globally." },
        { title: "Enterprise-grade WAAP", body: "Distributed Cloud WAAP combines WAF, DDoS, API security, and Shape bot defence on one SaaS platform, with no infrastructure to deploy. Strong fit for hybrid cloud apps." },
        { title: "AI-driven bot defence", body: "Shape Security telemetry from 4B+ daily transactions powers bot detection that distinguishes humans, good bots, and malicious automation with near-zero false positives." },
        { title: "NGINX for modern apps", body: "F5 owns NGINX, the most widely-used web server. Run NGINX Plus as your Kubernetes Ingress, API gateway, or microservices proxy with enterprise support." },
        { title: "SSL Orchestrator", body: "Centralised TLS decryption / re-encryption with policy-based service chaining, decrypt once and feed cleartext flows to IPS, DLP, sandbox, and SWG without daisy-chaining decryptions." },
        { title: "Hardware + virtual + SaaS flexibility", body: "Deploy F5 as iSeries / VIPRION hardware, BIG-IP virtual edition, NGINX containers, or fully managed Distributed Cloud, often all four in the same enterprise architecture." },
      ],
    },
    productShowcase: {
      eyebrow: "Featured Solutions: BIG-IP · NGINX · Distributed Cloud",
      heading: "Complete F5 Networks Product Portfolio",
      intro: "Application delivery, WAF, API security, and bot defense across hardware, virtual, and SaaS form factors.",
      products: [
        { icon: "layers", title: "BIG-IP LTM", description: "Industry-leading local traffic manager and load balancer, Layer 4-7 traffic management for the highest-traffic applications." },
        { icon: "shield", title: "BIG-IP Advanced WAF", description: "Application security with behavioral DDoS protection, bot defense, and machine-learning attack detection." },
        { icon: "key", title: "BIG-IP APM", description: "Access Policy Manager, unified identity and access for VPN, SSO, MFA, and zero-trust application access." },
        { icon: "shield", title: "BIG-IP AFM", description: "Advanced Firewall Manager, high-performance network firewall and DDoS protection for service providers and enterprises." },
        { icon: "globe", title: "NGINX", description: "High-performance web server, reverse proxy, load balancer, and API gateway, powering 30%+ of the world's busiest sites." },
        { icon: "cloud", title: "F5 Distributed Cloud", description: "SaaS platform delivering app delivery, WAAP, multi-cloud networking, and edge computing as a service." },
        { icon: "eye", title: "F5 Bot Defense", description: "Behavioral analysis blocks credential stuffing, account takeover, and inventory hoarding bots, formerly Shape Security." },
        { icon: "zap", title: "SSL Orchestrator", description: "High-performance SSL/TLS decryption hub that offloads inspection from firewalls, IPS, and DLP, one decrypt, many tools." },
        { icon: "network", title: "API Security", description: "Discover, secure, and manage REST/GraphQL APIs with positive-security policies, abuse detection, and rate limiting." },
        { icon: "target", title: "DDoS Hybrid Defender", description: "Multi-layer DDoS protection with on-prem mitigation plus cloud scrubbing for volumetric attack defense." },
        { icon: "grid", title: "NGINX App Protect", description: "WAF and DoS protection embedded directly into NGINX Plus, shift security closer to the application." },
        { icon: "gear", title: "BIG-IQ Centralized Mgmt", description: "Centralized management, analytics, and policy enforcement across hundreds of BIG-IP devices in any environment." },
      ],
    },
    ctaHeading: "Talk to our Application Security Specialist",
  },
  {
    slug: "microsoft-azure",
    name: "Microsoft Azure",
    logo: "/logos/Microsoft_Azure.svg",
    description:
      "Microsoft Azure is the enterprise hyperscale cloud, with regional UAE presence, AI services, and tight integration with Microsoft 365 and Entra. Artiflex deploys Azure across the UAE, Oman, and Saudi Arabia.",
    categories: ["cloud"],
    heroTagline: "Invent with Purpose",
    summaryHeadline: "Hyperscale compute, AI, and hybrid cloud, with UAE-resident Azure regions and Microsoft 365 integration.",
    summaryParagraphs: [
      "Artiflex IT delivers Microsoft Azure across the UAE, Oman, and Saudi Arabia. From landing-zone design and Azure Migrate workloads to Azure Virtual Desktop, Azure Stack HCI for hybrid edge, Microsoft Sentinel SIEM, and Azure OpenAI Service, we architect and operate Azure environments end-to-end.",
      "Our engineers handle subscription governance, RBAC and Entra Conditional Access, FinOps cost control, and Azure Arc multi-cloud management, so you get hyperscale capability with the cost discipline and compliance posture enterprise buyers need.",
    ],
    aboutHeading: "About Microsoft Azure",
    aboutTagline: "The enterprise hyperscale cloud with deepest Microsoft 365 integration",
    aboutFacts: [
      { label: "Founded", value: "2010, Redmond Washington (announced 2008 as Azure)" },
      { label: "Heritage", value: "60+ global regions including UAE North (Dubai) and UAE Central (Abu Dhabi)" },
      { label: "Management", value: "Azure Portal + Azure Resource Manager + Microsoft Cost Management" },
      { label: "Standout tech", value: "Native UAE data residency, Microsoft Sentinel cloud-native SIEM/SOAR, Azure OpenAI Service with GPT-4 and DALL-E, Azure Arc for multi-cloud and edge management, and seamless identity with Microsoft Entra ID", wide: true },
    ],
    whyVendor: {
      eyebrow: "Why Microsoft Azure",
      title: "Why we recommend Microsoft Azure to our customers",
      intro: "Azure is the strongest fit for organisations already invested in Microsoft 365, Active Directory, or Windows Server, and the leading cloud for AI and regulated UAE workloads.",
      items: [
        { title: "UAE data residency", body: "Azure UAE North (Dubai) and UAE Central (Abu Dhabi) regions enable customer data, backup, and disaster recovery to remain inside the UAE, critical for banking, healthcare, and government." },
        { title: "Microsoft 365 + Entra integration", body: "Shared identity with Entra ID (Azure AD), unified governance, and Conditional Access policies that span Azure, M365, and SaaS, no separate identity store to maintain." },
        { title: "Azure OpenAI Service", body: "Enterprise-grade access to GPT-4, GPT-3.5, embeddings, and DALL-E with private networking and Microsoft compliance, the right path for production gen-AI workloads." },
        { title: "Hybrid and edge with Azure Arc", body: "Manage on-prem Windows / Linux servers, Kubernetes clusters, and even AWS / GCP resources from the Azure Portal, true hybrid governance without a separate console." },
        { title: "Microsoft Sentinel cloud SIEM", body: "Cloud-native SIEM/SOAR with built-in Microsoft threat intel, low entry cost, and 350+ connectors, ideal for organisations replacing legacy SIEMs at end-of-life." },
        { title: "Compliance breadth", body: "More compliance certifications than any other cloud provider, including ISR 03-22 alignment for UAE government, NESA, and ADHICS-aligned workloads in Abu Dhabi." },
      ],
    },
    productShowcase: {
      eyebrow: "Featured Solutions: Azure + UAE Data Residency",
      heading: "Complete Microsoft Azure Product Portfolio",
      intro: "200+ Azure services across compute, data, AI, identity, and security, with UAE North and UAE Central regions for local data residency.",
      products: [
        { icon: "cpu", title: "Virtual Machines", description: "Scalable Windows and Linux VMs with hundreds of sizes, from burstable B-series to GPU and HPC instances." },
        { icon: "grid", title: "Azure Kubernetes Service", description: "Managed Kubernetes with built-in CI/CD, monitoring, and security, production-grade container orchestration at scale." },
        { icon: "archive", title: "Azure Storage", description: "Blob, File, Queue, and Table storage with tiered pricing, geo-redundancy, and immutable storage for compliance." },
        { icon: "network", title: "Azure Networking", description: "VNet, Load Balancer, Application Gateway, ExpressRoute, and Front Door, global secure networking fabric." },
        { icon: "database", title: "Azure SQL & Cosmos DB", description: "Fully managed relational and NoSQL databases with built-in HA, automatic backups, and intelligent performance tuning." },
        { icon: "key", title: "Microsoft Entra ID", description: "Cloud identity and access management, SSO, MFA, conditional access, and privileged identity management." },
        { icon: "shield", title: "Defender for Cloud", description: "CSPM and CWPP for multi-cloud, continuous security posture management with compliance and threat protection." },
        { icon: "eye", title: "Microsoft Sentinel", description: "Cloud-native SIEM and SOAR with built-in AI, threat intelligence, and 300+ connectors for unified security operations." },
        { icon: "activity", title: "Azure Monitor", description: "End-to-end observability with logs, metrics, traces, application insights, and infrastructure monitoring." },
        { icon: "clock", title: "Backup & Site Recovery", description: "Cloud-based backup and disaster recovery for VMs, files, SQL, and on-prem workloads with RPO/RTO guarantees." },
        { icon: "cloud", title: "Azure Arc", description: "Extend Azure management to on-prem, multi-cloud, and edge, Kubernetes, SQL, and VMs governed as Azure resources." },
        { icon: "zap", title: "Azure AI Services", description: "OpenAI, Cognitive Services, ML Studio, and Document Intelligence, production-grade AI/ML for enterprise applications." },
      ],
    },
    ctaHeading: "Talk to our Cloud Specialist",
  },
  {
    slug: "huawei",
    name: "Huawei",
    logo: "/logos/huawei.png",
    description:
      "Huawei delivers enterprise networking, wireless, and power infrastructure with aggressive price-performance and AI-driven NOS. Artiflex deploys Huawei across the UAE, Oman, and Saudi Arabia.",
    categories: ["networking", "power"],
    heroTagline: "Building a Fully Connected, Intelligent World",
    summaryHeadline: "Carrier-class networking, compute, and storage with aggressive price-performance.",
    summaryParagraphs: [
      "Artiflex IT delivers the Huawei enterprise portfolio across the UAE, Oman, and Saudi Arabia. From CloudEngine data-centre switches and S-series campus switches to FusionServer compute, OceanStor storage, AirEngine Wi-Fi 7, and eKit SMB networking, we design and operate Huawei environments end-to-end.",
      "Our engineers handle iMaster NCE-Campus rollouts, intent-based networking design, and OceanStor migration, so you get carrier-grade hardware and AI-driven operations at price points that beat western alternatives by meaningful margins.",
    ],
    aboutHeading: "About Huawei",
    aboutTagline: "The world's largest provider of carrier-grade ICT infrastructure",
    aboutFacts: [
      { label: "Founded", value: "1987, Shenzhen China" },
      { label: "Heritage", value: "Began in telco infrastructure, expanded to enterprise networking, storage, and cloud" },
      { label: "Management", value: "iMaster NCE (network) + DeviceManager (storage) + FusionDirector (compute)" },
      { label: "Standout tech", value: "Wi-Fi 7 AirEngine APs with 13 Gbps capacity, OceanStor all-flash arrays with built-in ransomware protection, CloudEngine data-centre switches up to 400G, and Network Cloud Engine (NCE) AI-driven intent-based networking", wide: true },
    ],
    whyVendor: {
      eyebrow: "Why Huawei",
      title: "Why we recommend Huawei to our customers",
      intro: "Huawei wins on price-performance, scale, and engineering depth, the right choice when budget pressure or aggressive bandwidth requirements rule out tier-one western OEMs.",
      items: [
        { title: "Aggressive price-performance", body: "Comparable port density, throughput, and feature parity at 30-50% lower acquisition cost than Cisco or Juniper, ideal for greenfield campus builds and budget-constrained refreshes." },
        { title: "Wi-Fi 7 leadership", body: "AirEngine Wi-Fi 7 APs are among the first to market with 13 Gbps capacity, multi-link operation, and AI-driven RF optimisation, well suited to dense user environments." },
        { title: "AI-driven NOS", body: "Network Cloud Engine (NCE) brings intent-based networking, predictive analytics, and AI fault diagnosis to campus, branch, and data-centre fabrics, capabilities that match top-tier western peers." },
        { title: "Carrier-grade reliability", body: "Huawei builds the same hardware platforms used inside the world's largest telco networks, the underlying chassis, optics, and supervisor design come from carrier engineering, not enterprise compromises." },
        { title: "Strong storage portfolio", body: "OceanStor all-flash arrays deliver multi-million IOPS with built-in ransomware detection, snapshot-based recovery, and active-active replication for HA across data centres." },
        { title: "Local Huawei presence in the GCC", body: "Strong regional team, training centres, and spare-parts depots across the UAE and Saudi Arabia, important for fast RMA and field engineering on critical infrastructure." },
      ],
    },
    productShowcase: {
      eyebrow: "Featured Solutions: Huawei Enterprise",
      heading: "Complete Huawei Product Portfolio",
      intro: "Networking, compute, storage, and security infrastructure built on carrier-grade hardware and AI-driven NOS.",
      products: [
        { icon: "shield", title: "HiSecEngine Firewalls", description: "USG-series next-gen firewalls with AI-powered threat detection, IPS, and integrated SD-WAN for branch to data center." },
        { icon: "network", title: "CloudEngine Switches", description: "Data center and campus switches with 400GbE/800GbE support, intent-driven networking, and AI traffic optimization." },
        { icon: "wifi", title: "AirEngine Wi-Fi 6/7", description: "High-density wireless access points with AI radio calibration and smart antenna technology for stadium-grade coverage." },
        { icon: "globe", title: "AR Routers", description: "Enterprise routers for branch connectivity with integrated SD-WAN, VPN, IPS, and 4G/5G failover support." },
        { icon: "archive", title: "OceanStor Storage", description: "All-flash, hybrid, and distributed storage systems with built-in deduplication, replication, and ransomware protection." },
        { icon: "server", title: "FusionServer", description: "Intel Xeon and Kunpeng-based rack, blade, and high-density servers for enterprise and data center workloads." },
        { icon: "cloud", title: "Huawei Cloud Stack", description: "Hybrid cloud solution that delivers public-cloud-like services on customer premises with consistent APIs." },
        { icon: "gear", title: "iMaster NCE", description: "Network controller with AI-driven analytics and intent-based automation for campus, WAN, and data center networks." },
        { icon: "eye", title: "HiSec Insight", description: "Security situational awareness platform with NDR, advanced threat detection, and automated response playbooks." },
        { icon: "target", title: "Anti-DDoS", description: "High-performance DDoS mitigation appliances and cloud scrubbing for service providers and large enterprises." },
        { icon: "cpu", title: "FusionCube HCI", description: "Hyperconverged infrastructure with integrated compute, storage, and networking for virtualization and VDI deployments." },
        { icon: "activity", title: "eSight Management", description: "Unified IT operations management platform monitoring servers, storage, network, and applications from one console." },
      ],
    },
    ctaHeading: "Talk to our Infrastructure Specialist",
  },
  {
    slug: "trend-micro",
    name: "Trend Micro",
    logo: "/logos/Trend_Micro.svg",
    description:
      "Trend Micro Vision One unifies XDR, attack surface management, and cloud workload security on one AI-powered platform. Artiflex deploys Trend Micro across the UAE, Oman, and Saudi Arabia.",
    categories: ["endpoint", "cloud"],
    heroTagline: "The World's Cybersecurity Leader",
    summaryHeadline: "Vision One, the unified XDR platform spanning endpoint, email, cloud, and network.",
    summaryParagraphs: [
      "Artiflex IT delivers the Trend Micro Vision One platform across the UAE, Oman, and Saudi Arabia. From Trend Vision One Endpoint Security and Email Security to Cloud One workload protection for AWS / Azure / GCP, Network Security, and Attack Surface Management, we deploy and operate Trend environments end-to-end.",
      "Our engineers handle Vision One onboarding, XDR rule tuning, attack-surface discovery, and managed-detection escalation paths, so you get genuine cross-layer correlation without the operational drag of stitching point tools together.",
    ],
    aboutHeading: "About Trend Micro",
    aboutTagline: "Three decades of cloud and endpoint security innovation",
    aboutFacts: [
      { label: "Founded", value: "1988, Tokyo Japan (now also Irving Texas)" },
      { label: "Heritage", value: "Founded by Steve Chang, pioneer in centrally-managed antivirus, acquired Cloud Conformity (CSPM) and Cloudtamer" },
      { label: "Management", value: "Trend Vision One unified console" },
      { label: "Standout tech", value: "Vision One XDR with native endpoint, email, cloud, and network telemetry, Smart Protection Network global threat intel, Cloud One workload security with Deep Security, and AI-driven Attack Surface Risk Management (ASRM)", wide: true },
    ],
    whyVendor: {
      eyebrow: "Why Trend Micro",
      title: "Why we recommend Trend Micro to our customers",
      intro: "Trend Micro is the right XDR partner when you need genuine cross-layer correlation, not just a security vendor that bolted \"XDR\" onto their endpoint product after the fact.",
      items: [
        { title: "True native XDR", body: "Vision One correlates telemetry from endpoint, email, server, cloud, and network sensors built by Trend, not third-party connectors, which is why it consistently leads MITRE Engenuity evaluations." },
        { title: "Best-in-class cloud workload security", body: "Cloud One (formerly Deep Security) protects AWS, Azure, GCP, and container workloads with the deepest agentless option in the market, runtime, posture, container scan, and file integrity in one." },
        { title: "Attack Surface Risk Management", body: "ASRM continuously discovers and ranks risk across users, devices, cloud assets, and identities, helping security leaders prioritise the next remediation instead of drowning in alerts." },
        { title: "MITRE Engenuity leader", body: "Top-tier results across all rounds of MITRE ATT&CK evaluations, independent validation that the detection content actually catches real adversary techniques." },
        { title: "Strong regional presence", body: "Dedicated GCC team, Arabic-language SOC services through MDR partners, and regional cloud presence in the UAE for compliance-sensitive deployments." },
        { title: "Mature SaaS delivery", body: "Vision One was built cloud-native from day one, no on-prem console retrofit, so the platform updates continuously without maintenance windows or version-skew problems." },
      ],
    },
    productShowcase: {
      eyebrow: "Featured Solutions: Trend Vision One",
      heading: "Complete Trend Micro Product Portfolio",
      intro: "Unified XDR, cloud, network, and email security on a single AI-powered platform with attack-surface risk management.",
      products: [
        { icon: "layers", title: "Vision One Platform", description: "Unified XDR, ASRM, and threat intelligence platform, Trend's flagship cybersecurity platform for the modern SOC." },
        { icon: "monitor", title: "Apex One", description: "Endpoint protection with cross-generational threat techniques, virtual patching, behavioral analysis, and EDR." },
        { icon: "server", title: "Deep Security", description: "Hybrid cloud workload protection for servers, VMs, and containers, IPS, anti-malware, FIM, and log inspection." },
        { icon: "cloud", title: "Cloud One", description: "SaaS platform with workload, container, file storage, network, and application security across AWS, Azure, and GCP." },
        { icon: "mail", title: "Cloud Email Security", description: "API-based email security for Microsoft 365 and Google Workspace, BEC, phishing, ransomware, and account takeover." },
        { icon: "zap", title: "TippingPoint IPS", description: "High-performance network intrusion prevention with virtual patching and Zero Day Initiative vulnerability intelligence." },
        { icon: "phone", title: "Mobile Security", description: "Mobile threat defense for iOS and Android with app reputation, anti-phishing, and MDM integration." },
        { icon: "search", title: "Deep Discovery", description: "Network detection and response with sandboxing, lateral movement detection, and targeted attack visibility." },
        { icon: "clock", title: "Service One (MDR)", description: "24/7 managed XDR and threat hunting service, Trend's elite analysts investigate and respond on your behalf." },
        { icon: "target", title: "Attack Surface Risk Mgmt", description: "ASRM dashboard discovers internal and external attack surface, prioritizes risk, and tracks remediation progress." },
        { icon: "cpu", title: "Trend Vision One for IoT/OT", description: "Asset discovery, risk assessment, and threat detection for industrial control systems and connected medical devices." },
        { icon: "bell", title: "Threat Intelligence (ZDI)", description: "The world's largest bug-bounty vendor program feeds zero-day intelligence directly into Trend's protection layers." },
      ],
    },
    ctaHeading: "Talk to our IT Security Advisor",
  },
  {
    slug: "sonicwall",
    name: "SonicWall",
    logo: "/logos/SonicWall.svg",
    description:
      "SonicWall delivers boundless cybersecurity for SMBs and distributed enterprises with TZ / NSa firewalls, Capture ATP cloud sandbox, and SMA secure remote access. Artiflex deploys SonicWall across the UAE, Oman, and Saudi Arabia.",
    categories: ["network-security", "email"],
    heroTagline: "Boundless Cybersecurity",
    summaryHeadline: "Enterprise-grade NGFW protection at SMB-friendly total cost of ownership.",
    summaryParagraphs: [
      "Artiflex IT delivers SonicWall across the UAE, Oman, and Saudi Arabia. From TZ-series firewalls for SMB and branch to NSa for mid-market and NSsp for enterprise, plus Capture ATP cloud sandbox, SMA secure remote access, and Cloud Email Security, we deploy and operate SonicWall environments end-to-end.",
      "Our engineers handle Network Security Manager (NSM) rollouts, zero-touch branch deployment, and policy tuning, so you get enterprise prevention and visibility without the enterprise licence stack.",
    ],
    aboutHeading: "About SonicWall",
    aboutTagline: "Three decades of protecting the SMB and distributed-enterprise edge",
    aboutFacts: [
      { label: "Founded", value: "1991, Silicon Valley California" },
      { label: "Heritage", value: "One of the original NGFW innovators, independent again after spinout from Dell in 2016" },
      { label: "Management", value: "Network Security Manager (NSM) cloud console" },
      { label: "Standout tech", value: "Real-Time Deep Memory Inspection (RTDMI) patented exploit detection, Capture ATP cloud sandbox, SonicCore inspection engine with full SSL/TLS 1.3 decryption, and zero-touch deployment via NSM", wide: true },
    ],
    whyVendor: {
      eyebrow: "Why SonicWall",
      title: "Why we recommend SonicWall to our customers",
      intro: "SonicWall hits the sweet spot for SMBs and distributed enterprises that need enterprise-grade prevention but can't justify the licence cost of tier-one NGFWs.",
      items: [
        { title: "RTDMI patented detection", body: "Real-Time Deep Memory Inspection catches advanced exploits, including PDF and Office file zero-days, that signature-based engines miss, with patented technology unique to SonicWall." },
        { title: "Capture ATP cloud sandbox", body: "Multi-engine cloud sandboxing with block-until-verdict capability, malicious files are held at the firewall until cleared, preventing patient-zero infections." },
        { title: "Zero-touch branch deployment", body: "Pre-stage firewalls in NSM and ship to remote sites for plug-and-play activation. Strong fit for retail chains, multi-branch services, and SMB groups." },
        { title: "Best-in-segment price-performance", body: "TZ and NSa series deliver enterprise-grade throughput-per-dirham, making SonicWall the default recommendation for organisations under 1,000 users." },
        { title: "Integrated SD-WAN", body: "Native SD-WAN included on every NGFW, no extra licence required, ideal for branch consolidation and replacing aging MPLS architectures." },
        { title: "Mature secure remote access", body: "SMA (Secure Mobile Access) appliances provide enterprise-grade VPN, ZTNA, and per-app access, important for organisations with field workers, contractors, and BYOD." },
      ],
    },
    productShowcase: {
      eyebrow: "Featured Solutions: SonicWall NGFW",
      heading: "Complete SonicWall Product Portfolio",
      intro: "Firewalls from TZ to NSsp, plus SMA remote access, Capture ATP sandboxing, email security, and Network Security Manager.",
      products: [
        { icon: "shield", title: "TZ Series Firewalls", description: "SMB-focused next-gen firewalls with multi-gigabit performance, integrated wireless, and SD-WAN, TZ270 to TZ670." },
        { icon: "server", title: "NSa Series", description: "Mid-range and enterprise NGFWs delivering high-throughput threat prevention from NSa 2700 to NSa 6700." },
        { icon: "cpu", title: "NSsp Series", description: "High-performance large enterprise and data center firewalls, multi-instance, multi-Gbps SSL inspection at scale." },
        { icon: "monitor", title: "Capture Client", description: "SentinelOne-powered next-gen endpoint protection with EDR, rollback, and Capture ATP integration." },
        { icon: "mail", title: "Email Security", description: "Cloud and on-prem email security with anti-phishing, BEC protection, encryption, and DMARC enforcement." },
        { icon: "cloud", title: "Cloud App Security", description: "API-based protection for Microsoft 365, Google Workspace, and Salesforce, phishing, account takeover, and data leak prevention." },
        { icon: "zap", title: "Capture ATP", description: "Multi-engine cloud sandbox with Real-Time Deep Memory Inspection (RTDMI), detects ransomware and zero-day threats." },
        { icon: "globe", title: "Cloud Edge SASE", description: "Cloud-delivered Zero Trust Network Access with global PoPs, replaces traditional VPN for hybrid workforces." },
        { icon: "key", title: "Secure Mobile Access", description: "Per-app VPN, SSL VPN, and clientless web access for remote workers, SMA 100 and SMA 1000 series appliances." },
        { icon: "wifi", title: "SonicWave Wireless", description: "Wi-Fi 6/6E access points with integrated security and centralized cloud management through Network Security Manager." },
        { icon: "network", title: "SonicWall Switch", description: "Layer 2/3 access and aggregation switches managed alongside firewalls in Network Security Manager, PoE support." },
        { icon: "gear", title: "Network Security Manager", description: "Cloud-native unified management for firewalls, switches, and APs with multi-tenant capabilities and reporting." },
      ],
    },
    ctaHeading: "Talk to our IT Security Advisor",
  },
  {
    slug: "proofpoint",
    name: "Proofpoint",
    logo: "/logos/Proofpoint.jpg.svg",
    description:
      "Proofpoint is the people-centric email and information security leader, protecting against BEC, phishing, and insider risk. Artiflex deploys Proofpoint across the UAE, Oman, and Saudi Arabia.",
    categories: ["email"],
    heroTagline: "People-Centric Security",
    summaryHeadline: "The market leader in email security, protecting 87 of the Fortune 100.",
    summaryParagraphs: [
      "Artiflex IT delivers Proofpoint across the UAE, Oman, and Saudi Arabia. From Proofpoint Email Protection and Targeted Attack Protection (TAP) to Email Fraud Defense (DMARC), Security Awareness Training (PSAT), and Insider Threat Management, we deploy and operate Proofpoint environments end-to-end.",
      "Our engineers handle MX cutover, DMARC implementation, supplier-risk visibility, and security-awareness program design, so you stop the threats that target your highest-risk users before they reach the inbox.",
    ],
    aboutHeading: "About Proofpoint",
    aboutTagline: "Gartner Magic Quadrant Leader for Email Security, every consecutive year",
    aboutFacts: [
      { label: "Founded", value: "2002, Sunnyvale California" },
      { label: "Heritage", value: "Founded by Eric Hahn (ex-Netscape), acquired Wombat (security awareness), Cloudmark, and Hexadite" },
      { label: "Management", value: "Proofpoint TAP Dashboard + Threat Response (TRAP)" },
      { label: "Standout tech", value: "Nexus People Risk Explorer, Targeted Attack Protection (TAP) with URL rewriting and attachment sandboxing, Threat Response Auto-Pull (TRAP) for inbox remediation, and the industry's largest BEC and supplier-fraud dataset", wide: true },
    ],
    whyVendor: {
      eyebrow: "Why Proofpoint",
      title: "Why we recommend Proofpoint to our customers",
      intro: "Proofpoint catches the email threats most likely to actually cost your organisation money: BEC, supplier impersonation, and credential phishing aimed at finance and executive teams.",
      items: [
        { title: "Best-in-class BEC detection", body: "Proofpoint's Supernova ML engine and Nexus Threat Graph correlate behavioural signals across billions of messages daily, catching BEC and supplier-fraud attempts other vendors miss." },
        { title: "Industry-leading sandbox", body: "TAP attachment defence and URL Defense rewrite/sandbox links at click-time, protecting users from weaponised URLs even if the URL was clean at delivery." },
        { title: "Targeted at high-risk users", body: "People-centric scoring identifies your Very Attacked People (VAPs) and lets you apply stronger protection, training, and MFA enforcement to the users adversaries actually target." },
        { title: "Best DMARC service", body: "Email Fraud Defense provides hosted SPF, DKIM, and DMARC enforcement plus visibility, the cleanest path to brand-protection email auth for organisations with complex sending infrastructures." },
        { title: "Auto-remediation with TRAP", body: "Threat Response Auto-Pull removes malicious messages from inboxes after delivery, including from messages that became weaponised post-delivery, no SOC analyst clicks required." },
        { title: "Security awareness depth", body: "Proofpoint Security Awareness Training (formerly Wombat) is the most mature phishing-simulation and training platform, with templates tailored to regional threat actors." },
      ],
    },
    productShowcase: {
      eyebrow: "Featured Solutions: People-Centric Security",
      heading: "Complete Proofpoint Product Portfolio",
      intro: "Email security, insider risk, information protection, and security awareness, the most complete people-centric stack in the industry.",
      products: [
        { icon: "mail", title: "Email Protection", description: "The industry's leading secure email gateway, stops phishing, spam, malware, and impostor attacks at the perimeter." },
        { icon: "target", title: "Targeted Attack Protection", description: "TAP detects, analyzes, and blocks advanced threats targeting your people with URL and attachment sandboxing." },
        { icon: "shield", title: "Email Fraud Defense", description: "DMARC authentication services with managed implementation, prevents domain spoofing across the email ecosystem." },
        { icon: "eye", title: "Insider Threat Management", description: "Behavioral analytics and content-aware monitoring to detect data theft and risky user behavior across endpoints." },
        { icon: "folder", title: "Information Protection", description: "Data loss prevention across email, cloud, and endpoint with content-aware policies and adaptive controls." },
        { icon: "users", title: "Security Awareness Training", description: "Phishing simulation and behavior-driven training that reduces successful attacks by up to 90%, formerly Wombat." },
        { icon: "cloud", title: "Cloud App Security Broker", description: "CASB protection for Microsoft 365, Google Workspace, Salesforce, and Box, visibility, DLP, and threat protection." },
        { icon: "globe", title: "Browser Isolation", description: "Renders web content in isolated cloud containers, neutralizes web-based threats and malicious downloads." },
        { icon: "bell", title: "Threat Response Auto-Pull", description: "Automatically pulls malicious emails from user inboxes post-delivery, stops attacks even after they get through." },
        { icon: "key", title: "Email Encryption", description: "Policy-based encryption with seamless recipient experience, supports TLS, S/MIME, and portal-based delivery." },
        { icon: "archive", title: "Enterprise Archive", description: "Cloud archive for email, files, and IM with legal hold, eDiscovery, and supervision tools for compliance." },
        { icon: "search", title: "Premium Threat Intelligence", description: "Curated threat actor profiles, campaign intelligence, and IOCs from Proofpoint's globally recognized research teams." },
      ],
    },
    ctaHeading: "Talk to our IT Security Advisor",
  },
  {
    slug: "mimecast",
    name: "Mimecast",
    logo: "/logos/mimecast.svg",
    description:
      "Mimecast protects business email with anti-phishing, archiving, continuity, and DLP on one cloud platform. Artiflex deploys Mimecast across the UAE, Oman, and Saudi Arabia.",
    categories: ["email"],
    heroTagline: "Work Protected",
    summaryHeadline: "Comprehensive email security, archiving, and continuity on one cloud platform.",
    summaryParagraphs: [
      "Artiflex IT delivers Mimecast across the UAE, Oman, and Saudi Arabia. From Mimecast Email Security (Cloud Gateway and Cloud Integrated for M365), Targeted Threat Protection, and Brand Exploit Protect to Mimecast Archive, Continuity, and Awareness Training, we deploy and operate Mimecast environments end-to-end.",
      "Our engineers handle MX cutover, M365 integration via the Cloud Integrated API mode, archive ingestion, and policy hardening, so you get inbox-level protection plus the regulatory archive and business-continuity capability your auditors expect.",
    ],
    aboutHeading: "About Mimecast",
    aboutTagline: "Cloud-native email security, archiving, and continuity since 2003",
    aboutFacts: [
      { label: "Founded", value: "2003, London UK (HQ in Lexington Massachusetts)" },
      { label: "Heritage", value: "Built cloud-native from day one, taken private by Permira in 2022, acquired Code42 (insider risk) in 2024" },
      { label: "Management", value: "Mimecast Administration Console" },
      { label: "Standout tech", value: "Cloud Gateway architecture with massive parallelised threat analysis, CyberGraph AI engine for social-engineering detection, Brand Exploit Protect for typosquat and DMARC, plus 7+ year tamper-evident archive with eDiscovery", wide: true },
    ],
    whyVendor: {
      eyebrow: "Why Mimecast",
      title: "Why we recommend Mimecast to our customers",
      intro: "Mimecast is the right choice when you need email security AND archiving AND continuity from one vendor, particularly for regulated industries that need provable email retention.",
      items: [
        { title: "Three products, one platform", body: "Email security, archive, and continuity from one cloud platform with one admin console, simpler to operate than stitching together separate vendors and cheaper at most enterprise tiers." },
        { title: "Cloud Integrated for M365", body: "API-based deployment alongside Microsoft Defender, no MX-record change required. Layer Mimecast on top of native M365 protection for defence-in-depth." },
        { title: "Strong archive and eDiscovery", body: "Tamper-evident, full-text-searchable archive with 99-year retention support, the standard choice for financial services and legal sectors with strict retention obligations." },
        { title: "Business continuity included", body: "If your M365 or Exchange is down, Mimecast continues to send and receive mail through the cloud gateway, a true continuity safety net no native cloud-mail product offers." },
        { title: "CyberGraph AI detection", body: "Behavioural AI catches social-engineering threats by correlating sender, content, and historical communication patterns, particularly strong on supplier-impersonation and CEO-fraud." },
        { title: "Brand Exploit Protect", body: "Continuously hunts the internet for typosquatted domains and lookalike infrastructure targeting your brand, taking down or alerting on impersonation campaigns before they hit your customers." },
      ],
    },
    productShowcase: {
      eyebrow: "Featured Solutions: Mimecast X1",
      heading: "Complete Mimecast Product Portfolio",
      intro: "Email security, archiving, awareness training, and brand protection on the unified X1 cloud platform.",
      products: [
        { icon: "mail", title: "Email Security", description: "Cloud secure email gateway protecting against spam, phishing, BEC, malware, and zero-day threats at internet scale." },
        { icon: "target", title: "Targeted Threat Protection", description: "URL Protect, Attachment Protect, and Impersonation Protect, multilayered defense against the most evasive attacks." },
        { icon: "archive", title: "Cloud Archive", description: "Tamper-proof email and file archive with legal hold, eDiscovery, and 99.999% uptime, replaces costly on-prem archives." },
        { icon: "clock", title: "Email Continuity", description: "Maintains email service during Microsoft 365 or Exchange outages, users send and receive from web and mobile." },
        { icon: "users", title: "Awareness Training", description: "Risk-based phishing simulation and microlearning that adapt to each user's behavior and threat profile." },
        { icon: "globe", title: "Web Security", description: "DNS-based web security blocking malicious sites, shadow IT discovery, and acceptable use policy enforcement." },
        { icon: "shield", title: "Brand Exploit Protect", description: "Detects look-alike domains, phishing kits, and brand impersonation across the open and dark web, automated takedowns." },
        { icon: "eye", title: "DMARC Analyzer", description: "Visibility into who's sending email on your behalf with managed DMARC enforcement to stop domain abuse." },
        { icon: "network", title: "API Connect", description: "Open APIs and 100+ pre-built integrations with SIEM, SOAR, and identity platforms for unified security operations." },
        { icon: "zap", title: "Sync & Recover", description: "Granular point-in-time recovery for mailboxes, calendars, and contacts, recovers from accidental deletion and ransomware." },
        { icon: "key", title: "Secure Messaging", description: "End-to-end encrypted email with seamless delivery, recipients open messages without registration or installs." },
        { icon: "search", title: "X1 Platform", description: "The Mimecast X1 platform unifies email, collaboration, and brand protection under one cloud and one console." },
      ],
    },
    ctaHeading: "Talk to our IT Security Advisor",
  },
  {
    slug: "acronis",
    name: "Acronis",
    logo: "/logos/Acronis.svg",
    description:
      "Acronis Cyber Protect unifies backup, disaster recovery, anti-ransomware, and endpoint management on one console. Artiflex deploys Acronis across the UAE, Oman, and Saudi Arabia.",
    categories: ["backup", "endpoint", "cloud"],
    heroTagline: "Cyber Protection",
    summaryHeadline: "Backup, DR, anti-ransomware, and endpoint management on one integrated platform.",
    summaryParagraphs: [
      "Artiflex IT delivers Acronis Cyber Protect across the UAE, Oman, and Saudi Arabia. From Cyber Protect Cloud and Cyber Protect 16 (on-prem) to Acronis Disaster Recovery as a Service (DRaaS), Cyber Files secure file sync, and Advanced Email Security, we deploy and operate Acronis environments end-to-end.",
      "Our engineers handle initial seeding, retention policy design, ransomware-protection tuning, and ongoing DR runbook validation, so you get genuine cyber protection rather than backup software with a security marketing wrapper.",
    ],
    aboutHeading: "About Acronis",
    aboutTagline: "Pioneers of cyber protection, integrating backup and security since 2017",
    aboutFacts: [
      { label: "Founded", value: "2003, Schaffhausen Switzerland and Singapore" },
      { label: "Heritage", value: "Founded by Serguei Beloussov, Swiss data residency, acquired DeviceLock (DLP) and 5nine (Hyper-V) to round out the platform" },
      { label: "Management", value: "Acronis Cyber Protect Cloud console (cloud or on-prem)" },
      { label: "Standout tech", value: "Active Protection AI engine that blocks ransomware in real time, Notarisation via blockchain for tamper-evident backups, Cyber Disaster Recovery Cloud with VM-level orchestration, and unified backup + EDR + DLP on a single agent", wide: true },
    ],
    whyVendor: {
      eyebrow: "Why Acronis",
      title: "Why we recommend Acronis to our customers",
      intro: "Acronis is the right partner when you want backup and ransomware protection from the same vendor, the same agent, and the same console, the operational simplicity matters as much as the technology.",
      items: [
        { title: "One agent for backup + EDR", body: "A single lightweight agent handles backup, ransomware protection, EDR, patch management, and DLP, dramatically reducing the agent sprawl typical on Windows endpoints." },
        { title: "Active Protection ransomware blocking", body: "AI-driven behavioural detection blocks ransomware encryption attempts in real time and rolls back affected files, even when the malware itself is brand new and unknown." },
        { title: "Blockchain notarisation", body: "Acronis Notary creates tamper-evident records for sensitive backups, important for regulated industries needing chain-of-custody for compliance evidence." },
        { title: "True DR orchestration", body: "Acronis DRaaS provides full VM-level disaster-recovery into Acronis cloud with documented runbooks and one-click failover, not just file-level backup restore." },
        { title: "Strong M365 / Google Workspace backup", body: "Granular backup and restore for Exchange, SharePoint, OneDrive, and Teams, addressing the gap that Microsoft's native retention doesn't cover for compliance buyers." },
        { title: "MSP-friendly licensing", body: "Per-workload, per-month consumption billing makes Acronis the standard choice for MSPs and IT managed-services environments, easy to grow, easy to bill." },
      ],
    },
    productShowcase: {
      eyebrow: "Featured Solutions: Acronis Cyber Protect",
      heading: "Complete Acronis Product Portfolio",
      intro: "Integrated backup, anti-malware, EDR, and endpoint management on one platform, on-prem or in the Acronis cloud.",
      products: [
        { icon: "cloud", title: "Cyber Protect Cloud", description: "Integrated cybersecurity, data protection, and endpoint management for MSPs, single agent, single console." },
        { icon: "server", title: "Cyber Protect (On-Prem)", description: "All-in-one backup, anti-malware, and management for enterprises that need on-premise deployment for data sovereignty." },
        { icon: "archive", title: "Cyber Backup", description: "Image-based backup for 20+ platforms, physical, virtual, cloud, mobile, applications, and SaaS workloads." },
        { icon: "clock", title: "Disaster Recovery", description: "Cloud-based DR with RPO of seconds and RTO of minutes, runtime failover to Acronis cloud infrastructure." },
        { icon: "shield", title: "Anti-Malware & AV", description: "AI-based behavioral detection and signature-based anti-malware optimized to work alongside backup operations." },
        { icon: "eye", title: "EDR", description: "Endpoint detection and response with MITRE ATT&CK mapping, attack-chain visualization, and one-click remediation." },
        { icon: "mail", title: "Email Security", description: "API-based and gateway email protection with Perception Point engine, anti-phishing, BEC, and account takeover." },
        { icon: "target", title: "Vulnerability Assessment", description: "Continuous scanning of OS and applications for known CVEs with prioritized remediation guidance." },
        { icon: "gear", title: "Patch Management", description: "Automated patching for Windows, Mac, and 200+ third-party applications with staged rollout and rollback." },
        { icon: "folder", title: "Cyber Files", description: "Enterprise file sync and share with end-to-end encryption, replaces Dropbox/OneDrive for regulated industries." },
        { icon: "cpu", title: "Cyber Infrastructure", description: "Software-defined storage and HCI platform, pools standard servers into private cloud for backup and primary workloads." },
        { icon: "grid", title: "Microsoft 365 / Workspace Backup", description: "Granular SaaS backup for Exchange, OneDrive, SharePoint, Teams, Gmail, Drive, and Calendar with unlimited retention." },
      ],
    },
    ctaHeading: "Talk to our Data Protection Specialist",
  },
  {
    slug: "vmware",
    name: "VMware",
    logo: "/logos/vmware.svg",
    description:
      "VMware powers the world's most demanding data centres with vSphere virtualisation, NSX networking, and VMware Cloud Foundation. Artiflex deploys VMware across the UAE, Oman, and Saudi Arabia.",
    categories: ["cloud"],
    heroTagline: "Run, Build, Manage, Connect",
    summaryHeadline: "Enterprise virtualisation, software-defined networking, and multi-cloud management.",
    summaryParagraphs: [
      "Artiflex IT delivers VMware (now part of Broadcom) across the UAE, Oman, and Saudi Arabia. From vSphere Foundation and Cloud Foundation (VCF) to NSX-T software-defined networking, vSAN hyperconverged storage, and Aria operations and automation, we deploy and operate VMware environments end-to-end.",
      "Our engineers handle vCenter sizing, NSX micro-segmentation design, vSAN cluster planning, and Broadcom-era license optimisation, so your VMware estate continues to deliver value through the platform transition.",
    ],
    aboutHeading: "About VMware",
    aboutTagline: "The platform that turned x86 servers into the data centre",
    aboutFacts: [
      { label: "Founded", value: "1998, Palo Alto California (now part of Broadcom since 2023)" },
      { label: "Heritage", value: "Pioneered x86 virtualisation, acquired Nicira (NSX), AirWatch, Pivotal, Carbon Black, and SaltStack" },
      { label: "Management", value: "vCenter Server + Aria (formerly vRealize) Suite + VMware Cloud Foundation" },
      { label: "Standout tech", value: "vSphere ESXi hypervisor, vSAN distributed storage, NSX software-defined networking with micro-segmentation, vMotion for zero-downtime VM moves, and VMware Cloud Foundation (VCF) full-stack private cloud", wide: true },
    ],
    whyVendor: {
      eyebrow: "Why VMware",
      title: "Why we recommend VMware to our customers",
      intro: "VMware remains the gold standard for enterprise virtualisation, with capabilities and ecosystem depth that no other hypervisor matches, even as customers evaluate the post-Broadcom pricing landscape.",
      items: [
        { title: "Production-proven at scale", body: "vSphere runs the world's largest virtualised workloads: banks, airlines, telco, and government. The reference platform for mission-critical x86 virtualisation." },
        { title: "vMotion and DRS", body: "Live VM migration with zero downtime and Distributed Resource Scheduler for automatic load balancing, foundational capabilities competitors still struggle to match in production." },
        { title: "NSX micro-segmentation", body: "East-west firewalling at the hypervisor level, enabling Zero Trust segmentation that doesn't require redesigning the physical network, the de-facto standard for VM-level segmentation." },
        { title: "Broadest ecosystem", body: "Every major backup, security, monitoring, storage, and network vendor builds first-class VMware integrations, the safest choice when long-term ecosystem matters." },
        { title: "VMware Cloud Foundation", body: "Full-stack private cloud bundling vSphere, vSAN, NSX, and Aria, the closest on-prem equivalent to AWS or Azure for organisations needing local data residency." },
        { title: "Migration paths under Broadcom", body: "Artiflex helps customers evaluate VCF subscription right-sizing, Nutanix migration, or Azure VMware Solution / VMware on AWS as the right post-Broadcom strategy." },
      ],
    },
    productShowcase: {
      eyebrow: "Featured Solutions: VMware Cloud Foundation",
      heading: "Complete VMware Product Portfolio",
      intro: "vSphere virtualization, vSAN storage, NSX networking, and the full data center stack, plus modern apps and workspace.",
      products: [
        { icon: "server", title: "vSphere", description: "Industry-leading server virtualization platform with ESXi hypervisor, vCenter management, and high availability." },
        { icon: "archive", title: "vSAN", description: "Software-defined storage that pools server-attached disks into a shared datastore, eliminates traditional SANs." },
        { icon: "network", title: "NSX", description: "Software-defined networking and security platform with micro-segmentation, load balancing, and distributed firewall." },
        { icon: "cloud", title: "VMware Cloud Foundation", description: "Integrated software stack, compute, storage, networking, management, for private and hybrid cloud at scale." },
        { icon: "grid", title: "Tanzu", description: "Kubernetes-based application platform for building, running, and managing cloud-native apps on any infrastructure." },
        { icon: "monitor", title: "Horizon VDI", description: "Virtual desktop infrastructure and published applications for any device, secure end-user computing at enterprise scale." },
        { icon: "phone", title: "Workspace ONE", description: "Unified endpoint management for laptops, mobile devices, and apps, identity, MDM, and digital workspace in one." },
        { icon: "shield", title: "Carbon Black", description: "Next-gen endpoint protection with EDR, behavioral analysis, and threat hunting, formerly an independent leader." },
        { icon: "activity", title: "Aria (vRealize)", description: "Multi-cloud operations, automation, and cost management, observability and lifecycle management across clouds." },
        { icon: "zap", title: "VMware Cloud on AWS", description: "Run native vSphere on AWS infrastructure, extend or migrate workloads to public cloud with zero application changes." },
        { icon: "database", title: "Cloud Director", description: "Multi-tenant cloud management platform for service providers offering VMware-based infrastructure-as-a-service." },
        { icon: "eye", title: "vDefend (SDDC Security)", description: "Lateral threat prevention with IDS/IPS, NDR, and identity firewalls integrated into the VMware data center fabric." },
      ],
    },
    ctaHeading: "Talk to our Cloud Specialist",
  },
  {
    slug: "veeam",
    name: "Veeam",
    logo: "/logos/veeam.svg",
    description:
      "Veeam is the #1 backup and ransomware recovery platform for virtual, physical, cloud, and SaaS workloads. Artiflex deploys Veeam across the UAE, Oman, and Saudi Arabia.",
    categories: ["backup"],
    heroTagline: "Radical Resilience",
    summaryHeadline: "The #1 backup, DR, and ransomware-recovery platform, by both market share and customer trust.",
    summaryParagraphs: [
      "Artiflex IT delivers the Veeam Data Platform across the UAE, Oman, and Saudi Arabia. From Veeam Backup & Replication and Backup for Microsoft 365 to Veeam ONE monitoring, Veeam Kasten K10 for Kubernetes, and Veeam Recovery Orchestrator, we design and operate Veeam environments end-to-end.",
      "Our engineers handle 3-2-1-1-0 architecture design, immutable repositories, SureBackup verification, and DR runbook automation, so when ransomware hits your restore is fast, clean, and verified, not a hope.",
    ],
    aboutHeading: "About Veeam",
    aboutTagline: "The #1 backup vendor globally by IDC market share, four consecutive years",
    aboutFacts: [
      { label: "Founded", value: "2006, Baar Switzerland (HQ in Columbus Ohio)" },
      { label: "Heritage", value: "Founded by Ratmir Timashev and Andrei Baronov, acquired Kasten (Kubernetes backup) and Coveware (ransomware response)" },
      { label: "Management", value: "Veeam Backup & Replication console + Veeam ONE" },
      { label: "Standout tech", value: "Instant VM Recovery from backup, SureBackup automated restore testing, immutable backup repositories with hardened Linux and S3 Object Lock, SecureRestore malware scanning during recovery, and CDP for sub-15-second RPO", wide: true },
    ],
    whyVendor: {
      eyebrow: "Why Veeam",
      title: "Why we recommend Veeam to our customers",
      intro: "Veeam is the safest default for backup: independent of hypervisor, cloud, or storage vendor, with the deepest restore capabilities in the industry and a fanatical focus on ransomware recovery.",
      items: [
        { title: "#1 market share, four years running", body: "IDC's #1 backup vendor globally with 35,000+ enterprise customers, deep ecosystem support, broadest workload coverage, and the largest community of certified engineers." },
        { title: "Hypervisor-agnostic", body: "Native, image-level backups for vSphere, Hyper-V, Nutanix AHV, AWS EC2, Azure VMs, and Google Cloud Compute, the most portable backup platform on the market." },
        { title: "Immutable repositories", body: "Hardened Linux repositories, S3 Object Lock, and tape-out support enable air-gapped, tamper-proof copies that ransomware can't encrypt, even with admin credentials." },
        { title: "Instant restore", body: "Boot a 5 TB VM directly from backup storage in 90 seconds via Instant VM Recovery, dramatically faster RTOs than restoring a multi-TB image to production storage." },
        { title: "M365 + Salesforce backup", body: "Microsoft 365 retention and SaaS deletion windows don't replace backup. Veeam fills the gap that Microsoft itself recommends customers solve with third-party tools." },
        { title: "SureBackup verification", body: "Automated, scheduled restore testing in an isolated sandbox proves your backups are actually recoverable, the single best defence against \"my backup succeeded but my restore failed\" scenarios." },
      ],
    },
    productShowcase: {
      eyebrow: "Featured Solutions: Veeam Data Platform",
      heading: "Complete Veeam Product Portfolio",
      intro: "The #1 backup and ransomware-recovery platform across virtual, physical, cloud, SaaS, and Kubernetes workloads.",
      products: [
        { icon: "archive", title: "Veeam Data Platform", description: "The flagship data protection platform, Backup & Replication, ONE monitoring, and Recovery Orchestrator in one license." },
        { icon: "server", title: "Backup & Replication", description: "Industry-leading backup for VMware, Hyper-V, Nutanix AHV, physical servers, and cloud, instant VM recovery in seconds." },
        { icon: "activity", title: "Veeam ONE", description: "Real-time monitoring, analytics, and reporting for backup infrastructure plus virtual and physical environments." },
        { icon: "mail", title: "Backup for Microsoft 365", description: "Granular backup and recovery for Exchange Online, SharePoint, OneDrive, and Teams, the #1 M365 backup solution." },
        { icon: "cloud", title: "Backup for AWS", description: "Native protection for EC2, RDS, EFS, and VPC with backup-as-a-service options and cross-region recovery." },
        { icon: "cloud", title: "Backup for Azure", description: "Cloud-native protection for VMs, SQL, and File Storage with policy-based backup and instant disk recovery." },
        { icon: "cloud", title: "Backup for Google Cloud", description: "Protect Google Compute Engine, GKE, and Cloud SQL workloads with deep integration into Google's cloud platform." },
        { icon: "grid", title: "Kasten K10", description: "Kubernetes-native data management for backup, mobility, disaster recovery, and ransomware recovery of containerized apps." },
        { icon: "database", title: "Backup for Salesforce", description: "Granular Salesforce data and metadata backup with bulk and on-demand restore, prevents data loss and admin errors." },
        { icon: "zap", title: "Recovery Orchestrator", description: "Automated disaster recovery orchestration with one-click failover testing, runbooks, and DR documentation." },
        { icon: "shield", title: "Veeam Threat Center", description: "Built-in ransomware detection in backup streams plus secure restore, flags compromised data before recovery." },
        { icon: "users", title: "Service Provider Console", description: "Multi-tenant management platform for MSPs delivering Backup-as-a-Service and Disaster-Recovery-as-a-Service." },
      ],
    },
    ctaHeading: "Talk to our Data Protection Specialist",
  },
  {
    slug: "ivanti",
    name: "Ivanti",
    logo: "/logos/Ivanti.svg",
    description:
      "Ivanti delivers unified endpoint management, patch management, and Zero Trust secure access for the everywhere workplace. Artiflex deploys Ivanti across the UAE, Oman, and Saudi Arabia.",
    categories: ["endpoint"],
    heroTagline: "Everywhere Work",
    summaryHeadline: "Unified endpoint management, patch automation, and Zero Trust access on one platform.",
    summaryParagraphs: [
      "Artiflex IT delivers the Ivanti portfolio across the UAE, Oman, and Saudi Arabia. From Ivanti Neurons for UEM (formerly MobileIron) and Patch Management to Ivanti Connect Secure / Policy Secure (ZTNA), Service Manager, and Asset Manager, we deploy and operate Ivanti environments end-to-end.",
      "Our engineers handle Neurons workspace rollouts, patch ring strategy, ZTNA policy design, and ITSM workflow automation, so your IT team can manage every endpoint, ticket, and access decision from one platform.",
    ],
    aboutHeading: "About Ivanti",
    aboutTagline: "Built from MobileIron, Pulse Secure, Cherwell, and LANDesk under one platform",
    aboutFacts: [
      { label: "Founded", value: "2017, South Jordan Utah (consolidation of LANDESK and HEAT)" },
      { label: "Heritage", value: "LANDESK + HEAT + AppSense + MobileIron + Pulse Secure + Cherwell + RiskSense, one of IT's largest consolidations" },
      { label: "Management", value: "Ivanti Neurons platform (cloud) + Ivanti ITSM" },
      { label: "Standout tech", value: "Neurons hyperautomation platform with self-healing devices, Patch Management with risk-based prioritisation across Windows / macOS / Linux / third-party, Ivanti Connect Secure ZTNA, and unified UEM for mobile and desktop", wide: true },
    ],
    whyVendor: {
      eyebrow: "Why Ivanti",
      title: "Why we recommend Ivanti to our customers",
      intro: "Ivanti consolidates the IT-Ops stack, UEM, patch, ITSM, and ZTNA, into one platform that's hard to replicate by buying separate tools from different vendors.",
      items: [
        { title: "Best-in-class patch management", body: "Ivanti Patch covers Windows, macOS, Linux, AND third-party applications (Adobe, Chrome, Java, Zoom, etc.), with risk-based prioritisation driven by RiskSense vulnerability intel." },
        { title: "Unified endpoint management", body: "Neurons UEM (formerly MobileIron) manages iOS, Android, Windows, macOS, ChromeOS, and IoT/rugged devices from one console, no separate mobile and desktop tools." },
        { title: "ZTNA with Connect Secure", body: "Mature Zero Trust Network Access with per-app micro-segmentation, posture checks, and contextual access policies, evolved from one of the largest VPN platforms in the world." },
        { title: "Service management included", body: "Ivanti Service Manager and Asset Manager provide ITIL-aligned ITSM, CMDB, and IT asset management, often replacing separate ServiceNow / BMC stacks for mid-market customers." },
        { title: "Neurons hyperautomation", body: "Self-healing scripts and bot-driven remediation across endpoints reduce ticket volume by handling common issues, password resets, drive cleanups, app re-installs, automatically." },
        { title: "Broad regional adoption", body: "Strong installed base across UAE government, banking, and healthcare, with a deep pool of certified administrators and predictable support paths through the GCC." },
      ],
    },
    productShowcase: {
      eyebrow: "Featured Solutions: Ivanti Neurons",
      heading: "Complete Ivanti Product Portfolio",
      intro: "UEM, ITSM, patch management, ZTNA, and MDM under the AI-powered Neurons hyperautomation platform.",
      products: [
        { icon: "cpu", title: "Neurons Platform", description: "AI-powered hyperautomation platform that unifies IT operations, security, and asset management with self-healing capabilities." },
        { icon: "monitor", title: "Endpoint Manager", description: "Unified endpoint management for Windows, Mac, Linux, iOS, and Android, provisioning, software distribution, and config." },
        { icon: "target", title: "Neurons for Patch Mgmt", description: "Risk-based patching for OS and 200+ third-party applications, prioritizes patches by real-world exploit risk." },
        { icon: "bell", title: "Neurons for ITSM", description: "Service desk and IT service management with AI-powered ticketing, knowledge management, and self-service portals." },
        { icon: "key", title: "Connect Secure (VPN)", description: "Industry-leading SSL VPN with granular access controls and integration with Microsoft Entra, Okta, and AD identity providers." },
        { icon: "globe", title: "Neurons for ZTA", description: "Zero Trust Access platform delivering per-application access control and continuous verification for hybrid workforces." },
        { icon: "phone", title: "Neurons for MDM", description: "Mobile device management for iOS, Android, Windows, and macOS with comprehensive policy enforcement and BYOD support." },
        { icon: "shield", title: "Application Control", description: "Whitelisting, privilege management, and granular policy controls, blocks ransomware and unauthorized executables." },
        { icon: "lock", title: "Endpoint Security", description: "Anti-virus, anti-malware, and host-based intrusion prevention integrated into the endpoint management agent." },
        { icon: "folder", title: "Neurons for IT Asset Mgmt", description: "IT asset lifecycle management with software license optimization and hardware tracking from procurement to retirement." },
        { icon: "users", title: "Workspace Control", description: "Context-aware desktop personalization and policy enforcement, same experience across physical, virtual, and remote desktops." },
        { icon: "search", title: "Neurons for Discovery", description: "Agentless network discovery that maps every device, service, and dependency across the IT estate in real time." },
      ],
    },
    ctaHeading: "Talk to our IT Operations Specialist",
  },
  {
    slug: "hpe",
    name: "Hewlett Packard Enterprise",
    logo: "/logos/Hewlett.svg",
    description:
      "HPE delivers ProLiant servers, Alletra storage, Aruba networking, and GreenLake edge-to-cloud as-a-service. Artiflex deploys HPE across the UAE, Oman, and Saudi Arabia.",
    categories: ["networking", "cloud", "servers", "storage"],
    heroTagline: "The Edge-to-Cloud Company",
    summaryHeadline: "Enterprise servers, storage, and networking, available as hardware or GreenLake as-a-service.",
    summaryParagraphs: [
      "Artiflex IT delivers the HPE enterprise portfolio across the UAE, Oman, and Saudi Arabia. From ProLiant servers and Alletra all-flash storage to Aruba switching, Wi-Fi 6E/7 access points, ClearPass policy management, and HPE GreenLake consumption-based services, we design and operate HPE environments end-to-end.",
      "Our engineers handle data-centre design, Aruba Central rollouts, Alletra migration, and GreenLake subscription sizing, so you get the reliability of HPE hardware with the option to consume it like a cloud service.",
    ],
    aboutHeading: "About HPE",
    aboutTagline: "Eight decades of building enterprise infrastructure, spun from HP in 2015",
    aboutFacts: [
      { label: "Founded", value: "2015, Houston Texas (spun from Hewlett-Packard, founded 1939)" },
      { label: "Heritage", value: "Acquired Aruba (Wi-Fi), Nimble Storage (now Alletra), Cray (HPC), Silver Peak (SD-WAN), and Juniper (announced 2024)" },
      { label: "Management", value: "HPE GreenLake Edge-to-Cloud Platform + Aruba Central + OneView" },
      { label: "Standout tech", value: "ProLiant Gen11 servers with Silicon Root of Trust, Alletra MP all-flash with 100% data availability guarantee, Aruba CX switching with AI-driven NetInsight, ClearPass policy enforcement, and GreenLake consumption-based as-a-service for any HPE workload", wide: true },
    ],
    whyVendor: {
      eyebrow: "Why HPE",
      title: "Why we recommend HPE to our customers",
      intro: "HPE is the right choice when you need rock-solid enterprise hardware with the option to pay for it like a cloud subscription, plus genuine edge-to-cloud breadth from one vendor.",
      items: [
        { title: "ProLiant reliability", body: "The reference standard for enterprise x86 servers, decades of installed base, mature management with iLO, and the broadest workload validation across SAP, Oracle, VMware, and AI workloads." },
        { title: "Aruba networking depth", body: "Aruba is the #2 enterprise networking vendor globally, Wi-Fi 6E and 7 APs, AOS-CX switches with VSX live upgrades, and ClearPass for the deepest policy-driven NAC in the market." },
        { title: "GreenLake as-a-service", body: "Consume HPE compute, storage, networking, and software as a metered subscription on-prem, getting cloud economics without giving up data residency or low-latency local performance." },
        { title: "Alletra storage", body: "AI-driven Alletra all-flash arrays with 100% data availability guarantee and predictive analytics from Nimble's DataOps heritage, no annual storage admin firefights." },
        { title: "Strong AI / HPC story", body: "HPE Cray supercomputing and Apollo systems power some of the world's largest LLM training runs, the right partner for AI factory and HPC ambitions in the GCC." },
        { title: "Long regional partnership", body: "HPE has deep installed base across UAE banking, government, and oil & gas, with a strong local engineering bench and spare-parts coverage from Dubai and Riyadh." },
      ],
    },
    productShowcase: {
      eyebrow: "Featured Solutions: HPE GreenLake",
      heading: "Complete HPE Product Portfolio",
      intro: "ProLiant compute, Alletra storage, Aruba networking, and GreenLake consumption-based services, edge to cloud.",
      products: [
        { icon: "server", title: "ProLiant Servers", description: "Industry-leading rack, tower, and blade servers with AMD EPYC and Intel Xeon, Gen11/Gen12 ProLiant family." },
        { icon: "cpu", title: "HPE Synergy", description: "Composable infrastructure that dynamically provisions compute, storage, and fabric resources from a single pool." },
        { icon: "zap", title: "HPE Apollo / Cray", description: "High-performance computing systems for AI training, scientific computing, and supercomputing workloads at scale." },
        { icon: "archive", title: "HPE Alletra Storage", description: "AI-driven all-flash storage with InfoSight predictive analytics, from entry-level Alletra MP to enterprise dHCI." },
        { icon: "database", title: "HPE Primera & Nimble", description: "Mission-critical and mid-range all-flash arrays with 100% data availability guarantees and intelligent automation." },
        { icon: "wifi", title: "Aruba Networking", description: "Wired, wireless, and SD-WAN networking with AI-powered operations, ZTNA, and integrated security via EdgeConnect." },
        { icon: "cloud", title: "HPE GreenLake", description: "Edge-to-cloud platform delivering on-demand IT consumption, pay-as-you-go for compute, storage, networking, and apps." },
        { icon: "grid", title: "HPE Ezmeral", description: "Unified data analytics and AI platform with Kubernetes orchestration, MLOps, and the Data Fabric distributed storage." },
        { icon: "network", title: "HPE Edgeline", description: "Converged edge systems for IoT and industrial use cases, bringing data center compute to factories, retail, and remote sites." },
        { icon: "gear", title: "HPE OneView", description: "Unified infrastructure management for ProLiant, Synergy, BladeSystem, and Primera with software-defined automation." },
        { icon: "clock", title: "HPE Storage Services", description: "Backup, disaster recovery, and ransomware protection delivered as a service, Zerto and StoreOnce-powered solutions." },
        { icon: "shield", title: "HPE Aruba ClearPass", description: "Network access control with role-based policies, BYOD onboarding, and continuous device posture for enterprise networks." },
      ],
    },
    ctaHeading: "Talk to our Infrastructure Specialist",
  },
  {
    slug: "microsoft",
    name: "Microsoft",
    logo: "/logos/microsoft.svg",
    description:
      "Microsoft delivers Microsoft 365, Defender security suite, Teams collaboration, and Windows enterprise solutions, the foundation of the modern workplace. Artiflex deploys Microsoft across the UAE, Oman, and Saudi Arabia.",
    categories: ["cloud", "endpoint", "comms", "email", "dlp", "iam", "sase", "siem", "vuln"],
    heroTagline: "Empowering Every Person and Every Organisation",
    summaryHeadline: "Microsoft 365, Defender XDR, Teams, and Windows, the foundation of the modern workplace.",
    summaryParagraphs: [
      "Artiflex IT delivers the Microsoft enterprise portfolio across the UAE, Oman, and Saudi Arabia. From Microsoft 365 (E3 / E5 / Business Premium) and Defender XDR to Microsoft Sentinel SIEM, Intune endpoint management, Entra ID Conditional Access, and Microsoft Copilot, we deploy and operate Microsoft environments end-to-end.",
      "Our engineers handle tenant configuration, Defender XDR onboarding, Conditional Access policy design, Intune mobile and PC management, and Copilot readiness, so you get the most out of every Microsoft licence you already pay for.",
    ],
    aboutHeading: "About Microsoft",
    aboutTagline: "The world's most used enterprise productivity and security platform",
    aboutFacts: [
      { label: "Founded", value: "1975, Redmond Washington" },
      { label: "Heritage", value: "Founded by Bill Gates and Paul Allen, acquired GitHub, LinkedIn, Activision, and a major OpenAI partnership" },
      { label: "Management", value: "Microsoft 365 Admin Center + Microsoft Defender Portal + Microsoft Intune" },
      { label: "Standout tech", value: "Microsoft Defender XDR with native endpoint, email, identity, and cloud-app correlation, Microsoft Sentinel cloud SIEM, Microsoft Copilot productivity AI, Entra ID with the world's largest identity graph, and Azure-backed UAE data residency", wide: true },
    ],
    whyVendor: {
      eyebrow: "Why Microsoft",
      title: "Why we recommend Microsoft to our customers",
      intro: "If your organisation already runs Microsoft 365 or Active Directory, Microsoft's security stack is usually the highest-leverage upgrade you can make, you already own most of the licences.",
      items: [
        { title: "Defender XDR included with E5", body: "Microsoft 365 E5 includes Defender for Endpoint, Office 365, Identity, and Cloud Apps, true XDR with cross-pillar correlation, often replacing best-of-breed point tools you're already paying for separately." },
        { title: "Sentinel cloud SIEM", body: "Cloud-native SIEM with 350+ connectors, pay-as-you-go billing, and tight integration with Defender, the natural successor to aging on-prem SIEMs at end-of-life refresh." },
        { title: "Entra ID identity foundation", body: "The world's largest enterprise identity graph powers Conditional Access, Identity Protection, Privileged Identity Management, and passwordless sign-in, the foundation of every Zero Trust strategy in M365 environments." },
        { title: "Intune endpoint management", body: "Mobile + PC management with co-management for SCCM-managed Windows estates, Autopilot zero-touch provisioning, and broad iOS / Android / macOS coverage from one console." },
        { title: "UAE data residency", body: "Azure UAE regions (Dubai + Abu Dhabi) and M365 multi-geo support enable customer data and exchange mail to remain inside the UAE for regulated buyers." },
        { title: "Copilot productivity AI", body: "Microsoft 365 Copilot brings GPT-4-class AI to Word, Excel, Outlook, Teams, and PowerPoint, with enterprise-grade data protection and admin controls, the most production-ready gen-AI productivity rollout for enterprise." },
      ],
    },
    productShowcase: {
      eyebrow: "Featured Solutions: M365 · Defender · Entra · Sentinel",
      heading: "Complete Microsoft Product Portfolio",
      intro: "Productivity, security, identity, and management across Microsoft 365, Defender XDR, Entra, Intune, Sentinel, Purview, and Copilot.",
      products: [
        { icon: "grid", title: "Microsoft 365", description: "Productivity suite with Word, Excel, PowerPoint, Outlook, Teams, OneDrive, and SharePoint, cloud and desktop." },
        { icon: "users", title: "Microsoft Teams", description: "Collaboration platform combining chat, meetings, calling, and apps, also enterprise telephony with Teams Phone." },
        { icon: "monitor", title: "Windows 11 Enterprise", description: "Enterprise OS with hardware-based security, Windows Hello, BitLocker, and Endpoint-managed update controls." },
        { icon: "shield", title: "Defender XDR", description: "Microsoft Defender for Endpoint, Identity, Office 365, and Cloud, unified XDR with one investigation portal." },
        { icon: "key", title: "Microsoft Entra", description: "Identity and access management, Entra ID (Azure AD), Conditional Access, MFA, and privileged identity management." },
        { icon: "phone", title: "Microsoft Intune", description: "Cloud-based unified endpoint management for Windows, macOS, iOS, and Android, replaces SCCM for modern workplaces." },
        { icon: "eye", title: "Microsoft Sentinel", description: "Cloud-native SIEM and SOAR with built-in AI, threat intelligence, and 350+ data connectors for SOC operations." },
        { icon: "folder", title: "Microsoft Purview", description: "Data governance, classification, DLP, insider risk management, and compliance across cloud and on-prem data." },
        { icon: "activity", title: "Power Platform", description: "Power BI, Power Apps, Power Automate, and Power Virtual Agents, low-code business intelligence and automation." },
        { icon: "database", title: "Dynamics 365", description: "Enterprise ERP and CRM suite covering sales, customer service, finance, supply chain, HR, and field service." },
        { icon: "zap", title: "Microsoft Copilot", description: "AI assistants embedded across Microsoft 365, Defender, Dynamics, and Power Platform, Copilot for security, sales, and ops." },
        { icon: "server", title: "SQL Server", description: "Industry-leading relational database for on-prem and hybrid deployments, high availability, security, and analytics." },
      ],
    },
    ctaHeading: "Talk to our Microsoft Specialist",
  },

  /* ───────── ENDPOINT ───────── */
  {
    slug: "crowdstrike",
    name: "CrowdStrike",
    logo: "/logos/CrowdStrike.webp",
    description:
      "CrowdStrike Falcon delivers cloud-native endpoint protection, EDR/XDR, threat intelligence, and managed hunting from a single lightweight agent. Artiflex deploys CrowdStrike across the UAE, Oman, and Saudi Arabia.",
    categories: ["endpoint", "siem"],
  },
  {
    slug: "bitdefender",
    name: "Bitdefender",
    logo: "/logos/Bitdefender.png",
    description:
      "Bitdefender GravityZone provides multi-layered endpoint protection, EDR, and risk analytics with consistently top-rated detection in independent tests. Artiflex deploys Bitdefender across the UAE, Oman, and Saudi Arabia.",
    categories: ["endpoint"],
  },
  {
    slug: "sentinelone",
    name: "SentinelOne",
    logo: "/logos/SentinelOne.png",
    description:
      "SentinelOne Singularity delivers autonomous, AI-driven endpoint and XDR protection with one-click ransomware rollback. Artiflex deploys SentinelOne across the UAE, Oman, and Saudi Arabia.",
    categories: ["endpoint"],
  },

  /* ───────── EMAIL SECURITY ───────── */
  {
    slug: "abnormal-ai",
    name: "Abnormal AI",
    logo: "/logos/Abnormal.png",
    description:
      "Abnormal AI uses behavioural AI to stop business email compromise, account takeover, and advanced phishing that bypass traditional gateways. Artiflex deploys Abnormal across the UAE, Oman, and Saudi Arabia.",
    categories: ["email"],
  },
  {
    slug: "barracuda",
    name: "Barracuda",
    logo: "/logos/Barracuda.png",
    description:
      "Barracuda secures email, applications, and networks with email protection, backup, and SASE delivered through a single cloud platform. Artiflex deploys Barracuda across the UAE, Oman, and Saudi Arabia.",
    categories: ["email"],
  },
  {
    slug: "knowbe4",
    name: "KnowBe4",
    logo: "/logos/KnowBe4.webp",
    description:
      "KnowBe4 is the leading security awareness training and simulated phishing platform for building a human firewall. Artiflex deploys KnowBe4 across the UAE, Oman, and Saudi Arabia.",
    categories: ["email"],
  },
  {
    slug: "darktrace",
    name: "Darktrace",
    logo: "/logos/Darktrace.png",
    description:
      "Darktrace applies self-learning AI to detect and autonomously respond to email, network, and cloud threats in real time. Artiflex deploys Darktrace across the UAE, Oman, and Saudi Arabia.",
    categories: ["email", "siem"],
  },
  {
    slug: "fortra",
    name: "Fortra",
    logo: "/logos/Fortra.png",
    description:
      "Fortra brings together email security, data loss prevention, and offensive security tools including Tripwire and Digital Guardian. Artiflex deploys Fortra across the UAE, Oman, and Saudi Arabia.",
    categories: ["email", "dlp", "vuln"],
  },

  /* ───────── DATA LOSS PREVENTION ───────── */
  {
    slug: "forcepoint",
    name: "Forcepoint",
    logo: "/logos/forcepoint.png",
    description:
      "Forcepoint delivers data-first SASE with enterprise DLP, CASB, and SWG protecting data everywhere it lives and moves. Artiflex deploys Forcepoint across the UAE, Oman, and Saudi Arabia.",
    categories: ["dlp", "sase"],
  },
  {
    slug: "symantec",
    name: "Symantec",
    logo: "/logos/Symantec.png",
    description:
      "Symantec (Broadcom) provides one of the most mature enterprise DLP suites covering endpoint, network, storage, and cloud data channels. Artiflex deploys Symantec across the UAE, Oman, and Saudi Arabia.",
    categories: ["dlp"],
  },
  {
    slug: "trellix",
    name: "Trellix",
    logo: "/logos/Trellix.png",
    description:
      "Trellix delivers data loss prevention and XDR built from the McAfee Enterprise and FireEye heritage. Artiflex deploys Trellix across the UAE, Oman, and Saudi Arabia.",
    categories: ["dlp"],
  },
  {
    slug: "netskope",
    name: "Netskope",
    logo: "/logos/Netscope.png",
    description:
      "Netskope is a SASE leader unifying CASB, SWG, ZTNA, and inline DLP to secure data across cloud and web. Artiflex deploys Netskope across the UAE, Oman, and Saudi Arabia.",
    categories: ["dlp", "sase"],
  },

  /* ───────── IDENTITY & ACCESS MANAGEMENT ───────── */
  {
    slug: "okta",
    name: "Okta",
    logo: "/logos/Okta.png",
    description:
      "Okta is the leading independent identity platform delivering SSO, adaptive MFA, lifecycle management, and customer identity (Auth0). Artiflex deploys Okta across the UAE, Oman, and Saudi Arabia.",
    categories: ["iam"],
  },
  {
    slug: "ping-identity",
    name: "Ping Identity",
    logo: "/logos/pingidentity.png",
    description:
      "Ping Identity (with ForgeRock) delivers enterprise-grade federation, access management, and the deepest legacy-protocol coverage. Artiflex deploys Ping across the UAE, Oman, and Saudi Arabia.",
    categories: ["iam"],
  },
  {
    slug: "cyberark",
    name: "CyberArk",
    logo: "/logos/CyberArk.png",
    description:
      "CyberArk is the privileged access management leader, securing credentials, secrets, and session access for human and machine identities. Artiflex deploys CyberArk across the UAE, Oman, and Saudi Arabia.",
    categories: ["iam"],
  },
  {
    slug: "beyondtrust",
    name: "BeyondTrust",
    logo: "/logos/BeyondTrust.webp",
    description:
      "BeyondTrust delivers privileged access management, secure remote access, and endpoint privilege management on one platform. Artiflex deploys BeyondTrust across the UAE, Oman, and Saudi Arabia.",
    categories: ["iam"],
  },
  {
    slug: "delinea",
    name: "Delinea",
    logo: "/logos/Delinea.webp",
    description:
      "Delinea (Thycotic + Centrify) provides PAM, secrets management, and just-in-time privilege elevation with fast time-to-value. Artiflex deploys Delinea across the UAE, Oman, and Saudi Arabia.",
    categories: ["iam"],
  },
  {
    slug: "one-identity",
    name: "One Identity",
    logo: "/logos/OneIdentity.png",
    description:
      "One Identity unifies identity governance (Identity Manager), PAM (Safeguard), and access management across the enterprise. Artiflex deploys One Identity across the UAE, Oman, and Saudi Arabia.",
    categories: ["iam"],
  },
  {
    slug: "saviynt",
    name: "Saviynt",
    logo: "/logos/Saviynt.png",
    description:
      "Saviynt delivers cloud-native identity governance and administration, application access governance, and cloud PAM. Artiflex deploys Saviynt across the UAE, Oman, and Saudi Arabia.",
    categories: ["iam"],
  },
  {
    slug: "sailpoint",
    name: "SailPoint",
    logo: "/logos/sailpoint.webp",
    description:
      "SailPoint is the identity governance leader, automating access certification, role mining, and SoD with AI-driven identity security. Artiflex deploys SailPoint across the UAE, Oman, and Saudi Arabia.",
    categories: ["iam"],
  },
  {
    slug: "jumpcloud",
    name: "JumpCloud",
    logo: "/logos/JumpCloud.webp",
    description:
      "JumpCloud is an open directory platform combining SSO, MFA, device management, and cloud LDAP/RADIUS for mid-market IT. Artiflex deploys JumpCloud across the UAE, Oman, and Saudi Arabia.",
    categories: ["iam"],
  },
  {
    slug: "hashicorp",
    name: "HashiCorp",
    logo: "/logos/HashiCorp.png",
    description:
      "HashiCorp delivers Vault secrets management, Terraform infrastructure-as-code, and multi-cloud automation. Artiflex deploys HashiCorp across the UAE, Oman, and Saudi Arabia.",
    categories: ["iam", "cloud"],
  },
  {
    slug: "transmit-security",
    name: "Transmit Security",
    logo: "/logos/transmit.png",
    description:
      "Transmit Security provides passwordless authentication, identity orchestration, and fraud prevention for customer identity. Artiflex deploys Transmit Security across the UAE, Oman, and Saudi Arabia.",
    categories: ["iam"],
  },

  /* ───────── SIEM, SOAR & MDR ───────── */
  {
    slug: "splunk",
    name: "Splunk",
    logo: "/logos/Splunk.webp",
    description:
      "Splunk (Cisco) is the data-platform leader for SIEM and observability, powering Enterprise Security and SOAR analytics at scale. Artiflex deploys Splunk across the UAE, Oman, and Saudi Arabia.",
    categories: ["siem"],
  },
  {
    slug: "ibm",
    name: "IBM",
    logo: "/logos/IBM-Security.png",
    description:
      "IBM delivers QRadar SIEM, IBM Cloud, and FlashSystem storage backed by X-Force threat intelligence and enterprise services. Artiflex deploys IBM across the UAE, Oman, and Saudi Arabia.",
    categories: ["siem", "cloud", "storage"],
  },
  {
    slug: "arctic-wolf",
    name: "Arctic Wolf",
    logo: "/logos/arctic-wolf.png",
    description:
      "Arctic Wolf delivers managed detection and response, managed risk, and security operations through its cloud-native Aurora platform. Artiflex partners with Arctic Wolf across the UAE, Oman, and Saudi Arabia.",
    categories: ["siem"],
  },
  {
    slug: "vectra-ai",
    name: "Vectra AI",
    logo: "/logos/Vectra.png",
    description:
      "Vectra AI provides AI-driven network detection and response (NDR), surfacing hidden attacker behaviour across cloud and on-prem. Artiflex deploys Vectra across the UAE, Oman, and Saudi Arabia.",
    categories: ["siem"],
  },
  {
    slug: "extrahop",
    name: "ExtraHop",
    logo: "/logos/ExtraHop.png",
    description:
      "ExtraHop RevealX delivers network detection and response with line-rate decryption and behavioural analytics. Artiflex deploys ExtraHop across the UAE, Oman, and Saudi Arabia.",
    categories: ["siem"],
  },
  {
    slug: "corelight",
    name: "Corelight",
    logo: "/logos/Corelight.png",
    description:
      "Corelight delivers open NDR built on Zeek and Suricata, giving SOC teams rich network evidence for threat hunting. Artiflex deploys Corelight across the UAE, Oman, and Saudi Arabia.",
    categories: ["siem"],
  },

  /* ───────── VULNERABILITY MANAGEMENT ───────── */
  {
    slug: "tenable",
    name: "Tenable",
    logo: "/logos/tenable.png",
    description:
      "Tenable is the exposure-management leader behind Nessus, delivering vulnerability management across IT, cloud, OT, and identity. Artiflex deploys Tenable across the UAE, Oman, and Saudi Arabia.",
    categories: ["vuln"],
  },
  {
    slug: "qualys",
    name: "Qualys",
    logo: "/logos/qualys.png",
    description:
      "Qualys delivers cloud-based vulnerability management, detection and response (VMDR), compliance, and web app scanning. Artiflex deploys Qualys across the UAE, Oman, and Saudi Arabia.",
    categories: ["vuln"],
  },
  {
    slug: "rapid7",
    name: "Rapid7",
    logo: "/logos/rapid7.png",
    description:
      "Rapid7 unifies vulnerability management (InsightVM), SIEM (InsightIDR), and SOAR on its Insight cloud platform. Artiflex deploys Rapid7 across the UAE, Oman, and Saudi Arabia.",
    categories: ["vuln", "siem"],
  },
  {
    slug: "mandiant",
    name: "Mandiant",
    logo: "/logos/Mandiant.png",
    description:
      "Mandiant (Google Cloud) provides frontline threat intelligence, attack surface management, and incident response expertise. Artiflex partners with Mandiant across the UAE, Oman, and Saudi Arabia.",
    categories: ["vuln"],
  },

  /* ───────── CLOUD & VIRTUALIZATION ───────── */
  {
    slug: "aws",
    name: "Amazon Web Services",
    logo: "/logos/Amazon_Web_Services.svg",
    description:
      "AWS is the world's most comprehensive cloud platform, offering compute, storage, database, AI/ML, and migration services at global scale. Artiflex delivers AWS across the UAE, Oman, and Saudi Arabia.",
    categories: ["cloud"],
  },
  {
    slug: "google-cloud",
    name: "Google Cloud",
    logo: "/logos/Google-Cloud.webp",
    description:
      "Google Cloud delivers leading data analytics, AI/ML (Vertex AI), Kubernetes (GKE), and Anthos hybrid-cloud capabilities. Artiflex delivers Google Cloud across the UAE, Oman, and Saudi Arabia.",
    categories: ["cloud"],
  },
  {
    slug: "oracle",
    name: "Oracle",
    logo: "/logos/Oracle.png",
    description:
      "Oracle delivers OCI cloud infrastructure, autonomous database, and Oracle Identity Governance for enterprise workloads. Artiflex deploys Oracle across the UAE, Oman, and Saudi Arabia.",
    categories: ["cloud", "iam"],
  },
  {
    slug: "alibaba-cloud",
    name: "Alibaba Cloud",
    logo: "/logos/AlibabaCloudLogo.png",
    description:
      "Alibaba Cloud is the leading APAC hyperscaler offering elastic compute, storage, and data intelligence with regional reach. Artiflex delivers Alibaba Cloud across the UAE, Oman, and Saudi Arabia.",
    categories: ["cloud"],
  },
  {
    slug: "red-hat-openshift",
    name: "Red Hat OpenShift",
    logo: "/logos/RedHatOpenShift.png",
    description:
      "Red Hat OpenShift is the enterprise Kubernetes platform for building, deploying, and managing containerised apps across hybrid cloud. Artiflex deploys OpenShift across the UAE, Oman, and Saudi Arabia.",
    categories: ["cloud"],
  },
  {
    slug: "dell-technologies",
    name: "Dell Technologies",
    logo: "/logos/Dell_Technologies.webp",
    description:
      "Dell delivers PowerEdge servers, PowerStore storage, PowerProtect data protection, and APEX as-a-service infrastructure. Artiflex deploys Dell across the UAE, Oman, and Saudi Arabia.",
    categories: ["servers", "storage", "backup", "cloud"],
  },

  /* ───────── BACKUP & DISASTER RECOVERY ───────── */
  {
    slug: "commvault",
    name: "Commvault",
    logo: "/logos/Commvault.svg",
    description:
      "Commvault Cloud delivers enterprise backup, recovery, and cyber resilience with air-gapped, immutable data protection. Artiflex deploys Commvault across the UAE, Oman, and Saudi Arabia.",
    categories: ["backup"],
  },
  {
    slug: "rubrik",
    name: "Rubrik",
    logo: "/logos/Rubrik.png",
    description:
      "Rubrik delivers data security and zero-trust backup with immutability, ransomware recovery, and data threat analytics. Artiflex deploys Rubrik across the UAE, Oman, and Saudi Arabia.",
    categories: ["backup"],
  },
  {
    slug: "cohesity",
    name: "Cohesity",
    logo: "/logos/Cohesity.png",
    description:
      "Cohesity consolidates backup, recovery, and data management on a hyperconverged platform with AI-powered threat defence. Artiflex deploys Cohesity across the UAE, Oman, and Saudi Arabia.",
    categories: ["backup"],
  },
  {
    slug: "zerto",
    name: "Zerto",
    logo: "/logos/Zerto.webp",
    description:
      "Zerto (HPE) delivers continuous data protection and disaster recovery with near-zero RPO through journal-based replication. Artiflex deploys Zerto across the UAE, Oman, and Saudi Arabia.",
    categories: ["backup"],
  },
  {
    slug: "carbonite",
    name: "Carbonite",
    logo: "/logos/carbonite-by-opentext.png",
    description:
      "Carbonite (OpenText) provides cloud backup, endpoint protection, and server migration for business continuity. Artiflex deploys Carbonite across the UAE, Oman, and Saudi Arabia.",
    categories: ["backup", "cloud"],
  },
  {
    slug: "cloudendure",
    name: "CloudEndure",
    logo: "/logos/CloudEndure.png",
    description:
      "CloudEndure (AWS) delivers block-level replication for live workload migration and disaster recovery into the cloud. Artiflex deploys CloudEndure across the UAE, Oman, and Saudi Arabia.",
    categories: ["cloud", "backup"],
  },
  {
    slug: "rivermeadow",
    name: "RiverMeadow",
    logo: "/logos/Rivermeadow.png",
    description:
      "RiverMeadow automates large-scale workload migration and modernisation across any source to any cloud. Artiflex deploys RiverMeadow across the UAE, Oman, and Saudi Arabia.",
    categories: ["cloud"],
  },
  {
    slug: "druva",
    name: "Druva",
    logo: "/logos/Druva.png",
    description:
      "Druva delivers fully SaaS, air-gapped data protection for endpoints, SaaS apps, and cloud workloads with zero infrastructure. Artiflex deploys Druva across the UAE, Oman, and Saudi Arabia.",
    categories: ["backup"],
  },
  {
    slug: "avepoint",
    name: "AvePoint",
    logo: "/logos/AvePoint.png",
    description:
      "AvePoint delivers Microsoft 365 backup, data governance, and migration for resilient collaboration environments. Artiflex deploys AvePoint across the UAE, Oman, and Saudi Arabia.",
    categories: ["backup"],
  },

  /* ───────── NETWORKING & WIRELESS ───────── */
  {
    slug: "juniper",
    name: "Juniper",
    logo: "/logos/JuniperMist.webp",
    description:
      "Juniper Mist delivers AI-driven wired, wireless, and SD-WAN networking with Marvis virtual network assistant. Artiflex deploys Juniper across the UAE, Oman, and Saudi Arabia.",
    categories: ["networking"],
  },
  {
    slug: "arista",
    name: "Arista",
    logo: "/logos/Arista.png",
    description:
      "Arista delivers high-performance data-center and campus switching built on the programmable EOS network operating system. Artiflex deploys Arista across the UAE, Oman, and Saudi Arabia.",
    categories: ["networking"],
  },
  {
    slug: "extreme-networks",
    name: "Extreme Networks",
    logo: "/logos/ExtremeNetworks.png",
    description:
      "Extreme Networks delivers cloud-managed wired and wireless networking with end-to-end fabric and analytics. Artiflex deploys Extreme across the UAE, Oman, and Saudi Arabia.",
    categories: ["networking"],
  },
  {
    slug: "ruckus",
    name: "Ruckus",
    logo: "/logos/Ruckus.png",
    description:
      "Ruckus (CommScope) delivers high-density, high-performance Wi-Fi and switching for demanding venues and enterprises. Artiflex deploys Ruckus across the UAE, Oman, and Saudi Arabia.",
    categories: ["networking"],
  },
  {
    slug: "ubiquiti",
    name: "Ubiquiti",
    logo: "/logos/Ubiquiti.png",
    description:
      "Ubiquiti delivers cost-effective UniFi networking, Wi-Fi, and surveillance managed through a single intuitive controller. Artiflex deploys Ubiquiti across the UAE, Oman, and Saudi Arabia.",
    categories: ["networking"],
  },

  /* ───────── SERVERS & COMPUTE ───────── */
  {
    slug: "lenovo",
    name: "Lenovo",
    logo: "/logos/Lenovo.png",
    description:
      "Lenovo ThinkSystem and ThinkAgile deliver enterprise servers, hyperconverged infrastructure, and edge compute. Artiflex deploys Lenovo across the UAE, Oman, and Saudi Arabia.",
    categories: ["servers"],
  },
  {
    slug: "supermicro",
    name: "Supermicro",
    logo: "/logos/Supermicro.png",
    description:
      "Supermicro delivers high-density, GPU-optimised, and energy-efficient servers for AI, HPC, and data-center workloads. Artiflex deploys Supermicro across the UAE, Oman, and Saudi Arabia.",
    categories: ["servers"],
  },

  /* ───────── STORAGE ───────── */
  {
    slug: "pure-storage",
    name: "Pure Storage",
    logo: "/logos/PureStorage.png",
    description:
      "Pure Storage delivers all-flash arrays and Evergreen storage-as-a-service with effortless performance and ransomware resilience. Artiflex deploys Pure Storage across the UAE, Oman, and Saudi Arabia.",
    categories: ["storage"],
  },
  {
    slug: "netapp",
    name: "NetApp",
    logo: "/logos/NetApp.png",
    description:
      "NetApp delivers intelligent data management across on-prem ONTAP and hybrid multi-cloud with built-in data protection. Artiflex deploys NetApp across the UAE, Oman, and Saudi Arabia.",
    categories: ["storage"],
  },
  {
    slug: "cloudian",
    name: "Cloudian",
    logo: "/logos/Cloudian.webp",
    description:
      "Cloudian delivers S3-compatible object storage at scale with immutable, ransomware-resistant data protection. Artiflex deploys Cloudian across the UAE, Oman, and Saudi Arabia.",
    categories: ["storage"],
  },

  /* ───────── POWER & UPS ───────── */
  {
    slug: "schneider-electric",
    name: "Schneider Electric",
    logo: "/logos/SchneiderElectric.png",
    description:
      "Schneider Electric (APC) delivers UPS systems, power distribution, and EcoStruxure data-center infrastructure management. Artiflex deploys Schneider across the UAE, Oman, and Saudi Arabia.",
    categories: ["power"],
  },
  {
    slug: "vertiv",
    name: "Vertiv",
    logo: "/logos/Vertiv.png",
    description:
      "Vertiv (Liebert) delivers UPS, precision cooling, and critical power infrastructure for data centers and edge sites. Artiflex deploys Vertiv across the UAE, Oman, and Saudi Arabia.",
    categories: ["power"],
  },
  {
    slug: "eaton",
    name: "Eaton",
    logo: "/logos/Eaton.png",
    description:
      "Eaton delivers UPS systems, power distribution, and intelligent power management for resilient infrastructure. Artiflex deploys Eaton across the UAE, Oman, and Saudi Arabia.",
    categories: ["power"],
  },
  {
    slug: "riello",
    name: "Riello",
    logo: "/logos/Riello.png",
    description:
      "Riello UPS delivers efficient single- and three-phase uninterruptible power supply systems for business continuity. Artiflex deploys Riello across the UAE, Oman, and Saudi Arabia.",
    categories: ["power"],
  },
  {
    slug: "socomec",
    name: "Socomec",
    logo: "/logos/Socomec.png",
    description:
      "Socomec delivers UPS, power switching, and energy monitoring for critical and industrial power applications. Artiflex deploys Socomec across the UAE, Oman, and Saudi Arabia.",
    categories: ["power"],
  },
  {
    slug: "rittal",
    name: "Rittal",
    logo: "/logos/rittal.png",
    description:
      "Rittal delivers data-center racks, climate control, and modular enclosure systems for IT and industrial environments. Artiflex deploys Rittal across the UAE, Oman, and Saudi Arabia.",
    categories: ["power"],
  },
  {
    slug: "legrand",
    name: "Legrand",
    logo: "/logos/Legrand.png",
    description:
      "Legrand delivers structured cabling, PDUs, and data-center power and connectivity infrastructure. Artiflex deploys Legrand across the UAE, Oman, and Saudi Arabia.",
    categories: ["power", "cabling"],
  },

  /* ───────── CCTV & SURVEILLANCE ───────── */
  {
    slug: "axis-communications",
    name: "Axis Communications",
    logo: "/logos/AxisCommunications.png",
    description:
      "Axis Communications pioneered the network camera and delivers premium IP video surveillance, analytics, and access control. Artiflex deploys Axis across the UAE, Oman, and Saudi Arabia.",
    categories: ["surveillance"],
  },
  {
    slug: "hanwha-vision",
    name: "Hanwha Vision",
    logo: "/logos/HanwhaVision.png",
    description:
      "Hanwha Vision delivers AI-powered IP cameras, recorders, and video analytics for enterprise surveillance. Artiflex deploys Hanwha across the UAE, Oman, and Saudi Arabia.",
    categories: ["surveillance"],
  },
  {
    slug: "hikvision",
    name: "Hikvision",
    logo: "/logos/Hikvision.png",
    description:
      "Hikvision delivers a broad portfolio of IP cameras, NVRs, and AcuSense AI video security at scale. Artiflex deploys Hikvision across the UAE, Oman, and Saudi Arabia.",
    categories: ["surveillance"],
  },
  {
    slug: "dahua",
    name: "Dahua",
    logo: "/logos/Dahua.svg",
    description:
      "Dahua delivers IP cameras, recorders, and WizMind AI analytics for cost-effective video surveillance. Artiflex deploys Dahua across the UAE, Oman, and Saudi Arabia.",
    categories: ["surveillance"],
  },
  {
    slug: "avigilon",
    name: "Avigilon",
    logo: "/logos/Avigilon.png",
    description:
      "Avigilon (Motorola Solutions) delivers high-definition surveillance, AI video analytics, and unified access control. Artiflex deploys Avigilon across the UAE, Oman, and Saudi Arabia.",
    categories: ["surveillance"],
  },
  {
    slug: "bosch",
    name: "Bosch",
    logo: "/logos/Bosch.png",
    description:
      "Bosch Security delivers professional video surveillance, intrusion, and access control systems for critical sites. Artiflex deploys Bosch across the UAE, Oman, and Saudi Arabia.",
    categories: ["surveillance", "access-control"],
  },

  /* ───────── ACCESS CONTROL & BIOMETRICS ───────── */
  {
    slug: "hid-global",
    name: "HID Global",
    logo: "/logos/HIDGlobal.png",
    description:
      "HID Global delivers trusted identity, access cards, readers, and biometric solutions for physical and logical access. Artiflex deploys HID across the UAE, Oman, and Saudi Arabia.",
    categories: ["access-control"],
  },
  {
    slug: "suprema",
    name: "Suprema",
    logo: "/logos/Suprema.png",
    description:
      "Suprema delivers biometric access control and time-and-attendance with industry-leading fingerprint and facial recognition. Artiflex deploys Suprema across the UAE, Oman, and Saudi Arabia.",
    categories: ["access-control"],
  },
  {
    slug: "zkteco",
    name: "ZKTeco",
    logo: "/logos/ZKTeco.png",
    description:
      "ZKTeco delivers biometric readers, turnstiles, and access-control hardware for enterprise and SMB sites. Artiflex deploys ZKTeco across the UAE, Oman, and Saudi Arabia.",
    categories: ["access-control"],
  },
  {
    slug: "honeywell",
    name: "Honeywell",
    logo: "/logos/Honeywell.png",
    description:
      "Honeywell delivers integrated access control, intrusion, and building security management systems. Artiflex deploys Honeywell across the UAE, Oman, and Saudi Arabia.",
    categories: ["access-control"],
  },
  {
    slug: "genetec",
    name: "Genetec",
    logo: "/logos/Genetec.png",
    description:
      "Genetec delivers unified security with Security Center bringing access control, video, and ALPR onto one platform. Artiflex deploys Genetec across the UAE, Oman, and Saudi Arabia.",
    categories: ["access-control"],
  },

  /* ───────── STRUCTURED CABLING ───────── */
  {
    slug: "commscope",
    name: "CommScope",
    logo: "/logos/CommScope.png",
    description:
      "CommScope SYSTIMAX delivers high-performance structured cabling and fibre infrastructure for enterprise and data centers. Artiflex deploys CommScope across the UAE, Oman, and Saudi Arabia.",
    categories: ["cabling"],
  },
  {
    slug: "panduit",
    name: "Panduit",
    logo: "/logos/Panduit.png",
    description:
      "Panduit delivers network infrastructure, structured cabling, and intelligent connectivity for the connected enterprise. Artiflex deploys Panduit across the UAE, Oman, and Saudi Arabia.",
    categories: ["cabling"],
  },
  {
    slug: "belden",
    name: "Belden",
    logo: "/logos/Belden.svg",
    description:
      "Belden delivers end-to-end signal transmission and structured cabling for enterprise and industrial networks. Artiflex deploys Belden across the UAE, Oman, and Saudi Arabia.",
    categories: ["cabling"],
  },
  {
    slug: "r-m",
    name: "R&M",
    logo: "/logos/R-M.png",
    description:
      "R&M (Reichle & De-Massari) delivers Swiss-engineered copper and fibre cabling systems for enterprise and data centers. Artiflex deploys R&M across the UAE, Oman, and Saudi Arabia.",
    categories: ["cabling"],
  },
  {
    slug: "corning",
    name: "Corning",
    logo: "/logos/Corning.png",
    description:
      "Corning delivers optical fibre, cable, and connectivity solutions underpinning high-bandwidth networks. Artiflex deploys Corning across the UAE, Oman, and Saudi Arabia.",
    categories: ["cabling"],
  },

  /* ───────── UNIFIED COMMUNICATIONS ───────── */
  {
    slug: "avaya",
    name: "Avaya",
    logo: "/logos/Avaya.png",
    description:
      "Avaya delivers enterprise unified communications, contact center, and cloud calling solutions. Artiflex deploys Avaya across the UAE, Oman, and Saudi Arabia.",
    categories: ["comms"],
  },
  {
    slug: "mitel",
    name: "Mitel",
    logo: "/logos/Mitel.png",
    description:
      "Mitel delivers business phone systems, unified communications, and contact-center solutions for every size of business. Artiflex deploys Mitel across the UAE, Oman, and Saudi Arabia.",
    categories: ["comms"],
  },
  {
    slug: "zoom",
    name: "Zoom",
    logo: "/logos/Zoom.png",
    description:
      "Zoom delivers cloud meetings, Zoom Phone, and Zoom Rooms for modern hybrid collaboration. Artiflex deploys Zoom across the UAE, Oman, and Saudi Arabia.",
    categories: ["comms"],
  },
  {
    slug: "poly",
    name: "Poly (HP)",
    logo: "/logos/PolyHP.png",
    description:
      "Poly (HP) delivers professional headsets, video bars, and conference-room endpoints for hybrid work. Artiflex deploys Poly across the UAE, Oman, and Saudi Arabia.",
    categories: ["comms"],
  },
  {
    slug: "logitech",
    name: "Logitech",
    logo: "/logos/Logitech.svg",
    description:
      "Logitech delivers video conferencing room systems, webcams, and collaboration peripherals certified for Teams and Zoom. Artiflex deploys Logitech across the UAE, Oman, and Saudi Arabia.",
    categories: ["comms"],
  },
  {
    slug: "yealink",
    name: "Yealink",
    logo: "/logos/yealink.png",
    description:
      "Yealink delivers IP phones, video conferencing endpoints, and meeting-room systems for unified communications. Artiflex deploys Yealink across the UAE, Oman, and Saudi Arabia.",
    categories: ["comms"],
  },

  /* ───────── PRINTING & DOCUMENT ───────── */
  {
    slug: "hp",
    name: "HP",
    logo: "/logos/HP.png",
    description:
      "HP delivers enterprise printers, multifunction devices, and managed print services with secure print workflows. Artiflex deploys HP across the UAE, Oman, and Saudi Arabia.",
    categories: ["printing"],
  },
  {
    slug: "canon",
    name: "Canon",
    logo: "/logos/Canon.png",
    description:
      "Canon delivers multifunction printers, production print, and document management for the modern workplace. Artiflex deploys Canon across the UAE, Oman, and Saudi Arabia.",
    categories: ["printing"],
  },
  {
    slug: "konica-minolta",
    name: "Konica Minolta",
    logo: "/logos/KonicaMinolta.png",
    description:
      "Konica Minolta delivers bizhub multifunction devices, production print, and managed print services. Artiflex deploys Konica Minolta across the UAE, Oman, and Saudi Arabia.",
    categories: ["printing"],
  },
  {
    slug: "xerox",
    name: "Xerox",
    logo: "/logos/Xerox.png",
    description:
      "Xerox delivers multifunction printers, production presses, and workflow automation with managed print services. Artiflex deploys Xerox across the UAE, Oman, and Saudi Arabia.",
    categories: ["printing"],
  },
  {
    slug: "ricoh",
    name: "Ricoh",
    logo: "/logos/Ricoh.png",
    description:
      "Ricoh delivers multifunction printers, digital services, and managed document workflows for the workplace. Artiflex deploys Ricoh across the UAE, Oman, and Saudi Arabia.",
    categories: ["printing"],
  },
  {
    slug: "lexmark",
    name: "Lexmark",
    logo: "/logos/Lexmark.png",
    description:
      "Lexmark delivers secure enterprise printers, multifunction devices, and print management software. Artiflex deploys Lexmark across the UAE, Oman, and Saudi Arabia.",
    categories: ["printing"],
  },
];

export function getVendorBySlug(slug: string): Vendor | undefined {
  return VENDORS.find((v) => v.slug === slug);
}

/* ───────── CYBERSECURITY DETAIL-PAGE LINKING ─────────
   Each Vendors-page entry can map to one or more cybersecurity vendor
   detail pages by listing the slugs of those detail pages. We don't
   import the cybersecurity vendor data here to keep this module light;
   the slug list is the contract used by VendorDetailPage to render
   "Related cybersecurity solutions" links. Any slug listed here MUST
   exist in the corresponding cybersecurity data file.                */

export type RelatedCategory = "firewall" | "endpoint" | "email" | "dlp";

export const RELATED_CATEGORY_META: Record<
  RelatedCategory,
  { label: string; pathBase: string; accent: string; chipBg: string; chipBorder: string }
> = {
  firewall: {
    label: "Firewall & Network Security",
    pathBase: "/cybersecurity/firewalls",
    accent: "#1B8AC7",
    chipBg: "bg-[#28B5E1]/10",
    chipBorder: "border-[#28B5E1]/30",
  },
  endpoint: {
    label: "Endpoint Security (EDR / XDR)",
    pathBase: "/cybersecurity/endpoint",
    accent: "#7C3AED",
    chipBg: "bg-violet-500/10",
    chipBorder: "border-violet-400/30",
  },
  email: {
    label: "Email Security",
    pathBase: "/cybersecurity/email",
    accent: "#059669",
    chipBg: "bg-emerald-500/10",
    chipBorder: "border-emerald-400/30",
  },
  dlp: {
    label: "Data Loss Prevention",
    pathBase: "/cybersecurity/dlp",
    accent: "#E2231A",
    chipBg: "bg-rose-500/10",
    chipBorder: "border-rose-400/30",
  },
};

export type RelatedDetailLink = {
  category: RelatedCategory;
  productName: string;
  slug: string;
};

/** Manually curated map: vendor slug → list of cybersecurity detail pages. */
export const RELATED_DETAIL_PAGES: Record<string, RelatedDetailLink[]> = {
  sophos: [
    { category: "firewall", productName: "Sophos XGS", slug: "sophos-xgs" },
    { category: "endpoint", productName: "Sophos Endpoint", slug: "sophos-endpoint" },
    { category: "email", productName: "Sophos Email Security", slug: "sophos-email" },
    { category: "dlp", productName: "Sophos DLP", slug: "sophos-dlp" },
  ],
  "check-point": [
    { category: "firewall", productName: "Check Point Quantum", slug: "check-point-quantum" },
    { category: "endpoint", productName: "Check Point Harmony Endpoint", slug: "check-point-harmony" },
    { category: "email", productName: "Check Point Harmony Email & Collaboration", slug: "check-point-harmony-email" },
    { category: "dlp", productName: "Check Point Harmony DLP", slug: "check-point-harmony-dlp" },
  ],
  fortinet: [
    { category: "firewall", productName: "Fortinet FortiGate", slug: "fortinet-fortigate" },
  ],
  cisco: [
    { category: "firewall", productName: "Cisco Secure Firewall", slug: "cisco-secure-firewall" },
  ],
  "palo-alto-networks": [
    { category: "firewall", productName: "Palo Alto Networks", slug: "palo-alto-networks" },
    { category: "endpoint", productName: "Palo Alto Cortex XDR", slug: "palo-alto-cortex-xdr" },
  ],
  eset: [
    { category: "endpoint", productName: "ESET PROTECT", slug: "eset-protect" },
  ],
  "trend-micro": [
    { category: "endpoint", productName: "Trend Micro Vision One", slug: "trend-micro-vision-one" },
  ],
  sonicwall: [
    { category: "firewall", productName: "SonicWall TZ / NSa", slug: "sonicwall" },
  ],
  proofpoint: [
    { category: "email", productName: "Proofpoint", slug: "proofpoint" },
  ],
  mimecast: [
    { category: "email", productName: "Mimecast", slug: "mimecast" },
  ],
  microsoft: [
    { category: "endpoint", productName: "Microsoft Defender for Endpoint", slug: "microsoft-defender-endpoint" },
    { category: "email", productName: "Microsoft Defender for Office 365", slug: "microsoft-defender-o365" },
    { category: "dlp", productName: "Microsoft Purview DLP", slug: "microsoft-purview-dlp" },
  ],
};
