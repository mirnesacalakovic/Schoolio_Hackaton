import App from "@/App";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import Forum from "@/pages/Forum";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import LostAndFound from "@/pages/LostAndFound";
import Materials from "@/pages/Materials";
import NotFound from "@/pages/NotFound";
import RegisterPage from "@/pages/RegisterPage";
import ParentDashboardPage from "@/pages/ParentDashboardPage";
import TeachersPage from "@/pages/TeachersPage";
// import RequireRole from "@/router/RequireRole";
import { createBrowserRouter, Navigate, RouteObject } from "react-router";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "materials", element: <Materials /> }, // Public route
      {
        path: "lost-and-found",
        element: (
          <LostAndFound />
          // <RequireRole allowedRoles={["PARENT"]}>
          //   <LostAndFound />
          // </RequireRole>
        ),
      },
      {
        path: "teacher-dashboard",
        element: (
            <TeachersPage />
            
        ),
      },
      {
        path: "admin-dashboard",
        element: (
          <AdminDashboardPage />
          // <RequireRole allowedRoles={["ADMIN"]}>
          //   <AdminDashboardPage />
          // </RequireRole>
        ),
      }, 
      {
        path: "parent-dashboard",
        element: (
          <ParentDashboardPage />
          // <RequireRole allowedRoles={["PARENT"]}>
          //   <ParentDashboardPage />
          // </RequireRole>
        ),
      }, 
      {
        path: "student-dashboard",
        element: (
          <Materials />
          // <RequireRole allowedRoles={["PARENT"]}>
          //   <ParentDashboardPage />
          // </RequireRole>
        ),
      }, 
      {
        path: "forum",
        element: (
          <Forum />
          // <RequireRole allowedRoles={["ADMIN", "PARENT", "TEACHER"]}>
          //   <Forum />
          // </RequireRole>
        ),
      },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);