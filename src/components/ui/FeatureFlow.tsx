import React from "react";

interface Item {
  title: string;
  desc: string;
}

interface Props {
  items: Item[];
}

export default function FeatureScroll({ items }: Props) {
  return (
    <div className="relative mt-16">

      <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">

        {items.map((item) => (
          <div
            key={item.title}
            className="min-w-[280px] max-w-[280px] group"
          >
            <div className="h-full p-6 border border-gray-200 bg-white rounded-2xl transition duration-300 hover:shadow-xl hover:-translate-y-1">

              {/* Small top accent */}
              <div className="w-8 h-[2px] bg-gradient-to-r from-[#045891] to-[#1B8AC7] mb-4 group-hover:w-12 transition-all duration-300" />

              <h3 className="text-base font-semibold text-gray-900">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                {item.desc}
              </p>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}