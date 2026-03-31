"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { ImageUpload } from "@/components/admin/image-upload";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { uploadPublicFile } from "@/lib/storage";
interface Post {
  id: string;
  title: string;
  published_at: string;
  description: string;
  slug: string;
  featured_image_url: string | null;
  content_html: string | null;
}

export default function WritingAdmin() {
  const [session, setSession] = useState<Session | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [currentPost, setCurrentPost] = useState<Partial<Post>>({
    title: "",
    published_at: new Date().toISOString().split("T")[0],
    description: "",
    slug: "",
    featured_image_url: null,
    content_html: "",
  });

  const router = useRouter();

  const slugFromTitle = useMemo(() => {
    const title = (currentPost.title ?? "").trim();
    return title
      .toLowerCase()
      .replaceAll(/[^a-z0-9]+/g, "-")
      .replaceAll(/^-+|-+$/g, "")
      .slice(0, 80);
  }, [currentPost.title]);

  async function fetchPosts() {
    const { data } = await supabase
      .from("writing")
      .select("*")
      .order("published_at", { ascending: false });

    if (data) setPosts(data);
    setLoading(false);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push("/login");
      else {
        setSession(session);
        fetchPosts();
      }
    });
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFormError(null);

    const title = (currentPost.title ?? "").trim();
    const description = (currentPost.description ?? "").trim();
    const slug = (
      (currentPost.slug ?? "").trim() || slugFromTitle
    ).toLowerCase();
    if (!title) {
      setLoading(false);
      setFormError("Title is required.");
      return;
    }
    if (!slug) {
      setLoading(false);
      setFormError("Slug is required.");
      return;
    }

    const payload = {
      title,
      description,
      slug,
      published_at:
        currentPost.published_at ?? new Date().toISOString().split("T")[0],
      featured_image_url: currentPost.featured_image_url ?? null,
      content_html: (currentPost.content_html ?? "").trim(),
      content: (currentPost.content_html ?? "").trim(),
    };

    if (currentPost.id) {
      const { error } = await supabase
        .from("writing")
        .update(payload)
        .eq("id", currentPost.id);
      if (error) {
        setFormError(error.message);
        setLoading(false);
        return;
      }
    } else {
      const { error } = await supabase.from("writing").insert([payload]);
      if (error) {
        setFormError(error.message);
        setLoading(false);
        return;
      }
    }

    setIsEditing(false);
    setCurrentPost({
      title: "",
      published_at: new Date().toISOString().split("T")[0],
      description: "",
      slug: "",
      featured_image_url: null,
      content_html: "",
    });
    fetchPosts();
  }

  async function deletePost(id: string) {
    if (confirm("Are you sure?")) {
      await supabase.from("writing").delete().eq("id", id);
      fetchPosts();
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
          <h2 className="text-2xl font-semibold tracking-tight">Writing</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Draft, publish, and manage posts.
          </p>
        </div>
        <button
          onClick={() => {
            setIsEditing(true);
            setCurrentPost({
              title: "",
              published_at: new Date().toISOString().split("T")[0],
              description: "",
              slug: "",
              featured_image_url: null,
              content_html: "",
            });
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          <Plus size={16} />
          New post
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
                  <h3 className="text-sm font-semibold">Post</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Title, slug, and description.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <input
                      className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-white/10"
                      value={currentPost.title}
                      onChange={(e) =>
                        setCurrentPost({
                          ...currentPost,
                          title: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Slug</label>
                    <input
                      className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-white/10"
                      value={currentPost.slug}
                      onChange={(e) =>
                        setCurrentPost({ ...currentPost, slug: e.target.value })
                      }
                      onBlur={() => {
                        if (!(currentPost.slug ?? "").trim()) {
                          setCurrentPost({
                            ...currentPost,
                            slug: slugFromTitle,
                          });
                        }
                      }}
                      placeholder="post-title-slug"
                    />
                    {!currentPost.slug?.trim() && slugFromTitle && (
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Suggested: {slugFromTitle}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <label className="text-sm font-medium">
                    Short Description
                  </label>
                  <textarea
                    className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-white/10"
                    value={currentPost.description}
                    onChange={(e) =>
                      setCurrentPost({
                        ...currentPost,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
              </section>

              <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold">Content</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Main article body with formatting and images.
                  </p>
                </div>
                <RichTextEditor
                  label="Main Content"
                  value={currentPost.content_html ?? ""}
                  onChange={(html) =>
                    setCurrentPost({ ...currentPost, content_html: html })
                  }
                  onUploadImage={async (file) => {
                    const result = await uploadPublicFile({
                      bucket: "media",
                      file,
                      prefix: "writing/inline",
                    });
                    return result.publicUrl;
                  }}
                />
              </section>
            </div>

            <aside className="space-y-6 lg:col-span-1">
              <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950 lg:sticky lg:top-24">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold">Publish</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Schedule and featured media.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Published Date</label>
                  <input
                    type="date"
                    className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-white/10"
                    value={currentPost.published_at}
                    onChange={(e) =>
                      setCurrentPost({
                        ...currentPost,
                        published_at: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mt-5">
                  <ImageUpload
                    label="Featured Image"
                    prefix="writing/featured"
                    value={currentPost.featured_image_url ?? null}
                    onChange={(url) =>
                      setCurrentPost({
                        ...currentPost,
                        featured_image_url: url,
                      })
                    }
                  />
                </div>
              </section>
            </aside>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              {currentPost.id ? "Update" : "Save"}
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
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-between gap-6 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div>
              <h3 className="text-sm font-semibold">{post.title}</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {post.published_at}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setCurrentPost(post);
                  setIsEditing(true);
                }}
                className="rounded-lg border border-zinc-200 bg-white p-2 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => deletePost(post.id)}
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
