import { useUserStore } from "@/stores/userStore";
import { Navigate, Outlet, useLocation } from "react-router";

const RequireAuth = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default RequireAuth;
