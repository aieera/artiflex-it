import type { BlogPostMeta } from "../../types";
import { eng } from "../../authors";

export const meta: BlogPostMeta = {
  slug: "origin-storage-solutions",
  title: "The Origin of Enterprise Storage: From the 1956 IBM Disk to the All-Flash AI Array",
  excerpt: "In September 1956 IBM unveiled the first commercial hard drive. It weighed a tonne, stored 5 megabytes and rented for 3,200 dollars a month. Seventy years later a single modern NVMe drive holds 60 terabytes in a postcard footprint. How storage went from precious resource to invisible utility.",
  metaTitle: "Origin of Enterprise Storage: IBM RAMAC to All-Flash AI Array | Artiflex IT",
  metaDescription: "How enterprise storage evolved from the 1956 IBM RAMAC through RAID, EMC Symmetrix, Pure Storage all-flash and NVMe. The full story.",
  date: "2026-05-17",
  readTime: 12,
  tag: "infrastructure",
  image: "/cyber1.jpeg",
  ogImage: "/og/blog/origin-storage-solutions.png",
  related: [
    "origin-servers-compute-virtualization",
    "origin-backup-data-management",
    "origin-network-infrastructure",
  ],
  author: eng,
};
