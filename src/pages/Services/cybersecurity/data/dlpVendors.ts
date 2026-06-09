export type DlpVendor = {
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

export const dlpVendors: Record<string, DlpVendor> = {
  "fortra-dlp": {
    slug: "fortra-dlp",
    name: "Fortra Data Security",
    logo: "/logos/Fortra.png",
    tagline: "Boldon James data classification, Digital Guardian endpoint DLP and Clearswift adaptive redaction in one enterprise data security suite",
    bestFor: "Classification-Led Enterprise & Sovereign DLP",
    description:
      "Fortra Data Security has moved decisively into the large-enterprise segment. With the acquisition of Boldon James, Fortra now pairs market-leading data classification and protective marking with Digital Guardian endpoint DLP and Clearswift adaptive redaction, a true classify, protect and control suite under one vendor. Boldon James labels every email, document and file at the point of creation, and those persistent labels drive Digital Guardian enforcement and Clearswift redaction downstream, sharply improving accuracy at enterprise scale. For UAE ministries, banks and large regulated enterprises needing classification-led, sovereign-capable DLP, Fortra is now a front-rank choice rather than a niche specialist.",
    keyStats: [],
    whyWinsIntro: {
      label: "Fortra Data Security Highlights",
      title: "Classification-led data security, now at large-enterprise scale",
      description:
        "The Boldon James acquisition is the inflection point. Fortra now unifies user-driven and automated data classification with Digital Guardian endpoint DLP and Clearswift adaptive redaction in a single portfolio. Classification labels created at the source travel with the data and drive enforcement everywhere, exactly the operating model large enterprises and governments require. For UAE government bodies, banks and regulated enterprises, this delivers sovereign-capable, classification-led data protection that few competitors match end-to-end.",
      stats: [
        { value: "Classification-led", label: "Boldon James labels drive Digital Guardian and Clearswift enforcement end-to-end", tone: "emerald" },
        { value: "Enterprise-scale", label: "the Boldon James acquisition moves Fortra into the large-enterprise DLP segment", tone: "violet" },
        { value: "Sovereign", label: "on-prem and air-gap deployment for ministries and regulated entities", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Boldon James Data Classification",
        icon: "layers",
        tone: "emerald",
        title: "Classify and protectively mark data at the point of creation",
        desc: "The Boldon James acquisition adds market-leading user-driven and automated classification. Every email, document and file is labelled at creation, and those persistent labels travel with the data, the foundation large enterprises and governments build data protection on.",
      },
      {
        tag: "Classification-Driven DLP",
        icon: "lock",
        tone: "violet",
        title: "Labels drive Digital Guardian and Clearswift enforcement",
        desc: "Boldon James classification labels feed Digital Guardian endpoint DLP and Clearswift adaptive redaction directly, so policy keys off trusted metadata rather than content scanning alone. The result is far fewer false positives and consistent enforcement across a large estate.",
      },
      {
        tag: "Digital Guardian Endpoint DLP",
        icon: "shield",
        tone: "sky",
        title: "Kernel-level visibility on Windows, macOS, Linux",
        desc: "Digital Guardian operates at the OS kernel level, providing deep visibility into every file, clipboard, screen capture, and application-level data action. Forensics-grade incident detail supports both compliance and insider-threat investigations.",
      },
      {
        tag: "Clearswift Adaptive Redaction",
        icon: "sliders",
        tone: "violet",
        title: "Remove sensitive content, deliver the message",
        desc: "Rather than blocking outbound email containing sensitive content, Clearswift can remove or redact the specific sensitive portions (credit cards, PII, classified markings) and deliver the rest, dramatically reducing legitimate-business friction.",
      },
      {
        tag: "Deep Content Inspection",
        icon: "eye",
        tone: "sky",
        title: "OCR, dictionaries, structural patterns",
        desc: "Clearswift content inspection includes OCR (extract text from images), large lexicon dictionaries, regex patterns, structural patterns (passport, ID number formats), and contextual analysis. Strong for UAE regulated industries.",
      },
      {
        tag: "Sovereign deployment",
        icon: "server",
        tone: "amber",
        title: "On-prem and air-gap support",
        desc: "Clearswift Secure ICAP Gateway and Digital Guardian on-prem deploy fully within sovereign environments without external cloud dependency. Useful for UAE ministries and government bodies with strict residency mandates.",
      },
      {
        tag: "Behavioural analytics",
        icon: "activity",
        tone: "rose",
        title: "User and entity behaviour analytics for insider risk",
        desc: "Digital Guardian Analytics & Reporting Cloud (ARC) applies UEBA to DLP telemetry, surfacing insider-threat patterns and anomalous data movement that signature-only DLP misses.",
      },
      {
        tag: "Forensic incident workflow",
        icon: "list",
        tone: "slate",
        title: "Court-admissible incident detail",
        desc: "Digital Guardian's forensics-grade event detail supports court-admissible investigations, useful for UAE banking and government insider-threat cases requiring rigorous evidence trails.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "Large enterprises and governments standardising on a classify, protect and control operating model",
      "Defence, government and banking estates needing data classification and protective marking via Boldon James",
      "UAE ministries and government bodies with sovereign DLP deployment requirements",
      "Banks and regulated industries needing adaptive redaction to reduce business friction",
      "Customers requiring forensics-grade endpoint DLP for insider-threat investigations",
      "Air-gap and on-prem environments where SASE-native DLP cannot operate",
      "Organisations already running Fortra Tripwire, Digital Guardian, or Clearswift",
      "Compliance-driven enterprises with strict outbound DLP audit requirements",
      "Buyers needing OCR and deep content inspection for image-based exfiltration scenarios",
    ],
    products: [
      { model: "Boldon James Classifier", segment: "Classification", role: "User-driven and automated data classification and protective marking across email, documents and files" },
      { model: "Digital Guardian Endpoint DLP", segment: "Endpoint-only", role: "Kernel-level endpoint DLP with forensics-grade visibility" },
      { model: "Clearswift SEG", segment: "Email DLP", role: "Outbound email DLP with adaptive redaction, on-prem or cloud" },
      { model: "Clearswift Secure ICAP Gateway", segment: "Network DLP", role: "Network DLP via ICAP integration for sovereign deployments" },
      { model: "Fortra Data Security Suite", segment: "Strategic", role: "Digital Guardian + Clearswift unified DLP portfolio" },
      { model: "Fortra Cloud DLP", segment: "Cloud-managed", role: "Cloud-delivered DLP for hybrid and SaaS scenarios" },
      { model: "Fortra Managed DLP", segment: "Lean teams", role: "Fortra-managed services for tuning and triage" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Fortra Data Security end-to-end for UAE customers, from classification-led enterprise rollouts to sovereign DLP. Our team has hands-on experience deploying Boldon James Classifier for data classification and protective marking, Digital Guardian for forensics-grade endpoint DLP, and Clearswift Secure Email Gateway with Adaptive Redaction across ministries, banks, and regulated industries. Vendor-neutral sizing is our default starting point; we will tell you when Forcepoint or Symantec is a stronger fit.",
    faqs: [
      {
        question: "What does the Boldon James acquisition add to Fortra Data Security?",
        answer:
          "Boldon James is a market leader in data classification and protective marking. Folding it into Fortra puts classification, endpoint DLP (Digital Guardian) and adaptive redaction (Clearswift) in one portfolio. Users and automated rules label data at the point of creation, and those persistent labels then drive DLP enforcement and outbound redaction, which sharply reduces false positives and scales policy across large estates. It is the capability that moves Fortra from a DLP specialist into a front-rank large-enterprise data security platform, and it strengthens the fit for UAE government, defence and banking.",
      },
      {
        question: "How does Fortra compare to Forcepoint or Symantec?",
        answer:
          "Forcepoint and Symantec lead on mainstream enterprise DLP breadth and Risk-Adaptive Protection. Fortra is the specialist choice for sovereign deployment and adaptive redaction. For UAE ministries needing on-prem DLP with content sanitisation rather than block-or-allow enforcement, Fortra is genuinely differentiated.",
      },
      {
        question: "Is Clearswift Adaptive Redaction unique in the market?",
        answer:
          "Largely yes. Most outbound DLP either blocks or allows entire messages when sensitive content is detected. Clearswift can sanitise the specific sensitive portions and deliver the rest, which is operationally transformative for legitimate-business scenarios. The capability is rare among major DLP vendors.",
      },
      {
        question: "Can Fortra cover Microsoft 365 and other SaaS?",
        answer:
          "For M365 and Google Workspace, Fortra integrates via API for inbox-level DLP. For deeper multi-SaaS coverage (Salesforce, Box, Slack, ServiceNow, etc.), Forcepoint ONE or Netskope typically deliver broader connector coverage. Fortra is strongest at the endpoint, email, and on-prem network layers.",
      },
      {
        question: "What is the typical Fortra DLP deployment lead time in the UAE?",
        answer:
          "Digital Guardian deployments run two to four months given the operational depth of endpoint DLP and forensic workflow setup. Clearswift SEG deployments run four to eight weeks. Combined deployments run three to five months. Sovereign on-prem deployments take longer than cloud-managed alternatives.",
      },
    ],
    whatIs: {
      eyebrow: "What is Fortra Data Security",
      titlePrefix: "Classification, endpoint DLP and adaptive redaction with ",
      titleHighlight: "sovereign deployment options",
      bodyParagraphs: [
        "With the Boldon James acquisition, Fortra Data Security now leads with data classification. Boldon James adds user-driven and automated classification and protective marking, so data is labelled at the point of creation and those labels persist with the file, email or document wherever it travels.",
        "Those classification labels then drive the rest of the suite. Digital Guardian provides kernel-level endpoint DLP with forensics-grade visibility, and Clearswift adds deep content inspection and adaptive redaction, sanitising sensitive content from outbound mail rather than blocking the whole message. Classify, protect and control now sit under one vendor.",
        "Fortra's defining strength is the ability to deploy on-prem or in sovereign environments where most newer SASE-native DLP platforms cannot operate. Combined with classification-led enforcement at enterprise scale, that makes Fortra a consistent shortlist choice for UAE ministries, government bodies, banks and large regulated industries.",
      ],
      feature: {
        titleLine1: "Classify, Protect",
        titleLine2: "& Control",
        body: "Boldon James classifies and protectively marks data at creation; Digital Guardian enforces kernel-level endpoint DLP; Clearswift Adaptive Redaction sanitises outbound content rather than blocking entire messages.",
      },
      capabilities: [
        "Boldon James: user-driven and automated data classification and protective marking",
        "Digital Guardian: kernel-level endpoint DLP with forensics-grade visibility",
        "Clearswift Adaptive Redaction: sanitise outbound content, deliver the rest",
        "Classification labels drive DLP and redaction policy end-to-end",
        "On-prem and sovereign deployment for ministries and regulated entities",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Endpoint, network, or cloud-native: your call.",
      intro: "Artiflex deploys Fortra Data Security in whichever channel model fits your data-movement and regulatory requirements.",
      options: [
        { icon: "hardware", title: "Endpoint DLP", body: "Agent-based DLP enforcement on Windows, macOS, and Linux, covering clipboard, peripherals, removable media, and application-level data movement." },
        { icon: "virtual", title: "Network / Gateway DLP", body: "Outbound traffic inspection at the network perimeter or web proxy, with TLS inspection where the vendor supports it." },
        { icon: "cloud", title: "Cloud / SaaS DLP", body: "API-mode or inline DLP for Microsoft 365, Google Workspace, Salesforce, Box, and other sanctioned SaaS apps." },
      ],
    },
  },

  "check-point-harmony-dlp": {
    slug: "check-point-harmony-dlp",
    name: "Check Point Harmony DLP",
    logo: "/logos/Check-Point-2024-logo-color.svg",
    tagline: "Data protection across network, endpoint, email, and cloud under one Infinity policy",
    bestFor: "Best for Check Point Infinity Estates (Recommended)",
    description:
      "Check Point Harmony DLP and Quantum DLP extend Check Point's prevention-first philosophy to data protection, with one policy plane across network, endpoint, email, and cloud. ThreatCloud AI applies the same intelligence used to block phishing on Harmony Email and malware on Quantum firewalls to outbound data movement. For UAE enterprises already running Check Point Infinity, Harmony DLP completes the data-protection pillar without adding a separate management plane.",
    keyStats: [],
    whyWinsIntro: {
      label: "Check Point Harmony DLP Highlights",
      title: "The right DLP for organisations consolidating to Check Point Infinity",
      description:
        "Harmony DLP is most compelling when Check Point Quantum, Harmony Endpoint, and Harmony Email are already in play. The Infinity unified policy and ThreatCloud AI alignment make a single-vendor case that standalone DLP cannot match. For non-Check Point estates or pure-SaaS DLP scope, Forcepoint, Symantec, or Microsoft Purview typically deliver more focused outcomes.",
      stats: [
        { value: "700+", label: "pre-defined data types covering global and regional frameworks", tone: "emerald" },
        { value: "UserCheck", label: "real-time end-user education at the moment of policy violation", tone: "violet" },
        { value: "Infinity", label: "one policy across network, endpoint, email, and SaaS", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Network DLP on Quantum",
        icon: "shield",
        tone: "emerald",
        title: "Outbound inspection at the gateway",
        desc: "Quantum DLP inspects outbound HTTP, HTTPS, FTP, and SMTP traffic for sensitive data, with TLS 1.3 inspection and the option to block, log, or invoke UserCheck for end-user confirmation.",
      },
      {
        tag: "Endpoint DLP via Harmony",
        icon: "monitor",
        tone: "violet",
        title: "Same policy, applied at the endpoint",
        desc: "Harmony Endpoint enforces the same Infinity DLP policy at the device, covering removable media, clipboard, screen capture, and application-level data movement. Useful for offline scenarios where network DLP cannot see traffic.",
      },
      {
        tag: "Email and SaaS DLP",
        icon: "mail",
        tone: "sky",
        title: "Inline blocking before delivery",
        desc: "Harmony Email scans outbound and internal mail via API with inline-block authority and also covers Teams, Slack, OneDrive, SharePoint, Google Drive, and Box content for outbound DLP scenarios.",
      },
      {
        tag: "UserCheck",
        icon: "users",
        tone: "amber",
        title: "Educate users at the moment of violation",
        desc: "When a user triggers a DLP rule, UserCheck can prompt them to justify or cancel the action, turning every violation into a teachable moment. Reduces both legitimate-business friction and repeat offences.",
      },
      {
        tag: "Document fingerprinting",
        icon: "file",
        tone: "rose",
        title: "Detect specific known documents",
        desc: "Fingerprint specific sensitive documents (contracts, source code, customer lists) so any partial reuse triggers policy. Useful for IP-heavy industries like engineering, legal, and pharma in the UAE.",
      },
      {
        tag: "Infinity Portal management",
        icon: "layers",
        tone: "slate",
        title: "One console across the Check Point estate",
        desc: "DLP is managed in Infinity Portal alongside Quantum, Harmony Endpoint, Harmony Email, CloudGuard, and Mobile. Single-credential, single-policy operations across the full Check Point security stack.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "Enterprises already running Check Point Quantum, Harmony Endpoint, or Harmony Email",
      "Customers building a unified Infinity estate with one policy across all vectors",
      "Banks, government, and regulated industries needing comprehensive DLP across all channels",
      "UAE customers with TLS 1.3 inspection requirements at the network gateway",
      "Organisations valuing real-time user education (UserCheck) at policy violation",
      "Multi-site enterprises consolidating DLP under one console (Infinity Portal)",
      "IP-heavy industries needing document fingerprinting (legal, engineering, pharma)",
    ],
    products: [
      { model: "Quantum DLP (network)", segment: "Enterprise", role: "Network DLP enforced at Check Point Security Gateways" },
      { model: "Harmony Endpoint with DLP", segment: "Enterprise", role: "Endpoint DLP, peripheral control, screen capture protection" },
      { model: "Harmony Email DLP", segment: "M365 / Workspace", role: "Email and collaboration app DLP via API" },
      { model: "Infinity DLP Bundle", segment: "Strategic", role: "Network + Endpoint + Email + SaaS DLP under one Infinity licence" },
      { model: "Custom data types and fingerprints", segment: "Compliance-heavy", role: "Regex, dictionaries, and document fingerprints for specific data" },
      { model: "Infinity Total Protection", segment: "Enterprise", role: "DLP within the wider Infinity strategic licence" },
    ],
    whyArtiflex:
      "Artiflex IT is a Check Point Certified Partner with CCSA and CCSE engineers serving the UAE, Oman, and Saudi Arabia. We deliver Harmony DLP end-to-end: data discovery, Infinity Portal tenant design, ThreatCloud AI alignment with Quantum firewalls, UserCheck workflow rollout, document fingerprinting, and 24x7 managed services. Our team has implemented Check Point DLP for banking and government customers across the region.",
    faqs: [
      {
        question: "How does Harmony DLP compare to Forcepoint or Symantec?",
        answer:
          "Forcepoint and Symantec lead on pure DLP depth (advanced content classification, OCR, behavioral analytics). Harmony DLP wins when you are building or already running a unified Check Point Infinity estate. For standalone DLP deployments without Check Point elsewhere, Forcepoint or Symantec are typically stronger picks.",
      },
      {
        question: "Can Harmony DLP cover offline endpoints?",
        answer:
          "Yes. Harmony Endpoint enforces DLP policy locally on the device, even when offline. Network DLP (Quantum) only sees traffic that traverses the gateway, so the combined endpoint plus network deployment is the recommended pattern for full coverage.",
      },
      {
        question: "Is Harmony DLP suitable for cloud-only Microsoft 365 estates?",
        answer:
          "For M365 and Google Workspace, Harmony Email provides API-based DLP across mail and the major collaboration apps (Teams, SharePoint, OneDrive, Google Drive, Box). For deeper SaaS DLP across many other SaaS apps, Netskope or Forcepoint ONE typically deliver broader connector coverage.",
      },
      {
        question: "What is the typical Harmony DLP deployment lead time in the UAE?",
        answer:
          "Standard mid-market deployments run four to eight weeks: data discovery, Infinity Portal setup, policy authoring with UserCheck, document fingerprinting, and pilot. Multi-site enterprise rollouts for banks and government typically run two to four months. We hold demo Infinity tenants for proof of concept.",
      },
    ],
    whatIs: {
      eyebrow: "What is Check Point Harmony DLP",
      titlePrefix: "DLP as a layer of the ",
      titleHighlight: "Check Point Infinity architecture",
      bodyParagraphs: [
        "Quantum DLP is built into Check Point Security Gateways and inspects outbound traffic for sensitive data using over 700 pre-defined data types, custom regex, document fingerprinting, and form-based templates. Harmony DLP extends the same policy to the endpoint and to API-mode Microsoft 365 and Google Workspace protection.",
        "Everything is managed through Infinity Portal alongside Quantum firewalls, Harmony Endpoint, Harmony Email, CloudGuard, and Mobile. Policy authoring is unified, and DLP events correlate with the rest of the Infinity telemetry for cross-vector incident response.",
      ],
      feature: {
        titleLine1: "Infinity DLP",
        titleLine2: "Architecture",
        body: "DLP policy authored once in Infinity Portal is enforced on Quantum firewalls (network DLP), Harmony Endpoint (endpoint DLP), and Harmony Email (email and SaaS DLP).",
      },
      capabilities: [
        "700+ pre-defined data types covering global and regional frameworks",
        "UserCheck workflow: real-time user education at the moment of violation",
        "Document fingerprinting and form-based templates for structured data",
        "Unified Infinity policy across network, endpoint, email, and SaaS",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Endpoint, network, or cloud-native: your call.",
      intro: "Artiflex deploys Check Point Harmony DLP in whichever channel model fits your data-movement and regulatory requirements.",
      options: [
        { icon: "hardware", title: "Endpoint DLP", body: "Agent-based DLP enforcement on Windows, macOS, and Linux, covering clipboard, peripherals, removable media, and application-level data movement." },
        { icon: "virtual", title: "Network / Gateway DLP", body: "Outbound traffic inspection at the network perimeter or web proxy, with TLS inspection where the vendor supports it." },
        { icon: "cloud", title: "Cloud / SaaS DLP", body: "API-mode or inline DLP for Microsoft 365, Google Workspace, Salesforce, Box, and other sanctioned SaaS apps." },
      ],
    },
  },

  "microsoft-purview-dlp": {
    slug: "microsoft-purview-dlp",
    name: "Microsoft Purview DLP",
    logo: "/logos/microsoft.svg",
    tagline: "Native DLP for Microsoft 365 and Windows, integrated with Sensitivity Labels and Insider Risk",
    bestFor: "Best for Microsoft 365 E5 Estates (Recommended)",
    description:
      "Microsoft Purview DLP is built into the Microsoft 365 platform with no third-party agent on Windows, and integrates natively with Sensitivity Labels (Information Protection), Insider Risk Management, and Defender XDR. For UAE customers already licensed for Microsoft 365 E5, Purview DLP delivers credible enterprise-grade DLP at zero incremental cost. For mixed-OS environments or organisations needing deep cross-vendor DLP depth, Forcepoint or Symantec typically lead the shortlist.",
    keyStats: [],
    whyWinsIntro: {
      label: "Microsoft Purview DLP Highlights",
      title: "The right DLP when Microsoft 365 E5 is already in place",
      description:
        "Purview DLP is at its best when M365 E5 is already licensed and Sensitivity Labels are part of the data classification strategy. Native integration removes vendor seams and operational duplication. For mixed-OS environments (macOS, Linux endpoint coverage), non-M365 SaaS, or deepest enterprise DLP needs, third-party DLP typically delivers stronger outcomes for that scope.",
      stats: [
        { value: "Native", label: "M365 coverage: Exchange, SharePoint, OneDrive, Teams without connectors", tone: "emerald" },
        { value: "E5 bundled", label: "included with Microsoft 365 E5 and M365 E5 Compliance licences", tone: "violet" },
        { value: "Purview", label: "platform: DLP plus Sensitivity Labels plus Insider Risk plus Communication Compliance", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Native M365 coverage",
        icon: "mail",
        tone: "emerald",
        title: "Exchange, SharePoint, OneDrive, Teams without connectors",
        desc: "Purview DLP runs natively inside Microsoft 365, with no MX changes, no connector agents, and no proxy reconfiguration. The fastest path to DLP coverage of M365 content for organisations already in the ecosystem.",
      },
      {
        tag: "Endpoint DLP on Windows",
        icon: "monitor",
        tone: "violet",
        title: "Defender for Endpoint as the DLP agent",
        desc: "Windows endpoint DLP runs through Defender for Endpoint (P2 / E5), with no additional agent. Covers clipboard, removable media, network upload, and print actions with the same policy used for M365 channels.",
      },
      {
        tag: "Sensitivity Labels",
        icon: "file",
        tone: "sky",
        title: "Auto-classification feeds DLP policy",
        desc: "Sensitivity Labels classify content automatically using trainable classifiers, pattern recognition, and EDM. DLP policies apply differently based on label, eliminating much of the manual policy-authoring burden.",
      },
      {
        tag: "Trainable Classifiers",
        icon: "sliders",
        tone: "amber",
        title: "Train on your own sensitive content samples",
        desc: "Like Symantec VML, Microsoft trainable classifiers learn from samples of your sensitive content and identify similar content elsewhere. Useful for industry- or organisation-specific sensitive content beyond off-the-shelf templates.",
      },
      {
        tag: "Insider Risk integration",
        icon: "eye",
        tone: "rose",
        title: "DLP signals feed insider-risk scoring",
        desc: "Insider Risk Management uses DLP events alongside HR signals, identity activity, and endpoint behaviour to score insider-threat risk. Suspect users get elevated DLP scrutiny automatically, similar to Forcepoint Risk-Adaptive.",
      },
      {
        tag: "Defender XDR correlation",
        icon: "layers",
        tone: "slate",
        title: "DLP plus endpoint plus identity in one workbench",
        desc: "DLP incidents correlate with Defender for Endpoint, Defender for Identity, and Defender for Cloud Apps events in the Defender XDR portal, replacing the standalone DLP analyst portal for Microsoft-centric SOCs.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "Microsoft 365 E5 or M365 E5 Compliance customers wanting to use what they already pay for",
      "Microsoft-centric estates running Defender for Endpoint and Sensitivity Labels",
      "Organisations consolidating SIEM (Sentinel), DLP (Purview), and endpoint (MDE) on Microsoft",
      "Windows-heavy estates where native endpoint DLP eliminates a third-party agent",
      "UAE government and large enterprises with EA agreements including M365 E5",
      "Compliance-driven environments wanting DLP integrated with Insider Risk and Communication Compliance",
      "Microsoft-trained SOCs comfortable with the Purview portal and KQL hunting",
    ],
    products: [
      { model: "Microsoft 365 E3", segment: "Baseline", role: "Basic DLP policies for Exchange and SharePoint" },
      { model: "Microsoft 365 E5", segment: "Enterprise", role: "Full Purview DLP including endpoint DLP and trainable classifiers" },
      { model: "M365 E5 Compliance", segment: "Compliance-heavy", role: "Purview DLP plus Insider Risk, Communication Compliance, eDiscovery" },
      { model: "Microsoft Purview standalone", segment: "Beyond M365", role: "Purview governance for non-M365 sources (limited DLP scope)" },
      { model: "Defender for Endpoint P2", segment: "Endpoint coverage", role: "Required for Windows endpoint DLP enforcement" },
      { model: "Microsoft Purview Premium", segment: "Strategic", role: "Full Purview suite covering DLP, governance, compliance, and eDiscovery" },
    ],
    whyArtiflex:
      "Artiflex IT is a Microsoft Solutions Partner with certified engineers serving the UAE, Oman, and Saudi Arabia. We deliver Purview DLP end-to-end for Microsoft-centric estates: data discovery, Sensitivity Label strategy design, trainable classifier training, endpoint DLP rollout via Defender for Endpoint, Insider Risk Management integration, and Defender XDR correlation. We have migrated Symantec, Forcepoint, and McAfee DLP estates onto Purview for UAE customers with existing M365 E5 entitlements.",
    faqs: [
      {
        question: "Should we use Purview DLP instead of Forcepoint or Symantec?",
        answer:
          "If you already pay for M365 E5, Purview DLP delivers credible enterprise-grade DLP at zero incremental cost. For mixed-OS environments (macOS, Linux endpoint DLP), non-M365 SaaS coverage at depth, or deepest enterprise DLP scope, Forcepoint or Symantec typically still lead. For Microsoft-centric estates, Purview is the natural choice.",
      },
      {
        question: "Does Purview DLP cover macOS and Linux endpoints?",
        answer:
          "Endpoint DLP via Defender for Endpoint covers Windows comprehensively, with macOS at increasing depth. Linux endpoint DLP is limited. For Linux-heavy server estates with DLP requirements, third-party DLP (Symantec, Forcepoint) typically covers Linux more deeply.",
      },
      {
        question: "Is Purview DLP a replacement for our existing DLP product?",
        answer:
          "For Microsoft-centric estates that have grown comfortable with the Defender portal and Sensitivity Labels, yes. Many UAE customers run Purview DLP for M365 and Windows while keeping a third-party DLP layer for non-Microsoft scope (macOS, Linux, deep SaaS, network DLP). We help size the right pattern.",
      },
      {
        question: "What is the typical Purview DLP deployment lead time in the UAE?",
        answer:
          "Standard mid-market deployments run four to eight weeks when the M365 tenant is already in place: Sensitivity Label strategy, policy authoring, classifier training, endpoint DLP pilot, and tuning. Greenfield M365 plus Purview deployments run three to six months.",
      },
    ],
    whatIs: {
      eyebrow: "What is Microsoft Purview DLP",
      titlePrefix: "DLP built into Microsoft 365, Windows, ",
      titleHighlight: "and the Purview platform",
      bodyParagraphs: [
        "Purview DLP applies policy across Exchange Online, SharePoint Online, OneDrive, Teams, and Windows endpoints (via Defender for Endpoint) natively. Sensitivity Labels tie DLP enforcement to information classification, with auto-labelling powered by trainable classifiers and pattern recognition that runs natively in M365.",
        "Tight integration with Insider Risk Management, Communication Compliance, and Defender XDR turns DLP into part of an integrated data governance and insider-threat capability rather than a standalone product. For Microsoft-centric estates, this consolidation is operationally powerful.",
      ],
      feature: {
        titleLine1: "Purview Data",
        titleLine2: "Governance Architecture",
        body: "DLP, Sensitivity Labels, Insider Risk Management, Communication Compliance, and eDiscovery on one platform, with policy enforcement across M365 and Windows natively.",
      },
      capabilities: [
        "Native M365 coverage: Exchange, SharePoint, OneDrive, Teams without connectors",
        "Endpoint DLP on Windows via Microsoft Defender for Endpoint",
        "Sensitivity Labels with trainable classifiers and auto-labelling",
        "Native integration with Insider Risk Management and Defender XDR",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Endpoint, network, or cloud-native: your call.",
      intro: "Artiflex deploys Microsoft Purview DLP in whichever channel model fits your data-movement and regulatory requirements.",
      options: [
        { icon: "hardware", title: "Endpoint DLP", body: "Agent-based DLP enforcement on Windows, macOS, and Linux, covering clipboard, peripherals, removable media, and application-level data movement." },
        { icon: "virtual", title: "Network / Gateway DLP", body: "Outbound traffic inspection at the network perimeter or web proxy, with TLS inspection where the vendor supports it." },
        { icon: "cloud", title: "Cloud / SaaS DLP", body: "API-mode or inline DLP for Microsoft 365, Google Workspace, Salesforce, Box, and other sanctioned SaaS apps." },
      ],
    },
  },

  "forcepoint-dlp": {
    slug: "forcepoint-dlp",
    name: "Forcepoint Data Security",
    logo: "/logos/forcepoint.png",
    tagline: "Risk-Adaptive Protection with behavioural analytics across endpoint, network, and cloud",
    bestFor: "Best for Enterprise DLP Depth (Recommended)",
    description:
      "Forcepoint pioneered the modern DLP category and remains one of the most depth-oriented DLP platforms, consistently rated a Leader in independent evaluations. Forcepoint ONE Data Security combines mature content classification (over 1,700 pre-defined templates) with Risk-Adaptive Protection, which adjusts policy enforcement dynamically based on user risk scoring. For UAE enterprises that need deep DLP across endpoint, network, email, web, and cloud channels under one policy, Forcepoint is the reference standard.",
    keyStats: [],
    whyWinsIntro: {
      label: "Forcepoint Data Security Highlights",
      title: "The reference standard for enterprise DLP depth in the UAE",
      description:
        "Forcepoint Data Security is most compelling for enterprises that need deep content classification, behavioural analytics, and policy uniformity across many channels. The platform requires a dedicated DLP analyst function to operate at full potential. For UAE mid-market customers without that capacity, Sophos or Microsoft Purview typically deliver better outcomes per dollar of operational cost.",
      stats: [
        { value: "1,700+", label: "pre-defined data classification templates and ML classifiers", tone: "emerald" },
        { value: "Risk-Adaptive", label: "dynamic policy enforcement scaled by per-user risk score", tone: "violet" },
        { value: "Leader", label: "consistently ranked Leader in Gartner Enterprise DLP evaluations", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Risk-Adaptive Protection",
        icon: "sliders",
        tone: "emerald",
        title: "Policy enforcement tuned to per-user risk",
        desc: "Each user's risk score is built from behavioural anomalies, prior violations, posture signals, and identity context. Policy enforcement scales accordingly: trusted users get monitor-only, elevated-risk users get full block. Reduces false positives and help-desk friction.",
      },
      {
        tag: "Classification library",
        icon: "list",
        tone: "violet",
        title: "1,700+ templates across global compliance frameworks",
        desc: "Forcepoint ships templates for PII, PCI, PHI, GDPR, HIPAA, SOX, and dozens of regional frameworks. Authoring custom templates with regex, dictionaries, and proximity logic is straightforward.",
      },
      {
        tag: "OCR and Image Analysis",
        icon: "eye",
        tone: "sky",
        title: "Detect data in images and scanned documents",
        desc: "Native OCR identifies sensitive data in scanned documents and images, catching exfiltration via screenshot, scanned PDF, and embedded image content. Important for IP and trade-secret protection.",
      },
      {
        tag: "EDM and IDM",
        icon: "file",
        tone: "amber",
        title: "Exact Data Match and Indexed Document Match",
        desc: "EDM matches structured data (credit card numbers, customer records) precisely against your source database; IDM fingerprints specific sensitive documents. Both produce dramatically lower false-positive rates than pure regex.",
      },
      {
        tag: "Unified policy",
        icon: "layers",
        tone: "rose",
        title: "Endpoint, network, web, email, cloud as one rule set",
        desc: "Author a policy once in the Forcepoint console and enforce it consistently across endpoint, network gateway, web proxy, email gateway, and cloud (CASB) channels. No policy drift between products.",
      },
      {
        tag: "Forcepoint ONE platform",
        icon: "globe",
        tone: "slate",
        title: "DLP plus SWG plus CASB plus ZTNA in one SASE platform",
        desc: "Forcepoint ONE consolidates DLP, Secure Web Gateway, CASB, ZTNA, and Remote Browser Isolation on one converged SASE platform, with one agent, one console, and one policy. The strongest single-vendor SASE-DLP story in the market.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "Large enterprises and banks needing deep enterprise DLP across many channels",
      "UAE government and regulated industries with strict data-residency and policy uniformity requirements",
      "Organisations with dedicated DLP analyst teams that can fully utilise classification depth",
      "Customers needing OCR, EDM, and IDM for structured and unstructured data protection",
      "Multi-channel exposure: endpoint, network, web, email, and SaaS all in scope",
      "Buyers consolidating to a single SASE platform (Forcepoint ONE) across DLP, SWG, CASB, ZTNA",
      "Compliance-driven enterprises building toward Zero Trust data-centric security",
    ],
    products: [
      { model: "Forcepoint DLP Endpoint", segment: "Endpoint-only", role: "Endpoint DLP with peripheral and removable-device control" },
      { model: "Forcepoint DLP Network", segment: "Network-only", role: "Gateway-mode DLP for outbound web, email, and SMTP traffic" },
      { model: "Forcepoint Data Security Suite", segment: "Enterprise", role: "Endpoint plus network plus email plus discover modules" },
      { model: "Forcepoint ONE Data Security", segment: "SASE-native", role: "Cloud-delivered DLP across SaaS, web, email, and endpoint" },
      { model: "Forcepoint ONE Platform", segment: "Strategic", role: "DLP plus SWG plus CASB plus ZTNA plus RBI on one SASE platform" },
      { model: "Forcepoint Managed DLP", segment: "Lean teams", role: "Managed services for tuning, triage, and policy maintenance" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Forcepoint Data Security end-to-end for UAE enterprise customers across banking, government, healthcare, and large enterprise. Our team has hands-on experience designing Risk-Adaptive Protection policies, deploying EDM and IDM for sensitive document protection, and rolling out Forcepoint ONE SASE estates. We provide structured DLP discovery, policy authoring, pilot, and ongoing managed services.",
    faqs: [
      {
        question: "How does Forcepoint compare to Symantec or Microsoft Purview?",
        answer:
          "Forcepoint and Symantec lead on pure DLP depth and the Forcepoint ONE platform wins on SASE-native consolidation. Symantec wins on the most mature enterprise DLP product (now Broadcom). Microsoft Purview wins for M365-centric estates wanting native integration at lower cost. We size all three for shortlist customers.",
      },
      {
        question: "Is Risk-Adaptive Protection a separate product?",
        answer:
          "Risk-Adaptive Protection is a capability layered on top of Forcepoint DLP, requiring user-behavioural-analytics signals to populate the risk score. Most enterprise customers enable it as part of the standard Data Security Suite deployment.",
      },
      {
        question: "Can Forcepoint DLP cover Microsoft 365 and other SaaS?",
        answer:
          "Yes, particularly via Forcepoint ONE Data Security. The CASB-mode connectors cover M365, Google Workspace, Salesforce, ServiceNow, and dozens of other SaaS apps with the same policy used for endpoint and network DLP.",
      },
      {
        question: "What is the typical Forcepoint deployment lead time in the UAE?",
        answer:
          "Standard enterprise deployments run two to four months: data discovery, EDM/IDM source ingestion, policy authoring with Risk-Adaptive workflows, pilot, and tuning. SASE-native Forcepoint ONE deployments are faster (six to twelve weeks) because there is no on-prem gateway component.",
      },
    ],
    whatIs: {
      eyebrow: "What is Forcepoint Data Security",
      titlePrefix: "DLP that adapts policy enforcement to ",
      titleHighlight: "user risk in real time",
      bodyParagraphs: [
        "Forcepoint ONE Data Security applies a unified policy across endpoint, network, email, web, and cloud channels. The platform ships with over 1,700 pre-defined data classification templates spanning global and regional compliance frameworks, plus OCR, EDM (Exact Data Match), IDM (Indexed Document Match), machine-learning classifiers, and full-script analytics.",
        "Risk-Adaptive Protection is the platform's signature capability: a user's risk score (built from behavioural anomalies, policy violations, posture signals) dynamically adjusts policy enforcement. A trusted user gets monitor-only; an elevated-risk user gets full block. The result is fewer false positives, fewer help-desk tickets, and stronger protection where it matters.",
      ],
      feature: {
        titleLine1: "Risk-Adaptive DLP",
        titleLine2: "Architecture",
        body: "One policy across endpoint, network, email, web, and cloud channels, with dynamic enforcement tuned by per-user risk score. Over 1,700 pre-defined data classification templates.",
      },
      capabilities: [
        "1,700+ pre-defined classification templates and ML-based classifiers",
        "Risk-Adaptive Protection: dynamic policy enforcement by user risk score",
        "EDM and IDM: Exact Data Match and Indexed Document Match",
        "Unified policy across endpoint, network, web, email, and cloud channels",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Endpoint, network, or cloud-native: your call.",
      intro: "Artiflex deploys Forcepoint Data Security in whichever channel model fits your data-movement and regulatory requirements.",
      options: [
        { icon: "hardware", title: "Endpoint DLP", body: "Agent-based DLP enforcement on Windows, macOS, and Linux, covering clipboard, peripherals, removable media, and application-level data movement." },
        { icon: "virtual", title: "Network / Gateway DLP", body: "Outbound traffic inspection at the network perimeter or web proxy, with TLS inspection where the vendor supports it." },
        { icon: "cloud", title: "Cloud / SaaS DLP", body: "API-mode or inline DLP for Microsoft 365, Google Workspace, Salesforce, Box, and other sanctioned SaaS apps." },
      ],
    },
  },

  "symantec-dlp-broadcom": {
    slug: "symantec-dlp-broadcom",
    name: "Symantec Data Loss Prevention",
    logo: "/logos/Symantec.png",
    tagline: "The original enterprise DLP, with the deepest content classification in the market",
    bestFor: "Best for Mature Enterprise DLP (Recommended)",
    description:
      "Symantec DLP, now part of the Broadcom Symantec Enterprise portfolio, is the original modern enterprise DLP product and remains one of the most depth-oriented platforms in the market. It is consistently the DLP of choice at the very largest enterprises (banks, energy, pharma) where content-classification precision and policy uniformity across many channels are decisive. For UAE customers with a dedicated DLP function and mature security operations, Symantec remains the reference standard.",
    keyStats: [],
    whyWinsIntro: {
      label: "Symantec Data Loss Prevention Highlights",
      title: "The reference platform for the largest enterprises that need maximum DLP depth",
      description:
        "Symantec DLP is most compelling for the largest UAE enterprises (banks, telcos, government, energy) that have a dedicated DLP function, complex multi-channel data flow, and the operational maturity to tune and manage enterprise DLP at scale. For smaller organisations, the operational overhead typically outweighs the depth advantage versus Sophos, Forcepoint ONE, or Microsoft Purview.",
      stats: [
        { value: "Original", label: "modern enterprise DLP, with two decades of product heritage", tone: "emerald" },
        { value: "EDM + IDM", label: "structured data and document fingerprint precision unmatched in the market", tone: "violet" },
        { value: "All channels", label: "endpoint, network, storage, cloud, email under one policy", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Vector Machine Learning",
        icon: "shield",
        tone: "emerald",
        title: "ML classifiers for unstructured sensitive content",
        desc: "VML lets you train classifiers on samples of your sensitive content (legal documents, source code, M&A communications). Once trained, the classifier identifies similar content elsewhere with high precision and low false-positive rates.",
      },
      {
        tag: "Exact Data Match",
        icon: "file",
        tone: "violet",
        title: "Structured-data precision against your source databases",
        desc: "EDM matches outbound content against indexed source data (customer records, employee data, IP). Detection is precise rather than probabilistic, producing dramatically lower false-positive rates than regex-based classification.",
      },
      {
        tag: "Indexed Document Match",
        icon: "list",
        tone: "sky",
        title: "Detect specific sensitive documents and partial reuse",
        desc: "IDM fingerprints specific documents (contracts, financial reports, technical drawings) so any partial reuse triggers policy. Crucial for protecting IP that is sensitive in any partial form.",
      },
      {
        tag: "Storage DLP",
        icon: "server",
        tone: "amber",
        title: "Discover sensitive content at rest",
        desc: "Storage DLP scans file shares, SharePoint, OneDrive, S3, and Azure storage for sensitive content already at rest, providing the foundation for risk-prioritised remediation programmes.",
      },
      {
        tag: "Endpoint DLP",
        icon: "monitor",
        tone: "rose",
        title: "Comprehensive endpoint coverage",
        desc: "Symantec DLP Endpoint Prevent covers Windows, macOS, and Linux endpoints with full content inspection, peripheral control, and application-level data movement enforcement. Mature support for offline scenarios.",
      },
      {
        tag: "Integrated CloudSOC CASB",
        icon: "globe",
        tone: "slate",
        title: "DLP for SaaS via the Broadcom CloudSOC connector",
        desc: "Symantec CloudSOC (CASB) provides DLP coverage for Microsoft 365, Google Workspace, Salesforce, Box, and dozens of other SaaS apps, with policy aligned to the broader Symantec DLP estate.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "Largest UAE enterprises (banks, energy, government) with dedicated DLP analyst functions",
      "Organisations needing the deepest content classification depth available",
      "Customers with complex multi-channel data flow requiring policy uniformity",
      "Existing Symantec customers (web gateway, endpoint, CloudSOC) consolidating to the Broadcom estate",
      "Compliance-driven environments with mature security operations capacity",
      "Multinational operations needing global support and a long product roadmap",
      "Buyers willing to invest in operational rigour for maximum DLP precision",
    ],
    products: [
      { model: "Symantec DLP Endpoint", segment: "Endpoint-only", role: "Endpoint DLP with VML, EDM, and IDM classifiers" },
      { model: "Symantec DLP Network", segment: "Network-only", role: "Gateway-mode DLP via Symantec Web Gateway or ICAP" },
      { model: "Symantec DLP Storage", segment: "Discovery", role: "Discover sensitive content at rest on file shares and cloud storage" },
      { model: "Symantec DLP Cloud Service", segment: "SaaS-aware", role: "DLP for M365, Google Workspace, Salesforce via CloudSOC connectors" },
      { model: "Symantec DLP Suite", segment: "Enterprise", role: "Endpoint + Network + Storage + Cloud under one policy" },
      { model: "Broadcom Enterprise DLP Bundle", segment: "Strategic", role: "Symantec DLP within the wider Broadcom Symantec Enterprise licence" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Symantec DLP end-to-end for large UAE enterprise customers across banking, energy, government, and telco. Our team has hands-on experience deploying full Symantec DLP suites with VML classifiers, EDM source ingestion, IDM document fingerprinting, and Storage DLP discovery. We provide structured DLP discovery, policy authoring, pilot, tuning, and ongoing managed services.",
    faqs: [
      {
        question: "How does Symantec DLP compare to Forcepoint or Microsoft Purview?",
        answer:
          "Symantec leads on pure classification depth and platform maturity. Forcepoint wins on Risk-Adaptive Protection and the Forcepoint ONE SASE consolidation. Microsoft Purview wins on M365-native integration and cost for E5 customers. We size all three for shortlist customers; Symantec is typically the right answer at the largest enterprise tier with dedicated DLP staff.",
      },
      {
        question: "Does Symantec DLP still receive investment under Broadcom?",
        answer:
          "Yes. Symantec DLP is part of the Broadcom Symantec Enterprise division with continued product investment, particularly in cloud and SaaS coverage via CloudSOC. The roadmap is enterprise-focused; mid-market customers may find the licensing model less accessible than newer entrants.",
      },
      {
        question: "Can Symantec DLP integrate with non-Symantec proxies and gateways?",
        answer:
          "Yes. Network DLP can integrate via standard ICAP with most enterprise web proxies and SMTP gateways. Many UAE deployments run Symantec DLP behind non-Symantec network infrastructure successfully.",
      },
      {
        question: "What is the typical Symantec DLP deployment lead time in the UAE?",
        answer:
          "Standard enterprise deployments run three to six months for full multi-channel coverage, including data discovery, EDM/IDM source ingestion, VML classifier training, policy authoring, pilot, and tuning. Endpoint-only or Network-only deployments are faster (two to four months).",
      },
    ],
    whatIs: {
      eyebrow: "What is Symantec Data Loss Prevention",
      titlePrefix: "The original enterprise DLP, ",
      titleHighlight: "mature across every channel",
      bodyParagraphs: [
        "Symantec DLP covers endpoint, network, storage, cloud, and email channels under one policy. The platform is built around a content-classification engine that includes Exact Data Match (EDM), Indexed Document Match (IDM), Described Content Matching (DCM), Form-based classifiers, and Vector Machine Learning classifiers. The pre-built policy template library is among the most extensive in the industry.",
        "Symantec DLP is operationally heavier than newer DLP platforms and requires a dedicated DLP analyst function to tune and manage. For organisations that have that capacity, the depth advantage is genuine. For UAE mid-market customers without dedicated DLP staff, newer SASE-native platforms or Sophos typically deliver better operational outcomes.",
      ],
      feature: {
        titleLine1: "Enterprise DLP",
        titleLine2: "Reference Architecture",
        body: "One policy across endpoint, network, storage, cloud, and email channels. Industry-leading classification library with EDM, IDM, DCM, VML, and form-based templates.",
      },
      capabilities: [
        "Vector Machine Learning (VML) classifiers for unstructured sensitive content",
        "EDM and IDM for structured-data and document-fingerprint precision",
        "Storage DLP: scan file shares, SharePoint, and cloud storage at rest",
        "Network DLP via Symantec Web Gateway or third-party ICAP integration",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Endpoint, network, or cloud-native: your call.",
      intro: "Artiflex deploys Symantec Data Loss Prevention in whichever channel model fits your data-movement and regulatory requirements.",
      options: [
        { icon: "hardware", title: "Endpoint DLP", body: "Agent-based DLP enforcement on Windows, macOS, and Linux, covering clipboard, peripherals, removable media, and application-level data movement." },
        { icon: "virtual", title: "Network / Gateway DLP", body: "Outbound traffic inspection at the network perimeter or web proxy, with TLS inspection where the vendor supports it." },
        { icon: "cloud", title: "Cloud / SaaS DLP", body: "API-mode or inline DLP for Microsoft 365, Google Workspace, Salesforce, Box, and other sanctioned SaaS apps." },
      ],
    },
  },

  "trellix-dlp": {
    slug: "trellix-dlp",
    name: "Trellix Data Loss Prevention",
    logo: "/logos/Trellix.png",
    tagline: "Mature endpoint, network, and discovery DLP unified under Trellix ePolicy Orchestrator",
    bestFor: "Strong Choice for McAfee / Trellix Estates (Recommended)",
    description:
      "Trellix DLP (formerly McAfee Total Protection for DLP, before that McAfee Host DLP) has a long heritage in enterprise endpoint and network DLP, with mature content classification and one of the longest-standing management platforms in the industry (ePolicy Orchestrator). After the McAfee + FireEye merger into Trellix, the platform continues to receive investment as part of the Trellix XDR ecosystem. For UAE customers with existing McAfee / Trellix endpoint or ePO estates, Trellix DLP is the natural continuation.",
    keyStats: [],
    whyWinsIntro: {
      label: "Trellix Data Loss Prevention Highlights",
      title: "Strongest fit where McAfee / Trellix estates are already in place",
      description:
        "Trellix DLP is most compelling for customers with existing McAfee / Trellix endpoint, ePO, or Helix investments. The depth and operational pattern map well to mature enterprise security teams. For greenfield UAE deployments without an existing Trellix footprint, newer SASE-native platforms or Sophos typically deliver better operational outcomes per dollar.",
      stats: [
        { value: "ePO", label: "two decades of unified policy and management platform maturity", tone: "emerald" },
        { value: "3 channels", label: "endpoint, network, and discovery covered under one policy", tone: "violet" },
        { value: "Helix XDR", label: "Trellix XDR correlates DLP with endpoint, identity, and network signals", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "ePolicy Orchestrator",
        icon: "layers",
        tone: "emerald",
        title: "Mature single-pane management for the Trellix estate",
        desc: "ePO has been the central management platform for McAfee/Trellix for two decades. DLP policy authoring, deployment, and reporting share one console with endpoint security, encryption, web gateway, and the rest of the Trellix portfolio.",
      },
      {
        tag: "Endpoint DLP",
        icon: "monitor",
        tone: "violet",
        title: "Comprehensive Windows, macOS, and Linux coverage",
        desc: "Trellix Endpoint DLP enforces policy across Windows, macOS, and Linux with full content inspection, peripheral control, screen capture protection, and application-level data movement enforcement.",
      },
      {
        tag: "Network DLP",
        icon: "globe",
        tone: "sky",
        title: "Outbound inspection at the gateway",
        desc: "Network DLP inspects outbound HTTP, HTTPS, FTP, and SMTP traffic for sensitive content, with TLS inspection options. Integrates with Trellix Network Security Platform or via standard ICAP.",
      },
      {
        tag: "Discovery DLP",
        icon: "eye",
        tone: "amber",
        title: "Scan repositories for sensitive data at rest",
        desc: "Discovery DLP scans file shares, SharePoint, OneDrive, S3, and Azure storage for sensitive content already at rest, providing the foundation for risk-prioritised remediation programmes.",
      },
      {
        tag: "Helix XDR integration",
        icon: "shield",
        tone: "rose",
        title: "DLP events in the Trellix XDR workbench",
        desc: "DLP incidents correlate with Trellix Endpoint Security, Network Security, and Email Security signals in the Helix XDR console, providing cross-vector incident response for Trellix-standardized SOCs.",
      },
      {
        tag: "Compliance template library",
        icon: "file",
        tone: "slate",
        title: "PCI, HIPAA, GDPR, and regional frameworks",
        desc: "Pre-built templates cover global compliance frameworks. Custom classifiers (regex, dictionaries, fingerprints, ML) extend coverage to organisation-specific sensitive data.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "Enterprises with existing McAfee / Trellix endpoint, ePO, or Helix investments",
      "Multi-OS environments needing Windows, macOS, and Linux endpoint DLP",
      "Organisations consolidating endpoint, network, and discovery DLP under one vendor",
      "Customers wanting Trellix XDR correlation across DLP, endpoint, network, and email",
      "Mature security teams comfortable with the ePO operational model",
      "Government and regulated industries with existing McAfee / Trellix vendor approvals",
      "Multinational operations needing consistent global support and a long roadmap",
    ],
    products: [
      { model: "Trellix DLP Endpoint", segment: "Endpoint-only", role: "Endpoint DLP with peripheral control across Windows, macOS, Linux" },
      { model: "Trellix DLP Network Prevent", segment: "Network-only", role: "Gateway-mode DLP with TLS inspection options" },
      { model: "Trellix DLP Discover", segment: "Discovery", role: "Scan repositories for sensitive content at rest" },
      { model: "Trellix DLP Suite", segment: "Enterprise", role: "Endpoint + Network + Discovery under one policy" },
      { model: "Trellix XDR Platform", segment: "Strategic", role: "DLP within the Trellix XDR ecosystem alongside endpoint, network, email" },
      { model: "Trellix Managed DLP", segment: "Lean teams", role: "Managed services for tuning, triage, and policy maintenance" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Trellix DLP end-to-end for UAE customers with existing McAfee / Trellix estates across enterprise, government, and regulated industries. Our team has hands-on experience with ePO policy authoring, endpoint DLP rollout, network DLP gateway integration, and Helix XDR onboarding. We provide vendor-neutral assessment to determine when Sophos, Forcepoint, or Symantec would deliver better outcomes.",
    faqs: [
      {
        question: "How does Trellix DLP compare to Symantec or Forcepoint?",
        answer:
          "Symantec leads on pure classification depth at the largest enterprise tier. Forcepoint wins on Risk-Adaptive Protection and SASE consolidation. Trellix is the natural continuation for McAfee / Trellix-invested customers. For greenfield deployments without existing Trellix footprint, the alternatives typically deliver better outcomes.",
      },
      {
        question: "Is Trellix still investing in DLP after the McAfee / FireEye merger?",
        answer:
          "Yes. Trellix DLP receives continued product investment as part of the Trellix XDR ecosystem. The roadmap is enterprise-focused, with stronger XDR integration each year. The licensing model is enterprise-focused and may be less accessible than newer entrants for mid-market.",
      },
      {
        question: "Can Trellix DLP integrate with non-Trellix infrastructure?",
        answer:
          "Yes. Network DLP integrates via standard ICAP with most enterprise web proxies and SMTP gateways. Endpoint DLP and Discovery DLP are infrastructure-independent. Many UAE deployments run Trellix DLP behind non-Trellix network infrastructure successfully.",
      },
      {
        question: "What is the typical Trellix DLP deployment lead time in the UAE?",
        answer:
          "Standard enterprise deployments run two to four months for full multi-channel coverage. Endpoint-only or Network-only deployments are faster (six to ten weeks). Customers with existing ePO benefit from accelerated deployment because the management infrastructure is already in place.",
      },
    ],
    whatIs: {
      eyebrow: "What is Trellix Data Loss Prevention",
      titlePrefix: "Mature enterprise DLP under the ",
      titleHighlight: "Trellix XDR ecosystem",
      bodyParagraphs: [
        "Trellix DLP covers endpoint, network, and discovery channels with one unified policy authored in Trellix ePolicy Orchestrator (ePO). Endpoint DLP enforces on Windows, macOS, and Linux; Network DLP inspects outbound traffic at the gateway; Discovery DLP scans file shares, SharePoint, and other repositories for sensitive content at rest.",
        "Content classification supports regex, dictionaries, file fingerprints, and machine-learning classifiers, with a pre-built template library covering global and regional compliance frameworks. Trellix Helix XDR correlates DLP events with endpoint, identity, and network telemetry.",
      ],
      feature: {
        titleLine1: "Trellix ePO + XDR",
        titleLine2: "Architecture",
        body: "DLP policy authored in Trellix ePO and enforced across endpoint, network, and discovery channels. DLP events correlate in Trellix Helix XDR with the wider Trellix portfolio.",
      },
      capabilities: [
        "Trellix ePolicy Orchestrator (ePO): two-decade-mature DLP management",
        "Endpoint DLP on Windows, macOS, and Linux with peripheral control",
        "Network DLP via Trellix Network Security Platform or ICAP integration",
        "Discovery DLP: scan file shares, SharePoint, OneDrive at rest",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Endpoint, network, or cloud-native: your call.",
      intro: "Artiflex deploys Trellix Data Loss Prevention in whichever channel model fits your data-movement and regulatory requirements.",
      options: [
        { icon: "hardware", title: "Endpoint DLP", body: "Agent-based DLP enforcement on Windows, macOS, and Linux, covering clipboard, peripherals, removable media, and application-level data movement." },
        { icon: "virtual", title: "Network / Gateway DLP", body: "Outbound traffic inspection at the network perimeter or web proxy, with TLS inspection where the vendor supports it." },
        { icon: "cloud", title: "Cloud / SaaS DLP", body: "API-mode or inline DLP for Microsoft 365, Google Workspace, Salesforce, Box, and other sanctioned SaaS apps." },
      ],
    },
  },

  "sophos-dlp": {
    slug: "sophos-dlp",
    name: "Sophos Data Protection",
    logo: "/logos/sophos.svg",
    tagline: "Endpoint DLP integrated with Intercept X, Sophos Email, and Sophos Central",
    bestFor: "Best Overall Value (Recommended)",
    description:
      "Sophos Data Protection brings DLP policy authoring, monitoring, and enforcement into the same Sophos Central console that already manages your endpoint, firewall, email, and MDR. Endpoint DLP runs as part of Intercept X, so there is no separate agent to deploy, no extra licence to track, and policy follows the user across managed devices automatically. For UAE mid-market customers already standardised on Sophos, adding Data Protection is the lowest-friction path to a real DLP capability.",
    keyStats: [],
    whyWinsIntro: {
      label: "Sophos Data Protection Highlights",
      title: "The right DLP for organisations that prioritise operational simplicity",
      description:
        "Enterprise DLP platforms (Symantec, Forcepoint) deliver deeper content fingerprinting and broader policy libraries but require a dedicated DLP function to operate. Sophos Data Protection trades some depth for radical simplicity: one console, one agent, one analyst workflow. For UAE mid-market customers and lean IT teams, this is consistently the right starting point.",
      stats: [
        { value: "1 agent", label: "Intercept X carries DLP, EPP, EDR, and device control on every endpoint", tone: "emerald" },
        { value: "1 console", label: "Sophos Central manages DLP alongside firewall, email, and endpoint", tone: "violet" },
        { value: "MDR", label: "Sophos MDR can triage DLP incidents 24x7 alongside the rest of the estate", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Endpoint DLP in Intercept X",
        icon: "shield",
        tone: "emerald",
        title: "No separate DLP agent on managed devices",
        desc: "DLP runs as part of Intercept X, so deployment is a policy push, not an agent rollout. The performance footprint is invisible to end users and the operational learning curve is shallow.",
      },
      {
        tag: "Pre-built Content Control Lists",
        icon: "list",
        tone: "violet",
        title: "PII, PCI, PHI, and regional templates ready to use",
        desc: "Sophos ships a library of pre-built Content Control Lists covering most common regulatory frameworks (PCI, HIPAA, GDPR, UAE PDPL). Custom CCLs with regex, dictionaries, and document fingerprints are straightforward to author.",
      },
      {
        tag: "Peripheral and device control",
        icon: "monitor",
        tone: "sky",
        title: "USB, Bluetooth, printers, removable media in one policy",
        desc: "Device control and DLP share the same policy framework. You can block USB writes that contain PII, allow them with justification, or audit silently, all with the same authoring model.",
      },
      {
        tag: "Synchronized Security",
        icon: "heartbeat",
        tone: "amber",
        title: "DLP signals correlate with endpoint and firewall",
        desc: "A user attempting to exfiltrate PII via web upload while the endpoint is showing compromise indicators produces one correlated incident in Sophos Central, not two disjoint alerts. Reduces analyst load materially.",
      },
      {
        tag: "Sophos Central Data Lake",
        icon: "server",
        tone: "rose",
        title: "DLP events alongside endpoint and firewall telemetry",
        desc: "Every DLP event lands in the Data Lake with 90-day retention by default, queryable via the same XDR search interface as endpoint and firewall events. No separate DLP reporting tool required.",
      },
      {
        tag: "Sophos MDR coverage",
        icon: "users",
        tone: "slate",
        title: "24x7 analyst triage of DLP alerts",
        desc: "Sophos MDR analysts can include DLP incidents in their watch and response scope, eliminating the need to staff a dedicated DLP analyst function for mid-market UAE customers.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "UAE mid-market customers already standardised on Sophos Endpoint or Sophos Central",
      "Lean IT teams wanting DLP without staffing a dedicated DLP function",
      "Organisations needing peripheral and removable-device control alongside DLP",
      "Compliance-driven SMBs and mid-market (PCI, HIPAA, UAE PDPL) with pragmatic DLP scope",
      "Customers wanting Sophos MDR to triage DLP incidents 24x7",
      "Multi-site retail, clinics, and professional services with distributed endpoints",
      "Buyers who prefer one-vendor consolidation over best-of-breed enterprise DLP",
    ],
    products: [
      { model: "Intercept X Advanced", segment: "SMB", role: "Endpoint DLP and peripheral control bundled in" },
      { model: "Intercept X Advanced with XDR", segment: "Mid-market / SOC", role: "+ Data Lake search and XDR cross-product hunt" },
      { model: "Intercept X with MDR", segment: "Lean teams", role: "+ Sophos MDR including DLP triage" },
      { model: "Sophos Email + Encryption", segment: "Email-heavy", role: "Outbound email DLP and content-based encryption" },
      { model: "Sophos Central Suite", segment: "Strategic", role: "Endpoint, email, firewall, DLP under one tenant" },
      { model: "Custom CCLs and fingerprints", segment: "Compliance-heavy", role: "Document fingerprinting and custom regex for specific data types" },
    ],
    whyArtiflex:
      "Artiflex IT is a Sophos Platinum Partner, the highest tier in Sophos's UAE channel. We deliver Sophos Data Protection end-to-end across UAE, Oman, and Saudi Arabia: data discovery, policy authoring, CCL customisation for UAE PDPL and sector frameworks, peripheral-control rollout, MDR onboarding, and ongoing tuning. Our team has implemented DLP for banking, healthcare, and government customers across the region.",
    faqs: [
      {
        question: "How does Sophos DLP compare to Symantec or Forcepoint?",
        answer:
          "Enterprise DLP platforms (Symantec, Forcepoint) deliver deeper document fingerprinting, broader pre-built policy libraries, and more sophisticated incident workflows. Sophos trades some depth for radical operational simplicity. For UAE mid-market customers without a dedicated DLP function, Sophos is consistently the right starting point; enterprise DLP makes more sense at 5,000+ endpoints with a dedicated DLP analyst team.",
      },
      {
        question: "Do I need a separate licence for Sophos DLP?",
        answer:
          "Endpoint DLP and peripheral control are bundled into Intercept X Advanced and above, with no separate DLP licence. Email DLP is part of Sophos Email. The integrated licensing model is one of the biggest operational advantages versus standalone enterprise DLP.",
      },
      {
        question: "Can Sophos DLP cover Microsoft 365 and Google Workspace?",
        answer:
          "For SaaS data (M365, Google Workspace) Sophos DLP focuses on the endpoint and email channels rather than direct API inspection of SaaS content. Customers needing deep SaaS DLP across OneDrive, SharePoint, and Google Drive typically layer Microsoft Purview or Netskope alongside Sophos for the SaaS-native side.",
      },
      {
        question: "What is the typical Sophos DLP deployment lead time in the UAE?",
        answer:
          "Standard mid-market deployments run two to four weeks: data discovery, CCL selection and tuning, peripheral-control rollout, and pilot. Customers already on Intercept X often go live faster because there is no agent rollout. We hold demo Sophos Central tenants for proof of concept.",
      },
    ],
    whatIs: {
      eyebrow: "What is Sophos Data Protection",
      titlePrefix: "DLP that lives where your ",
      titleHighlight: "endpoint security already lives",
      bodyParagraphs: [
        "Sophos Endpoint DLP is built into the Intercept X agent. It inspects file content, clipboard, and peripheral activity (USB, Bluetooth, printers, removable drives) against pre-built and custom content rules, with actions ranging from log-only through block-with-justification to full prevention. Pre-built Content Control Lists cover PII, PCI, PHI, and many regional regulatory templates out of the box.",
        "All events flow into the Sophos Central Data Lake, where they are correlated with endpoint, firewall, and email signals. Sophos MDR can take over DLP triage and response 24x7 alongside the rest of the Sophos estate, eliminating a separate DLP analyst function for lean UAE IT teams.",
      ],
      feature: {
        titleLine1: "Synchronized DLP",
        titleLine2: "Architecture",
        body: "DLP runs inside the Intercept X agent and reports into Sophos Central. Events correlate with endpoint, firewall, and email telemetry, and can be triaged by Sophos MDR analysts.",
      },
      capabilities: [
        "Endpoint DLP built into Intercept X, no separate agent install",
        "Pre-built CCLs for PII, PCI, PHI, and regional templates",
        "Peripheral and removable-device control bundled in the same policy",
        "Sophos MDR-eligible: 24x7 DLP triage by Sophos analysts",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Endpoint, network, or cloud-native: your call.",
      intro: "Artiflex deploys Sophos Data Protection in whichever channel model fits your data-movement and regulatory requirements.",
      options: [
        { icon: "hardware", title: "Endpoint DLP", body: "Agent-based DLP enforcement on Windows, macOS, and Linux, covering clipboard, peripherals, removable media, and application-level data movement." },
        { icon: "virtual", title: "Network / Gateway DLP", body: "Outbound traffic inspection at the network perimeter or web proxy, with TLS inspection where the vendor supports it." },
        { icon: "cloud", title: "Cloud / SaaS DLP", body: "API-mode or inline DLP for Microsoft 365, Google Workspace, Salesforce, Box, and other sanctioned SaaS apps." },
      ],
    },
  },

  "netskope-dlp": {
    slug: "netskope-dlp",
    name: "Netskope Data Security",
    logo: "/logos/Netscope.png",
    tagline: "SASE-native DLP for cloud, SaaS, web, and private apps with ML-driven classification",
    bestFor: "Specialist Choice: SASE-Native DLP",
    description:
      "Netskope built one of the first cloud-native SASE platforms, with DLP as a first-class capability across SaaS, web, IaaS, and private application traffic. The platform inspects content inline as it moves to and from the cloud, with ML-driven classifiers, OCR, and over 3,000 pre-built data identifiers. For UAE customers building a cloud-first or SASE-first architecture, Netskope is a leading specialist for the SaaS and web DLP scope. For pure on-prem endpoint or network DLP at depth, traditional DLP platforms typically lead.",
    keyStats: [],
    whyWinsIntro: {
      label: "Netskope Data Security Highlights",
      title: "The right DLP layer for cloud-first and SASE-led UAE estates",
      description:
        "Netskope is most compelling when SASE consolidation (SWG, CASB, ZTNA, DLP) is a strategic direction and SaaS / web exposure is the primary DLP loss vector. For pure on-prem endpoint or network DLP at depth, traditional DLP platforms (Symantec, Forcepoint, Trellix) typically deliver more channel coverage. Most UAE enterprises run Netskope alongside an on-prem endpoint DLP rather than as a full replacement.",
      stats: [
        { value: "3,000+", label: "pre-built data identifiers covering global and regional frameworks", tone: "emerald" },
        { value: "SASE", label: "platform combining SWG, CASB, ZTNA, and DLP with one console and agent", tone: "violet" },
        { value: "Inline", label: "DLP enforcement on cloud, SaaS, web, and private app traffic", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Inline cloud DLP",
        icon: "shield",
        tone: "emerald",
        title: "Real-time enforcement as traffic moves to cloud",
        desc: "Every cloud, web, SaaS, and private-app session passes through Netskope inline, with DLP policy applied before content leaves the organisation. No reliance on post-delivery clawback or after-the-fact discovery.",
      },
      {
        tag: "API-mode SaaS coverage",
        icon: "globe",
        tone: "violet",
        title: "Sanctioned-app deep inspection at scale",
        desc: "API-mode connectors for Microsoft 365, Google Workspace, Salesforce, Box, ServiceNow, Slack, and dozens of other sanctioned SaaS apps inspect content at rest, retroactively remediate violations, and provide governance reporting.",
      },
      {
        tag: "Cloud Confidence Index",
        icon: "barChart",
        tone: "sky",
        title: "Risk score for every SaaS app",
        desc: "Netskope's Cloud Confidence Index scores SaaS apps for enterprise readiness across dozens of criteria, helping organisations identify shadow IT and apply differentiated DLP policy by app risk.",
      },
      {
        tag: "ML and OCR classifiers",
        icon: "eye",
        tone: "amber",
        title: "Detect data in screenshots and scanned documents",
        desc: "ML classifiers identify sensitive content beyond regex precision (medical records, legal documents, source code). OCR catches data inside images, screenshots, and scanned PDFs that text-based DLP misses.",
      },
      {
        tag: "SASE consolidation",
        icon: "layers",
        tone: "rose",
        title: "One agent, one console for SWG, CASB, ZTNA, DLP",
        desc: "Netskope consolidates Secure Web Gateway, CASB, ZTNA, and DLP onto one cloud-delivered SASE platform with one endpoint client and one management console. Operationally powerful for cloud-first UAE estates.",
      },
      {
        tag: "UEBA integration",
        icon: "activity",
        tone: "slate",
        title: "User and entity behaviour analytics for risk scoring",
        desc: "Netskope UEBA scores user risk based on data-access patterns, anomalous downloads, and policy violations. DLP enforcement can scale with risk score, similar to Forcepoint Risk-Adaptive Protection.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "Cloud-first UAE enterprises with SaaS, IaaS, and web as primary data-movement channels",
      "Organisations consolidating SWG, CASB, ZTNA, and DLP onto one SASE platform",
      "Customers needing deep SaaS DLP coverage across many sanctioned apps",
      "Mid-market and enterprise estates with significant shadow-IT and SaaS-sprawl exposure",
      "Distributed workforces needing off-network DLP enforcement via the SASE client",
      "Buyers ready to make a strategic SASE platform commitment with Netskope as the vendor",
      "Compliance-driven environments needing OCR and ML classification for unstructured content",
    ],
    products: [
      { model: "Netskope Next Gen SWG", segment: "Web-first", role: "Secure Web Gateway with inline DLP for web traffic" },
      { model: "Netskope CASB", segment: "SaaS-first", role: "CASB with inline plus API-mode DLP for sanctioned SaaS" },
      { model: "Netskope Private Access", segment: "ZTNA", role: "Zero Trust Network Access with DLP for private apps" },
      { model: "Netskope Data Security", segment: "DLP-focused", role: "DLP across SaaS, web, IaaS, and private apps" },
      { model: "Netskope Intelligent SSE", segment: "SASE consolidation", role: "SWG + CASB + ZTNA + DLP on one platform" },
      { model: "Netskope ONE platform", segment: "Strategic", role: "Full SASE with networking, security, and DLP under one licence" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Netskope Data Security as a SASE-native DLP layer for cloud-first UAE customers. Our team has hands-on experience designing Intelligent SSE rollouts, API-mode connector deployments for sanctioned SaaS, ML classifier training, and shadow-IT discovery via Cloud Confidence Index. We provide vendor-neutral assessment to determine when Forcepoint ONE, Symantec, or Microsoft Purview would deliver better outcomes.",
    faqs: [
      {
        question: "How does Netskope DLP compare to Forcepoint ONE or Microsoft Purview?",
        answer:
          "Netskope and Forcepoint ONE are direct competitors in SASE-native DLP, with Netskope typically leading on cloud and SaaS depth while Forcepoint leads on Risk-Adaptive Protection and pre-built classification breadth. Microsoft Purview wins for M365-centric estates wanting native integration. We size all three for shortlist customers.",
      },
      {
        question: "Should Netskope replace my existing endpoint DLP?",
        answer:
          "Typically no. Netskope's endpoint client provides off-network DLP enforcement for web and SaaS traffic but does not replace a full host DLP agent (peripheral control, clipboard, application-level enforcement). Most UAE customers run Netskope for cloud and web scope and keep an endpoint DLP for on-device coverage.",
      },
      {
        question: "Does Netskope cover IaaS workloads (AWS, Azure, GCP)?",
        answer:
          "Yes. Netskope provides CSPM (Cloud Security Posture Management) and inline DLP for IaaS traffic, with API integration for AWS, Azure, GCP, and OCI. Useful for regulated UAE customers with significant cloud-native workloads.",
      },
      {
        question: "What is the typical Netskope deployment lead time in the UAE?",
        answer:
          "Standard mid-market deployments run six to twelve weeks: SASE design, SWG and CASB rollout, API connector onboarding for sanctioned SaaS, ML classifier training, and pilot. Full Intelligent SSE deployments including ZTNA typically run three to six months.",
      },
    ],
    whatIs: {
      eyebrow: "What is Netskope Data Security",
      titlePrefix: "DLP designed for cloud and ",
      titleHighlight: "SaaS from day one",
      bodyParagraphs: [
        "Netskope Data Security applies DLP policy inline as users access SaaS apps, web destinations, IaaS workloads, and private applications via the Netskope SASE platform. Content classification includes regex, dictionaries, fingerprinting, OCR, machine-learning classifiers, and over 3,000 pre-built data identifiers covering global and regional frameworks.",
        "The platform extends to API-mode protection for sanctioned SaaS apps (Microsoft 365, Google Workspace, Salesforce, Box, Slack, and many others), and includes an endpoint client for off-network DLP enforcement. For UAE customers consolidating SWG, CASB, ZTNA, and DLP onto one SASE platform, Netskope is consistently shortlisted.",
      ],
      feature: {
        titleLine1: "Intelligent SSE",
        titleLine2: "Architecture",
        body: "Inline traffic inspection for SaaS, web, IaaS, and private apps, with DLP as a first-class layer. API-mode connectors for sanctioned SaaS plus an endpoint client for off-network coverage.",
      },
      capabilities: [
        "3,000+ pre-built data identifiers covering global frameworks",
        "Inline DLP for any cloud or web traffic on the SASE platform",
        "API-mode connectors for sanctioned SaaS (M365, Workspace, Salesforce, Box, Slack, others)",
        "OCR and image classifiers for content inside screenshots and scanned documents",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Endpoint, network, or cloud-native: your call.",
      intro: "Artiflex deploys Netskope Data Security in whichever channel model fits your data-movement and regulatory requirements.",
      options: [
        { icon: "hardware", title: "Endpoint DLP", body: "Agent-based DLP enforcement on Windows, macOS, and Linux, covering clipboard, peripherals, removable media, and application-level data movement." },
        { icon: "virtual", title: "Network / Gateway DLP", body: "Outbound traffic inspection at the network perimeter or web proxy, with TLS inspection where the vendor supports it." },
        { icon: "cloud", title: "Cloud / SaaS DLP", body: "API-mode or inline DLP for Microsoft 365, Google Workspace, Salesforce, Box, and other sanctioned SaaS apps." },
      ],
    },
  },
};
