"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  // { href: "/solutions", label: "Solutions" },
  // { href: "/case-studies", label: "Case Studies" },
  // { href: "/insights", label: "Insights" },
  // { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!mounted) {
    return (
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="h-6 w-28 rounded bg-border/60" />
          <div className="hidden items-center gap-3 md:flex">
            <div className="h-10 w-24 rounded-xl bg-border/60" />
            <div className="h-10 w-10 rounded-xl bg-border/60" />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-semibold tracking-tight"
          aria-label="Techmanna home"
        >
          <Image
            src="/logo.png"
            alt="Techmanna"
            width={160}
            height={40}
            className="h-auto w-40"
            priority
          />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <div className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-foreground",
                    isActive ? "text-foreground" : "text-muted",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-background transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              Book a Consultation
            </Link>

            <button
              type="button"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-muted transition-colors hover:text-foreground"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-muted transition-colors hover:text-foreground md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/60 bg-background/80 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-4">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-border/40 hover:text-foreground",
                    isActive ? "text-foreground" : "text-muted",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="pt-2">
              <Link
                href="/contact"
                className="flex items-center justify-center rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
