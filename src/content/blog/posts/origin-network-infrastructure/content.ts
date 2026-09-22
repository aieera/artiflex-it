import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "On the morning of 22 May 1973, Bob Metcalfe arrived at his office in Xerox PARC in Palo Alto and wrote a memo describing a new way of connecting computers over a shared cable. He called it the Alto Aloha Network but renamed it Ethernet within months. The first prototype ran at 2.94 megabits per second on a coaxial cable shared by all the Alto workstations in the building. Within ten years it had become an industry standard. Within thirty it had become the foundation of the entire global internet.",
  },
  {
    type: "p",
    text: "From that one memo at Xerox PARC, the entire enterprise networking industry was born. Routers, switches, IP, BGP, OSPF, MPLS, VLAN, SD-WAN, SDN, intent-based networking, AI fabric: all of it sits on top of the basic insight that intelligence in the endpoints and shared bandwidth on the wire could replace the central-switch architectures that dominated telephony.",
  },
  {
    type: "callout",
    variant: "info",
    title: "The day networking became a product industry: 10 December 1984",
    text: "Cisco Systems was founded on 10 December 1984 by Leonard Bosack and Sandy Lerner, who built the first multi-protocol router to connect different network segments at Stanford. Within a decade Cisco was the largest networking company in the world; within two decades it had become one of the most valuable companies on Earth. The router was the device that made the internet practical at scale.",
  },
  {
    type: "h2",
    id: "challenges",
    text: "Why this category had to exist",
  },
  {
    type: "p",
    text: "Through the 1990s and 2000s, networks had to scale by orders of magnitude every few years while the people operating them stayed roughly the same size. The pain points below forced the network from a craft into an engineering discipline.",
  },
  {
    type: "ul",
    items: [
      "<strong>Address exhaustion and routing complexity.</strong> IPv4 was designed for a few thousand hosts and ended up carrying a few billion. Address exhaustion, NAT, CIDR and the eventual IPv6 migration all flowed from this original undersizing.",
      "<strong>Bandwidth growth at impossible rates.</strong> Network bandwidth needed to grow 10x every five years just to keep up with workload growth. Each generation (10 Mbps, 100, 1G, 10G, 40G, 100G, 400G) required full re-cabling, optics replacement and switch refresh.",
      "<strong>Manual configuration at scale.</strong> Configuring a large network by hand became impossible above a few hundred devices. The industry needed configuration automation (Ansible, IaC), intent-based networking (Cisco DNA, Juniper Apstra) and SDN to operate networks at modern scale.",
      "<strong>Security at the perimeter, then everywhere.</strong> Trust the inside, distrust the outside was the assumption for decades. Then breaches showed that the inside was the worst place to trust.",
      "<strong>Cloud changed the perimeter overnight.</strong> Workloads moved to AWS, Azure and Google Cloud while users moved out of the office. The traditional headquarters-and-branch network topology no longer matched reality.",
      "<strong>AI workloads broke the data-centre fabric.</strong> GPU clusters running collective communication operations need network behaviour that conventional data-centre fabrics do not deliver. Lossless RoCE, ultra-low latency, and dedicated AI fabrics emerged because traditional designs could not keep up.",
    ],
  },
  {
    type: "h2",
    id: "chapter-1",
    text: "Chapter 1 (1973-1990): Ethernet, Cisco and the Routing Era",
  },
  {
    type: "p",
    text: "Metcalfe's 1973 Ethernet sketch became commercial product in 1980 when Xerox, Intel and DEC jointly published the DIX Ethernet specification. The IEEE standardised it as 802.3 in 1983. By 1985, 10BASE5 and 10BASE2 had become the dominant LAN technology in technical workgroups, and 10BASE-T over twisted pair (1990) extended it economically to every office desk.",
  },
  {
    type: "p",
    text: "While Ethernet became the LAN standard, the wider problem of connecting different networks needed a router. Stanford's Leonard Bosack and Sandy Lerner built the first multi-protocol router around 1981. They founded Cisco Systems in 1984 and shipped commercial routers to early internet sites in 1986. Cisco IOS became the universal language of enterprise networking.",
  },
  {
    type: "p",
    text: "By 1990, every serious enterprise had a network. By 1995, every serious enterprise had multiple networks connected by routers running Cisco IOS over leased lines or Frame Relay. The basic shape of the corporate WAN had been settled.",
  },
  {
    type: "h2",
    id: "chapter-2",
    text: "Chapter 2 (1995-2008): Gigabit, 10G and Layer 3 Switching",
  },
  {
    type: "p",
    text: "Through the late 1990s, Ethernet bandwidth jumped from 10 megabits to 100 (Fast Ethernet, 1995) to 1,000 (Gigabit Ethernet, 1998) to 10,000 (10 Gigabit Ethernet, 2002). Each generation enabled new application classes.",
  },
  {
    type: "p",
    text: "Layer 3 switching transformed the campus. Pre-2000, routers handled inter-VLAN traffic and switches handled intra-VLAN; the routers became bottlenecks at any meaningful scale. Cisco Catalyst 5000 (1995) and 6500 (1999), Foundry Networks BigIron and Extreme Networks Black Diamond combined high-speed switching with line-rate routing in a single chassis.",
  },
  {
    type: "p",
    text: "Wireless LAN became a first-class network at the same time. 802.11 was ratified in 1997 at 2 Mbps; 802.11b (1999) at 11 Mbps made WLAN economically interesting. By 2010 most enterprise users connected to the network without a cable.",
  },
  {
    type: "h2",
    id: "chapter-3",
    text: "Chapter 3 (2008-2015): SDN and the Architectural Revolution",
  },
  {
    type: "p",
    text: "Software-Defined Networking emerged in 2008 from research at Stanford (Nick McKeown, Martin Casado) into OpenFlow. The core insight was that networks could be programmed centrally with a separation between the control plane and the data plane.",
  },
  {
    type: "p",
    text: "Nicira, founded by Martin Casado in 2007, commercialised network virtualisation and was acquired by VMware in 2012 for 1.26 billion dollars. The product became VMware NSX, the reference enterprise SDN platform. Cisco responded with Application Centric Infrastructure (ACI, 2014).",
  },
  {
    type: "p",
    text: "By 2015 SDN was no longer a research project. EVPN-VXLAN had emerged as the dominant overlay fabric protocol. Spine-leaf topology had displaced three-tier hierarchical data-centre design.",
  },
  {
    type: "h2",
    id: "chapter-4",
    text: "Chapter 4 (2015-2022): SD-WAN and the Death of MPLS",
  },
  {
    type: "p",
    text: "Through 2000-2015 the enterprise WAN was dominated by MPLS. Carriers sold expensive private circuits between branch sites. Cloud broke it: when the application is in AWS or Azure, routing all traffic via a central MPLS hub adds latency and cost without delivering value.",
  },
  {
    type: "p",
    text: "SD-WAN emerged around 2014 from companies like Viptela (acquired by Cisco 2017), VeloCloud (acquired by VMware 2017), Silver Peak (acquired by Aruba 2020) and CloudGenix (acquired by Palo Alto 2020). SD-WAN replaced expensive MPLS links with cheaper commodity internet broadband, plus intelligent path selection.",
  },
  {
    type: "p",
    text: "By 2022 SD-WAN had become the dominant enterprise WAN architecture. SASE (Secure Access Service Edge) extended the model by integrating cloud-delivered security (CASB, SWG, ZTNA) into the same fabric.",
  },
  {
    type: "h2",
    id: "chapter-5",
    text: "Chapter 5 (2018-2023): Wi-Fi 6, 6E and 7 Reshape the Campus",
  },
  {
    type: "p",
    text: "Wi-Fi 6 (802.11ax) was ratified in 2019 and brought OFDMA, target wake time and multi-user MIMO into mainstream enterprise deployment. The performance jump over Wi-Fi 5 was material, but the operational improvement was more important: better density handling, better battery performance for endpoints.",
  },
  {
    type: "p",
    text: "Wi-Fi 6E (2021) opened the 6 GHz band, adding 1,200 MHz of new spectrum to enterprise WLAN. For the first time since the original 802.11 specification, density-constrained deployments had enough spectrum to grow into without congestion. Wi-Fi 7 (802.11be, 2024) added multi-link operation and 320 MHz channels.",
  },
  {
    type: "p",
    text: "Each generation forced switch refresh. Wi-Fi 6 needed multi-gigabit Ethernet (mGig) to the AP. Wi-Fi 7 typically needs 10 GbE.",
  },
  {
    type: "h2",
    id: "chapter-6",
    text: "Chapter 6 (2023-now): The AI Fabric and the New Network",
  },
  {
    type: "p",
    text: "AI workloads broke conventional data-centre networking. Training a frontier language model on tens of thousands of GPUs requires collective communication operations (all-reduce, broadcast, gather) that conventional Ethernet fabrics handle poorly. NVIDIA's NCCL library, RDMA over Converged Ethernet (RoCEv2), and ultra-low-latency switching emerged as new procurement criteria.",
  },
  {
    type: "p",
    text: "InfiniBand from NVIDIA Mellanox dominated the AI training fabric through 2023. NVIDIA Spectrum-X (announced 2023) extended Ethernet to handle AI workloads with similar performance characteristics. Arista Etherlink, Broadcom Tomahawk 5 and a generation of ultra-low-latency Ethernet platforms emerged in parallel.",
  },
  {
    type: "p",
    text: "For mainstream enterprise networking, intent-based networking (Cisco DNA, Juniper Apstra, Aruba CX), AI-driven operations (Mist AI, Cisco AI Operations, Aruba NetInsight) and consolidation of network plus security (SASE, ZTNA) became the dominant trends.",
  },
  {
    type: "stats",
    items: [
      {
        value: "1973",
        label: "Ethernet invented",
        sublabel: "Bob Metcalfe at Xerox PARC",
      },
      {
        value: "1984",
        label: "Cisco Systems founded",
        sublabel: "multi-protocol routing becomes a product",
      },
      {
        value: "2008",
        label: "OpenFlow and SDN research",
        sublabel: "network programmability emerges",
      },
      {
        value: "2014",
        label: "SD-WAN industry forms",
        sublabel: "MPLS replacement begins",
      },
      {
        value: "2019",
        label: "Wi-Fi 6 ratified",
        sublabel: "wireless becomes the primary LAN",
      },
      {
        value: "2023",
        label: "AI fabric category emerges",
        sublabel: "Spectrum-X and Etherlink reshape DC networks",
      },
    ],
  },
  {
    type: "h2",
    id: "uae-implications",
    text: "What Network History Tells UAE Businesses Today",
  },
  {
    type: "p",
    text: "Three principles shape UAE network decisions in 2026. First, the campus access refresh and the Wi-Fi refresh are now a single procurement. Wi-Fi 6E should be the practical floor for any new build; Wi-Fi 7 is the right choice for three-plus-year refresh horizons.",
  },
  {
    type: "p",
    text: "Second, SD-WAN and SASE are now the default WAN architecture. UAE multi-branch operations increasingly run on SD-WAN with cloud-delivered security. MPLS persists only for very specific high-criticality scenarios.",
  },
  {
    type: "p",
    text: "Third, AI workloads demand a separate fabric conversation. If your medium-term roadmap includes meaningful GPU-based training or inference, conventional enterprise switching will not deliver.",
  },
  {
    type: "h2",
    id: "where-artiflex",
    text: "Where Artiflex IT Comes In",
  },
  {
    type: "p",
    text: "Artiflex IT has been designing, deploying, and managing [infrastructure across the UAE, Oman, and Saudi Arabia](/infrastructure) for over 14 years. We work with Cisco, Juniper, Aruba, Arista, Fortinet, Palo Alto, NVIDIA and the broader network ecosystem as the use case requires.",
  },
  {
    type: "cta",
    title: "Free Network Architecture Review",
    description: "60-minute review of your current campus, data-centre and WAN posture, refresh cycle, SD-WAN and SASE readiness, and AI fabric requirements.",
    href: "/contact",
    label: "Book Assessment",
  },
];
