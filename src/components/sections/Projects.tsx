import { useState } from "react";
import { gsap, useGsap, revealHeading, Flip, ensureGsap } from "@/lib/anim";
import { projects, projectFilters } from "@/data/content";
import { cn } from "@/lib/utils";
import { LightboxModal, type LightboxItem } from "@/components/lux/LightboxModal";

export function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const [activeItem, setActiveItem] = useState<LightboxItem | null>(null);

  const ref = useGsap(({ self }) => {
    revealHeading(self.querySelector(".pj-head")!);
    gsap.fromTo(
      self.querySelectorAll("[data-tile]"),
      { y: 70, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.07,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: self, start: "top 75%" },
      },
    );
  });

  const apply = (next: string) => {
    ensureGsap();
    const tiles = document.querySelectorAll("[data-tile]");
    const state = Flip.getState(tiles);
    setFilter(next);
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.8,
        ease: "expo.out",
        scale: true,
        absolute: true,
        stagger: 0.03,
        onEnter: (els) =>
          gsap.fromTo(els, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.6 }),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.94, duration: 0.4 }),
      });
    });
  };

  const shown = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <section ref={ref} className="bg-background py-24 md:py-36">
      <div className="container-lux">
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div className="max-w-2xl">
            <p className="eyebrow">Completed projects</p>
            <h2 className="pj-head mt-6 font-display text-[clamp(2.2rem,5.5vw,4.6rem)]">
              Homes we have
              <br />
              already finished.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {projectFilters.map((f) => (
              <button
                key={f}
                onClick={() => apply(f)}
                data-cursor="Filter"
                className={cn(
                  "border px-5 py-2.5 text-[0.6rem] uppercase tracking-[0.24em] transition-all duration-500",
                  filter === f
                    ? "border-ink bg-ink text-bone"
                    : "border-border text-muted-foreground hover:border-ink/40 hover:text-foreground",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 grid auto-rows-[minmax(240px,auto)] grid-cols-2 gap-4 lg:grid-cols-4 grid-flow-dense">
          {shown.map((p) => (
            <article
              key={p.id}
              data-tile
              data-flip-id={p.id}
              data-cursor="View"
              onClick={() =>
                setActiveItem({
                  image: p.image,
                  title: p.title,
                  category: p.category,
                  subtitle: `${p.scope} · ${p.location}`,
                  description: `A custom-crafted solid wood interior project in ${p.location}. Hand-built in seasoned sheesham, precision finished, and installed by The Sheesham Artisans.`,
                  details: [
                    `Scope: ${p.scope}`,
                    `Location: ${p.location}`,
                    "Material: 100% Solid Seasoned Sheesham Wood",
                    "Custom Joinery & Moisture Sealed",
                  ],
                })
              }
              className={cn(
                "group relative overflow-hidden bg-secondary cursor-pointer",
                p.span === "wide" && "col-span-2 row-span-2",
                p.span === "tall" && "row-span-2",
              )}
            >
              <img
                src={p.image}
                alt={`${p.title} — ${p.scope} in ${p.location}`}
                loading="lazy"
                width={1200}
                height={1200}
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-luxe)] group-hover:scale-[1.07]"
              />
              <div className="absolute inset-0 bg-[var(--gradient-veil)] opacity-60 transition-opacity duration-700 group-hover:opacity-90" />
              <div className="absolute inset-x-0 bottom-0 translate-y-3 p-6 opacity-0 transition-all duration-700 ease-[var(--ease-luxe)] group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-[0.55rem] uppercase tracking-[0.26em] text-brass">
                  {p.category}
                </p>
                <h3 className="mt-2 font-display text-2xl text-bone">{p.title}</h3>
                <p className="mt-1 text-xs text-bone/60">
                  {p.scope} · {p.location}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox Preview Modal */}
      <LightboxModal item={activeItem} onClose={() => setActiveItem(null)} />
    </section>
  );
}
