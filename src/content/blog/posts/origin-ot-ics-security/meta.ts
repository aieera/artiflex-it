import type { BlogPostMeta } from "../../types";
import { eng } from "../../authors";

export const meta: BlogPostMeta = {
  slug: "origin-ot-ics-security",
  title: "The Origin of OT/ICS Security: How Stuxnet Ended the Air-Gap Myth",
  excerpt: "For decades, the machines that run power grids, water plants, and factory floors were defended by a single assumption: they were isolated from the internet, so they were safe. In 2010 a piece of malware called Stuxnet proved that assumption was a fiction, and an entire industry was born to defend operational technology. This is the story of how OT/ICS security came to be, and why visibility, not isolation, is the modern foundation.",
  metaTitle: "Origin of OT/ICS Security: Stuxnet and the Air-Gap Myth | Artiflex IT",
  metaDescription: "How OT and ICS security evolved from the air-gap assumption through Stuxnet and passive monitoring to AI-native asset visibility and IT/OT convergence.",
  date: "2026-05-30",
  readTime: 9,
  tag: "cybersecurity",
  image: "/cyber2.webp",
  ogImage: "/og/blog/origin-ot-ics-security.png",
  related: [
    "origin-firewall-network-security",
    "state-of-cybersecurity-uae-2026",
    "firewall-alone-wont-stop-ransomware",
  ],
  author: eng,
};
