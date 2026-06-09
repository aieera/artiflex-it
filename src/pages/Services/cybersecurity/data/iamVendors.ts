export type IamVendor = {
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

export const iamVendors: Record<string, IamVendor> = {
  "microsoft-entra": {
    slug: "microsoft-entra",
    name: "Microsoft Entra ID",
    logo: "/logos/microsoft.svg",
    tagline: "The dominant enterprise IAM platform, bundled into Microsoft 365, with the deepest Active Directory integration and a market-leading Conditional Access engine",
    bestFor: "Leader, M365 Estates · Recommended",
    description:
      "Microsoft Entra ID (formerly Azure AD) is the default identity provider for any organisation already running Microsoft 365 or Azure. It ships with every M365 subscription, delivers the deepest Active Directory and hybrid-join integration on the market, and pairs a market-leading Conditional Access policy engine with Entra Permissions Management for multi-cloud entitlements. For UAE ministries and enterprises on E5 or G5 contracts, Entra ID is the lowest-friction, lowest-incremental-cost path to enterprise SSO, MFA, passwordless, conditional access and identity governance across the Microsoft estate.",
    keyStats: [
      { label: "Heritage", value: "2014 Azure AD, bundled in Microsoft 365" },
      { label: "Conditional Access", value: "Best-in-class policy engine" },
      { label: "Passwordless", value: "Windows Hello + Passkeys native" },
      { label: "Best for", value: "Microsoft 365 / Azure estates on E5 / G5" },
    ],
    whyWinsIntro: {
      label: "Microsoft Entra ID Highlights",
      title: "The default identity control plane for Microsoft-aligned UAE estates",
      description:
        "Entra ID is most compelling when the estate is already standardised on M365, Teams, SharePoint and Azure, and when the buying team wants enterprise SSO, MFA and conditional access without procuring a separate identity vendor. For deeply heterogeneous multi-cloud estates, Okta is often the more neutral answer, and for serious privileged access, Entra PIM should be paired with CyberArk or BeyondTrust.",
      stats: [
        { value: "99.9%", label: "of automated account-compromise attacks blocked by enforced MFA", tone: "emerald" },
        { value: "Largest", label: "enterprise IAM by installed base, native to the M365 estate", tone: "violet" },
        { value: "0", label: "incremental licence cost when Entra ID P1 / P2 is already on the E5 contract", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "M365 Native",
        icon: "layers",
        tone: "emerald",
        title: "Deepest integration with the Microsoft estate",
        desc: "Native to Microsoft 365, Teams, SharePoint, Dynamics, Defender and Azure RBAC. SSO and provisioning sit closer to the source than any third-party IAM can, with the strongest Active Directory and hybrid-join story on the market.",
      },
      {
        tag: "Conditional Access",
        icon: "shield",
        tone: "violet",
        title: "Market-leading Conditional Access policy engine",
        desc: "Risk-based, signal-driven access policies that combine device health, location, user risk and session controls. The most mature conditional access engine of any IAM platform and the heart of a Microsoft Zero Trust rollout.",
      },
      {
        tag: "Passwordless",
        icon: "lock",
        tone: "sky",
        title: "Windows Hello, Passkeys and phishing-resistant MFA",
        desc: "Authenticator, Windows Hello for Business and FIDO2 passkeys deliver phishing-resistant, passwordless sign-in across the workforce, with adaptive MFA backed by Identity Protection risk signals.",
      },
      {
        tag: "Permissions Mgmt",
        icon: "eye",
        tone: "amber",
        title: "Entra Permissions Management for multi-cloud CIEM",
        desc: "Discovers and right-sizes excessive permissions across Azure, AWS and GCP from one console, closing the cloud-entitlement gap that other access-management tools leave open.",
      },
      {
        tag: "Lifecycle",
        icon: "list",
        tone: "rose",
        title: "Native joiner / mover / leaver with Workday and SCIM",
        desc: "Entra Provisioning and Lifecycle Workflows trigger on HR attribute changes from Workday, SuccessFactors or SAP HCM and orchestrate provisioning and deprovisioning across connected SaaS via SCIM 2.0.",
      },
      {
        tag: "Governance",
        icon: "activity",
        tone: "slate",
        title: "Entra ID Governance for access reviews and packages",
        desc: "Entitlement management, access packages and access reviews cover Azure roles, Entra groups and M365 membership, with Copilot-driven recommendations. Delivered as a separate SKU layered on Entra ID P2.",
      },
    ],
    watchOuts: [
      {
        title: "Complexity for non-Microsoft environments",
        desc: "Entra is at its best inside the Microsoft estate. For heterogeneous multi-cloud and multi-SaaS environments with deep non-Microsoft application coverage, Okta's connector breadth typically delivers faster, cleaner integration.",
      },
      {
        title: "PAM and advanced governance are not bundled",
        desc: "Entra PIM provides basic just-in-time elevation but is not a full PAM, so CyberArk or BeyondTrust is the usual pairing. Advanced governance is a separate SKU (Entra ID Governance) layered on Entra ID P2.",
      },
    ],
    bestFitProfile: [
      "UAE ministries and enterprises already on Microsoft 365 E5 or G5 contracts",
      "Microsoft-centric estates (M365, Azure, Teams, Dynamics) with limited non-Microsoft SaaS scope",
      "Organisations standardising enterprise SSO, MFA and conditional access on one stack",
      "Buyers prioritising native Active Directory and hybrid-join lifecycle over multi-vendor neutrality",
      "Estates rolling out passwordless and phishing-resistant authentication with Windows Hello and passkeys",
      "Customers wanting multi-cloud CIEM (Azure, AWS, GCP) via Entra Permissions Management",
      "NESA, PDPL and CBUAE-regulated bodies wanting identity controls inside their existing Microsoft tenancy",
    ],
    products: [
      { model: "Microsoft Entra ID P1", segment: "Access Mgmt", role: "SSO, MFA, Conditional Access, self-service password reset for the workforce" },
      { model: "Microsoft Entra ID P2", segment: "Identity premium", role: "Identity Protection risk signals, PIM, prerequisite for governance features" },
      { model: "Microsoft Entra ID Governance", segment: "IGA", role: "Entitlement management, access packages, access reviews, lifecycle workflows" },
      { model: "Microsoft Entra Permissions Management", segment: "CIEM", role: "Multi-cloud entitlement right-sizing across Azure, AWS and GCP" },
      { model: "Microsoft Entra Suite", segment: "Bundle", role: "Governance, Internet Access, Private Access and Verified ID for non-E5 buyers" },
    ],
    whyArtiflex:
      "Artiflex IT designs, deploys and manages Microsoft Entra ID across UAE government and enterprise estates already invested in M365 E5 and G5. Our team configures Conditional Access, passwordless rollouts with Windows Hello and passkeys, Entra Provisioning from Workday and SAP HCM, and Entra ID Governance access reviews aligned to NESA, PDPL and CBUAE control expectations. Vendor-neutral sizing is our default starting point: we will tell you when Okta, Ping or a dedicated PAM such as CyberArk is the stronger fit for part of your scope.",
    faqs: [
      {
        question: "Is Microsoft Entra ID included in our Microsoft 365 licence?",
        answer:
          "A baseline of Entra ID is included in every Microsoft 365 subscription, and the premium controls (Conditional Access, Identity Protection, PIM) come with Entra ID P1 and P2, which are bundled inside Microsoft 365 E5 and G5. If you are on E3 or Business Premium, you step up to Entra ID P1 / P2 or the Entra Suite to unlock the full feature set.",
      },
      {
        question: "How does Entra ID compare to Okta?",
        answer:
          "Entra ID is the default pick when you are already Microsoft-aligned: bundled licensing, the deepest Active Directory integration, and the strongest Conditional Access engine. Okta is the more neutral choice for heterogeneous multi-cloud and multi-SaaS estates where a 7,000-plus connector catalogue and vendor neutrality matter more than Microsoft-native depth.",
      },
      {
        question: "Does Entra ID handle privileged access management?",
        answer:
          "Entra Privileged Identity Management provides just-in-time elevation for Azure and Entra administrative roles, which is a strong native control for cloud admin scopes. It is not a full PAM, so for credential vaulting, session recording and Windows / Linux server privilege at scale we pair Entra with CyberArk or BeyondTrust.",
      },
      {
        question: "Is Entra ID suitable for UAE compliance requirements?",
        answer:
          "Yes. Entra ID is native to UAE M365 tenancies and supports NESA, PDPL and CBUAE control expectations through Conditional Access, access reviews, lifecycle workflows and detailed sign-in and audit logging. For ERP Segregation of Duties or sovereign on-prem governance, we layer Saviynt or SailPoint on top of the Entra foundation.",
      },
      {
        question: "Can Entra govern access to non-Microsoft applications?",
        answer:
          "Yes, through enterprise app gallery integrations, SAML / OIDC federation and SCIM provisioning, Entra extends SSO and lifecycle to thousands of third-party SaaS applications. For the deepest non-Microsoft connector breadth or specialist legacy systems, Okta or Ping often integrate faster, and many UAE estates run Entra for the Microsoft core and a second platform for the long tail.",
      },
    ],
  },

  okta: {
    slug: "okta",
    name: "Okta",
    logo: "/logos/Okta.png",
    tagline: "The vendor-neutral, cloud-native IAM platform with 7,000+ pre-built integrations and the strongest combined workforce plus customer identity coverage",
    bestFor: "Leader, Vendor-Neutral · Recommended",
    description:
      "Okta is the cloud-native identity platform of choice for organisations with diverse, multi-cloud, multi-SaaS environments. With more than 7,000 pre-built application integrations, the fastest SaaS time-to-value in the category, and the Auth0 developer platform for customer identity, Okta is the pragmatic neutral-ground pick where you cannot bet the estate on a single cloud provider. For UAE enterprises running a heterogeneous mix of Microsoft, Google, AWS and best-of-breed SaaS, Okta delivers workforce and customer IAM on one platform without locking you into any one vendor's stack.",
    keyStats: [
      { label: "Heritage", value: "2009 cloud-native, Auth0 acquired 2021" },
      { label: "Integrations", value: "7,000+ pre-built application connectors" },
      { label: "Coverage", value: "Workforce IAM + Customer IAM (Auth0)" },
      { label: "Best for", value: "Multi-cloud, multi-SaaS, vendor-neutral estates" },
    ],
    whyWinsIntro: {
      label: "Okta Highlights",
      title: "The neutral identity layer for heterogeneous, multi-cloud UAE estates",
      description:
        "Okta is most compelling when no single cloud dominates the estate and the buying team wants a vendor-neutral identity fabric spanning Microsoft, Google, AWS and best-of-breed SaaS. For deeply Microsoft-aligned estates on E5, Entra ID is usually the better-value answer, and for heavy privileged access Okta is typically paired with CyberArk or Delinea.",
      stats: [
        { value: "7,000+", label: "pre-built application integrations in the Okta Integration Network", tone: "emerald" },
        { value: "4-8 wks", label: "typical workforce SSO and MFA rollout on a mid-sized estate", tone: "violet" },
        { value: "2-in-1", label: "workforce and customer identity on one platform with Auth0", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Connector breadth",
        icon: "globe",
        tone: "emerald",
        title: "7,000+ pre-built application integrations",
        desc: "The Okta Integration Network is the largest pre-built SaaS catalogue in IAM, covering virtually every mainstream cloud application. This breadth is decisive for heterogeneous estates and removes most day-one custom integration work.",
      },
      {
        tag: "Vendor-neutral",
        icon: "layers",
        tone: "violet",
        title: "Cloud-agnostic identity fabric",
        desc: "Okta sits above Microsoft, Google, AWS and on-prem sources as a neutral identity layer. The pragmatic choice when procurement requires vendor neutrality and the estate cannot be tied to one cloud provider's identity stack.",
      },
      {
        tag: "Developer-first",
        icon: "sliders",
        tone: "sky",
        title: "Auth0 customer identity and developer platform",
        desc: "Auth0 brings a best-in-class developer experience for customer-facing identity (CIAM), with flexible flows, extensibility and APIs that engineering teams adopt quickly for digital products.",
      },
      {
        tag: "Adaptive MFA",
        icon: "lock",
        tone: "amber",
        title: "Adaptive MFA, FastPass and WebAuthn passwordless",
        desc: "Adaptive multi-factor authentication with Okta Verify, FastPass and WebAuthn delivers phishing-resistant, passwordless sign-in driven by contextual and device-risk signals.",
      },
      {
        tag: "Lifecycle",
        icon: "list",
        tone: "rose",
        title: "Lifecycle Management with SCIM 2.0 provisioning",
        desc: "Universal Directory plus Lifecycle Management automate joiner / mover / leaver provisioning across the SaaS estate over SCIM 2.0, with HR-driven sourcing from Workday and similar systems.",
      },
      {
        tag: "Threat protection",
        icon: "activity",
        tone: "slate",
        title: "Identity Threat Protection and risk signals",
        desc: "Identity Threat Protection continuously evaluates session risk and can revoke access in-session, extending Zero Trust beyond the point of login across the connected estate.",
      },
    ],
    watchOuts: [
      {
        title: "Licensing costs add up at scale",
        desc: "Okta's premium per-user pricing across multiple SKUs can climb quickly for large estates. Buyers already on Microsoft 365 E5 should weigh Okta against Entra ID, which is bundled in the existing licence.",
      },
      {
        title: "On-prem depth and the 2022 breach concern",
        desc: "On-premises capabilities are more limited than Entra for Active Directory-heavy estates, and the 2022 Lapsus$ incident still surfaces as a reputational consideration in some regulated tenders, which we address directly during evaluation.",
      },
    ],
    bestFitProfile: [
      "UAE enterprises with heterogeneous multi-cloud and multi-SaaS environments",
      "Organisations whose procurement requires vendor neutrality across cloud providers",
      "Estates needing the broadest pre-built SaaS connector catalogue out of the box",
      "Businesses delivering customer-facing digital products that need CIAM via Auth0",
      "Teams prioritising the fastest workforce SSO and MFA time-to-value",
      "Buyers standardising passwordless sign-in with FastPass and WebAuthn",
      "Organisations wanting workforce and customer identity unified on a single platform",
    ],
    products: [
      { model: "Okta Single Sign-On", segment: "Access Mgmt", role: "Universal SSO across 7,000+ pre-built application integrations" },
      { model: "Okta Adaptive MFA", segment: "Authentication", role: "Adaptive multi-factor, FastPass and WebAuthn passwordless sign-in" },
      { model: "Okta Lifecycle Management", segment: "Provisioning", role: "Automated joiner / mover / leaver provisioning over SCIM 2.0" },
      { model: "Okta Identity Governance", segment: "IGA", role: "Access requests, access certification and reporting for the workforce" },
      { model: "Auth0 by Okta", segment: "CIAM", role: "Developer-first customer identity for digital products and APIs" },
    ],
    whyArtiflex:
      "Artiflex IT deploys Okta across heterogeneous UAE estates where no single cloud dominates, configuring workforce SSO, adaptive MFA, FastPass passwordless, Lifecycle Management over SCIM and Auth0 customer identity for digital products. Our team aligns Okta rollouts to NESA, PDPL and CBUAE reporting expectations and integrates Okta with CyberArk or Delinea where privileged access is in scope. Vendor-neutral sizing is our default: we will tell you when Entra ID's bundled economics or Ping's federation depth is the better fit.",
    faqs: [
      {
        question: "When is Okta the right choice over Microsoft Entra ID?",
        answer:
          "Okta wins when the estate is genuinely heterogeneous: multiple clouds, a large best-of-breed SaaS footprint, and a procurement preference for vendor neutrality. Entra ID tends to win when you are already Microsoft-aligned on E5 or G5, where its bundled licensing and Active Directory depth are hard to beat on value.",
      },
      {
        question: "What does the Auth0 acquisition add to Okta?",
        answer:
          "Auth0 brings a developer-first customer identity (CIAM) platform alongside Okta's workforce IAM, so you can run workforce and customer identity on one vendor. Auth0 is particularly strong for engineering teams building authentication into customer-facing apps and APIs with flexible, extensible flows.",
      },
      {
        question: "How quickly can we roll out Okta SSO and MFA?",
        answer:
          "For a mid-sized estate, workforce SSO and adaptive MFA typically reach production in 4 to 8 weeks thanks to the pre-built Integration Network. Identity governance and customer identity programmes run longer because of certification design and application-specific flows.",
      },
      {
        question: "Does Okta handle privileged access management?",
        answer:
          "Okta secures access to privileged consoles and is strengthening its privileged offering, but for credential vaulting, session recording and server-level privilege at scale, deep PAM is partner-led. Many UAE Okta estates pair Okta for workforce identity with CyberArk or Delinea for PAM.",
      },
      {
        question: "Is Okta suitable for regulated UAE environments?",
        answer:
          "Yes. Okta provides strong audit, reporting and access-certification capabilities that map to NESA, PDPL and CBUAE expectations. For tenders that require on-prem sovereign deployment or where the 2022 incident is raised, we address those points directly and, where relevant, propose Ping or Entra as alternatives.",
      },
    ],
  },

  "ping-identity": {
    slug: "ping-identity",
    name: "Ping Identity",
    logo: "/logos/pingidentity.png",
    tagline: "The enterprise federation specialist with the deepest protocol support and workforce plus customer identity on one hybrid-flexible platform",
    bestFor: "Leader, Hybrid + CIAM · Recommended",
    description:
      "Ping Identity is the enterprise federation specialist, with the deepest protocol support in the category across SAML, OAuth, OIDC, FIDO2 and FAPI. The ForgeRock acquisition adds open-source credibility and a mature customer identity stack, while Ping's hybrid deployment flexibility makes it a strong fit for regulated industries that cannot run identity in pure SaaS. For UAE banks, telcos and healthcare providers needing workforce and customer (CIAM) identity on one platform with open-banking-grade federation, Ping is the right pick.",
    keyStats: [
      { label: "Heritage", value: "2002 federation specialist, ForgeRock 2023" },
      { label: "Protocols", value: "SAML, OAuth, OIDC, FIDO2, FAPI" },
      { label: "Deployment", value: "Hybrid and on-prem options" },
      { label: "Best for", value: "Banking, telco, workforce + customer IAM" },
    ],
    whyWinsIntro: {
      label: "Ping Identity Highlights",
      title: "Federation depth and hybrid flexibility for regulated UAE estates",
      description:
        "Ping is most compelling when federation depth, hybrid deployment and combined workforce plus customer identity are decisive, especially in banking, telco and healthcare. For pure SaaS-first multi-cloud estates Okta is often simpler, and for Microsoft-aligned estates on E5 Entra ID is usually better value.",
      stats: [
        { value: "FAPI", label: "open-banking-grade financial API security profile support", tone: "emerald" },
        { value: "2-in-1", label: "workforce and customer identity unified on one platform", tone: "violet" },
        { value: "Hybrid", label: "on-prem, private cloud and SaaS deployment flexibility", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Federation depth",
        icon: "globe",
        tone: "emerald",
        title: "Deepest protocol support in the category",
        desc: "SAML, OAuth, OIDC, FIDO2 and FAPI support is the most comprehensive among IAM vendors, making Ping the specialist of choice for complex federation, B2B trust and open-banking scenarios.",
      },
      {
        tag: "Hybrid",
        icon: "server",
        tone: "violet",
        title: "Hybrid and on-prem deployment flexibility",
        desc: "Ping runs in SaaS, private cloud or on-prem, which matters in regulated industries and sovereign-leaning estates that cannot consume identity purely as a public cloud service.",
      },
      {
        tag: "CIAM",
        icon: "users",
        tone: "sky",
        title: "PingOne CIAM for high-scale customer identity",
        desc: "Mature customer identity with high-scale registration, progressive profiling and orchestration, strengthened by the ForgeRock acquisition for demanding consumer-facing programmes.",
      },
      {
        tag: "Risk signals",
        icon: "activity",
        tone: "amber",
        title: "PingOne Protect adaptive risk and threat signals",
        desc: "PingOne Protect aggregates device, behaviour and threat signals to drive adaptive authentication and continuous, risk-aware access decisions across workforce and customer journeys.",
      },
      {
        tag: "Passwordless",
        icon: "lock",
        tone: "rose",
        title: "PingID passwordless and FIDO2 authentication",
        desc: "PingID delivers passwordless and phishing-resistant FIDO2 authentication with strong biometric options, suited to high-assurance workforce and customer use cases.",
      },
      {
        tag: "Orchestration",
        icon: "sliders",
        tone: "slate",
        title: "DaVinci no-code identity orchestration",
        desc: "PingOne DaVinci provides drag-and-drop identity orchestration to compose authentication, fraud and verification flows across vendors without heavy custom development.",
      },
    ],
    watchOuts: [
      {
        title: "Higher implementation complexity than Okta",
        desc: "Ping's depth and flexibility come with greater configuration complexity. It rewards mature identity teams and experienced delivery partners more than a fast SaaS-first rollout would.",
      },
      {
        title: "Ping and ForgeRock integration still maturing",
        desc: "The brand and product integration between Ping and ForgeRock is still consolidating. We map the right product line to your use case so you adopt the converged roadmap rather than a soon-to-be-legacy path.",
      },
    ],
    bestFitProfile: [
      "UAE banks, telcos and healthcare providers in heavily regulated environments",
      "Organisations needing the deepest federation protocol support, including FAPI for open banking",
      "Estates that require hybrid or on-prem identity deployment rather than pure SaaS",
      "Businesses running both workforce and large-scale customer identity on one platform",
      "Teams needing no-code identity orchestration across multiple authentication and fraud vendors",
      "High-assurance use cases standardising on passwordless and FIDO2 with PingID",
      "Buyers prioritising federation and CIAM depth over fastest-possible SaaS time-to-value",
    ],
    products: [
      { model: "PingOne for Workforce", segment: "Access Mgmt", role: "Workforce SSO, MFA and access with deep federation protocol support" },
      { model: "PingOne for Customers (CIAM)", segment: "CIAM", role: "High-scale customer registration, authentication and profiling" },
      { model: "PingID", segment: "Authentication", role: "Passwordless and FIDO2 multi-factor authentication" },
      { model: "PingOne Protect", segment: "Threat protection", role: "Adaptive risk and fraud signals for continuous, risk-aware access" },
      { model: "PingOne DaVinci", segment: "Orchestration", role: "No-code identity orchestration across authentication and verification flows" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Ping Identity for UAE banks, telcos and healthcare providers that need deep federation, hybrid deployment and combined workforce plus customer identity. Our team implements PingOne for Workforce and Customers, PingID passwordless, PingOne Protect risk signals and DaVinci orchestration, mapped to NESA, PDPL, CBUAE and open-banking control requirements. Vendor-neutral sizing is our default: we will tell you when Okta's simpler SaaS rollout or Entra ID's bundled economics is the stronger fit for your scope.",
    faqs: [
      {
        question: "When should we choose Ping Identity over Okta?",
        answer:
          "Choose Ping when federation depth, hybrid or on-prem deployment, and combined workforce plus customer identity are decisive, which is common in banking, telco and healthcare. Okta tends to win where a fast SaaS-first rollout, the broadest pre-built SaaS catalogue and vendor neutrality matter more than deep federation and hybrid flexibility.",
      },
      {
        question: "What did the ForgeRock acquisition bring to Ping?",
        answer:
          "ForgeRock added a mature, high-scale customer identity stack and open-source credibility, strengthening Ping's CIAM and access-management depth. The combined roadmap is still consolidating, so we map your use case to the right converged product line during design rather than to a path that will be deprecated.",
      },
      {
        question: "Does Ping support open banking and FAPI?",
        answer:
          "Yes. Ping's support for the FAPI financial-grade API security profile, alongside SAML, OAuth, OIDC and FIDO2, makes it a strong fit for open-banking and high-assurance financial-services scenarios that regulators and partners increasingly require.",
      },
      {
        question: "Can Ping be deployed on-premises for sovereign requirements?",
        answer:
          "Yes. Ping offers SaaS, private cloud and on-prem deployment, which suits UAE regulated and sovereign-leaning estates that cannot consume identity purely as a public cloud service. We size the deployment model against your residency and audit obligations under NESA, PDPL and CBUAE.",
      },
      {
        question: "Is Ping harder to implement than other platforms?",
        answer:
          "Ping's depth and flexibility do carry more configuration complexity than a SaaS-first platform. It rewards mature identity teams and an experienced delivery partner. Our team takes on that complexity and uses DaVinci orchestration to reduce custom development across your authentication and verification flows.",
      },
    ],
  },

  "ibm-security": {
    slug: "ibm-security",
    name: "IBM Security IAM",
    logo: "/logos/IBM-Security.png",
    tagline: "The compliance-first IAM platform with the deepest audit trail and the tightest integration into QRadar SIEM and the broader IBM security ecosystem",
    bestFor: "Leader, Compliance-First · Recommended",
    description:
      "IBM Security IAM (Verify and Identity Governance) is a compliance-first identity platform with the deepest audit-trail capabilities in the category and tight integration into QRadar SIEM and IBM's broader security ecosystem. It is the preferred choice for government, banking and other heavy-compliance environments where audit depth, on-prem heritage and end-to-end security integration outweigh cloud-native pace. For UAE government and financial-services estates with demanding regulators, IBM Security delivers governance and access management built around evidence and accountability.",
    keyStats: [
      { label: "Heritage", value: "Deep enterprise security ecosystem since 1995" },
      { label: "Audit", value: "Deepest compliance and audit trail" },
      { label: "Integration", value: "Native QRadar SIEM and ecosystem fit" },
      { label: "Best for", value: "Government, banking, heavy-compliance estates" },
    ],
    whyWinsIntro: {
      label: "IBM Security IAM Highlights",
      title: "Compliance-first identity for government and financial-services UAE estates",
      description:
        "IBM Security is most compelling when audit depth, on-prem heritage and end-to-end security integration are decisive, especially in government and banking. For cloud-first SaaS estates Okta or Entra ID usually move faster, but where the regulator demands evidence and accountability above all, IBM's audit-grade governance is hard to match.",
      stats: [
        { value: "Audit-deep", label: "the deepest compliance and audit trail among IAM platforms", tone: "emerald" },
        { value: "QRadar", label: "native integration with IBM QRadar SIEM and the security ecosystem", tone: "violet" },
        { value: "On-prem", label: "deep on-prem heritage for sovereign and air-gap-adjacent estates", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Audit depth",
        icon: "file",
        tone: "emerald",
        title: "Deepest compliance and audit-trail capabilities",
        desc: "IBM Identity Governance produces the audit-grade evidence regulators expect, with granular certification, recertification and reporting built around accountability. The strongest fit where the audit trail is the primary buying driver.",
      },
      {
        tag: "SIEM integration",
        icon: "eye",
        tone: "violet",
        title: "Native integration with QRadar and IBM security ecosystem",
        desc: "Tight integration with QRadar SIEM and the wider IBM security portfolio links identity events to threat detection and response, giving SOC teams identity context other IAM platforms cannot match natively.",
      },
      {
        tag: "Governance",
        icon: "activity",
        tone: "sky",
        title: "Mature IGA with certification and recertification",
        desc: "Long-established identity governance covers access requests, certification campaigns, role management and segregation-of-duties policy, with the audit posture demanded by government and banking regulators.",
      },
      {
        tag: "On-prem heritage",
        icon: "server",
        tone: "amber",
        title: "Deep on-prem and hybrid deployment heritage",
        desc: "IBM's on-prem and hybrid heritage suits sovereign and air-gap-adjacent estates that cannot consume identity as pure SaaS, with reference architectures recognised by procurement and audit teams.",
      },
      {
        tag: "Verify",
        icon: "lock",
        tone: "rose",
        title: "IBM Verify with risk-based MFA and access",
        desc: "IBM Verify delivers adaptive, risk-scored multi-factor authentication and access management, with passwordless options maturing across the workforce.",
      },
      {
        tag: "Trusteer",
        icon: "shield",
        tone: "slate",
        title: "Adaptive access enriched with Trusteer fraud signals",
        desc: "Integration with Trusteer fraud intelligence enriches adaptive access decisions with device and threat signals, valuable in banking and high-fraud-risk customer journeys.",
      },
    ],
    watchOuts: [
      {
        title: "Slower cloud-native evolution",
        desc: "IBM Security's cloud-native pace lags Okta and Microsoft. For SaaS-first estates that want the fastest modern rollout and UX, the cloud-native leaders are usually a better fit.",
      },
      {
        title: "Higher TCO and dated user experience",
        desc: "Total cost of ownership sits at the premium enterprise tier, and the admin and end-user experience trails modern cloud platforms. We scope this honestly so it is weighed against the audit-depth advantage.",
      },
    ],
    bestFitProfile: [
      "UAE government bodies and ministries with demanding audit and accountability requirements",
      "Banking and financial-services estates where the audit trail is the primary buying driver",
      "Organisations already running IBM QRadar SIEM and the broader IBM security ecosystem",
      "Sovereign and air-gap-adjacent estates needing deep on-prem or hybrid identity deployment",
      "Heavy-compliance environments under NESA, PDPL, CBUAE and similar regulators",
      "Buyers prioritising certification depth and evidence over cloud-native pace and UX",
      "Estates that want identity events correlated directly into threat detection and response",
    ],
    products: [
      { model: "IBM Verify", segment: "Access Mgmt", role: "SSO, risk-based MFA and adaptive access management" },
      { model: "IBM Verify Governance", segment: "IGA", role: "Access certification, recertification, role management and SoD policy" },
      { model: "IBM Verify Privilege", segment: "PAM", role: "Privileged credential vaulting, session control and least privilege" },
      { model: "IBM Verify for Consumer", segment: "CIAM", role: "Customer identity, registration and consent management" },
      { model: "IBM Trusteer integration", segment: "Fraud signals", role: "Device and fraud intelligence feeding adaptive access decisions" },
    ],
    whyArtiflex:
      "Artiflex IT delivers IBM Security IAM for UAE government and financial-services estates where audit depth and accountability come first. Our team implements IBM Verify access management, Verify Governance certification campaigns, Verify Privilege for privileged accounts and QRadar integration so identity events feed threat detection, all aligned to NESA, PDPL and CBUAE control expectations. Vendor-neutral sizing is our default: we will tell you when Okta or Entra ID offers a faster cloud-native path for part of your scope.",
    faqs: [
      {
        question: "When is IBM Security IAM the right choice?",
        answer:
          "IBM Security wins when audit depth, accountability and on-prem heritage are decisive, which is common in UAE government and banking. It is especially strong where you already run QRadar SIEM and want identity events correlated into threat detection. For SaaS-first estates chasing the fastest modern rollout, Okta or Entra ID usually fit better.",
      },
      {
        question: "How does IBM integrate with QRadar SIEM?",
        answer:
          "IBM Identity Governance and Verify feed identity and access events natively into QRadar, giving the SOC identity context for detection and response. This tight ecosystem integration is a core reason heavy-compliance and IBM-aligned estates select IBM Security IAM over standalone identity platforms.",
      },
      {
        question: "Does IBM Security IAM include privileged access management?",
        answer:
          "Yes. IBM Verify Privilege provides credential vaulting, session control and least-privilege enforcement for privileged accounts, so government and banking estates can keep IAM, governance and privileged access within one vendor ecosystem rather than bolting on a separate PAM.",
      },
      {
        question: "Is IBM Security IAM suitable for sovereign UAE deployments?",
        answer:
          "Yes. IBM's deep on-prem and hybrid heritage suits sovereign and air-gap-adjacent estates that cannot consume identity as pure SaaS, and its certification and audit posture maps directly to NESA, PDPL and CBUAE expectations. We size the deployment model against your residency and audit obligations.",
      },
      {
        question: "What is the trade-off versus cloud-native platforms?",
        answer:
          "IBM trades cloud-native pace and modern UX for unmatched audit depth, ecosystem integration and on-prem flexibility, at a premium total cost of ownership. We scope that trade-off honestly so audit-driven buyers can weigh evidence depth against the faster, lighter experience of Okta or Entra ID.",
      },
    ],
  },

  oracle: {
    slug: "oracle",
    name: "Oracle Identity",
    logo: "/logos/Oracle.png",
    tagline: "The natural identity choice for Oracle-heavy estates, with native ERP and database integration and strong IGA for complex role models",
    bestFor: "Strong Pick · Oracle Estates",
    description:
      "Oracle Identity Management is the natural choice for organisations running heavy Oracle ERP and database estates, where native integration removes the connector complexity other vendors face. It pairs strong identity governance for complex role models with comprehensive on-premises deployment, making it a defensible pick for Oracle-anchored, sovereign-leaning environments. For greenfield, cloud-first estates the market leaders usually win, but for UAE organisations deeply embedded in Oracle EBS, Fusion or database workloads, Oracle Identity keeps identity close to the applications it governs.",
    keyStats: [
      { label: "Heritage", value: "Oracle Identity heritage, ERP-native IGA" },
      { label: "Sweet spot", value: "Oracle EBS, Fusion and database estates" },
      { label: "Deployment", value: "Comprehensive on-premises options" },
      { label: "Best for", value: "Oracle ERP and database-heavy estates" },
    ],
    whyWinsIntro: {
      label: "Oracle Identity Highlights",
      title: "Native identity for Oracle ERP and database-heavy UAE estates",
      description:
        "Oracle Identity is most compelling when the estate is deeply Oracle-anchored and native ERP and database integration removes connector complexity. For cloud-first multi-cloud estates the market leaders move faster, so Oracle is a targeted pick for Oracle-centric, sovereign-leaning environments rather than a default greenfield choice.",
      stats: [
        { value: "Native", label: "integration with Oracle EBS, Fusion and database workloads", tone: "emerald" },
        { value: "On-prem", label: "comprehensive on-premises deployment for sovereign estates", tone: "violet" },
        { value: "IGA", label: "strong identity governance for complex role models", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Oracle-native",
        icon: "file",
        tone: "emerald",
        title: "Native integration with Oracle ERP and databases",
        desc: "Oracle Identity integrates natively with Oracle EBS, Fusion and database estates, removing the connector complexity that other IAM vendors carry for Oracle environments and keeping identity close to the applications it governs.",
      },
      {
        tag: "Governance",
        icon: "activity",
        tone: "violet",
        title: "Strong IGA for complex role models",
        desc: "Mature identity governance handles complex role hierarchies, provisioning and certification, well suited to large Oracle application estates with intricate access structures.",
      },
      {
        tag: "On-prem",
        icon: "server",
        tone: "sky",
        title: "Comprehensive on-premises deployment",
        desc: "Comprehensive on-prem deployment suits sovereign and Oracle-anchored estates that cannot run identity as pure SaaS, with alignment to Oracle Cloud Infrastructure for cloud-bound workloads.",
      },
      {
        tag: "ERP provisioning",
        icon: "list",
        tone: "amber",
        title: "ERP-driven provisioning and lifecycle",
        desc: "Provisioning and joiner / mover / leaver lifecycle flow naturally from Oracle HR and ERP sources, reducing integration effort for estates whose system of record is Oracle.",
      },
      {
        tag: "Access Mgr",
        icon: "lock",
        tone: "rose",
        title: "Oracle Access Manager federation and SSO",
        desc: "Oracle Access Manager provides web SSO, federation and adaptive MFA for the Oracle application portfolio and connected systems, typically deployed alongside Oracle Identity Governance.",
      },
    ],
    watchOuts: [
      {
        title: "Cloud IAM roadmap slower than market leaders",
        desc: "Oracle's cloud-native IAM pace trails Okta and Microsoft. For cloud-first, multi-cloud estates wanting the fastest modern rollout, the leaders are usually a better fit than Oracle Identity.",
      },
      {
        title: "Oracle dependency and licensing complexity",
        desc: "The strongest value depends on a heavy Oracle ecosystem footprint, and Oracle licensing carries real complexity. We model licence and dependency implications before recommending Oracle Identity as the strategic platform.",
      },
    ],
    bestFitProfile: [
      "UAE organisations running heavy Oracle ERP (EBS, Fusion) or large Oracle database estates",
      "Estates where native Oracle integration removes meaningful connector complexity",
      "Sovereign-leaning environments needing comprehensive on-premises identity deployment",
      "Organisations with complex role models that need strong IGA close to Oracle applications",
      "Customers already entitled to Oracle Identity under existing Oracle agreements",
      "Buyers prioritising Oracle-native lifecycle and provisioning over cloud-native pace",
      "Estates standardised on Oracle Cloud Infrastructure for cloud-bound workloads",
    ],
    products: [
      { model: "Oracle Identity Governance (OIG)", segment: "IGA", role: "Provisioning, access requests, certification and role management" },
      { model: "Oracle Access Manager (OAM)", segment: "Access Mgmt", role: "Web SSO, federation and adaptive MFA for Oracle and connected apps" },
      { model: "Oracle Access Governance", segment: "Cloud", role: "Newer SaaS governance for Oracle Cloud Infrastructure and Fusion estates" },
      { model: "Oracle Unified Directory (OUD)", segment: "Directory", role: "LDAP and directory layer underpinning OIG and OAM" },
      { model: "Oracle Advanced Authentication", segment: "Authentication", role: "Adaptive, risk-based MFA for Oracle application access" },
    ],
    whyArtiflex:
      "Artiflex IT supports Oracle Identity Management for UAE organisations deeply embedded in Oracle ERP and database estates, implementing Oracle Identity Governance, Oracle Access Manager federation and Oracle-native provisioning, with comprehensive on-prem deployment for sovereign-leaning environments. We align delivery to NESA, PDPL and CBUAE control expectations. Vendor-neutral sizing is our default: where the cloud roadmap or multi-cloud scope matters more than Oracle-native depth, we will tell you when Okta, Entra ID or Saviynt is the stronger strategic pick.",
    faqs: [
      {
        question: "When should we choose Oracle Identity Management?",
        answer:
          "Choose Oracle Identity when your estate is deeply Oracle-anchored: heavy Oracle ERP (EBS, Fusion) or large database workloads where native integration removes connector complexity. For cloud-first, multi-cloud estates without that Oracle gravity, the market leaders usually deliver a faster, more modern outcome.",
      },
      {
        question: "How does Oracle Identity handle ERP integration?",
        answer:
          "Oracle Identity integrates natively with Oracle EBS, Fusion and database estates, so provisioning, lifecycle and governance flow from Oracle systems of record without the custom connector work other IAM platforms require for Oracle environments. That native depth is the core reason Oracle-heavy estates select it.",
      },
      {
        question: "Can Oracle Identity be deployed on-premises for sovereignty?",
        answer:
          "Yes. Oracle offers comprehensive on-premises deployment suited to sovereign and Oracle-anchored estates that cannot run identity as pure SaaS, with Oracle Cloud Infrastructure available for cloud-bound workloads. We size the deployment model against your residency and audit obligations under NESA, PDPL and CBUAE.",
      },
      {
        question: "What is the trade-off versus Okta or Microsoft Entra ID?",
        answer:
          "Oracle trades cloud-native pace and multi-cloud breadth for native Oracle integration and strong on-prem governance. For Oracle-centric estates that is a clear advantage; for heterogeneous cloud-first estates, Okta's neutrality or Entra ID's bundled economics typically win. We model the trade-off honestly before recommending a platform.",
      },
      {
        question: "Does Oracle Access Governance replace Oracle Identity Governance?",
        answer:
          "Oracle Access Governance is Oracle's newer SaaS governance offering focused on Oracle Cloud Infrastructure and Fusion. It is not yet a like-for-like replacement for the full on-prem feature set of Oracle Identity Governance, so most estates evaluate it as a complement rather than a wholesale migration, and we plan the path accordingly.",
      },
    ],
  },

  "one-identity": {
    slug: "one-identity",
    name: "One Identity",
    logo: "/logos/OneIdentity.png",
    tagline: "The rare vendor with genuinely strong native IAM and PAM in one platform, a consolidation play with a strong Active Directory bridge and mid-market value",
    bestFor: "Strong Pick · IAM + PAM in One Platform",
    description:
      "One Identity is unusual in offering genuinely strong native capabilities across both IAM and privileged access (PAM), making it a consolidation play for organisations that want identity and privilege from one vendor. With a strong Active Directory bridge, mature Identity Manager governance and Safeguard PAM in the same portfolio, it delivers good value at a mid-market price point. For UAE estates that want to reduce vendor count and integration complexity while keeping solid governance and privilege capabilities, One Identity is a credible consolidation choice.",
    keyStats: [
      { label: "Heritage", value: "Quest spin-off 2016, formerly NetIQ" },
      { label: "Differentiator", value: "Strong native IAM and PAM in one platform" },
      { label: "Strength", value: "Strong Active Directory bridge" },
      { label: "Best for", value: "Mid-market wanting IAM + PAM in one vendor" },
    ],
    whyWinsIntro: {
      label: "One Identity Highlights",
      title: "Consolidating IAM and privileged access for mid-market UAE estates",
      description:
        "One Identity is most compelling when reducing vendor count matters and the estate wants strong governance plus native PAM from one portfolio. For pure cloud-native greenfield the leaders move faster, but for AD-heavy mid-market estates seeking consolidation and value, One Identity is a credible single-vendor answer.",
      stats: [
        { value: "2-in-1", label: "genuinely strong native IAM and PAM in one platform", tone: "emerald" },
        { value: "AD-deep", label: "strong Active Directory bridge and hybrid lifecycle", tone: "violet" },
        { value: "Mid-market", label: "competitive value at a mid-market price point", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "IAM + PAM",
        icon: "layers",
        tone: "emerald",
        title: "Genuinely strong native IAM and PAM together",
        desc: "Few vendors offer strong capabilities across both IAM and privileged access in one portfolio. One Identity does, letting estates consolidate identity governance and privilege under a single vendor and cut integration complexity.",
      },
      {
        tag: "AD bridge",
        icon: "users",
        tone: "violet",
        title: "Strong Active Directory bridge and lifecycle",
        desc: "Deep Active Directory provisioning, group and OU lifecycle management reflect the Quest and NetIQ heritage, a strong fit for AD-centric hybrid estates.",
      },
      {
        tag: "Safeguard PAM",
        icon: "lock",
        tone: "sky",
        title: "Safeguard privileged credential vaulting and sessions",
        desc: "One Identity Safeguard delivers privileged credential vaulting and session management in the same platform as Identity Manager, a genuine consolidation advantage over IAM-only vendors.",
      },
      {
        tag: "Governance",
        icon: "activity",
        tone: "amber",
        title: "Mature Identity Manager governance workflows",
        desc: "Identity Manager provides established request, approval, certification and role-mining workflows built up across many enterprise references, suitable for complex governance needs.",
      },
      {
        tag: "Adaptive auth",
        icon: "shield",
        tone: "rose",
        title: "OneLogin adaptive authentication and SSO",
        desc: "OneLogin by One Identity adds cloud SSO, adaptive MFA and access management, extending the portfolio toward cloud-first access alongside the on-prem governance strengths.",
      },
    ],
    watchOuts: [
      {
        title: "Less brand recognition than Tier-1 vendors",
        desc: "One Identity carries less market visibility than Microsoft, Okta or IBM, which can surface in some procurement processes. The capability set is strong, but the brand premium of the leaders is not there.",
      },
      {
        title: "Cloud-native capabilities still maturing",
        desc: "Cloud-native depth trails the SaaS-first leaders. For pure cloud-native greenfield estates, Okta or Entra ID often deliver a more modern rollout than One Identity's on-prem-rooted portfolio.",
      },
    ],
    bestFitProfile: [
      "UAE mid-market organisations wanting IAM and PAM consolidated under one vendor",
      "Active Directory-centric hybrid estates needing deep AD provisioning and lifecycle",
      "Buyers seeking to reduce vendor count and integration complexity across identity and privilege",
      "Organisations that need solid governance plus native privileged access without two platforms",
      "Estates with existing Quest, NetIQ or OneLogin relationships to extend",
      "Sovereign-leaning environments comfortable with an on-prem and hybrid governance core",
      "Cost-conscious buyers prioritising mid-market value over Tier-1 brand premium",
    ],
    products: [
      { model: "One Identity Manager", segment: "IGA", role: "Provisioning, access requests, certification and Active Directory lifecycle" },
      { model: "One Identity Safeguard", segment: "PAM", role: "Privileged credential vaulting and session management" },
      { model: "OneLogin by One Identity", segment: "Access Mgmt", role: "Cloud SSO, adaptive MFA and access management" },
      { model: "Active Roles", segment: "AD admin", role: "Privileged Active Directory delegation, change management and reporting" },
      { model: "Starling Connect", segment: "Connectors", role: "Cloud connector framework for SaaS application integration" },
    ],
    whyArtiflex:
      "Artiflex IT delivers One Identity for UAE mid-market estates that want to consolidate IAM and privileged access under one vendor. Our team implements Identity Manager governance, Safeguard PAM, Active Roles AD delegation and OneLogin access management, with the strong Active Directory bridge that AD-centric estates depend on, aligned to NESA, PDPL and CBUAE control expectations. Vendor-neutral sizing is our default: we will tell you when Okta, Entra ID or a specialist PAM is the stronger fit for part of your scope.",
    faqs: [
      {
        question: "What makes One Identity different from other IAM vendors?",
        answer:
          "One Identity is one of very few vendors with genuinely strong native capabilities across both IAM and privileged access. That lets you consolidate identity governance and PAM under a single vendor, reducing vendor count and integration complexity, which is its core appeal for mid-market estates.",
      },
      {
        question: "Is One Identity a good fit for Active Directory-heavy estates?",
        answer:
          "Yes. The strong Active Directory bridge, deep AD provisioning and Active Roles delegation reflect the Quest and NetIQ heritage, making One Identity a natural fit for AD-centric hybrid estates that need solid governance without moving entirely to cloud-native tooling.",
      },
      {
        question: "How does Safeguard compare to dedicated PAM vendors?",
        answer:
          "Safeguard delivers credential vaulting and session management strong enough to consolidate privileged access alongside Identity Manager. For the very deepest PAM requirements some estates still prefer a specialist such as CyberArk, but Safeguard's in-platform integration is a real advantage where consolidation is the goal.",
      },
      {
        question: "When should we choose One Identity over the market leaders?",
        answer:
          "Choose One Identity when consolidating IAM and PAM under one vendor and mid-market value matter more than Tier-1 brand or the fastest cloud-native rollout. For pure cloud-first greenfield estates, Okta or Entra ID usually deliver a more modern path, so we weigh consolidation benefit against cloud-native pace.",
      },
      {
        question: "Is One Identity suitable for UAE compliance requirements?",
        answer:
          "Yes. One Identity's on-prem and hybrid governance, certification workflows and audit reporting map to NESA, PDPL and CBUAE expectations, and its sovereign-friendly deployment suits regulated mid-market estates. We size the deployment model against your residency and audit obligations.",
      },
    ],
  },

  saviynt: {
    slug: "saviynt",
    name: "Saviynt",
    logo: "/logos/Saviynt.png",
    tagline: "Cloud-native IGA built for SaaS-heavy estates, with strong application and third-party access governance and ML-driven access reviews",
    bestFor: "Visionary · Cloud-First IGA",
    description:
      "Saviynt is a cloud-native identity governance platform built for SaaS-heavy estates, strong on application access governance, third-party access governance (TPAG) and cloud privileged access governance. Pre-built connectors and ML-driven access reviews shorten the implementation curve and cut certification fatigue. For UAE cloud-native enterprises with large SaaS footprints and demanding access-governance scope, Saviynt delivers converged, risk-aware governance from a single SaaS platform, with the honest caveat that on-prem and air-gapped depth is not its strength.",
    keyStats: [
      { label: "Heritage", value: "2010, cloud-first IGA pioneer" },
      { label: "Scope", value: "App access, third-party (TPAG), cloud PAG" },
      { label: "Reviews", value: "ML-driven, risk-aware access certification" },
      { label: "Best for", value: "SaaS-heavy estates, cloud-native enterprises" },
    ],
    whyWinsIntro: {
      label: "Saviynt Highlights",
      title: "Cloud-native governance for SaaS-heavy UAE enterprises",
      description:
        "Saviynt is most compelling when the estate is cloud and SaaS-heavy and the buying team wants converged, risk-aware governance with fast time-to-value. For sovereign air-gapped or legacy-mainframe estates, on-prem-heavy platforms remain the safer pick, which we flag during sizing.",
      stats: [
        { value: "ML-driven", label: "risk-aware access reviews that cut certification fatigue", tone: "emerald" },
        { value: "Converged", label: "application, third-party and cloud privileged access governance", tone: "violet" },
        { value: "SaaS", label: "cloud-native platform with fast time-to-value for SaaS estates", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Cloud-native IGA",
        icon: "globe",
        tone: "emerald",
        title: "Cloud-native IGA reference for SaaS estates",
        desc: "Saviynt is a true SaaS-native governance platform built for cloud and SaaS-heavy estates, with pre-built connectors that shorten the implementation curve versus on-prem-rooted incumbents.",
      },
      {
        tag: "ML reviews",
        icon: "activity",
        tone: "violet",
        title: "ML-driven, risk-aware access certifications",
        desc: "Machine-learning-driven access reviews focus certification campaigns on genuinely risky access, cutting reviewer fatigue and rubber-stamping that bulk-approval workflows hide.",
      },
      {
        tag: "TPAG",
        icon: "users",
        tone: "sky",
        title: "Third-party access governance for non-employees",
        desc: "Third-Party Access Governance manages contractor, vendor and partner identities with sponsorship workflows, a strength for estates with heavy non-employee access.",
      },
      {
        tag: "Cloud PAG",
        icon: "lock",
        tone: "amber",
        title: "Cloud privileged access governance",
        desc: "Cloud privileged access governance brings just-in-time privileged access for cloud and SaaS into the same platform as governance, reducing the number of point tools.",
      },
      {
        tag: "App governance",
        icon: "file",
        tone: "rose",
        title: "Strong application access governance",
        desc: "Application access governance covers fine-grained entitlements and segregation-of-duties scope across the SaaS and cloud application estate from one console.",
      },
      {
        tag: "Lifecycle",
        icon: "list",
        tone: "slate",
        title: "ML-driven joiner / mover / leaver lifecycle",
        desc: "Automated, ML-assisted joiner / mover / leaver lifecycle keeps access aligned to role changes across the cloud estate, with policy-based provisioning and deprovisioning.",
      },
    ],
    watchOuts: [
      {
        title: "Less mature for on-prem and air-gapped estates",
        desc: "Saviynt is cloud-native first. For sovereign air-gapped deployments and legacy-mainframe-heavy estates, on-prem-rooted platforms such as SailPoint IdentityIQ remain the safer architectural pattern.",
      },
      {
        title: "Product depth skews toward SaaS",
        desc: "Saviynt's depth is excellent for SaaS and cloud scope and lighter for legacy on-prem systems. We confirm your application mix during sizing so the SaaS-first posture matches your actual estate.",
      },
    ],
    bestFitProfile: [
      "UAE cloud-native enterprises with large SaaS application footprints",
      "Estates needing converged application, third-party and cloud privileged access governance",
      "Organisations with heavy contractor, vendor and partner (non-employee) access to govern",
      "Buyers prioritising ML-driven, risk-aware access reviews to cut certification fatigue",
      "Cloud-first estates wanting fast time-to-value from pre-built connectors",
      "Multi-cloud workloads needing cloud entitlement and privileged-access governance in one console",
      "Organisations modernising off on-prem IGA toward a cloud-native governance platform",
    ],
    products: [
      { model: "Saviynt Enterprise Identity Cloud", segment: "IGA", role: "Cloud-native governance, certifications, access requests, lifecycle" },
      { model: "Saviynt Application Access Governance", segment: "App governance", role: "Fine-grained entitlements and segregation-of-duties scope across apps" },
      { model: "Saviynt Third-Party Access Governance", segment: "Non-employee", role: "Contractor, vendor and partner identity lifecycle with sponsorship" },
      { model: "Saviynt Cloud PAM", segment: "Cloud PAG", role: "Just-in-time privileged access for cloud and SaaS in the governance console" },
      { model: "Saviynt Identity Cloud (Bundle)", segment: "Strategic", role: "Converged governance modules under one cloud-native platform" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Saviynt for UAE cloud-native enterprises with SaaS-heavy estates and demanding access-governance scope. Our team implements Enterprise Identity Cloud governance, application access governance, Third-Party Access Governance for contractor-heavy estates and Cloud PAM, using ML-driven reviews to cut certification fatigue, all aligned to NESA, PDPL and CBUAE control expectations. Vendor-neutral sizing is our default: for sovereign air-gapped or legacy-mainframe scope we will tell you when an on-prem-rooted platform is the safer fit.",
    faqs: [
      {
        question: "When is Saviynt the right IGA choice?",
        answer:
          "Saviynt is the right pick for cloud and SaaS-heavy estates that want converged, risk-aware governance with fast time-to-value: application access governance, third-party access and cloud privileged access in one SaaS platform. For sovereign air-gapped or legacy-mainframe scope, an on-prem-rooted platform is usually safer.",
      },
      {
        question: "What is Third-Party Access Governance (TPAG)?",
        answer:
          "TPAG governs the lifecycle of non-employee identities, contractors, vendors and partners, with sponsorship and approval workflows so external access is granted, reviewed and revoked under control. It is a Saviynt strength for estates with heavy third-party access that standard workforce IGA handles poorly.",
      },
      {
        question: "How do ML-driven access reviews reduce certification fatigue?",
        answer:
          "Saviynt's machine-learning reviews score access risk and focus certification campaigns on the small fraction of access that is genuinely risky, so reviewers see fewer rows and surface real violations instead of rubber-stamping. This materially cuts review fatigue compared with bulk-approval workflows.",
      },
      {
        question: "Is Saviynt suitable for on-premises or air-gapped estates?",
        answer:
          "Saviynt is cloud-native first, so its depth for legacy on-prem and air-gapped scenarios is lighter than on-prem-rooted platforms. For sovereign air-gapped deployments and mainframe-heavy estates we typically recommend SailPoint IdentityIQ, and we confirm your application mix during sizing.",
      },
      {
        question: "Does Saviynt support UAE compliance requirements?",
        answer:
          "Yes. Saviynt provides strong reporting, certification and risk-aware governance that map to NESA, PDPL and CBUAE expectations, delivered from a cloud-native platform. We align certification campaigns and access policies to your audit scope and confirm residency suits your obligations.",
      },
    ],
  },

  jumpcloud: {
    slug: "jumpcloud",
    name: "JumpCloud",
    logo: "/logos/JumpCloud.webp",
    tagline: "A full directory, SSO, MFA and device management in one cloud-delivered platform, at a price point accessible to organisations without a dedicated IAM team",
    bestFor: "SMB & Cloud-First",
    description:
      "JumpCloud delivers a full cloud directory, SSO, MFA and device management in a single cloud-delivered platform, at a price point accessible to organisations without a dedicated IAM team. It is a strong fit for SMBs and growing firms that need cloud-first identity simplicity without the cost and complexity of enterprise IAM suites. For UAE SMBs and scaling businesses standardising identity and device management together, JumpCloud is the pragmatic, value-led choice, with the honest caveat that it is not built for complex hybrid, air-gapped or deep-governance estates.",
    keyStats: [
      { label: "Heritage", value: "2012, cloud directory for SMB" },
      { label: "Scope", value: "Directory, SSO, MFA and device management" },
      { label: "TCO", value: "Lowest, SMB-friendly cloud pricing" },
      { label: "Best for", value: "SMBs and growing firms needing cloud-first simplicity" },
    ],
    whyWinsIntro: {
      label: "JumpCloud Highlights",
      title: "Cloud-first directory and device management for UAE SMBs",
      description:
        "JumpCloud is most compelling when an SMB or growing firm wants directory, SSO, MFA and device management in one affordable cloud platform without a dedicated IAM team. For complex hybrid, air-gapped or deep-governance estates the enterprise leaders are the right answer, which we flag during sizing.",
      stats: [
        { value: "4-in-1", label: "directory, SSO, MFA and device management on one platform", tone: "emerald" },
        { value: "Lowest", label: "total cost of ownership with SMB-friendly cloud pricing", tone: "violet" },
        { value: "Cloud", label: "cloud-delivered, fast to stand up without heavy infrastructure", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "All-in-one",
        icon: "layers",
        tone: "emerald",
        title: "Directory, SSO, MFA and device management together",
        desc: "JumpCloud combines a full cloud directory, SSO, MFA and cross-platform device management in one console, removing the need to stitch together several point products for a growing organisation.",
      },
      {
        tag: "SMB value",
        icon: "barChart",
        tone: "violet",
        title: "Accessible price point, lowest TCO in the lineup",
        desc: "SMB-friendly cloud pricing delivers the lowest total cost of ownership among the platforms we deliver, accessible to organisations without a dedicated IAM team or budget for enterprise suites.",
      },
      {
        tag: "Cloud directory",
        icon: "globe",
        tone: "sky",
        title: "Vendor-neutral cloud directory for mixed estates",
        desc: "A cloud-native directory that works across Windows, macOS and Linux and integrates with cloud apps, well suited to mixed-OS SMB estates that have outgrown a single on-prem directory.",
      },
      {
        tag: "Device mgmt",
        icon: "monitor",
        tone: "amber",
        title: "Cross-platform device management built in",
        desc: "Device management for Windows, macOS and Linux ships in the same platform as identity, letting growing firms enforce posture and policy without a separate endpoint management tool.",
      },
      {
        tag: "MFA + SSO",
        icon: "lock",
        tone: "rose",
        title: "Cloud SSO with push, TOTP and FIDO2 MFA",
        desc: "Cloud SSO with push, TOTP and FIDO2 passwordless support gives SMBs modern, phishing-resistant authentication options without enterprise-tier complexity or cost.",
      },
    ],
    watchOuts: [
      {
        title: "Lighter IGA and PAM than the Leaders quadrant",
        desc: "JumpCloud offers light governance and minimal native privileged access compared with enterprise platforms. Estates with serious IGA or PAM requirements need a Leaders-quadrant platform instead.",
      },
      {
        title: "Not built for complex hybrid or sovereign estates",
        desc: "JumpCloud is cloud-only and not the right choice for complex hybrid or air-gapped sovereign deployments. We size it for SMB and cloud-first scope and recommend an enterprise platform where the estate outgrows it.",
      },
    ],
    bestFitProfile: [
      "UAE SMBs and growing firms that need cloud-first identity simplicity",
      "Organisations without a dedicated IAM team or budget for enterprise suites",
      "Mixed-OS estates (Windows, macOS, Linux) needing one cloud directory",
      "Businesses wanting identity and device management consolidated on one platform",
      "Cost-conscious buyers prioritising the lowest total cost of ownership",
      "Cloud-first companies that have outgrown a single on-prem Active Directory",
      "Estates wanting modern SSO, MFA and FIDO2 without enterprise complexity",
    ],
    products: [
      { model: "JumpCloud Directory Platform", segment: "Directory", role: "Cloud directory for users, groups and cross-platform devices" },
      { model: "JumpCloud SSO", segment: "Access Mgmt", role: "Cloud single sign-on across SaaS and connected applications" },
      { model: "JumpCloud MFA", segment: "Authentication", role: "Push, TOTP and FIDO2 multi-factor and passwordless authentication" },
      { model: "JumpCloud Device Management", segment: "Endpoint", role: "Cross-platform device management for Windows, macOS and Linux" },
      { model: "JumpCloud SCIM Provisioning", segment: "Provisioning", role: "Cloud joiner / mover / leaver provisioning over SCIM" },
    ],
    whyArtiflex:
      "Artiflex IT delivers JumpCloud for UAE SMBs and growing firms that want directory, SSO, MFA and device management in one affordable cloud platform. Our team stands up the JumpCloud directory, cloud SSO, FIDO2 MFA and cross-platform device management quickly and without heavy infrastructure, aligned to NESA and PDPL expectations at SMB scope. Vendor-neutral sizing is our default: when the estate needs serious IGA, PAM or complex hybrid deployment, we will tell you when Entra ID, Okta or another enterprise platform is the right next step.",
    faqs: [
      {
        question: "Who is JumpCloud the right choice for?",
        answer:
          "JumpCloud is the right pick for SMBs and growing firms that want directory, SSO, MFA and device management in one affordable cloud platform without a dedicated IAM team. It is the value-led, cloud-first simplicity choice, not an enterprise IAM suite for complex governance or sovereign estates.",
      },
      {
        question: "What does JumpCloud combine in one platform?",
        answer:
          "JumpCloud combines a full cloud directory, single sign-on, multi-factor authentication and cross-platform device management for Windows, macOS and Linux in a single console. That consolidation is its core appeal for growing organisations that would otherwise buy several separate tools.",
      },
      {
        question: "Can JumpCloud replace on-premises Active Directory?",
        answer:
          "For cloud-first SMBs that have outgrown a single on-prem directory, JumpCloud can serve as a cloud-native directory across mixed-OS estates. For complex hybrid or sovereign environments that depend on deep Active Directory, a platform such as Entra ID with its AD bridge is the better fit.",
      },
      {
        question: "Does JumpCloud handle identity governance and PAM?",
        answer:
          "JumpCloud offers light governance and minimal native privileged access compared with the Leaders quadrant. Estates with serious IGA or PAM requirements should choose an enterprise platform; JumpCloud is best where SMB-scope simplicity and cost matter more than deep governance and privilege.",
      },
      {
        question: "Is JumpCloud suitable for UAE compliance at SMB scope?",
        answer:
          "Yes, at SMB scope. JumpCloud provides cloud reporting, SSO, MFA and device posture that support NESA and PDPL expectations for smaller estates. For heavy-compliance, CBUAE-regulated or sovereign requirements, we recommend an enterprise platform and size JumpCloud only where its scope genuinely fits.",
      },
    ],
  },
};
