import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import {
  LockIcon,
  ShieldIcon,
  EyeIcon,
  UsersIcon,
  ActivityIcon,
  TargetIcon,
  CheckIcon,
  AlertTriangleIcon,
  GearIcon,
} from "@/components/icons";

/* ───────── DATA ───────── */

const stats: { value: string; label: string }[] = [
  {
    value: "73%",
    label: "Of compliance failures involve improper or excessive access rights",
  },
  {
    value: "6×",
    label:
      "More likely to detect access abuse with continuous IGA monitoring vs annual reviews",
  },
  {
    value: "SOX",
    label: "HIPAA, PCI-DSS, GDPR, all require demonstrable access governance",
  },
];

type CapAccent = "cyan" | "amber" | "emerald" | "violet" | "rose" | "teal";

const capAccents: Record<CapAccent, { topBar: string; icon: string; iconBg: string }> = {
  cyan: { topBar: "from-cyan-400 to-blue-500", icon: "text-cyan-300", iconBg: "bg-cyan-400/15" },
  amber: { topBar: "from-amber-400 to-orange-500", icon: "text-amber-300", iconBg: "bg-amber-400/15" },
  emerald: { topBar: "from-emerald-400 to-teal-500", icon: "text-emerald-300", iconBg: "bg-emerald-400/15" },
  violet: { topBar: "from-violet-400 to-purple-500", icon: "text-violet-300", iconBg: "bg-violet-400/15" },
  rose: { topBar: "from-rose-400 to-red-500", icon: "text-rose-300", iconBg: "bg-rose-400/15" },
  teal: { topBar: "from-teal-400 to-cyan-500", icon: "text-teal-300", iconBg: "bg-teal-400/15" },
};

const pillars: {
  title: string;
  desc: string;
  icon: typeof LockIcon;
  accent: CapAccent;
}[] = [
  {
    title: "Access Visibility",
    desc: "A complete, real-time view of who has access to which resources across every connected application. The foundation of governance is knowing the current state accurately. Without this, reviews and certifications are incomplete by definition.",
    icon: TargetIcon,
    accent: "cyan",
  },
  {
    title: "Access Certification",
    desc: "Scheduled or continuous reviews where application owners and line managers confirm that their team members' access is still appropriate. Certifications produce documented evidence that access was reviewed, by whom, and when, exactly what auditors require.",
    icon: EyeIcon,
    accent: "amber",
  },
  {
    title: "Role Management",
    desc: "Organising access into roles that reflect job functions. Role-based access control makes it easier to grant correct access at onboarding, review it as roles change, and detect when someone's permissions don't match their role. Role mining tools analyse actual access patterns to suggest logical role definitions.",
    icon: UsersIcon,
    accent: "emerald",
  },
  {
    title: "Separation of Duties (SoD)",
    desc: "Preventing any single individual from holding incompatible permissions, for example, the ability to both create and approve a payment. SoD enforcement detects these conflicts automatically and either prevents the access combination from existing or flags it for review and exception management.",
    icon: ShieldIcon,
    accent: "violet",
  },
  {
    title: "Access Request Workflow",
    desc: "A structured, auditable process for requesting additional access. Every request is routed to the appropriate approver, every approval or denial is recorded, and every resulting permission change is documented. Replaces informal \"just ask your manager\" processes with a compliance-ready audit trail.",
    icon: ActivityIcon,
    accent: "rose",
  },
  {
    title: "Identity Analytics",
    desc: "AI and machine learning applied to access data to detect anomalies, a user whose access pattern has suddenly changed, a role assignment that is statistically unusual for that job function, a dormant account that has become active after months of inactivity. Risk-based prioritisation of governance activities.",
    icon: LockIcon,
    accent: "teal",
  },
  {
    title: "Automated Provisioning & Deprovisioning",
    desc: "HR-driven joiner-mover-leaver automation that grants birthright access on day one and revokes it the moment someone exits. As people change roles, entitlements follow automatically, and fulfilment flows through SCIM and connector-based integrations rather than manual tickets. No account survives an employee's departure, and no leaver retains standing access.",
    icon: ActivityIcon,
    accent: "cyan",
  },
  {
    title: "Third-Party Access Governance",
    desc: "Contractor, vendor and partner identities are governed with the same rigour as employees, anchored to a named sponsor with a defined start and expiry date. Non-employee access is certified on its own cadence and automatically expires when the engagement ends. The result is zero orphaned external accounts left behind after a project closes.",
    icon: UsersIcon,
    accent: "amber",
  },
  {
    title: "Application Onboarding & Connectors",
    desc: "Pre-built connectors for major business, SaaS and on-premises applications let you bring new systems under governance quickly. Fine-grained entitlement ingestion pulls in every permission, role and group so reviews and certifications are complete. Broad cloud, SaaS and on-prem coverage means rapid time-to-value rather than months of custom integration.",
    icon: TargetIcon,
    accent: "violet",
  },
];

/* ───────── IGA VENDORS LINEUP (HONEYCOMB) ───────── */

const vendorLineup: { slug: string; name: string; logo: string }[] = [
  { slug: "saviynt", name: "Saviynt", logo: "/logos/Saviynt.png" },
  { slug: "sailpoint", name: "SailPoint", logo: "/logos/sailpoint.webp" },
  { slug: "one-identity-manager", name: "One Identity Manager", logo: "/logos/OneIdentity.png" },
  { slug: "microsoft-entra-id-governance", name: "Microsoft Entra ID Governance", logo: "/logos/microsoft.svg" },
  { slug: "omada-identity", name: "Omada Identity", logo: "/logos/Omada.png" },
  { slug: "oracle-identity-governance", name: "Oracle Identity Governance", logo: "/logos/Oracle.png" },
  { slug: "ibm-security-igi", name: "IBM Security IGI", logo: "/logos/IBM-Security.png" },
];

/* ───────── IGA LIFECYCLE (SIX-STEP MODEL) ───────── */

const igaLifecycle: {
  tag: string;
  icon: typeof LockIcon;
  title: string;
  desc: string;
  details: string;
}[] = [
  {
    tag: "Step 1",
    icon: EyeIcon,
    title: "Discover & Aggregate",
    desc: "Know the current state accurately.",
    details:
      "Connectors pull every account, entitlement, role and group from each connected application into one model. Without an accurate, complete picture of who has access to what, every downstream review and certification is incomplete by definition.",
  },
  {
    tag: "Step 2",
    icon: UsersIcon,
    title: "Model Roles",
    desc: "Turn access into job functions.",
    details:
      "Role mining analyses actual access patterns to suggest logical, job-aligned role definitions. Role-based access control makes it easier to grant correct access at onboarding, review it as people change roles, and spot permissions that no longer fit.",
  },
  {
    tag: "Step 3",
    icon: ActivityIcon,
    title: "Request & Approve",
    desc: "Capture intent with an audit trail.",
    details:
      "A structured, self-service request workflow routes every access request to the right approver. Each approval or denial is recorded, replacing informal \"just ask your manager\" processes with a compliance-ready trail of who asked, who approved, and why.",
  },
  {
    tag: "Step 4",
    icon: TargetIcon,
    title: "Provision",
    desc: "Grant and revoke automatically.",
    details:
      "HR-driven joiner-mover-leaver automation grants birthright access on day one and revokes it the moment someone exits. Entitlements follow role changes automatically, fulfilled through SCIM and connectors rather than manual tickets, so no leaver retains standing access.",
  },
  {
    tag: "Step 5",
    icon: CheckIcon,
    title: "Certify",
    desc: "Prove access is still appropriate.",
    details:
      "Scheduled or continuous certification campaigns ask application owners and line managers to confirm that access is still needed. Certifications produce documented evidence that access was reviewed, by whom, and when, exactly what auditors look for first.",
  },
  {
    tag: "Step 6",
    icon: ShieldIcon,
    title: "Detect & Remediate",
    desc: "Catch conflicts and outliers.",
    details:
      "Separation-of-duties enforcement flags incompatible permission combinations automatically, while identity analytics surface outliers, dormant accounts and statistically unusual role assignments. Risk-based prioritisation turns governance from a periodic chore into continuous control.",
  },
];

/* ───────── VENDOR COMPARISON MATRIX ───────── */

const matrixVendors: { name: string; recommended?: boolean; rank?: string }[] = [
  { name: "Saviynt", recommended: true },
  { name: "SailPoint IdentityNow", recommended: true },
  { name: "One Identity Manager", recommended: true },
  { name: "Microsoft Entra ID Governance" },
  { name: "Omada Identity" },
  { name: "Oracle Identity Governance" },
  { name: "IBM Security IGI" },
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
      "Saviynt 2010, cloud-native converged IGA",
      "SailPoint 2005, IGA category creator",
      "One Identity, IAM+IGA+PAM",
      "Microsoft, IGA layer of Entra, bundled in M365 E5",
      "Omada, European mid-market IGA",
      "Oracle OIG, ERP-native",
      "IBM IGI, compliance heritage",
    ],
  },
  {
    label: "Access Certification",
    type: "stars",
    cells: [
      { stars: 5, note: "AI-suggested certs" },
      { stars: 5, note: "Mature certifications" },
      { stars: 5, note: "Native certifications" },
      { stars: 4, note: "Native access reviews" },
      { stars: 5, note: "Cloud-native certs" },
      { stars: 5, note: "Mature certs" },
      { stars: 5, note: "Compliance-grade" },
    ],
  },
  {
    label: "Role Management",
    type: "stars",
    cells: [
      { stars: 5, note: "AI-driven role mining" },
      { stars: 5, note: "Strongest role engine" },
      { stars: 5, note: "Mature role mgmt" },
      { stars: 3, note: "Access packages, lighter roles" },
      { stars: 5, note: "Cloud-native roles" },
      { stars: 5, note: "Mature roles" },
      { stars: 5, note: "Comprehensive roles" },
    ],
  },
  {
    label: "SoD Enforcement",
    type: "stars",
    cells: [
      { stars: 5, note: "Mature SoD" },
      { stars: 5, note: "Mature SoD" },
      { stars: 5, note: "Strong SoD" },
      { stars: 2, note: "Weak for ERP SoD" },
      { stars: 5, note: "Strong SoD" },
      { stars: 5, note: "Mature SoD" },
      { stars: 5, note: "Industry-leading SoD" },
    ],
  },
  {
    label: "Risk Analytics",
    type: "stars",
    cells: [
      { stars: 5, note: "Identity Intelligence" },
      { stars: 5, note: "Identity Security Cloud AI" },
      { stars: 3, note: "Partial analytics" },
      { stars: 4, note: "Copilot recommendations" },
      { stars: 3, note: "Partial analytics" },
      { stars: 3, note: "Limited analytics" },
      { stars: 5, note: "QRadar integration" },
    ],
  },
  {
    label: "Self-Service Access",
    type: "stars",
    cells: [
      { stars: 5, note: "Cloud-native self-service" },
      { stars: 5, note: "Strongest self-service" },
      { stars: 5, note: "Mature self-service" },
      { stars: 5, note: "Native access packages" },
      { stars: 5, note: "Cloud-native UI" },
      { stars: 3, note: "Limited self-service" },
      { stars: 5, note: "Self-service portal" },
    ],
  },
  {
    label: "Cloud Application Coverage",
    type: "stars",
    cells: [
      { stars: 5, note: "Cloud-native AWS / Azure / GCP" },
      { stars: 5, note: "Widest cloud apps" },
      { stars: 5, note: "Hybrid cloud" },
      { stars: 4, note: "Deep M365 / Azure, lighter elsewhere" },
      { stars: 5, note: "Cloud-native SaaS" },
      { stars: 3, note: "ERP-centric" },
      { stars: 3, note: "Hybrid, on-prem strong" },
    ],
  },
  {
    label: "On-Prem Coverage",
    type: "stars",
    cells: [
      { stars: 4, note: "Growing on-prem coverage" },
      { stars: 5, note: "Widest on-prem connectors" },
      { stars: 5, note: "Strong AD + on-prem" },
      { stars: 2, note: "Cloud-first, limited on-prem" },
      { stars: 4, note: "Mid-market on-prem" },
      { stars: 5, note: "Oracle on-prem deep" },
      { stars: 5, note: "Deep on-prem heritage" },
    ],
  },
  {
    label: "UAE Compliance Fit",
    type: "stars",
    cells: [
      { stars: 5, note: "Cloud-native audit" },
      { stars: 5, note: "Audit-grade" },
      { stars: 5, note: "Strong audit logs" },
      { stars: 4, note: "Strong for Microsoft scope" },
      { stars: 5, note: "GDPR + NESA fit" },
      { stars: 5, note: "Oracle compliance" },
      { stars: 5, note: "Compliance heritage" },
    ],
  },
  {
    label: "5-Year TCO (5,000 users)",
    type: "stars",
    cells: [
      { stars: 3, note: "Premium SaaS tiers" },
      { stars: 3, note: "Premium enterprise tiers" },
      { stars: 4, note: "Mid-market friendly" },
      { stars: 5, note: "Bundled in E5, best value" },
      { stars: 4, note: "Mid-market value" },
      { stars: 3, note: "Premium, ERP-tied" },
      { stars: 3, note: "Premium, on-prem heavy" },
    ],
  },
  {
    label: "Automated Provisioning / Deprovisioning",
    type: "stars",
    cells: [
      { stars: 5, note: "ML-driven JML automation" },
      { stars: 5, note: "Broad provisioning" },
      { stars: 4, note: "Identity Manager workflows" },
      { stars: 4, note: "Entra Provisioning + SCIM" },
      { stars: 4, note: "Lifecycle automation" },
      { stars: 4, note: "Strong in Oracle HCM" },
      { stars: 5, note: "Audit-grade lifecycle" },
    ],
  },
  {
    label: "Third-Party Access Governance (TPAG)",
    type: "stars",
    cells: [
      { stars: 5, note: "Purpose-built TPAG module" },
      { stars: 3, note: "Limited dedicated TPAG" },
      { stars: 3, note: "Limited" },
      { stars: 4, note: "External ID / B2B" },
      { stars: 4, note: "Configurable" },
      { stars: 3, note: "Limited" },
      { stars: 3, note: "Limited" },
    ],
  },
  {
    label: "Cloud-Native Architecture",
    type: "stars",
    cells: [
      { stars: 5, note: "Cloud-native from inception" },
      { stars: 4, note: "IdentityNow SaaS" },
      { stars: 3, note: "On-prem + SaaS" },
      { stars: 5, note: "Cloud-native (Entra)" },
      { stars: 4, note: "SaaS available" },
      { stars: 3, note: "Hybrid heritage" },
      { stars: 3, note: "Hybrid heritage" },
    ],
  },
  {
    label: "Pre-built Connectors / Time-to-Value",
    type: "stars",
    cells: [
      { stars: 5, note: "1,000+ connectors, fast deploy" },
      { stars: 4, note: "Broad connector library" },
      { stars: 4, note: "Good connector set" },
      { stars: 4, note: "Fast in M365 estates" },
      { stars: 4, note: "Solid connectors" },
      { stars: 3, note: "Connector complexity" },
      { stars: 3, note: "Longer rollout" },
    ],
  },
  {
    label: "Best Suited For",
    type: "text",
    cells: [
      "Cloud-first, converged ILM + IGA + PAM + CIEM",
      "Complex hybrid estates, deepest IGA",
      "Unified IGA + PAM single vendor",
      "Microsoft-centric estates already on M365 E5 or Entra Suite",
      "European mid-market with GDPR",
      "Oracle-centric estates",
      "Regulated industries, deep audit",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      { recommended: true, text: "Artiflex's strongly recommended IGA pick. Converges IGA, ILM, PAM and cloud entitlements (CIEM) in one cloud-native platform, with AI-driven certifications and the strongest SAP / Oracle SoD coverage." },
      { recommended: true, text: "Widest connector library and deepest role engine. The premium alternative for complex on-prem-heavy or sovereign air-gapped estates." },
      { recommended: true, text: "Single-vendor IGA + PAM. The pragmatic pick when simplicity matters." },
      { text: "The IGA layer of Entra, bundled in M365 E5 and Entra Suite. Best value for Microsoft-centric estates; pair with Saviynt or SailPoint when deep ERP SoD or non-Microsoft connector depth is in scope." },
      { text: "Cloud-native IGA with GDPR strength. The European mid-market pick." },
      { text: "Native to Oracle ERP. The natural choice for Oracle-centric estates." },
      { text: "Deepest audit and compliance reporting. The choice for regulated industries." },
    ],
  },
];

/* ───────── VENDOR DETAIL CARDS ───────── */

const vendors: {
  slug: string;
  name: string;
  best: string;
  strength: string;
  watch: string;
  logo: string;
}[] = [
  {
    slug: "saviynt",
    name: "Saviynt",
    best: "Converged IGA + PAM + CIEM (Recommended)",
    strength:
      "Artiflex's strongly recommended IGA platform. Saviynt Identity Cloud converges IGA, ILM, PAM and cloud entitlement management (CIEM) in one SaaS-native console, with AI-driven access certifications and out-of-the-box SoD libraries for SAP S/4HANA, Oracle, Workday and PeopleSoft. The right pick for cloud-first UAE estates that want to collapse three to five point tools into one platform.",
    watch:
      "On-premises application support is less mature than SailPoint, and the platform is best deployed with a Saviynt-experienced delivery partner.",
    logo: "/logos/Saviynt.png",
  },
  {
    slug: "sailpoint",
    name: "SailPoint IdentityNow",
    best: "IGA Category Definer (Recommended)",
    strength:
      "The market-defining IGA platform and the premium alternative when on-prem depth or sovereign air-gapped deployment matters most. Founded to solve the IGA problem specifically, with the widest application coverage and most mature certification and role management capabilities, backed by a strong professional services ecosystem.",
    watch:
      "Premium pricing means a full deployment requires significant investment, and the platform's complexity requires an experienced implementation partner.",
    logo: "/logos/sailpoint.webp",
  },
  {
    slug: "one-identity-manager",
    name: "One Identity Manager",
    best: "IAM + IGA + PAM (Recommended)",
    strength:
      "One Identity's Manager platform spans IGA, ILM and PAM, offering a compelling single-vendor approach for organisations that do not want separate governance and privilege management contracts. Strong Active Directory and M365 governance with a good mid-market value proposition.",
    watch:
      "Less advanced AI / ML capabilities than SailPoint, and its cloud-native evolution is still in progress.",
    logo: "/logos/OneIdentity.png",
  },
  {
    slug: "microsoft-entra-id-governance",
    name: "Microsoft Entra ID Governance",
    best: "Best Value Inside M365 E5",
    strength:
      "The IGA layer of the Microsoft Entra family, bundled in Microsoft 365 E5 and the standalone Entra Suite. Delivers entitlement management, access packages, access reviews, lifecycle workflows and Copilot-driven recommendations across the M365, Azure and Entra-connected estate at zero or near-zero incremental licence cost.",
    watch:
      "Requires Entra ID P2 / Governance SKU prerequisites, and governance depth for SAP / Oracle SoD and non-Microsoft apps trails specialist IGA.",
    logo: "/logos/microsoft.svg",
  },
  {
    slug: "omada-identity",
    name: "Omada Identity",
    best: "Mid-Market IGA",
    strength:
      "Cloud-native IGA platform with a strong European presence. Well-designed for organisations that want SaaS-delivered governance without the complexity and cost of enterprise-tier platforms, with good GDPR and European compliance capabilities.",
    watch:
      "Smaller connector library than SailPoint, and less proven at very large enterprise scale.",
    logo: "/logos/Omada.png",
  },
  {
    slug: "oracle-identity-governance",
    name: "Oracle Identity Governance",
    best: "Oracle-Native",
    strength:
      "Oracle's IGA platform integrates natively with Oracle ERP and database estates. The natural choice for organisations with significant Oracle infrastructure, with mature on-premises ILM and IGA and licensing bundled with Oracle options.",
    watch:
      "Limited value beyond the Oracle ecosystem, and cloud-native evolution lags behind SailPoint and Saviynt.",
    logo: "/logos/Oracle.png",
  },
  {
    slug: "ibm-security-igi",
    name: "IBM Security IGI",
    best: "Compliance-First",
    strength:
      "IBM's Identity Governance and Intelligence platform has the deepest audit trail and reporting capabilities. Preferred in highly regulated industries where compliance evidence quality matters most, with strong IBM ecosystem integration (QRadar, MaaS360) and deep on-premises application support.",
    watch:
      "Slower cloud-native evolution and a higher total cost of ownership than modern SaaS competitors.",
    logo: "/logos/IBM-Security.png",
  },
];

/* ───────── VENDOR PROFILES ───────── */

const profiles: {
  name: string;
  tier: string;
  tag: string;
  blurb: string;
  pros: string[];
  cons: string[];
}[] = [
  {
    name: "Saviynt",
    tier: "Leader",
    tag: "Artiflex Recommended · Converged IGA + PAM + CIEM",
    blurb:
      "Artiflex's strongly recommended IGA platform. Saviynt Identity Cloud converges IGA, ILM, PAM and cloud entitlement management (CIEM) in one SaaS-native console, with AI-driven access certifications and out-of-the-box SoD libraries for SAP S/4HANA, Oracle, Workday and PeopleSoft. The right pick for cloud-first UAE estates that want to collapse three to five point tools into one platform.",
    pros: [
      "IGA + ILM + PAM + cloud entitlements in one converged platform",
      "AI-driven (Iris) risk-based access certifications",
      "OOTB SoD libraries for SAP, Oracle, Workday, PeopleSoft",
      "Native governance of cloud, SaaS and non-human identities",
    ],
    cons: [
      "On-premises application support less mature than SailPoint",
      "Best deployed with a Saviynt-experienced delivery partner",
    ],
  },
  {
    name: "SailPoint IdentityNow",
    tier: "Leader",
    tag: "Premium Alternative · IGA Category Definer",
    blurb:
      "The market-defining IGA platform and the premium alternative when on-prem depth or sovereign air-gapped deployment matters most. Founded to solve the IGA problem specifically, with the widest application coverage and most mature certification and role management capabilities.",
    pros: [
      "Widest app connector library in IGA market",
      "Most mature role mining and management",
      "AI-driven Identity Security Cloud platform",
      "Strong professional services ecosystem",
    ],
    cons: [
      "Premium pricing; full deployment requires significant investment",
      "Complexity requires experienced implementation partner",
    ],
  },
  {
    name: "One Identity Manager",
    tier: "Leader",
    tag: "IAM + IGA + PAM",
    blurb:
      "One Identity's Manager platform spans IGA, ILM, and PAM, offering a compelling single-vendor approach for organisations that don't want separate governance and privilege management contracts.",
    pros: [
      "Native IGA + PAM integration",
      "Strong Active Directory and M365 governance",
      "Good mid-market value proposition",
    ],
    cons: [
      "Less advanced AI / ML capabilities than SailPoint",
      "Cloud-native evolution still in progress",
    ],
  },
  {
    name: "Microsoft Entra ID Governance",
    tier: "Challenger",
    tag: "Best Value Inside M365 E5",
    blurb:
      "The IGA layer of the Microsoft Entra family, bundled in Microsoft 365 E5 and the standalone Entra Suite. Delivers entitlement management, access packages, access reviews, lifecycle workflows and Copilot-driven recommendations across the M365, Azure and Entra-connected estate at zero or near-zero incremental licence cost. The best-value answer for Microsoft-centric estates where deep ERP SoD and legacy connectors are not the primary buying driver.",
    pros: [
      "Bundled in M365 E5 / Entra Suite, zero or near-zero added licence cost",
      "Deep, native governance of Entra, M365, Teams, SharePoint and Azure RBAC",
      "Native joiner / mover / leaver lifecycle workflows from HR attributes",
      "Copilot-driven access recommendations and PIM for Azure / Entra admin roles",
    ],
    cons: [
      "Requires Entra ID P2 / Governance SKU prerequisites",
      "Governance depth for SAP / Oracle SoD and non-Microsoft apps trails specialist IGA",
    ],
  },
  {
    name: "Omada Identity",
    tier: "Visionary",
    tag: "Mid-Market IGA",
    blurb:
      "Cloud-native IGA platform with a strong European presence. Well-designed for organisations that want SaaS-delivered governance without the complexity and cost of SailPoint's enterprise platform.",
    pros: [
      "Simpler deployment than enterprise-tier IGA",
      "Good GDPR and European compliance capabilities",
      "Cloud-native SaaS delivery",
    ],
    cons: [
      "Smaller connector library than SailPoint",
      "Less proven at very large enterprise scale",
    ],
  },
  {
    name: "Oracle Identity Governance",
    tier: "Challenger",
    tag: "Oracle-Native",
    blurb:
      "Oracle's IGA platform integrates natively with Oracle ERP and database estates. The natural choice for organisations with significant Oracle infrastructure.",
    pros: [
      "Native Oracle ERP and database integration",
      "Bundled with Oracle licensing options",
      "Mature on-premises ILM and IGA",
    ],
    cons: [
      "Limited beyond Oracle ecosystem",
      "Cloud-native evolution behind SailPoint and Saviynt",
    ],
  },
  {
    name: "IBM Security IGI",
    tier: "Challenger",
    tag: "Compliance-First",
    blurb:
      "IBM's Identity Governance and Intelligence platform has the deepest audit trail and reporting capabilities. Preferred in highly regulated industries where compliance evidence quality matters most.",
    pros: [
      "Best-in-class compliance reporting",
      "Strong IBM ecosystem (QRadar, MaaS360)",
      "Deep on-premises application support",
    ],
    cons: [
      "Slower cloud-native evolution",
      "Higher TCO than modern SaaS competitors",
    ],
  },
];

/* ───────── GARTNER-STYLE SCORECARD ───────── */

const featureVendors = [
  "Saviynt",
  "SailPoint IdentityNow",
  "One Identity Manager",
  "Microsoft Entra ID Governance",
  "Omada",
  "Oracle Identity Governance",
  "IBM Security IGI",
];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "Access Certification",
    cells: [
      { tier: "best", note: "AI-suggested certs" },
      { tier: "best", note: "Mature certifications" },
      { tier: "best", note: "Native certifications" },
      { tier: "excellent", note: "Native access reviews" },
      { tier: "best", note: "Cloud-native certs" },
      { tier: "veryStrong", note: "Mature certifications, Oracle-centric" },
      { tier: "best", note: "Compliance-grade" },
    ],
  },
  {
    label: "Role Management",
    cells: [
      { tier: "best", note: "AI-driven mining" },
      { tier: "best", note: "Strongest role engine" },
      { tier: "best", note: "Mature role mgmt" },
      { tier: "good", note: "Access packages, lighter roles" },
      { tier: "excellent", note: "Cloud-native roles" },
      { tier: "best", note: "Strong complex role models" },
      { tier: "excellent", note: "Comprehensive roles" },
    ],
  },
  {
    label: "Separation of Duties",
    cells: [
      { tier: "best", note: "Mature SoD" },
      { tier: "best", note: "Mature SoD" },
      { tier: "best", note: "Strong SoD" },
      { tier: "good", note: "Weak for ERP SoD" },
      { tier: "excellent", note: "Strong SoD" },
      { tier: "best", note: "Strong SoD for Oracle ERP / EBS" },
      { tier: "best", note: "Industry-leading SoD" },
    ],
  },
  {
    label: "Risk Analytics",
    cells: [
      { tier: "best", note: "Identity Intelligence" },
      { tier: "best", note: "Identity Security Cloud AI" },
      { tier: "veryStrong", note: "Partial analytics" },
      { tier: "excellent", note: "Copilot recommendations" },
      { tier: "good", note: "Partial analytics" },
      { tier: "good", note: "Limited native analytics" },
      { tier: "excellent", note: "QRadar integration" },
    ],
  },
  {
    label: "Self-Service Access Request",
    cells: [
      { tier: "best", note: "Cloud-native self-service" },
      { tier: "best", note: "Strongest self-service" },
      { tier: "excellent", note: "Mature self-service" },
      { tier: "best", note: "Native access packages" },
      { tier: "excellent", note: "Cloud-native UI" },
      { tier: "veryStrong", note: "Mature self-service, dated UX" },
      { tier: "excellent", note: "Self-service portal" },
    ],
  },
  {
    label: "Cloud Application Coverage",
    cells: [
      { tier: "best", note: "Cloud-native AWS / Azure / GCP" },
      { tier: "best", note: "Widest cloud apps" },
      { tier: "excellent", note: "Hybrid cloud" },
      { tier: "veryStrong", note: "Deep M365 / Azure, lighter elsewhere" },
      { tier: "best", note: "Cloud-native SaaS" },
      { tier: "good", note: "Strong for Oracle Cloud / Fusion" },
      { tier: "veryStrong", note: "Hybrid, on-prem strong" },
    ],
  },
  {
    label: "On-Prem Coverage",
    cells: [
      { tier: "veryStrong", note: "Growing on-prem coverage" },
      { tier: "best", note: "Widest on-prem connectors" },
      { tier: "best", note: "Strong AD + on-prem" },
      { tier: "good", note: "Cloud-first, limited on-prem" },
      { tier: "veryStrong", note: "Mid-market on-prem" },
      { tier: "best", note: "Deep on-prem, sovereign-ready" },
      { tier: "best", note: "Deep on-prem heritage" },
    ],
  },
  {
    label: "Automated Provisioning / Deprovisioning",
    cells: [
      { tier: "best", note: "ML-driven JML automation" },
      { tier: "best", note: "Broad provisioning" },
      { tier: "veryStrong", note: "Identity Manager workflows" },
      { tier: "veryStrong", note: "Entra Provisioning + SCIM" },
      { tier: "veryStrong", note: "Lifecycle automation" },
      { tier: "veryStrong", note: "Strong in Oracle HCM" },
      { tier: "excellent", note: "Audit-grade lifecycle" },
    ],
  },
  {
    label: "Third-Party Access Governance (TPAG)",
    cells: [
      { tier: "best", note: "Purpose-built TPAG module" },
      { tier: "strong", note: "Limited dedicated TPAG" },
      { tier: "good", note: "Limited" },
      { tier: "veryStrong", note: "External ID / B2B" },
      { tier: "veryStrong", note: "Configurable" },
      { tier: "good", note: "Limited" },
      { tier: "strong", note: "Limited" },
    ],
  },
  {
    label: "Cloud-Native Architecture",
    cells: [
      { tier: "best", note: "Cloud-native from inception" },
      { tier: "veryStrong", note: "IdentityNow SaaS" },
      { tier: "strong", note: "On-prem + SaaS" },
      { tier: "best", note: "Cloud-native (Entra)" },
      { tier: "veryStrong", note: "SaaS available" },
      { tier: "strong", note: "Hybrid heritage" },
      { tier: "strong", note: "Hybrid heritage" },
    ],
  },
  {
    label: "Pre-built Connectors / Time-to-Value",
    cells: [
      { tier: "best", note: "1,000+ connectors, fast deploy" },
      { tier: "veryStrong", note: "Broad connector library" },
      { tier: "veryStrong", note: "Good connector set" },
      { tier: "veryStrong", note: "Fast in M365 estates" },
      { tier: "veryStrong", note: "Solid connectors" },
      { tier: "strong", note: "Connector complexity" },
      { tier: "strong", note: "Longer rollout" },
    ],
  },
  {
    label: "Hybrid / On-Prem Depth",
    cells: [
      { tier: "veryStrong", note: "Cloud-first, hybrid agents" },
      { tier: "best", note: "Deepest on-prem & legacy" },
      { tier: "excellent", note: "On-prem flexible" },
      { tier: "strong", note: "Hybrid via Connect" },
      { tier: "veryStrong", note: "On-prem + SaaS" },
      { tier: "excellent", note: "Strong on-prem" },
      { tier: "excellent", note: "Deep on-prem" },
    ],
  },
  {
    label: "Total Cost of Ownership",
    cells: [
      { tier: "moderate", note: "Premium SaaS tiers" },
      { tier: "moderate", note: "Premium enterprise tiers" },
      { tier: "veryStrong", note: "Mid-market friendly" },
      { tier: "best", note: "Bundled in E5, best value" },
      { tier: "veryStrong", note: "Mid-market value" },
      { tier: "veryStrong", note: "Best value inside Oracle estates" },
      { tier: "moderate", note: "Premium, on-prem heavy" },
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

/* ───────── DECISION GUIDE ───────── */

const decisionGuide: { scenario: string; recommend: string }[] = [
  {
    scenario: "You want converged IGA, PAM and cloud entitlements in one cloud-native platform (Artiflex default recommendation)",
    recommend:
      "Saviynt. Artiflex's strongly recommended IGA pick. The platform that genuinely converges IGA, ILM, PAM and CIEM, with AI-driven certifications and out-of-the-box SoD libraries for SAP, Oracle, Workday and PeopleSoft. The right starting point for most cloud-first UAE estates.",
  },
  {
    scenario:
      "You have complex on-premises estates or sovereign air-gap needs and want the widest connector coverage",
    recommend:
      "SailPoint IdentityNow. The largest connector library and most mature governance capabilities make it the premium alternative for complex, on-prem-heavy or air-gapped environments.",
  },
  {
    scenario: "You want unified IGA and PAM governance without separate vendors",
    recommend:
      "One Identity Manager. Native IGA + PAM integration and strong AD governance make it the best single-vendor option for organisations that prioritise simplified vendor management.",
  },
  {
    scenario:
      "You are a European mid-market organisation with GDPR as a primary driver",
    recommend:
      "Omada Identity. Strong European GDPR capabilities, cloud-native delivery, simpler deployment, and competitive pricing for organisations that don't need enterprise-tier complexity.",
  },
  {
    scenario:
      "You are a heavily regulated financial institution with deep Oracle or IBM infrastructure",
    recommend:
      "Oracle Identity Governance or IBM Security IGI. Native integration with existing Oracle / IBM infrastructure reduces connector complexity and leverages existing vendor relationships.",
  },
];

/* ───────── FAQS ───────── */

const faqs = [
  {
    question: "What is Identity Governance & Administration (IGA)?",
    answer:
      "IGA is the discipline that proves who should have access, not just who does. It provides continuous visibility into who has access to what across every connected system, the ability to review and certify that access on a schedule, and the tools to manage roles, detect conflicts, and enforce least privilege at enterprise scale. Where access management decides at login, IGA governs whether that access remains appropriate over time.",
  },
  {
    question: "How is IGA different from access management?",
    answer:
      "Access management makes the decision at the moment of login: SSO, MFA, conditional access. IGA continuously reviews whether that access is still appropriate long after the login. IGA owns joiner / mover / leaver workflows, periodic access certification, separation-of-duties policy, role management, and the audit trail regulators ask for. Without IGA, access accumulates as people move between roles and quietly becomes the next audit finding or insider breach.",
  },
  {
    question: "What is access certification and why do auditors care?",
    answer:
      "Access certification is a scheduled or continuous review where application owners and line managers confirm that their team members' access is still needed. Each campaign produces documented evidence that access was reviewed, by whom, and when. That evidence is exactly what an auditor asks for under SOX, HIPAA, PCI-DSS, GDPR, NESA and CBUAE: proof that access to sensitive systems is restricted to authorised personnel and verified on a regular cadence.",
  },
  {
    question: "What is Separation of Duties (SoD) and why does it matter?",
    answer:
      "Separation of Duties prevents any single individual from holding incompatible permissions, for example the ability to both create and approve a payment. The most financially damaging internal frauds share one trait: one person could initiate and authorise the same transaction. IGA detects these conflicts automatically, either blocking the combination or flagging it for management sign-off, turning an access policy that exists on paper into one that actually constrains behaviour.",
  },
  {
    question: "How long does an IGA programme take to implement?",
    answer:
      "IGA programmes typically run 6 to 12 months because access certification, role mining, and SoD policy design require business-side involvement, not just technical configuration. A focused first phase, connecting your highest-risk applications and running an initial certification campaign, can deliver audit-ready evidence in 8 to 12 weeks. Cloud-native platforms with pre-built connectors shorten time-to-value considerably versus heavy on-premises rollouts.",
  },
  {
    question: "Which IGA platform should we choose?",
    answer:
      "Pick Saviynt when you want converged IGA, ILM, PAM and cloud entitlements in one cloud-native platform with AI-driven certifications and deep SAP / Oracle SoD, the Artiflex default for cloud-first UAE estates. Pick SailPoint when on-prem depth, sovereign air-gap, and the widest connector library matter most. Pick One Identity Manager for unified IGA + PAM from a single vendor, Microsoft Entra ID Governance for best value inside M365 E5, Omada for European mid-market GDPR scope, and Oracle or IBM where you already run that ecosystem and need deep audit.",
  },
];

/* ───────── HERO ───────── */

function IgaHero() {
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
              <li><span className="font-medium text-[#28B5E1]">Identity Governance &amp; Administration (IGA)</span></li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="shell relative z-10 flex w-full flex-1 items-center py-10 sm:py-12 lg:py-14">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="w-full">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#28B5E1] sm:text-xs">
            Identity Governance &amp; Administration
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-5xl lg:text-[3.5rem]">
            Identity Governance &amp; <span className="gradient-text">Administration</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Prove who should have access, and evidence it for auditors
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Knowing who has access to what is easy. Knowing whether they should have it, and being able to prove it to an auditor, is what IGA exists to do. Artiflex IT designs, deploys and manages IGA across the UAE, Oman and Saudi Arabia, on Saviynt, SailPoint, One Identity, Microsoft Entra, Omada, Oracle and IBM, picked on estate breadth and compliance scope, not vendor preference.
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
              Talk to our Consultant
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

export default function IgaProduct() {
  const [openLayer, setOpenLayer] = useState<number | null>(0);
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Identity Governance & Administration (IGA) | Identity & Access Management | Artiflex IT</title>
        <meta
          name="description"
          content="Identity Governance and Administration (IGA) explained. How access certifications, role management, separation of duties and identity analytics deliver continuous visibility, compliance evidence and least-privilege enforcement at enterprise scale."
        />
        <link
          rel="canonical"
          href="https://artiflexit.com/cybersecurity/identity-access-security/iga"
        />
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
            name: "Recommended IGA Platforms for UAE Businesses",
            itemListElement: vendors.map((v, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <IgaHero />

      {/* WHAT IS IGA (INTRO) */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              Start Here
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              What is Identity Governance &amp; Administration?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Identity Governance and Administration (IGA) is the security discipline that creates the
              evidence regulators ask for. It provides continuous visibility into who has access to what
              across every connected system, the ability to review and certify that access on a regular
              schedule, and the tools to manage roles, detect conflicts, and enforce least privilege at
              enterprise scale.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:mt-12 md:grid-cols-2">
            <div className="rounded-2xl border border-border-light bg-slate-50 p-6 sm:p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#28B5E1]/10 text-[#1B8AC7]">
                <AlertTriangleIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-900">
                Why does an organisation need IGA?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Access rights are granted for good reasons at a specific moment and then stay granted
                forever, regardless of whether the reason still applies. Privilege creep is both a
                security problem, every unnecessary permission is attack surface, and a compliance
                problem. When an auditor asks you to demonstrate that access to financial systems is
                restricted to authorised personnel, IGA is what produces that documented evidence.
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
                We start with your application estate, your audit scope, and the depth of governance you
                require, then map the right platform to the requirement. For organisations standardising
                on converged, cloud-native identity governance, Artiflex recommends{" "}
                <strong className="font-semibold text-slate-900">Saviynt</strong> as the reference
                platform, complemented by SailPoint, One Identity or Microsoft Entra ID Governance where
                the estate demands it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── THE FOUR PILLARS (BUILDING BLOCKS) ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              The Building Blocks
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              What IGA covers
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              IGA is not a single product. It is a set of complementary disciplines that together turn
              access from an ungoverned liability into a continuously evidenced control. Here is what
              each discipline does, and the capabilities to look for.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#28B5E1]/40 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#28B5E1]/10 text-[#1B8AC7] transition-colors group-hover:bg-[#28B5E1]/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-slate-900">{cap.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{cap.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── IGA VENDORS WE DELIVER (HONEYCOMB) ───────── */}
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
              IGA{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Vendors
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The Identity Governance platforms we design, deploy and manage across UAE environments. The conversation starts with your application estate, your audit scope, and the depth of governance you require.
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
                layouts[vendorLineup.length] ??
                [Math.ceil(vendorLineup.length / 2), Math.floor(vendorLineup.length / 2)];
              const rows: typeof vendorLineup[] = [];
              let i = 0;
              sizes.forEach((s) => {
                rows.push(vendorLineup.slice(i, i + s));
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
                      to={`/cybersecurity/iga/${v.slug}`}
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
            {vendorLineup.map((v) => (
              <Link
                key={v.slug}
                to={`/cybersecurity/iga/${v.slug}`}
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
              {vendorLineup.length} platforms
            </span>
            , picked by estate breadth, compliance scope, and the depth of governance you require.
          </p>
        </div>
      </section>

      {/* ───────── THE IGA LIFECYCLE ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.06),transparent_60%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              How IGA Works
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              The IGA Lifecycle
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              IGA is not a single event. It is a continuous lifecycle where each step builds on the one before. Skip a step and the evidence has a gap, exactly where an auditor will look.
            </p>
          </div>

          <div className="mt-12 grid items-start gap-4 sm:mt-16 sm:gap-5 md:grid-cols-3">
            {igaLifecycle.map((l, idx) => {
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
                Access always accumulates. People change roles, projects end, contracts expire, and the permissions stay behind. IGA exists to answer the one question every auditor asks and almost every organisation struggles to answer: can you show me who had access to your most sensitive systems, whether it was appropriate, and how you verified it.
              </p>
              <footer className="mt-6 flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 bg-[#28B5E1]" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#28B5E1] sm:text-[11px]">
                  The principle behind every IGA investment
                </span>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ───────── THE PROBLEM + STATS ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(27,138,199,0.06),transparent_60%)]" />
        <div className="shell relative">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
            The Problem
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-[2.5rem]">
            Access Is Easy to Grant. Impossible to Track Without Automation.
          </h2>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            <p>
              Every organisation struggles with the same problem: access rights are granted for good reasons at a specific moment in time, and then they stay granted forever, regardless of whether the reason still applies. A project finishes, but the project system access remains. A contractor's contract ends, but their permissions in the finance system remain. An employee moves departments four times over ten years, accumulating access from every role they have ever held, without any of the previous role's access ever being reviewed or removed.
            </p>
            <p>
              This access accumulation, sometimes called &ldquo;privilege creep&rdquo;, creates two simultaneous problems. The security problem is obvious: every unnecessary permission is an unnecessary attack surface. The compliance problem is equally serious. When an auditor asks you to demonstrate that access to your financial systems is restricted to authorised personnel, you need to be able to answer that question completely, accurately, and with documented evidence. Without IGA, that evidence simply does not exist in any usable form.
            </p>
            <p>
              Identity Governance and Administration is the discipline that creates that evidence. IGA provides continuous visibility into who has access to what across every connected system, the ability to review and certify that access on a regular schedule, and the tools to manage roles, detect conflicts, and enforce the principle of least privilege at enterprise scale.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-5">
            {stats.map((s, idx) => (
              <motion.div
                key={s.value}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#04101E] via-[#06182B] to-[#0A3D6B] p-6 text-center shadow-lg shadow-slate-900/15 sm:p-8"
              >
                <p className="font-display text-4xl font-bold text-[#28B5E1] sm:text-5xl">
                  {s.value}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CORE CONCEPTS, THE PILLARS ───────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#04101E] via-[#06182B] to-[#0A3D6B] py-16 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(27,138,199,0.14),transparent_55%)]"
        />
        <div className="shell relative">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#28B5E1]">
            Core Concepts
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-[2.5rem]">
            The Pillars of Identity Governance
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Visibility, certification, role management, separation of duties, structured access requests, and identity analytics. Together they turn access from an ungoverned liability into a continuously evidenced control.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {pillars.map((cap, idx) => {
              const s = capAccents[cap.accent];
              const Icon = cap.icon;
              return (
                <motion.article
                  key={cap.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.04 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm shadow-lg shadow-slate-900/15 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-xl hover:shadow-slate-900/25 sm:p-8"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${s.topBar}`}
                  />
                  <div
                    className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${s.iconBg} ${s.icon}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {cap.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {cap.desc}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── VENDOR COMPARISON MATRIX ───────── */}
      <section
        id="vendor-matrix"
        className="relative bg-white py-16 scroll-mt-20 sm:py-24"
      >
        <div className="shell">
          <div className="mb-10 text-center sm:mb-12 md:mb-16">
            <h2 className="mx-auto max-w-3xl font-display text-2xl font-bold tracking-tight text-heading sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              Vendor comparison for{" "}
              <span className="gradient-text">IGA buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              IGA selection depends on the breadth of your application estate, the depth of governance you require, and whether you want lifecycle, privileged, and entitlement management converged in one platform. Artiflex suggests the solution that best fits your needs.
            </p>
          </div>

          <div className="mt-8 flex justify-center sm:mt-10">
            <button
              onClick={openContact}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-7 sm:py-3.5 sm:text-base"
            >
              Talk to our Consultant
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
              Detailed Comparison on IGA Vendors
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
              Talk to our Consultant
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
                    to={`/cybersecurity/iga/${v.slug}`}
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
            <p className="text-base leading-relaxed text-slate-300 sm:text-lg md:text-xl">
              <span className="font-semibold text-white">Artiflex IT delivers Saviynt, SailPoint, One Identity, IBM Security IGI, Omada and Oracle Identity Governance</span> <span className="text-white">across UAE IGA programmes.</span> <br />
              <span className="text-xs italic text-white sm:text-base">The vendor follows the assessment, not the other way around.</span>
            </p>
          </div>

          {/* Gartner-style scorecard */}
          <div
            id="gartner-comparison"
            className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28"
          >
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Comparison
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each vendor is rated across IGA capabilities using a standardised tier scale. A gold ★ marker denotes best-in-class performance for that specific capability.
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
              Choosing your IGA platform
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The quickest path to the right vendor. Hover or focus any scenario to see the recommendation.
            </p>
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
            description="We don't sell licences, we deliver IGA outcomes: assess, design, deploy, manage. Every stage produces something an auditor can read and a CFO can sign off on."
            centered
          />

          <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-4">
            {[
              {
                title: "Assess",
                duration: "2 weeks",
                summary:
                  "Inventory of identities, roles, applications, and existing entitlements. Audit of access certification cadence, joiner / mover / leaver processes, SoD exposure, and role-mining readiness.",
                deliverable:
                  "Current-state report, vendor recommendation with rationale, three-year TCO comparison.",
              },
              {
                title: "Design",
                duration: "3 to 4 weeks",
                summary:
                  "Architecture for your specific estate: role model, certification campaign design, SoD policy framework, connector scope, and identity-fabric integration with HR and IT systems.",
                deliverable:
                  "Approved architecture, signed-off rollout sequence, change-management plan.",
              },
              {
                title: "Deploy",
                duration: "8 to 16 weeks",
                summary:
                  "Phased deployment with rollback procedures at every stage. Highest-risk applications first, initial certification campaign, then role mining and SoD enforcement. Production cutover with day-1 hypercare.",
                deliverable:
                  "Live IGA platform, audit-ready documentation, runbooks for your team.",
              },
              {
                title: "Manage",
                duration: "Ongoing",
                summary:
                  "Certification campaign automation, role and SoD policy change management, identity-analytics review, monthly board-readable reporting, and quarterly architecture reviews.",
                deliverable:
                  "Operational IGA with SLAs you can rely on. Or a clean handover to your team.",
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
              Vendor-agnostic by design. We will tell you when Saviynt wins, when SailPoint wins, when One Identity, Microsoft or IBM wins, and when none of them is the right answer. The point of an honest assessment is honest answers.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "73%", label: "Of compliance failures involve improper or excessive access" },
              { value: "6×", label: "More abuse detected with continuous IGA vs annual reviews" },
              { value: "$4.9M", label: "Average cost of an identity-related breach" },
              { value: "SOX", label: "HIPAA, PCI-DSS and GDPR all require access governance" },
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
                  Saviynt, SailPoint, One Identity Manager, Microsoft Entra ID Governance, Omada, Oracle Identity Governance and IBM Security IGI, active delivery experience across all seven.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Compliance frameworks
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  NESA, UAE PDPL, CBUAE, SAMA, NCA ECC, ISO 27001 and NIST CSF 2.0 aligned implementations, with audit-ready certification evidence delivered as part of the project.
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
              Book a free IGA readiness assessment
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
            description="What UAE decision-makers ask us most about IGA, access certification, separation of duties, and platform selection."
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
        title="Get an IGA Readiness Assessment"
        description="60-minute review of your access certification cadence, SoD policy posture, and role-mining readiness, with a vendor-neutral IGA recommendation across Saviynt, SailPoint, One Identity, Microsoft Entra, Omada, Oracle and IBM."
        primaryButton={{ text: "Book Assessment", action: "modal" }}
      />
    </>
  );
}
