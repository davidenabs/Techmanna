import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function About() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-24">
      <div className="flex flex-col gap-14">
        <section className="tm-animate-fade-up rounded-[28px] border border-border bg-background px-6 py-12 md:px-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted">
                About {siteConfig.name}
              </div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                A delivery-first tech partner.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                {siteConfig.name} is a tech solutions company based in{" "}
                {siteConfig.address}. We help teams ship software that looks
                great, performs well, and stays maintainable as the business
                grows.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-background transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  Work With Us
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:bg-border/40"
                >
                  Explore Services
                </Link>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="rounded-3xl border border-border bg-background p-6">
                <div className="text-sm font-semibold">At a glance</div>
                <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-muted">
                  <div className="rounded-2xl border border-border bg-background px-4 py-3">
                    RC {siteConfig.rcNumber}
                  </div>
                  <div className="rounded-2xl border border-border bg-background px-4 py-3">
                    {siteConfig.address}
                  </div>
                  <div className="rounded-2xl border border-border bg-background px-4 py-3">
                    <a
                      className="underline underline-offset-4"
                      href={`mailto:${siteConfig.email}`}
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <InfoCard
            title="Mission"
            description="Build reliable software that helps businesses operate better and grow faster."
          />
          <InfoCard
            title="How we work"
            description="We combine design, engineering, and delivery practices that reduce risk and keep shipping predictable."
          />
          <InfoCard
            title="What we value"
            description="Clarity, ownership, and quality—because the work should be easy to maintain after launch."
          />
        </section>

        <section className="rounded-[28px] border border-border bg-background px-6 py-12 md:px-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted">
            Approach
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Design → Develop → Launch → Support
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
            A simple, repeatable process that keeps stakeholders aligned and
            removes surprises during delivery.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
            <StepCard
              title="Design"
              description="Clarify goals, user journeys, and the product surface area."
            />
            <StepCard
              title="Develop"
              description="Build with a modern stack and a maintainable component system."
            />
            <StepCard
              title="Launch"
              description="Ship with testing, monitoring hooks, and SEO-ready foundations."
            />
            <StepCard
              title="Support"
              description="Improve, iterate, and keep the system reliable over time."
            />
          </div>
        </section>

        <section className="rounded-[28px] border border-border bg-background px-6 py-12 md:px-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted">
            Values
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Principles that guide delivery
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <ValueCard
              title="Clarity first"
              description="Clear scope, clear owners, and measurable outcomes."
            />
            <ValueCard
              title="Quality that lasts"
              description="Readable code, stable releases, and maintainable systems."
            />
            <ValueCard
              title="Business alignment"
              description="We prioritize what moves KPIs—conversion, retention, and efficiency."
            />
          </div>
        </section>

        <section className="rounded-[28px] border border-border bg-background px-6 py-12 md:px-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <h2 className="text-3xl font-semibold tracking-tight">
                Let’s build something great.
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
                If you have an idea or an existing system that needs an upgrade,
                we’ll help you scope it, plan it, and ship it.
              </p>
            </div>
            <div className="md:col-span-4 md:flex md:justify-end">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 md:w-auto"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function InfoCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[22px] border border-border bg-background p-6">
      <div className="text-base font-semibold">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-muted">
        {description}
      </div>
    </div>
  );
}

function StepCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-muted">
        {description}
      </div>
    </div>
  );
}

function ValueCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-6">
      <div className="text-base font-semibold">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-muted">
        {description}
      </div>
    </div>
  );
}
