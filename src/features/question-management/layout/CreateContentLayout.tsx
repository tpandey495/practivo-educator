import { Box, Typography } from "@mui/material";
import React from "react";


interface CreateContentLayoutProps {
  heading: string;
  sidebarContent: React.ReactNode;
  mainContent: React.ReactNode;
}

const CreateContentLayout = ({
  heading,
  sidebarContent,
  mainContent,
}: CreateContentLayoutProps) => {
  return (
    <Box sx={{ display: "flex", gap: "24px", width: "100%" }}>
      {/* Sidebar Panel - Reduced width for better main content space */}
      <Box
        sx={{
          width: "320px",
          minWidth: "320px",
          maxWidth: "320px",
          bgcolor: "#F9FAFA",
          borderRadius: "16px",
          p: "24px",
          boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
        }}
      >
        <Typography
          sx={{
            mb: "24px",
            fontSize: "18px",
            fontWeight: 600,
            py: "16px",
            color: "#101828",
            borderBottom: "1px solid #EAECF0",
          }}
        >
          {heading}
        </Typography>
        {sidebarContent}
      </Box>

      {/* Main Panel - More space for content */}
      <Box sx={{ flex: 1, minWidth: 0 }}>{mainContent}</Box>
    </Box>
  );
};

export default CreateContentLayout;


