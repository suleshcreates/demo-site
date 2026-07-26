import { createFileRoute } from "@tanstack/react-router";
import { FinalCta } from "@/components/sections/FinalCta";
import { Faq } from "@/components/sections/Faq";
import { PageHead } from "@/components/lux/PageHead";
import { images, brand, journey } from "@/data/content";

const title = "Contact — Furniture Studio in Kharadi, Pune | The Sheesham Artisans";
const description =
  "Visit our Kharadi workshop, book a free home measurement in Pune, or WhatsApp us your floor plan for an itemised quote.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main>
      <PageHead
        eyebrow="Contact"
        title="Kharadi, Pune."
        sub={`${brand.addressLine} · ${brand.hours}`}
        image={images.workshopWide}
      />

      <section className="bg-background py-24 md:py-32">
        <div className="container-lux grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div>
            <p className="eyebrow">What happens next</p>
            <div className="mt-10 divide-y divide-border border-y border-border">
              {journey.slice(0, 4).map((s) => (
                <div key={s.id} className="flex gap-6 py-6">
                  <span className="font-display text-sm text-brass">{s.step}</span>
                  <div>
                    <p className="font-display text-2xl">{s.title}</p>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden border border-border">
            <iframe
              title="The Sheesham Artisans location in Kharadi, Pune"
              src="https://www.google.com/maps?q=Kharadi,+Pune,+Maharashtra&output=embed"
              loading="lazy"
              className="h-[420px] w-full grayscale-[0.4] transition-all duration-700 hover:grayscale-0 lg:h-full lg:min-h-[520px]"
            />
          </div>
        </div>
      </section>

      <Faq />
      <FinalCta />
    </main>
  );
}
