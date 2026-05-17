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
        <img src={showroom} alt="A K Enterprises showroom displaying gold and white full-body mannequins in Chennai" loading="lazy" width={800} height={600} className="w-full aspect-[4/5] object-cover" />
        <img src={torso} alt="Pair of sleek matte-black torso bust mannequins by A K Enterprises" loading="lazy" width={400} height={500} className="hidden md:block absolute -bottom-10 -right-6 w-1/2 aspect-[4/5] object-cover border-8 border-background shadow-luxe" />
      </div>
      <div className="reveal">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-foreground/40" />
          <span className="text-xs uppercase tracking-widest text-foreground/60 font-medium">About · A K Enterprises</span>
        </div>
        <h2 className="font-display text-5xl md:text-6xl leading-[0.95] text-foreground font-semibold">
          A quiet obsession<br/>
          <em className="not-italic text-foreground/40">with form &amp; finish.</em>
        </h2>
        <p className="text-foreground/70 mt-7 leading-relaxed text-[15px] max-w-md">
          For six years, A K Enterprises has supplied India's most
          discerning boutiques, designers and event houses with display forms
          that disappear into the garment — yet command the room. We blend
          traditional craft with contemporary silhouettes across 40+ cities.
        </p>
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-8 mt-12">
          {VALUES.map(({ Icon, title, text }) => (
            <div key={title} className="flex gap-4">
              <div className="shrink-0 w-10 h-10 grid place-items-center border border-foreground/15 text-foreground/70">
                <Icon size={18} strokeWidth={1.5} />
              </div>
              <div>
                <div className="font-display text-lg text-foreground font-medium">{title}</div>
                <p className="text-sm text-foreground/60 mt-1 leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;