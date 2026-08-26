/**
 * Formatting helpers.
 *
 * Dates are formatted with an explicit locale and UTC time zone so the
 * server render and the client render can never disagree — a mismatch
 * here is one of the more annoying hydration errors to track down.
 */

const LOG_DATE = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "14 May 2026" */
export function formatLogDate(iso: string): string {
  return LOG_DATE.format(new Date(`${iso}T00:00:00Z`)).toUpperCase();
}

/** Pads a 1-based position into the "07" index form used throughout. */
export function toIndex(position: number): string {
  return String(position).padStart(2, "0");
}
