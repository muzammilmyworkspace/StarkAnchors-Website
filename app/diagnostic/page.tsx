import { PageField } from "@/components/backgrounds/PageField";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DiagnosticPortal } from "@/features/diagnostic/components/DiagnosticPortal";
import { diagnosticIntro } from "@/data/diagnostic";
import { site } from "@/data/site";
import { buildMetadata, breadcrumbSchema, jsonLd } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "System Diagnostic",
  description:
    "Begin a Stark Anchors engagement with a structural diagnostic. Six steps describing your infrastructure, revenue leakage and automation objectives. Response within 24 hours.",
  path: "/diagnostic",
});

/**
 * DIAGNOSTIC PORTAL
 *
 * The background moves to the `telemetry` variant — the sparsest node
 * count on the site but the highest signal rate, so the environment is
 * visibly instrumented while the visitor is being asked to describe
 * their own instrumentation.
 */
export default function DiagnosticPage() {
  return (
    <>
      <PageField variant="telemetry" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "System Diagnostic", path: "/diagnostic" },
          ]),
        )}
      />

      <section className="surface-veil relative pb-[var(--section-y-tight)] pt-36 lg:pt-48" aria-labelledby="diagnostic-title">
        <div className="shell relative z-[1]">
          <SectionLabel index="00" active>
            {diagnosticIntro.eyebrow}
          </SectionLabel>

          <div className="mt-8 grid-12">
            <div className="col-span-12 lg:col-span-7">
              <Reveal>
                <h1 id="diagnostic-title" className="t-display-l max-w-[17ch]">
                  {diagnosticIntro.title}
                </h1>
              </Reveal>
            </div>

            <div className="col-span-12 mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
              <Reveal delay={0.08}>
                <p className="t-body">{diagnosticIntro.body}</p>
                <p className="t-meta-sm mt-8 text-titanium-faint">
                  Response <span className="px-1">/</span> {site.responseWindow}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <div className="shell pb-[var(--space-11)]">
        <DiagnosticPortal />
      </div>
    </>
  );
}
