import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, Loader2, CheckCircle } from "lucide-react";
import { submitContactForm } from "@/lib/admin-helpers";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const ok = await submitContactForm({
      name: form.name,
      email: form.email,
      message: `[${form.subject}] ${form.message}`,
    });
    setSubmitting(false);
    if (ok) {
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <div>
      <section className="relative py-20 bg-primary">
        <div className="container">
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2">Get in Touch</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground">Contact Us</h1>
          <p className="mt-4 text-primary-foreground/80 text-lg max-w-2xl">
            We'd love to hear from you. Reach out for inquiries, appointments, or to learn more about our services.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            {[
              { icon: MapPin, title: "Address", lines: ["202 Upper Mission Extension, Aduwawa", "76 Village Road", "Benin City, Nigeria"] },
              { icon: Phone, title: "Phone", lines: ["07038847355"] },
              { icon: Mail, title: "Email", lines: ["apcareonline@gmail.com"] },
              { icon: Clock, title: "Hours", lines: ["Mon-Fri: 8AM – 6PM", "Sat: 9AM – 3PM", "Sun: Closed"] },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <item.icon size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  {item.lines.map((line, j) => (
                    <p key={j} className="text-muted-foreground text-sm">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-card border border-border space-y-6">
              <h2 className="font-heading text-2xl font-bold text-foreground">Send a Message</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              {submitted ? (
                <div className="flex items-center gap-2 text-secondary font-medium">
                  <CheckCircle size={18} /> Message sent! We'll get back to you soon.
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {submitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section-blue py-16">
        <div className="container text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Find Us</h2>
          <p className="text-muted-foreground mb-6">202 Upper Mission Extension, Aduwawa / 76 Village Road, Benin City, Nigeria</p>
          <div className="rounded-2xl overflow-hidden border border-border h-64 bg-muted flex items-center justify-center">
            <iframe
              title="APCARE Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.5!2d5.63!3d6.34!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjAnMjQuMCJOIDXCsDM3JzQ4LjAiRQ!5e0!3m2!1sen!2sng!4v1!5m2!1sen!2sng"
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
