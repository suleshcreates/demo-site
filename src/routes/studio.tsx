import { createFileRoute } from "@tanstack/react-router";
import { WhyUs } from "@/components/sections/WhyUs";
import { Workshop } from "@/components/sections/Workshop";
import { Journey } from "@/components/sections/Journey";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageHead } from "@/components/lux/PageHead";
import { images } from "@/data/content";

const title = "The Studio — Our Kharadi Workshop | The Sheesham Artisans";
const description =
  "Sixteen years, 9,000 sq ft and a bench full of master carpenters. See how solid sheesham furniture is made in our Kharadi, Pune workshop.";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/studio" },
    ],
    links: [{ rel: "canonical", href: "/studio" }],
  }),
  component: StudioPage,
});

function StudioPage() {
  return (
    <main>
      <PageHead
        eyebrow="The studio"
        title="Craft you can visit."
        sub="Our workshop is open every day. Come smell the sawdust, meet the carpenter building your piece, and choose your own slab."
        image={images.artisanHands}
      />
      <WhyUs />
      <Workshop />
      <Journey />
      <Faq />
      <FinalCta />
    </main>
  );
}
