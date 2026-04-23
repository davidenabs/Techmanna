import { siteConfig } from "@/lib/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Privacy Policy for ${siteConfig.name}. Learn how we handle your data and protect your privacy.`,
};

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            At {siteConfig.name}, we are committed to protecting your privacy and
            ensuring a secure experience. This policy explains how we collect,
            use, and safeguard your information.
          </p>
          <div className="mt-8 text-sm text-muted">
            Last Updated: {lastUpdated}
          </div>
        </section>

        <div className="space-y-10 px-2 md:px-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              1. Information We Collect
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted">
              <p>
                We collect information that you provide directly to us when you:
              </p>
              <ul className="list-inside list-disc space-y-2">
                <li>Contact us via our website or email.</li>
                <li>Request a quote or consultation for our services.</li>
                <li>Sign up for our newsletter or updates.</li>
                <li>Interact with us on social media platforms.</li>
              </ul>
              <p>
                This information may include your name, email address, phone
                number, company name, and any other details you choose to share.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              2. How We Use Your Information
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted">
              <p>
                We use the information we collect for various purposes,
                including:
              </p>
              <ul className="list-inside list-disc space-y-2">
                <li>Providing and maintaining our software solutions.</li>
                <li>Responding to your inquiries and support requests.</li>
                <li>Sending you project updates and technical notices.</li>
                <li>Improving our website performance and user experience.</li>
                <li>Complying with legal obligations.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              3. Data Security
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              We implement industry-standard security measures to protect your
              personal information. However, no method of transmission over the
              internet or electronic storage is 100% secure. While we strive to
              protect your data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              4. Sharing of Information
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information with trusted service
              providers who assist us in operating our business, as long as
              those parties agree to keep this information confidential.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              5. Your Rights
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              You have the right to access, correct, or delete your personal
              information. If you wish to exercise any of these rights, please
              contact us at{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-foreground underline underline-offset-4"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              6. Contact Us
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              If you have any questions about this Privacy Policy, please
              contact us:
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
