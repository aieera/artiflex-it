import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "Walk into any enterprise security team in 2002 and ask them what kept them awake at night, and the answer was usually some variant of the same scenario. A salesperson resigning on a Friday, downloading the entire customer list onto a USB stick, and starting at a competitor on Monday. An engineer emailing source code to a personal address. A finance assistant attaching the payroll file to a webmail draft. Nobody could see any of it happening. The perimeter was watching the wrong direction. Firewalls and IDS were designed to keep attackers out; nothing was watching the data leave.",
  },
  {
    type: "p",
    text: "Twenty-four years later, that single, deceptively simple problem has produced an entire industry. Modern Data Loss Prevention now spans endpoint, network, email, web, cloud applications and structured data stores, and is being absorbed into a newer category, Data Security Posture Management, that adds discovery and risk scoring on top of enforcement. The path from one to the other was not linear. Every step was a response to a specific failure of the step that came before it. This is how DLP actually evolved.",
  },
  {
    type: "callout",
    variant: "info",
    title: "Why this history matters in 2026",
    text: "DLP product names overlap, vendor categories blur, and \"DLP\" can mean very different things depending on which generation of product you are looking at. Knowing the lineage is the fastest way to evaluate whether your current data protection programme is actually fit for the data exposure threats you face today.",
  },
  {
    type: "h2",
    id: "phase-1",
    text: "Phase 1 (Pre-2003): The Egress Era",
  },
  {
    type: "p",
    text: "Before DLP existed as a category, the only thing watching outbound traffic was the firewall. Firewalls knew about IP addresses, ports and protocols. They had no idea what was inside the traffic. A 50 MB outbound HTTP POST to a personal Dropbox account looked exactly the same as a 50 MB software update. The data exfiltration problem was invisible by design.",
  },
  {
    type: "p",
    text: "The earliest attempts to solve it were crude. Email gateways scanned attachments for keywords. Web proxies blocked file uploads above a certain size. Some organisations disabled USB ports entirely with Windows Group Policy. None of it was content-aware in any meaningful sense. A keyword filter for \"confidential\" would catch a marketing brochure that used the word in a footer and miss an unmarked customer list. Compliance teams produced policies; technology was largely incapable of enforcing them.",
  },
  {
    type: "p",
    text: "Two regulatory shifts began to change the conversation. The Sarbanes-Oxley Act of 2002 made executives personally liable for financial reporting controls, which suddenly made \"who exported what\" a board-level question. HIPAA enforcement in the US started carrying real penalties for healthcare data exposure. PCI-DSS arrived in 2004 and made cardholder data protection a contractual requirement for anyone touching payment cards. Boards needed evidence that sensitive data was not leaking. The market was now ready to pay for a real answer.",
  },
  {
    type: "h2",
    id: "phase-2",
    text: "Phase 2 (2003-2010): Vontu and the Birth of Real DLP",
  },
  {
    type: "p",
    text: "The category-defining company was Vontu, founded in San Francisco in 2001 and shipping product by 2003. Vontu's central insight was that data leakage prevention had to start with content inspection, not perimeter geometry. The Vontu engine fingerprinted sensitive documents, built statistical signatures of regulated data formats (credit card numbers, social security numbers, customer record schemas), and inspected outbound channels for matches in real time.",
  },
  {
    type: "p",
    text: "Where earlier tools had used naive keyword matching, Vontu introduced two techniques that became the foundation of every DLP product since. The first was Exact Data Matching, which fingerprinted the rows of a structured database and could detect any subset of those rows leaving the network even if formatted differently. The second was Indexed Document Matching, which fingerprinted the bytes of a sensitive document so that even a small extract pasted into a webmail message could be identified as belonging to a protected source. Combined with regex-based detection for regulated data formats, Vontu's engine could finally tell the difference between \"the word confidential\" and \"the actual confidential data\".",
  },
  {
    type: "p",
    text: "In November 2007, Symantec acquired Vontu for USD 350 million. The acquisition consolidated Symantec's lead in the new category and rebranded the platform as Symantec DLP, which dominated enterprise DLP for the next decade. The competitive response was rapid. EMC acquired Tablus in 2007 and rebranded it as RSA DLP. McAfee acquired Reconnex in 2008 and folded it into McAfee DLP. Websense launched its own DLP offering in 2007 and would go on to merge with Raytheon's network security business and rebrand as Forcepoint in 2016. Code Green Networks, GTB Technologies and Trustwave filled out the early enterprise market.",
  },
  {
    type: "p",
    text: "By 2010, the playbook was set. A typical enterprise DLP deployment had three components. A network DLP appliance inspected traffic at the perimeter. An endpoint DLP agent watched USB, print, screen capture and clipboard activity on managed devices. An email DLP integration sat in front of the mail server and inspected outbound messages. The data was classified once and policies enforced everywhere. It was a triumph of integration on paper. In practice, it was operationally heavy and chronically false-positive prone.",
  },
  {
    type: "h2",
    id: "phase-3",
    text: "Phase 3 (2012-2018): The Cloud Era and the CASB Disruption",
  },
  {
    type: "p",
    text: "By 2012, the assumption that all the data lived inside the network had collapsed. Office 365, Salesforce, Dropbox, Box, ServiceNow and Workday were carrying enterprise data into SaaS applications that no traditional DLP product could see. Network DLP appliances were watching corporate egress, but employees were uploading files directly to SaaS over their home WiFi from a coffee shop, never crossing the corporate perimeter at all. The DLP industry had a visibility problem it had not invented.",
  },
  {
    type: "p",
    text: "The answer came from a brand-new category. In 2012, four startups launched in quick succession, all selling what was effectively cloud-DLP delivered as a service: Skyhigh Networks (founded by Rajiv Gupta, ex-McAfee), Netskope (founded by Sanjay Beri, ex-Juniper), Adallom (founded in Tel Aviv) and CipherCloud. Gartner formalised the category in 2012 and called it the Cloud Access Security Broker, or CASB. CASBs proxied or API-integrated with SaaS applications, classified data flowing into and out of them, and enforced policies that the on-premise DLP could not see.",
  },
  {
    type: "p",
    text: "The market consolidated quickly. Microsoft acquired Adallom in 2015 and rebranded it as Microsoft Cloud App Security, now Microsoft Defender for Cloud Apps. McAfee acquired Skyhigh Networks in 2017 (and later spun it back out as Skyhigh Security in 2022). Symantec acquired Blue Coat (and with it the Elastica CASB) in 2016. CASB vendors and DLP vendors began to converge: every serious DLP product needed cloud coverage, and every serious CASB product needed traditional DLP detection. By 2018 the line between the two categories was effectively gone.",
  },
  {
    type: "h2",
    id: "phase-4",
    text: "Phase 4 (2018-2024): Convergence into Microsoft Purview, SASE and the Modern Stack",
  },
  {
    type: "p",
    text: "Two strategic moves redrew the DLP map between 2018 and 2024. The first was Microsoft. Building on the M365 stack already deployed inside most enterprises, Microsoft assembled a unified data classification, labelling and protection platform under the Microsoft 365 Compliance brand and rebranded it as Microsoft Purview in 2022. Purview Information Protection (sensitivity labels), Purview Data Loss Prevention (endpoint, email and SharePoint policies), Purview Insider Risk Management and Purview Data Lifecycle Management converged into a single platform driven by a single classification engine. For organisations standardised on M365 E5, Purview became the default DLP without any additional vendor procurement.",
  },
  {
    type: "p",
    text: "The second move was SASE. As traffic shifted to the cloud and users went hybrid, the SASE vendors (Zscaler, Netskope, Palo Alto Prisma) absorbed DLP into their cloud-delivered platforms. Outbound traffic to any SaaS, web or shadow-cloud destination could now be inspected for sensitive data in a single cloud-native policy engine, regardless of where the user was located. We cover this transition in more detail under [Workspace Protection (SSE & SASE)](/cybersecurity/workspace-protection-sse-sase).",
  },
  {
    type: "p",
    text: "The result was a three-way DLP market. Microsoft Purview dominated inside the M365 estate. SASE vendors dominated the cloud egress and SaaS coverage. Specialist DLP vendors (Forcepoint, Symantec/Broadcom DLP, Trellix, Proofpoint Information Protection) continued to dominate where deep, content-aware enforcement on endpoint and unstructured network egress was the priority. Most large UAE enterprises now run a combination of all three.",
  },
  {
    type: "h2",
    id: "phase-5",
    text: "Phase 5 (2024 onwards): DSPM and Data-Aware Zero Trust",
  },
  {
    type: "p",
    text: "The newest chapter is Data Security Posture Management. DSPM is to DLP what cloud security posture management is to firewalls: it inverts the model. Instead of waiting for sensitive data to cross a control point and then deciding whether to block, DSPM continuously discovers where sensitive data lives across cloud storage, SaaS, databases and unstructured shares; classifies it; assesses who has access to it; and surfaces excess exposure as a risk score before any leak event ever happens.",
  },
  {
    type: "p",
    text: "DSPM pioneers Cyera, Securiti, BigID and Dig Security (acquired by Palo Alto Networks in 2023) emerged from 2020 onwards. Microsoft, Varonis and Forcepoint added DSPM capabilities to their existing platforms. Gartner formalised the category in 2022 and now treats DSPM as a foundational layer underneath traditional DLP enforcement. The 2026 model is: DSPM tells you where the risk is, DLP enforces what crosses the boundary, and identity-aware policies in SASE and Microsoft Purview enforce in real time at every layer.",
  },
  {
    type: "stats",
    items: [
      {
        value: "2003",
        label: "Vontu ships first content-aware DLP",
        sublabel: "Pre-Symantec acquisition",
      },
      {
        value: "2007",
        label: "Symantec acquires Vontu",
        sublabel: "USD 350M; defines the market",
      },
      {
        value: "2012",
        label: "CASB category formalised",
        sublabel: "Gartner; cloud-DLP era begins",
      },
      {
        value: "2022",
        label: "Microsoft Purview launched",
        sublabel: "Unified data protection in M365",
      },
      {
        value: "2024+",
        label: "DSPM mainstream",
        sublabel: "Discovery + posture before enforcement",
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
    text: "If you are designing or replacing data protection capability in 2026, the arc above is not academic. Three things follow directly.",
  },
  {
    type: "p",
    text: "The first is that DLP is no longer one product. A 2008-style enterprise DLP suite, a 2016 CASB, a 2022 Microsoft Purview deployment and a 2024 DSPM platform are all called \"DLP\" in some marketing material. They solve different problems. The honest assessment for a UAE business starts with: which channels are actually carrying my sensitive data, and which generation of control covers each one.",
  },
  {
    type: "p",
    text: "The second is that classification is the foundation. Every DLP technique above, from Vontu's fingerprints to Microsoft Purview sensitivity labels, depends on the organisation having decided what data is sensitive and how it should be labelled. Skip that step and the most expensive DLP platform in the world produces nothing but false positives and analyst fatigue. The largest single failure mode of DLP programmes in the UAE is not bad technology but undefined classification.",
  },
  {
    type: "p",
    text: "The third is that UAE PDPL has changed the compliance calculus. Mandatory breach notification within 72 hours under PDPL Article 9, combined with NESA, ADHICS and PCI-DSS overlapping data-handling requirements, means data exposure incidents now have a regulator-facing dimension regardless of how small they are. DLP that was \"nice to have\" in 2018 is regulator-required in 2026.",
  },
  {
    type: "h2",
    id: "where-artiflex",
    text: "Where Artiflex IT Comes In",
  },
  {
    type: "p",
    text: "Artiflex IT designs, deploys and operates data protection programmes across the UAE, Oman and Saudi Arabia, covering classification, [Microsoft Purview DLP](/cybersecurity/data-loss-prevention), specialist endpoint and network DLP (Forcepoint, Symantec, Trellix), CASB and SASE-delivered cloud DLP (Netskope, Zscaler, Palo Alto Prisma), and emerging DSPM (Cyera, Securiti, Microsoft Purview DSPM). We start with classification and risk discovery and only then deploy enforcement, because enforcement without classification produces alert noise and not protection.",
  },
  {
    type: "p",
    text: "If your DLP is generating thousands of alerts that nobody reads, your sensitivity labels exist on paper but not in policy, or your CASB is logging events that never trigger any action, we will tell you exactly where you are exposed and what an honest replacement or re-tuning looks like. No upselling, no theatre.",
  },
  {
    type: "cta",
    title: "Talk to our Consultant",
    description: "30-minute review of your current DLP, classification and cloud data exposure posture against modern Microsoft Purview, CASB and DSPM benchmarks. We will surface the three highest-impact gaps to fix first, with no commitment.",
    href: "/contact",
    label: "Book Consultation",
  },
];
