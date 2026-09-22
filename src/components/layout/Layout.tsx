import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ContactModalProvider } from "./ContactModal";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useLinkedInRouteTracker } from "@/hooks/useLinkedInRouteTracker";

function ScrollToTop() {
  useScrollToTop();
  return null;
}

/**
 * Fires a LinkedIn Insight Tag pageview on every SPA route change so
 * internal navigations are tracked the same as initial loads. Lives
 * here so the hook runs once per route inside Router context.
 */
function LinkedInRouteTracker() {
  useLinkedInRouteTracker();
  return null;
}

export default function Layout() {
  useSmoothScroll();

  return (
    <ContactModalProvider>
      <ScrollToTop />
      <LinkedInRouteTracker />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-blue focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-[0_8px_24px_rgba(27,138,199,0.35)]"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </ContactModalProvider>
  );
}
