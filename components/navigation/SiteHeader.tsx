"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logotype } from "@/components/branding/Logotype";
import { ArrowRight, MenuRules } from "@/components/ui/icons";
import { primaryAction, primaryNav } from "@/data/navigation";
import { cn } from "@/lib/utils/cn";
import { MobileNav } from "./MobileNav";
import { NavLink } from "./NavLink";

/**
 * Sticky navigation.
 *
 * On scroll the bar compacts from 88px to 64px, a hairline resolves at
 * its base and the surface fills to near-opaque. The mark does not
 * move or resize — the frame tightens around a fixed element, which is
 * what makes the change read as a system state rather than as an
 * animation.
 *
 * The surface fills with flat obsidian rather than a blurred pane.
 * Backdrop blur is the single most recognisable tell of a generated
 * template, and it costs a compositor pass on every scroll frame.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[var(--z-header)] transition-[background-color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "border-b border-line bg-obsidian/95"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "shell flex items-center justify-between transition-[height] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled ? "h-16" : "h-[72px] lg:h-22",
          )}
        >
          <Logotype />

          {/* Desktop */}
          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {primaryNav.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link href={primaryAction.href} className="btn">
              <span>{primaryAction.label}</span>
              <ArrowRight className="arrow h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            className="-mr-2 flex items-center gap-3 p-2 text-titanium transition-colors hover:text-laser lg:hidden"
          >
            <span className="t-meta-sm">Menu</span>
            <MenuRules className="h-4 w-4" />
          </button>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
