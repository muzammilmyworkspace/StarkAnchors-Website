import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "./icons";
import { cn } from "@/lib/utils/cn";

type Variant = "solid" | "ghost" | "inline";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Trailing arrow. On by default — it is the system's forward glyph. */
  arrow?: boolean;
};

const VARIANT_CLASS: Record<Variant, string> = {
  solid: "btn",
  ghost: "btn btn-ghost",
  inline: "btn-inline",
};

/**
 * There are three actions in this design system and no fourth.
 *
 *   solid    the one commitment on a page
 *   ghost    the alternative to it
 *   inline   navigation inside content
 *
 * None of them glow, none of them are pill-shaped, and none of them
 * animate beyond a four-pixel arrow nudge.
 */
export function ActionLink({
  href,
  children,
  variant = "solid",
  className,
  arrow = true,
  ...rest
}: CommonProps & { href: string } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className" | "children"
  >) {
  const external = href.startsWith("http") || href.startsWith("mailto:");

  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight className="arrow h-3.5 w-3.5" />}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className={cn(VARIANT_CLASS[variant], className)}
        rel="noopener noreferrer"
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(VARIANT_CLASS[variant], className)} {...rest}>
      {content}
    </Link>
  );
}

export function ActionButton({
  children,
  variant = "solid",
  className,
  arrow = true,
  type = "button",
  ...rest
}: CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">) {
  return (
    <button type={type} className={cn(VARIANT_CLASS[variant], className)} {...rest}>
      <span>{children}</span>
      {arrow && <ArrowRight className="arrow h-3.5 w-3.5" />}
    </button>
  );
}
