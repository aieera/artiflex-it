import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Button from "@/components/ui/Button";
import ShinyText from "@/components/ui/ShinyText";
import { ArrowRightIcon } from "@/components/icons";

const LightRays = lazy(() => import("@/components/ui/LightRays"));

/**
 * 404 Not Found page.
 *
 * Reuses the site's navy hero language (LightRays background + overlay,
 * ShinyText accent, brand-blue/cyan) so a missing page still feels like
 * part of the site. Follows empty-state UX: a clear explanation plus
 * real recovery paths (primary "Back to Home" CTA + popular links).
 * Marked noindex so search engines don't index error URLs.
 */

const POPULAR_LINKS = [
  { label: "Cybersecurity", href: "/cybersecurity" },
  { label: "Cloud Solutions", href: "/cloud-solutions" },
  { label: "Infrastructure", href: "/infrastructure" },
  { label: "Managed Services", href: "/managed-services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="Page Not Found | Artiflex IT"
        description="The page you are looking for could not be found. Explore our cybersecurity, cloud, and IT services instead."
        path="/404"
        noindex
      />

      <section className="relative flex min-h-dvh items-center overflow-hidden bg-gradient-to-b from-navy-deep via-navy to-navy-light">
        {/* Background, matches the site hero */}
        <Suspense fallback={null}>
          <LightRays
            raysOrigin="top-center"
            raysColor="#1B8AC7"
            raysSpeed={0.8}
            lightSpread={1.2}
            rayLength={2}
            fadeDistance={1}
            saturation={1}
            followMouse={true}
            mouseInfluence={0.15}
            distortion={0.3}
          />
        </Suspense>
        <div
          className="absolute inset-0 z-[3] bg-gradient-to-b from-navy-deep/30 via-navy-deep/15 to-navy-deep/50 pointer-events-none"
          aria-hidden="true"
        />

        {/* Content */}
        <div className="shell relative z-10 w-full py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            {/* Eyebrow */}
            <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-brand-cyan">
              Error 404
            </p>

            {/* Big code */}
            <h1 className="mt-4 font-display text-[5rem] font-bold leading-none tracking-tight sm:text-[8rem] md:text-[10rem]">
              <ShinyText
                text="404"
                speed={3}
                color="#1B8AC7"
                shineColor="#28B5E1"
                spread={120}
                className="font-display"
              />
            </h1>

            {/* Message */}
            <h2 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              This page could not be found
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-300 sm:text-base md:text-lg">
              The page you are looking for may have been moved, renamed, or no
              longer exists. Let us point you back in the right direction.
            </p>

            {/* Primary action */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button href="/" variant="gradient" size="lg" arrow>
                Back to Home
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 hover:border-white/40">
                Talk to our Consultant
              </Button>
            </div>

            {/* Popular destinations, real recovery paths */}
            <div className="mt-12 border-t border-white/[0.08] pt-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Popular pages
              </p>
              <nav aria-label="Popular pages" className="mt-4">
                <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5">
                  {POPULAR_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="group inline-flex items-center gap-1 text-sm text-slate-300 transition-colors duration-200 hover:text-brand-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50 rounded"
                      >
                        {link.label}
                        <ArrowRightIcon className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
