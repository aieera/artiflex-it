import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "Identity governance did not begin as a security initiative. It began as a compliance response to a wave of accounting scandals that convinced regulators that access to financial systems needed to be documented, reviewed, and defensible. The auditor's question drove the technology, and the technology has been catching up to that question ever since.",
  },
  {
    type: "h2",
    id: "compliance-shock",
    text: "Enron, Sarbanes-Oxley, and the Question Nobody Could Answer",
  },
  {
    type: "p",
    text: "The Enron collapse in 2001, followed in quick succession by WorldCom and Tyco, destroyed public confidence in corporate financial reporting. The US Congress responded with the Sarbanes-Oxley Act of 2002, the most consequential corporate governance legislation in a generation. Section 404 required management to certify the effectiveness of internal controls over financial reporting, with personal liability for the CEO and CFO.",
  },
  {
    type: "p",
    text: "The question auditors began asking enterprises was straightforward: who has access to your financial systems, and can you demonstrate that access is appropriate and has been reviewed? Most organisations could not answer it. Access had been granted informally over years, tracked inconsistently across dozens of platforms, and reviewed almost never.",
  },
  {
    type: "p",
    text: "What looked at first like a technology gap was actually a governance failure. Access decisions were made by individual administrators or managers, with no consistent approval process, no documented business justification, and no scheduled review. The systems could enforce permissions, but the organisation had no defensible way to explain why those permissions were what they were.",
  },
  {
    type: "quote",
    text: "When the auditors started asking who had access to the financial systems, most IT teams had to honestly answer that they didn't know with certainty. That admission was the founding moment of the IGA market.",
    cite: "The SOX compliance gap that created a $4B market",
  },
  {
    type: "h2",
    id: "early-response",
    text: "Spreadsheets, Then Provisioning Tools, Then Governance Platforms",
  },
  {
    type: "p",
    text: "The initial response to SOX was the spreadsheet. Compliance teams pulled access reports from every in-scope system, distributed them to managers for review, collected signed sign-offs on paper, and filed the evidence for the auditors. The process worked once, barely. It did not scale to quarterly or continuous review cycles, and the data was stale by the time the sign-offs came back.",
  },
  {
    type: "p",
    text: "SailPoint was founded in 2005 by a group of former Sun Identity Manager veterans who had watched first-generation provisioning tools struggle with the governance problem. SailPoint IdentityIQ launched in 2007 as the first purpose-built enterprise IGA platform, combining role management, access certifications, policy enforcement, and audit reporting in a single product. The category had a name and a reference architecture.",
  },
  {
    type: "p",
    text: "PCI-DSS, HIPAA enforcement, and later GDPR each added regulatory requirements that pushed more industries and geographies into the IGA market. The category grew steadily through the 2010s, picking up Saviynt (founded 2010, cloud-native from the start), Oracle Identity Governance, IBM Security Identity Governance, and One Identity Manager. By 2020, IGA was a multi-billion-dollar market.",
  },
  {
    type: "callout",
    variant: "info",
    title: "How AI Changed Identity Governance",
    text: "The first generation of IGA tools were compliance engines: they automated the evidence collection process but relied on humans to make governance decisions. The second generation, arriving in the mid-2010s, applied machine learning to identity data. Peer group analysis could identify when a user's access was anomalous compared to colleagues in the same role. Role mining algorithms could analyse actual access patterns across thousands of users and suggest logical role definitions that no human had explicitly designed. Risk scoring could prioritise which access certifications needed manager attention. IGA moved from automating compliance paperwork to actively surfacing risk.",
  },
  {
    type: "h2",
    id: "timeline",
    text: "From the SOX Spreadsheet to Continuous Identity Intelligence",
  },
  {
    type: "h3",
    text: "2002, SOX Section 404 Creates the Market",
  },
  {
    type: "p",
    text: "Sarbanes-Oxley made internal controls over financial reporting a board-level accountability. Access to financial systems became one of the controls that had to be documented, reviewed, and defended. The compliance question became the founding requirement of every IGA programme.",
  },
  {
    type: "h3",
    text: "2004, PCI-DSS Published",
  },
  {
    type: "p",
    text: "The Payment Card Industry Data Security Standard extended the same logic to cardholder data environments. Any organisation processing credit card transactions now had a binding requirement to control and review access to systems handling that data. The IGA business case expanded beyond public companies to anyone in the payment ecosystem.",
  },
  {
    type: "h3",
    text: "2005, SailPoint Founded",
  },
  {
    type: "p",
    text: "Founders Mark McClain and Kevin Cunningham, both veterans of Waveset Technologies (acquired by Sun and rebranded as Sun Identity Manager), saw that provisioning was only half of the identity problem. The other half (governance, certification, policy, audit) needed a purpose-built platform.",
  },
  {
    type: "h3",
    text: "2007, SailPoint IdentityIQ Launches",
  },
  {
    type: "p",
    text: "IdentityIQ was the first product in the market explicitly positioned as Identity Governance and Administration. It combined access request, certification, policy management, role lifecycle, and audit reporting in a single platform, and quickly became the reference architecture for the category.",
  },
  {
    type: "h3",
    text: "2014, Saviynt Founded, Cloud-Native IGA",
  },
  {
    type: "p",
    text: "Saviynt entered the market with a cloud-native architecture and a strong focus on SAP, Oracle ERP, and cloud infrastructure governance. It accelerated the shift away from on-premise IGA deployments and pushed competitors to rebuild their platforms for SaaS delivery.",
  },
  {
    type: "h3",
    text: "2018, GDPR Accelerates European IGA Adoption",
  },
  {
    type: "p",
    text: "The General Data Protection Regulation extended access governance requirements to personal data across every European organisation. Data subject access rights, purpose limitation, and the right to erasure all depend on a defensible understanding of who has access to what data and why. IGA adoption in Europe surged.",
  },
  {
    type: "h3",
    text: "Today, AI-Driven Continuous Governance",
  },
  {
    type: "p",
    text: "Modern IGA platforms (SailPoint Identity Security Cloud, Saviynt EIC, Microsoft Entra ID Governance, Omada Identity Cloud) use machine learning for role mining, anomaly detection, peer group analysis, and certification prioritisation. Governance is shifting from periodic certification campaigns toward continuous, signal-driven review.",
  },
  {
    type: "quote",
    text: "IGA was built by auditors' questions and compliance teams' fears. But it was evolved by security teams who discovered that the same platform that proved compliance to an auditor could also catch insider threats, privilege creep, and compromised accounts, if you asked it the right questions.",
    cite: "How IGA grew from compliance tool to security control",
  },
];
