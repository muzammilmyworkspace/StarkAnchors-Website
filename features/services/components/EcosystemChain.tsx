"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ecosystemChain } from "@/data/capabilities";
import { EASE_OUT, viewportOnce } from "@/lib/animations/presets";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * THE ECOSYSTEM
 *
 * Eight links from digital infrastructure through to revenue, drawn as
 * one continuous run. The argument it makes is structural: these are not
 * eight services you can buy separately, they are one path, and a break
 * anywhere on it costs you the whole thing.
 *
 * Deliberately a straight horizontal run rather than the home page's
 * serpentine or the module schematic's block diagram. Same drawing
 * language — hairline, square nodes, one diamond at the terminal — at a
 * higher level of abstraction, so it reads as the summary of the other
 * two rather than as a third unrelated picture.
 *
 * Each node links to the category responsible for it.
 */
export function EcosystemChain() {
  const reducedMotion = useReducedMotion();
  const count = ecosystemChain.length;

  return (
    <div>
      {/* Desktop: one continuous run */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* The rail */}
          <div className="absolute inset-x-0 top-[7px] h-px bg-line" aria-hidden />
          {/* Spans the container by anchoring both edges. An inner
              `100vw` element would extend past the shell gutter and widen
              the page — the rail only ever needs to be as wide as the
              chain it underlines. */}
          <motion.div
            aria-hidden
            className="absolute inset-x-0 top-[7px] h-px origin-left"
            style={{ background: "var(--chromium-fade)" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.8, ease: EASE_OUT }}
          />

          <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}>
            {ecosystemChain.map((link, index) => {
              const terminal = index === count - 1;

              return (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.45, delay: 0.15 + index * 0.09, ease: EASE_OUT }}
                  className="pr-5"
                >
                  <Link href={`#${link.ref}`} className="group block">
                    <span
                      aria-hidden
                      className={
                        terminal
                          ? "block h-[15px] w-[15px] rotate-45 bg-laser"
                          : "mt-[3px] block h-[9px] w-[9px] bg-titanium-dim transition-colors duration-300 group-hover:bg-laser"
                      }
                    />
                    <span className="t-meta-sm mt-5 block text-titanium-faint">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="t-display-s mt-2 block text-titanium-dim transition-colors duration-300 group-hover:text-titanium">
                      {link.label}
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </ol>
        </div>

        {/* One packet, running the whole chain, so the diagram is not
            merely a static row of labels. */}
        {!reducedMotion && (
          <div className="relative mt-8 h-px w-full bg-line">
            <motion.span
              className="absolute -top-[2px] h-[5px] w-[5px] bg-laser"
              initial={{ left: "0%" }}
              animate={{ left: "calc(100% - 5px)" }}
              transition={{ duration: 7, ease: "linear", repeat: Infinity, repeatDelay: 1.5 }}
            />
          </div>
        )}
      </div>

      {/* Mobile: the same chain, read as a descent */}
      <ol className="relative lg:hidden">
        <span aria-hidden className="absolute bottom-3 left-[4px] top-3 w-px bg-line" />
        {ecosystemChain.map((link, index) => {
          const terminal = index === ecosystemChain.length - 1;
          return (
            <li key={link.id} className="relative flex items-center gap-5 py-4 pl-8">
              <span
                aria-hidden
                className={
                  terminal
                    ? "absolute left-0 h-[11px] w-[11px] rotate-45 bg-laser"
                    : "absolute left-[1px] h-[7px] w-[7px] bg-titanium-dim"
                }
              />
              <Link href={`#${link.ref}`} className="flex items-baseline gap-4">
                <span className="t-meta-sm text-titanium-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="t-display-s text-titanium">{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
