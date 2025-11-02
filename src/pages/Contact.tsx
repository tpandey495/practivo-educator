import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Mail, Phone, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MAX = 1000;

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "", 
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    if (submitted) {
      const t = setTimeout(() => setStatusMsg(""), 4000);
      return () => clearTimeout(t);
    }
  }, [submitted]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!EMAIL_RE.test(form.email.trim()))
      e.email = "Please enter a valid email.";
    if (!form.message.trim()) e.message = "Please enter a message.";
    else if (form.message.length > MESSAGE_MAX)
      e.message = `Message must be ≤ ${MESSAGE_MAX} characters.`;
    if (form.website && form.website.trim().length > 0)
      e.website = "Bot detected.";
    return e;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    const eObj = validate();
    if (Object.keys(eObj).length) {
      setErrors(eObj);
      setStatusMsg("Please fix the errors and try again.");
      return;
    }

    setLoading(true);
    setStatusMsg("");
    try {
      await new Promise((res) => setTimeout(res, 900));
      setSubmitted(true);
      setStatusMsg("Thank you! We'll get back to you soon.");
      setForm({ name: "", email: "", phone: "", message: "", website: "" });
      setErrors({});
    } catch {
      setStatusMsg("Something went wrong — please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-12 px-4 sm:px-6 md:px-12 bg-gradient-to-br from-sky-50 via-purple-50 to-pink-50">
      {/* Background gradient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-15rem] h-[35rem] w-[35rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-400/10 via-fuchsia-400/10 to-violet-400/10 blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto bg-white shadow-md border border-gray-100 rounded-2xl p-8 md:p-7">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            <span className="bg-gradient-to-r from-green-600 via-teal-500 to-cyan-500 text-transparent bg-clip-text">
            Let's Talk
            </span>
          </h2>
          <p className="mt-2 text-gray-600 max-w-md mx-auto">
            Have questions about <span className="font-semibold">Tiiron</span>? 
            Send us a message and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* ARIA live */}
        <div aria-live="polite" className="sr-only">
          {statusMsg}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={handleChange}
            autoComplete="off"
            tabIndex={-1}
            style={{ display: "none" }}
            aria-hidden="true"
          />

          {/* Grid inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition ${
                  errors.name
                    ? "border-red-400 focus:ring-red-200"
                    : "border-gray-300 focus:ring-sky-300"
                }`}
                placeholder="Your name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p
                  id="name-error"
                  className="text-xs text-red-600 mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" /> {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition ${
                    errors.email
                      ? "border-red-400 focus:ring-red-200"
                      : "border-gray-300 focus:ring-sky-300"
                  }`}
                  placeholder="you@company.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <p
                  id="email-error"
                  className="text-xs text-red-600 mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" /> {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone (optional)
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-300 transition"
                placeholder="+91 8363959897"
                aria-describedby="phone-help"
              />
            </div>
            <p id="phone-help" className="text-xs text-gray-400 mt-1">
              We'll only call if necessary.
            </p>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border resize-none focus:outline-none focus:ring-2 transition ${
                errors.message
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-300 focus:ring-sky-300"
              }`}
              placeholder="How can we help?"
              aria-invalid={!!errors.message}
              aria-describedby={
                errors.message ? "message-error message-help" : "message-help"
              }
              maxLength={MESSAGE_MAX}
            />
            <div className="flex items-center justify-between mt-2">
              {errors.message ? (
                <p
                  id="message-error"
                  className="text-xs text-red-600 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" /> {errors.message}
                </p>
              ) : (
                <p id="message-help" className="text-xs text-gray-400">
                  Be as specific as you can — it helps us respond faster.
                </p>
              )}
              <p className="text-xs text-gray-400">
                {form.message.length}/{MESSAGE_MAX}
              </p>
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition transform bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500 shadow-lg cursor-pointer ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-sky-600 hover:opacity-90 transition scale-[1.02]"
              }`}
              aria-busy={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <CheckCircle2 className="w-5 h-5 opacity-0" />
              )}
              <span>{loading ? "Sending..." : "Send Message"}</span>
            </button>

            {/* Status */}
            <div className="mt-4">
              {submitted && !loading && (
                <div className="inline-flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-100 px-4 py-2 rounded-md">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>
                    Thanks — we received your message and will reply soon.
                  </span>
                </div>
              )}
              {!submitted && statusMsg && (
                <div className="inline-flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-100 px-4 py-2 rounded-md">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  <span>{statusMsg}</span>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
