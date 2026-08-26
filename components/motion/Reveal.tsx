"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { fade, rise, stagger, viewportOnce } from "@/lib/animations/presets";
import { cn } from "@/lib/utils/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds. Use only where the composition needs a reading order. */
  delay?: number;
  /** `rise` is the default arrival; `fade` is for diagram interiors. */
  variant?: "rise" | "fade";
  as?: ElementType;
};

/**
 * The single arrival primitive.
 *
 * Every "element appears as you scroll to it" moment on this site goes
 * through this component. Centralising it is what stops the project
 * accumulating fifteen slightly different fade-ups, and it means the
 * whole site's motion character can be changed from one file.
 *
 * `once` is always true. Reveals that replay on scroll-up are the
 * fastest way to make an expensive site feel like a template.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variant = "rise",
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;
  const variants: Variants = variant === "rise" ? rise : fade;

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  /** Seconds between children. Keep below 0.1 — longer reads as a queue. */
  step?: number;
  delayChildren?: number;
  as?: ElementType;
};

/**
 * Stagger container. Children must be `RevealItem` (or any element
 * carrying the `rise` variants) for the stagger to have anything to
 * orchestrate.
 */
export function RevealGroup({
  children,
  className,
  step = 0.07,
  delayChildren = 0,
  as = "div",
}: RevealGroupProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger(step, delayChildren)}
    >
      {children}
    </MotionTag>
  );
}

type RevealItemProps = {
  /** Optional: structural grid cells are empty by design. */
  children?: ReactNode;
  className?: string;
  as?: ElementType;
};

export function RevealItem({ children, className, as = "div" }: RevealItemProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag className={cn(className)} variants={rise}>
      {children}
    </MotionTag>
  );
}
