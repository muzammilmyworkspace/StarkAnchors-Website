import type { PricingTier } from "@/types";

/**
 * Engagement scopes, not price cards.
 *
 * No figure appears anywhere in this file. Scope is quoted after the
 * diagnostic, because the correct number depends on the architecture
 * found. Do not add placeholder pricing.
 */
export const pricingTiers: PricingTier[] = [
  {
    id: "core-audit",
    index: "01",
    name: "Core System Audit & Debug",
    scope: "A fixed-scope investigation of the system you already run.",
    basis: "Fixed Scope",
    engagement: "One engagement, defined start and end",
    includes: [
      "Full stack and process inventory",
      "Event schema design and instrumentation",
      "Session reconstruction and leakage profile",
      "Findings ranked by attached revenue",
      "Written architecture recommendation",
      "Implementation sequence your team can execute",
    ],
    suited:
      "Businesses with existing traffic and an existing team, where the operating problem is not yet identified.",
  },
  {
    id: "anchor-infrastructure",
    index: "02",
    name: "The Anchor Infrastructure",
    scope: "The corrected system, built and operated with you.",
    basis: "Architecture Dependent",
    engagement: "Build phase, then continuous engineering retention",
    includes: [
      "Everything in Core System Audit & Debug",
      "Revenue pipeline built to the agreed architecture",
      "Automation layer with monitoring and escalation",
      "CRM integration and attribution reporting",
      "AI qualification and follow-up under human review",
      "Continuous correction against measured revenue",
    ],
    suited:
      "Businesses that intend to operate the corrected system rather than receive a document about it.",
    emphasis: true,
  },
  {
    id: "enterprise-scale",
    index: "03",
    name: "Enterprise Scale",
    scope: "Custom engineering across multiple markets, brands or entities.",
    basis: "Custom Scope",
    engagement: "Defined per programme",
    includes: [
      "Multi-market and multi-entity architecture",
      "Data governance and consent architecture",
      "Systems integration with internal engineering",
      "Dedicated engineering group and review cadence",
      "Operational handover and internal enablement",
      "Named accountability for delivered outcomes",
    ],
    suited:
      "Organisations where the system spans several teams and a change in one place breaks something in another.",
  },
];

export const pricingPrinciple =
  "We do not publish a number because we do not know your architecture yet. Quoting before diagnosis is how scope is wrong in both directions.";

export const pricingTerms: { label: string; value: string }[] = [
  { label: "Quotation", value: "Issued after diagnostic" },
  { label: "Engagement", value: "Fixed scope or retained" },
  { label: "Reporting", value: "Against revenue, monthly" },
  { label: "Handover", value: "Documentation included" },
];
