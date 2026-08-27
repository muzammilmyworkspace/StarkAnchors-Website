import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

/**
 * ABOUT — HERO
 *
 * Deliberately not the home hero. That one is bottom-weighted with a
 * title block in the corner; this one is top-aligned and sets its
 * introduction in two columns of editorial text under a full-bleed
 * rule. The page announces itself as a document rather than as an
 * entrance.
 */
export function AboutHero() {
  return (
    <section className="surface-veil relative pb-[var(--section-y-tight)] pt-32 lg:pt-40" aria-labelledby="about-title">
      <div className="shell relative z-[1]">
        <SectionLabel index="00">About</SectionLabel>

        <Reveal>
          <h1 id="about-title" className="t-display-xl mt-8 max-w-[13ch]">
            Built by engineers.
            <br />
            <span className="text-titanium-ghost">Driven by data.</span>
          </h1>
        </Reveal>

        {/* The one photograph on this page. Concrete stair geometry —
            a foundation, shot as structure. It sits full-bleed under the
            headline rather than beside it, so the page opens with type,
            then material, then argument. */}
        <Reveal variant="fade">
          <figure className="relative mt-10 lg:mt-12">
            <div className="relative aspect-[21/9] w-full overflow-hidden">
              <Image
                src="/images/foundation.webp"
                alt="Cast concrete stairs and wall, lit from one side — a structure photographed as a foundation."
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1400px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(13,13,17,0.3) 0%, rgba(13,13,17,0.1) 40%, rgba(13,13,17,0.92) 100%)",
                }}
              />
              <span aria-hidden className="tick" style={{ left: "-3px", top: "-3px" }} />
              <span
                aria-hidden
                className="tick"
                style={{ right: "-3px", bottom: "-3px" }}
              />
            </div>
          </figure>
        </Reveal>

        <div className="rule-strong mt-10 lg:mt-12" />

        {/* Two-column editorial introduction. The measure is narrow on
            purpose — long lines of dim text at full width are the
            fastest way to make a page look unedited. */}
        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
          <Reveal>
            <p className="t-body-l text-titanium">
              Stark Anchors is a business systems engineering group. We are not a
              marketing agency that has learned some automation, and we are not a
              development shop that has learned some marketing.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="t-body">
              We work on the layer underneath both: the instrumentation, the handoffs
              between systems, the data contracts, and the operational logic that
              decides what happens in the minutes after someone shows intent. That
              layer is where most businesses lose money, and it is the layer almost
              nobody is contracted to look at.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
