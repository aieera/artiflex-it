import type { BlogPostMeta } from "../../types";
import { ciso } from "../../authors";

export const meta: BlogPostMeta = {
  slug: "origin-identity-access-management",
  title: "The Origin of Identity & Access Management: From RACF Mainframes to Passwordless Zero Trust",
  excerpt: "The username and password were invented in 1961 at MIT for one specific reason: scheduling fairness on a shared computer. Sixty-five years later, that single mechanism is still the most attacked layer of every enterprise on the planet. The full story of how identity grew from a mainframe scheduling hack into the passwordless, conditional, Zero Trust control plane that is now the new security perimeter.",
  metaTitle: "Origin of Identity & Access Management: RACF to Passwordless | Artiflex IT",
  metaDescription: "The full origin of IAM: CTSS, RACF, LDAP, Active Directory, SAML, OAuth, OIDC, MFA and FIDO2. Plus what UAE enterprises should run in 2026.",
  date: "2026-05-08",
  readTime: 12,
  tag: "cybersecurity",
  image: "/cybersecurity.webp",
  ogImage: "/og/blog/origin-identity-access-management.png",
  related: [
    "origin-privileged-access-management",
    "origin-identity-governance-administration",
    "state-of-cybersecurity-uae-2026",
  ],
  author: ciso,
};
