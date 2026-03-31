import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/lib/techmanna";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Techmanna’s services: web development, mobile apps, AI solutions, cloud & DevOps, product design, and technical consulting.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    url: "/services",
    title: `Services | ${siteConfig.name}`,
    description:
      "Explore Techmanna’s services: web development, mobile apps, AI solutions, cloud & DevOps, product design, and technical consulting.",
    images: [{ url: siteConfig.ogImage, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.twitterHandle,
    title: `Services | ${siteConfig.name}`,
    description:
      "Explore Techmanna’s services: web development, mobile apps, AI solutions, cloud & DevOps, product design, and technical consulting.",
    images: [siteConfig.ogImage],
  },
};

export default function ServicesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-24">
      <div className="flex flex-col gap-12">
        <header className="rounded-[28px] border border-border bg-background px-6 py-12 md:px-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted">
            Services
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Everything you need to ship.
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
            From discovery and design to engineering and cloud reliability—our
            services are structured to deliver measurable outcomes.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Start a Project
            </Link>
            {/* <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-border/40"
            >
              Pricing & Engagement
            </Link> */}
          </div>
        </header>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group rounded-2xl border border-border bg-background p-6 transition-colors hover:bg-border/30"
            >
              <div className="text-base font-semibold">{service.name}</div>
              <div className="mt-2 text-sm leading-relaxed text-muted">
                {service.summary}
              </div>
              <div className="mt-4 text-sm font-semibold text-foreground underline underline-offset-4 opacity-0 transition-opacity group-hover:opacity-100">
                View details
              </div>
            </Link>
          ))}
        </section>

        <section className="rounded-[28px] border border-border bg-background px-6 py-12 md:px-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <div className="text-2xl font-semibold tracking-tight">
                Not sure what you need?
              </div>
              <div className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
                Book a free consultation. We’ll ask a few questions, understand
                your goals, and recommend the best engagement model.
              </div>
            </div>
            <div className="md:col-span-4 md:flex md:justify-end">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 md:w-auto"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

