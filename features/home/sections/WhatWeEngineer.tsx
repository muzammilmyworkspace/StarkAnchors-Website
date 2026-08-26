import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { ActionLink } from "@/components/ui/Action";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { capabilityCategories } from "@/data/capabilities";
import { positioning } from "@/data/site";

/**
 * THE INFRASTRUCTURE BEHIND GROWTH
 *
 * The commercial answer to the question the old home page left hanging:
 * "yes, but can you actually build my website?"
 *
 * Five categories, eighteen capabilities, all visible without a click.
 * A visitor scanning this for ten seconds should be able to answer every
 * "can they do X" question they arrived with — which is the entire job
 * of this section and the reason it sits immediately after the hero.
 *
 * Composition: each category is a full-width row on the editorial grid,
 * identity hanging in the left margin and the capabilities tiled to the
 * right. Icons appear here and nowhere else on the home page, so the
 * section reads as an index rather than as another prose block.
 */
export function WhatWeEngineer() {
  return (
    <Section surface="veil" id="capabilities" rule labelledBy="capabilities-title">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-7">
          <SectionLabel index="01">Capabilities</SectionLabel>
          <Reveal>
            <h2 id="capabilities-title" className="t-display-l mt-7 max-w-[15ch]">
              The infrastructure behind growth.
            </h2>
          </Reveal>
        </div>

        <div className="col-span-12 mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
          <Reveal delay={0.08}>
            <p className="t-lead">{positioning.engineeringLead}</p>
          </Reveal>
        </div>
      </div>

      <div className="mt-16 lg:mt-24">
        {capabilityCategories.map((category) => (
          <div
            key={category.id}
            className="border-t border-line py-10 last:border-b lg:py-14"
          >
            <div className="grid-12">
              {/* Identity */}
              <div className="col-span-12 lg:col-span-3">
                <Reveal>
                  <p className="t-meta-sm text-titanium-faint">{category.index}</p>
                  <h3 className="t-display-s mt-3 text-titanium">{category.name}</h3>
                  {/* The plain-language name. Positioning is good; making
                      someone decode it to learn we build websites is not. */}
                  <p className="t-body-s mt-2 text-titanium-faint">{category.plain}</p>

                  <Link
                    href={`/services#${category.id}`}
                    className="btn-inline mt-6 inline-flex"
                  >
                    Detail
                  </Link>
                </Reveal>
              </div>

              {/* Capabilities */}
              <RevealGroup
                className="col-span-12 mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:col-span-8 lg:col-start-5 lg:mt-0 xl:grid-cols-3"
                step={0.05}
              >
                {category.capabilities.map((capability) => (
                  <RevealItem key={capability.id} as="div">
                    <span aria-hidden className="block text-titanium-dim">
                      <ServiceIcon name={capability.icon} className="h-6 w-6" />
                    </span>
                    <p className="t-display-s mt-4 text-titanium">{capability.name}</p>
                    <p className="t-body-s mt-2 max-w-[34ch]">{capability.summary}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <ActionLink href="/services" variant="ghost">
          Explore your infrastructure
        </ActionLink>
      </div>
    </Section>
  );
}
