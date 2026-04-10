import { Link, useLocation } from "react-router-dom";
import { Menu, Phone, Mail, Facebook, Instagram } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

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
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 glass-intense border-b border-border/30">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shadow-glass transition-transform duration-300 group-hover:scale-105">
            <span className="text-secondary-foreground font-heading font-bold text-lg">AP</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-primary leading-tight">APCARE</p>
            <p className="text-xs text-muted-foreground leading-tight">Eye Center</p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                pathname === link.to
                  ? "bg-primary text-primary-foreground shadow-glass"
                  : "text-foreground/80 hover:text-foreground hover:bg-foreground/[0.04]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="lg:hidden p-2.5 rounded-xl text-foreground hover:bg-foreground/[0.04] transition-colors" aria-label="Open menu">
              <Menu size={22} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] p-0 flex flex-col glass-intense">
            <div className="p-6 pb-4 border-b border-border/30">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shadow-glass">
                  <span className="text-secondary-foreground font-heading font-bold text-sm">AP</span>
                </div>
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
                      : "text-foreground hover:bg-foreground/[0.04]"
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
                    className="flex items-center justify-center w-9 h-9 rounded-xl glass text-muted-foreground hover:text-secondary hover:shadow-glass-glow transition-all duration-300"
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
