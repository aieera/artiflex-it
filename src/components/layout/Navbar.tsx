import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import { useContactModal } from "@/components/layout/ContactModal";
import StarBorder from "@/components/ui/StarBorder";
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
      className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-300 ${scrolled
        ? "bg-white/95 shadow-[0_1px_3px_rgba(0,0,0,0.06)] backdrop-blur-xl"
        : "bg-transparent"
        }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:h-[72px] sm:px-6 lg:px-8">
        {/* ─── Logo (left) ─── */}
        <Link to="/" className="group flex shrink-0 items-center gap-8.5">
          <img
            src="/logos/artiflexit logo.svg"
            alt="ArtiflexIT"
            className="h-10 w-14 sm:h-12 sm:w-16 lg:h-15 lg:w-20 transition-transform duration-300 group-hover:scale-105"
          />
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
                    className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${isActive(link.href)
                      ? scrolled ? "text-[#045891]" : "text-[#28B5E1]"
                      : scrolled
                        ? "text-slate-600 hover:text-heading"
                        : "text-slate-300 hover:text-white"
                      }`}
                  >
                    {link.label}
                    <ChevronDownIcon
                      className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""
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
                        className="absolute left-0 top-full mt-2 w-80 overflow-visible rounded-2xl border border-border-light bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl"
                      >
                        <div className="h-0.5 w-full bg-gradient-to-r from-[#045891] to-[#1B8AC7]" />
                        <div className="p-2">
                          {link.children.map((child) => {
                            const Icon = ICON_MAP[child.icon];
                            return (
                              <div key={child.name} className="relative group/item w-full">
                                {/* Main Item */}
                                <div className="flex items-start gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-surface-secondary cursor-pointer">
                                  <Link to={child.href} className="flex gap-3 w-full">
                                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#045891]/8 text-[#045891] group-hover/item:bg-[#045891] group-hover/item:text-white">
                                      {Icon && <Icon className="h-4 w-4" />}
                                    </div>

                                    <div>
                                      <div className="flex items-center justify-between">
                                        <span className="block text-sm font-semibold text-heading">
                                          {child.name}
                                        </span>

                                        {"children" in child && child.children && (
                                          <ChevronDownIcon
                                            className="h-4 w-4 transition-transform duration-200 -rotate-90 group-hover/item:rotate-90" />
                                        )}
                                      </div>

                                      <span className="mt-0.5 block text-xs text-muted">
                                        {child.description}
                                      </span>
                                    </div>
                                  </Link>
                                </div>

                                {/* ✅ SUBMENU */}
                                {"children" in child && child.children && (
                                  <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ pointerEvents: "auto" }}
                                    className="absolute left-full top-0 ml-4 w-72 rounded-2xl border border-border-light bg-white invisible shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl opacity-0  group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 z-50" >
                                    <div className="h-0.5 w-full bg-gradient-to-r from-[#045891] to-[#1B8AC7]" />

                                    <div className="p-2">
                                      {child.children.map((sub) => (
                                        <div className="group flex items-start gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-surface-secondary cursor-pointe">
                                          <Link key={sub.name} to={sub.href} className="flex gap-3 w-full">
                                            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#045891] transition-all duration-200 group-hover:bg-[#045891] group-hover:text-white">
                                              {Icon && <Icon className="h-4 w-4" />}
                                            </div>

                                            <div>
                                              <span className="block text-sm font-semibold text-heading">
                                                {sub.name}
                                              </span>
                                               <span className="mt-0.5 block text-xs text-muted">
                                        {sub.description}
                                      </span>
                                            </div>
                                          </Link>
                                        </div>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </div>

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
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${isActive(link.href)
                    ? scrolled ? "text-[#045891]" : "text-[#28B5E1]"
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
        <div className="ml-auto flex shrink-0 items-center gap-4">
          {/* Desktop CTA — StarBorder with logo gradient */}
          <div className="hidden lg:block">
            <StarBorder
              as="button"
              color="#1B8AC7"
              speed="5s"
              thickness={2}
              className="cursor-pointer"
              onClick={openContact}
            >
              <span className="flex items-center rounded-[18px] bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110">
                Get Started
              </span>
            </StarBorder>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`h-0.5 w-6 rounded-full transition-all duration-300 ${scrolled || mobileOpen ? "bg-slate-800" : "bg-white"
                } ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-6 rounded-full transition-all duration-300 ${scrolled || mobileOpen ? "bg-slate-800" : "bg-white"
                } ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-6 rounded-full transition-all duration-300 ${scrolled || mobileOpen ? "bg-slate-800" : "bg-white"
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
            <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const hasChildren = "children" in link && link.children;
                  return (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${isActive(link.href)
                          ? "bg-[#045891]/8 text-[#045891]"
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
                                className={`block rounded-lg px-4 py-2 text-sm transition-colors ${isActive(child.href)
                                  ? "text-[#045891] font-semibold bg-[#045891]/5"
                                  : "text-muted hover:text-heading"
                                  }`}
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
                <StarBorder
                  as="button"
                  color="#1B8AC7"
                  speed="5s"
                  thickness={2}
                  className="w-full cursor-pointer"
                  onClick={() => { setMobileOpen(false); openContact(); }}
                >
                  <span className="flex items-center justify-center rounded-[18px] bg-gradient-to-r from-[#045891] to-[#1B8AC7] py-3 text-sm font-semibold text-white w-full">
                    Get Started
                  </span>
                </StarBorder>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
