/**
 * Frequently asked questions.
 *
 * These are commercial questions with direct answers, not a keyword
 * exercise. They exist for two reasons: a buyer comparing agencies has
 * exactly these questions and currently has to email to get them
 * answered, and the same content earns an FAQ rich result in search.
 *
 * Answers stay inside the same honesty constraint as the rest of the
 * site: no invented figures, no invented clients, no promised outcomes.
 */
export type FaqItem = { question: string; answer: string };

export const faqs: FaqItem[] = [
  {
    question: "Do you build websites, or only run marketing?",
    answer:
      "Both, and they are the same job. We build websites, landing pages and dashboards, and we run acquisition across Meta, Google, YouTube and LinkedIn. Most agencies do one or the other, which is why the handoff between them is where results are usually lost.",
  },
  {
    question: "Can I hire you for just one thing — for example only Google Ads?",
    answer:
      "Yes. Every capability is available on its own. We will tell you honestly if the thing you asked for is not the thing costing you money — for instance, running more traffic into a page that does not convert is a way to spend faster, not to earn more.",
  },
  {
    question: "How does an engagement start?",
    answer:
      "With a diagnostic. You describe your current infrastructure and where you suspect revenue is leaking, and we produce a written assessment of the system you are actually running, with findings ranked by the revenue attached to them. Scope and price are quoted after that, not before.",
  },
  {
    question: "Why is there no pricing on the site?",
    answer:
      "Because the correct number depends on the architecture we find, and quoting before diagnosis is how scope ends up wrong in both directions. Engagements are fixed-scope, retained, or custom for multi-market programmes. Every one is quoted in writing before work begins.",
  },
  {
    question: "How do you use AI?",
    answer:
      "Where judgement is repetitive and evidence is abundant: triage of open opportunities, account briefs assembled from the record, drafted follow-up, anomaly detection on pipeline movement. We keep models out of pricing, contractual terms and delivery commitments, where a confident wrong answer costs more than the automation saves.",
  },
  {
    question: "Do you work with businesses outside your own market?",
    answer:
      "Yes. Buying behaviour, trust signals and channel preference differ by market, so we design for the buyer who actually exists in yours rather than porting a template. Contact is by email or WhatsApp and engagements run remotely.",
  },
  {
    question: "How long before we see results?",
    answer:
      "It depends on what is broken, and anyone who answers this with a number before seeing your system is guessing. Instrumentation and diagnosis take weeks rather than months; fixes to tracking and follow-up speed usually show first because they are the fastest-acting. We report against revenue, monthly.",
  },
  {
    question: "What happens to the work if we stop working together?",
    answer:
      "It is yours. Accounts, code, data and documentation are in your name and handed over. We build systems your team can operate, and the handover is part of the scope rather than a negotiation at the end.",
  },
];
