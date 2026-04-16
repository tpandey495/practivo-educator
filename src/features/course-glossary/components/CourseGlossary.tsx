import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  useGetChaptersQuery,
  useGetCourseByIdQuery,
  useGetCourseRatingQuery
} from "../api/courseApi";
import Loader from "@components/ui/Spinner";
import Navbar from "../../../components/ui/Navbar";
import { useState } from "react";
import CourseGlossaryHeader from "./CourseGlossaryHeader";
import ProductCard from "./ProductCard";
import CourseGlossaryTabs from "./CourseGlossaryTabs";
import CourseOverview from "./CourseOverview";
import CourseLessons from "./CourseLessons";
import CourseReviews from "./CourseReviews";

export default function CourseGlossary() {

  const { courseId } = useParams<{ courseId: string }>();
  const [activeTab, setActiveTab] = useState(0);

  if (!courseId || courseId === "undefined") {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          No Course Found or Invalid Course Id
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          The URL you're trying to access doesn't have a valid course ID.
        </Typography>
      </Box>
    );
  }

  const numericCourseId = Number(courseId);

  if (isNaN(numericCourseId) || numericCourseId <= 0) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Invalid Course ID
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          The course ID must be a valid positive number.
        </Typography>
      </Box>
    );
  }

  // Course API
  const {
    data: courseData,
    isLoading: courseLoading,
    isError: courseError,
    error: courseApiError,
  } = useGetCourseByIdQuery(
    { id: numericCourseId },
    { skip: !courseId || isNaN(numericCourseId) }
  );

  // Chapters API
  const {
    data: chaptersData,
    isLoading: chaptersLoading,
    isError: chaptersError,
    error: chaptersApiError,
  } = useGetChaptersQuery(
    {
      id: numericCourseId,
      page: 1,
      limit: 100,
    },
    { skip: !courseId || isNaN(numericCourseId) }
  );

  // ⭐ Rating API
  const { data: ratingData } = useGetCourseRatingQuery(
    { courseId: numericCourseId },
    { skip: !courseId || isNaN(numericCourseId) }
  );

  const course = courseData?.data;
  const chapters = chaptersData?.data?.chapters;

  // ⭐ Correct rating values
  const averageRating = ratingData?.data?.averageRating;
  const totalRatings = ratingData?.data?.totalRatings;

  const isLoading = courseLoading || chaptersLoading;
  const isError = courseError || chaptersError;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F7F7F7", pt: "1px" }}>
      <Navbar />

      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: "transparent",
          minHeight: "calc(100vh - 72px)",
          px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 },
          py: 0,
          pb: { xs: 3, md: 4, lg: 5 },
          boxSizing: "border-box",
        }}
      >

        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "60vh",
            }}
          >
            <Loader />
          </Box>

        ) : isError ? (
          <Box
            sx={{
              p: 4,
              textAlign: "center",
              bgcolor: "white",
              borderRadius: 3,
              border: "1px solid #E2E8F0",
            }}
          >
            <Typography variant="h6" color="error" sx={{ mb: 2 }}>
              Error Loading Course
            </Typography>

            <Typography variant="body2" color="text.secondary">

              {courseError && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Course API Error:
                  </Typography>

                  <Typography
                    variant="body2"
                    component="pre"
                    sx={{
                      fontSize: "12px",
                      overflow: "auto",
                      textAlign: "left",
                      bgcolor: "#F8FAFC",
                      p: 2,
                      borderRadius: 2,
                    }}
                  >
                    {JSON.stringify(courseApiError, null, 2)}
                  </Typography>
                </Box>
              )}

              {chaptersError && (
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Chapters API Error:
                  </Typography>

                  <Typography
                    variant="body2"
                    component="pre"
                    sx={{
                      fontSize: "12px",
                      overflow: "auto",
                      textAlign: "left",
                      bgcolor: "#F8FAFC",
                      p: 2,
                      borderRadius: 2,
                    }}
                  >
                    {JSON.stringify(chaptersApiError, null, 2)}
                  </Typography>
                </Box>
              )}

            </Typography>
          </Box>

        ) : (

          <>
            {/* Header Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                gap: { xs: 3, md: 5 },
                mb: { xs: 4, md: 7 },
                alignItems: { xs: "center", lg: "flex-start" },
              }}
            >

              <Box sx={{ flex: 1, width: "100%", minWidth: 0 }}>
                <CourseGlossaryHeader
                  course={course}
                  chapters={chapters}
                  averageRating={averageRating}
                  totalRatings={totalRatings}
                />
              </Box>

              <Box
                sx={{
                  width: { xs: "100%", lg: "400px" },
                  flexShrink: 0,
                }}
              >
                <ProductCard
                  course={course}
                  averageRating={averageRating}
                  totalRatings={totalRatings}
                />
              </Box>

            </Box>

            {/* Main Content */}
            <Box
              sx={{
                width: "100%",
                bgcolor: "white",
                borderRadius: 3,
                border: "1px solid #E2E8F0",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >

              <Box sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                <CourseGlossaryTabs
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
              </Box>

              <Box
                sx={{
                  px: { xs: 3, sm: 4, md: 5, lg: 6 },
                  pb: { xs: 4, md: 5 },
                }}
              >

                {activeTab === 0 && <CourseOverview course={course} />}

                {activeTab === 1 && (
                  <CourseLessons chapters={chapters} />
                )}

                {activeTab === 2 && (
                  <CourseReviews courseId={numericCourseId} />
                )}

              </Box>

            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}