import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { PrinciplesSpine } from "../components/PrinciplesSpine";

export function Principles() {
  return (
    <Section id="principles" rule labelledBy="principles-title">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-6">
          <SectionLabel index="02">Principles</SectionLabel>
          <Reveal>
            <h2 id="principles-title" className="t-display-l mt-7 max-w-[14ch]">
              Six standards we hold ourselves to.
            </h2>
          </Reveal>
        </div>

        <div className="col-span-12 mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
          <Reveal delay={0.08}>
            <p className="t-body">
              These are operating commitments, not marketing claims. Each one has a
              cost attached to it, which is what makes it a standard rather than a
              preference.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-16 lg:mt-24">
        <PrinciplesSpine />
      </div>
    </Section>
  );
}
