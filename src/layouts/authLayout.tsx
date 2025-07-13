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
          <Link to="/">
            <svg
              width="229.00000000000006"
              height="46.21764852589558"
              viewBox="100 0 369.89473684210526 74.33905457489806"
            >
              <defs id="SvgjsDefs6025"></defs>
              <g
                id="SvgjsG6027"
                transform="matrix(2.6532381166578745,0,0,2.6532381166578745,109.61208544197541,4.211393087413061)"
                fill="#af3e3e"
              >
                <path d="M14.94 9.74 l-5.1 6.1 l-5.06 -6.1 l0 10.26 l-2.14 0 l0 -12.82 l-1.74 -2.1 l2.82 0 l6.1 7.32 l6.18 -7.32 l2.82 0 l-1.74 2.1 l0 12.82 l-2.14 0 l0 -10.26 z M24.099999999999998 14.02 l0 3.8 l9.2 0 l0 2.18 l-11.38 0 l0 -14.92 l10.5 0 l0 2.2 l-8.32 0 l0 4.52 q0.62 -0.36 1.38 -0.48 q0.56 -0.1 1.44 -0.1 l3.26 0 l0 2.22 l-3.26 0 q-0.82 0 -1.44 0.1 q-0.76 0.14 -1.38 0.48 z M41.46 6.66 l-0.82 -1.84 l2.4 0 l7.18 15.18 l-2.44 0 l-0.98 -2.18 l-4.54 0 q-1.28 0 -2.3 0.24 q-0.9 0.22 -1.5 0.58 q-0.54 0.32 -0.72 0.66 l-0.38 0.7 l-2.36 0 z M43.06 15.620000000000001 l2.76 0 l-3.26 -6.3 l-3.3 7.14 q0.44 -0.38 1.34 -0.6 q1.02 -0.24 2.46 -0.24 z M63.480000000000004 20 l-10.46 0 l0 -14.92 l2.18 0 l0 12.74 l8.28 0 l0 2.18 z M68.22 20 l-2.14 0 l0 -14.92 l2.14 0 l0 14.92 z M74.8 14.02 l0 5.98 l-2.18 0 l0 -14.92 l10.5 0 l0 2.2 l-8.32 0 l0 4.52 q0.62 -0.36 1.38 -0.48 q0.56 -0.1 1.44 -0.1 l3.26 0 l0 2.22 l-3.26 0 q-0.82 0 -1.44 0.1 q-0.76 0.14 -1.38 0.48 z M91.46000000000001 11.64 q1.34 -1.4 2.42 -3.12 t1.72 -3.44 l2.5 0 q-1.02 2.38 -2.48 4.56 q-1.32 1.98 -3.08 3.9 l0 6.46 l-2.16 0 l0 -6.46 q-1.76 -1.92 -3.08 -3.9 q-1.46 -2.18 -2.48 -4.56 l2.5 0 q0.64 1.72 1.72 3.44 t2.42 3.12 z"></path>
              </g>
            </svg>
          </Link>
          <div className="mt-10 space-y-3">
            {isLoginPage && (
              <div>
                <h3 className="text-background text-3xl font-bold">Hey there, Home Chef !</h3>
                <p className="text-background-200 mt-2">
                  Ready to spice things up? Sign in and dive into a world of fresh picks, tasty recipes, and exclusive
                  offers waiting just for you.
                </p>
              </div>
            )}
            {!isLoginPage && (
              <div>
                <h3 className="text-background text-3xl font-bold">Join our Kitchen Crew</h3>
                <p className="text-background-200 mt-2">
                  Join us and explore family-friendly recipes, great grocery deals, and meal ideas everyone will love.
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
