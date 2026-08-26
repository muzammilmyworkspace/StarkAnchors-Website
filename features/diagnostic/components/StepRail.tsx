"use client";

import { diagnosticSteps } from "@/data/diagnostic";
import { cn } from "@/lib/utils/cn";

type StepRailProps = {
  current: number;
  /** Highest step reached, so completed steps can be revisited. */
  furthest: number;
  onSelect: (index: number) => void;
};

/**
 * The step index.
 *
 * A vertical rail on desktop and a segmented bar on mobile. Completed
 * steps stay reachable — a six-step form that will not let you go back
 * and correct step two is a form that gets abandoned at step five.
 *
 * The rail reports state the way the rest of the site does: a filled
 * rule for what is done, a signal rule for what is current, and ghost
 * ink for what has not been reached.
 */
export function StepRail({ current, furthest, onSelect }: StepRailProps) {
  return (
    <>
      {/* Desktop rail */}
      <nav aria-label="Diagnostic progress" className="hidden lg:block">
        <p className="t-meta-sm border-b border-line pb-3 text-titanium-faint">
          Sequence
        </p>

        <ol className="mt-2">
          {diagnosticSteps.map((step, index) => {
            const done = index < current;
            const active = index === current;
            const reachable = index <= furthest;

            return (
              <li key={step.id}>
                <button
                  type="button"
                  disabled={!reachable}
                  onClick={() => reachable && onSelect(index)}
                  aria-current={active ? "step" : undefined}
                  className="group flex w-full items-baseline gap-4 py-3.5 text-left disabled:cursor-default"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "mt-[0.5em] h-px shrink-0 transition-all duration-300",
                      active ? "w-6 bg-laser" : done ? "w-4 bg-titanium-faint" : "w-2.5 bg-titanium-ghost",
                    )}
                  />
                  <span
                    className={cn(
                      "t-meta transition-colors duration-200",
                      active
                        ? "text-titanium"
                        : done
                          ? "text-titanium-faint group-hover:text-titanium-dim"
                          : "text-titanium-faint",
                    )}
                  >
                    {step.index}
                    <span className="px-1.5">/</span>
                    {step.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Mobile bar */}
      <div className="lg:hidden">
        <div className="flex items-baseline justify-between">
          <p className="t-meta text-titanium">
            {diagnosticSteps[current].index}
            <span className="px-1.5 text-titanium-faint">/</span>
            {diagnosticSteps[current].title}
          </p>
          <p className="t-meta-sm text-titanium-faint">
            {current + 1} of {diagnosticSteps.length}
          </p>
        </div>

        <div className="mt-4 flex gap-1" aria-hidden>
          {diagnosticSteps.map((step, index) => (
            <span
              key={step.id}
              className={cn(
                "h-0.5 flex-1 transition-colors duration-300",
                index < current ? "bg-titanium-faint" : index === current ? "bg-laser" : "bg-line-faint",
              )}
            />
          ))}
        </div>
      </div>
    </>
  );
}
