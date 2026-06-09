import {
  ClockIcon,
  CloudIcon,
  EyeIcon,
  GearIcon,
  LayersIcon,
  LockIcon,
  MailIcon,
  MonitorIcon,
  ServerIcon,
  ShieldIcon,
  TargetIcon,
  WifiIcon,
} from "@/components/icons";

export const sophosProducts = [
  {
    icon: ShieldIcon,
    title: "Next-Gen Firewall",
    description:
      "Deep packet inspection, application awareness, SSL/TLS decryption, and Synchronized Security, all managed via Sophos Central.",
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
      "Threat hunting, live response and IT-operations queries across endpoints and servers. Built into Intercept X for one-click root-cause analysis and remediation.",
  }, 
  {
    icon: LayersIcon,
    title: "XDR (Extended Detection & Response)",
    description:
      "AI-native platform correlating threats across endpoints, network, email, cloud, and identity for multi-vector attack detection.",
  },
   {
    icon: ServerIcon,
    title: "Server & Cloud Protection",
    description:
      "Intercept X for servers defending cloud, on-premises, and virtual environments with anti-exploit and runtime detection.",
  },
  {
    icon: ClockIcon,
    title: "MDR (24/7 Managed Detection)",
    description:
      "World's largest MDR service with 28,000+ customers. Detects, investigates, and responds to threats around the clock.",
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
      "AP6 Series Wi-Fi 6/6E access points and cloud-managed network switches, all integrated into Sophos Central.",
  },
  {
    icon: MailIcon,
    title: "Email & Phishing Protection",
    description:
      "NLP-powered anti-phishing, BEC detection, attachment sandboxing, and DMARC/DKIM/SPF enforcement.",
  },
  {
    icon: CloudIcon,
    title: "Workspace Protection / SASE",
    description:
      "ZTNA, CASB, SWG, and FWaaS converged into a single cloud-delivered security service edge.",
  },
 
 
  {
    icon: GearIcon,
    title: "Sophos Central (Unified Console)",
    description:
      "Single pane of glass for managing all Sophos products. Real-time information sharing and automated incident response across your entire stack.",
  },
];

export const sophosBenefits = [
  { value: "600K+", label: "Organizations Defended Globally" },
  { value: "100M+", label: "Users Protected Worldwide" },
  { value: "28K+", label: "MDR Customers, World's Largest" },
  { value: "1", label: "Unified Console for All Products" },
];
