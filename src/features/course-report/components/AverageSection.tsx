import { Box } from "@mui/material";
import React from "react";
import { reportsAverageData } from "../utils/mockData";
import ReportsCard from "./ReportsCard";

const AverageSection = () => {
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
      {reportsAverageData.map((item) => (
        <ReportsCard key={item.id} item={item} />
      ))}
    </Box>
  );
};

export default AverageSection;


