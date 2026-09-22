import type { BlogPostMeta } from "../../types";
import { eng } from "../../authors";

export const meta: BlogPostMeta = {
  slug: "origin-endpoint-security",
  title: "The Origin of Endpoint Security: How Two Engineers in Oxford Started an Industry",
  excerpt: "In 1985, Peter Lammer and Jan Hruska founded Sophos in a small office in Abingdon, Oxford, and wrote the world's first antivirus software. Forty years later, that single line of code has evolved into AI-powered XDR platforms autonomously hunting threats across every device on the planet. This is the story of how endpoint security as we know it actually came to be.",
  metaTitle: "History of Endpoint Security: AV to EDR & XDR | Artiflex IT",
  metaDescription: "From Oxford in 1985 to EDR and XDR today. The full history of endpoint security: antivirus, signature engines, NGAV, EDR, XDR and the rise of MDR.",
  date: "2026-04-29",
  readTime: 10,
  tag: "cybersecurity",
  image: "/cyber2.webp",
  ogImage: "/og/blog/origin-endpoint-security.png",
  related: [
    "firewall-alone-wont-stop-ransomware",
    "state-of-cybersecurity-uae-2026",
    "social-engineering-uae",
  ],
  author: eng,
};
