import React, { useState } from "react";
import { Tabs, Tab, Box, Typography, Paper } from "@mui/material";
import {
  GridView as OverviewIcon,
  School as CoursesIcon,
  People as StudentsIcon,
  BarChart as AnalyticsIcon,
  Campaign as MarketingIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import Dashboard from "./Dashboard";
import CourseDashboard from "./CourseDashboard";
import StudentInsights from "./StudentInsights";
import FDashboard from "./FDashboard";
import MarketingDashboard from "./MarketingDashboard";
import ViewProfile from "../../user/pages/ViewProfile";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Helper component for content display
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default function DashboardTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", p: 4 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 3, color: "#333" }}
      >
        Dashboard
      </Typography>

      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          "& .MuiTabs-indicator": { display: "none" }, // Hide default underline
          "& .MuiTabs-flexContainer": { gap: "12px" }, // Space between tabs
        }}
      >
        {[
          { label: "Overview", icon: <OverviewIcon /> },
          { label: "Courses", icon: <CoursesIcon /> },
          { label: "Students", icon: <StudentsIcon /> },
          { label: "Analytics", icon: <AnalyticsIcon /> },
          { label: "Marketing", icon: <MarketingIcon /> },
          { label: "Settings", icon: <SettingsIcon /> },
        ].map((item, index) => (
          <Tab
            key={index}
            icon={item.icon}
            iconPosition="start"
            label={item.label}
            sx={{
              textTransform: "none",
              minHeight: "48px",
              padding: "10px 20px",
              borderRadius: "8px",
              bgcolor: value === index ? "#e3f2fd" : "#fff", // Light blue background when active
              color: value === index ? "#1976d2" : "#666",
              border: value === index ? "1px solid #1976d2" : "1px solid #ddd",
              boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
              fontWeight: value === index ? "bold" : "medium",
              "&:hover": { bgcolor: "#f0f0f0" },
              transition: "all 0.2s ease",
            }}
          />
        ))}
      </Tabs>

      <Paper
        elevation={0}
        sx={{
          mt: 3,
          bgcolor: "transparent",
        }}
      >
        <CustomTabPanel value={value} index={0}>
          <Dashboard />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <CourseDashboard/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <StudentInsights/> 
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <FDashboard/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <MarketingDashboard/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <ViewProfile/> 
        </CustomTabPanel>
      </Paper>
    </Box>
  );
}
