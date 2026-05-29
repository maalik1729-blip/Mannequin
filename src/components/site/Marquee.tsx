const ITEMS = [
  "Torso Busts",
  "Full Body Mannequins",
  "Kids Collection",
  "Wedding Mandaps",
  "Decor Statues",
  "Custom Builds",
];

const Star = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2l2.39 6.95H22l-5.8 4.21L18.6 20 12 15.78 5.4 20l2.4-6.84L2 8.95h7.61z" />
  </svg>
);

export const Marquee = () => (
  <div className="bg-background text-foreground border-y border-border overflow-hidden transition-all duration-500">
    <div className="flex marquee-track whitespace-nowrap py-5">
      {[...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS].map((t, i) => (
        <span key={i} className="flex items-center gap-6 px-6 font-display text-2xl md:text-3xl font-semibold">
          {t}
          <span className="text-gold"><Star /></span>
        </span>
      ))}
    </div>
  </div>
);

export default Marquee;