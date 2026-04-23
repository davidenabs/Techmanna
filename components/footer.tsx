import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="w-full md:max-w-xl">
            <div
              className="text-lg font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-logo)" }}
            >
              {siteConfig.name}
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
              {siteConfig.description}
            </p>
            <div className="mt-6 space-y-2 text-sm text-muted">
              <div>
                <span className="font-medium text-foreground">RC:</span>{" "}
                {siteConfig.rcNumber}
              </div>
              <div>
                <span className="font-medium text-foreground">Address:</span>{" "}
                {siteConfig.address}
              </div>
              <div>
                <span className="font-medium text-foreground">Email:</span>{" "}
                <a
                  className="underline underline-offset-4"
                  href={`mailto:${siteConfig.email}`}
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>

          <div className="w-full text-left md:w-auto md:text-right">
            <FooterColumn
              title="Company"
              links={[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                { href: "/contact", label: "Contact" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
              ]}
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border/60 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="text-xs text-muted">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </div>
          <div className="text-xs text-muted">
            <span className="font-medium text-foreground">
              {siteConfig.domain}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted">
        {title}
      </div>
      <div className="flex flex-col gap-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
