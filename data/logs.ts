import type { LogEntry } from "@/types";

/**
 * Engineering Logs — field notes from the infrastructure layer.
 *
 * Content is authored here as typed blocks rather than as markdown so
 * that the article renderer stays a small, predictable component and
 * the archive can move to a CMS later without touching the layout.
 *
 * Nothing in this file may cite a client, a figure or an outcome that
 * has not been independently verified.
 */
export const logs: LogEntry[] = [
  {
    slug: "debugging-customer-journey-leaks",
    logId: "LOG 01",
    title: "Debugging Customer Journey Leaks",
    summary:
      "Most funnels are not underperforming. They are dropping state at handoffs nobody owns.",
    date: "2026-05-14",
    readingMinutes: 8,
    topic: "Behavioural Telemetry",
    body: [
      {
        type: "p",
        text: "When a business tells us conversion is down, the first thing we do is refuse to look at the conversion rate. A rate is a ratio of two numbers, and in almost every system we open, at least one of those numbers is being produced by instrumentation that nobody has audited in two years.",
      },
      {
        type: "p",
        text: "The useful question is not how many visitors converted. It is where, precisely, the system stopped knowing who someone was.",
      },
      {
        type: "h2",
        id: "the-handoff-problem",
        text: "The handoff problem",
      },
      {
        type: "p",
        text: "A customer journey is not a funnel. It is a sequence of handoffs between systems that were bought at different times by different people for different reasons. The ad platform hands off to the website. The website hands off to a form provider. The form provider hands off to an automation tool. The automation tool hands off to the CRM. Each of those boundaries is a place where a piece of context can be dropped silently, and none of them will raise an error when it happens.",
      },
      {
        type: "p",
        text: "Silent is the operative word. A failed payment produces an alert. A lost UTM parameter produces a row in a database that looks completely normal, right up until the point where someone asks which channel produced the deal.",
      },
      {
        type: "figure",
        caption: "State surviving each handoff in an uninstrumented stack.",
        diagram: "handoff",
      },
      {
        type: "h2",
        id: "how-to-find-them",
        text: "How to find them",
      },
      {
        type: "p",
        text: "The technique is unglamorous. You construct a single synthetic journey, tag it with a value you can search for, and then walk it through the entire system by hand — click the ad, land on the page, fill the form, wait for the automation, open the CRM record. At every stop you check whether the tag is still attached.",
      },
      {
        type: "ul",
        items: [
          "Where did the identifier first appear, and in what format",
          "Which system rewrites, truncates or normalises it",
          "What happens on a second visit from the same person on a different device",
          "What the record looks like when a required field arrives empty",
          "Which step is retried on failure, and which one simply gives up",
        ],
      },
      {
        type: "p",
        text: "This takes an afternoon. It routinely finds losses that six months of creative testing would never have surfaced, because creative testing operates on the assumption that the measurement layer underneath it is telling the truth.",
      },
      {
        type: "quote",
        text: "A conversion rate calculated on broken instrumentation is not a low number. It is a fictional one.",
      },
      {
        type: "h2",
        id: "the-repair-order",
        text: "The repair order",
      },
      {
        type: "p",
        text: "Once the leaks are located, the sequencing matters more than the fixes. We repair in the order that restores observability first: identity and attribution before experience, experience before automation, automation before spend. The reason is simple — every repair you make before the system can measure itself is a change whose effect you will not be able to prove.",
      },
      {
        type: "p",
        text: "It is tempting to fix the most visible problem first, because it is the one the business is complaining about. Resist that. The visible problem is usually a symptom appearing three handoffs downstream of the actual fault.",
      },
      {
        type: "h3",
        text: "What good looks like",
      },
      {
        type: "p",
        text: "A journey is debugged when you can take any closed deal in the CRM, and walk backwards from it to the first interaction that produced it, without asking a human to remember anything. If that walk requires a conversation, the system still has a leak — it has just been patched with people.",
      },
    ],
  },

  {
    slug: "infusing-ai-into-b2b-sales",
    logId: "LOG 02",
    title: "Infusing AI Into B2B Sales",
    summary:
      "The value is in triage and recall, not in writing the email. Most deployments get this backwards.",
    date: "2026-06-27",
    readingMinutes: 9,
    topic: "Applied Automation",
    body: [
      {
        type: "p",
        text: "Almost every AI sales deployment we are asked to review starts in the same place: generating outbound copy. It is the most visible application, the easiest to demonstrate, and the one with the lowest return on the effort required to build it.",
      },
      {
        type: "p",
        text: "The expensive problem in B2B sales is not writing. It is that a small team has to decide, continuously and under time pressure, which of forty open conversations deserves the next hour — and then remember the state of every one of them well enough to resume it credibly.",
      },
      {
        type: "h2",
        id: "triage-first",
        text: "Triage first",
      },
      {
        type: "p",
        text: "Triage is a judgement that is repetitive, evidence-rich and reversible. That combination is precisely where a model earns its place. The inputs already exist in the system: what the account looked at, how long the evaluation has been open, who else from that domain has appeared, what was said on the last call, whether the buying committee has grown.",
      },
      {
        type: "p",
        text: "Scoring that consistently, on every account, every morning, is work a human team does badly — not for lack of skill, but because attention is finite and the accounts that shout loudest are rarely the accounts that are closest to signing.",
      },
      {
        type: "ul",
        items: [
          "Rank open opportunities by observed movement, not by age",
          "Surface accounts that have gone quiet after high-intent behaviour",
          "Flag when a new stakeholder from a known domain enters the journey",
          "Detect when a deal has stopped progressing but nobody has marked it lost",
        ],
      },
      {
        type: "h2",
        id: "recall-second",
        text: "Recall second",
      },
      {
        type: "p",
        text: "The second application is institutional memory. A salesperson resuming a conversation after three weeks needs the account state reconstructed — what was promised, what objection was raised, which document was sent, what the technical constraint was. That context exists, scattered across a CRM, a shared inbox and a call recording nobody has time to rewatch.",
      },
      {
        type: "p",
        text: "Assembling it into a two-paragraph brief before the call is a genuine productivity change. It is also low-risk: if the brief is wrong, the human notices immediately, because they were there.",
      },
      {
        type: "figure",
        caption: "Response probability against elapsed time from intent signal.",
        diagram: "decay",
      },
      {
        type: "h2",
        id: "where-not-to-use-it",
        text: "Where not to use it",
      },
      {
        type: "p",
        text: "We keep models out of anything that constitutes a commitment. Pricing, contractual terms, delivery dates, technical guarantees — every one of those is a place where a confident, plausible, wrong answer costs more than the entire automation saved.",
      },
      {
        type: "quote",
        text: "Automate the judgement that is repetitive. Keep the judgement that is accountable.",
      },
      {
        type: "p",
        text: "The practical rule we apply: if being wrong would require a human to apologise on behalf of the company, a human makes the call. Everything upstream of that line is fair game.",
      },
      {
        type: "h3",
        text: "The deployment order",
      },
      {
        type: "p",
        text: "Instrument the pipeline, then score it, then brief against it, then — last, and only if the first three are stable — let the system draft outbound. Teams that invert this order end up with a very fast way to send well-written messages to the wrong accounts.",
      },
    ],
  },

  {
    slug: "the-cookieless-frontier",
    logId: "LOG 03",
    title: "The Cookie-less Frontier",
    summary:
      "Attribution did not disappear. It moved server-side, and it now requires an engineering decision rather than a tag.",
    date: "2026-08-05",
    readingMinutes: 7,
    topic: "Data Architecture",
    body: [
      {
        type: "p",
        text: "The third-party cookie has been declared dead often enough that the announcement has stopped being useful. What matters operationally is narrower: the browser is no longer a reliable place to store identity, and any measurement architecture that assumes otherwise is accumulating a debt it will pay all at once.",
      },
      {
        type: "h2",
        id: "what-actually-broke",
        text: "What actually broke",
      },
      {
        type: "p",
        text: "Not tracking. Continuity. A single visitor arriving on mobile through a social app, returning on desktop two days later and converting through a sales call is three separate strangers to a client-side measurement layer. The conversion is recorded. The path that produced it is not.",
      },
      {
        type: "p",
        text: "This is why so many businesses report that their paid channels stopped working in a period where their revenue did not change. The revenue was fine. The attribution collapsed, and the reporting followed it down.",
      },
      {
        type: "h2",
        id: "the-server-side-shift",
        text: "The server-side shift",
      },
      {
        type: "p",
        text: "The correction is to move the record of truth off the browser and into infrastructure you control. Events are collected server-side, joined against a first-party identifier the business already owns — an account, an email hash, an order — and forwarded to platforms as a deliberate, auditable transmission rather than as a side effect of a script tag.",
      },
      {
        type: "ul",
        items: [
          "One first-party identifier, defined once, owned by the business",
          "Server-side collection with an explicit, versioned event schema",
          "Consent state travelling with the event rather than gating the tag",
          "Platform forwarding treated as an integration, with retries and logging",
          "A modelled layer kept visibly separate from the observed layer",
        ],
      },
      {
        type: "p",
        text: "That last point is the one most often skipped. Platforms will happily model the gap for you. Modelled conversions are useful for bidding and dangerous for board reporting, and the only way to keep both honest is to never let them share a column.",
      },
      {
        type: "figure",
        caption: "Observed versus modelled volume as client-side signal degrades.",
        diagram: "leak",
      },
      {
        type: "h2",
        id: "consent-is-architecture",
        text: "Consent is architecture",
      },
      {
        type: "p",
        text: "Treating consent as a banner is what created most of the technical debt in this area. Consent is a property of the event, not a switch on the page. When it travels with the record, a business can answer regulatory questions and measurement questions with the same data, and can change jurisdiction rules without rebuilding collection.",
      },
      {
        type: "quote",
        text: "If your measurement architecture cannot survive a privacy change, it was never an architecture. It was a configuration.",
      },
      {
        type: "h3",
        text: "The practical position",
      },
      {
        type: "p",
        text: "Build for less signal, not for the restoration of old signal. The direction of travel has been consistent for a decade and there is no version of the next five years in which client-side identity becomes more durable. Systems designed against that assumption keep working. Systems designed around a workaround get rebuilt every time a browser ships a release.",
      },
    ],
  },
];

/** Newest first. The index and the "related" rail both depend on this. */
export const logsByDate = [...logs].sort((a, b) => b.date.localeCompare(a.date));

export function getLog(slug: string): LogEntry | undefined {
  return logs.find((entry) => entry.slug === slug);
}

export function getRelatedLogs(slug: string, limit = 2): LogEntry[] {
  return logsByDate.filter((entry) => entry.slug !== slug).slice(0, limit);
}
