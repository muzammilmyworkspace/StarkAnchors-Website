import type { SocialPlatform } from "@/types";

/**
 * SOCIAL PLATFORM MARKS — footer links.
 *
 * The same real, full-colour marks as `PlatformLogo`, for the four
 * profiles in the footer. Same reasoning: a social link is only useful
 * if it is recognised, and a recognised mark is a coloured one.
 *
 * Instagram is the one that needs a gradient rather than a flat colour —
 * its brand mark has been the warm-to-purple gradient since 2016, and a
 * flat pink version reads as a knock-off. It is defined inline so the
 * component stays self-contained.
 */

type IconProps = { className?: string };

const SIZE = "h-[18px] w-[18px]";

const box = {
  viewBox: "0 0 24 24",
  "aria-hidden": true,
  focusable: "false" as const,
};

function LinkedIn({ className }: IconProps) {
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

function Instagram({ className }: IconProps) {
  return (
    <svg {...box} className={className ?? SIZE}>
      <defs>
        <radialGradient id="sa-ig" cx="0.3" cy="1.05" r="1.25">
          <stop offset="0" stopColor="#FFD776" />
          <stop offset="0.28" stopColor="#F58529" />
          <stop offset="0.58" stopColor="#DD2A7B" />
          <stop offset="0.82" stopColor="#8134AF" />
          <stop offset="1" stopColor="#515BD4" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.6" fill="url(#sa-ig)" />
      <circle
        cx="12"
        cy="12"
        r="4.3"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.9"
      />
      <circle cx="17.2" cy="6.9" r="1.2" fill="#FFFFFF" />
    </svg>
  );
}

function Facebook({ className }: IconProps) {
  return (
    <svg {...box} className={className ?? SIZE}>
      <circle cx="12" cy="12" r="10" fill="#1877F2" />
      <path
        d="M15.6 15.1l.44-2.9h-2.78v-1.88c0-.79.39-1.56 1.63-1.56h1.27V6.3s-1.15-.2-2.25-.2c-2.3 0-3.8 1.39-3.8 3.91v2.21H7.56v2.9h2.55V22a10.1 10.1 0 0 0 3.15 0v-6.9Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function WhatsApp({ className }: IconProps) {
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

function YouTube({ className }: IconProps) {
  return (
    <svg {...box} className={className ?? SIZE}>
      <rect x="1.5" y="5" width="21" height="14" rx="4.6" fill="#FF0000" />
      <path d="M9.9 8.6 16 12l-6.1 3.4Z" fill="#FFFFFF" />
    </svg>
  );
}

const REGISTRY: Record<SocialPlatform, (props: IconProps) => React.JSX.Element> = {
  linkedin: LinkedIn,
  instagram: Instagram,
  facebook: Facebook,
  whatsapp: WhatsApp,
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
