import { MapPin, Phone, Mail, Clock } from "lucide-react";

const CARDS = [
  { Icon: MapPin, title: "Visit Atelier", lines: ["No 2/239 Konnur High Road", "Chennai, Tamil Nadu - 600023"] },
  { Icon: Phone, title: "Call Us", lines: ["+91 98841 95244", "Mon – Sat · 10am – 7pm"] },
  { Icon: Mail, title: "Write to Us", lines: ["akenterprisesbus26@gmail.com", "+91 98841 95244"] },
  { Icon: Clock, title: "Showroom Hours", lines: ["Mon – Sat · 10:00 – 19:00", "Sunday by appointment"] },
];

export const Contact = () => (
  <section id="contact" className="py-20 md:py-28 lg:py-32 bg-background">
    <div className="container px-4">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 reveal">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-foreground/40" />
            <span className="text-xs uppercase tracking-widest text-foreground/60 font-medium">Contact</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-foreground font-semibold leading-[0.95]">
            Let's <em className="not-italic text-foreground/40">connect.</em>
          </h2>
        </div>
        <p className="text-foreground/60 max-w-xs md:text-right text-[15px] leading-relaxed">
          Visit the atelier, call us, or write — we respond to every enquiry within a day.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-foreground/10">
        {CARDS.map(({ Icon, title, lines }, i) => (
          <div
            key={title}
            className="border-b border-foreground/10 lg:border-b-0 lg:border-r last:border-r-0 [&:nth-child(2)]:lg:border-r p-7 md:p-8 reveal"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start justify-between mb-8">
              <Icon size={20} strokeWidth={1.5} className="text-foreground/70" />
              <span className="text-[11px] tracking-widest text-foreground/30 font-medium font-price">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="font-display text-xl text-foreground font-medium">{title}</h3>
            <div className="mt-2 text-sm text-foreground/60 space-y-1 leading-relaxed">
              {lines.map((l) => <div key={l}>{l}</div>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Contact;