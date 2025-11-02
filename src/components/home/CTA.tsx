// CTA Component
import { Users, Check, ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section
      id="cta"
      role="region"
      aria-labelledby="cta-heading"
      className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-white py-16 px-6 sm:px-8 lg:py-20"
    >
      {/* Decorative subtle SVG circle */}
      <svg
        className="absolute -right-24 -top-24 opacity-10 w-80 h-80 pointer-events-none"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="100%" stopColor="#FF8AD1" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="80" fill="url(#g1)" />
      </svg>

      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 items-center">
        {/* Text */}
        <div className="text-center md:text-left">
          <h2
            id="cta-heading"
            className="text-3xl sm:text-4xl md:text-4xl font-extrabold text-gray-900 leading-tight"
          >
            Get Ready To Experience
            <span className="pl-2 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 text-transparent bg-clip-text">
              The Future Of Learning?
            </span>
          </h2>
          <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-2xl">
            Join thousands of educators, trainers, and organizations using{" "}
            <span className="font-semibold">Tiiron</span> to make learning
            faster, smarter, and more engaging — with AI-driven personalization
            and simple authoring tools.
          </p>

          <ul className="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-3 justify-center md:justify-start">
            <li className="inline-flex items-center gap-2 text-sm text-gray-700">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-red-50 text-red-500">
                <Check className="w-4 h-4" />
              </span>
              <span>AI-powered personalization</span>
            </li>
            <li className="inline-flex items-center gap-2 text-sm text-gray-700">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-red-50 text-red-500">
                <Users className="w-4 h-4" />
              </span>
              <span>Enterprise-ready & secure</span>
            </li>
          </ul>
        </div>

        {/* Buttons / CTA area */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
            <a
              href="https://tiiron.com/organization/create-account"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 hover:from-green-700 hover:via-emerald-600 hover:to-teal-600 shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300 transition"
              aria-label="Get started with Tiiron"
            >
              <span >Get Started</span>
              <ArrowRight className="w-4 h-4 ml-3" />
            </a>

            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-gray-800 bg-white border border-gray-200 hover:bg-gray-200 font-medium focus:outline-none focus:ring-3 focus:ring-gray-100 transition"
              aria-label="Talk to sales"
            >
              Talk to Sales
            </a>
          </div>

          {/* Trust / social proof */}
          <div className="mt-2 text-sm text-gray-500 flex flex-col sm:flex-row items-center gap-3">
            <span className="hidden sm:inline">Trusted by</span>
            <div className="flex items-center gap-4">
              {/* Placeholder badges - replace with real logos */}
              <div className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs">
                Acme
              </div>
              <div className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs">
                BrightCo
              </div>
              <div className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs">
                Learnly
              </div>
            </div>
          </div>

          {/* Small secondary note */}
          <p className="mt-3 text-xs text-gray-400 text-center md:text-right max-w-sm">
            No credit card required • Cancel anytime • 14-day free trial
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
