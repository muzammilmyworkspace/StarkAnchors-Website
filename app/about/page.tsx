import { PageField } from "@/components/backgrounds/PageField";
import { EngageBlock } from "@/components/layout/EngageBlock";
import { AboutHero } from "@/features/about/sections/AboutHero";
import { EngineeringThesis } from "@/features/about/sections/EngineeringThesis";
import { Principles } from "@/features/about/sections/Principles";
import { MissionVision } from "@/features/about/sections/MissionVision";
import { buildMetadata, breadcrumbSchema, jsonLd } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Stark Anchors is a business systems engineering group. Traditional agencies optimise surfaces; we investigate infrastructure — instrumentation, handoffs, data contracts and operational logic.",
  path: "/about",
});

/**
 * ABOUT
 *
 * Rhythm: editorial hero → hanging-label thesis → scroll-driven
 * principle staircase → two monumental statements on a tonal band →
 * quiet closing. The page has no cards and no three-column grids.
 */
export default function AboutPage() {
  return (
    <>
      <PageField variant="structure" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        )}
      />

      <AboutHero />
      <EngineeringThesis />
      <Principles />
      <MissionVision />

      <EngageBlock
        headline="The diagnosis comes before the proposal."
        body="If the thesis above describes something you recognise in your own business, the next step is an assessment of the system you are actually running — not a capabilities deck."
      />
    </>
  );
}
