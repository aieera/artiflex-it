import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "MDR did not emerge from a product roadmap. It emerged from recognition that the cybersecurity industry had been selling organisations powerful detection tools while quietly ignoring the fact that most organisations could not staff the teams needed to operate them effectively.",
  },
  {
    type: "h2",
    id: "the-problem",
    text: "The SOC Staffing Problem That Created MDR",
  },
  {
    type: "p",
    text: "By the early 2010s, enterprise security had matured considerably: better SIEM, better endpoint protection, better network detection. But a fundamental problem remained: tools do not respond to incidents. People do. And building a credible 24/7 SOC required a minimum of 8 to 12 security analysts across three shifts, plus a SOC manager, a threat intel analyst and an incident response team. The annual cost exceeded USD 2 million for most enterprise environments. For mid-market organisations, this was simply not achievable.",
  },
  {
    type: "quote",
    text: "The dirty secret of enterprise SIEM in the early 2010s was that a significant proportion of deployments had no-one watching alerts overnight. The SIEM was generating detections into a queue that no-one reviewed until the next morning. MDR was the industry's honest answer to this problem.",
  },
  {
    type: "h2",
    id: "timeline",
    text: "The Timeline: From IR Retainers to Managed SOC",
  },
  {
    type: "h3",
    text: "1999 to 2005, the IR retainer era: Secureworks and managed security origins",
  },
  {
    type: "p",
    text: "Secureworks (founded 1999) was among the first managed security providers, offering managed firewall monitoring and IDS management. This was tool management, not threat response, but it planted the seed of the managed security model that MDR would evolve into. Dell acquired Secureworks in 2011; Secureworks was spun off as independent in 2016.",
  },
  {
    type: "h3",
    text: "2010 to 2014, from MSSP to MDR: the response distinction",
  },
  {
    type: "p",
    text: "The distinction between MSSP and MDR crystallised. MSSP monitors and manages tools, alerting the customer when something looks wrong. MDR investigates, validates and responds to threats on the customer's behalf, taking action (isolating a compromised endpoint, blocking a malicious IP) without waiting for customer approval in time-critical scenarios.",
  },
  {
    type: "h3",
    text: "2016 to 2018, Gartner names MDR: a category is born",
  },
  {
    type: "p",
    text: "Gartner formally defined MDR as a market category in 2016. CrowdStrike Falcon Complete (2017) and Arctic Wolf brought new models, endpoint-native MDR and the Concierge Security approach respectively. The category crystallised the distinction from MSSP and created a common framework for buyers.",
  },
  {
    type: "h3",
    text: "2019 to 2021, Sophos MDR scales to 39,000+ customers",
  },
  {
    type: "p",
    text: "Sophos MDR's growth was driven by COVID-19 (which accelerated cloud adoption while reducing in-house IT staffing), the rise of ransomware as an existential business risk, and competitive pricing that made 24/7 MDR accessible well below enterprise scale. By 2021, Sophos MDR became the world's largest pure-play MDR service by customer count.",
  },
  {
    type: "h3",
    text: "2023, Sophos + Secureworks partnership changes MDR",
  },
  {
    type: "p",
    text: "Sophos and Secureworks formalised a strategic partnership combining Sophos MDR's scale (39,000+ customers) with Secureworks' Counter Threat Unit (CTU), one of the industry's most respected threat intelligence groups. The combined offering delivers both the breadth of cross-customer threat correlation and the depth of adversary-specific CTU intelligence.",
  },
  {
    type: "h3",
    text: "2024 to today, MDR extends to network: Sophos MDR + NDR",
  },
  {
    type: "p",
    text: "Sophos NDR, as an add-on to Sophos MDR Complete, feeds network detection into the same MDR SOC watching endpoint telemetry, giving the managed SOC team visibility across both endpoint and network without adding a second vendor relationship or second alert console. Network-layer MDR is accessible at mid-market pricing for the first time.",
  },
  {
    type: "cta",
    title: "Compare MDR platforms for the UAE",
    description: "Vendor comparison, a Gartner-style scorecard and the Sophos MDR Complete recommendation across Secureworks MXDR, Rapid7 MDR, Microsoft Defender MDR, SentinelOne, CrowdStrike Falcon Complete and Arctic Wolf.",
    href: "/cybersecurity/security-operations/mdr",
    label: "MDR Vendor Comparison",
  },
];
