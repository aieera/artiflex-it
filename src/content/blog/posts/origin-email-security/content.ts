import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "On May 3, 1978, a Digital Equipment Corporation marketing manager named Gary Thuerk sat at a terminal at the company's Maynard, Massachusetts headquarters and sent an email. It was an invitation to a sales presentation for DEC's new DECSYSTEM-20 mainframe. He sent it to 393 people on ARPANET, the early research network that would one day become the internet.",
  },
  {
    type: "p",
    text: "Within hours, complaints flooded in. The system administrator at DARPA personally called DEC to demand that Thuerk be reprimanded. A formal scolding from the network's overseers followed. Thuerk had not broken any law. There was no law to break. He had simply been the first person to discover, by accident, that a single message could be delivered to hundreds of strangers at near-zero cost. The world had just been introduced to spam, although the term itself would not catch on for another fifteen years.",
  },
  {
    type: "p",
    text: "The reaction told you everything you needed to know about what was coming. Email had been imagined as a tool for collegial scientific exchange. The moment it became a channel for unsolicited commercial messages, the people on the receiving end recognised a problem that did not yet have a name. They could not have known that the same channel would, within four decades, account for over two-thirds of all initial-access cyberattacks worldwide. But they sensed, immediately, that this was a vulnerability waiting to be exploited.",
  },
  {
    type: "callout",
    variant: "info",
    title: "The first spam: May 3, 1978",
    text: "Gary Thuerk's DEC mainframe pitch went to 393 ARPANET users and triggered the first formal complaint in the history of network communication. The word \"spam\" itself would not be applied to email until the 1990s, borrowed from a Monty Python sketch where the word was repeated until it drowned out conversation. The metaphor stuck because that is exactly what unsolicited mail does to a useful channel: it drowns the signal in noise.",
  },
  {
    type: "h2",
    id: "chapter-1",
    text: "Chapter 1 (1978-1995): The Before Times",
  },
  {
    type: "p",
    text: "For nearly two decades after Thuerk's pitch, email remained a relatively private medium. ARPANET grew slowly, used mostly by academic and government researchers who knew each other by reputation. Spam existed but was sporadic, and the social cost of sending it was high enough to keep most people honest. Email security, as a discipline, did not exist. There was no need.",
  },
  {
    type: "p",
    text: "The shift happened in 1994. In April of that year, a husband-and-wife pair of immigration lawyers in Phoenix named Laurence Canter and Martha Siegel posted an advertisement for their services to thousands of Usenet newsgroups. Almost simultaneously, they began email-blasting prospects across the early commercial internet. The reaction was furious, immediate, and historically significant. The Canter & Siegel \"Green Card\" spam was the moment the wider world realised that the open internet had no immune system. Anyone with a mailing list could shout into every conversation, everywhere, for free.",
  },
  {
    type: "p",
    text: "By 1996, dedicated spammers had industrialised the technique. A Philadelphia operator named Sanford Wallace, working through a company called Cyber Promotions, was sending tens of millions of unsolicited messages a day. Internet service providers responded with lawsuits and the first community-maintained block lists. The Mail Abuse Prevention System (MAPS) Real-time Blackhole List launched in 1997 and became the first widely used reputation-based filter on the internet. It worked by collecting the IP addresses of confirmed spammers and publishing them so that mail servers around the world could refuse their connections at the door. It was clumsy, controversial, and revolutionary. The era of email defence had begun.",
  },
  {
    type: "h2",
    id: "chapter-2",
    text: "Chapter 2 (1996-2002): The Anti-Spam Industry Is Born",
  },
  {
    type: "p",
    text: "Block lists were a community effort. Commercial anti-spam was about to become an industry. In 1996, Sunil Paul founded Brightmail in San Francisco. His insight was deceptively simple: instead of asking every mail administrator in the world to maintain their own filter, set up decoy addresses that would only ever receive spam, then use the messages those decoys captured to write detection rules in real time. Brightmail seeded its decoys (\"probe accounts\") across the internet, harvested the spam that landed on them, and published signatures that subscribers could use to filter their own mail. By the late 1990s it was protecting most of the major US ISPs. Symantec acquired Brightmail in 2004 for over $370 million.",
  },
  {
    type: "p",
    text: "In parallel, the secure-email-gateway category was emerging. In 1999, Scott Petry, a former WordPerfect engineer, founded Postini in Redwood City, California. Postini was a pure cloud play at a time when \"cloud\" was not yet a marketing word. Customers redirected their mail through Postini's data centres, where it was scanned for spam, viruses, and policy violations before being delivered. The model was radical for its era: no on-premises appliance, no software install, just a DNS change. Postini grew quickly through the early 2000s and was acquired by Google in 2007 for $625 million, becoming the foundation of what would later evolve into Google Workspace's email security stack.",
  },
  {
    type: "p",
    text: "The technical breakthrough of this era was the Bayesian spam filter. In August 2002, programmer and essayist Paul Graham published \"A Plan for Spam,\" a now-famous essay describing how a probabilistic statistical filter trained on a user's own mail could classify incoming messages with surprising accuracy. The essay set off an explosion of work. SpamAssassin, the open-source filter project that began under Justin Mason in 2001 and joined the Apache Software Foundation in 2004, became the de-facto Bayesian engine running on Linux mail servers worldwide. For the first time, defenders had a method that learned and adapted, rather than a static blocklist that always lagged behind the attackers.",
  },
  {
    type: "h2",
    id: "chapter-3",
    text: "Chapter 3 (2003-2012): The Authentication Wars",
  },
  {
    type: "p",
    text: "By 2003, content filtering was good enough to catch most bulk spam. The next problem was identity. Anyone could send an email pretending to be anyone else. The \"From\" field was, in technical terms, a suggestion. Spammers and phishers exploited this trivially: you would receive a message that appeared to come from your bank, your boss, or PayPal, with no technical mechanism on the internet capable of telling you it was a forgery. Authentication was the missing layer.",
  },
  {
    type: "p",
    text: "The first serious answer was the Sender Policy Framework (SPF). Proposed by Meng Wong in 2003 and developed alongside Mark Lentczner and others, SPF let a domain owner publish a DNS record listing the IP addresses authorised to send mail on their behalf. A receiving server could then check whether an inbound message had come from one of those addresses. If not, the message could be flagged or rejected. SPF was simple, free, and (within limits) effective. RFC 4408 codified it in 2006.",
  },
  {
    type: "p",
    text: "Yahoo and Cisco brought the next layer in 2004. DomainKeys, later merged with Cisco's Identified Internet Mail to become DomainKeys Identified Mail (DKIM), used cryptographic signatures rather than IP whitelists. A sending server signed each outbound message with a private key. The receiving server fetched the public key from DNS and verified the signature. This caught a class of attacks that SPF could not, and it survived forwarding in ways SPF often did not. RFC 4871 standardised DKIM in 2007.",
  },
  {
    type: "p",
    text: "SPF and DKIM solved part of the problem each, but neither told a receiver what to do when authentication failed. That gap was closed in January 2012, when PayPal, Google, Microsoft, Yahoo, Comcast, and a small group of other large mail operators jointly published Domain-based Message Authentication, Reporting and Conformance (DMARC). DMARC tied SPF and DKIM together with a policy mechanism: a domain owner could declare \"if this message fails authentication, please quarantine it,\" or even \"please reject it,\" and receive forensic reports back showing which IPs had attempted to spoof the domain. DMARC was the first standard that gave domain owners real control over their own brand in the inbox.",
  },
  {
    type: "callout",
    variant: "info",
    title: "Why DMARC still matters in 2026",
    text: "Adoption has been slow. As of 2025, fewer than 40% of large enterprises globally have a DMARC policy of p=reject (the strongest setting), and adoption across UAE government and financial-services domains is materially lower than the global average. Phishers still spoof legitimate brand domains every day because most of them remain technically allowed to. Implementing DMARC enforcement is one of the highest-leverage email security actions any organisation can take, and it is almost always overdue.",
  },
  {
    type: "h2",
    id: "chapter-4",
    text: "Chapter 4 (2005-2013): The Secure Email Gateway Era",
  },
  {
    type: "p",
    text: "Authentication was a public-good infrastructure layer. The commercial battle of the mid-2000s was over the Secure Email Gateway (SEG): the appliance or cloud service that sat in the mail flow, inspected every message, and delivered or quarantined accordingly. The SEG era produced the brand names that still dominate the market today.",
  },
  {
    type: "p",
    text: "In 2002, Eric Hahn, the former CTO of Netscape, founded Proofpoint in Sunnyvale, California. Proofpoint's bet was that machine learning would beat rule-based filtering and that enterprises would pay a premium for accuracy. The bet was correct. By the mid-2010s Proofpoint was the de-facto standard among Fortune 500 companies, processing billions of emails per day across the largest enterprise install base in the segment.",
  },
  {
    type: "p",
    text: "On the other side of the Atlantic, in 2003, Peter Bauer and Neil Murray founded Mimecast in London. Their insight was different. Mimecast was not just a security product. It was an email continuity, archiving, and security platform: one cloud service that protected the inbox, kept it running during outages, and stored a multi-decade archive for compliance. For regulated industries (banking, legal, healthcare, government), this combination was structurally hard for pure-play SEG vendors to match. Mimecast went public on NASDAQ in 2015 and remains a leader in the segment today.",
  },
  {
    type: "p",
    text: "Cisco entered the category by acquiring IronPort in 2007 for $830 million. IronPort's email and web security appliances became the foundation of Cisco's mail security business and ran in many of the world's largest service providers. Symantec, having bought Brightmail in 2004, merged it with the Message Labs cloud service it acquired in 2008 to form what became Symantec Email Security.cloud. McAfee, Trend Micro, Sophos, and Microsoft all built their own gateways. By 2012, the SEG market had matured into a recognisable enterprise category, dominated by a handful of large players, with a clear playbook: scan the message, score it, sandbox the attachments, rewrite the URLs.",
  },
  {
    type: "p",
    text: "Sandboxing emerged as the breakthrough capability of the late SEG era. Rather than relying on signatures to catch malicious attachments, vendors built virtualised execution environments that opened every suspicious file in isolation, watched what it did, and quarantined it before it ever reached the user. FireEye pioneered the technique in 2008 for network traffic and brought it to email a few years later. Check Point's SandBlast (launched 2015) and Proofpoint's Targeted Attack Protection (TAP) sandbox extended the same model to attachments at scale. Sandboxing became table stakes for any serious enterprise SEG by the mid-2010s.",
  },
  {
    type: "h2",
    id: "chapter-5",
    text: "Chapter 5 (2013-2018): Phishing Wins, BEC Becomes a Category",
  },
  {
    type: "p",
    text: "Spam was a volume problem, and the SEG era largely solved it. Phishing was a different beast. A phishing email did not need to look like spam. It could be a single, well-crafted message that exploited human trust rather than technical defences. Through the mid-2010s, phishing displaced bulk spam as the dominant threat that mattered, and email security vendors had to learn to chase a moving target.",
  },
  {
    type: "p",
    text: "The economics shifted further in 2013 when the FBI's Internet Crime Complaint Center (IC3) began formally tracking what it called Business Email Compromise (BEC). The pattern was simple and devastating: an attacker would pose as a CEO, CFO, or trusted vendor and email a junior employee asking for a wire transfer, often timed for a Friday afternoon when verification was least likely. There was no malicious link, no attachment, no malware payload. There was nothing for a signature-based filter to detect. By 2018, the IC3 was reporting that BEC losses had passed ransomware losses globally. By 2024, BEC was responsible for over $50 billion in cumulative reported losses worldwide.",
  },
  {
    type: "p",
    text: "BEC broke the SEG. The traditional secure email gateway model assumed that bad messages were technically distinguishable from good ones. BEC messages were not. They came from real (often compromised) accounts, contained legitimate-looking content, and asked for actions that, if not for context, were entirely reasonable. The defence had to shift from inspecting messages to understanding behaviour: who normally talks to whom, in what tone, on what schedule, about what kinds of requests. That was a job for a different generation of products.",
  },
  {
    type: "p",
    text: "This was also when the threat landscape became personal in a way it had not been before. Phishing kits and BEC playbooks were sold openly on dark-web markets. Researchers tracked entire criminal supply chains: kit developers, infrastructure providers, money mules, cash-out specialists. The amateur prankster of the 1990s had been replaced by an organised industry whose annual revenue began to rival that of major drug trafficking operations.",
  },
  {
    type: "h2",
    id: "chapter-6",
    text: "Chapter 6 (2018-2023): API-Based Inline and the Behavioural AI Revolution",
  },
  {
    type: "p",
    text: "The next architectural shift came not from the SEG incumbents but from a small Israeli startup. In 2014, Gil Friedrich and Michael Landewe founded Avanan in New York and Tel Aviv. Their thesis was that the SEG model itself was obsolete in a cloud-mailbox world. Instead of redirecting mail through a gateway via MX record changes, Avanan connected directly to Microsoft 365 and Google Workspace via API, inspecting messages inline with the speed of an integration and the depth of a gateway. Deployment that had taken weeks took minutes. Mail flow disruption, the perennial fear of any SEG cutover, simply went away. In August 2021, Check Point acquired Avanan and rebranded it Harmony Email & Collaboration, bringing API-inline architecture into the Check Point Infinity platform.",
  },
  {
    type: "p",
    text: "In 2018, Evan Reiser and Sanjay Jeyakumar founded Abnormal Security in San Francisco with a different bet. Abnormal would not try to compete with SEGs on commodity spam and known-malware filtering. It would purpose-build a behavioural AI layer that complemented an existing SEG, focused entirely on the attacks that signatures and rules could not catch: BEC, executive impersonation, vendor email compromise, and account takeover. Abnormal's engine built a baseline of normal communication for every employee and every vendor an organisation interacted with, and flagged any message that deviated from that baseline. It needed no rules, no thresholds, no policies, and no tuning. It was, for many security teams, the first product that genuinely shrank the BEC problem rather than just monitoring it. Abnormal raised over $700 million by 2024 and was named a Leader in the 2025 Gartner Magic Quadrant for Email Security, placed furthest on the Completeness of Vision axis.",
  },
  {
    type: "p",
    text: "Microsoft, meanwhile, was quietly becoming the largest email security vendor in the world by sheer install base. Defender for Office 365 (originally Office 365 Advanced Threat Protection, launched 2015) was bundled into Microsoft 365 E5 and improved relentlessly through the late 2010s. By 2022, more enterprises were running Microsoft Defender for email than any other product, simply because they were already paying for it. The competitive question for every other vendor became: what does your product do that Defender does not?",
  },
  {
    type: "h2",
    id: "chapter-7",
    text: "Chapter 7 (2023-2026): AI-Generated Phishing and Human Risk Management",
  },
  {
    type: "p",
    text: "The arrival of large language models in late 2022 broke another assumption that defenders had quietly relied on: that bad emails were grammatically suspicious. ChatGPT and its successors made it trivial for an attacker who barely spoke English to produce flawless, contextually appropriate phishing copy at scale. Within months of GPT-4's release, security researchers were tracking phishing campaigns that used LLMs to personalise lure content based on the target's LinkedIn profile, recent press mentions, and public communication style. The defender's old crutch (\"if the grammar is poor, suspect a phish\") was gone.",
  },
  {
    type: "p",
    text: "Defenders responded with their own AI. Behavioural baselining (Abnormal, Microsoft, Proofpoint, and others) became more sophisticated, looking at sender history, communication graph anomalies, and intent classification rather than message content alone. Computer-vision models began catching brand-impersonation login pages and QR-code phishing (\"quishing\") attacks that previous URL filters had missed. Generative AI also appeared on the defensive side: Microsoft Security Copilot, Proofpoint's Nexus AI, and Abnormal's investigation agents began drafting incident summaries, suggesting next steps, and triaging abuse mailboxes autonomously.",
  },
  {
    type: "p",
    text: "Mimecast made the most public bet on the human side of the problem. In April 2025 it formally repositioned as a Human Risk Management platform, with a Human Risk Command Center that scored every individual employee on click-through rate, training completion, and exposure to attacks. The thesis was that human risk could no longer be addressed by broad-policy controls applied uniformly across the organisation: the highest-risk employees needed targeted training, restricted access, and additional layers of protection, while everyone else carried on. This was, in many ways, a return to the original insight of Cyberoam's 2010-era \"Layer 8\": the most important variable in network security is the person at the keyboard.",
  },
  {
    type: "stats",
    items: [
      {
        value: "1978",
        label: "First spam",
        sublabel: "Gary Thuerk, DEC",
      },
      {
        value: "1996",
        label: "First commercial anti-spam",
        sublabel: "Brightmail",
      },
      {
        value: "2012",
        label: "DMARC published",
        sublabel: "PayPal, Google, Microsoft",
      },
      {
        value: "2018",
        label: "Behavioural AI for BEC",
        sublabel: "Abnormal Security",
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
    text: "If you are a UAE business making email security decisions in 2026, the history above is not academic. It tells you four things directly.",
  },
  {
    type: "p",
    text: "The first is that \"email security\" is no longer one product. A 2005-era SEG, a 2018-era API-inline platform, and a 2024-era behavioural AI layer all sit under the same label. They solve different problems. The right architecture for most UAE mid-market and enterprise customers is now a layered one: a gateway or M365-native baseline for commodity spam and malware, plus a behavioural AI layer (Abnormal, or a strong behavioural module from Check Point, Proofpoint, or Mimecast) for BEC and impersonation. A single product is rarely the right answer.",
  },
  {
    type: "p",
    text: "The second is that DMARC enforcement is overdue. The UAE has one of the lower DMARC p=reject adoption rates in the GCC, and most domains we audit are still publishing p=none, which provides reporting but no enforcement. A spoofed government, bank, or supplier email is technically allowed to be delivered by any receiving mail server in the world. Closing this gap is one of the highest-leverage security investments any organisation can make, and it costs nothing in licensing.",
  },
  {
    type: "p",
    text: "The third is that BEC has displaced ransomware as the largest financial-loss category for UAE financial services, trading houses, and family offices. The defence is not better technical filtering. It is behavioural AI plus identity-based controls plus targeted user training. If your email security spend is still 90% gateway and 0% behavioural AI, your portfolio reflects the threat landscape of 2014, not 2026.",
  },
  {
    type: "p",
    text: "The fourth is that Microsoft Defender for Office 365 is genuinely strong if you are already paying for M365 E5. The competitive question is not \"is Defender good enough?\" (in many cases it is). The question is \"does the marginal value of an additional gateway or behavioural AI layer justify its cost?\" The answer depends on your industry, your BEC exposure, and whether your security team has the analyst capacity to operate a more capable platform. We help customers reach that decision honestly, not on the basis of a brochure.",
  },
  {
    type: "h2",
    id: "where-artiflex",
    text: "Where Artiflex IT Comes In",
  },
  {
    type: "p",
    text: "Artiflex IT has been deploying, managing, and migrating [email security across the UAE, Oman, and Saudi Arabia](/cybersecurity/email-security) for over 14 years. We are a Platinum Sophos Partner, and we work with Check Point Harmony Email, Proofpoint, Mimecast, Abnormal AI, Barracuda, and Microsoft Defender for Office 365 as the use case requires. We do not believe one vendor wins everything, but we do believe the right combination for your environment usually wins by a meaningful margin once the assessment is done honestly.",
  },
  {
    type: "p",
    text: "If you are still running a legacy gateway with no behavioural AI layer, a DMARC policy stuck at p=none, or a Microsoft Defender deployment that has never been tuned past defaults, we will tell you exactly what your exposure is and what an honest improvement looks like. No upselling, no theatre.",
  },
  {
    type: "cta",
    title: "Free Email Security Posture Assessment",
    description: "30-minute review of your current email defences against modern phishing, BEC, and DMARC benchmarks. We will tell you exactly where you are exposed and what a remediation programme should cost. No commitment.",
    href: "/contact",
    label: "Book Assessment",
  },
];
