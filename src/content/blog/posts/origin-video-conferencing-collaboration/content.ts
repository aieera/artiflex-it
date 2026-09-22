import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "On 20 April 1964, AT&T unveiled the PicturePhone Mod I at the New York World's Fair. Visitors queued for hours to make a video call between booths at the fair. The product launched commercially in 1970 with units that cost about 160 dollars per month plus 21 cents per minute (in 1970 dollars). It was a complete commercial failure. By 1973 fewer than a hundred PicturePhones were in service across the United States.",
  },
  {
    type: "p",
    text: "Sixty years later, the same idea is free at the point of use, runs on every laptop and phone, and conducted roughly two billion meetings a day worldwide at the peak of the 2020 pandemic. The story of how video conferencing went from spectacular flop to indispensable utility is one of patient technical accumulation that became overnight revolution when a global lockdown made it the only option.",
  },
  {
    type: "callout",
    variant: "info",
    title: "The day video conferencing became universal: March 2020",
    text: "Zoom daily participants went from 10 million in December 2019 to 300 million in April 2020. Microsoft Teams went from 32 million daily active users in November 2019 to 75 million in April 2020 and 145 million by April 2021. Video conferencing went from sometimes-useful to absolutely-mandatory in 30 days, and most of that adoption proved permanent.",
  },
  {
    type: "h2",
    id: "challenges",
    text: "Why this category had to exist",
  },
  {
    type: "p",
    text: "Through the 1990s and 2000s, video conferencing was always almost there but never quite worked. The pain points below explain why room systems struggled and why software-first solutions eventually won.",
  },
  {
    type: "ul",
    items: [
      "<strong>Bandwidth that did not exist.</strong> 1990s ISDN video at 384 kbps produced jerky, low-quality video. Real-time HD video needed broadband, which only became universal in the late 2000s.",
      "<strong>Cost of room systems.</strong> Polycom and Cisco Tandberg room systems cost 30,000 to 100,000 dollars per room. Meeting rooms that justified the investment were rare.",
      "<strong>Interoperability nightmare.</strong> Polycom, Tandberg, LifeSize, Sony and dozens of other video systems often did not talk to each other reliably. H.323, SIP, ISDN gateways and SCCP all needed configuration to interoperate.",
      "<strong>Booking and joining the call.</strong> Pre-Microsoft Teams, joining a video call required dialling a complex IP address, entering a meeting ID, navigating a vendor-specific menu. Meeting start times routinely slipped 10 minutes.",
      "<strong>Software-first won, hardware-first lost.</strong> Zoom in 2011 and Microsoft Teams in 2017 demonstrated that software-first video beat hardware-first video. The legacy room-system vendors never recovered.",
      "<strong>Pandemic-era scale that nobody had planned for.</strong> March 2020 generated 30 times the historical video conferencing load in three weeks.",
    ],
  },
  {
    type: "h2",
    id: "chapter-1",
    text: "Chapter 1 (1964-1990): The Room System Prehistory",
  },
  {
    type: "p",
    text: "AT&T's PicturePhone failed because the economics did not work and the user experience was not good enough to overcome the price. The company invested an estimated 500 million dollars in the technology through the 1960s and 1970s and recovered very little of it.",
  },
  {
    type: "p",
    text: "Through the 1970s and 1980s, video conferencing was the domain of specialised broadcast-and-teleconferencing rooms. Satellite-based corporate teleconferences were used by large multinationals for executive briefings, but the cost (often 1,000 dollars or more per hour per location) limited the use cases.",
  },
  {
    type: "p",
    text: "PictureTel was founded in 1984 in Massachusetts and shipped its first commercial video conferencing room system in 1985. The PictureTel room system became the template for the entire 1990s video conferencing industry.",
  },
  {
    type: "h2",
    id: "chapter-2",
    text: "Chapter 2 (1990-2003): ISDN, H.323 and the Polycom Era",
  },
  {
    type: "p",
    text: "Through the 1990s, ISDN BRI (basic rate interface, 128 kbps) and PRI (primary rate, T1 or E1) became the standard transport for room-based video conferencing. ITU-T H.320 standardised video over ISDN; H.323 (1996) extended it to IP networks.",
  },
  {
    type: "p",
    text: "Polycom (founded 1990) entered video conferencing with the ViewStation in 1998. The Polycom ViewStation set design templates that the entire industry copied. Polycom and Tandberg became the two dominant room-system vendors of the early 2000s.",
  },
  {
    type: "p",
    text: "Voice-quality issues dominated complaint logs through this era. Video could be choppy but voice that broke up was unacceptable. The Polycom SoundStation became a permanent fixture in conference rooms globally.",
  },
  {
    type: "h2",
    id: "chapter-3",
    text: "Chapter 3 (2003-2011): IP Video, Telepresence and the Tandberg-Cisco Acquisition",
  },
  {
    type: "p",
    text: "Broadband internet and IP-based video changed the economics. SIP and H.323 over IP networks replaced ISDN through the 2000s. HD video conferencing became practical from around 2006 with the introduction of H.264 video compression.",
  },
  {
    type: "p",
    text: "Cisco entered the room with the TelePresence product line in 2006: an extraordinary three-screen, multi-camera, life-size video conferencing room that cost roughly 300,000 dollars per location. TelePresence was a niche success in Fortune 100 boardrooms but did not scale economically.",
  },
  {
    type: "p",
    text: "Cisco acquired Tandberg in 2010 for 3.3 billion dollars and absorbed its product line. Polycom continued independently until it was acquired by HP / Poly in 2022. The video room-system industry consolidated dramatically through this decade.",
  },
  {
    type: "h2",
    id: "chapter-4",
    text: "Chapter 4 (2011-2019): Zoom, Software-First and the Cloud Pivot",
  },
  {
    type: "p",
    text: "Eric Yuan, a former Webex engineer, founded Zoom in April 2011 with a radical proposition: video conferencing should work reliably on any device, any network, anywhere, with no client install required. Zoom's product, launched in 2013, was meaningfully better than the incumbent alternatives at the unglamorous engineering problems.",
  },
  {
    type: "p",
    text: "Microsoft Teams launched in March 2017, replacing Skype for Business with a unified collaboration application that combined chat, meetings, files and voice. Teams bundled with Microsoft 365 became the largest distribution event in enterprise software history.",
  },
  {
    type: "p",
    text: "The room-system vendors responded slowly. Cisco Webex Room Kit, Polycom Studio, and a generation of more affordable video bars and cloud-managed room systems emerged but the centre of gravity had shifted decisively to software-first.",
  },
  {
    type: "h2",
    id: "chapter-5",
    text: "Chapter 5 (2020-2022): The Pandemic and the Two-Billion-Meetings-a-Day Era",
  },
  {
    type: "p",
    text: "On 11 March 2020 the World Health Organization declared COVID-19 a pandemic. Within two weeks most knowledge workers globally were working from home. Video conferencing became, almost overnight, the primary means of business communication.",
  },
  {
    type: "p",
    text: "Zoom's daily participant count went from 10 million in December 2019 to 300 million in April 2020. Microsoft Teams grew from 32 million to 145 million daily active users in 18 months. The infrastructure investments that scaled to meet demand were among the largest in cloud history.",
  },
  {
    type: "p",
    text: "User-interface conventions stabilised. Gallery view, breakout rooms, virtual backgrounds, raised-hand reactions, polls and screen sharing all became standard across the major platforms.",
  },
  {
    type: "h2",
    id: "chapter-6",
    text: "Chapter 6 (2023-now): AI Companions and the Disappearing Room System",
  },
  {
    type: "p",
    text: "Generative AI reshaped the video meeting in 2023 and 2024. Live transcription, real-time summarisation, automated action items, sentiment analysis, and after-the-fact searchable meeting recordings have become baseline features in Microsoft Teams (Copilot), Webex (AI Assistant), Zoom (AI Companion) and Google Meet (Gemini).",
  },
  {
    type: "p",
    text: "The room system continues to thin out. Modern Teams Rooms, Zoom Rooms and Webex Rooms use AI-powered cameras (Logitech RightSight 2, Poly DirectorAI, Cisco AI Camera) that automatically frame the active speaker, mute background noise and follow the conversation.",
  },
  {
    type: "p",
    text: "For UAE customers, the choice in 2026 is increasingly between Microsoft Teams, Cisco Webex, Zoom and Google Meet. Multi-platform interoperability via SIP and CVI (cloud video interoperability) gateways is now mature enough that platform fragmentation no longer creates the integration nightmares of a decade ago.",
  },
  {
    type: "stats",
    items: [
      {
        value: "1964",
        label: "AT&T PicturePhone unveiled",
        sublabel: "first commercial video calling, commercial failure",
      },
      {
        value: "1985",
        label: "PictureTel ships room system",
        sublabel: "modern video conferencing begins",
      },
      {
        value: "1998",
        label: "Polycom ViewStation launches",
        sublabel: "room system design template set",
      },
      {
        value: "2011",
        label: "Zoom founded",
        sublabel: "software-first video conferencing",
      },
      {
        value: "2017",
        label: "Microsoft Teams launches",
        sublabel: "unified collaboration consolidates",
      },
      {
        value: "2020",
        label: "Pandemic surge",
        sublabel: "video becomes universal in 30 days",
      },
    ],
  },
  {
    type: "h2",
    id: "uae-implications",
    text: "What Video Conferencing History Tells UAE Businesses Today",
  },
  {
    type: "p",
    text: "Three principles drive UAE video conferencing decisions in 2026. First, the platform decision is increasingly between Microsoft Teams, Webex Calling, Zoom Rooms and Google Meet. Multi-platform interoperability is mature; vendor lock-in concerns matter less than they did.",
  },
  {
    type: "p",
    text: "Second, modern room systems are software-defined. A Logitech Rally Bar plus a small mini-PC running Microsoft Teams Rooms or Zoom Rooms costs a fraction of the 2010-era Polycom or Cisco TelePresence room.",
  },
  {
    type: "p",
    text: "Third, AI meeting features have moved from differentiator to baseline. Transcription, summary, action items and Q&A are now expected.",
  },
  {
    type: "h2",
    id: "where-artiflex",
    text: "Where Artiflex IT Comes In",
  },
  {
    type: "p",
    text: "Artiflex IT has been designing, deploying, and managing [infrastructure across the UAE, Oman, and Saudi Arabia](/infrastructure) for over 14 years. We work with Microsoft Teams, Cisco Webex, Zoom, Google Meet, Logitech, Poly and the broader collaboration ecosystem as the use case requires.",
  },
  {
    type: "cta",
    title: "Free Video Conferencing and Meeting Room Review",
    description: "60-minute review of your current meeting room estate, platform standardisation, AI feature adoption, refresh cycle and recommended platform plus device strategy.",
    href: "/contact",
    label: "Book Assessment",
  },
];
