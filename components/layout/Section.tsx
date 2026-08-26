import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Readability ground.
 *
 * See styles/utilities.css for what each one actually does. The point of
 * having five is that they look different: the field stays visible around
 * content everywhere, but no two consecutive sections calm it the same
 * way, so the page never resolves into a stack of identical panels.
 */
export type Surface = "none" | "veil" | "wash" | "band" | "plate" | "well";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Vertical rhythm. `flush` is for sections that own their own spacing. */
  rhythm?: "default" | "tight" | "flush";
  /** Structural hairline across the top of the section. */
  rule?: boolean;
  /** The readability ground this section sits on. */
  surface?: Surface;
  /** Removes the shell so the section can bleed to the viewport edge. */
  bleed?: boolean;
  labelledBy?: string;
};

const RHYTHM = {
  default: "py-[var(--section-y)]",
  tight: "py-[var(--section-y-tight)]",
  flush: "",
} as const;

const SURFACE: Record<Surface, string> = {
  none: "",
  veil: "surface-veil",
  wash: "surface-wash",
  band: "surface-band",
  plate: "surface-plate",
  well: "surface-well",
};

/**
 * Section wrapper: semantics, vertical rhythm, readability ground and the
 * optional top rule. It intentionally does not lay out its children —
 * composition is the section's own business, which is how the pages avoid
 * inheriting a single repeated shape.
 */
export function Section({
  children,
  id,
  className,
  rhythm = "default",
  rule = false,
  surface = "none",
  bleed = false,
  labelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative", RHYTHM[rhythm], SURFACE[surface], className)}
    >
      {rule && (
        <div aria-hidden className="absolute inset-x-0 top-0 z-[1]">
          <div className="shell">
            <div className="rule" />
          </div>
        </div>
      )}
      {bleed ? children : <div className="shell relative z-[1]">{children}</div>}
    </section>
  );
}
