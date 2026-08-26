/**
 * VALUE DIAGRAMS
 *
 * Six small architectural figures, one per principle. Each one states
 * its principle geometrically rather than illustrating it:
 *
 *   I    sampling points read off a signal before it is acted on
 *   II   identical modules, behaving identically
 *   III  flow re-routed away from a dead branch toward a live one
 *   IV   a load-bearing base that is not rebuilt
 *   V    distinct clusters, connected but not merged
 *   VI   every path terminating in one accountable node
 *
 * Drawn in the same 120-unit space with the same hairline weight, so
 * swapping between them reads as one instrument changing state rather
 * than six unrelated pictures.
 */

type DiagramProps = { active: boolean };

const V = 120;

const line = (active: boolean) => (active ? "rgba(226,232,240,0.5)" : "rgba(226,232,240,0.22)");
const node = (active: boolean) => (active ? "var(--laser)" : "rgba(226,232,240,0.45)");

const svg = {
  viewBox: `0 0 ${V} ${V}`,
  fill: "none",
  strokeWidth: 1,
  strokeLinecap: "square" as const,
  vectorEffect: "non-scaling-stroke" as const,
  "aria-hidden": true,
};

/** I — Predictive Telemetry: a signal, sampled. */
function Telemetry({ active }: DiagramProps) {
  const points = [18, 34, 50, 66, 82, 98];
  const y = (x: number) => 60 - Math.sin((x / V) * Math.PI * 2) * 26;
  return (
    <svg {...svg} className="h-full w-full">
      <path d="M10 60 H110" stroke="rgba(226,232,240,0.12)" />
      <path
        d={points.map((x, i) => `${i === 0 ? "M" : "L"} ${x} ${y(x).toFixed(1)}`).join(" ")}
        stroke={line(active)}
      />
      {points.map((x) => (
        <g key={x}>
          <path d={`M ${x} ${y(x).toFixed(1)} V 60`} stroke="rgba(226,232,240,0.16)" />
          <rect x={x - 2} y={y(x) - 2} width={4} height={4} fill={node(active)} stroke="none" />
        </g>
      ))}
    </svg>
  );
}

/** II — Operational Consistency: identical modules, identical behaviour. */
function Consistency({ active }: DiagramProps) {
  const cols = [16, 44, 72, 100];
  return (
    <svg {...svg} className="h-full w-full">
      {cols.map((x) => (
        <g key={x}>
          <rect x={x - 9} y={38} width={18} height={44} stroke={line(active)} />
          <path d={`M ${x} 30 V 38 M ${x} 82 V 90`} stroke={line(active)} />
          <rect x={x - 2} y={58} width={4} height={4} fill={node(active)} stroke="none" />
        </g>
      ))}
      <path d="M16 30 H100 M16 90 H100" stroke="rgba(226,232,240,0.16)" />
    </svg>
  );
}

/** III — Strategic Redistribution: capacity moved off a dead branch. */
function Redistribution({ active }: DiagramProps) {
  return (
    <svg {...svg} className="h-full w-full">
      <path d="M12 60 H44" stroke={line(active)} />
      {/* retired branch */}
      <path d="M44 60 L74 30 H104" stroke="rgba(226,232,240,0.14)" strokeDasharray="3 4" />
      <path d="M84 26 L92 34 M92 26 L84 34" stroke="rgba(226,232,240,0.2)" />
      {/* live branch, carrying the load */}
      <path d="M44 60 L74 90 H108" stroke={line(active)} />
      <rect x={42} y={58} width={4} height={4} fill={node(active)} stroke="none" />
      <path d="M104 90 L108 86 L108 94 Z" fill={node(active)} stroke="none" />
      <rect x={104} y={28} width={4} height={4} fill="rgba(226,232,240,0.25)" stroke="none" />
    </svg>
  );
}

/** IV — Established Truths: a base that is not rebuilt. */
function Foundation({ active }: DiagramProps) {
  return (
    <svg {...svg} className="h-full w-full">
      <path d="M14 88 H106" stroke={line(active)} />
      <path d="M26 88 V56 M60 88 V40 M94 88 V56" stroke={line(active)} />
      <path d="M26 56 L60 40 L94 56" stroke={line(active)} />
      <path d="M26 56 H94" stroke="rgba(226,232,240,0.16)" />
      <path d="M60 34 L64 40 L60 46 L56 40 Z" fill={node(active)} stroke="none" />
      {[26, 60, 94].map((x) => (
        <rect key={x} x={x - 2} y={88} width={4} height={4} fill="rgba(226,232,240,0.35)" stroke="none" />
      ))}
    </svg>
  );
}

/** V — Cross-Cultural Wisdom: clusters connected, not merged. */
function Clusters({ active }: DiagramProps) {
  const groups = [
    { cx: 28, cy: 40 },
    { cx: 92, cy: 36 },
    { cx: 58, cy: 88 },
  ];
  return (
    <svg {...svg} className="h-full w-full">
      <path
        d={`M${groups[0].cx} ${groups[0].cy} L${groups[1].cx} ${groups[1].cy} L${groups[2].cx} ${groups[2].cy} Z`}
        stroke="rgba(226,232,240,0.14)"
      />
      {groups.map((g, i) => (
        <g key={i}>
          <rect x={g.cx - 14} y={g.cy - 12} width={28} height={24} stroke={line(active)} />
          <rect x={g.cx - 8} y={g.cy - 2} width={4} height={4} fill={node(active)} stroke="none" />
          <rect x={g.cx + 4} y={g.cy - 2} width={4} height={4} fill="rgba(226,232,240,0.35)" stroke="none" />
          <rect x={g.cx - 2} y={g.cy - 9} width={4} height={4} fill="rgba(226,232,240,0.35)" stroke="none" />
        </g>
      ))}
    </svg>
  );
}

/** VI — Accountability: every path terminates in one node. */
function Accountability({ active }: DiagramProps) {
  const starts = [16, 40, 64, 88];
  return (
    <svg {...svg} className="h-full w-full">
      {starts.map((x) => (
        <g key={x}>
          <path d={`M ${x} 22 V 46 L 60 74`} stroke={line(active)} />
          <rect x={x - 2} y={20} width={4} height={4} fill="rgba(226,232,240,0.4)" stroke="none" />
        </g>
      ))}
      <path d="M60 74 L66 80 L60 86 L54 80 Z" fill={node(active)} stroke="none" />
      <path d="M60 86 V100 M38 100 H82" stroke={line(active)} />
      <rect x={48} y={68} width={24} height={24} stroke={active ? "var(--laser)" : "transparent"} strokeOpacity={0.4} />
    </svg>
  );
}

const DIAGRAMS = [Telemetry, Consistency, Redistribution, Foundation, Clusters, Accountability];

export function ValueDiagram({ index, active }: { index: number; active: boolean }) {
  const Diagram = DIAGRAMS[index] ?? DIAGRAMS[0];
  return <Diagram active={active} />;
}
