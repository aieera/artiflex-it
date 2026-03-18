import { useState } from "react";
import { PARTNER_LOGOS, CLIENT_LOGOS } from "@/lib/constants";

function LogoItem({ name, src }: { name: string; src: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="font-display text-base font-semibold text-slate-400 transition-colors duration-300 hover:text-brand-blue sm:text-lg">
        {name}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      className="h-8 w-auto max-w-[120px] object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-10 sm:max-w-[140px]"
      loading="lazy"
    />
  );
}

function LogoRow({
  logos,
  reverse = false,
}: {
  logos: ReadonlyArray<{ name: string; src: string }>;
  reverse?: boolean;
}) {
  const items = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent sm:w-32" />

      <div
        className={`group flex items-center ${
          reverse ? "animate-vendor-scroll-reverse" : "animate-vendor-scroll"
        } hover:[animation-play-state:paused]`}
      >
        {items.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="mx-6 flex shrink-0 items-center justify-center sm:mx-10"
          >
            <LogoItem name={logo.name} src={logo.src} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function VendorStrip() {
  return (
    <section className="border-b border-border-light bg-white py-8 sm:py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.2em] text-muted">
          Trusted by leading enterprises &middot; Partnered with global vendors
        </p>
      </div>

      <div className="mb-6">
        <LogoRow logos={PARTNER_LOGOS} />
      </div>

      <div>
        <LogoRow logos={CLIENT_LOGOS} reverse />
      </div>
    </section>
  );
}
