"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * ROUTE SIGNAL
 *
 * A single hairline crosses the top of the viewport on navigation:
 * it draws left-to-right, then retracts to the right. Total duration
 * 620ms, and it never blocks rendering — the incoming page paints
 * underneath it immediately.
 *
 * This is the whole page transition. There is no curtain, no wipe and
 * no "SYSTEM / TRANSITION" interstitial, because a transition that
 * delays content is a transition the visitor pays for on every click.
 * The line reads as state changing; anything heavier reads as loading.
 */
export function SystemTransition() {
  const pathname = usePathname();
  const [sweep, setSweep] = useState(0);
  const first = useRef(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Do not fire on the initial mount — nothing transitioned.
    if (first.current) {
      first.current = false;
      return;
    }
    setSweep((value) => value + 1);
  }, [pathname]);

  if (reducedMotion || sweep === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[var(--z-signal)] h-px"
    >
      <div
        key={sweep}
        className="h-px w-full"
        style={{
          background: "var(--chromium-fade)",
          animation: "sa-sweep 620ms cubic-bezier(0.65, 0, 0.35, 1) forwards",
        }}
      />
    </div>
  );
}

