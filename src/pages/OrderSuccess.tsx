import { Link } from "react-router-dom";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useLenis, useReveal } from "@/hooks/useLenis";

export default function OrderSuccess() {
  useLenis();
  useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center pt-32 pb-16 px-4">
        <div className="max-w-md w-full text-center reveal border border-border rounded-2xl p-8 md:p-12 shadow-soft bg-card">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="w-20 h-20 text-gold" />
          </div>
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">Thank You</span>
          <h1 className="font-display text-4xl mt-3 mb-4 font-semibold text-foreground">Order Confirmed!</h1>
          
          <p className="text-foreground/80 text-sm mb-8">
            Your order has been placed successfully. We'll send you an email with the order details and tracking information once it ships.
          </p>

          <div className="bg-muted/50 rounded-xl p-4 mb-8 text-sm text-left">
            <p className="mb-1"><span className="text-foreground/60 uppercase tracking-widest text-[10px]">Order Number:</span> <strong className="float-right">#ORD-{Math.floor(Math.random() * 900000) + 100000}</strong></p>
            <p><span className="text-foreground/60 uppercase tracking-widest text-[10px]">Date:</span> <strong className="float-right">{new Date().toLocaleDateString()}</strong></p>
          </div>

          <Link
            to="/"
            className="w-full inline-block bg-obsidian text-white py-4 uppercase tracking-[0.2em] text-sm font-bold rounded-full hover:bg-gold hover:text-obsidian transition-smooth shadow-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
