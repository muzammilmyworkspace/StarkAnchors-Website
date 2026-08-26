import { PageField } from "@/components/backgrounds/PageField";
import { EngageBlock } from "@/components/layout/EngageBlock";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LogIndexList } from "@/features/engineering-logs/components/LogIndexList";
import { logsByDate } from "@/data/logs";
import { buildMetadata, breadcrumbSchema, jsonLd } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Engineering Logs",
  description:
    "Field notes from the infrastructure layer: debugging customer journey leaks, applying AI to B2B sales triage, and building attribution that survives the loss of third-party cookies.",
  path: "/engineering-logs",
});

export default function EngineeringLogsPage() {
  return (
    <>
      <PageField variant="quiet" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Engineering Logs", path: "/engineering-logs" },
          ]),
        )}
      />

      <section className="pb-[var(--section-y-tight)] pt-36 lg:pt-48" aria-labelledby="logs-title">
        <div className="shell">
          <SectionLabel index="00">Archive</SectionLabel>

          <div className="mt-8 grid-12">
            <div className="col-span-12 lg:col-span-7">
              <Reveal>
                <h1 id="logs-title" className="t-display-xl max-w-[11ch]">
                  Engineering Logs
                </h1>
                <p className="t-statement mt-8 max-w-[30ch] text-titanium-dim">
                  Field notes from the infrastructure layer.
                </p>
              </Reveal>
            </div>

            <div className="col-span-12 mt-8 lg:col-span-3 lg:col-start-10 lg:mt-0 lg:self-end">
              <Reveal delay={0.08}>
                <p className="t-body-s">
                  Working notes on problems we keep finding in production systems.
                  Written for the person who has to implement the fix.
                </p>
                <p className="t-meta-sm mt-8 text-titanium-faint">
                  {String(logsByDate.length).padStart(2, "0")} entries
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <div className="shell">
        <LogIndexList entries={logsByDate} />
      </div>

      <EngageBlock
        headline="Reading about it is cheaper than finding it in production."
        body="If any of these describe something happening inside your own stack, the diagnostic will tell you how far it has spread and what it is costing."
        label="Apply"
      />
    </>
  );
}
