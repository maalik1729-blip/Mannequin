import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { PRODUCTS } from "@/data/products";
import { ArrowLeft, CreditCard, Banknote, QrCode } from "lucide-react";
import { useLenis, useReveal } from "@/hooks/useLenis";
import { useCurrency } from "@/context/CurrencyContext";
import CurrencyToggle from "@/components/site/CurrencyToggle";

export default function Checkout() {
  useLenis();
  useReveal();
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.id === id);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cards");
  const { format } = useCurrency();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <main className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-8 pt-32">
          <h1 className="text-3xl font-display mb-4">Product not found for checkout</h1>
          <button onClick={() => navigate("/")} className="text-gold uppercase tracking-wider text-sm border-b border-gold pb-1">
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
      navigate("/order-success");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      
      <div className="flex-1 pt-32 pb-16">
        <div className="container px-4 mx-auto max-w-6xl">
          <button onClick={() => navigate(-1)} className="inline-flex items-center text-sm uppercase tracking-widest text-foreground/70 hover:text-foreground transition-smooth mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>

          <h1 className="font-display text-4xl mb-10 font-semibold uppercase tracking-wider">Checkout</h1>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            <div className="lg:col-span-7">
              <form id="checkout-form" onSubmit={onSubmit} className="space-y-10">
                <section>
                  <h2 className="text-xl font-display font-semibold mb-6 pb-2 border-b border-border">Shipping Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="First Name" required pattern="^[A-Za-z\s\-\.]+$" title="Only letters, spaces, hyphens, and periods are allowed" />
                    <Field label="Last Name" required pattern="^[A-Za-z\s\-\.]+$" title="Only letters, spaces, hyphens, and periods are allowed" />
                    <div className="col-span-2"><Field label="Email Address" type="email" required pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$" title="Please enter a valid email address (e.g., yourname@example.com)" /></div>
                    <div className="col-span-2"><Field label="Phone Number" type="tel" required pattern="^[0-9]{10}$" title="Please enter a valid 10-digit phone number" /></div>
                    <div className="col-span-2"><Field label="Street Address" required /></div>
                    <Field label="City" required pattern="^[A-Za-z\s\-\.]+$" title="Please enter a valid city name" />
                    <Field label="State / Province" required pattern="^[A-Za-z\s\-\.]+$" title="Please enter a valid state or province" />
                    <Field label="Postal / Zip Code" required pattern="^[A-Za-z0-9\s\-]{3,10}$" title="Please enter a valid postal or zip code" />
                    <Field label="Country" required pattern="^[A-Za-z\s\-\.]+$" title="Please enter a valid country name" />
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-display font-semibold mb-6 pb-2 border-b border-border">Payment Method</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <PaymentOption 
                      id="cards" 
                      title="Credit/Debit Card" 
                      icon={<CreditCard className="w-6 h-6 mb-2" />} 
                      selected={paymentMethod === "cards"} 
                      onClick={() => setPaymentMethod("cards")} 
                    />
                    <PaymentOption 
                      id="upi" 
                      title="UPI" 
                      icon={<QrCode className="w-6 h-6 mb-2" />} 
                      selected={paymentMethod === "upi"} 
                      onClick={() => setPaymentMethod("upi")} 
                    />
                    <PaymentOption 
                      id="cod" 
                      title="Cash on Delivery" 
                      icon={<Banknote className="w-6 h-6 mb-2" />} 
                      selected={paymentMethod === "cod"} 
                      onClick={() => setPaymentMethod("cod")} 
                    />
                  </div>

                  {paymentMethod === "cards" && (
                    <div className="mt-6 p-4 border border-border rounded-xl bg-muted/30 space-y-4">
                      <Field label="Card Number" placeholder="0000 0000 0000 0000" />
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Expiry Date (MM/YY)" placeholder="MM/YY" />
                        <Field label="CVV" placeholder="123" />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div className="mt-6 p-4 border border-border rounded-xl bg-muted/30">
                      <Field label="UPI ID" placeholder="username@bank" />
                      <p className="text-xs text-foreground/60 mt-2">Or scan the QR code that will be displayed on the next step.</p>
                    </div>
                  )}
                </section>
              </form>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-muted/30 border border-border rounded-2xl p-6 lg:p-8 sticky top-32">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-display font-semibold">Order Summary</h2>
                  <CurrencyToggle />
                </div>
                
                <div className="flex gap-4 mb-6 pb-6 border-b border-border">
                  <div className="w-24 h-24 bg-muted flex-shrink-0 rounded-lg overflow-hidden">
                    <img src={product.img} alt={product.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg font-display">{product.name}</h3>
                    <p className="text-xs text-foreground/60 uppercase tracking-widest mt-1 mb-2">{product.tag}</p>
                    <p className="font-semibold font-price">{format(product.priceINR)}{product.priceSuffix ? ` ${product.priceSuffix}` : ""}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-border text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Subtotal</span>
                    <span className="font-price">{format(product.priceINR)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Shipping</span>
                    <span>Calculated at next step</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Taxes</span>
                    <span>Included</span>
                  </div>
                </div>

                <div className="flex justify-between font-display text-xl font-semibold mb-8">
                  <span>Total</span>
                  <span className="font-price">{format(product.priceINR)}</span>
                </div>

                <button
                  type="submit"
                  form="checkout-form"
                  disabled={loading}
                  className="w-full bg-obsidian text-white py-4 uppercase tracking-[0.2em] text-sm font-bold rounded-full hover:bg-gold hover:text-obsidian transition-smooth flex justify-center items-center gap-2 disabled:opacity-70"
                >
                  {loading ? "Processing..." : "Place Order"}
                </button>
                <div className="mt-4 text-center">
                  <p className="text-xs text-foreground/50">Payments are secure and encrypted.</p>
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

const Field = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <label className="text-xs uppercase tracking-widest text-foreground/80 font-medium">{label}</label>
    <input
      {...props}
      className="mt-2 w-full bg-transparent border-b border-border py-2 text-sm text-foreground focus:border-gold outline-none transition-smooth placeholder:text-foreground/30"
    />
  </div>
);

const PaymentOption = ({ title, icon, selected, onClick }: any) => (
  <div 
    onClick={onClick}
    className={`border rounded-xl p-4 cursor-pointer flex flex-col items-center text-center transition-smooth ${
      selected ? "border-gold bg-gold/5" : "border-border hover:border-foreground/40"
    }`}
  >
    {icon}
    <span className="text-sm font-medium">{title}</span>
  </div>
);
