import React from "react";
import { Users, Building2, Store, Briefcase, GraduationCap } from "lucide-react";
import image1 from "../../assets/explore/Who-its-for.png"

interface Item {
  icon: React.ReactNode;
  text: string;
}

const WhoItsFor: React.FC = () => {
  const items: Item[] = [
    {
      icon: <Users className="w-6 h-6 text-sky-500" />,
      text: "Training Companies can deliver courses under their own brand identity.",
    },
    {
      icon: <Store className="w-6 h-6 text-fuchsia-500" />,
      text: "Franchises that require regional or location-specific training portals.",
    },
    {
      icon: <Briefcase className="w-6 h-6 text-emerald-500" />,
      text: "Resellers & Consultants offering training-as-a-service to clients.",
    },
    {
      icon: <Building2 className="w-6 h-6 text-indigo-500" />,
      text: "Large Enterprises managing multiple internal brands across departments.",
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-orange-500" />,
      text: "Schools & Universities running independent programs or campuses.",
    },
  ];

  return (
    <section className="bg-white py-12 sm:py-18 md:py-18 lg:py-22 relative overflow-hidden">
      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 via-fuchsia-400/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center relative">
        {/* Left - Text */}
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl  text-gray-900 mb-6">
            Who is{" "}
            <span className="bg-gradient-to-r from-sky-500 to-fuchsia-500 bg-clip-text text-transparent">
              Tiiron
            </span>{" "}
            For?
          </h2>
          <p className="text-gray-600 mb-8 max-w-md">
            Tiiron empowers organizations of every scale to deliver branded,
            scalable, and impactful training experiences.
          </p>

          <ul className="space-y-6">
            {items.map((item, i) => (
              <li
                key={i}
                className="flex gap-4 items-start bg-gray-100 rounded-xl p-4 hover:bg-gray-200 transition"
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <p className="text-gray-800">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Right - Visual */}
        <div className="relative">
          <div className="bg-gradient-to-br from-sky-200/20 to-fuchsia-200/20 p-6 rounded-2xl border border-gray-200 shadow-xl">
            <img
              src={image1}
              alt="Tiiron platform mockup"
              className="rounded-xl shadow-lg"
            />
          </div>
          {/* Glow effect */}
          <div className="absolute -inset-8 bg-gradient-to-r from-sky-200/20 to-fuchsia-200/20 blur-3xl opacity-40 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;
