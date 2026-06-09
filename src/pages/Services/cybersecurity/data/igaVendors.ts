export type IgaVendor = {
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

export const igaVendors: Record<string, IgaVendor> = {
  saviynt: {
    slug: "saviynt",
    name: "Saviynt Identity Cloud",
    logo: "/logos/Saviynt.png",
    tagline: "Converged SaaS-native IGA + AAG + CIEM + Cloud PAM in one licence, four years running as Gartner Customers' Choice",
    bestFor: "Recommended for IGA · Customers' Choice 4 Years Running",
    description:
      "Saviynt Identity Cloud is a true multi-tenant SaaS IGA platform with quarterly auto-applied releases and converged scope covering Identity Governance, Application Access Governance with built-in SoD libraries, Cloud Infrastructure Entitlement Management, Third-Party Access Governance, and Cloud PAM under a single licence. For UAE banks, ministries, energy and healthcare estates running SAP S/4HANA, Oracle ERP, Workday or multi-cloud workloads, Saviynt collapses three to five point tools into one console while cutting certification rubber-stamping by 40 to 60 percent through Iris AI risk-based reviews.",
    keyStats: [
      { label: "Deployment", value: "True SaaS multi-tenant, quarterly auto-releases" },
      { label: "Converged scope", value: "IGA + AAG + CIEM + TPAG + Cloud PAM" },
      { label: "SoD libraries", value: "SAP, Oracle EBS / S/4, Workday, PeopleSoft" },
      { label: "Recognition", value: "Gartner Customers' Choice for four consecutive years" },
    ],
    whyWinsIntro: {
      label: "Saviynt Identity Cloud Highlights",
      title: "The right IGA for cloud-first, regulated, ERP-heavy UAE estates",
      description:
        "Saviynt is most compelling when audit scope crosses ERP, multi-cloud entitlements, and third-party access, and when the buying team wants one licence instead of a SailPoint + CyberArk + SecZetta + CIEM bundle. For organisations on M365 E5 with no significant SAP / Oracle SoD exposure, Microsoft Entra ID Governance is often the right value answer; for the largest hybrid IGA estates with sovereign on-prem requirements, SailPoint IdentityIQ remains the safer pick.",
      stats: [
        { value: "40-60%", label: "reduction in rubber-stamped certifications via Iris AI risk scoring", tone: "emerald" },
        { value: "25-40%", label: "lower TCO than equivalent SailPoint + CyberArk + SecZetta + CIEM stack", tone: "violet" },
        { value: "4 yrs", label: "Gartner Peer Insights Customers' Choice for Identity Governance", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Converged Platform",
        icon: "layers",
        tone: "emerald",
        title: "IGA + AAG + CIEM + Third-Party + Cloud PAM in one licence",
        desc: "One console, one data model, one licence covers Identity Governance, Application Access Governance, Cloud Infrastructure Entitlement Management, Third-Party Access Governance, and Cloud PAM. Removes three to five point tools and the integration tax between them.",
      },
      {
        tag: "True SaaS",
        icon: "globe",
        tone: "violet",
        title: "Multi-tenant SaaS with quarterly auto-releases",
        desc: "SaaS-native from day one rather than SaaS-washed legacy. Quarterly releases land automatically with no upgrade projects, no maintenance windows, no version skew between tenants.",
      },
      {
        tag: "Iris AI",
        icon: "activity",
        tone: "sky",
        title: "Risk-based certifications, 40-60% less rubber-stamping",
        desc: "Iris AI scores access risk per entitlement and per reviewer pattern, focusing certification campaigns on the 5 to 10 percent of access that is genuinely risky. Cuts review fatigue and surfaces violations that bulk-approval workflows hide.",
      },
      {
        tag: "ERP SoD OOTB",
        icon: "file",
        tone: "amber",
        title: "Out-of-the-box SoD libraries for SAP, Oracle, Workday",
        desc: "Pre-built Segregation of Duties rule libraries for SAP S/4HANA, Oracle EBS, Workday and PeopleSoft. The single most-audited control under SOX, NESA, NCA ECC and SAMA for any organisation running ERP.",
      },
      {
        tag: "CIEM Included",
        icon: "eye",
        tone: "rose",
        title: "Cloud entitlement right-sizing across AWS, Azure, GCP",
        desc: "Native Cloud Infrastructure Entitlement Management discovers and right-sizes excessive cloud permissions from the same console. Closes a control gap that point IGA tools force you to solve with a separate Permit.io, Sonrai or Wiz license.",
      },
      {
        tag: "AI / NHI Ready",
        icon: "shield",
        tone: "slate",
        title: "Governance for service accounts, bots and AI agents",
        desc: "Treats service accounts, bots and AI agents as governable identities with their own lifecycle, certification and SoD scope. Addresses NIS2 and NCA ECC requirements that increasingly extend identity controls to non-human identities.",
      },
    ],
    watchOuts: [
      {
        title: "Smaller MENA partner network than SailPoint",
        desc: "SailPoint has a larger installed base and partner footprint in MENA. Saviynt's regional presence is growing but still smaller, execution depends more heavily on a Saviynt-experienced delivery partner than SailPoint does.",
      },
      {
        title: "Deep on-prem / air-gap not the strongest fit",
        desc: "Saviynt is true SaaS. For fully sovereign air-gapped deployments (defence, certain ministries), SailPoint IdentityIQ on-prem remains the safer architectural pattern.",
      },
    ],
    bestFitProfile: [
      "UAE banks, energy, healthcare and government estates with SAP S/4HANA, Oracle ERP or Workday in scope",
      "Customers with active SoD audit findings under SOX, NESA, NCA ECC or SAMA",
      "Organisations consolidating IGA + PAM + CIEM + Third-Party Access into a single licence",
      "Multi-cloud estates (AWS + Azure + GCP) needing CIEM in the same governance console",
      "Identity estates between 5,000 and 250,000 users where SaaS-native cadence is a buying requirement",
      "Buyers actively migrating off SailPoint IdentityIQ, Oracle OIM or NetIQ to a cloud-native platform",
      "Estates with heavy third-party / contractor / vendor access that needs separate governance",
    ],
    products: [
      { model: "Saviynt EIC, Identity Governance & Administration", segment: "Core IGA", role: "Joiner / Mover / Leaver, certifications, access requests, role mining" },
      { model: "Saviynt Application Access Governance (AAG)", segment: "ERP SoD", role: "OOTB SoD libraries for SAP S/4HANA, Oracle, Workday, PeopleSoft" },
      { model: "Saviynt CIEM", segment: "Cloud entitlements", role: "Right-size AWS, Azure and GCP permissions from the IGA console" },
      { model: "Saviynt Third-Party Access Governance (TPAG)", segment: "Non-employee", role: "Contractor, vendor and partner identity lifecycle with sponsorship workflow" },
      { model: "Saviynt Cloud PAM", segment: "Privileged", role: "Just-in-time privileged access for cloud and SaaS, converged with IGA" },
      { model: "Saviynt Identity Cloud (Bundle)", segment: "Strategic", role: "All modules under one converged licence, recommended starting point" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Saviynt Identity Cloud end-to-end for UAE banks, ministries, energy and healthcare customers. Our team has hands-on experience with Application Access Governance for SAP and Oracle ERP, Iris AI certification campaigns, CIEM for AWS / Azure / GCP, and Third-Party Access Governance for contractor-heavy estates. Vendor-neutral sizing is our default starting point; we will tell you when SailPoint or Microsoft Entra ID Governance is a stronger fit for your audit scope and identity surface.",
    faqs: [
      {
        question: "How does Saviynt compare to SailPoint?",
        answer:
          "SailPoint has the most mature IGA platform and the broadest pre-built connector library, especially for hybrid and on-prem-heavy estates. Saviynt leads on converged scope (IGA + AAG + CIEM + PAM + Third-Party in one licence) and is SaaS-native rather than SaaS-washed. For UAE buyers with SAP / Oracle SoD audit findings or multi-cloud CIEM scope, Saviynt typically wins; for sovereign air-gapped IGA, SailPoint IdentityIQ remains stronger.",
      },
      {
        question: "Do we still need a separate PAM if we deploy Saviynt?",
        answer:
          "Saviynt Cloud PAM covers just-in-time privileged access for cloud and SaaS. For deep session recording, credential vaulting and Windows / Linux server PAM at scale, CyberArk remains the deeper specialist. Many UAE customers run Saviynt for IGA + AAG + CIEM and CyberArk for traditional vault / session PAM, with Saviynt governing CyberArk's privileged user lifecycle.",
      },
      {
        question: "How long does a Saviynt deployment take?",
        answer:
          "A focused first-phase deployment (Identity Governance lifecycle, M365 / Entra / AD connectors, first certification campaign) typically lands in 12 to 16 weeks. Application Access Governance for SAP / Oracle / Workday and CIEM are usually phased in over the following two quarters as audit scope demands.",
      },
      {
        question: "Is Saviynt suitable for UAE sovereignty requirements?",
        answer:
          "Saviynt operates from regional cloud regions and is consumable under NESA UAE Information Assurance and NCA ECC controls. For fully on-prem air-gapped scenarios (defence, certain ministries), SailPoint IdentityIQ on-prem is the established pattern. For mainstream UAE banks, energy and government cloud-first estates, Saviynt's regional SaaS delivery is well-aligned.",
      },
      {
        question: "What about AI agents and non-human identities?",
        answer:
          "Saviynt treats service accounts, bots and AI agents as first-class governable identities, with ownership, lifecycle, certification scope and SoD applicability. This matters as NIS2 and NCA ECC increasingly extend identity controls beyond human users, and as agentic AI workloads multiply non-human identities inside the estate.",
      },
    ],
    whatIs: {
      eyebrow: "What is Saviynt Identity Cloud",
      titlePrefix: "Converged identity governance for the ",
      titleHighlight: "regulated, multi-cloud enterprise",
      bodyParagraphs: [
        "Saviynt Identity Cloud is a SaaS-native Identity Governance & Administration platform that unifies IGA, Application Access Governance, Cloud Infrastructure Entitlement Management, Third-Party Access Governance and Cloud PAM into a single converged platform.",
        "Where legacy IGA solved 'who has access to what' as an annual access review and a JML workflow, Saviynt solves it as a continuous, AI-assisted control plane across cloud, SaaS, ERP, and non-human identities, with SoD libraries shipped out of the box for SAP S/4HANA, Oracle, Workday and PeopleSoft.",
        "For UAE buyers, this means one licence and one console answers SOX, NESA, NCA ECC and SAMA identity controls instead of stitching together SailPoint plus CyberArk plus SecZetta plus a separate CIEM. The TCO advantage typically lands at 25-40 percent, and certification fatigue drops sharply once Iris AI is focusing reviewers on actual risk.",
      ],
      feature: {
        titleLine1: "Iris AI",
        titleLine2: "risk-based reviews",
        body: "Iris scores each entitlement and each reviewer's pattern, then focuses certification campaigns on the 5-10% of access that is genuinely risky. Reviewers see fewer rows, surface real violations, and stop rubber-stamping. Customers commonly report a 40-60% drop in approve-everything behaviour after the first risk-scored campaign.",
      },
      capabilities: [
        "Joiner / Mover / Leaver lifecycle with policy-based access",
        "Iris AI risk-based access certifications",
        "OOTB SoD libraries for SAP, Oracle, Workday, PeopleSoft",
        "CIEM across AWS, Azure and GCP",
        "Third-Party Access Governance with sponsorship workflow",
        "Cloud PAM for just-in-time privileged access",
        "Role mining and entitlement analytics",
        "Service account and AI agent governance",
      ],
    },
    deploymentOptions: {
      eyebrow: "Deployment Options",
      title: "Three ways to consume Saviynt Identity Cloud,",
      intro: "sized by identity count, ERP exposure and cloud footprint.",
      options: [
        { icon: "cloud", title: "Saviynt SaaS (recommended)", body: "Multi-tenant SaaS in regional cloud regions, quarterly auto-releases, fastest time-to-value for greenfield and modernisation projects." },
        { icon: "virtual", title: "Saviynt Single-Tenant", body: "Dedicated tenant for buyers needing stronger isolation, longer change windows or specific residency controls beyond the standard multi-tenant pattern." },
        { icon: "hardware", title: "Hybrid with on-prem connectors", body: "Saviynt SaaS plus on-prem connector / agent footprint for SAP, Oracle, mainframe, and air-gap-adjacent systems where direct cloud connectivity is restricted." },
      ],
    },
  },

  sailpoint: {
    slug: "sailpoint",
    name: "SailPoint Identity Security Cloud",
    logo: "/logos/sailpoint.webp",
    tagline: "The most mature IGA platform with the broadest connector library and the strongest hybrid + on-prem story",
    bestFor: "Most Mature IGA · Broadest Connector Library",
    description:
      "SailPoint Identity Security Cloud (SaaS) and IdentityIQ (on-prem / air-gapped) form the most mature IGA portfolio on the market. SailPoint has the largest installed base, the deepest pre-built connector library, the strongest reference architectures for SOX and FSI, and AI Insights for risk-based reviews. For UAE banks, ministries and enterprises with hybrid or sovereign on-prem requirements, SailPoint remains the safest architectural pick.",
    keyStats: [
      { label: "Footprint", value: "Largest enterprise IGA install base globally" },
      { label: "Connectors", value: "Industry's broadest pre-built catalogue" },
      { label: "Deployment", value: "Identity Security Cloud (SaaS) + IdentityIQ (on-prem)" },
      { label: "Position", value: "Gartner Magic Quadrant Leader for IGA" },
    ],
    strengths: [
      {
        tag: "Mature platform",
        icon: "shield",
        tone: "emerald",
        title: "Most established IGA in production at scale",
        desc: "SailPoint has the largest enterprise IGA install base globally with reference customers in nearly every regulated vertical. Risk profile of choosing SailPoint is the lowest of any IGA shortlist option for buyers prioritising vendor stability.",
      },
      {
        tag: "Connector breadth",
        icon: "globe",
        tone: "violet",
        title: "Broadest pre-built application connector library",
        desc: "The largest pre-built connector catalogue in IGA, covering legacy mainframe, ERP, SaaS and cloud sources. Reduces custom development on day one of any migration project.",
      },
      {
        tag: "Hybrid IGA",
        icon: "layers",
        tone: "sky",
        title: "Identity Security Cloud + IdentityIQ on-prem",
        desc: "Identity Security Cloud delivers SaaS IGA for cloud-first estates while IdentityIQ remains supported for on-prem, air-gapped and sovereign deployments. Same vendor, two consumption patterns.",
      },
      {
        tag: "AI Insights",
        icon: "activity",
        tone: "amber",
        title: "Risk-based access reviews with peer comparison",
        desc: "AI Insights compares user access against peer groups and surfaces outliers for reviewer attention, reducing certification rubber-stamping without requiring rule rewrites.",
      },
      {
        tag: "FSI references",
        icon: "barChart",
        tone: "rose",
        title: "Reference architectures for SOX, FSI, hybrid estates",
        desc: "SailPoint has the deepest set of audit-ready reference architectures for SOX, FSI and FedRAMP-style regulated estates. Procurement and audit teams recognise the platform name.",
      },
      {
        tag: "Modernisation path",
        icon: "list",
        tone: "slate",
        title: "Same vendor for IdentityIQ-to-cloud migration",
        desc: "Customers running IdentityIQ on-prem can migrate to Identity Security Cloud under the same vendor relationship, with structured migration tooling, avoiding a full RFP cycle.",
      },
    ],
    watchOuts: [
      {
        title: "Licensing complexity",
        desc: "SailPoint's licence model has more moving parts than Saviynt's converged single-licence approach. AAG, third-party access and PAM are typically separate line items or partner integrations rather than bundled in the IGA SKU.",
      },
      {
        title: "IdentityIQ TCO",
        desc: "On-prem IdentityIQ has a higher total cost of ownership than SaaS competitors over a five-year window. Upgrade cycles, custom workflow maintenance and infrastructure all add up. Cloud migration is the standard answer when audit doesn't mandate on-prem.",
      },
      {
        title: "ERP SoD not as native as Saviynt",
        desc: "SailPoint covers ERP SoD via partner integrations and add-ons. For organisations whose primary IGA driver is SAP / Oracle SoD audit findings, Saviynt's native AAG library is typically more efficient.",
      },
    ],
    bestFitProfile: [
      "Large enterprises and UAE banks prioritising vendor maturity and lowest deployment risk",
      "Sovereign and air-gapped estates needing on-prem IGA (IdentityIQ) with future cloud path",
      "Organisations with the broadest application footprint where connector breadth is decisive",
      "Customers already on IdentityIQ looking to modernise to Identity Security Cloud under one vendor",
      "FSI estates with SOX / regulated audit scope and strong procurement preferences for established vendors",
      "Hybrid estates where some applications must stay on-prem while new workloads run in cloud",
      "Identity estates above 50,000 users where platform stability outweighs converged-scope economics",
    ],
    products: [
      { model: "SailPoint Identity Security Cloud", segment: "SaaS IGA", role: "Cloud-native IGA with AI Insights, recommended for greenfield and modernisation" },
      { model: "SailPoint IdentityIQ", segment: "On-prem IGA", role: "Long-standing on-prem IGA for sovereign and air-gapped estates" },
      { model: "SailPoint Access Risk Management (AAG)", segment: "ERP risk", role: "Application Access Governance and SoD for SAP and ERP estates" },
      { model: "SailPoint Non-Employee Risk Management", segment: "Third-party", role: "Contractor, vendor and partner identity lifecycle" },
      { model: "SailPoint Cloud Infrastructure Entitlement Management", segment: "CIEM", role: "Cloud entitlement governance for AWS, Azure, GCP" },
    ],
    whyArtiflex:
      "Artiflex IT deploys SailPoint Identity Security Cloud and IdentityIQ for UAE banks, government and large enterprise customers. Our delivery team covers both SaaS-native deployments and hybrid IdentityIQ environments, plus modernisation projects migrating customers from IdentityIQ on-prem to Identity Security Cloud. Vendor-neutral sizing is our default starting point, we will tell you when Saviynt's converged single-licence model is the stronger fit.",
    faqs: [
      {
        question: "Identity Security Cloud or IdentityIQ, which one do we pick?",
        answer:
          "Identity Security Cloud is the strategic destination and the recommended pick for new deployments. IdentityIQ on-prem is still actively maintained and remains the right answer for sovereign, air-gapped or change-restricted estates. SailPoint supports structured migration from IdentityIQ to Identity Security Cloud once cloud connectivity is acceptable.",
      },
      {
        question: "How does SailPoint compare to Saviynt for SAP SoD?",
        answer:
          "Saviynt ships Application Access Governance with native OOTB SoD libraries for SAP S/4HANA, Oracle, Workday and PeopleSoft. SailPoint covers this via Access Risk Management as a separate module / partner integration. For estates where SAP / Oracle SoD is the primary IGA driver, Saviynt is typically more efficient; for hybrid estates where connector breadth and platform maturity dominate, SailPoint is the safer pick.",
      },
      {
        question: "Can SailPoint govern non-human and AI-agent identities?",
        answer:
          "Yes. SailPoint's roadmap explicitly extends identity controls to service accounts, machine identities and AI agents. Customer-side maturity around defining ownership and lifecycle for non-human identities is usually the harder problem than the platform itself.",
      },
      {
        question: "What does a typical SailPoint deployment timeline look like?",
        answer:
          "A focused first-phase rollout (AD / Entra / M365 lifecycle, first certification campaign, top 10 applications) typically lands in 14 to 20 weeks for Identity Security Cloud. IdentityIQ deployments run longer because of infrastructure and custom workflow scoping.",
      },
    ],
  },

  "microsoft-entra-id-governance": {
    slug: "microsoft-entra-id-governance",
    name: "Microsoft Entra ID Governance",
    logo: "/logos/microsoft.svg",
    tagline: "Bundled in Microsoft 365 E5 and Entra Suite, the best value IGA for Microsoft-centric estates",
    bestFor: "Best Value Inside M365 E5 · Microsoft-Centric Estates",
    description:
      "Microsoft Entra ID Governance is the IGA layer of the Entra family, bundled in Microsoft 365 E5 and the standalone Entra Suite. For UAE customers already on E5 or Entra Suite contracts, Entra ID Governance delivers entitlement management, access reviews, lifecycle workflows and Copilot-driven recommendations across the M365, Azure and Entra-connected SaaS estate at zero or near-zero incremental licence cost. Best fit for Microsoft-centric organisations where ERP SoD and deep non-Microsoft connectors are not the primary buying driver.",
    keyStats: [
      { label: "Bundling", value: "Included in M365 E5 / Entra Suite" },
      { label: "Native scope", value: "M365, Entra, Azure, Entra-connected SaaS" },
      { label: "AI", value: "Copilot-driven access recommendations" },
      { label: "Best for", value: "Microsoft-centric estates < 5,000 users" },
    ],
    strengths: [
      {
        tag: "E5 economics",
        icon: "barChart",
        tone: "emerald",
        title: "Zero or near-zero incremental licence cost",
        desc: "If you are already on Microsoft 365 E5 or Entra Suite, Entra ID Governance is bundled. No additional vendor relationship to procure, no separate SKU, no parallel infrastructure to operate.",
      },
      {
        tag: "M365 native",
        icon: "layers",
        tone: "violet",
        title: "Deep, native coverage of the Microsoft estate",
        desc: "Entitlement management, access packages and reviews integrate natively with Entra ID, Microsoft 365 groups, Teams, SharePoint, Dynamics and Azure RBAC. Joiner / Mover / Leaver lifecycle is closer to the source than any third-party IGA can be.",
      },
      {
        tag: "Copilot",
        icon: "activity",
        tone: "sky",
        title: "Copilot-driven access recommendations",
        desc: "Copilot for Security and Copilot in Entra surface risky access, suggest access package optimisations, and accelerate certification campaigns using Microsoft's own AI stack.",
      },
      {
        tag: "Lifecycle workflows",
        icon: "list",
        tone: "amber",
        title: "Native joiner / mover / leaver workflows",
        desc: "Lifecycle workflows trigger on HR attribute changes from Workday, SuccessFactors or SAP HCM and orchestrate provisioning, deprovisioning and access package assignment without external IGA tooling.",
      },
      {
        tag: "Access reviews",
        icon: "eye",
        tone: "rose",
        title: "Built-in access reviews and entitlement management",
        desc: "Access reviews cover Azure roles, Entra groups, M365 group membership and entitlement-management access packages. Reviewers see one unified interface aligned to the M365 admin experience.",
      },
      {
        tag: "PIM",
        icon: "lock",
        tone: "slate",
        title: "Privileged Identity Management for Azure and Entra",
        desc: "PIM provides just-in-time elevation for Azure roles and Entra-administrative roles. Not a replacement for full PAM, but a strong native control for cloud admin scopes.",
      },
    ],
    watchOuts: [
      {
        title: "Weak for SAP / Oracle / Workday SoD",
        desc: "Entra ID Governance is not built for ERP Segregation of Duties. For organisations whose primary IGA driver is SAP S/4HANA or Oracle ERP SoD audit findings, pair Entra with Saviynt AAG or SailPoint Access Risk Management.",
      },
      {
        title: "Non-Microsoft connector depth is limited",
        desc: "For highly regulated multi-cloud or multi-vendor SaaS estates with deep mainframe, legacy ERP or specialist application coverage, Entra alone falls short. Saviynt or SailPoint typically take that scope.",
      },
      {
        title: "Not sufficient as the only IGA for FSI / regulated buyers",
        desc: "For UAE banks under SAMA / CBUAE, large insurers and regulated multi-cloud estates, Entra is usually a complementary layer rather than the strategic IGA platform. Pair it with Saviynt or SailPoint for full audit scope.",
      },
    ],
    bestFitProfile: [
      "UAE organisations already on Microsoft 365 E5 or Entra Suite contracts",
      "Microsoft-centric estates (M365, Azure, Dynamics) with limited non-Microsoft SaaS scope",
      "SME and mid-market customers under 5,000 users without active SAP / Oracle SoD findings",
      "Government bodies and educational institutions standardised on the Microsoft stack",
      "Customers needing a fast IGA quick-win without adding a new vendor to the contract estate",
      "Organisations using Entra ID as their primary identity provider with Workday or SAP HCM as authoritative HR",
      "Buyers prioritising native joiner / mover / leaver workflows over deep SoD or third-party governance",
    ],
    products: [
      { model: "Microsoft Entra ID Governance (bundled in E5 / Entra Suite)", segment: "Bundled IGA", role: "Entitlement management, access reviews, lifecycle workflows" },
      { model: "Microsoft Entra ID P2", segment: "Identity premium", role: "Conditional Access, PIM, risk-based authentication, prerequisite for Governance features" },
      { model: "Microsoft Entra Suite", segment: "Standalone", role: "Governance + Internet Access + Private Access + Verified ID bundle for non-E5 customers" },
      { model: "Microsoft Entra Permissions Management (CIEM)", segment: "Cloud entitlements", role: "Multi-cloud CIEM across Azure, AWS and GCP" },
      { model: "Microsoft Entra Verified ID", segment: "Decentralised ID", role: "Verifiable credentials for workforce, customer and partner onboarding" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Microsoft Entra ID Governance for UAE customers already invested in M365 E5 or Entra Suite, and we are equally honest when E5-bundled governance is not enough, we recommend pairing with Saviynt or SailPoint when ERP SoD, deep third-party access or multi-cloud CIEM are in scope. Our team has deployed Entra lifecycle workflows, entitlement management and PIM across UAE government and enterprise customers.",
    faqs: [
      {
        question: "Is Microsoft Entra ID Governance a real IGA platform?",
        answer:
          "Yes for Microsoft-centric estates. It covers entitlement management, access reviews, lifecycle workflows and PIM natively. It is not a SailPoint / Saviynt replacement for SAP SoD, deep non-Microsoft application connectors or regulated FSI audit scope, but for E5-funded Microsoft estates it delivers the core IGA controls at zero incremental licence cost.",
      },
      {
        question: "Do we need Entra ID P2 to use Entra ID Governance?",
        answer:
          "Yes. Entra ID Governance requires Entra ID P2 prerequisites (which are bundled inside Microsoft 365 E5 and Entra Suite). If you are on E3 or Business Premium, you upgrade to Entra Suite or E5 to unlock the Governance features.",
      },
      {
        question: "Can Entra govern SAP and Oracle access?",
        answer:
          "Entra can provision and certify access into SAP and Oracle but does not ship the SoD rule libraries those audits demand. The right pattern for ERP-heavy estates is Entra for the Microsoft-side lifecycle and Saviynt AAG or SailPoint ARM for the ERP SoD layer.",
      },
      {
        question: "When do we outgrow Entra ID Governance?",
        answer:
          "Typical triggers are: SAP / Oracle SoD audit findings, multi-cloud CIEM scope across AWS + GCP + Azure together, heavy non-employee / contractor governance, identity estates above 5,000 with strong non-Microsoft application coverage, or sovereign on-prem residency requirements. Any of these usually triggers a Saviynt or SailPoint conversation as the strategic IGA layer.",
      },
    ],
  },

  "oracle-identity-governance": {
    slug: "oracle-identity-governance",
    name: "Oracle Identity Governance",
    logo: "/logos/Oracle.png",
    tagline: "On-prem heritage IGA with tight integration to Oracle ERP and Oracle Cloud Infrastructure",
    bestFor: "Existing Oracle Estates · Tight Oracle ERP Integration",
    description:
      "Oracle Identity Governance (OIG, formerly Oracle Identity Manager / OIM) is a mature on-prem IGA platform best-fit only for organisations already deeply invested in the Oracle stack. Tight integration with Oracle EBS, Oracle Fusion, PeopleSoft and Oracle Cloud Infrastructure makes it a defensible pick for sovereign on-prem estates anchored on Oracle. For greenfield deployments, modernisation projects almost always migrate to Saviynt or SailPoint over a 12 to 18 month phased path.",
    keyStats: [
      { label: "Heritage", value: "Long-standing on-prem IGA (formerly OIM)" },
      { label: "Sweet spot", value: "Oracle EBS, Fusion, PeopleSoft, OCI" },
      { label: "Deployment", value: "On-prem and Oracle Cloud Infrastructure" },
      { label: "Strategic answer", value: "Modernise to Saviynt / SailPoint over 12-18 months" },
    ],
    strengths: [
      {
        tag: "Oracle ERP integration",
        icon: "file",
        tone: "emerald",
        title: "Native connectors for EBS, Fusion, PeopleSoft",
        desc: "OIG ships native connectors and provisioning workflows for the full Oracle application portfolio, EBS, Fusion Cloud Applications, PeopleSoft and JD Edwards. For Oracle-anchored estates this depth is genuinely differentiated.",
      },
      {
        tag: "Sovereign on-prem",
        icon: "server",
        tone: "violet",
        title: "Air-gap-capable IGA tied to Oracle infrastructure",
        desc: "OIG runs entirely on-prem or inside Oracle Cloud Infrastructure regions, suitable for sovereign and air-gap-adjacent environments where SaaS IGA is not an option.",
      },
      {
        tag: "Workflow engine",
        icon: "list",
        tone: "sky",
        title: "Mature approval and provisioning workflows",
        desc: "Long-established workflow engine handles complex multi-step approval, request and provisioning patterns that some newer SaaS IGAs are still maturing.",
      },
      {
        tag: "OCI alignment",
        icon: "globe",
        tone: "amber",
        title: "Tight alignment with Oracle Cloud Infrastructure",
        desc: "For estates that have committed to OCI as the strategic cloud, OIG governance maps naturally onto OCI IAM, Oracle databases and Oracle SaaS applications.",
      },
    ],
    watchOuts: [
      {
        title: "Slower innovation than Saviynt / SailPoint",
        desc: "Oracle's IGA release cadence is significantly slower than SaaS-native peers. AI-based certification, CIEM, cloud-first connector libraries and modern UX investment lag behind Saviynt and SailPoint.",
      },
      {
        title: "Modernisation is the standard exit path",
        desc: "Most UAE Oracle OIG customers we encounter are in a multi-year modernisation conversation, typically migrating to Saviynt (for converged SaaS + AAG) or SailPoint Identity Security Cloud (for breadth and connector depth).",
      },
      {
        title: "Custom workflow debt accumulates",
        desc: "Long-running OIG deployments carry years of custom workflow code that breaks on upgrade. Modernisation often costs as much in legacy decommissioning as in the new platform itself.",
      },
    ],
    bestFitProfile: [
      "UAE customers with deeply embedded Oracle EBS, Fusion or PeopleSoft footprints",
      "Sovereign on-prem estates standardised on Oracle Cloud Infrastructure",
      "Organisations under existing Oracle Unlimited Licence Agreements (ULA) where OIG is already entitled",
      "Customers in early stages of an OIG-to-Saviynt or OIG-to-SailPoint modernisation plan",
      "Buyers prioritising native Oracle ERP integration over modern SaaS-IGA cadence",
      "Air-gap and sovereign estates where SaaS IGA is not an architectural option",
    ],
    products: [
      { model: "Oracle Identity Governance (OIG)", segment: "On-prem IGA", role: "Core IGA, provisioning, requests, certifications, workflow" },
      { model: "Oracle Access Manager (OAM)", segment: "Access", role: "Web SSO and federation, typically deployed alongside OIG" },
      { model: "Oracle Access Governance", segment: "Cloud", role: "Newer Oracle SaaS governance for OCI / Fusion estates" },
      { model: "Oracle Unified Directory (OUD)", segment: "Directory", role: "LDAP / directory layer underpinning OIG and OAM" },
    ],
    whyArtiflex:
      "Artiflex IT supports Oracle Identity Governance for UAE customers running existing Oracle estates and provides honest assessment when modernisation to Saviynt or SailPoint is the right strategic path. Our team has experience with OIG operational support, OAM federation, and structured OIG-to-modern-IGA migration planning. We will not push you off Oracle when it is genuinely the best fit, but we will tell you when it is not.",
    faqs: [
      {
        question: "Should we stay on Oracle Identity Governance?",
        answer:
          "If your estate is deeply Oracle-aligned (EBS, Fusion, PeopleSoft, OCI) and operating well today, OIG remains a defensible operational choice. If you are taking on multi-cloud, SAP S/4HANA, modern SaaS applications, or you face slowed innovation pressure, modernising to Saviynt or SailPoint over 12-18 months is the typical strategic answer.",
      },
      {
        question: "What is the typical OIG-to-modern-IGA migration path?",
        answer:
          "A standard pattern: stand up Saviynt or SailPoint alongside OIG, migrate applications in waves (lowest-risk first), run parallel certifications for one cycle, then decommission OIG once new platform stability is proven. Total elapsed time is typically 12-18 months for mid-size estates.",
      },
      {
        question: "Does Oracle Access Governance replace OIG?",
        answer:
          "Oracle Access Governance is Oracle's newer SaaS governance offering, focused on OCI and Fusion. It is not yet a like-for-like replacement for OIG's full on-prem feature set, and most multi-vendor estates evaluate Saviynt or SailPoint rather than Oracle Access Governance as the strategic destination.",
      },
    ],
  },

  "one-identity-manager": {
    slug: "one-identity-manager",
    name: "One Identity Manager",
    logo: "/logos/OneIdentity.png",
    tagline: "Mature on-prem and hybrid IGA with strong Active Directory lifecycle management",
    bestFor: "Existing NetIQ / One Identity Estates · AD-Heavy Hybrid",
    description:
      "One Identity Manager (formerly Dell / Quest, now One Identity) is a mature on-prem and hybrid IGA platform with particularly strong Active Directory lifecycle management. Best leverage when an existing One Identity relationship (Safeguard, OneLogin, Identity Manager) is already in place. For greenfield deployments, Saviynt and SailPoint typically lead UAE shortlists, but One Identity remains a credible choice for AD-heavy estates with established One Identity tooling.",
    keyStats: [
      { label: "Heritage", value: "Long-standing IGA, formerly Quest / Dell" },
      { label: "Strength", value: "Deep Active Directory lifecycle management" },
      { label: "Deployment", value: "On-prem and hybrid" },
      { label: "Best leverage", value: "Estates already on Safeguard / OneLogin / Identity Manager" },
    ],
    strengths: [
      {
        tag: "AD lifecycle",
        icon: "users",
        tone: "emerald",
        title: "Deep Active Directory provisioning and lifecycle",
        desc: "One Identity Manager has unusually deep AD lifecycle capability, group management, nested membership, OU structure provisioning, hybrid join scenarios, reflecting its Quest Software heritage on the AD admin side.",
      },
      {
        tag: "Portfolio bundling",
        icon: "layers",
        tone: "violet",
        title: "Cross-sell with Safeguard PAM and OneLogin",
        desc: "Estates already running Safeguard for privileged credentials, OneLogin for SSO or Active Roles for AD admin get tighter integration and commercial leverage when bundling Identity Manager.",
      },
      {
        tag: "On-prem and hybrid",
        icon: "server",
        tone: "sky",
        title: "Air-gap-capable, hybrid-deployment ready",
        desc: "Deployable fully on-prem or hybrid, suitable for sovereign estates where SaaS IGA is not viable. Functional parity between on-prem and hybrid deployments is mature.",
      },
      {
        tag: "Workflow engine",
        icon: "list",
        tone: "amber",
        title: "Established request, approval and provisioning flows",
        desc: "Long-running workflow engine handles complex approval chains, role-mining and segregation patterns built up over many enterprise references.",
      },
    ],
    watchOuts: [
      {
        title: "UI feels dated relative to Saviynt / SailPoint",
        desc: "End-user and admin experience lags behind modern SaaS IGAs. Certification reviewer UX in particular has not kept pace with what Saviynt Iris or SailPoint AI Insights deliver.",
      },
      {
        title: "Limited third-party / non-employee governance",
        desc: "Third-party access governance for contractors, vendors and partners is less developed than Saviynt TPAG or SailPoint Non-Employee Risk Management. Heavy non-employee estates typically need a different pick.",
      },
      {
        title: "Greenfield-deployment cost-benefit is weaker",
        desc: "For greenfield UAE deployments without an existing One Identity portfolio relationship, Saviynt or SailPoint typically beat One Identity on innovation cadence, SaaS-native posture and ERP SoD scope.",
      },
    ],
    bestFitProfile: [
      "UAE estates already running Safeguard PAM, OneLogin SSO or Active Roles for AD",
      "Hybrid and on-prem-heavy environments where SaaS IGA is not yet acceptable",
      "AD-centric organisations needing deep AD provisioning and lifecycle management",
      "Customers with existing One Identity portfolio commercial commitments",
      "Sovereign or air-gap-adjacent estates where on-prem IGA is mandatory",
      "Buyers prioritising vendor consolidation across PAM + IGA + AD admin under one portfolio",
    ],
    products: [
      { model: "One Identity Manager", segment: "Core IGA", role: "Provisioning, requests, certifications, AD lifecycle" },
      { model: "One Identity Safeguard", segment: "PAM", role: "Privileged credential vault and session management" },
      { model: "OneLogin by One Identity", segment: "SSO / Access", role: "Cloud SSO, MFA, and access management" },
      { model: "Active Roles", segment: "AD admin", role: "Privileged AD delegation, change management and reporting" },
      { model: "Starling Connect", segment: "Connectors", role: "Cloud-based connector framework for SaaS application integration" },
    ],
    whyArtiflex:
      "Artiflex IT supports One Identity Manager deployments for UAE customers with existing portfolio relationships, particularly where Safeguard PAM or Active Roles AD admin are already in production. Our team provides honest, vendor-neutral assessment, we will tell you when Saviynt or SailPoint is the stronger strategic pick, and when consolidating around the existing One Identity stack is the right answer.",
    faqs: [
      {
        question: "Should we pick One Identity Manager for a new IGA deployment?",
        answer:
          "Only when you have material One Identity portfolio commitment already, Safeguard PAM, Active Roles, OneLogin SSO. For pure greenfield deployments, Saviynt and SailPoint typically beat One Identity on SaaS-native posture, ERP SoD and certification UX. Existing One Identity customers get good commercial and integration leverage by extending into Identity Manager.",
      },
      {
        question: "Can One Identity govern SAP and Oracle access?",
        answer:
          "Yes via connectors, but without the OOTB SoD rule libraries that Saviynt AAG ships. For ERP-heavy estates with active SoD audit findings, Saviynt or SailPoint Access Risk Management is the safer architectural pick.",
      },
      {
        question: "Is the on-prem-to-hybrid path mature?",
        answer:
          "Yes. One Identity supports phased migration of components to hybrid deployment, and the Starling cloud connector framework extends SaaS application coverage without forcing a full SaaS-IGA move. Useful for sovereign-leaning estates that still need modern cloud connectors.",
      },
    ],
  },

  "ibm-security-igi": {
    slug: "ibm-security-igi",
    name: "IBM Security Verify Governance",
    logo: "/logos/IBM-Security.png",
    tagline: "Compliance-first enterprise IGA with the deepest audit trail and tight integration into the IBM QRadar and Verify ecosystem",
    bestFor: "Challenger · Compliance-First IGA",
    description:
      "IBM Security Verify Governance (the platform formerly known as Identity Governance and Intelligence, or IGI) is an enterprise IGA solution built around audit, certification and Segregation of Duties for heavily regulated estates. Its strongest fit is organisations already aligned to the IBM stack (QRadar SIEM, IBM Security Verify) that need compliance-grade evidence quality, deep on-prem application coverage and mature SoD analytics for SAP and Oracle. For UAE banks, government bodies and large enterprises under NESA, PDPL and CBUAE scrutiny, IGI delivers defensible audit reporting, though its deployment is heavier and its cloud-native cadence trails Saviynt and SailPoint.",
    keyStats: [
      { label: "Heritage", value: "Enterprise IGA, formerly Identity Governance and Intelligence (IGI)" },
      { label: "Ecosystem", value: "Tight QRadar SIEM and IBM Security Verify integration" },
      { label: "Strength", value: "Compliance-grade audit trail and SoD analytics" },
      { label: "Deployment", value: "On-prem heritage, hybrid options available" },
    ],
    whyWinsIntro: {
      label: "IBM Security Verify Governance Highlights",
      title: "The compliance-first IGA for IBM-aligned, heavily regulated UAE estates",
      description:
        "IGI is most compelling when audit evidence quality is the primary buying driver, when SAP or Oracle SoD analytics must be defensible to a regulator, and when the organisation already runs QRadar and IBM Security Verify. For cloud-first estates wanting SaaS-native cadence and converged scope, Saviynt is usually the stronger answer; for the broadest connector library and hybrid maturity, SailPoint remains the safer pick. IGI earns its place where deep compliance reporting and IBM ecosystem alignment outweigh cloud-native pace.",
      stats: [
        { value: "QRadar", label: "native integration feeds identity context into IBM SIEM analytics", tone: "emerald" },
        { value: "SAP / Oracle", label: "mature SoD analytics for the most-audited ERP controls", tone: "violet" },
        { value: "Audit-grade", label: "evidence quality recognised by regulators and external auditors", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Compliance Reporting",
        icon: "file",
        tone: "emerald",
        title: "Best-in-class audit trail and compliance evidence",
        desc: "IGI's reporting and certification evidence is built for regulators and external auditors. For UAE estates under NESA, PDPL and CBUAE scrutiny, the depth and defensibility of its audit trail is genuinely differentiated against lighter-weight platforms.",
      },
      {
        tag: "SoD Analytics",
        icon: "shield",
        tone: "violet",
        title: "Mature Segregation of Duties for SAP and Oracle",
        desc: "IGI ships mature SoD analytics for SAP and Oracle ERP, the single most-audited control under NESA, CBUAE and SOX-style frameworks. Risk modelling and violation detection are core strengths rather than add-ons.",
      },
      {
        tag: "IBM Ecosystem",
        icon: "layers",
        tone: "sky",
        title: "Tight integration with QRadar and IBM Security Verify",
        desc: "Identity context feeds directly into QRadar SIEM analytics and pairs with IBM Security Verify for access management. For estates already standardised on the IBM security stack, this consolidation reduces integration effort and vendor sprawl.",
      },
      {
        tag: "On-Prem Depth",
        icon: "server",
        tone: "amber",
        title: "Deep on-premises and legacy application coverage",
        desc: "IGI's on-prem heritage means strong coverage of legacy and on-premises applications, mainframe and traditional enterprise systems where cloud-native IGAs are still maturing their connector depth.",
      },
      {
        tag: "Certifications",
        icon: "eye",
        tone: "rose",
        title: "Comprehensive access certification campaigns",
        desc: "Compliance-grade certification campaigns with role-based, application-based and entitlement-level review options, designed to produce the documented evidence regulators and auditors expect to see.",
      },
      {
        tag: "Role Management",
        icon: "users",
        tone: "slate",
        title: "Comprehensive role lifecycle and entitlement modelling",
        desc: "Mature role mining, role lifecycle management and entitlement modelling give large, complex estates the structure needed to govern access at scale and reduce certification fatigue over time.",
      },
    ],
    watchOuts: [
      {
        title: "Heavier deployment than cloud-native peers",
        desc: "IGI's on-prem heritage means deployment is heavier and longer than SaaS-native platforms. Infrastructure, upgrade cycles and configuration depth all add to project effort relative to Saviynt or SailPoint Identity Security Cloud.",
      },
      {
        title: "Cloud-native cadence and UX trail the leaders",
        desc: "IGI's cloud evolution, release cadence and end-user experience lag behind cloud-native leaders. For buyers prioritising modern SaaS pace and reviewer UX, Saviynt or SailPoint typically feel more current.",
      },
    ],
    bestFitProfile: [
      "UAE banks, government bodies and large enterprises under NESA, PDPL and CBUAE compliance scrutiny",
      "Organisations already standardised on QRadar SIEM and IBM Security Verify",
      "Estates where audit evidence quality and compliance reporting are the primary IGA buying driver",
      "Heavily regulated banking and government estates with active SAP or Oracle SoD audit requirements",
      "On-premises-heavy environments with significant legacy and mainframe application coverage",
      "Buyers prioritising deep compliance heritage over cloud-native release cadence",
      "Large estates where IBM ecosystem consolidation reduces overall vendor sprawl",
    ],
    products: [
      { model: "IBM Security Verify Governance", segment: "Core IGA", role: "Provisioning, access requests, certifications, lifecycle and reporting" },
      { model: "IBM Security Verify Governance, SoD analytics", segment: "ERP risk", role: "Segregation of Duties analytics for SAP and Oracle ERP estates" },
      { model: "IBM Security Verify (Access Management)", segment: "Access", role: "SSO, MFA and adaptive access, deployed alongside Governance" },
      { model: "IBM QRadar SIEM", segment: "Analytics", role: "Identity context enriches SIEM detection and investigation" },
      { model: "IBM Security Verify Governance, Identity Manager", segment: "Lifecycle", role: "Joiner / Mover / Leaver provisioning across on-prem and hybrid estates" },
    ],
    whyArtiflex:
      "Artiflex IT delivers IBM Security Verify Governance for UAE banks, government and large enterprise customers where compliance evidence quality and IBM ecosystem alignment are decisive. Our team has experience with IGI certification campaigns, SAP and Oracle SoD analytics, and QRadar integration for identity-aware detection. Vendor-neutral sizing is our default starting point: we will tell you when Saviynt's converged SaaS model or SailPoint's connector breadth is the stronger fit for your estate.",
    faqs: [
      {
        question: "Is IBM Security Verify Governance the same as IGI?",
        answer:
          "Yes. IBM Security Verify Governance is the current name for the platform long known as Identity Governance and Intelligence (IGI). The compliance heritage, SoD analytics and certification engine carry forward, now positioned within the broader IBM Security Verify family alongside access management.",
      },
      {
        question: "How does IGI compare to Saviynt and SailPoint?",
        answer:
          "IGI's strength is compliance evidence quality, mature SAP and Oracle SoD analytics, deep on-prem coverage and IBM ecosystem alignment. Saviynt leads on SaaS-native converged scope (IGA + AAG + CIEM + PAM in one licence), and SailPoint leads on connector breadth and hybrid maturity. For IBM-aligned, audit-first estates, IGI is a strong challenger; for cloud-first modernisation, Saviynt or SailPoint usually win.",
      },
      {
        question: "Does IGI integrate with QRadar?",
        answer:
          "Yes. IGI feeds identity and access context into IBM QRadar SIEM, enriching detection and investigation with who-has-access-to-what data. For UAE estates already running QRadar, this native integration is a meaningful reason to keep identity governance inside the IBM ecosystem.",
      },
      {
        question: "Is IGI suitable for UAE compliance requirements?",
        answer:
          "IGI is well-suited to NESA, PDPL and CBUAE compliance scrutiny because audit-grade evidence and certification quality are core to the platform. Its deep on-prem coverage also fits government and banking estates with residency and legacy-system constraints. The trade-off is heavier deployment than cloud-native peers.",
      },
      {
        question: "What does a typical IGI deployment timeline look like?",
        answer:
          "Because of its on-prem heritage, IGI deployments run longer than SaaS-native platforms. A focused first phase (core lifecycle, top applications and a first certification campaign) typically spans several months, with SoD analytics for SAP and Oracle phased in as audit scope demands. Infrastructure and configuration depth drive most of the timeline.",
      },
    ],
    whatIs: {
      eyebrow: "What is IBM Security Verify Governance",
      titlePrefix: "Compliance-first identity governance for the ",
      titleHighlight: "heavily regulated enterprise",
      bodyParagraphs: [
        "IBM Security Verify Governance, formerly Identity Governance and Intelligence (IGI), is an enterprise IGA platform built around audit, certification and Segregation of Duties analytics. It governs who has access to what across on-premises, legacy and hybrid estates, with compliance evidence quality as its central design goal.",
        "For UAE banks, government bodies and large enterprises under NESA, PDPL and CBUAE oversight, IGI answers the auditor's question with defensible evidence: documented certifications, mature SoD violation detection for SAP and Oracle, and identity context that feeds directly into QRadar SIEM. It is the choice when compliance depth and IBM ecosystem alignment outweigh the cloud-native cadence of Saviynt or SailPoint.",
      ],
      feature: {
        titleLine1: "Audit-grade",
        titleLine2: "compliance evidence",
        body: "IGI's certification and reporting engine is built to satisfy regulators and external auditors. Campaigns produce documented, defensible evidence of who reviewed what access, when and why, with mature SAP and Oracle SoD analytics flagging the violations that compliance frameworks most care about.",
      },
      capabilities: [
        "Joiner / Mover / Leaver lifecycle and provisioning",
        "Compliance-grade access certification campaigns",
        "Segregation of Duties analytics for SAP and Oracle",
        "Role mining and entitlement modelling",
        "Deep on-premises and legacy application coverage",
        "QRadar SIEM identity context integration",
        "Self-service access request portal",
        "IBM Security Verify access management pairing",
      ],
    },
  },

  "omada-identity": {
    slug: "omada-identity",
    name: "Omada Identity Cloud",
    tagline: "Cloud-native IGA built on the IdentityPROCESS+ best-practice framework, configurable rather than custom-coded, with strong Microsoft Entra integration",
    bestFor: "Visionary · Best-Practice IGA Framework",
    description:
      "Omada Identity Cloud is a cloud-native IGA platform built around IdentityPROCESS+, a documented best-practice framework that standardises governance processes out of the box. Its approach is configurable rather than custom-coded, which drives faster time-to-value and lower long-term maintenance than heavily customised legacy IGA. With strong Microsoft and Entra integration and a clean SaaS-delivered experience, Omada fits mid-to-large UAE enterprises that want standardised, audit-ready governance without the complexity and cost of the largest enterprise platforms. Its regional brand presence and ecosystem are narrower than SailPoint or Saviynt.",
    keyStats: [
      { label: "Deployment", value: "Cloud-native SaaS IGA" },
      { label: "Framework", value: "IdentityPROCESS+ best-practice process library" },
      { label: "Approach", value: "Configurable, not custom-coded" },
      { label: "Integration", value: "Strong Microsoft and Entra alignment" },
    ],
    whyWinsIntro: {
      label: "Omada Identity Cloud Highlights",
      title: "Standardised, best-practice IGA for mid-to-large Microsoft-aligned estates",
      description:
        "Omada is most compelling when an organisation wants standardised governance fast, prefers configuration over custom code, and runs a Microsoft and Entra-centric estate. The IdentityPROCESS+ framework shortcuts the design phase by shipping documented best-practice processes that teams adopt rather than invent. For the broadest connector coverage and largest regional install base, SailPoint or Saviynt lead; for best-practice-driven time-to-value in mid-to-large estates, Omada is a strong visionary pick.",
      stats: [
        { value: "IdentityPROCESS+", label: "documented best-practice processes adopted out of the box", tone: "emerald" },
        { value: "Configurable", label: "governance delivered through configuration, not custom code", tone: "violet" },
        { value: "Entra", label: "strong Microsoft and Entra integration for the modern estate", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Best-Practice Framework",
        icon: "list",
        tone: "emerald",
        title: "IdentityPROCESS+ standardises governance out of the box",
        desc: "Omada ships IdentityPROCESS+, a documented library of best-practice identity governance processes. Teams adopt proven processes rather than designing them from scratch, which shortens the design phase and produces audit-ready governance faster.",
      },
      {
        tag: "Time-to-Value",
        icon: "activity",
        tone: "violet",
        title: "Fast time-to-value through configuration",
        desc: "Because Omada is configurable rather than custom-coded, deployments reach productive governance faster and avoid the heavy custom-development debt that legacy IGA platforms accumulate over time.",
      },
      {
        tag: "Microsoft / Entra",
        icon: "layers",
        tone: "sky",
        title: "Strong Microsoft and Entra integration",
        desc: "Omada integrates closely with the Microsoft estate and Entra ID, making it a natural governance layer for mid-to-large enterprises standardised on Microsoft for identity and productivity.",
      },
      {
        tag: "Cloud-Native SaaS",
        icon: "globe",
        tone: "amber",
        title: "SaaS-delivered with a clean modern experience",
        desc: "A cloud-native SaaS platform with a modern, well-designed user and reviewer experience, delivered without the infrastructure burden of on-prem legacy IGA.",
      },
      {
        tag: "Compliance Fit",
        icon: "shield",
        tone: "rose",
        title: "Audit-ready governance and access certification",
        desc: "Strong access certification, GDPR and compliance capabilities, with the standardised processes that make audit campaigns repeatable and defensible for mid-to-large regulated estates.",
      },
      {
        tag: "Lower Maintenance",
        icon: "sliders",
        tone: "slate",
        title: "Configurable model reduces long-term maintenance",
        desc: "Configuration over custom code means upgrades and process changes are less brittle than heavily customised IGA, lowering the long-term operational burden on identity teams.",
      },
    ],
    watchOuts: [
      {
        title: "Smaller regional brand and install base than SailPoint or Saviynt",
        desc: "Omada's market presence and brand recognition in the region are smaller than SailPoint and Saviynt. Procurement and audit teams may be less familiar with the platform, and the local reference base is narrower.",
      },
      {
        title: "Narrower ecosystem and connector breadth",
        desc: "Omada's partner ecosystem and connector library are narrower than the largest enterprise platforms. For estates with very broad or unusual application footprints, SailPoint's connector breadth or Saviynt's converged scope may be the safer fit.",
      },
    ],
    bestFitProfile: [
      "Mid-to-large UAE enterprises wanting standardised, best-practice governance fast",
      "Microsoft and Entra-centric estates seeking a well-integrated cloud-native IGA layer",
      "Organisations that prefer configuration over custom-coded IGA and lower maintenance debt",
      "Buyers prioritising fast time-to-value and audit-ready certification over maximum connector breadth",
      "Regulated mid-market and enterprise estates needing repeatable, defensible compliance campaigns",
      "Teams adopting a documented best-practice process framework rather than designing governance from scratch",
      "Estates where SaaS-native delivery and a clean reviewer experience are buying priorities",
    ],
    products: [
      { model: "Omada Identity Cloud", segment: "Core IGA", role: "Cloud-native provisioning, access requests, certifications and lifecycle" },
      { model: "IdentityPROCESS+", segment: "Framework", role: "Best-practice process library standardising governance out of the box" },
      { model: "Omada Identity Cloud, Access Certification", segment: "Compliance", role: "Repeatable, audit-ready access review and certification campaigns" },
      { model: "Omada Identity Cloud, Microsoft / Entra integration", segment: "Connectors", role: "Strong governance integration across the Microsoft and Entra estate" },
      { model: "Omada Identity Cloud, Role and Policy Management", segment: "Roles", role: "Role lifecycle, policy and entitlement modelling through configuration" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Omada Identity Cloud for mid-to-large UAE enterprises that want standardised, best-practice governance with fast time-to-value, particularly across Microsoft and Entra-centric estates. Our team works with the IdentityPROCESS+ framework and Omada's configurable model to keep deployments clean and low-maintenance. Vendor-neutral sizing is our default starting point: we will tell you when SailPoint's connector breadth or Saviynt's converged SaaS scope is the stronger fit.",
    faqs: [
      {
        question: "What is IdentityPROCESS+ and why does it matter?",
        answer:
          "IdentityPROCESS+ is Omada's documented library of best-practice identity governance processes. Instead of designing governance workflows from scratch, teams adopt proven processes out of the box. This shortens the design phase, reduces project risk and produces standardised, audit-ready governance faster than a custom-built approach.",
      },
      {
        question: "How does Omada compare to SailPoint and Saviynt?",
        answer:
          "Omada leads on best-practice-driven time-to-value, a configurable (not custom-coded) model and strong Microsoft and Entra integration for mid-to-large estates. SailPoint leads on connector breadth and hybrid maturity, and Saviynt on SaaS-native converged scope (IGA + AAG + CIEM + PAM). Omada's regional brand and ecosystem are narrower, so the largest or most unusual estates often shortlist SailPoint or Saviynt first.",
      },
      {
        question: "Is Omada configurable or custom-coded?",
        answer:
          "Omada is configurable rather than custom-coded. Governance processes are delivered through configuration on top of the IdentityPROCESS+ framework, which lowers long-term maintenance and makes upgrades less brittle than heavily customised legacy IGA platforms.",
      },
      {
        question: "Does Omada fit a Microsoft-centric estate?",
        answer:
          "Yes. Omada has strong Microsoft and Entra integration, making it a natural cloud-native governance layer for mid-to-large enterprises standardised on Microsoft. It complements Entra ID Governance where deeper, vendor-neutral IGA scope and standardised certification campaigns are required.",
      },
      {
        question: "What size of organisation is Omada best suited to?",
        answer:
          "Omada fits mid-to-large enterprises that want standardised, audit-ready governance without the complexity and cost of the largest enterprise platforms. Very large or highly unusual application estates may still favour SailPoint's connector breadth or Saviynt's converged platform, but for best-practice-driven mid-to-large estates Omada is a strong visionary choice.",
      },
    ],
    whatIs: {
      eyebrow: "What is Omada Identity Cloud",
      titlePrefix: "Best-practice identity governance for the ",
      titleHighlight: "modern mid-to-large enterprise",
      bodyParagraphs: [
        "Omada Identity Cloud is a cloud-native IGA platform built around IdentityPROCESS+, a documented best-practice framework that standardises governance processes out of the box. It is configurable rather than custom-coded, so organisations adopt proven processes instead of building and maintaining bespoke workflows.",
        "For mid-to-large UAE enterprises, particularly Microsoft and Entra-centric estates, this means faster time-to-value, repeatable audit-ready certification campaigns and lower long-term maintenance. Omada is the choice when standardised best-practice governance and a clean SaaS experience matter more than the maximum connector breadth of SailPoint or the converged scope of Saviynt.",
      ],
      feature: {
        titleLine1: "IdentityPROCESS+",
        titleLine2: "best-practice framework",
        body: "IdentityPROCESS+ ships a documented library of proven identity governance processes. Teams configure and adopt them rather than designing governance from scratch, which shortens deployment, reduces project risk and produces standardised, defensible audit campaigns from day one.",
      },
      capabilities: [
        "Joiner / Mover / Leaver lifecycle and provisioning",
        "IdentityPROCESS+ best-practice process library",
        "Repeatable, audit-ready access certification campaigns",
        "Role lifecycle and entitlement modelling through configuration",
        "Strong Microsoft and Entra integration",
        "Cloud-native SaaS delivery and reviewer experience",
        "Self-service access request portal",
        "GDPR and compliance-aligned reporting",
      ],
    },
  },
};
