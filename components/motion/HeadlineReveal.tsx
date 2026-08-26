"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";
import { headlineWord, stagger, viewportOnce } from "@/lib/animations/presets";
import { cn } from "@/lib/utils/cn";

type HeadlineRevealProps = {
  /**
   * Each entry is a line. Lines are broken by hand rather than by the
   * browser, because where a headline breaks is a typographic decision
   * and not something to leave to a container width.
   */
  lines: string[];
  className?: string;
  /** Indices rendered in ghost ink. Carries the visual tension. */
  mutedLines?: number[];
  as?: "h1" | "h2";
  delay?: number;
};

/**
 * Word-level headline arrival.
 *
 * Words rise from behind a clipping mask — the type appears to be
 * revealed by something moving, not to fade in. Used on exactly two
 * headlines site-wide (the home hero and the closing statement) so
 * that it stays a moment rather than a mannerism.
 *
 * The mask is a plain `overflow: hidden` span per word. No filters,
 * no blur, no per-character animation.
 */
export function HeadlineReveal({
  lines,
  className,
  mutedLines = [],
  as: Tag = "h2",
  delay = 0,
}: HeadlineRevealProps) {
  return (
    <Tag className={cn(className)}>
      <motion.span
        className="block"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={stagger(0.055, delay)}
      >
        {lines.map((line, lineIndex) => {
          const words = line.split(" ");

          return (
            <span
              key={line}
              className={cn(
                "block",
                mutedLines.includes(lineIndex) ? "text-titanium-ghost" : "text-titanium",
              )}
            >
              {words.map((word, wordIndex) => (
                <Fragment key={`${word}-${wordIndex}`}>
                  {/* The mask. Bottom padding is pulled back by an equal
                      negative margin, so descenders are not clipped and
                      the line box is unchanged. */}
                  <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
                    <motion.span className="inline-block" variants={headlineWord}>
                      {word}
                    </motion.span>
                  </span>
                  {/* A real text node, so selection and screen readers keep
                      the word boundary that inline-block would eat. */}
                  {wordIndex < words.length - 1 ? " " : null}
                </Fragment>
              ))}
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
