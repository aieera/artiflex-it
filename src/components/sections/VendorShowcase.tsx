import {
  ShieldIcon,
  MonitorIcon,
  EyeIcon,
  LayersIcon,
  ServerIcon,
  ClockIcon,
  LockIcon,
  TargetIcon,
  WifiIcon,
  MailIcon,
  CloudIcon,
  GearIcon,
  PhoneIcon,
  DatabaseIcon,
  GlobeIcon,
  ZapIcon,
  UsersIcon,
  GridIcon,
  ArchiveIcon,
  ActivityIcon,
  KeyIcon,
  SearchIcon,
  CpuIcon,
  FolderIcon,
  NetworkIcon,
  BellIcon,
} from "@/components/icons";
import type { ShowcaseIcon, ShowcaseProduct } from "@/pages/Vendors/data/vendors";

const ICON_MAP: Record<ShowcaseIcon, React.FC<{ className?: string }>> = {
  shield: ShieldIcon,
  monitor: MonitorIcon,
  eye: EyeIcon,
  layers: LayersIcon,
  server: ServerIcon,
  clock: ClockIcon,
  lock: LockIcon,
  target: TargetIcon,
  wifi: WifiIcon,
  mail: MailIcon,
  cloud: CloudIcon,
  gear: GearIcon,
  phone: PhoneIcon,
  database: DatabaseIcon,
  globe: GlobeIcon,
  zap: ZapIcon,
  users: UsersIcon,
  grid: GridIcon,
  archive: ArchiveIcon,
  activity: ActivityIcon,
  key: KeyIcon,
  search: SearchIcon,
  cpu: CpuIcon,
  folder: FolderIcon,
  network: NetworkIcon,
  bell: BellIcon,
};

type Props = {
  vendorSlug: string;
  vendorName: string;
  eyebrow?: string;
  heading?: string;
  intro?: string;
  products: ShowcaseProduct[];
};

/**
 * Generic vendor product-portfolio showcase.
 * Renders a header (eyebrow + heading + intro) and a 6-column grid of product cards
 * with icon, title, and description. The wrapper has id `{vendorSlug}-portfolio` so
 * the hero "Explore Products" anchor button can jump to it.
 */
export default function VendorShowcase({
  vendorSlug,
  vendorName,
  eyebrow,
  heading,
  intro,
  products,
}: Props) {
  return (
    <section
      id={`${vendorSlug}-portfolio`}
      className="relative overflow-hidden bg-surface-secondary py-16 sm:py-24 scroll-mt-24"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple" />

      <div className="shell">
        {eyebrow && (
          <div className="mb-8 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#045891]/8 border border-[#045891]/15 px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#045891]">
              <ShieldIcon className="w-4 h-4" />
              {eyebrow}
            </span>
          </div>
        )}

        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-16">
          <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6">
            {heading ?? `Complete ${vendorName} Product Portfolio`}
          </h2>
          {intro && (
            <p className="text-base text-body leading-relaxed max-w-3xl mx-auto sm:text-lg">
              {intro}
            </p>
          )}
        </div>

        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {products.map((product) => {
            const Icon = ICON_MAP[product.icon];
            return (
              <div
                key={product.title}
                className="group rounded-2xl border border-border-light bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#045891]/20 hover:shadow-[0_8px_30px_rgba(4,88,145,0.08)] lg:p-3.5"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#045891]/8 text-[#045891] transition-colors group-hover:bg-[#045891] group-hover:text-white">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="font-display text-sm font-semibold leading-tight text-heading mb-2">
                  {product.title}
                </h3>
                <p className="text-[11px] leading-relaxed text-body lg:text-[11.5px]">
                  {product.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
