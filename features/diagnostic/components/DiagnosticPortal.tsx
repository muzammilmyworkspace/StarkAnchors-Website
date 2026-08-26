"use client";

import { useCallback, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ActionButton } from "@/components/ui/Action";
import { ArrowLeft, Check } from "@/components/ui/icons";
import { diagnosticConfirmation, diagnosticSteps } from "@/data/diagnostic";
import { site } from "@/data/site";
import { EASE_OUT } from "@/lib/animations/presets";
import { validateFields, type FieldErrors } from "@/lib/diagnostic/validate";
import type { DiagnosticPayload } from "@/types";
import { FieldControl } from "./FieldControl";
import { StepRail } from "./StepRail";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * SIGNATURE 05 — THE DIAGNOSTIC PORTAL
 *
 * Six steps rendered from `data/diagnostic.ts`. Adding a field to that
 * file adds it to the interface, the validation and the payload with
 * no change here.
 *
 * Behaviour worth noting:
 *
 *   Validation runs per step on advance and again on the server. The
 *   form carries `noValidate` so the browser's own bubbles never fire
 *   — one validation voice, in the page's own typography.
 *
 *   Focus moves to the step heading on every transition, so a keyboard
 *   or screen-reader user is placed at the top of the new step rather
 *   than left on a button that has just changed meaning.
 *
 *   Failure is honest. If the intake endpoint is not configured or
 *   cannot be reached, the interface says so and hands over a direct
 *   email containing the answers already given, rather than showing a
 *   confirmation for a submission that went nowhere.
 */
export function DiagnosticPortal() {
  const [values, setValues] = useState<DiagnosticPayload>({});
  const [errors, setErrors] = useState<FieldErrors>({});
  const [current, setCurrent] = useState(0);
  const [furthest, setFurthest] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState<string>("");

  const headingRef = useRef<HTMLHeadingElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const step = diagnosticSteps[current];
  const isLast = current === diagnosticSteps.length - 1;

  const onChange = useCallback((name: string, value: string) => {
    setValues((previous) => ({ ...previous, [name]: value }));
    // Clear the error as soon as the field is touched. Leaving it up
    // while someone is actively correcting it is just nagging.
    setErrors((previous) => {
      if (!previous[name]) return previous;
      const next = { ...previous };
      delete next[name];
      return next;
    });
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setFurthest((previous) => Math.max(previous, index));
    // Defer to the next frame so the heading for the new step exists.
    requestAnimationFrame(() => headingRef.current?.focus());
  }, []);

  const submit = useCallback(async () => {
    setStatus("submitting");
    setFailure("");

    try {
      const response = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, _hp: honeypotRef.current?.value ?? "" }),
      });

      const result = (await response.json()) as {
        ok: boolean;
        errors?: FieldErrors;
        message?: string;
      };

      if (response.ok && result.ok) {
        setStatus("success");
        return;
      }

      if (result.errors) {
        setErrors(result.errors);
        // Send the visitor back to the first step that has a problem.
        const firstBad = diagnosticSteps.findIndex((candidate) =>
          candidate.fields.some((field) => result.errors?.[field.name]),
        );
        setStatus("idle");
        if (firstBad >= 0) goTo(firstBad);
        return;
      }

      setStatus("error");
      setFailure(result.message ?? "The submission could not be delivered.");
    } catch {
      setStatus("error");
      setFailure("The submission could not be delivered. Check your connection and retry.");
    }
  }, [values, goTo]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const stepErrors = validateFields(step.fields, values);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    if (isLast) {
      void submit();
    } else {
      goTo(current + 1);
    }
  };

  /* ---- Confirmation ---------------------------------------------- */
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        role="status"
        className="form-surface p-7 lg:p-10"
      >
        <div className="flex items-center gap-3">
          <span aria-hidden className="text-laser">
            <Check className="h-4 w-4" />
          </span>
          <span className="t-meta text-laser">Received</span>
        </div>

        <h2 className="t-display-l mt-7 max-w-[16ch]">{diagnosticConfirmation.title}</h2>

        <div className="mt-8 max-w-[52ch] space-y-5">
          {diagnosticConfirmation.lines.map((line) => (
            <p key={line} className="t-body-l">
              {line}
            </p>
          ))}
        </div>

        <dl className="mt-12 grid max-w-lg grid-cols-2 border-t border-line">
          <div className="border-b border-line py-4">
            <dt className="t-meta-sm text-titanium-faint">Queue</dt>
            <dd className="t-mono mt-2 text-titanium">Analysis</dd>
          </div>
          <div className="border-b border-l border-line py-4 pl-5">
            <dt className="t-meta-sm text-titanium-faint">Response</dt>
            <dd className="t-mono mt-2 text-titanium">{site.responseWindow}</dd>
          </div>
        </dl>
      </motion.div>
    );
  }

  /* ---- Form ------------------------------------------------------- */
  return (
    <div className="grid-12">
      <div className="col-span-12 lg:col-span-3">
        <div className="lg:sticky lg:top-32">
          <StepRail current={current} furthest={furthest} onSelect={goTo} />
        </div>
      </div>

      <div className="col-span-12 mt-10 lg:col-span-8 lg:col-start-5 lg:mt-0">
        {/* The form gets an explicit panel. It is the one place on the site
            where a visitor has to do sustained work, and an edgeless veil
            is not enough ground for that. */}
        <form onSubmit={onSubmit} noValidate className="form-surface p-7 lg:p-10">
          {/* Honeypot. Off-screen rather than display:none, because some
              bots skip hidden inputs but not positioned ones. */}
          <div aria-hidden className="absolute left-[-9999px] top-0 h-px w-px overflow-hidden">
            <label htmlFor="sa-hp">Leave this field empty</label>
            <input id="sa-hp" ref={honeypotRef} type="text" name="_hp" tabIndex={-1} autoComplete="off" />
          </div>

          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, ease: EASE_OUT }}
          >
            <div className="border-t border-line pt-8">
              <p className="t-meta-sm text-titanium-faint">Step {step.index}</p>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="t-display-m mt-4 text-titanium outline-none"
              >
                {step.title}
              </h2>
              <p className="t-body mt-4 max-w-[46ch]">{step.intent}</p>
            </div>

            <div className="mt-12 space-y-9">
              {step.fields.map((field) => (
                <FieldControl
                  key={field.name}
                  field={field}
                  value={values[field.name] ?? ""}
                  error={errors[field.name]}
                  onChange={onChange}
                />
              ))}
            </div>
          </motion.div>

          {/* Delivery failure — stated plainly, with a way through. */}
          {status === "error" && (
            <div role="alert" className="mt-10 border-l-2 border-status-fault pl-5">
              <p className="t-meta-sm text-status-fault">Delivery failed</p>
              <p className="t-body-s mt-2.5 max-w-[48ch]">{failure}</p>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(
                  "System diagnostic request",
                )}&body=${encodeURIComponent(
                  diagnosticSteps
                    .flatMap((entry) => entry.fields)
                    .map((field) => `${field.label}: ${values[field.name] ?? ""}`)
                    .join("\n"),
                )}`}
                className="btn-inline mt-5 inline-flex"
              >
                Send by email instead
              </a>
            </div>
          )}

          {/* Controls */}
          <div className="mt-12 flex items-center justify-between gap-4 border-t border-line pt-7">
            {current > 0 ? (
              <button
                type="button"
                onClick={() => goTo(current - 1)}
                className="t-meta inline-flex items-center gap-3 text-titanium-faint transition-colors hover:text-titanium"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </button>
            ) : (
              <span aria-hidden />
            )}

            <ActionButton type="submit" disabled={status === "submitting"}>
              {status === "submitting"
                ? "Transmitting"
                : isLast
                  ? "Initiate Diagnostic"
                  : "Continue"}
            </ActionButton>
          </div>
        </form>
      </div>
    </div>
  );
}
