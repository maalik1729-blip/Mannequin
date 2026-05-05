import { Send } from "lucide-react";
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
    <section id="enquiry" className="relative py-16 md:py-24 lg:py-32 bg-obsidian text-ivory overflow-hidden">
      <img src={mandap} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-15" />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/95 to-obsidian" />
      <div className="container relative grid lg:grid-cols-2 gap-12 md:gap-16 px-4">
        <div className="reveal">
          <span className="text-xs uppercase tracking-[0.4em] text-gold font-semibold">Enquiry</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl mt-3 leading-tight text-white font-semibold">
            Tell us what you're<br/> creating.
          </h2>
          <p className="text-white/90 mt-6 max-w-md text-sm md:text-base leading-relaxed font-medium">
            Bulk orders, custom builds, wedding mandaps or studio pieces — share
            your vision and we'll respond with a tailored proposal.
          </p>
          <dl className="mt-8 md:mt-10 space-y-4 md:space-y-5">
            {[
              ["Response time", "Within 24 hours"],
              ["Minimum order", "1 piece (custom: 5+)"],
              ["Lead time", "7 – 21 days"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-white/20 pb-3 max-w-sm text-sm md:text-base">
                <dt className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] text-white/70 font-medium">{k}</dt>
                <dd className="text-xs md:text-sm text-gold font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <form onSubmit={onSubmit} className="reveal bg-ivory/[0.03] border border-ivory/10 backdrop-blur p-6 md:p-8 lg:p-10 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Full Name" name="name" required />
            <Field label="Phone" name="phone" type="tel" required />
          </div>
          <Field label="Email" name="email" type="email" required />
          <div>
            <label className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-medium">Interested In</label>
            <select name="interest" className="mt-2 w-full bg-transparent border-b border-white/30 py-3 text-sm text-white focus:border-gold outline-none transition-smooth">
              {["Torso Busts", "Full Body Mannequins", "Kids Range", "Decor Statues", "Wedding Mandap", "Custom Build"].map(o => (
                <option key={o} className="bg-obsidian">{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-medium">Message</label>
            <textarea name="message" rows={4} className="mt-2 w-full bg-transparent border-b border-white/30 py-3 text-sm text-white focus:border-gold outline-none transition-smooth resize-none" placeholder="Tell us about quantity, finish, timeline…" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-3 bg-gold text-obsidian px-6 md:px-7 py-3 md:py-4 text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] font-bold rounded-full hover:bg-white transition-smooth disabled:opacity-60 shadow-lg"
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
    <label className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-medium">{label}</label>
    <input
      {...props}
      className="mt-2 w-full bg-transparent border-b border-white/30 py-3 text-sm text-white focus:border-gold outline-none transition-smooth"
    />
  </div>
);

export default Enquiry;