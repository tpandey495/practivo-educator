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
} from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import EditIcon from "../../../../assets/icons/EditIcon";
// import ReportIcon from "../../../../assets/icons/ReportIcon";
import ProfileTwoUserIcon from "../../../../assets/icons/ProfileTwoUserIcon";
import AnalyticsIcon from "../../../../assets/icons/AnalyticsIcon";
import SettingsIcon from "../../../../assets/icons/SettingsIcon";
import {
  Lessons,
  Settings,
  Learners,
  CourseDashboard,
} from "../../../index";
// import ToolBar from "../../components/toolbar";
// import MoreButton from "../../../course-settings/components/MoreButton";
// import PublishButton from "../../../course-settings/components/PublishButton";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "../../api/courseApi";
import { useGetChaptersQuery } from "../../../chapter-management/api/chapterApi";
import Loader from "../../../../components/ui/Spinner";

const CourseMetaTabs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab");
  const initialTab = tabFromUrl ? parseInt(tabFromUrl, 10) : 0;
  const [value, setValue] = useState(initialTab);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { courseId } = useParams<{ courseId: string }>();


  // Sync URL with tab state (for browser back/forward navigation)
  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl !== null) {
      const tabIndex = parseInt(tabFromUrl, 10);
      if (!isNaN(tabIndex) && tabIndex >= 0 && tabIndex < 5) {
        setValue((prevValue) => {
          // Only update if different to avoid unnecessary re-renders
          return prevValue !== tabIndex ? tabIndex : prevValue;
        });
      }
    } else {
      // If no tab param, ensure we're on default tab
      setValue((prevValue) => (prevValue !== 0 ? 0 : prevValue));
    }
  }, [searchParams]);

  // Fetch course data
  const {
    data: courseData,
    isLoading: isCourseLoading,
    error: courseError,
  } = useGetCourseByIdQuery(
    {
      id: courseId ? Number(courseId) : 0,
    },
    {
      skip: !courseId || isNaN(Number(courseId)), // Skip the query if courseId is not available
    }
  );

  // Fetch chapters data
  const {
    data: chaptersData,
    isLoading: isChaptersLoading,
    error: chaptersError,
    isSuccess: isChaptersSuccess,
    refetch: refetchChapters,
  } = useGetChaptersQuery(
    {
      id: courseId || "",
      page: 1,
      limit: 100,
    },
    {
      skip: !courseId, // Skip the query if courseId is not available
    }
  );

  // Extract chapters data with fallback
  const extractChaptersData = (data: any) => {
    if (!data) return null;

    // Try different possible data structures
    if (Array.isArray(data)) return data;
    if (data.chapters && Array.isArray(data.chapters)) return data.chapters;
    if (data.data && Array.isArray(data.data)) return data.data;
    if (data.data && data.data.chapters && Array.isArray(data.data.chapters))
      return data.data.chapters;

    return null;
  };

  const extractedChaptersData = extractChaptersData(chaptersData);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    // Update URL to persist tab state
    setSearchParams({ tab: newValue.toString() });
  };

  // Show error if no courseId
  if (!courseId) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography color="error">
          No course ID provided. Please navigate to a valid course.
        </Typography>
      </Box>
    );
  }

  // Validate courseId format
  if (isNaN(Number(courseId))) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography color="error">
          Invalid course ID format. Please navigate to a valid course.
        </Typography>
      </Box>
    );
  }

  // Show loading state while fetching course data
  if (isCourseLoading || isChaptersLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loader />
      </Box>
    );
  }

  // Show error state if course fetch failed
  if (courseError || chaptersError) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography color="error">
          Error loading data: {courseError ? "Course data" : "Chapters data"}.
          Please try again.
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
        <Lessons
          courseData={courseData?.data}
          chaptersData={extractedChaptersData}
          onChapterAdded={() => {
            // Keep user on Lessons tab after adding a lesson
            setValue(1);
            setSearchParams({ tab: "1" });
            // Refetch chapters to show the new lesson
            refetchChapters();
          }}
          onUnitAdded={() => {
            // Refetch chapters to show the new topic
            refetchChapters();
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
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        height: "100%",
        backgroundColor: "#f8fafc",
        borderRadius: { xs: 2, md: 3 },
        overflow: "hidden",
      }}
    >
      <Tabs
        className="course-edit-tabs"
        orientation={isMobile ? "horizontal" : "vertical"}
        variant={isMobile ? "scrollable" : "standard"}
        value={value}
        onChange={handleChange}
        aria-label="Course Meta Tabs"
        scrollButtons={isMobile ? "auto" : false}
        allowScrollButtonsMobile={isMobile}
        sx={{
          width: { xs: "100%", md: 112 },
          backgroundColor: "#fff",
          borderBottom: { xs: "none", md: "none" },
          borderRight: { xs: "none", md: "1px solid #e0e0e0" },
          minHeight: { xs: "auto", md: "100%" },
          // Horizontal tab styling to match CustomTabs
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
        }}
        TabIndicatorProps={{
          style: {
            display: isMobile ? "block" : "none",
            backgroundColor: isMobile ? "#4F39F6" : "transparent",
            height: isMobile ? "2px" : "0px",
          },
        }}
      >
        {tabdata.map((tab, index) => (
          <Tab
            key={index}
            iconPosition={isMobile ? "start" : "top"}
            id={`${isMobile ? "horizontal" : "vertical"}-tab-${index}`}
            aria-controls={`${isMobile ? "horizontal" : "vertical"
              }-tabpanel-${index}`}
            icon={
              <Box
                display="flex"
                flexDirection={{ xs: "row", md: "column" }}
                alignItems="center"
                gap={{ xs: 1, md: 0 }}
                sx={{
                  background: isMobile ? "transparent" : (value === index ? "#FBF8FF" : "#fff"),
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    "& svg": {
                      width: { xs: 20, md: 24 },
                      height: { xs: 20, md: 24 },
                    },
                  }}
                >
                  {tab.icon}
                </Box>
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "12px" },
                    fontWeight: isMobile ? (value === index ? 600 : 600) : 500,
                    mt: { xs: 0, md: "6px" },
                    color: isMobile ? (value === index ? "#000000" : "#9499A1") : "#000000",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {tab.title}
                </Typography>
              </Box>
            }
            sx={{
              minHeight: { xs: "60px", md: "90px" },
              minWidth: { xs: "auto", md: 112 },
              maxWidth: { xs: "none", md: 112 },
              borderLeft: {
                xs: "none",
                md:
                  value === index
                    ? "4px solid #4F39F6"
                    : "4px solid transparent",
              },
              borderBottom: {
                xs:
                  value === index
                    ? "2px solid #4F39F6"
                    : "2px solid transparent",
                md: "none",
              },
              justifyContent: "center",
              textTransform: "none",
              // Horizontal tab styling to match CustomTabs
              ...(isMobile && {
                fontWeight: 600,
                color: value === index ? "#000000" : "#9499A1",
                background: "transparent",
                px: 2,
                py: 1,
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }),
              // Vertical tab styling (desktop)
              ...(!isMobile && {
                background: value === index ? "#FBF8FF" : "#fff",
                px: 0,
                py: 0,
                "&:hover": {
                  backgroundColor: value === index ? "#FBF8FF" : "#f5f5f5",
                },
              }),
            }}
          />
        ))}
      </Tabs>

      {/* Tab panels */}
      <Box
        sx={{
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
        }}
      >
        {tabdata.map((tab, index) => (
          <TabPanel key={index} value={value} index={index} isMobile={isMobile}>
            {tab.content}
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
};

export default CourseMetaTabs;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  isMobile?: boolean;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, isMobile, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${isMobile ? "horizontal" : "vertical"}-tabpanel-${index}`}
      aria-labelledby={`${isMobile ? "horizontal" : "vertical"}-tab-${index}`}
      {...other}
      style={{
        width: "100%",
        height: "100%",
        display: value === index ? "flex" : "none",
        flexDirection: "column",
      }}
    >
      {value === index && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            overflow: "auto",
            p: { xs: 3, sm: 4, md: 4 },
            flex: 1,
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}
