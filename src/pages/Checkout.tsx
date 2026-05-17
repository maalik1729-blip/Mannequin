import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { PRODUCTS } from "@/data/products";
import { ArrowLeft, CreditCard, Banknote, QrCode, Loader2, ChevronRight, ShieldCheck, Info } from "lucide-react";
import { useLenis, useReveal } from "@/hooks/useLenis";
import { useCurrency } from "@/context/CurrencyContext";
import { useCart } from "@/context/CartContext";

// ─── Field component ───────────────────────────────────────
const Field = ({ label, error, ...props }: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <label className="field-label">
      {label}{props.required && <span className="text-red-400 ml-0.5" aria-hidden="true">*</span>}
    </label>
    <input
      {...props}
      aria-required={props.required}
      className={`field-input ${error ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

// ─── Payment option component ───────────────────────────────
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

// ─── Main Checkout page ─────────────────────────────────────
export default function Checkout() {
  useLenis();
  useReveal();
  const { id } = useParams();
  const navigate = useNavigate();
  const { items: cartItems, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cards");
  const { format } = useCurrency();

  // Simple form-level validation state
  const [errors, setErrors] = useState<Record<string, string>>({});

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
  const shippingFree = subtotal >= 50000;

  if (checkoutItems.length === 0) {
    return (
      <main className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-8 pt-32 gap-4 text-center">
          <h1 className="text-3xl font-display font-semibold">Your cart is empty</h1>
          <p className="text-foreground/60 text-sm max-w-xs">Browse our collection and add pieces you love.</p>
          <Link to="/#products" className="btn-secondary mt-2 px-6 py-3 text-xs">
            Explore Collection
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const validate = (form: HTMLFormElement): boolean => {
    const newErrors: Record<string, string> = {};
    const name = (form.elements.namedItem("fullName") as HTMLInputElement)?.value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement)?.value;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const address = (form.elements.namedItem("address") as HTMLInputElement)?.value;
    const city = (form.elements.namedItem("city") as HTMLInputElement)?.value;
    const state = (form.elements.namedItem("state") as HTMLInputElement)?.value;
    const postal = (form.elements.namedItem("postal") as HTMLInputElement)?.value;

    if (!name?.trim()) newErrors.fullName = "Full name is required";
    if (!phone?.match(/^[0-9]{10}$/)) newErrors.phone = "Enter a valid 10-digit number";
    if (!email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Enter a valid email address";
    if (!address?.trim()) newErrors.address = "Address is required";
    if (!city?.trim()) newErrors.city = "City is required";
    if (!state?.trim()) newErrors.state = "State is required";
    if (!postal?.trim()) newErrors.postal = "Postal code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate(e.currentTarget)) return;
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

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs uppercase tracking-wider text-foreground/50 font-medium mb-6">
            <Link to="/" className="hover:text-foreground transition-smooth">Home</Link>
            <ChevronRight size={12} />
            <span className="text-foreground/80">Checkout</span>
          </nav>

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
              <form id="checkout-form" onSubmit={onSubmit} noValidate className="space-y-10">
                {/* Shipping section */}
                <section>
                  <h2 className="text-xl font-display font-semibold mb-6 pb-2 border-b border-border">
                    Shipping Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field name="fullName" label="Full Name" required autoComplete="name" error={errors.fullName} />
                    <Field name="phone" label="Phone Number" type="tel" required error={errors.phone} />
                    <div className="col-span-1 sm:col-span-2">
                      <Field name="email" label="Email Address" type="email" required autoComplete="email" error={errors.email} />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                      <Field name="address" label="Street Address" required autoComplete="street-address" error={errors.address} />
                    </div>
                    <Field name="city" label="City" required autoComplete="address-level2" error={errors.city} />
                    <Field name="state" label="State" required autoComplete="address-level1" error={errors.state} />
                    <Field name="postal" label="Postcode" required autoComplete="postal-code" error={errors.postal} />
                    <Field name="country" label="Country" required defaultValue="India" autoComplete="country-name" />
                  </div>
                </section>

                {/* Payment section */}
                <section>
                  <h2 className="text-xl font-display font-semibold mb-6 pb-2 border-b border-border">
                    Payment Method
                  </h2>
                  <fieldset aria-label="Select payment method">
                    <legend className="sr-only">Payment method</legend>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <PaymentOption id="cards" title="Credit / Debit Card" icon={<CreditCard className="w-6 h-6" />} selected={paymentMethod === "cards"} onChange={() => setPaymentMethod("cards")} />
                      <PaymentOption id="upi" title="UPI" icon={<QrCode className="w-6 h-6" />} selected={paymentMethod === "upi"} onChange={() => setPaymentMethod("upi")} />
                      <PaymentOption id="cod" title="Cash on Delivery" icon={<Banknote className="w-6 h-6" />} selected={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
                    </div>
                  </fieldset>

                  {paymentMethod === "cards" && (
                    <div className="mt-6 p-5 border border-border rounded-xl bg-muted/30 space-y-4">
                      <Field label="Card Number" placeholder="0000 0000 0000 0000" maxLength={19} />
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Expiry (MM/YY)" placeholder="MM/YY" maxLength={5} />
                        <Field label="CVV" placeholder="•••" maxLength={4} />
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
                    <div className="mt-6 p-5 border border-border rounded-xl bg-muted/30 space-y-3 text-sm text-foreground/80">
                      <div className="flex items-center gap-2 mb-1">
                        <Info size={14} className="text-gold flex-shrink-0" />
                        <p className="font-semibold text-foreground">Cash on Delivery — Terms</p>
                      </div>
                      <ul className="space-y-2 text-foreground/70 list-disc list-inside text-sm">
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

                {/* Items */}
                <div className="space-y-4 mb-5 pb-5 border-b border-border">
                  {checkoutItems.map((item) => (
                    <div key={item.id} className="flex gap-4 py-2 border-b border-border/40 last:border-0">
                      <div className="w-16 h-16 bg-muted flex-shrink-0 rounded-lg overflow-hidden">
                        <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm font-display leading-tight line-clamp-2">{item.name}</h3>
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

                {/* Totals */}
                <div className="space-y-3 pb-5 border-b border-border text-sm">
                  <div className="flex justify-between py-1">
                    <span className="text-foreground/70">Subtotal</span>
                    <span className="font-price">{format(subtotal)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-foreground/70">Shipping</span>
                    <span className={shippingFree ? "text-green-600 font-semibold" : "text-foreground/70 text-xs"}>
                      {shippingFree ? "Free" : "Calculated at delivery"}
                    </span>
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
                  className="w-full bg-obsidian text-white py-4 uppercase tracking-widest text-sm font-bold rounded-full hover:bg-gold hover:text-obsidian transition-smooth flex justify-center items-center gap-2 disabled:opacity-50 active:scale-[0.98]"
                >
                  {loading ? (
                    <><Loader2 size={16} className="animate-spin" /> Processing…</>
                  ) : (
                    "Place Order"
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-foreground/50">
                  <ShieldCheck size={13} className="text-gold" />
                  Payments are secure and encrypted.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
