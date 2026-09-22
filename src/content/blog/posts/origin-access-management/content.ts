import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "For thirty years, access management was a question of geography. If you were inside the network, you were trusted; if you were outside it, you were not. Then the cloud arrived, the workforce went mobile, and the SaaS estate ballooned. The perimeter dissolved, and the discipline that had been built around its existence had to reinvent itself from the ground up.",
  },
  {
    type: "h2",
    id: "perimeter-era",
    text: "The Moat and the Castle: How Enterprises Controlled Access for Thirty Years",
  },
  {
    type: "p",
    text: "Through the 1990s and 2000s, the dominant access model was the castle and the moat. The corporate network was the castle, the firewall was the moat, and the VPN was the drawbridge that let approved outsiders cross. Resources sat behind the wall, and the act of reaching them was treated as proof of legitimacy.",
  },
  {
    type: "p",
    text: "NIST formalised Role-Based Access Control in 1992, in foundational work by David Ferraiolo and Rick Kuhn. RBAC reduced the administrative burden of managing permissions per user by grouping them into roles that mirrored the organisation chart. It became the default model inside enterprise applications and operating systems, and it remains widely deployed today.",
  },
  {
    type: "p",
    text: "The model worked while applications, users, and data all lived in the same building. It broke down as applications moved to the cloud, employees worked from home and from airports, and the perimeter boundary became impossible to draw on any architecture diagram with a straight face.",
  },
  {
    type: "quote",
    text: "The VPN was never an access management system. It was a location management system, it moved users from outside the network to inside it. Once inside, access was typically unrestricted. We called that security. It was not security. It was geography.",
    cite: "Why the perimeter model was always access management by location, not by identity",
  },
  {
    type: "h2",
    id: "dissolution",
    text: "When Everything Moved Outside the Perimeter",
  },
  {
    type: "p",
    text: "Three shifts happened simultaneously in the early 2000s. Software as a Service moved business applications out of the data centre and into vendor clouds. Mobile devices placed corporate data in the pocket of every employee. And the workforce itself became distributed, with consultants, contractors, and remote staff outnumbering the in-office population in many organisations.",
  },
  {
    type: "p",
    text: "The VPN was conscripted to solve all of it and proved inadequate to any of it. Once a user was on the VPN, they were broadly on the network, with the lateral movement potential that modern ransomware operators now exploit so effectively. The control was binary in a world that had become continuous.",
  },
  {
    type: "p",
    text: "Attribute-Based Access Control emerged as the conceptual response. ABAC treated access as a multidimensional policy evaluation, considering user attributes, resource attributes, environment, and action together, rather than reducing the question to membership of a role. It was the right idea at the wrong time, until the engines existed to evaluate those policies at scale.",
  },
  {
    type: "callout",
    variant: "info",
    title: "Microsoft's Conditional Access: Policy-Based Access Management at Enterprise Scale",
    text: "Microsoft's Conditional Access engine, launched as part of Azure Active Directory in 2015, was the first widely adopted implementation of policy-based access management at enterprise scale. Conditional Access policies evaluate combinations of user identity, group membership, device compliance status, application being accessed, network location, and sign-in risk score, and apply controls ranging from MFA step-up to complete access denial based on the policy evaluation. By the time it reached wide adoption, Conditional Access had become the practical implementation of zero trust access management for the Microsoft 365 ecosystem.",
  },
  {
    type: "h2",
    id: "timeline",
    text: "From the Firewall Wall to the Policy Engine",
  },
  {
    type: "h3",
    text: "1992, NIST Formalises RBAC",
  },
  {
    type: "p",
    text: "Ferraiolo and Kuhn published the foundational RBAC model, giving the industry a structured way to bind permissions to organisational roles rather than to individual users. It became the default model inside almost every enterprise platform of the next two decades.",
  },
  {
    type: "h3",
    text: "1999, SaaS Begins, Perimeter Erodes",
  },
  {
    type: "p",
    text: "Salesforce and its early peers proved that business-critical applications could live outside the corporate network. The boundary the access model depended on began to dissolve almost immediately.",
  },
  {
    type: "h3",
    text: "2004, XACML Standard Published",
  },
  {
    type: "p",
    text: "OASIS published XACML, an XML-based standard for expressing access control policies and externalising authorisation decisions. It gave ABAC a working vocabulary, even if adoption remained niche for years.",
  },
  {
    type: "h3",
    text: "2007, iPhone Launches, Mobile Access Problem Begins",
  },
  {
    type: "p",
    text: "The arrival of the smartphone meant corporate email and data lived on devices the IT team did not own and could not fully see. Access decisions now needed to account for device posture, not just user identity.",
  },
  {
    type: "h3",
    text: "2010, Google BeyondCorp Experiments Begin",
  },
  {
    type: "p",
    text: "After the Operation Aurora intrusion, Google began rebuilding its internal access model on the assumption that the network was hostile. Trust shifted from network location to device and user posture, evaluated at every request.",
  },
  {
    type: "h3",
    text: "2014, BeyondCorp Published",
  },
  {
    type: "p",
    text: "Google published the BeyondCorp papers, describing in detail how an enterprise could operate without a trusted internal network. The work gave the industry a public reference architecture for what Zero Trust access management actually looked like in production.",
  },
  {
    type: "h3",
    text: "2015, Microsoft Conditional Access Launches",
  },
  {
    type: "p",
    text: "Conditional Access brought policy-based access management to mainstream enterprises through Azure Active Directory. For most organisations, it was the first time access decisions could be expressed as policy and evaluated continuously across identity, device, and risk signals.",
  },
  {
    type: "h3",
    text: "Today, AI-Driven Continuous Access Evaluation",
  },
  {
    type: "p",
    text: "Modern access management evaluates risk continuously rather than only at sign-in, and increasingly leans on machine learning to score anomalous behaviour in real time. Sessions can be revoked mid-flight when a signal changes, closing the window that the old once-a-day authentication model left wide open.",
  },
  {
    type: "quote",
    text: "Access management is no longer a gate. It is the operational implementation of Zero Trust, evaluated continuously, applied per request, and aware of identity, device, and data together.",
    cite: "How access management became the working surface of Zero Trust",
  },
];
