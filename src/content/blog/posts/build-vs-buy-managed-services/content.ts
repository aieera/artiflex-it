import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "A qualified network engineer in the UAE costs AED 25,000–35,000 per month. After visa sponsorship, health insurance, annual flights, training budget, and benefits, that is approximately AED 400,000–500,000 annually, for one person covering one technical domain.",
  },
  {
    type: "p",
    text: "A comprehensive in-house IT team needs expertise across networking, security, cloud, helpdesk, and compliance. That is five to eight full-time hires minimum, totalling AED 2–3 million per year before management overhead, turnover replacement costs, and the lost productivity while new hires get up to speed. For most UAE mid-market businesses, that math does not work.",
  },
  {
    type: "p",
    text: "But 'just outsource everything' is not the right answer either. This article gives you the honest decision framework, when managed services win, when in-house is the right call, and the hybrid model most growing UAE businesses end up at.",
  },
  {
    type: "h2",
    id: "true-cost",
    text: "The True Cost of Hiring in the UAE",
  },
  {
    type: "p",
    text: "Salary is the easiest part of the cost to calculate. Add to it: visa sponsorship and renewal (AED 5,000–15,000/year), comprehensive health insurance (AED 8,000–20,000/year), annual flights for the employee and dependants (AED 5,000–15,000/year), end-of-service gratuity accruing at ~one month per year of service, training and certification budget (AED 10,000–30,000/year for a serious engineer), and the management overhead of someone who supervises and develops them.",
  },
  {
    type: "p",
    text: "Then there is turnover. The UAE IT-talent market is liquid; senior engineers move every 2–3 years on average. Each replacement costs 50–100% of annual salary in recruiting fees, ramp-up time, and lost productivity.",
  },
  {
    type: "stats",
    items: [
      {
        value: "AED 400K+",
        label: "True annual cost",
        sublabel: "Per senior engineer, all-in",
      },
      {
        value: "5–8",
        label: "Hires for full coverage",
        sublabel: "Networking, security, cloud, helpdesk",
      },
      {
        value: "AED 2–3M",
        label: "Annual team cost",
        sublabel: "Before management overhead",
      },
      {
        value: "60%",
        label: "Cost reduction",
        sublabel: "Typical with managed services",
      },
    ],
  },
  {
    type: "h2",
    id: "managed-wins",
    text: "When Managed Services Make More Sense",
  },
  {
    type: "h3",
    id: "predictability",
    text: "1. Cost Predictability",
  },
  {
    type: "p",
    text: "Replace variable break-fix costs and per-incident overtime with a fixed monthly fee. Our clients see an average 60% reduction in total IT spending in the first year, primarily by eliminating emergency-response premiums and reactive consulting.",
  },
  {
    type: "h3",
    id: "coverage",
    text: "2. 24/7 Coverage",
  },
  {
    type: "p",
    text: "No single hire provides round-the-clock coverage. Managed services include after-hours monitoring and response as standard. For UAE businesses with global customers or trans-Pacific supply chains, this changes the calculus, incidents that occur at 02:00 UAE time get the same response as at 14:00.",
  },
  {
    type: "h3",
    id: "expertise-breadth",
    text: "3. Breadth of Expertise",
  },
  {
    type: "p",
    text: "A managed-services provider brings a team of specialists across every IT domain. You get the collective expertise of the entire organisation, the cybersecurity engineer who has seen this attack pattern before, the cloud architect who has done this exact migration twice, the network specialist who knows the firmware bug in your specific switch model. No single in-house hire can match that depth across all domains.",
  },
  {
    type: "h3",
    id: "scalability",
    text: "4. Scalability",
  },
  {
    type: "p",
    text: "Scale your IT support up or down based on business needs without the friction of hiring or laying off staff. For seasonal businesses, multi-quarter projects, or organisations going through M&A, this elasticity is materially valuable.",
  },
  {
    type: "h3",
    id: "risk-reduction",
    text: "5. Reduced Risk",
  },
  {
    type: "p",
    text: "Managed providers maintain compliance certifications, carry professional liability insurance, and follow established best practices. The risk transfer is not absolute, but it is real, a vendor with documented processes and audit trails is materially less risky than a single-headed-engineer dependency.",
  },
  {
    type: "h2",
    id: "build-instead",
    text: "When to Build In-House",
  },
  {
    type: "ul",
    items: [
      "When IT is the core business, software product companies, fintechs, technology platforms.",
      "When you have highly specialised or proprietary systems that no external vendor can support without a long ramp.",
      "When regulatory requirements mandate on-premise personnel, some defence, sovereign-data, and classified workloads.",
      "When you need real-time physical access to systems, trading floors, broadcast operations, manufacturing control rooms.",
      "When the volume of work justifies dedicated FTE economics, typically at 200+ employees and growing.",
    ],
  },
  {
    type: "callout",
    variant: "tip",
    title: "Hybrid is the answer for most UAE mid-market businesses",
    text: "A lean internal team for strategic decisions and vendor management, with managed services handling day-to-day operations, monitoring, and incident response. The internal team owns 'what we want to do', the managed-services partner owns 'how to do it well at scale'.",
  },
  {
    type: "h2",
    id: "decision-framework",
    text: "Decision Framework: Five Questions",
  },
  {
    type: "ol",
    items: [
      "Is IT a core competency that differentiates your business, or a support function that needs to work reliably?",
      "What is your current cost per FTE all-in (salary + visa + insurance + benefits + training + management)?",
      "Can a single hire give you 24/7 coverage, or do you need three to staff round-the-clock?",
      "What is your tolerance for key-person risk if your senior engineer leaves with two weeks' notice?",
      "Do you need depth in one area, or breadth across networking, security, cloud, and compliance?",
    ],
  },
  {
    type: "p",
    text: "If your answers point to 'support function, three hires for coverage, low key-person tolerance, and breadth across domains', managed services almost always wins on cost and capability. If they point to 'core competency, one specialised hire, on-site requirement', build in-house.",
  },
  {
    type: "cta",
    title: "Get a Build-vs-Buy Cost Comparison",
    description: "We will model your current IT cost against an equivalent managed-services proposal, line-item, not vague averages.",
    href: "/managed-services",
    label: "View Managed Services",
  },
];
