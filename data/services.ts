import type { ServiceSystem, ArchitectureStage } from "@/types";

/**
 * Three systems, not a service menu. Each one is a piece of
 * infrastructure that can be engineered independently but is designed
 * to interlock with the other two.
 */
export const serviceSystems: ServiceSystem[] = [
  {
    id: "revenue-pipeline",
    index: "01",
    name: "Revenue Pipeline Engineering",
    thesis: "From first impression to closed revenue, as one connected path.",
    body: "We rebuild the route a buyer takes through your business as a single instrumented system. Acquisition, landing experience, qualification, contact and CRM stop being separate tools owned by separate people and start behaving as one pipeline with defined state at every handoff.",
    capabilities: [
      "Funnel architecture designed against closed revenue",
      "Landing systems with segment-resolved content",
      "Behavioural qualification ahead of human contact",
      "Channel routing to DM, WhatsApp and email",
      "CRM integration with enforced field integrity",
      "End-to-end attribution back to source",
    ],
    nodes: ["SOURCE", "SURFACE", "SIGNAL", "QUALIFY", "ROUTE", "CLOSE"],
  },
  {
    id: "operation-automation",
    index: "02",
    name: "Business Operation Automation",
    thesis: "Remove the handoff instead of staffing around it.",
    body: "Every manual step between two systems is a place where state is lost and time is spent. We map the operations your team performs by hand, then replace the ones that are mechanical with monitored automation — keeping human judgement exactly where accountability requires it.",
    capabilities: [
      "Process mapping across tools and teams",
      "Lead enrichment and routing on capture",
      "Automated response triggered by intent",
      "Internal notification and escalation logic",
      "Document, proposal and onboarding flows",
      "Failure alerting on every automated path",
    ],
    nodes: ["MAP", "TRIGGER", "ENRICH", "ROUTE", "NOTIFY", "MONITOR"],
  },
  {
    id: "telemetry-audits",
    index: "03",
    name: "Data Telemetry & Conversion Audits",
    thesis: "Instrument the system before forming an opinion about it.",
    body: "Most businesses measure traffic and call it analytics. We design an event schema against the decisions you actually need to make, reconstruct sessions across device and channel, and produce a diagnosis of where the system drops volume — with the evidence attached.",
    capabilities: [
      "Event schema designed against revenue decisions",
      "Server-side and consent-aware collection",
      "Session reconstruction across device and channel",
      "Drop-off isolated to the interaction",
      "Attribution modelling and reporting",
      "Written diagnosis with prioritised corrections",
    ],
    nodes: ["COLLECT", "MODEL", "RECONSTRUCT", "ISOLATE", "ATTRIBUTE", "REPORT"],
  },
];

/**
 * The engagement architecture. Interactive on the services page:
 * selecting a stage swaps the detail panel.
 */
export const architectureStages: ArchitectureStage[] = [
  {
    id: "input",
    index: "01",
    name: "Input",
    summary: "Everything the business already knows, gathered in one place.",
    detail:
      "We take the existing stack as given: analytics, CRM, ad accounts, spreadsheets, the process that lives in someone’s head. Nothing is replaced at this stage. The objective is an accurate inventory of what exists and who depends on it.",
    outputs: ["Stack inventory", "Access map", "Process interviews"],
  },
  {
    id: "data",
    index: "02",
    name: "Data",
    summary: "Instrumentation designed against decisions, not dashboards.",
    detail:
      "We define the event schema the business actually needs and deploy collection against it. Where existing data is unreliable we say so rather than modelling on top of it. This stage produces the first honest picture of the system.",
    outputs: ["Event schema", "Collection layer", "Data quality report"],
  },
  {
    id: "diagnostics",
    index: "03",
    name: "Diagnostics",
    summary: "Where volume is lost, isolated to the interaction.",
    detail:
      "With clean signal, drop-off can be attributed to a specific step rather than a general page. We reconstruct sessions, separate intent from noise, and rank losses by the revenue attached to them rather than by how easy they are to fix.",
    outputs: ["Leakage profile", "Ranked findings", "Evidence appendix"],
  },
  {
    id: "architecture",
    index: "04",
    name: "Architecture",
    summary: "The corrected system, specified before it is built.",
    detail:
      "We design the target state: the pipeline, the handoffs, the data contracts between tools, and the failure behaviour of each path. It is written down and agreed before implementation, because architecture reviewed on a diagram is cheaper than architecture reviewed in production.",
    outputs: ["Target architecture", "Data contracts", "Build sequence"],
  },
  {
    id: "automation",
    index: "05",
    name: "Automation",
    summary: "Mechanical work removed; judgement kept.",
    detail:
      "Implementation of the routing, enrichment, response and CRM logic defined in the architecture. Every automated path is monitored, and every path that can fail has a defined escalation to a human.",
    outputs: ["Automation layer", "Escalation paths", "Failure alerting"],
  },
  {
    id: "optimization",
    index: "06",
    name: "Optimization",
    summary: "Correction driven by the telemetry already in place.",
    detail:
      "Once the system reports honestly, improvement becomes an ordinary engineering loop: observe, form a hypothesis, change one thing, measure the effect on revenue rather than on a proxy.",
    outputs: ["Test programme", "Revenue reporting", "Change log"],
  },
  {
    id: "scale",
    index: "07",
    name: "Scale",
    summary: "Volume added to a structure that can hold it.",
    detail:
      "Only at this point does increasing spend or reach make sense. Scale applied to an undiagnosed system multiplies the leak. Scale applied to an engineered one compounds.",
    outputs: ["Capacity model", "Expansion plan", "Operating handover"],
  },
];
