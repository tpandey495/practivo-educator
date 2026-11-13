import { Box, Fab, Typography } from "@mui/material";
import AddNewCourseCard from "../../course-settings/components/AddNewCourseCard";
import CourseCardWrapper from "@components/ui/card/CourseCardWrapper";
import { DeleteModal } from "../components/DeleteCourseModal";
import { EditModal } from "../components/EditCourseModal";
import PageToolbarLayout from "@components/ui/PageToolbarLayout";
import { useGetCoursesQuery } from "../api/courseApi";
import { ICourse } from "types/course.types";
import Loader from "@components/ui/Spinner";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Chat } from "@mui/icons-material";
import { useState } from "react";

export default function Courses() {
  const queryArgs = { limit: 10, page: 1 };
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  //  NEW STATE (modal control)
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const {
    data: myCoursesData,
    isFetching: fetchingMyCourses,
    isError: errorMyCourses,
  } = useGetCoursesQuery(queryArgs, { skip: !isAdmin });

  const typedMyCoursesData = myCoursesData as {
    data: {
      courses: ICourse[];
      total?: number;
      totalCount?: number;
      pagination?: { total?: number };
    };
  };

  const courses: ICourse[] = typedMyCoursesData?.data?.courses || [];
  const totalCourses =
    typedMyCoursesData?.data?.total ??
    typedMyCoursesData?.data?.totalCount ??
    typedMyCoursesData?.data?.pagination?.total ??
    courses.length;

  // navigation
  const handleCourseClick = (courseId: number) => {
    navigate(`/courses/${courseId}`);
  };

  //  EDIT OPEN HANDLER
  const handleEditOpen = (course: ICourse) => {
    setSelectedCourse(course);
    setIsEditOpen(true);
  };


  return (
    <Box sx={{ padding: "24px" }}>
      <PageToolbarLayout
        title="My Courses"
        showActions={false}
        rightContent={
          !fetchingMyCourses && !errorMyCourses && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 0.75,
                borderRadius: "12px",
                border: "1px solid rgba(148, 163, 184, 0.4)",
                backgroundColor: "rgba(79, 57, 246, 0.04)",
              }}
            >
              <Typography
                component="span"
                sx={{ fontWeight: 700, fontSize: "1.1rem", color: "#4F39F6" }}
              >
                {totalCourses}
              </Typography>
              <Typography
                component="span"
                sx={{ color: "#667085", fontSize: "0.95rem", fontWeight: 500 }}
              >
                {totalCourses === 1 ? "Course" : "Courses"}
              </Typography>
            </Box>
          )
        }
      >
        <Box
          sx={{
            display: "grid",
            gap: { xs: 3, md: 4 },
            width: "100%",
            maxWidth: "1440px",
            mx: "auto",
            gridTemplateColumns: {
              xs: "repeat(auto-fill, minmax(260px, 1fr))",
              sm: "repeat(2, minmax(260px, 1fr))",
              md: "repeat(3, minmax(260px, 1fr))",
              lg: "repeat(4, minmax(260px, 1fr))",
            },
            justifyItems: "center",
            alignItems: "stretch",
            py: { xs: 1, md: 2 },
          }}
        >
          <AddNewCourseCard />

          {fetchingMyCourses ? (
            <Loader />
          ) : errorMyCourses ? (
            <div>Some error occurred...</div>
          ) : courses.length === 0 ? (
            <Typography sx={{ width: "100%", textAlign: "center", mt: 4 }}>
              No Course Found
            </Typography>
          ) : (
            courses.map((course) => (
              <CourseCardWrapper
                key={course.id}
                id={Number(course.id)}
                thumbnailSrc={course.image}
                tags={course.tags}
                title={course.title}
                chapters={course.totalChapters}
                rating={0}
                price={course.price}
                onCardClick={handleCourseClick}

                
                EditModalComponent={() => (
                  <EditModal
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    courseData={selectedCourse || undefined}
                  />
                )}
                onEditClick={() => handleEditOpen(course)}

                DeleteModalComponent={DeleteModal}
              />
            ))
          )}
        </Box>
      </PageToolbarLayout>

      {/* Floating Button */}
      {/* <Box
        sx={{
          position: "fixed",
          bottom: { xs: 16, md: 24 },
          right: { xs: 16, md: 24 },
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          zIndex: 1000,
        }}
      >
        <Fab
          size="medium"
          sx={{
            backgroundColor: "#22c55e",
            color: "white",
            width: { xs: 48, md: 56 },
            height: { xs: 48, md: 56 },
            "&:hover": {
              backgroundColor: "#16a34a",
              transform: "scale(1.1)",
            },
            boxShadow: "0 4px 12px rgba(34, 197, 94, 0.4)",
            transition: "all 0.2s",
          }}
        >
          <Chat sx={{ fontSize: { xs: 20, md: 24 } }} />
        </Fab>
      </Box> */}
    </Box>
  );
}