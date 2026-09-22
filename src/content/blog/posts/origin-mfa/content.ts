import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "In 1986, RSA Security shipped a small hardware device that generated a new number every 60 seconds. It was expensive, inconvenient, and slightly mysterious. It was also the beginning of the end for the password as a sufficient proof of identity.",
  },
  {
    type: "h2",
    id: "the-insight",
    text: "Security Researchers Knew the Password Was Broken Long Before Everyone Else Did",
  },
  {
    type: "p",
    text: "A password is a shared secret. Anything a human can remember, a human can also write down, repeat to another person, or be tricked into typing into the wrong screen. The cryptographers and operating system researchers who built the first multi-user systems in the 1960s already understood this. Humans are not reliable secret keepers, and any security model that depends on them remaining so is structurally fragile.",
  },
  {
    type: "p",
    text: "The theoretical answer had been understood since the 1960s. Combine something the user knows (a password) with something the user has (a physical object) or something the user is (a biometric). If an attacker steals one factor, they still need the other. Two factors are exponentially harder to compromise than one, because the attacker needs two independent attack paths to succeed.",
  },
  {
    type: "p",
    text: "The implementation challenge was getting the second factor into the hands of millions of users in a form that was small, cheap, secure, and reasonably usable. The first organisation to solve this commercially was RSA Security, founded in 1982 by the inventors of the RSA public-key cryptosystem. In 1986, they shipped the SecurID token.",
  },
  {
    type: "h2",
    id: "hardware-era",
    text: "The Fob That Launched the MFA Category",
  },
  {
    type: "p",
    text: "The original SecurID was a black plastic key fob with a small LCD that displayed a six-digit number. Every 60 seconds, the number changed. Inside the fob was a tamper-resistant chip running a proprietary algorithm seeded with a unique cryptographic key. A matching server, configured with the same seed, could compute what number the fob should be displaying at any given moment. To log in, a user typed their password and then the current six digits from the fob. Stealing the password no longer mattered if you did not also have the fob in your pocket.",
  },
  {
    type: "p",
    text: "SecurID was adopted aggressively by banks, government agencies, defence contractors and large enterprises throughout the 1990s and 2000s. It was the gold standard for remote access authentication, especially over VPN. The administrative burden was significant (provisioning, distributing, replacing lost or broken tokens) but the security gain was real. For two decades, SecurID was the synonym for MFA.",
  },
  {
    type: "p",
    text: "In 2011, RSA disclosed a breach in which attackers had stolen the seed values for a large number of SecurID tokens. The attack appears to have been used to target Lockheed Martin shortly afterwards. The episode shook confidence in hardware tokens that relied on shared seeds stored on a central server, and accelerated the industry's shift toward software-based MFA that did not depend on a vendor's seed database.",
  },
  {
    type: "callout",
    variant: "info",
    title: "The SMS OTP Detour, Convenient, Broken, and Still Everywhere",
    text: "As mobile phones became ubiquitous in the mid-2000s, the industry embraced SMS one-time passwords as a way to deliver MFA without hardware tokens. The security was negligible, as it turned out. SMS travels over the SS7 telephone network, which has well-known vulnerabilities that allow sophisticated attackers to intercept messages. SIM swapping became a profitable crime. NIST deprecated SMS as an MFA mechanism in its 2016 Digital Identity Guidelines. It remains in widespread use today despite these known weaknesses.",
  },
  {
    type: "h2",
    id: "app-revolution",
    text: "Google Authenticator Put MFA in Everyone's Pocket",
  },
  {
    type: "p",
    text: "In 2010, Google released the Google Authenticator app, a free implementation of the Time-Based One-Time Password (TOTP) algorithm standardised as RFC 6238 the following year. TOTP did the same thing SecurID did, but in software, on any smartphone, with an open standard that any service could adopt. Within a few years, TOTP apps were available from Microsoft, Authy, Duo, 1Password and dozens of other vendors. The cost of MFA collapsed from tens of dollars per user per year to effectively zero.",
  },
  {
    type: "p",
    text: "The next leap was Duo Security, founded in Ann Arbor in 2010 by Dug Song and Jon Oberheide. Duo introduced push-based MFA: instead of typing a six-digit code, the user simply tapped Approve on a notification sent to their phone. The user experience was so dramatically better that Duo became the fastest-growing identity company of the 2010s, and was acquired by Cisco in 2018 for 2.35 billion dollars. By the mid-2010s, push MFA had become the default expectation for new deployments.",
  },
  {
    type: "p",
    text: "By 2015, MFA had moved into the mainstream of enterprise security. The remaining challenge was adoption: convincing users to enable it, and configuring policies that prompted for the second factor in the right moments without disrupting normal workflows. That challenge would consume the next phase of the industry.",
  },
  {
    type: "h2",
    id: "timeline",
    text: "Four Decades of Stronger Second Factors",
  },
  {
    type: "h3",
    text: "1986, RSA SecurID Launches",
  },
  {
    type: "p",
    text: "RSA Security ships the SecurID hardware token, the first commercially successful second factor. Six digits, sixty seconds, one fob per user. The MFA category is born.",
  },
  {
    type: "h3",
    text: "2005, SMS OTP Goes Mainstream",
  },
  {
    type: "p",
    text: "Banks and consumer services begin sending one-time codes by SMS. Convenient, cheap, and as the SS7 vulnerabilities will later show, fundamentally insecure.",
  },
  {
    type: "h3",
    text: "2010, Google Authenticator and TOTP",
  },
  {
    type: "p",
    text: "Google releases its free Authenticator app, implementing the open TOTP standard. MFA becomes a software feature on a smartphone instead of a physical device, and the economics shift permanently.",
  },
  {
    type: "h3",
    text: "2011, RSA SecurID Breach",
  },
  {
    type: "p",
    text: "Attackers compromise RSA's seed database and use the data in follow-on attacks against defence contractors. The incident accelerates the move away from vendor-held seed material.",
  },
  {
    type: "h3",
    text: "2012, Duo Security, Push MFA",
  },
  {
    type: "p",
    text: "Duo popularises push-based authentication: a single tap on a phone notification approves the login. The user experience improvement drives mass adoption across mid-market and enterprise.",
  },
  {
    type: "h3",
    text: "2013, FIDO Alliance Founded",
  },
  {
    type: "p",
    text: "PayPal, Lenovo and others form the FIDO Alliance to standardise hardware-backed, phishing-resistant authentication. The work that becomes U2F, FIDO2 and WebAuthn begins here.",
  },
  {
    type: "h3",
    text: "2016, NIST Deprecates SMS OTP",
  },
  {
    type: "p",
    text: "NIST's Digital Identity Guidelines (SP 800-63-3) formally discourage SMS as an authentication channel for new systems. Most organisations continue to use it anyway.",
  },
  {
    type: "h3",
    text: "2018, WebAuthn Standard Published",
  },
  {
    type: "p",
    text: "The W3C publishes WebAuthn, the browser-side API for FIDO2 authentication. Phishing-resistant MFA, bound cryptographically to the legitimate domain, becomes available in every major browser.",
  },
  {
    type: "h3",
    text: "2022, Uber MFA Fatigue Attack",
  },
  {
    type: "p",
    text: "An attacker compromises an Uber contractor and bombards them with push notifications until one is approved out of exhaustion. The incident proves that push MFA without number matching is no longer sufficient against motivated attackers, and accelerates the move to phishing-resistant factors.",
  },
  {
    type: "h3",
    text: "Today, Phishing-Resistant MFA as Standard",
  },
  {
    type: "p",
    text: "FIDO2 hardware keys, platform passkeys synced via Apple, Google and Microsoft accounts, and certificate-based authentication via Windows Hello for Business are now the recommended MFA categories. NESA, NCA ECC and modern cyber insurance carriers increasingly require phishing-resistant MFA for privileged accounts.",
  },
  {
    type: "quote",
    text: "Every major advance in MFA came from a major attack proving that the previous solution was insufficient. RSA tokens followed the password era. TOTP followed the SMS era. Phishing-resistant FIDO2 followed the push notification era. Security always advances one breach at a time.",
    cite: "The pattern of MFA's forty-year evolution",
  },
];
