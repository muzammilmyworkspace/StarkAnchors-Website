import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { PipelineDiagram } from "../components/PipelineDiagram";

/**
 * The pipeline section.
 *
 * This is the one place on the home page that becomes a tonal band.
 * Everything before and after it sits on obsidian; here the surface
 * lifts to slate and the section runs edge to edge. The change of
 * ground is what signals "this is the technical exhibit" without a
 * badge, a border or a heading that says so.
 */
export function PipelineArchitecture() {
  return (
    <Section
      id="pipeline"
      tone="slate"
      className="border-y border-line"
      labelledBy="pipeline-title"
    >
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-7">
          <SectionLabel index="03" active>
            Architecture
          </SectionLabel>
          <Reveal>
            <h2 id="pipeline-title" className="t-display-l mt-7 max-w-[16ch]">
              Full-stack architecture. No fragmented execution.
            </h2>
          </Reveal>
        </div>

        <div className="col-span-12 mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
          <Reveal delay={0.08}>
            <p className="t-body">
              One path from first impression to closed revenue. Every node on it is
              instrumented, every handoff is defined, and there is exactly one place
              the whole thing is measured.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-16 lg:mt-24">
        <PipelineDiagram />
      </div>
    </Section>
  );
}
