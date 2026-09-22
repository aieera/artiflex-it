import type { BlogPostMeta } from "../../types";
import { ciso } from "../../authors";

export const meta: BlogPostMeta = {
  slug: "origin-passwordless",
  title: "The Sixty-Year-Old Problem Finally Solved: The Origin of Passwordless",
  excerpt: "The industry knew passwords were broken from almost the moment they were invented. It took fifty years of building better solutions that people would not use before passkeys arrived, simultaneously more secure and simpler than anything before them.",
  metaTitle: "Origin of Passwordless Authentication | IAM Origin Series | Artiflex IT",
  metaDescription: "From Corbato's 1961 password to FIDO2, WebAuthn and the 2022 passkey launch by Apple, Google and Microsoft. How passwords finally got replaced.",
  date: "2026-05-19",
  readTime: 6,
  tag: "cybersecurity",
  image: "/cybersecurity.webp",
  related: [
    "origin-sso",
    "origin-mfa",
    "origin-ilm",
    "origin-iga",
    "origin-pam",
    "origin-access-management",
    "origin-zero-trust",
  ],
  author: ciso,
};
