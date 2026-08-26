import { PageField } from "@/components/backgrounds/PageField";
import { EngageBlock } from "@/components/layout/EngageBlock";
import { PricingHero } from "@/features/pricing/sections/PricingHero";
import { PricingScopes } from "@/features/pricing/sections/PricingScopes";
import { buildMetadata, breadcrumbSchema, jsonLd } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Scope",
  description:
    "Three engagement depths: a fixed-scope system audit, the full Anchor infrastructure build with continuous engineering, and custom enterprise programmes. Scope is quoted after diagnosis.",
  path: "/pricing",
});

/**
 * PRICING
 *
 * The quietest page on the site: the background field drops to the
 * `quiet` variant, motion is minimal, and the layout is close to a
 * specification document. A page about commercial commitment should
 * not be the busiest thing a visitor has seen.
 */
export default function PricingPage() {
  return (
    <>
      <PageField variant="quiet" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Scope", path: "/pricing" },
          ]),
        )}
      />

      <PricingHero />
      <PricingScopes />

      <EngageBlock
        headline="The scope is written after the system is read."
        body="Submit the diagnostic and we will come back with the depth we think the problem needs — including the case where that is less than you expected."
        label="Next"
      />
    </>
  );
}
