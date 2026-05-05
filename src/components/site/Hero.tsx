import { ArrowRight } from "lucide-react";
export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-obsidian text-ivory">
      {/* Background image from public folder */}
      <img
        src="/hero.jpg"
        alt="Professional mannequin display"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      {/* Stronger overlay for better text visibility with any image */}
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/95 via-obsidian/85 to-obsidian/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-obsidian/40" />

      <div className="container relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 pt-32 pb-24 px-4">
        <div className="lg:col-span-7 reveal">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] text-gold">Est. Premium Display Atelier</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-balance text-white drop-shadow-lg">
            Sculpting <em className="text-gold not-italic">silent</em><br/>
            storytellers for<br/> elevated spaces.
          </h1>
          <p className="mt-6 md:mt-8 max-w-xl text-white text-base md:text-lg leading-relaxed drop-shadow-md">
            From matte-black torso busts to grand wedding mandaps — A K Enterprises
            crafts mannequins, statues and decor that turn ordinary
            rooms into runways.
          </p>
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4">
            <a href="#products" className="group inline-flex items-center justify-center gap-3 bg-gold text-obsidian px-6 md:px-7 py-3 md:py-4 text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.25em] font-bold rounded-full hover:bg-white transition-smooth shadow-lg w-full sm:w-auto">
              Explore Collection
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-smooth" />
            </a>
            <a href="#enquiry" className="inline-flex items-center justify-center gap-3 px-6 md:px-7 py-3 md:py-4 text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.25em] border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-obsidian transition-smooth w-full sm:w-auto">
              Custom Enquiry
            </a>
          </div>
        </div>

        <div className="hidden lg:flex lg:col-span-5 flex-col gap-4 items-end justify-center">
          {/* Hero product showcase removed */}
          <dl className="grid grid-cols-3 gap-4 xl:gap-8 w-full pb-2 mt-2">
            {[
              ["6+", "Years"],
              ["100+", "Boutiques"],
              ["40+", "Cities"],
            ].map(([n, l]) => (
              <div key={l} className="border-t-2 border-white/40 pt-4">
                <dt className="font-display text-3xl xl:text-4xl text-gold font-bold drop-shadow-lg">{n}</dt>
                <dd className="text-[10px] xl:text-xs uppercase tracking-[0.2em] xl:tracking-[0.25em] text-white font-medium mt-1">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

    </section>
  );
};

export default Hero;