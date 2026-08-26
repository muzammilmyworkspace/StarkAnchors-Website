"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { leakageNote, leakageStages } from "@/data/leakage";
import { EASE_OUT, viewportOnce } from "@/lib/animations/presets";
import { cn } from "@/lib/utils/cn";

/**
 * SIGNATURE 02 — THE REVENUE LEAKAGE INSTRUMENT
 *
 * A tapering flow band: volume enters at full width on the left and is
 * progressively lost across seven stages. The shape is the argument —
 * you can see the system failing before you read a word of it.
 *
 * Construction notes:
 *
 *   The filled band lives in one SVG with `preserveAspectRatio="none"`
 *   so it stretches to any container width. It contains fills only —
 *   no strokes — because non-uniform scaling would distort stroke
 *   weight and destroy the hairline discipline used everywhere else.
 *
 *   Every line, tick, label and hit target is HTML positioned in
 *   percentages over the top. That keeps all one-pixel rules exactly
 *   one pixel at every viewport.
 *
 * Interaction: hovering or focusing a stage isolates its slab, marks
 * its boundary, and resolves the reading below. Nothing moves, nothing
 * scales, nothing glows — the instrument selects.
 */

const VIEW_W = 1200;
const VIEW_H = 300;
const COUNT = leakageStages.length;
const COL = VIEW_W / COUNT;

/** Linear interpolation of retention across the stage centres. */
function retentionAt(x: number): number {
  const position = x / COL - 0.5;
  const lower = Math.floor(position);
  const upper = lower + 1;

  if (lower < 0) return leakageStages[0].retention;
  if (upper > COUNT - 1) return leakageStages[COUNT - 1].retention;

  const t = position - lower;
  return (
    leakageStages[lower].retention +
    (leakageStages[upper].retention - leakageStages[lower].retention) * t
  );
}

export function LeakageInstrument() {
  const [active, setActive] = useState<number | null>(null);

  /** One trapezoid per stage, spanning its column. */
  const slabs = useMemo(
    () =>
      leakageStages.map((_, index) => {
        const x0 = index * COL;
        const x1 = (index + 1) * COL;
        const y0 = VIEW_H - retentionAt(x0) * VIEW_H;
        const y1 = VIEW_H - retentionAt(x1) * VIEW_H;
        return `M${x0} ${y0} L${x1} ${y1} L${x1} ${VIEW_H} L${x0} ${VIEW_H} Z`;
      }),
    [],
  );

  const reading = active === null ? null : leakageStages[active];

  return (
    <div>
      {/* ---------------------------------------------------------- */}
      {/* DESKTOP — the band                                          */}
      {/* ---------------------------------------------------------- */}
      <div className="hidden lg:block">
        <div className="relative h-[clamp(240px,24vw,320px)] w-full">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {slabs.map((d, index) => {
              const isActive = active === index;
              const dimmed = active !== null && !isActive;

              return (
                <motion.path
                  key={leakageStages[index].id}
                  d={d}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.5, delay: index * 0.06, ease: EASE_OUT }}
                  fill={isActive ? "rgba(0,229,255,0.18)" : "rgba(226,232,240,0.075)"}
                  style={{
                    opacity: dimmed ? 0.35 : 1,
                    transition: "fill 240ms var(--ease-out), opacity 240ms var(--ease-out)",
                  }}
                />
              );
            })}
          </svg>

          {/* The surviving-volume edge, drawn as a real hairline. */}
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <motion.polyline
              points={leakageStages
                .map(
                  (stage, index) =>
                    `${(index + 0.5) * COL},${VIEW_H - stage.retention * VIEW_H}`,
                )
                .join(" ")}
              fill="none"
              stroke="rgba(226,232,240,0.6)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.6, ease: EASE_OUT }}
            />
          </svg>

          {/* Overlay: dividers, hit targets, stage marks. */}
          <div className="absolute inset-0 grid grid-cols-7">
            {leakageStages.map((stage, index) => {
              const isActive = active === index;

              return (
                <button
                  key={stage.id}
                  type="button"
                  className="group relative h-full border-l border-line text-left first:border-l-0 focus-visible:outline-offset-[-2px]"
                  onClick={() => setActive(isActive ? null : index)}
                  onMouseEnter={() => setActive(index)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(index)}
                  onBlur={() => setActive(null)}
                  aria-describedby="leakage-reading"
                  aria-pressed={isActive}
                >
                  <span className="sr-only">
                    {stage.name} — {stage.role}
                  </span>

                  {/* Boundary marker, resolves on selection. */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-y-0 left-0 w-px transition-colors duration-200",
                      isActive ? "bg-laser" : "bg-transparent",
                    )}
                  />

                  {/* Node on the surviving edge. */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 transition-colors duration-200",
                      isActive ? "bg-laser" : "bg-titanium-faint",
                    )}
                    style={{ top: `${(1 - stage.retention) * 100}%` }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Baseline and stage index */}
        <div className="rule-strong" />
        <div className="grid grid-cols-7">
          {leakageStages.map((stage, index) => {
            const isActive = active === index;
            const loss =
              index === 0 ? 0 : leakageStages[index - 1].retention - stage.retention;

            return (
              <div
                key={stage.id}
                className={cn(
                  "border-l border-line px-4 pt-4 transition-opacity duration-200 first:border-l-0 first:pl-0",
                  active !== null && !isActive && "opacity-40",
                )}
              >
                {/* Loss tick: the volume this stage did not pass on.
                    It hangs inside a fixed-height well, so a taller tick
                    never pushes its stage label off the shared baseline.
                    The ticks vary; the type does not. */}
                <span aria-hidden className="block h-8">
                  <span
                    className={cn(
                      "block w-0.5 transition-colors duration-200",
                      isActive ? "bg-laser" : "bg-titanium-ghost",
                    )}
                    style={{ height: `${Math.max(loss * 90, 2)}px` }}
                  />
                </span>
                <p
                  className={cn(
                    "t-meta-sm mt-3 transition-colors duration-200",
                    isActive ? "text-laser" : "text-titanium-faint",
                  )}
                >
                  {stage.index}
                </p>
                <p
                  className={cn(
                    "t-display-s mt-2 transition-colors duration-200",
                    isActive ? "text-titanium" : "text-titanium-dim",
                  )}
                >
                  {stage.name}
                </p>
              </div>
            );
          })}
        </div>

        {/* Reading */}
        <div
          id="leakage-reading"
          aria-live="polite"
          className="mt-10 grid-12 border-t border-line pt-8"
        >
          <div className="col-span-4">
            <p className="t-meta">
              {reading ? (
                <>
                  Stage <span className="t-faint">/</span>{" "}
                  <span className="text-laser">{reading.index}</span>
                </>
              ) : (
                "Diagnostic / Idle"
              )}
            </p>
            <p className="t-display-m mt-3 text-titanium">
              {reading ? reading.name : "Select a stage"}
            </p>
            <p className="t-body-s mt-3 max-w-[34ch]">
              {reading ? reading.role : leakageNote}
            </p>
          </div>

          <div className="col-span-7 col-start-6 self-end">
            <p className="t-meta-sm text-titanium-faint">Observed Failure Mode</p>
            <p className="t-body mt-3 min-h-[5.5rem] text-titanium-dim">
              {reading
                ? reading.failure
                : "Move across the stages to read the failure mode we look for at each handoff. The narrowing band is the shape of an uninstrumented system: every boundary loses volume, and none of them raise an error when they do."}
            </p>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* MOBILE — the same instrument, read vertically               */}
      {/* ---------------------------------------------------------- */}
      <div className="lg:hidden">
        <ul className="border-t border-line">
          {leakageStages.map((stage, index) => {
            const isOpen = active === index;

            return (
              <li key={stage.id} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setActive(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`leak-${stage.id}`}
                  className="w-full py-5 text-left"
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className={cn(
                        "t-meta-sm shrink-0",
                        isOpen ? "text-laser" : "text-titanium-faint",
                      )}
                    >
                      {stage.index}
                    </span>
                    <span className="t-display-s flex-1 text-titanium">{stage.name}</span>
                    <span className="t-meta-sm shrink-0 text-titanium-faint">
                      {Math.round(stage.retention * 100)}
                    </span>
                  </div>

                  {/* Retention bar — the band, one stage at a time. */}
                  <span aria-hidden className="mt-3 block h-1 w-full bg-line-faint">
                    <motion.span
                      className={cn("block h-1", isOpen ? "bg-laser" : "bg-titanium-ghost")}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: stage.retention }}
                      viewport={viewportOnce}
                      transition={{ duration: 0.8, delay: index * 0.05, ease: EASE_OUT }}
                      style={{ transformOrigin: "left" }}
                    />
                  </span>
                </button>

                {isOpen && (
                  <div id={`leak-${stage.id}`} className="pb-6">
                    <p className="t-body-s text-titanium-dim">{stage.role}</p>
                    <p className="t-meta-sm mt-4 text-titanium-faint">Failure Mode</p>
                    <p className="t-body-s mt-2">{stage.failure}</p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <p className="t-body-s mt-6">{leakageNote}</p>
      </div>
    </div>
  );
}
