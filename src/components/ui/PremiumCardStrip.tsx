import { useState } from "react";

interface Item {
  title: string;
  desc: string;
  image: string;
}

export default function PremiumCardStrip({ items }: { items: Item[] }) {
  const [active, setActive] = useState(2);

  return (
    <div className="relative w-full py-16">

      {/* 🔹 MOBILE: Horizontal scroll */}
      <div className="flex md:hidden gap-4 overflow-x-auto px-2 pb-4 no-scrollbar">
        {items.map((item, index) => (
          <div
            key={index}
            className="min-w-[220px] bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-white/10 rounded-2xl p-4"
          >
            <div className="h-32 w-full rounded-lg overflow-hidden mb-3">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-white text-sm font-semibold">
              {item.title}
            </h3>

            <p className="text-white/60 text-xs mt-2">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* 🔹 DESKTOP: Interactive strip */}
      <div className="hidden md:flex justify-center items-center gap-6 transition-all duration-500 max-w-5xl mx-auto">

        {items.map((item, index) => {
          const isActive = index === active;

          return (
            <div
              key={index}
              onMouseEnter={() => setActive(index)}
              className={`relative transition-all duration-500 cursor-pointer
              ${isActive ? "scale-110 z-10" : "scale-90 opacity-40"}
              `}
            >
              <div className="w-[240px] h-[360px] rounded-3xl bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-white/10 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">

                {/* IMAGE */}
                <div className="h-40 w-full rounded-xl overflow-hidden mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CONTENT */}
                <h3 className="text-white font-semibold text-sm">
                  {item.title}
                </h3>

                <p className="text-white/60 text-xs mt-2 leading-relaxed">
                  {item.desc}
                </p>

                {/* glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 bg-gradient-to-br from-brand-blue/20 to-transparent blur-xl transition" />
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}