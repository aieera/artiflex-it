import type { BlogPostMeta } from "../../types";
import { ciso } from "../../authors";

export const meta: BlogPostMeta = {
  slug: "origin-zero-trust",
  title: "Never Trust. Always Verify: The Origin of Zero Trust",
  excerpt: "In 2004, a group of security professionals met in London and declared that the network perimeter was already dead. It took the rest of the industry fifteen years to agree. The story of how Zero Trust went from radical heresy to US government policy.",
  metaTitle: "Origin of Zero Trust: Jericho Forum to BeyondCorp | IAM Origin Series | Artiflex IT",
  metaDescription: "From the 2004 Jericho Forum to Forrester, Google BeyondCorp and the 2021 Biden Executive Order: twenty years of Zero Trust, from heresy to policy.",
  date: "2026-05-19",
  readTime: 7,
  tag: "cybersecurity",
  image: "/cybersecurity.webp",
  related: [
    "origin-sso",
    "origin-mfa",
    "origin-ilm",
    "origin-iga",
    "origin-pam",
    "origin-access-management",
    "origin-passwordless",
  ],
  author: ciso,
};
