import { useState } from "react";
import { Plus } from "lucide-react";
import { gsap, useGsap, revealHeading } from "@/lib/anim";
import { faqs } from "@/data/content";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<string | null>(faqs[0].id);

  const ref = useGsap(({ self }) => {
    revealHeading(self.querySelector(".fq-head")!);
    gsap.fromTo(
      self.querySelectorAll("[data-faq]"),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.07,
        duration: 1,
        scrollTrigger: { trigger: self, start: "top 80%" },
      },
    );
  });

  return (
    <section ref={ref} className="bg-secondary py-24 md:py-36">
      <div className="container-lux grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <p className="eyebrow">Questions</p>
          <h2 className="fq-head mt-6 font-display text-[clamp(2.2rem,4.5vw,3.6rem)]">
            Straight answers.
          </h2>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {faqs.map((f) => {
            const isOpen = open === f.id;
            return (
              <div key={f.id} data-faq>
                <button
                  onClick={() => setOpen(isOpen ? null : f.id)}
                  data-cursor={isOpen ? "Close" : "Open"}
                  className="flex w-full items-center justify-between gap-8 py-7 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-xl md:text-2xl">{f.q}</span>
                  <Plus
                    size={18}
                    className={cn(
                      "shrink-0 text-brass transition-transform duration-700 ease-[var(--ease-luxe)]",
                      isOpen && "rotate-[135deg]",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-700 ease-[var(--ease-luxe)]",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-8 text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
