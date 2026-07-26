import { useEffect, useRef } from "react";
import { gsap, ensureGsap, SplitText } from "@/lib/anim";

interface Props {
  eyebrow: string;
  title: string;
  sub: string;
  image: string;
}

/** Cinematic sub-page opener: masked title reveal over a scaling image. */
export function PageHead({ eyebrow, title, sub, image }: Props) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    ensureGsap();
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const split = new SplitText(".ph-title", { type: "words" });
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(
        ".ph-img",
        { scale: 1.25, opacity: 0, filter: "blur(16px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.8, ease: "expo.out" },
      )
        .fromTo(
          split.words,
          { yPercent: 115 },
          { yPercent: 0, duration: 1.3, stagger: 0.05, ease: "expo.out" },
          0.35,
        )
        .fromTo(".ph-fade", { y: 26, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1 }, 0.8);

      gsap.to(".ph-img", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex h-[72svh] min-h-[520px] items-end overflow-hidden bg-ink lux-noise"
    >
      <img
        src={image}
        alt={title}
        width={1800}
        height={1200}
        className="ph-img absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.16_0.014_50/0.75),oklch(0.16_0.014_50/0.35)_45%,oklch(0.16_0.014_50/0.95))]" />
      <div className="container-lux relative pb-16 md:pb-24">
        <p className="ph-fade eyebrow">{eyebrow}</p>
        <h1 className="mt-5 overflow-hidden font-display text-[clamp(2.6rem,8vw,7rem)] text-bone">
          <span className="ph-title block">{title}</span>
        </h1>
        <p className="ph-fade mt-6 max-w-lg text-sm leading-relaxed text-bone/60">
          {sub}
        </p>
      </div>
    </section>
  );
}
