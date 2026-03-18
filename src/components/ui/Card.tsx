import React from "react";

type CardVariant = "default" | "glass" | "service";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: CardVariant;
  hover?: boolean;
}

const variantBase: Record<CardVariant, string> = {
  default:
    "rounded-2xl bg-white border border-border-light shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
  glass:
    "rounded-2xl bg-white/80 backdrop-blur-xl border border-border-light shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
  service:
    "rounded-2xl bg-white border border-border-light shadow-[0_1px_3px_rgba(0,0,0,0.04)] relative overflow-hidden",
};

const hoverClasses =
  "hover:shadow-[0_8px_30px_rgba(27,138,199,0.08)] hover:border-brand-blue/25 hover:-translate-y-0.5";

export default function Card({
  children,
  className = "",
  variant = "default",
  hover = true,
}: CardProps) {
  return (
    <div
      className={`group relative p-6 transition-all duration-500 ease-out ${variantBase[variant]} ${
        hover ? hoverClasses : ""
      } ${className}`}
    >
      {/* Top accent line — appears on hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-brand-blue to-brand-cyan opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {children}
    </div>
  );
}
