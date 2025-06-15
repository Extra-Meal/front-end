import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import * as z from "zod";

import GoogleAuthButton from "@/components/googleAuthButton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OrSeparator } from "@/components/ui/orSeparator";
import { usePostData } from "@/hooks/useApi";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  rememberMe: z.boolean().optional(),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { isPending: isLoading, mutateAsync: login } = usePostData("/auth/login", {
    onError: (error) => {
      console.log("🚀 ~ Login ~ error:", error);
      toast.error(error.data?.message || error.data || "Login failed. Please try again.");
    },
    onSuccess: (data) => {
      const { token } = data;
      if (form.getValues("rememberMe")) localStorage.setItem("token", token);
      else sessionStorage.setItem("token", token);

      toast.success(data.message || "Login successful!");
      navigate("/");
    },
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await login(values);
  }

  return (
    <div className="space-y-6">
      <GoogleAuthButton className="bg-foreground text-background hover:bg-foreground/90 w-full">
        <FcGoogle />
        Continue with Google
      </GoogleAuthButton>
      <OrSeparator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <a href="#" className="text-primary text-sm hover:underline">
                    Forgot password?
                  </a>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input type={showPassword ? "text" : "password"} {...field} />
                    <button
                      type="button"
                      className="hover:text-primary absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Remember me</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </Form>
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Don't have an account?
          <Link to="/auth/register" className="text-primary ml-2 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
