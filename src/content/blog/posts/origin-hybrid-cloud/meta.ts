import type { BlogPostMeta } from "../../types";
import { cloudArch } from "../../authors";

export const meta: BlogPostMeta = {
  slug: "origin-hybrid-cloud",
  title: "The Origin of Hybrid Cloud: How Enterprises Refused to Choose",
  excerpt: "By 2010, the IT industry had drawn a line: all-in on public cloud or stay locked on-premise. The largest enterprises refused both options. In their refusal, hybrid cloud was invented. The full story.",
  metaTitle: "Origin of Hybrid Cloud: NIST to Azure Stack to Outposts | Artiflex IT",
  metaDescription: "How hybrid cloud went from architectural compromise to first-class enterprise pattern. NIST, VMware vCloud, Azure Stack, AWS Outposts, and what comes next.",
  date: "2026-05-16",
  readTime: 10,
  tag: "cloud",
  image: "/cyber1.jpeg",
  ogImage: "/og/blog/origin-hybrid-cloud.png",
  related: [
    "origin-public-cloud",
    "origin-private-cloud",
    "origin-multi-cloud-strategy",
  ],
  author: cloudArch,
};
