/**
 * analytics.ts
 * ---------------------------------------------------------------
 * Thin, safe wrapper around window.gtag for firing GA4 events.
 *
 * Why this exists:
 *   index.html loads gtag.js AFTER first user interaction or 4 s idle
 *   (see the analytics IIFE in index.html). That means window.gtag is
 *   undefined for the first few seconds of the visit. Calling gtag()
 *   directly during that window throws "gtag is not a function" and
 *   breaks button click handlers.
 *
 *   This wrapper:
 *     1. Queues events into window.dataLayer if gtag has not loaded yet
 *        (GA4 replays the queue on initialisation, so nothing is lost).
 *     2. No-ops silently in SSR / prerender (typeof window === undefined).
 *     3. Type-safe params object so callers cannot pass random nonsense.
 *
 * Usage:
 *   import { trackEvent } from "@/lib/analytics";
 *   trackEvent("cta_click", { location: "hero", label: "discuss_requirements" });
 * ---------------------------------------------------------------
 */

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

export type EventName =
  | "cta_click"
  | "phone_click"
  | "email_click"
  | "whatsapp_click"
  | "contact_form_submit"
  | "contact_form_start";

export interface EventParams {
  /** Where on the page the action happened (hero, navbar, footer, modal). */
  location?: string;
  /** Short label describing the specific button or link. */
  label?: string;
  /** Optional page path, useful for cross-page debugging. */
  page_path?: string;
  /** Any extra string params, kept loose so each caller can add context. */
  [key: string]: string | number | boolean | undefined;
}

/**
 * Fire a GA4 event. Safe to call before gtag.js has finished loading,
 * safe to call during SSR / prerender (no-ops in both cases).
 */
export function trackEvent(name: EventName, params: EventParams = {}): void {
  if (typeof window === "undefined") return;

  // Add page_path automatically so reports always know which page the
  // click happened on, even if the user hasn't navigated yet.
  const enriched: EventParams = {
    page_path: window.location.pathname,
    ...params,
  };

  // If gtag is loaded, call it directly.
  if (typeof window.gtag === "function") {
    window.gtag("event", name, enriched);
    return;
  }

  // Otherwise, push into the dataLayer queue. GA4 picks this up when
  // gtag.js finishes initialising. The "event" key tells GTM-style
  // parsers what kind of payload this is.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...enriched });
}
