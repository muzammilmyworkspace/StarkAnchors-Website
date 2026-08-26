import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { formatLogDate } from "@/lib/utils/format";
import type { LogEntry } from "@/types";

/**
 * THE ARCHIVE
 *
 * An editorial publication list: full-width rows, rule-separated, with
 * the log identifier and date hanging in the left margin and the title
 * set at display scale.
 *
 * There are no thumbnails, no tag pills and no three-across card grid.
 * A card grid would have made three articles look like a thin blog;
 * a rule-separated index makes three articles look like the first
 * three entries of a record.
 *
 * Hover draws a signal rule along the top of the row. That is the only
 * state change — the type does not move, grow or change colour.
 */
export function LogIndexList({ entries }: { entries: LogEntry[] }) {
  return (
    <RevealGroup as="ul" className="border-t border-line" step={0.08}>
      {entries.map((entry) => (
        <RevealItem as="li" key={entry.slug} className="border-b border-line">
          <Link href={`/engineering-logs/${entry.slug}`} className="group relative block py-10 lg:py-14">
            {/* Signal rule, drawn on hover. */}
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-laser transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
            />

            <div className="grid-12">
              {/* Margin identity */}
              <div className="col-span-12 lg:col-span-2">
                <p className="t-meta text-titanium-faint transition-colors duration-300 group-hover:text-laser">
                  {entry.logId}
                </p>
                <p className="t-meta-sm mt-3 hidden lg:block">{formatLogDate(entry.date)}</p>
              </div>

              {/* Title and deck */}
              <div className="col-span-12 mt-4 lg:col-span-7 lg:col-start-4 lg:mt-0">
                <h2 className="t-display-m max-w-[20ch] text-titanium">{entry.title}</h2>
                <p className="t-body mt-4 max-w-[54ch]">{entry.summary}</p>
              </div>

              {/* Meta */}
              <div className="col-span-12 mt-5 flex items-center gap-4 lg:col-span-2 lg:col-start-11 lg:mt-0 lg:block lg:text-right">
                <p className="t-meta-sm text-titanium-faint">{entry.topic}</p>
                <p className="t-meta-sm lg:mt-3">{entry.readingMinutes} min</p>
                <span className="ml-auto text-titanium-ghost transition-colors duration-300 group-hover:text-laser lg:ml-0 lg:mt-5 lg:flex lg:justify-end">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
