import type { LogBlock } from "@/types";

/**
 * ARTICLE FIGURES
 *
 * Three small diagrams, drawn in the same hairline language as the
 * rest of the site. They exist because each one shows something the
 * surrounding paragraph can only assert — a shape, a rate, a gap.
 *
 * Every figure carries an explicit "illustrative" note in its axis
 * furniture. These are drawn to explain a mechanism, and none of them
 * is a measurement of a client system.
 */

type FigureKind = Extract<LogBlock, { type: "figure" }>["diagram"];

const VIEW_W = 640;
const VIEW_H = 220;
const PAD_L = 44;
const PAD_R = 16;
const PAD_T = 18;
const PAD_B = 34;

const PLOT_W = VIEW_W - PAD_L - PAD_R;
const PLOT_H = VIEW_H - PAD_T - PAD_B;

const AXIS = "rgba(226,232,240,0.18)";
const INK = "rgba(226,232,240,0.55)";
const META: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 9,
  letterSpacing: 1.1,
  textTransform: "uppercase",
};

/** Maps a 0..1 value pair into plot coordinates. */
const px = (t: number) => PAD_L + t * PLOT_W;
const py = (v: number) => PAD_T + (1 - v) * PLOT_H;

function Frame({
  children,
  xLabels,
  yLabel,
}: {
  children: React.ReactNode;
  xLabels: string[];
  yLabel: string;
}) {
  return (
    <>
      {/* Axes: two rules, no box, no gridlines beyond the baseline. */}
      <path
        d={`M ${PAD_L} ${PAD_T} V ${PAD_T + PLOT_H} H ${PAD_L + PLOT_W}`}
        stroke={AXIS}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        fill="none"
      />

      {/* Midline. One reference, so the vertical axis has a scale and
          the space under the plot reads as headroom rather than as a
          gap someone forgot to fill. */}
      <line
        x1={PAD_L}
        y1={py(0.5)}
        x2={PAD_L + PLOT_W}
        y2={py(0.5)}
        stroke="rgba(226,232,240,0.08)"
        strokeDasharray="2 4"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />

      <text x={4} y={PAD_T + 4} fill="rgba(226,232,240,0.32)" style={META}>
        {yLabel}
      </text>
      <text x={4} y={py(0.5) + 3} fill="rgba(226,232,240,0.24)" style={META}>
        50
      </text>

      {xLabels.map((label, index) => (
        <text
          key={label}
          x={px(index / (xLabels.length - 1))}
          y={VIEW_H - 14}
          textAnchor={index === 0 ? "start" : index === xLabels.length - 1 ? "end" : "middle"}
          fill="rgba(226,232,240,0.32)"
          style={META}
        >
          {label}
        </text>
      ))}

      {children}
    </>
  );
}

/** LOG 01 — state surviving each handoff. A descending step chart. */
function HandoffFigure() {
  const stages = [1, 0.96, 0.88, 0.71, 0.58];
  const step = 1 / stages.length;

  const path = stages
    .map((value, index) => {
      const x0 = px(index * step);
      const x1 = px((index + 1) * step);
      const y = py(value);
      return `${index === 0 ? `M ${x0} ${y}` : `L ${x0} ${y}`} L ${x1} ${y}`;
    })
    .join(" ");

  return (
    <Frame
      yLabel="State"
      xLabels={["Ad", "Site", "Form", "Automation", "CRM"]}
    >
      {/* Drop lines at each handoff — the loss, made visible. */}
      {stages.slice(1).map((value, index) => (
        <line
          key={index}
          x1={px((index + 1) * step)}
          y1={py(stages[index])}
          x2={px((index + 1) * step)}
          y2={py(value)}
          stroke="var(--laser)"
          strokeOpacity={0.55}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ))}

      <path d={path} stroke={INK} strokeWidth={1} vectorEffect="non-scaling-stroke" fill="none" />

      {stages.map((value, index) => (
        <g key={index}>
          <rect
            x={px(index * step + step / 2) - 2}
            y={py(value) - 2}
            width={4}
            height={4}
            fill="rgba(226,232,240,0.7)"
          />
          {/* The value, printed on the step. Without it the plot is a
              shape with no scale, and the lower half of the frame reads
              as empty space rather than as remaining headroom. */}
          <text
            x={px(index * step + step / 2)}
            y={py(value) - 10}
            textAnchor="middle"
            fill="rgba(226,232,240,0.5)"
            style={META}
          >
            {Math.round(value * 100)}
          </text>
        </g>
      ))}
    </Frame>
  );
}

/** LOG 02 — response probability against elapsed time. */
function DecayFigure() {
  const samples = Array.from({ length: 41 }, (_, index) => {
    const t = index / 40;
    // Sharp early decay, long tail — the shape the paragraph describes.
    return { t, v: Math.exp(-4.2 * t) };
  });

  const line = samples
    .map((sample, index) => `${index === 0 ? "M" : "L"} ${px(sample.t)} ${py(sample.v)}`)
    .join(" ");

  const area = `${line} L ${px(1)} ${py(0)} L ${px(0)} ${py(0)} Z`;

  return (
    <Frame yLabel="Response" xLabels={["0 min", "15", "30", "45", "60 min"]}>
      <path d={area} fill="rgba(0,229,255,0.07)" />
      <path
        d={line}
        stroke="var(--laser)"
        strokeOpacity={0.8}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        fill="none"
      />
      {/* The first five minutes, marked. */}
      <line
        x1={px(5 / 60)}
        y1={PAD_T}
        x2={px(5 / 60)}
        y2={PAD_T + PLOT_H}
        stroke={AXIS}
        strokeDasharray="3 3"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
      <text x={px(5 / 60) + 6} y={PAD_T + 10} fill="rgba(226,232,240,0.42)" style={META}>
        First 5 min
      </text>
    </Frame>
  );
}

/** LOG 03 — observed volume falling away, modelled volume filling in. */
function LeakFigure() {
  const samples = Array.from({ length: 33 }, (_, index) => {
    const t = index / 32;
    const observed = 0.9 - 0.55 * t;
    return { t, observed, total: 0.9 };
  });

  const observedLine = samples
    .map((s, index) => `${index === 0 ? "M" : "L"} ${px(s.t)} ${py(s.observed)}`)
    .join(" ");

  const totalLine = `M ${px(0)} ${py(0.9)} L ${px(1)} ${py(0.9)}`;

  // Modelled = the wedge between observed and total.
  const modelled = `${observedLine} L ${px(1)} ${py(0.9)} L ${px(0)} ${py(0.9)} Z`;

  return (
    <Frame yLabel="Volume" xLabels={["2020", "2022", "2024", "2026"]}>
      <path d={modelled} fill="rgba(226,232,240,0.06)" />
      <path
        d={`${observedLine} L ${px(1)} ${py(0)} L ${px(0)} ${py(0)} Z`}
        fill="rgba(0,229,255,0.07)"
      />
      <path
        d={totalLine}
        stroke={AXIS}
        strokeDasharray="3 3"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={observedLine}
        stroke="var(--laser)"
        strokeOpacity={0.8}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        fill="none"
      />
      <text x={px(0.06)} y={py(0.9) - 8} fill="rgba(226,232,240,0.42)" style={META}>
        Modelled
      </text>
      <text x={px(0.06)} y={py(0.36)} fill="rgba(0,229,255,0.6)" style={META}>
        Observed
      </text>
    </Frame>
  );
}

const FIGURES: Record<FigureKind, () => React.JSX.Element> = {
  handoff: HandoffFigure,
  decay: DecayFigure,
  leak: LeakFigure,
};

export function LogFigure({ kind, caption }: { kind: FigureKind; caption: string }) {
  const Diagram = FIGURES[kind];

  return (
    <figure className="my-12">
      <div className="border-y border-line py-6">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="h-auto w-full"
          role="img"
          aria-label={caption}
        >
          <Diagram />
        </svg>
      </div>
      <figcaption className="mt-4 flex items-baseline gap-3">
        <span className="t-meta-sm text-titanium-faint">Fig.</span>
        <span className="t-body-s text-titanium-dim">
          {caption} <span className="text-titanium-faint">Illustrative.</span>
        </span>
      </figcaption>
    </figure>
  );
}
