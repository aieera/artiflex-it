import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon, PhoneIcon, MailIcon } from "@/components/icons";

const CONTACT_EMAIL = "info@artiflexit.com";
const CONTACT_PHONE = "+971522076531";
const WHATSAPP_NUMBER = "971522076531";

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
  const [submitted, setSubmitted] = useState<null | "email" | "whatsapp">(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function buildMessageBody() {
    const { name, email, phone, company, service, message } = formState;
    return `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nCompany: ${company || "Not provided"}\nService Interest: ${service || "Not specified"}\n\nMessage:\n${message}`;
  }

  function validateRequired() {
    const { name, email, message } = formState;
    if (!name || !email || !message) {
      alert("Please fill all required fields");
      return false;
    }
    return true;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateRequired()) return;
    const { name, company } = formState;
    const subject = encodeURIComponent(
      `New Inquiry from ${name}${company ? ` (${company})` : ""}`
    );
    const body = encodeURIComponent(buildMessageBody());
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted("email");
  }

  function handleWhatsApp() {
    if (!validateRequired()) return;
    const { name, company } = formState;
    const text = encodeURIComponent(
      `New Inquiry from ${name}${company ? ` (${company})` : ""}\n\n${buildMessageBody()}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
    setSubmitted("whatsapp");
  }

  const inputClasses =
    "w-full rounded-xl border border-border-light bg-surface-secondary px-4 py-2.5 text-sm text-heading placeholder:text-muted outline-none transition-all duration-200 focus:border-[#045891] focus:bg-white focus:ring-2 focus:ring-[#045891]/10";

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
        className="relative z-10 w-[94vw] sm:w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
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
              {submitted === "whatsapp"
                ? "WhatsApp has been opened with your message. We'll respond within 2 business hours."
                : "Your email client has been opened. We'll respond within 2 business hours."}
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
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-heading sm:text-xl">
                  Get in Touch
                </h3>
                <p className="mt-0.5 text-xs text-body sm:text-sm">
                  Tell us about your project and we'll respond within 2 hours.
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-secondary hover:text-heading"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Quick contact buttons */}
            <div className="mb-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex min-w-0 items-center gap-2.5 rounded-xl border border-border-light bg-surface-secondary p-2.5 text-sm text-heading transition-all duration-200 hover:border-[#045891]/20 hover:bg-[#045891]/5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#045891]/10 text-[#045891]">
                  <MailIcon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] font-medium uppercase tracking-wider text-muted">Email</span>
                  <span className="block truncate text-xs font-semibold">{CONTACT_EMAIL}</span>
                </div>
              </a>
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="flex min-w-0 items-center gap-2.5 rounded-xl border border-border-light bg-surface-secondary p-2.5 text-sm text-heading transition-all duration-200 hover:border-[#045891]/20 hover:bg-[#045891]/5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#045891]/10 text-[#045891]">
                  <PhoneIcon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] font-medium uppercase tracking-wider text-muted">Call</span>
                  <span className="block truncate text-xs font-semibold">{CONTACT_PHONE}</span>
                </div>
              </a>
            </div>

            <div className="relative mb-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-light" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-[11px] text-muted">or send us a message</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
              <div className="grid gap-2.5 sm:grid-cols-2">
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

              <div className="grid gap-2.5 sm:grid-cols-2">
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
                <option value="Managed Services">Managed Services & AMC</option>
                <option value="Application Security">Application Security</option>
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

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#045891] py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#045891]/90 hover:shadow-[0_4px_16px_rgba(4,88,145,0.3)]"
                >
                  <MailIcon className="h-4 w-4" />
                  Send via Email
                </button>
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1ebd5b] hover:shadow-[0_4px_16px_rgba(37,211,102,0.35)]"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" />
                  </svg>
                  Send via WhatsApp
                </button>
              </div>

              <p className="text-center text-[10px] text-muted">
                We respond within 2 business hours. Your information is confidential.
              </p>
            </form>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
