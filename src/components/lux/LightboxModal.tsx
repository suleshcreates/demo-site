import { useEffect } from "react";
import { X, ArrowRight, MessageCircle } from "lucide-react";
import { brand } from "@/data/content";

export interface LightboxItem {
  image: string;
  title: string;
  category?: string;
  subtitle?: string;
  description?: string;
  details?: string[];
  ctaText?: string;
}

interface LightboxModalProps {
  item: LightboxItem | null;
  onClose: () => void;
}

export function LightboxModal({ item, onClose }: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (item) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const whatsappMsg = encodeURIComponent(
    `Hello, I am interested in details regarding ${item.title} (${item.category || "Collection"}).`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-xl transition-all duration-500 md:p-10"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-sm border border-bone/20 bg-ink shadow-2xl transition-all duration-500 md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-ink/80 text-bone backdrop-blur-md transition-colors hover:bg-brass hover:text-ink"
          aria-label="Close preview"
        >
          <X size={20} />
        </button>

        {/* Image Container */}
        <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-black/40 md:aspect-auto md:w-3/5">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent md:hidden" />
        </div>

        {/* Info Panel */}
        <div className="flex flex-col justify-between p-6 md:w-2/5 md:p-10">
          <div>
            {item.category && (
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-brass">
                {item.category}
              </p>
            )}
            <h3 className="mt-2 font-display text-3xl text-bone md:text-4xl">
              {item.title}
            </h3>
            {item.subtitle && (
              <p className="mt-2 text-xs text-bone/60">{item.subtitle}</p>
            )}
            <div className="my-6 h-px w-full bg-bone/15" />
            {item.description && (
              <p className="text-sm leading-relaxed text-bone/80">
                {item.description}
              </p>
            )}
            {item.details && item.details.length > 0 && (
              <ul className="mt-4 flex flex-col gap-2">
                {item.details.map((d, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-bone/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-brass" />
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={`https://wa.me/${brand.whatsapp}?text=${whatsappMsg}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-sm bg-bone px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-soft"
            >
              <MessageCircle size={16} />
              Inquire on WhatsApp
            </a>
            <a
              href="#contact"
              onClick={onClose}
              className="flex items-center justify-center gap-2 rounded-sm border border-bone/30 px-6 py-3 text-xs uppercase tracking-[0.2em] text-bone transition-colors hover:border-brass hover:text-brass"
            >
              Book Consultation <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
