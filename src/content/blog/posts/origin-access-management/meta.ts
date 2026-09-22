import type { BlogPostMeta } from "../../types";
import { ciso } from "../../authors";

export const meta: BlogPostMeta = {
  slug: "origin-access-management",
  title: "The Perimeter That Disappeared: The Origin of Modern Access Management",
  excerpt: "For thirty years, enterprises protected resources by controlling who could reach the network. Then the cloud, the mobile workforce, and the SaaS explosion dissolved the perimeter entirely, and access management had to reinvent itself from the ground up.",
  metaTitle: "Origin of Access Management: RBAC to Conditional Access | IAM Origin Series | Artiflex IT",
  metaDescription: "From NIST's 1992 Role-Based Access Control to Google BeyondCorp and Microsoft Conditional Access: how access management became a policy engine.",
  date: "2026-05-19",
  readTime: 6,
  tag: "cybersecurity",
  image: "/cybersecurity.webp",
  related: [
    "origin-sso",
    "origin-mfa",
    "origin-ilm",
    "origin-iga",
    "origin-pam",
    "origin-zero-trust",
    "origin-passwordless",
  ],
  author: ciso,
};
