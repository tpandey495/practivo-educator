import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Youtube,
  Facebook,
  Instagram,
  ArrowUp,
  ExternalLink,
  Heart,
  ArrowRight,
  LucideIcon,
} from "lucide-react";

// Types
interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

interface ContactInfo {
  icon: LucideIcon;
  text: string;
  href: string;
}

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();

  const footerSections: FooterSection[] = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Analytics", href: "#" },
        { name: "Integrations", href: "#" },
        { name: "API", href: "#", external: true },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "Help Center", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Webinars", href: "#" },
        { name: "Case Studies", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Careers", href: "mailto:hr@inacademic.com" },
        { name: "Partners", href: "#" },
        { name: "Press Kit", href: "#" },
      ],
    },
  ];

  const socialLinks: SocialLink[] = [
    { icon: Twitter, href: "https://x.com/HrInacademic", label: "Twitter" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/inacademic",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/inacademic_official/",
      label: "Instagram",
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/inacademic_official",
      label: "Facebook",
    },
    { icon: Youtube, href: "https://www.youtube.com/@inacademic", label: "YouTube" },
    {
      icon: MapPin,
      href: "https://maps.app.goo.gl/ZfZcpnYpLWUfiKfp6",
      label: "Location",
    },
  ];

  const contactInfo: ContactInfo[] = [
    { icon: Mail, text: "admin@tiiron.com", href: "mailto:admin@tiiron.com" },
    { icon: Phone, text: " +91 9161218740", href: "tel:+919161218740" },
  ];

  return (
    <footer className="w-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-gray-300">
      {/* Newsletter CTA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] rounded-2xl border border-gray-700 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-white">
              Get product updates & tips
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              Join the Tiiron newsletter — no spam, just useful stuff.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full sm:w-auto flex items-center gap-3"
            aria-label="Subscribe to newsletter"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="min-w-0 flex-1 sm:flex-none px-4 py-2 border border-gray-600 rounded-lg bg-[#1e293b] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition"
              aria-label="Email address"
              required
            />
            <button
              type="submit"
              className="cursor-pointer inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold hover:from-red-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-red-700 transition"
            >
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand Info & Contact */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4 mt-0">
              <img
                src="/Tiiron_logo_footer.png"
                alt="Tiiron Logo"
                className="h-12 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
              />
            </div>


            <p className="text-gray-400 mb-3 max-w-lg">
              We help educators deliver interactive learning and real-time practice. Learners don't just watch they practice, improve, and master concepts.
            </p>

            <div className="space-y-3">
              {contactInfo.map((c, i) => {
                const Icon = c.icon;
                return (
                  <a
                    key={i}
                    href={c.href}
                    className="inline-flex items-center gap-1 pr-5 text-gray-400 hover:text-white transition"
                  >
                    <span className="p-2 rounded-md bg-gray-800 text-gray-400">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-sm">{c.text}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Link Sections */}
          {footerSections.map((sec, idx) => (
            <div key={idx}>
              <h4 className="text-sm font-semibold text-white mb-3">
                {sec.title}
              </h4>
              <ul className="space-y-2.5">
                {sec.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href === "#") e.preventDefault();
                      }}
                      className="text-gray-400 hover:text-white text-sm flex items-center gap-2 transition cursor-pointer"
                    >
                      <span>{link.name}</span>
                      {link.external && (
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Links */}
          <div className="flex flex-col">
            <h4 className="text-sm font-semibold text-white mb-4">Follow Us</h4>

            {/* Desktop View */}
            <div className="hidden sm:grid grid-cols-2 gap-3">
              {socialLinks.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    className="p-2 rounded-md border border-gray-700 text-gray-400 hover:text-white hover:border-white transition flex items-center justify-center hover:scale-105"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Mobile View: 3 icons per row */}
            <div className="grid grid-cols-3 gap-2 sm:hidden">
              {socialLinks.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    className="p-2 rounded-lg bg-[#1e293b] text-gray-300 border border-gray-700 flex items-center justify-center hover:bg-[#111827] hover:text-red-400 hover:border-red-500 transition duration-200 shadow-sm hover:shadow-md"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Row */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left side */}
          <div className="text-sm text-gray-700 flex flex-col sm:flex-row items-center gap-2 text-center md:text-left">
            <span>© {currentYear} Tiiron. All rights reserved.</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500" /> in India
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Footer Nav */}
            <nav className="hidden sm:flex flex-wrap items-center gap-4 text-sm">
              <a
                href="/languages"
                className="text-gray-700 hover:text-black transition"
              >
                Languages
              </a>
              <a
                href="/legal"
                className="text-gray-700 hover:text-black transition"
              >
                Legal
              </a>
              <a
                href="/privacy"
                className="text-gray-700 hover:text-black transition"
              >
                Privacy
              </a>
              <a
                href="/sitemap"
                className="text-gray-700 hover:text-black transition"
              >
                Sitemap
              </a>
              <a
                href="/status"
                className="text-gray-700 hover:text-black transition"
              >
                Status
              </a>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Contact Support */}
              <a
                href="contact"
                aria-label="Help"
                title="Contact support"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white shadow hover:scale-105 transition"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                  />
                </svg>
              </a>

              {/* Back to Top */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Back to top"
                title="Back to top"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-sky-500 text-white shadow hover:scale-105 transition cursor-pointer"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
