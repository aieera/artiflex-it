import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "By 2010, the public cloud question had become a tribal war inside enterprise IT. On one side, the cloud-native evangelists insisted that the data centre was a relic and the future was 100 percent public. On the other side, the on-premise defenders pointed at regulators, latency, and decades of capital investment and refused to move. The largest, most regulated organisations, banks, governments, telecom operators, energy companies, looked at both camps and politely declined to join either.",
  },
  {
    type: "p",
    text: "Out of that refusal came hybrid cloud. Not a clean architectural vision, not a single vendor's product, but a pragmatic recognition that some workloads belong in public cloud and some belong in the data centre, and that the right answer for most large enterprises is a careful blend of both. It took a decade and three generations of products to make hybrid cloud a real architectural pattern rather than a marketing slogan. This is how it happened.",
  },
  {
    type: "callout",
    variant: "info",
    title: "When hybrid cloud became official: September 2011",
    text: "NIST published Special Publication 800-145 on 28 September 2011, defining hybrid cloud as one of four formal deployment models. For the first time, hybrid had a definition, a vocabulary, and a place in regulatory conversations.",
  },
  {
    type: "h2",
    id: "challenges",
    text: "Why this category had to exist",
  },
  {
    type: "p",
    text: "By 2010, public cloud had proven itself for greenfield workloads. But the largest, most regulated enterprises could not move everything, and staying entirely on-premise was no longer competitive. The pain points below forced a third architectural path.",
  },
  {
    type: "ul",
    items: [
      "<strong>Regulatory walls around public cloud.</strong> Banks, government bodies, and healthcare providers could not move sensitive data into a multi-tenant cloud without regulatory pre-approval that often did not exist for years. Compliance officers blocked the migration that engineers wanted.",
      "<strong>Latency-sensitive workloads.</strong> Factory floor systems, high-frequency trading platforms, and real-time analytics could not tolerate the round trip to a distant cloud region. Some workloads physically had to stay close to where the data was produced.",
      "<strong>Hundreds of millions in sunk data-centre cost.</strong> Enterprises had spent decades and significant capital building owned data-centre estates. Walking away from those investments was financially and politically impossible in the medium term, no matter how compelling the cloud economics were.",
      "<strong>Legacy applications that did not migrate.</strong> Mainframe workloads, packaged enterprise software with hard hardware dependencies, and decades-old custom code could not be lifted into public cloud without rewrites that exceeded the business value of moving them at all.",
      "<strong>Two operating models, two cultures.</strong> On-premise IT ran on ticket-based provisioning and quarterly capacity reviews. Public cloud ran on API-driven self-service and per-second billing. Running both simultaneously meant running two organisations in parallel, with constant cultural friction.",
      "<strong>Variable demand versus predictable steady state.</strong> Some workloads needed elastic burst capacity that only cloud could deliver economically. Some needed predictable on-premise economics for steady-state operation. Forcing every workload into one model produced bad outcomes for half of them.",
    ],
  },
  {
    type: "h2",
    id: "chapter-1",
    text: "Chapter 1 (2007-2010): The Enterprises That Refused",
  },
  {
    type: "p",
    text: "When AWS began winning startups in 2007 and 2008, the largest enterprises watched from the sidelines. Banks could not move customer data into a multi-tenant environment without regulatory pre-approval that did not yet exist. Governments had data-sovereignty mandates that public cloud could not meet. Manufacturing operations had latency-sensitive systems on the factory floor that could not tolerate a round trip to a distant region. The list of reasons grew longer every year.",
  },
  {
    type: "p",
    text: "But these same enterprises also recognised that staying entirely on-premise was no longer competitive. Their development teams envied the speed of AWS-based startups. Their CFOs envied the variable cost model. Their CIOs were tired of capacity planning meetings that always under-estimated the next year's growth. The answer was not to pick a side. It was to use both, deliberately, with the workload in the right place each time.",
  },
  {
    type: "p",
    text: "The early hybrid implementations were brittle. A VPN tunnel between an on-premise VMware estate and a single AWS account does not constitute an architecture. Connectivity worked, but networking did not. Identity did not federate. Monitoring stopped at the boundary. Capacity bursting from on-premise to cloud, the original hybrid promise, almost never worked in practice. The category needed real engineering, not just connectivity.",
  },
  {
    type: "h2",
    id: "chapter-2",
    text: "Chapter 2 (2011): NIST Defines the Vocabulary",
  },
  {
    type: "p",
    text: "On 28 September 2011, the United States National Institute of Standards and Technology published Special Publication 800-145, \"The NIST Definition of Cloud Computing.\" The document was eight pages long. It would shape regulatory conversations about cloud for the next decade.",
  },
  {
    type: "p",
    text: "NIST defined five essential characteristics (on-demand self-service, broad network access, resource pooling, rapid elasticity, measured service), three service models (IaaS, PaaS, SaaS), and four deployment models. Hybrid cloud was formally defined as a composition of two or more distinct cloud infrastructures, public or private, that remain unique entities but are bound together by standardised or proprietary technology that enables data and application portability.",
  },
  {
    type: "p",
    text: "The definition was deliberately broad, but it gave the industry something it had lacked. Compliance officers could reference hybrid cloud in regulatory submissions. Architects could describe their target state in standardised terms. Vendors could pitch hybrid products without arguing about what the word meant. The NIST definition is now embedded in every major regulatory framework, including the UAE Information Assurance Standards.",
  },
  {
    type: "h2",
    id: "chapter-3",
    text: "Chapter 3 (2012-2015): VMware Bridges the Gap",
  },
  {
    type: "p",
    text: "The first credible hybrid platform was built by VMware. By 2012, VMware was the dominant on-premise virtualisation vendor, with hypervisors running in nearly every enterprise data centre on the planet. The company saw clearly that if its customers were eventually going to put workloads in public cloud, the most strategically valuable thing VMware could do was make that move feel like an extension of vSphere rather than a forklift to AWS.",
  },
  {
    type: "p",
    text: "VMware vCloud Hybrid Service launched in 2013 (renamed vCloud Air in 2014). It was a VMware-operated public cloud, fully API-compatible with on-premise vSphere, sold and supported by VMware. The product itself eventually failed commercially, but the strategy succeeded brilliantly: VMware Cloud on AWS, launched in 2017 as a partnership with Amazon, became the dominant pattern for migrating large vSphere estates into public cloud while preserving operational continuity.",
  },
  {
    type: "p",
    text: "VMware NSX, the company's network virtualisation platform, made hybrid networking real for the first time. VLANs, security policies, and routing could be defined once and enforced consistently across on-premise and cloud. The data centre and the cloud were beginning to behave as a single network.",
  },
  {
    type: "h2",
    id: "chapter-4",
    text: "Chapter 4 (2015-2019): Hyperscaler Hybrid Arrives",
  },
  {
    type: "p",
    text: "Through the mid-2010s, AWS, Microsoft, and Google watched the hybrid market and drew different conclusions. AWS publicly downplayed hybrid for years, insisting that all-in public cloud was the destination. Microsoft saw hybrid as a competitive opportunity, leveraging its existing enterprise relationships and Windows Server estate. Google took the longest to commit.",
  },
  {
    type: "p",
    text: "In 2015, Microsoft announced Azure Stack, a packaged version of Azure that customers could run inside their own data centres. After three years of development, it shipped in 2017 in partnership with Dell, HPE, Lenovo, and Cisco. For the first time, an enterprise could run real Azure services on its own hardware with identical APIs to the public service.",
  },
  {
    type: "p",
    text: "AWS reversed course at re:Invent 2018, announcing AWS Outposts, a managed appliance running native AWS services in the customer's data centre. Outposts shipped in late 2019. Google Anthos, announced in April 2019, took a different angle, building hybrid on top of Kubernetes rather than infrastructure parity. By 2020 all three hyperscalers had first-class hybrid offerings. The question of whether hybrid was a permanent architecture or a transitional phase had been settled in favour of permanence.",
  },
  {
    type: "h2",
    id: "chapter-5",
    text: "Chapter 5 (2019-2023): Hybrid Becomes Standard",
  },
  {
    type: "p",
    text: "By the start of the 2020s, surveys consistently showed that 70 to 80 percent of enterprises were running hybrid architectures and intended to keep doing so. The reasons accumulated. Edge computing, accelerated by 5G rollouts, required compute resources physically near factories, retail stores, oil rigs, and broadcast trucks. Data-residency regulations multiplied across jurisdictions. Latency-sensitive workloads such as high-frequency trading, industrial control, and real-time analytics simply could not tolerate the network hop to a distant cloud region.",
  },
  {
    type: "p",
    text: "The pandemic accelerated everything. Remote work pushed identity and endpoint into cloud while leaving sensitive systems on-premise. Many organisations discovered that they had been operating hybrid for years without acknowledging it. The next step was to do it deliberately.",
  },
  {
    type: "p",
    text: "Tooling matured around the same period. Azure Arc extended Azure management to non-Azure resources, including AWS and Google Cloud workloads. AWS Systems Manager covered hybrid fleets. HashiCorp Terraform became the de facto language for declaring infrastructure across any cloud. Hybrid was no longer two clouds bolted together by a VPN. It had become a coherent operating model with shared policy, identity, and observability.",
  },
  {
    type: "h2",
    id: "chapter-6",
    text: "Chapter 6 (2024-now): The Sovereign and AI Hybrid",
  },
  {
    type: "p",
    text: "Two forces are shaping the current chapter of hybrid cloud. The first is sovereignty. As geopolitical fault lines harden, regulators in the UAE, the European Union, Singapore, and many other jurisdictions are requiring that certain workloads run on infrastructure subject to local legal jurisdiction. Sovereign cloud frameworks, including hyperscaler offerings operated by local partners under strict residency constraints, are becoming the default architecture for regulated workloads.",
  },
  {
    type: "p",
    text: "The second is artificial intelligence. AI training workloads gravitate to public cloud because of GPU availability. AI inferencing workloads gravitate to the edge or on-premise because of latency, cost, and data-gravity concerns. The result is a new hybrid pattern: train in public cloud, inference at the edge, with the same model, the same operational tooling, and the same governance framework spanning both.",
  },
  {
    type: "p",
    text: "Hybrid cloud, once a compromise architecture, has become the modern enterprise standard. Public cloud is where the elasticity lives. Private cloud is where the regulated and latency-sensitive workloads live. Edge is where the action happens. The art is in operating all three as a single coherent platform.",
  },
  {
    type: "stats",
    items: [
      {
        value: "2008",
        label: "AWS reaches enterprise scale",
        sublabel: "Hybrid problem emerges",
      },
      {
        value: "2011",
        label: "NIST defines hybrid cloud",
        sublabel: "Vocabulary standardised",
      },
      {
        value: "2013",
        label: "VMware vCloud Hybrid",
        sublabel: "First credible hybrid platform",
      },
      {
        value: "2017",
        label: "Azure Stack ships",
        sublabel: "Hyperscaler-on-prem begins",
      },
      {
        value: "2019",
        label: "AWS Outposts + Anthos",
        sublabel: "All hyperscalers committed",
      },
      {
        value: "2024",
        label: "Sovereign hybrid maturity",
        sublabel: "Regulated cloud becomes default",
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
    text: "Hybrid cloud is no longer an architectural compromise. It is the dominant pattern for UAE enterprises that need both regulatory compliance and modern operational speed. The lesson from the last decade is that picking sides between public and on-premise is rarely the right call.",
  },
  {
    type: "p",
    text: "Three implications follow. First, your hybrid is only as good as your control plane. If you cannot apply policy, identity, and observability consistently across both halves of the estate, you are running two clouds rather than one hybrid. Tooling investments (Azure Arc, AWS Systems Manager, HashiCorp, Kubernetes) typically pay back faster than additional capacity investments.",
  },
  {
    type: "p",
    text: "Second, sovereignty is a workload-level decision, not a binary. Different workloads have different residency, jurisdiction, and continuity requirements. A useful exercise is to classify each workload against three axes (data sensitivity, latency tolerance, regulatory exposure) and let the architecture follow the classification.",
  },
  {
    type: "p",
    text: "Third, edge is now part of hybrid. UAE manufacturing, logistics, retail, and oil and gas operations have data sources and decision points that cannot wait for a round trip to a regional cloud. Modern hybrid architectures treat the factory floor or retail store as a first-class compute location, with cloud-style operational tooling extended out to it.",
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
    title: "Free Hybrid Cloud Architecture Review",
    description: "60-minute review of your existing on-premise and cloud estate, control plane, and workload placement. We will identify gaps in policy, identity, and observability across the hybrid boundary and propose a prioritised remediation plan.",
    href: "/contact",
    label: "Book Assessment",
  },
];
