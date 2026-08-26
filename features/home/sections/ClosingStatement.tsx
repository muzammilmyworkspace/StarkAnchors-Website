import { ActionLink } from "@/components/ui/Action";
import { HeadlineReveal } from "@/components/motion/HeadlineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { positioning } from "@/data/site";

/**
 * The closing statement.
 *
 * The second and last use of the word-level headline reveal on the
 * site — it opened the page and it closes it, and it appears nowhere
 * in between. The first line is set in ghost ink and the second in
 * titanium, the same contrast device as the hero, so the argument
 * arrives back where it started having been demonstrated in between.
 *
 * One action. No secondary link, no email capture, no repeated nav.
 */
export function ClosingStatement() {
  return (
    <Section
      id="engage"
      rule
      className="pb-[var(--space-11)]"
      labelledBy="closing-title"
    >
      {/* A single signal line entering from the left edge. */}
      <Reveal variant="fade">
        <div className="rule-signal mb-14 w-2/3 lg:mb-20" />
      </Reveal>

      <div className="grid-12">
        <HeadlineReveal
          as="h2"
          lines={[positioning.closingLineOne, positioning.closingLineTwo]}
          mutedLines={[0]}
          className="t-display-xl col-span-12 max-w-[18ch] lg:col-span-9"
        />

        <div className="col-span-12 mt-12 lg:col-span-3 lg:mt-0 lg:self-end">
          <Reveal delay={0.3}>
            <p className="t-body-s mb-7 max-w-[28ch]">
              The diagnostic is the first engineering step, not a sales call. It ends
              with a written assessment either way.
            </p>
            <ActionLink href="/diagnostic">Initiate System Diagnostic</ActionLink>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
