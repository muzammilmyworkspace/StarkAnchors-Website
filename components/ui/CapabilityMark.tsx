import { PlatformLogo } from "./PlatformLogo";
import { ServiceIcon } from "./ServiceIcon";
import type { Capability } from "@/types";

/**
 * Picks the right mark for a capability, and colours it.
 *
 *   platform capability  →  that platform's real logo, in its own brand
 *                           colours, which override everything
 *   everything else      →  the house icon, tinted with its stage accent
 *
 * The stage accent is what stops the non-platform icons reading as a
 * grey afterthought next to five full-colour brand marks. Colour here is
 * doing real work: it groups eighteen capabilities into five stages that
 * can be told apart without reading a single label.
 *
 * Kept as one component so the home growth map, the services page and
 * the systems panel can never drift into showing different marks — or
 * different colours — for the same thing.
 */
export function CapabilityMark({
  capability,
  accent,
  className,
}: {
  capability: Pick<Capability, "icon" | "platform">;
  /** Stage accent. Ignored when the capability has a platform logo. */
  accent?: string;
  className?: string;
}) {
  if (capability.platform) {
    return <PlatformLogo platform={capability.platform} className={className} />;
  }

  // A plain wrapper rather than `display: contents` — the icons draw with
  // `currentColor`, so setting colour here tints them, and the callers
  // already own the layout box this sits inside.
  return (
    <span style={accent ? { color: accent } : undefined}>
      <ServiceIcon name={capability.icon} className={className} />
    </span>
  );
}
