import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // mobile accordion

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if a route is active
  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const navigationItems = [
    { name: "Features", href: "/features"},
    { name: "Product", href: "/product" },
    { name: "Pricing", href: "/pricing" },
    {
      name: "Explore",
      hasDropdown: true,
      dropdown: [
        {
          name: "Why Tiiron",
          desc: "Learn from success stories",
          href: "/whytiiron",
        },
        {
          name: "Who It's For",
          desc: "See who benefits from us",
          href: "/whomfor",
        },
        {
          name: "How It Works",
          desc: "Understand our platform workflow",
          href: "/ourplatform",
        },
      ],
    },
    {
      name: "Resources",
      hasDropdown: true,
      dropdown: [
        { name: "Blog", desc: "Insights, tips & updates", href: "/blog" },
        { name: "Docs", desc: "Developer & API documentation", href: "/docs" },
        {
          name: "Community",
          desc: "Join our community space",
          href: "/community",
        },
      ],
    },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md border-b border-gray-200"
          : "bg-white"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
              <img
                src="/Tiiron_logo.png"
                alt="Tiiron Logo"
                className="h-10 w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </Link>


            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.hasDropdown ? (
                    <>
                      <button className={`flex items-center space-x-1 font-medium transition-all duration-200 relative ${item.dropdown?.some(drop => isActive(drop.href))
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500"
                        : "text-gray-800 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-500 hover:to-purple-500"
                        }`}>
                        <span>{item.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform group-hover:rotate-180 duration-300 ${item.dropdown?.some(drop => isActive(drop.href))
                          ? "text-red-500"
                          : ""
                          }`} />
                      </button>

                      {/* Dropdown Menu */}
                      <div className="absolute left-0 mt-3 w-64 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transform transition-all duration-300 ease-out">
                        <div className="p-3 space-y-1">
                          {item.dropdown?.map((drop) => (
                            <Link
                              key={drop.name}
                              to={drop.href}
                              className={`group/item relative block px-4 py-3 rounded-lg transition-all duration-200 ${isActive(drop.href)
                                ? "bg-gradient-to-r from-red-50 to-pink-50 border-l-2 border-red-500"
                                : "hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50"
                                }`}
                            >
                              {/* cool hover accent */}
                              <span className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-red-500 to-pink-500 rounded-r transition-opacity duration-300 ${isActive(drop.href)
                                ? "opacity-100"
                                : "opacity-0 group-hover/item:opacity-100"
                                }`}></span>

                              <p className={`text-sm font-semibold transition-colors duration-200 ${isActive(drop.href)
                                ? "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600"
                                : "text-gray-800 group-hover/item:text-transparent group-hover/item:bg-clip-text group-hover/item:bg-gradient-to-r group-hover/item:from-red-500 group-hover/item:to-purple-500"
                                }`}>
                                {drop.name}
                                {item.name === "Resources" && ["Blog", "Docs", "Community"].includes(drop.name) && (
                                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-[#e7f0fd] text-[#2563eb] text-[10px] font-semibold border border-[#b6d1fa] shadow-sm">Coming Soon</span>
                                )}
                              </p>
                              <p className={`text-xs transition-colors duration-200 ${isActive(drop.href)
                                ? "text-gray-700"
                                : "text-gray-600"
                                }`}>
                                {drop.desc}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      to={item.href || "/"}
                      className={`font-medium transition-all duration-200 relative px-2 py-1 rounded-md ${item.href && isActive(item.href)
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600"
                        : item.highlight
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500 hover:from-red-600 hover:to-purple-600"
                          : "text-gray-800 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-500 hover:to-purple-500"
                        }`}
                    >
                      {item.name}
                      {item.href && isActive(item.href) && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></span>
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href="https://tiiron.com/login"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-gray-800 bg-gray-100 rounded-full hover:bg-gray-200 text-center transition"
              >
                Login
              </a>

              <a
                href="https://tiiron.com/organization/create-account"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-200"
              >
                Get Started for Free →
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-all duration-300"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="bg-white border-t border-gray-200 px-6 py-6 space-y-4">
            {navigationItems.map((item) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.name ? null : item.name
                        )
                      }
                      className={`w-full flex justify-between items-center px-3 py-2 rounded-md font-medium transition-all duration-200 ${item.dropdown?.some(drop => isActive(drop.href))
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500 hover:from-red-600 hover:to-purple-600"
                        : "text-gray-800 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-500 hover:to-purple-500 hover:bg-red-50"
                        }`}
                    >
                      {item.name}
                      <ChevronDown
                        className={`w-4 h-4 transform transition-transform ${openDropdown === item.name ? "rotate-180" : ""
                          } ${item.dropdown?.some(drop => isActive(drop.href))
                            ? "text-red-500"
                            : ""
                          }`}
                      />
                    </button>

                    {/* Dropdown items for mobile */}
                    {openDropdown === item.name && (
                      <div className="pl-4 mt-2 space-y-2">
                        {item.dropdown?.map((drop) => (
                          <Link
                            key={drop.name}
                            to={drop.href}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-2 rounded-md transition-all duration-200 ${isActive(drop.href)
                              ? "bg-gradient-to-r from-red-50 to-pink-50 border-l-2 border-red-500"
                              : "bg-gray-50 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50"
                              }`}
                          >
                            <p className={`text-sm font-medium transition-colors duration-200 ${isActive(drop.href)
                              ? "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600"
                              : "text-gray-800"
                              }`}>
                              {drop.name}
                              {item.name === "Resources" && ["Blog", "Docs", "Community"].includes(drop.name) && (
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-[#e7f0fd] text-[#2563eb] text-[10px] font-semibold border border-[#b6d1fa] shadow-sm">Soon</span>
                              )}
                            </p>
                            <p className="text-xs text-gray-500">{drop.desc}</p>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href || "/"}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md font-medium transition-all duration-200 ${item.href && isActive(item.href)
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600 bg-red-50"
                      : item.highlight
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500 hover:from-red-600 hover:to-purple-600 hover:bg-red-50"
                        : "text-gray-800 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-500 hover:to-purple-500 hover:bg-red-50"
                      }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile CTA */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <a
                href="https://tiiron.com/login"
                onClick={() => setIsOpen(false)}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-gray-800 bg-gray-100 rounded-full hover:bg-gray-200 text-center transition"
              >
                Login
              </a>

              <a
                href="https://tiiron.com/organization/create-account"
                onClick={() => setIsOpen(false)}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-full hover:from-red-600 hover:to-pink-600 text-center"
              >
                Get Started for Free →
              </a>
            </div>

          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;

