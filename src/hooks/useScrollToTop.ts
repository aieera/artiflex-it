import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToElement, scrollToTopInstant } from "@/lib/lenis";

export function useScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      // Wait one frame so the destination section is mounted before we scroll.
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          scrollToElement(el);
        } else {
          scrollToTopInstant();
        }
      });
      return;
    }
    scrollToTopInstant();
  }, [pathname, hash]);
}
