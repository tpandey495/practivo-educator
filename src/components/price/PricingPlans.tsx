import { motion } from "framer-motion";

const plans = [
  {
    name: "Basic",
    price: "₹9",
    period: "/month",
    features: ["✔ Essential features", "✔ Email support", "✔ 5 projects"],
    button: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "₹29",
    period: "/month",
    features: [
      "✔ All Basic features",
      "✔ Priority support",
      "✔ Unlimited projects",
    ],
    button: "Choose Pro",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: [
      "✔ Tailored solutions",
      "✔ Dedicated support",
      "✔ SLA guarantees",
    ],
    button: "Contact Sales",
    highlight: false,
  },
];

const PricingPlans = () => {
  return (
    <main className="px-6 py-16 text-center bg-gradient-to-br from-sky-50 via-purple-50 to-pink-50">
      {/* Title */}
      <h2 className="text-3xl sm:text-3xl md:text-5xl lg:text-5xl font-bold mb-4 text-center">
        <span className="bg-gradient-to-r from-indigo-700 via-purple-600 to-fuchsia-700 text-transparent bg-clip-text">
          Our
        </span>
        <span className="bg-gradient-to-r px-3 from-teal-600 via-lime-500 to-green-600 text-transparent bg-clip-text">
          Pricing
        </span>
        <span className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-transparent bg-clip-text">
          Plans
        </span>
      </h2>

      <p className="text-lg text-gray-600 mb-12">
        Choose the plan that fits your needs. Upgrade or cancel anytime.
      </p>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, i) => {
          // Border colors based on design rules
          let borderColor = "";
          if (i === 0) borderColor = "border-indigo-700"; // matches "Our"
          if (i === 1) borderColor = "border-purple-500"; // button gradient vibe
          if (i === 2) borderColor = "border-pink-500"; // matches "Plans"

          return (
            <motion.div
              key={i}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className={`rounded-2xl p-8 shadow-sm hover:shadow-xl transition transform hover:-translate-y-2 border-2 ${borderColor} bg-white`}
            >
              <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
              <p className="text-3xl font-bold mb-6 text-gray-900">
                {plan.price}
                <span className="text-base font-medium text-gray-600">
                  {plan.period}
                </span>
              </p>
              <ul className="text-gray-700 mb-8 space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>

              {/* Button */}
              <button
                className={`w-full px-6 py-3 rounded-lg font-semibold transition cursor-pointer ${
                  plan.highlight
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {plan.button}
              </button>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
};

export default PricingPlans;
