import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "Walk into any large enterprise IT department in 2002 and ask how access requests were handled, and the answer was almost always the same. A new employee joined and HR sent an email. The IT service desk opened a ticket. Someone manually created an Active Directory account, an email mailbox, an Oracle Financials login, an Exchange distribution list membership, an SAP user, an SAN file-share access right and possibly half a dozen other entitlements. Each one was a separate ticket, often handled by a different team, often without a record of what the new employee was actually entitled to.",
  },
  {
    type: "p",
    text: "When that employee changed roles, almost none of the original entitlements were removed. They simply accumulated. When that employee eventually left, somebody was supposed to disable everything, but the disable list was a checklist that nobody owned and nobody verified. Years later, audit trails would surface dormant accounts that had been active long after their owners had left the company, with privileges nobody could explain, on systems nobody had reviewed.",
  },
  {
    type: "p",
    text: "That model worked, after a fashion, until July 2002. Then Sarbanes-Oxley was signed into US law, and within months, every public company in the world was being asked the same question by external auditors: prove you can demonstrate, with evidence, who has access to what financial system, why they have it, and that the access has been reviewed by a manager. The manual ticket-and-spreadsheet model had no answer to any of those questions. The compliance crisis that followed gave birth to the discipline now called Identity Governance and Administration.",
  },
  {
    type: "callout",
    variant: "info",
    title: "Why this history matters in 2026",
    text: "IGA is the layer that ties identity to compliance. NESA, NCA ECC, ADHICS, UAE PDPL, ISO 27001, PCI-DSS and SOX all now require evidence of access certification, segregation of duties and lifecycle controls. The product category exists because no audit regime in 2026 will accept \"we have an Active Directory and we manually review accounts sometimes\" as an answer.",
  },
  {
    type: "h2",
    id: "phase-1",
    text: "Phase 1 (Pre-2002): The Manual Provisioning Era",
  },
  {
    type: "p",
    text: "Before IGA was a category, identity provisioning was a help-desk function. The first attempts to automate it appeared in the late 1990s. Waveset Technologies, founded in 1999, built one of the earliest unified identity provisioning platforms. Business Layers (founded 1996) and Access360 (founded 2000) competed in the same space. By 2002, IBM had acquired Access360 and rebranded it as Tivoli Identity Manager, while Sun Microsystems had acquired Waveset in 2003 and launched Sun Identity Manager.",
  },
  {
    type: "p",
    text: "These first-generation products were largely workflow engines. They could automate the joiner-mover-leaver (JML) process by reading from an HR system, generating accounts in target applications, and de-provisioning them on departure. What they could not do (and what nobody had yet invented) was answer the question \"who should have what access, and why\". Provisioning was the mechanism. Governance, the question of policy and entitlement appropriateness, was still a manual quarterly exercise involving spreadsheets and email.",
  },
  {
    type: "h2",
    id: "phase-2",
    text: "Phase 2 (2002-2010): SOX, SailPoint and the Birth of Governance",
  },
  {
    type: "p",
    text: "Sarbanes-Oxley changed the conversation overnight. SOX Section 404 required management certification of internal controls over financial reporting, and the Public Company Accounting Oversight Board's Auditing Standard No. 5 explicitly identified user access controls as in scope. Auditors began demanding quarterly access reviews, segregation-of-duties (SoD) analysis, evidence of approval for every privileged grant, and full lifecycle audit trails for every change. The provisioning vendors had no answer.",
  },
  {
    type: "p",
    text: "The category-defining company was SailPoint Technologies, founded in 2005 in Austin, Texas, by Mark McClain, Kevin Cunningham and Jackie Gilbert (all ex-Waveset). SailPoint's central thesis was that provisioning and governance were two halves of the same discipline, and that the governance half (visibility, certification, policy enforcement, risk scoring) was the strategically important one. SailPoint IdentityIQ, launched in 2008, defined what the modern IGA platform looked like: an identity warehouse that aggregated entitlement data from every connected application, an access certification engine that drove campaigns through line-of-business managers, an SoD policy engine, role-mining capabilities and risk-scoring on every entitlement.",
  },
  {
    type: "p",
    text: "The competitive response was rapid. Oracle acquired Thor Technologies in 2005 and built Oracle Identity Governance. Aveksa (founded 2005) built a comparable governance platform and was acquired by EMC/RSA in 2013. CA Technologies acquired Niku in 2006 and built CA Identity Governance. Quest Software, IBM and Novell all built or acquired governance modules. By 2010, IGA was a recognised, distinct category from the older provisioning vendors, with SailPoint as the clear leader.",
  },
  {
    type: "h2",
    id: "phase-3",
    text: "Phase 3 (2010-2018): Role Mining, Risk-Based Certification and Saviynt",
  },
  {
    type: "p",
    text: "The 2010s expanded IGA in two directions. The first was role engineering. Most enterprises had hundreds of thousands of entitlements scattered across hundreds of applications, and managing access at the entitlement level was operationally impossible. Role-Based Access Control (RBAC) consolidated entitlements into roles (\"branch teller\", \"loan officer\", \"audit reviewer\") that could be assigned to users in bulk. Role-mining tools (SailPoint, Saviynt, Hitachi ID, Avatier) analysed historical entitlement patterns to suggest candidate roles, allowing organisations to retrofit RBAC onto messy existing environments.",
  },
  {
    type: "p",
    text: "The second expansion was risk-based certification. First-generation access certification campaigns asked managers to review every direct report's access at every application. Managers, faced with hundreds of line items, rubber-stamped them. Risk-based certification (introduced commercially around 2012) prioritised the review by risk score: review every privileged entitlement, every SoD violation, every unusual entitlement first; defer or auto-approve the routine. Certification fatigue dropped, and audit credibility improved.",
  },
  {
    type: "p",
    text: "Saviynt was founded in 2010 in Los Angeles by Amit Saha and Sachin Nayyar. Where SailPoint had been built on-premise first, Saviynt was cloud-native from inception, and grew rapidly as enterprises moved their identity stack to SaaS. By 2018, Saviynt was the most credible challenger to SailPoint in the IGA market and had become the default IGA platform for many cloud-first enterprises. SAP IdentityIQ (renamed SAP Cloud Identity Access Governance after the 2020 SAP acquisition of Cloud Identity Access Governance), Omada and Hitachi ID rounded out the mid-market.",
  },
  {
    type: "h2",
    id: "phase-4",
    text: "Phase 4 (2018-2023): Cloud-Native IGA and Microsoft Entra ID Governance",
  },
  {
    type: "p",
    text: "Three forces reshaped IGA in this period. The first was the SaaS sprawl problem. Enterprises were no longer provisioning into a few dozen on-premise applications; they were provisioning into hundreds of SaaS applications, many of them adopted by individual business units without IT involvement. SCIM 2.0 (System for Cross-domain Identity Management, ratified in September 2015) became the standard provisioning protocol for SaaS, and IGA platforms invested heavily in SCIM connector libraries.",
  },
  {
    type: "p",
    text: "The second was the cloud entitlement problem. AWS, Azure and GCP did not have entitlements in the traditional IGA sense; they had IAM policies that could grant millions of fine-grained permissions in combinations that were impossible to enumerate manually. A new sub-category, Cloud Infrastructure Entitlement Management (CIEM), emerged to cover this. Sonrai Security, Ermetic (acquired by Tenable in 2023), CloudKnox (acquired by Microsoft in 2021 and rebranded Microsoft Entra Permissions Management), Authomize and Britive built CIEM platforms that could right-size cloud permissions based on actual usage data.",
  },
  {
    type: "p",
    text: "The third was Microsoft. Azure AD Identity Governance launched in 2018 with access reviews, entitlement management, terms of use and PIM. Over the following five years it expanded into a credible IGA platform under the Microsoft Entra ID Governance brand, and by 2024 it was the default IGA option for any organisation already standardised on Microsoft 365 E5 or Entra ID Governance licences. Microsoft's strategic position (the identity provider, the directory, the productivity suite, the device management plane and the IGA all from one vendor) put significant pressure on the specialist IGA market.",
  },
  {
    type: "h2",
    id: "phase-5",
    text: "Phase 5 (2023 onwards): AI-Augmented Governance and SaaS Identity Risk Management",
  },
  {
    type: "p",
    text: "The most recent shift is the use of machine learning across the IGA workflow. SailPoint, Saviynt, Microsoft and Okta have all introduced AI-powered features that recommend role assignments based on similar peers, flag anomalous entitlements that deviate from a user's job function, score certification campaigns for risk and identify orphaned or excessive access faster than rule-based engines can. The 2026 generation of IGA is increasingly AI-first, with the human reviewer making decisions on a curated and prioritised list rather than reviewing everything.",
  },
  {
    type: "p",
    text: "A parallel development is SaaS Identity Risk Management (SIRM), a category that overlaps with IGA but focuses on the SaaS application surface specifically. Vendors like Grip Security, Reco AI, Obsidian Security and Wing Security continuously discover SaaS applications in use across an organisation, map identities and entitlements within each, and surface excessive access as a risk to the central IGA platform. For enterprises with hundreds of SaaS apps, this discovery layer is increasingly required.",
  },
  {
    type: "p",
    text: "The 2026 state of the art combines: an IGA platform of record (SailPoint Identity Security Cloud, Saviynt Enterprise Identity Cloud, Microsoft Entra ID Governance, One Identity Manager, Oracle IGA) for lifecycle, certification, policy and audit; a CIEM platform for cloud entitlement right-sizing; a SaaS discovery layer for shadow-SaaS identity exposure; and integration into the broader [IAM](/blog/origin-identity-access-management) and [PAM](/blog/origin-privileged-access-management) stack so that lifecycle changes, privilege elevation and authentication policy operate from a shared identity model.",
  },
  {
    type: "stats",
    items: [
      {
        value: "2002",
        label: "SOX signed into law",
        sublabel: "Compliance crisis begins",
      },
      {
        value: "2005",
        label: "SailPoint founded",
        sublabel: "Austin; defines IGA",
      },
      {
        value: "2010",
        label: "Saviynt founded",
        sublabel: "First cloud-native IGA",
      },
      {
        value: "2018",
        label: "Microsoft Entra ID Governance",
        sublabel: "Cloud IGA goes mainstream",
      },
      {
        value: "2024+",
        label: "AI-augmented IGA",
        sublabel: "Recommendation-driven certification",
      },
    ],
  },
  {
    type: "h2",
    id: "uae-implications",
    text: "What This History Tells UAE Businesses Today",
  },
  {
    type: "p",
    text: "If you are running, scaling or replacing IGA capability in 2026, the five-phase arc above is not academic. Three things follow directly.",
  },
  {
    type: "p",
    text: "The first is that IGA is now a regulator-facing capability. NESA Compliance Levels 3 and 4, NCA ECC's identity and access management family, ADHICS section IM, and UAE PDPL's accountability requirements all expect evidence of formal access certification, lifecycle controls and segregation-of-duties enforcement. A spreadsheet-and-email access review in 2026 is no longer credible to an external auditor.",
  },
  {
    type: "p",
    text: "The second is that joiner-mover-leaver is the highest-leverage workflow to automate. The biggest single source of toxic access in most UAE environments we audit is accumulated entitlements from roles users no longer hold. Automating the mover step (so that role changes trigger entitlement reconciliation, not just additive provisioning) eliminates more risk per dirham of investment than any other single IGA control.",
  },
  {
    type: "p",
    text: "The third is that the right IGA architecture depends heavily on what is already deployed. For organisations standardised on Microsoft 365 E5, Entra ID Governance is the rational starting point and often sufficient. For organisations with a heavy SAP, Oracle or legacy mainframe footprint, SailPoint or Saviynt is usually the better fit because the connector ecosystems are deeper. Picking IGA in isolation from the rest of the identity stack produces double-vendor cost and integration debt that lasts for years.",
  },
  {
    type: "h2",
    id: "where-artiflex",
    text: "Where Artiflex IT Comes In",
  },
  {
    type: "p",
    text: "Artiflex IT designs, deploys and operates [Identity Governance & Administration programmes](/cybersecurity/identity-governance-administration) across the UAE, Oman and Saudi Arabia. We deliver SailPoint, Saviynt, Microsoft Entra ID Governance, One Identity Manager and Oracle IGA depending on the existing identity stack, regulated-industry footprint and compliance regime. We start with an entitlement discovery exercise (because no governance platform can certify access it cannot enumerate) and then phase the rollout to deliver SOX, NESA, ADHICS or PCI evidence in the first audit cycle.",
  },
  {
    type: "p",
    text: "If your access reviews are quarterly Excel exercises, your joiner-mover-leaver is mostly joiners with a long tail of unrevoked access, your SoD policy lives in a Word document, or your cloud entitlements have never been right-sized, we will tell you exactly where you are exposed and what an honest re-design looks like. No upselling, no theatre.",
  },
  {
    type: "cta",
    title: "Talk to our Consultant",
    description: "30-minute review of your current identity lifecycle automation, access certification cadence, SoD enforcement and cloud entitlement posture. We will surface the three highest-impact gaps to fix first, with no commitment.",
    href: "/contact",
    label: "Book Consultation",
  },
];
