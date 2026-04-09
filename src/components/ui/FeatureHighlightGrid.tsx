import React from "react";

interface Item {
  title: string;
  desc: string;
  image: string;
}

export default function FeatureHighlightGrid({ items }: { items: Item[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-16">

      {items.map((item, index) => (
        <div
          key={index}
          className="group relative h-[260px] overflow-hidden border border-white/10 bg-[#0b0b0b]"
        >
          {/* IMAGE */}
          <img
            src={item.image}
            className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/60" />

          {/* CONTENT */}
          <div className="absolute bottom-0 p-6 text-white">
            <h3 className="text-lg font-semibold">
              {item.title}
            </h3>

            <p className="text-sm text-white/70 mt-2 max-w-sm">
              {item.desc}
            </p>
          </div>

          {/* subtle hover line */}
          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#1B8AC7] to-[#045891] group-hover:w-full transition-all duration-500" />
        </div>
      ))}

    </div>
  );
}