"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { ImageUpload, MultiImageUpload } from "@/components/admin/image-upload";
import { TagInput } from "@/components/admin/tag-input";
import { LinksInput, ProjectLink } from "@/components/admin/links-input";

interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  tags: string[];
  cover_image_url: string | null;
  gallery_image_urls: string[] | null;
  links: ProjectLink[];
}

export default function ProjectsAdmin() {
  const [session, setSession] = useState<Session | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({
    title: "",
    year: "",
    description: "",
    tags: [],
    links: [],
    cover_image_url: null,
    gallery_image_urls: [],
  });

  const router = useRouter();

  async function fetchProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setFormError(error.message);
    }
    if (data) setProjects(data);
    setLoading(false);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push("/login");
      else {
        setSession(session);
        fetchProjects();
      }
    });
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFormError(null);

    const title = (currentProject.title ?? "").trim();
    if (!title) {
      setLoading(false);
      setFormError("Title is required.");
      return;
    }

    const payload = {
      title,
      year: (currentProject.year ?? "").trim(),
      description: (currentProject.description ?? "").trim(),
      tags: (currentProject.tags ?? []).filter(Boolean),
      links: (currentProject.links ?? []).filter((l) => l.url?.trim()),
      cover_image_url: currentProject.cover_image_url ?? null,
      gallery_image_urls: (currentProject.gallery_image_urls ?? []).filter(
        Boolean,
      ),
      image_url: currentProject.cover_image_url ?? null,
    };

    if (currentProject.id) {
      const { error } = await supabase
        .from("projects")
        .update(payload)
        .eq("id", currentProject.id);
      if (error) {
        setFormError(error.message);
        setLoading(false);
        return;
      }
    } else {
      const { error } = await supabase.from("projects").insert([payload]);
      if (error) {
        setFormError(error.message);
        setLoading(false);
        return;
      }
    }

    setIsEditing(false);
    setCurrentProject({
      title: "",
      year: "",
      description: "",
      tags: [],
      links: [],
      cover_image_url: null,
      gallery_image_urls: [],
    });
    fetchProjects();
  }

  async function deleteProject(id: string) {
    if (confirm("Are you sure?")) {
      await supabase.from("projects").delete().eq("id", id);
      fetchProjects();
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
          <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Create, update, and publish your work.
          </p>
        </div>
        <button
          onClick={() => {
            setIsEditing(true);
            setCurrentProject({
              title: "",
              year: "",
              description: "",
              tags: [],
              links: [],
              cover_image_url: null,
              gallery_image_urls: [],
            });
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          <Plus size={16} />
          New project
        </button>
      </div>

      {isEditing && (
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
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
                  <h3 className="text-sm font-semibold">Project</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Basics and description.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <input
                      className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-white/10"
                      value={currentProject.title}
                      onChange={(e) =>
                        setCurrentProject({
                          ...currentProject,
                          title: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Year</label>
                    <input
                      className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-white/10"
                      value={currentProject.year}
                      onChange={(e) =>
                        setCurrentProject({
                          ...currentProject,
                          year: e.target.value,
                        })
                      }
                      placeholder="e.g. 2025"
                    />
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-white/10"
                    value={currentProject.description}
                    onChange={(e) =>
                      setCurrentProject({
                        ...currentProject,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                  />
                </div>
              </section>

              <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold">Links</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Add a website, repo, or live demo.
                  </p>
                </div>
                <LinksInput
                  label="Links"
                  value={(currentProject.links ?? []) as ProjectLink[]}
                  onChange={(links) =>
                    setCurrentProject({ ...currentProject, links })
                  }
                />
              </section>
            </div>

            <aside className="space-y-6 lg:col-span-1">
              <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950 lg:sticky lg:top-24">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold">Media & Tags</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Cover, gallery, and stack.
                  </p>
                </div>

                <TagInput
                  label="Tech Stack / Tags"
                  value={currentProject.tags ?? []}
                  onChange={(tags) =>
                    setCurrentProject({ ...currentProject, tags })
                  }
                />

                <div className="mt-5 space-y-6">
                  <ImageUpload
                    label="Cover Image"
                    prefix="projects/cover"
                    value={currentProject.cover_image_url ?? null}
                    onChange={(url) =>
                      setCurrentProject({
                        ...currentProject,
                        cover_image_url: url,
                      })
                    }
                  />

                  <MultiImageUpload
                    label="Gallery Images"
                    prefix="projects/gallery"
                    value={
                      (currentProject.gallery_image_urls ?? []) as string[]
                    }
                    onChange={(urls) =>
                      setCurrentProject({
                        ...currentProject,
                        gallery_image_urls: urls,
                      })
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
              {currentProject.id ? "Update" : "Save"}
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
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between gap-6 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold">
                {project.title}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {project.year || "—"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setCurrentProject(project);
                  setIsEditing(true);
                }}
                className="rounded-lg border border-zinc-200 bg-white p-2 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => deleteProject(project.id)}
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
