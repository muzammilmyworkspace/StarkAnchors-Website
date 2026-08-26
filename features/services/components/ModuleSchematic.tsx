"use client";

import { motion } from "framer-motion";
import { EASE_OUT, viewportOnce } from "@/lib/animations/presets";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * MODULE SCHEMATIC
 *
 * A block diagram for each of the three systems: one input, a
 * four-node processing block with cross-links, one output.
 *
 * The shape is deliberately different from the home pipeline. That one
 * is a serpentine route; this is a bipartite module. Reusing the
 * serpentine here would have made the two pages look like the same
 * drawing with different labels — the single most common way a
 * multi-page site collapses into a template.
 *
 * Edges draw in sequence on arrival, then a signal traverses the
 * module once every few seconds. Under reduced motion the schematic is
 * simply drawn, complete and still.
 */

const VIEW_W = 340;
const VIEW_H = 200;

const NODES: { x: number; y: number; anchor: "start" | "middle" | "end" }[] = [
  { x: 20, y: 100, anchor: "start" },   // input
  { x: 130, y: 52, anchor: "middle" },  // block
  { x: 230, y: 52, anchor: "middle" },
  { x: 130, y: 148, anchor: "middle" },
  { x: 230, y: 148, anchor: "middle" },
  { x: 320, y: 100, anchor: "end" },    // output
];

/** [from, to] node indices. Cross-links are what make it a module. */
const EDGES: [number, number][] = [
  [0, 1],
  [0, 3],
  [1, 2],
  [3, 4],
  [1, 4],
  [3, 2],
  [2, 5],
  [4, 5],
];

type ModuleSchematicProps = {
  labels: string[];
  /** Offsets the signal cycle so three modules on one page never pulse together. */
  phase?: number;
};

export function ModuleSchematic({ labels, phase = 0 }: ModuleSchematicProps) {
  const reducedMotion = useReducedMotion();

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="h-auto w-full"
      role="img"
      aria-label={`Module schematic: ${labels.join(", ")}`}
    >
      {/* Frame corners — drafting registration marks rather than a box. */}
      {[
        [4, 4, 1, 0],
        [VIEW_W - 4, 4, -1, 0],
        [4, VIEW_H - 4, 1, 0],
        [VIEW_W - 4, VIEW_H - 4, -1, 0],
      ].map(([x, y, dx], index) => (
        <path
          key={index}
          d={`M ${x} ${y} h ${dx * 10} M ${x} ${y} v ${y < VIEW_H / 2 ? 10 : -10}`}
          stroke="rgba(226,232,240,0.18)"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {/* Edges */}
      {EDGES.map(([from, to], index) => {
        const a = NODES[from];
        const b = NODES[to];
        const cross = (from === 1 && to === 4) || (from === 3 && to === 2);

        return (
          <motion.line
            key={`${from}-${to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={cross ? "rgba(226,232,240,0.17)" : "rgba(226,232,240,0.34)"}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, delay: 0.1 + index * 0.07, ease: EASE_OUT }}
          />
        );
      })}

      {/* Nodes: terminals are diamonds, processing stages are squares. */}
      {NODES.map((node, index) => {
        const terminal = index === 0 || index === NODES.length - 1;
        const output = index === NODES.length - 1;

        return (
          <motion.g
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.07 }}
          >
            {terminal ? (
              <path
                d={`M ${node.x} ${node.y - 6} L ${node.x + 6} ${node.y} L ${node.x} ${node.y + 6} L ${node.x - 6} ${node.y} Z`}
                fill={output ? "var(--laser)" : "rgba(226,232,240,0.8)"}
              />
            ) : (
              <rect
                x={node.x - 3.5}
                y={node.y - 3.5}
                width={7}
                height={7}
                fill="rgba(226,232,240,0.55)"
              />
            )}

            <text
              x={node.x}
              y={node.y + (index === 1 || index === 2 ? -14 : 20)}
              textAnchor={node.anchor}
              fill="rgba(226,232,240,0.45)"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: 1.2,
              }}
            >
              {labels[index]}
            </text>
          </motion.g>
        );
      })}

      {/* One packet, traversing the upper route. */}
      {!reducedMotion && (
        <>
          <path
            id={`module-route-${phase}`}
            d={`M ${NODES[0].x} ${NODES[0].y} L ${NODES[1].x} ${NODES[1].y} L ${NODES[2].x} ${NODES[2].y} L ${NODES[5].x} ${NODES[5].y}`}
            fill="none"
            stroke="none"
          />
          <rect x={-2} y={-2} width={4} height={4} fill="var(--laser)">
            <animateMotion dur="5s" begin={`${1 + phase * 1.4}s`} repeatCount="indefinite">
              <mpath href={`#module-route-${phase}`} />
            </animateMotion>
          </rect>
        </>
      )}
    </svg>
  );
}
