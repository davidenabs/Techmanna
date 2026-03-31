"use client";

import { useMemo, useState } from "react";

export function ContactForm({ toEmail }: { toEmail: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mailtoHref = useMemo(() => {
    const subject = `New project inquiry from ${name || "Website visitor"}`;
    const body = [
      `Name: ${name || "-"}`,
      `Email: ${email || "-"}`,
      "",
      message || "",
    ].join("\n");
    return `mailto:${toEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }, [email, message, name, toEmail]);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = mailtoHref;
      }}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors focus:bg-border/20"
            placeholder="Your name"
            autoComplete="name"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors focus:bg-border/20"
            placeholder="you@company.com"
            type="email"
            required
            autoComplete="email"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold">Message</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-32 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:bg-border/20"
          placeholder="Tell us what you’re building, your timeline, and what success looks like."
          required
        />
      </label>

      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center rounded-xl bg-accent px-5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
      >
        Send message
      </button>

      <div className="text-xs text-muted">
        Submitting opens your email client to send your message to {toEmail}.
      </div>
    </form>
  );
}

