import { Contact } from "lucide-react";
import { createBrowserRouter } from "react-router";

import MainLayout from "./layouts/mainLayout";
import About from "./pages/about";
import Home from "./pages/home";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);
