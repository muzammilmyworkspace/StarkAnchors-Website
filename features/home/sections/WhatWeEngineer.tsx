import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ActionLink } from "@/components/ui/Action";
import { Reveal } from "@/components/motion/Reveal";
import { GrowthSystemMap } from "../components/GrowthSystemMap";

/**
 * WHAT WE BUILD
 *
 * Kept short on purpose. The section carries eighteen capabilities, and
 * the way it carries them is a diagram — five stages on one rail with
 * their icons — not a column of descriptions. The words here are only
 * enough to frame the graphic.
 */
export function WhatWeEngineer() {
  return (
    <Section surface="veil" id="capabilities" rule labelledBy="capabilities-title">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-7">
          <SectionLabel index="01">What we build</SectionLabel>
          <Reveal>
            <h2 id="capabilities-title" className="t-display-l mt-7 max-w-[16ch]">
              One growth system. Five stages. Eighteen capabilities.
            </h2>
          </Reveal>
        </div>

        <div className="col-span-12 mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
          <Reveal delay={0.08}>
            <p className="t-lead">
              Websites and ads and automation are not separate purchases. They are
              stages of the same machine.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-16 lg:mt-24">
        <GrowthSystemMap />
      </div>

      <div className="mt-12">
        <ActionLink href="/services">See what each stage includes</ActionLink>
      </div>
    </Section>
  );
}
