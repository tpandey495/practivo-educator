import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Search,
  Sparkles,
  ArrowLeft,
  Compass,
  Headset,
} from "lucide-react";

import { Navbar, Footer } from "../components";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <title>404 - Page Not Found | Tiiron</title>

      <Navbar />

      {/* OUTER BACKGROUND */}
      <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-gradient-to-br from-sky-50 via-purple-50 to-pink-50">

        {/* Glow Top Right */}
        <div className="absolute top-[-12%] right-[-15%] w-[320px] h-[320px] rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(99,102,241,0.25),transparent_70%)] blur-[55px] pointer-events-none" />

        {/* Glow Bottom Left */}
        <div className="absolute bottom-[-12%] left-[-12%] w-[320px] h-[320px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.25),transparent_70%)] blur-[55px] pointer-events-none" />

        {/* MAIN CENTERED CONTAINER */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-10 relative z-10">

          {/* CHIP */}
          <div className="flex items-center gap-2 px-4 py-[6px] bg-[rgba(99,102,241,0.12)] text-indigo-600 font-semibold rounded-full text-[14px] mb-0">
            <Sparkles size={18} />
            <span>Let's get you back on track</span>
          </div>

          {/* 404 TEXT */}
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#2563eb] via-[#7c3aed] to-[#0ea5e9] text-[3rem] md:text-[4.5rem] mb-1"
          >
            404
          </motion.h1>

          {/* SUB-TEXT */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-[550px] mx-auto text-center"
          >
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
              We couldn’t find that page
            </h2>
            <p className="text-gray-500 leading-relaxed">
              The page you're looking for might have been moved or deleted.
              Let’s get you back to where learning happens.
            </p>
          </motion.div>

          {/* CARD */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-full max-w-[720px] mt-8"
          >
            <div className="rounded-2xl bg-white/90 backdrop-blur-xl border border-gray-200/40 shadow-[0_12px_40px_rgba(15,23,42,0.08)] px-6 md:px-10 py-6 md:py-8">

              {/* ROW: BACK TO HOME + BROWSE */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-10">

                {/* BACK TO HOME */}
                <div className="flex flex-col items-center flex-1 text-center">
                  <div className="p-2 rounded-lg bg-indigo-600/10 text-indigo-600">
                    <Search size={44} />
                  </div>

                  <h3 className="text-lg font-semibold mt-2">Back to Home</h3>
                  <p className="text-gray-500 text-sm mt-1 max-w-[240px]">
                    Explore new updates and features on Tiiron’s homepage.
                  </p>

                  <Link
                    to="/"
                    className="flex items-center gap-2 mt-3 px-4 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#06b6d4] shadow-[0_6px_18px_rgba(99,102,241,0.25)] hover:shadow-[0_8px_22px_rgba(99,102,241,0.35)] transition"
                  >
                    <ArrowLeft size={16} />
                    Go Home
                  </Link>
                </div>

                {/* DIVIDER */}
                <div className="hidden md:block w-px h-40 bg-gray-300/70"></div>
                <div className="md:hidden w-full h-px bg-gray-300/70"></div>

                {/* BROWSE COURSES */}
                <div className="flex flex-col items-center flex-1 text-center">
                  <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
                    <Compass size={44} />
                  </div>

                  <h3 className="text-lg font-semibold mt-2">Browse Courses</h3>
                  <p className="text-gray-500 text-sm mt-1 max-w-[240px]">
                    Discover AI-powered recommendations just for you.
                  </p>

                  <Link
                    to="/learner/browse-courses"
                    className="mt-3 px-4 py-2 rounded-lg border border-sky-500/60 text-sky-500 hover:bg-sky-500/10 transition font-medium"
                  >
                    Explore
                  </Link>
                </div>
              </div>

              {/* DIVIDER */}
              <div className="my-6 h-px bg-gray-300/70"></div>

              {/* SUPPORT SECTION */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Headset size={26} className="text-indigo-600" />

                  <div className="text-left">
                    <p className="font-semibold text-gray-800 text-sm">
                      Need support?
                    </p>
                    <p className="text-gray-500 text-sm">
                      Our team is here to help you right away.
                    </p>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="px-4 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-[#22c55e] to-[#14b8a6] shadow-[0_6px_16px_rgba(34,197,94,0.25)] hover:shadow-[0_8px_20px_rgba(34,197,94,0.35)] transition"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </motion.div>

          {/* GO BACK */}
          <div className="flex items-center gap-1 mt-3">
            <p className="text-gray-500 text-sm">Want to go back?</p>
            <button
              onClick={() => navigate(-1)}
              className="text-indigo-600 font-semibold text-sm hover:underline"
            >
              Previous page →
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default NotFound;
