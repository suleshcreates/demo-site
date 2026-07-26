import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { gsap, ensureGsap } from "@/lib/anim";
import { brand } from "@/data/content";
import { MagneticButton } from "./MagneticButton";
import { cn } from "@/lib/utils";

const links = [
  { label: "Collections", to: "/collections" },
  { label: "Projects", to: "/projects" },
  { label: "Studio", to: "/studio" },
  { label: "Contact", to: "/contact" },
];

export function SiteNav() {
  const bar = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    ensureGsap();
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    gsap.fromTo(
      bar.current,
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.4, delay: 0.4, ease: "expo.out" },
    );
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={bar}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700",
        solid
          ? "border-b border-bone/10 bg-ink/80 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="container-lux flex items-center justify-between py-5">
        <Link
          to="/"
          className="flex items-baseline gap-3 text-bone"
          data-cursor="Home"
        >
          <span className="font-display text-xl tracking-tight md:text-2xl">
            The Sheesham Artisans
          </span>
          <span className="hidden text-[0.55rem] uppercase tracking-[0.3em] text-brass lg:inline">
            {brand.locality}
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="group relative text-[0.65rem] uppercase tracking-[0.28em] text-bone/70 transition-colors hover:text-bone"
              activeProps={{ className: "text-bone" }}
            >
              {l.label}
              <span className="absolute -bottom-2 left-0 h-px w-full origin-right scale-x-0 bg-brass transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:origin-left group-hover:scale-x-100" />
            </Link>
          ))}
          <MagneticButton
            href={`tel:${brand.phone}`}
            variant="brass"
            className="px-6 py-3"
            cursorLabel="Call"
          >
            Book a visit
          </MagneticButton>
        </nav>

        <button
          className="text-bone md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-bone/10 bg-ink/95 px-6 py-8 md:hidden">
          <div className="flex flex-col gap-6">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.28em] text-bone/80"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={`tel:${brand.phone}`}
              className="text-sm uppercase tracking-[0.28em] text-brass"
            >
              Book a visit
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
