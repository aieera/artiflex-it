import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "@/components/icons";

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

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key
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

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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

  const phoneNumber = "971522076531"; 

  const text = `Hello, I have an enquiry:

Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${company}
Service: ${service}

Message:
${message}`;

  const encodedText = encodeURIComponent(text);

  const url = `https://wa.me/${phoneNumber}?text=${encodedText}`;

  window.open(url, "_blank");

  close(); // keep your existing behavior
}
  const inputClasses =
    "w-full rounded-lg border border-white/[0.08] bg-navy-light/50 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors duration-200 focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30";

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
        className="absolute inset-0 bg-navy-deep/80 backdrop-blur-sm"
        onClick={close}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <motion.div
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-white/[0.08] bg-navy shadow-2xl shadow-black/40"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top gradient line */}
        <div className="h-px w-full bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple" />

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h3 className="font-display text-xl font-bold text-white">
                Get in Touch
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Tell us about your security needs.
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Row: Name + Email */}
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formState.name}
                onChange={handleChange}
                className={inputClasses}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={formState.email}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            {/* Row: Phone + Company */}
            <div className="grid gap-4 sm:grid-cols-2">
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

            {/* Service Interest */}
            <select
              name="service"
              value={formState.service}
              onChange={handleChange}
              className={`${inputClasses} appearance-none`}
            >
              <option value="" disabled>
                Select Service Interest
              </option>
              <option value="cybersecurity">Cybersecurity</option>
              <option value="cloud-solutions">Cloud Solutions</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="managed-services">Managed Services</option>
              <option value="consulting">Consulting &amp; Advisory</option>
              <option value="other">Other</option>
            </select>

            {/* Message */}
            <textarea
              name="message"
              placeholder="Tell us about your project or requirements..."
              rows={4}
              value={formState.message}
              onChange={handleChange}
              className={`${inputClasses} resize-none`}
            />

            {/* Submit */}
            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-blue/25 transition-all duration-300 hover:shadow-brand-blue/50 hover:brightness-110"
            >
              Send Message
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
