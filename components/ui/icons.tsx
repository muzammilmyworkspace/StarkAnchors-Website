/**
 * Iconography.
 *
 * Hand-drawn on a 16-unit grid to match the mark: 1.5 stroke, square
 * caps, no rounded joins, no icon library. There are five of them and
 * there is no reason for there to be more — icons support the type,
 * they do not carry the design.
 */

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 16 16",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "square" as const,
  "aria-hidden": true,
  focusable: "false" as const,
};

/** Forward. Used in every action. */
export function ArrowRight({ className }: IconProps) {
  return (
    <svg {...base} className={className ?? "h-3.5 w-3.5"}>
      <path d="M2 8 H13" />
      <path d="M9 4 L13 8 L9 12" />
    </svg>
  );
}

/** Descent. Used between vertical pipeline stages. */
export function ArrowDown({ className }: IconProps) {
  return (
    <svg {...base} className={className ?? "h-3.5 w-3.5"}>
      <path d="M8 2 V13" />
      <path d="M4 9 L8 13 L12 9" />
    </svg>
  );
}

/** Return. Used in the 404 and the diagnostic back control. */
export function ArrowLeft({ className }: IconProps) {
  return (
    <svg {...base} className={className ?? "h-3.5 w-3.5"}>
      <path d="M14 8 H3" />
      <path d="M7 4 L3 8 L7 12" />
    </svg>
  );
}

/** Confirmation. The only tick in the system. */
export function Check({ className }: IconProps) {
  return (
    <svg {...base} className={className ?? "h-3.5 w-3.5"}>
      <path d="M2.5 8.5 L6 12 L13.5 4" />
    </svg>
  );
}

/** Dismissal. Mobile navigation close. */
export function Close({ className }: IconProps) {
  return (
    <svg {...base} className={className ?? "h-4 w-4"}>
      <path d="M3 3 L13 13 M13 3 L3 13" />
    </svg>
  );
}

/**
 * The navigation trigger. Two unequal rules rather than three equal
 * ones — a hamburger is the most reproduced shape on the internet and
 * this is a cheap place to not look like everyone else.
 */
export function MenuRules({ className, open = false }: IconProps & { open?: boolean }) {
  if (open) return <Close className={className ?? "h-4 w-4"} />;

  return (
    <svg {...base} className={className ?? "h-4 w-4"}>
      <path d="M2 5.5 H14" />
      <path d="M6 10.5 H14" />
    </svg>
  );
}
