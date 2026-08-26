import localFont from "next/font/local";

/**
 * Three families, self-hosted, variable, latin subset only.
 *
 *   Cabinet Grotesk   display — headlines, numerals, the wordmark
 *   Inter             body — everything a person reads in sentences
 *   JetBrains Mono    meta — indices, labels, system readouts
 *
 * All three are served from /public/fonts rather than a CDN, so there
 * is no third-party connection on the critical path and no build-time
 * network dependency. Total: three files, ~130KB, one request each.
 *
 * `display: swap` with an explicit metric-adjusted fallback keeps the
 * first paint legible without a layout shift when the face lands.
 */

export const cabinet = localFont({
  src: [
    {
      path: "../public/fonts/CabinetGrotesk-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-cabinet",
  display: "swap",
  preload: true,
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: false,
});

export const inter = localFont({
  src: [
    {
      path: "../public/fonts/Inter-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
  adjustFontFallback: false,
});

export const jetbrains = localFont({
  src: [
    {
      path: "../public/fonts/JetBrainsMono-Variable.woff2",
      weight: "100 800",
      style: "normal",
    },
  ],
  variable: "--font-jetbrains",
  display: "swap",
  // Mono is used for meta only — never for a first-paint headline, so
  // it does not need to preload ahead of the display face.
  preload: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
  adjustFontFallback: false,
});

export const fontVariables = `${cabinet.variable} ${inter.variable} ${jetbrains.variable}`;
