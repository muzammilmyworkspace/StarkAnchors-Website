import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { serviceSystems } from "@/data/services";

/**
 * SERVICES — HERO
 *
 * A third hero shape. The home page is bottom-weighted, About is
 * top-aligned editorial; this one puts the headline against a right
 * column that indexes the three systems, so the page contents are
 * legible before a single scroll.
 */
export function ServicesHero() {
  return (
    <section className="pb-[var(--section-y-tight)] pt-36 lg:pt-48" aria-labelledby="services-title">
      <div className="shell">
        <SectionLabel index="00">Systems</SectionLabel>

        <div className="mt-8 grid-12">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <h1 id="services-title" className="t-display-xl max-w-[10ch]">
                Systems Engineering
              </h1>
              <p className="t-statement mt-8 max-w-[34ch] text-titanium-dim">
                We don’t sell isolated services. We engineer interconnected
                infrastructure.
              </p>
            </Reveal>
          </div>

          {/* Index of the three systems — a contents page, set as an
              instrument readout rather than as anchor-link chips. */}
          <nav
            aria-label="Systems index"
            className="col-span-12 mt-12 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end"
          >
            <ul className="border-t border-line">
              {serviceSystems.map((system) => (
                <li key={system.id} className="border-b border-line">
                  <a
                    href={`#${system.id}`}
                    className="group flex items-baseline gap-4 py-4 transition-colors"
                  >
                    <span className="t-meta-sm text-titanium-faint transition-colors group-hover:text-laser">
                      {system.index}
                    </span>
                    <span className="t-body-s flex-1 text-titanium-dim transition-colors group-hover:text-titanium">
                      {system.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
