/**
 * Shared domain types.
 *
 * Content shapes live here so that `data/*` stays declarative and
 * visual components never define their own ad-hoc content contracts.
 */

export type NavItem = {
  label: string;
  href: string;
  /** Mono index shown in the mobile navigation rail. */
  index: string;
  description: string;
};

export type SystemStatusItem = {
  label: string;
  state: string;
  /** Drives the indicator treatment. `nominal` is the only default. */
  tone: "nominal" | "active" | "idle";
};

/** A stage in the revenue leakage diagnostic. */
export type LeakageStage = {
  id: string;
  index: string;
  name: string;
  /** What the stage is responsible for, in one line. */
  role: string;
  /** The failure mode observed at this stage. */
  failure: string;
  /**
   * Share of the original inbound volume still present when the stage
   * hands off, 0..1. Drives the width of the flow band. These are
   * illustrative of a shape, not a claim about any client.
   */
  retention: number;
};

export type MethodPillar = {
  id: string;
  index: string;
  title: string;
  summary: string;
  /** Concrete work performed. Not benefits. */
  operations: string[];
};

export type PipelineStage = {
  id: string;
  index: string;
  name: string;
  note: string;
  /** Which layer of the stack this stage belongs to. */
  layer: "acquisition" | "experience" | "intelligence" | "operations";
};

export type ComparisonRow = {
  traditional: string;
  engineered: string;
};

export type Pillar = {
  numeral: string;
  title: string;
  principle: string;
  body: string;
};

export type ServiceSystem = {
  id: string;
  index: string;
  name: string;
  thesis: string;
  body: string;
  capabilities: string[];
  /** Short mono labels rendered into the module diagram. */
  nodes: string[];
};

export type ArchitectureStage = {
  id: string;
  index: string;
  name: string;
  summary: string;
  detail: string;
  outputs: string[];
};

export type PricingTier = {
  id: string;
  index: string;
  name: string;
  scope: string;
  /** Never a number. Scope is quoted after diagnosis. */
  basis: string;
  engagement: string;
  includes: string[];
  suited: string;
  emphasis?: boolean;
};

/** Engineering log article body: a small, typed block system. */
export type LogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "figure"; caption: string; diagram: "leak" | "handoff" | "decay" };

export type LogEntry = {
  slug: string;
  logId: string;
  title: string;
  /** Deck line shown under the title on the index and detail pages. */
  summary: string;
  /** ISO-8601. Rendered with an explicit, stable formatter. */
  date: string;
  readingMinutes: number;
  topic: string;
  body: LogBlock[];
};

/** Diagnostic portal. */
export type DiagnosticFieldType = "text" | "email" | "url" | "textarea" | "choice";

export type DiagnosticField = {
  name: string;
  label: string;
  type: DiagnosticFieldType;
  placeholder?: string;
  required: boolean;
  /** Only for `choice`. */
  options?: string[];
  help?: string;
};

export type DiagnosticStep = {
  id: string;
  index: string;
  title: string;
  intent: string;
  fields: DiagnosticField[];
};

export type DiagnosticPayload = Record<string, string>;

/** Background variants. One engine, parameterised per route. */
export type FieldVariant =
  | "network"
  | "structure"
  | "topology"
  | "quiet"
  | "telemetry";
