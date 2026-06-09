import type Lenis from "lenis";

/**
 * Module-level handle to the single Lenis instance created in Layout
 * (see useSmoothScroll). Components that need to drive the scroll
 * position — route changes, "scroll to section" buttons — go through
 * the helpers below so they work whether Lenis is active (momentum
 * scrolling) or not (reduced-motion / no-JS, native fallback).
 */
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function getLenis(): Lenis | null {
  return instance;
}

/** Smoothly scroll to an element — via Lenis when active, else native. */
export function scrollToElement(el: Element, offset = 0) {
  if (instance) {
    instance.scrollTo(el as HTMLElement, { offset });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/** Jump to the top instantly — used on route change. */
export function scrollToTopInstant() {
  if (instance) {
    instance.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo(0, 0);
  }
}
