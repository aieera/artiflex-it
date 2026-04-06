import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon, PhoneIcon, MailIcon } from "@/components/icons";

const CONTACT_EMAIL = "meghna@artiflexit.com";
const CONTACT_PHONE = "+971522076531";

/* ─── Context ─── */
interface ContactModalContextValue {
  isOpen: boolean;
  open: () => void;
  openModal: () => void;
  close: () => void;
}

const ContactModalContext = createContext<ContactModalContextValue>({
  isOpen: false,
  open: () => {},
  openModal: () => {},
  close: () => {},
});

export function useContactModal() {
  return useContext(ContactModalContext);
}

/* ─── Provider ─── */
export function ContactModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [isOpen, close]);

  return (
    <ContactModalContext.Provider value={{ isOpen, open, openModal: open, close }}>
      {children}
      <AnimatePresence>{isOpen && <ContactModalBody close={close} />}</AnimatePresence>
    </ContactModalContext.Provider>
  );
}

/* ─── Modal body ─── */
function ContactModalBody({ close }: { close: () => void }) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { name, email, phone, company, service, message } = formState;

    if (!name || !email || !message) {
      alert("Please fill all required fields");
      return;
    }

    const subject = encodeURIComponent(
      `New Inquiry from ${name}${company ? ` — ${company}` : ""}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nCompany: ${company || "Not provided"}\nService Interest: ${service || "Not specified"}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  const inputClasses =
    "w-full rounded-xl border border-border-light bg-surface-secondary px-4 py-3 text-sm text-heading placeholder:text-muted outline-none transition-all duration-200 focus:border-[#045891] focus:bg-white focus:ring-2 focus:ring-[#045891]/10";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={close}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <motion.div
        className="relative z-10 w-[92vw] sm:w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {submitted ? (
          /* Success state */
          <div className="p-8 sm:p-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-500">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold text-heading mb-2">
              Message Sent!
            </h3>
            <p className="text-sm text-body mb-6">
              Your email client has been opened. We'll respond within 2 business hours.
            </p>
            <button
              onClick={close}
              className="rounded-xl bg-[#045891] px-8 py-3 text-sm font-semibold text-white hover:bg-[#045891]/90 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-heading">
                  Get in Touch
                </h3>
                <p className="mt-1 text-sm text-body">
                  Tell us about your project and we'll get back to you within 2 hours.
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-secondary hover:text-heading"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Quick contact buttons */}
            <div className="grid grid-cols-1 gap-3 mb-6 sm:grid-cols-2">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-2.5 rounded-xl border border-border-light bg-surface-secondary p-3 text-sm text-heading transition-all duration-200 hover:border-[#045891]/20 hover:bg-[#045891]/5 min-w-0"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#045891]/10 text-[#045891]">
                  <MailIcon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] uppercase tracking-wider text-muted font-medium">Email</span>
                  <span className="block text-xs font-semibold truncate">{CONTACT_EMAIL}</span>
                </div>
              </a>
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="flex items-center gap-2.5 rounded-xl border border-border-light bg-surface-secondary p-3 text-sm text-heading transition-all duration-200 hover:border-[#045891]/20 hover:bg-[#045891]/5 min-w-0"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#045891]/10 text-[#045891]">
                  <PhoneIcon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] uppercase tracking-wider text-muted font-medium">Call</span>
                  <span className="block text-xs font-semibold truncate">{CONTACT_PHONE}</span>
                </div>
              </a>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-light" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-muted">or send us a message</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <div className="grid gap-3.5 sm:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  className={inputClasses}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>

              <div className="grid gap-3.5 sm:grid-cols-2">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formState.phone}
                  onChange={handleChange}
                  className={inputClasses}
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={formState.company}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>

              <select
                name="service"
                value={formState.service}
                onChange={handleChange}
                className={`${inputClasses} appearance-none`}
              >
                <option value="">Select Service Interest</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Cloud Solutions">Cloud Solutions</option>
                <option value="IT Infrastructure">IT Infrastructure</option>
                <option value="Managed Services">Managed Services</option>
                <option value="Application Security">Application Security</option>
                <option value="AMC Services">AMC Services</option>
                <option value="Multiple Services">Multiple Services</option>
              </select>

              <textarea
                name="message"
                placeholder="Tell us about your project or requirements... *"
                required
                rows={4}
                value={formState.message}
                onChange={handleChange}
                className={`${inputClasses} resize-none`}
              />

              <button
                type="submit"
                className="mt-1 w-full rounded-xl bg-[#045891] py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#045891]/90 hover:shadow-[0_4px_16px_rgba(4,88,145,0.3)]"
              >
                Send Message
              </button>

              <p className="text-[11px] text-muted text-center">
                We respond within 2 business hours. Your information is confidential.
              </p>
            </form>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
