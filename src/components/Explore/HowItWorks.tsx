import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { Rocket, Settings, BarChart3 } from "lucide-react";

import image1 from "../../assets/explore/signup-page.png"
import image2 from "../../assets/explore/buy-courses.png"
import image3 from "../../assets/explore/user-practice.png"

interface ContainerProps {
  children: ReactNode;
  id?: string;
}

function Container({ children, id }: ContainerProps) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-6 lg:px-8">
      {children}
    </section>
  );
}

interface Step {
  icon: React.ReactNode;
  title: string;
  desc: string;
  image: string;
}

const HowItWorks: React.FC = () => {
  const steps: Step[] = [
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Create your space",
      desc: "Sign up, add your branding, and instantly connect your YouTube channel or existing content. Setup takes minutes, not hours.",
      image: image1,
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Organize & assess",
      desc: "Turn raw videos into structured lessons. Add quizzes, assignments, and reuse questions from your bank to boost engagement.",
      image: image2,
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Automate & grow",
      desc: "Automations handle reminders, nudges, and progress tracking, while analytics give you insights into learner engagement.",
      image: image3,
    },
  ];

  return (
    <div id="how" className="relative isolate bg-gradient-to-br from-sky-50 via-purple-50 to-pink-50 py-20">
      {/* Background gradient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-15rem] h-[35rem] w-[35rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-400/10 via-fuchsia-400/10 to-violet-400/10 blur-3xl" />
      </div>

      <Container>
        {/* Section Header */}
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl"
          >
            How It  <span className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-sky-600 via-purple-500 to-fuchsia-500 text-transparent bg-clip-text"> Works </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-lg text-gray-600"
          >
            A smooth journey from setup to scaling — in just three steps.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="space-y-28">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className={`flex flex-col items-center gap-12 lg:gap-20 ${i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
            >
              {/* Text */}
              <div className="max-w-md text-center lg:text-left">
                <div className="mb-5 flex justify-center lg:justify-start">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-sky-600 via-purple-500 to-fuchsia-500 text-white shadow-lg">
                    {s.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">{s.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-gray-600">
                  {s.desc}
                </p>
              </div>

              {/* Image */}
              <div className="w-full max-w-lg">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full rounded-xl border border-gray-200 bg-white p-6"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24 flex justify-center"
        >
          <a
            href="https://tiiron.com/organization/create-account"
            className="rounded-full bg-gradient-to-r from-sky-600 via-purple-500 to-fuchsia-500 px-8 py-3 text-lg font-medium text-white shadow-lg transition hover:from-sky-700 hover:via-purple-600 hover:to-fuchsia-600"
          >
            Get Started Today
          </a>
        </motion.div>
      </Container>
    </div>
  );
};

export default HowItWorks;
