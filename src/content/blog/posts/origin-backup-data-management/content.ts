import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "On 21 May 1952 IBM shipped the IBM 726 Tape Unit, the first commercial magnetic tape drive. A single reel held two megabytes (roughly 12,500 punched cards) and cost a fortune. For the next five decades, every serious business stored a copy of its data on a magnetic tape, locked the tape in a safe, and trusted that the safe would survive a fire. The discipline was unglamorous, the practitioners were undercelebrated, and the budget was usually the first cut.",
  },
  {
    type: "p",
    text: "Then ransomware arrived. By 2017 the WannaCry outbreak had encrypted hospitals, factories and ports in 150 countries. The backup that nobody had paid attention to became the difference between an inconvenience and a corporate extinction event. Within five years the entire industry reinvented itself around immutability, air gap, instant recovery and cyber vaults. The boring tape reel had become a board-level resilience strategy.",
  },
  {
    type: "callout",
    variant: "info",
    title: "The day backup became urgent: 12 May 2017",
    text: "WannaCry ransomware encrypted 200,000 computers across 150 countries in three days, including 80 NHS hospitals in the United Kingdom. The recovery experience separated organisations sharply: those with current, isolated, immutable backups recovered in days. Those without, paid ransoms or lost data permanently. Within 12 months immutability had become a procurement requirement for every serious enterprise backup deployment.",
  },
  {
    type: "h2",
    id: "challenges",
    text: "Why this category had to exist",
  },
  {
    type: "p",
    text: "Through the 2010s, the backup industry discovered that conventional approaches were structurally inadequate for modern threats. The pain points below forced backup from an operational checkbox into a strategic discipline.",
  },
  {
    type: "ul",
    items: [
      "<strong>Backups encrypted by ransomware.</strong> Modern ransomware specifically hunts backup repositories. If the backup share is mounted, writable and reachable from the production network, ransomware finds it and encrypts it. The traditional backup architecture became its own weakness.",
      "<strong>Restore times that did not match the business.</strong> Tape restores took hours per terabyte. Disk-to-disk restores were faster but still measured in hours for a single VM. Business owners wanted minutes. The gap between RTO commitments on paper and RTO reality at incident time was often a factor of ten or worse.",
      "<strong>Volume growth outpacing the backup window.</strong> Daily data growth at 30-50 percent per year compressed the backup window faster than backup speeds could keep up. Full backups stopped fitting into the overnight maintenance slot.",
      "<strong>SaaS data quietly going unprotected.</strong> Microsoft 365, Salesforce and Google Workspace data was not backed up by the vendor in any way the customer could rely on for long-term recovery.",
      "<strong>Compliance retention without affordable storage.</strong> UAE banking, healthcare and government retention requirements of 5-10 years on transaction-level detail did not fit on disk and were too slow to recall from tape.",
      "<strong>No way to verify recoverability without disrupting production.</strong> Backup completion reports said success even when the backups would not restore.",
    ],
  },
  {
    type: "h2",
    id: "chapter-1",
    text: "Chapter 1 (1952-1990): The Tape Era",
  },
  {
    type: "p",
    text: "Magnetic tape ruled enterprise backup for nearly five decades. The IBM 726 (1952), the 727 (1953), and a long lineage of half-inch reel-to-reel drives evolved into the more compact and higher-density formats of the 1980s: the IBM 3480 cartridge (1984), DLT, LTO (2000). The discipline was simple: each night, take the entire database to tape, label the tape, ship it to an off-site vault.",
  },
  {
    type: "p",
    text: "The 3-2-1 rule emerged as the canonical guidance: three copies of data, on two different media types, with one copy off-site. Iron Mountain became the global custodian for the off-site half of millions of corporate datasets.",
  },
  {
    type: "p",
    text: "Through the 1980s and 1990s tape technology kept improving. LTO-1 (2000) stored 100 gigabytes per cartridge; LTO-9 (2021) stores 18 terabytes. Tape still has a legitimate role for the deepest archive tier today because nothing matches its cost per gigabyte at scale and its physical separation from network-connected ransomware.",
  },
  {
    type: "h2",
    id: "chapter-2",
    text: "Chapter 2 (1995-2007): Disk-Based Backup and Deduplication",
  },
  {
    type: "p",
    text: "By the mid-1990s disk had become cheap enough that an entirely new architecture emerged: disk-to-disk-to-tape (D2D2T). Daily backups went to a disk staging tier with fast recovery, then aged out to tape for long-term retention. Virtual Tape Library (VTL) systems made disk look like tape to the legacy backup software, easing the transition.",
  },
  {
    type: "p",
    text: "Then Data Domain arrived. Founded in 2001 by Kai Li and a team from Princeton, Data Domain introduced inline deduplication that recognised duplicate blocks across backups and stored each block only once. A 20-terabyte daily full backup that repeated 95 percent of the previous day's data only consumed roughly a terabyte of disk.",
  },
  {
    type: "p",
    text: "EMC acquired Data Domain in 2009 for 2.4 billion dollars. By 2012 most enterprise backup environments had moved their daily backups to disk with deduplication, retaining tape only for the deepest archive tier or for genuine off-site air gap.",
  },
  {
    type: "h2",
    id: "chapter-3",
    text: "Chapter 3 (2006-2015): Virtualisation Changes Everything",
  },
  {
    type: "p",
    text: "Backup software written for physical servers struggled with virtualised environments. Agents per VM, schedule contention on the underlying ESX host, and inability to recover at VM level all created new operational pain.",
  },
  {
    type: "p",
    text: "Veeam, founded in 2006 by Ratmir Timashev and Andrei Baronov, became the dominant answer. Veeam Backup and Replication exploited the vSphere APIs for Data Protection (vADP) to back up VMs at the hypervisor level, restore single files inside VMs, replicate VMs between sites, and verify recoverability automatically.",
  },
  {
    type: "p",
    text: "Veritas NetBackup, Commvault, EMC NetWorker and IBM Spectrum Protect adapted, but the centre of gravity in mid-market backup had shifted decisively to VM-native platforms. Cohesity (2013) and Rubrik (2014) extended the idea to a converged data-management platform.",
  },
  {
    type: "h2",
    id: "chapter-4",
    text: "Chapter 4 (2015-2020): Cloud, SaaS and the Storage Tier Below the Tier",
  },
  {
    type: "p",
    text: "AWS S3 launched in 2006 but took roughly a decade to reach enterprise backup repositories. By 2015 backup software vendors had added native object storage targets, and cloud became the new off-site tier for the 3-2-1 rule. AWS Glacier and Azure Archive Storage offered extraordinarily cheap deep-archive pricing.",
  },
  {
    type: "p",
    text: "SaaS data protection became its own sub-category. Microsoft made clear that Microsoft 365 native retention was not a backup service in the sense customers expected. Veeam Backup for Microsoft 365, Druva, AvePoint Cloud Backup and a generation of similar products emerged to back up the corporate data that lived in SaaS but was not protected to enterprise standards.",
  },
  {
    type: "p",
    text: "By 2020 the modern backup architecture had stabilised around three tiers: a fast disk-based or all-flash repository for short-term operational recovery, a deduplicated repository for medium-term retention, and an object-storage tier (cloud or on-premise) for long-term archive.",
  },
  {
    type: "h2",
    id: "chapter-5",
    text: "Chapter 5 (2017-2023): Ransomware and the Immutability Imperative",
  },
  {
    type: "p",
    text: "WannaCry, NotPetya, Ryuk, Conti, LockBit, BlackCat: the rolling wave of ransomware campaigns from 2017 onwards changed the procurement requirements for backup permanently. Attackers learned that destroying backups was as important as encrypting production.",
  },
  {
    type: "p",
    text: "Immutable storage became a procurement requirement. Veeam Hardened Repository, AWS S3 Object Lock, Cohesity DataLock, Rubrik immutable by design, and dedicated cyber recovery vaults (Dell PowerProtect Cyber Recovery, Commvault Air Gap Protect) appeared in rapid succession. The principle was that even an attacker with full administrative credentials could not delete or modify a backup within its retention window.",
  },
  {
    type: "p",
    text: "Anomaly detection, malware scanning of backups, isolated clean-room recovery environments, and continuous recovery testing became table-stakes features. Backup vendors stopped competing on backup speed and started competing on recovery confidence.",
  },
  {
    type: "h2",
    id: "chapter-6",
    text: "Chapter 6 (2023-now): Data Management as a Platform",
  },
  {
    type: "p",
    text: "The latest chapter merges backup with broader data-management responsibilities. Cohesity, Rubrik, Veeam, Commvault and Dell PowerProtect now position themselves as data-security platforms covering backup, archive, immutable storage, eDiscovery, sensitive-data discovery, recovery validation and analytics.",
  },
  {
    type: "p",
    text: "AI is reshaping the discipline again. Backup data is one of the largest, cleanest, longest-retained data sources in any enterprise, which makes it an attractive training corpus for narrow AI models. At the same time, AI models are being applied to detect ransomware behaviour inside backup streams before it reaches production.",
  },
  {
    type: "p",
    text: "For UAE customers, the convergence with sovereignty matters. CBUAE, NESA, ADHICS and ADGM compliance frameworks now expect documented immutable backup with retention measured in years, plus the ability to demonstrate recoverability under audit.",
  },
  {
    type: "stats",
    items: [
      {
        value: "1952",
        label: "IBM 726 tape ships",
        sublabel: "magnetic tape becomes the backup standard",
      },
      {
        value: "2001",
        label: "Data Domain founded",
        sublabel: "inline deduplication arrives",
      },
      {
        value: "2006",
        label: "Veeam founded",
        sublabel: "VM-native backup begins",
      },
      {
        value: "2013",
        label: "Cohesity founded",
        sublabel: "converged data management emerges",
      },
      {
        value: "2017",
        label: "WannaCry outbreak",
        sublabel: "ransomware reshapes backup procurement",
      },
      {
        value: "2020",
        label: "Immutability becomes standard",
        sublabel: "hardened repos, Object Lock, cyber vaults",
      },
    ],
  },
  {
    type: "h2",
    id: "uae-implications",
    text: "What Backup History Tells UAE Businesses Today",
  },
  {
    type: "p",
    text: "Three principles drive UAE backup decisions in 2026. First, immutability is non-negotiable. Any backup architecture without immutable repositories, air-gap copies and tested recovery is below the modern threshold and will fail audit.",
  },
  {
    type: "p",
    text: "Second, SaaS data is not protected by the SaaS vendor in the way most customers assume. Microsoft 365, Salesforce, Google Workspace and similar platforms require dedicated third-party backup.",
  },
  {
    type: "p",
    text: "Third, recovery testing is the new procurement priority. Backup completion rates of 99.9 percent mean nothing if the recovery has never been verified.",
  },
  {
    type: "h2",
    id: "where-artiflex",
    text: "Where Artiflex IT Comes In",
  },
  {
    type: "p",
    text: "Artiflex IT has been designing, deploying, and managing [infrastructure across the UAE, Oman, and Saudi Arabia](/infrastructure) for over 14 years. We work with Veeam, Cohesity, Rubrik, Commvault, Dell PowerProtect, AvePoint and Druva as the use case requires.",
  },
  {
    type: "cta",
    title: "Free Backup and Data Management Assessment",
    description: "60-minute review of your current backup architecture, immutability posture, SaaS data coverage, retention compliance and recovery validation.",
    href: "/contact",
    label: "Book Assessment",
  },
];
