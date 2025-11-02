import React from "react";
import {
  Shield,
  Download,
  Star,
  Award,
  Clock,
  Brain,
  BarChart3,
  Smartphone,
  Headphones,
} from "lucide-react";

const colorMap = {
  emerald: {
    bg: "bg-emerald-500/20",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    hoverBg: "hover:bg-emerald-500/15",
    hoverBorder: "hover:border-emerald-500/40",
  },
  blue: {
    bg: "bg-blue-500/20",
    border: "border-blue-500/30",
    text: "text-blue-400",
    hoverBg: "hover:bg-blue-500/15",
    hoverBorder: "hover:border-blue-500/40",
  },
  purple: {
    bg: "bg-purple-500/20",
    border: "border-purple-500/30",
    text: "text-purple-400",
    hoverBg: "hover:bg-purple-500/15",
    hoverBorder: "hover:border-purple-500/40",
  },
  pink: {
    bg: "bg-pink-500/20",
    border: "border-pink-500/30",
    text: "text-pink-400",
    hoverBg: "hover:bg-pink-500/15",
    hoverBorder: "hover:border-pink-500/40",
  },
  orange: {
    bg: "bg-orange-500/20",
    border: "border-orange-500/30",
    text: "text-orange-400",
    hoverBg: "hover:bg-orange-500/15",
    hoverBorder: "hover:border-orange-500/40",
  },
  sky: {
    bg: "bg-sky-500/20",
    border: "border-sky-500/30",
    text: "text-sky-400",
    hoverBg: "hover:bg-sky-500/15",
    hoverBorder: "hover:border-sky-500/40",
  },
};

const HomeFeatures = () => {
  const topFeatures = [
    {
      icon: Shield,
      title: "Enterprise Security • GDPR Ready",
      color: "emerald",
    },
    { icon: Download, title: "Cloud-based • Instant Setup", color: "blue" },
  ];

  const stats = [
    { icon: Star, value: "10k+", label: "Active Students", color: "sky" },
    { icon: Award, value: "500+", label: "Live Courses", color: "purple" },
    { icon: Clock, value: "98%", label: "Success Rate", color: "emerald" },
  ];

  const bottomFeatures = [
    {
      icon: Brain,
      title: "Adaptive Learning Paths",
      subtitle: "AI-powered personalization for every learner",
      color: "blue",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      subtitle: "Track progress and optimize learning outcomes",
      color: "purple",
    },
    {
      icon: Smartphone,
      title: "Multi-device Support",
      subtitle: "Learn anywhere, anytime, on any device",
      color: "pink",
    },
    {
      icon: Headphones,
      title: "24/7 Expert Support",
      subtitle: "Dedicated support team always ready to help",
      color: "orange",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white border-y border-white/10">
      <div className="container mx-auto px-6 py-16 space-y-16">
        {/* Top Features */}
        <div className="flex flex-wrap items-center justify-center gap-10">
          {topFeatures.map((feature, i) => {
            const Icon = feature.icon;
            const colors = colorMap[feature.color];
            return (
              <div
                key={i}
                className="flex items-center gap-4 text-white/80 hover:text-white transition-colors duration-300"
              >
                <div
                  className={`${colors.bg} ${colors.border} p-3 rounded-xl shadow-sm`}
                >
                  <Icon className={`${colors.text} w-5 h-5`} />
                </div>
                <span className="text-base font-medium">{feature.title}</span>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 text-center">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const colors = colorMap[stat.color];
            return (
              <div
                key={i}
                className="flex flex-col items-center gap-2 group cursor-default -mx-2"
              >
                <div
                  className={`${colors.bg} ${colors.border} p-2 rounded-2xl group-hover:scale-110 transition-all duration-300`}
                >
                  <Icon className={`${colors.text} w-6 h-6`} />
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {bottomFeatures.map((feature, i) => {
            const Icon = feature.icon;
            const colors = colorMap[feature.color];
            return (
              <div
                key={i}
                className={`p-6 rounded-2xl ${colors.hoverBg} ${colors.hoverBorder} bg-gradient-to-br from-[${feature.color}-500]/10 to-transparent border shadow-sm hover:shadow-md transition-all duration-300 group cursor-default`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`${colors.bg} ${colors.border} p-3 rounded-xl group-hover:scale-110 transition-all duration-300`}
                  >
                    <Icon className={`${colors.text} w-5 h-5`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-base mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {feature.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
