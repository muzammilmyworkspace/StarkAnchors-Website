import { diagnosticFields } from "@/data/diagnostic";
import type { DiagnosticField, DiagnosticPayload } from "@/types";

/**
 * Validation shared by the client form and the API route.
 *
 * The route re-runs this on every submission rather than trusting the
 * client, because a form that only validates in the browser is not
 * validated. Both sides importing the same module is what keeps the
 * two definitions from drifting.
 */

/** Pragmatic, not RFC 5322. Rejects the obvious, accepts the unusual. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const FIELD_MAX = 2000;

export type FieldErrors = Record<string, string>;

export function validateField(field: DiagnosticField, raw: string | undefined): string | null {
  const value = (raw ?? "").trim();

  if (!value) {
    return field.required ? "Required." : null;
  }

  if (value.length > FIELD_MAX) {
    return `Keep this under ${FIELD_MAX} characters.`;
  }

  switch (field.type) {
    case "email":
      return EMAIL.test(value) ? null : "Enter a valid work email address.";

    case "url": {
      // Accept "company.com" as well as a full origin — asking a
      // visitor to type a scheme is a pointless failure to absorb.
      const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`;
      try {
        const url = new URL(candidate);
        return url.hostname.includes(".") ? null : "Enter a valid website address.";
      } catch {
        return "Enter a valid website address.";
      }
    }

    case "choice":
      return field.options?.includes(value) ? null : "Select one of the options.";

    default:
      return null;
  }
}

/** Validates one step. Returns an empty object when the step is clear. */
export function validateFields(
  fields: DiagnosticField[],
  values: DiagnosticPayload,
): FieldErrors {
  const errors: FieldErrors = {};

  for (const field of fields) {
    const error = validateField(field, values[field.name]);
    if (error) errors[field.name] = error;
  }

  return errors;
}

/** Validates a complete submission against every declared field. */
export function validateSubmission(values: DiagnosticPayload): FieldErrors {
  return validateFields(diagnosticFields, values);
}

/**
 * Reduces an arbitrary request body to the declared fields only, with
 * lengths capped. Anything not in `data/diagnostic.ts` is discarded
 * rather than forwarded.
 */
export function sanitisePayload(input: unknown): DiagnosticPayload {
  const payload: DiagnosticPayload = {};
  if (typeof input !== "object" || input === null) return payload;

  const record = input as Record<string, unknown>;

  for (const field of diagnosticFields) {
    const value = record[field.name];
    if (typeof value === "string") {
      payload[field.name] = value.trim().slice(0, FIELD_MAX);
    }
  }

  return payload;
}
