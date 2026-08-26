import type { Pillar } from "@/types";

/**
 * Six operating principles.
 *
 * These are the standards the engineering group is held to internally.
 * They are written as commitments rather than as marketing claims, and
 * each one carries a cost — which is what makes it a standard and not a
 * preference.
 *
 * `signals` are the concrete things each principle makes us do, and
 * `cta` routes a reader who recognises themselves in one straight to the
 * relevant part of the site. A values section with no exit is a dead
 * section; these are the micro-conversions.
 *
 * The origin of this thinking is philosophical. The language is
 * deliberately kept corporate and technical — the principle should stand
 * on its engineering merit to a reader who shares none of the origin.
 */
export const pillars: Pillar[] = [
  {
    numeral: "I",
    title: "Predictive Telemetry",
    principle: "Measure before you move.",
    body: "A system that cannot be observed cannot be corrected. We instrument first and change second, so that every decision that follows is answerable to evidence rather than to opinion. Forecasting is only credible when the signal underneath it is real.",
    signals: [
      "User behaviour, captured as typed events",
      "Intent read from what people do, not what they say",
      "Attribution traced back to the origin",
      "Patterns surfaced before they become quarters",
    ],
    cta: { label: "See how we diagnose", href: "/#diagnosis" },
  },
  {
    numeral: "II",
    title: "Operational Consistency",
    principle: "The system must behave the same on its worst day.",
    body: "Reliability is not an average. Infrastructure that performs only when it is being watched is not infrastructure. We build for the quiet Tuesday, the holiday week and the moment nobody is monitoring the dashboard.",
    signals: [
      "Repeatable workflows over heroic effort",
      "Automation that reduces operational friction",
      "Defined failure behaviour on every path",
      "Monitoring that reports before a client does",
    ],
    cta: { label: "Explore automation", href: "/services#automation-ai" },
  },
  {
    numeral: "III",
    title: "Strategic Redistribution",
    principle: "Resources should create more resources.",
    body: "Budget, attention and engineering hours are finite. We move them continuously toward the parts of the system that demonstrably produce revenue, and away from the parts that are only defended by habit.",
    signals: [
      "Capital allocated against closed revenue",
      "Technology chosen for leverage, not novelty",
      "Time returned to the people who are scarce",
      "Data reused rather than re-collected",
    ],
    cta: { label: "Explore our systems", href: "/services" },
  },
  {
    numeral: "IV",
    title: "Trust in Established Truths",
    principle: "Do not rebuild what is already solved.",
    body: "Novelty is not a strategy. Where a proven pattern exists — in statistics, in systems design, in commerce — we adopt it and spend our invention where the problem is genuinely unsolved.",
    signals: [
      "Human psychology over platform fashion",
      "Ethical commerce as a design constraint",
      "Proven engineering patterns, adopted not reinvented",
      "Fundamentals that outlast the current toolset",
    ],
    cta: { label: "Read our engineering thesis", href: "/about#thesis" },
  },
  {
    numeral: "V",
    title: "Cross-Cultural Wisdom",
    principle: "Markets are not interchangeable.",
    body: "Buying behaviour, trust signals and channel preference differ by market, and a system tuned in one will fail quietly in another. We design for the buyer who actually exists rather than the one the template assumes.",
    signals: [
      "Market-specific trust and proof requirements",
      "Channel preference read per region, not assumed",
      "Industry context over generic best practice",
      "Lessons carried across sectors and eras",
    ],
    cta: { label: "Explore our thinking", href: "/engineering-logs" },
  },
  {
    numeral: "VI",
    title: "Ultimate Accountability",
    principle: "The engineer owns the outcome.",
    body: "We do not hand over a diagram and call it delivery. What we build is measured against revenue, and where it underperforms, the correction is ours to make. Accountability is the last principle because it holds the other five in place.",
    signals: [
      "Transparency, including when the news is bad",
      "Measurable execution against agreed outcomes",
      "Clear communication at a stated cadence",
      "Named responsibility for what we deploy",
    ],
    cta: { label: "Initiate a conversation", href: "/diagnostic" },
  },
];

export const valuesIntro = {
  eyebrow: "Principles",
  headline: "The principles behind the system.",
  body: "Technology changes. Platforms change. Markets change. Our operating principles do not.",
};

export const thesis = {
  eyebrow: "The Engineering Thesis",
  statement:
    "Growth is not a campaign. Growth is a system — and every system either has an architecture or has an accident.",
  body: [
    "Traditional agencies optimise surfaces. They change the headline, the creative, the bid, the landing page — the visible layer where results are easiest to attribute and easiest to report. That work is not worthless. It is simply the last five per cent of the problem.",
    "Underneath the surface sits the part nobody is contracted to look at: how a visitor’s behaviour is recorded, whether that record reaches the CRM intact, what happens in the eleven minutes after an enquiry arrives, and whether revenue can be traced back to the decision that caused it. That is where growth is actually won or lost.",
    "Stark Anchors investigates infrastructure. We open the system, find where state is dropped, and rebuild the connections that were never engineered in the first place. The surface work still happens — it just happens last, on a foundation that can hold it.",
  ],
};
