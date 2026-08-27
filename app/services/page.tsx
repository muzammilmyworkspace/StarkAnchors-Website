import { PageField } from "@/components/backgrounds/PageField";
import { EngageBlock } from "@/components/layout/EngageBlock";
import { ServicesHero } from "@/features/services/sections/ServicesHero";
import { CapabilitySystems } from "@/features/services/sections/CapabilitySystems";
import { EngagementArchitecture } from "@/features/services/sections/EngagementArchitecture";
import { Faq } from "@/features/services/sections/Faq";
import { capabilityCategories } from "@/data/capabilities";
import { faqs } from "@/data/faq";
import {
  breadcrumbSchema,
  buildMetadata,
  faqSchema,
  jsonLd,
  serviceCatalogSchema,
} from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Services — Web Development, Ads, Automation & Analytics",
  description:
    "Website and landing page development, custom dashboards, Meta, Google, YouTube and LinkedIn ads, social media management, CRM and AI automation, WhatsApp automation, analytics and conversion audits — built as one connected growth system.",
  path: "/services",
});

/**
 * SERVICES
 *
 * Rhythm: indexed hero → ecosystem chain → five capability bands with
 * alternating grounds → the seven-stage engagement stepper → FAQ →
 * closing.
 *
 * Structured data does real work on this page. The copy is positioned
 * ("Digital Experience Engineering"), and positioning alone can make a
 * site invisible for the words buyers actually type. The service
 * catalogue declares every capability under its plain name so search
 * engines and assistants can answer "do they build websites" correctly.
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
            { name: "Services", path: "/services" },
          ]),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(serviceCatalogSchema(capabilityCategories))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(faqSchema(faqs))}
      />

      <ServicesHero />
      <CapabilitySystems />
      <EngagementArchitecture />
      <Faq />

      <EngageBlock
        headline="Which link is failing is a question with an answer."
        body="The diagnostic identifies where your system is losing volume and which of these capabilities needs engineering first. It is scoped work with a written output, not a discovery call."
        action="Discuss your scope"
      />
    </>
  );
}
