import { MapPin, Phone, Mail, Clock } from "lucide-react";

const CARDS = [
  { Icon: MapPin, title: "Visit Atelier", lines: ["No 2/239 Konnur High Road", "Chennai, Tamil Nadu - 600023"] },
  { Icon: Phone, title: "Call Us", lines: ["+91 98841 95244", "Mon – Sat · 10am – 7pm"] },
  { Icon: Mail, title: "Write to Us", lines: ["akenterprisesbus26@gmail.com", "+91 98841 95244"] },
  { Icon: Clock, title: "Showroom Hours", lines: ["Mon – Sat · 10:00 – 19:00", "Sunday by appointment"] },
];

export const Contact = () => (
  <section id="contact" className="py-16 md:py-24 lg:py-32 bg-background">
    <div className="container px-4">
      <div className="text-center max-w-xl mx-auto reveal">
        <span className="text-xs uppercase tracking-[0.4em] text-gold font-semibold">Contact</span>
        <h2 className="font-display text-4xl md:text-6xl mt-3 text-foreground font-semibold">Let's connect.</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-14">
        {CARDS.map(({ Icon, title, lines }, i) => (
          <div
            key={title}
            className="border border-border p-6 md:p-8 hover-lift bg-card reveal"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="w-12 h-12 grid place-items-center bg-obsidian text-gold">
              <Icon size={20} />
            </div>
            <h3 className="font-display text-lg md:text-xl mt-6 text-foreground font-semibold">{title}</h3>
            <div className="mt-2 text-sm text-foreground/90 space-y-1 font-medium">
              {lines.map((l) => <div key={l}>{l}</div>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Contact;