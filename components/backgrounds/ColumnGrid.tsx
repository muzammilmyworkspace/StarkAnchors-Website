/**
 * The architectural column grid.
 *
 * Six vertical hairlines aligned to the editorial grid, held at an
 * opacity just above the threshold of notice, plus a drafting cross at
 * the head of each column. It runs behind every page and never moves.
 *
 * This is the single most load-bearing decision in the background
 * system: it makes the site read as a drawing that content is placed
 * onto, rather than as a dark page with effects on it. Static, free,
 * and impossible to mistake for a generated gradient.
 */
export function ColumnGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 mx-auto w-full max-w-[var(--shell-max)] px-[var(--gutter)]"
    >
      <div className="relative grid h-full grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="relative border-l border-line-faint">
            {/* Head tick. Only on the interior columns — the outermost
                one would collide with the shell edge. */}
            {index > 0 && (
              <span className="tick" style={{ left: "-3px", top: "88px" }} />
            )}
          </div>
        ))}
        {/* Closing line, so the grid terminates rather than trailing off. */}
        <div className="absolute inset-y-0 right-0 w-px bg-line-faint" />
      </div>
    </div>
  );
}
