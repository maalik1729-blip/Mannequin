import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { Send, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useLenis, useReveal } from "@/hooks/useLenis";
import showroom from "@/assets/showroom.png";

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
      toast.success("Quote request submitted successfully.");
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      
      <div className="flex-1 pt-32 pb-16">
        <div className="container px-4 mx-auto max-w-5xl">
          <button onClick={() => navigate(-1)} className="inline-flex items-center text-sm uppercase tracking-widest text-foreground/70 hover:text-foreground transition-smooth mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.4em] text-gold font-semibold">Custom Orders</span>
              <h1 className="font-display text-4xl lg:text-5xl mt-4 mb-6 font-semibold uppercase tracking-wider text-foreground">Get a Quote</h1>
              <p className="text-foreground/80 leading-relaxed mb-8">
                Looking for bulk quantities, custom finishes, or bespoke displays for your retail space? Share your requirements with our team, and we'll craft a tailored proposal for your project.
              </p>
              
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-soft mb-8 lg:mb-0">
                <img src={showroom} alt="Showroom" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 shadow-soft relative overflow-hidden">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="text-gold w-8 h-8" />
                  </div>
                  <h3 className="font-display text-3xl mb-4">Request Received</h3>
                  <p className="text-foreground/80 mb-8">
                    Thank you for your interest. Our sales team is reviewing your requirements and will contact you with a customized quote within 24-48 hours.
                  </p>
                  <button 
                    onClick={() => navigate("/")}
                    className="bg-obsidian text-white px-8 py-3 uppercase tracking-widest text-xs font-bold rounded-full hover:bg-gold hover:text-obsidian transition-smooth"
                  >
                    Return Home
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-6">
                  <h3 className="font-display text-2xl border-b border-border pb-4">Your Details</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Field label="Name" required />
                    <Field label="Company Name" />
                    <div className="col-span-2 sm:col-span-1"><Field label="Email Address" type="email" required /></div>
                    <div className="col-span-2 sm:col-span-1"><Field label="Phone Number" type="tel" required /></div>
                  </div>

                  <h3 className="font-display text-2xl border-b border-border pb-4 pt-4">Project Requirements</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-foreground/80 font-medium">Interest Area</label>
                      <select className="mt-2 w-full bg-transparent border-b border-border py-2 text-sm text-foreground focus:border-gold outline-none transition-smooth">
                        <option>Full Store Fit-out</option>
                        <option>Bulk Mannequins</option>
                        <option>Wedding Mandaps</option>
                        <option>Custom Props & Decor</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-foreground/80 font-medium">Approximate Budget (Optional)</label>
                      <select className="mt-2 w-full bg-transparent border-b border-border py-2 text-sm text-foreground focus:border-gold outline-none transition-smooth">
                        <option>Below ₹50,000</option>
                        <option>₹50,000 - ₹2,00,000</option>
                        <option>₹2,00,000 - ₹5,00,000</option>
                        <option>Above ₹5,00,000</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-foreground/80 font-medium">Project Description</label>
                      <textarea rows={4} required className="mt-2 w-full bg-transparent border-b border-border py-2 text-sm text-foreground focus:border-gold outline-none transition-smooth resize-none" placeholder="Please describe your needs, quantities, and timeline..." />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gold text-obsidian py-4 uppercase tracking-[0.2em] text-sm font-bold rounded-full hover:bg-obsidian hover:text-white transition-smooth flex justify-center items-center gap-2 mt-4 disabled:opacity-70"
                  >
                    {loading ? "Sending..." : "Submit Request"} <Send size={16} />
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

const Field = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <label className="text-xs uppercase tracking-widest text-foreground/80 font-medium">{label}</label>
    <input
      {...props}
      className="mt-2 w-full bg-transparent border-b border-border py-2 text-sm text-foreground focus:border-gold outline-none transition-smooth placeholder:text-foreground/30"
    />
  </div>
);
