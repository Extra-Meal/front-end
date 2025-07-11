import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { toast } from "sonner";

import { AuthContext } from "@/contexts/AuthContext";
import type { APISuccess } from "@/types/api.type";
import type { User } from "@/types/user.type";

import { useGetData } from "./useApi";

export function useAuth() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useGetData<APISuccess<User>>("/users/me", {
    enabled: isAuthenticated,
    refetchOnWindowFocus: false,
  });
  const user = data?.data;
  const isAdmin = user?.roles?.includes("admin") || false;
  function logout() {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
    queryClient.invalidateQueries({ queryKey: ["/users/me"] });
    queryClient.removeQueries({ queryKey: ["/users/me"] });
    queryClient.removeQueries({ queryKey: ["/cart"] });
    queryClient.removeQueries({ queryKey: ["/wishlist"] });
    toast.success("Logged out successfully!", {
      icon: "👋",
    });
  }
  return {
    isAuthenticated,
    setIsAuthenticated,
    isError,
    isLoading,
    user,
    logout,
    isAdmin,
  };
}
