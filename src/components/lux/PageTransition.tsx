import { useEffect, useRef, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { gsap, ensureGsap, ScrollTrigger, prefersReducedMotion } from "@/lib/anim";

/**
 * Luxury route transition: a brass-lined veil wipes across the viewport
 * between pages while the incoming page rises into place.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const veil = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    ensureGsap();
    if (prefersReducedMotion()) return;
    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo(0, 0);
    const tl = gsap.timeline({
      onComplete: () => ScrollTrigger.refresh(),
    });
    tl.set(veil.current, { transformOrigin: "bottom" })
      .fromTo(
        veil.current,
        { scaleY: 0, opacity: 1 },
        { scaleY: 1, duration: 0.55, ease: "expo.inOut" },
      )
      .set(veil.current, { transformOrigin: "top" })
      .fromTo(
        wrap.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "expo.out" },
        ">-0.1",
      )
      .to(veil.current, { scaleY: 0, duration: 0.7, ease: "expo.inOut" }, "<");
  }, [pathname]);

  return (
    <>
      <div
        ref={veil}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90] origin-bottom scale-y-0 bg-ink"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-[var(--gradient-brass)]" />
      </div>
      <div ref={wrap}>{children}</div>
    </>
  );
}
