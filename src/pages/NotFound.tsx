import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const NotFound = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-center px-4">
      {/* SEO Friendly Title */}
      <title>404 - Page Not Found</title>

      {/* Animated 404 Number */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-7xl font-extrabold text-blue-600 mb-4"
      >
        404
      </motion.h1>

      {/* Icon / Illustration */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-6"
      >
        <Search size={64} className="text-gray-500 mx-auto" />
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-2xl font-semibold mb-2"
      >
        Page Not Found
      </motion.h2>

      {/* Description */}
      <p className="text-gray-600 mb-6 max-w-md">
        Oops! The page you're looking for doesn't exist or may have been moved.
      </p>

      {/* Navigation Options */}
      <div className="flex gap-4">
        <Link
          to="/"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
        <Link
          to="/contact"
          className="px-6 py-2 border border-gray-400 rounded-lg hover:bg-gray-100 transition"
        >
          Contact Us
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
