import { Star } from "lucide-react";
import { gsap, useGsap, revealHeading } from "@/lib/anim";
import { reviews } from "@/data/content";

export function Reviews() {
  const ref = useGsap(({ self, reduced }) => {
    revealHeading(self.querySelector(".rv-head")!);

    const cards = gsap.utils.toArray<HTMLElement>("[data-review]", self);
    cards.forEach((c, i) => {
      gsap.fromTo(
        c,
        { y: 80, opacity: 0, rotate: i % 2 ? 1.5 : -1.5 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: c, start: "top 92%" },
        },
      );
      if (!reduced) {
        gsap.to(c, {
          yPercent: i % 3 === 1 ? -10 : i % 3 === 2 ? -4 : -16,
          ease: "none",
          scrollTrigger: { trigger: self, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    });
  });

  return (
    <section ref={ref} className="relative overflow-hidden bg-secondary py-24 md:py-36">
      <div className="container-lux">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="eyebrow">Google reviews</p>
            <h2 className="rv-head mt-6 font-display text-[clamp(2.2rem,5vw,4.2rem)]">
              4.9 stars, 480 families,
              <br />
              zero paid reviews.
            </h2>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=The+Sheesham+Artisans+Kharadi+Pune"
            target="_blank"
            rel="noreferrer"
            className="text-[0.65rem] uppercase tracking-[0.26em] text-brass hover:underline"
          >
            Read all on Google
          </a>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.id}
              data-review
              className="group relative flex h-full flex-col justify-between border border-border bg-card p-8 transition-shadow duration-700 hover:shadow-[var(--shadow-soft)]"
            >
              <div>
                <div className="flex gap-1 text-brass">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-6 text-sm leading-relaxed text-foreground/80">
                  “{r.body}”
                </blockquote>
              </div>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--gradient-brass)] font-display text-sm text-ink">
                  {r.initials}
                </span>
                <span>
                  <span className="block text-sm">{r.name}</span>
                  <span className="block text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">
                    {r.area} · {r.date}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
