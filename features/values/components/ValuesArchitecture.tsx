"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "@/components/ui/icons";
import { pillars } from "@/data/pillars";
import { EASE_OUT } from "@/lib/animations/presets";
import { cn } from "@/lib/utils/cn";
import { ValueDiagram } from "./ValueDiagram";

/**
 * THE PRINCIPLES — the trust section.
 *
 * Scroll-driven rather than clicked. As the reader descends, the value
 * under the reading band becomes active: its type brightens, its signals
 * resolve, its diagram redraws in the sticky panel and its CTA appears.
 * Nothing needs to be discovered or clicked for the section to work —
 * it responds to the one thing every visitor is already doing.
 *
 * That choice is also about not repeating ourselves: the services page
 * already uses an explicit tab set, and the home page a hover-driven
 * instrument. A third click-target idiom would start to feel like a
 * component library rather than a designed page.
 *
 * Each value ends in its own CTA. A values section that a reader agrees
 * with and then has to scroll past is a dead end; these are the
 * micro-conversions the section exists to create.
 *
 * Mobile drops the sticky panel and reads as a sequence, with each
 * diagram inline above its value.
 */
export function ValuesArchitecture() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (!visible[0]) return;
        const index = itemRefs.current.indexOf(visible[0].target as HTMLLIElement);
        if (index >= 0) setActive(index);
      },
      // A band across the middle of the viewport: a value becomes active
      // when it is the thing being read, not when it first appears.
      { rootMargin: "-38% 0px -46% 0px", threshold: 0 },
    );

    for (const element of itemRefs.current) {
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  const current = pillars[active];

  return (
    <div className="grid-12">
      {/* Sticky instrument — desktop only */}
      <div className="col-span-4 hidden lg:block">
        <div className="sticky top-32">
          <div className="relative aspect-square w-full max-w-[300px] border border-line p-6">
            <span aria-hidden className="tick" style={{ left: "-4px", top: "-4px" }} />
            <span aria-hidden className="tick" style={{ right: "-4px", bottom: "-4px" }} />
            <motion.div
              key={current.numeral}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
              className="h-full w-full"
            >
              <ValueDiagram index={active} active />
            </motion.div>
          </div>

          <div className="mt-6 max-w-[300px]">
            <p className="t-meta text-laser">
              {current.numeral}
              <span className="px-2 text-titanium-ghost">/</span>
              <span className="text-titanium-faint">
                {String(active + 1).padStart(2, "0")} of{" "}
                {String(pillars.length).padStart(2, "0")}
              </span>
            </p>
            <p className="t-display-s mt-3 text-titanium">{current.title}</p>
          </div>

          {/* Progress rail */}
          <div aria-hidden className="mt-6 flex max-w-[300px] gap-1">
            {pillars.map((pillar, index) => (
              <span
                key={pillar.numeral}
                className={cn(
                  "h-0.5 flex-1 transition-colors duration-300",
                  index < active
                    ? "bg-titanium-faint"
                    : index === active
                      ? "bg-laser"
                      : "bg-line-faint",
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* The values */}
      <ol className="col-span-12 lg:col-span-7 lg:col-start-6">
        {pillars.map((pillar, index) => {
          const isActive = index === active;

          return (
            <li
              key={pillar.numeral}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              className="border-t border-line py-10 first:border-t-0 first:pt-0 lg:py-14"
            >
              {/* Inline diagram — mobile only */}
              <div className="mb-7 h-24 w-24 border border-line p-2.5 lg:hidden">
                <ValueDiagram index={index} active />
              </div>

              <div className="flex items-baseline gap-4">
                <span
                  className={cn(
                    "t-numeral-sm transition-colors duration-500",
                    isActive ? "text-laser" : "text-titanium-ghost",
                  )}
                >
                  {pillar.numeral}
                </span>
                <span aria-hidden className="h-px flex-1 bg-line" />
              </div>

              <h3
                className={cn(
                  "t-display-m mt-5 transition-colors duration-500",
                  isActive ? "text-titanium" : "text-titanium-dim",
                )}
              >
                {pillar.title}
              </h3>

              <p className="t-lead mt-3 max-w-[32ch] text-titanium-dim">
                {pillar.principle}
              </p>

              <p className="t-body mt-5 max-w-[56ch]">{pillar.body}</p>

              <ul className="mt-7 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {pillar.signals.map((signal) => (
                  <li key={signal} className="flex gap-3">
                    <span
                      aria-hidden
                      className={cn(
                        "mt-[0.62em] h-px w-3 shrink-0 transition-colors duration-500",
                        isActive ? "bg-laser" : "bg-titanium-ghost",
                      )}
                    />
                    <span className="t-body-s">{signal}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={pillar.cta.href}
                className={cn(
                  "btn-inline mt-8 inline-flex transition-opacity duration-500",
                  isActive ? "opacity-100" : "opacity-70",
                )}
              >
                <span>{pillar.cta.label}</span>
                <ArrowRight className="arrow h-3.5 w-3.5" />
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
