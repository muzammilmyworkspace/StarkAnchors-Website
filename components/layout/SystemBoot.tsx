import { Mark } from "@/components/branding/Mark";

/**
 * The boot sequence. Server-rendered markup, animated entirely in CSS,
 * removed from the document by `[data-booted]` on every subsequent
 * navigation in the session.
 *
 * Rendered on the home route only. A visitor arriving on an
 * engineering log from a search result wants the log, not a brand
 * moment they have to sit through.
 *
 * See styles/boot.css and the inline stamp script in app/layout.tsx.
 */
export function SystemBoot() {
  return (
    <div className="boot" aria-hidden="true">
      <div className="boot__inner">
        <div className="boot__lockup">
          <Mark className="h-6 w-6" />
          <span aria-hidden className="h-4 w-px bg-line-strong" />
          <span className="boot__word">Stark Anchors</span>
        </div>

        <div className="boot__rule" />

        <ul className="boot__readout">
          <li className="t-meta-sm">Initializing System</li>
          <li className="t-meta-sm">
            Telemetry <span className="t-faint">/</span> Connected
          </li>
          <li className="t-meta-sm">
            Architecture <span className="t-faint">/</span> Online
          </li>
        </ul>
      </div>
    </div>
  );
}
