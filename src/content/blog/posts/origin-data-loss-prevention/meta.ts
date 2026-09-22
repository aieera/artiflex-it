import type { BlogPostMeta } from "../../types";
import { ciso } from "../../authors";

export const meta: BlogPostMeta = {
  slug: "origin-data-loss-prevention",
  title: "The Origin of Data Loss Prevention: From Network Egress Filters to AI-Driven DSPM",
  excerpt: "In the early 2000s, security teams realised the perimeter was leaking. Customer lists were walking out on USB sticks, source code was being mailed to personal Gmail, and nobody could see any of it. That single, deceptively simple problem launched DLP. The full story of how data protection grew from packet matching into endpoint, network, email, cloud, and posture-aware controls.",
  metaTitle: "Origin of Data Loss Prevention: Vontu to DSPM | Artiflex IT",
  metaDescription: "The full origin of Data Loss Prevention: Vontu, Symantec, Websense, Forcepoint, Microsoft Purview, Netskope and Trellix, plus DSPM and what comes next.",
  date: "2026-05-08",
  readTime: 11,
  tag: "cybersecurity",
  image: "/cybermain.webp",
  ogImage: "/og/blog/origin-data-loss-prevention.png",
  related: [
    "origin-firewall-network-security",
    "origin-email-security",
    "state-of-cybersecurity-uae-2026",
  ],
  author: ciso,
};
