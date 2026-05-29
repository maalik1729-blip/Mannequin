import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { PRODUCTS, FILTERS, isProductInStock } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import CurrencyToggle from "@/components/site/CurrencyToggle";
import { toast } from "sonner";

export const Products = () => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { format } = useCurrency();
  const [searchParams] = useSearchParams();

  const [activeFilter, setActiveFilter] = useState(() => {
    const cat = searchParams.get("category");
    return cat && FILTERS.includes(cat) ? cat : "All";
  });

  // Remove "Kids Range" from displayed filters — no products in this category yet
  const VISIBLE_FILTERS = FILTERS.filter((f) => f !== "Kids Range");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && FILTERS.includes(cat)) {
      setActiveFilter(cat);
      setTimeout(() => {
        document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [searchParams]);

  const getFilterCount = (filter: string) => {
    if (filter === "All") return PRODUCTS.length;
    if (filter === "Full Body Male") {
      return PRODUCTS.filter((p) => p.tag === "Full Body Male" || p.tag === "Full Body").length;
    }
    return PRODUCTS.filter((p) => p.tag === filter).length;
  };

  const displayed = activeFilter === "All"
    ? [...PRODUCTS].reverse()
    : PRODUCTS.filter((p) => p.tag === activeFilter);

  const handleAddToCart = (e: React.MouseEvent, p: (typeof PRODUCTS)[0]) => {
    e.preventDefault();
    addToCart(p);
    toast.success(`${p.name} added to cart`);
  };

  return (
    <section id="products" className="py-20 md:py-28 lg:py-36 bg-background">
      <div className="container px-4">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 reveal">
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

        {/* Filter row + Currency toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 reveal pb-5 border-b border-foreground/10">
          {/* Filter pills — horizontal scroll on mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap scrollbar-hide">
            {VISIBLE_FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-smooth whitespace-nowrap ${
                  activeFilter === filter
                    ? "bg-gold text-obsidian shadow-md"
                    : "border border-border text-foreground/60 hover:border-foreground/60 hover:text-foreground"
                }`}
              >
                {filter} ({getFilterCount(filter)})
              </button>
            ))}
          </div>
          <div className="flex-shrink-0">
            <CurrencyToggle />
          </div>
        </div>

        {displayed.length === 0 ? (
          <div className="text-center py-24 text-foreground/40">
            <p className="font-display text-2xl">No pieces in this category yet.</p>
            <button
              onClick={() => setActiveFilter("All")}
              className="mt-4 text-xs uppercase tracking-widest text-gold hover:underline transition-smooth"
            >
              View all products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-12 md:gap-y-16">
            {displayed.map((p, i) => {
              const displayPrice = format(p.priceINR) + (p.priceSuffix ? ` ${p.priceSuffix}` : "");
              const inStock = isProductInStock(p.id);
              const idx = String(i + 1).padStart(2, "0");
              const isFullBody = p.tag.includes("Full Body");
              return (
                <Link
                  to={`/product/${p.id}`}
                  key={p.id}
                  className="group block"
                >
                  {/* Image frame */}
                  <div className={`relative overflow-hidden product-frame ${isFullBody ? "aspect-[3/4]" : "aspect-[4/5]"}`}>
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      width={600}
                      height={750}
                      className="absolute inset-0 w-full h-full object-contain p-4 md:p-5 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />

                    {/* Index number — editorial detail */}
                    <span className="absolute top-3 left-3 text-[11px] tracking-widest text-foreground/40 font-medium font-price">
                      {idx}
                    </span>

                    {/* Wishlist */}
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

                    {/* Add to cart — always visible, bottom-right */}
                    {inStock && (
                      <button
                        aria-label={`Add ${p.name} to cart`}
                        onClick={(e) => handleAddToCart(e, p)}
                        className="absolute bottom-3 right-3 w-9 h-9 grid place-items-center rounded-full bg-obsidian/90 text-white hover:bg-gold hover:text-obsidian transition-smooth z-10 shadow-md opacity-0 group-hover:opacity-100 sm:opacity-100"
                      >
                        <ShoppingCart size={14} />
                      </button>
                    )}

                    {/* OOS badge */}
                    {!inStock && (
                      <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest font-medium text-foreground/60 bg-background/80 backdrop-blur px-2 py-1">
                        Sold Out
                      </span>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs uppercase tracking-wider text-foreground/50 font-medium">
                        {p.tag}
                      </p>
                      <h3 className="font-display text-lg md:text-xl mt-1 text-foreground font-medium leading-snug line-clamp-2">
                        {p.name}
                      </h3>
                      <p className="mt-1.5 text-sm font-price font-semibold text-foreground">
                        {displayPrice}
                      </p>
                    </div>
                  </div>

                  {/* Mobile add to cart — visible without hover */}
                  {inStock && (
                    <button
                      aria-label={`Add ${p.name} to cart`}
                      onClick={(e) => handleAddToCart(e, p)}
                      className="sm:hidden mt-3 w-full border border-foreground/20 text-xs uppercase tracking-widest font-semibold py-2.5 rounded-full hover:bg-foreground hover:text-background transition-smooth"
                    >
                      Add to Cart
                    </button>
                  )}
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