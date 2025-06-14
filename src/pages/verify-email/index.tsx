import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

import { TextShimmer } from "@/components/ui/text-shimmer";
import { usePostData } from "@/hooks/useApi";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const { token } = useParams();
  const { mutate, isPending, isError, error } = usePostData("/auth/verify-email", {
    onError: (error) => {
      console.error("Email Verification Error:", error);
      toast.error(error.data?.message || "An error occurred while verifying your email.");
      setTimeout(() => navigate("/auth/register", { replace: true }), 3000);
    },
    onSuccess: (data) => {
      console.log("Email Verification Success:", data);
      toast.success("Email verified successfully! Redirecting...");
      setTimeout(() => navigate("/auth/login", { replace: true }), 3000);
    },
  });
  useEffect(() => {
    if (!token) return;

    mutate(token);
  }, []);
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-6">
      <TextShimmer
        className="text-7xl font-extrabold tracking-widest select-none [--base-color:var(--color-primary)] [--base-gradient-color:var(--color-red-400)] dark:[--base-color:var(--color-primary)] dark:[--base-gradient-color:var(--color-secondary)]"
        spread={6}
      >
        MEALIFY
      </TextShimmer>
      <div className="space-y-10 text-center">
        {isPending && (
          <div className="flex items-center justify-center space-x-2">
            <span className="sr-only">Loading...</span>
            <div className="bg-primary h-6 w-6 animate-bounce rounded-full [animation-delay:-0.3s]"></div>
            <div className="bg-primary h-6 w-6 animate-bounce rounded-full [animation-delay:-0.15s]"></div>
            <div className="bg-primary h-6 w-6 animate-bounce rounded-full"></div>
          </div>
        )}
        <h1 className="text-secondary text-2xl font-bold">Verifying Your Email...</h1>
        {isError && (
          <h2 className="text-primary/90 text-xl font-semibold">
            {error.data?.message || "An error occurred while verifying your email."}
          </h2>
        )}
        {isError ? "Try again later or " : "You will be redirected shortly. If not, "}
        <Link className="text-secondary" to={"/auth/login"}>
          click here to login
        </Link>
      </div>
    </main>
  );
}
