import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "In 2004, a small group of senior security professionals gathered in London under the banner of the Jericho Forum and declared that the network perimeter was already dead. The industry treated the statement as heresy. It would take fifteen years before the same idea, rebranded as Zero Trust, became mainstream architectural orthodoxy, and twenty years before it became codified US federal policy. The history of Zero Trust is the history of an idea that was correct on arrival and merely waiting for the rest of the world to catch up.",
  },
  {
    type: "h2",
    id: "the-heresy",
    text: "The Jericho Forum: The Perimeter Is Already Gone",
  },
  {
    type: "p",
    text: "The Jericho Forum was founded in 2004 by senior CISOs from major international corporations who were tired of pretending that the firewalled corporate network was a meaningful security boundary. They named themselves after the biblical city whose walls famously fell, and they argued that the corporate walls had already fallen in practice even if nobody was willing to say so out loud. Their thesis was simple: the perimeter as a security construct was an illusion, and the longer the industry pretended otherwise, the longer it would delay the architectures that were actually needed.",
  },
  {
    type: "p",
    text: "In 2007, the Forum published the Jericho Forum Commandments, eleven design principles for what they called de-perimeterisation. The commandments insisted that security must be inherent to data and transactions rather than to the network around them, that all devices must be considered untrusted by default, and that identity, authentication and authorisation must travel with the user and the data rather than being asserted by the network. The principles were largely ignored at the time. They were also, in hindsight, almost entirely correct.",
  },
  {
    type: "p",
    text: "The perimeter did not collapse in a single moment. It dissolved gradually through SaaS adoption, mobile devices that left the office every evening, API integrations between corporate systems and outside services, and remote contractors who needed access without ever stepping into the building. By 2010, the perimeter model was already insufficient to describe what was actually happening on most enterprise networks. The industry simply had not yet built the language or the tooling to admit it.",
  },
  {
    type: "quote",
    text: "The Jericho Forum in 2004 said what nobody wanted to hear: the perimeter is an illusion. Six years later, Google's BeyondCorp project proved they were right. Six years after that, the US government made Zero Trust federal policy. The ideas were correct all along. They just needed a decade and a half to become undeniable.",
    cite: "The slow vindication of de-perimeterisation",
  },
  {
    type: "h2",
    id: "the-name",
    text: "John Kindervag Gives a Concept Its Name, and a Framework",
  },
  {
    type: "p",
    text: "In 2010, John Kindervag, then a principal analyst at Forrester Research, published a paper titled \"No More Chewy Centers: Introducing The Zero Trust Model Of Information Security\". The paper crystallised what the Jericho Forum had argued in principle and gave it a name that would stick. Kindervag's framing was the now-famous M&M shell analogy: enterprises had built networks that were hard and crunchy on the outside, but soft and chewy on the inside, so that any attacker who breached the perimeter found themselves inside a flat, trusted environment with little resistance.",
  },
  {
    type: "p",
    text: "Kindervag's framework proposed three structural shifts. Micro-segmentation would replace the flat internal network with small, individually defended zones. Identity verification would happen at every boundary rather than once at the edge. Least privilege would govern every access decision rather than being granted broadly by network location. The model was clean, defensible and prescriptive enough for organisations to begin implementing in concrete steps.",
  },
  {
    type: "p",
    text: "Google had already been building exactly this architecture internally since 2010, prompted by the Operation Aurora breach of 2009 in which Chinese state-sponsored attackers had compromised Google's corporate network and several other large technology companies. Google's response was to abandon the corporate VPN and the trusted internal network entirely. They published the architecture in 2014 under the name BeyondCorp, and it became the first proof of concept that Zero Trust principles worked at the scale of a global enterprise with tens of thousands of employees.",
  },
  {
    type: "callout",
    variant: "info",
    title: "The US Government Makes Zero Trust Federal Policy",
    text: "In May 2021, President Biden's Executive Order on Improving the Nation's Cybersecurity directed federal agencies to implement Zero Trust Architecture, citing NIST Special Publication 800-207 as the reference framework. CISA published a Zero Trust Maturity Model in 2022 to guide implementation across federal agencies. The US Office of Management and Budget set a target of all federal agencies achieving Zero Trust maturity by the end of Fiscal Year 2024. What had been a security philosophy in 2004, a Forrester framework in 2010, and a Google engineering practice in 2014 became US government policy twenty years after the Jericho Forum first articulated its principles. Zero Trust had arrived.",
  },
  {
    type: "h2",
    id: "timeline",
    text: "Twenty Years from Heresy to Policy",
  },
  {
    type: "h3",
    text: "2004, Jericho Forum Founded",
  },
  {
    type: "p",
    text: "Senior CISOs convene in London and declare the network perimeter dead. The Jericho Forum begins publishing the design principles for de-perimeterisation that the rest of the industry will spend the next two decades catching up to.",
  },
  {
    type: "h3",
    text: "2009, Operation Aurora, Google Breached",
  },
  {
    type: "p",
    text: "Chinese state-sponsored attackers compromise Google's corporate network in a multi-month operation that also targets Adobe, Juniper, Rackspace and at least thirty other major technology firms. Google's response is to rethink network security from first principles rather than patch the existing model.",
  },
  {
    type: "h3",
    text: "2010, Kindervag Coins Zero Trust",
  },
  {
    type: "p",
    text: "John Kindervag publishes the Forrester paper that gives the de-perimeterisation movement its name and its first concrete framework. Zero Trust, as a phrase and as an architecture, enters the industry vocabulary.",
  },
  {
    type: "h3",
    text: "2014, Google Publishes BeyondCorp",
  },
  {
    type: "p",
    text: "Google releases the first of six BeyondCorp papers describing how it eliminated the corporate VPN, removed all implicit trust from the internal network, and authenticated every request based on device posture and user identity. The papers become the canonical reference for Zero Trust at scale.",
  },
  {
    type: "h3",
    text: "2018, Vendors Adopt Zero Trust Positioning",
  },
  {
    type: "p",
    text: "Cisco, Microsoft, Palo Alto Networks, Zscaler, Akamai and dozens of others rebrand or reposition product lines under the Zero Trust banner. The marketing layer arrives well ahead of the engineering reality at most customers, but the centre of gravity is unmistakably shifting.",
  },
  {
    type: "h3",
    text: "2020, NIST SP 800-207 Published",
  },
  {
    type: "p",
    text: "NIST publishes Special Publication 800-207, the first formal standard defining Zero Trust Architecture for federal use. The document gives architects a vendor-neutral reference model and ends a decade of arguments about what Zero Trust actually means.",
  },
  {
    type: "h3",
    text: "2021, Biden Executive Order, Zero Trust Federal Policy",
  },
  {
    type: "p",
    text: "The May 2021 Executive Order on Improving the Nation's Cybersecurity directs every US federal agency to adopt Zero Trust Architecture using NIST SP 800-207 as the reference. CISA publishes the Zero Trust Maturity Model in 2022 and OMB sets agency targets for Fiscal Year 2024.",
  },
  {
    type: "h3",
    text: "Today, Zero Trust as Default Architecture",
  },
  {
    type: "p",
    text: "In 2026, Zero Trust is the default architectural posture for new enterprise deployments. SASE, SSE, ZTNA, conditional access, micro-segmentation and identity-aware proxies are all expressions of the same underlying model. The argument is no longer whether to adopt Zero Trust; it is how mature the implementation is.",
  },
  {
    type: "quote",
    text: "The pandemic did more for Zero Trust adoption in twelve months than a decade of analyst reports. When every employee became remote overnight, the VPN-based perimeter model collapsed under its own weight. Organisations that had invested in Zero Trust infrastructure sailed through. Organisations that had not spent 2020 trying to scale VPN capacity they had never anticipated needing.",
    cite: "Why COVID-19 was the biggest Zero Trust adoption catalyst in history",
  },
];
