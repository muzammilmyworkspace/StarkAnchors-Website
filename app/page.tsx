import { PageField } from "@/components/backgrounds/PageField";
import { SystemBoot } from "@/components/layout/SystemBoot";
import { Hero } from "@/features/home/sections/Hero";
import { SystemStatusBar } from "@/features/home/sections/SystemStatusBar";
import { WhatWeEngineer } from "@/features/home/sections/WhatWeEngineer";
import { HowWeHelp } from "@/features/home/sections/HowWeHelp";
import { RevenueLeakage } from "@/features/home/sections/RevenueLeakage";
import { DebuggingMethodology } from "@/features/home/sections/DebuggingMethodology";
import { PipelineArchitecture } from "@/features/home/sections/PipelineArchitecture";
import { CoreValues } from "@/features/home/sections/CoreValues";
import { DifferenceLedger } from "@/features/home/sections/DifferenceLedger";
import { LatestLogs } from "@/features/home/sections/LatestLogs";
import { ClosingStatement } from "@/features/home/sections/ClosingStatement";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Web Development, Paid Ads & Business Automation",
  description: site.description,
  path: "/",
});

/**
 * HOME
 *
 * The flow is a conversion journey, not a feature list:
 *
 *   Hero            what we do, in one statement
 *   Status          the environment declares itself
 *   Capabilities    what we build — answers "can you do X?" immediately
 *   Application     how it applies to *me*, in the visitor's own words
 *   Diagnosis       the problem, made visible as an instrument
 *   Methodology     how we approach it
 *   Pipeline        the architecture that results
 *   Principles      who we are — the trust section
 *   Difference      why the order of operations matters
 *   Logs            evidence of thinking
 *   Closing         one action
 *
 * Awareness → capability → relevance → problem → method → trust → action.
 *
 * Section rhythm is deliberately varied so the page never settles into a
 * repeating component shape: asymmetric hero, full-bleed instrument
 * strip, icon index, editorial switchboard with photography, interactive
 * flow band, vertical spine, tonal technical plate, scroll-driven values
 * instrument, centre-divided ledger, editorial list, typographic close.
 */
export default function HomePage() {
  return (
    <>
      <SystemBoot />
      <PageField variant="network" />

      <Hero />
      <SystemStatusBar />
      <WhatWeEngineer />
      <HowWeHelp />
      <RevenueLeakage />
      <DebuggingMethodology />
      <PipelineArchitecture />
      <CoreValues />
      <DifferenceLedger />
      <LatestLogs />
      <ClosingStatement />
    </>
  );
}
