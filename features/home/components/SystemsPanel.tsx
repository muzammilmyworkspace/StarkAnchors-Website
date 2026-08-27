import { PlatformLogo } from "@/components/ui/PlatformLogo";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import type { PlatformName, ServiceIconName } from "@/types";

/**
 * WHERE THESE PROBLEMS LIVE
 *
 * The panel beside the problem switchboard. It replaced a photograph of
 * an industrial control room, which looked handsome and said nothing:
 * the section is about symptoms in a marketing stack, and a picture of
 * switchgear is not that stack.
 *
 * This is: the actual systems those symptoms occur in, named, with the
 * platforms' own logos. It answers "do you work in my tools?" at a
 * glance, which is a question the photograph could not even attempt.
 *
 * Nominative use of each mark — these identify platforms we operate in,
 * not partnerships or endorsements.
 */

type Entry =
  | { label: string; platform: PlatformName }
  | { label: string; icon: ServiceIconName; accent: string };

const SYSTEMS: Entry[] = [
  { label: "Meta", platform: "meta" },
  { label: "Google", platform: "google" },
  { label: "YouTube", platform: "youtube" },
  { label: "LinkedIn", platform: "linkedin" },
  { label: "WhatsApp", platform: "whatsapp" },
  { label: "Your website", icon: "website", accent: "#00E5FF" },
  { label: "Your CRM", icon: "records", accent: "#34D399" },
  { label: "Your analytics", icon: "telemetry", accent: "#60A5FA" },
];

export function SystemsPanel() {
  return (
    <div className="border border-line">
      <p className="t-meta-sm border-b border-line px-5 py-3.5 text-titanium-faint">
        Where these problems live
      </p>

      <ul className="grid grid-cols-2">
        {SYSTEMS.map((entry, index) => (
          <li
            key={entry.label}
            className={[
              "flex items-center gap-3 px-5 py-4",
              // Interior rules only: a grid where every cell is boxed
              // reads as a table of nothing.
              index % 2 === 1 ? "border-l border-line" : "",
              index < SYSTEMS.length - 2 ? "border-b border-line" : "",
            ].join(" ")}
          >
            <span
              aria-hidden
              className="shrink-0"
              style={"accent" in entry ? { color: entry.accent } : undefined}
            >
              {"platform" in entry ? (
                <PlatformLogo platform={entry.platform} className="h-5 w-5" />
              ) : (
                <ServiceIcon name={entry.icon} className="h-5 w-5" />
              )}
            </span>
            <span className="t-body-s text-titanium-dim">{entry.label}</span>
          </li>
        ))}
      </ul>

      <p className="t-body-s border-t border-line px-5 py-3.5">
        We work inside the stack you already run.
      </p>
    </div>
  );
}
