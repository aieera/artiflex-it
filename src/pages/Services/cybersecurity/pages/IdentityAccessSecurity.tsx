import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import {
  ShieldIcon,
  LockIcon,
  UsersIcon,
  ActivityIcon,
} from "@/components/icons";

/* ───────── VENDOR LINEUP ───────── */

type Vendor = { slug: string; name: string; logo: string; featured?: boolean; rank?: string };

const vendorLineup: Vendor[] = [
  { slug: "microsoft-entra", name: "Microsoft Entra", logo: "/logos/microsoft.svg", featured: true, rank: "#1 Identity Cloud" },
  { slug: "okta", name: "Okta", logo: "/logos/Okta.png", rank: "Neutral SaaS" },
  { slug: "ping-identity", name: "Ping Identity", logo: "/logos/pingidentity.png", rank: "Workforce + CIAM" },
  { slug: "cyberark", name: "CyberArk", logo: "/logos/CyberArk.png", rank: "PAM leader" },
  { slug: "sailpoint", name: "SailPoint", logo: "/logos/sailpoint.webp", rank: "IGA leader" },
  { slug: "saviynt", name: "Saviynt", logo: "/logos/Saviynt.png", rank: "Cloud IGA" },
  { slug: "beyondtrust", name: "BeyondTrust", logo: "/logos/BeyondTrust.webp", rank: "PAM challenger" },
  { slug: "delinea", name: "Delinea", logo: "/logos/Delinea.webp", rank: "PAM challenger" },
  { slug: "one-identity", name: "One Identity", logo: "/logos/OneIdentity.png", rank: "Unified identity" },
];

/* ───────── CAPABILITY SUBPAGES ───────── */

type Capability = {
  tag: string;
  title: string;
  desc: string;
  focus: string;
  href: string;
  cta: string;
};

const capabilities: Capability[] = [
  {
    tag: "Subpage",
    title: "Identity & Access Management (IAM)",
    desc: "The discipline of giving every person, contractor and service the right access, no more, no less, across cloud and on-prem. The foundation everything else rests on.",
    focus: "Focus: Microsoft Entra · Okta · Ping · JumpCloud · OneIdentity",
    href: "/cybersecurity/identity-access-security/iam",
    cta: "Explore IAM",
  },
  {
    tag: "Subpage",
    title: "Privileged Access (PAM)",
    desc: "Administrator accounts are the keys to the kingdom. Vaulting, JIT elevation, session recording and credential rotation for the most-targeted accounts.",
    focus: "Focus: CyberArk · BeyondTrust · Delinea",
    href: "/cybersecurity/identity-access-security/pam",
    cta: "Explore PAM",
  },
  {
    tag: "Subpage",
    title: "Identity Governance (IGA)",
    desc: "Who has access to what, and should they? Access certification, role mining, segregation-of-duties and audit-ready governance for NESA and ISO 27001.",
    focus: "Focus: SailPoint · Saviynt · Microsoft Entra ID Governance",
    href: "/cybersecurity/identity-access-security/iga",
    cta: "Explore IGA",
  },
  {
    tag: "Subpage",
    title: "Multi-Factor Authentication (MFA)",
    desc: "Passwords alone are broken. MFA adds the second factor (push, FIDO2, passkey) that stops account takeover even when a password leaks.",
    focus: "Focus: Microsoft Authenticator · Okta Verify · Duo · YubiKey",
    href: "/cybersecurity/identity-access-security/mfa",
    cta: "Explore MFA",
  },
];

/* ───────── VENDOR COMPARISON MATRIX ───────── */

type StarCell = { stars: number; note: string };
type VerdictCell = { recommended?: boolean; rank?: string; text: string };
type MatrixRow =
  | { label: string; type: "text"; cells: string[] }
  | { label: string; type: "stars"; cells: StarCell[] }
  | { label: string; type: "verdict"; cells: VerdictCell[] };

const matrixVendors = [
  { name: "Microsoft Entra", featured: true },
  { name: "Okta" },
  { name: "Ping Identity" },
  { name: "CyberArk" },
  { name: "SailPoint" },
  { name: "Saviynt" },
  { name: "BeyondTrust" },
  { name: "Delinea" },
  { name: "One Identity" },
];

const matrixRows: MatrixRow[] = [
  {
    label: "Primary discipline",
    type: "text",
    cells: [
      "IAM, MFA, Conditional Access, IGA",
      "Workforce + customer identity (SaaS)",
      "Workforce + CIAM, hybrid",
      "Privileged Access Management",
      "Identity Governance (IGA)",
      "Cloud-native IGA + application GRC",
      "Privileged Access Management",
      "Privileged Access Management",
      "Unified IAM, PAM and IGA",
    ],
  },
  {
    label: "Founded / Heritage",
    type: "text",
    cells: [
      "1975 (Microsoft); Azure AD 2010; Entra 2022.",
      "2009, San Francisco. SaaS-first IAM.",
      "2002, Denver. Strong federation lineage.",
      "1999, Israel. Vault invented PAM as a category.",
      "2005, Austin. The IGA reference platform.",
      "2010, California. Cloud-native IGA.",
      "1985, USA. PAM and privileged remote access.",
      "2021, from Thycotic + Centrify. PAM vaulting.",
      "Quest brand; OneLogin, Safeguard, Identity Manager.",
    ],
  },
  {
    label: "Cloud / SSO / MFA",
    type: "stars",
    cells: [
      { stars: 5, note: "Native to M365. Conditional Access, Authenticator." },
      { stars: 5, note: "7000+ pre-built connectors." },
      { stars: 5, note: "Strong federation and CIAM." },
      { stars: 3, note: "Via partners. Not the focus." },
      { stars: 3, note: "Via partners. Not the focus." },
      { stars: 2, note: "Light MFA; not an SSO platform." },
      { stars: 1, note: "Not an IAM/SSO platform." },
      { stars: 1, note: "Not an IAM/SSO platform." },
      { stars: 4, note: "OneLogin SSO and MFA across the stack." },
    ],
  },
  {
    label: "Privileged Access (PAM)",
    type: "stars",
    cells: [
      { stars: 3, note: "PIM in Entra; not full PAM." },
      { stars: 2, note: "Via partners only." },
      { stars: 2, note: "Limited native PAM." },
      { stars: 5, note: "Category leader. Vault, JIT, session recording." },
      { stars: 0, note: "Out of scope." },
      { stars: 2, note: "Light privileged controls only." },
      { stars: 5, note: "Privileged remote access, endpoint privilege." },
      { stars: 5, note: "Secret Server vaulting, JIT elevation." },
      { stars: 4, note: "Safeguard vault and session management." },
    ],
  },
  {
    label: "Identity Governance (IGA)",
    type: "stars",
    cells: [
      { stars: 4, note: "Entra ID Governance, lifecycle workflows." },
      { stars: 4, note: "Okta Identity Governance, growing." },
      { stars: 3, note: "Workflow-led, smaller deployments." },
      { stars: 2, note: "Out of focus, partner ecosystem." },
      { stars: 5, note: "Reference IGA platform. Certifications, SoD." },
      { stars: 5, note: "Cloud-native IGA, application GRC, SoD." },
      { stars: 0, note: "Out of scope." },
      { stars: 1, note: "Not an IGA platform." },
      { stars: 4, note: "Identity Manager governance and certification." },
    ],
  },
  {
    label: "Cloud / Hybrid deployment",
    type: "text",
    cells: [
      "Azure SaaS + on-prem AD bridge",
      "Pure SaaS (Workforce + Customer)",
      "SaaS + on-prem PingFederate",
      "SaaS + Self-Hosted + Cloud Entitlements",
      "SaaS-first; on-prem heritage",
      "Cloud-native SaaS on AWS",
      "SaaS + on-prem appliance",
      "Cloud + on-prem Secret Server",
      "On-prem heritage + cloud options",
    ],
  },
  {
    label: "Compliance fit (NESA, PDPL, ISO)",
    type: "stars",
    cells: [
      { stars: 5, note: "Microsoft Purview + Entra audit." },
      { stars: 5, note: "Audit logs, Workforce Identity Cloud." },
      { stars: 4, note: "Strong audit and federation logs." },
      { stars: 5, note: "Vault and session evidence." },
      { stars: 5, note: "Access certification, SoD reports." },
      { stars: 5, note: "Application GRC, SoD, audit reporting." },
      { stars: 5, note: "Privileged session recording and audit." },
      { stars: 4, note: "Vault audit and session evidence." },
      { stars: 4, note: "Cross-discipline audit from one vendor." },
    ],
  },
  {
    label: "Best suited for",
    type: "text",
    cells: [
      "Microsoft 365 estates wanting native identity",
      "Multi-cloud, multi-SaaS, neutral identity",
      "Hybrid workforce + customer-facing portals",
      "Regulated estates needing real PAM",
      "Mature IGA programmes, certifications",
      "Cloud-first IGA and application governance",
      "PAM with privileged remote and endpoint access",
      "Fast, low-friction PAM vaulting",
      "Mid-market wanting one vendor across disciplines",
    ],
  },
  {
    label: "Strategic Verdict",
    type: "verdict",
    cells: [
      { recommended: true, rank: "#1", text: "Recommended for Microsoft-aligned UAE enterprises. Often already licensed in M365 E3/E5." },
      { recommended: true, text: "Recommended for cloud-forward and multi-SaaS estates needing a neutral identity provider." },
      { text: "Strong choice where federation and customer identity are first-class requirements." },
      { recommended: true, text: "Recommended for PAM, the category-defining platform." },
      { recommended: true, text: "Recommended for IGA, the reference platform for governance." },
      { text: "Cloud-first IGA challenger to SailPoint." },
      { text: "Strong PAM alternative to CyberArk." },
      { text: "PAM for fast, low-friction vaulting." },
      { text: "Unified IAM, PAM and IGA from one vendor." },
    ],
  },
];

/* ───────── DETAILED VENDOR CARDS ───────── */

type VendorCard = {
  id?: string;
  name: string;
  best: string;
  strength: string;
  watch: string;
  logo?: string;
};

const vendors: VendorCard[] = [
  {
    id: "microsoft",
    name: "Microsoft Entra",
    best: "Best for Microsoft 365 estates (Recommended)",
    strength:
      "The native identity layer for Microsoft 365, Azure and the wider Microsoft stack. Entra ID delivers SSO, MFA and Conditional Access; Entra ID Governance adds lifecycle workflows and access reviews; Entra Permissions Management covers cloud entitlements. Frequently already licensed under M365 E3 or E5 and the lowest-friction starting point for Microsoft-aligned UAE enterprises.",
    watch:
      "Entra is workforce identity at heart. For deep PAM, pair with CyberArk; for advanced IGA at enterprise scale, pair with SailPoint or Saviynt.",
    logo: "/logos/microsoft.svg",
  },
  {
    id: "okta",
    name: "Okta",
    best: "Best for multi-cloud, multi-SaaS (Recommended)",
    strength:
      "The neutral-ground identity platform. 7,000+ pre-built connectors, Workforce Identity Cloud for employees, Customer Identity Cloud (Auth0) for end users. Strong developer ecosystem and the right choice when you cannot bet the identity layer on a single hyperscaler.",
    watch:
      "Pure SaaS, deep cloud dependency. PAM and on-prem heritage are weaker than Microsoft or PingFederate, layer CyberArk or BeyondTrust on top.",
    logo: "/logos/Okta.png",
  },
  {
    id: "ping",
    name: "Ping Identity",
    best: "Strong for hybrid workforce + customer identity",
    strength:
      "Mature federation lineage, strong PingFederate on-prem option and a full customer-identity (CIAM) stack. The natural choice when SAML/OIDC depth and customer-facing portals (banking, telco) are the priority and you want hybrid deployment without committing to pure SaaS.",
    watch:
      "Smaller ecosystem than Microsoft or Okta. Privileged Access and IGA are not the focus, partner up.",
    logo: "/logos/pingidentity.png",
  },
  {
    id: "cyberark",
    name: "CyberArk",
    best: "Best for Privileged Access (Recommended)",
    strength:
      "Invented PAM as a discipline. Privileged Cloud, Self-Hosted Vault, Session Manager and Endpoint Privilege Manager cover every privileged use case from human admins to service accounts and DevOps secrets. The default PAM choice for finance, government and critical-infrastructure customers in the UAE.",
    watch:
      "Premium pricing, premium outcome. For SMB or simpler privilege programmes, BeyondTrust or Delinea are more cost-effective.",
    logo: "/logos/CyberArk.png",
  },
  {
    id: "sailpoint",
    name: "SailPoint",
    best: "Best for Identity Governance (Recommended)",
    strength:
      "The reference IGA platform. Identity Security Cloud delivers access certification, role mining, segregation-of-duties and AI-driven access modelling. The default choice when auditors and regulators (NESA, ISO 27001, CBUAE, SAMA) ask 'who has access to what, and why'.",
    watch:
      "IGA-only. Pair with Entra or Okta for SSO/MFA and CyberArk for PAM, SailPoint is one layer in the broader programme, not the whole stack.",
    logo: "/logos/sailpoint.webp",
  },
  {
    id: "saviynt",
    name: "Saviynt",
    best: "Strong cloud-first IGA",
    strength:
      "Cloud-native IGA built on AWS. Strong on application access governance, cross-application SoD and rapid time-to-value compared to legacy on-prem IGA. The cost-effective alternative to SailPoint for organisations starting their IGA programme in the cloud.",
    watch:
      "Less mature than SailPoint in the largest, most complex global rollouts. Confirm scale and integration scope during scoping.",
    logo: "/logos/Saviynt.png",
  },
  {
    id: "beyondtrust",
    name: "BeyondTrust",
    best: "Strong PAM alternative to CyberArk",
    strength:
      "A privileged access specialist with deep strength in privileged remote access and endpoint privilege management. Password Safe handles credential vaulting and session control, while Privilege Management for Windows, Mac and Unix removes standing admin rights at the endpoint. A pragmatic, cost-effective PAM choice for UAE estates that want strong privileged control without the heaviest enterprise footprint.",
    watch:
      "PAM-focused: it is not an IAM, SSO or IGA platform. Pair with Entra or Okta for workforce identity and SailPoint or Saviynt for governance.",
    logo: "/logos/BeyondTrust.webp",
  },
  {
    id: "delinea",
    name: "Delinea",
    best: "PAM for fast, low-friction vaulting",
    strength:
      "Formed from Thycotic and Centrify, Delinea leads on speed and simplicity. Secret Server delivers credential vaulting that teams actually adopt, and just-in-time elevation reduces standing privilege without slowing admins down. A strong fit when fast time-to-value and low operational friction matter as much as raw feature depth.",
    watch:
      "PAM-focused: no native IGA or customer identity. Layer in Entra or Okta for IAM and SailPoint or Saviynt where governance is required.",
    logo: "/logos/Delinea.webp",
  },
  {
    id: "one-identity",
    name: "One Identity",
    best: "Unified IAM, PAM and IGA from one vendor",
    strength:
      "A single-vendor portfolio spanning OneLogin for IAM and SSO, Safeguard for privileged access and Identity Manager for governance. The appeal is consolidation: one relationship and one roadmap across disciplines, which suits mid-market and mid-size enterprise teams that want broad coverage without stitching together multiple best-of-breed platforms.",
    watch:
      "Broad mid-tier rather than category leader in any single discipline. Where one pillar is mission-critical, a specialist such as CyberArk or SailPoint may still be the better fit.",
    logo: "/logos/OneIdentity.png",
  },
];

/* ───────── GARTNER-STYLE SCORECARD ───────── */

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "none";
type FeatureCell = { tier: Tier; note?: string };

const tierStyles: Record<Tier, { bg: string; text: string; label: string }> = {
  best: { bg: "bg-emerald-600", text: "text-white", label: "Best in class" },
  excellent: { bg: "bg-emerald-500", text: "text-white", label: "Excellent" },
  veryStrong: { bg: "bg-sky-200", text: "text-sky-900", label: "Very strong" },
  strong: { bg: "bg-amber-200", text: "text-amber-900", label: "Strong" },
  good: { bg: "bg-amber-100", text: "text-amber-900", label: "Good" },
  none: { bg: "bg-slate-200", text: "text-slate-600", label: "None / N/A" },
};

const featureVendors = ["Microsoft Entra", "Okta", "Ping", "CyberArk", "SailPoint", "Saviynt", "BeyondTrust", "Delinea", "One Identity"];

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  { label: "SSO / Federation", cells: [{ tier: "best", note: "Native to M365" }, { tier: "best", note: "7,000+ connectors" }, { tier: "excellent", note: "Federation lineage" }, { tier: "good", note: "Via partners" }, { tier: "good", note: "Via partners" }, { tier: "good", note: "Not an SSO platform" }, { tier: "none", note: "Out of scope" }, { tier: "none", note: "Out of scope" }, { tier: "strong", note: "OneLogin SSO" }] },
  { label: "Multi-Factor Authentication", cells: [{ tier: "best", note: "Authenticator, Conditional Access" }, { tier: "excellent", note: "Okta Verify push" }, { tier: "excellent", note: "Adaptive MFA" }, { tier: "strong", note: "Limited native" }, { tier: "strong", note: "Via IdP partners" }, { tier: "good", note: "Light MFA" }, { tier: "good", note: "Privileged MFA only" }, { tier: "good", note: "Privileged MFA only" }, { tier: "strong", note: "OneLogin MFA" }] },
  { label: "Conditional / Adaptive Access", cells: [{ tier: "best", note: "Conditional Access policy" }, { tier: "excellent", note: "Adaptive risk policies" }, { tier: "excellent", note: "Risk-based access" }, { tier: "good", note: "Not the focus" }, { tier: "good", note: "Not the focus" }, { tier: "good", note: "Not the focus" }, { tier: "good", note: "Privileged context only" }, { tier: "good", note: "Privileged context only" }, { tier: "strong", note: "Adaptive via OneLogin" }] },
  { label: "Identity Lifecycle", cells: [{ tier: "excellent", note: "Lifecycle workflows" }, { tier: "excellent", note: "Automated provisioning" }, { tier: "strong", note: "Workflow-led" }, { tier: "good", note: "Limited scope" }, { tier: "best", note: "Reference lifecycle engine" }, { tier: "excellent", note: "Cloud-native provisioning" }, { tier: "good", note: "Privileged accounts only" }, { tier: "good", note: "Privileged accounts only" }, { tier: "strong", note: "Identity Manager workflows" }] },
  { label: "Identity Governance (IGA)", cells: [{ tier: "veryStrong", note: "Entra ID Governance" }, { tier: "veryStrong", note: "Okta Identity Governance" }, { tier: "strong", note: "Smaller deployments" }, { tier: "good", note: "Partner ecosystem" }, { tier: "best", note: "Reference IGA platform" }, { tier: "excellent", note: "Cloud-native IGA, app GRC" }, { tier: "none", note: "Out of scope" }, { tier: "good", note: "Privileged governance only" }, { tier: "strong", note: "Identity Manager governance" }] },
  { label: "Privileged Access (PAM)", cells: [{ tier: "strong", note: "PIM only" }, { tier: "good", note: "Via partners only" }, { tier: "good", note: "Limited native PAM" }, { tier: "best", note: "Vault, JIT, session recording" }, { tier: "none", note: "Out of scope" }, { tier: "good", note: "Light privileged controls" }, { tier: "best", note: "Privileged remote, endpoint" }, { tier: "excellent", note: "Secret Server, JIT" }, { tier: "veryStrong", note: "Safeguard vault" }] },
  { label: "Customer Identity (CIAM)", cells: [{ tier: "veryStrong", note: "Entra External ID" }, { tier: "best", note: "via Auth0" }, { tier: "excellent", note: "Full CIAM stack" }, { tier: "good", note: "Not the focus" }, { tier: "none", note: "Out of scope" }, { tier: "none", note: "Out of scope" }, { tier: "none", note: "Out of scope" }, { tier: "none", note: "Out of scope" }, { tier: "good", note: "Limited CIAM" }] },
  { label: "On-prem / Hybrid deploy", cells: [{ tier: "excellent", note: "AD bridge" }, { tier: "good", note: "SaaS-only" }, { tier: "best", note: "PingFederate" }, { tier: "excellent", note: "Self-hosted vault" }, { tier: "veryStrong", note: "On-prem heritage" }, { tier: "good", note: "Cloud-native SaaS" }, { tier: "excellent", note: "On-prem appliance" }, { tier: "excellent", note: "On-prem Secret Server" }, { tier: "best", note: "Deep on-prem heritage" }] },
  { label: "Compliance evidence (NESA, ISO, PDPL)", cells: [{ tier: "excellent", note: "Purview + Entra audit" }, { tier: "excellent", note: "Workforce Cloud audit logs" }, { tier: "veryStrong", note: "Federation audit logs" }, { tier: "best", note: "Vault, session evidence" }, { tier: "best", note: "Certification, SoD reports" }, { tier: "excellent", note: "App GRC, SoD reporting" }, { tier: "veryStrong", note: "Session recording, audit" }, { tier: "strong", note: "Vault and session audit" }, { tier: "strong", note: "Cross-discipline audit" }] },
];

/* ───────── DECISION FRAMEWORK ───────── */

const decisionQuestions = [
  {
    q: "Is the organisation deeply standardised on Microsoft 365?",
    a: "If yes, Microsoft Entra is usually the right foundation. SSO, MFA, Conditional Access and basic governance are frequently already licensed in M365 E3 or E5. Layer CyberArk for PAM and SailPoint or Saviynt if mature IGA is required.",
  },
  {
    q: "Do you run a multi-cloud, multi-SaaS environment?",
    a: "Okta is the neutral-ground choice. 7,000+ connectors and a SaaS-first model make it the safest identity layer when you cannot bet on one hyperscaler. Auth0 covers the customer-identity (CIAM) side.",
  },
  {
    q: "Do administrators and DevOps teams hold the keys to your most sensitive systems?",
    a: "Privileged Access Management is non-negotiable. CyberArk is the category leader for regulated UAE customers, with BeyondTrust and Delinea as strong cost-effective alternatives.",
  },
  {
    q: "Do auditors ask 'who has access to what, and should they?'",
    a: "Identity Governance (IGA) is the answer. SailPoint is the reference; Saviynt is the cloud-first challenger; Entra ID Governance is the Microsoft-native option for M365 estates.",
  },
  {
    q: "Are you protecting a customer-facing portal as well as employees?",
    a: "You need both Workforce Identity (employees) and Customer Identity (end users). Okta Auth0 and Ping CIAM are the leaders, Microsoft Entra External ID is the right answer for Microsoft-aligned customer scenarios.",
  },
  {
    q: "What does NESA, PDPL, ISO 27001 require you to prove about access?",
    a: "Every framework demands: who accessed what, with what right, when, and was that right ever reviewed. The combination of strong MFA, IGA and PAM with audit-ready logs covers the spec, vendor mix follows the assessment.",
  },
];

/* ───────── DELIVERY MODEL ───────── */

const deliveryStages = [
  {
    title: "Assess",
    duration: "2–3 weeks",
    summary:
      "Identity discovery, application inventory, identity-store inventory (AD, Entra, HR), threat-modelling against ATT&CK identity techniques, compliance-gap mapping (NESA, ISO 27001, PDPL).",
    deliverable: "Current-state identity report, target architecture, vendor recommendation with rationale, three-year TCO.",
  },
  {
    title: "Design",
    duration: "2–4 weeks",
    summary:
      "Identity-store rationalisation, SSO/MFA blueprint, Conditional Access policy, IGA role model, PAM vault and JIT design, ITDR detection coverage.",
    deliverable: "Approved architecture, role and policy catalogues, runbook framework.",
  },
  {
    title: "Deploy",
    duration: "4–12 weeks",
    summary:
      "Phased rollout: MFA first, SSO migrations, Conditional Access enforcement, IGA pilot, PAM vault onboarding, ITDR detection tuning. Day-1 hypercare on every wave.",
    deliverable: "Live identity controls, certified access, audit-ready evidence pack.",
  },
  {
    title: "Manage",
    duration: "Ongoing",
    summary:
      "Identity operations, lifecycle automation, recertification cycles, privileged-session review, ITDR monitoring, monthly board-readable reporting, quarterly architecture reviews.",
    deliverable: "An operational identity programme that auditors and the CISO can sign off on.",
  },
];

/* ───────── FAQ ───────── */

const faqs = [
  {
    question: "What is the difference between Identity & Access Security and IAM?",
    answer:
      "IAM (Identity & Access Management) is one discipline inside the broader Identity & Access Security programme. Identity & Access Security covers IAM (identities and access) plus the controls that protect them: MFA, IGA, PAM, ITDR and Zero Trust enforcement. IAM gives people the right access; Identity & Access Security keeps that access from being abused.",
  },
  {
    question: "Where should a UAE enterprise start?",
    answer:
      "Almost always with MFA on every account that touches corporate data, that single control closes most account-takeover attacks. After MFA, the priority depends on the threat model: PAM if you have many privileged admins, IGA if auditors are asking 'who has access to what', and a broader IAM cleanup if identity stores are fragmented across AD, Entra and shadow directories.",
  },
  {
    question: "Do we need separate vendors for IAM, IGA and PAM?",
    answer:
      "Often yes, but not always. Microsoft Entra covers IAM and a credible chunk of IGA out of the box. Specialist programmes layer in best-of-breed: CyberArk for PAM, SailPoint or Saviynt for deep IGA. Artiflex selects the right mix during the assessment, the goal is the outcome, not the vendor.",
  },
  {
    question: "How does Identity & Access Security map to NESA, UAE PDPL and ISO 27001?",
    answer:
      "Every framework asks the same fundamentals: prove who accessed what, with what right, when, and that the right was reviewed. Identity & Access Security delivers that proof via MFA records, Conditional Access logs, IGA access certifications and PAM session recordings. Artiflex packages the evidence pack auditors actually want.",
  },
  {
    question: "What is Zero Trust Identity?",
    answer:
      "Never trust, always verify. Continuous, context-aware verification of every access request, regardless of network location or prior login. Identity becomes the new perimeter, MFA, Conditional Access, ITDR and PAM are the controls that make it real.",
  },
  {
    question: "Can Artiflex co-manage our identity programme?",
    answer:
      "Yes. Fully managed, co-managed and assessment-only engagements across Microsoft Entra, Okta, Ping, CyberArk, SailPoint, Saviynt, BeyondTrust, Delinea and OneIdentity, with everything mapped to NESA, UAE PDPL, ISO 27001 and CBUAE / SAMA guidance.",
  },
];

/* ───────── HERO ───────── */

function IdentityHero() {
  const { open: openContact } = useContactModal();
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-navy-deep">
      <div aria-hidden="true" className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/cybersecurity.png')" }} />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/70 to-navy-deep/90" />

      {/* Breadcrumb band */}
      <div className="relative z-10 border-b border-white/5">
        <div className="shell flex w-full items-center justify-end gap-4 pt-24 pb-3 sm:pt-28">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center justify-end gap-2 text-[10px] text-slate-400 sm:text-[11px]">
              <li><Link to="/" className="transition-colors hover:text-white">Home</Link></li>
              <li className="text-slate-600">/</li>
              <li><Link to="/cybersecurity" className="transition-colors hover:text-white">Cybersecurity</Link></li>
              <li className="text-slate-600">/</li>
              <li><span className="font-medium text-[#28B5E1]">Identity & Access Security</span></li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero masthead */}
      <div className="relative z-10 mx-auto flex w-full max-w-[88rem] flex-1 flex-col px-4 py-10 sm:px-5 sm:py-12 lg:px-6 lg:py-14">
        <div className="grid flex-1 grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:items-center lg:gap-8 xl:gap-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="w-full">
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[5rem]">
              Identity &amp; Access Security{" "}
              <span className="gradient-text">UAE</span>
              <span className="block font-display text-xl font-light leading-tight text-slate-300 sm:mt-3 sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl">
                IAM, MFA, IGA &amp; Privileged Access
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:mt-6 sm:text-base xl:text-lg">
              Artiflex IT designs, deploys and runs Identity & Access Security programmes across the UAE, Oman and Saudi Arabia, unifying IAM, multi-factor authentication, identity governance, privileged access and identity threat detection into one defensible posture. <span className="font-semibold text-white">Microsoft Entra, Okta, Ping Identity, CyberArk, SailPoint, Saviynt, BeyondTrust, Delinea and OneIdentity</span>, picked on workload, compliance scope and stack alignment, not vendor preference.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link to="/blog/origin-identity-access-management" className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#28B5E1]/40 bg-[#28B5E1]/10 px-4 py-2 text-xs font-semibold text-[#28B5E1] backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1] hover:bg-[#28B5E1]/20 hover:text-white sm:px-5 sm:py-2.5 sm:text-sm">
                Read Origin Story
                <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </Link>
              <button onClick={openContact} className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-5 sm:py-2.5 sm:text-sm">
                Get a Free Identity Assessment
                <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </button>
            </div>
          </motion.div>

          {/* Portfolios + Origin Story cards */}
          <div>
            {(() => {
              const identityTopics: {
                label: string;
                icon: typeof LockIcon;
                productHref: string;
                originHref: string;
              }[] = [
                { label: "Identity & Access Management (IAM)", icon: UsersIcon, productHref: "/cybersecurity/identity-access-security/iam", originHref: "/blog/origin-identity-access-management" },
                { label: "Multi-Factor Authentication (MFA)", icon: ShieldIcon, productHref: "/cybersecurity/identity-access-security/mfa", originHref: "/blog/origin-mfa" },
                { label: "Identity Governance (IGA)", icon: ActivityIcon, productHref: "/cybersecurity/identity-access-security/iga", originHref: "/blog/origin-iga" },
                { label: "Privileged Access (PAM)", icon: LockIcon, productHref: "/cybersecurity/identity-access-security/pam", originHref: "/blog/origin-pam" },
              ];

              const tileCls =
                "group relative flex min-h-[42px] min-w-0 items-center gap-1.5 overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.035] px-1.5 py-1.5 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/55 hover:bg-gradient-to-br hover:from-[#045891]/40 hover:to-[#1B8AC7]/20 hover:shadow-[0_10px_24px_-8px_rgba(40,181,225,0.5)] sm:gap-2 sm:px-2";

              const renderGrid = (variant: "origin" | "portfolio") => (
                <div className="mt-2.5 grid grid-cols-2 gap-1.5 sm:gap-2">
                  {identityTopics.map((t) => {
                    const Icon = t.icon;
                    const href = variant === "origin" ? t.originHref : t.productHref;
                    return (
                      <Link key={`${variant}-${t.label}`} to={href} className={tileCls}>
                        <span aria-hidden className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#28B5E1]/10 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100" />
                        <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-[#28B5E1]/25 to-[#1B8AC7]/10 text-[#4FC3F7] transition-all group-hover:from-[#28B5E1]/55 group-hover:to-[#1B8AC7]/35 group-hover:text-white">
                          <Icon className="h-3 w-3" />
                        </span>
                        <span className="relative min-w-0 flex-1 whitespace-normal break-words text-[10px] font-semibold leading-tight text-white/90 group-hover:text-white sm:text-[10.5px]">
                          {t.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              );

              const cardCls =
                "relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent p-3 backdrop-blur-md shadow-[0_20px_60px_-30px_rgba(40,181,225,0.4)] sm:p-3.5";

              return (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5">
                  {/* Portfolios */}
                  <div className={cardCls}>
                    <div aria-hidden className="pointer-events-none absolute -top-16 -left-12 h-40 w-40 rounded-full bg-[#1B8AC7]/[0.1] blur-3xl" />
                    <div aria-hidden className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/40 to-transparent" />
                    <div className="relative">
                      <div className="flex items-center gap-2">
                        <span aria-hidden className="h-1 w-6 rounded-full bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1]" />
                        <h3 className="font-display text-sm font-bold text-white sm:text-base">
                          Portfolios<span className="text-[#28B5E1]">.</span>
                        </h3>
                      </div>
                      <p className="mt-1 text-[10.5px] leading-relaxed text-slate-300/80">
                        Explore the capability that fits your stack.
                      </p>
                      {renderGrid("portfolio")}
                    </div>
                  </div>

                  {/* The Origin Story */}
                  <div className={cardCls}>
                    <div aria-hidden className="pointer-events-none absolute -top-16 -right-12 h-40 w-40 rounded-full bg-[#28B5E1]/[0.09] blur-3xl" />
                    <div aria-hidden className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/40 to-transparent" />
                    <div className="relative">
                      <div className="flex items-center gap-2">
                        <span aria-hidden className="h-1 w-6 rounded-full bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1]" />
                        <h3 className="font-display text-sm font-bold text-white sm:text-base">
                          The Origin Story<span className="text-[#28B5E1]">.</span>
                        </h3>
                      </div>
                      <p className="mt-1 text-[10.5px] leading-relaxed text-slate-300/80">
                        Read the story behind each identity pillar.
                      </p>
                      {renderGrid("origin")}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Scroll affordance */}
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

export default function IdentityAccessSecurity() {
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Identity & Access Security UAE | IAM, MFA, IGA & PAM | Artiflex IT</title>
        <meta
          name="description"
          content="UAE Identity & Access Security: IAM, MFA, IGA and PAM in one programme. An overview of the four identity disciplines Artiflex designs, deploys and manages across the UAE."
        />
        <link rel="canonical" href="https://artiflexit.com/cybersecurity/identity-access-security" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Identity & Access Security (IAM, MFA, IGA, PAM)",
            "provider": { "@type": "Organization", "name": "Artiflex IT" },
            "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
            "description": "UAE Identity & Access Security delivery across Microsoft Entra, Okta, Ping Identity, CyberArk, SailPoint, Saviynt, BeyondTrust, Delinea and OneIdentity.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((f) => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer } })),
          })}
        </script>
      </>

      <IdentityHero />

      {/* ───────── CAPABILITY MAP ───────── */}
      <section id="capabilities" className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">The Capability Map</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">The four disciplines of identity security</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Identity & Access Security is not a single product. It is a set of disciplines that feed each other: identity management as the foundation, MFA at the authentication layer, IGA for governance and audit, PAM for the highest-risk accounts.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c) => (
              <Link key={c.title} to={c.href} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1B8AC7]/60 hover:shadow-[0_20px_60px_-12px_rgba(27,138,199,0.20)]">
                <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#045891] to-[#28B5E1]" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#1B8AC7]">{c.tag}</span>
                <h3 className="mt-2 font-display text-xl font-bold text-slate-900">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{c.desc}</p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-slate-500">{c.focus}</p>
                <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1B8AC7] transition-colors">
                  {c.cta}
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </p>
              </Link>
            ))}
          </div>

          {/* COMBINATION / CONVERGED BUYING PATHS */}
          <div className="mx-auto mt-12 max-w-5xl rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
                Need more than one discipline?
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-slate-900 sm:text-[1.75rem]">
                Yes, you can buy the combination, two ways
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                Most UAE enterprises need more than one of these disciplines, and Gartner expects the
                majority of new identity deployments to land on converged platforms. We run the
                assessment first, then design the right mix around your estate and compliance scope.
              </p>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <div className="rounded-xl border border-border-light bg-white p-5 sm:p-6">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#1B8AC7]">
                  Converged platform
                </p>
                <h4 className="mt-2 font-display text-lg font-bold text-slate-900">One vendor, one roadmap</h4>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Microsoft Entra Suite, One Identity, Okta Workforce Identity Cloud, Saviynt and
                  CyberArk now bundle IAM, MFA, governance and privileged access into a single platform
                  and contract. Best when you want one support relationship, one roadmap and the lowest
                  integration effort.
                </p>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5 sm:p-6">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                  Best-of-breed fabric
                </p>
                <h4 className="mt-2 font-display text-lg font-bold text-slate-900">The strongest tool in each lane</h4>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  Pair the leader in each discipline, for example Microsoft Entra for cloud IAM and
                  conditional access, CyberArk for privileged access, and SailPoint or Saviynt for
                  governance, integrated into one identity fabric. Best when no single vendor leads in
                  every discipline you need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── DECISION FRAMEWORK ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">Decision Framework</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Questions we ask before designing the programme</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Identity programmes get cleaner when the questions are direct. Walk through these and the architecture usually falls out by itself.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
            {decisionQuestions.map((q, i) => (
              <article key={q.q} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#045891] to-[#1B8AC7] font-display text-sm font-bold text-white">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-display text-base font-bold text-slate-900">{q.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{q.a}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── DELIVERY MODEL ───────── */}
      <section className="relative bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="How we work"
            title={<>Our identity <span className="gradient-text">delivery model</span></>}
            description="We don't sell licences. We deliver identity outcomes: assess, design, deploy, manage. Every stage produces something an auditor can read and a CFO can sign off on."
            centered
          />

          <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-4">
            {deliveryStages.map((s, idx) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: idx * 0.08 }} className="group relative overflow-hidden rounded-2xl border border-border-light bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/25 hover:shadow-[0_12px_40px_rgba(27,138,199,0.10)] sm:p-6">
                <div className="flex items-baseline justify-end">
                  <span className="rounded-full border border-border-light bg-surface-secondary px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">{s.duration}</span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-heading">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">{s.summary}</p>
                <div className="mt-4 border-t border-border-light pt-3">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">You get</p>
                  <p className="mt-1 text-xs leading-relaxed text-body/85">{s.deliverable}</p>
                </div>
                {idx < 3 && (
                  <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 lg:block">
                    <div className="h-px w-6 bg-gradient-to-r from-brand-blue/40 to-transparent" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── WHY ARTIFLEX ───────── */}
      <section className="relative overflow-hidden bg-navy-deep py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(27,138,199,0.18),transparent_60%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#28B5E1]">Why Artiflex IT</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">14+ years of UAE identity delivery</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Vendor-agnostic by design. We will tell you when Entra wins, when Okta wins, when CyberArk is non-negotiable, and when your existing controls just need tuning. The point of an honest assessment is honest answers.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "14+", label: "Years in UAE identity delivery" },
              { value: "500+", label: "Projects delivered GCC-wide" },
              { value: "20+", label: "Certified identity engineers" },
              { value: "24/7", label: "Managed identity support" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-sm transition-colors duration-300 hover:border-[#28B5E1]/30">
                <p className="font-display text-3xl font-bold leading-none text-white sm:text-4xl">{stat.value}</p>
                <p className="mt-3 text-xs leading-relaxed text-slate-400 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Knowledge Base"
            title={<>Frequently <span className="gradient-text">asked</span> questions</>}
            description="What businesses ask us most about IAM, MFA, IGA and PAM."
            centered
          />

          <div className="mt-12 grid gap-6 sm:mt-14 lg:grid-cols-12 lg:gap-8">
            <ul className="flex flex-col gap-2 lg:col-span-6">
              {faqs.map((faq, idx) => {
                const isActive = activeFaq === idx;
                return (
                  <li key={faq.question}>
                    <button type="button" onClick={() => setActiveFaq(idx)} aria-pressed={isActive} aria-controls="faq-answer-panel" className={`group flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-semibold transition-all duration-200 sm:px-5 sm:text-[15px] ${isActive ? "border-transparent bg-gradient-to-r from-[#045891] to-[#1B8AC7] text-white shadow-[0_8px_24px_-8px_rgba(27,138,199,0.55)]" : "border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-[#28B5E1]/60 hover:bg-slate-50 hover:text-[#1B8AC7]"}`}>
                      <span className="leading-snug">{faq.question}</span>
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 shrink-0 transition-transform duration-300 ${isActive ? "translate-x-0.5" : "opacity-50 group-hover:translate-x-0.5 group-hover:opacity-100"}`}><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="lg:col-span-6">
              <div id="faq-answer-panel" role="region" aria-live="polite" className="lg:sticky lg:top-24">
                <div className="overflow-hidden rounded-2xl border border-transparent bg-gradient-to-r from-[#045891] to-[#054466] p-6 shadow-[0_18px_40px_-18px_rgba(27,138,199,0.55)] sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-white">Faq</span>
                    <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-white/40 to-transparent" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold leading-snug text-white sm:text-2xl">{faqs[activeFaq].question}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">{faqs[activeFaq].answer}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Get the Identity & Access Security Selection Guide"
        description="A vendor-neutral comparison of IAM, MFA, IGA and PAM platforms, with TCO analysis, an identity-control matrix and real UAE deployment case studies."
        primaryButton={{ text: "Book a free identity posture assessment", action: "modal" }}
      />
    </>
  );
}
