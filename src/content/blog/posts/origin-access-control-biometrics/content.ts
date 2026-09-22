import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "In 1960 IBM engineer Forrest Parry was trying to figure out how to attach a strip of magnetic tape to a plastic card for an early IBM identification system. He had spent weeks experimenting unsuccessfully with adhesives. His wife Dorothea, watching him struggle one evening, suggested he use a domestic iron to melt the tape onto the plastic. It worked. The magnetic-stripe card, invented in a kitchen on the basis of household ironing advice, became the foundation of modern electronic access control.",
  },
  {
    type: "p",
    text: "Sixty-six years later, the magnetic stripe has been superseded by 125 kHz proximity, 13.56 MHz smart cards, mobile-phone credentials, fingerprint readers, facial recognition and iris scanning. The lock on the door is no longer a mechanical device with a tumbler; it is a software-defined identity gate that knows who the person is, what time it is, whether they should be there, and whether the building is currently in normal or escalated security posture.",
  },
  {
    type: "callout",
    variant: "info",
    title: "The credential that ended magstripe: 1995",
    text: "HID Global (founded 1991) introduced the 125 kHz HID Prox card in 1995 and replaced magnetic-stripe credentials across most US enterprise access control within a decade. The proximity card became the dominant credential format for 20 years before its own cryptographic weaknesses caught up with it.",
  },
  {
    type: "h2",
    id: "challenges",
    text: "Why this category had to exist",
  },
  {
    type: "p",
    text: "Through the 1990s and 2000s, mechanical and early electronic locks could not keep up with modern building operations. The pain points below forced the evolution from key to card to phone to face.",
  },
  {
    type: "ul",
    items: [
      "<strong>Physical keys did not scale.</strong> Every key in circulation was a potential security failure. Lost keys, copied keys, fired employees retaining keys, locksmiths producing duplicates: all combined to make any mechanical-key building above 50 people structurally insecure.",
      "<strong>Magnetic stripe cards were trivially cloned.</strong> By the late 1990s, magstripe readers and writers cost less than 100 dollars and were widely available. Anyone with motivation could clone a magstripe credential in seconds.",
      "<strong>125 kHz proximity also vulnerable.</strong> Low-frequency 125 kHz prox cards (HID Prox, Indala, AWID) were the default in much of the 2000s but used no cryptography on the credential. Cheap card-cloning devices were widely available by 2010.",
      "<strong>Audit trail did not match modern compliance.</strong> Mechanical locks have no audit trail. UAE NESA, ADHICS, ADGM and DFSA frameworks all require documented access audit trails.",
      "<strong>Visitor and contractor management was manual.</strong> Pre-modern access control, visitors signed paper books and contractors used universal master keys.",
      "<strong>Mobile-first workforces broke physical badges.</strong> Modern employees expect to access workplaces without producing a physical badge.",
    ],
  },
  {
    type: "h2",
    id: "chapter-1",
    text: "Chapter 1 (1960-1990): Magstripe and the First Card Access",
  },
  {
    type: "p",
    text: "IBM's magnetic-stripe card became commercially significant through the 1970s as banks adopted it for ATM and credit card use. ANSI standards for magnetic-stripe encoding were ratified in 1971 and 1972, giving the world a common format. Access control adopted the magnetic stripe in the late 1970s and early 1980s.",
  },
  {
    type: "p",
    text: "The Wiegand effect (discovered 1974) gave access control a competitive credential format: a card with embedded ferromagnetic wires that produced a distinctive electrical pulse pattern when swiped through a reader. Wiegand cards were harder to clone than magstripe and dominated certain segments of the market through the 1980s and 1990s.",
  },
  {
    type: "p",
    text: "Through this period access control was a physically-distinct system, separate from any computer network. Wiring ran from card readers to a local controller in a closet, often via 22 AWG twisted pair on its own dedicated cable plant.",
  },
  {
    type: "h2",
    id: "chapter-2",
    text: "Chapter 2 (1990-2005): Proximity, HID and the Rise of 125 kHz",
  },
  {
    type: "p",
    text: "HID Global introduced its 125 kHz proximity card range in the mid-1990s, originally branded as HID Prox. The technology was a step forward because the card did not need physical contact with the reader; users could present the card in a wallet or near a reader without removing it.",
  },
  {
    type: "p",
    text: "Through the late 1990s and 2000s, the access control software stack matured. Lenel (founded 1991, acquired by United Technologies / Carrier 2005), Software House (acquired by Tyco), AMAG, S2 Security and a long tail of regional vendors built enterprise Access Control as a Service (ACaaS) and on-premise platforms.",
  },
  {
    type: "p",
    text: "By 2005 most large UAE commercial buildings had electronic access control with proximity-card credentials, multiple-door controllers, and central management software. Audit trails, time-of-day restrictions, anti-passback rules and integration with HR systems became standard features.",
  },
  {
    type: "h2",
    id: "chapter-3",
    text: "Chapter 3 (2005-2015): Smart Cards, MIFARE and the Cryptographic Wars",
  },
  {
    type: "p",
    text: "By the mid-2000s, security researchers had demonstrated that 125 kHz proximity cards could be cloned with cheap commercial equipment. The industry needed cryptographic credentials. MIFARE Classic offered authentication and encryption, but its CRYPTO1 algorithm was reverse-engineered in 2008 and broken shortly after.",
  },
  {
    type: "p",
    text: "HID iCLASS (introduced 2002) used Triple-DES encryption and became the higher-security option through the 2000s and early 2010s. NXP MIFARE DESFire EV1 (2006), EV2 (2016) and EV3 (2020) used AES-128 and remain widely deployed today. HID SEOS (2013) uses similar cryptographic standards plus a more capable credential architecture.",
  },
  {
    type: "p",
    text: "UAE buildings that still rely on 125 kHz prox in 2026 are running with credentials that have not been cryptographically credible for over a decade. The migration to DESFire EV3, SEOS or equivalent should be treated as overdue maintenance, not an upgrade.",
  },
  {
    type: "h2",
    id: "chapter-4",
    text: "Chapter 4 (2010-2018): Biometrics Enter the Mainstream",
  },
  {
    type: "p",
    text: "Biometric access control existed in 1980s and 1990s niche applications but was operationally crude. Fingerprint readers had high false-rejection rates, were slow, and demanded clean hands. The technology matured gradually through the 2000s.",
  },
  {
    type: "p",
    text: "Suprema (founded 2000 Korea) emerged through the 2010s as the dominant enterprise biometric brand. Suprema fingerprint and facial-recognition readers became standard in UAE government buildings, banking premises, and high-security commercial deployments.",
  },
  {
    type: "p",
    text: "Facial recognition graduated from research to commercial deployment through the mid-2010s. By 2018 UAE deployments routinely used facial recognition at perimeter doors and dual-factor (card plus face) at high-security zones.",
  },
  {
    type: "h2",
    id: "chapter-5",
    text: "Chapter 5 (2018-2022): Mobile Credentials and Bluetooth Low Energy",
  },
  {
    type: "p",
    text: "The smartphone in every pocket created an obvious credential. Apple Wallet, Google Pay, and a generation of mobile credential platforms (HID Mobile Access, Suprema Mobile Access, Lenel BlueDiamond, Genetec) emerged to replace the physical badge.",
  },
  {
    type: "p",
    text: "By 2022 mobile credentials had become the default for new enterprise deployments globally. The operational economics were decisive: no card to issue, instant revocation when an employee leaves, lower replacement cost.",
  },
  {
    type: "p",
    text: "For UAE buildings, mobile credentials interacted with the Emirates ID and the UAE PASS digital identity in interesting ways. Some federal deployments now use Emirates ID NFC as the access credential, eliminating the per-building badge entirely.",
  },
  {
    type: "h2",
    id: "chapter-6",
    text: "Chapter 6 (2023-now): Cloud Access, AI and the Building as a Service",
  },
  {
    type: "p",
    text: "Cloud-managed access control (HID Origo, Brivo, Verkada Access, Genetec Synergis Cloud Link, Suprema Mercury) emerged as the dominant new-deployment architecture for SMB and distributed enterprise.",
  },
  {
    type: "p",
    text: "AI-driven access analytics now sit alongside traditional rule-based access policy. Behaviour anomaly detection, tailgating detection via video integration, and unified identity across logical (Active Directory) and physical (door) access all became baseline features through 2024.",
  },
  {
    type: "p",
    text: "For UAE deployments, the Smart City and Smart Building agendas have pushed access control into ever-tighter integration with other building systems: occupancy-based HVAC, elevator destination dispatch, parking management, and Workplace Experience platforms.",
  },
  {
    type: "stats",
    items: [
      {
        value: "1960",
        label: "Magnetic stripe card invented",
        sublabel: "Forrest Parry uses a domestic iron",
      },
      {
        value: "1995",
        label: "HID Prox card launched",
        sublabel: "proximity becomes the default credential",
      },
      {
        value: "2002",
        label: "HID iCLASS introduced",
        sublabel: "cryptographic credentials begin",
      },
      {
        value: "2013",
        label: "HID SEOS launches",
        sublabel: "modern high-security credential standard",
      },
      {
        value: "2018",
        label: "Mobile credentials mainstream",
        sublabel: "phone replaces the badge",
      },
      {
        value: "2024",
        label: "AI-driven access analytics",
        sublabel: "behaviour-based access becomes standard",
      },
    ],
  },
  {
    type: "h2",
    id: "uae-implications",
    text: "What Access Control History Tells UAE Businesses Today",
  },
  {
    type: "p",
    text: "Three principles drive UAE access control decisions in 2026. First, 125 kHz prox credentials should be replaced wherever they are still deployed. DESFire EV3, SEOS or equivalent cryptographically-credible smart cards are the practical floor for any new installation, with mobile credentials as the increasingly common default.",
  },
  {
    type: "p",
    text: "Second, biometric access (fingerprint, facial) is now mainstream and inexpensive enough to specify for any high-security zone. Suprema, IDEMIA, ZKTeco, Hanwha and Anviz all have credible UAE deployments.",
  },
  {
    type: "p",
    text: "Third, integration with the wider Smart Building stack matters more than ever. Modern UAE deployments expect access control to talk to video surveillance, intrusion detection, visitor management, HR systems and increasingly the Emirates ID or UAE PASS digital identity.",
  },
  {
    type: "h2",
    id: "where-artiflex",
    text: "Where Artiflex IT Comes In",
  },
  {
    type: "p",
    text: "Artiflex IT has been designing, deploying, and managing [infrastructure across the UAE, Oman, and Saudi Arabia](/infrastructure) for over 14 years. We work with HID, Suprema, IDEMIA, ZKTeco, Lenel, Genetec, Brivo, Verkada and the broader access control ecosystem as the use case requires.",
  },
  {
    type: "cta",
    title: "Free Access Control Posture Review",
    description: "60-minute review of your current credential format, reader and panel infrastructure, audit-trail compliance, biometric readiness and recommended modernisation plan.",
    href: "/contact",
    label: "Book Assessment",
  },
];
