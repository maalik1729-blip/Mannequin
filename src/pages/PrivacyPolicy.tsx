import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLenis, useReveal } from "@/hooks/useLenis";

export default function PrivacyPolicy() {
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
            <h1 className="font-display text-4xl md:text-5xl mt-4 font-semibold">Privacy Policy</h1>
            <p className="text-xl font-display text-foreground/70 mt-3">Your Privacy is Our Priority</p>
          </div>
          
          <div className="space-y-8 text-foreground/80 leading-relaxed text-sm md:text-base">
            <p>
              At A K Enterprises, we value the trust you place in us when choosing our premium mannequins, torsos, and display decor. Protecting your personal information is as important to us as ensuring the quality of the products we deliver. This Privacy Policy explains what information we collect, how we use it, how we safeguard it, and your rights when engaging with our business—whether in-store, wholesale, or online.
            </p>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 border-b border-border pb-2">Information We Collect</h2>
              <p className="mb-4">When you interact with us, we may collect:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Full Name</li>
                <li>Email Address & Phone Number</li>
                <li>Billing & Shipping Address</li>
                <li>Order History & Purchase Preferences</li>
                <li>Payment Details (via secure third-party gateways; we do not store card details)</li>
                <li>Business/Wholesale Information (for B2B clients)</li>
                <li>Device & Browser Data (for website use and analytics)</li>
                <li>Cookies & Tracking Data (for performance improvement)</li>
              </ul>
              <p className="mt-4">We collect only the information necessary to provide you with safe, reliable, and efficient service.</p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 border-b border-border pb-2">Why We Collect Your Information</h2>
              <p className="mb-4">We use your data solely for legitimate business purposes, including:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Processing and fulfilling orders</li>
                <li>Managing deliveries and providing shipment updates</li>
                <li>Offering customer service and support</li>
                <li>Sending optional promotional updates (only if you opt in)</li>
                <li>Improving our product offerings and customer experience</li>
                <li>Wholesale/B2B account management</li>
                <li>Meeting legal, regulatory, and tax compliance requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 border-b border-border pb-2">How We Protect Your Information</h2>
              <p className="mb-4">We implement strict measures to ensure your data is secure and confidential:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>SSL Encryption for all online interactions</li>
                <li>Secure Payment Processing via PCI-compliant gateways</li>
                <li>Firewall & Access Controls on servers and systems</li>
                <li>Restricted Staff Access to sensitive data</li>
                <li>Regular Reviews of security and privacy practices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 border-b border-border pb-2">Your Rights & Choices</h2>
              <p className="mb-4">As our valued customer, you have the right to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Access the personal data we hold about you</li>
                <li>Request corrections or updates to your information</li>
                <li>Ask for deletion of your data (subject to legal requirements)</li>
                <li>Withdraw consent from promotional communication at any time</li>
                <li>Raise concerns about data misuse or handling</li>
              </ul>
              <p className="mt-4">We aim to process all verified requests within 30 days.</p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 border-b border-border pb-2">Third-Party Sharing</h2>
              <p className="mb-4">We do not sell or rent your personal information. Data may be shared only with:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Logistics partners (for delivery of orders)</li>
                <li>Payment processors (for secure transactions)</li>
                <li>Government or regulatory authorities (when legally required)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 border-b border-border pb-2">Policy Updates</h2>
              <p>
                This Privacy Policy may be updated periodically to reflect changes in law, technology, or business practices. Updates will always be posted on our website with a revised "Last Updated" date.
              </p>
            </section>

            <section className="bg-muted/30 p-6 border border-border mt-10">
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">Contact Us</h2>
              <p className="mb-4">For questions, privacy requests, or concerns, please contact:</p>
              <address className="not-italic space-y-2">
                <p><strong>A K Enterprises</strong></p>
                <p>📍 No 2/239 Konnur High Road, Chennai, Tamil Nadu - 600023</p>
                <p>📞 Phone: +91 98841 95244</p>
                <p>📧 Email: akenterprisesbus26@gmail.com</p>
              </address>
              <p className="mt-6 text-xs text-foreground/50">Last Updated: May 2026<br/>© {new Date().getFullYear()} A K Enterprises. All Rights Reserved.</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
