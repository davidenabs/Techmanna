"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { ImageUpload } from "@/components/admin/image-upload";

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  type: "work" | "education";
  color: string;
  logo_url: string | null;
  image_url: string | null;
}

export default function ExperienceAdmin() {
  const [session, setSession] = useState<Session | null>(null);
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [currentItem, setCurrentItem] = useState<Partial<Experience>>({
    company: "",
    role: "",
    period: "",
    description: "",
    type: "work",
    color: "bg-zinc-900",
    logo_url: null,
    image_url: null,
  });

  const router = useRouter();

  async function fetchItems() {
    const { data } = await supabase
      .from("experiences")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push("/login");
      else {
        setSession(session);
        fetchItems();
      }
    });
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFormError(null);

    const company = (currentItem.company ?? "").trim();
    const role = (currentItem.role ?? "").trim();
    if (!company || !role) {
      setLoading(false);
      setFormError("Company and role are required.");
      return;
    }

    const payload = {
      company,
      role,
      period: (currentItem.period ?? "").trim(),
      description: (currentItem.description ?? "").trim(),
      type: currentItem.type ?? "work",
      color: currentItem.color ?? "bg-zinc-900",
      logo_url: currentItem.logo_url ?? null,
      image_url: currentItem.image_url ?? null,
    };

    if (currentItem.id) {
      const { error } = await supabase
        .from("experiences")
        .update(payload)
        .eq("id", currentItem.id);
      if (error) {
        setFormError(error.message);
        setLoading(false);
        return;
      }
    } else {
      const { error } = await supabase.from("experiences").insert([payload]);
      if (error) {
        setFormError(error.message);
        setLoading(false);
        return;
      }
    }

    setIsEditing(false);
    setCurrentItem({
      company: "",
      role: "",
      period: "",
      description: "",
      type: "work",
      color: "bg-zinc-900",
      logo_url: null,
      image_url: null,
    });
    fetchItems();
  }

  async function deleteItem(id: string) {
    if (confirm("Are you sure?")) {
      await supabase.from("experiences").delete().eq("id", id);
      fetchItems();
    }
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Experience</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Work history and education.
          </p>
        </div>
        <button
          onClick={() => {
            setIsEditing(true);
            setCurrentItem({
              company: "",
              role: "",
              period: "",
              description: "",
              type: "work",
              color: "bg-zinc-900",
              logo_url: null,
              image_url: null,
            });
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          <Plus size={16} />
          New entry
        </button>
      </div>

      {isEditing && (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
        >
          {formError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
              {formError}
            </div>
          )}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold">Entry</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Company, role, and description.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Company/Institution
                    </label>
                    <input
                      className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-white/10"
                      value={currentItem.company}
                      onChange={(e) =>
                        setCurrentItem({
                          ...currentItem,
                          company: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role/Degree</label>
                    <input
                      className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-white/10"
                      value={currentItem.role}
                      onChange={(e) =>
                        setCurrentItem({
                          ...currentItem,
                          role: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-white/10"
                    value={currentItem.description}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                  />
                </div>
              </section>
            </div>

            <aside className="space-y-6 lg:col-span-1">
              <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950 lg:sticky lg:top-24">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold">Details</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Type, dates, and media.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <select
                    className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-white/10"
                    value={currentItem.type}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        type: e.target.value as "work" | "education",
                      })
                    }
                  >
                    <option value="work">Work</option>
                    <option value="education">Education</option>
                  </select>
                </div>

                <div className="mt-4 space-y-2">
                  <label className="text-sm font-medium">Period</label>
                  <input
                    className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-white/10"
                    value={currentItem.period}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        period: e.target.value,
                      })
                    }
                    placeholder="e.g. 2023 — Present"
                  />
                </div>

                <div className="mt-5 space-y-6">
                  <ImageUpload
                    label="Company Logo"
                    prefix="experience/logos"
                    value={currentItem.logo_url ?? null}
                    onChange={(url) =>
                      setCurrentItem({ ...currentItem, logo_url: url })
                    }
                  />
                  <ImageUpload
                    label="Optional Image"
                    prefix="experience/images"
                    value={currentItem.image_url ?? null}
                    onChange={(url) =>
                      setCurrentItem({ ...currentItem, image_url: url })
                    }
                  />
                </div>
              </section>
            </aside>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              {currentItem.id ? "Update" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-6 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{item.company}</h3>
                <span className="text-xs uppercase bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-muted">
                  {item.type}
                </span>
              </div>
              <p className="text-sm text-muted">
                {item.role} • {item.period}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setCurrentItem(item);
                  setIsEditing(true);
                }}
                className="rounded-lg border border-zinc-200 bg-white p-2 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => deleteItem(item.id)}
                className="rounded-lg border border-zinc-200 bg-white p-2 text-red-500 hover:bg-red-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-red-950/30"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
