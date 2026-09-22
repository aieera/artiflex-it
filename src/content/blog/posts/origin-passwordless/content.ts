import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "The industry knew the password was broken almost from the moment it was invented. Researchers in the 1980s were already publishing on the weaknesses of memorised secrets, and every decade since has produced a wave of confident predictions that the password's end was near. Each prediction was wrong, until it wasn't. The story of passwordless authentication is the story of fifty years of building better solutions that people would not use, followed by a single five-year window in which the missing infrastructure finally arrived and made the old problem genuinely solvable.",
  },
  {
    type: "h2",
    id: "the-problem",
    text: "Security Researchers Tried to Kill the Password for Decades, and Failed",
  },
  {
    type: "p",
    text: "By the early 1980s, security researchers already understood that memorised secrets were a structurally weak authentication factor. The alternatives existed in principle: public-key cryptography had been published by Diffie and Hellman in 1976, biometric authentication research was active in academic labs, and hardware tokens were being explored in classified government settings. What was missing was not the cryptography. It was the deployment infrastructure.",
  },
  {
    type: "p",
    text: "Every alternative to the password ran into the same adoption barrier. It was more work than typing a password, it required additional hardware or software or training, and it was visibly disruptive to the user experience. Smart cards required readers that nobody had on their desks. Early biometric sensors were expensive, unreliable and confined to high-security facilities. One-time password tokens like RSA SecurID worked, but they cost real money per user per year, demanded a synchronisation server, and added a step to every login.",
  },
  {
    type: "p",
    text: "For three decades, the authentication security community was caught in the same trap: solutions that were technically superior but operationally inferior. The password persisted not because anyone defended it on the merits, but because nothing else was deployable at scale on commodity hardware that users already owned. The smartphone, when it arrived, changed everything by quietly closing that gap.",
  },
  {
    type: "quote",
    text: "The smartphone solved the passwordless problem not by being a better authentication device, though it is, but by being a device that everyone already carries, already trusts, and already knows how to use. You don't need to explain to someone how to use Face ID. They already do it twenty times a day to check their messages.",
    cite: "Why the ubiquitous smartphone was the missing infrastructure for passwordless authentication",
  },
  {
    type: "h2",
    id: "fido",
    text: "The FIDO Alliance and the Long Road to WebAuthn",
  },
  {
    type: "p",
    text: "The FIDO Alliance was founded in 2013 by PayPal, Lenovo, Nok Nok Labs, Validity Sensors, Infineon and Agnitio with a deliberately narrow mission: define an open standard for strong authentication that could be implemented across vendors, devices and operating systems. The Alliance grew quickly to include Google, Microsoft, Apple, Amazon, Visa, Mastercard and most major banks. For the first time, a sufficiently broad coalition existed to actually move the entire ecosystem at once.",
  },
  {
    type: "p",
    text: "FIDO published its first standard, U2F, in 2014. U2F defined a simple second factor based on hardware security keys that proved possession of a private key bound to a specific domain, making the resulting authentication phishing-resistant in a way that SMS and TOTP simply could not match. The YubiKey, manufactured by Yubico, became the reference implementation. Google adopted U2F internally for all employees in 2017 and reported zero successful phishing attacks against staff who had been issued keys, an extraordinary result that quietly demolished the case for SMS-based MFA.",
  },
  {
    type: "p",
    text: "In 2018, FIDO2 launched in partnership with the W3C as the WebAuthn standard, which built the same cryptographic model directly into the browser. Passkey authentication became a native browser primitive in Chrome, Firefox, Safari and Edge. The deployment friction collapsed: any website could integrate WebAuthn without asking users to install anything, and any modern device could act as an authenticator using its existing biometric sensor.",
  },
  {
    type: "callout",
    variant: "info",
    title: "2022: The Year Three Companies Changed Authentication Forever",
    text: "In May 2022, Apple, Google, and Microsoft announced joint support for FIDO2 passkeys, the first time the three dominant platform vendors had coordinated around a single security standard simultaneously. Apple brought passkeys to iPhones, iPads, and Macs through iCloud Keychain synchronisation. Google brought them to Android and Chrome. Microsoft brought them to Windows Hello and Edge. Within eighteen months, passkeys were available on virtually every consumer device on the planet. The infrastructure problem that had prevented passwordless adoption for decades was solved overnight by the coordinated launch.",
  },
  {
    type: "h2",
    id: "timeline",
    text: "From the Password's Birth to Its Replacement",
  },
  {
    type: "h3",
    text: "1961, The Password Invented (MIT CTSS)",
  },
  {
    type: "p",
    text: "Fernando Corbato adds the username and password to the Compatible Time-Sharing System at MIT as a way of metering shared compute fairly. The first password file is a flat text file. The mechanism was meant to be temporary scaffolding. It became permanent infrastructure.",
  },
  {
    type: "h3",
    text: "2007, iPhone: The Missing Infrastructure Arrives",
  },
  {
    type: "p",
    text: "Apple ships the iPhone with a capacitive touchscreen and a camera, and over the next decade integrates a fingerprint sensor (Touch ID, 2013), facial recognition (Face ID, 2017), and a secure enclave for cryptographic key storage. The combination quietly assembles every component required for ubiquitous biometric authentication.",
  },
  {
    type: "h3",
    text: "2013, FIDO Alliance Founded",
  },
  {
    type: "p",
    text: "PayPal, Lenovo, Nok Nok Labs, Validity Sensors, Infineon and Agnitio launch the FIDO Alliance with a remit to define open, interoperable, phishing-resistant authentication. Within five years the membership includes every platform vendor that matters.",
  },
  {
    type: "h3",
    text: "2014, FIDO U2F, Hardware Key Second Factor",
  },
  {
    type: "p",
    text: "FIDO publishes the U2F specification. YubiKeys reach mass production. Google deploys U2F internally and proves at the scale of tens of thousands of employees that phishing-resistant hardware authentication eliminates account compromise in practice.",
  },
  {
    type: "h3",
    text: "2018, WebAuthn W3C Standard Published",
  },
  {
    type: "p",
    text: "FIDO2 and WebAuthn become an official W3C web standard. Browsers begin shipping native support. The technical barrier to passwordless on the open web finally falls.",
  },
  {
    type: "h3",
    text: "2021, Microsoft Goes Passwordless",
  },
  {
    type: "p",
    text: "Microsoft announces that consumer accounts can be removed from password authentication entirely, with Windows Hello, the Microsoft Authenticator app, FIDO2 keys and emailed codes covering every use case. The first major identity provider commits publicly to a passwordless-by-default future.",
  },
  {
    type: "h3",
    text: "2022, Apple + Google + Microsoft, Joint Passkey Launch",
  },
  {
    type: "p",
    text: "On 5 May 2022, the three dominant platform vendors jointly announce coordinated support for cross-platform passkeys synchronised through their respective cloud accounts. The single largest authentication transition in computing history begins.",
  },
  {
    type: "h3",
    text: "Today, Passkeys Replace Passwords in Practice",
  },
  {
    type: "p",
    text: "In 2026, passkeys are available on every major consumer platform and supported by an expanding list of enterprise identity providers including Microsoft Entra ID, Okta, Ping Identity and JumpCloud. The transition is real, ongoing, and finally irreversible.",
  },
  {
    type: "quote",
    text: "Corbato apologised for the password in his last interviews. He created it as a temporary solution and watched it become the permanent foundation of digital security. The passkey is the apology made concrete, everything the password should have been, sixty years later.",
    cite: "The long arc from 1961 to today",
  },
];
