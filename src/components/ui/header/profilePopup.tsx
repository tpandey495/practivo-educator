import React, { useState, useMemo } from "react";
import {
  Avatar,
  Box,
  Button,
  Modal,
  Typography,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const menuItems = [
  {
    text: "Course Dashboard",
    icon: <MenuBookOutlinedIcon />,
    color: "#2196F3",
    onClick: (navigate: NavigateFunction) => {
      navigate("/dashboard");
    }
  },
  {
    text: "Create New Course",
    icon: <AddCircleOutlineIcon />,
    color: "#9C27B0",
    onClick: (navigate: NavigateFunction) => {
      navigate("/courses");
    }
  },
  {
    text: "View as Learner",
    icon: <VisibilityOutlinedIcon />,
    color: "#00BCD4",
    onClick: () => {
      window.open("https://www.practivo.com/", "_blank");
    }
  },
  {
    text: "Account Setting",
    icon: <PersonOutlineOutlinedIcon />,
    color: "#4CAF50",
    onClick: (navigate: NavigateFunction) => {
      navigate("/profile");
    }
  },
  {
    text: "Help & Support",
    icon: <HelpOutlineOutlinedIcon />,
    color: "#FF5722",
    onClick: () => {
      window.open("https://creator.practivo.com/contact", "_blank");
    }
  },
];

const ProfileCenterPopup = () => {
  const [open, setOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleOpen = () => {
    setOpen(true);
    setImageError(false); // Reset image error when opening
  };
  const handleClose = () => setOpen(false);
  const handleImageError = () => {
    setImageError(true);
  };

  const handleSignOut = async () => {
    try {
      // Clear localStorage (roleId, etc.)
      localStorage.clear();
      // Clear cookies by setting them to expire (cookies are managed by backend)
      // The backend should handle cookie clearing on logout endpoint
      // For now, we'll redirect and let the backend handle it
      // Redirect to login
      window.location.href = "/login";
    } catch (error) {
      console.error("Error signing out:", error);
      // Still clear localStorage and redirect
      localStorage.clear();
      window.location.href = "/login";
    }
  };

  // Get user data from JWT token
  const userData = useMemo(() => {
    if (user) {
      return {
        id: user.id,
        email: user.email || "",
        firstName: null,
        lastName: null,
        displayName: user.username || "User",
        picture: null,
        photoURL: null,
      };
    }
    return null;
  }, [user]);

  // Get profile image or initials - check if image failed to load
  const profileImage = useMemo(() => {
    if (!userData || imageError) return null;
    return userData.picture || userData.photoURL || null;
  }, [userData, imageError]);

  const profileInitials = useMemo(() => {
    if (!userData) return "U";
    if (userData.firstName && userData.lastName) {
      return `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase();
    }
    if (userData.firstName) {
      return userData.firstName[0].toUpperCase();
    }
    if (userData.lastName) {
      return userData.lastName[0].toUpperCase();
    }
    if (userData.displayName) {
      const parts = userData.displayName.split(" ");
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
      }
      return userData.displayName[0].toUpperCase();
    }
    return "U";
  }, [userData]);

  const getListItemStyles = (color: string, isSelected: boolean) => ({
    "&.MuiListItemButton-root": {
      borderRadius: 2,
      padding: "10px 16px",
      marginBottom: 0.5,
      "&:hover": {
        backgroundColor: `${color}14`,
      },
      ...(isSelected && {
        backgroundColor: `${color}1A`,
      }),
    },
    "& .MuiListItemIcon-root": {
      minWidth: 40,
      "& svg": {
        color: color,
      },
    },
  });

  return (
    <>
      {/* Trigger Avatar */}
      <Avatar
        src={profileImage && !imageError ? profileImage : undefined}
        onError={handleImageError}
        onClick={handleOpen}
        sx={{
          cursor: "pointer",
          width: 42,
          height: 42,
          background: profileImage && !imageError
            ? "transparent"
            : "linear-gradient(to right, #ef4444, #ec4899)",
          color: "#fff",
          fontWeight: 600,
          fontSize: "1rem",
          transition: "all 0.2s ease",
          "&:hover": {
            background: profileImage && !imageError
              ? "transparent"
              : "linear-gradient(to right, #dc2626, #db2777)",
            transform: "scale(1.05)",
          },
        }}
      >
        {(!profileImage || imageError) && profileInitials}
      </Avatar>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="profile-modal-title"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 340,
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
            p: 3,
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "text.secondary",
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Header Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              mb: 2,
            }}
          >
            <Avatar
              src={profileImage && !imageError ? profileImage : undefined}
              onError={handleImageError}
              sx={{
                width: 70,
                height: 70,
                background: profileImage && !imageError
                  ? "transparent"
                  : "linear-gradient(to right, #ef4444, #ec4899)",
                color: "#fff",
                fontSize: "1.5rem",
                fontWeight: 600,
                mb: 1.5,
              }}
            >
              {(!profileImage || imageError) && profileInitials}
            </Avatar>

            <Typography variant="h6" fontWeight={600}>
              {userData?.displayName || "User"}
            </Typography>
            {userData?.email && (
              <Typography variant="body2" color="text.secondary">
                {userData.email}
              </Typography>
            )}
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Menu Items */}
          <List sx={{ width: "100%", padding: 0 }}>
            {menuItems.map((item, index) => {
              return (
                <ListItemButton
                  key={item.text}
                  disableRipple
                  sx={getListItemStyles(item.color, false)}
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick(navigate);
                      handleClose();
                    }
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: 500,
                      fontSize: "0.95rem",
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>

          <Divider sx={{ mt: 2, mb: 2 }} />

          {/* Sign Out Button */}
          <Button
            variant="contained"
            startIcon={<LogoutRoundedIcon />}
            onClick={handleSignOut}
            sx={{
              width: "100%",
              textTransform: "none",
              fontWeight: 600,
              py: 1,
              borderRadius: 2,
              background: "linear-gradient(to right, #ef4444, #ec4899)",
              color: "#fff",
              boxShadow: "0 2px 4px rgba(239, 68, 68, 0.3)",
              transition: "all 0.2s ease",
              "&:hover": {
                background: "linear-gradient(to right, #dc2626, #db2777)",
                boxShadow: "0 4px 8px rgba(239, 68, 68, 0.4)",
                transform: "translateY(-1px)",
              },
            }}
          >
            Sign Out
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ProfileCenterPopup;
