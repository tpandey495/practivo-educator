import { Linkedin, Twitter } from "lucide-react";
import profile1 from "../../assets/profile/rishabh_profile.jpg";
import profile2 from "../../assets/profile/tarun_profile.jpg";
import profile3 from "../../assets/profile/himanshu_profile.png";
import profile4 from "../../assets/profile/ramanuj_profile.jpg";

const teamMembers = [
  {
    name: "Rishabh Singh",
    role: "Co-Founder",
    image: profile1,
    bio: "Architect of our platform. Leads strategy and growth. Drives product design and roadmap.",
    socials: { linkedin: "https://www.linkedin.com/in/itsindrajput/", twitter: "https://twitter.com/itsindrajput", profile: "https://itsindrajput.netlify.app/" },
  },
  {
    name: "Tarun Pandey",
    role: "Co-Founder",
    image: profile2,
    bio: "Focused on scalable systems and performance. Passionate about technology and creating delightful user experiences.",
    socials: { linkedin: "https://in.linkedin.com/in/tpandey495", twitter: "https://x.com/tpandey495", profile: "https://tarunpandey.netlify.app/" },
  },
  {
    name: "Himanshu",
    role: "Lead Developer",
    image: profile3,
    bio: "Driving innovation and leading the development team to deliver high-quality solutions.",
    socials: { linkedin: "#", twitter: "#", profile: "#" },
  },
  {
    name: "Ramanuj Giri",
    role: "Junior Developer",
    image: profile4,
    bio: "Transforming insights into seamless user experiences and turning data into meaningful designs.",
    socials: { linkedin: "https://www.linkedin.com/in/ramanuj-giri-5b49bb237/", twitter: "#", profile: "#" },
  },
];

const MemberCard = ({ member }: any) => {
  const { name, role, image, bio, socials = {} } = member;
  return (
    <article
      tabIndex={0}
      className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg focus-within:shadow-lg transition transform hover:-translate-y-1 focus-within:-translate-y-1"
      aria-labelledby={`${name.replace(/\s+/g, "-")}-name`}
    >
      {/* Image */}
      <div className="relative">
        <img
          src={image}
          alt={`${name} — ${role}`}
          loading="lazy"
          className="w-full h-60 object-cover"
        />

        {/* Overlay Bio */}
        {bio && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <p className="text-sm text-white/90 line-clamp-3">{bio}</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          id={`${name.replace(/\s+/g, "-")}-name`}
          className="text-lg font-semibold text-gray-900"
        >
          {name}
        </h3>
        <p className="mt-1 text-sm text-gray-600">{role}</p>

        {/* Socials */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                aria-label={`${name} on LinkedIn`}
                className="p-2 rounded-md bg-gray-50 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {socials.twitter && (
              <a
                href={socials.twitter}
                aria-label={`${name} on Twitter`}
                className="p-2 rounded-md bg-gray-50 text-gray-600 hover:text-sky-500 hover:bg-sky-50 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Profile CTA */}
          <a
            href={socials.profile}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-sky-600 hover:underline"
            aria-label={`View ${name}'s profile`}
          >
            View Profile
          </a>
        </div>
      </div>
    </article>
  );
};

const Team = ({ members = teamMembers }) => {
  return (
    <section className="py-17 bg-gradient-to-br from-sky-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-r from-sky-600 via-purple-600 to-pink-500 text-transparent bg-clip-text">
              Meet Our Team
            </span>
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            A diverse group of builders, designers, and storytellers — committed
            to creating world-class products that empower learners globally.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {members.map((m, i) => (
            <MemberCard key={i} member={m} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
