import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "The smartphone is the most personal computer most people will ever own, and in any modern organisation it is also one of the most exposed. It holds corporate email, chat, files, MFA tokens, and VPN credentials, it travels through airports and coffee shops on untrusted networks, and it is lost or stolen far more often than any laptop. The discipline that grew up to defend it did not start with the iPhone. It started in the boardroom, with a single device that executives refused to put down.",
  },
  {
    type: "p",
    text: "This is how mobile security actually evolved, and why the modern answer is two products working together rather than one.",
  },
  {
    type: "callout",
    variant: "info",
    title: "The founding moment, the BlackBerry era",
    text: "When Research In Motion shipped BlackBerry Enterprise Server (BES) in 1999, it gave organisations the first practical way to manage a fleet of mobile devices centrally: push email securely, enforce a passcode, and wipe a lost handset over the air. Mobile security began as device control for a single, trusted, company-issued platform.",
  },
  {
    type: "h2",
    id: "gen-mdm",
    text: "Generation 1: Mobile Device Management (MDM), Controlling the Handset",
  },
  {
    type: "p",
    text: "In the BlackBerry world, security was simple because the environment was closed. The company bought the device, the company owned the device, and one server controlled every one of them. When the iPhone arrived in 2007 and Android in 2008, that model broke almost overnight. Employees wanted to use the devices they had chosen themselves, and they wanted corporate email on them.",
  },
  {
    type: "p",
    text: "Mobile Device Management was the first response. An MDM platform enrolled a device, applied a configuration profile, and gave IT a set of controls: enforce a passcode and encryption, push Wi-Fi and VPN settings, restrict the camera or app store, locate a device, and remotely wipe it if it was lost. MDM treated the phone the way earlier tools treated the laptop, as a managed asset with a policy attached.",
  },
  {
    type: "p",
    text: "It worked, but it carried a problem that defined the next decade. A full device wipe on a personal phone destroyed the employee's photos and messages along with the company's data. Managing the whole device was too blunt an instrument for a device the employee owned.",
  },
  {
    type: "h2",
    id: "gen-emm",
    text: "Generation 2: EMM and Containerization, Separating Work from Personal",
  },
  {
    type: "p",
    text: "Bring Your Own Device (BYOD) forced the industry to draw a line through the middle of the phone. Enterprise Mobility Management (EMM) added Mobile Application Management (MAM) and containerization to the MDM foundation. Instead of controlling the whole device, the platform created a managed work container: a separate, encrypted space holding corporate email, browser, and apps, governed by company policy, while the personal side stayed private and untouched.",
  },
  {
    type: "p",
    text: "This is the era that produced the controls organisations now take for granted. Selective wipe that removes only corporate data and leaves personal photos intact. App-level policies that block copy-paste from a work app into a personal one. Conditional access that checks a device's compliance state before it is allowed to reach a mailbox. The operating system vendors codified the split directly, Android Enterprise work profiles and Apple's managed-app framework, and EMM platforms orchestrated it.",
  },
  {
    type: "h2",
    id: "gen-uem",
    text: "Generation 3: Unified Endpoint Management (UEM), One Console for Everything",
  },
  {
    type: "p",
    text: "By the late 2010s, the artificial wall between mobile and traditional endpoints made less and less sense. A field worker might carry a phone, a tablet, and a rugged Windows handheld, and a knowledge worker might switch between a laptop and a phone hour to hour. Managing those through separate consoles was inefficient and produced inconsistent policy.",
  },
  {
    type: "p",
    text: "Unified Endpoint Management collapsed them into one. A UEM platform manages phones, tablets, laptops, desktops, kiosks, and rugged or purpose-built devices from a single console, across iOS, Android, Windows, and macOS, with one policy model and one compliance view. UEM is the management layer of mobile security in 2026: it answers who owns the device, what state it is in, what it is allowed to access, and how to get corporate data off it cleanly when an employee leaves.",
  },
  {
    type: "callout",
    variant: "warning",
    title: "Management is not the same as defence",
    text: "A managed, compliant, fully enrolled phone can still be compromised. UEM enforces policy and configuration. It does not, by itself, detect a malicious app, a phishing link in SMS, a network man-in-the-middle attack, or an OS-level exploit. That gap is exactly what the next generation was built to close.",
  },
  {
    type: "h2",
    id: "gen-mtd",
    text: "Generation 4: Mobile Threat Defense (MTD), Defending the Device Itself",
  },
  {
    type: "p",
    text: "As phones became the primary target for credential theft and as mobile-specific attacks matured, smishing (SMS phishing), malicious and side-loaded apps, rogue Wi-Fi access points, and zero-click exploits, a second discipline emerged alongside management. Mobile Threat Defense (MTD) is endpoint security for the phone.",
  },
  {
    type: "p",
    text: "An MTD agent runs on the device and watches the things a management policy cannot see. It analyses apps for malicious behaviour and excessive permissions, detects network attacks such as man-in-the-middle interception on untrusted Wi-Fi, flags OS vulnerabilities and jailbreak or root tampering, and blocks phishing links across SMS, email, and messaging apps. The strongest MTD platforms do this with on-device machine learning, so detection works even offline and without sending a user's content to the cloud, which matters for both speed and privacy.",
  },
  {
    type: "p",
    text: "MTD is to the phone what EDR and XDR are to the laptop. It assumes the device will be targeted and instruments it to detect and respond, rather than simply configuring it and hoping. Mature deployments integrate MTD signals back into UEM and conditional access, so a device that MTD flags as compromised is automatically blocked from corporate resources until it is remediated.",
  },
  {
    type: "stats",
    items: [
      {
        value: "1999",
        label: "BlackBerry BES ships",
        sublabel: "Centralised device control",
      },
      {
        value: "2007",
        label: "iPhone arrives",
        sublabel: "Consumer devices enter work",
      },
      {
        value: "UEM",
        label: "Management layer",
        sublabel: "One console, all endpoints",
      },
      {
        value: "MTD",
        label: "Defence layer",
        sublabel: "On-device threat detection",
      },
    ],
  },
  {
    type: "h2",
    id: "uae-implications",
    text: "What This History Tells UAE Businesses Today",
  },
  {
    type: "p",
    text: "If you are making mobile security decisions in 2026, the evolution above points to three practical conclusions.",
  },
  {
    type: "p",
    text: "The first is that management and defence are two different jobs. A UEM platform that enrolls and configures your fleet is necessary, but it is not the same as a tool that detects a malicious app or a phishing attack on the device. Treating UEM as your complete mobile security posture leaves the device itself undefended.",
  },
  {
    type: "p",
    text: "The second is that BYOD is a privacy problem as much as a security one. The right architecture separates corporate data from personal data cleanly, so you can enforce policy and wipe company information without ever touching an employee's private life. Containerization and work profiles are not optional niceties, they are what makes BYOD legally and culturally workable in the GCC.",
  },
  {
    type: "p",
    text: "The third is that the correct answer is usually a pairing. Our recommended baseline for most UAE mid-market and regulated fleets is [Hexnode for UEM and Zimperium for MTD](/cybersecurity/mobile-security): agile, value-led management combined with best-in-class on-device threat defense. For Microsoft-standardised estates we deploy Intune, for Apple-only estates Jamf, and we layer Zimperium or Lookout on top for threat defense in every case. The platform follows the assessment, not the other way around.",
  },
  {
    type: "h2",
    id: "where-artiflex",
    text: "Where Artiflex IT Comes In",
  },
  {
    type: "p",
    text: "Artiflex IT designs, deploys, and manages [mobile security across the UAE, Oman, and Saudi Arabia](/cybersecurity/mobile-security), from UEM enrollment and BYOD containerization through to MTD rollout and conditional-access integration. We work with Hexnode, Zimperium, Microsoft Intune, Jamf, Omnissa Workspace ONE, and Lookout, and we match the platform to your device mix, ownership model, and compliance obligations rather than to a single vendor relationship.",
  },
  {
    type: "p",
    text: "If your phones are enrolled in an MDM but have no threat defense on them, or if your BYOD programme is wiping personal data along with corporate data, we will show you exactly where the gaps are and what a clean two-layer design looks like.",
  },
  {
    type: "cta",
    title: "Free Mobile Security Assessment",
    description: "A 30-minute review of your current mobile fleet against modern UEM and MTD benchmarks. We will map where you are managed, where you are defended, and where you are exposed. No commitment.",
    href: "/contact",
    label: "Book Assessment",
  },
];
