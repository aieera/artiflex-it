import type { FirewallVendor } from "./firewallVendors";

/** Security Operations vendor detail entries reuse the firewall vendor shape
 *  so the SecOpsVendorDetail page renders in the same sophos-xgs theme. */
export type SecOpsVendor = FirewallVendor;

/* ───────────────────────── MDR ───────────────────────── */

export const mdrVendors: Record<string, SecOpsVendor> = {
  "sophos-mdr": {
    slug: "sophos-mdr",
    name: "Sophos MDR Complete",
    logo: "/logos/sophos.svg",
    tagline: "The world's most-deployed MDR, with a guaranteed breach response",
    bestFor: "Best Overall MDR (Recommended)",
    description:
      "Sophos MDR is a fully-managed 24/7 detection and response service run by a global SOC of more than 500 analysts. With Sophos's acquisition of Secureworks now complete, the Secureworks Taegis platform and its Counter Threat Unit (CTU) intelligence join Sophos MDR in-house, creating one of the world's largest pure-play MDR operations. The Complete tier adds full-scale incident response with a breach-protection warranty: Sophos analysts do not just alert you, they take action to stop the threat. It ingests telemetry from Sophos endpoint, firewall, email, cloud and identity, plus third-party tools through the Sophos Marketplace, making it the pragmatic first choice for most UAE organisations that need a SOC without building one.",
    keyStats: [],
    whyWinsIntro: {
      label: "Sophos MDR Highlights",
      title: "A SOC team on day one, now backed by Secureworks",
      description:
        "Most organisations cannot recruit, train and retain a 24/7 SOC. Sophos MDR gives you the analysts, the threat intelligence and the response actions as a service, integrated with the tools you already own. With Secureworks now part of Sophos, the Taegis platform, Counter Threat Unit intelligence and two decades of incident-response heritage are delivered in-house at greater scale.",
      stats: [
        { value: "39,000+", label: "Organisations protected by Sophos MDR worldwide", tone: "emerald" },
        { value: "+ Secureworks", label: "Taegis platform and Counter Threat Unit intelligence now in-house at Sophos", tone: "violet" },
        { value: "Warranty", label: "Breach-protection financial warranty on the Complete tier", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Full-scale response",
        icon: "shield",
        tone: "emerald",
        title: "Analysts that act, not just alert",
        desc: "On the Complete tier the Sophos SOC actively neutralises threats on your behalf: isolating hosts, killing processes and removing persistence. You wake up to a contained incident and a report, not a 3am page.",
      },
      {
        tag: "Synchronized Security",
        icon: "heartbeat",
        tone: "violet",
        title: "Tightest integration with the Sophos estate",
        desc: "When Sophos MDR runs alongside Intercept X and XGS Firewall, a compromised host is isolated automatically through Security Heartbeat, shrinking attacker dwell time to minutes.",
      },
      {
        tag: "Open telemetry",
        icon: "layers",
        tone: "sky",
        title: "Works with the tools you already have",
        desc: "The Sophos Marketplace ingests Microsoft 365, Entra ID, AWS, Google, Okta, firewalls and other EDRs, so MDR covers your whole estate, not only Sophos products.",
      },
      {
        tag: "Secureworks, now part of Sophos",
        icon: "globe",
        tone: "amber",
        title: "Counter Threat Unit intelligence, now in-house",
        desc: "Sophos's acquisition of Secureworks brings the Taegis platform and the Counter Threat Unit (CTU) inside Sophos. Detections are tuned against named adversary groups and tradecraft seen across tens of thousands of customers and trillions of weekly events, no longer a partnership but a single combined operation.",
      },
      {
        tag: "Combined MDR scale",
        icon: "users",
        tone: "rose",
        title: "One of the world's largest MDR operations",
        desc: "Merging Sophos MDR with the Secureworks SOC, incident-response practice and Taegis analytics creates one of the largest pure-play MDR providers, adding two decades of IR heritage and adversary attribution to Sophos's existing 24/7 service.",
      },
    ],
    watchOuts: [],
    bestFitProfile: [
      "UAE mid-market and enterprise teams that need 24/7 SOC coverage without hiring analysts",
      "Existing Sophos endpoint or firewall customers who want automated cross-product response",
      "Boards and auditors that want a named, accountable response provider with a warranty",
      "Lean IT teams that would rather consume a SOC than build, staff and retain one",
      "Organisations consolidating multiple point alerts into one managed detection pipeline",
      "Buyers who want Secureworks Counter Threat Unit intelligence and IR heritage delivered inside a single Sophos MDR service",
    ],
    products: [
      { model: "Sophos MDR Essentials", segment: "Notify-led", role: "24/7 monitoring and alerting; your team executes response" },
      { model: "Sophos MDR Complete", segment: "Full response", role: "Analysts take response actions on your behalf, with breach warranty" },
      { model: "Sophos XDR + MDR", segment: "Co-managed", role: "Your analysts and the Sophos SOC share the same XDR data lake" },
    ],
    whyArtiflex:
      "Artiflex IT is a Sophos Platinum Partner delivering Sophos MDR across the UAE, Oman and Saudi Arabia. We scope the right tier, onboard your telemetry sources (endpoint, firewall, M365, identity and cloud), tune detections to your environment, and act as your local escalation and governance layer on top of the Sophos SOC. With Secureworks now part of Sophos, we can position the combined Sophos MDR and Taegis investigation depth where adversary attribution and IR-grade response are decisive. You keep approval and oversight; we run the operational relationship.",
    faqs: [
      {
        question: "What does Sophos's acquisition of Secureworks mean for Sophos MDR?",
        answer:
          "Sophos has completed its acquisition of Secureworks, bringing the Taegis platform and the Counter Threat Unit (CTU) in-house rather than as a partnership. For Sophos MDR customers this means deeper adversary intelligence, two decades of incident-response heritage and Taegis analytics feeding the same 24/7 service under one provider. Combined, it forms one of the world's largest pure-play MDR operations, which strengthens the case for UAE banking, government and critical-infrastructure buyers who need attribution-grade detection and guaranteed response.",
      },
      {
        question: "What is the difference between Sophos MDR Essentials and Complete?",
        answer:
          "Essentials is monitoring and alerting: the Sophos SOC tells you what is happening and what to do, and your team executes. Complete adds full-scale incident response, the SOC actively contains and remediates threats for you, plus a breach-protection warranty. For most organisations without a 24/7 in-house team, Complete is the right scope.",
      },
      {
        question: "Does Sophos MDR only work with Sophos products?",
        answer:
          "No. While it integrates most tightly with Sophos Intercept X and XGS Firewall through Synchronized Security, the Sophos Marketplace ingests telemetry from Microsoft 365, Entra ID, AWS, Google Workspace, Okta and third-party EDR and firewall tools, so it covers a mixed-vendor estate.",
      },
      {
        question: "How fast can Sophos MDR be operational in the UAE?",
        answer:
          "A typical deployment is operational within 5 to 10 business days: agent rollout or connector configuration, telemetry validation, detection tuning and a go-live review. Artiflex handles onboarding end to end and provides local escalation.",
      },
    ],
    whatIs: {
      eyebrow: "What is Sophos MDR",
      titlePrefix: "A managed SOC delivered as a ",
      titleHighlight: "24/7 service",
      bodyParagraphs: [
        "Sophos MDR (Managed Detection and Response) is a fully-managed service where a global Sophos security operations centre monitors your environment around the clock, hunts for threats proactively, and responds to incidents on your behalf. Following Sophos's acquisition of Secureworks, it combines Sophos X-Ops with the Secureworks Counter Threat Unit and Taegis platform, now in-house, alongside an analyst team that most organisations could never staff alone.",
        "Telemetry flows in from endpoints, firewalls, email, identity and cloud, is correlated in the Sophos data lake, and triaged by analysts who escalate, contain and remediate. The Complete tier turns alerting into action, backed by a financial breach-protection warranty.",
      ],
      feature: {
        titleLine1: "Detection,",
        titleLine2: "and Response",
        body: "The difference between MDR and a SIEM is people. Sophos analysts do the triage, threat hunting and hands-on containment, so a detection becomes a contained incident without your team in the loop at 3am.",
      },
      capabilities: [
        "24/7 analyst-led monitoring, triage and threat hunting",
        "Full-scale response actions on the Complete tier",
        "Open telemetry ingestion across Sophos and third-party tools",
        "Breach-protection warranty for response-tier customers",
      ],
    },
    deploymentOptions: {
      eyebrow: "How it is delivered",
      title: "Cloud-delivered, your data sources.",
      intro: "Sophos MDR is consumed as a service; Artiflex connects your telemetry and runs the local relationship.",
      options: [
        { icon: "cloud", title: "Cloud SOC service", body: "Monitoring, hunting and response delivered from the Sophos global SOC through Sophos Central. No SOC infrastructure to build or staff." },
        { icon: "virtual", title: "Telemetry connectors", body: "Sophos endpoint and firewall plus Microsoft 365, Entra ID, AWS, Google, Okta and third-party EDR feeds via the Sophos Marketplace." },
        { icon: "hardware", title: "Co-managed option", body: "Sophos XDR gives your own analysts access to the same data lake, for organisations that want shared operations rather than fully outsourced." },
      ],
    },
  },

  secureworks: {
    slug: "secureworks",
    name: "Secureworks Taegis MXDR",
    logo: "/logos/Secureworks.png",
    tagline: "Adversary-focused MXDR powered by the Counter Threat Unit",
    bestFor: "Best for Advanced Threat Intelligence (Recommended)",
    description:
      "Secureworks Taegis MXDR is a managed extended detection and response service built on two decades of incident-response and threat-research heritage. Its Counter Threat Unit tracks named adversary groups and feeds that intelligence into the Taegis platform, which correlates telemetry across endpoint, network, cloud and identity. Now part of Sophos, Taegis is the preferred pairing when adversary attribution, deep threat hunting and IR-grade investigation are the decisive criteria.",
    keyStats: [],
    whyWinsIntro: {
      label: "Secureworks Taegis Highlights",
      title: "Intelligence-led detection from a threat-research pedigree",
      description:
        "Taegis was built by the team that responds to real breaches. That incident-response DNA shows up in detections that are mapped to adversary behaviour rather than generic signatures.",
      stats: [
        { value: "CTU", label: "Counter Threat Unit tracking named adversary groups globally", tone: "emerald" },
        { value: "MITRE", label: "Detections mapped to ATT&CK adversary tradecraft", tone: "violet" },
        { value: "XDR", label: "Open platform correlating endpoint, network, cloud and identity", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Counter Threat Unit",
        icon: "globe",
        tone: "emerald",
        title: "Adversary attribution as a first-class capability",
        desc: "The CTU researches threat actors, malware families and campaigns, and pushes that intelligence into Taegis so detections are tied to who is attacking and how, not just isolated alerts.",
      },
      {
        tag: "IR heritage",
        icon: "shield",
        tone: "violet",
        title: "Built by responders, for responders",
        desc: "Secureworks has handled thousands of incident-response engagements. That experience is encoded into Taegis playbooks and the analyst investigation workflow.",
      },
      {
        tag: "Open XDR",
        icon: "layers",
        tone: "sky",
        title: "Vendor-neutral telemetry correlation",
        desc: "Taegis ingests data from any major EDR, firewall, cloud and identity provider, making it a strong fit for heterogeneous estates that are not standardised on one vendor.",
      },
      {
        tag: "Collaborative SOC",
        icon: "users",
        tone: "amber",
        title: "Shared investigation, not a black box",
        desc: "Taegis gives your team transparent access to the same investigation surface the analysts use, so you can see the evidence behind every escalation rather than receiving opaque verdicts.",
      },
    ],
    watchOuts: [
      {
        title: "Best value with mature processes",
        desc: "Taegis rewards teams that engage with investigations and threat hunts. Organisations that simply want fully outsourced notify-and-fix may find Sophos MDR Complete a more turnkey fit.",
      },
    ],
    bestFitProfile: [
      "Banks, government and regulated entities that need adversary attribution and IR-grade evidence",
      "Mixed-vendor estates that want open XDR correlation rather than single-vendor lock-in",
      "Security teams that want to collaborate with analysts, not just receive verdicts",
      "Organisations with existing SOC maturity that want to augment rather than fully outsource",
      "Buyers who value the Counter Threat Unit's named-adversary intelligence",
    ],
    products: [
      { model: "Taegis XDR", segment: "Platform", role: "Self-driven XDR with CTU intelligence for your own analysts" },
      { model: "Taegis MXDR", segment: "Managed", role: "24/7 Secureworks SOC monitoring, hunting and response" },
      { model: "Taegis MDR + IR retainer", segment: "Enterprise", role: "Managed detection paired with an incident-response retainer" },
    ],
    whyArtiflex:
      "Artiflex IT positions Secureworks Taegis where adversary intelligence and investigation depth are decisive, often for banking, government and critical-infrastructure customers in the UAE. We scope the right Taegis tier, integrate your telemetry sources, and provide local governance and escalation on top of the Secureworks SOC.",
    faqs: [
      {
        question: "How is Secureworks Taegis different from Sophos MDR?",
        answer:
          "Both are now part of Sophos. Sophos MDR is the most turnkey, broadly-deployed managed service and is the default recommendation for most organisations. Taegis leans into adversary attribution via the Counter Threat Unit, open vendor-neutral XDR and collaborative investigation, making it the choice when intelligence depth and IR heritage are the priority.",
      },
      {
        question: "Does Taegis lock me into Secureworks tooling?",
        answer:
          "No. Taegis is an open XDR platform that ingests telemetry from third-party EDR, firewall, cloud and identity providers, so it suits estates built on mixed vendors.",
      },
      {
        question: "Can Taegis include an incident-response retainer?",
        answer:
          "Yes. Secureworks offers IR retainers alongside managed detection, which is valuable for regulated UAE entities that need guaranteed responder access during a major incident.",
      },
    ],
    whatIs: {
      eyebrow: "What is Secureworks Taegis MXDR",
      titlePrefix: "Managed XDR with an ",
      titleHighlight: "adversary focus",
      bodyParagraphs: [
        "Taegis MXDR is a managed extended detection and response service that correlates telemetry across your endpoint, network, cloud and identity layers, then applies Counter Threat Unit intelligence and a 24/7 analyst team to detect, hunt and respond to threats.",
        "Its differentiator is pedigree: Secureworks built its reputation on incident response and threat research, so Taegis detections are tied to named adversaries and real-world tradecraft rather than generic anomaly scoring.",
      ],
      feature: {
        titleLine1: "Counter Threat",
        titleLine2: "Unit Intelligence",
        body: "The CTU tracks the actual threat actors targeting organisations like yours and feeds that research into Taegis, so the platform recognises campaigns and tradecraft, not just isolated indicators.",
      },
      capabilities: [
        "24/7 managed detection, threat hunting and response",
        "Counter Threat Unit named-adversary intelligence",
        "Open, vendor-neutral XDR telemetry correlation",
        "Collaborative investigation surface shared with your team",
      ],
    },
    deploymentOptions: {
      eyebrow: "How it is delivered",
      title: "Cloud XDR, managed or self-driven.",
      intro: "Artiflex scopes the Taegis model to your SOC maturity and integrates your data sources.",
      options: [
        { icon: "cloud", title: "Managed (MXDR)", body: "Secureworks SOC monitors, hunts and responds 24/7 on the Taegis platform with CTU intelligence." },
        { icon: "virtual", title: "Self-driven (XDR)", body: "Your analysts operate Taegis directly, using the same detections and CTU feeds without full outsourcing." },
        { icon: "hardware", title: "IR retainer", body: "Add a Secureworks incident-response retainer for guaranteed responder access during a major breach." },
      ],
    },
  },

  "rapid7-mdr": {
    slug: "rapid7-mdr",
    name: "Rapid7 MDR",
    logo: "/logos/rapid7.png",
    tagline: "Managed detection on the InsightIDR platform with transparent SOC access",
    bestFor: "Best for Cloud-Native, Mid-Market SOC (Recommended)",
    description:
      "Rapid7 MDR delivers 24/7 managed detection and response on top of the InsightIDR cloud SIEM, combining endpoint, network and user-behaviour analytics with a Rapid7 SOC that hunts and responds. It is a strong mid-market choice: cloud-native, fast to onboard, with user-based pricing and unusually transparent access to the analysts and the underlying detection logic. Rapid7 also pairs MDR with vulnerability management on the same Insight platform.",
    keyStats: [],
    whyWinsIntro: {
      label: "Rapid7 MDR Highlights",
      title: "A cloud-native SOC with the receipts",
      description:
        "Rapid7 MDR is built on InsightIDR, so detections, investigations and threat hunts all happen on a transparent cloud platform you can see into, not a black box.",
      stats: [
        { value: "InsightIDR", label: "Cloud SIEM with UEBA and attacker-behaviour analytics", tone: "emerald" },
        { value: "24/7", label: "Rapid7 SOC monitoring, hunting and active response", tone: "violet" },
        { value: "Unified", label: "MDR and vulnerability management on one Insight platform", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "InsightIDR",
        icon: "barChart",
        tone: "emerald",
        title: "Cloud SIEM plus UEBA under the SOC",
        desc: "Rapid7 MDR runs on InsightIDR, which blends log analytics, endpoint telemetry and user-behaviour analytics, giving analysts rich context for every investigation.",
      },
      {
        tag: "Transparency",
        icon: "eye",
        tone: "violet",
        title: "See the same data the analysts see",
        desc: "Rapid7 is known for an open relationship: you get visibility into detections, investigation timelines and the SOC's reasoning, rather than opaque escalations.",
      },
      {
        tag: "Active response",
        icon: "shield",
        tone: "sky",
        title: "Containment, not just notification",
        desc: "The Rapid7 SOC can take response actions to contain validated threats, and works with your team on remediation through a clear, documented workflow.",
      },
      {
        tag: "Unified platform",
        icon: "layers",
        tone: "amber",
        title: "Detection and exposure on one platform",
        desc: "Because InsightIDR and InsightVM share the Insight platform, MDR detections can be correlated with the vulnerabilities attackers are actually exploiting.",
      },
    ],
    watchOuts: [
      {
        title: "Mid-range pricing, mid-market sweet spot",
        desc: "Rapid7 MDR is strongest for cloud-forward mid-market organisations. The very largest enterprises with bespoke SOC requirements sometimes prefer a more customised platform.",
      },
    ],
    bestFitProfile: [
      "Cloud-forward mid-market organisations that want a SOC without building one",
      "Teams that value transparency and shared visibility into the SOC's work",
      "Organisations already using or considering Rapid7 InsightVM for vulnerability management",
      "Buyers who prefer predictable user-based pricing over event-volume billing",
      "Security teams that want UEBA and attacker-behaviour analytics in their detections",
    ],
    products: [
      { model: "Rapid7 MDR", segment: "Managed", role: "24/7 SOC monitoring, hunting and response on InsightIDR" },
      { model: "MDR + InsightVM", segment: "Unified", role: "Managed detection correlated with managed vulnerability data" },
      { model: "Managed Threat Complete", segment: "Bundle", role: "MDR, VM and attack-surface management as one subscription" },
    ],
    whyArtiflex:
      "Artiflex IT deploys Rapid7 MDR for UAE mid-market customers that want a transparent, cloud-native SOC. We onboard InsightIDR, integrate your endpoint, cloud and identity sources, tune detections, and provide local escalation. Where exposure management matters, we pair MDR with Rapid7 InsightVM on the same platform.",
    faqs: [
      {
        question: "What platform does Rapid7 MDR run on?",
        answer:
          "It runs on InsightIDR, Rapid7's cloud SIEM with user-behaviour analytics. That means MDR detections, investigations and hunts all sit on a transparent platform you can see into, and can be correlated with InsightVM vulnerability data.",
      },
      {
        question: "Does Rapid7 MDR take response actions?",
        answer:
          "Yes. The Rapid7 SOC can contain validated threats and works with your team on remediation through a documented workflow, while keeping you informed of the reasoning behind each action.",
      },
      {
        question: "Is Rapid7 MDR good value for the mid-market?",
        answer:
          "Yes. Its cloud-native delivery, fast onboarding and user-based pricing make it a strong fit for mid-market organisations that want predictable cost and a 24/7 SOC without large upfront investment.",
      },
    ],
    whatIs: {
      eyebrow: "What is Rapid7 MDR",
      titlePrefix: "Cloud-native managed detection on ",
      titleHighlight: "InsightIDR",
      bodyParagraphs: [
        "Rapid7 MDR is a 24/7 managed detection and response service built on InsightIDR, Rapid7's cloud SIEM. A Rapid7 SOC monitors your telemetry, runs proactive threat hunts and takes response actions to contain validated threats, all on a platform designed for transparency.",
        "Because InsightIDR and InsightVM share the Insight platform, organisations can connect what is being attacked with what is actually exploitable, closing the loop between detection and exposure.",
      ],
      feature: {
        titleLine1: "Transparent",
        titleLine2: "SOC Operations",
        body: "Rapid7's hallmark is openness: you see the detections, the investigation timelines and the SOC's reasoning, rather than receiving black-box verdicts you cannot audit.",
      },
      capabilities: [
        "24/7 managed detection and active response",
        "InsightIDR cloud SIEM with user-behaviour analytics",
        "Transparent, shared investigation visibility",
        "Optional unification with InsightVM exposure management",
      ],
    },
    deploymentOptions: {
      eyebrow: "How it is delivered",
      title: "Cloud-delivered, fast to onboard.",
      intro: "Artiflex connects your data sources and runs local escalation on the Rapid7 SOC.",
      options: [
        { icon: "cloud", title: "Cloud SOC service", body: "Rapid7 SOC monitoring, hunting and response delivered through the InsightIDR cloud platform." },
        { icon: "virtual", title: "Telemetry sources", body: "Endpoint agents, cloud, identity and network log sources feed InsightIDR with minimal infrastructure." },
        { icon: "hardware", title: "Unified add-ons", body: "Extend to InsightVM and attack-surface management with Managed Threat Complete on one subscription." },
      ],
    },
  },

  microsoft: {
    slug: "microsoft",
    name: "Microsoft Defender Experts (MDR)",
    logo: "/logos/MicrosoftDefender.webp",
    tagline: "Managed detection native to Microsoft Defender XDR and Sentinel",
    bestFor: "Best Value for Microsoft E5 Estates",
    description:
      "Microsoft Defender Experts for XDR is Microsoft's managed detection and response service, delivered by Microsoft analysts directly inside Defender XDR and, where deployed, Microsoft Sentinel. For organisations standardised on Microsoft 365 E5, it provides 24/7 expert monitoring, investigation and guided response across endpoint, identity, email and cloud apps, with the lowest friction because the telemetry is already native to the Microsoft stack.",
    keyStats: [],
    whyWinsIntro: {
      label: "Defender Experts Highlights",
      title: "MDR where your telemetry already lives",
      description:
        "If your security signal is already in Defender XDR and Sentinel, Microsoft's own analysts can monitor and respond inside the same platform, with no extra agents or connectors to bolt on.",
      stats: [
        { value: "E5-native", label: "Runs on Defender XDR and Sentinel you may already license", tone: "emerald" },
        { value: "24/7", label: "Microsoft analyst monitoring, hunting and guided response", tone: "violet" },
        { value: "Unified", label: "Endpoint, identity, email and cloud-app signal correlated natively", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Native integration",
        icon: "monitor",
        tone: "emerald",
        title: "No bolt-on, it lives in Defender XDR",
        desc: "Defender Experts operates inside the Microsoft security stack you already run, correlating endpoint, identity, email and cloud-app signal without extra collectors or data duplication.",
      },
      {
        tag: "E5 economics",
        icon: "barChart",
        tone: "violet",
        title: "Best value when E5 is already owned",
        desc: "For organisations licensed for Microsoft 365 E5, the underlying detection platform is sunk cost, so adding managed detection is the lowest-incremental path to a 24/7 capability.",
      },
      {
        tag: "Threat intelligence",
        icon: "globe",
        tone: "sky",
        title: "Microsoft's global signal",
        desc: "Detections draw on Microsoft's vast telemetry across billions of endpoints and identities, surfacing nation-state and commodity threats with strong context.",
      },
      {
        tag: "Guided response",
        icon: "list",
        tone: "amber",
        title: "Investigations and clear next steps",
        desc: "Microsoft analysts investigate incidents and hand your team precise, prioritised response guidance inside the Defender portal, raising the floor for Microsoft-centric SOCs.",
      },
    ],
    watchOuts: [
      {
        title: "Strongest inside the Microsoft estate",
        desc: "Coverage and value are highest for Microsoft-centric environments. Heterogeneous estates with significant non-Microsoft endpoints or Linux/macOS depth often pair Defender Experts with a specialist EDR or a broader MDR.",
      },
    ],
    bestFitProfile: [
      "UAE organisations already licensed for Microsoft 365 E5 / Defender for Office 365 P2",
      "Microsoft-centric estates that want managed detection without new agents",
      "Teams running or planning Microsoft Sentinel as their SIEM",
      "Buyers optimising for lowest incremental cost on an existing Microsoft investment",
      "Security teams that want guided response inside a portal their analysts already use",
    ],
    products: [
      { model: "Defender Experts for XDR", segment: "Managed XDR", role: "24/7 managed detection and response across Defender XDR" },
      { model: "Defender Experts for Hunting", segment: "Hunting", role: "Proactive Microsoft-led threat hunting on your Defender data" },
      { model: "Sentinel co-managed", segment: "SIEM overlay", role: "Managed detection extended across Microsoft Sentinel analytics" },
    ],
    whyArtiflex:
      "Artiflex IT helps Microsoft-aligned UAE organisations adopt Defender Experts on top of their existing E5 estate. We validate Defender XDR and Sentinel coverage, close telemetry gaps, integrate non-Microsoft sources where needed, and provide local governance so managed detection slots cleanly into your Microsoft security operations.",
    faqs: [
      {
        question: "Do I need Microsoft 365 E5 to use Defender Experts?",
        answer:
          "Defender Experts for XDR builds on Microsoft Defender XDR, which is licensed through Microsoft 365 E5 / Defender for Office 365 P2 and Defender for Endpoint P2. If you already hold E5, the detection platform is in place and the service is the lowest-incremental path to 24/7 managed detection.",
      },
      {
        question: "Does it cover non-Microsoft tools?",
        answer:
          "Coverage is strongest for the Microsoft estate. Where you have significant non-Microsoft endpoints, network or cloud sources, Artiflex integrates them via Sentinel or recommends pairing with a specialist MDR so nothing is left unmonitored.",
      },
      {
        question: "How does Defender Experts relate to Sentinel?",
        answer:
          "Defender Experts operates in Defender XDR, and where you run Microsoft Sentinel as your SIEM, managed detection extends across Sentinel analytics for a unified investigation experience.",
      },
    ],
    whatIs: {
      eyebrow: "What is Microsoft Defender Experts",
      titlePrefix: "Managed detection inside ",
      titleHighlight: "Defender XDR",
      bodyParagraphs: [
        "Microsoft Defender Experts for XDR is a managed detection and response service staffed by Microsoft analysts who monitor, investigate and guide response directly inside Microsoft Defender XDR, correlating endpoint, identity, email and cloud-app signal.",
        "Because it runs on the Microsoft security platform itself, organisations standardised on Microsoft 365 E5 get a 24/7 capability with no additional agents, no data duplication and the lowest incremental cost on telemetry they already own.",
      ],
      feature: {
        titleLine1: "Native to the",
        titleLine2: "Microsoft Stack",
        body: "There is no separate console or collector layer: Microsoft's own analysts work in Defender XDR alongside your team, which is why it is the lowest-friction MDR for Microsoft-centric estates.",
      },
      capabilities: [
        "24/7 Microsoft analyst monitoring and guided response",
        "Native Defender XDR endpoint, identity, email and cloud-app coverage",
        "Microsoft global threat intelligence",
        "Extends across Microsoft Sentinel where deployed",
      ],
    },
    deploymentOptions: {
      eyebrow: "How it is delivered",
      title: "Native service, your Microsoft tenant.",
      intro: "Artiflex validates coverage and integrates any non-Microsoft sources.",
      options: [
        { icon: "cloud", title: "Defender XDR service", body: "Microsoft analysts monitor and respond inside your Defender XDR tenant, no new agents required." },
        { icon: "virtual", title: "Sentinel overlay", body: "Where Microsoft Sentinel is your SIEM, managed detection extends across Sentinel analytics rules." },
        { icon: "hardware", title: "Coverage hardening", body: "Artiflex closes telemetry gaps and integrates non-Microsoft endpoint, network and cloud sources." },
      ],
    },
  },

  sentinelone: {
    slug: "sentinelone",
    name: "SentinelOne Vigilance Respond",
    logo: "/logos/SentinelOne.png",
    tagline: "MDR built on the autonomous Singularity platform",
    bestFor: "Best for Autonomous, Endpoint-First Response",
    description:
      "SentinelOne Vigilance Respond is the managed detection and response service layered on the Singularity platform. It combines SentinelOne's autonomous, on-device AI, which can detect and roll back attacks even offline, with a 24/7 SOC that triages, hunts and escalates. Vigilance is the right pairing for organisations standardising on SentinelOne endpoint protection that want expert oversight without staffing a SOC, with the added speed of autonomous machine-speed containment.",
    keyStats: [],
    whyWinsIntro: {
      label: "Vigilance Respond Highlights",
      title: "Machine-speed containment, analyst-grade oversight",
      description:
        "SentinelOne's agent already makes autonomous response decisions on the device. Vigilance adds the human SOC layer: validation, threat hunting and escalation across the Singularity estate.",
      stats: [
        { value: "Autonomous", label: "On-device AI detects and rolls back attacks, even offline", tone: "emerald" },
        { value: "24/7", label: "Vigilance SOC triage, threat hunting and escalation", tone: "violet" },
        { value: "Storyline", label: "Automated attack-story correlation for fast investigation", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Autonomous response",
        icon: "activity",
        tone: "emerald",
        title: "Containment at machine speed",
        desc: "The Singularity agent makes local kill and rollback decisions without waiting for the cloud, so ransomware is stopped and reversed on the endpoint, then validated by the Vigilance SOC.",
      },
      {
        tag: "Storyline",
        icon: "list",
        tone: "violet",
        title: "Attacks reconstructed automatically",
        desc: "Storyline stitches related events into a single causal narrative, so analysts and your team see the full attack chain instead of disconnected alerts.",
      },
      {
        tag: "Vigilance SOC",
        icon: "users",
        tone: "sky",
        title: "Expert oversight on every detection",
        desc: "The Vigilance team validates detections, runs proactive hunts and escalates with context, raising confidence in the autonomous actions the platform takes.",
      },
      {
        tag: "Singularity XDR",
        icon: "layers",
        tone: "amber",
        title: "Beyond the endpoint",
        desc: "Singularity ingests identity, cloud and network telemetry through the Data Lake, extending Vigilance coverage past endpoints into a broader XDR picture.",
      },
    ],
    watchOuts: [
      {
        title: "Tuning matters early",
        desc: "Autonomous platforms can be noisy until policy is tuned. Vigilance and an experienced partner reduce false positives quickly, but the first weeks benefit from active tuning.",
      },
    ],
    bestFitProfile: [
      "Organisations standardising on SentinelOne Singularity endpoint protection",
      "Teams that want machine-speed, offline-capable ransomware containment and rollback",
      "Constrained SOCs that need expert oversight of autonomous response decisions",
      "Estates extending from endpoint into identity, cloud and network XDR",
      "Buyers who value automated attack-story reconstruction for faster investigation",
    ],
    products: [
      { model: "Vigilance Respond", segment: "Managed", role: "24/7 SOC triage, hunting and escalation on Singularity" },
      { model: "Vigilance Respond Pro", segment: "Managed + DFIR", role: "Adds digital forensics and incident-response support" },
      { model: "Singularity XDR", segment: "Platform", role: "Endpoint, identity, cloud and network telemetry in one Data Lake" },
    ],
    whyArtiflex:
      "Artiflex IT deploys SentinelOne Singularity with Vigilance Respond for UAE organisations that want autonomous endpoint defence backed by an expert SOC. We roll out and tune the agents, extend coverage into identity and cloud, and provide local escalation so machine-speed response is paired with accountable human oversight.",
    faqs: [
      {
        question: "What does Vigilance add on top of the SentinelOne agent?",
        answer:
          "The Singularity agent already detects and can autonomously contain and roll back attacks. Vigilance Respond adds the human SOC layer: 24/7 validation of detections, proactive threat hunting, and escalation with context, so you are not relying on automation alone.",
      },
      {
        question: "Does SentinelOne work offline?",
        answer:
          "Yes. A core differentiator is that the agent makes detection and response decisions on the device itself, so endpoints remain protected and can roll back ransomware even without a cloud connection.",
      },
      {
        question: "Is Vigilance only for endpoints?",
        answer:
          "It is endpoint-first, but Singularity XDR ingests identity, cloud and network telemetry through the Data Lake, so Vigilance coverage can extend into a broader XDR picture beyond the endpoint.",
      },
    ],
    whatIs: {
      eyebrow: "What is SentinelOne Vigilance",
      titlePrefix: "Managed detection on an ",
      titleHighlight: "autonomous platform",
      bodyParagraphs: [
        "SentinelOne Vigilance Respond is the managed detection and response service for the Singularity platform. It pairs SentinelOne's autonomous, on-device AI, which detects, contains and rolls back attacks at machine speed, with a 24/7 SOC that validates, hunts and escalates.",
        "Storyline reconstructs each attack into a single causal narrative, and Singularity XDR extends telemetry beyond the endpoint into identity, cloud and network, giving Vigilance a broad investigation surface.",
      ],
      feature: {
        titleLine1: "Autonomous",
        titleLine2: "plus Human SOC",
        body: "The agent acts in milliseconds; the Vigilance SOC provides the judgement, hunting and escalation. Together they deliver speed without sacrificing oversight.",
      },
      capabilities: [
        "On-device autonomous detection, containment and rollback",
        "24/7 Vigilance SOC validation and threat hunting",
        "Storyline automated attack reconstruction",
        "Singularity XDR coverage beyond the endpoint",
      ],
    },
    deploymentOptions: {
      eyebrow: "How it is delivered",
      title: "Agent plus managed SOC.",
      intro: "Artiflex rolls out and tunes Singularity, then layers Vigilance oversight.",
      options: [
        { icon: "virtual", title: "Singularity agents", body: "Autonomous endpoint agents deployed across Windows, macOS and Linux with offline-capable response." },
        { icon: "cloud", title: "Vigilance SOC", body: "24/7 managed triage, hunting and escalation delivered as a service on the Singularity platform." },
        { icon: "hardware", title: "XDR expansion", body: "Extend into identity, cloud and network telemetry via the Singularity Data Lake." },
      ],
    },
  },

  crowdstrike: {
    slug: "crowdstrike",
    name: "CrowdStrike Falcon Complete",
    logo: "/logos/CrowdStrike.webp",
    tagline: "Premium MDR with a breach-prevention warranty and elite hunting",
    bestFor: "Best for Elite, High-Budget Enterprise SOC",
    description:
      "CrowdStrike Falcon Complete is the fully-managed detection and response service on the Falcon cloud-native platform. It combines the lightweight Falcon agent, the Threat Graph, and the OverWatch elite threat-hunting team with a 24/7 SOC that detects, investigates and remediates on your behalf, backed by a breach-prevention warranty. It is the premium tier of the market: best-in-class detection and hunting for enterprises that have the budget and want the strongest possible managed capability.",
    keyStats: [],
    whyWinsIntro: {
      label: "Falcon Complete Highlights",
      title: "The premium standard in managed detection",
      description:
        "CrowdStrike pioneered cloud-native endpoint protection and elite managed hunting. Falcon Complete is the turnkey, fully-remediated service for organisations that want the best and will pay for it.",
      stats: [
        { value: "OverWatch", label: "Elite 24/7 human threat hunting across the Falcon estate", tone: "emerald" },
        { value: "Warranty", label: "Breach-prevention warranty backing the managed service", tone: "violet" },
        { value: "Threat Graph", label: "Trillions of weekly events powering cloud-native detection", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "OverWatch hunting",
        icon: "eye",
        tone: "emerald",
        title: "Elite human threat hunting, 24/7",
        desc: "OverWatch analysts proactively hunt for the hands-on-keyboard intrusions that automation misses, surfacing stealthy adversary activity across the Falcon estate.",
      },
      {
        tag: "Full remediation",
        icon: "shield",
        tone: "violet",
        title: "Detect, investigate and remediate for you",
        desc: "Falcon Complete is fully managed: the CrowdStrike SOC does the triage, investigation and hands-on remediation, returning endpoints to a known-good state.",
      },
      {
        tag: "Cloud-native",
        icon: "globe",
        tone: "sky",
        title: "Lightweight agent, hyperscale intelligence",
        desc: "The single lightweight Falcon agent feeds the Threat Graph, which correlates trillions of events weekly so a threat seen anywhere is blocked everywhere within minutes.",
      },
      {
        tag: "Breach warranty",
        icon: "lock",
        tone: "amber",
        title: "Financial backing for the outcome",
        desc: "Falcon Complete is underwritten by a breach-prevention warranty, signalling CrowdStrike's confidence in the managed service and giving boards a tangible assurance.",
      },
    ],
    watchOuts: [
      {
        title: "Highest cost in the market",
        desc: "Falcon Complete is the premium option, typically the most expensive managed service. It is justified for high-value targets and mature programmes; cost-sensitive mid-market buyers often choose Sophos MDR or Rapid7 MDR.",
      },
    ],
    bestFitProfile: [
      "Large enterprises and high-value targets that want best-in-class managed detection",
      "Organisations standardising on the CrowdStrike Falcon platform",
      "Boards that want a breach-prevention warranty behind the SOC",
      "Programmes that value elite OverWatch human threat hunting",
      "Buyers with the budget to invest in the premium tier of the market",
    ],
    products: [
      { model: "Falcon Complete", segment: "Fully managed", role: "24/7 detection, investigation and full remediation by the CrowdStrike SOC" },
      { model: "Falcon Complete XDR", segment: "Managed XDR", role: "Managed detection extended across identity, cloud and third-party telemetry" },
      { model: "OverWatch", segment: "Managed hunting", role: "Elite human threat hunting overlay on the Falcon platform" },
    ],
    whyArtiflex:
      "Artiflex IT delivers CrowdStrike Falcon Complete for UAE enterprises and high-value targets that want the premium managed capability. We roll out the Falcon platform, extend coverage across identity and cloud, and provide local governance and escalation alongside the CrowdStrike SOC and OverWatch hunting team.",
    faqs: [
      {
        question: "Why is Falcon Complete more expensive than other MDR services?",
        answer:
          "It is the premium tier: a fully-managed service with full remediation, elite OverWatch threat hunting and a breach-prevention warranty, on a market-leading cloud-native platform. For high-value targets and mature programmes the outcome justifies the cost; cost-sensitive mid-market buyers often prefer Sophos MDR or Rapid7 MDR.",
      },
      {
        question: "What is OverWatch?",
        answer:
          "OverWatch is CrowdStrike's elite human threat-hunting team that proactively searches for stealthy, hands-on-keyboard intrusions across the Falcon estate, catching adversary activity that automated detection alone can miss.",
      },
      {
        question: "Does Falcon Complete remediate, or just alert?",
        answer:
          "It fully remediates. The CrowdStrike SOC investigates and takes hands-on response actions to contain and remediate threats, returning affected endpoints to a known-good state, not simply notifying your team.",
      },
    ],
    whatIs: {
      eyebrow: "What is CrowdStrike Falcon Complete",
      titlePrefix: "Fully-managed detection on the ",
      titleHighlight: "Falcon platform",
      bodyParagraphs: [
        "CrowdStrike Falcon Complete is a fully-managed detection and response service on the cloud-native Falcon platform. The CrowdStrike SOC detects, investigates and remediates threats on your behalf, backed by elite OverWatch threat hunting and a breach-prevention warranty.",
        "A single lightweight agent feeds the Threat Graph, correlating trillions of weekly events so detection is fast and global, while the managed team takes hands-on remediation to a known-good state.",
      ],
      feature: {
        titleLine1: "Managed and",
        titleLine2: "Fully Remediated",
        body: "Falcon Complete is the turnkey premium service: you are not handed alerts to action, the CrowdStrike SOC investigates and remediates, with a warranty standing behind the outcome.",
      },
      capabilities: [
        "24/7 fully-managed detection, investigation and remediation",
        "Elite OverWatch human threat hunting",
        "Cloud-native Falcon agent and Threat Graph intelligence",
        "Breach-prevention warranty behind the service",
      ],
    },
    deploymentOptions: {
      eyebrow: "How it is delivered",
      title: "Cloud-native, fully managed.",
      intro: "Artiflex rolls out Falcon and runs local governance alongside the CrowdStrike SOC.",
      options: [
        { icon: "virtual", title: "Falcon agents", body: "Single lightweight agent across Windows, macOS and Linux feeding the Threat Graph." },
        { icon: "cloud", title: "Falcon Complete SOC", body: "24/7 fully-managed detection, investigation and remediation as a service." },
        { icon: "hardware", title: "XDR expansion", body: "Extend managed coverage across identity, cloud and third-party telemetry with Falcon Complete XDR." },
      ],
    },
  },

  "arctic-wolf": {
    slug: "arctic-wolf",
    name: "Arctic Wolf MDR",
    logo: "/logos/arctic-wolf.png",
    tagline: "Concierge security operations with a named team",
    bestFor: "Best for Guided, Concierge SOC Operations",
    description:
      "Arctic Wolf delivers managed detection and response through its cloud-native Security Operations platform and a concierge model: every customer gets a named Concierge Security Team that learns the environment and acts as an extension of your staff. Rather than selling a tool, Arctic Wolf sells an outcome, 24/7 monitoring, guided response and continuous security-posture improvement, which suits organisations that want a relationship-led SOC and steady hardening over time.",
    keyStats: [],
    whyWinsIntro: {
      label: "Arctic Wolf Highlights",
      title: "A named security team, not a ticket queue",
      description:
        "Arctic Wolf's concierge model assigns a consistent team that knows your environment, so monitoring, response and posture improvement feel like an in-house SOC you did not have to build.",
      stats: [
        { value: "Concierge", label: "Named Concierge Security Team for every customer", tone: "emerald" },
        { value: "24/7", label: "Monitoring, guided response and threat hunting", tone: "violet" },
        { value: "Open XDR", label: "Vendor-neutral ingestion across your existing tools", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Concierge model",
        icon: "users",
        tone: "emerald",
        title: "A team that learns your environment",
        desc: "A named Concierge Security Team works with you continuously, tuning detections to your context and acting as an extension of your staff rather than a rotating ticket queue.",
      },
      {
        tag: "Outcome-led",
        icon: "activity",
        tone: "violet",
        title: "Sells security operations, not a box",
        desc: "Arctic Wolf packages monitoring, response and continuous posture improvement as an outcome, which lowers the operational lift for teams without SOC expertise.",
      },
      {
        tag: "Open XDR",
        icon: "layers",
        tone: "sky",
        title: "Vendor-neutral telemetry",
        desc: "The Security Operations platform ingests logs and telemetry from your existing endpoint, network, cloud and identity tools, so you are not forced to rip and replace.",
      },
      {
        tag: "Posture improvement",
        icon: "barChart",
        tone: "amber",
        title: "Continuous hardening over time",
        desc: "Beyond detection, the Concierge Team drives recurring reviews and recommendations, steadily reducing risk rather than only reacting to alerts.",
      },
    ],
    watchOuts: [
      {
        title: "Relationship-led, not bleeding-edge tooling",
        desc: "Arctic Wolf's strength is the service model and outcomes. Organisations that want the deepest single-vendor platform technology sometimes prefer CrowdStrike or SentinelOne; those that want a named team and steady hardening favour Arctic Wolf.",
      },
    ],
    bestFitProfile: [
      "Organisations that want a named, consistent security team rather than a ticket queue",
      "Lean IT teams without SOC expertise that value guided response and hand-holding",
      "Mixed-vendor estates that want open, vendor-neutral telemetry ingestion",
      "Buyers focused on continuous security-posture improvement, not just alerts",
      "Mid-market and enterprise teams that prefer an outcome-led managed relationship",
    ],
    products: [
      { model: "Arctic Wolf MDR", segment: "Managed", role: "24/7 monitoring, guided response and a Concierge Security Team" },
      { model: "Managed Risk", segment: "Exposure", role: "Continuous vulnerability and posture management as a service" },
      { model: "Security Operations bundle", segment: "Platform", role: "MDR, Managed Risk and awareness on one operations platform" },
    ],
    whyArtiflex:
      "Artiflex IT brings Arctic Wolf to UAE organisations that want a relationship-led SOC. We onboard your telemetry sources to the Arctic Wolf platform, align the Concierge engagement to your governance, and provide local coordination so the named team's monitoring, response and posture work fits your compliance obligations.",
    faqs: [
      {
        question: "What is the Concierge Security Team?",
        answer:
          "It is a named, consistent Arctic Wolf team assigned to your account that learns your environment, tunes detections, guides response and drives continuous posture improvement, functioning as an extension of your staff rather than a rotating queue of analysts.",
      },
      {
        question: "Does Arctic Wolf require me to replace my existing tools?",
        answer:
          "No. The Security Operations platform is open and vendor-neutral, ingesting telemetry from your existing endpoint, network, cloud and identity tools, so it layers managed operations on top of what you already run.",
      },
      {
        question: "Is Arctic Wolf only detection, or also posture improvement?",
        answer:
          "Both. Alongside 24/7 detection and guided response, the Concierge Team drives recurring reviews and recommendations through Managed Risk, steadily hardening your security posture over time.",
      },
    ],
    whatIs: {
      eyebrow: "What is Arctic Wolf MDR",
      titlePrefix: "Concierge security operations as a ",
      titleHighlight: "managed outcome",
      bodyParagraphs: [
        "Arctic Wolf MDR is a managed detection and response service delivered through a cloud-native Security Operations platform and a concierge model. Every customer is assigned a named Concierge Security Team that monitors 24/7, guides response and continuously improves security posture.",
        "The platform is vendor-neutral, ingesting telemetry from your existing tools, so Arctic Wolf layers an outcome-led SOC on top of your estate without forcing a rip-and-replace.",
      ],
      feature: {
        titleLine1: "Named Team,",
        titleLine2: "Not a Queue",
        body: "Arctic Wolf's differentiator is the relationship: a consistent team that knows your environment, which is why lean IT teams treat it as the SOC they never had to hire.",
      },
      capabilities: [
        "Named Concierge Security Team for every customer",
        "24/7 monitoring, guided response and threat hunting",
        "Open, vendor-neutral telemetry ingestion",
        "Continuous security-posture improvement via Managed Risk",
      ],
    },
    deploymentOptions: {
      eyebrow: "How it is delivered",
      title: "Cloud platform, concierge team.",
      intro: "Artiflex onboards your sources and aligns the engagement to your governance.",
      options: [
        { icon: "cloud", title: "Security Operations cloud", body: "Telemetry ingested into the Arctic Wolf cloud platform from your existing tools." },
        { icon: "virtual", title: "Concierge engagement", body: "A named team monitors, guides response and tunes detections to your environment 24/7." },
        { icon: "hardware", title: "Managed Risk add-on", body: "Extend the relationship into continuous vulnerability and posture management." },
      ],
    },
  },
};

/* ───────────────────────── SIEM ───────────────────────── */

export const siemVendors: Record<string, SecOpsVendor> = {
  rapid7: {
    slug: "rapid7",
    name: "Rapid7 InsightIDR",
    logo: "/logos/rapid7.png",
    tagline: "Cloud-native SIEM with UEBA from day one",
    bestFor: "Best Overall Value SIEM (Recommended)",
    description:
      "Rapid7 InsightIDR is a cloud-native SIEM that ships with user-and-entity behaviour analytics, attacker-behaviour detections and built-in deception out of the box. It avoids the heavy engineering tax of legacy SIEMs: detections are curated by Rapid7, onboarding is fast, and pricing is user-based rather than data-volume based. For most UAE organisations it delivers the fastest, most predictable path to a working SIEM, with an optional managed (MDR) overlay on the same platform.",
    keyStats: [],
    whyWinsIntro: {
      label: "InsightIDR Highlights",
      title: "A SIEM that works on day one, not month nine",
      description:
        "Legacy SIEMs need a team of engineers to write rules before they detect anything. InsightIDR arrives with curated detections, UEBA and deception already on, so value starts immediately.",
      stats: [
        { value: "Cloud-native", label: "No SIEM infrastructure to build, scale or patch", tone: "emerald" },
        { value: "UEBA", label: "User and attacker-behaviour analytics built in", tone: "violet" },
        { value: "User-based", label: "Predictable pricing, not punishing data-volume bills", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Curated detections",
        icon: "list",
        tone: "emerald",
        title: "Detections you do not have to write",
        desc: "Rapid7's research team curates and maintains the detection library, so you get high-fidelity coverage without staffing rule-writing engineers, the cost that sinks most legacy SIEM projects.",
      },
      {
        tag: "UEBA",
        icon: "users",
        tone: "violet",
        title: "User and entity behaviour analytics",
        desc: "InsightIDR baselines normal user and asset behaviour and flags anomalies, surfacing compromised accounts and insider activity that signature rules miss.",
      },
      {
        tag: "User-based pricing",
        icon: "barChart",
        tone: "sky",
        title: "Predictable cost, not a data-volume tax",
        desc: "Pricing scales with users rather than ingested gigabytes, so detection coverage does not get rationed to control the bill, the trap that quietly degrades volume-priced SIEMs.",
      },
      {
        tag: "Unified platform",
        icon: "layers",
        tone: "amber",
        title: "SIEM, VM and MDR on one platform",
        desc: "InsightIDR shares the Insight platform with InsightVM and Rapid7 MDR, so detections can correlate with real vulnerabilities and you can add a managed SOC overlay without re-platforming.",
      },
    ],
    watchOuts: [
      {
        title: "Curated, not infinitely customisable",
        desc: "InsightIDR favours curated detections and fast time-to-value over the unlimited, build-anything flexibility of Splunk. Teams that need bespoke, deeply custom analytics at massive scale sometimes prefer a data-platform SIEM.",
      },
    ],
    bestFitProfile: [
      "UAE mid-market and enterprise teams that want a working SIEM quickly",
      "Organisations that prefer predictable user-based pricing over data-volume billing",
      "Teams that need UEBA and attacker-behaviour analytics without engineering them",
      "Buyers who want the option to add Rapid7 MDR on the same platform",
      "Security programmes correlating detections with InsightVM exposure data",
    ],
    products: [
      { model: "InsightIDR", segment: "SIEM", role: "Cloud SIEM with UEBA, curated detections and deception" },
      { model: "InsightIDR + MDR", segment: "Managed", role: "Same platform with a 24/7 Rapid7 managed SOC overlay" },
      { model: "Managed Threat Complete", segment: "Bundle", role: "SIEM, vulnerability management and attack-surface in one subscription" },
    ],
    whyArtiflex:
      "Artiflex IT deploys Rapid7 InsightIDR for UAE organisations that want a fast, predictable SIEM. We onboard log and telemetry sources, validate the curated detections against your environment, tune for noise, and integrate with InsightVM where exposure context matters. Where 24/7 coverage is needed, we extend the same platform to Rapid7 MDR.",
    faqs: [
      {
        question: "Why is InsightIDR faster to deploy than a traditional SIEM?",
        answer:
          "It is cloud-native and ships with curated detections, UEBA and deception already configured, so you are not building detection content from scratch. Most organisations have meaningful detection coverage in days rather than the many months a legacy SIEM rollout typically takes.",
      },
      {
        question: "How is InsightIDR priced?",
        answer:
          "Pricing is user-based rather than driven by ingested data volume. That keeps costs predictable and avoids the common SIEM trap of rationing log sources to control a volume-based bill.",
      },
      {
        question: "Can InsightIDR become a managed service?",
        answer:
          "Yes. Rapid7 MDR runs on the same InsightIDR platform, so you can add a 24/7 managed SOC overlay without re-platforming, and correlate detections with InsightVM vulnerability data.",
      },
    ],
    whatIs: {
      eyebrow: "What is Rapid7 InsightIDR",
      titlePrefix: "Cloud-native SIEM with ",
      titleHighlight: "analytics built in",
      bodyParagraphs: [
        "Rapid7 InsightIDR is a cloud-native security information and event management platform that combines log analytics with user-and-entity behaviour analytics, attacker-behaviour detections and deception technology, all curated and maintained by Rapid7.",
        "It is designed to avoid the engineering tax of legacy SIEM: fast onboarding, predictable user-based pricing and high-fidelity detections out of the box, with the option to add managed detection and exposure management on the same Insight platform.",
      ],
      feature: {
        titleLine1: "Value on",
        titleLine2: "Day One",
        body: "The difference from legacy SIEM is curation: Rapid7 maintains the detections, the UEBA models and the deception, so the platform detects threats immediately instead of after months of rule engineering.",
      },
      capabilities: [
        "Cloud-native SIEM with no infrastructure to manage",
        "Built-in UEBA and attacker-behaviour detections",
        "Curated detection library maintained by Rapid7",
        "Predictable user-based pricing and optional MDR overlay",
      ],
    },
    deploymentOptions: {
      eyebrow: "How it is delivered",
      title: "Cloud-delivered, fast to onboard.",
      intro: "Artiflex connects your sources and tunes detections to your environment.",
      options: [
        { icon: "cloud", title: "Cloud SIEM", body: "Fully SaaS InsightIDR platform with no SIEM servers to build, scale or patch." },
        { icon: "virtual", title: "Collectors", body: "Lightweight collectors and the Insight Agent gather endpoint, network, cloud and identity telemetry." },
        { icon: "hardware", title: "Managed overlay", body: "Add Rapid7 MDR for a 24/7 managed SOC on the same platform when in-house coverage is not viable." },
      ],
    },
  },

  splunk: {
    slug: "splunk",
    name: "Cisco Splunk Enterprise Security",
    logo: "/logos/Splunk.webp",
    tagline: "The market-leading data platform for security analytics at scale",
    bestFor: "Best for Large-Scale, Custom Analytics (Recommended)",
    description:
      "Splunk Enterprise Security is the most powerful and flexible SIEM on the market, built on Splunk's industry-defining data platform. Now part of Cisco, it ingests and correlates virtually any data source at massive scale, and lets mature SOC teams build bespoke detections, dashboards and investigations with unmatched depth. It is the premium choice for large enterprises and service providers that need analytics flexibility and have the engineering capacity to wield it.",
    keyStats: [],
    whyWinsIntro: {
      label: "Splunk ES Highlights",
      title: "If it produces data, Splunk can analyse it",
      description:
        "Splunk's data platform turns any log, metric or event into searchable, correlatable security signal. For teams that need to build exactly the analytics they want, nothing matches its flexibility.",
      stats: [
        { value: "Any data", label: "Schema-on-read ingestion of virtually any source", tone: "emerald" },
        { value: "SPL", label: "Search Processing Language for unlimited custom analytics", tone: "violet" },
        { value: "Cisco", label: "Now integrated with the Cisco security and network estate", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Data platform",
        icon: "barChart",
        tone: "emerald",
        title: "Ingest and correlate anything, at scale",
        desc: "Splunk's schema-on-read architecture ingests any data source and makes it searchable, so security, IT and business data can be correlated in one place at enterprise scale.",
      },
      {
        tag: "SPL flexibility",
        icon: "sliders",
        tone: "violet",
        title: "Build exactly the analytics you need",
        desc: "The Search Processing Language gives mature teams unlimited power to author custom detections, risk-based alerting and investigations that off-the-shelf SIEMs cannot express.",
      },
      {
        tag: "Ecosystem",
        icon: "globe",
        tone: "sky",
        title: "Vast app and integration marketplace",
        desc: "Splunkbase offers thousands of apps and technology add-ons, and Cisco integration ties Splunk to network, firewall and XDR telemetry across the Cisco estate.",
      },
      {
        tag: "SOAR + UBA",
        icon: "activity",
        tone: "amber",
        title: "A full SOC platform, not just a SIEM",
        desc: "Splunk SOAR automates response playbooks and Splunk UBA adds behaviour analytics, so Enterprise Security can anchor a complete security operations programme.",
      },
    ],
    watchOuts: [
      {
        title: "Power that demands expertise and budget",
        desc: "Splunk's flexibility is also its cost: licensing and data-volume economics are premium, and it rewards teams with the engineering capacity to build and maintain content. Smaller teams often get faster value from a curated SIEM like InsightIDR.",
      },
    ],
    bestFitProfile: [
      "Large enterprises and service providers needing analytics at massive scale",
      "Mature SOCs with the engineering capacity to author custom detections",
      "Organisations correlating security, IT and business data in one platform",
      "Cisco-aligned estates consolidating network and security telemetry",
      "Programmes that want SIEM, SOAR and UBA on one extensible platform",
    ],
    products: [
      { model: "Splunk Enterprise Security", segment: "SIEM", role: "Security analytics on the Splunk data platform" },
      { model: "Splunk SOAR", segment: "Automation", role: "Playbook-driven response orchestration and automation" },
      { model: "Splunk Cloud Platform", segment: "Cloud", role: "Splunk delivered as a managed cloud service" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Splunk Enterprise Security for UAE enterprises that need scale and custom analytics. We design data onboarding and index strategy, build detection and risk-based alerting content, integrate SOAR playbooks, and right-size licensing so you get Splunk's power without runaway data-volume cost.",
    faqs: [
      {
        question: "Is Splunk worth its premium cost?",
        answer:
          "For large enterprises and mature SOCs that need unlimited analytics flexibility and scale, Splunk's depth justifies the investment. For smaller teams that want fast, predictable coverage, a curated SIEM such as Rapid7 InsightIDR or Microsoft Sentinel is usually more cost-effective. Artiflex sizes both against your real requirements.",
      },
      {
        question: "What changed now that Cisco owns Splunk?",
        answer:
          "Splunk remains the same powerful data platform, with deepening integration into the Cisco security and network portfolio, so Cisco-aligned estates can correlate firewall, network and XDR telemetry with Splunk analytics more tightly.",
      },
      {
        question: "Can Splunk be deployed as a managed cloud service?",
        answer:
          "Yes. Splunk Cloud Platform delivers Splunk as a managed SaaS offering, removing the infrastructure burden while retaining the full power of Enterprise Security and SPL.",
      },
    ],
    whatIs: {
      eyebrow: "What is Splunk Enterprise Security",
      titlePrefix: "Security analytics on a ",
      titleHighlight: "limitless data platform",
      bodyParagraphs: [
        "Splunk Enterprise Security is a SIEM built on Splunk's data platform, which ingests virtually any data source with a schema-on-read model and makes it searchable and correlatable at massive scale. Mature SOC teams use the Search Processing Language to build bespoke detections, risk-based alerting and investigations.",
        "Now part of Cisco, Splunk pairs Enterprise Security with Splunk SOAR for automation and Splunk UBA for behaviour analytics, anchoring a complete security operations programme for enterprises with the engineering capacity to wield it.",
      ],
      feature: {
        titleLine1: "Unlimited",
        titleLine2: "Flexibility",
        body: "Splunk's strength is that nothing is off-limits: any data, any detection, any dashboard. That power suits large, mature teams; it is also why it demands engineering investment to run well.",
      },
      capabilities: [
        "Schema-on-read ingestion of virtually any data source",
        "Search Processing Language for unlimited custom analytics",
        "Splunk SOAR automation and Splunk UBA behaviour analytics",
        "Deep integration across the Cisco security and network estate",
      ],
    },
    deploymentOptions: {
      eyebrow: "How it is delivered",
      title: "Cloud or self-managed, your call.",
      intro: "Artiflex designs the data and licensing strategy whichever way you deploy.",
      options: [
        { icon: "cloud", title: "Splunk Cloud", body: "Splunk delivered as a managed SaaS platform, removing infrastructure overhead." },
        { icon: "hardware", title: "Self-managed", body: "On-premises or private-cloud Splunk for data-sovereignty and full control." },
        { icon: "virtual", title: "Hybrid + SOAR", body: "Mixed deployment with Splunk SOAR playbooks and Cisco telemetry integration." },
      ],
    },
  },

  exabeam: {
    slug: "exabeam",
    name: "Exabeam New-Scale SIEM",
    logo: "/logos/Exabeam.png",
    tagline: "UEBA-first SIEM that builds the attack timeline for you",
    bestFor: "Best for Insider Threat and UEBA (Recommended)",
    description:
      "Exabeam pioneered user-and-entity behaviour analytics and built it into the core of its SIEM. Its signature capability, Smart Timelines, automatically stitches disparate events into a single, chronological narrative of an incident per user or asset, dramatically cutting investigation time. The New-Scale SIEM platform delivers cloud-scale ingestion with that behaviour-analytics engine, making Exabeam the standout choice when insider threats, compromised credentials and analyst efficiency are the priority.",
    keyStats: [],
    whyWinsIntro: {
      label: "Exabeam Highlights",
      title: "The SIEM that does the timeline work for you",
      description:
        "Most SIEM investigation time is spent reconstructing what happened. Exabeam's Smart Timelines assemble the full behavioural story automatically, so analysts start with the narrative, not raw logs.",
      stats: [
        { value: "Smart Timelines", label: "Automated, chronological incident reconstruction per entity", tone: "emerald" },
        { value: "UEBA-first", label: "Behaviour analytics at the core, not a bolt-on", tone: "violet" },
        { value: "New-Scale", label: "Cloud-scale ingestion, search and analytics", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Smart Timelines",
        icon: "list",
        tone: "emerald",
        title: "Investigations that build themselves",
        desc: "Exabeam automatically correlates events into a single timeline per user or asset, so analysts see the complete sequence of an incident instead of manually piecing together logs.",
      },
      {
        tag: "UEBA core",
        icon: "users",
        tone: "violet",
        title: "Behaviour analytics at the centre",
        desc: "Risk scoring is built on baselined normal behaviour, so credential abuse, lateral movement and insider activity surface as anomalies rather than relying on static rules.",
      },
      {
        tag: "New-Scale",
        icon: "barChart",
        tone: "sky",
        title: "Cloud-scale ingestion and search",
        desc: "The New-Scale platform delivers fast ingestion, long retention and rapid search at cloud scale, pairing modern data architecture with the behaviour-analytics engine.",
      },
      {
        tag: "Outcomes content",
        icon: "shield",
        tone: "amber",
        title: "Prescriptive, use-case-driven detection",
        desc: "Exabeam ships prescriptive content packages aligned to threat use cases, so teams operationalise insider-threat and compromised-credential detection quickly.",
      },
    ],
    watchOuts: [
      {
        title: "Strongest where behaviour is the question",
        desc: "Exabeam shines for insider threat, credential abuse and analyst efficiency. Organisations whose primary need is unlimited custom analytics at hyperscale sometimes prefer Splunk; those wanting fastest turnkey value lean to InsightIDR or Sentinel.",
      },
    ],
    bestFitProfile: [
      "Organisations prioritising insider-threat and compromised-credential detection",
      "SOCs that want to cut investigation time with automated timelines",
      "Teams that value UEBA at the core rather than as a bolt-on module",
      "Buyers needing cloud-scale ingestion with long retention",
      "Security programmes that prefer prescriptive, use-case-driven content",
    ],
    products: [
      { model: "Exabeam New-Scale SIEM", segment: "SIEM", role: "Cloud-scale SIEM with UEBA and Smart Timelines" },
      { model: "Exabeam Fusion", segment: "SIEM + analytics", role: "SIEM combined with behaviour-analytics and automation" },
      { model: "Exabeam Security Operations Platform", segment: "Platform", role: "Ingestion, analytics, investigation and automation unified" },
    ],
    whyArtiflex:
      "Artiflex IT deploys Exabeam for UAE organisations where insider threat and analyst efficiency are decisive. We onboard identity and activity sources, tune the behaviour-analytics models, operationalise Smart Timelines in the SOC workflow, and align prescriptive content to your priority threat use cases.",
    faqs: [
      {
        question: "What are Exabeam Smart Timelines?",
        answer:
          "Smart Timelines automatically correlate disparate events into a single chronological narrative per user or asset, so an analyst sees the full sequence of an incident, normal and anomalous activity in context, without manually reconstructing it from raw logs. This is Exabeam's signature time-saver.",
      },
      {
        question: "How is Exabeam different from a traditional SIEM?",
        answer:
          "Traditional SIEMs centre on rules and log search; Exabeam centres on user-and-entity behaviour analytics. Risk is scored against baselined behaviour, which is why it excels at insider threat, compromised credentials and lateral movement that signature rules miss.",
      },
      {
        question: "Is Exabeam cloud-based?",
        answer:
          "Yes. The New-Scale SIEM platform delivers cloud-scale ingestion, long retention and fast search, pairing modern cloud data architecture with Exabeam's behaviour-analytics engine.",
      },
    ],
    whatIs: {
      eyebrow: "What is Exabeam",
      titlePrefix: "A UEBA-first SIEM with ",
      titleHighlight: "automated timelines",
      bodyParagraphs: [
        "Exabeam is a security information and event management platform built around user-and-entity behaviour analytics. Its New-Scale SIEM ingests and searches data at cloud scale, while its analytics engine scores risk against baselined normal behaviour.",
        "Its defining capability, Smart Timelines, automatically reconstructs the chronological story of an incident per user or asset, so analysts begin with a complete narrative instead of raw events, cutting investigation time dramatically.",
      ],
      feature: {
        titleLine1: "Behaviour at",
        titleLine2: "the Core",
        body: "Exabeam was built UEBA-first, so detecting the abuse of legitimate credentials and insider activity is native, not an add-on, and the timeline does the correlation work for the analyst.",
      },
      capabilities: [
        "Automated Smart Timelines per user and asset",
        "User-and-entity behaviour analytics at the core",
        "Cloud-scale ingestion, retention and search",
        "Prescriptive, use-case-driven detection content",
      ],
    },
    deploymentOptions: {
      eyebrow: "How it is delivered",
      title: "Cloud-scale, analytics-first.",
      intro: "Artiflex onboards sources and tunes the behaviour models.",
      options: [
        { icon: "cloud", title: "New-Scale cloud", body: "Cloud-scale ingestion, long retention and fast search delivered as a service." },
        { icon: "virtual", title: "Identity sources", body: "Authentication, directory and activity telemetry feed the UEBA engine." },
        { icon: "hardware", title: "SOC integration", body: "Smart Timelines and prescriptive content embedded into your investigation workflow." },
      ],
    },
  },

  sentinel: {
    slug: "sentinel",
    name: "Microsoft Sentinel",
    logo: "/logos/MicrosoftDefender.webp",
    tagline: "Cloud-native SIEM and SOAR built into Azure",
    bestFor: "Best for Microsoft and Azure Estates",
    description:
      "Microsoft Sentinel is a cloud-native SIEM and SOAR delivered on Azure, with no infrastructure to manage and pay-as-you-go ingestion. It connects natively to Microsoft 365, Entra ID, Defender XDR and Azure, and ingests third-party sources through hundreds of connectors. For Microsoft-aligned organisations it is the lowest-friction, most scalable SIEM, with built-in automation, UEBA and tight Defender XDR correlation, increasingly unified under the Microsoft Defender portal.",
    keyStats: [],
    whyWinsIntro: {
      label: "Microsoft Sentinel Highlights",
      title: "Cloud SIEM where your Microsoft signal already lives",
      description:
        "If your estate runs on Microsoft 365 and Azure, Sentinel ingests that telemetry natively and scales elastically in the cloud, with SOAR and UEBA built in.",
      stats: [
        { value: "Cloud-native", label: "No SIEM infrastructure; elastic Azure scale", tone: "emerald" },
        { value: "Native", label: "Deep M365, Entra ID, Defender XDR and Azure integration", tone: "violet" },
        { value: "SOAR + UEBA", label: "Built-in automation and behaviour analytics", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Cloud-native",
        icon: "monitor",
        tone: "emerald",
        title: "Elastic scale, no infrastructure",
        desc: "Sentinel runs on Azure with no servers to build or patch, scaling ingestion elastically and billing pay-as-you-go, so you pay for the data you actually collect.",
      },
      {
        tag: "Microsoft-native",
        icon: "layers",
        tone: "violet",
        title: "Deepest Microsoft signal correlation",
        desc: "Native connectors and unified incidents tie Sentinel to Defender XDR, Entra ID, M365 and Azure, giving the richest context for Microsoft-centric estates.",
      },
      {
        tag: "SOAR",
        icon: "activity",
        tone: "sky",
        title: "Automation playbooks built in",
        desc: "Logic Apps-based playbooks automate enrichment and response directly in Sentinel, reducing analyst toil without bolting on a separate SOAR product.",
      },
      {
        tag: "Copilot",
        icon: "message",
        tone: "amber",
        title: "AI-assisted investigation",
        desc: "Security Copilot and built-in UEBA accelerate triage and investigation, raising the floor for lean SOCs operating in the Microsoft ecosystem.",
      },
    ],
    watchOuts: [
      {
        title: "Watch ingestion economics for non-Microsoft data",
        desc: "Sentinel is excellent value for Microsoft telemetry. High-volume third-party ingestion can grow cost, so log-source and data-tiering strategy matters. Artiflex designs ingestion to keep Sentinel economical at scale.",
      },
    ],
    bestFitProfile: [
      "UAE organisations standardised on Microsoft 365 and Azure",
      "Teams wanting cloud-native SIEM with no infrastructure to run",
      "Estates using Microsoft Defender XDR that want unified incidents",
      "Buyers who value built-in SOAR automation and UEBA",
      "Programmes adopting Security Copilot for AI-assisted investigation",
    ],
    products: [
      { model: "Microsoft Sentinel", segment: "SIEM + SOAR", role: "Cloud-native SIEM with automation on Azure" },
      { model: "Sentinel + Defender XDR", segment: "Unified SecOps", role: "Unified incidents across SIEM and XDR in the Defender portal" },
      { model: "Sentinel + Security Copilot", segment: "AI-assisted", role: "Generative-AI investigation and response acceleration" },
    ],
    whyArtiflex:
      "Artiflex IT deploys Microsoft Sentinel for Microsoft-aligned UAE organisations. We design data connectors and ingestion tiering to control cost, build analytics rules and SOAR playbooks, unify Sentinel with Defender XDR, and align the whole deployment to NESA, PDPL and ISO 27001 evidence requirements.",
    faqs: [
      {
        question: "Is Microsoft Sentinel only for Microsoft environments?",
        answer:
          "It is strongest for Microsoft 365 and Azure estates, where it ingests telemetry natively and unifies incidents with Defender XDR. It also connects to hundreds of third-party sources, so it can serve a mixed estate, with ingestion strategy designed to keep non-Microsoft data economical.",
      },
      {
        question: "How is Sentinel priced?",
        answer:
          "Sentinel uses pay-as-you-go ingestion (with commitment-tier options), so you pay for the data you collect. Because there is no infrastructure to run, cost is driven by data volume, which makes log-source and data-tiering design important.",
      },
      {
        question: "Does Sentinel include automation?",
        answer:
          "Yes. Sentinel has built-in SOAR via Logic Apps playbooks for automated enrichment and response, plus UEBA, and integrates with Security Copilot for AI-assisted investigation.",
      },
    ],
    whatIs: {
      eyebrow: "What is Microsoft Sentinel",
      titlePrefix: "Cloud-native SIEM and SOAR on ",
      titleHighlight: "Azure",
      bodyParagraphs: [
        "Microsoft Sentinel is a cloud-native security information and event management and security orchestration platform delivered on Azure. It scales elastically with no infrastructure to manage, ingests Microsoft and third-party telemetry through hundreds of connectors, and bills pay-as-you-go.",
        "For Microsoft-aligned organisations it offers the deepest correlation with Defender XDR, Entra ID and M365, plus built-in SOAR automation, UEBA and Security Copilot, increasingly unified in the Microsoft Defender portal.",
      ],
      feature: {
        titleLine1: "Native to",
        titleLine2: "Microsoft Cloud",
        body: "Sentinel's advantage is proximity to your Microsoft signal: it ingests it natively, unifies incidents with Defender XDR and scales in Azure, which is why it is the lowest-friction SIEM for Microsoft estates.",
      },
      capabilities: [
        "Cloud-native SIEM with elastic Azure scale",
        "Native Defender XDR, Entra ID and M365 correlation",
        "Built-in SOAR automation and UEBA",
        "Security Copilot AI-assisted investigation",
      ],
    },
    deploymentOptions: {
      eyebrow: "How it is delivered",
      title: "Cloud-native, your Azure tenant.",
      intro: "Artiflex designs connectors and ingestion tiering to control cost.",
      options: [
        { icon: "cloud", title: "Azure-delivered", body: "Sentinel runs in your Azure tenant with elastic scale and pay-as-you-go ingestion." },
        { icon: "virtual", title: "Data connectors", body: "Native Microsoft connectors plus hundreds of third-party sources, with tiering to manage cost." },
        { icon: "hardware", title: "Unified SecOps", body: "Unify with Defender XDR and Security Copilot in the Microsoft Defender portal." },
      ],
    },
  },

  qradar: {
    slug: "qradar",
    name: "IBM QRadar",
    logo: "/logos/IBM-Security.png",
    tagline: "Enterprise SIEM with deep correlation and a modern cloud suite",
    bestFor: "Best for Regulated, Compliance-Heavy Enterprises",
    description:
      "IBM QRadar is a long-established enterprise SIEM known for powerful correlation, network-flow analysis and mature compliance reporting. The modern QRadar Suite extends it with cloud-delivered log management, EDR, SOAR and AI-assisted investigation. With deep integration into the IBM security ecosystem and strong audit capabilities, QRadar remains a default in banking, government and heavily-regulated environments that need rigorous correlation and evidence-grade reporting.",
    keyStats: [],
    whyWinsIntro: {
      label: "IBM QRadar Highlights",
      title: "Correlation and compliance built for regulated estates",
      description:
        "QRadar's correlation engine and network-flow analytics, paired with mature compliance reporting, make it a trusted choice where auditors and regulators set the bar.",
      stats: [
        { value: "Correlation", label: "Powerful rule and flow-based correlation engine", tone: "emerald" },
        { value: "QFlow", label: "Network-flow analysis for traffic-level detection", tone: "violet" },
        { value: "QRadar Suite", label: "Cloud-delivered log management, EDR, SOAR and AI", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Correlation engine",
        icon: "list",
        tone: "emerald",
        title: "Deep, mature event correlation",
        desc: "QRadar's correlation engine ties events across sources into prioritised offences, reducing noise and surfacing the incidents that matter, refined over many years in demanding enterprises.",
      },
      {
        tag: "QFlow",
        icon: "activity",
        tone: "violet",
        title: "Network-flow analytics",
        desc: "Beyond logs, QRadar analyses network flow data, adding traffic-level visibility that catches threats which log sources alone do not reveal.",
      },
      {
        tag: "Compliance",
        icon: "file",
        tone: "sky",
        title: "Evidence-grade reporting",
        desc: "Mature, out-of-the-box compliance content and reporting suit banking, government and regulated industries that must demonstrate control effectiveness to auditors.",
      },
      {
        tag: "QRadar Suite",
        icon: "layers",
        tone: "amber",
        title: "A modern, cloud-delivered platform",
        desc: "The QRadar Suite adds cloud-native log management, EDR, SOAR and AI-assisted investigation, modernising the stack while preserving QRadar's correlation strengths.",
      },
    ],
    watchOuts: [
      {
        title: "Best with platform expertise",
        desc: "QRadar is powerful but rewards experienced operators; tuning and content management take skill. Cloud-first teams seeking fastest turnkey value sometimes prefer Sentinel or InsightIDR. Artiflex provides the QRadar expertise UAE enterprises need.",
      },
    ],
    bestFitProfile: [
      "Banks, government and regulated entities needing evidence-grade reporting",
      "Enterprises that value deep correlation and network-flow analytics",
      "Organisations already invested in the IBM security ecosystem",
      "Teams modernising toward the cloud-delivered QRadar Suite",
      "Programmes with the expertise to operate a powerful enterprise SIEM",
    ],
    products: [
      { model: "QRadar SIEM", segment: "SIEM", role: "Correlation and flow-based security analytics" },
      { model: "QRadar Suite (Cloud)", segment: "Cloud platform", role: "Log management, EDR, SOAR and AI-assisted investigation" },
      { model: "QRadar SOAR", segment: "Automation", role: "Case management and automated response orchestration" },
    ],
    whyArtiflex:
      "Artiflex IT delivers IBM QRadar for regulated UAE enterprises. Our engineers design log and flow source onboarding, build correlation content and compliance reporting aligned to NESA, CBUAE and ISO 27001, integrate QRadar SOAR, and support migration toward the cloud-delivered QRadar Suite.",
    faqs: [
      {
        question: "Is QRadar still relevant given newer cloud SIEMs?",
        answer:
          "Yes, particularly for regulated enterprises. QRadar's correlation engine, network-flow analytics and mature compliance reporting remain strong, and the cloud-delivered QRadar Suite modernises the stack with log management, EDR, SOAR and AI while preserving those strengths.",
      },
      {
        question: "What is QFlow?",
        answer:
          "QFlow is QRadar's network-flow analysis capability. By inspecting traffic flow data in addition to logs, it adds traffic-level visibility that helps detect threats which log sources alone would miss.",
      },
      {
        question: "Does QRadar suit compliance-heavy environments?",
        answer:
          "It is one of its core strengths. QRadar ships mature compliance content and evidence-grade reporting, which is why it is widely used in banking, government and other regulated sectors that must demonstrate control effectiveness.",
      },
    ],
    whatIs: {
      eyebrow: "What is IBM QRadar",
      titlePrefix: "Enterprise SIEM with deep ",
      titleHighlight: "correlation",
      bodyParagraphs: [
        "IBM QRadar is an enterprise security information and event management platform known for a powerful correlation engine, network-flow analytics (QFlow) and mature compliance reporting. It consolidates logs and flows into prioritised offences for the SOC.",
        "The modern QRadar Suite extends it with cloud-delivered log management, EDR, SOAR and AI-assisted investigation, modernising the platform while retaining the correlation depth that made QRadar a default in regulated enterprises.",
      ],
      feature: {
        titleLine1: "Correlation",
        titleLine2: "and Compliance",
        body: "QRadar's enduring strengths are deep correlation and evidence-grade reporting, which is exactly what auditors and regulators in banking and government demand.",
      },
      capabilities: [
        "Mature correlation engine producing prioritised offences",
        "QFlow network-flow analytics for traffic-level detection",
        "Evidence-grade compliance content and reporting",
        "Cloud-delivered QRadar Suite with EDR, SOAR and AI",
      ],
    },
    deploymentOptions: {
      eyebrow: "How it is delivered",
      title: "On-prem, cloud or suite.",
      intro: "Artiflex builds correlation and compliance content whichever you choose.",
      options: [
        { icon: "hardware", title: "On-premises", body: "Self-hosted QRadar for data-sovereign, fully-controlled enterprise deployments." },
        { icon: "cloud", title: "QRadar Suite cloud", body: "Cloud-delivered log management, EDR, SOAR and AI-assisted investigation." },
        { icon: "virtual", title: "Hybrid + SOAR", body: "Mixed deployment with QRadar SOAR case management and automated response." },
      ],
    },
  },

  secureworks: {
    slug: "secureworks",
    name: "Secureworks Taegis XDR",
    logo: "/logos/Secureworks.png",
    tagline: "Analytics-driven XDR with Counter Threat Unit intelligence",
    bestFor: "Best for Open XDR with Threat Intelligence",
    description:
      "Secureworks Taegis is an analytics-driven, cloud-native XDR platform that can serve as a modern SIEM alternative. It correlates telemetry across endpoint, network, cloud and identity, applies Counter Threat Unit intelligence and a curated detector library, and gives analysts a transparent investigation surface. Now part of Sophos, Taegis is the choice when you want open, vendor-neutral detection with adversary-focused intelligence and an optional managed (MXDR) overlay rather than building and tuning a traditional SIEM.",
    keyStats: [],
    whyWinsIntro: {
      label: "Secureworks Taegis Highlights",
      title: "XDR analytics with an adversary focus",
      description:
        "Taegis pairs curated, intelligence-led detections with open telemetry correlation, so you get high-fidelity detection without the rule-engineering burden of a legacy SIEM.",
      stats: [
        { value: "CTU", label: "Counter Threat Unit named-adversary intelligence", tone: "emerald" },
        { value: "Open XDR", label: "Vendor-neutral correlation across your existing tools", tone: "violet" },
        { value: "MXDR", label: "Optional 24/7 managed overlay on the same platform", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Curated detectors",
        icon: "list",
        tone: "emerald",
        title: "Intelligence-led detection content",
        desc: "Taegis ships a curated detector library tied to Counter Threat Unit research, so detections track real adversary tradecraft instead of requiring you to author and maintain rules.",
      },
      {
        tag: "Open telemetry",
        icon: "layers",
        tone: "violet",
        title: "Vendor-neutral correlation",
        desc: "Taegis ingests endpoint, network, cloud and identity data from any major vendor, making it a strong SIEM alternative for heterogeneous estates that resist single-vendor lock-in.",
      },
      {
        tag: "Transparent",
        icon: "eye",
        tone: "sky",
        title: "Investigations you can see into",
        desc: "Analysts work on a transparent investigation surface with the evidence behind each detection, rather than receiving opaque verdicts they cannot audit.",
      },
      {
        tag: "Managed option",
        icon: "users",
        tone: "amber",
        title: "Self-driven or fully managed",
        desc: "Run Taegis with your own analysts, or add Secureworks MXDR for a 24/7 managed SOC on the same platform, without re-platforming.",
      },
    ],
    watchOuts: [
      {
        title: "XDR model, not a classic log-everything SIEM",
        desc: "Taegis is analytics- and detection-led rather than a build-anything log platform. Teams with mandates to retain and search vast raw log volumes for compliance sometimes pair it with, or prefer, a traditional SIEM such as QRadar or Splunk.",
      },
    ],
    bestFitProfile: [
      "Organisations wanting open, vendor-neutral XDR detection over legacy SIEM",
      "Teams that value Counter Threat Unit adversary intelligence",
      "Estates built on mixed vendors that resist single-vendor lock-in",
      "Buyers who want transparent, evidence-backed investigations",
      "Programmes that may add a managed MXDR overlay over time",
    ],
    products: [
      { model: "Taegis XDR", segment: "Self-driven", role: "Analytics-driven XDR with CTU detectors for your analysts" },
      { model: "Taegis MXDR", segment: "Managed", role: "24/7 Secureworks SOC on the same platform" },
      { model: "Taegis ManagedXDR + IR", segment: "Enterprise", role: "Managed detection paired with an incident-response retainer" },
    ],
    whyArtiflex:
      "Artiflex IT deploys Secureworks Taegis for UAE organisations that want intelligence-led, vendor-neutral detection. We integrate your telemetry sources, tune the curated detectors to your environment, and either enable your team to self-drive Taegis or layer Secureworks MXDR for managed coverage, with local governance throughout.",
    faqs: [
      {
        question: "Is Taegis a SIEM or an XDR?",
        answer:
          "Taegis is an analytics-driven XDR platform that can serve as a modern SIEM alternative. It correlates telemetry across layers and applies curated, intelligence-led detections, rather than acting as a build-everything log-retention platform. Where heavy raw-log retention is mandated, it is often paired with a traditional SIEM.",
      },
      {
        question: "Does Taegis lock me into Secureworks tools?",
        answer:
          "No. Taegis is open and vendor-neutral, ingesting endpoint, network, cloud and identity telemetry from any major vendor, which suits mixed estates that want to avoid single-vendor lock-in.",
      },
      {
        question: "Can I add managed coverage later?",
        answer:
          "Yes. You can run Taegis XDR self-driven and later add Secureworks MXDR for a 24/7 managed SOC on the same platform, optionally with an incident-response retainer, without changing tools.",
      },
    ],
    whatIs: {
      eyebrow: "What is Secureworks Taegis",
      titlePrefix: "Open XDR analytics with ",
      titleHighlight: "adversary intelligence",
      bodyParagraphs: [
        "Secureworks Taegis is a cloud-native, analytics-driven XDR platform that serves as a modern alternative to a traditional SIEM. It correlates endpoint, network, cloud and identity telemetry, applies Counter Threat Unit intelligence and a curated detector library, and gives analysts a transparent investigation surface.",
        "Now part of Sophos, Taegis can be run self-driven by your own analysts or layered with Secureworks MXDR for a fully-managed 24/7 SOC, making it flexible for organisations at different stages of SOC maturity.",
      ],
      feature: {
        titleLine1: "Intelligence-led",
        titleLine2: "Detection",
        body: "Taegis ties its curated detectors to Counter Threat Unit research, so detection tracks real adversary behaviour, removing the rule-engineering burden that weighs down legacy SIEM projects.",
      },
      capabilities: [
        "Curated, CTU-intelligence-led detector library",
        "Open, vendor-neutral telemetry correlation",
        "Transparent, evidence-backed investigations",
        "Self-driven XDR or fully-managed MXDR on one platform",
      ],
    },
    deploymentOptions: {
      eyebrow: "How it is delivered",
      title: "Cloud XDR, managed or self-driven.",
      intro: "Artiflex matches the model to your SOC maturity.",
      options: [
        { icon: "cloud", title: "Cloud XDR", body: "Taegis correlation and curated detectors delivered as a cloud service." },
        { icon: "virtual", title: "Open telemetry", body: "Ingest endpoint, network, cloud and identity data from any major vendor." },
        { icon: "hardware", title: "Managed overlay", body: "Add Secureworks MXDR and an IR retainer for 24/7 managed coverage." },
      ],
    },
  },

  wazuh: {
    slug: "wazuh",
    name: "Wazuh Open Source SIEM",
    logo: "/logos/Wazuh.png",
    tagline: "Free, open-source SIEM and XDR you fully control",
    bestFor: "Best for Budget-Conscious, Sovereign and OSS-First Teams",
    description:
      "Wazuh is a free, open-source security platform that delivers SIEM and XDR capabilities: log analysis, file-integrity monitoring, intrusion detection, vulnerability detection and regulatory compliance, all self-hosted and fully under your control. With no licensing cost and complete data sovereignty, it suits budget-conscious teams, sovereign deployments and OSS-first organisations, provided they have the engineering capacity to deploy, scale and maintain it. Artiflex makes that operationally viable.",
    keyStats: [],
    whyWinsIntro: {
      label: "Wazuh Highlights",
      title: "Enterprise-grade capability, zero licence cost",
      description:
        "Wazuh proves a capable SIEM does not have to carry a licence bill. The trade is engineering effort, which Artiflex provides so the platform is production-grade rather than a science project.",
      stats: [
        { value: "Open source", label: "No licence cost; full source and data control", tone: "emerald" },
        { value: "SIEM + XDR", label: "Log analysis, FIM, IDS, vulnerability and compliance", tone: "violet" },
        { value: "Sovereign", label: "Fully self-hosted for data-residency requirements", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Zero licence cost",
        icon: "barChart",
        tone: "emerald",
        title: "Capability without the licence bill",
        desc: "Wazuh delivers SIEM and XDR functionality with no per-GB or per-user licensing, redirecting budget from licences to the engineering and tuning that actually improves detection.",
      },
      {
        tag: "Broad capability",
        icon: "layers",
        tone: "violet",
        title: "SIEM and XDR in one platform",
        desc: "Beyond log analysis, Wazuh provides file-integrity monitoring, host intrusion detection, vulnerability detection and compliance content, covering use cases that usually require several tools.",
      },
      {
        tag: "Data sovereignty",
        icon: "lock",
        tone: "sky",
        title: "Fully self-hosted and controlled",
        desc: "Because Wazuh is self-hosted and open source, all data stays within your infrastructure, ideal for sovereign and data-residency requirements common in UAE government and regulated sectors.",
      },
      {
        tag: "Compliance content",
        icon: "file",
        tone: "amber",
        title: "Out-of-the-box compliance mapping",
        desc: "Wazuh ships content mapped to frameworks such as PCI-DSS, ISO 27001 and others, helping regulated teams demonstrate control coverage without commercial add-ons.",
      },
    ],
    watchOuts: [
      {
        title: "Capability is free; operating it is not",
        desc: "Wazuh has no licence cost, but it requires real engineering to deploy, scale, secure and tune. Without that, it becomes shelfware. Artiflex provides the deployment, hardening and managed operation that turns Wazuh into a production-grade SIEM.",
      },
    ],
    bestFitProfile: [
      "Budget-conscious organisations that want capability without licence cost",
      "Sovereign and data-residency-sensitive deployments needing full self-hosting",
      "OSS-first teams that value transparency and source control",
      "Regulated teams using Wazuh's built-in compliance content",
      "Organisations with, or partnering for, the engineering to operate it well",
    ],
    products: [
      { model: "Wazuh (self-managed)", segment: "Open source", role: "Self-hosted SIEM and XDR with full data control" },
      { model: "Wazuh Cloud", segment: "Hosted", role: "Wazuh delivered as a managed cloud service" },
      { model: "Artiflex Managed Wazuh", segment: "Co-managed", role: "Artiflex deploys, hardens and operates Wazuh for you" },
    ],
    whyArtiflex:
      "Artiflex IT makes Wazuh production-grade for UAE organisations. We architect and deploy the cluster for scale and resilience, harden it, build detection and compliance content, integrate your log sources, and offer co-managed operation, so you get open-source economics with enterprise-grade reliability and tuning.",
    faqs: [
      {
        question: "Is Wazuh really free?",
        answer:
          "The Wazuh platform is free and open source, with no licensing cost. The real investment is engineering: deploying, scaling, securing and tuning it for production. Artiflex provides that expertise so the savings are genuine rather than offset by operational pain.",
      },
      {
        question: "Is Wazuh enterprise-capable?",
        answer:
          "Yes, when deployed properly. Wazuh delivers SIEM and XDR capabilities, log analysis, file-integrity monitoring, intrusion detection, vulnerability detection and compliance content, that cover serious use cases. It requires careful architecture for scale, which Artiflex provides.",
      },
      {
        question: "Does Wazuh suit sovereign or data-residency requirements?",
        answer:
          "Strongly. Because Wazuh is self-hosted and open source, all data stays within your own infrastructure, making it well-suited to sovereign deployments and the data-residency requirements common in UAE government and regulated sectors.",
      },
    ],
    whatIs: {
      eyebrow: "What is Wazuh",
      titlePrefix: "Open-source SIEM and XDR you ",
      titleHighlight: "fully control",
      bodyParagraphs: [
        "Wazuh is a free, open-source security platform that provides SIEM and XDR capabilities: log analysis, file-integrity monitoring, host intrusion detection, vulnerability detection and regulatory-compliance content. It is self-hosted, so all data and control remain in your infrastructure.",
        "With no licensing cost and complete data sovereignty, Wazuh suits budget-conscious, sovereign and OSS-first organisations, provided they invest in the engineering to deploy, scale and maintain it, which Artiflex delivers as a managed capability.",
      ],
      feature: {
        titleLine1: "Open Source,",
        titleLine2: "Fully Controlled",
        body: "Wazuh's value is economics and control: enterprise-grade capability with no licence cost and complete data sovereignty. The trade-off is engineering effort, which is where a delivery partner earns its keep.",
      },
      capabilities: [
        "Free, open-source SIEM and XDR with no licence cost",
        "Log analysis, FIM, intrusion and vulnerability detection",
        "Fully self-hosted for data sovereignty",
        "Built-in regulatory-compliance content",
      ],
    },
    deploymentOptions: {
      eyebrow: "How it is delivered",
      title: "Self-hosted, cloud or co-managed.",
      intro: "Artiflex makes open source production-grade.",
      options: [
        { icon: "hardware", title: "Self-managed", body: "On-premises or private-cloud Wazuh cluster, fully sovereign and under your control." },
        { icon: "cloud", title: "Wazuh Cloud", body: "Hosted Wazuh as a managed service when you prefer not to run infrastructure." },
        { icon: "virtual", title: "Artiflex co-managed", body: "We deploy, harden, tune and operate Wazuh so the open-source savings are real." },
      ],
    },
  },
};

/* ───────────────────────── NDR ───────────────────────── */

export const ndrVendors: Record<string, SecOpsVendor> = {
  linkshadow: {
    slug: "linkshadow",
    name: "LinkShadow NDR",
    logo: "/logos/LinkShadow.png",
    tagline: "UAE-founded NDR with native regional compliance",
    bestFor: "Regional Pick for the UAE (Recommended)",
    description:
      "LinkShadow is a UAE-founded network detection and response platform that pairs AI-driven behavioural analytics with deep east-west visibility. As a regional vendor, it is built for NESA, CBUAE and ADHICS alignment, offers Arabic-capable delivery and local support, and provides agentless visibility across IT, OT and IoT. For UAE organisations that value data sovereignty, regulatory fit and a vendor that understands the local threat and compliance landscape, LinkShadow is the natural NDR starting point.",
    keyStats: [],
    whyWinsIntro: {
      label: "LinkShadow Highlights",
      title: "An NDR built for the region it defends",
      description:
        "Most NDR vendors are global products retrofitted to local compliance. LinkShadow was built in the UAE, so regional regulation, sovereignty and support are first-class, not afterthoughts.",
      stats: [
        { value: "UAE-founded", label: "Regional vendor with local presence and support", tone: "emerald" },
        { value: "NESA / CBUAE", label: "Native alignment to UAE regulatory frameworks", tone: "violet" },
        { value: "Agentless", label: "East-west visibility across IT, OT and IoT", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Regional fit",
        icon: "globe",
        tone: "emerald",
        title: "Built for UAE regulation and sovereignty",
        desc: "LinkShadow is designed around NESA, CBUAE and ADHICS expectations, with deployment and data-handling options that suit sovereign and data-residency requirements common across UAE government and finance.",
      },
      {
        tag: "Behavioural analytics",
        icon: "activity",
        tone: "violet",
        title: "AI-driven anomaly detection",
        desc: "Machine-learning behavioural analytics baseline normal network and user activity and flag deviations, surfacing lateral movement, C2 beaconing and data exfiltration that signatures miss.",
      },
      {
        tag: "Agentless visibility",
        icon: "eye",
        tone: "sky",
        title: "See east-west traffic without agents",
        desc: "Agentless network sensing gives visibility into internal traffic across IT, OT and IoT, the blind spot that perimeter controls and endpoint agents do not cover.",
      },
      {
        tag: "Local delivery",
        icon: "users",
        tone: "amber",
        title: "Arabic-capable, local support",
        desc: "Regional presence means Arabic-capable delivery, local escalation and a vendor that understands the UAE threat and compliance landscape, valuable for government and regulated buyers.",
      },
    ],
    watchOuts: [
      {
        title: "Smaller global footprint than mega-vendors",
        desc: "As a regional specialist, LinkShadow has a smaller global install base than Vectra or Darktrace. Its strengths are regional fit, sovereignty and support; organisations that weight global brand scale above local alignment may also shortlist a global NDR.",
      },
    ],
    bestFitProfile: [
      "UAE government and regulated entities prioritising NESA / CBUAE / ADHICS alignment",
      "Organisations with data-sovereignty and residency requirements",
      "Estates needing agentless east-west visibility across IT, OT and IoT",
      "Buyers who value Arabic-capable delivery and local support",
      "Teams that prefer a regional vendor attuned to local threats and regulation",
    ],
    products: [
      { model: "LinkShadow NDR", segment: "Core", role: "AI-driven network detection and response with east-west visibility" },
      { model: "LinkShadow + UEBA", segment: "Analytics", role: "Network detection paired with user and entity behaviour analytics" },
      { model: "LinkShadow CDM", segment: "Cyber Mesh", role: "Cybersecurity Defense Mesh correlating NDR with the wider stack" },
    ],
    whyArtiflex:
      "Artiflex IT deploys LinkShadow for UAE organisations that want a regionally-aligned NDR. We design sensor placement for full east-west coverage, tune behavioural analytics to your environment, map detections and reporting to NESA, CBUAE and ADHICS, and provide local delivery and escalation alongside the vendor.",
    faqs: [
      {
        question: "Why choose a UAE-founded NDR like LinkShadow?",
        answer:
          "For organisations where data sovereignty, regulatory alignment (NESA, CBUAE, ADHICS) and local support matter, a regional vendor is a strong fit. LinkShadow is built around UAE compliance expectations and offers Arabic-capable delivery and local escalation, advantages global products often retrofit.",
      },
      {
        question: "Does LinkShadow require agents?",
        answer:
          "No. LinkShadow is agentless, sensing east-west network traffic to provide visibility across IT, OT and IoT without deploying software on every host, which closes the internal-traffic blind spot that endpoint and perimeter tools leave open.",
      },
      {
        question: "How does LinkShadow detect threats?",
        answer:
          "It uses AI-driven behavioural analytics to baseline normal network and user activity, then flags anomalies such as lateral movement, command-and-control beaconing and data exfiltration, catching threats that signature-based tools do not.",
      },
    ],
    whatIs: {
      eyebrow: "What is LinkShadow",
      titlePrefix: "Regional NDR with ",
      titleHighlight: "native compliance",
      bodyParagraphs: [
        "LinkShadow is a UAE-founded network detection and response platform that combines AI-driven behavioural analytics with agentless east-west visibility across IT, OT and IoT. It baselines normal activity and flags anomalies that signature tools miss.",
        "Because it is a regional vendor, regulatory alignment to NESA, CBUAE and ADHICS, data sovereignty and Arabic-capable local support are first-class capabilities, making it a natural NDR starting point for UAE government and regulated organisations.",
      ],
      feature: {
        titleLine1: "Regional by",
        titleLine2: "Design",
        body: "LinkShadow's differentiator is that it was built in and for the region: compliance, sovereignty and local support are native, not bolted on, which matters most to UAE public-sector and regulated buyers.",
      },
      capabilities: [
        "AI-driven behavioural network detection",
        "Agentless east-west visibility across IT, OT and IoT",
        "Native NESA, CBUAE and ADHICS alignment",
        "Arabic-capable delivery and local support",
      ],
    },
    deploymentOptions: {
      eyebrow: "How it is delivered",
      title: "Sensor-based, sovereign-ready.",
      intro: "Artiflex designs sensor placement and maps detections to UAE frameworks.",
      options: [
        { icon: "hardware", title: "Network sensors", body: "Agentless sensors on taps or SPAN ports capture east-west traffic across the estate." },
        { icon: "virtual", title: "Analytics engine", body: "AI behavioural analytics and UEBA correlate network activity to surface anomalies." },
        { icon: "cloud", title: "Sovereign options", body: "On-prem or sovereign deployment to meet data-residency requirements." },
      ],
    },
  },

  "sophos-ndr": {
    slug: "sophos-ndr",
    name: "Sophos NDR",
    logo: "/logos/sophos.svg",
    tagline: "Network detection that feeds the Sophos MDR and XDR ecosystem",
    bestFor: "Best for Sophos-Standardised Estates",
    description:
      "Sophos NDR adds east-west and outbound network visibility to the Sophos ecosystem, detecting threats that endpoint and firewall controls cannot see, such as rogue devices, lateral movement and slow-burn exfiltration. Its real power is integration: detections flow into Sophos XDR and the Sophos MDR SOC, where they are correlated with endpoint, firewall, email and identity signal and acted on through Synchronized Security. For organisations already on Sophos, it is the most operationally seamless way to add NDR.",
    keyStats: [],
    whyWinsIntro: {
      label: "Sophos NDR Highlights",
      title: "Network visibility that plugs straight into your SOC",
      description:
        "Standalone NDR creates another alert console. Sophos NDR sends its detections into Sophos XDR and MDR, so network threats are correlated and acted on in the same place as everything else.",
      stats: [
        { value: "East-west", label: "Visibility into internal lateral movement and exfiltration", tone: "emerald" },
        { value: "Sophos XDR", label: "Detections correlated with endpoint, firewall and identity", tone: "violet" },
        { value: "MDR-ready", label: "Feeds the Sophos managed SOC for response", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "East-west visibility",
        icon: "eye",
        tone: "emerald",
        title: "See the traffic perimeter tools miss",
        desc: "Sophos NDR monitors internal and outbound traffic for lateral movement, command-and-control beaconing and data exfiltration, the activity that firewalls and endpoint agents do not observe.",
      },
      {
        tag: "Synchronized Security",
        icon: "heartbeat",
        tone: "violet",
        title: "Detections that trigger response",
        desc: "When NDR signal is correlated in Sophos XDR, Synchronized Security can isolate a compromised host automatically through Security Heartbeat, closing the gap between detection and containment.",
      },
      {
        tag: "Unified console",
        icon: "monitor",
        tone: "sky",
        title: "One place for the whole stack",
        desc: "Network detections appear in Sophos Central alongside endpoint, firewall, email and identity, so analysts investigate in a single console rather than juggling another tool.",
      },
      {
        tag: "MDR integration",
        icon: "users",
        tone: "amber",
        title: "Hands the signal to the SOC",
        desc: "For Sophos MDR customers, NDR telemetry enriches the managed SOC's investigations, adding network context to endpoint-led detection and response.",
      },
    ],
    watchOuts: [
      {
        title: "Strongest inside the Sophos ecosystem",
        desc: "Sophos NDR delivers the most value when correlated with Sophos endpoint, firewall and MDR. Organisations wanting a best-of-breed standalone NDR for a multi-vendor SOC sometimes prefer Vectra, Darktrace or Corelight.",
      },
    ],
    bestFitProfile: [
      "Existing Sophos endpoint, firewall or MDR customers adding network visibility",
      "Teams that want NDR detections correlated in one XDR console",
      "Organisations relying on Synchronized Security for automated containment",
      "Lean SOCs that prefer one ecosystem over multiple point tools",
      "Sophos MDR customers enriching the managed SOC with network signal",
    ],
    products: [
      { model: "Sophos NDR", segment: "Add-on", role: "Network detection feeding Sophos XDR and Central" },
      { model: "Sophos XDR + NDR", segment: "Self-driven XDR", role: "Network signal correlated with endpoint, firewall and identity" },
      { model: "Sophos MDR + NDR", segment: "Managed", role: "Network telemetry enriching the Sophos managed SOC" },
    ],
    whyArtiflex:
      "Artiflex IT, a Sophos Platinum Partner, deploys Sophos NDR as part of a unified Sophos security operations stack. We place sensors for full east-west coverage, integrate detections into Sophos XDR and MDR, and ensure network threats trigger Synchronized Security response across your estate.",
    faqs: [
      {
        question: "What does Sophos NDR add over a firewall?",
        answer:
          "A firewall inspects north-south perimeter traffic. Sophos NDR adds east-west and outbound visibility, detecting lateral movement, command-and-control beaconing and slow data exfiltration happening inside the network, threats that never cross the firewall in an obvious way.",
      },
      {
        question: "Does Sophos NDR work standalone?",
        answer:
          "It can run as an add-on, but its value is highest inside the Sophos ecosystem, where detections are correlated in Sophos XDR, surfaced in Sophos Central and acted on by Sophos MDR with Synchronized Security automation.",
      },
      {
        question: "How does it help a Sophos MDR deployment?",
        answer:
          "Sophos NDR enriches the managed SOC's investigations with network context, so endpoint-led detection and response is complemented by visibility into lateral movement and exfiltration across the internal network.",
      },
    ],
    whatIs: {
      eyebrow: "What is Sophos NDR",
      titlePrefix: "Network detection inside the ",
      titleHighlight: "Sophos ecosystem",
      bodyParagraphs: [
        "Sophos NDR is a network detection and response capability that monitors east-west and outbound traffic for lateral movement, command-and-control activity and data exfiltration, the threats that endpoint and firewall controls do not see.",
        "Its differentiator is integration: detections flow into Sophos XDR and the Sophos MDR SOC, are correlated with endpoint, firewall, email and identity signal, and can trigger automated containment through Synchronized Security.",
      ],
      feature: {
        titleLine1: "Integrated,",
        titleLine2: "Not Standalone",
        body: "Sophos NDR is designed to feed the wider Sophos stack, so network detections become correlated, actioned incidents in one console rather than another isolated alert feed.",
      },
      capabilities: [
        "East-west and outbound network threat detection",
        "Correlation in Sophos XDR with endpoint and firewall",
        "Synchronized Security automated containment",
        "Enrichment of the Sophos MDR managed SOC",
      ],
    },
    deploymentOptions: {
      eyebrow: "How it is delivered",
      title: "Sensor plus Sophos Central.",
      intro: "Artiflex places sensors and integrates with your Sophos stack.",
      options: [
        { icon: "hardware", title: "Network sensor", body: "Sensor on a tap or SPAN port captures east-west and outbound traffic." },
        { icon: "cloud", title: "Sophos Central", body: "Detections surface in Sophos Central and Sophos XDR alongside the rest of the stack." },
        { icon: "virtual", title: "MDR enrichment", body: "Network signal feeds the Sophos MDR SOC for correlated, managed response." },
      ],
    },
  },

  vectra: {
    slug: "vectra",
    name: "Vectra AI",
    logo: "/logos/Vectra.png",
    tagline: "AI-driven Attack Signal Intelligence across network, identity and cloud",
    bestFor: "Best for AI-Led Attack Signal and Hybrid Cloud",
    description:
      "Vectra AI is a leading NDR platform whose Attack Signal Intelligence uses security-led AI to detect, triage and prioritise real attacker behaviours across network, identity, public cloud and SaaS. Rather than drowning analysts in anomalies, Vectra focuses on the methods attackers must use, reducing alert noise and surfacing the threats that matter. It is a strong choice for organisations defending hybrid and cloud estates that want high-fidelity, AI-prioritised detection beyond the on-prem network.",
    keyStats: [],
    whyWinsIntro: {
      label: "Vectra AI Highlights",
      title: "Signal, not noise: AI focused on attacker behaviour",
      description:
        "Anomaly detection floods analysts. Vectra's Attack Signal Intelligence models the techniques attackers must use, so it surfaces and prioritises genuine threats instead of every deviation.",
      stats: [
        { value: "Attack Signal", label: "Security-led AI prioritising real attacker behaviour", tone: "emerald" },
        { value: "Hybrid", label: "Coverage across network, identity, public cloud and SaaS", tone: "violet" },
        { value: "Triage", label: "Automated triage that cuts alert noise dramatically", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Attack Signal Intelligence",
        icon: "activity",
        tone: "emerald",
        title: "AI tuned to attacker methods",
        desc: "Vectra models the techniques adversaries must use to progress, then detects and prioritises them, so analysts focus on real attack progression rather than wading through generic anomalies.",
      },
      {
        tag: "Hybrid coverage",
        icon: "layers",
        tone: "violet",
        title: "Beyond the on-prem network",
        desc: "Detection spans network, Microsoft Entra and Microsoft 365 identity, AWS and other public cloud, and SaaS, matching the hybrid reality of modern attacks that pivot across domains.",
      },
      {
        tag: "Automated triage",
        icon: "list",
        tone: "sky",
        title: "Noise reduction by design",
        desc: "Vectra automatically triages and scores detections, collapsing thousands of events into a prioritised set of attack accounts and hosts, a major workload reduction for the SOC.",
      },
      {
        tag: "Identity-aware",
        icon: "users",
        tone: "amber",
        title: "Follows the account, not just the packet",
        desc: "By correlating identity with network and cloud activity, Vectra tracks account takeover and lateral movement across domains, catching attacks that pure packet inspection misses.",
      },
    ],
    watchOuts: [
      {
        title: "AI-led, complements raw evidence tools",
        desc: "Vectra excels at prioritised attacker-behaviour detection. Teams that also need exhaustive raw network evidence for forensics sometimes pair it with an evidence-rich platform like Corelight or ExtraHop.",
      },
    ],
    bestFitProfile: [
      "Organisations defending hybrid estates spanning network, identity and cloud",
      "SOCs overwhelmed by alert volume that need AI-prioritised signal",
      "Microsoft 365 and Entra-heavy estates needing identity-aware detection",
      "Teams pursuing fast, high-fidelity detection of attack progression",
      "Programmes that value automated triage to reduce analyst workload",
    ],
    products: [
      { model: "Vectra AI Platform", segment: "Core", role: "Attack Signal Intelligence across network, identity and cloud" },
      { model: "Vectra CDR for Microsoft", segment: "Cloud", role: "Detection for Microsoft 365, Entra ID and Azure" },
      { model: "Vectra MXDR", segment: "Managed", role: "Vectra-led managed detection and response overlay" },
    ],
    whyArtiflex:
      "Artiflex IT deploys Vectra AI for UAE organisations defending hybrid and cloud estates. We design sensor and cloud coverage, integrate identity detection for Microsoft 365 and Entra, tune Attack Signal Intelligence to your environment, and feed prioritised detections into your SOC or MDR workflow.",
    faqs: [
      {
        question: "How is Vectra different from anomaly-based NDR?",
        answer:
          "Anomaly detection flags every deviation, which floods analysts. Vectra's Attack Signal Intelligence models the techniques attackers must use and prioritises genuine attack progression, dramatically cutting noise and focusing the SOC on real threats.",
      },
      {
        question: "Does Vectra cover cloud and identity, not just network?",
        answer:
          "Yes. Vectra spans network, identity (Microsoft Entra and 365), public cloud (AWS and others) and SaaS, correlating across domains so it can track account takeover and lateral movement that pure network tools miss.",
      },
      {
        question: "Can Vectra be consumed as a managed service?",
        answer:
          "Yes. Vectra offers an MXDR managed overlay, and Artiflex can integrate Vectra detections into your existing SOC or MDR workflow if you prefer to keep operations in-house or with another provider.",
      },
    ],
    whatIs: {
      eyebrow: "What is Vectra AI",
      titlePrefix: "AI-led detection with ",
      titleHighlight: "Attack Signal Intelligence",
      bodyParagraphs: [
        "Vectra AI is a network detection and response platform whose Attack Signal Intelligence applies security-led AI to detect, triage and prioritise real attacker behaviours across network, identity, public cloud and SaaS.",
        "Instead of alerting on every anomaly, Vectra models the techniques attackers must use and surfaces prioritised attack accounts and hosts, reducing alert noise and helping SOCs focus on genuine attack progression across hybrid estates.",
      ],
      feature: {
        titleLine1: "Attacker",
        titleLine2: "Behaviour Focus",
        body: "Vectra's edge is that its AI is tuned to how attacks actually progress, not to statistical novelty, so the signal that reaches analysts is high-fidelity and prioritised.",
      },
      capabilities: [
        "Security-led AI Attack Signal Intelligence",
        "Coverage across network, identity, cloud and SaaS",
        "Automated triage that collapses alert volume",
        "Identity-aware tracking of account takeover and lateral movement",
      ],
    },
    deploymentOptions: {
      eyebrow: "How it is delivered",
      title: "Sensors plus cloud connectors.",
      intro: "Artiflex designs hybrid coverage across network, identity and cloud.",
      options: [
        { icon: "hardware", title: "Network sensors", body: "Sensors on taps or SPAN ports provide east-west network detection." },
        { icon: "cloud", title: "Cloud and identity", body: "API connectors extend detection to Microsoft 365, Entra and public cloud." },
        { icon: "virtual", title: "Managed overlay", body: "Optional Vectra MXDR or integration into your existing SOC workflow." },
      ],
    },
  },

  darktrace: {
    slug: "darktrace",
    name: "Darktrace / NETWORK",
    logo: "/logos/Darktrace.png",
    tagline: "Self-Learning AI with autonomous response to novel threats",
    bestFor: "Best for Autonomous Response and Novel-Threat Defence",
    description:
      "Darktrace / NETWORK uses Self-Learning AI to build an evolving model of normal for every device and user, then detects subtle deviations that indicate a threat, including never-before-seen attacks. Its Autonomous Response capability can take precise, proportionate action to neutralise an in-progress threat in real time, even out of hours, while Cyber AI Analyst automates investigation. It is the standout choice for organisations that want machine-speed containment of novel and fast-moving threats without waiting on signatures.",
    keyStats: [],
    whyWinsIntro: {
      label: "Darktrace Highlights",
      title: "Learns your normal, acts on the abnormal",
      description:
        "Darktrace does not rely on knowing the threat in advance. It learns what normal looks like for your environment and responds autonomously when something deviates, even a novel attack.",
      stats: [
        { value: "Self-Learning AI", label: "Per-device, per-user model of normal behaviour", tone: "emerald" },
        { value: "Autonomous", label: "Real-time, proportionate response to active threats", tone: "violet" },
        { value: "AI Analyst", label: "Automated investigation and incident narration", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Self-Learning AI",
        icon: "activity",
        tone: "emerald",
        title: "Detects what it has never seen",
        desc: "By modelling normal for every entity, Darktrace flags subtle deviations that indicate compromise, catching novel and insider threats that signature and rule-based tools cannot anticipate.",
      },
      {
        tag: "Autonomous Response",
        icon: "shield",
        tone: "violet",
        title: "Neutralise threats at machine speed",
        desc: "Autonomous Response takes precise, proportionate action, slowing or stopping malicious activity in real time, including overnight, buying responders time without disrupting normal business.",
      },
      {
        tag: "Cyber AI Analyst",
        icon: "message",
        tone: "sky",
        title: "Investigations automated and narrated",
        desc: "Cyber AI Analyst automatically investigates detections and produces a written incident narrative, automating Tier-2 triage and accelerating human decision-making.",
      },
      {
        tag: "Platform reach",
        icon: "layers",
        tone: "amber",
        title: "Beyond the network",
        desc: "Darktrace extends Self-Learning AI across email, cloud, identity and OT, correlating signals so a network detection is enriched by what is happening elsewhere in the estate.",
      },
    ],
    watchOuts: [
      {
        title: "Tune Autonomous Response with care",
        desc: "Autonomous Response is powerful and should be rolled out with the right confidence thresholds so it acts decisively without over-reacting. Artiflex phases enforcement, monitor-first then active, so automation earns trust before it intervenes.",
      },
    ],
    bestFitProfile: [
      "Organisations wanting machine-speed containment of novel, fast-moving threats",
      "Teams without 24/7 staffing that need autonomous out-of-hours response",
      "Estates exposed to insider threats and never-before-seen attacks",
      "Buyers who value automated investigation to reduce Tier-2 workload",
      "Programmes extending one AI across network, email, cloud and OT",
    ],
    products: [
      { model: "Darktrace / NETWORK", segment: "NDR", role: "Self-Learning AI network detection and autonomous response" },
      { model: "Darktrace / EMAIL", segment: "Email", role: "Behavioural email security on the same Self-Learning AI" },
      { model: "Darktrace ActiveAI Platform", segment: "Platform", role: "Network, email, cloud, identity and OT under one AI" },
    ],
    whyArtiflex:
      "Artiflex IT deploys Darktrace for UAE organisations that want autonomous, AI-led defence. We place sensors for full visibility, phase Autonomous Response from monitor-first to active enforcement with appropriate thresholds, and integrate Cyber AI Analyst output into your SOC so automation augments your team safely.",
    faqs: [
      {
        question: "How does Darktrace detect threats it has never seen?",
        answer:
          "Rather than matching known signatures, Darktrace's Self-Learning AI builds an evolving model of normal behaviour for every device and user, then flags subtle deviations from that baseline. This lets it detect novel, insider and fast-moving threats that signature-based tools cannot anticipate.",
      },
      {
        question: "What is Autonomous Response?",
        answer:
          "Autonomous Response is Darktrace's ability to take precise, proportionate action against an active threat in real time, slowing or stopping malicious activity without halting normal business, including out of hours. It is typically rolled out monitor-first, then enabled for active enforcement once tuned.",
      },
      {
        question: "Is Darktrace only for the network?",
        answer:
          "No. Darktrace applies the same Self-Learning AI across network, email, cloud, identity and OT under its ActiveAI platform, correlating signals so a network detection is enriched by activity elsewhere in the estate.",
      },
    ],
    whatIs: {
      eyebrow: "What is Darktrace / NETWORK",
      titlePrefix: "Self-Learning AI with ",
      titleHighlight: "autonomous response",
      bodyParagraphs: [
        "Darktrace / NETWORK is a network detection and response platform built on Self-Learning AI. It constructs an evolving model of normal behaviour for every device and user, then detects subtle deviations that indicate a threat, including never-before-seen attacks.",
        "Its Autonomous Response can neutralise an active threat in real time with proportionate action, while Cyber AI Analyst automates investigation, and the same AI extends across email, cloud, identity and OT for correlated defence.",
      ],
      feature: {
        titleLine1: "Learns and",
        titleLine2: "Acts Autonomously",
        body: "Darktrace's distinction is acting on the unknown: it does not need prior knowledge of a threat, it learns your normal and responds the moment something deviates, even overnight.",
      },
      capabilities: [
        "Self-Learning AI model of normal per device and user",
        "Real-time Autonomous Response to active threats",
        "Cyber AI Analyst automated investigation",
        "One AI across network, email, cloud, identity and OT",
      ],
    },
    deploymentOptions: {
      eyebrow: "How it is delivered",
      title: "Sensors plus Self-Learning AI.",
      intro: "Artiflex phases Autonomous Response so automation earns trust.",
      options: [
        { icon: "hardware", title: "Network sensors", body: "Sensors observe traffic to build the per-entity model of normal behaviour." },
        { icon: "virtual", title: "Autonomous Response", body: "Phased from monitor-first to active enforcement with tuned confidence thresholds." },
        { icon: "cloud", title: "Platform extension", body: "Extend the same AI across email, cloud, identity and OT for correlated defence." },
      ],
    },
  },

  extrahop: {
    slug: "extrahop",
    name: "ExtraHop RevealX",
    logo: "/logos/ExtraHop.png",
    tagline: "Wire-data NDR with decryption and forensic-grade fidelity",
    bestFor: "Best for High-Fidelity Packet and Decryption Visibility",
    description:
      "ExtraHop RevealX is a network detection and response platform built on real-time wire-data analysis. It reconstructs and inspects network transactions at scale, including decrypting traffic line-rate where authorised, to deliver forensic-grade visibility and high-fidelity detection of lateral movement, exfiltration and advanced threats. With deep packet-level evidence and fast investigation workflows, RevealX is the choice for organisations that demand the richest network truth and the ability to inspect inside encrypted east-west traffic.",
    keyStats: [],
    whyWinsIntro: {
      label: "ExtraHop RevealX Highlights",
      title: "The network never lies: detection from the wire itself",
      description:
        "Attackers can tamper with logs and evade agents, but they cannot avoid the network. RevealX analyses wire data directly, with decryption, for ground-truth detection and forensic evidence.",
      stats: [
        { value: "Wire data", label: "Real-time transaction analysis from raw network traffic", tone: "emerald" },
        { value: "Decryption", label: "Line-rate decryption to inspect encrypted east-west traffic", tone: "violet" },
        { value: "Forensics", label: "Packet-level evidence for fast, defensible investigation", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Wire data",
        icon: "activity",
        tone: "emerald",
        title: "Ground-truth from the network",
        desc: "RevealX reconstructs network transactions in real time, deriving high-fidelity detection from traffic itself, which attackers cannot tamper with the way they can with logs or endpoint agents.",
      },
      {
        tag: "Decryption",
        icon: "lock",
        tone: "violet",
        title: "See inside encrypted east-west traffic",
        desc: "Where authorised, RevealX decrypts traffic at line rate, illuminating the encrypted internal traffic where modern threats hide and which many NDR tools treat as a blind spot.",
      },
      {
        tag: "Forensic fidelity",
        icon: "file",
        tone: "sky",
        title: "Packet-level evidence on demand",
        desc: "Rich transaction records and packet-level detail give analysts defensible, forensic-grade evidence, accelerating investigation and satisfying audit and incident-response needs.",
      },
      {
        tag: "Scale and speed",
        icon: "barChart",
        tone: "amber",
        title: "High throughput, fast investigation",
        desc: "RevealX analyses traffic at enterprise scale and surfaces guided investigation workflows, so high fidelity does not come at the cost of analyst speed.",
      },
    ],
    watchOuts: [
      {
        title: "Plan decryption and sensor placement",
        desc: "Getting the most from RevealX means thoughtful sensor placement and a decryption strategy that respects privacy and compliance. Artiflex designs both so you gain visibility without operational or regulatory friction.",
      },
    ],
    bestFitProfile: [
      "Organisations that demand forensic-grade, packet-level network evidence",
      "Estates needing visibility inside encrypted east-west traffic",
      "Incident-response and threat-hunting teams that work from network truth",
      "High-throughput enterprises and data centres requiring scale",
      "Buyers who weight detection fidelity and evidence above all else",
    ],
    products: [
      { model: "RevealX", segment: "NDR", role: "Wire-data network detection with guided investigation" },
      { model: "RevealX with decryption", segment: "Deep inspection", role: "Line-rate decryption for encrypted east-west visibility" },
      { model: "RevealX 360", segment: "SaaS", role: "Cloud-delivered NDR for hybrid and multi-cloud estates" },
    ],
    whyArtiflex:
      "Artiflex IT deploys ExtraHop RevealX for UAE enterprises that need the richest network visibility. We design sensor placement and a compliant decryption strategy, tune detections, and integrate RevealX evidence into SOC and incident-response workflows so investigations start from ground truth.",
    faqs: [
      {
        question: "What makes ExtraHop's wire-data approach different?",
        answer:
          "RevealX derives detection directly from real-time analysis of network transactions, the wire data, rather than from logs or endpoint agents. Because attackers cannot tamper with the network the way they can with logs, this yields ground-truth, forensic-grade detection and evidence.",
      },
      {
        question: "Can ExtraHop see inside encrypted traffic?",
        answer:
          "Yes, where authorised. RevealX can decrypt traffic at line rate, giving visibility into encrypted east-west traffic where modern threats hide, a blind spot for many NDR tools. Artiflex designs a decryption strategy that respects privacy and compliance.",
      },
      {
        question: "Is ExtraHop available as a cloud service?",
        answer:
          "Yes. RevealX 360 delivers NDR as a SaaS offering for hybrid and multi-cloud estates, while sensors capture on-premises and cloud traffic, so you get consistent visibility across environments.",
      },
    ],
    whatIs: {
      eyebrow: "What is ExtraHop RevealX",
      titlePrefix: "Forensic-grade NDR from ",
      titleHighlight: "wire data",
      bodyParagraphs: [
        "ExtraHop RevealX is a network detection and response platform built on real-time wire-data analysis. It reconstructs and inspects network transactions at scale, including line-rate decryption where authorised, to deliver high-fidelity detection and forensic-grade evidence.",
        "Because detection comes from the network itself, which attackers cannot tamper with like logs, RevealX excels at exposing lateral movement, exfiltration and advanced threats hiding in encrypted east-west traffic, with packet-level evidence for fast investigation.",
      ],
      feature: {
        titleLine1: "Truth from",
        titleLine2: "the Wire",
        body: "RevealX's strength is fidelity: detection and evidence derived directly from network transactions, with decryption, so analysts investigate from ground truth rather than tamperable logs.",
      },
      capabilities: [
        "Real-time wire-data transaction analysis",
        "Line-rate decryption of encrypted east-west traffic",
        "Forensic-grade, packet-level evidence",
        "Enterprise-scale throughput with guided investigation",
      ],
    },
    deploymentOptions: {
      eyebrow: "How it is delivered",
      title: "Sensors, on-prem or SaaS.",
      intro: "Artiflex designs placement and a compliant decryption strategy.",
      options: [
        { icon: "hardware", title: "Network sensors", body: "Sensors on taps or SPAN ports reconstruct transactions from raw traffic." },
        { icon: "virtual", title: "Decryption", body: "Line-rate decryption, where authorised, to inspect encrypted east-west traffic." },
        { icon: "cloud", title: "RevealX 360", body: "Cloud-delivered NDR for consistent hybrid and multi-cloud visibility." },
      ],
    },
  },

  arista: {
    slug: "arista",
    name: "Arista NDR",
    logo: "/logos/Arista.png",
    tagline: "Network-derived threat detection with an autonomous AI analyst",
    bestFor: "Best for Network-Native, Data-Center-Scale NDR",
    description:
      "Arista NDR (built on the Awake Security platform) delivers threat detection derived directly from network traffic, with an Autonomous Virtual Assist (AVA) AI that triages and investigates like a tier-1 analyst. Tightly aligned with Arista's networking heritage, it provides device discovery, entity tracking and behaviour-based detection at data-center scale, catching threats across managed and unmanaged devices, IoT and OT. It is a strong fit for organisations that want NDR engineered by a networking company, for the network.",
    keyStats: [],
    whyWinsIntro: {
      label: "Arista NDR Highlights",
      title: "NDR from a company that lives in the network",
      description:
        "Arista's heritage is high-performance networking. Arista NDR brings that network-native pedigree to threat detection, with an AI analyst (AVA) that automates triage and investigation.",
      stats: [
        { value: "AVA", label: "Autonomous Virtual Assist AI triages like a tier-1 analyst", tone: "emerald" },
        { value: "Entity tracking", label: "Discovery and profiling of every device, including IoT and OT", tone: "violet" },
        { value: "Data-center", label: "Detection engineered for high-throughput environments", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "AVA AI analyst",
        icon: "message",
        tone: "emerald",
        title: "Triage and investigation, automated",
        desc: "Autonomous Virtual Assist reasons over detections like a tier-1 analyst, correlating activity and surfacing investigated incidents, sharply reducing the manual triage load on the SOC.",
      },
      {
        tag: "Entity tracking",
        icon: "eye",
        tone: "violet",
        title: "Discover and profile every device",
        desc: "Arista NDR builds a profile of every entity on the network, including unmanaged, IoT and OT devices, so detection covers the assets endpoint agents never reach.",
      },
      {
        tag: "Network-native",
        icon: "server",
        tone: "sky",
        title: "Engineered by a networking company",
        desc: "Built on Arista's networking heritage, the platform is designed for high-throughput, data-center-scale environments where traffic volume defeats less performant tools.",
      },
      {
        tag: "Behaviour detection",
        icon: "activity",
        tone: "amber",
        title: "Catch threats by how they behave",
        desc: "Behaviour-based analytics detect lateral movement, C2 and exfiltration across the network, independent of signatures, so novel and evasive threats are surfaced.",
      },
    ],
    watchOuts: [
      {
        title: "Strongest where the network is the focus",
        desc: "Arista NDR shines in network-centric, data-center-scale environments. Organisations seeking a single AI spanning email, cloud and identity as well sometimes prefer Darktrace or Vectra; pure forensic-evidence buyers lean to ExtraHop or Corelight.",
      },
    ],
    bestFitProfile: [
      "Data centres and high-throughput environments needing network-native NDR",
      "Estates with significant unmanaged, IoT and OT devices to profile",
      "Teams that want an AI analyst (AVA) to automate triage and investigation",
      "Organisations already aligned with Arista networking infrastructure",
      "Buyers prioritising behaviour-based, signature-independent detection",
    ],
    products: [
      { model: "Arista NDR", segment: "Core", role: "Network-derived detection with AVA autonomous triage" },
      { model: "Arista NDR + EDR integration", segment: "Correlated", role: "Network detection correlated with endpoint telemetry" },
      { model: "CloudVision integration", segment: "Network-aware", role: "NDR tied into Arista network operations visibility" },
    ],
    whyArtiflex:
      "Artiflex IT deploys Arista NDR for UAE data centres and high-throughput estates. We design sensor and tap placement for full coverage, enable entity discovery across IoT and OT, tune behaviour-based detection, and integrate AVA's investigated incidents into your SOC workflow.",
    faqs: [
      {
        question: "What is AVA in Arista NDR?",
        answer:
          "AVA (Autonomous Virtual Assist) is Arista NDR's AI that triages and investigates detections like a tier-1 analyst, correlating activity and surfacing investigated incidents. It automates much of the manual triage workload that otherwise consumes SOC analyst time.",
      },
      {
        question: "Does Arista NDR cover IoT and OT devices?",
        answer:
          "Yes. Arista NDR discovers and profiles every entity on the network, including unmanaged, IoT and OT devices, so it provides detection coverage for the assets that endpoint agents cannot be installed on.",
      },
      {
        question: "Is Arista NDR only for Arista network customers?",
        answer:
          "No. While it is engineered with Arista's networking heritage and integrates with Arista infrastructure, Arista NDR works as a vendor-neutral NDR platform across heterogeneous networks, particularly at data-center scale.",
      },
    ],
    whatIs: {
      eyebrow: "What is Arista NDR",
      titlePrefix: "Network-native detection with ",
      titleHighlight: "an AI analyst",
      bodyParagraphs: [
        "Arista NDR, built on the Awake Security platform, delivers threat detection derived directly from network traffic, with an Autonomous Virtual Assist (AVA) AI that triages and investigates detections like a tier-1 analyst.",
        "Engineered with Arista's networking heritage, it discovers and profiles every device, including unmanaged, IoT and OT, and applies behaviour-based detection at data-center scale, catching threats that signature tools and endpoint agents miss.",
      ],
      feature: {
        titleLine1: "Built for",
        titleLine2: "the Network",
        body: "Arista NDR's edge is network-native engineering plus AVA: detection designed for high-throughput environments, with an AI analyst that automates the triage and investigation work.",
      },
      capabilities: [
        "AVA autonomous AI triage and investigation",
        "Discovery and profiling of every device, including IoT and OT",
        "Behaviour-based, signature-independent detection",
        "Data-center-scale, network-native performance",
      ],
    },
    deploymentOptions: {
      eyebrow: "How it is delivered",
      title: "Sensors at network scale.",
      intro: "Artiflex designs placement for full data-center coverage.",
      options: [
        { icon: "hardware", title: "Network sensors", body: "Sensors on taps or SPAN ports capture traffic at data-center throughput." },
        { icon: "virtual", title: "AVA analytics", body: "Autonomous Virtual Assist triages and investigates detections automatically." },
        { icon: "cloud", title: "SOC integration", body: "Investigated incidents and entity context feed your SOC and response workflow." },
      ],
    },
  },

  trellix: {
    slug: "trellix",
    name: "Trellix NDR",
    logo: "/logos/Trellix.png",
    tagline: "Signature plus behaviour detection with FireEye threat heritage",
    bestFor: "Best for Threat-Intelligence-Rich, Broad-Platform Estates",
    description:
      "Trellix NDR (carrying the FireEye and McAfee Enterprise heritage) combines signature-based detection, behavioural analytics and rich threat intelligence to find advanced and evasive threats in network traffic. As part of the broad Trellix XDR ecosystem, its network detections correlate with endpoint, email and data-protection signal, giving organisations a single security operations fabric. It suits estates that value FireEye-pedigree threat intelligence and want NDR that plugs into a wide, integrated platform rather than standing alone.",
    keyStats: [],
    whyWinsIntro: {
      label: "Trellix NDR Highlights",
      title: "FireEye threat heritage in a broad XDR fabric",
      description:
        "Trellix pairs the advanced-threat detection pedigree of FireEye with a wide platform, so network detections are intelligence-rich and correlated across endpoint, email and data protection.",
      stats: [
        { value: "Threat intel", label: "FireEye-pedigree intelligence on advanced adversaries", tone: "emerald" },
        { value: "Hybrid detection", label: "Signature plus behavioural analytics in one engine", tone: "violet" },
        { value: "Trellix XDR", label: "Correlated with endpoint, email and data protection", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Threat intelligence",
        icon: "globe",
        tone: "emerald",
        title: "FireEye-pedigree advanced-threat detection",
        desc: "Trellix NDR draws on threat intelligence honed by years of frontline incident response, strengthening detection of advanced, targeted and nation-state-grade adversaries.",
      },
      {
        tag: "Hybrid engine",
        icon: "shield",
        tone: "violet",
        title: "Signatures and behaviour together",
        desc: "Combining signature-based and behavioural detection catches both known threats and novel, evasive activity, balancing precision with the ability to find the unknown.",
      },
      {
        tag: "Trellix XDR",
        icon: "layers",
        tone: "sky",
        title: "Part of a broad platform",
        desc: "Network detections correlate with Trellix endpoint, email and data-protection telemetry in one XDR fabric, so analysts investigate across domains instead of in a siloed NDR console.",
      },
      {
        tag: "Sandboxing",
        icon: "file",
        tone: "amber",
        title: "Detonate suspicious files and traffic",
        desc: "Integrated sandboxing analyses suspicious payloads observed on the network, adding a detonation layer to behavioural and signature detection for evasive malware.",
      },
    ],
    watchOuts: [
      {
        title: "Best value inside the Trellix ecosystem",
        desc: "Trellix NDR delivers most when correlated with the wider Trellix XDR platform. Organisations seeking a best-of-breed standalone NDR with the deepest AI or forensic evidence sometimes prefer Darktrace, Vectra, ExtraHop or Corelight.",
      },
    ],
    bestFitProfile: [
      "Organisations that value FireEye-pedigree advanced-threat intelligence",
      "Estates already invested in, or adopting, the Trellix XDR platform",
      "Teams wanting signature plus behavioural detection in one engine",
      "Buyers needing integrated sandboxing for evasive payloads",
      "Programmes that prefer NDR correlated across endpoint, email and data",
    ],
    products: [
      { model: "Trellix NDR", segment: "NDR", role: "Signature and behavioural network detection with sandboxing" },
      { model: "Trellix XDR", segment: "Platform", role: "NDR correlated with endpoint, email and data protection" },
      { model: "Trellix Intelligence", segment: "Threat intel", role: "FireEye-pedigree intelligence enriching detections" },
    ],
    whyArtiflex:
      "Artiflex IT deploys Trellix NDR for UAE organisations that want intelligence-rich detection inside a broad platform. We place sensors, integrate NDR into the Trellix XDR fabric alongside endpoint and email, tune signature and behavioural detection, and operationalise sandboxing for evasive threats.",
    faqs: [
      {
        question: "What heritage does Trellix NDR carry?",
        answer:
          "Trellix was formed from McAfee Enterprise and FireEye. Trellix NDR carries FireEye's advanced-threat detection and threat-intelligence pedigree, honed through years of frontline incident response against targeted and nation-state adversaries.",
      },
      {
        question: "Does Trellix NDR use signatures or behaviour?",
        answer:
          "Both. It combines signature-based detection for known threats with behavioural analytics for novel and evasive activity, and adds integrated sandboxing to detonate suspicious payloads, balancing precision with the ability to find the unknown.",
      },
      {
        question: "How does Trellix NDR fit a wider security stack?",
        answer:
          "It is part of the Trellix XDR platform, so network detections correlate with Trellix endpoint, email and data-protection telemetry in one fabric, letting analysts investigate across domains rather than in an isolated NDR console.",
      },
    ],
    whatIs: {
      eyebrow: "What is Trellix NDR",
      titlePrefix: "Intelligence-rich NDR in a ",
      titleHighlight: "broad XDR platform",
      bodyParagraphs: [
        "Trellix NDR, carrying the FireEye and McAfee Enterprise heritage, combines signature-based detection, behavioural analytics and rich threat intelligence to find advanced and evasive threats in network traffic, with integrated sandboxing for suspicious payloads.",
        "As part of the Trellix XDR ecosystem, its network detections correlate with endpoint, email and data-protection signal, giving organisations one security operations fabric rather than a standalone NDR console.",
      ],
      feature: {
        titleLine1: "Threat Intel",
        titleLine2: "meets Platform",
        body: "Trellix NDR's edge is combining FireEye-pedigree advanced-threat intelligence with a broad XDR fabric, so network detection is both intelligence-rich and correlated across domains.",
      },
      capabilities: [
        "FireEye-pedigree advanced-threat intelligence",
        "Combined signature and behavioural detection",
        "Integrated sandboxing for evasive payloads",
        "Correlation across the Trellix XDR platform",
      ],
    },
    deploymentOptions: {
      eyebrow: "How it is delivered",
      title: "Sensors plus XDR fabric.",
      intro: "Artiflex integrates NDR into the wider Trellix platform.",
      options: [
        { icon: "hardware", title: "Network sensors", body: "Sensors capture traffic for signature and behavioural detection." },
        { icon: "virtual", title: "Sandboxing", body: "Suspicious payloads detonated to expose evasive malware behaviour." },
        { icon: "cloud", title: "Trellix XDR", body: "Correlate NDR with endpoint, email and data protection in one fabric." },
      ],
    },
  },

  corelight: {
    slug: "corelight",
    name: "Corelight Open NDR",
    logo: "/logos/Corelight.png",
    tagline: "Open NDR built on Zeek and Suricata, evidence for the hunt",
    bestFor: "Best for Threat Hunting and Open, Evidence-Rich NDR",
    description:
      "Corelight delivers Open NDR built on the open-source standards Zeek and Suricata, transforming network traffic into rich, structured evidence that powers threat hunting, detection and incident response. Rather than a black box, Corelight gives analysts comprehensive, transparent network data they can search, pivot on and integrate into any SIEM or XDR. It is the choice for mature SOCs, threat hunters and incident responders who want the deepest, most open network evidence rather than just prioritised alerts.",
    keyStats: [],
    whyWinsIntro: {
      label: "Corelight Highlights",
      title: "Open evidence that powers the hunt",
      description:
        "Corelight turns raw traffic into rich, structured Zeek and Suricata evidence, the data threat hunters and responders actually want, open and integrable rather than a closed scoring box.",
      stats: [
        { value: "Zeek + Suricata", label: "Open-source standards producing structured network evidence", tone: "emerald" },
        { value: "Evidence", label: "Comprehensive data for hunting, detection and IR", tone: "violet" },
        { value: "Open", label: "Integrates into any SIEM or XDR, no lock-in", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Zeek + Suricata",
        icon: "file",
        tone: "emerald",
        title: "Open standards, structured evidence",
        desc: "Built on the open-source Zeek and Suricata projects, Corelight transforms traffic into rich, structured logs and alerts, the de facto evidence format trusted by threat hunters worldwide.",
      },
      {
        tag: "Hunt-ready data",
        icon: "eye",
        tone: "violet",
        title: "Data analysts can pivot on",
        desc: "Comprehensive network evidence lets hunters and responders search, correlate and pivot across connections, files and protocols, rather than being limited to a vendor's prioritised alerts.",
      },
      {
        tag: "Open integration",
        icon: "layers",
        tone: "sky",
        title: "Feeds any SIEM or XDR",
        desc: "Corelight evidence integrates cleanly into Splunk, Microsoft Sentinel, Elastic and any XDR, enriching your existing analytics platform instead of forcing yet another console.",
      },
      {
        tag: "Detection content",
        icon: "shield",
        tone: "amber",
        title: "Curated detections on open data",
        desc: "Corelight layers curated detections, threat intelligence and ML on top of the open evidence, so you get actionable detection without losing the underlying transparency.",
      },
    ],
    watchOuts: [
      {
        title: "Best with a SIEM or analytics platform",
        desc: "Corelight's strength is producing exceptional evidence; it is most powerful feeding a SIEM or XDR for analytics, hunting and response. Teams wanting a turnkey, fully self-contained alert-and-respond NDR sometimes prefer Darktrace or Vectra.",
      },
    ],
    bestFitProfile: [
      "Mature SOCs and threat-hunting teams that want open, rich network evidence",
      "Incident responders who need defensible, structured forensic data",
      "Estates standardised on a SIEM or XDR that Corelight can enrich",
      "Organisations that value open standards (Zeek, Suricata) and no lock-in",
      "Programmes correlating network evidence with their broader analytics",
    ],
    products: [
      { model: "Corelight Open NDR", segment: "Core", role: "Zeek and Suricata evidence with curated detections" },
      { model: "Corelight Sensors", segment: "Capture", role: "Physical, virtual and cloud sensors generating evidence" },
      { model: "Corelight Investigator", segment: "Analytics", role: "Cloud analytics and hunting on Corelight evidence" },
    ],
    whyArtiflex:
      "Artiflex IT deploys Corelight Open NDR for mature UAE SOCs and threat-hunting teams. We place sensors for full evidence capture, integrate Corelight data into your SIEM or XDR, enable curated detections and threat intelligence, and build hunting and incident-response workflows on the open evidence.",
    faqs: [
      {
        question: "What is Open NDR and why does it matter?",
        answer:
          "Open NDR means detection and evidence built on open standards, in Corelight's case Zeek and Suricata, that you can inspect, search and integrate freely, rather than a closed scoring engine. It matters because threat hunters and incident responders need transparent, structured data they can pivot on, not just a black-box verdict.",
      },
      {
        question: "Does Corelight replace my SIEM?",
        answer:
          "No. Corelight is most powerful feeding your SIEM or XDR, such as Splunk, Microsoft Sentinel or Elastic, with rich network evidence and curated detections. It enriches your analytics platform rather than replacing it.",
      },
      {
        question: "Is Corelight only for elite teams?",
        answer:
          "It delivers the most value to mature SOCs, threat hunters and incident responders who work from evidence. That said, its curated detections and threat intelligence also make it actionable for teams that want both depth and ready-made detection content.",
      },
    ],
    whatIs: {
      eyebrow: "What is Corelight",
      titlePrefix: "Open NDR built on ",
      titleHighlight: "Zeek and Suricata",
      bodyParagraphs: [
        "Corelight Open NDR transforms network traffic into rich, structured evidence using the open-source standards Zeek and Suricata. Rather than a closed scoring box, it gives analysts comprehensive, transparent data they can search, pivot on and integrate anywhere.",
        "Corelight layers curated detections, threat intelligence and ML on top of that open evidence, and feeds any SIEM or XDR, making it the platform of choice for mature SOCs, threat hunters and incident responders who work from network truth.",
      ],
      feature: {
        titleLine1: "Evidence,",
        titleLine2: "Not a Black Box",
        body: "Corelight's distinction is openness: it produces the rich, structured Zeek and Suricata evidence hunters trust, integrable into any analytics platform, with curated detection on top.",
      },
      capabilities: [
        "Open-source Zeek and Suricata structured evidence",
        "Hunt-ready data for detection, hunting and IR",
        "Open integration into any SIEM or XDR",
        "Curated detections, threat intelligence and ML on top",
      ],
    },
    deploymentOptions: {
      eyebrow: "How it is delivered",
      title: "Sensors that generate evidence.",
      intro: "Artiflex integrates Corelight evidence into your analytics platform.",
      options: [
        { icon: "hardware", title: "Sensors", body: "Physical, virtual and cloud sensors transform traffic into Zeek and Suricata evidence." },
        { icon: "cloud", title: "Investigator", body: "Optional cloud analytics and hunting directly on Corelight evidence." },
        { icon: "virtual", title: "SIEM / XDR feed", body: "Evidence and detections integrated into Splunk, Sentinel, Elastic or any XDR." },
      ],
    },
  },
};

/* ───────────────────────── Discipline registry ───────────────────────── */

export const secOpsDisciplines: Record<
  string,
  { label: string; href: string; vendors: Record<string, SecOpsVendor> }
> = {
  mdr: { label: "MDR", href: "/cybersecurity/security-operations/mdr", vendors: mdrVendors },
  ndr: { label: "NDR", href: "/cybersecurity/security-operations/ndr", vendors: ndrVendors },
  siem: { label: "SIEM", href: "/cybersecurity/security-operations/siem", vendors: siemVendors },
};
