import type { Pillar } from "@/types";

/**
 * Six operating principles. These are the standards the engineering
 * group is held to internally; they are written as commitments, not
 * as marketing claims. Keep the language corporate and technical.
 */
export const pillars: Pillar[] = [
  {
    numeral: "I",
    title: "Predictive Telemetry",
    principle: "Measure before you move.",
    body: "A system that cannot be observed cannot be corrected. We instrument first and change second, so that every decision that follows is answerable to evidence rather than to opinion. Forecasting is only credible when the signal underneath it is real.",
  },
  {
    numeral: "II",
    title: "Operational Consistency",
    principle: "The system must behave the same on its worst day.",
    body: "Reliability is not an average. Infrastructure that performs only when it is being watched is not infrastructure. We build for the quiet Tuesday, the holiday week and the moment nobody is monitoring the dashboard.",
  },
  {
    numeral: "III",
    title: "Strategic Redistribution",
    principle: "Capital follows evidence.",
    body: "Budget, attention and engineering hours are finite. We move them continuously toward the parts of the system that demonstrably produce revenue, and away from the parts that are only defended by habit.",
  },
  {
    numeral: "IV",
    title: "Trust in Established Truths",
    principle: "Do not rebuild what is already solved.",
    body: "Novelty is not a strategy. Where a proven pattern exists — in statistics, in systems design, in commerce — we adopt it and spend our invention where the problem is genuinely unsolved.",
  },
  {
    numeral: "V",
    title: "Cross-Cultural Wisdom",
    principle: "Markets are not interchangeable.",
    body: "Buying behaviour, trust signals and channel preference differ by market, and a system tuned in one will fail quietly in another. We design for the buyer who actually exists rather than the one the template assumes.",
  },
  {
    numeral: "VI",
    title: "Ultimate Accountability",
    principle: "The engineer owns the outcome.",
    body: "We do not hand over a diagram and call it delivery. What we build is measured against revenue, and where it underperforms, the correction is ours to make. Accountability is the last principle because it holds the other five in place.",
  },
];

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
