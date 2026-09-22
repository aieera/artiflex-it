import type { BlogPostMeta } from "../../types";
import { ciso } from "../../authors";

export const meta: BlogPostMeta = {
  slug: "origin-ilm",
  title: "The Ticket That Was Never Raised: The Origin of Identity Lifecycle Management",
  excerpt: "For decades, IT departments relied on managers to tell them when employees joined, moved, and left. Managers rarely did. The ghost accounts that remained became one of the most persistent and preventable security problems in enterprise computing.",
  metaTitle: "Origin of Identity Lifecycle Management | IAM Origin Series | Artiflex IT",
  metaDescription: "From manual joiner-mover-leaver tickets and ghost accounts to HR-driven automation with SailPoint, Saviynt and Microsoft Entra. The origin of ILM.",
  date: "2026-05-19",
  readTime: 6,
  tag: "cybersecurity",
  image: "/cybersecurity.webp",
  related: [
    "origin-sso",
    "origin-mfa",
    "origin-iga",
    "origin-pam",
    "origin-access-management",
    "origin-zero-trust",
    "origin-passwordless",
  ],
  author: ciso,
};
