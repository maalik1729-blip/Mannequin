import { useParams, Link } from "react-router-dom";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { PRODUCTS, isProductInStock } from "@/data/products";
import { Heart, ArrowLeft, ShoppingBag, ShoppingCart, Check, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { useLenis, useReveal } from "@/hooks/useLenis";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCurrency } from "@/context/CurrencyContext";
import CurrencyToggle from "@/components/site/CurrencyToggle";

export default function ProductDetails() {
  useLenis();
  useReveal();
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { format } = useCurrency();
  const [added, setAdded] = useState(false);


  const inStock = product ? isProductInStock(product.id) : true;
  const [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < qty; i++) addToCart(product);
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
            <div className="product-frame relative aspect-square overflow-hidden">
              <img src={product.img} alt={product.name} className="absolute inset-0 w-full h-full object-contain p-6" />
            </div>

            <div className="flex flex-col pt-4 md:pt-10">
              <span className="text-xs uppercase tracking-[0.4em] text-gold font-semibold">{product.tag}</span>
              <h1 className="font-display text-4xl lg:text-5xl mt-4 font-semibold text-foreground">{product.name}</h1>
              


              <div className="mt-6">
                <div className="flex flex-wrap items-end gap-3">
                  <p className="text-3xl text-gold font-bold font-price">
                    {format(product.priceINR)}
                    {product.priceSuffix && <span className="text-lg font-medium text-foreground/60 ml-1">/{product.priceSuffix}</span>}
                  </p>
                </div>
                <div className="mt-3">
                  <CurrencyToggle />
                </div>
              </div>
              
              <div className="w-full h-[1px] bg-border my-6"></div>
              
              <p className="text-foreground/80 leading-relaxed">
                {product.description}
              </p>

              <div className="mt-6">
                {inStock ? (
                  <span className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" aria-hidden="true" />
                    In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 bg-red-500/10 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" aria-hidden="true" />
                    Currently Unavailable
                  </span>
                )}
              </div>

              {/* Quantity stepper */}
              {inStock && (
                <div className="mt-6 flex items-center gap-4">
                  <span className="text-sm text-foreground/70 uppercase tracking-widest font-medium">Qty</span>
                  <div className="flex items-center border border-border rounded-full overflow-hidden">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-smooth"
                    >
                      <span className="text-lg leading-none">−</span>
                    </button>
                    <span className="w-10 text-center text-sm font-semibold font-price">{qty}</span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      aria-label="Increase quantity"
                      className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-smooth"
                    >
                      <span className="text-lg leading-none">+</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                {inStock ? (
                  <Link to={`/checkout/${product.id}`} className="flex-1 bg-obsidian text-white py-4 uppercase tracking-widest text-sm rounded-full hover:bg-gold hover:text-obsidian transition-smooth flex justify-center items-center gap-2">
                    <ShoppingBag size={18} />
                    Buy Now
                  </Link>
                ) : (
                  <button disabled className="flex-1 bg-muted text-foreground/40 py-4 uppercase tracking-widest text-sm rounded-full cursor-not-allowed flex justify-center items-center gap-2">
                    <Lock size={18} />
                    Unavailable
                  </button>
                )}
                
                <button
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className={`flex-1 border py-4 uppercase tracking-widest text-sm rounded-full transition-smooth flex justify-center items-center gap-2 ${
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
                  aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
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

              <div className="mt-10 space-y-2 text-sm text-foreground/70">
                <p><span className="text-xs uppercase tracking-widest text-foreground/50 font-medium">Category:</span> <span className="ml-2">{product.tag}</span></p>
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
                  className="group block"
                >
                  <div className="product-frame relative aspect-square overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <button
                      aria-label={`${isInWishlist(p.id) ? 'Remove from' : 'Add to'} wishlist: ${p.name}`}
                      className={`absolute top-3 right-3 w-10 h-10 grid place-items-center rounded-full bg-background/85 backdrop-blur shadow-sm transition-smooth z-10 ${
                        isInWishlist(p.id) ? 'text-red-500' : 'hover:bg-gold hover:text-obsidian'
                      }`}
                      onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                    >
                      <Heart size={15} className={isInWishlist(p.id) ? 'fill-red-500' : ''} />
                    </button>
                  </div>
                  <div className="p-4 text-center">
                    <div className="text-xs uppercase tracking-widest text-foreground/50 font-semibold">{p.tag}</div>
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
