import type { CapabilityCategory, ProblemRoute } from "@/types";

/**
 * THE CAPABILITY ECOSYSTEM
 *
 * Five categories, eighteen capabilities, one system.
 *
 * Two rules govern the copy here:
 *
 * Each category carries both a positioning name and a `plain` name. The
 * positioning name is what the work actually is; the plain name is what
 * a buyer typed into a search box. Showing both means the brand can hold
 * its language without making anyone decode it to find out whether we
 * build websites. (We do.)
 *
 * Scope lines describe work performed, never outcomes promised. There is
 * no "increase your ROI by 3x" anywhere in this file and there should
 * never be one until there is a verified number behind it.
 */
export const capabilityCategories: CapabilityCategory[] = [
  {
    id: "digital-experience",
    index: "01",
    verb: "Build",
    accent: "#00E5FF",
    output: "Your digital surface",
    name: "Digital Experience Engineering",
    plain: "Websites, landing pages and dashboards",
    thesis: "The surface is where positioning either survives contact or does not.",
    body: "Everything a visitor touches is a system with a job: load fast, say the right thing to the right segment, and record what happened. We build that surface as engineering rather than decoration — measured against conversion and instrumented from the first deploy.",
    cta: { label: "Engineer your digital experience", href: "/diagnostic" },
    capabilities: [
      {
        id: "website-development",
        name: "Website Development",
        short: "Websites",
        icon: "website",
        summary: "Custom, high-performance sites built around conversion rather than pages.",
        scope: [
          "Information architecture from buying behaviour",
          "Design system and component library",
          "Core Web Vitals as a build requirement",
          "Technical SEO and structured data",
          "Analytics and event instrumentation",
          "CMS or static, chosen for how you actually publish",
        ],
      },
      {
        id: "landing-pages",
        name: "Landing Page Engineering",
        short: "Landing Pages",
        icon: "landingPage",
        summary: "Single-purpose pages for paid traffic, launches and lead generation.",
        scope: [
          "Message continuity from ad to page",
          "Offer structure and objection handling",
          "Segment-resolved content variants",
          "Form architecture and lead capture",
          "Test programme with a defined hypothesis",
          "Conversion tracking wired to the ad platform",
        ],
      },
      {
        id: "dashboards",
        name: "Business Intelligence Interfaces",
        short: "Dashboards",
        icon: "dashboard",
        summary: "Your command centre: scattered business data turned into something a team can act on.",
        scope: [
          "Executive, sales, marketing and operations views",
          "Data modelling across source systems",
          "Live pipeline and revenue reporting",
          "Alerting on movement that matters",
          "Internal tools and operational interfaces",
          "Role-based access and governance",
        ],
      },
    ],
  },

  {
    id: "acquisition",
    index: "02",
    verb: "Attract",
    accent: "#FFB454",
    output: "Qualified traffic",
    name: "Performance Acquisition Systems",
    plain: "Meta, Google, YouTube and LinkedIn advertising",
    thesis: "A campaign is not a system. Spend without attribution is a donation.",
    body: "We do not run ads as a standalone service, because ads that are not connected to the landing experience, the tracking layer, the CRM and the follow-up will always plateau. Acquisition is built as one instrumented path from impression to closed revenue.",
    cta: { label: "Build an acquisition system", href: "/diagnostic" },
    capabilities: [
      {
        id: "meta-ads",
        name: "Meta Ads",
        short: "Meta Ads",
        platform: "meta",
        icon: "targeting",
        summary: "Facebook and Instagram acquisition, built as campaign architecture.",
        scope: [
          "Account and campaign structure",
          "Audience strategy and exclusion logic",
          "Creative testing framework",
          "Conversions API and server-side tracking",
          "Retargeting and retention sequences",
          "Optimisation against closed revenue",
        ],
      },
      {
        id: "google-ads",
        name: "Google Ads",
        short: "Google Ads",
        platform: "google",
        icon: "search",
        summary: "Capturing demand that already exists, at the moment of intent.",
        scope: [
          "Search campaign and keyword architecture",
          "Performance Max where the data supports it",
          "Display and remarketing where relevant",
          "Negative keyword and query discipline",
          "Landing page alignment per ad group",
          "Enhanced conversions and offline import",
        ],
      },
      {
        id: "youtube-ads",
        name: "YouTube Advertising",
        short: "YouTube Ads",
        platform: "youtube",
        icon: "video",
        summary: "Video funnels for demand generation, not view counts.",
        scope: [
          "Video funnel architecture by stage",
          "Audience and placement targeting",
          "Creative direction and hook testing",
          "Sequential remarketing",
          "View-through and assisted conversion tracking",
          "Integration with search and social demand",
        ],
      },
      {
        id: "linkedin-ads",
        name: "LinkedIn Ads",
        short: "LinkedIn Ads",
        platform: "linkedin",
        icon: "professional",
        summary: "B2B acquisition aimed at accounts and decision-makers, not job titles alone.",
        scope: [
          "Account-based targeting and list building",
          "Decision-maker and committee mapping",
          "Lead gen forms and conversation ads",
          "Retargeting from site behaviour",
          "CRM connection and lead routing",
          "Pipeline-stage reporting, not lead counts",
        ],
      },
    ],
  },

  {
    id: "social-presence",
    index: "03",
    verb: "Engage",
    accent: "#C084FC",
    output: "Authority and trust",
    name: "Social Presence Engineering",
    plain: "Social media management and content",
    thesis: "Your social presence is not a content calendar. It is acquisition, authority and trust infrastructure.",
    body: "Publishing thirty times a month is an activity, not a strategy. We treat social as a demand and trust layer connected to the rest of the system: what it publishes is informed by what converts, and what it generates is measured against pipeline.",
    cta: { label: "Engineer your social presence", href: "/diagnostic" },
    capabilities: [
      {
        id: "social-strategy",
        name: "Content Strategy & Direction",
        short: "Content Strategy",
        icon: "editorial",
        summary: "What to say, to whom, and why it belongs to this business.",
        scope: [
          "Positioning and message architecture",
          "Content pillars mapped to buying stages",
          "Creative direction and brand consistency",
          "Editorial calendar and production cadence",
          "Customer education and objection content",
          "Performance review against demand, not likes",
        ],
      },
      {
        id: "social-management",
        name: "Platform Management",
        short: "Social Management",
        icon: "broadcast",
        summary: "Day-to-day operation of the channels, run as infrastructure.",
        scope: [
          "Publishing and scheduling across platforms",
          "Community management and response SLAs",
          "Profile and channel optimisation",
          "Social listening and inbound routing",
          "Analytics and reporting",
          "Conversion paths from social to pipeline",
        ],
      },
    ],
  },

  {
    id: "automation-ai",
    index: "04",
    verb: "Automate",
    accent: "#34D399",
    output: "Zero-friction operations",
    name: "Business Automation & AI",
    plain: "CRM automation, AI workflows and operations",
    thesis: "Repetitive operations should become infrastructure, not manual workload.",
    body: "Every manual step between two systems is a place where state is lost and time is spent. We map what your team performs by hand, replace the mechanical parts with monitored automation, and keep human judgement exactly where accountability requires it.",
    cta: { label: "Automate an operation", href: "/diagnostic" },
    capabilities: [
      {
        id: "crm-automation",
        name: "CRM Automation",
        short: "CRM Automation",
        icon: "records",
        summary: "A pipeline whose state is written by the system, not by memory.",
        scope: [
          "CRM architecture and field integrity",
          "Lead capture, enrichment and deduplication",
          "Routing, ownership and escalation rules",
          "Stage automation and hygiene enforcement",
          "Two-way sync across the stack",
          "Pipeline reporting that reflects reality",
        ],
      },
      {
        id: "ai-workflows",
        name: "AI Workflows",
        short: "AI Workflows",
        icon: "intelligence",
        summary: "AI applied where judgement is repetitive and evidence is abundant.",
        scope: [
          "Triage and prioritisation of open opportunities",
          "Account briefs assembled from the record",
          "Draft follow-up under human review",
          "Document, proposal and summary generation",
          "Anomaly detection on pipeline movement",
          "Human sign-off at every commitment point",
        ],
      },
      {
        id: "lead-qualification",
        name: "Lead Qualification",
        short: "Lead Qualification",
        icon: "qualify",
        summary: "Fit resolved from behaviour before a human spends an hour on it.",
        scope: [
          "Behavioural scoring from observed intent",
          "Firmographic and fit enrichment",
          "Automated triage and routing",
          "Disqualification paths that are honest",
          "Sales handoff with context attached",
          "Feedback loop from closed-won back to scoring",
        ],
      },
      {
        id: "conversational",
        name: "WhatsApp & DM Automation",
        short: "WhatsApp & DM",
        platform: "whatsapp",
        icon: "message",
        summary: "First contact in the channel the buyer already uses, in minutes not days.",
        scope: [
          "WhatsApp Business API integration",
          "Instagram and LinkedIn DM automation",
          "Intent-triggered response sequences",
          "Human handover with full context",
          "Consent and opt-out handling",
          "Conversation data written back to CRM",
        ],
      },
      {
        id: "operations",
        name: "Internal Operations",
        short: "Internal Operations",
        icon: "workflow",
        summary: "The back-office work nobody was hired to do, removed.",
        scope: [
          "Process mapping across tools and teams",
          "Onboarding and fulfilment workflows",
          "Document and approval routing",
          "Internal notification and alerting",
          "Database and reporting workflows",
          "Failure alerting on every automated path",
        ],
      },
    ],
  },

  {
    id: "data-conversion",
    index: "05",
    verb: "Measure",
    accent: "#60A5FA",
    output: "Proof and correction",
    name: "Data & Conversion Engineering",
    plain: "Analytics, attribution and conversion audits",
    thesis: "Instrument the system before forming an opinion about it.",
    body: "Most businesses measure traffic and call it analytics. We design an event schema against the decisions you actually need to make, reconstruct what users did across device and channel, and produce a diagnosis of where the system loses volume — with the evidence attached.",
    cta: { label: "Audit your funnel", href: "/diagnostic" },
    capabilities: [
      {
        id: "behavioural-telemetry",
        name: "Behavioural Telemetry",
        short: "Analytics",
        icon: "telemetry",
        summary: "What users actually do, captured as typed events rather than pageviews.",
        scope: [
          "Event schema designed against revenue decisions",
          "Server-side and consent-aware collection",
          "Session reconstruction across device and channel",
          "Intent scoring from observed behaviour",
          "Data quality monitoring and alerting",
          "Warehouse and BI integration",
        ],
      },
      {
        id: "attribution",
        name: "Attribution Modelling",
        short: "Attribution",
        icon: "attribution",
        summary: "Revenue traced back to the behaviour that produced it.",
        scope: [
          "First-party identity architecture",
          "Multi-touch and position-based models",
          "Offline and CRM revenue import",
          "Modelled and observed kept in separate columns",
          "Channel and campaign reporting",
          "Budget allocation informed by closed revenue",
        ],
      },
      {
        id: "leakage-analysis",
        name: "Revenue Leakage Analysis",
        short: "Leakage Analysis",
        icon: "leakage",
        summary: "Where volume is lost, isolated to the interaction rather than the page.",
        scope: [
          "Journey reconstruction end to end",
          "Drop-off isolated per handoff",
          "Losses ranked by attached revenue",
          "Failure-mode diagnosis per stage",
          "Prioritised correction sequence",
          "Re-measurement after each fix",
        ],
      },
      {
        id: "conversion-audit",
        name: "Conversion Audits",
        short: "Conversion Audits",
        icon: "audit",
        summary: "A written diagnosis of the system you are running today.",
        scope: [
          "Full stack and process inventory",
          "Tracking and data-integrity audit",
          "Funnel and experience review with evidence",
          "Competitive and expectation alignment",
          "Findings ranked by revenue impact",
          "Implementation sequence your team can execute",
        ],
      },
    ],
  },
];

/** Flat list, for the home page capability index and the footer. */
export const allCapabilities = capabilityCategories.flatMap((c) => c.capabilities);

/**
 * "How can Stark Anchors help me?" answered in the buyer's own words.
 *
 * Every left-hand line is a sentence we have actually heard. Leading with
 * the symptom rather than the service is what lets someone recognise
 * their own situation before they have learned any of our vocabulary.
 */
export const problemRoutes: ProblemRoute[] = [
  {
    id: "traffic-no-convert",
    problem: "My website gets traffic but it doesn’t convert.",
    answer: "Conversion Engineering",
    href: "/services#digital-experience",
  },
  {
    id: "leads-dropped",
    problem: "Leads come in and nobody follows them up properly.",
    answer: "Automation & CRM",
    href: "/services#automation-ai",
  },
  {
    id: "attribution-unclear",
    problem: "Advertising works, but I can’t tell which part.",
    answer: "Data Telemetry & Attribution",
    href: "/services#data-conversion",
  },
  {
    id: "manual-work",
    problem: "My team spends its week on repetitive work.",
    answer: "Operational Automation",
    href: "/services#automation-ai",
  },
  {
    id: "full-presence",
    problem: "We need a complete digital presence, not one piece of it.",
    answer: "Website, Landing Pages, Social & Paid Acquisition",
    href: "/services",
  },
  {
    id: "b2b-pipeline",
    problem: "Our B2B pipeline needs better acquisition.",
    answer: "LinkedIn, Google & CRM Infrastructure",
    href: "/services#acquisition",
  },
];

/**
 * The ecosystem chain shown on the services page. Deliberately the same
 * spine as the home pipeline, one level up: categories rather than
 * stages, so the two diagrams reinforce rather than repeat.
 */
export const ecosystemChain = [
  { id: "infrastructure", label: "Digital Infrastructure", ref: "digital-experience" },
  { id: "acquisition", label: "Traffic Acquisition", ref: "acquisition" },
  { id: "experience", label: "User Experience", ref: "digital-experience" },
  { id: "behaviour", label: "Behavioural Data", ref: "data-conversion" },
  { id: "automation", label: "Automation", ref: "automation-ai" },
  { id: "crm", label: "CRM", ref: "automation-ai" },
  { id: "ai", label: "AI", ref: "automation-ai" },
  { id: "revenue", label: "Revenue", ref: "data-conversion" },
] as const;
