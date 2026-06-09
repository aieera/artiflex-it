export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/cybersecurity",
    children: [
      {
        name: "Cybersecurity",
        description: "Advanced threat protection & SOC services",
        href: "/cybersecurity",
        icon: "ShieldIcon",
        children: [
          {
            name: "Firewalls & Network Security",
            href: "/cybersecurity/firewalls-network-security",
            children: [
              { name: "Sophos XGS", href: "/cybersecurity/firewalls/sophos-xgs", icon: "/logos/sophos.svg" },
              { name: "Check Point Quantum", href: "/cybersecurity/firewalls/check-point-quantum", icon: "/logos/Check-Point-2024-logo-color.svg" },
              { name: "Palo Alto PA-Series", href: "/cybersecurity/firewalls/palo-alto-networks", icon: "/logos/PaloAltoNetworks.svg" },
              { name: "Cisco Secure Firewall", href: "/cybersecurity/firewalls/cisco-secure-firewall", icon: "/logos/Cisco.svg" },
              { name: "Fortinet FortiGate", href: "/cybersecurity/firewalls/fortinet-fortigate", icon: "/logos/Fortinet.svg" },
              { name: "SonicWall TZ and NSa", href: "/cybersecurity/firewalls/sonicwall", icon: "/logos/SonicWall.svg" },
            ],
          },
          {
            name: "Unified Firewall Management (UFM)",
            href: "/cybersecurity/unified-firewall-management",
          },
          {
            name: "Endpoint Security (EDR & XDR)",
            href: "/cybersecurity/endpoint-security-edr-xdr",
            // description: "Behavioural endpoint detection & response, ransomware rollback, threat hunting, managed MDR."
            children: [
              { name: "Sophos Endpoint", href: "/cybersecurity/endpoint/sophos-endpoint", icon: "/logos/sophos.svg" },
              { name: "CrowdStrike Falcon", href: "/cybersecurity/endpoint/crowdstrike-falcon", icon: "/logos/CrowdStrike.webp" },
              { name: "SentinelOne Singularity", href: "/cybersecurity/endpoint/sentinelone-singularity", icon: "/logos/SentinelOne.png" },
              { name: "Palo Alto Cortex XDR", href: "/cybersecurity/endpoint/palo-alto-cortex-xdr", icon: "/logos/PaloAltoNetworks.svg" },
              { name: "Cisco Secure Endpoint", href: "/cybersecurity/endpoint/cisco-secure-endpoint", icon: "/logos/Cisco.svg" },
              { name: "Bitdefender GravityZone", href: "/cybersecurity/endpoint/bitdefender-gravityzone", icon: "/logos/Bitdefender.png" },
              { name: "Microsoft Defender for Endpoint", href: "/cybersecurity/endpoint/microsoft-defender-endpoint", icon: "/logos/microsoft.svg" },
              { name: "Check Point Harmony Endpoint", href: "/cybersecurity/endpoint/check-point-harmony", icon: "/logos/Check-Point-2024-logo-color.svg" },
              { name: "Trend Micro Apex One", href: "/cybersecurity/endpoint/trend-micro-vision-one", icon: "/logos/Trend_Micro.svg" },
              { name: "ESET PROTECT", href: "/cybersecurity/endpoint/eset-protect", icon: "/logos/ESET.svg" },
            ],
          },
          {
            name: "Mobile Security",
            href: "/cybersecurity/mobile-security",
            children: [
              { name: "Hexnode UEM", href: "/cybersecurity/mobile-security/hexnode", icon: "/logos/Hexnode.png" },
              { name: "Zimperium MTD", href: "/cybersecurity/mobile-security/zimperium", icon: "/logos/Zimperium.png" },
              { name: "Sophos Mobile", href: "/cybersecurity/mobile-security/sophos-mobile", icon: "/logos/sophos.svg" },
              { name: "Jamf", href: "/cybersecurity/mobile-security/jamf", icon: "/logos/Jamf.png" },
              { name: "Microsoft Intune", href: "/cybersecurity/mobile-security/microsoft-intune", icon: "/logos/microsoft.svg" },
              { name: "Omnissa Workspace ONE", href: "/cybersecurity/mobile-security/omnissa-workspace-one", icon: "/logos/Workspace ONE.webp" },
              { name: "Lookout Mobile Endpoint Security", href: "/cybersecurity/mobile-security/lookout", icon: "/logos/Lookout.png" },
            ],
          },
          {
            name: "OT / ICS Security",
            href: "/cybersecurity/ot-ics-security",
            children: [
              { name: "Nozomi Networks Guardian", href: "/cybersecurity/ot-ics-security/nozomi", icon: "/logos/Nozomi.png" },
              { name: "Tenable OT Security", href: "/cybersecurity/ot-ics-security/tenable", icon: "/logos/tenable.png" },
              { name: "Claroty xDome / CTD", href: "/cybersecurity/ot-ics-security/claroty", icon: "/logos/Claroty.webp" },
              { name: "Dragos Platform", href: "/cybersecurity/ot-ics-security/dragos", icon: "/logos/Dragos.png" },
              { name: "Microsoft Defender for IoT", href: "/cybersecurity/ot-ics-security/microsoft-defender-iot", icon: "/logos/MicrosoftDefender.webp" },
            ],
          },
          // {
          //   name: "Email Security Vendors",
          //   href: "/cybersecurity/email-security-vendors",
          //   description: "Defend against phishing, malware, and business email compromise attacks."
          // },
          {
            name: "Email Security for Business",
            href: "/cybersecurity/email-security",
            // description: "Phishing protection, DMARC, and AI-powered email defence for business inboxes."
            children: [
              { name: "Check Point Harmony Email & Collaboration", href: "/cybersecurity/email/check-point-harmony-email", icon: "/logos/Check-Point-2024-logo-color.svg" },
              { name: "Proofpoint Email Protection", href: "/cybersecurity/email/proofpoint", icon: "/logos/Proofpoint.jpg.svg" },
              { name: "Abnormal AI", href: "/cybersecurity/email/abnormal-ai", icon: "/logos/Abnormal.png" },
              { name: "Sophos Email Security", href: "/cybersecurity/email/sophos-email", icon: "/logos/sophos.svg" },
              { name: "Mimecast Email Security", href: "/cybersecurity/email/mimecast", icon: "/logos/mimecast.svg" },
              { name: "Fortra Email Security", href: "/cybersecurity/email/fortra-email-security", icon: "/logos/Fortra.png" },
              { name: "Barracuda Email Protection", href: "/cybersecurity/email/barracuda-email-protection", icon: "/logos/Barracuda.png" },
              { name: "Darktrace/Email", href: "/cybersecurity/email/darktrace-email", icon: "/logos/Darktrace.png" },
              { name: "KnowBe4 Security Awareness Training", href: "/cybersecurity/email/knowbe4-defend", icon: "/logos/KnowBe4.webp" },
              { name: "Microsoft Defender for Office 365", href: "/cybersecurity/email/microsoft-defender-o365", icon: "/logos/microsoft.svg" },
            ],
          },
          {
            name: "Identity & Access Security",
            href: "/cybersecurity/identity-access-security",
            // description: "IAM, MFA, PAM and IGA, Microsoft Entra, Okta, Ping, CyberArk, SailPoint, Saviynt."
            children: [
              { name: "Identity & Access Management (IAM)", href: "/cybersecurity/identity-access-security/iam", children: [
                { name: "Saviynt", href: "/cybersecurity/iam/saviynt", icon: "/logos/Saviynt.png" },
                { name: "Okta", href: "/cybersecurity/iam/okta", icon: "/logos/Okta.png" },
                { name: "Ping Identity", href: "/cybersecurity/iam/ping-identity", icon: "/logos/pingidentity.png" },
                { name: "Microsoft Entra ID", href: "/cybersecurity/iam/microsoft-entra", icon: "/logos/microsoft.svg" },
                { name: "IBM Security IAM", href: "/cybersecurity/iam/ibm-security", icon: "/logos/IBM-Security.png" },
                { name: "Oracle Identity", href: "/cybersecurity/iam/oracle", icon: "/logos/Oracle.png" },
                { name: "One Identity", href: "/cybersecurity/iam/one-identity", icon: "/logos/OneIdentity.png" },
                { name: "JumpCloud", href: "/cybersecurity/iam/jumpcloud", icon: "/logos/JumpCloud.webp" },
              ] },
              { name: "Privileged Access (PAM)", href: "/cybersecurity/identity-access-security/pam", children: [
                { name: "BeyondTrust", href: "/cybersecurity/pam/beyondtrust", icon: "/logos/BeyondTrust.webp" },
                { name: "CyberArk", href: "/cybersecurity/pam/cyberark", icon: "/logos/CyberArk.png" },
                { name: "Fortra PAM", href: "/cybersecurity/pam/fortra", icon: "/logos/Fortra.png" },
                { name: "Delinea", href: "/cybersecurity/pam/delinea", icon: "/logos/Delinea.webp" },
                { name: "One Identity Safeguard", href: "/cybersecurity/pam/one-identity-safeguard", icon: "/logos/OneIdentity.png" },
                { name: "Saviynt PAM", href: "/cybersecurity/pam/saviynt-pam", icon: "/logos/Saviynt.png" },
                { name: "Microsoft Entra PIM", href: "/cybersecurity/pam/microsoft-entra-pim", icon: "/logos/microsoft.svg" },
                { name: "HashiCorp Vault", href: "/cybersecurity/pam/hashicorp-vault", icon: "/logos/HashiCorp.png" },
                { name: "Senhasegura", href: "/cybersecurity/pam/senhasegura" },
              ] },
              { name: "Identity Governance (IGA)", href: "/cybersecurity/identity-access-security/iga", children: [
                { name: "Saviynt Identity Cloud", href: "/cybersecurity/iga/saviynt", icon: "/logos/Saviynt.png" },
                { name: "SailPoint", href: "/cybersecurity/iga/sailpoint", icon: "/logos/sailpoint.webp" },
                { name: "One Identity Manager", href: "/cybersecurity/iga/one-identity-manager", icon: "/logos/OneIdentity.png" },
                { name: "Microsoft Entra ID Governance", href: "/cybersecurity/iga/microsoft-entra-id-governance", icon: "/logos/microsoft.svg" },
                { name: "Omada Identity Cloud", href: "/cybersecurity/iga/omada-identity" },
                { name: "Oracle Identity Governance", href: "/cybersecurity/iga/oracle-identity-governance", icon: "/logos/Oracle.png" },
                { name: "IBM Verify Governance", href: "/cybersecurity/iga/ibm-security-igi", icon: "/logos/IBM-Security.png" },
              ] },
              { name: "Multi-Factor Authentication (MFA)", href: "/cybersecurity/identity-access-security/mfa", children: [
                { name: "Okta Adaptive MFA", href: "/cybersecurity/mfa/okta-mfa", icon: "/logos/Okta.png" },
                { name: "Microsoft Entra MFA", href: "/cybersecurity/mfa/microsoft-entra-mfa", icon: "/logos/microsoft.svg" },
                { name: "Cisco Duo", href: "/cybersecurity/mfa/cisco-duo", icon: "/logos/Cisco.svg" },
                { name: "RSA SecurID Access", href: "/cybersecurity/mfa/rsa-securid", icon: "/logos/RSA_SecurID.png" },
                { name: "Yubico (YubiKey)", href: "/cybersecurity/mfa/yubico", icon: "/logos/yubico.svg" },
                { name: "Google Workspace MFA", href: "/cybersecurity/mfa/google-workspace-mfa", icon: "/logos/Google-Cloud.webp" },
              ] },
            ],
          },

          {
            name: "SASE & Zero Trust",
            href: "/cybersecurity/workspace-protection-sse-sase",
            // description: "Replace legacy VPNs with Zero Trust, CASB, and SASE, securing remote work and SaaS access end-to-end."
            children: [
              { name: "Sophos Workspace Protection", href: "/cybersecurity/workspace/sophos-workspace-protection", icon: "/logos/sophos.svg" },
              { name: "Palo Alto Prisma Access", href: "/cybersecurity/workspace/palo-alto-prisma-access", icon: "/logos/PaloAltoNetworks.svg" },
              { name: "Check Point Harmony SASE", href: "/cybersecurity/workspace/check-point-harmony-sase", icon: "/logos/Check-Point-2024-logo-color.svg" },
              { name: "Netskope SSE", href: "/cybersecurity/workspace/netskope-sse", icon: "/logos/Netscope.png" },
              { name: "Microsoft Defender for Cloud Apps", href: "/cybersecurity/workspace/microsoft-mcas", icon: "/logos/MicrosoftDefender.webp" },
            ],
          },
          {
            name: "Security Operations",
            href: "/cybersecurity/security-operations",
            children: [
              { name: "MDR", href: "/cybersecurity/security-operations/mdr", children: [
                { name: "Sophos MDR Complete", href: "/cybersecurity/security-operations/mdr/sophos-mdr", icon: "/logos/sophos.svg" },
                { name: "Secureworks Taegis MXDR", href: "/cybersecurity/security-operations/mdr/secureworks", icon: "/logos/Secureworks.png" },
                { name: "Rapid7 MDR", href: "/cybersecurity/security-operations/mdr/rapid7-mdr", icon: "/logos/rapid7.png" },
                { name: "CrowdStrike Falcon Complete", href: "/cybersecurity/security-operations/mdr/crowdstrike", icon: "/logos/CrowdStrike.webp" },
                { name: "SentinelOne Vigilance", href: "/cybersecurity/security-operations/mdr/sentinelone", icon: "/logos/SentinelOne.png" },
                { name: "Arctic Wolf MDR", href: "/cybersecurity/security-operations/mdr/arctic-wolf", icon: "/logos/arctic-wolf.png" },
                { name: "Microsoft Defender Experts", href: "/cybersecurity/security-operations/mdr/microsoft", icon: "/logos/MicrosoftDefender.webp" },
              ] },
              { name: "NDR", href: "/cybersecurity/security-operations/ndr", children: [
                { name: "LinkShadow", href: "/cybersecurity/security-operations/ndr/linkshadow", icon: "/logos/LinkShadow.png" },
                { name: "Sophos NDR", href: "/cybersecurity/security-operations/ndr/sophos-ndr", icon: "/logos/sophos.svg" },
                { name: "Darktrace / NETWORK", href: "/cybersecurity/security-operations/ndr/darktrace", icon: "/logos/Darktrace.png" },
                { name: "Vectra AI", href: "/cybersecurity/security-operations/ndr/vectra", icon: "/logos/Vectra.png" },
                { name: "ExtraHop RevealX", href: "/cybersecurity/security-operations/ndr/extrahop", icon: "/logos/ExtraHop.png" },
                { name: "Arista NDR", href: "/cybersecurity/security-operations/ndr/arista", icon: "/logos/Arista.png" },
                { name: "Trellix NDR", href: "/cybersecurity/security-operations/ndr/trellix", icon: "/logos/Trellix.png" },
                { name: "Corelight Open NDR", href: "/cybersecurity/security-operations/ndr/corelight", icon: "/logos/Corelight.png" },
              ] },
              { name: "SIEM", href: "/cybersecurity/security-operations/siem", children: [
                { name: "Rapid7 InsightIDR", href: "/cybersecurity/security-operations/siem/rapid7", icon: "/logos/rapid7.png" },
                { name: "Cisco Splunk ES", href: "/cybersecurity/security-operations/siem/splunk", icon: "/logos/Splunk.webp" },
                { name: "Exabeam", href: "/cybersecurity/security-operations/siem/exabeam", icon: "/logos/Exabeam.png" },
                { name: "Microsoft Sentinel", href: "/cybersecurity/security-operations/siem/sentinel", icon: "/logos/MicrosoftDefender.webp" },
                { name: "IBM QRadar", href: "/cybersecurity/security-operations/siem/qradar", icon: "/logos/IBM-Security.png" },
                { name: "Secureworks Taegis", href: "/cybersecurity/security-operations/siem/secureworks", icon: "/logos/Secureworks.png" },
                { name: "Wazuh OSS", href: "/cybersecurity/security-operations/siem/wazuh", icon: "/logos/Wazuh.png" },
              ] },
            ],
          },
          {
            name: "Vulnerability & Exposure Management",
            href: "/cybersecurity/vulnerability-management",
            // description: "Penetration testing, vulnerability assessment & red teaming, find your weaknesses before attackers do."
            children: [
              { name: "Sophos Managed Risk", href: "/cybersecurity/vulnerability-management/sophos-managed-risk", icon: "/logos/sophos.svg" },
              { name: "Rapid7 InsightVM", href: "/cybersecurity/vulnerability-management/rapid7-insightvm", icon: "/logos/rapid7.png" },
              { name: "Fortra Tripwire", href: "/cybersecurity/vulnerability-management/fortra-tripwire", icon: "/logos/Fortra.png" },
              { name: "Tenable One", href: "/cybersecurity/vulnerability-management/tenable", icon: "/logos/tenable.png" },
              { name: "Mandiant (Google Cloud)", href: "/cybersecurity/vulnerability-management/mandiant", icon: "/logos/Mandiant.png" },
              { name: "Qualys VMDR", href: "/cybersecurity/vulnerability-management/qualys-vmdr", icon: "/logos/qualys.png" },
              { name: "Microsoft Defender Vulnerability Management", href: "/cybersecurity/vulnerability-management/microsoft-defender-vm", icon: "/logos/MicrosoftDefender.webp" },
            ],
          },
          {
            name: "Data Security & DLP",
            href: "/cybersecurity/data-loss-prevention",
            children: [
              { name: "Fortra Data Security", href: "/cybersecurity/dlp/fortra-dlp", icon: "/logos/Fortra.png" },
              { name: "Check Point Harmony DLP", href: "/cybersecurity/dlp/check-point-harmony-dlp", icon: "/logos/Check-Point-2024-logo-color.svg" },
              { name: "Netskope Data Security", href: "/cybersecurity/dlp/netskope-dlp", icon: "/logos/Netscope.png" },
              { name: "Symantec Data Loss Prevention", href: "/cybersecurity/dlp/symantec-dlp-broadcom", icon: "/logos/Symantec.png" },
              { name: "Trellix Data Loss Prevention", href: "/cybersecurity/dlp/trellix-dlp", icon: "/logos/Trellix.png" },
              { name: "Forcepoint Data Security", href: "/cybersecurity/dlp/forcepoint-dlp", icon: "/logos/forcepoint.png" },
              { name: "Microsoft Purview DLP", href: "/cybersecurity/dlp/microsoft-purview-dlp", icon: "/logos/microsoft.svg" },
              { name: "Sophos Data Protection", href: "/cybersecurity/dlp/sophos-dlp", icon: "/logos/sophos.svg" },
            ],
          },

        ]
      },
      {
        name: "Cloud Solutions",
        description: "Secure cloud migration & management",
        href: "/cloud-solutions",
        icon: "CloudIcon",
        children: [
          { name: "Public Cloud (Azure, AWS, GCP, OCI)", href: "/cloud-solutions/public-cloud" },
          { name: "Private Cloud Deployment", href: "/cloud-solutions/private-cloud" },
          { name: "Hybrid Cloud Solutions", href: "/cloud-solutions/hybrid-cloud" },
          { name: "Multi-Cloud Strategy", href: "/cloud-solutions/multi-cloud-strategy" },
          { name: "Cloud Migration Services", href: "/cloud-solutions/cloud-migration" },
          { name: "Backup as a Service", href: "/cloud-solutions/backup-as-a-service" },
          { name: "Disaster Recovery", href: "/cloud-solutions/disaster-recovery-solutions-dubai" },
        ],
      },
      {
        name: "Infrastructure",
        description: "Enterprise network & data center design",
        href: "/infrastructure",
        icon: "ServerIcon",
        children: [
          { name: "Data Center Infrastructure", href: "/infrastructure/data-center" },
          { name: "Servers, Compute & Virtualization", href: "/infrastructure/servers-compute-virtualization" },
          { name: "Backup Management Solution", href: "/infrastructure/backup-data-management" },
          { name: "Storage Solution", href: "/infrastructure/storage-solutions" },
          { name: "Document Management Systems (DMS)", href: "/infrastructure/document-management-systems" },
          { name: "Network Infrastructure", href: "/infrastructure/network-infrastructure" },
          { name: "Wireless Solutions", href: "/infrastructure/wireless-solutions" },
          { name: "Structured Cabling", href: "/infrastructure/structured-cabling" },
          { name: "Unified Communication & Telephony", href: "/infrastructure/unified-communication-telephony" },
          { name: "Video Conferencing & Collaboration", href: "/infrastructure/video-conferencing-collaboration" },
          { name: "CCTV, Surveillance & Physical Security", href: "/infrastructure/cctv-surveillance" },
          { name: "Access Control & Biometrics", href: "/infrastructure/access-control-biometrics" },
          { name: "Power & UPS Solutions", href: "/infrastructure/power-ups" },
          { name: "Printing Solutions", href: "/infrastructure/printing-document-solutions" },
        ],
      },
      { name: "Managed Services", description: "24/7 monitoring & IT operations", href: "/managed-services", icon: "GearIcon" },
      { name: "Application Security", description: "Web app & API penetration testing", href: "/application-security-solutions", icon: "GlobeIcon" },
      {
        name: "Business Solutions",
        description: "ERP, CRM, Finance & HRM on one platform",
        href: "/business-solutions",
        icon: "LayersIcon",
        children: [
          {
            name: "ERP Software",
            href: "/business-solutions/erp-software",
          },
          {
            name: "CRM & Sales Management Software",
            href: "/business-solutions/crm-software",
          },
          {
            name: "Finance & Accounting Software",
            href: "/business-solutions/finance-accounting-software",
          },
          {
            name: "HRM Software",
            href: "/business-solutions/hr-management-software",
          },
        ]
      }]
  },
  { label: "Vendors", href: "/vendors" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
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
  { name: "Huawei", src: "/logos/huawei.png" },
  { name: "Trend Micro", src: "/logos/Trend_Micro.svg" },
  { name: "SonicWall", src: "/logos/SonicWall.svg" },
  { name: "Proofpoint", src: "/logos/Proofpoint.jpg.svg" },
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
  { name: "ACC", src: "/logos/acc.svg" },
  { name: "Al Nasr", src: "/logos/alnasr.svg" },
  { name: "Shaw", src: "/logos/shaw.svg" },
  { name: "NBTC", src: "/logos/nbtc.svg" },
] as const;

export const FOOTER_LINKS = {
  services: [
    { label: "Cybersecurity", href: "/cybersecurity" },
    { label: "Business Solutions", href: "/business-solutions" },
    { label: "Cloud Solutions", href: "/cloud-solutions" },
    { label: "Infrastructure", href: "/infrastructure" },
    { label: "Managed Services", href: "/managed-services" },
    { label: "Application Security", href: "/application-security-solutions" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Vendors", href: "/vendors" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const CONTACT_INFO = {
  address: "Malik Saeed Suhail Saeed Bin Daliwi Al-Kutbi - Bardab - First Commercial Center 45B - Office No.102, Dubai, United Arab Emirates",
  phone: "+971 52 207 6531",
  email: "info@artiflexit.com",
} as const;

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://ae.linkedin.com/company/artiflex-information-technology-llc", icon: "LinkedInIcon" },
] as const;
