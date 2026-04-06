import { lazy, Suspense, useState, useEffect } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { CheckIcon } from "@/components/icons";

const CardSwap = lazy(() => import("@/components/ui/CardSwap"));
const CardSwapCard = lazy(() =>
  import("@/components/ui/CardSwap").then((m) => ({ default: m.Card }))
);

const industries = [
  {
    title: "Healthcare & Life Sciences",
    stat: "2x",
    statLabel: "higher breach cost vs. other sectors",
    description:
      "Patient records sell for $250 each on the dark web — making healthcare the #1 targeted industry globally. We protect clinical systems, EHR platforms, and connected medical devices under ADHICS and DHA compliance frameworks.",
    features: [
      "ADHICS & DHA compliance",
      "Medical IoT segmentation",
      "24/7 EHR monitoring",
      "Incident response planning",
    ],
    image: "/images/healthcare.jpg",
  },
  {
    title: "Finance & Banking",
    stat: "$5.9M",
    statLabel: "average cost per breach",
    description:
      "Financial institutions face 300x more cyberattacks than any other sector. We secure transactions, protect customer data, and ensure full compliance with CBUAE regulations through zero-trust architecture and real-time threat intelligence.",
    features: [
      "Zero-trust architecture",
      "PCI-DSS & CBUAE compliance",
      "Privileged access management",
      "Transaction fraud detection",
    ],
    image: "/images/finance.jpg",
  },
  {
    title: "Logistics & Supply Chain",
    stat: "742%",
    statLabel: "increase in attacks since 2020",
    description:
      "Supply chain attacks exploit trusted vendor relationships to compromise entire networks. We deploy multi-site security, protect partner API integrations, and manage IoT/OT devices across warehouses, ports, and distribution centers.",
    features: [
      "Multi-site Sophos deployment",
      "API gateway protection",
      "IoT & OT device security",
      "Vendor risk management",
    ],
    image: "/images/logistics.jpg",
  },
  {
    title: "Small & Medium Enterprises",
    stat: "60%",
    statLabel: "of SMEs close within 6 months of a breach",
    description:
      "43% of all cyberattacks target small businesses, yet most lack dedicated security teams. We deliver enterprise-grade managed SOC, endpoint protection, and employee training — at pricing built for growing companies.",
    features: [
      "Managed SOC — no team needed",
      "Employee security awareness",
      "Predictable monthly pricing",
      "Sophos Site-in-a-Box",
    ],
    image: "/images/sme.jpg",
  },
];

function useResponsiveCardConfig() {
  const [config, setConfig] = useState({ width: 580, height: 400, cardDistance: 50, verticalDistance: 60 });

  useEffect(() => {
    function update() {
      const vw = window.innerWidth;
      if (vw < 400) {
        setConfig({ width: vw - 48, height: 420, cardDistance: 12, verticalDistance: 16 });
      } else if (vw < 640) {
        setConfig({ width: vw - 48, height: 440, cardDistance: 16, verticalDistance: 20 });
      } else if (vw < 768) {
        setConfig({ width: 500, height: 420, cardDistance: 30, verticalDistance: 40 });
      } else {
        setConfig({ width: 580, height: 400, cardDistance: 50, verticalDistance: 60 });
      }
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return config;
}

export function IndustriesPreviewSection() {
  const cardConfig = useResponsiveCardConfig();

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/code-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/85" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Industries We Protect"
          title="Specialized Security for Every Sector"
          description="Tailored cybersecurity and IT solutions built for the regulatory and operational demands of your industry."
          centered
          dark
        />

        {/* CardSwap — large, centered */}
        <div className="flex items-center justify-center min-h-[500px] sm:min-h-[520px] lg:min-h-[620px]">
          <Suspense fallback={null}>
            <CardSwap
              width={cardConfig.width}
              height={cardConfig.height}
              cardDistance={cardConfig.cardDistance}
              verticalDistance={cardConfig.verticalDistance}
              delay={3000}
              pauseOnHover
              skewAmount={3}
              easing="elastic"
            >
              {industries.map((industry) => (
                <CardSwapCard
                  key={industry.title}
                  customClass="overflow-hidden !bg-black !border-white/10"
                >
                  {/* Background image */}
                  <img
                    src={industry.image}
                    alt={industry.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-35"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/20" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-7 md:p-8">
                    {/* Stat badge */}
                    <div className="mb-2 sm:mb-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#045891]/50 border border-[#28B5E1]/30 px-3 py-1 text-xs font-bold text-[#28B5E1] backdrop-blur-sm">
                        {industry.stat}
                        <span className="text-[10px] font-normal text-white/60">
                          {industry.statLabel}
                        </span>
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="font-display text-xl font-bold text-white mb-2 sm:text-2xl md:text-3xl">
                      {industry.title}
                    </h4>

                    {/* Description */}
                    <p className="text-xs text-slate-300 leading-relaxed mb-3 sm:mb-4 max-w-lg sm:text-sm line-clamp-4 sm:line-clamp-none">
                      {industry.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {industry.features.map((f) => (
                        <span
                          key={f}
                          className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 px-2.5 py-1 text-[10px] sm:text-[11px] font-medium text-white/90 sm:px-3"
                        >
                          <CheckIcon className="h-3 w-3 text-[#28B5E1] shrink-0" />
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardSwapCard>
              ))}
            </CardSwap>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
