import type { ContentBlock } from "../../types";

export const content: ContentBlock[] = [
  {
    type: "p",
    text: "60% of cloud migrations exceed their budget. 45% miss their timelines. The reality for many UAE businesses has been cost overruns, performance regressions, and security gaps that did not exist on-premises.",
  },
  {
    type: "p",
    text: "Cloud migration still pays off, when it is done deliberately. The failures we see are not technology failures; they are planning, governance, and skills failures. Below are the six patterns we see most often, the practices that prevent them, and a checklist you can use before signing the next migration statement of work.",
  },
  {
    type: "h2",
    id: "failures",
    text: "Six Patterns Behind Failed Migrations",
  },
  {
    type: "h3",
    id: "lift-and-shift",
    text: "1. Lift-and-Shift Everything",
  },
  {
    type: "p",
    text: "Moving workloads to the cloud without re-architecting them produces the worst possible outcome, higher cost than on-premises, often worse performance, and none of the cloud's elasticity benefits. Some workloads belong in IaaS as-is. Many do not. The discipline is to re-platform or re-architect where the math justifies it, and accept that some legacy applications belong on-premises until they are replaced.",
  },
  {
    type: "h3",
    id: "no-assessment",
    text: "2. Skipping the Assessment Phase",
  },
  {
    type: "p",
    text: "Without a thorough assessment of current infrastructure, dependencies, and data flows, migration plans are built on assumptions. Three months in, the team discovers an undocumented integration between two apps, or a database that requires sub-millisecond latency to a third system, or a regulator who will not allow data to leave the UAE. By then it is expensive to course-correct.",
  },
  {
    type: "h3",
    id: "security-bolted",
    text: "3. Security Bolted On Afterward",
  },
  {
    type: "p",
    text: "Cloud security is fundamentally different from on-premises security. Identity is the new perimeter, configuration drift is constant, and the shared-responsibility model means the cloud provider secures less than tenants think. Securing the cloud after migration costs 3–5x what designing it in costs. We see misconfigured S3 buckets, over-permissive IAM, and exposed management planes on every audit we run.",
  },
  {
    type: "h3",
    id: "data-egress",
    text: "4. Underestimating Data-Transfer Costs",
  },
  {
    type: "p",
    text: "Cloud providers price ingress at zero and egress aggressively. A workload that pulls 5TB/month from a partner system fine on-premises becomes a $1,500/month line item in AWS. Multiply that across hundreds of workloads and the monthly bill drifts upward by 20–30% in the first year purely from data transfer the team did not model.",
  },
  {
    type: "h3",
    id: "no-training",
    text: "5. No Training Plan",
  },
  {
    type: "p",
    text: "Teams unfamiliar with cloud services make costly mistakes, leaving storage buckets public, over-provisioning compute, running production on default-tier networking. Cloud-skill gaps are the most common root cause of incidents in the first six months post-migration. Training spend should be a budget line item, not an afterthought.",
  },
  {
    type: "h3",
    id: "no-governance",
    text: "6. Missing Governance Framework",
  },
  {
    type: "p",
    text: "Without clear policies for resource provisioning, cost management, and access control, cloud sprawl becomes inevitable. Within twelve months you have shadow accounts, unowned resources, untagged spend, and no clear authority to clean it up. The cure for cloud sprawl is a Cloud Centre of Excellence (CCoE), a small team with the mandate to set standards and enforce them.",
  },
  {
    type: "callout",
    variant: "warning",
    title: "Cost-overrun benchmark",
    text: "Across the UAE migrations we have audited, the median cost overrun in year one was 38%. Almost all of it came from underestimating egress, over-provisioning compute, and missing reserved-instance opportunities.",
  },
  {
    type: "h2",
    id: "what-works",
    text: "What Successful UAE Migrations Do Differently",
  },
  {
    type: "ul",
    items: [
      "Start with a comprehensive cloud-readiness assessment, workload inventory, dependency map, performance baselines.",
      "Prioritise workloads by business value vs. migration complexity. Migrate the high-value/low-complexity quadrant first.",
      "Establish a Cloud Centre of Excellence (CCoE) with the authority to set standards before the first workload moves.",
      "Implement FinOps practices from day one, reserved instances, right-sizing, cost-anomaly alerts, monthly review.",
      "Design for resilience with multi-AZ and (where justified) multi-region architectures.",
      "Map every cloud configuration to a control in NIST CSF 2.0, NESA, or your applicable framework.",
    ],
  },
  {
    type: "h2",
    id: "checklist",
    text: "Pre-Migration Checklist for UAE Businesses",
  },
  {
    type: "p",
    text: "Before signing a migration statement of work, walk through this checklist with the proposed vendor. If they cannot answer all of it, the migration is not ready to start.",
  },
  {
    type: "ol",
    items: [
      "Complete workload inventory with current cost, performance, and dependency data.",
      "Documented data-residency requirements per workload (UAE / GCC / global).",
      "Cloud-model recommendation per workload: rehost, replatform, refactor, retire, retain.",
      "12-month TCO projection with sensitivity analysis on egress and compute scaling.",
      "Security architecture mapped to your compliance framework (NESA / PDPL / ISO 27001 / CBUAE).",
      "Defined success metrics, uptime, performance, cost per transaction, measurable from day one.",
      "Phased cutover plan with rollback procedures for every wave.",
      "Operational runbook for the post-migration steady state, including monitoring and incident response.",
    ],
  },
  {
    type: "cta",
    title: "Free Cloud Readiness Assessment",
    description: "We will inventory your workloads, model the migration cost, and identify the patterns above before you commit. No vendor lock-in.",
    href: "/cloud-solutions",
    label: "View Cloud Solutions",
  },
];
