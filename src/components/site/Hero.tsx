import { ArrowRight } from "lucide-react";

const STATS = [
  ["6+", "Years"],
  ["100+", "Boutiques"],
  ["40+", "Cities"],
] as const;

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-end overflow-hidden bg-obsidian text-ivory">
      {/* Background image */}
      <img
        src="/hero.jpg"
        alt="A K Enterprises atelier — professional display solutions showroom in Chennai"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover opacity-55"
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/55 to-obsidian/10" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-obsidian/90 to-transparent" />

      {/* Editorial corner markers */}
      <div className="absolute top-28 left-0 right-0 z-10 pointer-events-none">
        <div className="container flex items-start justify-between px-4">
          <div className="flex items-center gap-3 text-ivory/70">
            <span className="h-px w-6 bg-ivory/40" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium">Atelier · Chennai</span>
          </div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-ivory/40 font-price font-medium">N° 01 / 2026</span>
        </div>
      </div>

      <div className="container relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 pt-40 pb-20 md:pb-28 px-4">
        <div className="lg:col-span-7">
          {/* Sub-label */}
          <div className="flex items-center gap-3 mb-7">
            <span className="h-px w-8 bg-gold/80" />
            <span className="text-xs uppercase tracking-widest text-gold/90 font-medium">Premium Display Atelier</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-[7.5rem] leading-[0.92] text-balance text-ivory">
            Sculpting <em className="not-italic font-light italic text-ivory/70">silent</em><br/>
            storytellers for<br/>
            <span className="text-ivory/60">elevated</span> spaces.
          </h1>

          <p className="mt-7 md:mt-9 max-w-md text-ivory/75 text-[15px] md:text-base leading-relaxed">
            From matte-black torso busts to grand wedding mandaps — A K Enterprises
            crafts mannequins, statues and decor that turn ordinary
            rooms into runways.
          </p>

          <div className="mt-9 md:mt-11 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-5">
            {/* Primary CTA */}
            <a
              href="#products"
              className="group inline-flex items-center justify-center gap-3 bg-gold text-obsidian px-7 py-4 text-xs uppercase tracking-widest font-bold rounded-full hover:bg-ivory transition-colors duration-300 shadow-md w-full sm:w-auto"
            >
              Explore Collection
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            {/* Secondary CTA */}
            <a
              href="/request-quote"
              className="group inline-flex items-center gap-2 px-2 py-2 text-xs uppercase tracking-widest text-ivory/80 hover:text-ivory transition-colors"
            >
              Request a Quote
              <span className="inline-block w-6 h-px bg-ivory/40 group-hover:w-10 group-hover:bg-ivory transition-all duration-300" />
            </a>
          </div>

          {/* Stats — visible on ALL breakpoints */}
          <dl className="flex items-end gap-8 mt-12 pt-7 border-t border-ivory/15">
            {STATS.map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-3xl text-gold font-semibold leading-none">{n}</dt>
                <dd className="text-[11px] uppercase tracking-widest text-ivory/60 font-medium mt-1.5">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Desktop stats — right column, larger */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-end pb-2">
          <dl className="grid grid-cols-3 gap-x-6 xl:gap-x-10">
            {STATS.map(([n, l]) => (
              <div key={`${l}-desktop`} className="border-t border-ivory/25 pt-5">
                <dt className="font-display text-3xl xl:text-4xl text-gold font-semibold leading-none">{n}</dt>
                <dd className="text-[11px] uppercase tracking-widest text-ivory/60 font-medium mt-2">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex items-center gap-3 text-ivory/40 text-[10px] uppercase tracking-widest font-medium">
        <span className="h-px w-8 bg-ivory/30" />
        Scroll
        <span className="h-px w-8 bg-ivory/30" />
      </div>
    </section>
  );
};

export default Hero;