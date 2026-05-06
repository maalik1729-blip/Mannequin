import { useEffect, useRef, useState } from "react";
import { Menu, X, Search, ShoppingBag, Heart } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCurrency } from "@/context/CurrencyContext";

const NAV = [
  { label: "Home", href: "/#home" },
  { label: "Product", href: "/#products" },
  { label: "About", href: "/#about" },
  { label: "Enquiry", href: "/#enquiry" },
  { label: "Contact", href: "/#contact" },
];

const Logo = () => (
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
      <div className="font-display text-base md:text-lg tracking-wide text-white font-semibold whitespace-nowrap">A K Enterprises</div>
      <div className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-gold font-medium -mt-0.5 whitespace-nowrap">
        Display Solutions
      </div>
    </div>
  </a>
);

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const { totalItems, setCartOpen } = useCart();
  const { totalItems: totalWishlist } = useWishlist();
  const { format } = useCurrency();

  const filtered = query.trim().length > 1
    ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.tag.toLowerCase().includes(query.toLowerCase()))
    : [];

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
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSearchOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-smooth ${
        scrolled
          ? "bg-obsidian/95 backdrop-blur-xl border-b border-gold/20 shadow-luxe"
          : "bg-transparent"
      }`}
    >
      
      <div className="hidden md:block bg-obsidian/80 text-gold text-xs border-b border-gold/20 relative z-10">
        <div className="container flex justify-between py-2">
          <span className="tracking-widest uppercase font-medium">Crafted in India · Worldwide Shipping</span>
          <span className="text-white font-medium flex items-center gap-2">
            <a href="tel:+919884195244" className="hover:text-gold transition-smooth">+91 98841 95244</a>
            <span className="text-gold/50">·</span>
            <a href="mailto:akenterprisesbus26@gmail.com" className="hover:text-gold transition-smooth">akenterprisesbus26@gmail.com</a>
          </span>
        </div>
      </div>
      <div className="container flex items-center justify-between h-20 relative z-10 gap-4">
        <Logo />
        <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-sm uppercase tracking-[0.2em] text-white font-medium hover:text-gold transition-smooth relative group whitespace-nowrap"
            >
              {n.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-smooth" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
          {/* Inline search bar */}
          {searchOpen ? (
            <div className="relative hidden sm:flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">
              <Search size={15} className="text-gold flex-shrink-0" />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="bg-transparent text-white text-sm outline-none placeholder:text-white/40 w-44 lg:w-56"
              />
              <button onClick={() => setSearchOpen(false)} className="text-white/60 hover:text-white transition-smooth ml-1 rounded-full">
                <X size={15} />
              </button>
              {/* Dropdown results */}
              {query.trim().length > 1 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-obsidian border border-gold/20 shadow-luxe z-[200] max-h-80 overflow-y-auto min-w-[320px]">
                  {filtered.length > 0 ? (
                    <ul>
                      {filtered.map((p) => (
                        <li key={p.id}>
                          <a
                            href={`/product/${p.id}`}
                            onClick={() => { setSearchOpen(false); setQuery(""); }}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-smooth"
                          >
                            <img src={p.img} alt={p.name} className="w-10 h-10 object-contain bg-white/5 flex-shrink-0" />
                            <div>
                              <div className="text-white text-sm font-semibold">{p.name}</div>
                              <div className="text-gold text-[10px] uppercase tracking-widest">{p.tag}</div>
                              <div className="text-white/60 text-xs">{format(p.priceINR)}{p.priceSuffix ? ` ${p.priceSuffix}` : ""}</div>
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-white/50 text-sm text-center py-6">No results for "{query}"</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <button aria-label="Search" onClick={() => setSearchOpen(true)} className="p-2 rounded-full text-white hover:text-gold hover:bg-white/10 transition-smooth hidden sm:block">
              <Search size={18} />
            </button>
          )}
          <a
            href="/wishlist"
            aria-label="Wishlist"
            className="p-2 rounded-full text-white hover:text-gold hover:bg-white/10 transition-smooth relative hidden sm:block"
          >
            <Heart size={18} />
            {totalWishlist > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-gold text-[10px] rounded-full flex items-center justify-center text-obsidian font-bold">
                {totalWishlist}
              </span>
            )}
          </a>
          <button
            aria-label="Cart"
            onClick={() => setCartOpen(true)}
            className="p-2 rounded-full text-white hover:text-gold hover:bg-white/10 transition-smooth relative hidden sm:block"
          >
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-gold text-[10px] rounded-full flex items-center justify-center text-obsidian font-bold">
                {totalItems}
              </span>
            )}
          </button>
          <a
            href="/request-quote"
            className="hidden lg:inline-flex ml-2 px-4 xl:px-5 py-2.5 text-[10px] xl:text-xs uppercase tracking-[0.15em] xl:tracking-[0.2em] bg-gold text-obsidian font-bold rounded-full hover:bg-white transition-smooth shadow-md whitespace-nowrap"
          >
            Get a Quote
          </a>
          <button
            className="lg:hidden p-2 rounded-full text-white hover:bg-white/10 transition-smooth"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden bg-obsidian/98 backdrop-blur-xl border-t border-gold/20 relative">
          <div className="container py-6 flex flex-col gap-5 relative z-10">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.25em] py-1 font-medium text-white hover:text-gold transition-smooth"
              >
                {n.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  </>
  );
};

export default Header;