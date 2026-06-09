export type EmailVendor = {
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

export const emailVendors: Record<string, EmailVendor> = {
  "check-point-harmony-email": {
    slug: "check-point-harmony-email",
    name: "Check Point Harmony Email & Collaboration",
    logo: "/logos/Check-Point-2024-logo-color.svg",
    tagline: "Inline API protection for Microsoft 365 and Google Workspace, powered by ThreatCloud AI",
    bestFor: "Best for API-Based M365 Protection (Recommended)",
    description:
      "Harmony Email & Collaboration (the former Avanan platform, now part of Check Point) was the first email security to deploy via API in an inline-block mode rather than the post-delivery clawback used by most competitors. ThreatCloud AI provides the same threat intelligence that powers Check Point Quantum firewalls. For UAE enterprises already running Check Point Quantum and Harmony Endpoint, Harmony Email is the natural pillar to complete a unified Infinity estate.",
    keyStats: [],
    whyWinsIntro: {
      label: "Check Point Harmony Email & Collaboration Highlights",
      title: "Prevention-first email security. Deployed in 30 seconds. Protecting every direction.",
      description:
        "Harmony Email & Collaboration (formerly Avanan) combines API-based inline protection with Check Point's ThreatCloud AI to stop phishing, malware, BEC, and account takeover before they reach the inbox, across email, Teams, Slack, SharePoint, and OneDrive. Named a Leader in the 2025 Gartner Magic Quadrant for Email Security.",
      stats: [
        { value: "30 sec", label: "Deployment time: 7 clicks and you are fully protected across email and collaboration", tone: "emerald" },
        { value: "8.8/10", label: "PeerSpot average rating, a top-ranked email security solution", tone: "violet" },
        { value: "68%", label: "Of attacks start with email, per Check Point Research 2025 Security Report", tone: "sky" },
      ],
      outro:
        "Harmony Email's strongest differentiator is its patented API-based inline architecture, protecting email in real time without requiring MX record changes or mail flow disruption. Deployment that takes competitors days takes Harmony under an hour, making it the fastest path to comprehensive email and collaboration security for Microsoft 365 and Google Workspace environments.",
    },
    strengths: [
      {
        tag: "API-based inline protection",
        icon: "shield",
        tone: "emerald",
        title: "Inspects email inline via API: no MX record changes, no mail flow disruption",
        desc: "Harmony Email & Collaboration holds a patent for its unique API-based inline deployment method. Unlike MX-redirect gateways, it connects directly to Microsoft 365 or Google Workspace via API and inspects mail inline, providing the depth of a gateway with the speed of an API integration. Protected in minutes, not days.",
      },
      {
        tag: "ThreatCloud AI",
        icon: "globe",
        tone: "violet",
        title: "Prevention-first AI powered by Check Point's global threat intelligence",
        desc: "Every email is inspected by ThreatCloud AI, Check Point's global threat intelligence engine processing over 3 billion indicators daily. AI models analyse content, sender reputation, attachments, and contextual signals to block phishing, malware, and zero-day threats before they reach users.",
      },
      {
        tag: "Post-delivery protection",
        icon: "activity",
        tone: "sky",
        title: "Retroactive remediation: remove malicious emails already delivered",
        desc: "If a verdict changes after delivery (because a URL turns malicious post-send, or new threat intelligence emerges) Harmony can automatically remove or quarantine the email retroactively from every affected mailbox. Users are protected even from threats that appeared benign at delivery time.",
      },
      {
        tag: "BEC & impersonation defence",
        icon: "eye",
        tone: "amber",
        title: "AI models detect executive impersonation, domain spoofing, and account takeover",
        desc: "AI and ML models analyse email header anomalies, sender behaviour patterns, and language signals to detect BEC and impersonation attacks, including those with no malicious links or attachments. Account takeover protection identifies anomalous login behaviour and can enforce MFA automatically.",
      },
      {
        tag: "Collaboration protection",
        icon: "users",
        tone: "rose",
        title: "Microsoft Teams, Slack, SharePoint, OneDrive: all protected",
        desc: "Collaboration tools like Teams and Slack are primary attack vectors that many email gateways ignore. Harmony extends the same AI-powered protection to files and messages across every major collaboration platform, quarantining malicious content and notifying users of security events in real time.",
      },
      {
        tag: "DLP & outbound control",
        icon: "lock",
        tone: "slate",
        title: "Data loss prevention for outbound email and file sharing",
        desc: "Harmony inspects outbound email and files for sensitive data, applying DLP policies across email and collaboration platforms. Sensitive files shared on OneDrive or SharePoint are scanned for malware and policy violations, with malicious content quarantined or vaulted automatically.",
      },
      {
        tag: "Sandboxing & URL protection",
        icon: "file",
        tone: "emerald",
        title: "Click-time URL analysis and sandboxing for zero-day attachments",
        desc: "URLs are checked at click time against real-time threat intelligence, blocking links that turn malicious after delivery. Attachments are detonated in a sandbox before reaching users, protecting against zero-day malware and HTML-based phishing files, which account for 61% of malicious attachments.",
      },
      {
        tag: "Unified visibility",
        icon: "monitor",
        tone: "violet",
        title: "Single dashboard: all email and collaboration threats in one view",
        desc: "A centralised dashboard gives security admins real-time visibility across all protected platforms, showing email profiles, attack types, AI detection indicators, and quarantine status. Investigations are clear and fast, with AI indicators explaining exactly why each threat was blocked.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "Microsoft 365 and Google Workspace customers wanting inline-block API protection",
      "Enterprises already running Check Point Quantum, Harmony Endpoint, or Infinity Portal",
      "Banks and regulated industries needing top-tier ThreatCloud AI prevention",
      "Organizations protecting Teams, Slack, OneDrive, and SharePoint as primary collaboration surfaces",
      "Customers prioritizing pre-delivery blocking over post-delivery clawback",
      "Multi-site UAE enterprises consolidating to Check Point Infinity strategically",
      "Buyers wanting BEC, vendor email compromise, and account takeover in one platform",
    ],
    products: [
      { model: "Harmony Email Essentials", segment: "SMB", role: "Inline API anti-phishing, anti-malware" },
      { model: "Harmony Email Advanced", segment: "Mid-market", role: "+ DLP, BEC and impersonation, anti-account-takeover" },
      { model: "Harmony Email Complete", segment: "Enterprise", role: "+ Collaboration app protection (Teams, Slack, Drive, OneDrive)" },
      { model: "Harmony Email Elite", segment: "Enterprise SOC", role: "+ Custom rule authoring, advanced threat intelligence" },
      { model: "Harmony Email + Endpoint", segment: "Bundle", role: "Email and endpoint under one Harmony license" },
      { model: "Infinity Total Protection", segment: "Strategic", role: "Email + Endpoint + Quantum + CloudGuard under Infinity license" },
    ],
    whyArtiflex:
      "Artiflex IT is a Check Point Certified Partner serving the UAE, Oman, and Saudi Arabia. Our CCSA and CCSE engineers deliver Harmony Email end-to-end: M365 and Google Workspace tenant integration, inline policy tuning, ThreatCloud AI alignment with Quantum firewalls, collaboration app rollout (Teams, Slack, OneDrive, Drive), and Infinity Portal consolidation for customers building a strategic Check Point estate.",
    faqs: [
      {
        question: "How does Harmony Email differ from Sophos Email or Proofpoint?",
        answer:
          "Harmony Email's key differentiator is inline-block authority via the M365/Workspace API, eliminating the post-delivery dwell time competitors leave open. Sophos Email wins on Synchronized Security with firewall and endpoint; Proofpoint wins on enterprise-scale BEC telemetry. Choose Harmony for Check Point estates and pure cloud email.",
      },
      {
        question: "Is Harmony Email cloud-only or can it work with on-prem Exchange?",
        answer:
          "Harmony Email is API-native for Microsoft 365 and Google Workspace. For on-prem Exchange or hybrid customers, traditional MX-mode gateways (Sophos Email, Proofpoint, Mimecast) typically fit better. We assess the right pattern based on your mail routing topology.",
      },
      {
        question: "Does Harmony Email cover Microsoft Teams and Slack messages?",
        answer:
          "Yes. Harmony Email inspects messages, links, and attachments in Teams, Slack, OneDrive, SharePoint, Google Drive, and Box, applying the same ThreatCloud AI engines used for email. This collaboration coverage is a meaningful differentiator vs. email-only competitors.",
      },
      {
        question: "What is the typical Harmony Email deployment lead time in the UAE?",
        answer:
          "API-mode deployments are fast: tenant authorisation, policy tuning, and pilot can complete in one to two weeks. Multi-tenant Infinity Portal rollouts with full collaboration coverage typically run three to six weeks. We hold demo tenants for proof of concept.",
      },
    ],
    whatIs: {
      eyebrow: "What is Check Point Harmony Email & Collaboration",
      titlePrefix: "Inline API protection that blocks ",
      titleHighlight: "before users see the email",
      bodyParagraphs: [
        "Most API-based email security delivers the message first, then claws back if later intelligence reveals a problem. Harmony Email scans inline via the M365 and Google Workspace APIs and can block before the message ever reaches the inbox, eliminating the dwell-time window competitors leave open. ThreatCloud AI applies the same 60+ engines used by Check Point Quantum to every message.",
        "Harmony Email extends to Microsoft Teams, Slack, OneDrive, SharePoint, Google Drive, and Box, providing consistent inline protection across the modern collaboration surface, not just SMTP email.",
      ],
      feature: {
        titleLine1: "Inline API +",
        titleLine2: "ThreatCloud AI Architecture",
        body: "API integration with M365, Google Workspace, and collaboration apps with inline-block authority. ThreatCloud AI applies the same 60+ engines used across Check Point Infinity.",
      },
      capabilities: [
        "Inline-block authority: stop phishing before it reaches the inbox",
        "ThreatCloud AI: same engines as Check Point Quantum firewalls",
        "Coverage across Teams, Slack, OneDrive, SharePoint, Google Drive, Box",
        "Infinity Portal unified management with Quantum, Harmony Endpoint, CloudGuard",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Gateway, API, or hybrid: your call.",
      intro: "Artiflex deploys Check Point Harmony Email & Collaboration in whichever model fits your mail flow and regulatory requirements.",
      options: [
        { icon: "hardware", title: "MX Gateway", body: "Traditional pre-delivery scanning via MX record change. Strongest pre-delivery enforcement, fits hybrid Exchange and complex mail flow." },
        { icon: "cloud", title: "API Mode", body: "API integration with Microsoft 365 or Google Workspace. Fast to deploy (days), no MX change, ideal for cloud-only mail estates." },
        { icon: "virtual", title: "Hybrid", body: "Gateway plus API together: pre-delivery blocking and post-delivery clawback in one solution. Recommended for most UAE enterprise estates." },
      ],
    },
  },

  "sophos-email": {
    slug: "sophos-email",
    name: "Sophos Email Security",
    logo: "/logos/sophos.svg",
    tagline: "AI-driven phishing and BEC protection with Synchronized Security",
    bestFor: "Best Overall Value (Recommended)",
    description:
      "Sophos Central Email combines mailflow gateway scanning with API-based post-delivery protection for Microsoft 365 and Google Workspace. Sophos AI classifies impersonation, BEC, and phishing attempts at delivery and after delivery, while Synchronized Security automatically isolates endpoints that interact with a malicious link or attachment. For UAE mid-market customers already running Sophos Firewall or Intercept X, adding Sophos Email is the natural next step toward a unified Sophos Central estate.",
    keyStats: [],
    whyWinsIntro: {
      label: "Sophos Email Security Highlights",
      title: "The only MDR-optimised email security. 20+ AI models. Zero false positives.",
      description:
        "Sophos Email is the only email security solution purpose-built to integrate natively with Sophos MDR and XDR, giving security teams email telemetry alongside endpoint, firewall, and identity data in a single investigation workflow. Named an Overall, Product, Innovation, and Market leader in KuppingerCole's 2025 Leadership Compass for Email Security, with a perfect malware catch rate and zero false positives in Q2 2025 VBSpam testing.",
      stats: [
        { value: "20+", label: "AI and ML models including NLP, detecting phishing, BEC, and impersonation", tone: "emerald" },
        { value: "100%", label: "Malware catch rate with zero false positives in Q2 2025 VBSpam independent test", tone: "violet" },
        { value: "90%", label: "BEC detection accuracy with near-zero false positives using deep learning NLP models", tone: "sky" },
      ],
      outro:
        "Sophos Email's defining advantage for Sophos-invested organisations: it is the only email security platform natively integrated with an MDR service. Email threat data flows directly into Sophos MDR, enabling 24/7 expert threat hunters to investigate and respond to email-based incidents with the same precision they apply to endpoint and network threats.",
    },
    strengths: [
      {
        tag: "Deep Learning AI + NLP",
        icon: "shield",
        tone: "emerald",
        title: "Natural language processing detects BEC before it reaches any inbox",
        desc: "Sophos Email uses proprietary NLP models trained on billions of email inputs to analyse the text, tone, context, and intent of every message, detecting hand-crafted BEC attacks, executive impersonation, and spear phishing that carry no malicious links or attachments. Achieves 90% BEC detection accuracy with near-zero false positives.",
      },
      {
        tag: "MDR-optimised",
        icon: "users",
        tone: "violet",
        title: "The only email security natively integrated with Sophos MDR and XDR",
        desc: "Sophos Email is the only solution built to feed email telemetry (including account compromise attempts, data control violations, and post-delivery events) directly into Sophos MDR and XDR. Security teams investigate and respond to email threats alongside endpoint and firewall incidents in a single unified workflow.",
      },
      {
        tag: "Synchronized Security",
        icon: "heartbeat",
        tone: "sky",
        title: "Email plus endpoint communicate: compromised devices blocked automatically",
        desc: "Sophos Synchronized Security links email and endpoint security. If Sophos Email detects five or more virus emails sent in ten minutes from a mailbox, the mailbox is automatically blocked while Sophos Endpoint performs a scan and removes the infection, preventing outbound spam and virus propagation from compromised devices.",
      },
      {
        tag: "Phish Threat",
        icon: "message",
        tone: "amber",
        title: "Built-in phishing simulation and security awareness training",
        desc: "Sophos Phish Threat delivers realistic phishing simulations and interactive training modules directly within Sophos Email, transforming employees from the most exploited vulnerability into an active layer of defence. Comprehensive reporting makes it easy to demonstrate compliance and measure programme effectiveness.",
      },
      {
        tag: "Time-of-click URL protection",
        icon: "globe",
        tone: "rose",
        title: "URLs checked at delivery and again at click time",
        desc: "Sophos Email checks URLs at delivery and re-evaluates them at the moment a user clicks. This catches stealthy delayed-activation attacks where attackers host malicious content that only becomes active after the email is delivered, a technique that bypasses traditional gateway protection entirely.",
      },
      {
        tag: "DMARC Manager",
        icon: "lock",
        tone: "slate",
        title: "Automated DMARC compliance: protect your brand from domain spoofing",
        desc: "Sophos DMARC Manager continuously monitors, analyses, and helps enforce DMARC policies across all sending domains. Intuitive dashboards and automated reporting simplify DMARC compliance, protecting brand reputation by preventing direct domain spoofing and impersonation attacks that use your legitimate domain.",
      },
      {
        tag: "Email Monitoring System (EMS)",
        icon: "eye",
        tone: "emerald",
        title: "Sensor that detects threats missed by your existing email security stack",
        desc: "The Sophos Email Monitoring System is a lightweight sensor that complements existing email security products, detecting threats that other solutions miss and feeding that intelligence into Sophos MDR and XDR. It can be deployed alongside Microsoft Defender, Proofpoint, or any other existing solution without replacement.",
      },
      {
        tag: "Sophos Central integration",
        icon: "monitor",
        tone: "violet",
        title: "Managed alongside endpoint, firewall, MDR from a single console",
        desc: "Sophos Email is managed through Sophos Central alongside Sophos Endpoint, Firewall, and MDR. Email security alerts, policy management, and incident response all happen in the same platform, eliminating the separate portals and disconnected workflows that increase response time and operational overhead.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "UAE mid-market companies already running Sophos Firewall, Intercept X, or both",
      "Microsoft 365 and Google Workspace customers wanting API-based post-delivery protection",
      "Lean IT teams that benefit from one Sophos Central console across email and endpoint",
      "Organisations with high BEC and vendor email compromise exposure (finance, healthcare)",
      "Customers wanting the option of Sophos MDR to take over email triage 24x7",
      "Regulated industries needing DKIM, DMARC, and TLS enforcement out of the box",
      "Schools, retail, and distributed branches needing zero-touch deployment via Sophos Central",
    ],
    products: [
      { model: "Sophos Email Standard", segment: "SMB", role: "Mailflow gateway scanning, anti-spam, anti-malware" },
      { model: "Sophos Email Advanced", segment: "Mid-market", role: "+ Sandstorm sandbox, Time-of-Click URL, impersonation analysis" },
      { model: "Sophos Email Mailbox Protection", segment: "M365 / Workspace", role: "API-based post-delivery protection alongside any gateway" },
      { model: "Sophos Email + Phish Threat", segment: "Mid-market", role: "+ Phishing simulation and end-user training campaigns" },
      { model: "Sophos MDR Email", segment: "Lean teams", role: "24x7 Sophos analysts triaging email alerts and incidents" },
      { model: "Sophos Central Email Suite", segment: "Strategic platform", role: "Email plus endpoint plus firewall under one Central tenant" },
    ],
    whyArtiflex:
      "Artiflex IT is a Sophos Platinum Partner, the highest tier in Sophos's UAE channel. We deliver Sophos Email end-to-end across UAE, Oman, and Saudi Arabia: Mailflow versus API-mode design, M365 and Google Workspace tenant integration, DKIM and DMARC alignment, Synchronized Security activation with Sophos Firewall and Intercept X, Phish Threat training campaigns, and MDR onboarding.",
    faqs: [
      {
        question: "How does Sophos Email compare to Proofpoint or Mimecast?",
        answer:
          "Proofpoint typically leads on enterprise BEC and supply-chain telemetry; Mimecast leads on email continuity and archiving depth. Sophos Email is the best fit for UAE mid-market customers who also run Sophos Firewall or Intercept X, because Synchronized Security and Sophos Central operationally consolidate three vendor portals into one.",
      },
      {
        question: "Should I use Mailflow (MX) or API mode?",
        answer:
          "We typically recommend running both: Mailflow for pre-delivery blocking of the worst traffic, and API mode for post-delivery clawback when later intelligence reveals a missed phishing email. For pure Microsoft 365 estates wanting minimum mail-routing change, API-only is also a valid pattern.",
      },
      {
        question: "Does Sophos Email include DMARC enforcement?",
        answer:
          "Yes. DMARC, DKIM, and SPF authentication, alignment, and enforcement are built in, plus inbound DMARC reporting. For organisations needing full outbound DMARC visibility and brand protection at scale, dedicated platforms (Agari, Valimail) can be layered on top.",
      },
      {
        question: "What is the typical Sophos Email deployment lead time in the UAE?",
        answer:
          "Standard mid-market deployments run two to four weeks (MX cutover, M365 API integration, policy tuning, training). API-only deployments can be live in under a week. We hold demo Sophos Central tenants for proof of concept.",
      },
    ],
    whatIs: {
      eyebrow: "What is Sophos Email Security",
      titlePrefix: "Phishing and BEC protection that closes the loop with ",
      titleHighlight: "endpoint and firewall",
      bodyParagraphs: [
        "Sophos Email blocks malicious mail at the gateway with deep learning, sandbox detonation (Sandstorm), Time-of-Click URL rewriting, and impersonation analysis. API-based post-delivery protection scans Microsoft 365 and Google Workspace mailboxes after delivery, removing messages that were re-classified as malicious based on later intelligence.",
        "Everything runs through Sophos Central, the same cloud console that manages Sophos Firewall, Intercept X, Cloud Optix, and Wi-Fi. Synchronized Security closes the gap between email and endpoint automatically: if a user clicks a malicious link, the endpoint is isolated by Sophos Firewall in seconds.",
      ],
      feature: {
        titleLine1: "Synchronized Email",
        titleLine2: "Security Architecture",
        body: "Gateway-mode and API-mode protection share the same Sophos AI engines, with Synchronized Security tying email signals to endpoint and firewall response automatically.",
      },
      capabilities: [
        "Sandstorm: cloud sandbox detonation for unknown attachments and URLs",
        "Time-of-Click URL protection: re-scan URLs at the moment the user clicks",
        "API post-delivery protection: claw back mail re-classified after delivery",
        "Synchronized Security: auto-isolate endpoints that interact with phishing",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Gateway, API, or hybrid: your call.",
      intro: "Artiflex deploys Sophos Email Security in whichever model fits your mail flow and regulatory requirements.",
      options: [
        { icon: "hardware", title: "MX Gateway", body: "Traditional pre-delivery scanning via MX record change. Strongest pre-delivery enforcement, fits hybrid Exchange and complex mail flow." },
        { icon: "cloud", title: "API Mode", body: "API integration with Microsoft 365 or Google Workspace. Fast to deploy (days), no MX change, ideal for cloud-only mail estates." },
        { icon: "virtual", title: "Hybrid", body: "Gateway plus API together: pre-delivery blocking and post-delivery clawback in one solution. Recommended for most UAE enterprise estates." },
      ],
    },
  },

  "proofpoint": {
    slug: "proofpoint",
    name: "Proofpoint Email Protection",
    logo: "/logos/Proofpoint.jpg.svg",
    tagline: "Industry-leading enterprise email security with TAP, CLEAR, and Sigma threat graph",
    bestFor: "Best for Enterprise Email Threat Prevention (Recommended)",
    description:
      "Proofpoint is consistently ranked a Leader in Gartner Email Security Magic Quadrant evaluations, with one of the largest dedicated email threat-research teams in the industry. The Sigma platform correlates telemetry across email, identity, and supplier relationships, surfacing BEC, vendor email compromise, and supply-chain attacks that other vendors miss. For UAE enterprises, banks, and regulated industries that need top-tier enterprise email protection with deep BEC visibility, Proofpoint is the gold standard.",
    keyStats: [],
    whyWinsIntro: {
      label: "Proofpoint Core Email Protection / TAP / Prime Highlights",
      title: "The gold standard for enterprise email. 3 trillion emails analysed. The deepest threat intelligence on the planet.",
      description:
        "Proofpoint protects 87 of the Fortune 100 companies and processes over 3 trillion emails per year, making its Nexus AI threat intelligence engine the most battle-hardened in the industry. Its people-centric approach, powered by the Very Attacked People (VAP) concept, ensures the highest-risk individuals receive the most protection. Named a Leader in the 2025 Gartner Magic Quadrant for Email Security.",
      stats: [
        { value: "87/100", label: "Fortune 100 companies protected: the largest enterprise email security install base", tone: "emerald" },
        { value: "3 trillion", label: "Emails scanned per year powering Nexus AI threat intelligence", tone: "violet" },
        { value: "99.99%", label: "Email threats stopped before becoming compromises with Core Email Protection", tone: "sky" },
      ],
      outro:
        "Proofpoint dominates the Fortune 100 for a reason: the deepest threat intelligence from the largest enterprise deployment base, the most mature TAP sandbox (including a patented predictive sandboxing capability), and a people-centric approach that protects the actual humans attackers target rather than just filtering generic threats. For large, complex enterprises with sophisticated threat profiles, Proofpoint remains the reference standard.",
    },
    strengths: [
      {
        tag: "Nexus AI",
        icon: "globe",
        tone: "emerald",
        title: "The most mature AI threat intelligence engine in email security",
        desc: "Nexus AI is powered by data from over 3 trillion emails analysed annually across Proofpoint's global customer base. It combines language models, relationship graphs, machine learning, and computer vision to stop BEC, account takeovers, QR code phishing, impersonation, and lateral phishing with unmatched accuracy.",
      },
      {
        tag: "Very Attacked People (VAP)",
        icon: "users",
        tone: "violet",
        title: "Identify and protect your highest-risk individuals automatically",
        desc: "Proofpoint's VAP dashboard identifies which employees are most targeted by threat actors, not just by volume of threats, but by sophistication and potential impact. Security teams can apply adaptive controls, targeted training, and additional layers of protection specifically to the individuals attackers are most interested in.",
      },
      {
        tag: "Targeted Attack Protection (TAP)",
        icon: "eye",
        tone: "sky",
        title: "Advanced threat protection: sandbox, URL defence, and attachment analysis",
        desc: "TAP combines static sandbox analysis, dynamic detonation, bare-metal execution, and analyst-assisted analysis for the most sophisticated threats. Predictive sandboxing is a Proofpoint patent, analysing files before delivery to catch zero-days and polymorphic payloads that traditional AV systematically misses. URL rewriting provides click-time protection.",
      },
      {
        tag: "Supplier Threat Protection",
        icon: "shield",
        tone: "amber",
        title: "Detect compromised vendor and supplier accounts: even before they email you",
        desc: "Proofpoint Supplier Threat Protection combines AI/ML behavioural analysis with threat intelligence gathered across its entire ecosystem to detect compromised third-party accounts, even accounts that have not yet sent malicious messages to your organisation. Early warning of supply chain compromise gives you time to respond proactively.",
      },
      {
        tag: "Account Takeover (TAP ATO)",
        icon: "lock",
        tone: "rose",
        title: "AI detects compromised credentials and persistent attacker access",
        desc: "TAP Account Takeover correlates threat intelligence with AI, ML, and behavioural analytics across the entire email attack chain. A simple password reset is not enough: attackers with persistent access to email accounts can manipulate third-party apps. TAP ATO provides automated remediation that removes persistent access, not just credentials.",
      },
      {
        tag: "Proofpoint Prime",
        icon: "layers",
        tone: "slate",
        title: "Unified platform consolidating six security tools into one console",
        desc: "Proofpoint Prime Threat Protection (launched April 2025) consolidates Email Protection, TAP, Adaptive Email Security, TRAP, EFD, and Domain Discover into a single console, ending the fragmented multi-portal experience. Prime is also designed for agentic AI workflows, with native hooks for auto-investigation, abuse mailbox triage, and collaborative forensics.",
      },
      {
        tag: "Email Warning Tags",
        icon: "message",
        tone: "emerald",
        title: "Real-time user coaching: contextual warnings at the point of risk",
        desc: "Proofpoint Email Warning Tags display contextual risk indicators directly within the user's email interface, flagging external senders, suspicious domains, newly registered domains, and DMARC issues. This turns every potentially dangerous email into a micro-training moment that reduces phishing susceptibility over time.",
      },
      {
        tag: "DLP & compliance",
        icon: "file",
        tone: "violet",
        title: "Context-aware data loss prevention across email and cloud platforms",
        desc: "Proofpoint DLP applies context-aware filtering and policy-driven controls to prevent sensitive information leaving the organisation via email or cloud platforms. Insider risk detection identifies unusual data movement patterns, flagging departing employee data exfiltration, accidental external sharing, and policy violations before they become breaches.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "Large enterprises, banks, and regulated industries needing top-tier BEC and supplier compromise visibility",
      "UAE government and semi-government bodies with the highest threat profile",
      "Customers whose buying criteria include independent third-party (Gartner, Forrester) leadership",
      "Mature SOCs that benefit from CLEAR auto-triage and TAP attack-clustering analytics",
      "Organizations with significant supplier and vendor email exposure (manufacturing, retail, healthcare)",
      "Enterprises consolidating email, identity, data, and insider threat onto one Sigma platform",
      "Buyers willing to invest in best-in-class email security with a higher TCO than mid-market alternatives",
    ],
    products: [
      { model: "Email Protection", segment: "Enterprise", role: "MX-mode gateway with anti-spam, anti-malware, DMARC" },
      { model: "Email Protection + TAP", segment: "Enterprise", role: "+ URL and attachment sandboxing, threat intel feed" },
      { model: "TAP with Attack Index", segment: "Enterprise SOC", role: "+ People-risk scoring and very-attacked-people (VAP) reports" },
      { model: "Email Fraud Defense", segment: "Brand-aware", role: "Outbound DMARC, brand protection, look-alike domain detection" },
      { model: "Aegis Threat Protection", segment: "Enterprise", role: "Combined people-centric threat protection across email, cloud, identity" },
      { model: "Sigma Platform Bundle", segment: "Strategic", role: "Email plus DLP plus Insider Threat plus Supplier on one platform" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Proofpoint Email Protection end-to-end for enterprise customers across the UAE, Oman, and Saudi Arabia. Our team has hands-on experience deploying TAP, NexusAI, CLEAR, and Email Fraud Defense for UAE banks, telcos, and government. We provide assessment, MX migration design, DMARC alignment rollout, supplier inventory, and ongoing managed Proofpoint services.",
    faqs: [
      {
        question: "How does Proofpoint compare to Sophos Email or Mimecast?",
        answer:
          "Proofpoint typically leads on enterprise BEC, supplier compromise, and the Sigma platform breadth, with higher TCO. Sophos Email is the better fit for UAE mid-market customers running Sophos elsewhere. Mimecast wins on email continuity and archiving depth. We size all three for shortlist customers.",
      },
      {
        question: "Do I need TAP if I have Email Protection?",
        answer:
          "In practice, yes. Email Protection alone is anti-spam, anti-malware, and DMARC. TAP adds URL rewriting, attachment sandboxing, and the threat-intel feed that catches targeted attacks. Almost all enterprise Proofpoint customers deploy TAP.",
      },
      {
        question: "Is Proofpoint cloud-only?",
        answer:
          "Proofpoint is primarily cloud-delivered (SaaS) for new deployments, with on-premise gateway options for very specific data-residency or air-gap requirements. Most UAE customers deploy the cloud option, which is hosted in Proofpoint's global infrastructure.",
      },
      {
        question: "What is the typical Proofpoint deployment lead time in the UAE?",
        answer:
          "Standard enterprise deployments run six to twelve weeks (MX migration, TAP onboarding, DMARC alignment, user reporter button rollout, CLEAR workflow design). Aegis and Sigma platform rollouts typically run three to six months due to platform integration breadth.",
      },
    ],
    whatIs: {
      eyebrow: "What is Proofpoint Email Protection",
      titlePrefix: "Enterprise email security with deep ",
      titleHighlight: "BEC and supply chain telemetry",
      bodyParagraphs: [
        "Proofpoint Email Protection (the MX-mode gateway) is augmented by Targeted Attack Protection (TAP) for URL and attachment defense, NexusAI for ML-based BEC and impersonation detection, and Closed-Loop Email Analysis and Response (CLEAR) for user-reported phish triage. The Sigma platform unifies email, identity, data, and supplier signals into one threat graph.",
        "Proofpoint Aegis is the newer combined platform combining people-centric threat protection with adaptive controls based on user risk, while Proofpoint Sigma extends data loss prevention and insider threat management onto the same operational model.",
      ],
      feature: {
        titleLine1: "Sigma Threat Graph",
        titleLine2: "Architecture",
        body: "One graph correlates email threat telemetry across Proofpoint's enterprise customer base, with NexusAI models and Supplier Threat Protection providing BEC and vendor compromise visibility.",
      },
      capabilities: [
        "NexusAI: ML for impersonation, BEC, and vendor email compromise",
        "Targeted Attack Protection (TAP): URL and attachment defense with sandboxing",
        "CLEAR: user-reported phish auto-triage with one-click clawback",
        "Sigma platform: email plus identity plus data plus supplier signals correlated",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Gateway, API, or hybrid: your call.",
      intro: "Artiflex deploys Proofpoint Email Protection in whichever model fits your mail flow and regulatory requirements.",
      options: [
        { icon: "hardware", title: "MX Gateway", body: "Traditional pre-delivery scanning via MX record change. Strongest pre-delivery enforcement, fits hybrid Exchange and complex mail flow." },
        { icon: "cloud", title: "API Mode", body: "API integration with Microsoft 365 or Google Workspace. Fast to deploy (days), no MX change, ideal for cloud-only mail estates." },
        { icon: "virtual", title: "Hybrid", body: "Gateway plus API together: pre-delivery blocking and post-delivery clawback in one solution. Recommended for most UAE enterprise estates." },
      ],
    },
  },

  "abnormal-ai": {
    slug: "abnormal-ai",
    name: "Abnormal AI",
    logo: "/logos/Abnormal.png",
    tagline: "Behavioral AI for BEC, vendor email compromise, and account takeover detection",
    bestFor: "Best for Behavioral AI BEC Detection (Recommended)",
    description:
      "Abnormal AI built one of the first email security platforms designed specifically to detect socially engineered attacks (BEC, vendor email compromise, account takeover) using behavioral AI rather than signatures or URL inspection. The platform learns each user's normal communication patterns and flags deviations. Deployed via M365 or Google Workspace API, often as a layer on top of an existing gateway, Abnormal is a strong specialist choice for organizations with heavy BEC exposure.",
    keyStats: [],
    whyWinsIntro: {
      label: "Abnormal AI Behavioural AI Email Security Highlights",
      title: "Superhuman behavioural AI. Detects what no signature or rule can see.",
      description:
        "Abnormal AI was built from the ground up on a single insight: most modern email attacks succeed because they look completely normal. BEC, executive impersonation, vendor email compromise, and account takeover carry no malicious links, no attachments, and no known indicators; they exploit trust. Abnormal's behavioural AI builds a baseline of normal human behaviour for every user and vendor, then detects the subtle deviations that signal an attack. Named a Leader and placed furthest on the Completeness of Vision axis in the 2025 Gartner Magic Quadrant for Email Security.",
      stats: [
        { value: "1 click", label: "API integration via Microsoft 365 Graph API: no MX record changes, no mail routing", tone: "emerald" },
        { value: "30%", label: "Reduction in missed detections after 2025 core model upgrades with 50% more features", tone: "violet" },
        { value: "Leader", label: "Furthest on Completeness of Vision in the 2025 Gartner Magic Quadrant for Email Security", tone: "sky" },
      ],
      outro:
        "Abnormal's defining advantage: it is the only email security platform that completely eliminates rule-writing, threshold-tuning, and policy maintenance. This makes it operationally transformative for security teams of any size, and makes it the most effective solution for detecting payloadless, socially-engineered attacks that signature-based tools cannot see. It is the natural complement to any existing secure email gateway.",
    },
    strengths: [
      {
        tag: "Behavioural AI engine",
        icon: "shield",
        tone: "emerald",
        title: "Builds a baseline of normal for every person, vendor, and relationship",
        desc: "Abnormal analyses thousands of signals (communication history, relationship context, tone, urgency, timing, and intent) to build a unique behavioural baseline for every employee and vendor. When any message deviates from that baseline, even by subtle language shifts or unusual requests, it is flagged as a potential attack before the user ever sees it.",
      },
      {
        tag: "Zero-rules deployment",
        icon: "sliders",
        tone: "violet",
        title: "No rules, no tuning, no policy maintenance, ever",
        desc: "Abnormal requires no rules to be written, no thresholds to be tuned, and no policies to be maintained. The AI learns organisational norms automatically and adapts continuously as communication patterns change. This removes a massive operational burden, and removes the human error that misconfigured rules introduce.",
      },
      {
        tag: "VendorBase supply chain protection",
        icon: "globe",
        tone: "sky",
        title: "Detects compromised vendors using federated behavioural intelligence",
        desc: "Abnormal's VendorBase profiles every vendor relationship, monitoring communication cadence, message content, recipient patterns, and relationship history. When a vendor's behaviour deviates from their established norm (unusual payment requests, new bank details, unfamiliar recipients), Abnormal flags and blocks the message automatically.",
      },
      {
        tag: "Account Takeover Protection",
        icon: "lock",
        tone: "amber",
        title: "Detects and automatically disables compromised accounts",
        desc: "Abnormal continuously monitors internal account behaviour for signs of takeover: unusual sign-ins, session hijacking, sudden internal email bursts, access from unfamiliar locations. When an account is compromised, Abnormal automatically disables it and prevents it from sending malicious messages to internal and external recipients.",
      },
      {
        tag: "Misdirected email prevention",
        icon: "eye",
        tone: "rose",
        title: "Stop accidental data leaks before they leave the organisation",
        desc: "Not all risk comes from external attackers. Abnormal's Misdirected Email Prevention analyses behavioural patterns and identity context to detect when a user is about to send sensitive information to the wrong recipient, alerting them before the mistake can lead to a data breach or compliance violation.",
      },
      {
        tag: "AI Security Mailbox",
        icon: "mail",
        tone: "slate",
        title: "Automated phishing triage: SOC workload eliminated, not reduced",
        desc: "The AI Security Mailbox triages every user-reported phishing email, generates personalised feedback to the reporter, and detects unreported messages from the same campaign across all inboxes, automatically. SOC teams that spent hours on abuse mailbox triage have this work done autonomously.",
      },
      {
        tag: "AI Phishing Coach",
        icon: "message",
        tone: "emerald",
        title: "Converts real-world attacks into targeted just-in-time training",
        desc: "Abnormal's AI Phishing Coach automatically transforms real phishing attacks that targeted your organisation into personalised simulations, delivering them as coaching moments via conversational AI immediately after the attack. This is context-specific training at the exact moment employees are most receptive to it.",
      },
      {
        tag: "Security Posture Management",
        icon: "monitor",
        tone: "violet",
        title: "Surfaces Microsoft 365 misconfigurations and risky third-party apps",
        desc: "Abnormal continuously monitors the Microsoft 365 tenant environment for misconfigurations: dormant admin accounts with excessive permissions, third-party apps with overly broad access, and identity drift. Each risk is prioritised by business impact and presented with step-by-step remediation guidance.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "Banks, finance teams, and CFO offices with heavy BEC and payroll fraud exposure",
      "Organisations with significant supplier relationships and vendor email compromise risk",
      "Customers already running a gateway (Microsoft, Proofpoint, Mimecast, Sophos) needing a BEC layer",
      "High-value-target executives and finance staff needing identity-based protection",
      "UAE enterprises wanting account takeover detection as a primary requirement",
      "Mature SOCs that benefit from cross-customer VendorBase intelligence",
      "Buyers prepared to layer Abnormal on top of an existing gateway, not replace it",
    ],
    products: [
      { model: "Abnormal Inbound Email Security", segment: "All sizes", role: "Behavioral AI for BEC, phishing, malware, supplier compromise" },
      { model: "Account Takeover Protection", segment: "All sizes", role: "Detect compromised mailboxes via behavioral anomalies" },
      { model: "Email Productivity", segment: "Mid-market", role: "Auto-remediation of graymail and reply-all noise" },
      { model: "Abnormal Security Posture", segment: "Enterprise", role: "Misconfiguration and risk surface management for M365" },
      { model: "Abnormal Bundle", segment: "Enterprise", role: "Inbound plus Account Takeover plus Posture on one platform" },
      { model: "Abnormal Managed Services", segment: "Lean teams", role: "Managed triage and tuning of Abnormal detections" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Abnormal AI as a BEC-specialist layer for UAE customers across banking, finance, and enterprise. Our team has experience layering Abnormal alongside Sophos, Proofpoint, Mimecast, and Microsoft gateways, with M365 API tenant integration, VendorBase enrolment, and Account Takeover Protection rollout. We provide vendor-neutral sizing to make the layer-versus-replace call.",
    faqs: [
      {
        question: "Should Abnormal replace my existing gateway or sit alongside it?",
        answer:
          "In most UAE deployments, Abnormal sits alongside an existing gateway as a BEC-specialist layer. The gateway handles bulk anti-spam, anti-malware, and URL/attachment scanning; Abnormal catches the socially engineered attacks the gateway misses. Replacing the gateway entirely is possible but uncommon.",
      },
      {
        question: "How does Abnormal compare to Proofpoint NexusAI or Check Point Harmony Email?",
        answer:
          "Abnormal's defining strength is identity and behavioral modeling at the user level, with cross-customer VendorBase intelligence. Proofpoint NexusAI is broader but typically less identity-deep. Harmony Email's strength is inline-block authority and ThreatCloud AI. We size all three when BEC is the primary buying criterion.",
      },
      {
        question: "Is Abnormal deployment really fast?",
        answer:
          "Yes. API-mode tenant authorisation, learning period, and pilot can complete in one to two weeks because no MX change is required and no mail routing is touched. The learning period (Abnormal building behavioral models) typically takes 7-14 days.",
      },
      {
        question: "What is the typical Abnormal deployment lead time in the UAE?",
        answer:
          "Two to four weeks total: API onboarding (days), learning period (one to two weeks), policy and detection-mode go-live (one week). Account Takeover Protection adds another one to two weeks of tuning.",
      },
    ],
    whatIs: {
      eyebrow: "What is Abnormal AI",
      titlePrefix: "Behavioral AI email security ",
      titleHighlight: "for the post-malware era",
      bodyParagraphs: [
        "Traditional email security finds known-bad URLs, attachments, and signatures. Abnormal takes a different angle: it learns each user's normal email behavior (who they email, who emails them, what they discuss, tone, timing, devices) and flags anomalous messages that suggest BEC, vendor compromise, or account takeover, even when no malicious payload exists.",
        "Deployed via M365 or Google Workspace API alongside an existing gateway (Microsoft, Proofpoint, Mimecast), Abnormal acts as a final behavioral layer catching attacks the gateway misses. Account Takeover Protection extends the model to flag compromised mailboxes (anomalous logins, suspicious mailbox rules).",
      ],
      feature: {
        titleLine1: "Behavioral AI",
        titleLine2: "Identity Graph",
        body: "Abnormal builds an identity and communication graph per organisation, learning normal patterns and flagging deviations indicative of social engineering, even with no malicious content.",
      },
      capabilities: [
        "Identity-based detection: learn each user's normal communication patterns",
        "VendorBase: cross-customer vendor compromise intelligence at scale",
        "Account Takeover Protection: detect compromised mailboxes via login and rule anomalies",
        "API-mode deployment alongside any existing email gateway",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Gateway, API, or hybrid: your call.",
      intro: "Artiflex deploys Abnormal AI in whichever model fits your mail flow and regulatory requirements.",
      options: [
        { icon: "hardware", title: "MX Gateway", body: "Traditional pre-delivery scanning via MX record change. Strongest pre-delivery enforcement, fits hybrid Exchange and complex mail flow." },
        { icon: "cloud", title: "API Mode", body: "API integration with Microsoft 365 or Google Workspace. Fast to deploy (days), no MX change, ideal for cloud-only mail estates." },
        { icon: "virtual", title: "Hybrid", body: "Gateway plus API together: pre-delivery blocking and post-delivery clawback in one solution. Recommended for most UAE enterprise estates." },
      ],
    },
  },

  "barracuda-email-protection": {
    slug: "barracuda-email-protection",
    name: "Barracuda Email Protection",
    logo: "/logos/Barracuda.png",
    tagline: "Multi-layered email security with Sentinel AI and Domain Fraud Protection",
    bestFor: "Best for SMB and Mid-Market Value (Recommended)",
    description:
      "Barracuda has a 20-year heritage in email security, originally as the leading appliance-based email gateway and now as a cloud-delivered Total Email Protection platform. Sentinel AI handles BEC and impersonation, Domain Fraud Protection enforces DMARC, Forensics and Incident Response automates campaign remediation, and Security Awareness Training is built in. For UAE SMB and mid-market customers wanting a credible all-in-one email platform at strong price-performance, Barracuda is a leading shortlist option.",
    keyStats: [],
    whyWinsIntro: {
      label: "Barracuda Email Protection Highlights",
      title: "Protection against all 13 email threat types. The only solution that covers every angle.",
      description:
        "Barracuda Email Protection is the only email security platform that specifically covers all 13 email threat types: from spam and ransomware through to BEC, spear phishing, conversation hijacking, and account takeover. Trusted by over 200,000 organisations worldwide, it combines gateway defence, API-based inbox protection, automated incident response, and Microsoft 365 data protection in a single cost-effective solution. Winner of the SC Trust Award 2025 and Email Security Platform of the Year 2024.",
      stats: [
        { value: "200K+", label: "Organisations worldwide trust Barracuda, from SMB to large enterprise", tone: "emerald" },
        { value: "13 types", label: "Email threat types covered: the only platform to protect against the complete spectrum", tone: "violet" },
        { value: "Minutes", label: "Deployment time: flexible inline, MX, or API integration with complimentary onboarding", tone: "sky" },
      ],
      outro:
        "Barracuda's strongest positioning: comprehensive protection across the complete email threat spectrum at a price point accessible to SMBs and mid-market organisations, without sacrificing enterprise-grade capabilities. The combination of independent Microsoft 365 data backup alongside email security in a single platform is a genuine differentiator for organisations that have experienced or are concerned about ransomware targeting their cloud collaboration environment.",
    },
    strengths: [
      {
        tag: "All 13 threat types",
        icon: "shield",
        tone: "emerald",
        title: "The only platform protecting against the complete email threat spectrum",
        desc: "Barracuda Email Protection explicitly addresses all 13 email threat types: spam, malware, ransomware, phishing, spear phishing, domain impersonation, brand impersonation, business email compromise, lateral phishing, conversation hijacking, account takeover, data exfiltration, and graymail. Most competitors address only 7 to 9 of these categories.",
      },
      {
        tag: "Gateway + API defence",
        icon: "layers",
        tone: "violet",
        title: "Combines gateway filtering with AI-powered inbox protection for full coverage",
        desc: "Barracuda combines traditional gateway defence (filtering before mail reaches inboxes) with an API-based inbox layer that catches threats the gateway misses, including socially engineered attacks from internal compromised accounts that bypass perimeter filters entirely. Both layers share the same AI engine and global threat intelligence.",
      },
      {
        tag: "AI BEC detection",
        icon: "eye",
        tone: "sky",
        title: "Learns your organisation's communication patterns: detects any impersonation from day one",
        desc: "Barracuda's AI engine learns each organisation's unique communication patterns automatically from day one, no manual rules required. It detects executive impersonation, mid- and low-level employee impersonation, spoofed domains, typosquatted domains, and emails sent from free or personal email clients automatically.",
      },
      {
        tag: "Automated incident response",
        icon: "activity",
        tone: "amber",
        title: "Post-delivery remediation: remove threats from every inbox in seconds",
        desc: "When a threat is discovered post-delivery, Barracuda automatically identifies and removes all matching malicious emails from every user's inbox across the organisation simultaneously. Security teams can also use threat hunting tools to search for and remediate previously missed threats across historical email data.",
      },
      {
        tag: "Microsoft 365 data protection",
        icon: "server",
        tone: "rose",
        title: "Backup and recovery for Exchange, OneDrive, SharePoint, and Teams",
        desc: "Barracuda's Premium Plus plan includes full Microsoft 365 data protection, backing up Exchange, OneDrive, SharePoint, Teams, and Entra ID. With ransomware capable of encrypting an entire Microsoft 365 environment in under five minutes, an independent backup that ransomware cannot reach is the most effective recovery mechanism.",
      },
      {
        tag: "Flexible deployment",
        icon: "sliders",
        tone: "slate",
        title: "Inline, MX redirect, or API: deploy in your environment your way, within minutes",
        desc: "Barracuda offers three deployment options: inline without MX record changes, traditional MX redirect for deeper inspection, or API integration for instant deployment. Every organisation gets full protection regardless of their technical constraints, with complimentary onboarding support ensuring optimal configuration from day one.",
      },
      {
        tag: "OneDrive & SharePoint scanning",
        icon: "file",
        tone: "emerald",
        title: "Scan stored files for dormant malware: not just email attachments",
        desc: "Barracuda automatically scans all files stored in OneDrive and SharePoint for sensitive data and malware, catching threats that entered via routes other than email. Dormant malware in cloud storage that evaded initial detection is identified and quarantined before it can be activated or spread laterally.",
      },
      {
        tag: "Account takeover protection",
        icon: "lock",
        tone: "violet",
        title: "Anomalous login detection and compromised account containment",
        desc: "Barracuda detects compromised accounts by tracking suspicious login behaviour: impossible logins, failed sign-in spikes, new device access, and geographic anomalies. When an account takeover is confirmed, the compromised account is automatically contained and all fraud emails sent from it are identified and removed.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "UAE SMB and mid-market customers wanting all-in-one email protection at strong price-performance",
      "Microsoft 365 and Google Workspace estates needing gateway plus API-mode protection",
      "Customers consolidating email security, DMARC, awareness training onto one vendor",
      "Multi-site mid-market operations needing centralised email security with cloud management",
      "Lean security teams that benefit from optional Barracuda XDR managed services",
      "MSPs in the UAE delivering email security to multiple smaller customers",
      "Buyers prioritizing breadth of features per dollar over best-in-class single-feature depth",
    ],
    products: [
      { model: "Email Protection Advanced", segment: "SMB", role: "Gateway plus Impersonation Protection plus Incident Response" },
      { model: "Email Protection Premium", segment: "Mid-market", role: "+ Awareness Training, DMARC, encryption, archive" },
      { model: "Email Protection Premium Plus", segment: "Compliance-heavy", role: "+ Cloud-to-Cloud Backup for M365 plus extended retention" },
      { model: "Email Gateway Defense alone", segment: "Gateway-only", role: "MX-mode gateway with anti-spam, anti-malware, ATP" },
      { model: "Impersonation Protection alone", segment: "API-mode add-on", role: "BEC and impersonation layer on top of any gateway" },
      { model: "Barracuda XDR", segment: "Lean teams", role: "Managed XDR overlay covering email, endpoint, network" },
    ],
    whyArtiflex:
      "Artiflex IT is a Barracuda Partner serving SMB and mid-market customers across the UAE, Oman, and Saudi Arabia. We deliver Barracuda Email Protection end-to-end: M365 and Google Workspace tenant integration, MX migration, Sentinel AI tuning, DMARC enforcement rollout, Awareness Training campaigns, and Barracuda XDR onboarding. Our vendor-neutral assessment will tell you when Sophos, Microsoft, or Proofpoint is a stronger fit; for SMB and mid-market value, Barracuda is consistently competitive.",
    faqs: [
      {
        question: "How does Barracuda compare to Sophos Email or Microsoft Defender for Office 365?",
        answer:
          "Barracuda wins on all-in-one breadth at SMB and mid-market price points (gateway plus API plus DMARC plus IR plus training in one bundle). Sophos Email wins for customers running Sophos elsewhere; MDO wins when M365 E5 is already in place. We size all three for shortlist customers.",
      },
      {
        question: "Do I need both Email Gateway Defense and Impersonation Protection?",
        answer:
          "For most UAE customers, yes. Email Gateway Defense handles bulk pre-delivery filtering (anti-spam, anti-malware, ATP); Impersonation Protection adds the API-mode BEC and account takeover layer. Running both gives full pre and post-delivery coverage.",
      },
      {
        question: "Is Barracuda still appliance-based?",
        answer:
          "Barracuda still offers appliances (Email Security Gateway hardware) for customers with specific requirements, but the strategic direction is cloud-delivered Email Protection. Most new UAE deployments are cloud, with appliances reserved for specific on-prem or data-residency scenarios.",
      },
      {
        question: "What is the typical Barracuda deployment lead time in the UAE?",
        answer:
          "Standard SMB deployments run two to three weeks. Mid-market deployments with full Email Protection Premium plus XDR typically run four to eight weeks. Cloud-only deployments are faster than appliance-based and avoid hardware lead times.",
      },
    ],
    whatIs: {
      eyebrow: "What is Barracuda Email Protection",
      titlePrefix: "All-in-one email security with ",
      titleHighlight: "SMB and mid-market value",
      bodyParagraphs: [
        "Barracuda Email Protection combines Email Gateway Defense (MX-mode anti-spam, anti-malware, ATP sandboxing) with Impersonation Protection (API-mode BEC and account takeover defense), Domain Fraud Protection (DMARC), Incident Response (automated campaign remediation), and Security Awareness Training (phishing simulation) on one platform.",
        "Barracuda XDR extends the same platform into a managed XDR service for customers who want 24x7 monitoring across email, endpoint, and network. For UAE customers prioritizing breadth-of-features-per-dollar at the SMB and mid-market segment, Barracuda is a credible choice.",
      ],
      feature: {
        titleLine1: "Total Email",
        titleLine2: "Protection Architecture",
        body: "Gateway Defense plus Impersonation Protection plus Incident Response plus Awareness Training on one platform, with Barracuda XDR available as a managed overlay.",
      },
      capabilities: [
        "Sentinel AI: ML for BEC and impersonation in API mode",
        "Domain Fraud Protection: DMARC enforcement and brand protection",
        "Incident Response: automated campaign remediation and clawback",
        "Security Awareness Training: phishing simulation included on Premium tier",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Gateway, API, or hybrid: your call.",
      intro: "Artiflex deploys Barracuda Email Protection in whichever model fits your mail flow and regulatory requirements.",
      options: [
        { icon: "hardware", title: "MX Gateway", body: "Traditional pre-delivery scanning via MX record change. Strongest pre-delivery enforcement, fits hybrid Exchange and complex mail flow." },
        { icon: "cloud", title: "API Mode", body: "API integration with Microsoft 365 or Google Workspace. Fast to deploy (days), no MX change, ideal for cloud-only mail estates." },
        { icon: "virtual", title: "Hybrid", body: "Gateway plus API together: pre-delivery blocking and post-delivery clawback in one solution. Recommended for most UAE enterprise estates." },
      ],
    },
  },

  "mimecast": {
    slug: "mimecast",
    name: "Mimecast Email Security",
    logo: "/logos/mimecast.svg",
    tagline: "Email security, continuity, and archiving on one cloud platform with CyberGraph AI",
    bestFor: "Best for Email Resilience and Archiving (Recommended)",
    description:
      "Mimecast has a 20-year heritage in cloud-delivered email security, with a defining strength in email resilience: continuity (keep mail flowing during M365 outages), archiving (10+ year retention and search), and security on one platform. CyberGraph AI adds graph-based BEC and impersonation detection on top of the gateway. For UAE customers prioritizing email continuity and long-term archive alongside security, Mimecast is a leading shortlist option.",
    keyStats: [],
    whyWinsIntro: {
      label: "Mimecast Advanced Email Security / Human Risk Management Highlights",
      title: "20 years of email security expertise. The only platform with built-in continuity, archiving, and awareness training.",
      description:
        "Mimecast is the only email security platform that combines threat protection, email continuity (100% uptime SLA), cloud archiving (up to 99 years retention), DMARC management, and security awareness training in a single unified console, addressing every aspect of email cyber resilience, not just threat detection. In 2025, Mimecast repositioned as a Human Risk Management platform, adding individual employee risk scoring and the Human Risk Command Center. Named a Leader in the 2025 Gartner Magic Quadrant for Email Security.",
      stats: [
        { value: "40K+", label: "Organisations worldwide protected: 20+ years of email security expertise and threat data", tone: "emerald" },
        { value: "100%", label: "Email processing uptime SLA: guaranteed continuity even during primary server outages", tone: "violet" },
        { value: "99 years", label: "Maximum email archiving retention, with 7-second archive search SLA and immutable storage", tone: "sky" },
      ],
      outro:
        "Mimecast's defining advantage for regulated industries: it is the only platform that treats email security, business continuity, compliance archiving, DMARC governance, and human risk management as a single integrated capability rather than a collection of separate tools. For healthcare, finance, legal, and government organisations where regulatory compliance and operational resilience are as important as threat detection, no competitor matches Mimecast's breadth.",
    },
    strengths: [
      {
        tag: "Email continuity",
        icon: "heartbeat",
        tone: "emerald",
        title: "100% uptime SLA: users send and receive email even when your server is down",
        desc: "Mimecast Mailbox Continuity guarantees 100% email processing uptime, providing a backup web interface that allows users to access live and historical email on any device during planned outages, ransomware attacks, or server failures. No other major email security vendor commits to a 100% processing uptime SLA as standard.",
      },
      {
        tag: "Cloud archiving",
        icon: "server",
        tone: "violet",
        title: "Up to 99 years of immutable email archiving: with 7-second search SLA",
        desc: "Every email is stored in three geographically dispersed immutable copies with configurable retention from 1 day to 99 years. Archive search returns results within 7 seconds across multi-year archives, critical for eDiscovery, regulatory compliance (GDPR, HIPAA, SOX), and litigation holds. Proofpoint requires archiving via partners; Microsoft Defender has no dedicated continuity or archiving.",
      },
      {
        tag: "Human Risk Command Center",
        icon: "users",
        tone: "sky",
        title: "Individual risk scores for every employee: targeted protection for highest-risk users",
        desc: "The Human Risk Command Center (launched April 2025) centralises email, collaboration, endpoint, and identity telemetry to assign an individual risk score to every employee. Users who click suspicious links are automatically enrolled in targeted training and may have access temporarily restricted, reducing human risk without broad policy changes.",
      },
      {
        tag: "Targeted Threat Protection",
        icon: "shield",
        tone: "amber",
        title: "URL rewriting, sandboxing, and impersonation detection in one engine",
        desc: "Mimecast Targeted Threat Protection rewrites all URLs for click-time analysis and routes suspicious attachments through a multi-engine sandbox. Social graphing detects unusual communication patterns and identity anomalies, catching impersonation and BEC attacks before users interact with them. Computer vision identifies brand impersonation in login page replicas.",
      },
      {
        tag: "DMARC Analyzer",
        icon: "lock",
        tone: "rose",
        title: "Automated DMARC compliance: protect your domain and brand reputation",
        desc: "Mimecast DMARC Analyzer provides full visibility into all email streams, automatically monitors SPF and DKIM alignment, and guides organisations from initial DMARC policy deployment through to full enforcement. Brand Exploit Protect scans quadrillions of web destinations to identify phishing sites using your brand before they launch live attacks.",
      },
      {
        tag: "Security Awareness Training",
        icon: "message",
        tone: "slate",
        title: "Integrated phishing simulations and training: in the same console",
        desc: "Mimecast's security awareness training is built into the same platform as email security, meaning training programmes can be automatically triggered by actual threat events. Users who receive a real phishing attempt can be immediately enrolled in targeted training, closing the gap between threat exposure and security education.",
      },
      {
        tag: "Gateway + API deployment",
        icon: "layers",
        tone: "emerald",
        title: "Cloud Gateway or Cloud Integrated: same detection engines, your choice of deployment",
        desc: "Mimecast offers both traditional MX-redirect Cloud Gateway deployment (for deeper inspection and more granular policy control) and API-based Cloud Integrated deployment (for instant connectivity without DNS changes). Both options use identical detection engines, so organisations can choose the approach that fits their operational constraints.",
      },
      {
        tag: "60+ native integrations",
        icon: "globe",
        tone: "violet",
        title: "Deep SIEM, SOAR, and XDR integrations: CrowdStrike, Splunk, Sentinel, Palo Alto",
        desc: "Mimecast's Integrations Hub provides native connections to over 60 security platforms, including CrowdStrike, Splunk, Microsoft Sentinel, Palo Alto Networks, Rapid7, ServiceNow, Netskope, and Zscaler. REST API 2.0 enables custom integrations, making Mimecast a natural fit within any enterprise security architecture.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "Enterprises and regulated industries needing email continuity during M365 outages",
      "Customers with 7+ year email retention and eDiscovery mandates (legal, healthcare, finance)",
      "UAE banks, law firms, and government bodies prioritizing resilience as much as security",
      "Mature mail estates with M365 dependency that cannot tolerate outage windows",
      "Organizations consolidating email security, continuity, and archive onto one vendor",
      "Customers exposed to brand impersonation needing look-alike domain monitoring",
      "Buyers wanting browser isolation for high-risk roles (executives, finance, HR)",
    ],
    products: [
      { model: "Mimecast Email Security Essentials", segment: "SMB / mid-market", role: "Cloud gateway with anti-spam, anti-malware, basic threat protection" },
      { model: "Mimecast Email Security", segment: "Mid-market", role: "+ CyberGraph, URL Protect, Attachment Protect, Impersonation Protect" },
      { model: "Mimecast + Archive", segment: "Compliance-heavy", role: "+ 10+ year immutable archive, eDiscovery, retention policies" },
      { model: "Mimecast + Continuity", segment: "Resilience", role: "+ Email continuity during M365 / Exchange outages" },
      { model: "Mimecast X1 Platform", segment: "Strategic", role: "Full email plus archive plus continuity plus awareness training" },
      { model: "Mimecast Managed Email Security", segment: "Lean teams", role: "Mimecast-managed services for triage and response" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Mimecast Email Security end-to-end for UAE customers requiring email continuity, archive, and security on one platform. Our team has hands-on experience deploying Mimecast for banks, law firms, and government, including MX migration, archive ingestion, continuity activation, and CyberGraph tuning. Vendor-neutral sizing is our default starting point.",
    faqs: [
      {
        question: "How does Mimecast compare to Proofpoint or Sophos Email?",
        answer:
          "Mimecast wins when continuity and archive are decisive alongside security. Proofpoint leads on enterprise BEC and supplier compromise visibility; Sophos Email is the best fit for mid-market customers running Sophos elsewhere. For UAE banks, law firms, and healthcare needing continuity plus archive, Mimecast is typically the top shortlist.",
      },
      {
        question: "Is Mimecast Archive a replacement for Microsoft 365 retention?",
        answer:
          "Functionally, often yes. Mimecast Archive is immutable, fully searchable, and operates independently of M365, so if M365 access is compromised or retention policy is misconfigured, mail is still preserved. Many UAE customers run Mimecast Archive alongside M365 Purview for layered compliance.",
      },
      {
        question: "Does Mimecast cover Microsoft Teams and Slack?",
        answer:
          "Mimecast has added some coverage for collaboration apps via the X1 platform, but the depth is less than dedicated cross-collaboration vendors like Check Point Harmony Email. For Teams-heavy estates, we typically run Mimecast alongside Harmony Email or rely on Defender for Office 365.",
      },
      {
        question: "What is the typical Mimecast deployment lead time in the UAE?",
        answer:
          "Standard mid-market deployments run four to eight weeks (MX migration, policy tuning, archive ingest, continuity setup). Full X1 platform rollouts including archive of historical mail typically run two to four months due to archive ingestion time.",
      },
    ],
    whatIs: {
      eyebrow: "What is Mimecast Email Security",
      titlePrefix: "Email security plus continuity plus archive ",
      titleHighlight: "on one platform",
      bodyParagraphs: [
        "Mimecast Email Security (M-EX) combines MX-mode gateway scanning with CyberGraph AI for BEC and impersonation, URL Protect with browser isolation, Attachment Protect with sandboxing, and Brand Exploit Protection for look-alike domain detection. Targeted Threat Protection wraps these into a multi-layered defense.",
        "Where Mimecast is genuinely differentiated is email continuity (when M365 is down, users continue to send and receive via Mimecast) and email archive (10+ years of fully-searchable mail, immutable for compliance). Few competitors match this breadth on a single platform.",
      ],
      feature: {
        titleLine1: "Resilience +",
        titleLine2: "CyberGraph Architecture",
        body: "Cloud-delivered gateway with CyberGraph AI for BEC and impersonation, plus continuity (uptime when M365 fails) and archive (long-term retention and eDiscovery) on one platform.",
      },
      capabilities: [
        "CyberGraph AI: graph-based BEC and impersonation detection",
        "URL Protect with browser isolation for risky links",
        "Email continuity: keep mail flowing during M365 or Exchange outages",
        "Archive: 10+ years of mail, immutable, fully searchable for eDiscovery",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Gateway, API, or hybrid: your call.",
      intro: "Artiflex deploys Mimecast Email Security in whichever model fits your mail flow and regulatory requirements.",
      options: [
        { icon: "hardware", title: "MX Gateway", body: "Traditional pre-delivery scanning via MX record change. Strongest pre-delivery enforcement, fits hybrid Exchange and complex mail flow." },
        { icon: "cloud", title: "API Mode", body: "API integration with Microsoft 365 or Google Workspace. Fast to deploy (days), no MX change, ideal for cloud-only mail estates." },
        { icon: "virtual", title: "Hybrid", body: "Gateway plus API together: pre-delivery blocking and post-delivery clawback in one solution. Recommended for most UAE enterprise estates." },
      ],
    },
  },

  "fortra-email-security": {
    slug: "fortra-email-security",
    name: "Fortra Email Security",
    logo: "/logos/Fortra.png",
    tagline: "Email DLP and outbound DMARC at brand-protection scale (Agari + Clearswift)",
    bestFor: "Specialist Choice: Email + DLP and DMARC",
    description:
      "Fortra combines the former Agari (outbound DMARC enforcement, brand impersonation defense) and Clearswift (deep email DLP and adaptive redaction) under one portfolio, plus newer Fortra Email Security additions. The strength is at the data-protection and brand-protection layer rather than as an inbound gateway: outbound DMARC at scale, structural DLP with deep content inspection, and adaptive redaction that removes sensitive content while letting the mail flow. For UAE banks, government, and brand-sensitive enterprises, Fortra is a strong specialist for the DMARC and DLP layers.",
    keyStats: [],
    whyWinsIntro: {
      label: "Fortra Email Security Highlights",
      title: "The right specialist for brand protection and email data loss prevention",
      description:
        "Fortra's strongest fit is at the data-protection and brand-protection layers. For UAE banks needing outbound DMARC enforcement at scale with global look-alike domain visibility, Agari is consistently shortlisted. For government and healthcare needing deep email DLP with adaptive redaction (rather than blunt block-or-allow), Clearswift is genuinely differentiated. For pure inbound email security, Sophos, Proofpoint, Mimecast, Microsoft, or Check Point typically lead.",
      stats: [
        { value: "5 layers", label: "ICES, on-prem SEG, DMARC, takedown, and awareness in one contract", tone: "emerald" },
        { value: "Unlimited", label: "phishing site takedowns via PhishLabs, fastest in the industry", tone: "violet" },
        { value: "Co-founded", label: "the DMARC standard, via Agari", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Five-layer portfolio",
        icon: "layers",
        tone: "emerald",
        title: "Cloud Email Protection ICES, Clearswift SEG, Agari DMARC, PhishLabs, Terranova",
        desc: "Fortra delivers all five email security layers under one contract with one account team: cloud ICES, on-prem SEG, DMARC enforcement, phishing takedown, and security awareness training. Particularly compelling for UAE ministries, banks, and regulated estates consolidating multiple specialist vendors.",
      },
      {
        tag: "Agari DMARC",
        icon: "lock",
        tone: "violet",
        title: "Co-founded the DMARC standard",
        desc: "Agari co-authored the DMARC specification and remains the deepest enterprise enforcement engine. Customers move from p=none to p=reject without breaking payroll, marketing, or SaaS sender flows. Global visibility into legitimate and illegitimate use of your domains.",
      },
      {
        tag: "PhishLabs takedown",
        icon: "globe",
        tone: "sky",
        title: "Unlimited takedowns, critical for ministries protecting citizens",
        desc: "PhishLabs Digital Risk Protection delivers unlimited phishing-site takedowns with the fastest published speed-of-takedown in the industry, leveraging 15+ years of registrar and host relationships. Critical when citizens or end-customers are receiving phishing emails that appear to come from your brand.",
      },
      {
        tag: "Clearswift Adaptive Redaction",
        icon: "sliders",
        tone: "amber",
        title: "Sanitise sensitive content from email rather than block the whole message",
        desc: "Clearswift Adaptive Redaction is unique in the market. Instead of blocking an entire email when a single snippet of sensitive content is detected, it removes the offending content (credit-card numbers, PII, classification markings) and lets the rest through. Reduces helpdesk volume while meeting outbound DLP audit requirements.",
      },
      {
        tag: "Sovereign-ready",
        icon: "server",
        tone: "rose",
        title: "Clearswift on-prem SEG for ministries, banks, and regulated entities",
        desc: "Clearswift Secure Email Gateway is the leading on-prem secure email gateway with mature content inspection, deep file inspection, and Adaptive Redaction built in. The right answer for any entity with sovereign data residency requirements that cannot send mail content through a third-party cloud.",
      },
      {
        tag: "Terranova awareness",
        icon: "users",
        tone: "slate",
        title: "Security awareness training bundled with the email security portfolio",
        desc: "Terranova Security Awareness delivers role-based phishing simulations, gamified micro-lessons, and detailed reporting on click-rates and reporting-rates. Bundled with Cloud Email Protection so detection signal and human-layer training share the same risk model.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "UAE banks and large enterprises needing outbound DMARC enforcement at brand-protection scale",
      "Government and semi-government bodies with strict outbound DLP and classified-markings mandates",
      "Healthcare and finance with sensitive-content email exposure requiring adaptive redaction",
      "Customers already running a primary inbound gateway who need specialist DLP and DMARC layers",
      "Organizations with on-prem and sovereign deployment requirements (Clearswift on-prem fit)",
      "Multi-domain estates needing global DMARC visibility and brand impersonation defense",
      "Buyers prioritizing specialist depth in DLP and outbound brand protection over inbound breadth",
    ],
    products: [
      { model: "Agari Brand Protection", segment: "Brand-aware", role: "Outbound DMARC visibility and enforcement, look-alike defense" },
      { model: "Agari Phishing Defense", segment: "Mid-market / SOC", role: "Inbound BEC and vendor compromise specialist layer" },
      { model: "Clearswift Secure Email Gateway", segment: "Compliance-heavy", role: "Email DLP with adaptive redaction and deep content inspection" },
      { model: "Fortra Email Security cloud", segment: "Mid-market", role: "Cloud-delivered inbound and outbound email security" },
      { model: "Fortra Email Security Suite", segment: "Enterprise", role: "Combined Agari + Clearswift + Fortra ESec licensing" },
      { model: "Fortra Email Managed Services", segment: "Lean teams", role: "Fortra-managed services for triage, DMARC, DLP tuning" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Fortra Email Security as a DMARC and DLP specialist layer for UAE customers across banking, government, healthcare, and large enterprise. Our team has experience deploying Agari Brand Protection for outbound DMARC enforcement, Clearswift Secure Email Gateway for adaptive-redaction DLP, and integration alongside primary inbound gateways. Vendor-neutral sizing is our default.",
    faqs: [
      {
        question: "Should Fortra replace my existing email gateway?",
        answer:
          "Typically no. Fortra is strongest as a specialist for DMARC enforcement and outbound DLP, layered on top of a primary inbound gateway. Most UAE customers run Sophos, Proofpoint, Mimecast, Microsoft, or Barracuda for inbound and add Agari (DMARC) and/or Clearswift (DLP) for the specialist layers.",
      },
      {
        question: "How does Agari compare to other DMARC vendors like Valimail or EasyDMARC?",
        answer:
          "Agari typically wins on enterprise-scale DMARC visibility (global view of legitimate and illegitimate senders), brand impersonation defense, and integration with phishing defense. Valimail and EasyDMARC are competitive at SMB and mid-market price points for pure DMARC enforcement. For UAE banks needing brand-protection scale, Agari is consistently shortlisted.",
      },
      {
        question: "Is Clearswift suitable for cloud-only Microsoft 365 estates?",
        answer:
          "Yes, with caveats. Clearswift Secure Email Gateway can run in front of M365 as MX, or as a Microsoft Exchange Online Connector. For cloud-only customers wanting purely API-mode DLP without MX changes, Microsoft Purview DLP plus Fortra add-ons may be a lighter fit. We design around your specific topology.",
      },
      {
        question: "What is the typical Fortra Email deployment lead time in the UAE?",
        answer:
          "Agari Brand Protection deployments run three to six weeks (domain discovery, DMARC alignment, monitor-to-enforce migration). Clearswift Secure Email Gateway deployments typically run four to eight weeks given DLP policy design and inspection rule authoring. Combined deployments run six to twelve weeks.",
      },
    ],
    whatIs: {
      eyebrow: "What is Fortra Email Security",
      titlePrefix: "Specialist email DLP, DMARC, and ",
      titleHighlight: "brand impersonation defense",
      bodyParagraphs: [
        "Fortra's email portfolio is rooted in two strong heritages: Agari is one of the original DMARC enforcement and outbound brand protection platforms, with deep visibility into legitimate and illegitimate use of your domains globally. Clearswift Secure Email Gateway pioneered deep content inspection and adaptive redaction (remove sensitive content from outbound mail rather than blocking the whole message).",
        "Fortra Email Security extends these strengths with newer inbound capabilities, while remaining strongest as an outbound and DLP specialist. Most UAE customers run Fortra alongside a primary inbound gateway (Sophos, Proofpoint, Microsoft) where the inbound side is handled, and Fortra owns the DMARC and DLP layers.",
      ],
      feature: {
        titleLine1: "Brand + Data",
        titleLine2: "Protection Architecture",
        body: "Agari Brand Protection enforces outbound DMARC and surfaces brand impersonation globally; Clearswift Secure Email Gateway provides deep content inspection and adaptive redaction for outbound DLP.",
      },
      capabilities: [
        "Agari Brand Protection: DMARC enforcement and look-alike defense at scale",
        "Clearswift Adaptive Redaction: remove sensitive content, deliver the mail",
        "Deep content inspection: regex, dictionaries, OCR, structural patterns",
        "Specialist focus: layer on top of a primary inbound gateway",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Gateway, API, or hybrid: your call.",
      intro: "Artiflex deploys Fortra Email Security in whichever model fits your mail flow and regulatory requirements.",
      options: [
        { icon: "hardware", title: "MX Gateway", body: "Traditional pre-delivery scanning via MX record change. Strongest pre-delivery enforcement, fits hybrid Exchange and complex mail flow." },
        { icon: "cloud", title: "API Mode", body: "API integration with Microsoft 365 or Google Workspace. Fast to deploy (days), no MX change, ideal for cloud-only mail estates." },
        { icon: "virtual", title: "Hybrid", body: "Gateway plus API together: pre-delivery blocking and post-delivery clawback in one solution. Recommended for most UAE enterprise estates." },
      ],
    },
  },

  "microsoft-defender-o365": {
    slug: "microsoft-defender-o365",
    name: "Microsoft Defender for Office 365",
    logo: "/logos/MicrosoftDefender.webp",
    tagline: "Native Microsoft 365 email protection with Safe Links, Safe Attachments, and Defender XDR",
    bestFor: "Best for M365 E5 Estates (Recommended)",
    description:
      "Microsoft Defender for Office 365 (MDO) is built into the Microsoft 365 platform with no third-party gateway required, integrating natively with Defender for Endpoint, Defender for Identity, Sentinel, and Entra ID. For UAE customers already licensed for Microsoft 365 E5 or running large Microsoft-standardized estates, MDO delivers significant value with minimal incremental cost. For pure-prevention shortlists or specialist BEC scenarios, layering Sophos, Proofpoint, Mimecast, or Abnormal on top is common.",
    keyStats: [],
    whyWinsIntro: {
      label: "Microsoft Defender for Office 365 Highlights",
      title: "The native choice when Microsoft 365 E5 is already in place",
      description:
        "MDO is at its best when M365 E5 is already licensed and Defender for Endpoint, Identity, and Cloud Apps are part of the stack. Native correlation across the Defender suite removes vendor seams and operational duplication. In mixed-vendor or non-Microsoft environments, third-party email security typically delivers stronger standalone outcomes.",
      stats: [
        { value: "Native", label: "M365 API integration with no MX redirection required", tone: "emerald" },
        { value: "E5 bundled", label: "included with Microsoft 365 E5 and Defender for Office 365 P2", tone: "violet" },
        { value: "XDR", label: "deep integration with Defender XDR across endpoint, identity, email", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Native M365 API",
        icon: "layers",
        tone: "emerald",
        title: "Inline protection inside Microsoft 365 with no MX redirection",
        desc: "Defender for Office 365 lives natively inside Microsoft 365 with no MX redirect, no third-party mail flow, and no separate admin portal. Policies sit in the same admin centre as Exchange and Microsoft Purview, which removes operational headaches that cloud-gateway architectures introduce.",
      },
      {
        tag: "Bundled with E5",
        icon: "barChart",
        tone: "violet",
        title: "Cheapest path to advanced email security when M365 E5 is already in place",
        desc: "Defender for Office 365 P2 is included in Microsoft 365 E5. For organisations already licensed at E5, the marginal cost of email security is effectively zero, which makes Defender the unbeatable starting point.",
      },
      {
        tag: "Defender XDR",
        icon: "monitor",
        tone: "sky",
        title: "Cross-product correlation across endpoint, identity, email, and cloud apps",
        desc: "Email telemetry feeds Defender XDR alongside Defender for Endpoint, Entra ID Protection, and Defender for Cloud Apps. SOC analysts investigate phishing-to-endpoint-detonation chains in a single timeline, materially faster than stitching across separate vendor consoles.",
      },
      {
        tag: "Safe Attachments",
        icon: "shield",
        tone: "amber",
        title: "Cloud sandbox for unknown attachments with dynamic delivery",
        desc: "Safe Attachments detonates suspicious files in a cloud sandbox before delivery, blocking zero-day malware in Office macros, PDFs, ISO files, and HTML phishing payloads. Dynamic delivery lets safe attachments reach users while suspicious files are held for analysis.",
      },
      {
        tag: "Safe Links",
        icon: "eye",
        tone: "rose",
        title: "Time-of-click URL re-scanning across Outlook, Teams, and Office apps",
        desc: "Safe Links rewrites URLs at delivery and reinspects them at the moment of click, catching delayed-activation attacks where the linked page becomes malicious after the email passes initial inspection. Coverage extends to Outlook, Teams, and Office apps.",
      },
      {
        tag: "Attack Simulation Training",
        icon: "users",
        tone: "slate",
        title: "Built-in phishing simulation and training included with Plan 2",
        desc: "Attack Simulator runs realistic phishing simulations against your users from inside the Microsoft 365 admin centre, with built-in remedial training. Less mature than KnowBe4 KMSAT, but bundled with Plan 2 at no extra cost.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "Microsoft 365 E5 or M365 E5 Security customers wanting to use what they already pay for",
      "Microsoft-centric estates already running Defender for Endpoint, Identity, and Cloud Apps",
      "Organizations consolidating SIEM (Sentinel), email (MDO), endpoint (MDE) on one platform",
      "Microsoft-trained SOCs comfortable with the Defender XDR portal and KQL hunting",
      "UAE government and large enterprises with EA agreements that include M365 E5",
      "Customers prioritizing native integration over best-in-class standalone email security",
      "Buyers willing to layer specialist BEC vendors (Abnormal, Proofpoint) on top when needed",
    ],
    products: [
      { model: "Exchange Online Protection", segment: "Anti-spam baseline", role: "Anti-spam, anti-malware, basic anti-phishing included with M365" },
      { model: "Defender for Office 365 Plan 1", segment: "Microsoft SMB", role: "Safe Attachments, Safe Links, anti-phishing impersonation" },
      { model: "Defender for Office 365 Plan 2", segment: "Mid-market / SOC", role: "+ Threat Explorer, AIR, Attack Simulation Training" },
      { model: "Microsoft 365 E5 Security", segment: "Enterprise", role: "MDO P2 plus Identity, Cloud Apps, Sentinel allowance" },
      { model: "Microsoft 365 E5", segment: "Enterprise", role: "Everything plus Office, Purview, full M365 suite" },
      { model: "Defender XDR Premium", segment: "Mature SOC", role: "Full cross-product XDR with Microsoft Defender Experts" },
    ],
    whyArtiflex:
      "Artiflex IT is a Microsoft Solutions Partner with certified engineers serving the UAE, Oman, and Saudi Arabia. We deliver Defender for Office 365 end-to-end for Microsoft-centric estates: tenant onboarding, Safe Links and Safe Attachments policy design, anti-phishing tuning, Attack Simulation Training rollout, Defender XDR integration, and Sentinel correlation. We have migrated Symantec MessageLabs, Mimecast, and Barracuda estates onto MDO for UAE customers with existing M365 E5 entitlements.",
    faqs: [
      {
        question: "Should we use MDO instead of Sophos Email or Proofpoint?",
        answer:
          "If you already pay for M365 E5, MDO delivers strong value at zero incremental cost and is the right baseline for most Microsoft-centric estates. For customers with heavy BEC exposure or supplier compromise concern, layering Abnormal AI or Proofpoint on top of MDO is a common UAE pattern. For mid-market customers running Sophos elsewhere, Sophos Email plus Synchronized Security typically wins.",
      },
      {
        question: "Is MDO sufficient on its own?",
        answer:
          "For most mid-market and many enterprise customers, MDO Plan 2 is sufficient. The gap usually appears in three areas: deep BEC and supplier compromise visibility (Abnormal, Proofpoint better), browser isolation for risky links (Mimecast better), and email continuity during M365 outages (Mimecast better). Sizing depends on your specific risk profile.",
      },
      {
        question: "Does MDO require a separate license or is it included in M365?",
        answer:
          "Exchange Online Protection (EOP) is included in M365 Business and Enterprise SKUs. Defender for Office 365 Plan 1 and Plan 2 are paid add-ons (or included in M365 E5 / M365 E5 Security). Most UAE enterprises with E5 already have MDO P2 and just need to enable it properly.",
      },
      {
        question: "What is the typical MDO deployment lead time in the UAE?",
        answer:
          "Standard MDO enablement on an existing M365 tenant runs one to three weeks (policy design, rule tuning, simulation campaign setup, training rollout). Greenfield M365 plus MDO deployments run six to twelve weeks. We hold demo M365 tenants for proof of concept.",
      },
    ],
    whatIs: {
      eyebrow: "What is Microsoft Defender for Office 365",
      titlePrefix: "Email security built into ",
      titleHighlight: "Microsoft 365",
      bodyParagraphs: [
        "MDO scans inbound, outbound, and internal email natively within Exchange Online, applying Safe Attachments sandboxing, Safe Links time-of-click protection, anti-phishing AI, and impersonation defense. Plan 2 adds Attack Simulation Training, Threat Explorer for hunt and investigation, and Automated Investigation and Response (AIR) playbooks.",
        "Tight integration with Defender XDR correlates email signals with endpoint, identity, and cloud-app events in one console, turning email from a siloed detection problem into one piece of a cross-product investigation.",
      ],
      feature: {
        titleLine1: "Microsoft 365",
        titleLine2: "Defender Architecture",
        body: "MDO is part of the Microsoft 365 Defender suite, correlating email, endpoint, identity, and cloud-app signals into one analyst workbench powered by Microsoft's global threat intelligence graph.",
      },
      capabilities: [
        "Safe Attachments: cloud sandboxing for unknown attachments",
        "Safe Links: time-of-click URL re-scanning with detonation",
        "Anti-phishing AI: mailbox-level impersonation and BEC detection",
        "Defender XDR: email plus endpoint plus identity plus cloud apps correlated",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Gateway, API, or hybrid: your call.",
      intro: "Artiflex deploys Microsoft Defender for Office 365 in whichever model fits your mail flow and regulatory requirements.",
      options: [
        { icon: "hardware", title: "MX Gateway", body: "Traditional pre-delivery scanning via MX record change. Strongest pre-delivery enforcement, fits hybrid Exchange and complex mail flow." },
        { icon: "cloud", title: "API Mode", body: "API integration with Microsoft 365 or Google Workspace. Fast to deploy (days), no MX change, ideal for cloud-only mail estates." },
        { icon: "virtual", title: "Hybrid", body: "Gateway plus API together: pre-delivery blocking and post-delivery clawback in one solution. Recommended for most UAE enterprise estates." },
      ],
    },
  },

  "darktrace-email": {
    slug: "darktrace-email",
    name: "Darktrace/Email",
    logo: "/logos/Darktrace.png",
    tagline: "Self-learning AI for novel email attacks no signature engine can detect",
    bestFor: "Specialist Choice: AI-Driven Anomaly Detection",
    description:
      "Darktrace pioneered the self-learning AI approach to security: rather than matching known-bad patterns, Darktrace models what is normal for each organisation and flags deviations. Darktrace/Email applies this model to inbound and outbound email, catching novel BEC, vendor compromise, and supply-chain attacks that signature and reputation engines miss. Deployed via M365 or Google Workspace API, often as a layer on top of an existing gateway, Darktrace is a strong specialist for the unknown-unknown threat category.",
    keyStats: [],
    whyWinsIntro: {
      label: "Darktrace/Email Highlights",
      title: "The right layer for the unknown-unknown threat category",
      description:
        "Most email security stops known attack patterns. Darktrace/Email catches the novel ones: a vendor mailbox compromised yesterday, a supplier sending a payment-redirect request that subtly differs from their normal pattern, an executive impersonation crafted by an AI tool. For UAE enterprises whose worst-case scenario is a sophisticated targeted attack, Darktrace adds genuine novel-threat coverage.",
      stats: [
        { value: "Self-Learning", label: "behavioural AI baseline per user, no signature dependence", tone: "emerald" },
        { value: "Leader", label: "Gartner Magic Quadrant and EMEA Customers' Choice", tone: "violet" },
        { value: "Cyber AI Analyst", label: "automates SOC-level investigation and triage", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Self-Learning AI",
        icon: "shield",
        tone: "emerald",
        title: "Behavioural baseline catches BEC and account takeover",
        desc: "Darktrace learns who each user normally communicates with, in what tone, at what cadence, and from which devices. When a 2am wire-transfer request lands from a familiar-looking address but with subtle anomalies, the AI flags it. No rules, no policies, no tuning required after deployment.",
      },
      {
        tag: "Cyber AI Analyst",
        icon: "monitor",
        tone: "violet",
        title: "Automates SOC-level investigation and triage",
        desc: "Cyber AI Analyst auto-triages every alert, correlates signals across email, endpoint, network, and identity, and produces investigation reports that mirror what a Tier-2 SOC analyst would write. Reduces triage time from hours to seconds.",
      },
      {
        tag: "Account Takeover",
        icon: "users",
        tone: "sky",
        title: "Identity-layer signals catch compromised mailboxes from the inside",
        desc: "When an attacker compromises a mailbox, behaviour shifts immediately: new login locations, new sending patterns, new internal-to-internal phishing attempts. Darktrace's baseline catches this in real time, often before the attacker has finished the post-compromise reconnaissance phase.",
      },
      {
        tag: "Antigena Response",
        icon: "activity",
        tone: "amber",
        title: "Autonomous hold, alter, or release of suspicious mail",
        desc: "Antigena Email takes targeted action on suspicious mail (hold, lock attachments, neutralise links, double-check recipient lists) without waiting for a human in the loop. Calibrated to the user's normal pattern, so it intervenes only when the signal is high-confidence.",
      },
      {
        tag: "Cross-domain Correlation",
        icon: "layers",
        tone: "rose",
        title: "Email tied to Darktrace Network, Apps, Cloud, OT signals",
        desc: "Darktrace/Email is part of the ActiveAI Security Platform, which means email anomalies are correlated with Darktrace/Network, /Cloud, /OT, and /Endpoint signals in real time. The same AI that watches an inbox watches the lateral-movement attempt that follows a successful phish.",
      },
      {
        tag: "Gartner Leader",
        icon: "barChart",
        tone: "slate",
        title: "Magic Quadrant Leader and EMEA Customers' Choice",
        desc: "Darktrace was named a Leader in the Gartner Magic Quadrant for Email Security and is the EMEA Customers' Choice. Strong third-party validation for the self-learning AI approach to inbound email defence.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "Enterprises with high-value targets prioritizing novel-threat coverage over price",
      "UAE customers already running Darktrace Network, Apps, or Cloud who want unified anomaly detection",
      "Mature SOCs that benefit from explainable AI reasoning for analyst trust and tuning",
      "Customers exposed to sophisticated targeted attacks (BEC, supply chain, nation-state)",
      "Organizations wanting autonomous response on email via Antigena",
      "Multi-domain estates needing email correlated with network and identity anomalies",
      "Buyers layering Darktrace on top of a primary gateway, not replacing it",
    ],
    products: [
      { model: "Darktrace/Email", segment: "All sizes", role: "Self-learning AI for inbound and outbound email" },
      { model: "Darktrace/Email + Antigena", segment: "All sizes", role: "+ Autonomous response action authority" },
      { model: "Darktrace/Email + Apps", segment: "Mid-market", role: "+ M365 / Workspace identity and OAuth anomaly detection" },
      { model: "Darktrace Cyber AI Platform", segment: "Enterprise", role: "Cross-domain: Email + Network + Apps + Cloud + OT" },
      { model: "Darktrace HEAL", segment: "Enterprise SOC", role: "Autonomous incident remediation and triage" },
      { model: "Darktrace Managed Services", segment: "Lean teams", role: "Darktrace-managed analysts on top of the platform" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Darktrace/Email as a novel-threat specialist layer for UAE customers across banking, government, and enterprise. Our team has experience layering Darktrace alongside Sophos, Proofpoint, Mimecast, and Microsoft gateways, with M365 API tenant integration, learning-period management, Antigena policy design, and cross-domain correlation with Darktrace/Network and /Apps. Vendor-neutral sizing is our default.",
    faqs: [
      {
        question: "Should Darktrace/Email replace my existing gateway?",
        answer:
          "Typically no. Darktrace/Email's strength is novel-threat detection via behavioral anomalies; a gateway's strength is bulk pre-delivery enforcement of known-bad signatures and reputations. Most UAE deployments run Darktrace as a layer on top of an existing gateway, particularly for high-value-target users.",
      },
      {
        question: "How does Darktrace/Email compare to Abnormal AI?",
        answer:
          "Both use behavioral AI for BEC detection, but with different philosophies. Abnormal focuses on identity-and-communication graph modeling specifically for email. Darktrace applies its broader self-learning AI across multiple domains (email plus network plus cloud plus identity) and emphasises cross-domain correlation. We size both when behavioral AI is the buying criterion.",
      },
      {
        question: "Does Darktrace require running other Darktrace products to add /Email?",
        answer:
          "No. Darktrace/Email is standalone via M365 or Google Workspace API. However, customers also running Darktrace/Network, /Apps, or /Cloud get cross-domain correlation that single-product deployments cannot match.",
      },
      {
        question: "What is the typical Darktrace/Email deployment lead time in the UAE?",
        answer:
          "Two to four weeks total: API onboarding (days), learning period (one to two weeks while Darktrace models normal), tuning and Antigena policy go-live (one week). Cross-domain integration with other Darktrace products adds two to four weeks.",
      },
    ],
    whatIs: {
      eyebrow: "What is Darktrace/Email",
      titlePrefix: "Self-learning AI that catches what ",
      titleHighlight: "reputation and signatures cannot",
      bodyParagraphs: [
        "Darktrace/Email builds a behavioral model of every user and the organisation as a whole, learning normal communication patterns, sender relationships, content topics, and timing. When an email deviates from those learned patterns, Darktrace surfaces it with explainable reasoning, even when the email has no malicious URL, attachment, or signature.",
        "Darktrace/Email integrates with the wider Darktrace platform (Network, Apps, Cloud, OT) for cross-domain anomaly correlation. For UAE enterprises that have invested in Darktrace elsewhere, adding /Email is the natural way to extend self-learning AI to the inbox.",
      ],
      feature: {
        titleLine1: "Self-Learning AI",
        titleLine2: "Architecture",
        body: "Models normal communication patterns per user and per organisation, flagging anomalies with explainable reasoning. Cross-domain correlation with Darktrace Network, Apps, Cloud, and OT.",
      },
      capabilities: [
        "Self-learning AI: model normal per user and per organisation continuously",
        "Anomaly explanation: surface why each detection fired, not just a verdict",
        "Antigena autonomous response: hold, alter, or release messages automatically",
        "Cross-domain: correlate with Darktrace Network, Apps, Cloud, OT detections",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Gateway, API, or hybrid: your call.",
      intro: "Artiflex deploys Darktrace/Email in whichever model fits your mail flow and regulatory requirements.",
      options: [
        { icon: "hardware", title: "MX Gateway", body: "Traditional pre-delivery scanning via MX record change. Strongest pre-delivery enforcement, fits hybrid Exchange and complex mail flow." },
        { icon: "cloud", title: "API Mode", body: "API integration with Microsoft 365 or Google Workspace. Fast to deploy (days), no MX change, ideal for cloud-only mail estates." },
        { icon: "virtual", title: "Hybrid", body: "Gateway plus API together: pre-delivery blocking and post-delivery clawback in one solution. Recommended for most UAE enterprise estates." },
      ],
    },
  },

  "knowbe4-defend": {
    slug: "knowbe4-defend",
    name: "KnowBe4 Security Awareness Training",
    logo: "/logos/KnowBe4.webp",
    tagline: "Security awareness training and phishing simulation at enterprise scale",
    bestFor: "Specialist Choice: Security Awareness and Phishing Simulation",
    description:
      "KnowBe4 is the dominant global vendor in security awareness training and phishing simulation, with one of the largest content libraries in the industry (videos, modules, posters, newsletters) and PhishER for user-reported phishing response. KnowBe4 complements rather than replaces an email security gateway: it targets the human layer, training users to recognise phishing and providing tools to triage what users report. For UAE customers building or maturing a security awareness program, KnowBe4 is the leading specialist.",
    keyStats: [],
    whyWinsIntro: {
      label: "KnowBe4 Security Awareness Training Highlights",
      title: "The specialist for the layer email gateways cannot reach",
      description:
        "No email gateway catches 100% of phishing. The mail that gets through ultimately relies on user judgement. KnowBe4 is the leading platform for building, testing, and measuring that user judgement at scale. For UAE banks, healthcare, and regulated industries with compliance training mandates, KnowBe4 is consistently the leading shortlist option for the awareness layer.",
      stats: [
        { value: "KMSAT", label: "industry-standard security awareness training platform", tone: "emerald" },
        { value: "Leader", label: "Gartner Magic Quadrant for Email Security", tone: "violet" },
        { value: "PhishER", label: "user-reported phish auto-triaged with mailbox clawback", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "KMSAT training",
        icon: "users",
        tone: "emerald",
        title: "Industry-standard security awareness training tightly tied to email",
        desc: "KnowBe4 KMSAT (Kevin Mitnick Security Awareness Training) is the industry-standard awareness platform with one of the largest content libraries in the industry: Kevin Mitnick training, popular video series, compliance modules, posters, and newsletters in dozens of languages.",
      },
      {
        tag: "Agentic detection",
        icon: "shield",
        tone: "violet",
        title: "AI agents detect phishing alongside the awareness platform",
        desc: "KnowBe4 Defend (formerly Egress) brings AI-native phishing, BEC, and supply-chain compromise detection alongside KMSAT. Behavioural baselines per user, anomaly detection, and contextual link analysis catch threats that signature engines miss.",
      },
      {
        tag: "PhishER + PhishRIP",
        icon: "mail",
        tone: "sky",
        title: "User-reported phish auto-triaged with mailbox clawback at scale",
        desc: "PhishER handles user-reported suspicious emails: users click a Phish Alert Button in Outlook or Gmail, PhishER auto-triages and clusters reports, removes related malicious messages from all mailboxes via PhishRIP, and integrates with the SOC analyst workflow.",
      },
      {
        tag: "Phishing simulation",
        icon: "eye",
        tone: "amber",
        title: "Thousands of templates including UAE-relevant brand impersonation scenarios",
        desc: "Phishing campaigns can use thousands of pre-built templates or custom-designed scenarios. We customise UAE-specific phishing scenarios (regional banks, courier services, government services) for higher realism with local workforces.",
      },
      {
        tag: "Per-user risk scoring",
        icon: "barChart",
        tone: "rose",
        title: "Continuous awareness posture per individual feeds conditional access",
        desc: "SmartRisk Agent assigns and updates a risk score for every employee based on simulated-phishing performance, real-world reporting behaviour, training completion, and Defend-flagged events. Per-user risk is the right unit of management, not per-policy or per-domain.",
      },
      {
        tag: "Gartner Leader",
        icon: "layers",
        tone: "slate",
        title: "Magic Quadrant Leader for Email Security",
        desc: "KnowBe4 is named a Leader in the Gartner Magic Quadrant for Email Security, validating the platform's combined approach to awareness training, phishing simulation, and reported-phish response.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "Organizations building or maturing a security awareness training program at scale",
      "UAE regulated industries with compliance training mandates (banks, healthcare, government)",
      "Enterprises wanting auto-clawback of user-reported phish via PhishER and PhishRIP",
      "Multi-language, multi-region operations needing content in Arabic, English, Hindi, French",
      "MSPs delivering managed security awareness services to multiple customers",
      "Customers wanting per-user risk scoring to feed into conditional access decisions",
      "Buyers complementing (not replacing) an email gateway with the human-layer specialist",
    ],
    products: [
      { model: "KMSAT Silver", segment: "SMB", role: "Phishing simulation, training library access" },
      { model: "KMSAT Gold", segment: "Mid-market", role: "+ Advanced reporting, PhishER, USB drive test" },
      { model: "KMSAT Platinum", segment: "Mid-market", role: "+ Smart Groups, AIDA AI coaching, custom phishing" },
      { model: "KMSAT Diamond", segment: "Enterprise", role: "+ KCM GRC platform, security culture surveys" },
      { model: "PhishER Plus", segment: "Add-on", role: "Mailbox clawback (PhishRIP) for user-reported phish" },
      { model: "Compliance Plus", segment: "Regulated", role: "Compliance-focused training and audit reporting" },
    ],
    whyArtiflex:
      "Artiflex IT delivers KnowBe4 as the awareness training layer for UAE customers across banking, healthcare, government, and enterprise. Our team designs phishing simulation campaigns aligned to UAE threat patterns (Arabic-language lures, regional brand impersonation), rolls out training program calendars, integrates PhishER into your SOC workflow, and provides ongoing campaign management. We layer KnowBe4 alongside any gateway (Sophos, Proofpoint, Mimecast, Microsoft, Barracuda).",
    faqs: [
      {
        question: "Should KnowBe4 replace my email gateway?",
        answer:
          "No. KnowBe4 is the human-layer specialist; it complements rather than replaces an email gateway. Most UAE customers run KnowBe4 alongside their primary gateway (Sophos, MDO, Proofpoint, Mimecast, Barracuda) to cover the human factor that no gateway can fully secure.",
      },
      {
        question: "How does KnowBe4 compare to Proofpoint Security Awareness or Barracuda Awareness?",
        answer:
          "KnowBe4 typically wins on content library breadth and depth, and on PhishER for user-reported phish response. Proofpoint Security Awareness integrates more tightly with Proofpoint's gateway. Barracuda Awareness is included in Barracuda Email Protection Premium. For a best-of-breed awareness program, KnowBe4 is consistently the leader.",
      },
      {
        question: "Does KnowBe4 support Arabic-language content?",
        answer:
          "Yes. KnowBe4 offers training and phishing templates in dozens of languages including Arabic, useful for UAE multi-national workforces. We also customise UAE-specific phishing scenarios (regional banks, courier services, government services) for higher realism.",
      },
      {
        question: "What is the typical KnowBe4 deployment lead time in the UAE?",
        answer:
          "Standard mid-market KnowBe4 deployments run two to four weeks (tenant setup, AD or Azure AD sync, baseline simulation, training program design, Phish Alert Button rollout). Enterprise rollouts including PhishER and PhishRIP typically run six to ten weeks.",
      },
    ],
    whatIs: {
      eyebrow: "What is KnowBe4 Security Awareness Training",
      titlePrefix: "The human layer of ",
      titleHighlight: "email security",
      bodyParagraphs: [
        "KnowBe4 KMSAT (Kevin Mitnick Security Awareness Training) provides phishing simulation campaigns, an extensive training content library (Kevin Mitnick training, popular video series, compliance modules), and a learner LMS with assignments, certifications, and reporting. Phishing campaigns can use thousands of pre-built templates or custom-designed scenarios.",
        "PhishER complements KMSAT by handling user-reported suspicious emails: users click a Phish Alert Button in Outlook or Gmail, PhishER auto-triages and clusters reports, removes related malicious messages from all mailboxes, and integrates with the SOC analyst workflow.",
      ],
      feature: {
        titleLine1: "Train + Test +",
        titleLine2: "Respond Architecture",
        body: "KMSAT delivers training and simulation; PhishER turns user-reported phish into auto-triaged incidents with clawback. Together they cover prevention through human vigilance and response when users spot what gateways miss.",
      },
      capabilities: [
        "Largest content library: thousands of videos, modules, posters, newsletters",
        "Phishing simulation: thousands of templates plus custom scenario builder",
        "PhishER: auto-triage of user-reported phish with clawback",
        "Risk scoring per user: continuous awareness posture per individual",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Gateway, API, or hybrid: your call.",
      intro: "Artiflex deploys KnowBe4 Security Awareness Training in whichever model fits your mail flow and regulatory requirements.",
      options: [
        { icon: "hardware", title: "MX Gateway", body: "Traditional pre-delivery scanning via MX record change. Strongest pre-delivery enforcement, fits hybrid Exchange and complex mail flow." },
        { icon: "cloud", title: "API Mode", body: "API integration with Microsoft 365 or Google Workspace. Fast to deploy (days), no MX change, ideal for cloud-only mail estates." },
        { icon: "virtual", title: "Hybrid", body: "Gateway plus API together: pre-delivery blocking and post-delivery clawback in one solution. Recommended for most UAE enterprise estates." },
      ],
    },
  },
};

export const emailVendorList = Object.values(emailVendors);
