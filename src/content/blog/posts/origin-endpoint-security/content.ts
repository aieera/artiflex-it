import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "Every device that connects to a corporate network, laptop, desktop, server, mobile, virtual machine, is also a way in. That fact has been true since the moment computers started networking, and it is the reason an entire industry exists to defend the endpoint. But endpoint security did not always look like the AI-driven Extended Detection and Response platforms enterprises run today. It started with two engineers in Oxford, an idea about file checksums, and one of the most important technical papers nobody outside the field has ever read.",
  },
  {
    type: "p",
    text: "This is how forty years of endpoint security actually unfolded.",
  },
  {
    type: "callout",
    variant: "info",
    title: "The founding moment, Oxford, 1985",
    text: "Peter Lammer and Jan Hruska founded Sophos in Abingdon, Oxford, UK and created the world's first checksum-based antivirus software in 1985. In 1989 they followed it with the world's first signature-based AV. Two of the three foundational endpoint detection techniques still in use today were invented at Sophos.",
  },
  {
    type: "h2",
    id: "gen-0",
    text: "Generation 0: 1985, Checksum-Based Antivirus, Born in Oxford",
  },
  {
    type: "p",
    text: "The history of endpoint security begins with a single founding act in 1985. Peter Lammer and Jan Hruska founded Sophos in Abingdon, Oxford, UK, and in that same year created the world's first checksum-based antivirus software.",
  },
  {
    type: "p",
    text: "The technique was elegant. Compute a checksum (a fixed-length hash) of every file on a clean system. Re-compute it later. If the checksum has changed, the file has been modified, possibly by a virus. It cannot tell you what the threat is, but it can tell you something has happened that should not have. The first defensive technology against malicious software on a computer was, in essence, a careful inventory and a comparison.",
  },
  {
    type: "p",
    text: "Two facts about this founding moment matter today. The first is that the entire endpoint security industry, every product on every laptop in every UAE office in 2026, descends from a research project in a single Oxford office. The second is that Sophos has been continuously involved in endpoint security innovation, in one form or another, for every one of the forty years since.",
  },
  {
    type: "h2",
    id: "gen-1",
    text: "Generation 1: 1989, Signature-Based Antivirus",
  },
  {
    type: "p",
    text: "Checksum detection had a structural limit: it could tell you a file had changed, but not whether the change was malicious. A patch and a virus look the same to a checksum. The next step was inevitable.",
  },
  {
    type: "p",
    text: "In 1989, Sophos shipped the world's first signature-based antivirus. The principle: build a database of byte patterns that uniquely identify known viruses. Scan every file. If any byte pattern in the file matches the database, the file is malware. Block it.",
  },
  {
    type: "p",
    text: "Signature scanning defined the antivirus category for the next two decades. It was effective against known threats, simple to operate, and easy for vendors to update, push a new signature file every day, and customers were protected against everything the analysts had catalogued.",
  },
  {
    type: "p",
    text: "But it had a fundamental weakness. By definition, signature scanning could only catch what someone had already seen, analysed, and signed. Zero-day attacks, malware never observed before, passed through cleanly. So did fileless malware that lived in memory. So did polymorphic threats that mutated their byte patterns on every infection. By the late 2000s, the volume of new malware variants had outpaced the human analysts writing signatures, and the industry knew the next generation had to be different.",
  },
  {
    type: "h2",
    id: "gen-2",
    text: "Generation 2: 2012–2017, Next-Generation AV (NGAV)",
  },
  {
    type: "p",
    text: "The answer was to stop looking at what the file is and start looking at what it does. Behavioural analysis, machine learning, and memory scanning replaced pure signature matching as the primary detection strategy.",
  },
  {
    type: "p",
    text: "The pioneers of this generation were vendors like Cylance, Carbon Black, and SentinelOne. Their insight: a malicious file does not need to match a known signature to behave maliciously. If a process spawns a shell, encrypts a sequence of files at high speed, contacts an unknown IP address, and modifies the registry, that is ransomware behaviour, regardless of whether the file's bytes match anything in any database.",
  },
  {
    type: "p",
    text: "NGAV moved the detection logic from the file itself to the runtime activity around it. Machine learning models trained on millions of samples learned to recognise malicious behaviour patterns at near-zero false-positive rates. The endpoint stopped being a passive list of files and became an active observer of what each process was doing.",
  },
  {
    type: "h2",
    id: "gen-3",
    text: "Generation 3: 2017–Present, EDR (Endpoint Detection and Response)",
  },
  {
    type: "p",
    text: "NGAV could detect a threat. But for security teams, knowing that something happened was no longer enough. They needed to know exactly what happened, when, in what order, and what to do about it.",
  },
  {
    type: "p",
    text: "Endpoint Detection and Response (EDR) was the answer. EDR added four capabilities to the NGAV foundation. Full endpoint telemetry recording, every process spawn, file write, registry change, network connection, logged and retained for analyst review. Threat hunting, the ability to query that telemetry across the fleet to find patterns analysts didn't know to look for. Automated response, isolate a compromised endpoint, quarantine a malicious file, kill a process, all without human intervention. And forensic investigation, full reconstruction of what happened on an endpoint before, during, and after an attack.",
  },
  {
    type: "p",
    text: "EDR did to endpoint security what black-box flight recorders did to aviation. The endpoint was no longer just defended; it was instrumented. Every event was captured. Every attack could be reconstructed. Every defensive decision could be reviewed.",
  },
  {
    type: "h2",
    id: "gen-4",
    text: "Generation 4: 2020–Present, XDR (Extended Detection and Response)",
  },
  {
    type: "p",
    text: "EDR solved the visibility problem on the endpoint. But attackers do not stop at the endpoint. A real intrusion crosses email, identity, network, and cloud, often within the same hour. An EDR platform sees the endpoint perfectly and the rest of the kill chain not at all.",
  },
  {
    type: "p",
    text: "XDR, Extended Detection and Response, is the architectural answer. XDR correlates endpoint telemetry with network traffic, email signals, cloud workload events, and identity activity to produce a unified attack narrative across the full kill chain. A phishing email, a credential reuse, a VPN login from an unusual geography, a privilege escalation on a domain controller, and a ransomware deployment on a file server are no longer separate alerts in five different consoles. They are one incident, narrated end-to-end.",
  },
  {
    type: "p",
    text: "For the organisations that deploy it, XDR collapses what used to be hours of manual correlation work into seconds of platform inference. The blind spots between siloed security tools, the place where most successful intrusions actually live, close. We cover XDR delivery in detail under [SIEM, SOAR & MDR services](/cybersecurity/security-operations/siem).",
  },
  {
    type: "h2",
    id: "sophos-arc",
    text: "The Sophos Acquisition Arc, How One Company Spans the Whole Story",
  },
  {
    type: "p",
    text: "There is a thread running through every generation above, and it ends at the same company that started the story. Sophos has remained continuously at the front of the endpoint security industry for forty years, and the way it got there is worth understanding.",
  },
  {
    type: "p",
    text: "The 1985 founding established checksum AV. The 1989 release established signature AV. Then a decades-long sequence of strategic acquisitions extended the platform into every adjacent capability the industry developed.",
  },
  {
    type: "p",
    text: "In 2015, Sophos acquired Surfright (the Dutch company behind HitmanPro, the world-renowned second-opinion malware scanner), and HitmanPro Alert became core to what we now call Sophos Intercept X. In 2017, Sophos acquired Invincea, a pioneer of deep-learning malware detection, and Invincea's neural network technology became the foundation of Intercept X's Deep Learning engine, trained on more than 100 million malware samples.",
  },
  {
    type: "p",
    text: "In February 2025, Sophos completed the USD 859 million acquisition of Secureworks, the Atlanta-based MDR pioneer with 20+ years of SOC expertise, the Taegis next-generation SIEM, and the Counter Threat Unit (CTU) tracking 150+ named threat groups. That acquisition made Sophos the world's largest MDR provider, with 28,000+ organisations protected. It also created what is, today, the most deeply integrated endpoint-to-SIEM pipeline in the industry, Sophos Intercept X telemetry feeding directly into Taegis SIEM/XDR, with CTU intelligence applied to endpoint events automatically.",
  },
  {
    type: "p",
    text: "The pattern is consistent. Every major endpoint security technique that emerged in the last two decades, second-opinion scanning, deep-learning detection, MDR, SIEM-integrated XDR, has been folded into the Sophos platform, in many cases through the acquisition of the company that pioneered it. That is why Artiflex IT recommends [Sophos Intercept X with XDR](/cybersecurity/endpoint-security-edr-xdr) as the strongest endpoint platform for the majority of UAE deployments. The lineage is not a marketing story; it is the actual history of the category.",
  },
  {
    type: "stats",
    items: [
      {
        value: "1985",
        label: "Checksum AV invented",
        sublabel: "Sophos, Oxford",
      },
      {
        value: "1989",
        label: "Signature AV invented",
        sublabel: "Sophos",
      },
      {
        value: "2017",
        label: "EDR generation begins",
        sublabel: "Industry-wide",
      },
      {
        value: "2025",
        label: "Sophos acquires Secureworks",
        sublabel: "World's largest MDR",
      },
    ],
  },
  {
    type: "h2",
    id: "uae-implications",
    text: "What This History Tells UAE Businesses Today",
  },
  {
    type: "p",
    text: "If you are a UAE business making endpoint decisions in 2026, the forty-year arc above is not academic. It tells you four things directly.",
  },
  {
    type: "p",
    text: "The first is that \"antivirus\" and \"endpoint security\" are no longer the same product. A 1985-style checksum AV, a 1989 signature AV, a 2014 NGAV, and a 2025 XDR are all called endpoint security software. They are not equivalent. The vendor conversation should start with which generation of endpoint protection you are actually running today, and whether your threat model justifies the next.",
  },
  {
    type: "p",
    text: "The second is that signatures alone are insufficient. If your endpoint vendor is still relying primarily on signature databases, you are unprotected against zero-days, fileless malware, and most modern ransomware. Behavioural detection, machine learning, and runtime analysis are no longer optional.",
  },
  {
    type: "p",
    text: "The third is that the endpoint is not enough. EDR shows you the endpoint perfectly. Your attacker is not living entirely on the endpoint. XDR, telemetry correlated across email, network, identity, and cloud, is what closes the visibility gaps that single-pillar tools cannot. For UAE businesses with hybrid teams, multi-cloud workloads, and SaaS-first applications, XDR is the only architecture that maps cleanly to the actual attack surface.",
  },
  {
    type: "p",
    text: "The fourth is that vendor heritage matters. The companies that have repeatedly redefined this category, Sophos through forty years, Trend Micro through three decades of ZDI research, CrowdStrike's cloud-native pioneering, SentinelOne's autonomous-AI bet, are the ones likely to redefine it again. When you pick an endpoint vendor, you are also picking who gets to redefine your endpoint stack in 2030.",
  },
  {
    type: "h2",
    id: "where-artiflex",
    text: "Where Artiflex IT Comes In",
  },
  {
    type: "p",
    text: "Artiflex IT has been deploying, managing, and migrating [endpoint security across the UAE, Oman, and Saudi Arabia](/cybersecurity/endpoint-security-edr-xdr) for over 14 years. We are a Platinum Sophos Partner, and we work with CrowdStrike, Microsoft Defender, SentinelOne, Bitdefender, Trend Micro, and Check Point as the use case requires. We do not believe one vendor wins everything, but we do believe the right vendor for your environment usually wins by a meaningful margin once the assessment is done honestly.",
  },
  {
    type: "p",
    text: "If you are still running a signature-based antivirus, an unmanaged EDR your team isn't tuning, or an XDR with telemetry no one is reading, we will tell you exactly where you are exposed and what an honest replacement looks like. No upselling, no theatre.",
  },
  {
    type: "cta",
    title: "Free Endpoint Posture Assessment",
    description: "30-minute review of your current endpoint protection against modern EDR and XDR benchmarks. We will tell you exactly where you are exposed and what a replacement should cost. No commitment.",
    href: "/contact",
    label: "Book Assessment",
  },
];
