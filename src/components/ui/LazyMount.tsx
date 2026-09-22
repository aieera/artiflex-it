import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * LazyMount
 * ---------------------------------------------------------------
 * Renders a fixed-height placeholder until BOTH:
 *   1. the user has interacted with the page at least once
 *      (mouse move, scroll, touch, key), AND
 *   2. the section has scrolled to within `rootMargin` of the viewport.
 *
 * Why the interaction gate exists (added 2026-07-16):
 *   Proximity alone was not enough. The hero is 100svh tall, so the
 *   first below-fold sections (VendorStrip, ServicesSection) sit right
 *   at the viewport edge and mounted immediately on load, executing
 *   ~600ms of scripting inside the Lighthouse trace even though they
 *   were INVISIBLE to the visitor. Nothing below the hero can be seen
 *   without scrolling, and scrolling is an interaction, so gating the
 *   mount on first interaction costs users nothing: by the time they
 *   scroll 900px the section has long since mounted.
 *
 * Why the bot fast-path exists:
 *   Googlebot renders pages WITHOUT interacting, using a very tall
 *   viewport. Without the fast-path it would see placeholders instead
 *   of content in the rendered DOM. Known crawlers therefore mount
 *   everything immediately. The list deliberately does NOT match
 *   Lighthouse (a lab tool measuring the human experience) and DOES
 *   match our own prerenderer ("ArtiflexPrerender") as a safety net on
 *   top of the auto-scroll in scripts/prerender.mjs.
 *
 * SEO note:
 *   scripts/prerender.mjs auto-scrolls each page before snapshotting,
 *   so the static HTML shipped to every visitor and crawler contains
 *   the FULL page content regardless of this component. Do not remove
 *   that scroll step.
 */

const BOT_RE = /bot|crawl|spider|slurp|bingpreview|prerender|headless/i;

function isBotUA(): boolean {
  return typeof navigator !== "undefined" && BOT_RE.test(navigator.userAgent);
}

/** Module-level singleton: has the user interacted yet? */
let interacted = false;
const interactionWaiters = new Set<() => void>();
const INTERACTION_EVENTS: (keyof WindowEventMap)[] = [
  "pointermove",
  "pointerdown",
  "scroll",
  "wheel",
  "touchstart",
  "keydown",
];

function onFirstInteraction() {
  interacted = true;
  INTERACTION_EVENTS.forEach((e) => window.removeEventListener(e, onFirstInteraction));
  interactionWaiters.forEach((fn) => fn());
  interactionWaiters.clear();
}

if (typeof window !== "undefined") {
  INTERACTION_EVENTS.forEach((e) =>
    window.addEventListener(e, onFirstInteraction, { passive: true }),
  );
}

type LazyMountProps = {
  children: ReactNode;
  /** Placeholder height while unmounted. Match the real section. */
  minHeight?: string;
  /** Placeholder background class. Match the section's bg. */
  bg?: string;
  /** How far ahead of the viewport to mount once interaction happened. */
  rootMargin?: string;
};

export default function LazyMount({
  children,
  minHeight = "400px",
  bg = "bg-white",
  rootMargin = "900px 0px",
}: LazyMountProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(isBotUA);
  const [ready, setReady] = useState(() => interacted || isBotUA());

  // Stage 1: wait for first interaction (humans only).
  useEffect(() => {
    if (ready) return;
    if (interacted) {
      setReady(true);
      return;
    }
    const fn = () => setReady(true);
    interactionWaiters.add(fn);
    return () => {
      interactionWaiters.delete(fn);
    };
  }, [ready]);

  // Stage 2: after interaction, mount when near the viewport.
  useEffect(() => {
    if (!ready || show) return;
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ready, show, rootMargin]);

  if (show) return <>{children}</>;
  return <div ref={ref} style={{ minHeight }} className={bg} aria-hidden="true" />;
}
