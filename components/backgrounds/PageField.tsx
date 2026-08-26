"use client";

import dynamic from "next/dynamic";
import { ColumnGrid } from "./ColumnGrid";
import type { FieldVariant } from "@/types";

/**
 * The canvas is loaded on the client only and split into its own
 * chunk. Nothing above the fold depends on it, so it must never sit
 * on the critical path — the page is fully legible and correctly
 * composed before a single node is drawn.
 */
const SystemField = dynamic(
  () => import("./SystemField").then((module) => module.SystemField),
  { ssr: false },
);

type PageFieldProps = {
  variant: FieldVariant;
};

/**
 * THE ENVIRONMENT
 *
 * Seven layers, back to front:
 *
 *   1  obsidian base            (body background)
 *   2  radial light field       one off-centre source, ~4% white
 *   3  architectural grid       static column hairlines
 *   4  the system field         canvas: nodes, edges, signals
 *   5  horizon                  a single gradient anchoring the base
 *   6  grain                    turbulence at 3%
 *   7  content
 *
 * It is fixed rather than scrolled: the page moves through a stable
 * environment instead of dragging a background along with it.
 */
export function PageField({ variant }: PageFieldProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[var(--z-behind)] overflow-hidden"
    >
      <div className="lightfield" />
      <ColumnGrid />

      <div className="absolute inset-0">
        <SystemField variant={variant} />
      </div>

      {/* Horizon: the field dissolves into the base at the bottom of
          the viewport so nodes never appear to be cut off by the fold. */}
      <div
        className="absolute inset-x-0 bottom-0 h-[28vh]"
        style={{
          background:
            "linear-gradient(180deg, rgba(13,13,17,0) 0%, rgba(13,13,17,0.86) 62%, var(--obsidian) 100%)",
        }}
      />

      <div className="grain" />
    </div>
  );
}
