/**
 * The drawing title block.
 *
 * Borrowed directly from technical drafting: the boxed field in the
 * corner of a drawing that states what the sheet is, who issued it and
 * at what revision. Here it states the discipline, the scope, the
 * current intake status and a document number.
 *
 * Every value is factual. There is no headcount, no client count, no
 * "projects delivered" — those would be the exact fabricated metrics
 * the rest of this site refuses to print.
 */
const FIELDS: { label: string; value: string }[] = [
  { label: "Discipline", value: "Business Systems Engineering" },
  { label: "Scope", value: "Telemetry · Pipeline · Automation" },
  { label: "Intake", value: "Open — diagnostic required" },
  { label: "Document", value: "SA-000 / REV 01" },
];

export function TitleBlock() {
  return (
    <dl className="border-t border-line-strong">
      {FIELDS.map((field, index) => (
        <div
          key={field.label}
          // Stacked on narrow viewports: a 96px label column leaves the
          // value too little room, and "Telemetry · Pipeline ·
          // Automation" breaks mid-list.
          className={`flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-4 ${
            index < FIELDS.length - 1 ? "border-b border-line" : ""
          }`}
        >
          <dt className="t-meta-sm w-24 shrink-0 text-titanium-faint">{field.label}</dt>
          <dd className="t-mono text-titanium-dim">{field.value}</dd>
        </div>
      ))}
    </dl>
  );
}
