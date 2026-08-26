"use client";

import Link from "next/link";
import { useState } from "react";
import { Mark } from "./Mark";
import { cn } from "@/lib/utils/cn";

type LogotypeProps = {
  className?: string;
  /** Symbol only — used below 400px and in the mobile navigation bar. */
  compact?: boolean;
  href?: string;
};

/**
 * The primary lockup: mark, a hairline separator, wordmark.
 *
 * The separator is doing real work — it stops the mark reading as a
 * letterform attached to the word, and it repeats the structural
 * hairline language used everywhere else on the site.
 *
 * The wordmark is set in the display face at a tracking that is wider
 * than the headlines. Institutional marks are set open; headlines are
 * set tight. That contrast is intentional.
 */
export function Logotype({ className, compact = false, href = "/" }: LogotypeProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-3", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-label="Stark Anchors — home"
    >
      <Mark className="h-7 w-7 shrink-0 text-titanium" active={hovered} />

      {!compact && (
        <>
          <span aria-hidden className="h-6 w-px bg-line-strong" />
          <span
            className="font-display text-[0.9375rem] font-extrabold uppercase leading-none text-titanium"
            style={{ letterSpacing: "0.055em" }}
          >
            Stark Anchors
          </span>
        </>
      )}
    </Link>
  );
}
