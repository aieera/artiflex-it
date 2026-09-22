import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "Long before anyone spoke about cybersecurity for industry, the systems that ran power stations, water treatment plants, oil pipelines, and factory production lines were considered a special case. They used proprietary protocols, ran for decades without patching, and above all, they were physically separated from the corporate network and the internet. That separation, the air gap, was treated as security in itself. For a long time, it mostly worked, because nobody had a reason or a way to cross it.",
  },
  {
    type: "p",
    text: "Then one piece of malware crossed it anyway, and the operational technology security industry was born.",
  },
  {
    type: "callout",
    variant: "warning",
    title: "The founding moment, Stuxnet, 2010",
    text: "Stuxnet, discovered in 2010, was the first malware engineered to cross an air gap (via USB) and physically sabotage industrial equipment, reprogramming the Siemens PLCs that controlled uranium centrifuges while reporting normal readings to operators. It proved that an isolated OT network was not an un-attackable one, and that a cyberattack could cause physical, kinetic damage. The category of OT/ICS security exists because of it.",
  },
  {
    type: "h2",
    id: "gen-airgap",
    text: "Generation 0: The Air-Gap Assumption",
  },
  {
    type: "p",
    text: "Operational technology (OT) and the industrial control systems (ICS) inside it, the PLCs, RTUs, SCADA servers, and HMIs that read sensors and drive actuators, were designed for one thing above all: availability and safety. A controller that runs a turbine cannot be rebooted for a patch on a Tuesday. These systems were built to last twenty or thirty years, and many in service today predate the modern internet.",
  },
  {
    type: "p",
    text: "Security in that world meant physical separation. If the control network never touched the IT network and never touched the internet, the reasoning went, then remote attackers simply could not reach it. The threat model was the disgruntled insider and the accidental misconfiguration, not the external adversary. In practice, the air gap was always leakier than the diagrams suggested: contractor laptops, USB drives, temporary remote-support links, and shared historians all punched holes in it. Stuxnet exploited exactly that gap.",
  },
  {
    type: "h2",
    id: "gen-convergence",
    text: "Generation 1: IT/OT Convergence Erases the Gap",
  },
  {
    type: "p",
    text: "Even as Stuxnet was making headlines, the air gap was disappearing for ordinary business reasons. Industrial operators wanted real-time production data in their business systems, predictive maintenance, remote monitoring of distributed assets, and the efficiency gains of the Industrial Internet of Things (IIoT). Achieving any of that meant connecting OT to IT, and through IT, to the cloud.",
  },
  {
    type: "p",
    text: "This convergence delivered enormous operational value and simultaneously dissolved the only security control many plants had ever relied on. Suddenly the same ransomware that hit corporate file servers could reach a manufacturing network, and an attack on IT could halt production even without touching a single controller. The shutdown of a major US fuel pipeline in 2021, caused by ransomware on the IT side that forced a precautionary OT shutdown, showed the whole world what that looks like in practice.",
  },
  {
    type: "h2",
    id: "gen-visibility",
    text: "Generation 2: Passive Monitoring and Asset Visibility",
  },
  {
    type: "p",
    text: "The first real OT security products were built on a hard constraint: you cannot defend an industrial network the way you defend an IT one. You cannot install an agent on a 15-year-old PLC, and you cannot run an active vulnerability scan against a controller without risking that you crash the very process you are trying to protect. The breakthrough was to monitor passively instead.",
  },
  {
    type: "p",
    text: "A new wave of vendors, founded in the years immediately after Stuxnet, built platforms that tap a copy of network traffic (via a SPAN or mirror port) and parse industrial protocols without ever sending a packet to a device. From that passive feed they deliver the three things every OT programme needs first: a complete, automatically discovered inventory of every asset on the network, a baseline of normal communication between them, and an alert the moment something deviates, a new device, an unexpected command, a connection that should not exist. Visibility, not isolation, became the new foundation. You cannot protect what you cannot see, and for the first time operators could see their own networks.",
  },
  {
    type: "h2",
    id: "gen-cps",
    text: "Generation 3: Unified Cyber-Physical Systems and AI-Native Detection",
  },
  {
    type: "p",
    text: "The current generation treats OT, IoT, and IT as one continuous attack surface rather than separate worlds. Platforms now correlate OT telemetry with the broader security operations centre, so an intrusion that begins with a phishing email on the IT side and pivots toward the plant floor is tracked as a single incident across both domains. Detection has moved from static rules to AI-native behavioural models that understand industrial processes, and asset intelligence has deepened to include OT-specific vulnerability and risk scoring that accounts for whether a flaw is actually reachable and exploitable in a given plant.",
  },
  {
    type: "p",
    text: "This is also where major IT security vendors entered the field, frequently by acquiring the pioneers. The pattern mirrors the rest of the security industry: the specialist that proved a category often becomes the engine inside a larger platform, while purpose-built OT vendors continue to lead on depth.",
  },
  {
    type: "stats",
    items: [
      {
        value: "2010",
        label: "Stuxnet discovered",
        sublabel: "Air-gap myth ends",
      },
      {
        value: "Passive",
        label: "Monitoring model",
        sublabel: "No agents, no active scans",
      },
      {
        value: "Visibility",
        label: "The new foundation",
        sublabel: "Inventory before defence",
      },
      {
        value: "IT/OT",
        label: "One attack surface",
        sublabel: "Converged SOC",
      },
    ],
  },
  {
    type: "h2",
    id: "uae-implications",
    text: "What This History Tells UAE and GCC Operators Today",
  },
  {
    type: "p",
    text: "For the UAE's energy, utilities, manufacturing, and critical-infrastructure operators, the arc above is directly operational, and it aligns with the direction of national regulation under frameworks such as the NESA/SIA standards and sector-specific OT security requirements.",
  },
  {
    type: "p",
    text: "The first lesson is that the air gap is not a security strategy. If your defence rests on the belief that the OT network is isolated, you are defending a perimeter that contractor laptops, remote-support sessions, and IIoT links have almost certainly already breached. Assume connectivity and build from there.",
  },
  {
    type: "p",
    text: "The second is that visibility comes before everything else. Most operators cannot produce a complete, accurate inventory of what is actually on their OT network. Passive asset discovery is the mandatory first step, because every later control, segmentation, monitoring, vulnerability management, depends on knowing what you have.",
  },
  {
    type: "p",
    text: "The third is that OT security must respect the process. Any tool or method that risks disrupting production or safety is the wrong tool, regardless of how well it works in IT. Non-disruptive, passive-first platforms exist precisely so that security never becomes the cause of the downtime it is meant to prevent. Our recommended OT/IoT platform for most UAE estates is [Nozomi Networks](/cybersecurity/ot-ics-security), AI-native, non-disruptive, and clean to integrate into a broader SOC, with Claroty preferred for the largest and most complex estates and pharma or healthcare environments.",
  },
  {
    type: "h2",
    id: "where-artiflex",
    text: "Where Artiflex IT Comes In",
  },
  {
    type: "p",
    text: "Artiflex IT helps UAE and GCC operators secure [OT and ICS environments](/cybersecurity/ot-ics-security) without disrupting production, from passive asset discovery and network baselining through segmentation design and continuous threat monitoring. We work with Nozomi Networks, Claroty, Dragos, Tenable OT Security, and Microsoft Defender for IoT, and we match the platform to your sector, your protocol mix, and your regulatory obligations.",
  },
  {
    type: "p",
    text: "If you cannot currently produce a full inventory of your OT assets, or if your plant network and corporate network are connected with no monitoring in between, we will show you exactly where you stand and what a safe, non-disruptive deployment looks like.",
  },
  {
    type: "cta",
    title: "Free OT/ICS Visibility Assessment",
    description: "A scoping session for energy, utilities, and manufacturing operators. We will outline how to gain complete, non-disruptive visibility into your OT network and where your real exposure sits. No commitment.",
    href: "/contact",
    label: "Book Assessment",
  },
];
