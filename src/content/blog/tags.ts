/**
 * Blog tag palette. The chip label and Tailwind classes live here only,
 * the registry attaches them to each post, so posts store just `tag`.
 */

import type { BlogTag } from "./types";

export const TAG_STYLES: Record<BlogTag, { label: string; color: string }> = {
  cybersecurity: {
    label: "Cybersecurity",
    color: "bg-red-500/10 text-red-400 border-red-500/30",
  },
  cloud: {
    label: "Cloud",
    color: "bg-brand-blue/10 text-brand-blue border-brand-blue/30",
  },
  compliance: {
    label: "Compliance",
    color: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  },
  infrastructure: {
    label: "Infrastructure",
    color: "bg-brand-purple/10 text-brand-purple border-brand-purple/30",
  },
  "managed-services": {
    label: "Managed Services",
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  },
};

export const tagOf = (t: BlogTag) => TAG_STYLES[t];
