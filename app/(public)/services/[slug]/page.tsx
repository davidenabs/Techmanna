import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/lib/techmanna";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};

  const title = `${service.name} | ${siteConfig.name}`;
  return {
    title: service.name,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      type: "website",
      url: `/services/${service.slug}`,
      title,
      description: service.summary,
      images: [{ url: siteConfig.ogImage, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      creator: siteConfig.twitterHandle,
      title,
      description: service.summary,
      images: [siteConfig.ogImage],
    },
  };
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-24">
      <div className="flex flex-col gap-12">
        <header className="tm-animate-fade-up rounded-[28px] border border-border bg-background px-6 py-12 md:px-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted">
            Service
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {service.name}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
            {service.summary}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-background transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              Get Started
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:bg-border/40"
            >
              Back to Services
            </Link>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-background p-6">
            <div className="text-sm font-semibold">The problem</div>
            <div className="mt-2 text-sm leading-relaxed text-muted">
              {service.problem}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6">
            <div className="text-sm font-semibold">Our solution</div>
            <div className="mt-2 text-sm leading-relaxed text-muted">
              {service.solution}
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-border bg-background px-6 py-12 md:px-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted">
                Outcomes
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                What you can expect
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-3">
                {service.outcomes.map((o) => (
                  <div
                    key={o}
                    className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-muted"
                  >
                    {o}
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="rounded-3xl border border-border bg-background p-6">
                <div className="text-sm font-semibold">Stack & tools</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl bg-border/25 p-4 text-sm text-muted">
                  Prefer a different stack? We’ll recommend what fits your
                  constraints and long-term maintainability.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-border bg-background px-6 py-12 md:px-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <div className="text-2xl font-semibold tracking-tight">
                Want to discuss this service?
              </div>
              <div className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
                Share your goals and constraints. We’ll respond with next steps
                and a delivery plan.
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
