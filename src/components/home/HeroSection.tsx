import { motion } from "framer-motion";
import OrbitalVisualization from "./OrbitalVisualization";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white min-h-screen flex items-center pt-12 lg:pt-0">
      <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            The best LMS for{" "}
            <span className="bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Personalised Learning
            </span>
          </h1>

          <p className="text-lg text-gray-300 max-w-lg">
            Create engaging eLearning experiences with our customisable learning
            management system. Learning should be fun, natural, and
            integrated—achieve outcomes faster than ever.
          </p>

          <div className="flex gap-4">
            <a
              href="#demo"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:opacity-90 transition"
            >
              Schedule Demo
            </a>
            <a
              href="#features"
              className="px-6 py-3 rounded-xl border border-gray-500 text-gray-200 font-semibold hover:bg-white/10 transition"
            >
              Explore Features
            </a>
          </div>
        </motion.div>

        {/* Right Content (3D style cards / illustration) */}
        <OrbitalVisualization />
      </div>
    </section>
  );
}
