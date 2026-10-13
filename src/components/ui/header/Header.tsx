import { Box, IconButton, useMediaQuery, } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Brand from "../../common/Brand";
import SearchBox from "./SearchBox";
import FilterButton from "./FilterButton";
import { useTheme } from "@mui/material/styles";
import ProfilePopup from "./profilePopup";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import NotificationsIcon from "@mui/icons-material/Notifications";
// import { useState } from "react";
// import { CartModal } from "../cart/cartModal";
// Cart query removed - course-browse not in practivo-creator
// const useGetCartQuery = () => ({ data: null });

const Header = ({
  onHamburgerClick,
  isSidebarOpen,
}: {
  onHamburgerClick?: () => void;
  isSidebarOpen?: boolean;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: isMobile ? "16px 12px" : "24px",
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Hamburger toggles between open/close icons */}
        {isMobile && onHamburgerClick && (
          <IconButton onClick={onHamburgerClick}>
            {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        )}
        {isMobile && <Brand size="sm" />}
        <SearchBox />
        <FilterButton />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <IconButton
          sx={{
            color: "#1E2939",
            padding: "8px",
            flexShrink: 0,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "#f3f4f6",
              color: "#ef4444",
              transform: "scale(1.1)",
            },
          }}
          aria-label="Upgrade"
        >
          <WorkspacePremiumIcon />
        </IconButton>
        {/* <IconButton
          onClick={handleOpenCart}
          sx={{
            color: "#000000",
            padding: "8px",
            flexShrink: 0,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "#f3f4f6",
              transform: "scale(1.1)",
              "& svg": {
                color: "#2563eb",
              },
            },
          }}
          aria-label="Shopping cart"
        >
          <Badge
            badgeContent={cartItemCount}
            color="error"
            max={9}
            invisible={cartItemCount === 0}
          >
            <ShoppingCartIcon />
          </Badge>
        </IconButton> */}
        <IconButton
          sx={{
            color: "#000000",
            padding: "8px",
            flexShrink: 0,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "#f3f4f6",
              transform: "scale(1.1)",
              "& svg": {
                color: "#fbbf24",
              },
            },
          }}
          aria-label="Notifications"
        >
          <NotificationsIcon />
        </IconButton>

        <ProfilePopup></ProfilePopup>
      </Box>
      {/* <CartModal isOpen={isCartOpen} onClose={handleCloseCart} /> */}
    </Box>
  );
};

export default Header;
