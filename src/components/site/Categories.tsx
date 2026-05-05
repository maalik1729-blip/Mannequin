import { ArrowUpRight } from "lucide-react";
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
      <div className="flex items-end justify-between mb-14 reveal">
        <div>
          <span className="text-xs uppercase tracking-[0.4em] text-gold font-semibold">Browse</span>
          <h2 className="font-display text-4xl md:text-6xl mt-3 text-foreground font-semibold">By Category</h2>
        </div>
        <a
          href="/#products"
          className="hidden md:inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-foreground font-medium hover:text-gold transition-smooth"
        >
          View all <ArrowUpRight size={16} />
        </a>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {CATS.map((c, i) => (
          <a
            key={c.title}
            href="/#products"
            className="group relative aspect-[3/4] overflow-hidden bg-secondary reveal rounded-2xl shadow-soft hover:shadow-luxe transition-smooth"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <img
              src={c.img}
              alt={c.title}
              loading="lazy"
              width={600}
              height={800}
              className="absolute inset-0 w-full h-full object-cover transition-smooth group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-6 text-white">
              <div className="text-xs uppercase tracking-[0.3em] text-gold font-medium">
                {c.count} {c.count === 1 ? "piece" : "pieces"}
              </div>
              <div className="font-display text-2xl mt-1 flex items-center justify-between font-semibold">
                {c.title}
                <ArrowUpRight
                  size={20}
                  className="-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-smooth"
                />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Categories;