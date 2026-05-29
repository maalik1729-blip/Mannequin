import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X, Search, ShoppingBag, Heart, Sun, Moon } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useTheme } from "@/context/ThemeContext";

const NAV = [
  { label: "Home", href: "/#home" },
  { label: "Product", href: "/#products" },
  { label: "About", href: "/#about" },
  { label: "Enquiry", href: "/#enquiry" },
  { label: "Contact", href: "/#contact" },
];

const Logo = ({ textColor }: { textColor: string }) => (
  <a href="/#home" className="flex items-center gap-2 group flex-shrink-0">
    <svg width="34" height="34" viewBox="0 0 40 40" fill="none" aria-hidden className="flex-shrink-0">
      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1.5" className="text-gold" />
      <path
        d="M20 6c-3 4-3 8 0 14 3 6 3 10 0 14-3-4-3-8 0-14 3-6 3-10 0-14z"
        fill="hsl(var(--gold))"
      />
      <circle cx="20" cy="20" r="2" fill="currentColor" className="text-gold" />
    </svg>
    <div className="leading-tight">
      <div className={`font-display text-base md:text-lg tracking-wide ${textColor} font-semibold whitespace-nowrap transition-colors`}>A K Enterprises</div>
      <div className="text-xs uppercase tracking-widest text-gold font-medium -mt-0.5 whitespace-nowrap">
        Display Solutions
      </div>
    </div>
  </a>
);

export const Header = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);
  const { totalItems, setCartOpen } = useCart();
  const { totalItems: totalWishlist } = useWishlist();
  const { format } = useCurrency();
  const { theme, toggleTheme } = useTheme();

  const filtered = query.trim().length > 1
    ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.tag.toLowerCase().includes(query.toLowerCase()))
    : [];

  const textColor = "text-foreground";
  const hoverBgClass = "hover:bg-foreground/10";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 50);
    else setQuery("");
  }, [searchOpen]);

  useEffect(() => {
    if (open) setTimeout(() => mobileSearchRef.current?.focus(), 100);
    else setQuery("");
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSearchOpen(false); setOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-luxe"
          : "bg-transparent"
      }`}
    >
      {/* Announcement bar — desktop only */}
      <div className="hidden md:block bg-background/80 text-foreground text-xs border-b border-border relative z-10">
        <div className="container flex justify-between py-2.5">
          <span className="tracking-widest uppercase font-medium">Crafted in India · Worldwide Shipping</span>
          <span className="font-medium flex items-center gap-2">
            <a href="tel:+919884195244" className="hover:text-gold transition-smooth">+91 98841 95244</a>
            <span className="text-gold/50">·</span>
            <a href="mailto:akenterprisesbus26@gmail.com" className="hover:text-gold transition-smooth">akenterprisesbus26@gmail.com</a>
          </span>
        </div>
      </div>

      <div className="container flex items-center justify-between h-16 md:h-20 relative z-10 gap-4">
        <Logo textColor={textColor} />

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className={`text-sm uppercase tracking-widest ${textColor} font-medium hover:text-gold transition-smooth relative group whitespace-nowrap`}
            >
              {n.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-smooth" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
          {/* Desktop inline search bar */}
          {searchOpen ? (
            <div className={`relative hidden sm:flex items-center gap-2 bg-foreground/10 px-3 py-1.5 rounded-full`}>
              <Search size={15} className="text-gold flex-shrink-0" />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className={`bg-transparent ${textColor} text-sm outline-none placeholder:text-foreground/40 w-36 sm:w-44 lg:w-56`}
              />
              <button onClick={() => setSearchOpen(false)} aria-label="Close search" className="text-foreground/60 hover:text-foreground transition-smooth ml-1 rounded-full">
                <X size={15} />
              </button>
              {query.trim().length > 1 && (
                <div
                  role="listbox"
                  aria-label="Search results"
                  aria-live="polite"
                  className="absolute top-full left-0 right-0 mt-2 bg-background border border-border shadow-luxe z-[200] max-h-80 overflow-y-auto min-w-[300px]"
                >
                  {filtered.length > 0 ? (
                    <ul>
                      {filtered.map((p) => (
                        <li key={p.id}>
                          <a
                            href={`/product/${p.id}`}
                            onClick={() => { setSearchOpen(false); setQuery(""); }}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-smooth"
                          >
                            <img src={p.img} alt={p.name} className="w-10 h-10 object-contain bg-foreground/5 flex-shrink-0" />
                            <div>
                              <div className="text-foreground text-sm font-semibold">{p.name}</div>
                              <div className="text-gold text-xs uppercase tracking-widest">{p.tag}</div>
                              <div className="text-foreground/60 text-xs">{format(p.priceINR)}{p.priceSuffix ? ` ${p.priceSuffix}` : ""}</div>
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-foreground/50 text-sm text-center py-6">No results for "{query}"</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <button
              aria-label="Open search"
              onClick={() => setSearchOpen(true)}
              className={`p-2.5 rounded-full ${textColor} hover:text-gold ${hoverBgClass} transition-smooth`}
            >
              <Search size={18} />
            </button>
          )}

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            className={`p-2.5 rounded-full ${textColor} hover:text-gold ${hoverBgClass} transition-all duration-300`}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Wishlist — desktop only */}
          <a
            href="/wishlist"
            aria-label={`Wishlist${totalWishlist > 0 ? `, ${totalWishlist} items` : ""}`}
            className={`p-2.5 rounded-full ${textColor} hover:text-gold ${hoverBgClass} transition-smooth relative hidden sm:block`}
          >
            <Heart size={18} />
            {totalWishlist > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-gold text-xs rounded-full flex items-center justify-center text-obsidian font-bold leading-none">
                {totalWishlist}
              </span>
            )}
          </a>

          {/* Cart — always visible on all breakpoints */}
          <button
            aria-label={`Cart${totalItems > 0 ? `, ${totalItems} items` : ""}`}
            onClick={() => setCartOpen(true)}
            className={`p-2.5 rounded-full ${textColor} hover:text-gold ${hoverBgClass} transition-smooth relative`}
          >
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-gold text-xs rounded-full flex items-center justify-center text-obsidian font-bold leading-none">
                {totalItems}
              </span>
            )}
          </button>

          {/* Get a Quote — tablet+ */}
          <a
            href="/request-quote"
            className="hidden md:inline-flex ml-1 px-4 xl:px-5 py-2.5 text-xs uppercase tracking-widest bg-gold text-obsidian font-bold rounded-full hover:bg-white hover:text-obsidian transition-smooth shadow-md whitespace-nowrap"
          >
            Get a Quote
          </a>

          {/* Hamburger — below lg */}
          <button
            className={`lg:hidden p-2.5 rounded-full ${textColor} ${hoverBgClass} transition-smooth`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
    </header>

    {/* Mobile side drawer */}
    {open && (
      <div className="lg:hidden">
        {/* Backdrop */}
        <div
          className="fixed inset-0 z-[250] bg-foreground/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        {/* Drawer panel */}
        <div className="fixed right-0 top-0 h-full w-72 z-[300] bg-background flex flex-col shadow-luxe">
          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <Logo textColor="text-foreground" />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-2 rounded-full text-foreground hover:bg-muted transition-smooth"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="px-5 pt-4 pb-2">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="flex items-center py-3 px-2 text-sm uppercase tracking-widest font-medium text-foreground hover:text-gold hover:bg-muted rounded-lg transition-smooth"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="border-t border-border mx-5 my-2" />

          {/* Search */}
          <div className="px-5 pb-3">
            <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2.5">
              <Search size={14} className="text-gold flex-shrink-0" />
              <input
                ref={mobileSearchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                aria-label="Search products"
                className="bg-transparent text-foreground text-sm outline-none placeholder:text-foreground/40 w-full"
              />
              {query && (
                <button onClick={() => setQuery("")} aria-label="Clear search" className="text-foreground/40 hover:text-foreground transition-smooth">
                  <X size={13} />
                </button>
              )}
            </div>
            {query.trim().length > 1 && (
              <div className="mt-2 max-h-44 overflow-y-auto space-y-0.5" aria-live="polite" role="listbox" aria-label="Search results">
                {filtered.length > 0 ? filtered.map((p) => (
                  <a
                    key={p.id}
                    href={`/product/${p.id}`}
                    onClick={() => { setOpen(false); setQuery(""); }}
                    className="flex items-center gap-3 px-2 py-2 hover:bg-muted rounded-lg transition-smooth"
                  >
                    <img src={p.img} alt={p.name} className="w-8 h-8 object-contain bg-foreground/5 rounded flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-foreground text-xs font-semibold truncate">{p.name}</div>
                      <div className="text-gold text-xs uppercase tracking-widest">{p.tag}</div>
                    </div>
                  </a>
                )) : (
                  <p className="text-foreground/40 text-xs px-2 py-1">No results for "{query}"</p>
                )}
              </div>
            )}
          </div>

          {/* Wishlist */}
          <div className="border-t border-border mx-5" />
          <a
            href="/wishlist"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between mx-5 py-3.5 text-sm uppercase tracking-widest font-medium text-foreground hover:text-gold transition-smooth"
          >
            <span className="flex items-center gap-3">
              <Heart size={16} /> Wishlist
            </span>
            {totalWishlist > 0 && (
              <span className="bg-gold text-obsidian text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none">
                {totalWishlist}
              </span>
            )}
          </a>

          {/* Spacer */}
          <div className="flex-1" />

          {/* CTA + Contact */}
          <div className="px-5 pb-6 space-y-4 border-t border-border pt-5">
            <a
              href="/request-quote"
              onClick={() => setOpen(false)}
              className="w-full flex items-center justify-center bg-gold text-obsidian py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-obsidian transition-smooth"
            >
              Get a Quote
            </a>
            <div className="space-y-1.5 text-xs text-foreground/50">
              <a href="tel:+919884195244" className="block hover:text-gold transition-smooth">+91 98841 95244</a>
              <a href="mailto:akenterprisesbus26@gmail.com" className="block hover:text-gold transition-smooth truncate">akenterprisesbus26@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
  );
};

export default Header;