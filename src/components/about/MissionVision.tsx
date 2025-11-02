import { Lightbulb, Globe, CheckCircle, ArrowRight } from "lucide-react";

const colorMap = {
  sky: {
    bg: "bg-sky-500/20",
    border: "border-sky-500/30",
    text: "text-sky-400",
    hoverBg: "hover:bg-sky-500/15",
    hoverBorder: "hover:border-sky-500/40",
  },
  purple: {
    bg: "bg-purple-500/20",
    border: "border-purple-500/30",
    text: "text-purple-400",
    hoverBg: "hover:bg-purple-500/15",
    hoverBorder: "hover:border-purple-500/40",
  },
  green: {
    bg: "bg-emerald-500/20",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    hoverBg: "hover:bg-emerald-500/15",
    hoverBorder: "hover:border-emerald-500/40",
  },
  pink: {
    bg: "bg-pink-500/20",
    border: "border-pink-500/30",
    text: "text-pink-400",
    hoverBg: "hover:bg-pink-500/15",
    hoverBorder: "hover:border-pink-500/40",
  },
};

const MissionVision = () => {
  const cards = [
    {
      icon: Lightbulb,
      title: "Mission",
      desc: "To revolutionize learning by making it faster, easier, and more engaging — empowering organizations to deliver personalized training without complexity.",
      bullets: [
        "AI-driven personalization for every learner",
        "Simple authoring and effortless deployment",
      ],
      link: { label: "Learn more", href: "/mission" },
      color: "sky",
    },
    {
      icon: Globe,
      title: "Vision",
      desc: "To be the world’s most intuitive and powerful learning platform — where education meets automation and creativity, enabling learners and businesses to thrive globally.",
      bullets: [
        "Scalable learning for teams of any size",
        "Insights-driven outcomes and measurable growth",
      ],
      link: { label: "Explore our vision", href: "/vision" },
      color: "purple",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white border-y border-white/10">
      <div className="container mx-auto px-6 py-20 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <p className="text-sm font-semibold text-amber-400 uppercase tracking-wide">
  About Tiiron
</p>


          
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300">
              Mission
            </span>{" "}
            &{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-pink-400">
              Vision
            </span>
          </h2>

          <p className="text-white/70 text-base md:text-lg leading-relaxed">
            We build thoughtful tools and experiences to help learners and
            creators achieve more — faster and with confidence.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, i) => {
            const Icon = card.icon;
            const colors = colorMap[card.color as keyof typeof colorMap];

            return (
              <div
                key={i}
                className={`p-8 rounded-2xl ${colors.hoverBg} ${colors.hoverBorder} bg-gradient-to-br from-[${card.color}-500]/10 to-transparent border shadow-sm hover:shadow-md transition-all duration-300 group`}
              >
                <div className="flex items-start gap-5">
                  <div
                    className={`${colors.bg} ${colors.border} p-3 rounded-xl group-hover:scale-110 transition-all duration-300`}
                  >
                    <Icon className={`${colors.text} w-6 h-6`} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                      {card.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-4">
                      {card.desc}
                    </p>

                    <ul className="space-y-2">
                      {card.bullets.map((bullet, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-white/80 text-sm"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={card.link.href}
                      className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-sky-400 hover:underline"
                    >
                      {card.link.label}
                      <ArrowRight className="w-4 h-4" />
                    </a>
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

export default MissionVision;
