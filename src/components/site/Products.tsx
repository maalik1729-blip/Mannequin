import { Link, useNavigate } from "react-router-dom";
import { Heart, Lock, ArrowRight } from "lucide-react";
import { PRODUCTS, isProductInStock } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";
import { useCurrency } from "@/context/CurrencyContext";
import CurrencyToggle from "@/components/site/CurrencyToggle";

// Decorative cloth sash colours for female full-body mannequins
const FEMALE_CLOTH: Record<string, { from: string; to: string; label: string }> = {
  "black-female-trio": { from: "#b76e79", to: "#8a4a55", label: "Rose Gold" },
  "gold-female-duo": { from: "#7a8b6b", to: "#5a6a4d", label: "Sage" },
  "gold-white-female": { from: "#5a6c8c", to: "#3d4a66", label: "Dusty Blue" },
};

export const Products = () => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { format } = useCurrency();
  const navigate = useNavigate();

  return (
    <section id="products" className="py-16 md:py-24 lg:py-32 bg-secondary/40">
      <div className="container px-4">
        <div className="text-center max-w-2xl mx-auto reveal">
          <span className="text-xs uppercase tracking-[0.4em] text-gold font-semibold">The Collection</span>
          <h2 className="font-display text-4xl md:text-6xl mt-3 text-foreground font-semibold">Torso Busts &amp; Beyond</h2>
          <p className="text-foreground/90 mt-5 font-medium">
            Each piece is hand-finished in our atelier — built for visual
            merchandising, weddings, photography and brand storytelling.
          </p>
        </div>

        {/* Currency toggle */}
        <div className="flex justify-end mt-10 reveal px-4">
          <CurrencyToggle />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-14">
          {[...PRODUCTS].reverse().map((p, i) => {
            const displayPrice = format(p.priceINR) + (p.priceSuffix ? ` ${p.priceSuffix}` : "");
            const cloth = FEMALE_CLOTH[p.id];
            return (
              <Link
                to={`/product/${p.id}`}
                key={p.id}
                className="group bg-background reveal hover-lift block product-card border border-border/40"
                style={{ transitionDelay: `${(i % 4) * 80}ms` }}
              >
                <div className="relative aspect-square overflow-hidden bg-muted rounded-t-2xl">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    width={600}
                    height={750}
                    className="absolute inset-0 w-full h-full object-contain transition-smooth group-hover:scale-105"
                  />
                  {cloth && (
                    <div
                      aria-hidden
                      className="absolute left-1/2 top-[58%] -translate-x-1/2 w-[62%] h-5 rounded-sm shadow-lg pointer-events-none transition-smooth group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${cloth.from} 0%, ${cloth.to} 50%, ${cloth.from} 100%)`,
                        transform: "translateX(-50%) rotate(-6deg)",
                        boxShadow: `0 4px 12px ${cloth.to}55, inset 0 1px 0 rgba(255,255,255,0.25)`,
                      }}
                    />
                  )}
                  <button
                    aria-label="wishlist"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(p);
                    }}
                    className={`absolute top-3 right-3 w-10 h-10 grid place-items-center rounded-full bg-background/85 backdrop-blur shadow-sm transition-smooth z-10 ${isInWishlist(p.id) ? "text-red-500 hover:bg-background" : "hover:bg-gold hover:text-obsidian"
                      }`}
                  >
                    <Heart size={16} className={isInWishlist(p.id) ? "fill-red-500" : ""} />
                  </button>
                  <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-smooth">
                    <span className="flex items-center justify-center gap-2 w-full bg-obsidian text-white py-3 text-center text-xs uppercase tracking-[0.25em] rounded-full hover:bg-gold hover:text-obsidian transition-smooth">
                      Buy Now <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">{p.tag}</div>
                  <h3 className="font-display text-xl mt-1 text-foreground font-semibold">{p.name}</h3>
                  <div className="mt-2 text-sm text-foreground font-bold font-price">{displayPrice}</div>
                  {cloth && (
                    <div className="mt-3 flex items-center gap-2">
                      <span
                        aria-hidden
                        className="inline-block w-4 h-4 rounded-full ring-2 ring-background shadow-sm"
                        style={{ background: `linear-gradient(135deg, ${cloth.from}, ${cloth.to})` }}
                      />
                      <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/70 font-medium">
                        {cloth.label} drape
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;