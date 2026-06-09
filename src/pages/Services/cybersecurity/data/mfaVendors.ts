export type MfaVendor = {
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

export const mfaVendors: Record<string, MfaVendor> = {
  "microsoft-entra-mfa": {
    slug: "microsoft-entra-mfa",
    name: "Microsoft Entra MFA",
    logo: "/logos/microsoft.svg",
    tagline: "The most complete multi-factor authentication for Microsoft estates, tying MFA policy to device compliance, location and risk from one Conditional Access engine",
    bestFor: "Leader, M365 Estates · Recommended",
    description:
      "Microsoft Entra MFA is the default strong-authentication layer for any organisation already running Microsoft 365 or Azure. Conditional Access ties MFA enforcement to device compliance, sign-in location and real-time risk scoring from one policy engine, so multi-factor stops being a blunt prompt and becomes a context-aware control. Number matching in Microsoft Authenticator eliminates the MFA-fatigue push-bombing attacks that defeat simple approve or deny prompts, and Windows Hello for Business delivers phishing-resistant passwordless sign-in at no extra licence cost. Entra MFA is included in Microsoft 365 Business Premium and above, which makes it the lowest-friction way to roll strong authentication across a Microsoft workforce. For UAE ministries, banks and enterprises on E5 or G5 contracts, Entra MFA is the lowest-incremental-cost path to phishing-resistant, risk-aware authentication mapped to NESA, PDPL and CBUAE expectations.",
    keyStats: [
      { label: "Heritage", value: "Azure MFA, now native in Microsoft 365" },
      { label: "Strongest factor", value: "Windows Hello, FIDO2 passkeys, number matching" },
      { label: "Policy engine", value: "Conditional Access, device + risk aware" },
      { label: "Best for", value: "Microsoft 365 / Azure estates on E5 / G5" },
    ],
    whyWinsIntro: {
      label: "Microsoft Entra MFA Highlights",
      title: "Context-aware strong authentication for Microsoft-aligned UAE estates",
      description:
        "Entra MFA is most compelling when the estate is already standardised on M365, Teams, SharePoint and Azure, and the buying team wants MFA, passwordless and risk-based access without procuring a separate authentication vendor. For estates with a large non-Microsoft footprint, Cisco Duo or Okta Adaptive MFA often deliver a cleaner vendor-agnostic experience, which we flag during sizing.",
      stats: [
        { value: "99.9%", label: "of automated account-compromise attacks blocked by enforced MFA", tone: "emerald" },
        { value: "0", label: "incremental licence cost when Entra ID P1 / P2 is already on the E5 contract", tone: "violet" },
        { value: "Number match", label: "eliminates MFA-fatigue push-bombing on Authenticator approvals", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Conditional Access",
        icon: "shield",
        tone: "emerald",
        title: "MFA tied to device, location and risk in one policy",
        desc: "Conditional Access combines device compliance, sign-in location, user risk and session controls so MFA is enforced exactly where the context demands it. The most mature policy engine of any authentication platform and the heart of a Microsoft Zero Trust rollout.",
      },
      {
        tag: "Anti-fatigue",
        icon: "lock",
        tone: "violet",
        title: "Number matching defeats MFA-fatigue attacks",
        desc: "Number matching in Microsoft Authenticator forces the user to enter a number shown on the sign-in screen, eliminating the blind approve prompts that push-bombing attacks exploit. Application context and geographic location are shown alongside each request.",
      },
      {
        tag: "Passwordless",
        icon: "lock",
        tone: "sky",
        title: "Windows Hello for Business phishing-resistant sign-in",
        desc: "Windows Hello for Business and FIDO2 passkeys deliver phishing-resistant, passwordless authentication across the workforce at no extra licence cost, the strongest factor available for high-risk accounts inside the Microsoft estate.",
      },
      {
        tag: "Bundled",
        icon: "layers",
        tone: "amber",
        title: "Included in Business Premium and above",
        desc: "Entra MFA ships with Microsoft 365 Business Premium, E3, E5 and G5, so most Microsoft-aligned estates already own it. No separate authentication contract, agent or vendor relationship is required to enable strong authentication.",
      },
      {
        tag: "Risk signals",
        icon: "activity",
        tone: "rose",
        title: "Identity Protection adaptive risk scoring",
        desc: "Identity Protection scores sign-in and user risk from Microsoft's threat telemetry and feeds it directly into Conditional Access, so risky logins are challenged or blocked while trusted ones stay frictionless.",
      },
      {
        tag: "Self-service",
        icon: "users",
        tone: "slate",
        title: "Self-service registration and password reset",
        desc: "Combined security-information registration and self-service password reset cut helpdesk load, letting users enrol Authenticator, passkeys and recovery methods without a ticket while admins keep policy control.",
      },
    ],
    watchOuts: [
      {
        title: "Less value outside the Microsoft estate",
        desc: "Entra MFA is at its best protecting Microsoft and Azure-federated applications. For estates with a large non-Microsoft application footprint or where vendor neutrality is a procurement requirement, Cisco Duo or Okta Adaptive MFA usually deliver a cleaner, more agnostic experience.",
      },
      {
        title: "Premium features need Entra ID P1 or P2 licensing",
        desc: "Conditional Access requires Entra ID P1, and risk-based Identity Protection requires P2. These are bundled in E5 and G5 but cost extra on E3 or Business Premium, so we confirm your licence tier before scoping the risk-aware features.",
      },
    ],
    bestFitProfile: [
      "UAE ministries, banks and enterprises already on Microsoft 365 E5 or G5 contracts",
      "Microsoft-centric estates (M365, Azure, Teams, Dynamics) standardising strong authentication",
      "Organisations wanting MFA enforced through device compliance and risk, not a blanket prompt",
      "Estates rolling out passwordless and phishing-resistant sign-in with Windows Hello and passkeys",
      "Buyers wanting to eliminate MFA-fatigue push-bombing with number matching",
      "Teams that want self-service registration and password reset to cut helpdesk load",
      "NESA, PDPL and CBUAE-regulated bodies wanting authentication controls inside their existing tenancy",
    ],
    products: [
      { model: "Microsoft Entra ID P1", segment: "Access Mgmt", role: "Conditional Access, MFA enforcement and self-service password reset" },
      { model: "Microsoft Entra ID P2", segment: "Identity premium", role: "Identity Protection risk-based sign-in and user-risk policies" },
      { model: "Microsoft Authenticator", segment: "Authenticator app", role: "Push with number matching, TOTP and passwordless phone sign-in" },
      { model: "Windows Hello for Business", segment: "Passwordless", role: "Phishing-resistant biometric and PIN sign-in bound to the device" },
      { model: "FIDO2 security keys / passkeys", segment: "Phishing-resistant", role: "Hardware and platform passkeys for the highest-risk accounts" },
    ],
    whyArtiflex:
      "Artiflex IT designs, deploys and manages Microsoft Entra MFA across UAE government and enterprise estates already invested in M365 E5 and G5. Our team runs the authentication assessment, configures Conditional Access policies tied to device compliance and risk, rolls out number matching to stop push-bombing, and delivers passwordless sign-in with Windows Hello for Business and FIDO2 passkeys, all aligned to NESA, PDPL and CBUAE control expectations. Vendor-neutral sizing is our default starting point: we will tell you when Cisco Duo or Okta Adaptive MFA is the better fit for a non-Microsoft part of your estate.",
    faqs: [
      {
        question: "Is Microsoft Entra MFA included in our Microsoft 365 licence?",
        answer:
          "Yes for most estates. Entra MFA ships with Microsoft 365 Business Premium, E3, E5 and G5. Conditional Access (which lets you target MFA by device and location) needs Entra ID P1, and risk-based Identity Protection needs P2, both bundled in E5 and G5. If you are on a lower tier we confirm the licence step-up before scoping the risk-aware features.",
      },
      {
        question: "How does Entra MFA compare to Cisco Duo or Okta?",
        answer:
          "Entra MFA wins when you are already Microsoft-aligned: bundled licensing, the deepest Conditional Access engine and native Windows Hello passwordless. Cisco Duo offers the cleanest push experience and works with any identity infrastructure, while Okta Adaptive MFA pairs with a 7,000-plus app catalogue. For non-Microsoft-heavy estates those vendor-agnostic options often integrate more cleanly.",
      },
      {
        question: "Does Entra MFA stop MFA-fatigue push-bombing attacks?",
        answer:
          "Yes. Number matching in Microsoft Authenticator requires the user to type a number shown on the sign-in screen rather than tapping a blind approve, which defeats the push-bombing attacks that overwhelm users with prompts. Application name and sign-in location are also shown with each request so users can spot illegitimate attempts.",
      },
      {
        question: "Can we go fully passwordless with Entra MFA?",
        answer:
          "Yes. Windows Hello for Business, FIDO2 security keys and passkeys, and passwordless phone sign-in in Authenticator all deliver phishing-resistant, passwordless authentication. We typically stage the rollout, starting with high-risk and administrator accounts on FIDO2 before extending passwordless across the wider workforce.",
      },
      {
        question: "Is Entra MFA suitable for UAE compliance requirements?",
        answer:
          "Yes. Entra MFA is native to UAE M365 tenancies and supports NESA, PDPL and CBUAE expectations through enforced multi-factor, Conditional Access, phishing-resistant passwordless methods and detailed sign-in and audit logging. We map your MFA and Conditional Access policies to the specific control statements your regulator references.",
      },
    ],
    whatIs: {
      eyebrow: "What is Microsoft Entra MFA",
      titlePrefix: "Context-aware strong authentication for the ",
      titleHighlight: "Microsoft estate",
      bodyParagraphs: [
        "Microsoft Entra MFA is the multi-factor authentication and Conditional Access layer of Microsoft Entra ID. Rather than prompting every user on every sign-in, it evaluates device compliance, location, application sensitivity and real-time risk, then enforces the right factor only where the context demands it.",
        "For UAE buyers this matters because it turns MFA from a blanket prompt into a policy-driven control that regulators increasingly expect, with number matching to defeat push-bombing and Windows Hello for Business and FIDO2 passkeys for phishing-resistant passwordless sign-in across the workforce.",
      ],
      feature: {
        titleLine1: "Conditional Access",
        titleLine2: "device, location and risk in one policy",
        body: "One policy engine combines device compliance, sign-in location, user and sign-in risk from Identity Protection, and session controls. MFA is challenged where risk is high and stays frictionless where it is low, the foundation of a Microsoft Zero Trust rollout.",
      },
      capabilities: [
        "Conditional Access policies tied to device compliance and location",
        "Number matching in Authenticator to stop MFA-fatigue attacks",
        "Windows Hello for Business phishing-resistant passwordless sign-in",
        "FIDO2 security keys and passkeys for high-risk accounts",
      ],
    },
  },

  "cisco-duo": {
    slug: "cisco-duo",
    name: "Cisco Duo",
    logo: "/logos/Cisco.svg",
    tagline: "Built MFA-first from day one, with the cleanest push experience in the market, the fastest end-user adoption and device trust that works with any identity infrastructure",
    bestFor: "Leader, MFA-First · Recommended",
    description:
      "Cisco Duo was built MFA-first from day one, and that focus shows in the cleanest push-notification experience in the market and the fastest end-user adoption of any multi-factor platform. Duo Device Health establishes device trust at the point of access, checking posture before a session is allowed, so authentication and device hygiene work together. Because Duo is identity-infrastructure agnostic, it layers cleanly over an existing directory, VPN, RADIUS or SaaS estate without forcing a rip-and-replace, which makes it a pragmatic choice when no single identity vendor dominates. For UAE organisations that want strong authentication users will actually accept, with broad coverage across legacy and cloud applications, Duo is a leading, low-friction pick aligned to NESA, PDPL and CBUAE expectations.",
    keyStats: [
      { label: "Heritage", value: "2010 MFA-first, now part of Cisco" },
      { label: "Strongest factor", value: "Verified Duo Push, WebAuthn, FIDO2" },
      { label: "Adoption", value: "Cleanest push UX, fastest rollout" },
      { label: "Best for", value: "Vendor-agnostic estates wanting fast MFA adoption" },
    ],
    whyWinsIntro: {
      label: "Cisco Duo Highlights",
      title: "MFA-first strong authentication users actually accept",
      description:
        "Duo is most compelling when the buying team wants strong authentication that users adopt quickly across a mixed estate of legacy and cloud applications, without betting on one identity vendor. For deeply Microsoft-aligned estates on E5, Entra MFA is usually better value, and where the estate is non-Cisco the deeper Cisco ecosystem integrations add complexity that we scope honestly.",
      stats: [
        { value: "MFA-first", label: "purpose-built for multi-factor, not bolted onto a suite", tone: "emerald" },
        { value: "Any IdP", label: "vendor-agnostic, layers over existing identity infrastructure", tone: "violet" },
        { value: "Device trust", label: "Duo Device Health checks posture at every access", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Push UX",
        icon: "phone",
        tone: "emerald",
        title: "Cleanest push experience in the market",
        desc: "Duo Push is the benchmark for a simple, fast multi-factor prompt, and Verified Duo Push adds number matching to defeat push fatigue. The clean experience drives the fastest end-user adoption of any MFA platform we deliver.",
      },
      {
        tag: "Device trust",
        icon: "monitor",
        tone: "violet",
        title: "Duo Device Health checks posture at access",
        desc: "Duo Device Health establishes device trust at the point of authentication, verifying that the device is managed, patched and healthy before a session is permitted, so authentication and endpoint hygiene work together.",
      },
      {
        tag: "Vendor-agnostic",
        icon: "globe",
        tone: "sky",
        title: "Works with any existing identity infrastructure",
        desc: "Duo layers cleanly over an existing directory, VPN, RADIUS, on-prem application or SaaS estate without a rip-and-replace, the pragmatic choice when no single identity vendor dominates the environment.",
      },
      {
        tag: "Passwordless",
        icon: "lock",
        tone: "amber",
        title: "WebAuthn and FIDO2 passwordless options",
        desc: "Duo supports WebAuthn, FIDO2 security keys and platform biometrics for phishing-resistant passwordless sign-in, letting estates move high-risk accounts off passwords without changing the underlying identity provider.",
      },
      {
        tag: "Broad coverage",
        icon: "layers",
        tone: "rose",
        title: "Protects legacy and cloud applications alike",
        desc: "Duo secures everything from on-prem VPNs and RADIUS-based access to modern SaaS via SAML and OIDC, giving broad multi-factor coverage across a mixed estate from one console.",
      },
      {
        tag: "Risk-based",
        icon: "activity",
        tone: "slate",
        title: "Risk-Based Authentication step-up",
        desc: "Risk-Based Authentication evaluates contextual signals such as location, network and known-device status, stepping users up to a stronger factor only when the context looks risky and keeping trusted sign-ins frictionless.",
      },
    ],
    watchOuts: [
      {
        title: "Deeper Cisco integration adds complexity for non-Cisco shops",
        desc: "Duo is fully vendor-agnostic at the access layer, but the richest integrations sit within the wider Cisco security ecosystem (Secure Access, ISE, Umbrella). Estates with no other Cisco footprint will not unlock that depth, which we factor into sizing.",
      },
      {
        title: "Lighter IGA and governance integration",
        desc: "Duo is an authentication and device-trust platform, not an identity governance suite. For access certification, joiner / mover / leaver lifecycle and segregation-of-duties scope, Duo is paired with a dedicated IGA platform rather than replacing one.",
      },
    ],
    bestFitProfile: [
      "UAE organisations that want strong authentication users will actually accept and adopt fast",
      "Mixed estates with no single dominant identity vendor wanting a vendor-agnostic MFA layer",
      "Businesses protecting legacy VPN, RADIUS and on-prem applications alongside modern SaaS",
      "Teams that want device trust and posture checks enforced at the point of access",
      "Existing Cisco customers extending Secure Access, ISE or Umbrella with native MFA",
      "Buyers standardising on WebAuthn and FIDO2 passwordless without changing their identity provider",
      "NESA, PDPL and CBUAE-regulated bodies needing broad, auditable multi-factor coverage",
    ],
    products: [
      { model: "Duo Essentials", segment: "Entry MFA", role: "Core multi-factor, Duo Push, TOTP and basic device insight" },
      { model: "Duo Advantage", segment: "Adaptive MFA", role: "Risk-Based Authentication, Device Health and trusted endpoints" },
      { model: "Duo Premier", segment: "Full access", role: "Duo Advantage plus VPN-less remote access and full device trust" },
      { model: "Duo Push / Verified Push", segment: "Authenticator app", role: "Clean push approval with number matching against push fatigue" },
      { model: "Duo Passwordless / FIDO2", segment: "Phishing-resistant", role: "WebAuthn, FIDO2 keys and biometrics for passwordless sign-in" },
    ],
    whyArtiflex:
      "Artiflex IT deploys Cisco Duo across UAE estates that want strong authentication users adopt quickly, running the assessment, the rollout of Verified Duo Push to stop push fatigue, Device Health posture checks, Risk-Based Authentication and WebAuthn passwordless, all over your existing identity infrastructure. We align Duo policies to NESA, PDPL and CBUAE expectations and integrate it with your wider Cisco security estate where one exists. Vendor-neutral sizing is our default: we will tell you when Entra MFA's bundled economics or Okta Adaptive MFA is the better fit for part of your scope.",
    faqs: [
      {
        question: "What makes Cisco Duo different from other MFA platforms?",
        answer:
          "Duo was built MFA-first from day one rather than bolted onto an identity suite, which shows in the cleanest push experience in the market and the fastest end-user adoption. It is vendor-agnostic, so it layers over your existing directory, VPN and SaaS estate, and Duo Device Health adds posture-based device trust at the point of access.",
      },
      {
        question: "Does Duo work if we are not a Cisco shop?",
        answer:
          "Yes. Duo is fully identity-infrastructure agnostic and protects directories, VPNs, RADIUS, on-prem applications and SaaS regardless of vendor. The richest integrations do sit within the wider Cisco ecosystem (Secure Access, ISE, Umbrella), so a non-Cisco estate will not unlock that extra depth, which we factor into sizing.",
      },
      {
        question: "How does Duo compare to Microsoft Entra MFA?",
        answer:
          "Duo wins on push experience, speed of adoption and vendor neutrality across mixed legacy and cloud estates. Entra MFA wins when you are already Microsoft-aligned on E5 or G5, where it is bundled in the licence and offers the deepest Conditional Access engine. For non-Microsoft-heavy estates Duo is often the cleaner, more agnostic answer.",
      },
      {
        question: "Can Duo stop MFA-fatigue push-bombing attacks?",
        answer:
          "Yes. Verified Duo Push adds number matching so the user must enter a code shown on the sign-in screen rather than tapping a blind approve, defeating the push-bombing attacks that overwhelm users with prompts. Risk-Based Authentication also limits how often a push is triggered for trusted, low-risk sign-ins.",
      },
      {
        question: "Is Duo suitable for UAE compliance requirements?",
        answer:
          "Yes. Duo provides enforced multi-factor, device trust, phishing-resistant passwordless options and detailed authentication logging that map to NESA, PDPL and CBUAE expectations. For access certification and identity lifecycle we pair Duo with a dedicated IGA platform, since Duo is an authentication and device-trust layer rather than a governance suite.",
      },
    ],
    whatIs: {
      eyebrow: "What is Cisco Duo",
      titlePrefix: "MFA-first strong authentication with ",
      titleHighlight: "device trust at every access",
      bodyParagraphs: [
        "Cisco Duo is a multi-factor authentication and device-trust platform built MFA-first rather than added on to an identity suite. It verifies the user with a clean push, WebAuthn or passwordless factor and verifies the device with Duo Device Health before a session is allowed.",
        "For UAE buyers this matters because Duo layers over whatever identity infrastructure you already run, directory, VPN, RADIUS or SaaS, so you get strong, auditable authentication across legacy and cloud applications without a rip-and-replace, with the fastest end-user adoption in the category.",
      ],
      feature: {
        titleLine1: "Duo Device Health",
        titleLine2: "posture-based device trust",
        body: "Duo Device Health checks that a device is managed, patched and healthy at the moment of authentication, blocking or stepping up access from non-compliant endpoints. Authentication and endpoint hygiene work as one control rather than two disconnected checks.",
      },
      capabilities: [
        "Verified Duo Push with number matching against push fatigue",
        "Duo Device Health posture checks at the point of access",
        "Vendor-agnostic coverage of VPN, RADIUS, on-prem and SaaS",
        "WebAuthn and FIDO2 passwordless for phishing-resistant sign-in",
      ],
    },
  },

  "okta-mfa": {
    slug: "okta-mfa",
    name: "Okta Adaptive MFA",
    logo: "/logos/Okta.png",
    tagline: "The strongest cloud-native multi-factor authentication, paired with Okta's 7,000+ app catalogue and cross-platform FastPass passwordless sign-in",
    bestFor: "Leader, Cloud-Native · Recommended",
    description:
      "Okta Adaptive MFA is the strongest cloud-native multi-factor platform, designed to sit above a heterogeneous estate and protect it through Okta's catalogue of more than 7,000 pre-built application integrations. FastPass delivers cross-platform passwordless, phishing-resistant authentication across Windows, macOS, iOS and Android, so users get one consistent passwordless experience regardless of device. Adaptive risk signals from Okta Identity Threat Protection feed authentication decisions continuously, challenging or revoking access in-session when risk rises rather than only at the point of login. For UAE enterprises running a diverse mix of Microsoft, Google, AWS and best-of-breed SaaS, Okta Adaptive MFA delivers vendor-neutral strong authentication with the broadest application coverage in the category, aligned to NESA, PDPL and CBUAE expectations.",
    keyStats: [
      { label: "Heritage", value: "2009 cloud-native identity platform" },
      { label: "Strongest factor", value: "FastPass passwordless, WebAuthn, FIDO2" },
      { label: "Coverage", value: "7,000+ pre-built application integrations" },
      { label: "Best for", value: "Multi-cloud, multi-SaaS, vendor-neutral estates" },
    ],
    whyWinsIntro: {
      label: "Okta Adaptive MFA Highlights",
      title: "Cloud-native strong authentication for heterogeneous UAE estates",
      description:
        "Okta Adaptive MFA is most compelling when no single cloud dominates the estate and the buying team wants vendor-neutral strong authentication spanning Microsoft, Google, AWS and best-of-breed SaaS. For deeply Microsoft-aligned estates on E5, Entra MFA is usually the better-value answer because it is bundled, which we flag during sizing.",
      stats: [
        { value: "7,000+", label: "pre-built application integrations protected by Okta MFA", tone: "emerald" },
        { value: "FastPass", label: "cross-platform passwordless across Windows, Mac, iOS, Android", tone: "violet" },
        { value: "In-session", label: "Identity Threat Protection revokes access when risk rises", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Cloud-native",
        icon: "globe",
        tone: "emerald",
        title: "Strongest cloud-native MFA across 7,000+ apps",
        desc: "Okta Adaptive MFA protects the largest pre-built SaaS catalogue in identity, so multi-factor reaches virtually every mainstream cloud application from day one, decisive for heterogeneous estates with a wide application footprint.",
      },
      {
        tag: "FastPass",
        icon: "lock",
        tone: "violet",
        title: "Cross-platform FastPass passwordless sign-in",
        desc: "Okta FastPass delivers phishing-resistant, passwordless authentication consistently across Windows, macOS, iOS and Android, giving users one passwordless experience regardless of the device or operating system they are on.",
      },
      {
        tag: "Adaptive risk",
        icon: "activity",
        tone: "sky",
        title: "Adaptive risk signals drive authentication",
        desc: "Adaptive MFA evaluates contextual and device-risk signals on every sign-in, stepping users up to a stronger factor only when the context warrants it and keeping trusted access frictionless.",
      },
      {
        tag: "In-session",
        icon: "eye",
        tone: "amber",
        title: "Identity Threat Protection revokes access in-session",
        desc: "Okta Identity Threat Protection continuously evaluates session risk after login and can challenge or revoke access in-session, extending Zero Trust beyond the point of authentication across the connected estate.",
      },
      {
        tag: "Vendor-neutral",
        icon: "layers",
        tone: "rose",
        title: "Neutral authentication layer over any cloud",
        desc: "Okta sits above Microsoft, Google, AWS and on-prem sources as a neutral strong-authentication layer, the pragmatic choice when procurement requires vendor neutrality and the estate cannot be tied to one cloud provider.",
      },
      {
        tag: "Factor breadth",
        icon: "phone",
        tone: "slate",
        title: "Broad factor choice from push to FIDO2",
        desc: "Okta Verify push, TOTP, WebAuthn, FIDO2 security keys and biometrics give administrators a full range of factors to match assurance level to risk across different user populations and applications.",
      },
    ],
    watchOuts: [
      {
        title: "Per-user licensing adds up at scale",
        desc: "Okta's premium per-user pricing across multiple SKUs can climb quickly for large estates. Buyers already on Microsoft 365 E5 should weigh Okta Adaptive MFA against Entra MFA, which is bundled in the existing licence at no incremental cost.",
      },
      {
        title: "Less native value for M365-centric estates",
        desc: "For estates that live almost entirely inside Microsoft 365 and Azure, Entra MFA's native Conditional Access and bundled economics usually win. Okta's advantage grows with the breadth of non-Microsoft applications in scope, which we confirm during sizing.",
      },
    ],
    bestFitProfile: [
      "UAE enterprises with heterogeneous multi-cloud and multi-SaaS environments",
      "Organisations whose procurement requires vendor neutrality across cloud providers",
      "Estates needing strong authentication across the broadest pre-built SaaS catalogue",
      "Teams standardising cross-platform passwordless with FastPass on mixed-OS fleets",
      "Buyers wanting in-session, risk-aware access revocation beyond the point of login",
      "Businesses already running Okta for SSO that want to extend native adaptive MFA",
      "NESA, PDPL and CBUAE-regulated bodies needing auditable, vendor-neutral authentication",
    ],
    products: [
      { model: "Okta Adaptive MFA", segment: "Adaptive MFA", role: "Risk-aware multi-factor across the SSO-connected application estate" },
      { model: "Okta FastPass", segment: "Passwordless", role: "Cross-platform phishing-resistant passwordless sign-in" },
      { model: "Okta Verify", segment: "Authenticator app", role: "Push with number challenge, TOTP and device-bound factors" },
      { model: "Okta Identity Threat Protection", segment: "Continuous risk", role: "In-session risk evaluation and access revocation after login" },
      { model: "FIDO2 / WebAuthn support", segment: "Phishing-resistant", role: "Hardware keys and platform biometrics for high-risk accounts" },
    ],
    whyArtiflex:
      "Artiflex IT deploys Okta Adaptive MFA across heterogeneous UAE estates where no single cloud dominates, running the assessment, configuring adaptive risk policies, rolling out FastPass cross-platform passwordless, and enabling Identity Threat Protection for in-session risk response across the application estate. We align Okta MFA policies to NESA, PDPL and CBUAE expectations. Vendor-neutral sizing is our default: we will tell you when Entra MFA's bundled economics or Cisco Duo's push experience is the better fit for part of your scope.",
    faqs: [
      {
        question: "When is Okta Adaptive MFA the right choice over Entra MFA?",
        answer:
          "Okta wins when the estate is genuinely heterogeneous: multiple clouds, a large best-of-breed SaaS footprint, and a procurement preference for vendor neutrality. Entra MFA tends to win when you are already Microsoft-aligned on E5 or G5, where its bundled licensing and native Conditional Access are hard to beat on value.",
      },
      {
        question: "What is Okta FastPass?",
        answer:
          "FastPass is Okta's cross-platform passwordless authenticator that delivers phishing-resistant sign-in consistently across Windows, macOS, iOS and Android. Users get one passwordless experience regardless of device, and FastPass can verify the device alongside the user, which strengthens assurance without adding friction.",
      },
      {
        question: "How does Okta protect a session after the user logs in?",
        answer:
          "Okta Identity Threat Protection continuously evaluates session risk after authentication and can challenge or revoke access in-session when risk rises, rather than trusting a session indefinitely once the initial MFA passes. This extends Zero Trust beyond the point of login across the connected estate.",
      },
      {
        question: "Does Okta Adaptive MFA need Okta SSO as well?",
        answer:
          "Adaptive MFA delivers the most value alongside Okta's Single Sign-On, because that is what connects it to the 7,000-plus application catalogue. Many UAE estates adopt Okta SSO and Adaptive MFA together. We size the combination against your application footprint so you are not paying for breadth you will not use.",
      },
      {
        question: "Is Okta Adaptive MFA suitable for UAE compliance requirements?",
        answer:
          "Yes. Okta provides enforced adaptive multi-factor, phishing-resistant FastPass passwordless, in-session risk response and strong authentication logging that map to NESA, PDPL and CBUAE expectations. For tenders that require on-prem sovereign deployment, we address those points directly and propose Entra MFA or Ping as alternatives where relevant.",
      },
    ],
    whatIs: {
      eyebrow: "What is Okta Adaptive MFA",
      titlePrefix: "Cloud-native strong authentication for ",
      titleHighlight: "heterogeneous estates",
      bodyParagraphs: [
        "Okta Adaptive MFA is the multi-factor authentication layer of the Okta Identity Cloud, designed to protect a heterogeneous estate through more than 7,000 pre-built application integrations. It evaluates contextual and device-risk signals on every sign-in and steps users up to a stronger factor only when the context warrants it.",
        "For UAE buyers this matters because Okta is vendor-neutral, sitting above Microsoft, Google, AWS and best-of-breed SaaS, with FastPass passwordless across every major platform and Identity Threat Protection that can revoke access in-session when risk rises after login.",
      ],
      feature: {
        titleLine1: "Okta FastPass",
        titleLine2: "cross-platform passwordless sign-in",
        body: "FastPass delivers phishing-resistant, passwordless authentication consistently across Windows, macOS, iOS and Android. One passwordless experience regardless of device, with optional device verification that raises assurance without adding friction for the user.",
      },
      capabilities: [
        "Adaptive multi-factor across 7,000+ pre-built integrations",
        "FastPass cross-platform phishing-resistant passwordless sign-in",
        "Identity Threat Protection for in-session risk and revocation",
        "Broad factor choice from Okta Verify push to FIDO2 keys",
      ],
    },
  },

  "rsa-securid": {
    slug: "rsa-securid",
    name: "RSA SecurID Access",
    logo: "/logos/RSA_SecurID.png",
    tagline: "The MFA pioneer with the longest enterprise track record, strong in government and financial services where hardware-token infrastructure already exists",
    bestFor: "Challenger · Enterprise Legacy",
    description:
      "RSA SecurID Access is the multi-factor authentication pioneer, with the longest enterprise track record in the category and a strong presence in government and financial services. Its enduring strength is in environments where hardware-token infrastructure is already deployed and trusted, and where decades of operational familiarity carry weight in procurement. RSA offers hybrid flexibility, combining classic hardware tokens with modern app-based authenticators so estates can modernise at their own pace rather than ripping out a working token estate. For UAE government bodies and financial-services institutions with established RSA hardware-token deployments, SecurID Access is a defensible continuity choice, with the honest caveat that modern cloud-native alternatives are lighter to operate and lower in cost.",
    keyStats: [
      { label: "Heritage", value: "MFA pioneer, longest enterprise track record" },
      { label: "Strongest factor", value: "Hardware tokens, hybrid app + token" },
      { label: "Sector fit", value: "Government and financial services" },
      { label: "Best for", value: "Estates with existing RSA hardware-token infrastructure" },
    ],
    whyWinsIntro: {
      label: "RSA SecurID Access Highlights",
      title: "Continuity for UAE estates with established hardware-token infrastructure",
      description:
        "RSA is most compelling when an estate already runs hardware-token infrastructure and values the longest enterprise track record in strong authentication, common in government and financial services. For greenfield or cloud-first estates, Entra MFA, Cisco Duo or Okta Adaptive MFA are lighter to operate and lower in cost, which we flag honestly during sizing.",
      stats: [
        { value: "Pioneer", label: "the longest enterprise track record in multi-factor authentication", tone: "emerald" },
        { value: "Hybrid", label: "hardware tokens and modern app-based authenticators together", tone: "violet" },
        { value: "Gov / FSI", label: "strong presence in government and financial-services estates", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Track record",
        icon: "shield",
        tone: "emerald",
        title: "The longest enterprise track record in MFA",
        desc: "RSA effectively defined enterprise multi-factor authentication and carries the longest operational track record in the category, a reassurance that still carries real weight in conservative government and financial-services procurement.",
      },
      {
        tag: "Hardware tokens",
        icon: "lock",
        tone: "violet",
        title: "Trusted hardware-token authentication",
        desc: "RSA SecurID hardware tokens remain a trusted strong-authentication factor for high-assurance access, valuable where an estate has already standardised on physical tokens and the supporting infrastructure is in place.",
      },
      {
        tag: "Hybrid",
        icon: "layers",
        tone: "sky",
        title: "Hybrid hardware-token and app flexibility",
        desc: "SecurID Access combines classic hardware tokens with modern app-based authenticators, so an estate can modernise authentication at its own pace rather than ripping out a working token deployment in one step.",
      },
      {
        tag: "Government",
        icon: "file",
        tone: "amber",
        title: "Strong government and financial-services fit",
        desc: "RSA's presence and references in government and financial services make it a recognised, defensible choice in regulated tenders where established vendor heritage and high-assurance tokens are valued.",
      },
      {
        tag: "Hybrid deployment",
        icon: "server",
        tone: "rose",
        title: "On-prem and hybrid deployment options",
        desc: "RSA supports on-prem and hybrid deployment, suiting sovereign-leaning estates that cannot consume strong authentication purely as a public cloud service and need to keep token authority in-house.",
      },
      {
        tag: "Risk-based",
        icon: "activity",
        tone: "slate",
        title: "Risk-based and contextual authentication",
        desc: "SecurID Access adds risk-based and contextual policies on top of token authentication, stepping users up to stronger factors when the sign-in context looks unusual rather than relying on the token alone.",
      },
    ],
    watchOuts: [
      {
        title: "The 2011 breach still affects perception",
        desc: "The 2011 RSA SecurID seed-record breach is long remediated, but it still surfaces in some security tenders as a reputational consideration. We address the remediation history and current architecture directly during evaluation so it is judged on present-day facts.",
      },
      {
        title: "More expensive and operationally heavier than cloud alternatives",
        desc: "Hardware-token logistics, distribution and lifecycle make RSA more expensive and operationally heavier than modern cloud-native MFA. For estates without an existing token investment, Entra MFA, Duo or Okta are usually lower-cost and lighter to run.",
      },
    ],
    bestFitProfile: [
      "UAE government bodies with established RSA hardware-token deployments to extend",
      "Financial-services institutions that value the longest enterprise MFA track record",
      "High-assurance estates standardised on physical tokens for privileged or sensitive access",
      "Organisations modernising gradually from hardware tokens to app-based authenticators",
      "Sovereign-leaning environments needing on-prem or hybrid token authority in-house",
      "Conservative procurement processes that prioritise vendor heritage and references",
      "Estates with a working RSA infrastructure where continuity outweighs a full replacement",
    ],
    products: [
      { model: "RSA SecurID Access", segment: "Access Mgmt", role: "Multi-factor authentication and access policy across the estate" },
      { model: "RSA SecurID Hardware Tokens", segment: "Hardware factor", role: "High-assurance physical token authentication for sensitive access" },
      { model: "RSA SecurID Authenticate App", segment: "Authenticator app", role: "Mobile push, OTP and biometric factors for modern devices" },
      { model: "RSA Authentication Manager", segment: "On-prem core", role: "On-prem authentication authority and token lifecycle management" },
      { model: "RSA ID Plus", segment: "Cloud / hybrid", role: "Cloud and hybrid identity-assurance suite with risk-based policy" },
    ],
    whyArtiflex:
      "Artiflex IT supports RSA SecurID Access for UAE government and financial-services estates with established hardware-token infrastructure, running the assessment, configuring Authentication Manager and ID Plus, managing token lifecycle, and planning a measured path from hardware tokens to app-based and risk-based authentication. We align delivery to NESA, PDPL and CBUAE control expectations and address the historic breach question directly on current-day facts. Vendor-neutral sizing is our default: where there is no existing token investment, we will tell you when Entra MFA, Cisco Duo or Okta is the lighter, lower-cost fit.",
    faqs: [
      {
        question: "When is RSA SecurID Access still the right choice?",
        answer:
          "RSA is the right pick when an estate already runs hardware-token infrastructure, values the longest enterprise track record in strong authentication, and operates in conservative government or financial-services procurement. For greenfield or cloud-first estates without an existing token investment, modern cloud-native MFA is usually lighter to operate and lower in cost.",
      },
      {
        question: "Does the 2011 RSA breach still matter?",
        answer:
          "The 2011 SecurID seed-record breach is long remediated and the architecture has changed substantially since, but it still surfaces in some tenders as a reputational point. We address the remediation history and the current-day security posture directly during evaluation so the decision is made on present facts rather than a decade-old incident.",
      },
      {
        question: "Can we keep our existing RSA hardware tokens and still modernise?",
        answer:
          "Yes. SecurID Access supports hybrid use of classic hardware tokens alongside the Authenticate app with push, OTP and biometric factors, so you can modernise at your own pace. We plan a phased path that protects your existing token investment while moving lower-risk populations to app-based and risk-based authentication first.",
      },
      {
        question: "How does RSA compare to Microsoft Entra MFA or Okta?",
        answer:
          "RSA's edge is its track record, hardware-token strength and hybrid on-prem authority, which suit estates already invested in tokens. Entra MFA wins on bundled economics for Microsoft estates, and Okta wins on cloud-native breadth and vendor neutrality. For new deployments without a token estate, those alternatives are usually lighter and lower in cost.",
      },
      {
        question: "Is RSA SecurID Access suitable for UAE compliance requirements?",
        answer:
          "Yes. RSA provides high-assurance multi-factor, on-prem and hybrid token authority, and risk-based policy that map to NESA, PDPL and CBUAE expectations, with deployment models suited to sovereign-leaning estates. We size the deployment and token lifecycle against your residency and audit obligations.",
      },
    ],
    whatIs: {
      eyebrow: "What is RSA SecurID Access",
      titlePrefix: "High-assurance authentication for ",
      titleHighlight: "token-anchored enterprise estates",
      bodyParagraphs: [
        "RSA SecurID Access is the enterprise multi-factor platform from the vendor that effectively defined the category. It combines classic hardware-token authentication with modern app-based push, OTP and biometric factors, governed by RSA Authentication Manager on-prem or the ID Plus cloud and hybrid suite.",
        "For UAE buyers this matters in government and financial services where hardware-token infrastructure is already deployed and trusted. RSA lets those estates keep token authority in-house and modernise gradually, with risk-based policy layered on top, rather than replacing a working token estate in one step.",
      ],
      feature: {
        titleLine1: "Hybrid factors",
        titleLine2: "hardware tokens meet modern app authentication",
        body: "SecurID Access runs classic hardware tokens and the Authenticate app side by side under one policy, so high-assurance accounts can stay on physical tokens while the wider workforce moves to push, OTP and biometric factors at a measured pace.",
      },
      capabilities: [
        "High-assurance hardware-token authentication for sensitive access",
        "App-based push, OTP and biometric factors for modern devices",
        "On-prem Authentication Manager for in-house token authority",
        "Risk-based and contextual step-up policies on top of tokens",
      ],
    },
  },

  yubico: {
    slug: "yubico",
    name: "Yubico (YubiKey)",
    logo: "/logos/yubico.svg",
    tagline: "The leading hardware security key, delivering phishing-resistant FIDO2 and WebAuthn authentication for the highest-risk accounts, with no battery, app or connectivity needed",
    bestFor: "Visionary · Hardware-First",
    description:
      "Yubico's YubiKey is the leading hardware security key and the gold standard for phishing-resistant authentication on the highest-risk accounts. Built on FIDO2 and WebAuthn, a YubiKey works with virtually any FIDO2-compatible service, so it strengthens authentication across Microsoft, Google, Okta, Duo and thousands of other platforms without being tied to any one of them. With no battery, no app and no connectivity required, the YubiKey removes the dependencies and attack surface that software authenticators carry, which is why it is favoured for administrators, executives and other high-value targets. It is best understood as a complement to an MFA platform rather than a standalone management platform: YubiKeys provide the strongest factor, while a platform such as Entra, Okta or Duo manages the policy. For UAE organisations protecting privileged and executive accounts against phishing and credential theft, YubiKeys are the strongest factor available, sized as part of a wider MFA strategy.",
    keyStats: [
      { label: "Heritage", value: "Hardware security-key pioneer, FIDO co-author" },
      { label: "Strongest factor", value: "FIDO2 / WebAuthn hardware key" },
      { label: "Dependencies", value: "No battery, no app, no connectivity" },
      { label: "Best for", value: "Phishing-resistant factor for high-risk accounts" },
    ],
    whyWinsIntro: {
      label: "Yubico (YubiKey) Highlights",
      title: "The strongest phishing-resistant factor for high-risk UAE accounts",
      description:
        "YubiKeys are most compelling as the phishing-resistant factor for administrators, executives and other high-value targets, layered onto an MFA platform that manages policy. They are not a standalone MFA management platform, so we pair YubiKeys with Entra, Okta or Duo and size the hardware against the accounts that genuinely warrant it.",
      stats: [
        { value: "Phishing-resistant", label: "FIDO2 and WebAuthn defeat credential phishing by design", tone: "emerald" },
        { value: "Any FIDO2", label: "works with virtually any FIDO2-compatible service", tone: "violet" },
        { value: "No app", label: "no battery, app or connectivity, minimal attack surface", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Phishing-resistant",
        icon: "shield",
        tone: "emerald",
        title: "Phishing-resistant FIDO2 and WebAuthn",
        desc: "YubiKeys implement FIDO2 and WebAuthn, which bind authentication to the legitimate site so a stolen credential or a fake login page cannot be replayed. This is the gold standard for protecting accounts against phishing and credential theft.",
      },
      {
        tag: "Hardware key",
        icon: "lock",
        tone: "violet",
        title: "Strongest factor for high-risk accounts",
        desc: "A physical security key is the strongest practical factor for administrators, executives and other high-value targets, removing the reliance on a phone or software authenticator that attackers can socially engineer or intercept.",
      },
      {
        tag: "Universal",
        icon: "globe",
        tone: "sky",
        title: "Works with any FIDO2-compatible service",
        desc: "Because the YubiKey is built on open standards, it works across Microsoft, Google, Okta, Duo and thousands of other FIDO2 services without being locked to any single vendor, so one key secures many platforms.",
      },
      {
        tag: "No dependencies",
        icon: "server",
        tone: "amber",
        title: "No battery, no app, no connectivity",
        desc: "The YubiKey needs no battery, no companion app and no network connection, which removes the dependencies and attack surface that software authenticators carry and makes it reliable in restricted or offline environments.",
      },
      {
        tag: "Multi-protocol",
        icon: "layers",
        tone: "rose",
        title: "FIDO2, smart card, OTP and OpenPGP in one key",
        desc: "Higher-end YubiKeys support FIDO2, smart card (PIV), OATH OTP and OpenPGP on a single device, so one key can cover passwordless sign-in, certificate-based authentication and code signing across mixed use cases.",
      },
      {
        tag: "Complement",
        icon: "sliders",
        tone: "slate",
        title: "Strengthens your existing MFA platform",
        desc: "YubiKeys are designed to be the strongest factor within an MFA platform you already run, registering as a FIDO2 authenticator in Entra, Okta or Duo so the platform keeps policy and the key provides the assurance.",
      },
    ],
    watchOuts: [
      {
        title: "Physical token logistics and management overhead",
        desc: "Hardware keys must be procured, distributed, registered, recovered when lost and replaced over time. That logistics and lifecycle overhead is real, so we typically prioritise YubiKeys for high-risk populations rather than issuing them to every user from day one.",
      },
      {
        title: "Not a complete MFA management platform on its own",
        desc: "A YubiKey is the strongest factor, not a policy engine, enrolment system or reporting console. It must be paired with an MFA platform such as Entra, Okta or Duo that manages registration, policy and audit, which we design around it.",
      },
    ],
    bestFitProfile: [
      "UAE organisations protecting privileged, administrator and executive accounts against phishing",
      "Estates that have suffered or fear credential-phishing and account-takeover attacks",
      "High-assurance use cases where a phone or software authenticator is not strong enough",
      "Organisations already running Entra, Okta or Duo wanting to add the strongest factor on top",
      "Restricted or offline environments where app and connectivity dependencies are a problem",
      "Buyers needing one key to cover FIDO2, smart card and OTP across mixed systems",
      "NESA, PDPL and CBUAE-regulated bodies hardening their most sensitive accounts",
    ],
    products: [
      { model: "YubiKey 5 Series", segment: "Multi-protocol", role: "FIDO2, smart card (PIV), OTP and OpenPGP in USB-A, USB-C and NFC" },
      { model: "YubiKey 5 FIPS Series", segment: "FIPS-validated", role: "FIPS 140-validated keys for government and high-compliance estates" },
      { model: "Security Key Series", segment: "FIDO-only", role: "FIDO2 and WebAuthn passwordless at lower cost for broad rollout" },
      { model: "YubiKey Bio Series", segment: "Biometric", role: "Fingerprint-based FIDO2 sign-in without a separate PIN entry" },
      { model: "YubiEnterprise Subscription / Delivery", segment: "Lifecycle", role: "Subscription supply and global distribution to manage key logistics" },
    ],
    whyArtiflex:
      "Artiflex IT delivers YubiKey-based phishing-resistant authentication for UAE organisations protecting their highest-risk accounts, running the assessment to identify which populations warrant hardware keys, registering YubiKeys as FIDO2 authenticators in your existing Entra, Okta or Duo platform, and standing up enrolment, recovery and replacement processes through YubiEnterprise, all aligned to NESA, PDPL and CBUAE expectations. Vendor-neutral sizing is our default: because a YubiKey is a factor and not a platform, we will tell you which MFA platform should manage policy and how widely the hardware genuinely needs to be issued.",
    faqs: [
      {
        question: "Is a YubiKey a replacement for our MFA platform?",
        answer:
          "No. A YubiKey is the strongest authentication factor, not a management platform. It registers as a FIDO2 authenticator inside an MFA platform such as Microsoft Entra, Okta or Cisco Duo, which keeps the policy engine, enrolment and reporting. We design the YubiKey rollout around the platform you run rather than as a standalone.",
      },
      {
        question: "Why are YubiKeys considered phishing-resistant?",
        answer:
          "YubiKeys use FIDO2 and WebAuthn, which cryptographically bind authentication to the legitimate website. A stolen password, a one-time code or a fake login page cannot be replayed against the key, so the phishing and credential-theft techniques that defeat passwords and even some app-based factors do not work against a YubiKey.",
      },
      {
        question: "Do we need to give every employee a YubiKey?",
        answer:
          "Usually not at first. The strongest return comes from issuing YubiKeys to high-risk populations, administrators, executives and other high-value targets, while the wider workforce uses platform passwordless or app-based factors. We size the hardware against the accounts that genuinely warrant it to control logistics and cost.",
      },
      {
        question: "What happens if a user loses their YubiKey?",
        answer:
          "Best practice is to register at least one backup key per user and run a defined recovery process in the MFA platform so a lost key does not lock the user out. We stand up enrolment, backup and replacement workflows, and use YubiEnterprise for supply and global distribution to keep the lifecycle manageable.",
      },
      {
        question: "Are YubiKeys suitable for UAE compliance requirements?",
        answer:
          "Yes. YubiKeys provide the strongest phishing-resistant factor and, in the FIPS series, FIPS 140-validated hardware suited to government and high-compliance estates, mapping to NESA, PDPL and CBUAE expectations for strong authentication on sensitive accounts. We pair them with an MFA platform that supplies the policy, enrolment and audit evidence.",
      },
    ],
    whatIs: {
      eyebrow: "What is a YubiKey",
      titlePrefix: "The strongest phishing-resistant factor for ",
      titleHighlight: "your highest-risk accounts",
      bodyParagraphs: [
        "A YubiKey is a hardware security key from Yubico, built on the FIDO2 and WebAuthn open standards. It is a physical device the user touches or taps to authenticate, with no battery, no companion app and no network connection required, which removes the dependencies and attack surface that software authenticators carry.",
        "For UAE buyers this matters because the YubiKey is the gold standard for protecting administrators, executives and other high-value targets against phishing and credential theft. It is a complement to an MFA platform, not a replacement: the key provides the assurance while Entra, Okta or Duo manages the policy.",
      ],
      feature: {
        titleLine1: "FIDO2 / WebAuthn",
        titleLine2: "phishing-resistant by design",
        body: "FIDO2 cryptographically binds authentication to the legitimate site, so a stolen credential, intercepted code or fake login page cannot be replayed against the key. This is why YubiKeys are the strongest practical factor for the accounts an attacker most wants to compromise.",
      },
      capabilities: [
        "Phishing-resistant FIDO2 and WebAuthn hardware authentication",
        "Works with any FIDO2-compatible service across vendors",
        "No battery, app or connectivity, minimal attack surface",
        "FIPS-validated and multi-protocol options for mixed use cases",
      ],
    },
  },

  "google-workspace-mfa": {
    slug: "google-workspace-mfa",
    name: "Google Workspace MFA",
    logo: "/logos/Google-Cloud.webp",
    tagline: "Native multi-factor for Google Workspace estates, with a smooth Google prompt and phishing-resistant Titan Security Keys included without an extra vendor contract",
    bestFor: "Challenger · Workspace-Native",
    description:
      "Google Workspace MFA is the native strong-authentication layer for organisations standardised on Google Workspace. The Google prompt delivers a smooth, familiar push experience that users already know from their personal Google accounts, which keeps adoption friction low. Paired with Titan Security Keys, Workspace MFA delivers phishing-resistant, FIDO2-based coverage for high-risk accounts without bringing in an extra authentication vendor or contract. It is the lowest-friction way to enforce multi-factor across a Workspace workforce, with policy managed directly in the Google Admin console alongside the rest of the estate. For UAE organisations whose core productivity stack is Google Workspace, this is the pragmatic, no-extra-vendor choice, with the honest caveat that it is Workspace-centric and that its risk-based capabilities are less mature than Microsoft or Okta.",
    keyStats: [
      { label: "Heritage", value: "Native to Google Workspace, Titan keys" },
      { label: "Strongest factor", value: "Titan Security Keys, FIDO2 / WebAuthn" },
      { label: "Experience", value: "Google prompt smooth push UX" },
      { label: "Best for", value: "Google Workspace-centric estates" },
    ],
    whyWinsIntro: {
      label: "Google Workspace MFA Highlights",
      title: "Native strong authentication for Workspace-centric UAE estates",
      description:
        "Google Workspace MFA is most compelling when the core productivity stack is Google Workspace and the buying team wants strong authentication managed in the same admin console without a separate vendor. For estates with a large non-Google footprint or demanding risk-based requirements, Okta, Duo or Entra MFA usually fit better, which we flag during sizing.",
      stats: [
        { value: "Native", label: "managed in the Google Admin console with no extra vendor", tone: "emerald" },
        { value: "Titan keys", label: "phishing-resistant FIDO2 coverage for high-risk accounts", tone: "violet" },
        { value: "Google prompt", label: "smooth, familiar push experience that aids adoption", tone: "sky" },
      ],
    },
    strengths: [
      {
        tag: "Workspace-native",
        icon: "layers",
        tone: "emerald",
        title: "Native MFA inside the Google Admin console",
        desc: "Workspace MFA is enforced and managed directly in the Google Admin console alongside the rest of the estate, so a Workspace-centric organisation gets strong authentication without procuring or integrating a separate authentication vendor.",
      },
      {
        tag: "Google prompt",
        icon: "phone",
        tone: "violet",
        title: "Smooth Google prompt push experience",
        desc: "The Google prompt delivers a familiar, low-friction push that users already know from their personal Google accounts, which keeps adoption high and helpdesk friction low across the workforce.",
      },
      {
        tag: "Titan keys",
        icon: "lock",
        tone: "sky",
        title: "Phishing-resistant Titan Security Keys",
        desc: "Titan Security Keys bring FIDO2-based, phishing-resistant authentication to high-risk Workspace accounts without an extra vendor contract, the strongest factor available natively within the Google estate.",
      },
      {
        tag: "No extra vendor",
        icon: "barChart",
        tone: "amber",
        title: "Strong authentication with no added contract",
        desc: "Because MFA and Titan keys come from within Workspace, there is no separate authentication licence or vendor relationship to manage, which keeps the total cost and operational footprint low for Workspace-aligned estates.",
      },
      {
        tag: "Context-aware",
        icon: "activity",
        tone: "rose",
        title: "Context-Aware Access conditions",
        desc: "Context-Aware Access lets administrators set access conditions based on user, device and location signals, adding a layer of contextual control on top of multi-factor for Workspace applications.",
      },
      {
        tag: "Broad factors",
        icon: "users",
        tone: "slate",
        title: "Factor choice from prompt to security key",
        desc: "Workspace supports the Google prompt, authenticator app codes, backup codes and FIDO2 security keys, giving administrators a range of factors to match assurance level to the risk of each user population.",
      },
    ],
    watchOuts: [
      {
        title: "Workspace-centric, limited beyond the Google estate",
        desc: "Workspace MFA is built for Google applications and federated services. For estates with a large non-Google application footprint, a vendor-agnostic platform such as Okta, Duo or Entra MFA usually delivers broader coverage and a more consistent experience.",
      },
      {
        title: "Risk-based capabilities less mature than Microsoft or Okta",
        desc: "Context-Aware Access is useful but its adaptive, risk-scored capabilities are less mature than Microsoft Entra Identity Protection or Okta Adaptive MFA. For demanding risk-based authentication requirements we flag those platforms during sizing.",
      },
    ],
    bestFitProfile: [
      "UAE organisations whose core productivity stack is Google Workspace",
      "Estates that want strong authentication managed in the Google Admin console",
      "Buyers prioritising the lowest friction and no extra authentication vendor contract",
      "Workspace estates that want phishing-resistant Titan keys for high-risk accounts",
      "Teams that value a familiar Google prompt experience to keep adoption high",
      "Cost-conscious organisations wanting MFA within their existing Workspace spend",
      "NESA and PDPL-aware estates standardising authentication inside the Google estate",
    ],
    products: [
      { model: "Google Workspace 2-Step Verification", segment: "Core MFA", role: "Enforced multi-factor across Workspace users and applications" },
      { model: "Google Prompt", segment: "Push factor", role: "Smooth push approval on the user's signed-in Google device" },
      { model: "Titan Security Key", segment: "Phishing-resistant", role: "FIDO2 hardware key for high-risk and administrator accounts" },
      { model: "Context-Aware Access", segment: "Conditional access", role: "User, device and location conditions on Workspace app access" },
      { model: "Authenticator / backup codes", segment: "Fallback factors", role: "TOTP app codes and backup codes for recovery scenarios" },
    ],
    whyArtiflex:
      "Artiflex IT delivers Google Workspace MFA for UAE organisations whose core productivity stack is Google, running the assessment, enforcing 2-Step Verification across the workforce, deploying Titan Security Keys to high-risk and administrator accounts, and configuring Context-Aware Access conditions, all managed in the Google Admin console and aligned to NESA and PDPL expectations. Vendor-neutral sizing is our default: where the estate reaches well beyond Google or needs demanding risk-based authentication, we will tell you when Okta, Cisco Duo or Microsoft Entra MFA is the better fit.",
    faqs: [
      {
        question: "Who is Google Workspace MFA the right choice for?",
        answer:
          "Workspace MFA is the right pick for organisations whose core productivity stack is Google Workspace and who want strong authentication managed in the same admin console without a separate vendor. It is the lowest-friction, no-extra-contract option for Workspace-centric estates rather than a broad vendor-agnostic platform for heavily mixed environments.",
      },
      {
        question: "What do Titan Security Keys add?",
        answer:
          "Titan Security Keys bring FIDO2-based, phishing-resistant authentication to high-risk Workspace accounts without bringing in an extra vendor contract. They cryptographically bind sign-in to the legitimate site, so a stolen credential or fake login page cannot be replayed, making them the strongest factor available natively within Google Workspace.",
      },
      {
        question: "How does Workspace MFA compare to Microsoft Entra MFA or Okta?",
        answer:
          "Workspace MFA wins on native simplicity and cost when Google is your core stack. Entra MFA and Okta Adaptive MFA win on broader coverage of mixed estates and more mature risk-based authentication. If your application footprint reaches well beyond Google, a vendor-agnostic platform usually delivers a more consistent experience.",
      },
      {
        question: "Can Google Workspace MFA protect non-Google applications?",
        answer:
          "Through SAML and OIDC federation Workspace can extend sign-in to many third-party applications, but its strength and depth are within the Google estate. For broad coverage of a large non-Google application footprint, a vendor-agnostic platform such as Okta, Duo or Entra MFA usually integrates more cleanly, which we size honestly.",
      },
      {
        question: "Is Google Workspace MFA suitable for UAE compliance requirements?",
        answer:
          "Yes, within a Workspace-centric estate. It provides enforced 2-Step Verification, phishing-resistant Titan keys, Context-Aware Access conditions and authentication logging that support NESA and PDPL expectations. For heavy CBUAE-regulated or demanding risk-based requirements we weigh it against Entra MFA or Okta and size accordingly.",
      },
    ],
    whatIs: {
      eyebrow: "What is Google Workspace MFA",
      titlePrefix: "Native strong authentication for ",
      titleHighlight: "the Google estate",
      bodyParagraphs: [
        "Google Workspace MFA is the native multi-factor and access-control layer of Google Workspace, enforced and managed directly in the Google Admin console. It combines the smooth Google prompt push experience with authenticator codes, backup codes and phishing-resistant Titan Security Keys for high-risk accounts.",
        "For UAE buyers this matters when the core productivity stack is Google Workspace, because it delivers strong authentication and Context-Aware Access conditions without an extra vendor contract, keeping cost and operational footprint low while raising the authentication bar across the workforce.",
      ],
      feature: {
        titleLine1: "Titan Security Keys",
        titleLine2: "phishing-resistant coverage, no extra vendor",
        body: "Titan Security Keys bring FIDO2 phishing-resistant authentication to administrators and high-risk Workspace accounts from within Google, so the strongest factor is available natively without procuring a separate authentication platform or contract.",
      },
      capabilities: [
        "Enforced 2-Step Verification managed in the Google Admin console",
        "Smooth Google prompt push for high adoption",
        "Phishing-resistant Titan Security Keys for high-risk accounts",
        "Context-Aware Access conditions on Workspace applications",
      ],
    },
  },
};

export const mfaVendorList = Object.values(mfaVendors);
