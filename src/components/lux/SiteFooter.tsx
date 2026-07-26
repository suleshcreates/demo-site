import { Link } from "@tanstack/react-router";
import { brand, categories } from "@/data/content";

export function SiteFooter() {
  return (
    <footer className="surface-dark relative overflow-hidden">
      <div className="container-lux grid gap-14 py-20 md:grid-cols-[1.4fr_1fr_1fr] md:py-28">
        <div>
          <h2 className="font-display text-4xl leading-[0.95] text-bone md:text-5xl">
            The Sheesham
            <br />
            Artisans
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-bone/55">
            {brand.tagline}. Handcrafted in {brand.locality}, {brand.city} — made to
            order, made to last generations.
          </p>
          <div className="mt-8 space-y-1 text-sm text-bone/70">
            <p>{brand.addressLine}</p>
            <p>{brand.hours}</p>
          </div>
        </div>

        <div>
          <p className="eyebrow">Collections</p>
          <ul className="mt-6 space-y-3 text-sm text-bone/60">
            {categories.slice(0, 7).map((c) => (
              <li key={c.id}>
                <Link
                  to="/collections"
                  className="transition-colors hover:text-brass"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Studio</p>
          <ul className="mt-6 space-y-3 text-sm text-bone/60">
            <li>
              <a href={`tel:${brand.phone}`} className="hover:text-brass">
                {brand.phone.replace("+91", "+91 ")}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${brand.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-brass"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${brand.email}`} className="hover:text-brass">
                {brand.email}
              </a>
            </li>
            <li>
              <a
                href={brand.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-brass"
              >
                Google Maps
              </a>
            </li>
            <li>
              <Link to="/projects" className="hover:text-brass">
                Completed projects
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-lux flex flex-col gap-4 border-t border-bone/10 py-8 text-[0.65rem] uppercase tracking-[0.24em] text-bone/35 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {brand.name}</p>
        <p>Solid wood · Modular kitchens · Interiors</p>
      </div>
    </footer>
  );
}
