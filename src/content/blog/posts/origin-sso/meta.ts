import type { BlogPostMeta } from "../../types";
import { ciso } from "../../authors";

export const meta: BlogPostMeta = {
  slug: "origin-sso",
  title: "One Key for Every Door: The Origin of Single Sign-On",
  excerpt: "In the early 1990s, employees carried ring binders full of passwords. Then the web arrived and made it worse. The story of how the industry invented a way to log in once and open everything.",
  metaTitle: "Origin of SSO: Kerberos to SAML to OIDC | IAM Origin Series | Artiflex IT",
  metaDescription: "How Single Sign-On evolved from MIT's Kerberos to SAML, OAuth and OpenID Connect. The full origin of SSO and why it became default infrastructure.",
  date: "2026-05-19",
  readTime: 6,
  tag: "cybersecurity",
  image: "/cybersecurity.webp",
  related: [
    "origin-mfa",
    "origin-ilm",
    "origin-iga",
    "origin-pam",
    "origin-access-management",
    "origin-zero-trust",
    "origin-passwordless",
  ],
  author: ciso,
};
