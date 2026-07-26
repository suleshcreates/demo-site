import { useState } from "react";
import { gsap, useGsap, revealHeading } from "@/lib/anim";
import { images } from "@/data/content";
import { MagneticButton } from "@/components/lux/MagneticButton";
import { cn } from "@/lib/utils";

const rooms = [
  { id: "living", label: "Living Room", image: images.heroLiving, note: "Seating, media walls, panelling" },
  { id: "bedroom", label: "Bedroom", image: images.catBed, note: "Beds, wardrobes, dressers" },
  { id: "dining", label: "Dining", image: images.catDining, note: "Tables, crockery units, bars" },
  { id: "kitchen", label: "Kitchen", image: images.catKitchen, note: "Modular systems, islands" },
  { id: "office", label: "Office", image: images.catTv, note: "Cabins, workstations, storage" },
];

/** Pinned kitchen showcase + interior portfolio switcher. */
export function KitchenShowcase() {
  const [room, setRoom] = useState(rooms[0].id);

  const ref = useGsap(({ self, reduced }) => {
    revealHeading(self.querySelector(".kt-head")!);

    if (!reduced) {
      gsap.to(self.querySelector("[data-kimg]"), {
        scale: 1.18,
        ease: "none",
        scrollTrigger: {
          trigger: self.querySelector("[data-kpin]"),
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.fromTo(
        self.querySelectorAll("[data-kline]"),
        { yPercent: 130, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: self.querySelector("[data-kpin]"), start: "top 60%" },
        },
      );
    }
  });

  const active = rooms.find((r) => r.id === room)!;

  return (
    <section ref={ref} className="relative bg-ink">
      {/* Full-bleed kitchen statement */}
      <div data-kpin className="relative h-[110svh] overflow-hidden">
        <img
          data-kimg
          src={images.catKitchen}
          alt="Ultra premium modular kitchen with solid sheesham shutters and marble island"
          loading="lazy"
          width={1200}
          height={1504}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.16_0.014_50/0.55),oklch(0.16_0.014_50/0.15)_45%,oklch(0.16_0.014_50/0.92))]" />
        <div className="container-lux relative flex h-full flex-col justify-center">
          <p className="eyebrow" data-kline>
            Modular kitchens
          </p>
          <h2 className="mt-6 font-display text-[clamp(2.6rem,8vw,7.5rem)] leading-[0.9] text-bone">
            <span className="block overflow-hidden">
              <span className="block" data-kline>
                Built around
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="block text-brass-gradient" data-kline>
                how you cook.
              </span>
            </span>
          </h2>
          <div className="mt-10 grid max-w-3xl gap-8 sm:grid-cols-3" data-kline>
            {[
              ["Marine ply carcass", "BWP 710 grade, moisture sealed"],
              ["Solid wood shutters", "Never laminate on MDF"],
              ["Lifetime hardware", "Hettich & Hafele warranty"],
            ].map(([t, d]) => (
              <div key={t} className="border-t border-bone/15 pt-5">
                <p className="font-display text-xl text-bone">{t}</p>
                <p className="mt-2 text-xs leading-relaxed text-bone/50">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interior portfolio switcher */}
      <div className="container-lux py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div>
            <p className="eyebrow">Interior portfolio</p>
            <h2 className="kt-head mt-6 font-display text-[clamp(2rem,4.5vw,3.6rem)] text-bone">
              Room by room.
            </h2>
            <div className="mt-10 divide-y divide-bone/10 border-y border-bone/10">
              {rooms.map((r) => (
                <button
                  key={r.id}
                  onMouseEnter={() => setRoom(r.id)}
                  onClick={() => setRoom(r.id)}
                  data-cursor="View"
                  className="group flex w-full items-center justify-between py-5 text-left"
                >
                  <span
                    className={cn(
                      "font-display text-3xl transition-colors duration-500 md:text-4xl",
                      room === r.id ? "text-brass" : "text-bone/45 group-hover:text-bone",
                    )}
                  >
                    {r.label}
                  </span>
                  <span className="text-[0.6rem] uppercase tracking-[0.22em] text-bone/35">
                    {r.note}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-10">
              <MagneticButton href="/projects" variant="brass" cursorLabel="Open">
                See the portfolio
              </MagneticButton>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[520px]">
            {rooms.map((r) => (
              <img
                key={r.id}
                src={r.image}
                alt={`${r.label} interior project by The Sheesham Artisans`}
                loading="lazy"
                width={1200}
                height={1200}
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-all duration-[1100ms] ease-[var(--ease-luxe)]",
                  active.id === r.id
                    ? "scale-100 opacity-100 blur-0"
                    : "scale-105 opacity-0 blur-md",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
