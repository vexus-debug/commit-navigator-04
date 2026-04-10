import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  Heart,
  Mail,
  ExternalLink,
  BookOpen,
  Users,
  HandHeart,
  Stethoscope,
  ArrowRight,
  Phone,
  Calendar,
  Smile,
  Shield,
  Star,
  Quote,
  MapPin,
  Clock,
  Award,
  GraduationCap,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Activity,
  Baby,
  Glasses,
  Brain,
  Camera,
} from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import { Reveal } from "@/hooks/use-scroll-reveal";
import { useCountUp } from "@/hooks/use-count-up";
import { useSiteContent } from "@/contexts/SiteContentContext";

/* ───────────────────────── DATA ───────────────────────── */

const stats = [
  { value: 2024, label: "Year Established", icon: Calendar, suffix: "", isYear: true },
  { value: 500, label: "Patients Served", icon: Heart, suffix: "+" },
  { value: 4, label: "Core Services", icon: Award, suffix: "" },
  { value: 100, label: "Satisfaction Rate", icon: Star, suffix: "%" },
];

const services = [
  { icon: Eye, title: "Comprehensive Eye Exams", desc: "Thorough evaluations including visual acuity, refraction, eye pressure, and retina examination.", color: "secondary" as const },
  { icon: Glasses, title: "Vision Correction", desc: "Prescription glasses, contact lenses, and expert solutions for myopia, hyperopia, and astigmatism.", color: "primary" as const },
  { icon: Baby, title: "Pediatric Eye Care", desc: "Specialized screenings for children — detecting lazy eye, crossed eyes, and learning-related vision issues.", color: "accent" as const },
  { icon: BookOpen, title: "Eye Health Education", desc: "Workshops and guidance on screen time, eye hygiene, nutrition, and preventive strategies.", color: "secondary" as const },
];

const journey = [
  { step: "01", icon: Phone, title: "Reach Out", desc: "Call us or visit our Benin City clinic to schedule your appointment." },
  { step: "02", icon: Eye, title: "Eye Examination", desc: "A thorough assessment using state-of-the-art diagnostic equipment." },
  { step: "03", icon: Shield, title: "Diagnosis & Plan", desc: "Receive a clear diagnosis and a personalized treatment plan." },
  { step: "04", icon: Smile, title: "Clear Vision", desc: "Walk out with corrected vision and ongoing support for eye health." },
];

const testimonials = [
  { text: "APCARE changed my life. I had been struggling with blurry vision for years, and they diagnosed and corrected it in one visit. Truly professional.", name: "Mrs. Ehi Okonkwo", role: "Patient", initials: "EO" },
  { text: "My daughter's vision problem was caught early thanks to APCARE's pediatric screening. The staff is incredibly caring and thorough.", name: "Mr. Osaze Igbinovia", role: "Parent", initials: "OI" },
  { text: "The best eye clinic in Benin City, hands down. Modern equipment, friendly staff, and they genuinely care about your eye health.", name: "Dr. Emeka Afolabi", role: "Colleague", initials: "EA" },
  { text: "I appreciate how they took the time to educate me about eye care. Not just a prescription — but real knowledge to protect my vision long-term.", name: "Grace Ogiemwanye", role: "Patient", initials: "GO" },
];

/* ───────────── COUNTER COMPONENT ───────────── */
const StatCounter = ({ value, suffix, label, icon: Icon, isYear }: { value: number; suffix: string; label: string; icon: React.ElementType; isYear?: boolean }) => {
  const { count, ref } = useCountUp(value, isYear ? 1500 : 2000);
  return (
    <div ref={ref} className="p-4 md:p-8 text-center">
      <Icon size={22} className="mx-auto mb-3 opacity-60" />
      <p className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
        {isYear ? (count || value) : count.toLocaleString()}<span className="text-lg">{suffix}</span>
      </p>
      <p className="text-xs md:text-sm opacity-70 mt-1 font-medium uppercase tracking-wider">{label}</p>
    </div>
  );
};

/* ───────────────────────── COMPONENT ───────────────────────── */

const Index = () => {
  const { content } = useSiteContent();
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const t = testimonials[testimonialIdx];

  return (
    <div className="overflow-hidden">
      <HeroSlider />

      {/* ═══════════ FLOATING STATS RIBBON ═══════════ */}
      <section className="relative -mt-10 md:-mt-20 z-20 px-4 md:px-8 lg:px-16 pb-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-0 md:rounded-2xl md:overflow-hidden md:shadow-premium">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`relative overflow-hidden ${
                  i % 2 === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                } rounded-2xl md:rounded-none glass-sheen`}
              >
                <StatCounter value={s.value} suffix={s.suffix} label={s.label} icon={s.icon} isYear={s.isYear} />
                {i < 3 && <div className="hidden md:block absolute right-0 top-1/4 bottom-1/4 w-px bg-primary-foreground/15" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ABOUT / MISSION — IMMERSIVE ═══════════ */}
      <section className="relative py-14 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={content.homeAboutBgImage} alt="" className="w-full h-full object-cover" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70 md:via-background/85 md:to-background/40" />
        </div>

        <div className="relative z-10 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-xl">
              <Reveal direction="left" delay={0.1}>
                <span className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4 block">Who We Are</span>
              </Reveal>

              <Reveal direction="left" delay={0.2}>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.1]">
                  Your Trusted Eye Clinic —{" "}
                  <span className="text-gradient">Right Next Door</span>
                </h2>
              </Reveal>

              <Reveal direction="left" delay={0.3}>
                <div className="relative p-6 md:p-8 rounded-2xl glass-card oil-sheen overflow-hidden">
                  <div className="relative z-10">
                    <p className="text-muted-foreground text-base leading-relaxed mb-4">
                      APCARE Eye Center is a <strong className="text-foreground">primary eye care clinic</strong> in Benin City, Nigeria, dedicated to providing exceptional, personalized eye health services to every patient who walks through our doors.
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      From comprehensive eye exams and vision correction to pediatric screenings and eye health education — we combine <strong className="text-foreground">modern diagnostic technology</strong> with genuine compassion to keep your vision clear and your eyes healthy.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {[
                        { icon: Stethoscope, text: "Expert Eye Care" },
                        { icon: Glasses, text: "Modern Equipment" },
                        { icon: Heart, text: "Compassionate Team" },
                        { icon: Shield, text: "Personalized Care" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <item.icon size={16} className="text-secondary shrink-0" />
                          {item.text}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        to="/about"
                        className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-glass btn-glow text-sm"
                      >
                        Our Story
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 glass text-foreground font-semibold rounded-xl hover:shadow-glass-lg transition-all text-sm"
                      >
                        <Calendar size={16} />
                        Schedule Appointment
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ MISSION SPOTLIGHT ═══════════ */}
      <section className="relative py-14 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--section-warm))] via-background to-[hsl(var(--section-blue))]" />
        <div className="relative z-10 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
              <Reveal direction="left">
                <div className="relative group">
                  <div className="absolute -inset-3 bg-gradient-to-br from-secondary/20 via-primary/10 to-accent/10 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative rounded-2xl overflow-hidden shadow-premium">
                    <img
                      src={content.homeMissionSpotlight.image}
                      alt={content.homeMissionSpotlight.caption}
                      className="w-full h-[280px] md:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-center gap-2 text-primary-foreground/80 text-xs font-medium">
                        <Camera size={14} />
                        {content.homeMissionSpotlight.caption}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal direction="right" delay={0.2}>
                <div className="relative">
                  <div className="absolute -top-4 -left-2 text-secondary/10">
                    <Quote size={80} />
                  </div>
                  <blockquote className="relative z-10 pl-6 border-l-4 border-secondary/40">
                    <p className="text-foreground text-lg md:text-2xl lg:text-3xl font-heading font-bold leading-snug italic mb-6">
                      "{content.homeMissionSpotlight.quote}"
                    </p>
                    <footer className="flex items-center gap-3">
                      <div className="w-10 h-1 bg-secondary rounded-full" />
                      <cite className="not-italic text-muted-foreground font-semibold text-sm">
                        {content.homeMissionSpotlight.quoteAuthor}
                      </cite>
                    </footer>
                  </blockquote>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ WAVE DIVIDER ═══════ */}
      <div className="h-16 bg-gradient-to-b from-background to-[hsl(var(--section-warm))]" />

      {/* ═══════════ SERVICES ═══════════ */}
      <section className="relative py-14 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--section-warm))] to-background" />

        <div className="relative z-10 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="mb-10 md:mb-16 md:text-center">
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  What We <span className="text-gradient">Offer</span>
                </h2>
                <p className="text-muted-foreground text-base md:text-lg max-w-2xl md:mx-auto">
                  From diagnostic exams to vision correction — comprehensive eye care tailored to you.
                </p>
              </div>
            </Reveal>

            <div className="space-y-0 border-t border-border/40">
              {services.map((s, i) => (
                <Reveal key={i} delay={i * 0.08} direction="up">
                  <div className="group relative flex items-start md:items-center gap-4 md:gap-8 py-6 md:py-8 border-b border-border/30 hover:bg-foreground/[0.015] transition-all duration-500 cursor-default rounded-xl px-2 md:px-4">
                    <span className="font-heading text-xs md:text-sm font-bold text-muted-foreground/30 tabular-nums pt-1 md:pt-0 w-6 shrink-0">
                      0{i + 1}
                    </span>

                    <div className={`relative shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-500 overflow-hidden glass-sheen ${
                      s.color === "primary"
                        ? "bg-primary/8 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                        : s.color === "secondary"
                        ? "bg-secondary/15 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground"
                        : "bg-accent/10 text-accent-foreground/60 group-hover:bg-accent group-hover:text-accent-foreground"
                    } group-hover:scale-110 group-hover:shadow-glass-glow`}>
                      <s.icon size={18} className="relative z-10" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-lg md:text-xl font-bold text-foreground mb-0.5 group-hover:text-primary transition-colors duration-300">{s.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed max-w-lg">{s.desc}</p>
                    </div>

                    <ArrowRight size={18} className="shrink-0 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 hidden md:block" />
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="text-center mt-10">
                <Link to="/eye-clinic" className="group inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                  View All Services <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ JOURNEY ═══════════ */}
      <section className="relative py-14 md:py-24 bg-primary overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-secondary/10 blur-[100px] animate-float" />
        <div className="absolute bottom-20 left-10 w-56 h-56 rounded-full bg-accent/8 blur-[80px] animate-float" style={{ animationDelay: "3s" }} />

        <div className="relative z-10 px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="md:text-center mb-10 md:mb-16">
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
                  From First Visit to{" "}
                  <span className="text-secondary">Clear Vision</span>
                </h2>
                <p className="text-primary-foreground/60 text-base md:text-lg max-w-xl md:mx-auto">
                  Your journey to better sight starts here.
                </p>
              </div>
            </Reveal>

            {/* Mobile: vertical timeline */}
            <div className="md:hidden relative pl-10">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-secondary via-secondary/50 to-transparent" />
              {journey.map((j, i) => (
                <Reveal key={i} delay={i * 0.12} direction="left">
                  <div className="relative mb-10 last:mb-0">
                    <div className="absolute -left-10 top-1 w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-xs font-bold flex items-center justify-center shadow-glass-glow z-10">
                      {j.step}
                    </div>
                    <div className="relative overflow-hidden rounded-2xl p-5 bg-primary-foreground/[0.06] backdrop-blur-xl border border-primary-foreground/10 glass-sheen">
                      <div className="relative z-10">
                        <j.icon size={22} className="text-secondary mb-2" />
                        <h3 className="font-heading text-lg font-bold text-primary-foreground mb-1">{j.title}</h3>
                        <p className="text-primary-foreground/50 text-sm leading-relaxed">{j.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Desktop: horizontal steps */}
            <div className="hidden md:grid md:grid-cols-4 gap-8 relative">
              <div className="absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
              {journey.map((j, i) => (
                <Reveal key={i} delay={i * 0.15} direction="up">
                  <div className="text-center group relative">
                    <div className="relative mx-auto w-24 h-24 mb-6">
                      <div className="absolute inset-0 rounded-full bg-secondary/20 group-hover:bg-secondary/30 transition-all duration-500 group-hover:scale-110 animate-glow-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
                      <div className="absolute inset-2 rounded-full bg-primary border-2 border-secondary/40 flex items-center justify-center group-hover:border-secondary transition-colors duration-300">
                        <j.icon size={30} className="text-primary-foreground" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold flex items-center justify-center shadow-glass-glow">
                        {j.step}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-primary-foreground mb-2">{j.title}</h3>
                    <p className="text-primary-foreground/50 text-sm leading-relaxed max-w-[200px] mx-auto">{j.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SPOTLIGHT FEATURE ═══════════ */}
      <section className="relative py-14 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={content.homeSpotlightFeature.image}
            alt={content.homeSpotlightFeature.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/75 to-foreground/40 md:to-transparent" />
        </div>

        <div className="relative z-10 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-lg">
              <Reveal direction="left">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 backdrop-blur-sm border border-secondary/30 text-secondary text-xs font-bold uppercase tracking-widest mb-5">
                  <Sparkles size={12} />
                  {content.homeSpotlightFeature.tag}
                </span>
              </Reveal>

              <Reveal direction="left" delay={0.1}>
                <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-5 leading-[1.1]">
                  {content.homeSpotlightFeature.title}
                </h2>
              </Reveal>

              <Reveal direction="left" delay={0.2}>
                <p className="text-primary-foreground/70 text-base md:text-lg leading-relaxed mb-8">
                  {content.homeSpotlightFeature.description}
                </p>
              </Reveal>

              <Reveal direction="left" delay={0.3}>
                <Link
                  to={content.homeSpotlightFeature.ctaLink}
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-secondary text-secondary-foreground font-bold rounded-xl hover:bg-secondary/90 transition-all shadow-premium btn-glow"
                >
                  {content.homeSpotlightFeature.ctaLabel}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ IMPACT ═══════════ */}
      <section className="relative min-h-[450px] md:h-[550px] overflow-hidden">
        <div
          className="absolute inset-0 parallax-bg"
          style={{ backgroundImage: `url(${content.homeImpactBgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.92)] via-[hsl(var(--primary)/0.85)] to-[hsl(var(--secondary)/0.7)]" />

        <div className="relative z-10 h-full flex items-center px-4 md:px-8 lg:px-16 py-14 md:py-0">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <Reveal direction="left">
                <div>
                  <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
                    Real Impact,{" "}
                    <span className="text-secondary">Real Results</span>
                  </h2>
                  <p className="text-primary-foreground/70 text-base md:text-lg leading-relaxed mb-6">
                    Every number represents a patient — a child who can now read, a professional who can work comfortably, a grandparent who can see their family clearly.
                  </p>
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-accent-foreground font-bold rounded-xl hover:bg-accent/90 transition-all shadow-premium btn-glow"
                  >
                    <Eye size={18} />
                    Schedule Your Exam
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </Reveal>

              <Reveal direction="right" delay={0.2}>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {[
                    { end: 500, label: "Patients Examined", icon: Stethoscope, suffix: "+" },
                    { end: 300, label: "Glasses Prescribed", icon: Glasses, suffix: "+" },
                    { end: 100, label: "Children Screened", icon: Baby, suffix: "+" },
                    { end: 50, label: "Outreach Events", icon: Users, suffix: "+" },
                  ].map((item, i) => (
                    <ImpactCounter key={i} {...item} />
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ DIVIDER ═══════ */}
      <div className="h-12 bg-gradient-to-b from-[hsl(var(--primary)/0.1)] to-background" />

      {/* ═══════════ PROGRAMS & EVENTS ═══════════ */}
      <section className="py-14 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(var(--section-blue))] to-background" />

        <div className="relative z-10 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="mb-10 md:mb-16">
                <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-3 block">Programs & Community</span>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Beyond the Clinic —{" "}
                  <span className="text-gradient">Into the Community</span>
                </h2>
                <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
                  We go beyond treatment — bringing eye care education and screenings to schools, churches, and communities across Benin City.
                </p>
              </div>
            </Reveal>

            <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
              {content.programs.map((p, i) => (
                <Reveal key={i} delay={i * 0.15} direction="up">
                  <div className="group relative rounded-2xl overflow-hidden glass-card">
                    <div className="relative h-52 md:h-56 overflow-hidden">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                      <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/90 backdrop-blur-sm text-secondary-foreground text-xs font-bold">
                        <Clock size={12} />
                        {p.duration}
                      </span>
                    </div>
                    <div className="p-6 relative z-10">
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{p.desc}</p>
                      <Link to="/about" className="inline-flex items-center gap-1.5 text-secondary font-semibold text-sm group-hover:gap-2.5 transition-all">
                        Learn More <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ GALLERY ═══════════ */}
      <section className="py-14 md:py-24 bg-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(hsl(var(--secondary)) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="relative z-10 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="mb-10 md:mb-16 md:text-center">
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
                  Inside <span className="text-secondary">APCARE</span> Eye Center
                </h2>
                <p className="text-primary-foreground/50 text-base md:text-lg max-w-2xl md:mx-auto">
                  A glimpse into our clinic, equipment, and the care we provide every day.
                </p>
              </div>
            </Reveal>

            <div className="md:hidden grid grid-cols-1 gap-4">
              {content.homeGalleryImages.slice(0, 2).map((img, i) => (
                <Reveal key={i} delay={i * 0.1} direction="scale">
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-premium">
                    <img src={img} alt={`APCARE Gallery ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                </Reveal>
              ))}
              <Link to="/gallery" className="inline-flex items-center justify-center gap-2 text-secondary font-semibold py-3">
                View Full Gallery <ArrowRight size={16} />
              </Link>
            </div>

            <div className="hidden md:grid md:grid-cols-4 md:grid-rows-2 gap-4">
              {content.homeGalleryImages.map((img, i) => {
                const classNames = ["col-span-2 row-span-2", "", "", "col-span-2"];
                return (
                <Reveal key={i} delay={i * 0.08} direction="scale" className={classNames[i] || ""}>
                  <div className="w-full h-full min-h-[200px] rounded-2xl overflow-hidden group relative shadow-glass">
                    <img src={img} alt={`APCARE Gallery ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 backdrop-blur-0 group-hover:backdrop-blur-[2px] transition-all duration-500 flex items-center justify-center">
                      <Eye size={32} className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                    </div>
                  </div>
                </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="py-14 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary/5 blur-[100px]" />

        <div className="relative z-10 px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-10 md:mb-14">
                What Our{" "}
                <span className="text-gradient">Patients Say</span>
              </h2>
            </Reveal>

            <div className="relative">
              <div className="relative p-8 md:p-14 rounded-2xl glass-card oil-sheen overflow-hidden">
                <div className="relative z-10">
                  <Quote size={48} className="mx-auto text-secondary/20 mb-6" />
                  <p className="text-foreground text-lg md:text-2xl leading-relaxed italic mb-8 max-w-2xl mx-auto">
                    "{t.text}"
                  </p>

                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-glass-glow">
                      {t.initials}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-foreground text-lg">{t.name}</p>
                      <p className="text-muted-foreground text-sm">{t.role}</p>
                    </div>
                  </div>

                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={18} className="fill-secondary text-secondary" />
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => setTestimonialIdx((testimonialIdx - 1 + testimonials.length) % testimonials.length)}
                      className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-foreground hover:shadow-glass-lg transition-all"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setTestimonialIdx(i)}
                        className={`h-2.5 rounded-full transition-all duration-500 ${i === testimonialIdx ? "bg-secondary w-8 shadow-glass-glow" : "w-2.5 bg-border hover:bg-muted-foreground"}`}
                        aria-label={`Go to testimonial ${i + 1}`}
                      />
                    ))}
                    <button
                      onClick={() => setTestimonialIdx((testimonialIdx + 1) % testimonials.length)}
                      className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-foreground hover:shadow-glass-lg transition-all"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE APCARE ═══════════ */}
      <section className="relative py-16 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(213 86% 8%), hsl(213 60% 16%), hsl(213 86% 12%))' }}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-secondary/8 blur-[150px] -translate-y-1/3 translate-x-1/4 animate-glow-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px] translate-y-1/3 -translate-x-1/4 animate-glow-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(hsl(var(--secondary)) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative z-10 px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="md:text-center mb-10 md:mb-16">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-sm">
                  <Sparkles size={12} /> Why APCARE
                </span>
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-2 leading-tight">
                  Why Patients <span className="text-secondary">Trust Us</span>
                </h2>
                <p className="text-primary-foreground/60 leading-relaxed text-sm md:text-base max-w-2xl md:mx-auto">
                  We combine professional expertise with modern technology and genuine compassion to deliver eye care that truly makes a difference.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Award, title: "Professional Expertise", desc: "Our team of skilled eye care specialists brings years of clinical experience to every consultation and diagnosis.", gradient: "from-primary to-primary/60" },
                { icon: Activity, title: "Modern Technology", desc: "We use the latest diagnostic equipment — auto refractometers, lensometers, and more — for accurate, reliable results.", gradient: "from-secondary to-secondary/60" },
                { icon: Heart, title: "Patient-Centered Care", desc: "Every visit is personalized. We listen, we explain, and we make sure you leave with clear answers and clear vision.", gradient: "from-accent to-accent/60" },
                { icon: Shield, title: "Affordable Services", desc: "Quality eye care shouldn't break the bank. We offer competitive pricing and flexible options for every budget.", gradient: "from-primary to-secondary" },
                { icon: Users, title: "Community Trust", desc: "Benin City trusts APCARE. Our growing reputation is built on integrity, compassion, and consistent results.", gradient: "from-secondary to-primary" },
                { icon: Stethoscope, title: "Comprehensive Solutions", desc: "From diagnosis to prescription to follow-up — everything under one roof, so you never have to run around.", gradient: "from-accent to-primary" },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.08} direction="up">
                  <div className="group relative p-7 md:p-8 rounded-2xl bg-primary-foreground/[0.04] backdrop-blur-xl border border-primary-foreground/10 overflow-hidden hover:bg-primary-foreground/[0.08] transition-all duration-500">
                    <div className="relative z-10">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-glass-glow transition-all duration-300`}>
                        <item.icon size={22} className="text-primary-foreground" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-primary-foreground mb-2">{item.title}</h3>
                      <p className="text-primary-foreground/60 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ VISIT US ═══════════ */}
      <section className="relative py-14 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-[hsl(var(--section-blue))]" />

        <div className="relative z-10 px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="mb-10 md:mb-14">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary mb-3 block">Get in Touch</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Visit Us Today</h2>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-4 md:gap-5">
              {[
                {
                  icon: MapPin,
                  title: "Location",
                  lines: ["202 Upper Mission Extension, Aduwawa", "76 Village Road", "Benin City, Nigeria"],
                  accent: "from-primary to-primary/70",
                },
                {
                  icon: Clock,
                  title: "Clinic Hours",
                  lines: ["Mon – Fri: 8:00 AM – 6:00 PM", "Saturday: 9:00 AM – 3:00 PM", "Sunday: Closed"],
                  accent: "from-secondary to-secondary/70",
                },
                {
                  icon: Phone,
                  title: "Contact",
                  lines: ["07038847355", "apcareonline@gmail.com"],
                  accent: "from-accent to-accent/70",
                },
              ].map((card, i) => (
                <Reveal key={i} delay={i * 0.1} direction="up">
                  <div className="group relative rounded-2xl glass-card oil-sheen overflow-hidden">
                    <div className="relative z-10">
                      <div className={`h-1 bg-gradient-to-r ${card.accent}`} />
                      <div className="p-6 md:p-7">
                        <div className="flex items-center gap-3 mb-4">
                          <card.icon size={20} className="text-muted-foreground" />
                          <h3 className="font-heading text-base font-bold text-foreground">{card.title}</h3>
                        </div>
                        <div className="space-y-2 pl-8">
                          {card.lines.map((line, j) => (
                            <p key={j} className="text-muted-foreground text-sm leading-relaxed">{line}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-[hsl(213,86%,25%)] to-secondary animate-oil-flow" style={{ backgroundSize: '400% 400%' }} />
        <div className="absolute top-10 right-[10%] w-80 h-80 rounded-full bg-secondary/20 blur-[100px] animate-float" />
        <div className="absolute bottom-10 left-[5%] w-60 h-60 rounded-full bg-accent/15 blur-[80px] animate-float" style={{ animationDelay: "2s" }} />

        <div className="relative z-10 px-4 md:px-8 lg:px-16 text-center">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-5 leading-[1.1]">
                Your Vision Deserves{" "}
                <span className="text-secondary">the Best</span>{" "}
                Care
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-primary-foreground/70 text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                Schedule an appointment today and experience professional, compassionate eye care that puts your health first.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-bold rounded-xl hover:bg-accent/90 transition-all shadow-premium btn-glow text-lg animate-pulse-glow"
                >
                  <Eye size={20} className="group-hover:scale-110 transition-transform" />
                  Schedule Appointment
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary-foreground/20 text-primary-foreground font-bold rounded-xl hover:bg-primary-foreground/10 backdrop-blur-sm transition-all text-lg"
                >
                  Learn About Us
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ───── Impact Counter Sub-component ───── */
const ImpactCounter = ({ end, label, icon: Icon, suffix }: { end: number; label: string; icon: React.ElementType; suffix: string }) => {
  const { count, ref } = useCountUp(end, 2000);
  return (
    <div ref={ref} className="relative overflow-hidden bg-primary-foreground/[0.08] backdrop-blur-xl border border-primary-foreground/10 rounded-2xl p-5 text-center hover:bg-primary-foreground/[0.12] hover:shadow-glass-glow transition-all duration-500 glass-sheen">
      <div className="relative z-10">
        <Icon size={22} className="mx-auto mb-2 text-secondary" />
        <p className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground">{count}{suffix}</p>
        <p className="text-primary-foreground/60 text-xs mt-1 uppercase tracking-wider">{label}</p>
      </div>
    </div>
  );
};

export default Index;
