import { BrowserRouter, useRoutes } from "react-router-dom";
import { websiteRoutes } from "./routes/websiteRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { authRoutes } from "./routes/authRoutes";
import MainLayout from "./layouts/MainLayout";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AppThemeProvider } from "./theme/theme";
import NotFound from "./pages/NotFound";

const allRoutes = [
  {
    element: <MainLayout />,
    children: adminRoutes,
  },
  ...authRoutes,
  ...websiteRoutes,
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
