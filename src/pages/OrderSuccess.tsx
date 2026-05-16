import { Link } from "react-router-dom";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { CheckCircle2, Mail, Truck, Phone } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useLenis, useReveal } from "@/hooks/useLenis";

export default function OrderSuccess() {
  useLenis();
  useReveal();

  // Stable order id — generated once per mount, not on every render
  const orderNumber = useMemo(
    () => `ORD-${Math.floor(Math.random() * 900000) + 100000}`,
    []
  );
  const orderDate = useMemo(() => new Date().toLocaleDateString(), []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center pt-32 pb-16 px-4">
        <div className="max-w-lg w-full text-center reveal border border-border rounded-2xl p-8 md:p-10 shadow-soft bg-card">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="w-20 h-20 text-gold" />
          </div>
          <span className="text-xs uppercase tracking-widest text-gold font-semibold">Thank You</span>
          <h1 className="font-display text-4xl mt-3 mb-4 font-semibold text-foreground">Order Confirmed!</h1>

          <p className="text-foreground/80 text-sm mb-8">
            Your order has been placed successfully. A copy of these details has been emailed to you.
          </p>

          <div className="bg-muted/50 rounded-xl p-5 mb-8 text-sm text-left space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-foreground/60 uppercase tracking-widest text-xs">Order Number</span>
              <strong className="font-price">#{orderNumber}</strong>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-foreground/60 uppercase tracking-widest text-xs">Date</span>
              <strong>{orderDate}</strong>
            </div>
          </div>

          {/* What's next */}
          <div className="text-left mb-8">
            <h2 className="text-xs uppercase tracking-widest text-foreground/60 font-semibold mb-3">What happens next</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <Mail size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">Order confirmation email within the next few minutes.</span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">Our team will call to confirm shipping details within 24 hours.</span>
              </li>
              <li className="flex gap-3">
                <Truck size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">Dispatch in 7&ndash;14 business days; tracking link shared once shipped.</span>
              </li>
            </ul>
          </div>

          <Link
            to="/"
            className="w-full inline-block bg-obsidian text-white py-4 uppercase tracking-widest text-sm font-bold rounded-full hover:bg-gold hover:text-obsidian transition-smooth shadow-lg"
          >
            Continue Shopping
          </Link>
          <p className="mt-4 text-xs text-foreground/50">
            Questions? Call <a href="tel:+919884195244" className="text-gold hover:underline">+91 98841 95244</a>
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
