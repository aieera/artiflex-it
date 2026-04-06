export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { name: "Cybersecurity", description: "Advanced threat protection & SOC services", href: "/cybersecurity", icon: "ShieldIcon" },
      { name: "Cloud Solutions", description: "Secure cloud migration & management", href: "/cloud-solutions", icon: "CloudIcon" },
      { name: "Infrastructure", description: "Enterprise network & data center design", href: "/infrastructure", icon: "ServerIcon" },
      { name: "Managed Services", description: "24/7 monitoring & IT operations", href: "/managed-services", icon: "GearIcon" },
      { name: "Application Security", description: "Web app & API penetration testing", href: "/application-security-solutions", icon: "GlobeIcon" },
      { name: "AMC Services", description: "Preventive maintenance & hardware care", href: "/amc-services", icon: "ServerIcon" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const SERVICES = [
  { name: "Cybersecurity", description: "End-to-end cybersecurity solutions including threat intelligence, vulnerability management, SOC-as-a-Service, and compliance frameworks tailored for the Middle East.", href: "/cybersecurity", icon: "ShieldIcon" },
  { name: "Cloud Solutions", description: "Secure cloud migration, multi-cloud architecture, and managed cloud services across AWS, Azure, and private cloud environments.", href: "/cloud-solutions", icon: "CloudIcon" },
  { name: "Infrastructure", description: "Enterprise networking, data center design, structured cabling, and next-generation firewall deployments for mission-critical environments.", href: "/infrastructure", icon: "ServerIcon" },
  { name: "Managed Services", description: "Proactive 24/7 monitoring, incident response, patch management, and IT operations outsourcing with guaranteed SLAs.", href: "/managed-services", icon: "GearIcon" },
  { name: "Application Security", description: "Web application penetration testing, API security, secure code review, WAF management, and DAST scanning for UAE businesses.", href: "/application-security-solutions", icon: "GlobeIcon" },
  { name: "AMC Services", description: "Annual Maintenance Contracts with preventive maintenance, 24/7 monitoring, patch management, and hardware lifecycle management.", href: "/amc-services", icon: "ServerIcon" },
] as const;

export const STATS = [
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 99.9, suffix: "%", label: "Uptime Guaranteed" },
  { value: 14, suffix: "+", label: "Years Experience" },
  { value: 20, suffix: "+", label: "Certified Professionals" },
] as const;

export const PARTNER_LOGOS = [
  { name: "Sophos", src: "/logos/sophos.svg" },
  { name: "Check Point", src: "/logos/Check-Point-2024-logo-color.svg" },
  { name: "Fortinet", src: "/logos/Fortinet.svg" },
  { name: "Cisco", src: "/logos/Cisco.svg" },
  { name: "Palo Alto Networks", src: "/logos/PaloAltoNetworks.svg" },
  { name: "Kaspersky", src: "/logos/kaspersky.svg" },
  { name: "3CX", src: "/logos/3CX.svg" },
  { name: "Nutanix", src: "/logos/Nutanix.svg" },
  { name: "ESET", src: "/logos/ESET.svg" },
  { name: "F5 Networks", src: "/logos/f5.svg" },
  { name: "Azure", src: "/logos/Microsoft_Azure.svg" },
  { name: "Huawei", src: "/logos/huawei.svg" },
  { name: "Trend Micro", src: "/logos/Trend_Micro.svg" },
  { name: "SonicWall", src: "/logos/SonicWall.svg" },
  { name: "Proofpoint", src: "/logos/Proofpoint.svg" },
  { name: "Mimecast", src: "/logos/mimecast.svg" },
  { name: "Acronis", src: "/logos/Acronis.svg" },
  { name: "VMware", src: "/logos/vmware.svg" },
  { name: "Veeam", src: "/logos/veeam.svg" },
  { name: "Ivanti", src: "/logos/Ivanti.svg" },
  { name: "HPE", src: "/logos/Hewlett.svg" },
  { name: "Microsoft", src: "/logos/microsoft.svg" },
] as const;

export const CLIENT_LOGOS = [
  { name: "Giordano", src: "/logos/giordano.svg" },
  { name: "Al Ghandi Auto", src: "/logos/al ghandi auto.svg" },
  { name: "Tiger Properties", src: "/logos/tiger.svg" },
  { name: "Dubai Duty Free", src: "/logos/dub.svg" },
  { name: "ACC", src: "/logos/acc.svg" },
  { name: "Al Nasr", src: "/logos/alnasr.svg" },
  { name: "Shaw", src: "/logos/shaw.svg" },
  { name: "NBTC", src: "/logos/nbtc.svg" },
] as const;

export const FOOTER_LINKS = {
  services: [
    { label: "Cybersecurity", href: "/cybersecurity" },
    { label: "Cloud Solutions", href: "/cloud-solutions" },
    { label: "Infrastructure", href: "/infrastructure" },
    { label: "Managed Services", href: "/managed-services" },
    { label: "Application Security", href: "/application-security-solutions" },
    { label: "AMC Services", href: "/amc-services" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const CONTACT_INFO = {
  address: "National Insurance Building, Office 603, Opposite Deira City Center, Deira, Dubai, United Arab Emirates",
  phone: "+971 52 207 6531",
  email: "meghna@artiflexit.com",
} as const;

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://ae.linkedin.com/company/artiflex-information-technology-llc", icon: "LinkedInIcon" },
] as const;
