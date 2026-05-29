import { X, Minus, Plus, ShoppingBag, Trash2, AlertTriangle, Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { isProductInStock } from "@/data/products";
import { useCurrency } from "@/context/CurrencyContext";

export default function CartDrawer() {
  const { items, cartOpen, setCartOpen, removeFromCart, updateQty, totalItems, cartTotal } = useCart();
  const { format } = useCurrency();
  const navigate = useNavigate();

  if (!cartOpen) return null;

  const hasOutOfStockItems = items.some((item) => !isProductInStock(item.id));
  const inStockItems = items.filter((item) => isProductInStock(item.id));

  const handleCheckout = () => {
    if (items.length === 0) return;
    setCartOpen(false);
    navigate("/checkout");
  };

  const handleRemoveOOSAndCheckout = () => {
    items
      .filter((item) => !isProductInStock(item.id))
      .forEach((item) => removeFromCart(item.id));
    setCartOpen(false);
    navigate("/checkout");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[150] bg-obsidian/60 backdrop-blur-sm"
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md z-[200] bg-background shadow-luxe flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-gold" />
            <span className="font-display text-xl font-semibold">Your Cart</span>
            {totalItems > 0 && (
              <span className="bg-gold text-obsidian text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <button onClick={() => setCartOpen(false)} className="p-2 rounded-full hover:text-gold hover:bg-muted transition-smooth">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 text-foreground/50">
              <ShoppingBag size={48} className="opacity-20" />
              <div>
                <p className="font-display text-xl text-foreground/70">Your cart is empty</p>
                <p className="text-sm text-foreground/50 mt-1.5 max-w-[200px] mx-auto">
                  Browse the collection and add pieces you love.
                </p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="btn-secondary px-5 py-2.5 text-xs"
              >
                Explore Products
              </button>
            </div>
          ) : (
            items.map((item) => {
              const inStock = isProductInStock(item.id);
              return (
              <div key={item.id} className={`flex gap-4 py-4 border-b border-border ${!inStock ? 'opacity-60 grayscale-[0.5]' : ''}`}>
                <div className="w-20 h-20 bg-muted flex-shrink-0 relative rounded-lg overflow-hidden">
                  <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                  {!inStock && (
                    <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px] flex items-center justify-center">
                      <Lock size={16} className="text-obsidian drop-shadow-md" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-semibold text-sm truncate">{item.name}</h3>
                    {!inStock && <span className="text-[9px] uppercase tracking-widest text-red-500 font-bold bg-red-500/10 px-1.5 py-0.5 rounded whitespace-nowrap">Out of Stock</span>}
                  </div>
                  <p className="text-xs text-gold uppercase tracking-widest mt-0.5">{item.tag}</p>
                  <p className={`text-sm font-bold mt-1 font-price ${!inStock ? 'line-through opacity-50' : ''}`}>
                    {format(item.priceINR)}{item.priceSuffix ? ` ${item.priceSuffix}` : ""}
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-border rounded-full overflow-hidden">
                      <button
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="w-12 h-12 flex items-center justify-center hover:bg-muted transition-smooth"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium font-price" aria-live="polite">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.id, Math.min(99, item.quantity + 1))}
                        disabled={!inStock}
                        aria-label="Increase quantity"
                        className={`w-12 h-12 flex items-center justify-center transition-smooth ${!inStock ? 'cursor-not-allowed opacity-50' : 'hover:bg-muted'}`}
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                      className="p-2 text-foreground/40 hover:text-red-500 transition-smooth ml-auto rounded-full hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-border space-y-4 bg-background">
            <div className="flex justify-between text-sm text-foreground/70">
              <span>{totalItems} item{totalItems !== 1 ? "s" : ""}</span>
              <span className="text-xs">Shipping at checkout</span>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="font-display text-base font-semibold">Total</span>
              <span className="font-price text-lg font-bold">{format(cartTotal)}</span>
            </div>

            {hasOutOfStockItems && (
              <div className="flex items-start gap-2 bg-red-500/10 text-red-600 text-xs p-3 rounded-lg border border-red-500/20">
                <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
                <p>{inStockItems.length > 0 ? "Some items are out of stock." : "All items are out of stock."}</p>
              </div>
            )}

            {hasOutOfStockItems && inStockItems.length > 0 ? (
              <button
                onClick={handleRemoveOOSAndCheckout}
                className="w-full py-4 uppercase tracking-widest text-sm font-bold rounded-full transition-smooth flex justify-center items-center gap-2 bg-obsidian text-white hover:bg-gold hover:text-obsidian"
              >
                <ShoppingBag size={16} />
                Remove OOS &amp; Checkout
              </button>
            ) : (
              <button
                onClick={handleCheckout}
                disabled={hasOutOfStockItems}
                className={`w-full py-4 uppercase tracking-widest text-sm font-bold rounded-full transition-smooth flex justify-center items-center gap-2 ${
                  hasOutOfStockItems
                    ? 'bg-muted text-foreground/40 cursor-not-allowed border border-border'
                    : 'bg-obsidian text-white hover:bg-gold hover:text-obsidian'
                }`}
              >
                {hasOutOfStockItems ? <Lock size={16} /> : <ShoppingBag size={16} />}
                Proceed to Checkout
              </button>
            )}
            <button
              onClick={() => setCartOpen(false)}
              className="w-full text-xs uppercase tracking-widest text-foreground/60 hover:text-foreground transition-smooth py-1"
            >
              Continue Shopping
            </button>
            <div className="mt-4 pt-3.5 border-t border-border/40 flex items-center justify-center gap-1.5 text-[9px] sm:text-[10px] uppercase tracking-widest text-foreground/50 text-center font-medium transition-colors">
              <span>Secure Invoicing</span>
              <span className="text-gold/40">•</span>
              <span>1-Yr Warranty</span>
              <span className="text-gold/40">•</span>
              <span>Pan-India Freight</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
