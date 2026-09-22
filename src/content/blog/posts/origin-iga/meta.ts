import type { BlogPostMeta } from "../../types";
import { ciso } from "../../authors";

export const meta: BlogPostMeta = {
  slug: "origin-iga",
  title: "The Auditor Who Changed Everything: The Origin of Identity Governance",
  excerpt: "Identity governance did not begin as a security initiative. It began as a compliance response to accounting scandals that convinced regulators that access to financial systems needed to be documented, reviewed, and defensible. The auditor's question drove the technology.",
  metaTitle: "Origin of Identity Governance and Administration | IAM Origin Series | Artiflex IT",
  metaDescription: "From Enron and Sarbanes-Oxley to SailPoint, Saviynt, and AI-driven continuous governance. How the auditor's question created a $4B IGA market.",
  date: "2026-05-19",
  readTime: 6,
  tag: "cybersecurity",
  image: "/cybersecurity.webp",
  related: [
    "origin-sso",
    "origin-mfa",
    "origin-ilm",
    "origin-pam",
    "origin-access-management",
    "origin-zero-trust",
    "origin-passwordless",
  ],
  author: ciso,
};
