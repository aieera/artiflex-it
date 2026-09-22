import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "73% of successful breaches start with a human being tricked, not a firewall bypassed or a zero-day exploited. Social engineering remains the most effective attack vector because it targets the one element of your security stack that cannot be patched: human psychology.",
  },
  {
    type: "p",
    text: "In the UAE, the problem is sharper than the global average for two reasons. The first is workforce composition, multilingual teams operating across multiple time zones, with frequent legitimate reasons for unusual requests from unfamiliar parties. The second is volume, the UAE Cybersecurity Council reported a sharp rise in BEC attempts targeting UAE businesses in the past 18 months.",
  },
  {
    type: "h2",
    id: "why-human",
    text: "Why People Are the Soft Target",
  },
  {
    type: "p",
    text: "Technology controls have become very good at the things technology can address. Email gateways block 95%+ of bulk phishing. EDR catches most known malware. Network segmentation limits lateral movement. Multi-factor authentication shut down the easy credential-stuffing attacks of the 2010s.",
  },
  {
    type: "p",
    text: "What attackers have done in response is to attack the parts of the kill chain that technology cannot fully defend, the moment of judgement when an employee decides whether to click, to authorise, to transfer money. The attack surface has shifted from infrastructure to attention.",
  },
  {
    type: "h2",
    id: "patterns",
    text: "Five Common Attack Patterns in the UAE",
  },
  {
    type: "h3",
    id: "bec",
    text: "1. Business Email Compromise (BEC)",
  },
  {
    type: "p",
    text: "Attackers impersonate executives or vendors to authorise fraudulent wire transfers. UAE businesses lost over $1.2 billion to BEC attacks in 2024 by regional CERT estimates. The pattern: a finance team member receives an urgent instruction from the CFO (or what appears to be the CFO) to wire funds to a supplier with a 'just-updated' bank account. The mail passes authentication checks because the attacker compromised a legitimate account. By the time the fraud is detected, the funds are gone.",
  },
  {
    type: "h3",
    id: "spear-phishing",
    text: "2. Spear Phishing",
  },
  {
    type: "p",
    text: "Targeted emails crafted using public information from LinkedIn, company websites, and social media. These are not the obvious 'Nigerian prince' lures of a decade ago, they reference real internal projects, real colleagues, real meetings. They are nearly indistinguishable from legitimate communications because attackers have done their reconnaissance.",
  },
  {
    type: "h3",
    id: "vishing",
    text: "3. Vishing (Voice Phishing)",
  },
  {
    type: "p",
    text: "Phone calls impersonating banks, government agencies, or IT support. The caller creates urgency to extract credentials or authorise actions. UAE-specific variants include calls claiming to be from the UAE Central Bank, the Ministry of Interior, or major banks demanding immediate verification. Voice cloning has made these calls more convincing, a deepfaked CEO voice asking the finance team to expedite a payment is a 2024 attack pattern, not a hypothetical.",
  },
  {
    type: "h3",
    id: "pretexting",
    text: "4. Pretexting",
  },
  {
    type: "p",
    text: "Attackers build a fabricated scenario to gain trust and extract information. Common pretexts: a 'new auditor' requiring access to financial records, a 'replacement vendor representative' needing portal credentials, an 'IT engineer' from a known managed-services provider needing to verify a configuration. The defence is verification through a separate channel, never trust contact information provided in the suspicious communication itself.",
  },
  {
    type: "h3",
    id: "watering-hole",
    text: "5. Watering Hole Attacks",
  },
  {
    type: "p",
    text: "Compromising websites frequently visited by target employees to deliver malware through trusted channels. Industry forums, regulatory portals, and partner websites are common targets. The user is doing nothing wrong, they are visiting a site they have visited a hundred times, and the malware lands without them clicking anything suspicious.",
  },
  {
    type: "callout",
    variant: "warning",
    title: "AI-augmented social engineering is the 2026 frontier",
    text: "Attackers now use LLMs to draft convincing English and Arabic phishing at scale, and voice models to clone executive voices for vishing. Traditional 'look for typos' awareness training is no longer sufficient. The new training has to teach process discipline, verify out-of-band, no exceptions for urgency.",
  },
  {
    type: "h2",
    id: "resilience",
    text: "Building Human Resilience",
  },
  {
    type: "ul",
    items: [
      "Regular phishing simulations with immediate, non-punitive feedback. The goal is muscle memory, not shame.",
      "Role-based security awareness training. The finance team's threat model is not the same as the developers'.",
      "Clear, simple reporting channels for suspicious communications, a single button in Outlook is more effective than a memo about the security@ inbox.",
      "Two-person authorisation for financial transactions above a defined threshold. The threshold is per-business; the principle is universal.",
      "Verification protocols for vendor-payment changes. Always verify by phone using a number from your existing vendor record, not from the email.",
      "A culture that rewards reporting over punishing mistakes. The employee who clicks and reports is more valuable than the employee who clicks and hides.",
      "[Email security](/cybersecurity/email-security) with AI behavioural analysis to catch what signature filters miss.",
    ],
  },
  {
    type: "h2",
    id: "90-day-program",
    text: "A 90-Day Awareness Programme",
  },
  {
    type: "ol",
    items: [
      "Days 1–30: Baseline phishing simulation across the entire organisation. Use the failure data to prioritise training. Do not punish anyone, the data is for the programme, not for HR.",
      "Days 31–60: Role-based training rollout. 30 minutes for general staff, 60 minutes for finance/HR/IT, 90 minutes for executives. Cover the patterns above, with examples that look like real internal communications.",
      "Days 61–90: Second simulation, with harder lures. Measure improvement against the baseline. Publish results internally with the message 'we are getting better, here is how much.'",
      "Day 91+: Quarterly simulations with new lure patterns. Annual refresher training. Continuous reinforcement through monthly micro-content (90-second videos, single-page advisories).",
    ],
  },
  {
    type: "p",
    text: "Technology helps, email filters, URL scanning, AI-powered detection catch many attacks. But the last line of defence is always the human. Training your employees to recognise and report social engineering is the highest-ROI security investment you can make.",
  },
  {
    type: "cta",
    title: "Phishing Simulation Pilot",
    description: "Run a single-cycle phishing simulation across your organisation. Get a benchmark report against UAE-industry averages. No commitment.",
    href: "/contact",
    label: "Start Pilot",
  },
];
