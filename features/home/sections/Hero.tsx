"use client";

import { motion } from "framer-motion";
import { ActionLink } from "@/components/ui/Action";
import { HeadlineReveal } from "@/components/motion/HeadlineReveal";
import { positioning, site } from "@/data/site";
import { TitleBlock } from "../components/TitleBlock";

/**
 * HERO — SIGNATURE 01
 *
 * The composition is bottom-weighted and asymmetric. Content sits on
 * the lower two thirds of the viewport with the field visible above
 * it, so the first thing read is space and the second is the
 * statement. Nothing is centred.
 *
 * The headline carries the argument through contrast rather than
 * through decoration: the negation is set in ghost ink, the assertion
 * in full titanium, at identical size. No gradient, no glow, no
 * outline text.
 *
 * Bottom right is a drawing title block — discipline, scope, status,
 * document number. It is the detail that fixes the whole page as an
 * engineering document rather than a landing page.
 */
export function Hero() {
  return (
    <section
      className="relative flex min-h-[92svh] flex-col justify-end pb-10 pt-32 lg:min-h-[94svh] lg:pb-14 lg:pt-40"
      aria-labelledby="hero-title"
    >
      <div className="shell">
        {/* Identification strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          // Wraps to two lines on a narrow viewport. The divider is
          // hidden there, because a vertical rule left stranded at the
          // end of a wrapped line reads as a rendering fault.
          className="flex flex-wrap items-center gap-x-4 gap-y-2"
        >
          <span aria-hidden className="h-px w-10 bg-laser" />
          <span className="t-meta text-titanium">{site.name}</span>
          <span aria-hidden className="hidden h-3 w-px bg-line-strong sm:block" />
          <span className="t-meta">{site.discipline}</span>
        </motion.div>

        {/* The statement */}
        <HeadlineReveal
          as="h1"
          lines={[positioning.heroLineOne, positioning.heroLineTwo]}
          mutedLines={[0]}
          delay={0.12}
          className="t-display-xl mt-8 max-w-[17ch] lg:mt-12"
        />

        {/* Support, actions and the title block share one row so that
            the eye travels left-to-right along a single baseline. */}
        <div className="mt-12 grid-12 lg:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 md:col-span-8 lg:col-span-5"
          >
            <p className="t-body-l">{positioning.heroSupport}</p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <ActionLink href="/diagnostic">Initiate Structural Audit</ActionLink>
              <ActionLink href="/services" variant="ghost">
                Explore Ecosystems
              </ActionLink>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="col-span-12 mt-12 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end"
          >
            <TitleBlock />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
