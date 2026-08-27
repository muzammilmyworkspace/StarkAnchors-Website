import type { PlatformName } from "@/types";

/**
 * PLATFORM LOGOS — the real marks, in their real colours.
 *
 * This is a deliberate, contained exception to the palette discipline.
 * Everything else on this site is obsidian, titanium and one blue; these
 * five are Meta blue, Google's four colours, YouTube red, LinkedIn blue
 * and WhatsApp green.
 *
 * The exception is worth it because recognition is the entire job here.
 * A visitor scanning for "do they run Google Ads" identifies the
 * four-colour G pre-attentively — before reading a single word — and no
 * amount of house-style consistency is worth costing them that.
 *
 * Two earlier attempts got this wrong: first abstract technical icons
 * (a target for Meta, a magnifier for Google), then monochrome outlines
 * of the real geometry. Both still read as "custom icons" rather than as
 * the platforms themselves.
 *
 * Nominative use: these identify the platforms a service runs on. They
 * are not partner badges, and must never be presented as endorsements.
 * Official geometry and official colours, undistorted.
 */

type LogoProps = { className?: string };

const SIZE = "h-5 w-5";

const box = {
  viewBox: "0 0 24 24",
  "aria-hidden": true,
  focusable: "false" as const,
};

/** Meta — the interlocking loop, Meta blue. */
function Meta({ className }: LogoProps) {
  return (
    <svg {...box} className={className ?? SIZE} fill="none">
      <path
        d="M2.4 12c0-3.6 1.85-6 4.1-6 2.7 0 4.2 3.2 5.5 6 1.3 2.8 2.8 6 5.5 6 2.25 0 4.1-2.4 4.1-6s-1.85-6-4.1-6c-2.7 0-4.2 3.2-5.5 6-1.3 2.8-2.8 6-5.5 6-2.25 0-4.1-2.4-4.1-6Z"
        stroke="#0081FB"
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Google — the G, in all four colours.
 *
 * Built as four stroked arcs around one circle plus the blue bar, rather
 * than as a traced outline: at 20px the arc construction is
 * indistinguishable from the official mark and it stays crisp at any size.
 */
function Google({ className }: LogoProps) {
  const arc = { fill: "none", strokeWidth: 4.6, strokeLinecap: "butt" as const };
  return (
    <svg {...box} className={className ?? SIZE}>
      {/* red — over the top */}
      <path d="M16.56 6.17A7.4 7.4 0 0 0 4.85 10.09" stroke="#EA4335" {...arc} />
      {/* yellow — down the left */}
      <path d="M4.85 10.09A7.4 7.4 0 0 0 10.09 19.15" stroke="#FBBC05" {...arc} />
      {/* green — along the bottom */}
      <path d="M10.09 19.15A7.4 7.4 0 0 0 18.41 15.7" stroke="#34A853" {...arc} />
      {/* blue — up the right, plus the bar into the centre */}
      <path d="M18.41 15.7A7.4 7.4 0 0 0 18.95 9.47" stroke="#4285F4" {...arc} />
      <rect x="11.6" y="9.7" width="8.4" height="4.6" fill="#4285F4" />
    </svg>
  );
}

/** YouTube — the red plate and white play triangle. */
function YouTube({ className }: LogoProps) {
  return (
    <svg {...box} className={className ?? SIZE}>
      <rect x="1.5" y="5" width="21" height="14" rx="4.6" fill="#FF0000" />
      <path d="M9.9 8.6 16 12l-6.1 3.4Z" fill="#FFFFFF" />
    </svg>
  );
}

/** LinkedIn — the blue plate and white "in". */
function LinkedIn({ className }: LogoProps) {
  return (
    <svg {...box} className={className ?? SIZE}>
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#0A66C2" />
      <circle cx="7.3" cy="7.9" r="1.6" fill="#FFFFFF" />
      <rect x="6" y="10.2" width="2.6" height="7.6" fill="#FFFFFF" />
      <path
        d="M10.2 10.2h2.5v1.05c.6-.82 1.62-1.27 2.87-1.27 2.12 0 3.57 1.3 3.57 3.77v4.05h-2.6v-3.6c0-1.26-.56-1.92-1.57-1.92-1.06 0-1.67.73-1.67 2v3.52h-2.6Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/** WhatsApp — the green bubble and white handset. */
function WhatsApp({ className }: LogoProps) {
  return (
    <svg {...box} className={className ?? SIZE}>
      <path
        d="M12 2.3a9.5 9.5 0 0 0-8.15 14.4L2.5 21.7l5.2-1.32A9.5 9.5 0 1 0 12 2.3Z"
        fill="#25D366"
      />
      <path
        d="M9.5 7.6c-.22-.5-.45-.5-.66-.51h-.56c-.2 0-.51.07-.78.36-.27.3-1.02 1-1.02 2.42s1.05 2.8 1.2 3c.14.19 2.02 3.23 4.99 4.4 2.47.97 2.97.78 3.5.73.54-.05 1.74-.71 1.98-1.4.25-.68.25-1.27.17-1.39-.07-.12-.27-.2-.56-.34-.3-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.29-.76.95-.93 1.15-.17.19-.34.22-.63.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.6.13-.14.3-.36.44-.53.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.65-1.58-.86-2.02Z"
        fill="#FFFFFF"
      />
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
