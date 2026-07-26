import { useEffect } from "react";
import Lenis from "lenis";
import { ensureGsap, gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/anim";

/**
 * Buttery momentum scrolling (Lenis) driven by the GSAP ticker so every
 * ScrollTrigger stays perfectly in sync with the smoothed scroll position.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    ensureGsap();

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
