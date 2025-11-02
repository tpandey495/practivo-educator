import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Layers,
  ListChecks,
  Youtube,
  Download,
  Sparkles,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

// ✅ Types
interface GradientTextProps {
  children: ReactNode;
}

interface PillProps {
  children: ReactNode;
}

// ✅ GradientText
function GradientText({ children }: GradientTextProps) {
  return (
    <span className="bg-gradient-to-r from-sky-400 via-fuchsia-500 to-violet-600 bg-clip-text text-transparent">
      {children}
    </span>
  );
}

// ✅ Pill
function Pill({ children }: PillProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

// ✅ Main Component
const WhyChooseTiiron: React.FC = () => {
  return (
    <section
      id="why-tiiron"
      className="relative isolate overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] pt-20 md:pt-24 lg:pt-26 pb-20"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        {/* Left: Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Pill>
            <Sparkles className="mr-1.5 h-4 w-4" /> AI-powered Next-generation LMS
          </Pill>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            The smarter way to build your{" "}
            <GradientText>LMS at scale</GradientText>.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
            Tiiron instantly converts your YouTube content or classroom materials into a complete learning platform — with structured courses, interactive assessments, and real-time analytics. No downloads, no setup — it all runs in your browser.
          </p>

          {/* Benefits list */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-sky-400" />
              <span className="text-sm text-white/80">
                Your content. Our platform. Infinite scale.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-violet-400" />
              <span className="text-sm text-white/80">
                Built for educators, creators, and training teams.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Download className="h-5 w-5 text-fuchsia-400" />
              <span className="text-sm text-white/80">
                No downloads, works seamlessly in any browser.
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-sky-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
            >
              Create Now
              <ChevronRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
            >
              Watch Demo
            </a>
          </div>
        </motion.div>

        {/* Right: Product Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm shadow-xl">
            <div className="rounded-xl bg-gradient-to-b from-white/5 to-transparent p-5">
              {/* Course Header */}
              <div className="mb-5 flex flex-wrap items-center gap-3 text-white/80">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-rose-500">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium">
                  Data Structures (T101)
                </span>
                <span className="text-xs text-white/60">
                  Instructor: Rishabh Singh
                </span>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {/* Playlist */}
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 flex items-center gap-2 text-white/80">
                    <Youtube className="h-4 w-4" />
                    <span className="text-xs">Embedded Playlist</span>
                  </div>
                  <div className="h-32 rounded-md bg-gradient-to-br from-slate-800 to-slate-900" />
                </div>

                {/* Lessons */}
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 flex items-center gap-2 text-white/80">
                    <Layers className="h-4 w-4" />
                    <span className="text-xs">Lessons & Sub-lessons</span>
                  </div>
                  <ul className="space-y-2 text-xs text-white/70">
                    <li>1. Introduction → Notes</li>
                    <li>2. Arrays → Quizzes</li>
                    <li>3. Linked Lists → Fill in the Blanks</li>
                    <li>4. Stacks & Queues → Coding</li>
                    <li>5. Sorting → Blogs</li>
                    <li>6. Trees → Assignments</li>
                  </ul>
                </div>

                {/* Question Builder */}
                <div className="md:col-span-2 rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 flex items-center gap-2 text-white/80">
                    <ListChecks className="h-4 w-4" />
                    <span className="text-xs">Question Builder</span>
                  </div>
                  <div className="h-20 rounded-md bg-gradient-to-r from-sky-900/40 via-fuchsia-900/30 to-violet-900/30 p-3 text-xs text-white/70">
                    AI-powered question creation and mapping.
                    <button className="ml-2 inline-flex rounded-md bg-gradient-to-r from-sky-500 to-fuchsia-500 px-2 py-1 text-[10px] font-medium text-white hover:opacity-90">
                      Reframe with AI
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseTiiron;
