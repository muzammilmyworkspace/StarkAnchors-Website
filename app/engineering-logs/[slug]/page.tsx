import Link from "next/link";
import { notFound } from "next/navigation";
import { PageField } from "@/components/backgrounds/PageField";
import { EngageBlock } from "@/components/layout/EngageBlock";
import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import { LogBody } from "@/features/engineering-logs/components/LogBody";
import { LogContents } from "@/features/engineering-logs/components/LogContents";
import { getLog, getRelatedLogs, logs } from "@/data/logs";
import { formatLogDate } from "@/lib/utils/format";
import {
  articleSchema,
  breadcrumbSchema,
  buildMetadata,
  jsonLd,
} from "@/lib/seo/metadata";

type PageProps = { params: Promise<{ slug: string }> };

/** Fully static: every log is known at build time. */
export function generateStaticParams() {
  return logs.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const entry = getLog(slug);

  if (!entry) return buildMetadata({ title: "Not found", description: "", path: "/engineering-logs" });

  return buildMetadata({
    title: entry.title,
    description: entry.summary,
    path: `/engineering-logs/${entry.slug}`,
    type: "article",
    publishedTime: entry.date,
  });
}

/**
 * ENGINEERING LOG — DETAIL
 *
 * A technical document rather than a blog post: identity block,
 * hanging contents rail, a measured column of prose, and figures that
 * carry real information.
 *
 * The background drops to the `quiet` field variant. Reading is the
 * only job this page has.
 */
export default async function LogPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getLog(slug);

  if (!entry) notFound();

  const headings = entry.body
    .filter((block): block is Extract<typeof block, { type: "h2" }> => block.type === "h2")
    .map((block) => ({ id: block.id, text: block.text }));

  const related = getRelatedLogs(entry.slug);

  return (
    <>
      <PageField variant="quiet" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          articleSchema({
            title: entry.title,
            description: entry.summary,
            path: `/engineering-logs/${entry.slug}`,
            datePublished: entry.date,
          }),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Engineering Logs", path: "/engineering-logs" },
            { name: entry.title, path: `/engineering-logs/${entry.slug}` },
          ]),
        )}
      />

      <article className="pt-36 lg:pt-44">
        {/* Identity */}
        <header className="shell">
          <Link
            href="/engineering-logs"
            className="t-meta inline-flex items-center gap-3 text-titanium-faint transition-colors hover:text-titanium"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Archive
          </Link>

          <div className="mt-10 grid-12">
            <div className="col-span-12 lg:col-span-9">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <span className="t-meta text-laser">{entry.logId}</span>
                <span aria-hidden className="h-3 w-px bg-line-strong" />
                <span className="t-meta">{entry.topic}</span>
                <span aria-hidden className="h-3 w-px bg-line-strong" />
                <time className="t-meta" dateTime={entry.date}>
                  {formatLogDate(entry.date)}
                </time>
                <span aria-hidden className="h-3 w-px bg-line-strong" />
                <span className="t-meta">{entry.readingMinutes} min read</span>
              </div>

              <h1 className="t-display-l mt-8 max-w-[18ch]">{entry.title}</h1>

              <p className="t-statement mt-7 max-w-[44ch] text-titanium-dim">
                {entry.summary}
              </p>
            </div>
          </div>

          <div className="rule-strong mt-14" />
        </header>

        {/* Body */}
        <div className="shell mt-12 lg:mt-16">
          <div className="grid-12">
            <aside className="col-span-12 lg:col-span-3">
              <div className="lg:sticky lg:top-32">
                <LogContents headings={headings} />
              </div>
            </aside>

            <div className="col-span-12 mt-12 lg:col-span-8 lg:col-start-5 lg:mt-0">
              <LogBody blocks={entry.body} />
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section
          aria-labelledby="related-title"
          className="mt-[var(--section-y)] border-t border-line"
        >
          <div className="shell pt-12">
            <h2 id="related-title" className="t-meta text-titanium-faint">
              Related Logs
            </h2>

            <ul className="mt-6">
              {related.map((item) => (
                <li key={item.slug} className="border-t border-line">
                  <Link
                    href={`/engineering-logs/${item.slug}`}
                    className="group flex items-baseline gap-6 py-7"
                  >
                    <span className="t-meta-sm shrink-0 text-titanium-faint transition-colors group-hover:text-laser">
                      {item.logId}
                    </span>
                    <span className="t-display-s flex-1 text-titanium-dim transition-colors group-hover:text-titanium">
                      {item.title}
                    </span>
                    <span
                      aria-hidden
                      className="shrink-0 text-titanium-ghost transition-colors group-hover:text-laser"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <EngageBlock
        headline="Every log started as somebody’s production incident."
        body="If this one reads like a description of your stack, the diagnostic will establish how far the problem extends and what it is currently costing."
        label="Apply"
      />
    </>
  );
}
