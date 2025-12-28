import { Navigate, Outlet } from "react-router-dom";

const AdminGuard = () => {
  
  const role = localStorage.getItem("roleId"); // expected: "admin"
  console.log(role);

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
export default AdminGuard;