import { gsap, useGsap, revealHeading } from "@/lib/anim";
import { valueProps, images } from "@/data/content";

export function WhyUs() {
  const ref = useGsap(({ self, reduced }) => {
    revealHeading(self.querySelector(".why-head")!);

    gsap.fromTo(
      self.querySelector(".why-img"),
      { clipPath: "inset(12% 12% 12% 12%)", scale: 1.2 },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: self.querySelector(".why-media"),
          start: "top bottom",
          end: "center center",
          scrub: true,
        },
      },
    );

    const cards = gsap.utils.toArray<HTMLElement>("[data-value]", self);
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { y: 70, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: card, start: "top 92%" },
        },
      );
    });

    if (!reduced) {
      gsap.to(self.querySelector(".why-media"), {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: self, start: "top bottom", end: "bottom top", scrub: true },
      });
    }
  });

  return (
    <section ref={ref} className="surface-dark relative overflow-hidden py-24 md:py-36">
      <div className="container-lux grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="why-media relative">
          <div className="sticky top-28 overflow-hidden">
            <img
              src={images.artisanHands}
              alt="Artisan hand-planing a solid sheesham slab in the Kharadi workshop"
              loading="lazy"
              width={1408}
              height={1760}
              className="why-img aspect-[4/5] w-full object-cover"
            />
            <div className="mt-6 flex items-baseline justify-between border-t border-bone/10 pt-6">
              <p className="text-[0.6rem] uppercase tracking-[0.28em] text-bone/40">
                Kharadi workshop
              </p>
              <p className="font-display text-2xl text-brass">16 years</p>
            </div>
          </div>
        </div>

        <div>
          <p className="eyebrow">Why choose us</p>
          <h2 className="why-head mt-6 max-w-xl font-display text-[clamp(2.2rem,5vw,4.4rem)] text-bone">
            Nothing here is assembled. It is built.
          </h2>

          <div className="mt-14 grid gap-px bg-bone/10 sm:grid-cols-2">
            {valueProps.map((v) => (
              <div
                key={v.id}
                data-value
                className="group relative bg-[oklch(0.19_0.018_48)] p-8 transition-colors duration-700 hover:bg-[oklch(0.23_0.022_46)]"
              >
                <p className="font-display text-sm text-brass">{v.index}</p>
                <h3 className="mt-4 font-display text-2xl text-bone">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-bone/55">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
