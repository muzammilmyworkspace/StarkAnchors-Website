import Link from "next/link";
import { Logotype } from "@/components/branding/Logotype";
import { ActionLink } from "@/components/ui/Action";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { footerNav } from "@/data/navigation";
import { contactPrompt, site, socialProfiles } from "@/data/site";

/**
 * The footer: a closing prompt, the index, and the ways to reach us.
 *
 * Kept deliberately tight. A footer is the last thing between a
 * convinced visitor and an enquiry, so every band in it has to earn its
 * height — the decorative sequence readout that used to sit here did
 * not, and the padding has come down throughout.
 *
 * The year is fixed rather than computed from `Date.now()` so the server
 * and client render identical markup. It is updated at release.
 */
const COPYRIGHT_YEAR = 2026;

export function Footer() {
  return (
    <footer className="relative z-[var(--z-raised)] mt-auto border-t border-line bg-obsidian-deep">
      {/* 1 — The prompt and the direct channels */}
      <div className="shell border-b border-line py-12 lg:py-14">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-6">
            <h2 className="t-display-m max-w-[16ch] text-titanium">
              {contactPrompt.headline}
            </h2>
            <p className="t-body mt-4 max-w-[46ch]">{contactPrompt.body}</p>

            <div className="mt-7">
              <ActionLink href="/diagnostic">{contactPrompt.action}</ActionLink>
            </div>
          </div>

          <div className="col-span-12 mt-9 lg:col-span-5 lg:col-start-8 lg:mt-0">
            <dl className="border-t border-line">
              <div className="flex flex-col gap-1 border-b border-line py-3.5 sm:flex-row sm:items-baseline sm:gap-6">
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
              <div className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:gap-6">
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

            {/* Social */}
            <div className="mt-7">
              <p className="t-meta-sm text-titanium-faint">Connect</p>
              <ul className="mt-3.5 flex items-center gap-2.5">
                {socialProfiles.map((profile) => (
                  <li key={profile.platform}>
                    <a
                      href={profile.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.name} on ${profile.label}`}
                      className="flex h-11 w-11 items-center justify-center border border-line text-titanium-dim transition-colors hover:border-laser hover:text-laser"
                    >
                      <SocialIcon platform={profile.platform} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 2 — Identity and index */}
      <div className="shell">
        <div className="grid gap-9 py-11 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logotype />
            <p className="t-body-s mt-4 max-w-xs">
              Systems engineering for the next generation of business.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <p className="t-meta-sm border-b border-line pb-2.5 text-titanium-faint">
                  {group.title}
                </p>
                <ul className="mt-3.5 space-y-2">
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

      {/* 3 — Colophon */}
      <div className="border-t border-line">
        <div className="shell flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
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
