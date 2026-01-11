import type { Route } from "../types/routes";
import Layout from "../layouts/Layout";
import {
  Home,
  Features,
  About,
  Product,
  Pricing,
  Contact,
  NotFound,
  LoginSignup,
} from "../pages";
import {
  WhyTiiron,
  OurPlatform,
  WhomFor
} from "../components";
import PublicRoute from "../layouts/PublicRoute";

export const websiteRoutes: Route[] = [
  {
    element: <Layout />,
    children: [
      { 
        path: "/", 
        element: (
          <PublicRoute>
            <Home />
          </PublicRoute>
        ) 
      },
      { path: "/features", element: <Features /> },
      { path: "/product", element: <Product /> },
      { path: "/pricing", element: <Pricing /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { 
        path: "/loginsignup", 
        element: (
          <PublicRoute>
            <LoginSignup />
          </PublicRoute>
        ) 
      },

      // Explore Dropdown routes
      { path: "/whytiiron", element: <WhyTiiron /> },
      { path: "/whomfor", element: <WhomFor /> },
      { path: "/ourplatform", element: <OurPlatform /> },
    ],
  },
  // Fallback
  { path: "*", element: <NotFound /> },
];

