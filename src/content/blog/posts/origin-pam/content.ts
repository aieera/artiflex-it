import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "In data centres across the 1990s, the most powerful credentials in the building were often the least protected. Root passwords lived in shared notebooks, in spreadsheets passed by email, and on the occasional Post-it note stuck to a monitor bezel. The accounts that could end a company in an afternoon were managed with the operational rigour of a coffee rota.",
  },
  {
    type: "h2",
    id: "shared-secrets",
    text: "The Root Password That Nobody Could Change, Because Nobody Knew What It Would Break",
  },
  {
    type: "p",
    text: "The Unix administration culture of the 1980s and early 1990s was built on small, high-trust teams. A handful of engineers ran the entire estate, and root was a shared discipline rather than a controlled credential. Everyone needed it, everyone had it, and changing it required nothing more than a corridor conversation. The model worked because the team fit in one room.",
  },
  {
    type: "p",
    text: "Then organisations grew. Contractors arrived and were handed the same root password the permanent staff used. Service accounts proliferated as applications multiplied, each one needing its own credential to talk to databases, schedulers, and middleware. Those credentials were embedded in scripts, hardcoded into configuration files, and reused across environments. Nobody wanted to rotate them because nobody could be sure which production system would silently break when they did.",
  },
  {
    type: "p",
    text: "The result was a structural paradox that defined the era. Privileged credentials were simultaneously the most powerful artefacts in the enterprise and the least managed. They were the keys to the kingdom, copied freely, written down casually, and almost never rotated.",
  },
  {
    type: "quote",
    text: "When we did our first privileged account audit, we found over 3,000 service accounts that nobody knew existed. Some of them had been running continuously for eleven years. Several had never had their passwords changed. Three of them had domain administrator privileges and nobody could explain why.",
    cite: "A discovery that is almost universal in organisations that have never done PAM",
  },
  {
    type: "h2",
    id: "vault-concept",
    text: "CyberArk and the Digital Safe That Changed Privileged Access",
  },
  {
    type: "p",
    text: "CyberArk was founded in 1999 in Israel by Alon Cohen and Udi Mokady. Their core idea was deceptively simple: treat privileged credentials the way banks treat cash. Build a hardened, encrypted vault, place the passwords inside, and require controlled, audited check-out for any human or system that needed to use them. The Digital Vault concept gave the industry its first credible answer to the post-it note problem.",
  },
  {
    type: "p",
    text: "Adoption was slow at first. PAM was a discipline most organisations did not yet believe they needed, and the budget conversation was difficult. A series of high-profile breaches in the late 2000s changed the calculation. By 2010, CyberArk had established the operational template that the rest of the industry would follow, and privileged access had moved from a neglected corner of identity into a board-level concern.",
  },
  {
    type: "p",
    text: "Session recording arrived alongside vaulting and quickly became inseparable from it. Recording every keystroke and screen of a privileged session offered two things at once. It deterred casual misuse, because administrators knew their actions were captured. And it gave investigators forensic ground truth when an incident did occur, because the session itself could be replayed line by line.",
  },
  {
    type: "callout",
    variant: "info",
    title: "The DevOps Problem: When Applications Became Privileged Users",
    text: "Cloud computing and DevOps practices created a new class of privileged access problem. Modern applications connect to databases, call APIs, access cloud storage; each connection requires a credential. In early DevOps environments these credentials were stored in source code and configuration files, often with insufficient protection and almost never rotated. The problem was identified as secrets sprawl. HashiCorp Vault, launched in 2015, provided a developer-friendly secrets management API that let applications retrieve credentials at runtime rather than storing them statically. Modern PAM platforms have since incorporated secrets management as a core capability alongside traditional privileged account vaulting.",
  },
  {
    type: "h2",
    id: "timeline",
    text: "From Shared Root Passwords to Just-in-Time Privilege",
  },
  {
    type: "h3",
    text: "1980s, Shared Root, The Informal Era",
  },
  {
    type: "p",
    text: "Small Unix teams shared root by convention. Credentials lived in memory, in notebooks, and in oral tradition. The model scaled poorly but persisted long after it should have, because no commercial alternative existed.",
  },
  {
    type: "h3",
    text: "1999, CyberArk Founded, The Digital Vault",
  },
  {
    type: "p",
    text: "Alon Cohen and Udi Mokady launched the first credible vault-based approach to privileged credentials, establishing the architectural blueprint that the rest of the PAM market would build on for the next two decades.",
  },
  {
    type: "h3",
    text: "2003, Session Recording Becomes Standard",
  },
  {
    type: "p",
    text: "Vendors added video and keystroke capture for privileged sessions, giving forensics teams replayable evidence and giving administrators a reason to behave as if someone was always watching.",
  },
  {
    type: "h3",
    text: "2010, BeyondTrust and Delinea Emerge",
  },
  {
    type: "p",
    text: "Competing platforms entered the market, broadening PAM beyond credential vaulting into endpoint privilege management, least-privilege enforcement on workstations, and Active Directory bridging for Unix and Linux estates.",
  },
  {
    type: "h3",
    text: "2015, HashiCorp Vault, DevOps Secrets Management",
  },
  {
    type: "p",
    text: "HashiCorp Vault gave application developers an API-first way to retrieve secrets at runtime. Secrets management became a first-class discipline alongside human privileged access, and the two have been converging ever since.",
  },
  {
    type: "h3",
    text: "2018, Just-in-Time Access Becomes Standard",
  },
  {
    type: "p",
    text: "Standing administrative privilege fell out of favour. Modern PAM platforms began granting elevation only for the duration of an approved task, with automatic expiry, removing the persistent attack surface that long-lived admin accounts had always presented.",
  },
  {
    type: "h3",
    text: "Today, Cloud PAM and Zero Standing Privilege",
  },
  {
    type: "p",
    text: "Privileged access today is policy-driven, ephemeral, and continuous. Cloud entitlements, infrastructure-as-code pipelines, and Kubernetes secrets are all governed through the same control plane. The destination is Zero Standing Privilege, a state in which no human or workload holds elevated rights by default, only on demand and only for as long as the work requires.",
  },
  {
    type: "quote",
    text: "Every major breach we investigated involved privileged access. Not always because the privileged account was the entry point, often it was not. But privileged access was always the amplifier that turned a limited compromise into a total one. PAM doesn't stop breaches. It stops them from becoming catastrophic.",
    cite: "Why PAM is the control that limits breach impact more than any other",
  },
];
