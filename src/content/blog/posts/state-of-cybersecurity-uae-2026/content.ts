import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "Ransomware attacks targeting GCC businesses surged 300% over the past two years. Social engineering losses exceeded $4.7 billion globally in 2024. And the average breach cost in the Middle East hit $6.93 million, 69% higher than the global average. This is not a technology problem any more. It is a board-level business risk that requires the same scrutiny as currency exposure or supply-chain risk.",
  },
  {
    type: "callout",
    variant: "warning",
    title: "TL;DR for the board",
    text: "UAE businesses face higher attack volume, higher breach costs, and tighter regulation than the global average. The 2026 priorities are AI-resilient defences, supply-chain visibility, and demonstrable NESA / UAE PDPL compliance.",
  },
  {
    type: "h2",
    id: "numbers",
    text: "The Numbers Behind the Threat",
  },
  {
    type: "p",
    text: "IBM Security's 2024 Cost of a Data Breach Report puts the global mean at $4.88M. The Middle East regional figure is materially higher for three structural reasons. First, the region's high-value digital economies, the UAE's GDP is $507B and Saudi Arabia's is $1.07T, present targets with more to lose. Second, aggressive cloud and AI adoption is running ahead of security-maturity investment. Third, cross-border data flows between GCC business hubs create attack surfaces that single-jurisdiction defenders are not built for.",
  },
  {
    type: "p",
    text: "For UAE-specific exposure, the picture is more granular. The UAE Cybersecurity Council reported a 30%+ increase in cyberattacks in 2024, with banking, government, and healthcare sectors absorbing the largest share. Recent regional threat-intelligence work has identified business email compromise (BEC) and ransomware-as-a-service (RaaS) as the two attack categories growing fastest in the GCC.",
  },
  {
    type: "stats",
    items: [
      {
        value: "$6.93M",
        label: "Average breach cost",
        sublabel: "Middle East, 2024",
      },
      {
        value: "300%",
        label: "GCC ransomware growth",
        sublabel: "2022–2024",
      },
      {
        value: "73%",
        label: "Of breaches start with social engineering",
        sublabel: "Verizon DBIR 2024",
      },
      {
        value: "$1.2B",
        label: "UAE BEC losses 2024",
        sublabel: "Estimated, regional CERT data",
      },
    ],
  },
  {
    type: "h2",
    id: "why-uae",
    text: "Why the UAE Is a Prime Target",
  },
  {
    type: "p",
    text: "Three properties make the UAE attractive to sophisticated threat actors. The first is concentration of high-value digital assets, financial services, oil and gas operators, large logistics and aviation networks, and a fast-growing fintech sector. The second is regulatory and reputational sensitivity: a single ransomware incident can derail a fundraising round or a sovereign-fund transaction. The third is the workforce mix, multilingual, remote-friendly, and expanding rapidly, which broadens the social-engineering surface.",
  },
  {
    type: "p",
    text: "State-aligned actors target the UAE for intelligence value. Financially motivated groups target it for ransom yield. The two converge on the same set of victims, which is unusual globally and changes how defences should be built.",
  },
  {
    type: "h2",
    id: "trends-2026",
    text: "Five Trends Defining 2026",
  },
  {
    type: "h3",
    id: "ai-attacks",
    text: "1. AI-Powered Attacks",
  },
  {
    type: "p",
    text: "Threat actors are using large language models to draft phishing in fluent Arabic and English, automate vulnerability scanning at industrial scale, and produce polymorphic malware that evades signature-based detection. The detection-to-defence asymmetry has flipped: defenders need AI-aware tooling just to keep parity. Generic email filters trained on 2022 phishing corpora are losing ground every quarter.",
  },
  {
    type: "h3",
    id: "supply-chain",
    text: "2. Supply Chain Compromise",
  },
  {
    type: "p",
    text: "Attackers increasingly compromise trusted vendors and software providers to gain downstream access to their customers. A single poisoned update to a widely-deployed VPN appliance, MSP RMM tool, or build pipeline can affect thousands of organisations. UAE businesses with concentrated vendor relationships, common in regulated sectors, are especially exposed.",
  },
  {
    type: "h3",
    id: "raas",
    text: "3. Ransomware-as-a-Service",
  },
  {
    type: "p",
    text: "RaaS has commoditised ransomware. Affiliates with no technical depth can now run sophisticated campaigns by leasing tooling, infrastructure, and negotiation services. The criminal supply chain mirrors a SaaS business, pricing tiers, customer support, dispute resolution. The result is a higher attack volume against mid-market targets that were previously below the threshold of skilled attackers.",
  },
  {
    type: "h3",
    id: "regulation",
    text: "4. Regulatory Pressure",
  },
  {
    type: "p",
    text: "NESA, the UAE Personal Data Protection Law (PDPL), and CBUAE rules on critical financial-services infrastructure are tightening enforcement. Non-compliance carries financial and operational consequences beyond the breach itself. Boards that previously treated security spend as discretionary now treat it as mandatory cost-of-doing-business.",
  },
  {
    type: "h3",
    id: "cloud-gaps",
    text: "5. Cloud Security Gaps",
  },
  {
    type: "p",
    text: "Rapid cloud adoption has outpaced cloud-security posture management. Misconfigured cloud resources, public S3 buckets, over-permissive IAM, exposed management planes, remain one of the top causes of data exposure. The 'shared responsibility model' continues to be misunderstood, with tenants assuming the provider secures things the provider explicitly does not.",
  },
  {
    type: "h2",
    id: "board-actions",
    text: "What Boards Should Demand From Their Security Programmes",
  },
  {
    type: "ol",
    items: [
      "A documented, board-approved cybersecurity strategy mapped to NIST CSF 2.0, see our [implementation roadmap](/cybersecurity#roadmap) for the framework.",
      "Quarterly third-party penetration tests with executive-readable results, not just technical reports.",
      "24/7 monitoring with mean-time-to-detect (MTTD) and mean-time-to-respond (MTTR) benchmarked against the industry, see [SIEM and MDR services](/cybersecurity/security-operations/siem).",
      "Tested incident-response playbooks rehearsed with the leadership team, not just IT.",
      "An annual security-awareness programme with measurable phishing-simulation pass rates.",
      "Vendor-risk reviews with right-to-audit clauses for any vendor with access to production systems or sensitive data.",
    ],
  },
  {
    type: "h2",
    id: "where-to-start",
    text: "Where to Start Tomorrow",
  },
  {
    type: "p",
    text: "The cost of prevention is always lower than the cost of recovery. UAE businesses that invest now will be the ones still operating when the next major incident wave hits. Start with three things: a current-state assessment against NIST CSF 2.0, a tabletop exercise on a ransomware scenario for the executive team, and an honest review of which vendors have privileged access to your environment.",
  },
  {
    type: "cta",
    title: "Free UAE Cybersecurity Assessment",
    description: "30-minute board-ready review of your current cybersecurity posture against NIST CSF 2.0 and NESA. No commitment.",
    href: "/contact",
    label: "Book Assessment",
  },
];
