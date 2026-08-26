"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

type NavLinkProps = {
  href: string;
  children: string;
  className?: string;
};

/**
 * A navigation item with a current-route marker.
 *
 * The marker is a two-pixel signal rule under the label rather than a
 * colour change, so the type stays at one weight across the whole bar
 * and the active state reads as instrumentation rather than emphasis.
 */
export function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname();
  const current =
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={cn(
        "group relative py-2 t-meta transition-colors duration-200",
        current ? "text-titanium" : "text-titanium-faint hover:text-titanium",
        className,
      )}
    >
      {children}
      <span
        aria-hidden
        className={cn(
          "absolute -bottom-0.5 left-0 h-px bg-laser transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          current ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-40",
        )}
      />
    </Link>
  );
}
