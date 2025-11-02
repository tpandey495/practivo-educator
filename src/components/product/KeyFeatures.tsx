import React from "react";
import { CheckCircle } from "lucide-react";

const DEFAULT_FEATURES = [
  "Seamless integration with existing tools",
  "AI-powered automation",
  "Advanced security & compliance",
  "Customizable dashboards",
  "Scalable for enterprises",
];

const accentColors = [
  "from-red-500 to-pink-500",
  "from-sky-500 to-cyan-400",
  "from-emerald-500 to-emerald-400",
  "from-violet-500 to-purple-400",
  "from-yellow-400 to-orange-400",
];

const KeyFeatures = ({ items = DEFAULT_FEATURES }) => {
  return (
    <section
      aria-labelledby="features-heading"
      className="w-full py-16 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2
            id="features-heading"
            className="text-4xl md:text-5xl font-extrabold text-white"
          >
            Key 
            <span className="bg-gradient-to-r pl-3 from-green-500 via-lime-400 to-teal-400 text-transparent bg-clip-text">
              Features
            </span>
          </h2>
          <p className="mt-3 text-gray-300">
            Built for teams and educators — Tiiron gives you the tools to
            create, deliver, and measure learning at scale.
          </p>
        </div>

        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((feature, idx) => {
            const color = accentColors[idx % accentColors.length];
            return (
              <li
                key={idx}
                className="group bg-[#1e293b] rounded-2xl p-5 flex items-start gap-4 border border-gray-700 hover:shadow-lg hover:-translate-y-1 transition transform duration-200"
              >
                <span
                  className={`flex-shrink-0 w-12 h-12 rounded-lg inline-flex items-center justify-center bg-gradient-to-br ${color} text-white shadow`}
                  aria-hidden="true"
                >
                  <CheckCircle className="w-6 h-6" />
                </span>

                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-white">
                    {feature}
                  </h3>
                </div>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a
            href="/features"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-green-400 via-lime-300 to-teal-300 text-black font-semibold shadow hover:from-green-500 hover:via-lime-400 hover:to-teal-400 transition"
          >
            View all features
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
