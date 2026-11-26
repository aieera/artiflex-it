/**
 * The 11 cybersecurity pillar pages, for build / verification scripts.
 * Keep in sync with src/lib/cyberPillars.ts (the UI source of truth).
 *
 * `children` are the URL prefixes of each pillar's product sub-pages,
 * used to check pillar <-> sub-page linking in verify-seo.mjs.
 */
export const CYBER_PILLARS = [
  { path: "/cybersecurity/firewalls-network-security", children: ["/cybersecurity/firewalls/"] },
  { path: "/cybersecurity/unified-firewall-management", children: [] },
  { path: "/cybersecurity/endpoint-security-edr-xdr", children: ["/cybersecurity/endpoint/"] },
  { path: "/cybersecurity/mobile-security", children: ["/cybersecurity/mobile-security/"] },
  { path: "/cybersecurity/ot-ics-security", children: ["/cybersecurity/ot-ics-security/"] },
  { path: "/cybersecurity/email-security", children: ["/cybersecurity/email/"] },
  {
    path: "/cybersecurity/identity-access-security",
    children: [
      "/cybersecurity/identity-access-security/",
      "/cybersecurity/iam/",
      "/cybersecurity/pam/",
      "/cybersecurity/iga/",
      "/cybersecurity/mfa/",
    ],
  },
  { path: "/cybersecurity/workspace-protection-sse-sase", children: ["/cybersecurity/workspace/"] },
  { path: "/cybersecurity/security-operations", children: ["/cybersecurity/security-operations/"] },
  { path: "/cybersecurity/vulnerability-management", children: ["/cybersecurity/vulnerability-management/"] },
  { path: "/cybersecurity/data-loss-prevention", children: ["/cybersecurity/dlp/"] },
];

export const CYBER_PILLAR_PATHS = CYBER_PILLARS.map((p) => p.path);
