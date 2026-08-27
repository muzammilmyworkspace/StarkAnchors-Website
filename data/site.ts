import type { SocialPlatform } from "@/types";

/**
 * Single source of truth for identity, positioning copy and the
 * canonical origin. Nothing here may assert a metric, a client or a
 * result that has not been independently verified.
 */

export const site = {
  name: "Stark Anchors",
  legalName: "Stark Anchors",
  domain: "starkanchors.com",
  url: "https://starkanchors.com",
  discipline: "Business Systems Engineering",
  tagline: "We don’t optimize campaigns. We engineer businesses.",
  description:
    "Stark Anchors engineers the digital systems behind business growth: websites, landing pages and dashboards, Meta, Google, YouTube and LinkedIn acquisition, social presence, AI and CRM automation, and the data layer that ties them to revenue.",
  shortDescription:
    "Systems engineering for the next generation of business. Digital infrastructure, performance acquisition, automation, AI and the data layer between them.",
  email: "info@starkanchors.com",
  /** E.164 for the tel: href. `phoneDisplay` is what a human reads. */
  phone: "+923185073407",
  phoneDisplay: "+92 318 5073407",
  /** Response window we commit to on the diagnostic portal. */
  responseWindow: "24 hours",
  locale: "en_US",
} as const;

export const mission =
  "We exist to remove speculation and fragmented execution from the business ecosystem. By combining behavioural telemetry, full-stack marketing funnels and precise AI automation, we debug operational complexity and deploy zero-friction pipelines built for predictable growth and institutional scale.";

export const vision =
  "To engineer the foundational digital infrastructure of the next-generation global economy, where every business operation is automated, every revenue leak is permanently debugged, and technology serves as a transparent catalyst for market leadership.";

export const positioning = {
  heroLineOne: "We don’t optimize campaigns.",
  heroLineTwo: "We engineer businesses.",
  heroSupport:
    "We build the digital systems behind growth — websites, landing pages and dashboards, paid acquisition across Meta, Google, YouTube and LinkedIn, social presence, AI and CRM automation, and the data layer that connects all of it to revenue.",
  closingLineOne: "Your business already has a system.",
  closingLineTwo: "The question is whether it is engineered.",
  /** The one-line answer to "what do you actually do?". */
  engineeringLead:
    "From the first line of code to the final conversion signal, Stark Anchors engineers the digital systems that move businesses forward.",
} as const;

/**
 * SOCIAL PROFILES — CHECK THESE BEFORE LAUNCH.
 *
 * WhatsApp is derived from the published phone number, so it is correct
 * by construction and opens a chat directly.
 *
 * The other three are the conventional handle for this brand name and
 * are assumptions, not confirmed accounts. Verify each one and correct
 * it here if the real handle differs — a social icon that leads
 * somewhere wrong costs more trust than no icon at all.
 */
export const socialProfiles: {
  platform: SocialPlatform;
  label: string;
  href: string;
  /** False once the URL has been confirmed against the live account. */
  assumed: boolean;
}[] = [
  {
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/starkanchors",
    assumed: true,
  },
  {
    platform: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/starkanchors",
    assumed: true,
  },
  {
    platform: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/starkanchors",
    assumed: true,
  },
  {
    platform: "whatsapp",
    label: "WhatsApp",
    href: `https://wa.me/${site.phone.replace("+", "")}`,
    assumed: false,
  },
];

/** The footer's contact prompt. */
export const contactPrompt = {
  headline: "Have a system that needs debugging?",
  body: "Tell us where the infrastructure is breaking. We’ll determine where the highest-leverage intervention begins.",
  action: "Initiate System Diagnostic",
} as const;
