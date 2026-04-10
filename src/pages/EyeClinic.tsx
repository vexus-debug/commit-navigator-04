import { Link } from "react-router-dom";
import { Reveal } from "@/hooks/use-scroll-reveal";
import { useSiteContent } from "@/contexts/SiteContentContext";

const EyeClinic = () => {
  const { content } = useSiteContent();
  return (
  <div className="overflow-hidden">
    {/* ─── Full-bleed Hero ─── */}
    <section className="relative h-[85vh] min-h-[600px] flex items-end">
      <img
        src={content.clinicHeroImage}
        alt="Eye examination at APCARE Eye Center"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, hsl(213 86% 8% / 0.92) 0%, hsl(213 86% 8% / 0.5) 40%, transparent 70%)",
        }}
      />
      <div className="container relative pb-16 md:pb-24 z-10">
        <Reveal direction="up">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
            style={{
              background: "hsl(var(--secondary) / 0.15)",
              color: "hsl(var(--secondary))",
              backdropFilter: "blur(8px)",
            }}
          >
            Our Services
          </span>
          <h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.08] max-w-4xl"
            style={{ color: "white" }}
          >
            APCARE
            <br />
            Eye Center
          </h1>
          <p
            className="mt-5 text-base sm:text-lg max-w-xl leading-relaxed"
            style={{ color: "hsl(0 0% 100% / 0.72)" }}
          >
            Comprehensive primary eye care — from diagnostic exams to vision correction — right here in Benin City.
          </p>
        </Reveal>
      </div>
    </section>

    {/* ─── Mission Statement Strip ─── */}
    <section
      className="py-16 md:py-24"
      style={{
        background:
          "linear-gradient(135deg, hsl(var(--primary)), hsl(213 86% 22%))",
      }}
    >
      <div className="container">
        <Reveal direction="up">
          <p
            className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed max-w-4xl mx-auto text-center"
            style={{ color: "hsl(0 0% 100% / 0.9)" }}
          >
            "We believe every person deserves access to quality eye care —
            regardless of age, background, or circumstance. That's the
            promise behind everything we do."
          </p>
        </Reveal>
      </div>
    </section>

    {/* ─── About the Clinic ─── */}
    <section className="py-20 md:py-32 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal direction="left">
            <div className="relative">
              <img
                src={content.clinicAboutImage}
                alt="APCARE diagnostic equipment"
                className="rounded-3xl w-full aspect-[4/5] object-cover"
              />
              <div
                className="absolute -bottom-6 -right-4 md:-right-8 rounded-2xl p-5 shadow-2xl max-w-[220px]"
                style={{
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                }}
              >
                <p className="text-3xl font-bold">500+</p>
                <p className="text-sm mt-1 opacity-80">Patients examined and treated</p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.15}>
            <div>
              <span className="text-sm font-semibold tracking-widest uppercase text-secondary mb-4 block">
                About Our Clinic
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
                Primary Eye Care, <br className="hidden md:block" />
                Professional Standards
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  APCARE Eye Center provides expert diagnosis and treatment for a wide range of eye conditions. Our clinic is equipped with modern diagnostic technology including auto refractometers and lensometers for precise assessments.
                </p>
                <p>
                  We serve patients of all ages — from pediatric screenings to adult vision correction and elderly eye care. Every consultation is thorough, personalized, and focused on your long-term eye health.
                </p>
                <p>
                  From your very first visit to ongoing follow-up care, every step is guided by compassion, precision, and a commitment to keeping your vision sharp and your eyes healthy.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* ─── Services ─── */}
    <section className="section-blue py-20 md:py-32">
      <div className="container">
        <Reveal direction="up">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase text-secondary mb-3 block">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Our Services
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Large featured card */}
          <Reveal direction="up" className="lg:col-span-2 lg:row-span-2">
            <div className="relative rounded-3xl overflow-hidden h-full min-h-[400px] group">
              <img
                src={content.clinicImages[2] || ""}
                alt="Comprehensive eye examination"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, hsl(213 86% 8% / 0.88) 0%, hsl(213 86% 8% / 0.3) 50%, transparent 100%)",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <span
                  className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase mb-3"
                  style={{
                    background: "hsl(var(--secondary) / 0.2)",
                    color: "hsl(var(--secondary))",
                  }}
                >
                  Primary Service
                </span>
                <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "white" }}>
                  Comprehensive Eye Exams
                </h3>
                <p className="max-w-md leading-relaxed" style={{ color: "hsl(0 0% 100% / 0.75)" }}>
                  Full diagnostic evaluation including visual acuity testing, refraction tests, eye pressure testing, retina examination, and eye muscle function testing.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <ServiceImageCard
              image={content.clinicImages[3] || ""}
              alt="Vision correction with prescription glasses"
              title="Vision Correction"
              description="Expert solutions for myopia, hyperopia, astigmatism, and presbyopia — including prescription glasses and contact lens fitting."
            />
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <ServiceImageCard
              image={content.clinicImages[4] || ""}
              alt="Pediatric eye screening"
              title="Pediatric Eye Care"
              description="Specialized screenings for children: vision assessment, lazy eye detection, crossed eyes diagnosis, and learning-related vision evaluations."
            />
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <ServiceImageCard
              image={content.clinicImages[0] || ""}
              alt="Eye health education session"
              title="Eye Health Education"
              description="Guidance on screen time, eye hygiene, nutrition for eye health, and preventive strategies against common eye diseases."
            />
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <ServiceImageCard
              image={content.clinicImages[1] || ""}
              alt="Optical products and frames"
              title="Optical Products"
              description="A wide selection of quality frames, lenses, and eyewear — fitted and prescribed to match your exact needs."
            />
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <ServiceImageCard
              image={content.clinicImages[5] || ""}
              alt="Follow-up care and monitoring"
              title="Follow-Up & Management"
              description="Ongoing monitoring and management of chronic eye conditions including glaucoma, cataracts, and age-related vision changes."
            />
          </Reveal>
        </div>
      </div>
    </section>

    {/* ─── Equipment & Technology ─── */}
    <section className="relative py-32 md:py-44">
      <img
        src={content.clinicImages[0] || ""}
        alt="APCARE diagnostic equipment"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(213 86% 8% / 0.88), hsl(213 60% 16% / 0.75))",
        }}
      />
      <div className="container relative z-10">
        <div className="max-w-2xl">
          <Reveal direction="up">
            <span className="text-sm font-semibold tracking-widest uppercase mb-4 block" style={{ color: "hsl(var(--secondary))" }}>
              Technology You Can Trust
            </span>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6" style={{ color: "white" }}>
              Modern Equipment, Accurate Results
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: "hsl(0 0% 100% / 0.75)" }}>
              Our clinic is equipped with state-of-the-art diagnostic tools — including auto refractometers, lensometers, and comprehensive examination stations — ensuring every diagnosis is precise and every prescription is perfect.
            </p>
            <div className="flex flex-wrap gap-4">
              <StatPill label="Patients Examined" value="500+" />
              <StatPill label="Satisfaction Rate" value="100%" />
              <StatPill label="Glasses Prescribed" value="300+" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* ─── Clinic Hours ─── */}
    <section className="py-20 md:py-32 bg-background">
      <div className="container max-w-3xl">
        <Reveal direction="up">
          <div
            className="rounded-3xl p-8 md:p-12 shadow-xl"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--primary)), hsl(213 86% 22%))",
            }}
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "white" }}>
                Clinic Hours
              </h2>
              <p className="text-sm mt-2" style={{ color: "hsl(0 0% 100% / 0.65)" }}>
                Walk-ins welcome · Appointments preferred
              </p>
            </div>

            <div className="space-y-0 divide-y" style={{ borderColor: "hsl(0 0% 100% / 0.12)" }}>
              {[
                { day: "Monday — Friday", time: "8:00 AM – 6:00 PM" },
                { day: "Saturday", time: "9:00 AM – 3:00 PM" },
                { day: "Sunday", time: "Closed" },
              ].map((h) => (
                <div
                  key={h.day}
                  className="flex justify-between items-center py-4"
                  style={{ borderColor: "hsl(0 0% 100% / 0.12)" }}
                >
                  <span className="font-medium" style={{ color: "hsl(0 0% 100% / 0.9)" }}>
                    {h.day}
                  </span>
                  <span className="text-sm" style={{ color: "hsl(var(--secondary))" }}>
                    {h.time}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: "hsl(0 0% 100% / 0.12)",
                  color: "white",
                  border: "1px solid hsl(0 0% 100% / 0.18)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "hsl(0 0% 100% / 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "hsl(0 0% 100% / 0.12)";
                }}
              >
                Schedule Appointment →
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* ─── CTA ─── */}
    <section className="relative py-24 md:py-32">
      <img
        src={content.clinicImages[5] || ""}
        alt="APCARE Eye Center"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(213 86% 8% / 0.9), hsl(193 90% 20% / 0.85))",
        }}
      />
      <div className="container relative z-10 text-center">
        <Reveal direction="up">
          <h2 className="text-3xl md:text-5xl font-bold mb-5" style={{ color: "white" }}>
            Your Vision Is Our Priority
          </h2>
          <p className="text-base md:text-lg max-w-xl mx-auto mb-8" style={{ color: "hsl(0 0% 100% / 0.72)" }}>
            Whether you need a routine check-up or specialized treatment, APCARE Eye Center is here to help you see the world clearly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="px-7 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-lg"
              style={{
                background: "hsl(var(--secondary))",
                color: "hsl(var(--secondary-foreground))",
              }}
            >
              Schedule Appointment
            </Link>
            <Link
              to="/about"
              className="px-7 py-3.5 rounded-xl font-semibold text-sm transition-all"
              style={{
                background: "hsl(0 0% 100% / 0.1)",
                color: "white",
                border: "1px solid hsl(0 0% 100% / 0.2)",
              }}
            >
              Learn About Us
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  </div>
  );
};

/* ─── Sub-components ─── */

const ServiceImageCard = ({
  image,
  alt,
  title,
  description,
}: {
  image: string;
  alt: string;
  title: string;
  description: string;
}) => (
  <div className="relative rounded-3xl overflow-hidden aspect-[4/5] group h-full">
    <img
      src={image}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(to top, hsl(213 86% 8% / 0.88) 0%, hsl(213 86% 8% / 0.2) 60%, transparent 100%)",
      }}
    />
    <div className="absolute bottom-0 left-0 right-0 p-6">
      <h3 className="text-lg font-bold mb-1.5" style={{ color: "white" }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "hsl(0 0% 100% / 0.72)" }}>
        {description}
      </p>
    </div>
  </div>
);

const StatPill = ({ label, value }: { label: string; value: string }) => (
  <div
    className="rounded-2xl px-5 py-3"
    style={{
      background: "hsl(0 0% 100% / 0.08)",
      border: "1px solid hsl(0 0% 100% / 0.12)",
    }}
  >
    <p className="text-xl md:text-2xl font-bold" style={{ color: "white" }}>
      {value}
    </p>
    <p className="text-xs mt-0.5" style={{ color: "hsl(0 0% 100% / 0.6)" }}>
      {label}
    </p>
  </div>
);

export default EyeClinic;
