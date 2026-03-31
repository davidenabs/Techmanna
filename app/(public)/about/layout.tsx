import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Techmanna and how we deliver software projects.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    url: "/about",
    title: `About | ${siteConfig.name}`,
    description:
      "Learn more about Techmanna and how we deliver software projects.",
    images: [{ url: siteConfig.ogImage, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.twitterHandle,
    title: `About | ${siteConfig.name}`,
    description:
      "Learn more about Techmanna and how we deliver software projects.",
    images: [siteConfig.ogImage],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
