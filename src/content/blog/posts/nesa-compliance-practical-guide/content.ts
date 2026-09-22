import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "The National Electronic Security Authority (NESA) sets information-assurance standards for critical infrastructure in the UAE. But the requirements extend far beyond critical infrastructure, any organisation handling sensitive data should align with NESA guidelines, both because the threat model is the same and because UAE PDPL enforcement leans on NESA controls as evidence of due diligence.",
  },
  {
    type: "p",
    text: "This is a practical implementation guide, not a regulatory restatement. We assume you have the standard, and we focus on what actually changes in your environment when you implement it.",
  },
  {
    type: "h2",
    id: "framework",
    text: "Understanding NESA's Framework",
  },
  {
    type: "p",
    text: "NESA's Information Assurance Standards cover 188 controls across 12 management and technical domains. The domains span access management, awareness and training, asset management, communications and operations, compliance, human-resources security, incident management, physical and environmental security, risk management, security policy, system acquisition, and third-party security.",
  },
  {
    type: "p",
    text: "The standard is risk-based, not prescriptive. You do not need to implement all 188 controls at the strongest level for every system. You need a documented risk-assessment that justifies which controls you implement at what strength for which assets. This is also where most first audits go wrong, undocumented decisions are indistinguishable from no decisions.",
  },
  {
    type: "h2",
    id: "six-steps",
    text: "A Six-Step Compliance Path",
  },
  {
    type: "h3",
    id: "gap-assessment",
    text: "1. Gap Assessment",
  },
  {
    type: "p",
    text: "Compare your current security posture against NESA's controls, control-by-control. Score each as compliant, partially compliant, or non-compliant, with evidence for each rating. Prioritise gaps by risk, a missing control on the payroll system matters more than the same control missing on a development sandbox.",
  },
  {
    type: "h3",
    id: "policy",
    text: "2. Policy Development",
  },
  {
    type: "p",
    text: "Create or update security policies to align with NESA standards. Policies should be enforceable in operational reality, not aspirational documentation. The test is simple: can a new employee read the policy and know what to do? If not, rewrite it.",
  },
  {
    type: "h3",
    id: "tech-controls",
    text: "3. Technical Controls",
  },
  {
    type: "p",
    text: "Implement the technical controls, encryption at rest and in transit, identity and access management, network segmentation, logging, and monitoring. NESA does not specify products; it specifies outcomes. Choose tools that fit your environment and team's capacity to operate them.",
  },
  {
    type: "h3",
    id: "training",
    text: "4. Training and Awareness",
  },
  {
    type: "p",
    text: "Every employee with access to sensitive data should understand their role in maintaining security. Annual one-hour videos do not change behaviour. Role-based training, regular phishing simulations with feedback, and a clear reporting channel for suspicious activity are what move the needle.",
  },
  {
    type: "h3",
    id: "incident-response",
    text: "5. Incident Response",
  },
  {
    type: "p",
    text: "Develop and regularly test an incident-response plan that meets NESA's notification and reporting requirements. The plan must define roles, communications, escalation criteria, and external-notification thresholds. Test it with a tabletop exercise quarterly and a live drill annually.",
  },
  {
    type: "h3",
    id: "monitoring",
    text: "6. Continuous Monitoring",
  },
  {
    type: "p",
    text: "Implement 24/7 monitoring and regular vulnerability assessments to maintain compliance over time. NESA compliance is a steady-state, not a project. Without continuous monitoring, you fall out of compliance the day the auditor leaves.",
  },
  {
    type: "h2",
    id: "with-pdpl",
    text: "NESA + UAE PDPL Together",
  },
  {
    type: "p",
    text: "The UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021) and NESA cover overlapping but not identical ground. PDPL is a privacy law focused on personal data; NESA is a security standard focused on information assurance. The good news is that ~70% of NESA technical controls satisfy PDPL technical-measures requirements. The disciplined approach is to map your controls once against both frameworks, then maintain a single set of evidence that demonstrates compliance with each.",
  },
  {
    type: "callout",
    variant: "tip",
    title: "Cross-mapping shortcut",
    text: "If you implement NIST CSF 2.0 as your underlying framework, you can map a single control set to NESA, UAE PDPL, ISO 27001, and CBUAE in parallel. We use this approach for all our [implementation roadmaps](/cybersecurity#roadmap).",
  },
  {
    type: "h2",
    id: "audit-pitfalls",
    text: "Common Mistakes During Audits",
  },
  {
    type: "ul",
    items: [
      "Treating policy documents as evidence of operational practice. Auditors verify both, the policy and the operating reality.",
      "Missing audit trails for privileged-account access, especially break-glass accounts.",
      "No documented exceptions for controls that are not technically achievable in your environment. Exceptions are fine; undocumented gaps are not.",
      "Out-of-date asset inventory. The auditor cannot assess controls on assets they cannot identify.",
      "Vendor-risk gaps for SaaS providers handling regulated data, most organisations under-document this.",
    ],
  },
  {
    type: "p",
    text: "Compliance without over-engineering is a question of proportionality. Apply controls based on the sensitivity of the data and the realistic threat model. Not every system needs the same level of protection, and pretending it does dilutes the controls that matter.",
  },
  {
    type: "cta",
    title: "Get a NESA Gap Assessment",
    description: "We will assess your current state against NESA's 188 controls and produce a prioritised compliance roadmap with effort estimates.",
    href: "/cybersecurity#roadmap",
    label: "View Compliance Services",
  },
];
