import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { valuesIntro } from "@/data/pillars";
import { ValuesArchitecture } from "@/features/values/components/ValuesArchitecture";

/**
 * The principles, in full.
 *
 * This is the canonical treatment: the complete argument for each of the
 * six, the concrete signals each one produces, a diagram that redraws as
 * you read, and a CTA per principle routing to the part of the site that
 * demonstrates it. The home page carries a condensed version of the same
 * six and links here.
 */
export function Principles() {
  return (
    <Section surface="veil" id="principles" rule labelledBy="principles-title">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-6">
          <SectionLabel index="02">{valuesIntro.eyebrow}</SectionLabel>
          <Reveal>
            <h2 id="principles-title" className="t-display-l mt-7 max-w-[14ch]">
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

      <div className="mt-11 lg:mt-14">
        <ValuesArchitecture />
      </div>
    </Section>
  );
}
