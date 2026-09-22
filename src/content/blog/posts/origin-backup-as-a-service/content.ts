import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "There is an old joke in IT operations. Nobody loves their backup system. Everybody is grateful for it about once a year. The category has been treated as a regulatory checkbox for most of its existence, a piece of insurance that justified its budget mainly through audit findings rather than visible business value.",
  },
  {
    type: "p",
    text: "Then ransomware happened. The 2017 WannaCry outbreak crippled hospitals, factories, and ports. The 2021 Colonial Pipeline attack shut down half of the United States' East Coast fuel supply. Each headline incident drove the same realisation: the only thing standing between an attacked enterprise and weeks of paralysis was the ability to restore from a copy of its data that the attackers could not also reach. Backup stopped being a boring corner of IT and became, almost overnight, the last and most important line of defence. The story of how it got there is one of the more underrated transformations of the cloud era.",
  },
  {
    type: "callout",
    variant: "info",
    title: "The ransomware wake-up call: 12 May 2017",
    text: "The WannaCry ransomware outbreak hit 200,000 computers across 150 countries in three days, including the UK National Health Service. The recovery experience separated organisations into two groups: those whose backups were inaccessible to the ransomware and recovered, and those whose backups were also encrypted and did not. Modern Backup-as-a-Service was born in the second group's pain.",
  },
  {
    type: "h2",
    id: "challenges",
    text: "Why this category had to exist",
  },
  {
    type: "p",
    text: "By the mid-2010s, traditional enterprise backup was structurally incapable of meeting modern recovery expectations. The pain points below pushed the category into the cloud and forced it to reinvent itself around immutability.",
  },
  {
    type: "ul",
    items: [
      "<strong>Hardware backup infrastructure costs.</strong> Backup software, dedicated backup servers, deduplication appliances, and tape libraries added a sizeable line to every CapEx cycle, often mirroring 50 to 100 percent of the cost of the production estate it was protecting.",
      "<strong>Slow, painful restore experience.</strong> Restoring a single file from a six-month-old tape could take half a day. Restoring an entire system meant running a recovery procedure that few teams had practised under real conditions, and the result was often a partial recovery at best.",
      "<strong>Off-site management overhead.</strong> Couriers shipped tapes to off-site vaults like Iron Mountain. Tracking, rotating, and validating those tapes consumed administrative time and introduced human error at every handoff in the chain.",
      "<strong>Failed restore tests.</strong> Backup completion reports said one thing; actual restores told a different story. Quarterly drills routinely found corrupted tapes, lost encryption keys, or chain-of-custody gaps that made the backups useless when they were finally needed.",
      "<strong>SaaS data invisible to traditional backup.</strong> As enterprises moved to Microsoft 365, Google Workspace, and Salesforce, the data inside those platforms fell outside legacy backup tools. A deleted SharePoint site was simply gone after the SaaS provider's standard retention window expired.",
      "<strong>Ransomware reaching the backup repository.</strong> Modern attacks specifically target backup systems. Network-attached backup repositories with administrative credentials became prime targets, neutralising the only recovery option at the precise moment it was needed most.",
    ],
  },
  {
    type: "h2",
    id: "chapter-1",
    text: "Chapter 1 (1970s-1995): The Tape Era",
  },
  {
    type: "p",
    text: "For its first three decades, backup meant magnetic tape. IBM had introduced tape data storage commercially in 1952, and the format dominated the backup category through the rest of the twentieth century. Operations teams ran nightly tape backups, rotated cartridges through a grandfather-father-son scheme, and shipped weekly archives to off-site vaults operated by companies like Iron Mountain.",
  },
  {
    type: "p",
    text: "Tape was reliable, dense, and cheap per gigabyte. It was also slow, sequential, and operationally tedious. Restoring a single file from a six-month-old tape could take half a day. The disconnect between modern data protection and modern data consumption was growing, but the economics of tape were unbeatable. Even today, tape persists in archive workloads where cost-per-petabyte is the dominant criterion.",
  },
  {
    type: "p",
    text: "What tape did teach the industry, beyond the technology itself, was the value of the 3-2-1 rule: keep three copies of important data, on two different media types, with one copy off-site. That rule, articulated by photographer Peter Krogh in the early 2000s for digital photography, became the foundational principle of enterprise backup design. It still holds today, with cloud increasingly playing the off-site role that tape vaults once owned.",
  },
  {
    type: "h2",
    id: "chapter-2",
    text: "Chapter 2 (1995-2005): Disk Comes In",
  },
  {
    type: "p",
    text: "By the late 1990s, disk capacity had grown enough and disk prices had fallen far enough that enterprises began running disk-to-disk backups as a primary tier, with tape relegated to longer-term archive. Network-attached backup appliances from EMC (Avamar, acquired in 2006), NetBackup (Veritas), and CommVault dominated the new era.",
  },
  {
    type: "p",
    text: "The killer feature of this period was deduplication, the recognition that most enterprise backup data was nearly identical across snapshots and across systems. Data Domain, founded in 2001 and acquired by EMC in 2009, pioneered inline disk-based deduplication that reduced effective storage requirements by 20x or more. Backups that had previously been measured in physical tape capacity could now be measured in deduplicated, instantly-restorable disk capacity.",
  },
  {
    type: "p",
    text: "Virtualisation pulled the category forward again. As enterprises adopted VMware ESX through the 2000s, the unit of backup shifted from the file or volume to the entire virtual machine. VMware's vStorage APIs for Data Protection (vADP), released around 2009, made image-level VM backup efficient. The first vendor to fully exploit this was a then-small company in Switzerland called Veeam Software.",
  },
  {
    type: "h2",
    id: "chapter-3",
    text: "Chapter 3 (2006-2010): The Consumer Cloud Backup Pioneers",
  },
  {
    type: "p",
    text: "While enterprise backup was being reinvented around disk and virtualisation, a parallel revolution was happening in consumer and small-business backup. Carbonite (founded 2005), Mozy (founded 2005, acquired by EMC in 2007), and Backblaze (founded 2007) introduced flat-rate, unlimited cloud backup for individual computers. The model was deliberately simple: install a small agent, pay around five dollars per month, and stop worrying.",
  },
  {
    type: "p",
    text: "These services proved that backup could be a pure service rather than an infrastructure category. The customer never bought storage. They never sized capacity. They never rotated media. The cloud vendor handled all of it, and the customer paid a subscription. It was Backup as a Service in its purest form, even though the term itself was not yet widely used.",
  },
  {
    type: "p",
    text: "Enterprise backup vendors initially dismissed consumer cloud backup as irrelevant to their market. That view aged poorly. The operational simplicity of the consumer model became impossible to ignore as small and mid-market businesses, frustrated by enterprise complexity, adopted services like Mozy Pro and Carbonite Business in increasing numbers. The enterprise vendors eventually had to respond with their own SaaS-delivered offerings, and the BaaS category was born.",
  },
  {
    type: "h2",
    id: "chapter-4",
    text: "Chapter 4 (2010-2016): Enterprise BaaS Arrives",
  },
  {
    type: "p",
    text: "The enterprise pivot to BaaS took shape across multiple vendors in the early 2010s. Veeam introduced Cloud Connect in 2014, allowing service providers to offer Veeam-based backup repositories as a managed service. Druva, founded in 2008, built a fully cloud-native SaaS data protection platform aimed at endpoints and SaaS data. Datto, founded in 2007 and acquired by Vista Equity Partners in 2017 before being sold to Kaseya in 2022, dominated the managed-service-provider channel with hybrid appliances that paired local recovery with cloud-based off-site copies.",
  },
  {
    type: "p",
    text: "The architectural pattern that emerged was consistent across these vendors: a local appliance or agent for fast recovery, paired with a cloud tier for off-site retention and disaster recovery. The customer no longer thought about tape, never visited a vault, and never sized storage capacity in advance. The vendor handled all of that, charged a monthly or per-VM fee, and provided the management console and reporting that compliance auditors expected.",
  },
  {
    type: "p",
    text: "By 2016, BaaS was a recognised analyst category. Gartner's first Magic Quadrant for Data Center Backup and Recovery Solutions in 2016 already featured cloud-tier capability as a primary evaluation criterion. Enterprise backup was no longer a hardware-plus-software product. It was a service.",
  },
  {
    type: "h2",
    id: "chapter-5",
    text: "Chapter 5 (2016-2020): SaaS Backup Becomes Its Own Category",
  },
  {
    type: "p",
    text: "A specific sub-category emerged in parallel: backup for SaaS applications themselves. Microsoft 365, Google Workspace, and Salesforce had become repositories of essential enterprise data, but the SaaS vendors' own data-protection guarantees were narrow. Microsoft's shared-responsibility model explicitly placed the burden of long-term data protection on the customer, not on Microsoft.",
  },
  {
    type: "p",
    text: "Backupify, founded in 2008, was an early entrant; it was acquired by Datto in 2014. Spanning, founded in 2010, was acquired by Dell EMC in 2014, then by Kaseya. AvePoint, OwnBackup, and Druva all built SaaS-specific backup capabilities. By 2020, every serious enterprise backup vendor offered SaaS application protection alongside traditional VM and endpoint backup.",
  },
  {
    type: "p",
    text: "The wake-up moment for many customers was discovering that a deleted SharePoint site, a corrupted Salesforce object, or a malicious admin's mass-delete action in Microsoft 365 could not be recovered from the SaaS vendor beyond the standard retention window. Independent SaaS backup, with longer retention and full point-in-time recovery, became table stakes for any organisation running mission-critical workloads in Microsoft 365 or Google Workspace.",
  },
  {
    type: "h2",
    id: "chapter-6",
    text: "Chapter 6 (2017-now): The Ransomware Reinvention",
  },
  {
    type: "p",
    text: "WannaCry in May 2017 was the inflection point. The attack demonstrated that ransomware could spread through enterprise networks at wire speed and encrypt every file system it could reach, including the backup repositories. Recovery experiences split sharply. Organisations whose backups were online, network-attached, and writable by the backup service account watched their backups encrypt alongside their primary data. Organisations with offline copies, air-gapped tapes, or immutable cloud storage recovered cleanly.",
  },
  {
    type: "p",
    text: "The category reinvented itself around immutability. Veeam introduced Hardened Repository in 2020. Cohesity and Rubrik built platforms designed from the ground up around immutable snapshots that could not be modified by any user (including the backup admin) before a defined retention period. Object-lock features in AWS S3, Azure Blob Storage, and Google Cloud Storage provided the cloud-native foundation for immutable backups. Cyber recovery vaults, pioneered by Dell and adopted by every major vendor, added air-gapped, integrity-verified copies as a distinct tier separate from operational backup.",
  },
  {
    type: "p",
    text: "Modern Backup as a Service in 2026 looks profoundly different from the enterprise backup of a decade ago. The defining capabilities are no longer dedup ratios and tape rotation. They are immutability, anomaly detection in backup data, automatic ransomware identification, validated clean-room restore environments, and integration with security operations alongside traditional IT operations. Backup is no longer the last line of defence by accident. It has been engineered, deliberately, to be the line that does not fail.",
  },
  {
    type: "stats",
    items: [
      {
        value: "1952",
        label: "First tape backup",
        sublabel: "IBM commercial tape storage",
      },
      {
        value: "2001",
        label: "Data Domain founded",
        sublabel: "Disk-based deduplication arrives",
      },
      {
        value: "2005",
        label: "Carbonite + Mozy",
        sublabel: "Consumer cloud backup begins",
      },
      {
        value: "2014",
        label: "Veeam Cloud Connect",
        sublabel: "Enterprise BaaS goes mainstream",
      },
      {
        value: "2017",
        label: "WannaCry outbreak",
        sublabel: "Ransomware redefines backup",
      },
      {
        value: "2020",
        label: "Immutable backup era",
        sublabel: "Hardened repositories become standard",
      },
    ],
  },
  {
    type: "h2",
    id: "uae-implications",
    text: "What This Means for UAE Businesses Today",
  },
  {
    type: "p",
    text: "If you are responsible for data protection in a UAE organisation in 2026, the lessons of this history are direct. A backup system that worked fine in 2018 is almost certainly inadequate in 2026 because the threat model has changed underneath it. Ransomware specifically targets backup repositories. The traditional 3-2-1 rule has effectively become 3-2-1-1-0: three copies, two media, one off-site, one immutable, and zero errors verified by regular restore testing.",
  },
  {
    type: "p",
    text: "Three implications follow. First, the most important capability of a modern BaaS platform is not its deduplication ratio or its console aesthetics. It is whether the backup data is genuinely immutable for a defined retention period, with no path for any user (including a compromised admin) to delete or modify it. Object-lock storage, hardened repositories, and air-gapped vaults are the right shape of answer.",
  },
  {
    type: "p",
    text: "Second, SaaS data needs deliberate backup. Microsoft 365 and Google Workspace are not self-protecting in the way many UAE customers still assume. A third-party SaaS backup layer is now table stakes for any organisation that depends on those platforms operationally.",
  },
  {
    type: "p",
    text: "Third, restore is the only KPI that matters. A backup system that successfully captures terabytes of data every night but cannot restore them to a clean recovery environment within an acceptable time is failing at its only real job. Recovery drills should be quarterly, documented, and treated as seriously as cyber tabletop exercises.",
  },
  {
    type: "h2",
    id: "where-artiflex",
    text: "Where Artiflex IT Comes In",
  },
  {
    type: "p",
    text: "Artiflex IT has been designing, deploying, and managing [cloud solutions across the UAE, Oman, and Saudi Arabia](/cloud-solutions) for over 14 years. We work with AWS, Microsoft Azure, Google Cloud, VMware, Nutanix, Veeam, Zerto, and the broader cloud ecosystem as the use case requires. We do not believe one platform wins every workload, but we do believe the right platform for a specific workload usually wins by a meaningful margin once the assessment is done honestly.",
  },
  {
    type: "p",
    text: "If you are partway through a cloud journey and not sure whether the next step is more public cloud, more private cloud, more hybrid integration, or something else entirely, we will tell you exactly what your current state looks like and what an honest plan for the next 18 months should be. No upselling, no theatre.",
  },
  {
    type: "cta",
    title: "Free Backup and Recovery Posture Review",
    description: "60-minute review of your current backup architecture, immutability posture, SaaS coverage, and restore readiness. We will identify the highest-value gaps and propose a prioritised remediation plan aligned to UAE compliance frameworks.",
    href: "/contact",
    label: "Book Assessment",
  },
];
