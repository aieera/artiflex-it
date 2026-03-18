import React from "react";

interface SectionLabelProps {
  text: string;
}

export default function SectionLabel({ text }: SectionLabelProps) {
  return (
    <div className="mb-5">
      <span className="inline-flex items-center gap-2 rounded-full bg-brand-blue/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-blue">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
        {text}
      </span>
    </div>
  );
}
