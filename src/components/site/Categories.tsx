import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "@/data/products";

// Derive unique categories from actual product data
const EXCLUDE_TAGS = new Set(["Full Body"]); // merged into "Full Body Male And Female"

const DISPLAY_NAMES: Record<string, string> = {
  "Full Body Male": "Full Body Male And Female",
};

const buildCategories = () => {
  const map = new Map<string, { count: number; img: string }>();

  [...PRODUCTS].reverse().forEach((p) => {
    if (EXCLUDE_TAGS.has(p.tag)) return; // skip excluded tags
    const tag = p.tag;
    if (!map.has(tag)) {
      map.set(tag, { count: 1, img: p.img });
    } else {
      map.get(tag)!.count += 1;
    }
  });

  // Also add count from excluded "Full Body" into "Full Body Male"
  PRODUCTS.forEach((p) => {
    if (p.tag === "Full Body" && map.has("Full Body Male")) {
      map.get("Full Body Male")!.count += 1;
    }
  });

  return Array.from(map.entries())
    .map(([tag, { count, img }]) => ({
      tag,
      title: DISPLAY_NAMES[tag] ?? tag,
      count,
      img,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);
};

const CATS = buildCategories();

export const Categories = () => (
  <section className="py-16 md:py-24 lg:py-32 bg-background">
    <div className="container px-4">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 reveal">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-foreground/40" />
            <span className="text-xs uppercase tracking-widest text-foreground/60 font-medium">Browse</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-foreground font-semibold leading-[0.95]">
            By <em className="not-italic text-foreground/40">Category.</em>
          </h2>
        </div>
        <Link
          to="/?category=All#products"
          className="hidden md:inline-flex items-center gap-2 text-sm uppercase tracking-widest text-foreground font-medium hover:text-gold transition-smooth"
        >
          View all <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {CATS.map((c, i) => (
          <Link
            key={c.title}
            to={`/?category=${encodeURIComponent(c.tag)}#products`}
            className="group relative aspect-[3/4] overflow-hidden bg-secondary reveal transition-colors"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <img
              src={c.img}
              alt={c.title}
              loading="lazy"
              width={600}
              height={800}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/95 via-obsidian/30 to-transparent" />
            <span className="absolute top-4 left-4 text-[11px] tracking-widest text-ivory/60 font-medium font-price">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="absolute bottom-0 inset-x-0 p-5 md:p-6 text-ivory">
              <div className="text-[11px] uppercase tracking-widest text-ivory/60 font-medium">
                {c.count} {c.count === 1 ? "piece" : "pieces"}
              </div>
              <div className="font-display text-xl md:text-2xl mt-1.5 flex items-end justify-between gap-3 font-medium leading-tight">
                <span>{c.title}</span>
                <ArrowUpRight
                  size={18}
                  className="flex-shrink-0 mb-1 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default Categories;