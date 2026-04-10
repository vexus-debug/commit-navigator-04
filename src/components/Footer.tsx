import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, ArrowRight, Eye } from "lucide-react";

const footerLinks = [
  { to: "/about", label: "About Us" },
  { to: "/eye-clinic", label: "Our Services" },
  { to: "/blog", label: "Blog" },
  { to: "/donate", label: "Support Us" },
  { to: "/contact", label: "Contact" },
];

const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

const Footer = () => (
  <footer className="relative overflow-hidden">
    {/* Top CTA band */}
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-[hsl(213,86%,25%)] to-secondary animate-oil-flow" style={{ backgroundSize: '400% 400%' }} />
      <div className="relative z-10 container py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-primary-foreground">
          <Eye size={20} className="text-secondary shrink-0" />
          <p className="text-sm md:text-base font-medium">
            Your vision matters — schedule your eye exam today.
          </p>
        </div>
        <Link
          to="/contact"
          className="group inline-flex items-center gap-2 px-5 py-2.5 bg-primary-foreground/10 hover:bg-primary-foreground/20 border border-primary-foreground/20 text-primary-foreground text-sm font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 shrink-0 btn-glow"
        >
          Schedule Appointment
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>

    {/* Main footer */}
    <div className="bg-foreground text-primary-foreground relative">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(hsl(var(--secondary)) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      
      <div className="relative z-10 container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shadow-glass">
                <span className="text-secondary-foreground font-heading font-bold text-sm">AP</span>
              </div>
              <div>
                <p className="font-heading font-bold text-sm">APCARE Eye Center</p>
                <p className="text-[11px] text-primary-foreground/50">Your Trusted Eye Clinic</p>
              </div>
            </div>
            <p className="text-xs text-primary-foreground/50 leading-relaxed max-w-xs mb-6">
              Professional primary eye care services in Benin City, Nigeria. Comprehensive exams, vision correction, and personalized care.
            </p>
            <div className="flex gap-2">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-primary-foreground/[0.05] hover:bg-secondary/20 hover:text-secondary flex items-center justify-center transition-all duration-300 text-primary-foreground/40 backdrop-blur-sm border border-primary-foreground/[0.06] hover:border-secondary/30 hover:shadow-glass-glow"
                >
                  <s.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-primary-foreground/30 mb-4">Navigation</h4>
            <div className="flex flex-col gap-2.5">
              {footerLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-sm text-primary-foreground/60 hover:text-secondary transition-colors duration-300"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-primary-foreground/30 mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <MapPin size={14} className="mt-1 shrink-0 text-primary-foreground/30" />
                <span className="text-primary-foreground/60">202 Upper Mission Extension, Aduwawa / 76 Village Road, Benin City, Nigeria</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={14} className="shrink-0 text-primary-foreground/30" />
                <span className="text-primary-foreground/60">07038847355</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail size={14} className="shrink-0 text-primary-foreground/30" />
                <span className="text-primary-foreground/60">apcareonline@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/[0.06]">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-primary-foreground/30">
            © {new Date().getFullYear()} APCARE Eye Center
          </p>
          <p className="text-[11px] text-primary-foreground/20">
            All rights reserved
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
