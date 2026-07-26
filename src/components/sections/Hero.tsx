import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { gsap, ensureGsap, SplitText, prefersReducedMotion } from "@/lib/anim";
import { heroBanners, brand } from "@/data/content";
import { MagneticButton } from "@/components/lux/MagneticButton";

/** Floating wood-dust particles on a canvas, lit from the same side as the image. */
function WoodDust() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;

    let w = (el.width = el.offsetWidth);
    let h = (el.height = el.offsetHeight);
    const motes = Array.from({ length: 90 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.7 + 0.3,
      vy: -(Math.random() * 0.22 + 0.04),
      vx: (Math.random() - 0.5) * 0.18,
      a: Math.random() * 0.5 + 0.12,
      p: Math.random() * Math.PI * 2,
    }));

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.p += 0.01;
        m.y += m.vy;
        m.x += m.vx + Math.sin(m.p) * 0.25;
        if (m.y < -10) {
          m.y = h + 10;
          m.x = Math.random() * w;
        }
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 205, 150, ${m.a * (0.5 + Math.sin(m.p) * 0.5)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => {
      w = el.width = el.offsetWidth;
      h = el.height = el.offsetHeight;
    };
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvas}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
    />
  );
}

export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const banner = heroBanners[0];

  useEffect(() => {
    ensureGsap();
    const el = root.current;
    if (!el) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const words = new SplitText(".hero-line", { type: "words,chars" });

      const tl = gsap.timeline({ delay: 0.25 });
      tl.fromTo(
        ".hero-img",
        { scale: 1.35, filter: "blur(22px)", opacity: 0 },
        { scale: 1, filter: "blur(0px)", opacity: 1, duration: 2.2, ease: "expo.out" },
      )
        .fromTo(
          words.chars,
          { yPercent: 120, opacity: 0, rotate: 6 },
          {
            yPercent: 0,
            opacity: 1,
            rotate: 0,
            duration: 1.5,
            stagger: 0.024,
            ease: "expo.out",
          },
          0.5,
        )
        .fromTo(
          ".hero-fade",
          { y: 34, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.3, stagger: 0.12 },
          1.1,
        )
        .fromTo(
          ".hero-rule",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.6, ease: "expo.inOut" },
          0.9,
        );

      if (!reduced) {
        // scroll: cinematic push-in + veil
        gsap.to(".hero-img", {
          yPercent: 16,
          scale: 1.14,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-copy", {
          yPercent: -28,
          opacity: 0,
          filter: "blur(8px)",
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });

        // mouse-reactive layered parallax + light
        const layers = gsap.utils.toArray<HTMLElement>("[data-depth]");
        const move = (e: MouseEvent) => {
          const cx = e.clientX / window.innerWidth - 0.5;
          const cy = e.clientY / window.innerHeight - 0.5;
          layers.forEach((layer) => {
            const d = Number(layer.dataset.depth);
            gsap.to(layer, {
              x: cx * 70 * d,
              y: cy * 46 * d,
              rotateY: cx * 4 * d,
              rotateX: -cy * 3 * d,
              duration: 1.4,
              ease: "power3.out",
            });
          });
          gsap.to(".hero-light", {
            "--mx": `${e.clientX}px`,
            "--my": `${e.clientY}px`,
            duration: 0.8,
          } as gsap.TweenVars);
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-ink lux-noise"
      aria-label="Introduction"
    >
      <div className="absolute inset-0 [perspective:1200px]">
        <img
          src={banner.image}
          alt="Handcrafted solid sheesham wood sofa in a luxury Pune living room at golden hour"
          width={1920}
          height={1200}
          data-depth="0.5"
          className="hero-img absolute inset-0 h-full w-full scale-105 object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.16_0.014_50/0.88)_0%,oklch(0.16_0.014_50/0.72)_45%,oklch(0.16_0.014_50/0.95)_100%)]" />
      <div
        className="hero-light pointer-events-none absolute inset-0 opacity-70 [--mx:50%] [--my:40%]"
        style={{
          background:
            "radial-gradient(560px circle at var(--mx) var(--my), oklch(0.68 0.095 78 / 0.16), transparent 70%)",
        }}
      />
      <WoodDust />

      <div className="container-lux relative z-10 flex h-full flex-col justify-end pb-16 md:pb-24">
        <div className="hero-copy max-w-5xl select-none" data-depth="0.18">
          <p className="hero-fade eyebrow">{banner.eyebrow}</p>
          <h1 className="mt-6 max-w-[11ch] font-display text-[clamp(3rem,9vw,8.75rem)] text-bone drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
            {banner.headline.map((line, i) => (
              <span key={line} className="hero-line block overflow-hidden">
                {i === banner.headline.length - 1 ? (
                  <em className="hero-accent-line not-italic text-brass-soft drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">{line}</em>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>
          <div className="hero-rule mt-10 h-px w-full origin-left bg-bone/20" />
          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="hero-fade max-w-md text-sm leading-relaxed text-bone/75 md:text-base drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {banner.sub}
            </p>
            <div className="hero-fade flex flex-wrap gap-4">
              <MagneticButton
                href={`https://wa.me/${brand.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                variant="solid"
                cursorLabel="Book"
                className="bg-bone text-ink hover:bg-brass-soft"
              >
                Book consultation
              </MagneticButton>
              <MagneticButton href="#collections" variant="outline" cursorLabel="View" className="text-bone">
                Explore collection
              </MagneticButton>
            </div>
          </div>
        </div>

        <div className="hero-fade mt-14 flex items-center gap-3 text-[0.6rem] uppercase tracking-[0.3em] text-bone/50">
          <ArrowDown size={13} className="animate-bounce text-brass" />
          Scroll
        </div>
      </div>
    </section>
  );
}
