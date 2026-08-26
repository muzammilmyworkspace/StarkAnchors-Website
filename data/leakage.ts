import type { LeakageStage } from "@/types";

/**
 * The revenue leakage diagnostic.
 *
 * `retention` describes the SHAPE of a typical uninstrumented funnel —
 * the profile we look for when we open a system. It is illustrative,
 * not a measurement of any client, and the diagram states this on the
 * surface. Do not replace these with numbers presented as results.
 */
export const leakageStages: LeakageStage[] = [
  {
    id: "traffic",
    index: "01",
    name: "Traffic",
    role: "Demand arrives from paid, organic and referral sources.",
    failure:
      "Spend is allocated by channel report rather than by which source produces closed revenue. The cheapest click is optimised for, not the qualified one.",
    retention: 1,
  },
  {
    id: "experience",
    index: "02",
    name: "Experience",
    role: "The destination the visitor actually lands on.",
    failure:
      "Load time, unclear positioning and a mismatch between the ad promise and the page. Most of the loss here happens before a single scroll.",
    retention: 0.71,
  },
  {
    id: "behavior",
    index: "03",
    name: "Behaviour",
    role: "What the visitor does, in what order, and where they stall.",
    failure:
      "Nothing is instrumented beyond pageviews. Intent signals exist in the session and are discarded, so the system cannot tell a researcher from a buyer.",
    retention: 0.54,
  },
  {
    id: "qualification",
    index: "04",
    name: "Qualification",
    role: "Separating fit from noise before a human is involved.",
    failure:
      "Every enquiry is treated identically. Sales spends its highest-value hours filtering, and the qualified minority waits behind the unqualified majority.",
    retention: 0.33,
  },
  {
    id: "follow-up",
    index: "05",
    name: "Follow-up",
    role: "The response window between intent and contact.",
    failure:
      "First contact takes hours or days and depends on who is at a desk. Interest decays fastest in the first minutes, and that is exactly where the gap sits.",
    retention: 0.21,
  },
  {
    id: "crm",
    index: "06",
    name: "CRM",
    role: "The record of every open opportunity and its state.",
    failure:
      "Fields are filled manually and inconsistently. Records go stale, ownership is ambiguous, and the pipeline report describes a system nobody is actually running.",
    retention: 0.15,
  },
  {
    id: "revenue",
    index: "07",
    name: "Revenue",
    role: "Closed business, attributed back to its origin.",
    failure:
      "Revenue cannot be traced to the behaviour that produced it. Without attribution the next allocation decision is a guess wearing a dashboard.",
    retention: 0.11,
  },
];

export const leakageNote =
  "Profile shown is an illustrative failure shape, not a client measurement. Your own curve is produced during the diagnostic.";
