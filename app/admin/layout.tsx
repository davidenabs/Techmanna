"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  Briefcase,
  ListChecks,
  LogOut,
  Menu,
  Search,
  X,
} from "lucide-react";
import { AdminThemeToggle } from "@/components/admin/theme-toggle";

const nav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: Layers },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/skills", label: "Skills", icon: ListChecks },
  { href: "/admin/thoughts", label: "Writing", icon: BookOpen },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setLoading(false);
      if (!session) router.push("/login");
      else setSessionEmail(session.user.email ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setSessionEmail(null);
        router.push("/login");
      } else {
        setSessionEmail(session.user.email ?? null);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const title = useMemo(() => {
    const item = nav.find((n) => pathname?.startsWith(n.href));
    return item?.label || "Admin";
  }, [pathname]);

  const initials = useMemo(() => {
    if (!sessionEmail) return "A";
    const beforeAt = sessionEmail.split("@")[0] || sessionEmail;
    const parts = beforeAt.split(/[.\-_]+/g).filter(Boolean);
    const chars = parts.map((p) => p[0]?.toUpperCase()).filter(Boolean);
    return (
      chars.slice(0, 2).join("") || beforeAt.slice(0, 2).toUpperCase()
    ).slice(0, 2);
  }, [sessionEmail]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-900 border-t-transparent dark:border-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col border-r border-zinc-200 bg-white px-4 py-6 dark:border-zinc-800 dark:bg-zinc-950 md:flex">
          <div className="px-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-sm font-semibold text-white dark:bg-white dark:text-black">
                DE
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold">Studio</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  Portfolio admin
                </div>
              </div>
            </div>
          </div>

          <nav className="mt-8 flex flex-1 flex-col gap-1">
            {nav.map((item) => {
              const active = pathname?.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-white"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white",
                  ].join(" ")}
                >
                  <Icon size={18} />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-xs font-semibold text-white dark:bg-white dark:text-black">
                {initials}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">Admin</div>
                <div className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                  {sessionEmail || "Signed in"}
                </div>
              </div>
            </div>
            <button
              onClick={logout}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </aside>

        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileNavOpen(false)}
              aria-label="Close menu"
            />
            <aside className="absolute left-0 top-0 h-full w-80 border-r border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-sm font-semibold text-white dark:bg-white dark:text-black">
                    DE
                  </div>
                  <div className="leading-tight">
                    <div className="text-sm font-semibold">Studio</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      Portfolio admin
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-1">
                {nav.map((item) => {
                  const active = pathname?.startsWith(item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileNavOpen(false)}
                      className={[
                        "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                        active
                          ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-white"
                          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white",
                      ].join(" ")}
                    >
                      <Icon size={18} />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-xs font-semibold text-white dark:bg-white dark:text-black">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">Admin</div>
                    <div className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                      {sessionEmail || "Signed in"}
                    </div>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </aside>
          </div>
        )}

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-zinc-200 bg-zinc-50/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
            <div className="flex items-center justify-between gap-4 px-6 py-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(true)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 md:hidden"
                  aria-label="Open menu"
                >
                  <Menu size={18} />
                </button>
                <div>
                  <div className="text-sm font-semibold">{title}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    Manage content and media
                  </div>
                </div>
              </div>

              <div className="hidden flex-1 justify-center md:flex">
                <div className="relative w-full max-w-lg">
                  <Search
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                  />
                  <input
                    placeholder="Search…"
                    className="h-10 w-full rounded-lg border border-zinc-200 bg-white pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-white/10"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <AdminThemeToggle />
              </div>
            </div>
          </header>
          <main className="flex-1 px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
