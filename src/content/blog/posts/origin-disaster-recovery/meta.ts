import type { BlogPostMeta } from "../../types";
import { cloudArch } from "../../authors";

export const meta: BlogPostMeta = {
  slug: "origin-disaster-recovery",
  title: "The Origin of Disaster Recovery: From Cold-War Bunkers to One-Click Cloud Failover",
  excerpt: "Disaster recovery began as an insurance policy purchased after the worst happened. Five decades later, it is woven into the architecture of every modern business. The story of how enterprises learned to keep running when everything else fails.",
  metaTitle: "Origin of Disaster Recovery: Sungard to DRaaS to Cyber Recovery | Artiflex IT",
  metaDescription: "How disaster recovery evolved from mainframe cold sites to one-click cloud failover: Sungard, 9/11, VMware SRM, Zerto and Azure Site Recovery.",
  date: "2026-05-16",
  readTime: 11,
  tag: "cloud",
  image: "/cyber1.jpeg",
  ogImage: "/og/blog/origin-disaster-recovery.png",
  related: [
    "origin-backup-as-a-service",
    "origin-public-cloud",
    "origin-hybrid-cloud",
  ],
  author: cloudArch,
};
