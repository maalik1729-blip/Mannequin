import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const SOCIALS = [
  { Icon: Instagram, href: "https://www.instagram.com/", label: "A K Enterprises on Instagram" },
  { Icon: Facebook, href: "https://www.facebook.com/", label: "A K Enterprises on Facebook" },
  { Icon: Youtube, href: "https://www.youtube.com/", label: "A K Enterprises on YouTube" },
];

const POLICIES = [
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Cancellation & Refund", href: "/cancellation-refund" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
];

export const Footer = () => {
  return (
    <footer className="bg-obsidian text-white">
      <div className="container py-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-display text-3xl text-white font-semibold">A K Enterprises</div>
          <p className="mt-4 text-sm leading-relaxed text-white/80">
            Sculpting silent storytellers — mannequins, torsos and decor that
            elevate every space they inhabit.
          </p>
          <div className="flex gap-3 mt-6">
            {SOCIALS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 grid place-items-center rounded-full border border-white/30 text-white hover:bg-gold hover:text-obsidian hover:border-gold transition-smooth"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-gold mb-5 font-semibold">Explore</h4>
          <ul className="space-y-3 text-sm text-white/90">
            {[
              { label: "Home", href: "/#home" },
              { label: "Product", href: "/#products" },
              { label: "About", href: "/#about" },
              { label: "Enquiry", href: "/#enquiry" },
              { label: "Contact", href: "/#contact" },
            ].map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-gold transition-smooth">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-gold mb-5 font-semibold">Policies</h4>
          <ul className="space-y-3 text-sm text-white/90">
            {POLICIES.map((p) => (
              <li key={p.label}>
                <Link to={p.href} className="hover:text-gold transition-smooth">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-gold mb-5 font-semibold">Contact</h4>
          <ul className="space-y-3 text-sm text-white/90">
            <li className="flex items-start gap-3"><MapPin size={16} className="mt-0.5 text-gold flex-shrink-0" /> No 2/239 Konnur High Road<br/>Chennai, Tamil Nadu - 600023</li>
            <li className="flex items-center gap-3"><Phone size={16} className="text-gold flex-shrink-0" /> <a href="tel:+919884195244" className="hover:text-gold transition-smooth">+91 98841 95244</a></li>
            <li className="flex items-center gap-3"><Mail size={16} className="text-gold flex-shrink-0" /> <a href="mailto:akenterprisesbus26@gmail.com" className="hover:text-gold transition-smooth">akenterprisesbus26@gmail.com</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/20">
        <div className="container py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/70">
          <span>© {new Date().getFullYear()} A K Enterprises. All rights reserved.</span>
          <span className="text-white/40">Crafted with intention · Chennai, India</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;