/**
 * Minimal class joiner.
 *
 * Deliberately not `clsx` + `tailwind-merge`: this project has a token
 * system rather than a utility-collision problem, and two dependencies
 * to concatenate strings is not a trade worth making.
 */
export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  for (const input of inputs) {
    if (!input && input !== 0) continue;

    if (typeof input === "string" || typeof input === "number") {
      out.push(String(input));
      continue;
    }

    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) out.push(nested);
      continue;
    }

    for (const [key, active] of Object.entries(input)) {
      if (active) out.push(key);
    }
  }

  return out.join(" ");
}
