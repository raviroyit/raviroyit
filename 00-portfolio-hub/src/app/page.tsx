import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { HubFooter } from "@/components/HubFooter";

export default function PortfolioHubPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <Navbar />
      <main>
        <Hero />
        <ProjectGrid />
      </main>
      <HubFooter />
    </div>
  );
}
