import { Tabs, Tab } from "@mui/material";

interface CourseGlossaryTabsProps {
  activeTab: number;
  onTabChange: (tab: number) => void;
}

export default function CourseGlossaryTabs({ activeTab, onTabChange }: CourseGlossaryTabsProps) {
  return (
    <Tabs
      value={activeTab}
      onChange={(_, newValue) => onTabChange(newValue)}
      sx={{
        width: "100%",
        "& .MuiTab-root": {
          textTransform: "none",
          fontWeight: 500,
          minHeight: 60,
          padding: { xs: "12px 16px", sm: "12px 24px" },
          color: "#64748B",
          fontSize: { xs: "14px", sm: "15px", md: "16px" },
        },
        "& .MuiTab-root.Mui-selected": {
          color: "#4F39F6",
          fontWeight: 600,
        },
        "& .MuiTabs-indicator": {
          backgroundColor: "#4F39F6",
          height: 3,
        },
      }}
    >
      <Tab label="Overview" />
      <Tab label="Lessons" />
      <Tab label="Reviews" />
    </Tabs>
  );
}

