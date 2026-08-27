import type { PlatformName } from "@/types";

/**
 * PLATFORM LOGOS
 *
 * The real marks for the advertising platforms we run campaigns on.
 *
 * Earlier versions of this site used abstract technical icons here —
 * a target for Meta, a magnifier for Google — on the reasoning that a
 * rounded third-party mark would clash with the square-capped house
 * style. That was the wrong call commercially: a visitor scanning for
 * "do they run Google Ads" recognises the G in a fraction of the time
 * it takes to read a label, and recognition is the entire job of this
 * part of the page.
 *
 * Drawn as single-colour outlines at one stroke weight so they sit at
 * the same visual weight as everything around them. Monochrome
 * treatment is permitted by all four brand guidelines and, unlike a
 * redrawn full-colour logo, it cannot misrepresent anyone's palette.
 * Geometry follows each official mark; nothing is stretched or
 * restyled.
 *
 * Nominative use: these identify the platforms a service runs on. They
 * are not partner badges and must never be presented as endorsements.
 */

type LogoProps = { className?: string };

const SIZE = "h-5 w-5";

const frame = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: "false" as const,
};

/** Meta — the interlocking loop. */
function Meta({ className }: LogoProps) {
  return (
    <svg {...frame} className={className ?? SIZE}>
      <path d="M1.9 12c0-3.9 2-6.4 4.4-6.4 2.9 0 4.5 3.4 5.7 6.4 1.2 3 2.8 6.4 5.7 6.4 2.4 0 4.4-2.5 4.4-6.4s-2-6.4-4.4-6.4c-2.9 0-4.5 3.4-5.7 6.4-1.2 3-2.8 6.4-5.7 6.4-2.4 0-4.4-2.5-4.4-6.4Z" />
    </svg>
  );
}

/** Google — the G: an open ring closed by a bar into the centre. */
function Google({ className }: LogoProps) {
  return (
    <svg {...frame} className={className ?? SIZE}>
      <path d="M12 3.5a8.5 8.5 0 1 0 8.4 9.9H12" />
    </svg>
  );
}

/** YouTube — the rounded plate and play triangle. */
function YouTube({ className }: LogoProps) {
  return (
    <svg {...frame} className={className ?? SIZE}>
      <rect x="1.8" y="5.2" width="20.4" height="13.6" rx="4" />
      <path d="M10.2 9.2 15.4 12l-5.2 2.8Z" />
    </svg>
  );
}

/** LinkedIn — the plate with the "in". */
function LinkedIn({ className }: LogoProps) {
  return (
    <svg {...frame} className={className ?? SIZE}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="2.5" />
      <path d="M7.2 10.4V17" />
      <circle cx="7.2" cy="7.3" r="1.15" fill="currentColor" stroke="none" />
      <path d="M11.2 17v-6.6" />
      <path d="M11.2 13.1c0-1.8 1.3-2.9 3-2.9s2.7 1.1 2.7 3V17" />
    </svg>
  );
}

/** WhatsApp — the bubble and handset. */
function WhatsApp({ className }: LogoProps) {
  return (
    <svg {...frame} className={className ?? SIZE}>
      <path d="M3.4 20.6 4.7 16.4A9 9 0 1 1 8 19.5Z" />
      <path d="M9.1 9.1c0 2.8 2.3 5.1 5.1 5.1l1.1-1.1-1.6-1.1-1.1.8c-.8-.4-1.6-1.2-2.1-2.1l.8-1.1-1.1-1.6Z" />
    </svg>
  );
}

const REGISTRY: Record<PlatformName, (props: LogoProps) => React.JSX.Element> = {
  meta: Meta,
  google: Google,
  youtube: YouTube,
  linkedin: LinkedIn,
  whatsapp: WhatsApp,
};

export function PlatformLogo({
  platform,
  className,
}: {
  platform: PlatformName;
  className?: string;
}) {
  const Logo = REGISTRY[platform];
  if (!Logo) return null;
  return <Logo className={className} />;
}
