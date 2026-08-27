import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { faqs } from "@/data/faq";

/**
 * FAQ.
 *
 * Native `<details>` rather than a JavaScript accordion: it is
 * keyboard-accessible and screen-reader-correct for free, it works
 * before hydration, and the answers are in the DOM for a crawler
 * whether or not anyone opens them.
 *
 * The marker is replaced with the project's own plus/minus rule pair so
 * the disclosure control matches the hairline language instead of
 * showing a browser triangle.
 */
export function Faq() {
  return (
    <Section surface="veil" id="faq" rule labelledBy="faq-title">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-5">
          <SectionLabel index="06">Questions</SectionLabel>
          <Reveal>
            <h2 id="faq-title" className="t-display-l mt-7 max-w-[12ch]">
              Straight answers.
            </h2>
            <p className="t-lead mt-7 max-w-[32ch]">
              The questions we get asked before anyone signs anything.
            </p>
          </Reveal>
        </div>

        <div className="col-span-12 mt-12 lg:col-span-6 lg:col-start-7 lg:mt-0">
          <div className="border-t border-line">
            {faqs.map((item) => (
              <details key={item.question} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-start gap-5 py-5 [&::-webkit-details-marker]:hidden">
                  <span
                    aria-hidden
                    className="relative mt-[0.7em] h-[9px] w-[9px] shrink-0"
                  >
                    <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-titanium-faint transition-colors group-open:bg-laser" />
                    <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-titanium-faint transition-all group-open:scale-y-0 group-open:bg-laser" />
                  </span>
                  <span className="t-display-s flex-1 text-titanium">
                    {item.question}
                  </span>
                </summary>
                <p className="t-body max-w-[52ch] pb-6 pl-[2.1rem]">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
