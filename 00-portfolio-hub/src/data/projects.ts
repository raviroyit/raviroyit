export type ProjectCategory =
  | "All"
  | "Full-Stack & SaaS"
  | "Frontend UI"
  | "Client & Webflow";

export interface PortfolioProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: Exclude<ProjectCategory, "All">;
  techStack: string[];
  liveUrl: string;
  repoUrl?: string;
  featured?: boolean;
  highlights: string[];
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "zaffran-kitchen",
    title: "Zaffran Kitchen — Restaurant Ordering UI",
    tagline:
      "High-speed Indian restaurant ordering interface with URL-synced state",
    description:
      "Responsive food ordering experience featuring URL searchParams category/dietary filtering, FSSAI veg/non-veg indicators, portion & spice customization modal, and a shared React Context slide-out cart drawer.",
    category: "Frontend UI",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    liveUrl: "https://zaffran-kitchen-ui.onrender.com",
    repoUrl:
      "https://github.com/raviroyit/raviroyit/tree/main/01-restaurant-ordering-ui",
    featured: true,
    highlights: [
      "Zero-re-render URL searchParams filtering",
      "Composite variant cart keys (portion + spice level)",
      "Accessible keyboard-navigable modals & drawers",
    ],
  },
  {
    id: "ravi-holidays",
    title: "Ravi Holidays — Darjeeling & Sikkim Travel Portal",
    tagline: "Production tour packages, homestays & cab booking platform",
    description:
      "End-to-end travel and hospitality booking website built in Webflow for Darjeeling and Sikkim itineraries, custom cab rentals, and boutique homestay reservations.",
    category: "Client & Webflow",
    techStack: ["Webflow", "CMS Collections", "Responsive UI", "SEO"],
    liveUrl: "https://ravi-holidays.webflow.io",
    featured: true,
    highlights: [
      "Structured CMS for multi-day tour packages & cabs",
      "Mobile-first itinerary browsing & inquiry capture",
    ],
  },
  {
    id: "paygrid-roster",
    title: "PayGrid — Field Sales & Commission Tracker",
    tagline: "Multi-tenant workforce attendance & commission SaaS prototype",
    description:
      "Full-stack SaaS module built inside shift-roster-saas enabling field sales representatives to log daily unit sales, track attendance streaks, and calculate tiered monthly commissions.",
    category: "Full-Stack & SaaS",
    techStack: [
      "Next.js",
      "TypeScript",
      "Prisma ORM",
      "PostgreSQL",
      "Supabase",
    ],
    liveUrl: "https://github.com/raviroyit",
    repoUrl: "https://github.com/raviroyit",
    highlights: [
      "PostgreSQL schema modeling with Prisma & Supabase",
      "Automated attendance & tiered commission engine",
    ],
  },
];
