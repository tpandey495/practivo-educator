import { BrowserRouter, useRoutes } from "react-router-dom";
import { websiteRoutes } from "./routes/websiteRoutes";

function App() {
  const routes = useRoutes(websiteRoutes);
  return routes;
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
