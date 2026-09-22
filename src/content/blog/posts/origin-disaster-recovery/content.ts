import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "On a winter morning in 1975, a fire broke out in the data centre of a Pennsylvania financial firm. The fire was small, the building survived, but the company's tape library and most of its primary systems did not. The firm spent the next six weeks reconstructing customer records from paper backups and individual branch ledgers. It survived, barely. Its insurance company asked the obvious follow-up question: what was your recovery plan?",
  },
  {
    type: "p",
    text: "There was no recovery plan, because at that point in the industry's history, very few companies had one. Disaster recovery as a formal discipline did not yet exist. The fire that year, and a handful of others like it, became the foundation of what would grow into a multi-billion-dollar industry of recovery sites, replication technologies, and now cloud-native failover services that can move an entire enterprise workload between continents in minutes. This is the story of how DR went from a stack of paper procedures to engineered, tested, observable resilience.",
  },
  {
    type: "callout",
    variant: "info",
    title: "The year DR became boardroom material: 2001",
    text: "The September 11 attacks destroyed or made inaccessible the data centres of dozens of financial firms in Lower Manhattan. Some recovered in hours. Some never reopened. The difference was not luck. It was the quality of the disaster recovery programme. Within twelve months, every major financial regulator worldwide had revised business-continuity expectations upward.",
  },
  {
    type: "h2",
    id: "challenges",
    text: "Why this category had to exist",
  },
  {
    type: "p",
    text: "From the 1970s onward, disaster recovery existed primarily as expensive insurance. The pain points below pushed it from a static, hardware-mirrored model toward modern cloud-native, cyber-aware recovery architectures.",
  },
  {
    type: "ul",
    items: [
      "<strong>The duplicate-everything cost model.</strong> Traditional DR required a secondary data centre containing essentially the same equipment as the primary site. Duplicate compute, storage, networking, and software licensing made DR economically painful for any organisation outside the largest enterprises.",
      "<strong>Geographic separation requirements.</strong> Regulators required hundreds of miles between primary and DR sites. Real estate, power, cooling, and dedicated connectivity at that distance multiplied the cost again, sometimes pushing DR investment past the value of the workloads it protected.",
      "<strong>Manual recovery procedures.</strong> Failover was a multi-day human-driven exercise. Runbooks were printed, procedures were memorised, and the actual recovery often diverged from the documented plan in ways that only emerged during real incidents under pressure.",
      "<strong>Recovery plans that drifted from reality.</strong> Most organisations practised recovery once a year at best. Plans aged faster than the infrastructure they described, and the first time the plan was truly exercised was usually during an actual disaster, with predictable consequences.",
      "<strong>RTOs measured in days when business needed hours.</strong> Customers, employees, and regulators expected operations to resume in hours, sometimes minutes. Traditional DR architectures could not deliver that RTO at any reasonable cost, no matter how thoroughly the plan was documented.",
      "<strong>Ransomware blurred the threat model.</strong> Classic DR assumed a physical disaster: fire, flood, hurricane. Ransomware introduced a scenario in which the production state itself was the problem, and faster replication to the secondary site only meant having a working copy of the attack.",
    ],
  },
  {
    type: "h2",
    id: "chapter-1",
    text: "Chapter 1 (1970s-1990s): Cold Sites and Bunker Thinking",
  },
  {
    type: "p",
    text: "The first formal disaster recovery providers emerged in the 1970s. Sungard Recovery Services, founded in 1978 in Pennsylvania, built a business around providing mainframe-equipped recovery facilities that customers could occupy if their primary site failed. IBM Business Recovery Services followed. Comdisco, also Pennsylvania-based, became a major competitor. The economic model was insurance: customers paid a monthly subscription for the right to use a recovery facility if needed, with priority access guaranteed by the contract.",
  },
  {
    type: "p",
    text: "The industry developed a vocabulary that persists today. A cold site was an empty data-centre shell with power and cooling but no equipment, suitable for low-priority recovery in days. A warm site had hardware in place but was not running, suitable for recovery in hours. A hot site had hardware running and data continuously replicated, suitable for recovery in minutes. The hotter the site, the higher the monthly fee.",
  },
  {
    type: "p",
    text: "These facilities were designed for the threat model of the era. Fires, floods, power failures, building collapse, and (during the Cold War) certain less polite scenarios. The classic DR design called for a recovery site at least fifty miles from the primary site, ideally on a different power grid and in a different flood plain. The data moved between sites on tape, courier, and increasingly through dedicated leased lines. Failover was a multi-day human-driven process involving people, plans, and paperwork.",
  },
  {
    type: "h2",
    id: "chapter-2",
    text: "Chapter 2 (1990s): RTO, RPO, and BIA",
  },
  {
    type: "p",
    text: "Through the 1990s, business continuity formalised. The vocabulary of Recovery Time Objective (RTO, how quickly the business needs to be back online) and Recovery Point Objective (RPO, how much data loss the business can tolerate) became standard. The Business Impact Analysis (BIA) emerged as the formal exercise of categorising every business process by its tolerance for downtime and data loss.",
  },
  {
    type: "p",
    text: "Regulators got involved. The US Securities and Exchange Commission, the Federal Financial Institutions Examination Council, and the Office of the Comptroller of the Currency began requiring documented BCP and DR programmes for regulated financial institutions. Mock disaster drills became annual events. Auditors began testing actual recovery procedures, not just verifying that documents existed.",
  },
  {
    type: "p",
    text: "The DR profession grew alongside the discipline. The Disaster Recovery Institute International (DRII) was founded in 1988, the Business Continuity Institute (BCI) in 1994. Both certified individuals against formal bodies of knowledge. DR went from an informal IT operations duty to a recognised professional specialty with career paths and salary expectations of its own.",
  },
  {
    type: "h2",
    id: "chapter-3",
    text: "Chapter 3 (2001): 9/11 and the Hardening of BCP",
  },
  {
    type: "p",
    text: "The September 11 attacks reshaped business continuity globally. The World Trade Center was home to the data-centre operations of dozens of major financial firms. Some of those firms had primary and secondary sites in the same complex; they lost both at once. Some had recovery sites in New Jersey or Connecticut and recovered within days. Some had no recovery sites at all and ceased trading entirely.",
  },
  {
    type: "p",
    text: "The regulatory response was sweeping. The SEC, the Federal Reserve, and the New York State Department of Financial Services issued new guidance requiring geographic separation of primary and recovery sites, with minimum distances of fifty or more miles for systemically important institutions. Hot-site requirements tightened. Annual recovery drills were no longer optional. Investment in DR infrastructure roughly tripled across the global financial sector over the following five years.",
  },
  {
    type: "p",
    text: "Beyond regulation, the cultural shift was permanent. Boards of directors began asking about business continuity. Insurance underwriters began pricing it. CFOs began including BCP investment as a separate line item rather than an IT overhead. The 9/11 era marked the moment that DR moved from an IT specialty into a corporate governance topic.",
  },
  {
    type: "h2",
    id: "chapter-4",
    text: "Chapter 4 (2008-2014): Virtualisation Changes Everything",
  },
  {
    type: "p",
    text: "The disaster-recovery economics that had ruled since the 1970s assumed that a recovery site was a physical mirror of the primary site: an equivalent set of physical servers, an equivalent storage estate, ready to accept workloads after a manual recovery procedure. That assumption collapsed with virtualisation.",
  },
  {
    type: "p",
    text: "VMware Site Recovery Manager (SRM), released in 2008, was the first product to industrialise virtualised DR. SRM treated a recovery site as a target pool of compute and storage capacity, with virtual machines replicated continuously from the primary site and ready to power on in a defined recovery sequence. Failover took minutes instead of days. Failback was equally automated. RTOs that had been measured in tens of hours collapsed to single digits.",
  },
  {
    type: "p",
    text: "EMC RecoverPoint, IBM Spectrum Protect, and Veeam's increasingly sophisticated replication features pushed the category forward in parallel. The recovery site stopped being a physical mirror and became a logical destination, often shared across multiple primary sites in a many-to-one design. The economic case for DR dramatically improved. Mid-market organisations that had been priced out of formal DR could now afford virtualisation-based recovery to a secondary site they often already owned.",
  },
  {
    type: "h2",
    id: "chapter-5",
    text: "Chapter 5 (2014-2020): DRaaS and Cloud-Based Recovery",
  },
  {
    type: "p",
    text: "The next leap forward came when the recovery site moved into public cloud. Zerto, founded in 2009 in Israel, pioneered hypervisor-based replication that decoupled DR from underlying storage. By 2014, Zerto Virtual Replication could replicate workloads from on-premise VMware estates into AWS or Azure, with continuous data protection and sub-minute RPOs. The customer no longer needed a secondary physical data centre. The cloud was the secondary site.",
  },
  {
    type: "p",
    text: "Microsoft Azure Site Recovery, launched in 2014, made the cloud-DR model native to a hyperscaler. Workloads replicated from on-premise Hyper-V or VMware estates into Azure, ready to fail over on demand. AWS, after a slower start, eventually added CloudEndure (acquired in 2019) as its native DR-to-cloud offering. The Disaster Recovery as a Service (DRaaS) category was born.",
  },
  {
    type: "p",
    text: "Operationally, DRaaS turned recovery from a quarterly drill into a continuous engineering practice. Non-disruptive failover tests could be run on demand, in isolated network environments, with no impact on production. Recovery runbooks became code. Recovery procedures became part of the same CI/CD discipline that engineers already applied to application deployment. By 2020, mid-market UAE customers could buy enterprise-grade DR for a fraction of what the same capability had cost five years earlier.",
  },
  {
    type: "h2",
    id: "chapter-6",
    text: "Chapter 6 (2021-now): Cyber Recovery and the Modern DR",
  },
  {
    type: "p",
    text: "Ransomware reshaped DR much as it reshaped backup. Traditional DR assumed that the threat was a physical disaster: a fire, a flood, a hurricane. Recovery meant restoring the production state to a secondary location. Ransomware introduced a new category of incident in which the production state itself was the problem. Replicating an encrypted system to the recovery site faster only meant having a working copy of the attack.",
  },
  {
    type: "p",
    text: "The response was the emergence of cyber recovery as a distinct discipline alongside operational DR. Dell PowerProtect Cyber Recovery (launched in 2018 as Dell EMC Cyber Recovery), Cohesity FortKnox, and Rubrik Cloud Vault introduced isolated, air-gapped, immutable recovery vaults specifically designed to survive a cyberattack on the primary estate. The architectural shift mattered. Cyber recovery vaults are deliberately disconnected from the production environment, accessible only via narrow, audited control planes, with integrity verification before any restore.",
  },
  {
    type: "p",
    text: "The modern DR architecture in 2026 typically combines three layers. Operational DR (DRaaS to a secondary cloud region) handles infrastructure-level incidents with minutes-level RTO. Backup with immutability handles localised data corruption and accidental deletion. Cyber recovery vaults handle ransomware and other adversarial attacks where every networked copy may be compromised. Each layer has a different threat model, a different RPO/RTO profile, and a different operational cadence, but together they define what modern resilience actually means.",
  },
  {
    type: "stats",
    items: [
      {
        value: "1978",
        label: "Sungard Recovery Services",
        sublabel: "First commercial DR provider",
      },
      {
        value: "2001",
        label: "September 11 attacks",
        sublabel: "DR becomes board-level governance",
      },
      {
        value: "2008",
        label: "VMware Site Recovery Manager",
        sublabel: "Virtualised DR industrialised",
      },
      {
        value: "2014",
        label: "Azure Site Recovery",
        sublabel: "DR-to-cloud becomes mainstream",
      },
      {
        value: "2018",
        label: "Cyber recovery vaults",
        sublabel: "Ransomware-specific DR emerges",
      },
      {
        value: "2025",
        label: "AI-orchestrated recovery",
        sublabel: "Recovery runbooks become code",
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
    text: "If you are responsible for resilience in a UAE organisation in 2026, the lessons of fifty years of DR history converge on a few practical principles. The discipline has matured to the point where the technology is rarely the limiting factor. The limiting factor is whether the organisation has built the engineering muscle to operate it.",
  },
  {
    type: "p",
    text: "Three implications follow. First, RTO and RPO are not a single number for the whole business. Different applications have different tolerance for downtime and data loss. A meaningful DR programme starts with a current Business Impact Analysis that classifies every application against both axes, and a recovery architecture that delivers different SLAs for different tiers. One-size-fits-all DR is invariably either over-engineered for unimportant systems or under-engineered for critical ones.",
  },
  {
    type: "p",
    text: "Second, cyber recovery is not the same as operational DR. The threat model is different, the architecture is different, and the recovery procedure is different. UAE banks, government bodies, healthcare providers, and energy operators should plan for both. Many organisations still have only the operational layer, which is no longer adequate against modern ransomware.",
  },
  {
    type: "p",
    text: "Third, recovery that has never been tested is not recovery. The single most reliable predictor of a successful real-world recovery is the frequency and seriousness of recovery testing. Modern DRaaS makes non-disruptive failover testing genuinely easy. Organisations that exploit this can validate their RTO and RPO claims every quarter rather than every year. Those that do not should plan to find out the hard way.",
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
    title: "Free Disaster Recovery Posture Review",
    description: "60-minute review of your current DR architecture, RTO and RPO commitments, recovery testing cadence, and cyber-recovery coverage. We will identify the highest-value gaps and propose a prioritised remediation plan aligned to UAE business-continuity expectations.",
    href: "/contact",
    label: "Book Assessment",
  },
];
