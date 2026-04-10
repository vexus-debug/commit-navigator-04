import { Link, useLocation } from "react-router-dom";
import { Menu, Phone, Mail, Facebook, Instagram } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import apcareLogo from "@/assets/apcare-logo.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/eye-clinic", label: "Our Services" },
  { to: "/blog", label: "Blog" },
  { to: "/gallery", label: "Gallery" },
  { to: "/donate", label: "Support Us" },
  { to: "/contact", label: "Contact" },
];

const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-primary border-primary/20 shadow-lg"
          : "glass-intense border-border/30"
      }`}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={apcareLogo} alt="APCARE Eye Clinic" className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-105" />
          <div className="hidden sm:block">
            <p className={`text-sm font-semibold leading-tight transition-colors duration-300 ${scrolled ? "text-primary-foreground" : "text-primary"}`}>APCARE</p>
            <p className={`text-xs leading-tight transition-colors duration-300 ${scrolled ? "text-primary-foreground/70" : "text-muted-foreground"}`}>Eye Center</p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                pathname === link.to
                  ? scrolled
                    ? "bg-primary-foreground/20 text-primary-foreground shadow-glass"
                    : "bg-primary text-primary-foreground shadow-glass"
                  : scrolled
                    ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    : "text-foreground/80 hover:text-foreground hover:bg-foreground/[0.04]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className={`lg:hidden p-2.5 rounded-xl transition-colors ${
                scrolled
                  ? "text-primary-foreground hover:bg-primary-foreground/10"
                  : "text-foreground hover:bg-foreground/[0.04]"
              }`}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] p-0 flex flex-col bg-background border-l border-border/40">
            <div className="p-6 pb-4 border-b border-border/30">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
                <img src={apcareLogo} alt="APCARE Eye Clinic" className="w-10 h-10 object-contain" />
                <div>
                  <p className="text-sm font-semibold text-primary leading-tight">APCARE</p>
                  <p className="text-xs text-muted-foreground leading-tight">Eye Center</p>
                </div>
              </Link>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 mb-1 ${
                    pathname === link.to
                      ? "bg-primary text-primary-foreground shadow-glass"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="border-t border-border/30 p-6 space-y-4">
              <div className="space-y-2.5">
                <a href="tel:07038847355" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Phone size={16} className="text-secondary shrink-0" />
                  <span>07038847355</span>
                </a>
                <a href="mailto:apcareonline@gmail.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Mail size={16} className="text-secondary shrink-0" />
                  <span>apcareonline@gmail.com</span>
                </a>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex items-center justify-center w-9 h-9 rounded-xl bg-muted text-muted-foreground hover:text-secondary hover:shadow-glass-glow transition-all duration-300"
                  >
                    <s.icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
