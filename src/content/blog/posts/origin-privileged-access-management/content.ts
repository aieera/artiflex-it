import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "In 1999, two founders in Tel Aviv named Alon Cohen and Udi Mokady looked at how enterprise IT actually worked and noticed something nobody seemed to be talking about. The root password for the production database server lived in a spreadsheet. The administrator account for the firewall lived in another spreadsheet. The local admin password for every desktop in the company was the same word, and that word had been chosen in 1996 and never changed. The Domain Admin credential was shared between five people and rotated whenever someone left, except when nobody remembered to rotate it.",
  },
  {
    type: "p",
    text: "Privileged accounts were the keys to the kingdom of every enterprise on Earth, and they were being managed like office stationery. There was no central control. There was no audit trail of who had used them. There was no rotation. There was no visibility. The first person to walk in with a USB stick and the spreadsheet password could own the entire company in an afternoon.",
  },
  {
    type: "p",
    text: "Cohen and Mokady founded Cyber-Ark to solve that. Twenty-six years later, the discipline they invented (Privileged Access Management) is the single highest-leverage security control in the modern enterprise, the one capability whose presence or absence most reliably predicts whether a ransomware attack stops at the entry point or burns the entire estate. This is how PAM actually evolved, in five distinct phases, each fixing what the previous era could not.",
  },
  {
    type: "callout",
    variant: "info",
    title: "Why this history matters in 2026",
    text: "Most major ransomware incidents in the GCC and globally over the past five years have shared a common architectural failure: privileged credentials with broad blast radius were obtainable, reusable and never rotated. PAM is not an esoteric niche. It is the single control most likely to convert a successful intrusion into a contained one.",
  },
  {
    type: "h2",
    id: "phase-1",
    text: "Phase 1 (Pre-1999): The Shared Password Era",
  },
  {
    type: "p",
    text: "Before PAM existed as a category, the management of privileged credentials in most enterprises was a documentation problem masquerading as a security problem. The Unix root password, the Windows Administrator password, the database SA password and the network device enable password were typically stored in one of three places: in a printed binder in the server room (sometimes locked, often not), in an encrypted spreadsheet on a file share that everyone in IT could access, or in the head of one or two senior engineers who became single points of failure.",
  },
  {
    type: "p",
    text: "Sudo, released in 1980 by Bob Coggeshall and Cliff Spencer at SUNY Buffalo, was the first attempt to soften the problem. Sudo allowed administrators to grant specific commands to specific users without giving them the root password, and it logged every elevation. By the late 1990s, sudo was deployed in most serious Unix shops. But sudo only addressed Unix. The Windows world had no equivalent, network devices had nothing remotely like it, and even on Unix, the underlying root password still existed and was still shared, used in emergencies, and rarely rotated.",
  },
  {
    type: "p",
    text: "The compliance pressure was beginning to build. Sarbanes-Oxley (2002), PCI-DSS (2004) and HIPAA enforcement all required, in different language, that organisations be able to prove who had used a privileged credential and when. With shared, unrotated, undocumented credentials, that was structurally impossible. The market needed a real answer.",
  },
  {
    type: "h2",
    id: "phase-2",
    text: "Phase 2 (1999-2008): Cyber-Ark and the Birth of the Password Vault",
  },
  {
    type: "p",
    text: "Cyber-Ark Software was founded in 1999 in Petah Tikva, Israel, by Alon Cohen and Udi Mokady. The product they shipped (the Cyber-Ark Privileged Access Security solution, with the Digital Vault at its core) introduced the foundational PAM primitives that every successor product has implemented since. A central, cryptographically protected vault stored every privileged credential. Credentials were checked out to authorised users on demand, automatically rotated after use, and every check-out was logged with a session recording for forensic review.",
  },
  {
    type: "p",
    text: "The architectural insight was that the privileged credential should never live on the user's laptop, in a spreadsheet, or in anyone's head. It should live in the vault, be retrieved only at the moment of use, and be rotated immediately afterwards so that even if it was captured in transit, it would already be invalidated by the time an attacker tried to reuse it.",
  },
  {
    type: "p",
    text: "Cyber-Ark grew through the 2000s into the dominant pure-play PAM vendor on the planet, eventually rebranding as CyberArk and going public on NASDAQ in 2014. By the late 2000s, the category had grown enough to attract competitors. Cloakware (founded 1997, acquired by Irdeto and later spun out as Arcot/Symantec) and BeyondTrust (founded 1985, originally a Unix privilege management vendor) developed competing platforms. e-DMZ Security (founded 2003, acquired by Quest Software in 2012) and Lieberman Software added their own offerings. The category was real, growing, and increasingly recognised as a Tier-1 security control.",
  },
  {
    type: "h2",
    id: "phase-3",
    text: "Phase 3 (2010-2018): Session Recording, Endpoint Privilege Management and the Consolidation Wave",
  },
  {
    type: "p",
    text: "The 2010s expanded PAM beyond credential vaulting into the broader management of every privileged action across the enterprise. Three sub-categories emerged.",
  },
  {
    type: "p",
    text: "Privileged Session Management (PSM) recorded every administrative session as it happened. When an engineer checked out the root credential for a database server, the PSM platform proxied the session through a secure jump host and recorded the entire interaction (keystrokes, screen activity, command output) for later forensic review. Compliance auditors loved it. Insurance underwriters started requiring it. By 2015, PSM was a standard expectation for any serious PAM deployment.",
  },
  {
    type: "p",
    text: "Endpoint Privilege Management (EPM) addressed the workstation problem. Most enterprises had granted local admin rights to employees in the early 2000s as a productivity workaround. By 2015, those local admin rights were the most common initial-access vector in ransomware attacks. EPM platforms (BeyondTrust Privilege Management for Windows, CyberArk Endpoint Privilege Manager, Thycotic Privilege Manager) removed standing local admin rights and instead allowed individual applications to be elevated on demand, audited centrally and policy-controlled.",
  },
  {
    type: "p",
    text: "The third sub-category was Privileged Identity Management for cloud and DevOps. As cloud workloads exploded, the AWS root account, the Azure subscription owner and the Kubernetes cluster admin became the new crown jewels. PAM vendors extended their vaults to cover cloud IAM credentials, API keys, SSH keys and CI/CD secrets. HashiCorp Vault, released in 2015, took a developer-first approach to the same problem and quickly became the standard secrets-management primitive for application code.",
  },
  {
    type: "p",
    text: "Vendor consolidation defined the back half of the decade. Quest Software acquired e-DMZ in 2012 and was itself spun off as One Identity in 2016. BeyondTrust acquired Avecto in 2018, consolidating the leading EPM product into its broader PAM suite. CyberArk acquired Vaultive in 2018 and Idaptive in 2020 (later spun back out as part of CyberArk Identity). Thycotic and Centrify, two long-standing PAM specialists, merged in 2021 to form Delinea, immediately becoming the largest pure-play PAM vendor by customer count after CyberArk.",
  },
  {
    type: "h2",
    id: "phase-4",
    text: "Phase 4 (2018-2023): Just-in-Time Access and Zero Standing Privilege",
  },
  {
    type: "p",
    text: "By 2018, even fully-vaulted privileged credentials presented an attack surface. Once a user had checked a credential out of the vault, that credential was active and could be used (or stolen) for the duration of its check-out window. The most aggressive attackers had begun targeting the moment of check-out, capturing the credential through endpoint compromise or session-hijacking and using it within minutes to escalate.",
  },
  {
    type: "p",
    text: "The architectural answer was Just-in-Time (JIT) access. Instead of granting standing privileges to a user account that the attacker could later steal, JIT systems granted privileges only at the moment they were needed, and revoked them automatically when the task was complete. Microsoft's Privileged Identity Management (PIM) for Azure AD/Entra ID, launched in 2017, made JIT mainstream by allowing administrators to elevate to a privileged role for a defined window with approval workflow and MFA. CyberArk Cloud Entitlements Manager and BeyondTrust Cloud Privilege Broker followed for cloud IAM elevation.",
  },
  {
    type: "p",
    text: "The next conceptual step is Zero Standing Privilege (ZSP). Under ZSP, no human account holds any persistent administrative entitlement at all. Every privileged action requires a fresh, time-bounded, approved elevation. The user is permanently a regular user; privilege is something they request, not something they are. Combined with credential-less authentication (certificate-based or SPIFFE-style workload identity), ZSP eliminates the standing-credential blast radius that ransomware operators have been monetising for the past decade.",
  },
  {
    type: "h2",
    id: "phase-5",
    text: "Phase 5 (2023 onwards): Identity-First PAM and Cloud-Native Convergence",
  },
  {
    type: "p",
    text: "The most recent shift is the convergence of PAM with the broader identity stack. Microsoft's strategy is illustrative: Entra ID Governance, Entra Privileged Identity Management, Entra Permissions Management (for cloud entitlement management) and Conditional Access now operate as a single policy engine that decides who can hold which privilege under which conditions for how long. CyberArk has moved decisively into the identity-security platform space with its acquisition of Venafi (machine identity, 2024) and its Identity Security Platform vision. Okta, SailPoint and Saviynt have all extended into the privileged-access space.",
  },
  {
    type: "p",
    text: "The 2026 state of the art combines: a centralised PAM vault for human privileged credentials (CyberArk PAS, Delinea Secret Server, BeyondTrust Password Safe, One Identity Safeguard); endpoint privilege management on every workstation (BeyondTrust Privilege Management, CyberArk EPM, Delinea Privilege Manager); session recording and proxy enforcement on every administrative session; just-in-time elevation through Microsoft Entra PIM for cloud and conditional access integration; secrets management for application and CI/CD credentials (HashiCorp Vault, CyberArk Conjur, AWS Secrets Manager, Azure Key Vault); and cloud entitlement management (CyberArk CEM, Microsoft Entra Permissions, Sonrai, Saviynt) for over-permissioned cloud roles.",
  },
  {
    type: "stats",
    items: [
      {
        value: "1999",
        label: "Cyber-Ark founded",
        sublabel: "Tel Aviv; first password vault",
      },
      {
        value: "2014",
        label: "CyberArk IPO",
        sublabel: "Category goes public",
      },
      {
        value: "2017",
        label: "Microsoft PIM launches",
        sublabel: "JIT goes mainstream",
      },
      {
        value: "2021",
        label: "Delinea formed",
        sublabel: "Thycotic + Centrify merger",
      },
      {
        value: "2024+",
        label: "ZSP becomes operating model",
        sublabel: "Zero Standing Privilege",
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
    text: "If you are running, scaling or replacing PAM capability in 2026, the five-phase arc above is not academic. Three things follow directly.",
  },
  {
    type: "p",
    text: "The first is that PAM is the highest-ROI security investment most UAE organisations are not making. The cost of a mid-sized CyberArk, Delinea, BeyondTrust or One Identity deployment is a small fraction of the cost of a single ransomware incident, and the most consistent failure mode of recent ransomware incidents has been precisely the absence of a working PAM programme. Insurance underwriters now ask about PAM coverage before renewing cyber policies. Regulators (NESA, NCA ECC, ADHICS, SAMA) reference privileged access controls explicitly.",
  },
  {
    type: "p",
    text: "The second is that local admin rights on workstations remain the single most common initial-access foothold in the GCC ransomware incidents we have triaged. Removing standing local admin and replacing it with EPM-controlled, application-specific elevation is one of the highest-leverage controls a UAE business can deploy, and it can be done independently of a full PAM rollout if budget is constrained.",
  },
  {
    type: "p",
    text: "The third is that the cloud privilege problem is now larger than the on-premise privilege problem. AWS IAM, Azure RBAC and GCP IAM permissions sprawl into thousands of unique entitlements per cloud tenant, the vast majority of which are over-permissioned. PAM that covers only Active Directory and Linux roots, while the cloud subscription owner sits unmanaged, is solving 2014's problem and ignoring 2026's.",
  },
  {
    type: "h2",
    id: "where-artiflex",
    text: "Where Artiflex IT Comes In",
  },
  {
    type: "p",
    text: "Artiflex IT designs, deploys and operates [Privileged Access Management programmes](/cybersecurity/privileged-access-management) across the UAE, Oman and Saudi Arabia. We deliver CyberArk, Delinea (formerly Thycotic and Centrify), BeyondTrust and One Identity Safeguard as the primary PAM platforms, integrated with Microsoft Entra PIM and Conditional Access for cloud privilege elevation, and connected through ServiceNow or in-house ITSM for approval workflow. We start with a privileged-account discovery exercise (because no vault protects an account you have not enumerated) and then scope a phased rollout that prioritises the accounts with the largest blast radius first.",
  },
  {
    type: "p",
    text: "If your domain admins still log in interactively, your local workstation admins are standing rights, your service accounts have not been rotated since they were created, or your cloud root accounts are not under MFA-enforced JIT elevation, we will tell you exactly where you are exposed and what an honest re-design looks like. No upselling, no theatre.",
  },
  {
    type: "cta",
    title: "Talk to our Consultant",
    description: "30-minute review of your current privileged account inventory, vault coverage, session recording, EPM deployment and cloud entitlement posture. We will surface the three highest-impact gaps to fix first, with no commitment.",
    href: "/contact",
    label: "Book Consultation",
  },
];
