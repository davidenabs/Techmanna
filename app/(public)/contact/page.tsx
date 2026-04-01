import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Techmanna to start a project, request a consultation, or ask a question.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    title: `Contact | ${siteConfig.name}`,
    description:
      "Contact Techmanna to start a project, request a consultation, or ask a question.",
    images: [{ url: siteConfig.ogImage, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.twitterHandle,
    title: `Contact | ${siteConfig.name}`,
    description:
      "Contact Techmanna to start a project, request a consultation, or ask a question.",
    images: [siteConfig.ogImage],
  },
};

export default function ContactPage() {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    siteConfig.address,
  )}`;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-24">
      <div className="flex flex-col gap-12">
        <header className="tm-animate-fade-up rounded-[28px] border border-border bg-background px-6 py-12 md:px-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted">
            Contact
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Start a project with Techmanna.
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
            Tell us what you’re building. We’ll respond with next steps and an
            initial plan.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <section className="rounded-[28px] border border-border bg-background px-6 py-10 md:col-span-7 md:px-10">
            <h2 className="text-2xl font-semibold tracking-tight">
              Send a message
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Prefer email? Write us at{" "}
              <a
                className="font-semibold text-foreground underline underline-offset-4"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
              .
            </p>

            <div className="mt-8">
              <ContactForm toEmail={siteConfig.email} />
            </div>
          </section>

          <aside className="flex flex-col gap-4 md:col-span-5">
            <div className="rounded-[28px] border border-border bg-background p-6">
              <div className="text-sm font-semibold">Contact details</div>
              <div className="mt-4 space-y-3 text-sm text-muted">
                <div className="rounded-2xl border border-border bg-background px-4 py-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Email
                  </div>
                  <a
                    className="mt-1 block font-semibold text-foreground underline underline-offset-4"
                    href={`mailto:${siteConfig.email}`}
                  >
                    {siteConfig.email}
                  </a>
                </div>

                <div className="rounded-2xl border border-border bg-background px-4 py-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Office
                  </div>
                  <div className="mt-1 font-semibold text-foreground">
                    {siteConfig.address}
                  </div>
                  {/* <a
                    href={mapsHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex text-sm font-semibold text-foreground underline underline-offset-4"
                  >
                    Open in Maps
                  </a> */}
                </div>

                {/* <div className="rounded-2xl border border-border bg-background px-4 py-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Company
                  </div>
                  <div className="mt-1 text-sm text-muted">
                    {siteConfig.name} (RC {siteConfig.rcNumber})
                  </div>
                  <div className="mt-2 text-sm">
                    <Link
                      href="/legal/privacy"
                      className="font-semibold text-foreground underline underline-offset-4"
                    >
                      Privacy Policy
                    </Link>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="rounded-[28px] border border-border bg-background p-6">
              <div className="text-sm font-semibold">What to include</div>
              <div className="mt-4 space-y-2 text-sm text-muted">
                <div className="rounded-xl bg-border/25 px-3 py-2">
                  What you’re building (and why)
                </div>
                <div className="rounded-xl bg-border/25 px-3 py-2">
                  Desired timeline and constraints
                </div>
                <div className="rounded-xl bg-border/25 px-3 py-2">
                  Links to designs, docs, or existing product
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
