import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "On the afternoon of 10 March 1876, Alexander Graham Bell shouted into a primitive transmitter, \"Mr. Watson, come here, I want to see you,\" and his assistant heard him in the next room. It was the first intelligible telephone call. Bell received the patent for the telephone four days earlier, on 7 March 1876, in what would become the most valuable patent in business history.",
  },
  {
    type: "p",
    text: "One hundred and fifty years later, a UAE knowledge worker takes a customer call on a laptop, transfers it to a mobile phone in a taxi, conferences in a colleague from Saudi Arabia, shares a Microsoft Teams screen, transcribes the call automatically, and logs the conversation against the customer's CRM record. The physical phone has disappeared into a software experience, and Bell would not recognise a single piece of the architecture.",
  },
  {
    type: "callout",
    variant: "info",
    title: "The day voice became software: 25 March 1999",
    text: "The first version of the Session Initiation Protocol (SIP) was published as RFC 2543 in March 1999. SIP became the universal signalling protocol for IP voice and video. Every modern enterprise phone system, every cloud calling platform, every video conferencing service speaks SIP at some level.",
  },
  {
    type: "h2",
    id: "challenges",
    text: "Why this category had to exist",
  },
  {
    type: "p",
    text: "Through the 1990s and 2000s, business telephony went through three structural revolutions in quick succession. The pain points below forced each transition.",
  },
  {
    type: "ul",
    items: [
      "<strong>PBX cost and complexity.</strong> A traditional PBX (Avaya, Nortel, Siemens) cost hundreds of thousands of dollars, required specialised technicians, and was the single most rigid piece of corporate infrastructure.",
      "<strong>Voice and data on separate networks.</strong> Through the 1990s, voice ran on its own infrastructure (TDM, ISDN, T1/E1) and data ran on Ethernet. Maintaining two parallel networks doubled the cost and the operational surface area.",
      "<strong>Mobile workers stranded.</strong> Pre-IP telephony, an employee was reachable only at their desk. Mobile phone numbers were personal and not integrated with the corporate phone system.",
      "<strong>Cost per international call.</strong> International long-distance was the largest line item in many corporate phone bills through the 1990s. Skype (2003) and SIP trunking ended that overnight.",
      "<strong>Multi-vendor integration nightmare.</strong> Pre-SIP, integrating a phone system from one vendor with another vendor's call centre, voicemail or contact centre required vendor-specific gateways and endless professional services.",
      "<strong>Hybrid work after 2020.</strong> The 2020 pandemic exposed every PBX deployment that relied on physical desk phones. Workers at home needed enterprise voice immediately. Cloud telephony went from optional to mandatory in 18 months.",
    ],
  },
  {
    type: "h2",
    id: "chapter-1",
    text: "Chapter 1 (1876-1980): The Bell System and the Mechanical PBX",
  },
  {
    type: "p",
    text: "Bell's 1876 patent created the telephone industry. By 1900 the Bell System operated millions of lines. The Private Branch Exchange (PBX) emerged in the early 1900s as a way for a single business to share a small number of external lines among many internal extensions.",
  },
  {
    type: "p",
    text: "Through the 1950s and 1960s, PBX systems became more sophisticated but the basic architecture remained analog. Bell System products from Western Electric dominated US markets; in Europe, equivalents from Siemens, Ericsson, Plessey and others held national markets.",
  },
  {
    type: "p",
    text: "By the late 1970s, electronic PBX systems were replacing the mechanical generation. The Nortel SL-1 (1975), Rolm CBX (1975), Mitel SX-2000 (1981) and AT&T System 75 (1983) all moved business telephony from electromechanical to digital electronic switching.",
  },
  {
    type: "h2",
    id: "chapter-2",
    text: "Chapter 2 (1980-1998): The Digital PBX Era",
  },
  {
    type: "p",
    text: "The digital PBX dominated enterprise telephony through the 1980s and 1990s. Nortel Meridian (1981), Avaya / Lucent / AT&T Definity (1983), Mitel SX-2000, Siemens HiCom, Alcatel 4400 and a handful of others equipped most of the world's office buildings.",
  },
  {
    type: "p",
    text: "The digital PBX could now do features that the mechanical generation could not: automated call distribution (ACD) for call centres, automated attendants, voicemail integration, conference calling, call recording, and unified messaging where voicemail arrived as an email attachment.",
  },
  {
    type: "p",
    text: "The 1996 Telecommunications Act in the US deregulated long-distance and reshaped corporate telephony economics. Competitive local exchange carriers (CLECs), least-cost routing and per-call optimisation algorithms compressed the cost of voice transmission rapidly.",
  },
  {
    type: "h2",
    id: "chapter-3",
    text: "Chapter 3 (1995-2005): VoIP Arrives and SIP Standardises",
  },
  {
    type: "p",
    text: "Voice over IP existed in the early 1990s as an academic curiosity. VocalTec's Internet Phone (1995) was the first commercial product to make IP voice usable for ordinary consumers. Cisco's introduction of CallManager (1998) and the Cisco IP phone marked the start of credible enterprise VoIP.",
  },
  {
    type: "p",
    text: "The Session Initiation Protocol (SIP) was published as RFC 2543 in March 1999. SIP became the universal signalling protocol for IP voice. Skinny Client Control Protocol (SCCP, Cisco proprietary), H.323 and a handful of vendor-specific protocols competed initially, but SIP's openness made it the standard within a decade.",
  },
  {
    type: "p",
    text: "By 2005 most new enterprise phone deployments were IP-based. Avaya, Nortel, Cisco, Mitel and a handful of others competed fiercely. The PBX as a physical room full of wiring blocks gave way to a server in the data centre and IP phones on the desk.",
  },
  {
    type: "h2",
    id: "chapter-4",
    text: "Chapter 4 (2003-2015): Skype, Cloud Calling and the Death of the Long-Distance Bill",
  },
  {
    type: "p",
    text: "Skype, founded in 2003 by Janus Friis and Niklas Zennstrom, made consumer voice over IP free at the point of use globally. The peer-to-peer architecture, the encryption, and the price (zero) reshaped consumer voice habits within a few years. Microsoft acquired Skype in 2011 for 8.5 billion dollars.",
  },
  {
    type: "p",
    text: "On the enterprise side, hosted PBX (cloud-delivered PBX with no on-premise hardware required) emerged from companies like RingCentral, 8x8, Vonage Business and ShoreTel. The architectural direction (move the PBX out of the customer site) became unmistakable through the 2010s.",
  },
  {
    type: "p",
    text: "SIP trunking replaced T1 and ISDN PRI for delivering external calls to the enterprise. By 2015 most new deployments used SIP trunks to multiple carriers. The long-distance bill that had been a top-three IT operating cost in 1995 was a rounding error by 2015.",
  },
  {
    type: "h2",
    id: "chapter-5",
    text: "Chapter 5 (2015-2020): Microsoft Teams Phone, Webex Calling and the Cloud Consolidation",
  },
  {
    type: "p",
    text: "Skype for Business (rebranded from Lync) had become Microsoft's enterprise voice play through the early 2010s. Microsoft announced Teams in March 2017 and started phasing out Skype for Business in 2018. Teams absorbed enterprise messaging, meetings, voice and collaboration into a single application.",
  },
  {
    type: "p",
    text: "Microsoft Teams Phone, added in 2018, delivered cloud-PBX functionality natively inside Teams. Combined with Operator Connect and Direct Routing for PSTN, Teams Phone became the dominant new-deployment enterprise telephony platform globally within five years.",
  },
  {
    type: "p",
    text: "By 2020 the question was no longer whether to move enterprise voice to the cloud but how quickly. New PBX hardware sales collapsed; the maintenance contracts on existing PBX hardware became the largest revenue stream for the legacy vendors.",
  },
  {
    type: "h2",
    id: "chapter-6",
    text: "Chapter 6 (2020-now): AI Voice and the Disappearance of the Phone",
  },
  {
    type: "p",
    text: "Generative AI has reshaped voice again. Live transcription, real-time summarisation, sentiment analysis, automated follow-up actions and natural-language voice assistants have moved from research demos to production features in Teams, Webex, Zoom and the major contact-centre platforms.",
  },
  {
    type: "p",
    text: "The phone as a physical device has largely disappeared from new deployments. Knowledge workers in 2026 receive their work calls on a laptop, a mobile, or a meeting-room speaker phone. Desk phones persist in specific roles (reception, call centre, healthcare clinical staff) but the dedicated desk phone for every employee is now a legacy pattern.",
  },
  {
    type: "p",
    text: "For UAE customers, the choice is increasingly between Microsoft Teams Phone, Cisco Webex Calling, Zoom Phone and Avaya / Mitel cloud. The voice infrastructure that started with Bell shouting \"Mr Watson, come here\" is, in 2026, a soft-phone window inside a productivity application.",
  },
  {
    type: "stats",
    items: [
      {
        value: "1876",
        label: "Bell patent and first call",
        sublabel: "telephony begins",
      },
      {
        value: "1981",
        label: "Nortel Meridian 1 / Digital PBX era",
        sublabel: "enterprise voice modernises",
      },
      {
        value: "1999",
        label: "SIP RFC 2543 published",
        sublabel: "IP voice standardised",
      },
      {
        value: "2003",
        label: "Skype founded",
        sublabel: "consumer VoIP goes mass-market",
      },
      {
        value: "2017",
        label: "Microsoft Teams launched",
        sublabel: "unified communications consolidates",
      },
      {
        value: "2023",
        label: "AI voice features mainstream",
        sublabel: "transcription and summarisation become standard",
      },
    ],
  },
  {
    type: "h2",
    id: "uae-implications",
    text: "What UC History Tells UAE Businesses Today",
  },
  {
    type: "p",
    text: "Three principles shape UAE UC decisions in 2026. First, cloud calling is the new default. Microsoft Teams Phone, Webex Calling and Zoom Phone all have UAE-region presence and PSTN connectivity. On-premise PBX persists only for very specific compliance or sovereignty mandates.",
  },
  {
    type: "p",
    text: "Second, the desk phone is optional. Most knowledge-worker deployments are software-only with optional headset and a meeting-room speakerphone. Hardware-heavy deployments persist in call centres, reception, healthcare and hospitality.",
  },
  {
    type: "p",
    text: "Third, contact centre as a service (CCaaS) has separated from enterprise UC. Genesys Cloud, NICE CXone, Five9, Avaya Experience Platform and Cisco Webex Contact Center now compete for the contact centre tier independently of the broader UC choice.",
  },
  {
    type: "h2",
    id: "where-artiflex",
    text: "Where Artiflex IT Comes In",
  },
  {
    type: "p",
    text: "Artiflex IT has been designing, deploying, and managing [infrastructure across the UAE, Oman, and Saudi Arabia](/infrastructure) for over 14 years. We work with Microsoft Teams Phone, Cisco Webex Calling, Zoom Phone, Avaya and Mitel as the use case requires.",
  },
  {
    type: "cta",
    title: "Free UC and Telephony Posture Review",
    description: "60-minute review of your current voice infrastructure, cloud-readiness, PSTN connectivity options, contact centre architecture and recommended platform plus migration plan.",
    href: "/contact",
    label: "Book Assessment",
  },
];
