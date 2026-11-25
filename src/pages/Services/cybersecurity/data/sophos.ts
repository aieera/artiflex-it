import {
  BarChartIcon,
  ClockIcon,
  CloudIcon,
  EyeIcon,
  FileTextIcon,
  GearIcon,
  LayersIcon,
  LockIcon,
  MailIcon,
  MonitorIcon,
  NetworkIcon,
  ServerIcon,
  ShieldIcon,
  TargetIcon,
  WifiIcon,
} from "@/components/icons";

export const sophosProducts: {
  icon: typeof ShieldIcon;
  title: string;
  description: string;
  /** Optional internal link. When set, the whole card renders as a link. */
  href?: string;
}[] = [
  {
    icon: ShieldIcon,
    title: "Next-Gen Firewall",
    description:
      "Deep packet inspection, application awareness, SSL/TLS decryption, and Synchronized Security, all managed via Sophos Fusion.",
  },
  {
    icon: MonitorIcon,
    title: "Endpoint Protection",
    description:
      "AI-powered threat detection, anti-ransomware, exploit prevention, and root cause analysis across all devices.",
  },
  {
    icon: EyeIcon,
    title: "EDR (Endpoint Detection & Response)",
    description:
      "Threat hunting, live response and IT-operations queries across endpoints and servers. Built on the Sophos Endpoint agent for one-click root-cause analysis and remediation.",
  },
  {
    icon: LayersIcon,
    title: "XDR (Extended Detection & Response)",
    description:
      "AI-native platform correlating threats across endpoints, network, email, cloud, and identity for multi-vector attack detection.",
  },
  {
    icon: NetworkIcon,
    title: "NDR (Network Detection & Response)",
    description:
      "Monitors traffic inside the network to find rogue devices, lateral movement and command-and-control activity that firewalls and endpoints can't see. Now also available as a standalone Sophos NDR with inline blocking.",
  },
  {
    icon: BarChartIcon,
    title: "Next-Gen SIEM",
    description:
      "Collects and analyzes security logs from Sophos and third-party tools in one place, built on Secureworks Taegis analytics.",
  },
   {
    icon: ServerIcon,
    title: "Server & Cloud Protection",
    description:
      "Sophos Endpoint for Server and Sophos Workload Protection defending cloud, on-premises, and virtual environments with anti-exploit and runtime detection.",
  },
  {
    icon: ClockIcon,
    title: "MDR (24/7 Managed Detection)",
    description:
      "Sophos MDR protects 40,000+ customers worldwide. Detects, investigates, and responds to threats around the clock.",
  },
  {
    icon: LockIcon,
    title: "ITDR (Identity Threat Detection & Response)",
    description:
      "Detects credential abuse, account takeover, MFA bypass and lateral movement across Microsoft Entra and Active Directory, stopping identity attacks before privilege escalation.",
  },
  {
    icon: TargetIcon,
    title: "Managed Risk (Vulnerability Mgmt)",
    description:
      "Powered by Tenable. Continuous vulnerability discovery, attack surface management, and prioritized remediation.",
  },
   {
    icon: WifiIcon,
    title: "Wireless & Network Switches",
    description:
      "AP6 Series Wi-Fi 6/6E access points and cloud-managed network switches, all integrated into Sophos Fusion.",
  },
  {
    icon: MailIcon,
    title: "Email & Phishing Protection",
    description:
      "NLP-powered anti-phishing, BEC detection, attachment sandboxing, and DMARC/DKIM/SPF enforcement.",
  },
  {
    icon: FileTextIcon,
    title: "Data Loss Prevention",
    description:
      "DLP controls built into Sophos Endpoint and Sophos Email that stop sensitive files and data from leaving the organization.",
    href: "/cybersecurity/dlp/sophos-dlp",
  },
  {
    icon: CloudIcon,
    title: "Workspace Protection",
    description:
      "Sophos Protected Browser (powered by Island), ZTNA, DNS Protection and the Email Monitoring System in one per-user bundle, managed in Sophos Fusion. A simpler, more affordable alternative to full SASE for remote and hybrid workers.",
  },


  {
    icon: GearIcon,
    title: "Sophos Fusion (Unified Console, formerly Sophos Central)",
    description:
      "Single pane of glass for managing all Sophos products. Real-time information sharing and automated incident response across your entire stack.",
  },
];

export const sophosBenefits = [
  { value: "625,000+", label: "Organizations Defended Globally" },
  { value: "100M+", label: "Users Protected Worldwide" },
  { value: "40,000+", label: "MDR Customers Worldwide" },
  { value: "1", label: "Unified Console for All Products" },
];
