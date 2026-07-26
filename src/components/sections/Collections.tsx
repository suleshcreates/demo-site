import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGsap, revealHeading } from "@/lib/anim";
import { categories } from "@/data/content";
import { cn } from "@/lib/utils";

export function Collections() {
  const [preview, setPreview] = useState<string | null>(null);

  const ref = useGsap(({ self, reduced }) => {
    revealHeading(self.querySelector(".coll-head")!);

    const cards = gsap.utils.toArray<HTMLElement>("[data-card]", self);
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { yPercent: 12, opacity: 0, rotateX: 8, transformPerspective: 900 },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: { trigger: card, start: "top 90%" },
          delay: (i % 3) * 0.06,
        },
      );

      if (reduced) return;
      const img = card.querySelector<HTMLElement>("img")!;
      gsap.to(img, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
      });

      // 3D tilt lift
      const enter = () => gsap.to(card, { y: -10, duration: 0.6, ease: "expo.out" });
      const leave = () => {
        gsap.to(card, { y: 0, rotateY: 0, rotateX: 0, duration: 0.9, ease: "elastic.out(1,0.5)" });
        gsap.to(img, { scale: 1, duration: 1 });
      };
      const move = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(card, {
          rotateY: px * 7,
          rotateX: -py * 7,
          transformPerspective: 1000,
          duration: 0.7,
          ease: "power3.out",
        });
        gsap.to(img, { scale: 1.08, duration: 1.2, ease: "expo.out" });
      };
      card.addEventListener("mouseenter", enter);
      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);
    });
  });

  const active = categories.find((c) => c.id === preview);

  return (
    <section
      id="collections"
      ref={ref}
      className="relative bg-secondary py-24 md:py-36"
    >
      <div className="container-lux">
        <div className="max-w-4xl">
          <p className="eyebrow">The collections</p>
          <h2 className="coll-head mt-6 font-display text-[clamp(2.4rem,6vw,5.2rem)]">
            Eleven disciplines,
            <br />
            one workshop.
          </h2>
        </div>

        <div className="mt-16 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <article
              key={c.id}
              data-card
              onMouseEnter={() => setPreview(c.id)}
              onMouseLeave={() => setPreview(null)}
              data-cursor="Preview"
              className="group relative overflow-hidden bg-background"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={c.image}
                  alt={`${c.name} handcrafted in solid sheesham wood`}
                  loading="lazy"
                  width={1200}
                  height={1504}
                  className="h-full w-full scale-110 object-cover will-change-transform"
                />
                <div className="absolute inset-0 bg-[var(--gradient-veil)] opacity-80 transition-opacity duration-700 group-hover:opacity-95" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl text-bone md:text-3xl">
                        {c.name}
                      </h3>
                      <p className="mt-2 max-w-xs text-xs leading-relaxed text-bone/60 opacity-0 transition-all duration-700 ease-[var(--ease-luxe)] group-hover:opacity-100">
                        {c.blurb}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="mt-1 shrink-0 text-brass transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </div>
                  <p className="mt-4 text-[0.6rem] uppercase tracking-[0.26em] text-brass">
                    From {c.from}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Fullscreen ghost preview of the hovered category */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none fixed inset-0 z-30 hidden items-center justify-center transition-opacity duration-700 lg:flex",
          active ? "opacity-100" : "opacity-0",
        )}
      >
        <p className="font-display text-[14vw] leading-none text-ink/[0.045]">
          {active?.name.split(" ").slice(-1)}
        </p>
      </div>
    </section>
  );
}
