"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Plus, Trash2 } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  category: string;
}

export default function SkillsAdmin() {
  const [session, setSession] = useState<Session | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSkill, setNewSkill] = useState({ name: "", category: "Other" });

  const router = useRouter();

  async function fetchSkills() {
    const { data } = await supabase
      .from("skills")
      .select("*")
      .order("category", { ascending: true });

    if (data) setSkills(data);
    setLoading(false);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push("/login");
      else {
        setSession(session);
        fetchSkills();
      }
    });
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newSkill.name) return;

    await supabase.from("skills").insert([newSkill]);
    setNewSkill({ name: "", category: "Other" });
    fetchSkills();
  }

  async function deleteSkill(id: string) {
    await supabase.from("skills").delete().eq("id", id);
    fetchSkills();
  }

  if (!session) return null;
  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-900 border-t-transparent dark:border-white" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Keep your stack up to date.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950 sm:flex-row sm:items-center"
      >
        <input
          className="flex-1 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-white/10"
          placeholder="Skill name (e.g., React)"
          value={newSkill.name}
          onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
          required
        />
        <select
          className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-white/10"
          value={newSkill.category}
          onChange={(e) =>
            setNewSkill({ ...newSkill, category: e.target.value })
          }
        >
          <option value="Languages">Languages</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Web3 & Tools">Web3 & Tools</option>
          <option value="Other">Other</option>
        </select>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          <Plus size={16} /> Add
        </button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="group relative flex items-center justify-between rounded-full border border-zinc-200 bg-white px-4 py-2 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium">{skill.name}</span>
              <span className="text-[10px] text-muted uppercase">
                {skill.category}
              </span>
            </div>
            <button
              onClick={() => deleteSkill(skill.id)}
              className="opacity-0 group-hover:opacity-100 text-red-500 transition-opacity"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
