import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "The server is the most overlooked piece of corporate infrastructure. Every other category, storage, network, security, cloud, ultimately exists to serve workloads that run on servers. And yet the server has been the most disrupted layer of the stack over the last four decades. The 27-tonne mainframe of 1964, the rack-mount x86 of 1999 and the virtualised micro-VM of 2026 are all the same thing in spirit, but they look almost nothing alike.",
  },
  {
    type: "p",
    text: "The story of how compute went from one room-sized machine per company to a million elastic instances per cloud region is the story of three industrial revolutions stacked on top of each other: the move from mainframe to x86, the rise of virtualisation, and the convergence into hyperconverged and composable platforms. Each transition was driven by very specific operational pain that the prior generation could not solve.",
  },
  {
    type: "callout",
    variant: "info",
    title: "The moment that changed everything: 23 February 2001",
    text: "VMware ESX 1.0 was released in February 2001. It was the first commercially successful hypervisor for x86 servers. Within three years it had become standard in every enterprise data centre on the planet. Within ten years it had triggered the cloud era. Within twenty it had been challenged by container orchestration and reopened by Broadcom pricing.",
  },
  {
    type: "h2",
    id: "challenges",
    text: "Why this category had to exist",
  },
  {
    type: "p",
    text: "Through the 1990s and 2000s, enterprise IT teams faced compounding problems that conventional physical servers simply could not solve at scale. The pain points below forced the industry into virtualisation, then hyperconvergence, then container orchestration.",
  },
  {
    type: "ul",
    items: [
      "<strong>Server sprawl and 5 percent utilisation.</strong> By 2005, most enterprise data centres ran physical server utilisation between 5 and 15 percent. Floor space, power, cooling and capital were burning on machines that did almost nothing for most of their operational lives.",
      "<strong>Six-to-twelve-week provisioning cycles.</strong> Standing up a new physical server required ordering, racking, cabling, imaging and configuration. The wait between business need and working server was often longer than the project deadline that triggered the need.",
      "<strong>Hardware refresh as an existential project.</strong> Every three to five years, every physical server had to be replaced. Migration weekends, application revalidation, surprise compatibility breaks, all of it consumed entire teams for months at a time.",
      "<strong>Disaster recovery proportional to the estate.</strong> Traditional DR required a duplicate physical estate at a secondary site. Twice the servers, twice the storage, twice the network, twice the licence. DR was the line item most often cut when budgets tightened, with predictable consequences.",
      "<strong>Stranded capacity at every layer.</strong> Each server had its own RAM, its own disks, its own NICs, none of it shareable. A database server with idle RAM could not lend that RAM to the application server next to it. Capacity planning became an exercise in collective over-provisioning.",
      "<strong>Hypervisor licensing economics.</strong> After Broadcom acquired VMware in 2023, subscription pricing changes reopened the hypervisor question across every UAE estate that had assumed VMware was a settled decision. The industry rediscovered Hyper-V, Nutanix AHV, Proxmox and OpenShift Virtualization within 18 months.",
    ],
  },
  {
    type: "h2",
    id: "chapter-1",
    text: "Chapter 1 (1964-1989): The Mainframe and the Mini",
  },
  {
    type: "p",
    text: "The IBM System/360 launched in April 1964 and dominated enterprise computing for two decades. A typical large bank or government department ran one or two mainframes that handled every workload: transaction processing, batch reporting, payroll, eventually email. The economics were ferocious: a mainframe could cost millions of dollars and earn its keep by running 24x7 at high utilisation under tight operational discipline.",
  },
  {
    type: "p",
    text: "Through the 1970s the mini-computer arrived, led by Digital Equipment Corporation's PDP and VAX lines. The mini was a fraction of the mainframe cost and could be operated by a single department. By the mid-1980s most US Fortune 500 firms had a layered compute estate: mainframes for the back office, minis for departmental applications, and the first IBM PCs starting to appear on individual desks.",
  },
  {
    type: "p",
    text: "The IBM AS/400, launched in 1988, became the platform of choice for mid-market enterprises that needed mainframe-class reliability without mainframe-class cost or complexity. An entire generation of UAE businesses ran their core systems on AS/400 from the late 1980s into the 2010s. Some still do; the platform remains supported as IBM Power Systems running IBM i.",
  },
  {
    type: "h2",
    id: "chapter-2",
    text: "Chapter 2 (1989-2000): The x86 Server and the Client-Server Era",
  },
  {
    type: "p",
    text: "Compaq released the ProSignia server in 1992 and Dell shipped the PowerEdge line from 1994. By the mid-1990s the x86 server was credible for production workloads, and the client-server architecture revolutionised enterprise software. Microsoft Windows NT 3.1 (1993), Microsoft SQL Server, Novell NetWare and a wave of x86-native applications redefined what corporate IT looked like.",
  },
  {
    type: "p",
    text: "Every new application got its own dedicated x86 server. By 1999 a mid-sized enterprise ran 50 to 200 of them. Server rooms became dense, hot and expensive. The 1U and 2U rack-mount form factors arrived. The blade server (HP BladeSystem, IBM BladeCenter, Dell M-series) compressed even further. But the underlying problem remained: each physical server hosted one or two applications and sat largely idle most of the time.",
  },
  {
    type: "p",
    text: "By 2000 enterprise IT was running on a fundamental paradox. The hardware was cheap and abundant. The infrastructure to host and manage it was expensive and constrained. The industry needed a way to break the one-application-per-server lock. The answer came from a small Stanford spin-out called VMware.",
  },
  {
    type: "h2",
    id: "chapter-3",
    text: "Chapter 3 (2001-2010): VMware and the Virtualisation Revolution",
  },
  {
    type: "p",
    text: "VMware was founded in 1998 by Diane Greene, Mendel Rosenblum and three Stanford colleagues. ESX 1.0 shipped in 2001 and changed enterprise infrastructure economics overnight. A single physical server that previously hosted one application could now safely host ten or twenty virtual machines, each isolated from the others. Server utilisation jumped from 5-15 percent to 60-80 percent within a single refresh cycle.",
  },
  {
    type: "p",
    text: "By 2005 VMware ESX was standard in every major enterprise. vCenter, vMotion (the ability to live-migrate a running VM from one physical host to another), VMware HA, VMware DRS and Site Recovery Manager created an operational model that physical servers simply could not match. Hyper-V (Microsoft, 2008), Xen (Citrix XenServer, 2007) and KVM (Linux native, 2007) followed, but VMware's first-mover advantage was decisive.",
  },
  {
    type: "p",
    text: "Virtualisation also reshaped server hardware. Density per rack mattered more, single-server uptime mattered less, and the unit economics of large memory configurations changed completely. By 2010 a typical VMware host carried 256 to 512 gigabytes of RAM and ran 30 to 50 VMs. The server-room population of a 100-host VMware estate replaced the server-room population of a 1,500-physical-server legacy estate.",
  },
  {
    type: "h2",
    id: "chapter-4",
    text: "Chapter 4 (2010-2018): Hyperconvergence and the End of the Three-Tier Stack",
  },
  {
    type: "p",
    text: "VMware solved the compute density problem but left the storage and networking tiers untouched. Most VMware estates ran on traditional three-tier architectures: separate compute (servers), separate storage (SAN arrays), separate networking (Fibre Channel and Ethernet switches), all integrated by specialist teams. Operating that stack required deep skill in each of three layers, and each layer scaled independently of the others, which was rarely what the workload actually needed.",
  },
  {
    type: "p",
    text: "Nutanix, founded in 2009 by Dheeraj Pandey, Mohit Aron and Ajeet Singh (all ex-Google and ex-Oracle), commercialised a different architecture. Hyperconverged infrastructure (HCI) collapsed compute and storage into a single x86 node, with software-defined storage abstracting local disks across the cluster. Adding capacity meant adding a node, not a server plus an array shelf plus a switch port.",
  },
  {
    type: "p",
    text: "VMware vSAN (2014), Dell EMC VxRail (2016), Cisco HyperFlex and HPE SimpliVity followed. By 2018 HCI was the default architecture for new mid-market deployments. The three-tier stack persists for very specific large-storage and large-database workloads, but the operational simplicity of HCI won the mid-market and most of the lower enterprise tier.",
  },
  {
    type: "h2",
    id: "chapter-5",
    text: "Chapter 5 (2018-2023): Containers, Composable and Kubernetes Eats Everything",
  },
  {
    type: "p",
    text: "While the virtualisation incumbents perfected HCI, a different revolution was happening one layer up. Docker, founded in 2013, popularised the container as a unit of application deployment. Kubernetes, open-sourced by Google in 2014, gave containers a production-grade orchestrator. Within five years Kubernetes had become the de facto standard for cloud-native applications.",
  },
  {
    type: "p",
    text: "The implications for the server cascaded downward. A container is a fraction of the weight of a VM. A Kubernetes cluster running on bare-metal x86 can host workloads that previously required ten times the physical footprint as VMs. Red Hat OpenShift, VMware Tanzu, Nutanix Karbon, Microsoft Azure Kubernetes Service all gave enterprise IT a managed Kubernetes path. Server hardware adapted: NVMe-direct, GPU partitioning, hardware-accelerated networking, and composable infrastructure (HPE Synergy, Cisco UCS X-Series) emerged to make the server bend more flexibly to the container era.",
  },
  {
    type: "p",
    text: "By 2023 the question was no longer how to virtualise, but where to virtualise. Bare-metal Kubernetes, VM-based applications, serverless functions and cloud-native workloads coexisted in the same estate. The server had become a substrate, not a destination.",
  },
  {
    type: "h2",
    id: "chapter-6",
    text: "Chapter 6 (2024-now): The Broadcom Reset and the AI Server",
  },
  {
    type: "p",
    text: "Broadcom completed its acquisition of VMware in November 2023 and restructured pricing aggressively within six months. Subscription costs for the standard VMware stack rose materially for many enterprise customers. The 20-year settled hypervisor question reopened across the entire industry. Nutanix AHV captured significant migration mindshare; Hyper-V and Azure Stack HCI grew rapidly in Microsoft-aligned shops; Proxmox went from open-source curiosity to credible enterprise option; Red Hat OpenShift Virtualization absorbed VMware refugees onto Kubernetes.",
  },
  {
    type: "p",
    text: "In parallel, the AI workload explosion redefined what an enterprise server even is. NVIDIA H100 and Blackwell GB200 GPU servers draw 8 to 14 kilowatts each. A single AI training rack draws more power than a row of conventional servers. The compute conversation in 2026 is two parallel tracks: virtualisation of conventional workloads (where the hypervisor decision matters), and AI infrastructure (where the GPU, the network fabric and the cooling matter far more than the hypervisor).",
  },
  {
    type: "p",
    text: "From one System/360 in 1964 to a Blackwell cluster in 2026, the server has gone from the most expensive object in the company to the most replaceable. What persists is the workload it carries, and the operational discipline of running it. The hardware is now plentiful and increasingly disposable; the value lives in what we run on top.",
  },
  {
    type: "stats",
    items: [
      {
        value: "1964",
        label: "IBM System/360",
        sublabel: "the mainframe era begins",
      },
      {
        value: "1988",
        label: "IBM AS/400",
        sublabel: "mid-market enterprise compute platform",
      },
      {
        value: "2001",
        label: "VMware ESX 1.0",
        sublabel: "x86 virtualisation arrives",
      },
      {
        value: "2009",
        label: "Nutanix founded",
        sublabel: "hyperconverged infrastructure begins",
      },
      {
        value: "2014",
        label: "Kubernetes open-sourced",
        sublabel: "container era starts",
      },
      {
        value: "2023",
        label: "Broadcom buys VMware",
        sublabel: "hypervisor decision reopens industry-wide",
      },
    ],
  },
  {
    type: "h2",
    id: "uae-implications",
    text: "What Server History Tells UAE Businesses Today",
  },
  {
    type: "p",
    text: "Three things matter most for UAE compute decisions in 2026. First, the post-Broadcom hypervisor question is now mainstream. Nutanix AHV is the strongest commercial alternative for HCI estates, Hyper-V plus Azure Stack HCI works for Microsoft-aligned shops, OpenShift Virtualization is credible for container-forward teams. VMware Cloud Foundation remains viable if the new subscription pricing is acceptable and team skills already exist.",
  },
  {
    type: "p",
    text: "Second, AI workloads have their own infrastructure story and should not be evaluated alongside conventional virtualisation. GPU-class servers (HPE DL380a, Dell XE9680, Lenovo SR685a, Supermicro AI platforms) require different cooling, different networking and different operational disciplines from the rest of the estate.",
  },
  {
    type: "p",
    text: "Third, consumption-based compute (HPE GreenLake, Dell APEX, Lenovo TruScale) is now genuinely competitive with outright purchase for any UAE customer who values cash-flow predictability and refresh-included economics. The model fits well with UAE compliance regimes that prefer OpEx accounting.",
  },
  {
    type: "h2",
    id: "where-artiflex",
    text: "Where Artiflex IT Comes In",
  },
  {
    type: "p",
    text: "Artiflex IT has been designing, deploying, and managing [infrastructure across the UAE, Oman, and Saudi Arabia](/infrastructure) for over 14 years. We work with VMware, Nutanix, Microsoft, Red Hat, HPE, Dell, Cisco, Lenovo and the broader compute ecosystem as the use case requires. We do not believe one platform wins every workload, but we do believe the right platform for a specific workload usually wins by a meaningful margin once the assessment is done honestly.",
  },
  {
    type: "p",
    text: "If you are partway through a compute modernisation and not sure whether the next step is hypervisor migration, HCI refresh, Kubernetes adoption, or AI infrastructure, we will tell you exactly what your current state looks like and what an honest plan for the next 18 months should be. No upselling, no theatre.",
  },
  {
    type: "cta",
    title: "Free Compute Strategy Review",
    description: "60-minute review of your existing compute estate, virtualisation posture, hypervisor licensing exposure, AI-workload roadmap and consumption-model fit. We will recommend the right platform and operating model for the next three to five years.",
    href: "/contact",
    label: "Book Assessment",
  },
];
