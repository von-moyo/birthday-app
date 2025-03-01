import { createBrowserRouter } from "react-router-dom";
import {
  NotFound,
  Home,
  Login,
  ForgotPassword, Calendar,
  StaffManagement,
} from "../pages";
import { MainLayout } from "../components";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/staff-management",
        element: <StaffManagement />,
      },
      {
        path: "/calendar",
        element: <Calendar />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
