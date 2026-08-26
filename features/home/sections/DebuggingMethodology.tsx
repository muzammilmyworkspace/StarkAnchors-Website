import { ActionLink } from "@/components/ui/Action";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { methodology } from "@/data/methodology";

/**
 * WE DEBUG BEFORE WE SCALE — SIGNATURE 04 (methodology architecture)
 *
 * Four operations rendered as a vertical structure, not as four cards.
 * A single spine runs the height of the block with a diamond node at
 * each stage — the same convergence node used in the mark and in the
 * background field, so the brand geometry recurs at three different
 * scales across the site.
 *
 * Hover state is pure CSS (`group-hover`): a laser segment resolves
 * along the spine for the active row and the operation ticks light.
 * No JavaScript, no state, no re-render.
 */
export function DebuggingMethodology() {
  return (
    <Section surface="veil" id="methodology" rule labelledBy="methodology-title">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-6">
          <SectionLabel index="02">Methodology</SectionLabel>
          <Reveal>
            <h2 id="methodology-title" className="t-display-l mt-7 max-w-[12ch]">
              We debug before we scale.
            </h2>
          </Reveal>
        </div>

        <div className="col-span-12 mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
          <Reveal delay={0.08}>
            <p className="t-body">
              Four operations, performed in order. Scale applied before the first three
              are complete does not produce growth — it produces the same failure at a
              higher cost.
            </p>
          </Reveal>
        </div>
      </div>

      {/* The architecture */}
      <div className="relative mt-16 lg:mt-24">
        {/* Spine */}
        <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-line" />

        {methodology.map((pillar) => (
          <article
            key={pillar.id}
            className="group relative border-t border-line py-10 pl-7 last:border-b lg:py-14 lg:pl-16"
          >
            {/* Active spine segment */}
            <span
              aria-hidden
              className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-laser transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
            />

            {/* Node on the spine — the mark's diamond, at 8px */}
            <span
              aria-hidden
              className="absolute left-0 top-10 h-2 w-2 -translate-x-1/2 rotate-45 border border-line-bright bg-obsidian transition-colors duration-300 group-hover:border-laser group-hover:bg-laser lg:top-14"
            />

            <div className="grid-12">
              <div className="col-span-12 lg:col-span-5">
                <Reveal>
                  <p className="t-numeral transition-colors duration-300 group-hover:text-titanium-dim">
                    {pillar.index}
                  </p>
                  <h3 className="t-display-m mt-4 max-w-[14ch] text-titanium">
                    {pillar.title}
                  </h3>
                </Reveal>
              </div>

              <div className="col-span-12 mt-6 lg:col-span-6 lg:col-start-7 lg:mt-0">
                <Reveal delay={0.06}>
                  <p className="t-body-l max-w-[46ch]">{pillar.summary}</p>
                </Reveal>

                <RevealGroup className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {pillar.operations.map((operation) => (
                    <RevealItem key={operation} as="div" className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-[0.6em] h-px w-3 shrink-0 bg-titanium-ghost transition-colors duration-300 group-hover:bg-laser"
                      />
                      <span className="t-body-s text-titanium-dim">{operation}</span>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12">
        <ActionLink href="/diagnostic" variant="inline">
          See how we diagnose
        </ActionLink>
      </div>
    </Section>
  );
}
