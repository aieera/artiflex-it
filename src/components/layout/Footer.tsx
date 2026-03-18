import React from "react";
import { Link } from "react-router-dom";
import { FOOTER_LINKS, CONTACT_INFO, SOCIAL_LINKS } from "@/lib/constants";
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/components/icons";

const SOCIAL_ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  LinkedInIcon,
  TwitterIcon,
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-navy-deep">
      {/* Gradient top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue to-transparent" />

      <div className="mx-auto max-w-7xl px-5 pb-8 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        {/* ─── Columns ─── */}
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
          {/* Column 1 — Brand */}
          <div>
            <Link to="/" className="group inline-flex items-center gap-2.5">
              <img src="/logos/artiflexit logo.svg" alt="ArtiflexIT" className="h-18 w-25" />
              
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Enterprise-grade cybersecurity and IT solutions protecting
              businesses across the UAE and the wider Middle East region.
            </p>
          </div>

          {/* Column 2 — Services */}
          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-slate-400 transition-colors duration-200 hover:text-brand-blue"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-slate-400 transition-colors duration-200 hover:text-brand-blue"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3">
                <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                <span className="text-sm text-slate-400">
                  {CONTACT_INFO.address}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm text-slate-400 transition-colors duration-200 hover:text-brand-blue"
                >
                  <PhoneIcon className="h-5 w-5 shrink-0 text-brand-blue" />
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-3 text-sm text-slate-400 transition-colors duration-200 hover:text-brand-blue"
                >
                  <MailIcon className="h-5 w-5 shrink-0 text-brand-blue" />
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ─── Bottom bar ─── */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            &copy; 2026 ArtiflexIT. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => {
              const Icon = SOCIAL_ICON_MAP[social.icon];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-slate-400 transition-all duration-200 hover:border-brand-blue/30 hover:bg-brand-blue/10 hover:text-brand-blue"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
