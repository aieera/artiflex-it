import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import { useContactModal } from "@/components/layout/ContactModal";
import StarBorder from "@/components/ui/StarBorder";
import { trackEvent } from "@/lib/analytics";
import {
  ShieldIcon,
  CloudIcon,
  ServerIcon,
  GearIcon,
  GlobeIcon,
  DatabaseIcon,
  LayersIcon,
  BookOpenIcon,
  ChevronDownIcon,
} from "@/components/icons";

/* ───────── Menu data types (NAV_LINKS is `as const`, so cast once) ───────── */

type NavVendor = { name: string; href: string; icon?: string };
type NavLeaf = { name: string; href: string; icon?: string; children?: ReadonlyArray<NavVendor> };
type NavSub = { name: string; href: string; icon?: string; children?: ReadonlyArray<NavLeaf> };
type NavChild = { name: string; description: string; href: string; icon: string; children?: ReadonlyArray<NavSub> };
type NavTop = { label: string; href: string; children?: ReadonlyArray<NavChild> };

const TOP_LINKS = NAV_LINKS as unknown as ReadonlyArray<NavTop>;
const SERVICES_CHILDREN: ReadonlyArray<NavChild> = TOP_LINKS.find((l) => l.children)?.children ?? [];

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  ShieldIcon,
  CloudIcon,
  ServerIcon,
  GearIcon,
  GlobeIcon,
  DatabaseIcon,
  LayersIcon,
  BookOpenIcon,
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

const MAIN_COL_WIDTH = 380;
const SUB_COL_WIDTH = 340;
const THIRD_COL_WIDTH = 280;
const FOURTH_COL_WIDTH = 260;

/** Run after React has committed and the browser has applied the new
 *  visibility, so a just-revealed link can actually take focus. */
const afterPaint = (fn: () => void) => requestAnimationFrame(() => requestAnimationFrame(fn));

export default function Navbar() {
  const { pathname } = useLocation();
  const { open: openContact } = useContactModal();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [kbSuppressed, setKbSuppressed] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openedByHoverAt = useRef(0);
  const lastScrollY = useRef(0);
  const [openChild, setOpenChild] = useState<string | null>(null);
  const [openMain, setOpenMain] = useState<string | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [hoveredChildHref, setHoveredChildHref] = useState<string | null>(null);
  const [hoveredSubHref, setHoveredSubHref] = useState<string | null>(null);
  const [hoveredLeafHref, setHoveredLeafHref] = useState<string | null>(null);
  const [openLeaf, setOpenLeaf] = useState<string | null>(null);
  const dropdownAnchorRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const mainRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const subRefs = useRef<Record<string, HTMLDivElement | null>>({});
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

  /* Close the menus whenever the route changes */
  useEffect(() => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(false);
    setHoveredChildHref(null);
    setHoveredSubHref(null);
    setHoveredLeafHref(null);
    setMobileOpen(false);
  }, [pathname]);

  /* Tap outside closes the services menu (touch screens have no mouseleave) */
  useEffect(() => {
    if (!dropdownOpen) return;
    function onPointerDown(e: PointerEvent) {
      if (dropdownAnchorRef.current && !dropdownAnchorRef.current.contains(e.target as Node)) closeDropdown();
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [dropdownOpen]);

  const activeChild = SERVICES_CHILDREN.find((c) => c.children && c.href === hoveredChildHref);
  const activeSub = activeChild?.children?.find((s) => s.children && s.href === hoveredSubHref);
  const activeLeaf = activeSub?.children?.find((l) => l.children && l.href === hoveredLeafHref);
  const panelWidth =
    MAIN_COL_WIDTH +
    (activeChild ? SUB_COL_WIDTH : 0) +
    (activeSub ? THIRD_COL_WIDTH : 0) +
    (activeLeaf ? FOURTH_COL_WIDTH : 0);

  /* Keep the services dropdown horizontally within the viewport */
  useEffect(() => {
    const EDGE_PADDING = 16;
    function compute() {
      const li = dropdownAnchorRef.current;
      if (!li) return;
      const rect = li.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const left = centerX - panelWidth / 2;
      const right = centerX + panelWidth / 2;
      let shift = 0;
      if (left < EDGE_PADDING) shift = EDGE_PADDING - left;
      else if (right > window.innerWidth - EDGE_PADDING)
        shift = window.innerWidth - EDGE_PADDING - right;
      setDropdownShift(shift);
    }
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [panelWidth]);

  // Always visible when mobile menu is open
  const isVisible = visible || mobileOpen;

  function handleDropdownEnter() {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    if (!dropdownOpen) openedByHoverAt.current = Date.now();
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
  function onTriggerClick() {
    // A tap fires an emulated mouseenter just before click: that already
    // opened the menu, so do not immediately toggle it shut again.
    if (dropdownOpen && Date.now() - openedByHoverAt.current < 400) return;
    if (dropdownOpen) closeDropdown();
    else setDropdownOpen(true);
  }
  function activateChild(child: NavChild) {
    setHoveredChildHref(child.children ? child.href : null);
    setHoveredSubHref(null);
    setHoveredLeafHref(null);
  }

  /* Keyboard: the second column sits after the whole first column in the
     DOM, so plain Tab would skip from "Cybersecurity" straight to "Cloud
     Solutions". Route Tab into the active sub-list and back out again. */
  function onMainKeyDown(e: React.KeyboardEvent, i: number) {
    if (e.key !== "Tab") return;
    const child = SERVICES_CHILDREN[i];
    if (!e.shiftKey && child.children) {
      const first = subRefs.current[child.href]?.querySelector("a");
      if (first) {
        e.preventDefault();
        setHoveredChildHref(child.href);
        afterPaint(() => first.focus());
      }
    } else if (e.shiftKey && i > 0) {
      const prev = SERVICES_CHILDREN[i - 1];
      const links = prev.children ? subRefs.current[prev.href]?.querySelectorAll("a") : undefined;
      const last = links?.[links.length - 1];
      if (last) {
        e.preventDefault();
        setHoveredChildHref(prev.href);
        afterPaint(() => last.focus());
      }
    }
  }
  function onSubListKeyDown(e: React.KeyboardEvent<HTMLDivElement>, i: number) {
    if (e.key !== "Tab") return;
    const links = Array.from(e.currentTarget.querySelectorAll("a"));
    const idx = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (!e.shiftKey && idx === links.length - 1 && mainRefs.current[i + 1]) {
      e.preventDefault();
      mainRefs.current[i + 1]!.focus();
    } else if (e.shiftKey && idx === 0 && mainRefs.current[i]) {
      e.preventDefault();
      mainRefs.current[i]!.focus();
    }
  }
  function onServicesKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "Escape") return;
    closeDropdown();
    setKbSuppressed(true);
    triggerRef.current?.focus();
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
      <nav className="shell flex h-18 items-center sm:h-[80px]" aria-label="Main">
        {/* ─── Logo (left) ─── */}
        <Link to="/" className="group flex shrink-0 items-center gap-8.5">
          <img
            src="/logo_artiflex.webp"
            alt="Artiflex Information Technology"
            className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-14 lg:h-16"
          />
        </Link>

        {/* ─── Desktop nav (center) ─── */}
        <ul className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {TOP_LINKS.map((link) => {
            if (link.children) {
              return (
                <li
                  key={link.label}
                  ref={dropdownAnchorRef}
                  className="mega-root relative"
                  data-open={dropdownOpen ? "true" : "false"}
                  data-suppress={kbSuppressed ? "true" : "false"}
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                  onKeyDown={onServicesKeyDown}
                >
                  <button
                    ref={triggerRef}
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen}
                    aria-controls="services-mega-menu"
                    onClick={onTriggerClick}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") setKbSuppressed(false);
                    }}
                    className={`flex cursor-pointer items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${isActive(link.href)
                      ? scrolled ? "text-[#045891]" : "text-[#28B5E1]"
                      : scrolled
                        ? "text-slate-600 hover:text-heading"
                        : "text-slate-300 hover:text-white"
                      }`}
                  >
                    {link.label}
                    <ChevronDownIcon
                      className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown: ALWAYS rendered (see .mega-panel in globals.css).
                      Columns 1 and 2 (service hubs, and every hub's sub-list
                      including the 11 cybersecurity pillars) are always in the
                      DOM; the vendor columns 3 and 4 still mount on demand. */}
                  <motion.div
                    id="services-mega-menu"
                    initial={false}
                    animate={{ width: panelWidth, x: dropdownShift }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    onFocusCapture={() => setKbSuppressed(false)}
                    style={{ width: MAIN_COL_WIDTH }}
                    className="mega-panel absolute left-1/2 top-full mt-3 overflow-hidden rounded-2xl border border-border-light bg-white shadow-[0_20px_60px_rgba(0,0,0,0.1)]"
                  >
                    <div className="flex">
                      {/* Column 1: service hubs */}
                      <div className="shrink-0" style={{ width: MAIN_COL_WIDTH }}>
                        <ul className="p-3">
                          {SERVICES_CHILDREN.map((child, i) => {
                            const Icon = ICON_MAP[child.icon];
                            const childHasKids = !!child.children;
                            const isActiveItem = hoveredChildHref === child.href;
                            return (
                              <li key={child.name} onMouseEnter={() => activateChild(child)}>
                                <Link
                                  ref={(el) => { mainRefs.current[i] = el; }}
                                  to={child.href}
                                  onClick={closeDropdown}
                                  onFocus={() => activateChild(child)}
                                  onKeyDown={(e) => onMainKeyDown(e, i)}
                                  aria-controls={childHasKids ? `mega-sub-${i}` : undefined}
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
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* Column 2: one sub-list per hub, all in the DOM. Only
                          the hovered / focused hub's list is visible; the rest
                          are visibility:hidden and absolutely positioned so
                          they take no space and cannot receive focus. */}
                      <motion.div
                        initial={false}
                        animate={{ width: activeChild ? SUB_COL_WIDTH : 0 }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        style={{ width: 0 }}
                        className={`relative shrink-0 overflow-hidden bg-surface-secondary ${activeChild ? "border-l border-border-light" : ""}`}
                      >
                        {SERVICES_CHILDREN.map((child, i) => {
                          if (!child.children) return null;
                          const SubIcon = ICON_MAP[child.icon];
                          const isShown = activeChild?.href === child.href;
                          return (
                            <div
                              key={child.href}
                              id={`mega-sub-${i}`}
                              ref={(el) => { subRefs.current[child.href] = el; }}
                              onMouseEnter={() => setHoveredChildHref(child.href)}
                              onKeyDown={(e) => onSubListKeyDown(e, i)}
                              style={{ width: SUB_COL_WIDTH }}
                              className={`flex flex-col p-2 transition-opacity duration-200 ${isShown
                                ? "relative visible opacity-100"
                                : "pointer-events-none invisible absolute left-0 top-0 opacity-0"
                                }`}
                            >
                              <div className="mb-0.5 flex items-center gap-3.5 px-2.5 pt-1 pb-2">
                                <span className="h-px flex-1 bg-[#045891]/15" />
                                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#045891]">
                                  {child.name}
                                </p>
                                <span className="h-px flex-1 bg-[#045891]/15" />
                              </div>
                              <ul className="flex flex-col gap-0.5">
                                {child.children.map((sub) => {
                                  const subHasKids = !!sub.children;
                                  const isActiveSubItem = hoveredSubHref === sub.href;
                                  const activateSub = () => {
                                    setHoveredSubHref(subHasKids ? sub.href : null);
                                    setHoveredLeafHref(null);
                                  };
                                  return (
                                    <li key={sub.name} onMouseEnter={activateSub}>
                                      <Link
                                        to={sub.href}
                                        onClick={closeDropdown}
                                        onFocus={activateSub}
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
                          );
                        })}
                      </motion.div>

                      {/* Column 3: vendor / leaf list when a sub-item with children is hovered */}
                      <AnimatePresence initial={false}>
                        {activeSub?.children && (
                          <motion.div
                            key="thirdcol"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: THIRD_COL_WIDTH, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            onMouseEnter={() => setHoveredSubHref(activeSub.href)}
                            className="overflow-hidden border-l border-border-light bg-white"
                          >
                            <div style={{ width: THIRD_COL_WIDTH }} className="flex flex-col p-2">
                              <div className="mb-0.5 flex items-center gap-3.5 px-2.5 pt-1 pb-2">
                                <span className="h-px flex-1 bg-[#045891]/15" />
                                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#045891]">
                                  {SUB_COLUMN_TITLE_OVERRIDE[activeSub.name] ?? activeSub.name}
                                </p>
                                <span className="h-px flex-1 bg-[#045891]/15" />
                              </div>
                              <ul className="flex flex-col gap-0.5">
                                {activeSub.children.map((leaf) => {
                                  const leafHasKids = !!leaf.children;
                                  const isActiveLeaf = hoveredLeafHref === leaf.href;
                                  return (
                                    <li
                                      key={leaf.name}
                                      onMouseEnter={() => setHoveredLeafHref(leafHasKids ? leaf.href : null)}
                                    >
                                      <Link
                                        to={leaf.href}
                                        onClick={closeDropdown}
                                        onFocus={() => setHoveredLeafHref(leafHasKids ? leaf.href : null)}
                                        className={`group/leaf flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition-colors duration-200 ${
                                          isActiveLeaf ? "bg-[#045891]/5" : "hover:bg-[#045891]/5"
                                        }`}
                                      >
                                        {leaf.icon ? (
                                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white ring-1 ring-slate-200/80 transition-colors duration-200 group-hover/leaf:ring-[#045891]/30">
                                            <img src={leaf.icon} alt="" aria-hidden="true" className="max-h-3.5 max-w-3.5 object-contain" />
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

                      {/* Column 4: vendor detail pages when a leaf with children is hovered */}
                      <AnimatePresence initial={false}>
                        {activeLeaf?.children && (
                          <motion.div
                            key="fourthcol"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: FOURTH_COL_WIDTH, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            onMouseEnter={() => setHoveredLeafHref(activeLeaf.href)}
                            className="overflow-hidden border-l border-border-light bg-surface-secondary"
                          >
                            <div style={{ width: FOURTH_COL_WIDTH }} className="flex flex-col p-2">
                              <div className="mb-0.5 flex items-center gap-3.5 px-2.5 pt-1 pb-2">
                                <span className="h-px flex-1 bg-[#045891]/15" />
                                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#045891]">
                                  {SUB_COLUMN_TITLE_OVERRIDE[activeLeaf.name] ?? activeLeaf.name}
                                </p>
                                <span className="h-px flex-1 bg-[#045891]/15" />
                              </div>
                              <ul className="flex flex-col gap-0.5">
                                {activeLeaf.children.map((v) => (
                                  <li key={v.name}>
                                    <Link
                                      to={v.href}
                                      onClick={closeDropdown}
                                      className="group/v flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition-colors duration-200 hover:bg-white"
                                    >
                                      {v.icon ? (
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white ring-1 ring-slate-200/80 transition-colors duration-200 group-hover/v:ring-[#045891]/30">
                                          <img src={v.icon} alt="" aria-hidden="true" className="max-h-3.5 max-w-3.5 object-contain" />
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
              onClick={() => {
                trackEvent("cta_click", { location: "navbar_desktop", label: "get_started" });
                openContact();
              }}
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
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
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

      {/* ─── Mobile menu ───
          ALWAYS rendered (hidden with visibility / max-height, never
          display:none), so the mobile HTML also carries the real links to
          the service hubs and the 11 cybersecurity pillars. Levels 1-3 are
          always in the DOM; deeper vendor levels still mount on tap. */}
      <div
        id="mobile-menu"
        className={`overflow-hidden bg-white transition-[max-height,opacity,visibility] duration-300 lg:hidden ${mobileOpen
          ? "visible max-h-[calc(100dvh-4.5rem)] border-t border-border-light opacity-100 sm:max-h-[calc(100dvh-5rem)]"
          : "pointer-events-none invisible max-h-0 opacity-0"
          }`}
      >
        <div className="shell max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain py-5 sm:max-h-[calc(100dvh-5rem)] sm:py-6">
          <ul className="flex flex-col gap-1">
            {TOP_LINKS.map((link) => {
              const hasChildren = !!link.children;
              const mainOpen = openMain === link.href;
              return (
                <li key={link.label}>
                  <div className="flex items-center justify-between">
                    {hasChildren ? (
                      <button
                        type="button"
                        aria-expanded={mainOpen}
                        onClick={() => setOpenMain(mainOpen ? null : link.href)}
                        className={`flex flex-1 items-center justify-between rounded-xl px-4 py-3 text-left text-base font-medium transition-colors ${isActive(link.href)
                          ? "bg-[#045891]/8 text-[#045891]"
                          : "text-slate-600 hover:bg-surface-secondary hover:text-heading"
                          }`}
                      >
                        {link.label}
                        <ChevronDownIcon
                          className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${mainOpen ? "rotate-180" : "-rotate-90"}`}
                        />
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
                  </div>

                  {link.children && (
                    <ul className={`ml-4 flex flex-col gap-0.5 ${mainOpen ? "mt-1" : "invisible h-0 overflow-hidden"}`}>
                      {link.children.map((child) => {
                        const childOpen = openChild === child.href;
                        return (
                          <li key={child.name}>
                            <div className="flex items-center justify-between">
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
                              {child.children && (
                                <button
                                  type="button"
                                  onClick={() => setOpenChild(childOpen ? null : child.href)}
                                  className="p-2"
                                  aria-expanded={childOpen}
                                  aria-label={`Toggle ${child.name} submenu`}
                                >
                                  <ChevronDownIcon
                                    className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${childOpen ? "rotate-180" : "-rotate-90"}`}
                                  />
                                </button>
                              )}
                            </div>

                            {child.children && (
                              <ul className={`ml-4 flex flex-col gap-0.5 border-l border-gray-200 pl-3 ${childOpen ? "mt-1" : "invisible h-0 overflow-hidden"}`}>
                                {child.children.map((sub) => {
                                  const SubIcon = ICON_MAP[child.icon];
                                  const subHasKids = !!sub.children;
                                  return (
                                    <li key={sub.name}>
                                      <div className="flex items-center justify-between">
                                        <Link
                                          to={sub.href}
                                          onClick={() => setMobileOpen(false)}
                                          className={`flex flex-1 items-center gap-2 rounded-md px-3 py-2 text-xs transition ${isActive(sub.href)
                                            ? "text-[#045891] font-semibold"
                                            : "text-gray-500 hover:text-heading"
                                            }`}
                                        >
                                          {SubIcon && <SubIcon className="h-3 w-3 shrink-0 text-[#045891]" />}
                                          {sub.name}
                                        </Link>
                                        {subHasKids && (
                                          <button
                                            type="button"
                                            onClick={() => setOpenSub(openSub === sub.href ? null : sub.href)}
                                            className="p-2"
                                            aria-expanded={openSub === sub.href}
                                            aria-label={`Toggle ${sub.name} submenu`}
                                          >
                                            <ChevronDownIcon
                                              className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-300 ${openSub === sub.href ? "rotate-180" : "-rotate-90"}`}
                                            />
                                          </button>
                                        )}
                                      </div>
                                      {sub.children && openSub === sub.href && (
                                        <ul className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-gray-200 pl-3">
                                          {sub.children.map((leaf) => {
                                            const leafHasKids = !!leaf.children;
                                            return (
                                              <li key={leaf.name}>
                                                <div className="flex items-center justify-between">
                                                  <Link
                                                    to={leaf.href}
                                                    onClick={() => setMobileOpen(false)}
                                                    className={`flex-1 rounded-md px-3 py-1.5 text-xs transition ${isActive(leaf.href)
                                                      ? "text-[#045891] font-semibold"
                                                      : "text-gray-500 hover:text-heading"
                                                      }`}
                                                  >
                                                    {leaf.name}
                                                  </Link>
                                                  {leafHasKids && (
                                                    <button
                                                      type="button"
                                                      onClick={() => setOpenLeaf(openLeaf === leaf.href ? null : leaf.href)}
                                                      className="p-2"
                                                      aria-expanded={openLeaf === leaf.href}
                                                      aria-label={`Toggle ${leaf.name} submenu`}
                                                    >
                                                      <ChevronDownIcon
                                                        className={`h-3 w-3 text-gray-400 transition-transform duration-300 ${openLeaf === leaf.href ? "rotate-180" : "-rotate-90"}`}
                                                      />
                                                    </button>
                                                  )}
                                                </div>
                                                {leaf.children && openLeaf === leaf.href && (
                                                  <ul className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-gray-200 pl-3">
                                                    {leaf.children.map((v) => (
                                                      <li key={v.name}>
                                                        <Link
                                                          to={v.href}
                                                          onClick={() => setMobileOpen(false)}
                                                          className={`block rounded-md px-3 py-1.5 text-xs transition ${isActive(v.href)
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
                        );
                      })}
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
              onClick={() => {
                trackEvent("cta_click", { location: "navbar_mobile", label: "get_started" });
                setMobileOpen(false);
                openContact();
              }}
            >
              <span className="flex items-center justify-center rounded-[18px] bg-gradient-to-r from-[#045891] to-[#1B8AC7] py-3 text-sm font-semibold text-white w-full">
                Get Started
              </span>
            </StarBorder>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
