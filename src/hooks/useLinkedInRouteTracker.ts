import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * useLinkedInRouteTracker
 * ---------------------------------------------------------------
 * Fires a SPA pageview on every React Router pathname change.
 *
 * Two beacons per route change:
 *
 *   1. window.dataLayer.push({ event: "spa_pageview", page_path: "/..." })
 *      → GTM (container GTM-KHTPMKJ8) picks this up. Any tag inside
 *        GTM configured with the "Custom Event = spa_pageview" trigger
 *        will fire: GA4 page_view, LinkedIn Insight, Meta Pixel, etc.
 *      → This is the future-proof path: any new marketing tag added
 *        in the GTM UI automatically gets SPA tracking for free.
 *
 *   2. window.lintrk("track")
 *      → Fallback for the LinkedIn Insight Tag while it is still
 *        installed inline in index.html (during the GTM migration).
 *        Once LinkedIn is fully migrated into GTM, this call becomes
 *        a no-op (window.lintrk will not exist) and is safe to remove.
 *
 * Why this hook exists:
 *   Marketing tags installed in <head> only fire a pageview on the
 *   initial HTML load. Because artiflexit.com is a React Router SPA,
 *   subsequent route changes do NOT reload the page, so without this
 *   hook every tag would report only one pageview per session and miss
 *   every internal navigation. That breaks:
 *     - Retargeting (entry-page-only audiences)
 *     - Conversion attribution (assigned to entry route, not action route)
 *     - Funnel reports
 *
 * Safe during prerender / SSR (typeof window check) and safe if a tag
 * has not finished loading yet (dataLayer + lintrk.q both queue calls
 * and replay them when the underlying script finishes initialising).
 */
declare global {
  interface Window {
    lintrk?: ((action: string, params?: Record<string, unknown>) => void) & {
      q?: unknown[];
    };
    dataLayer?: unknown[];
  }
}

export function useLinkedInRouteTracker(): void {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const page_path = pathname + search;
    const page_location = window.location.origin + page_path;

    // 1. GTM dataLayer push (preferred path, works for ALL tags in GTM)
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "spa_pageview",
        page_path,
        page_location,
        page_title: document.title,
      });
    } catch {
      // analytics must never block route rendering.
    }

    // 2. LinkedIn Insight Tag direct call (transitional, while inline)
    if (typeof window.lintrk === "function") {
      try { window.lintrk("track"); } catch { /* noop */ }
    }
  }, [pathname, search]);
}
