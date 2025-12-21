/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import ToolBar, { RightSideTools } from "../../components/toolbar";
import CourseMetaTabs from "./CourseMetaTabs";
import { useNavigate, useParams } from "react-router-dom";
import { useGetChaptersQuery, useGetCourseByIdQuery } from "../../api/courseApi";
import Loader from "@components/ui/Spinner";
import { createContext, useState } from "react";

export const CourseContext = createContext<any>("");

const Index = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const id = Number(courseId);
  const navigate = useNavigate();
  if (!courseId) navigate(-1);

  const { data, isFetching, isError } = useGetChaptersQuery({ page: 1, limit: 10, id });
  const { data: courseData, isFetching: isCourseFetching, isError: isCourseError } = useGetCourseByIdQuery({ id });

  /**SNACKBAR */
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      p: { xs: 2, sm: 3, md: 4 },
      gap: 2
    }}>
      {isCourseFetching ? <Loader /> : isCourseError ? <div>Some error occurred...</div> : courseData?.data && <ToolBar courseName={courseData?.data?.title} >
        <RightSideTools />
      </ToolBar>}

      <Box sx={{
        display: "flex",
        flex: 1,
        height: 'calc(100vh - 120px)',
        backgroundColor: '#f8fafc',
        borderRadius: { xs: 2, md: 3 },
        overflow: 'hidden'
      }}>
        {isFetching ? <Loader /> : isError ? <div>Some error occurred...</div> : <CourseContext.Provider
          value={{
            data: data?.data,
            isLoading: isFetching,
            snackbarOpen, snackbarMessage, snackbarSeverity, handleCloseSnackbar, setSnackbarOpen,
            setSnackbarMessage, setSnackbarSeverity
          }}>
          <CourseMetaTabs />
        </CourseContext.Provider>}
      </Box>
    </Box>
  );
};

const EditCourse = Index;
export default EditCourse;
