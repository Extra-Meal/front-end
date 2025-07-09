import { createBrowserRouter } from "react-router";

import BranchDetails from "./components/BranchDetails";
import { BranchesProvider } from "./contexts/BranchesContext";
import AuthLayout from "./layouts/authLayout";
import MainLayout from "./layouts/mainLayout";
import About from "./pages/about";
import Areas from "./pages/areas";
import Categories from "./pages/categories";
import Contact from "./pages/contact";
import Home from "./pages/home";
import MenuPage from "./pages/menu";
import VerifyEmail from "./pages/verify-email";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "menu", element: <MenuPage /> },
      { path: "about", element: <About /> },
      {
        path: "contact",
        element: (
          <BranchesProvider>
            <Contact />
          </BranchesProvider>
        ),
        children: [{ path: "branch", element: <BranchDetails /> }],
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "area",
        element: <Areas />,
      },
    ],
  },
  {
    path: "auth",
    children: [
      {
        path: "login",
        element: <AuthLayout />,
      },
      {
        path: "register",
        element: <AuthLayout />,
      },
      {
        path: "loading",
        element: <div>Loading...</div>,
      },
      {
        path: "verify/email/:token",
        element: <VerifyEmail />,
      },
    ],
  },
]);
