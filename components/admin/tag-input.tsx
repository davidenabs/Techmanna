"use client";

import { X } from "lucide-react";
import { useMemo, useState } from "react";

export function TagInput({
  label,
  value,
  onChange,
  placeholder = "Add tag and press Enter",
}: {
  label: string;
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const [input, setInput] = useState("");

  const normalized = useMemo(
    () =>
      value
        .map((t) => t.trim())
        .filter(Boolean)
        .filter((t, i, arr) => arr.indexOf(t) === i),
    [value],
  );

  const commit = () => {
    const raw = input
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (raw.length === 0) return;
    onChange([...normalized, ...raw].filter((t, i, arr) => arr.indexOf(t) === i));
    setInput("");
  };

  const removeAt = (tag: string) => {
    onChange(normalized.filter((t) => t !== tag));
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="rounded-xl border border-zinc-200 bg-white px-3 py-3 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-wrap gap-2">
          {normalized.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeAt(tag)}
                className="text-zinc-500 hover:text-black dark:hover:text-white"
              >
                <X size={12} />
              </button>
            </span>
          ))}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                commit();
              }
            }}
            onBlur={commit}
            placeholder={placeholder}
            className="min-w-[180px] flex-1 bg-transparent text-sm outline-none"
          />
        </div>
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Use Enter or commas to add multiple tags.
      </p>
    </div>
  );
}

