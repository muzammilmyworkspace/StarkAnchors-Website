"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { pillars } from "@/data/pillars";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * SIGNATURE 04 — THE SIX PRINCIPLES
 *
 * A vertical structural progression rather than a list of value cards.
 *
 * Two decisions carry it:
 *
 *   The spine on the left is drawn by scroll position. A dim rule runs
 *   the full height and a signal rule fills it as the reader descends,
 *   so the section reports its own progress — the same telemetry idea
 *   the company sells, applied to the page reading it.
 *
 *   Each principle is indented one step further right than the last.
 *   Over six entries the content drifts three columns across the grid.
 *   It is a staircase, and it is the reason the section reads as a
 *   progression instead of six identical rows.
 *
 * The origin of these principles is philosophical; the treatment is
 * strictly corporate and typographic. No ornament, no iconography.
 */

/**
 * Column start per principle — the staircase.
 *
 * The number is also used to size the horizontal connector that ties
 * each block back to the spine, so the two can never drift apart.
 */
const INDENT = [1, 2, 2, 3, 3, 4];

const COL_START: Record<number, string> = {
  1: "lg:col-start-1",
  2: "lg:col-start-2",
  3: "lg:col-start-3",
  4: "lg:col-start-4",
};

const COL_SPAN: Record<number, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
};

export function PrinciplesSpine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 60%"],
  });

  // Spring-smoothed so the fill glides rather than tracking the wheel
  // step for step. Low stiffness, high damping — no overshoot.
  const progress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative">
      {/* Spine */}
      <div aria-hidden className="absolute inset-y-0 left-0 w-px bg-line-strong">
        <motion.div
          className="h-full w-px origin-top bg-laser"
          style={{
            scaleY: reducedMotion ? 1 : progress,
            opacity: reducedMotion ? 0.3 : 0.85,
          }}
        />
      </div>

      <ol>
        {pillars.map((pillar, index) => (
          <li key={pillar.numeral} className="relative border-t border-line first:border-t-0">
            {/* Node on the spine */}
            <span
              aria-hidden
              className="absolute left-0 top-10 h-2 w-2 -translate-x-1/2 rotate-45 border border-line-bright bg-obsidian lg:top-14"
            />

            <motion.article
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid-12 py-10 pl-7 lg:py-16 lg:pl-0"
            >
              {/* Connector: a hairline from the spine across to wherever
                  this principle has stepped to. It is a grid item, so its
                  width is derived from the same indent value that places
                  the content — the two cannot fall out of sync. Roman I
                  sits on the spine and needs none. */}
              {INDENT[index] > 1 && (
                <span
                  aria-hidden
                  className={`col-start-1 mt-[4.6rem] hidden h-px self-start bg-line lg:block ${COL_SPAN[INDENT[index] - 1]}`}
                />
              )}

              <div className={`col-span-12 lg:col-span-9 ${COL_START[INDENT[index]]}`}>
                <div className="flex items-baseline gap-5">
                  <span className="t-numeral-sm text-titanium-ghost">{pillar.numeral}</span>
                  <span aria-hidden className="h-px flex-1 bg-line" />
                  <span className="t-meta-sm text-titanium-faint">
                    Principle {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="t-display-m mt-6 text-titanium">{pillar.title}</h3>

                <p className="t-statement mt-4 max-w-[30ch] text-titanium-dim">
                  {pillar.principle}
                </p>

                <p className="t-body mt-6 max-w-[62ch]">{pillar.body}</p>
              </div>
            </motion.article>
          </li>
        ))}
      </ol>
    </div>
  );
}
