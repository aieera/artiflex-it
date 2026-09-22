import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "On a typical office floor in 1985, an IT professional could expect to find half a dozen different cable types running through the ceiling: thick coaxial for Ethernet, thin coax for cable TV, twisted-pair for voice telephony, RG-62 for IBM terminals, fibre for the building backbone, and at least one proprietary cable for the elevator control or HVAC system. Each cable had its own connectors, its own pathway, its own contractor.",
  },
  {
    type: "p",
    text: "Six years later, the entire industry had converged on a single standard: TIA/EIA-568, published in 1991, defined how a single physical-layer architecture (Category 3 unshielded twisted pair to start, evolving rapidly upward) could carry voice, data and video on the same cables. The structured cabling discipline emerged as the most consequentially unglamorous piece of enterprise infrastructure, and the only one that routinely lasts 20-25 years.",
  },
  {
    type: "callout",
    variant: "info",
    title: "The standard that ended cable chaos: July 1991",
    text: "TIA/EIA-568, published in July 1991, defined the first commercial standard for commercial building telecommunications cabling. The 100-ohm balanced twisted pair architecture, the colour code, the topology rules, the channel test methodology: every one of them is still in use today.",
  },
  {
    type: "h2",
    id: "challenges",
    text: "Why this category had to exist",
  },
  {
    type: "p",
    text: "Through the 1980s, the cabling chaos in commercial buildings became an operational and financial crisis. The pain points below forced the industry to invent a discipline that almost nobody outside it notices and almost everyone depends on.",
  },
  {
    type: "ul",
    items: [
      "<strong>Multiple incompatible cable systems.</strong> Voice, data, terminal and video each ran on separate cables, separate contractors, separate change-management processes. A single building could have five different cable plants.",
      "<strong>Moves, adds and changes consumed budgets.</strong> Each desk relocation required re-pulling cables through the ceiling, recertifying the connection, updating documentation that almost never matched reality.",
      "<strong>Performance ceilings on legacy media.</strong> Thick coax handled 10 Mbps Ethernet but topped out there. The industry needed a media plan that scaled with computing's ten-times-every-five-years growth pattern.",
      "<strong>Documentation routinely lost.</strong> Cable plant documentation was paper-based, often incomplete, and almost never accurate after the first round of MAC.",
      "<strong>Fire-rating and life-safety compliance.</strong> Old PVC cable jackets produced toxic smoke in fire. UAE Civil Defense, US NEC Article 800 and equivalent regulations forced low-smoke zero-halogen (LSZH) jackets and plenum-rated cable.",
      "<strong>Warranty without certification.</strong> Manufacturer warranties on 25-year cable plants only applied if the installation passed independent channel testing. Pre-Fluke certification, warranty claims were impossible to substantiate.",
    ],
  },
  {
    type: "h2",
    id: "chapter-1",
    text: "Chapter 1 (1985-1991): The Pre-Standard Chaos",
  },
  {
    type: "p",
    text: "Through the early 1980s, every cable system was vendor-specific. IBM had its own cabling system (the IBM Cabling System, ICS, introduced in 1984). DEC, Wang, AT&T and other major vendors each had proprietary cabling assumptions. Mixing systems in one building required cable converters, balun transformers and patience.",
  },
  {
    type: "p",
    text: "Anixter, the major US cable distributor, published its Levels (later Categories) system in 1988 to give buyers a vocabulary for the performance of different cable products. Level 1 was voice grade, Level 2 was low-speed data, Level 3 supported 10BASE-T Ethernet up to 16 MHz.",
  },
  {
    type: "p",
    text: "The Electronic Industries Alliance (EIA) and the Telecommunications Industry Association (TIA) coordinated through the late 1980s to merge multiple efforts into a single industry standard. The result was TIA/EIA-568, ratified in July 1991.",
  },
  {
    type: "h2",
    id: "chapter-2",
    text: "Chapter 2 (1991-2002): Category 5, 5e and the Performance Race",
  },
  {
    type: "p",
    text: "Category 5 was added in TIA-568-A (1995) and supported 100 Mbps Fast Ethernet up to 100 metres. By 1998 most new enterprise installations were Category 5 and most enterprise LAN connections ran 100 Mbps.",
  },
  {
    type: "p",
    text: "Cat 5e (enhanced Category 5) emerged in 1999 to support 1000BASE-T Gigabit Ethernet, which used all four pairs of the cable simultaneously and required tighter performance tolerances. Most installations made between 2000 and 2005 used Cat 5e and remained perfectly serviceable for gigabit speeds.",
  },
  {
    type: "p",
    text: "The structured cabling business through this period became dominated by a small number of global manufacturers: AMP (Tyco / CommScope), Lucent SYSTIMAX, Panduit, Belden, R&M, Siemon, Hubbell and Krone. Each operated certified installer programmes and each offered 15 to 25-year warranties contingent on certified installation.",
  },
  {
    type: "h2",
    id: "chapter-3",
    text: "Chapter 3 (2002-2010): Cat 6, 6A and the 10 Gigabit Question",
  },
  {
    type: "p",
    text: "Category 6 was ratified in TIA-568-B.2-1 (2002) with higher-frequency performance up to 250 MHz. Cat 6 supported gigabit Ethernet with significant margin and was specified as the baseline for higher-performance horizontal cabling.",
  },
  {
    type: "p",
    text: "10 Gigabit Ethernet (10GBASE-T, ratified 2006) needed higher performance still. Cat 6A, ratified in TIA-568-B.2-10 (2008), pushed bandwidth to 500 MHz and added alien crosstalk suppression. Cat 6A became the de facto standard for any horizontal cable plant built from around 2010 onwards, and remains the practical floor for new builds in 2026.",
  },
  {
    type: "p",
    text: "The 10GBASE-T debate of the mid-2000s exposed a recurring tension in cabling: how to choose a generation that will last 25 years when each generation of Ethernet electronics requires more cable performance.",
  },
  {
    type: "h2",
    id: "chapter-4",
    text: "Chapter 4 (2008-2018): Fibre Becomes the Default Backbone",
  },
  {
    type: "p",
    text: "Single-mode fibre (OS1, OS2) and multi-mode fibre (OM1, OM2, OM3, OM4, OM5) replaced copper as the dominant backbone media. The performance jump was decisive: a single OM4 fibre pair carried 100 Gbps over 150 metres in 2016, where a Cat 6A copper pair could not carry 100 Gbps at any distance.",
  },
  {
    type: "p",
    text: "Pre-terminated trunks (MPO and MTP connectors), high-density cassettes and structured fibre management transformed data-centre cabling. Building a new data centre with field-terminated fibre patch panels became archaic; pre-terminated, factory-tested trunks deployed in days rather than weeks.",
  },
  {
    type: "p",
    text: "By 2018 most commercial buildings had a fibre vertical riser (single-mode for long reach, multi-mode for short reach) with Cat 6A copper for horizontal to the desk.",
  },
  {
    type: "h2",
    id: "chapter-5",
    text: "Chapter 5 (2018-now): Cat 8, AI Data Centres and Power-over-Ethernet",
  },
  {
    type: "p",
    text: "Category 8 was ratified in 2016 for 25 Gbps and 40 Gbps over very short distances (30 metres maximum). Cat 8 found a niche in top-of-rack to server connectivity in data centres but never displaced fibre for longer reaches.",
  },
  {
    type: "p",
    text: "Power over Ethernet expanded substantially. The original 802.3af PoE (2003) delivered 15 watts to a device; PoE+ (2009) raised this to 30 watts; PoE++ / Type 3 (2018) to 60 watts; Type 4 to 90 watts. Modern Cat 6A cabling now powers Wi-Fi 7 access points, security cameras, IP phones, digital signage and increasingly even LED lighting.",
  },
  {
    type: "p",
    text: "AI data centres have rewritten the cabling conversation again. NVIDIA GB200 and Blackwell-class GPU clusters need ultra-high-density fibre fabric (often InfiniBand NDR or 800G Ethernet) with strict polarity and length tolerance.",
  },
  {
    type: "h2",
    id: "chapter-6",
    text: "Chapter 6: The Cable That Outlasts Everything",
  },
  {
    type: "p",
    text: "Of all the elements in a commercial building, the structured cabling is the longest-lived. The active electronics (switches, servers, routers, APs) refresh every 5-7 years. The wireless access points refresh every 3-5 years. The cable in the wall is expected to last 20-25 years.",
  },
  {
    type: "p",
    text: "The discipline has also become unfashionable. Modern IT graduates rarely study cabling. Structured cabling installer training (BICSI RCDD, manufacturer-specific certifications) has aged demographically. Yet the cable plant remains the foundation under every other infrastructure decision.",
  },
  {
    type: "p",
    text: "The right choice in 2026 is straightforward and consistent across UAE installations: Cat 6A for horizontal, OS2 single-mode for backbone, with OM4 multi-mode in the data centre, all installed by a manufacturer-certified contractor with full Fluke channel test certification and a 25-year warranty.",
  },
  {
    type: "stats",
    items: [
      {
        value: "1991",
        label: "TIA-568 published",
        sublabel: "first commercial cabling standard",
      },
      {
        value: "1995",
        label: "Cat 5 ratified",
        sublabel: "100 Mbps over twisted pair",
      },
      {
        value: "2002",
        label: "Cat 6 ratified",
        sublabel: "Gigabit Ethernet with margin",
      },
      {
        value: "2008",
        label: "Cat 6A ratified",
        sublabel: "10 Gigabit over copper",
      },
      {
        value: "2016",
        label: "OM4 plus Cat 8 mature",
        sublabel: "AI / DC cabling era begins",
      },
      {
        value: "2024",
        label: "PoE Type 4 90W",
        sublabel: "powering Wi-Fi 7 and LED lighting",
      },
    ],
  },
  {
    type: "h2",
    id: "uae-implications",
    text: "What Cabling History Tells UAE Businesses Today",
  },
  {
    type: "p",
    text: "Three principles drive UAE structured cabling decisions in 2026. First, Cat 6A is the only credible specification for new horizontal cable plants. Cat 6 should not be installed; the cost difference is small and the 25-year support window matters more.",
  },
  {
    type: "p",
    text: "Second, fibre backbone should default to OS2 single-mode (for any reach over 100 metres) with OM4 multi-mode in the data centre. Pre-terminated trunks, MPO connectors, and high-density cassettes are now the norm for new builds.",
  },
  {
    type: "p",
    text: "Third, certified installation matters more than cable brand. The 25-year manufacturer warranty only applies if the installation passes full Fluke channel certification.",
  },
  {
    type: "h2",
    id: "where-artiflex",
    text: "Where Artiflex IT Comes In",
  },
  {
    type: "p",
    text: "Artiflex IT has been designing, deploying, and managing [infrastructure across the UAE, Oman, and Saudi Arabia](/infrastructure) for over 14 years. We work with CommScope, Panduit, Belden, R&M, Siemon and the broader structured cabling ecosystem with full BICSI-aligned installation and channel certification.",
  },
  {
    type: "cta",
    title: "Free Cabling Estate Review",
    description: "60-minute review of your current cable plant, category and fibre certification, warranty posture, capacity headroom and refresh roadmap.",
    href: "/contact",
    label: "Book Assessment",
  },
];
