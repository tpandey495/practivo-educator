import EditCourse from "../features/course/pages/course-management";
import { CourseQuestionEdit } from "../features";
import type { Route } from "../types/routes";
import LocalLibraryIcon from "../assets/icons/LocalLibraryIcon";
import AutoStoriesIcon from "../assets/icons/AutoStoriesIcon";
import Courses from "../features/course/pages/Courses";
import PrivateRoute from "../layouts/PrivateRoute";



export const adminRoutes: Route[] = [
  {
    label: "My Courses",
    path: "/courses",
    icon: <LocalLibraryIcon />,
    children: [
      {
        path: "",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <Courses />
          </PrivateRoute>
        ),
      },
      {
        path: "edit/:courseId",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <EditCourse />
          </PrivateRoute>
        ),
      },

      {
        path: "edit/questions",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <CourseQuestionEdit />
          </PrivateRoute>
        ),
      },
    ],
  },
];
