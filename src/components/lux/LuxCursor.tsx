import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/anim";

/**
 * Premium cursor: a brass ring that trails the pointer, swells over
 * interactive elements and ripples on click. Mouse-only.
 */
export function LuxCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    document.body.classList.add("has-lux-cursor");
    const dotEl = dot.current!;
    const ringEl = ring.current!;
    const labelEl = label.current!;

    const xTo = gsap.quickTo(ringEl, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(ringEl, "y", { duration: 0.5, ease: "power3" });
    const dx = gsap.quickTo(dotEl, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dotEl, "y", { duration: 0.12, ease: "power3" });

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      dx(e.clientX);
      dy(e.clientY);

      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "a,button,[data-cursor]",
      );
      const text = target?.dataset.cursor;
      gsap.to(ringEl, {
        scale: target ? 1.65 : 1,
        borderColor: target
          ? "oklch(0.68 0.095 78 / 0.9)"
          : "oklch(0.68 0.095 78 / 0.75)",
        backgroundColor: target
          ? "oklch(0.68 0.095 78 / 0.12)"
          : "oklch(0.966 0.009 85 / 0.12)",
        duration: 0.45,
        ease: "expo.out",
      });
      if (labelEl.textContent !== (text ?? "")) labelEl.textContent = text ?? "";
      gsap.to(labelEl, { opacity: text ? 1 : 0, duration: 0.3 });
    };

    const down = () => gsap.to(ringEl, { scale: 0.75, duration: 0.25 });
    const up = () => gsap.to(ringEl, { scale: 1, duration: 0.4, ease: "elastic.out(1,0.5)" });

    const click = (e: MouseEvent) => {
      const r = document.createElement("span");
      r.className =
        "pointer-events-none fixed z-[95] rounded-full border border-brass/60";
      r.style.left = `${e.clientX}px`;
      r.style.top = `${e.clientY}px`;
      r.style.width = r.style.height = "10px";
      r.style.transform = "translate(-50%,-50%)";
      document.body.appendChild(r);
      gsap.to(r, {
        width: 120,
        height: 120,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        onComplete: () => r.remove(),
      });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("click", click);

    return () => {
      document.body.classList.remove("has-lux-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("click", click);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[96] hidden md:block">
      <div
        ref={ring}
        className="absolute -left-6 -top-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-brass/75 shadow-[0_0_0_1px_oklch(0.966_0.009_85_/_0.25),0_0_24px_oklch(0.68_0.095_78_/_0.45)] backdrop-blur-[1px]"
      >
        <span
          ref={label}
          className="text-[6px] font-medium uppercase tracking-[0.22em] text-bone opacity-0 drop-shadow"
        />
      </div>
      <div className="absolute" ref={dot}>
        <div className="h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-bone/80 bg-brass shadow-[0_0_16px_oklch(0.68_0.095_78_/_0.75)]" />
      </div>
    </div>
  );
}
