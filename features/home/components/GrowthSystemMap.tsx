"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CapabilityMark } from "@/components/ui/CapabilityMark";
import { capabilityCategories } from "@/data/capabilities";
import { EASE_OUT, viewportOnce } from "@/lib/animations/presets";

/**
 * THE GROWTH SYSTEM — an infographic, not a paragraph.
 *
 * This section used to be ~300 words of category descriptions and
 * capability summaries. Nobody reads that. It is now five stages on one
 * rail, each carrying a verb, an output and its capability icons — about
 * sixty words total, and the whole offer is legible in a glance.
 *
 * Structure of the argument, read left to right:
 *
 *   Build → Attract → Engage → Automate → Measure → Revenue
 *
 * That sequence is the point. It says these are not five services on a
 * menu but five stages of one system, and it says it with a rail and
 * five columns rather than by asserting it in prose.
 *
 * Capability names are the short, searchable ones — "Websites",
 * "Google Ads", "Dashboards" — because a visitor scanning for whether
 * we do their thing is looking for their word, not our positioning.
 */
export function GrowthSystemMap() {
  return (
    <div>
      {/* ---- The rail: five stages, one path -------------------- */}
      <div className="relative">
        {/* Base rail and its signal, desktop only. On smaller screens
            the stages stack and a horizontal rail would be a lie. */}
        <div aria-hidden className="absolute inset-x-0 top-[46px] hidden h-px bg-line lg:block" />
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-[46px] hidden h-px origin-left lg:block"
          style={{ background: "var(--chromium-fade)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.6, ease: EASE_OUT }}
        />

        <ol className="grid gap-y-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-0">
          {capabilityCategories.map((category, index) => (
            <motion.li
              key={category.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: index * 0.1, ease: EASE_OUT }}
              className="relative lg:pr-4"
            >
              <Link href={`/services#${category.id}`} className="group block">
                {/* Stage index */}
                <span className="t-meta-sm block" style={{ color: category.accent }}>
                  {category.index}
                </span>

                {/* Node, sitting on the rail */}
                <span
                  aria-hidden
                  className="mt-4 hidden h-[11px] w-[11px] rotate-45 lg:block"
                  style={{ background: category.accent }}
                />

                {/* The verb — the largest word in the column */}
                <span className="t-display-m mt-5 block text-titanium lg:mt-7">
                  {category.verb}
                </span>
                <span className="t-body-s mt-2 block text-titanium-faint">
                  {category.output}
                </span>

                {/* Its capabilities, as icons plus the searchable name */}
                <ul className="mt-6 space-y-3">
                  {category.capabilities.map((capability) => (
                    <li key={capability.id} className="flex items-center gap-3">
                      <span aria-hidden className="shrink-0">
                        <CapabilityMark
                          capability={capability}
                          accent={category.accent}
                          className="h-5 w-5"
                        />
                      </span>
                      <span className="t-body-s text-titanium-dim">
                        {capability.short}
                      </span>
                    </li>
                  ))}
                </ul>
              </Link>
            </motion.li>
          ))}

          {/* Terminal: the only output the system is measured against */}
          <motion.li
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="hidden lg:block"
            aria-hidden
          />
        </ol>
      </div>

      {/* Terminal marker, set apart so it reads as the destination
          rather than as a sixth stage. */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="mt-12 flex items-center gap-4 border-t border-line pt-6 lg:mt-16"
      >
        <span aria-hidden className="h-[13px] w-[13px] rotate-45 bg-laser" />
        <span className="t-display-s text-titanium">Revenue</span>
        <span aria-hidden className="h-px flex-1 bg-line" />
        <span className="t-body-s hidden sm:block">
          Every stage above is measured against this one.
        </span>
      </motion.div>
    </div>
  );
}
