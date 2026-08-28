import {
  Box,
  Tab,
  Tabs,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
  Divider,
  Rating,
  SxProps,
  Theme
} from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import EditIcon from "../../../../assets/icons/EditIcon";
// import ReportIcon from "../../../../assets/icons/ReportIcon";
import ProfileTwoUserIcon from "../../../../assets/icons/ProfileTwoUserIcon";
import AnalyticsIcon from "../../../../assets/icons/AnalyticsIcon";
import SettingsIcon from "../../../../assets/icons/SettingsIcon";
import {
  Chapters,
  Settings,
  Learners,
  CourseDashboard,
} from "../../../index";
// import ToolBar from "../../components/toolbar";
// import MoreButton from "../../../course-settings/components/MoreButton";
// import PublishButton from "../../../course-settings/components/PublishButton";
import { useParams, useSearchParams } from "react-router-dom";
import Loader from "../../../../components/ui/Spinner";
import CustomTabPanel from "../../../../components/ui/CustomTabPanel";

const getStyles = (isMobile: boolean, currentTab: number): Record<string, any> => ({
  errorContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  mainContainer: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    width: "100%",
    height: "100%",
    backgroundColor: "#f8fafc",
    borderRadius: { xs: 2, md: 3 },
    overflow: "hidden",
  },
  tabs: {
    width: { xs: "100%", md: 112 },
    backgroundColor: "#fff",
    borderBottom: { xs: "none", md: "none" },
    borderRight: { xs: "none", md: "1px solid #e0e0e0" },
    minHeight: { xs: "auto", md: "100%" },
    ...(isMobile && {
      background: "#fff",
      borderRadius: "16px",
      width: "fit-content",
      p: "0px 20px",
      "& .MuiTabs-indicator": {
        height: "3px",
        borderRadius: "24px",
        backgroundColor: "#6A42AB",
      },
    }),
    "& .MuiTabs-flexContainer": {
      flexDirection: { xs: "row", md: "column" },
      gap: { xs: 0, md: 0 },
    },
    "& .MuiTabs-scrollButtons": {
      display: { xs: "flex", md: "none" },
    },
  },
  tab: (index: number) => ({
    minHeight: { xs: "60px", md: "90px" },
    minWidth: { xs: "auto", md: 112 },
    maxWidth: { xs: "none", md: 112 },
    borderLeft: {
      xs: "none",
      md: currentTab === index ? "4px solid #4F39F6" : "4px solid transparent",
    },
    borderBottom: {
      xs: currentTab === index ? "2px solid #4F39F6" : "2px solid transparent",
      md: "none",
    },
    justifyContent: "center",
    textTransform: "none",
    ...(isMobile && {
      fontWeight: 600,
      color: currentTab === index ? "#000000" : "#9499A1",
      background: "transparent",
      px: 2,
      py: 1,
      "&:hover": {
        backgroundColor: "transparent",
      },
    }),
    ...(!isMobile && {
      background: currentTab === index ? "#FBF8FF" : "#fff",
      px: 0,
      py: 0,
      "&:hover": {
        backgroundColor: currentTab === index ? "#FBF8FF" : "#f5f5f5",
      },
    }),
  }),
  tabIconContainer: (index: number) => ({
    background: isMobile ? "transparent" : (currentTab === index ? "#FBF8FF" : "#fff"),
    width: "100%",
  }),
  tabIcon: {
    display: "flex",
    alignItems: "center",
    "& svg": {
      width: { xs: 20, md: 24 },
      height: { xs: 20, md: 24 },
    },
  },
  tabLabel: (index: number) => ({
    fontSize: { xs: "14px", md: "12px" },
    fontWeight: 600, // Kept simplified from ternary matching 600/500 depending on requirements
    mt: { xs: 0, md: "6px" },
    color: isMobile ? (currentTab === index ? "#000000" : "#9499A1") : "#000000",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
  tabPanelsWrapper: {
    flexGrow: 1,
    mx: { xs: 0, md: 3 },
    mt: { xs: 2, md: 0 },
    width: { xs: "100%", md: "calc(100% - 160px)" },
    maxWidth: { xs: "100%", md: "none" },
    overflow: "hidden",
    backgroundColor: "#fff",
    borderRadius: { xs: 2, md: 3 },
    boxShadow: {
      xs: "0 2px 4px rgba(0,0,0,0.1)",
      md: "0 4px 12px rgba(0,0,0,0.15)",
    },
    border: { xs: "1px solid #e0e0e0", md: "1px solid #f0f0f0" },
    display: "flex",
    flexDirection: "column",
  },
  tabPanelBox: {
    width: "100%",
    height: "100%",
    overflow: "auto",
    p: { xs: 3, sm: 4, md: 4 },
    flex: 1,
  }
});


const CourseMetaTabs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab");
  const initialTab = tabFromUrl ? parseInt(tabFromUrl, 10) : 0;
  const [tab, setTab] = useState(initialTab);

  const { courseId } = useParams<{ courseId: string }>();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));



  // Sync URL with tab state (for browser back/forward navigation)
  useEffect(() => {
    if (tabFromUrl !== null) {
      const tabIndex = parseInt(tabFromUrl, 10);
      if (!isNaN(tabIndex) && tabIndex >= 0 && tabIndex < 5) {
        setTab((prevTab) => {
          // Only update if different to avoid unnecessary re-renders
          return prevTab !== tabIndex ? tabIndex : prevTab;
        });
      }
    } else {
      // If no tab param, ensure we're on default tab
      setTab((prevTab) => (prevTab !== 0 ? 0 : prevTab));
    }
  }, [tabFromUrl]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
    // Update URL to persist tab state
    setSearchParams({ tab: newValue.toString() });
  };

  const styles = getStyles(isMobile, tab);

  // Show error if no courseId
  if (!courseId) {
    return (
      <Box sx={styles.errorContainer}>
        <Typography color="error">
          No course ID provided. Please navigate to a valid course.
        </Typography>
      </Box>
    );
  }

  // Validate courseId format
  if (isNaN(Number(courseId))) {
    return (
      <Box sx={styles.errorContainer}>
        <Typography color="error">
          Invalid course ID format. Please navigate to a valid course.
        </Typography>
      </Box>
    );
  }

  const tabdata = [
    {
      title: "Analytics",
      icon: <AnalyticsIcon />,
      content: <CourseDashboard />,
    },
    {
      title: "Chapters",
      icon: <EditIcon />,
      content: (
        <Chapters
          onChapterAdded={() => {
            // Keep user on Lessons tab after adding a lesson
            setTab(1);
            setSearchParams({ tab: "1" });
          }}
        />
      ),
    },
    // {
    //   title: "Report",
    //   icon: <ReportIcon />,
    //   content: <Reports />,
    // },
    {
      title: "Learners",
      icon: <ProfileTwoUserIcon />,
      content: <Learners />,
    },
    {
      title: "Settings",
      icon: <SettingsIcon />,
      content: <Settings />,
    },
  ];

  return (
    <Box sx={styles.mainContainer}>
      <Tabs
        className="course-edit-tabs"
        orientation={isMobile ? "horizontal" : "vertical"}
        variant={isMobile ? "scrollable" : "standard"}
        value={tab}
        onChange={handleChange}
        aria-label="Course Meta Tabs"
        scrollButtons={isMobile ? "auto" : false}
        allowScrollButtonsMobile={isMobile}
        sx={styles.tabs}
        TabIndicatorProps={{
          style: {
            display: isMobile ? "block" : "none",
            backgroundColor: isMobile ? "#4F39F6" : "transparent",
            height: isMobile ? "2px" : "0px",
          },
        }}
      >
        {tabdata.map((tabItem, index) => (
          <Tab
            key={index}
            iconPosition={isMobile ? "start" : "top"}
            id={`${isMobile ? "horizontal" : "vertical"}-tab-${index}`}
            aria-controls={`${isMobile ? "horizontal" : "vertical"}-tabpanel-${index}`}
            sx={styles.tab(index)}
            icon={
              <Box
                display="flex"
                flexDirection={{ xs: "row", md: "column" }}
                alignItems="center"
                gap={{ xs: 1, md: 0 }}
                sx={styles.tabIconContainer(index)}
              >
                <Box sx={styles.tabIcon}>
                  {tabItem.icon}
                </Box>
                <Typography sx={styles.tabLabel(index)}>
                  {tabItem.title}
                </Typography>
              </Box>
            }
          />
        ))}
      </Tabs>

      {/* Tab panels */}
      <Box sx={styles.tabPanelsWrapper}>
        {tabdata.map((tabItem, index) => (
          <CustomTabPanel 
            key={index} 
            value={tab} 
            index={index}
            idPrefix={isMobile ? "horizontal" : "vertical"}
            divStyle={{
              width: "100%",
              height: "100%",
              display: tab === index ? "flex" : "none",
              flexDirection: "column",
            }}
            boxSx={styles.tabPanelBox}
          >
            {tabItem.content}
          </CustomTabPanel>
        ))}
      </Box>
    </Box>
  );
};

export default CourseMetaTabs;
