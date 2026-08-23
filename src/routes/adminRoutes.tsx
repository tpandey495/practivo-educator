import { QuestionBankComponent } from "../features";
import EditCourse from "../features/course/pages/course-management";
import { QuestionBankEdit } from "../features";
import { CourseContentEdit } from "../features";
import type { Route } from "../types/routes";
import TickInSquareIcon from "../assets/icons/TickInSquareIcon";
import DollerIcon from "../assets/icons/DollerIcon";
import BookIcon from "../assets/icons/BookIcon";
import LocalLibraryIcon from "../assets/icons/LocalLibraryIcon";
import AutoStoriesIcon from "../assets/icons/AutoStoriesIcon";
import Courses from "../features/course/pages/Courses";
import NotificationsIcon from "../assets/icons/NotificationsIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PrivateRoute from "../layouts/PrivateRoute";
// import ViewProfile from "../features/user/pages/ViewProfile";
import DashboardTabs from "../features/dashboard/pages/DashboardTabs";


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
        path: "edit/:courseId/:lessonId/questions",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <CourseContentEdit />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    label: "Question Bank",
    path: "/question-bank",
    icon: <AutoStoriesIcon />,
    children: [
      {
        path: "",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <QuestionBankComponent />
          </PrivateRoute>
        ),
      },
      {
        path: "create",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <QuestionBankEdit />
          </PrivateRoute>
        ),
      },
      {
        path: ":questionBankId/questions",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <QuestionBankEdit />
          </PrivateRoute>
        ),
      },
    ],
  },
  // {
  //   label: "Learning",
  //   icon: <BookIcon />,
  //   children: [
  //     {
  //       label: "My Courses",
  //       path: "/courses",
  //       icon: <LocalLibraryIcon />,
  //       children: [
  //         {
  //           path: "",
  //           element: (
  //             <PrivateRoute allowedRoles={["admin"]}>
  //               <Courses />
  //             </PrivateRoute>
  //           ),
  //         },
  //         {
  //           path: "edit/:courseId",
  //           element: (
  //             <PrivateRoute allowedRoles={["admin"]}>
  //               <EditCourse />
  //             </PrivateRoute>
  //           ),
  //         },
  //         {
  //           path: "edit/:courseId/:lessonId/questions",
  //           element: (
  //             <PrivateRoute allowedRoles={["admin"]}>
  //               <CourseContentEdit />
  //             </PrivateRoute>
  //           ),
  //         },
  //       ],
  //     },
  //     {
  //       label: "Question Bank",
  //       path: "/question-bank",
  //       icon: <AutoStoriesIcon />,
  //       children: [
  //         {
  //           path: "",
  //           element: (
  //             <PrivateRoute allowedRoles={["admin"]}>
  //               <QuestionBankComponent />
  //             </PrivateRoute>
  //           ),
  //         },
  //         {
  //           path: "create",
  //           element: (
  //             <PrivateRoute allowedRoles={["admin"]}>
  //               <QuestionBankEdit />
  //             </PrivateRoute>
  //           ),
  //         },
  //         {
  //           path: ":questionBankId/questions",
  //           element: (
  //             <PrivateRoute allowedRoles={["admin"]}>
  //               <QuestionBankEdit />
  //             </PrivateRoute>
  //           ),
  //         },
  //       ],
  //     },
  //   ],
  // },

  // {
  //   label: "Notification",
  //   icon: <NotificationsIcon />,
  // },
  // {
  //   label: "Profile",
  //   path: "/profile",
  //   element: (
  //     <PrivateRoute>
  //       <ViewProfile />
  //     </PrivateRoute>
  //   ),
  // },
];
