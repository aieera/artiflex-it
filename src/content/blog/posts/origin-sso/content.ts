import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "In the early 1990s, employees carried ring binders full of passwords. Then the web arrived and made it worse. This is the story of how the industry invented a way to log in once and open everything.",
  },
  {
    type: "h2",
    id: "the-problem",
    text: "Every Network Had Its Own Lock. Nobody Had Enough Keys.",
  },
  {
    type: "p",
    text: "Before SSO existed, every system kept its own list of users. Unix machines had /etc/passwd. Mainframes had RACF. Each business application carried its own login screen, its own password rules, and its own user database. A typical employee in a mid-sized enterprise of the late 1980s might authenticate to half a dozen distinct systems in a single day, each with a different username and a different password.",
  },
  {
    type: "p",
    text: "This was a cognitive load problem and a security liability. Passwords were reused. Sticky notes appeared on monitors. Password policies were inconsistent because every system enforced its own. Help desks spent a meaningful share of their time on password resets. The mathematics of human memory and the mathematics of credential security were pulling in opposite directions, and security was losing.",
  },
  {
    type: "p",
    text: "The first organisation to take the problem seriously at scale was MIT. Project Athena, launched in 1983, was an attempt to build a campus-wide distributed computing environment for students and faculty. Thousands of users, thousands of workstations, hundreds of services, all needing to authenticate. Per-system logins were not going to work. The Athena team had to invent something new.",
  },
  {
    type: "quote",
    text: "Kerberos was named after the three-headed dog that guarded the gates of Hades. In MIT's version, the three heads were authentication, authorisation, and audit. The name was apt: the first SSO system was also the first guardian of the network perimeter.",
    cite: "The mythology behind the technology",
  },
  {
    type: "h2",
    id: "kerberos",
    text: "Kerberos: The Ticket That Let You Through Every Door",
  },
  {
    type: "p",
    text: "MIT's answer was Kerberos, designed in the mid-1980s by Steve Miller, Clifford Neuman and a small team. Kerberos worked on a simple but powerful idea: a central authentication server would issue cryptographically signed tickets to users after they proved their identity once, and those tickets would then be accepted by every service on the network without requiring the password again. A user logged in once in the morning. For the rest of the day, the network simply recognised their ticket.",
  },
  {
    type: "p",
    text: "Kerberos worked brilliantly inside a single network. It was adopted by Microsoft as the default authentication protocol in Active Directory in 2000, which is why Windows users who join a domain still get the experience of logging in once and reaching their file shares, printers and email without re-authenticating. Kerberos is still running under the hood of most enterprise networks in 2026.",
  },
  {
    type: "p",
    text: "But Kerberos had a structural limit. It was designed for a single trust boundary, the corporate network. When the web era arrived and enterprises began consuming applications hosted by other companies, Kerberos had no way to reach across the boundary. The SSO problem had to be re-solved at internet scale.",
  },
  {
    type: "callout",
    variant: "info",
    title: "The SaaS Explosion That Changed Everything",
    text: "Salesforce launched in 1999 with a simple proposition: customer relationship management delivered over the internet, with no software to install. Its success triggered a wave of SaaS adoption (Workday, ServiceNow, Concur, Box, Dropbox, Slack) that accelerated through the 2000s and 2010s. Each new SaaS application came with its own login system. By 2015, Okta reported that the average enterprise was using 901 applications. The password problem that Kerberos had partially solved inside the corporate network had exploded at internet scale.",
  },
  {
    type: "h2",
    id: "standards",
    text: "SAML, OAuth, and OIDC: The Three Protocols That Built Modern SSO",
  },
  {
    type: "p",
    text: "The first answer was SAML, the Security Assertion Markup Language, ratified by OASIS in 2002 and revised to version 2.0 in 2005. SAML let an identity provider issue a signed XML assertion saying \"this is Alice, she works for Acme, here are her attributes\", which any application that trusted the identity provider could accept. SAML was verbose, XML-heavy, and not elegant. It was also universal, and that was what mattered. By 2010 it was the de facto standard for enterprise SSO into SaaS applications, a position it still holds for many on-premise products today.",
  },
  {
    type: "p",
    text: "The second was OAuth, originally drafted by Blaine Cook and others in 2006 to solve a different problem: allowing one web service to access another on a user's behalf without sharing the password. OAuth 2.0, published in 2012, became the dominant authorisation framework for the API and mobile era. It was simpler than SAML, JSON-based, and built for the realities of mobile apps and browser-based JavaScript.",
  },
  {
    type: "p",
    text: "The third was OpenID Connect, published in 2014, which layered identity on top of OAuth 2.0. OIDC gave the modern SaaS world its default authentication protocol: native to mobile, native to single-page JavaScript applications, and friendly to the consumer login flows that dominated the 2010s. SAML for enterprise, OIDC for SaaS-native and mobile, became the dual standard that still defines the SSO market in 2026.",
  },
  {
    type: "h2",
    id: "timeline",
    text: "From MIT's Campus Network to Universal Login",
  },
  {
    type: "h3",
    text: "1984, Kerberos Developed at MIT",
  },
  {
    type: "p",
    text: "Project Athena begins work on a campus-wide authentication protocol. Kerberos issues encrypted tickets that let a user authenticate once and reach every service on the network. The model that all modern SSO inherits is born inside a university computer lab.",
  },
  {
    type: "h3",
    text: "1999, SaaS Era Begins",
  },
  {
    type: "p",
    text: "Salesforce launches and proves that business software can be delivered over the internet. The wave that follows means every enterprise will soon authenticate to dozens of external applications, each with its own login.",
  },
  {
    type: "h3",
    text: "2000, Active Directory and Kerberos",
  },
  {
    type: "p",
    text: "Microsoft ships Windows 2000 with Active Directory, using Kerberos as the underlying authentication protocol. Domain join becomes the most common SSO experience in enterprise computing, and remains so to this day.",
  },
  {
    type: "h3",
    text: "2002, SAML 1.0 Published",
  },
  {
    type: "p",
    text: "OASIS publishes SAML 1.0, the first widely adopted standard for cross-domain federated identity. Signed XML assertions allow an identity provider in one organisation to vouch for a user to an application in another.",
  },
  {
    type: "h3",
    text: "2005, SAML 2.0, The Enterprise Standard",
  },
  {
    type: "p",
    text: "SAML 2.0 is finalised. It becomes the default protocol for enterprise SSO into SaaS, and is still used by tens of thousands of business applications in 2026.",
  },
  {
    type: "h3",
    text: "2009, Okta Founded",
  },
  {
    type: "p",
    text: "Todd McKinnon and Frederic Kerrest, both ex-Salesforce, launch Okta as a cloud identity provider that connects Active Directory on one side to thousands of SaaS applications on the other through pre-built SAML and OIDC connectors. The independent IDP category is born.",
  },
  {
    type: "h3",
    text: "2012, OAuth 2.0 Published",
  },
  {
    type: "p",
    text: "OAuth 2.0 ships as an IETF standard, designed for mobile and API authorisation flows. It becomes the foundation that the next generation of identity protocols will be built on.",
  },
  {
    type: "h3",
    text: "2014, OpenID Connect Published",
  },
  {
    type: "p",
    text: "OIDC layers identity on top of OAuth 2.0, giving the modern SaaS and mobile world a JSON-based, JavaScript-friendly authentication protocol. Consumer logins and enterprise SSO start converging on the same architecture.",
  },
  {
    type: "h3",
    text: "Today, SSO as Default Infrastructure",
  },
  {
    type: "p",
    text: "SSO is no longer a feature; it is the substrate. Microsoft Entra ID, Okta, Ping Identity, JumpCloud and Auth0 collectively authenticate hundreds of millions of workforce users every day. Conditional access, MFA, device posture and passwordless authentication all attach to the SSO flow, making it the new perimeter of the enterprise.",
  },
  {
    type: "quote",
    text: "SAML solved the internet SSO problem the way HTTP solved the document sharing problem, by giving every participant a common language. It was not elegant. But it was universal, and universal beats elegant every time.",
    cite: "Why SAML's XML verbosity never stopped its adoption",
  },
];
