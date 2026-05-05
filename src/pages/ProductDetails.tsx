import { useParams, Link } from "react-router-dom";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { PRODUCTS, isProductInStock } from "@/data/products";
import { Heart, ArrowLeft, ShoppingBag, ShoppingCart, Check, Star, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { useLenis, useReveal } from "@/hooks/useLenis";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCurrency } from "@/context/CurrencyContext";
import CurrencyToggle from "@/components/site/CurrencyToggle";
import { FemaleCover } from "@/components/site/FemaleCover";

export default function ProductDetails() {
  useLenis();
  useReveal();
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { format } = useCurrency();
  const [added, setAdded] = useState(false);

  // Generate stable mock data based on ID length
  const rating = product ? 4 + (product.id.length % 10) / 10 : 4.5; // e.g. 4.3, 4.8
  const reviewsCount = product ? 24 + (product.id.length * 3) : 56;
  const inStock = product ? isProductInStock(product.id) : true;
  const stockLeft = product ? 3 + (product.id.length % 5) : 8;

  // Price logic using numeric priceINR
  let originalPrice = "";
  let percentOff = 0;
  if (product) {
    percentOff = 15 + (product.id.length % 15); // e.g. 15% to 29%
    const orig = Math.round(product.priceINR / (1 - percentOff / 100));
    originalPrice = format(orig);
  }

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <main className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <h1 className="text-3xl font-display mb-4">Product not found</h1>
          <Link to="/" className="text-gold uppercase tracking-wider text-sm border-b border-gold pb-1">
            Return to Collection
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const relatedProducts = PRODUCTS.filter((p) => p.tag === product.tag && p.id !== product.id).slice(0, 4);

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      
      <div className="flex-1 pt-32 pb-16">
        <div className="container px-4 mx-auto max-w-6xl reveal">
          <Link to="/#products" className="inline-flex items-center text-sm uppercase tracking-widest text-foreground/70 hover:text-foreground transition-smooth mb-10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Collection
          </Link>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="bg-muted relative aspect-square overflow-hidden rounded-2xl shadow-soft">
              <img src={product.img} alt={product.name} className="absolute inset-0 w-full h-full object-contain" />
              <FemaleCover id={product.id} />
            </div>

            <div className="flex flex-col pt-4 md:pt-10">
              <span className="text-xs uppercase tracking-[0.4em] text-gold font-semibold">{product.tag}</span>
              <h1 className="font-display text-4xl lg:text-5xl mt-4 font-semibold text-foreground">{product.name}</h1>
              
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.floor(rating) ? "currentColor" : "none"} className={i < Math.floor(rating) ? "text-gold" : "text-border"} />
                  ))}
                  <span className="text-foreground ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
                </div>
                <span className="text-foreground/40 text-sm">|</span>
                <span className="text-foreground/60 text-sm">{reviewsCount} reviews</span>
              </div>

              <div className="mt-6">
                <div className="flex flex-wrap items-end gap-3">
                  <p className="text-3xl text-foreground font-bold font-price">
                    {format(product.priceINR)}
                    {product.priceSuffix && <span className="text-lg font-medium text-foreground/60 ml-1">/{product.priceSuffix}</span>}
                  </p>
                  {originalPrice && (
                    <>
                      <p className="text-lg text-foreground/50 line-through mb-1 font-price">{originalPrice}</p>
                      <span className="bg-red-500/10 text-red-500 px-2 py-0.5 rounded text-xs font-bold mb-1.5 ml-1">
                        {percentOff}% OFF
                      </span>
                    </>
                  )}
                </div>
                <div className="mt-3">
                  <CurrencyToggle />
                </div>
              </div>
              
              <div className="w-full h-[1px] bg-border my-6"></div>
              
              <p className="text-foreground/80 leading-relaxed">
                Experience unparalleled craftsmanship with the {product.name}. Designed to elevate your visual merchandising and showcase garments with exceptional elegance. Perfect for high-end retail boutiques, showrooms, and exhibitions.
              </p>

              <div className="mt-6 flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium">
                  {inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-10">
                {inStock ? (
                  <Link to={`/checkout/${product.id}`} className="flex-1 bg-obsidian text-white py-4 uppercase tracking-[0.2em] text-sm rounded-full hover:bg-gold hover:text-obsidian transition-smooth flex justify-center items-center gap-2">
                    <ShoppingBag size={18} />
                    Buy Now
                  </Link>
                ) : (
                  <button disabled className="flex-1 bg-muted text-foreground/40 py-4 uppercase tracking-[0.2em] text-sm rounded-full cursor-not-allowed flex justify-center items-center gap-2">
                    <Lock size={18} />
                    Out of Stock
                  </button>
                )}
                
                <button
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className={`flex-1 border py-4 uppercase tracking-[0.2em] text-sm rounded-full transition-smooth flex justify-center items-center gap-2 ${
                    !inStock 
                      ? "border-border text-foreground/40 cursor-not-allowed bg-muted/50" 
                      : added
                        ? "border-green-600 bg-green-600 text-white"
                        : "border-obsidian text-obsidian hover:bg-obsidian hover:text-white"
                  }`}
                >
                  {!inStock ? <Lock size={18} /> : added ? <Check size={18} /> : <ShoppingCart size={18} />}
                  {!inStock ? "Unavailable" : added ? "Added!" : "Add to Cart"}
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-12 h-14 sm:h-auto rounded-full border transition-smooth flex-shrink-0 grid place-items-center ${
                    isInWishlist(product.id)
                      ? "border-red-500 text-red-500 bg-red-500/5"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  <Heart size={20} className={isInWishlist(product.id) ? "fill-red-500" : ""} />
                </button>
              </div>

              <div className="mt-12 space-y-4 text-sm text-foreground/70">
                <p><strong>SKU:</strong> MNQ-{product.id.substring(0, 6).toUpperCase()}</p>
                <p><strong>Category:</strong> {product.tag}</p>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="container px-4 mx-auto max-w-6xl mt-32 reveal">
            <h2 className="font-display text-3xl mb-10 text-center uppercase tracking-widest font-semibold">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link
                  to={`/product/${p.id}`}
                  key={p.id}
                  className="group bg-background block hover-lift product-card border border-border/40"
                >
                  <div className="relative aspect-square overflow-hidden bg-muted rounded-t-2xl">
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-contain transition-smooth group-hover:scale-105"
                    />
                    <FemaleCover id={p.id} scaleOnHover />
                    <button
                      aria-label="wishlist"
                      className="absolute top-3 right-3 w-10 h-10 grid place-items-center rounded-full bg-background/85 backdrop-blur shadow-sm hover:bg-gold hover:text-obsidian transition-smooth z-10"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Heart size={15} />
                    </button>
                  </div>
                  <div className="p-4 text-center">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">{p.tag}</div>
                    <h3 className="font-display text-lg mt-1 text-foreground font-semibold truncate">{p.name}</h3>
                    <div className="mt-1 text-sm text-foreground font-bold font-price">
                      {format(p.priceINR)}{p.priceSuffix ? ` ${p.priceSuffix}` : ""}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
