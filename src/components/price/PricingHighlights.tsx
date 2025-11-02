import { motion } from "framer-motion";

const highlights = [
  {
    icon: "💡",
    title: "Most Popular",
    description:
      "Perfect balance of features and pricing for freelancers and small teams.",
    plan: "Pro",
    accent: "pink",
    iconGradient: "from-pink-500 to-rose-400",
  },
  {
    icon: "⚡",
    title: "Fast Setup",
    description: "Launch instantly with zero hassle. Get productive in seconds.",
    plan: "Basic",
    accent: "sky",
    iconGradient: "from-sky-500 to-cyan-400",
  },
  {
    icon: "🛡️",
    title: "Enterprise Ready",
    description:
      "Advanced scalability, dedicated support, and security compliance.",
    plan: "Enterprise",
    accent: "purple",
    iconGradient: "from-purple-500 to-indigo-400",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as any,
    },
  }),
};

const PricingHighlights = () => {
  return (
    <section className="relative px-6 py-22 bg-slate-950 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10 text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight"
        >
          Why Choose{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-sky-500 to-purple-600">
            Our Plans?
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Whether you’re a solo creator, a growing startup, or a global
          enterprise, our plans are built to scale with your journey.
        </motion.p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10 mt-16">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.04, y: -6 }}
              className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-800/70 via-slate-900/80 to-slate-800/70 border border-slate-700 shadow-lg backdrop-blur-sm transition-all duration-500 group cursor-pointer hover:border-slate-500 hover:shadow-xl"
            >
              {/* Icon */}
              <div
                className={`mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${h.iconGradient} text-3xl text-white shadow-md transition-transform duration-500 group-hover:scale-110`}
              >
                {h.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3 text-white">
                {h.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {h.description}
              </p>

              {/* Plan Tag */}
              <span
                className={`inline-block px-4 py-1 text-sm rounded-full bg-${h.accent}-500/20 text-${h.accent}-300 font-medium tracking-wide group-hover:bg-${h.accent}-500 group-hover:text-white transition-all duration-300`}
              >
                {h.plan} Plan
              </span>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition duration-500 bg-gradient-to-br from-pink-500 via-sky-500 to-purple-600 blur-xl"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingHighlights;
