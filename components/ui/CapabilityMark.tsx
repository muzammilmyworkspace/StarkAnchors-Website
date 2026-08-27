import { PlatformLogo } from "./PlatformLogo";
import { ServiceIcon } from "./ServiceIcon";
import type { Capability } from "@/types";

/**
 * Picks the right mark for a capability: the platform's real logo where
 * one exists, the house icon otherwise.
 *
 * Kept as one component so the home growth map and the services page can
 * never drift into showing different marks for the same thing.
 */
export function CapabilityMark({
  capability,
  className,
}: {
  capability: Pick<Capability, "icon" | "platform">;
  className?: string;
}) {
  if (capability.platform) {
    return <PlatformLogo platform={capability.platform} className={className} />;
  }
  return <ServiceIcon name={capability.icon} className={className} />;
}
