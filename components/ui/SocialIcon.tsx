import type { SocialPlatform } from "@/types";

/**
 * SOCIAL PLATFORM MARKS
 *
 * Used only in the footer, where a visitor is looking for a recognisable
 * platform glyph and an abstract one would fail them.
 *
 * Note the deliberate split with ServiceIcon: the *advertising services*
 * (Meta, Google, YouTube, LinkedIn campaigns) are represented by this
 * project's own technical icons — targeting, search, video, professional
 * network — as the brief specifies. Platform trademarks are reserved for
 * the places where they function as a link to that platform, which is
 * the only context where reproducing someone else's mark is warranted.
 *
 * Drawn to the standard monochrome silhouettes at a single stroke weight
 * so they sit at the same visual weight as the rest of the footer. No
 * colour, no gradients, no distortion of the underlying forms.
 */

type IconProps = { className?: string };

const SIZE = "h-[18px] w-[18px]";

const frame = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  "aria-hidden": true,
  focusable: "false" as const,
};

function LinkedIn({ className }: IconProps) {
  return (
    <svg {...frame} className={className ?? SIZE}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="2.5" />
      <path d="M7.2 10.4 V17" strokeLinecap="square" />
      <circle cx="7.2" cy="7.3" r="1.15" fill="currentColor" stroke="none" />
      <path d="M11.2 17 V10.4" strokeLinecap="square" />
      <path d="M11.2 13.1 C11.2 11.3 12.5 10.2 14.2 10.2 C15.9 10.2 16.9 11.3 16.9 13.2 V17" />
    </svg>
  );
}

function Instagram({ className }: IconProps) {
  return (
    <svg {...frame} className={className ?? SIZE}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1.05" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Facebook({ className }: IconProps) {
  return (
    <svg {...frame} className={className ?? SIZE}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M15 8.2 H13.6 C12.6 8.2 12.1 8.8 12.1 9.8 V11.4 H15 M12.1 11.4 H10.2 M12.1 11.4 V21.4" />
    </svg>
  );
}

function YouTube({ className }: IconProps) {
  return (
    <svg {...frame} className={className ?? SIZE}>
      <rect x="1.8" y="5.2" width="20.4" height="13.6" rx="4" />
      <path d="M10.2 9.2 L15.4 12 L10.2 14.8 Z" strokeLinejoin="miter" />
    </svg>
  );
}

const REGISTRY: Record<SocialPlatform, (props: IconProps) => React.JSX.Element> = {
  linkedin: LinkedIn,
  instagram: Instagram,
  facebook: Facebook,
  youtube: YouTube,
};

export function SocialIcon({
  platform,
  className,
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  const Icon = REGISTRY[platform];
  if (!Icon) return null;
  return <Icon className={className} />;
}
