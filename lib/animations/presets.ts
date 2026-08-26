import type { Transition, Variants } from "framer-motion";

/**
 * Motion primitives.
 *
 * Every animation in the project resolves to one of these. If a
 * component needs a bespoke curve, the curve belongs here first so
 * that the system stays inspectable — and so that "expensive" stays
 * a property of the system rather than of one developer's taste.
 *
 * Rules encoded below:
 *   - no spring, no bounce, no elastic
 *   - one signature ease, used almost everywhere
 *   - motion communicates information arriving, not decoration
 */

/** Signature curve: fast departure, long settle. */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const DUR = {
  instant: 0.12,
  fast: 0.22,
  base: 0.38,
  slow: 0.68,
  glacial: 1.2,
} as const;

export const transition = {
  fast: { duration: DUR.fast, ease: EASE_OUT } satisfies Transition,
  base: { duration: DUR.base, ease: EASE_OUT } satisfies Transition,
  slow: { duration: DUR.slow, ease: EASE_OUT } satisfies Transition,
  glacial: { duration: DUR.glacial, ease: EASE_OUT } satisfies Transition,
} as const;

/**
 * The default arrival: a short rise with opacity. 14px, never more —
 * large translations read as "animated website", small ones read as
 * material settling into place.
 */
export const rise: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: transition.slow },
};

/** Arrival with no vertical movement, for elements inside a diagram. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.base },
};

/**
 * Stagger container. `delayChildren` exists so a section header can
 * land before its body without either element owning a magic number.
 */
export function stagger(step = 0.07, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: step, delayChildren },
    },
  };
}

/**
 * Line drawing lives on the diagrams themselves rather than here.
 * `pathLength` reveals need per-diagram durations — the pipeline draws
 * over 2.2s, a module schematic edge over 0.7s — so a shared variant
 * would only be overridden at every call site.
 */

/**
 * Word-level headline reveal. Used on exactly two headlines site-wide
 * (the home hero and the closing statement) so that it stays a moment
 * rather than a tic.
 */
export const headlineWord: Variants = {
  hidden: { opacity: 0, y: "0.42em" },
  visible: {
    opacity: 1,
    y: "0em",
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};

/**
 * Shared viewport configuration. `once` is always true — replaying a
 * reveal on scroll-up is the single fastest way to make a site feel
 * cheap.
 */
export const viewportOnce = { once: true, amount: 0.25 } as const;
