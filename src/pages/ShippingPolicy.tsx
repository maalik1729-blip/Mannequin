import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLenis, useReveal } from "@/hooks/useLenis";

export default function ShippingPolicy() {
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
            <h1 className="font-display text-4xl md:text-5xl mt-4 font-semibold">Shipping Policy</h1>
            <p className="text-xl font-display text-foreground/70 mt-3">Quality Delivered with Care</p>
          </div>
          
          <div className="space-y-8 text-foreground/80 leading-relaxed text-sm md:text-base">
            <p>
              At A K Enterprises, we are committed to ensuring that your premium mannequins, torsos, and display decor reach you in perfect condition. This Shipping Policy explains how we process orders, handle packaging, and manage deliveries for both retail and wholesale customers.
            </p>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 border-b border-border pb-2">Order Processing Time</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Orders are processed within 2–4 business days of payment confirmation.</li>
                <li>Orders placed on Sundays or public holidays will be processed on the next working day.</li>
                <li>Bulk/wholesale orders or custom builds (e.g., Wedding Mandaps) may require longer preparation time depending on quantity and product complexity. Customers will be informed in advance.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 border-b border-border pb-2">Shipping Destinations & Delivery Timelines</h2>
              <h3 className="font-semibold mt-4 mb-2">Domestic Shipping (India)</h3>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>Metro Cities:</strong> 3–6 business days after dispatch</li>
                <li><strong>Non-Metro Cities & Semi-Urban Areas:</strong> 5–10 business days after dispatch</li>
                <li><strong>Remote/Rural Areas:</strong> 7–12 business days after dispatch</li>
              </ul>
              
              <h3 className="font-semibold mt-4 mb-2">International Shipping</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>International delivery may be available for wholesale/B2B orders.</li>
                <li>Timelines depend on the destination country, customs clearance, and shipping partner schedules.</li>
                <li>Customers will be informed of estimated timelines during order confirmation.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 border-b border-border pb-2">Shipping Charges</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Charges are calculated based on order weight, packaging type, and delivery location.</li>
                <li>Shipping costs will be clearly communicated during the quotation or checkout process before payment.</li>
                <li>Free shipping offers may apply during promotions or for specific bulk orders above a certain value.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 border-b border-border pb-2">Packaging & Handling</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Products are packed with heavy-duty padding and secure enclosures to prevent damage during transit.</li>
                <li>Fragile items (like fiberglass decor or fine finish mannequins) are additionally secured.</li>
                <li>Bulk/wholesale orders are carefully palletized or crated for safe long-distance transport.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 border-b border-border pb-2">Tracking Your Order</h2>
              <p className="mb-2">Once dispatched, customers will receive:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>A tracking ID via SMS/email</li>
                <li>A real-time tracking link to monitor shipment progress</li>
              </ul>
              <p>Please allow 24–48 hours for tracking details to update after dispatch.</p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 border-b border-border pb-2">Delays & Exceptions</h2>
              <p className="mb-2">While we strive for timely delivery, certain factors may cause delays, including:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Courier or logistics partner disruptions</li>
                <li>Extreme weather conditions</li>
                <li>Regional holidays or strikes</li>
                <li>Customs delays for international orders</li>
              </ul>
              <p>In such cases, our support team will provide updates and assistance.</p>
            </section>

            <section className="bg-muted/30 p-6 border border-border mt-10">
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">Need Help?</h2>
              <p className="mb-4">For shipping-related questions or support, please contact:</p>
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
