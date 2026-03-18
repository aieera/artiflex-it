import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@/components/icons";

type ButtonVariant = "primary" | "gradient" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  arrow?: boolean;
  disabled?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  gradient:
    "bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-[0_4px_14px_rgba(27,138,199,0.3)] hover:shadow-[0_6px_20px_rgba(27,138,199,0.4)] hover:brightness-105",
  primary:
    "bg-brand-blue text-white shadow-[0_4px_14px_rgba(27,138,199,0.25)] hover:bg-brand-blue-bright",
  outline:
    "border-2 border-brand-blue/30 text-brand-blue hover:bg-brand-blue/5 hover:border-brand-blue/50",
  ghost:
    "text-body hover:text-heading hover:bg-slate-50",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg gap-1.5",
  md: "px-6 py-2.5 text-sm rounded-xl gap-2",
  lg: "px-6 py-3 text-sm rounded-xl gap-2.5 sm:px-8 sm:py-3.5 sm:text-base",
};

export default function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  arrow = false,
  disabled = false,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-300 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50 disabled:opacity-50 disabled:cursor-not-allowed";

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  if (href) {
    return (
      <Link to={href} className={`group ${classes}`}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group ${classes}`}
    >
      {content}
    </button>
  );
}
