import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "On 15 February 1946, in the basement of the Moore School of Electrical Engineering at the University of Pennsylvania, a machine the size of three living rooms was switched on for the first time. ENIAC, the Electronic Numerical Integrator and Computer, weighed 27 tonnes, ran on 17,468 vacuum tubes, and drew 150 kilowatts of electricity. The room got so hot that a special cooling system had to be retrofitted within months. The era of the data centre had begun, though no one called it that yet.",
  },
  {
    type: "p",
    text: "Eighty years later, the cooling system question is no closer to solved, the power draw has grown by six orders of magnitude, and the building that houses computing has become one of the most expensive structures on Earth per square metre. The story of how we got from one basement room in Philadelphia to UAE hyperscale halls in Khazna is a story of relentless escalation, every solution becoming the next generation's problem.",
  },
  {
    type: "callout",
    variant: "info",
    title: "When the modern data centre concept took shape: 1965",
    text: "IBM's System/360 announcement in 1964 forced corporate buyers to build dedicated rooms with raised floors, precision cooling and isolated power feeds. By 1965 the major US banks and government agencies were operating what would later be recognised as the first true data centres. The vocabulary, the discipline and the architecture have evolved continuously since.",
  },
  {
    type: "h2",
    id: "challenges",
    text: "Why this category had to exist",
  },
  {
    type: "p",
    text: "Through the 1980s and 1990s, IT teams discovered that running servers in offices, basements and cleaning closets simply did not work at scale. The pain points below forced the data centre to become an engineered discipline, not just a room with computers in it.",
  },
  {
    type: "ul",
    items: [
      "**Heat and cooling at scale.** A single rack of 1990s servers drew more heat than a small office's air conditioning could handle. Without dedicated thermal engineering, server rooms became unreliable thermal disasters within weeks of expansion.",
      "**Power continuity and clean supply.** Utility power has voltage sags, frequency drift and outages every utility considers normal. Servers do not tolerate them. Without UPS, generator and dual-feed design, every minor grid event became an unplanned outage.",
      "**Cabling chaos and operational ambiguity.** Floor cables under desks, mystery patches between racks, no labelling, no ownership. Production troubleshooting became archaeology. Structured cabling and proper pathways had to be invented as a discipline.",
      "**Physical security.** Servers in office rooms could be touched, unplugged, stolen or photographed by anyone with a door pass. Regulated industries discovered this the hard way through audit findings that closed business lines.",
      "**Density and floor loading.** Office floors are typically rated for 350 kg per square metre. Modern server racks loaded out hit 1,200 kg or more. Putting them on the wrong floor cracked tiles, slabs and reputations.",
      "**Operational visibility and capacity planning.** Without DCIM, capacity planning meetings ran on guesswork. New workloads waited weeks for someone to physically check whether a rack had power, space and cooling headroom.",
    ],
  },
  {
    type: "h2",
    id: "chapter-1",
    text: "Chapter 1 (1946-1964): The Mainframe and the Dedicated Room",
  },
  {
    type: "p",
    text: "ENIAC was followed by EDVAC, UNIVAC and a stream of machines that increasingly looked like commercial products. By the late 1950s, every Fortune 500 company that wanted to compute had to build a room for the computer. The room had to be air-conditioned, on a strong floor, with its own power feed, and secure (computers were now the most expensive thing the company owned).",
  },
  {
    type: "p",
    text: "IBM's System/360, announced on 7 April 1964, was the inflection point. It was the first commercially successful mainframe family with a unified architecture. Customers could grow from a small System/360 Model 30 to a large Model 75 without rewriting software. Suddenly every serious business needed somewhere to put the System/360, and every System/360 demanded the four things that became data-centre orthodoxy: cooling, power, structure and security.",
  },
  {
    type: "p",
    text: "The raised floor, the precision air-conditioning unit, the under-floor power distribution, the Halon fire-suppression system, all of these emerged in this era as practical answers to practical problems. By 1970 the basic architecture of the room had been settled. What followed for the next thirty years was refinement, not revolution.",
  },
  {
    type: "h2",
    id: "chapter-2",
    text: "Chapter 2 (1980-2000): The Server Room Explosion and the Birth of Discipline",
  },
  {
    type: "p",
    text: "The mainframe room was orderly because mainframes were big, expensive and few. The PC revolution and the client-server architecture of the 1990s undid that order. Suddenly every department needed a server, every server needed a room, and the room often ended up being the storage cupboard at the end of the hall. By the mid-1990s, the typical mid-market enterprise was running production workloads on servers stuffed under desks, in broom cupboards and on top of filing cabinets.",
  },
  {
    type: "p",
    text: "The internet boom of the late 1990s made this untenable. Web-facing servers needed uptime guarantees. E-commerce sites needed redundancy. The dot-com era invented the colocation provider and the carrier-neutral data centre: Exodus Communications, Equinix (1998) and a generation of similar businesses built purpose-engineered rooms that small companies could rent rack space inside.",
  },
  {
    type: "p",
    text: "The Uptime Institute, founded in 1993, codified the discipline. Its Tier classification system (Tier I to Tier IV) gave the industry a vocabulary for redundancy: a Tier III site has concurrent maintainability, a Tier IV site has fault tolerance. By 2000, no serious enterprise would commission a data centre without a target Tier rating and an explicit availability SLA.",
  },
  {
    type: "h2",
    id: "chapter-3",
    text: "Chapter 3 (2000-2010): Virtualisation, Density and the Cooling Crisis",
  },
  {
    type: "p",
    text: "VMware ESX shipped in 2001 and rewrote the unit economics of the data centre overnight. A physical server that previously ran one application could suddenly run ten or twenty. Server count fell, density per rack soared, and the heat output per rack rose with it. By 2005 a fully loaded rack of blade servers could draw 20 kilowatts and reject that same energy as heat into the room. Perimeter air conditioning, the standard since the 1960s, could not keep up.",
  },
  {
    type: "p",
    text: "The industry responded with in-row cooling, hot-aisle and cold-aisle containment, rear-door heat exchangers, and chilled-water loops that approached the rack directly. Google quietly admitted around 2008 that some of its data centres ran above 27 degrees Celsius at the server inlet, far above traditional industry practice. ASHRAE updated its thermal guidelines twice in the decade to accommodate higher ambient temperatures.",
  },
  {
    type: "p",
    text: "Power Usage Effectiveness (PUE), defined as total facility power divided by IT power, emerged as the universal efficiency metric. Traditional enterprise data centres ran PUE of 2.0 or worse. Modern Google and Facebook facilities reached PUE under 1.2. The gap exposed how much of legacy data-centre power was being burned on cooling rather than on actual computing.",
  },
  {
    type: "h2",
    id: "chapter-4",
    text: "Chapter 4 (2010-2020): Hyperscale, Modular and the Cloud Build-Out",
  },
  {
    type: "p",
    text: "Amazon, Microsoft and Google moved data-centre engineering from a corporate IT activity into a strategic industrial discipline. Each of the three hyperscalers built dozens of multi-hundred-megawatt facilities globally, each designed for a specific cloud region, each operating at PUE figures that legacy enterprise sites could not match.",
  },
  {
    type: "p",
    text: "Modular and prefabricated data centres emerged in parallel. Sun's Project Blackbox in 2006, Microsoft's ITPAC in 2010 and a series of containerised designs allowed capacity to be deployed in weeks rather than years. Schneider Electric's EcoBlox and Vertiv's SmartMod ranges brought the same approach to enterprise mid-market customers who needed less than a megawatt but did not want to wait 18 months for a conventional build.",
  },
  {
    type: "p",
    text: "The hyperscalers also rewrote efficiency. Direct evaporative cooling, indirect adiabatic cooling, and free-cooling-first designs cut electricity bills by tens of millions of dollars per facility per year. Power and water became the binding constraints on data-centre site selection.",
  },
  {
    type: "h2",
    id: "chapter-5",
    text: "Chapter 5 (2020-now): The AI Power Crisis",
  },
  {
    type: "p",
    text: "The release of ChatGPT in November 2022 triggered a power-demand surge that the data-centre industry is still scrambling to absorb. Training a frontier large language model can require tens of thousands of GPUs running in parallel for weeks. A single AI training cluster can draw more electricity than a traditional 100,000-server data centre.",
  },
  {
    type: "p",
    text: "The traditional density assumption (10 to 15 kilowatts per rack) collapsed within 24 months. Modern AI racks routinely draw 50 to 100 kilowatts. NVIDIA's GB200 NVL72 reference architecture targets 132 kilowatts in a single rack. Air cooling is no longer physically capable of removing that much heat from a 600 by 1,200 millimetre footprint. Direct-to-chip liquid cooling and full immersion cooling, once exotic, have become mainstream procurement requirements.",
  },
  {
    type: "p",
    text: "Power constraints have become the binding limit on where AI data centres can be built at all. The largest hyperscaler announcements of 2024 and 2025 are now power-purchase agreements as much as construction announcements: gigawatts of nuclear, renewables and storage, contracted years in advance, to feed compute halls that do not yet exist.",
  },
  {
    type: "h2",
    id: "chapter-6",
    text: "Chapter 6: The UAE Chapter",
  },
  {
    type: "p",
    text: "The UAE entered the modern data-centre era around 2010 with the first Khazna campus in Abu Dhabi. Etisalat (now e&) anchored an industry that grew alongside the smart-city ambitions of Dubai and the digital-government programme of the federal authorities. By 2024 the UAE had more than 200 megawatts of installed data-centre capacity and dozens more in build, with Khazna, Equinix, Edgnex, e& Data Centres and several international operators competing for footprint.",
  },
  {
    type: "p",
    text: "Sovereignty, residency and PDPL compliance turned the UAE data centre from a regional facility into a strategic national resource. Banking, government and ADGM-regulated entities increasingly require workloads to run inside specific UAE-based facilities with documented chain of custody. AI capacity has become the defining 2025-2030 question: the UAE has explicit national-level ambitions to host frontier AI training, and the data-centre investments now under construction reflect that.",
  },
  {
    type: "p",
    text: "What began in a Philadelphia basement in 1946 has become, in the UAE in 2026, one of the most strategically important industries on the national balance sheet. The room that started as an awkward necessity for cooling a hot computer is now the foundation under every digital service the country runs.",
  },
  {
    type: "stats",
    items: [
      {
        value: "1946",
        label: "ENIAC goes live",
        sublabel: "First computer needs cooling and dedicated power",
      },
      {
        value: "1964",
        label: "IBM System/360",
        sublabel: "Forces the dedicated computer room",
      },
      {
        value: "1993",
        label: "Uptime Institute founded",
        sublabel: "Tier I to IV classification standardised",
      },
      {
        value: "2001",
        label: "VMware ESX 1.0",
        sublabel: "Triggers density and cooling crisis",
      },
      {
        value: "2010",
        label: "Hyperscale era begins",
        sublabel: "PUE under 1.3 becomes the new benchmark",
      },
      {
        value: "2023",
        label: "AI density explosion",
        sublabel: "Liquid cooling becomes mandatory",
      },
    ],
  },
  {
    type: "h2",
    id: "uae-implications",
    text: "What Data-Centre History Tells UAE Businesses Today",
  },
  {
    type: "p",
    text: "If you are commissioning a data centre or evaluating colocation in the UAE in 2026, the history above matters in three practical ways. First, the architectural choices made in the next 24 months will shape the next decade of operations. Tier III remains the practical sweet spot for most UAE mid-market and enterprise primary sites; Tier IV is reserved for genuinely mission-critical and regulated workloads.",
  },
  {
    type: "p",
    text: "Second, AI-class density is no longer a hypothetical future. Even if your current workload mix is conventional, the racks you provision today should be specified for liquid-cooling readiness, 50-kilowatt-plus power feeds and rear-door heat exchanger compatibility. Retrofitting a five-year-old conventional facility for AI density typically costs more than building new.",
  },
  {
    type: "p",
    text: "Third, UAE power and water are not unlimited. The DEWA, FEWA and AADC grid coordination required for new data-centre capacity above 1 megawatt is now a multi-month engineering process. Sustainability, PUE and water usage effectiveness (WUE) are no longer optional reporting metrics; they shape what utility approvals get granted at all.",
  },
  {
    type: "h2",
    id: "where-artiflex",
    text: "Where Artiflex IT Comes In",
  },
  {
    type: "p",
    text: "Artiflex IT has been designing, deploying, and managing [infrastructure across the UAE, Oman, and Saudi Arabia](/infrastructure) for over 14 years. We work with Schneider, Vertiv, Eaton, APC, Cisco, HPE, Dell and the broader data-centre ecosystem as the use case requires. We do not believe one platform wins every workload, but we do believe the right platform for a specific workload usually wins by a meaningful margin once the assessment is done honestly.",
  },
  {
    type: "p",
    text: "If you are partway through a data-centre programme and not sure whether the next step is consolidation, colocation, modular build, or AI-density retrofit, we will tell you exactly what your current state looks like and what an honest plan for the next 18 months should be. No upselling, no theatre.",
  },
  {
    type: "cta",
    title: "Free Data Centre Readiness Assessment",
    description: "60-minute review of your current data-centre estate, redundancy class, PUE posture, AI-density readiness and roadmap. We will identify the highest-impact upgrades and propose a prioritised plan aligned to your growth and compliance posture.",
    href: "/contact",
    label: "Book Assessment",
  },
];
