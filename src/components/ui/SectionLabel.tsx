interface SectionLabelProps {
  text: string;
  dark?: boolean;
}

export default function SectionLabel({ text, dark = false }: SectionLabelProps) {
  return (
    <div className="mb-5">
      <span
        className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ${
          dark
            ? "bg-white/10 text-[#28B5E1]"
            : "bg-brand-blue/8 text-brand-blue"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            dark ? "bg-[#28B5E1]" : "bg-brand-blue"
          }`}
        />
        {text}
      </span>
    </div>
  );
}
