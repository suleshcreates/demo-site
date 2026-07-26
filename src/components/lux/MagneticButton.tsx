import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/anim";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "brass" | "ghost";

const variants: Record<Variant, string> = {
  solid:
    "bg-ink text-bone hover:bg-ink-soft border border-ink",
  outline:
    "border border-current text-current hover:bg-current/5",
  brass:
    "border border-brass/60 text-brass hover:bg-brass/10",
  ghost: "text-current",
};

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  cursorLabel?: string;
  strength?: number;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

/** Magnetic, elastic CTA with a brass sheen sweep on hover. */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "solid",
  className,
  cursorLabel,
  strength = 0.35,
  target,
  rel,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1,0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1,0.4)" });

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength * 1.4);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strength]);

  const classes = cn(
    "group relative inline-flex items-center justify-center overflow-hidden px-8 py-4 text-[0.7rem] uppercase tracking-[0.26em] transition-colors duration-500",
    variants[variant],
    className,
  );

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[var(--gradient-brass)] opacity-0 transition-all duration-700 ease-[var(--ease-luxe)] group-hover:translate-x-0 group-hover:opacity-15" />
    </>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        data-cursor={cursorLabel}
        className={classes}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      aria-label={ariaLabel}
      data-cursor={cursorLabel}
      className={classes}
    >
      {inner}
    </button>
  );
}
