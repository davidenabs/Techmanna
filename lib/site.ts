export const siteConfig = {
  name: "Techmanna",
  title: "Techmanna | Tech Solutions Company",
  description:
    "Techmanna helps startups and growing businesses design, build, and scale modern software products—from websites and apps to AI-enabled solutions.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://techmanna.co",
  domain: "techmanna.co",
  email: "hello@techmanna.co",
  address: "Lagos, Nigeria",
  rcNumber: "7331140",
  locale: "en_NG",
  ogImage: "/android-chrome-512x512.png",
  twitterHandle: "@techmanna",
};

export function getSiteUrl() {
  try {
    return new URL(siteConfig.url);
  } catch {
    return new URL("https://techmanna.co");
  }
}
