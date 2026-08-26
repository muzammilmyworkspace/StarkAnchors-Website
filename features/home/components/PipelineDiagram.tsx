"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { pipelineStages } from "@/data/pipeline";
import { EASE_OUT, viewportOnce } from "@/lib/animations/presets";

/**
 * SIGNATURE 03 — THE PIPELINE
 *
 * Ten stages on one continuous path. The path serpentines through
 * three runs with 45-degree chamfered corners — the same angular
 * vocabulary the background field snaps its edges to, so the diagram
 * and the environment are visibly the same drawing at different
 * scales.
 *
 * Geometry is fixed in a 1200x560 user space and the container is
 * locked to that aspect ratio, which means HTML labels can be placed
 * over the SVG in exact percentages. Strokes carry
 * `vectorEffect="non-scaling-stroke"` so a hairline stays one physical
 * pixel at every viewport width.
 *
 * Packets are SMIL `animateMotion` bound to the path itself. That is
 * deliberate: the browser interpolates along the geometry off the main
 * thread, there is no per-frame JavaScript, and the packets follow the
 * path exactly at any scale. Under reduced motion they are simply not
 * rendered — the annotated drawing stands on its own.
 */

const VIEW_W = 1200;
const VIEW_H = 580;

/** Chamfered serpentine. Every node coordinate below sits on a run. */
const PATH =
  "M 70 90 L 1046 90 L 1070 114 L 1070 231 L 1046 255 L 344 255 L 320 279 L 320 396 L 344 420 L 1000 420";

/**
 * Node coordinates in user units.
 *
 * Columns are shared between rows on purpose — 04/05 and 07/08 sit in
 * exact vertical alignment, and 06/09 do too. The serpentine reads as
 * a route through a grid rather than as a loose squiggle, which is
 * what stops it looking generated.
 */
const POSITIONS: { x: number; y: number }[] = [
  { x: 70, y: 90 },
  { x: 380, y: 90 },
  { x: 690, y: 90 },
  { x: 1000, y: 90 },
  { x: 1000, y: 255 },
  { x: 690, y: 255 },
  { x: 380, y: 255 },
  { x: 380, y: 420 },
  { x: 690, y: 420 },
  { x: 1000, y: 420 },
];

/**
 * Label slots.
 *
 * Each annotation is given a box that runs from its own node to the
 * next node on the same row, so the labels tile their row and cannot
 * overlap however the drawing is scaled. Free-positioned labels with a
 * fixed character width collide the moment two nodes sit closer
 * together than the text is wide — which is exactly what a fixed
 * `24ch` produced here before.
 */
const SLOTS = POSITIONS.map((node, index) => {
  const rowNeighbours = POSITIONS.map((other, otherIndex) => ({ ...other, otherIndex }))
    .filter((other) => other.y === node.y && other.x > node.x)
    .sort((a, b) => a.x - b.x);

  const left = node.x - 8;
  const right = rowNeighbours.length > 0 ? rowNeighbours[0].x - 8 : VIEW_W;

  return {
    index,
    left: (left / VIEW_W) * 100,
    width: ((right - left) / VIEW_W) * 100,
    top: ((node.y + 24) / VIEW_H) * 100,
  };
});

const PACKET_COUNT = 4;
const PACKET_DURATION = 11;

export function PipelineDiagram() {
  const reducedMotion = useReducedMotion();

  return (
    <div>
      {/* ---------------------------------------------------------- */}
      {/* DESKTOP — the drawing                                       */}
      {/* ---------------------------------------------------------- */}
      <div className="hidden lg:block">
        <div className="relative w-full" style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {/* The route, drawn on arrival. */}
            <motion.path
              id="sa-pipeline-path"
              d={PATH}
              fill="none"
              stroke="rgba(226,232,240,0.22)"
              strokeWidth={1}
              strokeLinecap="square"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 2.2, ease: EASE_OUT }}
            />

            {/* Nodes. Analysis stages are diamonds — the mark's
                convergence form — and everything else is a square. */}
            {pipelineStages.map((stage, index) => {
              const { x, y } = POSITIONS[index];
              const terminal = index === pipelineStages.length - 1;
              const analysis = stage.layer === "intelligence";
              const size = terminal ? 9 : 5;

              return (
                <motion.g
                  key={stage.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.11 }}
                >
                  {analysis || terminal ? (
                    <path
                      d={`M ${x} ${y - size} L ${x + size} ${y} L ${x} ${y + size} L ${x - size} ${y} Z`}
                      fill={terminal ? "var(--laser)" : "rgba(226,232,240,0.75)"}
                    />
                  ) : (
                    <rect
                      x={x - size / 2}
                      y={y - size / 2}
                      width={size}
                      height={size}
                      fill="rgba(226,232,240,0.6)"
                    />
                  )}

                  {/* Terminal receives a survey box so the eye lands on
                      the only output the architecture is measured by. */}
                  {terminal && (
                    <rect
                      x={x - 14}
                      y={y - 14}
                      width={28}
                      height={28}
                      fill="none"
                      stroke="var(--laser)"
                      strokeOpacity={0.4}
                      strokeWidth={1}
                      vectorEffect="non-scaling-stroke"
                    />
                  )}
                </motion.g>
              );
            })}

            {/* Packets. Motion is interpolated by the browser along the
                path geometry — no per-frame JavaScript. */}
            {!reducedMotion &&
              Array.from({ length: PACKET_COUNT }).map((_, index) => (
                <rect
                  key={index}
                  x={-2.5}
                  y={-2.5}
                  width={5}
                  height={5}
                  fill="var(--laser)"
                  opacity={0.9}
                >
                  <animateMotion
                    dur={`${PACKET_DURATION}s`}
                    begin={`${2 + (index * PACKET_DURATION) / PACKET_COUNT}s`}
                    repeatCount="indefinite"
                    rotate="auto"
                  >
                    <mpath href="#sa-pipeline-path" />
                  </animateMotion>
                </rect>
              ))}
          </svg>

          {/* Annotations. Positioned in percentages against the same
              user space, so they track the geometry exactly. */}
          {pipelineStages.map((stage, index) => {
            const slot = SLOTS[index];

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.11, ease: EASE_OUT }}
                className="absolute pr-7"
                style={{
                  left: `${slot.left}%`,
                  width: `${slot.width}%`,
                  top: `${slot.top}%`,
                }}
              >
                <p className="t-meta-sm text-titanium-faint">
                  {stage.index}
                  <span className="px-1.5">·</span>
                  {stage.layer}
                </p>
                <p className="t-display-s mt-1.5 text-titanium">{stage.name}</p>
                <p className="t-body-s mt-1.5 leading-snug">{stage.note}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Key */}
        <div className="mt-6 flex items-center gap-8 border-t border-line pt-4">
          <span className="t-meta-sm flex items-center gap-2.5">
            <span aria-hidden className="h-2 w-2 rotate-45 bg-titanium-dim" />
            Analysis node
          </span>
          <span className="t-meta-sm flex items-center gap-2.5">
            <span aria-hidden className="h-1.5 w-1.5 bg-titanium-dim" />
            Operational node
          </span>
          <span className="t-meta-sm flex items-center gap-2.5">
            <span aria-hidden className="h-1.5 w-1.5 bg-laser" />
            Signal in transit
          </span>
        </div>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* MOBILE — the same ten stages, read as a descent             */}
      {/* ---------------------------------------------------------- */}
      <ol className="relative lg:hidden">
        <span aria-hidden className="absolute bottom-4 left-[3px] top-4 w-px bg-line" />

        {pipelineStages.map((stage, index) => {
          const terminal = index === pipelineStages.length - 1;
          const analysis = stage.layer === "intelligence";

          return (
            <motion.li
              key={stage.id}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
              className="relative flex gap-5 pb-8 pl-7 last:pb-0"
            >
              <span
                aria-hidden
                className={
                  analysis || terminal
                    ? `absolute left-0 top-1.5 h-[7px] w-[7px] rotate-45 ${terminal ? "bg-laser" : "bg-titanium-dim"}`
                    : "absolute left-[1px] top-1.5 h-[5px] w-[5px] bg-titanium-faint"
                }
              />
              <div className="min-w-0">
                <p className="t-meta-sm text-titanium-faint">
                  {stage.index}
                  <span className="px-1.5">·</span>
                  {stage.layer}
                </p>
                <p className="t-display-s mt-1.5 text-titanium">{stage.name}</p>
                <p className="t-body-s mt-1.5">{stage.note}</p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
