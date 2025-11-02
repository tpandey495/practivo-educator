import React from "react";
import { motion } from "framer-motion";
import {
  Layers,
  ListChecks,
  Database,
  BarChart3,
  Youtube,
  Settings2,
} from "lucide-react";

const features = [
  {
    icon: Youtube,
    title: "YouTube/Playlist Embed",
    desc: "Pull in playlists or channels and create a unified learning hub.",
    chip: "Content Hub",
  },
  {
    icon: Layers,
    title: "Lessons & Sub-lessons",
    desc: "Structure videos into bite-sized lessons and sequenced paths.",
    chip: "Curriculum",
  },
  {
    icon: ListChecks,
    title: "Question Builder",
    desc: "Craft MCQs, coding, image & text-based questions for retention.",
    chip: "Assessment",
  },
  {
    icon: Database,
    title: "Question Bank",
    desc: "Reusable, tagged repositories for faster evaluations.",
    chip: "Reusable",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    desc: "Track watch-time, completion rates, scores & cohort insights.",
    chip: "Insights",
  },
  {
    icon: Settings2,
    title: "Automation",
    desc: "Automate onboarding, reminders & progress nudges.",
    chip: "Workflow",
  },
];

function GradientText({ children }) {
  return (
    <span className="bg-gradient-to-r from-sky-500 via-fuchsia-500 to-violet-600 bg-clip-text text-transparent">
      {children}
    </span>
  );
}

const ServiceOffering = () => {
  return (
    <section
      id="features"
      className="relative bg-gradient-to-b from-indigo-50 via-white to-sky-50 py-20 px-6"
    >

      {/* Header */}
      <div className="relative mx-auto mb-14 max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900">
          Everything you need to <GradientText>Teach at Scale</GradientText>
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Bring Videos, Quizzes & Assessments Together Without
          Switching Tools.

        </p>
      </div>

      {/* Feature Grid */}
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md hover:shadow-sky-100"
          >
            {/* Icon + Chip */}
            <div className="mb-4 flex items-center justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-sky-500 via-fuchsia-500 to-violet-600 text-white">
                <f.icon className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-600">
                {f.chip}
              </span>
            </div>

            {/* Title + Desc */}
            <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServiceOffering;
