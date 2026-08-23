"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Plane } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { cn } from "@/lib/utils";

export interface NavLink {
  label: string;
  href: string;
}

const links: NavLink[] = [
  { label: "Destinations", href: "/destinations" },
  { label: "Explore", href: "/#explore" },
  { label: "Why us", href: "/#why-us" },
  { label: "Stories", href: "/#testimonials" },
  { label: "Gallery", href: "/gallery" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrolled } = useScrollProgress();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass border-border border-b" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="focus-ring flex items-center gap-2 rounded-lg">
          <span className="from-primary to-accent flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-white">
            <Plane className="h-4 w-4" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Lumière
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring text-foreground-secondary hover:text-foreground rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Link
            href="/auth/sign-in"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            Sign in
          </Link>
          <Link href="/auth/sign-up" className={buttonVariants({ size: "sm" })}>
            Get started
          </Link>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(true)}
            className="rounded-full"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} links={links} />
    </header>
  );
}
