/**
 * Per-page Open Graph image URL.
 *
 * scripts/generate-og-pages.mjs renders one 1200×630 JPEG per sitemap route
 * into public/og/pages/<route-slug>.jpg, where the slug is the route path
 * with the slashes turned into dashes ("/" itself becomes "home"). This
 * helper produces the matching URL for a page's canonical URL so dynamic
 * templates (vendor detail pages) point at the right file without a lookup
 * table. Keep the slug rule in sync with routeToSlug() in that script.
 *
 *   ogImageForUrl("https://artiflexit.com/cybersecurity/iam/okta")
 *   → "https://artiflexit.com/og/pages/cybersecurity-iam-okta.jpg"
 */
const SITE = "https://artiflexit.com";

export function ogImageForUrl(pageUrl: string): string {
  const path = pageUrl.replace(/^https?:\/\/[^/]+/, "").split(/[?#]/)[0].replace(/^\/+|\/+$/g, "");
  const slug = path ? path.replace(/\//g, "-") : "home";
  return `${SITE}/og/pages/${slug}.jpg`;
}
