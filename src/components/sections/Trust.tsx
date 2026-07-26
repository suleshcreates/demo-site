import { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { gsap, ensureGsap, useGsap, revealHeading } from "@/lib/anim";
import { stats, offers } from "@/data/content";

function Counter({
  value,
  suffix,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    ensureGsap();
    const el = ref.current;
    if (!el) return;
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: value,
      duration: 2.2,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 95%" },
      onUpdate: () => {
        el.textContent = obj.v.toFixed(decimals) + suffix;
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, suffix, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}

function StatBlock({
  value,
  suffix,
  decimals,
  label,
}: {
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
}) {
  const ref = useGsap(({ self }) => {
    const obj = { v: 0 };
    const out = self.querySelector<HTMLElement>("[data-num]")!;
    gsap.to(obj, {
      v: value,
      duration: 2.4,
      ease: "expo.out",
      scrollTrigger: { trigger: self, start: "top 90%" },
      onUpdate: () => {
        out.textContent = obj.v.toFixed(decimals ?? 0) + suffix;
      },
    });
    gsap.fromTo(
      self,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        scrollTrigger: { trigger: self, start: "top 92%" },
      },
    );
  });

  return (
    <div ref={ref} className="border-t border-border pt-6">
      <p
        data-num
        className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none tabular-nums"
      >
        0{suffix}
      </p>
      <p className="mt-3 text-[0.65rem] uppercase tracking-[0.26em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

export function Trust() {
  const ref = useGsap(({ self }) => {
    revealHeading(self.querySelector(".trust-head")!);
    gsap.fromTo(
      self.querySelectorAll("[data-offer]"),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        scrollTrigger: { trigger: self, start: "top 70%" },
      },
    );
  });

  return (
    <section ref={ref} className="relative bg-background py-24 md:py-36">
      <div className="container-lux">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <h2 className="trust-head max-w-2xl font-display text-[clamp(2.2rem,5vw,4rem)]">
            Trusted by hundreds of families across Pune.
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 text-brass">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="text-[0.65rem] uppercase tracking-[0.26em] text-muted-foreground">
              <Counter value={4.9} suffix="" decimals={1} /> on Google
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) => (
            <StatBlock key={s.id} {...s} />
          ))}
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {offers.map((o) => (
            <div
              key={o.id}
              data-offer
              className="group relative overflow-hidden border border-border bg-card p-8 transition-shadow duration-700 hover:shadow-[var(--shadow-soft)]"
            >
              <p className="font-display text-2xl">{o.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {o.detail}
              </p>
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-brass transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
