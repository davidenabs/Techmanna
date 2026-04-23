import { siteConfig } from "@/lib/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Terms of Service | ${siteConfig.name}`,
  description: `Terms of Service for ${siteConfig.name}. Read about the rules and regulations for using our services.`,
};

export default function TermsOfService() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="mx-auto w-full max-w-4xl px-6 pb-24">
      <div className="tm-animate-fade-up space-y-12">
        <section className="rounded-[28px] border border-border bg-background px-6 py-12 md:px-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted">
            Legal
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Welcome to {siteConfig.name}. By accessing or using our services, you
            agree to be bound by these Terms of Service. Please read them
            carefully.
          </p>
          <div className="mt-8 text-sm text-muted">
            Last Updated: {lastUpdated}
          </div>
        </section>

        <div className="space-y-10 px-2 md:px-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              1. Acceptance of Terms
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              By accessing the website at{" "}
              <a
                href={siteConfig.url}
                className="font-medium text-foreground underline underline-offset-4"
              >
                {siteConfig.domain}
              </a>
              , you are agreeing to be bound by these terms of service, all
              applicable laws and regulations, and agree that you are responsible
              for compliance with any applicable local laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              2. Use License
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted">
              <p>
                Permission is granted to temporarily download one copy of the
                materials (information or software) on {siteConfig.name}&apos;s
                website for personal, non-commercial transitory viewing only.
              </p>
              <p>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className="list-inside list-disc space-y-2">
                <li>Modify or copy the materials.</li>
                <li>Use the materials for any commercial purpose, or for any public display.</li>
                <li>Attempt to decompile or reverse engineer any software contained on the website.</li>
                <li>Remove any copyright or other proprietary notations from the materials.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              3. Service Delivery
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              {siteConfig.name} provides software development, design, and
              consultancy services. Specific project terms, including timelines,
              deliverables, and payment schedules, will be outlined in a separate
              Service Agreement or Statement of Work signed by both parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              4. Disclaimer
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              The materials on {siteConfig.name}&apos;s website are provided on an
              &apos;as is&apos; basis. {siteConfig.name} makes no warranties,
              expressed or implied, and hereby disclaims and negates all other
              warranties including, without limitation, implied warranties or
              conditions of merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of
              rights.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              5. Limitations
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              In no event shall {siteConfig.name} or its suppliers be liable for
              any damages (including, without limitation, damages for loss of
              data or profit, or due to business interruption) arising out of the
              use or inability to use the materials on {siteConfig.name}&apos;s
              website, even if {siteConfig.name} or a {siteConfig.name} authorized
              representative has been notified orally or in writing of the
              possibility of such damage.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              6. Governing Law
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              These terms and conditions are governed by and construed in
              accordance with the laws of Lagos, Nigeria, and you irrevocably
              submit to the exclusive jurisdiction of the courts in that State or
              location.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              7. Contact Information
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="mt-4 space-y-1 text-sm text-muted">
              <div className="font-medium text-foreground">
                {siteConfig.name}
              </div>
              <div>{siteConfig.address}</div>
              <div>
                Email:{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="underline underline-offset-4"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div>RC: {siteConfig.rcNumber}</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
