import { ActionLink } from "@/components/ui/Action";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { pricingTiers } from "@/data/pricing";
import { cn } from "@/lib/utils/cn";

const DEPTH_SEGMENTS = 3;

/**
 * ENGINEERING SCOPES
 *
 * Three full-width rows. Not three columns of cards, and specifically
 * not the middle card scaled up with a "Most Popular" ribbon on it.
 *
 * Where a price would sit, there is a depth indicator: three segments,
 * filled according to how deep into the infrastructure the engagement
 * goes. It answers the question the headline actually asks, and it is
 * an honest graphic — there is no figure to publish, because scope is
 * quoted after diagnosis.
 *
 * The recommended tier is marked by a tonal band and a signal rule at
 * its head. That is the entire emphasis treatment.
 */
export function PricingScopes() {
  return (
    <div>
      {pricingTiers.map((tier, index) => (
        <section
          key={tier.id}
          id={tier.id}
          aria-labelledby={`${tier.id}-title`}
          className={cn(
            "scroll-mt-28 border-t border-line",
            tier.emphasis && "bg-slate/55",
          )}
        >
          {/* Signal rule marks the recommended scope. */}
          {tier.emphasis && <div aria-hidden className="h-px bg-laser/50" />}

          <div className="shell py-14 lg:py-20">
            <div className="grid-12">
              {/* Identity */}
              <div className="col-span-12 lg:col-span-4">
                <div className="flex items-baseline gap-5">
                  <span className="t-numeral">{tier.index}</span>
                  {tier.emphasis && (
                    <span className="t-meta-sm text-laser">Recommended</span>
                  )}
                </div>

                <Reveal>
                  <h2
                    id={`${tier.id}-title`}
                    className="t-display-m mt-6 max-w-[14ch] text-titanium"
                  >
                    {tier.name}
                  </h2>
                  <p className="t-body mt-5 max-w-[38ch]">{tier.scope}</p>
                </Reveal>

                {/* Depth indicator */}
                <div className="mt-9">
                  <p className="t-meta-sm text-titanium-faint">
                    Depth <span className="px-1">/</span> {tier.index} of{" "}
                    {String(DEPTH_SEGMENTS).padStart(2, "0")}
                  </p>
                  <div className="mt-3 flex gap-1.5" aria-hidden>
                    {Array.from({ length: DEPTH_SEGMENTS }).map((_, segment) => (
                      <span
                        key={segment}
                        className={cn(
                          "h-1 flex-1",
                          segment <= index ? "bg-laser" : "bg-line-faint",
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Scope of work */}
              <div className="col-span-12 mt-10 lg:col-span-4 lg:col-start-6 lg:mt-0">
                <p className="t-meta-sm border-b border-line pb-3 text-titanium-faint">
                  Scope of Work
                </p>
                <RevealGroup as="ul" className="mt-1" step={0.05}>
                  {tier.includes.map((item) => (
                    <RevealItem
                      key={item}
                      as="li"
                      className="flex gap-4 py-2"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.62em] h-px w-3 shrink-0 bg-titanium-ghost"
                      />
                      <span className="t-body-s text-titanium-dim">{item}</span>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>

              {/* Commercial basis — where a price would be. */}
              <div className="col-span-12 mt-10 lg:col-span-3 lg:col-start-10 lg:mt-0">
                <div className="border-t border-line-bright pt-5">
                  <p className="t-meta-sm text-titanium-faint">Basis</p>
                  <p className="t-display-s mt-3 text-titanium">{tier.basis}</p>
                </div>

                <div className="mt-7 border-t border-line pt-5">
                  <p className="t-meta-sm text-titanium-faint">Engagement</p>
                  <p className="t-body-s mt-2.5 text-titanium-dim">{tier.engagement}</p>
                </div>

                <div className="mt-7 border-t border-line pt-5">
                  <p className="t-meta-sm text-titanium-faint">Suited To</p>
                  <p className="t-body-s mt-2.5 text-titanium-dim">{tier.suited}</p>
                </div>

                <div className="mt-9">
                  <ActionLink
                    href="/diagnostic"
                    variant={tier.emphasis ? "solid" : "inline"}
                  >
                    Scope This
                  </ActionLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
