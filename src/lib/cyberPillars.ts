/**
 * The 11 cybersecurity pillar pages: single source of truth for every
 * site-wide internal link that points at them (header fallback nav,
 * footer column, home "Cybersecurity solutions" section, vendor pages,
 * blog origin posts, breadcrumb JSON-LD).
 *
 * `label`  matches the "Portfolios" panel on /cybersecurity and the
 *          Services > Cybersecurity mega-menu, so the same name is used
 *          everywhere a visitor sees the pillar.
 * `anchor` is the descriptive, keyword-bearing anchor text used for
 *          in-body contextual links (never "Read more").
 *
 * scripts/lib/seo-pillars.mjs mirrors the hrefs for the build scripts.
 * Hrefs are the exact canonical form: lowercase, no trailing slash.
 */

export type CyberPillarKey =
  | "firewalls"
  | "ufm"
  | "endpoint"
  | "mobile"
  | "ot"
  | "email"
  | "identity"
  | "workspace"
  | "secops"
  | "vm"
  | "dlp";

export type CyberPillar = {
  key: CyberPillarKey;
  label: string;
  href: string;
  description: string;
  anchor: string;
};

export const CYBER_PILLARS: readonly CyberPillar[] = [
  {
    key: "firewalls",
    label: "Firewalls & Network Security",
    href: "/cybersecurity/firewalls-network-security",
    description: "Next-generation firewalls, UTM and managed firewall services for UAE networks.",
    anchor: "firewall and network security solutions in the UAE",
  },
  {
    key: "ufm",
    label: "Unified Firewall Management (UFM)",
    href: "/cybersecurity/unified-firewall-management",
    description: "One console for multi-vendor firewall policy, change control and compliance.",
    anchor: "unified firewall management in the UAE",
  },
  {
    key: "endpoint",
    label: "Endpoint Security (EDR & XDR)",
    href: "/cybersecurity/endpoint-security-edr-xdr",
    description: "EDR, XDR and managed endpoint protection that stops ransomware on every device.",
    anchor: "endpoint security (EDR & XDR) in the UAE",
  },
  {
    key: "mobile",
    label: "Mobile Security",
    href: "/cybersecurity/mobile-security",
    description: "UEM and mobile threat defense for corporate and BYOD phones, tablets and laptops.",
    anchor: "mobile security and device management in the UAE",
  },
  {
    key: "ot",
    label: "OT / ICS Security",
    href: "/cybersecurity/ot-ics-security",
    description: "Asset visibility and threat detection for SCADA, ICS and industrial networks.",
    anchor: "OT & ICS security in the UAE",
  },
  {
    key: "email",
    label: "Email Security for Business",
    href: "/cybersecurity/email-security",
    description: "Phishing, BEC and account takeover defence with DMARC enforcement.",
    anchor: "email security for business in the UAE",
  },
  {
    key: "identity",
    label: "Identity & Access Security",
    href: "/cybersecurity/identity-access-security",
    description: "IAM, MFA, identity governance and privileged access for a Zero Trust workforce.",
    anchor: "identity & access security in the UAE",
  },
  {
    key: "workspace",
    label: "SASE & Zero Trust",
    href: "/cybersecurity/workspace-protection-sse-sase",
    description: "SSE, SASE, ZTNA and CASB to replace legacy VPNs and secure SaaS access.",
    anchor: "SASE & Zero Trust workspace protection in the UAE",
  },
  {
    key: "secops",
    label: "Security Operations",
    href: "/cybersecurity/security-operations",
    description: "SIEM, MDR, NDR and SOC as a Service for 24/7 detection and response.",
    anchor: "security operations (SIEM, MDR & NDR) in the UAE",
  },
  {
    key: "vm",
    label: "Vulnerability & Exposure Management",
    href: "/cybersecurity/vulnerability-management",
    description: "Continuous scanning, risk-based prioritisation and attack surface management.",
    anchor: "vulnerability & exposure management in the UAE",
  },
  {
    key: "dlp",
    label: "Data Security & DLP",
    href: "/cybersecurity/data-loss-prevention",
    description: "Endpoint, network and cloud DLP with data classification and policy control.",
    anchor: "data security & DLP in the UAE",
  },
];

const BY_KEY = new Map(CYBER_PILLARS.map((p) => [p.key, p]));
export const pillar = (key: CyberPillarKey): CyberPillar => BY_KEY.get(key)!;

/* ───────── Vendor → pillar mapping (/vendors/:slug) ───────── */

/** vendors.ts CategoryKey → pillars. Non-security categories map to none. */
const VENDOR_CATEGORY_PILLARS: Record<string, CyberPillarKey[]> = {
  "network-security": ["firewalls", "ufm"],
  endpoint: ["endpoint"],
  email: ["email"],
  dlp: ["dlp"],
  iam: ["identity"],
  sase: ["workspace"],
  siem: ["secops"],
  vuln: ["vm"],
};

/** RELATED_DETAIL_PAGES categories → pillars. */
const RELATED_CATEGORY_PILLARS: Record<string, CyberPillarKey> = {
  firewall: "firewalls",
  endpoint: "endpoint",
  email: "email",
  dlp: "dlp",
  mobile: "mobile",
};

/** Vendors with a product on a pillar that has no matching vendor category. */
const VENDOR_EXTRA_PILLARS: Record<string, CyberPillarKey[]> = {
  sophos: ["mobile"], // Sophos Mobile
  hexnode: ["mobile"], // Hexnode UEM
  microsoft: ["mobile", "ot"], // Intune, Defender for IoT
  tenable: ["ot"], // Tenable OT Security
};

export function pillarsForVendor(
  slug: string,
  categories: readonly string[],
  relatedCategories: readonly string[] = []
): CyberPillar[] {
  const keys = new Set<CyberPillarKey>();
  for (const c of categories) (VENDOR_CATEGORY_PILLARS[c] ?? []).forEach((k) => keys.add(k));
  for (const c of relatedCategories) {
    const k = RELATED_CATEGORY_PILLARS[c];
    if (k) keys.add(k);
  }
  (VENDOR_EXTRA_PILLARS[slug] ?? []).forEach((k) => keys.add(k));
  // Keep the canonical pillar order rather than insertion order.
  return CYBER_PILLARS.filter((p) => keys.has(p.key));
}

/* ───────── Blog origin post → solution page mapping ───────── */

export type SolutionLink = { href: string; anchor: string };
const P = (key: CyberPillarKey): SolutionLink => ({ href: pillar(key).href, anchor: pillar(key).anchor });

/**
 * Each /blog/origin-* post links to the solution page it tells the story
 * of. Cybersecurity posts point at their pillar; infrastructure and cloud
 * posts at their service page. There is no dedicated UFM origin post, so
 * the firewall post carries the UFM link as a secondary.
 */
export const ORIGIN_POST_SOLUTIONS: Record<string, SolutionLink[]> = {
  "origin-firewall-network-security": [P("firewalls"), P("ufm")],
  "origin-endpoint-security": [P("endpoint")],
  "origin-mobile-security": [P("mobile")],
  "origin-ot-ics-security": [P("ot")],
  "origin-email-security": [P("email")],
  "origin-identity-access-management": [P("identity")],
  "origin-access-management": [P("identity")],
  "origin-identity-governance-administration": [P("identity")],
  "origin-iga": [P("identity")],
  "origin-ilm": [P("identity")], // Identity Lifecycle Management
  "origin-mfa": [P("identity")],
  "origin-passwordless": [P("identity")],
  "origin-pam": [P("identity")],
  "origin-privileged-access-management": [P("identity")],
  "origin-sso": [P("identity")],
  "origin-workspace-protection-sse-sase": [P("workspace")],
  "origin-zero-trust": [P("workspace")],
  "origin-siem": [P("secops")],
  "origin-siem-soc-monitoring": [P("secops")],
  "origin-mdr": [P("secops")],
  "origin-ndr": [P("secops")],
  "origin-vulnerability-management": [P("vm")],
  "origin-data-loss-prevention": [P("dlp")],

  "origin-public-cloud": [{ href: "/cloud-solutions/public-cloud", anchor: "public cloud services in the UAE" }],
  "origin-private-cloud": [{ href: "/cloud-solutions/private-cloud", anchor: "private cloud deployment in the UAE" }],
  "origin-hybrid-cloud": [{ href: "/cloud-solutions/hybrid-cloud", anchor: "hybrid cloud solutions in the UAE" }],
  "origin-multi-cloud-strategy": [{ href: "/cloud-solutions/multi-cloud-strategy", anchor: "multi-cloud strategy services in the UAE" }],
  "origin-backup-as-a-service": [{ href: "/cloud-solutions/backup-as-a-service", anchor: "backup as a service in the UAE" }],
  "origin-disaster-recovery": [{ href: "/cloud-solutions/disaster-recovery-solutions-dubai", anchor: "disaster recovery solutions in Dubai" }],
  "origin-data-center": [{ href: "/infrastructure/data-center", anchor: "data center infrastructure in the UAE" }],
  "origin-servers-compute-virtualization": [{ href: "/infrastructure/servers-compute-virtualization", anchor: "servers, compute and virtualization in the UAE" }],
  "origin-storage-solutions": [{ href: "/infrastructure/storage-solutions", anchor: "enterprise storage solutions in the UAE" }],
  "origin-backup-data-management": [{ href: "/infrastructure/backup-data-management", anchor: "backup and data management in the UAE" }],
  "origin-document-management-systems": [{ href: "/infrastructure/document-management-systems", anchor: "document management systems in the UAE" }],
  "origin-network-infrastructure": [{ href: "/infrastructure/network-infrastructure", anchor: "network infrastructure services in the UAE" }],
  "origin-wireless-solutions": [{ href: "/infrastructure/wireless-solutions", anchor: "enterprise wireless solutions in the UAE" }],
  "origin-structured-cabling": [{ href: "/infrastructure/structured-cabling", anchor: "structured cabling in the UAE" }],
  "origin-unified-communication-telephony": [{ href: "/infrastructure/unified-communication-telephony", anchor: "unified communication and telephony in the UAE" }],
  "origin-video-conferencing-collaboration": [{ href: "/infrastructure/video-conferencing-collaboration", anchor: "video conferencing and collaboration in the UAE" }],
  "origin-cctv-surveillance": [{ href: "/infrastructure/cctv-surveillance", anchor: "CCTV and video surveillance in the UAE" }],
  "origin-access-control-biometrics": [{ href: "/infrastructure/access-control-biometrics", anchor: "access control and biometrics in the UAE" }],
  "origin-power-ups": [{ href: "/infrastructure/power-ups", anchor: "power and UPS solutions in the UAE" }],
  "origin-printing-document-solutions": [{ href: "/infrastructure/printing-document-solutions", anchor: "printing and document solutions in the UAE" }],
};

/** BreadcrumbList JSON-LD for a pillar page: Home > Cybersecurity > pillar. */
export function pillarBreadcrumbSchema(key: CyberPillarKey, extra?: { name: string; href: string }) {
  const p = pillar(key);
  const items = [
    { name: "Home", item: "https://artiflexit.com/" },
    { name: "Cybersecurity", item: "https://artiflexit.com/cybersecurity" },
    { name: p.label, item: `https://artiflexit.com${p.href}` },
    ...(extra ? [{ name: extra.name, item: `https://artiflexit.com${extra.href}` }] : []),
  ];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, ...it })),
  };
}
