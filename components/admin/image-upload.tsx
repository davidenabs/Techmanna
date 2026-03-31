"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { uploadPublicFile } from "@/lib/storage";
import { Loader2, Trash2, Upload } from "lucide-react";

export function ImageUpload({
  label,
  bucket = "media",
  prefix,
  value,
  onChange,
}: {
  label: string;
  bucket?: string;
  prefix: string;
  value: string | null;
  onChange: (url: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onPick = async (file: File) => {
    setError(null);
    setUploading(true);
    try {
      const result = await uploadPublicFile({ bucket, file, prefix });
      onChange(result.publicUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <div className="flex gap-2">
          {value && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
              disabled={uploading}
            >
              <Trash2 size={14} />
              Remove
            </button>
          )}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            disabled={uploading}
          >
            {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
            Upload
          </button>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void onPick(file);
          e.currentTarget.value = "";
        }}
      />

      <div className="rounded-2xl border border-zinc-200 bg-zinc-50/40 p-4 dark:border-zinc-800 dark:bg-zinc-900/20">
        {value ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
            <Image src={value} alt={label} fill className="object-cover" sizes="(min-width: 768px) 720px, 100vw" />
          </div>
        ) : (
          <div className="flex aspect-[16/9] w-full items-center justify-center rounded-xl border border-dashed border-zinc-200 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            No image selected
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}

export function MultiImageUpload({
  label,
  bucket = "media",
  prefix,
  value,
  onChange,
}: {
  label: string;
  bucket?: string;
  prefix: string;
  value: string[];
  onChange: (urls: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = (url: string) => onChange(value.filter((v) => v !== url));

  const onPick = async (files: FileList) => {
    setError(null);
    setUploading(true);
    try {
      const next: string[] = [];
      for (const file of Array.from(files)) {
        const result = await uploadPublicFile({ bucket, file, prefix });
        next.push(result.publicUrl);
      }
      onChange([...value, ...next]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          disabled={uploading}
        >
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
          Upload
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) void onPick(files);
          e.currentTarget.value = "";
        }}
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {value.map((url) => (
          <div key={url} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
            <Image src={url} alt={label} fill className="object-cover" sizes="(min-width: 768px) 240px, 50vw" />
            <button
              type="button"
              onClick={() => remove(url)}
              className="absolute right-2 top-2 rounded-lg bg-black/70 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100"
              disabled={uploading}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {value.length === 0 && (
          <div className="col-span-2 flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-zinc-200 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400 sm:col-span-3">
            No images yet
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}

