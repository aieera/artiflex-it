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

/**
 * After a smooth scroll lands, content above the target can still shift
 * (late images, fonts, mounted sections), leaving the heading tucked under
 * the fixed navbar. Re-align once, instantly, unless the user has started
 * scrolling themselves in the meantime.
 */
function settleOnTarget(el: Element, offset: number) {
  let userScrolled = false;
  const markUser = () => {
    userScrolled = true;
  };
  const userEvents: (keyof WindowEventMap)[] = ["wheel", "touchstart", "keydown"];
  userEvents.forEach((e) => window.addEventListener(e, markUser, { passive: true, once: true }));

  return () => {
    userEvents.forEach((e) => window.removeEventListener(e, markUser));
    if (userScrolled || !el.isConnected) return;
    const margin = Number.parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    const drift = el.getBoundingClientRect().top - margin - offset;
    if (Math.abs(drift) < 4) return;
    if (instance) {
      instance.resize();
      instance.scrollTo(el as HTMLElement, { offset, immediate: true });
    } else {
      el.scrollIntoView({ behavior: "instant", block: "start" });
    }
  };
}

/** Smoothly scroll to an element — via Lenis when active, else native. */
export function scrollToElement(el: Element, offset = 0) {
  const settle = settleOnTarget(el, offset);
  if (instance) {
    // Lenis caches the page height and clamps every scrollTo() to that
    // cached limit. Right after a route change the cache still holds the
    // PREVIOUS page's height, so a cross-page "#section" link stopped
    // short (e.g. landing 2,000px above the vendor matrix). Re-measure
    // first so the clamp uses the page that is actually on screen.
    instance.resize();
    instance.scrollTo(el as HTMLElement, { offset, onComplete: settle });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // Settle only once the native smooth scroll has actually finished.
    // A fixed timer could fire mid-animation and fight it (Lenis also
    // boots on the first scroll event, so both would then drive the
    // scroll at once). `scrollend` is the reliable signal; the timeout
    // covers browsers without it and the no-movement case.
    let settled = false;
    const fire = () => {
      if (settled) return;
      settled = true;
      window.removeEventListener("scrollend", fire);
      window.clearTimeout(timer);
      settle();
    };
    const timer = window.setTimeout(fire, 1500);
    if ("onscrollend" in window) {
      window.addEventListener("scrollend", fire, { once: true });
    }
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
