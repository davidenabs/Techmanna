import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { services } from "@/lib/techmanna";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-24">
      <section className="relative overflow-hidden rounded-[28px] border border-border bg-background px-6 py-14 md:px-10">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-80 w-[720px] -translate-x-1/2 rounded-full bg-border/50 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 h-72 w-[560px] -translate-x-1/2 rounded-full bg-border/40 blur-3xl" />
        </div>

        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-muted">
              <span>{siteConfig.address}</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>RC {siteConfig.rcNumber}</span>
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              We build modern software that helps you grow.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {siteConfig.name} partners with startups and growing businesses to
              design, develop, and scale products—from websites and apps to
              AI-enabled workflows.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                Book a Free Consultation
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-border/40"
              >
                Explore Services
              </Link>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-3 text-sm text-muted sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-background px-4 py-3">
                Product-focused delivery
              </div>
              <div className="rounded-xl border border-border bg-background px-4 py-3">
                Modern stack, clean architecture
              </div>
              <div className="rounded-xl border border-border bg-background px-4 py-3">
                Design → Develop → Launch → Support
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-background p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-border/40 via-transparent to-border/30" />
              <div className="relative space-y-4">
                <div className="text-sm font-semibold text-muted">
                  Typical delivery
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Kpi title="Discovery" value="1–2 wks" />
                  <Kpi title="Build" value="2–8 wks" />
                  <Kpi title="Launch" value="Release-ready" />
                  <Kpi title="Support" value="Ongoing" />
                </div>
                <div className="rounded-2xl border border-border bg-background p-4 text-sm text-muted">
                  Get a clear scope, timeline, and an execution plan you can
                  trust.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-16 grid grid-cols-1 gap-10">
        <SectionHeader
          eyebrow="Services"
          title="Capabilities built for real delivery"
          description="From product design to engineering and cloud reliability—Techmanna helps you ship with confidence."
          cta={{ href: "/services", label: "See all services" }}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {services.slice(0, 6).map((service) => (
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
                Learn more
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* <div className="mt-16 grid grid-cols-1 gap-10">
        <SectionHeader
          eyebrow="Social Proof"
          title="What teams like about working with us"
          description="We optimize for clarity, quality, and delivery confidence."
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border bg-background p-6"
            >
              <div className="text-base font-semibold leading-relaxed">
                “{t.quote}”
              </div>
              <div className="mt-4 text-sm text-muted">{t.author}</div>
            </div>
          ))}
        </div>
      </div> */}

      <div className="mt-16 rounded-[28px] border border-border bg-background px-6 py-12 md:px-10">
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="text-2xl font-semibold tracking-tight">
              Ready to start?
            </div>
            <div className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              Tell us what you’re building. We’ll reply with next steps and an
              initial plan.
            </div>
          </div>
          <div className="flex flex-col gap-3 md:col-span-4 md:items-end">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 md:w-auto"
            >
              Start a Project
            </Link>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-border/40 md:w-auto"
            >
              Email {siteConfig.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
function SectionHeader({
  eyebrow,
  title,
  description,
  cta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  cta?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted">
        {eyebrow}
      </div>
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-3xl font-semibold tracking-tight">{title}</div>
          <div className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            {description}
          </div>
        </div>
        {cta && (
          <Link
            href={cta.href}
            className="mt-4 inline-flex w-fit items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-border/40 md:mt-0"
          >
            {cta.label}
          </Link>
        )}
      </div>
    </div>
  );
}

function Kpi({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted">
        {title}
      </div>
      <div className="mt-2 text-xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}
