import React, { lazy, Suspense, useRef } from "react";
import { Link } from "react-router-dom";
import VariableProximity from "@/components/ui/VariableProximity";

const LightRays = lazy(() => import("@/components/ui/LightRays"));
const GradientBlinds = lazy(() => import("@/components/ui/GradientBlinds"));

interface Breadcrumb {
  label: string;
  href: string;
}

interface PageHeroProps {
  title: string | React.ReactNode;
  description: string;
  breadcrumbs: Breadcrumb[];
  background?: "lightrays" | "gradient-blinds";
}

/** Extract plain text from ReactNode for the variable proximity effect */
function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (React.isValidElement(node)) {
    const children = (node.props as { children?: React.ReactNode }).children;
    return extractText(children);
  }
  return "";
}

export default function PageHero({
  title,
  description,
  breadcrumbs,
  background = "lightrays",
}: PageHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const plainTitle = extractText(title);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-navy-deep via-navy to-navy-light"
    >
      {/* Background effect */}
      <Suspense fallback={null}>
        {background === "lightrays" ? (
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
        ) : (
          <GradientBlinds
            gradientColors={["#04101E", "#0A3D6B", "#1B8AC7", "#28B5E1"]}
            angle={135}
            noise={0.2}
            blindCount={14}
            blindMinWidth={50}
            spotlightRadius={0.6}
            spotlightSoftness={1.2}
            spotlightOpacity={0.6}
          />
        )}
      </Suspense>

      {/* Overlay */}
      <div
        className="absolute inset-0 z-[3] bg-gradient-to-b from-navy-deep/30 via-navy-deep/15 to-navy-deep/50 pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-5 pt-24 pb-12 sm:px-6 sm:py-40 md:py-44 lg:py-48 w-full">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-400 sm:text-sm">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.href} className="flex items-center gap-2">
                {index > 0 && <span className="text-slate-600">/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-brand-cyan font-medium">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    to={crumb.href}
                    className="transition-colors hover:text-white"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Title with VariableProximity effect */}
        <h1 className="font-display text-[1.75rem] font-bold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl">
          <VariableProximity
            label={plainTitle}
            fromFontVariationSettings="'wght' 400"
            toFontVariationSettings="'wght' 900"
            containerRef={containerRef}
            radius={150}
            falloff="gaussian"
            className="text-white"
            style={{
              fontFamily: "'Roboto Flex', 'Space Grotesk', sans-serif",
            }}
          />
        </h1>

        {/* Subtitle */}
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:mt-6 sm:text-base md:text-lg lg:text-xl">
          {description}
        </p>
      </div>
    </section>
  );
}
