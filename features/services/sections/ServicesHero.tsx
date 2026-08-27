import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { capabilityCategories } from "@/data/capabilities";
import { EcosystemChain } from "../components/EcosystemChain";

/**
 * SERVICES — HERO AND ECOSYSTEM
 *
 * The index has to do two jobs at once: state the positioning, and let
 * someone who arrived searching "landing page developer" find the word
 * they came for inside three seconds. So the categories list both names,
 * and the ecosystem chain underneath makes the structural argument that
 * they are one path rather than a menu.
 */
export function ServicesHero() {
  return (
    <>
      <section
        className="surface-veil relative pb-[var(--section-y-tight)] pt-32 lg:pt-40"
        aria-labelledby="services-title"
      >
        <div className="shell relative z-[1]">
          <SectionLabel index="00">Systems</SectionLabel>

          <div className="mt-8 grid-12">
            <div className="col-span-12 lg:col-span-7">
              <Reveal>
                <h1 id="services-title" className="t-display-xl max-w-[10ch]">
                  Systems Engineering
                </h1>
                <p className="t-lead mt-8 max-w-[42ch] text-titanium">
                  We don’t sell isolated services. We engineer interconnected
                  infrastructure — and every part of it is available on its own.
                </p>
              </Reveal>
            </div>

            {/* Contents. Both names, always. */}
            <nav
              aria-label="Systems index"
              className="col-span-12 mt-12 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end"
            >
              <ul className="border-t border-line">
                {capabilityCategories.map((category) => (
                  <li key={category.id} className="border-b border-line">
                    <a href={`#${category.id}`} className="group block py-4">
                      <span className="flex items-baseline gap-4">
                        <span className="t-meta-sm text-titanium-faint transition-colors group-hover:text-laser">
                          {category.index}
                        </span>
                        <span className="t-body-s flex-1 text-titanium transition-colors group-hover:text-laser">
                          {category.name}
                        </span>
                      </span>
                      <span className="t-body-s mt-1 block pl-9 text-titanium-faint">
                        {category.plain}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <Section surface="wash" rhythm="tight" rule labelledBy="ecosystem-title">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-6">
            <SectionLabel>Ecosystem</SectionLabel>
            <Reveal>
              <h2 id="ecosystem-title" className="t-display-m mt-6 max-w-[18ch]">
                Each capability is a link in one chain.
              </h2>
            </Reveal>
          </div>
          <div className="col-span-12 mt-6 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
            <Reveal delay={0.08}>
              <p className="t-body">
                You can engage any part of this independently. What you cannot do is
                fix one link and expect the chain to hold — which is why we always
                start by finding out which link is failing.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-10 lg:mt-12">
          <EcosystemChain />
        </div>

        <p className="t-body-s mt-10 max-w-[54ch]">
          Not sure which link is yours?{" "}
          <Link
            href="/diagnostic"
            className="text-titanium underline decoration-laser/60 underline-offset-4 transition-colors hover:text-laser"
          >
            Run a diagnostic
          </Link>{" "}
          and we will tell you where the highest-leverage intervention begins.
        </p>
      </Section>
    </>
  );
}
