import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import { AppSidebar } from "@/components/app-sidebar";
import ThemeToggler from "@/components/themeToggler";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

// import { useAuth } from "@/hooks/useAuth";

export default function DashboardLayout() {
  //   const { isAdmin, isAuthenticated } = useAuth();
  const [selectedSection, setSelectedSection] = useState("Main");
  //   if (!isAuthenticated) {
  //     toast.error("You must be logged in to access this page.", {
  //       id: "unauthorized-login",
  //     });
  //     return <Navigate to="/auth/login" replace />;
  //   }
  //   if (isAdmin === false) {
  //     toast.error("You are not authorized to access this page.", {
  //       id: "unauthorized-access",
  //     });
  //     return <Navigate to="/" replace />;
  //   }
  return (
    <SidebarProvider>
      <AppSidebar onSectionChange={setSelectedSection} />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild>
                  <Link to={"/dashboard"}>Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{selectedSection}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex-1" />
          <ThemeToggler />
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
