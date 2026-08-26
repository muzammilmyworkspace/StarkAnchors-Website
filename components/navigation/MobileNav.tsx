"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mark } from "@/components/branding/Mark";
import { ArrowRight, Close } from "@/components/ui/icons";
import { primaryAction, primaryNav } from "@/data/navigation";
import { site } from "@/data/site";
import { EASE_OUT } from "@/lib/animations/presets";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * Full-screen navigation.
 *
 * Not a drawer. The panel replaces the viewport and presents the site
 * as an index: rail number, destination, and one line describing what
 * is there. Each row is a full-width rule-separated band — the same
 * editorial language as the Engineering Logs list, so opening the
 * navigation feels like moving inside the same system rather than
 * summoning a widget.
 *
 * Accessibility: modal semantics, Escape to dismiss, focus moved in on
 * open and returned on close, Tab cycled inside the panel, and the
 * document behind it locked against scroll.
 */
export function MobileNav({ open, onClose }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  // Dismiss on navigation. Without this the panel survives a route
  // change and covers the page the user just asked for.
  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    restoreRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    // Compensate for the removed scrollbar so the page behind does not
    // shift sideways as the panel opens.
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (gutter > 0) body.style.paddingRight = `${gutter}px`;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      restoreRef.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[var(--z-overlay)] bg-obsidian lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: EASE_OUT }}
        >
          <div className="lightfield" />
          <div className="grain" />

          <div className="relative flex h-[100svh] flex-col">
            {/* Head — mirrors the sticky header exactly so the mark does
                not appear to move when the panel opens. */}
            <div className="shell flex h-[72px] shrink-0 items-center justify-between border-b border-line">
              <span className="inline-flex items-center gap-3">
                <Mark className="h-7 w-7 text-titanium" />
                <span
                  className="font-display text-[0.9375rem] font-extrabold uppercase leading-none"
                  style={{ letterSpacing: "0.055em" }}
                >
                  Stark Anchors
                </span>
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close navigation"
                className="-mr-2 p-2 text-titanium-dim transition-colors hover:text-titanium"
              >
                <Close className="h-4 w-4" />
              </button>
            </div>

            {/* Index */}
            <nav className="flex-1 overflow-y-auto" aria-label="Primary">
              <ul>
                {primaryNav.map((item, index) => {
                  const current =
                    pathname === item.href || pathname.startsWith(`${item.href}/`);

                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.42,
                        delay: 0.05 + index * 0.05,
                        ease: EASE_OUT,
                      }}
                      className="border-b border-line"
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={current ? "page" : undefined}
                        className="shell group flex items-start gap-5 py-6"
                      >
                        <span className="t-meta-sm mt-2 shrink-0 text-titanium-faint">
                          {item.index}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="t-display-m block text-titanium">
                            {item.label}
                          </span>
                          <span className="t-body-s mt-2 block">{item.description}</span>
                        </span>
                        <span
                          aria-hidden
                          className="mt-2 shrink-0 text-titanium-ghost transition-colors group-hover:text-laser"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Foot — the single commitment, plus the direct channel. */}
            <div className="shell shrink-0 border-t border-line py-6">
              <Link
                href={primaryAction.href}
                onClick={onClose}
                className="btn w-full justify-between"
              >
                <span>{primaryAction.label}</span>
                <ArrowRight className="arrow h-3.5 w-3.5" />
              </Link>

              <div className="mt-5 flex items-center justify-between">
                <span className="t-meta-sm">Direct</span>
                <a
                  href={`mailto:${site.email}`}
                  className="t-mono text-titanium-dim transition-colors hover:text-laser"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
