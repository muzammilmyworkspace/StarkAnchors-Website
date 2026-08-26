import { PageField } from "@/components/backgrounds/PageField";
import { EngageBlock } from "@/components/layout/EngageBlock";
import { ServicesHero } from "@/features/services/sections/ServicesHero";
import { CapabilitySystems } from "@/features/services/sections/CapabilitySystems";
import { EngagementArchitecture } from "@/features/services/sections/EngagementArchitecture";
import { buildMetadata, breadcrumbSchema, jsonLd } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Systems",
  description:
    "Website, landing page and dashboard development; Meta, Google, YouTube and LinkedIn advertising; social presence engineering; CRM, AI and operational automation; behavioural telemetry, attribution and conversion audits — engineered as one connected system.",
  path: "/services",
});

/**
 * SERVICES
 *
 * Rhythm: indexed hero → ecosystem chain → five capability bands with
 * alternating grounds → the seven-stage engagement stepper → closing.
 *
 * The page is long by design. Someone comparing agencies needs to find
 * their specific requirement, and a page that hides eighteen
 * capabilities behind five vague headings fails that person to protect
 * a design principle. The grounds alternate and the treatments differ so
 * that length reads as depth rather than as repetition.
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
      <CapabilitySystems />
      <EngagementArchitecture />

      <EngageBlock
        headline="Which link is failing is a question with an answer."
        body="The diagnostic identifies where your system is losing volume and which of these capabilities needs engineering first. It is scoped work with a written output, not a discovery call."
        action="Discuss your scope"
      />
    </>
  );
}
