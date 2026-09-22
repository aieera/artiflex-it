import type { BlogPostMeta } from "../../types";
import { ciso } from "../../authors";

export const meta: BlogPostMeta = {
  slug: "origin-privileged-access-management",
  title: "The Origin of Privileged Access Management: From Shared Root Passwords to Zero Standing Privilege",
  excerpt: "In 1999, three founders in Tel Aviv watched system administrators store the root passwords for production servers in shared spreadsheets and decided someone needed to invent the password vault. That company was Cyber-Ark. Twenty-six years later, PAM is the single highest-leverage control in cybersecurity. The full story of how privileged access grew from sticky notes into vaulted, session-recorded, just-in-time, zero-standing-privilege architecture.",
  metaTitle: "Origin of Privileged Access Management: Cyber-Ark to ZSP | Artiflex IT",
  metaDescription: "The full origin of PAM: CyberArk, BeyondTrust, Delinea and One Identity. Plus session recording, just-in-time access and Zero Standing Privilege.",
  date: "2026-05-08",
  readTime: 11,
  tag: "cybersecurity",
  image: "/cybersecurity.webp",
  ogImage: "/og/blog/origin-privileged-access-management.png",
  related: [
    "origin-identity-access-management",
    "origin-identity-governance-administration",
    "state-of-cybersecurity-uae-2026",
  ],
  author: ciso,
};
