import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "In 1985 the typical mid-sized enterprise stored roughly 100,000 pages of paper a year in steel filing cabinets. Roughly 7 percent of those pages were lost permanently every year through misfiling. Another 5 percent were duplicates of pages already filed elsewhere. The cost of operating the filing system, in floor space, archivist labour and lost productivity, was conservatively estimated at 20 dollars per active document.",
  },
  {
    type: "p",
    text: "Forty years later, the same enterprise generates ten times more documents per year, stores almost none of them on paper, finds any document in under three seconds via full-text and metadata search, and extracts structured data from incoming invoices using AI in 200 milliseconds. The journey from filing cabinet to AI-indexed archive is one of the quietest revolutions in enterprise IT, and the foundation of every digital-business initiative that followed.",
  },
  {
    type: "callout",
    variant: "info",
    title: "When DMS became a recognisable enterprise category: 1990",
    text: "Documentum was founded in June 1990 in Pleasanton, California, by Howard Shao, John Newton and Ed Bachman. It defined the modern enterprise content management category, was acquired by EMC in 2003 for 1.7 billion dollars, and then by OpenText in 2017. Every major DMS architecture in production today owes something to the metadata model, repository design or workflow framework that Documentum pioneered in the early 1990s.",
  },
  {
    type: "h2",
    id: "challenges",
    text: "Why this category had to exist",
  },
  {
    type: "p",
    text: "Through the 1980s and 1990s, the steel filing cabinet started to fail at every level. The pain points below forced enterprises to invent document imaging, then workflow, then full enterprise content management, then metadata-driven DMS, then AI-driven extraction.",
  },
  {
    type: "ul",
    items: [
      "<strong>Physical retrieval delay.</strong> Finding a specific document in a corporate archive could take hours or days. For active customer service and regulated approval workflows this was operationally unacceptable.",
      "<strong>Storage cost spiralling.</strong> Office floor space in city centres became too expensive to use for filing cabinets. The cost per square metre in 2000s Dubai or London made paper archives one of the largest hidden line items on the operations budget.",
      "<strong>Audit and compliance evidence.</strong> Regulators wanted to see specific records on demand. Paper systems could not deliver chain of custody, retention enforcement or audit trail at the level modern regulators expected.",
      "<strong>Loss and duplication.</strong> Paper documents got misfiled, lost, photocopied unnecessarily, taken home and forgotten. Each loss was a small failure; collectively they represented a material business risk.",
      "<strong>No useful integration with business systems.</strong> An invoice in a filing cabinet was disconnected from the ERP record it related to. Reconciling a financial transaction with its supporting documents required physical retrieval.",
      "<strong>Remote work was impossible.</strong> Pre-DMS, the work could only happen where the paper was. The 2020 pandemic exposed this brutally for every organisation that had not digitised.",
    ],
  },
  {
    type: "h2",
    id: "chapter-1",
    text: "Chapter 1 (1955-1985): Microfilm and the First Imaging Era",
  },
  {
    type: "p",
    text: "Microfilm had been used for document archive since the 1920s but only became a serious enterprise tool in the 1960s. Banks, insurance companies and government departments used 16mm and 35mm microfilm to compress decades of paper records into archive vaults that took a fraction of the floor space.",
  },
  {
    type: "p",
    text: "By the early 1980s, optical disk technology promised even better. The first commercial WORM (write-once-read-many) disks could store thousands of document images in a desktop drive. IBM launched ImagePlus in 1986, FileNet (founded 1982) launched its WorkFlo product, and a small ecosystem of document imaging vendors emerged around insurance claims, mortgage processing and banking back-office workflows.",
  },
  {
    type: "p",
    text: "These first-generation document imaging systems were transformative for the workflows they touched but they were not yet enterprise platforms. The imaging system was an island, separate from the ERP and the email system, accessed by specialised operators in the back office.",
  },
  {
    type: "h2",
    id: "chapter-2",
    text: "Chapter 2 (1990-2000): The Enterprise Content Management Era Begins",
  },
  {
    type: "p",
    text: "Documentum's founding in 1990 marked the start of true enterprise document management. Documentum's eRoom and Documentum Content Server architected a repository where any document type (Word, Excel, scanned image, drawing) could be stored, versioned, secured and retrieved by metadata. The model influenced every DMS that followed.",
  },
  {
    type: "p",
    text: "Open Text Corporation (1991) emerged from the Oxford English Dictionary digitisation project in Waterloo, Canada and rapidly expanded into enterprise document management. The LiveLink product became the foundation of OpenText's content business and a serious competitor to Documentum throughout the 1990s and 2000s.",
  },
  {
    type: "p",
    text: "FileNet, IBM ImagePlus, Hummingbird DocsOpen and a generation of regional players competed for the larger enterprise document market. By the late 1990s, every major bank, insurer, oil-and-gas major and government department had purchased at least one of them.",
  },
  {
    type: "h2",
    id: "chapter-3",
    text: "Chapter 3 (2001-2010): SharePoint Eats the Office",
  },
  {
    type: "p",
    text: "Microsoft launched SharePoint Portal Server 2001 in March 2001 as a relatively unambitious team-collaboration tool. SharePoint 2003 added document libraries and lightweight workflow. SharePoint 2007 made the platform genuinely capable as a document management system, with versioning, check-in/check-out, basic retention policies and rich integration with Office.",
  },
  {
    type: "p",
    text: "By 2010 SharePoint had become the dominant document management platform in mid-market enterprises globally. The fact that it was bundled with Office, that users already understood it, and that IT teams could deploy it on existing Windows infrastructure made it the path of least resistance.",
  },
  {
    type: "p",
    text: "Microsoft 365 (then Office 365) in 2011 moved SharePoint to the cloud as SharePoint Online. The Microsoft 365 bundle became the de facto document management platform for hundreds of millions of knowledge workers globally.",
  },
  {
    type: "h2",
    id: "chapter-4",
    text: "Chapter 4 (2002-2018): Specialists Win the Process-Heavy Use Cases",
  },
  {
    type: "p",
    text: "SharePoint won the broad knowledge-worker market but specialist DMS platforms continued to dominate process-heavy use cases. Hyland OnBase (founded 1991) built deep depth in healthcare records, claims processing, and government records. M-Files (founded 2002 Finland) built the first credible metadata-first DMS: documents were tagged with metadata first and filed only against that metadata, with no fixed folder structure required.",
  },
  {
    type: "p",
    text: "DocuWare (founded 1988 Germany), Laserfiche (founded 1987), and a regional ecosystem of specialist DMS players built deep expertise in accounts payable automation, contracts management, HR records and similar high-volume structured workflows.",
  },
  {
    type: "p",
    text: "Box (founded 2005) emerged from the consumer file-sharing era as an enterprise cloud collaboration platform with credible enterprise governance features. By 2018 Box had built a credible mid-market position alongside the SharePoint default.",
  },
  {
    type: "h2",
    id: "chapter-5",
    text: "Chapter 5 (2018-2023): AI Capture and Intelligent Extraction",
  },
  {
    type: "p",
    text: "Optical character recognition (OCR) became reliable enough for production use cases in the 1990s, but generic OCR could not extract structured data from documents. A scanned invoice was searchable but the line items, totals and supplier details still had to be keyed manually. The first generation of intelligent capture vendors (Kofax, EMC Captiva, ABBYY) used template-based extraction.",
  },
  {
    type: "p",
    text: "Machine learning changed the economics. From around 2018 onwards, intelligent document processing platforms (Kofax, Hyperscience, ABBYY Vantage, M-Files AI) extracted structured data from previously unseen document layouts with accuracy that often exceeded human keying. The accounts payable use case became the canonical example: an inbound supplier invoice could be received by email, OCR-extracted, validated against the PO and three-way-matched in the ERP, all in under 60 seconds with no human keystrokes.",
  },
  {
    type: "p",
    text: "The implications for DMS were profound. Documents could now be stored with structured metadata extracted automatically. Search and retrieval became dramatically faster because the metadata was richer.",
  },
  {
    type: "h2",
    id: "chapter-6",
    text: "Chapter 6 (2023-now): Generative AI and the Death of Folder Hierarchies",
  },
  {
    type: "p",
    text: "Generative AI changed how knowledge workers interact with document repositories. Microsoft 365 Copilot (2023), M-Files Aino (2024), OpenText Aviator and Box AI Studio embedded large language models directly into the document experience. Users could now ask natural-language questions across thousands of stored documents and receive summarised, sourced answers.",
  },
  {
    type: "p",
    text: "Metadata-first platforms (M-Files, modern Box, modern SharePoint with Syntex) became more obviously superior to folder-based legacy stores. AI extraction could now generate the metadata that retrieval and compliance depended on, without requiring users to do the tedious classification work themselves.",
  },
  {
    type: "p",
    text: "For UAE customers, AI-powered DMS adds a strategic capability layer to what was once back-office plumbing. Arabic-language extraction, right-to-left invoice processing, Emirates ID validation, and integration with UAE-FTA e-invoicing all benefit from the same AI revolution.",
  },
  {
    type: "stats",
    items: [
      {
        value: "1955",
        label: "Microfilm enterprise adoption",
        sublabel: "first serious paper compression",
      },
      {
        value: "1990",
        label: "Documentum founded",
        sublabel: "modern ECM category emerges",
      },
      {
        value: "2001",
        label: "SharePoint 2001 ships",
        sublabel: "mass-market DMS arrives",
      },
      {
        value: "2002",
        label: "M-Files founded",
        sublabel: "metadata-first DMS pioneers",
      },
      {
        value: "2018",
        label: "AI extraction goes mainstream",
        sublabel: "intelligent document processing scales",
      },
      {
        value: "2023",
        label: "Generative AI in DMS",
        sublabel: "Copilot and Aino reshape retrieval",
      },
    ],
  },
  {
    type: "h2",
    id: "uae-implications",
    text: "What DMS History Tells UAE Businesses Today",
  },
  {
    type: "p",
    text: "Three principles drive UAE DMS decisions in 2026. First, paper-heavy workflows are now a competitive disadvantage in every industry. Customers, regulators and employees all expect digital document access. AP automation, contract lifecycle, HR records and customer onboarding are the highest-ROI starting points.",
  },
  {
    type: "p",
    text: "Second, the Microsoft 365 plus SharePoint default is sufficient for general office content but typically inadequate for process-heavy use cases. Specialist platforms (M-Files, Hyland OnBase, DocuWare, Laserfiche) layer on top and deliver the workflow depth SharePoint alone cannot match.",
  },
  {
    type: "p",
    text: "Third, AI extraction is now mainstream and reshaping what counts as good DMS. Any platform without credible AI-driven extraction in 2026 is a generation behind.",
  },
  {
    type: "h2",
    id: "where-artiflex",
    text: "Where Artiflex IT Comes In",
  },
  {
    type: "p",
    text: "Artiflex IT has been designing, deploying, and managing [infrastructure across the UAE, Oman, and Saudi Arabia](/infrastructure) for over 14 years. We work with Microsoft 365, SharePoint, M-Files, Hyland OnBase, DocuWare, Box and the broader DMS ecosystem as the use case requires.",
  },
  {
    type: "cta",
    title: "Free DMS Strategy Review",
    description: "60-minute review of your current document estate, capture maturity, AI-readiness, retention compliance and recommended platform plus rollout plan.",
    href: "/contact",
    label: "Book Assessment",
  },
];
