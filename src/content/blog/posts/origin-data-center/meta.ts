import type { BlogPostMeta } from "../../types";
import { eng } from "../../authors";

export const meta: BlogPostMeta = {
  slug: "origin-data-center",
  title: "The Origin of the Data Center: From a Punch-Card Room at Penn to the Hyperscale Hall",
  excerpt: "In February 1946 ENIAC went live in a single basement room and consumed 150 kilowatts. Eight decades later, a single AI training run can draw more power than a small city. The story of how the data centre became civilisation's most expensive building.",
  metaTitle: "Origin of the Data Center: ENIAC to Hyperscale AI Hall | Artiflex IT",
  metaDescription: "How the data centre evolved from a single basement room to AI-era hyperscale halls: cooling, redundancy, modular build and the UAE chapter.",
  date: "2026-05-17",
  readTime: 12,
  tag: "infrastructure",
  image: "/cyber1.jpeg",
  ogImage: "/og/blog/origin-data-center.png",
  related: [
    "origin-servers-compute-virtualization",
    "origin-power-ups",
    "origin-network-infrastructure",
  ],
  author: eng,
};
