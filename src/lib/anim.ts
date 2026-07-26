import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

let registered = false;

/** Registers GSAP plugins once, client-side only. */
export function ensureGsap() {
  if (typeof window === "undefined") return;
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip, MotionPathPlugin);
  gsap.defaults({ ease: "expo.out", duration: 1.1 });
  registered = true;
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Runs a GSAP setup inside a scoped context that cleans itself up.
 * Everything animated inside is reverted on unmount.
 */
export function useGsap(
  setup: (ctx: { self: HTMLElement; reduced: boolean }) => void,
  deps: unknown[] = [],
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureGsap();
    const el = ref.current;
    if (!el) return;
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => setup({ self: el, reduced }), el);
    ScrollTrigger.refresh();
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/** Split a heading into masked lines/words and reveal them on scroll. */
export function revealHeading(target: Element | Element[], opts?: { start?: string; stagger?: number }) {
  const split = new SplitText(target as Element, {
    type: "lines,words",
    linesClass: "lux-line",
  });
  gsap.set(split.words, { yPercent: 115, rotate: 3 });
  gsap.to(split.words, {
    yPercent: 0,
    rotate: 0,
    duration: 1.3,
    ease: "expo.out",
    stagger: opts?.stagger ?? 0.045,
    scrollTrigger: {
      trigger: target as Element,
      start: opts?.start ?? "top 85%",
    },
  });
  return split;
}

/** Elegant clip reveal for imagery. */
export function revealImage(target: Element, opts?: { start?: string }) {
  gsap.fromTo(
    target,
    { clipPath: "inset(0% 0% 100% 0%)", scale: 1.18 },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      scale: 1,
      duration: 1.6,
      ease: "expo.out",
      scrollTrigger: { trigger: target, start: opts?.start ?? "top 88%" },
    },
  );
}

/** Staggered fade + rise for lists of cards. */
export function revealStagger(targets: Element[] | NodeListOf<Element>, trigger: Element) {
  gsap.fromTo(
    targets,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.1,
      stagger: 0.09,
      ease: "expo.out",
      scrollTrigger: { trigger, start: "top 80%" },
    },
  );
}

export { gsap, ScrollTrigger, SplitText, Flip, MotionPathPlugin };
