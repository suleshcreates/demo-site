import { Phone, MessageCircle, MapPin, CalendarClock } from "lucide-react";
import { gsap, useGsap, revealHeading } from "@/lib/anim";
import { brand, images } from "@/data/content";
import { MagneticButton } from "@/components/lux/MagneticButton";

export function FinalCta() {
  const ref = useGsap(({ self, reduced }) => {
    revealHeading(self.querySelector(".ct-head")!);
    gsap.fromTo(
      self.querySelectorAll("[data-cta]"),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.09,
        duration: 1.1,
        scrollTrigger: { trigger: self, start: "top 75%" },
      },
    );
    if (!reduced) {
      gsap.to(self.querySelector("[data-ctaimg]"), {
        yPercent: -12,
        scale: 1.1,
        ease: "none",
        scrollTrigger: { trigger: self, start: "top bottom", end: "bottom top", scrub: true },
      });
    }
  });

  const actions = [
    { icon: Phone, label: "Call now", href: `tel:${brand.phone}`, note: brand.hours },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: `https://wa.me/${brand.whatsapp}`,
      note: "Send us your floor plan",
    },
    {
      icon: MapPin,
      label: "Visit showroom",
      href: brand.mapsUrl,
      note: `${brand.locality}, ${brand.city}`,
    },
    {
      icon: CalendarClock,
      label: "Book home visit",
      href: `https://wa.me/${brand.whatsapp}?text=I%20would%20like%20to%20book%20a%20free%20home%20visit`,
      note: "Free measurement in Pune",
    },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink">
      <img
        data-ctaimg
        src={images.roomAfter}
        alt="Completed luxury living room interior in Pune"
        loading="lazy"
        width={1808}
        height={1104}
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.16_0.014_50/0.92),oklch(0.16_0.014_50/0.75))]" />

      <div className="container-lux relative py-28 md:py-40">
        <p className="eyebrow">Let's begin</p>
        <h2 className="ct-head mt-6 max-w-4xl font-display text-[clamp(2.4rem,7vw,6rem)] text-bone">
          Your home deserves a
          <em className="not-italic text-brass-soft font-normal"> maker</em>, not a
          catalogue.
        </h2>

        <div className="mt-16 grid gap-px bg-bone/10 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((a) => (
            <a
              key={a.label}
              href={a.href}
              target={a.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              data-cta
              data-cursor="Go"
              className="group bg-[oklch(0.19_0.018_48)] p-8 transition-colors duration-700 hover:bg-[oklch(0.24_0.024_46)]"
            >
              <a.icon size={20} className="text-brass" />
              <p className="mt-6 font-display text-2xl text-bone">{a.label}</p>
              <p className="mt-2 text-xs text-bone/50">{a.note}</p>
            </a>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-5" data-cta>
          <MagneticButton
            href={`https://wa.me/${brand.whatsapp}?text=I%20would%20like%20a%20design%20consultation`}
            target="_blank"
            rel="noreferrer"
            className="bg-bone text-ink hover:bg-brass-soft"
            cursorLabel="Book"
          >
            Request design consultation
          </MagneticButton>
          <p className="text-xs text-bone/45">
            {brand.addressLine} · {brand.hours}
          </p>
        </div>
      </div>
    </section>
  );
}
