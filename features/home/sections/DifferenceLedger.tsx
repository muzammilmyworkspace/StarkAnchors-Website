import { Fragment } from "react";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { comparison, comparisonNote } from "@/data/methodology";
import { toIndex } from "@/lib/utils/format";

/**
 * THE DIFFERENCE — a ledger, not a comparison table.
 *
 * Two operating models set against each other across a narrow central
 * column that carries the row index and the two structural rules. The
 * left column is set in ghost ink and aligned to the divider from the
 * right; the right column is set in full titanium and aligned from the
 * left. Reading pressure builds toward the centre.
 *
 * There are no ticks, no crosses, no green and red. The typographic
 * weight makes the argument, which is both more restrained and more
 * confident than a feature matrix.
 */
export function DifferenceLedger() {
  return (
    <Section id="difference" rule labelledBy="difference-title">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-6">
          <SectionLabel index="04">Difference</SectionLabel>
          <Reveal>
            <h2 id="difference-title" className="t-display-l mt-7 max-w-[13ch]">
              Two operating models.
            </h2>
          </Reveal>
        </div>
        <div className="col-span-12 mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
          <Reveal delay={0.08}>
            <p className="t-body">{comparisonNote}</p>
          </Reveal>
        </div>
      </div>

      {/* Desktop ledger */}
      <RevealGroup
        className="mt-16 hidden grid-cols-[1fr_88px_1fr] md:grid lg:mt-24"
        step={0.06}
      >
        {/* Heads */}
        <RevealItem as="div" className="pb-5 pr-10 text-right">
          <p className="t-meta text-titanium-faint">Traditional Execution</p>
        </RevealItem>
        <RevealItem as="div" className="border-x border-line pb-5" />
        <RevealItem as="div" className="pb-5 pl-10">
          <p className="t-meta text-titanium">Systems Engineering</p>
        </RevealItem>

        {/* Rows. The three cells are emitted as direct grid children —
            a wrapper element would need `display: contents`, which has
            no box and therefore cannot carry the reveal transform. */}
        {comparison.map((row, index) => (
          <Fragment key={row.engineered}>
            <RevealItem
              as="div"
              className="flex items-center justify-end border-t border-line py-7 pr-10 text-right"
            >
              <span className="t-display-s text-titanium-ghost">{row.traditional}</span>
            </RevealItem>

            <RevealItem
              as="div"
              className="flex items-center justify-center border-x border-t border-line py-7"
            >
              <span className="t-meta-sm text-titanium-faint">{toIndex(index + 1)}</span>
            </RevealItem>

            <RevealItem
              as="div"
              className="flex items-center border-t border-line py-7 pl-10"
            >
              <span className="t-display-s text-titanium">{row.engineered}</span>
            </RevealItem>
          </Fragment>
        ))}

        {/* Terminal rules, so the ledger closes rather than stopping. */}
        <div className="border-t border-line" />
        <div className="border-x border-t border-line" />
        <div className="border-t border-line" />
      </RevealGroup>

      {/* Mobile: two stacked registers */}
      <div className="mt-14 space-y-12 md:hidden">
        <div>
          <p className="t-meta border-b border-line pb-4 text-titanium-faint">
            Traditional Execution
          </p>
          <ul className="mt-5 space-y-4">
            {comparison.map((row) => (
              <li key={row.traditional} className="t-display-s text-titanium-ghost">
                {row.traditional}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="t-meta border-b border-laser/40 pb-4 text-titanium">
            Systems Engineering
          </p>
          <ul className="mt-5 space-y-4">
            {comparison.map((row) => (
              <li key={row.engineered} className="t-display-s text-titanium">
                {row.engineered}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
