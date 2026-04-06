import React from "react";
import SectionLabel from "./SectionLabel";

interface SectionHeaderProps {
  label: string;
  title: string | React.ReactNode;
  description?: string;
  centered?: boolean;
  dark?: boolean;
}

export default function SectionHeader({
  label,
  title,
  description,
  centered = false,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 sm:mb-12 md:mb-16 ${centered ? "text-center" : ""}`}>
      <div className={centered ? "flex justify-center" : ""}>
        <SectionLabel text={label} dark={dark} />
      </div>
      <h2
        className={`font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.15] ${
          dark ? "text-white" : "text-heading"
        } ${centered ? "mx-auto max-w-3xl" : "max-w-2xl"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-sm leading-relaxed sm:mt-5 sm:text-base lg:text-lg ${
            dark ? "text-slate-300" : "text-body"
          } ${centered ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
