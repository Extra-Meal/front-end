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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OrSeparator } from "@/components/ui/orSeparator";
import { usePostData } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number.",
      }),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export default function Register() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Create a form using react-hook-form with Zod validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  // Custom hook to handle POST requests for registration
  const { isPending: isLoading, mutateAsync: register } = usePostData<z.infer<typeof formSchema>>("/auth/register", {
    onError: (error) => {
      console.error("🚀 ~ Register ~ error:", error);
      toast.error(error.data?.message || error.data || "Registration failed. Please try again.");
    },
    onSuccess: (data) => {
      console.log("🚀 ~ Register ~ data:", data);
      const { token } = data || {};
      if (token) {
        sessionStorage.setItem("token", token);
      }
      setIsAuthenticated(true);
      toast.success(data?.message || "Registration successful!");
      navigate("/");
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await register(values);
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type={showPassword ? "text" : "password"} {...field} />
                    <button
                      type="button"
                      className="hover:text-primary text-muted-foreground/70 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </button>
                  </div>
                </FormControl>
                <FormDescription className="text-xs">
                  at least 8 characters and include uppercase, lowercase, and numbers.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type={showConfirmPassword ? "text" : "password"} {...field} />
                    <button
                      type="button"
                      className="hover:text-primary text-muted-foreground/70 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1">
                  <FormLabel>
                    I agree to
                    <Link to={"/auth/register"} className="text-primary">
                      the terms of service
                    </Link>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Sign up"
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <p className="text-sm text-gray-500">
          Already have an account?
          <Link to={"/auth/login"} className="text-primary ml-2 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
