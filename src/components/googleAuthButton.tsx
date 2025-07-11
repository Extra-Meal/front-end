import { useGoogleLogin } from "@react-oauth/google";
import type { VariantProps } from "class-variance-authority";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { usePostData } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";

import { Button, buttonVariants } from "./ui/button";

type TButtonProps = {
  children: React.ReactNode;
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };
export default function GoogleAuthButton({ children, ...rest }: TButtonProps) {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { isPending, mutateAsync: login } = usePostData("auth/google-login", {
    onError: (error) => {
      console.error("Google Login Error:", error);
      toast.error(error.data?.message || error.data || "Google login failed. Please try again.");
    },
    onSuccess: (data) => {
      const { token } = data.data;
      if (token) {
        localStorage.setItem("token", token);
        toast.success(data.message || "Login successful!");
        setIsAuthenticated(true);
        navigate("/");
      }
    },
  });

  const googleLogin = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      const { code } = credentialResponse;
      if (!code) {
        console.error("No authorization code received from Google.");
        toast.error("Google authentication failed. Please try again.");
        return;
      }
      await login(code);
    },
    onError: (error) => {
      console.error("Google Auth Error:", error);
      toast.error("Google authentication failed. Please try again.");
    },
    flow: "auth-code",
  });

  return (
    <Button disabled={isPending} onClick={() => googleLogin()} {...rest}>
      {children}
    </Button>
  );
}
