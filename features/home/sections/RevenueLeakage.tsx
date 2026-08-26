import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { LeakageInstrument } from "../components/LeakageInstrument";

/**
 * The diagnostic section.
 *
 * Composition: the headline occupies the left seven columns, the
 * framing paragraph is pushed to the right four and dropped to the
 * baseline. The gap between them is not empty space left over — it is
 * the widest measure of negative space on the page, and it is what
 * gives the instrument below room to read as an instrument.
 */
export function RevenueLeakage() {
  return (
    <Section id="diagnosis" rule labelledBy="leakage-title">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-7">
          <SectionLabel index="01">Diagnosis</SectionLabel>
          <Reveal>
            <h2 id="leakage-title" className="t-display-l mt-7 max-w-[15ch]">
              Business growth is often a system failure.
            </h2>
          </Reveal>
        </div>

        <div className="col-span-12 mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
          <Reveal delay={0.08}>
            <p className="t-body">
              Revenue rarely disappears in one place. It is lost in small amounts at
              every boundary between two systems that were never designed to talk to
              each other — and the reporting layer, sitting downstream of all of them,
              is the last thing capable of telling you.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-16 lg:mt-24">
        <LeakageInstrument />
      </div>
    </Section>
  );
}
