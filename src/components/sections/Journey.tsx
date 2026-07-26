import { gsap, useGsap, revealHeading } from "@/lib/anim";
import { journey } from "@/data/content";

export function Journey() {
  const ref = useGsap(({ self, reduced }) => {
    revealHeading(self.querySelector(".jr-head")!);

    const steps = gsap.utils.toArray<HTMLElement>("[data-step]", self);

    steps.forEach((step) => {
      gsap.fromTo(
        step,
        { opacity: 0.15, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: step, start: "top 80%" },
        },
      );
      gsap.fromTo(
        step.querySelector("[data-dot]"),
        { scale: 0 },
        {
          scale: 1,
          duration: 0.9,
          ease: "elastic.out(1,0.5)",
          scrollTrigger: { trigger: step, start: "top 80%" },
        },
      );
    });

    if (!reduced) {
      gsap.fromTo(
        self.querySelector("[data-progress]"),
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: self.querySelector("[data-track]"),
            start: "top 70%",
            end: "bottom 70%",
            scrub: 0.6,
          },
        },
      );
    }
  });

  return (
    <section ref={ref} className="relative bg-background py-24 md:py-36">
      <div className="container-lux">
        <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <p className="eyebrow">The journey</p>
            <h2 className="jr-head mt-6 font-display text-[clamp(2.2rem,5.5vw,4.6rem)]">
              From first sketch
              <br />
              to handover.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Thirty-three days is the average for a full room. Every stage has a
            named owner, a date, and photographs sent to your phone.
          </p>
        </div>

        <div data-track className="relative mt-20 pl-10 md:pl-0">
          <div className="absolute left-[3px] top-0 h-full w-px bg-border md:left-1/2" />
          <div
            data-progress
            className="absolute left-[3px] top-0 h-full w-px origin-top bg-brass md:left-1/2"
          />

          <div className="space-y-16 md:space-y-0">
            {journey.map((s, i) => (
              <div
                key={s.id}
                data-step
                className={`relative md:grid md:grid-cols-2 md:gap-16 ${
                  i % 2 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div
                  className={`md:py-14 ${i % 2 ? "md:pl-16 md:text-left" : "md:pr-16 md:text-right"}`}
                >
                  <span
                    data-dot
                    className="absolute -left-[38px] top-2 h-2 w-2 rounded-full bg-brass md:left-1/2 md:top-1/2 md:-ml-1 md:-mt-1"
                  />
                  <p className="font-display text-sm text-brass">
                    {s.step} · {s.duration}
                  </p>
                  <h3 className="mt-3 font-display text-3xl md:text-4xl">{s.title}</h3>
                  <p
                    className={`mt-4 text-sm leading-relaxed text-muted-foreground ${
                      i % 2 ? "" : "md:ml-auto"
                    } max-w-sm`}
                  >
                    {s.body}
                  </p>
                </div>
                <div className="hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
