import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Vertical rhythm. `flush` is for sections that own their own spacing. */
  rhythm?: "default" | "tight" | "flush";
  /** Structural hairline across the top of the section. */
  rule?: boolean;
  /**
   * Tonal band. Almost every section is `none`; `slate` is reserved for
   * the two full-bleed technical modules on the home page.
   */
  tone?: "none" | "slate" | "deep";
  /** Removes the shell so the section can bleed to the viewport edge. */
  bleed?: boolean;
  labelledBy?: string;
};

const RHYTHM = {
  default: "py-[var(--section-y)]",
  tight: "py-[var(--section-y-tight)]",
  flush: "",
} as const;

const TONE = {
  none: "",
  slate: "bg-slate/55",
  deep: "bg-obsidian-deep",
} as const;

/**
 * Section wrapper: semantics, vertical rhythm and the optional top
 * rule. It intentionally does not lay out its children — composition
 * is the section's own business, which is how the pages avoid
 * inheriting a single repeated shape.
 */
export function Section({
  children,
  id,
  className,
  rhythm = "default",
  rule = false,
  tone = "none",
  bleed = false,
  labelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative", RHYTHM[rhythm], TONE[tone], className)}
    >
      {rule && (
        <div aria-hidden className="absolute inset-x-0 top-0">
          <div className="shell">
            <div className="rule" />
          </div>
        </div>
      )}
      {bleed ? children : <div className="shell">{children}</div>}
    </section>
  );
}
