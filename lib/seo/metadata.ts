import type { Metadata } from "next";
import { site } from "@/data/site";

type PageMetaInput = {
  title: string;
  description: string;
  /** Route path with a leading slash. Drives canonical and OG url. */
  path: string;
  /** Overrides the generated OG image for a specific route. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
};

/**
 * One place that builds page metadata.
 *
 * Titles are composed as `Page — Stark Anchors` via the template in
 * the root layout, so `title` here is the page part only. Canonicals
 * are absolute and derived from a single origin constant, which is
 * what stops the staging domain leaking into production tags.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
}: PageMetaInput): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: `${title} — ${site.name}`,
      description,
      siteName: site.name,
      locale: site.locale,
      ...(image ? { images: [{ url: image }] } : {}),
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${site.name}`,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

/**
 * Organisation structured data.
 *
 * Deliberately minimal. No `aggregateRating`, no `review`, no employee
 * count, no founding claims — every one of those is a factual
 * assertion, and this company has not published verified figures.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    email: site.email,
    logo: `${site.url}/brand/mark-titanium.svg`,
    knowsAbout: [
      "Business systems engineering",
      "Revenue pipeline engineering",
      "Behavioural analytics",
      "Marketing automation",
      "Conversion rate optimisation",
      "Data telemetry",
      "AI automation",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
  };
}

/** Article schema for an engineering log. */
export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    url: `${site.url}${input.path}`,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/brand/mark-titanium.svg`,
      },
    },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: `${site.url}${entry.path === "/" ? "" : entry.path}`,
    })),
  };
}

/** Serialises schema for a `<script type="application/ld+json">` tag. */
export function jsonLd(schema: object) {
  return { __html: JSON.stringify(schema).replace(/</g, "\\u003c") };
}
