import { gsap, useGsap, revealHeading } from "@/lib/anim";
import { workshopGallery, images } from "@/data/content";

/** Pinned horizontal gallery: the workshop scrolls sideways as you scroll down. */
export function Workshop() {
  const ref = useGsap(({ self, reduced }) => {
    revealHeading(self.querySelector(".ws-head")!, { start: "top 90%" });

    const track = self.querySelector<HTMLElement>("[data-hscroll]");
    const pin = self.querySelector<HTMLElement>("[data-pin]");
    if (!track || !pin || reduced) return;

    const distance = () => track.scrollWidth - window.innerWidth + 96;

    gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    // depth: slides drift and settle as the track moves past
    gsap.utils.toArray<HTMLElement>("[data-slide]", track).forEach((slide, i) => {
      gsap.fromTo(
        slide,
        { yPercent: i % 2 ? 6 : -6, scale: 0.96 },
        {
          yPercent: 0,
          scale: 1,
          duration: 1.4,
          ease: "expo.out",
          delay: i * 0.05,
          scrollTrigger: { trigger: pin, start: "top 80%" },
        },
      );
    });
  });

  return (
    <section ref={ref} className="surface-dark relative overflow-hidden">
      <div className="container-lux pt-24 md:pt-36">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <p className="eyebrow">Inside the workshop</p>
            <h2 className="ws-head mt-6 font-display text-[clamp(2.2rem,5.5vw,4.6rem)] text-bone">
              9,000 sq ft of
              <br />
              sawdust and silence.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-bone/50">
            Slab library, carving bay, CNC, finishing room. No middlemen, no
            third-party factories — everything you order is made here.
          </p>
        </div>
      </div>

      <div data-pin className="relative mt-16 flex h-[100svh] items-center overflow-hidden">
        <div data-hscroll className="flex gap-6 pl-6 will-change-transform lg:pl-16">
          <article
            data-slide
            className="relative h-[62vh] w-[86vw] shrink-0 overflow-hidden md:w-[62vw]"
          >
            <img
              src={images.workshopWide}
              alt="Wide view of the solid wood furniture workshop in Kharadi, Pune"
              loading="lazy"
              width={1808}
              height={1104}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[var(--gradient-veil)] opacity-70" />
            <div className="absolute bottom-8 left-8">
              <p className="eyebrow">Behind the scenes</p>
              <h3 className="mt-3 font-display text-4xl text-bone md:text-6xl">
                The floor
              </h3>
            </div>
          </article>

          {workshopGallery.map((g) => (
            <article
              key={g.id}
              data-slide
              data-cursor="Play"
              className="group relative h-[62vh] w-[72vw] shrink-0 overflow-hidden md:w-[34vw]"
            >
              <img
                src={g.image}
                alt={`${g.title} — ${g.caption}`}
                loading="lazy"
                width={1200}
                height={1504}
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-luxe)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[var(--gradient-veil)] opacity-75" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <h3 className="font-display text-3xl text-bone">{g.title}</h3>
                <p className="mt-2 text-xs uppercase tracking-[0.24em] text-brass">
                  {g.caption}
                </p>
              </div>
            </article>
          ))}

          <article className="flex h-[62vh] w-[80vw] shrink-0 flex-col justify-center border border-bone/10 p-12 md:w-[38vw]">
            <p className="eyebrow">Artisan stories</p>
            <blockquote className="mt-8 font-display text-3xl leading-tight text-bone md:text-4xl">
              “A machine can cut straight. Only a hand knows when the wood is
              asking for one more pass.”
            </blockquote>
            <p className="mt-8 text-xs uppercase tracking-[0.24em] text-bone/40">
              Ramesh · Master carpenter, 27 years
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
