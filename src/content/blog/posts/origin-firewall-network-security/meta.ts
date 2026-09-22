import type { BlogPostMeta } from "../../types";
import { eng } from "../../authors";

export const meta: BlogPostMeta = {
  slug: "origin-firewall-network-security",
  title: "The Origin of the Firewall: How One Worm in 1988 Built an Entire Industry",
  excerpt: "On November 2, 1988, a Cornell graduate student released a small program onto the early internet. It was meant as an experiment. Instead, it crashed 6,000 computers, took down universities and military bases, and triggered the birth of the firewall. The full story of how network security as we know it actually came to exist.",
  metaTitle: "Origin of the Firewall: Morris Worm to NGFW | Artiflex IT",
  metaDescription: "How a single worm in 1988 sparked the firewall industry. The full story: Morris Worm, DEC, Check Point, Astaro, Palo Alto, and what comes next.",
  date: "2026-04-28",
  readTime: 11,
  tag: "cybersecurity",
  image: "/images/blog-images/origin-firewall-1988-worm.webp",
  imageAlt: "Timeline from 1988 terminals sending orange worm traffic into a glowing firewall wall, with clean blue traffic passing through to a next-generation firewall and cloud on the right",
  ogImage: "/images/blog-images/origin-firewall-1988-worm-og.jpg",
  updated: "2026-09-23",
  related: [
    "firewall-alone-wont-stop-ransomware",
    "state-of-cybersecurity-uae-2026",
    "social-engineering-uae",
  ],
  author: eng,
};
