"use client";

import { useMediaQuery } from "./useMediaQuery";

/**
 * `prefers-reduced-motion` as a boolean.
 *
 * Framer Motion ships its own hook, but the canvas backgrounds are not
 * Framer-driven and need the same signal — so the whole project reads
 * from one place. Canvas components use it to render a single static
 * frame instead of starting a RAF loop; CSS transitions are separately
 * neutralised in styles/utilities.css.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
