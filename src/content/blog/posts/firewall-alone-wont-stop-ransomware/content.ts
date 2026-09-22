import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "A firewall is doing exactly what it was designed to do, blocking unauthorised traffic at the network edge. But ransomware in 2026 does not need to breach your firewall. It walks through the front door, in business hours, dressed as the CFO.",
  },
  {
    type: "p",
    text: "If your security strategy still treats the perimeter as the primary defence, you are protecting against the threat model of 2010, not 2026. This article walks the modern ransomware kill chain step by step, then maps the seven controls that actually disrupt it.",
  },
  {
    type: "h2",
    id: "kill-chain",
    text: "Anatomy of a Modern Ransomware Attack",
  },
  {
    type: "h3",
    id: "initial-access",
    text: "1. Initial Access",
  },
  {
    type: "p",
    text: "A convincing phishing email lands in an employee's inbox. The lure is current, a payroll-system migration, a regulatory update, an invoice from a known vendor. The email passes SPF/DKIM/DMARC because the attacker is using a compromised legitimate sender. One click, and a credential-harvesting page captures the user's Microsoft 365 password. Or a maldoc downloads a small loader. Either way, the attacker now has a foothold.",
  },
  {
    type: "h3",
    id: "lateral-movement",
    text: "2. Lateral Movement",
  },
  {
    type: "p",
    text: "Using the compromised credentials, the attacker moves laterally across the network. They harvest additional credentials from memory, dump LSASS on workstations they reach, and gradually escalate to a domain administrator account. This phase is often quiet, weeks of reconnaissance, because the attacker wants to know exactly what they will encrypt before they trigger the ransom.",
  },
  {
    type: "h3",
    id: "data-exfil",
    text: "3. Data Exfiltration",
  },
  {
    type: "p",
    text: "Before encryption, modern ransomware crews exfiltrate sensitive data. The leverage is double extortion: pay to decrypt, and pay again so we don't publish your client list / financial records / source code on a leak site. This is why backups alone are no longer sufficient, even an organisation that can fully restore systems still faces the data-publication threat.",
  },
  {
    type: "h3",
    id: "encryption",
    text: "4. Encryption and Demand",
  },
  {
    type: "p",
    text: "The ransomware deploys across all accessible systems simultaneously, encrypting files and rendering systems inert. A note appears with a payment demand, typically 24–72 hours, in cryptocurrency, with a discount for fast payment and a publication deadline if no response. By the time you see the note, the attacker has already had weeks of access.",
  },
  {
    type: "callout",
    variant: "info",
    title: "Median dwell time",
    text: "The median dwell time between initial access and ransomware deployment in 2024 was 6 days, down from 15 in 2022. Faster attackers, less time to detect, more pressure on monitoring quality. (Source: Mandiant M-Trends 2024)",
  },
  {
    type: "h2",
    id: "what-stops-it",
    text: "What Actually Stops Ransomware",
  },
  {
    type: "p",
    text: "The firewall remains essential, but it is one layer in a defence-in-depth strategy. Without the others, it is a locked front door on a house with open windows.",
  },
  {
    type: "ol",
    items: [
      "[Endpoint Detection and Response (EDR)](/cybersecurity/endpoint-security-edr-xdr) on every endpoint, laptops, servers, virtual desktops. EDR catches the lateral-movement and credential-dumping phases that perimeter tools cannot see.",
      "Network segmentation. A flat network is a free lateral-movement playground. Segment by trust zone, with explicit allow rules between zones.",
      "[Email security](/cybersecurity/email-security) with AI-assisted threat protection. Modern phishing bypasses signature filters; you need behavioural and intent analysis.",
      "Regular, tested, immutable backups. Air-gapped or object-lock storage that the attacker cannot encrypt or delete even with domain admin.",
      "Phishing-resistant MFA on every privileged account. SMS codes are no longer sufficient, use FIDO2 hardware keys or Microsoft Authenticator with number matching.",
      "[24/7 SOC monitoring](/cybersecurity/security-operations/siem) with documented incident-response runbooks. Detection at 3 AM matters as much as at 3 PM.",
      "Quarterly tabletop exercises with leadership. The first time the CEO sees a ransom note should not be the day it lands.",
    ],
  },
  {
    type: "h2",
    id: "30-day-plan",
    text: "A 30-Day Action Plan",
  },
  {
    type: "p",
    text: "If you are starting from a low baseline, do not try to fix everything in week one. The four highest-yield moves in the first 30 days:",
  },
  {
    type: "ul",
    items: [
      "Week 1: Enable MFA on every privileged account and audit local admin rights on workstations.",
      "Week 2: Deploy EDR to your top 20% of high-value endpoints, domain controllers, file servers, finance systems.",
      "Week 3: Run a phishing simulation campaign and use the failure data to prioritise awareness training.",
      "Week 4: Test your backup restoration end-to-end. Not just 'the backup completed', actually restore a system and verify data integrity.",
    ],
  },
  {
    type: "cta",
    title: "Get a Ransomware Readiness Review",
    description: "30-minute readiness review against the seven controls above. We will tell you exactly where you are exposed and what to fix first.",
    href: "/contact",
    label: "Book Review",
  },
];
