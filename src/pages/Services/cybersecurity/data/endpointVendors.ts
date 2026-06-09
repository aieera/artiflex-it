export type EndpointVendor = {
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
  products: {
    model: string;
    segment: string;
    role: string;
    tag?: { label: string; tone: "new" | "eol" };
  }[];
  /** Optional amber callout shown above the product/SKU table. */
  portfolioNote?: { title: string; body: string };
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

  /** Deployment Options section (cloud / on-prem / hybrid). */
  deploymentOptions?: {
    eyebrow?: string;
    title: string;
    intro: string;
    options: Array<{ icon: "hardware" | "virtual" | "cloud"; title: string; body: string }>;
  };
};

export const endpointVendors: Record<string, EndpointVendor> = {
  "sophos-endpoint": {
    slug: "sophos-endpoint",
    name: "Sophos Endpoint",
    logo: "/logos/sophos.svg",
    tagline: "Formerly Intercept X, deep-learning prevention with Synchronized Security and 24x7 MDR",
    bestFor: "Best Overall Value (Recommended)",
    description:
      "Sophos Endpoint (formerly Intercept X, renamed in the 2025 portfolio refresh) combines deep-learning anti-malware, CryptoGuard anti-ransomware, exploit prevention, and full EDR/XDR in a single agent. When paired with Sophos Firewall, Synchronized Security automates host isolation in seconds. For UAE mid-market and enterprise environments that want best-in-class prevention with optional 24x7 Sophos MDR, it is the recommended endpoint platform.",
    keyStats: [],
    whyWinsIntro: {
      label: "Sophos Endpoint / EDR / XDR / MDR Highlights",
      title: "Prevention first. Then detection. Then a human team if you need one.",
      description:
        "Sophos is the only vendor where a single cloud console, Sophos Central, manages endpoint protection, EDR, XDR, firewall, email, and MDR as a seamlessly connected stack. Its 2025 portfolio refresh gives every size of organisation a clear, scalable path from basic endpoint protection through to fully managed 24/7 detection and response.",
      stats: [
        { value: "600K+", label: "Customers protected worldwide", tone: "emerald" },
        { value: "17x", label: "Consecutive Gartner Magic Quadrant for Endpoint Protection Leader recognition", tone: "violet" },
        { value: "24/7", label: "MDR threat hunting with full incident response included", tone: "sky" },
      ],
      outro:
        "Sophos's unique strength for SMB and mid-market: the same Sophos Central console manages the full stack, firewall, endpoint, email, MDR. No integration tax, no separate portals, no data silos. Sophos MDR includes a breach protection warranty.",
    },
    strengths: [
      {
        tag: "Deep Learning AI",
        icon: "shield",
        tone: "emerald",
        title: "Neural network malware detection, not signatures",
        desc: "Sophos Endpoint uses a deep learning neural network trained on hundreds of millions of malware samples to predict and block threats, including never-before-seen malware, without relying on signature updates.",
      },
      {
        tag: "CryptoGuard",
        icon: "lock",
        tone: "violet",
        title: "Anti-ransomware with automatic file rollback",
        desc: "CryptoGuard detects malicious encryption in progress and shuts it down before it spreads. Any encrypted files are automatically rolled back to a clean state, keeping users working with minimal disruption, including MBR protection.",
      },
      {
        tag: "Sophos EDR",
        icon: "eye",
        tone: "sky",
        title: "Ask any question about past and present endpoint activity",
        desc: "Sophos EDR allows security teams to query endpoint history, hunt for active adversaries, and investigate evasive threats using AI-accelerated tooling, purpose-built for both dedicated analysts and IT admins without a security background.",
      },
      {
        tag: "Sophos XDR",
        icon: "layers",
        tone: "amber",
        title: "The only XDR that natively synchronises firewall, email, endpoint, and cloud",
        desc: "Sophos XDR correlates telemetry from endpoint, server, firewall, email, cloud, and O365 natively, not via API stitching. Cross-referencing IOCs across all sources dramatically shortens investigation time and surfaces attacks that single-domain tools miss entirely.",
      },
      {
        tag: "Sophos MDR",
        icon: "users",
        tone: "rose",
        title: "24/7 expert threat hunting and full incident response, as a service",
        desc: "Sophos MDR delivers a fully managed SOC: elite threat hunters actively investigate and neutralise threats on your behalf, 24/7. Full incident response is included, meaning Sophos doesn't just alert you; they contain and remediate. Works with your existing non-Sophos tools.",
      },
      {
        tag: "Synchronized Security",
        icon: "heartbeat",
        tone: "slate",
        title: "Firewall plus endpoint communicate: automatic host isolation on compromise",
        desc: "Sophos Security Heartbeat connects endpoint and firewall so that when an endpoint detects a compromise, the firewall automatically isolates that host from the network. Lateral movement is blocked in seconds, no SOAR playbook or human intervention needed.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "UAE mid-market and enterprise customers (100 to 10,000 endpoints) wanting top-tier prevention",
      "Existing Sophos Firewall customers who want to activate Synchronized Security automation",
      "Lean IT teams that benefit from a single cloud console across endpoint, firewall, and email",
      "Organisations with high ransomware concern that need CryptoGuard rollback as a safety net",
      "Buyers who want the option of 24x7 Sophos MDR with full incident-response authority",
      "Regulated industries (finance, healthcare) needing endpoint DLP, application control, and HIPS",
      "Schools, retail chains, and distributed branches needing zero-touch deployment via Sophos Central",
    ],
    products: [
      { model: "Sophos Endpoint 100", segment: "Small business (up to 100 employees)", role: "Full Sophos Endpoint protection in a fixed-price subscription for organisations up to 100 employees. Replaces Intercept X Essentials for SMBs.", tag: { label: "New", tone: "new" } },
      { model: "Sophos Endpoint", segment: "Baseline / Mid-market", role: "Deep-learning anti-malware, exploit prevention, CryptoGuard, Adaptive Attack Protection, web, application and peripheral control, and DLP. Formerly Intercept X Advanced." },
      { model: "Sophos EDR", segment: "IT teams / SOC", role: "Everything in Sophos Endpoint plus AI-accelerated detection and response, threat hunting, live response, and Sophos Data Lake history.", tag: { label: "New tier", tone: "new" } },
      { model: "Sophos XDR", segment: "Mid-market / SOC", role: "Extends detection and response across firewall, email, identity, cloud, and third-party tools, with the Sophos AI Assistant and case management. Formerly Intercept X Advanced with XDR." },
      { model: "Sophos MDR", segment: "Lean IT teams", role: "Fully managed 24/7 Sophos SOC analysts with full incident-response authority. Formerly Intercept X Advanced with MDR." },
      { model: "Sophos MDR Complete", segment: "Enterprise", role: "All of Sophos MDR plus a breach protection warranty and dedicated technical account management. Formerly Intercept X Advanced with MDR Complete." },
      { model: "Sophos Endpoint for Server", segment: "Datacenter / VM", role: "Server-tuned prevention, file integrity monitoring, and cloud workload posture. Formerly Intercept X for Server." },
      { model: "Sophos Endpoint for Legacy Platforms", segment: "EOL OS add-on", role: "Add-on extending protection to Windows and Linux endpoints and servers running past their standard end-of-support dates.", tag: { label: "New", tone: "new" } },
      { model: "Intercept X Essentials", segment: "Retired", role: "End of sale in 2025: new orders closed Nov 1, 2025 and renewals close Jan 7, 2026. Existing customers upgrade to Sophos Endpoint at renewal.", tag: { label: "End of sale", tone: "eol" } },
    ],
    portfolioNote: {
      title: "Running an obsolete or end-of-life operating system? Tell us upfront.",
      body: "Unsupported and end-of-life platforms (for example, older Windows or Linux versions past vendor end-of-support) are not covered by standard Sophos Endpoint licensing. They require a separate Sophos Endpoint for Legacy Platforms add-on license. If any machines in your estate run a legacy OS, flag it during scoping so we license and protect them correctly, otherwise those endpoints will be left unprotected.",
    },
    whyArtiflex:
      "Artiflex IT is a Sophos Platinum Partner, the highest tier in Sophos's UAE channel. We deliver Sophos Endpoint deployments end-to-end across UAE, Oman, and Saudi Arabia: agent rollout planning, Active Directory and Entra ID integration, policy hardening, Sophos Central tenant setup, MDR onboarding, and ongoing managed endpoint services. Platinum status means escalations land directly with Sophos engineering.",
    faqs: [
      {
        question: "Why is Intercept X now called Sophos Endpoint?",
        answer:
          "The 2025 Sophos portfolio refresh retired the Intercept X branding in favour of clearer Sophos Endpoint naming. The product, agent, and Sophos Central console are the same: Intercept X Advanced is now Sophos Endpoint, the XDR and MDR variants become Sophos XDR and Sophos MDR, and a new Sophos EDR tier sits between them. Existing customers move to the new SKUs at renewal with no reinstall.",
      },
      {
        question: "How does Sophos Endpoint compare to CrowdStrike Falcon or SentinelOne?",
        answer:
          "Sophos Endpoint typically wins on price-performance and Synchronized Security for UAE mid-market customers, plus CryptoGuard rollback is genuinely unique. CrowdStrike Falcon leads on cloud-native scale and Threat Graph telemetry; SentinelOne leads on autonomous response. For most UAE mid-market deployments, Sophos Endpoint plus Sophos MDR delivers comparable outcomes at materially lower TCO.",
      },
      {
        question: "Do I need to remove my existing antivirus before deploying Sophos Endpoint?",
        answer:
          "Yes. Running two real-time AV engines causes conflicts and performance loss. Sophos Central includes a Competitor Removal Tool that cleans up most third-party products during agent install. We provide a structured migration plan that minimizes downtime, typically rolling endpoints in waves over one to two weeks.",
      },
      {
        question: "What is the typical Sophos Endpoint deployment lead time in the UAE?",
        answer:
          "Standard mid-market deployments (planning, rollout, policy tuning, training) run two to four weeks. Larger enterprise estates with custom application control and MDR onboarding typically run four to eight weeks. We hold demo tenants for proof of concept and can usually start within five business days.",
      },
      {
        question: "We still run some legacy or end-of-life machines, are they covered?",
        answer:
          "Not under standard Sophos Endpoint licensing. Endpoints and servers running operating systems past their vendor end-of-support date require a separate Sophos Endpoint for Legacy Platforms add-on license. Tell us which OS versions you run during scoping and we will include the correct legacy licensing so those machines are protected rather than left exposed.",
      },
      {
        question: "Does Sophos MDR replace our internal SOC?",
        answer:
          "It depends. Sophos MDR can run fully autonomously (acting on your behalf 24x7) or in a collaboration model where alerts come to your team first. Most UAE customers with no internal SOC choose full delegation; mature security teams choose collaboration. Either way, MDR provides analyst depth that's impossible to staff internally outside the largest enterprises.",
      },
    ],
    whatIs: {
      eyebrow: "What is Sophos Endpoint",
      titlePrefix: "Prevention-first endpoint protection with ",
      titleHighlight: "built-in XDR",
      bodyParagraphs: [
        "Sophos Endpoint (formerly Intercept X) stops threats at multiple layers: a deep-learning neural net classifies files before execution, CryptoGuard rolls back unauthorized encryption, and exploit-prevention blocks the 60+ techniques attackers actually use, regardless of the underlying CVE. The same agent extends into EDR and XDR with live data lake queries and AI-accelerated, guided threat hunting.",
        "Everything runs through Sophos Central, the same cloud console that manages Sophos Firewall, Email, and cloud workloads, with one credential and one alert pipeline. For lean IT teams in the UAE, this replaces three or four vendor portals overnight.",
      ],
      feature: {
        titleLine1: "Synchronized Security",
        titleLine2: "Architecture",
        body: "Endpoint, firewall, email, and cloud share a Security Heartbeat. When the endpoint detects a compromise, the firewall isolates the host automatically, no SOAR playbook required.",
      },
      capabilities: [
        "Deep-learning AI: pre-execution file classification on every endpoint",
        "CryptoGuard: rollback of unauthorized file encryption within seconds",
        "Exploit prevention: 60+ anti-exploit techniques blocking entire attack classes",
        "Synchronized Security: automatic host isolation via Sophos Firewall Heartbeat",
        "Adaptive Attack Protection raises defenses on hosts under active attack",
        "Shadow AI visibility and generative-AI access controls",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Cloud-managed, on-prem, or hybrid: your call.",
      intro: "Artiflex deploys Sophos Endpoint in whichever console model fits your operational and regulatory requirements.",
      options: [
        { icon: "cloud", title: "Cloud-Managed", body: "Vendor-hosted SaaS console with automatic updates and no on-prem infrastructure. Recommended for most UAE customers." },
        { icon: "hardware", title: "On-Premises", body: "Self-hosted management console for customers with data-residency, air-gap, or full-control regulatory requirements." },
        { icon: "virtual", title: "Hybrid / Cloud Workload", body: "Extend the same agent and policy into AWS, Azure, GCP, and Kubernetes workloads alongside your endpoint estate." },
      ],
    },
  },

  "crowdstrike-falcon": {
    slug: "crowdstrike-falcon",
    name: "CrowdStrike Falcon",
    logo: "/logos/CrowdStrike.webp",
    tagline: "Cloud-native EDR with Threat Graph and 24x7 OverWatch managed hunting",
    bestFor: "Best for Cloud-Native EDR at Scale (Recommended)",
    description:
      "CrowdStrike pioneered cloud-native endpoint security with a single lightweight agent that streams telemetry to the Falcon platform, where Threat Graph correlates trillions of events per week across all customers. Falcon is consistently rated a Leader in Gartner EPP and MITRE ATT&CK Evaluations. For UAE enterprises and regulated industries that need top-tier detection at hyperscale, Falcon is the gold standard.",
    keyStats: [],
    whyWinsIntro: {
      label: "CrowdStrike Falcon Insight XDR / Complete MDR Highlights",
      title: "The adversary-intelligence standard. Cloud-native, from day one.",
      description:
        "CrowdStrike pioneered EDR and the adversary-intelligence-driven approach to endpoint security. Falcon's Threat Graph processes trillions of events daily to identify attack patterns invisible to signature-based tools. Its single lightweight agent, consistent cloud-native architecture, and best-in-class analyst console make it the reference platform for enterprise SOC teams.",
      stats: [
        { value: "Minutes", label: "Enterprise-wide agent deployment, no reboots, no infrastructure", tone: "emerald" },
        { value: "3x", label: "Consecutive Gartner Magic Quadrant Leader, furthest right, highest up", tone: "violet" },
        { value: "10GB/day", label: "Free third-party data ingestion via Falcon Next-Gen SIEM", tone: "sky" },
      ],
      outro:
        "CrowdStrike's strongest positioning: the best analyst console in the market, the most mature adversary intelligence library, and the highest SOC team productivity gains per independent benchmarks. Enterprise security teams consistently rate it as the platform that 'just works.'",
    },
    strengths: [
      {
        tag: "Threat Graph",
        icon: "globe",
        tone: "emerald",
        title: "Cloud AI graph that correlates trillions of events in real time",
        desc: "CrowdStrike's Threat Graph is a cloud-based AI graph database that analyses and correlates billions of security events in real time across the entire Falcon customer base, detecting attack patterns that would be impossible to identify from a single organisation's telemetry alone.",
      },
      {
        tag: "Indicators of Attack",
        icon: "eye",
        tone: "violet",
        title: "Adversary-behaviour detection: catch attacks before malware drops",
        desc: "CrowdStrike pioneered Indicators of Attack (IOAs), detecting adversary behaviours like privilege escalation, lateral movement, and credential dumping before any malicious file is ever written to disk. This catches fileless, living-off-the-land, and zero-day attacks that IOC-based tools miss.",
      },
      {
        tag: "XDR AI Investigator",
        icon: "message",
        tone: "sky",
        title: "AI-driven incident triage: turns hours of analysis into minutes",
        desc: "XDR AI Investigator and the Incident Workbench transform how analysts work, focusing on incidents rather than individual alerts, with intelligent entity linking, cross-domain context, and Charlotte AI providing expert-level guidance for analysts of all skill levels.",
      },
      {
        tag: "Real Time Response",
        icon: "monitor",
        tone: "amber",
        title: "Live remote access: remediate any endpoint from anywhere, instantly",
        desc: "Falcon Real Time Response gives security teams a live terminal to any managed endpoint anywhere in the world, enabling process termination, file quarantine, memory forensics, and script execution without disrupting end users or requiring on-site access.",
      },
      {
        tag: "Falcon Complete MDR",
        icon: "users",
        tone: "rose",
        title: "Full-cycle MDR: detection to end-to-end remediation",
        desc: "Falcon Complete MDR goes beyond alerting; CrowdStrike's team takes direct action on your behalf, from initial detection through full remediation. Forrester documents an 80% MTTR reduction and under-six-month payback period, making it one of the most commercially validated MDR services available.",
      },
      {
        tag: "Single Lightweight Agent",
        icon: "server",
        tone: "slate",
        title: "One agent: NGAV, EDR, XDR, identity, firewall, USB control",
        desc: "The entire Falcon platform (next-gen AV, EDR, XDR, host firewall, USB control, and identity protection) runs from a single lightweight agent that deploys in minutes enterprise-wide with no reboot. No agent sprawl, no compatibility conflicts, no performance overhead.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "Large enterprises and regulated industries needing top-tier independently-tested EDR",
      "Cloud-heavy environments running workloads across AWS, Azure, GCP, and Kubernetes",
      "Organizations with 5,000+ endpoints where a single lightweight agent matters operationally",
      "Customers needing 24x7 OverWatch managed threat hunting from elite cross-customer telemetry",
      "Mature SOCs that want a platform to consolidate EDR, identity, cloud, and attack-surface management",
      "UAE banks, energy, and government bodies with the highest threat profile and budget",
      "Buyers planning long-term platform consolidation across endpoint, identity, and cloud",
    ],
    products: [
      { model: "Falcon Go", segment: "Small business", role: "Next-gen AV, device control, USB control" },
      { model: "Falcon Pro", segment: "Mid-market", role: "+ Full EDR, threat intel, host firewall management" },
      { model: "Falcon Enterprise", segment: "Enterprise", role: "+ Threat hunting, OverWatch ELITE, identity protection" },
      { model: "Falcon Premium", segment: "Enterprise SOC", role: "+ Vulnerability management, IT hygiene, OverWatch CORE" },
      { model: "Falcon Complete MDR", segment: "Lean security team", role: "Fully managed: CrowdStrike SOC runs your endpoint estate" },
      { model: "Falcon Cloud Security", segment: "Cloud-native", role: "CWPP, CSPM, CIEM for AWS, Azure, GCP, Kubernetes" },
    ],
    whyArtiflex:
      "Artiflex IT is a CrowdStrike Partner serving the UAE, Oman, and Saudi Arabia. Our engineers are Falcon Certified Administrators and Responders, delivering Falcon end-to-end: tenant design, agent rollout, identity and cloud module onboarding, OverWatch and Falcon Complete enablement, and integration with your SIEM and SOAR. We have hands-on experience migrating Symantec, McAfee, and legacy EDR estates onto Falcon for enterprise customers.",
    faqs: [
      {
        question: "How does CrowdStrike Falcon compare to Sophos Intercept X or Cortex XDR?",
        answer:
          "Falcon is typically the choice when cloud-native scale, Threat Graph cross-customer telemetry, and 24x7 OverWatch hunting are decisive. Sophos Intercept X wins on price-performance and CryptoGuard rollback. Cortex XDR wins on multi-source XDR breadth. We size all three for shortlist customers.",
      },
      {
        question: "Does Falcon work fully without internet connectivity?",
        answer:
          "Falcon is cloud-native, so endpoints periodically check in with the Falcon cloud. Offline protection still works (the agent has local prevention models), but real-time detection, response, and console visibility require connectivity. For air-gapped environments, on-prem alternatives may be a better fit.",
      },
      {
        question: "Is Falcon Complete MDR the same as Sophos MDR?",
        answer:
          "Both are 24x7 managed services with full response authority. Falcon Complete uses the CrowdStrike SOC and tooling; Sophos MDR uses the Sophos SOC. Falcon Complete is typically priced higher and aimed at larger enterprises; Sophos MDR is more accessible to UAE mid-market. Outcomes are broadly comparable.",
      },
      {
        question: "What is the typical Falcon deployment lead time in the UAE?",
        answer:
          "Standard mid-market deployments run two to four weeks (Falcon agent rollout is fast given no reboots and small footprint). Multi-module rollouts adding Identity, Cloud, and OverWatch typically run six to ten weeks. We hold demo Falcon tenants for proof of concept.",
      },
    ],
    whatIs: {
      eyebrow: "What is CrowdStrike Falcon",
      titlePrefix: "Cloud-native EDR with ",
      titleHighlight: "trillions of cross-customer signals",
      bodyParagraphs: [
        "Falcon runs a single lightweight agent (under 50 MB, no reboots, no signatures) that streams metadata to the Falcon cloud. The Threat Graph correlates over 2 trillion events per week from all CrowdStrike customers, surfacing adversary tradecraft within minutes of first observation anywhere in the world.",
        "The platform extends well beyond endpoint into identity protection (Falcon Identity), cloud workload protection (Falcon Cloud), attack-surface discovery (Falcon Surface), and 24x7 managed hunting via OverWatch, all from the same agent and console.",
      ],
      feature: {
        titleLine1: "Falcon",
        titleLine2: "Threat Graph",
        body: "A graph database correlating over 2 trillion events per week from all CrowdStrike customers. New adversary behavior observed anywhere in the world is detectable everywhere in minutes.",
      },
      capabilities: [
        "Single lightweight agent (under 50 MB, no signatures, no reboots)",
        "Threat Graph: 2T+ events per week correlated across all customers",
        "OverWatch: 24x7 elite managed threat hunting included with Premium",
        "Single-console expansion: Identity, Cloud, Surface, Discover modules",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Cloud-managed, on-prem, or hybrid: your call.",
      intro: "Artiflex deploys CrowdStrike Falcon in whichever console model fits your operational and regulatory requirements.",
      options: [
        { icon: "cloud", title: "Cloud-Managed", body: "Vendor-hosted SaaS console with automatic updates and no on-prem infrastructure. Recommended for most UAE customers." },
        { icon: "hardware", title: "On-Premises", body: "Self-hosted management console for customers with data-residency, air-gap, or full-control regulatory requirements." },
        { icon: "virtual", title: "Hybrid / Cloud Workload", body: "Extend the same agent and policy into AWS, Azure, GCP, and Kubernetes workloads alongside your endpoint estate." },
      ],
    },
  },

  "microsoft-defender-endpoint": {
    slug: "microsoft-defender-endpoint",
    name: "Microsoft Defender for Endpoint",
    logo: "/logos/microsoft.svg",
    tagline: "Built into Windows, included with M365 E5, native integration with Sentinel and Entra",
    bestFor: "Best Value for M365 E5 Customers (Recommended)",
    description:
      "Microsoft Defender for Endpoint is built into Windows 10/11 with no separate agent and is included at no additional cost with Microsoft 365 E5 and Defender for Business. Automatic attack disruption contains ransomware in minutes; Defender XDR correlates endpoint, identity, email, and cloud incidents natively; and Security Copilot embeds generative-AI investigation inside the console. For UAE customers already paying for E5, the TCO and consolidation story are difficult to beat.",
    keyStats: [],
    whyWinsIntro: {
      label: "Microsoft Defender for Endpoint / XDR / Experts Highlights",
      title: "The largest security signal on the planet. Automatic attack disruption before harm occurs.",
      description:
        "Microsoft Defender is the only security platform already deployed on the devices your organisation uses every day, with no additional agent to install on Windows. Combined with Microsoft Sentinel, Security Copilot, and the world's broadest threat intelligence signal, Defender XDR is the only platform that can disrupt and predictively shield against active attacks in real time, automatically, with no human required.",
      stats: [
        { value: "3 min", label: "Average time to disrupt ransomware: automatic attack disruption at 99.99% confidence", tone: "emerald" },
        { value: "270K+", label: "Devices saved and 500K compromised accounts disabled by attack disruption in recent months", tone: "violet" },
        { value: "100%", label: "Protection in 2024 MITRE ATT&CK evaluation; Gartner EPP Magic Quadrant Leader 2025", tone: "sky" },
      ],
      outro:
        "Microsoft Defender's decisive advantage for Microsoft-invested organisations: every threat detected anywhere in the Microsoft stack (endpoint, identity, email, cloud) triggers automatic coordinated response across the entire environment. No other vendor can match this level of native integration across the full enterprise attack surface.",
    },
    strengths: [
      {
        tag: "Automatic Attack Disruption",
        icon: "shield",
        tone: "emerald",
        title: "Ransomware contained in 3 minutes: industry-exclusive capability",
        desc: "Automatic attack disruption is exclusive to Microsoft Defender XDR. Powered by AI and cross-domain signals, it identifies active hands-on-keyboard attacks with over 99.99% confidence and autonomously isolates compromised devices, disables compromised accounts, and contains ransomware, all in an average of 3 minutes.",
      },
      {
        tag: "Predictive Shielding",
        icon: "lock",
        tone: "violet",
        title: "Jump ahead of attackers: proactive hardening before the next move",
        desc: "Predictive shielding is a world-first capability: while attack disruption contains a compromised asset, Defender simultaneously predicts the attacker's next likely move and applies just-in-time hardening controls (disabling SafeBoot, enforcing GPOs, restricting sensitive data access) to block those paths before the attacker reaches them.",
      },
      {
        tag: "Security Copilot Agents",
        icon: "message",
        tone: "sky",
        title: "Agentic AI SOC: autonomous triage, hunting, and investigation",
        desc: "Microsoft Security Copilot embeds AI agents directly into Defender, including a Phishing Triage Agent (6.5x more malicious emails caught), Dynamic Threat Detection Agent (proactively hunts for blind spots), and Threat Intelligence Briefing Agent (tailored threat briefings without leaving the incident pane).",
      },
      {
        tag: "Native XDR",
        icon: "layers",
        tone: "amber",
        title: "Endpoint, identity, email, cloud apps: one incident, one pane",
        desc: "Defender XDR natively correlates signals from Defender for Endpoint, Defender for Identity, Defender for Office 365, Defender for Cloud Apps, and Microsoft Sentinel, unifying them into a single incident queue. A malicious file found on an endpoint automatically triggers email scanning and removal across the entire tenant simultaneously.",
      },
      {
        tag: "No Extra Agent on Windows",
        icon: "monitor",
        tone: "rose",
        title: "Already on every Windows device: zero deployment friction",
        desc: "Microsoft Defender Antivirus is built into every modern Windows device. Upgrading to Defender for Endpoint activates EDR, threat hunting, and vulnerability management capabilities on an already-deployed agent, meaning enterprises with large Windows estates can protect every device without a single additional agent installation.",
      },
      {
        tag: "Defender Experts for XDR",
        icon: "users",
        tone: "slate",
        title: "Microsoft-managed MDR: 24/7 expert hunting inside your tenant",
        desc: "Defender Experts for XDR is Microsoft's managed detection and response service. Microsoft's own security analysts monitor your environment 24/7, investigate incidents, and take remediation actions on your behalf directly within your Defender XDR tenant.",
      },
      {
        tag: "Vulnerability Management",
        icon: "barChart",
        tone: "emerald",
        title: "Continuous asset visibility and risk-based patch prioritisation",
        desc: "Defender Vulnerability Management delivers continuous, real-time visibility into vulnerabilities and misconfigurations across every managed endpoint. Risk-based prioritisation ranks exposures by actual exploitability, not just CVSS score, so IT teams focus remediation effort where breach risk is genuinely highest.",
      },
      {
        tag: "Cross-platform + IoT",
        icon: "globe",
        tone: "violet",
        title: "Windows, Linux, macOS, iOS, Android, and IoT: one console",
        desc: "Defender for Endpoint covers Windows, Linux, macOS, iOS, Android, and IoT devices, all managed from the single Microsoft Defender portal. For organisations running mixed-OS environments or deploying OT/IoT devices alongside traditional endpoints, this eliminates the need for separate security products for each platform.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "UAE organisations already licensed on M365 E5 or Defender for Business",
      "Microsoft-standardised estates with Sentinel, Entra, and Intune in production",
      "Windows-heavy fleets where macOS and Linux are a small minority",
      "Teams that want generative-AI investigation through Security Copilot",
      "Organisations consolidating endpoint, identity, email, and cloud security on Microsoft",
      "Buyers wanting the lowest incremental TCO when E5 is already paid for",
      "Mid-market and enterprise customers planning Defender Experts for XDR as managed service",
    ],
    products: [
      { model: "Defender for Business", segment: "SMB (under 300 seats)", role: "EDR for small businesses, simplified console" },
      { model: "Defender for Endpoint Plan 1", segment: "Mid-market", role: "Prevention, basic EDR, attack surface reduction" },
      { model: "Defender for Endpoint Plan 2", segment: "Enterprise", role: "Full EDR, advanced hunting, automated investigation, threat experts" },
      { model: "Microsoft 365 E5", segment: "Enterprise bundle", role: "Includes Plan 2 plus Defender for Office 365, Identity, Cloud Apps" },
      { model: "Microsoft Defender XDR", segment: "Cross-product", role: "Unified XDR portal across endpoint, email, identity, cloud" },
      { model: "Defender Experts for XDR", segment: "Managed", role: "24x7 Microsoft-managed MDR service inside your tenant" },
    ],
    whyArtiflex:
      "Artiflex IT is a Microsoft Partner with certified engineers serving the UAE, Oman, and Saudi Arabia. We deliver Defender for Endpoint end-to-end for Microsoft-standardised customers: SKU eligibility validation against existing licensing, deployment via Intune or Configuration Manager, hardening against Microsoft's published baselines (CIS, ASR rules), Sentinel integration, and Security Copilot enablement. For mixed estates, we benchmark Defender's non-Windows depth honestly so you choose with eyes open.",
    faqs: [
      {
        question: "If I have M365 E5, do I still need a third-party EDR?",
        answer:
          "Often no. Defender for Endpoint Plan 2 is included with E5 and is genuinely strong for Windows-heavy estates inside the Microsoft ecosystem. The cases for adding a third-party EDR are: significant Linux or macOS coverage (CrowdStrike, Sophos go deeper), a SOC team that wants Falcon OverWatch-grade managed hunting, or industry threat profiles where best-in-class detection beats best-in-stack integration.",
      },
      {
        question: "What is the difference between Defender for Business, Plan 1, and Plan 2?",
        answer:
          "Defender for Business is for organisations under 300 seats, simplified console, no advanced hunting. Plan 1 is prevention plus basic EDR. Plan 2 (and E5) adds advanced hunting, automated investigation and remediation, attack disruption, and Microsoft Threat Experts on demand. The Plan 2 features are what most security teams expect of an enterprise EDR.",
      },
      {
        question: "How does Defender for Endpoint protect Linux servers?",
        answer:
          "Through a Defender agent supporting RHEL, CentOS, Ubuntu, Debian, SUSE, Oracle Linux. Coverage includes EDR telemetry, antivirus, and behavioural detection. Depth is workmanlike but lighter than Sophos or CrowdStrike on Linux. For Linux-heavy server estates, validate the specific detection rules and EDR depth before standardising.",
      },
      {
        question: "What is the typical Defender deployment lead time in the UAE?",
        answer:
          "Standard Windows-only deployments can light up in days because no additional agent is required. Multi-product Defender XDR deployments with Sentinel integration typically run four to eight weeks. Artiflex IT confirms licensing, ASR rules, and onboarding order during the design phase.",
      },
    ],
    whatIs: {
      eyebrow: "What is Microsoft Defender for Endpoint",
      titlePrefix: "EDR built into ",
      titleHighlight: "Windows itself",
      bodyParagraphs: [
        "Defender for Endpoint extends Microsoft Defender Antivirus (already on every modern Windows device) into a full enterprise EDR: behavioural detection, automated investigation and remediation, attack surface reduction rules, threat and vulnerability management, and advanced hunting from a single cloud console. There is no separate agent to install on Windows.",
        "Defender XDR then unifies endpoint signals with Defender for Identity, Defender for Office 365, Defender for Cloud Apps, and Microsoft Sentinel in one incident queue. Automatic attack disruption uses cross-domain signals to autonomously contain ransomware and account takeover before analyst review, and Security Copilot embeds generative-AI investigation directly inside the console.",
      ],
      feature: {
        titleLine1: "Defender XDR + Copilot",
        titleLine2: "Architecture",
        body: "Native correlation across endpoint, identity, email, and cloud; automatic attack disruption in minutes; Security Copilot agents for triage, hunting, and threat-intel briefings inside the console.",
      },
      capabilities: [
        "Automatic attack disruption: autonomous containment of ransomware and account takeover",
        "Security Copilot: generative-AI triage, hunting, and reporting inside Defender",
        "Defender XDR: one incident across endpoint, identity, email, cloud apps",
        "No extra agent on Windows: EDR rides on Defender Antivirus already deployed",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Cloud-managed, hybrid, or managed service: your call.",
      intro: "Artiflex deploys Microsoft Defender for Endpoint in whichever model fits your operational and licensing requirements.",
      options: [
        { icon: "cloud", title: "Cloud-Managed", body: "Defender for Endpoint is delivered as a Microsoft cloud service. No on-prem management infrastructure required for most UAE customers." },
        { icon: "hardware", title: "Hybrid / Sovereign", body: "Defender for Endpoint can be co-deployed with Configuration Manager and Intune for hybrid management, and routed via Sentinel workspaces in-region for data-residency requirements." },
        { icon: "virtual", title: "Cloud Workload", body: "Extend the same agent into AWS, Azure, GCP, and Kubernetes workloads through Defender for Cloud alongside your endpoint estate." },
      ],
    },
  },

  "sentinelone-singularity": {
    slug: "sentinelone-singularity",
    name: "SentinelOne Singularity",
    logo: "/logos/SentinelOne.png",
    tagline: "Autonomous AI agent with on-device decisions, Storyline graph, and Purple AI hunting",
    bestFor: "Best for Offline & Autonomous Response (Recommended)",
    description:
      "SentinelOne Singularity is the only major EDR with a fully autonomous agent that detects, decides, and responds locally on the endpoint without a cloud lookup. That makes it uniquely effective on disconnected, roaming, OT, and air-gapped endpoints. The patented Storyline engine reconstructs the entire causal narrative of an attack as a single visual graph, and Purple AI lets analysts run natural-language hunts across the Singularity Data Lake. For UAE customers with field operations, OT, or air-gapped sites, Singularity is the strongest fit.",
    keyStats: [],
    whyWinsIntro: {
      label: "SentinelOne Singularity Endpoint / XDR / MDR Highlights",
      title: "Autonomous AI at machine speed. No humans needed to respond.",
      description:
        "SentinelOne built the world's first endpoint platform on autonomous AI: endpoints that detect, decide, and respond in milliseconds without waiting for a cloud lookup or human approval. Its Singularity platform unifies endpoint, cloud, identity, and data in a single data lake, with Purple AI providing natural language threat hunting accessible to analysts of every skill level.",
      stats: [
        { value: "Milliseconds", label: "Autonomous on-device response, no cloud lookup required, works fully offline", tone: "emerald" },
        { value: "63%", label: "Faster threat detection reported by organisations using Purple AI", tone: "violet" },
        { value: "55%", label: "Reduction in mean time to remediate with Singularity plus Purple AI", tone: "sky" },
      ],
      outro:
        "SentinelOne's defining advantage: the only major endpoint platform whose AI makes autonomous, high-confidence security decisions on the device itself, with no cloud connectivity required for response. Named a Leader in the 2025 Gartner Magic Quadrant for EPP and 2025 Gartner Customers' Choice for XDR.",
    },
    strengths: [
      {
        tag: "Autonomous AI Engine",
        icon: "shield",
        tone: "emerald",
        title: "Endpoints defend and heal themselves: no cloud dependency needed",
        desc: "SentinelOne's on-device behavioural AI makes every security decision locally at machine speed, quarantining files, killing processes, and rolling back changes in milliseconds. Because the AI runs on the endpoint itself, protection is fully maintained even when the device is offline or disconnected from the internet.",
      },
      {
        tag: "1-click Rollback",
        icon: "lock",
        tone: "violet",
        title: "Patented ransomware rollback: undo an entire attack in one action",
        desc: "SentinelOne's patented 1-click rollback reverses all damage caused by a ransomware attack, restoring encrypted files, reversed registry changes, and deleted data directly from the console in a single action. No manual reimaging, no data loss, no extended downtime.",
      },
      {
        tag: "Purple AI",
        icon: "message",
        tone: "sky",
        title: "Natural language threat hunting: ask questions, get instant answers",
        desc: "Purple AI, the industry's first generative AI security analyst, translates plain English into powerful hunting queries across the Singularity data lake. It suggests follow-up questions, recommends next steps, and generates reports automatically, making expert-level investigation accessible to every analyst tier.",
      },
      {
        tag: "Storyline",
        icon: "activity",
        tone: "amber",
        title: "Every event auto-linked: see the complete attack story, not raw alerts",
        desc: "Singularity's patented Storyline technology automatically correlates every process, file, network, and registry event into a coherent, real-time attack narrative. Analysts always see the complete story of an attack, including entry point, propagation, and impacted assets, without manual correlation work.",
      },
      {
        tag: "AI SIEM + SOAR",
        icon: "barChart",
        tone: "rose",
        title: "Next-gen SIEM and hyperautomation: native, not bolted on",
        desc: "SentinelOne's platform includes a next-generation AI SIEM and hyperautomation (SOAR) layer natively, enabling full-scale data ingestion from any source, automated investigation workflows, and auto-triage across the entire enterprise. No separate SIEM product required to achieve full SOC coverage.",
      },
      {
        tag: "Singularity XDR",
        icon: "layers",
        tone: "slate",
        title: "Unified visibility: endpoint, cloud, identity, and data in one lake",
        desc: "Singularity XDR extends protection beyond endpoints to cloud workloads, Kubernetes, identity (ITDR), and data, all feeding into a single unified data lake. Cross-domain telemetry is correlated automatically, exposing multi-stage attacks that span endpoints, cloud, and identity simultaneously.",
      },
      {
        tag: "Vigilance MDR",
        icon: "users",
        tone: "emerald",
        title: "24/7 MDR: autonomous AI and human experts working together",
        desc: "Singularity MDR (Vigilance) uniquely combines autonomous AI response with 24/7 human expert oversight: the AI continues acting at machine speed even while analysts investigate deeper. Expert threat hunters surface evasive threats the AI flags for review, delivering both speed and depth simultaneously.",
      },
      {
        tag: "CNAPP + CWPP",
        icon: "globe",
        tone: "violet",
        title: "Cloud-native app and workload protection: agent and agentless",
        desc: "SentinelOne's cloud security layer covers CNAPP, CSPM, CWPP, CIEM, and AI-SPM, protecting containers, Kubernetes, serverless, and VMs across public, private, and hybrid cloud. Both agent-based and agentless deployment are supported.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "Organisations with significant offline or roaming endpoints (field engineers, sales fleets)",
      "Sites with intermittent or low-bandwidth connectivity that need full local response",
      "Teams that want generative-AI hunting with Purple AI",
      "Buyers consolidating endpoint, identity, and cloud telemetry into a single data lake",
      "Mid-market and enterprise teams that prioritise autonomous response over cloud-first telemetry",
      "OT, critical infrastructure, and air-gapped environments where cloud lookup is not viable",
      "Industries with regulatory constraints on cloud telemetry that benefit from on-agent decisioning",
    ],
    products: [
      { model: "Singularity Core", segment: "NGAV", role: "Static AI plus behavioural prevention" },
      { model: "Singularity Control", segment: "NGAV + controls", role: "+ Device control, firewall control, USB" },
      { model: "Singularity Complete", segment: "Full EDR", role: "+ Storyline, full EDR telemetry, advanced response" },
      { model: "Singularity Commercial", segment: "Enterprise EDR", role: "+ Cloud workload protection and identity" },
      { model: "Singularity XDR", segment: "Enterprise SOC", role: "+ Unified XDR across cloud, identity, data" },
      { model: "Vigilance MDR", segment: "Managed", role: "24x7 monitoring and response on Singularity telemetry" },
    ],
    whyArtiflex:
      "Artiflex IT is a SentinelOne Partner with certified engineers serving the UAE, Oman, and Saudi Arabia. We deliver Singularity end-to-end for customers with field, retail, OT, and remote operations where offline endpoint response is a real requirement: tenant design, agent rollout, structured tuning sprint to manage alert volume, SIEM integration of Singularity telemetry, and Vigilance MDR onboarding for lean teams.",
    faqs: [
      {
        question: "When does SentinelOne win against Sophos or CrowdStrike?",
        answer:
          "When offline or roaming endpoints dominate the fleet, when generative-AI hunting through Purple AI is a board-level requirement, or when you want to consolidate firewall, identity, and cloud telemetry into the Singularity Data Lake instead of a separate SIEM. For purely Windows-on-network estates inside an M365 stack, Defender or Sophos is usually a better fit.",
      },
      {
        question: "How much console tuning does Singularity actually need?",
        answer:
          "Plan for a two to three week tuning sprint after the initial rollout. The work is exclusion engineering against your line-of-business apps and refining custom policies to reduce noise. Once tuned, signal-to-noise is competitive with the rest of the tier-1 EDR segment.",
      },
      {
        question: "Does Vigilance MDR cover the Middle East?",
        answer:
          "Yes, through SentinelOne's global SOC presence. For UAE customers requesting in-region analyst coverage during specific hours, we confirm coverage windows in writing before contracting. For organisations that want a UAE-localised MDR, Sophos MDR's regional depth is currently broader.",
      },
      {
        question: "What is the typical Singularity deployment lead time in the UAE?",
        answer:
          "Standard mid-market deployments run three to four weeks. Multi-tenant rollouts with SIEM integration and Vigilance MDR onboarding typically run six to eight weeks. Artiflex IT runs proof-of-concept tenants during the design phase.",
      },
    ],
    whatIs: {
      eyebrow: "What is SentinelOne Singularity",
      titlePrefix: "Autonomous AI EDR with ",
      titleHighlight: "on-device decisioning",
      bodyParagraphs: [
        "SentinelOne Singularity is the only major endpoint platform whose AI makes autonomous, high-confidence security decisions on the device itself, with no cloud connectivity required for response. The patented Storyline engine then correlates every process, file, network, and registry event into a single causal attack narrative, eliminating manual correlation work for analysts.",
        "Singularity XDR extends the same agent into cloud workloads, Kubernetes, identity (ITDR), and data, with everything feeding the Singularity Data Lake. Purple AI lets analysts pivot through that data in natural language, generating queries, follow-up questions, and reports without writing a single line of query syntax.",
      ],
      feature: {
        titleLine1: "Storyline + Purple AI",
        titleLine2: "Architecture",
        body: "On-device autonomous AI for prevention and response; Storyline causal graph for investigation; Purple AI generative analyst for natural-language hunting across the Singularity Data Lake.",
      },
      capabilities: [
        "Autonomous AI: on-device decisioning works fully offline, no cloud lookup",
        "Storyline: every event auto-correlated into a single causal attack graph",
        "Purple AI: natural-language hunting and report generation across the data lake",
        "1-click rollback: patented ransomware reversal of files, registry, and deleted data",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Cloud-managed, on-prem, or hybrid: your call.",
      intro: "Artiflex deploys SentinelOne Singularity in whichever console model fits your operational and regulatory requirements.",
      options: [
        { icon: "cloud", title: "Cloud-Managed", body: "Vendor-hosted SaaS console with automatic updates and no on-prem infrastructure. Recommended for most UAE customers." },
        { icon: "hardware", title: "On-Premises", body: "Self-hosted management console for customers with data-residency, air-gap, or full-control regulatory requirements." },
        { icon: "virtual", title: "Hybrid / Cloud Workload", body: "Extend the same agent and policy into AWS, Azure, GCP, and Kubernetes workloads alongside your endpoint estate." },
      ],
    },
  },

  "bitdefender-gravityzone": {
    slug: "bitdefender-gravityzone",
    name: "Bitdefender GravityZone",
    logo: "/logos/Bitdefender.png",
    tagline: "Independent-test leader with HyperDetect ML and Anti-Exploit prevention",
    bestFor: "Best for Layered Prevention at Value Pricing (Recommended)",
    description:
      "Bitdefender consistently tops independent EPP test results (AV-Comparatives, AV-Test, SE Labs) year after year, with one of the lowest false-positive rates in the industry. GravityZone combines layered prevention (HyperDetect ML, Anti-Exploit, Process Inspector) with optional EDR, XDR, and 24x7 MDR, all from a single agent. For UAE customers prioritizing prevention quality and value, GravityZone is a leading shortlist option.",
    keyStats: [],
    whyWinsIntro: {
      label: "Bitdefender GravityZone EDR / XDR / MXDR Highlights",
      title: "Prevention-first. The only EDR with automatic cross-endpoint correlation.",
      description:
        "Bitdefender GravityZone consistently ranks first in independent prevention and detection evaluations (AV-Comparatives, AV-TEST, and MITRE ATT&CK) while maintaining the lowest system overhead of any enterprise EDR. Its unique automated cross-endpoint incident correlation sets it apart from every competing platform.",
      stats: [
        { value: "85%", label: "Reduction in incidents with prevention-first approach", tone: "emerald" },
        { value: "50%", label: "Faster incident response with automated cross-endpoint correlation", tone: "violet" },
        { value: "285+", label: "Elite SOC analysts, threat hunters and researchers in global MDR team", tone: "sky" },
      ],
      outro:
        "Bitdefender's competitive edge: the highest independent test scores in the industry, consistently, combined with a system footprint so light that users report no performance impact even on older hardware. Best fit for prevention-focused, budget-aware IT teams.",
    },
    strengths: [
      {
        tag: "Cross-endpoint correlation",
        icon: "layers",
        tone: "emerald",
        title: "The only EDR that automatically correlates incidents across endpoints",
        desc: "GravityZone EDR is the only solution on the market that automatically consolidates related events across multiple endpoints into a single unified incident. Rather than drowning analysts in individual alerts, it assembles the full attack picture automatically.",
      },
      {
        tag: "HyperDetect",
        icon: "eye",
        tone: "violet",
        title: "Tunable machine learning: block threats before execution",
        desc: "HyperDetect uses machine learning to analyse files, scripts, and processes before they execute, catching fileless attacks, polymorphic malware, and script-based threats. Administrators can tune detection aggressiveness per policy without affecting system performance.",
      },
      {
        tag: "GravityZone XDR",
        icon: "globe",
        tone: "sky",
        title: "Native sensors across identity, network, productivity apps, and cloud",
        desc: "GravityZone XDR extends correlation across identity (Active Directory), email/O365, network traffic, and cloud environments using native sensors, not third-party integrations. This makes cross-domain detection faster, more accurate, and far easier to deploy than open XDR approaches.",
      },
      {
        tag: "Incident Advisor",
        icon: "monitor",
        tone: "amber",
        title: "Visual attack chain with guided remediation recommendations",
        desc: "GravityZone's Incident Advisor presents a real-time graphical view of the complete attack chain, from initial entry to lateral movement to impact, with specific remediation recommendations for each step. It turns investigation into something any IT admin can navigate.",
      },
      {
        tag: "PHASR",
        icon: "shield",
        tone: "rose",
        title: "Per-endpoint attack surface hardening: unique to Bitdefender",
        desc: "PHASR dynamically adjusts each endpoint's attack surface based on actual user behaviour and risk profile. Attackers cannot reuse the same playbook because every endpoint responds differently, reducing the attack surface by up to 95%.",
      },
      {
        tag: "MXDR / MDR",
        icon: "users",
        tone: "slate",
        title: "24/7 expert SOC: strongest MDR in 2024 MITRE MDR ATT&CK Evals",
        desc: "Bitdefender MXDR was ranked the strongest performer in MITRE's 2024 MDR ATT&CK Evaluations. With 285+ global SOC analysts, MXDR includes dark web monitoring and proactive threat intelligence for the highest-tier service.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "UAE mid-market and SMB customers prioritizing prevention quality with low false positives",
      "Cost-sensitive enterprise buyers wanting EDR or XDR without top-tier price tags",
      "Healthcare, education, and retail with mixed Windows, macOS, and Linux estates",
      "MSPs managing many SMB tenants who benefit from GravityZone multi-tenant cloud",
      "Customers needing native BitLocker / FileVault orchestration alongside EPP",
      "Organizations with limited security operations capacity that want optional Bitdefender MDR",
      "Buyers who value independent third-party test results as a primary selection criterion",
    ],
    products: [
      { model: "GravityZone Small Business Security", segment: "Under 30 users", role: "EPP with HyperDetect, ransomware mitigation" },
      { model: "GravityZone Business Security", segment: "SMB", role: "EPP, anti-exploit, full disk encryption" },
      { model: "GravityZone Advanced Business Security", segment: "Mid-market", role: "+ Network Attack Defense, Sandbox Analyzer, Risk Analytics" },
      { model: "GravityZone Business Security Enterprise", segment: "Enterprise", role: "+ EDR, incident timeline, threat hunting" },
      { model: "GravityZone XDR", segment: "Enterprise SOC", role: "+ Cloud, identity, network, email sensors in one console" },
      { model: "GravityZone MDR", segment: "Lean teams", role: "24x7 fully managed by Bitdefender SOC" },
    ],
    whyArtiflex:
      "Artiflex IT is a Bitdefender Partner with certified engineers serving the UAE, Oman, and Saudi Arabia. We deliver GravityZone end-to-end: tenant design, HyperDetect tuning, AD and Azure AD integration, BitLocker orchestration, EDR and XDR onboarding, and MDR enablement. We have migrated Symantec, McAfee, Trend Micro, and ESET estates onto GravityZone for SMB and mid-market customers across the UAE.",
    faqs: [
      {
        question: "How does Bitdefender compare to Sophos or CrowdStrike?",
        answer:
          "Bitdefender typically leads on independent third-party prevention test results and offers strong price-performance. Sophos wins on Synchronized Security with firewall and on UAE channel depth. CrowdStrike wins on cloud-native scale and Threat Graph. For prevention-focused mid-market buyers, Bitdefender is a strong shortlist option.",
      },
      {
        question: "Is GravityZone Cloud or on-premise GravityZone better?",
        answer:
          "GravityZone Cloud is right for most UAE customers (managed by Bitdefender, automatic updates, easy multi-site). On-premise GravityZone is offered for customers with data-residency, air-gap, or full-control requirements; common for government and regulated industries. Both share the same agent and feature set.",
      },
      {
        question: "Does Bitdefender include mobile and Linux protection?",
        answer:
          "Yes. GravityZone covers Windows, macOS, Linux (Ubuntu, RHEL, CentOS, Debian, SUSE, Oracle Linux, Amazon Linux, AlmaLinux, Rocky), and mobile devices via GravityZone Security for Mobile. Server and cloud workload protection is included across all platforms.",
      },
      {
        question: "What is the typical GravityZone deployment lead time in the UAE?",
        answer:
          "Standard SMB deployments run one to two weeks. Mid-market and enterprise rollouts with EDR or XDR typically run three to six weeks. Bitdefender's silent installer and existing-AV cleanup tool make rollouts fast compared to many competitors.",
      },
    ],
    whatIs: {
      eyebrow: "What is Bitdefender GravityZone",
      titlePrefix: "Multi-layered endpoint prevention with ",
      titleHighlight: "industry-leading test scores",
      bodyParagraphs: [
        "GravityZone applies more than 30 distinct prevention technologies on every endpoint, including HyperDetect (tunable ML), Anti-Exploit, Process Inspector (behavioural analysis), and Network Attack Defense. The result is consistent top-three rankings in AV-Comparatives Real-World Protection tests, with false-positive rates that are among the lowest in the industry.",
        "The same agent extends into full EDR with incident timeline visualization, then into XDR with cloud, identity, and email sensors, and finally into 24x7 MDR delivered by Bitdefender's SOC. All managed from GravityZone Cloud or on-premise GravityZone.",
      ],
      feature: {
        titleLine1: "Layered Defense-",
        titleLine2: "in-Depth Architecture",
        body: "Over 30 distinct prevention technologies layered on each endpoint, plus optional EDR, XDR, and MDR on the same agent. Consistent top-tier rankings in independent third-party testing.",
      },
      capabilities: [
        "HyperDetect: tunable ML with aggressiveness settings per use case",
        "Anti-Exploit: memory protection blocking weaponized-document techniques",
        "Process Inspector: behavioural analysis catching living-off-the-land",
        "Network Attack Defense: detects lateral movement at the endpoint layer",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Cloud-managed, on-prem, or hybrid: your call.",
      intro: "Artiflex deploys Bitdefender GravityZone in whichever console model fits your operational and regulatory requirements.",
      options: [
        { icon: "cloud", title: "Cloud-Managed", body: "Vendor-hosted SaaS console with automatic updates and no on-prem infrastructure. Recommended for most UAE customers." },
        { icon: "hardware", title: "On-Premises", body: "Self-hosted management console for customers with data-residency, air-gap, or full-control regulatory requirements." },
        { icon: "virtual", title: "Hybrid / Cloud Workload", body: "Extend the same agent and policy into AWS, Azure, GCP, and Kubernetes workloads alongside your endpoint estate." },
      ],
    },
  },

  "trend-micro-vision-one": {
    slug: "trend-micro-vision-one",
    name: "Trend Micro Apex One",
    logo: "/logos/Trend_Micro.svg",
    tagline: "Mature endpoint protection with Zero Day Initiative intelligence and Vision One XDR feed",
    bestFor: "Best for Mature Server Estates (Recommended)",
    description:
      "Trend Micro Apex One is one of the longest-established endpoint protection platforms in the market, with thirty years of threat-research depth, the Zero Day Initiative bug-bounty program, and the Smart Protection Network global telemetry. Apex One layers signature, behavioural, and machine-learning prevention with virtual patching and application control. Telemetry feeds Vision One XDR for cross-source correlation across endpoint, server, email, network, and cloud. For UAE customers with hybrid server estates, manufacturing, and industrial environments, Apex One plus Vision One is the natural choice.",
    keyStats: [],
    whyWinsIntro: {
      label: "Trend Micro Vision One / XDR / Managed XDR Highlights",
      title: "30 years of threat research. Native XDR across every security layer.",
      description:
        "Trend Micro Vision One is one of the most mature XDR platforms in the market, built on 30+ years of threat intelligence from the Smart Protection Network, one of the world's largest security data networks. Its native integration across email, endpoint, server, cloud, and network means correlation happens within Trend Micro's own data fabric, not through external API stitching.",
      stats: [
        { value: "30+", label: "Years of threat research, one of the longest-established security vendors", tone: "emerald" },
        { value: "Native", label: "XDR across email, endpoint, server, network, and cloud: no API stitching", tone: "violet" },
        { value: "24/7", label: "MDR with direct analyst collaboration, not just alerts and reports", tone: "sky" },
      ],
      outro:
        "Trend Micro Vision One's strongest positioning: native XDR depth across email, endpoint, server, network, and cloud, with 30+ years of threat research feeding every detection. Particularly strong for organisations with mature server estates, complex hybrid environments, or heavy email security requirements.",
    },
    strengths: [
      {
        tag: "Smart Protection Network",
        icon: "globe",
        tone: "emerald",
        title: "Global threat intelligence from one of the world's largest security networks",
        desc: "Trend Micro's Smart Protection Network collects and correlates threat intelligence from hundreds of millions of sensors worldwide, combining this global data with local detections to produce higher-fidelity alerts and richer investigation context than single-organisation telemetry.",
      },
      {
        tag: "Vision One Workbench",
        icon: "monitor",
        tone: "violet",
        title: "Attack-centric view: correlated incidents, not disconnected alerts",
        desc: "Vision One's Workbench aggregates and correlates all security events into a unified, attack-centric investigation workspace. Instead of hundreds of individual alerts, analysts see connected incident timelines with root cause analysis, scope, and one-click response options.",
      },
      {
        tag: "Native Email XDR",
        icon: "mail",
        tone: "sky",
        title: "Email is a first-class XDR sensor: not a bolted-on integration",
        desc: "Trend Micro's email security is a native XDR sensor, not an API integration. This means email-based attack chains (phishing to credential theft to lateral movement) are correlated with endpoint and network events in real time, without data normalisation delays or coverage gaps.",
      },
      {
        tag: "Deep Security",
        icon: "server",
        tone: "amber",
        title: "Server and cloud workload protection: virtual, container, and serverless",
        desc: "Trend Micro Deep Security protects cloud workloads, containers, and virtual machines with a purpose-built agent, feeding server telemetry into Vision One XDR for unified correlation. Particularly strong for hybrid organisations running significant on-premises server estates alongside cloud.",
      },
      {
        tag: "Zero Trust ZTNA",
        icon: "lock",
        tone: "rose",
        title: "Zero Trust Secure Access integrated into Vision One",
        desc: "Trend Micro Vision One includes Zero Trust Network Access as part of the platform, enforcing continuous identity and device posture verification for application access. Security posture metrics are visible across the same Workbench console as threat detections, giving a unified risk view.",
      },
      {
        tag: "Managed XDR",
        icon: "users",
        tone: "slate",
        title: "MDR analysts collaborate directly with your team during investigations",
        desc: "Trend Micro Managed XDR gives customers direct access to their MDR analysts during active investigations, not just incident reports and recommendations. Analysts create custom cleanup tools and sweep the environment post-incident to prevent resurgence, with detailed executive reporting included.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "UAE manufacturing, oil and gas, energy with hybrid server estates and OT-adjacent IT",
      "Organisations adopting full Vision One XDR across endpoint, server, email, network, cloud",
      "Cloud-heavy estates wanting Cloud One workload protection in the same platform",
      "Buyers prioritising Zero Day Initiative intelligence and virtual patching for unpatched endpoints",
      "Mature SOC teams that will exploit Vision One's cross-source investigation depth",
      "Customers wanting application allowlisting on high-value servers and kiosks",
      "Multi-site enterprises that need consistent prevention across on-prem and SaaS deployments",
    ],
    products: [
      { model: "Apex One On-Prem", segment: "Self-managed", role: "Core EDR with NGAV, exploit prevention, behavioural detection" },
      { model: "Apex One as a Service", segment: "SaaS", role: "Cloud-managed Apex One with auto-update and global telemetry" },
      { model: "Vision One Endpoint", segment: "XDR endpoint module", role: "Apex One telemetry feeding Vision One correlation" },
      { model: "Vision One XDR", segment: "Cross-source XDR", role: "Endpoint, server, network, identity, email, cloud telemetry" },
      { model: "Cloud One", segment: "Cloud workload", role: "AWS, Azure, GCP, containers, serverless, file storage" },
      { model: "Trend Service One MDR", segment: "Managed", role: "24x7 monitoring and response on Vision One telemetry" },
    ],
    whyArtiflex:
      "Artiflex IT is a Trend Micro Partner with certified engineers serving the UAE, Oman, and Saudi Arabia. We deliver Apex One end-to-end for industrial, energy, and manufacturing customers with hybrid server estates: on-prem or SaaS console design, agent rollout, virtual patching policy authoring, application control allowlisting on high-value endpoints, and Vision One XDR integration for cross-source investigation. We have migrated McAfee, Symantec, and legacy AV estates onto Apex One for mature server-heavy environments.",
    faqs: [
      {
        question: "When does Apex One win against Sophos or CrowdStrike?",
        answer:
          "When you have a mature hybrid server estate and want Vision One XDR's cross-source correlation across endpoint, server, email, network, and cloud, or when virtual patching for unpatched endpoints is decisive (legacy OS, regulated change windows). For pure endpoint-only requirements on modern Windows fleets, Sophos and CrowdStrike are tighter fits.",
      },
      {
        question: "Is Apex One available as SaaS, or only on-prem?",
        answer:
          "Both. Apex One as a Service is the cloud-managed SaaS console (vendor-hosted, auto-update); Apex One On-Prem is the self-managed deployment for data-residency or air-gap requirements. The agent is consistent across both deployments.",
      },
      {
        question: "How does Apex One protect Linux and macOS?",
        answer:
          "Apex One Server protects Linux servers (RHEL, CentOS, Ubuntu, SUSE) and macOS endpoints, with coverage focused on prevention, virtual patching, and behavioural detection. For Linux-heavy estates with deep EDR requirements, validate the specific telemetry depth alongside Sophos or CrowdStrike during the design phase.",
      },
      {
        question: "What is the typical Apex One deployment lead time in the UAE?",
        answer:
          "Standard mid-market deployments run three to four weeks. Multi-site rollouts with Vision One XDR integration and virtual patching policy authoring typically run six to eight weeks. Artiflex IT runs proof-of-concept tenants during the design phase.",
      },
    ],
    whatIs: {
      eyebrow: "What is Trend Micro Apex One",
      titlePrefix: "Mature endpoint protection with ",
      titleHighlight: "Vision One XDR feed",
      bodyParagraphs: [
        "Apex One layers signature detection, behavioural monitoring, machine-learning prevention, virtual patching, and application control into a single agent. Smart Protection Network global telemetry and Zero Day Initiative vulnerability research drive detection content. Virtual patching shields unpatched endpoints from known exploits at the host level, a long-standing strength for regulated industries and OT-adjacent IT.",
        "Apex One telemetry feeds the Vision One Workbench for cross-source XDR correlation across endpoint, server, email, network, and cloud. Email-based attack chains, lateral movement, and credential abuse are correlated in real time, without data normalisation delays or coverage gaps.",
      ],
      feature: {
        titleLine1: "Smart Protection +",
        titleLine2: "Vision One Architecture",
        body: "Signature, behavioural, ML, virtual patching, and application control on the agent; Smart Protection Network for global threat intelligence; Vision One XDR for cross-source investigation.",
      },
      capabilities: [
        "Smart Protection Network: global telemetry from hundreds of millions of sensors",
        "Virtual Patching: IPS-style host shielding for unpatched endpoints",
        "Predictive Machine Learning: real-time analysis of unknown files",
        "Vision One XDR feed: endpoint correlated with server, email, network, cloud",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Cloud-managed, on-prem, or hybrid: your call.",
      intro: "Artiflex deploys Trend Micro Apex One in whichever console model fits your operational and regulatory requirements.",
      options: [
        { icon: "cloud", title: "Cloud-Managed (SaaS)", body: "Apex One as a Service: vendor-hosted SaaS console with automatic updates and no on-prem infrastructure. Recommended for most UAE customers." },
        { icon: "hardware", title: "On-Premises", body: "Apex One On-Prem: self-hosted management console for customers with data-residency, air-gap, or full-control regulatory requirements." },
        { icon: "virtual", title: "Hybrid / Cloud Workload", body: "Extend Apex One alongside Cloud One for AWS, Azure, GCP, container, and serverless workload protection with one telemetry pipeline." },
      ],
    },
  },

  "check-point-harmony": {
    slug: "check-point-harmony",
    name: "Check Point Harmony Endpoint",
    logo: "/logos/Check-Point-2024-logo-color.svg",
    tagline: "ThreatCloud AI prevention with Anti-Ransomware and Forensic Recorder",
    bestFor: "Strong Choice for Check Point Estates (Recommended)",
    description:
      "Check Point Harmony Endpoint shares the ThreatCloud AI prevention engine with Quantum firewalls and Harmony Email, giving Check Point estates a single threat catalogue across perimeter, email, and endpoint. Anti-Ransomware with quarantine and rollback, Forensic Recorder, Anti-Bot, full disk encryption, and posture management are built into one agent managed from the Infinity Portal. For UAE customers already standardised on Check Point at the gateway, Harmony Endpoint is the natural answer.",
    keyStats: [],
    whyWinsIntro: {
      label: "Check Point Harmony Endpoint Highlights",
      title: "The endpoint pillar of Check Point Infinity",
      description:
        "Harmony Endpoint is at its strongest when Quantum protects the perimeter and Harmony Email handles cloud mail. Real-time IoC sharing across all three pillars closes detection gaps without analyst pivots. In mixed-vendor environments, CrowdStrike, SentinelOne, or Sophos Intercept X typically deliver deeper endpoint-only telemetry.",
      stats: [
        { value: "ThreatCloud AI", label: "shared intelligence across firewall, email, and endpoint", tone: "emerald" },
        { value: "Built-in", label: "full disk encryption, posture management, and removable-media control", tone: "violet" },
        { value: "Infinity", label: "unified portal across Quantum, Harmony Email, and Harmony Endpoint", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "ThreatCloud AI",
        icon: "globe",
        tone: "emerald",
        title: "Shared prevention engine across Check Point",
        desc: "ThreatCloud AI aggregates telemetry from Check Point's global customer base and feeds verdicts to every Quantum gateway, Harmony Email tenant, and Harmony Endpoint agent. New IoCs propagate in minutes, not signature cycles, giving Check Point estates one consistent verdict source.",
      },
      {
        tag: "Anti-Ransomware",
        icon: "lock",
        tone: "violet",
        title: "Behavioural detection with rollback",
        desc: "Anti-Ransomware watches for mass-encryption and shadow-copy-deletion patterns, quarantines the offending process, and rolls back encrypted files using protected snapshots. Effective against fresh ransomware families before signatures are available.",
      },
      {
        tag: "Forensic Recorder",
        icon: "activity",
        tone: "sky",
        title: "Always-on process timeline for incident response",
        desc: "Forensic Recorder continuously logs process executions, registry changes, network connections, and file events on every endpoint. When an incident is declared, analysts can reconstruct exactly what happened across the attack chain without re-running tools.",
      },
      {
        tag: "Anti-Bot",
        icon: "shield",
        tone: "amber",
        title: "Detect command and control on the endpoint",
        desc: "Anti-Bot inspects outbound traffic for C2 callback patterns identified by ThreatCloud, catching infected endpoints that beacon out even when the initial malware was not detected. Complements network-layer Anti-Bot on Quantum gateways.",
      },
      {
        tag: "Full Disk Encryption",
        icon: "lock",
        tone: "rose",
        title: "Built-in encryption and media control",
        desc: "FDE, removable-media encryption, and port control ship as part of Harmony Endpoint, avoiding a separate encryption product. Important for UAE banking, healthcare, and government where device-level encryption is a baseline compliance requirement.",
      },
      {
        tag: "Posture Management",
        icon: "barChart",
        tone: "slate",
        title: "Continuous endpoint posture and policy compliance",
        desc: "Posture Management continuously assesses every endpoint against configurable compliance baselines (OS patch level, AV state, disk encryption, firewall status) and reports drift to the Infinity Portal for remediation.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "UAE organisations standardised on Check Point Quantum at the perimeter",
      "Check Point Harmony Email customers wanting cross-product IoC sharing",
      "Regulated industries needing built-in full disk encryption (banking, healthcare, government)",
      "Buyers that value ThreatCloud AI as a shared catalogue across firewall, email, and endpoint",
      "Teams operating Check Point Infinity as a unified perimeter, email, and endpoint architecture",
      "Organisations preferring a single vendor relationship across network, email, and endpoint",
      "Mid-market and enterprise SOCs that want Forensic Recorder data on every endpoint by default",
    ],
    products: [
      { model: "Harmony Endpoint Basic", segment: "NGAV", role: "Anti-malware, anti-bot, behavioural guard" },
      { model: "Harmony Endpoint Advanced", segment: "EDR", role: "+ Anti-Ransomware, Forensic Recorder, full disk encryption" },
      { model: "Harmony Endpoint Complete", segment: "Full EDR/XDR", role: "+ Posture management, advanced EDR/XDR, Threat Hunting" },
      { model: "Harmony Endpoint Elite", segment: "Enterprise SOC", role: "+ Premium support, advanced ThreatCloud feeds" },
      { model: "Infinity Portal", segment: "Unified management", role: "One console for Quantum, Harmony Email, Harmony Endpoint" },
      { model: "ThreatCloud AI", segment: "Threat intel", role: "Shared intelligence across all Check Point products globally" },
    ],
    whyArtiflex:
      "Artiflex IT is a Check Point Partner with certified engineers serving the UAE, Oman, and Saudi Arabia. We deliver Harmony Endpoint inside Check Point estates across financial services, government, and large enterprise: Infinity Portal design, Harmony Endpoint agent rollout, Forensic Recorder enablement, Anti-Ransomware tuning, and ThreatCloud integration with Quantum gateways and Harmony Email. For organisations on Check Point at the perimeter, Harmony Endpoint is the lowest-friction path to a unified prevention architecture.",
    faqs: [
      {
        question: "Should I pick Harmony Endpoint over Sophos Intercept X or CrowdStrike?",
        answer:
          "If you are on Check Point Quantum and Harmony Email, Harmony Endpoint usually wins because of Infinity (one policy, one threat catalogue, real-time IoC sharing across firewall, email, endpoint). If you are not on Check Point at the perimeter, Sophos Intercept X wins on price-performance and CrowdStrike wins on EDR depth.",
      },
      {
        question: "Does Harmony Endpoint cover macOS and Linux?",
        answer:
          "Yes. macOS coverage is solid with full prevention and EDR. Linux coverage is tactical for server protection. For Linux-heavy estates with deep server EDR requirements, validate the specific telemetry depth against CrowdStrike or Sophos before standardising.",
      },
      {
        question: "Does Harmony Endpoint replace a separate encryption product?",
        answer:
          "For most UAE customers, yes. FDE, removable-media encryption, and port control are part of Harmony Endpoint and meet baseline compliance for banking, healthcare, and government. Customers with specific BitLocker or third-party key-management requirements should validate during design.",
      },
      {
        question: "What is the typical Harmony Endpoint deployment lead time in the UAE?",
        answer:
          "Standard mid-market deployments run three to four weeks. Multi-product Infinity deployments adding Quantum and Harmony Email integration typically run six to ten weeks. Artiflex IT runs proof-of-concept tenants on the Infinity Portal during the design phase.",
      },
    ],
    whatIs: {
      eyebrow: "What is Check Point Harmony Endpoint",
      titlePrefix: "EDR built on ",
      titleHighlight: "Check Point Infinity",
      bodyParagraphs: [
        "Check Point Harmony Endpoint runs ThreatCloud AI prevention on every endpoint, alongside Anti-Ransomware with rollback, Anti-Bot, Forensic Recorder, full disk encryption, and posture management. Detection verdicts are shared in real time with Quantum gateways and Harmony Email through the same ThreatCloud catalogue, so a threat seen anywhere on the Check Point estate is blocked everywhere within minutes.",
        "The Infinity Portal is the single management console for Quantum, Harmony Email, and Harmony Endpoint, with one policy framework, one identity layer, and one audit trail. For Check Point estates, this is the operational payoff of standardising on a single vendor.",
      ],
      feature: {
        titleLine1: "Infinity ThreatCloud",
        titleLine2: "Architecture",
        body: "ThreatCloud AI shares verdicts across Quantum firewalls, Harmony Email, and Harmony Endpoint in real time, with Infinity Portal as one console for policy, identity, and audit.",
      },
      capabilities: [
        "ThreatCloud AI: shared intelligence across firewall, email, and endpoint",
        "Anti-Ransomware: behavioural detection with file rollback from protected snapshots",
        "Forensic Recorder: always-on process timeline for incident response",
        "Infinity Portal: unified management for Quantum, Harmony Email, Harmony Endpoint",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Cloud-managed, on-prem, or hybrid: your call.",
      intro: "Artiflex deploys Check Point Harmony Endpoint in whichever console model fits your operational and regulatory requirements.",
      options: [
        { icon: "cloud", title: "Cloud-Managed", body: "Vendor-hosted Infinity Portal with automatic updates and no on-prem infrastructure. Recommended for most UAE customers." },
        { icon: "hardware", title: "On-Premises", body: "Self-hosted Endpoint Management Server for customers with data-residency, air-gap, or full-control regulatory requirements." },
        { icon: "virtual", title: "Hybrid / Cloud Workload", body: "Extend the same agent and policy into AWS, Azure, GCP, and Kubernetes workloads alongside your endpoint estate." },
      ],
    },
  },

  "palo-alto-cortex-xdr": {
    slug: "palo-alto-cortex-xdr",
    name: "Palo Alto Cortex XDR",
    logo: "/logos/PaloAltoNetworks.svg",
    tagline: "True XDR with behavioral analytics across endpoint, network, cloud, and identity",
    bestFor: "Best for True XDR Integration (Recommended)",
    description:
      "Cortex XDR was the first product to combine endpoint, network, cloud, and identity telemetry in one data lake and one detection engine. Behavioral analytics and ML stitch causally-linked events into single incidents, dramatically reducing alert noise. For UAE enterprises standardizing on the Palo Alto Networks platform (firewall plus SASE plus XDR), Cortex XDR is the natural endpoint pillar.",
    keyStats: [],
    whyWinsIntro: {
      label: "Palo Alto Cortex XDR / XSIAM Highlights",
      title: "Six years of MITRE dominance. 99% prevention. The SOC platform of the future.",
      description:
        "Cortex XDR is the endpoint security arm of Palo Alto's Cortex platform, purpose-built for enterprises that need the highest verifiable prevention rate, the deepest WildFire integration, and a path toward full SOC automation through XSIAM.",
      stats: [
        { value: "99%", label: "Prevention rate in 2025 AV-Comparatives EPR test, only market leader to hit this", tone: "emerald" },
        { value: "100%", label: "Detection in MITRE ATT&CK Evaluations Round 6, no delays, no config changes", tone: "violet" },
        { value: "98%", label: "Alert volume reduction through intelligent alert grouping", tone: "sky" },
      ],
      outro:
        "Cortex XDR's key differentiator for enterprise: it's not just an endpoint tool, it's the foundation for XSIAM, Palo Alto's AI-driven SOC platform. Organisations investing in Cortex XDR today are also future-proofing their SOC for autonomous operations.",
    },
    strengths: [
      {
        tag: "WildFire AI",
        icon: "shield",
        tone: "emerald",
        title: "Cloud-delivered prevention powered by global WildFire intelligence",
        desc: "Every unknown file is evaluated against WildFire, the world's largest cloud-based threat analysis service. Local ML models, trained on WildFire data, deliver near-instant verdicts on millions of file attributes without sending traffic to the cloud on every scan.",
      },
      {
        tag: "Behavioural Analytics",
        icon: "activity",
        tone: "violet",
        title: "Root cause analysis: full attack chain reconstruction automatically",
        desc: "When Cortex XDR detects a threat, it automatically reconstructs the complete attack narrative: how it entered, how it spread, which assets were affected, so analysts always understand scope and impact before deciding response actions.",
      },
      {
        tag: "Cross-domain XDR",
        icon: "layers",
        tone: "sky",
        title: "Endpoint, network, cloud, identity: correlated in one data lake",
        desc: "Cortex XDR unifies data from endpoint, network, cloud, and identity into a single data lake. 84% of attacks span multiple vectors; Cortex XDR surfaces them by connecting dots that siloed tools never see.",
      },
      {
        tag: "AgentiX AI",
        icon: "sliders",
        tone: "amber",
        title: "Agentic AI security analysts: autonomous triage and investigation",
        desc: "Cortex XDR 5.0 embeds AgentiX, a fleet of AI agents that autonomously triage alerts, enrich incidents, and execute containment actions 24/7. Human analysts retain approval authority for high-impact actions, with a full audit trail for every AI decision.",
      },
      {
        tag: "Endpoint DLP",
        icon: "lock",
        tone: "rose",
        title: "On-device data classification: enforced even offline",
        desc: "Cortex XDR's Endpoint DLP classifies sensitive data directly on the device, never sending it to an external scanner. Classification and enforcement work even when the endpoint is offline, turning policy violations into coaching moments rather than just blocks.",
      },
      {
        tag: "Unit 42 MDR",
        icon: "users",
        tone: "slate",
        title: "Managed by the world's most decorated threat intelligence team",
        desc: "Cortex MDR is delivered by Unit 42, Palo Alto's elite threat intelligence and incident response team, responsible for uncovering some of the most significant nation-state attacks in recent history. For organisations under active threat, this is the highest-calibre MDR available.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "Large enterprises and regulated industries with mature SOCs that need true XDR, not endpoint-only EDR",
      "Customers already standardizing on Palo Alto Networks (firewall, Prisma, Cortex) as a strategic platform",
      "Organizations consolidating SIEM, SOAR, EDR, and ASM into a single platform (XSIAM upgrade path)",
      "UAE enterprises with dedicated threat-hunting teams that benefit from Unit 42 managed hunting",
      "Customers with hybrid identity (AD plus Azure AD plus Okta) needing unified identity-threat detection",
      "Cloud-heavy environments needing endpoint, container, and cloud workload protection in one console",
      "Buyers willing to invest more for top-tier detection quality and a long-term platform commitment",
    ],
    products: [
      { model: "Cortex XDR Prevent", segment: "SMB / branch", role: "Next-gen AV, exploit prevention, USB and host firewall" },
      { model: "Cortex XDR Pro per endpoint", segment: "Mid-market", role: "+ EDR, behavioral analytics, threat hunting, causality" },
      { model: "Cortex XDR Pro per TB", segment: "Enterprise", role: "Pro plus third-party log ingestion priced by data volume" },
      { model: "Cortex XDR Pro with Managed Threat Hunting", segment: "Enterprise SOC", role: "+ Unit 42 24x7 managed threat hunting" },
      { model: "Cortex Xpanse + XDR", segment: "Large enterprise", role: "+ Attack-surface management correlated with XDR detections" },
      { model: "Cortex XSIAM", segment: "Mature SOC", role: "Full AI-powered SOC: SIEM, SOAR, ASM, EDR on one platform" },
    ],
    whyArtiflex:
      "Artiflex IT is a Palo Alto Networks NextWave Partner with PCNSE-certified engineers serving the UAE, Oman, and Saudi Arabia. We deliver Cortex XDR end-to-end: agent rollout, third-party data source onboarding, behavioral analytics tuning, integration with Panorama and Prisma Access, and an upgrade path to XSIAM when your SOC is ready. We've migrated multi-vendor SIEM and EDR estates onto Cortex for banking and government customers.",
    faqs: [
      {
        question: "How does Cortex XDR differ from CrowdStrike Falcon or Sophos Intercept X?",
        answer:
          "Cortex XDR is built as a true XDR from day one, ingesting endpoint plus network plus identity plus cloud in one data lake. CrowdStrike Falcon is the strongest pure-EDR with cloud-native scale; Sophos wins on price-performance and Synchronized Security. Choose Cortex when XDR breadth and platform consolidation are decisive.",
      },
      {
        question: "Is Cortex XSIAM a replacement for our SIEM?",
        answer:
          "Yes, that's the design intent. XSIAM replaces SIEM, SOAR, ASM, and EDR with one AI-driven platform. Migrations typically run six to twelve months as use cases are ported and detection content is re-built. We provide a structured XSIAM readiness assessment and migration playbook.",
      },
      {
        question: "Does Cortex XDR work without other Palo Alto products?",
        answer:
          "Yes. Cortex XDR is fully standalone and ingests data from 30+ non-Palo Alto sources (Microsoft 365, Okta, AWS, etc.). However, customers who also run Palo Alto firewalls or Prisma Access get richer correlation, especially for lateral movement and command-and-control detection.",
      },
      {
        question: "What is the typical Cortex XDR deployment lead time in the UAE?",
        answer:
          "Standard mid-market deployments run four to six weeks. Multi-tenant rollouts with third-party log ingestion and Unit 42 onboarding typically run six to twelve weeks. We hold demo Cortex tenants for proof of concept and can usually start within five business days.",
      },
    ],
    whatIs: {
      eyebrow: "What is Palo Alto Cortex XDR",
      titlePrefix: "Endpoint security as part of a ",
      titleHighlight: "true XDR platform",
      bodyParagraphs: [
        "Cortex XDR runs a lightweight agent on endpoints, servers, and cloud workloads, then ingests data from Palo Alto firewalls, Prisma Access, identity providers, and 30+ third-party sources into a single data lake. Behavioral analytics (over 1,000 detectors) and ML models surface high-fidelity incidents instead of low-context alerts.",
        "Cortex XSIAM extends the same platform into a full SOC operating system, with built-in SOAR, attack-surface management, and AI triage. For mature security operations centers, Cortex represents a strategic platform play, not just an endpoint product.",
      ],
      feature: {
        titleLine1: "Cortex Data Lake",
        titleLine2: "Architecture",
        body: "One data lake ingests endpoint, network, cloud, identity, and third-party telemetry. ML and behavioral analytics stitch events into causally-linked incidents instead of flat alerts.",
      },
      capabilities: [
        "Lightweight Cortex XDR agent for endpoint, server, and cloud workloads",
        "1,000+ behavioral analytics detectors with MITRE ATT&CK alignment",
        "Stitched incidents: causally-linked events surfaced as one alert, not many",
        "XSIAM upgrade path: SOAR, ASM, and AI-powered triage on the same data",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Cloud-managed, on-prem, or hybrid: your call.",
      intro: "Artiflex deploys Palo Alto Cortex XDR in whichever console model fits your operational and regulatory requirements.",
      options: [
        { icon: "cloud", title: "Cloud-Managed", body: "Vendor-hosted SaaS console with automatic updates and no on-prem infrastructure. Recommended for most UAE customers." },
        { icon: "hardware", title: "On-Premises", body: "Self-hosted management console for customers with data-residency, air-gap, or full-control regulatory requirements." },
        { icon: "virtual", title: "Hybrid / Cloud Workload", body: "Extend the same agent and policy into AWS, Azure, GCP, and Kubernetes workloads alongside your endpoint estate." },
      ],
    },
  },

  "eset-protect": {
    slug: "eset-protect",
    name: "ESET PROTECT",
    logo: "/logos/ESET.svg",
    tagline: "Lightweight, low-false-positive prevention with mature signatures plus ML",
    bestFor: "Best for Lightweight Footprint (Recommended)",
    description:
      "ESET has a 30-year reputation for combining mature signature-based prevention with modern ML, while maintaining one of the lightest endpoint footprints in the industry. ESET PROTECT layers in EDR (Inspect), MDR, and full disk encryption from a single cloud console. For UAE SMBs and mid-market customers prioritizing low system impact and quiet endpoint operations, ESET is a credible specialist choice.",
    keyStats: [],
    whyWinsIntro: {
      label: "ESET PROTECT Platform / Inspect XDR / MDR Ultimate Highlights",
      title: "Transparent detection logic. Exceptional performance. Built for lean IT teams.",
      description:
        "ESET has protected organisations since 1987 and holds a unique philosophy: EDR logic should be visible and customisable, not a black box. ESET PROTECT's layered LiveSense technology, combined with ESET Inspect's open detection rules, makes it ideal for IT teams that want to understand and control their security rather than simply trust a vendor's algorithm.",
      stats: [
        { value: "35+", label: "Years of endpoint security expertise, one of the most established vendors", tone: "emerald" },
        { value: "Lowest", label: "Network bandwidth consumption of all enterprise endpoint agents", tone: "violet" },
        { value: "Open", label: "EDR detection logic: transparent rules that teams can inspect and customise", tone: "sky" },
      ],
      outro:
        "ESET's strongest positioning: the vendor of choice for organisations that prioritise system performance, deployment simplicity, and transparent security, especially in education, government, and regulated industries with strict compliance and on-premises deployment requirements.",
    },
    strengths: [
      {
        tag: "ESET LiveSense",
        icon: "layers",
        tone: "emerald",
        title: "Multi-layered AI: six complementary technologies working together",
        desc: "ESET LiveSense combines machine learning, behavioural analysis, reputation system (LiveGrid), exploit blocking, ransomware shield, and network protection into a unified multi-layer engine. Each layer reinforces the others, ensuring threats that evade one technology are caught by another.",
      },
      {
        tag: "ESET Inspect (XDR)",
        icon: "eye",
        tone: "violet",
        title: "Transparent, customisable XDR: open detection logic, no black box",
        desc: "ESET Inspect is the cloud-delivered XDR module for ESET PROTECT. Its open rule set lets security teams view, understand, and customise every detection logic, a fundamentally different philosophy from vendors whose AI is opaque. IT admins actively participate in what constitutes a threat.",
      },
      {
        tag: "LiveGrid Reputation",
        icon: "globe",
        tone: "sky",
        title: "Cloud reputation system: billions of samples, near-zero latency verdict",
        desc: "ESET LiveGrid evaluates every file against a real-time reputation database built from billions of samples across ESET's global install base. First-seen files receive an immediate cloud reputation verdict, bridging the gap between zero-day threats and local AI detection.",
      },
      {
        tag: "Ransomware Shield",
        icon: "lock",
        tone: "amber",
        title: "Behaviour-based ransomware detection: blocks unknown strains",
        desc: "ESET Ransomware Shield monitors and evaluates all applications against known ransomware behaviours. It detects and blocks ransomware based on what the process does, not what it looks like, catching entirely new ransomware families that have never appeared in any threat database.",
      },
      {
        tag: "ESET PROTECT Console",
        icon: "monitor",
        tone: "rose",
        title: "Single console: endpoint, server, mobile, cloud, MFA, patch management",
        desc: "ESET PROTECT consolidates endpoint security, server protection, mobile device management, cloud workload protection, full disk encryption, multi-factor authentication, and patch management into a single cloud or on-premises console, reducing tool sprawl for lean IT teams.",
      },
      {
        tag: "MDR Ultimate",
        icon: "users",
        tone: "slate",
        title: "24/7 managed service with ESET's own analysts: cloud or on-prem",
        desc: "ESET PROTECT MDR Ultimate combines XDR, comprehensive EPP, and 24/7 expert-managed detection and response, available as both cloud-delivered and on-premises deployments. This makes ESET one of the few MDR vendors that can serve organisations with strict data residency requirements.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "UAE SMBs prioritizing endpoint performance and battery life on laptop fleets",
      "Education, clinics, and small public sector where lightweight operation matters",
      "Customers with older Windows hardware where heavyweight EPP agents are unviable",
      "Linux-heavy server estates needing mature, well-tuned Linux endpoint protection",
      "Buyers wanting a single-vendor stack of EPP, EDR, mail security, and disk encryption",
      "Cost-sensitive SMB buyers who still want the option of 24x7 ESET MDR on Elite tier",
      "MSPs in the UAE managing many smaller customers via ESET multi-tenant PROTECT Cloud",
    ],
    products: [
      { model: "ESET PROTECT Entry", segment: "SMB", role: "EPP, mobile management, file server security" },
      { model: "ESET PROTECT Advanced", segment: "SMB / mid-market", role: "+ Full disk encryption, advanced threat defense (sandbox)" },
      { model: "ESET PROTECT Complete", segment: "Mid-market", role: "+ Mail security, cloud app protection" },
      { model: "ESET PROTECT Elite", segment: "Mid-market / SOC", role: "+ EDR (Inspect), MDR, vulnerability and patch management" },
      { model: "ESET PROTECT MDR", segment: "Lean teams", role: "ESET-managed MDR on top of PROTECT Elite, 24x7" },
      { model: "ESET PROTECT MDR Ultimate", segment: "Enterprise", role: "Premium MDR with full incident response engagement" },
    ],
    whyArtiflex:
      "Artiflex IT is an ESET Partner with certified engineers serving the UAE, Oman, and Saudi Arabia. We deliver ESET PROTECT end-to-end for SMB and mid-market customers: tenant design, lightweight agent rollout, HIPS rule authoring, encryption orchestration, and EDR / MDR onboarding on the Elite tier. We have migrated Symantec, McAfee, and legacy free AV estates onto ESET for clinics, schools, and SMBs across the UAE.",
    faqs: [
      {
        question: "How does ESET compare to Bitdefender or Sophos for SMB?",
        answer:
          "ESET typically wins on lightweight footprint and low false positives, with mature signature detection. Bitdefender wins on independent prevention test scores; Sophos wins on Synchronized Security and channel depth. For UAE SMBs prioritizing performance on older hardware, ESET is a strong specialist choice.",
      },
      {
        question: "Is ESET still relevant in the age of EDR and XDR?",
        answer:
          "Yes. ESET Inspect provides full EDR on the same lightweight agent, with ESET MDR adding 24x7 managed response on the Elite tier. The lineup is competitive in the SMB and mid-market segment, particularly where operational simplicity and low system impact matter.",
      },
      {
        question: "Does ESET PROTECT support cloud deployment?",
        answer:
          "Yes. ESET PROTECT Cloud is the SaaS console (managed by ESET, no on-prem infrastructure), and is the recommended deployment for most UAE customers. ESET PROTECT On-Prem is also available for customers with data-residency or air-gap requirements.",
      },
      {
        question: "What is the typical ESET deployment lead time in the UAE?",
        answer:
          "Standard SMB deployments run one to two weeks. Mid-market deployments with full disk encryption and EDR typically run three to four weeks. ESET's lightweight agent and silent installer make rollouts fast, particularly on older hardware where heavier agents struggle.",
      },
    ],
    whatIs: {
      eyebrow: "What is ESET PROTECT",
      titlePrefix: "Lightweight endpoint protection with ",
      titleHighlight: "three decades of detection heritage",
      bodyParagraphs: [
        "ESET endpoints typically use a fraction of the CPU and memory of competing solutions, particularly on older Windows estates and Linux servers. The LiveGrid cloud reputation system, HIPS (Host Intrusion Prevention), and Advanced Memory Scanner provide layered prevention that consistently scores well in independent testing with notably low false positives.",
        "ESET PROTECT Cloud manages endpoints, servers, mail security, and disk encryption from one tenant, with ESET Inspect (EDR) and ESET MDR available as add-ons for customers needing detection and response depth.",
      ],
      feature: {
        titleLine1: "LiveGrid + HIPS",
        titleLine2: "Architecture",
        body: "LiveGrid cloud reputation, HIPS behavioural prevention, Advanced Memory Scanner, and Network Attack Protection layered on a famously lightweight agent.",
      },
      capabilities: [
        "LiveGrid: cloud reputation queried in real time, with minimal local footprint",
        "HIPS: host intrusion prevention with custom rule authoring",
        "Advanced Memory Scanner: detects fileless and unpacked malware",
        "Network Attack Protection: detects exploits at the network-protocol layer",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Cloud-managed, on-prem, or hybrid: your call.",
      intro: "Artiflex deploys ESET PROTECT in whichever console model fits your operational and regulatory requirements.",
      options: [
        { icon: "cloud", title: "Cloud-Managed", body: "Vendor-hosted SaaS console with automatic updates and no on-prem infrastructure. Recommended for most UAE customers." },
        { icon: "hardware", title: "On-Premises", body: "Self-hosted management console for customers with data-residency, air-gap, or full-control regulatory requirements." },
        { icon: "virtual", title: "Hybrid / Cloud Workload", body: "Extend the same agent and policy into AWS, Azure, GCP, and Kubernetes workloads alongside your endpoint estate." },
      ],
    },
  },

  "cisco-secure-endpoint": {
    slug: "cisco-secure-endpoint",
    name: "Cisco Secure Endpoint",
    logo: "/logos/Cisco.svg",
    tagline: "Talos-powered EDR with retrospective security and SecureX correlation",
    bestFor: "Best for Cisco-Native Environments (Recommended)",
    description:
      "Cisco Secure Endpoint (formerly Cisco AMP for Endpoints) is the natural choice for organizations standardized on Cisco networking and security. Powered by Talos, one of the largest commercial threat intelligence groups in the world, Secure Endpoint offers strong prevention plus retrospective security, going back in time to reclassify files when verdicts change. For UAE enterprises already running Cisco Secure Firewall, Umbrella, and Duo, Secure Endpoint consolidates the security stack under one vendor.",
    keyStats: [],
    whyWinsIntro: {
      label: "Cisco Secure Endpoint Highlights",
      title: "Strongest fit where the rest of the stack is already Cisco",
      description:
        "Cisco Secure Endpoint is at its best when Cisco Secure Firewall, Umbrella, Duo, and ISE are already in play. SecureX correlation across these products makes a single-vendor case that competing EDR vendors cannot match. In mixed-vendor environments, Sophos Intercept X, CrowdStrike, or Cortex XDR typically deliver better operational simplicity.",
      stats: [
        { value: "600B+", label: "daily security events analyzed by Cisco Talos threat intelligence", tone: "emerald" },
        { value: "3-5 min", label: "intelligence refresh cadence pushed to every Secure Endpoint customer", tone: "violet" },
        { value: "1 SOC", label: "for endpoint, firewall, DNS, email, and identity via SecureX correlation", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Talos Threat Intelligence",
        icon: "globe",
        tone: "emerald",
        title: "Massive cross-customer threat telemetry",
        desc: "Talos researchers track over 600 billion daily security events globally, with new file, URL, and DNS verdicts pushed to every Secure Endpoint customer every three to five minutes, a scale advantage matched only by a few vendors.",
      },
      {
        tag: "Retrospective Security",
        icon: "activity",
        tone: "violet",
        title: "Re-classify files after the fact",
        desc: "If Talos changes a verdict (a file initially classified as clean is later found malicious), Secure Endpoint can identify every endpoint where that file currently exists and trigger response, closing dwell-time windows that other EDR cannot reach.",
      },
      {
        tag: "Device Trajectory",
        icon: "layers",
        tone: "sky",
        title: "Visualize file movement across endpoints",
        desc: "Device Trajectory tracks files across the endpoint estate over time, showing exactly how malware moved between hosts. Useful for incident response and root-cause analysis.",
      },
      {
        tag: "Exploit Prevention",
        icon: "shield",
        tone: "amber",
        title: "Process protection and memory shielding",
        desc: "System Process Protection guards trusted Windows processes from injection; Memory Protection blocks exploit techniques targeting common applications. Effective against weaponized documents and browser exploits.",
      },
      {
        tag: "Orbital Advanced Search",
        icon: "eye",
        tone: "rose",
        title: "OSquery-based live endpoint search",
        desc: "Orbital is a live query feature based on OSquery: ask the entire endpoint estate questions like 'show all hosts running PowerShell with parent Word' and get answers in seconds. Strong incident response tool.",
      },
      {
        tag: "SecureX Integration",
        icon: "barChart",
        tone: "slate",
        title: "Cross-product correlation in one workbench",
        desc: "SecureX ribbon correlates Secure Endpoint incidents with Secure Firewall, Umbrella DNS, Duo MFA, Email Security, and ISE identity data, replacing standalone SIEM-style triage for many Cisco-standardized SOCs.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "Enterprises and government bodies already standardized on Cisco Secure (Firewall, Umbrella, Duo, ISE)",
      "Customers wanting unified SecureX correlation across endpoint, network, DNS, email, identity",
      "Organizations valuing Talos threat intelligence as a primary selection criterion",
      "Mature security teams that benefit from Orbital live endpoint search for incident response",
      "Service providers and large data centers consolidating multiple Cisco security products",
      "Multi-site enterprises that need a single console (SecureX) across Cisco security pillars",
      "UAE government, banking, and energy already running Cisco networking and security stacks",
    ],
    products: [
      { model: "Secure Endpoint Essentials", segment: "SMB / branch", role: "Prevention plus core EDR" },
      { model: "Secure Endpoint Advantage", segment: "Mid-market", role: "+ Orbital live search, SecureX threat hunting" },
      { model: "Secure Endpoint Premier", segment: "Enterprise", role: "+ Cisco SecureX threat response, advanced analytics" },
      { model: "Secure Endpoint with SecureX", segment: "Enterprise SOC", role: "+ Cross-product XDR via SecureX" },
      { model: "Secure MDR for Endpoint", segment: "Lean teams", role: "Cisco Talos-led MDR service on top of Secure Endpoint" },
      { model: "Cisco XDR", segment: "Mature SOC", role: "Cisco XDR with multi-vendor integration on Secure Endpoint base" },
    ],
    whyArtiflex:
      "Artiflex IT is a Cisco Premier Integrator with CCNP Security and CCIE Security engineers in the UAE. We deliver Secure Endpoint end-to-end across UAE, Oman, and Saudi Arabia: tenant design, agent rollout, SecureX integration with Secure Firewall, Umbrella, Duo, and ISE, Orbital live search enablement, and Cisco XDR migration. We have migrated legacy McAfee and Symantec estates onto Secure Endpoint for Cisco-standardized customers.",
    faqs: [
      {
        question: "How does Cisco Secure Endpoint compare to CrowdStrike or Sophos?",
        answer:
          "Cisco Secure Endpoint wins when the rest of the network is Cisco and SecureX correlation is decisive. For mixed-vendor environments, CrowdStrike Falcon wins on pure EDR depth; Sophos Intercept X wins on price-performance and Synchronized Security. We size all three for shortlist customers.",
      },
      {
        question: "Is Cisco AMP for Endpoints the same as Secure Endpoint?",
        answer:
          "Yes. Cisco renamed the product from AMP for Endpoints to Secure Endpoint as part of its broader Cisco Secure rebrand. The underlying technology, console, and licensing are continuous; no migration is required.",
      },
      {
        question: "Does Secure Endpoint support Linux and Mac?",
        answer:
          "Yes. Secure Endpoint covers Windows, macOS, Linux, Android, and iOS, with feature parity weighted toward Windows and macOS. Linux coverage focuses on server protection (RHEL, CentOS, Ubuntu, AlmaLinux, Rocky, SUSE).",
      },
      {
        question: "What is the typical Secure Endpoint deployment lead time in the UAE?",
        answer:
          "Standard mid-market deployments run three to five weeks. Multi-product SecureX integrations with Cisco Firewall, Umbrella, Duo, and ISE typically run six to twelve weeks because of identity-layer dependencies. We hold demo Secure Endpoint tenants for proof of concept.",
      },
    ],
    whatIs: {
      eyebrow: "What is Cisco Secure Endpoint",
      titlePrefix: "EDR built for the ",
      titleHighlight: "Cisco-standardized enterprise",
      bodyParagraphs: [
        "Cisco Secure Endpoint combines signature-based prevention, behavioural detection, and an EDR data lake into one cloud-managed product. The Talos threat intelligence team publishes new verdicts every three to five minutes from a global telemetry of 600+ billion daily security events, with verdicts pushed to every Secure Endpoint customer in real time.",
        "Where Secure Endpoint is strongest is in Cisco-native environments: SecureX correlation across Secure Firewall, Umbrella, Duo, Email Security, and Identity Services Engine (ISE), turning endpoint, network, and identity into a single detection surface managed from one console.",
      ],
      feature: {
        titleLine1: "Talos + SecureX",
        titleLine2: "Architecture",
        body: "Talos threat intelligence updates Secure Endpoint every three to five minutes; SecureX correlates endpoint alerts with firewall, DNS, email, and identity events across the Cisco security portfolio.",
      },
      capabilities: [
        "Talos threat intelligence with 600+ billion daily security events",
        "Retrospective security: re-classify files when verdicts change after the fact",
        "Exploit prevention via System Process Protection and Memory Protection",
        "SecureX correlation across firewall, DNS, email, identity, and endpoint",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Cloud-managed, on-prem, or hybrid: your call.",
      intro: "Artiflex deploys Cisco Secure Endpoint in whichever console model fits your operational and regulatory requirements.",
      options: [
        { icon: "cloud", title: "Cloud-Managed", body: "Vendor-hosted SaaS console with automatic updates and no on-prem infrastructure. Recommended for most UAE customers." },
        { icon: "hardware", title: "On-Premises", body: "Self-hosted management console for customers with data-residency, air-gap, or full-control regulatory requirements." },
        { icon: "virtual", title: "Hybrid / Cloud Workload", body: "Extend the same agent and policy into AWS, Azure, GCP, and Kubernetes workloads alongside your endpoint estate." },
      ],
    },
  },
};

export const endpointVendorList = Object.values(endpointVendors);
