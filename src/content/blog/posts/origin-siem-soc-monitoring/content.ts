import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "If you walked into an enterprise Security Operations Centre in 2002, you would have seen a wall of monitors, a dozen separate consoles, three different ticketing systems, and a small team of analysts trying to read all of them at once. They were drowning. Most attacks succeeded not because the data was missing, but because the data was scattered across so many tools that nobody could see the picture in time.",
  },
  {
    type: "p",
    text: "Twenty-four years later, the same SOC runs on a single integrated platform, ingests billions of events per day, correlates them in real time across endpoint, network, identity, email and cloud, automates the routine response work, and is increasingly delivered as a 24/7 managed service rather than an in-house operation. The journey from one to the other unfolded in four distinct phases. Each one solved a problem the previous era could not, and each one exposed the next constraint that had to be fixed. This is how security operations actually evolved.",
  },
  {
    type: "callout",
    variant: "info",
    title: "Why this history matters in 2026",
    text: "The product category labels (SIEM, SOAR, NDR, MDR) are not interchangeable, and they did not appear at the same time. Knowing which generation each one belongs to, and what gap it was invented to fill, is the fastest way to evaluate whether your current SOC architecture is actually fit for the threats you face today.",
  },
  {
    type: "h2",
    id: "phase-1",
    text: "Phase 1 (Pre-2005): The Isolated Era",
  },
  {
    type: "p",
    text: "Before SIEM, security operations were not a discipline. They were a posture. Every security tool on the network produced its own logs and its own alerts, and none of them spoke to each other. The firewall vendor's console showed firewall events. The antivirus console showed AV detections. The intrusion-detection system had its own dashboard. Active Directory authentication events lived in Windows Event Viewer. Web proxy logs lived on a separate Linux box. Application logs lived inside the application.",
  },
  {
    type: "p",
    text: "An analyst investigating a single suspected incident had to log into between five and twelve separate systems, each with its own query language, retention policy, and time format. Cross-correlating events meant exporting CSVs, pasting them into a spreadsheet, and reconciling timestamps by hand. The work was slow, error-prone, and largely impossible at scale.",
  },
  {
    type: "p",
    text: "The structural problem was simple: the data existed but the context did not. A failed login on a domain controller meant nothing on its own. A failed login on a domain controller followed by a successful login from a foreign IP, then a privilege escalation, then a connection to an unknown destination on the firewall, was a textbook intrusion. But seeing that sequence required pulling four logs from four products at four different times, and almost nobody did it until after the breach was already public.",
  },
  {
    type: "p",
    text: "The volume problem made it worse. By the early 2000s, an enterprise network was producing tens of millions of log events per day. Human review of that volume was physically impossible. Most logs were never read. Most alerts were never triaged. Detection rates were terrible, and the industry knew it. Something had to change.",
  },
  {
    type: "h2",
    id: "phase-2",
    text: "Phase 2 (2005 onwards): The SIEM Era",
  },
  {
    type: "p",
    text: "The answer was Security Information and Event Management. The term itself was coined by Gartner analysts Mark Nicolett and Amrit Williams in 2005, and it described a new kind of platform that combined two earlier categories that had been evolving in parallel since the late 1990s: Security Information Management (SIM, the long-term storage and reporting of log data) and Security Event Management (SEM, the real-time analysis and alerting on events).",
  },
  {
    type: "p",
    text: "SIEM platforms did four things that no isolated tool could do. They aggregated logs from every security and IT source into a single store. They normalised the data into a common schema so a Cisco firewall event and a Windows authentication event could be compared in the same query. They correlated events across systems in real time, generating alerts when patterns crossed predefined thresholds. And they retained the data long enough to satisfy compliance requirements that were beginning to multiply (Sarbanes-Oxley in 2002, PCI-DSS in 2004, HIPAA enforcement ramping through the same period).",
  },
  {
    type: "p",
    text: "The first commercially successful SIEM was ArcSight, founded in 2000 in Cupertino and designed from the start as an enterprise correlation engine. ArcSight ESM was the platform on which most large American banks, defence contractors and government agencies built their first real SOCs. HP acquired ArcSight in 2010 for USD 1.5 billion. IBM followed by acquiring Q1 Labs in 2011, the company behind QRadar, and folded it into the IBM Security Systems division. RSA enVision, LogRhythm, and McAfee Nitro filled out the early enterprise SIEM market.",
  },
  {
    type: "p",
    text: "The disruptor came from a different direction. In 2003, Splunk launched in San Francisco with a radical thesis: do not normalise data first, just index everything as it arrives, and let analysts query it freely afterwards. Splunk was not designed as a SIEM. It was designed as a universal log search engine. But by the late 2000s, security teams had embraced it as the most flexible analytical platform on the market, and Splunk Enterprise Security (launched in 2011) became one of the dominant SIEMs of the next decade.",
  },
  {
    type: "p",
    text: "SIEM solved the visibility problem. For the first time, an analyst could ask one question across the entire estate and get one answer. Compliance evidence collection that used to take weeks could be generated in hours. Multi-stage attacks that would have been invisible to siloed tools could be detected in near real time, at least in principle.",
  },
  {
    type: "p",
    text: "But SIEM created a new problem of its own. Correlation rules generated alerts. A modest enterprise SIEM in 2012 could easily generate ten thousand alerts a day. The vast majority were false positives, repeats, or low-severity noise. Analyst teams that had been drowning in tools were now drowning in tickets. The phrase \"alert fatigue\" entered the security vocabulary, and a 2018 industry survey found that the average SOC analyst was investigating fewer than half the alerts assigned to them. The detection problem had been replaced by a triage problem.",
  },
  {
    type: "h2",
    id: "phase-3",
    text: "Phase 3 (2015 onwards): The SOAR Era",
  },
  {
    type: "p",
    text: "Security Orchestration, Automation and Response was the response to alert fatigue. The term, again coined by Gartner around 2015, described platforms that sat alongside (and increasingly inside) the SIEM and automated the routine work that human analysts had been doing manually.",
  },
  {
    type: "p",
    text: "The insight was that most SOC work was repetitive. When a phishing alert fired, an analyst would look up the sender's reputation in three threat intelligence feeds, query the SIEM to see who else had received the same email, check whether anyone had clicked the link, and isolate any compromised mailboxes. Every one of those steps was a script. None of them required human judgement. SOAR platforms gave SOCs the ability to write those scripts as visual playbooks (a process flow that called dozens of integrated tools through a single interface) and to execute them automatically the moment a triggering alert appeared.",
  },
  {
    type: "p",
    text: "The pioneers of the SOAR category were Phantom Cyber, founded in 2014 in Palo Alto, and Demisto, founded the same year in Santa Clara by ex-McAfee engineers. Phantom built a Python-based playbook framework that became wildly popular with engineering-heavy security teams. Demisto built a chat-driven interface that turned incident response into a collaborative conversation between analysts and the platform. Both companies were acquired in 2018 within months of each other: Splunk bought Phantom for USD 350 million in February, and Palo Alto Networks bought Demisto for USD 560 million in March. Those two acquisitions defined the future of the category, with Splunk SOAR and Cortex XSOAR becoming the two dominant platforms.",
  },
  {
    type: "p",
    text: "SOAR delivered measurable wins. Phishing investigations that used to take 30 minutes per ticket dropped to under a minute when fully automated. Mean time to respond on routine incidents fell by 80 to 90 percent in well-instrumented environments. Tier-1 analysts were freed to focus on actual investigation work rather than copy-paste triage.",
  },
  {
    type: "p",
    text: "But SOAR did not solve the underlying detection gap. It made existing detections cheaper to triage. The SIEM was still only seeing what the logs told it, and the logs were still mostly endpoint, identity, and perimeter events. The network itself, where modern attackers do most of their lateral movement, was still largely a blind spot. So was the cloud, which by 2018 was carrying a substantial fraction of enterprise workloads. The next gap was visibility, not throughput.",
  },
  {
    type: "h2",
    id: "phase-4",
    text: "Phase 4 (2018 onwards): NDR and MDR Close the Loop",
  },
  {
    type: "p",
    text: "Two parallel categories emerged to close the visibility gap that SIEM and SOAR alone could not. Network Detection and Response addressed the network blind spot. Managed Detection and Response addressed the staffing and operating-model gap.",
  },
  {
    type: "h3",
    id: "ndr",
    text: "NDR: Watching the Network Itself",
  },
  {
    type: "p",
    text: "Network Detection and Response platforms ingest packet captures and flow records (and increasingly, decrypted traffic) directly from network sensors, and apply machine learning to detect attacker behaviour that never touches an endpoint agent or generates a log. Lateral movement between servers, command-and-control beaconing, data staging on internal file shares, all of which are invisible to most SIEM-fed detections, are exactly what NDR was designed to see.",
  },
  {
    type: "p",
    text: "ExtraHop, founded in 2007, pioneered the wire-data analytics category and pivoted into security with Reveal(x), now one of the dominant NDR platforms in financial services and healthcare. Darktrace, founded in 2013 in Cambridge with backing from former MI5 personnel, went to market with an AI-first message and built one of the most recognisable brands in the security industry. Vectra AI, Corelight (commercial backers of the open-source Zeek network monitor), and Cisco Stealthwatch rounded out the early NDR market. Gartner formalised the category in 2020.",
  },
  {
    type: "h3",
    id: "mdr",
    text: "MDR: Detection and Response, Delivered as a Service",
  },
  {
    type: "p",
    text: "Managed Detection and Response was the operational answer to a structural problem: most organisations cannot recruit, retain, or pay for a 24/7 SOC. The skills shortage in security operations is acute everywhere, and even more so in the GCC, where local talent pools are still maturing. MDR providers solved that by building the SOC once, at scale, and selling its outputs as a service.",
  },
  {
    type: "p",
    text: "The pioneer of the modern MDR category was Secureworks, founded in 1999 in Atlanta as a managed security services provider and acquired by Dell in 2011. Secureworks built one of the longest-running commercial Counter Threat Units in the industry, tracking 150-plus named threat groups, and pioneered the Taegis next-generation SIEM/XDR platform that combined SIEM, NDR, and managed analyst response into a single delivery model. Red Canary, Arctic Wolf, eSentire, and Rapid7 followed with their own variants.",
  },
  {
    type: "p",
    text: "The defining MDR moment came in February 2025, when Sophos completed the USD 859 million acquisition of Secureworks. The acquisition combined the world's largest endpoint security platform (Sophos Intercept X with XDR) with the world's most established MDR practice (Secureworks Taegis), and made Sophos the largest pure-play MDR provider on the planet, protecting more than 28,000 organisations across 150+ countries. The endpoint-to-SIEM-to-MDR pipeline that resulted is, today, the most deeply integrated detection and response stack in the industry.",
  },
  {
    type: "p",
    text: "We deliver this combined Sophos MDR + Secureworks Taegis stack to UAE clients today, alongside Microsoft Sentinel, IBM QRadar, Splunk Enterprise Security, Palo Alto Cortex XSIAM, and Google Chronicle (now Google SecOps), depending on the client's existing investments and operating model. The full vendor breakdown lives on the [SIEM, SOAR, NDR & MDR services page](/cybersecurity/security-operations/siem).",
  },
  {
    type: "stats",
    items: [
      {
        value: "2005",
        label: "SIEM term coined",
        sublabel: "Gartner: Nicolett & Williams",
      },
      {
        value: "2014",
        label: "SOAR pioneers founded",
        sublabel: "Phantom Cyber & Demisto",
      },
      {
        value: "2020",
        label: "NDR formalised",
        sublabel: "Gartner category definition",
      },
      {
        value: "2025",
        label: "Sophos acquires Secureworks",
        sublabel: "World's largest MDR",
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
    text: "If you are running, buying, or replacing security operations capability in 2026, the four-phase arc above is not academic. It tells you four things directly.",
  },
  {
    type: "p",
    text: "The first is that no single product category is sufficient on its own. SIEM without SOAR drowns analysts in tickets. SOAR without SIEM has nothing to act on. SIEM and SOAR without NDR are blind to lateral movement. All three without 24/7 staffing are theatre after 6pm. A modern SOC architecture combines all four, by design.",
  },
  {
    type: "p",
    text: "The second is that the operating model matters as much as the technology. A best-of-breed SIEM that nobody is watching at 3am is no better than no SIEM. For most UAE businesses below the very largest enterprises, the realistic question is not \"which SIEM should we buy\" but \"who is actually going to operate it 24/7\". MDR exists because that question has an honest answer for most organisations, and it is not \"hire fifteen analysts\".",
  },
  {
    type: "p",
    text: "The third is that compliance has caught up. NESA, NCA ECC, ADHICS, UAE PDPL, ISO 27001 and PCI-DSS all now expect documented log retention, real-time correlation, defined incident response procedures, and evidence of regular detection rule tuning. A 2010-style log archive will not pass a 2026 audit. The compliance argument for proper SIEM and SOAR is now as strong as the security argument.",
  },
  {
    type: "p",
    text: "The fourth is that vendor heritage matters in this category as much as in firewalls and endpoints. ArcSight, Splunk, IBM QRadar, Microsoft Sentinel, Palo Alto Cortex, and Sophos plus Secureworks are not interchangeable. Each represents a different architectural bet on where the SOC is heading next. Picking a vendor is also picking who gets to redefine your detection and response operating model in 2030.",
  },
  {
    type: "h2",
    id: "where-artiflex",
    text: "Where Artiflex IT Comes In",
  },
  {
    type: "p",
    text: "Artiflex IT has been designing, deploying, and operating [SIEM, SOAR, NDR and MDR programmes across the UAE, Oman and Saudi Arabia](/cybersecurity/security-operations/siem) for over 14 years. We deliver Sophos MDR with Secureworks Taegis as our recommended managed-outcome platform, alongside Microsoft Sentinel, IBM QRadar, Splunk, Palo Alto Cortex XSIAM, and Google SecOps depending on what already exists in the environment and what compliance regime applies.",
  },
  {
    type: "p",
    text: "If you are running an unstaffed SIEM, an alert backlog measured in months, a SOAR platform with no playbooks, or no real network visibility at all, we will tell you exactly where you are exposed and what an honest replacement or augmentation looks like. No upselling, no theatre.",
  },
  {
    type: "cta",
    title: "Free SOC Maturity Assessment",
    description: "30-minute review of your current SIEM coverage, alert fatigue, 24/7 staffing posture, network visibility, and compliance evidence-collection effort. We will surface the three highest-impact gaps to fix first, with no commitment.",
    href: "/contact",
    label: "Book Assessment",
  },
];
