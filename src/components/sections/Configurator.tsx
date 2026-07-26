import { useMemo, useState } from "react";
import { gsap, useGsap, revealHeading } from "@/lib/anim";
import { configurator, images, brand } from "@/data/content";
import { MagneticButton } from "@/components/lux/MagneticButton";
import { cn } from "@/lib/utils";

export function Configurator() {
  const [choice, setChoice] = useState<Record<string, string>>(() =>
    Object.fromEntries(configurator.groups.map((g) => [g.id, g.options[0].id])),
  );

  const ref = useGsap(({ self }) => {
    revealHeading(self.querySelector(".cf-head")!);
    gsap.fromTo(
      self.querySelectorAll("[data-group]"),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 1.1,
        scrollTrigger: { trigger: self, start: "top 70%" },
      },
    );
  });

  const selected = useMemo(
    () =>
      configurator.groups.map((g) => ({
        group: g,
        option: g.options.find((o) => o.id === choice[g.id])!,
      })),
    [choice],
  );

  const price = useMemo(
    () =>
      Math.round(
        selected.reduce((acc, s) => acc * s.option.factor, configurator.basePrice) /
          100,
      ) * 100,
    [selected],
  );

  const woodTone = selected.find((s) => s.group.id === "wood")!.option.swatch!;
  const finish = selected.find((s) => s.group.id === "finish")!.option;
  const uph = selected.find((s) => s.group.id === "upholstery")!.option;
  const style = selected.find((s) => s.group.id === "style")!.option;
  const size = selected.find((s) => s.group.id === "size")!.option;

  const onPick = (groupId: string, optionId: string) => {
    setChoice((c) => ({ ...c, [groupId]: optionId }));
    gsap.fromTo(
      "[data-preview]",
      { scale: 0.985, filter: "blur(6px)" },
      { scale: 1, filter: "blur(0px)", duration: 0.9, ease: "expo.out" },
    );
    gsap.fromTo(
      "[data-price]",
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "expo.out" },
    );
  };

  return (
    <section ref={ref} className="bg-background py-24 md:py-36">
      <div className="container-lux">
        <div className="max-w-3xl">
          <p className="eyebrow">Design it yourself</p>
          <h2 className="cf-head mt-6 font-display text-[clamp(2.2rem,5.5vw,4.6rem)]">
            Configure your piece.
          </h2>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div
            data-preview
            className="relative aspect-[4/3] overflow-hidden bg-secondary"
          >
            <img
              src={images.catBed}
              alt="Configurable solid wood bed preview"
              loading="lazy"
              width={1200}
              height={1504}
              className="h-full w-full object-cover transition-all duration-[900ms] ease-[var(--ease-luxe)]"
              style={{
                filter: `saturate(${finish.id === "matte" ? 0.85 : 1.05}) brightness(${
                  finish.id === "wax" ? 1.06 : 0.98
                })`,
              }}
            />
            <div
              className="absolute inset-0 mix-blend-multiply transition-all duration-[900ms]"
              style={{ background: woodTone, opacity: 0.34 }}
            />
            <div
              className="absolute inset-0 mix-blend-soft-light transition-all duration-[900ms]"
              style={{ background: uph.swatch, opacity: uph.id === "none" ? 0 : 0.4 }}
            />
            <div className="glass-panel absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-4 px-6 py-4">
              <p className="text-[0.6rem] uppercase tracking-[0.24em] text-bone/80">
                {size.label} · {style.label} · {finish.label}
              </p>
              <p data-price className="font-display text-2xl text-bone">
                ₹{price.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <div className="space-y-10">
            {configurator.groups.map((g) => (
              <div key={g.id} data-group>
                <div className="flex items-baseline justify-between">
                  <p className="text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
                    {g.label}
                  </p>
                  <p className="font-display text-lg">
                    {g.options.find((o) => o.id === choice[g.id])!.label}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {g.options.map((o) => {
                    const active = choice[g.id] === o.id;
                    return (
                      <button
                        key={o.id}
                        onClick={() => onPick(g.id, o.id)}
                        data-cursor="Select"
                        className={cn(
                          "group flex items-center gap-3 border px-4 py-3 text-left transition-all duration-500",
                          active
                            ? "border-brass bg-brass/10"
                            : "border-border hover:border-ink/40",
                        )}
                      >
                        {o.swatch && (
                          <span
                            className="h-6 w-6 rounded-full ring-1 ring-inset ring-ink/10"
                            style={{ background: o.swatch }}
                          />
                        )}
                        <span>
                          <span className="block text-xs">{o.label}</span>
                          <span className="block text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                            {o.note}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="flex flex-wrap items-center gap-5 border-t border-border pt-8">
              <MagneticButton
                href={`https://wa.me/${brand.whatsapp}?text=I%20would%20like%20a%20quote%20for%20a%20${size.label}%20${style.label}%20bed%20in%20${
                  selected[0].option.label
                }`}
                target="_blank"
                rel="noreferrer"
                cursorLabel="Quote"
              >
                Get exact quote
              </MagneticButton>
              <p className="text-xs text-muted-foreground">
                Indicative price. Final quote is itemised after measurement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
