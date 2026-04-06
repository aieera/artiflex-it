interface Step {
  number: number;
  title: string;
  description: string;
}

interface ProcessFlowProps {
  steps: Step[];
}

export default function ProcessFlow({ steps }: ProcessFlowProps) {
  return (
    <div className="relative">
      {/* Connecting line — visible on lg */}
      <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent lg:block" />

      <div className={`grid gap-6 sm:gap-8 ${steps.length <= 4 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-5"}`}>
        {steps.map((step) => (
          <div key={step.number} className="group relative flex flex-col items-center text-center">
            {/* Number box */}
            <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/8 text-brand-blue border border-brand-blue/15 transition-all duration-300 group-hover:border-brand-blue/30 group-hover:shadow-lg group-hover:shadow-brand-blue/10 sm:mb-6 sm:h-14 sm:w-14 sm:rounded-2xl">
              <span className="font-display text-base font-bold sm:text-lg">
                {String(step.number).padStart(2, "0")}
              </span>
            </div>

            <h3 className="mb-1.5 text-heading font-display text-sm font-semibold sm:mb-2 sm:text-base">
              {step.title}
            </h3>
            <p className="text-xs text-body leading-relaxed sm:text-sm">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
