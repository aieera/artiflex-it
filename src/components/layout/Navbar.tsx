import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import { useContactModal } from "@/components/layout/ContactModal";
import {
  ShieldIcon,
  CloudIcon,
  ServerIcon,
  GearIcon,
  GlobeIcon,
  ChevronDownIcon,
} from "@/components/icons";

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  ShieldIcon,
  CloudIcon,
  ServerIcon,
  GearIcon,
  GlobeIcon,
};

export default function Navbar() {
  const { pathname } = useLocation();
  const { open: openContact } = useContactModal();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);

  /* Scroll: detect direction + scrolled state */
  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 20);
        // Hide on scroll down, show on scroll up (only after 100px)
        if (y > 100) {
          setVisible(y < lastScrollY.current || y < 20);
        } else {
          setVisible(true);
        }
        lastScrollY.current = y;
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Body scroll lock */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Always visible when mobile menu is open
  const isVisible = visible || mobileOpen;

  function handleDropdownEnter() {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  }
  function handleDropdownLeave() {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 150);
  }
  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-300 ${
        scrolled
          ? "bg-white/95 shadow-[0_1px_3px_rgba(0,0,0,0.06)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center px-6 lg:px-8">
        {/* ─── Logo (left) ─── */}
        <Link to="/" className="group flex shrink-0 items-center gap-8.5">
          <img
            src="/logos/artiflexit logo.svg"
            alt="ArtiflexIT"
            className="h-15 w-20 transition-transform duration-300 group-hover:scale-105"
          />
          <span
            className={`font-display text-xl font-bold transition-colors duration-300 ${
              scrolled ? "text-heading" : "text-white"
            }`}
          >
            Artiflex<span className="text-brand-blue">It</span>
          </span>
        </Link>

        {/* ─── Desktop nav (center) ─── */}
        <ul className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const hasChildren = "children" in link && link.children;

            if (hasChildren) {
              return (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    to={link.href}
                    className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive(link.href)
                        ? "text-brand-blue"
                        : scrolled
                          ? "text-slate-600 hover:text-heading"
                          : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <ChevronDownIcon
                      className={`h-4 w-4 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-1/2 top-full mt-2 w-80 -translate-x-1/2 overflow-hidden rounded-2xl border border-border-light bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl"
                      >
                        <div className="h-0.5 w-full bg-gradient-to-r from-brand-blue to-brand-cyan" />
                        <div className="p-2">
                          {link.children.map((child) => {
                            const Icon = ICON_MAP[child.icon];
                            return (
                              <Link
                                key={child.name}
                                to={child.href}
                                className="group/item flex items-start gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-surface-secondary"
                                onClick={() => setDropdownOpen(false)}
                              >
                                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-blue/8 text-brand-blue transition-colors duration-200 group-hover/item:bg-brand-blue group-hover/item:text-white">
                                  {Icon && <Icon className="h-4 w-4" />}
                                </div>
                                <div>
                                  <span className="block text-sm font-semibold text-heading">
                                    {child.name}
                                  </span>
                                  <span className="mt-0.5 block text-xs text-muted">
                                    {child.description}
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            }

            return (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(link.href)
                      ? "text-brand-blue"
                      : scrolled
                        ? "text-slate-600 hover:text-heading"
                        : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ─── CTA + Hamburger (right) ─── */}
        <div className="flex shrink-0 items-center gap-4">
          <button
            type="button"
            onClick={openContact}
            className={`hidden rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 lg:inline-flex ${
              scrolled
                ? "bg-heading text-white hover:bg-brand-blue"
                : "bg-white text-heading hover:bg-brand-blue hover:text-white"
            }`}
          >
            Get Started
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`h-0.5 w-6 rounded-full transition-all duration-300 ${
                scrolled || mobileOpen ? "bg-slate-800" : "bg-white"
              } ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-6 rounded-full transition-all duration-300 ${
                scrolled || mobileOpen ? "bg-slate-800" : "bg-white"
              } ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-6 rounded-full transition-all duration-300 ${
                scrolled || mobileOpen ? "bg-slate-800" : "bg-white"
              } ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* ─── Mobile menu ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border-light bg-white lg:hidden"
          >
            <div className="mx-auto max-w-7xl px-6 py-6">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const hasChildren = "children" in link && link.children;
                  return (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                          isActive(link.href)
                            ? "bg-brand-blue/8 text-brand-blue"
                            : "text-slate-600 hover:bg-surface-secondary hover:text-heading"
                        }`}
                      >
                        {link.label}
                      </Link>
                      {hasChildren && (
                        <ul className="mt-1 ml-4 flex flex-col gap-0.5">
                          {link.children.map((child) => (
                            <li key={child.name}>
                              <Link
                                to={child.href}
                                onClick={() => setMobileOpen(false)}
                                className="block rounded-lg px-4 py-2 text-sm text-muted transition-colors hover:text-heading"
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => { setMobileOpen(false); openContact(); }}
                  className="w-full rounded-full bg-heading py-3 text-sm font-medium text-white transition-colors hover:bg-brand-blue"
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
