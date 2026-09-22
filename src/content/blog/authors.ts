/**
 * Shared blog authors. Post `meta.ts` files import one of these rather
 * than inlining the object, so a bio edit lands everywhere at once.
 */

import type { BlogAuthor } from "./types";

export const eng: BlogAuthor = {
  name: "Artiflex IT Engineering",
  role: "Cybersecurity & Cloud Engineering Team",
  bio: "Senior engineers across security operations, cloud architecture, and IT infrastructure at Artiflex IT. Combined 200+ years of field experience across UAE, Oman, and Saudi Arabia.",
  avatar: "/images/team/engineering-team.jpg",
};

export const ciso: BlogAuthor = {
  name: "Artiflex IT Security Practice",
  role: "CISO Advisory & Compliance",
  bio: "Artiflex IT's security advisory practice, NESA, UAE PDPL, ISO 27001, NIST CSF 2.0 implementation across GCC enterprises.",
  avatar: "/images/team/security-practice.jpg",
};

export const cloudArch: BlogAuthor = {
  name: "Artiflex IT Cloud Practice",
  role: "Cloud Architecture & FinOps",
  bio: "AWS, Azure, and private-cloud architects with experience modernizing infrastructure for UAE banking, logistics, and healthcare clients.",
  avatar: "/images/team/cloud-practice.jpg",
};
