import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLenis, useReveal } from "@/hooks/useLenis";

export default function TermsConditions() {
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
            <h1 className="font-display text-4xl md:text-5xl mt-4 font-semibold">Terms & Conditions</h1>
            <p className="text-xl font-display text-foreground/70 mt-3">Please read these terms carefully before using our services</p>
          </div>
          
          <div className="space-y-8 text-foreground/80 leading-relaxed text-sm md:text-base">
            <p>
              Welcome to A K Enterprises. By accessing our website, making a purchase, or engaging with our services, you agree to comply with and be bound by the following Terms & Conditions. These terms govern all orders, sales, and interactions with A K Enterprises. If you do not agree with these terms, we request you to discontinue using our services.
            </p>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 border-b border-border pb-2">1. General Use of Website & Services</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>By shopping with us, you confirm that you are at least 18 years old, or using our services under the supervision of a parent/guardian.</li>
                <li>You agree to provide accurate and complete details when placing orders.</li>
                <li>Any misuse, fraudulent activity, or violation of these terms may result in suspension of service.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 border-b border-border pb-2">2. Products & Pricing</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>We specialize in premium mannequins, torsos, and display decor.</li>
                <li>All product descriptions are provided as accurately as possible, but minor variations in color, finish, or texture may occur since many pieces are hand-finished.</li>
                <li>Prices are displayed in Indian Rupees (INR ₹), Euros (EUR €), and US Dollars (USD $). All conversions are approximate. The base currency is INR and may change due to material availability, market fluctuations, or business policy.</li>
                <li>We reserve the right to correct any errors in product listings, descriptions, or pricing, and may cancel affected orders with refunds where applicable.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 border-b border-border pb-2">3. Orders & Payments</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Orders are confirmed only after successful payment.</li>
                <li>We accept UPI, debit/credit cards, net banking, and wallets via secure, PCI-compliant gateways.</li>
                <li>A K Enterprises does not store your payment details.</li>
                <li>In the event of duplicate charges or transaction errors, customers should contact our support team immediately.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 border-b border-border pb-2">4. Shipping & Delivery</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Orders are shipped within India via trusted logistics partners.</li>
                <li>Delivery timelines vary based on location and order size and will be shared at checkout or via quote.</li>
                <li>Tracking details are provided once the order is dispatched.</li>
                <li>We are not liable for logistics delays, force majeure events, or customer unavailability during delivery.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 border-b border-border pb-2">5. Cancellations & Returns</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Orders may be cancelled within 2 hours of purchase, provided they have not been packed or shipped.</li>
                <li>Returns are accepted only in cases of damaged or tampered products on delivery, wrong items shipped, or verified quality concerns.</li>
                <li>For details, please refer to our Cancellation & Refund Policy.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 border-b border-border pb-2">6. Customer Responsibilities</h2>
              <p className="mb-4">By engaging with us, you agree not to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Provide false or incomplete order/delivery details.</li>
                <li>Resell our products without prior written approval.</li>
                <li>Misuse our brand name or content.</li>
                <li>Raise fraudulent claims or chargebacks.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 border-b border-border pb-2">7. Intellectual Property</h2>
              <p>
                All product images, content, designs, and branding are the intellectual property of A K Enterprises. Unauthorized use, reproduction, or distribution is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 border-b border-border pb-2">8. Limitation of Liability</h2>
              <p className="mb-4">A K Enterprises shall not be liable for:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Minor visual variations in finish or appearance of products.</li>
                <li>Delays caused by logistics providers.</li>
                <li>Indirect or incidental damages arising from product use beyond its intended purpose.</li>
              </ul>
              <p>Our liability is limited strictly to the value of the product purchased.</p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 border-b border-border pb-2">9. Governing Law & Jurisdiction</h2>
              <p>
                These Terms & Conditions are governed by the laws of India. Any disputes shall fall under the jurisdiction of the courts in Chennai, Tamil Nadu.
              </p>
            </section>

            <section className="bg-muted/30 p-6 border border-border mt-10">
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">Contact Us</h2>
              <p className="mb-4">For assistance or queries, please contact:</p>
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
