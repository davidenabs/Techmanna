export type Service = {
  slug: string;
  name: string;
  summary: string;
  problem: string;
  solution: string;
  stack: string[];
  outcomes: string[];
};

export const services: Service[] = [
  {
    slug: "web-development",
    name: "Web Development",
    summary:
      "Modern websites and web apps built for performance, accessibility, and conversion.",
    problem:
      "Many websites look good but fail to convert, load slowly, and become hard to maintain as the business grows.",
    solution:
      "We design and build fast, responsive, SEO-ready web experiences with clean architecture—so you can ship confidently and iterate quickly.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
    ],
    outcomes: [
      "Conversion-focused UX and clear CTAs",
      "SEO foundations and structured metadata",
      "Maintainable components and scalable patterns",
      "Analytics-ready and deployment automation",
    ],
  },
  {
    slug: "mobile-apps",
    name: "Mobile Apps",
    summary:
      "Ship reliable mobile apps with a design system and a stable backend.",
    problem:
      "Teams often struggle with inconsistent UI, unstable APIs, and slow release cycles on mobile.",
    solution:
      "We build mobile experiences that feel native, backed by robust APIs, with release practices that keep updates smooth and predictable.",
    stack: ["React", "TypeScript", "REST/GraphQL", "PostgreSQL", "CI/CD"],
    outcomes: [
      "Consistent UI across screens and devices",
      "Well-defined APIs and reliable data flows",
      "Crash-resilient patterns and monitoring hooks",
      "Release process that reduces regressions",
    ],
  },
  {
    slug: "ai-solutions",
    name: "AI Solutions",
    summary: "Practical AI features that support your team and users—safely.",
    problem:
      "AI is easy to demo but hard to ship: privacy, reliability, evaluation, and costs quickly become blockers.",
    solution:
      "We deliver AI-enabled workflows with guardrails, evaluation, and cost-aware architecture—so you get real outcomes, not just hype.",
    stack: [
      "LLM integrations",
      "RAG patterns",
      "Vector search",
      "Observability",
    ],
    outcomes: [
      "AI copilots, chat, and automations with guardrails",
      "Data privacy and access controls by design",
      "Evaluation loops and quality checks",
      "Cost-aware usage and monitoring",
    ],
  },
  {
    slug: "cloud-devops",
    name: "Cloud & DevOps",
    summary:
      "Reliable infrastructure, automated deployments, and measurable uptime.",
    problem:
      "Manual deployments and fragile infrastructure slow teams down and increase outages.",
    solution:
      "We implement CI/CD, infrastructure best practices, and monitoring so your team ships faster with fewer surprises.",
    stack: ["CI/CD", "Docker", "Observability", "Security hardening"],
    outcomes: [
      "Automated build, test, and release pipelines",
      "Environment parity and safer deployments",
      "Monitoring, alerting, and incident readiness",
      "Security checks and access control hygiene",
    ],
  },
  {
    slug: "product-design",
    name: "Product Design (UI/UX)",
    summary: "UX that reduces friction and makes your product feel effortless.",
    problem:
      "When UX is unclear, users drop off and support tickets increase—especially on critical flows like onboarding and payments.",
    solution:
      "We map user journeys, prototype quickly, and deliver a design system that keeps product experiences consistent.",
    stack: ["Design systems", "Prototyping", "Accessibility", "User research"],
    outcomes: [
      "Improved onboarding and activation",
      "Reusable components and consistent UI",
      "Accessibility-first layouts and interactions",
      "Clear, measurable UX experiments",
    ],
  },
  {
    slug: "consulting",
    name: "Technical Consulting",
    summary:
      "Architecture, audits, and delivery planning that de-risks your roadmap.",
    problem:
      "Without clear technical direction, teams overbuild, miss deadlines, or accumulate costly technical debt.",
    solution:
      "We review your stack, identify bottlenecks, and provide a clear execution plan your team can follow.",
    stack: ["Architecture review", "Security review", "Performance audit"],
    outcomes: [
      "Clear recommendations and prioritized roadmap",
      "Risk reduction before a build or migration",
      "Performance and security improvement plan",
      "Delivery process upgrades",
    ],
  },
];

export const testimonials = [
  {
    quote:
      "Clear communication, fast iteration, and a strong focus on what matters for the business.",
    author: "Client, Lagos",
  },
  {
    quote:
      "The delivery process was smooth, and the final product felt polished and reliable.",
    author: "Client, Nigeria",
  },
  {
    quote:
      "We finally got a structure for shipping—design, development, and releases became predictable.",
    author: "Client, Remote",
  },
];
