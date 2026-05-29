import { Send, Clock, Package, Calendar } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import mandap from "@/assets/mandap-pillars.png";

export const Enquiry = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Enquiry received — our team will reach out within 24 hours.");
    }, 800);
  };

  return (
    <section id="enquiry" className="relative py-16 md:py-24 lg:py-32 bg-background text-foreground transition-all duration-500 overflow-hidden">
      {/* Background Pillars image */}
      <img src={mandap} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-5 dark:opacity-15 transition-opacity duration-500" />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background transition-all duration-500" />
      
      <div className="container relative grid lg:grid-cols-2 gap-12 md:gap-16 px-4">
        <div className="reveal">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-gold/80" />
            <span className="text-xs uppercase tracking-widest text-gold/90 font-medium">Enquiry</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.95] text-foreground font-semibold transition-colors">
            Tell us what<br/>
            <em className="not-italic text-foreground/50">you're creating.</em>
          </h2>
          <p className="text-foreground/70 mt-7 max-w-md text-[15px] leading-relaxed transition-colors">
            Bulk orders, custom builds, wedding mandaps or studio pieces — share
            your vision and we'll respond with a tailored proposal.
          </p>
          <dl className="mt-8 md:mt-10 space-y-0 divide-y divide-foreground/15 max-w-sm transition-colors">
            {([
              [Clock, "Response time", "Within 24 hours"],
              [Package, "Minimum order", "1 piece (custom: 5+)"],
              [Calendar, "Lead time", "7 – 21 days"],
            ] as const).map(([Icon, k, v]) => (
              <div key={k} className="flex items-center justify-between py-4">
                <dt className="flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/60 font-medium transition-colors">
                  <Icon size={14} className="text-gold flex-shrink-0" />{k}
                </dt>
                <dd className="text-sm text-gold font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <form onSubmit={onSubmit} className="reveal bg-foreground/[0.03] border border-foreground/10 backdrop-blur p-6 md:p-8 lg:p-10 space-y-5 rounded-2xl transition-all duration-500">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Full Name" name="name" required />
            <Field label="Phone" name="phone" type="tel" required />
          </div>
          <Field label="Email" name="email" type="email" required />
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs uppercase tracking-widest text-foreground/60 font-medium block mb-1.5 transition-colors">Interested In</label>
              <select name="interest" className="w-full bg-foreground/[0.05] border border-foreground/10 rounded-lg px-4 py-3 text-sm text-foreground focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all duration-500 cursor-pointer">
                {["Torso Busts", "Full Body Mannequins", "Kids Range", "Decor Statues", "Wedding Mandap", "Custom Build"].map(o => (
                  <option key={o} className="bg-background text-foreground">{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-foreground/60 font-medium block mb-1.5 transition-colors">Quantity Required</label>
              <input name="quantity" type="number" min="1" placeholder="e.g. 5" className="w-full bg-foreground/[0.05] border border-foreground/10 rounded-lg px-4 py-3 text-sm text-foreground focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all duration-500 placeholder:text-foreground/30" />
            </div>
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-foreground/60 font-medium block mb-1.5 transition-colors">Message</label>
            <textarea name="message" rows={4} className="w-full bg-foreground/[0.05] border border-foreground/10 rounded-lg px-4 py-3 text-sm text-foreground focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all duration-500 resize-none placeholder:text-foreground/30" placeholder="Tell us about finish, timeline, or any custom requirements…" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-3 bg-gold text-obsidian px-7 py-4 text-sm uppercase tracking-widest font-bold rounded-full hover:bg-foreground hover:text-background transition-all duration-500 disabled:opacity-60 shadow-lg"
          >
            {loading ? "Sending…" : "Send Enquiry"} <Send size={14} />
          </button>
        </form>
      </div>
    </section>
  );
};

const Field = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <label className="text-xs uppercase tracking-widest text-foreground/60 font-medium block mb-1.5 transition-colors">{label}{props.required && <span className="text-red-400 ml-0.5">*</span>}</label>
    <input
      {...props}
      className="w-full bg-foreground/[0.05] border border-foreground/10 rounded-lg px-4 py-3 text-sm text-foreground focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all duration-500 placeholder:text-foreground/30"
    />
  </div>
);

export default Enquiry;