/**
 * CMS-ready content models.
 *
 * Every section of the site reads from these typed collections — no component
 * hardcodes copy or imagery. Swapping this module for an API or CMS query
 * (or an admin-panel driven loader) requires no changes to the UI layer.
 */

import heroLiving from "@/assets/hero-living.jpg";
import artisanHands from "@/assets/artisan-hands.jpg";
import catBed from "@/assets/cat-bed.jpg";
import catDining from "@/assets/cat-dining.jpg";
import catKitchen from "@/assets/cat-kitchen.jpg";
import catTv from "@/assets/cat-tv.jpg";
import catWardrobe from "@/assets/cat-wardrobe.jpg";
import catSofa from "@/assets/cat-sofa.jpg";
import workshopWide from "@/assets/workshop-wide.jpg";
import roomBefore from "@/assets/room-before.jpg";
import roomAfter from "@/assets/room-after.jpg";
import woodSwatch from "@/assets/wood-swatch.jpg";

export const images = {
  heroLiving,
  artisanHands,
  catBed,
  catDining,
  catKitchen,
  catTv,
  catWardrobe,
  catSofa,
  workshopWide,
  roomBefore,
  roomAfter,
  woodSwatch,
};

export interface Brand {
  name: string;
  tagline: string;
  locality: string;
  city: string;
  addressLine: string;
  phone: string;
  whatsapp: string;
  email: string;
  mapsUrl: string;
  hours: string;
}

export const brand: Brand = {
  name: "The Sheesham Artisans",
  tagline: "Solid wood furniture, modular kitchens & interiors",
  locality: "Kharadi",
  city: "Pune",
  addressLine: "Kharadi, Pune, Maharashtra 411014",
  phone: "+919000000000",
  whatsapp: "919000000000",
  email: "studio@thesheeshamartisans.com",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Kharadi+Pune+furniture+studio",
  hours: "Mon – Sun · 10:00 – 20:00",
};

export interface HeroBanner {
  id: string;
  eyebrow: string;
  headline: string[];
  sub: string;
  image: string;
}

export const heroBanners: HeroBanner[] = [
  {
    id: "hero-1",
    eyebrow: `${brand.locality}, ${brand.city} · Est. 2009`,
    headline: ["Crafted to last", "generations."],
    sub: "A solid wood atelier where sheesham is shaped by hand into furniture, kitchens and complete interiors — made to order, made to outlive us.",
    image: heroLiving,
  },
];

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
}

export const stats: StatItem[] = [
  { id: "rating", value: 4.9, suffix: "", decimals: 1, label: "Google rating" },
  { id: "reviews", value: 480, suffix: "+", label: "Verified reviews" },
  { id: "years", value: 16, suffix: "", label: "Years of craft" },
  { id: "homes", value: 1200, suffix: "+", label: "Homes furnished" },
  { id: "projects", value: 340, suffix: "+", label: "Interior projects" },
  { id: "cities", value: 9, suffix: "", label: "Cities served" },
];

export interface Category {
  id: string;
  name: string;
  slug: string;
  blurb: string;
  detail: string;
  from: string;
  image: string;
  tall?: boolean;
}

export const categories: Category[] = [
  {
    id: "beds",
    name: "Solid Wood Beds",
    slug: "solid-wood-beds",
    blurb: "Hand-carved headboards, hydraulic storage, joinery without a single nail.",
    detail: "Seasoned sheesham, mortise-and-tenon frames, finished in oil or matte PU.",
    from: "₹48,000",
    image: catBed,
    tall: true,
  },
  {
    id: "dining",
    name: "Dining Tables",
    slug: "dining-tables",
    blurb: "Single-slab and book-matched tops for four to twelve seats.",
    detail: "Live-edge or crisp-edge tops with sculpted pedestal or tapered legs.",
    from: "₹62,000",
    image: catDining,
  },
  {
    id: "sofas",
    name: "Sofa Sets",
    slug: "sofa-sets",
    blurb: "Exposed wood frames with high-resilience foam and boucle or linen.",
    detail: "Choose from 40+ upholstery collections, all replaceable covers.",
    from: "₹55,000",
    image: catSofa,
  },
  {
    id: "tv-units",
    name: "TV Units",
    slug: "tv-units",
    blurb: "Fluted panelling, concealed cable routing, integrated lighting.",
    detail: "Wall-hung or floor standing, sized to the millimetre for your wall.",
    from: "₹34,000",
    image: catTv,
  },
  {
    id: "wardrobes",
    name: "Wardrobes",
    slug: "wardrobes",
    blurb: "Floor-to-ceiling storage in solid wood with brass hardware.",
    detail: "Hinged, sliding or walk-in with soft-close German fittings.",
    from: "₹78,000",
    image: catWardrobe,
    tall: true,
  },
  {
    id: "kitchens",
    name: "Modular Kitchens",
    slug: "modular-kitchens",
    blurb: "Marine ply carcass, solid wood shutters, lifetime hardware warranty.",
    detail: "Designed around how you actually cook — with 3D walkthroughs first.",
    from: "₹2,40,000",
    image: catKitchen,
  },
  {
    id: "coffee-tables",
    name: "Coffee Tables",
    slug: "coffee-tables",
    blurb: "Sculptural centre pieces in wood, travertine and brass.",
    detail: "Nested, monolithic or storage-led forms.",
    from: "₹18,000",
    image: catDining,
  },
  {
    id: "study",
    name: "Study Tables",
    slug: "study-tables",
    blurb: "Work surfaces built for long hours and clean cable management.",
    detail: "Solid tops, drawer banks, optional bookcase towers.",
    from: "₹26,000",
    image: catTv,
  },
  {
    id: "temple",
    name: "Temple Units",
    slug: "temple-units",
    blurb: "Hand-carved mandirs with jaali work and soft internal lighting.",
    detail: "Wall-mounted or floor-standing, teak and sheesham.",
    from: "₹22,000",
    image: catWardrobe,
  },
  {
    id: "curtains",
    name: "Curtains & Drapery",
    slug: "curtains",
    blurb: "Blackout, sheer and layered drapery, stitched and installed by us.",
    detail: "Motorised tracks available with app and remote control.",
    from: "₹1,200 / ft",
    image: catSofa,
  },
  {
    id: "mattresses",
    name: "Wakefit Mattresses",
    slug: "mattresses",
    blurb: "Authorised Wakefit range, matched to your bed the same day.",
    detail: "Orthopaedic memory foam, dual comfort and latex options.",
    from: "₹9,500",
    image: catBed,
  },
];

export interface ValueProp {
  id: string;
  index: string;
  title: string;
  body: string;
}

export const valueProps: ValueProp[] = [
  {
    id: "handcrafted",
    index: "01",
    title: "100% handcrafted",
    body: "Every joint is cut, fitted and finished by hand in our own workshop. No outsourced flat-pack, no particle board shortcuts.",
  },
  {
    id: "sheesham",
    index: "02",
    title: "Premium sheesham",
    body: "Kiln-seasoned Indian rosewood at 8–10% moisture, graded slab by slab for grain, density and colour continuity.",
  },
  {
    id: "custom",
    index: "03",
    title: "Custom by default",
    body: "Nothing is off the shelf. Dimensions, finish, hardware and upholstery are decided around your floor plan.",
  },
  {
    id: "workshop",
    index: "04",
    title: "Our own workshop",
    body: "Visit any day and watch your piece being built. Total control over quality, timelines and cost.",
  },
  {
    id: "delivery",
    index: "05",
    title: "Fast, careful delivery",
    body: "Standard pieces in 12–18 days, full interiors in 45–60. Blanket-wrapped, installed and levelled by our own team.",
  },
  {
    id: "artisans",
    index: "06",
    title: "Expert artisans",
    body: "Master carpenters with 20+ years at the bench, trained in both traditional carving and CNC precision.",
  },
  {
    id: "warranty",
    index: "07",
    title: "10-year warranty",
    body: "Structural warranty on all solid wood frames and lifetime warranty on kitchen hardware.",
  },
  {
    id: "quality",
    index: "08",
    title: "Obsessive finishing",
    body: "Seven-stage sanding, hand-rubbed oil or matte PU, and a 42-point check before anything leaves the floor.",
  },
];

export interface JourneyStep {
  id: string;
  step: string;
  title: string;
  duration: string;
  body: string;
}

export const journey: JourneyStep[] = [
  {
    id: "consult",
    step: "01",
    title: "Consultation",
    duration: "Day 1",
    body: "A studio visit or home visit. We measure, listen, and understand how you live before drawing a single line.",
  },
  {
    id: "design",
    step: "02",
    title: "Design & 3D",
    duration: "Day 2–6",
    body: "Layouts, elevations and photoreal 3D views. You approve materials and finishes with real samples in hand.",
  },
  {
    id: "wood",
    step: "03",
    title: "Wood selection",
    duration: "Day 7",
    body: "You choose your slabs with our master carpenter. Grain direction is planned per panel.",
  },
  {
    id: "manufacture",
    step: "04",
    title: "Manufacturing",
    duration: "Day 8–30",
    body: "Cutting, joinery, carving and assembly in our Kharadi workshop, with weekly photo updates.",
  },
  {
    id: "qc",
    step: "05",
    title: "Quality check",
    duration: "Day 31",
    body: "A 42-point inspection: alignment, moisture, hardware torque, finish uniformity, edge feel.",
  },
  {
    id: "delivery",
    step: "06",
    title: "Delivery",
    duration: "Day 32",
    body: "Blanket-wrapped, floor-protected transport with our own crew — never a third-party courier.",
  },
  {
    id: "install",
    step: "07",
    title: "Installation",
    duration: "Day 33",
    body: "Levelled, anchored, cleaned, handed over. Plus a care kit and a maintenance visit at six months.",
  },
];

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  image: string;
}

export const workshopGallery: GalleryItem[] = [
  {
    id: "w1",
    title: "Hand planing",
    caption: "A finish you can feel in the dark",
    image: artisanHands,
  },
  { id: "w2", title: "The floor", caption: "9,000 sq ft in Kharadi", image: workshopWide },
  { id: "w3", title: "Slab library", caption: "Graded, seasoned, numbered", image: woodSwatch },
  { id: "w4", title: "Carving bay", caption: "Traditional motifs, cut by hand", image: catBed },
  { id: "w5", title: "Finishing room", caption: "Seven stages of sanding", image: catTv },
  { id: "w6", title: "Assembly", caption: "Dry-fitted before it is ever glued", image: catWardrobe },
];

export interface Project {
  id: string;
  title: string;
  location: string;
  scope: string;
  category: "Living Room" | "Bedroom" | "Dining" | "Office" | "Kitchen";
  image: string;
  span?: "tall" | "wide";
}

export const projects: Project[] = [
  {
    id: "p1",
    title: "The Quiet House",
    location: "Kharadi, Pune",
    scope: "Full interiors · 3BHK",
    category: "Living Room",
    image: heroLiving,
    span: "wide",
  },
  {
    id: "p2",
    title: "Rosewood Suite",
    location: "Koregaon Park",
    scope: "Bed, wardrobe, dresser",
    category: "Bedroom",
    image: catBed,
    span: "tall",
  },
  {
    id: "p3",
    title: "Brass & Slab",
    location: "Viman Nagar",
    scope: "Dining & bar",
    category: "Dining",
    image: catDining,
  },
  {
    id: "p4",
    title: "Studio Kharadi",
    location: "Wagholi",
    scope: "Modular kitchen",
    category: "Kitchen",
    image: catKitchen,
  },
  {
    id: "p7",
    title: "Arch Residence",
    location: "Baner",
    scope: "Living & lounge",
    category: "Living Room",
    image: catSofa,
    span: "wide",
  },
  {
    id: "p5",
    title: "The Long Room",
    location: "Magarpatta",
    scope: "Media wall & seating",
    category: "Living Room",
    image: catTv,
  },
  {
    id: "p6",
    title: "Fluted Wardrobe",
    location: "Kalyani Nagar",
    scope: "Wardrobe wall",
    category: "Bedroom",
    image: catWardrobe,
  },
  {
    id: "p8",
    title: "Founders' Cabin",
    location: "EON IT Park",
    scope: "Office interiors",
    category: "Office",
    image: workshopWide,
    span: "tall",
  },
];

export const projectFilters = [
  "All",
  "Living Room",
  "Bedroom",
  "Dining",
  "Kitchen",
  "Office",
] as const;

export interface Review {
  id: string;
  name: string;
  area: string;
  rating: number;
  body: string;
  initials: string;
  date: string;
}

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Ananya Deshpande",
    area: "Kharadi",
    rating: 5,
    initials: "AD",
    date: "2 months ago",
    body: "We had our bed, wardrobe and dining table made here. The finish is better than anything we saw in showrooms at twice the price. They let us pick the actual wood.",
  },
  {
    id: "r2",
    name: "Rohit Malhotra",
    area: "Viman Nagar",
    rating: 5,
    initials: "RM",
    date: "5 weeks ago",
    body: "Modular kitchen delivered in 40 days exactly as the 3D. Hardware quality is genuinely premium and the team cleaned up after installation.",
  },
  {
    id: "r3",
    name: "Sneha & Kartik",
    area: "Wagholi",
    rating: 5,
    initials: "SK",
    date: "3 months ago",
    body: "They redid our entire 3BHK. Weekly photos from the workshop meant we never had to chase anyone. Rare in this industry.",
  },
  {
    id: "r4",
    name: "Prakash Iyer",
    area: "Koregaon Park",
    rating: 5,
    initials: "PI",
    date: "6 months ago",
    body: "The sofa frame is solid sheesham, not rubberwood pretending to be. Sat with the carpenter and changed the arm profile on the spot.",
  },
  {
    id: "r5",
    name: "Meera Joshi",
    area: "Kalyani Nagar",
    rating: 5,
    initials: "MJ",
    date: "1 month ago",
    body: "Curtains, mattress and a temple unit — one vendor, one timeline, zero excuses. The carving on the mandir is extraordinary.",
  },
  {
    id: "r6",
    name: "Aditya Kulkarni",
    area: "Magarpatta",
    rating: 5,
    initials: "AK",
    date: "4 months ago",
    body: "Prices are honest and itemised. No hidden charges appeared at the end, which is why I have already referred three neighbours.",
  },
];

export interface Material {
  id: string;
  group: "Wood" | "Finish" | "Hardware" | "Fabric";
  name: string;
  note: string;
  swatch: string;
}

export const materials: Material[] = [
  { id: "m1", group: "Wood", name: "Indian Sheesham", note: "Dense rosewood, deep figure", swatch: "oklch(0.42 0.075 45)" },
  { id: "m2", group: "Wood", name: "Burma Teak", note: "Golden, dimensionally stable", swatch: "oklch(0.58 0.07 72)" },
  { id: "m3", group: "Wood", name: "Mango Wood", note: "Warm, sustainable, value", swatch: "oklch(0.66 0.055 80)" },
  { id: "m4", group: "Wood", name: "Walnut Veneer", note: "Book-matched panelling", swatch: "oklch(0.34 0.045 50)" },
  { id: "m5", group: "Finish", name: "Hand-rubbed oil", note: "Open pore, matte, repairable", swatch: "oklch(0.38 0.05 46)" },
  { id: "m6", group: "Finish", name: "Matte PU", note: "Sealed, kid & spill proof", swatch: "oklch(0.3 0.03 50)" },
  { id: "m7", group: "Finish", name: "Distressed wax", note: "Aged, tactile character", swatch: "oklch(0.5 0.055 60)" },
  { id: "m8", group: "Finish", name: "Natural lacquer", note: "Clear, grain-forward", swatch: "oklch(0.72 0.05 85)" },
  { id: "m9", group: "Hardware", name: "Hettich", note: "Soft-close, lifetime warranty", swatch: "oklch(0.72 0.02 85)" },
  { id: "m10", group: "Hardware", name: "Hafele", note: "Kitchen systems & lift-ups", swatch: "oklch(0.62 0.015 80)" },
  { id: "m11", group: "Hardware", name: "Aged brass", note: "Solid pulls, cast in-house", swatch: "oklch(0.68 0.095 78)" },
  { id: "m12", group: "Fabric", name: "Belgian linen", note: "Breathable, removable covers", swatch: "oklch(0.84 0.025 85)" },
  { id: "m13", group: "Fabric", name: "Boucle", note: "Textured, 40k rub count", swatch: "oklch(0.88 0.02 88)" },
  { id: "m14", group: "Fabric", name: "Performance velvet", note: "Stain resistant, rich depth", swatch: "oklch(0.4 0.045 40)" },
];

export interface FaqItem {
  id: string;
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  {
    id: "f1",
    q: "Is the furniture really solid sheesham?",
    a: "Yes. Frames, legs, tops and shutters are solid kiln-seasoned sheesham. Where engineered board is structurally better — like kitchen carcasses — we use BWP marine ply and say so on the quotation.",
  },
  {
    id: "f2",
    q: "How long does a custom piece take?",
    a: "Individual pieces take 12–18 days from design sign-off. Modular kitchens take 30–40 days and complete home interiors 45–60 days.",
  },
  {
    id: "f3",
    q: "Can I visit the workshop?",
    a: "Please do. Our Kharadi workshop is open every day from 10am to 8pm and clients are welcome to see their piece mid-build.",
  },
  {
    id: "f4",
    q: "Do you deliver outside Pune?",
    a: "We deliver and install across Pune, Mumbai, Nashik, Nagpur, Bengaluru, Hyderabad, Ahmedabad, Indore and Goa.",
  },
  {
    id: "f5",
    q: "What does the warranty cover?",
    a: "A 10-year structural warranty on solid wood frames and joinery, 5 years on finishes and lifetime warranty on Hettich and Hafele hardware.",
  },
  {
    id: "f6",
    q: "How is pricing decided?",
    a: "By wood species, cubic feet of timber, joinery complexity, finish and hardware. Every quote is itemised line by line, with no revision or design fees.",
  },
];

export interface ConfiguratorOption {
  id: string;
  label: string;
  note: string;
  swatch?: string;
  factor: number;
}

export interface ConfiguratorGroup {
  id: string;
  label: string;
  options: ConfiguratorOption[];
}

export const configurator: { basePrice: number; groups: ConfiguratorGroup[] } = {
  basePrice: 48000,
  groups: [
    {
      id: "wood",
      label: "Wood",
      options: [
        { id: "sheesham", label: "Sheesham", note: "Indian rosewood", swatch: "oklch(0.42 0.075 45)", factor: 1 },
        { id: "teak", label: "Burma teak", note: "Golden grain", swatch: "oklch(0.58 0.07 72)", factor: 1.35 },
        { id: "mango", label: "Mango", note: "Lighter, value", swatch: "oklch(0.66 0.055 80)", factor: 0.82 },
      ],
    },
    {
      id: "finish",
      label: "Finish",
      options: [
        { id: "oil", label: "Hand-rubbed oil", note: "Open pore", swatch: "oklch(0.38 0.05 46)", factor: 1 },
        { id: "matte", label: "Matte PU", note: "Sealed", swatch: "oklch(0.3 0.03 50)", factor: 1.08 },
        { id: "wax", label: "Distressed wax", note: "Aged", swatch: "oklch(0.5 0.055 60)", factor: 1.05 },
      ],
    },
    {
      id: "size",
      label: "Size",
      options: [
        { id: "queen", label: "Queen", note: "60 × 78 in", factor: 1 },
        { id: "king", label: "King", note: "72 × 78 in", factor: 1.18 },
        { id: "super", label: "Super king", note: "78 × 84 in", factor: 1.32 },
      ],
    },
    {
      id: "style",
      label: "Style",
      options: [
        { id: "minimal", label: "Minimal", note: "Flat, clean edge", factor: 1 },
        { id: "fluted", label: "Fluted", note: "Ribbed panelling", factor: 1.12 },
        { id: "carved", label: "Hand-carved", note: "Traditional motifs", factor: 1.28 },
      ],
    },
    {
      id: "upholstery",
      label: "Upholstery",
      options: [
        { id: "none", label: "None", note: "Full wood", swatch: "oklch(0.46 0.075 48)", factor: 1 },
        { id: "linen", label: "Bone linen", note: "Belgian", swatch: "oklch(0.86 0.025 85)", factor: 1.09 },
        { id: "velvet", label: "Cocoa velvet", note: "Performance", swatch: "oklch(0.4 0.045 40)", factor: 1.14 },
      ],
    },
  ],
};

export interface Offer {
  id: string;
  label: string;
  detail: string;
}

export const offers: Offer[] = [
  { id: "o1", label: "Free 3D design", detail: "Complimentary layout & photoreal views for full interiors" },
  { id: "o2", label: "Free home measurement", detail: "Anywhere in Pune, same week" },
  { id: "o3", label: "0% EMI", detail: "Up to 12 months on orders above ₹1,00,000" },
];

export const beforeAfter = {
  before: roomBefore,
  after: roomAfter,
  title: "A bare 3BHK in Kharadi, ninety days later",
  caption: "Drag to reveal",
};
