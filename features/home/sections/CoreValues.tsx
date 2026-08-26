import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ActionLink } from "@/components/ui/Action";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { pillars, valuesIntro } from "@/data/pillars";
import { ValueDiagram } from "@/features/values/components/ValueDiagram";

/**
 * The trust beat in the home journey.
 *
 * Placed after the capabilities and the problem routing, and before the
 * close: by this point a visitor knows what we do and how it applies to
 * them, and the only question left is whether we can be trusted with it.
 *
 * Deliberately the condensed treatment. The full interactive version —
 * with the long argument, the signals and a CTA per principle — lives on
 * the About page, which is where someone asking "who are you" actually
 * goes. Running the long version in both places would be the same
 * content twice, and the second one always reads as padding.
 *
 * Six figures in a row, each stating its principle geometrically. It is
 * the only place on the home page where a shape carries the whole idea.
 */
export function CoreValues() {
  return (
    <Section surface="veil" id="principles" rule labelledBy="values-title">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-6">
          <SectionLabel index="05">{valuesIntro.eyebrow}</SectionLabel>
          <Reveal>
            <h2 id="values-title" className="t-display-l mt-7 max-w-[14ch]">
              {valuesIntro.headline}
            </h2>
          </Reveal>
        </div>

        <div className="col-span-12 mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
          <Reveal delay={0.08}>
            <p className="t-lead">{valuesIntro.body}</p>
          </Reveal>
        </div>
      </div>

      <RevealGroup
        className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3"
        step={0.06}
      >
        {pillars.map((pillar, index) => (
          <RevealItem key={pillar.numeral} as="article">
            <div className="h-20 w-20 border border-line p-2">
              <ValueDiagram index={index} active={false} />
            </div>

            <p className="t-numeral-sm mt-6 text-titanium-ghost">{pillar.numeral}</p>
            <h3 className="t-display-s mt-3 text-titanium">{pillar.title}</h3>
            <p className="t-body mt-3 max-w-[30ch]">{pillar.principle}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
        <p className="t-body-s max-w-[46ch]">
          Each of these carries a cost, which is what makes it a standard rather than
          a preference. The full argument for all six is on the About page.
        </p>
        <ActionLink href="/about#principles" variant="inline">
          Understand how we work
        </ActionLink>
      </div>
    </Section>
  );
}
