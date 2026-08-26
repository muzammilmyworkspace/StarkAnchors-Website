import type { NavItem, SystemStatusItem } from "@/types";

/**
 * Primary navigation. `index` is the mono rail number used in the
 * full-screen mobile navigation; it is not decorative — it is the
 * reading order.
 */
export const primaryNav: NavItem[] = [
  {
    label: "Systems",
    href: "/services",
    index: "01",
    description: "Websites, acquisition, automation, AI and data",
  },
  {
    label: "About",
    href: "/about",
    index: "02",
    description: "The engineering thesis and the principles under it",
  },
  {
    label: "Pricing",
    href: "/pricing",
    index: "03",
    description: "Infrastructure depth and engagement scope",
  },
  {
    label: "Engineering Logs",
    href: "/engineering-logs",
    index: "04",
    description: "Field notes from the infrastructure layer",
  },
];

export const primaryAction = {
  label: "Initiate Audit",
  href: "/diagnostic",
} as const;

/**
 * Footer index.
 *
 * "Systems" lists what a visitor would actually search for — websites,
 * ads, dashboards — rather than the positioning names. The footer is
 * where someone goes when the navigation did not answer their question,
 * so it is the wrong place to make them decode anything.
 */
export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Systems",
    items: [
      { label: "Website Development", href: "/services#digital-experience", index: "01", description: "" },
      { label: "Landing Pages", href: "/services#digital-experience", index: "02", description: "" },
      { label: "Dashboards", href: "/services#digital-experience", index: "03", description: "" },
      { label: "Meta & Google Ads", href: "/services#acquisition", index: "04", description: "" },
      { label: "YouTube & LinkedIn Ads", href: "/services#acquisition", index: "05", description: "" },
      { label: "Social Presence", href: "/services#social-presence", index: "06", description: "" },
      { label: "Automation & AI", href: "/services#automation-ai", index: "07", description: "" },
      { label: "Data & Attribution", href: "/services#data-conversion", index: "08", description: "" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about", index: "01", description: "" },
      { label: "Services", href: "/services", index: "02", description: "" },
      { label: "Pricing", href: "/pricing", index: "03", description: "" },
      { label: "Engineering Logs", href: "/engineering-logs", index: "04", description: "" },
      { label: "Diagnostic Portal", href: "/diagnostic", index: "05", description: "" },
    ],
  },
  {
    title: "Thinking",
    items: [
      { label: "Engineering Thesis", href: "/about#thesis", index: "01", description: "" },
      { label: "Principles", href: "/about#principles", index: "02", description: "" },
      { label: "How We Diagnose", href: "/#diagnosis", index: "03", description: "" },
      { label: "The Pipeline", href: "/#pipeline", index: "04", description: "" },
    ],
  },
];

/**
 * Home status strip. These describe the state of the site's own
 * system layer — they are not client metrics and must never be
 * presented as such.
 */
export const systemStatus: SystemStatusItem[] = [
  { label: "System", state: "Online", tone: "nominal" },
  { label: "Telemetry", state: "Active", tone: "active" },
  { label: "Automation", state: "Ready", tone: "nominal" },
  { label: "Data Pipeline", state: "Connected", tone: "nominal" },
  { label: "Revenue Infrastructure", state: "Monitoring", tone: "active" },
];
