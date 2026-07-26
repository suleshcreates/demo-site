import { createFileRoute } from "@tanstack/react-router";
import { Collections } from "@/components/sections/Collections";
import { Configurator } from "@/components/sections/Configurator";
import { Materials } from "@/components/sections/Materials";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageHead } from "@/components/lux/PageHead";
import { images } from "@/data/content";

const title = "Collections — Solid Wood Furniture & Kitchens | The Sheesham Artisans";
const description =
  "Beds, dining tables, sofas, wardrobes, TV units, temple units, modular kitchens, curtains and mattresses — all handcrafted to order in Pune.";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/collections" },
    ],
    links: [{ rel: "canonical", href: "/collections" }],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  return (
    <main>
      <PageHead
        eyebrow="The collections"
        title="Every piece begins as a slab."
        sub="Eleven disciplines, one workshop, zero flat-pack. Choose a collection and we build it to your dimensions."
        image={images.catDining}
      />
      <Collections />
      <Configurator />
      <Materials />
      <FinalCta />
    </main>
  );
}
