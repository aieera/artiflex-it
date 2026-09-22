import type { BlogPostMeta } from "../../types";
import { eng } from "../../authors";

export const meta: BlogPostMeta = {
  slug: "origin-siem-soc-monitoring",
  title: "The Origin of Security Operations: From Isolated Tools to SIEM, SOAR, NDR and MDR",
  excerpt: "Before 2005, security teams stared at twelve consoles and missed everything important. Then SIEM arrived, then SOAR, then NDR, and finally MDR wrapped it all into a managed outcome. The full story of how the modern Security Operations Centre actually came to exist, and why each generation existed to fix what the previous one could not.",
  metaTitle: "Origin of Security Operations: SIEM to SOAR to NDR to MDR | Artiflex IT",
  metaDescription: "How security operations evolved: SIEM, SOAR, NDR and MDR across four generations. ArcSight, Splunk, QRadar, ExtraHop and Sophos in one timeline.",
  date: "2026-04-27",
  readTime: 12,
  tag: "cybersecurity",
  image: "/cybersecurity.webp",
  ogImage: "/og/blog/origin-siem-soc-monitoring.png",
  related: [
    "origin-firewall-network-security",
    "origin-endpoint-security",
    "state-of-cybersecurity-uae-2026",
  ],
  author: eng,
};
