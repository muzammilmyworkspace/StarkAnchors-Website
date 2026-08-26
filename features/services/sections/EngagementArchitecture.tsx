import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { ArchitectureStepper } from "../components/ArchitectureStepper";

export function EngagementArchitecture() {
  return (
    <Section
      id="architecture"
      tone="slate"
      className="border-b border-line"
      labelledBy="architecture-title"
    >
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-6">
          <SectionLabel index="04" active>
            Architecture
          </SectionLabel>
          <Reveal>
            <h2 id="architecture-title" className="t-display-l mt-7 max-w-[13ch]">
              How an engagement is built.
            </h2>
          </Reveal>
        </div>

        <div className="col-span-12 mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
          <Reveal delay={0.08}>
            <p className="t-body">
              Seven stages, run in order. The sequence exists because every stage
              depends on the honesty of the one before it — and because scale applied
              early is the most expensive mistake available.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-16 lg:mt-24">
        <ArchitectureStepper />
      </div>
    </Section>
  );
}
