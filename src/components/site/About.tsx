import showroom from "@/assets/showroom.png";
import torso from "@/assets/torso-black-pair.png";
import { Sparkles, Hammer, Truck, ShieldCheck } from "lucide-react";

const VALUES = [
  { Icon: Hammer, title: "Hand-Crafted", text: "Every form is sculpted, padded and finished by master artisans." },
  { Icon: Sparkles, title: "Boutique Grade", text: "Materials and finishes engineered for premium retail spaces." },
  { Icon: Truck, title: "Pan-India Delivery", text: "Safely crated and shipped to 40+ cities across the country." },
  { Icon: ShieldCheck, title: "1-Year Warranty", text: "Quality assured with comprehensive after-sales support." },
];

export const About = () => (
  <section id="about" className="py-16 md:py-24 lg:py-32 bg-background">
    <div className="container grid lg:grid-cols-2 gap-12 md:gap-16 items-center px-4">
      <div className="relative reveal">
        <img src={showroom} alt="Showroom" loading="lazy" width={800} height={600} className="w-full aspect-[4/5] object-cover" />
        <img src={torso} alt="Torso" loading="lazy" width={400} height={500} className="hidden md:block absolute -bottom-10 -right-6 w-1/2 aspect-[4/5] object-cover border-8 border-background shadow-luxe" />
      </div>
      <div className="reveal">
        <span className="text-xs uppercase tracking-[0.4em] text-gold font-semibold">About A K Enterprises</span>
        <h2 className="font-display text-4xl md:text-6xl mt-3 leading-tight text-foreground font-semibold">
          A quiet obsession<br/> with form & finish.
        </h2>
        <p className="text-foreground/90 mt-6 leading-relaxed font-medium">
          For over a decade, A K Enterprises has supplied India's most
          discerning boutiques, designers and event houses with display forms
          that disappear into the garment — yet command the room. We blend
          traditional craft with contemporary silhouettes.
        </p>
        <div className="grid sm:grid-cols-2 gap-6 mt-10">
          {VALUES.map(({ Icon, title, text }) => (
            <div key={title} className="flex gap-4">
              <div className="shrink-0 w-11 h-11 grid place-items-center bg-secondary text-gold">
                <Icon size={20} />
              </div>
              <div>
                <div className="font-display text-lg text-foreground font-semibold">{title}</div>
                <p className="text-sm text-foreground/80 mt-1">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;