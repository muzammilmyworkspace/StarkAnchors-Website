import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ActionLink } from "@/components/ui/Action";
import { ArrowRight } from "@/components/ui/icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { logsByDate } from "@/data/logs";
import { formatLogDate } from "@/lib/utils/format";

/**
 * Evidence of thinking, placed between the trust section and the close.
 *
 * A visitor who has decided they believe us wants to check the work
 * before they act. Three field notes with real technical content do more
 * for that than a testimonial we cannot substantiate — and unlike a
 * logo wall, every word of it is verifiable by reading it.
 *
 * Deliberately just three rows and a link out. This is a pointer to the
 * archive, not a second archive.
 */
export function LatestLogs() {
  const entries = logsByDate.slice(0, 3);

  return (
    <Section surface="veil" id="logs" rule labelledBy="logs-home-title">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-6">
          <SectionLabel index="07">Engineering Logs</SectionLabel>
          <Reveal>
            <h2 id="logs-home-title" className="t-display-l mt-7 max-w-[14ch]">
              Field notes from the infrastructure layer.
            </h2>
          </Reveal>
        </div>

        <div className="col-span-12 mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
          <Reveal delay={0.08}>
            <p className="t-lead">
              Working notes on problems we keep finding in production systems, written
              for the person who has to implement the fix.
            </p>
          </Reveal>
        </div>
      </div>

      <RevealGroup className="mt-14 border-t border-line lg:mt-20" step={0.07}>
        {entries.map((entry) => (
          <RevealItem key={entry.slug} as="div" className="border-b border-line">
            <Link
              href={`/engineering-logs/${entry.slug}`}
              className="group grid grid-cols-1 gap-y-3 py-7 lg:grid-cols-12 lg:items-baseline lg:gap-6"
            >
              <span className="t-meta-sm col-span-2 text-titanium-faint transition-colors group-hover:text-laser">
                {entry.logId}
              </span>
              <span className="t-display-s col-span-6 text-titanium">{entry.title}</span>
              <span className="t-body-s col-span-3 hidden lg:block">{entry.topic}</span>
              <span className="col-span-1 hidden justify-end text-titanium-ghost transition-colors group-hover:text-laser lg:flex">
                <ArrowRight className="h-4 w-4" />
              </span>
              <span className="t-meta-sm col-span-12 text-titanium-faint lg:hidden">
                {formatLogDate(entry.date)} <span className="px-1">/</span>{" "}
                {entry.readingMinutes} min
              </span>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-10">
        <ActionLink href="/engineering-logs" variant="inline">
          Explore the engineering logs
        </ActionLink>
      </div>
    </Section>
  );
}
