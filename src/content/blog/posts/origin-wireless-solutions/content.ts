import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "In September 1997 the IEEE ratified the original 802.11 standard. The first commercial Wi-Fi products ran at 2 megabits per second over the 2.4 GHz industrial-scientific-medical (ISM) band, a slice of spectrum the US Federal Communications Commission had specifically left unregulated because it was already populated by microwave ovens, garage door openers and amateur radio. Nobody at the FCC expected Wi-Fi to amount to anything serious; it was a curiosity for academic and warehouse environments.",
  },
  {
    type: "p",
    text: "Twenty-eight years later, Wi-Fi 7 hits multi-gigabit throughput in the new 6 GHz band, carries roughly 60 percent of the internet's last-mile traffic globally, and serves as the primary network access medium for billions of devices. The journey from 2 Mbps in an ISM curiosity to multi-gigabit enterprise fabric is one of the fastest-compounding technical stories in computing history.",
  },
  {
    type: "callout",
    variant: "info",
    title: "The day Wi-Fi went mainstream: 6 July 1999",
    text: "Apple announced the iBook in July 1999, the first mass-market consumer laptop with built-in Wi-Fi (Apple called it AirPort). The standard was 802.11b at 11 Mbps. Within five years Wi-Fi was a tick-box feature on every laptop sold. Within ten years it was the dominant network access medium in every office and home.",
  },
  {
    type: "h2",
    id: "challenges",
    text: "Why this category had to exist",
  },
  {
    type: "p",
    text: "Through the 2000s and 2010s, wireless went from convenience to mission-critical access. The pain points below forced Wi-Fi to evolve from a side project into a strategic infrastructure tier.",
  },
  {
    type: "ul",
    items: [
      "<strong>Spectrum congestion in 2.4 GHz.</strong> Three non-overlapping channels for an entire enterprise was inadequate by the mid-2000s. Microwave ovens, Bluetooth, baby monitors and dense AP deployments all competed for the same spectrum.",
      "<strong>Coverage versus density trade-off.</strong> Designing for coverage (few APs, high power) optimised the wrong thing for modern offices. Density-driven design (many APs, lower power) replaced it but required complete deployment rethinks.",
      "<strong>Roaming and session continuity.</strong> Voice over Wi-Fi, video conferencing and modern enterprise applications break if the client's wireless session is interrupted for more than 50 ms.",
      "<strong>Security: WEP, WPA, WPA2, WPA3.</strong> The original WEP encryption was broken within five years of deployment. WPA, WPA2 and finally WPA3 (2018) each emerged as the previous generation's vulnerabilities became commercially exploitable.",
      "<strong>Mobile devices changed the load profile.</strong> iPhone (2007) and Android (2008) made every employee a wireless-primary user. Enterprise WLAN designed for laptop coverage suddenly had to support 3-5 devices per person.",
      "<strong>Wi-Fi calling and the death of cellular indoors.</strong> Modern offices have terrible cellular coverage by design. Wi-Fi calling became the primary indoor voice service for most enterprise users by 2020.",
    ],
  },
  {
    type: "h2",
    id: "chapter-1",
    text: "Chapter 1 (1985-1999): The Pre-Standard Years",
  },
  {
    type: "p",
    text: "Wireless LAN existed before 802.11 but in fragmented form. The FCC opened the 902-928 MHz, 2.4 GHz and 5.8 GHz ISM bands for unlicensed use in 1985, triggering a small ecosystem of proprietary wireless LAN products from companies like NCR (WaveLAN, 1990), Proxim, and Symbol Technologies.",
  },
  {
    type: "p",
    text: "IEEE 802.11, ratified in September 1997, defined the first common standard for wireless LAN. The initial speeds were modest (1 and 2 Mbps), but the standardisation triggered the formation of the Wi-Fi Alliance in 1999 which created the interoperability certification programme that gave Wi-Fi its name and its commercial momentum.",
  },
  {
    type: "p",
    text: "802.11b, ratified in September 1999, increased throughput to 11 Mbps and became the first commercially significant Wi-Fi standard. Apple's iBook launched in July 1999 with built-in Wi-Fi, marketed as AirPort, and made wireless networking a consumer experience.",
  },
  {
    type: "h2",
    id: "chapter-2",
    text: "Chapter 2 (2003-2009): Wi-Fi 4 and the Enterprise Standard",
  },
  {
    type: "p",
    text: "802.11g (June 2003) brought 54 Mbps to the same 2.4 GHz band as 802.11b. The dual-band 802.11a (54 Mbps in 5 GHz) had existed since 1999 but only became commercially significant with dual-band laptop chipsets after 2004.",
  },
  {
    type: "p",
    text: "802.11n (ratified 2009, retroactively called Wi-Fi 4) was the inflection point that made Wi-Fi the primary enterprise access medium. MIMO multiple-input-multiple-output antennas, 40 MHz channels and physical-layer improvements pushed real-world throughput past 100 Mbps.",
  },
  {
    type: "p",
    text: "Enterprise WLAN architecture matured in parallel. Cisco acquired Airespace in 2005 and codified the wireless LAN controller (WLC) architecture. Aruba Networks (founded 2002, acquired by HP in 2015) and Meraki (founded 2006, acquired by Cisco in 2012) competed fiercely.",
  },
  {
    type: "h2",
    id: "chapter-3",
    text: "Chapter 3 (2013-2018): Wi-Fi 5 and the Mobile Generation",
  },
  {
    type: "p",
    text: "802.11ac (ratified 2013, retroactively Wi-Fi 5) pushed throughput further into multi-gigabit territory. Wave 2 of the standard (2016) added MU-MIMO multi-user MIMO and 160 MHz channel widths.",
  },
  {
    type: "p",
    text: "The smartphone era reshaped everything. By 2015, every employee carried two to three wireless devices. Enterprise networks that had been designed for laptops suddenly hosted phones with weak antennas running latency-sensitive applications.",
  },
  {
    type: "p",
    text: "Cloud-managed WLAN matured in this period. Cisco Meraki, Aruba Central, Mist (founded 2014, acquired by Juniper 2019), Ruckus and others built cloud platforms that managed thousands of APs across distributed deployments without on-premise controllers.",
  },
  {
    type: "h2",
    id: "chapter-4",
    text: "Chapter 4 (2019-2024): Wi-Fi 6 and Wi-Fi 6E Unlock Density",
  },
  {
    type: "p",
    text: "Wi-Fi 6 (802.11ax, ratified 2019) introduced OFDMA, which let an access point talk to multiple clients simultaneously in the same channel slice instead of taking turns. The practical impact in dense environments was a step-change in performance per AP.",
  },
  {
    type: "p",
    text: "Wi-Fi 6E (2021) opened the 6 GHz band, adding 1,200 MHz of new spectrum to enterprise WLAN globally (500 MHz in the UAE under TDRA regulation as of 2024). The 6 GHz band has seven 160 MHz channels available, compared to two in 5 GHz.",
  },
  {
    type: "p",
    text: "Mist AI, AI Operations across Cisco Catalyst Center and Aruba NetInsight reshaped how WLANs are managed. Machine learning identified RF problems, predicted capacity exhaustion, recommended channel and power settings.",
  },
  {
    type: "h2",
    id: "chapter-5",
    text: "Chapter 5 (2024-now): Wi-Fi 7 and the Multi-Gigabit Air",
  },
  {
    type: "p",
    text: "Wi-Fi 7 (802.11be, ratified 2024) added 320 MHz channels in 6 GHz, 4K-QAM modulation, and multi-link operation (MLO) where a single client can use multiple bands simultaneously. Peak theoretical throughput exceeded 40 Gbps per AP.",
  },
  {
    type: "p",
    text: "Multi-gigabit Ethernet to the AP became mandatory. Wi-Fi 5 and Wi-Fi 6 mostly worked on 1 GbE access switching; Wi-Fi 6E pushed many deployments to 2.5 or 5 GbE; Wi-Fi 7 essentially requires 10 GbE.",
  },
  {
    type: "p",
    text: "For UAE customers, Wi-Fi 7 deployment is paced by TDRA spectrum allocation in 6 GHz and by Civil Defense building access for AP installation, more than by technology readiness.",
  },
  {
    type: "h2",
    id: "chapter-6",
    text: "Chapter 6: The Future of the Air",
  },
  {
    type: "p",
    text: "Wi-Fi 8 (802.11bn, expected 2028) is already in technical specification. The next-generation goals focus on reliability rather than peak throughput: deterministic latency for ultra-reliable applications, integration with cellular handoff, and multi-AP coordination.",
  },
  {
    type: "p",
    text: "Cellular Wi-Fi convergence is the parallel direction. Private 5G, OpenRAN and CBRS all extend cellular-style network behaviour into private enterprise environments. For specific use cases (industrial, port operations, large outdoor venues) private 5G is genuinely competitive with enterprise WLAN.",
  },
  {
    type: "p",
    text: "What began as 2 Mbps in a microwave-oven band has become, in 2026, the dominant access medium for the digital economy. The cable is, finally, cut.",
  },
  {
    type: "stats",
    items: [
      {
        value: "1997",
        label: "IEEE 802.11 ratified",
        sublabel: "first common Wi-Fi standard",
      },
      {
        value: "1999",
        label: "Apple iBook with AirPort",
        sublabel: "Wi-Fi goes mass-market",
      },
      {
        value: "2009",
        label: "Wi-Fi 4 (802.11n)",
        sublabel: "wireless becomes enterprise-primary",
      },
      {
        value: "2013",
        label: "Wi-Fi 5 ratified",
        sublabel: "multi-gigabit per AP arrives",
      },
      {
        value: "2019",
        label: "Wi-Fi 6 ratified",
        sublabel: "density problem solved",
      },
      {
        value: "2024",
        label: "Wi-Fi 7 ratified",
        sublabel: "multi-gigabit per client arrives",
      },
    ],
  },
  {
    type: "h2",
    id: "uae-implications",
    text: "What Wi-Fi History Tells UAE Businesses Today",
  },
  {
    type: "p",
    text: "Three principles drive UAE WLAN decisions in 2026. First, Wi-Fi 6E is the practical floor for any new build; Wi-Fi 7 is the right choice for any three-plus-year refresh horizon. Wi-Fi 5 should not be specified for net-new deployments.",
  },
  {
    type: "p",
    text: "Second, the campus access switch refresh and the WLAN refresh are now a single project. Multi-gigabit (mGig) Ethernet to every AP, PoE++ to power Wi-Fi 7 APs, and 10 GbE uplinks to the closet have moved from optional to mandatory.",
  },
  {
    type: "p",
    text: "Third, cloud-managed WLAN is the dominant pattern for new UAE deployments. Cisco Meraki, Aruba Central, Mist AI, Ruckus and Huawei all offer credible cloud-managed options.",
  },
  {
    type: "h2",
    id: "where-artiflex",
    text: "Where Artiflex IT Comes In",
  },
  {
    type: "p",
    text: "Artiflex IT has been designing, deploying, and managing [infrastructure across the UAE, Oman, and Saudi Arabia](/infrastructure) for over 14 years. We work with Cisco Meraki, Aruba, Juniper Mist, Ruckus, Huawei and the broader wireless ecosystem as the use case requires.",
  },
  {
    type: "cta",
    title: "Free Wi-Fi Posture Review",
    description: "60-minute review including basic site-survey appraisal, AP count and class, density and coverage assessment, Wi-Fi 6E and Wi-Fi 7 readiness, and a prioritised refresh roadmap.",
    href: "/contact",
    label: "Book Assessment",
  },
];
