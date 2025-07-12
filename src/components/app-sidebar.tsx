import { GalleryVerticalEndIcon, LayoutGrid, LogOut, PieChart, SquaresExclude, Users } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

import { buttonVariants } from "./ui/button";

const productItems = [
  {
    name: "Meals",
    url: "/dashboard/meals",
    icon: GalleryVerticalEndIcon,
  },
  {
    name: "Ingredients",
    url: "/dashboard/ingredients",
    icon: LayoutGrid,
  },
];
const metadataItems = [
  {
    name: "Categories",
    url: "/dashboard/categories",
    icon: LayoutGrid,
  },
  {
    name: "Areas",
    url: "/dashboard/areas",
    icon: SquaresExclude,
  },
];
const mainItems = [
  {
    name: "Main",
    url: "/dashboard",
    icon: PieChart,
  },
  {
    name: "Users",
    url: "/dashboard/users",
    icon: Users,
  },
];

type AppSidebarProps = {
  onSectionChange: (section: string) => void;
};

export function AppSidebar({ onSectionChange }: AppSidebarProps) {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  function handleLogout() {
    navigate("/");
    setTimeout(() => {
      // dispatch(logout());
    }, 500); // Delay to allow any pending state updates
  }
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={item.url === pathname}>
                    <Link to={item.url} onClick={() => onSectionChange(item.name)}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Products</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {productItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={item.url === pathname}>
                    <Link to={item.url} onClick={() => onSectionChange(item.name)}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Meta</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {metadataItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={item.url === pathname}>
                    <Link to={item.url} onClick={() => onSectionChange(item.name)}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenuButton className={cn(buttonVariants(), "justify-start")} onClick={handleLogout}>
          <LogOut />
          Logout
        </SidebarMenuButton>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
