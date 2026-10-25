import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import { adminRoutes } from "./routes/adminRoutes";
import { authRoutes } from "./routes/authRoutes";
import MainLayout from "./layouts/MainLayout";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AppThemeProvider } from "./theme/theme";
import NotFound from "./pages/NotFound";
import AdminGuard from "./layouts/AdminGuard";

import LandingPage from "./pages/LandingPage";

const allRoutes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/dashboard",
    element: <Navigate to="/courses" replace />,
  },
  {
    element: <AdminGuard />, // 🔐 guard
    children: [
      {
        element: <MainLayout />,
        children: adminRoutes,   
      },
    ],
  },
  ...authRoutes,
  {
    path: "*",
    element: <NotFound />,
  },
];

function App() {
  const routes = useRoutes(allRoutes);
  return routes;
}

function AppWrapper() {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppThemeProvider>
    </Provider>
  );
}

export default AppWrapper;
