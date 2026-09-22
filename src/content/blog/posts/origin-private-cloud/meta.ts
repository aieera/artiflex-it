import type { BlogPostMeta } from "../../types";
import { cloudArch } from "../../authors";

export const meta: BlogPostMeta = {
  slug: "origin-private-cloud",
  title: "The Origin of Private Cloud: When the Data Centre Became Self-Service",
  excerpt: "Public cloud got the headlines. A quieter revolution was happening inside enterprise data centres, turning rooms full of static servers into elastic, self-service compute platforms. The full story of how private cloud was born.",
  metaTitle: "Origin of Private Cloud: VMware, OpenStack, HCI, Kubernetes | Artiflex IT",
  metaDescription: "How private cloud emerged from virtualisation, OpenStack, VMware and hyperconverged infrastructure. ESX, NASA Nebula, vCloud, Nutanix and OpenShift.",
  date: "2026-05-16",
  readTime: 11,
  tag: "cloud",
  image: "/cyber1.jpeg",
  ogImage: "/og/blog/origin-private-cloud.png",
  related: [
    "origin-public-cloud",
    "origin-hybrid-cloud",
    "origin-multi-cloud-strategy",
  ],
  author: cloudArch,
};
