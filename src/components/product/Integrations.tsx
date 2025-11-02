import React from "react";

/**
 * Integrations
 *
 * Props:
 *  - items: [{ name, logo }] (optional, defaults to built-in list)
 *
 * Behavior:
 *  - Desktop: responsive grid
 *  - Mobile: horizontal snap-scroll carousel
 *  - Images lazy-load and fallback to placeholder on error
 */

const DEFAULT_LOGO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='100%25' height='100%25' fill='%23F3F4F6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239CA3AF' font-family='Arial,Helvetica,sans-serif' font-size='20'%3ELogo%3C/text%3E%3C/svg%3E";

const defaultIntegrations = [
  { name: "Slack", logo: "/assets/integrations/slack.png" },
  { name: "Notion", logo: "/assets/integrations/notion.png" },
  { name: "Zapier", logo: "/assets/integrations/zapier.png" },
  { name: "Google Workspace", logo: "/assets/integrations/google.png" },
  { name: "Microsoft Teams", logo: "/assets/integrations/teams.png" },
];

const IntegrationCard = ({ name, logo }) => {
  const handleError = (e) => {
    e.currentTarget.src = DEFAULT_LOGO;
  };

  return (
    <figure
      className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-transform duration-200 focus-within:shadow-lg focus-within:-translate-y-1 outline-none"
      tabIndex={0}
      aria-label={`${name} integration`}
    >
      <img
        src={logo}
        alt={`${name} logo`}
        onError={handleError}
        loading="lazy"
        className="w-16 h-16 object-contain"
      />
      <figcaption className="text-sm font-medium text-gray-700">
        {name}
      </figcaption>
    </figure>
  );
};

const Integrations = ({ items = defaultIntegrations }) => {
  return (
    <section className="w-full py-16 bg-gradient-to-br from-sky-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-extrabold">            
            <span className="bg-gradient-to-r from-indigo-700 via-purple-600 to-fuchsia-700 text-transparent bg-clip-text">
              Integrations
            </span>
          </h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Tiiron connects with the tools you already use — integrate,
            automate, and scale without switching context.
          </p>
        </div>

        {/* Desktop Grid */}
        <div
          role="list"
          className="hidden md:grid md:grid-cols-5 gap-6 items-stretch"
        >
          {items.map((it, i) => (
            <div key={i} role="listitem">
              <IntegrationCard name={it.name} logo={it.logo} />
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-gray-900">
              Popular integrations
            </div>
            <a
              href="/integrations"
              className="text-sm text-sky-600 hover:underline"
              aria-label="View all integrations"
            >
              View all
            </a>
          </div>

          <div
            role="list"
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory touch-pan-x py-2 -mx-4 px-4"
            aria-label="Integrations carousel"
          >
            {items.map((it, i) => (
              <div
                key={i}
                role="listitem"
                className="snap-center min-w-[42%] sm:min-w-[36%]"
              >
                <IntegrationCard name={it.name} logo={it.logo} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Row */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/product"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition"
          >
            View all integrations
          </a>
          <a
            href="/product"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-200 transition"
          >
            See developer docs & API
          </a>
        </div>
      </div>
    </section>
  );
};

export default Integrations;
