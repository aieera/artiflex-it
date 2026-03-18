import { HeroSection } from "@/components/sections/HeroSection";
import StatsBar from "@/components/ui/StatsBar";
import VendorStrip from "@/components/ui/VendorStrip";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { CyberHighlightSection } from "@/components/sections/CyberHighlightSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { IndustriesPreviewSection } from "@/components/sections/IndustriesPreviewSection";
import { HomeFAQSection } from "@/components/sections/HomeFAQSection";
import { BlogPreviewSection } from "@/components/sections/BlogPreviewSection";
import { CTASection } from "@/components/sections/CTASection";


export default function HomePage() {
  return (
    <>
      <HeroSection />

    

      <VendorStrip />

      <ServicesSection />

      <CyberHighlightSection />

      <WhyChooseUsSection />

      <IndustriesPreviewSection />

      <HomeFAQSection />

      <BlogPreviewSection />

      <CTASection
        title="Ready to Secure Your Business?"
        description="Get a free cybersecurity risk assessment and discover how ArtiflexIT can protect your operations, data, and reputation — starting today."
        primaryButton={{ text: "Schedule Security Audit", action: "modal" }}
        secondaryButton={{ text: "Explore Services", href: "/services" }}
      />
    </>
  );
}
