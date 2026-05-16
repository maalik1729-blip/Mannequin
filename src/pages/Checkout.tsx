import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { PRODUCTS } from "@/data/products";
import { ArrowLeft, CreditCard, Banknote, QrCode, Loader2 } from "lucide-react";
import { useLenis, useReveal } from "@/hooks/useLenis";
import { useCurrency } from "@/context/CurrencyContext";
import { useCart } from "@/context/CartContext";

export default function Checkout() {
  useLenis();
  useReveal();
  const { id } = useParams();
  const navigate = useNavigate();
  const { items: cartItems, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cards");
  const { format } = useCurrency();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Single-product (Buy Now) or cart-based checkout
  const singleProduct = id ? PRODUCTS.find((p) => p.id === id) : null;
  const checkoutItems = singleProduct
    ? [{ ...singleProduct, quantity: 1 }]
    : cartItems;

  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.priceINR * item.quantity,
    0
  );

  if (checkoutItems.length === 0) {
    return (
      <main className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-8 pt-32 gap-4">
          <h1 className="text-3xl font-display">Your cart is empty</h1>
          <button onClick={() => navigate("/")} className="btn-ghost">
            Return to Store
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (!singleProduct) clearCart();
      navigate("/order-success");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <div className="flex-1 pt-32 pb-16">
        <div className="container px-4 mx-auto max-w-6xl">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm uppercase tracking-widest text-foreground/70 hover:text-foreground transition-smooth mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>

          <h1 className="font-display text-4xl mb-10 font-semibold uppercase tracking-widest">Checkout</h1>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            {/* ─── Form ─── */}
            <div className="lg:col-span-7">
              <form id="checkout-form" onSubmit={onSubmit} className="space-y-10">
                <section>
                  <h2 className="text-xl font-display font-semibold mb-6 pb-2 border-b border-border">
                    Shipping Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Full Name" required autoComplete="name" />
                    <Field label="Phone Number" type="tel" required pattern="^[0-9]{10}$" title="Enter a valid 10-digit number" />
                    <div className="col-span-1 sm:col-span-2">
                      <Field label="Email Address" type="email" required autoComplete="email" />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                      <Field label="Street Address" required autoComplete="street-address" />
                    </div>
                    <Field label="City" required autoComplete="address-level2" />
                    <Field label="State / Province" required autoComplete="address-level1" />
                    <Field label="Postal / Zip Code" required autoComplete="postal-code" />
                    <Field label="Country" required defaultValue="India" autoComplete="country-name" />
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-display font-semibold mb-6 pb-2 border-b border-border">
                    Payment Method
                  </h2>
                  <fieldset className="grid grid-cols-1 md:grid-cols-3 gap-4" aria-label="Select payment method">
                    <PaymentOption id="cards" title="Credit / Debit Card" icon={<CreditCard className="w-6 h-6" />} selected={paymentMethod === "cards"} onChange={() => setPaymentMethod("cards")} />
                    <PaymentOption id="upi" title="UPI" icon={<QrCode className="w-6 h-6" />} selected={paymentMethod === "upi"} onChange={() => setPaymentMethod("upi")} />
                    <PaymentOption id="cod" title="Cash on Delivery" icon={<Banknote className="w-6 h-6" />} selected={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
                  </fieldset>

                  {paymentMethod === "cards" && (
                    <div className="mt-6 p-5 border border-border rounded-xl bg-muted/30 space-y-4">
                      <Field label="Card Number" placeholder="0000 0000 0000 0000" />
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Expiry (MM/YY)" placeholder="MM/YY" />
                        <Field label="CVV" placeholder="123" />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div className="mt-6 p-5 border border-border rounded-xl bg-muted/30 space-y-3">
                      <Field label="UPI ID" placeholder="username@bank" />
                      <p className="text-xs text-foreground/60">Or scan the QR code shown on the next step.</p>
                    </div>
                  )}

                  {paymentMethod === "cod" && (
                    <div className="mt-6 p-5 border border-border rounded-xl bg-muted/30 space-y-2 text-sm text-foreground/80">
                      <p className="font-semibold text-foreground">Cash on Delivery — Terms</p>
                      <ul className="space-y-1 text-foreground/70 list-disc list-inside">
                        <li>Payment collected at the time of delivery.</li>
                        <li>COD available across India for orders below ₹1,00,000.</li>
                        <li>Estimated delivery: 5–10 business days.</li>
                        <li>For bulk or custom orders, advance payment may apply.</li>
                      </ul>
                    </div>
                  )}
                </section>
              </form>
            </div>

            {/* ─── Order Summary ─── */}
            <div className="lg:col-span-5">
              <div className="bg-muted/30 border border-border rounded-2xl p-6 lg:p-8 sticky top-32">
                <h2 className="text-xl font-display font-semibold mb-5">Order Summary</h2>

                <div className="space-y-4 mb-5 pb-5 border-b border-border">
                  {checkoutItems.map((item) => (
                    <div key={item.id} className="flex gap-4 py-2">
                      <div className="w-16 h-16 bg-muted flex-shrink-0 rounded-lg overflow-hidden">
                        <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm font-display leading-tight truncate">{item.name}</h3>
                        <p className="text-xs text-foreground/50 uppercase tracking-widest mt-0.5">{item.tag}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-foreground/60">Qty: {item.quantity}</span>
                          <span className="font-semibold font-price text-sm">
                            {format(item.priceINR * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pb-5 border-b border-border text-sm">
                  <div className="flex justify-between py-1">
                    <span className="text-foreground/70">Subtotal</span>
                    <span className="font-price">{format(subtotal)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-foreground/70">Shipping</span>
                    <span className="text-foreground/70 text-xs">Free above ₹50,000 · Calculated otherwise</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-foreground/70">Taxes</span>
                    <span>Included</span>
                  </div>
                </div>

                <div className="flex justify-between font-display text-xl font-semibold pt-4 mb-6">
                  <span>Total</span>
                  <span className="font-price text-gold">{format(subtotal)}</span>
                </div>

                <button
                  type="submit"
                  form="checkout-form"
                  disabled={loading}
                  className="w-full bg-obsidian text-white py-4 uppercase tracking-widest text-sm font-bold rounded-full hover:bg-gold hover:text-obsidian transition-smooth flex justify-center items-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <><Loader2 size={16} className="animate-spin" /> Processing…</>
                  ) : (
                    "Place Order"
                  )}
                </button>
                <p className="mt-4 text-center text-xs text-foreground/50">
                  Payments are secure and encrypted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

const Field = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <label className="field-label">{label}{props.required && <span className="text-red-400 ml-0.5">*</span>}</label>
    <input
      {...props}
      className="field-input"
    />
  </div>
);

const PaymentOption = ({
  id,
  title,
  icon,
  selected,
  onChange,
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
  selected: boolean;
  onChange: () => void;
}) => (
  <label
    htmlFor={`payment-${id}`}
    className={`border rounded-xl p-4 cursor-pointer flex flex-col items-center text-center gap-2 transition-smooth select-none ${
      selected ? "border-gold bg-gold/5 ring-1 ring-gold/30" : "border-border hover:border-foreground/40"
    }`}
  >
    <input
      type="radio"
      id={`payment-${id}`}
      name="payment-method"
      value={id}
      checked={selected}
      onChange={onChange}
      className="sr-only"
    />
    {icon}
    <span className="text-sm font-medium">{title}</span>
  </label>
);
