import type { DiagnosticStep } from "@/types";

/**
 * The diagnostic portal, expressed as six steps.
 *
 * The form renderer is driven entirely by this array — adding a field
 * here adds it to the interface, the validation and the submitted
 * payload with no component changes.
 */
export const diagnosticSteps: DiagnosticStep[] = [
  {
    id: "identity",
    index: "01",
    title: "Identity",
    intent: "Who we are speaking with, and where the system lives.",
    fields: [
      {
        name: "fullName",
        label: "Full Name",
        type: "text",
        placeholder: "Your name",
        required: true,
      },
      {
        name: "company",
        label: "Company",
        type: "text",
        placeholder: "Registered or trading name",
        required: true,
      },
      {
        name: "email",
        label: "Work Email",
        type: "email",
        placeholder: "name@company.com",
        required: true,
        help: "Used for the diagnostic response only.",
      },
      {
        name: "website",
        label: "Website",
        type: "url",
        placeholder: "https://",
        required: false,
      },
    ],
  },
  {
    id: "infrastructure",
    index: "02",
    title: "Infrastructure",
    intent: "What is already running, and what it was assembled from.",
    fields: [
      {
        name: "stack",
        label: "Current Infrastructure Stack",
        type: "textarea",
        placeholder:
          "CRM, analytics, ad platforms, automation tools, site platform — whatever is currently in use.",
        required: true,
        help: "An incomplete list is useful. An inaccurate one is not.",
      },
      {
        name: "scale",
        label: "Current Scale",
        type: "choice",
        required: true,
        options: [
          "Pre-revenue or early",
          "Established, single market",
          "Established, multiple markets",
          "Enterprise or multi-entity",
        ],
      },
    ],
  },
  {
    id: "leakage",
    index: "03",
    title: "Revenue Leakage",
    intent: "Where you already suspect the system is losing volume.",
    fields: [
      {
        name: "leakageArea",
        label: "Revenue Leakage Area",
        type: "choice",
        required: true,
        options: [
          "Traffic quality and allocation",
          "Landing experience and conversion",
          "Qualification and lead quality",
          "Follow-up speed and consistency",
          "CRM integrity and pipeline visibility",
          "Attribution and reporting",
          "Not yet identified",
        ],
      },
      {
        name: "leakageContext",
        label: "What Led You To That",
        type: "textarea",
        placeholder:
          "The observation, report or incident that made this visible.",
        required: false,
      },
    ],
  },
  {
    id: "automation",
    index: "04",
    title: "Automation",
    intent: "Which work is currently performed by people out of necessity.",
    fields: [
      {
        name: "automationGoal",
        label: "Automation Goal",
        type: "textarea",
        placeholder:
          "The manual process you would remove first if it were possible.",
        required: true,
      },
    ],
  },
  {
    id: "objective",
    index: "05",
    title: "Objective",
    intent: "What a correct outcome looks like, and by when.",
    fields: [
      {
        name: "successDefinition",
        label: "Success Definition",
        type: "textarea",
        placeholder:
          "How you would know, six months from now, that this worked.",
        required: true,
      },
      {
        name: "timeline",
        label: "Timeline",
        type: "choice",
        required: true,
        options: [
          "Immediate — system is failing now",
          "This quarter",
          "Next two quarters",
          "Exploratory, no fixed date",
        ],
      },
    ],
  },
  {
    id: "submit",
    index: "06",
    title: "Submit",
    intent: "Anything the previous five steps did not capture.",
    fields: [
      {
        name: "additionalContext",
        label: "Additional Context",
        type: "textarea",
        placeholder:
          "Constraints, internal politics, prior attempts, anything relevant.",
        required: false,
      },
    ],
  },
];

export const diagnosticIntro = {
  eyebrow: "System Diagnostic Portal",
  title: "Every engagement begins with understanding the system.",
  body: "Six steps. Nothing here is a sales qualification form — the answers are the first input to the diagnostic itself, and they determine whether we are the right group for the problem.",
};

export const diagnosticConfirmation = {
  title: "Diagnostic request received.",
  lines: [
    "Your system parameters have entered the Stark Anchors analysis queue.",
    "Our engineering group will review the submitted infrastructure data and respond within 24 hours.",
  ],
};

/** Flat field list — used by the API route to validate the payload. */
export const diagnosticFields = diagnosticSteps.flatMap((step) => step.fields);
