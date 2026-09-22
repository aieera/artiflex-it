import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "NDR is a 2020s category name for a problem security teams have grappled with for three decades: how do you detect threats that hide inside network traffic? The answer evolved from manual packet inspection to AI systems that model normal behaviour for every device and detect deviations in milliseconds.",
  },
  {
    type: "h2",
    id: "the-problem",
    text: "The Network Visibility Problem",
  },
  {
    type: "p",
    text: "Security teams have always known that the network is where attackers reveal themselves. An endpoint can be compromised and silent for weeks. But at some point the attacker must communicate, with command-and-control infrastructure, with other compromised hosts, with data exfiltration endpoints. That communication leaves traces in network traffic. The question was always: how do you find those traces in terabytes of legitimate traffic?",
  },
  {
    type: "quote",
    text: "The attacker who gains access to your network will eventually have to communicate. They will move laterally, reach out to command-and-control, and exfiltrate data. NDR watches for these behaviours, not for signatures, and that is why it catches what endpoint tools miss.",
  },
  {
    type: "h2",
    id: "timeline",
    text: "The Timeline: Three Decades of Network Detection",
  },
  {
    type: "h3",
    text: "1988, the Morris Worm: the first network threat",
  },
  {
    type: "p",
    text: "The Morris Worm infected roughly 6,000 Unix machines and demonstrated conclusively that network-layer threats required network-layer detection. The response was the creation of CERT/CC and the beginning of structured network security research.",
  },
  {
    type: "h3",
    text: "1990s, NIDS: network intrusion detection systems",
  },
  {
    type: "p",
    text: "Snort (open source, released 1998 by Martin Roesch) became the reference open-source NIDS. The fundamental limitation was clear from the start: signatures only detect known threats. Novel attacks required novel detection approaches.",
  },
  {
    type: "h3",
    text: "2007 to 2012, full packet capture and NTA emerges",
  },
  {
    type: "p",
    text: "ExtraHop was founded in 2007 with the insight that network packet data could be analysed in real time for both performance monitoring and security detection. Gartner defined Network Traffic Analysis (NTA) as a new market category, characterised by ML-based anomaly detection on network flows rather than signature matching.",
  },
  {
    type: "h3",
    text: "2012 to 2016, AI-native NDR: Vectra and Darktrace",
  },
  {
    type: "p",
    text: "Vectra AI (founded 2012) was built from the ground up for ML-based network threat detection, developing Attack Signal Intelligence (ASI). Darktrace (founded 2013, Cambridge AI) introduced Self-Learning AI to network security, modelling normal for every user and device without pre-defined rules.",
  },
  {
    type: "h3",
    text: "2017, LinkShadow: NDR born in the UAE",
  },
  {
    type: "p",
    text: "LinkShadow was founded in Dubai in 2017, the first major NDR platform born in the Middle East. It was built from day one with UAE network architectures, NESA/CBUAE/ADHICS regulatory frameworks, Arabic-language environments and GCC threat actor intelligence at the core of its product design, not added as afterthoughts.",
  },
  {
    type: "h3",
    text: "2020, Gartner names NDR as a formal market category",
  },
  {
    type: "p",
    text: "Gartner renamed NTA to NDR in 2020, reflecting the maturation from passive detection to active response capability. The inaugural NDR Magic Quadrant named Vectra AI (highest in Ability to Execute), Darktrace, ExtraHop RevealX and Corelight as Leaders.",
  },
  {
    type: "h3",
    text: "2023 to today, NDR integrates with MDR: the Sophos model",
  },
  {
    type: "p",
    text: "The most significant recent NDR development is integration with MDR services. Sophos NDR, as an add-on to Sophos MDR Complete, feeds network detection into the same MDR SOC watching endpoint telemetry, making network-layer detection accessible to UAE mid-market organisations at a fraction of standalone enterprise NDR pricing.",
  },
  {
    type: "cta",
    title: "Compare NDR platforms for the UAE",
    description: "Vendor comparison, a Gartner-style scorecard and the UAE-founded LinkShadow recommendation across Sophos NDR, Vectra AI, Darktrace, ExtraHop and Corelight.",
    href: "/cybersecurity/security-operations/ndr",
    label: "NDR Vendor Comparison",
  },
];
