import { Box } from "@mui/material";
import React from "react";
import { reportsData } from "../utils/mockData";
import ReportsCard from "./ReportsCard";

const OverviewSection = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(auto-fit, minmax(250px, 1fr))'
        },
        gap: { xs: "16px", md: "24px" },
        alignItems: "stretch"
      }}
    >
      {reportsData.map((item) => (
        <ReportsCard key={item.id} item={item} />
      ))}
    </Box>
  );
};

export default OverviewSection;


