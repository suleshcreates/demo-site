import { useCallback, useEffect, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { gsap, useGsap, revealHeading } from "@/lib/anim";
import { beforeAfter } from "@/data/content";

export function BeforeAfter() {
  const [pos, setPos] = useState(52);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const ref = useGsap(({ self, reduced }) => {
    revealHeading(self.querySelector(".ba-head")!);
    gsap.fromTo(
      self.querySelector("[data-frame]"),
      { clipPath: "inset(0% 0% 100% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.6,
        ease: "expo.out",
        scrollTrigger: { trigger: self, start: "top 75%" },
      },
    );
    if (!reduced) {
      gsap.fromTo(
        self.querySelector("[data-frame]"),
        { scale: 0.94 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: self, start: "top bottom", end: "center center", scrub: true },
        },
      );
    }
  });

  const update = useCallback((clientX: number) => {
    const el = frame.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => dragging.current && update(e.clientX);
    const touch = (e: TouchEvent) =>
      dragging.current && update(e.touches[0].clientX);
    const stop = () => (dragging.current = false);
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", touch);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", touch);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
    };
  }, [update]);

  return (
    <section ref={ref} className="bg-secondary py-24 md:py-36">
      <div className="container-lux">
        <div className="max-w-3xl">
          <p className="eyebrow">Before / after</p>
          <h2 className="ba-head mt-6 font-display text-[clamp(2.2rem,5vw,4.2rem)]">
            {beforeAfter.title}
          </h2>
        </div>

        <div
          data-frame
          ref={frame}
          onMouseDown={(e) => {
            dragging.current = true;
            update(e.clientX);
          }}
          onTouchStart={(e) => {
            dragging.current = true;
            update(e.touches[0].clientX);
          }}
          data-cursor="Drag"
          className="relative mt-14 aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden"
        >
          <img
            src={beforeAfter.after}
            alt="Finished luxury living room interior with solid wood furniture"
            loading="lazy"
            width={1808}
            height={1104}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${pos}%` }}
          >
            <img
              src={beforeAfter.before}
              alt="Bare unfurnished apartment living room before interior work"
              loading="lazy"
              width={1808}
              height={1104}
              className="h-full w-full object-cover"
              style={{ width: frame.current ? frame.current.offsetWidth : "100%" }}
            />
            <span className="absolute bottom-6 left-6 bg-ink/70 px-4 py-2 text-[0.6rem] uppercase tracking-[0.26em] text-bone">
              Before
            </span>
          </div>

          <span className="absolute bottom-6 right-6 bg-ink/70 px-4 py-2 text-[0.6rem] uppercase tracking-[0.26em] text-bone">
            After
          </span>

          <div
            className="absolute inset-y-0 w-px bg-brass"
            style={{ left: `${pos}%` }}
          >
            <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brass/70 bg-ink/60 backdrop-blur-md">
              <MoveHorizontal size={18} className="text-brass" />
            </div>
          </div>
        </div>
        <p className="mt-5 text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
          {beforeAfter.caption}
        </p>
      </div>
    </section>
  );
}
