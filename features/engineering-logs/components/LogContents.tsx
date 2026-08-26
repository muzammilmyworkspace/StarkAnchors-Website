"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

type Heading = { id: string; text: string };

/**
 * Table of contents with an active-section marker.
 *
 * An IntersectionObserver watches the article headings and reports
 * which one is currently under the header. The rootMargin crops the
 * viewport to a narrow band just below the sticky navigation, so the
 * marker changes when a section actually becomes the thing you are
 * reading — not when it first peeks into view at the bottom.
 */
export function LogContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActive(visible[0].target.id);
      },
      // Band from just under the header to a third up from the bottom.
      { rootMargin: "-112px 0px -66% 0px", threshold: 0 },
    );

    for (const heading of headings) {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Contents">
      <p className="t-meta-sm border-b border-line pb-3 text-titanium-faint">Contents</p>
      <ul className="mt-4 space-y-1">
        {headings.map((heading, index) => {
          const current = heading.id === active;

          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={current ? "true" : undefined}
                className="group flex items-baseline gap-3 py-1.5"
              >
                <span
                  aria-hidden
                  className={cn(
                    "mt-[0.55em] h-px shrink-0 transition-all duration-300",
                    current ? "w-5 bg-laser" : "w-2.5 bg-titanium-ghost",
                  )}
                />
                <span
                  className={cn(
                    "t-body-s transition-colors duration-200",
                    current ? "text-titanium" : "text-titanium-faint group-hover:text-titanium-dim",
                  )}
                >
                  <span className="t-meta-sm mr-2 text-titanium-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {heading.text}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
