import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router";

import { cn } from "@/lib/utils";
import Login from "@/pages/login";
import Register from "@/pages/register";

export default function AuthLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/auth/login";
  return (
    <main className={cn("relative flex w-full")}>
      <div
        className={cn(
          "relative flex h-screen flex-1 items-center justify-center lg:left-0",
          isLoginPage ? "" : "lg:left-[50%]"
        )}
      >
        <div className="text-dark-navy w-full max-w-md space-y-8 px-4 sm:px-0">
          <div>
            <div className="mb-10 flex items-center justify-center lg:hidden">
              <Link to="/" className="max-w-56">
                Logo
              </Link>
            </div>
            <div className="mt-5 space-y-2">
              <h3 className="text-2xl font-bold sm:text-3xl">{isLoginPage ? "Welcome Back !" : "Join Us Now"}</h3>
              <p>{isLoginPage ? "Continue you adventure" : "Start your Journey With Us"}</p>
            </div>
          </div>
          <AnimatePresence>
            {isLoginPage ? (
              <motion.div
                key={"login"}
                initial={{ x: "50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
              >
                <Login />
              </motion.div>
            ) : (
              <motion.div
                key={"register"}
                initial={{ x: "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
              >
                <Register />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div
        className={cn(
          "shadow-primary-foreground/20 relative hidden h-screen flex-1 items-center justify-center overflow-hidden shadow-xl transition-[right] duration-500 lg:right-0 lg:flex",
          isLoginPage ? "rounded-l-2xl" : "rounded-r-2xl lg:right-[50%]"
        )}
      >
        <div className="relative z-10 h-1/2 w-full max-w-md">
          <Link to="/">Logo</Link>
          <div className="mt-10 space-y-3">
            {isLoginPage && (
              <div>
                <h3 className="text-background text-3xl font-bold">Hey there, Stylish Soul !</h3>
                <p className="text-background-200 mt-2">
                  Your style journey continues here. Sign in to explore the latest drops and members-only offers.
                </p>
              </div>
            )}
            {!isLoginPage && (
              <div>
                <h3 className="text-background text-3xl font-bold">Join our fashion family</h3>
                <p className="text-background-200 mt-2">
                  Step into your personalized fashion space. SignUp to discover curated collections and premium picks.
                </p>
              </div>
            )}
          </div>
        </div>
        <div
          className="absolute inset-0 my-auto h-[500px]"
          style={{
            background:
              "linear-gradient(152.92deg, var(--primary) 4.54%, var(--primary) 34.2%, rgba(192, 132, 252, 0.1) 95.55%)",
            filter: "blur(118px)",
          }}
        ></div>
      </div>
    </main>
  );
}
