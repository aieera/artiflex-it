import React from "react";
import SectionLabel from "./SectionLabel";

interface SectionHeaderProps {
  label: string;
  title: string | React.ReactNode;
  description?: string;
  centered?: boolean;
}

export default function SectionHeader({
  label,
  title,
  description,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 sm:mb-12 md:mb-16 ${centered ? "text-center" : ""}`}>
      <div className={centered ? "flex justify-center" : ""}>
        <SectionLabel text={label} />
      </div>
      <h2
        className={`font-display text-2xl font-bold tracking-tight text-heading sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.15] ${
          centered ? "mx-auto max-w-3xl" : "max-w-2xl"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-sm leading-relaxed text-body sm:mt-5 sm:text-base lg:text-lg ${
            centered ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
