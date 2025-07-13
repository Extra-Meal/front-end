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
import MainDashboard from "./pages/dashboard";
import IngredientsDashboard from "./pages/dashboard/IngredientsDashboard";
import UsersDashboard from "./pages/dashboard/UsersDashboard";
import AreasDashboard from "./pages/dashboard/areasDashboard";
import CategoriesDashboard from "./pages/dashboard/categoriesDashboard";
import Home from "./pages/home";
import IngredientPage from "./pages/ingredient";
import IngredientsPage from "./pages/ingrendents";
import MealPage from "./pages/meal";
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
      { path: "menu/:mealId", element: <MealPage /> },
      { path: "ingredients", element: <IngredientsPage /> },
      { path: "ingredients/:ingredientId", element: <IngredientPage /> },
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
        element: <MainDashboard />,
      },
      {
        path: "users",
        element: <UsersDashboard />,
      },
      {
        path: "meals",
        element: <div>Meals Management</div>,
      },
      {
        path: "ingredients",
        element: <IngredientsDashboard />,
      },
      {
        path: "categories",
        element: <CategoriesDashboard />,
      },
      {
        path: "areas",
        element: <AreasDashboard />,
      },
    ],
  },
]);
