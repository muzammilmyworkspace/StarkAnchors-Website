import type { PipelineStage } from "@/types";

/**
 * The full-stack pipeline. Ten stages, one continuous path.
 *
 * `layer` groups stages into the four bands rendered along the left
 * rail of the diagram. Order is load-bearing: the diagram draws the
 * path in array order.
 */
export const pipelineStages: PipelineStage[] = [
  {
    id: "awareness",
    index: "01",
    name: "Awareness",
    note: "Placement chosen against closed revenue, not impressions.",
    layer: "acquisition",
  },
  {
    id: "website",
    index: "02",
    name: "Website",
    note: "The surface where positioning either survives contact or does not.",
    layer: "experience",
  },
  {
    id: "dynamic-content",
    index: "03",
    name: "Dynamic Content",
    note: "The page resolves to the segment that arrived at it.",
    layer: "experience",
  },
  {
    id: "user-behavior",
    index: "04",
    name: "User Behaviour",
    note: "Every meaningful interaction is captured as a typed event.",
    layer: "intelligence",
  },
  {
    id: "qualification",
    index: "05",
    name: "Qualification",
    note: "Fit is resolved from behaviour before a human is engaged.",
    layer: "intelligence",
  },
  {
    id: "automated-outreach",
    index: "06",
    name: "Automated DM / WhatsApp",
    note: "Contact opens in the channel the buyer already uses.",
    layer: "operations",
  },
  {
    id: "crm",
    index: "07",
    name: "CRM",
    note: "State is written by the system, not by memory.",
    layer: "operations",
  },
  {
    id: "attribution",
    index: "08",
    name: "Attribution",
    note: "Revenue is traced back to the behaviour that produced it.",
    layer: "intelligence",
  },
  {
    id: "ai-follow-up",
    index: "09",
    name: "AI Follow-up",
    note: "Sequencing informed by the account record, reviewed by a human.",
    layer: "operations",
  },
  {
    id: "revenue",
    index: "10",
    name: "Revenue",
    note: "The only output the architecture is measured against.",
    layer: "operations",
  },
];

export const pipelineLayers: { id: PipelineStage["layer"]; label: string }[] = [
  { id: "acquisition", label: "Acquisition" },
  { id: "experience", label: "Experience" },
  { id: "intelligence", label: "Intelligence" },
  { id: "operations", label: "Operations" },
];
