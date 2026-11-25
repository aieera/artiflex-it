import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToElement, scrollToTopInstant } from "@/lib/lenis";

export function useScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      // Every route is lazy-loaded, so the destination section may not be
      // in the DOM yet on a direct load or a cross-page "#section" link.
      // Poll each frame (up to ~3s) until it mounts, then scroll to it.
      const deadline = performance.now() + 3000;
      let raf = 0;
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          scrollToElement(el);
          return;
        }
        if (performance.now() < deadline) {
          raf = requestAnimationFrame(tryScroll);
        } else {
          scrollToTopInstant();
        }
      };
      raf = requestAnimationFrame(tryScroll);
      return () => cancelAnimationFrame(raf);
    }
    scrollToTopInstant();
  }, [pathname, hash]);
}
