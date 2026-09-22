import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "On 13 September 1956 IBM held a press conference in San Jose to unveil the RAMAC 305, which contained the first commercial hard disk drive. The drive consisted of fifty 24-inch platters spinning at 1,200 rpm and stored a total of 5 megabytes. It weighed roughly one tonne, rented for 3,200 US dollars a month, and required a small team of engineers to install. It was a sensation.",
  },
  {
    type: "p",
    text: "Seventy years later, a single modern NVMe SSD the size of a postcard can hold 60 terabytes (twelve million times the RAMAC's capacity), consumes 25 watts of power, and costs less per gigabyte than the postage stamp it replaces. The story of how enterprise storage went from precious capital resource to invisible infrastructure utility is one of relentless commoditisation interrupted by every few years by a structural reinvention. It is, alongside the hypervisor and the database, the most foundational story in enterprise IT.",
  },
  {
    type: "callout",
    variant: "info",
    title: "The paper that built the storage industry: June 1988",
    text: "Patterson, Gibson and Katz at UC Berkeley published 'A Case for Redundant Arrays of Inexpensive Disks' in June 1988. The paper coined the term RAID and outlined the levels (RAID 1, 4, 5, 6) that would dominate the next 30 years. Every modern enterprise storage array is, at some level, a direct descendant of that 1988 paper.",
  },
  {
    type: "h2",
    id: "challenges",
    text: "Why this category had to exist",
  },
  {
    type: "p",
    text: "Through the 1980s and 1990s, the simple act of storing business data became a recurring crisis. The pain points below forced enterprise storage to evolve from local disks per server into a shared, redundant, intelligent layer of its own.",
  },
  {
    type: "ul",
    items: [
      "<strong>Capacity always grew faster than budget.</strong> Business data growth at 30-50 percent per year compounded over a decade. Storage capital budgets that grew at 5-10 percent did not. Storage cost per gigabyte had to keep falling just to stay on the budget line.",
      "<strong>Single-drive failure took the whole system down.</strong> Pre-RAID storage tied data integrity to individual drive reliability. A single bearing failure could destroy a month of business records. The first RAID paper (1988, Berkeley) was triggered specifically by this operational pain.",
      "<strong>Stranded capacity per server.</strong> Each application server had its own internal disks. The CRM server might be 90 percent full while the reporting server was 30 percent full, with no way to share. SAN and NAS architectures emerged specifically to solve this stranded-capacity problem.",
      "<strong>Backup windows could no longer fit the night.</strong> Daily backup of growing datasets needed more hours than the maintenance window provided. Disk-to-disk backup, snapshots, deduplication and continuous data protection all emerged to compress the backup window back into reality.",
      "<strong>Tier-1 storage costs were ruinous.</strong> Enterprise SAN arrays in the 2000s cost millions of dollars and required dedicated teams to operate. The economics broke for everything except mission-critical workloads, driving the rise of mid-tier and tiered storage architectures.",
      "<strong>Performance plateaus on rotating media.</strong> Spinning disks topped out at around 200 IOPS each, no matter how many were striped together. Modern OLTP and analytics workloads needed orders of magnitude more. The all-flash array (Pure Storage 2009) was the inevitable consequence.",
    ],
  },
  {
    type: "h2",
    id: "chapter-1",
    text: "Chapter 1 (1956-1980): The IBM Era and the Birth of Disk",
  },
  {
    type: "p",
    text: "IBM dominated storage for its first 25 years as it dominated computing. The RAMAC 305 was followed by the IBM 1301 (1961), the 2311 (1964) and the 3330 (1971). Each generation packed more capacity into less space at lower cost per megabyte. The IBM 3340 'Winchester' drive in 1973 introduced the sealed enclosure that became the template for every hard drive built since.",
  },
  {
    type: "p",
    text: "Through the 1970s, storage was overwhelmingly tied to specific mainframes. Customers bought IBM disks for IBM mainframes, DEC disks for DEC minis, and so on. Storage was a captive market because the interfaces (IBM bus and tag, DEC Massbus) were proprietary. The price-per-megabyte was set by what the mainframe vendor could charge, which was a lot.",
  },
  {
    type: "p",
    text: "The Plug-Compatible Manufacturer movement, started by companies like Memorex and Storage Technology Corporation (STK, later acquired by Sun), broke this captive market in the late 1970s by offering disk drives that emulated IBM interfaces but cost less. Independent storage as a business category dates from this period.",
  },
  {
    type: "h2",
    id: "chapter-2",
    text: "Chapter 2 (1980-1995): SCSI, RAID and the Independent Storage Industry",
  },
  {
    type: "p",
    text: "The Small Computer System Interface (SCSI, ratified 1986) was the technological equivalent of TCP/IP for storage. A common interface meant that any drive could connect to any host, decoupling drive vendor from server vendor. The market for independent storage exploded.",
  },
  {
    type: "p",
    text: "The 1988 Berkeley RAID paper turned this into a business architecture. Companies could now combine multiple commodity drives into reliable enterprise storage. EMC, founded in 1979 as a Boston-area memory company, pivoted aggressively into RAID storage in 1989 and launched the Symmetrix in 1990. Symmetrix used commodity SCSI drives organised into a high-reliability cache-enhanced array sold as enterprise storage. By 1995 EMC had become the largest enterprise storage company in the world.",
  },
  {
    type: "p",
    text: "Network Appliance (NetApp), founded in 1992, took a different path. NetApp built file-serving 'filer' appliances that combined storage and NFS in one box, targeting the workstation and engineering market. ONTAP, NetApp's operating system, would go on to become one of the longest-lived enterprise storage platforms in the industry.",
  },
  {
    type: "h2",
    id: "chapter-3",
    text: "Chapter 3 (1995-2008): Fibre Channel and the SAN Era",
  },
  {
    type: "p",
    text: "Fibre Channel, standardised in 1994, gave storage its own dedicated network. Instead of every server having its own internal drives, an enterprise could build a Storage Area Network (SAN) where many servers shared a pool of array-managed storage over a high-speed Fibre Channel fabric. EMC, NetApp, IBM, HP and Hitachi competed fiercely for what became the most lucrative segment of enterprise infrastructure.",
  },
  {
    type: "p",
    text: "The SAN era had three consequences. First, storage capacity utilisation jumped from typical-server-internal-disk levels (20-30 percent) to shared-pool levels (60-80 percent). Second, storage became operationally specialised: SAN admins emerged as a profession distinct from server admins. Third, the cost-per-gigabyte for tier-1 enterprise storage stayed stubbornly high even as commodity drive prices fell, because the array intelligence (caching, snapshots, replication, deduplication) added genuine value but commanded premium pricing.",
  },
  {
    type: "p",
    text: "Network-Attached Storage (NAS) grew alongside SAN as a complementary architecture. NetApp dominated mid-market NAS; EMC Celerra and IBM N-Series followed. The SAN-vs-NAS debate became one of the longest-running architecture arguments in enterprise IT, eventually answered by 'both, depending on workload' and then largely resolved by unified arrays that did both.",
  },
  {
    type: "h2",
    id: "chapter-4",
    text: "Chapter 4 (2008-2015): The All-Flash Disruption",
  },
  {
    type: "p",
    text: "Solid-state drives existed in niche applications for decades, but the economics broke through for enterprise storage around 2008. NAND flash density doubled roughly every 18 months while spinning-disk performance plateaued. The all-flash array (AFA) emerged as a new product category with very different economics: small in capacity per drive, but two orders of magnitude faster than rotating media.",
  },
  {
    type: "p",
    text: "Pure Storage, founded in 2009, was the most successful pure-play all-flash entrant. Pure FlashArray launched in 2011 with a deliberately disruptive proposition: all-flash performance at near-disk pricing, achieved through aggressive deduplication and compression. Within five years Pure had taken meaningful share from EMC, NetApp and HP in the tier-1 storage market.",
  },
  {
    type: "p",
    text: "The incumbents responded. EMC released XtremIO and VMAX All-Flash; NetApp launched AFF (All Flash FAS); HPE acquired Nimble Storage and 3PAR. By 2018 the entire tier-1 enterprise storage market had migrated to all-flash. The cost-per-gigabyte of all-flash storage fell so quickly that in many workloads it became cheaper than disk-based arrays once data-reduction ratios were included.",
  },
  {
    type: "h2",
    id: "chapter-5",
    text: "Chapter 5 (2015-2023): NVMe, Software-Defined and the Cloud Storage Era",
  },
  {
    type: "p",
    text: "Non-Volatile Memory Express (NVMe) emerged as the SSD-native storage protocol around 2015, replacing the legacy SCSI / SATA interfaces that had been designed for spinning disks. NVMe-over-Fabrics (NVMe-oF), standardised in 2016, extended the same low-latency protocol over the network. Modern arrays now use end-to-end NVMe internally and serve NVMe-oF to high-performance hosts.",
  },
  {
    type: "p",
    text: "In parallel, software-defined storage (SDS) decoupled the storage software from specific hardware. VMware vSAN, Dell EMC ScaleIO, IBM Spectrum Virtualize, Ceph, and a generation of HCI platforms made storage a software product running on commodity servers. The implication was profound: for many workloads, the storage array as a distinct purchasable object started to disappear, replaced by software running on the same servers that hosted the applications.",
  },
  {
    type: "p",
    text: "Hyperscalers built their own storage at unprecedented scale. AWS S3 (March 2006) introduced object storage as a public service and within a decade became the de facto standard for cloud-native data. Azure Blob Storage and Google Cloud Storage followed. Object storage broke the legacy SAN-and-NAS duopoly by being the right answer for the largest, fastest-growing workloads of the cloud era: AI training data, backup, video, IoT and archives.",
  },
  {
    type: "h2",
    id: "chapter-6",
    text: "Chapter 6 (2023-now): The AI Storage Demand and the Sovereign Question",
  },
  {
    type: "p",
    text: "Generative AI training and inference re-defined storage requirements again. A modern frontier-model training run can ingest petabytes of data and demand sustained read bandwidth of hundreds of gigabytes per second. Storage for AI is no longer about random IOPS; it is about sustained sequential throughput at petabyte scale, which is a completely different engineering problem.",
  },
  {
    type: "p",
    text: "VAST Data (founded 2016) and WEKA (founded 2013) built storage platforms specifically for the AI era: scale-out, all-flash, parallel-file-system, with bandwidth profiles that traditional SAN arrays cannot match. NVIDIA's certified storage partner list became the new short-list for any organisation building AI infrastructure. The historical storage market has, in two short years, bifurcated into 'AI-class storage' (a tier of its own) and 'everything else.'",
  },
  {
    type: "p",
    text: "For UAE customers, the sovereignty question became as important as the performance question. Storing AI training data on hyperscaler S3 is convenient but exposes the data to cross-border regulatory frameworks. On-premise scale-out storage from VAST, WEKA, Pure Storage, NetApp and Dell PowerScale is increasingly the right answer for sovereignty-sensitive AI workloads. The same storage industry that started in San Jose in 1956 has become, again, the strategic foundation of the next computing era.",
  },
  {
    type: "stats",
    items: [
      {
        value: "1956",
        label: "IBM RAMAC 305",
        sublabel: "first commercial hard disk drive",
      },
      {
        value: "1988",
        label: "Berkeley RAID paper",
        sublabel: "defines modern enterprise storage architecture",
      },
      {
        value: "1990",
        label: "EMC Symmetrix launches",
        sublabel: "independent enterprise storage industry begins",
      },
      {
        value: "2006",
        label: "AWS S3 launches",
        sublabel: "object storage becomes a public service",
      },
      {
        value: "2011",
        label: "Pure FlashArray ships",
        sublabel: "all-flash disruption begins",
      },
      {
        value: "2023",
        label: "AI storage emerges",
        sublabel: "VAST and WEKA define the AI-class tier",
      },
    ],
  },
  {
    type: "h2",
    id: "uae-implications",
    text: "What Storage History Tells UAE Businesses Today",
  },
  {
    type: "p",
    text: "Three implications follow for UAE storage decisions in 2026. First, all-flash is the new floor. Disk-based arrays persist only for the cheapest archival tiers; primary storage is overwhelmingly NVMe SSD. Tier-1 selection is now between Pure Storage, HPE Alletra MP, Dell PowerStore, NetApp ONTAP, IBM FlashSystem and Hitachi VSP One.",
  },
  {
    type: "p",
    text: "Second, AI workloads need separate consideration. If your medium-term roadmap includes meaningful AI training or large-scale inference, conventional tier-1 storage will not suffice. VAST Data, WEKA and NVIDIA-certified scale-out storage are now genuine procurement options for UAE customers.",
  },
  {
    type: "p",
    text: "Third, sovereignty matters more each year. Object storage on hyperscalers is convenient and cost-effective for many workloads, but UAE PDPL, sector-specific frameworks and the rise of AI training data raise the bar for residency control. On-premise object storage (HPE Scality, Dell ECS, Cloudian, MinIO) and sovereign-cloud arrangements with hyperscalers are both viable answers.",
  },
  {
    type: "h2",
    id: "where-artiflex",
    text: "Where Artiflex IT Comes In",
  },
  {
    type: "p",
    text: "Artiflex IT has been designing, deploying, and managing [infrastructure across the UAE, Oman, and Saudi Arabia](/infrastructure) for over 14 years. We work with Pure Storage, NetApp, Dell, HPE, IBM, VAST Data, WEKA and the broader storage ecosystem as the use case requires. We do not believe one platform wins every workload, but we do believe the right platform for a specific workload usually wins by a meaningful margin once the assessment is done honestly.",
  },
  {
    type: "p",
    text: "If you are partway through a storage refresh and not sure whether the next step is all-flash modernisation, scale-out for AI, or object storage for cheap retention, we will tell you exactly what your current state looks like and what an honest plan for the next 18 months should be. No upselling, no theatre.",
  },
  {
    type: "cta",
    title: "Free Storage Strategy Review",
    description: "60-minute review of your current storage estate, performance profile, data-growth curve, AI-readiness and sovereignty posture. We will identify the highest-impact upgrades and propose a prioritised plan aligned to your application roadmap.",
    href: "/contact",
    label: "Book Assessment",
  },
];
