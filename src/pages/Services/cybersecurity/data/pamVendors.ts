export type PamVendor = {
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

export const pamVendors: Record<string, PamVendor> = {
  cyberark: {
    slug: "cyberark",
    name: "CyberArk Identity Security Platform",
    logo: "/logos/CyberArk.png",
    tagline: "Industry standard for PAM, Gartner Magic Quadrant Leader seven years running with the broadest privileged-identity coverage",
    bestFor: "Recommended for PAM · Gartner MQ Leader (7 yrs)",
    description:
      "CyberArk Identity Security Platform is the most-deployed PAM platform in regulated UAE estates. Privilege Cloud (SaaS) and Self-Hosted (on-prem / air-gapped) deliver vaulting, rotation, just-in-time access and session recording for human, machine and AI-agent identities. CORA AI flags anomalous privileged behaviour in real time. For UAE banks under SAMA / CBUAE, ministries under NESA and energy / healthcare estates with the broadest privilege surface, CyberArk remains the safest architectural pick, and is mandated by name in several central-bank cyber-resilience frameworks.",
    keyStats: [
      { label: "Gartner position", value: "Leader · furthest in Completeness of Vision" },
      { label: "Track record", value: "Magic Quadrant Leader 7 years in a row" },
      { label: "Deployment", value: "Privilege Cloud (SaaS) and Self-Hosted (on-prem / air-gap)" },
      { label: "Coverage", value: "Human, machine and AI-agent privileged identities" },
    ],
    whyWinsIntro: {
      label: "CyberArk Identity Security Highlights",
      title: "The right PAM for UAE banks, ministries and the largest regulated estates",
      description:
        "CyberArk is most compelling when audit scope crosses sovereign on-prem requirements, the largest non-human identity estates, and central-bank cyber-resilience mandates that name PAM controls directly. For mid-market velocity without ministry-tier operational depth, Delinea is the right Leader pick; for buyers whose dominant pain is local-admin removal at workstation scale, BeyondTrust often wins.",
      stats: [
        { value: "7 yrs", label: "Gartner Magic Quadrant Leader for Privileged Access Management", tone: "emerald" },
        { value: "Both", label: "Privilege Cloud (SaaS) and Self-Hosted (on-prem / air-gapped) supported", tone: "violet" },
        { value: "CORA AI", label: "real-time anomaly detection across privileged-session behaviour", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "PASM vaulting",
        icon: "lock",
        tone: "emerald",
        title: "Vault, rotate and broker for the largest privilege estates",
        desc: "Privileged Account Security Manager covers credential vaulting, automatic rotation, session brokering and recording across Windows, Linux, network devices, databases, mainframes and cloud control planes. Reference deployments span 100,000+ vaulted credentials.",
      },
      {
        tag: "PEDM",
        icon: "shield",
        tone: "violet",
        title: "Endpoint Privilege Manager for Windows, macOS, Linux",
        desc: "EPM enforces least privilege on workstations and servers, removes local admin, and elevates only signed and policy-approved applications. Strong protection against ransomware and credential-theft chains that depend on local admin.",
      },
      {
        tag: "Machine + AI",
        icon: "activity",
        tone: "sky",
        title: "Secrets Manager and Conjur for machines and AI agents",
        desc: "Conjur Cloud and Secrets Manager handle machine identities, service accounts, CI/CD pipeline secrets and AI-agent credentials at scale. Critical as agentic AI workloads multiply non-human privileged identities inside the estate.",
      },
      {
        tag: "RPAM",
        icon: "globe",
        tone: "amber",
        title: "Remote privileged access for vendors and third parties",
        desc: "Remote Access (formerly Alero) brokers vendor and contractor sessions with full recording, biometric verification and time-bound access, no VPN, no client install, full audit trail.",
      },
      {
        tag: "CORA AI",
        icon: "eye",
        tone: "rose",
        title: "Real-time anomaly detection on privileged behaviour",
        desc: "CORA AI scores privileged-session telemetry and flags anomalies (off-hours access, unusual commands, lateral movement patterns) in real time. Reduces dwell time during the highest-blast-radius compromises.",
      },
      {
        tag: "Sovereign deploy",
        icon: "server",
        tone: "slate",
        title: "Self-Hosted for on-prem and air-gapped estates",
        desc: "Self-Hosted Privileged Access Manager runs fully on-prem or inside sovereign / air-gapped environments. Same functional footprint as Privilege Cloud for buyers under NESA, NCA ECC or defence-grade residency mandates.",
      },
    ],
    watchOuts: [
      {
        title: "Premium per-privileged-user pricing",
        desc: "CyberArk pricing is at the top of the PAM market. For estates under 250 privileged users without active sovereign or central-bank PAM mandates, Delinea or One Identity Safeguard typically deliver Leader-quadrant PAM at materially lower licence cost.",
      },
      {
        title: "Deployment depth requires PAM operations maturity",
        desc: "Reaching steady-state CyberArk operations needs a partner with hands-on PAM experience. Without operational maturity, deployments accumulate workflow debt and become difficult to upgrade over time.",
      },
    ],
    bestFitProfile: [
      "UAE banks and financial services under SAMA / CBUAE cyber-resilience frameworks",
      "Ministries and government bodies under NESA UAE Information Assurance",
      "Energy, healthcare and critical-infrastructure estates with broad privilege surface",
      "Organisations with significant non-human / machine / AI-agent identity scope",
      "Sovereign and air-gapped environments needing Self-Hosted on-prem deployment",
      "Large enterprises above 1,000 privileged users where Leader-quadrant breadth is mandatory",
      "Customers under central-bank or regulator mandates that name CyberArk by reference",
    ],
    products: [
      { model: "CyberArk Privilege Cloud", segment: "SaaS PAM", role: "Cloud-delivered PASM, JIT, session recording, recommended starting point" },
      { model: "CyberArk Self-Hosted Privileged Access Manager", segment: "On-prem PAM", role: "Fully on-prem / air-gap deployment for sovereign and defence estates" },
      { model: "CyberArk Endpoint Privilege Manager (EPM)", segment: "PEDM", role: "Local admin removal and policy-based elevation for Windows / macOS / Linux" },
      { model: "CyberArk Secrets Manager + Conjur", segment: "Machine PAM", role: "Secrets vault for machine identities, CI/CD pipelines and AI agents" },
      { model: "CyberArk Remote Access", segment: "RPAM", role: "Vendor / third-party privileged remote access with biometric verification" },
      { model: "CyberArk Identity Security Platform (Bundle)", segment: "Strategic", role: "Converged platform, recommended for ministry / FSI deployments" },
    ],
    whyArtiflex:
      "Artiflex IT delivers CyberArk Identity Security Platform end-to-end for UAE banks, ministries, energy and healthcare customers. Our team has hands-on experience with Privilege Cloud and Self-Hosted deployments, Endpoint Privilege Manager rollouts for local-admin removal at scale, Conjur for CI/CD and AI-agent secrets, and Remote Access for vendor / third-party privileged access. Vendor-neutral sizing is our default starting point; we will tell you when Delinea or BeyondTrust is a stronger fit.",
    faqs: [
      {
        question: "Privilege Cloud or Self-Hosted, which one do we pick?",
        answer:
          "Privilege Cloud (SaaS) is the recommended starting point for greenfield and cloud-first estates, with the fastest time-to-value and CyberArk-managed maintenance. Self-Hosted is the right answer when sovereign residency, air-gap requirements or central-bank mandates restrict cloud delivery. Both products carry the same core PAM functional footprint.",
      },
      {
        question: "How does CyberArk compare to Delinea?",
        answer:
          "CyberArk leads on breadth, sovereign on-prem, machine PAM at scale, the largest non-human identity estates, and Gartner Completeness of Vision. Delinea leads on time-to-value and operational simplicity for mid-market estates under 1,000 privileged users. For ministry / FSI buyers under NESA, SAMA or CBUAE PAM mandates, CyberArk remains the safer architectural pick.",
      },
      {
        question: "Do we need both CyberArk and Microsoft Entra PIM?",
        answer:
          "Often yes. Entra PIM gives just-in-time elevation for Azure RBAC and Entra directory roles at near-zero incremental cost under E5 / Entra ID P2. CyberArk covers everything Entra PIM does not, SSH, Linux, network devices, databases, machine identities and session recording outside Azure. Many UAE FSI customers run Entra PIM for the Microsoft estate and CyberArk for the wider privileged surface.",
      },
      {
        question: "How long does a CyberArk deployment take?",
        answer:
          "A focused first-phase rollout (top-50 vaulted accounts, session brokering, MFA on the vault, first audit-ready report) typically lands in 12 to 16 weeks for Privilege Cloud. Self-Hosted deployments add infrastructure scoping. PEDM and Conjur are usually phased in over the following two quarters.",
      },
      {
        question: "Does CyberArk govern AI-agent identities?",
        answer:
          "Yes. Secrets Manager and Conjur treat AI-agent and bot identities as first-class privileged identities, with vaulted credentials, rotation policy, session-level auditing and approval workflow. CyberArk's roadmap is explicit on extending PAM controls to agentic AI workloads as NIS2 and NCA ECC begin to address non-human privileged identity directly.",
      },
    ],
    whatIs: {
      eyebrow: "What is CyberArk Identity Security",
      titlePrefix: "Identity-first security for the ",
      titleHighlight: "highest blast-radius accounts",
      bodyParagraphs: [
        "CyberArk Identity Security Platform converges PAM, machine identity security, endpoint privilege management and remote privileged access into a single identity-security plane.",
        "Where traditional PAM solved 'who can use which admin account' as a vault-and-rotate problem, CyberArk solves it as a continuous control plane covering human, machine and AI-agent identities, with vaulting, just-in-time elevation, session recording and AI-driven anomaly detection across the privilege surface.",
        "For UAE regulated buyers, this matters because central-bank frameworks (SAMA, CBUAE), NESA UAE IA and NCA ECC increasingly name PAM controls directly. CyberArk is the platform most often pre-cited by procurement and most often deployed at ministry, FSI and energy scale.",
      ],
      feature: {
        titleLine1: "CORA AI",
        titleLine2: "real-time privilege anomaly detection",
        body: "CORA scores every privileged session in real time, flagging off-hours access, unusual command patterns, lateral movement and policy drift. Critical during high-blast-radius incidents where dwell-time reduction directly limits breach scope. CORA telemetry feeds into the broader Identity Security platform for cross-correlation.",
      },
      capabilities: [
        "Privileged credential vaulting and automatic rotation",
        "Just-in-time elevation with approval workflow",
        "Session recording and command-level audit",
        "Endpoint Privilege Manager (EPM) for local admin removal",
        "Conjur Secrets Manager for CI/CD and AI agents",
        "Remote Privileged Access for vendors and third parties",
        "CORA AI anomaly detection across privileged behaviour",
        "Self-Hosted deployment for sovereign / air-gap estates",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Three ways to consume CyberArk,",
      intro: "sized by sovereignty posture, privileged-user count and operational maturity.",
      options: [
        { icon: "cloud", title: "Privilege Cloud (SaaS)", body: "CyberArk-managed SaaS in regional cloud regions. Fastest time-to-value, recommended for greenfield, cloud-first and modernisation projects without sovereign on-prem mandate." },
        { icon: "hardware", title: "Self-Hosted (on-prem / air-gap)", body: "Fully on-prem or air-gap-capable deployment for ministries, defence and FSI customers under sovereign residency or central-bank mandates that restrict cloud delivery." },
        { icon: "virtual", title: "Hybrid (Privilege Cloud + Self-Hosted)", body: "Privilege Cloud for the bulk of the estate plus a Self-Hosted footprint anchoring sovereign or air-gap workloads. Common pattern for UAE FSI customers with mixed estates." },
      ],
    },
  },

  delinea: {
    slug: "delinea",
    name: "Delinea (Thycotic + Centrify)",
    logo: "/logos/Delinea.webp",
    tagline: "Cloud-first PAM Leader with the fastest time-to-value in the Gartner MQ, built for mid-market velocity",
    bestFor: "Gartner MQ Leader · Mid-Market Friendly",
    description:
      "Delinea is the cloud-first PAM Leader formed by the Thycotic and Centrify merger. Secret Server vaulting, Privilege Manager (PEDM), Connection Manager and Server Suite cover the full privileged-identity surface for mid-market and upper-mid-market UAE buyers. The platform's headline advantage is operational simplicity: modern UX, fast time-to-value, and Leader-quadrant capability without the operational depth that CyberArk-tier deployments require.",
    keyStats: [
      { label: "Gartner position", value: "Leader (Gartner Magic Quadrant)" },
      { label: "Heritage", value: "Thycotic + Centrify merger, now Delinea" },
      { label: "Deployment", value: "Cloud-first SaaS with on-prem options" },
      { label: "Sweet spot", value: "Mid-market and upper-mid-market PAM" },
    ],
    strengths: [
      {
        tag: "Secret Server",
        icon: "lock",
        tone: "emerald",
        title: "Modern, cloud-first credential vaulting",
        desc: "Secret Server delivers vaulting, rotation, session brokering and audit in a SaaS-first architecture with a UX widely cited as the easiest to operate in the Leaders quadrant. Fast onboarding for the first 100-1,000 vaulted credentials.",
      },
      {
        tag: "Privilege Manager",
        icon: "shield",
        tone: "violet",
        title: "Endpoint privilege management without CyberArk effort",
        desc: "Privilege Manager removes local admin and applies policy-based elevation across Windows and macOS, with simpler ruleset authoring than CyberArk EPM. Strong fit when local-admin removal is in scope but not the dominant pain point.",
      },
      {
        tag: "Server Suite",
        icon: "server",
        tone: "sky",
        title: "AD-integrated server privilege management",
        desc: "Centrify Server Suite delivers AD-integrated authentication, role-based access and audit for Linux and Unix servers. Removes the need for parallel /etc/passwd identity stores and centralises Linux privilege under Active Directory.",
      },
      {
        tag: "Connection Manager",
        icon: "monitor",
        tone: "amber",
        title: "RDP, SSH and database session brokering",
        desc: "Connection Manager brokers privileged sessions (RDP, SSH, database) with recording and command-level audit. Tight integration with Secret Server makes session launch and credential rotation a single workflow.",
      },
      {
        tag: "Time-to-value",
        icon: "activity",
        tone: "rose",
        title: "Fastest TTV in the Leaders quadrant",
        desc: "Delinea is consistently cited by Gartner Peer Insights for the fastest deployment time among PAM Leaders. Mid-market estates can be in production with vaulting and PEDM within 8-12 weeks.",
      },
      {
        tag: "DevOps secrets",
        icon: "globe",
        tone: "slate",
        title: "DevOps Secrets Vault for CI/CD and machines",
        desc: "DevOps Secrets Vault delivers machine and CI/CD pipeline secret management for development and platform teams. Lighter-touch than CyberArk Conjur but sufficient for most mid-market machine-identity scope.",
      },
    ],
    watchOuts: [
      {
        title: "Less depth than CyberArk on the heaviest estates",
        desc: "For ministry-scale audit posture, the largest non-human identity estates and central-bank mandates that name CyberArk by reference, Delinea trails. Choose Delinea for mid-market velocity rather than ministry-scale audit depth.",
      },
      {
        title: "Sovereign / air-gap less established than CyberArk Self-Hosted",
        desc: "Delinea supports on-prem deployment, but CyberArk Self-Hosted has the deeper reference footprint for fully sovereign and air-gap-capable UAE FSI and defence customers.",
      },
    ],
    bestFitProfile: [
      "UAE mid-market and upper-mid-market enterprises under 1,000 privileged users",
      "Buyers prioritising operational simplicity and fast time-to-value over depth",
      "Cloud-first estates without sovereign on-prem PAM mandate",
      "Customers needing Leader-quadrant PAM without CyberArk-tier deployment effort",
      "Lean security teams running PAM without a dedicated PAM operations function",
      "Estates where Active Directory is the canonical identity source",
      "Buyers consolidating multiple legacy vault tools onto a modern cloud-first platform",
    ],
    products: [
      { model: "Delinea Secret Server", segment: "PASM vaulting", role: "Credential vaulting, rotation, session brokering, recommended starting point" },
      { model: "Delinea Privilege Manager", segment: "PEDM", role: "Local admin removal and policy-based elevation for Windows / macOS" },
      { model: "Delinea Server Suite (Centrify)", segment: "Linux PAM", role: "AD-integrated authentication and role-based access for Linux / Unix" },
      { model: "Delinea Connection Manager", segment: "Sessions", role: "RDP / SSH / database session brokering and recording" },
      { model: "Delinea DevOps Secrets Vault", segment: "Machine PAM", role: "CI/CD pipeline and machine-identity secret management" },
      { model: "Delinea Account Lifecycle Manager", segment: "Governance", role: "Service account governance and lifecycle automation" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Delinea across UAE mid-market and upper-mid-market customers needing Leader-quadrant PAM without CyberArk-tier operational depth. Our team has hands-on experience with Secret Server, Privilege Manager, Server Suite and Connection Manager deployments. Vendor-neutral sizing is our default starting point, we will tell you when CyberArk is the better fit for ministry / FSI scale or sovereign residency, and when BeyondTrust is stronger for workstation privilege as the dominant pain.",
    faqs: [
      {
        question: "How does Delinea compare to CyberArk?",
        answer:
          "CyberArk leads on breadth, sovereign on-prem, the largest non-human identity estates, ministry-scale audit posture. Delinea leads on time-to-value and operational simplicity. For mid-market estates under 1,000 privileged users without sovereign on-prem mandate, Delinea typically delivers Leader-quadrant PAM at materially lower licence cost and lower deployment effort.",
      },
      {
        question: "Cloud-first or on-prem Delinea?",
        answer:
          "Cloud-first SaaS is the recommended starting point for almost all mid-market UAE buyers. On-prem remains supported but the cloud-first architecture is where Delinea invests most heavily, and where time-to-value is fastest.",
      },
      {
        question: "Does Delinea cover machine identities and CI/CD secrets?",
        answer:
          "Yes via DevOps Secrets Vault. Sufficient for most mid-market machine-identity scope. For the largest CI/CD pipeline estates and agentic AI workloads, CyberArk Conjur remains the deeper specialist.",
      },
    ],
  },

  beyondtrust: {
    slug: "beyondtrust",
    name: "BeyondTrust",
    logo: "/logos/BeyondTrust.webp",
    tagline: "Deepest endpoint privilege management plus market-leading remote privileged access for vendors and contractors",
    bestFor: "Gartner MQ Leader · PEDM Strength",
    description:
      "BeyondTrust is the PAM Leader most strongly differentiated on Endpoint Privilege Management (PEDM) and Remote Privileged Access. Privilege Management for Windows / Mac removes local admin and enforces policy-based elevation at workstation scale. Privileged Remote Access brokers vendor and contractor sessions with biometric verification and full recording. For UAE estates where the dominant PAM driver is local-admin removal across thousands of endpoints, or secure third-party privileged remote access, BeyondTrust is the natural pick.",
    keyStats: [
      { label: "Gartner position", value: "Leader (Gartner Magic Quadrant)" },
      { label: "Strength", value: "PEDM (Privilege Management for Windows / Mac)" },
      { label: "Secondary strength", value: "Privileged Remote Access for third parties" },
      { label: "Deployment", value: "Cloud, on-prem and hybrid" },
    ],
    strengths: [
      {
        tag: "PEDM leader",
        icon: "shield",
        tone: "emerald",
        title: "Best-in-class workstation privilege control",
        desc: "Privilege Management for Windows and Mac is widely cited as the deepest PEDM in the market. Removes local admin at scale, elevates only signed and policy-approved applications, and integrates with Active Directory for policy authoring.",
      },
      {
        tag: "Remote Access",
        icon: "globe",
        tone: "violet",
        title: "Privileged Remote Access for vendors and contractors",
        desc: "Privileged Remote Access brokers vendor and third-party sessions with biometric verification, time-bound access, full recording and no VPN dependency. Strong fit for UAE estates with significant contractor / vendor privileged access scope.",
      },
      {
        tag: "Password Safe",
        icon: "lock",
        tone: "sky",
        title: "Credential vaulting and session brokering",
        desc: "Password Safe delivers vaulting, rotation, session brokering and command-level audit. Strong for buyers anchoring PAM around endpoint privilege rather than around the largest non-human identity estates.",
      },
      {
        tag: "Identity Security Insights",
        icon: "eye",
        tone: "amber",
        title: "Cross-identity risk visibility",
        desc: "Identity Security Insights correlates identity, entitlement and privileged-session telemetry across the estate to surface risk hotspots. Useful at the executive reporting layer for board and audit visibility.",
      },
      {
        tag: "Cloud Privilege Broker",
        icon: "activity",
        tone: "rose",
        title: "Multi-cloud entitlement broker",
        desc: "Cloud Privilege Broker delivers entitlement discovery and right-sizing for AWS, Azure and GCP. Lighter-touch than a dedicated CIEM but useful when cloud entitlement governance is in scope alongside core PAM.",
      },
      {
        tag: "Hybrid deployment",
        icon: "server",
        tone: "slate",
        title: "Cloud, on-prem and hybrid options",
        desc: "BeyondTrust supports SaaS, on-prem and hybrid deployment models. Useful for UAE buyers needing on-prem PAM for sovereign workloads alongside cloud-delivered privilege management for the wider estate.",
      },
    ],
    watchOuts: [
      {
        title: "Vault depth trails CyberArk for the largest estates",
        desc: "For the largest regulated vaults (100,000+ credentials, ministry-scale machine identities, central-bank mandates that name CyberArk), BeyondTrust trails the depth and reference footprint of CyberArk's PASM stack.",
      },
      {
        title: "Best deployed where PEDM is the headline pain",
        desc: "BeyondTrust's differentiation is strongest at the endpoint privilege layer. When PEDM is not the dominant requirement and vaulting is, CyberArk or Delinea typically lead the shortlist.",
      },
    ],
    bestFitProfile: [
      "UAE enterprises with thousands of endpoints where local-admin removal is the headline PAM driver",
      "Organisations with significant vendor / contractor / third-party privileged remote access scope",
      "Customers under audit pressure to remove local admin and enforce policy-based elevation",
      "Estates needing PEDM at scale without the operational depth of CyberArk EPM",
      "Buyers wanting a Leader-quadrant alternative to CyberArk anchored on endpoint privilege",
      "Cloud-first organisations needing hybrid PAM that spans cloud and on-prem workloads",
    ],
    products: [
      { model: "BeyondTrust Privilege Management for Windows / Mac", segment: "PEDM", role: "Local admin removal and policy-based elevation, recommended starting point" },
      { model: "BeyondTrust Password Safe", segment: "PASM", role: "Credential vaulting, rotation and session brokering" },
      { model: "BeyondTrust Privileged Remote Access", segment: "RPAM", role: "Vendor / third-party privileged remote access with full recording" },
      { model: "BeyondTrust Remote Support", segment: "Support", role: "Secure remote support sessions for IT helpdesk teams" },
      { model: "BeyondTrust Identity Security Insights", segment: "Visibility", role: "Cross-identity risk correlation and executive reporting" },
      { model: "BeyondTrust Cloud Privilege Broker", segment: "CIEM-lite", role: "Multi-cloud entitlement discovery and right-sizing" },
    ],
    whyArtiflex:
      "Artiflex IT delivers BeyondTrust for UAE estates where workstation privilege control and third-party privileged remote access are the dominant PAM drivers. Our team has hands-on experience deploying Privilege Management for Windows / Mac across thousands of endpoints, Privileged Remote Access for vendor and contractor scopes, and Password Safe for credential vaulting. We provide vendor-neutral sizing and will tell you when CyberArk or Delinea is the stronger fit.",
    faqs: [
      {
        question: "When does BeyondTrust win over CyberArk?",
        answer:
          "When the dominant PAM driver is local-admin removal across thousands of endpoints, or secure vendor / third-party privileged remote access. BeyondTrust's PEDM and Privileged Remote Access are both widely cited by Gartner as best-in-class. For broader vaulting and ministry-scale audit posture, CyberArk remains the safer pick.",
      },
      {
        question: "Can we use BeyondTrust just for PEDM?",
        answer:
          "Yes. Many UAE customers deploy Privilege Management for Windows / Mac standalone for local-admin removal, paired with a different vault (CyberArk or Delinea). BeyondTrust is unusually strong as a PEDM-only deployment.",
      },
      {
        question: "Does BeyondTrust replace VPN for vendor access?",
        answer:
          "Privileged Remote Access is specifically designed to replace VPN for vendor and contractor privileged sessions. Time-bound, biometric-verified, fully recorded access without client install. Strong fit for UAE estates with high contractor / vendor scope under NESA or NCA ECC audit.",
      },
    ],
  },

  "one-identity-safeguard": {
    slug: "one-identity-safeguard",
    name: "One Identity Safeguard",
    logo: "/logos/OneIdentity.png",
    tagline: "Mature AD-integrated PAM with strong vaulting and session monitoring, best leverage when the One Identity stack is already in place",
    bestFor: "Gartner MQ Leader · Mature AD-Native",
    description:
      "One Identity Safeguard is a Gartner MQ Leader PAM platform with particularly strong Active Directory integration and a mature on-prem / hybrid deployment story. Best leverage comes when an existing One Identity portfolio (Identity Manager IGA, Active Roles AD admin, OneLogin SSO) is already in production. For greenfield UAE deployments without prior One Identity commitment, CyberArk or Delinea typically lead the shortlist.",
    keyStats: [
      { label: "Gartner position", value: "Leader (Gartner Magic Quadrant)" },
      { label: "Heritage", value: "Long-standing AD-integrated PAM, formerly Quest / Dell" },
      { label: "Deployment", value: "On-prem appliance + hybrid options" },
      { label: "Best leverage", value: "Estates already on Identity Manager / Active Roles / OneLogin" },
    ],
    strengths: [
      {
        tag: "AD-native",
        icon: "users",
        tone: "emerald",
        title: "Deep Active Directory integration for vault and sessions",
        desc: "Safeguard is unusually well-integrated with Active Directory, policy authoring, approval workflow and session attestation all map natively onto AD groups and OUs. Strong fit when AD is the canonical identity source.",
      },
      {
        tag: "Hardened appliance",
        icon: "server",
        tone: "violet",
        title: "Appliance-delivered vault with built-in HSM",
        desc: "Safeguard for Privileged Passwords ships as a hardened appliance with integrated HSM, reducing infrastructure scoping. Useful for on-prem and sovereign deployments where minimising audit footprint is a priority.",
      },
      {
        tag: "Session monitoring",
        icon: "monitor",
        tone: "sky",
        title: "Indexed session recording with content search",
        desc: "Safeguard for Privileged Sessions records and indexes privileged sessions with full-text search across recorded content. Strong audit and forensics posture for regulated UAE estates.",
      },
      {
        tag: "Portfolio leverage",
        icon: "layers",
        tone: "amber",
        title: "Tight integration with Identity Manager and Active Roles",
        desc: "Customers already running Identity Manager (IGA), Active Roles (AD admin) or OneLogin (SSO) get tighter integration and commercial leverage by extending into Safeguard PAM. Bundled procurement and unified policy.",
      },
      {
        tag: "Behavioural analytics",
        icon: "activity",
        tone: "rose",
        title: "Privileged session analytics and risk scoring",
        desc: "Safeguard for Privileged Analytics scores user behaviour on privileged sessions to surface anomalies. Lighter-touch than CyberArk CORA AI but sufficient for many mid-size regulated estates.",
      },
    ],
    watchOuts: [
      {
        title: "Smaller ecosystem than CyberArk / Delinea",
        desc: "One Identity's PAM ecosystem and partner footprint is smaller than CyberArk's or Delinea's. Reference customers, third-party integrations and skilled-engineer availability all weigh against Safeguard outside of existing One Identity estates.",
      },
      {
        title: "Slower innovation cadence",
        desc: "Roadmap velocity has lagged CyberArk and Delinea on cloud-native features, machine identity and AI-driven analytics. Greenfield buyers prioritising innovation pace typically pick a different Leader.",
      },
      {
        title: "Greenfield cost-benefit weaker without One Identity portfolio",
        desc: "For pure greenfield UAE deployments without prior One Identity commitment, CyberArk leads on depth and Delinea leads on TTV. Safeguard's best leverage is portfolio bundling, not standalone greenfield.",
      },
    ],
    bestFitProfile: [
      "UAE estates already running One Identity Manager (IGA), Active Roles or OneLogin",
      "AD-centric organisations where Active Directory is the canonical identity source",
      "On-prem-heavy environments where appliance-delivered PAM is the architectural preference",
      "Sovereign or partially air-gapped estates requiring on-prem appliance deployment",
      "Customers consolidating identity, AD admin and PAM under one portfolio vendor",
      "Mid-size regulated estates wanting Leader-quadrant PAM with AD-native operations",
    ],
    products: [
      { model: "One Identity Safeguard for Privileged Passwords", segment: "PASM", role: "Credential vaulting and rotation, delivered as hardened appliance with HSM" },
      { model: "One Identity Safeguard for Privileged Sessions", segment: "Sessions", role: "Indexed session recording with full-text content search" },
      { model: "One Identity Safeguard for Privileged Analytics", segment: "UEBA", role: "Behavioural analytics and risk scoring across privileged sessions" },
      { model: "One Identity Safeguard Remote Access", segment: "RPAM", role: "Vendor and third-party privileged remote access" },
      { model: "One Identity Active Roles", segment: "AD admin", role: "Privileged AD delegation, change management and reporting, common pairing" },
    ],
    whyArtiflex:
      "Artiflex IT supports One Identity Safeguard deployments for UAE customers with existing One Identity portfolio relationships, particularly where Identity Manager IGA or Active Roles AD admin are already in production. Our team provides honest, vendor-neutral assessment: we will tell you when CyberArk or Delinea is the stronger strategic pick, and when consolidating around the existing One Identity stack delivers the better TCO outcome.",
    faqs: [
      {
        question: "Should we pick Safeguard for a new PAM deployment?",
        answer:
          "Only when you have material One Identity portfolio commitment already, Identity Manager IGA, Active Roles, OneLogin SSO. For pure greenfield deployments, CyberArk leads on depth and Delinea leads on time-to-value. Existing One Identity customers get good commercial and integration leverage by extending into Safeguard.",
      },
      {
        question: "Is Safeguard suitable for sovereign on-prem?",
        answer:
          "Yes. Safeguard's appliance-delivered architecture with integrated HSM is well-suited to on-prem and partially air-gapped UAE estates. For fully air-gapped defence-grade deployments, CyberArk Self-Hosted has the deeper reference footprint.",
      },
      {
        question: "How does Safeguard handle machine identities?",
        answer:
          "Safeguard supports machine identities and service account governance, particularly tightly integrated with Active Directory service accounts. For the largest CI/CD pipeline and AI-agent identity estates, CyberArk Conjur remains the deeper specialist.",
      },
    ],
  },

  "saviynt-pam": {
    slug: "saviynt-pam",
    name: "Saviynt PAM",
    logo: "/logos/Saviynt.png",
    tagline: "Cloud-native PAM converged with IGA, third-party access governance and CIEM on the Saviynt Identity Cloud",
    bestFor: "Gartner MQ Challenger · IGA + PAM Converged",
    description:
      "Saviynt PAM (Cloud PAM) is the converged privileged access module of the Saviynt Identity Cloud, sharing identity, lifecycle and governance with IGA, Application Access Governance, CIEM and Third-Party Access on the same platform and the same licence. Best fit when convergence of Identity Governance with basic PAM is more decisive than deepest Leader-tier PAM specifics. For UAE buyers already consolidating onto Saviynt for IGA, adding Cloud PAM gives one console, one licence and one data model across the full identity surface.",
    keyStats: [
      { label: "Gartner position", value: "Challenger (PAM Magic Quadrant)" },
      { label: "Convergence", value: "PAM + IGA + AAG + CIEM + Third-Party in one licence" },
      { label: "Deployment", value: "True SaaS, multi-tenant, quarterly auto-releases" },
      { label: "Sweet spot", value: "Estates already consolidating onto Saviynt Identity Cloud" },
    ],
    strengths: [
      {
        tag: "Converged platform",
        icon: "layers",
        tone: "emerald",
        title: "PAM in the same licence as IGA, AAG, CIEM, TPAG",
        desc: "Saviynt Cloud PAM lives on the same platform as Saviynt's IGA, Application Access Governance, CIEM and Third-Party Access. One licence covers the converged scope, eliminating the integration tax between point IGA + PAM stacks.",
      },
      {
        tag: "JIT cloud access",
        icon: "activity",
        tone: "violet",
        title: "Just-in-time privileged access for cloud and SaaS",
        desc: "Cloud PAM delivers just-in-time privileged elevation for AWS, Azure, GCP and SaaS applications under a single approval workflow. Strong fit for cloud-first estates without sovereign on-prem PAM mandate.",
      },
      {
        tag: "True SaaS",
        icon: "globe",
        tone: "sky",
        title: "Multi-tenant SaaS with quarterly auto-releases",
        desc: "Saviynt is SaaS-native rather than SaaS-washed. Quarterly releases land automatically with no upgrade projects. Useful for buyers prioritising SaaS-native cadence over deepest Leader-tier PAM specifics.",
      },
      {
        tag: "Third-party access",
        icon: "users",
        tone: "amber",
        title: "Third-Party Access Governance built in",
        desc: "TPAG governs contractor, vendor and partner identity lifecycle, including privileged third-party access, on the same platform. Reduces the need for a separate SecZetta or vendor-access tool alongside PAM.",
      },
      {
        tag: "Lower TCO",
        icon: "barChart",
        tone: "rose",
        title: "25-40% lower than equivalent point-tool stack",
        desc: "Bundled pricing typically lands 25-40% lower than equivalent SailPoint + CyberArk + SecZetta + a separate CIEM. Most compelling economic outcome when converged scope matches the buyer's audit obligations.",
      },
    ],
    watchOuts: [
      {
        title: "Challenger-tier, not Leader-tier for PAM specifically",
        desc: "Saviynt is a PAM Challenger in the Gartner MQ, not a Leader. For estates where the dominant requirement is deepest PAM functionality (sovereign vaulting, ministry-scale machine identities, central-bank-named PAM), CyberArk or Delinea typically win on PAM-specific evaluation.",
      },
      {
        title: "No on-prem or air-gapped option",
        desc: "Saviynt is true SaaS only. For sovereign on-prem PAM mandates and air-gap-capable defence-grade deployments, CyberArk Self-Hosted or One Identity Safeguard remain the appropriate architectural pattern.",
      },
      {
        title: "Best when convergence with IGA is the decisive criterion",
        desc: "Saviynt PAM's strongest case is convergence with Saviynt IGA. For PAM-only shortlists without IGA convergence in scope, the case weakens against the four PAM Leaders.",
      },
    ],
    bestFitProfile: [
      "UAE customers already consolidating onto Saviynt Identity Cloud for IGA",
      "Cloud-first estates without sovereign on-prem PAM mandate",
      "Buyers wanting one licence and one console across IGA + PAM + TPAG + CIEM",
      "Organisations consolidating multiple identity point tools onto a single platform",
      "Multi-cloud estates needing JIT privileged access across AWS + Azure + GCP",
      "Cost-sensitive buyers where 25-40% TCO advantage matches converged-scope requirements",
      "Estates with significant third-party / contractor privileged access scope",
    ],
    products: [
      { model: "Saviynt Cloud PAM", segment: "Core PAM", role: "Just-in-time privileged access for cloud, SaaS and on-prem applications" },
      { model: "Saviynt Third-Party Access Governance", segment: "TPAG", role: "Contractor, vendor and partner privileged access lifecycle" },
      { model: "Saviynt CIEM", segment: "Cloud entitlements", role: "Multi-cloud entitlement discovery and right-sizing across AWS / Azure / GCP" },
      { model: "Saviynt Identity Cloud (Bundle)", segment: "Strategic", role: "Converged IGA + AAG + CIEM + TPAG + Cloud PAM, recommended starting point" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Saviynt Cloud PAM as part of converged Saviynt Identity Cloud deployments for UAE customers already on or migrating to Saviynt for IGA. Our team has hands-on experience with Saviynt's full converged scope. We will tell you honestly when CyberArk or Delinea is the stronger PAM-specific pick, and when Saviynt's converged-platform economics genuinely outweigh Leader-tier PAM depth.",
    faqs: [
      {
        question: "Is Saviynt PAM a real PAM platform?",
        answer:
          "Saviynt Cloud PAM covers just-in-time privileged access for cloud, SaaS and on-prem applications. It is a credible PAM platform, Gartner places it in the Challengers quadrant, but it is not Leader-tier for sovereign vaulting, the largest non-human identity estates or central-bank-named PAM. Best evaluated when convergence with Saviynt IGA is decisive.",
      },
      {
        question: "Can we use Saviynt PAM instead of CyberArk?",
        answer:
          "For cloud-first mid-market and upper-mid-market estates already consolidating onto Saviynt for IGA, often yes. For UAE banks and ministries under SAMA / CBUAE / NESA mandates that name CyberArk by reference or require sovereign on-prem PAM, CyberArk remains the appropriate primary PAM. Many estates run both.",
      },
      {
        question: "What's the typical IGA + PAM convergence path?",
        answer:
          "Deploy Saviynt for IGA first (Identity Governance, AAG for SAP / Oracle SoD, certifications). Once Saviynt IGA is stable, extend into Cloud PAM and TPAG on the same platform. For estates with parallel CyberArk PAM, Saviynt IGA still governs CyberArk privileged user lifecycle, the two products complement.",
      },
    ],
  },

  "microsoft-entra-pim": {
    slug: "microsoft-entra-pim",
    name: "Microsoft Entra Privileged Identity Management (PIM)",
    logo: "/logos/microsoft.svg",
    tagline: "Just-in-time elevation for Azure and Entra roles, bundled in Microsoft 365 E5 and Entra ID P2",
    bestFor: "Bundled in M365 E5 / Entra ID P2 · Azure-Centric Estates",
    description:
      "Microsoft Entra Privileged Identity Management (PIM) is the just-in-time elevation control bundled with Microsoft 365 E5 and Entra ID P2. PIM covers Azure RBAC roles, Entra directory roles, Azure resource roles and Privileged Access Groups with approval workflow, access reviews and audit logging. For UAE customers already on E5 or Entra ID P2, PIM is a strong starting point for Azure / Entra privilege governance at zero or near-zero incremental licence cost. It is not a replacement for a full PAM platform, most regulated buyers pair Entra PIM with CyberArk Privilege Cloud or Self-Hosted.",
    keyStats: [
      { label: "Bundling", value: "Included in M365 E5 / Entra ID P2" },
      { label: "Scope", value: "Azure RBAC, Entra directory roles, Azure resources" },
      { label: "Best for", value: "Azure-centric estates already on E5 / Entra ID P2" },
      { label: "Typical pairing", value: "CyberArk for non-Azure privileged scope" },
    ],
    strengths: [
      {
        tag: "E5 economics",
        icon: "barChart",
        tone: "emerald",
        title: "Zero or near-zero incremental licence cost",
        desc: "If you are already on Microsoft 365 E5 or Entra ID P2, PIM is bundled. No additional vendor relationship to procure, no separate SKU, no parallel infrastructure to operate.",
      },
      {
        tag: "JIT roles",
        icon: "activity",
        tone: "violet",
        title: "Just-in-time elevation for Azure / Entra roles",
        desc: "PIM grants Azure RBAC and Entra directory role membership on a time-bound, approval-gated basis. Standing admin rights become eligible-but-not-active assignments, dramatically reducing standing privilege in the Microsoft estate.",
      },
      {
        tag: "Approval workflow",
        icon: "list",
        tone: "sky",
        title: "Built-in approval and justification flows",
        desc: "Role elevation requires justification, optional MFA challenge and optional approver workflow. All events flow into the Entra audit log and into Sentinel for SOC visibility.",
      },
      {
        tag: "Access reviews",
        icon: "eye",
        tone: "amber",
        title: "Recurring access reviews for privileged roles",
        desc: "Access Reviews drive recurring attestation of privileged role membership, useful for SOX, NESA and NCA ECC audit posture in Microsoft-centric estates.",
      },
      {
        tag: "Privileged Access Groups",
        icon: "users",
        tone: "rose",
        title: "Time-bound membership for sensitive Entra groups",
        desc: "PIM for Groups extends just-in-time elevation to membership of sensitive Entra groups, useful for Conditional Access exclusions, break-glass groups and high-privilege resource access patterns.",
      },
    ],
    watchOuts: [
      {
        title: "Not a full PAM platform",
        desc: "PIM covers Azure and Entra. It does not vault SSH, Linux, network device or database credentials and does not record privileged sessions outside Azure. Most regulated UAE buyers pair Entra PIM with CyberArk Privilege Cloud or Self-Hosted for the wider privileged surface.",
      },
      {
        title: "No session recording outside Azure",
        desc: "PIM logs elevation events but does not record session content. For audit obligations that require session recording across the full privileged surface (banks under SAMA, ministries under NESA), pair PIM with a Leader-tier PAM platform.",
      },
      {
        title: "Requires Entra ID P2 prerequisites",
        desc: "PIM features depend on Entra ID P2 licensing (which is bundled inside E5 and Entra Suite). E3 / Business Premium customers must upgrade or buy Entra ID P2 separately.",
      },
    ],
    bestFitProfile: [
      "UAE customers already on Microsoft 365 E5 or Entra ID P2 contracts",
      "Azure-centric estates where Microsoft is the dominant cloud and identity provider",
      "Organisations needing just-in-time elevation for Azure RBAC and Entra directory roles",
      "SME and mid-market customers without the full privileged surface that needs CyberArk-tier PAM",
      "Buyers pairing PIM with CyberArk or Delinea for non-Azure privileged scope",
      "Customers wanting a fast PAM quick-win without adding a new vendor to the contract estate",
      "Microsoft-centric government and educational institutions standardised on the M365 stack",
    ],
    products: [
      { model: "Microsoft Entra PIM (bundled in E5 / Entra ID P2)", segment: "Bundled JIT", role: "Just-in-time elevation, approval workflow, access reviews for Azure / Entra" },
      { model: "Microsoft Entra ID P2", segment: "Identity premium", role: "Conditional Access, PIM, risk-based authentication, PIM prerequisite" },
      { model: "Microsoft Entra Suite", segment: "Standalone", role: "Governance + PIM + Internet Access + Private Access bundle for non-E5 customers" },
      { model: "Microsoft Entra Permissions Management (CIEM)", segment: "Cloud entitlements", role: "Multi-cloud entitlement governance across Azure, AWS, GCP, typical PIM companion" },
      { model: "Microsoft Defender for Identity", segment: "ITDR", role: "Identity threat detection across Entra and on-prem AD, typical PIM companion" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Microsoft Entra PIM as part of Azure / Entra security baselines for UAE customers already invested in M365 E5 or Entra Suite. Our team has hands-on experience with PIM rollouts, Privileged Access Groups, Conditional Access alignment and Sentinel telemetry. We are equally honest about PIM's scope: for regulated estates needing full PAM, we recommend pairing with CyberArk Privilege Cloud or Self-Hosted.",
    faqs: [
      {
        question: "Is Entra PIM enough on its own?",
        answer:
          "For Microsoft-centric SME and mid-market estates without significant non-Azure privileged scope, often yes. For regulated UAE banks, ministries and enterprises with SSH, Linux, network device and database admin scope, PIM is one component of a wider PAM picture and is typically paired with CyberArk Privilege Cloud or Self-Hosted.",
      },
      {
        question: "Do we need Entra ID P2 for PIM?",
        answer:
          "Yes. PIM is gated by Entra ID P2 (bundled in M365 E5 and Entra Suite). E3 / Business Premium customers must upgrade or add Entra ID P2 separately to unlock PIM features.",
      },
      {
        question: "Does PIM cover Azure resource roles?",
        answer:
          "Yes. PIM for Azure Resources extends just-in-time elevation to Azure RBAC at the subscription, resource group and resource level, in addition to Entra directory roles. Useful for hardening Azure landing-zone privileged access.",
      },
      {
        question: "How does PIM integrate with CyberArk or Delinea?",
        answer:
          "PIM governs Azure / Entra role elevation; CyberArk or Delinea governs the wider privileged surface (SSH, Linux, network devices, databases, machine identities). The two products complement rather than overlap. Many UAE banks run PIM for the Microsoft estate and CyberArk for the rest of the privileged surface.",
      },
    ],
  },

  fortra: {
    slug: "fortra",
    name: "Fortra Privileged Access Manager",
    logo: "/logos/Fortra.png",
    tagline: "Best-value full-stack PAM with strong vaulting, session management and least privilege, the right pick for UAE mid-market and enterprise wanting Leader-grade PAM without CyberArk-tier cost",
    bestFor: "Recommended · Best Value PAM",
    description:
      "Fortra Privileged Access Manager is Artiflex's recommended best-value PAM pick. It delivers the full privileged-access stack, credential vaulting, automatic rotation and secure reset, session management and recording, just-in-time elevation and granular least-privilege control, at the strongest total cost of ownership in the market. Fortra is particularly strong for Unix and Linux server estates and hybrid environments, with the audit and compliance depth UAE regulators expect. For mid-market and enterprise buyers who want Leader-grade privileged access management without the licence cost and deployment complexity of CyberArk, Fortra is the pragmatic starting point for most UAE estates.",
    keyStats: [
      { label: "Artiflex position", value: "Recommended, best value full-stack PAM" },
      { label: "Strength", value: "Granular least privilege and Unix / Linux server PAM" },
      { label: "Deployment", value: "Hybrid, on-prem and cloud PAM" },
      { label: "5-year TCO", value: "Best value for full-stack PAM at 5,000 users" },
    ],
    whyWinsIntro: {
      label: "Fortra Privileged Access Manager Highlights",
      title: "The best-value full-stack PAM for most UAE estates",
      description:
        "Fortra is most compelling when you want full privileged-access coverage, vaulting, rotation, session management and least privilege, at the strongest value for money, without CyberArk-tier licence cost or deployment depth. It is especially strong for Unix and Linux server privileged access and hybrid estates. For the very deepest, largest-scale or central-bank-mandated estates, CyberArk may still be the safer architectural pick; for vendor / contractor remote access as the dominant driver, BeyondTrust often wins.",
      stats: [
        { value: "Recommended", label: "best-value PAM for most UAE estates", tone: "emerald" },
        { value: "Full stack", label: "vaulting, rotation, session management and least privilege in one platform", tone: "violet" },
        { value: "Unix / Linux", label: "particularly strong server privileged access and hybrid estate coverage", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Best value",
        icon: "barChart",
        tone: "emerald",
        title: "Full privileged-access coverage at the strongest TCO",
        desc: "Fortra delivers vaulting, automatic rotation, session management and least privilege as a single full-stack platform at the best value for money in the PAM market. For mid-market and enterprise UAE buyers, it removes the trade-off between Leader-grade capability and licence cost.",
      },
      {
        tag: "Vaulting",
        icon: "lock",
        tone: "violet",
        title: "Strong credential vaulting with rotation and secure reset",
        desc: "The credential vault stores privileged passwords under access control, rotates them automatically on a schedule or after checkout, and supports secure reset across dependent systems. Solid coverage across Windows, Linux, network devices and databases.",
      },
      {
        tag: "Least privilege",
        icon: "shield",
        tone: "sky",
        title: "Granular, fine-grained privileged elevation",
        desc: "Fortra enforces granular least-privilege elevation and access control, granting only the specific privilege a task requires rather than blanket administrator rights. Strong fit for estates removing standing privilege and tightening audit posture.",
      },
      {
        tag: "Unix / Linux",
        icon: "server",
        tone: "amber",
        title: "Deep Unix and Linux server privileged access",
        desc: "Fortra is particularly strong for Unix and Linux server estates, with role-based privilege management and audit that centralises server admin without parallel local identity stores. A natural pick where the server estate is the dominant privileged surface.",
      },
      {
        tag: "Sessions",
        icon: "eye",
        tone: "rose",
        title: "Session management and recording for audit",
        desc: "Privileged sessions are brokered and recorded with command-level audit, providing the forensic record UAE regulators expect for privileged access evidence. Supports review and policy-based control of admin activity.",
      },
      {
        tag: "Compliance",
        icon: "file",
        tone: "slate",
        title: "Audit and compliance reporting aligned to UAE frameworks",
        desc: "Reporting and audit trails align to UAE compliance expectations under NESA UAE IA and NCA ECC, with the evidence depth regulated buyers require. Strong audit and compliance fit for banks, government and enterprise estates.",
      },
    ],
    watchOuts: [
      {
        title: "Smaller global brand than CyberArk or BeyondTrust",
        desc: "Fortra carries a smaller global PAM brand presence than CyberArk or BeyondTrust. The capability is full-stack and Leader-grade, but procurement teams who shortlist purely on brand recognition should weigh capability and value rather than name alone.",
      },
      {
        title: "Very deep or largest-scale estates may still favour CyberArk",
        desc: "For the very deepest, largest-scale privileged estates, ministry-scale machine identities, or central-bank mandates that name CyberArk by reference, CyberArk may still be the safer architectural pick. Fortra is best deployed with an experienced PAM delivery partner.",
      },
    ],
    bestFitProfile: [
      "UAE mid-market and enterprise buyers wanting Leader-grade PAM without CyberArk-tier cost",
      "Estates where total cost of ownership and value for money are decisive criteria",
      "Organisations with significant Unix and Linux server privileged access scope",
      "Hybrid estates spanning on-prem and cloud privileged workloads",
      "Buyers removing standing privilege and tightening least-privilege control",
      "Customers needing UAE-aligned audit and compliance reporting under NESA / NCA ECC",
      "Organisations starting their PAM journey who want full-stack coverage from day one",
    ],
    products: [
      { model: "Fortra Privileged Access Manager", segment: "Full-stack PAM", role: "Vaulting, rotation, session management and least privilege, recommended starting point" },
      { model: "Fortra Credential Vault", segment: "PASM", role: "Credential vaulting, automatic rotation and secure reset" },
      { model: "Fortra Session Management", segment: "Sessions", role: "Privileged session brokering and recording with command-level audit" },
      { model: "Fortra Least Privilege", segment: "PEDM", role: "Granular, fine-grained privileged elevation and access control" },
      { model: "Fortra Server Privilege Management", segment: "Unix / Linux PAM", role: "Role-based privilege management and audit for Unix and Linux server estates" },
    ],
    whyArtiflex:
      "Artiflex IT recommends Fortra Privileged Access Manager as our default best-value PAM pick for UAE mid-market and enterprise customers. Our team delivers Fortra end-to-end, vaulting, rotation and secure reset, granular least-privilege elevation, session management and recording, with particular strength in Unix and Linux server privileged access. Vendor-neutral sizing is our default starting point: we will tell you honestly when CyberArk is the safer pick for the very deepest or central-bank-mandated estates, and when BeyondTrust is stronger for vendor / contractor remote access.",
    faqs: [
      {
        question: "Why does Artiflex recommend Fortra as the best-value PAM?",
        answer:
          "Fortra delivers full privileged-access coverage, vaulting, rotation, session management and granular least privilege, at the strongest total cost of ownership in the market. For most UAE mid-market and enterprise estates, it provides Leader-grade capability without CyberArk-tier licence cost or deployment complexity, which makes it the pragmatic starting point for the majority of PAM programmes.",
      },
      {
        question: "How does Fortra compare to CyberArk?",
        answer:
          "Fortra leads on value for money and full-stack coverage at a far more accessible cost, with particular strength in Unix and Linux server PAM. CyberArk leads on absolute breadth, the largest non-human identity estates and central-bank mandates that name it by reference. For most UAE estates Fortra is the right starting point; for the very deepest or sovereign-mandated estates, CyberArk may still be the safer architectural pick.",
      },
      {
        question: "Is Fortra strong for Unix and Linux server estates?",
        answer:
          "Yes. Fortra is particularly strong for Unix and Linux server privileged access, with role-based privilege management and audit that centralise server admin. For estates where the server surface is the dominant privileged scope, this is one of Fortra's clearest advantages.",
      },
      {
        question: "Does Fortra support hybrid and on-prem deployment?",
        answer:
          "Yes. Fortra supports hybrid, on-prem and cloud PAM deployment, which suits UAE estates with a mix of on-prem server workloads and cloud privileged access. Artiflex sizes the deployment model around your sovereignty posture, privileged-user count and operational maturity.",
      },
      {
        question: "How long does a Fortra deployment take?",
        answer:
          "A focused first phase, top privileged accounts vaulted, rotation enabled, session management on critical systems and a first audit-ready report, typically lands within a single quarter for most mid-market estates. Least-privilege rollout across the server and endpoint estate is usually phased in over the following quarters with an experienced delivery partner.",
      },
    ],
    whatIs: {
      eyebrow: "What is Fortra Privileged Access Manager",
      titlePrefix: "Best-value full-stack PAM for the ",
      titleHighlight: "whole privileged surface",
      bodyParagraphs: [
        "Fortra Privileged Access Manager brings credential vaulting, automatic rotation, session management and granular least privilege together in a single full-stack platform built for value for money.",
        "Where premium PAM platforms solve the same problem at premium cost, Fortra delivers Leader-grade privileged-access control, vault, rotate, broker, record and elevate only what a task needs, at the strongest total cost of ownership, with particular strength in Unix and Linux server estates and hybrid environments.",
      ],
      feature: {
        titleLine1: "Least privilege",
        titleLine2: "granular privileged elevation",
        body: "Fortra grants only the specific privilege a task requires rather than blanket administrator rights, eliminating standing privilege across the server and endpoint estate. Combined with session recording and command-level audit, this gives UAE regulated buyers the evidence trail they need while keeping the privileged blast radius small.",
      },
      capabilities: [
        "Credential vaulting with automatic rotation and secure reset",
        "Granular, fine-grained least-privilege elevation",
        "Privileged session management and recording",
        "Unix and Linux server privileged access management",
      ],
    },
  },

  "hashicorp-vault": {
    slug: "hashicorp-vault",
    name: "HashiCorp Vault",
    logo: "/logos/HashiCorp.png",
    tagline: "The de-facto standard for secrets management, dynamic secrets and encryption-as-a-service for machine, DevOps and cloud-native identity, API-first by design",
    bestFor: "Visionary · Secrets & DevOps",
    description:
      "HashiCorp Vault is the de-facto standard for secrets management in cloud-native and DevOps estates. It delivers centralised secrets storage, dynamic short-lived secrets generated on demand, encryption-as-a-service and machine / workload identity, all behind an API-first interface built for automation. Vault solves the application credential problem, hardcoded API keys, database passwords and service credentials embedded in code or pipelines, by providing programmatic credential retrieval at runtime. It is not a traditional human-PAM platform: it has no out-of-the-box session recording or admin vaulting UX, so most UAE estates pair Vault with a human-PAM platform such as Fortra or CyberArk for privileged human access.",
    keyStats: [
      { label: "Gartner position", value: "Visionary, DevOps-native secrets" },
      { label: "Strength", value: "Secrets management, dynamic secrets, encryption-as-a-service" },
      { label: "Interface", value: "API-first, developer-friendly CLI and SDKs" },
      { label: "Typical pairing", value: "A human-PAM platform alongside for admin access" },
    ],
    whyWinsIntro: {
      label: "HashiCorp Vault Highlights",
      title: "The secrets-management standard for cloud-native and DevOps estates",
      description:
        "Vault is most compelling when application secrets, machine identity and CI/CD pipeline credentials are the primary problem, not human admin access. Its dynamic secrets, encryption-as-a-service and API-first model make it the developer-native standard. It is best deployed alongside a traditional human-PAM platform (Fortra or CyberArk) that covers session recording, credential checkout and privileged human access.",
      stats: [
        { value: "Standard", label: "de-facto standard for DevOps and cloud-native secrets management", tone: "emerald" },
        { value: "Dynamic", label: "short-lived secrets generated on demand instead of long-lived credentials", tone: "violet" },
        { value: "API-first", label: "built for automation, machine identity and cloud-native workloads", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Secrets standard",
        icon: "lock",
        tone: "emerald",
        title: "Best-in-class application secrets management",
        desc: "Vault is the de-facto standard for storing and brokering application secrets, API keys, database passwords, service credentials, centrally rather than embedded in code or configuration. Eliminates the hardcoded-secret risk across applications and pipelines.",
      },
      {
        tag: "Dynamic secrets",
        icon: "activity",
        tone: "violet",
        title: "Dynamic, short-lived secrets generated on demand",
        desc: "Rather than long-lived static credentials, Vault generates short-lived secrets on demand and revokes them automatically when the lease expires. This dramatically shrinks the window in which a leaked credential is usable, a core advantage for cloud-native estates.",
      },
      {
        tag: "API-first",
        icon: "globe",
        tone: "sky",
        title: "Developer-friendly API, CLI and SDKs",
        desc: "Vault is API-first by design with a developer-friendly CLI and broad SDK coverage. It slots naturally into CI/CD pipelines, container platforms and infrastructure-as-code workflows, which is why engineering teams adopt it as the default secrets layer.",
      },
      {
        tag: "Machine identity",
        icon: "server",
        tone: "amber",
        title: "Machine, workload and cloud-native identity",
        desc: "Vault authenticates machines, workloads and cloud-native services and issues them scoped, time-bound credentials. Critical as agentic AI and microservice workloads multiply the number of non-human identities inside the estate.",
      },
      {
        tag: "Encryption",
        icon: "shield",
        tone: "rose",
        title: "Encryption-as-a-service for applications",
        desc: "Vault provides encryption-as-a-service so applications can encrypt and decrypt data without managing their own keys. Centralised key management and cryptographic operations reduce the risk of homegrown, inconsistent application encryption.",
      },
      {
        tag: "Open-source core",
        icon: "layers",
        tone: "slate",
        title: "Open-source core with enterprise features",
        desc: "Vault offers an open-source core with paid enterprise features (replication, governance, HSM support). This gives a low-friction entry point for engineering teams and a clear upgrade path as governance and scale requirements grow.",
      },
    ],
    watchOuts: [
      {
        title: "Not a traditional human-PAM platform",
        desc: "Vault has no out-of-the-box session recording or admin credential-checkout UX for human privileged users. It solves machine and application secrets, not human privileged session control. Most UAE estates pair Vault with a human-PAM platform such as Fortra or CyberArk.",
      },
      {
        title: "Requires engineering maturity to operate well",
        desc: "Vault is powerful but expects engineering maturity, policy authoring, auth-method design, lease and revocation strategy, and operational ownership. Estates without a capable platform or DevOps function should plan for delivery support rather than treating it as a turnkey appliance.",
      },
    ],
    bestFitProfile: [
      "Cloud-native and DevOps estates where application secrets are the primary problem",
      "Teams needing dynamic, short-lived secrets across CI/CD pipelines and containers",
      "Organisations with significant machine, workload and microservice identity scope",
      "Engineering functions wanting an API-first secrets layer in their pipelines",
      "Estates needing encryption-as-a-service and centralised key management for applications",
      "Buyers pairing secrets management with a human-PAM platform for admin access",
      "Organisations with the engineering maturity to own policy, auth methods and operations",
    ],
    products: [
      { model: "HashiCorp Vault (open-source core)", segment: "Secrets", role: "Secrets management, dynamic secrets and encryption-as-a-service, entry point" },
      { model: "HashiCorp Vault Enterprise", segment: "Enterprise secrets", role: "Replication, governance, namespaces and HSM support for scaled estates" },
      { model: "Vault Dynamic Secrets", segment: "Dynamic credentials", role: "On-demand, short-lived credentials with automatic lease revocation" },
      { model: "Vault Encryption-as-a-Service (Transit)", segment: "Cryptography", role: "Application encryption and centralised key management without managing keys" },
      { model: "Vault Machine Identity", segment: "Workload identity", role: "Authentication and scoped credentials for machines, workloads and services" },
    ],
    whyArtiflex:
      "Artiflex IT delivers HashiCorp Vault for UAE cloud-native and DevOps estates where application secrets, machine identity and pipeline credentials are the primary problem. Our team designs Vault auth methods, dynamic secret engines, lease and revocation strategy and encryption-as-a-service patterns. We are honest about scope: Vault is the secrets standard, not a human-PAM, so we pair it with Fortra or CyberArk for privileged human access, session recording and credential checkout.",
    faqs: [
      {
        question: "Is HashiCorp Vault a full PAM platform?",
        answer:
          "No. Vault is the de-facto standard for secrets management, dynamic secrets and encryption-as-a-service for machines and applications. It is not a traditional human-PAM platform, it has no out-of-the-box session recording or admin credential-checkout UX. Most UAE estates run Vault for machine and DevOps secrets and pair it with Fortra or CyberArk for human privileged access.",
      },
      {
        question: "What problem does Vault solve best?",
        answer:
          "The application credential problem: hardcoded API keys, database passwords and service credentials embedded in code, configuration and CI/CD pipelines. Vault centralises these, issues short-lived dynamic secrets on demand and revokes them automatically, removing the hardcoded-secret risk across cloud-native estates.",
      },
      {
        question: "Why do we still need a human-PAM alongside Vault?",
        answer:
          "Because Vault is built for machine and application identity, not human admin sessions. Privileged human access, credential checkout, session brokering and recording, just-in-time elevation, is the domain of a human-PAM platform such as Fortra or CyberArk. The two complement: Vault for machine secrets, human-PAM for privileged people.",
      },
      {
        question: "Does Vault need a lot of engineering maturity?",
        answer:
          "Yes. Vault rewards engineering maturity: auth-method design, policy authoring, secret-engine configuration and lease / revocation strategy all need ownership. Estates without a strong platform or DevOps function should plan for delivery support rather than treating Vault as a turnkey appliance.",
      },
      {
        question: "Can we start with the open-source core?",
        answer:
          "Yes. Many teams start on the open-source Vault core to prove out secrets management and dynamic secrets, then move to Vault Enterprise as replication, governance, namespaces or HSM requirements appear. Artiflex helps size the right entry point and plan the upgrade path.",
      },
    ],
    whatIs: {
      eyebrow: "What is HashiCorp Vault",
      titlePrefix: "The secrets standard for ",
      titleHighlight: "machine and cloud-native identity",
      bodyParagraphs: [
        "HashiCorp Vault is the de-facto standard for secrets management in cloud-native and DevOps estates, centralising application secrets, generating dynamic short-lived credentials, and providing encryption-as-a-service behind an API-first interface.",
        "Where traditional PAM secures human admin accounts, Vault secures the machine side of the estate: application credentials, service identities, pipeline secrets and workload authentication. It is most effective paired with a human-PAM platform so machine identity and human privileged access are both covered.",
      ],
      feature: {
        titleLine1: "Dynamic secrets",
        titleLine2: "short-lived credentials on demand",
        body: "Instead of long-lived static credentials, Vault generates secrets on demand and revokes them automatically when the lease expires. A leaked credential is useful only briefly, which sharply reduces blast radius across CI/CD pipelines, containers and cloud workloads. This is the capability that made Vault the cloud-native secrets standard.",
      },
      capabilities: [
        "Centralised application secrets management",
        "Dynamic, short-lived secrets with automatic revocation",
        "Encryption-as-a-service and centralised key management",
        "Machine, workload and cloud-native identity authentication",
      ],
    },
  },

  senhasegura: {
    slug: "senhasegura",
    name: "Senhasegura",
    tagline: "Full PAM suite with vaulting, session management, DevOps secrets and certificate management at competitive pricing, with a strong fast-deployment story",
    bestFor: "Challenger · Full-Suite Value PAM",
    description:
      "Senhasegura is a full-suite PAM platform that brings credential vaulting, privileged session management, DevOps secrets and certificate management together at competitive pricing. Its headline advantages are breadth of capability in a single suite and a strong fast-deployment story, which appeal to mid-market buyers who want comprehensive PAM coverage without premium licence cost. Senhasegura's presence is growing, including in EMEA, though its regional partner ecosystem is smaller than CyberArk, BeyondTrust or Delinea. For UAE buyers wanting solid full-suite PAM at an accessible price with quick time to value, Senhasegura is a credible challenger.",
    keyStats: [
      { label: "Gartner position", value: "Challenger, full-suite value PAM" },
      { label: "Suite breadth", value: "Vaulting, sessions, DevOps secrets, certificate management" },
      { label: "Deployment", value: "Strong fast-deployment story, competitive pricing" },
      { label: "Presence", value: "Growing globally, including EMEA" },
    ],
    whyWinsIntro: {
      label: "Senhasegura Highlights",
      title: "Full-suite PAM value with a fast-deployment story",
      description:
        "Senhasegura is most compelling when you want comprehensive PAM coverage, vaulting, session management, DevOps secrets and certificate management, in a single suite at competitive pricing, with quick time to value. It is a strong mid-market challenger. Where the deciding factors are the largest-scale deployments, central-bank mandates or the deepest regional partner ecosystem, the established leaders may still lead the shortlist.",
      stats: [
        { value: "Full suite", label: "vaulting, sessions, DevOps secrets and certificate management in one platform", tone: "emerald" },
        { value: "Fast deploy", label: "strong fast-deployment story for quick time to value", tone: "violet" },
        { value: "Competitive", label: "accessible pricing for comprehensive mid-market PAM coverage", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Full suite",
        icon: "layers",
        tone: "emerald",
        title: "Comprehensive PAM coverage in one platform",
        desc: "Senhasegura packages vaulting, privileged session management, DevOps secrets and certificate management into a single suite. Buyers get broad PAM coverage from one vendor without assembling multiple point tools, which simplifies procurement and operations.",
      },
      {
        tag: "Vaulting",
        icon: "lock",
        tone: "violet",
        title: "Solid credential vaulting and rotation",
        desc: "The platform delivers credential vaulting with automatic rotation and access control across Windows, Linux, network devices and databases. A dependable core for estates standardising privileged credential storage and rotation.",
      },
      {
        tag: "Sessions",
        icon: "monitor",
        tone: "sky",
        title: "Privileged session management and recording",
        desc: "Senhasegura brokers and records privileged sessions with command-level audit, giving the forensic trail UAE regulators expect for privileged access evidence. Solid session control across the privileged surface.",
      },
      {
        tag: "Certificate mgmt",
        icon: "file",
        tone: "amber",
        title: "Certificate lifecycle management built in",
        desc: "Certificate management is part of the suite, covering discovery, issuance and renewal so estates avoid outages from expired certificates. A useful addition that buyers would otherwise license separately.",
      },
      {
        tag: "Fast deploy",
        icon: "activity",
        tone: "rose",
        title: "Strong fast-deployment story",
        desc: "Senhasegura is positioned around quick time to value, with deployment patterns that get vaulting and session management into production rapidly. Attractive for mid-market estates without a dedicated PAM engineering function.",
      },
      {
        tag: "Value",
        icon: "barChart",
        tone: "slate",
        title: "Competitive pricing for comprehensive coverage",
        desc: "Pricing is competitive relative to the established leaders, delivering full-suite PAM at a more accessible price point. The strongest case is comprehensive coverage and value for cost-conscious mid-market buyers.",
      },
    ],
    watchOuts: [
      {
        title: "Smaller regional presence and partner ecosystem",
        desc: "Senhasegura's regional presence and partner ecosystem in the UAE are smaller than CyberArk, BeyondTrust or Delinea. Reference customers, local integration depth and skilled-engineer availability weigh into the decision for buyers who prioritise an established ecosystem.",
      },
      {
        title: "Best matched to mid-market rather than the largest estates",
        desc: "For the largest-scale deployments, ministry-scale machine identities or central-bank mandates that name a specific vendor, the established leaders may still lead the shortlist. Senhasegura's strongest case is full-suite value for mid-market estates.",
      },
    ],
    bestFitProfile: [
      "UAE mid-market buyers wanting comprehensive full-suite PAM at competitive pricing",
      "Estates that value breadth of capability from a single vendor over premium brand",
      "Organisations prioritising quick time to value and fast deployment",
      "Buyers needing vaulting, session management and certificate management together",
      "Teams with DevOps secrets requirements alongside human privileged access",
      "Cost-conscious organisations seeking solid PAM without premium licence cost",
      "Buyers comfortable with a growing challenger rather than the largest partner ecosystem",
    ],
    products: [
      { model: "Senhasegura PAM Core", segment: "Full-suite PAM", role: "Credential vaulting, rotation and access control, recommended starting point" },
      { model: "Senhasegura Session Management", segment: "Sessions", role: "Privileged session brokering and recording with command-level audit" },
      { model: "Senhasegura DevOps Secrets", segment: "Machine PAM", role: "Secrets management for CI/CD pipelines and machine identities" },
      { model: "Senhasegura Certificate Manager", segment: "Certificates", role: "Certificate discovery, issuance and renewal to prevent expiry outages" },
      { model: "Senhasegura Cloud PAM", segment: "Cloud", role: "Privileged access management for cloud and hybrid workloads" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Senhasegura for UAE mid-market customers who want comprehensive full-suite PAM, vaulting, session management, DevOps secrets and certificate management, at competitive pricing with quick time to value. Our team handles deployment and integration end-to-end. Vendor-neutral sizing is our default starting point: we will tell you honestly when Fortra is the stronger best-value pick, and when an established leader with a deeper regional ecosystem better matches the largest or most sensitive estates.",
    faqs: [
      {
        question: "What does Senhasegura cover as a PAM suite?",
        answer:
          "Senhasegura is a full PAM suite covering credential vaulting and rotation, privileged session management and recording, DevOps secrets and certificate management, all from one vendor. The appeal is broad coverage in a single platform rather than assembling multiple point tools.",
      },
      {
        question: "How does Senhasegura compare on price and deployment?",
        answer:
          "Senhasegura is positioned on competitive pricing and a strong fast-deployment story, which makes it attractive for mid-market estates that want comprehensive PAM without premium licence cost and want quick time to value. Artiflex sizes it against Fortra and the established leaders so you see the real cost-versus-capability trade-off.",
      },
      {
        question: "Is Senhasegura suitable for large UAE enterprises?",
        answer:
          "It is most strongly matched to mid-market estates. For the largest-scale deployments, ministry-scale machine identities or central-bank mandates that name a specific vendor, the established leaders, or Fortra as best value, may lead the shortlist. Senhasegura's clearest case is full-suite value for mid-market buyers.",
      },
      {
        question: "Does Senhasegura handle DevOps secrets and certificates?",
        answer:
          "Yes. DevOps secrets management for CI/CD pipelines and machine identities, and certificate lifecycle management (discovery, issuance, renewal), are both part of the suite. Bundling these reduces the need to license separate tools alongside core PAM.",
      },
      {
        question: "What about partner ecosystem and support in the UAE?",
        answer:
          "Senhasegura's regional partner ecosystem is smaller than CyberArk, BeyondTrust or Delinea, though its presence is growing including in EMEA. Artiflex provides local delivery and support, and will be honest when an established leader's deeper ecosystem is the better fit for your estate.",
      },
    ],
    whatIs: {
      eyebrow: "What is Senhasegura",
      titlePrefix: "Full-suite PAM value with ",
      titleHighlight: "fast time to value",
      bodyParagraphs: [
        "Senhasegura is a full-suite privileged access management platform combining credential vaulting, privileged session management, DevOps secrets and certificate management at competitive pricing.",
        "Its case is comprehensive coverage from a single vendor with quick time to value, which suits mid-market UAE estates that want broad PAM capability without premium licence cost. Its presence is growing globally, though its regional partner ecosystem is smaller than the established leaders.",
      ],
      feature: {
        titleLine1: "One suite",
        titleLine2: "vaulting to certificates",
        body: "Senhasegura packages vaulting, session management, DevOps secrets and certificate management into a single platform, so mid-market buyers get broad privileged-access coverage from one vendor instead of stitching together point tools. Combined with a fast-deployment story, this lets estates reach production privileged-access control quickly and at competitive cost.",
      },
      capabilities: [
        "Credential vaulting with automatic rotation",
        "Privileged session management and recording",
        "DevOps secrets for CI/CD pipelines and machine identities",
        "Certificate lifecycle management to prevent expiry outages",
      ],
    },
  },
};
