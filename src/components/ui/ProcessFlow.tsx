interface Step {
  number: number;
  title: string;
  description: string;
}

interface ProcessFlowProps {
  steps: Step[];
  dark?: boolean;
}

export default function ProcessFlow({ steps, dark = false }: ProcessFlowProps) {
  return (
    <div className="relative">
      {/* Connecting line, visible on lg */}
      <div
        className={`pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r lg:block ${
          dark
            ? "from-transparent via-brand-cyan/30 to-transparent"
            : "from-transparent via-brand-blue/20 to-transparent"
        }`}
      />

      <div className={`grid gap-6 sm:gap-8 ${steps.length <= 4 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-5"}`}>
        {steps.map((step) => (
          <div key={step.number} className="group relative flex flex-col items-center text-center">
            {/* Number box */}
            <div
              className={`relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 sm:mb-6 sm:h-14 sm:w-14 sm:rounded-2xl ${
                dark
                  ? "border-white/15 bg-white/[0.04] text-brand-cyan backdrop-blur group-hover:border-brand-cyan/40 group-hover:shadow-lg group-hover:shadow-brand-cyan/10"
                  : "border-brand-blue/15 bg-brand-blue/8 text-brand-blue group-hover:border-brand-blue/30 group-hover:shadow-lg group-hover:shadow-brand-blue/10"
              }`}
            >
              <span className="font-display text-base font-bold sm:text-lg">
                {String(step.number).padStart(2, "0")}
              </span>
            </div>

            <h3
              className={`mb-1.5 font-display text-sm font-semibold sm:mb-2 sm:text-base ${
                dark ? "text-white" : "text-heading"
              }`}
            >
              {step.title}
            </h3>
            <p
              className={`text-xs leading-relaxed sm:text-sm ${
                dark ? "text-slate-300" : "text-body"
              }`}
            >
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
