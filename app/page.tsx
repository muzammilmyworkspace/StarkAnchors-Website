import { PageField } from "@/components/backgrounds/PageField";
import { SystemBoot } from "@/components/layout/SystemBoot";
import { Hero } from "@/features/home/sections/Hero";
import { SystemStatusBar } from "@/features/home/sections/SystemStatusBar";
import { RevenueLeakage } from "@/features/home/sections/RevenueLeakage";
import { DebuggingMethodology } from "@/features/home/sections/DebuggingMethodology";
import { PipelineArchitecture } from "@/features/home/sections/PipelineArchitecture";
import { DifferenceLedger } from "@/features/home/sections/DifferenceLedger";
import { ClosingStatement } from "@/features/home/sections/ClosingStatement";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: `${site.discipline}`,
  description: site.description,
  path: "/",
});

/**
 * HOME
 *
 * Section rhythm, deliberately varied so the page never settles into a
 * repeating component shape:
 *
 *   Hero            asymmetric, bottom-weighted, drawing title block
 *   Status          full-bleed instrument strip
 *   Diagnosis       full-width interactive flow band
 *   Methodology     vertical spine architecture
 *   Pipeline        tonal band, annotated technical drawing
 *   Difference      centre-divided editorial ledger
 *   Closing         typographic, asymmetric, one action
 */
export default function HomePage() {
  return (
    <>
      <SystemBoot />
      <PageField variant="network" />

      <Hero />
      <SystemStatusBar />
      <RevenueLeakage />
      <DebuggingMethodology />
      <PipelineArchitecture />
      <DifferenceLedger />
      <ClosingStatement />
    </>
  );
}
