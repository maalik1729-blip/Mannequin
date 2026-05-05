import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLenis, useReveal } from "@/hooks/useLenis";

export default function CancellationRefund() {
  useLenis();
  useReveal();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <div className="flex-1 pt-32 pb-24">
        <div className="container px-4 max-w-4xl reveal">
          <button onClick={() => navigate(-1)} className="inline-flex items-center text-sm uppercase tracking-widest text-foreground/70 hover:text-foreground transition-smooth mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          
          <div className="mb-10">
            <span className="text-xs uppercase tracking-[0.4em] text-gold font-semibold">Policies</span>
            <h1 className="font-display text-4xl md:text-5xl mt-4 font-semibold">Cancellation & Refund Policy</h1>
            <p className="text-xl font-display text-foreground/70 mt-3">Simple, Fair & Transparent</p>
          </div>
          
          <div className="space-y-8 text-foreground/80 leading-relaxed text-sm md:text-base">
            <p>
              At A K Enterprises, we take pride in providing high-quality mannequins, torsos, and display decor sourced and crafted with care. While we strive to ensure that every order reaches you in perfect condition, we understand that cancellations or issues may occasionally arise. This policy outlines how we handle cancellations, returns, and refunds.
            </p>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 border-b border-border pb-2">Order Cancellations</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Cancellation Window:</strong> Orders may be cancelled within 2 hours of purchase, provided they have not yet been packed or dispatched.</li>
                <li>Once an order is processed or handed over to the logistics partner, cancellations are no longer possible due to the size and nature of our display products.</li>
                <li>Customers must share their Order ID when requesting cancellation.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 border-b border-border pb-2">Returns & Replacements</h2>
              <p className="mb-4">Returns are accepted only in the following cases:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Products are damaged or tampered during delivery.</li>
                <li>The wrong product was delivered.</li>
                <li>There is a verified quality or manufacturing defect.</li>
              </ul>
              <p className="mb-2 font-semibold">Conditions:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Return requests must be raised within 48 hours of delivery.</li>
                <li>The product must remain unused and in its original packaging.</li>
                <li>Customers must share clear photos/videos of the issue for verification.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 border-b border-border pb-2">Non-Returnable Items</h2>
              <p className="mb-4">For reasons of product integrity and logistics, we cannot accept returns for:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Products damaged due to improper assembly or storage after delivery.</li>
                <li>Items returned without authorization.</li>
                <li>Bulk/wholesale orders or custom-built mandaps, unless a verified manufacturing defect is confirmed.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 border-b border-border pb-2">Refunds</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Once a claim is verified and approved, refunds are initiated within 3–5 business days.</li>
                <li>Refunds are processed via the original payment method (UPI, card, bank transfer, etc.).</li>
                <li>Depending on the payment provider, refunds may take 5–10 business days to reflect in your account.</li>
                <li>Customers may also choose store credit or product replacement instead of a refund.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 border-b border-border pb-2">Exceptions</h2>
              <p className="mb-4">Refunds and cancellations will not apply in cases where:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Delivery is delayed due to courier or logistics issues beyond our control.</li>
                <li>Incorrect or incomplete delivery details were provided by the customer.</li>
                <li>Minor variations in finish, color, or texture occur (as many pieces are hand-finished).</li>
              </ul>
            </section>

            <section className="bg-muted/30 p-6 border border-border mt-10">
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">Need Help?</h2>
              <p className="mb-4">For cancellation or refund support, please contact:</p>
              <address className="not-italic space-y-2">
                <p><strong>A K Enterprises</strong></p>
                <p>📍 No 2/239 Konnur High Road, Chennai, Tamil Nadu - 600023</p>
                <p>📞 Phone: +91 98841 95244</p>
                <p>📧 Email: akenterprisesbus26@gmail.com</p>
              </address>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
