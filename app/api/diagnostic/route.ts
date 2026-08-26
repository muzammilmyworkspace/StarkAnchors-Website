import { NextResponse } from "next/server";
import { sanitisePayload, validateSubmission } from "@/lib/diagnostic/validate";
import { site } from "@/data/site";

/**
 * DIAGNOSTIC INTAKE — INTEGRATION POINT
 *
 * This route does not pretend to deliver anything it cannot deliver.
 *
 *   DIAGNOSTIC_WEBHOOK_URL set    the submission is forwarded and the
 *                                 caller is told it was accepted
 *   not set                       501 with an explicit message, and
 *                                 the interface offers the visitor a
 *                                 direct email fallback
 *
 * The alternative — accepting the request, logging it to a container
 * that will be recycled, and showing a confirmation screen — would
 * mean a visitor believing their enquiry had been received when it had
 * not. That is the one failure mode worth writing extra code to avoid.
 *
 * To connect a destination, set DIAGNOSTIC_WEBHOOK_URL to any endpoint
 * that accepts a JSON POST (CRM intake, Zapier/Make, Slack workflow, a
 * mail relay). Optionally set DIAGNOSTIC_WEBHOOK_TOKEN to have it sent
 * as a bearer token.
 */

/** Guard against an oversized body before parsing it. */
const MAX_BODY_BYTES = 32_000;

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, message: "Submission too large." },
      { status: 413 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Malformed request body." },
      { status: 400 },
    );
  }

  // Honeypot. A real visitor never sees this field, so anything that
  // fills it is automated. Answer 200 so the bot records a success and
  // does not retry, but forward nothing.
  const honeypot = (body as Record<string, unknown> | null)?.["_hp"];
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const payload = sanitisePayload(body);
  const errors = validateSubmission(payload);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const endpoint = process.env.DIAGNOSTIC_WEBHOOK_URL;

  if (!endpoint) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        message: `Intake endpoint is not configured. Send the submission directly to ${site.email}.`,
      },
      { status: 501 },
    );
  }

  const token = process.env.DIAGNOSTIC_WEBHOOK_TOKEN;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        source: site.domain,
        form: "system-diagnostic",
        // Stamped at request time on the server, where the clock is
        // authoritative — never sent from the client.
        receivedAt: new Date().toISOString(),
        submission: payload,
      }),
      // A hung intake endpoint must not hold the visitor's request open.
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`Intake endpoint responded ${response.status}`);
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("[diagnostic] delivery failed:", error);

    return NextResponse.json(
      {
        ok: false,
        configured: true,
        message: `The intake endpoint could not be reached. Send the submission directly to ${site.email}.`,
      },
      { status: 502 },
    );
  }
}

/** Anything other than POST is a client error, not a 404. */
export function GET() {
  return NextResponse.json(
    { ok: false, message: "Use POST." },
    { status: 405, headers: { allow: "POST" } },
  );
}
