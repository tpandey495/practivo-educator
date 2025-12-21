import { CustomTabs } from "@components/ui/CustomTabPanel";
import { Box } from "@mui/material";
import React from "react";
import OverviewSection from "../components/OverviewSection.tsx";
import AverageSection from "../components/AverageSection.tsx";
import LessonSection from "../components/LessonSection.tsx";

const ReportsPage = () => {
  return (
    <Box sx={{
      p: { xs: 1, sm: 2, md: 0 },
      '& > *': {
        width: '100%'
      }
    }}>
      <CustomTabs
        tabs={["Overview", "Funnel"]}
        panels={[<OverviewSection />, <OverviewSection />]}
      />
      <Box sx={{ mt: { xs: "24px", md: "40px" } }}>
        <CustomTabs tabs={["Average"]} panels={[<AverageSection />]} />
      </Box>
      <Box sx={{ mt: { xs: "24px", md: "40px" } }}>
        <CustomTabs
          tabs={["Lesson", "Users", "Spaces"]}
          panels={[<LessonSection />]}
        />
      </Box>
    </Box>
  );
};

export default ReportsPage;


