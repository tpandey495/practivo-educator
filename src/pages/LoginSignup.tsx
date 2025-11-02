import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, LogIn } from "lucide-react";

const LoginSignup = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialAction = queryParams.get("action") === "login" ? "Login" : "Sign Up";

  const [action, setAction] = useState<"Sign Up" | "Login">(initialAction);
  
  // const [action, setAction] = useState<"Sign Up" | "Login">("Sign Up");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-purple-50 to-pink-50 px-4">
      {/* Background gradient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-15rem] h-[35rem] w-[35rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-400/10 via-fuchsia-400/10 to-violet-400/10 blur-3xl" />
      </div>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            {action === "Sign Up" ? (
              <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-indigo-600 text-transparent bg-clip-text">
            Create an Account
          </span>

            ) : (
              <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 text-transparent bg-clip-text">
                Welcome Back
              </span>
            )}
          </h2>
          <p className="mt-2 text-gray-600">
            {action === "Sign Up"
              ? "Join us and start your journey with Tiiron."
              : "Log in to access your Tiiron dashboard."}
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {action === "Sign Up" && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name 
              </label>
              <div className="flex items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 focus-within:border-sky-300 focus-within:ring-2 focus-within:ring-sky-200 transition">
                <User className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <div className="flex items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 focus-within:border-sky-300 focus-within:ring-2 focus-within:ring-sky-200 transition">
              <Mail className="w-5 h-5 text-gray-400 mr-3" />
              <input
                id="email"
                type="email"
                placeholder="you@company.com"
                className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="flex items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 focus-within:border-sky-300 focus-within:ring-2 focus-within:ring-sky-200 transition">
              <Lock className="w-5 h-5 text-gray-400 mr-3" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Forgot password */}
        {action === "Login" && (
          <div className="text-sm text-gray-500 mt-3 text-right">
            Forgot Password?{" "}
            <span className="text-sky-600 hover:underline cursor-pointer">
              Reset here
            </span>
          </div>
        )}

        {/* Button */}
        <button
          className="w-full mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition transform bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500 shadow-lg hover:opacity-90 hover:scale-[1.02]"
        >
          {action === "Sign Up" ? (
            <>
              <ArrowRight className="w-5 h-5" /> Create Account
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5" /> Login
            </>
          )}
        </button>

        {/* Toggle */}
        <p className="mt-6 text-center text-sm text-gray-600">
          {action === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setAction("Login")}
                className="text-sky-600 hover:underline cursor-pointer"
              >
                Login
              </span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => setAction("Sign Up")}
                className="text-sky-600 hover:underline cursor-pointer"
              >
                Sign Up
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
