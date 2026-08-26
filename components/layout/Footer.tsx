import Link from "next/link";
import { Logotype } from "@/components/branding/Logotype";
import { ActionLink } from "@/components/ui/Action";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { footerNav } from "@/data/navigation";
import { contactPrompt, site, socialProfiles, systemSequence } from "@/data/site";

/**
 * The footer is a specification sheet and a final console, not a sitemap
 * with a newsletter box bolted to it.
 *
 * Four bands:
 *   1  the closing prompt, with the one action and both direct channels
 *   2  identity, the index, and social
 *   3  the conceptual sequence, full-bleed, as a terminal readout
 *   4  colophon
 *
 * Social icons render only for profiles that actually exist. A link to a
 * guessed URL is worse than no link, and `socialProfiles` in data/site.ts
 * is where a real one gets switched on.
 *
 * The year is fixed rather than computed from `Date.now()` so the server
 * and client render identical markup. It is updated at release.
 */
const COPYRIGHT_YEAR = 2026;

export function Footer() {
  const liveSocial = socialProfiles.filter((profile) => profile.href);

  return (
    <footer className="relative z-[var(--z-raised)] mt-auto border-t border-line bg-obsidian-deep">
      {/* 1 — The prompt */}
      <div className="shell border-b border-line py-[var(--space-9)]">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-6">
            <h2 className="t-display-m max-w-[16ch] text-titanium">
              {contactPrompt.headline}
            </h2>
            <p className="t-lead mt-6 max-w-[44ch]">{contactPrompt.body}</p>
          </div>

          <div className="col-span-12 mt-10 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:self-end">
            <ActionLink href="/diagnostic">{contactPrompt.action}</ActionLink>

            <dl className="mt-9 border-t border-line">
              <div className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:items-baseline sm:gap-6">
                <dt className="t-meta-sm w-20 shrink-0 text-titanium-faint">Email</dt>
                <dd>
                  <a
                    href={`mailto:${site.email}`}
                    className="t-mono text-titanium transition-colors hover:text-laser"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6">
                <dt className="t-meta-sm w-20 shrink-0 text-titanium-faint">Phone</dt>
                <dd>
                  <a
                    href={`tel:${site.phone}`}
                    className="t-mono text-titanium transition-colors hover:text-laser"
                  >
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* 2 — Identity and index */}
      <div className="shell">
        <div className="grid gap-12 py-[var(--space-9)] lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logotype />
            <p className="t-body-s mt-6 max-w-xs">
              Systems engineering for the next generation of business.
            </p>

            {liveSocial.length > 0 && (
              <div className="mt-8">
                <p className="t-meta-sm text-titanium-faint">Connect</p>
                <ul className="mt-4 flex items-center gap-3">
                  {liveSocial.map((profile) => (
                    <li key={profile.platform}>
                      <a
                        href={profile.href as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${site.name} on ${profile.label}`}
                        className="flex h-10 w-10 items-center justify-center border border-line text-titanium-dim transition-colors hover:border-line-bright hover:text-laser"
                      >
                        <SocialIcon platform={profile.platform} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8 lg:gap-8">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <p className="t-meta-sm border-b border-line pb-3 text-titanium-faint">
                  {group.title}
                </p>
                <ul className="mt-4 space-y-2.5">
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

      {/* 3 — Sequence */}
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

      {/* 4 — Colophon */}
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
              System <span className="text-titanium-ghost">/</span> Operational
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
