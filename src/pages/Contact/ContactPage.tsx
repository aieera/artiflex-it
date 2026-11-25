import { useState } from "react";
import PageHero from "@/pages/About/section/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { CTASection } from "@/pages/Home/sections/CTASection";
import ClientStrip from "@/components/ui/ClientStrip";
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  GlobeIcon,
  WhatsAppIcon,
} from "@/components/icons";
import ShinyText from "@/components/ui/ShinyText";
import { trackEvent, type EventName } from "@/lib/analytics";
import { submitContactForm } from "@/lib/contact";

/**
 * Map a URL scheme to the GA4 event name we should fire for it.
 * Used by the quick-connect cards (tel, mailto, WhatsApp).
 */
function eventNameForHref(href: string): EventName | null {
  if (href.startsWith("tel:")) return "phone_click";
  if (href.startsWith("mailto:")) return "email_click";
  if (href.includes("wa.me/") || href.includes("whatsapp.com")) return "whatsapp_click";
  return null;
}

/* ─── Office Locations ─── */
const offices = [
  {
    city: "Dubai",
    label: "UAE",
    entity: "Artiflex Information Technology",
    address: [
      "M22, New Al Safiya Building,",
      "Near Abu Hail Metro Station,",
      "Hor Al Anz, Dubai, UAE",
    ],
    notice: "",
    phones: ["+971 52 207 6531"],
    emails: ["info@artiflexit.com"],
    website: "www.artiflexit.com",
    highlight: true,
  },
  {
    city: "Muscat",
    label: "Oman",
    entity: "Manchi Group",
    address: [
      "#702, Building No: 2112,",
      "Way No: 5026, Ghala,",
      "Near Centara Hotel Road,",
      "Muscat, Oman",
    ],
    notice: "",
    phones: ["+968 9823 5616", "+968 9534 3098"],
    emails: ["info@manchigroup.com", "sales@manchigroup.com"],
    website: "www.manchigroup.com",
    highlight: false,
  },
  {
    city: "Bengaluru",
    label: "India",
    entity: "CloudValley Solutions OPC Pvt Ltd",
    address: [
      "Sai Sree Layout,",
      "Parappana Agrahara,",
      "Hosa Road, Bengaluru,",
      "Karnataka, India - 560100",
    ],
    notice: "",
    phones: ["+91 708 708 2684", "+91 708 708 8916"],
    emails: ["info@cloudvalleysol.com", "sales@cloudvalleysol.com"],
    website: "www.cloudvalleysol.com",
    highlight: false,
  },
];

/* ─── Quick Connect Options ─── */
const quickConnect = [
  {
    icon: PhoneIcon,
    title: "Call Us",
    description: "Speak directly with our team for immediate assistance on any IT or security matter.",
    action: "+971 52 207 6531",
    actionLabel: "Call Now",
    href: "tel:+971522076531",
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
    href: "https://wa.me/971522076531?text=Hello%20ArtiflexIT%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.",
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
    botcheck: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      name,
      email,
      phone,
      company,
      employees,
      service,
      message,
      botcheck,
    } = formData;

    if (!name || !email || !message) {
      setErrorMsg("Please fill all required fields.");
      return;
    }

    setSending(true);
    setErrorMsg(null);

    const result = await submitContactForm({
      name,
      email,
      phone,
      company,
      employees,
      service,
      message,
      botcheck,
      source: "contact_page",
    });

    setSending(false);

    if (result.ok) {
      trackEvent("contact_form_submit", {
        location: "contact_page",
        method: "email",
        service: service || "not_specified",
        employees: employees || "not_specified",
      });
      setSent(true);
    } else {
      setErrorMsg(result.error);
    }
  };

  return (
    <>
      <>
        <title>Contact Artiflex IT Dubai | Free IT Assessment | UAE</title>
        <meta
          name="description"
          content="Contact Artiflex IT for cybersecurity, cloud migration, IT infrastructure and managed services. Dubai, Muscat and Bengaluru offices. Reply within 2 hours."
        />
        <link rel="canonical" href="https://artiflexit.com/contact" />
        <meta property="og:title" content="Contact Artiflex IT Dubai | Free IT Assessment | UAE" />
        <meta property="og:description" content="Contact Artiflex IT for cybersecurity, cloud migration, IT infrastructure and managed services. Reply within 2 business hours across UAE, Oman and Saudi Arabia." />
        <meta property="og:image" content="https://artiflexit.com/og/pages/contact.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://artiflexit.com/contact" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Artiflex IT Dubai | Free IT Assessment | UAE" />
        <meta name="twitter:description" content="Offices in Dubai, Muscat, and Bengaluru. Response within 2 business hours." />
        <meta name="twitter:image" content="https://artiflexit.com/og/pages/contact.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Artiflex IT",
          url: "https://artiflexit.com/contact",
          description: "Get in touch with Artiflex IT for cybersecurity, cloud, and managed services across the UAE.",
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://artiflexit.com/#localbusiness",
          name: "Artiflex Information Technology",
          url: "https://artiflexit.com",
          telephone: "+971 52 207 6531",
          email: "info@artiflexit.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "M22, New Al Safiya Building, Near Abu Hail Metro Station, Hor Al Anz",
            addressLocality: "Dubai",
            addressCountry: "AE",
          },
          areaServed: [
            { "@type": "Country", name: "United Arab Emirates" },
            { "@type": "Country", name: "Oman" },
            { "@type": "Country", name: "Saudi Arabia" },
          ],
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
            opens: "09:00",
            closes: "18:00",
          },
          sameAs: [],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://artiflexit.com/" },
            { "@type": "ListItem", position: 2, name: "Contact", item: "https://artiflexit.com/contact" },
          ],
        })}</script>
      </>

      <PageHero
        title={
          <>
            Let&apos;s Secure Your{" "}
            <ShinyText
              text="Business Together "
              speed={3}
              color="#28B5E1"
              shineColor="#ffffff"
              spread={120}
              className="inline-block font-display"
            />
          </>
        }
        description="Whether you need a cybersecurity audit, cloud migration plan, or managed IT support, we're ready to have an honest conversation about your options."
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
        <div className="shell">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {quickConnect.map((item) => (
              <a
                key={item.title}
                href={item.href}
                onClick={() => {
                  const evt = eventNameForHref(item.href);
                  if (evt) trackEvent(evt, { location: "contact_page_quick_connect", label: item.title });
                }}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
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
        <div className="shell">
          <SectionHeader
            label="Get in Touch"
            title="Send Us a Message"
            description="Fill out the form and our team will get back to you within 2 business hours."
            centered
          />

          <div className="mt-4 sm:mt-12">
            {/* Form */}
            <div className="mx-auto max-w-4xl rounded-2xl border border-border-light bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-8 lg:p-10">
              {sent ? (
                <div className="py-8 text-center sm:py-12">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-500">
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-xl font-bold text-heading mb-2">
                    Message Sent!
                  </h3>
                  <p className="mx-auto max-w-md text-sm text-body">
                    Thanks for reaching out, your message has been sent. Our team will
                    get back to you within 2 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot: hidden from humans, bots tend to fill it. */}
                  <input
                    type="text"
                    name="botcheck"
                    value={formData.botcheck}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />
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
                      <option value="managed">Managed Services & AMC</option>
                      <option value="appsec">Application Security</option>
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

                  {errorMsg && (
                    <p className="rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-red-600">
                      {errorMsg}
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="w-full"
                    disabled={sending}
                  >
                    {sending ? "Sending..." : "Send Message"}
                  </Button>

                  <p className="text-xs text-muted text-center">
                    We respond within 2 business hours. Your information is confidential.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          OFFICE LOCATIONS
          ═══════════════════════════════════════ */}
      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="shell">
          <SectionHeader
            label="Our Offices"
            title="Locations Across UAE, Oman and India"
            description="With offices in Dubai, Muscat and Bengaluru, we're never far from your business."
            centered
          />

          <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3">
            {offices.map((office) => (
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

                <div className="mb-5 flex items-start gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${office.highlight
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
                    <p className="mt-1 text-sm font-semibold text-brand-blue">
                      {office.entity}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-sm">

                  {office.notice && (
                    <p className="rounded-lg border border-brand-blue/20 bg-brand-blue/8 px-4 py-2 text-[14px] font-bold text-brand-blue ">
                      {office.notice}
                    </p>
                  )}

                  <div className="text-body leading-relaxed">
                    {office.address.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>

                  <div className="h-px bg-border-light" />

                  {/* Phones */}
                  <ul className="space-y-2">
                    {office.phones.map((phone) => (
                      <li key={phone} className="flex items-center gap-2.5">
                        <a
                          href={`https://wa.me/${phone.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`WhatsApp ${office.city} on ${phone}`}
                          onClick={() => trackEvent("whatsapp_click", { location: "contact_page_office", label: office.city })}
                          className="text-brand-blue transition-opacity hover:opacity-70"
                        >
                          <WhatsAppIcon className="h-4 w-4 shrink-0" />
                        </a>
                        <a
                          href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                          onClick={() => trackEvent("phone_click", { location: "contact_page_office", label: office.city })}
                          className="flex items-center gap-2 text-body transition-colors hover:text-brand-blue"
                        >
                          <PhoneIcon className="h-4 w-4 shrink-0 text-brand-blue" />
                          {phone}
                        </a>
                      </li>
                    ))}
                  </ul>

                  {/* Emails */}
                  <ul className="space-y-2">
                    {office.emails.map((email) => (
                      <li key={email}>
                        <a
                          href={`mailto:${email}`}
                          onClick={() => trackEvent("email_click", { location: "contact_page_office", label: office.city })}
                          className="flex items-center gap-2 break-all text-body transition-colors hover:text-brand-blue"
                        >
                          <MailIcon className="h-4 w-4 shrink-0 text-brand-blue" />
                          {email}
                        </a>
                      </li>
                    ))}
                  </ul>

                  {/* Website */}
                  <a
                    href={`https://${office.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-body transition-colors hover:text-brand-blue"
                  >
                    <GlobeIcon className="h-4 w-4 shrink-0 text-brand-blue" />
                    {office.website}
                  </a>

                </div>
              </div>
            ))}
          </div>

          {/* Google Map: Dubai headquarters */}
          {(() => {
            const hq = offices.find((o) => o.highlight) ?? offices[0];
            const query = encodeURIComponent(`${hq.entity}, ${hq.address.join(" ")}`);
            const embedSrc = `https://www.google.com/maps?q=${query}&z=16&output=embed`;
            const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
            return (
              <div className="mt-8 overflow-hidden rounded-2xl border border-border-light bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:mt-12">
                <div className="flex flex-col gap-3 border-b border-border-light px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-blue/8 text-brand-blue">
                      <MapPinIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-display text-base font-semibold text-heading">Find us in {hq.city}</p>
                      <p className="text-xs text-muted">{hq.address.join(" ")}</p>
                    </div>
                  </div>
                  <a
                    href={directionsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("directions_click", { location: "contact_page_map", label: hq.city })}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-brand-blue/30 px-4 py-2 text-xs font-semibold text-brand-blue transition-colors hover:bg-brand-blue hover:text-white sm:text-sm"
                  >
                    Get directions
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
                <iframe
                  title={`Map showing ${hq.entity} office in ${hq.city}`}
                  src={embedSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="h-[320px] w-full border-0 sm:h-[400px]"
                />
              </div>
            );
          })()}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA
          ═══════════════════════════════════════ */}
      <ClientStrip />

      <CTASection
        title="Ready to Get Started?"
        description="Whether it's a quick question or a complex project, we're here to help. Our team responds within 2 business hours."
        primaryButton={{ text: "Discuss Your Requirements", action: "modal" }}
      />
    </>
  );
}
