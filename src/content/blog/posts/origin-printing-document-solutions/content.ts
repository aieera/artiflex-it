import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "In 1971, a young Xerox researcher named Gary Starkweather pointed a laser at a rotating drum and proved that a beam of light could write print-ready pages onto paper. His colleagues at Xerox PARC dismissed laser printing as a peripheral curiosity. It would take HP another 13 years to ship a commercial laser printer at a price an office could afford.",
  },
  {
    type: "p",
    text: "Office printing sits in a strange position in the infrastructure stack. It is the most visible piece of IT to non-IT staff, the largest single source of operational waste in most enterprises, and the slowest-moving category in terms of technological revolution. And yet the journey from Gutenberg's hand-set type to today's AI-routed cloud print has been one of the more consequential, if less celebrated, evolutions in business history.",
  },
  {
    type: "callout",
    variant: "info",
    title: "The week the office changed: May 1984",
    text: "Hewlett-Packard launched the LaserJet on 1 May 1984. It cost 3,495 dollars, weighed 32 kilograms, and printed at eight pages per minute. Eighteen months later, Aldus shipped PageMaker for the Macintosh. Together, the LaserJet and PageMaker created desktop publishing and made every office document a designed artefact.",
  },
  {
    type: "h2",
    id: "challenges",
    text: "Why this category had to exist",
  },
  {
    type: "p",
    text: "By the late 1970s, the office had a printing problem that no single technology was solving well. The challenges below set the stage for the laser printer, the multifunction device, and eventually for managed print services as a category.",
  },
  {
    type: "ul",
    items: [
      "<strong>Dot matrix was slow and ugly.</strong> The dominant office printers of the 1970s used impact heads striking through inked ribbons. Output was acceptable for invoices, unacceptable for letters and proposals.",
      "<strong>Copy quality was poor and centralised.</strong> Photocopiers existed since Xerox 914 in 1959, but they sat in a copy room run by a clerk. Sending a draft for copying took hours.",
      "<strong>Faxing was a separate stack.</strong> By the 1980s, the fax machine was indispensable for cross-organisation document exchange but was a parallel infrastructure.",
      "<strong>Print waste was invisible.</strong> Surveys at the time estimated that 15 to 30 percent of office prints were never picked up, abandoned at the device, or trivially duplicated.",
      "<strong>Document security was non-existent.</strong> Sensitive documents sat in the output tray of a shared printer for anyone walking past to read.",
      "<strong>Total cost was unknown and unowned.</strong> Print costs were buried across consumables, paper, electricity, lease payments and IT support tickets.",
    ],
  },
  {
    type: "h2",
    id: "chapter-1",
    text: "Chapter 1 (1440-1959): Gutenberg, the Typewriter and the Xerox 914",
  },
  {
    type: "p",
    text: "Johannes Gutenberg's printing press, introduced around 1440 in Mainz, established the basic concept that would survive 500 years. For four centuries, mechanical refinement of that idea produced the books, newspapers and government records that built the modern world.",
  },
  {
    type: "p",
    text: "The photocopier transformed office reproduction in 1959. Chester Carlson had invented xerography in 1938; after a 21-year quest for commercial backing, the Haloid Corporation (renamed Xerox in 1961) launched the Xerox 914. Within five years it had become so successful that the model became the foundation of Xerox as a corporation.",
  },
  {
    type: "p",
    text: "Through the 1960s and 1970s, the dot matrix printer brought computer output to paper. Centronics, Epson and Okidata fought for dominance; the IBM Selectric typewriter shipped 17 million units by 1986.",
  },
  {
    type: "h2",
    id: "chapter-2",
    text: "Chapter 2 (1971-1984): Laser Printing Arrives",
  },
  {
    type: "p",
    text: "Gary Starkweather built the first laser printer prototype at Xerox PARC in 1971. The technology was ingenious: a laser scanned a charged drum, creating an electrostatic image that picked up toner, transferred it to paper, and fused it with heat.",
  },
  {
    type: "p",
    text: "The transformation came when Canon, IBM and HP began collaborating on a desktop-scale laser engine. Canon's CX engine, introduced in 1983, was the small, reliable, mass-producible heart that desktop laser printing needed. IBM's 4019 Pageprinter and HP's LaserJet both shipped in 1984. HP won the volume battle.",
  },
  {
    type: "p",
    text: "Within three years, the office expectation for printed documents had inverted. Letters were now expected to look typeset, not typewritten. The phrase desktop publishing entered the language, propelled by the combination of LaserWriter plus Aldus PageMaker plus the Macintosh.",
  },
  {
    type: "h2",
    id: "chapter-3",
    text: "Chapter 3 (1985-2000): Networking and the Birth of the MFP",
  },
  {
    type: "p",
    text: "Early laser printers were attached to a single computer via a parallel cable. As local-area networks spread through the late 1980s, the network printer emerged: HP JetDirect cards turned the LaserJet into a shared resource on Ethernet. By 1995, the typical office had one or two laser printers per floor, shared by network.",
  },
  {
    type: "p",
    text: "The same period produced the multifunction printer (MFP). Canon, Ricoh, Konica, Sharp, Xerox and HP each independently realised that the photocopier, the printer, the scanner and the fax shared most of their underlying mechanics. By the late 1990s, the convergence was complete: a single device that copied, printed, scanned and faxed.",
  },
  {
    type: "p",
    text: "The economic model shifted with the technology. Cost-per-page contracts, introduced through the 1990s, bundled hardware, consumables, service and software into a single per-page fee. By 2000, the cost-per-page (CPP) lease was the dominant procurement model.",
  },
  {
    type: "h2",
    id: "chapter-4",
    text: "Chapter 4 (2000-2010): Managed Print Services Becomes a Category",
  },
  {
    type: "p",
    text: "Through the early 2000s, large enterprises began to ask harder questions about their print spending. Surveys by Gartner and IDC found that the true total cost of office print was typically three to five times the visible toner-and-paper cost.",
  },
  {
    type: "p",
    text: "Managed Print Services (MPS) emerged as a packaged response. HP, Xerox, Canon, Ricoh, Lexmark and Konica all built MPS practices that assessed the existing fleet, right-sized it (typically reducing total devices by 30 to 50 percent), consolidated to multifunction devices, implemented secure release printing, and offered guaranteed cost-per-page pricing.",
  },
  {
    type: "p",
    text: "Follow-me printing was the operational innovation of the decade. Software platforms like PaperCut, Equitrac, SafeCom and uniFLOW intercepted print jobs at the server, held them until the user authenticated at any compatible device, then released the document. The change eliminated 15 to 30 percent of print waste at a stroke.",
  },
  {
    type: "h2",
    id: "chapter-5",
    text: "Chapter 5 (2010-2020): Mobile, Cloud and Secure Print",
  },
  {
    type: "p",
    text: "The smartphone created a new print problem and a new print category. Apple AirPrint (2010), Google Cloud Print (2010-2020) and Mopria (2013) emerged as platform-level standards to bridge mobile documents to office printers.",
  },
  {
    type: "p",
    text: "Cloud print followed in parallel. HP Smart, Xerox @PrintByXerox, Canon uniFLOW Online, and Ricoh's Smart Integration Cloud built print queues that lived in the cloud rather than on a local print server. The model worked particularly well for distributed workforces and the rising tide of hybrid work after 2020.",
  },
  {
    type: "p",
    text: "Security matured at the same pace as connectivity. Modern MFPs now include encryption of data at rest, encrypted print streams, secure boot, signed firmware, integrated identity (LDAP / Active Directory / Azure AD), and pull-print authentication.",
  },
  {
    type: "h2",
    id: "chapter-6",
    text: "Chapter 6 (2020-now): Sustainability, AI-Routed Print and the Future Office",
  },
  {
    type: "p",
    text: "The pandemic and the rise of hybrid work created the first real existential question for office printing in decades. With offices half-empty, print volumes dropped 30 to 50 percent in many enterprises. Right-sizing the fleet became urgent.",
  },
  {
    type: "p",
    text: "Sustainability became the next driver. EU and increasingly UAE corporate reporting standards demand documented carbon footprint and waste reduction. Toner recycling, low-melt fuser technology, duplex by default, and serverless print architectures all reduce the carbon footprint of office print materially.",
  },
  {
    type: "p",
    text: "Finally, the AI wave has arrived in document workflow. Modern MFPs from HP, Canon, Konica Minolta and Ricoh include AI-driven document classification, automatic OCR, sensitive-content redaction at the device, intelligent routing of scanned documents to the correct ERP / DMS / SharePoint folder.",
  },
  {
    type: "stats",
    items: [
      {
        value: "1440",
        label: "Gutenberg printing press",
        sublabel: "movable type begins five centuries of mechanical print",
      },
      {
        value: "1959",
        label: "Xerox 914 launches",
        sublabel: "photocopying becomes an office activity",
      },
      {
        value: "1971",
        label: "First laser printer prototype",
        sublabel: "Gary Starkweather builds it at Xerox PARC",
      },
      {
        value: "1984",
        label: "HP LaserJet ships",
        sublabel: "desktop laser printing arrives",
      },
      {
        value: "2008",
        label: "MPS becomes mainstream",
        sublabel: "Managed Print Services as a category",
      },
      {
        value: "2024",
        label: "AI document workflow",
        sublabel: "MFP becomes orchestration platform",
      },
    ],
  },
  {
    type: "h2",
    id: "uae-implications",
    text: "What Office Printing History Tells UAE Businesses Today",
  },
  {
    type: "p",
    text: "Three practical principles guide UAE print decisions in 2026. First, right-size before you specify. Hybrid work has permanently reduced office print volumes by 30 to 50 percent in most enterprises; the fleet inherited from 2019 is almost certainly oversized.",
  },
  {
    type: "p",
    text: "Second, treat the MFP as a security endpoint, not as a peripheral. Modern UAE compliance frameworks (PDPL, NESA, ADHICS) all expect documented audit trails for document handling.",
  },
  {
    type: "p",
    text: "Third, MPS is now table stakes, not a differentiator. The choice should be made on service-level depth, sustainability reporting, and partner field response time rather than on brochure features.",
  },
  {
    type: "h2",
    id: "where-artiflex",
    text: "Where Artiflex IT Comes In",
  },
  {
    type: "p",
    text: "Artiflex IT has been designing, deploying, and managing [infrastructure across the UAE, Oman, and Saudi Arabia](/infrastructure) for over 14 years. We work with HP, Canon, Xerox, Ricoh, Konica Minolta, Sharp, Lexmark and the broader print ecosystem as the use case requires.",
  },
  {
    type: "cta",
    title: "Free Print Estate Assessment",
    description: "60-minute review of your current print fleet, MPS contract terms, security posture and pull-print readiness.",
    href: "/contact",
    label: "Book Assessment",
  },
];
