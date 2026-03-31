"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import {
  Layers,
  Briefcase,
  ListChecks,
  BookOpen,
  Plus,
  ArrowRight,
} from "lucide-react";

type MiniProject = { id: string; title: string; year: string | null };
type MiniPost = { id: string; title: string; published_at: string };

export default function AdminDashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState<{
    projects: number;
    experiences: number;
    skills: number;
    posts: number;
  }>({
    projects: 0,
    experiences: 0,
    skills: 0,
    posts: 0,
  });
  const [recentProjects, setRecentProjects] = useState<MiniProject[]>([]);
  const [recentPosts, setRecentPosts] = useState<MiniPost[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    async function loadData() {
      const [c1, c2, c3, c4, rp, rw] = await Promise.all([
        supabase.from("projects").select("*", { count: "exact", head: true }),
        supabase
          .from("experiences")
          .select("*", { count: "exact", head: true }),
        supabase.from("skills").select("*", { count: "exact", head: true }),
        supabase.from("writing").select("*", { count: "exact", head: true }),
        supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5),
        supabase
          .from("writing")
          .select("*")
          .order("published_at", { ascending: false })
          .limit(5),
      ]);
      setCounts({
        projects: c1.count ?? 0,
        experiences: c2.count ?? 0,
        skills: c3.count ?? 0,
        posts: c4.count ?? 0,
      });
      if (rp.data) setRecentProjects(rp.data);
      if (rw.data) setRecentPosts(rw.data);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-900 border-t-transparent dark:border-white"></div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Quick overview and shortcuts to manage your portfolio.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <QuickAction href="/admin/projects" label="New project" />
          <QuickAction href="/admin/thoughts" label="New post" />
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Layers size={18} />}
          label="Projects"
          value={counts.projects}
          href="/admin/projects"
        />
        <StatCard
          icon={<Briefcase size={18} />}
          label="Experience"
          value={counts.experiences}
          href="/admin/experience"
        />
        <StatCard
          icon={<ListChecks size={18} />}
          label="Skills"
          value={counts.skills}
          href="/admin/skills"
        />
        <StatCard
          icon={<BookOpen size={18} />}
          label="Writing"
          value={counts.posts}
          href="/admin/thoughts"
        />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-sm font-semibold">Recent projects</h3>
            <Link
              href="/admin/projects"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-4 divide-y divide-zinc-100 dark:divide-zinc-900">
            {recentProjects.map((p) => (
              <Link
                key={p.id}
                href="/admin/projects"
                className="flex items-center justify-between gap-3 py-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{p.title}</div>
                  <div className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                    {p.year || "—"}
                  </div>
                </div>
                <ArrowRight size={16} className="shrink-0 text-zinc-400" />
              </Link>
            ))}
            {recentProjects.length === 0 && (
              <div className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
                No projects yet
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-sm font-semibold">Recent posts</h3>
            <Link
              href="/admin/thoughts"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-4 divide-y divide-zinc-100 dark:divide-zinc-900">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href="/admin/thoughts"
                className="flex items-center justify-between gap-3 py-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">
                    {post.title}
                  </div>
                  <div className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                    {post.published_at}
                  </div>
                </div>
                <ArrowRight size={16} className="shrink-0 text-zinc-400" />
              </Link>
            ))}
            {recentPosts.length === 0 && (
              <div className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
                No posts yet
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-zinc-200 bg-white p-5 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900/40"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-2 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
          {icon}
        </div>
        <ArrowRight size={16} className="mt-1 text-zinc-400" />
      </div>
      <div className="mt-4 text-2xl font-semibold">{value}</div>
      <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        {label}
      </div>
    </Link>
  );
}

function QuickAction({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
    >
      <Plus size={16} />
      {label}
    </Link>
  );
}
