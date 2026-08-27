import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowRight } from "@/components/ui/icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { problemRoutes } from "@/data/capabilities";
import { SystemsPanel } from "../components/SystemsPanel";

/**
 * FROM PROBLEM TO INFRASTRUCTURE
 *
 * The section that answers "how can this help *me*". Every left-hand
 * line is a sentence a client would actually say, in their words, before
 * they have learned any of our vocabulary. The right-hand side names
 * what answers it and links straight there.
 *
 * The routing device — problem on the left, an arrow, the system on the
 * right — is why this reads as a switchboard rather than as another
 * services list. It is also the only section on the site that leads with
 * the customer's language instead of ours, which is precisely why it
 * earns its place this early in the page.
 *
 * Beside it sits the stack those symptoms occur in, with each platform's
 * own logo. That answers "do you work in my tools?" in a glance — a
 * question the decorative photograph that used to live here could not
 * even attempt.
 */
export function HowWeHelp() {
  return (
    <Section surface="wash" id="how-we-help" rule labelledBy="help-title">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-6">
          <SectionLabel index="02">Application</SectionLabel>
          <Reveal>
            <h2 id="help-title" className="t-display-l mt-7 max-w-[13ch]">
              From problem to infrastructure.
            </h2>
            <p className="t-lead mt-8 max-w-[38ch]">
              Most people arrive describing a symptom rather than a system. That is
              the right place to start — the symptom is where the evidence is.
            </p>
          </Reveal>
        </div>

        {/* Not a photograph. The section is about symptoms inside a
            marketing stack, so the panel names that stack. */}
        <div className="col-span-12 mt-10 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
          <Reveal delay={0.1}>
            <SystemsPanel />
          </Reveal>
        </div>
      </div>

      {/* The switchboard */}
      <RevealGroup className="mt-11 border-t border-line lg:mt-14" step={0.06}>
        {problemRoutes.map((route) => (
          <RevealItem key={route.id} as="div" className="border-b border-line">
            <Link
              href={route.href}
              className="group grid grid-cols-1 items-baseline gap-y-3 py-7 lg:grid-cols-12 lg:gap-6"
            >
              <span className="t-lead col-span-12 text-titanium lg:col-span-6">
                “{route.problem}”
              </span>

              <span
                aria-hidden
                className="hidden text-titanium-ghost transition-colors duration-300 group-hover:text-laser lg:col-span-1 lg:block"
              >
                <ArrowRight className="h-4 w-4" />
              </span>

              <span className="col-span-12 flex items-baseline gap-3 lg:col-span-5">
                <span className="t-display-s text-titanium-dim transition-colors duration-300 group-hover:text-titanium">
                  {route.answer}
                </span>
              </span>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>

      <p className="t-body-s mt-8 max-w-[52ch]">
        If none of these describe your situation, the diagnostic will establish what
        does.{" "}
        <Link
          href="/diagnostic"
          className="text-titanium underline decoration-laser/60 underline-offset-4 transition-colors hover:text-laser"
        >
          Run a diagnostic
        </Link>
        .
      </p>
    </Section>
  );
}
