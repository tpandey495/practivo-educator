// Navbar.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Badge,
  useMediaQuery,
  useTheme,
  Drawer,
  Typography,
  alpha,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link as RouterLink, useLocation } from "react-router-dom";

import SearchBox from "./header/SearchBox";
import FilterButton from "./header/FilterButton";
import ProfilePopup from "./header/profilePopup";
import { CartModal } from "./cart/cartModal";
import { GenerateQuizModal } from "./quiz/GenerateQuizModal";
// Cart query stub - course-browse not in practivo-creator
const useGetCartQuery = () => ({ data: null });
import { useAuth } from "../../hooks/useAuth";

type DropdownItem = {
  name: string;
  desc?: string;
  href: string;
};

type NavItem = {
  name: string;
  href?: string; // optional for pure dropdown parents
  hasDropdown?: boolean;
  dropdown?: DropdownItem[];
};

const navigationItems: NavItem[] = [
  // {
  //   name: "Why Tiiron",
  //   hasDropdown: true,
  //   dropdown: [
  //     { name: "Why Tiiron", desc: "Learn from success stories", href: "/whytiiron" },
  //     { name: "Who It's For", desc: "See who benefits from us", href: "/whomfor" },
  //     { name: "How It Works", desc: "Understand our platform workflow", href: "/ourplatform" },
  //   ],
  // },
  // {
  //   name: "Explore",
  //   hasDropdown: true,
  //   dropdown: [
  //     { name: "Browse Courses", desc: "Explore our course catalog", href: "/learner/browse-courses" },
  //     // external example (keeps external behavior)
  //     { name: "Tiiron Business", desc: "AI-powered learning solutions", href: "https://tiiron-for-business" },
  //   ],
  // },
  // {
  //   name: "Resources",
  //   hasDropdown: true,
  //   dropdown: [
  //     { name: "Blog", desc: "Insights, tips & updates", href: "/blog" },
  //     { name: "Docs", desc: "Developer & API documentation", href: "/docs" },
  //     { name: "Community", desc: "Join our community space", href: "/community" },
  //   ],
  // },
  // Example of a plain clickable nav item (no dropdown)

  {
    name: "Learning Path",
    href: "/paths",
    hasDropdown: false,
  },
  {
    name: "Creator",
    href: "https://creator.practivo.com",
    hasDropdown: false,
  },
];

const isExternal = (href?: string) => !!href && (href.startsWith("http://") || href.startsWith("https://"));

const NavLink = ({
  to,
  children,
  onClick,
  sx,
  external,
}: {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  sx?: any;
  external?: boolean;
}) => {
  if (external) {
    return (
      <a href={to} onClick={onClick} style={{ textDecoration: "none", color: "inherit" }}>
        <Box sx={sx}>{children}</Box>
      </a>
    );
  }
  return (
    <RouterLink to={to} onClick={onClick} style={{ textDecoration: "none", color: "inherit" }}>
      <Box sx={sx}>{children}</Box>
    </RouterLink>
  );
};

const Navbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const isSmallMobile = useMediaQuery("(max-width:400px)");
  const location = useLocation();
  const { user, isLoggedIn } = useAuth();

  const { data: cartData } = useGetCartQuery(undefined, {
    pollingInterval: 30000,
    skip: !isLoggedIn,
  });
  const cartItemCount = cartData?.data?.items?.length || 0;

  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (href?: string) =>
    href ? location.pathname === href || location.pathname.startsWith(href + "/") : false;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu when leaving mobile breakpoint
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
      setOpenDropdown(null);
    }
  }, [isMobile]);

  const toggleMobileMenu = () => setIsOpen((s) => !s);
  const closeMobileMenu = () => {
    setIsOpen(false);
    setOpenDropdown(null);
  };

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };
  const handleCloseCart = () => setIsCartOpen(false);
  const handleOpenQuizModal = () => {
    setIsQuizModalOpen(true);
  };
  const handleCloseQuizModal = () => {
    setIsQuizModalOpen(false);
  };

  /* ========== Render helpers ========== */

  const renderDropdownBox = (item: NavItem) => {
    if (!item.dropdown || item.dropdown.length === 0) return null;

    return (
      <Box
        className="dropdown-container"
        data-dropdown={item.name}
        sx={{
          position: "absolute",
          top: "100%",
          left: 0,
          mt: 0.25,
          pt: 0.5,
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          padding: "0.75rem",
          minWidth: "256px",
          width: "256px",
          maxWidth: "90vw",
          zIndex: 1200,
          border: "1px solid #e5e7eb",
          opacity: openDropdown === item.name ? 1 : 0,
          visibility: openDropdown === item.name ? "visible" : "hidden",
          transform: openDropdown === item.name ? "translateY(0)" : "translateY(-8px)",
          transition: "all 0.26s cubic-bezier(0.4,0,0.2,1)",
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
          pointerEvents: openDropdown === item.name ? "auto" : "none",
        }}
      >
        {item.dropdown.map((drop) => {
          const active = isActive(drop.href);
          return (
            <NavLink
              key={drop.name}
              to={drop.href}
              onClick={() => setOpenDropdown(null)}
              external={isExternal(drop.href)}
              sx={{
                position: "relative",
                display: "block",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                background: active ? "linear-gradient(to right,#fef2f2,#fdf2f8)" : "transparent",
                textDecoration: "none",
              }}
            >
              {/* accent bar */}
              <Box
                className="accent-bar"
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: "4px",
                  background: "linear-gradient(to bottom,#ef4444,#ec4899)",
                  borderRadius: "0 6px 6px 0",
                  opacity: active ? 1 : 0,
                  transition: "opacity 0.2s",
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  fontSize: 15,
                  color: active ? "#ef4444" : "#0f172a",
                  mb: 0.25,
                }}
              >
                {drop.name}
                {item.name === "Resources" &&
                  ["Blog", "Docs", "Community"].includes(drop.name) && (
                    <Box
                      component="span"
                      sx={{
                        ml: 1,
                        display: "inline-flex",
                        alignItems: "center",
                        px: 0.5,
                        py: 0.125,
                        borderRadius: "9999px",
                        backgroundColor: "#e7f0fd",
                        color: "#2563eb",
                        fontSize: 10,
                        fontWeight: 700,
                        border: "1px solid #b6d1fa",
                        marginLeft: 8,
                      }}
                    >
                      Coming Soon
                    </Box>
                  )}
              </Typography>
              <Typography variant="caption" sx={{ color: active ? "#374151" : "#6b7280" }}>
                {drop.desc}
              </Typography>
            </NavLink>
          );
        })}
      </Box>
    );
  };

  const renderDesktopNavItem = (item: NavItem) => {
    // If item has dropdown -> render button that toggles dropdown on click & hover
    if (item.hasDropdown && item.dropdown && item.dropdown.length > 0) {
      return (
        <Box
          key={item.name}
          onMouseEnter={() => setOpenDropdown(item.name)}
          onMouseLeave={() => setOpenDropdown((prev) => (prev === item.name ? null : prev))}
          sx={{ position: "relative" }}
        >
          <Button
            variant="text"
            onClick={() => setOpenDropdown((prev) => (prev === item.name ? null : item.name))}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              fontWeight: 700,
              fontSize: 15,
              textTransform: "none",
              padding: "0.625rem 1rem",
              borderRadius: 2,
              color: "#111827",
              backgroundColor: "transparent",
              "&:hover": {
                color: "transparent",
                background: "linear-gradient(to right,#ef4444,#a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              },
            }}
          >
            <Box component="span">{item.name}</Box>
            <Box component="span" sx={{ fontSize: 11, ml: 0.5, transform: openDropdown === item.name ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s" }}>
              ▼
            </Box>
          </Button>
          {renderDropdownBox(item)}
        </Box>
      );
    }

    // Plain clickable nav item (no dropdown)
    return (
      <Box key={item.name} sx={{ position: "relative" }}>
        <NavLink
          to={item.href ?? "/"}
          external={isExternal(item.href)}
          onClick={() => setOpenDropdown(null)}
          sx={{
            padding: "0.5rem 0.75rem",
            borderRadius: 1,
            display: "inline-block",
            fontWeight: 700,
            fontSize: 15,
            textDecoration: "none",
            color: isActive(item.href) ? "#ef4444" : "#111827",
            transition: "color 0.2s ease",
            "&:hover": {
              color: "transparent",
              background: "linear-gradient(to right,#ef4444,#a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            },
          }}
        >
          {item.name}
        </NavLink>
      </Box>
    );
  };

  const renderMobileNavItem = (item: NavItem) => {
    if (item.hasDropdown && item.dropdown && item.dropdown.length > 0) {
      return (
        <Box key={item.name} sx={{ mb: 2 }}>
          <Button
            variant="text"
            fullWidth
            onClick={() => setOpenDropdown((prev) => (prev === item.name ? null : item.name))}
            sx={{
              justifyContent: "space-between",
              textTransform: "none",
              fontWeight: 700,
              p: "0.75rem 1rem",
              borderRadius: 2,
              color: "#0f172a",
            }}
          >
            {item.name}
            <Box sx={{ fontSize: 12, transform: openDropdown === item.name ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .25s" }}>
              ▼
            </Box>
          </Button>

          {openDropdown === item.name && (
            <Box sx={{ pl: 2, mt: 1 }}>
              {item.dropdown!.map((drop) => (
                <NavLink
                  key={drop.name}
                  to={drop.href}
                  external={isExternal(drop.href)}
                  onClick={closeMobileMenu}
                  sx={{
                    display: "block",
                    px: 1,
                    py: 0.75,
                    borderRadius: 1,
                    background: isActive(drop.href) ? "linear-gradient(to right,#fef2f2,#fdf2f8)" : "#f9fafb",
                    mb: 1,
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }}>{drop.name}</Typography>
                  {drop.desc && <Typography variant="caption" sx={{ color: "#6b7280" }}>{drop.desc}</Typography>}
                </NavLink>
              ))}
            </Box>
          )}
        </Box>
      );
    }

    // plain link in mobile
    return (
      <Box key={item.name} sx={{ mb: 1 }}>
        <NavLink to={item.href ?? "/"} external={isExternal(item.href)} onClick={closeMobileMenu} sx={{ display: "block", py: 1 }}>
          <Typography sx={{ fontWeight: 700 }}>{item.name}</Typography>
        </NavLink>
      </Box>
    );
  };

  /* ========== JSX ========== */
  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          backgroundColor: isScrolled ? "rgba(255,255,255,1)" : "white",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          boxShadow: isScrolled ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
          borderBottom: isScrolled ? "1px solid #e5e7eb" : "none",
          transition: "all 0.28s",
        }}
      >
        <Box sx={{ maxWidth: "1400px", mx: "auto", px: { xs: 2, sm: 3, md: 4 } }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: { xs: 64, md: 72 } }}>
            {/* Left: Logo + Search + Filter */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: "1 1 auto", minWidth: 0 }}>
              <RouterLink to="/" onClick={closeMobileMenu} style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
                <Box component="img" src="/Tiiron_logo.png" alt="Practivo" sx={{ height: { xs: 32, md: 40 }, objectFit: "contain" }} />
              </RouterLink>

              {!isMobile && (
                <>
                  <Box sx={{ flex: 1, minWidth: 0, maxWidth: { lg: 450 } }}>
                    <SearchBox />
                  </Box>
                  <Box sx={{ flexShrink: 0 }}>
                    <FilterButton />
                  </Box>
                </>
              )}
            </Box>

            {/* Center: Desktop nav + Generate Quiz */}
            {!isMobile && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mx: 3, flexShrink: 0 }}>
                {navigationItems.map((item) => renderDesktopNavItem(item))}
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleOpenQuizModal}
                  sx={{ bgcolor: '#5b3cff', fontWeight: 600 }}
                >
                  ⚡ Generate Quiz
                </Button>
              </Box>
            )}

            {/* Right: Actions */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {!isMobile && isLoggedIn && (
                <>
                  {/* Vertical divider after center nav items */}
                  <Box sx={{ height: '32px', width: '1px', backgroundColor: '#e5e7eb', mx: 1 }} />

                  {/* Grouped action buttons with hover effects */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <IconButton
                      aria-label="Upgrade"
                      sx={{
                        color: "#0f172a",
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: alpha('#EF4444', 0.1),
                          color: '#EF4444',
                          transform: 'scale(1.1)',
                        }
                      }}
                    >
                      <WorkspacePremiumIcon />
                    </IconButton>

                    <IconButton
                      aria-label="Cart"
                      onClick={handleOpenCart}
                      sx={{
                        color: "#0f172a",
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: alpha('#2563eb', 0.1),
                          color: '#2563eb',
                          transform: 'scale(1.1)',
                        }
                      }}
                    >
                      <Badge badgeContent={cartItemCount} color="error" invisible={cartItemCount === 0}>
                        <ShoppingCartIcon />
                      </Badge>
                    </IconButton>

                    <IconButton
                      aria-label="Notifications"
                      sx={{
                        color: "#0f172a",
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: alpha('#F59E0B', 0.1),
                          color: '#F59E0B',
                          transform: 'scale(1.1)',
                        }
                      }}
                    >
                      <NotificationsIcon />
                    </IconButton>
                  </Box>

                  <ProfilePopup />
                </>
              )}

              {!isMobile && !isLoggedIn && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mx: 2, px: 2, borderLeft: "1px solid #e5e7eb" }}>
                  <RouterLink to="/login" style={{ textDecoration: "none" }}>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        borderColor: '#5b3cff',
                        color: '#5b3cff',
                        fontWeight: 600,
                        borderWidth: 2,
                        minWidth: '120px',
                        height: '40px',
                        padding: '8px 24px',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          borderColor: '#5b3cff',
                          backgroundColor: '#5b3cff',
                          color: '#ffffff',
                          transform: 'translateY(-1px)',
                          boxShadow: `0 4px 12px ${alpha('#5b3cff', 0.3)}`,
                        },
                        '&:active': {
                          transform: 'translateY(0)',
                        }
                      }}
                    >
                      Login
                    </Button>
                  </RouterLink>
                  <RouterLink to="/sign-up" style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        bgcolor: '#5b3cff',
                        minWidth: '120px',
                        height: '40px',
                        padding: '8px 24px',
                        fontWeight: 600,
                      }}
                    >
                      Sign Up
                    </Button>
                  </RouterLink>
                </Box>
              )}

              {/* Mobile menu toggle */}
              <IconButton onClick={toggleMobileMenu} sx={{ display: { xs: "inline-flex", lg: "none" }, color: "#0f172a" }}>
                {isOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Mobile Drawer */}
        <Drawer anchor="right" open={isOpen && isMobile} onClose={closeMobileMenu} sx={{ "& .MuiDrawer-paper": { width: { xs: "85%", sm: 400 } } }}>
          <Box sx={{ height: "100%", display: "flex", flexDirection: "column", bgcolor: "#fff" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2, borderBottom: "1px solid #e5e7eb" }}>
              <RouterLink to="/" onClick={closeMobileMenu} style={{ display: "flex", alignItems: "center" }}>
                <Box component="img" src="/Tiiron_logo.png" alt="Practivo" sx={{ height: 32 }} />
              </RouterLink>
              <IconButton onClick={closeMobileMenu}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: "flex", gap: 1.25, p: 2 }}>
              <Box sx={{ flex: 1 }}>
                <SearchBox />
              </Box>
              {!isSmallMobile && (
                <Box sx={{ flexShrink: 0 }}>
                  <FilterButton />
                </Box>
              )}
            </Box>

            <Box sx={{ flex: 1, overflowY: "auto", px: 2 }}>
              {navigationItems.map((item) => renderMobileNavItem(item))}
              <Box sx={{ mb: 1 }}>
                <Box
                  onClick={() => {
                    handleOpenQuizModal();
                    closeMobileMenu();
                  }}
                  sx={{
                    textAlign: "center",
                    p: 1.25,
                    borderRadius: 2,
                    bgcolor: '#5b3cff',
                    color: "#fff",
                    fontWeight: 600,
                    minHeight: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: '#4a2fd4',
                      transform: 'translateY(-1px)',
                    }
                  }}
                >
                  ⚡ Generate Quiz
                </Box>
              </Box>
            </Box>

            <Box sx={{ p: 2, borderTop: "1px solid #e5e7eb" }}>
              {isLoggedIn ? (
                <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                  <IconButton onClick={() => { handleOpenCart(); closeMobileMenu(); }} sx={{ border: "1px solid #e5e7eb", borderRadius: 1 }}>
                    <Badge badgeContent={cartItemCount} color="error" invisible={cartItemCount === 0}><ShoppingCartIcon /></Badge>
                  </IconButton>
                  <IconButton sx={{ border: "1px solid #e5e7eb", borderRadius: 1 }}><NotificationsIcon /></IconButton>
                  <IconButton sx={{ border: "1px solid #e5e7eb", borderRadius: 1 }}><WorkspacePremiumIcon /></IconButton>
                  <ProfilePopup />
                </Box>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <RouterLink to="/login" onClick={closeMobileMenu} style={{ textDecoration: "none", flex: 1 }}>
                      <Box
                        sx={{
                          textAlign: "center",
                          p: 1,
                          borderRadius: 2,
                          border: '2px solid #5b3cff',
                          color: '#5b3cff',
                          fontWeight: 600,
                          cursor: 'pointer',
                          minHeight: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            borderColor: '#5b3cff',
                            backgroundColor: '#5b3cff',
                            color: '#ffffff',
                            transform: 'translateY(-1px)',
                            boxShadow: `0 4px 12px ${alpha('#5b3cff', 0.3)}`,
                          },
                          '&:active': {
                            transform: 'translateY(0)',
                          }
                        }}
                      >
                        Login
                      </Box>
                    </RouterLink>
                    <RouterLink to="/sign-up" onClick={closeMobileMenu} style={{ textDecoration: "none", flex: 1 }}>
                      <Box sx={{
                        textAlign: "center",
                        p: 1.25,
                        borderRadius: 2,
                        bgcolor: '#5b3cff',
                        color: "#fff",
                        fontWeight: 600,
                        minHeight: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          transform: 'translateY(-1px)',
                          boxShadow: `0 4px 12px ${alpha('#5b3cff', 0.3)}`,
                        },
                        '&:active': {
                          transform: 'translateY(0)',
                        }
                      }}>
                        Sign Up
                      </Box>
                    </RouterLink>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Drawer>
      </nav>

      {/* Spacer so page content doesn't sit under fixed nav */}
      <Box sx={{ height: { xs: 64, md: 72 } }} />

      {/* Cart Modal */}
      {isLoggedIn && <CartModal isOpen={isCartOpen} onClose={handleCloseCart} />}

      {/* Generate Quiz Modal */}
      <GenerateQuizModal isOpen={isQuizModalOpen} onClose={handleCloseQuizModal} />
    </>
  );
};

export default Navbar;
