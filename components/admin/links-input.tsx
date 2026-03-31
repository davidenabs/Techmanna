"use client";

import { Plus, Trash2 } from "lucide-react";

export type ProjectLink = {
  type: "github" | "website" | "x" | "demo" | "figma" | "other";
  url: string;
  label?: string;
};

const options: ProjectLink["type"][] = [
  "github",
  "website",
  "x",
  "demo",
  "figma",
  "other",
];

export function LinksInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: ProjectLink[];
  onChange: (next: ProjectLink[]) => void;
}) {
  const add = () => onChange([...value, { type: "website", url: "" }]);
  const remove = (index: number) => onChange(value.filter((_, i) => i !== index));
  const update = (index: number, next: Partial<ProjectLink>) =>
    onChange(value.map((v, i) => (i === index ? { ...v, ...next } : v)));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
        >
          <Plus size={14} />
          Add link
        </button>
      </div>

      <div className="space-y-3">
        {value.map((link, index) => (
          <div key={index} className="grid grid-cols-1 gap-2 sm:grid-cols-5">
            <select
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-950 sm:col-span-1"
              value={link.type}
              onChange={(e) =>
                update(index, { type: e.target.value as ProjectLink["type"] })
              }
            >
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt.toUpperCase()}
                </option>
              ))}
            </select>

            <input
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-950 sm:col-span-3"
              placeholder="https://..."
              value={link.url}
              onChange={(e) => update(index, { url: e.target.value })}
            />

            <button
              type="button"
              onClick={() => remove(index)}
              className="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900 sm:col-span-1"
              aria-label="Remove link"
            >
              <Trash2 size={16} className="text-red-500" />
            </button>
          </div>
        ))}
        {value.length === 0 && (
          <div className="rounded-xl border border-dashed border-zinc-200 p-4 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            No links yet
          </div>
        )}
      </div>
    </div>
  );
}

