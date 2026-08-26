import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { serviceSystems } from "@/data/services";
import { ModuleSchematic } from "../components/ModuleSchematic";
import { cn } from "@/lib/utils/cn";

/**
 * THE THREE SYSTEMS
 *
 * Full-width editorial modules, not cards. Each one occupies its own
 * band with a rule above it, a large ghosted numeral hanging in the
 * left margin, and its schematic set opposite the text.
 *
 * The schematic alternates sides across the three modules. That is the
 * only variation applied — alternating is enough to break the rhythm,
 * and doing anything more elaborate to three sibling sections would
 * make them look unrelated rather than parallel.
 */
export function SystemModules() {
  return (
    <div>
      {serviceSystems.map((system, index) => {
        const flipped = index % 2 === 1;

        return (
          <section
            key={system.id}
            id={system.id}
            aria-labelledby={`${system.id}-title`}
            className="scroll-mt-28 border-t border-line py-[var(--section-y)] last:border-b"
          >
            <div className="shell">
              {/* Head: numeral, rule, index */}
              <div className="flex items-baseline gap-6">
                <span className="t-numeral">{system.index}</span>
                <span aria-hidden className="h-px flex-1 bg-line" />
                <span className="t-meta-sm text-titanium-faint">System</span>
              </div>

              <div className="mt-10 grid-12 lg:mt-14">
                {/* Text */}
                <div
                  className={cn(
                    "col-span-12 lg:col-span-6",
                    flipped ? "lg:col-start-7" : "lg:col-start-1",
                  )}
                >
                  <Reveal>
                    <h2 id={`${system.id}-title`} className="t-display-l max-w-[13ch]">
                      {system.name}
                    </h2>
                    <p className="t-statement mt-6 max-w-[30ch] text-titanium-dim">
                      {system.thesis}
                    </p>
                    <p className="t-body-l mt-7 max-w-[52ch]">{system.body}</p>
                  </Reveal>

                  {/* Capabilities: a specification list with hanging
                      rules, not a bulleted feature grid. */}
                  <RevealGroup className="mt-10 border-t border-line">
                    {system.capabilities.map((capability, capabilityIndex) => (
                      <RevealItem
                        key={capability}
                        as="div"
                        className="flex items-baseline gap-5 border-b border-line py-3.5"
                      >
                        <span className="t-meta-sm w-6 shrink-0 text-titanium-faint">
                          {String(capabilityIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="t-body-s text-titanium-dim">{capability}</span>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </div>

                {/* Schematic */}
                <div
                  className={cn(
                    "col-span-12 mt-14 lg:col-span-5 lg:mt-0",
                    flipped ? "lg:col-start-1" : "lg:col-start-8",
                    "lg:self-center",
                  )}
                >
                  <p className="t-meta-sm mb-5 text-titanium-faint">
                    Schematic <span className="px-1">/</span> {system.index}
                  </p>
                  <ModuleSchematic labels={system.nodes} phase={index} />
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
