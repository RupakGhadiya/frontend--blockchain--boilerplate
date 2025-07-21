import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import MainLayout from "@/layouts/MainLayout";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/en" replace />,
  },
  {
    path: "/:lang",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes);
