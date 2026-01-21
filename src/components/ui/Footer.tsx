import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  TextField,
  Button,
  Link,
  Fab,
} from "@mui/material";
import {
  Email,
  Phone,
  Twitter,
  LinkedIn,
  YouTube,
  Facebook,
  Instagram,
  ArrowUpward,
  Favorite,
  ArrowForward,
  LocationOn,
  Chat,
  OpenInNew,
} from "@mui/icons-material";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Analytics", href: "#" },
        { name: "Integrations", href: "#" },
        { name: "API", href: "#", external: true },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "Help Center", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Webinars", href: "#" },
        { name: "Case Studies", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Careers", href: "mailto:hr@inacademic.com" },
        { name: "Partners", href: "#" },
        { name: "Press Kit", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Twitter />, href: "https://x.com/HrInacademic", label: "Twitter" },
    {
      icon: <LinkedIn />,
      href: "https://www.linkedin.com/company/inacademic",
      label: "LinkedIn",
    },
    {
      icon: <Instagram />,
      href: "https://www.instagram.com/inacademic_official/",
      label: "Instagram",
    },
    {
      icon: <Facebook />,
      href: "https://www.facebook.com/inacademic_official",
      label: "Facebook",
    },
    {
      icon: <YouTube />,
      href: "https://www.youtube.com/@inacademic",
      label: "YouTube",
    },
    { icon: <LocationOn />, href: "https://maps.app.goo.gl/ZfZcpnYpLWUfiKfp6", label: "Location" },
  ];

  const contactInfo = [
    { icon: <Email />, text: "admin@tiiron.com", href: "mailto:admin@tiiron.com" },
    { icon: <Phone />, text: "+91 9161218740", href: "tel:+919161218740" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        background: "linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)",
        color: "#d1d5db",
        mt: 6,
      }}
    >
      {/* Newsletter Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box
          sx={{
            background: "linear-gradient(to right, #1e293b, #0f172a)",
            borderRadius: 3,
            border: "1px solid #475569",
            p: { xs: 2, md: 3 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: { xs: 3, md: 4 },
          }}
        >
          <Box sx={{ flex: 1, minWidth: { xs: "100%", md: "auto" } }}>
            <Typography
              variant="h5"
              sx={{
                color: "#fff",
                fontWeight: 600,
                mb: 0.5,
                fontSize: { xs: "1.1rem", md: "1.25rem" },
              }}
            >
              Get product updates & tips
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#9ca3af",
                fontSize: { xs: "0.875rem", md: "0.9375rem" },
              }}
            >
              Join the Tiiron newsletter — no spam, just useful stuff.
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={(e) => e.preventDefault()}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "stretch", sm: "center" },
              gap: 1.5,
              flex: { xs: 1, md: "none" },
              width: { xs: "100%", md: "auto" },
              minWidth: { xs: "100%", sm: 300, md: 400 },
            }}
          >
            <TextField
              type="email"
              placeholder="Enter your email"
              size="small"
              variant="outlined"
              required
              sx={{
                minWidth: 0,
                flex: { xs: 1, sm: "none" },
                "& .MuiOutlinedInput-root": {
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  backgroundColor: "#1e293b",
                  border: "1px solid #4b5563",
                  transition: "all 0.2s ease",
                  "& fieldset": {
                    borderColor: "#4b5563",
                  },
                  "&:hover fieldset": {
                    borderColor: "#4b5563",
                  },
                  "&.Mui-focused": {
                    outline: "none",
                    boxShadow: "0 0 0 2px rgba(56, 189, 248, 0.2)",
                    "& fieldset": {
                      borderColor: "#38bdf8",
                    },
                  },
                },
                "& .MuiOutlinedInput-input": {
                  color: "#d1d5db",
                  py: 0,
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#9ca3af",
                  opacity: 1,
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              endIcon={<ArrowForward />}
              sx={{
                borderRadius: 2,
                background: "linear-gradient(to right, #dc2626, #db2777)",
                boxShadow: "0 4px 12px rgba(220, 38, 38, 0.4)",
                color: "white",
                px: { xs: 2, md: 3 },
                py: 1.25,
                textTransform: "none",
                fontWeight: 600,
                whiteSpace: "nowrap",
                width: { xs: "100%", sm: "auto" },
                fontSize: { xs: "0.875rem", md: "0.9375rem" },
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  background: "linear-gradient(to right, #b91c1c, #be185d)",
                },
                "&:focus": {
                  outline: "none",
                  boxShadow: "0 0 0 4px rgba(220, 38, 38, 0.3)",
                },
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Main Footer Content */}
      <Container maxWidth="lg" sx={{ pb: { xs: 4, md: 5 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Brand Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Box
                component="img"
                src="/Tiiron_logo_footer.png"
                alt="Tiiron Logo"
                sx={{
                  height: { xs: 40, md: 48 },
                  width: "auto",
                  mb: 2,
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              />
              <Box sx={{ color: "#9ca3af" }}>
                <Typography variant="body2"
                  sx={{
                    mb: 2,
                    fontSize: { xs: 14, md: 15 },
                    lineHeight: 1.6,
                    color: "#9ca3af",
                  }}
                >
                  We help educators deliver interactive learning and real-time practice.
                  Learners don't just watch — they practice, improve, and master concepts.
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 2, md: 3 }, alignItems: "center", mt: 1 }}>
                {contactInfo.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    variant="body2"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 1,
                      color: "#9ca3af",
                      fontSize: { xs: "13px", md: "14px" },
                      textDecoration: "none",
                      transition: "color 0.2s",
                      "&:hover": { color: "#d1d5db" },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", fontSize: { xs: "16px", md: "18px" }, color: "inherit" }}>
                      {item.icon}
                    </Box>
                    <Typography variant="body2" component="span" sx={{ color: "inherit", fontSize: "inherit" }}>
                      {item.text}
                    </Typography>
                  </Link>
                ))}
              </Box>

            </Box>
          </Grid>

          {/* Footer Sections */}
          {footerSections.map((section, idx) => (
            <Grid item xs={12} sm={6} md={2} key={idx}>
              <Typography
                variant="subtitle2"
                sx={{ color: "white", mb: 2, fontWeight: 600, fontSize: { xs: "0.875rem", md: "0.9375rem" } }}
              >
                {section.title}
              </Typography>
              {section.links.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  sx={{
                    display: "block",
                    color: "#9ca3af",
                    mb: 1.2,
                    fontSize: { xs: "0.8125rem", md: "14px" },
                    textDecoration: "none",
                    transition: "color 0.2s",
                    "&:hover": { color: "white" },
                  }}
                >
                  {link.name} {link.external && <OpenInNew sx={{ fontSize: 12, ml: 0.5, verticalAlign: "middle" }} />}
                </Link>
              ))}
            </Grid>
          ))}

          {/* Social Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#fff",
                mb: 2,
                fontWeight: 600,
                fontSize: { xs: "0.875rem", md: "0.9375rem" },
                textAlign: "left",
              }}
            >
              Follow Us
            </Typography>

            <Grid
              container
              spacing={{ xs: 1, sm: 1 }}
              justifyContent={{ xs: "left", sm: "flex-start" }}
              sx={{
                width: "100%",
                maxWidth: { xs: "100%", sm: 220 },
                mx: "auto",
              }}
            >
              {socialLinks.map((s, i) => (
                <Grid
                  item
                  key={i}
                  xs={5} // two per row
                  sm={5}
                  display="flex"
                  justifyContent={{ xs: "center", sm: "flex-start" }}
                >
                  <IconButton
                    component="a"
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    sx={{
                      color: "#94a3b8",
                      border: "0.5px solid #475569",
                      borderRadius: 1.5, // rounded rectangle, not circle
                      width: "100%",
                      maxWidth: { xs: "100%", sm: 70 },
                      height: { xs: 38, sm: 42 },
                      transition: "all 0.25s ease",
                      backgroundColor: "transparent",
                      "&:hover": {
                        backgroundColor: "rgba(71,85,105,0.4)",
                        borderColor: "#64748b",
                        color: "white",
                        transform: "translateY(-2px)",
                      },
                      "& svg": {
                        fontSize: { xs: "1.1rem", md: "1.4rem" },
                      },
                    }}
                  >
                    {s.icon}
                  </IconButton>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* Bottom Section */}
      <Box
        sx={{
          borderTop: "1px solid #334155",
          py: { xs: 2.5, md: 3 },
          backgroundColor: "#fff",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "center" },
            justifyContent: { xs: "center", md: "space-between" },
            gap: { xs: 1.5, md: 2 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {/* Left Section */}
          <Typography
            variant="body2"
            sx={{
              color: "#6b7280",
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "center", md: "flex-start" },
              flexWrap: "wrap",
              gap: 0.5,
              fontSize: { xs: "12px", md: "14px" },
              lineHeight: 1.6,
            }}
          >
            © {currentYear} Tiiron. All rights reserved.{" "}
            <Box
              component="span"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.3,
                ml: { xs: 0, md: 0.5 },
              }}
            >
              Made with{" "}
              <Favorite
                sx={{ fontSize: { xs: 12, md: 14 }, color: "#dc2626", mx: 0.3 }}
              />{" "}
              in India
            </Box>
          </Typography>

          {/* Right Section - Hidden on Mobile */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" }, // 👈 Hidden on mobile, visible on tablet+
              flexWrap: "wrap",
              gap: { sm: 1.5, md: 2 },
              alignItems: "center",
              justifyContent: { sm: "center", md: "flex-end" },
              width: { sm: "100%", md: "auto" },
            }}
          >
            {[
              { name: "Languages", href: "/languages" },
              { name: "Legal", href: "/legal" },
              { name: "Privacy", href: "/privacy" },
              { name: "Sitemap", href: "/sitemap" },
              { name: "Status", href: "/status" },
            ].map((link, i) => (
              <Link
                key={i}
                href={link.href}
                sx={{
                  color: "#6b7280",
                  fontSize: { sm: "12px", md: "14px" },
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  "&:hover": { color: "#111827" },
                }}
              >
                {link.name}
              </Link>
            ))}
          </Box>
        </Container>
      </Box>


      {/* Floating Action Buttons */}
      <Box
        sx={{
          position: "fixed",
          bottom: { xs: 16, md: 24 },
          right: { xs: 16, md: 24 },
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          zIndex: 1000,
        }}
      >
        {/* Chat Button */}
        <Fab
          size="medium"
          sx={{
            backgroundColor: "#22c55e",
            color: "white",
            width: { xs: 48, md: 56 },
            height: { xs: 48, md: 56 },
            "&:hover": {
              backgroundColor: "#16a34a",
              transform: "scale(1.1)",
            },
            boxShadow: "0 4px 12px rgba(34, 197, 94, 0.4)",
            transition: "all 0.2s",
          }}
          aria-label="Chat"
          onClick={() => {
            // Add your chat functionality here
          }}
        >
          <Chat sx={{ fontSize: { xs: 20, md: 24 } }} />
        </Fab>

        {/* Scroll to Top Button */}
        <Fab
          size="medium"
          sx={{
            backgroundColor: "#0ea5e9",
            color: "white",
            width: { xs: 48, md: 56 },
            height: { xs: 48, md: 56 },
            "&:hover": {
              backgroundColor: "#0284c7",
              transform: "scale(1.1)",
            },
            boxShadow: "0 4px 12px rgba(14, 165, 233, 0.4)",
            transition: "all 0.2s",
          }}
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUpward sx={{ fontSize: { xs: 20, md: 24 } }} />
        </Fab>
      </Box>
    </Box>
  );
};

export default Footer;
