import EditCourse from "../features/course/pages/course-management";
import { CourseQuestionEdit } from "../features";
import type { Route } from "../types/routes";
import LocalLibraryIcon from "../assets/icons/LocalLibraryIcon";
import AutoStoriesIcon from "../assets/icons/AutoStoriesIcon";
import Courses from "../features/course/pages/Courses";
import PrivateRoute from "../layouts/PrivateRoute";
import ComingSoon from "../components/common/ComingSoon";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";



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
        path: ":courseId",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <EditCourse />
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
  {
    label: "My Bank",
    path: "/my-bank",
    icon: <Inventory2Icon fontSize="small" />,
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <ComingSoon
          title="My Bank"
          description="Your personal bank of questions and content will live here."
        />
      </PrivateRoute>
    ),
  },
  {
    label: "Public Bank",
    path: "/public-bank",
    icon: <TravelExploreIcon fontSize="small" />,
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <ComingSoon
          title="Public Bank"
          description="Browse and reuse questions and content shared by the community."
        />
      </PrivateRoute>
    ),
  },
];
