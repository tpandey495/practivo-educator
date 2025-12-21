import {
  Box,
  Divider,
  IconButton,
  Typography,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import SortRoundedIcon from "@mui/icons-material/SortRounded";

interface PageToolbarLayoutProps {
  title: string;
  children: React.ReactNode;
}

const PageToolbarLayout: React.FC<PageToolbarLayoutProps> = ({
  title,
  children,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const iconButtonSx = {
    width: 40,
    height: 40,
    borderRadius: "12px",
    border: "1px solid rgba(148, 163, 184, 0.4)",
    color: "#475467",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: "#4F39F6",
      color: "#4F39F6",
      boxShadow: "0 6px 16px rgba(79, 57, 246, 0.18)",
      backgroundColor: "rgba(79, 57, 246, 0.04)",
    },
    "& svg": {
      fontSize: "1.15rem",
    },
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* ================= Toolbar Header ================= */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          flexWrap: "wrap",
          rowGap: 2,
          columnGap: 3,
          borderBottom: "1px solid rgba(148, 163, 184, 0.35)",
          paddingBottom: { xs: 2, md: 1.5 },
          marginBottom: { xs: 3, md: 4 },
        }}
      >
        {/* Title */}
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
            fontWeight: 700,
            color: theme.palette.text.primary,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          {title}
        </Typography>

        {/* Toolbar Actions */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "flex-start", md: "flex-end" },
            gap: 1.5,
            flexWrap: "wrap",
          }}
        >
          <Tooltip title="Grid View">
            <IconButton
              aria-label="grid view"
              sx={iconButtonSx}
            >
              <GridViewRoundedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="List View">
            <IconButton
              aria-label="list view"
              sx={iconButtonSx}
            >
              <ViewListRoundedIcon />
            </IconButton>
          </Tooltip>

          <Divider
            orientation="vertical"
            flexItem
            sx={{
              borderColor: "rgba(148, 163, 184, 0.5)",
              mx: 1,
              display: { xs: "none", sm: "block" },
            }}
          />

          <Tooltip title="Filter">
            <IconButton
              aria-label="open filters"
              sx={iconButtonSx}
            >
              <FilterListRoundedIcon />
            </IconButton>
          </Tooltip>

          <Divider
            orientation="vertical"
            flexItem
            sx={{
              borderColor: "rgba(148, 163, 184, 0.5)",
              mx: 1,
              display: { xs: "none", sm: "block" },
            }}
          />

          <Tooltip title="Sort">
            <IconButton
              aria-label="sort results"
              sx={iconButtonSx}
            >
              <SortRoundedIcon />
            </IconButton>
          </Tooltip>

          {!isMobile && (
            <Typography
              component="span"
              sx={{
                color: "#667085",
                fontSize: "0.95rem",
                userSelect: "none",
                fontWeight: 500,
                letterSpacing: "0.01em",
              }}
            >
              Recent
            </Typography>
          )}
        </Box>
      </Box>

      {/* ================= Content Area ================= */}
      <Box sx={{ minHeight: "60vh", width: "100%" }}>{children}</Box>
    </Box>
  );
};

export default PageToolbarLayout;
