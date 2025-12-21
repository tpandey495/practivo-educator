import { Box, Typography } from "@mui/material";
import React from "react";
import { ReportCardData } from "../types";

interface ReportsCardProps {
  item: ReportCardData;
}

const ReportsCard: React.FC<ReportsCardProps> = ({ item }) => {
  return (
    <Box
      sx={{
        p: { xs: "20px", md: "32px" },
        borderRadius: "16px",
        bgcolor: "#fff",
        display: "flex",
        alignItems: "center",
        gap: { xs: "12px", md: "16px" },
        width: "100%",
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #f0f0f0',
        minHeight: { xs: 'auto', md: '120px' }
      }}
    >
      <Box
        sx={{
          height: { xs: "48px", md: "60px" },
          width: { xs: "48px", md: "60px" },
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: item.bgColor,
          flexShrink: 0,
          '& svg': {
            width: { xs: 20, md: 24 },
            height: { xs: 20, md: 24 }
          }
        }}
      >
        {item.icon}
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography
          sx={{
            color: "#000000",
            fontSize: { xs: "20px", md: "24px" },
            fontWeight: "600",
            lineHeight: 1.2
          }}
        >
          {item.value}
        </Typography>
        <Typography sx={{
          color: "#666666",
          fontSize: { xs: "14px", md: "16px" },
          mt: 0.5
        }}>
          {item.label}
        </Typography>
      </Box>
    </Box>
  );
};

export default ReportsCard;


