import Link from "next/link";
import { Logotype } from "@/components/branding/Logotype";
import { footerNav } from "@/data/navigation";
import { site, systemSequence } from "@/data/site";

/**
 * The footer is a specification sheet, not a sitemap with a newsletter
 * box bolted to it.
 *
 * Three bands:
 *   1  identity and the direct channel
 *   2  the index, in three structural columns
 *   3  the conceptual sequence, full-bleed, as a terminal readout
 *
 * The year is fixed rather than computed from `Date.now()` so the
 * server and client render identical markup. It is updated at release.
 */
const COPYRIGHT_YEAR = 2026;

export function Footer() {
  return (
    <footer className="relative z-[var(--z-raised)] mt-auto border-t border-line bg-obsidian-deep">
      <div className="shell">
        <div className="grid gap-12 py-[var(--space-9)] lg:grid-cols-12 lg:gap-8">
          {/* Identity */}
          <div className="lg:col-span-5">
            <Logotype />
            <p className="t-body-s mt-6 max-w-xs">{site.shortDescription}</p>

            <div className="mt-8">
              <p className="t-meta-sm">Direct Channel</p>
              <a
                href={`mailto:${site.email}`}
                className="t-mono mt-2 inline-block text-titanium transition-colors hover:text-laser"
              >
                {site.email}
              </a>
            </div>
          </div>

          {/* Index */}
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7 lg:gap-8">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <p className="t-meta-sm border-b border-line pb-3 text-titanium-faint">
                  {group.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.href + item.label}>
                      <Link
                        href={item.href}
                        className="t-body-s text-titanium-dim transition-colors duration-200 hover:text-titanium"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      {/* Sequence — the conceptual spine, stated once, at the bottom of
          the building.

          It wraps rather than scrolling horizontally. A horizontal
          scroll container puts content behind a gesture a keyboard user
          cannot perform, and eight short words wrap perfectly well. */}
      <div className="border-t border-line">
        <div className="shell">
          <ul
            className="flex flex-wrap items-center gap-x-4 gap-y-2 py-4"
            aria-label="System sequence"
          >
            {systemSequence.map((stage, index) => (
              <li key={stage} className="flex shrink-0 items-center gap-4">
                <span className="t-meta-sm text-titanium-faint">{stage}</span>
                {index < systemSequence.length - 1 && (
                  <span aria-hidden className="h-px w-4 bg-line-strong" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Colophon */}
      <div className="border-t border-line">
        <div className="shell flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-meta-sm">
            © {COPYRIGHT_YEAR} {site.legalName}
          </p>
          <p className="t-meta-sm flex items-center gap-2">
            <span
              aria-hidden
              className="h-1.5 w-1.5 bg-laser"
              style={{ animation: "sa-respire 3.6s ease-in-out infinite" }}
            />
            <span>
              System <span className="t-faint">/</span> Operational
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
