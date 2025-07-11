import { useAuth } from "@/hooks/useAuth";

import { Button } from "./ui/button";

export default function LogoutButton() {
  const { logout } = useAuth();
  return (
    <Button
      onClick={logout}
      className="group border-primary text-primary relative overflow-hidden rounded-3xl border-r-3 border-l-3 bg-transparent px-8 py-2 transition-all duration-300 hover:text-white"
    >
      <span className="relative z-10">Logout</span>
      <span className="before-animation absolute inset-0 z-0"></span>
    </Button>
  );
}
