import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { loadSiteContent, saveSiteContentKey } from "@/lib/supabase-content";

// Image imports for defaults
import apcareOffice from "@/assets/apcare-office.webp";
import apcareReception from "@/assets/apcare-reception.webp";
import apcareExam from "@/assets/apcare-exam.webp";
import apcareEquipment1 from "@/assets/apcare-equipment1.webp";
import apcareGlasses from "@/assets/apcare-glasses.webp";
import apcareEquipment2 from "@/assets/apcare-equipment2.webp";

// All editable site content in one place
export interface HeroSlide {
  tag: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaTo: string;
  image: string;
}

export interface Stat {
  value: number;
  label: string;
  suffix: string;
  isYear?: boolean;
}

export interface Service {
  title: string;
  desc: string;
  color: "primary" | "secondary" | "accent";
}

export interface JourneyStep {
  step: string;
  title: string;
  desc: string;
}

export interface Testimonial {
  text: string;
  name: string;
  role: string;
  initials: string;
}

export interface ProgramItem {
  title: string;
  desc: string;
  duration: string;
  image: string;
}

export interface BlogPost {
  date: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
}

export interface DonateWay {
  title: string;
  desc: string;
}

export interface ContactInfo {
  address: string[];
  phones: string[];
  emails: string[];
  hours: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
  span?: string;
}

export interface MilestoneItem {
  year: string;
  title: string;
  desc: string;
  image: string;
}

export interface HomeMissionSpotlight {
  image: string;
  caption: string;
  quote: string;
  quoteAuthor: string;
}

export interface HomeSpotlightFeature {
  image: string;
  tag: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaLink: string;
}

export interface SiteContent {
  // Global
  whatsappNumber: string;
  socials: SocialLink[];
  contactInfo: ContactInfo;

  // Home page
  heroSlides: HeroSlide[];
  stats: Stat[];
  aboutSection: { subtitle: string; title: string; description: string; description2: string };
  homeMissionSpotlight: HomeMissionSpotlight;
  homeSpotlightFeature: HomeSpotlightFeature;
  services: Service[];
  journeySteps: JourneyStep[];
  testimonials: Testimonial[];
  programs: ProgramItem[];
  impactStats: { value: number; label: string; suffix: string }[];
  whyChooseUs: { title: string; desc: string }[];
  partners: string[];
  visitCards: { title: string; lines: string[] }[];
  finalCta: { title: string; description: string };

  // Home page images
  homeAboutBgImage: string;
  homeImpactBgImage: string;
  homeGalleryImages: string[];
  homeProfImage: string;

  // About page
  aboutHero: { tag: string; title: string; subtitle: string };
  aboutHeroImage: string;
  aboutOrigin: { title: string; paragraphs: string[] };
  aboutOriginImages: string[];
  milestones: MilestoneItem[];
  directorBio: { name: string; role: string; email: string; paragraphs: string[]; specialties: string[] };
  directorImage: string;
  values: { title: string; desc: string }[];
  boardSection: { title: string; paragraphs: string[] };
  aboutBottomImages: string[];

  // Eye Clinic page
  clinicHero: { tag: string; title: string; subtitle: string };
  clinicHeroImage: string;
  clinicMission: string;
  clinicAbout: { subtitle: string; title: string; paragraphs: string[] };
  clinicAboutImage: string;
  clinicServices: { title: string; description: string }[];
  surgicalStats: { label: string; value: string }[];
  clinicHours: { day: string; time: string }[];
  clinicCta: { title: string; description: string };
  clinicImages: string[];

  // Blog page
  blogHero: { subtitle: string; title: string; description: string };
  blogPosts: BlogPost[];

  // Donate page
  donateHero: { subtitle: string; title: string; description: string };
  donateWhy: { title: string; paragraphs: string[] };
  donateWays: DonateWay[];
  donateCta: { title: string; description: string; email: string; phone: string };
  donateImage: string;

  // Contact page
  contactHero: { subtitle: string; title: string; description: string };

  // Gallery page
  galleryHero: { tag: string; title: string; subtitle: string };
  galleryImages: GalleryImage[];

  // Footer
  footerCta: string;
  footerBrand: { name: string; tagline: string; description: string };
  footerCopyright: string;

  // Navbar
  navBrand: { name: string; tagline: string };
}

const defaultContent: SiteContent = {
  whatsappNumber: "2347038847355",
  socials: [
    { platform: "Facebook", url: "#" },
    { platform: "Instagram", url: "#" },
  ],
  contactInfo: {
    address: ["202 Upper Mission Extension,", "Aduwawa / 76 Village Road,", "Benin City, Nigeria"],
    phones: ["07038847355"],
    emails: ["apcareonline@gmail.com"],
    hours: ["Mon-Fri: 8AM – 6PM", "Sat: 9AM – 3PM", "Sun: Closed"],
  },
  heroSlides: [
    { tag: "Your Trusted Eye Clinic", title: "APCARE Eye Center", subtitle: "Professional, reliable, and patient-focused eye care right here in Benin City.", ctaLabel: "Our Services", ctaTo: "/eye-clinic", image: apcareOffice },
    { tag: "Comprehensive Eye Exams", title: "Clear Vision, Brighter Future", subtitle: "Advanced diagnostic technology to evaluate your eye health with precision and care.", ctaLabel: "Book an Exam", ctaTo: "/contact", image: apcareExam },
    { tag: "Vision Correction", title: "See the World in Focus", subtitle: "Prescription glasses, contact lenses, and expert vision correction tailored to your needs.", ctaLabel: "Explore Services", ctaTo: "/eye-clinic", image: apcareGlasses },
    { tag: "Pediatric Eye Care", title: "Caring for Young Eyes", subtitle: "Specialized screenings and treatments for children — because healthy vision starts early.", ctaLabel: "Learn More", ctaTo: "/eye-clinic", image: apcareReception },
    { tag: "Eye Health Education", title: "Knowledge Is Prevention", subtitle: "Empowering our community with the information they need to protect their eyes for life.", ctaLabel: "About Us", ctaTo: "/about", image: apcareEquipment1 },
    { tag: "Modern Equipment", title: "Technology You Can Trust", subtitle: "State-of-the-art diagnostic tools for accurate assessments and better outcomes.", ctaLabel: "Visit Us", ctaTo: "/contact", image: apcareEquipment2 },
  ],
  stats: [
    { value: 2024, label: "Year Established", suffix: "", isYear: true },
    { value: 500, label: "Patients Served", suffix: "+" },
    { value: 4, label: "Core Services", suffix: "" },
    { value: 100, label: "Patient Satisfaction", suffix: "%" },
  ],
  aboutSection: {
    subtitle: "Who We Are",
    title: "Your Trusted Eye Clinic — Right Next Door",
    description: "APCARE Eye Center is a primary eye care clinic in Benin City, Nigeria, dedicated to providing exceptional, personalized eye health services to every patient who walks through our doors.",
    description2: "From comprehensive eye exams and vision correction to pediatric screenings and eye health education — we combine modern diagnostic technology with genuine compassion to keep your vision clear and your eyes healthy.",
  },
  services: [
    { title: "Comprehensive Eye Exams", desc: "Thorough evaluations including visual acuity, refraction, eye pressure, and retina examination.", color: "secondary" },
    { title: "Vision Correction", desc: "Prescription glasses, contact lenses, and expert solutions for myopia, hyperopia, and astigmatism.", color: "primary" },
    { title: "Pediatric Eye Care", desc: "Specialized screenings for children — detecting lazy eye, crossed eyes, and learning-related vision issues.", color: "accent" },
    { title: "Eye Health Education", desc: "Workshops and guidance on screen time, eye hygiene, nutrition, and preventive strategies.", color: "secondary" },
  ],
  journeySteps: [
    { step: "01", title: "Reach Out", desc: "Call us or visit our Benin City clinic to schedule your appointment." },
    { step: "02", title: "Eye Examination", desc: "A thorough assessment using state-of-the-art diagnostic equipment." },
    { step: "03", title: "Diagnosis & Plan", desc: "Receive a clear diagnosis and a personalized treatment plan." },
    { step: "04", title: "Clear Vision", desc: "Walk out with corrected vision and ongoing support for eye health." },
  ],
  testimonials: [
    { text: "APCARE changed my life. I had been struggling with blurry vision for years, and they diagnosed and corrected it in one visit. Truly professional.", name: "Mrs. Ehi Okonkwo", role: "Patient", initials: "EO" },
    { text: "My daughter's vision problem was caught early thanks to APCARE's pediatric screening. The staff is incredibly caring and thorough.", name: "Mr. Osaze Igbinovia", role: "Parent", initials: "OI" },
    { text: "The best eye clinic in Benin City, hands down. Modern equipment, friendly staff, and they genuinely care about your eye health.", name: "Dr. Emeka Afolabi", role: "Colleague", initials: "EA" },
    { text: "I appreciate how they took the time to educate me about eye care. Not just a prescription — but real knowledge to protect my vision long-term.", name: "Grace Ogiemwanye", role: "Patient", initials: "GO" },
  ],
  programs: [
    { title: "Community Eye Screening", desc: "Free vision screenings for schools, churches, and community organizations across Benin City.", duration: "Ongoing", image: apcareExam },
    { title: "Eye Health Workshop", desc: "Educational seminars on screen time management, eye nutrition, and preventive eye care for all ages.", duration: "Monthly", image: apcareGlasses },
    { title: "Back-to-School Eye Check", desc: "Annual program offering discounted pediatric eye exams to ensure every child starts the school year seeing clearly.", duration: "Annual", image: apcareReception },
  ],
  impactStats: [
    { value: 500, label: "Patients Examined", suffix: "+" },
    { value: 300, label: "Glasses Prescribed", suffix: "+" },
    { value: 100, label: "Children Screened", suffix: "+" },
    { value: 50, label: "Community Outreaches", suffix: "+" },
  ],
  whyChooseUs: [
    { title: "Professional Expertise", desc: "Our team of skilled eye care specialists brings years of clinical experience to every consultation and diagnosis." },
    { title: "Modern Technology", desc: "We use the latest diagnostic equipment — auto refractometers, lensometers, and more — for accurate, reliable results." },
    { title: "Patient-Centered Care", desc: "Every visit is personalized. We listen, we explain, and we make sure you leave with clear answers and clear vision." },
    { title: "Affordable Services", desc: "Quality eye care shouldn't break the bank. We offer competitive pricing and flexible options for every budget." },
    { title: "Community Trust", desc: "Benin City trusts APCARE. Our growing reputation is built on integrity, compassion, and consistent results." },
    { title: "Comprehensive Solutions", desc: "From diagnosis to prescription to follow-up — everything under one roof, so you never have to run around." },
  ],
  partners: [],
  visitCards: [
    { title: "Location", lines: ["202 Upper Mission Extension, Aduwawa", "76 Village Road", "Benin City, Nigeria"] },
    { title: "Clinic Hours", lines: ["Mon – Fri: 8:00 AM – 6:00 PM", "Saturday: 9:00 AM – 3:00 PM", "Sunday: Closed"] },
    { title: "Contact", lines: ["07038847355", "apcareonline@gmail.com"] },
  ],
  homeMissionSpotlight: {
    image: apcareExam,
    caption: "Patient consultation at APCARE Eye Center",
    quote: "We don't just correct vision — we build trust, one patient at a time.",
    quoteAuthor: "APCARE Eye Center",
  },
  homeSpotlightFeature: {
    image: apcareGlasses,
    tag: "Eye Health Education",
    title: "Empowering Our Community Through Eye Care Knowledge",
    description: "We believe prevention is the best medicine. Through workshops, school screenings, and patient education, we help Benin City residents protect their most precious sense — their sight.",
    ctaLabel: "Learn About Our Programs",
    ctaLink: "/about",
  },
  finalCta: { title: "Your Vision Deserves the Best Care", description: "Schedule an appointment today and experience professional, compassionate eye care that puts your health first." },
  homeAboutBgImage: apcareOffice,
  homeImpactBgImage: apcareEquipment2,
  homeGalleryImages: [apcareOffice, apcareExam, apcareGlasses, apcareReception],
  homeProfImage: apcareOffice,
  aboutHero: { tag: "Our Story", title: "Trusted Eye Care, Right Here in Benin City", subtitle: "APCARE Eye Center is committed to providing professional, reliable, and compassionate primary eye care services to every member of our community." },
  aboutHeroImage: apcareOffice,
  aboutOrigin: {
    title: "Built on a Vision of Trust and Care",
    paragraphs: [
      "APCARE Eye Center was founded with a simple but powerful mission: to bring professional, accessible eye care to the people of Benin City and its surrounding communities.",
      "We recognized that many individuals in our community were going without proper eye examinations — leading to preventable vision loss and reduced quality of life.",
      "So we built a clinic that combines modern diagnostic technology with a warm, patient-first approach — ensuring that every person who walks through our doors receives the care they deserve.",
    ],
  },
  aboutOriginImages: [apcareReception, apcareEquipment1],
  milestones: [
    { year: "2024", title: "APCARE Eye Center Opens", desc: "Doors opened at 202 Upper Mission Extension, Aduwawa, bringing professional primary eye care to the heart of Benin City.", image: apcareOffice },
    { year: "2024", title: "First Community Screening", desc: "Conducted our first free eye screening event, serving dozens of community members and raising awareness about eye health.", image: apcareExam },
    { year: "2025", title: "Pediatric Program Launched", desc: "Introduced our dedicated pediatric eye care program, partnering with local schools to screen children's vision early.", image: apcareReception },
    { year: "2025", title: "Growing Trust", desc: "Surpassed 500 patients served, earning a reputation as one of Benin City's most trusted eye care providers.", image: apcareGlasses },
  ],
  directorBio: {
    name: "APCARE Eye Center Team",
    role: "Professional Eye Care Specialists",
    email: "apcareonline@gmail.com",
    paragraphs: [
      "Our team of dedicated eye care professionals brings together clinical expertise, modern diagnostic skills, and a genuine passion for patient wellness.",
      "Every member of the APCARE team is committed to delivering accurate diagnoses, personalized treatment plans, and ongoing support — because your vision is our priority.",
    ],
    specialties: ["Comprehensive Eye Exams", "Vision Correction", "Pediatric Eye Care", "Eye Health Education"],
  },
  directorImage: apcareOffice,
  values: [
    { title: "Integrity", desc: "Ethical medical practices and complete transparency with every patient, every time." },
    { title: "Compassion", desc: "A warm, supportive environment where every patient feels heard, respected, and cared for." },
    { title: "Excellence", desc: "High-quality clinical services delivered by skilled, dedicated eye care professionals." },
    { title: "Innovation", desc: "Embracing modern diagnostic tools and updated treatment techniques for the best outcomes." },
  ],
  boardSection: {
    title: "Our Commitment",
    paragraphs: [
      "At APCARE, we are guided by a commitment to community health, professional standards, and patient-centered care.",
      "We continuously invest in training, equipment, and processes to ensure that every visit exceeds expectations — because Benin City deserves world-class eye care.",
    ],
  },
  aboutBottomImages: [apcareEquipment1, apcareEquipment2, apcareGlasses],
  clinicHero: { tag: "Our Services", title: "APCARE Eye Center", subtitle: "Comprehensive primary eye care — from diagnostic exams to vision correction — right here in Benin City." },
  clinicHeroImage: apcareExam,
  clinicMission: "We believe every person deserves access to quality eye care — regardless of age, background, or circumstance. That's the promise behind everything we do.",
  clinicAbout: {
    subtitle: "About Our Clinic",
    title: "Primary Eye Care, Professional Standards",
    paragraphs: [
      "APCARE Eye Center provides expert diagnosis and treatment for a wide range of eye conditions. Our clinic is equipped with modern diagnostic technology including auto refractometers and lensometers for precise assessments.",
      "We serve patients of all ages — from pediatric screenings to adult vision correction and elderly eye care. Every consultation is thorough, personalized, and focused on your long-term eye health.",
      "From your very first visit to ongoing follow-up care, every step is guided by compassion, precision, and a commitment to keeping your vision sharp and your eyes healthy.",
    ],
  },
  clinicAboutImage: apcareEquipment2,
  clinicServices: [
    { title: "Comprehensive Eye Exams", description: "Full diagnostic evaluation including visual acuity testing, refraction tests, eye pressure testing, retina examination, and eye muscle function testing." },
    { title: "Vision Correction", description: "Expert solutions for myopia, hyperopia, astigmatism, and presbyopia — including prescription glasses and contact lens fitting." },
    { title: "Pediatric Eye Care", description: "Specialized screenings for children: vision assessment, lazy eye detection, crossed eyes diagnosis, and learning-related vision evaluations." },
    { title: "Eye Health Education", description: "Guidance on screen time, eye hygiene, nutrition for eye health, and preventive strategies against common eye diseases." },
    { title: "Optical Products", description: "A wide selection of quality frames, lenses, and eyewear — fitted and prescribed to match your exact needs." },
    { title: "Follow-Up & Management", description: "Ongoing monitoring and management of chronic eye conditions including glaucoma, cataracts, and age-related vision changes." },
  ],
  surgicalStats: [
    { label: "Patients Examined", value: "500+" },
    { label: "Satisfaction Rate", value: "100%" },
    { label: "Glasses Prescribed", value: "300+" },
  ],
  clinicHours: [
    { day: "Monday — Friday", time: "8:00 AM – 6:00 PM" },
    { day: "Saturday", time: "9:00 AM – 3:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
  clinicCta: { title: "Your Vision Is Our Priority", description: "Whether you need a routine check-up or specialized treatment, APCARE Eye Center is here to help you see the world clearly." },
  clinicImages: [apcareEquipment1, apcareEquipment2, apcareExam, apcareGlasses, apcareReception, apcareOffice],
  blogHero: { subtitle: "Eye Care Tips & News", title: "APCARE Blog", description: "Updates, tips, and insights on eye health from the team at APCARE Eye Center." },
  blogPosts: [
    { date: "March 10, 2026", title: "5 Signs You Need an Eye Exam", excerpt: "Don't ignore these warning signs — blurry vision, headaches, and eye strain could mean it's time for a professional check-up.", category: "Eye Health", image: apcareExam },
    { date: "February 20, 2026", title: "Why Children Need Regular Eye Screenings", excerpt: "Early detection of vision problems can prevent long-term issues. Here's why pediatric eye care matters.", category: "Pediatrics", image: apcareGlasses },
    { date: "January 15, 2026", title: "Protecting Your Eyes from Screen Fatigue", excerpt: "In the age of screens, your eyes need extra care. Simple habits that can make a big difference.", category: "Prevention", image: apcareOffice },
  ],
  donateHero: { subtitle: "Support Eye Health", title: "Support APCARE", description: "Help us bring quality eye care to more people in Benin City and beyond." },
  donateWhy: {
    title: "Why Your Support Matters",
    paragraphs: [
      "Many people in Benin City go without proper eye care simply because they can't afford it. Your support helps us bridge that gap.",
      "Your contribution helps fund: free community eye screenings, subsidized treatments for low-income patients, school vision programs for children, and new diagnostic equipment.",
      "Together, we can ensure that no one in our community goes without the eye care they need.",
    ],
  },
  donateWays: [
    { title: "Make a Donation", desc: "Your financial contribution directly funds free screenings, equipment upgrades, and subsidized care for those in need." },
    { title: "Volunteer Your Time", desc: "Optometrists, nurses, and community organizers — share your skills to support our outreach programs." },
    { title: "Sponsor a Screening", desc: "Fund a community eye screening event that serves dozens of people who wouldn't otherwise have access to care." },
    { title: "Partner With Us", desc: "Businesses and organizations can partner with APCARE to expand our reach and impact through CSR initiatives." },
  ],
  donateCta: { title: "Ready to Make a Difference?", description: "Contact us to discuss how you can support eye health in Benin City.", email: "apcareonline@gmail.com", phone: "07038847355" },
  donateImage: apcareReception,
  contactHero: { subtitle: "Get in Touch", title: "Contact Us", description: "We'd love to hear from you. Reach out for inquiries, appointments, or to learn more about our services." },
  galleryHero: { tag: "Our Gallery", title: "Inside APCARE Eye Center", subtitle: "A look at our clinic, equipment, and the care we provide — where precision meets compassion." },
  galleryImages: [
    { src: apcareOffice, alt: "APCARE Eye Center front office", category: "Facility", span: "md:col-span-2 md:row-span-2" },
    { src: apcareExam, alt: "Patient eye examination in progress", category: "Clinic" },
    { src: apcareGlasses, alt: "Eyeglasses display with wide selection of frames", category: "Facility" },
    { src: apcareReception, alt: "Reception area with APCARE Eye Center branding", category: "Facility" },
    { src: apcareEquipment1, alt: "Advanced lensometer diagnostic equipment", category: "Clinic", span: "md:col-span-2" },
    { src: apcareEquipment2, alt: "Auto refractometer for precise eye measurements", category: "Clinic" },
    { src: apcareExam, alt: "Doctor conducting detailed eye assessment", category: "Clinic", span: "md:col-span-2 md:row-span-2" },
    { src: apcareOffice, alt: "APCARE team at work", category: "Facility" },
    { src: apcareGlasses, alt: "Eye anatomy chart and eyewear collection", category: "Facility" },
    { src: apcareReception, alt: "Neon logo sign at APCARE reception", category: "Facility", span: "md:col-span-2" },
    { src: apcareEquipment1, alt: "Diagnostic station with modern equipment", category: "Clinic" },
    { src: apcareEquipment2, alt: "Examination chair and refractometer setup", category: "Clinic" },
  ],
  footerCta: "Your vision matters — schedule your eye exam today.",
  footerBrand: { name: "APCARE Eye Center", tagline: "Your Trusted Eye Clinic", description: "Professional primary eye care services in Benin City, Nigeria. Comprehensive exams, vision correction, and personalized care." },
  footerCopyright: "APCARE Eye Center",
  navBrand: { name: "APCARE", tagline: "Eye Center" },
};

// Keys used for DB storage
const CONTENT_KEYS: (keyof SiteContent)[] = [
  "whatsappNumber", "socials", "contactInfo",
  "heroSlides", "stats", "aboutSection", "homeMissionSpotlight", "homeSpotlightFeature",
  "services", "journeySteps",
  "testimonials", "programs", "impactStats", "whyChooseUs", "partners",
  "visitCards", "finalCta",
  "homeAboutBgImage", "homeImpactBgImage", "homeGalleryImages", "homeProfImage",
  "aboutHero", "aboutHeroImage", "aboutOrigin", "aboutOriginImages",
  "milestones", "directorBio", "directorImage", "values", "boardSection", "aboutBottomImages",
  "clinicHero", "clinicHeroImage", "clinicMission", "clinicAbout", "clinicAboutImage",
  "clinicServices", "surgicalStats", "clinicHours", "clinicCta", "clinicImages",
  "blogHero", "blogPosts",
  "donateHero", "donateWhy", "donateWays", "donateCta", "donateImage",
  "contactHero",
  "galleryHero", "galleryImages",
  "footerCta", "footerBrand", "footerCopyright",
  "navBrand",
];

interface SiteContentContextType {
  content: SiteContent;
  loading: boolean;
  updateContent: (path: string, value: any) => void;
  updateNestedContent: (section: keyof SiteContent, index: number, field: string, value: any) => void;
  addToArray: (section: keyof SiteContent, item: any) => void;
  removeFromArray: (section: keyof SiteContent, index: number) => void;
  saveSection: (key: keyof SiteContent) => Promise<boolean>;
  saveMultipleSections: (keys: (keyof SiteContent)[]) => Promise<boolean>;
}

const SiteContentContext = createContext<SiteContentContextType | null>(null);

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSiteContent().then((dbContent) => {
      if (dbContent) {
        setContent((prev) => {
          const merged = { ...prev };
          for (const key of CONTENT_KEYS) {
            if (dbContent[key] !== undefined) {
              (merged as any)[key] = dbContent[key];
            }
          }
          return merged;
        });
      }
      setLoading(false);
    });
  }, []);

  const updateContent = (path: string, value: any) => {
    setContent((prev) => {
      const keys = path.split(".");
      const newContent = { ...prev };
      let obj: any = newContent;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = Array.isArray(obj[keys[i]]) ? [...obj[keys[i]]] : { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return newContent;
    });
  };

  const updateNestedContent = (section: keyof SiteContent, index: number, field: string, value: any) => {
    setContent((prev) => {
      const arr = [...(prev[section] as any[])];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [section]: arr };
    });
  };

  const addToArray = (section: keyof SiteContent, item: any) => {
    setContent((prev) => ({
      ...prev,
      [section]: [...(prev[section] as any[]), item],
    }));
  };

  const removeFromArray = (section: keyof SiteContent, index: number) => {
    setContent((prev) => ({
      ...prev,
      [section]: (prev[section] as any[]).filter((_: any, i: number) => i !== index),
    }));
  };

  const saveSection = useCallback(async (key: keyof SiteContent): Promise<boolean> => {
    return saveSiteContentKey(key, content[key]);
  }, [content]);

  const saveMultipleSections = useCallback(async (keys: (keyof SiteContent)[]): Promise<boolean> => {
    const promises = keys.map((key) => saveSiteContentKey(key, content[key]));
    const results = await Promise.all(promises);
    return results.every(Boolean);
  }, [content]);

  return (
    <SiteContentContext.Provider value={{ content, loading, updateContent, updateNestedContent, addToArray, removeFromArray, saveSection, saveMultipleSections }}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error("useSiteContent must be used within SiteContentProvider");
  return ctx;
};
