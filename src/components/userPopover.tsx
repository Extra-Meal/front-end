import { Link } from "react-router";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

import LogoutButton from "./logoutButton";

export default function UserPopover() {
  const { user, isLoading, isAdmin } = useAuth();
  if (isLoading) {
    return <div className="bg-muted h-10 w-10 animate-pulse rounded-full" />;
  }
  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ring-none outline-none">
        <Avatar className="hover:bg-accent/10 size-10 cursor-pointer">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[10000] min-w-48">
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link to="/wishlist">WishList</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="mb-2 cursor-pointer" asChild>
          <Link to="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        {isAdmin && (
          <DropdownMenuItem className="mb-2 cursor-pointer" asChild>
            <Link to="/admin">Admin</Link>
          </DropdownMenuItem>
        )}
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
