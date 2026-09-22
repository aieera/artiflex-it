import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "In 1961, a computer scientist named Fernando Corbato at the MIT Computation Center had a problem. The Compatible Time-Sharing System (CTSS) he had designed allowed multiple researchers to share a single IBM 7094 mainframe at the same time. Each researcher was allocated a few hours of compute time per week. The honour system did not work; some researchers used more than their share, others used less. To enforce fair scheduling, Corbato added a feature: each user logged in with a username and a private password. The password proved you were who you said you were, so the system could meter your time correctly.",
  },
  {
    type: "p",
    text: "That feature, invented for scheduling fairness on a single shared mainframe, became the longest-lived primitive in computing history. Sixty-five years later, the username and password are still the most widely used authentication mechanism on Earth, and they are also the single largest source of cybersecurity incidents. Almost every modern attack on an enterprise eventually involves a credential, and almost every defensive architecture eventually has to wrestle with how to make that credential less catastrophic when it is stolen.",
  },
  {
    type: "p",
    text: "The discipline that grew up around that wrestle is Identity and Access Management. It took six decades to evolve from \"a password file on a mainframe\" into the passwordless, conditional, Zero Trust identity control plane that protects modern UAE enterprises. The path unfolded in five distinct phases.",
  },
  {
    type: "callout",
    variant: "info",
    title: "Why this history matters in 2026",
    text: "\"Identity\" in 2026 means at least three different things: who an entity is (authentication), what they can do (authorisation), and how those decisions are governed (lifecycle and audit). Knowing which generation of IAM you are running, and which of those three the gaps are in, is the fastest way to evaluate whether your current programme can carry you into a Zero Trust posture.",
  },
  {
    type: "h2",
    id: "phase-1",
    text: "Phase 1 (1961-1990): The Mainframe Era and the Birth of Access Control",
  },
  {
    type: "p",
    text: "The first three decades of identity were defined by the mainframe. After the CTSS password file, IBM productised access control as RACF (Resource Access Control Facility) in 1976. Computer Associates shipped ACF2 the same year. CA-Top Secret followed shortly after. By the mid-1980s, every serious mainframe shop ran one of the three. They handled three things that are still core to IAM today: authentication (proving you are who you claim), authorisation (deciding what you can access) and audit (logging what you actually did).",
  },
  {
    type: "p",
    text: "RACF in particular was architecturally remarkable. It centralised access control decisions for every dataset, transaction and program on a mainframe behind a single rule engine. Forty-five years later, modern IAM platforms still re-implement the same three primitives RACF first commercialised. The mainframe security teams of the 1980s were doing centralised, policy-driven access control before the rest of computing had even invented the personal computer.",
  },
  {
    type: "p",
    text: "The PC and Unix revolutions of the 1980s broke that centralisation. Each Unix system had its own /etc/passwd file, each PC had its own local login, and Novell NetWare introduced its own NDS directory in 1993. Identity was suddenly per-machine, per-application and per-network. The wave of integrations needed to glue them back together would dominate the 1990s.",
  },
  {
    type: "h2",
    id: "phase-2",
    text: "Phase 2 (1993-2005): LDAP, Active Directory and the Directory Era",
  },
  {
    type: "p",
    text: "The first attempt at unification was the X.500 directory standard, an enormous specification published by the ITU in 1988 that proved too complex to deploy. In 1993, a team at the University of Michigan led by Tim Howes, Mark Smith and Steve Kille released LDAP (the Lightweight Directory Access Protocol) as a simplified subset of X.500 that worked over TCP/IP. LDAP was elegant, language-neutral and quickly became the backbone of every directory service that followed.",
  },
  {
    type: "p",
    text: "In 1999, Microsoft shipped Windows 2000 with Active Directory, an LDAP-and-Kerberos-based directory service designed to replace Windows NT's domain model. Active Directory was the first directory service to combine identity, authentication, authorisation, group policy and DNS into a single integrated package, and to make all of it administrable through a clickable Windows console. By 2005, Active Directory was running every authentication decision in the majority of enterprise networks on the planet, a position it largely retains today.",
  },
  {
    type: "p",
    text: "Single Sign-On as a category emerged in parallel. Kerberos, developed at MIT in the late 1980s and standardised in 1993, provided the cryptographic primitive: a ticket-based authentication protocol that allowed a user to prove their identity once to a Key Distribution Center and then access multiple services without re-entering credentials. Kerberos was the SSO under the hood of Active Directory. For non-Windows applications, vendors like Computer Associates (eTrust SiteMinder, 1997), Oblix and IBM Tivoli Access Manager built web-SSO products that gave the same single-sign-on experience for web applications. The era of typing a different password for every system was supposed to be over.",
  },
  {
    type: "h2",
    id: "phase-3",
    text: "Phase 3 (2002-2014): Federation, SAML and the SaaS Identity Crisis",
  },
  {
    type: "p",
    text: "By 2002, a new problem had emerged. Enterprises were increasingly buying applications from third parties (early SaaS, hosted email, business-partner portals) and the Active Directory domain that authenticated their employees had no native way to prove anything about those employees to an outside system. The answer was federation. Federation moved the trust relationship from the network boundary to a cryptographically signed assertion: the employer's identity provider would sign a statement saying \"this is Alice, she works for us\", and the third-party application would trust the signature.",
  },
  {
    type: "p",
    text: "The technical standard that made federation real was SAML (Security Assertion Markup Language). SAML 1.0 was ratified by OASIS in November 2002. SAML 2.0, the version still in widespread use today, was finalised in March 2005. The Liberty Alliance, an industry consortium founded in 2001 and dissolved in 2009, drove much of the early federation work. By 2010, SAML was the de facto standard for enterprise SSO into SaaS applications, and remains so for many on-premise products in 2026.",
  },
  {
    type: "p",
    text: "The SaaS-native answer came from a different direction. OAuth 1.0 was published as an IETF specification in April 2010 and OAuth 2.0 followed in October 2012. OAuth was simpler than SAML, designed for mobile and API authorisation flows rather than enterprise SSO. OpenID Connect (OIDC), released in February 2014, layered identity on top of OAuth 2.0 and gave the modern SaaS world its default identity protocol. SAML for enterprise applications, OIDC for mobile and SaaS-native, became the dual standard.",
  },
  {
    type: "p",
    text: "The vendor that defined this era was Okta, founded in 2009 in San Francisco by Todd McKinnon (ex-Salesforce) and Frederic Kerrest. Okta sold a cloud identity provider that connected to Active Directory on one side and to thousands of SaaS applications on the other through pre-built SAML and OIDC connectors. By 2014, Okta had become the default identity layer for cloud-first enterprises that did not want to deploy and maintain their own ADFS federation server. Ping Identity (founded 2002) and OneLogin (founded 2009) competed in the same space. Microsoft's response was Azure Active Directory (released 2010, rebranded Microsoft Entra ID in 2023), which has since grown into the largest enterprise identity provider on the planet.",
  },
  {
    type: "h2",
    id: "phase-4",
    text: "Phase 4 (2015-2022): MFA, Conditional Access and Phishing-Resistant Authentication",
  },
  {
    type: "p",
    text: "Throughout the federation era, the password was still the universal authentication factor. MFA existed (RSA SecurID launched in 1986) but was largely confined to remote access VPN logins and high-privilege accounts. By 2015, that was no longer adequate. Phishing, credential stuffing and password reuse had made stolen credentials the entry point in nearly every major breach.",
  },
  {
    type: "p",
    text: "The MFA category went through three rapid generations. First, SMS-based one-time passwords, which proved trivially defeatable through SIM swapping by 2017. Second, time-based OTP apps (Google Authenticator, Microsoft Authenticator, Duo Mobile) which were considerably stronger but still phishable through real-time relay attacks. Third, push-based MFA with number matching and FIDO2 hardware keys (YubiKey, Microsoft Authenticator passkeys, Apple and Google passkeys) which provide phishing-resistant authentication by binding cryptographic keys to the legitimate domain.",
  },
  {
    type: "p",
    text: "Conditional Access emerged at the same time as the policy layer that decided when and how to apply MFA. Microsoft Entra Conditional Access, Okta Adaptive Authentication, Duo Risk-Based Authentication and Ping Risk Engine all evaluate signals (user, device, location, sign-in risk, application sensitivity) at every authentication and grant, deny or step up the challenge accordingly. The user no longer authenticates once a day; they are continuously evaluated. This is the architectural shift Forrester named Zero Trust, and that NIST formalised in SP 800-207 in August 2020.",
  },
  {
    type: "h2",
    id: "phase-5",
    text: "Phase 5 (2022 onwards): The Passwordless Era",
  },
  {
    type: "p",
    text: "The most recent phase is the elimination of the password itself. The FIDO Alliance, formed in 2013, published FIDO2 in 2018 as a standard for hardware-backed, phishing-resistant passwordless authentication. In May 2022, Apple, Google and Microsoft jointly announced support for cross-platform passkeys, syncable FIDO2 credentials that move between a user's devices through their cloud account. By 2024, passkeys were available in every major operating system, browser and consumer service.",
  },
  {
    type: "p",
    text: "For enterprise IAM, the practical implication is profound. With passkeys and Windows Hello for Business, an organisation can deploy a workforce in which no human ever types a password. Authentication is bound to the device, protected by biometrics, signed cryptographically against the legitimate destination, and immune to phishing. Microsoft has publicly committed to passwordless-by-default for Entra ID, and Okta, Ping and the rest have followed.",
  },
  {
    type: "p",
    text: "The 2026 state of the art, in short, is: a cloud-hosted identity provider (Microsoft Entra ID, Okta, Ping Identity, JumpCloud, Auth0/Okta CIC) that synchronises with on-premise Active Directory where it still exists; passwordless or phishing-resistant MFA enforced for every user and every application; conditional access policies that evaluate device posture, location, risk and application sensitivity at every sign-in; integration with Privileged Access Management for elevated accounts; and full lifecycle governance through IGA. We cover the governance side under [Identity Governance & Administration (IGA)](/blog/origin-identity-governance-administration) and the privileged side under [Privileged Access Management (PAM)](/blog/origin-privileged-access-management).",
  },
  {
    type: "stats",
    items: [
      {
        value: "1961",
        label: "Password invented",
        sublabel: "MIT CTSS, Fernando Corbato",
      },
      {
        value: "1993",
        label: "LDAP standardised",
        sublabel: "University of Michigan",
      },
      {
        value: "1999",
        label: "Active Directory ships",
        sublabel: "Windows 2000",
      },
      {
        value: "2014",
        label: "OIDC released",
        sublabel: "Modern SaaS identity",
      },
      {
        value: "2022",
        label: "Passkeys announced",
        sublabel: "Apple, Google, Microsoft",
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
    text: "If you are running, scaling or replacing identity capability in 2026, the five-phase arc above is not academic. Three things follow directly.",
  },
  {
    type: "p",
    text: "The first is that identity is now the perimeter. Firewalls still matter for network segmentation, but the front door of every modern attack is a stolen or phished credential. NESA, NCA ECC and ADHICS all now require strong authentication, conditional access and lifecycle governance as baseline controls. An identity programme designed in 2015 is no longer adequate to a 2026 threat model or compliance regime.",
  },
  {
    type: "p",
    text: "The second is that MFA is no longer one thing. SMS OTP is broken. TOTP apps are weakened by real-time phishing kits. Phishing-resistant authentication (FIDO2 hardware keys, passkeys, certificate-based authentication, Windows Hello for Business) is the only MFA category that defeats Adversary-in-the-Middle attacks like Evilginx, EvilProxy and Tycoon, which are now the dominant phishing toolkits. If your MFA is SMS or basic OTP, you are protected against 2018 attackers and exposed to 2026 ones.",
  },
  {
    type: "p",
    text: "The third is that identity is no longer separable from device, network and data. Modern conditional access evaluates device compliance (is this a managed, patched, EDR-protected device?), session signals (sign-in risk, geo-velocity, anonymising IP), application sensitivity, and data classification at the same authentication decision. The era of \"the IAM team\" running in isolation from the endpoint and SOC teams is over. The architecture is integrated whether the org chart is or not.",
  },
  {
    type: "h2",
    id: "where-artiflex",
    text: "Where Artiflex IT Comes In",
  },
  {
    type: "p",
    text: "Artiflex IT designs, deploys and operates [Identity & Access Security programmes](/cybersecurity/identity-access-security) across the UAE, Oman and Saudi Arabia. We deliver Microsoft Entra ID with Conditional Access and Entra ID Governance as the recommended platform for most environments, alongside Okta Workforce Identity, Ping Identity, OneLogin, JumpCloud and Auth0 by Okta where the use case justifies a different fit. We integrate with Active Directory hybrid environments, deploy phishing-resistant MFA, design conditional access policy frameworks, and connect identity into the broader [PAM](/cybersecurity/identity-access-security/pam), [IGA](/cybersecurity/identity-access-security/iga) and SASE stack.",
  },
  {
    type: "p",
    text: "If your MFA is SMS, your conditional access is permissive, you have no break-glass account hygiene, or your IDP synchronises but does not govern, we will tell you exactly where you are exposed and what an honest re-design looks like. No upselling, no theatre.",
  },
  {
    type: "cta",
    title: "Talk to our Consultant",
    description: "30-minute review of your current IAM platform, MFA posture, conditional access policies and lifecycle governance against modern Zero Trust benchmarks. We will surface the three highest-impact gaps to fix first, with no commitment.",
    href: "/contact",
    label: "Book Consultation",
  },
];
