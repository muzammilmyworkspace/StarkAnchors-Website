import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.discipline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The social card.
 *
 * Same composition rules as the site: obsidian ground, the mark drawn
 * at scale, a column grid at 4% white, one signal rule, and the
 * statement set tight in Cabinet Grotesk.
 *
 * Satori cannot parse woff2, so this reads the static extrabold TTF
 * rather than the variable face the site itself serves. Both are the
 * same typeface — the OG card just gets the single weight it needs.
 */
export default async function OpengraphImage() {
  const display = await readFile(
    join(process.cwd(), "public", "fonts", "CabinetGrotesk-Extrabold.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0D0D11",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Column grid */}
        <div style={{ position: "absolute", inset: 0, display: "flex" }}>
          {[1, 2, 3, 4, 5].map((column) => (
            <div
              key={column}
              style={{
                position: "absolute",
                left: `${(column / 6) * 100}%`,
                top: 0,
                bottom: 0,
                width: 1,
                background: "rgba(226,232,240,0.05)",
              }}
            />
          ))}
        </div>

        {/* Lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="46" height="46" viewBox="0 0 32 32">
            <g fill="none" stroke="#E2E8F0" strokeWidth={1.7} strokeLinecap="square">
              <path d="M5.5 6.5 L16 15 M26.5 6.5 L16 15" />
              <path d="M16 17.4 V25.5" />
              <path d="M7.5 25.5 H24.5" />
            </g>
            <path d="M16 12.6 L18.4 15 L16 17.4 L13.6 15 Z" fill="#E2E8F0" />
          </svg>

          <div style={{ width: 1, height: 34, background: "rgba(226,232,240,0.28)" }} />

          <div
            style={{
              fontFamily: "Cabinet",
              fontSize: 28,
              color: "#E2E8F0",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Stark Anchors
          </div>
        </div>

        {/* Statement */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Cabinet",
              fontSize: 86,
              lineHeight: 0.94,
              letterSpacing: -3,
              textTransform: "uppercase",
              color: "#656D7D",
            }}
          >
            We don’t optimize campaigns.
          </div>
          <div
            style={{
              fontFamily: "Cabinet",
              fontSize: 86,
              lineHeight: 0.94,
              letterSpacing: -3,
              textTransform: "uppercase",
              color: "#E2E8F0",
            }}
          >
            We engineer businesses.
          </div>
        </div>

        {/* Footing */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              height: 1,
              width: "58%",
              background: "linear-gradient(90deg, rgba(226,232,240,0) 0%, rgba(226,232,240,0.5) 40%, #00E5FF 100%)",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 19, color: "#828A9A", letterSpacing: 3, textTransform: "uppercase" }}>
              {site.discipline}
            </div>
            <div style={{ fontSize: 19, color: "#828A9A", letterSpacing: 3 }}>
              {site.domain}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Cabinet", data: display, weight: 800, style: "normal" }],
    },
  );
}
