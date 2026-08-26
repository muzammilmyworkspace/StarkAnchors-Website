import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { thesis } from "@/data/pillars";

/**
 * THE ENGINEERING THESIS
 *
 * A hanging-label layout: the section title sits in the left margin
 * and stays there while the argument runs down the right. It is the
 * oldest editorial structure there is, and it is used here precisely
 * once — the page's other sections are shaped differently so that this
 * one carries weight.
 *
 * The statement is set in the display face at a sentence-case,
 * medium-weight size that appears nowhere else on the site.
 */
export function EngineeringThesis() {
  return (
    <Section surface="veil" id="thesis" rule labelledBy="thesis-title">
      <div className="grid-12">
        {/* Margin label */}
        <div className="col-span-12 lg:col-span-3">
          <div className="lg:sticky lg:top-32">
            <p className="t-meta-sm text-titanium-faint">Section 01</p>
            <h2 id="thesis-title" className="t-display-s mt-3 text-titanium">
              {thesis.eyebrow}
            </h2>
            <div className="rule mt-5 w-12" />
          </div>
        </div>

        {/* Argument */}
        <div className="col-span-12 mt-10 lg:col-span-8 lg:col-start-5 lg:mt-0">
          <Reveal>
            <p className="t-lead max-w-[26ch] text-titanium lg:max-w-[22ch]">
              {thesis.statement}
            </p>
          </Reveal>

          <div className="mt-12 max-w-[62ch] space-y-6">
            {thesis.body.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={index * 0.06}>
                <p className="t-body-l">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
