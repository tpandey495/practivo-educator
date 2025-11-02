import React, { ReactNode } from "react";
import {
  CheckCircle,
  Building2,
  GraduationCap,
  Users,
  Briefcase,
  Layers,
} from "lucide-react";
import { motion } from "framer-motion";

type ContainerProps = {
  children: ReactNode;
  id?: string;
};

function Container({ children, id }: ContainerProps) {
  return (
    <section
      id={id}
      className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {children}
    </section>
  );
}

type WhoItem = {
  text: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type WhyItem = {
  title: string;
  desc: string;
};

const WhoAndWhy: React.FC = () => {
  const whoList: WhoItem[] = [
    {
      text: "Training providers showcasing their brand, not ours.",
      icon: Building2,
    },
    {
      text: "Localized training solutions designed for franchises.",
      icon: Layers,
    },
    {
      text: "Resellers & Consultants offering training-as-a-service to clients.",
      icon: Briefcase,
    },
    {
      text: "Large Enterprises managing multiple internal brands across departments.",
      icon: Users,
    },
    {
      text: "Schools & Universities running independent programs or campuses.",
      icon: GraduationCap,
    },
  ];

  const whyList: WhyItem[] = [
    { title: "Custom Domain", desc: "Run your portal on your own URL." },
    {
      title: "Fully Branded UI",
      desc: "Every detail reflects your brand identity.",
    },
    {
      title: "No Vendor Branding",
      desc: "Tiiron stays invisible; your brand is front and center.",
    },
    {
      title: "Branded Emails & Alerts",
      desc: "Every communication matches your company voice.",
    },
    {
      title: "Multi-Tenant Custom Portals",
      desc: "Manage multiple brands, regions, or clients from a single platform.",
    },
    {
      title: "Fast & Easy Launch",
      desc: "Get new training portals up and running in record time.",
    },
  ];

  return (
    <div className="relative isolate bg-gradient-to-b from-indigo-50 via-white to-sky-100 py-20 overflow-hidden">
      {/* Decorative Background Shapes */}
    
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-8rem] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-sky-200 via-fuchsia-200 to-indigo-200 opacity-30 blur-3xl" />
      </div>
      
      <svg
        className="absolute -left-24 -top-24 w-80 h-80 opacity-15 pointer-events-none"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        >
        <defs>
            <linearGradient id="g-left" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" /> {/* sky-400 */}
            <stop offset="100%" stopColor="#a855f7" /> {/* fuchsia-500 */}
            </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="80" fill="url(#g-left)" />
      </svg>


      <Container>
        {/* Section Header */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl"
          >
            A White
            <span className="bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent"> Label LMS</span>
             <br />{" "}
            <span className="text-3xl bg-gradient-to-r from-sky-500 to-fuchsia-600 bg-clip-text text-transparent">
              Your Brand. Your Training. Our Platform.
            </span>
          </motion.h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid gap-16 lg:grid-cols-2 items-start">
          {/* Who is this for */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-900">
              <span className="text-fuchsia-500">Who is</span> Tiiron For?
            </h3>
            <ul className="space-y-5">
              {whoList.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-4 items-start rounded-xl border border-gray-200 bg-white p-5 shadow-md hover:shadow-lg transition"
                >
                  <item.icon className="mt-1 h-6 w-6 flex-shrink-0 text-fuchsia-500" />
                  <p className="text-gray-700">{item.text}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Why Choose Tiiron */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-900">
             <span className="text-blue-400">Why Choose </span> Tiiron?
            </h3>
            <ul className="grid gap-5 sm:grid-cols-2">
              {whyList.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-md hover:shadow-lg transition"
                >
                  <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-sky-500" />
                  <div>
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default WhoAndWhy;
