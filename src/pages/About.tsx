import { Link } from "react-router-dom";
import {
  Award,
  Target,
  Users,
  Heart,
  ArrowRight,
  Sparkles,
  Calendar,
  Eye,
  Shield,
  MapPin,
} from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-reveal";
import { useSiteContent } from "@/contexts/SiteContentContext";

const About = () => {
  const { content } = useSiteContent();
  return (
  <div className="overflow-hidden">
    {/* ═══════ CINEMATIC HERO ═══════ */}
    <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img src={content.aboutHeroImage} alt="" className="w-full h-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-primary/45 md:bg-primary/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-primary/35 md:from-primary md:via-primary/78 md:to-primary/20" />
        <div className="absolute inset-y-0 left-0 right-0 md:right-[20%] bg-gradient-to-r from-primary/85 via-primary/60 to-transparent" />
      </div>

      <div className="relative z-10 px-4 md:px-8 lg:px-16 pb-16 md:pb-24 w-full">
        <div className="max-w-4xl">
          <Reveal direction="up" delay={0.1}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 border border-secondary/25 text-secondary text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles size={12} /> Our Story
            </span>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05]">
              Trusted Eye Care,<br />
              <span className="text-secondary">Right Here in Benin City</span>
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.3}>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed">
              APCARE Eye Center is committed to providing professional, reliable, and compassionate primary eye care services to every member of our community.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1 h-3 rounded-full bg-secondary animate-bounce" />
        </div>
      </div>
    </section>

    {/* ═══════ THE ORIGIN ═══════ */}
    <section className="relative py-20 md:py-32">
      <div className="absolute inset-0 bg-primary" />

      <div className="relative z-10 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal direction="left">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-secondary/20 to-primary/10 rounded-[2rem] blur-xl" />
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                  <img src={content.milestones[0]?.image} alt="APCARE Eye Center" className="w-full aspect-[4/5] object-cover" />
                </div>
                <div className="absolute -bottom-6 -right-4 md:-right-8 bg-secondary text-secondary-foreground rounded-2xl px-6 py-4 shadow-xl shadow-secondary/30">
                  <p className="font-heading text-3xl font-bold">2024</p>
                  <p className="text-xs font-semibold uppercase tracking-wider opacity-80">Est.</p>
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal direction="right" delay={0.1}>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground md:text-foreground mb-6 leading-tight">
                  Built on a <span className="text-secondary">Vision</span> of Trust
                </h2>
              </Reveal>

              <Reveal direction="right" delay={0.2}>
                <p className="text-primary-foreground/70 md:text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
                  APCARE Eye Center was founded with a simple but powerful mission: to bring professional, accessible eye care to the people of Benin City and its surrounding communities.
                </p>
              </Reveal>

              <Reveal direction="right" delay={0.3}>
                <p className="text-primary-foreground/70 md:text-muted-foreground text-base leading-relaxed mb-5">
                  We recognized that many individuals in our community were going without proper eye examinations — leading to preventable vision loss and reduced quality of life.
                </p>
              </Reveal>

              <Reveal direction="right" delay={0.4}>
                <p className="text-primary-foreground/70 md:text-muted-foreground text-base leading-relaxed mb-8">
                  So we built a clinic that combines <strong className="text-primary-foreground md:text-foreground">modern diagnostic technology</strong> with a warm, patient-first approach — ensuring that every person who walks through our doors receives the care they deserve.
                </p>
              </Reveal>

              <Reveal direction="right" delay={0.5}>
                <div className="flex flex-wrap gap-3">
                  <Link to="/eye-clinic" className="group inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20 text-sm">
                    Our Services <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 border border-primary-foreground/20 md:border-border text-primary-foreground md:text-foreground font-semibold rounded-xl hover:bg-primary-foreground/10 md:hover:bg-muted transition-all text-sm">
                    <Calendar size={16} /> Visit Us
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ═══════ MISSION & VISION ═══════ */}
    <section className="relative py-16 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-[hsl(var(--section-blue,220_40%_96%))]" />

      <div className="relative z-10 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-12 md:mb-20">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Our Mission &amp; <span className="text-secondary">Vision</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                Guided by purpose, driven by care.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <Reveal direction="left" delay={0.1}>
              <div className="group relative rounded-3xl overflow-hidden h-full">
                <div className="absolute inset-0">
                  <img src={content.aboutOriginImages[0] || ""} alt="APCARE Mission" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-primary/35" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-primary/30" />
                </div>
                <div className="relative z-10 p-8 md:p-10 flex flex-col justify-end min-h-[400px] md:min-h-[480px]">
                  <div className="w-14 h-14 rounded-2xl bg-primary-foreground/12 backdrop-blur-sm text-primary-foreground flex items-center justify-center mb-5 border border-primary-foreground/10">
                    <Eye size={28} />
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">Our Mission</h3>
                  <p className="text-white/90 leading-relaxed mb-4 max-w-xl">
                    To provide exceptional primary eye care services that enhance the vision health of our community — one patient at a time, with integrity, compassion, and excellence.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Comprehensive Exams", "Vision Correction", "Pediatric Care", "Education"].map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full bg-primary/45 text-primary-foreground text-xs font-medium border border-primary-foreground/10">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.2}>
              <div className="group relative rounded-3xl overflow-hidden h-full">
                <div className="absolute inset-0">
                  <img src={content.aboutOriginImages[1] || ""} alt="APCARE Vision" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-primary/35" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-primary/30" />
                </div>
                <div className="relative z-10 p-8 md:p-10 flex flex-col justify-end min-h-[400px] md:min-h-[480px]">
                  <div className="w-14 h-14 rounded-2xl bg-primary-foreground/12 backdrop-blur-sm text-secondary flex items-center justify-center mb-5 border border-primary-foreground/10">
                    <Target size={28} />
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">Our Vision</h3>
                  <p className="text-white/90 leading-relaxed mb-4 max-w-xl">
                    To become the most trusted and innovative eye care provider in Benin City and beyond — setting the standard for professional, accessible, and patient-centered eye health services.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Trust", "Innovation", "Accessibility", "Excellence"].map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full bg-primary/45 text-primary-foreground text-xs font-medium border border-primary-foreground/10">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>

    {/* ═══════ TIMELINE JOURNEY ═══════ */}
    <section className="relative py-16 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(213 86% 8%), hsl(213 60% 14%), hsl(213 86% 10%))' }}>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(hsl(var(--secondary)) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="relative z-10 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12 md:mb-20">
              <span className="text-secondary text-xs uppercase tracking-[0.25em] font-bold mb-4 block">Our Journey</span>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
                Growing <span className="text-secondary">Together</span>
              </h2>
              <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto">
                Key moments that have shaped APCARE Eye Center.
              </p>
            </div>
          </Reveal>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-secondary/50 via-secondary/20 to-transparent" />

            {content.milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <Reveal key={i} delay={i * 0.1} direction={isLeft ? "left" : "right"}>
                  <div className={`relative flex flex-col md:flex-row items-start mb-16 last:mb-0 ${isLeft ? "" : "md:flex-row-reverse"}`}>
                    <div className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-0" : "md:pl-0"}`}>
                      <div className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/8 transition-all duration-500">
                        <div className="relative h-48 md:h-56 overflow-hidden">
                          <img src={m.image} alt={m.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/15" />
                          <span className="absolute bottom-4 left-4 font-heading text-4xl font-bold text-secondary">{m.year}</span>
                        </div>
                        <div className="p-6">
                          <h3 className="font-heading text-xl font-bold text-white mb-2">{m.title}</h3>
                          <p className="text-white/60 text-sm leading-relaxed">{m.desc}</p>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 w-5 h-5 rounded-full bg-secondary shadow-lg shadow-secondary/40 ring-4 ring-[hsl(213,86%,10%)] z-10" />
                    <div className="hidden md:block w-[calc(50%-2rem)]" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>

    {/* ═══════ VALUES ═══════ */}
    <section className="relative py-16 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-[hsl(var(--section-warm,35_60%_96%))]" />

      <div className="relative z-10 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                What We <span className="text-secondary">Stand For</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
                The principles that guide everything we do.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Integrity", desc: "Ethical medical practices and complete transparency with every patient, every time.", gradient: "from-primary to-primary/60" },
              { icon: Heart, title: "Compassion", desc: "A warm, supportive environment where every patient feels heard, respected, and cared for.", gradient: "from-secondary to-secondary/60" },
              { icon: Award, title: "Excellence", desc: "High-quality clinical services delivered by skilled, dedicated eye care professionals.", gradient: "from-accent to-accent/60" },
              { icon: Target, title: "Innovation", desc: "Embracing modern diagnostic tools and updated treatment techniques for the best outcomes.", gradient: "from-primary to-secondary" },
            ].map((v, i) => (
              <Reveal key={i} delay={i * 0.1} direction="up">
                <div className="group relative p-8 rounded-3xl bg-background border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-500 h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <v.icon size={26} className="text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ═══════ COMMITMENT + IMAGE MOSAIC ═══════ */}
    <section className="relative py-16 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(213 86% 8%), hsl(213 60% 14%))' }}>
      <div className="relative z-10 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <Reveal direction="left">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <div className="rounded-2xl overflow-hidden aspect-[3/4]">
                    <img src={content.aboutBottomImages[0] || ""} alt="APCARE equipment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="rounded-2xl overflow-hidden aspect-square">
                    <img src={content.aboutBottomImages[1] || content.aboutOriginImages[0] || ""} alt="APCARE clinic" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                </div>
                <div className="space-y-3 pt-8">
                  <div className="rounded-2xl overflow-hidden aspect-square">
                    <img src={content.aboutBottomImages[2] || content.aboutOriginImages[1] || ""} alt="Eyewear selection" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="rounded-2xl overflow-hidden aspect-[3/4]">
                    <img src={content.aboutOriginImages[0] || ""} alt="Reception" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.2}>
              <div>
                <span className="text-secondary text-xs uppercase tracking-[0.25em] font-bold mb-4 block">Our Promise</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  Our Commitment to You
                </h2>
                <p className="text-white/60 leading-relaxed mb-5">
                  At APCARE, we are guided by a commitment to community health, professional standards, and patient-centered care.
                </p>
                <p className="text-white/60 leading-relaxed mb-8">
                  We continuously invest in training, equipment, and processes to ensure that every visit exceeds expectations — because Benin City deserves world-class eye care.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/contact" className="group inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20 text-sm">
                    Get in Touch <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/gallery" className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all text-sm">
                    View Gallery
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>

    {/* ═══════ LOCATION CTA ═══════ */}
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-[hsl(213,86%,25%)] to-secondary" />
      <div className="absolute top-10 right-[10%] w-80 h-80 rounded-full bg-secondary/20 blur-[100px]" />

      <div className="relative z-10 px-4 md:px-8 lg:px-16 text-center">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <MapPin size={40} className="mx-auto text-secondary mb-6" />
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              Visit Us in Benin City
            </h2>
            <p className="text-primary-foreground/70 text-base md:text-lg mb-8">
              202 Upper Mission Extension, Aduwawa / 76 Village Road, Benin City, Nigeria.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/contact" className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-bold rounded-xl hover:bg-accent/90 transition-all shadow-2xl shadow-accent/30">
                Contact Us <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/gallery" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary-foreground/25 text-primary-foreground font-bold rounded-xl hover:bg-primary-foreground/10 transition-all">
                View Gallery
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  </div>
  );
};

export default About;
