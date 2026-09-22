import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "For decades, IT departments relied on managers to tell them when employees joined, moved, and left. Managers rarely did. The ghost accounts that remained behind became one of the most persistent, expensive, and preventable security problems in enterprise computing, and the practice that grew up to solve them is what we now call Identity Lifecycle Management.",
  },
  {
    type: "h2",
    id: "the-beginning",
    text: "In the Beginning, There Was the Helpdesk Ticket, and Nobody Sent It",
  },
  {
    type: "p",
    text: "In early enterprise computing, the assumption was straightforward. A new employee would join the company, their manager would raise a ticket with IT, and IT would create the accounts the new joiner needed to do their job. When an employee left, the manager would raise another ticket, and IT would disable the accounts. The theory was sound. The practice was a disaster.",
  },
  {
    type: "p",
    text: "Managers were busy. Offboarding tickets were low-priority compared to closing out a departing employee's projects, finding a replacement, and dealing with the operational disruption of a vacancy. Role-change tickets were forgotten almost entirely, because the new role got the new access while the old access quietly persisted. Dormant accounts piled up. Orphaned service accounts, created for a project nobody remembered, kept running with credentials that had not been rotated in years.",
  },
  {
    type: "p",
    text: "Ghost accounts were everywhere. A widely cited 2009 study of enterprise environments found hundreds of active accounts belonging to ex-employees in typical large organisations, some still with administrator privileges. By the late 2000s, penetration testers had a running joke: their number one attack path was not exploiting a vulnerability, it was logging in with a credential that should have been disabled three years earlier.",
  },
  {
    type: "quote",
    text: "Ghost accounts were not an edge case. They were the norm. Auditors would walk into a client and find hundreds of active accounts for people who had left years ago, some with administrator privileges. No attack required. Just a credential, a login prompt, and open access.",
    cite: "The access accumulation problem that drove ILM's creation",
  },
  {
    type: "h2",
    id: "regulatory-shock",
    text: "Sarbanes-Oxley Forced Organisations to Answer a Question They Had Avoided",
  },
  {
    type: "p",
    text: "The shift came from compliance, not security. The question auditors began asking after Sarbanes-Oxley was simple to ask and devastating to answer: who has access to your financial systems, when did they get that access, who approved it, and when was it last reviewed? For most organisations, the honest answer was a shrug.",
  },
  {
    type: "p",
    text: "SOX in 2002 was followed by PCI-DSS in 2004, HIPAA enforcement, and eventually GDPR in 2018. Each one made manual joiner-mover-leaver processes practically impossible at enterprise scale. If you could not produce a defensible audit trail of every access grant and revocation, you could not certify your controls, and your auditors would not sign off.",
  },
  {
    type: "p",
    text: "The Identity Lifecycle Management market emerged in response. Early meta-directory tools tried to synchronise account data across disparate systems. Microsoft MIIS (later FIM, then MIM), Sun Identity Manager, and IBM Tivoli Identity Manager were the first generation of platforms that promised to automate provisioning, deprovisioning, and access change management as a programmatic discipline rather than a hopeful ticketing workflow.",
  },
  {
    type: "callout",
    variant: "info",
    title: "How HR Became the Identity System of Record",
    text: "The insight that transformed ILM from a good idea to a workable practice was connecting it to HR data as the authoritative source of truth. HR systems were the only enterprise systems that had a business imperative to maintain accurate, up-to-date records of who worked at the organisation. Payroll depends on it. Legal compliance depends on it. By treating the HR record as the event trigger for identity lifecycle events, ILM platforms found a data source that was reliably maintained by someone with strong non-security reasons to keep it accurate. The identity lifecycle became an automated consequence of the employment lifecycle.",
  },
  {
    type: "h2",
    id: "timeline",
    text: "From the Forgotten Ticket to the Automated Lifecycle",
  },
  {
    type: "h3",
    text: "1980s, Manual Account Management",
  },
  {
    type: "p",
    text: "Account creation and deletion were entirely manual, driven by paper forms or early helpdesk tickets routed to whichever administrator happened to own the platform in question. There was no central record of who had access to what, only fragmented data scattered across mainframes, Unix systems, and early PC networks.",
  },
  {
    type: "h3",
    text: "1993, LDAP Centralises Identity Directories",
  },
  {
    type: "p",
    text: "LDAP gave enterprises their first realistic option for a centralised identity directory, and over the following decade Active Directory, Novell NDS, and other LDAP-backed directories created a single point where account data could be inventoried. Centralisation was the prerequisite for lifecycle automation.",
  },
  {
    type: "h3",
    text: "2002, SOX Creates Compliance Pressure",
  },
  {
    type: "p",
    text: "Section 404 of Sarbanes-Oxley required management to certify the effectiveness of internal controls over financial reporting. Access to financial systems became a control that had to be documented, reviewed, and defensible. The audit pressure created a budget line for lifecycle automation that had not existed before.",
  },
  {
    type: "h3",
    text: "2003, First Enterprise ILM Platforms",
  },
  {
    type: "p",
    text: "Microsoft Identity Integration Server, Sun Identity Manager, IBM Tivoli Identity Manager, and Novell Identity Manager all shipped around the same window. The category had a name (identity provisioning) and a workable shape: connectors to source systems, connectors to target systems, and a workflow engine in the middle.",
  },
  {
    type: "h3",
    text: "2008, HR Integration as Standard",
  },
  {
    type: "p",
    text: "The mature pattern emerged: HR systems (Workday, SAP HR, Oracle HCM, PeopleSoft) became the authoritative source. A new hire in the HR system triggered provisioning workflows. A termination triggered deprovisioning. A role change triggered access recertification. The lifecycle was no longer driven by manager tickets, it was driven by data the business already maintained.",
  },
  {
    type: "h3",
    text: "2012, Cloud ILM Emerges",
  },
  {
    type: "p",
    text: "The SaaS explosion broke on-premise ILM tools that had been designed around a known set of LDAP-bound applications. Okta Lifecycle Management, Microsoft Azure AD provisioning, and SailPoint IdentityNow extended the lifecycle model across thousands of SaaS applications using SCIM, the System for Cross-domain Identity Management standard.",
  },
  {
    type: "h3",
    text: "Today, AI-Driven Role Mining",
  },
  {
    type: "p",
    text: "Modern ILM platforms (Microsoft Entra ID Governance, SailPoint Identity Security Cloud, Saviynt EIC) use machine learning to analyse actual access patterns across the workforce, suggest role definitions that match how people really work, and flag access that diverges from a user's peer group. The lifecycle is no longer a fixed workflow, it is a continuous intelligence layer.",
  },
  {
    type: "quote",
    text: "The joiner-mover-leaver framework did not originate in a security team. It originated in auditors' questions and HR managers' frustrations with IT. The best identity security frameworks are built around the operational realities of human organisations, not invented in isolation by security architects.",
    cite: "Why the best ILM frameworks came from business requirements, not security theory",
  },
];
