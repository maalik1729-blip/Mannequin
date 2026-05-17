import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { useWishlist } from "@/context/WishlistContext";
import { Heart, Trash2, ArrowLeft, Lock, ChevronRight } from "lucide-react";
import { useLenis, useReveal } from "@/hooks/useLenis";
import { useEffect } from "react";
import { isProductInStock } from "@/data/products";
import { Link } from "react-router-dom";
import { useCurrency } from "@/context/CurrencyContext";

export default function Wishlist() {
  useLenis();
  useReveal();
  const { items, toggleWishlist } = useWishlist();
  const { format } = useCurrency();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <div className="flex-1 pt-32 pb-24">
        <div className="container px-4 max-w-6xl mx-auto reveal">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs uppercase tracking-wider text-foreground/50 font-medium mb-8">
            <Link to="/" className="hover:text-foreground transition-smooth">Home</Link>
            <ChevronRight size={12} />
            <span className="text-foreground/80">Wishlist</span>
          </nav>

          <Link to="/#products" className="inline-flex items-center text-sm uppercase tracking-widest text-foreground/70 hover:text-foreground transition-smooth mb-10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>

          <div className="flex items-center justify-between mb-10 border-b border-border pb-4">
            <h1 className="font-display text-4xl font-semibold flex items-center gap-3">
              <Heart className="text-gold fill-gold w-8 h-8" />
              My Wishlist
            </h1>
            <span className="text-sm uppercase tracking-widest text-foreground/60">
              {items.length} {items.length === 1 ? "Item" : "Items"}
            </span>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-20 bg-muted/30 border border-border rounded-2xl">
              <Heart className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
              <h2 className="text-2xl font-display mb-2">Your wishlist is empty</h2>
              <p className="text-foreground/60 mb-8">Add mannequins, decor, or mandaps you're considering — we'll keep them here for you.</p>
              <Link to="/#products" className="inline-block bg-obsidian text-white px-8 py-3 uppercase tracking-widest text-sm rounded-full hover:bg-gold hover:text-obsidian transition-smooth">
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((p) => (
                <div key={p.id} className="group bg-background border border-border/40 hover-lift relative flex flex-col product-card">
                  <Link to={`/product/${p.id}`} className="block product-frame relative aspect-square overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      className={`absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.04] ${!isProductInStock(p.id) ? 'opacity-50 grayscale' : ''}`}
                    />
                    {!isProductInStock(p.id) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[2px]">
                        <span className="bg-obsidian text-white px-3 py-1.5 text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 shadow-xl rounded-full">
                          <Lock size={10} /> Out of Stock
                        </span>
                      </div>
                    )}
                  </Link>
                  <button
                    aria-label={`Remove ${p.name} from wishlist`}
                    className="absolute top-3 right-3 w-10 h-10 grid place-items-center rounded-full bg-background/90 backdrop-blur shadow-sm text-red-500 hover:bg-red-500 hover:text-white transition-smooth z-10"
                    onClick={() => toggleWishlist(p)}
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="text-xs uppercase tracking-widest text-foreground/50 font-semibold">{p.tag}</div>
                    <Link to={`/product/${p.id}`}>
                      <h3 className="font-display text-lg mt-1 text-foreground font-semibold hover:text-gold transition-smooth line-clamp-1">{p.name}</h3>
                    </Link>
                    <div className="mt-2 text-sm text-foreground font-bold font-price">
                      {format(p.priceINR)}{p.priceSuffix ? ` ${p.priceSuffix}` : ""}
                    </div>
                    <div className="mt-auto pt-4">
                      {isProductInStock(p.id) ? (
                        <Link to={`/product/${p.id}`} className="block w-full text-center border border-obsidian text-obsidian py-2 uppercase tracking-widest text-xs rounded-full hover:bg-obsidian hover:text-white transition-smooth">
                          View Details
                        </Link>
                      ) : (
                        <button disabled className="block w-full text-center border border-border bg-muted/50 text-foreground/40 py-2 uppercase tracking-widest text-xs rounded-full cursor-not-allowed">
                          Unavailable
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
