import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Rocket, ShieldCheck } from "lucide-react";

const ProblemSolution = () => {
  const problems = [
    {
      title: "Scattered Content",
      desc: "Videos on YouTube, notes on Drive, tasks on chat—students lose context.",
    },
    {
      title: "Low Engagement",
      desc: "No structured paths or checks for understanding equals drop-offs.",
    },
    {
      title: "Manual Operations",
      desc: "Assignments, reminders, tracking—all done by hand, every time.",
    },
  ];

  const solutions = [
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Single Learning Home",
      desc: "A branded, centralized hub combining video, notes, quizzes and progress.",
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Guided Journeys",
      desc: "Lessons & sub-lessons map out exactly what learners do next.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Set-and-Scale",
      desc: "Automations reduce busywork so creators & schools can scale impact.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-22">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            From{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300">
              Problems
            </span>{" "}
            to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-pink-400">
              Solutions
            </span>
          </h2>
          <p className="mt-4 text-lg text-white/70 leading-relaxed">
            Every challenge comes with an opportunity. Here’s how{" "}
            <span className="text-white font-semibold">Tiiron</span> transforms
            industry pains into seamless growth.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-20 grid lg:grid-cols-2 gap-16">
          {/* Problems */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6">
              The <span className="text-sky-400">Problems</span>
            </h3>
            <div className="space-y-6">
              {problems.map((p, i) => (
                <div
                  key={p.title}
                  className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-md hover:shadow-lg transition-all"
                >
                  <span className="absolute -top-3 -left-3 w-8 h-8 flex items-center justify-center rounded-full bg-sky-500/20 text-sky-400 font-bold">
                    {i + 1}
                  </span>
                  <h4 className="text-lg font-medium text-white group-hover:text-sky-300 transition">
                    {p.title}
                  </h4>
                  <p className="mt-2 text-sm text-white/70">{p.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6">
              Tiiron <span className="text-fuchsia-400">Solutions</span>
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {solutions.map((s, i) => (
                <div
                  key={s.title}
                  className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-sky-500/10 via-fuchsia-500/10 to-transparent p-6 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-gradient-to-tr from-sky-500 to-fuchsia-500 text-white shadow">
                      {s.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-white">
                      {s.title}
                    </h4>
                  </div>
                  <p className="text-sm text-white/80">{s.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
