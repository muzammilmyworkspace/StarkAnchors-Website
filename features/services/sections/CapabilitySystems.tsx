import Image from "next/image";
import { ActionLink } from "@/components/ui/Action";
import { CapabilityMark } from "@/components/ui/CapabilityMark";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { capabilityCategories } from "@/data/capabilities";
import { cn } from "@/lib/utils/cn";

/**
 * THE FIVE SYSTEMS, IN FULL.
 *
 * Each category is a band with its own readability ground, and the
 * grounds alternate — veil, plate, veil, plate, veil — so scrolling the
 * page produces a rhythm of tonal change rather than five identical
 * screens. Within a band, the capabilities are set as specification
 * entries: icon, name, one line of recognition, then the actual scope.
 *
 * Not cards. Scope entries are separated by a leading tick and spacing
 * rather than by a rule apiece — a hairline under every line item stops
 * reading as structure and starts reading as noise.
 *
 * One category carries a photograph, and only because it genuinely says
 * something the copy cannot: the physical layer under a digital surface.
 * An image on every band would turn the page into a brochure, and a
 * decorative image is worse than none — it costs load time and credibility
 * to say nothing.
 */

const IMAGERY: Record<string, { src: string; alt: string; caption: string }> = {
  "digital-experience": {
    src: "/images/infrastructure.webp",
    alt: "Rack-mounted servers with structured cabling running to a patch field.",
    caption: "The layer under the surface",
  },
};

export function CapabilitySystems() {
  return (
    <div>
      {capabilityCategories.map((category, index) => {
        const image = IMAGERY[category.id];
        const plate = index % 2 === 1;

        return (
          <section
            key={category.id}
            id={category.id}
            aria-labelledby={`${category.id}-title`}
            className={cn(
              "relative scroll-mt-28 border-t border-line py-[var(--section-y)]",
              plate ? "surface-plate" : "surface-veil",
            )}
          >
            <div className="shell relative z-[1]">
              {/* Head */}
              <div className="grid-12">
                <div className="col-span-12 lg:col-span-7">
                  <div className="flex items-baseline gap-6">
                    <span className="t-numeral" style={{ color: category.accent }}>
                      {category.index}
                    </span>
                    <span aria-hidden className="h-px flex-1 bg-line" />
                  </div>

                  <Reveal>
                    <h2
                      id={`${category.id}-title`}
                      className="t-display-l mt-8 max-w-[15ch]"
                    >
                      {category.name}
                    </h2>
                    {/* The plain name, immediately. Positioning is worth
                        having; making a buyer decode it is not. */}
                    <p className="t-meta mt-5 text-titanium-faint">{category.plain}</p>
                    <p className="t-lead mt-7 max-w-[34ch] text-titanium">
                      {category.thesis}
                    </p>
                  </Reveal>
                </div>

                <div className="col-span-12 mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
                  <Reveal delay={0.08}>
                    <p className="t-body">{category.body}</p>
                    <div className="mt-8">
                      <ActionLink href={category.cta.href} variant="inline">
                        {category.cta.label}
                      </ActionLink>
                    </div>
                  </Reveal>
                </div>
              </div>

              {/* Optional editorial image, run as a wide band under the head */}
              {image && (
                <Reveal variant="fade">
                  <figure className="relative mt-10 lg:mt-12">
                    <div className="relative aspect-[21/8] w-full overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 1400px"
                        className="object-cover"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(13,13,17,0.35) 0%, rgba(13,13,17,0.15) 45%, rgba(13,13,17,0.9) 100%)",
                        }}
                      />
                    </div>
                    <figcaption className="t-meta-sm mt-4 text-titanium-faint">
                      {image.caption}
                    </figcaption>
                  </figure>
                </Reveal>
              )}

              {/* Capabilities */}
              <div className="mt-11 lg:mt-14">
                {category.capabilities.map((capability) => (
                  <div
                    key={capability.id}
                    id={capability.id}
                    className="scroll-mt-28 border-t border-line py-10 last:border-b lg:py-12"
                  >
                    <div className="grid-12">
                      <div className="col-span-12 lg:col-span-4">
                        <Reveal>
                          <span aria-hidden className="block">
                            <CapabilityMark
                              capability={capability}
                              accent={category.accent}
                              className="h-7 w-7"
                            />
                          </span>
                          <h3 className="t-display-m mt-5 max-w-[14ch] text-titanium">
                            {capability.name}
                          </h3>
                          <p className="t-body mt-4 max-w-[36ch]">
                            {capability.summary}
                          </p>
                        </Reveal>
                      </div>

                      <div className="col-span-12 mt-8 lg:col-span-7 lg:col-start-6 lg:mt-0">
                        <p className="t-meta-sm border-b border-line pb-3 text-titanium-faint">
                          Scope
                        </p>
                        <RevealGroup
                          as="ul"
                          className="grid gap-x-10 sm:grid-cols-2"
                          step={0.04}
                        >
                          {capability.scope.map((item) => (
                            <RevealItem key={item} as="li" className="flex gap-4 py-2">
                              <span
                                aria-hidden
                                className="mt-[0.62em] h-px w-3 shrink-0 bg-titanium-ghost"
                              />
                              <span className="t-body-s">{item}</span>
                            </RevealItem>
                          ))}
                        </RevealGroup>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
