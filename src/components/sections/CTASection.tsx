import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { useContactModal } from "@/components/layout/ContactModal";

interface CTASectionProps {
  title: string;
  description: string;
  primaryButton: { text: string; action?: string; href?: string };
  secondaryButton?: { text: string; href: string };
}

export function CTASection({
  title,
  description,
  primaryButton,
  secondaryButton,
}: CTASectionProps) {
  const { openModal } = useContactModal();

  return (
    <section className="relative py-16 overflow-hidden bg-navy-deep sm:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-deep to-navy" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-blue/8 blur-[150px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <div className="rounded-2xl px-4 py-12 sm:rounded-3xl sm:px-12 sm:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-display font-bold text-white tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-4 text-base text-slate-400 leading-relaxed max-w-2xl mx-auto sm:mt-5 sm:text-lg">
              {description}
            </p>
            <div className="mt-8 flex w-full flex-col items-center gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:justify-center sm:gap-4">
              <Button
                variant="gradient"
                size="lg"
                onClick={primaryButton.action === "modal" ? openModal : undefined}
                href={primaryButton.action !== "modal" ? primaryButton.href : undefined}
                className="w-full sm:w-auto"
              >
                {primaryButton.text}
              </Button>
              {secondaryButton && (
                <Button variant="outline" size="lg" href={secondaryButton.href} className="w-full sm:w-auto">
                  {secondaryButton.text}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
