import { LogOut } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

import { Button } from "./ui/button";

export default function LogoutButton() {
  const { logout } = useAuth();
  return (
    <Button onClick={logout} className="w-full">
      <LogOut className="text-primary-foreground" />
      Logout
    </Button>
  );
}
