"use client";

import { useId } from "react";
import type { DiagnosticField } from "@/types";

type FieldControlProps = {
  field: DiagnosticField;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
};

/**
 * One field, rendered from its declaration.
 *
 * The label sits above the control in meta type, the control itself is
 * a baseline rule rather than a box, and help text and errors are
 * wired through `aria-describedby`. Choice fields use real radio
 * inputs — a group of buttons with `aria-pressed` is easier to style
 * and worse for anyone using a screen reader, which is the wrong trade
 * on a form that is the only way to contact the company.
 */
export function FieldControl({ field, value, error, onChange }: FieldControlProps) {
  const reactId = useId();
  const id = `${field.name}-${reactId}`;
  const helpId = field.help ? `${id}-help` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helpId, errorId].filter(Boolean).join(" ") || undefined;

  const meta = (
    <>
      {field.help && !error && (
        <p id={helpId} className="t-body-s mt-2.5">
          {field.help}
        </p>
      )}
      {error && (
        <p id={errorId} className="t-meta-sm mt-2.5 text-status-fault">
          {error}
        </p>
      )}
    </>
  );

  /* ---- Choice --------------------------------------------------- */
  if (field.type === "choice") {
    return (
      <fieldset aria-describedby={describedBy}>
        <legend className="t-meta text-titanium-faint">
          {field.label}
          {field.required && (
            <span aria-hidden className="ml-1.5 text-laser">
              *
            </span>
          )}
        </legend>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {field.options?.map((option) => {
            const optionId = `${id}-${option.replace(/\W+/g, "-").toLowerCase()}`;
            const selected = value === option;

            return (
              <label
                key={option}
                htmlFor={optionId}
                data-selected={selected}
                className="option has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-laser"
              >
                <input
                  id={optionId}
                  type="radio"
                  name={field.name}
                  value={option}
                  checked={selected}
                  onChange={() => onChange(field.name, option)}
                  className="sr-only"
                />
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className={
                      selected
                        ? "h-1.5 w-1.5 shrink-0 bg-laser"
                        : "h-1.5 w-1.5 shrink-0 bg-titanium-ghost"
                    }
                  />
                  {option}
                </span>
              </label>
            );
          })}
        </div>

        {meta}
      </fieldset>
    );
  }

  /* ---- Text and textarea ---------------------------------------- */
  const shared = {
    id,
    name: field.name,
    value,
    placeholder: field.placeholder,
    required: field.required,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": describedBy,
    className: "field",
  };

  return (
    <div>
      <label htmlFor={id} className="t-meta text-titanium-faint">
        {field.label}
        {field.required && (
          <span aria-hidden className="ml-1.5 text-laser">
            *
          </span>
        )}
      </label>

      {field.type === "textarea" ? (
        <textarea
          {...shared}
          rows={4}
          onChange={(event) => onChange(field.name, event.target.value)}
        />
      ) : (
        <input
          {...shared}
          type={field.type === "email" ? "email" : field.type === "url" ? "url" : "text"}
          inputMode={field.type === "email" ? "email" : undefined}
          autoComplete={
            field.name === "fullName"
              ? "name"
              : field.name === "email"
                ? "email"
                : field.name === "company"
                  ? "organization"
                  : field.name === "website"
                    ? "url"
                    : "off"
          }
          onChange={(event) => onChange(field.name, event.target.value)}
        />
      )}

      {meta}
    </div>
  );
}
