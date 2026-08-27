import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pricingPrinciple, pricingTerms } from "@/data/pricing";

/**
 * PRICING — HERO
 *
 * The headline is followed immediately by the reason there is no
 * number on this page. Stating that up front, before the scopes, is
 * the difference between an omission and a position.
 *
 * The terms strip beneath it answers the four commercial questions a
 * buyer would otherwise have to email to ask.
 */
export function PricingHero() {
  return (
    <section className="pb-[var(--section-y-tight)] pt-32 lg:pt-40" aria-labelledby="pricing-title">
      <div className="shell">
        <SectionLabel index="00">Scope</SectionLabel>

        <div className="mt-8 grid-12">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <h1 id="pricing-title" className="t-display-xl max-w-[13ch]">
                Choose the depth of your infrastructure.
              </h1>
            </Reveal>
          </div>

          <div className="col-span-12 mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
            <Reveal delay={0.08}>
              <p className="t-body-l text-titanium">{pricingPrinciple}</p>
            </Reveal>
          </div>
        </div>

        {/* Commercial terms */}
        <dl className="mt-16 grid grid-cols-2 border-t border-line lg:mt-24 lg:grid-cols-4">
          {pricingTerms.map((term, index) => (
            <div
              key={term.label}
              className={`border-b border-line py-5 lg:border-b-0 ${
                index > 0 ? "lg:border-l lg:pl-6" : ""
              } ${index % 2 === 1 ? "border-l pl-5 lg:pl-6" : ""}`}
            >
              <dt className="t-meta-sm text-titanium-faint">{term.label}</dt>
              <dd className="t-body-s mt-2.5 text-titanium">{term.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
