import type { MethodPillar, ComparisonRow } from "@/types";

/**
 * "We debug before we scale." Four operations, in order. Each entry
 * lists work performed — not benefits promised.
 */
export const methodology: MethodPillar[] = [
  {
    id: "behavioral-analytics",
    index: "01",
    title: "Behavioural Analytics",
    summary:
      "Before anything is changed, the system is instrumented. We read what users actually do rather than what a report says they did.",
    operations: [
      "Event schema designed against revenue, not pageviews",
      "Session reconstruction across device and channel",
      "Drop-off isolated to the interaction, not the page",
      "Intent scored from observed behaviour",
    ],
  },
  {
    id: "market-alignment",
    index: "02",
    title: "Market & Expectation Alignment",
    summary:
      "Most conversion failure is a mismatch between what was promised upstream and what is delivered on arrival. We close that gap first.",
    operations: [
      "Message-to-landing continuity audit",
      "Offer structure tested against buying criteria",
      "Objection mapping from sales-call evidence",
      "Positioning rewritten to the qualified segment",
    ],
  },
  {
    id: "operational-automation",
    index: "03",
    title: "Operational Automation",
    summary:
      "Manual handoffs are where systems lose state. We remove the handoff rather than staffing around it.",
    operations: [
      "Lead routing and enrichment on capture",
      "CRM write-back with enforced field integrity",
      "Response triggered on intent, not on office hours",
      "Escalation paths defined and monitored",
    ],
  },
  {
    id: "ai-infusion",
    index: "04",
    title: "AI Infusion",
    summary:
      "AI is applied where judgement is repetitive and evidence is abundant. It is not applied to decisions that require accountability.",
    operations: [
      "Qualification and triage from conversation context",
      "Follow-up drafted against the actual account record",
      "Anomaly detection on pipeline movement",
      "Human review retained at every commitment point",
    ],
  },
];

/**
 * The difference. Rows are aligned pairs — the layout depends on the
 * left and right halves reading against each other line for line.
 */
export const comparison: ComparisonRow[] = [
  { traditional: "Campaign-first", engineered: "System-first" },
  { traditional: "Fragmented execution", engineered: "Integrated infrastructure" },
  { traditional: "Vanity metrics", engineered: "Behavioural telemetry" },
  { traditional: "Manual operations", engineered: "Automation" },
  { traditional: "Short-term optimisation", engineered: "Long-term architecture" },
];

export const comparisonNote =
  "Both columns describe real operating models. One of them is running inside your business right now.";
