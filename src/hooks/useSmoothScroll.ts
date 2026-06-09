import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/lenis";

/**
 * Site-wide momentum/eased smooth scrolling via Lenis.
 *
 * Mounted once in Layout so the instance persists across route changes.
 * Respects prefers-reduced-motion: when the user asks for reduced motion
 * we skip Lenis entirely and fall back to the browser's native scroll
 * (CSS `scroll-behavior: smooth` still handles anchor jumps).
 *
 * Lenis drives the real window scroll position, so native scroll events,
 * window.scrollY, IntersectionObserver scroll-spy, and the blog reading
 * progress bar all keep working without changes. Anchor links (<a href="#">)
 * are handled by Lenis via the `anchors` option.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      // ease-out exponential — quick start, gentle settle
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: true,
    });
    setLenis(lenis);

    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenis(null);
    };
  }, []);
}
