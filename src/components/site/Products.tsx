import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Heart, Plus } from "lucide-react";
import { PRODUCTS, FILTERS, isProductInStock } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import CurrencyToggle from "@/components/site/CurrencyToggle";

export const Products = () => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { format } = useCurrency();
  const [searchParams] = useSearchParams();

  const [activeFilter, setActiveFilter] = useState(() => {
    const cat = searchParams.get("category");
    return cat && FILTERS.includes(cat) ? cat : "All";
  });

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && FILTERS.includes(cat)) {
      setActiveFilter(cat);
      setTimeout(() => {
        document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [searchParams]);

  const displayed = activeFilter === "All"
    ? [...PRODUCTS].reverse()
    : PRODUCTS.filter((p) => p.tag === activeFilter);

  return (
    <section id="products" className="py-20 md:py-28 lg:py-36 bg-background">
      <div className="container px-4">
        {/* Editorial section header — magazine style */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 reveal">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-foreground/40" />
              <span className="text-xs uppercase tracking-widest text-foreground/60 font-medium">The Collection · {String(displayed.length).padStart(2, "0")}</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-foreground font-semibold leading-[0.95]">
              Torso Busts<br/>
              <em className="not-italic text-foreground/40">&amp; Beyond.</em>
            </h2>
          </div>
          <p className="text-foreground/70 max-w-sm md:text-right text-[15px] leading-relaxed">
            Each piece is hand-finished in our atelier — built for visual merchandising, weddings, photography and brand storytelling.
          </p>
        </div>

        {/* Filter row — editorial */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 reveal pb-5 border-b border-foreground/10">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-xs uppercase tracking-widest font-medium transition-colors py-1 ${
                  activeFilter === filter
                    ? "text-foreground border-b border-foreground"
                    : "text-foreground/40 hover:text-foreground/80"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <CurrencyToggle />
        </div>

        {displayed.length === 0 ? (
          <div className="text-center py-20 text-foreground/40">
            <p className="font-display text-2xl">No pieces in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-12 md:gap-y-16">
            {displayed.map((p, i) => {
              const displayPrice = format(p.priceINR) + (p.priceSuffix ? ` ${p.priceSuffix}` : "");
              const inStock = isProductInStock(p.id);
              const idx = String(i + 1).padStart(2, "0");
              return (
                <Link
                  to={`/product/${p.id}`}
                  key={p.id}
                  className="group block"
                >
                  {/* Image — gallery frame: ambient gradient, vignette, floor shadow, grain */}
                  <div className="relative aspect-[4/5] overflow-hidden product-frame">
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      width={600}
                      height={750}
                      className="absolute inset-0 w-full h-full object-contain p-4 md:p-5 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />

                    {/* Index number — top-left, editorial detail */}
                    <span className="absolute top-3 left-3 text-[11px] tracking-widest text-foreground/40 font-medium font-price">
                      {idx}
                    </span>

                    {/* Wishlist — minimal, monochrome */}
                    <button
                      aria-label={`${isInWishlist(p.id) ? "Remove from" : "Add to"} wishlist: ${p.name}`}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(p);
                      }}
                      className={`absolute top-3 right-3 w-8 h-8 grid place-items-center transition-colors ${
                        isInWishlist(p.id)
                          ? "text-red-500"
                          : "text-foreground/40 hover:text-foreground"
                      }`}
                    >
                      <Heart size={15} className={isInWishlist(p.id) ? "fill-red-500" : ""} strokeWidth={1.5} />
                    </button>

                    {/* OOS badge — bottom-left, only when out of stock */}
                    {!inStock && (
                      <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest font-medium text-foreground/60 bg-background/80 backdrop-blur px-2 py-1">
                        Sold Out
                      </span>
                    )}
                  </div>

                  {/* Meta — minimal text below image */}
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-medium">
                        {p.tag}
                      </p>
                      <h3 className="font-display text-lg md:text-xl mt-1 text-foreground font-medium leading-snug truncate">
                        {p.name}
                      </h3>
                      <p className="mt-1.5 text-sm font-price font-semibold text-foreground">
                        {displayPrice}
                      </p>
                    </div>

                    {/* Add to cart — minimal plus icon, only on hover, only if in stock */}
                    {inStock && (
                      <button
                        aria-label={`Add ${p.name} to cart`}
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(p);
                        }}
                        className="flex-shrink-0 w-8 h-8 grid place-items-center border border-foreground/20 hover:bg-foreground hover:text-background hover:border-foreground transition-colors"
                      >
                        <Plus size={14} strokeWidth={1.5} />
                      </button>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;