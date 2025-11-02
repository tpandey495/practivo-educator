import { FC } from "react";
import { motion } from "framer-motion";
import { BookOpen, Zap, Palette, Bot, LucideIcon } from "lucide-react";

type Feature = {
  title: string;
  desc: string;
  icon: LucideIcon;
};

const features: Feature[] = [
  {
    title: "Seamless Learning",
    desc: "An intuitive interface with zero learning curve—focus only on learning, not the setup.",
    icon: BookOpen,
  },
  {
    title: "Automation",
    desc: "Streamline repetitive tasks and free up time to create impactful experiences.",
    icon: Zap,
  },
  {
    title: "Customization",
    desc: "Shape learning journeys with your branding, integrations, and unique workflows.",
    icon: Palette,
  },
  {
    title: "AI-Powered",
    desc: "Build courses in minutes with Tiiron Agent—no prior AI knowledge needed.",
    icon: Bot,
  },
];

const KeyFeatures: FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative">
    {/* Decorative background SVG */}
        <svg className="absolute -left-30 -top-0 w-80 h-170 opacity-15 pointer-events-none" viewBox="0 150 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="g-left" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stop-color="#38bdf8"></stop> <stop offset="100%" stop-color="#a855f7"></stop> </linearGradient></defs><circle cx="100" cy="100" r="80" fill="url(#g-left)"></circle></svg>

      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900">
            Key Features of{" "}
            <span className="bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">
              Tiiron
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to simplify, scale, and supercharge your learning
            ecosystem—crafted for performance and designed for ease.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-white mb-6 shadow-md group-hover:scale-110 transition-transform">
                <f.icon size={28} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {f.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">{f.desc}</p>

              {/* Accent underline */}
              <div className="absolute left-8 bottom-6 w-12 h-1 bg-sky-500 rounded-full group-hover:w-20 transition-all"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
