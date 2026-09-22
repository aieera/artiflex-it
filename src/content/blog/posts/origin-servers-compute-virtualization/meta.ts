import type { BlogPostMeta } from "../../types";
import { eng } from "../../authors";

export const meta: BlogPostMeta = {
  slug: "origin-servers-compute-virtualization",
  title: "The Origin of the Server: From the IBM AS/400 to the Virtualised Cloud Workload",
  excerpt: "In 1964 a Fortune 500 company bought one mainframe. By 1999 the same company ran a hundred x86 servers under desks. By 2025 it runs ten thousand virtualised workloads across a few HCI clusters and three cloud regions. How compute went from monolithic to elastic.",
  metaTitle: "Origin of the Server: Mainframe to Virtualised Cloud Workload | Artiflex IT",
  metaDescription: "How servers and virtualisation evolved from the mainframe through PC servers, blade chassis, VMware, HCI and the post-Broadcom hypervisor era.",
  date: "2026-05-17",
  readTime: 11,
  tag: "infrastructure",
  image: "/cyber1.jpeg",
  ogImage: "/og/blog/origin-servers-compute-virtualization.png",
  related: [
    "origin-storage-solutions",
    "origin-network-infrastructure",
    "origin-backup-data-management",
  ],
  author: eng,
};
