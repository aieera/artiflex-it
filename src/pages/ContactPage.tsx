import { useState } from "react";
import { Helmet } from "react-helmet-async";
import PageHero from "@/components/sections/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  GlobeIcon,
} from "@/components/icons";

/* ─── Office Locations ─── */
const offices = [
  {
    city: "Dubai",
    label: "UAE",
    address: ["National Insurance Building, Office 603, Opposite Deira City Center, Deira, Dubai, United Arab Emirates"

    ],
    phone: "+971558086462",
    email: "info@artiflexit.com",
    highlight: true,
  },
  {
    city: "Muscat",
    label: "Oman",
    address: ["Office No: 61,Al Takween Building, Way No: 5007, Near Centara Hotel, Opp: Spar, Ghala, Muscat, Oman"],
    phone: "+971558086462",
    email: "muscat@artiflexit.com",
    highlight: false,
  },
  {
    city: "Bengaluru",
    label: "India",
    address: ["Sai Sree Layout, Parappana Agrahara, Hosa Road, Bengaluru, Karnataka – 560100"],
    phone: "+971558086462",
    email: "support@artiflexit.com",
    highlight: false,
  },
];

/* ─── Quick Connect Options ─── */
const quickConnect = [
  {
    icon: PhoneIcon,
    title: "Call Us",
    description: "Speak directly with our team for immediate assistance on any IT or security matter.",
    action: "+971558086462",
    actionLabel: "Call Now",
    href: "tel:+971558086462",
  },
  {
    icon: MailIcon,
    title: "Email Us",
    description: "Send us your requirements and we'll respond with a detailed assessment within 2 hours.",
    action: "info@artiflexit.com",
    actionLabel: "Send Email",
    href: "mailto:info@artiflexit.com",
  },
  {
    icon: GlobeIcon,
    title: "Live Chat",
    description: "Chat with our support team in real-time for quick questions and technical guidance.",
    action: "Available 24/7",
    actionLabel: "Start Chat",
    href: "https://wa.me/971558086462?text=Hello%20ArtiflexIT%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.",
  },
];

/* ─── Form Input Component ─── */
function FormInput({
  label,
  id,
  required,
  ...props
}: {
  label: string;
  id: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-heading mb-2">
        {label} {required && <span className="text-brand-blue">*</span>}
      </label>
      <input
        id={id}
        required={required}
        className="w-full rounded-xl border border-border-light bg-surface-secondary px-4 py-3 text-sm text-heading placeholder:text-muted focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/10 transition-all duration-200"
        {...props}
      />
    </div>
  );
}

function FormSelect({
  label,
  id,
  children,
  ...props
}: {
  label: string;
  id: string;
  children: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-heading mb-2">
        {label}
      </label>
      <select
        id={id}
        className="w-full rounded-xl border border-border-light bg-surface-secondary px-4 py-3 text-sm text-heading focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/10 transition-all duration-200 appearance-none"
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

/* ─── Page Component ─── */
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    employees: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const {
      name,
      email,
      phone,
      company,
      employees,
      service,
      message,
    } = formData;

    if (!name || !email || !message) {
      alert("Please fill all required fields");
      return;
    }

    const phoneNumber = "+971522076531"; // ArtiflexIT WhatsApp number

    const text = `Hello, I have an enquiry:

Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${company}
Employees: ${employees}
Service: ${service}

Message:
${message}`;

    const encodedText = encodeURIComponent(text);

    const url = `https://wa.me/${phoneNumber}?text=${encodedText}`;

    window.open(url, "_blank");
  };

  return (
    <>
      <Helmet>
        <title>Contact ArtiflexIT — Get a Free Security Assessment | Dubai, UAE</title>
        <meta
          name="description"
          content="Contact ArtiflexIT for cybersecurity, cloud migration, IT infrastructure, and managed services. Offices in Dubai, Abu Dhabi, and Sharjah."
        />
      </Helmet>

      <PageHero
        title={
          <>
            Let&apos;s Secure Your{" "}
            <span className="gradient-text">Business Together</span>
          </>
        }
        description="Whether you need a cybersecurity audit, cloud migration plan, or managed IT support — we're ready to have an honest conversation about your options."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
        background="gradient-blinds"
      />

      {/* ═══════════════════════════════════════
          QUICK CONNECT CARDS
          ═══════════════════════════════════════ */}
      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {quickConnect.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="group rounded-2xl border border-border-light bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(27,138,199,0.08)] hover:border-brand-blue/25"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/8 text-brand-blue mb-5 transition-colors duration-300 group-hover:bg-brand-blue group-hover:text-white">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-heading mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-body leading-relaxed mb-4">
                  {item.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-brand-blue group-hover:gap-3 transition-all duration-300">
                  {item.actionLabel}
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT FORM + MAP
          ═══════════════════════════════════════ */}
      <section className="bg-surface-secondary py-14 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Get in Touch"
            title="Send Us a Message"
            description="Fill out the form and our team will get back to you within 2 business hours."
            centered
          />

          <div className="mt-8 grid gap-8 sm:mt-12 lg:grid-cols-[1fr_380px] lg:gap-10">
            {/* Form */}
            <div className="rounded-2xl border border-border-light bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormInput
                    label="Full Name"
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                  />
                  <FormInput
                    label="Business Email"
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormInput
                    label="Phone Number"
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+971 50 123 4567"
                  />
                  <FormInput
                    label="Company Name"
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormSelect
                    label="Number of Employees"
                    id="employees"
                    name="employees"
                    value={formData.employees}
                    onChange={handleChange}
                  >
                    <option value="">Select range</option>
                    <option value="1-10">1–10 employees</option>
                    <option value="11-50">11–50 employees</option>
                    <option value="51-200">51–200 employees</option>
                    <option value="201-500">201–500 employees</option>
                    <option value="500+">500+ employees</option>
                  </FormSelect>
                  <FormSelect
                    label="Service Interest"
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">Select service</option>
                    <option value="cybersecurity">Cybersecurity</option>
                    <option value="cloud">Cloud Solutions</option>
                    <option value="infrastructure">IT Infrastructure</option>
                    <option value="managed">Managed Services</option>
                    <option value="appsec">Application Security</option>
                    <option value="amc">AMC Services</option>
                    <option value="multiple">Multiple Services</option>
                  </FormSelect>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-heading mb-2">
                    Message <span className="text-brand-blue">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border-light bg-surface-secondary px-4 py-3 text-sm text-heading placeholder:text-muted focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/10 transition-all duration-200 resize-none"
                    placeholder="Tell us about your project, challenges, or questions..."
                  />
                </div>

                <Button type="submit" variant="gradient" size="lg" className="w-full">
                  Send Message
                </Button>

                <p className="text-xs text-muted text-center">
                  We respond within 2 business hours. Your information is confidential.
                </p>
              </form>
            </div>

            {/* Google Map Embed */}
            <div className="flex flex-col gap-6">
              <div className="flex-1 overflow-hidden rounded-2xl border border-border-light shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5439.573436745175!2d55.323435161542356!3d25.287888751932947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5cd89a00d82b%3A0x684c64ac6a26dd36!2sNational%20General%20Insurance%20Co.%20(PJSC)%20%E2%80%93%20Head%20Office!5e0!3m2!1sen!2sin!4v1773819782734!5m2!1sen!2sin"
                  title="ArtiflexIT Office Location — Business Bay, Dubai"
                  className="h-full w-full min-h-[300px]"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Quick Info Card */}
              <div className="rounded-2xl border border-brand-blue/15 bg-brand-blue/5 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue text-white">
                    <MapPinIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-heading">Main Office — Dubai</h3>
                    <p className="text-xs text-muted">Business Bay</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-body">
                  <p>National Insurance Building, Office 603, Opposite Deira City Center, Deira, Dubai, United Arab Emirates</p>
                  <a href="tel:+97145896700" className="block text-brand-blue font-medium hover:underline">
                    +971 4 589 6700
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          OFFICE LOCATIONS
          ═══════════════════════════════════════ */}
      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeader
            label="Our Offices"
            title="Locations Across the UAE"
            description="With offices in Dubai,Muscat, and Bengaluru, we're never far from your business."
            centered
          />

          <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3">
            {offices
              
              .map((office) => (
                <div
                  key={office.city}
                  className={`relative rounded-2xl border p-6 transition-all duration-500 ${office.highlight
                      ? "border-brand-blue/25 bg-gradient-to-br from-brand-blue/5 to-white shadow-[0_4px_20px_rgba(27,138,199,0.1)]"
                      : "border-border-light bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(27,138,199,0.08)] hover:border-brand-blue/25 hover:-translate-y-0.5"
                    }`}
                >
                  {/* Highlight badge */}
                  {office.highlight && (
                    <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-brand-blue px-3 py-1 text-[11px] font-semibold text-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse-dot" />
                      Headquarters
                    </span>
                  )}

                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${office.highlight
                          ? "bg-brand-blue text-white"
                          : "bg-brand-blue/8 text-brand-blue"
                        }`}
                    >
                      <MapPinIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-heading">
                        {office.city}
                      </h3>
                      <p className="text-xs text-muted">{office.label}</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div className="text-body leading-relaxed">
                      {office.address.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>

                    <div className="h-px bg-border-light" />


                    <div className="flex items-center justify-center gap-4">

                      <a
                        href={`https://wa.me/${office.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue text-white hover:scale-110 transition"
                      >
                        <PhoneIcon className="h-5 w-5" />
                      </a>

                      {/* Email */}
                      <a
                        href={`mailto:${office.email}`}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue text-white hover:scale-110 transition"
                      >
                        <MailIcon className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA
          ═══════════════════════════════════════ */}
      <CTASection
        title="Ready to Get Started?"
        description="Whether it's a quick question or a complex project, we're here to help. Our team responds within 2 business hours."
        primaryButton={{ text: "Schedule Consultation", action: "modal" }}
        secondaryButton={{ text: "View Our Services", href: "/services" }}
      />
    </>
  );
}
