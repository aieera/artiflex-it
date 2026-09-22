import type { BlogPostMeta } from "../../types";
import { eng } from "../../authors";

export const meta: BlogPostMeta = {
  slug: "origin-siem",
  title: "SIEM: From Mainframe Logs to AI-Driven Security Operations",
  excerpt: "Every SIEM dashboard your analysts watch today traces its lineage to a 1970s mainframe printing paper logs. The full story of how log aggregation became the brain of the modern SOC, and why the question for many UAE organisations is no longer which SIEM, but SIEM or MDR.",
  metaTitle: "Origin of SIEM: Mainframe Logs to AI-Driven SecOps | Artiflex IT",
  metaDescription: "How SIEM evolved from isolated logs to AI-driven SecOps: ArcSight, QRadar, Splunk, Exabeam, Microsoft Sentinel and the UAE SIEM-vs-MDR question.",
  date: "2026-05-22",
  readTime: 12,
  tag: "cybersecurity",
  image: "/cyber2.webp",
  related: [
    "origin-ndr",
    "origin-mdr",
    "origin-siem-soc-monitoring",
  ],
  author: eng,
};
