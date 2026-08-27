import { ActionLink } from "@/components/ui/Action";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";

type EngageBlockProps = {
  /** Kept short — this is a closing line, not a second hero. */
  headline: string;
  body: string;
  action?: string;
  href?: string;
  label?: string;
};

/**
 * The closing block used on every page except the home page, which
 * has its own full-scale statement.
 *
 * It is intentionally quieter than the home closing: display-m rather
 * than display-xl, no headline reveal, no signal rule. A page-ending
 * call to action that shouts as loudly as the page opening is how a
 * site starts to feel like it is asking rather than stating.
 *
 * Each page passes its own copy, so the closing argument is specific
 * to what was just read instead of being one repeated banner.
 */
export function EngageBlock({
  headline,
  body,
  action = "Initiate System Diagnostic",
  href = "/diagnostic",
  label = "Engage",
}: EngageBlockProps) {
  return (
    <Section surface="veil" rhythm="tight" rule className="pb-[var(--space-8)]">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-6">
          <p className="t-meta-sm text-titanium-faint">{label}</p>
          <Reveal>
            <h2 className="t-display-m mt-5 max-w-[16ch] text-titanium">{headline}</h2>
          </Reveal>
        </div>

        <div className="col-span-12 mt-8 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:self-end">
          <Reveal delay={0.06}>
            <p className="t-body max-w-[42ch]">{body}</p>
            <div className="mt-8">
              <ActionLink href={href}>{action}</ActionLink>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
