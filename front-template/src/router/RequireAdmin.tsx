import { useUserStore } from "@/stores/userStore";
import { Navigate, Outlet, useLocation } from "react-router";

const RequireAdmin = () => {
  const isAdmin = useUserStore((state) => state.isAdmin);
  const location = useLocation();

  if (!isAdmin) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default RequireAdmin;
