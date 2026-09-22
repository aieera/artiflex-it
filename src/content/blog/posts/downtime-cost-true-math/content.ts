import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "The Gartner figure most CFOs have heard, $5,600 per minute of IT downtime, is now over a decade old. Even adjusted for inflation it is the floor, not the ceiling. The real cost of an outage in 2026 routinely runs 3–5x that number once you include recovery, compliance, churn, and reputation effects.",
  },
  {
    type: "p",
    text: "This article breaks down the six components of downtime cost, gives you the math to calculate your own number, and lays out the controls that reduce both the probability and the duration of outages.",
  },
  {
    type: "h2",
    id: "where-figure",
    text: "Where the $5,600 Number Comes From, and Why It Misleads",
  },
  {
    type: "p",
    text: "The original Gartner study averaged direct revenue loss across industries during planned and unplanned downtime. It did not include recovery cost, regulatory fines, customer churn, or brand impact. For a financial-services firm processing transactions, a minute of unplanned downtime could mean tens of thousands in lost revenue. For a healthcare provider, it could mean delayed patient care and clinical liability. For an e-commerce business during peak season, it could mean permanent customer loss.",
  },
  {
    type: "stats",
    items: [
      {
        value: "$5,600",
        label: "Direct revenue loss",
        sublabel: "Per minute, baseline",
      },
      {
        value: "3–5x",
        label: "Total cost multiplier",
        sublabel: "Including non-direct effects",
      },
      {
        value: "73%",
        label: "Of unplanned downtime",
        sublabel: "Caused by aging infra (region)",
      },
      {
        value: "67%",
        label: "Of customers churn",
        sublabel: "After repeated outages, 12 mo.",
      },
    ],
  },
  {
    type: "h2",
    id: "components",
    text: "Six Components of Downtime Cost",
  },
  {
    type: "h3",
    id: "lost-revenue",
    text: "1. Lost Revenue",
  },
  {
    type: "p",
    text: "Direct loss of sales, transactions, or billable hours during the outage. The simplest component to calculate, daily revenue divided by operating hours, multiplied by outage duration. Adjust for the time-of-day profile if your traffic is uneven.",
  },
  {
    type: "h3",
    id: "recovery-cost",
    text: "2. Recovery Costs",
  },
  {
    type: "p",
    text: "Emergency IT support, overtime pay, hardware replacement, expedited vendor shipping, data-recovery specialists. For a serious incident, six-figure recovery costs are routine. Most organisations underestimate this because they have never invoked it at scale.",
  },
  {
    type: "h3",
    id: "compliance-penalty",
    text: "3. Compliance Penalties",
  },
  {
    type: "p",
    text: "Regulatory fines for service disruptions, especially in financial services, healthcare, and any sector covered by sector-specific availability requirements. UAE PDPL fines can reach AED 5M, and NESA-aligned regulators can require remediation plans with audit follow-up.",
  },
  {
    type: "h3",
    id: "churn",
    text: "4. Customer Churn",
  },
  {
    type: "p",
    text: "Customers who experience service disruptions are 3x more likely to switch to a competitor within 12 months. The effect compounds across multiple incidents, one outage is forgivable, three is a pattern. The lifetime-value impact of churn often exceeds the direct revenue loss of the outage that caused it.",
  },
  {
    type: "h3",
    id: "reputation",
    text: "5. Reputation Damage",
  },
  {
    type: "p",
    text: "Social media amplifies outage visibility. A major outage can take months to recover from in terms of brand perception. For B2B companies in the UAE, where personal relationships drive purchasing decisions, the network effect is sharper, one bad story circulates fast in a tightly-connected business community.",
  },
  {
    type: "h3",
    id: "productivity",
    text: "6. Employee Productivity",
  },
  {
    type: "p",
    text: "Every minute of system downtime multiplied by the number of affected employees equals significant lost productivity. For a 200-person organisation paying an average AED 25,000/month, every hour of full-system downtime is roughly AED 14,000 in idle salary cost alone, before any of the other components.",
  },
  {
    type: "callout",
    variant: "info",
    title: "Quick math: your hourly downtime cost",
    text: "Annual revenue ÷ (operating days × hours per day) + (employees × hourly cost × 0.7 productivity loss) + 20% recovery overhead. Multiply by your historical incident frequency to get your expected annual downtime cost.",
  },
  {
    type: "h2",
    id: "how-to-reduce",
    text: "How to Reduce Downtime",
  },
  {
    type: "ul",
    items: [
      "Implement redundant systems and tested failover capabilities. Redundancy you have not tested is not redundancy.",
      "Use proactive [24/7 monitoring](/managed-services) to catch issues at warning level, not failure level.",
      "Maintain up-to-date disaster-recovery plans and run live restoration drills, not just paper exercises, see [disaster recovery solutions](/cloud-solutions/disaster-recovery-solutions-dubai).",
      "Invest in preventive maintenance through [AMC contracts](/managed-services), most outages are preventable equipment failures.",
      "Design infrastructure with high availability from the start. Retrofitting HA costs 5–10x what designing it in costs.",
      "Track MTTR by incident type. Trend it. The teams that improve are the ones that measure.",
    ],
  },
  {
    type: "h2",
    id: "amc-roi",
    text: "The ROI Math for AMC Investment",
  },
  {
    type: "p",
    text: "An AMC contract typically runs 8–15% of annual IT-asset value. For a mid-market UAE business with AED 5M of IT assets, that is AED 400,000–750,000 per year. Compare that to a single 8-hour unplanned outage at AED 14,000/hour productivity cost alone (AED 112,000), plus recovery costs, plus opportunity cost. AMC pays for itself by preventing one or two incidents per year. Most AMC clients prevent considerably more.",
  },
  {
    type: "cta",
    title: "Calculate Your Downtime Exposure",
    description: "We will model your hourly and annual downtime cost based on your specific business, then show what AMC and managed services would save.",
    href: "/managed-services",
    label: "View Managed Services",
  },
];
