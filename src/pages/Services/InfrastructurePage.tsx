import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import StatsBar from "@/components/ui/StatsBar";
import ProcessFlow from "@/components/ui/ProcessFlow";
import { CTASection } from "@/pages/Home/sections/CTASection";
import { useContactModal } from "@/components/layout/ContactModal";
import {
  ServerIcon,
  WifiIcon,
  DatabaseIcon,
  MonitorIcon,
  CheckIcon,
  ShieldIcon,
  LayersIcon,
  ActivityIcon,
  EyeIcon,
  LockIcon,
  PhoneIcon,
  FileTextIcon,
  GearIcon,
} from "@/components/icons";

/* ───────── 12 SOLUTION CATEGORIES ───────── */

type Category = {
  slug: string;
  icon: React.FC<{ className?: string }>;
  title: string;
  tagline: string;
  description: string;
  items: string[];
  href: string;
};

const categories: Category[] = [
  {
    slug: "data-center",
    icon: ServerIcon,
    title: "Data Center & Infrastructure",
    tagline: "Design, build, power, cool, TIA-942 to colocation",
    description:
      "From a 4-rack server room to a TIA-942 Tier-III build, end-to-end data center design, build, racks, power, cooling, containment and DCIM for UAE conditions.",
    items: [
      "Data Center Design & Consulting",
      "Data Center Build & Deployment",
      "Rack, Power & Cooling",
      "Hot / Cold Aisle Containment",
      "DCIM Solutions",
      "Migration & Consolidation",
    ],
    href: "/infrastructure/data-center",
  },
  {
    slug: "servers-compute-virtualization",
    icon: DatabaseIcon,
    title: "Servers, Compute & Virtualization",
    tagline: "Rack, blade, HCI, GPU and the hypervisor of your choice",
    description:
      "Dell, HPE, Lenovo, Cisco UCS, Supermicro for compute. Nutanix, Dell VxRail, HPE GreenLake for HCI. NVIDIA H100/H200/B200 for AI. VMware, Hyper-V or Proxmox virtualisation.",
    items: [
      "Rack / Blade / Tower Servers",
      "Hyperconverged Infrastructure (HCI)",
      "GPU / AI Servers",
      "Virtualization (VMware, Hyper-V, Proxmox)",
      "Private Cloud Infrastructure",
    ],
    href: "/infrastructure/servers-compute-virtualization",
  },
  {
    slug: "storage-solutions",
    icon: LayersIcon,
    title: "Storage Solutions",
    tagline: "SAN, NAS and object storage, sized to the workload",
    description:
      "HPE Alletra MP, Pure Storage, NetApp ONTAP, Dell PowerStore / PowerScale / ECS, IBM FlashSystem, Hitachi VSP, Qumulo and Cloudian. Block, file and object storage with always-on data reduction and immutable snapshots.",
    items: [
      "SAN / Block Storage",
      "NAS / File Storage",
      "Object Storage (S3)",
      "Hybrid Cloud Data Fabric",
      "Consumption / Subscription Models",
    ],
    href: "/infrastructure/storage-solutions",
  },
  {
    slug: "backup-data-management",
    icon: LayersIcon,
    title: "Backup Management",
    tagline: "On-prem, hybrid, SaaS and cloud-native backup",
    description:
      "Veeam, Commvault, Rubrik, Cohesity and Dell PowerProtect for on-prem and hybrid. AvePoint for Microsoft 365. Druva, Clumio and HYCU for cloud-native DPaaS. Immutable, air-gapped and ransomware-resilient by design.",
    items: [
      "On-Prem and Hybrid Backup",
      "Microsoft 365 / SaaS Backup",
      "Cloud-Native / DPaaS",
      "Ransomware-Resilient Architecture",
      "Automated Recovery Verification",
    ],
    href: "/infrastructure/backup-data-management",
  },
  {
    slug: "document-management-systems",
    icon: LayersIcon,
    title: "Document Management Systems (DMS)",
    tagline: "Capture, classify, automate, retain",
    description:
      "Microsoft SharePoint, M-Files, OpenText, Hyland OnBase, DocuWare, Laserfiche and Box. Intelligent capture, metadata-driven retrieval, workflow automation, retention and compliance enforcement, Arabic-language ready.",
    items: [
      "Intelligent Capture & OCR",
      "Metadata & Classification",
      "Workflow & BPM",
      "Records Retention & Compliance",
      "AI Extraction & Search",
    ],
    href: "/infrastructure/document-management-systems",
  },
  {
    slug: "network-infrastructure",
    icon: ActivityIcon,
    title: "Network Infrastructure",
    tagline: "Switching, routing, SD-WAN and load balancing",
    description:
      "Cisco Catalyst, Aruba CX, Juniper, FortiSwitch, MikroTik for switching. Cisco, Aruba, Fortinet for routing. VeloCloud, Versa, Fortinet for SD-WAN. F5, Citrix, A10 for load balancing.",
    items: [
      "Core & Access Switching",
      "Routing Solutions",
      "SD-WAN",
      "Load Balancers",
      "Network Monitoring",
    ],
    href: "/infrastructure/network-infrastructure",
  },
  {
    slug: "wireless-solutions",
    icon: WifiIcon,
    title: "Wireless Solutions",
    tagline: "Wi-Fi 6 / 6E / 7 with site survey and heat mapping",
    description:
      "Cisco Meraki, Aruba (HPE), Juniper Mist, Fortinet, Ruckus, CommScope. Indoor and outdoor coverage, guest network segmentation, RF heat mapping and 802.1X authentication.",
    items: [
      "Enterprise Wi-Fi (Wi-Fi 6 / Wi-Fi 7)",
      "Indoor / Outdoor Wireless",
      "Guest Wi-Fi",
      "Site Survey & Heat Mapping",
    ],
    href: "/infrastructure/wireless-solutions",
  },
  {
    slug: "structured-cabling",
    icon: GearIcon,
    title: "Passive Infrastructure (Structured Cabling)",
    tagline: "Copper, fiber, data center cabling and rack management",
    description:
      "CommScope, Panduit, Legrand, R&M, Nexans, Belden cabling systems. Cat6, Cat6A, Cat7 copper. OM3 / OM4 / OM5 multimode and OS2 single-mode fiber. Designed and installed to TIA / ISO standards.",
    items: [
      "Copper Cabling (Cat6 / Cat6A / Cat7)",
      "Fiber Optic Cabling",
      "Data Center Cabling",
      "Rack & Cabinet",
      "Cable Management",
    ],
    href: "/infrastructure/structured-cabling",
  },
  {
    slug: "unified-communication-telephony",
    icon: PhoneIcon,
    title: "Unified Communication & Telephony",
    tagline: "On-prem PBX, hosted PBX, SIP and contact centre",
    description:
      "3CX, Avaya, Cisco, Yealink, Grandstream, Sangoma for IP PBX and SIP gateways. Microsoft Teams Phone, Zoom Phone, RingCentral for cloud / hosted. Genesys, Cisco Webex Contact Center for call centre.",
    items: [
      "IP PBX Systems",
      "Cloud / Hosted PBX",
      "SIP Trunking",
      "VoIP Gateways",
      "Call Center Solutions",
      "IVR & Call Recording",
    ],
    href: "/infrastructure/unified-communication-telephony",
  },
  {
    slug: "video-conferencing-collaboration",
    icon: MonitorIcon,
    title: "Video Conferencing & Collaboration",
    tagline: "Meeting rooms, boardrooms and AV integration",
    description:
      "Microsoft Teams Rooms, Zoom Rooms, Cisco Webex, Logitech, Poly, Yealink, Neat. Boardroom AV, interactive displays, room booking and integration with M365 / Google Workspace.",
    items: [
      "Meeting Room Solutions",
      "Boardroom AV Setup",
      "Interactive Displays",
      "Audio-Visual Integration",
      "Collaboration Platforms Integration",
    ],
    href: "/infrastructure/video-conferencing-collaboration",
  },
  {
    slug: "cctv-surveillance",
    icon: EyeIcon,
    title: "CCTV, Surveillance & Physical Security",
    tagline: "IP, analog, NVR, VMS and AI-based surveillance",
    description:
      "Hikvision, Dahua, Axis, Bosch, Hanwha, Avigilon, Honeywell. IP and analog CCTV, NVR / DVR, video management software (VMS), AI analytics and perimeter intrusion detection.",
    items: [
      "IP Surveillance Systems",
      "Analog CCTV Systems",
      "NVR / DVR",
      "Video Management Software (VMS)",
      "AI-Based Surveillance",
      "Perimeter Security Systems",
    ],
    href: "/infrastructure/cctv-surveillance",
  },
  {
    slug: "access-control-biometrics",
    icon: LockIcon,
    title: "Access Control & Biometrics",
    tagline: "Biometric, RFID, face recognition and visitor management",
    description:
      "ZKTeco, Suprema, Hikvision, Honeywell, HID, Matrix, Lenel for access control and biometrics. Fingerprint, face recognition, RFID and smart card. Time and attendance, visitor management.",
    items: [
      "Biometric Attendance Systems",
      "Face Recognition Systems",
      "RFID / Smart Card Access",
      "Door Access Control Systems",
      "Time & Attendance Software",
      "Visitor Management Systems",
    ],
    href: "/infrastructure/access-control-biometrics",
  },
  {
    slug: "power-ups",
    icon: ShieldIcon,
    title: "Power & UPS Solutions",
    tagline: "Online, line-interactive, modular UPS and PDU",
    description:
      "APC by Schneider, Vertiv (Liebert), Eaton, Riello, Socomec, Delta, Numeric. Online double-conversion, line-interactive, modular UPS, PDU monitoring and generator integration.",
    items: [
      "Online UPS",
      "Line-Interactive UPS",
      "Modular UPS",
      "Battery Backup Systems",
      "PDU & Power Monitoring",
      "Generator Integration",
    ],
    href: "/infrastructure/power-ups",
  },
  {
    slug: "printing-document-solutions",
    icon: FileTextIcon,
    title: "Printing Solutions",
    tagline: "MFPs, managed print and secure printing",
    description:
      "Canon, Xerox, HP, Konica Minolta, Ricoh, Kyocera, Brother, Sharp. Multifunction printers, enterprise print fleets, Managed Print Services (MPS) and secure follow-me printing.",
    items: [
      "Multifunction Printers (MFP)",
      "Enterprise Printers",
      "Managed Print Services (MPS)",
      "Secure Printing",
      "Production & Large-Format Print",
    ],
    href: "/infrastructure/printing-document-solutions",
  },
];

/* ───────── STATS ───────── */

const infraStats = [
  { value: 99.97, suffix: "%", label: "Uptime Maintained" },
  { value: 5600, suffix: "", label: "Cost Per Minute of Downtime ($)" },
  { value: 73, suffix: "%", label: "Downtime Caused by Aging Infra" },
  { value: 14, suffix: "+", label: "Years Delivering UAE Infrastructure" },
];

/* ───────── PROCESS ───────── */

const processSteps = [
  {
    number: 1,
    title: "Assess",
    description:
      "Audit existing infrastructure, document capacity and performance, identify risks. Map business requirements to technical specifications across every layer in scope.",
  },
  {
    number: 2,
    title: "Design",
    description:
      "Detailed architecture with redundancy, scalability and security baked in. TIA-942, NESA, NCA ECC, ADHICS, PCI-DSS and PDPL controls part of design, not retrofit.",
  },
  {
    number: 3,
    title: "Build",
    description:
      "Procure, stage, configure and deploy. Every component tested before going live. Phased cutover to minimise disruption. Civil Defence approvals coordinated where applicable.",
  },
  {
    number: 4,
    title: "Support",
    description:
      "24/7 monitoring, proactive maintenance, quarterly reviews and capacity planning. AMC contracts available with SLA-backed response. We do not build and walk away.",
  },
];

/* ───────── HERO TOPICS (right-side pillar cards) ───────── */

const heroTopics = [
  {
    label: "Data Center & Infrastructure",
    icon: ServerIcon,
    originHref: "/blog/origin-data-center",
    portfolioHref: "/infrastructure/data-center",
  },
  {
    label: "Servers, Compute & Virtualization",
    icon: DatabaseIcon,
    originHref: "/blog/origin-servers-compute-virtualization",
    portfolioHref: "/infrastructure/servers-compute-virtualization",
  },
  {
    label: "Storage Solutions",
    icon: LayersIcon,
    originHref: "/blog/origin-storage-solutions",
    portfolioHref: "/infrastructure/storage-solutions",
  },
  {
    label: "Backup & Data Management",
    icon: LayersIcon,
    originHref: "/blog/origin-backup-data-management",
    portfolioHref: "/infrastructure/backup-data-management",
  },
  {
    label: "Document Management Systems (DMS)",
    icon: FileTextIcon,
    originHref: "/blog/origin-document-management-systems",
    portfolioHref: "/infrastructure/document-management-systems",
  },
  {
    label: "Network Infrastructure",
    icon: ActivityIcon,
    originHref: "/blog/origin-network-infrastructure",
    portfolioHref: "/infrastructure/network-infrastructure",
  },
  {
    label: "Wireless Solutions",
    icon: WifiIcon,
    originHref: "/blog/origin-wireless-solutions",
    portfolioHref: "/infrastructure/wireless-solutions",
  },
  {
    label: "Structured Cabling",
    icon: GearIcon,
    originHref: "/blog/origin-structured-cabling",
    portfolioHref: "/infrastructure/structured-cabling",
  },
  {
    label: "Unified Communication & Telephony",
    icon: PhoneIcon,
    originHref: "/blog/origin-unified-communication-telephony",
    portfolioHref: "/infrastructure/unified-communication-telephony",
  },
  {
    label: "Video Conferencing & Collaboration",
    icon: MonitorIcon,
    originHref: "/blog/origin-video-conferencing-collaboration",
    portfolioHref: "/infrastructure/video-conferencing-collaboration",
  },
  {
    label: "CCTV & Surveillance",
    icon: EyeIcon,
    originHref: "/blog/origin-cctv-surveillance",
    portfolioHref: "/infrastructure/cctv-surveillance",
  },
  {
    label: "Access Control & Biometrics",
    icon: LockIcon,
    originHref: "/blog/origin-access-control-biometrics",
    portfolioHref: "/infrastructure/access-control-biometrics",
  },
  {
    label: "Power & UPS Solutions",
    icon: ShieldIcon,
    originHref: "/blog/origin-power-ups",
    portfolioHref: "/infrastructure/power-ups",
  },
  {
    label: "Printing Solutions",
    icon: FileTextIcon,
    originHref: "/blog/origin-printing-document-solutions",
    portfolioHref: "/infrastructure/printing-document-solutions",
  },
];

/* ───────── HERO ───────── */

function HeroSection() {
  const { open: openContact } = useContactModal();

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-navy-deep via-navy to-navy-light">
      {/* Background image */}
      <div className="absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
        <img
          src="/cybersecurity.png"
          alt=""
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover object-center opacity-55 [mask-image:radial-gradient(120%_90%_at_60%_45%,black_55%,transparent_100%)]"
        />
      </div>

      {/* Readability tint: darker on the left where text lives, fading right */}
      <div
        className="absolute inset-0 z-[3] bg-gradient-to-r from-navy-deep/90 via-navy-deep/65 to-navy-deep/25 pointer-events-none"
        aria-hidden="true"
      />
      {/* Top + bottom vignette for cohesion */}
      <div
        className="absolute inset-0 z-[3] bg-gradient-to-b from-navy-deep/55 via-transparent to-navy-deep/80 pointer-events-none"
        aria-hidden="true"
      />

      <div className="shell relative z-10 flex w-full flex-1 flex-col pt-20 pb-6 sm:pt-24 sm:pb-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-3 sm:mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 sm:text-xs">
            <li>
              <Link to="/" className="transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li className="text-slate-600">/</li>
            <li>
              <span className="font-medium text-[#28B5E1]">Infrastructure</span>
            </li>
          </ol>
        </nav>

        <div className="grid flex-1 grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col justify-center py-4"
          >
            <p className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-8xl">
              Infrastructure
            </p>

            <div className="mt-6 sm:mt-8 lg:mt-8 xl:mt-10">
              <h1 className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight text-white sm:mt-3 sm:text-2xl md:text-3xl lg:text-[1.6rem] xl:text-4xl">
                <span className="gradient-text"> Enterprise IT Infrastructure for the UAE & Middle East</span>
              </h1>

              <p className="mt-3 max-w-xl text-xs leading-relaxed text-slate-300 sm:mt-4 sm:text-sm md:text-base lg:text-sm xl:text-base">
                Twelve solution categories under one accountable partner. Data
                center, servers, storage, network, wireless, UC, AV,
                surveillance, access control, power, and managed print,
                designed for UAE conditions and aligned to local compliance.
              </p>

              <div className="mt-5 flex flex-col items-stretch gap-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 lg:gap-3 xl:gap-4">
                <button
                  onClick={openContact}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#045891] to-[#1B8AC7] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(27,138,199,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_32px_rgba(27,138,199,0.5)] sm:px-6 sm:py-3 lg:text-sm xl:px-7 xl:py-3.5 xl:text-base"
                >
                  Request an Infrastructure Consultation
                  <svg
                    className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>

                <Link
                  to="/blog/origin-data-center"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#28B5E1]/60 hover:bg-white/10 hover:text-[#28B5E1] sm:px-6 sm:py-3 lg:text-sm xl:px-7 xl:py-3.5 xl:text-base"
                >
                  Read the Origin Story
                  <svg
                    className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>

          <div className="px-2 sm:px-4">
            {(() => {
              const tileCls =
                "group relative flex min-h-[42px] min-w-0 items-center gap-1.5 overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.035] px-1.5 py-1.5 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#28B5E1]/55 hover:bg-gradient-to-br hover:from-[#045891]/40 hover:to-[#1B8AC7]/20 hover:shadow-[0_10px_24px_-8px_rgba(40,181,225,0.5)] sm:gap-2 sm:px-2";

              const renderGrid = (variant: "origin" | "portfolio") => (
                <div className="mt-2.5 grid grid-cols-2 gap-1.5 sm:gap-2">
                  {heroTopics.map((t) => {
                    const Icon = t.icon;
                    const href =
                      variant === "origin" ? t.originHref : t.portfolioHref;
                    return (
                      <Link
                        key={`${variant}-${t.label}`}
                        to={href}
                        className={tileCls}
                      >
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#28B5E1]/10 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100"
                        />
                        <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-[#28B5E1]/25 to-[#1B8AC7]/10 text-[#4FC3F7] transition-all group-hover:from-[#28B5E1]/55 group-hover:to-[#1B8AC7]/35 group-hover:text-white">
                          <Icon className="h-3 w-3" />
                        </span>
                        <span className="relative min-w-0 flex-1 whitespace-normal break-words text-[10px] font-semibold leading-tight text-white/90 group-hover:text-white sm:text-[10.5px]">
                          {t.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              );

              const cardCls =
                "relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent p-3 backdrop-blur-md shadow-[0_20px_60px_-30px_rgba(40,181,225,0.4)] sm:p-3.5";

              return (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5">
                  {/* Infrastructure Portfolios */}
                  <div className={cardCls}>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -top-16 -left-12 h-40 w-40 rounded-full bg-[#1B8AC7]/[0.1] blur-3xl"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/40 to-transparent"
                    />
                    <div className="relative">
                      <div className="flex items-center gap-2">
                        <span
                          aria-hidden
                          className="h-1 w-6 rounded-full bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1]"
                        />
                        <h3 className="font-display text-sm font-bold text-white sm:text-base">
                          Portfolios
                          <span className="text-[#28B5E1]">.</span>
                        </h3>
                      </div>
                      <p className="mt-1 text-[10.5px] leading-relaxed text-slate-300/80">
                        Explore the solution that fits your stack.
                      </p>
                      {renderGrid("portfolio")}
                    </div>
                  </div>

                  {/* The Origin Story */}
                  <div className={cardCls}>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -top-16 -right-12 h-40 w-40 rounded-full bg-[#28B5E1]/[0.09] blur-3xl"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#28B5E1]/40 to-transparent"
                    />
                    <div className="relative">
                      <div className="flex items-center gap-2">
                        <span
                          aria-hidden
                          className="h-1 w-6 rounded-full bg-gradient-to-r from-[#1B8AC7] to-[#28B5E1]"
                        />
                        <h3 className="font-display text-sm font-bold text-white sm:text-base">
                          The Origin Story
                          <span className="text-[#28B5E1]">.</span>
                        </h3>
                      </div>
                      <p className="mt-1 text-[10.5px] leading-relaxed text-slate-300/80">
                        Read the story behind each infrastructure pillar.
                      </p>
                      {renderGrid("origin")}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── PAGE ───────── */

export default function InfrastructurePage() {
  return (
    <>
      <title>IT Infrastructure UAE | Data Center, Servers, Network, Wireless, UC, AV, CCTV, UPS | Artiflex IT</title>
      <meta
        name="description"
        content="End-to-end IT infrastructure for UAE enterprises across 12 solution categories: data center, servers and virtualization, storage, network, wireless, structured cabling, unified communication, video conferencing, CCTV, access control, power & UPS, and managed print. Designed for UAE conditions, aligned to NESA, ADHICS, PDPL and Civil Defence."
      />
      <meta
        name="keywords"
        content="IT infrastructure UAE, data center UAE, server infrastructure Dubai, structured cabling UAE, network infrastructure Dubai, enterprise wifi UAE, IP PBX UAE, video conferencing Dubai, CCTV UAE, access control UAE, biometrics UAE, UPS Dubai, managed print UAE, Cisco partner UAE, Dell partner UAE, HPE partner UAE, Aruba UAE, Fortinet UAE, NetApp UAE, Nutanix UAE, VMware UAE, Schneider Electric UAE, Vertiv UAE, APC UAE, Hikvision UAE, ZKTeco UAE, 3CX UAE, Microsoft Teams Rooms UAE, Logitech UAE, Poly UAE, Canon UAE, Xerox UAE, Konica Minolta UAE"
      />
      <link rel="canonical" href="https://artiflexit.com/infrastructure" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="IT Infrastructure UAE, 12 Solution Categories | Artiflex IT" />
      <meta
        property="og:description"
        content="From data center to managed print: 12 infrastructure categories under one accountable UAE partner. Designed for UAE conditions, aligned to NESA, ADHICS, PDPL and Civil Defence."
      />
      <meta property="og:image" content="https://artiflexit.com/og/infrastructure.png" />
      <meta property="og:url" content="https://artiflexit.com/infrastructure" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="IT Infrastructure UAE | Artiflex IT" />
      <meta name="twitter:description" content="Data center, servers, storage, network, wireless, UC, AV, CCTV, access control, UPS and managed print for UAE enterprises." />
      <meta name="twitter:image" content="https://artiflexit.com/og/infrastructure.png" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Artiflex IT",
        url: "https://artiflexit.com/infrastructure",
        areaServed: [
          { "@type": "Country", name: "United Arab Emirates" },
          { "@type": "Country", name: "Saudi Arabia" },
          { "@type": "Country", name: "Oman" },
          { "@type": "City", name: "Dubai" },
          { "@type": "City", name: "Abu Dhabi" },
        ],
        address: { "@type": "PostalAddress", addressCountry: "AE" },
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: "IT Infrastructure Services, UAE",
        serviceType: "Enterprise IT Infrastructure",
        provider: { "@type": "Organization", name: "Artiflex IT", url: "https://artiflexit.com" },
        areaServed: [
          { "@type": "Country", name: "United Arab Emirates" },
          { "@type": "Country", name: "Saudi Arabia" },
          { "@type": "Country", name: "Oman" },
        ],
        url: "https://artiflexit.com/infrastructure",
        description:
          "End-to-end IT infrastructure for UAE enterprises across data center, servers and virtualization, storage, network, wireless, structured cabling, unified communication, video conferencing, CCTV, access control, power and UPS, and managed print. Aligned to NESA, NCA ECC, ADHICS, SAMA, ISO 27001, PCI-DSS, PDPL and UAE Civil Defence.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "IT Infrastructure",
          itemListElement: categories.map((c) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: c.title, url: `https://artiflexit.com${c.href}` },
          })),
        },
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://artiflexit.com/" },
          { "@type": "ListItem", position: 2, name: "Infrastructure", item: "https://artiflexit.com/infrastructure" },
        ],
      })}</script>

      <HeroSection />

      {/* ───────── COST OF DOWNTIME ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="mx-auto text-center">
            <SectionHeader
              label="The Cost of Downtime"
              title={
                <>
                  When <span className="gradient-text">infrastructure</span> fails, everything stops
                </>
              }
              centered
            />
            <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm sm:p-8">
              <p className="mb-4 text-left text-base leading-relaxed text-slate-700">
                The average cost of IT downtime is{" "}
                <span className="font-semibold text-slate-900">USD 5,600 per minute</span>. For a mid-market business, a four-hour outage can cost more than an entire year of proactive infrastructure management.
              </p>
              <p className="text-left text-base leading-relaxed text-slate-700">
                73% of unplanned downtime in the region is caused by aging infrastructure: equipment running past its lifecycle, firmware that has not been updated in years, and networks designed for half the current workload. This is not bad luck. It is predictable failure from deferred investment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 12 SOLUTION CATEGORIES ───────── */}
      <section id="solutions" className="relative bg-surface-secondary py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="12 Solution Categories"
            title={
              <>
                Every infrastructure layer, <span className="gradient-text">one accountable partner</span>
              </>
            }
            description="From the data center white space through structured cabling, servers, storage, network, wireless, UC, video, surveillance, access control, power and managed print. One operating model, one SLA, one team."
            centered
          />

          <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <article
                  key={c.slug}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1B8AC7]/60 hover:shadow-[0_20px_60px_-12px_rgba(27,138,199,0.20)]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#045891] to-[#28B5E1] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <div className="mb-3 flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#28B5E1]/15 to-[#1B8AC7]/10 text-[#1B8AC7] transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-bold leading-tight text-slate-900 sm:text-xl">
                        {c.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-[#1B8AC7]">{c.tagline}</p>
                    </div>
                  </div>

                  <p className="mb-4 text-sm leading-relaxed text-slate-600">
                    {c.description}
                  </p>

                  <ul className="mb-5 flex-1 space-y-1.5">
                    {c.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-slate-700">
                        <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1B8AC7]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={c.href}
                    className="group/btn mt-auto inline-flex items-center justify-center gap-2 rounded-lg border border-[#1B8AC7]/30 bg-[#28B5E1]/5 px-4 py-2.5 text-xs font-semibold text-[#1B8AC7] transition-all duration-300 hover:border-[#1B8AC7] hover:bg-[#1B8AC7] hover:text-white hover:shadow-[0_8px_24px_-8px_rgba(27,138,199,0.55)]"
                  >
                    Learn more
                    <svg
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── BY THE NUMBERS ───────── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="By the Numbers"
            title={
              <>
                Why <span className="gradient-text">infrastructure</span> investment pays off
              </>
            }
            centered
          />
          <StatsBar stats={infraStats} />
        </div>
      </section>

      {/* ───────── HOW WE WORK ───────── */}
      <section className="relative bg-surface-secondary py-16 sm:py-24">
        <div className="shell">
          <SectionHeader
            label="Our Approach"
            title={
              <>
                How we deliver <span className="gradient-text">infrastructure</span>
              </>
            }
            description="A four-phase methodology that scales from a single AV install to a multi-site Tier-III data center build."
            centered
          />
          <ProcessFlow steps={processSteps} />
        </div>
      </section>

      {/* ───────── COMPLIANCE CALLOUT ───────── */}
      <section className="relative bg-gradient-to-br from-[#04101E] via-[#0A3D6B] to-[#04101E] py-16 sm:py-24">
        <div className="shell">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm sm:p-12">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#28B5E1]/15 text-[#4FC3F7]">
                <ShieldIcon className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#4FC3F7]">
                  UAE Compliance & Approvals
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                  TIA-942, Uptime Institute, NESA, NCA ECC, ADHICS, CBUAE, SAMA, ISO 27001, PCI-DSS, ISO 22301 and PDPL aligned
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
                  Every Artiflex IT infrastructure engagement is designed against the relevant UAE compliance regime from day one, not retrofitted. Civil Defence approvals (DCD, Abu Dhabi CD) are engaged at design stage, not after kit is ordered. Pre-built compliance evidence cuts audit-prep effort by 60-80%.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "TIA-942",
                    "Uptime Tier I-IV",
                    "NESA Levels 3-4",
                    "NCA ECC",
                    "ADHICS",
                    "CBUAE",
                    "SAMA",
                    "ISO 27001",
                    "ISO 22301",
                    "PCI-DSS",
                    "UAE PDPL",
                    "DCD / Civil Defence",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border border-[#28B5E1]/30 bg-[#28B5E1]/10 px-3 py-1 text-[11px] font-semibold text-[#4FC3F7]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Build infrastructure that doesn't keep you up at night."
        description="Twelve infrastructure categories under one accountable UAE partner. Get an assessment that identifies aging equipment, capacity constraints and single points of failure with a prioritised upgrade roadmap across the layers in scope."
        primaryButton={{ text: "Discuss Your Requirements", action: "modal" }}
      />
    </>
  );
}
