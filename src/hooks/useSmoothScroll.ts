import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/lenis";

/**
 * Site-wide momentum/eased smooth scrolling via Lenis.
 *
 * Mounted once in Layout so the instance persists across route changes.
 *
 * Behaviour by device:
 *   - Desktop (no coarse pointer, no reduced-motion) → Lenis runs and
 *     gives the wheel/scroll the eased momentum feel.
 *   - Touch devices (coarse pointer: phones, tablets) → Lenis is NOT
 *     started. iOS Safari and Android Chrome already provide great
 *     native momentum scrolling; layering Lenis on top fought with the
 *     native scroller and produced the visible scroll glitch / jitter
 *     users saw on mobile.
 *   - prefers-reduced-motion → skip Lenis entirely (accessibility).
 *
 * Lenis drives the real window scroll position when it runs, so native
 * scroll events, window.scrollY, IntersectionObserver scroll-spy, and
 * the blog reading progress bar all keep working without changes. On
 * touch devices the native scroller drives everything, which all those
 * APIs also support transparently.
 *
 * Anchor links (<a href="#">) are handled by Lenis via the `anchors`
 * option on desktop; on touch devices native scroll handles them with
 * CSS `scroll-behavior: smooth` set on the <html> element.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    // Touch-first devices: phones, most tablets. Coarse pointer is the
    // standard signal. Skip Lenis here so native momentum scrolling is
    // not fought by an animation-frame loop trying to ease the scroll
    // position, which was the cause of the visible scroll glitch.
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    // INTERACTION GATE (2026-07-16): Lenis used to start at boot, which
    // put its init (layout reads) plus a permanent requestAnimationFrame
    // loop into the page-load window. The rAF loop reads scroll/layout
    // every frame, so the main thread never went quiet during a
    // Lighthouse trace ("Forced reflow" flag, longer TTI). There is
    // nothing to smooth before the user's first interaction, the whole
    // point of Lenis is easing USER scrolling, so it now boots on the
    // first pointer/scroll/key signal instead. The first wheel tick
    // still gets eased: Lenis initialises within the same frame.
    let lenis: Lenis | null = null;
    let rafId = 0;
    let started = false;
    const events: (keyof WindowEventMap)[] = [
      "pointermove",
      "pointerdown",
      "wheel",
      "scroll",
      "touchstart",
      "keydown",
    ];
    const removeListeners = () => {
      events.forEach((e) => window.removeEventListener(e, start));
    };

    function start() {
      if (started) return;
      started = true;
      removeListeners();

      lenis = new Lenis({
        // Slightly snappier than before (was 1.1) so the eased scroll
        // settles faster, reducing the perception of "drag" on mid-range
        // laptops.
        duration: 0.9,
        // ease-out exponential — quick start, gentle settle
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        anchors: true,
      });
      setLenis(lenis);

      rafId = requestAnimationFrame(function raf(time) {
        lenis!.raf(time);
        rafId = requestAnimationFrame(raf);
      });
    }

    events.forEach((e) => window.addEventListener(e, start, { passive: true }));

    return () => {
      removeListeners();
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) {
        lenis.destroy();
        setLenis(null);
      }
    };
  }, []);
}
