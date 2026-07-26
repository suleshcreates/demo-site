import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { Trust } from "@/components/sections/Trust";
import { Collections } from "@/components/sections/Collections";
import { WhyUs } from "@/components/sections/WhyUs";
import { Journey } from "@/components/sections/Journey";
import { Workshop } from "@/components/sections/Workshop";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Configurator } from "@/components/sections/Configurator";
import { Reviews } from "@/components/sections/Reviews";
import { Projects } from "@/components/sections/Projects";
import { KitchenShowcase } from "@/components/sections/KitchenShowcase";
import { Materials } from "@/components/sections/Materials";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { brand } from "@/data/content";

const title = "The Sheesham Artisans — Solid Wood Furniture & Interiors, Pune";
const description =
  "Handcrafted sheesham wood furniture, modular kitchens and complete home interiors, made to order in Kharadi, Pune. 4.9★ from 480+ families.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FurnitureStore",
          name: brand.name,
          description,
          image: "/favicon.svg",
          telephone: brand.phone,
          email: brand.email,
          priceRange: "₹₹₹",
          address: {
            "@type": "PostalAddress",
            streetAddress: brand.locality,
            addressLocality: brand.city,
            addressRegion: "Maharashtra",
            postalCode: "411014",
            addressCountry: "IN",
          },
          geo: { "@type": "GeoCoordinates", latitude: 18.5515, longitude: 73.9411 },
          openingHours: "Mo-Su 10:00-20:00",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "480",
          },
          areaServed: ["Pune", "Mumbai", "Nashik", "Bengaluru", "Hyderabad"],
          makesOffer: [
            "Solid wood beds",
            "Dining tables",
            "Sofa sets",
            "Modular kitchens",
            "Wardrobes",
            "Home interiors",
          ],
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main>
      <Hero />
      <Trust />
      <Collections />
      <WhyUs />
      <Journey />
      <Workshop />
      <BeforeAfter />
      <Configurator />
      <Reviews />
      <Projects />
      <KitchenShowcase />
      <Materials />
      <Faq />
      <FinalCta />
    </main>
  );
}
