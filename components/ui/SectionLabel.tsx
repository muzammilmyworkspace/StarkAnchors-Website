import { cn } from "@/lib/utils/cn";

type SectionLabelProps = {
  children: string;
  /** Mono index, e.g. "02". Rendered before the label, ghosted. */
  index?: string;
  className?: string;
  /** Signal-tinted leading rule. Reserve for the section a page is about. */
  active?: boolean;
};

/**
 * The section label — the only shared piece of section furniture.
 *
 * There is deliberately no `SectionHeader` component in this project.
 * A universal header component is exactly what produces
 * eyebrow / headline / paragraph / three cards on every screen. Each
 * section composes its own heading from type classes and this atom, so
 * the page has a visual rhythm rather than a component rhythm.
 */
export function SectionLabel({
  children,
  index,
  className,
  active = false,
}: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        aria-hidden
        className={cn("h-px w-8 shrink-0", active ? "bg-laser" : "bg-line-bright")}
      />
      {index && <span className="t-meta">{index}</span>}
      <span className="t-meta text-titanium-dim">{children}</span>
    </div>
  );
}
