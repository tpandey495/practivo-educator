import React, { ReactNode } from "react";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface ContainerProps {
  children: ReactNode;
  id?: string;
}

function Container({ children, id }: ContainerProps) {
  return (
    <section id={id} className="mx-auto w-full max-w-7xl px-6 lg:px-8">
      {children}
    </section>
  );
}

interface WhyItem {
  title: string;
  desc: string;
}

const WhyChoose: React.FC = () => {
  const whyList: WhyItem[] = [
    {
      title: "Custom Domain",
      desc: "Host your LMS on your own URL and give learners a fully branded experience.",
    },
    {
      title: "Fully Branded UI",
      desc: "Every pixel reflects your identity — colors, logos, and design built around your brand.",
    },
    {
      title: "No Vendor Branding",
      desc: "Tiiron stays invisible, so your brand is always front and center.",
    },
    {
      title: "Advanced Analytics Dashboard",
      desc: "Track engagement, progress, and performance — from a single course to your entire training ecosystem.",
    },
    {
      title: "Branded Emails & Notifications",
      desc: "Deliver communications that match your company’s voice and design, every time.",
    },
    {
      title: "Multi-Tenant Portals",
      desc: "Easily manage multiple brands, clients, or regions — all from one platform.",
    },
    {
      title: "Fast, Effortless Launch",
      desc: "Set up and roll out new training portals in days, not months.",
    },
    {
      title: "AI-Powered Course Creation",
      desc: "From structuring lessons to personalized suggestions, Tiiron’s AI helps you build courses faster and smarter.",
    },
  ];

  return (
    <div className="relative isolate bg-gradient-to-b from-indigo-50 via-white to-sky-50 py-20">
      <Container>
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl"
          >
            Why Choose <span className="bg-gradient-to-r from-sky-500 to-blue-500 text-transparent bg-clip-text"> Tiiron? </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-gray-600"
          >
            We don’t just provide an LMS — we give you the power to own your
            learning experience with a platform that looks and feels like it’s
            100% yours.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {whyList.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-md transition hover:scale-[1.03] hover:border-blue-300"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-blue-500">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-gray-900">{item.title}</p>
                <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </div>
  );
};

export default WhyChoose;
