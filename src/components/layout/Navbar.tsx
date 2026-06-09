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
  DatabaseIcon,
  LayersIcon,
  ChevronDownIcon,
} from "@/components/icons";

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  ShieldIcon,
  CloudIcon,
  ServerIcon,
  GearIcon,
  GlobeIcon,
  DatabaseIcon,
  LayersIcon,
};

/** Override labels used as the sub-column header in the mega-menu (where vendor lists render).
 *  When a category has a long category name but the sub-column lists vendors, use a shorter
 *  "X Vendors" label instead. Fallback is the original category name. */
const SUB_COLUMN_TITLE_OVERRIDE: Record<string, string> = {
  "Firewalls & Network Security": "Firewall Vendors",
  "Endpoint Security (EDR & XDR)": "Endpoint Vendors",
  "Email Security for Business": "Email Security Vendors",
  "Data Security & DLP": "DLP Vendors",
  "Privileged Access Management (PAM)": "PAM Vendors",
  "Identity Governance & Administration (IGA)": "IGA Vendors",
  "SASE & Zero Trust": "Workspace Vendors",
  "Vulnerability & Exposure Management": "VM Vendors",
  "Identity & Access Management (IAM)": "IAM Vendors",
  "Multi-Factor Authentication (MFA)": "MFA Vendors",
  "Identity Governance (IGA)": "IGA Vendors",
  "Privileged Access (PAM)": "PAM Vendors",
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
  const [openChild, setOpenChild] = useState<string | null>(null);
  const [openMain, setOpenMain] = useState<string | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [hoveredChildHref, setHoveredChildHref] = useState<string | null>(null);
  const [hoveredSubHref, setHoveredSubHref] = useState<string | null>(null);
  const [hoveredLeafHref, setHoveredLeafHref] = useState<string | null>(null);
  const [openLeaf, setOpenLeaf] = useState<string | null>(null);
  const dropdownAnchorRef = useRef<HTMLLIElement>(null);
  const [dropdownShift, setDropdownShift] = useState(0);

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

  /* Close the services dropdown whenever the route changes */
  useEffect(() => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(false);
    setHoveredChildHref(null);
    setHoveredSubHref(null);
    setHoveredLeafHref(null);
  }, [pathname]);

  /* Keep the services dropdown horizontally within the viewport */
  useEffect(() => {
    if (!dropdownOpen) {
      setDropdownShift(0);
      return;
    }
    type NavLeaf = { href: string; children?: ReadonlyArray<{ href: string }> };
    type NavSub = { href: string; children?: ReadonlyArray<NavLeaf> };
    type NavChild = { href: string; children?: ReadonlyArray<NavSub> };
    const SERVICES_LINK = NAV_LINKS.find(
      (l) => "children" in l && l.children,
    ) as { children: ReadonlyArray<NavChild> } | undefined;
    const MAIN_COL_WIDTH = 380;
    const SUB_COL_WIDTH = 340;
    const THIRD_COL_WIDTH = 280;
    const FOURTH_COL_WIDTH = 260;
    const EDGE_PADDING = 16;

    function compute() {
      const li = dropdownAnchorRef.current;
      if (!li) return;
      const rect = li.getBoundingClientRect();
      const activeChild = SERVICES_LINK?.children.find(
        (c) => "children" in c && c.children && c.href === hoveredChildHref,
      );
      const activeSub = activeChild?.children?.find(
        (s) => "children" in s && s.children && s.href === hoveredSubHref,
      );
      const activeLeaf = activeSub?.children?.find(
        (l) => "children" in l && l.children && l.href === hoveredLeafHref,
      );
      const width =
        MAIN_COL_WIDTH +
        (activeChild ? SUB_COL_WIDTH : 0) +
        (activeSub ? THIRD_COL_WIDTH : 0) +
        (activeLeaf ? FOURTH_COL_WIDTH : 0);
      const centerX = rect.left + rect.width / 2;
      const left = centerX - width / 2;
      const right = centerX + width / 2;
      let shift = 0;
      if (left < EDGE_PADDING) shift = EDGE_PADDING - left;
      else if (right > window.innerWidth - EDGE_PADDING)
        shift = window.innerWidth - EDGE_PADDING - right;
      setDropdownShift(shift);
    }

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [dropdownOpen, hoveredChildHref, hoveredSubHref, hoveredLeafHref]);

  // Always visible when mobile menu is open
  const isVisible = visible || mobileOpen;

  function handleDropdownEnter() {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  }
  function handleDropdownLeave() {
    dropdownTimeout.current = setTimeout(() => {
      setDropdownOpen(false);
      setHoveredChildHref(null);
      setHoveredSubHref(null);
      setHoveredLeafHref(null);
    }, 150);
  }
  function closeDropdown() {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(false);
    setHoveredChildHref(null);
    setHoveredSubHref(null);
    setHoveredLeafHref(null);
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
      <nav className="shell flex h-18 items-center sm:h-[80px]">
        {/* ─── Logo (left) ─── */}
        <Link to="/" className="group flex shrink-0 items-center gap-8.5">
          <img
            src="/logo_artiflex.png"
            alt="Artiflex Information Technology"
            className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-14 lg:h-16"
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
                  ref={dropdownAnchorRef}
                  className="relative"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <span
                    className={`flex cursor-default items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${isActive(link.href)
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
                  </span>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {dropdownOpen && (() => {
                      const activeChild = link.children.find(
                        (c) => "children" in c && c.children && c.href === hoveredChildHref
                      );
                      const subCount =
                        activeChild && "children" in activeChild && activeChild.children
                          ? activeChild.children.length
                          : 0;
                      const activeSub =
                        activeChild && "children" in activeChild && activeChild.children
                          ? (activeChild.children as ReadonlyArray<{ name: string; href: string; children?: ReadonlyArray<{ name: string; href: string; children?: ReadonlyArray<{ name: string; href: string }> }> }>).find(
                              (s) => "children" in s && s.children && s.href === hoveredSubHref,
                            )
                          : undefined;
                      const thirdCount =
                        activeSub && "children" in activeSub && activeSub.children
                          ? (activeSub.children as ReadonlyArray<unknown>).length
                          : 0;
                      const activeLeaf =
                        activeSub && "children" in activeSub && activeSub.children
                          ? (activeSub.children as ReadonlyArray<{ name: string; href: string; children?: ReadonlyArray<{ name: string; href: string; icon?: string }> }>).find(
                              (l) => "children" in l && l.children && l.href === hoveredLeafHref,
                            )
                          : undefined;
                      const fourthCount =
                        activeLeaf && "children" in activeLeaf && activeLeaf.children
                          ? (activeLeaf.children as ReadonlyArray<unknown>).length
                          : 0;
                      const SUB_COL_WIDTH = 340;
                      const THIRD_COL_WIDTH = 280;
                      const FOURTH_COL_WIDTH = 260;
                      const subWidth = subCount > 0 ? SUB_COL_WIDTH : 0;
                      const thirdWidth = thirdCount > 0 ? THIRD_COL_WIDTH : 0;
                      const fourthWidth = fourthCount > 0 ? FOURTH_COL_WIDTH : 0;
                      const expanded = !!activeChild;
                      return (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            width: expanded ? 380 + subWidth + thirdWidth + fourthWidth : 380,
                            x: dropdownShift,
                          }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                          className="absolute left-1/2 top-full mt-3 -translate-x-1/2 overflow-hidden rounded-2xl border border-border-light bg-white shadow-[0_20px_60px_rgba(0,0,0,0.1)]"
                        >
                          <div className="flex">
                            {/* Services list (single column) */}
                            <div className="w-[380px] shrink-0">
                              <div className="p-3">
                                {link.children.map((child) => {
                                  const Icon = ICON_MAP[child.icon];
                                  const childHasKids = "children" in child && child.children;
                                  const isActiveItem = hoveredChildHref === child.href;
                                  return (
                                    <div
                                      key={child.name}
                                      onMouseEnter={() => {
                                        setHoveredChildHref(childHasKids ? child.href : null);
                                        setHoveredSubHref(null);
                                        setHoveredLeafHref(null);
                                      }}
                                    >
                                      <Link
                                        to={child.href}
                                        onClick={closeDropdown}
                                        className={`group/item flex items-center gap-3 rounded-lg px-2.5 py-2.5 transition-all duration-200 ${isActiveItem
                                          ? "bg-[#045891]/8"
                                          : "hover:bg-[#045891]/5"
                                          }`}
                                      >
                                        <div
                                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${isActiveItem
                                            ? "bg-[#045891] text-white"
                                            : "bg-[#045891]/10 text-[#045891] group-hover/item:bg-[#045891] group-hover/item:text-white"
                                            }`}
                                        >
                                          {Icon && <Icon className="h-4 w-4" />}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                          <div className="flex items-center gap-2">
                                            <span className="text-[13px] font-semibold leading-tight text-heading">
                                              {child.name}
                                            </span>
                                            {childHasKids && (
                                              <ChevronDownIcon
                                                className={`h-3.5 w-3.5 -rotate-90 text-[#045891] transition-all duration-200 ${isActiveItem
                                                  ? "translate-x-0.5 opacity-100"
                                                  : "opacity-0 group-hover/item:translate-x-0.5 group-hover/item:opacity-100"
                                                  }`}
                                              />
                                            )}
                                          </div>
                                          <p className="mt-0.5 text-[11px] leading-snug text-muted line-clamp-1">
                                            {child.description}
                                          </p>
                                        </div>
                                      </Link>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Sub-items column (only when service with children is hovered) */}
                            <AnimatePresence initial={false}>
                              {activeChild && "children" in activeChild && activeChild.children && (
                                <motion.div
                                  key="subcol"
                                  initial={{ width: 0, opacity: 0 }}
                                  animate={{ width: subWidth, opacity: 1 }}
                                  exit={{ width: 0, opacity: 0 }}
                                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                                  onMouseEnter={() => setHoveredChildHref(activeChild.href)}
                                  className="overflow-hidden border-l border-border-light bg-surface-secondary"
                                >
                                  <div style={{ width: subWidth }} className="flex flex-col p-2">
                                    <div className="mb-0.5 flex items-center gap-3.5 px-2.5 pt-1 pb-2">
                                      <span className="h-px flex-1 bg-[#045891]/15" />
                                      <h4 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#045891]">
                                        {activeChild.name}
                                      </h4>
                                      <span className="h-px flex-1 bg-[#045891]/15" />
                                    </div>
                                    <ul className="flex flex-col gap-0.5">
                                      {activeChild.children.map((sub) => {
                                        const SubIcon = ICON_MAP[activeChild.icon];
                                        const subHasKids = "children" in sub && sub.children;
                                        const isActiveSubItem = hoveredSubHref === sub.href;
                                        return (
                                          <li
                                            key={sub.name}
                                            onMouseEnter={() => {
                                              setHoveredSubHref(subHasKids ? sub.href : null);
                                              setHoveredLeafHref(null);
                                            }}
                                          >
                                            <Link
                                              to={sub.href}
                                              onClick={closeDropdown}
                                              className={`group/sub flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition-colors duration-200 ${
                                                isActiveSubItem ? "bg-white" : "hover:bg-white"
                                              }`}
                                            >
                                              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ring-1 transition-colors duration-200 ${
                                                isActiveSubItem
                                                  ? "bg-[#045891] text-white ring-[#045891]"
                                                  : "bg-white text-[#045891] ring-[#045891]/10 group-hover/sub:bg-[#045891] group-hover/sub:text-white group-hover/sub:ring-[#045891]"
                                              }`}>
                                                {SubIcon && <SubIcon className="h-3 w-3" />}
                                              </span>
                                              <span className={`min-w-0 flex-1 truncate text-[12.5px] font-medium transition-colors duration-200 ${
                                                isActiveSubItem
                                                  ? "text-[#045891]"
                                                  : "text-slate-700 group-hover/sub:text-[#045891]"
                                              }`}>
                                                {sub.name}
                                              </span>
                                              {subHasKids && (
                                                <ChevronDownIcon
                                                  className={`h-3 w-3 -rotate-90 text-[#045891] transition-all duration-200 ${
                                                    isActiveSubItem
                                                      ? "translate-x-0.5 opacity-100"
                                                      : "opacity-0 group-hover/sub:translate-x-0.5 group-hover/sub:opacity-100"
                                                  }`}
                                                />
                                              )}
                                            </Link>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Third column: vendor / leaf list when a sub-item with children is hovered */}
                            <AnimatePresence initial={false}>
                              {activeSub && "children" in activeSub && activeSub.children && (
                                <motion.div
                                  key="thirdcol"
                                  initial={{ width: 0, opacity: 0 }}
                                  animate={{ width: thirdWidth, opacity: 1 }}
                                  exit={{ width: 0, opacity: 0 }}
                                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                                  onMouseEnter={() => setHoveredSubHref(activeSub.href)}
                                  className="overflow-hidden border-l border-border-light bg-white"
                                >
                                  <div style={{ width: thirdWidth }} className="flex flex-col p-2">
                                    <div className="mb-0.5 flex items-center gap-3.5 px-2.5 pt-1 pb-2">
                                      <span className="h-px flex-1 bg-[#045891]/15" />
                                      <h4 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#045891]">
                                        {SUB_COLUMN_TITLE_OVERRIDE[activeSub.name] ?? activeSub.name}
                                      </h4>
                                      <span className="h-px flex-1 bg-[#045891]/15" />
                                    </div>
                                    <ul className="flex flex-col gap-0.5">
                                      {(activeSub.children as ReadonlyArray<{ name: string; href: string; icon?: string; children?: ReadonlyArray<{ name: string; href: string; icon?: string }> }>).map((leaf) => {
                                        const leafHasKids = "children" in leaf && leaf.children;
                                        const isActiveLeaf = hoveredLeafHref === leaf.href;
                                        return (
                                        <li
                                          key={leaf.name}
                                          onMouseEnter={() =>
                                            setHoveredLeafHref(leafHasKids ? leaf.href : null)
                                          }
                                        >
                                          <Link
                                            to={leaf.href}
                                            onClick={closeDropdown}
                                            className={`group/leaf flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition-colors duration-200 ${
                                              isActiveLeaf ? "bg-[#045891]/5" : "hover:bg-[#045891]/5"
                                            }`}
                                          >
                                            {leaf.icon ? (
                                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white ring-1 ring-slate-200/80 transition-colors duration-200 group-hover/leaf:ring-[#045891]/30">
                                                <img
                                                  src={leaf.icon}
                                                  alt=""
                                                  aria-hidden="true"
                                                  className="max-h-3.5 max-w-3.5 object-contain"
                                                />
                                              </span>
                                            ) : (
                                              <span className="h-1 w-1 shrink-0 rounded-full bg-[#045891]/40 transition-colors duration-200 group-hover/leaf:bg-[#045891]" />
                                            )}
                                            <span className={`min-w-0 flex-1 truncate text-[12.5px] font-medium transition-colors duration-200 ${
                                              isActiveLeaf ? "text-[#045891]" : "text-slate-700 group-hover/leaf:text-[#045891]"
                                            }`}>
                                              {leaf.name}
                                            </span>
                                            {leafHasKids && (
                                              <ChevronDownIcon
                                                className={`h-3 w-3 -rotate-90 text-[#045891] transition-all duration-200 ${
                                                  isActiveLeaf
                                                    ? "translate-x-0.5 opacity-100"
                                                    : "opacity-0 group-hover/leaf:translate-x-0.5 group-hover/leaf:opacity-100"
                                                }`}
                                              />
                                            )}
                                          </Link>
                                        </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Fourth column: vendor detail pages when a leaf with children is hovered */}
                            <AnimatePresence initial={false}>
                              {activeLeaf && "children" in activeLeaf && activeLeaf.children && (
                                <motion.div
                                  key="fourthcol"
                                  initial={{ width: 0, opacity: 0 }}
                                  animate={{ width: fourthWidth, opacity: 1 }}
                                  exit={{ width: 0, opacity: 0 }}
                                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                                  onMouseEnter={() => setHoveredLeafHref(activeLeaf.href)}
                                  className="overflow-hidden border-l border-border-light bg-surface-secondary"
                                >
                                  <div style={{ width: fourthWidth }} className="flex flex-col p-2">
                                    <div className="mb-0.5 flex items-center gap-3.5 px-2.5 pt-1 pb-2">
                                      <span className="h-px flex-1 bg-[#045891]/15" />
                                      <h4 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#045891]">
                                        {SUB_COLUMN_TITLE_OVERRIDE[activeLeaf.name] ?? activeLeaf.name}
                                      </h4>
                                      <span className="h-px flex-1 bg-[#045891]/15" />
                                    </div>
                                    <ul className="flex flex-col gap-0.5">
                                      {(activeLeaf.children as ReadonlyArray<{ name: string; href: string; icon?: string }>).map((v) => (
                                        <li key={v.name}>
                                          <Link
                                            to={v.href}
                                            onClick={closeDropdown}
                                            className="group/v flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition-colors duration-200 hover:bg-white"
                                          >
                                            {v.icon ? (
                                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white ring-1 ring-slate-200/80 transition-colors duration-200 group-hover/v:ring-[#045891]/30">
                                                <img
                                                  src={v.icon}
                                                  alt=""
                                                  aria-hidden="true"
                                                  className="max-h-3.5 max-w-3.5 object-contain"
                                                />
                                              </span>
                                            ) : (
                                              <span className="h-1 w-1 shrink-0 rounded-full bg-[#045891]/40 transition-colors duration-200 group-hover/v:bg-[#045891]" />
                                            )}
                                            <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium text-slate-700 transition-colors duration-200 group-hover/v:text-[#045891]">
                                              {v.name}
                                            </span>
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      );
                    })()}
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
          {/* Desktop CTA, StarBorder with logo gradient */}
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
            <div className="shell max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain py-5 sm:max-h-[calc(100dvh-5rem)] sm:py-6">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const hasChildren = "children" in link && link.children;
                  return (
                    <li key={link.label}>
                      <div className="flex items-center justify-between">

                        {/* MAIN TEXT */}
                        {hasChildren ? (
                          <button
                            type="button"
                            onClick={() =>
                              setOpenMain(openMain === link.href ? null : link.href)
                            }
                            className={`flex-1 text-left rounded-xl px-4 py-3 text-base font-medium transition-colors ${isActive(link.href)
                              ? "bg-[#045891]/8 text-[#045891]"
                              : "text-slate-600 hover:bg-surface-secondary hover:text-heading"
                              }`}
                          >
                            {link.label}
                          </button>
                        ) : (
                          <Link
                            to={link.href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex-1 rounded-xl px-4 py-3 text-base font-medium transition-colors ${isActive(link.href)
                              ? "bg-[#045891]/8 text-[#045891]"
                              : "text-slate-600 hover:bg-surface-secondary hover:text-heading"
                              }`}
                          >
                            {link.label}
                          </Link>
                        )}

                        {/* ✅ MAIN ARROW */}
                        {hasChildren && (
                          <button
                            onClick={() =>
                              setOpenMain(openMain === link.href ? null : link.href)
                            }
                            className="p-2"
                          >
                            <ChevronDownIcon
                              className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${openMain === link.href ? "rotate-180" : "-rotate-90"
                                }`}
                            />
                          </button>
                        )}

                      </div>
                      {hasChildren && openMain === link.href && (
                        <ul className="mt-1 ml-4 flex flex-col gap-0.5">
                          {link.children.map((child) => (
                            <li key={child.name}>

                              {/* CHILD */}
                              <div className="flex items-center justify-between">

                                {/* TEXT */}
                                <Link
                                  to={child.href}
                                  onClick={() => setMobileOpen(false)}
                                  className={`flex-1 rounded-lg px-4 py-2 text-sm transition-colors ${isActive(child.href)
                                    ? "text-[#045891] font-semibold bg-[#045891]/5"
                                    : "text-muted hover:text-heading"
                                    }`}
                                >
                                  {child.name}
                                </Link>

                                {/* ✅ CLICKABLE ARROW */}
                                {"children" in child && child.children && (
                                  <button
                                    onClick={() =>
                                      setOpenChild(openChild === child.href ? null : child.href)
                                    }
                                    className="p-2"
                                  >
                                    <ChevronDownIcon
                                      className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${openChild === child.href ? "rotate-180" : "-rotate-90"
                                        }`}
                                    />
                                  </button>
                                )}

                              </div>

                              {/* ✅ SUBCHILD (NEW FIX) */}
                              {"children" in child && child.children && openChild === child.href && (
                                <ul className="ml-4 mt-1 border-l border-gray-200 pl-3 flex flex-col gap-0.5">
                                  {child.children.map((sub) => {
                                    const subHasKids =
                                      "children" in sub && sub.children;
                                    return (
                                      <li key={sub.name}>
                                        <div className="flex items-center justify-between">
                                          <Link
                                            to={sub.href}
                                            onClick={() => setMobileOpen(false)}
                                            className={`flex-1 px-3 py-2 text-xs rounded-md transition ${isActive(sub.href)
                                              ? "text-[#045891] font-semibold"
                                              : "text-gray-500 hover:text-heading"
                                              }`}
                                          >
                                            {sub.name}
                                          </Link>
                                          {subHasKids && (
                                            <button
                                              onClick={() =>
                                                setOpenSub(openSub === sub.href ? null : sub.href)
                                              }
                                              className="p-2"
                                              aria-label={`Toggle ${sub.name} submenu`}
                                            >
                                              <ChevronDownIcon
                                                className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${openSub === sub.href ? "rotate-180" : "-rotate-90"
                                                  }`}
                                              />
                                            </button>
                                          )}
                                        </div>
                                        {subHasKids && openSub === sub.href && (
                                          <ul className="ml-3 mt-1 border-l border-gray-200 pl-3 flex flex-col gap-0.5">
                                            {(sub.children as ReadonlyArray<{ name: string; href: string; children?: ReadonlyArray<{ name: string; href: string }> }>).map((leaf) => {
                                              const leafHasKids = "children" in leaf && leaf.children;
                                              return (
                                              <li key={leaf.name}>
                                                <div className="flex items-center justify-between">
                                                  <Link
                                                    to={leaf.href}
                                                    onClick={() => setMobileOpen(false)}
                                                    className={`flex-1 px-3 py-1.5 text-xs rounded-md transition ${isActive(leaf.href)
                                                      ? "text-[#045891] font-semibold"
                                                      : "text-gray-500 hover:text-heading"
                                                      }`}
                                                  >
                                                    {leaf.name}
                                                  </Link>
                                                  {leafHasKids && (
                                                    <button
                                                      onClick={() =>
                                                        setOpenLeaf(openLeaf === leaf.href ? null : leaf.href)
                                                      }
                                                      className="p-2"
                                                      aria-label={`Toggle ${leaf.name} submenu`}
                                                    >
                                                      <ChevronDownIcon
                                                        className={`w-3 h-3 text-gray-400 transition-transform duration-300 ${openLeaf === leaf.href ? "rotate-180" : "-rotate-90"
                                                          }`}
                                                      />
                                                    </button>
                                                  )}
                                                </div>
                                                {leafHasKids && openLeaf === leaf.href && (
                                                  <ul className="ml-3 mt-1 border-l border-gray-200 pl-3 flex flex-col gap-0.5">
                                                    {(leaf.children as ReadonlyArray<{ name: string; href: string }>).map((v) => (
                                                      <li key={v.name}>
                                                        <Link
                                                          to={v.href}
                                                          onClick={() => setMobileOpen(false)}
                                                          className={`block px-3 py-1.5 text-xs rounded-md transition ${isActive(v.href)
                                                            ? "text-[#045891] font-semibold"
                                                            : "text-gray-500 hover:text-heading"
                                                            }`}
                                                        >
                                                          {v.name}
                                                        </Link>
                                                      </li>
                                                    ))}
                                                  </ul>
                                                )}
                                              </li>
                                              );
                                            })}
                                          </ul>
                                        )}
                                      </li>
                                    );
                                  })}
                                </ul>
                              )}

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
