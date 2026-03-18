import React, { useEffect, useRef, useState, useCallback } from "react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

interface StatsBarProps {
  stats: readonly StatItem[] | StatItem[];
}

function AnimatedNumber({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const isDecimal = value % 1 !== 0;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;

      setDisplay(isDecimal ? parseFloat(current.toFixed(1)) : Math.round(current));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span className="font-display text-2xl font-bold text-white sm:text-4xl md:text-5xl">
      {display}
      <span className="text-brand-blue">{suffix}</span>
    </span>
  );
}

export default function StatsBar({ stats }: StatsBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        setInView(true);
      }
    },
    []
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.3,
    });
    observer.observe(node);

    return () => observer.disconnect();
  }, [handleIntersect]);

  return (
    <div className="mx-auto max-w-7xl px-4 -mt-12 relative z-20 sm:px-6 sm:-mt-16">
      <div
        ref={ref}
        className="rounded-2xl bg-navy-deep border border-white/[0.08] shadow-2xl shadow-black/20 px-4 py-8 sm:px-8 sm:py-10 md:px-12"
      >
        <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center"
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={inView} />
              <span className="mt-2 text-sm text-slate-400 font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
