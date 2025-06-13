import { createBrowserRouter } from "react-router";

import BranchDetails from "./components/BranchDetails";
import { BranchesProvider } from "./contexts/BranchesContext";
import MainLayout from "./layouts/mainLayout";
import About from "./pages/about";
import Contact from "./pages/contact";
import Home from "./pages/home";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
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
    ],
  },
]);
