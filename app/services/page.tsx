import { PageField } from "@/components/backgrounds/PageField";
import { EngageBlock } from "@/components/layout/EngageBlock";
import { ServicesHero } from "@/features/services/sections/ServicesHero";
import { SystemModules } from "@/features/services/sections/SystemModules";
import { EngagementArchitecture } from "@/features/services/sections/EngagementArchitecture";
import { buildMetadata, breadcrumbSchema, jsonLd } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Systems",
  description:
    "Three interconnected systems: revenue pipeline engineering, business operation automation, and data telemetry with conversion audits. Built as infrastructure, not as isolated services.",
  path: "/services",
});

/**
 * SERVICES
 *
 * Rhythm: indexed hero → three full-width modules with alternating
 * schematics → interactive seven-stage stepper on a tonal band →
 * closing. Four different diagram idioms exist across the site and
 * two of them are on this page.
 */
export default function ServicesPage() {
  return (
    <>
      <PageField variant="topology" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Systems", path: "/services" },
          ]),
        )}
      />

      <ServicesHero />
      <SystemModules />
      <EngagementArchitecture />

      <EngageBlock
        headline="Which of the three is failing is a question with an answer."
        body="The diagnostic identifies where your system is losing volume and which of these three needs engineering first. It is scoped work with a written output, not a discovery call."
      />
    </>
  );
}
