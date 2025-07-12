import { createBrowserRouter } from "react-router";

import BranchDetails from "./components/BranchDetails";
import { BranchesProvider } from "./contexts/BranchesContext";
import AuthLayout from "./layouts/authLayout";
import DashboardLayout from "./layouts/dashboardLayout";
import MainLayout from "./layouts/mainLayout";
import About from "./pages/about";
import Areas from "./pages/areas";
import Categories from "./pages/categories";
import Contact from "./pages/contact";
import Home from "./pages/home";
import IngredientsPage from "./pages/ingrendents";
import MenuPage from "./pages/menu";
import VerifyEmail from "./pages/verify-email";
import WishList from "./pages/wishlsit";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "menu", element: <MenuPage /> },
      { path: "ingredients", element: <IngredientsPage /> },
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
      {
        path: "wishlist",
        element: <WishList />,
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
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <>
            <div>Dashboard Home</div>
          </>
        ),
      },
      {
        path: "users",
        element: <div>Users Management</div>,
      },
      {
        path: "meals",
        element: <div>Meals Management</div>,
      },
      {
        path: "ingredients",
        element: <div>Ingredients Management</div>,
      },
      {
        path: "categories",
        element: <div>Categories Management</div>,
      },
      {
        path: "areas",
        element: <div>Areas Management</div>,
      },
    ],
  },
]);
