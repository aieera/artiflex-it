import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "In June 1942 at the Peenemunde rocket test facility in northern Germany, engineer Walter Bruch installed the world's first closed-circuit television system. The objective was unsentimental: V-2 rocket test crews were dying in launch accidents at an unsustainable rate, and the Wehrmacht needed a way to watch the launches from a safe distance. Bruch's system used a custom Siemens camera and a remote viewing station some kilometres from the launch pad.",
  },
  {
    type: "p",
    text: "Eighty-three years later, video surveillance is one of the largest categories of infrastructure on the planet by camera count, with somewhere between 1 and 1.5 billion cameras operating worldwide. The UAE has one of the highest camera densities of any country, both because of an explicit national strategy and because the major UAE cities have made surveillance a baseline of urban management.",
  },
  {
    type: "callout",
    variant: "info",
    title: "The day CCTV became a global product industry: 1996",
    text: "Axis Communications, a Swedish networking company founded in 1984, launched the world's first network camera, the Axis NetEye 200, in 1996. The device combined a CCD sensor, an ARM processor, and a 10 Mbps Ethernet port. Within a decade IP video had displaced analog as the dominant new-installation architecture.",
  },
  {
    type: "h2",
    id: "challenges",
    text: "Why this category had to exist",
  },
  {
    type: "p",
    text: "Through the 1990s and 2010s, video surveillance underwent two structural reinventions: from analog to IP, then from human watching to AI analysing.",
  },
  {
    type: "ul",
    items: [
      "<strong>VHS tape archive was archaeological.</strong> Twentieth-century CCTV recorded to VHS tape. Reviewing footage of an incident required physically locating the right tape and hoping it had not been overwritten in the rotation.",
      "<strong>Resolution that could not identify anyone.</strong> Standard-definition analog CCTV produced video at 352 by 288 pixels (CIF resolution). At any meaningful distance, faces and licence plates were unreadable.",
      "<strong>Cabling that did not scale.</strong> Analog coaxial CCTV cabling did not share infrastructure with the IP network. Adding cameras meant pulling separate cable. Power-over-Ethernet IP cameras eliminated this problem.",
      "<strong>Human review at large camera counts.</strong> A single security guard cannot meaningfully watch 16 monitors. Above roughly 100 cameras, traditional human review becomes statistical.",
      "<strong>Storage growth with HD and 4K.</strong> HD then 4K then 8K cameras multiplied storage requirements by orders of magnitude.",
      "<strong>Cybersecurity of the cameras themselves.</strong> IP cameras became one of the most exploited categories of IoT device. The Mirai botnet (2016) infected hundreds of thousands of cheap IP cameras and DVRs.",
    ],
  },
  {
    type: "h2",
    id: "chapter-1",
    text: "Chapter 1 (1942-1980): The Analog and Magnetic Era",
  },
  {
    type: "p",
    text: "Bruch's V-2 monitor was a one-off. The first commercial CCTV deployments emerged after World War II, mostly in banking and government applications, using vacuum-tube cameras and direct-wired monitors. Through the 1950s and 1960s, CCTV was a niche product for security-conscious institutions, with no recording capability and entirely human review.",
  },
  {
    type: "p",
    text: "The introduction of magnetic videotape recording (initially helical-scan reel-to-reel from companies like Ampex in the 1960s, later VHS in the 1980s) made archival CCTV practical. By the mid-1980s, every serious commercial CCTV installation included time-lapse VHS recorders.",
  },
  {
    type: "p",
    text: "The 1970s and 1980s also saw the first systematic deployments of public-area CCTV in transport hubs, banks and large retail. The 1980s UK and Singapore made early national-level commitments to public-area surveillance that would influence subsequent UAE and GCC adoption.",
  },
  {
    type: "h2",
    id: "chapter-2",
    text: "Chapter 2 (1996-2010): The IP Camera Revolution",
  },
  {
    type: "p",
    text: "Axis Communications launched the first IP camera, the NetEye 200, in 1996. The product was technically impressive but commercially niche through the late 1990s because IP networks were not yet pervasive in commercial buildings and storage costs for digital video were prohibitive.",
  },
  {
    type: "p",
    text: "From around 2004, two trends converged. First, Power-over-Ethernet (802.3af, ratified 2003) eliminated the need for separate power cabling to cameras. Second, hard-disk pricing dropped fast enough that recording HD video for weeks became economically feasible.",
  },
  {
    type: "p",
    text: "By 2010 IP video had overtaken analog in new commercial installations globally. Axis, Sony, Bosch, Pelco and a generation of mid-tier manufacturers competed in the enterprise segment. The Chinese manufacturers Hikvision (founded 2001) and Dahua (founded 2001) emerged with very aggressive pricing.",
  },
  {
    type: "h2",
    id: "chapter-3",
    text: "Chapter 3 (2010-2018): Megapixel Resolution and the Storage Problem",
  },
  {
    type: "p",
    text: "Standard-definition IP cameras produced 4CIF resolution (704 by 480 pixels) through the mid-2000s. From 2008 onwards, 1 megapixel (1280 by 720), 2 megapixel (1920 by 1080 Full HD), 4 megapixel and eventually 8 megapixel (4K) cameras became commodity products.",
  },
  {
    type: "p",
    text: "H.264 video compression (standardised 2003) and later H.265 (HEVC, 2013) absorbed roughly half the storage impact of each resolution generation. Without the compression improvements, modern surveillance would be economically impractical.",
  },
  {
    type: "p",
    text: "Network Video Recorder (NVR) appliances replaced DVRs as the dominant recording platform. Milestone Systems, Genetec, Avigilon, Hanwha (formerly Samsung Techwin), and others built enterprise Video Management Software (VMS) platforms.",
  },
  {
    type: "h2",
    id: "chapter-4",
    text: "Chapter 4 (2015-2020): Analytics, Deep Learning and the Era of the AI Camera",
  },
  {
    type: "p",
    text: "Video analytics existed in the 1990s as crude motion-detection and tripwire algorithms. They became genuinely useful with the application of deep learning around 2015. Convolutional neural networks made object detection, face recognition, licence plate recognition and behaviour analytics dramatically more accurate.",
  },
  {
    type: "p",
    text: "Avigilon (acquired by Motorola Solutions 2018) pioneered enterprise video analytics with its Appearance Search and Unusual Motion Detection features. Hikvision and Dahua followed with their own AI camera lines. Axis, Bosch, Hanwha and others added AI-camera variants across their product lines.",
  },
  {
    type: "p",
    text: "The UAE became one of the largest single AI-camera markets globally by 2020. The Dubai Smart City initiative, the Abu Dhabi Smart Government programme, and the federal Smart Government framework all included surveillance modernisation as core elements.",
  },
  {
    type: "h2",
    id: "chapter-5",
    text: "Chapter 5 (2018-2023): The Geopolitics of Surveillance",
  },
  {
    type: "p",
    text: "Hikvision and Dahua became geopolitical flashpoints around 2019. The US Entity List, EU procurement restrictions and concerns about supply-chain transparency reshaped procurement decisions in many Western markets. Axis, Hanwha, Bosch and Avigilon all benefited from the resulting shift.",
  },
  {
    type: "p",
    text: "For the UAE, the geopolitics has been mixed. Chinese cameras remain widely deployed and competitive on price. Western enterprise customers and certain regulated sectors have moved to Western suppliers; cost-sensitive segments continue to use a mix.",
  },
  {
    type: "p",
    text: "Cybersecurity of cameras has become a procurement requirement of its own. The Mirai botnet incident in 2016 exposed the systemic risk. Modern enterprise camera procurement specifications now include firmware signing, vulnerability disclosure policies, and isolation from the wider corporate network.",
  },
  {
    type: "h2",
    id: "chapter-6",
    text: "Chapter 6 (2023-now): Cloud Video, AI at the Edge and the Smart City",
  },
  {
    type: "p",
    text: "Cloud-managed video surveillance (Verkada, Eagle Eye Networks, Rhombus, Genetec Stratocast) emerged as a credible alternative to on-premise VMS for SMB and distributed retail. The proposition is operational simplicity: one cloud dashboard, no NVR appliance to manage.",
  },
  {
    type: "p",
    text: "AI continues to migrate to the camera itself. Modern AI-camera processors (NVIDIA Jetson, Ambarella, HiSilicon) run multiple deep-learning models on the camera, classifying objects, recognising faces, tracking behaviour, all without sending video to the VMS first.",
  },
  {
    type: "p",
    text: "For UAE Smart City deployments, the architecture in 2026 is increasingly hybrid: AI at the edge in the camera, video at the edge in regional NVR clusters, metadata and exception clips in a central cloud analytics tier.",
  },
  {
    type: "stats",
    items: [
      {
        value: "1942",
        label: "First CCTV at Peenemunde",
        sublabel: "Walter Bruch installs V-2 monitor",
      },
      {
        value: "1996",
        label: "Axis NetEye 200",
        sublabel: "first IP camera",
      },
      {
        value: "2003",
        label: "H.264 standardised",
        sublabel: "modern video compression arrives",
      },
      {
        value: "2015",
        label: "Deep-learning analytics",
        sublabel: "AI cameras become practical",
      },
      {
        value: "2018",
        label: "Avigilon plus Motorola merger",
        sublabel: "enterprise AI surveillance consolidates",
      },
      {
        value: "2024",
        label: "Cloud and edge AI mature",
        sublabel: "Smart City surveillance becomes standard",
      },
    ],
  },
  {
    type: "h2",
    id: "uae-implications",
    text: "What CCTV History Tells UAE Businesses Today",
  },
  {
    type: "p",
    text: "Three principles shape UAE surveillance decisions in 2026. First, IP cameras with PoE plus full HD or higher resolution are the practical floor for any new installation. Analog systems should not be specified for net-new.",
  },
  {
    type: "p",
    text: "Second, AI analytics is now baseline. Object classification, licence plate recognition, behaviour analytics and increasingly face recognition (subject to UAE PDPL and sector-specific regulation) are widely deployed.",
  },
  {
    type: "p",
    text: "Third, vendor selection for UAE enterprise increasingly considers geopolitics alongside specification and price. SIRA approval, MOI integration and Civil Defense compliance are mandatory regardless of vendor.",
  },
  {
    type: "h2",
    id: "where-artiflex",
    text: "Where Artiflex IT Comes In",
  },
  {
    type: "p",
    text: "Artiflex IT has been designing, deploying, and managing [infrastructure across the UAE, Oman, and Saudi Arabia](/infrastructure) for over 14 years. We work with Axis, Bosch, Hanwha, Avigilon, Hikvision, Dahua, Milestone, Genetec, Verkada and the broader video surveillance ecosystem as the use case requires.",
  },
  {
    type: "cta",
    title: "Free CCTV and Surveillance Posture Review",
    description: "60-minute review of your current camera estate, VMS platform, retention compliance against UAE regulations, AI analytics readiness and recommended modernisation plan.",
    href: "/contact",
    label: "Book Assessment",
  },
];
