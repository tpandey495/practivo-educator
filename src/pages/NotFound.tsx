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
import { Box, Typography, Button, useTheme, useMediaQuery } from "@mui/material";

const NotFound = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <title>404 - Page Not Found | Practivo</title>

      <Navbar />

      {/* OUTER BACKGROUND */}
      <Box 
        sx={{
          position: "relative",
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          background: "linear-gradient(to bottom right, #f0f9ff, #faf5ff, #fdf2f8)"
        }}
      >
        {/* Glow Top Right */}
        <Box 
          sx={{
            position: "absolute",
            top: "-12%",
            right: "-15%",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: "radial-gradient(circle at 40% 40%, rgba(99,102,241,0.25), transparent 70%)",
            filter: "blur(55px)",
            pointerEvents: "none"
          }}
        />

        {/* Glow Bottom Left */}
        <Box 
          sx={{
            position: "absolute",
            bottom: "-12%",
            left: "-12%",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: "radial-gradient(circle at 50% 50%, rgba(34,211,238,0.25), transparent 70%)",
            filter: "blur(55px)",
            pointerEvents: "none"
          }}
        />

        {/* MAIN CENTERED CONTAINER */}
        <Box 
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
            py: 5,
            position: "relative",
            zIndex: 10
          }}
        >
          {/* CHIP */}
          <Box 
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 0.75,
              bgcolor: "rgba(99,102,241,0.12)",
              color: "#4f46e5",
              fontWeight: 600,
              borderRadius: "9999px",
              fontSize: "14px",
              mb: 0
            }}
          >
            <Sparkles size={18} />
            <Typography component="span" sx={{ fontSize: "14px", fontWeight: "inherit" }}>Let's get you back on track</Typography>
          </Box>

          {/* 404 TEXT */}
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              fontWeight: 800,
              color: "transparent",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              backgroundImage: "linear-gradient(to bottom right, #2563eb, #7c3aed, #0ea5e9)",
              fontSize: isMobile ? "3rem" : "4.5rem",
              marginBottom: "4px",
              margin: 0
            }}
          >
            404
          </motion.h1>

          {/* SUB-TEXT */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              maxWidth: "550px",
              margin: "0 auto",
              textAlign: "center"
            }}
          >
            <Typography variant="h2" sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" }, fontWeight: 700, color: "#111827", mb: 0.5 }}>
              We couldn’t find that page
            </Typography>
            <Typography sx={{ color: "#6b7280", lineHeight: 1.625 }}>
              The page you're looking for might have been moved or deleted.
              Let’s get you back to where learning happens.
            </Typography>
          </motion.div>

          {/* CARD */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{ width: "100%", maxWidth: "720px", marginTop: "32px" }}
          >
            <Box 
              sx={{
                borderRadius: 4,
                bgcolor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(229, 231, 235, 0.4)",
                boxShadow: "0 12px 40px rgba(15,23,42,0.08)",
                px: { xs: 3, md: 5 },
                py: { xs: 3, md: 4 }
              }}
            >
              {/* ROW: BACK TO HOME + BROWSE */}
              <Box 
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 5
                }}
              >
                {/* BACK TO HOME */}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, textAlign: "center" }}>
                  <Box sx={{ p: 1, borderRadius: 2, bgcolor: "rgba(79, 70, 229, 0.1)", color: "#4f46e5" }}>
                    <Search size={44} />
                  </Box>

                  <Typography sx={{ fontSize: "1.125rem", fontWeight: 600, mt: 2 }}>Back to Home</Typography>
                  <Typography sx={{ color: "#6b7280", fontSize: "0.875rem", mt: 0.5, maxWidth: "240px" }}>
                    Explore new updates and features on Practivo’s homepage.
                  </Typography>

                  <Button
                    component={Link}
                    to="/"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 3,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      color: "#ffffff",
                      fontWeight: 500,
                      background: "linear-gradient(to right, #6366f1, #8b5cf6, #06b6d4)",
                      boxShadow: "0 6px 18px rgba(99,102,241,0.25)",
                      textTransform: "none",
                      "&:hover": {
                        boxShadow: "0 8px 22px rgba(99,102,241,0.35)",
                      }
                    }}
                  >
                    <ArrowLeft size={16} />
                    Go Home
                  </Button>
                </Box>

                {/* DIVIDER */}
                <Box sx={{ display: { xs: "none", md: "block" }, width: "1px", height: "160px", bgcolor: "rgba(209, 213, 219, 0.7)" }}></Box>
                <Box sx={{ display: { xs: "block", md: "none" }, width: "100%", height: "1px", bgcolor: "rgba(209, 213, 219, 0.7)" }}></Box>

                {/* BROWSE COURSES */}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, textAlign: "center" }}>
                  <Box sx={{ p: 1, borderRadius: 2, bgcolor: "rgba(14, 165, 233, 0.1)", color: "#0ea5e9" }}>
                    <Compass size={44} />
                  </Box>

                  <Typography sx={{ fontSize: "1.125rem", fontWeight: 600, mt: 2 }}>Browse Courses</Typography>
                  <Typography sx={{ color: "#6b7280", fontSize: "0.875rem", mt: 0.5, maxWidth: "240px" }}>
                    Discover AI-powered recommendations just for you.
                  </Typography>

                  <Button
                    component={Link}
                    to="/learner/browse-courses"
                    sx={{
                      mt: 3,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      border: "1px solid rgba(14, 165, 233, 0.6)",
                      color: "#0ea5e9",
                      fontWeight: 500,
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: "rgba(14, 165, 233, 0.1)",
                      }
                    }}
                  >
                    Explore
                  </Button>
                </Box>
              </Box>

              {/* DIVIDER */}
              <Box sx={{ my: 3, height: "1px", bgcolor: "rgba(209, 213, 219, 0.7)" }}></Box>

              {/* SUPPORT SECTION */}
              <Box 
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Headset size={26} color="#4f46e5" />
                  <Box sx={{ textAlign: "left" }}>
                    <Typography sx={{ fontWeight: 600, color: "#1f2937", fontSize: "0.875rem" }}>
                      Need support?
                    </Typography>
                    <Typography sx={{ color: "#6b7280", fontSize: "0.875rem" }}>
                      Our team is here to help you right away.
                    </Typography>
                  </Box>
                </Box>

                <Button
                  component={Link}
                  to="/contact"
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    color: "#ffffff",
                    fontWeight: 500,
                    textTransform: "none",
                    background: "linear-gradient(to right, #22c55e, #14b8a6)",
                    boxShadow: "0 6px 16px rgba(34,197,94,0.25)",
                    "&:hover": {
                      boxShadow: "0 8px 20px rgba(34,197,94,0.35)",
                    }
                  }}
                >
                  Contact Support
                </Button>
              </Box>
            </Box>
          </motion.div>

          {/* GO BACK */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 3 }}>
            <Typography sx={{ color: "#6b7280", fontSize: "0.875rem" }}>Want to go back?</Typography>
            <Button
              onClick={() => navigate(-1)}
              sx={{
                p: 0,
                color: "#4f46e5",
                fontWeight: 600,
                fontSize: "0.875rem",
                minWidth: "auto",
                textTransform: "none",
                "&:hover": {
                  textDecoration: "underline",
                  bgcolor: "transparent"
                }
              }}
            >
              Previous page →
            </Button>
          </Box>
        </Box>

        <Footer />
      </Box>
    </>
  );
};

export default NotFound;
