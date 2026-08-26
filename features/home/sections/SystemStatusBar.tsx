import { systemStatus } from "@/data/navigation";
import { cn } from "@/lib/utils/cn";

/**
 * The status strip.
 *
 * A full-bleed instrument row closing the hero: five readouts,
 * separated by structural hairlines rather than sitting in five cards.
 * The indicators respire on staggered delays so the row is never
 * pulsing in unison — synchronised blinking reads as a decoration,
 * offset breathing reads as separate subsystems reporting.
 *
 * These describe this site's own system layer. They are not client
 * metrics and are worded so they cannot be mistaken for any.
 */
export function SystemStatusBar() {
  return (
    <div className="relative border-y border-line">
      <div className="shell">
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {systemStatus.map((item, index) => (
            <li
              key={item.label}
              className={cn(
                "flex items-center gap-3 py-4",
                // Interior dividers only, and only where the grid
                // actually places a neighbour to the left.
                "border-line lg:border-l lg:pl-5",
                index === 0 && "lg:border-l-0 lg:pl-0",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "h-1.5 w-1.5 shrink-0",
                  item.tone === "active" ? "bg-laser" : "bg-titanium-faint",
                )}
                style={{
                  animation:
                    item.tone === "active"
                      ? `sa-respire ${3.2 + index * 0.4}s ease-in-out ${index * 0.35}s infinite`
                      : undefined,
                }}
              />
              <span className="t-meta-sm min-w-0">
                <span className="text-titanium-faint">{item.label}</span>
                <span aria-hidden className="px-1.5 text-titanium-ghost">
                  /
                </span>
                <span className="text-titanium">{item.state}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
