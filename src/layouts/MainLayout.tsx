import { useEffect, useRef, useState } from "react";
import { Box, Drawer, useMediaQuery, useTheme } from "@mui/material";
import SidebarMenu from "../components/ui/sidebar/Sidebar";
import LogoAndName from "../components/ui/sidebar/LogoAndName";
import Header from "../components/ui/header/Header";
import { Outlet, useLocation } from "react-router-dom";
import { adminRoutes } from "../routes/adminRoutes";

const drawerWidth = 240;
const collapsedWidth = 72;

const MainLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(106);
  const HEADER_CONTENT_GAP = 16;

  const handleToggleDesktopMenu = () => setDesktopOpen((prev) => !prev);
  const handleToggleMobileMenu = () => setMobileOpen((prev) => !prev);

  // Auto-close sidebar on route change (keeps desktop collapsed and closes mobile drawer)
  useEffect(() => {
    setDesktopOpen(false);
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    if (!headerRef.current) return;

    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(() => updateHeight());
    resizeObserver.observe(headerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      {/* ✅ MOBILE DRAWER */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleToggleMobileMenu}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <LogoAndName toggleMenu={handleToggleMobileMenu} open={true} />
          <SidebarMenu routes={adminRoutes} open={true} />
        </Drawer>
      )}

      {/* ✅ DESKTOP DRAWER */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          open={desktopOpen}
          sx={{
            width: desktopOpen ? drawerWidth : collapsedWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: desktopOpen ? drawerWidth : collapsedWidth,
              boxSizing: "border-box",
              transition: "width 0.3s ease",
              overflowX: "hidden",
            },
          }}
        >
          <LogoAndName
            toggleMenu={handleToggleDesktopMenu}
            open={desktopOpen}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100vh",
            }}
          >
            <SidebarMenu routes={adminRoutes} open={desktopOpen} />
          </Box>
        </Drawer>
      )}

      {/* ✅ MAIN CONTENT */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Box
          ref={headerRef}
          sx={{
            position: "fixed",
            top: 0,
            left: !isMobile
              ? desktopOpen
                ? `${drawerWidth}px`
                : `${collapsedWidth}px`
              : 0,
            width: !isMobile
              ? `calc(100% - ${desktopOpen ? drawerWidth : collapsedWidth}px)`
              : "100%",
            zIndex: 1100,
            backgroundColor: "rgba(241, 242, 244, 1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Header
            onHamburgerClick={
              isMobile ? handleToggleMobileMenu : handleToggleDesktopMenu
            }
            isSidebarOpen={isMobile ? mobileOpen : desktopOpen}
          />
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            // padding: 2,
            marginTop: `${Math.max(headerHeight - HEADER_CONTENT_GAP, 0)}px`,
            overflow: "auto",
            background: "rgba(241, 242, 244, 1)",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
