import { createFileRoute } from "@tanstack/react-router";
import { Projects } from "@/components/sections/Projects";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { KitchenShowcase } from "@/components/sections/KitchenShowcase";
import { Reviews } from "@/components/sections/Reviews";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageHead } from "@/components/lux/PageHead";
import { images } from "@/data/content";

const title = "Completed Projects — Home Interiors in Pune | The Sheesham Artisans";
const description =
  "Living rooms, bedrooms, dining spaces, offices and modular kitchens delivered across Pune. Browse 340+ completed interior projects.";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <main>
      <PageHead
        eyebrow="Completed projects"
        title="Three hundred and forty homes."
        sub="Every project below was designed, built and installed by our own team — no subcontractors, no stock photography."
        image={images.heroLiving}
      />
      <Projects />
      <BeforeAfter />
      <KitchenShowcase />
      <Reviews />
      <FinalCta />
    </main>
  );
}
