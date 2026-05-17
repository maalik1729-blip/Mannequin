import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { Send, ArrowLeft, ChevronRight, Clock, Package, Calendar } from "lucide-react";
import { toast } from "sonner";
import { useLenis, useReveal } from "@/hooks/useLenis";
import showroom from "@/assets/showroom.png";

const Field = ({
  label,
  required,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <label className="field-label">
      {label}
      {required && <span className="text-red-400 ml-0.5" aria-hidden="true">*</span>}
    </label>
    <input
      {...props}
      required={required}
      aria-required={required}
      className="field-input"
    />
  </div>
);

export default function QuoteRequest() {
  useLenis();
  useReveal();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Quote request submitted — our team will respond within 24 hours.");
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <div className="flex-1 pt-32 pb-16">
        <div className="container px-4 mx-auto max-w-5xl">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs uppercase tracking-wider text-foreground/50 font-medium mb-6">
            <Link to="/" className="hover:text-foreground transition-smooth">Home</Link>
            <ChevronRight size={12} />
            <span className="text-foreground/80">Request a Quote</span>
          </nav>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm uppercase tracking-widest text-foreground/70 hover:text-foreground transition-smooth mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left — info panel */}
            <div>
              <span className="text-xs uppercase tracking-[0.4em] text-gold font-semibold">Custom Orders</span>
              <h1 className="font-display text-4xl lg:text-5xl mt-4 mb-6 font-semibold text-foreground">
                Get a Quote
              </h1>
              <p className="text-foreground/70 leading-relaxed mb-8 text-[15px]">
                Looking for bulk quantities, custom finishes, or bespoke displays for your retail space or event? Share your requirements and we'll craft a tailored proposal within 24 hours.
              </p>

              {/* Key info */}
              <dl className="space-y-0 divide-y divide-border mb-8 max-w-sm">
                {([
                  [Clock, "Response Time", "Within 24 hours"],
                  [Package, "Minimum Order", "1 piece (custom: 5+)"],
                  [Calendar, "Lead Time", "7 – 21 business days"],
                ] as const).map(([Icon, k, v]) => (
                  <div key={k} className="flex items-center justify-between py-4">
                    <dt className="flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/60 font-medium">
                      <Icon size={14} className="text-gold flex-shrink-0" />{k}
                    </dt>
                    <dd className="text-sm text-gold font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-soft hidden lg:block">
                <img
                  src={showroom}
                  alt="A K Enterprises showroom — premium display solutions in Chennai"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right — form */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-soft">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="text-gold w-8 h-8" />
                  </div>
                  <h2 className="font-display text-3xl mb-3">Request Received</h2>
                  <p className="text-foreground/70 mb-8 text-[15px] leading-relaxed">
                    Thank you for your interest. Our sales team will contact you with a customised quote within 24–48 hours.
                  </p>
                  <button
                    onClick={() => navigate("/")}
                    className="btn-secondary px-8 py-3 text-xs"
                  >
                    Return Home
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-6">
                  <h2 className="font-display text-2xl border-b border-border pb-4">Your Details</h2>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Full Name" name="name" required autoComplete="name" />
                    <Field label="Company Name" name="company" autoComplete="organization" />
                    <Field label="Email Address" name="email" type="email" required autoComplete="email" />
                    <Field label="Phone Number" name="phone" type="tel" required autoComplete="tel" />
                  </div>

                  <h2 className="font-display text-2xl border-b border-border pb-4 pt-2">Project Requirements</h2>

                  <div className="space-y-5">
                    <div>
                      <label className="field-label" htmlFor="interest">Interest Area</label>
                      <select
                        id="interest"
                        name="interest"
                        className="field-input"
                      >
                        <option>Full Store Fit-out</option>
                        <option>Bulk Mannequins</option>
                        <option>Wedding Mandaps</option>
                        <option>Decor Statues</option>
                        <option>Custom Props &amp; Decor</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="field-label" htmlFor="qty">Quantity Required</label>
                      <input
                        id="qty"
                        name="quantity"
                        type="number"
                        min="1"
                        placeholder="e.g. 10"
                        className="field-input"
                      />
                    </div>

                    <div>
                      <label className="field-label" htmlFor="budget">Approximate Budget (Optional)</label>
                      <select id="budget" name="budget" className="field-input">
                        <option>Below ₹50,000</option>
                        <option>₹50,000 – ₹2,00,000</option>
                        <option>₹2,00,000 – ₹5,00,000</option>
                        <option>₹5,00,000 – ₹15,00,000</option>
                        <option>Above ₹15,00,000</option>
                      </select>
                    </div>

                    <div>
                      <label className="field-label" htmlFor="message">Project Description <span aria-hidden="true" className="text-red-400">*</span></label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        placeholder="Describe your needs, quantities, finish preferences, and timeline…"
                        className="field-input resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary py-4 text-sm disabled:opacity-70 mt-2"
                  >
                    {loading ? "Sending…" : "Submit Request"} <Send size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
