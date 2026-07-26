import { gsap, useGsap, revealHeading } from "@/lib/anim";
import { materials, images } from "@/data/content";

const groups = ["Wood", "Finish", "Hardware", "Fabric"] as const;

export function Materials() {
  const ref = useGsap(({ self, reduced }) => {
    revealHeading(self.querySelector(".mt-head")!);
    gsap.fromTo(
      self.querySelectorAll("[data-swatch]"),
      { y: 40, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.04,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: self.querySelector("[data-grid]"), start: "top 85%" },
      },
    );
    if (!reduced) {
      gsap.to(self.querySelector("[data-mimg]"), {
        yPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: self, start: "top bottom", end: "bottom top", scrub: true },
      });
    }
  });

  return (
    <section ref={ref} className="bg-background py-24 md:py-36">
      <div className="container-lux grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <div className="relative overflow-hidden">
          <img
            data-mimg
            src={images.woodSwatch}
            alt="Sheesham wood samples, finish swatches, brass hardware and linen fabrics"
            loading="lazy"
            width={1200}
            height={1200}
            className="aspect-square w-full scale-110 object-cover"
          />
        </div>

        <div>
          <p className="eyebrow">Premium materials</p>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4.2rem)]">
            <span className="mt-head block">Only things we would use at home.</span>
          </h2>

          <div data-grid className="mt-12 space-y-10">
            {groups.map((g) => (
              <div key={g}>
                <p className="text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
                  {g}
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {materials
                    .filter((m) => m.group === g)
                    .map((m) => (
                      <div
                        key={m.id}
                        data-swatch
                        data-cursor="Sample"
                        className="group flex items-center gap-4 border border-border p-4 transition-colors duration-500 hover:border-brass/60"
                      >
                        <span
                          className="h-9 w-9 shrink-0 rounded-full ring-1 ring-inset ring-ink/10 transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:scale-110"
                          style={{ background: m.swatch }}
                        />
                        <span>
                          <span className="block text-sm">{m.name}</span>
                          <span className="block text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                            {m.note}
                          </span>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
