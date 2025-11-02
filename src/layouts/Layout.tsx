import { Navbar, Footer } from "../components";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* Page content goes here */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;

