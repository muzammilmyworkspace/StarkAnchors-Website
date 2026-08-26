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
    description: "Three interconnected engineering systems",
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

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Systems",
    items: [
      { label: "Revenue Pipeline Engineering", href: "/services#revenue-pipeline", index: "01", description: "" },
      { label: "Business Operation Automation", href: "/services#operation-automation", index: "02", description: "" },
      { label: "Data Telemetry & Audits", href: "/services#telemetry-audits", index: "03", description: "" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about", index: "01", description: "" },
      { label: "Engineering Thesis", href: "/about#thesis", index: "02", description: "" },
      { label: "Principles", href: "/about#principles", index: "03", description: "" },
      { label: "Pricing", href: "/pricing", index: "04", description: "" },
    ],
  },
  {
    title: "Signal",
    items: [
      { label: "Engineering Logs", href: "/engineering-logs", index: "01", description: "" },
      { label: "System Diagnostic", href: "/diagnostic", index: "02", description: "" },
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
