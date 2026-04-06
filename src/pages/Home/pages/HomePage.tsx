import { HeroSection } from "@/pages/Home/sections/HeroSection";
import VendorStrip from "@/components/ui/VendorStrip";
import ClientStrip from "@/components/ui/ClientStrip";
import { ServicesSection } from "@/pages/Services/sections/ServicesSection";
import { WhyChooseUsSection } from "@/pages/Home/sections/WhyChooseUsSection";
import { IndustriesPreviewSection } from "@/pages/Home/sections/IndustriesPreviewSection";
import { HomeFAQSection } from "@/pages/Home/sections/HomeFAQSection";
import { BlogPreviewSection } from "@/pages/Home/sections/BlogPreviewSection";
import { TestimonialsSection } from "@/pages/Home/sections/TestimonialsSection";
import { CTASection } from "@/pages/Home/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <VendorStrip />

      <ServicesSection />

      <WhyChooseUsSection />

      <IndustriesPreviewSection />

      <HomeFAQSection />

      <BlogPreviewSection />

      <TestimonialsSection />

      <ClientStrip />

      <CTASection
        title="Ready to Secure Your Business?"
        description="Get a free cybersecurity risk assessment and discover how Artiflex Information Technology can protect your operations, data, and reputation — starting today."
        primaryButton={{ text: "Discuss Your Requirements", action: "modal" }}
      />
    </>
  );
}
