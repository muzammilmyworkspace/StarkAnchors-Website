/**
 * Single source of truth for identity, positioning copy and the
 * canonical origin. Nothing here may assert a metric, a client or a
 * result that has not been independently verified.
 */

export const site = {
  name: "Stark Anchors",
  legalName: "Stark Anchors",
  domain: "starkanchors.com",
  url: "https://starkanchors.com",
  discipline: "Business Systems Engineering",
  tagline: "We don’t optimize campaigns. We engineer businesses.",
  description:
    "Stark Anchors is a business systems engineering group. We analyse user behaviour, debug revenue leakage and build the automation and AI infrastructure that turns cold traffic into qualified pipeline.",
  shortDescription:
    "Business systems engineering: behavioural telemetry, revenue pipeline architecture and operational automation.",
  email: "systems@starkanchors.com",
  /** Response window we commit to on the diagnostic portal. */
  responseWindow: "24 hours",
  locale: "en_US",
} as const;

export const mission =
  "We exist to remove speculation and fragmented execution from the business ecosystem. By combining behavioural telemetry, full-stack marketing funnels and precise AI automation, we debug operational complexity and deploy zero-friction pipelines built for predictable growth and institutional scale.";

export const vision =
  "To engineer the foundational digital infrastructure of the next-generation global economy, where every business operation is automated, every revenue leak is permanently debugged, and technology serves as a transparent catalyst for market leadership.";

export const positioning = {
  heroLineOne: "We don’t optimize campaigns.",
  heroLineTwo: "We engineer businesses.",
  heroSupport:
    "We are systems engineers. We read user behaviour, debug revenue leakage, and build the AI and automation layer that turns cold traffic into qualified institutional pipeline.",
  closingLineOne: "Your business already has a system.",
  closingLineTwo: "The question is whether it is engineered.",
} as const;

/**
 * The conceptual spine of the brand. Referenced by the footer readout
 * and the services architecture. Order is meaningful.
 */
export const systemSequence = [
  "INPUT",
  "SIGNAL",
  "ANALYSIS",
  "DIAGNOSIS",
  "ARCHITECTURE",
  "AUTOMATION",
  "OPTIMIZATION",
  "SCALE",
] as const;
