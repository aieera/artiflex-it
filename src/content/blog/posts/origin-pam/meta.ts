import type { BlogPostMeta } from "../../types";
import { ciso } from "../../authors";

export const meta: BlogPostMeta = {
  slug: "origin-pam",
  title: "The Password Written on a Post-it Note: The Origin of Privileged Access Management",
  excerpt: "In 1990s data centres, root passwords were shared verbally, written in notebooks, and sometimes stuck to monitor bezels. The most powerful credentials in any organisation were also the least protected. The story of how an industry learned, often the hard way, to treat privileged accounts differently.",
  metaTitle: "Origin of Privileged Access Management | IAM Origin Series | Artiflex IT",
  metaDescription: "From shared root passwords to CyberArk's Digital Vault, BeyondTrust, Delinea, HashiCorp Vault, and Zero Standing Privilege. The full origin of PAM.",
  date: "2026-05-19",
  readTime: 6,
  tag: "cybersecurity",
  image: "/cybersecurity.webp",
  related: [
    "origin-sso",
    "origin-mfa",
    "origin-ilm",
    "origin-iga",
    "origin-access-management",
    "origin-zero-trust",
    "origin-passwordless",
  ],
  author: ciso,
};
