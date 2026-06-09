export type WorkspaceVendor = {
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
};

export const workspaceVendors: Record<string, WorkspaceVendor> = {
  "sophos-workspace-protection": {
    slug: "sophos-workspace-protection",
    name: "Sophos Workspace Protection",
    logo: "/logos/sophos.svg",
    tagline: "Browser-native SSE bundling ZTNA, SWG, DNS security and email monitoring with Synchronized Security automation and best-in-class Shadow AI governance",
    bestFor: "Recommended · Most Innovative Solution",
    description:
      "Sophos Workspace Protection bundles Zero Trust Network Access, Secure Web Gateway, DNS security and email monitoring into a single per-user licence delivered through the Sophos Protected Browser (powered by Island.io). For UAE buyers already running Sophos Endpoint or Sophos Firewall, Synchronized Security automation means a compromised endpoint loses ZTNA access automatically. Agentless BYOD and best-in-class Shadow IT / Shadow AI governance round out the platform. Most compelling when the Sophos ecosystem is already in the estate, or when consolidating browser, ZTNA and SWG onto one operational pane.",
    keyStats: [
      { label: "Recognition", value: "Most Innovative Solution award winner" },
      { label: "Licensing", value: "Single per-user licence covers ZTNA + SWG + DNS + Email" },
      { label: "Differentiator", value: "Synchronized Security with Endpoint and Firewall" },
      { label: "BYOD", value: "Agentless, delivered via Protected Browser" },
    ],
    whyWinsIntro: {
      label: "Sophos Workspace Protection Highlights",
      title: "The right SSE for Sophos-aligned UAE estates and Shadow AI governance",
      description:
        "Sophos Workspace Protection is most compelling when Sophos Endpoint or Sophos Firewall are already in production, because Synchronized Security automation between them is genuinely unique in the SSE category. For greenfield SSE deployments without Sophos elsewhere in the estate, Check Point Harmony SASE typically leads UAE shortlists, and for premium global SASE with the broadest feature set, Palo Alto Prisma Access remains the Leader-quadrant pick.",
      stats: [
        { value: "1 licence", label: "ZTNA + SWG + DNS + Email monitoring + Protected Browser bundled", tone: "emerald" },
        { value: "Sync", label: "Synchronized Security, compromised endpoint loses ZTNA access automatically", tone: "violet" },
        { value: "Agentless", label: "BYOD coverage via Protected Browser without endpoint agent install", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Protected Browser",
        icon: "globe",
        tone: "emerald",
        title: "Island-powered enterprise browser as the SSE anchor",
        desc: "The Sophos Protected Browser (powered by Island.io) is the delivery surface, every SSE policy applies at the browser layer. Agentless BYOD, screen-share controls, copy / paste / download governance and watermarking happen without an endpoint agent.",
      },
      {
        tag: "Synchronized Security",
        icon: "shield",
        tone: "violet",
        title: "Endpoint health drives ZTNA in real time",
        desc: "Sophos Endpoint and Sophos Firewall share Security Heartbeat telemetry with Workspace Protection. A compromised endpoint loses ZTNA access automatically until it is re-cleared. Unique automation pattern across major SSE platforms.",
      },
      {
        tag: "Shadow AI",
        icon: "eye",
        tone: "sky",
        title: "Best-in-class Shadow IT and Shadow AI governance",
        desc: "Discovery, risk scoring and policy controls for unsanctioned AI tools and SaaS apps. Particularly strong on emerging AI / LLM apps that traditional CASB databases trail on. Critical as UAE buyers face NESA and NCA ECC pressure on AI governance.",
      },
      {
        tag: "ZTNA",
        icon: "lock",
        tone: "amber",
        title: "Identity-based access without VPN",
        desc: "Per-application ZTNA replaces legacy VPN concentrators. Conditional Access by user, device posture and risk score. Tightly integrated with Microsoft Entra ID, Okta and Sophos Central identity sources.",
      },
      {
        tag: "SWG + DNS",
        icon: "activity",
        tone: "rose",
        title: "Cloud SWG with DNS-layer enforcement",
        desc: "Cloud Secure Web Gateway plus DNS-layer protection inspect outbound web traffic, block phishing and command-and-control DNS lookups, and apply category-based policy. Telemetry surfaces in the same Sophos Central console.",
      },
      {
        tag: "Email monitoring",
        icon: "mail",
        tone: "slate",
        title: "Email exposure telemetry inside Workspace Protection",
        desc: "Email-layer monitoring surfaces credential exposure and risky inbound patterns into Workspace Protection's policy plane. Complements Sophos Email or Microsoft Defender for Office 365 rather than replacing them.",
      },
    ],
    watchOuts: [
      {
        title: "Strongest leverage when Sophos ecosystem is already in place",
        desc: "Synchronized Security is the differentiator, and it depends on Sophos Endpoint or Sophos Firewall being deployed. For non-Sophos UAE estates, the relative advantage narrows and Check Point Harmony SASE or Palo Alto Prisma Access typically win the shortlist.",
      },
      {
        title: "Newer entrant in the SASE category",
        desc: "Workspace Protection is a recent launch. Functionality is competitive but the platform is younger than Check Point Harmony SASE or Palo Alto Prisma Access. Reference customer count in MENA is still growing.",
      },
      {
        title: "No native SD-WAN",
        desc: "Workspace Protection does not ship its own SD-WAN. Sophos XGS Firewall provides SD-WAN where it is in scope. For estates needing native cloud SD-WAN as part of SASE, Check Point Harmony or Palo Alto Prisma Access cover both layers in one platform.",
      },
    ],
    bestFitProfile: [
      "UAE estates already running Sophos Endpoint, Sophos Firewall or Sophos MDR",
      "Buyers consolidating browser, ZTNA and SWG into a single per-user licence",
      "Organisations with significant Shadow IT / Shadow AI governance pressure under NESA / NCA ECC",
      "Hybrid and remote workforces needing agentless BYOD coverage",
      "Mid-market and upper-mid-market enterprises wanting one-vendor security operations",
      "Customers replacing legacy VPN concentrators with identity-based ZTNA",
      "Sophos Central operators wanting unified policy across Endpoint, Firewall, MDR and Workspace",
    ],
    products: [
      { model: "Sophos Workspace Protection (Bundle)", segment: "Strategic SSE", role: "ZTNA + SWG + DNS + Email monitoring + Protected Browser, recommended starting point" },
      { model: "Sophos Protected Browser (Island.io)", segment: "Browser SSE", role: "Enterprise browser delivery surface, agentless BYOD coverage" },
      { model: "Sophos ZTNA", segment: "ZTNA", role: "Identity-based per-application access, Synchronized Security to Endpoint" },
      { model: "Sophos Cloud SWG", segment: "SWG", role: "Cloud-delivered web filtering with category-based policy" },
      { model: "Sophos DNS Protection", segment: "DNS", role: "DNS-layer phishing, C2 and category enforcement" },
      { model: "Sophos Endpoint + Firewall (recommended pairing)", segment: "Synchronized Security", role: "Endpoint heartbeat + Firewall context drive Workspace Protection automation" },
    ],
    whyArtiflex:
      "Artiflex IT is a Platinum Sophos Partner delivering Workspace Protection end-to-end across UAE estates. Our team has deployed the full Sophos stack, Endpoint Intercept X, Firewall XGS, MDR and Workspace Protection, across mid-market, enterprise and government customers, and we have the operational pattern for Synchronized Security between Endpoint, Firewall and Workspace tightly worked out. Vendor-neutral sizing is our default starting point; we will tell you when Check Point Harmony SASE or Palo Alto Prisma Access is the stronger fit.",
    faqs: [
      {
        question: "Is Workspace Protection a full SASE platform?",
        answer:
          "Workspace Protection is SSE, Zero Trust Network Access, Secure Web Gateway, DNS security and email monitoring delivered via the Protected Browser. The Network Edge of SASE (SD-WAN) is provided by Sophos XGS Firewall rather than by Workspace Protection itself. For UAE customers needing both SSE and native cloud SD-WAN in one product, Check Point Harmony SASE or Palo Alto Prisma Access cover both layers.",
      },
      {
        question: "How is Synchronized Security different from other SSE vendors?",
        answer:
          "When Sophos Endpoint detects a compromise, the Security Heartbeat changes state, and Workspace Protection automatically revokes ZTNA access for the affected user / device until the endpoint is cleared. The automation is bidirectional across Sophos Firewall as well. Other SSE vendors integrate with EDRs, but cross-platform automation at this depth is unique to the Sophos stack.",
      },
      {
        question: "Do we need Sophos Endpoint to use Workspace Protection?",
        answer:
          "No, Workspace Protection runs standalone and protects any browser-based access. But Synchronized Security is only active when Sophos Endpoint or Sophos Firewall is also in production. For non-Sophos estates, you still get the bundle's ZTNA + SWG + DNS + Email functionality, just without the Sophos-unique automation.",
      },
      {
        question: "Is Protected Browser the same as Island Browser?",
        answer:
          "Sophos Protected Browser is powered by Island.io technology, integrated into the Sophos Central management plane. Same enterprise-browser foundation as Island, surfaced through Sophos licensing, telemetry and policy.",
      },
      {
        question: "How does this compare to Microsoft Defender for Cloud Apps?",
        answer:
          "MCAS is the deepest CASB for the Microsoft estate (Exchange, SharePoint, OneDrive, Teams) and is bundled in M365 E5. Workspace Protection is broader at the SWG / ZTNA / Browser layer and has stronger Shadow AI governance. Many UAE customers run both, MCAS for the M365-native scope, Workspace Protection for the wider SSE perimeter and Shadow AI.",
      },
    ],
    whatIs: {
      eyebrow: "What is Sophos Workspace Protection",
      titlePrefix: "Browser-native SSE for the ",
      titleHighlight: "Shadow AI era",
      bodyParagraphs: [
        "Sophos Workspace Protection is a converged Security Service Edge platform delivered through the Sophos Protected Browser. ZTNA, SWG, DNS security and email monitoring are bundled into a single per-user licence, no multi-product stitch, no separate consoles.",
        "Where legacy SWG and CASB inspected traffic at the perimeter, Workspace Protection enforces policy at the browser. That makes Shadow AI governance, agentless BYOD coverage and copy / paste / download controls fundamentally easier than gateway-only architectures, and it makes the platform genuinely browser-native rather than gateway-with-a-plugin.",
        "For UAE buyers, the platform's headline value is Synchronized Security: Workspace Protection cross-correlates with Sophos Endpoint and Sophos Firewall telemetry, automatically revoking ZTNA access when an endpoint is compromised. This is the automation pattern that elevates Workspace Protection above standalone SSE, and is the reason Sophos won Most Innovative Solution in the SSE category.",
      ],
      feature: {
        titleLine1: "Synchronized Security",
        titleLine2: "ZTNA + Endpoint + Firewall",
        body: "When Sophos Endpoint detects compromise, the Security Heartbeat propagates to Workspace Protection and Sophos Firewall. ZTNA access is revoked for the affected user / device, firewall rules tighten, and the incident is correlated across all three control planes in Sophos Central. This automation pattern is unique among major SSE platforms and dramatically reduces dwell time in active incidents.",
      },
      capabilities: [
        "Zero Trust Network Access with conditional policy",
        "Cloud Secure Web Gateway",
        "DNS-layer phishing and C2 protection",
        "Email exposure monitoring",
        "Shadow IT / Shadow AI discovery and policy",
        "Agentless BYOD via Protected Browser",
        "Synchronized Security with Sophos Endpoint",
        "Synchronized Security with Sophos Firewall",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Three ways to consume Sophos Workspace Protection,",
      intro: "sized by Sophos estate footprint, BYOD scope and licence model.",
      options: [
        { icon: "cloud", title: "Standalone Workspace Protection", body: "Per-user licence bundling ZTNA + SWG + DNS + Email + Protected Browser. Right starting point for non-Sophos estates or pilot rollouts." },
        { icon: "virtual", title: "Workspace + Endpoint bundle", body: "Workspace Protection paired with Sophos Endpoint Intercept X. Synchronized Security activates the automation layer. Recommended pattern for most UAE customers." },
        { icon: "hardware", title: "Workspace + Firewall + Endpoint (full stack)", body: "Full Sophos ecosystem: Workspace Protection + Endpoint + XGS Firewall + MDR. Tightest Synchronized Security automation and unified Sophos Central operations." },
      ],
    },
  },

  "check-point-harmony-sase": {
    slug: "check-point-harmony-sase",
    name: "Check Point Harmony SASE",
    logo: "/logos/Check-Point-2024-logo-color.svg",
    tagline: "Full-stack cloud SASE with ThreatCloud AI inspection across 100+ PoPs, unified under the Check Point Infinity portal",
    bestFor: "Recommended · Best for Check Point Infinity Customers",
    description:
      "Check Point Harmony SASE is a full-featured cloud SASE platform that replaces legacy VPN, web proxies and standalone CASB. Harmony Connect ZTNA inspected by ThreatCloud AI across 100+ global PoPs, Cloud SWG with 99.3% phishing block accuracy, Firewall-as-a-Service and SD-WAN are unified under the Check Point Infinity portal alongside Quantum firewalls, Harmony Endpoint and Harmony Email. For UAE customers consolidating onto Check Point Infinity, Harmony SASE is the natural SSE / SASE answer with the deepest cross-product policy unification in this shortlist.",
    keyStats: [
      { label: "Architecture", value: "Full SASE, SSE + SD-WAN + FWaaS in one platform" },
      { label: "Inspection", value: "ThreatCloud AI across 100+ global PoPs" },
      { label: "Phishing accuracy", value: "99.3% block rate (Check Point benchmark)" },
      { label: "Unified policy", value: "Infinity portal with Quantum, Harmony Endpoint, Email" },
    ],
    strengths: [
      {
        tag: "ThreatCloud AI",
        icon: "shield",
        tone: "emerald",
        title: "AI-driven inspection at every PoP",
        desc: "ThreatCloud AI applies threat intelligence and behaviour analysis to every session at the Harmony PoP, phishing, zero-day malware, anomalous traffic patterns. The same intelligence layer drives Check Point Quantum firewalls and Harmony Endpoint.",
      },
      {
        tag: "Full SASE stack",
        icon: "layers",
        tone: "violet",
        title: "ZTNA + SWG + CASB + FWaaS + SD-WAN in one",
        desc: "Harmony SASE bundles the full SSE / SASE spectrum into one cloud platform, ZTNA, SWG, CASB, FWaaS and SD-WAN. Removes the need to stitch multiple SSE vendors plus a separate SD-WAN provider.",
      },
      {
        tag: "Infinity policy",
        icon: "globe",
        tone: "sky",
        title: "Unified policy across Quantum, Harmony, Email",
        desc: "Check Point Infinity portal is the single management plane across Quantum firewalls, Harmony SASE, Harmony Endpoint and Harmony Email. Unique consolidation depth for buyers already on Check Point.",
      },
      {
        tag: "100+ PoPs",
        icon: "activity",
        tone: "amber",
        title: "Global PoP footprint with regional inspection",
        desc: "100+ global Points of Presence include MENA coverage relevant to UAE customers. Traffic inspected close to user location, reducing latency for distributed workforces and global SaaS access patterns.",
      },
      {
        tag: "Cloud SWG",
        icon: "eye",
        tone: "rose",
        title: "Strong URL filtering and phishing block accuracy",
        desc: "Cloud Secure Web Gateway with Check Point-reported 99.3% phishing block accuracy. SSL inspection, sandboxing and category-based policy across the full web surface.",
      },
      {
        tag: "Per-user licence",
        icon: "users",
        tone: "slate",
        title: "Predictable per-user SASE economics",
        desc: "Per-user licence model simplifies commercial scoping vs traditional CapEx firewall purchases. Bundled scope across SSE + FWaaS + SD-WAN reduces the multi-vendor procurement burden.",
      },
    ],
    watchOuts: [
      {
        title: "Strongest leverage on Check Point Infinity estates",
        desc: "Harmony SASE's deepest unique advantage is the unified Infinity policy plane across Quantum, Harmony Endpoint and Harmony Email. For non-Check Point estates, the relative advantage narrows and the shortlist often goes to Palo Alto Prisma Access or Netskope on different dimensions.",
      },
      {
        title: "Limited Remote Browser Isolation depth",
        desc: "RBI capability is present but less deep than Palo Alto Prisma Access or Netskope. For buyers whose dominant SSE driver is RBI (high-risk web access, regulated content categories), the SSE specialists typically lead.",
      },
      {
        title: "MENA PoP coverage growing",
        desc: "Check Point's MENA PoP footprint is solid but still expanding. For UAE buyers with strict residency requirements, validate current PoP locations as part of the architecture review.",
      },
    ],
    bestFitProfile: [
      "UAE customers consolidating onto Check Point Infinity (Quantum + Harmony stack)",
      "Buyers needing full SASE in one product, SSE + SD-WAN + FWaaS",
      "Organisations replacing legacy VPN concentrators with cloud-delivered ZTNA",
      "Estates wanting predictable per-user SASE licensing instead of CapEx firewall refresh",
      "Customers under SOC consolidation pressure who want one policy plane across firewall, endpoint, email and SASE",
      "Distributed workforces needing global PoP-inspected traffic across SaaS and private apps",
      "Buyers wanting ThreatCloud AI inspection consistency from on-prem firewall through to SASE",
    ],
    products: [
      { model: "Harmony SASE (Bundle)", segment: "Strategic", role: "Full SASE, SSE + SD-WAN + FWaaS, recommended starting point" },
      { model: "Harmony Connect (ZTNA)", segment: "ZTNA", role: "Per-application identity-based access, replaces legacy VPN" },
      { model: "Harmony Cloud SWG", segment: "SWG", role: "Web filtering, SSL inspection, phishing protection" },
      { model: "Harmony Email", segment: "Email", role: "Email security typically deployed alongside Harmony SASE" },
      { model: "Harmony Endpoint", segment: "EDR", role: "Endpoint detection and response under unified Infinity policy" },
      { model: "Check Point Infinity Portal", segment: "Management", role: "Unified management across Quantum, Harmony SASE, Endpoint and Email" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Check Point Harmony SASE for UAE customers consolidating onto Check Point Infinity. Our team has hands-on experience deploying Harmony Connect ZTNA, Cloud SWG and Infinity policy unification alongside Quantum firewall estates. Vendor-neutral sizing is our default starting point, we will tell you when Sophos Workspace Protection, Palo Alto Prisma Access or Netskope is the stronger fit for your specific buying criteria.",
    faqs: [
      {
        question: "When does Harmony SASE win over Sophos Workspace Protection?",
        answer:
          "When the buyer is already consolidating onto Check Point Infinity, when native SD-WAN is needed in the same product as SSE, or when ThreatCloud AI inspection consistency across firewall + SASE is the buying driver. Sophos wins when Synchronized Security with Sophos Endpoint / Firewall is decisive, or when Shadow AI governance is the dominant requirement.",
      },
      {
        question: "Can Harmony SASE replace our VPN?",
        answer:
          "Yes. Harmony Connect ZTNA is specifically designed to replace legacy VPN concentrators with identity-based, per-application access, no VPN client install, no broad network exposure once authenticated. Common first-phase pattern for UAE Harmony SASE deployments.",
      },
      {
        question: "Does Harmony SASE include SD-WAN?",
        answer:
          "Yes. Harmony SASE includes cloud-delivered SD-WAN, optional Harmony SD-WAN edge appliances and integration with Quantum firewalls. This is the structural difference from SSE-only platforms (Netskope, Microsoft GSA).",
      },
      {
        question: "How does Infinity policy unification work in practice?",
        answer:
          "Check Point Infinity is the management plane that surfaces unified policy authoring and event correlation across Quantum on-prem firewalls, Harmony SASE, Harmony Endpoint and Harmony Email. The same threat intelligence (ThreatCloud AI) drives all of them. For Check Point-aligned estates, this is the deepest unification in this shortlist.",
      },
    ],
  },

  "palo-alto-prisma-access": {
    slug: "palo-alto-prisma-access",
    name: "Palo Alto Networks Prisma Access",
    logo: "/logos/PaloAltoNetworks.svg",
    tagline: "Gartner Magic Quadrant Leader for SSE with the broadest SASE feature set powered by Palo Alto AI across 100+ global PoPs",
    bestFor: "Broadest SASE Feature Set · 100+ Global PoPs",
    description:
      "Palo Alto Networks Prisma Access is the Gartner Magic Quadrant Leader for SSE and delivers the broadest SASE feature set in this shortlist, ZTNA, SWG, CASB, FWaaS, DLP, Remote Browser Isolation, powered by Palo Alto AI across 100+ global Points of Presence. App-ID enforces ZTNA per application across 5,000+ audited SaaS apps. Precision AI applies inline inspection at scale. For UAE large enterprises with global remote workforces and the budget to match, Prisma Access is the natural Leader-tier pick, though premium pricing (typically 40-60% more than Sophos or Check Point) and operational depth require expert operators.",
    keyStats: [
      { label: "Gartner position", value: "Magic Quadrant Leader for SSE" },
      { label: "PoP footprint", value: "100+ global Points of Presence" },
      { label: "SaaS coverage", value: "5,000+ audited cloud apps" },
      { label: "Inspection", value: "Precision AI inline at scale" },
    ],
    strengths: [
      {
        tag: "MQ Leader",
        icon: "shield",
        tone: "emerald",
        title: "Gartner Magic Quadrant Leader for SSE",
        desc: "Prisma Access has held Leader position in Gartner's SSE Magic Quadrant for multiple consecutive years. Procurement and audit teams across UAE FSI and government recognise the platform name; the risk profile of choosing Prisma Access is the lowest of any Leader-quadrant SSE pick.",
      },
      {
        tag: "Broadest feature set",
        icon: "layers",
        tone: "violet",
        title: "Full SSE spectrum plus RBI and DLP at depth",
        desc: "Prisma Access delivers ZTNA, SWG, CASB, FWaaS, DLP and Remote Browser Isolation at depth. RBI in particular is deeper than Check Point Harmony or Sophos Workspace Protection, useful for high-risk web access and regulated content scenarios.",
      },
      {
        tag: "App-ID",
        icon: "lock",
        tone: "sky",
        title: "Application-aware ZTNA across 5,000+ SaaS apps",
        desc: "Palo Alto's long-running App-ID identifies and policies traffic at the application layer rather than port / protocol layer. ZTNA enforcement is per-application across 5,000+ audited SaaS apps. Structural advantage that comes from Palo Alto's NGFW heritage.",
      },
      {
        tag: "Precision AI",
        icon: "activity",
        tone: "amber",
        title: "AI-driven inline threat detection at scale",
        desc: "Precision AI applies machine learning to inline traffic at PoP scale, phishing, malware, zero-day patterns, data exfiltration. Deep model investment by Palo Alto translates into competitive inline detection metrics across most workloads.",
      },
      {
        tag: "Global PoPs",
        icon: "globe",
        tone: "rose",
        title: "100+ PoPs with broad regional inspection coverage",
        desc: "100+ global Points of Presence with the deepest reference footprint for global remote-workforce inspection. Useful for UAE multinationals with users in EMEA, APAC and the Americas needing consistent SASE policy enforcement.",
      },
      {
        tag: "Cortex integration",
        icon: "eye",
        tone: "slate",
        title: "Integrated with Cortex XDR / XSIAM",
        desc: "Prisma Access telemetry feeds into the broader Palo Alto Cortex ecosystem, XDR for endpoint, XSIAM for SOC. Strong fit for UAE customers already standardised on Palo Alto Cortex security operations.",
      },
    ],
    watchOuts: [
      {
        title: "Premium pricing tier",
        desc: "Prisma Access pricing is typically 40-60% above Sophos Workspace Protection or Check Point Harmony SASE. Best fit for large enterprises with global remote workforces and the budget to match. For mid-market estates without global PoP requirements, the price-performance favours other vendors.",
      },
      {
        title: "Powerful console needs expert operators",
        desc: "Prisma Access's depth and breadth come with operational complexity. Reaching steady-state policy authoring and incident response needs a partner with Palo Alto Cortex / Prisma operational maturity, without it, deployments accumulate workflow debt.",
      },
      {
        title: "Best fit when global remote workforce is the buying driver",
        desc: "Prisma Access's strongest advantages, global PoPs, App-ID, broadest feature set, show up most clearly for global enterprises. For UAE-centric estates without distributed remote workforce scope, the relative advantage narrows.",
      },
    ],
    bestFitProfile: [
      "UAE large enterprises and multinationals with global remote workforces",
      "Buyers prioritising Gartner Leader quadrant for procurement / audit risk",
      "Estates needing the broadest SSE feature set including deep RBI and DLP",
      "Customers already standardised on Palo Alto Cortex XDR / XSIAM",
      "Banks and FSI estates needing depth across ZTNA + SWG + CASB + FWaaS + DLP in one platform",
      "Organisations with budget tolerance for premium SASE pricing",
      "Distributed estates needing application-aware ZTNA across 5,000+ audited SaaS apps",
    ],
    products: [
      { model: "Prisma Access (Bundle)", segment: "Strategic SASE", role: "Full SASE, ZTNA + SWG + CASB + FWaaS + DLP + RBI" },
      { model: "Prisma Access Browser", segment: "Browser SSE", role: "Enterprise browser delivery option for agentless BYOD" },
      { model: "Prisma SD-WAN", segment: "SD-WAN", role: "Cloud-delivered SD-WAN paired with Prisma Access SSE" },
      { model: "Prisma SaaS Security (CASB)", segment: "CASB", role: "Deep CASB across 5,000+ audited SaaS apps" },
      { model: "Cortex XDR (recommended pairing)", segment: "EDR", role: "Endpoint detection and response integrated with Prisma Access telemetry" },
      { model: "Cortex XSIAM (recommended pairing)", segment: "SIEM", role: "AI-driven SOC platform consuming Prisma Access events" },
    ],
    whyArtiflex:
      "Artiflex IT is a strategic Palo Alto Networks partner delivering Prisma Access for UAE large enterprises and multinationals. Our team covers Prisma Access policy design, Cortex XDR / XSIAM integration and global PoP architecture review. Vendor-neutral sizing is our default starting point, we will tell you when Sophos Workspace Protection or Check Point Harmony SASE is the more cost-efficient fit for your scope, and when Netskope is stronger on CASB depth specifically.",
    faqs: [
      {
        question: "When does Prisma Access win over Check Point or Sophos?",
        answer:
          "When the buyer is a large enterprise or multinational with global remote workforce, when Gartner Leader quadrant is mandated by procurement / audit, when RBI and DLP depth are buying criteria, or when Cortex XDR / XSIAM is already the SOC standard. Sophos and Check Point typically win on price-performance for UAE-centric and mid-market estates.",
      },
      {
        question: "Is Prisma Access worth the price premium?",
        answer:
          "For large enterprises with global remote workforces, broad regulated SSE scope and Cortex SOC alignment, typically yes. For UAE-centric mid-market estates without these drivers, the 40-60% price premium is often hard to justify against Sophos Workspace Protection or Check Point Harmony SASE.",
      },
      {
        question: "Can we run Prisma Access without Cortex XDR?",
        answer:
          "Yes, Prisma Access runs standalone. Cortex integration deepens the value because telemetry correlates across endpoint, SASE and SOC, but it is not a prerequisite.",
      },
      {
        question: "How do we right-size Prisma Access?",
        answer:
          "Sizing follows user count, traffic volume per user, regions in scope, and the SASE feature mix (which of ZTNA / SWG / CASB / FWaaS / DLP / RBI are in commercial scope). Artiflex provides vendor-neutral architecture review and Palo Alto-direct sizing as part of pre-deployment.",
      },
    ],
  },

  "netskope-sse": {
    slug: "netskope-sse",
    name: "Netskope SSE",
    logo: "/logos/Netscope.png",
    tagline: "SaaS-specialist SSE with the deepest CASB and cloud DLP, NewEdge fabric inspecting 50,000+ apps across 50+ PoPs",
    bestFor: "Deepest CASB · Strongest Cloud DLP",
    description:
      "Netskope is a dedicated Security Service Edge specialist with the deepest SaaS visibility in this shortlist. The NewEdge fabric inspects 50,000+ cloud apps across 50+ Points of Presence. CASB operates in both API and inline modes, and ML-based DLP applies across cloud-to-cloud and cloud-to-endpoint data flows. For UAE buyers whose dominant SSE driver is CASB depth, SaaS sprawl governance, cloud data protection, granular SaaS-tenant policy, Netskope is the natural specialist pick. For full SASE convergence with native SD-WAN and tight firewall / endpoint synchronisation, other vendors lead.",
    keyStats: [
      { label: "Specialism", value: "Dedicated SSE, no on-prem firewall legacy" },
      { label: "SaaS coverage", value: "50,000+ cloud apps inspected" },
      { label: "PoP footprint", value: "NewEdge, 50+ global PoPs" },
      { label: "DLP", value: "ML-based across cloud-to-cloud and cloud-to-endpoint" },
    ],
    strengths: [
      {
        tag: "CASB depth",
        icon: "eye",
        tone: "emerald",
        title: "Deepest SaaS visibility across 50,000+ apps",
        desc: "Netskope's SaaS app database is widely cited as the deepest in the SSE market, 50,000+ apps with granular activity-level policy (post / share / upload / download per app). Critical when SaaS sprawl governance is the dominant buying driver.",
      },
      {
        tag: "API + Inline CASB",
        icon: "layers",
        tone: "violet",
        title: "Dual-mode CASB for active and historical data",
        desc: "Netskope CASB operates in both API mode (scans data at rest in SaaS tenants for historical exposure) and inline mode (controls active data flows in real time). Most SSE platforms offer one or the other; Netskope leads on dual-mode depth.",
      },
      {
        tag: "Cloud DLP",
        icon: "shield",
        tone: "sky",
        title: "ML-based DLP across cloud-to-cloud flows",
        desc: "ML-trained DLP applies across cloud-to-cloud, cloud-to-endpoint and endpoint-to-cloud data flows. Particularly strong for unstructured cloud data scenarios where regex-only DLP misses sensitive content patterns.",
      },
      {
        tag: "NewEdge fabric",
        icon: "globe",
        tone: "amber",
        title: "Dedicated inspection backbone, not a public-cloud overlay",
        desc: "Netskope built its own private backbone (NewEdge) rather than overlaying SSE on a public-cloud provider. Lower-latency inspection at PoP and stronger SLA characteristics for global SaaS access patterns.",
      },
      {
        tag: "ZTNA Next",
        icon: "lock",
        tone: "rose",
        title: "ZTNA Next with continuous adaptive trust",
        desc: "ZTNA Next extends per-application access with continuous trust scoring, device posture, behaviour, geolocation drift trigger re-evaluation. Useful for buyers where ZTNA is paired with deep CASB rather than as standalone replacement-of-VPN.",
      },
      {
        tag: "SaaS Security Posture",
        icon: "list",
        tone: "slate",
        title: "SSPM for SaaS misconfiguration discovery",
        desc: "Netskope SaaS Security Posture Management scans SaaS tenant configurations for risk, Salesforce, M365, Box, ServiceNow, and surfaces misconfiguration findings in the same console as CASB and DLP.",
      },
    ],
    watchOuts: [
      {
        title: "Standalone SSE, no SD-WAN networking",
        desc: "Netskope is SSE-only. For UAE estates wanting full SASE convergence (SSE + SD-WAN + FWaaS in one product), Check Point Harmony SASE or Palo Alto Prisma Access cover both layers. Netskope is typically paired with a separate SD-WAN vendor when SASE is the commercial scope.",
      },
      {
        title: "Limited firewall / endpoint synchronisation",
        desc: "Netskope integrates with leading EDRs and firewalls via API but does not offer Sophos-style Synchronized Security or Check Point-style Infinity unified policy. Standalone-specialist posture, not unified-vendor posture.",
      },
      {
        title: "Mid-high standalone cost",
        desc: "Netskope is a specialist with specialist pricing. Most cost-efficient when CASB depth is the dominant criterion that justifies the premium. For broader SSE without CASB-leading requirements, more bundled vendors typically win on TCO.",
      },
    ],
    bestFitProfile: [
      "UAE customers with significant SaaS sprawl needing deep CASB governance",
      "Regulated estates where cloud DLP is the dominant SSE driver",
      "Organisations needing dual-mode CASB (API for historical, inline for active)",
      "Multi-cloud / multi-SaaS estates with broad app diversity beyond Microsoft",
      "Customers prioritising specialist depth over single-vendor SASE convergence",
      "Buyers wanting SSPM for SaaS tenant configuration governance alongside CASB",
      "Estates already running a strong SD-WAN they don't want to displace",
    ],
    products: [
      { model: "Netskope SSE (Bundle)", segment: "Strategic SSE", role: "ZTNA Next + SWG + CASB + Cloud DLP, recommended starting point" },
      { model: "Netskope CASB (API + Inline)", segment: "CASB", role: "Dual-mode CASB, deepest in this shortlist" },
      { model: "Netskope Cloud DLP", segment: "DLP", role: "ML-based DLP across cloud-to-cloud and cloud-to-endpoint flows" },
      { model: "Netskope ZTNA Next", segment: "ZTNA", role: "Per-application access with continuous adaptive trust" },
      { model: "Netskope Cloud SWG", segment: "SWG", role: "Cloud web filtering and SSL inspection via NewEdge" },
      { model: "Netskope SSPM", segment: "Posture", role: "SaaS Security Posture Management for tenant configuration governance" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Netskope SSE for UAE customers whose dominant SSE driver is CASB depth and cloud DLP. Our team has experience with Netskope CASB rollouts across multi-SaaS estates, ZTNA Next deployments and SSPM configuration baselines. We are vendor-neutral on SSE, we will tell you when Sophos Workspace Protection, Check Point Harmony SASE or Palo Alto Prisma Access is the stronger fit for your specific buying criteria.",
    faqs: [
      {
        question: "When does Netskope win over Palo Alto or Check Point?",
        answer:
          "When CASB depth is the dominant buying driver, broadest SaaS app coverage, dual-mode CASB (API + inline), strongest cloud DLP. Netskope's specialist focus translates into depth that bundled SASE vendors trail on for pure CASB scope. For broader SSE / SASE convergence with SD-WAN and firewall synchronisation, other vendors lead.",
      },
      {
        question: "Can Netskope replace our CASB plus SWG?",
        answer:
          "Yes. Netskope SSE bundles ZTNA Next, SWG, CASB and Cloud DLP in one platform. Most UAE customers deploy it as the consolidated SSE answer, not as a point CASB.",
      },
      {
        question: "Do we need a separate SD-WAN with Netskope?",
        answer:
          "Typically yes. Netskope is SSE-only with no native SD-WAN. Most UAE Netskope customers pair it with existing SD-WAN (Cisco Meraki, VMware, Aruba) or with a dedicated SD-WAN vendor. For SD-WAN in the same product as SSE, Check Point Harmony SASE or Palo Alto Prisma Access cover both.",
      },
      {
        question: "How does Netskope DLP compare to Forcepoint or Symantec?",
        answer:
          "Netskope DLP is strongest in cloud-to-cloud and cloud-to-endpoint scenarios where ML training on cloud data is decisive. For dedicated endpoint DLP and on-prem network DLP at depth (regulated UAE FSI with broad on-prem scope), Forcepoint or Symantec typically lead. Many estates run both for complementary coverage.",
      },
    ],
  },

  "microsoft-mcas": {
    slug: "microsoft-mcas",
    name: "Microsoft Defender for Cloud Apps + Global Secure Access",
    logo: "/logos/MicrosoftDefender.webp",
    tagline: "Native CASB for the Microsoft estate with Entra Global Secure Access adding ZTNA and SWG, bundled in M365 E5 and Entra Suite",
    bestFor: "Bundled in M365 E5 · Deepest M365 Integration",
    description:
      "Microsoft Defender for Cloud Apps (MCAS) is the native CASB for the Microsoft ecosystem, with the deepest integration into Exchange, SharePoint, OneDrive and Teams. 31,000+ apps are risk-rated and Conditional Access App Control delivers session-level policy. Entra Global Secure Access (GSA) extends the stack into ZTNA and SWG for Microsoft-centric estates. Bundled in M365 E5 and Entra Suite, the platform delivers strong CASB + emerging SSE coverage at zero or near-zero incremental licence cost for E5 customers. Most regulated buyers pair MCAS + GSA with Sophos or Check Point when full SASE convergence is in scope.",
    keyStats: [
      { label: "Bundling", value: "MCAS + GSA bundled in M365 E5 / Entra Suite" },
      { label: "M365 integration", value: "Native into Exchange, SharePoint, OneDrive, Teams" },
      { label: "App coverage", value: "31,000+ apps risk-rated" },
      { label: "Best fit", value: "Microsoft-centric estates already on E5" },
    ],
    strengths: [
      {
        tag: "E5 economics",
        icon: "barChart",
        tone: "emerald",
        title: "Zero or near-zero incremental licence cost",
        desc: "If you are already on Microsoft 365 E5 or Entra Suite, MCAS and Global Secure Access are bundled. No additional vendor relationship to procure, no separate SKU, no parallel infrastructure to operate.",
      },
      {
        tag: "Native CASB",
        icon: "layers",
        tone: "violet",
        title: "Deepest CASB for the Microsoft estate",
        desc: "MCAS is built on Microsoft's own visibility into Exchange Online, SharePoint, OneDrive and Teams. API depth and policy granularity into the M365 surface is structurally deeper than any third-party CASB can be.",
      },
      {
        tag: "Conditional Access",
        icon: "lock",
        tone: "sky",
        title: "Conditional Access App Control for session policy",
        desc: "Conditional Access App Control delivers reverse-proxy session policy, control upload, download, copy, paste at the SaaS-tenant level based on user, device posture and risk. Strong for high-risk SaaS access scenarios.",
      },
      {
        tag: "GSA ZTNA + SWG",
        icon: "globe",
        tone: "amber",
        title: "Entra Global Secure Access adds ZTNA and SWG",
        desc: "Global Secure Access extends the Microsoft SSE stack with Entra-Private Access (ZTNA) and Entra-Internet Access (SWG). Bundled in Entra Suite and natively integrated with Conditional Access, the same identity policy engine drives both.",
      },
      {
        tag: "App risk ratings",
        icon: "eye",
        tone: "rose",
        title: "31,000+ apps with cloud-risk scoring",
        desc: "MCAS Cloud App Catalog risk-rates 31,000+ apps across compliance, security and legal dimensions. Useful for Shadow IT discovery and SaaS sanctioning workflows in regulated UAE estates.",
      },
      {
        tag: "Entra-native",
        icon: "users",
        tone: "slate",
        title: "Same identity policy engine across CASB, ZTNA and SWG",
        desc: "MCAS, Global Secure Access and Conditional Access all share Entra's identity model. One policy authoring layer covers identity, ZTNA, SWG and CASB session control, unique consolidation depth in the Microsoft-centric scenario.",
      },
    ],
    watchOuts: [
      {
        title: "Best when the buyer is fully Microsoft-centric",
        desc: "MCAS depth is unmatched inside the Microsoft estate. For multi-SaaS estates with significant non-Microsoft scope (Salesforce, Box, ServiceNow, multi-cloud), Netskope CASB typically delivers broader depth across the wider SaaS footprint.",
      },
      {
        title: "Limited RBI, no SD-WAN",
        desc: "Microsoft's Remote Browser Isolation story is less mature than Palo Alto or Netskope. GSA does not include SD-WAN. For full SASE convergence including SD-WAN and RBI, pair MCAS + GSA with Sophos or Check Point.",
      },
      {
        title: "GSA newer than dedicated SSE specialists",
        desc: "Global Secure Access is newer than dedicated SSE platforms (Netskope, Prisma Access) and continues to mature. Validate current feature parity against your specific SSE requirements during evaluation.",
      },
      {
        title: "Requires Entra ID P2 / E5 prerequisites",
        desc: "Full MCAS and GSA capability depends on Entra ID P2 (bundled in M365 E5 / Entra Suite). E3 customers must upgrade or add the Entra Suite licence to unlock the full stack.",
      },
    ],
    bestFitProfile: [
      "UAE customers already on Microsoft 365 E5 or Entra Suite contracts",
      "Microsoft-centric estates (M365, Azure, Dynamics) with limited non-Microsoft SaaS scope",
      "Organisations needing the deepest CASB into Exchange, SharePoint, OneDrive, Teams",
      "Buyers pairing MCAS + GSA with Sophos or Check Point for full SASE convergence",
      "SME and mid-market customers wanting bundled CASB + ZTNA + SWG at zero incremental cost",
      "Government and educational institutions standardised on the Microsoft stack",
      "Customers needing Conditional Access App Control for high-risk SaaS sessions",
    ],
    products: [
      { model: "Microsoft Defender for Cloud Apps (MCAS)", segment: "CASB", role: "Native M365 CASB with API + reverse-proxy session control" },
      { model: "Entra Global Secure Access (Private Access)", segment: "ZTNA", role: "Identity-based per-application access via Entra Conditional Access" },
      { model: "Entra Global Secure Access (Internet Access)", segment: "SWG", role: "Cloud SWG natively integrated with Entra identity policy" },
      { model: "Microsoft 365 E5 / Entra Suite", segment: "Bundle", role: "Licensing bundle that includes MCAS + GSA + Entra ID P2 prerequisites" },
      { model: "Microsoft Purview DLP (recommended pairing)", segment: "DLP", role: "Bundled DLP for M365 + Endpoint, complements MCAS data protection scope" },
      { model: "Microsoft Defender XDR (recommended pairing)", segment: "XDR", role: "Endpoint + Identity + Email + Cloud Apps unified in one XDR plane" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Microsoft Defender for Cloud Apps and Entra Global Secure Access for UAE customers already on M365 E5 or Entra Suite. Our team covers MCAS policy design, Conditional Access App Control rollouts, GSA architecture and Purview / Defender XDR integration. We are equally honest about scope: for full SASE convergence with SD-WAN and the deepest non-Microsoft CASB scope, we recommend pairing MCAS + GSA with Sophos Workspace Protection, Check Point Harmony SASE or Netskope.",
    faqs: [
      {
        question: "Is MCAS + GSA enough on its own?",
        answer:
          "For Microsoft-centric SME and mid-market estates without significant non-Microsoft SaaS scope or SD-WAN requirements, often yes, especially when M365 E5 is already on contract. For regulated UAE banks, ministries and enterprises with broad multi-cloud / multi-SaaS scope and SASE convergence requirements, MCAS + GSA is typically paired with Sophos or Check Point.",
      },
      {
        question: "Do we need Entra ID P2 for MCAS and GSA?",
        answer:
          "Yes for full capability. Entra ID P2 is bundled in M365 E5 and Entra Suite. E3 / Business Premium customers must upgrade or add Entra ID P2 separately to unlock MCAS Conditional Access App Control and Global Secure Access.",
      },
      {
        question: "How does GSA compare to dedicated SSE platforms?",
        answer:
          "GSA's strength is Entra-native identity policy unification, the same engine drives CASB, ZTNA and SWG. For Microsoft-centric estates this is structurally deep. For broader SSE feature depth (RBI, advanced cloud DLP, SaaS-app coverage beyond Microsoft), dedicated SSE specialists (Netskope, Palo Alto) typically lead.",
      },
      {
        question: "Can we use MCAS without GSA?",
        answer:
          "Yes, MCAS runs standalone as a CASB even without Global Secure Access deployment. Many UAE customers start with MCAS for the M365-native CASB scope and add GSA later as the ZTNA + SWG layer matures inside the estate.",
      },
    ],
  },
};
