import { cn } from "@/lib/utils/cn";

type MarkProps = {
  className?: string;
  /** Renders the convergence node in signal blue. Used on hover states. */
  active?: boolean;
  /** Set when the mark is the only content of a link with no visible text. */
  title?: string;
};

/**
 * THE STARK ANCHORS MARK
 *
 * Read from the top down:
 *
 *   two stays        distributed inputs — channels, sources, systems
 *   the node         convergence; the point where signal becomes one path
 *   the spine        transfer; load carried down a single structural line
 *   the foundation   the anchor plate; where the load is finally held
 *
 * It is an anchor by structure rather than by illustration — no ship,
 * no rope, no circuitry. Square caps and a 1.7 stroke keep it reading
 * as a technical drawing at large sizes and as a solid silhouette at
 * 16px, where the geometry collapses to four unambiguous strokes.
 *
 * Drawn on a 32-unit grid. Every coordinate is deliberate; changing one
 * without re-checking the 16px rendering will break the favicon.
 */
export function Mark({ className, active = false, title }: MarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("h-8 w-8", className)}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}

      {/* Stays — inputs descending toward convergence. */}
      <path
        d="M5.5 6.5 L16 15 M26.5 6.5 L16 15"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="square"
      />

      {/* Spine — load transferred as one path. */}
      <path
        d="M16 17.4 V25.5"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="square"
      />

      {/* Foundation — the anchor plate. */}
      <path
        d="M7.5 25.5 H24.5"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="square"
      />

      {/* Convergence node. Drawn last so it sits over the stay joins. */}
      <path
        d="M16 12.6 L18.4 15 L16 17.4 L13.6 15 Z"
        fill={active ? "var(--laser)" : "currentColor"}
        style={{ transition: "fill var(--dur-fast) var(--ease-out)" }}
      />
    </svg>
  );
}
