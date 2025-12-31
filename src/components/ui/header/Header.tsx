import { Box, IconButton, useMediaQuery, } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchBox from "./SearchBox";
import FilterButton from "./FilterButton";
import { useTheme } from "@mui/material/styles";
import ProfilePopup from "./profilePopup";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import NotificationsIcon from "@mui/icons-material/Notifications";
// import { useState } from "react";
// import { CartModal } from "../cart/cartModal";
// Cart query removed - course-browse not in tiiron-for-business
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

  // const [isCartOpen, setIsCartOpen] = useState(false);

  // const { data: cartData } = useGetCartQuery(undefined, {
  //   pollingInterval: 30000,
  // });

  // const cartItemCount = cartData?.data?.items?.length || 0;
  // const handleOpenCart = () => setIsCartOpen(true);
  // const handleCloseCart = () => setIsCartOpen(false);

  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        // padding: "24px",
        padding: isMobile ? "24px 8px" : "24px",
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Hamburger toggles between open/close icons */}
        {isMobile && onHamburgerClick && (
          <IconButton onClick={onHamburgerClick}>
            {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        )}
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
