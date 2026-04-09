import React from "react";

interface Item {
  icon?: React.ElementType;
  title: string;
  desc: string;
}

interface Props {
  items: Item[];
  columns?: string; // control grid externally
  className?: string; // allow parent styling
}

export default function PremiumCardGrid({
  items,
  columns = "md:grid-cols-2 lg:grid-cols-4",
  className = "",
}: Props) {
  return (
    <div className={`relative ${className}`}>

      {/* 🌌 Optional Background (can remove if needed) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,138,199,0.12),transparent_60%)] pointer-events-none" />

      <div className={`relative grid gap-8 ${columns}`}>
        {items.map((item) => (
          <div
            key={item.title}
            className="group relative p-[1px] rounded-2xl bg-gradient-to-br from-[#1B8AC7]/40 via-transparent to-[#045891]/40 hover:from-[#1B8AC7] hover:to-[#045891] transition-all duration-500"
          >
            <div className="relative h-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(27,138,199,0.25)]">

              {/* Icon */}
              {item.icon && (
                <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#1B8AC7] to-[#045891] shadow-lg shadow-[#1B8AC7]/30">
                  <item.icon className="text-white w-6 h-6" />
                </div>
              )}

              {/* Title */}
              <h3 className="text-white font-semibold text-lg mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed">
                {item.desc}
              </p>

              {/* Hover line */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#1B8AC7] to-[#045891] group-hover:w-full transition-all duration-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}