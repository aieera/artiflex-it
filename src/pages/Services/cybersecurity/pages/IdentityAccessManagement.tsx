import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import {
  ShieldIcon,
  LockIcon,
  UsersIcon,
  EyeIcon,
  ActivityIcon,
  TargetIcon,
  CheckIcon,
  KeyIcon,
  GlobeIcon,
  CpuIcon,
  BarChartIcon,
  LayersIcon,
  AlertTriangleIcon,
  GearIcon,
} from "@/components/icons";

/* ───────── IAM VENDORS LINEUP (HONEYCOMB) ───────── */

const iamVendorList: { slug: string; name: string; logo: string }[] = [
  { slug: "saviynt", name: "Saviynt", logo: "/logos/Saviynt.png" },
  { slug: "okta", name: "Okta", logo: "/logos/Okta.png" },
  { slug: "ping-identity", name: "Ping Identity", logo: "/logos/pingidentity.png" },
  { slug: "microsoft-entra", name: "Microsoft Entra ID", logo: "/logos/microsoft.svg" },
  { slug: "ibm-security", name: "IBM Security", logo: "/logos/IBM-Security.png" },
  { slug: "oracle", name: "Oracle Identity", logo: "/logos/Oracle.png" },
  { slug: "one-identity", name: "One Identity", logo: "/logos/OneIdentity.png" },
  { slug: "jumpcloud", name: "JumpCloud", logo: "/logos/JumpCloud.webp" },
];

/* ───────── SIX-LAYER IAM MODEL ───────── */

const iamLayers: {
  tag: string;
  icon: typeof LockIcon;
  title: string;
  desc: string;
  details: string;
}[] = [
  {
    tag: "Layer 1",
    icon: UsersIcon,
    title: "Identity",
    desc: "Who is this person?",
    details:
      "Creating and managing digital identities for employees, contractors, customers, and machines. The foundational record every other layer relies on.",
  },
  {
    tag: "Layer 2",
    icon: LockIcon,
    title: "Authentication",
    desc: "Prove who you are.",
    details:
      "Passwords, MFA, biometrics, certificates, passkeys, verifying that the person claiming an identity actually is that person. The single most impactful control in modern security.",
  },
  {
    tag: "Layer 3",
    icon: ShieldIcon,
    title: "Authorisation",
    desc: "What are you allowed to do?",
    details:
      "Role-based and policy-based access control that determines what resources each verified identity can reach. Where attribute-based access control (ABAC) and just-in-time access live.",
  },
  {
    tag: "Layer 4",
    icon: ActivityIcon,
    title: "Governance",
    desc: "Is access still appropriate?",
    details:
      "Continuous review of who has access to what, certifying it is still needed, and revoking it when it is not. Where auditors look first under NESA, ISO 27001, CBUAE, and SAMA.",
  },
  {
    tag: "Layer 5",
    icon: TargetIcon,
    title: "Privileged Access",
    desc: "Who controls the systems?",
    details:
      "Securing administrator and service accounts, the highest-value targets in any environment. Vaulting, just-in-time elevation, session recording, and credential rotation.",
  },
  {
    tag: "Layer 6",
    icon: EyeIcon,
    title: "Zero Trust Monitoring",
    desc: "Never trust, always verify.",
    details:
      "Continuous verification that even authenticated, authorised users are behaving as expected, with no implicit trust granted based on location or prior login.",
  },
];

/* ───────── WHAT IAM COVERS (BUILDING BLOCKS) ───────── */

const iamBuildingBlocks: {
  icon: typeof LockIcon;
  title: string;
  points: string[];
}[] = [
  {
    icon: LockIcon,
    title: "Authentication & SSO",
    points: [
      "Single Sign-On across cloud, SaaS and on-prem apps",
      "Multi-Factor Authentication (MFA) and step-up auth",
      "Passwordless & FIDO2 / passkeys / biometrics",
      "Adaptive, risk-based authentication signals",
    ],
  },
  {
    icon: UsersIcon,
    title: "Identity Lifecycle Management (ILM)",
    points: [
      "Automated joiner-mover-leaver workflows",
      "HR-driven provisioning (Workday, SAP SuccessFactors)",
      "SCIM & connector-based de-provisioning",
      "Birthright access and role-based assignment",
    ],
  },
  {
    icon: CheckIcon,
    title: "Identity Governance & Administration (IGA)",
    points: [
      "Access certifications & recertification campaigns",
      "Segregation of Duties (SoD) for SAP, Oracle, Workday",
      "Role mining, access requests & approval workflows",
      "Audit-ready evidence for NESA, PDPL, CBUAE",
    ],
  },
  {
    icon: KeyIcon,
    title: "Privileged Access Management (PAM)",
    points: [
      "Credential vaulting & secrets management",
      "Just-in-time (JIT) privilege elevation",
      "Privileged session monitoring & recording",
      "Cloud privileged access governance (CPAM)",
    ],
  },
  {
    icon: GlobeIcon,
    title: "Customer IAM (CIAM)",
    points: [
      "Self-service registration & consent management",
      "Social & federated login at consumer scale",
      "Progressive profiling & preference control",
      "Privacy & data-residency alignment",
    ],
  },
  {
    icon: ShieldIcon,
    title: "Zero Trust & Continuous Monitoring",
    points: [
      "Conditional / context-aware access policies",
      "Continuous verification, never trust by default",
      "Identity Threat Detection & Response (ITDR)",
      "Real-time risk scoring & access revocation",
    ],
  },
  {
    icon: CpuIcon,
    title: "Non-Human & Machine Identity",
    points: [
      "Service accounts, bots & workload identities",
      "Cloud entitlement management (CIEM)",
      "Secrets & certificate governance",
      "Third-Party / external access governance (TPAG)",
    ],
  },
  {
    icon: BarChartIcon,
    title: "Access Intelligence & Analytics",
    points: [
      "AI/ML-driven access recommendations",
      "Outlier & over-privilege detection",
      "Usage-based access right-sizing",
      "Board-readable risk & compliance dashboards",
    ],
  },
  {
    icon: LayersIcon,
    title: "Application & Cross-System Governance",
    points: [
      "Fine-grained, application-level access governance",
      "Pre-built connectors for SAP, Oracle, Workday, ServiceNow",
      "Cross-application SoD & risk correlation",
      "Unified policy across multi-cloud estates",
    ],
  },
];

/* ───────── DECISION GUIDE ───────── */

const decisionGuide: { icon: string; scenario: string; recommend: string }[] = [
  {
    icon: "🏢",
    scenario: "You are deeply invested in Microsoft 365 or Azure",
    recommend: "Start with Microsoft Entra ID. It is included in your M365 licensing and has the deepest integration with Teams, SharePoint, and Azure workloads. Add CyberArk or BeyondTrust for PAM.",
  },
  {
    icon: "☁️",
    scenario: "You have a multi-cloud, multi-SaaS environment",
    recommend: "Okta is the neutral-ground choice. Its 7,000+ connectors and excellent developer platform make it the best fit for heterogeneous environments where you cannot bet on one cloud provider.",
  },
  {
    icon: "🏦",
    scenario: "You are in a heavily regulated industry (finance, healthcare, government)",
    recommend: "Ping Identity or IBM Security IAM. Both have the deepest compliance audit trails, the most flexible on-premises deployment options, and the longest track records in regulated environments.",
  },
  {
    icon: "🔒",
    scenario: "You need IAM and PAM in one platform",
    recommend: "One Identity is the only platform with genuinely strong native capabilities across both IAM and privileged access. Reduces vendor count and integration complexity.",
  },
  {
    icon: "🗄",
    scenario: "You run Oracle ERP or a heavy Oracle database estate",
    recommend: "Oracle Identity Management integrates natively with Oracle applications and eliminates the connector complexity that other vendors require for Oracle environments.",
  },
  {
    icon: "🚀",
    scenario: "You are an SMB or growing company that needs cloud-first simplicity",
    recommend: "JumpCloud offers a full directory, SSO, MFA, and device management in a single cloud-delivered platform at a price point accessible to organisations without a dedicated IAM team.",
  },
];

/* ───────── VENDOR DETAIL CARDS ───────── */

const vendors: {
  slug: string;
  name: string;
  best: string;
  strength: string;
  watch: string;
  accent: string;
  logo: string;
}[] = [
  {
    slug: "saviynt",
    name: "Saviynt",
    best: "Visionary, Cloud-First IGA (Recommended)",
    strength:
      "Cloud-native IGA built for SaaS-heavy estates. Strong on application access governance, third-party access governance (TPAG), and cloud privileged access governance. Pre-built connectors and ML-driven access reviews shorten the implementation curve.",
    watch:
      "Less mature than SailPoint for on-premises and air-gapped deployments. Product depth excellent for SaaS, less so for legacy mainframe or sovereign on-prem.",
    accent: "#10B981",
    logo: "/logos/Saviynt.png",
  },
  {
    slug: "okta",
    name: "Okta",
    best: "Leader, Vendor-Neutral (Recommended)",
    strength:
      "The cloud-native IAM platform of choice for organisations with diverse, multi-cloud, multi-vendor environments. 7,000+ pre-built app integrations, excellent developer experience (Auth0), strongest workforce plus customer IAM coverage.",
    watch:
      "Licensing costs add up quickly at scale. On-premises capabilities more limited than Azure. The 2022 Lapsus$ breach remains a reputational concern in some regulated tenders.",
    accent: "#007DC1",
    logo: "/logos/Okta.png",
  },
  {
    slug: "ping-identity",
    name: "Ping Identity",
    best: "Leader, Hybrid + CIAM (Recommended)",
    strength:
      "Enterprise federation specialist with the deepest protocol support (SAML, OAuth, OIDC, FIDO2, FAPI). Hybrid deployment flexibility, ForgeRock acquisition adds open-source credibility. Strong in regulated industries: finance, healthcare, telco.",
    watch:
      "Higher implementation complexity than Okta. Brand integration between Ping and ForgeRock still maturing.",
    accent: "#1D2D5C",
    logo: "/logos/pingidentity.png",
  },
  {
    slug: "microsoft-entra",
    name: "Microsoft Entra ID",
    best: "Leader, M365 Estates",
    strength:
      "The dominant enterprise IAM platform, built into every Microsoft 365 subscription. Deepest Active Directory integration, market-leading Conditional Access policy engine, Entra Permission Management for cloud entitlements, and seamless Teams and Office integration.",
    watch:
      "Complexity for non-Microsoft environments. PAM requires CyberArk or third-party bolt-on. Advanced governance is a separate SKU (Entra ID Governance).",
    accent: "#0078D4",
    logo: "/logos/microsoft.svg",
  },
  {
    slug: "ibm-security",
    name: "IBM Security IAM",
    best: "Leader, Compliance-First",
    strength:
      "Compliance-first IAM platform with the deepest integration with IBM's QRadar SIEM and broader security ecosystem. Deepest compliance and audit trail capabilities. Preferred for government, banking, and heavy-compliance environments.",
    watch:
      "Slower cloud-native evolution vs Okta and Microsoft. Higher total cost of ownership. UI and UX lag behind modern cloud platforms.",
    accent: "#0530AD",
    logo: "/logos/IBM-Security.png",
  },
  {
    slug: "oracle",
    name: "Oracle Identity",
    best: "Strong, Oracle Estates",
    strength:
      "The natural choice for Oracle-heavy environments, particularly those running Oracle ERP or databases where native integration reduces deployment complexity. Strong IGA capabilities for complex role models. Comprehensive on-premises deployment.",
    watch:
      "Cloud IAM roadmap slower than market leaders. Strong Oracle ecosystem dependency. Licensing model complexity.",
    accent: "#C74634",
    logo: "/logos/Oracle.png",
  },
  {
    slug: "one-identity",
    name: "One Identity",
    best: "Strong, IAM + PAM in One Platform",
    strength:
      "Unique as a vendor with strong native capabilities across both IAM and PAM. Good for organisations that want to consolidate identity and privilege in one vendor. Strong Active Directory bridge, good value at mid-market price point.",
    watch:
      "Less brand recognition than Tier-1 vendors. Cloud-native capabilities still maturing.",
    accent: "#7C3AED",
    logo: "/logos/OneIdentity.png",
  },
  {
    slug: "jumpcloud",
    name: "JumpCloud",
    best: "SMB & Cloud-First",
    strength:
      "Full directory, SSO, MFA, and device management in a single cloud-delivered platform at a price point accessible to organisations without a dedicated IAM team. Strong fit for growing companies that need cloud-first simplicity.",
    watch:
      "Less depth in IGA and PAM than the Leaders quadrant. Not the right choice for complex hybrid or air-gapped sovereign deployments.",
    accent: "#0EA5E9",
    logo: "/logos/JumpCloud.webp",
  },
];

/* ───────── VENDOR MATRIX ───────── */

const matrixVendors = [
  { name: "Saviynt", recommended: true },
  { name: "Okta", recommended: true },
  { name: "Ping Identity", recommended: true },
  { name: "Microsoft Entra ID" },
  { name: "IBM Security" },
  { name: "Oracle Identity" },
  { name: "One Identity" },
  { name: "JumpCloud" },
];

type StarCell = { stars: number; note: string };
type VerdictCell = { recommended?: boolean; rank?: string; text: string };
type MatrixRow =
  | { label: string; type: "text"; cells: string[] }
  | { label: string; type: "stars"; cells: StarCell[] }
  | { label: string; type: "verdict"; cells: VerdictCell[] };

const matrixRows: MatrixRow[] = [
  {
    label: "Founded / Heritage",
    type: "text",
    cells: [
      "2010, cloud-first converged identity pioneer",
      "2009 cloud-native, Auth0 acquired 2021",
      "2002 federation specialist, ForgeRock 2023",
      "2014 Azure AD, bundled in Microsoft 365",
      "1995, deep enterprise security ecosystem",
      "Oracle IDM heritage, Oracle estate native",
      "Quest spin-off 2016, formerly NetIQ",
      "2012, SMB cloud directory",
    ],
  },
  {
    label: "Identity Governance (IGA)",
    type: "stars",
    cells: [
      { stars: 5, note: "Cloud-native IGA reference platform" },
      { stars: 4, note: "Lifecycle Mgmt, partner IGA" },
      { stars: 3, note: "Partner-led (SailPoint, Saviynt)" },
      { stars: 4, note: "Entra ID Governance (separate SKU)" },
      { stars: 4, note: "Identity Governance, deep audit" },
      { stars: 4, note: "Strong for Oracle role models" },
      { stars: 4, note: "Identity Manager, mature" },
      { stars: 2, note: "Limited governance depth" },
    ],
  },
  {
    label: "Application Access Governance & SoD",
    type: "stars",
    cells: [
      { stars: 5, note: "Out-of-the-box cross-app SoD, fine-grained" },
      { stars: 2, note: "Requires partner IGA" },
      { stars: 2, note: "Partner-led" },
      { stars: 2, note: "Coarse-grained, app-level limited" },
      { stars: 3, note: "Strong audit, less fine-grained" },
      { stars: 3, note: "Strong inside Oracle apps only" },
      { stars: 3, note: "Moderate SoD capability" },
      { stars: 1, note: "Not a focus" },
    ],
  },
  {
    label: "AI / ML Access Intelligence",
    type: "stars",
    cells: [
      { stars: 5, note: "Native identity analytics & risk recommendations" },
      { stars: 3, note: "Identity Threat Protection" },
      { stars: 3, note: "PingOne Protect signals" },
      { stars: 4, note: "Copilot for Security, risk engine" },
      { stars: 3, note: "Watson / QRadar analytics" },
      { stars: 2, note: "Emerging" },
      { stars: 2, note: "Basic analytics" },
      { stars: 2, note: "Limited" },
    ],
  },
  {
    label: "Third-Party Access Governance (TPAG)",
    type: "stars",
    cells: [
      { stars: 5, note: "Purpose-built TPAG module, vendor lifecycle" },
      { stars: 3, note: "Workforce + partner via Auth0" },
      { stars: 3, note: "Federation-strong" },
      { stars: 3, note: "Entra External ID / B2B" },
      { stars: 2, note: "Limited dedicated TPAG" },
      { stars: 2, note: "Limited" },
      { stars: 2, note: "Limited" },
      { stars: 2, note: "Basic guest access" },
    ],
  },
  {
    label: "Single Sign-On (SSO)",
    type: "stars",
    cells: [
      { stars: 4, note: "Cloud-first, integrates Entra/Okta IdP" },
      { stars: 5, note: "7,000+ pre-built apps" },
      { stars: 5, note: "Deepest federation protocols" },
      { stars: 5, note: "Native to M365 estate" },
      { stars: 4, note: "Mature enterprise SSO" },
      { stars: 3, note: "Strong in Oracle stack" },
      { stars: 4, note: "Strong AD bridge" },
      { stars: 4, note: "Solid cloud SSO" },
    ],
  },
  {
    label: "Multi-Factor Authentication",
    type: "stars",
    cells: [
      { stars: 4, note: "Risk-aware MFA + signals" },
      { stars: 5, note: "Adaptive MFA + Verify" },
      { stars: 5, note: "PingID, FIDO2, biometric" },
      { stars: 5, note: "Authenticator + Windows Hello" },
      { stars: 4, note: "Verify with risk scoring" },
      { stars: 3, note: "Adaptive MFA in suite" },
      { stars: 4, note: "Defender + Authenticator" },
      { stars: 4, note: "Built-in MFA + push" },
    ],
  },
  {
    label: "Privileged Access (PAM / CPAM)",
    type: "stars",
    cells: [
      { stars: 4, note: "Cloud PAM converged with IGA, JIT" },
      { stars: 2, note: "Partner-led (CyberArk, Delinea)" },
      { stars: 2, note: "Partner-led" },
      { stars: 3, note: "Entra PIM, basic JIT" },
      { stars: 4, note: "Privileged Identity Mgr included" },
      { stars: 3, note: "PAM in Oracle estate" },
      { stars: 5, note: "Safeguard PAM in platform" },
      { stars: 2, note: "Basic privileged controls" },
    ],
  },
  {
    label: "Lifecycle Management",
    type: "stars",
    cells: [
      { stars: 5, note: "ML-driven joiner / mover / leaver" },
      { stars: 5, note: "Lifecycle Mgmt + SCIM" },
      { stars: 4, note: "Strong HR-driven provisioning" },
      { stars: 4, note: "Entra Provisioning + Workday" },
      { stars: 4, note: "Audit-grade lifecycle" },
      { stars: 3, note: "Strong in Oracle HCM" },
      { stars: 4, note: "Identity Manager workflows" },
      { stars: 3, note: "Directory-driven provisioning" },
    ],
  },
  {
    label: "Zero Trust + Conditional Access",
    type: "stars",
    cells: [
      { stars: 4, note: "Risk-aware access reviews & policy" },
      { stars: 4, note: "Identity Threat Protection" },
      { stars: 4, note: "PingOne Protect risk signals" },
      { stars: 5, note: "Best-in-class Conditional Access" },
      { stars: 4, note: "Adaptive Access + Trusteer" },
      { stars: 3, note: "Adaptive access in suite" },
      { stars: 3, note: "OneLogin adaptive auth" },
      { stars: 3, note: "Conditional access policies" },
    ],
  },
  {
    label: "Converged Platform Breadth",
    type: "stars",
    cells: [
      { stars: 5, note: "Single converged Identity Cloud" },
      { stars: 3, note: "AM-strong, IGA via partners" },
      { stars: 3, note: "AM + CIAM, governance via partners" },
      { stars: 3, note: "Broad but modular SKUs" },
      { stars: 4, note: "Broad enterprise suite" },
      { stars: 3, note: "Suite within Oracle stack" },
      { stars: 4, note: "IAM + PAM in one vendor" },
      { stars: 2, note: "Directory + SSO + MDM" },
    ],
  },
  {
    label: "Time-to-Value / Connectors",
    type: "stars",
    cells: [
      { stars: 5, note: "1,000+ pre-built connectors, fast deploy" },
      { stars: 5, note: "7,000+ integrations" },
      { stars: 3, note: "Higher integration effort" },
      { stars: 4, note: "Fast in M365 estates" },
      { stars: 2, note: "Longer enterprise rollout" },
      { stars: 2, note: "Connector complexity" },
      { stars: 3, note: "Moderate effort" },
      { stars: 4, note: "Fast for SMB estates" },
    ],
  },
  {
    label: "UAE Compliance (NESA, PDPL, CBUAE)",
    type: "stars",
    cells: [
      { stars: 5, note: "Continuous controls & audit-ready reporting" },
      { stars: 4, note: "Strong audit + reporting" },
      { stars: 4, note: "Deep regulated-industry fit" },
      { stars: 4, note: "Native to UAE M365 estates" },
      { stars: 5, note: "Compliance-first heritage" },
      { stars: 3, note: "Strong in Oracle gov estates" },
      { stars: 4, note: "On-prem sovereign options" },
      { stars: 3, note: "Good for SMB compliance" },
    ],
  },
  {
    label: "5-Year TCO (5,000 users)",
    type: "stars",
    cells: [
      { stars: 4, note: "Competitive cloud pricing, fewer add-ons" },
      { stars: 3, note: "Premium per-user pricing" },
      { stars: 3, note: "Higher, hybrid licensing" },
      { stars: 5, note: "Lowest if M365 E5 on contract" },
      { stars: 3, note: "Premium, enterprise tiers" },
      { stars: 3, note: "Licensing complexity" },
      { stars: 4, note: "Mid-market friendly" },
      { stars: 5, note: "Lowest for SMB" },
    ],
  },
  {
    label: "Best Suited For",
    type: "text",
    cells: [
      "SaaS-heavy & multi-cloud estates needing converged IGA + PAM + TPAG with strong SoD",
      "Multi-cloud, multi-SaaS, vendor-neutral procurement",
      "Banking, telco, hybrid workforce + customer IAM",
      "Microsoft 365 / Azure estates, ministries on E5/G5",
      "Government, financial services, deep compliance",
      "Oracle ERP / database-heavy estates",
      "Mid-market wanting IAM + PAM in one vendor",
      "SMBs & growing firms needing cloud-first simplicity",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      { recommended: true, text: "Converged, cloud-native identity governance with best-in-class SoD, ML-driven reviews, TPAG and CIEM in a single platform. The default pick for governance-led, SaaS-heavy estates." },
      { recommended: true, text: "Vendor-neutral, 7,000+ app catalogue, fastest SaaS time-to-value. For heterogeneous environments." },
      { recommended: true, text: "Deepest federation, hybrid flexibility, workforce plus CIAM on one platform. For banking and telco." },
      { text: "Bundled with M365, deepest AD integration, market-leading Conditional Access. The pick for Microsoft-aligned estates." },
      { text: "Deepest audit trail and SIEM integration. The pick for compliance-heavy regulated environments." },
      { text: "Native fit for Oracle ERP and database estates where connector complexity matters." },
      { text: "Unique IAM + PAM combination and AD bridge. A consolidation play at mid-market value." },
      { text: "Directory, SSO, MFA and device management in one cloud platform for SMBs." },
    ],
  },
];

/* ───────── GARTNER-STYLE FEATURE RATINGS ───────── */

const featureVendors = [
  "Saviynt",
  "Okta",
  "Ping Identity",
  "Microsoft Entra ID",
  "IBM Security",
  "Oracle Identity",
  "One Identity",
  "JumpCloud",
];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "Identity Governance (IGA)",
    cells: [
      { tier: "best", note: "Cloud-native IGA reference" },
      { tier: "veryStrong", note: "Lifecycle Mgmt + partner IGA" },
      { tier: "veryStrong", note: "Partner-led, deep federation" },
      { tier: "veryStrong", note: "Entra ID Governance (SKU)" },
      { tier: "excellent", note: "Identity Governance, audit-deep" },
      { tier: "excellent", note: "Strong Oracle role models" },
      { tier: "excellent", note: "Identity Manager, mature" },
      { tier: "good", note: "Limited governance depth" },
    ],
  },
  {
    label: "Application Access Governance & SoD",
    cells: [
      { tier: "best", note: "Cross-app SoD: SAP, Oracle, Workday" },
      { tier: "good", note: "Partner IGA required" },
      { tier: "good", note: "Partner-led" },
      { tier: "good", note: "Coarse-grained" },
      { tier: "veryStrong", note: "Audit-strong" },
      { tier: "veryStrong", note: "Strong inside Oracle apps" },
      { tier: "strong", note: "Moderate SoD" },
      { tier: "good", note: "Not a focus" },
    ],
  },
  {
    label: "AI / ML Access Intelligence",
    cells: [
      { tier: "best", note: "Native identity analytics" },
      { tier: "veryStrong", note: "Identity Threat Protection" },
      { tier: "strong", note: "PingOne Protect" },
      { tier: "veryStrong", note: "Copilot + risk engine" },
      { tier: "veryStrong", note: "QRadar analytics" },
      { tier: "good", note: "Emerging" },
      { tier: "good", note: "Basic analytics" },
      { tier: "good", note: "Limited" },
    ],
  },
  {
    label: "Third-Party Access Governance (TPAG)",
    cells: [
      { tier: "best", note: "Purpose-built TPAG module" },
      { tier: "veryStrong", note: "Auth0 partner identity" },
      { tier: "veryStrong", note: "Federation-strong" },
      { tier: "veryStrong", note: "Entra External ID / B2B" },
      { tier: "strong", note: "Limited dedicated TPAG" },
      { tier: "good", note: "Limited" },
      { tier: "good", note: "Limited" },
      { tier: "good", note: "Basic guest access" },
    ],
  },
  {
    label: "Cloud Entitlements (CIEM / CPAM)",
    cells: [
      { tier: "best", note: "Cloud PAM + entitlement governance" },
      { tier: "strong", note: "Via partners" },
      { tier: "strong", note: "Via partners" },
      { tier: "veryStrong", note: "Entra Permissions Mgmt" },
      { tier: "veryStrong", note: "Cloud entitlement controls" },
      { tier: "strong", note: "Within OCI" },
      { tier: "strong", note: "Safeguard scope" },
      { tier: "good", note: "Limited" },
    ],
  },
  {
    label: "Single Sign-On (SSO)",
    cells: [
      { tier: "veryStrong", note: "Cloud-first, IdP-integrated" },
      { tier: "best", note: "7,000+ pre-built apps" },
      { tier: "best", note: "Deepest federation" },
      { tier: "best", note: "Native to M365 estate" },
      { tier: "excellent", note: "Mature enterprise SSO" },
      { tier: "veryStrong", note: "Strong in Oracle stack" },
      { tier: "excellent", note: "Strong AD bridge" },
      { tier: "excellent", note: "Solid cloud SSO" },
    ],
  },
  {
    label: "Multi-Factor Authentication",
    cells: [
      { tier: "veryStrong", note: "Risk-aware MFA + signals" },
      { tier: "best", note: "Adaptive MFA + Verify" },
      { tier: "excellent", note: "PingID + FIDO2 + biometric" },
      { tier: "best", note: "Authenticator + Hello + Passkeys" },
      { tier: "excellent", note: "Verify with risk scoring" },
      { tier: "veryStrong", note: "Adaptive MFA" },
      { tier: "excellent", note: "Defender + Authenticator" },
      { tier: "excellent", note: "Built-in MFA + push" },
    ],
  },
  {
    label: "Privileged Access (PAM)",
    cells: [
      { tier: "veryStrong", note: "Cloud PAM converged with IGA" },
      { tier: "good", note: "Partner-led (CyberArk)" },
      { tier: "good", note: "Partner-led" },
      { tier: "good", note: "Entra PIM, basic JIT" },
      { tier: "best", note: "Privileged Identity Mgr included" },
      { tier: "strong", note: "PAM in Oracle estate" },
      { tier: "best", note: "Safeguard PAM in platform" },
      { tier: "good", note: "Basic privileged controls" },
    ],
  },
  {
    label: "Lifecycle & Provisioning",
    cells: [
      { tier: "best", note: "ML-driven JML + connectors" },
      { tier: "best", note: "Lifecycle Mgmt + SCIM 2.0" },
      { tier: "excellent", note: "HR-driven provisioning" },
      { tier: "veryStrong", note: "Entra Provisioning + Workday" },
      { tier: "excellent", note: "Audit-grade lifecycle" },
      { tier: "veryStrong", note: "Strong in Oracle HCM" },
      { tier: "excellent", note: "Identity Manager workflows" },
      { tier: "veryStrong", note: "Directory-driven" },
    ],
  },
  {
    label: "Zero Trust + Conditional Access",
    cells: [
      { tier: "veryStrong", note: "Risk-aware access reviews" },
      { tier: "excellent", note: "Identity Threat Protection" },
      { tier: "excellent", note: "PingOne Protect" },
      { tier: "best", note: "Best-in-class Conditional Access" },
      { tier: "veryStrong", note: "Adaptive Access + Trusteer" },
      { tier: "strong", note: "Adaptive access in suite" },
      { tier: "veryStrong", note: "OneLogin adaptive auth" },
      { tier: "strong", note: "Conditional access policies" },
    ],
  },
  {
    label: "Customer IAM (CIAM)",
    cells: [
      { tier: "strong", note: "Workforce + B2B governance focus" },
      { tier: "excellent", note: "Auth0 / Customer Identity" },
      { tier: "best", note: "PingOne CIAM, mature" },
      { tier: "good", note: "Entra External ID" },
      { tier: "veryStrong", note: "Verify Customer growing" },
      { tier: "strong", note: "Within Oracle stack" },
      { tier: "good", note: "Limited CIAM focus" },
      { tier: "good", note: "Workforce-oriented" },
    ],
  },
  {
    label: "Hybrid / On-Prem Deployment",
    cells: [
      { tier: "veryStrong", note: "Cloud-first, hybrid agents" },
      { tier: "strong", note: "SaaS-only" },
      { tier: "best", note: "Hybrid + on-prem options" },
      { tier: "strong", note: "Hybrid via AD FS / Connect" },
      { tier: "excellent", note: "Deep on-prem heritage" },
      { tier: "excellent", note: "Strong on-prem in Oracle" },
      { tier: "excellent", note: "On-prem + SaaS flexible" },
      { tier: "strong", note: "Cloud-delivered" },
    ],
  },
  {
    label: "Converged Platform Breadth",
    cells: [
      { tier: "best", note: "IGA + PAM + CIEM + TPAG in one" },
      { tier: "strong", note: "AM-strong, IGA via partners" },
      { tier: "strong", note: "AM + CIAM" },
      { tier: "veryStrong", note: "Broad, modular SKUs" },
      { tier: "veryStrong", note: "Broad enterprise suite" },
      { tier: "strong", note: "Within Oracle stack" },
      { tier: "veryStrong", note: "IAM + PAM in one" },
      { tier: "good", note: "Directory + SSO + MDM" },
    ],
  },
  {
    label: "Total Cost of Ownership",
    cells: [
      { tier: "veryStrong", note: "Competitive, fewer add-ons" },
      { tier: "strong", note: "Premium per-user pricing" },
      { tier: "strong", note: "Higher, hybrid licensing" },
      { tier: "best", note: "Lowest if M365 E5 on contract" },
      { tier: "strong", note: "Premium, enterprise tiers" },
      { tier: "strong", note: "Licensing complexity" },
      { tier: "veryStrong", note: "Mid-market friendly" },
      { tier: "best", note: "Lowest for SMB" },
    ],
  },
];

const tierStyles: Record<Tier, { bg: string; text: string; label: string }> = {
  best: { bg: "bg-emerald-600", text: "text-white", label: "Best in class" },
  excellent: { bg: "bg-emerald-500", text: "text-white", label: "Excellent" },
  veryStrong: { bg: "bg-emerald-200", text: "text-emerald-900", label: "Very strong" },
  strong: { bg: "bg-amber-200", text: "text-amber-900", label: "Strong" },
  good: { bg: "bg-amber-100", text: "text-amber-900", label: "Good" },
  moderate: { bg: "bg-amber-100", text: "text-amber-900", label: "Moderate" },
};

/* ───────── FAQS ───────── */

const faqs = [
  {
    question: "What is Identity & Access Management (IAM)?",
    answer:
      "IAM is the discipline that answers three questions for every request on every system: who are you, should you be here, and what can you touch. Modern IAM is a layered security architecture spanning identity creation, authentication, authorisation, governance, privileged access, and Zero Trust monitoring. Each layer builds on the one below.",
  },
  {
    question: "Why is identity considered the new perimeter?",
    answer:
      "More than 80 percent of breaches now involve compromised credentials or misused access rights. With remote work, SaaS proliferation, and machine-to-machine traffic exploding, the network perimeter has effectively dissolved. Identity is what every request authenticates against and what every audit checks. Treating identity as the primary control plane (Zero Trust) is materially more effective than perimeter-only defence.",
  },
  {
    question: "What is the difference between Access Management, IGA, and PAM?",
    answer:
      "Access Management handles the front door: SSO, MFA, conditional access, passwordless. IGA handles the lifecycle: who got what access, when, why, and whether it is still appropriate. PAM handles the highest-risk accounts: vaulting, just-in-time elevation, session recording, and credential rotation for Domain Admin, root, service, and machine accounts. A complete IAM programme requires all three.",
  },
  {
    question: "Microsoft Entra ID, Okta, or Ping Identity, which should we pick?",
    answer:
      "Pick Microsoft Entra ID if you are already invested in Microsoft 365 or Azure: it is bundled in your licensing, deeply integrated with Teams, SharePoint, and Defender, and has the strongest Conditional Access policy engine. Pick Okta when neutrality, multi-cloud posture, and the deepest SaaS app catalogue (7,000+ connectors) matter most. Pick Ping Identity when you need workforce and customer (CIAM) identity on one platform with deep federation and FAPI-grade open banking support.",
  },
  {
    question: "Do we still need MFA if we have strong passwords?",
    answer:
      "Yes. Modern password-cracking tools can break a typical weak password in around 30 seconds. Even strong passwords get phished, reused, or stolen in breaches. Microsoft research shows MFA blocks 99.9 percent of automated account compromise attacks. Passwords alone are no longer a credible authentication control for any system worth securing.",
  },
  {
    question: "What is passwordless authentication?",
    answer:
      "Passwordless authentication replaces the password with something stronger: biometrics (fingerprint, face), hardware security keys (YubiKey, Feitian), or device-bound passkeys (FIDO2). The user signs in with a single tap or glance, and the cryptographic proof is phish-resistant by design. Passwordless is more secure and more usable than passwords plus MFA, which is why every major vendor is pushing it as the default for new deployments.",
  },
  {
    question: "How does IGA differ from regular access management?",
    answer:
      "Access management makes the decision at the moment of login. IGA continuously reviews whether that access is still appropriate. IGA includes joiner / mover / leaver workflows, periodic access certification, segregation of duties policies, and the audit trail regulators ask for. Without IGA, access accumulates as people move between roles and quietly becomes the next audit finding or insider breach.",
  },
  {
    question: "How long does an IAM rollout take?",
    answer:
      "Workforce SSO and MFA on a SaaS platform deploy in 4 to 8 weeks for a mid-sized estate. IGA programmes typically run 6 to 12 months because access certification, role mining, and SoD policy design require business-side involvement. PAM rollouts depend on scope: a focused vault for Domain Admin and 50 critical service accounts can be in production in 8 to 12 weeks; a full estate rollout including OT and database secrets is a 12-to-18-month programme.",
  },
];

/* ───────── HERO ───────── */

function IamHero() {
  const { open: openContact } = useContactModal();
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-navy-deep">
      <div aria-hidden="true" className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/network-security.jpg')" }} />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/70 to-navy-deep/90" />

      <div className="relative z-10 border-b border-white/5">
        <div className="shell flex w-full items-center justify-end gap-4 pt-24 pb-3 sm:pt-28">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center justify-end gap-2 text-[10px] text-slate-400 sm:text-[11px]">
              <li><Link to="/" className="transition-colors hover:text-white">Home</Link></li>
              <li className="text-slate-600">/</li>
              <li><Link to="/cybersecurity" className="transition-colors hover:text-white">Cybersecurity</Link></li>
              <li className="text-slate-600">/</li>
              <li><Link to="/cybersecurity/identity-access-security" className="transition-colors hover:text-white">Identity & Access Security</Link></li>
              <li className="text-slate-600">/</li>
              <li><span className="font-medium text-[#28B5E1]">Identity & Access Management (IAM)</span></li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="shell relative z-10 flex w-full flex-1 items-center py-10 sm:py-12 lg:py-14">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="w-full">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#28B5E1] sm:text-xs">
            Identity & Access Management
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-5xl lg:text-[3.5rem]">
            Identity &amp; Access Management <span className="gradient-text">UAE</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              The foundation of modern identity security
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Artiflex IT designs, deploys and manages enterprise identity platforms across the UAE, Oman and Saudi Arabia. Microsoft, Okta, Ping Identity, IBM Security, Oracle, One Identity, Saviynt and JumpCloud, picked on workload, compliance scope and stack alignment, not vendor preference.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
            <a href="#vendor-matrix" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base">
              Vendor Comparison
            </a>
            <a href="#gartner-comparison" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base">
              Gartner Style Review
            </a>
            <Link to="/blog/origin-identity-access-management" className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-[#28B5E1]/40 bg-[#28B5E1]/10 px-6 py-3 text-sm font-semibold text-[#28B5E1] backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1] hover:bg-[#28B5E1]/20 hover:text-white sm:px-7 sm:py-3.5 sm:text-base">
              Read Origin Story
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </Link>
            <button onClick={openContact} className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base">
              Get a Free IAM Assessment
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </button>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 flex justify-center pb-8">
        <div aria-hidden="true" className="flex flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-[0.32em] text-slate-500">
          <span>Continue</span>
          <span className="h-8 w-px bg-gradient-to-b from-[#28B5E1]/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* ───────── PAGE ───────── */

export default function IdentityAccessManagement() {
  const [openLayer, setOpenLayer] = useState<number | null>(0);
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Identity &amp; Access Management UAE | IAM, SSO, MFA &amp; Lifecycle | Artiflex IT</title>
        <meta
          name="description"
          content="Identity & Access Management (IAM) for UAE enterprises. Compare Microsoft Entra, Okta, Ping Identity, IBM Security, Oracle, One Identity, Saviynt & JumpCloud. Vendor matrix, Gartner-style scorecard, NESA / PDPL / CBUAE ready. Free IAM assessment."
        />
        <link rel="canonical" href="https://artiflexit.com/cybersecurity/identity-access-security/iam" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Artiflex IT",
            url: "https://artiflexit.com/cybersecurity/identity-access-security/iam",
            areaServed: [
              { "@type": "Country", name: "United Arab Emirates" },
              { "@type": "City", name: "Dubai" },
              { "@type": "City", name: "Abu Dhabi" },
            ],
            description:
              "Enterprise Identity & Access Management services in the UAE: SSO, MFA, identity lifecycle automation and Zero Trust conditional access across Microsoft Entra, Okta, Ping Identity, IBM Security, Oracle, One Identity, Saviynt and JumpCloud.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Identity & Access Management Services",
            provider: { "@type": "Organization", name: "Artiflex IT" },
            areaServed: { "@type": "Country", name: "United Arab Emirates" },
            description:
              "Identity & Access Management for the UAE: SSO, MFA, identity lifecycle and Zero Trust conditional access. Vendor-neutral selection across Microsoft Entra ID, Okta, Ping Identity, IBM Security, Oracle, One Identity, Saviynt, and JumpCloud.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Recommended IAM Platforms for UAE Businesses",
            itemListElement: vendors.map((v, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <IamHero />

      {/* WHAT IS IAM (INTRO) */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              Start Here
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              What is Identity &amp; Access Management?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Identity &amp; Access Management (IAM) is the security discipline that ensures the right
              people and machines have the right access to the right resources at the right time, and
              nothing more. It governs how identities are created, authenticated, authorised, reviewed
              and retired across every application, cloud and system in your estate.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:mt-12 md:grid-cols-2">
            <div className="rounded-2xl border border-border-light bg-slate-50 p-6 sm:p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#28B5E1]/10 text-[#1B8AC7]">
                <AlertTriangleIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-900">
                Why does an organisation need IAM?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Most breaches start with a compromised or over-privileged identity. As estates grow
                across cloud, SaaS and on-premises, manual access management becomes impossible to
                audit and easy to abuse. IAM shrinks that attack surface, enforces least privilege,
                automates joiner-mover-leaver processes, and produces the evidence regulators such as
                NESA, PDPL and CBUAE expect, while removing day-to-day access friction for users.
              </p>
            </div>
            <div className="rounded-2xl border border-border-light bg-slate-50 p-6 sm:p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#28B5E1]/10 text-[#1B8AC7]">
                <GearIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-900">
                How Artiflex approaches it
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                We start with your stack, your audit scope, and the identity types you have to govern,
                then map the right platform to the requirement. For organisations standardising on
                converged, cloud-native identity governance, Artiflex recommends{" "}
                <strong className="font-semibold text-slate-900">Saviynt</strong> as the reference
                platform, complemented by Microsoft Entra, Okta or Ping Identity where the workload
                demands it.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ───────── WHAT IAM COVERS (BUILDING BLOCKS) ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              The Building Blocks
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              What IAM covers
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              IAM is not a single product. It is a set of complementary disciplines that can be adopted
              together as a complete programme or individually as point solutions. Here is what each
              discipline does, and the capabilities to look for.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
            {iamBuildingBlocks.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#28B5E1]/40 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#28B5E1]/10 text-[#1B8AC7] transition-colors group-hover:bg-[#28B5E1]/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-slate-900">{b.title}</h3>
                  <ul className="mt-3 space-y-2">
                    {b.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
                        <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-[3px] bg-[#1B8AC7]" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── IAM VENDORS WE DELIVER (HONEYCOMB) ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #1B8AC7 1px, transparent 1px), linear-gradient(to bottom, #1B8AC7 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#1B8AC7]/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-[#28B5E1]/10 blur-3xl"
        />

        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              The Vendor Lineup
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
              IAM{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Vendors
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The Identity & Access Management platforms we design, deploy and manage across UAE environments. The conversation starts with your stack, your audit scope, and the identity types you have to govern.
            </p>
          </div>

          <div className="mt-14 hidden flex-col items-center lg:flex">
            {(() => {
              const layouts: Record<number, number[]> = {
                1: [1], 2: [2], 3: [3], 4: [3, 1], 5: [3, 2],
                6: [3, 3], 7: [4, 3], 8: [4, 4], 9: [5, 4],
                10: [5, 5], 11: [6, 5], 12: [6, 6],
              };
              const sizes =
                layouts[iamVendorList.length] ??
                [Math.ceil(iamVendorList.length / 2), Math.floor(iamVendorList.length / 2)];
              const rows: typeof iamVendorList[] = [];
              let i = 0;
              sizes.forEach((s) => {
                rows.push(iamVendorList.slice(i, i + s));
                i += s;
              });
              const HEX_PATH =
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
              return rows.map((row, rowIdx) => (
                <div
                  key={rowIdx}
                  className="flex"
                  style={{
                    marginTop: rowIdx === 0 ? 0 : -52,
                    transform:
                      rowIdx > 0 && rows[rowIdx - 1].length === row.length
                        ? "translateX(90px)"
                        : undefined,
                  }}
                >
                  {row.map((v) => (
                    <Link
                      key={v.slug}
                      to={`/cybersecurity/iam/${v.slug}`}
                      aria-label={v.name}
                      className="group relative block h-[208px] w-[180px] transition-all duration-300 hover:z-10 hover:scale-[1.06] [filter:drop-shadow(0_4px_12px_rgba(15,23,42,0.10))] hover:[filter:drop-shadow(0_10px_30px_rgba(40,181,225,0.45))]"
                    >
                      <div
                        className="absolute inset-0 bg-slate-200/80 transition-colors duration-300 group-hover:bg-[#28B5E1]"
                        style={{ clipPath: HEX_PATH }}
                      />
                      <div
                        className="absolute inset-[2px] bg-white transition-all duration-300 group-hover:bg-gradient-to-b group-hover:from-[#28B5E1]/[0.08] group-hover:to-white"
                        style={{ clipPath: HEX_PATH }}
                      />
                      <div className="relative flex h-full flex-col items-center justify-center px-5 text-center">
                        {v.logo ? (
                          <img
                            src={v.logo}
                            alt={v.name}
                            loading="lazy"
                            className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-110"
                          />
                        ) : (
                          <span className="px-2 text-center font-display text-sm font-semibold leading-tight text-slate-900">
                            {v.name}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ));
            })()}
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:hidden">
            {iamVendorList.map((v) => (
              <Link
                key={v.slug}
                to={`/cybersecurity/iam/${v.slug}`}
                className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/50 hover:shadow-md"
              >
                {v.logo ? (
                  <img
                    src={v.logo}
                    alt={v.name}
                    loading="lazy"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      img.style.display = "none";
                      const fb = img.nextElementSibling as HTMLElement | null;
                      if (fb) fb.style.removeProperty("display");
                    }}
                    className="h-12 w-12 object-contain"
                  />
                ) : null}
                <p
                  className="font-display text-[11px] font-semibold leading-tight text-slate-900"
                  style={{ display: v.logo ? "none" : "block" }}
                >
                  {v.name}
                </p>
              </Link>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-slate-500">
            <span className="font-semibold text-slate-700">
              {iamVendorList.length} platforms
            </span>
            , picked by stack alignment, compliance scope, and identity types.
          </p>
        </div>
      </section>

      {/* ───────── SIX-LAYER IAM MODEL ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.06),transparent_60%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              How IAM Works
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              The Six-Layer IAM Model
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              IAM is not a single product. It is a layered architecture where each layer builds on the one below. You cannot skip layers, each one is a prerequisite for the next.
            </p>
          </div>

          <div className="mt-12 grid items-start gap-4 sm:mt-16 sm:gap-5 md:grid-cols-3">
            {iamLayers.map((l, idx) => {
              const isOpen = openLayer === idx;
              const Icon = l.icon;
              return (
                <div
                  key={l.title}
                  tabIndex={0}
                  onMouseEnter={() => setOpenLayer(idx)}
                  onMouseLeave={() =>
                    setOpenLayer((prev) => (prev === idx ? null : prev))
                  }
                  onFocus={() => setOpenLayer(idx)}
                  onBlur={() =>
                    setOpenLayer((prev) => (prev === idx ? null : prev))
                  }
                  onClick={() =>
                    setOpenLayer((prev) => (prev === idx ? null : idx))
                  }
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm outline-none transition-all duration-300 hover:-translate-y-1 hover:border-[#28B5E1]/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#28B5E1]/40 sm:p-5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full border border-[#1B8AC7]/20 bg-[#1B8AC7]/[0.06] px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1B8AC7]">
                      {l.tag}
                    </span>
                  </div>
                  <div className="mt-3 flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#28B5E1]/10 text-[#1B8AC7]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-base font-semibold text-slate-900 sm:text-lg">
                        {l.title}
                      </h3>
                      <p className="mt-0.5 text-[12px] italic text-slate-500">
                        {l.desc}
                      </p>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 border-t border-slate-200 pt-3 text-xs leading-relaxed text-slate-600">
                          {l.details}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── PRINCIPLE QUOTE ───────── */}
      <section className="relative bg-slate-50 pb-16 sm:pb-24">
        <div className="shell">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#04101E] via-[#06182B] to-[#0A3D6B] p-8 shadow-lg shadow-slate-900/15 sm:p-12">
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#28B5E1] to-[#1B8AC7]"
            />
            <span
              aria-hidden="true"
              className="absolute -left-2 -top-4 font-display text-7xl font-bold leading-none text-[#28B5E1]/20 sm:-left-3 sm:-top-6 sm:text-8xl"
            >
              &ldquo;
            </span>
            <blockquote className="relative">
              <p className="font-display text-xl italic leading-snug text-white sm:text-2xl md:text-[1.75rem]">
                Identity is the new perimeter. Every breach, every ransomware attack, every data exfiltration event in the last decade traces back to one thing: an identity that was compromised, misconfigured, or over-privileged. Fix identity and you fix the foundation.
              </p>
              <footer className="mt-6 flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 bg-[#28B5E1]" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#28B5E1] sm:text-[11px]">
                  The principle behind every IAM investment
                </span>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>
      {/* ───────── VENDOR COMPARISON FOR UAE BUYERS ───────── */}
      <section
        id="vendor-matrix"
        className="relative bg-white py-16 scroll-mt-20 sm:py-24"
      >
        <div className="shell">
          <div className="mb-10 text-center sm:mb-12 md:mb-16">
            <h2 className="mx-auto max-w-3xl font-display text-2xl font-bold tracking-tight text-heading sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              Vendor comparison for{" "}
              <span className="gradient-text">IAM buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              We do not believe one IAM platform wins everything. We do believe the right platform for your environment usually wins by a meaningful margin once your stack, compliance scope, and identity types are honestly assessed. Artiflex suggests the solution that best fits your needs.
            </p>
          </div>

          <div className="mt-8 flex justify-center sm:mt-10">
            <button
              onClick={openContact}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base"
            >
              Talk to an IAM Specialist
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + matrixVendors.length * 116) }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-5 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">
                      Criteria
                    </th>
                    {matrixVendors.map((v) => (
                      <th
                        key={v.name}
                        className="border-l border-white/15 px-2 py-3 sm:px-4 sm:py-5 align-bottom"
                      >
                        {v.recommended && (
                          <span className="mb-1.5 inline-flex items-center gap-1 rounded-full border border-emerald-300/40 bg-emerald-400/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-100">
                            ✓ Recommended
                          </span>
                        )}
                        <p className="font-display text-sm font-semibold text-white sm:text-base">
                          {v.name}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrixRows.map((row, rIdx) => (
                    <tr
                      key={row.label}
                      className={`transition-colors ${
                        row.type === "verdict"
                          ? "border-t-2 border-[#28B5E1]/30 bg-gradient-to-r from-[#04101E] to-[#0A3D6B]"
                          : `border-t border-[#0A3D6B]/20 hover:bg-[#28B5E1]/[0.04] ${
                              rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                            }`
                      }`}
                    >
                      <th
                        scope="row"
                        className={`sticky left-0 z-10 px-2 py-3 align-middle sm:px-4 sm:py-4 font-display text-sm font-semibold ${
                          row.type === "verdict"
                            ? "bg-[#04101E] uppercase tracking-wider text-[#28B5E1]"
                            : `${rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"} text-slate-900`
                        }`}
                      >
                        {row.label}
                      </th>
                      {row.cells.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`px-4 py-4 align-middle ${
                            row.type === "verdict"
                              ? "border-l border-white/10 text-slate-300"
                              : "border-l border-[#0A3D6B]/20 text-slate-700"
                          }`}
                        >
                          {row.type === "stars" ? (
                            <div>
                              <span aria-label={`${(cell as StarCell).stars} out of 5`} className="text-amber-500">
                                {"★".repeat((cell as StarCell).stars)}
                                <span className="text-slate-300">
                                  {"★".repeat(5 - (cell as StarCell).stars)}
                                </span>
                              </span>
                              <p className="mt-1 text-xs leading-snug text-slate-600">
                                {(cell as StarCell).note}
                              </p>
                            </div>
                          ) : row.type === "verdict" ? (
                            <div className="space-y-1.5">
                              {(cell as VerdictCell).recommended && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                                  ✓ Recommended
                                </span>
                              )}
                              <p className="text-xs leading-relaxed text-slate-300">
                                {(cell as VerdictCell).text}
                              </p>
                            </div>
                          ) : (
                            <p className="text-xs leading-snug text-slate-700">
                              {cell as string}
                            </p>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── DETAILED VENDOR CARDS + GARTNER SCORECARD ───────── */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Detailed Comparison on IAM Vendors
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Strengths, blind spots, and the buyer profile each vendor was built for. Recommendations are based on UAE deployment patterns, not vendor tier.
            </p>
          </div>

          <div className="mt-6 flex justify-center sm:mt-8">
            <button
              onClick={openContact}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base"
            >
              Talk to a Specialist
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:mt-16 lg:grid-cols-2 lg:items-stretch">
            {vendors.map((v, idx) => {
              const recommended = v.best.includes("Recommended");
              return (
                <motion.div
                  key={v.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="flex h-full"
                >
                  <Link
                    to={`/cybersecurity/iam/${v.slug}`}
                    aria-label={`View details for ${v.name}`}
                    className={`group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(4,88,145,0.12)] sm:p-8 ${
                      recommended
                        ? "border-brand-blue/30 shadow-[0_4px_20px_rgba(27,138,199,0.10)]"
                        : "border-border-light shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-brand-blue/25"
                    }`}
                  >
                    {recommended && (
                      <span
                        className="absolute -top-px left-6 inline-flex rounded-b-md bg-brand-blue px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white"
                        aria-label="Recommended vendor"
                      >
                        Recommended
                      </span>
                    )}

                    <div className="flex items-start justify-between gap-4 pt-3">
                      <div className="min-w-0">
                        <h3 className="font-display text-xl font-bold text-heading transition-colors group-hover:text-brand-blue sm:text-2xl">
                          {v.name}
                        </h3>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-brand-blue">
                          {v.best}
                        </p>
                      </div>
                      <img
                        src={v.logo}
                        alt={`${v.name} logo`}
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                        className="h-10 w-24 shrink-0 object-contain object-right sm:h-12 sm:w-32"
                      />
                    </div>

                    <div className="mt-5 space-y-3">
                      <div>
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                          Why it wins
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-body">
                          {v.strength}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                          Consider
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-body/80">
                          {v.watch}
                        </p>
                      </div>
                    </div>

                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-xs font-semibold text-brand-blue transition-all group-hover:gap-2.5 sm:text-sm">
                      View {v.name.split(" ")[0]} details
                      <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="mx-auto mt-12 max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-br from-[#0A3D6B] via-[#04101E] to-[#020617] p-8 text-center shadow-xl shadow-[#1B8AC7]/10 sm:p-12">
            <p className="text-base leading-relaxed text-slate-300 sm:text-lg md:text-xl text-white">
              <span className="font-semibold text-white">Artiflex IT delivers Microsoft, Okta, Ping Identity, IBM Security, Oracle, One Identity, Saviynt and JumpCloud</span> across UAE identity programmes. <br />
              <span className="text-xs italic text-white sm:text-base">The vendor follows the assessment, not the other way around.</span>
            </p>
          </div>

          {/* Feature ratings */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Comparison
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each vendor is rated across IAM capabilities using a standardised tier scale. A gold ★ marker denotes best-in-class performance for that specific capability.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-[#0A3D6B]/40 bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse text-center text-sm" style={{ minWidth: Math.max(640, 150 + featureVendors.length * 116) }}>
                <thead>
                  <tr className="bg-gradient-to-r from-[#045891] to-[#1B8AC7]">
                    <th className="sticky left-0 z-10 w-[18%] bg-[#045891] px-2 py-3 sm:px-4 sm:py-5 align-bottom font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9CD6EE]">
                      Capability
                    </th>
                    {featureVendors.map((v) => (
                      <th
                        key={v}
                        className="border-l border-white/15 px-2 py-3 sm:px-4 sm:py-5 align-bottom font-display text-sm font-semibold text-white sm:text-base"
                      >
                        {v}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {featureRows.map((row, rIdx) => (
                    <tr
                      key={row.label}
                      className={`border-t border-[#0A3D6B]/20 transition-colors hover:bg-[#28B5E1]/[0.04] ${
                        rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                      }`}
                    >
                      <th
                        scope="row"
                        className={`sticky left-0 z-10 px-2 py-3 align-middle sm:px-4 sm:py-4 font-display text-sm font-semibold text-slate-900 ${
                          rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"
                        }`}
                      >
                        {row.label}
                      </th>
                      {row.cells.map((cell, cIdx) => {
                        const t = tierStyles[cell.tier];
                        return (
                          <td
                            key={cIdx}
                            className="border-l border-[#0A3D6B]/20 px-2 py-3 sm:px-4 sm:py-4 align-middle"
                          >
                            <span
                              className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${t.bg} ${t.text}`}
                            >
                              {cell.tier === "best" && <span aria-hidden="true">★</span>}
                              {t.label}
                            </span>
                            <p className="mt-1.5 text-xs leading-snug text-slate-600">
                              {cell.note}
                            </p>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legend */}
          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-3 text-xs text-slate-600">
            <span className="font-mono uppercase tracking-wider text-slate-500">Rating scale:</span>
            {(["best", "excellent", "veryStrong", "strong", "good"] as Tier[]).map((t) => {
              const s = tierStyles[t];
              return (
                <span
                  key={t}
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${s.bg} ${s.text}`}
                >
                  {t === "best" && <span aria-hidden="true">★</span>}
                  {s.label}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── DECISION GUIDE ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(27,138,199,0.06),transparent_60%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              Decision Guide
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              How to choose your IAM platform
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Vendor selection rarely comes down to a single capability. The right platform depends on where your identities live today, which clouds you bet on, and which regulators look over your shoulder.
            </p>
          </div>

          {/* Framing questions */}
          <div className="mx-auto mt-10 max-w-5xl sm:mt-12">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#04101E] via-[#06182B] to-[#0A3D6B] p-6 shadow-lg sm:p-8">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#28B5E1]">
                Start with these questions
              </p>
              <h3 className="mt-3 font-display text-xl font-bold text-white sm:text-2xl">
                Before you compare products, get clear on your requirement
              </h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  "What is your expectation out of IAM, what business or compliance problem are you trying to solve?",
                  "Are you looking at one solution covering all IAM features, or a specific capability such as IGA or PAM only?",
                  "Where do your identities live today, Active Directory, Entra ID, HR system, or multiple clouds?",
                  "Which regulations apply to you (NESA, PDPL, CBUAE, ISO 27001) and what audit evidence do you need?",
                  "Is your priority workforce identity, customer identity (CIAM), or both?",
                  "What is your timeline, budget envelope, and in-house capacity to operate the platform?",
                ].map((q) => (
                  <li
                    key={q}
                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3"
                  >
                    <span aria-hidden="true" className="mt-0.5 font-mono text-sm font-bold text-[#28B5E1]">
                      ?
                    </span>
                    <span className="text-sm leading-relaxed text-slate-200">{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Requirement-based recommendation summary */}
          <div className="mx-auto mt-6 max-w-5xl">
            <div className="rounded-2xl border border-border-light bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-8">
              <h3 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
                How Artiflex recommends, your requirement decides, not the vendor
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Our product recommendation is based purely on what each customer actually needs.
                Whether you want a complete IAM programme or only a single capability, we map the right
                platform to your requirement.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-border-light bg-slate-50 p-5">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#1B8AC7]">
                    Complete IAM
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    If you want one programme covering SSO, MFA, ILM, IGA, PAM and Zero Trust, we design
                    a full identity fabric and select the platform mix that fits your estate and
                    compliance scope.
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                    IGA only
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    If your requirement is access certification, role mining and segregation of
                    duties, that is a dedicated discipline. See our{" "}
                    <Link
                      to="/cybersecurity/identity-access-security/iga"
                      className="font-semibold text-[#1B8AC7] underline-offset-2 hover:underline"
                    >
                      Identity Governance (IGA)
                    </Link>{" "}
                    page for vendor selection and scope.
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                    PAM only
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    If your requirement is securing administrator and service accounts, with vaulting,
                    session recording and just-in-time elevation, that is a dedicated discipline. See
                    our{" "}
                    <Link
                      to="/cybersecurity/identity-access-security/pam"
                      className="font-semibold text-[#1B8AC7] underline-offset-2 hover:underline"
                    >
                      Privileged Access (PAM)
                    </Link>{" "}
                    page for vendor selection and scope.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-6xl sm:mt-12">
            <div className="grid grid-cols-1 gap-2 sm:gap-3 md:grid-cols-2">
              {decisionGuide.map((row) => (
                <div
                  key={row.scenario}
                  tabIndex={0}
                  className="group relative flex min-h-[5rem] flex-col justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-r from-[#04101E] to-[#0A3D6B] px-4 py-3 shadow-md transition-all duration-300 hover:border-[#28B5E1]/40 hover:shadow-lg focus-within:border-[#28B5E1]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#28B5E1]/40 sm:min-h-[5.5rem] sm:px-5 sm:py-3.5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="font-display text-sm font-semibold leading-snug text-white sm:text-base">
                      {row.scenario}
                    </h4>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 shrink-0 text-[#28B5E1] transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
                        {row.recommend}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── OUR DELIVERY MODEL ───────── */}
      <section className="relative bg-surface-secondary py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="How we work"
            title={
              <>
                Our <span className="gradient-text">delivery model</span>
              </>
            }
            description="We don't sell licences, we deliver IAM outcomes: assess, design, deploy, manage. Every stage produces something an auditor can read and a CFO can sign off on."
            centered
          />

          <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-4">
            {[
              {
                title: "Assess",
                duration: "2 weeks",
                summary:
                  "Inventory of identities, groups, applications, and existing access policies. Audit of joiner / mover / leaver processes, privileged account exposure, and Zero Trust readiness.",
                deliverable:
                  "Current-state report, vendor recommendation with rationale, three-year TCO comparison.",
              },
              {
                title: "Design",
                duration: "3 to 4 weeks",
                summary:
                  "Architecture for your specific environment: SSO topology, conditional access policy framework, IGA role model, PAM scope, identity-fabric integration with HR and IT estate.",
                deliverable:
                  "Approved architecture, signed-off cutover sequence, change-management plan.",
              },
              {
                title: "Deploy",
                duration: "8 to 16 weeks",
                summary:
                  "Phased deployment with rollback procedures at every stage. Workforce SSO first, MFA enforcement, then IGA campaigns, then PAM vault. Production cutover with day-1 hypercare.",
                deliverable:
                  "Live IAM platform, audit-ready documentation, runbooks for your team.",
              },
              {
                title: "Manage",
                duration: "Ongoing",
                summary:
                  "24/7 monitoring, policy change management, certification campaign automation, PAM session review, monthly board-readable reporting, quarterly architecture reviews.",
                deliverable:
                  "Operational IAM with SLAs you can rely on. Or a clean handover to your team.",
              },
            ].map((s, idx) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-border-light bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/25 hover:shadow-[0_12px_40px_rgba(27,138,199,0.10)] sm:p-6"
              >
                <div className="flex items-baseline justify-end">
                  <span className="rounded-full border border-border-light bg-surface-secondary px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                    {s.duration}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-heading">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-body">
                  {s.summary}
                </p>
                <div className="mt-4 border-t border-border-light pt-3">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                    You get
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-body/85">
                    {s.deliverable}
                  </p>
                </div>
                {idx < 3 && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 lg:block"
                  >
                    <div className="h-px w-6 bg-gradient-to-r from-brand-blue/40 to-transparent" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── WHY ARTIFLEX IT ───────── */}
      <section className="relative overflow-hidden bg-navy-deep py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(27,138,199,0.18),transparent_60%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#28B5E1]">
              Why Artiflex IT
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              14+ years of UAE identity delivery
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when Microsoft Entra wins, when Okta wins, when Ping or IBM wins, and when none of them is the right answer. The point of an honest assessment is honest answers.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "80%", label: "Of breaches involve compromised credentials" },
              { value: "$4.9M", label: "Average cost of an identity-related breach" },
              { value: "30s", label: "Time to crack a weak password with modern tools" },
              { value: "99.9%", label: "Of account compromise attacks blocked by MFA" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-sm transition-colors duration-300 hover:border-[#28B5E1]/30"
              >
                <p className="font-display text-3xl font-bold leading-none text-white sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-slate-400 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Vendor coverage
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Microsoft Entra ID, Okta, Ping Identity, IBM Security, Oracle Identity, One Identity, Saviynt and JumpCloud, active delivery experience across all eight.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Compliance frameworks
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  NESA, UAE PDPL, CBUAE, SAMA, NCA ECC, ISO 27001 and NIST CSF 2.0 aligned implementations, with audit-ready evidence delivered as part of the project.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Coverage area
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  On-site across Dubai, Abu Dhabi, and Sharjah. Remote across the UAE, Oman, and Saudi Arabia. 24/7 identity operations bench for managed customers.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Engagement model
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Fully managed, co-managed, or assessment-only. No vendor lock-in, no theatre, no upselling. The assessment drives the answer.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#28B5E1] px-6 py-3 font-display text-sm font-semibold text-navy-deep transition-colors hover:bg-white sm:text-base"
            >
              Book a free IAM posture assessment
            </Link>
            <Link
              to="/blog/origin-identity-access-management"
              className="inline-flex items-center justify-center rounded-lg border border-white/15 px-6 py-3 font-display text-sm font-medium text-slate-300 transition-colors hover:border-[#28B5E1]/40 hover:text-white sm:text-base"
            >
              Read the full origin story →
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Knowledge Base"
            title={
              <>
                Frequently <span className="gradient-text">asked</span> questions
              </>
            }
            description="What UAE decision-makers ask us most about IAM platform selection, Zero Trust, and how to operationalise the six-layer model."
            centered
          />

          <div className="mt-12 grid gap-6 sm:mt-14 lg:grid-cols-12 lg:gap-8">
            {/* Questions list (left) */}
            <ul className="flex flex-col gap-2 lg:col-span-6">
              {faqs.map((faq, idx) => {
                const isActive = activeFaq === idx;
                return (
                  <li key={faq.question}>
                    <button
                      type="button"
                      onClick={() => setActiveFaq(idx)}
                      aria-pressed={isActive}
                      aria-controls="faq-answer-panel"
                      className={`group flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-semibold transition-all duration-200 sm:px-5 sm:text-[15px] ${
                        isActive
                          ? "border-transparent bg-gradient-to-r from-[#045891] to-[#1B8AC7] text-white shadow-[0_8px_24px_-8px_rgba(27,138,199,0.55)]"
                          : "border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-[#28B5E1]/60 hover:bg-slate-50 hover:text-[#1B8AC7]"
                      }`}
                    >
                      <span className="leading-snug">{faq.question}</span>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                          isActive ? "translate-x-0.5" : "opacity-50 group-hover:translate-x-0.5 group-hover:opacity-100"
                        }`}
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Answer panel (right) */}
            <div className="lg:col-span-6">
              <div
                id="faq-answer-panel"
                role="region"
                aria-live="polite"
                className="lg:sticky lg:top-24"
              >
                <div className="overflow-hidden rounded-2xl border border-transparent bg-gradient-to-r from-[#045891] to-[#054466] p-6 shadow-[0_18px_40px_-18px_rgba(27,138,199,0.55)] sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-white">
                      Faq
                    </span>
                    <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-white/40 to-transparent" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold leading-snug text-white sm:text-2xl">
                    {faqs[activeFaq].question}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">
                    {faqs[activeFaq].answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <CTASection
        title="Get the IAM Selection Guide"
        description="Vendor-neutral comparison across Microsoft Entra, Okta, Ping Identity, IBM Security, Oracle, One Identity, Saviynt and JumpCloud, with TCO analysis, capability scorecards, and UAE compliance mapping."
        primaryButton={{ text: "Request the Guide", action: "modal" }}
      />
    </>
  );
}
