import type { BlogPostMeta } from "../../types";
import { ciso } from "../../authors";

export const meta: BlogPostMeta = {
  slug: "origin-mfa",
  title: "The Little Black Fob That Changed Security: The Origin of MFA",
  excerpt: "In 1986, RSA Security shipped a small hardware device that generated a new number every 60 seconds. It was expensive, inconvenient, and slightly mysterious. It was also the beginning of the end for the password as a sufficient proof of identity.",
  metaTitle: "Origin of Multi-Factor Authentication | IAM Origin Series | Artiflex IT",
  metaDescription: "From the 1986 RSA SecurID hardware token to Google Authenticator, Duo push notifications, and phishing-resistant FIDO2. Forty years of stronger second factors.",
  date: "2026-05-19",
  readTime: 6,
  tag: "cybersecurity",
  image: "/cybersecurity.webp",
  related: [
    "origin-sso",
    "origin-ilm",
    "origin-iga",
    "origin-pam",
    "origin-access-management",
    "origin-zero-trust",
    "origin-passwordless",
  ],
  author: ciso,
};
