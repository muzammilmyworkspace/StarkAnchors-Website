import type { ServiceIconName } from "@/types";

/**
 * SERVICE ICONOGRAPHY
 *
 * Drawn here rather than pulled from an icon library on purpose.
 *
 * Every general-purpose set (Lucide, Feather, Heroicons) is built on
 * round line caps and round joins. This brand has no curves and no
 * rounded corners anywhere — the mark, the diagrams and the borders are
 * all square-capped hairlines at 45-degree increments. Dropping a
 * rounded icon set into it would read as borrowed, which is exactly the
 * tell the brief asks us to avoid.
 *
 * So the set is built from the same vocabulary the rest of the site uses:
 * squares, diamonds, hairlines, 45-degree diagonals. 24-unit grid,
 * 1.5 stroke, square caps, no fills except where a node is active.
 *
 * The diamond appears in the icons that describe convergence or
 * intelligence, tying them back to the mark.
 */

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  "aria-hidden": true,
  focusable: "false" as const,
};

const SIZE = "h-6 w-6";

/* --- DIGITAL INFRASTRUCTURE ------------------------------------- */

/** Browser frame with a content rule — a website. */
function Website({ className }: IconProps) {
  return (
    <svg {...base} className={className ?? SIZE}>
      <rect x="2.5" y="4" width="19" height="16" />
      <path d="M2.5 8.5 H21.5" />
      <path d="M5.5 6.25 H7" />
      <path d="M6 12.5 H13" />
      <path d="M6 16 H10.5" />
    </svg>
  );
}

/** A frame narrowing to a single target — one page, one action. */
function LandingPage({ className }: IconProps) {
  return (
    <svg {...base} className={className ?? SIZE}>
      <rect x="3.5" y="3" width="17" height="18" />
      <path d="M7.5 7.5 H16.5" />
      <path d="M9 11 H15" />
      <rect x="9" y="15" width="6" height="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Panel grid with a plotted series — a dashboard. */
function Dashboard({ className }: IconProps) {
  return (
    <svg {...base} className={className ?? SIZE}>
      <rect x="2.5" y="3.5" width="19" height="17" />
      <path d="M2.5 9 H21.5 M12 9 V20.5" />
      <path d="M5 17 L7 14 L9 15.5" />
      <path d="M15 17.5 V13 M18 17.5 V15" />
    </svg>
  );
}

/* --- ACQUISITION -------------------------------------------------- */

/** Concentric squares closing on a node — targeted acquisition. */
function Targeting({ className }: IconProps) {
  return (
    <svg {...base} className={className ?? SIZE}>
      <rect x="3" y="3" width="18" height="18" />
      <rect x="8" y="8" width="8" height="8" />
      <path d="M12 1.5 V4.5 M12 19.5 V22.5 M1.5 12 H4.5 M19.5 12 H22.5" />
      <path d="M12 10.5 L13.5 12 L12 13.5 L10.5 12 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Query field with a result rule — search intent. */
function Search({ className }: IconProps) {
  return (
    <svg {...base} className={className ?? SIZE}>
      <rect x="3" y="4" width="18" height="6" />
      <path d="M6 7 H13" />
      <path d="M3 14 H14 M3 17.5 H10" />
      <path d="M17 13.5 L20.5 17 L17 20.5" />
    </svg>
  );
}

/** Frame with a play form — video acquisition. */
function Video({ className }: IconProps) {
  return (
    <svg {...base} className={className ?? SIZE}>
      <rect x="2.5" y="4.5" width="19" height="15" />
      <path d="M10 9 L15.5 12 L10 15 Z" />
    </svg>
  );
}

/** Two nodes joined across an org boundary — professional network. */
function Professional({ className }: IconProps) {
  return (
    <svg {...base} className={className ?? SIZE}>
      <rect x="2.5" y="2.5" width="8" height="8" />
      <rect x="13.5" y="13.5" width="8" height="8" />
      <path d="M10.5 6.5 H17.5 V13.5" />
      <path d="M6.5 10.5 V17.5 H13.5" />
    </svg>
  );
}

/* --- SOCIAL AND CONTENT ------------------------------------------- */

/** A hub distributing to three endpoints — presence, not posting. */
function Broadcast({ className }: IconProps) {
  return (
    <svg {...base} className={className ?? SIZE}>
      <path d="M12 8.5 L15 11.5 L12 14.5 L9 11.5 Z" fill="currentColor" stroke="none" />
      <path d="M12 8.5 V3 M15 14.5 L20 19.5 M9 14.5 L4 19.5" />
      <rect x="9.5" y="0.5" width="5" height="3" />
      <rect x="18.5" y="18.5" width="5" height="5" />
      <rect x="0.5" y="18.5" width="5" height="5" />
    </svg>
  );
}

/** Stacked sheets on a timeline — editorial content production. */
function Editorial({ className }: IconProps) {
  return (
    <svg {...base} className={className ?? SIZE}>
      <rect x="3" y="2.5" width="14" height="17" />
      <path d="M17 6 H21 V23 H7" />
      <path d="M6.5 7 H13.5 M6.5 11 H13.5 M6.5 15 H10.5" />
    </svg>
  );
}

/* --- AUTOMATION AND AI -------------------------------------------- */

/** Branching path with a decision node — a workflow. */
function Workflow({ className }: IconProps) {
  return (
    <svg {...base} className={className ?? SIZE}>
      <rect x="1.5" y="9" width="5" height="6" />
      <rect x="17.5" y="2.5" width="5" height="6" />
      <rect x="17.5" y="15.5" width="5" height="6" />
      <path d="M6.5 12 H12 V5.5 H17.5" />
      <path d="M12 12 V18.5 H17.5" />
      <path d="M12 10.5 L13.5 12 L12 13.5 L10.5 12 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Convergent nodes around a centre — applied intelligence. */
function Intelligence({ className }: IconProps) {
  return (
    <svg {...base} className={className ?? SIZE}>
      <path d="M12 8 L16 12 L12 16 L8 12 Z" fill="currentColor" stroke="none" />
      <path d="M12 8 V3.5 M16 12 H20.5 M12 16 V20.5 M8 12 H3.5" />
      <rect x="10.5" y="2" width="3" height="3" />
      <rect x="19" y="10.5" width="3" height="3" />
      <rect x="10.5" y="19" width="3" height="3" />
      <rect x="2" y="10.5" width="3" height="3" />
    </svg>
  );
}

/** Stacked records — a customer database. */
function Records({ className }: IconProps) {
  return (
    <svg {...base} className={className ?? SIZE}>
      <rect x="3" y="3.5" width="18" height="5" />
      <rect x="3" y="9.5" width="18" height="5" />
      <rect x="3" y="15.5" width="18" height="5" />
      <path d="M6 6 H7.5 M6 12 H7.5 M6 18 H7.5" />
    </svg>
  );
}

/** A frame narrowing across three gates — qualification. */
function Qualify({ className }: IconProps) {
  return (
    <svg {...base} className={className ?? SIZE}>
      <path d="M2 4 H22 L15 12 V20 L9 17 V12 Z" />
      <path d="M9 12 H15" />
    </svg>
  );
}

/** A message frame with a return tail — conversational channels. */
function Message({ className }: IconProps) {
  return (
    <svg {...base} className={className ?? SIZE}>
      <path d="M2.5 4 H21.5 V16 H8 L3.5 20 V16 H2.5 Z" />
      <path d="M6.5 8 H17.5 M6.5 11.5 H13" />
    </svg>
  );
}

/* --- DATA AND CONVERSION ------------------------------------------ */

/** Plotted signal against an axis — behavioural telemetry. */
function Telemetry({ className }: IconProps) {
  return (
    <svg {...base} className={className ?? SIZE}>
      <path d="M3 3.5 V20.5 H21" />
      <path d="M6 16.5 L10 11 L13.5 13.5 L20 5" />
      <rect x="8.75" y="9.75" width="2.5" height="2.5" fill="currentColor" stroke="none" />
      <rect x="18.75" y="3.75" width="2.5" height="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** A traced path from source to outcome — attribution. */
function Attribution({ className }: IconProps) {
  return (
    <svg {...base} className={className ?? SIZE}>
      <rect x="1.5" y="4" width="5" height="5" />
      <rect x="17.5" y="15" width="5" height="5" />
      <path d="M6.5 6.5 H13 V17.5 H17.5" />
      <path d="M9.5 6.5 V12 H20" />
      <path d="M13 11 L14.5 12.5 L13 14 L11.5 12.5 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** A funnel losing volume at each gate — leakage analysis. */
function Leakage({ className }: IconProps) {
  return (
    <svg {...base} className={className ?? SIZE}>
      <path d="M2.5 3.5 H21.5 L17 10 H7 Z" />
      <path d="M7 10 L9.5 14.5 H14.5 L17 10" />
      <path d="M9.5 14.5 L11 19.5 H13 L14.5 14.5" />
      <path d="M4.5 12.5 V15 M19.5 12.5 V15" />
    </svg>
  );
}

/** Inspection frame over a record — a conversion audit. */
function Audit({ className }: IconProps) {
  return (
    <svg {...base} className={className ?? SIZE}>
      <rect x="2.5" y="2.5" width="14" height="14" />
      <path d="M5.5 6.5 H13.5 M5.5 10 H13.5 M5.5 13.5 H10" />
      <path d="M13 13 L21.5 21.5" />
      <rect x="11.5" y="11.5" width="3" height="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* --- REGISTRY ------------------------------------------------------ */

const REGISTRY: Record<ServiceIconName, (props: IconProps) => React.JSX.Element> = {
  website: Website,
  landingPage: LandingPage,
  dashboard: Dashboard,
  targeting: Targeting,
  search: Search,
  video: Video,
  professional: Professional,
  broadcast: Broadcast,
  editorial: Editorial,
  workflow: Workflow,
  intelligence: Intelligence,
  records: Records,
  qualify: Qualify,
  message: Message,
  telemetry: Telemetry,
  attribution: Attribution,
  leakage: Leakage,
  audit: Audit,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: ServiceIconName;
  className?: string;
}) {
  const Icon = REGISTRY[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}
