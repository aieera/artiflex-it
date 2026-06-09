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
  ServerIcon,
  CloudIcon,
  GlobeIcon,
  BarChartIcon,
  SearchIcon,
  AlertTriangleIcon,
  GearIcon,
} from "@/components/icons";

/* ───────── DATA ───────── */

const stats: { value: string; label: string }[] = [
  {
    value: "74%",
    label: "Of data breaches involve privileged account abuse or misuse",
  },
  {
    value: "40%",
    label: "Of insider threat incidents involve ex-employees with retained privileged access",
  },
  {
    value: "100%",
    label: "Of major ransomware attacks require privileged access to execute fully",
  },
];

const jitFlow: { num: string; title: string; desc: string }[] = [
  {
    num: "01",
    title: "Request raised",
    desc: "An engineer opens a PAM portal and requests administrator access to a specific server for a specific task. They specify the reason, the expected duration, and the target system.",
  },
  {
    num: "02",
    title: "Approval workflow",
    desc: "For high-sensitivity systems, the request is routed to a manager or security team member for approval. For routine tasks on lower-risk systems, it may be auto-approved based on the engineer's role and the system's classification.",
  },
  {
    num: "03",
    title: "Privilege elevated",
    desc: "A temporary admin account is created, or the engineer's existing account is elevated for the approved duration, say, four hours. The PAM system connects them to the target system without revealing the underlying credential.",
  },
  {
    num: "04",
    title: "Session recorded",
    desc: "Every action during the session is logged, commands run, files accessed, configurations changed. The session recording is available for review and satisfies audit requirements for privileged access evidence.",
  },
  {
    num: "05",
    title: "Privilege automatically revoked",
    desc: "When the time window expires, the elevated access is automatically removed. The engineer cannot continue using the admin capability until they request it again. Standing privileges are eliminated entirely.",
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

const capabilities: {
  title: string;
  desc: string;
  icon: typeof LockIcon;
  accent: CapAccent;
}[] = [
  {
    title: "Privileged Credential Vaulting",
    desc: "All privileged account passwords, server root, database admin, network device, cloud IAM, are stored in an encrypted, access-controlled vault. No human ever sees the actual password. They check out access through the PAM system, which provides time-limited access without revealing the credential itself.",
    icon: LockIcon,
    accent: "rose",
  },
  {
    title: "Automatic Password Rotation",
    desc: "PAM rotates privileged account passwords automatically on a schedule or after each checkout. Even if a password is somehow compromised, it becomes invalid after use. Service account passwords are rotated automatically across all dependent systems, eliminating the operational barrier to frequent rotation.",
    icon: ActivityIcon,
    accent: "amber",
  },
  {
    title: "Session Recording and Monitoring",
    desc: "Every privileged session is recorded, keystrokes, commands, screen activity, and stored for audit review. Real-time monitoring can detect suspicious commands and terminate sessions automatically if policy is violated. Provides a complete forensic record of every admin action taken.",
    icon: EyeIcon,
    accent: "cyan",
  },
  {
    title: "Just-in-Time (JIT) Privileged Access",
    desc: "Instead of having permanent administrator accounts, PAM issues time-limited elevated privileges on demand. An engineer requests admin access for a specific task, is granted it for a specific window, and the privilege is automatically revoked when the window expires. No standing privileges, no permanent admin accounts.",
    icon: TargetIcon,
    accent: "emerald",
  },
  {
    title: "Secrets Management",
    desc: "Modern applications and DevOps pipelines have their own credential problem: hardcoded API keys, database passwords, and service credentials embedded in code or configuration files. PAM's secrets management capability provides a programmatic API for applications to retrieve credentials at runtime without storing them statically, eliminating the security risk of hardcoded secrets.",
    icon: ShieldIcon,
    accent: "violet",
  },
  {
    title: "Privileged Access Governance",
    desc: "Integration with IGA platforms to ensure that privileged access is included in access reviews, that SoD policies apply to privileged accounts, and that unused privileged access is automatically detected and flagged for revocation. Privileged governance closes the gap between general access reviews and admin account management.",
    icon: UsersIcon,
    accent: "teal",
  },
  {
    title: "Privilege Elevation & Delegation (PEDM)",
    desc: "Remove standing local-admin rights and grant only the privilege each task needs. Application allow-listing, command-level control on Unix and Linux, and policy-based elevation on servers and endpoints stop an attacker from turning a single foothold into full control of the estate.",
    icon: ServerIcon,
    accent: "amber",
  },
  {
    title: "Cloud Privileged Access (CPAM / CIEM)",
    desc: "Govern privileged entitlements across AWS, Azure and GCP, right-size over-permissioned cloud roles, and broker just-in-time elevation for cloud administrators. This closes the cloud-privilege gap that traditional, on-prem-only vaulting leaves wide open.",
    icon: CloudIcon,
    accent: "cyan",
  },
  {
    title: "Remote & Third-Party Privileged Access",
    desc: "Give vendors and contractors privileged access without a VPN or standing credentials. Sessions are brokered, scoped to a specific system and time window, and fully recorded, so external privileged access is controlled, time-bound and auditable rather than an open door.",
    icon: GlobeIcon,
    accent: "teal",
  },
  {
    title: "Threat Analytics & Session Auditing",
    desc: "Score privileged behaviour, detect anomalous or malicious activity inside live sessions, and feed identity threat detection and response. Board-readable privileged-risk reporting turns raw session data into both audit evidence and early warning.",
    icon: BarChartIcon,
    accent: "violet",
  },
];

/* ───────── PAM VENDORS LINEUP (HONEYCOMB) ───────── */

const vendorLineup: { slug: string; name: string; logo: string }[] = [
  { slug: "beyondtrust", name: "BeyondTrust", logo: "/logos/BeyondTrust.webp" },
  { slug: "cyberark", name: "CyberArk", logo: "/logos/CyberArk.png" },
  { slug: "fortra", name: "Fortra", logo: "/logos/Fortra.png" },
  { slug: "delinea", name: "Delinea", logo: "/logos/Delinea.webp" },
  { slug: "one-identity-safeguard", name: "One Identity Safeguard", logo: "/logos/OneIdentity.png" },
  { slug: "saviynt-pam", name: "Saviynt PAM", logo: "/logos/Saviynt.png" },
  { slug: "microsoft-entra-pim", name: "Microsoft Entra PIM", logo: "/logos/microsoft.svg" },
  { slug: "hashicorp-vault", name: "HashiCorp Vault", logo: "/logos/HashiCorp.png" },
  { slug: "senhasegura", name: "Senhasegura", logo: "/logos/senhasegura.png" },
];

/* ───────── SIX-STEP PAM CONTROL MODEL ───────── */

const pamLayers: {
  tag: string;
  icon: typeof LockIcon;
  title: string;
  desc: string;
  details: string;
}[] = [
  {
    tag: "Step 1",
    icon: SearchIcon,
    title: "Discover",
    desc: "Find every privileged account.",
    details:
      "Continuously discover privileged, service, and machine accounts across servers, databases, network devices, cloud and SaaS. You cannot protect privileged access you cannot see, and most estates have far more privileged accounts than they expect.",
  },
  {
    tag: "Step 2",
    icon: LockIcon,
    title: "Vault",
    desc: "Lock the credentials away.",
    details:
      "Store every privileged credential in an encrypted, access-controlled vault and rotate it automatically. No human ever sees the underlying password again, and shared or default credentials are eliminated across the estate.",
  },
  {
    tag: "Step 3",
    icon: ShieldIcon,
    title: "Enforce Least Privilege",
    desc: "Only the access each task needs.",
    details:
      "Remove standing local-admin rights and grant only the privilege a task requires through policy-based elevation and delegation (PEDM). A single compromised endpoint can no longer become full control of the estate.",
  },
  {
    tag: "Step 4",
    icon: TargetIcon,
    title: "Just-in-Time",
    desc: "Elevate on demand, time-bound.",
    details:
      "Issue elevated privileges only for the duration of a specific, approved task, then revoke them automatically. Zero standing privilege means a phished credential opens no privileged doors.",
  },
  {
    tag: "Step 5",
    icon: EyeIcon,
    title: "Monitor & Record",
    desc: "Capture every privileged session.",
    details:
      "Record every privileged session, keystrokes, commands and screen activity, for audit review and forensics. Real-time monitoring can flag suspicious commands and terminate a session that breaks policy.",
  },
  {
    tag: "Step 6",
    icon: BarChartIcon,
    title: "Analyse & Respond",
    desc: "Turn sessions into early warning.",
    details:
      "Score privileged behaviour, detect anomalous activity inside live sessions, and feed identity threat detection and response. Board-readable privileged-risk reporting becomes both audit evidence and early warning.",
  },
];

/* ───────── QUADRANT ───────── */
/* ───────── VENDOR COMPARISON MATRIX ───────── */

const matrixVendors: { name: string; recommended?: boolean; rank?: string }[] = [
  { name: "BeyondTrust", recommended: true },
  { name: "CyberArk", recommended: true },
  { name: "Fortra", recommended: true },
  { name: "Delinea" },
  { name: "One Identity (Safeguard)" },
  { name: "Saviynt PAM" },
  { name: "Microsoft Entra PIM" },
  { name: "HashiCorp Vault" },
  { name: "Senhasegura" },
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
      "BeyondTrust 1985, converged PAM + remote",
      "CyberArk 1999, PAM category creator",
      "Fortra (Core Security / BoKS), enterprise PAM heritage",
      "Delinea (Thycotic + Centrify merger)",
      "One Identity Safeguard, IGA + PAM",
      "Saviynt Cloud PAM, converged with Identity Cloud",
      "Microsoft Entra PIM, bundled in E5 / Entra ID P2",
      "HashiCorp Vault, DevOps-native secrets",
      "Senhasegura, EMEA PAM challenger",
    ],
  },
  {
    label: "Credential Vault",
    type: "stars",
    cells: [
      { stars: 5, note: "Mature vault" },
      { stars: 5, note: "Strongest enterprise vault" },
      { stars: 5, note: "Strong credential vault" },
      { stars: 5, note: "Solid vault" },
      { stars: 5, note: "Safeguard vault" },
      { stars: 3, note: "Cloud credential brokering, lighter vault" },
      { stars: 2, note: "No vault, JIT role elevation only" },
      { stars: 5, note: "Cloud-native secrets vault" },
      { stars: 5, note: "Solid vault" },
    ],
  },
  {
    label: "Auto Password Rotation",
    type: "stars",
    cells: [
      { stars: 5, note: "Mature rotation" },
      { stars: 5, note: "Mature auto-rotation" },
      { stars: 5, note: "Rotation + secure reset" },
      { stars: 5, note: "Solid rotation" },
      { stars: 5, note: "Native rotation" },
      { stars: 3, note: "Cloud credential rotation" },
      { stars: 1, note: "Not applicable, no vault" },
      { stars: 5, note: "Dynamic secrets generation" },
      { stars: 5, note: "Solid rotation" },
    ],
  },
  {
    label: "Session Recording",
    type: "stars",
    cells: [
      { stars: 5, note: "Comprehensive recording" },
      { stars: 5, note: "Industry-leading recording" },
      { stars: 5, note: "Solid session recording" },
      { stars: 5, note: "Solid recording" },
      { stars: 5, note: "Safeguard recording" },
      { stars: 3, note: "Cloud session monitoring" },
      { stars: 1, note: "Logs elevation events, no session recording" },
      { stars: 1, note: "Not a focus" },
      { stars: 5, note: "Solid recording" },
    ],
  },
  {
    label: "Privilege Elevation (PEDM)",
    type: "stars",
    cells: [
      { stars: 5, note: "Best endpoint privilege control" },
      { stars: 5, note: "EPM module" },
      { stars: 4, note: "Endpoint privilege management" },
      { stars: 4, note: "Privilege Manager" },
      { stars: 3, note: "Moderate" },
      { stars: 3, note: "Growing" },
      { stars: 2, note: "Basic, role elevation only" },
      { stars: 1, note: "Not a focus" },
      { stars: 3, note: "Moderate" },
    ],
  },
  {
    label: "Just-in-Time Access",
    type: "stars",
    cells: [
      { stars: 5, note: "Mature JIT" },
      { stars: 5, note: "Mature JIT" },
      { stars: 5, note: "Granular JIT elevation" },
      { stars: 5, note: "Solid JIT" },
      { stars: 5, note: "Native JIT" },
      { stars: 5, note: "JIT across cloud and SaaS" },
      { stars: 5, note: "JIT elevation for Azure / Entra roles" },
      { stars: 3, note: "Partial JIT" },
      { stars: 5, note: "JIT supported" },
    ],
  },
  {
    label: "Secrets Management",
    type: "stars",
    cells: [
      { stars: 4, note: "Solid secrets mgmt" },
      { stars: 5, note: "AAM secrets, mature" },
      { stars: 4, note: "Solid secrets handling" },
      { stars: 4, note: "Solid secrets mgmt" },
      { stars: 3, note: "Partial secrets mgmt" },
      { stars: 3, note: "Cloud-focused, lighter machine secrets" },
      { stars: 2, note: "Not a secrets manager" },
      { stars: 5, note: "Best-in-class DevOps secrets" },
      { stars: 3, note: "Partial secrets" },
    ],
  },
  {
    label: "Cloud PAM (AWS / Azure / GCP)",
    type: "stars",
    cells: [
      { stars: 5, note: "Solid cloud PAM" },
      { stars: 5, note: "Cloud Entitlements + Privilege Cloud" },
      { stars: 4, note: "Hybrid + cloud PAM" },
      { stars: 4, note: "Cloud PAM growing" },
      { stars: 4, note: "Cloud PAM growing" },
      { stars: 5, note: "Multi-cloud JIT plus CIEM" },
      { stars: 4, note: "Strong for Azure, weaker for AWS / GCP" },
      { stars: 5, note: "Cloud-native by design" },
      { stars: 3, note: "Partial cloud PAM" },
    ],
  },
  {
    label: "Privileged Remote Access",
    type: "stars",
    cells: [
      { stars: 5, note: "Best PRA in market" },
      { stars: 5, note: "Strong PRA" },
      { stars: 4, note: "Solid privileged remote access" },
      { stars: 4, note: "Solid PRA" },
      { stars: 4, note: "Solid PRA" },
      { stars: 4, note: "Third-Party Access Governance built in" },
      { stars: 1, note: "Not applicable" },
      { stars: 1, note: "Not applicable" },
      { stars: 4, note: "Solid PRA" },
    ],
  },
  {
    label: "Session Threat Analytics",
    type: "stars",
    cells: [
      { stars: 4, note: "Threat analytics" },
      { stars: 5, note: "Deepest analytics + ITDR" },
      { stars: 4, note: "Behaviour analytics" },
      { stars: 4, note: "Behaviour analytics" },
      { stars: 3, note: "Basic" },
      { stars: 4, note: "Identity analytics" },
      { stars: 4, note: "Entra signals" },
      { stars: 2, note: "Limited" },
      { stars: 3, note: "Basic" },
    ],
  },
  {
    label: "Deployment Speed / Time-to-Value",
    type: "stars",
    cells: [
      { stars: 4, note: "Moderate" },
      { stars: 3, note: "Heavier enterprise rollout" },
      { stars: 5, note: "Fast, pragmatic rollout" },
      { stars: 5, note: "Known for ease" },
      { stars: 4, note: "Moderate" },
      { stars: 4, note: "Cloud-fast" },
      { stars: 5, note: "Fast in M365 estates" },
      { stars: 3, note: "DevOps-oriented setup" },
      { stars: 4, note: "Quick regional deploy" },
    ],
  },
  {
    label: "UAE Compliance Fit",
    type: "stars",
    cells: [
      { stars: 5, note: "Strong audit trail" },
      { stars: 5, note: "Government and enterprise heritage" },
      { stars: 5, note: "Strong audit + compliance fit" },
      { stars: 5, note: "Strong audit trail" },
      { stars: 5, note: "Mature audit" },
      { stars: 4, note: "Converged audit, SaaS only" },
      { stars: 4, note: "Access reviews for Microsoft estate" },
      { stars: 4, note: "Audit via integration" },
      { stars: 5, note: "Strong audit + EMEA fit" },
    ],
  },
  {
    label: "5-Year TCO (5,000 users)",
    type: "stars",
    cells: [
      { stars: 4, note: "Premium but flexible" },
      { stars: 3, note: "Highest cost in market" },
      { stars: 5, note: "Best value for full-stack PAM" },
      { stars: 4, note: "Mid-market friendly" },
      { stars: 4, note: "Mid-market value" },
      { stars: 4, note: "Bundled with Identity Cloud, 25-40% lower stack TCO" },
      { stars: 5, note: "Bundled in E5 / Entra ID P2, near-zero incremental" },
      { stars: 5, note: "Open-source core option" },
      { stars: 4, note: "Competitive pricing" },
    ],
  },
  {
    label: "Best Suited For",
    type: "text",
    cells: [
      "Vendor / contractor remote access focus",
      "Large enterprises, government, regulated industries",
      "Best-value full-stack PAM, Unix / Linux server estates",
      "Mid-market enterprises, cost-conscious PAM",
      "Unified IGA + PAM single vendor",
      "Converged IGA + PAM on one cloud platform",
      "Cloud-admin privilege in Microsoft estates",
      "DevOps / cloud-native secrets",
      "EMEA mid-market PAM",
    ],
  },
  {
    label: "Strategic verdict",
    type: "verdict",
    cells: [
      { recommended: true, text: "The premium alternative for vendor / contractor remote access. Consider when third-party privileged access is the dominant requirement and budget is flexible." },
      { recommended: true, text: "The premium pick when budget allows. Most complete capability set and central-bank track record. Consider when sovereign mandates name CyberArk." },
      { recommended: true, text: "Artiflex's default PAM recommendation. Full privileged-access coverage at the strongest value for money. The right starting point for most UAE estates." },
      { text: "Strong full-stack PAM at a more accessible price. The pragmatic mid-market pick." },
      { text: "Native IGA + PAM in one vendor. The choice when consolidation matters." },
      { text: "Cloud-native PAM converged with Saviynt's IGA, AAG and CIEM on one platform. The choice when IGA plus PAM convergence on a single cloud is the decisive criterion. Lighter than the Leaders for deep, large-scale traditional vaulting." },
      { text: "Just-in-time elevation for Azure and Entra roles, bundled in Entra ID P2. The best quick win for cloud-admin privilege in Microsoft estates. Not a full vault or session-recording PAM, so pair it with a full PAM platform." },
      { text: "Best-in-class DevOps secrets. Deploy alongside a traditional PAM tool for human privileged access." },
      { text: "Solid PAM with EMEA presence. A competitive challenger for mid-market organisations." },
    ],
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
    name: "BeyondTrust",
    tier: "Leader",
    tag: "Premium · Budget-Flexible Alternative",
    blurb:
      "A premium alternative with unique Privileged Remote Access capabilities that serve vendor and contractor access management use cases particularly well. Artiflex recommends it when third-party privileged access is the dominant requirement and budget is flexible.",
    pros: [
      "Best vendor / contractor privileged remote access",
      "Solid cloud PAM for AWS, Azure, GCP",
      "Good integration with ITSM platforms",
    ],
    cons: [
      "Premium pricing relative to best-value platforms",
      "Some overlap between acquired products (BeyondTrust + Bomgar)",
    ],
  },
  {
    name: "CyberArk",
    tier: "Leader",
    tag: "Premium · Budget-Flexible Alternative",
    blurb:
      "The category creator and most-deployed PAM platform in regulated estates. The premium pick when budget allows: the most complete capability set, strongest references, and the platform most often named directly in central-bank mandates. Artiflex recommends it where sovereign or regulator requirements call for it.",
    pros: [
      "Most complete PAM capability set in the market",
      "Strongest enterprise track record and references",
      "Often named by name in central-bank cyber-resilience mandates",
      "Industry-leading session recording and analytics",
    ],
    cons: [
      "Highest cost in the market",
      "Implementation complexity requires specialist partners",
    ],
  },
  {
    name: "Fortra",
    tier: "Leader",
    tag: "Artiflex Recommended · Best Value",
    blurb:
      "Artiflex's default PAM recommendation. Fortra delivers full-stack privileged access management, credential vaulting, rotation and secure reset, just-in-time elevation, and session recording, at the strongest value in the market. Particularly strong for Unix / Linux server privileged access and hybrid estates, with the audit depth UAE regulators expect.",
    pros: [
      "Full privileged-access coverage at the best value for money",
      "Granular, fine-grained privileged elevation and access control",
      "Strong for Unix / Linux server PAM and hybrid environments",
      "Audit and compliance reporting aligned to UAE frameworks",
    ],
    cons: [
      "Smaller global brand presence than CyberArk or BeyondTrust",
      "Best deployed with an experienced PAM delivery partner",
    ],
  },
  {
    name: "Delinea",
    tier: "Leader",
    tag: "Mid-Market Value",
    blurb:
      "Formed from the merger of Thycotic and Centrify. Offers a strong PAM platform at a more accessible price point than CyberArk. Good for mid-market organisations and those starting their PAM journey.",
    pros: [
      "More accessible pricing than CyberArk",
      "Simpler implementation for standard use cases",
      "Good AD bridge and Unix / Linux privileged account management",
    ],
    cons: [
      "Less mature DevOps and secrets management capabilities",
      "Merger integration between Thycotic and Centrify still maturing",
    ],
  },
  {
    name: "One Identity Safeguard",
    tier: "Challenger",
    tag: "IGA + PAM Integrated",
    blurb:
      "The PAM platform that integrates natively with One Identity Manager for unified governance, access certifications covering both standard and privileged accounts in one review process.",
    pros: [
      "Native integration with One Identity Manager IGA",
      "Mature vault, JIT, and session recording",
      "Strong AD bridge",
    ],
    cons: [
      "Less complete than CyberArk for the largest enterprises",
      "Smaller partner ecosystem",
    ],
  },
  {
    name: "Saviynt PAM",
    tier: "Challenger",
    tag: "IGA + PAM Converged",
    blurb:
      "Cloud-native PAM-lite delivered as the privileged-access module of the Saviynt Identity Cloud, converged with Saviynt's IGA, Application Access Governance and CIEM on one platform and one licence. Zero-standing-privilege, just-in-time access and cloud session monitoring across AWS, Azure, GCP and SaaS. Best where IGA and PAM convergence on a single cloud platform is the decisive criterion.",
    pros: [
      "PAM on the same licence and data model as Saviynt IGA, AAG and CIEM",
      "Just-in-time privileged access across cloud and SaaS with one approval workflow",
      "Third-Party Access Governance built in for contractor and vendor access",
      "Around 25 to 40 per cent lower TCO than an equivalent point-tool stack",
    ],
    cons: [
      "Lighter than CyberArk or BeyondTrust for deep, large-scale traditional PAM and OT / legacy",
      "True SaaS only, no on-prem or air-gapped option for sovereign mandates",
    ],
  },
  {
    name: "Microsoft Entra PIM",
    tier: "Challenger",
    tag: "Bundled JIT · Microsoft Estates",
    blurb:
      "Just-in-time privileged role elevation, activation and access reviews for Azure RBAC, Entra directory roles, Azure resource roles and Privileged Access Groups, bundled with Entra ID P2 and Microsoft 365 E5. Best for cloud-admin privilege governance in Microsoft estates at zero or near-zero incremental licence cost.",
    pros: [
      "Bundled in Microsoft 365 E5 and Entra ID P2, no separate vendor to procure",
      "Just-in-time elevation that removes standing admin rights across the Microsoft estate",
      "Built-in approval, justification and recurring access reviews for audit posture",
      "Native integration with Conditional Access, Entra audit log and Sentinel",
    ],
    cons: [
      "Cloud-role JIT only, not a full vault or session-recording PAM for servers, Windows, Linux or network",
      "Pair with a full PAM platform for the wider privileged surface outside Azure",
    ],
  },
  {
    name: "HashiCorp Vault",
    tier: "Visionary",
    tag: "DevOps-Native",
    blurb:
      "The developer-native secrets management platform. Essential for cloud-native organisations where application credential management is the primary problem, CI / CD pipelines, container environments, API secrets.",
    pros: [
      "Best-in-class application secrets management",
      "Developer-friendly API and CLI",
      "Open-source core with enterprise features",
      "Native cloud provider integration",
    ],
    cons: [
      "Not a complete PAM platform, no session recording or traditional vaulting",
      "Requires PAM platform alongside for human privileged access",
    ],
  },
  {
    name: "Senhasegura",
    tier: "Visionary",
    tag: "EMEA Challenger",
    blurb:
      "A solid PAM platform with strong EMEA presence and competitive pricing. Good full capability coverage at a more accessible price point than the top three leaders.",
    pros: [
      "Strong audit and reporting capabilities",
      "Competitive pricing for mid-market",
      "Solid cloud PAM coverage",
    ],
    cons: [
      "Smaller global presence than CyberArk / BeyondTrust / Delinea",
      "Less mature DevOps secrets management",
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
}[] = vendorLineup.map((v, i) => {
  const p = profiles[i];
  const recommendedSet = ["beyondtrust", "cyberark", "fortra"];
  const recommended = recommendedSet.includes(v.slug);
  return {
    slug: v.slug,
    name: v.name,
    best: `${p.tier} · ${p.tag}${recommended ? " (Recommended)" : ""}`,
    strength: p.blurb,
    watch: p.cons[0],
    logo: v.logo,
  };
});

/* ───────── GARTNER-STYLE SCORECARD ───────── */

const featureVendors = [
  "BeyondTrust",
  "CyberArk",
  "Fortra",
  "Delinea",
  "One Identity Safeguard",
  "Saviynt PAM",
  "Microsoft Entra PIM",
  "HashiCorp Vault",
  "Senhasegura",
];

type Tier = "best" | "excellent" | "veryStrong" | "strong" | "good" | "moderate";
type FeatureCell = { tier: Tier; note: string };

const featureRows: { label: string; cells: FeatureCell[] }[] = [
  {
    label: "Credential Vaulting",
    cells: [
      { tier: "best", note: "Mature vault" },
      { tier: "best", note: "Strongest enterprise vault" },
      { tier: "best", note: "Strong credential vault" },
      { tier: "best", note: "Solid vault" },
      { tier: "best", note: "Safeguard vault" },
      { tier: "good", note: "Cloud brokering, lighter vault" },
      { tier: "moderate", note: "No vault, JIT roles only" },
      { tier: "excellent", note: "Cloud-native vault" },
      { tier: "best", note: "Full enterprise vault" },
    ],
  },
  {
    label: "Auto Password Rotation",
    cells: [
      { tier: "best", note: "Mature rotation" },
      { tier: "best", note: "Mature auto-rotation" },
      { tier: "best", note: "Rotation + secure reset" },
      { tier: "best", note: "Solid rotation" },
      { tier: "best", note: "Native rotation" },
      { tier: "good", note: "Cloud credential rotation" },
      { tier: "moderate", note: "Not applicable" },
      { tier: "best", note: "Dynamic secrets generation" },
      { tier: "best", note: "Automated rotation" },
    ],
  },
  {
    label: "Session Recording",
    cells: [
      { tier: "best", note: "Comprehensive" },
      { tier: "best", note: "Industry-leading" },
      { tier: "best", note: "Solid recording" },
      { tier: "best", note: "Solid recording" },
      { tier: "best", note: "Safeguard recording" },
      { tier: "good", note: "Cloud session monitoring" },
      { tier: "moderate", note: "Elevation events only, no recording" },
      { tier: "moderate", note: "Not a focus" },
      { tier: "best", note: "Full session recording" },
    ],
  },
  {
    label: "Privilege Elevation (PEDM)",
    cells: [
      { tier: "best", note: "Best endpoint control" },
      { tier: "veryStrong", note: "EPM module" },
      { tier: "veryStrong", note: "Endpoint privilege" },
      { tier: "veryStrong", note: "Privilege Manager" },
      { tier: "strong", note: "Moderate" },
      { tier: "strong", note: "Growing" },
      { tier: "moderate", note: "Basic" },
      { tier: "moderate", note: "Not a focus" },
      { tier: "strong", note: "Moderate" },
    ],
  },
  {
    label: "Just-in-Time Access",
    cells: [
      { tier: "best", note: "Mature JIT" },
      { tier: "best", note: "Mature JIT" },
      { tier: "best", note: "Granular JIT elevation" },
      { tier: "excellent", note: "Solid JIT" },
      { tier: "best", note: "Native JIT" },
      { tier: "best", note: "JIT across cloud and SaaS" },
      { tier: "best", note: "JIT for Azure / Entra roles" },
      { tier: "good", note: "Partial JIT" },
      { tier: "excellent", note: "Solid JIT elevation" },
    ],
  },
  {
    label: "Secrets Management (DevOps)",
    cells: [
      { tier: "veryStrong", note: "Solid secrets mgmt" },
      { tier: "best", note: "AAM secrets mature" },
      { tier: "veryStrong", note: "Solid secrets handling" },
      { tier: "veryStrong", note: "Solid secrets mgmt" },
      { tier: "good", note: "Partial secrets mgmt" },
      { tier: "good", note: "Cloud-focused, lighter machine secrets" },
      { tier: "moderate", note: "Not a secrets manager" },
      { tier: "best", note: "Best-in-class DevOps" },
      { tier: "good", note: "DevOps secrets, less mature than leaders" },
    ],
  },
  {
    label: "Cloud PAM (AWS / Azure / GCP)",
    cells: [
      { tier: "best", note: "Solid cloud PAM" },
      { tier: "best", note: "Cloud Entitlements + Privilege Cloud" },
      { tier: "veryStrong", note: "Hybrid + cloud PAM" },
      { tier: "veryStrong", note: "Cloud PAM growing" },
      { tier: "veryStrong", note: "Cloud PAM growing" },
      { tier: "best", note: "Multi-cloud JIT plus CIEM" },
      { tier: "veryStrong", note: "Strong for Azure, lighter for AWS / GCP" },
      { tier: "best", note: "Cloud-native by design" },
      { tier: "veryStrong", note: "Solid cloud PAM coverage" },
    ],
  },
  {
    label: "Privileged Remote Access",
    cells: [
      { tier: "best", note: "Best PRA in market" },
      { tier: "best", note: "Strong PRA" },
      { tier: "veryStrong", note: "Solid PRA" },
      { tier: "veryStrong", note: "Solid PRA" },
      { tier: "veryStrong", note: "Solid PRA" },
      { tier: "veryStrong", note: "Third-Party Access Governance built in" },
      { tier: "moderate", note: "Not applicable" },
      { tier: "moderate", note: "Not applicable" },
      { tier: "veryStrong", note: "Solid privileged remote access" },
    ],
  },
  {
    label: "Session Threat Analytics",
    cells: [
      { tier: "veryStrong", note: "Threat analytics" },
      { tier: "best", note: "Deepest analytics" },
      { tier: "veryStrong", note: "Behaviour analytics" },
      { tier: "veryStrong", note: "Behaviour analytics" },
      { tier: "strong", note: "Basic" },
      { tier: "veryStrong", note: "Identity analytics" },
      { tier: "veryStrong", note: "Entra signals" },
      { tier: "moderate", note: "Limited" },
      { tier: "strong", note: "Basic" },
    ],
  },
  {
    label: "Deployment Speed / Ease",
    cells: [
      { tier: "veryStrong", note: "Moderate" },
      { tier: "strong", note: "Heavier rollout" },
      { tier: "best", note: "Fast, pragmatic" },
      { tier: "best", note: "Known for ease" },
      { tier: "veryStrong", note: "Moderate" },
      { tier: "veryStrong", note: "Cloud-fast" },
      { tier: "veryStrong", note: "Fast in M365" },
      { tier: "strong", note: "DevOps setup" },
      { tier: "veryStrong", note: "Quick deploy" },
    ],
  },
  {
    label: "Platform Breadth",
    cells: [
      { tier: "veryStrong", note: "PAM + remote" },
      { tier: "best", note: "Broadest PAM suite" },
      { tier: "veryStrong", note: "Full-function PAM" },
      { tier: "veryStrong", note: "Broad PAM" },
      { tier: "veryStrong", note: "IAM + PAM" },
      { tier: "veryStrong", note: "Converged identity" },
      { tier: "strong", note: "PIM scope" },
      { tier: "strong", note: "Secrets-centric" },
      { tier: "strong", note: "Core PAM" },
    ],
  },
  {
    label: "Total Cost of Ownership",
    cells: [
      { tier: "veryStrong", note: "Premium but flexible" },
      { tier: "moderate", note: "Highest cost in market" },
      { tier: "best", note: "Best value full-stack PAM" },
      { tier: "best", note: "Mid-market friendly" },
      { tier: "veryStrong", note: "Mid-market value" },
      { tier: "best", note: "Bundled with Identity Cloud, lower stack TCO" },
      { tier: "best", note: "Bundled in E5 / Entra ID P2" },
      { tier: "best", note: "Open-source core option" },
      { tier: "best", note: "Competitive pricing, fast deployment" },
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
    scenario: "You want full-stack PAM at the best value (Artiflex default recommendation)",
    recommend:
      "Fortra. Artiflex's default PAM recommendation, complete privileged-access coverage, granular elevation, vaulting, rotation and session recording, at the strongest value for money. The right starting point for most UAE estates, with particular strength in Unix / Linux server PAM.",
  },
  {
    scenario: "You need the premium platform and budget is flexible (sovereign / regulator mandates)",
    recommend:
      "CyberArk, with BeyondTrust as the alternative. The most complete capability set and the platform most often named directly in central-bank mandates. Artiflex recommends CyberArk or BeyondTrust where budget is flexible and sovereign or regulator requirements call for premium tooling.",
  },
  {
    scenario: "You have significant vendor and contractor remote access requirements",
    recommend:
      "BeyondTrust. Its Privileged Remote Access capability is the best in the market for managing third-party access without requiring VPN, critical for organisations with large supplier ecosystems. A premium pick when third-party access dominates and budget is flexible.",
  },
  {
    scenario: "You are mid-market and want strong PAM without CyberArk's complexity and cost",
    recommend:
      "Delinea. A strong full-stack PAM platform at a more accessible price point, with simpler deployment for organisations without dedicated PAM engineering teams.",
  },
  {
    scenario: "Your primary problem is application secrets in cloud and DevOps pipelines",
    recommend:
      "HashiCorp Vault. The only developer-native secrets management platform with deep cloud provider integration. Deploy alongside a traditional PAM tool for human privileged access.",
  },
  {
    scenario: "You want PAM integrated with IAM governance from one vendor",
    recommend:
      "One Identity Safeguard. The PAM platform that integrates natively with One Identity Manager for unified governance, access certifications covering both standard and privileged accounts in one review process.",
  },
];

/* ───────── FAQS ───────── */

const faqs = [
  {
    question: "What is Privileged Access Management (PAM)?",
    answer:
      "PAM is the security discipline that secures, controls and audits the highest-power accounts in your estate: administrator, root, service and machine accounts. It vaults their credentials, rotates them automatically, grants access just-in-time for a specific task, records every privileged session, and removes standing privilege so no single account can quietly control everything.",
  },
  {
    question: "Why are privileged accounts the highest-value target in any organisation?",
    answer:
      "Privileged accounts can install software, read any data, change security configurations, create new accounts and erase their own tracks. In the wrong hands a single privileged account can compromise an entire organisation, which is why sophisticated attackers go straight for them. Roughly 74 percent of breaches involve privileged account abuse, and effectively every major ransomware attack needs privileged access to execute at scale.",
  },
  {
    question: "What is the difference between PAM, IAM and IGA?",
    answer:
      "IAM handles the front door for ordinary identities: SSO, MFA and conditional access. IGA handles the lifecycle and governance: who has what access, whether it is still appropriate, and the audit evidence regulators expect. PAM handles the highest-risk accounts specifically: vaulting, just-in-time elevation, session recording and credential rotation for admin, root, service and machine accounts. A complete identity programme needs all three.",
  },
  {
    question: "What is just-in-time (JIT) privileged access?",
    answer:
      "JIT replaces permanent admin accounts with elevation granted only for the duration of a specific, approved task, then revoked automatically. Instead of standing privilege sitting on an account waiting to be abused, an engineer requests elevation, uses it for a fixed window, and loses it when the window closes. Zero standing privilege means a phished credential opens no privileged doors.",
  },
  {
    question: "Which PAM vendor should we choose: Fortra, CyberArk or BeyondTrust?",
    answer:
      "Choose Fortra when you want full-stack PAM, vaulting, rotation, JIT elevation and session recording, at the strongest value for money. It is Artiflex's default recommendation and especially strong for Unix and Linux server estates. Choose CyberArk when budget is flexible and sovereign or regulator mandates call for the most complete, most-referenced platform. Choose BeyondTrust when vendor and contractor remote privileged access is the dominant requirement.",
  },
  {
    question: "How long does a PAM rollout take?",
    answer:
      "A focused vault for Domain Admin and around 50 critical service accounts can be in production in 8 to 12 weeks. A full estate rollout that includes Unix and Linux servers, network devices, OT and database secrets is typically a 12-to-18-month programme. Artiflex phases the deployment so the highest-risk accounts are protected first, with rollback procedures at every stage.",
  },
];

/* ───────── HERO ───────── */

function PamHero() {
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
              <li><span className="font-medium text-[#28B5E1]">Privileged Access Management (PAM)</span></li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="shell relative z-10 flex w-full flex-1 items-center py-10 sm:py-12 lg:py-14">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="w-full">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#28B5E1] sm:text-xs">
            Privileged Access Management
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-5xl lg:text-[3.5rem]">
            Privileged Access Management <span className="gradient-text">UAE</span>
            <span className="block font-display text-lg font-light leading-tight text-slate-300 sm:text-xl md:text-2xl lg:text-[1.6rem]">
              Securing the keys to your entire digital kingdom
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Artiflex IT designs, deploys and manages privileged access platforms across the UAE, Oman and Saudi Arabia. BeyondTrust, CyberArk, Fortra, Delinea, One Identity Safeguard, Saviynt PAM, Microsoft Entra PIM, HashiCorp Vault and Senhasegura, picked on workload, compliance scope and stack alignment, not vendor preference.
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

export default function PamProduct() {
  const [openLayer, setOpenLayer] = useState<number | null>(0);
  const [activeFaq, setActiveFaq] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      <>
        <title>Privileged Access Management (PAM) UAE | Vaulting, JIT & Session Recording | Artiflex IT</title>
        <meta
          name="description"
          content="Privileged Access Management (PAM) for UAE enterprises. Compare BeyondTrust, CyberArk, Fortra, Delinea, One Identity, Saviynt, Microsoft Entra PIM, HashiCorp Vault & Senhasegura. Vendor matrix, Gartner-style scorecard, NESA / PDPL / CBUAE ready. Free PAM assessment."
        />
        <link
          rel="canonical"
          href="https://artiflexit.com/cybersecurity/identity-access-security/pam"
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
            name: "Recommended PAM Platforms for UAE Businesses",
            itemListElement: vendors.map((v, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: v.name,
            })),
          })}
        </script>
      </>

      {/* HERO */}
      <PamHero />

      {/* WHAT IS PAM (INTRO) */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              Start Here
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              What is Privileged Access Management?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Privileged Access Management (PAM) is the security discipline that secures, controls and
              audits the highest-power accounts in your estate, administrator, root, service and machine
              accounts. It vaults their credentials, rotates them automatically, grants access just-in-time
              for a specific task, records every privileged session, and removes standing privilege so no
              single account can quietly control everything.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:mt-12 md:grid-cols-2">
            <div className="rounded-2xl border border-border-light bg-slate-50 p-6 sm:p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#28B5E1]/10 text-[#1B8AC7]">
                <AlertTriangleIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-900">
                Why does an organisation need PAM?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Privileged accounts can install software, read any data, change security configurations
                and erase their own tracks. In the wrong hands, a single admin or service account can
                compromise an entire organisation, which is why sophisticated attackers go straight for
                them and why almost every major ransomware attack needs privileged access to execute. PAM
                shrinks that attack surface, eliminates shared and standing credentials, and produces the
                audit evidence regulators such as NESA, PDPL and CBUAE expect.
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
                We start with your privileged account inventory, your audit scope, and the systems you
                have to protect, then map the right platform to the requirement. For organisations that
                want full-stack privileged access at the strongest value, Artiflex recommends{" "}
                <strong className="font-semibold text-slate-900">Fortra</strong> as the default platform,
                complemented by CyberArk, BeyondTrust or a cloud-converged option where the workload
                demands it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── WHAT PAM PROTECTS (CORE CAPABILITIES) ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              Core Capabilities
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              What PAM protects and how it does it
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              PAM is not a single product. It is a set of complementary controls that can be adopted
              together as a complete programme or individually where the risk is highest. Here is what
              each capability does, and why it matters.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => {
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

      {/* ───────── PAM VENDORS WE DELIVER (HONEYCOMB) ───────── */}
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
              PAM{" "}
              <span className="bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1] bg-clip-text text-transparent">
                Vendors
              </span>{" "}
              we deliver
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              The Privileged Access Management platforms we design, deploy and manage across UAE environments. The conversation starts with your privileged account inventory, your audit scope, and the systems you have to protect.
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
                      to={`/cybersecurity/pam/${v.slug}`}
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
                to={`/cybersecurity/pam/${v.slug}`}
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
            , picked by stack alignment, compliance scope, and the systems you have to protect.
          </p>
        </div>
      </section>

      {/* ───────── THE PROBLEM ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(27,138,199,0.06),transparent_60%)]" />
        <div className="shell relative">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
            The Problem
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-[2.5rem]">
            Privileged Accounts Are the Highest-Value Target in Any Organisation
          </h2>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            <p>
              Privileged accounts, root, administrator, service accounts, database superusers, have one thing in common: they can do things that ordinary accounts cannot. They can install software, access sensitive data without restriction, modify security configurations, create new accounts, and cover their tracks. In the wrong hands, a single privileged account can compromise an entire organisation. That is why privileged accounts are the primary target of sophisticated attackers, and why protecting them requires a fundamentally different approach than protecting ordinary user accounts.
            </p>
            <p>
              In most organisations before PAM, privileged account management was informal at best. Root passwords were shared among team members and rarely changed. Service accounts used the same password across dozens of systems, rotated never or infrequently, because changing them required manually updating every system that used them. When a system administrator left, IT hoped that the shared passwords would be changed, but the operational disruption of changing passwords on everything at once meant it was often deferred indefinitely. Former employees retained privileged access to critical systems for months or years after departure.
            </p>
            <p>
              PAM addresses this systematically: it stores privileged credentials in a secure vault, rotates them automatically, requires authentication and authorisation before credentials are released, records every privileged session, and ensures that access to admin capabilities follows just-in-time principles, granted when needed for a specific task, revoked when the task is complete.
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

      {/* ───────── SIX-STEP PAM CONTROL MODEL ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.06),transparent_60%)]" />
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
              How PAM Works
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              The PAM Control Model
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              PAM is not a single product. It is a sequence of controls where each step builds on the one before. You cannot skip steps, each one is a prerequisite for the next.
            </p>
          </div>

          <div className="mt-12 grid items-start gap-4 sm:mt-16 sm:gap-5 md:grid-cols-3">
            {pamLayers.map((l, idx) => {
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

      {/* ───────── JIT FLOW ───────── */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(27,138,199,0.06),transparent_60%)]" />
        <div className="shell relative">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1B8AC7]">
            Modern PAM
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-[2.5rem]">
            How Just-in-Time Access Works: The Modern PAM Model
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Traditional PAM stored privileged credentials in a vault and let approved users check them out. Modern PAM goes further: standing privileges are eliminated entirely, and elevated access is granted only for the duration of a specific task. The result is dramatically reduced ransomware blast radius and a credible answer to compliance auditors.
          </p>

          <div className="mt-10 sm:mt-12">
            <div className="space-y-3 sm:space-y-4">
              {jitFlow.map((step, idx) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: idx * 0.04 }}
                  className="flex gap-5 rounded-xl border border-[#0A3D6B]/15 bg-slate-50 p-5 shadow-sm shadow-slate-900/5 sm:gap-6 sm:p-6"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#045891] to-[#1B8AC7] font-mono text-sm font-bold text-white sm:h-12 sm:w-12 sm:text-base">
                    {step.num}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-base font-bold text-slate-900 sm:text-lg">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── PRINCIPLE QUOTE ───────── */}
      <section className="relative bg-white pb-16 sm:pb-24">
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
                Privileged accounts are the prize in every serious breach. In every major ransomware incident, the attackers gained privileged access through one of three paths: a shared admin password that never changed, a service account with an unchanged default credential, or a former employee whose admin access was never removed. PAM makes all three paths significantly harder.
              </p>
              <footer className="mt-6 flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 bg-[#28B5E1]" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#28B5E1] sm:text-[11px]">
                  The principle behind every PAM investment
                </span>
              </footer>
            </blockquote>
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
              <span className="gradient-text">PAM buyers</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg">
              PAM selection depends on scale, cloud strategy, vendor / contractor access needs, and whether you need integrated IGA governance. Artiflex suggests the solution that best fits your needs.
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
              Detailed Comparison on PAM Vendors
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
                    to={`/cybersecurity/pam/${v.slug}`}
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
              <span className="font-semibold text-white">Artiflex IT delivers Fortra, CyberArk, BeyondTrust, Delinea, One Identity Safeguard, HashiCorp Vault and Senhasegura</span> <span className="text-white">across UAE PAM programmes.</span> <br />
              <span className="text-xs italic text-white sm:text-base">The vendor follows the assessment, not the other way around.</span>
            </p>
          </div>

          {/* Feature ratings */}
          <div id="gartner-comparison" className="mx-auto mt-20 max-w-4xl scroll-mt-24 text-center sm:mt-28">
            <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Gartner-style Capability Comparison
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Each vendor is rated across PAM capabilities using a standardised tier scale. A gold ★ marker denotes best-in-class performance for that specific capability.
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
              How to choose your PAM platform
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Vendor selection rarely comes down to a single capability. The right platform depends on your privileged account inventory, your cloud strategy, your third-party access needs, and which regulators look over your shoulder.
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
                  "What is your expectation out of PAM, what business or compliance problem are you trying to solve?",
                  "Do you need full-stack PAM (vaulting, rotation, recording) or a specific control such as JIT elevation or secrets management?",
                  "Where do your privileged accounts live, Windows, Unix / Linux, network devices, databases, or multiple clouds?",
                  "Which regulations apply to you (NESA, PDPL, CBUAE, ISO 27001) and what audit evidence do you need?",
                  "Is your priority human privileged access, third-party / contractor access, or machine and DevOps secrets?",
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
            description="We don't sell licences, we deliver PAM outcomes: assess, design, deploy, manage. Every stage produces something an auditor can read and a CFO can sign off on."
            centered
          />

          <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-4">
            {[
              {
                title: "Assess",
                duration: "2 weeks",
                summary:
                  "Inventory of privileged, service and machine accounts across servers, databases, network devices and cloud. Audit of shared credentials, standing privilege, third-party access exposure, and JIT readiness.",
                deliverable:
                  "Current-state report, vendor recommendation with rationale, three-year TCO comparison.",
              },
              {
                title: "Design",
                duration: "3 to 4 weeks",
                summary:
                  "Architecture for your specific environment: vault topology, rotation policy, PEDM and least-privilege model, JIT elevation workflows, session recording scope, and integration with your IGA and ITSM estate.",
                deliverable:
                  "Approved architecture, signed-off cutover sequence, change-management plan.",
              },
              {
                title: "Deploy",
                duration: "8 to 16 weeks",
                summary:
                  "Phased deployment with rollback procedures at every stage. Highest-risk accounts vaulted first, Domain Admin and critical service accounts, then rotation, then JIT and session recording. Production cutover with day-1 hypercare.",
                deliverable:
                  "Live PAM platform, audit-ready documentation, runbooks for your team.",
              },
              {
                title: "Manage",
                duration: "Ongoing",
                summary:
                  "24/7 monitoring, policy change management, privileged session review, credential rotation oversight, monthly board-readable privileged-risk reporting, quarterly architecture reviews.",
                deliverable:
                  "Operational PAM with SLAs you can rely on. Or a clean handover to your team.",
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
              Vendor-agnostic by design. We will tell you when Fortra wins, when CyberArk or BeyondTrust wins, when a cloud-converged option wins, and when none of them is the right answer. The point of an honest assessment is honest answers.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "74%", label: "Of breaches involve privileged account abuse" },
              { value: "100%", label: "Of major ransomware attacks need privileged access" },
              { value: "40%", label: "Of insider incidents involve retained admin access" },
              { value: "0", label: "Standing privileges with a just-in-time model" },
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
                  BeyondTrust, CyberArk, Fortra, Delinea, One Identity Safeguard, Saviynt PAM, Microsoft Entra PIM, HashiCorp Vault and Senhasegura, active delivery experience across all nine.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#28B5E1]">
                  Compliance frameworks
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  NESA, UAE PDPL, CBUAE, SAMA, NCA ECC, ISO 27001 and NIST CSF 2.0 aligned implementations, with audit-ready privileged-access evidence delivered as part of the project.
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
              Book a free PAM posture assessment
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
            description="What UAE decision-makers ask us most about PAM platform selection, just-in-time access, and protecting privileged accounts."
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
        title="Get a PAM Readiness Assessment"
        description="60-minute review of your privileged account inventory, JIT readiness, and ransomware blast-radius exposure, with a vendor-neutral PAM recommendation across BeyondTrust, CyberArk, Fortra, Delinea, One Identity, Saviynt, Microsoft Entra PIM, HashiCorp Vault and Senhasegura."
        primaryButton={{ text: "Book Assessment", action: "modal" }}
      />
    </>
  );
}
