import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "In 1965, a refrigeration engineer named Ralph Liebert started a company in Columbus, Ohio to solve a problem most of his customers did not yet realise they had. The new mainframe computers spreading through American businesses generated enormous heat and demanded precise environmental conditions to function. The general-purpose air-conditioning systems of the time were not designed for them. Liebert built precision cooling units that were. Within a decade, the same engineering discipline produced the first generation of computer-room uninterruptible power supplies, and an industry was born.",
  },
  {
    type: "p",
    text: "Power protection has always been the most invisible layer of IT infrastructure. When it works, no one notices. When it fails, the entire business stops. The story of how clean continuous power evolved from electromechanical curiosities to modern lithium-ion modular UPS systems traces the parallel evolution of computing itself.",
  },
  {
    type: "callout",
    variant: "info",
    title: "The moment that made UPS mandatory: 9 November 1965",
    text: "The Northeast blackout of 1965 plunged 30 million people across the US northeast and Canada into darkness for up to 13 hours. Telephone exchanges with battery backup stayed up. Computer rooms without it lost data on the spot. By Monday morning, every IT director on the eastern seaboard was asking the same question: how do we make sure this never happens to us again?",
  },
  {
    type: "h2",
    id: "challenges",
    text: "Why this category had to exist",
  },
  {
    type: "p",
    text: "By the late 1960s, the computer room had three power problems that nobody had a clean answer to. The challenges below forced the UPS category into existence as a distinct branch of electrical engineering.",
  },
  {
    type: "ul",
    items: [
      "<strong>Utility power was unreliable.</strong> Mainframes drew tens of kilowatts and were exquisitely sensitive to voltage sags, frequency drift, and outright outages. A 30-millisecond brownout crashed a mainframe and corrupted hours of work.",
      "<strong>Graceful shutdown was impossible.</strong> When the power went out, the computer simply stopped. Hard disks crashed onto their heads. Tape drives stopped mid-write. File systems were left in inconsistent states.",
      "<strong>Standby generators were too slow.</strong> Diesel generators take 10 to 30 seconds to start, synchronise and accept load. For a mainframe drawing 50 kW, that was 30 seconds longer than the system could survive without power.",
      "<strong>Voltage and frequency dirty.</strong> Even when utility power was present, it carried surges, sags, harmonics and frequency variation that progressively damaged semiconductor electronics.",
      "<strong>Battery technology was bulky and short-lived.</strong> Lead-acid batteries had been used in telephone exchanges since the 1920s, but the maintenance burden was significant: weekly checks, monthly load tests, forklift battery swaps every four to six years.",
      "<strong>No predictive insight.</strong> When a UPS battery failed, you usually found out at the moment of the next power event. There was no telemetry, no early warning.",
    ],
  },
  {
    type: "h2",
    id: "chapter-1",
    text: "Chapter 1 (1900-1965): Telephone Exchanges Quietly Invent Backup Power",
  },
  {
    type: "p",
    text: "The first systems that resembled modern UPS were built not for computers but for telephone exchanges. From the 1920s onward, AT&T and the Bell Operating Companies installed enormous banks of lead-acid batteries in every central office, floated continuously across the exchange's DC supply.",
  },
  {
    type: "p",
    text: "Computing in the same era was a different world. Universities and a few large corporations owned single mainframes, each carefully sited in a dedicated room, and when the building's power failed, the operators simply walked out and waited for it to come back.",
  },
  {
    type: "p",
    text: "Then came the Northeast blackout of November 1965. Thirteen hours of darkness across New York, Boston, Toronto and Montreal made power continuity an urgent commercial question. The race to commercialise it for computer rooms had begun.",
  },
  {
    type: "h2",
    id: "chapter-2",
    text: "Chapter 2 (1965-1985): Liebert, APC and the First Generation",
  },
  {
    type: "p",
    text: "Liebert Corporation, founded in 1965, was first to engineer purpose-built power and cooling for the computer room. Their early UPS designs were rotary, motor-generator sets the size of a small car that mechanically isolated the load from utility power.",
  },
  {
    type: "p",
    text: "In 1981, three MIT engineers founded American Power Conversion (APC) with a different bet: solid-state UPS units small and cheap enough to put behind every important workstation, not just every mainframe. APC's Smart-UPS line, launched in 1991, defined the category for a generation.",
  },
  {
    type: "p",
    text: "By the mid-1980s the static UPS architecture, in which inverters and rectifiers replaced rotating machinery, had displaced motor-generators for almost all computer-room applications. The industry consolidated around three architectures: offline, line-interactive, and online double-conversion.",
  },
  {
    type: "h2",
    id: "chapter-3",
    text: "Chapter 3 (1985-2000): Online Double-Conversion Becomes the Standard",
  },
  {
    type: "p",
    text: "Through the late 1980s and 1990s, the rise of the personal computer and the explosion of client-server computing dramatically expanded the addressable market for power protection. APC, Liebert (acquired by Emerson in 1987), Eaton (acquired Powerware in 2004), MGE (acquired by Schneider in 2007) and others competed fiercely.",
  },
  {
    type: "p",
    text: "The defining technical shift of the period was the rise of online double-conversion as the standard architecture for any serious load. Rather than switching to battery during a power event, the UPS continuously converted incoming AC to DC, charged the battery, and re-inverted DC back to AC.",
  },
  {
    type: "p",
    text: "Generator integration matured in parallel. Standby diesel generators sized for the full IT load, paired with automatic transfer switches that detected loss of utility and started the generator within 10 to 15 seconds, became the typical design.",
  },
  {
    type: "h2",
    id: "chapter-4",
    text: "Chapter 4 (2000-2015): Modular UPS and Scale-Out Power",
  },
  {
    type: "p",
    text: "As data centres grew through the 2000s, the limitation of monolithic UPS units became obvious. A single 500 kVA UPS, sized for the design load of a 10-megawatt data centre, had two problems: it cost a fortune, and if any component failed the whole unit went offline.",
  },
  {
    type: "p",
    text: "Modular design transformed the economics. Capacity could be added one module at a time as the data centre filled; redundancy was N plus 1 inside a single chassis; and a failed module could be hot-swapped in minutes by a technician without bringing the system down. APC introduced Symmetra in 1998 and Galaxy VS / VM in the 2010s; Liebert launched APM in 2010; Eaton followed with 93PM.",
  },
  {
    type: "p",
    text: "Power monitoring matured in the same period. The PDU at the rack level became a metered, switched, networked device that reported per-outlet power draw to the central monitoring platform.",
  },
  {
    type: "h2",
    id: "chapter-5",
    text: "Chapter 5 (2015-2024): Lithium-Ion and Predictive Operations",
  },
  {
    type: "p",
    text: "Lead-acid batteries had powered UPS systems for half a century, but their limitations were significant. The arrival of lithium-ion in industrial UPS applications, accelerated by the electric vehicle industry's manufacturing scale, changed the conversation.",
  },
  {
    type: "p",
    text: "By the late 2010s, every major UPS vendor had lithium-ion options. The advantages were transformative: 10 to 15 year operating life, half the footprint and weight, cell-level telemetry, tolerance for higher operating temperatures, and dramatically faster recharge.",
  },
  {
    type: "p",
    text: "Predictive analytics arrived in parallel. Modern UPS units stream telemetry to vendor-cloud platforms (Schneider EcoStruxure IT, Vertiv Service, Eaton Predict Pulse) that apply machine learning to detect emerging faults weeks before they would otherwise cause a failure.",
  },
  {
    type: "h2",
    id: "chapter-6",
    text: "Chapter 6 (2024-now): AI Density, Grid Integration and Sustainability",
  },
  {
    type: "p",
    text: "The generative-AI boom has placed extraordinary new demands on data-centre power. A traditional cabinet drew 5 to 10 kW; an AI training cabinet packed with NVIDIA H100 or H200 GPUs draws 40 kW to 100 kW or more. UPS topologies that worked at 500 kW are being re-engineered at 5 MW.",
  },
  {
    type: "p",
    text: "The relationship between data centre and electrical grid is also changing. Modern UPS systems with bidirectional inverters can return stored energy to the grid during peak demand, turning the UPS battery from a cost centre into a revenue source.",
  },
  {
    type: "p",
    text: "Sustainability has become an architectural constraint, not a marketing line. EU Energy Efficiency Directive reporting, UAE NESA / TDRA sustainability mandates and corporate net-zero commitments now drive UPS efficiency to 96 to 97 percent at any reasonable load.",
  },
  {
    type: "stats",
    items: [
      {
        value: "1920s",
        label: "Telephone exchange batteries",
        sublabel: "Bell System invents continuous DC float",
      },
      {
        value: "1965",
        label: "Liebert founded",
        sublabel: "first precision cooling and UPS for computer rooms",
      },
      {
        value: "1981",
        label: "APC founded",
        sublabel: "UPS becomes a commodity product",
      },
      {
        value: "1998",
        label: "Symmetra modular UPS",
        sublabel: "scale-out power begins",
      },
      {
        value: "2014",
        label: "Lithium-ion UPS mainstream",
        sublabel: "battery technology transformed",
      },
      {
        value: "2024",
        label: "AI-density and grid integration",
        sublabel: "UPS becomes strategic infrastructure",
      },
    ],
  },
  {
    type: "h2",
    id: "uae-implications",
    text: "What Power Protection History Tells UAE Businesses Today",
  },
  {
    type: "p",
    text: "UAE power infrastructure decisions in 2026 are shaped by three pressures that converge unusually hard in this market. First, the local grid is generally reliable but high ambient temperature and dust loading mean cooling and electrical equipment age faster than in temperate climates; battery life and capacitor degradation are accelerated.",
  },
  {
    type: "p",
    text: "Second, sustainability mandates from TDRA, NESA and emirate-level masterplans increasingly tie facility design to documented PUE, carbon intensity and renewable-energy mix.",
  },
  {
    type: "p",
    text: "Third, AI workloads are landing in UAE colos and enterprise data centres faster than the power infrastructure can be re-engineered. If your current UPS topology was specified for a 10 kW cabinet average, it is almost certainly the bottleneck on your AI roadmap.",
  },
  {
    type: "h2",
    id: "where-artiflex",
    text: "Where Artiflex IT Comes In",
  },
  {
    type: "p",
    text: "Artiflex IT has been designing, deploying, and managing [infrastructure across the UAE, Oman, and Saudi Arabia](/infrastructure) for over 14 years. We work with APC, Schneider, Vertiv (Liebert), Eaton, Riello and the broader power-protection ecosystem as the use case requires.",
  },
  {
    type: "cta",
    title: "Free Power Posture Assessment",
    description: "60-minute review of your existing UPS topology, battery state of health, generator coordination, PDU instrumentation and AI-density readiness.",
    href: "/contact",
    label: "Book Assessment",
  },
];
