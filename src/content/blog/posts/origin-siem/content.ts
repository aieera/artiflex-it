import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "Every SIEM dashboard your analysts watch today traces its lineage to a 1970s mainframe printing paper logs. Understanding where SIEM came from, the real problems it solved at each stage, is the only way to choose the right SIEM, or to decide that MDR is the better answer, for where your organisation stands today.",
  },
  {
    type: "h2",
    id: "the-problem",
    text: "The Problem That Created SIEM",
  },
  {
    type: "p",
    text: "Before SIEM existed, enterprise security was a collection of isolated islands. Your firewall had its logs. Your servers had their syslogs. Your Windows domain controllers wrote to Windows Event Log. Your intrusion detection system had its own alert console. None of them talked to each other. An attacker could compromise a workstation, move laterally to a server, and exfiltrate data through the firewall, and each system would log fragments of the attack, none of which was connected.",
  },
  {
    type: "p",
    text: "Security teams in the late 1990s were drowning in logs with no way to correlate events across systems. The answer was obvious in hindsight: aggregate all logs in one place, normalise them, and build correlation rules that could connect the dots. That is what the first SIEM systems were built to do.",
  },
  {
    type: "quote",
    text: "A SIEM should not be a log archive. It should be the brain that connects signals your individual security tools cannot see in isolation, and the compliance engine that proves to your regulator that your organisation is actively managing cyber risk.",
  },
  {
    type: "h2",
    id: "timeline",
    text: "The Timeline: SIEM from 1997 to Today",
  },
  {
    type: "h3",
    text: "1970s to 1990s, the pre-SIEM era: paper logs and isolated consoles",
  },
  {
    type: "p",
    text: "Enterprise computers produced logs, but nobody systematically read them. Firewall logs, Unix syslog, Windows Event Log and IDS alerts all lived in separate systems. Security was perimeter-focused: if the firewall blocked the attacker, you were safe. There was no concept of cross-source event correlation.",
  },
  {
    type: "h3",
    text: "2001 to 2005, the birth of SIEM: ArcSight, NetForensics and Q1 Labs",
  },
  {
    type: "p",
    text: "ArcSight (2000), NetForensics (1999) and Q1 Labs (2001, later IBM QRadar) built the first true SIEM platforms. The term SIEM was coined by Gartner analysts Mark Nicolett and Amrit Williams in 2005, describing the convergence of SIM (Security Information Management) and SEM (Security Event Management). These first-generation SIEMs were on-premises, expensive, and required significant professional services to deploy and tune.",
  },
  {
    type: "h3",
    text: "2006 to 2012, PCI DSS drives mass adoption",
  },
  {
    type: "p",
    text: "PCI DSS mandated log management and security monitoring for all organisations processing card payments, and overnight, SIEM went from niche tool to compliance necessity. Splunk (2003) disrupted the market with its schema-on-read indexing model that could handle any log format without pre-defined parsers. ArcSight was acquired by HP in 2010 for $1.5B. IBM acquired Q1 Labs (QRadar) in 2011.",
  },
  {
    type: "h3",
    text: "2013 to 2017, UEBA: from signature rules to behavioural analytics",
  },
  {
    type: "p",
    text: "Signature-based correlation rules had a fundamental limitation: they only caught known attack patterns and generated enormous volumes of false positives. Exabeam (founded 2013) was built specifically around UEBA, its SmartTimelines reduced analyst investigation time from hours to minutes. Rapid7 InsightIDR launched in 2015 as one of the first cloud-native SIEMs, with user-based pricing that eliminated the per-GB log ingest shock of traditional platforms.",
  },
  {
    type: "h3",
    text: "2019 to 2022, cloud-native SIEMs challenge the legacy market",
  },
  {
    type: "p",
    text: "Microsoft Sentinel (2019) entered as an Azure-native SIEM. As cloud infrastructure grew, log volumes exploded, and Splunk's per-GB ingest model became a financial crisis for enterprises generating terabytes. The SIEM market bifurcated: legacy on-premises giants versus cloud-native disruptors with radically different pricing models.",
  },
  {
    type: "h3",
    text: "2024, consolidation: Cisco acquires Splunk, LogRhythm merges with Exabeam",
  },
  {
    type: "p",
    text: "Cisco acquired Splunk for $28B, the largest acquisition in Cisco's history, adding Cisco Talos threat intelligence to Splunk's detection engine. In the same year, LogRhythm and Exabeam merged to form Exabeam Fusion SIEM, combining LogRhythm's compliance automation heritage with Exabeam's industry-leading UEBA and SmartTimelines. The LogRhythm brand was retired; existing customers are migrating to the Exabeam Fusion SIEM roadmap.",
  },
  {
    type: "h3",
    text: "2025 to today, AI-augmented SOC and the MDR question",
  },
  {
    type: "p",
    text: "Modern SIEM platforms now integrate generative AI for analyst query assistance and automated investigation summaries. But the fundamental challenge, that SIEM requires skilled analysts to be effective, has not changed. For many UAE organisations, the question is no longer which SIEM, but SIEM or MDR.",
  },
  {
    type: "h2",
    id: "uae-context",
    text: "The UAE Context: SIEM or MDR?",
  },
  {
    type: "p",
    text: "UAE regulatory frameworks (NESA, CBUAE, ADHICS, PCI DSS) require security monitoring, incident detection and audit-ready evidence. These requirements can be met by a well-operated SIEM or by a capable MDR service. The compliance frameworks care about the outcome, not the specific tool.",
  },
  {
    type: "p",
    text: "For UAE organisations with in-house SOC capability, Rapid7 InsightIDR is our recommended SIEM: cloud-native, user-based pricing, fast time to value and an optional MDR overlay. For UAE organisations without in-house 24/7 SOC capability, evaluate Sophos MDR Complete before committing to a SIEM deployment.",
  },
  {
    type: "cta",
    title: "Compare SIEM platforms for the UAE",
    description: "Vendor comparison, a Gartner-style scorecard and an honest SIEM-vs-MDR recommendation across Rapid7 InsightIDR, Cisco Splunk, Exabeam Fusion, Microsoft Sentinel, IBM QRadar and Secureworks Taegis.",
    href: "/cybersecurity/security-operations/siem",
    label: "SIEM Vendor Comparison",
  },
];
