import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SystemTransition } from "@/components/motion/SystemTransition";
import { site } from "@/data/site";
import { fontVariables } from "@/lib/fonts";
import { jsonLd, organizationSchema, websiteSchema } from "@/lib/seo/metadata";

import "./globals.css";
import "../styles/boot.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.discipline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "business systems engineering",
    "revenue pipeline engineering",
    "behavioural analytics",
    "marketing infrastructure",
    "business automation",
    "conversion systems",
    "data telemetry",
    "AI automation",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.discipline}`,
    description: site.description,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.discipline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0D0D11",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/**
 * Session stamp for the boot sequence.
 *
 * Runs before first paint. If this session has already seen the boot
 * overlay, `[data-booted]` is set and CSS removes it from the document
 * — so there is never a flash of overlay on an internal navigation or
 * a reload. Wrapped in try/catch because sessionStorage throws outright
 * in some privacy modes, and the correct failure here is "skip the
 * animation", never "break the page".
 */
const BOOT_STAMP = `try{if(sessionStorage.getItem("sa.boot")){document.documentElement.dataset.booted="1"}else{sessionStorage.setItem("sa.boot","1")}}catch(e){document.documentElement.dataset.booted="1"}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_STAMP }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(organizationSchema())}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(websiteSchema())}
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <SystemTransition />
        <SiteHeader />

        {/* No z-index here on purpose. The environment field sits on a
            negative layer, so main must not open a stacking context that
            would trap it — or clamp the boot overlay under the header. */}
        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
